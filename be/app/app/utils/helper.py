import datetime 


def getRecentDate():
    today = datetime.date.today()

    # Get the last 7 days
    last_7_days = []
    for i in range(7):
        last_7_days.append(today - datetime.timedelta(days=i))

    # Convert the dates to strings in "YYYY-MM-DD" format
    last_7_days_strings = [date.strftime("%Y-%m-%d") for date in last_7_days]
    return last_7_days_strings

def transform_date(date_string):
    return date_string[slice(0,10)]
