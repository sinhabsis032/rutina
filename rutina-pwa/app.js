'use strict';

// ─── DATA ───────────────────────────────────────────────────────────────────

const SLOTS = [
  { id:'bath',   label:'Me baño',              sub:'Activar el sistema',          start:[7,30],  end:[8,0],   cls:'c-rest',  badge:'',            badgeCls:'' },
  { id:'gym',    label:'Gimnasio',              sub:'Cuerpo fuerte, mente fuerte', start:[8,10],  end:[9,10],  cls:'c-gym',   badge:'cuerpo fuerte',badgeCls:'badge-gym' },
  { id:'clean',  label:'Compra · baño · limpieza', sub:'Orden externo = orden mental',start:[9,30],  end:[11,0],  cls:'c-rest',  badge:'orden mental', badgeCls:'badge-rest' },
  { id:'study',  label:'Estudio profundo',      sub:'Lo que más te cuesta primero',start:[11,0],  end:[12,30], cls:'c-study', badge:'deep work',   badgeCls:'badge-focus' },
  { id:'lunch',  label:'Cocino y como',          sub:'Recargar el sistema',         start:[12,30], end:[14,0],  cls:'c-rest',  badge:'',            badgeCls:'' },
  { id:'review', label:'Repaso + IA / Clases',  sub:'Consolidar y practicar',      start:[14,0],  end:[17,0],  cls:'c-clase', badge:'review + AI', badgeCls:'badge-code' },
  { id:'rest',   label:'Descanso activo',        sub:'Recargar para la noche',      start:[17,0],  end:[18,0],  cls:'c-rest',  badge:'recargar',    badgeCls:'badge-rest' },
  { id:'night',  label:'Clases / Temas cartilla',sub:'Clase o repaso nocturno',     start:[19,0],  end:[22,0],  cls:'c-clase', badge:'clase / repaso',badgeCls:'badge-clase' },
  { id:'wind',   label:'Cierre del día',         sub:'Como · baño · a dormir',      start:[22,0],  end:[24,0],  cls:'c-sleep', badge:'cierre',      badgeCls:'' },
];

