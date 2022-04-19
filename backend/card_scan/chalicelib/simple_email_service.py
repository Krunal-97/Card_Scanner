import boto3
from email import encoders
from email.mime.base import MIMEBase
from email.mime.application import MIMEApplication
from email.mime.multipart import MIMEMultipart
from email.mime.text import MIMEText
import csv
import io


class SES():
    def __init__(self) -> None:
        self.ses_client = boto3.client('ses')
    
    def verify_client(self, email_address:str):
        response = self.ses_client.verify_email_address(EmailAddress=email_address)
        return response
    
    def delete_client(self, email_address:str):
        response = self.ses_client.delete_identity(Identity=email_address)
        return response
    
    def send_email(self, email_id, to, data):
        msg = MIMEMultipart()
        msg["Subject"] = "Search Result of Cards"
        msg["From"] = email_id
        msg["To"] = to

        html = """\
                <html>
                    <head></head>
                    <body>
                        <p>Hi!<br>
                        Download your search result file in this email.
                        </p>
                    </body>
                </html>
            """
        # Set message body
        body = MIMEText(html, "html")
        msg.attach(body)

        output = io.StringIO()
        writer = csv.writer(output)
        for item in data:
            writer.writerow([item['CardID'], item['CardName'],
                             item['email'], item['contact1'], item['contact2'], 
                             item['website'], item['add']])
        
        output.seek(0)
        filename = "card_results.csv"
        part = MIMEApplication(output.read())
        part.add_header("Content-Disposition",
                        "attachment",
                        filename=filename)
        msg.attach(part)

        response = self.ses_client.send_raw_email(
            Source=email_id,
            Destinations=[to],
            RawMessage={"Data": msg.as_string()}
        )
        return response
        