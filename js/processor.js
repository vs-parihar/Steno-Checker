let ac,sr,gn,is=0,curL=[],filtL=[],curI=-1,bpAb=null,curO={},curS=1,curT=14,maxW=0,lastAuSrc=null,isN=0,rDs=[],errs=[],tmr,tS,tLim=0,tEl=0,fixW=0,exMd='prac',started=0,hist={},played80=0,exNext=false;
const $=(i)=>document.getElementById(i);
const au=$('au');
const regs=[{u:"d82c26e4cb069d8f5b9d1f2a5cf42e24",t:"Eng"},{u:"363e6ce7f8e1b41be69bba7623c7c320",t:"Hin"}];

const nz=s=>s.replace(/[\u0902\u0901]/g,'ŋ').replace(/[\u092e\u0928]\u094d/g,'ŋ').replace(/\u090f/g,'\u092f\u0947').replace(/\u0907/g,'\u092f\u093f').replace(/\u093e\u090f/g,'\u093e\u092f\u0947').replace(/\u093e\u0907/g,'\u093e\u092f\u093f');
const cln=s=>s.replace(/[\u2018\u2019]/g,"'").replace(/[\u201C\u201D]/g,'"').replace(/I've/g,"I have").replace(/don't/g,"do not").replace(/can't/g,"cannot").replace(/it's/g,"it is");
const splitT=t=>cln(t).replace(/([\.?!,;:\-\(\)\[\]"'।])/g,' $1 ').split(/\s+/).filter(x=>x).map(v=>({v,t:v.match(/^[\.?!,;:\-\(\)\[\]"'।]+$/)?'p':'w'}));
const lv=(a,b)=>{let d=Array.from({length:a.length+1},(_,i)=>[i]);for(let j=1;j<=b.length;j++)d[0][j]=j;for(let i=1;i<=a.length;i++)for(let j=1;j<=b.length;j++)d[i][j]=a[i-1]===b[j-1]?d[i-1][j-1]:Math.min(d[i-1][j],d[i][j-1],d[i-1][j-1])+1;return d[a.length][b.length]};
const eq=(a,b)=>nz(a)===nz(b);const isPl=(s,t)=>(s.replace(/[ोंोांs]$/,'')===t.replace(/[ोंोांs]$/,'')||nz(s.replace(/[ोंोां]$/,''))===nz(t.replace(/[ोंोां]$/,'')))&&s!==t;

function upWC(f=false){const t=$('tx').value.trim(),m=$('wcM').value;let w=0;if(m==0)w=t?t.split(/\s+/).length:0;else if(m==1)w=Math.ceil(t.length/5);else{const p=splitT(t);p.forEach(x=>{if(x.v.match(/^[,\u0964;]$/))w+=0.5;else if(x.v.match(/^[.?!।!]$/))w+=1;else if(x.t==='w')w+=1})}$('wc').value=w;updateStatus()}
function updateStatus(){$('stWPM').textContent=($('wi').value||0)+' WPM';$('stRate').textContent=($('ri').value||1.0)+'x';$('stWC').textContent=($('wc').value||0)+' W'}
function fT(s){const m=Math.floor(s/60),x=Math.floor(s%60);return`${m}:${x<10?'0':''}${x}`}