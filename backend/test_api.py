import requests
url = "http://127.0.0.1:5000/api/process"
request_data = {
    "task": "Analyse",
    "inputs": ["d30.csv", "Trend", "EURUSD", 30]
}

response = requests.post(url, json=request_data)
 
print("Status:", response.status_code)
print("Content-Type:", response.headers.get("Content-Type"))
print("Response:", response.text)