const DAY_SCHEDULE = [
  // [slotId, label, badge, badgeCls] per day (Mon-Fri)
  [ // Lunes
    {s:'bath',  label:'Me baño',                  badge:'',            bc:''},
    {s:'gym',   label:'Gimnasio',                  badge:'cuerpo fuerte',bc:'badge-gym'},
    {s:'clean', label:'Compra y baño y limpieza',  badge:'orden',       bc:'badge-rest'},
    {s:'study', label:'Estudio profundo',           badge:'deep work',   bc:'badge-focus'},
    {s:'lunch', label:'Cocino y como',              badge:'',            bc:''},
    {s:'review',label:'Repaso de temas + IA',       badge:'review + AI', bc:'badge-code'},
    {s:'rest',  label:'Descanso activo',            badge:'recargar',    bc:'badge-rest'},
    {s:'night', label:'Clases de Matemáticas',      badge:'clase',       bc:'badge-clase'},
    {s:'wind',  label:'Como · baño · a dormir',     badge:'cierre',      bc:''},
  ],
  [ // Martes
    {s:'bath',  label:'Me baño',                  badge:'',            bc:''},
    {s:'gym',   label:'Gimnasio',                  badge:'cuerpo fuerte',bc:'badge-gym'},
    {s:'clean', label:'Compra y baño y limpieza',  badge:'',            bc:''},
    {s:'study', label:'Estudio profundo',           badge:'deep work',   bc:'badge-focus'},
    {s:'lunch', label:'Cocino y como',              badge:'',            bc:''},
    {s:'review',label:'Repaso de temas + IA',       badge:'review + AI', bc:'badge-code'},
    {s:'rest',  label:'Descanso activo',            badge:'',            bc:''},
    {s:'night', label:'Temas de la cartilla',       badge:'repaso',      bc:'badge-focus'},
    {s:'wind',  label:'Como · baño · a dormir',     badge:'cierre',      bc:''},
  ],
  [ // Miércoles
    {s:'bath',  label:'Me baño',                  badge:'',            bc:''},
    {s:'gym',   label:'Gimnasio',                  badge:'cuerpo fuerte',bc:'badge-gym'},
    {s:'clean', label:'Compra y baño y limpieza',  badge:'',            bc:''},
    {s:'study', label:'Estudio profundo',           badge:'deep work',   bc:'badge-focus'},
    {s:'lunch', label:'Cocino y como',              badge:'',            bc:''},
    {s:'review',label:'Clases de IVU',              badge:'clase',       bc:'badge-clase'},
    {s:'rest',  label:'Descanso activo',            badge:'',            bc:''},
    {s:'night', label:'Temas de la cartilla',       badge:'repaso',      bc:'badge-focus'},
    {s:'wind',  label:'Como · baño · a dormir',     badge:'cierre',      bc:''},
  ],
  [ // Jueves
    {s:'bath',  label:'Me baño',                  badge:'',            bc:''},
    {s:'gym',   label:'Gimnasio',                  badge:'cuerpo fuerte',bc:'badge-gym'},
    {s:'clean', label:'Compra y baño y limpieza',  badge:'',            bc:''},
    {s:'study', label:'Estudio profundo',           badge:'deep work',   bc:'badge-focus'},
    {s:'lunch', label:'Cocino',                     badge:'',            bc:''},
    {s:'review',label:'Repaso de temas + IA',       badge:'review + AI', bc:'badge-code'},
    {s:'rest',  label:'Descanso activo',            badge:'',            bc:''},
    {s:'night', label:'Temas de la cartilla',       badge:'repaso',      bc:'badge-focus'},
    {s:'wind',  label:'Como · baño · a dormir',     badge:'cierre',      bc:''},
  ],
  [ // Viernes
    {s:'bath',  label:'Me baño',                  badge:'',            bc:''},
    {s:'gym',   label:'Gimnasio',                  badge:'cuerpo fuerte',bc:'badge-gym'},
    {s:'clean', label:'Compra y baño y limpieza',  badge:'',            bc:''},
    {s:'study', label:'Estudio profundo',           badge:'deep work',   bc:'badge-focus'},
    {s:'lunch', label:'Cocino',                     badge:'',            bc:''},
    {s:'review',label:'Clases de IVU',              badge:'clase',       bc:'badge-clase'},
    {s:'rest',  label:'Descanso activo',            badge:'',            bc:''},
    {s:'night', label:'Clases de Matemáticas',      badge:'clase',       bc:'badge-clase'},
    {s:'wind',  label:'Como · baño · a dormir',     badge:'cierre',      bc:''},
  ],
];

const QUOTES = [
  { text:'Los ingenieros no nacen, se forjan. Cada hora de estudio es un ladrillo de tu carrera.', author:'// mentalidad de builder' },
  { text:'La disciplina es elegir entre lo que quieres ahora y lo que más quieres.', author:'— Abraham Lincoln' },
  { text:'Un año de esta rutina y vas a ser otra persona. Confiá en el proceso.', author:'// juego largo' },
  { text:'No busques inspiración para arrancar. Arrancá primero, la inspiración llega después.', author:'// acción antes que emoción' },
  { text:'El que madruga y se mueve gana. Tu rutina es tu ventaja competitiva.', author:'// ejecución > motivación' },
  { text:'Cada línea de código que aprendés hoy es poder que nadie te puede quitar.', author:'// ing. informática' },
  { text:'La carrera no se gana estudiando cuando tenés ganas. Se gana estudiando cuando no querés.', author:'// disciplina real' },
];

const SLOT_HOURS = { bath:'7:30',gym:'8:10',clean:'9:30',study:'11:00',lunch:'12:30',review:'14:00',rest:'17:00',night:'19:00',wind:'22:00' };
const SLOT_END_HOURS = { bath:'8:00',gym:'9:10',clean:'11:00',study:'12:30',lunch:'14:00',review:'17:00',rest:'18:00',night:'22:00',wind:'00:00' };

// ─── STATE ───────────────────────────────────────────────────────────────────

function toMins(h, m) { return h * 60 + m; }
function nowMins() { const d = new Date(); return toMins(d.getHours(), d.getMinutes()); }
function pad(n) { return String(n).padStart(2, '0'); }

function getCurrentSlot() {
  const m = nowMins();
  return SLOTS.find(s => m >= toMins(...s.start) && m < toMins(...s.end)) || null;
}

function getNextSlot() {
  const m = nowMins();
  return SLOTS.find(s => toMins(...s.start) > m) || null;
}

