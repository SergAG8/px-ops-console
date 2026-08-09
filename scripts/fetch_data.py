import requests, os, json
from collections import defaultdict

BASE = os.environ["METABASE_URL"]
HEADERS = {"x-api-key": os.environ["METABASE_API_KEY"]}
CARDS = {
    "ism_base": os.environ["CARD_ISM_BASE"],
    "ism_subscriptions": os.environ["CARD_ISM_SUBSCRIPTIONS"],
    "ism_tasks": os.environ["CARD_ISM_TASKS"],
    "ism_touches": os.environ["CARD_ISM_TOUCHES"],
    "ism_revenue": os.environ["CARD_ISM_REVENUE"],
    "subs_installments": os.environ["CARD_SUBS_INSTALLMENTS"],
}

os.makedirs("public/data", exist_ok=True)

def fetch(card_id):
    resp = requests.post(f"{BASE}/api/card/{card_id}/query/json", headers=HEADERS, timeout=180)
    resp.raise_for_status()
    return resp.json()

for name, card_id in CARDS.items():
    print(f"Fetching {name} (card {card_id})...")
    rows = fetch(card_id)

    if name == "ism_touches":
        # ~400k+ raw rows is too heavy to ship to the browser — the dashboard only
        # ever shows totals (calls, successful, talk time, messages) per manager
        # per day, never a single call/message row. Summing here in Python gives
        # the exact same numbers on screen, at a fraction of the file size.
        agg = defaultdict(lambda: {"calls": 0, "successful_calls": 0, "talk_seconds": 0, "messages": 0})
        for r in rows:
            manager = (r.get("manager") or "").strip()
            if not manager or manager == "Bloomreach":
                continue
            touched_at = str(r.get("touched_at") or "")
            day = touched_at[:10]
            key = (r.get("region") or "", manager, day)
            if r.get("touch_type") == "call":
                agg[key]["calls"] += 1
                if r.get("is_call_successfully"):
                    agg[key]["successful_calls"] += 1
                agg[key]["talk_seconds"] += r.get("talk_seconds") or 0
            elif r.get("touch_type") == "message":
                agg[key]["messages"] += 1
        out = [{"region": k[0], "manager": k[1], "day": k[2], **v} for k, v in agg.items()]
    else:
        out = rows

    with open(f"public/data/{name}.json", "w") as f:
        json.dump(out, f, default=str)

    print(f"  -> {len(rows)} raw rows -> {len(out)} rows saved to public/data/{name}.json")

print("Done.")
