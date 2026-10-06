# https://ram133.github.io/guamcoin
import os
from datetime import datetime

INDEX_FILE = "index.html"

SERVICES = [
    {"title": "Guam Web Development & PWA Setup", "price": "$150", "desc": "Custom single-file progressive web apps and automation scripts."},
    {"title": "Guam Coin & Digital Asset Integration", "price": "$100", "desc": "Stripe payment links and token distribution systems."},
    {"title": "Automated Lead Generation Setup", "price": "$200", "desc": "Python-powered cloud automation running via GitHub Actions."}
]

def generate_page():
    now = datetime.now().strftime("%Y-%m-%d %H:%M:%S")
    html_content = f"""<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Guam Coin & Professional Services</title>
    <style>
        body {{ font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif; max-width: 800px; margin: 40px auto; padding: 0 20px; background: #0f172a; color: #f8fafc; line-height: 1.6; }}
        h1, h2 {{ color: #38bdf8; }}
        .card {{ background: #1e293b; padding: 20px; border-radius: 8px; margin-bottom: 20px; border: 1px solid #334155; }}
        .price {{ font-size: 1.25rem; font-weight: bold; color: #4ade80; }}
        .btn {{ display: inline-block; background: #0284c7; color: white; padding: 10px 20px; text-decoration: none; border-radius: 6px; margin-top: 10px; font-weight: bold; }}
        .btn:hover {{ background: #0369a1; }}
        footer {{ margin-top: 40px; font-size: 0.85rem; color: #94a3b8; text-align: center; }}
    </style>
</head>
<body>
    <h1>Guam Coin & Digital Services</h1>
    <p>Automated programmatic solutions and digital assets for Guam.</p>
    
    <h2>Available Services</h2>
"""
    for service in SERVICES:
        html_content += f"""
    <div class="card">
        <h3>{service['title']}</h3>
        <p>{service['desc']}</p>
        <div class="price">{service['price']}</div>
        <a class="btn" href="https://buy.stripe.com/test_placeholder" target="_blank">Book Service</a>
    </div>
"""

    html_content += f"""
    <footer>
        <p>Last updated via automated cloud worker on {now}</p>
    </footer>
</body>
</html>
"""
    with open(INDEX_FILE, "w") as f:
        f.write(html_content)
    print(f"[{now}] Generated updated index.html successfully.")

if __name__ == "__main__":
    generate_page()
