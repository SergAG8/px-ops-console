import React, { useState, useMemo, useEffect } from 'react';
import { ChevronDown, ChevronRight, Phone, MessageCircle, AlertTriangle, Users, Calendar as CalIcon, Layers, DollarSign, Radio, TrendingUp, Clock, Info, Sun, Moon, RefreshCw } from 'lucide-react';

// ─────────────────────────────────────────────────────────────────────────
// LIVE DATA — fetched from the JSON files GitHub Actions refreshes from
// Metabase every few hours. No more hardcoded per-manager constants.
// ─────────────────────────────────────────────────────────────────────────
const DATA_BASE = 'https://raw.githubusercontent.com/SergAG8/px-ops-console/main/public/data/';

async function fetchJson(name) {
  const url = `${DATA_BASE}${name}.json?t=${Date.now()}`;
  const res = await fetch(url);
  if (!res.ok) throw new Error(`${name}: ${res.status}`);
  return res.json();
}
async function fetchJsonOptional(name) {
  try { return await fetchJson(name); } catch { return null; }
}

const REGIONS = ['LatAm PMC', 'Spain', 'Brazil', 'Italy', 'Poland', 'Turkey', 'Indonesia', 'UK', 'USA', 'CIS']; // GCC excluded — no ISM data yet
const REGIONS_SUBS = [...REGIONS, 'GCC']; // GCC will show up once Subscriptions is wired to live data

const STAGES = [
  'Not yet touched', 'ISM start working', 'Negotiations ISM', 'Waiting for decision', 'Payment control ISM',
  'Not getting through ISM', 'Wallet is waiting to receive funds', 'Reserve base (prolongation)', 'Reserve base (grads)',
  'Payment received', 'Call back', 'Closed', 'Freeze', 'N/A 5+ ISM', 'Other (unconfirmed)',
];
const PIPELINE_STAGES = ['Negotiations ISM', 'Waiting for decision', 'Payment control ISM'];
const STAGE_COLOR = {
  'Not yet touched': 'bg-amber-500', 'ISM start working': 'bg-teal-400', 'Negotiations ISM': 'bg-violet-400', 'Waiting for decision': 'bg-amber-300',
  'Payment control ISM': 'bg-sky-400', 'Not getting through ISM': 'bg-rose-400',
  'Wallet is waiting to receive funds': 'bg-emerald-400', 'Reserve base (prolongation)': 'bg-fuchsia-400', 'Reserve base (grads)': 'bg-purple-400',
  'Payment received': 'bg-lime-400', 'Call back': 'bg-cyan-400', 'Closed': 'bg-red-500', 'Freeze': 'bg-blue-300',
  'N/A 5+ ISM': 'bg-slate-500', 'Other (unconfirmed)': 'bg-slate-800',
};
function bucketStatus(raw) {
  const s = String(raw || '').toLowerCase();
  if (/ism start working|мвп начина/.test(s)) return 'ISM start working';
  if (/negotiat|переговор/.test(s)) return 'Negotiations ISM';
  if (/waiting for decision|delayed decision|отложенный спрос/.test(s)) return 'Waiting for decision';
  if (/payment control|контроль оплаты/.test(s)) return 'Payment control ISM';
  if (/not getting through|не дозвонились|not reachable/.test(s)) return 'Not getting through ISM';
  if (/wallet is waiting|waiting to receive funds|ожидаем пополнения|ожидает зачисления/.test(s)) return 'Wallet is waiting to receive funds';
  if (/reserve.*grad|резерв выпускник/.test(s)) return 'Reserve base (grads)';
  if (/reserve.*prolong|резерв отток/.test(s)) return 'Reserve base (prolongation)';
  if (/payment received|installment payment received|баланс пополнен/.test(s)) return 'Payment received';
  if (/call ?back|follow up/.test(s)) return 'Call back';
  if (/^closed$|отказ \(негатив\)/.test(s)) return 'Closed';
  if (/^freeze$|заморозка/.test(s)) return 'Freeze';
  if (/^n\/?a\s*5\+|ндз 4\+/.test(s)) return 'N/A 5+ ISM';
  return 'Other (unconfirmed)';
}
function normMgrName(n) {
  return String(n || '').replace(/\s*\(amoCRM\)\s*/g, '').trim();
}
const AOV_GUESS = { 'LatAm PMC': 274, Brazil: 251, Turkey: 365, Indonesia: 136, UK: 385, CIS: 521, Poland: 200, Italy: 200, USA: 200, Spain: 250, GCC: 250 };

