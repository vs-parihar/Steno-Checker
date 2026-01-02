let exMd = 'prac';
const ets = ["Spelling", "Substitution", "Missing", "Insertion", "Split/Join", "Pluralisation", "Punc Missing", "Punc Insertion", "Missing Space", "Extra Space", "Hyphen Error", "Case Error", "Para Error", "Symbol Error"];
const ePre = {
    def: { t: 10, w: 80, e: {} },
    ssc_c_eng: { t: 10, w: 100, e: { "Punc Missing": "H", "Punc Insertion": "H", "Case Error": "H" } },
    ssc_c_hin: { t: 10, w: 100, e: { "Punc Missing": "F", "Punc Insertion": "F" } },
    ssc_d_eng: { t: 10, w: 80, e: { "Punc Missing": "H" } },
    ssc_d_hin: { t: 10, w: 80, e: {} },
    hc: { t: 40, w: 120, e: {} }
};

function ldEx(v) {
    const p = ePre[v] || ePre.def;
    $('exT').value = p.t; $('exW').value = p.w;
    ets.forEach(t => { let k = t.replace(/[ /]/g, '_'); $(`c-${k}`).value = p.e[t] || (t.includes('Space') || t.includes('Punc') ? 'X' : 'S'); });
}

function svEx(l) {
    $('exM').classList.remove('active'); tLim = parseInt($('exT').value); sTm(tLim); fixW = parseInt($('exW').value); exMd = $('exMode').value;
    const dC = exMd === 'mock'; $('spdCtrls').classList.toggle('mock-lock', dC); $('wi').disabled = dC; $('ri').disabled = dC; $('ws').disabled = dC; $('rs').disabled = dC;
    if (l) openM(); else $('f').click();
}