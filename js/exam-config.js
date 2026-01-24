const ePre={
def:{n:"Default",t:10,r:5,w:80,e:{SP:"H",MI:"S",SB:"S",IN:"S",PL:"H",SJ:"H",MP:"H",CM:"X",mn:"X",wj:"H",CP:"H",YS:"X",PR:"X",TR:"S",ES:"X",RP:"S",PN:"X"}},
ssc_c_eng:{n:"SSC C (Eng)",t:10,r:5,w:100,e:{SP:"H",MI:"S",SB:"S",IN:"S",PL:"H",SJ:"H",MP:"H",CM:"X",mn:"X",wj:"H",CP:"H",YS:"X",PR:"X",TR:"S",ES:"X",RP:"S",PN:"X"}},
ssc_c_hin:{n:"SSC C (Hin)",t:10,r:5,w:100,e:{SP:"H",MI:"S",SB:"S",IN:"S",PL:"H",SJ:"H",MP:"H",CM:"X",mn:"X",wj:"H",CP:"H",YS:"X",PR:"X",TR:"S",ES:"X",RP:"S",PN:"X"}},
ssc_d_eng:{n:"SSC D (Eng)",t:10,r:5,w:80,e:{SP:"H",MI:"S",SB:"S",IN:"S",PL:"H",SJ:"H",MP:"H",CM:"X",mn:"X",wj:"H",CP:"H",YS:"X",PR:"X",TR:"S",ES:"X",RP:"S",PN:"X"}},
ssc_d_hin:{n:"SSC D (Hin)",t:10,r:5,w:80,e:{SP:"H",MI:"S",SB:"S",IN:"S",PL:"H",SJ:"H",MP:"H",CM:"X",mn:"X",wj:"H",CP:"H",YS:"X",PR:"X",TR:"S",ES:"X",RP:"S",PN:"X"}},
hc:{n:"High Court",t:40,r:10,w:120,e:{SP:"H",MI:"S",SB:"S",IN:"S",PL:"H",SJ:"H",MP:"H",CM:"X",mn:"X",wj:"H",CP:"H",YS:"X",PR:"X",TR:"S",ES:"X",RP:"S",PN:"X"}},
cus:{n:"Custom",t:10,r:5,w:80,e:{SP:"H",MI:"S",SB:"S",IN:"S",PL:"H",SJ:"H",MP:"H",CM:"X",mn:"X",wj:"H",CP:"H",YS:"X",PR:"X",TR:"S",ES:"X",RP:"S",PN:"X"}}
};
function ldEx(v){const p=ePre[v]||ePre.def;$('exT').value=p.t;$('exRT').value=p.r;$('exW').value=p.w;
Object.keys(EM).forEach(k=>{let d='S';if(EM[k].includes('Space')||EM[k].includes('Punc'))d='X';$(`c-${k}`).value=p.e[k]||d})}
function svEx(t){tLim=parseInt($('exT').value);sTm(tLim);fixW=parseInt($('exW').value);exMd=$('exMode').value;
const exP=$('exP');if(exP.value!=='cus'&&$('exMode').value==='mock'){let cP=ePre.cus;cP.t=$('exT').value;cP.r=$('exRT').value;cP.w=$('exW').value;Object.keys(EM).forEach(k=>cP.e[k]=$(`c-${k}`).value);exP.value='cus'}
$('exM').classList.remove('active');exNext=false;if(t==='off'){$('f').click();exNext=true}else if(t==='lnk'){opLnk();exNext=true}else if(t==='lib'){openM();exNext=true}else stEx()}
function stEx(frc=false){if(!frc&&(!au.src||au.src=='')){msg("Load audio first");return}const dC=exMd==='mock';$('spdCtrls').classList.toggle('mock-lock',dC);$('wi').disabled=dC;$('ri').disabled=dC;$('ws').disabled=dC;$('rs').disabled=dC;$('skC').style.pointerEvents=dC?'none':'all';$('pb').style.pointerEvents=dC?'none':'all';$('tx').style.display=dC?'none':'block';$('mkT').style.display=dC?'flex':'none';document.body.classList.toggle('mk-on',dC);
if(dC){if(!$('wc').value||$('wc').value==0){msg("Enter word count", (v)=>{$('wc').value=v;upWC();stEx(true)},true);return}const w=parseFloat($('wc').value),fw=parseInt($('exW').value),m=au.duration/60;if(w&&m){$('wi').value=fw;$('ri').value=(fw/(w/m)).toFixed(4);au.playbackRate=parseFloat($('ri').value);updateStatus()}mkPh=0;upMkUI()}exNext=false;svSt()}
function opTr(){if(is){au.pause();is=0;updatePlBtn()}$('trM').classList.add('active');$('trV').style.display='flex';$('rsV').style.display='none';$('trI').value=$('trI').value||'';$('trI').focus();$('trTi').textContent=$('stTitle').textContent;if(tLim>0)$('tmD').value=tLim;svSt()}