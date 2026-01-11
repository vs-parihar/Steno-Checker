function tN(){isN=!isN;$('nb').classList.toggle('active',isN);uD()}
function resetData(){$('tx').value='';$('stTitle').innerText='No Audio';if(lastAuSrc)URL.revokeObjectURL(lastAuSrc);$('wc').value=0;$('st').innerText='Ready';$('trI').value='';$('resBox').style.display='none';$('rS').innerHTML='';upWC();if(is)au.pause();is=0;updatePlBtn();started=0;if(tmr)clearInterval(tmr);$('tmD').disabled=false;$('tmC').disabled=false}
function openM(){$('md').classList.toggle('active')}
function setP(v){const[min,max]=v.split('-');uSl('min',min);uSl('max',max==='max'?maxW:max)}
function uSl(t,v){let val=parseInt(v)||0;if(t==='min'){$('wMin').value=val;$('slMi').value=val}else{$('wMax').value=val;$('slMa').value=val}renL()}
function adj(k,v){if(k==='sc'){curS=Math.max(0.5,Math.min(1.5,curS+v));document.documentElement.style.setProperty('--sc',curS)}else{curT=Math.max(10,Math.min(48,curT+v));document.documentElement.style.setProperty('--ts',curT+'px')}}
function tTh(){document.body.classList.toggle('light-mode');let c=document.body.classList.contains('light-mode');document.querySelectorAll('.th-chk').forEach(x=>x.checked=c);svSt()}
function opTr(){if(!$('tx').value.trim())return;if(is){au.pause();is=0;updatePlBtn()}$('trM').classList.add('active');$('trV').style.display='flex';$('rsV').style.display='none';$('trI').value='';$('trI').focus();$('trTi').textContent=$('stTitle').textContent;if(tLim>0)$('tmD').value=tLim}

async function lG(u){let list=[];try{for(let r of(u?[regs.find(x=>x.u===u)]:regs)){const res=await fetch(`https://gist.githubusercontent.com/vs-parihar/${r.u}/raw?t=${Date.now()}`);const j=await res.json();if(Array.isArray(j))list=list.concat(j.map(i=>({...i,reg:r.t})))}}catch(e){}lD(list);renT();renL()}
function lD(list){maxW=0;curL=list.map((i,idx)=>{let m=i.title.match(/WORDS\s*(\d+)/i),w=i.w||[],b=Math.max(...w,m?parseInt(m[1]):0);if(b>maxW)maxW=b;return{...i,_id:idx,maxW:b,tags:(i.tags||[]).map(t=>t.toUpperCase())}});$('slMi').max=$('slMi').value=$('slMa').max=$('slMa').value=maxW;uSl('min',0);uSl('max',maxW)}
function renT(){const t=$('tags'),set=new Set();curL.forEach(i=>i.tags.forEach(g=>set.add(g)));t.innerHTML='';Array.from(set).sort().forEach(g=>{let s=document.createElement('span');s.className='filter-chip';s.textContent=g;s.onclick=()=>{s.classList.toggle('active');renL()};t.appendChild(s)})}
function renL(){const mi=parseInt($('wMin').value)||0,ma=parseInt($('wMax').value)||maxW,at=Array.from(document.querySelectorAll('.filter-chip.active')).map(x=>x.textContent),so=$('srt').value,sq=$('libS').value.toLowerCase(),wm=$('wcM').value,map=[1,0,2];
filtL=curL.filter(i=>{const v=i.maxW||0;return(v>=mi&&v<=ma)&&(at.length===0||at.every(t=>i.tags.includes(t)))&&(!sq||i.title.toLowerCase().includes(sq))});if(so==='on')filtL.sort((a,b)=>a._id-b._id);if(so==='no')filtL.sort((a,b)=>b._id-a._id);if(so==='az')filtL.sort((a,b)=>a.title.localeCompare(b.title));$('ls').innerHTML='';
filtL.forEach((i,idx)=>{let d=document.createElement('div');d.className='list-item';d.id='row-'+idx;let id=i.url?.split('details/')[1],hc=hist[id]?` <b style="color:var(--gr)">(${hist[id]})</b>`:'';
let wc=i.w?i.w[map[wm]]:i.maxW;d.innerHTML=`<div style="font-weight:500">${i.title}</div><div style="font-size:9px;opacity:0.7">${wc} words • ${fT(i.dur||0)}${hc}</div>`;d.onclick=()=>lA(i,idx);$('ls').appendChild(d)})}

