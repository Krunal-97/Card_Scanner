from urllib import response
from xml.dom.minidom import Document
from chalice import Chalice
import boto3
from chalicelib import storage_service
from chalicelib import textract_service
from chalicelib import recognition_service
from chalicelib import medcomprehend_service
from chalicelib import dynamodb_service
from chalicelib import simple_email_service
import base64
import json

storage_location = 'card-scanner'
storage_service = storage_service.StorageService(storage_location)
recognition_service = recognition_service.RecognitionService(storage_service)
textract_service = textract_service.TextractService(storage_service)
medcomprehend_service = medcomprehend_service.MedComprehendService()
email_service = simple_email_service.SES()


TABLE_NAME = 'Business_Card_tbl'
REGION_NAME = 'us-east-1'

dynamodb_service = dynamodb_service.DynamodbService(table_name=TABLE_NAME,region_name=REGION_NAME)


def convert_image_byte(image_file):
    with open(image_file, "rb") as image:
        return image.read()

app = Chalice(app_name='card_scan')
app.debug = True

# img = '/Users/krunal/Desktop/015.jpeg'


@app.route('/images', methods = ['POST'], cors = True)
def upload_image():
    """processes file upload and saves file to storage service"""
    request_data = json.loads(app.current_request.raw_body)
    file_name = request_data['filename']
    file_bytes = base64.b64decode(request_data['filebytes'])
    image_info = storage_service.upload_file(file_bytes, file_name)
    return image_info

@app.route('/images/{image_name}/translate-text', methods = ['POST'], cors = True)
def trans(image_name):

    text_detected = textract_service.detect_text(image_name) 
    response = medcomprehend_service.detect_entities(text_detected)
    entities = response['Entities']

    result = {}
    for i in range(len(entities)):
        result[entities[i]['Text']] = entities[i]['Type']

    print(result)

    return result

@app.route('/store', methods=['POST'],cors = True)
def insert_result():
	request_data = json.loads(app.current_request.raw_body)
	response = dynamodb_service.insert_card(request_data)
	return response

@app.route('/fetch/all', methods=['GET'],cors = True)
def fetch_all_result():
	response = dynamodb_service.get_all_cards()
	return response

@app.route('/fetchByUserId/{name}', methods=['GET'], cors = True)
def fetch_result(name):
    response = dynamodb_service.query_cards(str(name))
    print(response)
    return response

@app.route('/fetchByName/{userId}/{name}', methods=['GET'], cors = True)
def fetch_result(userId,name):
    response = dynamodb_service.query_cardsByName(str(userId),str(name))
    print(response)
    return response

@app.route('/fetchByNameAndEmail/{userId}/{name}', methods=['POST'], cors = True)
def fetch_result(userId,name):
    response = dynamodb_service.query_cardsByName(str(userId),str(name))

    print(response)

    if len(response) > 0:
        # From, to, search_result
        email_response = email_service.send_email(str(userId), str(userId), response)
        print(email_response)
        
    print(response)
    return response

@app.route('/verify/{userId}', methods=['GET'], cors = True)
def verify_user(userId):
    email_verify = email_service.verify_client(str(userId))
    return email_verify



# The view function above will return {"hello": "world"}
# whenever you make an HTTP GET request to '/'.
#
# Here are a few more examples:
#
# @app.route('/hello/{name}')
# def hello_name(name):
#    # '/hello/james' -> {"hello": "james"}
#    return {'hello': name}
#
# @app.route('/users', methods=['POST'])
# def create_user():
#     # This is the JSON body the user sent in their POST request.
#     user_as_json = app.current_request.json_body
#     # We'll echo the json body back to the user in a 'user' key.
#     return {'user': user_as_json}
#
# See the README documentation for more examples.
#

