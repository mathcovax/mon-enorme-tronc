#!/bin/bash

source duplo/.env
source duplo/.env.local 

stripe/cli trigger --api-key $STRIPE_API_WEBHOOK_TEST $1