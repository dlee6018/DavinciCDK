import json
import requests
from datetime import datetime

def handler(event, context):
    # Make a simple HTTP request to a public API
    response = requests.get('https://api.github.com')
    
    # Get the current time
    current_time = datetime.utcnow().isoformat()
    
    return {
        'statusCode': 200,
        'body': json.dumps({
            'message': 'Hello from Lambda!',
            'currentTime': current_time,
            'github_api_status': response.status_code
        })
    }
