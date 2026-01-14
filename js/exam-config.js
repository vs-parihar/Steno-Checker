const ePre={def:{t:10,r:5,w:80,e:{}},ssc_c_eng:{t:10,r:5,w:100,e:{"Major Punctuation":"H","Comma":"H","Capitalisation":"H"}},ssc_c_hin:{t:10,r:5,w:100,e:{"Major Punctuation":"F","Comma":"F"}},ssc_d_eng:{t:10,r:5,w:80,e:{"Major Punctuation":"H"}},ssc_d_hin:{t:10,r:5,w:80,e:{}},hc:{t:40,r:10,w:120,e:{}}};

function ldEx(v){
    const p=ePre[v]||ePre.def;
    $('exT').value=p.t;$('exRT').value=p.r;$('exW').value=p.w;
    ets.forEach(t=>{
        let k=t.replace(/[ /+]/g,'_');
        $(`c-${k}`).value=p.e[t]||(t.includes('Space')||t.includes('Punc')?'X':'S')
    });
}

function svEx(t){
    tLim=parseInt($('exT').value);sTm(tLim);fixW=parseInt($('exW').value);exMd=$('exMode').value;
    $('exM').classList.remove('active');exNext=false;
    if(t==='off'){$('f').click();exNext=true}
    else if(t==='lnk'){opLnk();exNext=true}
    else if(t==='lib'){openM();exNext=true}
    else stEx();
}

function stEx(frc=false){
    const audio = document.getElementById('au');
    if(!frc&&(!audio.src||audio.src=='')){msg("Load audio first");return}
    const dC=exMd==='mock';$('spdCtrls').classList.toggle('mock-lock',dC);
    $('wi').disabled=dC;$('ri').disabled=dC;$('ws').disabled=dC;$('rs').disabled=dC;
    $('skC').style.pointerEvents=dC?'none':'all';$('pb').style.pointerEvents=dC?'none':'all';
    $('tx').style.display=dC?'none':'block';$('mkT').style.display=dC?'flex':'none';
    document.body.classList.toggle('mk-on',dC);
    if(dC){
        if(!$('wc').value||$('wc').value==0){msg("Enter word count", (v)=>{$('wc').value=v;upWC();stEx(true)},true);return}
        const w=parseFloat($('wc').value),fw=parseInt($('exW').value),m=audio.duration/60;
        if(w&&m){$('wi').value=fw;$('ri').value=(fw/(w/m)).toFixed(4);audio.playbackRate=parseFloat($('ri').value);updateStatus()}
        mkPh=0;upMkUI();
    }
    exNext=false;svSt();
}