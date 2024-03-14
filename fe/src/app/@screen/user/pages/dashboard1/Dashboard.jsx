import './Dashboard.css'
import React, {useState, useEffect}  from 'react'
import { axiosInstance } from "../../../../../config/axios";
import { API_ENDPOINT } from "../../../../../config/api";

const Dashboard = () => {
    const [userData, setUserData] = useState(null);
    const [subscriptionsData, setSubscriptionsData] = useState(null);

    useEffect(() => {
        const fetchUserData = async () => {
            try {
                const response = await axiosInstance.get(API_ENDPOINT.USER_DATA);
                setUserData(response.data)
            } catch(error) {
                console.log("Error: ", error)
            }
        }
        fetchUserData()

        const fetchSubscriptionsData = async () => {
            try {
                const response = await axiosInstance.get(API_ENDPOINT.SUBSCRIPTION_DATA);
                setUserData(response.data)
            } catch(error) {
                console.log("Error: ", error)
            }            
        }
        fetchSubscriptionsData()
    },[])

    // if(!data || !subscriptionsData) {return <div>Loading</div>}

    return ( 
        <div className="Dashboard">
            <div className="firstSection">
                <div className="splitFirstSection leftSideFirstSection">
                    <div className="milestone">
                        <h2>Customers</h2>
                        <div className="milestone-part milestone-part-1">
                            <p className="milestone-text">
                                <span style={{fontSize: '25px', margin: '0px'}}>userData.totalRecords</span>
                                <br/><span style={{fontSize: '20px', margin: '0px'}}>end-users total</span>
                            </p>
                            <div className="milestone-dot" />
                        </div>
                        <div className="milestone-part milestone-part-2">
                            <p className="milestone-text">
                                <span style={{fontSize: '30px', margin: '0px'}}>userData.newUsers</span>
                                <br/><span style={{fontSize: '20px', margin: '0px'}}>new end-users today</span>
                            </p>
                        </div>
                    </div>
                </div>
                <div className="spacer"></div>
                <div className="splitFirstSection rightSideFirstSection">
                    <h2>Quantity chart</h2>
                </div>
            </div>

            <hr className='horizontal-line' />
            <div className="secondSection">
                <div className="tableContainer">
                    <table className="subscriptionInfoTable">
                        <tr>
                            <th>Subscription Name</th>
                            <th>Customer</th>
                            <th>Quantity</th>
                            <th>Status</th>
                            <th>Activation Date</th>
                            <th>Subscription Amount</th>
                        </tr>
                        <tr>
                            <td>subscriptionsData.SubscriptionName</td>
                            <td>subscriptionsData.Customer</td>
                            <td>subscriptionsData.Quantity</td>
                            <td>subscriptionsData.Status</td>
                            <td>subscriptionsData.ActivationDate</td>
                            <td>subscriptionsData.SubscriptionAmount</td>
                        </tr>
                    </table>
                </div>
            </div>
        </div>
     );
}
 
export default Dashboard;