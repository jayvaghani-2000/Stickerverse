#!/bin/bash
cd /home/ubuntu/sticker-verse
npm i
# Copy source files to DEVELOPMENT environment
if [ "$DEPLOYMENT_GROUP_NAME" == "sticker-verse-dev-group" ]; then

pm2 start ../node_services/development.json
fi

