#!/bin/sh
if [ -e /home/cli ]
then
	echo ""
else
    cp /bin/stripe /home/cli
fi