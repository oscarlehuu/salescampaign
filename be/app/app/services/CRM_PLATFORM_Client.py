from dotenv import load_dotenv
from fastapi import HTTPException, status
import os
import requests
import datetime
from app.responses.endusers_response import EndusersResponse
from app.responses.subscriptions_response import SubscriptionsResponse
from collections import namedtuple
from app.utils.helper import transform_date

load_dotenv()

CRM_PLATFORM_Params = namedtuple(
        "CRM_PLATFORM_Params", ["email", "crm_platform_account_id", "date", "billToAccountId", "crm_platform_account_code"], 
        defaults=[None, None, None, None, None]
    )
API_ENDPOINTS = {
        "GET_TOKEN_API": "/oauth/token",
        "GET_RESELLER": '/api/accounts?$filter=resellingEnabled eq true and Email eq \'{object.email}\' and code eq \'{object.crm_platform_account_code}\'',
        "GET_NEW_ENDUSER": '/api/accounts?$filter=resellingEnabled eq false and createdAt gt datetime\'{object.date}\'&pageSize=500',
        "GET_RESELLER_NEW_ENDUSER": '/api/accounts?$filter=resellingEnabled eq false and createdAt gt datetime\'{object.date}\' and billToAccountId eq \'{object.billToAccountId}\'&pageSize=500',
        "GET_RESELLER_TOTAL_ENDUSERS": '/api/accounts?$filter=resellingEnabled eq false and billToAccountId eq \'{object.billToAccountId}\'',
        "GET_NEW_SUBSCRIPTION": '/api/Subscriptions?$filter=createdAt gt dateTime\'{object.date}\' and contains(name, \'azure plan\') or contains(name, \'microsoft\') and contains(name, \'office\')&pageSize=500',
        "GET_RESELLER_NEW_SUBSCRIPTION": '/api/Subscriptions?$filter=createdAt gt dateTime\'{object.date}\' and billingToId eq \'{object.billToAccountId}\' and contains(name, \'azure plan\') or contains(name, \'microsoft\') and contains(name, \'office\')&pageSize=500',
        # Add more endpoints here as needed
    }

