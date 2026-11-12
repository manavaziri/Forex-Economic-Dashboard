from flask import Flask, request, jsonify
from technical.input_data import input_File
app = Flask(__name__)

@app.route("/api/upload-tradingview", methods=["POST"])
def upload_tradingview():

    file = request.files.get("file")
    
    #از درخواست HTTP که به Flask رسیده، فایلی را که با نام file ارسال شده دریافت کن و در متغیر file قرار بده.
    #نکته: متغیر file در Flask معمولاً یک شیء از نوع FileStorage است، نه یک مسیر فایل در کامپیوتر.
#این شیء اطلاعاتی مانند نام فایل و محتوای آن را در اختیارمان قرار می‌دهد.
#مثلاً: file.filename. نام فایل را برمی‌گرداند:




    month = request.form.get("month")
    #ین خط می‌گوید:
    #مقداری را که با نام month در اطلاعات فرم درخواست ارسال شده دریافت کن.
    #data={"month": "26_11"}

    if not file or not month:
        return jsonify({"error": "File and month are required"}), 400

    filename = file.filename
    file_stem = filename.rsplit(".", 1)[0]

    Type_value = file_stem[0].upper()
    source = file_stem[1:]

    if Type_value not in ["D", "W", "M"] or not source.isdigit():
        return jsonify({"error": "Invalid filename"}), 400

    daily_file, msg = input_File(
        file, month, source, Type_value
    )

    return jsonify({
        "message": msg,
        "data": daily_file.to_dict(orient="records")
    })
    #این کد چه کاری انجام می‌دهد؟
#1. فایل CSV را از React دریافت می‌کند.
#2. مقدار month را دریافت می‌کند.
#3. نوع فایل و source را از نام فایل استخراج می‌کند.
#4. تابع input_File() را اجرا می‌کند.
#5. نتیجه را به شکل JSON به React برمی‌گرداند
#====================
#from technical.input_data import input_File
#print("input_File imported successfully")
#test###############
#@app.route("/")
#def home():
#    return "Hello! Flask server is running."
###############

@app.route("/")
def home():
    return "Hello! Flask server is running."


@app.route("/api/process", methods=["POST"])
def process_request():

    data = request.get_json()

    task = data.get("task")
    inputs = data.get("inputs", [])

    print("Task:", task)
    print("Inputs:", inputs)

    return jsonify({
        "message": "Request received successfully",
        "task": task,
        "inputs": inputs
    })

@app.route("/api/process", methods=["GET"])
def process_get():

    task = request.args.get("task")
    currency = request.args.get("currency")

    return jsonify({
        "message": "GET request received",
        "task": task,
        "currency": currency
    })
if __name__ == "__main__":
    app.run(debug=True, port=5000)
