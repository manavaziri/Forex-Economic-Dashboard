
import requests

url = "http://127.0.0.1:5000/api/process"

params = {
    "task": "Analyse",
    "currency": "EURUSD"
}

response = requests.get(url, params=params)

print("Status:", response.status_code)
print("Result:", response.json())
