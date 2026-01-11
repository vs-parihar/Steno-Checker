function upV(){if(gn)gn.gain.value=$('vl').value*0.5}
function sync(s){if(exMd==='mock'&&fixW>0)return;const w=parseFloat($('wc').value),m=au.duration/60;if(!m||!w)return;if(s==='w'){$('ri').value=(parseFloat($('wi').value)/(w/m)).toFixed(4);au.playbackRate=Math.max(0.1,parseFloat($('ri').value))}else{const wpm=((w/m)*parseFloat($('ri').value));$('wi').value=wpm.toFixed(2);au.playbackRate=Math.max(0.1,parseFloat($('ri').value))}updateStatus();svSt()}
function dS(k,v){if(!v)return;if(k==='w')$('wi').value=v;else $('ri').value=v}
function adW(d){$('wi').value=(parseFloat($('wi').value||0)+d).toFixed(2);sync('w')}
function adR(d){$('ri').value=(parseFloat($('ri').value||1)+d).toFixed(4);sync('r')}

$('wi').oninput=()=>sync('w');
$('ri').oninput=()=>sync('r');
au.onloadedmetadata=()=>{if(fixW>0){const w=parseFloat($('wc').value),m=au.duration/60;if(w&&m){$('wi').value=fixW;$('ri').value=(fixW/(w/m)).toFixed(4);au.playbackRate=parseFloat($('ri').value);updateStatus()}}else sync('r')}

function updatePlBtn(){$('pl').innerHTML=is?'<svg viewBox="0 0 24 24"><path d="M6 19h4V5H6v14zm8-14v14h4V5h-4z"/></svg>':'<svg viewBox="0 0 24 24"><path d="M8 5v14l11-7z"/></svg>';if(is)$('pl').classList.add('pausing');else $('pl').classList.remove('pausing')}
$('pl').onclick=async()=>{if($('pl').disabled)return;if(exMd==='mock'&&is){msg("Exit Exam?",'exitMk');return}if(!ac){ac=new (window.AudioContext||window.webkitAudioContext)();sr=ac.createMediaElementSource(au);gn=ac.createGain();sr.connect(gn);gn.connect(ac.destination);upV()}if(is){au.pause();is=0}else{if($('bp').checked&&au.currentTime<0.5){$('pl').disabled=true;bpAb=new AbortController();try{await beeps(bpAb.signal)}catch(e){$('pl').disabled=false;return}$('pl').disabled=false}if(ac.state==='suspended')await ac.resume();au.play();is=1}updatePlBtn()};
$('sb').onclick=async()=>{if(bpAb)bpAb.abort();au.pause();au.currentTime=0;is=0;updatePlBtn();$('pl').disabled=false};
async function beeps(s){const gv=$('vl').value*0.5;for(let i=0;i<5;i++){if(s.aborted)return;const o=ac.createOscillator(),g=ac.createGain();o.type='sine';o.connect(g);g.connect(ac.destination);g.gain.value=gv;o.frequency.value=i===4?880:440;o.start();o.stop(ac.currentTime+(i===4?0.5:0.1));await new Promise(r=>setTimeout(r,1000))}}
function sk(s){if(exMd==='mock')return;au.currentTime+=s*(parseFloat($('ri').value)||1)}
au.ontimeupdate=()=>{if(!au.duration)return;const d=au.duration,c=au.currentTime,p=(c/d)*100,w=parseFloat($('wi').value)||150,relP=Math.min(100,Math.max(0,c-((20/w)*60))/(d-((40/w)*60))*100);$('pf').style.width=p+'%';$('tm').textContent=`${fT(c/au.playbackRate)}/${fT(d/au.playbackRate)}`;if($('as').checked){const m=$('tx').scrollHeight-$('tx').clientHeight;$('tx').scrollTop=(relP/100)*m}
if(c/d>0.8&&curO.url){let id=curO.url.split('details/')[1];if(!hist[id])hist[id]=0;hist[id]++;localStorage.setItem('hist',JSON.stringify(hist))}};
function fT(s){const m=Math.floor(s/60),x=Math.floor(s%60);return`${m}:${x<10?'0':''}${x}`}
$('pb').onclick=e=>{if(exMd==='mock')return;const r=$('pb').getBoundingClientRect();au.currentTime=((e.clientX-r.left)/r.width)*au.duration};