const SUBS_DATA = {"LatAm PMC": {"0": {"total": 1, "paid": 1, "overdue": 0, "scheduled": 0, "revenue_collected": 182.56, "cr": null, "aov": null, "projected_pending_revenue": null}, "1": {"total": 842, "paid": 37, "overdue": 57, "scheduled": 748, "revenue_collected": 6502.29, "cr": null, "aov": null, "projected_pending_revenue": null}, "2": {"total": 788, "paid": 24, "overdue": 47, "scheduled": 717, "revenue_collected": 3059.49, "cr": null, "aov": null, "projected_pending_revenue": null}, "3": {"total": 555, "paid": 24, "overdue": 35, "scheduled": 496, "revenue_collected": 3038.89, "cr": null, "aov": null, "projected_pending_revenue": null}, "4": {"total": 275, "paid": 11, "overdue": 24, "scheduled": 240, "revenue_collected": 1878.54, "cr": null, "aov": null, "projected_pending_revenue": null}, "5": {"total": 273, "paid": 12, "overdue": 21, "scheduled": 240, "revenue_collected": 986.82, "cr": null, "aov": null, "projected_pending_revenue": null}, "6": {"total": 281, "paid": 11, "overdue": 22, "scheduled": 248, "revenue_collected": 963.63, "cr": null, "aov": null, "projected_pending_revenue": null}, "7": {"total": 238, "paid": 5, "overdue": 23, "scheduled": 210, "revenue_collected": 524.48, "cr": null, "aov": null, "projected_pending_revenue": null}, "8": {"total": 120, "paid": 4, "overdue": 13, "scheduled": 103, "revenue_collected": 185.26, "cr": null, "aov": null, "projected_pending_revenue": null}, "9": {"total": 145, "paid": 4, "overdue": 20, "scheduled": 121, "revenue_collected": 349.22, "cr": null, "aov": null, "projected_pending_revenue": null}}, "Brazil": {"1": {"total": 42, "paid": 0, "overdue": 4, "scheduled": 38, "revenue_collected": null, "cr": 0.326, "aov": 98, "projected_pending_revenue": 1342}, "2": {"total": 22, "paid": 0, "overdue": 2, "scheduled": 20, "revenue_collected": null, "cr": 0.279, "aov": 80, "projected_pending_revenue": 491}, "3": {"total": 50, "paid": 0, "overdue": 4, "scheduled": 46, "revenue_collected": null, "cr": 0.256, "aov": 106, "projected_pending_revenue": 1357}, "4": {"total": 32, "paid": 0, "overdue": 6, "scheduled": 26, "revenue_collected": null, "cr": 0.118, "aov": 128, "projected_pending_revenue": 483}, "5": {"total": 51, "paid": 0, "overdue": 3, "scheduled": 48, "revenue_collected": null, "cr": 0.143, "aov": 47, "projected_pending_revenue": 343}, "6": {"total": 15, "paid": 0, "overdue": 0, "scheduled": 15, "revenue_collected": null, "cr": 0, "aov": 0, "projected_pending_revenue": 0}, "7": {"total": 5, "paid": 0, "overdue": 0, "scheduled": 5, "revenue_collected": null, "cr": 0.15, "aov": 152, "projected_pending_revenue": 114}, "9": {"total": 3, "paid": 0, "overdue": 0, "scheduled": 3, "revenue_collected": null, "cr": 0, "aov": 0, "projected_pending_revenue": 0}}, "Turkey": {"1": {"total": 72, "paid": 0, "overdue": 9, "scheduled": 63, "revenue_collected": null, "cr": 0.533, "aov": 223, "projected_pending_revenue": 8558}, "2": {"total": 45, "paid": 0, "overdue": 3, "scheduled": 42, "revenue_collected": null, "cr": 0.524, "aov": 114, "projected_pending_revenue": 2688}, "3": {"total": 55, "paid": 0, "overdue": 10, "scheduled": 45, "revenue_collected": null, "cr": 0.211, "aov": 97, "projected_pending_revenue": 1126}, "4": {"total": 21, "paid": 0, "overdue": 1, "scheduled": 20, "revenue_collected": null, "cr": 0.306, "aov": 97, "projected_pending_revenue": 623}, "5": {"total": 33, "paid": 0, "overdue": 2, "scheduled": 31, "revenue_collected": null, "cr": 0.171, "aov": 104, "projected_pending_revenue": 587}, "6": {"total": 23, "paid": 0, "overdue": 1, "scheduled": 22, "revenue_collected": null, "cr": 0.034, "aov": 55, "projected_pending_revenue": 43}, "7": {"total": 15, "paid": 0, "overdue": 2, "scheduled": 13, "revenue_collected": null, "cr": 0.15, "aov": 152, "projected_pending_revenue": 342}}, "Indonesia": {"1": {"total": 56, "paid": 0, "overdue": 4, "scheduled": 52, "revenue_collected": null, "cr": 0.563, "aov": 82, "projected_pending_revenue": 2585}, "2": {"total": 58, "paid": 0, "overdue": 4, "scheduled": 54, "revenue_collected": null, "cr": 0.643, "aov": 84, "projected_pending_revenue": 3133}, "3": {"total": 1, "paid": 0, "overdue": 0, "scheduled": 1, "revenue_collected": null, "cr": null, "aov": null, "projected_pending_revenue": null}}, "UK": {"1": {"total": 83, "paid": 0, "overdue": 7, "scheduled": 76, "revenue_collected": null, "cr": 0.614, "aov": 263, "projected_pending_revenue": 13403}, "2": {"total": 56, "paid": 0, "overdue": 2, "scheduled": 54, "revenue_collected": null, "cr": 0.656, "aov": 299, "projected_pending_revenue": 10984}, "3": {"total": 46, "paid": 0, "overdue": 1, "scheduled": 45, "revenue_collected": null, "cr": 0.559, "aov": 223, "projected_pending_revenue": 5734}, "4": {"total": 8, "paid": 0, "overdue": 0, "scheduled": 8, "revenue_collected": null, "cr": 0.5, "aov": 238, "projected_pending_revenue": 952}, "5": {"total": 11, "paid": 0, "overdue": 1, "scheduled": 10, "revenue_collected": null, "cr": 0.05, "aov": 124, "projected_pending_revenue": 68}, "6": {"total": 3, "paid": 0, "overdue": 1, "scheduled": 2, "revenue_collected": null, "cr": 0.429, "aov": 114, "projected_pending_revenue": 147}, "7": {"total": 20, "paid": 0, "overdue": 2, "scheduled": 18, "revenue_collected": null, "cr": 0.214, "aov": 175, "projected_pending_revenue": 749}, "8": {"total": 8, "paid": 0, "overdue": 2, "scheduled": 6, "revenue_collected": null, "cr": 0.294, "aov": 125, "projected_pending_revenue": 294}, "9": {"total": 17, "paid": 0, "overdue": 2, "scheduled": 15, "revenue_collected": null, "cr": 0, "aov": 0, "projected_pending_revenue": 0}}, "CIS": {"1": {"total": 143, "paid": 0, "overdue": 19, "scheduled": 124, "revenue_collected": null, "cr": 0.42, "aov": 135, "projected_pending_revenue": 8108}, "2": {"total": 91, "paid": 0, "overdue": 9, "scheduled": 82, "revenue_collected": null, "cr": 0.469, "aov": 147, "projected_pending_revenue": 6274}, "3": {"total": 91, "paid": 0, "overdue": 15, "scheduled": 76, "revenue_collected": null, "cr": 0.378, "aov": 152, "projected_pending_revenue": 5228}, "4": {"total": 103, "paid": 0, "overdue": 11, "scheduled": 92, "revenue_collected": null, "cr": 0.283, "aov": 150, "projected_pending_revenue": 4372}, "5": {"total": 10, "paid": 0, "overdue": 1, "scheduled": 9, "revenue_collected": null, "cr": 0.292, "aov": 147, "projected_pending_revenue": 429}, "6": {"total": 5, "paid": 0, "overdue": 1, "scheduled": 4, "revenue_collected": null, "cr": 0.227, "aov": 161, "projected_pending_revenue": 183}, "7": {"total": 16, "paid": 0, "overdue": 2, "scheduled": 14, "revenue_collected": null, "cr": 0.5, "aov": 140, "projected_pending_revenue": 1120}, "9": {"total": 1, "paid": 0, "overdue": 0, "scheduled": 1, "revenue_collected": null, "cr": 0, "aov": 0, "projected_pending_revenue": 0}}, "USA": {"1": {"total": 82, "paid": 0, "overdue": 4, "scheduled": 78, "revenue_collected": null, "cr": 0.667, "aov": 158, "projected_pending_revenue": 8642}, "2": {"total": 62, "paid": 0, "overdue": 4, "scheduled": 58, "revenue_collected": null, "cr": 0.75, "aov": 138, "projected_pending_revenue": 6417}, "3": {"total": 21, "paid": 0, "overdue": 0, "scheduled": 21, "revenue_collected": null, "cr": 0, "aov": 0, "projected_pending_revenue": 0}, "4": {"total": 7, "paid": 0, "overdue": 0, "scheduled": 7, "revenue_collected": null, "cr": 0, "aov": 0, "projected_pending_revenue": 0}}, "Poland": {"1": {"total": 63, "paid": 2, "overdue": 2, "scheduled": 59, "revenue_collected": null, "cr": null, "aov": null, "projected_pending_revenue": null}, "2": {"total": 26, "paid": 0, "overdue": 1, "scheduled": 25, "revenue_collected": null, "cr": null, "aov": null, "projected_pending_revenue": null}, "3": {"total": 4, "paid": 0, "overdue": 0, "scheduled": 4, "revenue_collected": null, "cr": null, "aov": null, "projected_pending_revenue": null}}, "Italy": {"1": {"total": 48, "paid": 0, "overdue": 1, "scheduled": 47, "revenue_collected": null, "cr": null, "aov": null, "projected_pending_revenue": null}, "2": {"total": 8, "paid": 0, "overdue": 1, "scheduled": 7, "revenue_collected": null, "cr": null, "aov": null, "projected_pending_revenue": null}, "3": {"total": 6, "paid": 0, "overdue": 0, "scheduled": 6, "revenue_collected": null, "cr": null, "aov": null, "projected_pending_revenue": null}}, "Spain": {"1": {"total": 112, "paid": 6, "overdue": 4, "scheduled": 102, "revenue_collected": 544.56, "cr": 0.521, "aov": 108, "projected_pending_revenue": 5960}, "2": {"total": 96, "paid": 4, "overdue": 4, "scheduled": 88, "revenue_collected": 331.19, "cr": 0.538, "aov": 107, "projected_pending_revenue": 5297}, "3": {"total": 46, "paid": 3, "overdue": 1, "scheduled": 42, "revenue_collected": 338.07, "cr": 0.559, "aov": 90, "projected_pending_revenue": 2164}, "4": {"total": 52, "paid": 4, "overdue": 5, "scheduled": 43, "revenue_collected": 306.96, "cr": 0.471, "aov": 89, "projected_pending_revenue": 2013}, "5": {"total": 36, "paid": 1, "overdue": 2, "scheduled": 33, "revenue_collected": 92.35, "cr": 0.392, "aov": 96, "projected_pending_revenue": 1317}, "6": {"total": 36, "paid": 2, "overdue": 3, "scheduled": 31, "revenue_collected": 160.36, "cr": 0.324, "aov": 114, "projected_pending_revenue": 1256}, "7": {"total": 47, "paid": 1, "overdue": 9, "scheduled": 37, "revenue_collected": 80.8, "cr": 0.378, "aov": 113, "projected_pending_revenue": 1965}, "8": {"total": 30, "paid": 0, "overdue": 4, "scheduled": 26, "revenue_collected": 0.0, "cr": 0.18, "aov": 100, "projected_pending_revenue": 540}, "9": {"total": 31, "paid": 2, "overdue": 5, "scheduled": 24, "revenue_collected": 228.56, "cr": 0.293, "aov": 105, "projected_pending_revenue": 892}}};
const REGIONS_WITH_REAL_SUBS_CR = ['Brazil', 'Turkey', 'Indonesia', 'CIS', 'USA', 'UK', 'Spain'];

