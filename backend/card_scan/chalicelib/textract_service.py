import boto3

class TextractService:
    def __init__(self,storage_service):
        self.client = boto3.client('textract','us-east-1')
        self.bucket_name = storage_service.get_storage_location()
        
    def detect_text(self, image_name):
        response = self.client.detect_document_text(
        Document={
            'S3Object': {
                'Bucket': self.bucket_name,
                'Name': image_name
            }
        })

        str_op = []
        for item in response['Blocks']:
            if (item['BlockType'] =='Line' or item['BlockType'] == 'WORD'):
                str_op.append(item['Text'])
        
        final_string = ' '.join(str_op)
        print(final_string)

        return final_string
        
