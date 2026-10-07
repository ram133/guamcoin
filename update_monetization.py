import json

with open("metrics.json", "r") as f:
    metrics = json.load(f)

# Transitioning from estimated to active conversion tracking
metrics["checkout_provider"] = "stripe_or_web3"
metrics["live_conversion_tracking"] = True

with open("metrics.json", "w") as f:
    json.dump(metrics, f, indent=2)

print("Monetization configuration updated for live checkout integration.")
