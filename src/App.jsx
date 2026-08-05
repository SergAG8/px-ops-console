import React, { useState, useMemo } from 'react';
import { ChevronDown, ChevronRight, Phone, MessageCircle, AlertTriangle, Users, Calendar as CalIcon, Layers, DollarSign, Radio, TrendingUp, Clock, Info, Sun, Moon } from 'lucide-react';

const REAL_DATA = {"real_blocks": {"LatAm PMC": {"upsells": 4644, "pim": 1113, "prevMonth": 1046}, "Brazil": {"upsells": 2005, "pim": 510, "prevMonth": 362}, "Turkey": {"upsells": 2432, "pim": 726, "prevMonth": 699}, "Indonesia": {"upsells": 789, "pim": 277, "prevMonth": 181}, "UK": {"upsells": 467, "pim": 168, "prevMonth": 175}, "CIS": {"upsells": 1520, "pim": 414, "prevMonth": 327}, "USA": {"upsells": 41, "pim": 12, "prevMonth": 6}, "Poland": {"upsells": 567, "pim": 214, "prevMonth": 217}, "Italy": {"upsells": 601, "pim": 222, "prevMonth": 190}, "Spain": {"upsells": 124, "pim": 41, "prevMonth": 35}}, "subs_summary": {"LatAm PMC": {"0": {"total": 1, "paid": 1, "overdue": 0, "scheduled": 0, "revenue_collected": 182.56, "cr": null, "aov": null, "projected_pending_revenue": null}, "1": {"total": 842, "paid": 37, "overdue": 57, "scheduled": 748, "revenue_collected": 6502.29, "cr": null, "aov": null, "projected_pending_revenue": null}, "10": {"total": 8, "paid": 0, "overdue": 0, "scheduled": 8, "revenue_collected": 0.0, "cr": null, "aov": null, "projected_pending_revenue": null}, "11": {"total": 8, "paid": 0, "overdue": 0, "scheduled": 8, "revenue_collected": 0.0, "cr": null, "aov": null, "projected_pending_revenue": null}, "12": {"total": 6, "paid": 0, "overdue": 1, "scheduled": 5, "revenue_collected": 0.0, "cr": null, "aov": null, "projected_pending_revenue": null}, "13": {"total": 1, "paid": 0, "overdue": 0, "scheduled": 1, "revenue_collected": 0.0, "cr": null, "aov": null, "projected_pending_revenue": null}, "15": {"total": 1, "paid": 0, "overdue": 0, "scheduled": 1, "revenue_collected": 0.0, "cr": null, "aov": null, "projected_pending_revenue": null}, "2": {"total": 788, "paid": 24, "overdue": 47, "scheduled": 717, "revenue_collected": 3059.49, "cr": null, "aov": null, "projected_pending_revenue": null}, "3": {"total": 555, "paid": 24, "overdue": 35, "scheduled": 496, "revenue_collected": 3038.89, "cr": null, "aov": null, "projected_pending_revenue": null}, "4": {"total": 275, "paid": 11, "overdue": 24, "scheduled": 240, "revenue_collected": 1878.54, "cr": null, "aov": null, "projected_pending_revenue": null}, "5": {"total": 273, "paid": 12, "overdue": 21, "scheduled": 240, "revenue_collected": 986.82, "cr": null, "aov": null, "projected_pending_revenue": null}, "6": {"total": 281, "paid": 11, "overdue": 22, "scheduled": 248, "revenue_collected": 963.63, "cr": null, "aov": null, "projected_pending_revenue": null}, "7": {"total": 238, "paid": 5, "overdue": 23, "scheduled": 210, "revenue_collected": 524.48, "cr": null, "aov": null, "projected_pending_revenue": null}, "8": {"total": 120, "paid": 4, "overdue": 13, "scheduled": 103, "revenue_collected": 185.26, "cr": null, "aov": null, "projected_pending_revenue": null}, "9": {"total": 145, "paid": 4, "overdue": 20, "scheduled": 121, "revenue_collected": 349.22, "cr": null, "aov": null, "projected_pending_revenue": null}}, "Brazil": {"1": {"total": 42, "paid": 0, "overdue": 4, "scheduled": 38, "revenue_collected": null, "cr": 0.326, "aov": 98, "projected_pending_revenue": 1342}, "2": {"total": 22, "paid": 0, "overdue": 2, "scheduled": 20, "revenue_collected": null, "cr": 0.279, "aov": 80, "projected_pending_revenue": 491}, "3": {"total": 50, "paid": 0, "overdue": 4, "scheduled": 46, "revenue_collected": null, "cr": 0.256, "aov": 106, "projected_pending_revenue": 1357}, "4": {"total": 32, "paid": 0, "overdue": 6, "scheduled": 26, "revenue_collected": null, "cr": 0.118, "aov": 128, "projected_pending_revenue": 483}, "5": {"total": 51, "paid": 0, "overdue": 3, "scheduled": 48, "revenue_collected": null, "cr": 0.143, "aov": 47, "projected_pending_revenue": 343}, "6": {"total": 15, "paid": 0, "overdue": 0, "scheduled": 15, "revenue_collected": null, "cr": 0, "aov": 0, "projected_pending_revenue": 0}, "7": {"total": 5, "paid": 0, "overdue": 0, "scheduled": 5, "revenue_collected": null, "cr": 0.15, "aov": 152, "projected_pending_revenue": 114}, "9": {"total": 3, "paid": 0, "overdue": 0, "scheduled": 3, "revenue_collected": null, "cr": 0, "aov": 0, "projected_pending_revenue": 0}}, "Turkey": {"1": {"total": 72, "paid": 0, "overdue": 9, "scheduled": 63, "revenue_collected": null, "cr": 0.533, "aov": 223, "projected_pending_revenue": 8558}, "2": {"total": 45, "paid": 0, "overdue": 3, "scheduled": 42, "revenue_collected": null, "cr": 0.524, "aov": 114, "projected_pending_revenue": 2688}, "3": {"total": 55, "paid": 0, "overdue": 10, "scheduled": 45, "revenue_collected": null, "cr": 0.211, "aov": 97, "projected_pending_revenue": 1126}, "4": {"total": 21, "paid": 0, "overdue": 1, "scheduled": 20, "revenue_collected": null, "cr": 0.306, "aov": 97, "projected_pending_revenue": 623}, "5": {"total": 33, "paid": 0, "overdue": 2, "scheduled": 31, "revenue_collected": null, "cr": 0.171, "aov": 104, "projected_pending_revenue": 587}, "6": {"total": 23, "paid": 0, "overdue": 1, "scheduled": 22, "revenue_collected": null, "cr": 0.034, "aov": 55, "projected_pending_revenue": 43}, "7": {"total": 15, "paid": 0, "overdue": 2, "scheduled": 13, "revenue_collected": null, "cr": 0.15, "aov": 152, "projected_pending_revenue": 342}}, "Indonesia": {"1": {"total": 56, "paid": 0, "overdue": 4, "scheduled": 52, "revenue_collected": null, "cr": 0.563, "aov": 82, "projected_pending_revenue": 2585}, "2": {"total": 58, "paid": 0, "overdue": 4, "scheduled": 54, "revenue_collected": null, "cr": 0.643, "aov": 84, "projected_pending_revenue": 3133}, "3": {"total": 1, "paid": 0, "overdue": 0, "scheduled": 1, "revenue_collected": null, "cr": null, "aov": null, "projected_pending_revenue": null}}, "UK": {"1": {"total": 83, "paid": 0, "overdue": 7, "scheduled": 76, "revenue_collected": null, "cr": 0.614, "aov": 263, "projected_pending_revenue": 13403}, "2": {"total": 56, "paid": 0, "overdue": 2, "scheduled": 54, "revenue_collected": null, "cr": 0.656, "aov": 299, "projected_pending_revenue": 10984}, "3": {"total": 46, "paid": 0, "overdue": 1, "scheduled": 45, "revenue_collected": null, "cr": 0.559, "aov": 223, "projected_pending_revenue": 5734}, "4": {"total": 8, "paid": 0, "overdue": 0, "scheduled": 8, "revenue_collected": null, "cr": 0.5, "aov": 238, "projected_pending_revenue": 952}, "5": {"total": 11, "paid": 0, "overdue": 1, "scheduled": 10, "revenue_collected": null, "cr": 0.05, "aov": 124, "projected_pending_revenue": 68}, "6": {"total": 3, "paid": 0, "overdue": 1, "scheduled": 2, "revenue_collected": null, "cr": 0.429, "aov": 114, "projected_pending_revenue": 147}, "7": {"total": 20, "paid": 0, "overdue": 2, "scheduled": 18, "revenue_collected": null, "cr": 0.214, "aov": 175, "projected_pending_revenue": 749}, "8": {"total": 8, "paid": 0, "overdue": 2, "scheduled": 6, "revenue_collected": null, "cr": 0.294, "aov": 125, "projected_pending_revenue": 294}, "9": {"total": 17, "paid": 0, "overdue": 2, "scheduled": 15, "revenue_collected": null, "cr": 0, "aov": 0, "projected_pending_revenue": 0}}, "CIS": {"1": {"total": 143, "paid": 0, "overdue": 19, "scheduled": 124, "revenue_collected": null, "cr": 0.42, "aov": 135, "projected_pending_revenue": 8108}, "12": {"total": 1, "paid": 0, "overdue": 0, "scheduled": 1, "revenue_collected": null, "cr": 0, "aov": 0, "projected_pending_revenue": 0}, "2": {"total": 91, "paid": 0, "overdue": 9, "scheduled": 82, "revenue_collected": null, "cr": 0.469, "aov": 147, "projected_pending_revenue": 6274}, "3": {"total": 91, "paid": 0, "overdue": 15, "scheduled": 76, "revenue_collected": null, "cr": 0.378, "aov": 152, "projected_pending_revenue": 5228}, "4": {"total": 103, "paid": 0, "overdue": 11, "scheduled": 92, "revenue_collected": null, "cr": 0.283, "aov": 150, "projected_pending_revenue": 4372}, "5": {"total": 10, "paid": 0, "overdue": 1, "scheduled": 9, "revenue_collected": null, "cr": 0.292, "aov": 147, "projected_pending_revenue": 429}, "6": {"total": 5, "paid": 0, "overdue": 1, "scheduled": 4, "revenue_collected": null, "cr": 0.227, "aov": 161, "projected_pending_revenue": 183}, "7": {"total": 16, "paid": 0, "overdue": 2, "scheduled": 14, "revenue_collected": null, "cr": 0.5, "aov": 140, "projected_pending_revenue": 1120}, "9": {"total": 1, "paid": 0, "overdue": 0, "scheduled": 1, "revenue_collected": null, "cr": 0, "aov": 0, "projected_pending_revenue": 0}}, "USA": {"1": {"total": 82, "paid": 0, "overdue": 4, "scheduled": 78, "revenue_collected": null, "cr": 0.667, "aov": 158, "projected_pending_revenue": 8642}, "2": {"total": 62, "paid": 0, "overdue": 4, "scheduled": 58, "revenue_collected": null, "cr": 0.75, "aov": 138, "projected_pending_revenue": 6417}, "3": {"total": 21, "paid": 0, "overdue": 0, "scheduled": 21, "revenue_collected": null, "cr": 0, "aov": 0, "projected_pending_revenue": 0}, "4": {"total": 7, "paid": 0, "overdue": 0, "scheduled": 7, "revenue_collected": null, "cr": 0, "aov": 0, "projected_pending_revenue": 0}}, "Poland": {"1": {"total": 63, "paid": 2, "overdue": 2, "scheduled": 59, "revenue_collected": null, "cr": null, "aov": null, "projected_pending_revenue": null}, "2": {"total": 26, "paid": 0, "overdue": 1, "scheduled": 25, "revenue_collected": null, "cr": null, "aov": null, "projected_pending_revenue": null}, "3": {"total": 4, "paid": 0, "overdue": 0, "scheduled": 4, "revenue_collected": null, "cr": null, "aov": null, "projected_pending_revenue": null}}, "Italy": {"1": {"total": 48, "paid": 0, "overdue": 1, "scheduled": 47, "revenue_collected": null, "cr": null, "aov": null, "projected_pending_revenue": null}, "2": {"total": 8, "paid": 0, "overdue": 1, "scheduled": 7, "revenue_collected": null, "cr": null, "aov": null, "projected_pending_revenue": null}, "3": {"total": 6, "paid": 0, "overdue": 0, "scheduled": 6, "revenue_collected": null, "cr": null, "aov": null, "projected_pending_revenue": null}}, "Spain": {"1": {"total": 112, "paid": 6, "overdue": 4, "scheduled": 102, "revenue_collected": 544.56, "cr": 0.521, "aov": 108, "projected_pending_revenue": 5960}, "2": {"total": 96, "paid": 4, "overdue": 4, "scheduled": 88, "revenue_collected": 331.19, "cr": 0.538, "aov": 107, "projected_pending_revenue": 5297}, "3": {"total": 46, "paid": 3, "overdue": 1, "scheduled": 42, "revenue_collected": 338.07, "cr": 0.559, "aov": 90, "projected_pending_revenue": 2164}, "4": {"total": 52, "paid": 4, "overdue": 5, "scheduled": 43, "revenue_collected": 306.96, "cr": 0.471, "aov": 89, "projected_pending_revenue": 2013}, "5": {"total": 36, "paid": 1, "overdue": 2, "scheduled": 33, "revenue_collected": 92.35, "cr": 0.392, "aov": 96, "projected_pending_revenue": 1317}, "6": {"total": 36, "paid": 2, "overdue": 3, "scheduled": 31, "revenue_collected": 160.36, "cr": 0.324, "aov": 114, "projected_pending_revenue": 1256}, "7": {"total": 47, "paid": 1, "overdue": 9, "scheduled": 37, "revenue_collected": 80.8, "cr": 0.378, "aov": 113, "projected_pending_revenue": 1965}, "8": {"total": 30, "paid": 0, "overdue": 4, "scheduled": 26, "revenue_collected": 0.0, "cr": 0.18, "aov": 100, "projected_pending_revenue": 540}, "9": {"total": 31, "paid": 2, "overdue": 5, "scheduled": 24, "revenue_collected": 228.56, "cr": 0.293, "aov": 105, "projected_pending_revenue": 892}, "10": {"total": 7, "paid": 0, "overdue": 0, "scheduled": 7, "revenue_collected": 0.0, "cr": 0, "aov": 0, "projected_pending_revenue": 0}, "11": {"total": 6, "paid": 0, "overdue": 0, "scheduled": 6, "revenue_collected": 0.0, "cr": 0, "aov": 0, "projected_pending_revenue": 0}, "12": {"total": 4, "paid": 0, "overdue": 1, "scheduled": 3, "revenue_collected": 0.0, "cr": 0, "aov": 0, "projected_pending_revenue": 0}, "15": {"total": 1, "paid": 0, "overdue": 0, "scheduled": 1, "revenue_collected": 0.0, "cr": 0, "aov": 0, "projected_pending_revenue": 0}}}};

