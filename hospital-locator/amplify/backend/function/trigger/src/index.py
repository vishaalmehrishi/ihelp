#!/usr/bin/python
# -*- coding: utf-8 -*-
import json
import boto3
import os

lambda_client = boto3.client('lambda')

def handler(event, context):
    print('received event:')
    print(event)
    print(context)

    inputParams = {'DataSet': 'MP'}
    env = os.environ.get('ENV')
    invoke_response = lambda_client.invoke(FunctionName="scrapper-"+env,
                                           InvocationType='Event',
                                           Payload= json.dumps(inputParams),
                                           )