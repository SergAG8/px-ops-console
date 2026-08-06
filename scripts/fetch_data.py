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
    resp = requests.post(f"{BASE}/api/card/{card_id}/query", headers=HEADERS, timeout=180)
    resp.raise_for_status()
    payload = resp.json()

    data = payload.get("data", payload)
    rows = data.get("rows", [])
    cols = [c["name"] for c in data.get("cols", [])]

    out = [dict(zip(cols, row)) for row in rows]

    with open(f"public/data/{name}.json", "w") as f:
        json.dump(out, f, default=str)

    print(f"  -> {len(out)} rows saved to public/data/{name}.json")

print("Done.")