function buildSubsModel(region) {
  const raw = SUBS_DATA[region] || {};
  const tierKeys = Object.keys(raw).sort((a, b) => Number(a) - Number(b));
  const tiers = tierKeys.map((k) => ({ tier: k, ...raw[k] }));
  const hasCrBenchmark = REGIONS_WITH_REAL_SUBS_CR.includes(region);
  const hasRevenueData = tiers.some((t) => t.revenue_collected !== null && t.revenue_collected !== undefined);
  const totalScheduled = tiers.reduce((s, t) => s + t.total, 0);
  const totalPaid = tiers.reduce((s, t) => s + t.paid, 0);
  const totalOverdue = tiers.reduce((s, t) => s + t.overdue, 0);
  const totalPending = totalScheduled - totalPaid;
  const revenueCollected = hasRevenueData ? tiers.reduce((s, t) => s + (t.revenue_collected || 0), 0) : null;
  const projectedPending = hasCrBenchmark ? tiers.reduce((s, t) => s + (t.projected_pending_revenue || 0), 0) : null;
  return { tiers, totalScheduled, totalPaid, totalOverdue, totalPending, revenueCollected, projectedPending, hasCrBenchmark, hasRevenueData };
}

const THEMES = {
  dark: {
    page: 'bg-slate-950', text: 'text-slate-200', headerBorder: 'border-slate-800',
    panel: 'bg-slate-900', panelBorder: 'border-slate-800', muted: 'text-slate-500', mutedStrong: 'text-slate-400',
    strong: 'text-slate-100', border: 'border-slate-800', rowHover: 'hover:bg-slate-800', track: 'bg-slate-800',
    pillActive: 'bg-slate-800 border-teal-500 text-slate-100', pillInactive: 'border-slate-800 text-slate-500 hover:text-slate-300',
    input: 'bg-slate-900 border-slate-800 text-slate-200', subtle: 'bg-slate-950', badge: 'bg-amber-950 text-amber-400 border-amber-800',
    dot: 'bg-slate-700', chip: 'bg-slate-900 border-slate-800 text-slate-500', totalActive: 'bg-amber-950 border-amber-500 text-amber-300',
    totalInactive: 'border-slate-800 text-slate-500 hover:text-amber-300', headerChip: 'bg-violet-950 text-violet-300 border-violet-700',
  },
  light: {
    page: 'bg-slate-50', text: 'text-slate-800', headerBorder: 'border-slate-200',
    panel: 'bg-white', panelBorder: 'border-slate-200', muted: 'text-slate-500', mutedStrong: 'text-slate-600',
    strong: 'text-slate-900', border: 'border-slate-200', rowHover: 'hover:bg-slate-100', track: 'bg-slate-200',
    pillActive: 'bg-slate-100 border-teal-600 text-slate-900', pillInactive: 'border-slate-200 text-slate-500 hover:text-slate-800',
    input: 'bg-white border-slate-300 text-slate-800', subtle: 'bg-slate-100', badge: 'bg-amber-100 text-amber-700 border-amber-300',
    dot: 'bg-slate-300', chip: 'bg-white border-slate-200 text-slate-500', totalActive: 'bg-amber-100 border-amber-500 text-amber-700',
    totalInactive: 'border-slate-200 text-slate-500 hover:text-amber-700', headerChip: 'bg-violet-100 text-violet-700 border-violet-300',
  },
};

function Badge({ t, children }) { return <span className={`text-xs px-1.5 py-0.5 rounded border ml-2 ${t.badge}`}>{children}</span>; }

function Metric({ t, label, value, sub, accent, icon: Icon, preview }) {
  return (
    <div className={`${t.panel} border ${t.panelBorder} rounded-xl px-4 py-3 flex-1 min-w-40`}>
      <p className={`text-xs uppercase tracking-wide ${t.muted} mb-1 flex items-center`}>{Icon && <Icon size={11} className="mr-1" />}{label}</p>
      <p className={`font-mono text-2xl ${t.strong} ${accent || ''}`}>{value}</p>
      {sub && <p className={`text-xs ${t.muted} mt-1`}>{sub}</p>}
    </div>
  );
}

function StageBar({ t, breakdown, total }) {
  return (
    <div>
      <div className={`flex h-2 rounded-full overflow-hidden ${t.track}`}>
        {STAGES.map((s) => { const v = breakdown[s] || 0; const pct = total ? (v / total) * 100 : 0; return pct > 0 ? <div key={s} className={STAGE_COLOR[s]} style={{ width: `${pct}%` }} title={`${s}: ${v}`} /> : null; })}
      </div>
      <div className="grid grid-cols-2 md:grid-cols-3 gap-y-2 gap-x-4 mt-3">
        {STAGES.map((s) => { const v = breakdown[s] || 0; const pct = total ? Math.round((v / total) * 1000) / 10 : 0; return (
          <div key={s} className={`flex items-center gap-2 text-xs ${t.mutedStrong}`}>
            <span className={`w-2 h-2 rounded-full shrink-0 ${STAGE_COLOR[s]}`} />
            <span className="truncate">{s}</span>
            <span className={`font-mono ml-auto shrink-0 ${t.strong}`}>{v} <span className={t.muted}>({pct}%)</span></span>
          </div>
        ); })}
      </div>
    </div>
  );
}

