import React, { useState, useMemo } from 'react';
import { ChevronDown, ChevronRight, Phone, MessageCircle, AlertTriangle, Users, Calendar as CalIcon, Layers, DollarSign, Radio, TrendingUp, Clock, Info, Sun, Moon } from 'lucide-react';

const REAL_DATA = {"real_blocks": {"LatAm PMC": {"upsells": 4644, "pim": 1113, "prevMonth": 1046}, "Brazil": {"upsells": 2005, "pim": 510, "prevMonth": 362}, "Turkey": {"upsells": 2432, "pim": 726, "prevMonth": 699}, "Indonesia": {"upsells": 789, "pim": 277, "prevMonth": 181}, "UK": {"upsells": 467, "pim": 168, "prevMonth": 175}, "CIS": {"upsells": 1520, "pim": 414, "prevMonth": 327}, "USA": {"upsells": 41, "pim": 12, "prevMonth": 6}, "Poland": {"upsells": 567, "pim": 214, "prevMonth": 217}, "Italy": {"upsells": 601, "pim": 222, "prevMonth": 190}, "Spain": {"upsells": 124, "pim": 41, "prevMonth": 35}}, "subs_summary": {"LatAm PMC": {"0": {"total": 1, "paid": 1, "overdue": 0, "scheduled": 0, "revenue_collected": 182.56, "cr": null, "aov": null, "projected_pending_revenue": null}, "1": {"total": 842, "paid": 37, "overdue": 57, "scheduled": 748, "revenue_collected": 6502.29, "cr": null, "aov": null, "projected_pending_revenue": null}, "10": {"total": 8, "paid": 0, "overdue": 0, "scheduled": 8, "revenue_collected": 0.0, "cr": null, "aov": null, "projected_pending_revenue": null}, "11": {"total": 8, "paid": 0, "overdue": 0, "scheduled": 8, "revenue_collected": 0.0, "cr": null, "aov": null, "projected_pending_revenue": null}, "12": {"total": 6, "paid": 0, "overdue": 1, "scheduled": 5, "revenue_collected": 0.0, "cr": null, "aov": null, "projected_pending_revenue": null}, "13": {"total": 1, "paid": 0, "overdue": 0, "scheduled": 1, "revenue_collected": 0.0, "cr": null, "aov": null, "projected_pending_revenue": null}, "15": {"total": 1, "paid": 0, "overdue": 0, "scheduled": 1, "revenue_collected": 0.0, "cr": null, "aov": null, "projected_pending_revenue": null}, "2": {"total": 788, "paid": 24, "overdue": 47, "scheduled": 717, "revenue_collected": 3059.49, "cr": null, "aov": null, "projected_pending_revenue": null}, "3": {"total": 555, "paid": 24, "overdue": 35, "scheduled": 496, "revenue_collected": 3038.89, "cr": null, "aov": null, "projected_pending_revenue": null}, "4": {"total": 275, "paid": 11, "overdue": 24, "scheduled": 240, "revenue_collected": 1878.54, "cr": null, "aov": null, "projected_pending_revenue": null}, "5": {"total": 273, "paid": 12, "overdue": 21, "scheduled": 240, "revenue_collected": 986.82, "cr": null, "aov": null, "projected_pending_revenue": null}, "6": {"total": 281, "paid": 11, "overdue": 22, "scheduled": 248, "revenue_collected": 963.63, "cr": null, "aov": null, "projected_pending_revenue": null}, "7": {"total": 238, "paid": 5, "overdue": 23, "scheduled": 210, "revenue_collected": 524.48, "cr": null, "aov": null, "projected_pending_revenue": null}, "8": {"total": 120, "paid": 4, "overdue": 13, "scheduled": 103, "revenue_collected": 185.26, "cr": null, "aov": null, "projected_pending_revenue": null}, "9": {"total": 145, "paid": 4, "overdue": 20, "scheduled": 121, "revenue_collected": 349.22, "cr": null, "aov": null, "projected_pending_revenue": null}}, "Brazil": {"1": {"total": 42, "paid": 0, "overdue": 4, "scheduled": 38, "revenue_collected": null, "cr": 0.326, "aov": 98, "projected_pending_revenue": 1342}, "2": {"total": 22, "paid": 0, "overdue": 2, "scheduled": 20, "revenue_collected": null, "cr": 0.279, "aov": 80, "projected_pending_revenue": 491}, "3": {"total": 50, "paid": 0, "overdue": 4, "scheduled": 46, "revenue_collected": null, "cr": 0.256, "aov": 106, "projected_pending_revenue": 1357}, "4": {"total": 32, "paid": 0, "overdue": 6, "scheduled": 26, "revenue_collected": null, "cr": 0.118, "aov": 128, "projected_pending_revenue": 483}, "5": {"total": 51, "paid": 0, "overdue": 3, "scheduled": 48, "revenue_collected": null, "cr": 0.143, "aov": 47, "projected_pending_revenue": 343}, "6": {"total": 15, "paid": 0, "overdue": 0, "scheduled": 15, "revenue_collected": null, "cr": 0, "aov": 0, "projected_pending_revenue": 0}, "7": {"total": 5, "paid": 0, "overdue": 0, "scheduled": 5, "revenue_collected": null, "cr": 0.15, "aov": 152, "projected_pending_revenue": 114}, "9": {"total": 3, "paid": 0, "overdue": 0, "scheduled": 3, "revenue_collected": null, "cr": 0, "aov": 0, "projected_pending_revenue": 0}}, "Turkey": {"1": {"total": 72, "paid": 0, "overdue": 9, "scheduled": 63, "revenue_collected": null, "cr": 0.533, "aov": 223, "projected_pending_revenue": 8558}, "2": {"total": 45, "paid": 0, "overdue": 3, "scheduled": 42, "revenue_collected": null, "cr": 0.524, "aov": 114, "projected_pending_revenue": 2688}, "3": {"total": 55, "paid": 0, "overdue": 10, "scheduled": 45, "revenue_collected": null, "cr": 0.211, "aov": 97, "projected_pending_revenue": 1126}, "4": {"total": 21, "paid": 0, "overdue": 1, "scheduled": 20, "revenue_collected": null, "cr": 0.306, "aov": 97, "projected_pending_revenue": 623}, "5": {"total": 33, "paid": 0, "overdue": 2, "scheduled": 31, "revenue_collected": null, "cr": 0.171, "aov": 104, "projected_pending_revenue": 587}, "6": {"total": 23, "paid": 0, "overdue": 1, "scheduled": 22, "revenue_collected": null, "cr": 0.034, "aov": 55, "projected_pending_revenue": 43}, "7": {"total": 15, "paid": 0, "overdue": 2, "scheduled": 13, "revenue_collected": null, "cr": 0.15, "aov": 152, "projected_pending_revenue": 342}}, "Indonesia": {"1": {"total": 56, "paid": 0, "overdue": 4, "scheduled": 52, "revenue_collected": null, "cr": 0.563, "aov": 82, "projected_pending_revenue": 2585}, "2": {"total": 58, "paid": 0, "overdue": 4, "scheduled": 54, "revenue_collected": null, "cr": 0.643, "aov": 84, "projected_pending_revenue": 3133}, "3": {"total": 1, "paid": 0, "overdue": 0, "scheduled": 1, "revenue_collected": null, "cr": null, "aov": null, "projected_pending_revenue": null}}, "UK": {"1": {"total": 83, "paid": 0, "overdue": 7, "scheduled": 76, "revenue_collected": null, "cr": 0.614, "aov": 263, "projected_pending_revenue": 13403}, "2": {"total": 56, "paid": 0, "overdue": 2, "scheduled": 54, "revenue_collected": null, "cr": 0.656, "aov": 299, "projected_pending_revenue": 10984}, "3": {"total": 46, "paid": 0, "overdue": 1, "scheduled": 45, "revenue_collected": null, "cr": 0.559, "aov": 223, "projected_pending_revenue": 5734}, "4": {"total": 8, "paid": 0, "overdue": 0, "scheduled": 8, "revenue_collected": null, "cr": 0.5, "aov": 238, "projected_pending_revenue": 952}, "5": {"total": 11, "paid": 0, "overdue": 1, "scheduled": 10, "revenue_collected": null, "cr": 0.05, "aov": 124, "projected_pending_revenue": 68}, "6": {"total": 3, "paid": 0, "overdue": 1, "scheduled": 2, "revenue_collected": null, "cr": 0.429, "aov": 114, "projected_pending_revenue": 147}, "7": {"total": 20, "paid": 0, "overdue": 2, "scheduled": 18, "revenue_collected": null, "cr": 0.214, "aov": 175, "projected_pending_revenue": 749}, "8": {"total": 8, "paid": 0, "overdue": 2, "scheduled": 6, "revenue_collected": null, "cr": 0.294, "aov": 125, "projected_pending_revenue": 294}, "9": {"total": 17, "paid": 0, "overdue": 2, "scheduled": 15, "revenue_collected": null, "cr": 0, "aov": 0, "projected_pending_revenue": 0}}, "CIS": {"1": {"total": 143, "paid": 0, "overdue": 19, "scheduled": 124, "revenue_collected": null, "cr": 0.42, "aov": 135, "projected_pending_revenue": 8108}, "12": {"total": 1, "paid": 0, "overdue": 0, "scheduled": 1, "revenue_collected": null, "cr": 0, "aov": 0, "projected_pending_revenue": 0}, "2": {"total": 91, "paid": 0, "overdue": 9, "scheduled": 82, "revenue_collected": null, "cr": 0.469, "aov": 147, "projected_pending_revenue": 6274}, "3": {"total": 91, "paid": 0, "overdue": 15, "scheduled": 76, "revenue_collected": null, "cr": 0.378, "aov": 152, "projected_pending_revenue": 5228}, "4": {"total": 103, "paid": 0, "overdue": 11, "scheduled": 92, "revenue_collected": null, "cr": 0.283, "aov": 150, "projected_pending_revenue": 4372}, "5": {"total": 10, "paid": 0, "overdue": 1, "scheduled": 9, "revenue_collected": null, "cr": 0.292, "aov": 147, "projected_pending_revenue": 429}, "6": {"total": 5, "paid": 0, "overdue": 1, "scheduled": 4, "revenue_collected": null, "cr": 0.227, "aov": 161, "projected_pending_revenue": 183}, "7": {"total": 16, "paid": 0, "overdue": 2, "scheduled": 14, "revenue_collected": null, "cr": 0.5, "aov": 140, "projected_pending_revenue": 1120}, "9": {"total": 1, "paid": 0, "overdue": 0, "scheduled": 1, "revenue_collected": null, "cr": 0, "aov": 0, "projected_pending_revenue": 0}}, "USA": {"1": {"total": 82, "paid": 0, "overdue": 4, "scheduled": 78, "revenue_collected": null, "cr": 0.667, "aov": 158, "projected_pending_revenue": 8642}, "2": {"total": 62, "paid": 0, "overdue": 4, "scheduled": 58, "revenue_collected": null, "cr": 0.75, "aov": 138, "projected_pending_revenue": 6417}, "3": {"total": 21, "paid": 0, "overdue": 0, "scheduled": 21, "revenue_collected": null, "cr": 0, "aov": 0, "projected_pending_revenue": 0}, "4": {"total": 7, "paid": 0, "overdue": 0, "scheduled": 7, "revenue_collected": null, "cr": 0, "aov": 0, "projected_pending_revenue": 0}}, "Poland": {"1": {"total": 63, "paid": 2, "overdue": 2, "scheduled": 59, "revenue_collected": null, "cr": null, "aov": null, "projected_pending_revenue": null}, "2": {"total": 26, "paid": 0, "overdue": 1, "scheduled": 25, "revenue_collected": null, "cr": null, "aov": null, "projected_pending_revenue": null}, "3": {"total": 4, "paid": 0, "overdue": 0, "scheduled": 4, "revenue_collected": null, "cr": null, "aov": null, "projected_pending_revenue": null}}, "Italy": {"1": {"total": 48, "paid": 0, "overdue": 1, "scheduled": 47, "revenue_collected": null, "cr": null, "aov": null, "projected_pending_revenue": null}, "2": {"total": 8, "paid": 0, "overdue": 1, "scheduled": 7, "revenue_collected": null, "cr": null, "aov": null, "projected_pending_revenue": null}, "3": {"total": 6, "paid": 0, "overdue": 0, "scheduled": 6, "revenue_collected": null, "cr": null, "aov": null, "projected_pending_revenue": null}}, "Spain": {"1": {"total": 112, "paid": 6, "overdue": 4, "scheduled": 102, "revenue_collected": 544.56, "cr": 0.521, "aov": 108, "projected_pending_revenue": 5960}, "2": {"total": 96, "paid": 4, "overdue": 4, "scheduled": 88, "revenue_collected": 331.19, "cr": 0.538, "aov": 107, "projected_pending_revenue": 5297}, "3": {"total": 46, "paid": 3, "overdue": 1, "scheduled": 42, "revenue_collected": 338.07, "cr": 0.559, "aov": 90, "projected_pending_revenue": 2164}, "4": {"total": 52, "paid": 4, "overdue": 5, "scheduled": 43, "revenue_collected": 306.96, "cr": 0.471, "aov": 89, "projected_pending_revenue": 2013}, "5": {"total": 36, "paid": 1, "overdue": 2, "scheduled": 33, "revenue_collected": 92.35, "cr": 0.392, "aov": 96, "projected_pending_revenue": 1317}, "6": {"total": 36, "paid": 2, "overdue": 3, "scheduled": 31, "revenue_collected": 160.36, "cr": 0.324, "aov": 114, "projected_pending_revenue": 1256}, "7": {"total": 47, "paid": 1, "overdue": 9, "scheduled": 37, "revenue_collected": 80.8, "cr": 0.378, "aov": 113, "projected_pending_revenue": 1965}, "8": {"total": 30, "paid": 0, "overdue": 4, "scheduled": 26, "revenue_collected": 0.0, "cr": 0.18, "aov": 100, "projected_pending_revenue": 540}, "9": {"total": 31, "paid": 2, "overdue": 5, "scheduled": 24, "revenue_collected": 228.56, "cr": 0.293, "aov": 105, "projected_pending_revenue": 892}, "10": {"total": 7, "paid": 0, "overdue": 0, "scheduled": 7, "revenue_collected": 0.0, "cr": 0, "aov": 0, "projected_pending_revenue": 0}, "11": {"total": 6, "paid": 0, "overdue": 0, "scheduled": 6, "revenue_collected": 0.0, "cr": 0, "aov": 0, "projected_pending_revenue": 0}, "12": {"total": 4, "paid": 0, "overdue": 1, "scheduled": 3, "revenue_collected": 0.0, "cr": 0, "aov": 0, "projected_pending_revenue": 0}, "15": {"total": 1, "paid": 0, "overdue": 0, "scheduled": 1, "revenue_collected": 0.0, "cr": 0, "aov": 0, "projected_pending_revenue": 0}}}};

