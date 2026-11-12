# React + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react) uses [Oxc](https://oxc.rs)
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react-swc) uses [SWC](https://swc.rs/)

## React Compiler

The React Compiler is not enabled on this template because of its impact on dev & build performances. To add it, see [this documentation](https://react.dev/learn/react-compiler/installation).

## Expanding the ESLint configuration

If you are developing a production application, we recommend using TypeScript with type-aware lint rules enabled. Check out the [TS template](https://github.com/vitejs/vite/tree/main/packages/create-vite/template-react-ts) for information on how to integrate TypeScript and [`typescript-eslint`](https://typescript-eslint.io) in your project.

===========================
cd ~/Desktop/Projects
npm create vite@latest economic-currency-dashboard
- Framework: React
- Variant: JavaScript
Then:  ● ESLint
-------------git 
pwd
git init
git status
git add .
git commit -m "Initial commit - project setup"

Step 4 — Connect to GitHub
آدرس Repository جدیدت را جایگزین کن:
git branch -M main
git remote add origin https://github.com/manavaziri/Forex-Economic-Dashboard.git
git push -u origin main

git status

----------------
The font-weight
      CSS property sets the thickness or thinness of characters in a typeface.
-------------------
Header
-------------------
Processdata and make filter
--------------------
Filter 
Filter css ###
---------------------
SideBar
-----------------






-------------2. نصب Flask
ابتدا وارد پوشه پروژه شو و یک پوشه برای Backend ایجاد کن.
mkdir backend
cd backend


حالا یک محیط مجازی Python بساز:
python3 -m venv .venv


این دستور یک محیط مجازی به نام .venv ایجاد می‌کند تا کتابخانه‌های Python پروژه از سایر پروژه‌ها جدا باشند.

آن را فعال کن:
source .venv/bin/activate


حالا Flask را نصب کن:
pip install flask


برای بررسی نصب:
pip show flask


3. اولین برنامه Flask
داخل پوشه backend یک فایل به نام app.py بساز.

کد زیر را داخل آن قرار بده:
from flask import Flask, request, jsonifyapp = Flask(__name__)@app.route("/api/process", methods=["POST"])def process_request():    data = request.get_json()    task = data.get("task")    inputs = data.get("inputs", [])    if task == "Analyse":        result = analyse_data(*inputs)    elif task == "UpdateEconomicData":        result = update_economic_data(*inputs)    else:        return jsonify({"error": "Unknown task"}), 400    return jsonify(result)if __name__ == "__main__":    app.run(debug=True, port=5000)



حالا تک‌تک قسمت‌ها را بررسی کنیم.
4. توضیح دستورات
دستور اول
from flask import Flask, request, jsonify



سه ابزار از کتابخانه Flask وارد می‌کنیم:
ابزار	کاربرد
Flask	ساخت Web Server
request	دریافت اطلاعاتی که React می‌فرستد
jsonify	تبدیل نتیجه Python به JSON برای ارسال به React

دستور دوم
app = Flask(__name__)



یک نمونه از Flask می‌سازیم.

به زبان ساده، این دستور برنامه وب ما را ایجاد می‌کند.

__name__ یک متغیر داخلی Python است که به Flask کمک می‌کند محل برنامه و منابع آن را تشخیص دهد.

دستور سوم
@app.route("/api/process", methods=["POST"])



این قسمت بسیار مهم است.

به آن Route یا مسیر می‌گوییم.

یعنی اگر React درخواستی به آدرس زیر بفرستد:
http://localhost:5000/api/process


Flask باید آن درخواست را به تابعی که بعد از این دستور آمده هدایت کند.

POST یعنی React می‌خواهد اطلاعاتی را برای Python ارسال کند.

دستور چهارم
def process_request():



این تابع زمانی اجرا می‌شود که درخواست مناسب به Route بالا برسد.

یعنی React با ارسال درخواست، باعث اجرای این تابع می‌شود.

دستور پنجم
data = request.get_json()



اطلاعاتی را که React ارسال کرده دریافت می‌کنیم.

مثلاً React این اطلاعات را فرستاده است:
{
  "task": "Analyse",
  "inputs": ["d30.csv", "Trend", "EURUSD", 30]
}


حالا در Python:
task = data.get("task")inputs = data.get("inputs", [])



- task مقدار "Analyse" را دریافت می‌کند.
- inputs آرایه‌ای شامل چهار مقدار دریافت می‌کند.
- اگر inputs وجود نداشته باشد، یک آرایه خالی [] در نظر گرفته می‌شود.
دستور ششم
result = analyse_data(*inputs)



این قسمت جالب است!

علامت * در اینجا باعث می‌شود اعضای آرایه به‌عنوان آرگومان‌های جداگانه به تابع ارسال شوند.

مثلاً:
inputs = ["d30.csv", "Trend", "EURUSD", 30]



این دستور:
analyse_data(*inputs)



معادل این دستور است:
analyse_data("d30.csv", "Trend", "EURUSD", 30)



بنابراین تابع Python می‌تواند به این شکل باشد:
def analyse_data(file_name, analyse, currency, period):    # Analysis code    pass



pass یعنی فعلاً کاری انجام نده؛ بعداً کد تحلیل را اضافه می‌کنیم.

دستور هفتم
return jsonify(result)



نتیجه اجرای تابع را به JSON تبدیل می‌کند و به React برمی‌گرداند.

مثلاً اگر نتیجه Python این باشد:
result = {"trend": "Up", "score": 75}



React همین اطلاعات را به شکل JSON دریافت می‌کند.

دستور آخر
if __name__ == "__main__":    app.run(debug=True, port=5000)



این قسمت می‌گوید اگر فایل app.py مستقیماً اجرا شد، Flask Server را راه‌اندازی کن.
- debug=True: در زمان توسعه، خطاها را بهتر نمایش می‌دهد و با تغییر کد سرور را مجدداً بارگذاری می‌کند.
- port=5000: سرور روی پورت 5000 اجرا می‌شود.
برای استفاده واقعی در محیط Production باید Debug را خاموش کنیم.

اجزای دستور:ین دستور یک درخواست ساده به صفحه اصلی Flask می‌فرستد.
- curl: ارسال درخواست HTTP.
- http://127.0.0.1:5000/: آدرس Flask.
- -i: علاوه بر محتوای پاسخ، اطلاعات HTTP Header را هم نمایش بده.
در واقع با این دستور می‌توانیم بدون استفاده از React یا Python، مستقیماً با Flask ارتباط برقرار کنیم.