class CRM_PLATFORM_Client:
    
    def __init__(self, access_token = ''): 
        self.access_token = access_token
    
    def initAccessToken(self):
        self.access_token = self.get_access_token()

    def send_request(self, url):
        headers = {
            "Content-Type": "application/json",
            "Authorization": "Bearer " + self.access_token,
            "x-api-version": "3"
        }
        response = requests.get(url, headers=headers)
        if response.status_code == 401:
            self.initAccessToken()
            headers["Authorization"] = "Bearer " + self.access_token
            response = requests.get(url, headers=headers)
        if response.status_code == 403:
            raise HTTPException(status_code=status.HTTP_403_FORBIDDEN, detail="FORBIDDEN")
        return response.json()
    
    def get_api_info(key):
        return os.getenv(key)

    def get_api_url(endpoint, object = None):
        BASE_URL = CRM_PLATFORM_Client.get_api_info('BASE_URL')
    
        if endpoint == "BASE_URL":
            return BASE_URL
        
        endpoint_path = API_ENDPOINTS.get(endpoint)
        if endpoint_path is None:
            return ""

        if object is not None:
            endpoint_path = endpoint_path.format(object=object)

        return BASE_URL + endpoint_path

    def get_access_token(self):
        client_id = CRM_PLATFORM_Client.get_api_info('APP_CRM_PLATFORM__API_CLIENT_ID')
        client_secret = CRM_PLATFORM_Client.get_api_info('APP_CRM_PLATFORM__API_CLIENT_SECRET')
        data = {
            'grant_type': "password",
            'client_id': client_id,
            'client_secret': client_secret,
            'username': CRM_PLATFORM_Client.get_api_info('APP_CRM_PLATFORM__API_USERNAME'),
            'password': CRM_PLATFORM_Client.get_api_info('APP_CRM_PLATFORM__API_PASSWORD') 
        }
        response = requests.post(CRM_PLATFORM_Client.get_api_url("GET_TOKEN_API"), auth=(client_id, client_secret), data=data).json()
        return response['access_token']
    
    def getReseller(self, email, crm_platform_account_code):
        object = CRM_PLATFORM_Params(email=email, crm_platform_account_code=crm_platform_account_code)
        newEndusersApiResponse = self.send_request(CRM_PLATFORM_Client.get_api_url("GET_RESELLER", object))
        
        if len(newEndusersApiResponse['data']) > 0:
            return {"status": True, "data": newEndusersApiResponse["data"]}
        else:
            return {"status": False, "data": newEndusersApiResponse["data"]}
    
    def getEndusers(self, date, token, next_url=None):
        object = CRM_PLATFORM_Params(date=date, billToAccountId=token['crm_platform_account_id']) 
        newEndusersApiResponse = self.send_request(
            CRM_PLATFORM_Client.get_api_url(
                "GET_NEW_ENDUSER" if token['role'] == 'admin' else "GET_RESELLER_NEW_ENDUSER",
                object
            ) if next_url is None else next_url,
        )   
        data_list = {'totalRecords': newEndusersApiResponse['paging']['totalRecords'], 'data': []}
        if 'data' in newEndusersApiResponse:
            for data in newEndusersApiResponse['data']:
                data_list['data'].append(EndusersResponse.from_dict(data))
                
            if 'links' in newEndusersApiResponse:
                next_url = newEndusersApiResponse['links']['next']
            else:
                next_url = None
            
            if next_url:
                next_response = self.getEndusers(date, token, next_url)
                if next_response is not None:
                    next_data_list = next_response
                    data_list['data'].extend(next_data_list)
        return data_list
    
    def getNewEnduser(self, date, token):
        data_list = self.getEndusers(date, token)
        grouped_array = {}
        if 'data' in data_list:
            for item in data_list['data']:
                if hasattr(item, 'createdAt'):
                    created_at = transform_date(item.createdAt)
                    if created_at not in grouped_array:
                        grouped_array[created_at] = {'count': 0, 'items': []}
                    grouped_array[created_at]['items'].append(item)
                    grouped_array[created_at]['count'] += 1
        data_list['data'] = grouped_array
        return data_list
    
    def getSubscriptions(self, date, token, next_url=None):
        object = CRM_PLATFORM_Params(date=date, billToAccountId=token['crm_platform_account_id']) 
        newSubscriptionsApiResponse = self.send_request(
            CRM_PLATFORM_Client.get_api_url(
                "GET_NEW_SUBSCRIPTION" if token['role'] == 'admin' else "GET_RESELLER_NEW_SUBSCRIPTION",
                object
            ) if next_url is None else next_url,
        )   
        data_list = {'totalRecords': newSubscriptionsApiResponse['paging']['totalRecords'], 'data': []}
        if 'data' in newSubscriptionsApiResponse:
            for data in newSubscriptionsApiResponse['data']:
                data_list['data'].append(SubscriptionsResponse.from_dict(data))
            
            if 'links' in newSubscriptionsApiResponse:
                next_url = newSubscriptionsApiResponse['links']['next']
            else:
                next_url = None
            
            if next_url:
                next_response = self.getSubscriptions(date, token, next_url)
                if next_response is not None:
                    next_data_list = next_response
                    data_list['data'].extend(next_data_list)
        return data_list        
        
    def getNewSubscription(self, date, token):
        data_list = self.getSubscriptions(date, token)
        grouped_array = {}
        if 'data' in data_list:
            for item in data_list['data']:
                if hasattr(item, 'createdAt'):
                    created_at = transform_date(item.createdAt)
                    if created_at not in grouped_array:
                        grouped_array[created_at] = {'quantity': 0, 'count': 0, 'items': []}
                    grouped_array[created_at]['items'].append(item)
                    grouped_array[created_at]['quantity'] += item.quantity
                    grouped_array[created_at]['count'] += 1
            
        data_list['data'] = grouped_array
        return data_list
    
    def getSubscriptionRanking(self, date, token):
        query_all = {**token, 'role': 'admin'}
        data_list = self.getSubscriptions(date, query_all)
        ranked_array = {}
        if 'data' in data_list:
            today =  datetime.datetime.today().strftime('%Y-%m-%d')
            for item in data_list['data']:
                if hasattr(item, 'billingTo'):
                    billing_to = item.billingTo
                    if billing_to['id'] not in ranked_array:
                        ranked_array[billing_to['id']] = {
                            "quantity": 0,
                            "today": 0,
                            "name": billing_to['name'],
                        }
                    ranked_array[billing_to['id']]['quantity'] += item.quantity
                
                if hasattr(item, 'createdAt'):
                    if transform_date(item.createdAt) == today:
                        ranked_array[billing_to['id']]['today'] += 1
                    
            sorted_by_quantity = sorted(ranked_array.items(), key=lambda x: x[1]['quantity'], reverse=True)
            data_list['rank'] = {}
            
            if token['role'] == 'admin': 
                data_list['rank']['top'] = [{key: value} for key, value in sorted_by_quantity[:3]] 
            else: 
                data_list['rank']['top'] = [{k: v for k, v in obj.items() if k != 'name'} for obj in [value for key, value in sorted_by_quantity[:3]]]
                quantity_rank = None
                for i, (billing_id, _) in enumerate(sorted_by_quantity):
                    if billing_id == int(token['crm_platform_account_id']):
                        quantity_rank = i+1
                        data_list['rank']['subscriptions_to_top'] = data_list['rank']['top'][0]['quantity'] - ranked_array[billing_id]['quantity']
                        break
                data_list['rank']['user_rank'] = quantity_rank
        return data_list['rank']
        
CRM_PLATFORM_API = CRM_PLATFORM_Client()