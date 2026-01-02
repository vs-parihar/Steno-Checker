const $ = (i) => document.getElementById(i);
const au = $('au');
let curL = [], filtL = [], curI = -1, curO = {}, curS = 1, curT = 14, maxW = 0, lastAuSrc = null, fixW = 0;

function resetData() {
    $('tx').value = ''; $('stTitle').innerText = 'No Audio'; if (lastAuSrc) URL.revokeObjectURL(lastAuSrc);
    $('wc').value = 0; $('st').innerText = 'Ready'; $('trI').value = ''; $('resBox').style.display = 'none';
    $('rS').innerHTML = ''; upWC(); if (is) au.pause(); is = 0; updatePlBtn(); started = 0;
    if (tmr) clearInterval(tmr); $('tmD').disabled = false; $('tmC').disabled = false;
}

function upWC(f = false) {
    const t = $('tx').value.trim(), m = $('wcM').value; let w = 0;
    if (m == 0) w = t ? t.split(/\s+/).length : 0;
    else if (m == 1) w = Math.ceil(t.length / 5);
    else {
        const p = t.replace(/([।?.,!@#;()"'\[\]{}-])/g, ' $1 ').split(/\s+/).filter(x => x);
        p.forEach(x => { if (x.match(/^[,\u0964;]$/)) w += 0.5; else if (x.match(/^[.?!।]$/)) w += 1; else if (!x.match(/^[।?.,!@#;()"'\[\]{}-]$/)) w += 1; });
    }
    $('wc').value = w; updateStatus();
}

function updateStatus() { $('stWPM').textContent = $('wi').value + ' WPM'; $('stRate').textContent = $('ri').value + 'x'; $('stWC').textContent = $('wc').value + ' W'; }

function init() {
    regs.forEach(r => { let o = document.createElement('option'); o.value = r.u; o.textContent = r.t; $('rg').appendChild(o); });
    [40, 50, 60, 80, 90, 100, 120, 140, 160, 180, 200].forEach(v => { let o = document.createElement('option'); o.value = v; o.textContent = v; $('ws').appendChild(o); });
    [0.8, 1, 1.2, 1.5].forEach(v => { let o = document.createElement('option'); o.value = v; o.textContent = v; $('rs').appendChild(o); });
    $('rg').onchange = e => lG(e.target.value);
    $('f').onchange = async e => {
        resetData();
        for (const f of Array.from(e.target.files)) {
            if (f.type.includes('audio')) { lastAuSrc = URL.createObjectURL(f); au.src = lastAuSrc; $('stTitle').innerText = f.name; }
            else if (f.name.match(/\.(txt|md)$/i) || f.type.includes('text')) { $('tx').value = await f.text(); upWC(true); }
        }
    };
    lG(null); const cH = document.querySelector('.ctrl-grp').innerHTML; $('mdC').innerHTML = cH; $('trC').innerHTML = cH;
    const g = $('exC'); ets.forEach((t, i) => {
        const d = document.createElement('div'); d.className = `eg-i ${i > 3 ? 'hd-err' : ''}`;
        d.innerHTML = `<label>${t}</label><select id="c-${t.replace(/[ /]/g, '_')}"><option value="H">H</option><option value="S" ${['Substitution', 'Missing', 'Insertion'].includes(t) ? 'selected' : ''}>S</option><option value="D">D</option><option value="X" ${t.includes('Space') ? 'selected' : ''}>X</option></select>`;
        g.appendChild(d);
    });
    g.innerHTML += '<div class="more-tg" onclick="document.querySelectorAll(\'.hd-err\').forEach(e=>e.classList.toggle(\'show\'))">Show More/Less</div>';
    updatePlBtn();
}

function setP(v) { const [min, max] = v.split('-'); uSl('min', min); uSl('max', max === 'max' ? maxW : max); }
function uSl(t, v) { let val = parseInt(v) || 0; if (t === 'min') { $('wMin').value = val; $('slMi').value = val; } else { $('wMax').value = val; $('slMa').value = val; } renL(); }
function adj(k, v) { if (k === 'sc') { curS = Math.max(0.5, Math.min(1.5, curS + v)); document.documentElement.style.setProperty('--sc', curS); } else { curT = Math.max(10, Math.min(48, curT + v)); document.documentElement.style.setProperty('--ts', curT + 'px'); } }
function openM() { $('md').classList.toggle('active'); }

async function lG(u) {
    let list = []; try { for (let r of (u ? [regs.find(x => x.u === u)] : regs)) { const res = await fetch(`https://gist.githubusercontent.com/vs-parihar/${r.u}/raw?t=${Date.now()}`); const j = await res.json(); if (Array.isArray(j)) list = list.concat(j.map(i => ({ ...i, reg: r.t }))); } } catch (e) { }
    lD(list); renT(); renL();
}

function lD(list) {
    maxW = 0; curL = list.map((i, idx) => { let m = i.title.match(/WORDS\s*(\d+)/i), w = i.w || [], b = Math.max(...w, m ? parseInt(m[1]) : 0); if (b > maxW) maxW = b; return { ...i, _id: idx, maxW: b, tags: (i.tags || []).map(t => t.toUpperCase()) }; });
    $('slMi').max = $('slMi').value = $('slMa').max = $('slMa').value = maxW; uSl('min', 0); uSl('max', maxW);
}

function renT() { const t = $('tags'), set = new Set(); curL.forEach(i => i.tags.forEach(g => set.add(g))); t.innerHTML = ''; Array.from(set).sort().forEach(g => { let s = document.createElement('span'); s.className = 'filter-chip'; s.textContent = g; s.onclick = () => { s.classList.toggle('active'); renL(); }; t.appendChild(s); }); }
function renL() {
    const mi = parseInt($('wMin').value) || 0, ma = parseInt($('wMax').value) || maxW, at = Array.from(document.querySelectorAll('.filter-chip.active')).map(x => x.textContent), so = $('srt').value, sq = $('libS').value.toLowerCase();
    filtL = curL.filter(i => { const v = i.maxW || 0; return (v >= mi && v <= ma) && (at.length === 0 || at.every(t => i.tags.includes(t))) && (!sq || i.title.toLowerCase().includes(sq)); });
    if (so === 'on') filtL.sort((a, b) => a._id - b._id); if (so === 'no') filtL.sort((a, b) => b._id - a._id); if (so === 'az') filtL.sort((a, b) => a.title.localeCompare(b.title));
    $('ls').innerHTML = ''; filtL.forEach((i, idx) => { let d = document.createElement('div'); d.className = 'list-item'; d.id = 'row-' + idx; d.innerHTML = `<div style="font-weight:500">${i.title}</div><div style="font-size:9px;opacity:0.7">${i.maxW} words • ${fT(i.dur || 0)}</div>`; d.onclick = () => lA(i, idx); $('ls').appendChild(d); });
}

async function lA(i, idx) {
    curI = idx; curO = i; $('md').classList.remove('active'); $('tx').value = "Loading..."; const v = i.maxW; if (v) { $('wc').value = v; $('st').innerText = 'W: ' + v; if (i.dur) { $('wi').value = (fixW > 0 ? fixW : (v / (i.dur / 60)).toFixed(2)); $('ri').value = "1.0000"; } }
    const id = i.url?.split('details/')[1], dl = `https://archive.org/download/${id}/`; let auSrc = i.audio;
    try {
        if (id) {
            const mr = await fetch(`https://archive.org/metadata/${id}`), md = await mr.json(), fs = md.files || [];
            const mf = fs.find(f => f.name.endsWith('.mp3')), of = fs.find(f => f.name.match(/\.(wav|m4a|ogg|aac)$/i)), tf = fs.find(f => f.name.endsWith('.txt') || f.name.endsWith('.md'));
            if (mf) auSrc = dl + mf.name; else if (of) auSrc = dl + of.name;
            if (i.matter) { const r = await fetch(i.matter); $('tx').value = await r.text(); } else if (tf) { const r = await fetch(dl + tf.name); $('tx').value = await r.text(); } else { $('tx').value = md.metadata.description?.replace(/<[^>]*>?/gm, '') || "No text"; }
        }
    } catch (e) { if (!i.matter) $('tx').value = "Text Load Fail"; }
    au.src = auSrc; au.load(); $('stTitle').innerText = i.title; upWC();
}

function sync(s) {
    if (exMd === 'mock' && fixW > 0) return; const w = parseFloat($('wc').value), m = au.duration / 60; if (!m || !w) return;
    if (s === 'w') { $('ri').value = (parseFloat($('wi').value) / (w / m)).toFixed(4); au.playbackRate = Math.max(0.1, parseFloat($('ri').value)); }
    else { const wpm = ((w / m) * parseFloat($('ri').value)); $('wi').value = wpm.toFixed(2); au.playbackRate = Math.max(0.1, parseFloat($('ri').value)); }
    updateStatus();
}

function dS(k, v) { if (!v) return; if (k === 'w') $('wi').value = v; else $('ri').value = v; }
function adW(d) { $('wi').value = (parseFloat($('wi').value || 0) + d).toFixed(2); sync('w'); }
function adR(d) { $('ri').value = (parseFloat($('ri').value || 1) + d).toFixed(4); sync('r'); }
$('wi').oninput = () => sync('w'); $('ri').oninput = () => sync('r');
au.onloadedmetadata = () => { if (fixW > 0) { const w = parseFloat($('wc').value), m = au.duration / 60; if (w && m) { $('wi').value = fixW; $('ri').value = (fixW / (w / m)).toFixed(4); au.playbackRate = parseFloat($('ri').value); updateStatus(); } } else sync('r'); };
au.ontimeupdate = () => { if (!au.duration) return; const d = au.duration, c = au.currentTime, p = (c / d) * 100, w = parseFloat($('wi').value) || 150, relP = Math.min(100, Math.max(0, c - ((20 / w) * 60)) / (d - ((40 / w) * 60)) * 100); $('pf').style.width = p + '%'; $('tm').textContent = `${fT(c / au.playbackRate)}/${fT(d / au.playbackRate)}`; if ($('as').checked) { const m = $('tx').scrollHeight - $('tx').clientHeight; $('tx').scrollTop = (relP / 100) * m; } };
function fT(s) { const m = Math.floor(s / 60), x = Math.floor(s % 60); return `${m}:${x < 10 ? '0' : ''}${x}`; }
$('pb').onclick = e => { const r = $('pb').getBoundingClientRect(); au.currentTime = ((e.clientX - r.left) / r.width) * au.duration; };
function opTr() { if (!$('tx').value.trim()) return; if (is) { au.pause(); is = 0; updatePlBtn(); } $('trM').classList.add('active'); $('trV').style.display = 'flex'; $('rsV').style.display = 'none'; $('trI').value = ''; $('trI').focus(); if (tLim > 0) $('tmD').value = tLim; }
function tTh() { document.body.classList.toggle('light-mode'); let c = document.body.classList.contains('light-mode'); document.querySelectorAll('.th-chk').forEach(x => x.checked = c); }
function stepTrk(n) { if (!filtL.length) { if (curL.length) filtL = curL; else return; } let l = filtL.length; if (!l) return; let x = curI + n; if (x >= 0 && x < l) lA(filtL[x], x); }
window.onload = init;