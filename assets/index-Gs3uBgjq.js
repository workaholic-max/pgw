import{_ as U,h as g,i as T,m as q,p as G,o,c as l,a as D,F as p,r as v,e as m,b as k,w as d,g as _,f as y,d as b,T as C,j as E,n as B,t as $}from"./index-Dmafc7Tg.js";const j=6,M=new Set("abcdefghijklmnopqrstuvwxyz"),x=["forest","desert","island","jungle","breeze","turtle","beetle","monkey","gopher","iguana","salmon","falcon","donkey","shrimp","planet","galaxy","meteor","rocket","cosmic","saturn","pickle","bottle","tomato","fossil","guitar","bridge","tunnel","magnet","helmet","jacket","alicia","hanyan","lukian","maksym","enough","legend","common","maniac"],z=()=>{const S=Math.floor(Math.random()*x.length);return x[S]},H={class:"wm-game"},I={class:"wm-board"},J={class:"wm-keyboard"},Q=["disabled","onClick"],X={key:1,class:"wm-controls"},Y={name:"WordleView"},Z=Object.assign(Y,{setup(S){const i=g({isOver:!1}),n=g({word:z(),current:1,data:new Map([[1,[]]])}),N=()=>{n.word=z(),n.current=1,n.data=new Map([[1,[]]])},h=t=>n.data.get(t)||[],f=t=>{n.data.set(n.current,t)},a=T(()=>h(n.current)),s=g({correct:new Set,halfCorrect:new Set,incorrect:new Set}),V=()=>{s.correct.clear(),s.halfCorrect.clear(),s.incorrect.clear()},R=(t,e)=>{if(n.current<=t)return null;const{word:r}=n,c=h(t)[e];return r[e]===c?"correct":r.includes(c)?"half-correct":"incorrect"},W=(t,e)=>{const{isOver:r}=i,{current:c}=n,u=R(t,e);return{"wm-letter--current":!r&&c===t&&a.value.length===e,"wm-letter--inactive":r||c<t,[`wm-letter--${u}`]:u!==null}},F=t=>{let e=null;return s.correct.has(t)?e="correct":s.halfCorrect.has(t)?e="half-correct":s.incorrect.has(t)&&(e="incorrect"),{[`wm-alphabet-letter--${e}`]:e!==null}},w=T(()=>i.isOver||a.value.length===n.word.length),L=()=>{const{word:t}=n;for(let e=0;e<a.value.length;e++){const r=a.value[e];s.correct.has(r)||(t[e]===r?(s.correct.add(r),s.halfCorrect.delete(r)):t.includes(r)?s.halfCorrect.add(r):s.incorrect.add(r))}(n.current===j||a.value.join("")===t)&&(i.isOver=!0),n.current++,f([])},A=()=>{f(a.value.slice(0,-1))},K=t=>{w.value||f([...a.value,t])},O=({code:t})=>{if(i.isOver)return;if(t==="Backspace"&&a.value.length>0){A();return}if(t==="Enter"&&a.value.length===n.word.length){L();return}const e=t.toLowerCase().replace("key","");M.has(e)&&!w.value&&f([...a.value,e])},P=()=>{i.isOver=!1,N(),V()};return q(()=>{window.addEventListener("keydown",O),G(()=>window.removeEventListener("keydown",O))}),(t,e)=>(o(),l("div",H,[D("div",I,[(o(!0),l(p,null,v(m(j),r=>(o(),l("ul",{key:`attempt: ${r}`,class:"wm-attempt"},[(o(!0),l(p,null,v(n.word.length,(c,u)=>(o(),l("li",{key:`attempt: ${r}; letter: ${u}`,class:B(["wm-letter",W(r,u)])},$(h(r)[u]),3))),128))]))),128))]),D("div",J,[(o(!0),l(p,null,v(m(M),r=>(o(),l("button",{type:"button",class:B(["wm-alphabet-letter",F(r)]),disabled:w.value,onClick:c=>K(r)},$(r),11,Q))),256))]),k(C,{name:"slide-up",type:"transition",mode:"out-in"},{default:d(()=>[i.isOver?(o(),_(m(y),{key:0,size:"lg",onClick:P},{default:d(()=>e[0]||(e[0]=[b(" Restart ")])),_:1})):(o(),l("div",X,[k(C,{name:"slide-up",type:"transition",mode:"out-in"},{default:d(()=>[a.value.length>0?(o(),_(m(y),{key:0,onClick:A},{default:d(()=>e[1]||(e[1]=[b(" Clear ")])),_:1})):E("",!0)]),_:1}),k(C,{name:"slide-up",type:"transition",mode:"out-in"},{default:d(()=>[a.value.length===n.word.length?(o(),_(m(y),{key:0,size:"lg",onClick:L},{default:d(()=>e[2]||(e[2]=[b(" Check ")])),_:1})):E("",!0)]),_:1})]))]),_:1})]))}}),te=U(Z,[["__scopeId","data-v-b62b5236"]]);export{te as default};