async function lA(i,idx){curI=idx;curO=i;$('md').classList.remove('active');$('tx').value="Loading...";const wm=$('wcM').value,map=[1,0,2],v=i.w?i.w[map[wm]]:i.maxW;if(v){$('wc').value=v;$('st').innerText='W: '+v;if(i.dur){$('wi').value=(fixW>0?fixW:(v/(i.dur/60)).toFixed(2));$('ri').value="1.0000";}}const id=i.url?.split('details/')[1],dl=`https://archive.org/download/${id}/`;let auSrc=i.audio;try{if(id){const mr=await fetch(`https://archive.org/metadata/${id}`),md=await mr.json(),fs=md.files||[];const mf=fs.find(f=>f.name.endsWith('.mp3')),of=fs.find(f=>f.name.match(/\.(wav|m4a|ogg|aac)$/i)),tf=fs.find(f=>f.name.endsWith('.txt')||f.name.endsWith('.md'));if(mf)auSrc=dl+mf.name;else if(of)auSrc=dl+of.name;if(i.matter){const r=await fetch(i.matter);$('tx').value=await r.text()}else if(tf){const r=await fetch(dl+tf.name);$('tx').value=await r.text()}else{$('tx').value=md.metadata.description?.replace(/<[^>]*>?/gm,'')||"No text"}}}catch(e){if(!i.matter)$('tx').value="Text Load Fail"}au.src=auSrc;au.load();$('stTitle').innerText=i.title;upWC();svSt()}

async function expA(){const b=$('exB'),r=parseFloat($('ri').value);b.innerText='⌛';
if($('tx').value){const tb=new Blob([$('tx').value],{type:'text/plain'}),ta=document.createElement('a');ta.href=URL.createObjectURL(tb);ta.download='Transcription.txt';ta.click()}
if(r===1.0){const a=document.createElement('a');a.href=au.src;a.download='Audio.mp3';a.click();b.innerText='⬇️';return}
try{const res=await fetch(au.src),buf=await res.arrayBuffer(),ctx=new OfflineAudioContext(2,buf.byteLength/r,44100),sBuf=await ctx.decodeAudioData(buf),src=ctx.createBufferSource();src.buffer=sBuf;src.playbackRate.value=r;src.connect(ctx.destination);src.start();const ren=await ctx.startRendering(),blob=new Blob([toWav(ren)],{type:'audio/wav'}),name=`WPM${Math.round($('wi').value)}`;const a=document.createElement('a');a.href=URL.createObjectURL(blob);a.download=name+'.wav';a.click()}catch(e){}finally{b.innerText='⬇️'}}

function toWav(b){let n=b.numberOfChannels,len=b.length*n*2+44,buf=new ArrayBuffer(len),v=new DataView(buf),pos=44;const s=(st,s)=>{for(let i=0;i<s.length;i++)v.setUint8(st+i,s.charCodeAt(i))};s(0,'RIFF');v.setUint32(4,len-8,true);s(8,'WAVE');s(12,'fmt ');v.setUint32(16,16,true);v.setUint16(20,1,true);v.setUint16(22,n,true);v.setUint32(24,b.sampleRate,true);v.setUint32(28,b.sampleRate*n*2,true);v.setUint16(32,n*2,true);v.setUint16(34,16,true);s(36,'data');v.setUint32(40,len-44,true);for(let i=0;i<b.length;i++)for(let c=0;c<n;c++){let x=Math.max(-1,Math.min(1,b.getChannelData(c)[i]));v.setInt16(pos,x<0?x*0x8000:x*0x7FFF,true);pos+=2}return buf}
function stepTrk(n){if(!filtL.length){if(curL.length)filtL=curL;else return}let l=filtL.length;if(!l)return;let x=curI+n;if(x>=0&&x<l)lA(filtL[x],x)}

function init(){
    regs.forEach(r=>{let o=document.createElement('option');o.value=r.u;o.textContent=r.t;$('rg').appendChild(o)});
    [40,50,60,80,90,100,120,140,160,180,200].forEach(v=>{let o=document.createElement('option');o.value=v;o.textContent=v;$('ws').appendChild(o)});
    [0.8,1,1.2,1.5].forEach(v=>{let o=document.createElement('option');o.value=v;o.textContent=v;$('rs').appendChild(o)});
    $('rg').onchange=e=>lG(e.target.value);
    $('f').onchange=async e=>{resetData();for(const f of Array.from(e.target.files)){if(f.type.includes('audio')){lastAuSrc=URL.createObjectURL(f);au.src=lastAuSrc;$('stTitle').innerText=f.name}else if(f.name.match(/\.(txt|md)$/i)||f.type.includes('text')){$('tx').value=await f.text();upWC(true)}}};
    lG(null);
    const cH=document.querySelector('.ctrl-grp').innerHTML;
    $('mdC').innerHTML=cH;
    $('trC').innerHTML=cH;
    ldSt();
    const g=$('exC');
    ets.forEach((t,i)=>{const d=document.createElement('div');d.className=`eg-i ${i>3?'hd-err':''}`;d.innerHTML=`<label>${t}</label><select id="c-${t.replace(/[ /]/g,'_')}"><option value="H">H</option><option value="S" ${['Substitution','Missing','Insertion'].includes(t)?'selected':''}>S</option><option value="D">D</option><option value="X" ${t.includes('Space')?'selected':''}>X</option></select>`;g.appendChild(d)});
    g.innerHTML+='<div class="more-tg" onclick="document.querySelectorAll(\'.hd-err\').forEach(e=>e.classList.toggle(\'show\'))">Show More/Less</div>';
    upWC();
}

window.onload = init;