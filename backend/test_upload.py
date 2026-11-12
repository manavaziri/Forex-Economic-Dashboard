import requests
from pathlib import Path

url = "http://127.0.0.1:5000/api/upload-tradingview"

file_path = Path.home() / "Downloads" / "d3.csv"

with open(file_path, "rb") as f:
    response = requests.post(
        url,
        files={"file": f},
        data={"month": "26_11"}
    )
#ارسال درخواست به Flask
print("Status:", response.status_code)
print("Headers:", response.headers)
print("Response:", response.text)

if response.status_code == 200:
    result = response.json()
    print(result["message"])
    print("Number of rows:", len(result["data"]))
else:
    print(response.text)
    