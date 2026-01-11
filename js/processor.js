let ac,sr,gn,is=0,curL=[],filtL=[],curI=-1,bpAb=null,curO={},curS=1,curT=14,maxW=0,lastAuSrc=null,isN=0,rDs=[],errs=[],tmr,tS,tLim=0,tEl=0,fixW=0,exMd='prac',started=0,hist={};
const $=(i)=>document.getElementById(i);
const au=$('au');
const regs=[{u:"d82c26e4cb069d8f5b9d1f2a5cf42e24",t:"Eng"},{u:"363e6ce7f8e1b41be69bba7623c7c320",t:"Hin"}];
const ets=["Spelling","Substitution","Missing","Insertion","Split/Join","Pluralisation","Punc Missing","Punc Insertion","Missing Space","Extra Space","Hyphen Error","Case Error","Para Error","Symbol Error"];

const nz=s=>s.replace(/[\u0902\u0901]/g,'ŋ').replace(/[\u092e\u0928]\u094d/g,'ŋ').replace(/\u090f/g,'\u092f\u0947').replace(/\u0907/g,'\u092f\u093f').replace(/\u093e\u090f/g,'\u093e\u092f\u0947').replace(/\u093e\u0907/g,'\u093e\u092f\u093f');
const splitT=t=>t.replace(/([।?.,!@#;()"'\[\]{}-])/g,' $1 ').split(/\s+/).filter(x=>x).map(v=>({v,t:v.match(/[।?.,!@#;()"'\[\]{}-]/)?'p':'w'}));
const lv=(a,b)=>{let d=Array.from({length:a.length+1},(_,i)=>[i]);for(let j=1;j<=b.length;j++)d[0][j]=j;for(let i=1;i<=a.length;i++)for(let j=1;j<=b.length;j++)d[i][j]=a[i-1]===b[j-1]?d[i-1][j-1]:Math.min(d[i-1][j],d[i][j-1],d[i-1][j-1])+1;return d[a.length][b.length]};
const eq=(a,b)=>nz(a)===nz(b);const isPl=(s,t)=>{let a=s.replace(/[ोंोां]$/,''),b=t.replace(/[ोंोां]$/,'');return (a===b||nz(a)===nz(b))&&s!==t};

function msg(t,cb){$('msgT').innerText=t;$('msgB').innerHTML=cb?`<button onclick="(${cb})();$('msgM').classList.remove('active')" style="border-color:var(--gr)">OK</button><button onclick="$('msgM').classList.remove('active')" style="border-color:var(--re)">Cancel</button>`:`<button onclick="$('msgM').classList.remove('active')">OK</button>`;$('msgM').classList.add('active')}