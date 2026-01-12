async function beeps(s){const gv=$('vl').value*0.5;for(let i=0;i<5;i++){if(s.aborted)return;const o=ac.createOscillator(),g=ac.createGain();o.type='sine';o.connect(g);g.connect(ac.destination);g.gain.value=gv;o.frequency.value=i===4?880:440;o.start();o.stop(ac.currentTime+(i===4?0.5:0.1));await new Promise(r=>setTimeout(r,1000))}}

$('pl').onclick=async()=>{
    if($('pl').disabled)return;
    if(exMd==='mock'&&is){msg("Exit Exam?",'exitMk');return}
    if(!ac){ac=new (window.AudioContext||window.webkitAudioContext)();sr=ac.createMediaElementSource(au);gn=ac.createGain();sr.connect(gn);gn.connect(ac.destination);upV()}
    if(is){au.pause();is=0}
    else{
        if($('bp').checked&&au.currentTime<0.5){$('pl').disabled=true;bpAb=new AbortController();try{await beeps(bpAb.signal)}catch(e){$('pl').disabled=false;return}$('pl').disabled=false}
        if(ac.state==='suspended')await ac.resume();au.play();is=1
    }
    updatePlBtn()
};

$('sb').onclick=async()=>{
    if(exMd==='mock'){msg("Exit Exam?",'exitMk');return}
    if(bpAb)bpAb.abort();au.pause();au.currentTime=0;is=0;updatePlBtn();$('pl').disabled=false
};

au.ontimeupdate=()=>{
    if(!au.duration)return;
    const d=au.duration,c=au.currentTime,p=(c/d)*100,w=parseFloat($('wi').value)||150,relP=Math.min(100,Math.max(0,c-((20/w)*60))/(d-((40/w)*60))*100);
    $('pf').style.width=p+'%';$('tm').textContent=`${fT(c/au.playbackRate)}/${fT(d/au.playbackRate)}`;
    if($('as').checked){const m=$('tx').scrollHeight-$('tx').clientHeight;$('tx').scrollTop=(relP/100)*m}
    if(c/d>0.8&&curO.url&&!played80){played80=1;let id=curO.url.split('details/')[1];if(!hist[id])hist[id]=0;hist[id]++;localStorage.setItem('hist',JSON.stringify(hist));svSt()}
};

async function expA(){
    const b=$('exB'),r=parseFloat($('ri').value);b.innerText='⌛';
    if($('tx').value){const tb=new Blob([$('tx').value],{type:'text/plain'}),ta=document.createElement('a');ta.href=URL.createObjectURL(tb);ta.download='Transcription.txt';ta.click()}
    if(r===1.0){const a=document.createElement('a');a.href=au.src;a.download='Audio.mp3';a.click();b.innerText='⬇️';return}
    try{
        const res=await fetch(au.src),buf=await res.arrayBuffer(),ctx=new OfflineAudioContext(2,buf.byteLength/r,44100),sBuf=await ctx.decodeAudioData(buf),src=ctx.createBufferSource();
        src.buffer=sBuf;src.playbackRate.value=r;src.connect(ctx.destination);src.start();
        const ren=await ctx.startRendering(),blob=new Blob([toWav(ren)],{type:'audio/wav'}),name=`WPM${Math.round($('wi').value)}`;
        const a=document.createElement('a');a.href=URL.createObjectURL(blob);a.download=name+'.wav';a.click()
    }catch(e){}finally{b.innerText='⬇️'}
}

function toWav(b){let n=b.numberOfChannels,len=b.length*n*2+44,buf=new ArrayBuffer(len),v=new DataView(buf),pos=44;const s=(st,s)=>{for(let i=0;i<s.length;i++)v.setUint8(st+i,s.charCodeAt(i))};s(0,'RIFF');v.setUint32(4,len-8,true);s(8,'WAVE');s(12,'fmt ');v.setUint32(16,16,true);v.setUint16(20,1,true);v.setUint16(22,n,true);v.setUint32(24,b.sampleRate,true);v.setUint32(28,b.sampleRate*n*2,true);v.setUint16(32,n*2,true);v.setUint16(34,16,true);s(36,'data');v.setUint32(40,len-44,true);for(let i=0;i<b.length;i++)for(let c=0;c<n;c++){let x=Math.max(-1,Math.min(1,b.getChannelData(c)[i]));v.setInt16(pos,x<0?x*0x8000:x*0x7FFF,true);pos+=2}return buf}