#!/bin/bash

source duplo/.env
source duplo/.env.local 

stripe/cli listen --api-key $STRIPE_API_WEBHOOK_TEST --device-name $STRIPE_DEVICE_NAME --forward-to $ORIGIN/api$STRIPE_PATH_WEBHOOK