function getPhase(h) {
  if (h >= 5 && h < 12) return 'Mañana — modo arranque';
  if (h >= 12 && h < 14) return 'Mediodía — recargando energía';
  if (h >= 14 && h < 18) return 'Tarde — zona de concentración';
  if (h >= 18 && h < 22) return 'Noche — repaso y clase';
  return 'Hora de descanso — recargá';
}

// ─── STORAGE ────────────────────────────────────────────────────────────────

function todayKey() {
  const d = new Date();
  return `done_${d.getFullYear()}_${d.getMonth()}_${d.getDate()}`;
}

function getDoneSet() {
  try { return new Set(JSON.parse(localStorage.getItem(todayKey()) || '[]')); } catch(e) { return new Set(); }
}

function saveDoneSet(s) {
  localStorage.setItem(todayKey(), JSON.stringify([...s]));
}

function getStreak() {
  try { return parseInt(localStorage.getItem('streak') || '0'); } catch(e) { return 0; }
}

function saveStreak(n) { localStorage.setItem('streak', n); }

function getStreakDate() {
  try { return localStorage.getItem('streak_date') || ''; } catch(e) { return ''; }
}

function saveStreakDate(d) { localStorage.setItem('streak_date', d); }

function getWeekData() {
  try { return JSON.parse(localStorage.getItem('week_data') || '{}'); } catch(e) { return {}; }
}

function saveWeekData(d) { localStorage.setItem('week_data', JSON.stringify(d)); }

function todayDateStr() {
  const d = new Date();
  return `${d.getFullYear()}-${d.getMonth()}-${d.getDate()}`;
}

// ─── CLOCK ───────────────────────────────────────────────────────────────────

function updateClock() {
  const now = new Date();
  const h = now.getHours(), m = now.getMinutes(), s = now.getSeconds();
  const timeStr = pad(h) + ':' + pad(m);

  const el = document.getElementById('nowTime');
  if (el) el.textContent = timeStr;

  const hh = document.getElementById('clockHH');
  const mm = document.getElementById('clockMM');
  if (hh) hh.textContent = pad(h);
  if (mm) mm.textContent = pad(m) + ':' + pad(s);

  const ring = document.getElementById('clockRing');
  if (ring) {
    const pct = (h * 3600 + m * 60 + s) / 86400;
    const circ = 2 * Math.PI * 36;
    ring.style.strokeDasharray = circ;
    ring.style.strokeDashoffset = circ * (1 - pct);
  }

  const slot = getCurrentSlot();
  const nb = document.getElementById('nowBlock');
  const np = document.getElementById('nowPhase');
  if (nb) nb.textContent = slot ? slot.label : 'Fuera del horario programado';
  if (np) np.textContent = getPhase(h);

  const next = getNextSlot();
  const nn = document.getElementById('nextName');
  const nt = document.getElementById('nextTime');
  if (nn) nn.textContent = next ? next.label : 'Eso es todo por hoy';
  if (nt) nt.textContent = next ? 'A las ' + pad(next.start[0]) + ':' + pad(next.start[1]) : '';

  updateStats(slot);
}

// ─── STATS ───────────────────────────────────────────────────────────────────

function updateStats(slot) {
  const done = getDoneSet();
  const sd = document.getElementById('statDone');
  if (sd) sd.textContent = done.size;

  const streak = getStreak();
  const ss = document.getElementById('statStreak');
  if (ss) ss.textContent = streak > 0 ? streak : '0';
}

// ─── TIMELINE ────────────────────────────────────────────────────────────────

function buildTimeline() {
  const tl = document.getElementById('timeline');
  if (!tl) return;
  const m = nowMins();
  const current = getCurrentSlot();
  tl.innerHTML = '';
  SLOTS.forEach(s => {
    const endMins = toMins(...s.end);
    const startMins = toMins(...s.start);
    const isPassed = endMins <= m;
    const isActive = current && s.id === current.id;

    const row = document.createElement('div');
    row.className = 'tl-row';

    const timeEl = document.createElement('div');
    timeEl.className = 'tl-time';
    timeEl.textContent = pad(s.start[0]) + ':' + pad(s.start[1]);

    const bar = document.createElement('div');
    bar.className = 'tl-bar ' + s.cls + (isActive ? ' active' : '') + (isPassed ? ' passed' : '');

    let inner = '<span class="tl-name">' + s.label + '</span>';
    if (isActive) inner += '<span class="tl-now-tag">AHORA</span>';
    if (s.badge) inner += '<br><span class="tl-badge ' + (s.badgeCls||'') + '">' + s.badge + '</span>';

    bar.innerHTML = inner;
    row.appendChild(timeEl);
    row.appendChild(bar);
    tl.appendChild(row);

    if (isActive) {
      setTimeout(() => bar.scrollIntoView({ behavior: 'smooth', block: 'nearest' }), 100);
    }
  });
}