const REAL_ISM_EXTRA = {"real_status_breakdown": {"Brazil": {"Other (unconfirmed)": 2709, "Wallet is waiting to receive funds": 99, "ISM start working": 7, "Not getting through ISM": 1}, "CIS": {"Other (unconfirmed)": 2097, "Wallet is waiting to receive funds": 64, "Not getting through ISM": 13, "Negotiations ISM": 6, "ISM start working": 3, "Payment control ISM": 1}, "GCC": {"Other (unconfirmed)": 86, "ISM start working": 1}, "Indonesia": {"Other (unconfirmed)": 1172, "Wallet is waiting to receive funds": 22, "Payment control ISM": 2}, "Italy": {"Other (unconfirmed)": 870, "Wallet is waiting to receive funds": 88, "Reserve base (prolongation)": 1}, "LatAm PMC": {"Other (unconfirmed)": 6458, "Wallet is waiting to receive funds": 110, "Reserve base (prolongation)": 27, "ISM start working": 5, "Not getting through ISM": 2, "Payment control ISM": 1, "Negotiations ISM": 1}, "Poland": {"Other (unconfirmed)": 839, "Wallet is waiting to receive funds": 114}, "Spain": {"Other (unconfirmed)": 190, "Wallet is waiting to receive funds": 3, "Negotiations ISM": 1}, "Turkey": {"Other (unconfirmed)": 3613, "Wallet is waiting to receive funds": 133, "Negotiations ISM": 3}, "UK": {"Other (unconfirmed)": 658, "Wallet is waiting to receive funds": 115}, "USA": {"Other (unconfirmed)": 51, "Wallet is waiting to receive funds": 4}}, "real_managers": {"Brazil": [{"name": "ISM Bruna Rozza", "totalTasks": 1397, "touched": 466, "overdue": 3}, {"name": "ISM Mariana Mischiatti Cavaleiro", "totalTasks": 1311, "touched": 261, "overdue": 0}, {"name": "ISM Moacir de Souza Junqueira", "totalTasks": 1126, "touched": 295, "overdue": 0}, {"name": "ISM Beatriz Matos Mota", "totalTasks": 1091, "touched": 325, "overdue": 0}, {"name": "ISM Arturo Pacheco Pedraza", "totalTasks": 1057, "touched": 924, "overdue": 251}, {"name": "ISM Caio Cavalheiro", "totalTasks": 1010, "touched": 201, "overdue": 0}, {"name": "ISM Alcidelia Bezerra de Melo Valeriano", "totalTasks": 910, "touched": 364, "overdue": 3}, {"name": "ISM Izabela de Oliveira", "totalTasks": 882, "touched": 265, "overdue": 0}, {"name": "ISM Walter Kauling", "totalTasks": 792, "touched": 221, "overdue": 0}, {"name": "ISM Luana Dias dos Santos", "totalTasks": 632, "touched": 301, "overdue": 0}, {"name": "ISM Adriano Paludeto", "totalTasks": 189, "touched": 104, "overdue": 44}, {"name": "ISM Leticia Tiburcio Ervilha", "totalTasks": 127, "touched": 122, "overdue": 0}], "CIS": [{"name": "МВП Анна Царюк", "totalTasks": 1530, "touched": 321, "overdue": 9}, {"name": "МВП Виктория Ильягуева", "totalTasks": 1473, "touched": 339, "overdue": 115}, {"name": "МВП Арина Талпыго", "totalTasks": 1434, "touched": 346, "overdue": 7}, {"name": "МВП Надежда Батарина", "totalTasks": 1368, "touched": 448, "overdue": 117}, {"name": "МВП Александра Маркачев", "totalTasks": 1021, "touched": 205, "overdue": 14}, {"name": "МВП Ольга Шкиндер", "totalTasks": 1007, "touched": 296, "overdue": 49}, {"name": "МВП Искандер Сабиров", "totalTasks": 121, "touched": 77, "overdue": 0}, {"name": "МВП Роман Григорьев", "totalTasks": 74, "touched": 61, "overdue": 2}], "Indonesia": [{"name": "ISM Erika Novaliasari", "totalTasks": 2661, "touched": 479, "overdue": 1}, {"name": "ISM Elita Savira", "totalTasks": 2105, "touched": 343, "overdue": 2}, {"name": "ISM Adityo Dwi", "totalTasks": 1959, "touched": 274, "overdue": 2}, {"name": "ISM Riska Amaliah Dahlan", "totalTasks": 1892, "touched": 471, "overdue": 18}, {"name": "ISM Hikmatul Maula", "totalTasks": 1315, "touched": 371, "overdue": 3}, {"name": "Yousefi", "totalTasks": 31, "touched": 11, "overdue": 21}], "Italy": [{"name": "ISM Noemi Ruggiero", "totalTasks": 1730, "touched": 524, "overdue": 48}, {"name": "ISM Patrick Grava", "totalTasks": 1199, "touched": 409, "overdue": 23}, {"name": "ISM Marengo Sharon", "totalTasks": 35, "touched": 13, "overdue": 0}], "LatAm PMC": [{"name": "ISM Anghy Zirley Caicedo Macheta", "totalTasks": 1324, "touched": 378, "overdue": 4}, {"name": "ISM SV Camilla Romero", "totalTasks": 1300, "touched": 857, "overdue": 752}, {"name": "ISM Jermi Jesus Rojas Hernandez", "totalTasks": 1152, "touched": 376, "overdue": 27}, {"name": "ISM Andrea Carolina Aguilar Linares", "totalTasks": 1017, "touched": 324, "overdue": 49}, {"name": "ISM Minervis Fiqueroa", "totalTasks": 872, "touched": 224, "overdue": 0}, {"name": "ISM Maria Fernanda García", "totalTasks": 865, "touched": 333, "overdue": 2}, {"name": "ISM Yina Paola Rubiano", "totalTasks": 773, "touched": 205, "overdue": 0}, {"name": "ISM Angie Carolina Cuesta Vega", "totalTasks": 737, "touched": 258, "overdue": 42}, {"name": "ISM Alan David Tovar", "totalTasks": 686, "touched": 154, "overdue": 41}, {"name": "ISM Angie Malena Ruiz Lopez", "totalTasks": 663, "touched": 334, "overdue": 4}, {"name": "ISM Pedro Rafael Sarmiento Blanco", "totalTasks": 662, "touched": 188, "overdue": 3}, {"name": "ISM Mauro Salcedo Fontaina", "totalTasks": 613, "touched": 165, "overdue": 59}, {"name": "ISM Eliana Patricia Quintero Gutierrez", "totalTasks": 561, "touched": 114, "overdue": 3}, {"name": "ISM Eider Mauricio Lopez", "totalTasks": 529, "touched": 260, "overdue": 15}, {"name": "ISM David Alexander Campo Diaz", "totalTasks": 525, "touched": 182, "overdue": 21}, {"name": "ISM Alba Teresa Gallego", "totalTasks": 503, "touched": 192, "overdue": 20}, {"name": "ISM Rosa Alejandra Medina Corredor", "totalTasks": 415, "touched": 191, "overdue": 85}, {"name": "ISM Michael Renteria", "totalTasks": 405, "touched": 227, "overdue": 23}, {"name": "ISM Rocio Agustina Apreda", "totalTasks": 403, "touched": 279, "overdue": 305}, {"name": "ISM Laurent Stephanie Escobar Plazas", "totalTasks": 399, "touched": 300, "overdue": 208}, {"name": "Yousefi", "totalTasks": 388, "touched": 341, "overdue": 281}, {"name": "ISM Santiago Julian Miro", "totalTasks": 374, "touched": 189, "overdue": 13}, {"name": "ISM Braian Angel Pavolis", "totalTasks": 372, "touched": 129, "overdue": 33}, {"name": "ISM Jacinth Gabriela Belandria Carmona", "totalTasks": 342, "touched": 203, "overdue": 14}, {"name": "ISM Andres Felipe Moreno", "totalTasks": 299, "touched": 141, "overdue": 45}, {"name": "ISM Javier Andres Martinez Montenegro", "totalTasks": 196, "touched": 157, "overdue": 98}, {"name": "ISM Camilo Montoya", "totalTasks": 126, "touched": 91, "overdue": 25}, {"name": "ISM MarIa Alejandra Medina Bustamante", "totalTasks": 32, "touched": 29, "overdue": 29}, {"name": "ISM Victor Eduardo Rivas", "totalTasks": 23, "touched": 19, "overdue": 0}, {"name": "Facundo Mascali", "totalTasks": 21, "touched": 9, "overdue": 19}, {"name": "ISM Orlando De Jesus Bermúdez", "totalTasks": 9, "touched": 4, "overdue": 9}, {"name": "ISM Aldana Kloss", "totalTasks": 6, "touched": 2, "overdue": 0}], "Poland": [{"name": "ISM Bogusz Rachwalski", "totalTasks": 478, "touched": 422, "overdue": 0}, {"name": "ISM Kamila Koralewska", "totalTasks": 228, "touched": 207, "overdue": 22}], "Spain": [{"name": "ISM SV Camilla Romero", "totalTasks": 151, "touched": 75, "overdue": 110}, {"name": "ISM Andrea Carolina Aguilar Linares", "totalTasks": 49, "touched": 14, "overdue": 4}, {"name": "ISM Yina Paola Rubiano", "totalTasks": 46, "touched": 12, "overdue": 0}, {"name": "ISM Mauro Salcedo Fontaina", "totalTasks": 41, "touched": 11, "overdue": 6}, {"name": "ISM Jermi Jesus Rojas Hernandez", "totalTasks": 41, "touched": 12, "overdue": 0}, {"name": "ISM Anghy Zirley Caicedo Macheta", "totalTasks": 38, "touched": 9, "overdue": 2}, {"name": "ISM Minervis Fiqueroa", "totalTasks": 37, "touched": 10, "overdue": 0}, {"name": "ISM Eider Mauricio Lopez", "totalTasks": 35, "touched": 11, "overdue": 0}, {"name": "ISM Pedro Rafael Sarmiento Blanco", "totalTasks": 30, "touched": 8, "overdue": 0}, {"name": "ISM Angie Malena Ruiz Lopez", "totalTasks": 27, "touched": 13, "overdue": 0}, {"name": "ISM Angie Carolina Cuesta Vega", "totalTasks": 27, "touched": 10, "overdue": 2}, {"name": "ISM Alba Teresa Gallego", "totalTasks": 26, "touched": 7, "overdue": 0}, {"name": "ISM Alan David Tovar", "totalTasks": 26, "touched": 4, "overdue": 2}, {"name": "ISM Santiago Julian Miro", "totalTasks": 20, "touched": 8, "overdue": 1}, {"name": "ISM Rosa Alejandra Medina Corredor", "totalTasks": 18, "touched": 7, "overdue": 4}, {"name": "ISM Rocio Agustina Apreda", "totalTasks": 16, "touched": 11, "overdue": 13}, {"name": "ISM Laurent Stephanie Escobar Plazas", "totalTasks": 15, "touched": 10, "overdue": 5}, {"name": "ISM Michael Renteria", "totalTasks": 14, "touched": 11, "overdue": 1}, {"name": "ISM Maria Fernanda García", "totalTasks": 14, "touched": 6, "overdue": 0}, {"name": "ISM Braian Angel Pavolis", "totalTasks": 13, "touched": 4, "overdue": 0}, {"name": "ISM David Alexander Campo Diaz", "totalTasks": 11, "touched": 7, "overdue": 4}, {"name": "ISM Jacinth Gabriela Belandria Carmona", "totalTasks": 10, "touched": 5, "overdue": 1}, {"name": "Yousefi", "totalTasks": 8, "touched": 8, "overdue": 6}, {"name": "Facundo Mascali", "totalTasks": 7, "touched": 2, "overdue": 7}], "Turkey": [{"name": "ISM Elif Kaya", "totalTasks": 1283, "touched": 353, "overdue": 68}, {"name": "ISM Burak Bozatli", "totalTasks": 912, "touched": 253, "overdue": 37}, {"name": "ISM Hasan Belindir", "totalTasks": 715, "touched": 287, "overdue": 28}, {"name": "ISM Neslihan Yavas", "totalTasks": 688, "touched": 197, "overdue": 42}, {"name": "ISM Suzan Cagatay", "totalTasks": 526, "touched": 239, "overdue": 28}, {"name": "ISM Hulya Asman", "totalTasks": 491, "touched": 238, "overdue": 2}, {"name": "ISM Zeynep Cemre Sahin", "totalTasks": 475, "touched": 135, "overdue": 9}, {"name": "ISM Cansu Demirkan", "totalTasks": 431, "touched": 215, "overdue": 9}, {"name": "ISM Merve Kirklaroglu", "totalTasks": 400, "touched": 193, "overdue": 22}, {"name": "ISM Selin Altinok", "totalTasks": 381, "touched": 216, "overdue": 0}, {"name": "ISM Beyza Dolek", "totalTasks": 330, "touched": 180, "overdue": 0}, {"name": "ISM Zarifa Hasanova", "totalTasks": 235, "touched": 134, "overdue": 35}, {"name": "ISM Irem Sude Demirbag", "totalTasks": 171, "touched": 130, "overdue": 37}, {"name": "ISM Batuhan Akyuz", "totalTasks": 167, "touched": 132, "overdue": 26}, {"name": "ISM Nur Goktas", "totalTasks": 36, "touched": 36, "overdue": 17}], "UK": [{"name": "ISM Tolga Sahin", "totalTasks": 1549, "touched": 280, "overdue": 71}, {"name": "ISM Bruna Riguetto Vasconcelos", "totalTasks": 1256, "touched": 215, "overdue": 3}, {"name": "ISM Talia Guseinzade", "totalTasks": 357, "touched": 71, "overdue": 0}, {"name": "ISM Serkan Berkay Onat", "totalTasks": 331, "touched": 87, "overdue": 0}, {"name": "ISM Patrick Grava", "totalTasks": 10, "touched": 2, "overdue": 1}], "USA": [{"name": "ISM Bruna Riguetto Vasconcelos", "totalTasks": 7, "touched": 4, "overdue": 0}]}, "real_touch_totals": {"Brazil": {"touchedSum": 3849, "tasksSum": 10524, "overdueSum": 301}, "CIS": {"touchedSum": 2093, "tasksSum": 8028, "overdueSum": 313}, "Indonesia": {"touchedSum": 1949, "tasksSum": 9963, "overdueSum": 47}, "Italy": {"touchedSum": 946, "tasksSum": 2964, "overdueSum": 71}, "LatAm PMC": {"touchedSum": 6855, "tasksSum": 16592, "overdueSum": 2229}, "Poland": {"touchedSum": 629, "tasksSum": 706, "overdueSum": 22}, "Spain": {"touchedSum": 275, "tasksSum": 720, "overdueSum": 168}, "Turkey": {"touchedSum": 2938, "tasksSum": 7241, "overdueSum": 360}, "UK": {"touchedSum": 655, "tasksSum": 3503, "overdueSum": 75}, "USA": {"touchedSum": 4, "tasksSum": 7, "overdueSum": 0}}};

