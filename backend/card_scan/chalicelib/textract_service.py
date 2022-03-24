import boto3


class TextractService:
    def __init__(self):
        self.client = boto3.client('textract')

    def detect_text(self, imageInBytes):

        response = self.client.detect_document_text(Document={'Bytes':imageInBytes})
        
        str_op = []
        for item in response['Blocks']:
            if (item['BlockType'] =='Line' or item['BlockType'] == 'WORD'):
                str_op.append(item['Text'])
        
        final_string = ' '.join(str_op)
        print(final_string)

        return final_string
        
