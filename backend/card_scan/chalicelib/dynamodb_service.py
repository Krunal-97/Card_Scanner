import boto3
from boto3.dynamodb.conditions import Key
import uuid
import time

class DynamodbService:
	def __init__(self, table_name, region_name):
		self.table_name = table_name
		self.region_name = region_name
		self.client = boto3.client('dynamodb',region_name=self.region_name)
		try:
			self.create_card_table()
			while(True):
				if self.client.describe_table(TableName=self.table_name)['Table']['TableStatus'] != 'ACTIVE':
					time.sleep(1)
				else:
					break
			self.table = boto3.resource('dynamodb', region_name=self.region_name).Table(self.table_name)
		except self.client.exceptions.ResourceInUseException:
			self.table = boto3.resource('dynamodb', region_name=self.region_name).Table(self.table_name)
		except Exception as e:
			print("Error Type: "+str(type(e)))
			print("Error: "+str(e))

	def create_card_table(self):
		table = boto3.resource('dynamodb',region_name=self.region_name).create_table(
			TableName=self.table_name,
			KeySchema=[
				{
				'AttributeName': 'CardID',
				'KeyType': 'HASH'  # Partition key
				}
			],
			AttributeDefinitions=[
				{
				'AttributeName': 'CardID',
				'AttributeType': 'S'
				},
				{
				'AttributeName': 'userId',
				'AttributeType': 'S'
				},
				{
				'AttributeName': 'CardName',
				'AttributeType': 'S'
				}
			],
			GlobalSecondaryIndexes=[
				{
					'IndexName': 'userId',
					'KeySchema': [
						{
						'AttributeName': 'userId',
						'KeyType': 'HASH'
						},
						{
						'AttributeName': 'CardName',
						'KeyType': 'RANGE'
						},
					],
					'Projection': {
						'ProjectionType': 'ALL'
					},
					'ProvisionedThroughput' :{
						'ReadCapacityUnits': 1,
						'WriteCapacityUnits': 1,
					}
				}
			],
			ProvisionedThroughput={
				'ReadCapacityUnits': 1,
				'WriteCapacityUnits': 1
			}
		)
		return table

	def insert_card(self, card_data):
		card_data['CardID'] = str(uuid.uuid4())
		response = self.table.put_item(Item = card_data)
		return response

	def get_all_cards(self):
		response = self.table.scan()
		card_list = []
		for item in response['Items']:
			card_list.append(item)
		return card_list

	def query_cardsByName(self,userId, name):
		response = self.table.query(
			IndexName='userId',
			KeyConditionExpression=Key('userId').eq(userId) & Key('CardName').eq(name)
		)
		card_list = []
		for item in response['Items']:
			card_list.append(item)
		return card_list

	def query_cards(self, name):
		response = self.table.query(
			IndexName='userId',
			KeyConditionExpression=Key('userId').eq(name)
		)
		card_list = []
		for item in response['Items']:
			card_list.append(item)
		return card_list
	

if __name__ == '__main__':
	db = DynamodbService("Business_Card_tbl",'us-east-1')
	#print(db.insert_card({'CardName':'Jiya','Email':'jainil@gmail.com'}))
	#print(db.insert_card({'CardName':'Jainil','Email':'jainil@gmail.com'}))
	print(db.query_cards("Jiya"))
	