// ─────────────────────────────────────────────────────────────────────────
// Core aggregation: everything computed live from the fetched raw rows.
// ─────────────────────────────────────────────────────────────────────────
function computeRegion(raw, region, from, to) {
  const base = raw.base.filter((r) => r.region === region);
  const seenStudent = new Map();
  base.forEach((r) => { if (!seenStudent.has(r.student_id)) seenStudent.set(r.student_id, r); });
  const totalLeads = seenStudent.size;
  const studentSet = new Set(seenStudent.keys());

  const blocks = { upsells: 0, pim: 0, prevMonth: 0 };
  seenStudent.forEach((r) => {
    if (r.block === 'Upsells') blocks.upsells++;
    else if (r.block === 'Prolongation in Month') blocks.pim++;
    else if (r.block === 'Prolongation from Prev Month') blocks.prevMonth++;
  });

  const tasks = raw.tasks.filter((r) => r.region === region);
  const inRange = (dt) => dt && dt >= from && dt <= to + 'T23:59:59';
  const tasksInRange = tasks.filter((r) => inRange(r.created_at));

  // Current manager per lead — prefer the REAL, authoritative assignment field
  // (ism_manager, from kodland_shared.basics_ismstudentinformation) when we
  // have it. Fall back to "whoever has the most recent task" only for leads
  // where that field is missing.
  const leadManager = new Map(); // student_id -> name
  seenStudent.forEach((row, sid) => {
    if (row.ism_manager) leadManager.set(sid, normMgrName(row.ism_manager));
  });
  const taskLatestDate = new Map();
  tasks.forEach((r) => {
    if (!r.manager || leadManager.has(r.student_id)) return; // real field already covers this lead
    const prevDate = taskLatestDate.get(r.student_id);
    if (!prevDate || (r.created_at && r.created_at > prevDate)) {
      taskLatestDate.set(r.student_id, r.created_at);
      leadManager.set(r.student_id, normMgrName(r.manager));
    }
  });

  // "Ever touched" = has ANY task at all, any time — used only for the
  // manager expandable detail's own "never touched" flag.
  const everTouchedIds = new Set(tasks.map((r) => r.student_id).filter((sid) => studentSet.has(sid)));

  // "Touched this period" = has a task specifically inside the selected date
  // range (FLOW) — drives Utilization, Not-yet-touched, and the Managers
  // table's Touched/Pending, so both top cards stay consistent with each other.
  const touchedPeriodIds = new Set(tasksInRange.map((r) => r.student_id).filter((sid) => studentSet.has(sid)));
  const touchedCount = touchedPeriodIds.size;
  const touchedPct = totalLeads ? Math.round((touchedCount / totalLeads) * 100) : 0;

  const touchesInRange = (raw.touches || []).filter((r) => r.region === region && r.day >= from && r.day <= to);

  // Region-level status breakdown — matches BO's own Kanban filter behavior:
  // BO's board has its own date-range filter on last_ism_trigger_work_at, so
  // "how many are in Negotiations/Waiting" genuinely depends on the date range
  // you pick, same as BO. A lead only counts under its real status if that
  // status's last trigger date falls inside the selected range; otherwise it
  // falls into "Not yet touched" for THIS specific window.
  const inTriggerRange = (dt) => dt && dt >= from && dt <= to + 'T23:59:59';
  const stageCounts = {};
  STAGES.forEach((s) => { stageCounts[s] = 0; });
  seenStudent.forEach((row, sid) => {
    if (inTriggerRange(row.last_ism_trigger_work_at)) stageCounts[bucketStatus(row.status)]++;
    else stageCounts['Not yet touched']++;
  });

  const aov = AOV_GUESS[region] || 250;
  const pipelineLeads = PIPELINE_STAGES.reduce((s, k) => s + stageCounts[k], 0);
  const pipelineRevenue = Math.round(pipelineLeads * aov);

  // revenue: only if raw.revenue is loaded (Question 5) — this IS a flow metric, so it stays range-gated
  let revenueAug = null, revenueByManager = {};
  if (raw.revenue) {
    const rev = raw.revenue.filter((r) => r.region === region && r.payment_department === 'ISM' && r.payment_dt >= from && r.payment_dt <= to + 'T23:59:59');
    revenueAug = rev.reduce((s, r) => s + (r.payment_amount_usd || 0), 0);
    rev.forEach((r) => { const m = normMgrName(r.manager); revenueByManager[m] = (revenueByManager[m] || 0) + (r.payment_amount_usd || 0); });
  }

  // manager rollup — EVERY manager who currently owns at least one lead in this month's base
  const mgrLeadIds = new Map(); // name -> [student_id...]
  leadManager.forEach((name, sid) => {
    if (!studentSet.has(sid)) return; // only leads that belong to THIS month's cohort
    if (!mgrLeadIds.has(name)) mgrLeadIds.set(name, []);
    mgrLeadIds.get(name).push(sid);
  });

  const managers = Array.from(mgrLeadIds.entries()).map(([name, myLeadIds]) => {
    const assigned = myLeadIds.length;
    const touched = myLeadIds.filter((sid) => touchedPeriodIds.has(sid)).length;
    const pending = assigned - touched;

    const overdue = tasks.filter((r) => normMgrName(r.manager) === name && r.is_completed === false && r.deadline && r.deadline < to).length;

    const myTouches = touchesInRange.filter((r) => normMgrName(r.manager) === name);
    const calls = myTouches.reduce((s, r) => s + (r.calls || 0), 0);
    const successfulCalls = myTouches.reduce((s, r) => s + (r.successful_calls || 0), 0);
    const talkMin = Math.round(myTouches.reduce((s, r) => s + (r.talk_seconds || 0), 0) / 60 * 10) / 10;
    const messages = myTouches.reduce((s, r) => s + (r.messages || 0), 0);

    // Status detail (expandable row) — same date-range-gated status logic as
    // the region panel, restricted to this manager's own leads.
    const stages = {};
    STAGES.forEach((s) => { stages[s] = 0; });
    myLeadIds.forEach((sid) => {
      const row = seenStudent.get(sid);
      if (row && inTriggerRange(row.last_ism_trigger_work_at)) stages[bucketStatus(row.status)]++;
      else stages['Not yet touched']++;
    });
    const mgrPipelineLeads = PIPELINE_STAGES.reduce((s, k) => s + stages[k], 0);

    return {
      name, assigned, touched, pending, overdue,
      calls, successfulCalls, talkMin, messages,
      touchesPerLead: touched ? Math.round(((calls + messages) / touched) * 100) / 100 : 0,
      stages, pipelineLeads: mgrPipelineLeads, pipelineRevenue: Math.round(mgrPipelineLeads * aov),
      revenue: revenueByManager[name] ?? null,
      hasSales: (revenueByManager[name] ?? 0) > 0,
    };
  }).filter((m) => m.assigned > 1) // drop noise: Team Leaders / inactive accounts that only show up with 0-1 leads
    .sort((a, b) => (b.revenue || 0) - (a.revenue || 0) || b.touched - a.touched);

  return {
    region, totalLeads, blocks, touchedCount, touchedPct, stageCounts, pipelineLeads, pipelineRevenue,
    revenueAug, managers, hasRevenue: !!raw.revenue, tasksAll: tasks,
  };
}