const ISM_REAL = {"region_summary": {"LatAm PMC": {"base": 3978, "touched": 507, "util_pct": 12.7, "revenue_aug": 13648.37, "negotiations_leads": 0, "negotiations_revenue": 0, "waiting_leads": 0, "waiting_revenue": 0, "pipeline_total_revenue": 0, "calls": 1454, "messages": 901}, "Brazil": {"base": 1996, "touched": 382, "util_pct": 19.1, "revenue_aug": 7118.55, "negotiations_leads": 0, "negotiations_revenue": 0, "waiting_leads": 0, "waiting_revenue": 0, "pipeline_total_revenue": 0, "calls": 569, "messages": 879}, "Turkey": {"base": 2818, "touched": 161, "util_pct": 5.7, "revenue_aug": 2488.54, "negotiations_leads": 2, "negotiations_revenue": 730, "waiting_leads": 0, "waiting_revenue": 0, "pipeline_total_revenue": 730, "calls": 403, "messages": 366}, "Indonesia": {"base": 985, "touched": 182, "util_pct": 18.5, "revenue_aug": 1208.5, "negotiations_leads": 0, "negotiations_revenue": 0, "waiting_leads": 0, "waiting_revenue": 0, "pipeline_total_revenue": 0, "calls": 393, "messages": 520}, "UK": {"base": 653, "touched": 39, "util_pct": 6.0, "revenue_aug": 0.0, "negotiations_leads": 0, "negotiations_revenue": 0, "waiting_leads": 0, "waiting_revenue": 0, "pipeline_total_revenue": 0, "calls": 72, "messages": 33}, "CIS": {"base": 1630, "touched": 203, "util_pct": 12.5, "revenue_aug": 7644.55, "negotiations_leads": 5, "negotiations_revenue": 2605, "waiting_leads": 0, "waiting_revenue": 0, "pipeline_total_revenue": 2605, "calls": 334, "messages": 152}, "USA": {"base": 16, "touched": 1, "util_pct": 6.2, "revenue_aug": 0.0, "negotiations_leads": 0, "negotiations_revenue": 0, "waiting_leads": 0, "waiting_revenue": 0, "pipeline_total_revenue": 0, "calls": 0, "messages": 0}, "Poland": {"base": 839, "touched": 18, "util_pct": 2.1, "revenue_aug": 2491.91, "negotiations_leads": 0, "negotiations_revenue": 0, "waiting_leads": 0, "waiting_revenue": 0, "pipeline_total_revenue": 0, "calls": 16, "messages": 31}, "Italy": {"base": 796, "touched": 46, "util_pct": 5.8, "revenue_aug": 576.02, "negotiations_leads": 0, "negotiations_revenue": 0, "waiting_leads": 0, "waiting_revenue": 0, "pipeline_total_revenue": 0, "calls": 25, "messages": 52}}};

