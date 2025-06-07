#!/bin/bash
cd /home/kavia/workspace/code-generation/petmemoryvault-35426-18c3f8e7/petmemoryvault
npm run build
EXIT_CODE=$?
if [ $EXIT_CODE -ne 0 ]; then
   exit 1
fi

