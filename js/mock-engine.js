function stMk(){
    $('pl').disabled=true;$('mkSkp').style.display='none';
    mkDur=au.duration/au.playbackRate;tLim=Math.ceil(mkDur/60);stTmr();
    $('mkSts').innerText="Playing Audio...";
}

function nxtPh(){clearInterval(tmr);started=0;mkPh++;upMkUI()}

function upMkUI(){
    const s=$('mkSts'),k=$('mkSkp');
    if(mkPh===0){s.innerText="Ready to Start";$('mkTr').innerText=fT(au.duration/au.playbackRate);k.style.display='none';$('pl').disabled=false}
    else if(mkPh===2){s.innerText="Gap (10s)";tLim=10/60;k.style.display='block';stTmr()}
    else if(mkPh===3){if($('bp').checked)beeps({aborted:false});s.innerText="Reading Time";tLim=parseInt($('exRT').value);k.style.display='block';stTmr()}
    else if(mkPh===4){if($('bp').checked)beeps({aborted:false});s.innerText="Gap (10s)";tLim=10/60;k.style.display='block';stTmr()}
    else if(mkPh===5){mkPh=6;opTr();tLim=parseInt($('exT').value);stTmr()}
}

function skpPh(){if(mkPh===2||mkPh===3||mkPh===4)nxtPh()}

function exitMk(rs=false){
    exMd='prac';mkPh=0;$('spdCtrls').classList.remove('mock-lock');
    $('wi').disabled=$('ri').disabled=$('ws').disabled=$('rs').disabled=false;
    $('skC').style.pointerEvents='all';$('pb').style.pointerEvents='all';
    $('tx').style.display='block';$('mkT').style.display='none';
    document.body.classList.remove('mk-on');au.pause();is=0;updatePlBtn();
    if(!rs)au.currentTime=0;if(tmr)clearInterval(tmr);started=0;sTm(tLim);svSt();
}