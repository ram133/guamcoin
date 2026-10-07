import json

with open("metrics.json", "r") as f:
    metrics = json.load(f)

# Scaling outreach batch size for aggressive growth
metrics["batch_multiplier"] = 2.0

with open("metrics.json", "w") as f:
    json.dump(metrics, f, indent=2)

print("Pipeline scaled for higher volume outreach.")