// ─── QUOTE ───────────────────────────────────────────────────────────────────

function setQuote() {
  const q = QUOTES[Math.floor(Math.random() * QUOTES.length)];
  const qt = document.getElementById('quoteText');
  const qa = document.getElementById('quoteAuthor');
  if (qt) qt.textContent = q.text;
  if (qa) qa.textContent = q.author;
}

// ─── TAB SWITCHING ───────────────────────────────────────────────────────────

function switchTab(name) {
  document.querySelectorAll('.tab').forEach(t => t.classList.toggle('active', t.dataset.tab === name));
  document.querySelectorAll('.tab-content').forEach(s => s.classList.toggle('active', s.id === 'tab-' + name));
  if (name === 'schedule') buildDaySchedule(currentDay);
  if (name === 'progress') buildProgress();
}

// ─── DAY SCHEDULE ────────────────────────────────────────────────────────────

let currentDay = new Date().getDay() - 1;
if (currentDay < 0 || currentDay > 4) currentDay = 0;

function selectDay(idx, btn) {
  currentDay = idx;
  document.querySelectorAll('.day-btn').forEach((b, i) => b.classList.toggle('active', i === idx));
  buildDaySchedule(idx);
}

function buildDaySchedule(dayIdx) {
  const container = document.getElementById('daySchedule');
  if (!container) return;
  const day = DAY_SCHEDULE[dayIdx] || DAY_SCHEDULE[0];
  const current = getCurrentSlot();
  container.innerHTML = '';

  day.forEach(item => {
    const slot = SLOTS.find(s => s.id === item.s);
    if (!slot) return;
    const isActive = current && current.id === item.s;
    const m = nowMins();
    const endMins = toMins(...slot.end);
    const isPassed = endMins <= m;

    const row = document.createElement('div');
    row.className = 'sched-row ' + (isActive ? 'active' : '') + (isPassed ? ' passed' : '');
    row.style.opacity = isPassed ? '0.5' : '1';

    const timeStr = pad(slot.start[0]) + ':' + pad(slot.start[1]) + '\n–\n' + pad(slot.end[0]) + ':' + pad(slot.end[1]);

    row.innerHTML = `
      <div class="sched-time">${timeStr.replace(/\n/g,'<br>')}</div>
      <div class="sched-info">
        <div class="sched-name">${item.label}</div>
        <div class="sched-sub">${slot.sub}</div>
        ${item.badge ? `<span class="sched-badge ${item.bc}">${item.badge}</span>` : ''}
      </div>
    `;
    container.appendChild(row);
  });
}

// ─── PROGRESS / CHECKLIST ────────────────────────────────────────────────────

function buildProgress() {
  buildWeekBars();
  buildChecklist();
  buildStreakBanner();
}

function buildWeekBars() {
  const container = document.getElementById('progressWeek');
  if (!container) return;
  const week = getWeekData();
  const days = ['L','M','X','J','V','S','D'];
  const today = new Date().getDay();
  container.innerHTML = '';
  days.forEach((d, i) => {
    const dateKey = getWeekDayKey(i);
    const pct = week[dateKey] || 0;
    const isToday = i === today;
    const div = document.createElement('div');
    div.className = 'pw-day';
    div.innerHTML = `
      <div class="pw-label" style="${isToday ? 'color:var(--accent)' : ''}">${d}</div>
      <div class="pw-bar-wrap">
        <div class="pw-bar" style="height:${Math.round(pct)}%;background:${isToday ? 'var(--accent)' : 'rgba(0,200,255,0.4)'}"></div>
      </div>
      <div class="pw-pct">${Math.round(pct)}%</div>
    `;
    container.appendChild(div);
  });
}

function getWeekDayKey(dayOfWeek) {
  const now = new Date();
  const diff = dayOfWeek - now.getDay();
  const d = new Date(now);
  d.setDate(d.getDate() + diff);
  return `${d.getFullYear()}-${d.getMonth()}-${d.getDate()}`;
}

