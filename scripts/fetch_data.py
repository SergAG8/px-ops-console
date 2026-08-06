import requests, os, json

BASE = os.environ["METABASE_URL"]
HEADERS = {"x-api-key": os.environ["METABASE_API_KEY"]}
CARDS = {
    "ism_base": os.environ["CARD_ISM_BASE"],
    "ism_subscriptions": os.environ["CARD_ISM_SUBSCRIPTIONS"],
    "ism_tasks": os.environ["CARD_ISM_TASKS"],
    "ism_touches": os.environ["CARD_ISM_TOUCHES"],
    "ism_revenue": os.environ["CARD_ISM_REVENUE"],
}

os.makedirs("public/data", exist_ok=True)

for name, card_id in CARDS.items():
    print(f"Fetching {name} (card {card_id})...")
    # /query/json is the "export" endpoint (same one the download button uses)
    # it does NOT apply the 2000-row UI preview cap that /query does.
    resp = requests.post(f"{BASE}/api/card/{card_id}/query/json", headers=HEADERS, timeout=180)
    resp.raise_for_status()
    out = resp.json()  # this endpoint already returns a plain list of row objects

    with open(f"public/data/{name}.json", "w") as f:
        json.dump(out, f, default=str)

    print(f"  -> {len(out)} rows saved to public/data/{name}.json")

print("Done.")
