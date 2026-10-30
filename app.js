(function(){
var M=GA.meta,K="ga:"+M.id,S={},tab="path",cur=null,B={},Q=null,$=function(i){return document.getElementById(i)};
document.title=M.title;document.documentElement.style.setProperty("--acc-l",M.accent);document.documentElement.style.setProperty("--acc-d",M.accentDark);
function ld(){try{S=JSON.parse(localStorage.getItem(K))||{}}catch(e){S={}}S.learner=S.learner||"";S.xp=S.xp||0;S.wk=S.wk||{};S.ref=S.ref||{};S.badges=S.badges||[]}
function sv(){try{localStorage.setItem(K,JSON.stringify(S))}catch(e){}}
function W(n){return S.wk[n]||(S.wk[n]={done:{},best:null,miss:[]})}
function D(){return GA.data[cur]}
function mast(){var a=[];for(var n in S.wk)if(S.wk[n].best!=null)a.push(S.wk[n].best);return a.length?Math.round(a.reduce(function(x,y){return x+y},0)/a.length):0}
function ring(p){return '<div class="ring" style="background:conic-gradient(var(--acc) '+p*3.6+'deg,var(--line) 0)"><b>'+p+'%</b></div>'}
function wkObj(n){return GA.weeks.filter(function(x){return x.n===n})[0]}
function loadWeek(n){var w=wkObj(n);return new Promise(function(r){if(GA.data[n]||!w||!w.file)return r();var s=document.createElement("script");s.src=w.file;s.onload=s.onerror=function(){r()};document.head.appendChild(s)})}
function addMiss(ref){var m=W(ref.n).miss;if(!m.some(function(x){return x.k===ref.k&&x.d===ref.d&&x.i===ref.i}))m.push(ref)}
function delMiss(ref){var w=W(ref.n);w.miss=w.miss.filter(function(x){return!(x.k===ref.k&&x.d===ref.d&&x.i===ref.i)})}
function isOk(it,v){return it.o?v===it.a:Math.abs(parseFloat(v)-it.ans)<=(it.tol||0.005)}
function chk(it,done,val,fn){var h='<h2>'+it.q+'</h2>';
if(it.o)h+=it.o.map(function(o,k){var c=done?(k===it.a?" ok":(k===val?" no":"")):"";return '<button class="opt'+c+'" onclick="GAx.'+fn+'('+k+')">'+o+'</button>'}).join("");
else h+='<input class="num" id="num" type="number" inputmode="decimal" step="any" placeholder="Your answer"'+(done?' disabled value="'+val+'"':'')+'><button class="btn"'+(done?' disabled':'')+' onclick="GAx.'+fn+'($(\'num\').value)">Check</button>'.replace('$(','document.getElementById(');
if(done)h+='<div class="fb">'+(isOk(it,val)?"✅ Correct. ":"❌ Not quite. "+(it.h?"Hint: "+it.h+" ":""))+(it.e||"")+'</div>';return h}
function dots(n,i){var h='<div class="dots">';for(var k=0;k<n;k++)h+='<i class="'+(k<=i?"on":"")+'"></i>';return h+'</div>'}
var V={
path:function(){var first=true;return '<h1>'+M.title+'</h1><p class="mute">Term '+M.term+' · v'+M.version+' · sample content</p><div class="hero"><div class="row">'+ring(mast())+'<div><span class="tag">Term Quest</span><br><b>'+M.quest+'</b><div class="mute">Each week unlocks the next chapter.</div></div></div><div class="row" style="margin-top:10px;flex-wrap:wrap"><span class="chip">⭐ '+S.xp+' XP</span><span class="chip">🏅 '+S.badges.length+'</span><span class="chip">🎯 80%</span></div></div>'+GA.weeks.map(function(w){var st=!w.file?"soon":(W(w.n).best!=null?"done":"now");return '<button class="wk '+st+'"'+(w.file?' onclick="GAx.open('+w.n+')"':'')+'><span class="nd">'+(st==="done"?"✓":w.n)+'</span><span><b>'+w.title+'</b><br><span class="mute">'+(st==="now"?"Tap to open":st==="done"?"Best: "+W(w.n).best+"%":"Comes from your BOW")+'</span></span></button>'}).join("")},
week:function(){var d=D();return '<h1>Week '+cur+' · '+d.title+'</h1><div class="card"><span class="tag">Intentions</span><br>'+d.intentions+'</div>'+d.days.map(function(x,i){var has=x.bites.length>0,dn=W(cur).done[i];return '<button class="wk '+(has?(dn?"done":"now"):"soon")+'"'+(has?' onclick="GAx.day('+i+')"':'')+'><span class="nd">'+(dn?"✓":x.day.charAt(0))+'</span><span><b>'+x.day+' · '+x.title+'</b><br><span class="mute">'+(has?x.bites.length+" bites · "+x.min+" min":"Adds from your DLL")+'</span></span></button>'}).join("")+(d.boss?'<button class="btn" onclick="GAx.boss()">Boss round ('+d.boss.length+' items)</button>':'')},
bites:function(){var bs=D().days[B.d].bites,it=bs[B.i],h=dots(bs.length,B.i),can=true,t=it.t;
if(t==="hook"){var r=B.pick!=null;h+='<span class="tag">Hook · predict first</span><h2>'+it.q+'</h2>'+it.o.map(function(o,k){return '<button class="opt'+(r&&it.a!=null?(k===it.a?" ok":(k===B.pick?" no":"")):(r&&k===B.pick?" ok":""))+'" onclick="GAx.hp('+k+')">'+o+'</button>'}).join("")+(r?'<div class="fb">'+(it.r||"")+'</div>':"");can=r}
else if(t==="try"){h+='<span class="tag">Try it</span><h2>'+it.title+'</h2><input type="range" min="'+it.min+'" max="'+it.max+'" step="'+it.step+'" value="'+it.value+'" oninput="GAx.tr(this.value)"><div class="card"><div class="mute">Value</div><div class="big" id="tv"></div><div id="tout"></div></div>'}
else if(t==="explain"){h+='<span class="tag">Explain</span><h2>'+it.title+'</h2><div class="card">'+it.body.map(function(p){return '<p>'+p+'</p>'}).join("")+'</div>'}
else if(t==="check"){var r2=B.qp!=null;h+='<span class="tag">Check · counts toward mastery (mode A)</span>'+chk(it,r2,B.qp,"ck");can=r2}
else if(t==="self"){h+='<span class="tag">Self-check · not counted (mode B)</span><h2>'+it.q+'</h2>'+(B.rev?'<div class="fb"><b>Sample answer:</b> '+it.ans+'</div>':'<textarea placeholder="Write your answer first"></textarea><button class="btn alt" onclick="GAx.rv()">Show sample answer</button>');can=B.rev}
else if(t==="task"){var k="t"+cur+"."+B.d+"."+B.i,on=S.ref[k];h+='<span class="tag">Task · submit to teacher (mode C)</span><h2>'+it.q+'</h2><div class="fb">'+it.how+'</div><button class="btn '+(on?"":"alt")+'" onclick="GAx.tk(\''+k+'\')">'+(on?"✅ Ready to submit":"Mark as ready to submit")+'</button>'}
else if(t==="reflect"){var rk=cur+"."+B.d;h+='<span class="tag">Reflect · ways forward</span><h2>'+it.q+'</h2>'+it.chips.map(function(c){return '<button class="ch'+(S.ref[rk]===c?" on":"")+'" onclick="GAx.rf(\''+c.replace(/'/g,"")+'\')">'+c+'</button>'}).join("")}
return h+'<button class="btn"'+(can?'':' disabled')+' onclick="GAx.nx()">'+(B.i>=bs.length-1?"Finish":"Next")+'</button>'},
quiz:function(){var L=Q.items;if(Q.q>=L.length){var m=Math.round(Q.ok/L.length*100);return '<h2>'+(Q.mode==="boss"?"Boss round done":"Rescue round done")+'</h2><div class="row">'+ring(m)+'<div><b>'+Q.ok+' of '+L.length+' correct</b><div class="mute">'+(Q.mode==="boss"?(m>=80?"You reached the 80% target.":"Below 80%. Use the rescue round in Me."):"Cleared items leave your rescue list.")+'</div></div></div><button class="btn" onclick="GAx.qf('+m+')">Continue</button>'}
var r=Q.qp!=null;return '<div class="row"><span class="tag" style="flex:1">'+(Q.mode==="boss"?"Boss round":"Rescue round")+' · '+(Q.q+1)+' of '+L.length+'</span><span>'+"❤️".repeat(Q.hearts)+"🖤".repeat(3-Q.hearts)+'</span></div>'+chk(L[Q.q].it,r,Q.qp,"qa")+(r?'<button class="btn" onclick="GAx.qn()">Next</button>':'')},
me:function(){var n=0;for(var k in S.wk)if(S.wk[k].best!=null&&+k>n)n=+k;var ms=0;for(var j in S.wk)ms+=S.wk[j].miss.length;var code=n?"GA-"+M.subj+M.grade+"-W"+("0"+n).slice(-2)+"-L"+(S.learner||"0")+"-M"+W(n).best+"-X"+S.xp:"Finish a boss round to get a code";
var ex=btoa(unescape(encodeURIComponent(JSON.stringify(S))));
return '<h1>My progress</h1><div class="hero"><div class="row">'+ring(mast())+'<div><b>Mastery target: 80%</b><div class="mute">Counts mode A items only.</div></div></div></div><div class="grid2" style="margin-top:12px"><div class="st"><div class="big">⭐ '+S.xp+'</div>XP</div><div class="st"><div class="big">🏅 '+S.badges.length+'</div>'+(S.badges.join(", ")||"No badges yet")+'</div></div>'
+'<div class="card"><span class="tag">Learner number</span><p class="mute">Your teacher gives you a number. Do not type your name.</p><input class="lr" inputmode="numeric" maxlength="4" value="'+S.learner+'" oninput="GAx.lr(this.value)"></div>'
+'<div class="card"><span class="tag">Rescue round</span><p>'+(ms?ms+" item(s) to review.":"Nothing to review yet.")+'</p>'+(ms?'<button class="btn" onclick="GAx.rescue()">Start rescue round</button>':'')+'</div>'
+'<div class="card"><span class="tag">Share with my teacher</span><p><b>'+code+'</b></p><p class="mute">Formative only. A learner can edit this code.</p></div>'
+'<div class="card"><span class="tag">Backup</span><p class="mute">Copy this code to move your progress to another phone.</p><textarea readonly onclick="this.select()">'+ex+'</textarea><textarea id="imp" placeholder="Paste a backup code here"></textarea><button class="btn alt" onclick="GAx.imp()">Import</button><button class="btn alt" onclick="GAx.pst()">Protect my storage</button><p class="mute" id="msg"></p></div><button class="btn alt" onclick="GAx.rs()">Reset my progress</button>'}};
var G=window.GAx={
go:function(t){if(t==="week"&&cur==null){var w=GA.weeks.filter(function(x){return x.file})[0];return w?G.open(w.n):null}tab=t;draw()},
open:function(n){loadWeek(n).then(function(){cur=n;tab="week";draw();scrollTo(0,0)})},
day:function(d){B={d:d,i:0,pick:null,qp:null,rev:false};tab="bites";draw();scrollTo(0,0)},
hp:function(k){if(B.pick!=null)return;B.pick=k;S.xp+=5;sv();draw()},
tr:function(v){var it=D().days[B.d].bites[B.i],r=it.calc(+v);$("tv").textContent=v+" "+it.unit;$("tout").innerHTML=r.rows.map(function(x){return '<div class="mute">'+x[0]+'</div><div class="big">'+x[1]+'</div>'}).join("")+'<div class="bar"><i style="width:'+r.bar+'%"></i></div><p class="mute">'+r.note+'</p>'},
ck:function(v){if(B.qp!=null||v==="")return;var it=D().days[B.d].bites[B.i];B.qp=v;if(isOk(it,v))S.xp+=10;else addMiss({n:cur,k:"d",d:B.d,i:B.i});sv();draw()},
rv:function(){B.rev=true;draw()},tk:function(k){S.ref[k]=!S.ref[k];sv();draw()},rf:function(c){S.ref[cur+"."+B.d]=c;sv();draw()},
nx:function(){var bs=D().days[B.d].bites;B.i++;B.pick=null;B.qp=null;B.rev=false;if(B.i>=bs.length){W(cur).done[B.d]=true;S.xp+=5;sv();tab="week"}draw();scrollTo(0,0);if(tab==="bites")G.tr0()},
tr0:function(){var it=D().days[B.d].bites[B.i];if(it.t==="try")G.tr(it.value)},
boss:function(){Q={mode:"boss",items:D().boss.map(function(it,i){return{it:it,ref:{n:cur,k:"b",d:0,i:i}}}),q:0,hearts:3,ok:0,qp:null};tab="quiz";draw();scrollTo(0,0)},
rescue:function(){var ns=[];for(var k in S.wk)if(S.wk[k].miss.length)ns.push(+k);Promise.all(ns.map(loadWeek)).then(function(){var L=[];ns.forEach(function(n){S.wk[n].miss.forEach(function(r){var d=GA.data[n],it=d&&(r.k==="b"?d.boss[r.i]:d.days[r.d].bites[r.i]);if(it)L.push({it:it,ref:r})})});if(!L.length)return;Q={mode:"rescue",items:L,q:0,hearts:3,ok:0,qp:null};tab="quiz";draw();scrollTo(0,0)})},
qa:function(v){if(Q.qp!=null||v==="")return;var x=Q.items[Q.q],ok=isOk(x.it,v);Q.qp=v;if(ok){Q.ok++;S.xp+=10;if(Q.mode==="rescue")delMiss(x.ref)}else{Q.hearts=Math.max(0,Q.hearts-1);addMiss(x.ref)}sv();draw()},
qn:function(){Q.q++;Q.qp=null;draw();scrollTo(0,0)},
qf:function(m){if(Q.mode==="boss"){var w=W(cur);w.best=Math.max(w.best||0,m);var b="Week "+cur+" badge";if(m>=80&&S.badges.indexOf(b)<0){S.badges.push(b);S.xp+=30}sv();tab="week"}else tab="me";draw()},
lr:function(v){S.learner=v.replace(/\D/g,"").slice(0,4);sv()},
imp:function(){try{var j=JSON.parse(decodeURIComponent(escape(atob($("imp").value.trim()))));if(!j.wk)throw 0;S=j;sv();draw();$("msg").textContent="Imported."}catch(e){$("msg").textContent="That code did not work."}},
pst:function(){var m=$("msg");if(navigator.storage&&navigator.storage.persist)navigator.storage.persist().then(function(ok){m.textContent=ok?"Storage protected.":"Not allowed by this browser. Keep the app installed and avoid clearing site data."});else m.textContent="Not supported on this browser."},
rs:function(){if(confirm("Reset all progress on this phone?")){S={};ld();sv();cur=null;tab="path";draw()}}};
function draw(){var T=[["path","🗺️","Path"],["week","📅","Week"],["me","🏅","Me"]],act=(tab==="bites"||tab==="quiz")?"week":tab;
$("nav").innerHTML=T.map(function(t){return '<button aria-current="'+(t[0]===act)+'" onclick="GAx.go(\''+t[0]+'\')"><span>'+t[1]+'</span>'+t[2]+'</button>'}).join("");
$("v").innerHTML=V[tab]();if(tab==="bites")G.tr0()}
ld();if(navigator.storage&&navigator.storage.persist)navigator.storage.persist();draw();
if("serviceWorker" in navigator)navigator.serviceWorker.register("sw.js").then(function(r){r.addEventListener("updatefound",function(){var w=r.installing;if(w)w.addEventListener("statechange",function(){if(w.state==="installed"&&navigator.serviceWorker.controller)$("upd").hidden=false})})}).catch(function(){});
})();
