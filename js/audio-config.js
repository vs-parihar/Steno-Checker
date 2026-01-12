function upV(){if(gn)gn.gain.value=$('vl').value*0.5}
function sk(s){if(exMd==='mock')return;au.currentTime+=s*(parseFloat($('ri').value)||1)}
function dS(k,v){if(!v)return;if(k==='w')$('wi').value=v;else $('ri').value=v}
function adW(d){$('wi').value=(parseFloat($('wi').value||0)+d).toFixed(2);sync('w')}
function adR(d){$('ri').value=(parseFloat($('ri').value||1)+d).toFixed(4);sync('r')}

function sync(s){
    if(exMd==='mock'&&fixW>0)return;
    const w=parseFloat($('wc').value),m=au.duration/60;
    if(!m||!w)return;
    if(s==='w'){$('ri').value=(parseFloat($('wi').value)/(w/m)).toFixed(4);au.playbackRate=Math.max(0.1,parseFloat($('ri').value))}
    else{const wpm=((w/m)*parseFloat($('ri').value));$('wi').value=wpm.toFixed(2);au.playbackRate=Math.max(0.1,parseFloat($('ri').value))}
    const sel=$('ws'),val=$('wi').value,opts=Array.from(sel.options).map(o=>o.value);
    if(!opts.includes(val)){let o=document.createElement('option');o.value=val;o.text=Math.round(val);sel.add(o);sel.value=val}
    const rSel=$('rs'),rVal=$('ri').value,rOpts=Array.from(rSel.options).map(o=>o.value);
    if(!rOpts.includes(rVal)){let o=document.createElement('option');o.value=rVal;o.text=rVal;rSel.add(o);rSel.value=rVal}
    updateStatus();svSt()
}