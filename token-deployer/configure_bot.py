import os
import urllib.request
import urllib.parse
import json

token = os.environ.get("BOT_TOKEN")
if not token or token == "YOUR_ACTUAL_BOT_TOKEN_HERE":
    token = input("Enter your Telegram Bot Token from @BotFather: ").strip()

webhook_url = "https://digital_factory.workers.dev/telegram-webhook"
api_url = f"https://api.telegram.org/bot{token}/setWebhook"

data = urllib.parse.urlencode({"url": webhook_url}).encode("utf-8")
req = urllib.request.Request(api_url, data=data)

try:
    with urllib.request.urlopen(req) as response:
        res = json.loads(response.read().decode("utf-8"))
        if res.get("ok"):
            print("========================================")
            print("SUCCESS! Telegram Webhook Connected!")
            print(f"Relay Active: {webhook_url}")
            print("========================================")
        else:
            print(f"Telegram API Error: {res}")
except Exception as e:
    print(f"Error connecting webhook: {e}")
