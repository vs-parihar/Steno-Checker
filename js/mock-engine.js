function stTmr(){
    if(started)return;started=1;$('tmD').disabled=true;$('tmC').disabled=true;tS=Date.now()-(tEl?tEl*1000:0);
    tmr=setInterval(()=>{
        tEl=Math.floor((Date.now()-tS)/1000);let r=tLim?tLim*60-tEl:tEl;svSt();
        if(tLim&&r<=0){clearInterval(tmr);check();return}
        let m=Math.floor(r/60),s=r%60;const elP=tLim?((tLim*60-r)/(tLim*60))*100:0;const cl=elP>95?'tm-re':(elP>75?'tm-or':(elP>50?'tm-ye':'tm-gr'));
        $('tmR').className=cl;$('tmR').textContent=`${m}:${s<10?'0':''}${s}`;
        if(exMd==='mock')$('mkTr').textContent=$('tmR').textContent
    },1000)
}
function exitMk(){exMd='prac';$('spdCtrls').classList.remove('mock-lock');$('wi').disabled=false;$('ri').disabled=false;$('ws').disabled=false;$('rs').disabled=false;$('skC').style.pointerEvents='all';$('pb').style.pointerEvents='all';$('tx').style.display='block';$('mkT').style.display='none';au.pause();is=0;updatePlBtn();au.currentTime=0;if(tmr)clearInterval(tmr);started=0;sTm(tLim);svSt()}