const REGIONS = ['LatAm PMC', 'Spain', 'Brazil', 'Italy', 'Poland', 'Turkey', 'Indonesia', 'UK', 'USA', 'CIS', 'GCC'];

const STAGES = [
  'Not yet touched', 'ISM start working', 'Negotiations ISM', 'Waiting for decision', 'Payment control ISM',
  'Not getting through ISM', 'Wallet is waiting to receive funds', 'Reserve base (prolongation)',
  'N/A 5+ ISM', 'Other (unconfirmed)',
];
const PIPELINE_STAGES = ['Negotiations ISM', 'Waiting for decision'];
const STAGE_COLOR = {
  'Not yet touched': 'bg-amber-500', 'ISM start working': 'bg-teal-400', 'Negotiations ISM': 'bg-violet-400', 'Waiting for decision': 'bg-amber-300',
  'Payment control ISM': 'bg-sky-400', 'Not getting through ISM': 'bg-rose-400',
  'Wallet is waiting to receive funds': 'bg-emerald-400', 'Reserve base (prolongation)': 'bg-fuchsia-400',
  'N/A 5+ ISM': 'bg-slate-600', 'Other (unconfirmed)': 'bg-slate-800',
};
const MANAGER_NAMES = ['A. Ramirez', 'S. Kowalski', 'D. Oyelaran', 'M. Fitri', 'L. Petrova', 'J. Okafor', 'R. Silva', 'T. Yildiz', 'N. Haddad', 'C. Reyes'];
const TASK_TYPES = ['First contact', 'Follow up', 'Waiting for decision', 'Call back', 'N/A'];
const REGIONS_WITH_REAL_SUBS_CR = ['Brazil', 'Turkey', 'Indonesia', 'CIS', 'USA', 'UK', 'Spain'];

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

