import boto3


class MedComprehendService:

    def __init__(self):
        self.client = boto3.client('comprehendmedical')


    def detect_entities(self, txt):
    	
        find_entities = self.client.detect_entities(Text= txt)

        return find_entities