const ISM_REAL_MANAGERS = {"LatAm PMC": [{"name": "ISM Minervis Fiqueroa", "revenueAug": 2426.57, "paymentsAug": 4, "julyPending": 147, "callsAug": 0, "successfulCalls": 0, "messagesAug": 80}, {"name": "ISM Santiago Julian Miro", "revenueAug": 1925.34, "paymentsAug": 3, "julyPending": 19, "callsAug": 0, "successfulCalls": 0, "messagesAug": 46}, {"name": "ISM Javier Andres Martinez Montenegro", "revenueAug": 1319.58, "paymentsAug": 2, "julyPending": 110, "callsAug": 55, "successfulCalls": 25, "messagesAug": 0}, {"name": "ISM Anghy Zirley Caicedo Macheta", "revenueAug": 1254.27, "paymentsAug": 4, "julyPending": 110, "callsAug": 0, "successfulCalls": 0, "messagesAug": 178}, {"name": "ISM Camilo Montoya", "revenueAug": 979.74, "paymentsAug": 4, "julyPending": 45, "callsAug": 0, "successfulCalls": 0, "messagesAug": 0}, {"name": "ISM Yina Paola Rubiano", "revenueAug": 930.87, "paymentsAug": 2, "julyPending": 127, "callsAug": 80, "successfulCalls": 42, "messagesAug": 58}, {"name": "ISM Alan David Tovar", "revenueAug": 823.39, "paymentsAug": 2, "julyPending": 106, "callsAug": 68, "successfulCalls": 46, "messagesAug": 35}, {"name": "ISM Alba Teresa Gallego", "revenueAug": 794.65, "paymentsAug": 2, "julyPending": 0, "callsAug": 0, "successfulCalls": 0, "messagesAug": 59}, {"name": "ISM Andrea Carolina Aguilar Linares", "revenueAug": 781.63, "paymentsAug": 1, "julyPending": 202, "callsAug": 0, "successfulCalls": 0, "messagesAug": 8}, {"name": "ISM Angie Malena Ruiz Lopez", "revenueAug": 562.14, "paymentsAug": 2, "julyPending": 193, "callsAug": 0, "successfulCalls": 0, "messagesAug": 10}, {"name": "ISM Laurent Stephanie Escobar Plazas", "revenueAug": 325.44, "paymentsAug": 3, "julyPending": 161, "callsAug": 83, "successfulCalls": 42, "messagesAug": 1}, {"name": "ISM Angie Carolina Cuesta Vega", "revenueAug": 318.55, "paymentsAug": 2, "julyPending": 126, "callsAug": 61, "successfulCalls": 17, "messagesAug": 29}, {"name": "ISM Pedro Rafael Sarmiento Blanco", "revenueAug": 147.17, "paymentsAug": 1, "julyPending": 126, "callsAug": 0, "successfulCalls": 0, "messagesAug": 71}, {"name": "ISM Andres Felipe Moreno", "revenueAug": 133.08, "paymentsAug": 1, "julyPending": 10, "callsAug": 58, "successfulCalls": 30, "messagesAug": 43}, {"name": "ISM Eider Mauricio Lopez", "revenueAug": 122.33, "paymentsAug": 1, "julyPending": 161, "callsAug": 0, "successfulCalls": 0, "messagesAug": 14}, {"name": "ISM Maria Fernanda García", "revenueAug": 117.48, "paymentsAug": 1, "julyPending": 137, "callsAug": 59, "successfulCalls": 37, "messagesAug": 5}, {"name": "ISM David Alexander Campo Diaz", "revenueAug": 99.19, "paymentsAug": 1, "julyPending": 23, "callsAug": 47, "successfulCalls": 28, "messagesAug": 28}], "Brazil": [{"name": "ISM Caio Cavalheiro", "revenueAug": 1787.96, "paymentsAug": 5, "julyPending": 129, "callsAug": 49, "successfulCalls": 36, "messagesAug": 270}, {"name": "ISM Walter Kauling", "revenueAug": 1319.66, "paymentsAug": 3, "julyPending": 0, "callsAug": 0, "successfulCalls": 0, "messagesAug": 105}, {"name": "ISM Adriano Paludeto", "revenueAug": 1020.7, "paymentsAug": 3, "julyPending": 52, "callsAug": 4, "successfulCalls": 2, "messagesAug": 7}, {"name": "ISM Moacir de Souza Junqueira", "revenueAug": 962.86, "paymentsAug": 5, "julyPending": 141, "callsAug": 76, "successfulCalls": 61, "messagesAug": 77}, {"name": "ISM Mariana Mischiatti Cavaleiro", "revenueAug": 552.11, "paymentsAug": 1, "julyPending": 140, "callsAug": 44, "successfulCalls": 20, "messagesAug": 36}, {"name": "ISM Bruna Rozza", "revenueAug": 480.79, "paymentsAug": 2, "julyPending": 129, "callsAug": 0, "successfulCalls": 0, "messagesAug": 74}, {"name": "ISM Leticia Tiburcio Ervilha", "revenueAug": 433.51, "paymentsAug": 1, "julyPending": 74, "callsAug": 53, "successfulCalls": 45, "messagesAug": 2}, {"name": "ISM Alcidelia Bezerra de Melo Valeriano", "revenueAug": 293.9, "paymentsAug": 1, "julyPending": 0, "callsAug": 49, "successfulCalls": 24, "messagesAug": 47}, {"name": "ISM Beatriz Matos Mota", "revenueAug": 267.06, "paymentsAug": 3, "julyPending": 159, "callsAug": 35, "successfulCalls": 20, "messagesAug": 204}], "Turkey": [{"name": "ISM Hulya Asman", "revenueAug": 921.67, "paymentsAug": 2, "julyPending": 84, "callsAug": 0, "successfulCalls": 0, "messagesAug": 25}, {"name": "ISM Cansu Demirkan", "revenueAug": 473.24, "paymentsAug": 1, "julyPending": 97, "callsAug": 0, "successfulCalls": 0, "messagesAug": 17}, {"name": "ISM Beyza Dolek", "revenueAug": 387.66, "paymentsAug": 2, "julyPending": 97, "callsAug": 0, "successfulCalls": 0, "messagesAug": 20}, {"name": "ISM Selin Altinok", "revenueAug": 336.6, "paymentsAug": 1, "julyPending": 103, "callsAug": 10, "successfulCalls": 2, "messagesAug": 5}, {"name": "ISM Elif Kaya", "revenueAug": 199.81, "paymentsAug": 1, "julyPending": 153, "callsAug": 0, "successfulCalls": 0, "messagesAug": 7}], "Indonesia": [{"name": "ISM Adityo Dwi", "revenueAug": 481.54, "paymentsAug": 4, "julyPending": 102, "callsAug": 71, "successfulCalls": 3, "messagesAug": 88}, {"name": "ISM Erika Novaliasari", "revenueAug": 232.22, "paymentsAug": 1, "julyPending": 148, "callsAug": 0, "successfulCalls": 0, "messagesAug": 103}, {"name": "ISM Hikmatul Maula", "revenueAug": 199.89, "paymentsAug": 2, "julyPending": 160, "callsAug": 0, "successfulCalls": 0, "messagesAug": 104}, {"name": "ISM Riska Amaliah Dahlan", "revenueAug": 167.02, "paymentsAug": 2, "julyPending": 181, "callsAug": 83, "successfulCalls": 20, "messagesAug": 95}, {"name": "ISM Elita Savira", "revenueAug": 127.83, "paymentsAug": 2, "julyPending": 113, "callsAug": 82, "successfulCalls": 7, "messagesAug": 122}], "UK": [{"name": "ISM Talia Guseinzade", "revenueAug": 0.0, "paymentsAug": 0, "julyPending": 3, "callsAug": 0, "successfulCalls": 0, "messagesAug": 0}, {"name": "ISM Tolga Sahin", "revenueAug": 0.0, "paymentsAug": 0, "julyPending": 117, "callsAug": 13, "successfulCalls": 6, "messagesAug": 6}, {"name": "ISM Serkan Berkay Onat", "revenueAug": 0.0, "paymentsAug": 0, "julyPending": 29, "callsAug": 55, "successfulCalls": 30, "messagesAug": 4}, {"name": "ISM Bruna Riguetto Vasconcelos", "revenueAug": 0.0, "paymentsAug": 0, "julyPending": 99, "callsAug": 0, "successfulCalls": 0, "messagesAug": 0}], "CIS": [{"name": "МВП Ольга Шкиндер", "revenueAug": 2900.1, "paymentsAug": 4, "julyPending": 129, "callsAug": 25, "successfulCalls": 20, "messagesAug": 0}, {"name": "МВП Арина Талпыго", "revenueAug": 1574.73, "paymentsAug": 1, "julyPending": 131, "callsAug": 0, "successfulCalls": 0, "messagesAug": 9}, {"name": "МВП Анна Царюк", "revenueAug": 1362.82, "paymentsAug": 5, "julyPending": 134, "callsAug": 43, "successfulCalls": 26, "messagesAug": 0}, {"name": "МВП Александра Маркачев", "revenueAug": 1211.17, "paymentsAug": 2, "julyPending": 99, "callsAug": 44, "successfulCalls": 31, "messagesAug": 0}, {"name": "МВП Надежда Батарина", "revenueAug": 429.7, "paymentsAug": 2, "julyPending": 195, "callsAug": 0, "successfulCalls": 0, "messagesAug": 0}], "Poland": [{"name": "ISM Bogusz Rachwalski", "revenueAug": 1870.3, "paymentsAug": 4, "julyPending": 214, "callsAug": 0, "successfulCalls": 0, "messagesAug": 25}, {"name": "ISM Kamila Koralewska", "revenueAug": 621.61, "paymentsAug": 3, "julyPending": 117, "callsAug": 13, "successfulCalls": 12, "messagesAug": 6}], "Italy": [{"name": "ISM Patrick Grava", "revenueAug": 576.02, "paymentsAug": 1, "julyPending": 198, "callsAug": 1, "successfulCalls": 0, "messagesAug": 27}, {"name": "ISM Noemi Ruggiero", "revenueAug": 0.0, "paymentsAug": 0, "julyPending": 235, "callsAug": 0, "successfulCalls": 0, "messagesAug": 0}], "USA": [{"name": "ISM Tolga Sahin", "revenueAug": 0.0, "paymentsAug": 0, "julyPending": 2, "callsAug": 0, "successfulCalls": 0, "messagesAug": 0}]};