function buildChecklist() {
  const container = document.getElementById('checklist');
  if (!container) return;
  const done = getDoneSet();
  container.innerHTML = '';

  SLOTS.forEach(s => {
    const item = document.createElement('div');
    item.className = 'check-item' + (done.has(s.id) ? ' done' : '');
    item.innerHTML = `
      <div class="check-box">
        <svg class="check-tick" width="12" height="12" viewBox="0 0 12 12" fill="none">
          <polyline points="2,6 5,9 10,3" stroke="#0a0e1a" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
        </svg>
      </div>
      <span class="check-label">${s.label}</span>
      <span class="check-time">${pad(s.start[0])}:${pad(s.start[1])}</span>
    `;
    item.addEventListener('click', () => toggleCheck(s.id, item));
    container.appendChild(item);
  });
}

function toggleCheck(id, el) {
  const done = getDoneSet();
  if (done.has(id)) { done.delete(id); el.classList.remove('done'); }
  else { done.add(id); el.classList.add('done'); }
  saveDoneSet(done);

  const pct = Math.round((done.size / SLOTS.length) * 100);
  const week = getWeekData();
  week[todayDateStr()] = pct;
  saveWeekData(week);

  if (pct === 100) checkStreakComplete();
  updateStats(getCurrentSlot());
  buildWeekBars();
}

function checkStreakComplete() {
  const last = getStreakDate();
  const today = todayDateStr();
  if (last === today) return;
  const yesterday = (() => {
    const d = new Date(); d.setDate(d.getDate() - 1);
    return `${d.getFullYear()}-${d.getMonth()}-${d.getDate()}`;
  })();
  const streak = getStreak();
  saveStreak(last === yesterday ? streak + 1 : 1);
  saveStreakDate(today);
  buildStreakBanner();
  updateStats(null);
}

function buildStreakBanner() {
  const el = document.getElementById('streakBanner');
  if (!el) return;
  const streak = getStreak();
  const done = getDoneSet();
  const pct = Math.round((done.size / SLOTS.length) * 100);
  const msgs = [
    'Cada día cuenta. Seguí.', 'La constancia vence al talento.', '¡Imparable!',
    'Modo bestia activado.', 'Sos una máquina. No pares.',
  ];
  el.innerHTML = `
    <div class="s-num">${streak}</div>
    <div class="s-label">días de racha</div>
    <div class="s-msg">${pct === 100 ? msgs[Math.min(streak-1, msgs.length-1)] : `Hoy: ${pct}% completado`}</div>
  `;
}

function resetDay() {
  if (!confirm('¿Reiniciar todos los bloques de hoy?')) return;
  saveDoneSet(new Set());
  const week = getWeekData();
  week[todayDateStr()] = 0;
  saveWeekData(week);
  buildProgress();
  updateStats(getCurrentSlot());
}

// ─── PWA INSTALL ─────────────────────────────────────────────────────────────

let deferredPrompt = null;
window.addEventListener('beforeinstallprompt', e => {
  e.preventDefault();
  deferredPrompt = e;
  const banner = document.getElementById('installBanner');
  if (banner) banner.classList.add('show');
});

function installApp() {
  if (deferredPrompt) {
    deferredPrompt.prompt();
    deferredPrompt.userChoice.then(() => { deferredPrompt = null; });
  }
  const banner = document.getElementById('installBanner');
  if (banner) banner.classList.remove('show');
}

function closeInstall() {
  const banner = document.getElementById('installBanner');
  if (banner) banner.classList.remove('show');
}

// ─── SERVICE WORKER ──────────────────────────────────────────────────────────

if ('serviceWorker' in navigator) {
  window.addEventListener('load', () => {
    navigator.serviceWorker.register('sw.js').catch(() => {});
  });
}

// ─── INIT ────────────────────────────────────────────────────────────────────

function init() {
  const todayIdx = new Date().getDay() - 1;
  currentDay = (todayIdx >= 0 && todayIdx <= 4) ? todayIdx : 0;

  const dayBtns = document.querySelectorAll('.day-btn');
  dayBtns.forEach((b, i) => b.classList.toggle('active', i === currentDay));

  updateClock();
  buildTimeline();
  setQuote();
  updateStats(getCurrentSlot());

  setInterval(() => {
    updateClock();
    buildTimeline();
  }, 10000);

  setInterval(setQuote, 5 * 60 * 1000);
}

document.addEventListener('DOMContentLoaded', init);
