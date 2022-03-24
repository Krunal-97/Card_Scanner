from urllib import response
from xml.dom.minidom import Document
from chalice import Chalice
import boto3
from chalicelib import textract_service
from chalicelib import medcomprehend_service

textract_service = textract_service.TextractService()
medcomprehend_service = medcomprehend_service.MedComprehendService()

def convert_image_byte(image_file):
    with open(image_file, "rb") as image:
        return image.read()

app = Chalice(app_name='card_scan')

img = '/Users/krunal/Desktop/015.jpeg'

@app.route('/transalate')
def trans():

    imageInBytes = convert_image_byte(img)
    
    text_detected = textract_service.detect_text(imageInBytes)
    
    response = medcomprehend_service.detect_entities(text_detected)
    
    entities = response['Entities']
    
    result = {}
    for i in range(len(entities)):
        result[entities[i]['Text']] = entities[i]['Type']

    print( text_detected,result)
    return (text_detected,result)
    
trans()
# @app.route('/find_entities')
# def find_entities():
#     response = cl
# nt2.detect_entities(
#     Text='Ph: 412-621-1356 Fax: 412-621-2410 MARK D. MALVIN, D.M.D. Comprehensive Dental Care Office Hours 410 S. Craig St. Suite 102 By Appointment Pittsburgh, PA 15213')
#     print(response)
    


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