const ISM_REAL_MANAGERS_FULL = {"LatAm PMC": [{"name": "ISM Minervis Fiqueroa", "assigned": 189, "touched": 32, "pending": 157, "revenueAug": 2426.57, "paymentsAug": 4, "overdue": 0, "callsAug": 0, "successfulCalls": 0, "talkMin": 0, "messagesAug": 80, "touchesPerLead": 2.5}, {"name": "ISM Santiago Julian Miro", "assigned": 62, "touched": 27, "pending": 35, "revenueAug": 1925.34, "paymentsAug": 3, "overdue": 42, "callsAug": 0, "successfulCalls": 0, "talkMin": 0, "messagesAug": 46, "touchesPerLead": 1.7}, {"name": "ISM Javier Andres Martinez Montenegro", "assigned": 111, "touched": 3, "pending": 108, "revenueAug": 1319.58, "paymentsAug": 2, "overdue": 129, "callsAug": 55, "successfulCalls": 25, "talkMin": 48.6, "messagesAug": 0, "touchesPerLead": 18.33}, {"name": "ISM Anghy Zirley Caicedo Macheta", "assigned": 268, "touched": 76, "pending": 192, "revenueAug": 1254.27, "paymentsAug": 4, "overdue": 5, "callsAug": 123, "successfulCalls": 79, "talkMin": 83.6, "messagesAug": 178, "touchesPerLead": 3.96}, {"name": "ISM Camilo Montoya", "assigned": 60, "touched": 1, "pending": 59, "revenueAug": 979.74, "paymentsAug": 4, "overdue": 47, "callsAug": 0, "successfulCalls": 0, "talkMin": 0, "messagesAug": 0, "touchesPerLead": 0.0}, {"name": "ISM Yina Paola Rubiano", "assigned": 146, "touched": 29, "pending": 117, "revenueAug": 930.87, "paymentsAug": 2, "overdue": 0, "callsAug": 80, "successfulCalls": 42, "talkMin": 75.4, "messagesAug": 58, "touchesPerLead": 4.76}, {"name": "ISM Alan David Tovar", "assigned": 138, "touched": 32, "pending": 106, "revenueAug": 823.39, "paymentsAug": 2, "overdue": 64, "callsAug": 68, "successfulCalls": 46, "talkMin": 36.6, "messagesAug": 35, "touchesPerLead": 3.22}, {"name": "ISM Andrea Carolina Aguilar Linares", "assigned": 218, "touched": 2, "pending": 216, "revenueAug": 781.63, "paymentsAug": 1, "overdue": 55, "callsAug": 0, "successfulCalls": 0, "talkMin": 0, "messagesAug": 8, "touchesPerLead": 4.0}, {"name": "ISM Angie Malena Ruiz Lopez", "assigned": 245, "touched": 12, "pending": 233, "revenueAug": 562.14, "paymentsAug": 2, "overdue": 5, "callsAug": 20, "successfulCalls": 15, "talkMin": 2.3, "messagesAug": 10, "touchesPerLead": 2.5}, {"name": "ISM Laurent Stephanie Escobar Plazas", "assigned": 178, "touched": 19, "pending": 159, "revenueAug": 325.44, "paymentsAug": 3, "overdue": 382, "callsAug": 83, "successfulCalls": 42, "talkMin": 47.6, "messagesAug": 1, "touchesPerLead": 4.42}, {"name": "ISM Angie Carolina Cuesta Vega", "assigned": 168, "touched": 21, "pending": 147, "revenueAug": 318.55, "paymentsAug": 2, "overdue": 52, "callsAug": 61, "successfulCalls": 17, "talkMin": 24.7, "messagesAug": 29, "touchesPerLead": 4.29}, {"name": "ISM Pedro Rafael Sarmiento Blanco", "assigned": 167, "touched": 41, "pending": 126, "revenueAug": 147.17, "paymentsAug": 1, "overdue": 23, "callsAug": 93, "successfulCalls": 62, "talkMin": 49.7, "messagesAug": 71, "touchesPerLead": 4.0}, {"name": "ISM Andres Felipe Moreno", "assigned": 32, "touched": 20, "pending": 12, "revenueAug": 133.08, "paymentsAug": 1, "overdue": 65, "callsAug": 58, "successfulCalls": 30, "talkMin": 69.6, "messagesAug": 43, "touchesPerLead": 5.05}, {"name": "ISM Eider Mauricio Lopez", "assigned": 169, "touched": 4, "pending": 165, "revenueAug": 122.33, "paymentsAug": 1, "overdue": 18, "callsAug": 38, "successfulCalls": 27, "talkMin": 26.0, "messagesAug": 14, "touchesPerLead": 13.0}, {"name": "ISM Maria Fernanda García", "assigned": 180, "touched": 22, "pending": 158, "revenueAug": 117.48, "paymentsAug": 1, "overdue": 121, "callsAug": 59, "successfulCalls": 37, "talkMin": 47.6, "messagesAug": 5, "touchesPerLead": 2.91}, {"name": "ISM David Alexander Campo Diaz", "assigned": 48, "touched": 27, "pending": 21, "revenueAug": 99.19, "paymentsAug": 1, "overdue": 86, "callsAug": 47, "successfulCalls": 28, "talkMin": 7.6, "messagesAug": 28, "touchesPerLead": 2.78}], "Brazil": [{"name": "ISM Caio Cavalheiro", "assigned": 151, "touched": 43, "pending": 108, "revenueAug": 1787.96, "paymentsAug": 5, "overdue": 0, "callsAug": 49, "successfulCalls": 36, "talkMin": 28.0, "messagesAug": 270, "touchesPerLead": 7.42}, {"name": "ISM Adriano Paludeto", "assigned": 82, "touched": 15, "pending": 67, "revenueAug": 1020.7, "paymentsAug": 3, "overdue": 45, "callsAug": 4, "successfulCalls": 2, "talkMin": 0.1, "messagesAug": 7, "touchesPerLead": 0.73}, {"name": "ISM Moacir de Souza Junqueira", "assigned": 177, "touched": 31, "pending": 146, "revenueAug": 962.86, "paymentsAug": 5, "overdue": 4, "callsAug": 76, "successfulCalls": 61, "talkMin": 6.3, "messagesAug": 77, "touchesPerLead": 4.94}, {"name": "ISM Mariana Mischiatti Cavaleiro", "assigned": 182, "touched": 24, "pending": 158, "revenueAug": 552.11, "paymentsAug": 1, "overdue": 0, "callsAug": 44, "successfulCalls": 20, "talkMin": 2.1, "messagesAug": 36, "touchesPerLead": 3.33}, {"name": "ISM Bruna Rozza", "assigned": 241, "touched": 45, "pending": 196, "revenueAug": 480.79, "paymentsAug": 2, "overdue": 1, "callsAug": 0, "successfulCalls": 0, "talkMin": 0, "messagesAug": 74, "touchesPerLead": 1.64}, {"name": "ISM Leticia Tiburcio Ervilha", "assigned": 96, "touched": 19, "pending": 77, "revenueAug": 433.51, "paymentsAug": 1, "overdue": 0, "callsAug": 53, "successfulCalls": 45, "talkMin": 13.0, "messagesAug": 2, "touchesPerLead": 2.89}, {"name": "ISM Beatriz Matos Mota", "assigned": 197, "touched": 43, "pending": 154, "revenueAug": 267.06, "paymentsAug": 3, "overdue": 1, "callsAug": 35, "successfulCalls": 20, "talkMin": 17.9, "messagesAug": 204, "touchesPerLead": 5.56}, {"name": "ISM Arturo Pacheco Pedraza", "assigned": 790, "touched": 288, "pending": 502, "revenueAug": 0.0, "paymentsAug": 0, "overdue": 342, "callsAug": 33, "successfulCalls": 1, "talkMin": 0.3, "messagesAug": 0, "touchesPerLead": 0.11}, {"name": "ISM Izabela de Oliveira", "assigned": 184, "touched": 33, "pending": 151, "revenueAug": 0.0, "paymentsAug": 0, "overdue": 0, "callsAug": 62, "successfulCalls": 52, "talkMin": 8.2, "messagesAug": 54, "touchesPerLead": 3.52}, {"name": "ISM Luana Dias dos Santos", "assigned": 179, "touched": 32, "pending": 147, "revenueAug": 0.0, "paymentsAug": 0, "overdue": 0, "callsAug": 95, "successfulCalls": 54, "talkMin": 24.5, "messagesAug": 3, "touchesPerLead": 3.06}], "Turkey": [{"name": "ISM Hulya Asman", "assigned": 106, "touched": 27, "pending": 79, "revenueAug": 921.67, "paymentsAug": 2, "overdue": 32, "callsAug": 13, "successfulCalls": 9, "talkMin": 61.9, "messagesAug": 25, "touchesPerLead": 1.41}, {"name": "ISM Cansu Demirkan", "assigned": 104, "touched": 15, "pending": 89, "revenueAug": 473.24, "paymentsAug": 1, "overdue": 0, "callsAug": 39, "successfulCalls": 22, "talkMin": 131.6, "messagesAug": 17, "touchesPerLead": 3.73}, {"name": "ISM Beyza Dolek", "assigned": 108, "touched": 13, "pending": 95, "revenueAug": 387.66, "paymentsAug": 2, "overdue": 5, "callsAug": 28, "successfulCalls": 16, "talkMin": 83.6, "messagesAug": 20, "touchesPerLead": 3.69}, {"name": "ISM Selin Altinok", "assigned": 110, "touched": 8, "pending": 102, "revenueAug": 336.6, "paymentsAug": 1, "overdue": 36, "callsAug": 10, "successfulCalls": 2, "talkMin": 3.5, "messagesAug": 5, "touchesPerLead": 1.88}, {"name": "ISM Elif Kaya", "assigned": 160, "touched": 27, "pending": 133, "revenueAug": 199.81, "paymentsAug": 1, "overdue": 67, "callsAug": 23, "successfulCalls": 6, "talkMin": 12.4, "messagesAug": 7, "touchesPerLead": 1.11}, {"name": "ISM Burak Bozatli", "assigned": 120, "touched": 14, "pending": 106, "revenueAug": 0.0, "paymentsAug": 0, "overdue": 4, "callsAug": 14, "successfulCalls": 4, "talkMin": 10.3, "messagesAug": 13, "touchesPerLead": 1.93}, {"name": "ISM Hasan Belindir", "assigned": 155, "touched": 25, "pending": 130, "revenueAug": 0.0, "paymentsAug": 0, "overdue": 87, "callsAug": 28, "successfulCalls": 9, "talkMin": 36.1, "messagesAug": 10, "touchesPerLead": 1.52}], "Indonesia": [{"name": "ISM Adityo Dwi", "assigned": 117, "touched": 33, "pending": 84, "revenueAug": 481.54, "paymentsAug": 4, "overdue": 0, "callsAug": 71, "successfulCalls": 3, "talkMin": 8.4, "messagesAug": 88, "touchesPerLead": 4.82}, {"name": "ISM Erika Novaliasari", "assigned": 233, "touched": 52, "pending": 181, "revenueAug": 232.22, "paymentsAug": 1, "overdue": 0, "callsAug": 0, "successfulCalls": 0, "talkMin": 0, "messagesAug": 103, "touchesPerLead": 1.98}, {"name": "ISM Hikmatul Maula", "assigned": 191, "touched": 32, "pending": 159, "revenueAug": 199.89, "paymentsAug": 2, "overdue": 6, "callsAug": 0, "successfulCalls": 0, "talkMin": 0, "messagesAug": 104, "touchesPerLead": 3.25}, {"name": "ISM Riska Amaliah Dahlan", "assigned": 284, "touched": 63, "pending": 221, "revenueAug": 167.02, "paymentsAug": 2, "overdue": 22, "callsAug": 83, "successfulCalls": 20, "talkMin": 13.2, "messagesAug": 95, "touchesPerLead": 2.83}, {"name": "ISM Elita Savira", "assigned": 138, "touched": 39, "pending": 99, "revenueAug": 127.83, "paymentsAug": 2, "overdue": 0, "callsAug": 82, "successfulCalls": 7, "talkMin": 3.3, "messagesAug": 122, "touchesPerLead": 5.23}], "UK": [{"name": "ISM Bruna Riguetto Vasconcelos", "assigned": 102, "touched": 3, "pending": 99, "revenueAug": 0.0, "paymentsAug": 0, "overdue": 2, "callsAug": 0, "successfulCalls": 0, "talkMin": 0, "messagesAug": 0, "touchesPerLead": 0.0}, {"name": "ISM Serkan Berkay Onat", "assigned": 46, "touched": 32, "pending": 14, "revenueAug": 0.0, "paymentsAug": 0, "overdue": 1, "callsAug": 0, "successfulCalls": 0, "talkMin": 0, "messagesAug": 4, "touchesPerLead": 0.12}, {"name": "ISM Talia Guseinzade", "assigned": 38, "touched": 0, "pending": 38, "revenueAug": 0.0, "paymentsAug": 0, "overdue": 0, "callsAug": 0, "successfulCalls": 0, "talkMin": 0, "messagesAug": 0, "touchesPerLead": 0}, {"name": "ISM Tolga Sahin", "assigned": 171, "touched": 58, "pending": 113, "revenueAug": 0.0, "paymentsAug": 0, "overdue": 22, "callsAug": 13, "successfulCalls": 6, "talkMin": 1.6, "messagesAug": 6, "touchesPerLead": 0.33}], "CIS": [{"name": "МВП Ольга Шкиндер", "assigned": 156, "touched": 40, "pending": 116, "revenueAug": 2900.1, "paymentsAug": 4, "overdue": 41, "callsAug": 25, "successfulCalls": 20, "talkMin": 69.4, "messagesAug": 0, "touchesPerLead": 0.62}, {"name": "МВП Арина Талпыго", "assigned": 143, "touched": 15, "pending": 128, "revenueAug": 1574.73, "paymentsAug": 1, "overdue": 79, "callsAug": 0, "successfulCalls": 0, "talkMin": 0, "messagesAug": 9, "touchesPerLead": 0.6}, {"name": "МВП Анна Царюк", "assigned": 151, "touched": 52, "pending": 99, "revenueAug": 1362.82, "paymentsAug": 5, "overdue": 8, "callsAug": 43, "successfulCalls": 26, "talkMin": 83.2, "messagesAug": 0, "touchesPerLead": 0.83}, {"name": "МВП Александра Маркачев", "assigned": 107, "touched": 33, "pending": 74, "revenueAug": 1211.17, "paymentsAug": 2, "overdue": 8, "callsAug": 44, "successfulCalls": 31, "talkMin": 49.6, "messagesAug": 0, "touchesPerLead": 1.33}, {"name": "МВП Надежда Батарина", "assigned": 242, "touched": 84, "pending": 158, "revenueAug": 429.7, "paymentsAug": 2, "overdue": 150, "callsAug": 58, "successfulCalls": 31, "talkMin": 78.4, "messagesAug": 0, "touchesPerLead": 0.69}], "Poland": [{"name": "ISM Bogusz Rachwalski", "assigned": 233, "touched": 15, "pending": 218, "revenueAug": 1870.3, "paymentsAug": 4, "overdue": 21, "callsAug": 0, "successfulCalls": 0, "talkMin": 0, "messagesAug": 25, "touchesPerLead": 1.67}, {"name": "ISM Kamila Koralewska", "assigned": 120, "touched": 4, "pending": 116, "revenueAug": 621.61, "paymentsAug": 3, "overdue": 60, "callsAug": 13, "successfulCalls": 12, "talkMin": 14.7, "messagesAug": 6, "touchesPerLead": 4.75}], "Italy": [{"name": "ISM Patrick Grava", "assigned": 286, "touched": 49, "pending": 237, "revenueAug": 576.02, "paymentsAug": 1, "overdue": 51, "callsAug": 1, "successfulCalls": 0, "talkMin": 0.0, "messagesAug": 27, "touchesPerLead": 0.57}, {"name": "ISM Noemi Ruggiero", "assigned": 236, "touched": 3, "pending": 233, "revenueAug": 0.0, "paymentsAug": 0, "overdue": 0, "callsAug": 0, "successfulCalls": 0, "talkMin": 0, "messagesAug": 0, "touchesPerLead": 0.0}], "USA": [{"name": "ISM Tolga Sahin", "assigned": 3, "touched": 1, "pending": 2, "revenueAug": 0.0, "paymentsAug": 0, "overdue": 22, "callsAug": 0, "successfulCalls": 0, "talkMin": 0, "messagesAug": 0, "touchesPerLead": 0.0}]};

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

  const realTouch = REAL_ISM_EXTRA.real_touch_totals[region] || null;
  const hasRealTouch = !!realTouch;
  const touchedCountFinal = hasRealTouch ? Math.min(total, Math.round(realTouch.touchedSum * 0.97)) : Math.round(total * (35 + rnd() * 50) / 100);
  const untouchedCountFinal = total - touchedCountFinal;

  const realStatus = REAL_ISM_EXTRA.real_status_breakdown[region] || null;
  const stageSharesFinal = {};
  if (realStatus) {
    const statusTotal = Object.values(realStatus).reduce((a, b) => a + b, 0) || 1;
    const scale = touchedCountFinal / statusTotal;
    let allocated = 0;
    Object.entries(realStatus).forEach(([s, v]) => {
      const sv = Math.round(v * scale);
      stageSharesFinal[s] = sv;
      allocated += sv;
    });
    STAGES.filter((s) => s !== 'Not yet touched' && !(s in stageSharesFinal)).forEach((s) => { stageSharesFinal[s] = 0; });
    const diff = touchedCountFinal - allocated;
    stageSharesFinal['Other (unconfirmed)'] = Math.max(0, (stageSharesFinal['Other (unconfirmed)'] || 0) + diff);
  } else {
    const naFinal = Math.round(total * (0.04 + rnd() * 0.08));
    let remaining = touchedCountFinal - naFinal;
    STAGES.filter((s) => s !== 'N/A 5+ ISM' && s !== 'Not yet touched').forEach((s, i, arr) => {
      const share = i === arr.length - 1 ? remaining : Math.round(remaining * (0.08 + rnd() * 0.22));
      stageSharesFinal[s] = Math.max(0, Math.min(remaining, share));
      remaining -= stageSharesFinal[s];
    });
    stageSharesFinal['N/A 5+ ISM'] = Math.max(0, naFinal);
  }
  stageSharesFinal['Not yet touched'] = untouchedCountFinal;

  const blendedAov = Math.round(90 + rnd() * 200);
  const revenueAchievedFinal = Math.round(touchedCountFinal * blendedAov * 0.25);

  const weights = buildDailyWeights(rnd, 62);

  const realMgrs = REAL_ISM_EXTRA.real_managers[region] || null;
  const managers = realMgrs ? realMgrs.map((m, i) => {
    const rnd2 = mulberry32(idx * 131 + i * 977);
    const callsFinal = Math.round(m.touched * (0.6 + rnd2() * 0.9));
    const messagesFinal = Math.round(m.touched * (0.4 + rnd2() * 1.1));
    const talkMinutesFinal = Math.round(callsFinal * (2 + rnd2() * 6));
    return {
      name: m.name.trim(), assigned: m.touched, touchedFinal: m.touched, totalTasksFinal: m.totalTasks, overdue: m.overdue,
      dominant: null, mgrStagesFinal: {}, callsFinal, messagesFinal, talkMinutesFinal, isReal: true,
      block: { upsells: 0, pim: 0, prevMonth: 0 },
    };
  }) : Array.from({ length: 3 + Math.floor(rnd() * 4) }, (_, i) => {
    const nManagers = 3 + Math.floor(rnd() * 4);
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
      name: MANAGER_NAMES[(idx + i) % MANAGER_NAMES.length], assigned, touchedFinal, totalTasksFinal: null, overdue, dominant, mgrStagesFinal,
      callsFinal, messagesFinal, talkMinutesFinal, isReal: false,
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
    const totalTasks = m.totalTasksFinal !== null && m.totalTasksFinal !== undefined ? Math.round(m.totalTasksFinal * cumToFrac) : null;
    const mgrStages = {};
    Object.entries(m.mgrStagesFinal).forEach(([s, v]) => { mgrStages[s] = Math.round(v * cumToFrac); });
    const mgrPipelineLeads = PIPELINE_STAGES.reduce((s, k) => s + (mgrStages[k] || 0), 0);
    return {
      ...m, touched, calls, messages, talkMinutes, totalTasks, mgrStages,
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
        <td className={`py-2 px-3 ${t.strong} flex items-center gap-1`}>{expanded ? <ChevronDown size={14} className={t.muted} /> : <ChevronRight size={14} className={t.muted} />}{m.name}{m.isReal && <span className="text-teal-500 text-xs ml-1" title="Real data from basics_employeetask">●</span>}</td>
        <td className={`py-2 px-3 font-mono ${t.mutedStrong}`}>{m.isReal ? m.touched : m.assigned}</td>
        <td className="py-2 px-3">
          {m.isReal ? (
            <span className="font-mono text-teal-500">{m.touched}</span>
          ) : (
            <div className="flex items-center gap-2">
              <div className={`w-14 h-1.5 rounded-full ${t.track} overflow-hidden`}><div className="h-full bg-teal-400" style={{ width: `${m.touchedPct}%` }} /></div>
              <span className={`font-mono text-xs ${t.mutedStrong}`}>{m.touchedPct}%</span>
            </div>
          )}
        </td>
        <td className="py-2 px-3 font-mono text-amber-500">{m.isReal ? (m.totalTasks ?? '—') : (m.assigned - m.touched)}</td>
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
        {view === 'ism' && !isAll && (() => {
          const isRealTouch = !!REAL_ISM_EXTRA.real_touch_totals[REGIONS[regionIdx]];
          const isRealStatus = !!REAL_ISM_EXTRA.real_status_breakdown[REGIONS[regionIdx]];
          const isRealMgrs = !!REAL_ISM_EXTRA.real_managers[REGIONS[regionIdx]];
          const real = ISM_REAL.region_summary[REGIONS[regionIdx]];
          const realMgrs = ISM_REAL_MANAGERS[REGIONS[regionIdx]];
          if (real) {
            return (
              <>
                <div className="flex gap-3 flex-wrap mb-4">
                  <Metric t={t} label="ISM base (Aug cohort)" value={real.base.toLocaleString()} sub="Prolongation + Upsells (balance 5-17) · real" />
                  <Metric t={t} label="Utilization" value={`${real.util_pct}%`} sub={`${real.touched} leads touched · real, task-based (Aug 1-4)`} accent="text-teal-500" />
                  <Metric t={t} label="Revenue — new in August" value={`$${real.revenue_aug.toLocaleString()}`} sub="real payments, Aug 1-4" icon={DollarSign} accent="text-teal-500" />
                  <Metric t={t} label="Calls / Messages" value={`${real.calls} / ${real.messages}`} sub="real, Aug 1-4" icon={Phone} accent={t.mutedStrong} />
                </div>

                <div className={`${t.panel} border ${t.panelBorder} rounded-xl p-4 mb-4`}>
                  <p className={`text-xs uppercase tracking-wide ${t.muted} mb-3 flex items-center`}>Pipeline — projected revenue by status<Badge t={t}>real leads × est. AOV</Badge></p>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                    <div className={`${t.subtle} border ${t.border} rounded-lg p-3`}>
                      <p className={`text-xs ${t.muted}`}>Waiting for decision</p>
                      <p className="font-mono text-xl text-amber-500">${real.waiting_revenue.toLocaleString()}</p>
                      <p className={`text-xs ${t.muted}`}>{real.waiting_leads} leads</p>
                    </div>
                    <div className={`${t.subtle} border ${t.border} rounded-lg p-3`}>
                      <p className={`text-xs ${t.muted}`}>Negotiations ISM</p>
                      <p className="font-mono text-xl text-violet-500">${real.negotiations_revenue.toLocaleString()}</p>
                      <p className={`text-xs ${t.muted}`}>{real.negotiations_leads} leads</p>
                    </div>
                    <div className={`${t.subtle} border-2 border-teal-500 rounded-lg p-3`}>
                      <p className={`text-xs ${t.muted}`}>Total pipeline</p>
                      <p className="font-mono text-xl text-teal-500">${real.pipeline_total_revenue.toLocaleString()}</p>
                      <p className={`text-xs ${t.muted}`}>{real.waiting_leads + real.negotiations_leads} leads</p>
                    </div>
                  </div>
                  <p className={`text-xs ${t.muted} mt-3`}>Very few leads have reached Negotiations/Waiting so far — most of the base is still under generic pre-negotiation statuses (e.g. "Wallet is top up"), expected only a few days into August.</p>
                </div>

                <div className="flex items-center gap-2 mb-3 flex-wrap">
                  <p className={`text-sm ${t.strong} font-medium flex items-center gap-1.5`}><Users size={14} />Managers — full detail (real)</p>
                  <Badge t={t}>assigned/touched/pending/overdue/calls/messages/talk time are all real</Badge>
                </div>
                <div className={`${t.panel} border ${t.panelBorder} rounded-xl overflow-x-auto mb-2`}>
                  <table className="w-full text-sm min-w-[1000px]">
                    <thead>
                      <tr className={`text-left text-xs uppercase tracking-wide ${t.muted} border-b ${t.border}`}>
                        <th className="py-2 px-3">Manager</th>
                        <th className="py-2 px-3">Assigned</th>
                        <th className="py-2 px-3">Touched (Aug)</th>
                        <th className="py-2 px-3">Pending</th>
                        <th className="py-2 px-3">Revenue (Aug)</th>
                        <th className="py-2 px-3">Payments</th>
                        <th className="py-2 px-3">Overdue tasks</th>
                        <th className="py-2 px-3">Calls</th>
                        <th className="py-2 px-3">Successful</th>
                        <th className="py-2 px-3">Talk time</th>
                        <th className="py-2 px-3">Messages</th>
                        <th className="py-2 px-3">Touches/lead</th>
                      </tr>
                    </thead>
                    <tbody>
                      {(ISM_REAL_MANAGERS_FULL[REGIONS[regionIdx]] || []).map((m) => (
                        <tr key={m.name} className={`border-b ${t.border} ${t.rowHover}`}>
                          <td className={`py-2 px-3 ${t.strong}`}>{m.name}</td>
                          <td className={`py-2 px-3 font-mono ${t.mutedStrong}`}>{m.assigned}</td>
                          <td className={`py-2 px-3 font-mono ${t.mutedStrong}`}>{m.touched}</td>
                          <td className="py-2 px-3 font-mono text-amber-500">{m.pending}</td>
                          <td className="py-2 px-3 font-mono text-teal-500">${m.revenueAug.toLocaleString()}</td>
                          <td className={`py-2 px-3 font-mono ${t.mutedStrong}`}>{m.paymentsAug}</td>
                          <td className={`py-2 px-3 font-mono ${m.overdue > 50 ? 'text-rose-500' : t.mutedStrong}`}>{m.overdue}</td>
                          <td className={`py-2 px-3 font-mono ${t.mutedStrong}`}><Phone size={11} className={`inline ${t.muted} mr-1`} />{m.callsAug}</td>
                          <td className={`py-2 px-3 font-mono ${t.mutedStrong}`}>{m.successfulCalls}</td>
                          <td className="py-2 px-3 font-mono text-sky-500"><Clock size={11} className="inline mr-1" />{Math.round(m.talkMin/60*10)/10}h</td>
                          <td className={`py-2 px-3 font-mono ${t.mutedStrong}`}><MessageCircle size={11} className={`inline ${t.muted} mr-1`} />{m.messagesAug}</td>
                          <td className={`py-2 px-3 font-mono ${t.muted}`}>{m.touchesPerLead}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
                <p className={`text-xs ${t.muted} mb-4`}>"Assigned" = distinct leads this manager has a task on (Jul 1 → Aug 4). "Pending" = assigned leads not yet touched specifically this week — includes leads carried from July still being worked, which explains revenue on managers with 0 August calls.</p>

                <CalendarView t={t} calendar={data.calendar} />
              </>
            );
          }
          return (
          <>
            <div className="flex gap-3 flex-wrap mb-4">
              <Metric t={t} label="Total leads distributed" value={data.blocks.total.toLocaleString()} sub={`Upsells ${data.blocks.upsells} · PIM ${data.blocks.pim} · Prev month ${data.blocks.prevMonth} — real, whole month`} />
              <Metric t={t} label="Utilization" value={`${rangeView.touchedPct}%`} sub={isRealTouch ? `real · leads with ≥1 task (Jul 1 → ${globalRange.to})` : `as of ${globalRange.to}`} accent="text-teal-500" preview={!isRealTouch} />
              <Metric t={t} label="Leads not yet touched" value={rangeView.stageBreakdown['Not yet touched']} accent="text-amber-500" preview={!isRealTouch} />
              <Metric t={t} label="Revenue achieved" value={`$${rangeView.revenueAchieved.toLocaleString()}`} sub={`${globalRange.from} → ${globalRange.to}`} icon={DollarSign} accent="text-teal-500" preview />
              <Metric t={t} label="Pipeline (Negotiation + Waiting)" value={`$${rangeView.pipeline.revenue.toLocaleString()}`} sub={`${rangeView.pipeline.leads} leads, as of ${globalRange.to}`} icon={TrendingUp} accent="text-violet-500" preview />
            </div>

            <div className={`${t.panel} border ${t.panelBorder} rounded-xl p-4 mb-4`}>
              <div className="flex items-center justify-between flex-wrap gap-2 mb-3">
                <p className={`text-xs uppercase tracking-wide ${t.muted} flex items-center`}>Status breakdown — {REGIONS[regionIdx]}, as of {globalRange.to}<Badge t={t}>{isRealStatus ? 'real amoCRM status, scaled to real touch' : 'preview'}</Badge></p>
                <p className="text-sm"><span className="font-mono text-amber-500 text-base">{rangeView.stageBreakdown['Not yet touched']}</span> <span className={t.muted}>leads not yet touched</span> <span className="font-mono text-amber-500">({Math.round((rangeView.stageBreakdown['Not yet touched'] / data.blocks.total) * 1000) / 10}%)</span></p>
              </div>
              {isRealStatus && <p className={`text-xs ${t.muted} mb-3`}>Most of this base still sits under generic amoCRM lifecycle statuses (e.g. "Wallet is top up") rather than a specific ISM negotiation stage — that's a real finding, not a display bug.</p>}
              <StageBar t={t} breakdown={rangeView.stageBreakdown} total={data.blocks.total} />
            </div>

            <div className="mb-4"><StreamTouchPanel t={t} streamTouch={rangeView.streamTouch} /></div>

            <div className="flex gap-1 mb-3 items-center flex-wrap">
              {[{ k: 'managers', l: 'Managers', icon: Users }, { k: 'calendar', l: 'Call calendar', icon: CalIcon }].map((tb) => (
                <button key={tb.k} onClick={() => setIsmTab(tb.k)} className={`flex items-center gap-1.5 text-sm px-3 py-1.5 rounded-lg border ${ismTab === tb.k ? t.pillActive : 'border-transparent ' + t.muted}`}>
                  <tb.icon size={13} /> {tb.l}
                </button>
              ))}
              <Badge t={t}>{isRealMgrs ? 'manager names, touched, tasks & overdue are real · calls/messages/talk time/pipeline still modeled' : 'manager/task/call detail is preview — pending Metabase connection'}</Badge>
              {ismTab === 'managers' && <span className={`text-xs ${t.muted}`}>Manager metrics reflect the date range selected above ({globalRange.from} → {globalRange.to})</span>}
            </div>

            {ismTab === 'managers' ? (
              <div className={`${t.panel} border ${t.panelBorder} rounded-xl overflow-x-auto`}>
                <table className="w-full text-sm">
                  <thead>
                    <tr className={`text-left text-xs uppercase tracking-wide ${t.muted} border-b ${t.border}`}>
                      <th className="py-2 px-3">Manager</th><th className="py-2 px-3">Leads</th><th className="py-2 px-3">Touched</th>
                      <th className="py-2 px-3">Tasks / Pending</th><th className="py-2 px-3">Calls</th><th className="py-2 px-3">Messages</th>
                      <th className="py-2 px-3">Talk time</th><th className="py-2 px-3">Overdue</th><th className="py-2 px-3">Pipeline $</th><th className="py-2 px-3">Touches/lead</th>
                    </tr>
                  </thead>
                  <tbody>{rangeView.managers.map((m) => (<ManagerRow key={m.name} t={t} m={m} expanded={expandedMgr === m.name} onToggle={() => setExpandedMgr(expandedMgr === m.name ? null : m.name)} />))}</tbody>
                </table>
              </div>
            ) : <CalendarView t={t} calendar={data.calendar} />}
          </>
          );
        })()}

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
