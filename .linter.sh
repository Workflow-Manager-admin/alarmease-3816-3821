#!/bin/bash
cd /home/kavia/workspace/code-generation/alarmease-3816-3821/main_container_for_alarmease
npm run build
EXIT_CODE=$?
if [ $EXIT_CODE -ne 0 ]; then
   exit 1
fi

