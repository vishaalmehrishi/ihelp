import json
from mp_scrapper import scrap_mp_data

def handler(event, context):
  print('received event:')
  print(event)

  dataSetToScrap = event['DataSet']
  if dataSetToScrap == "MP":
    dataToLoad = scrap_mp_data()
    print(dataToLoad)
  else :
   raise RuntimeError from None

  return {
      'statusCode': 200,
      'headers': {
          'Access-Control-Allow-Headers': '*',
          'Access-Control-Allow-Origin': '*',
          'Access-Control-Allow-Methods': 'OPTIONS,POST,GET'
      },
      'body': json.dumps('Data loaded successfully for: ' + dataSetToScrap)
  }