function StreamTouchPanel({ t, region, computed }) {
  // approximate per-stream touch using overall touchedPct (block-level split not tracked separately live yet)
  const BLOCK_LABEL = { upsells: 'Upsells', pim: 'Prolongation in Month', prevMonth: 'Prev Month (July cohort)' };
  return (
    <div className={`${t.panel} border ${t.panelBorder} rounded-xl p-4`}>
      <p className={`text-xs uppercase tracking-wide ${t.muted} mb-3 flex items-center`}>Leads by stream</p>
      <div className="grid md:grid-cols-3 gap-4">
        {['upsells', 'pim', 'prevMonth'].map((b) => (
          <div key={b}>
            <p className={`text-sm ${t.mutedStrong} mb-1`}>{BLOCK_LABEL[b]}</p>
            <p className={`font-mono text-xl ${t.strong}`}>{computed.blocks[b]}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

function ManagerRow({ t, m }) {
  const [expanded, setExpanded] = useState(false);
  const touchedPct = m.assigned ? Math.round((m.touched / m.assigned) * 100) : 0;
  return (
    <>
      <tr onClick={() => setExpanded((e) => !e)} className={`cursor-pointer ${t.rowHover} border-b ${t.border} ${!m.hasSales && m.revenue !== null ? 'opacity-70' : ''}`}>
        <td className={`py-2 px-3 ${t.strong} flex items-center gap-1`}>{expanded ? <ChevronDown size={14} className={t.muted} /> : <ChevronRight size={14} className={t.muted} />}{m.name}</td>
        <td className={`py-2 px-3 font-mono ${t.mutedStrong}`}>{m.assigned}</td>
        <td className="py-2 px-3">
          <div className="flex items-center gap-2">
            <div className={`w-14 h-1.5 rounded-full ${t.track} overflow-hidden`}><div className="h-full bg-teal-400" style={{ width: `${touchedPct}%` }} /></div>
            <span className={`font-mono text-xs ${t.mutedStrong}`}>{touchedPct}%</span>
          </div>
        </td>
        <td className="py-2 px-3 font-mono text-amber-500">{m.pending}</td>
        <td className="py-2 px-3 font-mono">{m.revenue === null ? <span className={t.muted}>pending</span> : <span className={m.hasSales ? 'text-teal-500' : 'text-rose-500'}>${Math.round(m.revenue).toLocaleString()}</span>}</td>
        <td className={`py-2 px-3 font-mono ${t.mutedStrong}`}><Phone size={11} className={`inline ${t.muted} mr-1`} />{m.calls}</td>
        <td className={`py-2 px-3 font-mono ${t.mutedStrong}`}><MessageCircle size={11} className={`inline ${t.muted} mr-1`} />{m.messages}</td>
        <td className="py-2 px-3 font-mono text-sky-500"><Clock size={11} className="inline mr-1" />{m.talkMin}m</td>
        <td className="py-2 px-3"><span className={`font-mono ${m.overdue > 20 ? 'text-rose-500' : t.mutedStrong}`}>{m.overdue}</span></td>
        <td className="py-2 px-3 font-mono text-violet-500">${m.pipelineRevenue.toLocaleString()}</td>
      </tr>
      {expanded && (
        <tr className={`${t.subtle} border-b ${t.border}`}>
          <td colSpan={10} className="px-3 py-3">
            <div className={`flex gap-6 text-xs ${t.mutedStrong} mb-3 flex-wrap`}>
              <span>Touches/lead <span className={`font-mono ${t.strong}`}>{m.touchesPerLead}</span></span>
              <span className={t.muted}>·</span>
              <span>Successful calls <span className={`font-mono ${t.strong}`}>{m.successfulCalls}</span> / {m.calls}</span>
              <span className={t.muted}>·</span>
              <span>Pipeline leads (Negotiation+Waiting) <span className="font-mono text-violet-500">{m.pipelineLeads}</span></span>
            </div>
            <StageBar t={t} breakdown={m.stages} total={m.assigned} />
          </td>
        </tr>
      )}
    </>
  );
}

function SubscriptionsPanel({ t, region }) {
  const subs = useMemo(() => buildSubsModel(region), [region]);
  const [tierIdx, setTierIdx] = useState('total');
  const view = tierIdx === 'total' ? null : subs.tiers.find((tt) => tt.tier === tierIdx);

  if (!subs.tiers.length) return <p className={`text-sm ${t.muted}`}>No subscriptions data for {region} yet.</p>;

  return (
    <>
      <div className="flex gap-3 flex-wrap mb-5">
        <Metric t={t} label="Leads this month" value={subs.totalScheduled.toLocaleString()} />
        <Metric t={t} label="Paid" value={subs.totalPaid.toLocaleString()} accent="text-teal-500" sub={subs.totalScheduled ? `${Math.round((subs.totalPaid / subs.totalScheduled) * 100)}% of leads` : ''} />
        <Metric t={t} label="Overdue" value={subs.totalOverdue.toLocaleString()} accent="text-amber-500" />
        <Metric t={t} label="Revenue collected" value={subs.hasRevenueData ? `$${Math.round(subs.revenueCollected).toLocaleString()}` : 'n/a'} sub={subs.hasRevenueData ? 'real' : 'not pulled for this region yet'} accent="text-teal-500" />
        <Metric t={t} label="Pending to collect (projected)" value={subs.hasCrBenchmark ? `$${Math.round(subs.projectedPending).toLocaleString()}` : 'no CR benchmark'} sub={subs.hasCrBenchmark ? `${subs.totalPending} pending × official CR/AOV per tier` : 'need official CR/AOV table'} accent="text-violet-500" />
      </div>

      <p className={`text-xs uppercase tracking-wide ${t.muted} mb-2`}>Filter by payment number</p>
      <div className="flex gap-1.5 mb-4 overflow-x-auto pb-1">
        {subs.tiers.map((tt) => (
          <button key={tt.tier} onClick={() => setTierIdx(tt.tier)} className={`text-sm px-3 py-1.5 rounded-lg whitespace-nowrap border ${tierIdx === tt.tier ? t.pillActive : t.pillInactive}`}>
            Payment {tt.tier} <span className={`font-mono ml-1 ${t.muted}`}>{tt.total}</span>
          </button>
        ))}
        <span className={`w-px ${t.track} mx-1`} />
        <button onClick={() => setTierIdx('total')} className={`text-sm px-3 py-1.5 rounded-lg whitespace-nowrap border font-medium ${tierIdx === 'total' ? t.totalActive : t.totalInactive}`}>
          TOTAL <span className="font-mono ml-1">{subs.totalScheduled}</span>
        </button>
      </div>

      {view ? (
        <div className={`${t.panel} border ${t.panelBorder} rounded-xl p-4 mb-4`}>
          <p className={`text-xs uppercase tracking-wide ${t.muted} mb-3`}>Payment {view.tier} — {region}</p>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div><p className={`text-xs ${t.muted}`}>Total leads</p><p className={`font-mono text-xl ${t.strong}`}>{view.total}</p></div>
            <div><p className={`text-xs ${t.muted}`}>Paid</p><p className="font-mono text-xl text-teal-500">{view.paid}</p></div>
            <div><p className={`text-xs ${t.muted}`}>Overdue</p><p className="font-mono text-xl text-rose-500">{view.overdue}</p></div>
            <div><p className={`text-xs ${t.muted}`}>Scheduled (not yet due)</p><p className={`font-mono text-xl ${t.mutedStrong}`}>{view.scheduled}</p></div>
          </div>
          <div className={`mt-3 pt-3 border-t ${t.border} flex flex-wrap gap-6`}>
            {view.revenue_collected !== null && view.revenue_collected !== undefined && (
              <div><p className={`text-xs ${t.muted}`}>Revenue collected</p><p className="font-mono text-teal-500">${Math.round(view.revenue_collected).toLocaleString()}</p></div>
            )}
            {view.cr !== null && view.cr !== undefined ? (
              <>
                <div><p className={`text-xs ${t.muted}`}>Official CR / AOV for this tier</p><p className={`font-mono ${t.mutedStrong}`}>{Math.round(view.cr * 1000) / 10}% · ${view.aov}</p></div>
                <div><p className={`text-xs ${t.muted}`}>Projected pending revenue</p><p className="font-mono text-violet-500">${Math.round(view.projected_pending_revenue).toLocaleString()}</p></div>
              </>
            ) : (
              <div className={`flex items-center gap-1 text-xs ${t.muted}`}><Info size={12} />No official CR/AOV benchmark shared for this tier yet.</div>
            )}
          </div>
        </div>
      ) : (
        <div className={`${t.panel} border ${t.panelBorder} rounded-xl overflow-hidden mb-4 overflow-x-auto`}>
          <table className="w-full text-sm">
            <thead><tr className={`text-left text-xs uppercase tracking-wide ${t.muted} border-b ${t.border}`}>
              <th className="py-2 px-3">Payment #</th><th className="py-2 px-3">Total</th><th className="py-2 px-3">Paid</th><th className="py-2 px-3">Overdue</th><th className="py-2 px-3">Scheduled</th><th className="py-2 px-3">CR / AOV</th><th className="py-2 px-3">Pending revenue (proj.)</th>
            </tr></thead>
            <tbody>{subs.tiers.map((tt) => (
              <tr key={tt.tier} className={`border-b ${t.border} ${t.rowHover} cursor-pointer`} onClick={() => setTierIdx(tt.tier)}>
                <td className={`py-2 px-3 ${t.strong}`}>Payment {tt.tier}</td>
                <td className={`py-2 px-3 font-mono ${t.mutedStrong}`}>{tt.total}</td>
                <td className="py-2 px-3 font-mono text-teal-500">{tt.paid}</td>
                <td className="py-2 px-3 font-mono text-rose-500">{tt.overdue}</td>
                <td className={`py-2 px-3 font-mono ${t.mutedStrong}`}>{tt.scheduled}</td>
                <td className={`py-2 px-3 font-mono ${t.muted}`}>{tt.cr !== null && tt.cr !== undefined ? `${Math.round(tt.cr * 1000) / 10}% · $${tt.aov}` : '—'}</td>
                <td className="py-2 px-3 font-mono text-violet-500">{tt.projected_pending_revenue !== null && tt.projected_pending_revenue !== undefined ? `$${Math.round(tt.projected_pending_revenue).toLocaleString()}` : 'n/a'}</td>
              </tr>
            ))}</tbody>
          </table>
        </div>
      )}
    </>
  );
}

function CalendarView({ t, tasksAll }) {
  const [range, setRange] = useState({ from: '2026-08-01', to: '2026-08-31' });
  const [taskFilter, setTaskFilter] = useState('All');
  const taskTypes = useMemo(() => Array.from(new Set(tasksAll.map((r) => r.task_type).filter(Boolean))).sort(), [tasksAll]);

  const inRange = (r) => r.created_at && r.created_at.slice(0, 10) >= range.from && r.created_at.slice(0, 10) <= range.to;
  const filtered = tasksAll.filter((r) => inRange(r) && (taskFilter === 'All' || r.task_type === taskFilter));

  const byDay = {};
  filtered.forEach((r) => { const d = r.created_at.slice(0, 10); (byDay[d] = byDay[d] || []).push(r); });
  const days = Object.keys(byDay).sort();
  const max = Math.max(...days.map((d) => byDay[d].length), 1);
  const [selectedDay, setSelectedDay] = useState(null);

  const taskCounts = {};
  taskTypes.forEach((tt) => { taskCounts[tt] = tasksAll.filter((r) => inRange(r) && r.task_type === tt).length; });

  return (
    <div>
      <div className="flex flex-wrap items-center gap-2 mb-3">
        <span className={`text-xs ${t.muted} uppercase tracking-wide mr-1`}>Date range</span>
        <input type="date" value={range.from} onChange={(e) => setRange((r) => ({ ...r, from: e.target.value }))} className={`${t.input} border rounded-lg text-sm px-2 py-1`} />
        <span className={t.muted}>→</span>
        <input type="date" value={range.to} onChange={(e) => setRange((r) => ({ ...r, to: e.target.value }))} className={`${t.input} border rounded-lg text-sm px-2 py-1`} />
      </div>
      <div className="flex flex-wrap items-center gap-2 mb-3">
        <span className={`text-xs ${t.muted} uppercase tracking-wide mr-1`}>Filter by task type (real values)</span>
        <select value={taskFilter} onChange={(e) => setTaskFilter(e.target.value)} className={`${t.input} border rounded-lg text-sm px-2 py-1`}>
          <option>All</option>{taskTypes.map((tt) => <option key={tt}>{tt}</option>)}
        </select>
        {taskTypes.map((tt) => (<span key={tt} className={`text-xs rounded-full px-2 py-0.5 border ${t.chip}`}>{tt} <span className={`font-mono ${t.mutedStrong}`}>{taskCounts[tt]}</span></span>))}
      </div>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="md:col-span-2 grid grid-cols-7 gap-1.5 content-start">
          {days.map((d) => {
            const count = byDay[d].length;
            const intensity = count / max;
            const bg = intensity > 0.6 ? 'bg-violet-600' : intensity > 0.25 ? 'bg-violet-400' : 'bg-violet-200';
            return (
              <button key={d} onClick={() => setSelectedDay(d)} className={`aspect-square rounded-lg border ${selectedDay === d ? 'border-violet-500' : t.border} ${bg} flex flex-col items-center justify-center hover:border-violet-500`}>
                <span className={`text-xs ${t.mutedStrong}`}>{d.slice(8, 10)}</span><span className={`font-mono text-sm ${t.strong}`}>{count}</span>
              </button>
            );
          })}
        </div>
        <div className={`${t.panel} border ${t.panelBorder} rounded-xl p-3`}>
          <p className={`text-xs uppercase tracking-wide ${t.muted} mb-2`}>{selectedDay ? `${selectedDay} — ${taskFilter}` : 'Select a day'}</p>
          {selectedDay && byDay[selectedDay] ? (
            <div className="flex flex-col gap-2 max-h-72 overflow-y-auto">
              {byDay[selectedDay].slice(0, 60).map((r, i) => (
                <div key={i} className={`text-xs border-b ${t.border} pb-2 last:border-0`}>
                  <div className={`flex justify-between ${t.strong}`}><span className="font-mono">#{r.student_id}</span><span className={`font-mono ${t.muted}`}>{r.created_at.slice(11, 16)}</span></div>
                  <div className={`flex justify-between ${t.muted} mt-0.5`}><span>{normMgrName(r.manager)} · {r.task_type}</span><span>{r.is_completed ? 'done' : 'open'}</span></div>
                </div>
              ))}
            </div>
          ) : <p className={`text-xs ${t.muted}`}>Click a day to see tasks.</p>}
        </div>
      </div>
    </div>
  );
}

export default function PXOpsConsole() {
  const [theme, setTheme] = useState('dark');
  const [view, setView] = useState('ism');
  const [regionIdx, setRegionIdx] = useState(0);
  const [subsRegionIdx, setSubsRegionIdx] = useState(0);
  const [ismTab, setIsmTab] = useState('managers');
  const [globalRange, setGlobalRange] = useState({ from: '2026-08-01', to: '2026-08-31' });
  const [raw, setRaw] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);
  const t = THEMES[theme];

  useEffect(() => {
    let alive = true;
    setLoading(true);
    Promise.all([fetchJson('ism_base'), fetchJson('ism_tasks'), fetchJson('ism_touches'), fetchJsonOptional('ism_revenue')])
      .then(([base, tasks, touches, revenue]) => { if (alive) { setRaw({ base, tasks, touches, revenue }); setLoading(false); } })
      .catch((e) => { if (alive) { setError(e.message); setLoading(false); } });
    return () => { alive = false; };
  }, []);

  const isAll = regionIdx === REGIONS.length;
  const computed = useMemo(() => {
    if (!raw) return null;
    return REGIONS.map((r) => computeRegion(raw, r, globalRange.from, globalRange.to));
  }, [raw, globalRange]);

  if (loading) {
    return (
      <div className={`min-h-screen ${THEMES.dark.page} ${THEMES.dark.text} flex items-center justify-center`}>
        <div className="flex items-center gap-2 text-sm text-slate-400"><RefreshCw size={16} className="animate-spin" />Loading live data from GitHub…</div>
      </div>
    );
  }
  if (error) {
    return (
      <div className={`min-h-screen ${THEMES.dark.page} ${THEMES.dark.text} flex items-center justify-center px-6`}>
        <div className="text-center max-w-md">
          <AlertTriangle size={24} className="text-amber-400 mx-auto mb-3" />
          <p className="text-sm text-slate-300 mb-1">Couldn't load live data.</p>
          <p className="text-xs text-slate-500">{error}</p>
          <p className="text-xs text-slate-600 mt-3">Check that the JSON files exist at {DATA_BASE} and that the GitHub Actions workflow has run at least once.</p>
        </div>
      </div>
    );
  }

  const data = isAll ? null : computed[regionIdx];
  const agg = isAll ? computed.reduce((acc, d) => ({
    totalLeads: acc.totalLeads + d.totalLeads,
    touchedCount: acc.touchedCount + d.touchedCount,
    revenueAug: d.revenueAug !== null ? (acc.revenueAug || 0) + d.revenueAug : acc.revenueAug,
    pipelineRevenue: acc.pipelineRevenue + d.pipelineRevenue,
    upsells: acc.upsells + d.blocks.upsells, pim: acc.pim + d.blocks.pim, prevMonth: acc.prevMonth + d.blocks.prevMonth,
  }), { totalLeads: 0, touchedCount: 0, revenueAug: null, pipelineRevenue: 0, upsells: 0, pim: 0, prevMonth: 0 }) : null;

  return (
    <div className={`min-h-screen ${t.page} ${t.text}`}>
      <div className={`border-b ${t.headerBorder} px-6 py-4 relative`}>
        <div className="absolute top-0 left-0 h-1 w-full bg-gradient-to-r from-violet-600 via-teal-500 to-transparent" />
        <div className="flex items-center justify-between flex-wrap gap-4">
          <div className="flex items-center gap-2">
            <Radio size={18} className="text-teal-500" />
            <h1 className={`text-base font-medium ${t.strong}`}>PX Ops Console</h1>
            <span className={`text-xs font-mono ${t.muted}`}>ISM · live from Metabase</span>
          </div>
          <div className="flex items-center gap-3">
            <div className={`flex ${t.panel} border ${t.panelBorder} rounded-full p-1 gap-1`}>
              {[{ key: 'ism', label: 'ISM', icon: Users }, { key: 'subs', label: 'Subscriptions', icon: DollarSign }, { key: 'total', label: 'Total', icon: Layers }].map((v) => (
                <button key={v.key} onClick={() => setView(v.key)} className={`flex items-center gap-1 text-sm px-3 py-1.5 rounded-full ${view === v.key ? t.headerChip + ' border' : t.muted + ' hover:opacity-80'}`}>
                  <v.icon size={13} /> {v.label}
                </button>
              ))}
            </div>
            <button onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')} className={`${t.panel} border ${t.panelBorder} rounded-full p-2`} title="Toggle light/dark mode">
              {theme === 'dark' ? <Sun size={15} className="text-amber-400" /> : <Moon size={15} className="text-slate-600" />}
            </button>
          </div>
        </div>
        {view === 'ism' && (
          <>
            <div className={`flex flex-wrap items-center gap-2 mt-4 pt-3 border-t ${t.headerBorder}`}>
              <CalIcon size={13} className={t.muted} />
              <span className={`text-xs ${t.muted} uppercase tracking-wide mr-1`}>Showing data for</span>
              <input type="date" value={globalRange.from} onChange={(e) => setGlobalRange((r) => ({ ...r, from: e.target.value }))} className={`${t.input} border rounded-lg text-sm px-2 py-1`} />
              <span className={t.muted}>→</span>
              <input type="date" value={globalRange.to} onChange={(e) => setGlobalRange((r) => ({ ...r, to: e.target.value }))} className={`${t.input} border rounded-lg text-sm px-2 py-1`} />
              {!raw.revenue && <span className={`text-xs ${t.muted}`}>(revenue data not loaded)</span>}
            </div>
            <div className="flex gap-1.5 mt-4 overflow-x-auto pb-1">
              {REGIONS.map((r, i) => (
                <button key={r} onClick={() => setRegionIdx(i)} className={`text-sm px-3 py-1.5 rounded-lg whitespace-nowrap border flex items-center gap-1.5 ${i === regionIdx ? t.pillActive : t.pillInactive}`}>
                  <span className={`w-1.5 h-1.5 rounded-full ${i === regionIdx ? 'bg-teal-400 animate-pulse' : t.dot}`} />{r}
                </button>
              ))}
              <span className={`w-px ${t.track} mx-1`} />
              <button onClick={() => setRegionIdx(REGIONS.length)} className={`text-sm px-3 py-1.5 rounded-lg whitespace-nowrap border flex items-center gap-1.5 font-medium ${isAll ? t.totalActive : t.totalInactive}`}>
                <Layers size={12} /> ALL REGIONS
              </button>
            </div>
          </>
        )}
      </div>

      {view === 'subs' && (
        <div className="px-6 py-5 max-w-6xl mx-auto">
          <div className="flex gap-1.5 mb-5 overflow-x-auto pb-1">
            {REGIONS_SUBS.map((r, i) => (
              <button key={r} onClick={() => setSubsRegionIdx(i)} className={`text-sm px-3 py-1.5 rounded-lg whitespace-nowrap border flex items-center gap-1.5 ${i === subsRegionIdx ? t.pillActive : t.pillInactive}`}>
                <span className={`w-1.5 h-1.5 rounded-full ${i === subsRegionIdx ? 'bg-teal-400 animate-pulse' : t.dot}`} />{r}
              </button>
            ))}
          </div>
          <SubscriptionsPanel t={t} region={REGIONS_SUBS[subsRegionIdx]} />
        </div>
      )}

      {view === 'total' && (
        <div className="px-6 py-16 max-w-6xl mx-auto text-center">
          <Layers size={28} className={`${t.muted} mx-auto mb-3`} />
          <p className={`text-sm ${t.mutedStrong}`}>Total (ISM + Subscriptions combined) is next up — coming right after Subscriptions is fully refreshed with live data.</p>
        </div>
      )}

      {view === 'ism' && (
      <div className="px-6 py-5 max-w-6xl mx-auto">
        {!isAll && (
          <>
            <div className="flex gap-3 flex-wrap mb-4">
              <Metric t={t} label="ISM base" value={data.totalLeads.toLocaleString()} sub={`Upsells ${data.blocks.upsells} · PIM ${data.blocks.pim} · Prev month ${data.blocks.prevMonth} — real`} />
              <Metric t={t} label="Utilization" value={`${data.touchedPct}%`} sub={`${data.touchedCount} touched, ${globalRange.from} → ${globalRange.to}`} accent="text-teal-500" />
              <Metric t={t} label="Not yet touched" value={data.stageCounts['Not yet touched']} accent="text-amber-500" />
              <Metric t={t} label="Revenue (ISM)" value={data.revenueAug !== null ? `$${Math.round(data.revenueAug).toLocaleString()}` : 'n/a'} sub="real payments, this range" icon={DollarSign} accent={data.revenueAug !== null ? 'text-teal-500' : t.muted} />
              <Metric t={t} label="Pipeline (Negot.+Waiting+Pay.ctrl)" value={`$${data.pipelineRevenue.toLocaleString()}`} sub={`${data.pipelineLeads} leads`} icon={TrendingUp} accent="text-violet-500" />
            </div>

            <div className={`${t.panel} border ${t.panelBorder} rounded-xl p-4 mb-4`}>
              <p className={`text-xs uppercase tracking-wide ${t.muted} mb-3 flex items-center`}>Status breakdown — {REGIONS[regionIdx]}, as of {globalRange.to}</p>
              <StageBar t={t} breakdown={data.stageCounts} total={data.totalLeads} />
            </div>

            <div className="mb-4"><StreamTouchPanel t={t} region={REGIONS[regionIdx]} computed={data} /></div>

            <div className="flex gap-1 mb-3 items-center flex-wrap">
              {[{ k: 'managers', l: 'Managers', icon: Users }, { k: 'calendar', l: 'Call calendar', icon: CalIcon }].map((tb) => (
                <button key={tb.k} onClick={() => setIsmTab(tb.k)} className={`flex items-center gap-1.5 text-sm px-3 py-1.5 rounded-lg border ${ismTab === tb.k ? t.pillActive : 'border-transparent ' + t.muted}`}>
                  <tb.icon size={13} /> {tb.l}
                </button>
              ))}
              <span className={`text-xs ${t.muted}`}>{data.managers.length} managers</span>
            </div>

            {ismTab === 'managers' ? (
              <div className={`${t.panel} border ${t.panelBorder} rounded-xl overflow-x-auto`}>
                <table className="w-full text-sm min-w-[1000px]">
                  <thead>
                    <tr className={`text-left text-xs uppercase tracking-wide ${t.muted} border-b ${t.border}`}>
                      <th className="py-2 px-3">Manager</th><th className="py-2 px-3">Assigned</th><th className="py-2 px-3">Touched</th>
                      <th className="py-2 px-3">Pending</th><th className="py-2 px-3">Revenue</th><th className="py-2 px-3">Calls</th>
                      <th className="py-2 px-3">Messages</th><th className="py-2 px-3">Talk time</th><th className="py-2 px-3">Overdue</th><th className="py-2 px-3">Pipeline $</th>
                    </tr>
                  </thead>
                  <tbody>{data.managers.map((m) => <ManagerRow key={m.name} t={t} m={m} />)}</tbody>
                </table>
              </div>
            ) : <CalendarView t={t} tasksAll={data.tasksAll} />}
          </>
        )}

        {isAll && (
          <>
            <div className="flex gap-3 flex-wrap mb-4">
              <Metric t={t} label="Total leads — all regions" value={agg.totalLeads.toLocaleString()} sub={`Upsells ${agg.upsells} · PIM ${agg.pim} · Prev month ${agg.prevMonth}`} />
              <Metric t={t} label="Touched — all regions" value={agg.touchedCount.toLocaleString()} accent="text-teal-500" />
              <Metric t={t} label="Revenue — all regions" value={agg.revenueAug !== null ? `$${Math.round(agg.revenueAug).toLocaleString()}` : 'n/a'} accent="text-teal-500" />
              <Metric t={t} label="Pipeline — all regions" value={`$${agg.pipelineRevenue.toLocaleString()}`} accent="text-violet-500" />
            </div>
            <div className={`${t.panel} border ${t.panelBorder} rounded-xl overflow-x-auto`}>
              <table className="w-full text-sm">
                <thead><tr className={`text-left text-xs uppercase tracking-wide ${t.muted} border-b ${t.border}`}>
                  <th className="py-2 px-3">Region</th><th className="py-2 px-3">Leads</th><th className="py-2 px-3">Touched</th><th className="py-2 px-3">Revenue</th><th className="py-2 px-3">Managers</th>
                </tr></thead>
                <tbody>{computed.map((d, i) => (
                  <tr key={d.region} className={`border-b ${t.border} ${t.rowHover} cursor-pointer`} onClick={() => setRegionIdx(i)}>
                    <td className={`py-2 px-3 ${t.strong}`}>{d.region}</td>
                    <td className={`py-2 px-3 font-mono ${t.mutedStrong}`}>{d.totalLeads.toLocaleString()}</td>
                    <td className="py-2 px-3 font-mono text-teal-500">{d.touchedCount} ({d.touchedPct}%)</td>
                    <td className="py-2 px-3 font-mono text-teal-500">{d.revenueAug !== null ? `$${Math.round(d.revenueAug).toLocaleString()}` : '—'}</td>
                    <td className={`py-2 px-3 font-mono ${t.muted}`}>{d.managers.length}</td>
                  </tr>
                ))}</tbody>
              </table>
            </div>
          </>
        )}
      </div>
      )}
    </div>
  );
}
