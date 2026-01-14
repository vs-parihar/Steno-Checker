function stMk(){
    const audio = document.getElementById('au');
    $('pl').disabled=true;$('mkSkp').style.display='none';
    mkDur=audio.duration/audio.playbackRate;tLim=Math.ceil(mkDur/60);
    stTmr();$('mkSts').innerText="Playing Audio...";
}
function nxtPh(){clearInterval(tmr);started=0;mkPh++;upMkUI()}
function upMkUI(){
    const audio = document.getElementById('au');
    const s=$('mkSts'),k=$('mkSkp');
    if(mkPh===0){s.innerText="Ready to Start";$('mkTr').innerText=fT(audio.duration/audio.playbackRate);k.style.display='none';$('pl').disabled=false}
    else if(mkPh===1){/*Playing*/}
    else if(mkPh===2){s.innerText="Gap (10s)";tLim=10/60;k.style.display='block';stTmr()}
    else if(mkPh===3){if($('bp').checked)beeps({aborted:false});s.innerText="Reading Time";tLim=parseInt($('exRT').value);k.style.display='block';stTmr()}
    else if(mkPh===4){if($('bp').checked)beeps({aborted:false});s.innerText="Gap (10s)";tLim=10/60;k.style.display='block';stTmr()}
    else if(mkPh===5){mkPh=6;opTr();tLim=parseInt($('exT').value);stTmr()}
}
function skpPh(){if(mkPh===2||mkPh===3||mkPh===4)nxtPh()}
function exitMk(){
    const audio = document.getElementById('au');
    exMd='prac';mkPh=0;$('spdCtrls').classList.remove('mock-lock');
    $('wi').disabled=false;$('ri').disabled=false;$('ws').disabled=false;$('rs').disabled=false;
    $('skC').style.pointerEvents='all';$('pb').style.pointerEvents='all';
    $('tx').style.display='block';$('mkT').style.display='none';
    document.body.classList.remove('mk-on');audio.pause();is=0;updatePlBtn();
    audio.currentTime=0;if(tmr)clearInterval(tmr);started=0;sTm(tLim);svSt();
}