function mulberry32(seed) {
  return function () {
    seed |= 0; seed = (seed + 0x6D2B79F5) | 0;
    let t = Math.imul(seed ^ (seed >>> 15), 1 | seed);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

function dateIndexFromJul1(dateStr) {
  const d0 = Date.UTC(2026, 6, 1);
  const d1 = Date.UTC(...dateStr.split('-').map((v, i) => (i === 1 ? Number(v) - 1 : Number(v))));
  return Math.round((d1 - d0) / 86400000);
}

function buildDailyWeights(rnd, n) {
  const raw = Array.from({ length: n }, (_, i) => {
    const dow = new Date(Date.UTC(2026, 6, 1 + i)).getUTCDay();
    return (dow === 0 || dow === 6 ? 0.4 : 1) * (0.5 + rnd());
  });
  const sum = raw.reduce((a, b) => a + b, 0);
  return raw.map((v) => v / sum);
}

function buildRegionData(region, idx) {
  const rnd = mulberry32(idx * 7919 + 13);
  const real = REAL_DATA.real_blocks[region] || null;
  const upsells = real ? real.upsells : Math.round(300 + rnd() * 1400);
  const pim = real ? real.pim : Math.round(150 + rnd() * 700);
  const prevMonth = real ? real.prevMonth : Math.round(80 + rnd() * 400);
  const total = upsells + pim + prevMonth;
  const touchedPctFinal = Math.round(35 + rnd() * 50);
  const naFinal = Math.round(total * (0.04 + rnd() * 0.08));

  const touchedCountFinal = Math.round(total * touchedPctFinal / 100);
  const untouchedCountFinal = total - touchedCountFinal;
  const stageSharesFinal = {};
  let remaining = touchedCountFinal - naFinal;
  STAGES.filter((s) => s !== 'N/A 5+ ISM' && s !== 'Not yet touched').forEach((s, i, arr) => {
    const share = i === arr.length - 1 ? remaining : Math.round(remaining * (0.08 + rnd() * 0.22));
    stageSharesFinal[s] = Math.max(0, Math.min(remaining, share));
    remaining -= stageSharesFinal[s];
  });
  stageSharesFinal['N/A 5+ ISM'] = Math.max(0, naFinal);
  stageSharesFinal['Not yet touched'] = untouchedCountFinal;

  const blendedAov = Math.round(90 + rnd() * 200);
  const revenueAchievedFinal = Math.round(touchedCountFinal * blendedAov * 0.25);

  const weights = buildDailyWeights(rnd, 62);

  const nManagers = 3 + Math.floor(rnd() * 4);
  const managers = Array.from({ length: nManagers }, (_, i) => {
    const assigned = Math.round(total / nManagers * (0.7 + rnd() * 0.6));
    const touchedFinal = Math.round(assigned * (0.3 + rnd() * 0.6));
    const callsFinal = Math.round(touchedFinal * (0.6 + rnd() * 0.9));
    const messagesFinal = Math.round(touchedFinal * (0.4 + rnd() * 1.1));
    const talkMinutesFinal = Math.round(callsFinal * (2 + rnd() * 6));
    const overdue = Math.round(assigned * rnd() * 0.15);
    const mgrStagesFinal = {};
    let rem = touchedFinal;
    STAGES.forEach((s, i2, arr) => {
      const share = i2 === arr.length - 1 ? rem : Math.round(rem * rnd() * 0.3);
      mgrStagesFinal[s] = Math.max(0, Math.min(rem, share));
      rem -= mgrStagesFinal[s];
    });
    const dominant = Object.entries(mgrStagesFinal).sort((a, b) => b[1] - a[1])[0]?.[0] || 'N/A 5+ ISM';
    return {
      name: MANAGER_NAMES[(idx + i) % MANAGER_NAMES.length], assigned, touchedFinal, overdue, dominant, mgrStagesFinal,
      callsFinal, messagesFinal, talkMinutesFinal,
      block: { upsells: Math.round(assigned * (upsells / total)), pim: Math.round(assigned * (pim / total)), prevMonth: Math.round(assigned * (prevMonth / total)) },
    };
  });

  const calendar = [];
  const startDate = new Date('2026-07-01T00:00:00Z');
  for (let d = 0; d < 62; d++) {
    const dt = new Date(startDate);
    dt.setUTCDate(startDate.getUTCDate() + d);
    const dateStr = dt.toISOString().slice(0, 10);
    const dow = dt.getUTCDay();
    const count = Math.round(rnd() * 40 * (dow === 0 || dow === 6 ? 0.3 : 1));
    const leads = count > 0 ? Array.from({ length: Math.min(count, 8) }, () => ({
      student: `#${38000000 + Math.floor(rnd() * 3000000)}`,
      manager: managers[Math.floor(rnd() * managers.length)]?.name || '—',
      stage: STAGES[1 + Math.floor(rnd() * (STAGES.length - 2))],
      taskType: TASK_TYPES[Math.floor(rnd() * TASK_TYPES.length)],
      time: `${9 + Math.floor(rnd() * 8)}:${rnd() > 0.5 ? '30' : '00'}`,
    })) : [];
    calendar.push({ date: dateStr, count, leads });
  }

  const rawTiers = REAL_DATA.subs_summary[region] || {};
  const tierKeys = Object.keys(rawTiers).sort((a, b) => Number(a) - Number(b));
  const tiers = tierKeys.map((k) => ({ tier: k, ...rawTiers[k] }));
  const hasCrBenchmark = REGIONS_WITH_REAL_SUBS_CR.includes(region);
  const hasRevenueData = tiers.some((t) => t.revenue_collected !== null && t.revenue_collected !== undefined);
  const totalScheduled = tiers.reduce((s, t) => s + t.total, 0);
  const totalPaid = tiers.reduce((s, t) => s + t.paid, 0);
  const totalOverdue = tiers.reduce((s, t) => s + t.overdue, 0);
  const totalPending = totalScheduled - totalPaid;
  const revenueCollected = hasRevenueData ? tiers.reduce((s, t) => s + (t.revenue_collected || 0), 0) : null;
  const projectedPending = hasCrBenchmark ? tiers.reduce((s, t) => s + (t.projected_pending_revenue || 0), 0) : null;

  return {
    region, blocks: { upsells, pim, prevMonth, total }, weights,
    touchedCountFinal, stageSharesFinal, blendedAov, revenueAchievedFinal, managers, calendar,
    subs: { tiers, totalScheduled, totalPaid, totalOverdue, totalPending, revenueCollected, projectedPending, hasCrBenchmark, hasRevenueData },
  };
}

// Recomputes everything ISM-related for a given [from, to] date range.
// Status/utilization = cumulative state as of `to` (what does the base look like on that date).
// Revenue/calls/messages = flow sums strictly within [from, to].
function applyDateRange(base, from, to) {
  const toIdx = Math.min(61, Math.max(0, dateIndexFromJul1(to)));
  const fromIdx = Math.min(61, Math.max(0, dateIndexFromJul1(from)));
  const cumToFrac = base.weights.slice(0, toIdx + 1).reduce((a, b) => a + b, 0);
  const rangeFrac = base.weights.slice(fromIdx, toIdx + 1).reduce((a, b) => a + b, 0);

  const touchedCount = Math.round(base.touchedCountFinal * cumToFrac);
  const total = base.blocks.total;
  const touchedPct = total ? Math.round((touchedCount / total) * 100) : 0;

  const stageBreakdown = {};
  Object.entries(base.stageSharesFinal).forEach(([s, v]) => {
    if (s === 'Not yet touched') return;
    stageBreakdown[s] = Math.round(v * cumToFrac);
  });
  const touchedAllocated = Object.values(stageBreakdown).reduce((a, b) => a + b, 0);
  stageBreakdown['Not yet touched'] = Math.max(0, total - touchedAllocated);

  const pipelineLeads = PIPELINE_STAGES.reduce((s, k) => s + (stageBreakdown[k] || 0), 0);
  const pipelineRevenue = Math.round(pipelineLeads * base.blendedAov);
  const revenueAchieved = Math.round(base.revenueAchievedFinal * rangeFrac);

  const managers = base.managers.map((m) => {
    const touched = Math.round(m.touchedFinal * cumToFrac);
    const calls = Math.round(m.callsFinal * rangeFrac);
    const messages = Math.round(m.messagesFinal * rangeFrac);
    const talkMinutes = Math.round(m.talkMinutesFinal * rangeFrac);
    const mgrStages = {};
    Object.entries(m.mgrStagesFinal).forEach(([s, v]) => { mgrStages[s] = Math.round(v * cumToFrac); });
    const mgrPipelineLeads = PIPELINE_STAGES.reduce((s, k) => s + (mgrStages[k] || 0), 0);
    return {
      ...m, touched, calls, messages, talkMinutes, mgrStages,
      touchedPct: m.assigned ? Math.round((touched / m.assigned) * 100) : 0,
      pipelineLeads: mgrPipelineLeads, pipelineRevenue: Math.round(mgrPipelineLeads * base.blendedAov),
      productivity: touched ? +((calls + messages) / touched).toFixed(1) : 0,
    };
  });

  const streamTouch = {};
  ['upsells', 'pim', 'prevMonth'].forEach((b) => {
    const size = base.blocks[b];
    const touched = Math.min(size, Math.round(size * touchedPct / 100));
    streamTouch[b] = { size, touched, pct: size ? Math.round((touched / size) * 100) : 0 };
  });

  return { touchedCount, touchedPct, na: stageBreakdown['N/A 5+ ISM'], stageBreakdown, streamTouch, pipeline: { leads: pipelineLeads, revenue: pipelineRevenue }, revenueAchieved, managers };
}

function aggregateAll(datasets, from, to) {
  const views = datasets.map((d) => applyDateRange(d, from, to));
  const total = datasets.reduce((s, d) => s + d.blocks.total, 0);
  const upsells = datasets.reduce((s, d) => s + d.blocks.upsells, 0);
  const pim = datasets.reduce((s, d) => s + d.blocks.pim, 0);
  const prevMonth = datasets.reduce((s, d) => s + d.blocks.prevMonth, 0);
  const touchedPct = total ? Math.round(views.reduce((s, v, i) => s + v.touchedPct * datasets[i].blocks.total, 0) / total) : 0;
  const stageBreakdown = {};
  STAGES.forEach((s) => { stageBreakdown[s] = views.reduce((sum, v) => sum + (v.stageBreakdown[s] || 0), 0); });
  const pipelineLeads = views.reduce((s, v) => s + v.pipeline.leads, 0);
  const pipelineRevenue = views.reduce((s, v) => s + v.pipeline.revenue, 0);
  const revenueAchieved = views.reduce((s, v) => s + v.revenueAchieved, 0);
  const totalScheduled = datasets.reduce((s, d) => s + d.subs.totalScheduled, 0);
  const totalPaid = datasets.reduce((s, d) => s + d.subs.totalPaid, 0);
  const totalOverdue = datasets.reduce((s, d) => s + d.subs.totalOverdue, 0);
  const totalPending = datasets.reduce((s, d) => s + d.subs.totalPending, 0);
  const revenueCollected = datasets.reduce((s, d) => s + (d.subs.revenueCollected || 0), 0);
  const projectedPending = datasets.reduce((s, d) => s + (d.subs.projectedPending || 0), 0);
  const streamTouch = {};
  ['upsells', 'pim', 'prevMonth'].forEach((b) => {
    const size = datasets.reduce((s, d) => s + d.blocks[b], 0);
    const touched = views.reduce((s, v) => s + v.streamTouch[b].touched, 0);
    streamTouch[b] = { size, touched, pct: size ? Math.round((touched / size) * 100) : 0 };
  });
  return { total, upsells, pim, prevMonth, touchedPct, stageBreakdown, streamTouch, pipelineLeads, pipelineRevenue, revenueAchieved, totalScheduled, totalPaid, totalOverdue, totalPending, revenueCollected, projectedPending };
}

function Badge({ t, children }) {
  return <span className={`text-xs px-1.5 py-0.5 rounded border ml-2 ${t.badge}`}>{children}</span>;
}

function Metric({ t, label, value, sub, accent, icon: Icon, preview }) {
  return (
    <div className={`${t.panel} border ${t.panelBorder} rounded-xl px-4 py-3 flex-1 min-w-40`}>
      <p className={`text-xs uppercase tracking-wide ${t.muted} mb-1 flex items-center`}>{Icon && <Icon size={11} className="mr-1" />}{label}{preview && <Badge t={t}>preview</Badge>}</p>
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

function StreamTouchPanel({ t, streamTouch }) {
  const BLOCK_LABEL = { upsells: 'Upsells', pim: 'Prolongation in Month', prevMonth: 'Prev Month (July cohort)' };
  return (
    <div className={`${t.panel} border ${t.panelBorder} rounded-xl p-4`}>
      <p className={`text-xs uppercase tracking-wide ${t.muted} mb-3 flex items-center`}>Touched vs. pending — by stream<Badge t={t}>preview %</Badge></p>
      <div className="grid md:grid-cols-3 gap-4">
        {['upsells', 'pim', 'prevMonth'].map((b) => {
          const s = streamTouch[b];
          return (
            <div key={b}>
              <div className={`flex justify-between text-sm ${t.mutedStrong} mb-1`}><span>{BLOCK_LABEL[b]}</span><span className="font-mono text-teal-500">{s.pct}%</span></div>
              <div className={`h-2 rounded-full ${t.track} overflow-hidden`}><div className="h-full bg-teal-400" style={{ width: `${s.pct}%` }} /></div>
              <div className={`flex justify-between text-xs ${t.muted} mt-1`}>
                <span>Touched <span className={`font-mono ${t.mutedStrong}`}>{s.touched}</span></span>
                <span>Pending <span className="font-mono text-amber-500">{s.size - s.touched}</span></span>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

function ManagerRow({ t, m, expanded, onToggle }) {
  return (
    <>
      <tr onClick={onToggle} className={`cursor-pointer ${t.rowHover} border-b ${t.border}`}>
        <td className={`py-2 px-3 ${t.strong} flex items-center gap-1`}>{expanded ? <ChevronDown size={14} className={t.muted} /> : <ChevronRight size={14} className={t.muted} />}{m.name}</td>
        <td className={`py-2 px-3 font-mono ${t.mutedStrong}`}>{m.assigned}</td>
        <td className="py-2 px-3">
          <div className="flex items-center gap-2">
            <div className={`w-14 h-1.5 rounded-full ${t.track} overflow-hidden`}><div className="h-full bg-teal-400" style={{ width: `${m.touchedPct}%` }} /></div>
            <span className={`font-mono text-xs ${t.mutedStrong}`}>{m.touchedPct}%</span>
          </div>
        </td>
        <td className="py-2 px-3 font-mono text-amber-500">{m.assigned - m.touched}</td>
        <td className={`py-2 px-3 font-mono ${t.mutedStrong}`}><Phone size={11} className={`inline ${t.muted} mr-1`} />{m.calls}</td>
        <td className={`py-2 px-3 font-mono ${t.mutedStrong}`}><MessageCircle size={11} className={`inline ${t.muted} mr-1`} />{m.messages}</td>
        <td className="py-2 px-3 font-mono text-sky-500"><Clock size={11} className="inline mr-1" />{Math.round(m.talkMinutes / 60 * 10) / 10}h</td>
        <td className="py-2 px-3"><span className={`font-mono ${m.overdue > 5 ? 'text-amber-500' : t.muted}`}>{m.overdue}</span></td>
        <td className="py-2 px-3 font-mono text-violet-500">${m.pipelineRevenue.toLocaleString()}</td>
        <td className={`py-2 px-3 font-mono ${t.muted}`}>{m.productivity}</td>
      </tr>
      {expanded && (
        <tr className={`${t.subtle} border-b ${t.border}`}>
          <td colSpan={10} className="px-3 py-3">
            <div className={`flex gap-6 text-xs ${t.mutedStrong} mb-2 flex-wrap`}>
              <span>Upsells <span className={`font-mono ${t.strong}`}>{m.block.upsells}</span></span>
              <span>Prolongation in Month <span className={`font-mono ${t.strong}`}>{m.block.pim}</span></span>
              <span>Prev Month <span className={`font-mono ${t.strong}`}>{m.block.prevMonth}</span></span>
              <span className={t.muted}>·</span>
              <span>Pipeline leads (Jul+Aug) <span className="font-mono text-violet-500">{m.pipelineLeads}</span></span>
              <span className={t.muted}>·</span>
              <span>Dominant <span className={`px-1.5 rounded text-slate-900 ${STAGE_COLOR[m.dominant]}`}>{m.dominant}</span></span>
            </div>
            <div className="flex flex-wrap gap-x-4 gap-y-1">
              {STAGES.map((s) => (m.mgrStages[s] ? (<span key={s} className={`text-xs ${t.muted} flex items-center gap-1`}><span className={`w-1.5 h-1.5 rounded-full ${STAGE_COLOR[s]}`} />{s} <span className={`font-mono ${t.mutedStrong}`}>{m.mgrStages[s]}</span></span>) : null))}
            </div>
          </td>
        </tr>
      )}
    </>
  );
}

function CalendarView({ t, calendar }) {
  const [range, setRange] = useState({ from: '2026-08-01', to: '2026-08-31' });
  const [taskFilter, setTaskFilter] = useState('All');

  const daysInRange = calendar.filter((d) => d.date >= range.from && d.date <= range.to);
  const leadsInRange = daysInRange.flatMap((d) => d.leads.map((l) => ({ ...l, date: d.date })).filter((l) => taskFilter === 'All' || l.taskType === taskFilter));
  const taskCounts = TASK_TYPES.reduce((acc, tt) => { acc[tt] = daysInRange.reduce((s, d) => s + d.leads.filter((l) => l.taskType === tt).length, 0); return acc; }, {});
  const max = Math.max(...daysInRange.map((d) => d.count), 1);
  const isSingleDay = range.from === range.to;

  return (
    <div>
      <div className="flex flex-wrap items-center gap-2 mb-3">
        <span className={`text-xs ${t.muted} uppercase tracking-wide mr-1`}>Date range</span>
        <input type="date" value={range.from} onChange={(e) => setRange((r) => ({ ...r, from: e.target.value }))} className={`${t.input} border rounded-lg text-sm px-2 py-1`} />
        <span className={t.muted}>→</span>
        <input type="date" value={range.to} onChange={(e) => setRange((r) => ({ ...r, to: e.target.value }))} className={`${t.input} border rounded-lg text-sm px-2 py-1`} />
      </div>

      <div className="flex flex-wrap items-center gap-2 mb-3">
        <span className={`text-xs ${t.muted} uppercase tracking-wide mr-1`}>Filter by task type</span>
        <select value={taskFilter} onChange={(e) => setTaskFilter(e.target.value)} className={`${t.input} border rounded-lg text-sm px-2 py-1`}>
          <option>All</option>{TASK_TYPES.map((tt) => <option key={tt}>{tt}</option>)}
        </select>
        {TASK_TYPES.map((tt) => (<span key={tt} className={`text-xs rounded-full px-2 py-0.5 border ${t.chip}`}>{tt} <span className={`font-mono ${t.mutedStrong}`}>{taskCounts[tt]}</span></span>))}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="md:col-span-2 grid grid-cols-7 gap-1.5 content-start">
          {daysInRange.map((d) => {
            const shown = taskFilter === 'All' ? d.count : d.leads.filter((l) => l.taskType === taskFilter).length;
            const intensity = shown / max;
            const bg = shown === 0 ? t.subtle : intensity > 0.6 ? 'bg-violet-600' : intensity > 0.25 ? 'bg-violet-400' : 'bg-violet-200';
            const dayNum = d.date.slice(8, 10);
            return (
              <button key={d.date} onClick={() => setRange({ from: d.date, to: d.date })} title={d.date} className={`aspect-square rounded-lg border ${range.from === d.date && range.to === d.date ? 'border-violet-500' : t.border} ${bg} flex flex-col items-center justify-center hover:border-violet-500`}>
                <span className={`text-xs ${t.mutedStrong}`}>{dayNum}</span><span className={`font-mono text-sm ${t.strong}`}>{shown || ''}</span>
              </button>
            );
          })}
        </div>
        <div className={`${t.panel} border ${t.panelBorder} rounded-xl p-3`}>
          <p className={`text-xs uppercase tracking-wide ${t.muted} mb-2`}>
            {isSingleDay ? range.from : `${range.from} → ${range.to}`} — {leadsInRange.length} matching {taskFilter === 'All' ? 'tasks' : taskFilter.toLowerCase()}
          </p>
          {leadsInRange.length > 0 ? (
            <div className="flex flex-col gap-2 max-h-72 overflow-y-auto">
              {leadsInRange.slice(0, 60).map((l, i) => (
                <div key={i} className={`text-xs border-b ${t.border} pb-2 last:border-0`}>
                  <div className={`flex justify-between ${t.strong}`}><span className="font-mono">{l.student}</span><span className={`font-mono ${t.muted}`}>{isSingleDay ? l.time : `${l.date} ${l.time}`}</span></div>
                  <div className={`flex justify-between ${t.muted} mt-0.5`}><span>{l.manager} · {l.taskType}</span><span className={`text-xs px-1.5 rounded ${STAGE_COLOR[l.stage]} text-slate-900`}>{l.stage}</span></div>
                </div>
              ))}
              {leadsInRange.length > 60 && <p className={`text-xs ${t.muted} text-center pt-1`}>+ {leadsInRange.length - 60} more — narrow the range to see all</p>}
            </div>
          ) : <p className={`text-xs ${t.muted}`}>Nothing matches this range/filter.</p>}
        </div>
      </div>
    </div>
  );
}

function SubscriptionsPanel({ t, subs, region }) {
  const [tierIdx, setTierIdx] = useState('total');
  const view = tierIdx === 'total' ? null : subs.tiers.find((tt) => tt.tier === tierIdx);

  return (
    <>
      <div className="flex gap-3 flex-wrap mb-5">
        <Metric t={t} label="Leads this month" value={subs.totalScheduled.toLocaleString()} />
        <Metric t={t} label="Paid" value={subs.totalPaid.toLocaleString()} accent="text-teal-500" sub={subs.totalScheduled ? `${Math.round((subs.totalPaid / subs.totalScheduled) * 100)}% of leads` : ''} />
        <Metric t={t} label="Overdue" value={subs.totalOverdue.toLocaleString()} accent="text-amber-500" />
        <Metric t={t} label="Revenue collected" value={subs.hasRevenueData ? `$${Math.round(subs.revenueCollected).toLocaleString()}` : 'n/a'} sub={subs.hasRevenueData ? 'as of Aug 4 · real' : 'not pulled for this region yet'} accent="text-teal-500" />
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
              <div><p className={`text-xs ${t.muted}`}>Revenue collected (real)</p><p className="font-mono text-teal-500">${Math.round(view.revenue_collected).toLocaleString()}</p></div>
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

export default function ISMOpsConsole() {
  const [theme, setTheme] = useState('dark');
  const [regionIdx, setRegionIdx] = useState(0);
  const [view, setView] = useState('ism');
  const [ismTab, setIsmTab] = useState('managers');
  const [expandedMgr, setExpandedMgr] = useState(null);
  const [globalRange, setGlobalRange] = useState({ from: '2026-08-01', to: '2026-08-31' });
  const t = THEMES[theme];

  const allDatasets = useMemo(() => REGIONS.map((r, i) => buildRegionData(r, i)), []);
  const isAll = regionIdx === REGIONS.length;
  const data = isAll ? null : allDatasets[regionIdx];
  const rangeView = data ? applyDateRange(data, globalRange.from, globalRange.to) : null;
  const agg = isAll ? aggregateAll(allDatasets, globalRange.from, globalRange.to) : null;
  const noRealSubs = !isAll && data.subs.tiers.length === 0;

  return (
    <div className={`min-h-screen ${t.page} ${t.text}`}>
      <div className={`border-b ${t.headerBorder} px-6 py-4 relative`}>
        <div className="absolute top-0 left-0 h-1 w-full bg-gradient-to-r from-violet-600 via-teal-500 to-transparent" />
        <div className="flex items-center justify-between flex-wrap gap-4">
          <div className="flex items-center gap-2">
            <Radio size={18} className="text-teal-500" />
            <h1 className={`text-base font-medium ${t.strong}`}>PX Ops Console</h1>
            <span className={`text-xs font-mono ${t.muted}`}>Aug 2026</span>
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

        <div className={`flex flex-wrap items-center gap-2 mt-4 pt-3 border-t ${t.headerBorder}`}>
          <CalIcon size={13} className={t.muted} />
          <span className={`text-xs ${t.muted} uppercase tracking-wide mr-1`}>Showing data for</span>
          <input type="date" value={globalRange.from} onChange={(e) => setGlobalRange((r) => ({ ...r, from: e.target.value }))} className={`${t.input} border rounded-lg text-sm px-2 py-1`} />
          <span className={t.muted}>→</span>
          <input type="date" value={globalRange.to} onChange={(e) => setGlobalRange((r) => ({ ...r, to: e.target.value }))} className={`${t.input} border rounded-lg text-sm px-2 py-1`} />
        </div>

        <div className="flex gap-1.5 mt-4 overflow-x-auto pb-1">
          {REGIONS.map((r, i) => (
            <button key={r} onClick={() => { setRegionIdx(i); setExpandedMgr(null); }} className={`text-sm px-3 py-1.5 rounded-lg whitespace-nowrap border flex items-center gap-1.5 ${i === regionIdx ? t.pillActive : t.pillInactive}`}>
              <span className={`w-1.5 h-1.5 rounded-full ${i === regionIdx ? 'bg-teal-400 animate-pulse' : t.dot}`} />{r}
            </button>
          ))}
          <span className={`w-px ${t.track} mx-1`} />
          <button onClick={() => { setRegionIdx(REGIONS.length); setExpandedMgr(null); }} className={`text-sm px-3 py-1.5 rounded-lg whitespace-nowrap border flex items-center gap-1.5 font-medium ${isAll ? t.totalActive : t.totalInactive}`}>
            <Layers size={12} /> ALL REGIONS
          </button>
        </div>
      </div>

      <div className="px-6 py-5 max-w-6xl mx-auto">
        {view === 'ism' && !isAll && (
          <>
            <div className="flex gap-3 flex-wrap mb-4">
              <Metric t={t} label="Total leads distributed" value={data.blocks.total.toLocaleString()} sub={`Upsells ${data.blocks.upsells} · PIM ${data.blocks.pim} · Prev month ${data.blocks.prevMonth} — real, whole month`} />
              <Metric t={t} label="Utilization" value={`${rangeView.touchedPct}%`} sub={`as of ${globalRange.to}`} accent="text-teal-500" preview />
              <Metric t={t} label="N/A 5+ ISM" value={rangeView.na} accent={t.mutedStrong} preview />
              <Metric t={t} label="Revenue achieved" value={`$${rangeView.revenueAchieved.toLocaleString()}`} sub={`${globalRange.from} → ${globalRange.to}`} icon={DollarSign} accent="text-teal-500" preview />
              <Metric t={t} label="Pipeline (Negotiation + Waiting)" value={`$${rangeView.pipeline.revenue.toLocaleString()}`} sub={`${rangeView.pipeline.leads} leads, as of ${globalRange.to}`} icon={TrendingUp} accent="text-violet-500" preview />
            </div>

            <div className={`${t.panel} border ${t.panelBorder} rounded-xl p-4 mb-4`}>
              <div className="flex items-center justify-between flex-wrap gap-2 mb-3">
                <p className={`text-xs uppercase tracking-wide ${t.muted} flex items-center`}>Status breakdown — {REGIONS[regionIdx]}, as of {globalRange.to}<Badge t={t}>preview</Badge></p>
                <p className="text-sm"><span className="font-mono text-amber-500 text-base">{rangeView.stageBreakdown['Not yet touched']}</span> <span className={t.muted}>leads not yet touched</span> <span className="font-mono text-amber-500">({Math.round((rangeView.stageBreakdown['Not yet touched'] / data.blocks.total) * 1000) / 10}%)</span></p>
              </div>
              <StageBar t={t} breakdown={rangeView.stageBreakdown} total={data.blocks.total} />
            </div>

            <div className="mb-4"><StreamTouchPanel t={t} streamTouch={rangeView.streamTouch} /></div>

            <div className="flex gap-1 mb-3 items-center flex-wrap">
              {[{ k: 'managers', l: 'Managers', icon: Users }, { k: 'calendar', l: 'Call calendar', icon: CalIcon }].map((tb) => (
                <button key={tb.k} onClick={() => setIsmTab(tb.k)} className={`flex items-center gap-1.5 text-sm px-3 py-1.5 rounded-lg border ${ismTab === tb.k ? t.pillActive : 'border-transparent ' + t.muted}`}>
                  <tb.icon size={13} /> {tb.l}
                </button>
              ))}
              <Badge t={t}>manager/task/call detail is preview — pending Metabase connection</Badge>
              {ismTab === 'managers' && <span className={`text-xs ${t.muted}`}>Manager metrics reflect the date range selected above ({globalRange.from} → {globalRange.to})</span>}
            </div>

            {ismTab === 'managers' ? (
              <div className={`${t.panel} border ${t.panelBorder} rounded-xl overflow-x-auto`}>
                <table className="w-full text-sm">
                  <thead>
                    <tr className={`text-left text-xs uppercase tracking-wide ${t.muted} border-b ${t.border}`}>
                      <th className="py-2 px-3">Manager</th><th className="py-2 px-3">Assigned</th><th className="py-2 px-3">Touched</th>
                      <th className="py-2 px-3">Pending</th><th className="py-2 px-3">Calls</th><th className="py-2 px-3">Messages</th>
                      <th className="py-2 px-3">Talk time</th><th className="py-2 px-3">Overdue</th><th className="py-2 px-3">Pipeline $</th><th className="py-2 px-3">Touches/lead</th>
                    </tr>
                  </thead>
                  <tbody>{rangeView.managers.map((m) => (<ManagerRow key={m.name} t={t} m={m} expanded={expandedMgr === m.name} onToggle={() => setExpandedMgr(expandedMgr === m.name ? null : m.name)} />))}</tbody>
                </table>
              </div>
            ) : <CalendarView t={t} calendar={data.calendar} />}
          </>
        )}

        {view === 'ism' && isAll && (
          <>
            <div className="flex gap-3 flex-wrap mb-4">
              <Metric t={t} label="Total leads — all regions" value={agg.total.toLocaleString()} sub={`Upsells ${agg.upsells} · PIM ${agg.pim} · Prev month ${agg.prevMonth} — real (ex. GCC)`} />
              <Metric t={t} label="Blended utilization" value={`${agg.touchedPct}%`} accent="text-teal-500" preview />
              <Metric t={t} label="Revenue achieved" value={`$${agg.revenueAchieved.toLocaleString()}`} accent="text-teal-500" preview />
              <Metric t={t} label="Pipeline — all regions" value={`$${agg.pipelineRevenue.toLocaleString()}`} accent="text-violet-500" preview />
            </div>
            <div className={`${t.panel} border ${t.panelBorder} rounded-xl p-4 mb-4`}>
              <div className="flex items-center justify-between flex-wrap gap-2 mb-3">
                <p className={`text-xs uppercase tracking-wide ${t.muted} flex items-center`}>Status breakdown — all 10 regions combined<Badge t={t}>preview</Badge></p>
                <p className="text-sm"><span className="font-mono text-amber-500 text-base">{agg.stageBreakdown['Not yet touched']}</span> <span className={t.muted}>leads not yet touched</span> <span className="font-mono text-amber-500">({Math.round((agg.stageBreakdown['Not yet touched'] / agg.total) * 1000) / 10}%)</span></p>
              </div>
              <StageBar t={t} breakdown={agg.stageBreakdown} total={agg.total} />
            </div>
            <div className={`${t.panel} border ${t.panelBorder} rounded-xl overflow-x-auto`}>
              <table className="w-full text-sm">
                <thead><tr className={`text-left text-xs uppercase tracking-wide ${t.muted} border-b ${t.border}`}>
                  <th className="py-2 px-3">Region</th><th className="py-2 px-3">Leads (real)</th><th className="py-2 px-3">Upsells</th><th className="py-2 px-3">PIM</th><th className="py-2 px-3">Prev month</th>
                </tr></thead>
                <tbody>{allDatasets.map((d, i) => (
                  <tr key={d.region} className={`border-b ${t.border} ${t.rowHover} cursor-pointer`} onClick={() => setRegionIdx(i)}>
                    <td className={`py-2 px-3 ${t.strong}`}>{d.region}</td>
                    <td className={`py-2 px-3 font-mono ${t.mutedStrong}`}>{d.blocks.total.toLocaleString()}</td>
                    <td className={`py-2 px-3 font-mono ${t.muted}`}>{d.blocks.upsells}</td>
                    <td className={`py-2 px-3 font-mono ${t.muted}`}>{d.blocks.pim}</td>
                    <td className={`py-2 px-3 font-mono ${t.muted}`}>{d.blocks.prevMonth}</td>
                  </tr>
                ))}</tbody>
              </table>
            </div>
          </>
        )}

        {view === 'subs' && !isAll && (noRealSubs ? (
          <p className={`text-sm ${t.muted}`}>No subscriptions data pulled yet for {REGIONS[regionIdx]}.</p>
        ) : <SubscriptionsPanel t={t} subs={data.subs} region={REGIONS[regionIdx]} />)}

        {view === 'subs' && isAll && (
          <>
            <div className="flex gap-3 flex-wrap mb-4">
              <Metric t={t} label="Leads this month — all regions" value={agg.totalScheduled.toLocaleString()} />
              <Metric t={t} label="Paid — all regions" value={agg.totalPaid.toLocaleString()} accent="text-teal-500" />
              <Metric t={t} label="Overdue — all regions" value={agg.totalOverdue.toLocaleString()} accent="text-amber-500" />
              <Metric t={t} label="Revenue collected (partial)" value={`$${Math.round(agg.revenueCollected).toLocaleString()}`} accent="text-teal-500" />
              <Metric t={t} label="Pending projected (partial)" value={`$${Math.round(agg.projectedPending).toLocaleString()}`} accent="text-violet-500" />
            </div>
            <p className={`text-xs ${t.muted}`}>Poland and Italy don't have an official CR/AOV benchmark yet, so their pending revenue isn't included in the projected total above.</p>
          </>
        )}

        {view === 'total' && !isAll && (
          <div className="flex flex-col items-center gap-6 py-10">
            <p className={`text-xs uppercase tracking-wide ${t.muted}`}>{REGIONS[regionIdx]} — combined revenue ({globalRange.from} → {globalRange.to})</p>
            <p className={`font-mono text-5xl ${t.strong}`}>${Math.round((data.subs.revenueCollected || 0) + rangeView.revenueAchieved).toLocaleString()}</p>
            <div className="flex gap-8 flex-wrap justify-center">
              <div className="text-center"><p className={`text-xs ${t.muted}`}>ISM achieved (preview)</p><p className="font-mono text-xl text-violet-500">${rangeView.revenueAchieved.toLocaleString()}</p></div>
              <div className="text-center"><p className={`text-xs ${t.muted}`}>Subscriptions collected</p><p className="font-mono text-xl text-teal-500">{data.subs.hasRevenueData ? `$${Math.round(data.subs.revenueCollected).toLocaleString()}` : 'n/a'}</p></div>
              <div className="text-center"><p className={`text-xs ${t.muted}`}>Subs pending (projected)</p><p className="font-mono text-xl text-amber-500">{data.subs.hasCrBenchmark ? `$${Math.round(data.subs.projectedPending).toLocaleString()}` : 'no benchmark'}</p></div>
            </div>
          </div>
        )}

        {view === 'total' && isAll && (
          <div className="flex flex-col items-center gap-6 py-10">
            <p className={`text-xs uppercase tracking-wide ${t.muted}`}>All regions — combined revenue</p>
            <p className={`font-mono text-5xl ${t.strong}`}>${Math.round((agg.revenueCollected || 0) + agg.revenueAchieved).toLocaleString()}</p>
            <div className="flex gap-8 flex-wrap justify-center">
              <div className="text-center"><p className={`text-xs ${t.muted}`}>ISM achieved (preview)</p><p className="font-mono text-xl text-violet-500">${agg.revenueAchieved.toLocaleString()}</p></div>
              <div className="text-center"><p className={`text-xs ${t.muted}`}>Subscriptions collected</p><p className="font-mono text-xl text-teal-500">${Math.round(agg.revenueCollected).toLocaleString()}</p></div>
              <div className="text-center"><p className={`text-xs ${t.muted}`}>Subs pending (projected, partial)</p><p className="font-mono text-xl text-amber-500">${Math.round(agg.projectedPending).toLocaleString()}</p></div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
