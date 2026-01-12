function uD(){
    const dF=$('rS'),lG=$('erL');dF.innerHTML='';lG.innerHTML='';errs=[];
    rDs.forEach((r,x)=>{let cl='',sv=(r.sv2?(r.sv+(r.sSp1?' ':'')+r.sv2):r.sv),v=(r.v2?(r.v+(r.tSp1?' ':'')+r.v2):r.v),c='',t=r.t;
    if(r.k===0){c=t==='w'?"Missing":(sv.match(/[.?!।]/)?"Major Punctuation":(sv.match(/[,;]/)?"Comma":"Minor Punctuation"));cl=t==='w'?'t-mi':'t-mi';v=sv}
    else if(r.k===2){c=t==='w'?"Insertion":(v.match(/[.?!।]/)?"Major Punctuation":(v.match(/[,;]/)?"Comma":"Minor Punctuation"));cl='t-ins'}
    else if(r.k===3||r.k===4||r.k===5){
        let vs=v.replace(/[ंःािीुूेैोौ]/g,'').replace(/़/g,''),svs=sv.replace(/[ंःािीुूेैोौ]/g,'').replace(/़/g,'');
        if(r.k===5)c="Transposition";else if(r.k===4)c="Split/Join";else if(isPl(sv,v))c="Pluralisation";else if(sv.toLowerCase()!==sv&&v.toLowerCase()!==v&&sv.toLowerCase()===v.toLowerCase())c="Capitalisation";else if(sv.match(/[एे]$|ye$/)&&v.match(/[एे]$|ye$/))c="Ya+Shruti";else if(v.includes('-')&&!sv.includes('-'))c="Word Joining Punctuation";else if(vs===svs||lv(sv,v)<2)c="Spelling";else c="Substitution";cl=(c==="Substitution"||c==="Transposition")?'t-sub':'t-sp1'
    }
    if(x>0&&rDs[x-1].k===0&&r.k===2&&rDs[x-1].sv===v)c="Repetition";
    let s=document.createElement('span');if(c){let eIdx=errs.length;s.id=`de-${eIdx}`;s.className=`diff-err ${cl}`;s.textContent=(!isN&&r.k===0)?sv:v;s.onclick=()=>hL(eIdx);if(r.t==='w'&&r.k!==0&&r.k!==1)s.innerHTML+=`<span class="t-cor"> [${sv}]</span>`;let d=lv(nz(v),nz(sv));dF.appendChild(s);al(c,v,x,sv,s,cl,d)}
    else{s.textContent=v;if(isN&&r.v!==r.sv)s.innerHTML+=`<span class="t-gray"> [${r.sv}]</span>`;dF.appendChild(s)}
    let fSp=(r.tSp||(!isN&&(r.k===0&&r.sSp))),nxt=rDs[x+1];if(!fSp&&r.t==='w'&&nxt&&nxt.t==='w'&&(r.k===0||r.k===2||nxt.k===0||nxt.k===2))fSp=true;
    if(isN&&r.sSp1!==r.tSp1){let sp=document.createElement('span');sp.className=r.sSp1?'s-mi':'s-ex';sp.textContent=' ';dF.insertBefore(sp,s.nextSibling);al(r.sSp1?'Extra/Missing Space':'Extra/Missing Space',' ',x,'',sp,'s-mi')}
    if(!isN&&(r.tSp1||(r.k===0&&r.sSp1)))dF.appendChild(document.createTextNode(' '));else if(isN&&r.tSp1)dF.appendChild(document.createTextNode(' '));
    if(isN&&r.sSp!==r.tSp){let sp=document.createElement('span');sp.className=r.sSp?'s-mi':'s-ex';sp.textContent=' ';dF.appendChild(sp);al(r.sSp?'Extra/Missing Space':'Extra/Missing Space',' ',x,'',sp,'s-mi')}else if(fSp||(isN&&r.sSp))dF.appendChild(document.createTextNode(' '))});upS()
}

function al(c,v,x,sv,el,cl,d=1){
    let eIdx=errs.length,p=$(`c-${c.replace(/[ /+]/g,'_')}`)?.value||'S';
    errs.push({c,v,p,sv,d,el});upCost(eIdx,p);let e=document.createElement('div');e.id=`le-${eIdx}`;e.className='err-item';e.onclick=()=>hL(eIdx);
    let abb=c.substr(0,3).toUpperCase();let ctx='',pre=[],pst=[];for(let i=1;i<=2;i++)if(rDs[x-i])pre.unshift(rDs[x-i].v||rDs[x-i].sv);for(let i=1;i<=2;i++)if(rDs[x+i])pst.push(rDs[x+i].v||rDs[x+i].sv);
    let diffStr=c==='Substitution'||c==='Spelling'?`${sv} → ${v}`:(c==='Missing'?`${sv}`:v);
    let htm=`${pre.join(' ')} <span class="e-w">${v||sv}</span> ${pst.join(' ')}`;
    e.innerHTML=`<div class="e-r1"><span class="e-ty">${abb}</span><div class="e-tx">${diffStr} (${c})</div><div class="err-btns">${['H','S','D','X'].map(b=>`<span class="${b===p?'active':''}" onclick="event.stopPropagation();chP(this,'${b}',${eIdx})">${b}</span>`).join('')}</div></div><div class="e-r2">${htm}</div>`;$('erL').appendChild(e)
}

function upCost(i,p){let e=errs[i],ct=p==='H'?0.5:(p==='S'?1:(p==='D'?2:0));if(e.c==="Substitution"&&e.p==="D")ct=2;if(e.el){let o=e.el.querySelector('sup');if(o)o.remove();if(ct>0){let s=document.createElement('sup');s.style.color=`var(--${ct<=0.5?'sp1':(ct<=1?'ins':'err')})`;s.textContent=ct;e.el.appendChild(s)}}}
function chP(el,p,i){const b=el.parentElement.querySelectorAll('span');b.forEach(s=>s.classList.remove('active'));el.classList.add('active');errs[i].p=p;upCost(i,p);upS()}
function upS(){let h=0,s=0,d=0,tot=0,mis=0,ins=0;errs.forEach(e=>{let ct=e.p==='H'?0.5:(e.p==='S'?1:(e.p==='D'?2:0));if(e.c==="Substitution"&&e.p==="D"){ct=2;mis++;ins++}tot+=ct;if(ct===0.5)h++;else if(ct===1)s++;else if(ct>=2)d++});const wc=parseFloat($('wc').value)||1,acc=Math.max(0,100-(tot/wc)*100).toFixed(2),mm=parseFloat($('exMM').value)||100,mrk=((acc/100)*mm).toFixed(1);$('resDet').innerHTML=`<span>H: ${h}</span><span>S: ${s}</span><span>D: ${d}</span><span style="color:var(--re)">Err: ${tot} (${((tot/wc)*100).toFixed(1)}%)</span><span style="color:var(--gr)">Acc: ${acc}%</span><span style="color:var(--in)">Marks: ${mrk}/${mm}</span>`}