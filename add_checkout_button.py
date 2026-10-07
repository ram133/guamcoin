import os

html_content = """<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>GuamCoin - Automated Monetization & Outreach</title>
    <style>
        body { font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif; background: #0f172a; color: #f8fafc; text-align: center; padding: 50px; }
        .container { max-width: 600px; margin: 0 auto; background: #1e293b; padding: 40px; border-radius: 12px; box-shadow: 0 10px 25px rgba(0,0,0,0.3); }
        h1 { color: #38bdf8; }
        .btn { display: inline-block; background: #2563eb; color: white; padding: 12px 24px; text-decoration: none; border-radius: 6px; font-weight: bold; margin-top: 20px; }
        .btn:hover { background: #1d4ed8; }
    </style>
</head>
<body>
    <div class="container">
        <h1>GuamCoin</h1>
        <p>Cloud-Native Automated Monetization & Outreach Gateway</p>
        <a href="https://buy.stripe.com/test_placeholder" class="btn" target="_blank">Proceed to Checkout ($5.00)</a>
    </div>
</body>
</html>
"""

with open("index.html", "w") as f:
    f.write(html_content)

print("index.html updated with live checkout button.")
