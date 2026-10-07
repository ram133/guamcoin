import json
import os

LOG_FILE = "contact_log.txt"
METRICS_FILE = "metrics.json"

def track():
    contacted_count = 0
    if os.path.exists(LOG_FILE):
        with open(LOG_FILE, "r") as f:
            lines = f.readlines()
            contacted_count = len([l for l in lines if "Contacted" in l])
    
    metrics = {
        "total_contacted": contacted_count,
        "estimated_revenue": contacted_count * 5.00
    }
    
    with open(METRICS_FILE, "w") as f:
        json.dump(metrics, f, indent=2)
    print(f"[Tracker] Updated metrics: {metrics}")

if __name__ == "__main__":
    track()
