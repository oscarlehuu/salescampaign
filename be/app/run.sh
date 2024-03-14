#!/bin/sh

# delete all pycache if exsist
# if [ $ENVIRONMENT == 'dev' ] ; then find . | grep -E "(/__pycache__$|\.pyc$|\.pyo$)" | xargs rm -rf ; fi

# disable pycache
export PYTHONDONTWRITEBYTECODE=1

# If there's a prestart.sh script in the /app directory or other path specified, run it before starting
# PRE_START_PATH=${PRE_START_PATH:-./prestart.sh}
# echo "Checking for script in $PRE_START_PATH"
# if [ -f $PRE_START_PATH ] ; then
#     echo "Running script $PRE_START_PATH"
#     . "$PRE_START_PATH"
# else
#     echo "There is no script $PRE_START_PATH"
# fi

poetry run start