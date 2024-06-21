#!/bin/bash

listen --api-key $STRIPE_API_KEY_TEST_LIVE --device-name $STRIPE_DEVICE_NAME --forward-to nginx:80/api/stripe-webhook