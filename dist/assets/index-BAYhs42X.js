import{_ as Fl}from"./Page-DfLTiJsG.js";import{S as Uo,m as Ol,a as Bl,b as zl,c as Hl,d as Vl}from"./mdi-DS9CUIIU.js";import{_ as Fi,a0 as Gl,o as St,v as Hn,x as Xe,b as Ue,y as ct,a as Ht,t as Vn,c as Sn,a4 as kl,U as Li,a1 as os,a5 as Vt,a6 as Wl,r as vn,N as js,S as Xl,O as Js,a7 as Gt,z as Io}from"./index-Dx1-em9Y.js";import{V as Qs,a as ea}from"./VCard-BPpIPbv5.js";import{_ as ql}from"./StatCard-DapXmSl6.js";import{_ as Yl}from"./SectionOverline-DZfYL7NM.js";import{_ as No}from"./ContainerMd-Dgyh1ldU.js";import{V as Ui,a as Gn}from"./VRow-C2ktkuJ3.js";import{V as Fo}from"./VImg-D4KqEGkz.js";import{V as $l}from"./VBtn-DJ-Y5tSp.js";import{V as Oo}from"./VIcon-BCjZDn7j.js";import{_ as Zl}from"./ContainerSm-CFesyHvp.js";import{c as Kl,i as ls,a as Ta,b as ba,d as jl,r as Jl}from"./transform-Dj0JbBrM.js";import{c as Ql}from"./dsv-XhNTmijJ.js";import{g as ec}from"./group-C6_R01-c.js";import"./VAvatar-CJHmzFxH.js";import"./color-K37zzirM.js";import"./rounded-CnIZZI1G.js";import"./index-By2a-djB.js";import"./group-yyyhAMJI.js";function dr(n,e){return n==null||e==null?NaN:n<e?-1:n>e?1:n>=e?0:NaN}function Bo(n,e){return n==null||e==null?NaN:e<n?-1:e>n?1:e>=n?0:NaN}function zo(n){let e,t,i;n.length!==2?(e=dr,t=(o,c)=>dr(n(o),c),i=(o,c)=>n(o)-c):(e=n===dr||n===Bo?n:tc,t=n,i=n);function r(o,c,l=0,h=o.length){if(l<h){if(e(c,c)!==0)return h;do{const u=l+h>>>1;t(o[u],c)<0?l=u+1:h=u}while(l<h)}return l}function s(o,c,l=0,h=o.length){if(l<h){if(e(c,c)!==0)return h;do{const u=l+h>>>1;t(o[u],c)<=0?l=u+1:h=u}while(l<h)}return l}function a(o,c,l=0,h=o.length){const u=r(o,c,l,h-1);return u>l&&i(o[u-1],c)>-i(o[u],c)?u-1:u}return{left:r,center:a,right:s}}function tc(){return 0}function nc(n){return n===null?NaN:+n}const ic=zo(dr),rc=ic.right;zo(nc).center;function pr(n,e){let t,i;if(e===void 0)for(const r of n)r!=null&&(t===void 0?r>=r&&(t=i=r):(t>r&&(t=r),i<r&&(i=r)));else{let r=-1;for(let s of n)(s=e(s,++r,n))!=null&&(t===void 0?s>=s&&(t=i=s):(t>s&&(t=s),i<s&&(i=s)))}return[t,i]}const sc=Math.sqrt(50),ac=Math.sqrt(10),oc=Math.sqrt(2);function Sr(n,e,t){const i=(e-n)/Math.max(0,t),r=Math.floor(Math.log10(i)),s=i/Math.pow(10,r),a=s>=sc?10:s>=ac?5:s>=oc?2:1;let o,c,l;return r<0?(l=Math.pow(10,-r)/a,o=Math.round(n*l),c=Math.round(e*l),o/l<n&&++o,c/l>e&&--c,l=-l):(l=Math.pow(10,r)*a,o=Math.round(n/l),c=Math.round(e/l),o*l<n&&++o,c*l>e&&--c),c<o&&.5<=t&&t<2?Sr(n,e,t*2):[o,c,l]}function lc(n,e,t){if(e=+e,n=+n,t=+t,!(t>0))return[];if(n===e)return[n];const i=e<n,[r,s,a]=i?Sr(e,n,t):Sr(n,e,t);if(!(s>=r))return[];const o=s-r+1,c=new Array(o);if(i)if(a<0)for(let l=0;l<o;++l)c[l]=(s-l)/-a;else for(let l=0;l<o;++l)c[l]=(s-l)*a;else if(a<0)for(let l=0;l<o;++l)c[l]=(r+l)/-a;else for(let l=0;l<o;++l)c[l]=(r+l)*a;return c}function cs(n,e,t){return e=+e,n=+n,t=+t,Sr(n,e,t)[2]}function cc(n,e,t){e=+e,n=+n,t=+t;const i=e<n,r=i?cs(e,n,t):cs(n,e,t);return(i?-1:1)*(r<0?1/-r:r)}function uc(n,e){let t=0,i=0;if(e===void 0)for(let r of n)r!=null&&(r=+r)>=r&&(++t,i+=r);else{let r=-1;for(let s of n)(s=e(s,++r,n))!=null&&(s=+s)>=s&&(++t,i+=s)}if(t)return i/t}function hc(n,e){e||(e=[]);var t=n?Math.min(e.length,n.length):0,i=e.slice(),r;return function(s){for(r=0;r<t;++r)i[r]=n[r]*(1-s)+e[r]*s;return i}}function fc(n){return ArrayBuffer.isView(n)&&!(n instanceof DataView)}function dc(n,e){var t=e?e.length:0,i=n?Math.min(t,n.length):0,r=new Array(i),s=new Array(t),a;for(a=0;a<i;++a)r[a]=wr(n[a],e[a]);for(;a<t;++a)s[a]=e[a];return function(o){for(a=0;a<i;++a)s[a]=r[a](o);return s}}function pc(n,e){var t=new Date;return n=+n,e=+e,function(i){return t.setTime(n*(1-i)+e*i),t}}function mc(n,e){var t={},i={},r;(n===null||typeof n!="object")&&(n={}),(e===null||typeof e!="object")&&(e={});for(r in e)r in n?t[r]=wr(n[r],e[r]):i[r]=e[r];return function(s){for(r in t)i[r]=t[r](s);return i}}function wr(n,e){var t=typeof e,i;return e==null||t==="boolean"?Kl(e):(t==="number"?ls:t==="string"?(i=Ta(e))?(e=i,ba):jl:e instanceof Ta?ba:e instanceof Date?pc:fc(e)?hc:Array.isArray(e)?dc:typeof e.valueOf!="function"&&typeof e.toString!="function"||isNaN(e)?mc:ls)(n,e)}function Ho(n,e){return n=+n,e=+e,function(t){return Math.round(n*(1-t)+e*t)}}function _c(n){return Math.abs(n=Math.round(n))>=1e21?n.toLocaleString("en").replace(/,/g,""):n.toString(10)}function Er(n,e){if((t=(n=e?n.toExponential(e-1):n.toExponential()).indexOf("e"))<0)return null;var t,i=n.slice(0,t);return[i.length>1?i[0]+i.slice(2):i,+n.slice(t+1)]}function fi(n){return n=Er(Math.abs(n)),n?n[1]:NaN}function gc(n,e){return function(t,i){for(var r=t.length,s=[],a=0,o=n[0],c=0;r>0&&o>0&&(c+o+1>i&&(o=Math.max(1,i-c)),s.push(t.substring(r-=o,r+o)),!((c+=o+1)>i));)o=n[a=(a+1)%n.length];return s.reverse().join(e)}}function vc(n){return function(e){return e.replace(/[0-9]/g,function(t){return n[+t]})}}var xc=/^(?:(.)?([<>=^]))?([+\-( ])?([$#])?(0)?(\d+)?(,)?(\.\d+)?(~)?([a-z%])?$/i;function yr(n){if(!(e=xc.exec(n)))throw new Error("invalid format: "+n);var e;return new ta({fill:e[1],align:e[2],sign:e[3],symbol:e[4],zero:e[5],width:e[6],comma:e[7],precision:e[8]&&e[8].slice(1),trim:e[9],type:e[10]})}yr.prototype=ta.prototype;function ta(n){this.fill=n.fill===void 0?" ":n.fill+"",this.align=n.align===void 0?">":n.align+"",this.sign=n.sign===void 0?"-":n.sign+"",this.symbol=n.symbol===void 0?"":n.symbol+"",this.zero=!!n.zero,this.width=n.width===void 0?void 0:+n.width,this.comma=!!n.comma,this.precision=n.precision===void 0?void 0:+n.precision,this.trim=!!n.trim,this.type=n.type===void 0?"":n.type+""}ta.prototype.toString=function(){return this.fill+this.align+this.sign+this.symbol+(this.zero?"0":"")+(this.width===void 0?"":Math.max(1,this.width|0))+(this.comma?",":"")+(this.precision===void 0?"":"."+Math.max(0,this.precision|0))+(this.trim?"~":"")+this.type};function Mc(n){e:for(var e=n.length,t=1,i=-1,r;t<e;++t)switch(n[t]){case".":i=r=t;break;case"0":i===0&&(i=t),r=t;break;default:if(!+n[t])break e;i>0&&(i=0);break}return i>0?n.slice(0,i)+n.slice(r+1):n}var Vo;function Sc(n,e){var t=Er(n,e);if(!t)return n+"";var i=t[0],r=t[1],s=r-(Vo=Math.max(-8,Math.min(8,Math.floor(r/3)))*3)+1,a=i.length;return s===a?i:s>a?i+new Array(s-a+1).join("0"):s>0?i.slice(0,s)+"."+i.slice(s):"0."+new Array(1-s).join("0")+Er(n,Math.max(0,e+s-1))[0]}function Aa(n,e){var t=Er(n,e);if(!t)return n+"";var i=t[0],r=t[1];return r<0?"0."+new Array(-r).join("0")+i:i.length>r+1?i.slice(0,r+1)+"."+i.slice(r+1):i+new Array(r-i.length+2).join("0")}const wa={"%":(n,e)=>(n*100).toFixed(e),b:n=>Math.round(n).toString(2),c:n=>n+"",d:_c,e:(n,e)=>n.toExponential(e),f:(n,e)=>n.toFixed(e),g:(n,e)=>n.toPrecision(e),o:n=>Math.round(n).toString(8),p:(n,e)=>Aa(n*100,e),r:Aa,s:Sc,X:n=>Math.round(n).toString(16).toUpperCase(),x:n=>Math.round(n).toString(16)};function Ra(n){return n}var Ca=Array.prototype.map,Pa=["y","z","a","f","p","n","µ","m","","k","M","G","T","P","E","Z","Y"];function Ec(n){var e=n.grouping===void 0||n.thousands===void 0?Ra:gc(Ca.call(n.grouping,Number),n.thousands+""),t=n.currency===void 0?"":n.currency[0]+"",i=n.currency===void 0?"":n.currency[1]+"",r=n.decimal===void 0?".":n.decimal+"",s=n.numerals===void 0?Ra:vc(Ca.call(n.numerals,String)),a=n.percent===void 0?"%":n.percent+"",o=n.minus===void 0?"−":n.minus+"",c=n.nan===void 0?"NaN":n.nan+"";function l(u){u=yr(u);var d=u.fill,m=u.align,g=u.sign,M=u.symbol,p=u.zero,f=u.width,w=u.comma,T=u.precision,E=u.trim,C=u.type;C==="n"?(w=!0,C="g"):wa[C]||(T===void 0&&(T=12),E=!0,C="g"),(p||d==="0"&&m==="=")&&(p=!0,d="0",m="=");var A=M==="$"?t:M==="#"&&/[boxX]/.test(C)?"0"+C.toLowerCase():"",P=M==="$"?i:/[%p]/.test(C)?a:"",I=wa[C],S=/[defgprs%]/.test(C);T=T===void 0?6:/[gprs]/.test(C)?Math.max(1,Math.min(21,T)):Math.max(0,Math.min(20,T));function x(b){var W=A,N=P,k,Z,G;if(C==="c")N=I(b)+N,b="";else{b=+b;var J=b<0||1/b<0;if(b=isNaN(b)?c:I(Math.abs(b),T),E&&(b=Mc(b)),J&&+b==0&&g!=="+"&&(J=!1),W=(J?g==="("?g:o:g==="-"||g==="("?"":g)+W,N=(C==="s"?Pa[8+Vo/3]:"")+N+(J&&g==="("?")":""),S){for(k=-1,Z=b.length;++k<Z;)if(G=b.charCodeAt(k),48>G||G>57){N=(G===46?r+b.slice(k+1):b.slice(k))+N,b=b.slice(0,k);break}}}w&&!p&&(b=e(b,1/0));var H=W.length+b.length+N.length,Q=H<f?new Array(f-H+1).join(d):"";switch(w&&p&&(b=e(Q+b,Q.length?f-N.length:1/0),Q=""),m){case"<":b=W+b+N+Q;break;case"=":b=W+Q+b+N;break;case"^":b=Q.slice(0,H=Q.length>>1)+W+b+N+Q.slice(H);break;default:b=Q+W+b+N;break}return s(b)}return x.toString=function(){return u+""},x}function h(u,d){var m=l((u=yr(u),u.type="f",u)),g=Math.max(-8,Math.min(8,Math.floor(fi(d)/3)))*3,M=Math.pow(10,-g),p=Pa[8+g/3];return function(f){return m(M*f)+p}}return{format:l,formatPrefix:h}}var Wi,Go,ko;yc({thousands:",",grouping:[3],currency:["$",""]});function yc(n){return Wi=Ec(n),Go=Wi.format,ko=Wi.formatPrefix,Wi}function Tc(n){return Math.max(0,-fi(Math.abs(n)))}function bc(n,e){return Math.max(0,Math.max(-8,Math.min(8,Math.floor(fi(e)/3)))*3-fi(Math.abs(n)))}function Ac(n,e){return n=Math.abs(n),e=Math.abs(e)-n,Math.max(0,fi(e)-fi(n))+1}function Wo(n,e){switch(arguments.length){case 0:break;case 1:this.range(n);break;default:this.range(e).domain(n);break}return this}function wc(n,e){switch(arguments.length){case 0:break;case 1:{typeof n=="function"?this.interpolator(n):this.range(n);break}default:{this.domain(n),typeof e=="function"?this.interpolator(e):this.range(e);break}}return this}function Rc(n){return function(){return n}}function Cc(n){return+n}var Da=[0,1];function It(n){return n}function us(n,e){return(e-=n=+n)?function(t){return(t-n)/e}:Rc(isNaN(e)?NaN:.5)}function Pc(n,e){var t;return n>e&&(t=n,n=e,e=t),function(i){return Math.max(n,Math.min(e,i))}}function Dc(n,e,t){var i=n[0],r=n[1],s=e[0],a=e[1];return r<i?(i=us(r,i),s=t(a,s)):(i=us(i,r),s=t(s,a)),function(o){return s(i(o))}}function Lc(n,e,t){var i=Math.min(n.length,e.length)-1,r=new Array(i),s=new Array(i),a=-1;for(n[i]<n[0]&&(n=n.slice().reverse(),e=e.slice().reverse());++a<i;)r[a]=us(n[a],n[a+1]),s[a]=t(e[a],e[a+1]);return function(o){var c=rc(n,o,1,i)-1;return s[c](r[c](o))}}function Xo(n,e){return e.domain(n.domain()).range(n.range()).interpolate(n.interpolate()).clamp(n.clamp()).unknown(n.unknown())}function qo(){var n=Da,e=Da,t=wr,i,r,s,a=It,o,c,l;function h(){var d=Math.min(n.length,e.length);return a!==It&&(a=Pc(n[0],n[d-1])),o=d>2?Lc:Dc,c=l=null,u}function u(d){return d==null||isNaN(d=+d)?s:(c||(c=o(n.map(i),e,t)))(i(a(d)))}return u.invert=function(d){return a(r((l||(l=o(e,n.map(i),ls)))(d)))},u.domain=function(d){return arguments.length?(n=Array.from(d,Cc),h()):n.slice()},u.range=function(d){return arguments.length?(e=Array.from(d),h()):e.slice()},u.rangeRound=function(d){return e=Array.from(d),t=Ho,h()},u.clamp=function(d){return arguments.length?(a=d?!0:It,h()):a!==It},u.interpolate=function(d){return arguments.length?(t=d,h()):t},u.unknown=function(d){return arguments.length?(s=d,u):s},function(d,m){return i=d,r=m,h()}}function Uc(){return qo()(It,It)}function Ic(n,e,t,i){var r=cc(n,e,t),s;switch(i=yr(i??",f"),i.type){case"s":{var a=Math.max(Math.abs(n),Math.abs(e));return i.precision==null&&!isNaN(s=bc(r,a))&&(i.precision=s),ko(i,a)}case"":case"e":case"g":case"p":case"r":{i.precision==null&&!isNaN(s=Ac(r,Math.max(Math.abs(n),Math.abs(e))))&&(i.precision=s-(i.type==="e"));break}case"f":case"%":{i.precision==null&&!isNaN(s=Tc(r))&&(i.precision=s-(i.type==="%")*2);break}}return Go(i)}function na(n){var e=n.domain;return n.ticks=function(t){var i=e();return lc(i[0],i[i.length-1],t??10)},n.tickFormat=function(t,i){var r=e();return Ic(r[0],r[r.length-1],t??10,i)},n.nice=function(t){t==null&&(t=10);var i=e(),r=0,s=i.length-1,a=i[r],o=i[s],c,l,h=10;for(o<a&&(l=a,a=o,o=l,l=r,r=s,s=l);h-- >0;){if(l=cs(a,o,t),l===c)return i[r]=a,i[s]=o,e(i);if(l>0)a=Math.floor(a/l)*l,o=Math.ceil(o/l)*l;else if(l<0)a=Math.ceil(a*l)/l,o=Math.floor(o*l)/l;else break;c=l}return n},n}function On(){var n=Uc();return n.copy=function(){return Xo(n,On())},Wo.apply(n,arguments),na(n)}function La(n){return function(e){return e<0?-Math.pow(-e,n):Math.pow(e,n)}}function Nc(n){return n<0?-Math.sqrt(-n):Math.sqrt(n)}function Fc(n){return n<0?-n*n:n*n}function Oc(n){var e=n(It,It),t=1;function i(){return t===1?n(It,It):t===.5?n(Nc,Fc):n(La(t),La(1/t))}return e.exponent=function(r){return arguments.length?(t=+r,i()):t},na(e)}function Yo(){var n=Oc(qo());return n.copy=function(){return Xo(n,Yo()).exponent(n.exponent())},Wo.apply(n,arguments),n}function Bc(){var n=0,e=1,t,i,r,s,a=It,o=!1,c;function l(u){return u==null||isNaN(u=+u)?c:a(r===0?.5:(u=(s(u)-t)*r,o?Math.max(0,Math.min(1,u)):u))}l.domain=function(u){return arguments.length?([n,e]=u,t=s(n=+n),i=s(e=+e),r=t===i?0:1/(i-t),l):[n,e]},l.clamp=function(u){return arguments.length?(o=!!u,l):o},l.interpolator=function(u){return arguments.length?(a=u,l):a};function h(u){return function(d){var m,g;return arguments.length?([m,g]=d,a=u(m,g),l):[a(0),a(1)]}}return l.range=h(wr),l.rangeRound=h(Ho),l.unknown=function(u){return arguments.length?(c=u,l):c},function(u){return s=u,t=u(n),i=u(e),r=t===i?0:1/(i-t),l}}function zc(n,e){return e.domain(n.domain()).interpolator(n.interpolator()).clamp(n.clamp()).unknown(n.unknown())}function $o(){var n=na(Bc()(It));return n.copy=function(){return zc(n,$o())},wc.apply(n,arguments)}function Hc(n){for(var e=n.length/6|0,t=new Array(e),i=0;i<e;)t[i]="#"+n.slice(i*6,++i*6);return t}const Vc=n=>Jl(n[n.length-1]);var Gc=new Array(3).concat("ffeda0feb24cf03b20","ffffb2fecc5cfd8d3ce31a1c","ffffb2fecc5cfd8d3cf03b20bd0026","ffffb2fed976feb24cfd8d3cf03b20bd0026","ffffb2fed976feb24cfd8d3cfc4e2ae31a1cb10026","ffffccffeda0fed976feb24cfd8d3cfc4e2ae31a1cb10026","ffffccffeda0fed976feb24cfd8d3cfc4e2ae31a1cbd0026800026").map(Hc);const kc=Vc(Gc),Wc={name:"TestimonialCards",components:{SvgIcon:Uo},props:{index:{type:Number,required:!0,default:0},card:{type:Object,required:!0,default:()=>({})}},data(){return{mdiFormatQuoteOpenPath:Bl,mdiFormatQuoteClosePath:Ol}},computed:{},mounted(){}},Xc={class:"text-body-1 text-black"},qc=["innerHTML"],Yc=["innerHTML"];function $c(n,e,t,i,r,s){const a=Gl("svg-icon");return St(),Hn(ea,{class:"pa-6 px-10 fill-height justify-start mb-2",variant:"tonal",color:"secondary-lighten-3"},{default:Xe(()=>[Ue(Qs,null,{default:Xe(()=>[ct("p",Xc,[Ue(a,{size:"34",type:"mdi",path:r.mdiFormatQuoteOpenPath,class:"text-secondary"},null,8,["path"]),Ht(" "+Vn(t.card.quote)+" ",1),Ue(a,{size:"34",type:"mdi",path:r.mdiFormatQuoteClosePath,class:"text-secondary",style:{float:"right"}},null,8,["path"])]),ct("p",{class:"text-body-2 mb-0 font-weight-bold text-secondary-darken-2",innerHTML:t.card.author},null,8,qc),ct("p",{class:"text-body-2 mb-0 mt-0 text-grey-darken-1",innerHTML:t.card.company},null,8,Yc)]),_:1})]),_:1})}const Zc=Fi(Wc,[["render",$c],["__scopeId","data-v-65070435"]]),Kc={name:"SectionTitle",props:{},data(){return{}},methods:{},watch:{}},jc={class:"text-h2 font-weight-bold section-title"};function Jc(n,e,t,i,r,s){return St(),Sn("h2",jc,[kl(n.$slots,"default",{},void 0)])}const Qc=Fi(Kc,[["render",Jc],["__scopeId","data-v-def9f74c"]]),eu={name:"OurPortal",props:{},data(){return{overline:"Our Portal",title:"Explore and discover",body:"Securely browse and discover insights from your screening results with interactive visualizations.",button:{text:"PRISM portal",link:"https://theprismlab.org/portal/projects"},image:"macbook-portal-01.png"}},computed:{imgPath(){return"/images/"}},mounted(){}},tu={class:"background"},nu={class:"text-h3 font-weight-bold"},iu={class:"text-body-1"};function ru(n,e,t,i,r,s){const a=No;return St(),Sn("div",tu,[Ue(a,{class:"py-8"},{default:Xe(()=>[Ue(Ui,{class:"d-flex align-center justify-center"},{default:Xe(()=>[Ue(Gn,{cols:"11",xs:"11",sm:"5",md:"5",lg:"5"},{default:Xe(()=>[Ue(Fo,{class:"align-end",src:`${s.imgPath}${r.image}`,width:"100%"},null,8,["src"])]),_:1}),Ue(Gn,null,{default:Xe(()=>[Ue(ea,{variant:"transparent"},{default:Xe(()=>[Ue(Qs,null,{default:Xe(()=>[ct("h3",nu,Vn(r.title),1),ct("p",iu,Vn(r.body),1),Ue($l,{href:r.button.link,target:"_blank",color:"white",variant:"outlined",rounded:""},{default:Xe(()=>[Ht(Vn(r.button.text)+" ",1),Ue(Oo,{right:""},{default:Xe(()=>e[0]||(e[0]=[Ht("mdi-chevron-right")])),_:1})]),_:1},8,["href"])]),_:1})]),_:1})]),_:1})]),_:1})]),_:1})])}const su=Fi(eu,[["render",ru],["__scopeId","data-v-e2ccc8d7"]]),au={name:"MainVisual",data(){return{}},computed:{imgPath(){return"/images/"},cards(){return[{img:`${this.imgPath}main-11.png`,title:"900+ genomically diverse barcoded and pooled cell lines",description:"Hematopoietic and solid tumor, covering 80 cancer subtypes",action:{text:"Learn more",url:"/consortium-screens/cell-line-collection",target:"_self"}},{img:`${this.imgPath}main-12.png`,title:"150K+ unique baseline genetic and functional genomic features",description:"Features from the Dependency Map are correlated with the PRISM viability profile using univariate and multivariate predictive models",action:{text:"Learn more",url:"https://depmap.org/portal/",target:"_blank"}},{img:`${this.imgPath}main-13.png`,title:"Identify target and patient population of your drug",description:"Confirm hypothesis and establish biomarkers of sensitivity and resistance",action:{text:"Learn more",url:"/consortium-screens/data-analysis",target:"_self"}}]}},mounted(){}},ou={class:"background py-12"},lu={class:"text-h5 text-black"},cu={class:"text-body-2 mb-2"},uu=["href","target"];function hu(n,e,t,i,r,s){const a=No;return St(),Sn("div",ou,[Ue(a,null,{default:Xe(()=>[Ue(Ui,{justify:"space-evenly"},{default:Xe(()=>[(St(!0),Sn(Li,null,os(s.cards,(o,c)=>(St(),Hn(Gn,{key:c,cols:"12",xs:"12",sm:"12",md:"4",lg:"4"},{default:Xe(()=>[Ue(ea,{class:"pa-4 fill-height",variant:"flat"},{default:Xe(()=>[Ue(Ui,{"no-gutters":""},{default:Xe(()=>[Ue(Gn,{cols:"5",xs:"5",sm:"5",md:"12",lg:"12",xl:"12"},{default:Xe(()=>[Ue(Fo,{style:{margin:"auto"},src:o.img,width:"100%","max-width":"250px"},null,8,["src"])]),_:2},1024),Ue(Gn,null,{default:Xe(()=>[Ue(Qs,null,{default:Xe(()=>[ct("h4",lu,Vn(o.title),1),ct("p",cu,Vn(o.description),1),ct("a",{class:"v-btn v-btn--size-default pa-0",href:o.action.url,target:o.action.target},[Ht(Vn(o.action.text)+" ",1),Ue(Oo,{right:""},{default:Xe(()=>e[0]||(e[0]=[Ht("mdi-chevron-right")])),_:1})],8,uu)]),_:2},1024)]),_:2},1024)]),_:2},1024)]),_:2},1024)]),_:2},1024))),128))]),_:1})]),_:1})])}const fu=Fi(au,[["render",hu],["__scopeId","data-v-780c6896"]]),du={fileName:"BRD-K05804044-viability-heatmap.csv",minCellLine:300,colorInterpolator:kc,colorDomain:[1,.2],fov:25,cameraDistance:25,cameraPosition:[0,4.5,25],cameraLookAt:[0,6.5,0],nearClip:1.01,farClip:200,directionalLightIntensity:.5,ambientLightIntensity:2.5,planeZoom:10.8,planeWidthMultiplier:1.6,planeYPosition:1,planeOpacityRange:[.5,1],sphereXStep:8,sphereZStep:2,sphereBaseRadiusMultiplier:.018,sphereSizeScaleRange:[1,.3],sphereOpacityRange:[.7,.15],sphereRadiusScaleRange:[1.5,.2],sphereFloatSpeedMin:.4,sphereFloatSpeedRange:.4,sphereFloatAmplitudeBase:.08,sphereFloatAmplitudeRange:.06,ySpread:12,ySpreadOffset:10};/**
 * @license
 * Copyright 2010-2025 Three.js Authors
 * SPDX-License-Identifier: MIT
 */const ia="173",pu=0,Ua=1,mu=2,Zo=1,_u=2,$t=3,En=0,yt=1,Kt=2,xn=0,ci=1,Ia=2,Na=3,Fa=4,gu=5,Nn=100,vu=101,xu=102,Mu=103,Su=104,Eu=200,yu=201,Tu=202,bu=203,hs=204,fs=205,Au=206,wu=207,Ru=208,Cu=209,Pu=210,Du=211,Lu=212,Uu=213,Iu=214,ds=0,ps=1,ms=2,di=3,_s=4,gs=5,vs=6,xs=7,ra=0,Nu=1,Fu=2,Mn=0,Ou=1,Bu=2,zu=3,Hu=4,Vu=5,Gu=6,ku=7,Ko=300,pi=301,mi=302,Ms=303,Ss=304,Rr=306,Es=1e3,Bn=1001,ys=1002,qt=1003,Wu=1004,Xi=1005,jt=1006,Lr=1007,zn=1008,un=1009,jo=1010,Jo=1011,Ii=1012,sa=1013,kn=1014,on=1015,Oi=1016,aa=1017,oa=1018,_i=1020,Qo=35902,el=1021,tl=1022,Wt=1023,nl=1024,il=1025,ui=1026,gi=1027,rl=1028,la=1029,sl=1030,ca=1031,ua=1033,mr=33776,_r=33777,gr=33778,vr=33779,Ts=35840,bs=35841,As=35842,ws=35843,Rs=36196,Cs=37492,Ps=37496,Ds=37808,Ls=37809,Us=37810,Is=37811,Ns=37812,Fs=37813,Os=37814,Bs=37815,zs=37816,Hs=37817,Vs=37818,Gs=37819,ks=37820,Ws=37821,xr=36492,Xs=36494,qs=36495,al=36283,Ys=36284,$s=36285,Zs=36286,Xu=3200,qu=3201,ha=0,Yu=1,gn="",Lt="srgb",vi="srgb-linear",Tr="linear",Ke="srgb",qn=7680,Oa=519,$u=512,Zu=513,Ku=514,ol=515,ju=516,Ju=517,Qu=518,eh=519,Ba=35044,za="300 es",ln=2e3,br=2001;class Mi{addEventListener(e,t){this._listeners===void 0&&(this._listeners={});const i=this._listeners;i[e]===void 0&&(i[e]=[]),i[e].indexOf(t)===-1&&i[e].push(t)}hasEventListener(e,t){const i=this._listeners;return i===void 0?!1:i[e]!==void 0&&i[e].indexOf(t)!==-1}removeEventListener(e,t){const i=this._listeners;if(i===void 0)return;const r=i[e];if(r!==void 0){const s=r.indexOf(t);s!==-1&&r.splice(s,1)}}dispatchEvent(e){const t=this._listeners;if(t===void 0)return;const i=t[e.type];if(i!==void 0){e.target=this;const r=i.slice(0);for(let s=0,a=r.length;s<a;s++)r[s].call(this,e);e.target=null}}}const mt=["00","01","02","03","04","05","06","07","08","09","0a","0b","0c","0d","0e","0f","10","11","12","13","14","15","16","17","18","19","1a","1b","1c","1d","1e","1f","20","21","22","23","24","25","26","27","28","29","2a","2b","2c","2d","2e","2f","30","31","32","33","34","35","36","37","38","39","3a","3b","3c","3d","3e","3f","40","41","42","43","44","45","46","47","48","49","4a","4b","4c","4d","4e","4f","50","51","52","53","54","55","56","57","58","59","5a","5b","5c","5d","5e","5f","60","61","62","63","64","65","66","67","68","69","6a","6b","6c","6d","6e","6f","70","71","72","73","74","75","76","77","78","79","7a","7b","7c","7d","7e","7f","80","81","82","83","84","85","86","87","88","89","8a","8b","8c","8d","8e","8f","90","91","92","93","94","95","96","97","98","99","9a","9b","9c","9d","9e","9f","a0","a1","a2","a3","a4","a5","a6","a7","a8","a9","aa","ab","ac","ad","ae","af","b0","b1","b2","b3","b4","b5","b6","b7","b8","b9","ba","bb","bc","bd","be","bf","c0","c1","c2","c3","c4","c5","c6","c7","c8","c9","ca","cb","cc","cd","ce","cf","d0","d1","d2","d3","d4","d5","d6","d7","d8","d9","da","db","dc","dd","de","df","e0","e1","e2","e3","e4","e5","e6","e7","e8","e9","ea","eb","ec","ed","ee","ef","f0","f1","f2","f3","f4","f5","f6","f7","f8","f9","fa","fb","fc","fd","fe","ff"];let Ha=1234567;const Pi=Math.PI/180,Ni=180/Math.PI;function Si(){const n=Math.random()*4294967295|0,e=Math.random()*4294967295|0,t=Math.random()*4294967295|0,i=Math.random()*4294967295|0;return(mt[n&255]+mt[n>>8&255]+mt[n>>16&255]+mt[n>>24&255]+"-"+mt[e&255]+mt[e>>8&255]+"-"+mt[e>>16&15|64]+mt[e>>24&255]+"-"+mt[t&63|128]+mt[t>>8&255]+"-"+mt[t>>16&255]+mt[t>>24&255]+mt[i&255]+mt[i>>8&255]+mt[i>>16&255]+mt[i>>24&255]).toLowerCase()}function Ie(n,e,t){return Math.max(e,Math.min(t,n))}function fa(n,e){return(n%e+e)%e}function th(n,e,t,i,r){return i+(n-e)*(r-i)/(t-e)}function nh(n,e,t){return n!==e?(t-n)/(e-n):0}function Di(n,e,t){return(1-t)*n+t*e}function ih(n,e,t,i){return Di(n,e,1-Math.exp(-t*i))}function rh(n,e=1){return e-Math.abs(fa(n,e*2)-e)}function sh(n,e,t){return n<=e?0:n>=t?1:(n=(n-e)/(t-e),n*n*(3-2*n))}function ah(n,e,t){return n<=e?0:n>=t?1:(n=(n-e)/(t-e),n*n*n*(n*(n*6-15)+10))}function oh(n,e){return n+Math.floor(Math.random()*(e-n+1))}function lh(n,e){return n+Math.random()*(e-n)}function ch(n){return n*(.5-Math.random())}function uh(n){n!==void 0&&(Ha=n);let e=Ha+=1831565813;return e=Math.imul(e^e>>>15,e|1),e^=e+Math.imul(e^e>>>7,e|61),((e^e>>>14)>>>0)/4294967296}function hh(n){return n*Pi}function fh(n){return n*Ni}function dh(n){return(n&n-1)===0&&n!==0}function ph(n){return Math.pow(2,Math.ceil(Math.log(n)/Math.LN2))}function mh(n){return Math.pow(2,Math.floor(Math.log(n)/Math.LN2))}function _h(n,e,t,i,r){const s=Math.cos,a=Math.sin,o=s(t/2),c=a(t/2),l=s((e+i)/2),h=a((e+i)/2),u=s((e-i)/2),d=a((e-i)/2),m=s((i-e)/2),g=a((i-e)/2);switch(r){case"XYX":n.set(o*h,c*u,c*d,o*l);break;case"YZY":n.set(c*d,o*h,c*u,o*l);break;case"ZXZ":n.set(c*u,c*d,o*h,o*l);break;case"XZX":n.set(o*h,c*g,c*m,o*l);break;case"YXY":n.set(c*m,o*h,c*g,o*l);break;case"ZYZ":n.set(c*g,c*m,o*h,o*l);break;default:console.warn("THREE.MathUtils: .setQuaternionFromProperEuler() encountered an unknown order: "+r)}}function ai(n,e){switch(e.constructor){case Float32Array:return n;case Uint32Array:return n/4294967295;case Uint16Array:return n/65535;case Uint8Array:return n/255;case Int32Array:return Math.max(n/2147483647,-1);case Int16Array:return Math.max(n/32767,-1);case Int8Array:return Math.max(n/127,-1);default:throw new Error("Invalid component type.")}}function xt(n,e){switch(e.constructor){case Float32Array:return n;case Uint32Array:return Math.round(n*4294967295);case Uint16Array:return Math.round(n*65535);case Uint8Array:return Math.round(n*255);case Int32Array:return Math.round(n*2147483647);case Int16Array:return Math.round(n*32767);case Int8Array:return Math.round(n*127);default:throw new Error("Invalid component type.")}}const gh={DEG2RAD:Pi,RAD2DEG:Ni,generateUUID:Si,clamp:Ie,euclideanModulo:fa,mapLinear:th,inverseLerp:nh,lerp:Di,damp:ih,pingpong:rh,smoothstep:sh,smootherstep:ah,randInt:oh,randFloat:lh,randFloatSpread:ch,seededRandom:uh,degToRad:hh,radToDeg:fh,isPowerOfTwo:dh,ceilPowerOfTwo:ph,floorPowerOfTwo:mh,setQuaternionFromProperEuler:_h,normalize:xt,denormalize:ai};class qe{constructor(e=0,t=0){qe.prototype.isVector2=!0,this.x=e,this.y=t}get width(){return this.x}set width(e){this.x=e}get height(){return this.y}set height(e){this.y=e}set(e,t){return this.x=e,this.y=t,this}setScalar(e){return this.x=e,this.y=e,this}setX(e){return this.x=e,this}setY(e){return this.y=e,this}setComponent(e,t){switch(e){case 0:this.x=t;break;case 1:this.y=t;break;default:throw new Error("index is out of range: "+e)}return this}getComponent(e){switch(e){case 0:return this.x;case 1:return this.y;default:throw new Error("index is out of range: "+e)}}clone(){return new this.constructor(this.x,this.y)}copy(e){return this.x=e.x,this.y=e.y,this}add(e){return this.x+=e.x,this.y+=e.y,this}addScalar(e){return this.x+=e,this.y+=e,this}addVectors(e,t){return this.x=e.x+t.x,this.y=e.y+t.y,this}addScaledVector(e,t){return this.x+=e.x*t,this.y+=e.y*t,this}sub(e){return this.x-=e.x,this.y-=e.y,this}subScalar(e){return this.x-=e,this.y-=e,this}subVectors(e,t){return this.x=e.x-t.x,this.y=e.y-t.y,this}multiply(e){return this.x*=e.x,this.y*=e.y,this}multiplyScalar(e){return this.x*=e,this.y*=e,this}divide(e){return this.x/=e.x,this.y/=e.y,this}divideScalar(e){return this.multiplyScalar(1/e)}applyMatrix3(e){const t=this.x,i=this.y,r=e.elements;return this.x=r[0]*t+r[3]*i+r[6],this.y=r[1]*t+r[4]*i+r[7],this}min(e){return this.x=Math.min(this.x,e.x),this.y=Math.min(this.y,e.y),this}max(e){return this.x=Math.max(this.x,e.x),this.y=Math.max(this.y,e.y),this}clamp(e,t){return this.x=Ie(this.x,e.x,t.x),this.y=Ie(this.y,e.y,t.y),this}clampScalar(e,t){return this.x=Ie(this.x,e,t),this.y=Ie(this.y,e,t),this}clampLength(e,t){const i=this.length();return this.divideScalar(i||1).multiplyScalar(Ie(i,e,t))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this}negate(){return this.x=-this.x,this.y=-this.y,this}dot(e){return this.x*e.x+this.y*e.y}cross(e){return this.x*e.y-this.y*e.x}lengthSq(){return this.x*this.x+this.y*this.y}length(){return Math.sqrt(this.x*this.x+this.y*this.y)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)}normalize(){return this.divideScalar(this.length()||1)}angle(){return Math.atan2(-this.y,-this.x)+Math.PI}angleTo(e){const t=Math.sqrt(this.lengthSq()*e.lengthSq());if(t===0)return Math.PI/2;const i=this.dot(e)/t;return Math.acos(Ie(i,-1,1))}distanceTo(e){return Math.sqrt(this.distanceToSquared(e))}distanceToSquared(e){const t=this.x-e.x,i=this.y-e.y;return t*t+i*i}manhattanDistanceTo(e){return Math.abs(this.x-e.x)+Math.abs(this.y-e.y)}setLength(e){return this.normalize().multiplyScalar(e)}lerp(e,t){return this.x+=(e.x-this.x)*t,this.y+=(e.y-this.y)*t,this}lerpVectors(e,t,i){return this.x=e.x+(t.x-e.x)*i,this.y=e.y+(t.y-e.y)*i,this}equals(e){return e.x===this.x&&e.y===this.y}fromArray(e,t=0){return this.x=e[t],this.y=e[t+1],this}toArray(e=[],t=0){return e[t]=this.x,e[t+1]=this.y,e}fromBufferAttribute(e,t){return this.x=e.getX(t),this.y=e.getY(t),this}rotateAround(e,t){const i=Math.cos(t),r=Math.sin(t),s=this.x-e.x,a=this.y-e.y;return this.x=s*i-a*r+e.x,this.y=s*r+a*i+e.y,this}random(){return this.x=Math.random(),this.y=Math.random(),this}*[Symbol.iterator](){yield this.x,yield this.y}}class Ce{constructor(e,t,i,r,s,a,o,c,l){Ce.prototype.isMatrix3=!0,this.elements=[1,0,0,0,1,0,0,0,1],e!==void 0&&this.set(e,t,i,r,s,a,o,c,l)}set(e,t,i,r,s,a,o,c,l){const h=this.elements;return h[0]=e,h[1]=r,h[2]=o,h[3]=t,h[4]=s,h[5]=c,h[6]=i,h[7]=a,h[8]=l,this}identity(){return this.set(1,0,0,0,1,0,0,0,1),this}copy(e){const t=this.elements,i=e.elements;return t[0]=i[0],t[1]=i[1],t[2]=i[2],t[3]=i[3],t[4]=i[4],t[5]=i[5],t[6]=i[6],t[7]=i[7],t[8]=i[8],this}extractBasis(e,t,i){return e.setFromMatrix3Column(this,0),t.setFromMatrix3Column(this,1),i.setFromMatrix3Column(this,2),this}setFromMatrix4(e){const t=e.elements;return this.set(t[0],t[4],t[8],t[1],t[5],t[9],t[2],t[6],t[10]),this}multiply(e){return this.multiplyMatrices(this,e)}premultiply(e){return this.multiplyMatrices(e,this)}multiplyMatrices(e,t){const i=e.elements,r=t.elements,s=this.elements,a=i[0],o=i[3],c=i[6],l=i[1],h=i[4],u=i[7],d=i[2],m=i[5],g=i[8],M=r[0],p=r[3],f=r[6],w=r[1],T=r[4],E=r[7],C=r[2],A=r[5],P=r[8];return s[0]=a*M+o*w+c*C,s[3]=a*p+o*T+c*A,s[6]=a*f+o*E+c*P,s[1]=l*M+h*w+u*C,s[4]=l*p+h*T+u*A,s[7]=l*f+h*E+u*P,s[2]=d*M+m*w+g*C,s[5]=d*p+m*T+g*A,s[8]=d*f+m*E+g*P,this}multiplyScalar(e){const t=this.elements;return t[0]*=e,t[3]*=e,t[6]*=e,t[1]*=e,t[4]*=e,t[7]*=e,t[2]*=e,t[5]*=e,t[8]*=e,this}determinant(){const e=this.elements,t=e[0],i=e[1],r=e[2],s=e[3],a=e[4],o=e[5],c=e[6],l=e[7],h=e[8];return t*a*h-t*o*l-i*s*h+i*o*c+r*s*l-r*a*c}invert(){const e=this.elements,t=e[0],i=e[1],r=e[2],s=e[3],a=e[4],o=e[5],c=e[6],l=e[7],h=e[8],u=h*a-o*l,d=o*c-h*s,m=l*s-a*c,g=t*u+i*d+r*m;if(g===0)return this.set(0,0,0,0,0,0,0,0,0);const M=1/g;return e[0]=u*M,e[1]=(r*l-h*i)*M,e[2]=(o*i-r*a)*M,e[3]=d*M,e[4]=(h*t-r*c)*M,e[5]=(r*s-o*t)*M,e[6]=m*M,e[7]=(i*c-l*t)*M,e[8]=(a*t-i*s)*M,this}transpose(){let e;const t=this.elements;return e=t[1],t[1]=t[3],t[3]=e,e=t[2],t[2]=t[6],t[6]=e,e=t[5],t[5]=t[7],t[7]=e,this}getNormalMatrix(e){return this.setFromMatrix4(e).invert().transpose()}transposeIntoArray(e){const t=this.elements;return e[0]=t[0],e[1]=t[3],e[2]=t[6],e[3]=t[1],e[4]=t[4],e[5]=t[7],e[6]=t[2],e[7]=t[5],e[8]=t[8],this}setUvTransform(e,t,i,r,s,a,o){const c=Math.cos(s),l=Math.sin(s);return this.set(i*c,i*l,-i*(c*a+l*o)+a+e,-r*l,r*c,-r*(-l*a+c*o)+o+t,0,0,1),this}scale(e,t){return this.premultiply(Ur.makeScale(e,t)),this}rotate(e){return this.premultiply(Ur.makeRotation(-e)),this}translate(e,t){return this.premultiply(Ur.makeTranslation(e,t)),this}makeTranslation(e,t){return e.isVector2?this.set(1,0,e.x,0,1,e.y,0,0,1):this.set(1,0,e,0,1,t,0,0,1),this}makeRotation(e){const t=Math.cos(e),i=Math.sin(e);return this.set(t,-i,0,i,t,0,0,0,1),this}makeScale(e,t){return this.set(e,0,0,0,t,0,0,0,1),this}equals(e){const t=this.elements,i=e.elements;for(let r=0;r<9;r++)if(t[r]!==i[r])return!1;return!0}fromArray(e,t=0){for(let i=0;i<9;i++)this.elements[i]=e[i+t];return this}toArray(e=[],t=0){const i=this.elements;return e[t]=i[0],e[t+1]=i[1],e[t+2]=i[2],e[t+3]=i[3],e[t+4]=i[4],e[t+5]=i[5],e[t+6]=i[6],e[t+7]=i[7],e[t+8]=i[8],e}clone(){return new this.constructor().fromArray(this.elements)}}const Ur=new Ce;function ll(n){for(let e=n.length-1;e>=0;--e)if(n[e]>=65535)return!0;return!1}function Ar(n){return document.createElementNS("http://www.w3.org/1999/xhtml",n)}function vh(){const n=Ar("canvas");return n.style.display="block",n}const Va={};function oi(n){n in Va||(Va[n]=!0,console.warn(n))}function xh(n,e,t){return new Promise(function(i,r){function s(){switch(n.clientWaitSync(e,n.SYNC_FLUSH_COMMANDS_BIT,0)){case n.WAIT_FAILED:r();break;case n.TIMEOUT_EXPIRED:setTimeout(s,t);break;default:i()}}setTimeout(s,t)})}function Mh(n){const e=n.elements;e[2]=.5*e[2]+.5*e[3],e[6]=.5*e[6]+.5*e[7],e[10]=.5*e[10]+.5*e[11],e[14]=.5*e[14]+.5*e[15]}function Sh(n){const e=n.elements;e[11]===-1?(e[10]=-e[10]-1,e[14]=-e[14]):(e[10]=-e[10],e[14]=-e[14]+1)}const Ga=new Ce().set(.4123908,.3575843,.1804808,.212639,.7151687,.0721923,.0193308,.1191948,.9505322),ka=new Ce().set(3.2409699,-1.5373832,-.4986108,-.9692436,1.8759675,.0415551,.0556301,-.203977,1.0569715);function Eh(){const n={enabled:!0,workingColorSpace:vi,spaces:{},convert:function(r,s,a){return this.enabled===!1||s===a||!s||!a||(this.spaces[s].transfer===Ke&&(r.r=cn(r.r),r.g=cn(r.g),r.b=cn(r.b)),this.spaces[s].primaries!==this.spaces[a].primaries&&(r.applyMatrix3(this.spaces[s].toXYZ),r.applyMatrix3(this.spaces[a].fromXYZ)),this.spaces[a].transfer===Ke&&(r.r=hi(r.r),r.g=hi(r.g),r.b=hi(r.b))),r},fromWorkingColorSpace:function(r,s){return this.convert(r,this.workingColorSpace,s)},toWorkingColorSpace:function(r,s){return this.convert(r,s,this.workingColorSpace)},getPrimaries:function(r){return this.spaces[r].primaries},getTransfer:function(r){return r===gn?Tr:this.spaces[r].transfer},getLuminanceCoefficients:function(r,s=this.workingColorSpace){return r.fromArray(this.spaces[s].luminanceCoefficients)},define:function(r){Object.assign(this.spaces,r)},_getMatrix:function(r,s,a){return r.copy(this.spaces[s].toXYZ).multiply(this.spaces[a].fromXYZ)},_getDrawingBufferColorSpace:function(r){return this.spaces[r].outputColorSpaceConfig.drawingBufferColorSpace},_getUnpackColorSpace:function(r=this.workingColorSpace){return this.spaces[r].workingColorSpaceConfig.unpackColorSpace}},e=[.64,.33,.3,.6,.15,.06],t=[.2126,.7152,.0722],i=[.3127,.329];return n.define({[vi]:{primaries:e,whitePoint:i,transfer:Tr,toXYZ:Ga,fromXYZ:ka,luminanceCoefficients:t,workingColorSpaceConfig:{unpackColorSpace:Lt},outputColorSpaceConfig:{drawingBufferColorSpace:Lt}},[Lt]:{primaries:e,whitePoint:i,transfer:Ke,toXYZ:Ga,fromXYZ:ka,luminanceCoefficients:t,outputColorSpaceConfig:{drawingBufferColorSpace:Lt}}}),n}const ke=Eh();function cn(n){return n<.04045?n*.0773993808:Math.pow(n*.9478672986+.0521327014,2.4)}function hi(n){return n<.0031308?n*12.92:1.055*Math.pow(n,.41666)-.055}let Yn;class yh{static getDataURL(e){if(/^data:/i.test(e.src)||typeof HTMLCanvasElement>"u")return e.src;let t;if(e instanceof HTMLCanvasElement)t=e;else{Yn===void 0&&(Yn=Ar("canvas")),Yn.width=e.width,Yn.height=e.height;const i=Yn.getContext("2d");e instanceof ImageData?i.putImageData(e,0,0):i.drawImage(e,0,0,e.width,e.height),t=Yn}return t.toDataURL("image/png")}static sRGBToLinear(e){if(typeof HTMLImageElement<"u"&&e instanceof HTMLImageElement||typeof HTMLCanvasElement<"u"&&e instanceof HTMLCanvasElement||typeof ImageBitmap<"u"&&e instanceof ImageBitmap){const t=Ar("canvas");t.width=e.width,t.height=e.height;const i=t.getContext("2d");i.drawImage(e,0,0,e.width,e.height);const r=i.getImageData(0,0,e.width,e.height),s=r.data;for(let a=0;a<s.length;a++)s[a]=cn(s[a]/255)*255;return i.putImageData(r,0,0),t}else if(e.data){const t=e.data.slice(0);for(let i=0;i<t.length;i++)t instanceof Uint8Array||t instanceof Uint8ClampedArray?t[i]=Math.floor(cn(t[i]/255)*255):t[i]=cn(t[i]);return{data:t,width:e.width,height:e.height}}else return console.warn("THREE.ImageUtils.sRGBToLinear(): Unsupported image type. No color space conversion applied."),e}}let Th=0;class cl{constructor(e=null){this.isSource=!0,Object.defineProperty(this,"id",{value:Th++}),this.uuid=Si(),this.data=e,this.dataReady=!0,this.version=0}set needsUpdate(e){e===!0&&this.version++}toJSON(e){const t=e===void 0||typeof e=="string";if(!t&&e.images[this.uuid]!==void 0)return e.images[this.uuid];const i={uuid:this.uuid,url:""},r=this.data;if(r!==null){let s;if(Array.isArray(r)){s=[];for(let a=0,o=r.length;a<o;a++)r[a].isDataTexture?s.push(Ir(r[a].image)):s.push(Ir(r[a]))}else s=Ir(r);i.url=s}return t||(e.images[this.uuid]=i),i}}function Ir(n){return typeof HTMLImageElement<"u"&&n instanceof HTMLImageElement||typeof HTMLCanvasElement<"u"&&n instanceof HTMLCanvasElement||typeof ImageBitmap<"u"&&n instanceof ImageBitmap?yh.getDataURL(n):n.data?{data:Array.from(n.data),width:n.width,height:n.height,type:n.data.constructor.name}:(console.warn("THREE.Texture: Unable to serialize Texture."),{})}let bh=0;class Tt extends Mi{constructor(e=Tt.DEFAULT_IMAGE,t=Tt.DEFAULT_MAPPING,i=Bn,r=Bn,s=jt,a=zn,o=Wt,c=un,l=Tt.DEFAULT_ANISOTROPY,h=gn){super(),this.isTexture=!0,Object.defineProperty(this,"id",{value:bh++}),this.uuid=Si(),this.name="",this.source=new cl(e),this.mipmaps=[],this.mapping=t,this.channel=0,this.wrapS=i,this.wrapT=r,this.magFilter=s,this.minFilter=a,this.anisotropy=l,this.format=o,this.internalFormat=null,this.type=c,this.offset=new qe(0,0),this.repeat=new qe(1,1),this.center=new qe(0,0),this.rotation=0,this.matrixAutoUpdate=!0,this.matrix=new Ce,this.generateMipmaps=!0,this.premultiplyAlpha=!1,this.flipY=!0,this.unpackAlignment=4,this.colorSpace=h,this.userData={},this.version=0,this.onUpdate=null,this.renderTarget=null,this.isRenderTargetTexture=!1,this.pmremVersion=0}get image(){return this.source.data}set image(e=null){this.source.data=e}updateMatrix(){this.matrix.setUvTransform(this.offset.x,this.offset.y,this.repeat.x,this.repeat.y,this.rotation,this.center.x,this.center.y)}clone(){return new this.constructor().copy(this)}copy(e){return this.name=e.name,this.source=e.source,this.mipmaps=e.mipmaps.slice(0),this.mapping=e.mapping,this.channel=e.channel,this.wrapS=e.wrapS,this.wrapT=e.wrapT,this.magFilter=e.magFilter,this.minFilter=e.minFilter,this.anisotropy=e.anisotropy,this.format=e.format,this.internalFormat=e.internalFormat,this.type=e.type,this.offset.copy(e.offset),this.repeat.copy(e.repeat),this.center.copy(e.center),this.rotation=e.rotation,this.matrixAutoUpdate=e.matrixAutoUpdate,this.matrix.copy(e.matrix),this.generateMipmaps=e.generateMipmaps,this.premultiplyAlpha=e.premultiplyAlpha,this.flipY=e.flipY,this.unpackAlignment=e.unpackAlignment,this.colorSpace=e.colorSpace,this.renderTarget=e.renderTarget,this.isRenderTargetTexture=e.isRenderTargetTexture,this.userData=JSON.parse(JSON.stringify(e.userData)),this.needsUpdate=!0,this}toJSON(e){const t=e===void 0||typeof e=="string";if(!t&&e.textures[this.uuid]!==void 0)return e.textures[this.uuid];const i={metadata:{version:4.6,type:"Texture",generator:"Texture.toJSON"},uuid:this.uuid,name:this.name,image:this.source.toJSON(e).uuid,mapping:this.mapping,channel:this.channel,repeat:[this.repeat.x,this.repeat.y],offset:[this.offset.x,this.offset.y],center:[this.center.x,this.center.y],rotation:this.rotation,wrap:[this.wrapS,this.wrapT],format:this.format,internalFormat:this.internalFormat,type:this.type,colorSpace:this.colorSpace,minFilter:this.minFilter,magFilter:this.magFilter,anisotropy:this.anisotropy,flipY:this.flipY,generateMipmaps:this.generateMipmaps,premultiplyAlpha:this.premultiplyAlpha,unpackAlignment:this.unpackAlignment};return Object.keys(this.userData).length>0&&(i.userData=this.userData),t||(e.textures[this.uuid]=i),i}dispose(){this.dispatchEvent({type:"dispose"})}transformUv(e){if(this.mapping!==Ko)return e;if(e.applyMatrix3(this.matrix),e.x<0||e.x>1)switch(this.wrapS){case Es:e.x=e.x-Math.floor(e.x);break;case Bn:e.x=e.x<0?0:1;break;case ys:Math.abs(Math.floor(e.x)%2)===1?e.x=Math.ceil(e.x)-e.x:e.x=e.x-Math.floor(e.x);break}if(e.y<0||e.y>1)switch(this.wrapT){case Es:e.y=e.y-Math.floor(e.y);break;case Bn:e.y=e.y<0?0:1;break;case ys:Math.abs(Math.floor(e.y)%2)===1?e.y=Math.ceil(e.y)-e.y:e.y=e.y-Math.floor(e.y);break}return this.flipY&&(e.y=1-e.y),e}set needsUpdate(e){e===!0&&(this.version++,this.source.needsUpdate=!0)}set needsPMREMUpdate(e){e===!0&&this.pmremVersion++}}Tt.DEFAULT_IMAGE=null;Tt.DEFAULT_MAPPING=Ko;Tt.DEFAULT_ANISOTROPY=1;class rt{constructor(e=0,t=0,i=0,r=1){rt.prototype.isVector4=!0,this.x=e,this.y=t,this.z=i,this.w=r}get width(){return this.z}set width(e){this.z=e}get height(){return this.w}set height(e){this.w=e}set(e,t,i,r){return this.x=e,this.y=t,this.z=i,this.w=r,this}setScalar(e){return this.x=e,this.y=e,this.z=e,this.w=e,this}setX(e){return this.x=e,this}setY(e){return this.y=e,this}setZ(e){return this.z=e,this}setW(e){return this.w=e,this}setComponent(e,t){switch(e){case 0:this.x=t;break;case 1:this.y=t;break;case 2:this.z=t;break;case 3:this.w=t;break;default:throw new Error("index is out of range: "+e)}return this}getComponent(e){switch(e){case 0:return this.x;case 1:return this.y;case 2:return this.z;case 3:return this.w;default:throw new Error("index is out of range: "+e)}}clone(){return new this.constructor(this.x,this.y,this.z,this.w)}copy(e){return this.x=e.x,this.y=e.y,this.z=e.z,this.w=e.w!==void 0?e.w:1,this}add(e){return this.x+=e.x,this.y+=e.y,this.z+=e.z,this.w+=e.w,this}addScalar(e){return this.x+=e,this.y+=e,this.z+=e,this.w+=e,this}addVectors(e,t){return this.x=e.x+t.x,this.y=e.y+t.y,this.z=e.z+t.z,this.w=e.w+t.w,this}addScaledVector(e,t){return this.x+=e.x*t,this.y+=e.y*t,this.z+=e.z*t,this.w+=e.w*t,this}sub(e){return this.x-=e.x,this.y-=e.y,this.z-=e.z,this.w-=e.w,this}subScalar(e){return this.x-=e,this.y-=e,this.z-=e,this.w-=e,this}subVectors(e,t){return this.x=e.x-t.x,this.y=e.y-t.y,this.z=e.z-t.z,this.w=e.w-t.w,this}multiply(e){return this.x*=e.x,this.y*=e.y,this.z*=e.z,this.w*=e.w,this}multiplyScalar(e){return this.x*=e,this.y*=e,this.z*=e,this.w*=e,this}applyMatrix4(e){const t=this.x,i=this.y,r=this.z,s=this.w,a=e.elements;return this.x=a[0]*t+a[4]*i+a[8]*r+a[12]*s,this.y=a[1]*t+a[5]*i+a[9]*r+a[13]*s,this.z=a[2]*t+a[6]*i+a[10]*r+a[14]*s,this.w=a[3]*t+a[7]*i+a[11]*r+a[15]*s,this}divide(e){return this.x/=e.x,this.y/=e.y,this.z/=e.z,this.w/=e.w,this}divideScalar(e){return this.multiplyScalar(1/e)}setAxisAngleFromQuaternion(e){this.w=2*Math.acos(e.w);const t=Math.sqrt(1-e.w*e.w);return t<1e-4?(this.x=1,this.y=0,this.z=0):(this.x=e.x/t,this.y=e.y/t,this.z=e.z/t),this}setAxisAngleFromRotationMatrix(e){let t,i,r,s;const c=e.elements,l=c[0],h=c[4],u=c[8],d=c[1],m=c[5],g=c[9],M=c[2],p=c[6],f=c[10];if(Math.abs(h-d)<.01&&Math.abs(u-M)<.01&&Math.abs(g-p)<.01){if(Math.abs(h+d)<.1&&Math.abs(u+M)<.1&&Math.abs(g+p)<.1&&Math.abs(l+m+f-3)<.1)return this.set(1,0,0,0),this;t=Math.PI;const T=(l+1)/2,E=(m+1)/2,C=(f+1)/2,A=(h+d)/4,P=(u+M)/4,I=(g+p)/4;return T>E&&T>C?T<.01?(i=0,r=.707106781,s=.707106781):(i=Math.sqrt(T),r=A/i,s=P/i):E>C?E<.01?(i=.707106781,r=0,s=.707106781):(r=Math.sqrt(E),i=A/r,s=I/r):C<.01?(i=.707106781,r=.707106781,s=0):(s=Math.sqrt(C),i=P/s,r=I/s),this.set(i,r,s,t),this}let w=Math.sqrt((p-g)*(p-g)+(u-M)*(u-M)+(d-h)*(d-h));return Math.abs(w)<.001&&(w=1),this.x=(p-g)/w,this.y=(u-M)/w,this.z=(d-h)/w,this.w=Math.acos((l+m+f-1)/2),this}setFromMatrixPosition(e){const t=e.elements;return this.x=t[12],this.y=t[13],this.z=t[14],this.w=t[15],this}min(e){return this.x=Math.min(this.x,e.x),this.y=Math.min(this.y,e.y),this.z=Math.min(this.z,e.z),this.w=Math.min(this.w,e.w),this}max(e){return this.x=Math.max(this.x,e.x),this.y=Math.max(this.y,e.y),this.z=Math.max(this.z,e.z),this.w=Math.max(this.w,e.w),this}clamp(e,t){return this.x=Ie(this.x,e.x,t.x),this.y=Ie(this.y,e.y,t.y),this.z=Ie(this.z,e.z,t.z),this.w=Ie(this.w,e.w,t.w),this}clampScalar(e,t){return this.x=Ie(this.x,e,t),this.y=Ie(this.y,e,t),this.z=Ie(this.z,e,t),this.w=Ie(this.w,e,t),this}clampLength(e,t){const i=this.length();return this.divideScalar(i||1).multiplyScalar(Ie(i,e,t))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this.z=Math.floor(this.z),this.w=Math.floor(this.w),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this.z=Math.ceil(this.z),this.w=Math.ceil(this.w),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this.z=Math.round(this.z),this.w=Math.round(this.w),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this.z=Math.trunc(this.z),this.w=Math.trunc(this.w),this}negate(){return this.x=-this.x,this.y=-this.y,this.z=-this.z,this.w=-this.w,this}dot(e){return this.x*e.x+this.y*e.y+this.z*e.z+this.w*e.w}lengthSq(){return this.x*this.x+this.y*this.y+this.z*this.z+this.w*this.w}length(){return Math.sqrt(this.x*this.x+this.y*this.y+this.z*this.z+this.w*this.w)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)+Math.abs(this.z)+Math.abs(this.w)}normalize(){return this.divideScalar(this.length()||1)}setLength(e){return this.normalize().multiplyScalar(e)}lerp(e,t){return this.x+=(e.x-this.x)*t,this.y+=(e.y-this.y)*t,this.z+=(e.z-this.z)*t,this.w+=(e.w-this.w)*t,this}lerpVectors(e,t,i){return this.x=e.x+(t.x-e.x)*i,this.y=e.y+(t.y-e.y)*i,this.z=e.z+(t.z-e.z)*i,this.w=e.w+(t.w-e.w)*i,this}equals(e){return e.x===this.x&&e.y===this.y&&e.z===this.z&&e.w===this.w}fromArray(e,t=0){return this.x=e[t],this.y=e[t+1],this.z=e[t+2],this.w=e[t+3],this}toArray(e=[],t=0){return e[t]=this.x,e[t+1]=this.y,e[t+2]=this.z,e[t+3]=this.w,e}fromBufferAttribute(e,t){return this.x=e.getX(t),this.y=e.getY(t),this.z=e.getZ(t),this.w=e.getW(t),this}random(){return this.x=Math.random(),this.y=Math.random(),this.z=Math.random(),this.w=Math.random(),this}*[Symbol.iterator](){yield this.x,yield this.y,yield this.z,yield this.w}}class Ah extends Mi{constructor(e=1,t=1,i={}){super(),this.isRenderTarget=!0,this.width=e,this.height=t,this.depth=1,this.scissor=new rt(0,0,e,t),this.scissorTest=!1,this.viewport=new rt(0,0,e,t);const r={width:e,height:t,depth:1};i=Object.assign({generateMipmaps:!1,internalFormat:null,minFilter:jt,depthBuffer:!0,stencilBuffer:!1,resolveDepthBuffer:!0,resolveStencilBuffer:!0,depthTexture:null,samples:0,count:1},i);const s=new Tt(r,i.mapping,i.wrapS,i.wrapT,i.magFilter,i.minFilter,i.format,i.type,i.anisotropy,i.colorSpace);s.flipY=!1,s.generateMipmaps=i.generateMipmaps,s.internalFormat=i.internalFormat,this.textures=[];const a=i.count;for(let o=0;o<a;o++)this.textures[o]=s.clone(),this.textures[o].isRenderTargetTexture=!0,this.textures[o].renderTarget=this;this.depthBuffer=i.depthBuffer,this.stencilBuffer=i.stencilBuffer,this.resolveDepthBuffer=i.resolveDepthBuffer,this.resolveStencilBuffer=i.resolveStencilBuffer,this._depthTexture=null,this.depthTexture=i.depthTexture,this.samples=i.samples}get texture(){return this.textures[0]}set texture(e){this.textures[0]=e}set depthTexture(e){this._depthTexture!==null&&(this._depthTexture.renderTarget=null),e!==null&&(e.renderTarget=this),this._depthTexture=e}get depthTexture(){return this._depthTexture}setSize(e,t,i=1){if(this.width!==e||this.height!==t||this.depth!==i){this.width=e,this.height=t,this.depth=i;for(let r=0,s=this.textures.length;r<s;r++)this.textures[r].image.width=e,this.textures[r].image.height=t,this.textures[r].image.depth=i;this.dispose()}this.viewport.set(0,0,e,t),this.scissor.set(0,0,e,t)}clone(){return new this.constructor().copy(this)}copy(e){this.width=e.width,this.height=e.height,this.depth=e.depth,this.scissor.copy(e.scissor),this.scissorTest=e.scissorTest,this.viewport.copy(e.viewport),this.textures.length=0;for(let i=0,r=e.textures.length;i<r;i++)this.textures[i]=e.textures[i].clone(),this.textures[i].isRenderTargetTexture=!0,this.textures[i].renderTarget=this;const t=Object.assign({},e.texture.image);return this.texture.source=new cl(t),this.depthBuffer=e.depthBuffer,this.stencilBuffer=e.stencilBuffer,this.resolveDepthBuffer=e.resolveDepthBuffer,this.resolveStencilBuffer=e.resolveStencilBuffer,e.depthTexture!==null&&(this.depthTexture=e.depthTexture.clone()),this.samples=e.samples,this}dispose(){this.dispatchEvent({type:"dispose"})}}class Wn extends Ah{constructor(e=1,t=1,i={}){super(e,t,i),this.isWebGLRenderTarget=!0}}class ul extends Tt{constructor(e=null,t=1,i=1,r=1){super(null),this.isDataArrayTexture=!0,this.image={data:e,width:t,height:i,depth:r},this.magFilter=qt,this.minFilter=qt,this.wrapR=Bn,this.generateMipmaps=!1,this.flipY=!1,this.unpackAlignment=1,this.layerUpdates=new Set}addLayerUpdate(e){this.layerUpdates.add(e)}clearLayerUpdates(){this.layerUpdates.clear()}}class wh extends Tt{constructor(e=null,t=1,i=1,r=1){super(null),this.isData3DTexture=!0,this.image={data:e,width:t,height:i,depth:r},this.magFilter=qt,this.minFilter=qt,this.wrapR=Bn,this.generateMipmaps=!1,this.flipY=!1,this.unpackAlignment=1}}class Bi{constructor(e=0,t=0,i=0,r=1){this.isQuaternion=!0,this._x=e,this._y=t,this._z=i,this._w=r}static slerpFlat(e,t,i,r,s,a,o){let c=i[r+0],l=i[r+1],h=i[r+2],u=i[r+3];const d=s[a+0],m=s[a+1],g=s[a+2],M=s[a+3];if(o===0){e[t+0]=c,e[t+1]=l,e[t+2]=h,e[t+3]=u;return}if(o===1){e[t+0]=d,e[t+1]=m,e[t+2]=g,e[t+3]=M;return}if(u!==M||c!==d||l!==m||h!==g){let p=1-o;const f=c*d+l*m+h*g+u*M,w=f>=0?1:-1,T=1-f*f;if(T>Number.EPSILON){const C=Math.sqrt(T),A=Math.atan2(C,f*w);p=Math.sin(p*A)/C,o=Math.sin(o*A)/C}const E=o*w;if(c=c*p+d*E,l=l*p+m*E,h=h*p+g*E,u=u*p+M*E,p===1-o){const C=1/Math.sqrt(c*c+l*l+h*h+u*u);c*=C,l*=C,h*=C,u*=C}}e[t]=c,e[t+1]=l,e[t+2]=h,e[t+3]=u}static multiplyQuaternionsFlat(e,t,i,r,s,a){const o=i[r],c=i[r+1],l=i[r+2],h=i[r+3],u=s[a],d=s[a+1],m=s[a+2],g=s[a+3];return e[t]=o*g+h*u+c*m-l*d,e[t+1]=c*g+h*d+l*u-o*m,e[t+2]=l*g+h*m+o*d-c*u,e[t+3]=h*g-o*u-c*d-l*m,e}get x(){return this._x}set x(e){this._x=e,this._onChangeCallback()}get y(){return this._y}set y(e){this._y=e,this._onChangeCallback()}get z(){return this._z}set z(e){this._z=e,this._onChangeCallback()}get w(){return this._w}set w(e){this._w=e,this._onChangeCallback()}set(e,t,i,r){return this._x=e,this._y=t,this._z=i,this._w=r,this._onChangeCallback(),this}clone(){return new this.constructor(this._x,this._y,this._z,this._w)}copy(e){return this._x=e.x,this._y=e.y,this._z=e.z,this._w=e.w,this._onChangeCallback(),this}setFromEuler(e,t=!0){const i=e._x,r=e._y,s=e._z,a=e._order,o=Math.cos,c=Math.sin,l=o(i/2),h=o(r/2),u=o(s/2),d=c(i/2),m=c(r/2),g=c(s/2);switch(a){case"XYZ":this._x=d*h*u+l*m*g,this._y=l*m*u-d*h*g,this._z=l*h*g+d*m*u,this._w=l*h*u-d*m*g;break;case"YXZ":this._x=d*h*u+l*m*g,this._y=l*m*u-d*h*g,this._z=l*h*g-d*m*u,this._w=l*h*u+d*m*g;break;case"ZXY":this._x=d*h*u-l*m*g,this._y=l*m*u+d*h*g,this._z=l*h*g+d*m*u,this._w=l*h*u-d*m*g;break;case"ZYX":this._x=d*h*u-l*m*g,this._y=l*m*u+d*h*g,this._z=l*h*g-d*m*u,this._w=l*h*u+d*m*g;break;case"YZX":this._x=d*h*u+l*m*g,this._y=l*m*u+d*h*g,this._z=l*h*g-d*m*u,this._w=l*h*u-d*m*g;break;case"XZY":this._x=d*h*u-l*m*g,this._y=l*m*u-d*h*g,this._z=l*h*g+d*m*u,this._w=l*h*u+d*m*g;break;default:console.warn("THREE.Quaternion: .setFromEuler() encountered an unknown order: "+a)}return t===!0&&this._onChangeCallback(),this}setFromAxisAngle(e,t){const i=t/2,r=Math.sin(i);return this._x=e.x*r,this._y=e.y*r,this._z=e.z*r,this._w=Math.cos(i),this._onChangeCallback(),this}setFromRotationMatrix(e){const t=e.elements,i=t[0],r=t[4],s=t[8],a=t[1],o=t[5],c=t[9],l=t[2],h=t[6],u=t[10],d=i+o+u;if(d>0){const m=.5/Math.sqrt(d+1);this._w=.25/m,this._x=(h-c)*m,this._y=(s-l)*m,this._z=(a-r)*m}else if(i>o&&i>u){const m=2*Math.sqrt(1+i-o-u);this._w=(h-c)/m,this._x=.25*m,this._y=(r+a)/m,this._z=(s+l)/m}else if(o>u){const m=2*Math.sqrt(1+o-i-u);this._w=(s-l)/m,this._x=(r+a)/m,this._y=.25*m,this._z=(c+h)/m}else{const m=2*Math.sqrt(1+u-i-o);this._w=(a-r)/m,this._x=(s+l)/m,this._y=(c+h)/m,this._z=.25*m}return this._onChangeCallback(),this}setFromUnitVectors(e,t){let i=e.dot(t)+1;return i<Number.EPSILON?(i=0,Math.abs(e.x)>Math.abs(e.z)?(this._x=-e.y,this._y=e.x,this._z=0,this._w=i):(this._x=0,this._y=-e.z,this._z=e.y,this._w=i)):(this._x=e.y*t.z-e.z*t.y,this._y=e.z*t.x-e.x*t.z,this._z=e.x*t.y-e.y*t.x,this._w=i),this.normalize()}angleTo(e){return 2*Math.acos(Math.abs(Ie(this.dot(e),-1,1)))}rotateTowards(e,t){const i=this.angleTo(e);if(i===0)return this;const r=Math.min(1,t/i);return this.slerp(e,r),this}identity(){return this.set(0,0,0,1)}invert(){return this.conjugate()}conjugate(){return this._x*=-1,this._y*=-1,this._z*=-1,this._onChangeCallback(),this}dot(e){return this._x*e._x+this._y*e._y+this._z*e._z+this._w*e._w}lengthSq(){return this._x*this._x+this._y*this._y+this._z*this._z+this._w*this._w}length(){return Math.sqrt(this._x*this._x+this._y*this._y+this._z*this._z+this._w*this._w)}normalize(){let e=this.length();return e===0?(this._x=0,this._y=0,this._z=0,this._w=1):(e=1/e,this._x=this._x*e,this._y=this._y*e,this._z=this._z*e,this._w=this._w*e),this._onChangeCallback(),this}multiply(e){return this.multiplyQuaternions(this,e)}premultiply(e){return this.multiplyQuaternions(e,this)}multiplyQuaternions(e,t){const i=e._x,r=e._y,s=e._z,a=e._w,o=t._x,c=t._y,l=t._z,h=t._w;return this._x=i*h+a*o+r*l-s*c,this._y=r*h+a*c+s*o-i*l,this._z=s*h+a*l+i*c-r*o,this._w=a*h-i*o-r*c-s*l,this._onChangeCallback(),this}slerp(e,t){if(t===0)return this;if(t===1)return this.copy(e);const i=this._x,r=this._y,s=this._z,a=this._w;let o=a*e._w+i*e._x+r*e._y+s*e._z;if(o<0?(this._w=-e._w,this._x=-e._x,this._y=-e._y,this._z=-e._z,o=-o):this.copy(e),o>=1)return this._w=a,this._x=i,this._y=r,this._z=s,this;const c=1-o*o;if(c<=Number.EPSILON){const m=1-t;return this._w=m*a+t*this._w,this._x=m*i+t*this._x,this._y=m*r+t*this._y,this._z=m*s+t*this._z,this.normalize(),this}const l=Math.sqrt(c),h=Math.atan2(l,o),u=Math.sin((1-t)*h)/l,d=Math.sin(t*h)/l;return this._w=a*u+this._w*d,this._x=i*u+this._x*d,this._y=r*u+this._y*d,this._z=s*u+this._z*d,this._onChangeCallback(),this}slerpQuaternions(e,t,i){return this.copy(e).slerp(t,i)}random(){const e=2*Math.PI*Math.random(),t=2*Math.PI*Math.random(),i=Math.random(),r=Math.sqrt(1-i),s=Math.sqrt(i);return this.set(r*Math.sin(e),r*Math.cos(e),s*Math.sin(t),s*Math.cos(t))}equals(e){return e._x===this._x&&e._y===this._y&&e._z===this._z&&e._w===this._w}fromArray(e,t=0){return this._x=e[t],this._y=e[t+1],this._z=e[t+2],this._w=e[t+3],this._onChangeCallback(),this}toArray(e=[],t=0){return e[t]=this._x,e[t+1]=this._y,e[t+2]=this._z,e[t+3]=this._w,e}fromBufferAttribute(e,t){return this._x=e.getX(t),this._y=e.getY(t),this._z=e.getZ(t),this._w=e.getW(t),this._onChangeCallback(),this}toJSON(){return this.toArray()}_onChange(e){return this._onChangeCallback=e,this}_onChangeCallback(){}*[Symbol.iterator](){yield this._x,yield this._y,yield this._z,yield this._w}}class B{constructor(e=0,t=0,i=0){B.prototype.isVector3=!0,this.x=e,this.y=t,this.z=i}set(e,t,i){return i===void 0&&(i=this.z),this.x=e,this.y=t,this.z=i,this}setScalar(e){return this.x=e,this.y=e,this.z=e,this}setX(e){return this.x=e,this}setY(e){return this.y=e,this}setZ(e){return this.z=e,this}setComponent(e,t){switch(e){case 0:this.x=t;break;case 1:this.y=t;break;case 2:this.z=t;break;default:throw new Error("index is out of range: "+e)}return this}getComponent(e){switch(e){case 0:return this.x;case 1:return this.y;case 2:return this.z;default:throw new Error("index is out of range: "+e)}}clone(){return new this.constructor(this.x,this.y,this.z)}copy(e){return this.x=e.x,this.y=e.y,this.z=e.z,this}add(e){return this.x+=e.x,this.y+=e.y,this.z+=e.z,this}addScalar(e){return this.x+=e,this.y+=e,this.z+=e,this}addVectors(e,t){return this.x=e.x+t.x,this.y=e.y+t.y,this.z=e.z+t.z,this}addScaledVector(e,t){return this.x+=e.x*t,this.y+=e.y*t,this.z+=e.z*t,this}sub(e){return this.x-=e.x,this.y-=e.y,this.z-=e.z,this}subScalar(e){return this.x-=e,this.y-=e,this.z-=e,this}subVectors(e,t){return this.x=e.x-t.x,this.y=e.y-t.y,this.z=e.z-t.z,this}multiply(e){return this.x*=e.x,this.y*=e.y,this.z*=e.z,this}multiplyScalar(e){return this.x*=e,this.y*=e,this.z*=e,this}multiplyVectors(e,t){return this.x=e.x*t.x,this.y=e.y*t.y,this.z=e.z*t.z,this}applyEuler(e){return this.applyQuaternion(Wa.setFromEuler(e))}applyAxisAngle(e,t){return this.applyQuaternion(Wa.setFromAxisAngle(e,t))}applyMatrix3(e){const t=this.x,i=this.y,r=this.z,s=e.elements;return this.x=s[0]*t+s[3]*i+s[6]*r,this.y=s[1]*t+s[4]*i+s[7]*r,this.z=s[2]*t+s[5]*i+s[8]*r,this}applyNormalMatrix(e){return this.applyMatrix3(e).normalize()}applyMatrix4(e){const t=this.x,i=this.y,r=this.z,s=e.elements,a=1/(s[3]*t+s[7]*i+s[11]*r+s[15]);return this.x=(s[0]*t+s[4]*i+s[8]*r+s[12])*a,this.y=(s[1]*t+s[5]*i+s[9]*r+s[13])*a,this.z=(s[2]*t+s[6]*i+s[10]*r+s[14])*a,this}applyQuaternion(e){const t=this.x,i=this.y,r=this.z,s=e.x,a=e.y,o=e.z,c=e.w,l=2*(a*r-o*i),h=2*(o*t-s*r),u=2*(s*i-a*t);return this.x=t+c*l+a*u-o*h,this.y=i+c*h+o*l-s*u,this.z=r+c*u+s*h-a*l,this}project(e){return this.applyMatrix4(e.matrixWorldInverse).applyMatrix4(e.projectionMatrix)}unproject(e){return this.applyMatrix4(e.projectionMatrixInverse).applyMatrix4(e.matrixWorld)}transformDirection(e){const t=this.x,i=this.y,r=this.z,s=e.elements;return this.x=s[0]*t+s[4]*i+s[8]*r,this.y=s[1]*t+s[5]*i+s[9]*r,this.z=s[2]*t+s[6]*i+s[10]*r,this.normalize()}divide(e){return this.x/=e.x,this.y/=e.y,this.z/=e.z,this}divideScalar(e){return this.multiplyScalar(1/e)}min(e){return this.x=Math.min(this.x,e.x),this.y=Math.min(this.y,e.y),this.z=Math.min(this.z,e.z),this}max(e){return this.x=Math.max(this.x,e.x),this.y=Math.max(this.y,e.y),this.z=Math.max(this.z,e.z),this}clamp(e,t){return this.x=Ie(this.x,e.x,t.x),this.y=Ie(this.y,e.y,t.y),this.z=Ie(this.z,e.z,t.z),this}clampScalar(e,t){return this.x=Ie(this.x,e,t),this.y=Ie(this.y,e,t),this.z=Ie(this.z,e,t),this}clampLength(e,t){const i=this.length();return this.divideScalar(i||1).multiplyScalar(Ie(i,e,t))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this.z=Math.floor(this.z),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this.z=Math.ceil(this.z),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this.z=Math.round(this.z),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this.z=Math.trunc(this.z),this}negate(){return this.x=-this.x,this.y=-this.y,this.z=-this.z,this}dot(e){return this.x*e.x+this.y*e.y+this.z*e.z}lengthSq(){return this.x*this.x+this.y*this.y+this.z*this.z}length(){return Math.sqrt(this.x*this.x+this.y*this.y+this.z*this.z)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)+Math.abs(this.z)}normalize(){return this.divideScalar(this.length()||1)}setLength(e){return this.normalize().multiplyScalar(e)}lerp(e,t){return this.x+=(e.x-this.x)*t,this.y+=(e.y-this.y)*t,this.z+=(e.z-this.z)*t,this}lerpVectors(e,t,i){return this.x=e.x+(t.x-e.x)*i,this.y=e.y+(t.y-e.y)*i,this.z=e.z+(t.z-e.z)*i,this}cross(e){return this.crossVectors(this,e)}crossVectors(e,t){const i=e.x,r=e.y,s=e.z,a=t.x,o=t.y,c=t.z;return this.x=r*c-s*o,this.y=s*a-i*c,this.z=i*o-r*a,this}projectOnVector(e){const t=e.lengthSq();if(t===0)return this.set(0,0,0);const i=e.dot(this)/t;return this.copy(e).multiplyScalar(i)}projectOnPlane(e){return Nr.copy(this).projectOnVector(e),this.sub(Nr)}reflect(e){return this.sub(Nr.copy(e).multiplyScalar(2*this.dot(e)))}angleTo(e){const t=Math.sqrt(this.lengthSq()*e.lengthSq());if(t===0)return Math.PI/2;const i=this.dot(e)/t;return Math.acos(Ie(i,-1,1))}distanceTo(e){return Math.sqrt(this.distanceToSquared(e))}distanceToSquared(e){const t=this.x-e.x,i=this.y-e.y,r=this.z-e.z;return t*t+i*i+r*r}manhattanDistanceTo(e){return Math.abs(this.x-e.x)+Math.abs(this.y-e.y)+Math.abs(this.z-e.z)}setFromSpherical(e){return this.setFromSphericalCoords(e.radius,e.phi,e.theta)}setFromSphericalCoords(e,t,i){const r=Math.sin(t)*e;return this.x=r*Math.sin(i),this.y=Math.cos(t)*e,this.z=r*Math.cos(i),this}setFromCylindrical(e){return this.setFromCylindricalCoords(e.radius,e.theta,e.y)}setFromCylindricalCoords(e,t,i){return this.x=e*Math.sin(t),this.y=i,this.z=e*Math.cos(t),this}setFromMatrixPosition(e){const t=e.elements;return this.x=t[12],this.y=t[13],this.z=t[14],this}setFromMatrixScale(e){const t=this.setFromMatrixColumn(e,0).length(),i=this.setFromMatrixColumn(e,1).length(),r=this.setFromMatrixColumn(e,2).length();return this.x=t,this.y=i,this.z=r,this}setFromMatrixColumn(e,t){return this.fromArray(e.elements,t*4)}setFromMatrix3Column(e,t){return this.fromArray(e.elements,t*3)}setFromEuler(e){return this.x=e._x,this.y=e._y,this.z=e._z,this}setFromColor(e){return this.x=e.r,this.y=e.g,this.z=e.b,this}equals(e){return e.x===this.x&&e.y===this.y&&e.z===this.z}fromArray(e,t=0){return this.x=e[t],this.y=e[t+1],this.z=e[t+2],this}toArray(e=[],t=0){return e[t]=this.x,e[t+1]=this.y,e[t+2]=this.z,e}fromBufferAttribute(e,t){return this.x=e.getX(t),this.y=e.getY(t),this.z=e.getZ(t),this}random(){return this.x=Math.random(),this.y=Math.random(),this.z=Math.random(),this}randomDirection(){const e=Math.random()*Math.PI*2,t=Math.random()*2-1,i=Math.sqrt(1-t*t);return this.x=i*Math.cos(e),this.y=t,this.z=i*Math.sin(e),this}*[Symbol.iterator](){yield this.x,yield this.y,yield this.z}}const Nr=new B,Wa=new Bi;class zi{constructor(e=new B(1/0,1/0,1/0),t=new B(-1/0,-1/0,-1/0)){this.isBox3=!0,this.min=e,this.max=t}set(e,t){return this.min.copy(e),this.max.copy(t),this}setFromArray(e){this.makeEmpty();for(let t=0,i=e.length;t<i;t+=3)this.expandByPoint(Ot.fromArray(e,t));return this}setFromBufferAttribute(e){this.makeEmpty();for(let t=0,i=e.count;t<i;t++)this.expandByPoint(Ot.fromBufferAttribute(e,t));return this}setFromPoints(e){this.makeEmpty();for(let t=0,i=e.length;t<i;t++)this.expandByPoint(e[t]);return this}setFromCenterAndSize(e,t){const i=Ot.copy(t).multiplyScalar(.5);return this.min.copy(e).sub(i),this.max.copy(e).add(i),this}setFromObject(e,t=!1){return this.makeEmpty(),this.expandByObject(e,t)}clone(){return new this.constructor().copy(this)}copy(e){return this.min.copy(e.min),this.max.copy(e.max),this}makeEmpty(){return this.min.x=this.min.y=this.min.z=1/0,this.max.x=this.max.y=this.max.z=-1/0,this}isEmpty(){return this.max.x<this.min.x||this.max.y<this.min.y||this.max.z<this.min.z}getCenter(e){return this.isEmpty()?e.set(0,0,0):e.addVectors(this.min,this.max).multiplyScalar(.5)}getSize(e){return this.isEmpty()?e.set(0,0,0):e.subVectors(this.max,this.min)}expandByPoint(e){return this.min.min(e),this.max.max(e),this}expandByVector(e){return this.min.sub(e),this.max.add(e),this}expandByScalar(e){return this.min.addScalar(-e),this.max.addScalar(e),this}expandByObject(e,t=!1){e.updateWorldMatrix(!1,!1);const i=e.geometry;if(i!==void 0){const s=i.getAttribute("position");if(t===!0&&s!==void 0&&e.isInstancedMesh!==!0)for(let a=0,o=s.count;a<o;a++)e.isMesh===!0?e.getVertexPosition(a,Ot):Ot.fromBufferAttribute(s,a),Ot.applyMatrix4(e.matrixWorld),this.expandByPoint(Ot);else e.boundingBox!==void 0?(e.boundingBox===null&&e.computeBoundingBox(),qi.copy(e.boundingBox)):(i.boundingBox===null&&i.computeBoundingBox(),qi.copy(i.boundingBox)),qi.applyMatrix4(e.matrixWorld),this.union(qi)}const r=e.children;for(let s=0,a=r.length;s<a;s++)this.expandByObject(r[s],t);return this}containsPoint(e){return e.x>=this.min.x&&e.x<=this.max.x&&e.y>=this.min.y&&e.y<=this.max.y&&e.z>=this.min.z&&e.z<=this.max.z}containsBox(e){return this.min.x<=e.min.x&&e.max.x<=this.max.x&&this.min.y<=e.min.y&&e.max.y<=this.max.y&&this.min.z<=e.min.z&&e.max.z<=this.max.z}getParameter(e,t){return t.set((e.x-this.min.x)/(this.max.x-this.min.x),(e.y-this.min.y)/(this.max.y-this.min.y),(e.z-this.min.z)/(this.max.z-this.min.z))}intersectsBox(e){return e.max.x>=this.min.x&&e.min.x<=this.max.x&&e.max.y>=this.min.y&&e.min.y<=this.max.y&&e.max.z>=this.min.z&&e.min.z<=this.max.z}intersectsSphere(e){return this.clampPoint(e.center,Ot),Ot.distanceToSquared(e.center)<=e.radius*e.radius}intersectsPlane(e){let t,i;return e.normal.x>0?(t=e.normal.x*this.min.x,i=e.normal.x*this.max.x):(t=e.normal.x*this.max.x,i=e.normal.x*this.min.x),e.normal.y>0?(t+=e.normal.y*this.min.y,i+=e.normal.y*this.max.y):(t+=e.normal.y*this.max.y,i+=e.normal.y*this.min.y),e.normal.z>0?(t+=e.normal.z*this.min.z,i+=e.normal.z*this.max.z):(t+=e.normal.z*this.max.z,i+=e.normal.z*this.min.z),t<=-e.constant&&i>=-e.constant}intersectsTriangle(e){if(this.isEmpty())return!1;this.getCenter(bi),Yi.subVectors(this.max,bi),$n.subVectors(e.a,bi),Zn.subVectors(e.b,bi),Kn.subVectors(e.c,bi),hn.subVectors(Zn,$n),fn.subVectors(Kn,Zn),wn.subVectors($n,Kn);let t=[0,-hn.z,hn.y,0,-fn.z,fn.y,0,-wn.z,wn.y,hn.z,0,-hn.x,fn.z,0,-fn.x,wn.z,0,-wn.x,-hn.y,hn.x,0,-fn.y,fn.x,0,-wn.y,wn.x,0];return!Fr(t,$n,Zn,Kn,Yi)||(t=[1,0,0,0,1,0,0,0,1],!Fr(t,$n,Zn,Kn,Yi))?!1:($i.crossVectors(hn,fn),t=[$i.x,$i.y,$i.z],Fr(t,$n,Zn,Kn,Yi))}clampPoint(e,t){return t.copy(e).clamp(this.min,this.max)}distanceToPoint(e){return this.clampPoint(e,Ot).distanceTo(e)}getBoundingSphere(e){return this.isEmpty()?e.makeEmpty():(this.getCenter(e.center),e.radius=this.getSize(Ot).length()*.5),e}intersect(e){return this.min.max(e.min),this.max.min(e.max),this.isEmpty()&&this.makeEmpty(),this}union(e){return this.min.min(e.min),this.max.max(e.max),this}applyMatrix4(e){return this.isEmpty()?this:(tn[0].set(this.min.x,this.min.y,this.min.z).applyMatrix4(e),tn[1].set(this.min.x,this.min.y,this.max.z).applyMatrix4(e),tn[2].set(this.min.x,this.max.y,this.min.z).applyMatrix4(e),tn[3].set(this.min.x,this.max.y,this.max.z).applyMatrix4(e),tn[4].set(this.max.x,this.min.y,this.min.z).applyMatrix4(e),tn[5].set(this.max.x,this.min.y,this.max.z).applyMatrix4(e),tn[6].set(this.max.x,this.max.y,this.min.z).applyMatrix4(e),tn[7].set(this.max.x,this.max.y,this.max.z).applyMatrix4(e),this.setFromPoints(tn),this)}translate(e){return this.min.add(e),this.max.add(e),this}equals(e){return e.min.equals(this.min)&&e.max.equals(this.max)}}const tn=[new B,new B,new B,new B,new B,new B,new B,new B],Ot=new B,qi=new zi,$n=new B,Zn=new B,Kn=new B,hn=new B,fn=new B,wn=new B,bi=new B,Yi=new B,$i=new B,Rn=new B;function Fr(n,e,t,i,r){for(let s=0,a=n.length-3;s<=a;s+=3){Rn.fromArray(n,s);const o=r.x*Math.abs(Rn.x)+r.y*Math.abs(Rn.y)+r.z*Math.abs(Rn.z),c=e.dot(Rn),l=t.dot(Rn),h=i.dot(Rn);if(Math.max(-Math.max(c,l,h),Math.min(c,l,h))>o)return!1}return!0}const Rh=new zi,Ai=new B,Or=new B;class da{constructor(e=new B,t=-1){this.isSphere=!0,this.center=e,this.radius=t}set(e,t){return this.center.copy(e),this.radius=t,this}setFromPoints(e,t){const i=this.center;t!==void 0?i.copy(t):Rh.setFromPoints(e).getCenter(i);let r=0;for(let s=0,a=e.length;s<a;s++)r=Math.max(r,i.distanceToSquared(e[s]));return this.radius=Math.sqrt(r),this}copy(e){return this.center.copy(e.center),this.radius=e.radius,this}isEmpty(){return this.radius<0}makeEmpty(){return this.center.set(0,0,0),this.radius=-1,this}containsPoint(e){return e.distanceToSquared(this.center)<=this.radius*this.radius}distanceToPoint(e){return e.distanceTo(this.center)-this.radius}intersectsSphere(e){const t=this.radius+e.radius;return e.center.distanceToSquared(this.center)<=t*t}intersectsBox(e){return e.intersectsSphere(this)}intersectsPlane(e){return Math.abs(e.distanceToPoint(this.center))<=this.radius}clampPoint(e,t){const i=this.center.distanceToSquared(e);return t.copy(e),i>this.radius*this.radius&&(t.sub(this.center).normalize(),t.multiplyScalar(this.radius).add(this.center)),t}getBoundingBox(e){return this.isEmpty()?(e.makeEmpty(),e):(e.set(this.center,this.center),e.expandByScalar(this.radius),e)}applyMatrix4(e){return this.center.applyMatrix4(e),this.radius=this.radius*e.getMaxScaleOnAxis(),this}translate(e){return this.center.add(e),this}expandByPoint(e){if(this.isEmpty())return this.center.copy(e),this.radius=0,this;Ai.subVectors(e,this.center);const t=Ai.lengthSq();if(t>this.radius*this.radius){const i=Math.sqrt(t),r=(i-this.radius)*.5;this.center.addScaledVector(Ai,r/i),this.radius+=r}return this}union(e){return e.isEmpty()?this:this.isEmpty()?(this.copy(e),this):(this.center.equals(e.center)===!0?this.radius=Math.max(this.radius,e.radius):(Or.subVectors(e.center,this.center).setLength(e.radius),this.expandByPoint(Ai.copy(e.center).add(Or)),this.expandByPoint(Ai.copy(e.center).sub(Or))),this)}equals(e){return e.center.equals(this.center)&&e.radius===this.radius}clone(){return new this.constructor().copy(this)}}const nn=new B,Br=new B,Zi=new B,dn=new B,zr=new B,Ki=new B,Hr=new B;class Ch{constructor(e=new B,t=new B(0,0,-1)){this.origin=e,this.direction=t}set(e,t){return this.origin.copy(e),this.direction.copy(t),this}copy(e){return this.origin.copy(e.origin),this.direction.copy(e.direction),this}at(e,t){return t.copy(this.origin).addScaledVector(this.direction,e)}lookAt(e){return this.direction.copy(e).sub(this.origin).normalize(),this}recast(e){return this.origin.copy(this.at(e,nn)),this}closestPointToPoint(e,t){t.subVectors(e,this.origin);const i=t.dot(this.direction);return i<0?t.copy(this.origin):t.copy(this.origin).addScaledVector(this.direction,i)}distanceToPoint(e){return Math.sqrt(this.distanceSqToPoint(e))}distanceSqToPoint(e){const t=nn.subVectors(e,this.origin).dot(this.direction);return t<0?this.origin.distanceToSquared(e):(nn.copy(this.origin).addScaledVector(this.direction,t),nn.distanceToSquared(e))}distanceSqToSegment(e,t,i,r){Br.copy(e).add(t).multiplyScalar(.5),Zi.copy(t).sub(e).normalize(),dn.copy(this.origin).sub(Br);const s=e.distanceTo(t)*.5,a=-this.direction.dot(Zi),o=dn.dot(this.direction),c=-dn.dot(Zi),l=dn.lengthSq(),h=Math.abs(1-a*a);let u,d,m,g;if(h>0)if(u=a*c-o,d=a*o-c,g=s*h,u>=0)if(d>=-g)if(d<=g){const M=1/h;u*=M,d*=M,m=u*(u+a*d+2*o)+d*(a*u+d+2*c)+l}else d=s,u=Math.max(0,-(a*d+o)),m=-u*u+d*(d+2*c)+l;else d=-s,u=Math.max(0,-(a*d+o)),m=-u*u+d*(d+2*c)+l;else d<=-g?(u=Math.max(0,-(-a*s+o)),d=u>0?-s:Math.min(Math.max(-s,-c),s),m=-u*u+d*(d+2*c)+l):d<=g?(u=0,d=Math.min(Math.max(-s,-c),s),m=d*(d+2*c)+l):(u=Math.max(0,-(a*s+o)),d=u>0?s:Math.min(Math.max(-s,-c),s),m=-u*u+d*(d+2*c)+l);else d=a>0?-s:s,u=Math.max(0,-(a*d+o)),m=-u*u+d*(d+2*c)+l;return i&&i.copy(this.origin).addScaledVector(this.direction,u),r&&r.copy(Br).addScaledVector(Zi,d),m}intersectSphere(e,t){nn.subVectors(e.center,this.origin);const i=nn.dot(this.direction),r=nn.dot(nn)-i*i,s=e.radius*e.radius;if(r>s)return null;const a=Math.sqrt(s-r),o=i-a,c=i+a;return c<0?null:o<0?this.at(c,t):this.at(o,t)}intersectsSphere(e){return this.distanceSqToPoint(e.center)<=e.radius*e.radius}distanceToPlane(e){const t=e.normal.dot(this.direction);if(t===0)return e.distanceToPoint(this.origin)===0?0:null;const i=-(this.origin.dot(e.normal)+e.constant)/t;return i>=0?i:null}intersectPlane(e,t){const i=this.distanceToPlane(e);return i===null?null:this.at(i,t)}intersectsPlane(e){const t=e.distanceToPoint(this.origin);return t===0||e.normal.dot(this.direction)*t<0}intersectBox(e,t){let i,r,s,a,o,c;const l=1/this.direction.x,h=1/this.direction.y,u=1/this.direction.z,d=this.origin;return l>=0?(i=(e.min.x-d.x)*l,r=(e.max.x-d.x)*l):(i=(e.max.x-d.x)*l,r=(e.min.x-d.x)*l),h>=0?(s=(e.min.y-d.y)*h,a=(e.max.y-d.y)*h):(s=(e.max.y-d.y)*h,a=(e.min.y-d.y)*h),i>a||s>r||((s>i||isNaN(i))&&(i=s),(a<r||isNaN(r))&&(r=a),u>=0?(o=(e.min.z-d.z)*u,c=(e.max.z-d.z)*u):(o=(e.max.z-d.z)*u,c=(e.min.z-d.z)*u),i>c||o>r)||((o>i||i!==i)&&(i=o),(c<r||r!==r)&&(r=c),r<0)?null:this.at(i>=0?i:r,t)}intersectsBox(e){return this.intersectBox(e,nn)!==null}intersectTriangle(e,t,i,r,s){zr.subVectors(t,e),Ki.subVectors(i,e),Hr.crossVectors(zr,Ki);let a=this.direction.dot(Hr),o;if(a>0){if(r)return null;o=1}else if(a<0)o=-1,a=-a;else return null;dn.subVectors(this.origin,e);const c=o*this.direction.dot(Ki.crossVectors(dn,Ki));if(c<0)return null;const l=o*this.direction.dot(zr.cross(dn));if(l<0||c+l>a)return null;const h=-o*dn.dot(Hr);return h<0?null:this.at(h/a,s)}applyMatrix4(e){return this.origin.applyMatrix4(e),this.direction.transformDirection(e),this}equals(e){return e.origin.equals(this.origin)&&e.direction.equals(this.direction)}clone(){return new this.constructor().copy(this)}}class st{constructor(e,t,i,r,s,a,o,c,l,h,u,d,m,g,M,p){st.prototype.isMatrix4=!0,this.elements=[1,0,0,0,0,1,0,0,0,0,1,0,0,0,0,1],e!==void 0&&this.set(e,t,i,r,s,a,o,c,l,h,u,d,m,g,M,p)}set(e,t,i,r,s,a,o,c,l,h,u,d,m,g,M,p){const f=this.elements;return f[0]=e,f[4]=t,f[8]=i,f[12]=r,f[1]=s,f[5]=a,f[9]=o,f[13]=c,f[2]=l,f[6]=h,f[10]=u,f[14]=d,f[3]=m,f[7]=g,f[11]=M,f[15]=p,this}identity(){return this.set(1,0,0,0,0,1,0,0,0,0,1,0,0,0,0,1),this}clone(){return new st().fromArray(this.elements)}copy(e){const t=this.elements,i=e.elements;return t[0]=i[0],t[1]=i[1],t[2]=i[2],t[3]=i[3],t[4]=i[4],t[5]=i[5],t[6]=i[6],t[7]=i[7],t[8]=i[8],t[9]=i[9],t[10]=i[10],t[11]=i[11],t[12]=i[12],t[13]=i[13],t[14]=i[14],t[15]=i[15],this}copyPosition(e){const t=this.elements,i=e.elements;return t[12]=i[12],t[13]=i[13],t[14]=i[14],this}setFromMatrix3(e){const t=e.elements;return this.set(t[0],t[3],t[6],0,t[1],t[4],t[7],0,t[2],t[5],t[8],0,0,0,0,1),this}extractBasis(e,t,i){return e.setFromMatrixColumn(this,0),t.setFromMatrixColumn(this,1),i.setFromMatrixColumn(this,2),this}makeBasis(e,t,i){return this.set(e.x,t.x,i.x,0,e.y,t.y,i.y,0,e.z,t.z,i.z,0,0,0,0,1),this}extractRotation(e){const t=this.elements,i=e.elements,r=1/jn.setFromMatrixColumn(e,0).length(),s=1/jn.setFromMatrixColumn(e,1).length(),a=1/jn.setFromMatrixColumn(e,2).length();return t[0]=i[0]*r,t[1]=i[1]*r,t[2]=i[2]*r,t[3]=0,t[4]=i[4]*s,t[5]=i[5]*s,t[6]=i[6]*s,t[7]=0,t[8]=i[8]*a,t[9]=i[9]*a,t[10]=i[10]*a,t[11]=0,t[12]=0,t[13]=0,t[14]=0,t[15]=1,this}makeRotationFromEuler(e){const t=this.elements,i=e.x,r=e.y,s=e.z,a=Math.cos(i),o=Math.sin(i),c=Math.cos(r),l=Math.sin(r),h=Math.cos(s),u=Math.sin(s);if(e.order==="XYZ"){const d=a*h,m=a*u,g=o*h,M=o*u;t[0]=c*h,t[4]=-c*u,t[8]=l,t[1]=m+g*l,t[5]=d-M*l,t[9]=-o*c,t[2]=M-d*l,t[6]=g+m*l,t[10]=a*c}else if(e.order==="YXZ"){const d=c*h,m=c*u,g=l*h,M=l*u;t[0]=d+M*o,t[4]=g*o-m,t[8]=a*l,t[1]=a*u,t[5]=a*h,t[9]=-o,t[2]=m*o-g,t[6]=M+d*o,t[10]=a*c}else if(e.order==="ZXY"){const d=c*h,m=c*u,g=l*h,M=l*u;t[0]=d-M*o,t[4]=-a*u,t[8]=g+m*o,t[1]=m+g*o,t[5]=a*h,t[9]=M-d*o,t[2]=-a*l,t[6]=o,t[10]=a*c}else if(e.order==="ZYX"){const d=a*h,m=a*u,g=o*h,M=o*u;t[0]=c*h,t[4]=g*l-m,t[8]=d*l+M,t[1]=c*u,t[5]=M*l+d,t[9]=m*l-g,t[2]=-l,t[6]=o*c,t[10]=a*c}else if(e.order==="YZX"){const d=a*c,m=a*l,g=o*c,M=o*l;t[0]=c*h,t[4]=M-d*u,t[8]=g*u+m,t[1]=u,t[5]=a*h,t[9]=-o*h,t[2]=-l*h,t[6]=m*u+g,t[10]=d-M*u}else if(e.order==="XZY"){const d=a*c,m=a*l,g=o*c,M=o*l;t[0]=c*h,t[4]=-u,t[8]=l*h,t[1]=d*u+M,t[5]=a*h,t[9]=m*u-g,t[2]=g*u-m,t[6]=o*h,t[10]=M*u+d}return t[3]=0,t[7]=0,t[11]=0,t[12]=0,t[13]=0,t[14]=0,t[15]=1,this}makeRotationFromQuaternion(e){return this.compose(Ph,e,Dh)}lookAt(e,t,i){const r=this.elements;return At.subVectors(e,t),At.lengthSq()===0&&(At.z=1),At.normalize(),pn.crossVectors(i,At),pn.lengthSq()===0&&(Math.abs(i.z)===1?At.x+=1e-4:At.z+=1e-4,At.normalize(),pn.crossVectors(i,At)),pn.normalize(),ji.crossVectors(At,pn),r[0]=pn.x,r[4]=ji.x,r[8]=At.x,r[1]=pn.y,r[5]=ji.y,r[9]=At.y,r[2]=pn.z,r[6]=ji.z,r[10]=At.z,this}multiply(e){return this.multiplyMatrices(this,e)}premultiply(e){return this.multiplyMatrices(e,this)}multiplyMatrices(e,t){const i=e.elements,r=t.elements,s=this.elements,a=i[0],o=i[4],c=i[8],l=i[12],h=i[1],u=i[5],d=i[9],m=i[13],g=i[2],M=i[6],p=i[10],f=i[14],w=i[3],T=i[7],E=i[11],C=i[15],A=r[0],P=r[4],I=r[8],S=r[12],x=r[1],b=r[5],W=r[9],N=r[13],k=r[2],Z=r[6],G=r[10],J=r[14],H=r[3],Q=r[7],ce=r[11],ve=r[15];return s[0]=a*A+o*x+c*k+l*H,s[4]=a*P+o*b+c*Z+l*Q,s[8]=a*I+o*W+c*G+l*ce,s[12]=a*S+o*N+c*J+l*ve,s[1]=h*A+u*x+d*k+m*H,s[5]=h*P+u*b+d*Z+m*Q,s[9]=h*I+u*W+d*G+m*ce,s[13]=h*S+u*N+d*J+m*ve,s[2]=g*A+M*x+p*k+f*H,s[6]=g*P+M*b+p*Z+f*Q,s[10]=g*I+M*W+p*G+f*ce,s[14]=g*S+M*N+p*J+f*ve,s[3]=w*A+T*x+E*k+C*H,s[7]=w*P+T*b+E*Z+C*Q,s[11]=w*I+T*W+E*G+C*ce,s[15]=w*S+T*N+E*J+C*ve,this}multiplyScalar(e){const t=this.elements;return t[0]*=e,t[4]*=e,t[8]*=e,t[12]*=e,t[1]*=e,t[5]*=e,t[9]*=e,t[13]*=e,t[2]*=e,t[6]*=e,t[10]*=e,t[14]*=e,t[3]*=e,t[7]*=e,t[11]*=e,t[15]*=e,this}determinant(){const e=this.elements,t=e[0],i=e[4],r=e[8],s=e[12],a=e[1],o=e[5],c=e[9],l=e[13],h=e[2],u=e[6],d=e[10],m=e[14],g=e[3],M=e[7],p=e[11],f=e[15];return g*(+s*c*u-r*l*u-s*o*d+i*l*d+r*o*m-i*c*m)+M*(+t*c*m-t*l*d+s*a*d-r*a*m+r*l*h-s*c*h)+p*(+t*l*u-t*o*m-s*a*u+i*a*m+s*o*h-i*l*h)+f*(-r*o*h-t*c*u+t*o*d+r*a*u-i*a*d+i*c*h)}transpose(){const e=this.elements;let t;return t=e[1],e[1]=e[4],e[4]=t,t=e[2],e[2]=e[8],e[8]=t,t=e[6],e[6]=e[9],e[9]=t,t=e[3],e[3]=e[12],e[12]=t,t=e[7],e[7]=e[13],e[13]=t,t=e[11],e[11]=e[14],e[14]=t,this}setPosition(e,t,i){const r=this.elements;return e.isVector3?(r[12]=e.x,r[13]=e.y,r[14]=e.z):(r[12]=e,r[13]=t,r[14]=i),this}invert(){const e=this.elements,t=e[0],i=e[1],r=e[2],s=e[3],a=e[4],o=e[5],c=e[6],l=e[7],h=e[8],u=e[9],d=e[10],m=e[11],g=e[12],M=e[13],p=e[14],f=e[15],w=u*p*l-M*d*l+M*c*m-o*p*m-u*c*f+o*d*f,T=g*d*l-h*p*l-g*c*m+a*p*m+h*c*f-a*d*f,E=h*M*l-g*u*l+g*o*m-a*M*m-h*o*f+a*u*f,C=g*u*c-h*M*c-g*o*d+a*M*d+h*o*p-a*u*p,A=t*w+i*T+r*E+s*C;if(A===0)return this.set(0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0);const P=1/A;return e[0]=w*P,e[1]=(M*d*s-u*p*s-M*r*m+i*p*m+u*r*f-i*d*f)*P,e[2]=(o*p*s-M*c*s+M*r*l-i*p*l-o*r*f+i*c*f)*P,e[3]=(u*c*s-o*d*s-u*r*l+i*d*l+o*r*m-i*c*m)*P,e[4]=T*P,e[5]=(h*p*s-g*d*s+g*r*m-t*p*m-h*r*f+t*d*f)*P,e[6]=(g*c*s-a*p*s-g*r*l+t*p*l+a*r*f-t*c*f)*P,e[7]=(a*d*s-h*c*s+h*r*l-t*d*l-a*r*m+t*c*m)*P,e[8]=E*P,e[9]=(g*u*s-h*M*s-g*i*m+t*M*m+h*i*f-t*u*f)*P,e[10]=(a*M*s-g*o*s+g*i*l-t*M*l-a*i*f+t*o*f)*P,e[11]=(h*o*s-a*u*s-h*i*l+t*u*l+a*i*m-t*o*m)*P,e[12]=C*P,e[13]=(h*M*r-g*u*r+g*i*d-t*M*d-h*i*p+t*u*p)*P,e[14]=(g*o*r-a*M*r-g*i*c+t*M*c+a*i*p-t*o*p)*P,e[15]=(a*u*r-h*o*r+h*i*c-t*u*c-a*i*d+t*o*d)*P,this}scale(e){const t=this.elements,i=e.x,r=e.y,s=e.z;return t[0]*=i,t[4]*=r,t[8]*=s,t[1]*=i,t[5]*=r,t[9]*=s,t[2]*=i,t[6]*=r,t[10]*=s,t[3]*=i,t[7]*=r,t[11]*=s,this}getMaxScaleOnAxis(){const e=this.elements,t=e[0]*e[0]+e[1]*e[1]+e[2]*e[2],i=e[4]*e[4]+e[5]*e[5]+e[6]*e[6],r=e[8]*e[8]+e[9]*e[9]+e[10]*e[10];return Math.sqrt(Math.max(t,i,r))}makeTranslation(e,t,i){return e.isVector3?this.set(1,0,0,e.x,0,1,0,e.y,0,0,1,e.z,0,0,0,1):this.set(1,0,0,e,0,1,0,t,0,0,1,i,0,0,0,1),this}makeRotationX(e){const t=Math.cos(e),i=Math.sin(e);return this.set(1,0,0,0,0,t,-i,0,0,i,t,0,0,0,0,1),this}makeRotationY(e){const t=Math.cos(e),i=Math.sin(e);return this.set(t,0,i,0,0,1,0,0,-i,0,t,0,0,0,0,1),this}makeRotationZ(e){const t=Math.cos(e),i=Math.sin(e);return this.set(t,-i,0,0,i,t,0,0,0,0,1,0,0,0,0,1),this}makeRotationAxis(e,t){const i=Math.cos(t),r=Math.sin(t),s=1-i,a=e.x,o=e.y,c=e.z,l=s*a,h=s*o;return this.set(l*a+i,l*o-r*c,l*c+r*o,0,l*o+r*c,h*o+i,h*c-r*a,0,l*c-r*o,h*c+r*a,s*c*c+i,0,0,0,0,1),this}makeScale(e,t,i){return this.set(e,0,0,0,0,t,0,0,0,0,i,0,0,0,0,1),this}makeShear(e,t,i,r,s,a){return this.set(1,i,s,0,e,1,a,0,t,r,1,0,0,0,0,1),this}compose(e,t,i){const r=this.elements,s=t._x,a=t._y,o=t._z,c=t._w,l=s+s,h=a+a,u=o+o,d=s*l,m=s*h,g=s*u,M=a*h,p=a*u,f=o*u,w=c*l,T=c*h,E=c*u,C=i.x,A=i.y,P=i.z;return r[0]=(1-(M+f))*C,r[1]=(m+E)*C,r[2]=(g-T)*C,r[3]=0,r[4]=(m-E)*A,r[5]=(1-(d+f))*A,r[6]=(p+w)*A,r[7]=0,r[8]=(g+T)*P,r[9]=(p-w)*P,r[10]=(1-(d+M))*P,r[11]=0,r[12]=e.x,r[13]=e.y,r[14]=e.z,r[15]=1,this}decompose(e,t,i){const r=this.elements;let s=jn.set(r[0],r[1],r[2]).length();const a=jn.set(r[4],r[5],r[6]).length(),o=jn.set(r[8],r[9],r[10]).length();this.determinant()<0&&(s=-s),e.x=r[12],e.y=r[13],e.z=r[14],Bt.copy(this);const l=1/s,h=1/a,u=1/o;return Bt.elements[0]*=l,Bt.elements[1]*=l,Bt.elements[2]*=l,Bt.elements[4]*=h,Bt.elements[5]*=h,Bt.elements[6]*=h,Bt.elements[8]*=u,Bt.elements[9]*=u,Bt.elements[10]*=u,t.setFromRotationMatrix(Bt),i.x=s,i.y=a,i.z=o,this}makePerspective(e,t,i,r,s,a,o=ln){const c=this.elements,l=2*s/(t-e),h=2*s/(i-r),u=(t+e)/(t-e),d=(i+r)/(i-r);let m,g;if(o===ln)m=-(a+s)/(a-s),g=-2*a*s/(a-s);else if(o===br)m=-a/(a-s),g=-a*s/(a-s);else throw new Error("THREE.Matrix4.makePerspective(): Invalid coordinate system: "+o);return c[0]=l,c[4]=0,c[8]=u,c[12]=0,c[1]=0,c[5]=h,c[9]=d,c[13]=0,c[2]=0,c[6]=0,c[10]=m,c[14]=g,c[3]=0,c[7]=0,c[11]=-1,c[15]=0,this}makeOrthographic(e,t,i,r,s,a,o=ln){const c=this.elements,l=1/(t-e),h=1/(i-r),u=1/(a-s),d=(t+e)*l,m=(i+r)*h;let g,M;if(o===ln)g=(a+s)*u,M=-2*u;else if(o===br)g=s*u,M=-1*u;else throw new Error("THREE.Matrix4.makeOrthographic(): Invalid coordinate system: "+o);return c[0]=2*l,c[4]=0,c[8]=0,c[12]=-d,c[1]=0,c[5]=2*h,c[9]=0,c[13]=-m,c[2]=0,c[6]=0,c[10]=M,c[14]=-g,c[3]=0,c[7]=0,c[11]=0,c[15]=1,this}equals(e){const t=this.elements,i=e.elements;for(let r=0;r<16;r++)if(t[r]!==i[r])return!1;return!0}fromArray(e,t=0){for(let i=0;i<16;i++)this.elements[i]=e[i+t];return this}toArray(e=[],t=0){const i=this.elements;return e[t]=i[0],e[t+1]=i[1],e[t+2]=i[2],e[t+3]=i[3],e[t+4]=i[4],e[t+5]=i[5],e[t+6]=i[6],e[t+7]=i[7],e[t+8]=i[8],e[t+9]=i[9],e[t+10]=i[10],e[t+11]=i[11],e[t+12]=i[12],e[t+13]=i[13],e[t+14]=i[14],e[t+15]=i[15],e}}const jn=new B,Bt=new st,Ph=new B(0,0,0),Dh=new B(1,1,1),pn=new B,ji=new B,At=new B,Xa=new st,qa=new Bi;class Yt{constructor(e=0,t=0,i=0,r=Yt.DEFAULT_ORDER){this.isEuler=!0,this._x=e,this._y=t,this._z=i,this._order=r}get x(){return this._x}set x(e){this._x=e,this._onChangeCallback()}get y(){return this._y}set y(e){this._y=e,this._onChangeCallback()}get z(){return this._z}set z(e){this._z=e,this._onChangeCallback()}get order(){return this._order}set order(e){this._order=e,this._onChangeCallback()}set(e,t,i,r=this._order){return this._x=e,this._y=t,this._z=i,this._order=r,this._onChangeCallback(),this}clone(){return new this.constructor(this._x,this._y,this._z,this._order)}copy(e){return this._x=e._x,this._y=e._y,this._z=e._z,this._order=e._order,this._onChangeCallback(),this}setFromRotationMatrix(e,t=this._order,i=!0){const r=e.elements,s=r[0],a=r[4],o=r[8],c=r[1],l=r[5],h=r[9],u=r[2],d=r[6],m=r[10];switch(t){case"XYZ":this._y=Math.asin(Ie(o,-1,1)),Math.abs(o)<.9999999?(this._x=Math.atan2(-h,m),this._z=Math.atan2(-a,s)):(this._x=Math.atan2(d,l),this._z=0);break;case"YXZ":this._x=Math.asin(-Ie(h,-1,1)),Math.abs(h)<.9999999?(this._y=Math.atan2(o,m),this._z=Math.atan2(c,l)):(this._y=Math.atan2(-u,s),this._z=0);break;case"ZXY":this._x=Math.asin(Ie(d,-1,1)),Math.abs(d)<.9999999?(this._y=Math.atan2(-u,m),this._z=Math.atan2(-a,l)):(this._y=0,this._z=Math.atan2(c,s));break;case"ZYX":this._y=Math.asin(-Ie(u,-1,1)),Math.abs(u)<.9999999?(this._x=Math.atan2(d,m),this._z=Math.atan2(c,s)):(this._x=0,this._z=Math.atan2(-a,l));break;case"YZX":this._z=Math.asin(Ie(c,-1,1)),Math.abs(c)<.9999999?(this._x=Math.atan2(-h,l),this._y=Math.atan2(-u,s)):(this._x=0,this._y=Math.atan2(o,m));break;case"XZY":this._z=Math.asin(-Ie(a,-1,1)),Math.abs(a)<.9999999?(this._x=Math.atan2(d,l),this._y=Math.atan2(o,s)):(this._x=Math.atan2(-h,m),this._y=0);break;default:console.warn("THREE.Euler: .setFromRotationMatrix() encountered an unknown order: "+t)}return this._order=t,i===!0&&this._onChangeCallback(),this}setFromQuaternion(e,t,i){return Xa.makeRotationFromQuaternion(e),this.setFromRotationMatrix(Xa,t,i)}setFromVector3(e,t=this._order){return this.set(e.x,e.y,e.z,t)}reorder(e){return qa.setFromEuler(this),this.setFromQuaternion(qa,e)}equals(e){return e._x===this._x&&e._y===this._y&&e._z===this._z&&e._order===this._order}fromArray(e){return this._x=e[0],this._y=e[1],this._z=e[2],e[3]!==void 0&&(this._order=e[3]),this._onChangeCallback(),this}toArray(e=[],t=0){return e[t]=this._x,e[t+1]=this._y,e[t+2]=this._z,e[t+3]=this._order,e}_onChange(e){return this._onChangeCallback=e,this}_onChangeCallback(){}*[Symbol.iterator](){yield this._x,yield this._y,yield this._z,yield this._order}}Yt.DEFAULT_ORDER="XYZ";class hl{constructor(){this.mask=1}set(e){this.mask=(1<<e|0)>>>0}enable(e){this.mask|=1<<e|0}enableAll(){this.mask=-1}toggle(e){this.mask^=1<<e|0}disable(e){this.mask&=~(1<<e|0)}disableAll(){this.mask=0}test(e){return(this.mask&e.mask)!==0}isEnabled(e){return(this.mask&(1<<e|0))!==0}}let Lh=0;const Ya=new B,Jn=new Bi,rn=new st,Ji=new B,wi=new B,Uh=new B,Ih=new Bi,$a=new B(1,0,0),Za=new B(0,1,0),Ka=new B(0,0,1),ja={type:"added"},Nh={type:"removed"},Qn={type:"childadded",child:null},Vr={type:"childremoved",child:null};class gt extends Mi{constructor(){super(),this.isObject3D=!0,Object.defineProperty(this,"id",{value:Lh++}),this.uuid=Si(),this.name="",this.type="Object3D",this.parent=null,this.children=[],this.up=gt.DEFAULT_UP.clone();const e=new B,t=new Yt,i=new Bi,r=new B(1,1,1);function s(){i.setFromEuler(t,!1)}function a(){t.setFromQuaternion(i,void 0,!1)}t._onChange(s),i._onChange(a),Object.defineProperties(this,{position:{configurable:!0,enumerable:!0,value:e},rotation:{configurable:!0,enumerable:!0,value:t},quaternion:{configurable:!0,enumerable:!0,value:i},scale:{configurable:!0,enumerable:!0,value:r},modelViewMatrix:{value:new st},normalMatrix:{value:new Ce}}),this.matrix=new st,this.matrixWorld=new st,this.matrixAutoUpdate=gt.DEFAULT_MATRIX_AUTO_UPDATE,this.matrixWorldAutoUpdate=gt.DEFAULT_MATRIX_WORLD_AUTO_UPDATE,this.matrixWorldNeedsUpdate=!1,this.layers=new hl,this.visible=!0,this.castShadow=!1,this.receiveShadow=!1,this.frustumCulled=!0,this.renderOrder=0,this.animations=[],this.userData={}}onBeforeShadow(){}onAfterShadow(){}onBeforeRender(){}onAfterRender(){}applyMatrix4(e){this.matrixAutoUpdate&&this.updateMatrix(),this.matrix.premultiply(e),this.matrix.decompose(this.position,this.quaternion,this.scale)}applyQuaternion(e){return this.quaternion.premultiply(e),this}setRotationFromAxisAngle(e,t){this.quaternion.setFromAxisAngle(e,t)}setRotationFromEuler(e){this.quaternion.setFromEuler(e,!0)}setRotationFromMatrix(e){this.quaternion.setFromRotationMatrix(e)}setRotationFromQuaternion(e){this.quaternion.copy(e)}rotateOnAxis(e,t){return Jn.setFromAxisAngle(e,t),this.quaternion.multiply(Jn),this}rotateOnWorldAxis(e,t){return Jn.setFromAxisAngle(e,t),this.quaternion.premultiply(Jn),this}rotateX(e){return this.rotateOnAxis($a,e)}rotateY(e){return this.rotateOnAxis(Za,e)}rotateZ(e){return this.rotateOnAxis(Ka,e)}translateOnAxis(e,t){return Ya.copy(e).applyQuaternion(this.quaternion),this.position.add(Ya.multiplyScalar(t)),this}translateX(e){return this.translateOnAxis($a,e)}translateY(e){return this.translateOnAxis(Za,e)}translateZ(e){return this.translateOnAxis(Ka,e)}localToWorld(e){return this.updateWorldMatrix(!0,!1),e.applyMatrix4(this.matrixWorld)}worldToLocal(e){return this.updateWorldMatrix(!0,!1),e.applyMatrix4(rn.copy(this.matrixWorld).invert())}lookAt(e,t,i){e.isVector3?Ji.copy(e):Ji.set(e,t,i);const r=this.parent;this.updateWorldMatrix(!0,!1),wi.setFromMatrixPosition(this.matrixWorld),this.isCamera||this.isLight?rn.lookAt(wi,Ji,this.up):rn.lookAt(Ji,wi,this.up),this.quaternion.setFromRotationMatrix(rn),r&&(rn.extractRotation(r.matrixWorld),Jn.setFromRotationMatrix(rn),this.quaternion.premultiply(Jn.invert()))}add(e){if(arguments.length>1){for(let t=0;t<arguments.length;t++)this.add(arguments[t]);return this}return e===this?(console.error("THREE.Object3D.add: object can't be added as a child of itself.",e),this):(e&&e.isObject3D?(e.removeFromParent(),e.parent=this,this.children.push(e),e.dispatchEvent(ja),Qn.child=e,this.dispatchEvent(Qn),Qn.child=null):console.error("THREE.Object3D.add: object not an instance of THREE.Object3D.",e),this)}remove(e){if(arguments.length>1){for(let i=0;i<arguments.length;i++)this.remove(arguments[i]);return this}const t=this.children.indexOf(e);return t!==-1&&(e.parent=null,this.children.splice(t,1),e.dispatchEvent(Nh),Vr.child=e,this.dispatchEvent(Vr),Vr.child=null),this}removeFromParent(){const e=this.parent;return e!==null&&e.remove(this),this}clear(){return this.remove(...this.children)}attach(e){return this.updateWorldMatrix(!0,!1),rn.copy(this.matrixWorld).invert(),e.parent!==null&&(e.parent.updateWorldMatrix(!0,!1),rn.multiply(e.parent.matrixWorld)),e.applyMatrix4(rn),e.removeFromParent(),e.parent=this,this.children.push(e),e.updateWorldMatrix(!1,!0),e.dispatchEvent(ja),Qn.child=e,this.dispatchEvent(Qn),Qn.child=null,this}getObjectById(e){return this.getObjectByProperty("id",e)}getObjectByName(e){return this.getObjectByProperty("name",e)}getObjectByProperty(e,t){if(this[e]===t)return this;for(let i=0,r=this.children.length;i<r;i++){const a=this.children[i].getObjectByProperty(e,t);if(a!==void 0)return a}}getObjectsByProperty(e,t,i=[]){this[e]===t&&i.push(this);const r=this.children;for(let s=0,a=r.length;s<a;s++)r[s].getObjectsByProperty(e,t,i);return i}getWorldPosition(e){return this.updateWorldMatrix(!0,!1),e.setFromMatrixPosition(this.matrixWorld)}getWorldQuaternion(e){return this.updateWorldMatrix(!0,!1),this.matrixWorld.decompose(wi,e,Uh),e}getWorldScale(e){return this.updateWorldMatrix(!0,!1),this.matrixWorld.decompose(wi,Ih,e),e}getWorldDirection(e){this.updateWorldMatrix(!0,!1);const t=this.matrixWorld.elements;return e.set(t[8],t[9],t[10]).normalize()}raycast(){}traverse(e){e(this);const t=this.children;for(let i=0,r=t.length;i<r;i++)t[i].traverse(e)}traverseVisible(e){if(this.visible===!1)return;e(this);const t=this.children;for(let i=0,r=t.length;i<r;i++)t[i].traverseVisible(e)}traverseAncestors(e){const t=this.parent;t!==null&&(e(t),t.traverseAncestors(e))}updateMatrix(){this.matrix.compose(this.position,this.quaternion,this.scale),this.matrixWorldNeedsUpdate=!0}updateMatrixWorld(e){this.matrixAutoUpdate&&this.updateMatrix(),(this.matrixWorldNeedsUpdate||e)&&(this.matrixWorldAutoUpdate===!0&&(this.parent===null?this.matrixWorld.copy(this.matrix):this.matrixWorld.multiplyMatrices(this.parent.matrixWorld,this.matrix)),this.matrixWorldNeedsUpdate=!1,e=!0);const t=this.children;for(let i=0,r=t.length;i<r;i++)t[i].updateMatrixWorld(e)}updateWorldMatrix(e,t){const i=this.parent;if(e===!0&&i!==null&&i.updateWorldMatrix(!0,!1),this.matrixAutoUpdate&&this.updateMatrix(),this.matrixWorldAutoUpdate===!0&&(this.parent===null?this.matrixWorld.copy(this.matrix):this.matrixWorld.multiplyMatrices(this.parent.matrixWorld,this.matrix)),t===!0){const r=this.children;for(let s=0,a=r.length;s<a;s++)r[s].updateWorldMatrix(!1,!0)}}toJSON(e){const t=e===void 0||typeof e=="string",i={};t&&(e={geometries:{},materials:{},textures:{},images:{},shapes:{},skeletons:{},animations:{},nodes:{}},i.metadata={version:4.6,type:"Object",generator:"Object3D.toJSON"});const r={};r.uuid=this.uuid,r.type=this.type,this.name!==""&&(r.name=this.name),this.castShadow===!0&&(r.castShadow=!0),this.receiveShadow===!0&&(r.receiveShadow=!0),this.visible===!1&&(r.visible=!1),this.frustumCulled===!1&&(r.frustumCulled=!1),this.renderOrder!==0&&(r.renderOrder=this.renderOrder),Object.keys(this.userData).length>0&&(r.userData=this.userData),r.layers=this.layers.mask,r.matrix=this.matrix.toArray(),r.up=this.up.toArray(),this.matrixAutoUpdate===!1&&(r.matrixAutoUpdate=!1),this.isInstancedMesh&&(r.type="InstancedMesh",r.count=this.count,r.instanceMatrix=this.instanceMatrix.toJSON(),this.instanceColor!==null&&(r.instanceColor=this.instanceColor.toJSON())),this.isBatchedMesh&&(r.type="BatchedMesh",r.perObjectFrustumCulled=this.perObjectFrustumCulled,r.sortObjects=this.sortObjects,r.drawRanges=this._drawRanges,r.reservedRanges=this._reservedRanges,r.visibility=this._visibility,r.active=this._active,r.bounds=this._bounds.map(o=>({boxInitialized:o.boxInitialized,boxMin:o.box.min.toArray(),boxMax:o.box.max.toArray(),sphereInitialized:o.sphereInitialized,sphereRadius:o.sphere.radius,sphereCenter:o.sphere.center.toArray()})),r.maxInstanceCount=this._maxInstanceCount,r.maxVertexCount=this._maxVertexCount,r.maxIndexCount=this._maxIndexCount,r.geometryInitialized=this._geometryInitialized,r.geometryCount=this._geometryCount,r.matricesTexture=this._matricesTexture.toJSON(e),this._colorsTexture!==null&&(r.colorsTexture=this._colorsTexture.toJSON(e)),this.boundingSphere!==null&&(r.boundingSphere={center:r.boundingSphere.center.toArray(),radius:r.boundingSphere.radius}),this.boundingBox!==null&&(r.boundingBox={min:r.boundingBox.min.toArray(),max:r.boundingBox.max.toArray()}));function s(o,c){return o[c.uuid]===void 0&&(o[c.uuid]=c.toJSON(e)),c.uuid}if(this.isScene)this.background&&(this.background.isColor?r.background=this.background.toJSON():this.background.isTexture&&(r.background=this.background.toJSON(e).uuid)),this.environment&&this.environment.isTexture&&this.environment.isRenderTargetTexture!==!0&&(r.environment=this.environment.toJSON(e).uuid);else if(this.isMesh||this.isLine||this.isPoints){r.geometry=s(e.geometries,this.geometry);const o=this.geometry.parameters;if(o!==void 0&&o.shapes!==void 0){const c=o.shapes;if(Array.isArray(c))for(let l=0,h=c.length;l<h;l++){const u=c[l];s(e.shapes,u)}else s(e.shapes,c)}}if(this.isSkinnedMesh&&(r.bindMode=this.bindMode,r.bindMatrix=this.bindMatrix.toArray(),this.skeleton!==void 0&&(s(e.skeletons,this.skeleton),r.skeleton=this.skeleton.uuid)),this.material!==void 0)if(Array.isArray(this.material)){const o=[];for(let c=0,l=this.material.length;c<l;c++)o.push(s(e.materials,this.material[c]));r.material=o}else r.material=s(e.materials,this.material);if(this.children.length>0){r.children=[];for(let o=0;o<this.children.length;o++)r.children.push(this.children[o].toJSON(e).object)}if(this.animations.length>0){r.animations=[];for(let o=0;o<this.animations.length;o++){const c=this.animations[o];r.animations.push(s(e.animations,c))}}if(t){const o=a(e.geometries),c=a(e.materials),l=a(e.textures),h=a(e.images),u=a(e.shapes),d=a(e.skeletons),m=a(e.animations),g=a(e.nodes);o.length>0&&(i.geometries=o),c.length>0&&(i.materials=c),l.length>0&&(i.textures=l),h.length>0&&(i.images=h),u.length>0&&(i.shapes=u),d.length>0&&(i.skeletons=d),m.length>0&&(i.animations=m),g.length>0&&(i.nodes=g)}return i.object=r,i;function a(o){const c=[];for(const l in o){const h=o[l];delete h.metadata,c.push(h)}return c}}clone(e){return new this.constructor().copy(this,e)}copy(e,t=!0){if(this.name=e.name,this.up.copy(e.up),this.position.copy(e.position),this.rotation.order=e.rotation.order,this.quaternion.copy(e.quaternion),this.scale.copy(e.scale),this.matrix.copy(e.matrix),this.matrixWorld.copy(e.matrixWorld),this.matrixAutoUpdate=e.matrixAutoUpdate,this.matrixWorldAutoUpdate=e.matrixWorldAutoUpdate,this.matrixWorldNeedsUpdate=e.matrixWorldNeedsUpdate,this.layers.mask=e.layers.mask,this.visible=e.visible,this.castShadow=e.castShadow,this.receiveShadow=e.receiveShadow,this.frustumCulled=e.frustumCulled,this.renderOrder=e.renderOrder,this.animations=e.animations.slice(),this.userData=JSON.parse(JSON.stringify(e.userData)),t===!0)for(let i=0;i<e.children.length;i++){const r=e.children[i];this.add(r.clone())}return this}}gt.DEFAULT_UP=new B(0,1,0);gt.DEFAULT_MATRIX_AUTO_UPDATE=!0;gt.DEFAULT_MATRIX_WORLD_AUTO_UPDATE=!0;const zt=new B,sn=new B,Gr=new B,an=new B,ei=new B,ti=new B,Ja=new B,kr=new B,Wr=new B,Xr=new B,qr=new rt,Yr=new rt,$r=new rt;class kt{constructor(e=new B,t=new B,i=new B){this.a=e,this.b=t,this.c=i}static getNormal(e,t,i,r){r.subVectors(i,t),zt.subVectors(e,t),r.cross(zt);const s=r.lengthSq();return s>0?r.multiplyScalar(1/Math.sqrt(s)):r.set(0,0,0)}static getBarycoord(e,t,i,r,s){zt.subVectors(r,t),sn.subVectors(i,t),Gr.subVectors(e,t);const a=zt.dot(zt),o=zt.dot(sn),c=zt.dot(Gr),l=sn.dot(sn),h=sn.dot(Gr),u=a*l-o*o;if(u===0)return s.set(0,0,0),null;const d=1/u,m=(l*c-o*h)*d,g=(a*h-o*c)*d;return s.set(1-m-g,g,m)}static containsPoint(e,t,i,r){return this.getBarycoord(e,t,i,r,an)===null?!1:an.x>=0&&an.y>=0&&an.x+an.y<=1}static getInterpolation(e,t,i,r,s,a,o,c){return this.getBarycoord(e,t,i,r,an)===null?(c.x=0,c.y=0,"z"in c&&(c.z=0),"w"in c&&(c.w=0),null):(c.setScalar(0),c.addScaledVector(s,an.x),c.addScaledVector(a,an.y),c.addScaledVector(o,an.z),c)}static getInterpolatedAttribute(e,t,i,r,s,a){return qr.setScalar(0),Yr.setScalar(0),$r.setScalar(0),qr.fromBufferAttribute(e,t),Yr.fromBufferAttribute(e,i),$r.fromBufferAttribute(e,r),a.setScalar(0),a.addScaledVector(qr,s.x),a.addScaledVector(Yr,s.y),a.addScaledVector($r,s.z),a}static isFrontFacing(e,t,i,r){return zt.subVectors(i,t),sn.subVectors(e,t),zt.cross(sn).dot(r)<0}set(e,t,i){return this.a.copy(e),this.b.copy(t),this.c.copy(i),this}setFromPointsAndIndices(e,t,i,r){return this.a.copy(e[t]),this.b.copy(e[i]),this.c.copy(e[r]),this}setFromAttributeAndIndices(e,t,i,r){return this.a.fromBufferAttribute(e,t),this.b.fromBufferAttribute(e,i),this.c.fromBufferAttribute(e,r),this}clone(){return new this.constructor().copy(this)}copy(e){return this.a.copy(e.a),this.b.copy(e.b),this.c.copy(e.c),this}getArea(){return zt.subVectors(this.c,this.b),sn.subVectors(this.a,this.b),zt.cross(sn).length()*.5}getMidpoint(e){return e.addVectors(this.a,this.b).add(this.c).multiplyScalar(1/3)}getNormal(e){return kt.getNormal(this.a,this.b,this.c,e)}getPlane(e){return e.setFromCoplanarPoints(this.a,this.b,this.c)}getBarycoord(e,t){return kt.getBarycoord(e,this.a,this.b,this.c,t)}getInterpolation(e,t,i,r,s){return kt.getInterpolation(e,this.a,this.b,this.c,t,i,r,s)}containsPoint(e){return kt.containsPoint(e,this.a,this.b,this.c)}isFrontFacing(e){return kt.isFrontFacing(this.a,this.b,this.c,e)}intersectsBox(e){return e.intersectsTriangle(this)}closestPointToPoint(e,t){const i=this.a,r=this.b,s=this.c;let a,o;ei.subVectors(r,i),ti.subVectors(s,i),kr.subVectors(e,i);const c=ei.dot(kr),l=ti.dot(kr);if(c<=0&&l<=0)return t.copy(i);Wr.subVectors(e,r);const h=ei.dot(Wr),u=ti.dot(Wr);if(h>=0&&u<=h)return t.copy(r);const d=c*u-h*l;if(d<=0&&c>=0&&h<=0)return a=c/(c-h),t.copy(i).addScaledVector(ei,a);Xr.subVectors(e,s);const m=ei.dot(Xr),g=ti.dot(Xr);if(g>=0&&m<=g)return t.copy(s);const M=m*l-c*g;if(M<=0&&l>=0&&g<=0)return o=l/(l-g),t.copy(i).addScaledVector(ti,o);const p=h*g-m*u;if(p<=0&&u-h>=0&&m-g>=0)return Ja.subVectors(s,r),o=(u-h)/(u-h+(m-g)),t.copy(r).addScaledVector(Ja,o);const f=1/(p+M+d);return a=M*f,o=d*f,t.copy(i).addScaledVector(ei,a).addScaledVector(ti,o)}equals(e){return e.a.equals(this.a)&&e.b.equals(this.b)&&e.c.equals(this.c)}}const fl={aliceblue:15792383,antiquewhite:16444375,aqua:65535,aquamarine:8388564,azure:15794175,beige:16119260,bisque:16770244,black:0,blanchedalmond:16772045,blue:255,blueviolet:9055202,brown:10824234,burlywood:14596231,cadetblue:6266528,chartreuse:8388352,chocolate:13789470,coral:16744272,cornflowerblue:6591981,cornsilk:16775388,crimson:14423100,cyan:65535,darkblue:139,darkcyan:35723,darkgoldenrod:12092939,darkgray:11119017,darkgreen:25600,darkgrey:11119017,darkkhaki:12433259,darkmagenta:9109643,darkolivegreen:5597999,darkorange:16747520,darkorchid:10040012,darkred:9109504,darksalmon:15308410,darkseagreen:9419919,darkslateblue:4734347,darkslategray:3100495,darkslategrey:3100495,darkturquoise:52945,darkviolet:9699539,deeppink:16716947,deepskyblue:49151,dimgray:6908265,dimgrey:6908265,dodgerblue:2003199,firebrick:11674146,floralwhite:16775920,forestgreen:2263842,fuchsia:16711935,gainsboro:14474460,ghostwhite:16316671,gold:16766720,goldenrod:14329120,gray:8421504,green:32768,greenyellow:11403055,grey:8421504,honeydew:15794160,hotpink:16738740,indianred:13458524,indigo:4915330,ivory:16777200,khaki:15787660,lavender:15132410,lavenderblush:16773365,lawngreen:8190976,lemonchiffon:16775885,lightblue:11393254,lightcoral:15761536,lightcyan:14745599,lightgoldenrodyellow:16448210,lightgray:13882323,lightgreen:9498256,lightgrey:13882323,lightpink:16758465,lightsalmon:16752762,lightseagreen:2142890,lightskyblue:8900346,lightslategray:7833753,lightslategrey:7833753,lightsteelblue:11584734,lightyellow:16777184,lime:65280,limegreen:3329330,linen:16445670,magenta:16711935,maroon:8388608,mediumaquamarine:6737322,mediumblue:205,mediumorchid:12211667,mediumpurple:9662683,mediumseagreen:3978097,mediumslateblue:8087790,mediumspringgreen:64154,mediumturquoise:4772300,mediumvioletred:13047173,midnightblue:1644912,mintcream:16121850,mistyrose:16770273,moccasin:16770229,navajowhite:16768685,navy:128,oldlace:16643558,olive:8421376,olivedrab:7048739,orange:16753920,orangered:16729344,orchid:14315734,palegoldenrod:15657130,palegreen:10025880,paleturquoise:11529966,palevioletred:14381203,papayawhip:16773077,peachpuff:16767673,peru:13468991,pink:16761035,plum:14524637,powderblue:11591910,purple:8388736,rebeccapurple:6697881,red:16711680,rosybrown:12357519,royalblue:4286945,saddlebrown:9127187,salmon:16416882,sandybrown:16032864,seagreen:3050327,seashell:16774638,sienna:10506797,silver:12632256,skyblue:8900331,slateblue:6970061,slategray:7372944,slategrey:7372944,snow:16775930,springgreen:65407,steelblue:4620980,tan:13808780,teal:32896,thistle:14204888,tomato:16737095,turquoise:4251856,violet:15631086,wheat:16113331,white:16777215,whitesmoke:16119285,yellow:16776960,yellowgreen:10145074},mn={h:0,s:0,l:0},Qi={h:0,s:0,l:0};function Zr(n,e,t){return t<0&&(t+=1),t>1&&(t-=1),t<1/6?n+(e-n)*6*t:t<1/2?e:t<2/3?n+(e-n)*6*(2/3-t):n}class ze{constructor(e,t,i){return this.isColor=!0,this.r=1,this.g=1,this.b=1,this.set(e,t,i)}set(e,t,i){if(t===void 0&&i===void 0){const r=e;r&&r.isColor?this.copy(r):typeof r=="number"?this.setHex(r):typeof r=="string"&&this.setStyle(r)}else this.setRGB(e,t,i);return this}setScalar(e){return this.r=e,this.g=e,this.b=e,this}setHex(e,t=Lt){return e=Math.floor(e),this.r=(e>>16&255)/255,this.g=(e>>8&255)/255,this.b=(e&255)/255,ke.toWorkingColorSpace(this,t),this}setRGB(e,t,i,r=ke.workingColorSpace){return this.r=e,this.g=t,this.b=i,ke.toWorkingColorSpace(this,r),this}setHSL(e,t,i,r=ke.workingColorSpace){if(e=fa(e,1),t=Ie(t,0,1),i=Ie(i,0,1),t===0)this.r=this.g=this.b=i;else{const s=i<=.5?i*(1+t):i+t-i*t,a=2*i-s;this.r=Zr(a,s,e+1/3),this.g=Zr(a,s,e),this.b=Zr(a,s,e-1/3)}return ke.toWorkingColorSpace(this,r),this}setStyle(e,t=Lt){function i(s){s!==void 0&&parseFloat(s)<1&&console.warn("THREE.Color: Alpha component of "+e+" will be ignored.")}let r;if(r=/^(\w+)\(([^\)]*)\)/.exec(e)){let s;const a=r[1],o=r[2];switch(a){case"rgb":case"rgba":if(s=/^\s*(\d+)\s*,\s*(\d+)\s*,\s*(\d+)\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(o))return i(s[4]),this.setRGB(Math.min(255,parseInt(s[1],10))/255,Math.min(255,parseInt(s[2],10))/255,Math.min(255,parseInt(s[3],10))/255,t);if(s=/^\s*(\d+)\%\s*,\s*(\d+)\%\s*,\s*(\d+)\%\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(o))return i(s[4]),this.setRGB(Math.min(100,parseInt(s[1],10))/100,Math.min(100,parseInt(s[2],10))/100,Math.min(100,parseInt(s[3],10))/100,t);break;case"hsl":case"hsla":if(s=/^\s*(\d*\.?\d+)\s*,\s*(\d*\.?\d+)\%\s*,\s*(\d*\.?\d+)\%\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(o))return i(s[4]),this.setHSL(parseFloat(s[1])/360,parseFloat(s[2])/100,parseFloat(s[3])/100,t);break;default:console.warn("THREE.Color: Unknown color model "+e)}}else if(r=/^\#([A-Fa-f\d]+)$/.exec(e)){const s=r[1],a=s.length;if(a===3)return this.setRGB(parseInt(s.charAt(0),16)/15,parseInt(s.charAt(1),16)/15,parseInt(s.charAt(2),16)/15,t);if(a===6)return this.setHex(parseInt(s,16),t);console.warn("THREE.Color: Invalid hex color "+e)}else if(e&&e.length>0)return this.setColorName(e,t);return this}setColorName(e,t=Lt){const i=fl[e.toLowerCase()];return i!==void 0?this.setHex(i,t):console.warn("THREE.Color: Unknown color "+e),this}clone(){return new this.constructor(this.r,this.g,this.b)}copy(e){return this.r=e.r,this.g=e.g,this.b=e.b,this}copySRGBToLinear(e){return this.r=cn(e.r),this.g=cn(e.g),this.b=cn(e.b),this}copyLinearToSRGB(e){return this.r=hi(e.r),this.g=hi(e.g),this.b=hi(e.b),this}convertSRGBToLinear(){return this.copySRGBToLinear(this),this}convertLinearToSRGB(){return this.copyLinearToSRGB(this),this}getHex(e=Lt){return ke.fromWorkingColorSpace(_t.copy(this),e),Math.round(Ie(_t.r*255,0,255))*65536+Math.round(Ie(_t.g*255,0,255))*256+Math.round(Ie(_t.b*255,0,255))}getHexString(e=Lt){return("000000"+this.getHex(e).toString(16)).slice(-6)}getHSL(e,t=ke.workingColorSpace){ke.fromWorkingColorSpace(_t.copy(this),t);const i=_t.r,r=_t.g,s=_t.b,a=Math.max(i,r,s),o=Math.min(i,r,s);let c,l;const h=(o+a)/2;if(o===a)c=0,l=0;else{const u=a-o;switch(l=h<=.5?u/(a+o):u/(2-a-o),a){case i:c=(r-s)/u+(r<s?6:0);break;case r:c=(s-i)/u+2;break;case s:c=(i-r)/u+4;break}c/=6}return e.h=c,e.s=l,e.l=h,e}getRGB(e,t=ke.workingColorSpace){return ke.fromWorkingColorSpace(_t.copy(this),t),e.r=_t.r,e.g=_t.g,e.b=_t.b,e}getStyle(e=Lt){ke.fromWorkingColorSpace(_t.copy(this),e);const t=_t.r,i=_t.g,r=_t.b;return e!==Lt?`color(${e} ${t.toFixed(3)} ${i.toFixed(3)} ${r.toFixed(3)})`:`rgb(${Math.round(t*255)},${Math.round(i*255)},${Math.round(r*255)})`}offsetHSL(e,t,i){return this.getHSL(mn),this.setHSL(mn.h+e,mn.s+t,mn.l+i)}add(e){return this.r+=e.r,this.g+=e.g,this.b+=e.b,this}addColors(e,t){return this.r=e.r+t.r,this.g=e.g+t.g,this.b=e.b+t.b,this}addScalar(e){return this.r+=e,this.g+=e,this.b+=e,this}sub(e){return this.r=Math.max(0,this.r-e.r),this.g=Math.max(0,this.g-e.g),this.b=Math.max(0,this.b-e.b),this}multiply(e){return this.r*=e.r,this.g*=e.g,this.b*=e.b,this}multiplyScalar(e){return this.r*=e,this.g*=e,this.b*=e,this}lerp(e,t){return this.r+=(e.r-this.r)*t,this.g+=(e.g-this.g)*t,this.b+=(e.b-this.b)*t,this}lerpColors(e,t,i){return this.r=e.r+(t.r-e.r)*i,this.g=e.g+(t.g-e.g)*i,this.b=e.b+(t.b-e.b)*i,this}lerpHSL(e,t){this.getHSL(mn),e.getHSL(Qi);const i=Di(mn.h,Qi.h,t),r=Di(mn.s,Qi.s,t),s=Di(mn.l,Qi.l,t);return this.setHSL(i,r,s),this}setFromVector3(e){return this.r=e.x,this.g=e.y,this.b=e.z,this}applyMatrix3(e){const t=this.r,i=this.g,r=this.b,s=e.elements;return this.r=s[0]*t+s[3]*i+s[6]*r,this.g=s[1]*t+s[4]*i+s[7]*r,this.b=s[2]*t+s[5]*i+s[8]*r,this}equals(e){return e.r===this.r&&e.g===this.g&&e.b===this.b}fromArray(e,t=0){return this.r=e[t],this.g=e[t+1],this.b=e[t+2],this}toArray(e=[],t=0){return e[t]=this.r,e[t+1]=this.g,e[t+2]=this.b,e}fromBufferAttribute(e,t){return this.r=e.getX(t),this.g=e.getY(t),this.b=e.getZ(t),this}toJSON(){return this.getHex()}*[Symbol.iterator](){yield this.r,yield this.g,yield this.b}}const _t=new ze;ze.NAMES=fl;let Fh=0;class Ei extends Mi{constructor(){super(),this.isMaterial=!0,Object.defineProperty(this,"id",{value:Fh++}),this.uuid=Si(),this.name="",this.type="Material",this.blending=ci,this.side=En,this.vertexColors=!1,this.opacity=1,this.transparent=!1,this.alphaHash=!1,this.blendSrc=hs,this.blendDst=fs,this.blendEquation=Nn,this.blendSrcAlpha=null,this.blendDstAlpha=null,this.blendEquationAlpha=null,this.blendColor=new ze(0,0,0),this.blendAlpha=0,this.depthFunc=di,this.depthTest=!0,this.depthWrite=!0,this.stencilWriteMask=255,this.stencilFunc=Oa,this.stencilRef=0,this.stencilFuncMask=255,this.stencilFail=qn,this.stencilZFail=qn,this.stencilZPass=qn,this.stencilWrite=!1,this.clippingPlanes=null,this.clipIntersection=!1,this.clipShadows=!1,this.shadowSide=null,this.colorWrite=!0,this.precision=null,this.polygonOffset=!1,this.polygonOffsetFactor=0,this.polygonOffsetUnits=0,this.dithering=!1,this.alphaToCoverage=!1,this.premultipliedAlpha=!1,this.forceSinglePass=!1,this.visible=!0,this.toneMapped=!0,this.userData={},this.version=0,this._alphaTest=0}get alphaTest(){return this._alphaTest}set alphaTest(e){this._alphaTest>0!=e>0&&this.version++,this._alphaTest=e}onBeforeRender(){}onBeforeCompile(){}customProgramCacheKey(){return this.onBeforeCompile.toString()}setValues(e){if(e!==void 0)for(const t in e){const i=e[t];if(i===void 0){console.warn(`THREE.Material: parameter '${t}' has value of undefined.`);continue}const r=this[t];if(r===void 0){console.warn(`THREE.Material: '${t}' is not a property of THREE.${this.type}.`);continue}r&&r.isColor?r.set(i):r&&r.isVector3&&i&&i.isVector3?r.copy(i):this[t]=i}}toJSON(e){const t=e===void 0||typeof e=="string";t&&(e={textures:{},images:{}});const i={metadata:{version:4.6,type:"Material",generator:"Material.toJSON"}};i.uuid=this.uuid,i.type=this.type,this.name!==""&&(i.name=this.name),this.color&&this.color.isColor&&(i.color=this.color.getHex()),this.roughness!==void 0&&(i.roughness=this.roughness),this.metalness!==void 0&&(i.metalness=this.metalness),this.sheen!==void 0&&(i.sheen=this.sheen),this.sheenColor&&this.sheenColor.isColor&&(i.sheenColor=this.sheenColor.getHex()),this.sheenRoughness!==void 0&&(i.sheenRoughness=this.sheenRoughness),this.emissive&&this.emissive.isColor&&(i.emissive=this.emissive.getHex()),this.emissiveIntensity!==void 0&&this.emissiveIntensity!==1&&(i.emissiveIntensity=this.emissiveIntensity),this.specular&&this.specular.isColor&&(i.specular=this.specular.getHex()),this.specularIntensity!==void 0&&(i.specularIntensity=this.specularIntensity),this.specularColor&&this.specularColor.isColor&&(i.specularColor=this.specularColor.getHex()),this.shininess!==void 0&&(i.shininess=this.shininess),this.clearcoat!==void 0&&(i.clearcoat=this.clearcoat),this.clearcoatRoughness!==void 0&&(i.clearcoatRoughness=this.clearcoatRoughness),this.clearcoatMap&&this.clearcoatMap.isTexture&&(i.clearcoatMap=this.clearcoatMap.toJSON(e).uuid),this.clearcoatRoughnessMap&&this.clearcoatRoughnessMap.isTexture&&(i.clearcoatRoughnessMap=this.clearcoatRoughnessMap.toJSON(e).uuid),this.clearcoatNormalMap&&this.clearcoatNormalMap.isTexture&&(i.clearcoatNormalMap=this.clearcoatNormalMap.toJSON(e).uuid,i.clearcoatNormalScale=this.clearcoatNormalScale.toArray()),this.dispersion!==void 0&&(i.dispersion=this.dispersion),this.iridescence!==void 0&&(i.iridescence=this.iridescence),this.iridescenceIOR!==void 0&&(i.iridescenceIOR=this.iridescenceIOR),this.iridescenceThicknessRange!==void 0&&(i.iridescenceThicknessRange=this.iridescenceThicknessRange),this.iridescenceMap&&this.iridescenceMap.isTexture&&(i.iridescenceMap=this.iridescenceMap.toJSON(e).uuid),this.iridescenceThicknessMap&&this.iridescenceThicknessMap.isTexture&&(i.iridescenceThicknessMap=this.iridescenceThicknessMap.toJSON(e).uuid),this.anisotropy!==void 0&&(i.anisotropy=this.anisotropy),this.anisotropyRotation!==void 0&&(i.anisotropyRotation=this.anisotropyRotation),this.anisotropyMap&&this.anisotropyMap.isTexture&&(i.anisotropyMap=this.anisotropyMap.toJSON(e).uuid),this.map&&this.map.isTexture&&(i.map=this.map.toJSON(e).uuid),this.matcap&&this.matcap.isTexture&&(i.matcap=this.matcap.toJSON(e).uuid),this.alphaMap&&this.alphaMap.isTexture&&(i.alphaMap=this.alphaMap.toJSON(e).uuid),this.lightMap&&this.lightMap.isTexture&&(i.lightMap=this.lightMap.toJSON(e).uuid,i.lightMapIntensity=this.lightMapIntensity),this.aoMap&&this.aoMap.isTexture&&(i.aoMap=this.aoMap.toJSON(e).uuid,i.aoMapIntensity=this.aoMapIntensity),this.bumpMap&&this.bumpMap.isTexture&&(i.bumpMap=this.bumpMap.toJSON(e).uuid,i.bumpScale=this.bumpScale),this.normalMap&&this.normalMap.isTexture&&(i.normalMap=this.normalMap.toJSON(e).uuid,i.normalMapType=this.normalMapType,i.normalScale=this.normalScale.toArray()),this.displacementMap&&this.displacementMap.isTexture&&(i.displacementMap=this.displacementMap.toJSON(e).uuid,i.displacementScale=this.displacementScale,i.displacementBias=this.displacementBias),this.roughnessMap&&this.roughnessMap.isTexture&&(i.roughnessMap=this.roughnessMap.toJSON(e).uuid),this.metalnessMap&&this.metalnessMap.isTexture&&(i.metalnessMap=this.metalnessMap.toJSON(e).uuid),this.emissiveMap&&this.emissiveMap.isTexture&&(i.emissiveMap=this.emissiveMap.toJSON(e).uuid),this.specularMap&&this.specularMap.isTexture&&(i.specularMap=this.specularMap.toJSON(e).uuid),this.specularIntensityMap&&this.specularIntensityMap.isTexture&&(i.specularIntensityMap=this.specularIntensityMap.toJSON(e).uuid),this.specularColorMap&&this.specularColorMap.isTexture&&(i.specularColorMap=this.specularColorMap.toJSON(e).uuid),this.envMap&&this.envMap.isTexture&&(i.envMap=this.envMap.toJSON(e).uuid,this.combine!==void 0&&(i.combine=this.combine)),this.envMapRotation!==void 0&&(i.envMapRotation=this.envMapRotation.toArray()),this.envMapIntensity!==void 0&&(i.envMapIntensity=this.envMapIntensity),this.reflectivity!==void 0&&(i.reflectivity=this.reflectivity),this.refractionRatio!==void 0&&(i.refractionRatio=this.refractionRatio),this.gradientMap&&this.gradientMap.isTexture&&(i.gradientMap=this.gradientMap.toJSON(e).uuid),this.transmission!==void 0&&(i.transmission=this.transmission),this.transmissionMap&&this.transmissionMap.isTexture&&(i.transmissionMap=this.transmissionMap.toJSON(e).uuid),this.thickness!==void 0&&(i.thickness=this.thickness),this.thicknessMap&&this.thicknessMap.isTexture&&(i.thicknessMap=this.thicknessMap.toJSON(e).uuid),this.attenuationDistance!==void 0&&this.attenuationDistance!==1/0&&(i.attenuationDistance=this.attenuationDistance),this.attenuationColor!==void 0&&(i.attenuationColor=this.attenuationColor.getHex()),this.size!==void 0&&(i.size=this.size),this.shadowSide!==null&&(i.shadowSide=this.shadowSide),this.sizeAttenuation!==void 0&&(i.sizeAttenuation=this.sizeAttenuation),this.blending!==ci&&(i.blending=this.blending),this.side!==En&&(i.side=this.side),this.vertexColors===!0&&(i.vertexColors=!0),this.opacity<1&&(i.opacity=this.opacity),this.transparent===!0&&(i.transparent=!0),this.blendSrc!==hs&&(i.blendSrc=this.blendSrc),this.blendDst!==fs&&(i.blendDst=this.blendDst),this.blendEquation!==Nn&&(i.blendEquation=this.blendEquation),this.blendSrcAlpha!==null&&(i.blendSrcAlpha=this.blendSrcAlpha),this.blendDstAlpha!==null&&(i.blendDstAlpha=this.blendDstAlpha),this.blendEquationAlpha!==null&&(i.blendEquationAlpha=this.blendEquationAlpha),this.blendColor&&this.blendColor.isColor&&(i.blendColor=this.blendColor.getHex()),this.blendAlpha!==0&&(i.blendAlpha=this.blendAlpha),this.depthFunc!==di&&(i.depthFunc=this.depthFunc),this.depthTest===!1&&(i.depthTest=this.depthTest),this.depthWrite===!1&&(i.depthWrite=this.depthWrite),this.colorWrite===!1&&(i.colorWrite=this.colorWrite),this.stencilWriteMask!==255&&(i.stencilWriteMask=this.stencilWriteMask),this.stencilFunc!==Oa&&(i.stencilFunc=this.stencilFunc),this.stencilRef!==0&&(i.stencilRef=this.stencilRef),this.stencilFuncMask!==255&&(i.stencilFuncMask=this.stencilFuncMask),this.stencilFail!==qn&&(i.stencilFail=this.stencilFail),this.stencilZFail!==qn&&(i.stencilZFail=this.stencilZFail),this.stencilZPass!==qn&&(i.stencilZPass=this.stencilZPass),this.stencilWrite===!0&&(i.stencilWrite=this.stencilWrite),this.rotation!==void 0&&this.rotation!==0&&(i.rotation=this.rotation),this.polygonOffset===!0&&(i.polygonOffset=!0),this.polygonOffsetFactor!==0&&(i.polygonOffsetFactor=this.polygonOffsetFactor),this.polygonOffsetUnits!==0&&(i.polygonOffsetUnits=this.polygonOffsetUnits),this.linewidth!==void 0&&this.linewidth!==1&&(i.linewidth=this.linewidth),this.dashSize!==void 0&&(i.dashSize=this.dashSize),this.gapSize!==void 0&&(i.gapSize=this.gapSize),this.scale!==void 0&&(i.scale=this.scale),this.dithering===!0&&(i.dithering=!0),this.alphaTest>0&&(i.alphaTest=this.alphaTest),this.alphaHash===!0&&(i.alphaHash=!0),this.alphaToCoverage===!0&&(i.alphaToCoverage=!0),this.premultipliedAlpha===!0&&(i.premultipliedAlpha=!0),this.forceSinglePass===!0&&(i.forceSinglePass=!0),this.wireframe===!0&&(i.wireframe=!0),this.wireframeLinewidth>1&&(i.wireframeLinewidth=this.wireframeLinewidth),this.wireframeLinecap!=="round"&&(i.wireframeLinecap=this.wireframeLinecap),this.wireframeLinejoin!=="round"&&(i.wireframeLinejoin=this.wireframeLinejoin),this.flatShading===!0&&(i.flatShading=!0),this.visible===!1&&(i.visible=!1),this.toneMapped===!1&&(i.toneMapped=!1),this.fog===!1&&(i.fog=!1),Object.keys(this.userData).length>0&&(i.userData=this.userData);function r(s){const a=[];for(const o in s){const c=s[o];delete c.metadata,a.push(c)}return a}if(t){const s=r(e.textures),a=r(e.images);s.length>0&&(i.textures=s),a.length>0&&(i.images=a)}return i}clone(){return new this.constructor().copy(this)}copy(e){this.name=e.name,this.blending=e.blending,this.side=e.side,this.vertexColors=e.vertexColors,this.opacity=e.opacity,this.transparent=e.transparent,this.blendSrc=e.blendSrc,this.blendDst=e.blendDst,this.blendEquation=e.blendEquation,this.blendSrcAlpha=e.blendSrcAlpha,this.blendDstAlpha=e.blendDstAlpha,this.blendEquationAlpha=e.blendEquationAlpha,this.blendColor.copy(e.blendColor),this.blendAlpha=e.blendAlpha,this.depthFunc=e.depthFunc,this.depthTest=e.depthTest,this.depthWrite=e.depthWrite,this.stencilWriteMask=e.stencilWriteMask,this.stencilFunc=e.stencilFunc,this.stencilRef=e.stencilRef,this.stencilFuncMask=e.stencilFuncMask,this.stencilFail=e.stencilFail,this.stencilZFail=e.stencilZFail,this.stencilZPass=e.stencilZPass,this.stencilWrite=e.stencilWrite;const t=e.clippingPlanes;let i=null;if(t!==null){const r=t.length;i=new Array(r);for(let s=0;s!==r;++s)i[s]=t[s].clone()}return this.clippingPlanes=i,this.clipIntersection=e.clipIntersection,this.clipShadows=e.clipShadows,this.shadowSide=e.shadowSide,this.colorWrite=e.colorWrite,this.precision=e.precision,this.polygonOffset=e.polygonOffset,this.polygonOffsetFactor=e.polygonOffsetFactor,this.polygonOffsetUnits=e.polygonOffsetUnits,this.dithering=e.dithering,this.alphaTest=e.alphaTest,this.alphaHash=e.alphaHash,this.alphaToCoverage=e.alphaToCoverage,this.premultipliedAlpha=e.premultipliedAlpha,this.forceSinglePass=e.forceSinglePass,this.visible=e.visible,this.toneMapped=e.toneMapped,this.userData=JSON.parse(JSON.stringify(e.userData)),this}dispose(){this.dispatchEvent({type:"dispose"})}set needsUpdate(e){e===!0&&this.version++}onBuild(){console.warn("Material: onBuild() has been removed.")}}class dl extends Ei{constructor(e){super(),this.isMeshBasicMaterial=!0,this.type="MeshBasicMaterial",this.color=new ze(16777215),this.map=null,this.lightMap=null,this.lightMapIntensity=1,this.aoMap=null,this.aoMapIntensity=1,this.specularMap=null,this.alphaMap=null,this.envMap=null,this.envMapRotation=new Yt,this.combine=ra,this.reflectivity=1,this.refractionRatio=.98,this.wireframe=!1,this.wireframeLinewidth=1,this.wireframeLinecap="round",this.wireframeLinejoin="round",this.fog=!0,this.setValues(e)}copy(e){return super.copy(e),this.color.copy(e.color),this.map=e.map,this.lightMap=e.lightMap,this.lightMapIntensity=e.lightMapIntensity,this.aoMap=e.aoMap,this.aoMapIntensity=e.aoMapIntensity,this.specularMap=e.specularMap,this.alphaMap=e.alphaMap,this.envMap=e.envMap,this.envMapRotation.copy(e.envMapRotation),this.combine=e.combine,this.reflectivity=e.reflectivity,this.refractionRatio=e.refractionRatio,this.wireframe=e.wireframe,this.wireframeLinewidth=e.wireframeLinewidth,this.wireframeLinecap=e.wireframeLinecap,this.wireframeLinejoin=e.wireframeLinejoin,this.fog=e.fog,this}}const lt=new B,er=new qe;let Oh=0;class Jt{constructor(e,t,i=!1){if(Array.isArray(e))throw new TypeError("THREE.BufferAttribute: array should be a Typed Array.");this.isBufferAttribute=!0,Object.defineProperty(this,"id",{value:Oh++}),this.name="",this.array=e,this.itemSize=t,this.count=e!==void 0?e.length/t:0,this.normalized=i,this.usage=Ba,this.updateRanges=[],this.gpuType=on,this.version=0}onUploadCallback(){}set needsUpdate(e){e===!0&&this.version++}setUsage(e){return this.usage=e,this}addUpdateRange(e,t){this.updateRanges.push({start:e,count:t})}clearUpdateRanges(){this.updateRanges.length=0}copy(e){return this.name=e.name,this.array=new e.array.constructor(e.array),this.itemSize=e.itemSize,this.count=e.count,this.normalized=e.normalized,this.usage=e.usage,this.gpuType=e.gpuType,this}copyAt(e,t,i){e*=this.itemSize,i*=t.itemSize;for(let r=0,s=this.itemSize;r<s;r++)this.array[e+r]=t.array[i+r];return this}copyArray(e){return this.array.set(e),this}applyMatrix3(e){if(this.itemSize===2)for(let t=0,i=this.count;t<i;t++)er.fromBufferAttribute(this,t),er.applyMatrix3(e),this.setXY(t,er.x,er.y);else if(this.itemSize===3)for(let t=0,i=this.count;t<i;t++)lt.fromBufferAttribute(this,t),lt.applyMatrix3(e),this.setXYZ(t,lt.x,lt.y,lt.z);return this}applyMatrix4(e){for(let t=0,i=this.count;t<i;t++)lt.fromBufferAttribute(this,t),lt.applyMatrix4(e),this.setXYZ(t,lt.x,lt.y,lt.z);return this}applyNormalMatrix(e){for(let t=0,i=this.count;t<i;t++)lt.fromBufferAttribute(this,t),lt.applyNormalMatrix(e),this.setXYZ(t,lt.x,lt.y,lt.z);return this}transformDirection(e){for(let t=0,i=this.count;t<i;t++)lt.fromBufferAttribute(this,t),lt.transformDirection(e),this.setXYZ(t,lt.x,lt.y,lt.z);return this}set(e,t=0){return this.array.set(e,t),this}getComponent(e,t){let i=this.array[e*this.itemSize+t];return this.normalized&&(i=ai(i,this.array)),i}setComponent(e,t,i){return this.normalized&&(i=xt(i,this.array)),this.array[e*this.itemSize+t]=i,this}getX(e){let t=this.array[e*this.itemSize];return this.normalized&&(t=ai(t,this.array)),t}setX(e,t){return this.normalized&&(t=xt(t,this.array)),this.array[e*this.itemSize]=t,this}getY(e){let t=this.array[e*this.itemSize+1];return this.normalized&&(t=ai(t,this.array)),t}setY(e,t){return this.normalized&&(t=xt(t,this.array)),this.array[e*this.itemSize+1]=t,this}getZ(e){let t=this.array[e*this.itemSize+2];return this.normalized&&(t=ai(t,this.array)),t}setZ(e,t){return this.normalized&&(t=xt(t,this.array)),this.array[e*this.itemSize+2]=t,this}getW(e){let t=this.array[e*this.itemSize+3];return this.normalized&&(t=ai(t,this.array)),t}setW(e,t){return this.normalized&&(t=xt(t,this.array)),this.array[e*this.itemSize+3]=t,this}setXY(e,t,i){return e*=this.itemSize,this.normalized&&(t=xt(t,this.array),i=xt(i,this.array)),this.array[e+0]=t,this.array[e+1]=i,this}setXYZ(e,t,i,r){return e*=this.itemSize,this.normalized&&(t=xt(t,this.array),i=xt(i,this.array),r=xt(r,this.array)),this.array[e+0]=t,this.array[e+1]=i,this.array[e+2]=r,this}setXYZW(e,t,i,r,s){return e*=this.itemSize,this.normalized&&(t=xt(t,this.array),i=xt(i,this.array),r=xt(r,this.array),s=xt(s,this.array)),this.array[e+0]=t,this.array[e+1]=i,this.array[e+2]=r,this.array[e+3]=s,this}onUpload(e){return this.onUploadCallback=e,this}clone(){return new this.constructor(this.array,this.itemSize).copy(this)}toJSON(){const e={itemSize:this.itemSize,type:this.array.constructor.name,array:Array.from(this.array),normalized:this.normalized};return this.name!==""&&(e.name=this.name),this.usage!==Ba&&(e.usage=this.usage),e}}class pl extends Jt{constructor(e,t,i){super(new Uint16Array(e),t,i)}}class ml extends Jt{constructor(e,t,i){super(new Uint32Array(e),t,i)}}class Qt extends Jt{constructor(e,t,i){super(new Float32Array(e),t,i)}}let Bh=0;const Dt=new st,Kr=new gt,ni=new B,wt=new zi,Ri=new zi,ft=new B;class Tn extends Mi{constructor(){super(),this.isBufferGeometry=!0,Object.defineProperty(this,"id",{value:Bh++}),this.uuid=Si(),this.name="",this.type="BufferGeometry",this.index=null,this.indirect=null,this.attributes={},this.morphAttributes={},this.morphTargetsRelative=!1,this.groups=[],this.boundingBox=null,this.boundingSphere=null,this.drawRange={start:0,count:1/0},this.userData={}}getIndex(){return this.index}setIndex(e){return Array.isArray(e)?this.index=new(ll(e)?ml:pl)(e,1):this.index=e,this}setIndirect(e){return this.indirect=e,this}getIndirect(){return this.indirect}getAttribute(e){return this.attributes[e]}setAttribute(e,t){return this.attributes[e]=t,this}deleteAttribute(e){return delete this.attributes[e],this}hasAttribute(e){return this.attributes[e]!==void 0}addGroup(e,t,i=0){this.groups.push({start:e,count:t,materialIndex:i})}clearGroups(){this.groups=[]}setDrawRange(e,t){this.drawRange.start=e,this.drawRange.count=t}applyMatrix4(e){const t=this.attributes.position;t!==void 0&&(t.applyMatrix4(e),t.needsUpdate=!0);const i=this.attributes.normal;if(i!==void 0){const s=new Ce().getNormalMatrix(e);i.applyNormalMatrix(s),i.needsUpdate=!0}const r=this.attributes.tangent;return r!==void 0&&(r.transformDirection(e),r.needsUpdate=!0),this.boundingBox!==null&&this.computeBoundingBox(),this.boundingSphere!==null&&this.computeBoundingSphere(),this}applyQuaternion(e){return Dt.makeRotationFromQuaternion(e),this.applyMatrix4(Dt),this}rotateX(e){return Dt.makeRotationX(e),this.applyMatrix4(Dt),this}rotateY(e){return Dt.makeRotationY(e),this.applyMatrix4(Dt),this}rotateZ(e){return Dt.makeRotationZ(e),this.applyMatrix4(Dt),this}translate(e,t,i){return Dt.makeTranslation(e,t,i),this.applyMatrix4(Dt),this}scale(e,t,i){return Dt.makeScale(e,t,i),this.applyMatrix4(Dt),this}lookAt(e){return Kr.lookAt(e),Kr.updateMatrix(),this.applyMatrix4(Kr.matrix),this}center(){return this.computeBoundingBox(),this.boundingBox.getCenter(ni).negate(),this.translate(ni.x,ni.y,ni.z),this}setFromPoints(e){const t=this.getAttribute("position");if(t===void 0){const i=[];for(let r=0,s=e.length;r<s;r++){const a=e[r];i.push(a.x,a.y,a.z||0)}this.setAttribute("position",new Qt(i,3))}else{const i=Math.min(e.length,t.count);for(let r=0;r<i;r++){const s=e[r];t.setXYZ(r,s.x,s.y,s.z||0)}e.length>t.count&&console.warn("THREE.BufferGeometry: Buffer size too small for points data. Use .dispose() and create a new geometry."),t.needsUpdate=!0}return this}computeBoundingBox(){this.boundingBox===null&&(this.boundingBox=new zi);const e=this.attributes.position,t=this.morphAttributes.position;if(e&&e.isGLBufferAttribute){console.error("THREE.BufferGeometry.computeBoundingBox(): GLBufferAttribute requires a manual bounding box.",this),this.boundingBox.set(new B(-1/0,-1/0,-1/0),new B(1/0,1/0,1/0));return}if(e!==void 0){if(this.boundingBox.setFromBufferAttribute(e),t)for(let i=0,r=t.length;i<r;i++){const s=t[i];wt.setFromBufferAttribute(s),this.morphTargetsRelative?(ft.addVectors(this.boundingBox.min,wt.min),this.boundingBox.expandByPoint(ft),ft.addVectors(this.boundingBox.max,wt.max),this.boundingBox.expandByPoint(ft)):(this.boundingBox.expandByPoint(wt.min),this.boundingBox.expandByPoint(wt.max))}}else this.boundingBox.makeEmpty();(isNaN(this.boundingBox.min.x)||isNaN(this.boundingBox.min.y)||isNaN(this.boundingBox.min.z))&&console.error('THREE.BufferGeometry.computeBoundingBox(): Computed min/max have NaN values. The "position" attribute is likely to have NaN values.',this)}computeBoundingSphere(){this.boundingSphere===null&&(this.boundingSphere=new da);const e=this.attributes.position,t=this.morphAttributes.position;if(e&&e.isGLBufferAttribute){console.error("THREE.BufferGeometry.computeBoundingSphere(): GLBufferAttribute requires a manual bounding sphere.",this),this.boundingSphere.set(new B,1/0);return}if(e){const i=this.boundingSphere.center;if(wt.setFromBufferAttribute(e),t)for(let s=0,a=t.length;s<a;s++){const o=t[s];Ri.setFromBufferAttribute(o),this.morphTargetsRelative?(ft.addVectors(wt.min,Ri.min),wt.expandByPoint(ft),ft.addVectors(wt.max,Ri.max),wt.expandByPoint(ft)):(wt.expandByPoint(Ri.min),wt.expandByPoint(Ri.max))}wt.getCenter(i);let r=0;for(let s=0,a=e.count;s<a;s++)ft.fromBufferAttribute(e,s),r=Math.max(r,i.distanceToSquared(ft));if(t)for(let s=0,a=t.length;s<a;s++){const o=t[s],c=this.morphTargetsRelative;for(let l=0,h=o.count;l<h;l++)ft.fromBufferAttribute(o,l),c&&(ni.fromBufferAttribute(e,l),ft.add(ni)),r=Math.max(r,i.distanceToSquared(ft))}this.boundingSphere.radius=Math.sqrt(r),isNaN(this.boundingSphere.radius)&&console.error('THREE.BufferGeometry.computeBoundingSphere(): Computed radius is NaN. The "position" attribute is likely to have NaN values.',this)}}computeTangents(){const e=this.index,t=this.attributes;if(e===null||t.position===void 0||t.normal===void 0||t.uv===void 0){console.error("THREE.BufferGeometry: .computeTangents() failed. Missing required attributes (index, position, normal or uv)");return}const i=t.position,r=t.normal,s=t.uv;this.hasAttribute("tangent")===!1&&this.setAttribute("tangent",new Jt(new Float32Array(4*i.count),4));const a=this.getAttribute("tangent"),o=[],c=[];for(let I=0;I<i.count;I++)o[I]=new B,c[I]=new B;const l=new B,h=new B,u=new B,d=new qe,m=new qe,g=new qe,M=new B,p=new B;function f(I,S,x){l.fromBufferAttribute(i,I),h.fromBufferAttribute(i,S),u.fromBufferAttribute(i,x),d.fromBufferAttribute(s,I),m.fromBufferAttribute(s,S),g.fromBufferAttribute(s,x),h.sub(l),u.sub(l),m.sub(d),g.sub(d);const b=1/(m.x*g.y-g.x*m.y);isFinite(b)&&(M.copy(h).multiplyScalar(g.y).addScaledVector(u,-m.y).multiplyScalar(b),p.copy(u).multiplyScalar(m.x).addScaledVector(h,-g.x).multiplyScalar(b),o[I].add(M),o[S].add(M),o[x].add(M),c[I].add(p),c[S].add(p),c[x].add(p))}let w=this.groups;w.length===0&&(w=[{start:0,count:e.count}]);for(let I=0,S=w.length;I<S;++I){const x=w[I],b=x.start,W=x.count;for(let N=b,k=b+W;N<k;N+=3)f(e.getX(N+0),e.getX(N+1),e.getX(N+2))}const T=new B,E=new B,C=new B,A=new B;function P(I){C.fromBufferAttribute(r,I),A.copy(C);const S=o[I];T.copy(S),T.sub(C.multiplyScalar(C.dot(S))).normalize(),E.crossVectors(A,S);const b=E.dot(c[I])<0?-1:1;a.setXYZW(I,T.x,T.y,T.z,b)}for(let I=0,S=w.length;I<S;++I){const x=w[I],b=x.start,W=x.count;for(let N=b,k=b+W;N<k;N+=3)P(e.getX(N+0)),P(e.getX(N+1)),P(e.getX(N+2))}}computeVertexNormals(){const e=this.index,t=this.getAttribute("position");if(t!==void 0){let i=this.getAttribute("normal");if(i===void 0)i=new Jt(new Float32Array(t.count*3),3),this.setAttribute("normal",i);else for(let d=0,m=i.count;d<m;d++)i.setXYZ(d,0,0,0);const r=new B,s=new B,a=new B,o=new B,c=new B,l=new B,h=new B,u=new B;if(e)for(let d=0,m=e.count;d<m;d+=3){const g=e.getX(d+0),M=e.getX(d+1),p=e.getX(d+2);r.fromBufferAttribute(t,g),s.fromBufferAttribute(t,M),a.fromBufferAttribute(t,p),h.subVectors(a,s),u.subVectors(r,s),h.cross(u),o.fromBufferAttribute(i,g),c.fromBufferAttribute(i,M),l.fromBufferAttribute(i,p),o.add(h),c.add(h),l.add(h),i.setXYZ(g,o.x,o.y,o.z),i.setXYZ(M,c.x,c.y,c.z),i.setXYZ(p,l.x,l.y,l.z)}else for(let d=0,m=t.count;d<m;d+=3)r.fromBufferAttribute(t,d+0),s.fromBufferAttribute(t,d+1),a.fromBufferAttribute(t,d+2),h.subVectors(a,s),u.subVectors(r,s),h.cross(u),i.setXYZ(d+0,h.x,h.y,h.z),i.setXYZ(d+1,h.x,h.y,h.z),i.setXYZ(d+2,h.x,h.y,h.z);this.normalizeNormals(),i.needsUpdate=!0}}normalizeNormals(){const e=this.attributes.normal;for(let t=0,i=e.count;t<i;t++)ft.fromBufferAttribute(e,t),ft.normalize(),e.setXYZ(t,ft.x,ft.y,ft.z)}toNonIndexed(){function e(o,c){const l=o.array,h=o.itemSize,u=o.normalized,d=new l.constructor(c.length*h);let m=0,g=0;for(let M=0,p=c.length;M<p;M++){o.isInterleavedBufferAttribute?m=c[M]*o.data.stride+o.offset:m=c[M]*h;for(let f=0;f<h;f++)d[g++]=l[m++]}return new Jt(d,h,u)}if(this.index===null)return console.warn("THREE.BufferGeometry.toNonIndexed(): BufferGeometry is already non-indexed."),this;const t=new Tn,i=this.index.array,r=this.attributes;for(const o in r){const c=r[o],l=e(c,i);t.setAttribute(o,l)}const s=this.morphAttributes;for(const o in s){const c=[],l=s[o];for(let h=0,u=l.length;h<u;h++){const d=l[h],m=e(d,i);c.push(m)}t.morphAttributes[o]=c}t.morphTargetsRelative=this.morphTargetsRelative;const a=this.groups;for(let o=0,c=a.length;o<c;o++){const l=a[o];t.addGroup(l.start,l.count,l.materialIndex)}return t}toJSON(){const e={metadata:{version:4.6,type:"BufferGeometry",generator:"BufferGeometry.toJSON"}};if(e.uuid=this.uuid,e.type=this.type,this.name!==""&&(e.name=this.name),Object.keys(this.userData).length>0&&(e.userData=this.userData),this.parameters!==void 0){const c=this.parameters;for(const l in c)c[l]!==void 0&&(e[l]=c[l]);return e}e.data={attributes:{}};const t=this.index;t!==null&&(e.data.index={type:t.array.constructor.name,array:Array.prototype.slice.call(t.array)});const i=this.attributes;for(const c in i){const l=i[c];e.data.attributes[c]=l.toJSON(e.data)}const r={};let s=!1;for(const c in this.morphAttributes){const l=this.morphAttributes[c],h=[];for(let u=0,d=l.length;u<d;u++){const m=l[u];h.push(m.toJSON(e.data))}h.length>0&&(r[c]=h,s=!0)}s&&(e.data.morphAttributes=r,e.data.morphTargetsRelative=this.morphTargetsRelative);const a=this.groups;a.length>0&&(e.data.groups=JSON.parse(JSON.stringify(a)));const o=this.boundingSphere;return o!==null&&(e.data.boundingSphere={center:o.center.toArray(),radius:o.radius}),e}clone(){return new this.constructor().copy(this)}copy(e){this.index=null,this.attributes={},this.morphAttributes={},this.groups=[],this.boundingBox=null,this.boundingSphere=null;const t={};this.name=e.name;const i=e.index;i!==null&&this.setIndex(i.clone(t));const r=e.attributes;for(const l in r){const h=r[l];this.setAttribute(l,h.clone(t))}const s=e.morphAttributes;for(const l in s){const h=[],u=s[l];for(let d=0,m=u.length;d<m;d++)h.push(u[d].clone(t));this.morphAttributes[l]=h}this.morphTargetsRelative=e.morphTargetsRelative;const a=e.groups;for(let l=0,h=a.length;l<h;l++){const u=a[l];this.addGroup(u.start,u.count,u.materialIndex)}const o=e.boundingBox;o!==null&&(this.boundingBox=o.clone());const c=e.boundingSphere;return c!==null&&(this.boundingSphere=c.clone()),this.drawRange.start=e.drawRange.start,this.drawRange.count=e.drawRange.count,this.userData=e.userData,this}dispose(){this.dispatchEvent({type:"dispose"})}}const Qa=new st,Cn=new Ch,tr=new da,eo=new B,nr=new B,ir=new B,rr=new B,jr=new B,sr=new B,to=new B,ar=new B;class Xt extends gt{constructor(e=new Tn,t=new dl){super(),this.isMesh=!0,this.type="Mesh",this.geometry=e,this.material=t,this.updateMorphTargets()}copy(e,t){return super.copy(e,t),e.morphTargetInfluences!==void 0&&(this.morphTargetInfluences=e.morphTargetInfluences.slice()),e.morphTargetDictionary!==void 0&&(this.morphTargetDictionary=Object.assign({},e.morphTargetDictionary)),this.material=Array.isArray(e.material)?e.material.slice():e.material,this.geometry=e.geometry,this}updateMorphTargets(){const t=this.geometry.morphAttributes,i=Object.keys(t);if(i.length>0){const r=t[i[0]];if(r!==void 0){this.morphTargetInfluences=[],this.morphTargetDictionary={};for(let s=0,a=r.length;s<a;s++){const o=r[s].name||String(s);this.morphTargetInfluences.push(0),this.morphTargetDictionary[o]=s}}}}getVertexPosition(e,t){const i=this.geometry,r=i.attributes.position,s=i.morphAttributes.position,a=i.morphTargetsRelative;t.fromBufferAttribute(r,e);const o=this.morphTargetInfluences;if(s&&o){sr.set(0,0,0);for(let c=0,l=s.length;c<l;c++){const h=o[c],u=s[c];h!==0&&(jr.fromBufferAttribute(u,e),a?sr.addScaledVector(jr,h):sr.addScaledVector(jr.sub(t),h))}t.add(sr)}return t}raycast(e,t){const i=this.geometry,r=this.material,s=this.matrixWorld;r!==void 0&&(i.boundingSphere===null&&i.computeBoundingSphere(),tr.copy(i.boundingSphere),tr.applyMatrix4(s),Cn.copy(e.ray).recast(e.near),!(tr.containsPoint(Cn.origin)===!1&&(Cn.intersectSphere(tr,eo)===null||Cn.origin.distanceToSquared(eo)>(e.far-e.near)**2))&&(Qa.copy(s).invert(),Cn.copy(e.ray).applyMatrix4(Qa),!(i.boundingBox!==null&&Cn.intersectsBox(i.boundingBox)===!1)&&this._computeIntersections(e,t,Cn)))}_computeIntersections(e,t,i){let r;const s=this.geometry,a=this.material,o=s.index,c=s.attributes.position,l=s.attributes.uv,h=s.attributes.uv1,u=s.attributes.normal,d=s.groups,m=s.drawRange;if(o!==null)if(Array.isArray(a))for(let g=0,M=d.length;g<M;g++){const p=d[g],f=a[p.materialIndex],w=Math.max(p.start,m.start),T=Math.min(o.count,Math.min(p.start+p.count,m.start+m.count));for(let E=w,C=T;E<C;E+=3){const A=o.getX(E),P=o.getX(E+1),I=o.getX(E+2);r=or(this,f,e,i,l,h,u,A,P,I),r&&(r.faceIndex=Math.floor(E/3),r.face.materialIndex=p.materialIndex,t.push(r))}}else{const g=Math.max(0,m.start),M=Math.min(o.count,m.start+m.count);for(let p=g,f=M;p<f;p+=3){const w=o.getX(p),T=o.getX(p+1),E=o.getX(p+2);r=or(this,a,e,i,l,h,u,w,T,E),r&&(r.faceIndex=Math.floor(p/3),t.push(r))}}else if(c!==void 0)if(Array.isArray(a))for(let g=0,M=d.length;g<M;g++){const p=d[g],f=a[p.materialIndex],w=Math.max(p.start,m.start),T=Math.min(c.count,Math.min(p.start+p.count,m.start+m.count));for(let E=w,C=T;E<C;E+=3){const A=E,P=E+1,I=E+2;r=or(this,f,e,i,l,h,u,A,P,I),r&&(r.faceIndex=Math.floor(E/3),r.face.materialIndex=p.materialIndex,t.push(r))}}else{const g=Math.max(0,m.start),M=Math.min(c.count,m.start+m.count);for(let p=g,f=M;p<f;p+=3){const w=p,T=p+1,E=p+2;r=or(this,a,e,i,l,h,u,w,T,E),r&&(r.faceIndex=Math.floor(p/3),t.push(r))}}}}function zh(n,e,t,i,r,s,a,o){let c;if(e.side===yt?c=i.intersectTriangle(a,s,r,!0,o):c=i.intersectTriangle(r,s,a,e.side===En,o),c===null)return null;ar.copy(o),ar.applyMatrix4(n.matrixWorld);const l=t.ray.origin.distanceTo(ar);return l<t.near||l>t.far?null:{distance:l,point:ar.clone(),object:n}}function or(n,e,t,i,r,s,a,o,c,l){n.getVertexPosition(o,nr),n.getVertexPosition(c,ir),n.getVertexPosition(l,rr);const h=zh(n,e,t,i,nr,ir,rr,to);if(h){const u=new B;kt.getBarycoord(to,nr,ir,rr,u),r&&(h.uv=kt.getInterpolatedAttribute(r,o,c,l,u,new qe)),s&&(h.uv1=kt.getInterpolatedAttribute(s,o,c,l,u,new qe)),a&&(h.normal=kt.getInterpolatedAttribute(a,o,c,l,u,new B),h.normal.dot(i.direction)>0&&h.normal.multiplyScalar(-1));const d={a:o,b:c,c:l,normal:new B,materialIndex:0};kt.getNormal(nr,ir,rr,d.normal),h.face=d,h.barycoord=u}return h}class Hi extends Tn{constructor(e=1,t=1,i=1,r=1,s=1,a=1){super(),this.type="BoxGeometry",this.parameters={width:e,height:t,depth:i,widthSegments:r,heightSegments:s,depthSegments:a};const o=this;r=Math.floor(r),s=Math.floor(s),a=Math.floor(a);const c=[],l=[],h=[],u=[];let d=0,m=0;g("z","y","x",-1,-1,i,t,e,a,s,0),g("z","y","x",1,-1,i,t,-e,a,s,1),g("x","z","y",1,1,e,i,t,r,a,2),g("x","z","y",1,-1,e,i,-t,r,a,3),g("x","y","z",1,-1,e,t,i,r,s,4),g("x","y","z",-1,-1,e,t,-i,r,s,5),this.setIndex(c),this.setAttribute("position",new Qt(l,3)),this.setAttribute("normal",new Qt(h,3)),this.setAttribute("uv",new Qt(u,2));function g(M,p,f,w,T,E,C,A,P,I,S){const x=E/P,b=C/I,W=E/2,N=C/2,k=A/2,Z=P+1,G=I+1;let J=0,H=0;const Q=new B;for(let ce=0;ce<G;ce++){const ve=ce*b-N;for(let Le=0;Le<Z;Le++){const je=Le*x-W;Q[M]=je*w,Q[p]=ve*T,Q[f]=k,l.push(Q.x,Q.y,Q.z),Q[M]=0,Q[p]=0,Q[f]=A>0?1:-1,h.push(Q.x,Q.y,Q.z),u.push(Le/P),u.push(1-ce/I),J+=1}}for(let ce=0;ce<I;ce++)for(let ve=0;ve<P;ve++){const Le=d+ve+Z*ce,je=d+ve+Z*(ce+1),q=d+(ve+1)+Z*(ce+1),te=d+(ve+1)+Z*ce;c.push(Le,je,te),c.push(je,q,te),H+=6}o.addGroup(m,H,S),m+=H,d+=J}}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new Hi(e.width,e.height,e.depth,e.widthSegments,e.heightSegments,e.depthSegments)}}function xi(n){const e={};for(const t in n){e[t]={};for(const i in n[t]){const r=n[t][i];r&&(r.isColor||r.isMatrix3||r.isMatrix4||r.isVector2||r.isVector3||r.isVector4||r.isTexture||r.isQuaternion)?r.isRenderTargetTexture?(console.warn("UniformsUtils: Textures of render targets cannot be cloned via cloneUniforms() or mergeUniforms()."),e[t][i]=null):e[t][i]=r.clone():Array.isArray(r)?e[t][i]=r.slice():e[t][i]=r}}return e}function Mt(n){const e={};for(let t=0;t<n.length;t++){const i=xi(n[t]);for(const r in i)e[r]=i[r]}return e}function Hh(n){const e=[];for(let t=0;t<n.length;t++)e.push(n[t].clone());return e}function _l(n){const e=n.getRenderTarget();return e===null?n.outputColorSpace:e.isXRRenderTarget===!0?e.texture.colorSpace:ke.workingColorSpace}const Vh={clone:xi,merge:Mt};var Gh=`void main() {
	gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );
}`,kh=`void main() {
	gl_FragColor = vec4( 1.0, 0.0, 0.0, 1.0 );
}`;class yn extends Ei{constructor(e){super(),this.isShaderMaterial=!0,this.type="ShaderMaterial",this.defines={},this.uniforms={},this.uniformsGroups=[],this.vertexShader=Gh,this.fragmentShader=kh,this.linewidth=1,this.wireframe=!1,this.wireframeLinewidth=1,this.fog=!1,this.lights=!1,this.clipping=!1,this.forceSinglePass=!0,this.extensions={clipCullDistance:!1,multiDraw:!1},this.defaultAttributeValues={color:[1,1,1],uv:[0,0],uv1:[0,0]},this.index0AttributeName=void 0,this.uniformsNeedUpdate=!1,this.glslVersion=null,e!==void 0&&this.setValues(e)}copy(e){return super.copy(e),this.fragmentShader=e.fragmentShader,this.vertexShader=e.vertexShader,this.uniforms=xi(e.uniforms),this.uniformsGroups=Hh(e.uniformsGroups),this.defines=Object.assign({},e.defines),this.wireframe=e.wireframe,this.wireframeLinewidth=e.wireframeLinewidth,this.fog=e.fog,this.lights=e.lights,this.clipping=e.clipping,this.extensions=Object.assign({},e.extensions),this.glslVersion=e.glslVersion,this}toJSON(e){const t=super.toJSON(e);t.glslVersion=this.glslVersion,t.uniforms={};for(const r in this.uniforms){const a=this.uniforms[r].value;a&&a.isTexture?t.uniforms[r]={type:"t",value:a.toJSON(e).uuid}:a&&a.isColor?t.uniforms[r]={type:"c",value:a.getHex()}:a&&a.isVector2?t.uniforms[r]={type:"v2",value:a.toArray()}:a&&a.isVector3?t.uniforms[r]={type:"v3",value:a.toArray()}:a&&a.isVector4?t.uniforms[r]={type:"v4",value:a.toArray()}:a&&a.isMatrix3?t.uniforms[r]={type:"m3",value:a.toArray()}:a&&a.isMatrix4?t.uniforms[r]={type:"m4",value:a.toArray()}:t.uniforms[r]={value:a}}Object.keys(this.defines).length>0&&(t.defines=this.defines),t.vertexShader=this.vertexShader,t.fragmentShader=this.fragmentShader,t.lights=this.lights,t.clipping=this.clipping;const i={};for(const r in this.extensions)this.extensions[r]===!0&&(i[r]=!0);return Object.keys(i).length>0&&(t.extensions=i),t}}class gl extends gt{constructor(){super(),this.isCamera=!0,this.type="Camera",this.matrixWorldInverse=new st,this.projectionMatrix=new st,this.projectionMatrixInverse=new st,this.coordinateSystem=ln}copy(e,t){return super.copy(e,t),this.matrixWorldInverse.copy(e.matrixWorldInverse),this.projectionMatrix.copy(e.projectionMatrix),this.projectionMatrixInverse.copy(e.projectionMatrixInverse),this.coordinateSystem=e.coordinateSystem,this}getWorldDirection(e){return super.getWorldDirection(e).negate()}updateMatrixWorld(e){super.updateMatrixWorld(e),this.matrixWorldInverse.copy(this.matrixWorld).invert()}updateWorldMatrix(e,t){super.updateWorldMatrix(e,t),this.matrixWorldInverse.copy(this.matrixWorld).invert()}clone(){return new this.constructor().copy(this)}}const _n=new B,no=new qe,io=new qe;class Ut extends gl{constructor(e=50,t=1,i=.1,r=2e3){super(),this.isPerspectiveCamera=!0,this.type="PerspectiveCamera",this.fov=e,this.zoom=1,this.near=i,this.far=r,this.focus=10,this.aspect=t,this.view=null,this.filmGauge=35,this.filmOffset=0,this.updateProjectionMatrix()}copy(e,t){return super.copy(e,t),this.fov=e.fov,this.zoom=e.zoom,this.near=e.near,this.far=e.far,this.focus=e.focus,this.aspect=e.aspect,this.view=e.view===null?null:Object.assign({},e.view),this.filmGauge=e.filmGauge,this.filmOffset=e.filmOffset,this}setFocalLength(e){const t=.5*this.getFilmHeight()/e;this.fov=Ni*2*Math.atan(t),this.updateProjectionMatrix()}getFocalLength(){const e=Math.tan(Pi*.5*this.fov);return .5*this.getFilmHeight()/e}getEffectiveFOV(){return Ni*2*Math.atan(Math.tan(Pi*.5*this.fov)/this.zoom)}getFilmWidth(){return this.filmGauge*Math.min(this.aspect,1)}getFilmHeight(){return this.filmGauge/Math.max(this.aspect,1)}getViewBounds(e,t,i){_n.set(-1,-1,.5).applyMatrix4(this.projectionMatrixInverse),t.set(_n.x,_n.y).multiplyScalar(-e/_n.z),_n.set(1,1,.5).applyMatrix4(this.projectionMatrixInverse),i.set(_n.x,_n.y).multiplyScalar(-e/_n.z)}getViewSize(e,t){return this.getViewBounds(e,no,io),t.subVectors(io,no)}setViewOffset(e,t,i,r,s,a){this.aspect=e/t,this.view===null&&(this.view={enabled:!0,fullWidth:1,fullHeight:1,offsetX:0,offsetY:0,width:1,height:1}),this.view.enabled=!0,this.view.fullWidth=e,this.view.fullHeight=t,this.view.offsetX=i,this.view.offsetY=r,this.view.width=s,this.view.height=a,this.updateProjectionMatrix()}clearViewOffset(){this.view!==null&&(this.view.enabled=!1),this.updateProjectionMatrix()}updateProjectionMatrix(){const e=this.near;let t=e*Math.tan(Pi*.5*this.fov)/this.zoom,i=2*t,r=this.aspect*i,s=-.5*r;const a=this.view;if(this.view!==null&&this.view.enabled){const c=a.fullWidth,l=a.fullHeight;s+=a.offsetX*r/c,t-=a.offsetY*i/l,r*=a.width/c,i*=a.height/l}const o=this.filmOffset;o!==0&&(s+=e*o/this.getFilmWidth()),this.projectionMatrix.makePerspective(s,s+r,t,t-i,e,this.far,this.coordinateSystem),this.projectionMatrixInverse.copy(this.projectionMatrix).invert()}toJSON(e){const t=super.toJSON(e);return t.object.fov=this.fov,t.object.zoom=this.zoom,t.object.near=this.near,t.object.far=this.far,t.object.focus=this.focus,t.object.aspect=this.aspect,this.view!==null&&(t.object.view=Object.assign({},this.view)),t.object.filmGauge=this.filmGauge,t.object.filmOffset=this.filmOffset,t}}const ii=-90,ri=1;class Wh extends gt{constructor(e,t,i){super(),this.type="CubeCamera",this.renderTarget=i,this.coordinateSystem=null,this.activeMipmapLevel=0;const r=new Ut(ii,ri,e,t);r.layers=this.layers,this.add(r);const s=new Ut(ii,ri,e,t);s.layers=this.layers,this.add(s);const a=new Ut(ii,ri,e,t);a.layers=this.layers,this.add(a);const o=new Ut(ii,ri,e,t);o.layers=this.layers,this.add(o);const c=new Ut(ii,ri,e,t);c.layers=this.layers,this.add(c);const l=new Ut(ii,ri,e,t);l.layers=this.layers,this.add(l)}updateCoordinateSystem(){const e=this.coordinateSystem,t=this.children.concat(),[i,r,s,a,o,c]=t;for(const l of t)this.remove(l);if(e===ln)i.up.set(0,1,0),i.lookAt(1,0,0),r.up.set(0,1,0),r.lookAt(-1,0,0),s.up.set(0,0,-1),s.lookAt(0,1,0),a.up.set(0,0,1),a.lookAt(0,-1,0),o.up.set(0,1,0),o.lookAt(0,0,1),c.up.set(0,1,0),c.lookAt(0,0,-1);else if(e===br)i.up.set(0,-1,0),i.lookAt(-1,0,0),r.up.set(0,-1,0),r.lookAt(1,0,0),s.up.set(0,0,1),s.lookAt(0,1,0),a.up.set(0,0,-1),a.lookAt(0,-1,0),o.up.set(0,-1,0),o.lookAt(0,0,1),c.up.set(0,-1,0),c.lookAt(0,0,-1);else throw new Error("THREE.CubeCamera.updateCoordinateSystem(): Invalid coordinate system: "+e);for(const l of t)this.add(l),l.updateMatrixWorld()}update(e,t){this.parent===null&&this.updateMatrixWorld();const{renderTarget:i,activeMipmapLevel:r}=this;this.coordinateSystem!==e.coordinateSystem&&(this.coordinateSystem=e.coordinateSystem,this.updateCoordinateSystem());const[s,a,o,c,l,h]=this.children,u=e.getRenderTarget(),d=e.getActiveCubeFace(),m=e.getActiveMipmapLevel(),g=e.xr.enabled;e.xr.enabled=!1;const M=i.texture.generateMipmaps;i.texture.generateMipmaps=!1,e.setRenderTarget(i,0,r),e.render(t,s),e.setRenderTarget(i,1,r),e.render(t,a),e.setRenderTarget(i,2,r),e.render(t,o),e.setRenderTarget(i,3,r),e.render(t,c),e.setRenderTarget(i,4,r),e.render(t,l),i.texture.generateMipmaps=M,e.setRenderTarget(i,5,r),e.render(t,h),e.setRenderTarget(u,d,m),e.xr.enabled=g,i.texture.needsPMREMUpdate=!0}}class vl extends Tt{constructor(e,t,i,r,s,a,o,c,l,h){e=e!==void 0?e:[],t=t!==void 0?t:pi,super(e,t,i,r,s,a,o,c,l,h),this.isCubeTexture=!0,this.flipY=!1}get images(){return this.image}set images(e){this.image=e}}class Xh extends Wn{constructor(e=1,t={}){super(e,e,t),this.isWebGLCubeRenderTarget=!0;const i={width:e,height:e,depth:1},r=[i,i,i,i,i,i];this.texture=new vl(r,t.mapping,t.wrapS,t.wrapT,t.magFilter,t.minFilter,t.format,t.type,t.anisotropy,t.colorSpace),this.texture.isRenderTargetTexture=!0,this.texture.generateMipmaps=t.generateMipmaps!==void 0?t.generateMipmaps:!1,this.texture.minFilter=t.minFilter!==void 0?t.minFilter:jt}fromEquirectangularTexture(e,t){this.texture.type=t.type,this.texture.colorSpace=t.colorSpace,this.texture.generateMipmaps=t.generateMipmaps,this.texture.minFilter=t.minFilter,this.texture.magFilter=t.magFilter;const i={uniforms:{tEquirect:{value:null}},vertexShader:`

				varying vec3 vWorldDirection;

				vec3 transformDirection( in vec3 dir, in mat4 matrix ) {

					return normalize( ( matrix * vec4( dir, 0.0 ) ).xyz );

				}

				void main() {

					vWorldDirection = transformDirection( position, modelMatrix );

					#include <begin_vertex>
					#include <project_vertex>

				}
			`,fragmentShader:`

				uniform sampler2D tEquirect;

				varying vec3 vWorldDirection;

				#include <common>

				void main() {

					vec3 direction = normalize( vWorldDirection );

					vec2 sampleUV = equirectUv( direction );

					gl_FragColor = texture2D( tEquirect, sampleUV );

				}
			`},r=new Hi(5,5,5),s=new yn({name:"CubemapFromEquirect",uniforms:xi(i.uniforms),vertexShader:i.vertexShader,fragmentShader:i.fragmentShader,side:yt,blending:xn});s.uniforms.tEquirect.value=t;const a=new Xt(r,s),o=t.minFilter;return t.minFilter===zn&&(t.minFilter=jt),new Wh(1,10,this).update(e,a),t.minFilter=o,a.geometry.dispose(),a.material.dispose(),this}clear(e,t,i,r){const s=e.getRenderTarget();for(let a=0;a<6;a++)e.setRenderTarget(this,a),e.clear(t,i,r);e.setRenderTarget(s)}}class lr extends gt{constructor(){super(),this.isGroup=!0,this.type="Group"}}const qh={type:"move"};class Jr{constructor(){this._targetRay=null,this._grip=null,this._hand=null}getHandSpace(){return this._hand===null&&(this._hand=new lr,this._hand.matrixAutoUpdate=!1,this._hand.visible=!1,this._hand.joints={},this._hand.inputState={pinching:!1}),this._hand}getTargetRaySpace(){return this._targetRay===null&&(this._targetRay=new lr,this._targetRay.matrixAutoUpdate=!1,this._targetRay.visible=!1,this._targetRay.hasLinearVelocity=!1,this._targetRay.linearVelocity=new B,this._targetRay.hasAngularVelocity=!1,this._targetRay.angularVelocity=new B),this._targetRay}getGripSpace(){return this._grip===null&&(this._grip=new lr,this._grip.matrixAutoUpdate=!1,this._grip.visible=!1,this._grip.hasLinearVelocity=!1,this._grip.linearVelocity=new B,this._grip.hasAngularVelocity=!1,this._grip.angularVelocity=new B),this._grip}dispatchEvent(e){return this._targetRay!==null&&this._targetRay.dispatchEvent(e),this._grip!==null&&this._grip.dispatchEvent(e),this._hand!==null&&this._hand.dispatchEvent(e),this}connect(e){if(e&&e.hand){const t=this._hand;if(t)for(const i of e.hand.values())this._getHandJoint(t,i)}return this.dispatchEvent({type:"connected",data:e}),this}disconnect(e){return this.dispatchEvent({type:"disconnected",data:e}),this._targetRay!==null&&(this._targetRay.visible=!1),this._grip!==null&&(this._grip.visible=!1),this._hand!==null&&(this._hand.visible=!1),this}update(e,t,i){let r=null,s=null,a=null;const o=this._targetRay,c=this._grip,l=this._hand;if(e&&t.session.visibilityState!=="visible-blurred"){if(l&&e.hand){a=!0;for(const M of e.hand.values()){const p=t.getJointPose(M,i),f=this._getHandJoint(l,M);p!==null&&(f.matrix.fromArray(p.transform.matrix),f.matrix.decompose(f.position,f.rotation,f.scale),f.matrixWorldNeedsUpdate=!0,f.jointRadius=p.radius),f.visible=p!==null}const h=l.joints["index-finger-tip"],u=l.joints["thumb-tip"],d=h.position.distanceTo(u.position),m=.02,g=.005;l.inputState.pinching&&d>m+g?(l.inputState.pinching=!1,this.dispatchEvent({type:"pinchend",handedness:e.handedness,target:this})):!l.inputState.pinching&&d<=m-g&&(l.inputState.pinching=!0,this.dispatchEvent({type:"pinchstart",handedness:e.handedness,target:this}))}else c!==null&&e.gripSpace&&(s=t.getPose(e.gripSpace,i),s!==null&&(c.matrix.fromArray(s.transform.matrix),c.matrix.decompose(c.position,c.rotation,c.scale),c.matrixWorldNeedsUpdate=!0,s.linearVelocity?(c.hasLinearVelocity=!0,c.linearVelocity.copy(s.linearVelocity)):c.hasLinearVelocity=!1,s.angularVelocity?(c.hasAngularVelocity=!0,c.angularVelocity.copy(s.angularVelocity)):c.hasAngularVelocity=!1));o!==null&&(r=t.getPose(e.targetRaySpace,i),r===null&&s!==null&&(r=s),r!==null&&(o.matrix.fromArray(r.transform.matrix),o.matrix.decompose(o.position,o.rotation,o.scale),o.matrixWorldNeedsUpdate=!0,r.linearVelocity?(o.hasLinearVelocity=!0,o.linearVelocity.copy(r.linearVelocity)):o.hasLinearVelocity=!1,r.angularVelocity?(o.hasAngularVelocity=!0,o.angularVelocity.copy(r.angularVelocity)):o.hasAngularVelocity=!1,this.dispatchEvent(qh)))}return o!==null&&(o.visible=r!==null),c!==null&&(c.visible=s!==null),l!==null&&(l.visible=a!==null),this}_getHandJoint(e,t){if(e.joints[t.jointName]===void 0){const i=new lr;i.matrixAutoUpdate=!1,i.visible=!1,e.joints[t.jointName]=i,e.add(i)}return e.joints[t.jointName]}}class Yh extends gt{constructor(){super(),this.isScene=!0,this.type="Scene",this.background=null,this.environment=null,this.fog=null,this.backgroundBlurriness=0,this.backgroundIntensity=1,this.backgroundRotation=new Yt,this.environmentIntensity=1,this.environmentRotation=new Yt,this.overrideMaterial=null,typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("observe",{detail:this}))}copy(e,t){return super.copy(e,t),e.background!==null&&(this.background=e.background.clone()),e.environment!==null&&(this.environment=e.environment.clone()),e.fog!==null&&(this.fog=e.fog.clone()),this.backgroundBlurriness=e.backgroundBlurriness,this.backgroundIntensity=e.backgroundIntensity,this.backgroundRotation.copy(e.backgroundRotation),this.environmentIntensity=e.environmentIntensity,this.environmentRotation.copy(e.environmentRotation),e.overrideMaterial!==null&&(this.overrideMaterial=e.overrideMaterial.clone()),this.matrixAutoUpdate=e.matrixAutoUpdate,this}toJSON(e){const t=super.toJSON(e);return this.fog!==null&&(t.object.fog=this.fog.toJSON()),this.backgroundBlurriness>0&&(t.object.backgroundBlurriness=this.backgroundBlurriness),this.backgroundIntensity!==1&&(t.object.backgroundIntensity=this.backgroundIntensity),t.object.backgroundRotation=this.backgroundRotation.toArray(),this.environmentIntensity!==1&&(t.object.environmentIntensity=this.environmentIntensity),t.object.environmentRotation=this.environmentRotation.toArray(),t}}const Qr=new B,$h=new B,Zh=new Ce;class Un{constructor(e=new B(1,0,0),t=0){this.isPlane=!0,this.normal=e,this.constant=t}set(e,t){return this.normal.copy(e),this.constant=t,this}setComponents(e,t,i,r){return this.normal.set(e,t,i),this.constant=r,this}setFromNormalAndCoplanarPoint(e,t){return this.normal.copy(e),this.constant=-t.dot(this.normal),this}setFromCoplanarPoints(e,t,i){const r=Qr.subVectors(i,t).cross($h.subVectors(e,t)).normalize();return this.setFromNormalAndCoplanarPoint(r,e),this}copy(e){return this.normal.copy(e.normal),this.constant=e.constant,this}normalize(){const e=1/this.normal.length();return this.normal.multiplyScalar(e),this.constant*=e,this}negate(){return this.constant*=-1,this.normal.negate(),this}distanceToPoint(e){return this.normal.dot(e)+this.constant}distanceToSphere(e){return this.distanceToPoint(e.center)-e.radius}projectPoint(e,t){return t.copy(e).addScaledVector(this.normal,-this.distanceToPoint(e))}intersectLine(e,t){const i=e.delta(Qr),r=this.normal.dot(i);if(r===0)return this.distanceToPoint(e.start)===0?t.copy(e.start):null;const s=-(e.start.dot(this.normal)+this.constant)/r;return s<0||s>1?null:t.copy(e.start).addScaledVector(i,s)}intersectsLine(e){const t=this.distanceToPoint(e.start),i=this.distanceToPoint(e.end);return t<0&&i>0||i<0&&t>0}intersectsBox(e){return e.intersectsPlane(this)}intersectsSphere(e){return e.intersectsPlane(this)}coplanarPoint(e){return e.copy(this.normal).multiplyScalar(-this.constant)}applyMatrix4(e,t){const i=t||Zh.getNormalMatrix(e),r=this.coplanarPoint(Qr).applyMatrix4(e),s=this.normal.applyMatrix3(i).normalize();return this.constant=-r.dot(s),this}translate(e){return this.constant-=e.dot(this.normal),this}equals(e){return e.normal.equals(this.normal)&&e.constant===this.constant}clone(){return new this.constructor().copy(this)}}const Pn=new da,cr=new B;class pa{constructor(e=new Un,t=new Un,i=new Un,r=new Un,s=new Un,a=new Un){this.planes=[e,t,i,r,s,a]}set(e,t,i,r,s,a){const o=this.planes;return o[0].copy(e),o[1].copy(t),o[2].copy(i),o[3].copy(r),o[4].copy(s),o[5].copy(a),this}copy(e){const t=this.planes;for(let i=0;i<6;i++)t[i].copy(e.planes[i]);return this}setFromProjectionMatrix(e,t=ln){const i=this.planes,r=e.elements,s=r[0],a=r[1],o=r[2],c=r[3],l=r[4],h=r[5],u=r[6],d=r[7],m=r[8],g=r[9],M=r[10],p=r[11],f=r[12],w=r[13],T=r[14],E=r[15];if(i[0].setComponents(c-s,d-l,p-m,E-f).normalize(),i[1].setComponents(c+s,d+l,p+m,E+f).normalize(),i[2].setComponents(c+a,d+h,p+g,E+w).normalize(),i[3].setComponents(c-a,d-h,p-g,E-w).normalize(),i[4].setComponents(c-o,d-u,p-M,E-T).normalize(),t===ln)i[5].setComponents(c+o,d+u,p+M,E+T).normalize();else if(t===br)i[5].setComponents(o,u,M,T).normalize();else throw new Error("THREE.Frustum.setFromProjectionMatrix(): Invalid coordinate system: "+t);return this}intersectsObject(e){if(e.boundingSphere!==void 0)e.boundingSphere===null&&e.computeBoundingSphere(),Pn.copy(e.boundingSphere).applyMatrix4(e.matrixWorld);else{const t=e.geometry;t.boundingSphere===null&&t.computeBoundingSphere(),Pn.copy(t.boundingSphere).applyMatrix4(e.matrixWorld)}return this.intersectsSphere(Pn)}intersectsSprite(e){return Pn.center.set(0,0,0),Pn.radius=.7071067811865476,Pn.applyMatrix4(e.matrixWorld),this.intersectsSphere(Pn)}intersectsSphere(e){const t=this.planes,i=e.center,r=-e.radius;for(let s=0;s<6;s++)if(t[s].distanceToPoint(i)<r)return!1;return!0}intersectsBox(e){const t=this.planes;for(let i=0;i<6;i++){const r=t[i];if(cr.x=r.normal.x>0?e.max.x:e.min.x,cr.y=r.normal.y>0?e.max.y:e.min.y,cr.z=r.normal.z>0?e.max.z:e.min.z,r.distanceToPoint(cr)<0)return!1}return!0}containsPoint(e){const t=this.planes;for(let i=0;i<6;i++)if(t[i].distanceToPoint(e)<0)return!1;return!0}clone(){return new this.constructor().copy(this)}}class xl extends Tt{constructor(e,t,i,r,s,a,o,c,l,h=ui){if(h!==ui&&h!==gi)throw new Error("DepthTexture format must be either THREE.DepthFormat or THREE.DepthStencilFormat");i===void 0&&h===ui&&(i=kn),i===void 0&&h===gi&&(i=_i),super(null,r,s,a,o,c,h,i,l),this.isDepthTexture=!0,this.image={width:e,height:t},this.magFilter=o!==void 0?o:qt,this.minFilter=c!==void 0?c:qt,this.flipY=!1,this.generateMipmaps=!1,this.compareFunction=null}copy(e){return super.copy(e),this.compareFunction=e.compareFunction,this}toJSON(e){const t=super.toJSON(e);return this.compareFunction!==null&&(t.compareFunction=this.compareFunction),t}}class Vi extends Tn{constructor(e=1,t=1,i=1,r=1){super(),this.type="PlaneGeometry",this.parameters={width:e,height:t,widthSegments:i,heightSegments:r};const s=e/2,a=t/2,o=Math.floor(i),c=Math.floor(r),l=o+1,h=c+1,u=e/o,d=t/c,m=[],g=[],M=[],p=[];for(let f=0;f<h;f++){const w=f*d-a;for(let T=0;T<l;T++){const E=T*u-s;g.push(E,-w,0),M.push(0,0,1),p.push(T/o),p.push(1-f/c)}}for(let f=0;f<c;f++)for(let w=0;w<o;w++){const T=w+l*f,E=w+l*(f+1),C=w+1+l*(f+1),A=w+1+l*f;m.push(T,E,A),m.push(E,C,A)}this.setIndex(m),this.setAttribute("position",new Qt(g,3)),this.setAttribute("normal",new Qt(M,3)),this.setAttribute("uv",new Qt(p,2))}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new Vi(e.width,e.height,e.widthSegments,e.heightSegments)}}class ma extends Tn{constructor(e=1,t=32,i=16,r=0,s=Math.PI*2,a=0,o=Math.PI){super(),this.type="SphereGeometry",this.parameters={radius:e,widthSegments:t,heightSegments:i,phiStart:r,phiLength:s,thetaStart:a,thetaLength:o},t=Math.max(3,Math.floor(t)),i=Math.max(2,Math.floor(i));const c=Math.min(a+o,Math.PI);let l=0;const h=[],u=new B,d=new B,m=[],g=[],M=[],p=[];for(let f=0;f<=i;f++){const w=[],T=f/i;let E=0;f===0&&a===0?E=.5/t:f===i&&c===Math.PI&&(E=-.5/t);for(let C=0;C<=t;C++){const A=C/t;u.x=-e*Math.cos(r+A*s)*Math.sin(a+T*o),u.y=e*Math.cos(a+T*o),u.z=e*Math.sin(r+A*s)*Math.sin(a+T*o),g.push(u.x,u.y,u.z),d.copy(u).normalize(),M.push(d.x,d.y,d.z),p.push(A+E,1-T),w.push(l++)}h.push(w)}for(let f=0;f<i;f++)for(let w=0;w<t;w++){const T=h[f][w+1],E=h[f][w],C=h[f+1][w],A=h[f+1][w+1];(f!==0||a>0)&&m.push(T,E,A),(f!==i-1||c<Math.PI)&&m.push(E,C,A)}this.setIndex(m),this.setAttribute("position",new Qt(g,3)),this.setAttribute("normal",new Qt(M,3)),this.setAttribute("uv",new Qt(p,2))}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new ma(e.radius,e.widthSegments,e.heightSegments,e.phiStart,e.phiLength,e.thetaStart,e.thetaLength)}}class Kh extends Ei{constructor(e){super(),this.isMeshStandardMaterial=!0,this.type="MeshStandardMaterial",this.defines={STANDARD:""},this.color=new ze(16777215),this.roughness=1,this.metalness=0,this.map=null,this.lightMap=null,this.lightMapIntensity=1,this.aoMap=null,this.aoMapIntensity=1,this.emissive=new ze(0),this.emissiveIntensity=1,this.emissiveMap=null,this.bumpMap=null,this.bumpScale=1,this.normalMap=null,this.normalMapType=ha,this.normalScale=new qe(1,1),this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.roughnessMap=null,this.metalnessMap=null,this.alphaMap=null,this.envMap=null,this.envMapRotation=new Yt,this.envMapIntensity=1,this.wireframe=!1,this.wireframeLinewidth=1,this.wireframeLinecap="round",this.wireframeLinejoin="round",this.flatShading=!1,this.fog=!0,this.setValues(e)}copy(e){return super.copy(e),this.defines={STANDARD:""},this.color.copy(e.color),this.roughness=e.roughness,this.metalness=e.metalness,this.map=e.map,this.lightMap=e.lightMap,this.lightMapIntensity=e.lightMapIntensity,this.aoMap=e.aoMap,this.aoMapIntensity=e.aoMapIntensity,this.emissive.copy(e.emissive),this.emissiveMap=e.emissiveMap,this.emissiveIntensity=e.emissiveIntensity,this.bumpMap=e.bumpMap,this.bumpScale=e.bumpScale,this.normalMap=e.normalMap,this.normalMapType=e.normalMapType,this.normalScale.copy(e.normalScale),this.displacementMap=e.displacementMap,this.displacementScale=e.displacementScale,this.displacementBias=e.displacementBias,this.roughnessMap=e.roughnessMap,this.metalnessMap=e.metalnessMap,this.alphaMap=e.alphaMap,this.envMap=e.envMap,this.envMapRotation.copy(e.envMapRotation),this.envMapIntensity=e.envMapIntensity,this.wireframe=e.wireframe,this.wireframeLinewidth=e.wireframeLinewidth,this.wireframeLinecap=e.wireframeLinecap,this.wireframeLinejoin=e.wireframeLinejoin,this.flatShading=e.flatShading,this.fog=e.fog,this}}class jh extends Ei{constructor(e){super(),this.isMeshLambertMaterial=!0,this.type="MeshLambertMaterial",this.color=new ze(16777215),this.map=null,this.lightMap=null,this.lightMapIntensity=1,this.aoMap=null,this.aoMapIntensity=1,this.emissive=new ze(0),this.emissiveIntensity=1,this.emissiveMap=null,this.bumpMap=null,this.bumpScale=1,this.normalMap=null,this.normalMapType=ha,this.normalScale=new qe(1,1),this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.specularMap=null,this.alphaMap=null,this.envMap=null,this.envMapRotation=new Yt,this.combine=ra,this.reflectivity=1,this.refractionRatio=.98,this.wireframe=!1,this.wireframeLinewidth=1,this.wireframeLinecap="round",this.wireframeLinejoin="round",this.flatShading=!1,this.fog=!0,this.setValues(e)}copy(e){return super.copy(e),this.color.copy(e.color),this.map=e.map,this.lightMap=e.lightMap,this.lightMapIntensity=e.lightMapIntensity,this.aoMap=e.aoMap,this.aoMapIntensity=e.aoMapIntensity,this.emissive.copy(e.emissive),this.emissiveMap=e.emissiveMap,this.emissiveIntensity=e.emissiveIntensity,this.bumpMap=e.bumpMap,this.bumpScale=e.bumpScale,this.normalMap=e.normalMap,this.normalMapType=e.normalMapType,this.normalScale.copy(e.normalScale),this.displacementMap=e.displacementMap,this.displacementScale=e.displacementScale,this.displacementBias=e.displacementBias,this.specularMap=e.specularMap,this.alphaMap=e.alphaMap,this.envMap=e.envMap,this.envMapRotation.copy(e.envMapRotation),this.combine=e.combine,this.reflectivity=e.reflectivity,this.refractionRatio=e.refractionRatio,this.wireframe=e.wireframe,this.wireframeLinewidth=e.wireframeLinewidth,this.wireframeLinecap=e.wireframeLinecap,this.wireframeLinejoin=e.wireframeLinejoin,this.flatShading=e.flatShading,this.fog=e.fog,this}}class Jh extends Ei{constructor(e){super(),this.isMeshDepthMaterial=!0,this.type="MeshDepthMaterial",this.depthPacking=Xu,this.map=null,this.alphaMap=null,this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.wireframe=!1,this.wireframeLinewidth=1,this.setValues(e)}copy(e){return super.copy(e),this.depthPacking=e.depthPacking,this.map=e.map,this.alphaMap=e.alphaMap,this.displacementMap=e.displacementMap,this.displacementScale=e.displacementScale,this.displacementBias=e.displacementBias,this.wireframe=e.wireframe,this.wireframeLinewidth=e.wireframeLinewidth,this}}class Qh extends Ei{constructor(e){super(),this.isMeshDistanceMaterial=!0,this.type="MeshDistanceMaterial",this.map=null,this.alphaMap=null,this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.setValues(e)}copy(e){return super.copy(e),this.map=e.map,this.alphaMap=e.alphaMap,this.displacementMap=e.displacementMap,this.displacementScale=e.displacementScale,this.displacementBias=e.displacementBias,this}}class Ml extends gt{constructor(e,t=1){super(),this.isLight=!0,this.type="Light",this.color=new ze(e),this.intensity=t}dispose(){}copy(e,t){return super.copy(e,t),this.color.copy(e.color),this.intensity=e.intensity,this}toJSON(e){const t=super.toJSON(e);return t.object.color=this.color.getHex(),t.object.intensity=this.intensity,this.groundColor!==void 0&&(t.object.groundColor=this.groundColor.getHex()),this.distance!==void 0&&(t.object.distance=this.distance),this.angle!==void 0&&(t.object.angle=this.angle),this.decay!==void 0&&(t.object.decay=this.decay),this.penumbra!==void 0&&(t.object.penumbra=this.penumbra),this.shadow!==void 0&&(t.object.shadow=this.shadow.toJSON()),this.target!==void 0&&(t.object.target=this.target.uuid),t}}const es=new st,ro=new B,so=new B;class ef{constructor(e){this.camera=e,this.intensity=1,this.bias=0,this.normalBias=0,this.radius=1,this.blurSamples=8,this.mapSize=new qe(512,512),this.map=null,this.mapPass=null,this.matrix=new st,this.autoUpdate=!0,this.needsUpdate=!1,this._frustum=new pa,this._frameExtents=new qe(1,1),this._viewportCount=1,this._viewports=[new rt(0,0,1,1)]}getViewportCount(){return this._viewportCount}getFrustum(){return this._frustum}updateMatrices(e){const t=this.camera,i=this.matrix;ro.setFromMatrixPosition(e.matrixWorld),t.position.copy(ro),so.setFromMatrixPosition(e.target.matrixWorld),t.lookAt(so),t.updateMatrixWorld(),es.multiplyMatrices(t.projectionMatrix,t.matrixWorldInverse),this._frustum.setFromProjectionMatrix(es),i.set(.5,0,0,.5,0,.5,0,.5,0,0,.5,.5,0,0,0,1),i.multiply(es)}getViewport(e){return this._viewports[e]}getFrameExtents(){return this._frameExtents}dispose(){this.map&&this.map.dispose(),this.mapPass&&this.mapPass.dispose()}copy(e){return this.camera=e.camera.clone(),this.intensity=e.intensity,this.bias=e.bias,this.radius=e.radius,this.mapSize.copy(e.mapSize),this}clone(){return new this.constructor().copy(this)}toJSON(){const e={};return this.intensity!==1&&(e.intensity=this.intensity),this.bias!==0&&(e.bias=this.bias),this.normalBias!==0&&(e.normalBias=this.normalBias),this.radius!==1&&(e.radius=this.radius),(this.mapSize.x!==512||this.mapSize.y!==512)&&(e.mapSize=this.mapSize.toArray()),e.camera=this.camera.toJSON(!1).object,delete e.camera.matrix,e}}class Sl extends gl{constructor(e=-1,t=1,i=1,r=-1,s=.1,a=2e3){super(),this.isOrthographicCamera=!0,this.type="OrthographicCamera",this.zoom=1,this.view=null,this.left=e,this.right=t,this.top=i,this.bottom=r,this.near=s,this.far=a,this.updateProjectionMatrix()}copy(e,t){return super.copy(e,t),this.left=e.left,this.right=e.right,this.top=e.top,this.bottom=e.bottom,this.near=e.near,this.far=e.far,this.zoom=e.zoom,this.view=e.view===null?null:Object.assign({},e.view),this}setViewOffset(e,t,i,r,s,a){this.view===null&&(this.view={enabled:!0,fullWidth:1,fullHeight:1,offsetX:0,offsetY:0,width:1,height:1}),this.view.enabled=!0,this.view.fullWidth=e,this.view.fullHeight=t,this.view.offsetX=i,this.view.offsetY=r,this.view.width=s,this.view.height=a,this.updateProjectionMatrix()}clearViewOffset(){this.view!==null&&(this.view.enabled=!1),this.updateProjectionMatrix()}updateProjectionMatrix(){const e=(this.right-this.left)/(2*this.zoom),t=(this.top-this.bottom)/(2*this.zoom),i=(this.right+this.left)/2,r=(this.top+this.bottom)/2;let s=i-e,a=i+e,o=r+t,c=r-t;if(this.view!==null&&this.view.enabled){const l=(this.right-this.left)/this.view.fullWidth/this.zoom,h=(this.top-this.bottom)/this.view.fullHeight/this.zoom;s+=l*this.view.offsetX,a=s+l*this.view.width,o-=h*this.view.offsetY,c=o-h*this.view.height}this.projectionMatrix.makeOrthographic(s,a,o,c,this.near,this.far,this.coordinateSystem),this.projectionMatrixInverse.copy(this.projectionMatrix).invert()}toJSON(e){const t=super.toJSON(e);return t.object.zoom=this.zoom,t.object.left=this.left,t.object.right=this.right,t.object.top=this.top,t.object.bottom=this.bottom,t.object.near=this.near,t.object.far=this.far,this.view!==null&&(t.object.view=Object.assign({},this.view)),t}}class tf extends ef{constructor(){super(new Sl(-5,5,5,-5,.5,500)),this.isDirectionalLightShadow=!0}}class nf extends Ml{constructor(e,t){super(e,t),this.isDirectionalLight=!0,this.type="DirectionalLight",this.position.copy(gt.DEFAULT_UP),this.updateMatrix(),this.target=new gt,this.shadow=new tf}dispose(){this.shadow.dispose()}copy(e){return super.copy(e),this.target=e.target.clone(),this.shadow=e.shadow.clone(),this}}class rf extends Ml{constructor(e,t){super(e,t),this.isAmbientLight=!0,this.type="AmbientLight"}}class sf extends Ut{constructor(e=[]){super(),this.isArrayCamera=!0,this.cameras=e,this.index=0}}class af{constructor(e=!0){this.autoStart=e,this.startTime=0,this.oldTime=0,this.elapsedTime=0,this.running=!1}start(){this.startTime=ao(),this.oldTime=this.startTime,this.elapsedTime=0,this.running=!0}stop(){this.getElapsedTime(),this.running=!1,this.autoStart=!1}getElapsedTime(){return this.getDelta(),this.elapsedTime}getDelta(){let e=0;if(this.autoStart&&!this.running)return this.start(),0;if(this.running){const t=ao();e=(t-this.oldTime)/1e3,this.oldTime=t,this.elapsedTime+=e}return e}}function ao(){return performance.now()}function oo(n,e,t,i){const r=of(i);switch(t){case el:return n*e;case nl:return n*e;case il:return n*e*2;case rl:return n*e/r.components*r.byteLength;case la:return n*e/r.components*r.byteLength;case sl:return n*e*2/r.components*r.byteLength;case ca:return n*e*2/r.components*r.byteLength;case tl:return n*e*3/r.components*r.byteLength;case Wt:return n*e*4/r.components*r.byteLength;case ua:return n*e*4/r.components*r.byteLength;case mr:case _r:return Math.floor((n+3)/4)*Math.floor((e+3)/4)*8;case gr:case vr:return Math.floor((n+3)/4)*Math.floor((e+3)/4)*16;case bs:case ws:return Math.max(n,16)*Math.max(e,8)/4;case Ts:case As:return Math.max(n,8)*Math.max(e,8)/2;case Rs:case Cs:return Math.floor((n+3)/4)*Math.floor((e+3)/4)*8;case Ps:return Math.floor((n+3)/4)*Math.floor((e+3)/4)*16;case Ds:return Math.floor((n+3)/4)*Math.floor((e+3)/4)*16;case Ls:return Math.floor((n+4)/5)*Math.floor((e+3)/4)*16;case Us:return Math.floor((n+4)/5)*Math.floor((e+4)/5)*16;case Is:return Math.floor((n+5)/6)*Math.floor((e+4)/5)*16;case Ns:return Math.floor((n+5)/6)*Math.floor((e+5)/6)*16;case Fs:return Math.floor((n+7)/8)*Math.floor((e+4)/5)*16;case Os:return Math.floor((n+7)/8)*Math.floor((e+5)/6)*16;case Bs:return Math.floor((n+7)/8)*Math.floor((e+7)/8)*16;case zs:return Math.floor((n+9)/10)*Math.floor((e+4)/5)*16;case Hs:return Math.floor((n+9)/10)*Math.floor((e+5)/6)*16;case Vs:return Math.floor((n+9)/10)*Math.floor((e+7)/8)*16;case Gs:return Math.floor((n+9)/10)*Math.floor((e+9)/10)*16;case ks:return Math.floor((n+11)/12)*Math.floor((e+9)/10)*16;case Ws:return Math.floor((n+11)/12)*Math.floor((e+11)/12)*16;case xr:case Xs:case qs:return Math.ceil(n/4)*Math.ceil(e/4)*16;case al:case Ys:return Math.ceil(n/4)*Math.ceil(e/4)*8;case $s:case Zs:return Math.ceil(n/4)*Math.ceil(e/4)*16}throw new Error(`Unable to determine texture byte length for ${t} format.`)}function of(n){switch(n){case un:case jo:return{byteLength:1,components:1};case Ii:case Jo:case Oi:return{byteLength:2,components:1};case aa:case oa:return{byteLength:2,components:4};case kn:case sa:case on:return{byteLength:4,components:1};case Qo:return{byteLength:4,components:3}}throw new Error(`Unknown texture type ${n}.`)}typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("register",{detail:{revision:ia}}));typeof window<"u"&&(window.__THREE__?console.warn("WARNING: Multiple instances of Three.js being imported."):window.__THREE__=ia);/**
 * @license
 * Copyright 2010-2025 Three.js Authors
 * SPDX-License-Identifier: MIT
 */function El(){let n=null,e=!1,t=null,i=null;function r(s,a){t(s,a),i=n.requestAnimationFrame(r)}return{start:function(){e!==!0&&t!==null&&(i=n.requestAnimationFrame(r),e=!0)},stop:function(){n.cancelAnimationFrame(i),e=!1},setAnimationLoop:function(s){t=s},setContext:function(s){n=s}}}function lf(n){const e=new WeakMap;function t(o,c){const l=o.array,h=o.usage,u=l.byteLength,d=n.createBuffer();n.bindBuffer(c,d),n.bufferData(c,l,h),o.onUploadCallback();let m;if(l instanceof Float32Array)m=n.FLOAT;else if(l instanceof Uint16Array)o.isFloat16BufferAttribute?m=n.HALF_FLOAT:m=n.UNSIGNED_SHORT;else if(l instanceof Int16Array)m=n.SHORT;else if(l instanceof Uint32Array)m=n.UNSIGNED_INT;else if(l instanceof Int32Array)m=n.INT;else if(l instanceof Int8Array)m=n.BYTE;else if(l instanceof Uint8Array)m=n.UNSIGNED_BYTE;else if(l instanceof Uint8ClampedArray)m=n.UNSIGNED_BYTE;else throw new Error("THREE.WebGLAttributes: Unsupported buffer data format: "+l);return{buffer:d,type:m,bytesPerElement:l.BYTES_PER_ELEMENT,version:o.version,size:u}}function i(o,c,l){const h=c.array,u=c.updateRanges;if(n.bindBuffer(l,o),u.length===0)n.bufferSubData(l,0,h);else{u.sort((m,g)=>m.start-g.start);let d=0;for(let m=1;m<u.length;m++){const g=u[d],M=u[m];M.start<=g.start+g.count+1?g.count=Math.max(g.count,M.start+M.count-g.start):(++d,u[d]=M)}u.length=d+1;for(let m=0,g=u.length;m<g;m++){const M=u[m];n.bufferSubData(l,M.start*h.BYTES_PER_ELEMENT,h,M.start,M.count)}c.clearUpdateRanges()}c.onUploadCallback()}function r(o){return o.isInterleavedBufferAttribute&&(o=o.data),e.get(o)}function s(o){o.isInterleavedBufferAttribute&&(o=o.data);const c=e.get(o);c&&(n.deleteBuffer(c.buffer),e.delete(o))}function a(o,c){if(o.isInterleavedBufferAttribute&&(o=o.data),o.isGLBufferAttribute){const h=e.get(o);(!h||h.version<o.version)&&e.set(o,{buffer:o.buffer,type:o.type,bytesPerElement:o.elementSize,version:o.version});return}const l=e.get(o);if(l===void 0)e.set(o,t(o,c));else if(l.version<o.version){if(l.size!==o.array.byteLength)throw new Error("THREE.WebGLAttributes: The size of the buffer attribute's array buffer does not match the original size. Resizing buffer attributes is not supported.");i(l.buffer,o,c),l.version=o.version}}return{get:r,remove:s,update:a}}var cf=`#ifdef USE_ALPHAHASH
	if ( diffuseColor.a < getAlphaHashThreshold( vPosition ) ) discard;
#endif`,uf=`#ifdef USE_ALPHAHASH
	const float ALPHA_HASH_SCALE = 0.05;
	float hash2D( vec2 value ) {
		return fract( 1.0e4 * sin( 17.0 * value.x + 0.1 * value.y ) * ( 0.1 + abs( sin( 13.0 * value.y + value.x ) ) ) );
	}
	float hash3D( vec3 value ) {
		return hash2D( vec2( hash2D( value.xy ), value.z ) );
	}
	float getAlphaHashThreshold( vec3 position ) {
		float maxDeriv = max(
			length( dFdx( position.xyz ) ),
			length( dFdy( position.xyz ) )
		);
		float pixScale = 1.0 / ( ALPHA_HASH_SCALE * maxDeriv );
		vec2 pixScales = vec2(
			exp2( floor( log2( pixScale ) ) ),
			exp2( ceil( log2( pixScale ) ) )
		);
		vec2 alpha = vec2(
			hash3D( floor( pixScales.x * position.xyz ) ),
			hash3D( floor( pixScales.y * position.xyz ) )
		);
		float lerpFactor = fract( log2( pixScale ) );
		float x = ( 1.0 - lerpFactor ) * alpha.x + lerpFactor * alpha.y;
		float a = min( lerpFactor, 1.0 - lerpFactor );
		vec3 cases = vec3(
			x * x / ( 2.0 * a * ( 1.0 - a ) ),
			( x - 0.5 * a ) / ( 1.0 - a ),
			1.0 - ( ( 1.0 - x ) * ( 1.0 - x ) / ( 2.0 * a * ( 1.0 - a ) ) )
		);
		float threshold = ( x < ( 1.0 - a ) )
			? ( ( x < a ) ? cases.x : cases.y )
			: cases.z;
		return clamp( threshold , 1.0e-6, 1.0 );
	}
#endif`,hf=`#ifdef USE_ALPHAMAP
	diffuseColor.a *= texture2D( alphaMap, vAlphaMapUv ).g;
#endif`,ff=`#ifdef USE_ALPHAMAP
	uniform sampler2D alphaMap;
#endif`,df=`#ifdef USE_ALPHATEST
	#ifdef ALPHA_TO_COVERAGE
	diffuseColor.a = smoothstep( alphaTest, alphaTest + fwidth( diffuseColor.a ), diffuseColor.a );
	if ( diffuseColor.a == 0.0 ) discard;
	#else
	if ( diffuseColor.a < alphaTest ) discard;
	#endif
#endif`,pf=`#ifdef USE_ALPHATEST
	uniform float alphaTest;
#endif`,mf=`#ifdef USE_AOMAP
	float ambientOcclusion = ( texture2D( aoMap, vAoMapUv ).r - 1.0 ) * aoMapIntensity + 1.0;
	reflectedLight.indirectDiffuse *= ambientOcclusion;
	#if defined( USE_CLEARCOAT ) 
		clearcoatSpecularIndirect *= ambientOcclusion;
	#endif
	#if defined( USE_SHEEN ) 
		sheenSpecularIndirect *= ambientOcclusion;
	#endif
	#if defined( USE_ENVMAP ) && defined( STANDARD )
		float dotNV = saturate( dot( geometryNormal, geometryViewDir ) );
		reflectedLight.indirectSpecular *= computeSpecularOcclusion( dotNV, ambientOcclusion, material.roughness );
	#endif
#endif`,_f=`#ifdef USE_AOMAP
	uniform sampler2D aoMap;
	uniform float aoMapIntensity;
#endif`,gf=`#ifdef USE_BATCHING
	#if ! defined( GL_ANGLE_multi_draw )
	#define gl_DrawID _gl_DrawID
	uniform int _gl_DrawID;
	#endif
	uniform highp sampler2D batchingTexture;
	uniform highp usampler2D batchingIdTexture;
	mat4 getBatchingMatrix( const in float i ) {
		int size = textureSize( batchingTexture, 0 ).x;
		int j = int( i ) * 4;
		int x = j % size;
		int y = j / size;
		vec4 v1 = texelFetch( batchingTexture, ivec2( x, y ), 0 );
		vec4 v2 = texelFetch( batchingTexture, ivec2( x + 1, y ), 0 );
		vec4 v3 = texelFetch( batchingTexture, ivec2( x + 2, y ), 0 );
		vec4 v4 = texelFetch( batchingTexture, ivec2( x + 3, y ), 0 );
		return mat4( v1, v2, v3, v4 );
	}
	float getIndirectIndex( const in int i ) {
		int size = textureSize( batchingIdTexture, 0 ).x;
		int x = i % size;
		int y = i / size;
		return float( texelFetch( batchingIdTexture, ivec2( x, y ), 0 ).r );
	}
#endif
#ifdef USE_BATCHING_COLOR
	uniform sampler2D batchingColorTexture;
	vec3 getBatchingColor( const in float i ) {
		int size = textureSize( batchingColorTexture, 0 ).x;
		int j = int( i );
		int x = j % size;
		int y = j / size;
		return texelFetch( batchingColorTexture, ivec2( x, y ), 0 ).rgb;
	}
#endif`,vf=`#ifdef USE_BATCHING
	mat4 batchingMatrix = getBatchingMatrix( getIndirectIndex( gl_DrawID ) );
#endif`,xf=`vec3 transformed = vec3( position );
#ifdef USE_ALPHAHASH
	vPosition = vec3( position );
#endif`,Mf=`vec3 objectNormal = vec3( normal );
#ifdef USE_TANGENT
	vec3 objectTangent = vec3( tangent.xyz );
#endif`,Sf=`float G_BlinnPhong_Implicit( ) {
	return 0.25;
}
float D_BlinnPhong( const in float shininess, const in float dotNH ) {
	return RECIPROCAL_PI * ( shininess * 0.5 + 1.0 ) * pow( dotNH, shininess );
}
vec3 BRDF_BlinnPhong( const in vec3 lightDir, const in vec3 viewDir, const in vec3 normal, const in vec3 specularColor, const in float shininess ) {
	vec3 halfDir = normalize( lightDir + viewDir );
	float dotNH = saturate( dot( normal, halfDir ) );
	float dotVH = saturate( dot( viewDir, halfDir ) );
	vec3 F = F_Schlick( specularColor, 1.0, dotVH );
	float G = G_BlinnPhong_Implicit( );
	float D = D_BlinnPhong( shininess, dotNH );
	return F * ( G * D );
} // validated`,Ef=`#ifdef USE_IRIDESCENCE
	const mat3 XYZ_TO_REC709 = mat3(
		 3.2404542, -0.9692660,  0.0556434,
		-1.5371385,  1.8760108, -0.2040259,
		-0.4985314,  0.0415560,  1.0572252
	);
	vec3 Fresnel0ToIor( vec3 fresnel0 ) {
		vec3 sqrtF0 = sqrt( fresnel0 );
		return ( vec3( 1.0 ) + sqrtF0 ) / ( vec3( 1.0 ) - sqrtF0 );
	}
	vec3 IorToFresnel0( vec3 transmittedIor, float incidentIor ) {
		return pow2( ( transmittedIor - vec3( incidentIor ) ) / ( transmittedIor + vec3( incidentIor ) ) );
	}
	float IorToFresnel0( float transmittedIor, float incidentIor ) {
		return pow2( ( transmittedIor - incidentIor ) / ( transmittedIor + incidentIor ));
	}
	vec3 evalSensitivity( float OPD, vec3 shift ) {
		float phase = 2.0 * PI * OPD * 1.0e-9;
		vec3 val = vec3( 5.4856e-13, 4.4201e-13, 5.2481e-13 );
		vec3 pos = vec3( 1.6810e+06, 1.7953e+06, 2.2084e+06 );
		vec3 var = vec3( 4.3278e+09, 9.3046e+09, 6.6121e+09 );
		vec3 xyz = val * sqrt( 2.0 * PI * var ) * cos( pos * phase + shift ) * exp( - pow2( phase ) * var );
		xyz.x += 9.7470e-14 * sqrt( 2.0 * PI * 4.5282e+09 ) * cos( 2.2399e+06 * phase + shift[ 0 ] ) * exp( - 4.5282e+09 * pow2( phase ) );
		xyz /= 1.0685e-7;
		vec3 rgb = XYZ_TO_REC709 * xyz;
		return rgb;
	}
	vec3 evalIridescence( float outsideIOR, float eta2, float cosTheta1, float thinFilmThickness, vec3 baseF0 ) {
		vec3 I;
		float iridescenceIOR = mix( outsideIOR, eta2, smoothstep( 0.0, 0.03, thinFilmThickness ) );
		float sinTheta2Sq = pow2( outsideIOR / iridescenceIOR ) * ( 1.0 - pow2( cosTheta1 ) );
		float cosTheta2Sq = 1.0 - sinTheta2Sq;
		if ( cosTheta2Sq < 0.0 ) {
			return vec3( 1.0 );
		}
		float cosTheta2 = sqrt( cosTheta2Sq );
		float R0 = IorToFresnel0( iridescenceIOR, outsideIOR );
		float R12 = F_Schlick( R0, 1.0, cosTheta1 );
		float T121 = 1.0 - R12;
		float phi12 = 0.0;
		if ( iridescenceIOR < outsideIOR ) phi12 = PI;
		float phi21 = PI - phi12;
		vec3 baseIOR = Fresnel0ToIor( clamp( baseF0, 0.0, 0.9999 ) );		vec3 R1 = IorToFresnel0( baseIOR, iridescenceIOR );
		vec3 R23 = F_Schlick( R1, 1.0, cosTheta2 );
		vec3 phi23 = vec3( 0.0 );
		if ( baseIOR[ 0 ] < iridescenceIOR ) phi23[ 0 ] = PI;
		if ( baseIOR[ 1 ] < iridescenceIOR ) phi23[ 1 ] = PI;
		if ( baseIOR[ 2 ] < iridescenceIOR ) phi23[ 2 ] = PI;
		float OPD = 2.0 * iridescenceIOR * thinFilmThickness * cosTheta2;
		vec3 phi = vec3( phi21 ) + phi23;
		vec3 R123 = clamp( R12 * R23, 1e-5, 0.9999 );
		vec3 r123 = sqrt( R123 );
		vec3 Rs = pow2( T121 ) * R23 / ( vec3( 1.0 ) - R123 );
		vec3 C0 = R12 + Rs;
		I = C0;
		vec3 Cm = Rs - T121;
		for ( int m = 1; m <= 2; ++ m ) {
			Cm *= r123;
			vec3 Sm = 2.0 * evalSensitivity( float( m ) * OPD, float( m ) * phi );
			I += Cm * Sm;
		}
		return max( I, vec3( 0.0 ) );
	}
#endif`,yf=`#ifdef USE_BUMPMAP
	uniform sampler2D bumpMap;
	uniform float bumpScale;
	vec2 dHdxy_fwd() {
		vec2 dSTdx = dFdx( vBumpMapUv );
		vec2 dSTdy = dFdy( vBumpMapUv );
		float Hll = bumpScale * texture2D( bumpMap, vBumpMapUv ).x;
		float dBx = bumpScale * texture2D( bumpMap, vBumpMapUv + dSTdx ).x - Hll;
		float dBy = bumpScale * texture2D( bumpMap, vBumpMapUv + dSTdy ).x - Hll;
		return vec2( dBx, dBy );
	}
	vec3 perturbNormalArb( vec3 surf_pos, vec3 surf_norm, vec2 dHdxy, float faceDirection ) {
		vec3 vSigmaX = normalize( dFdx( surf_pos.xyz ) );
		vec3 vSigmaY = normalize( dFdy( surf_pos.xyz ) );
		vec3 vN = surf_norm;
		vec3 R1 = cross( vSigmaY, vN );
		vec3 R2 = cross( vN, vSigmaX );
		float fDet = dot( vSigmaX, R1 ) * faceDirection;
		vec3 vGrad = sign( fDet ) * ( dHdxy.x * R1 + dHdxy.y * R2 );
		return normalize( abs( fDet ) * surf_norm - vGrad );
	}
#endif`,Tf=`#if NUM_CLIPPING_PLANES > 0
	vec4 plane;
	#ifdef ALPHA_TO_COVERAGE
		float distanceToPlane, distanceGradient;
		float clipOpacity = 1.0;
		#pragma unroll_loop_start
		for ( int i = 0; i < UNION_CLIPPING_PLANES; i ++ ) {
			plane = clippingPlanes[ i ];
			distanceToPlane = - dot( vClipPosition, plane.xyz ) + plane.w;
			distanceGradient = fwidth( distanceToPlane ) / 2.0;
			clipOpacity *= smoothstep( - distanceGradient, distanceGradient, distanceToPlane );
			if ( clipOpacity == 0.0 ) discard;
		}
		#pragma unroll_loop_end
		#if UNION_CLIPPING_PLANES < NUM_CLIPPING_PLANES
			float unionClipOpacity = 1.0;
			#pragma unroll_loop_start
			for ( int i = UNION_CLIPPING_PLANES; i < NUM_CLIPPING_PLANES; i ++ ) {
				plane = clippingPlanes[ i ];
				distanceToPlane = - dot( vClipPosition, plane.xyz ) + plane.w;
				distanceGradient = fwidth( distanceToPlane ) / 2.0;
				unionClipOpacity *= 1.0 - smoothstep( - distanceGradient, distanceGradient, distanceToPlane );
			}
			#pragma unroll_loop_end
			clipOpacity *= 1.0 - unionClipOpacity;
		#endif
		diffuseColor.a *= clipOpacity;
		if ( diffuseColor.a == 0.0 ) discard;
	#else
		#pragma unroll_loop_start
		for ( int i = 0; i < UNION_CLIPPING_PLANES; i ++ ) {
			plane = clippingPlanes[ i ];
			if ( dot( vClipPosition, plane.xyz ) > plane.w ) discard;
		}
		#pragma unroll_loop_end
		#if UNION_CLIPPING_PLANES < NUM_CLIPPING_PLANES
			bool clipped = true;
			#pragma unroll_loop_start
			for ( int i = UNION_CLIPPING_PLANES; i < NUM_CLIPPING_PLANES; i ++ ) {
				plane = clippingPlanes[ i ];
				clipped = ( dot( vClipPosition, plane.xyz ) > plane.w ) && clipped;
			}
			#pragma unroll_loop_end
			if ( clipped ) discard;
		#endif
	#endif
#endif`,bf=`#if NUM_CLIPPING_PLANES > 0
	varying vec3 vClipPosition;
	uniform vec4 clippingPlanes[ NUM_CLIPPING_PLANES ];
#endif`,Af=`#if NUM_CLIPPING_PLANES > 0
	varying vec3 vClipPosition;
#endif`,wf=`#if NUM_CLIPPING_PLANES > 0
	vClipPosition = - mvPosition.xyz;
#endif`,Rf=`#if defined( USE_COLOR_ALPHA )
	diffuseColor *= vColor;
#elif defined( USE_COLOR )
	diffuseColor.rgb *= vColor;
#endif`,Cf=`#if defined( USE_COLOR_ALPHA )
	varying vec4 vColor;
#elif defined( USE_COLOR )
	varying vec3 vColor;
#endif`,Pf=`#if defined( USE_COLOR_ALPHA )
	varying vec4 vColor;
#elif defined( USE_COLOR ) || defined( USE_INSTANCING_COLOR ) || defined( USE_BATCHING_COLOR )
	varying vec3 vColor;
#endif`,Df=`#if defined( USE_COLOR_ALPHA )
	vColor = vec4( 1.0 );
#elif defined( USE_COLOR ) || defined( USE_INSTANCING_COLOR ) || defined( USE_BATCHING_COLOR )
	vColor = vec3( 1.0 );
#endif
#ifdef USE_COLOR
	vColor *= color;
#endif
#ifdef USE_INSTANCING_COLOR
	vColor.xyz *= instanceColor.xyz;
#endif
#ifdef USE_BATCHING_COLOR
	vec3 batchingColor = getBatchingColor( getIndirectIndex( gl_DrawID ) );
	vColor.xyz *= batchingColor.xyz;
#endif`,Lf=`#define PI 3.141592653589793
#define PI2 6.283185307179586
#define PI_HALF 1.5707963267948966
#define RECIPROCAL_PI 0.3183098861837907
#define RECIPROCAL_PI2 0.15915494309189535
#define EPSILON 1e-6
#ifndef saturate
#define saturate( a ) clamp( a, 0.0, 1.0 )
#endif
#define whiteComplement( a ) ( 1.0 - saturate( a ) )
float pow2( const in float x ) { return x*x; }
vec3 pow2( const in vec3 x ) { return x*x; }
float pow3( const in float x ) { return x*x*x; }
float pow4( const in float x ) { float x2 = x*x; return x2*x2; }
float max3( const in vec3 v ) { return max( max( v.x, v.y ), v.z ); }
float average( const in vec3 v ) { return dot( v, vec3( 0.3333333 ) ); }
highp float rand( const in vec2 uv ) {
	const highp float a = 12.9898, b = 78.233, c = 43758.5453;
	highp float dt = dot( uv.xy, vec2( a,b ) ), sn = mod( dt, PI );
	return fract( sin( sn ) * c );
}
#ifdef HIGH_PRECISION
	float precisionSafeLength( vec3 v ) { return length( v ); }
#else
	float precisionSafeLength( vec3 v ) {
		float maxComponent = max3( abs( v ) );
		return length( v / maxComponent ) * maxComponent;
	}
#endif
struct IncidentLight {
	vec3 color;
	vec3 direction;
	bool visible;
};
struct ReflectedLight {
	vec3 directDiffuse;
	vec3 directSpecular;
	vec3 indirectDiffuse;
	vec3 indirectSpecular;
};
#ifdef USE_ALPHAHASH
	varying vec3 vPosition;
#endif
vec3 transformDirection( in vec3 dir, in mat4 matrix ) {
	return normalize( ( matrix * vec4( dir, 0.0 ) ).xyz );
}
vec3 inverseTransformDirection( in vec3 dir, in mat4 matrix ) {
	return normalize( ( vec4( dir, 0.0 ) * matrix ).xyz );
}
mat3 transposeMat3( const in mat3 m ) {
	mat3 tmp;
	tmp[ 0 ] = vec3( m[ 0 ].x, m[ 1 ].x, m[ 2 ].x );
	tmp[ 1 ] = vec3( m[ 0 ].y, m[ 1 ].y, m[ 2 ].y );
	tmp[ 2 ] = vec3( m[ 0 ].z, m[ 1 ].z, m[ 2 ].z );
	return tmp;
}
bool isPerspectiveMatrix( mat4 m ) {
	return m[ 2 ][ 3 ] == - 1.0;
}
vec2 equirectUv( in vec3 dir ) {
	float u = atan( dir.z, dir.x ) * RECIPROCAL_PI2 + 0.5;
	float v = asin( clamp( dir.y, - 1.0, 1.0 ) ) * RECIPROCAL_PI + 0.5;
	return vec2( u, v );
}
vec3 BRDF_Lambert( const in vec3 diffuseColor ) {
	return RECIPROCAL_PI * diffuseColor;
}
vec3 F_Schlick( const in vec3 f0, const in float f90, const in float dotVH ) {
	float fresnel = exp2( ( - 5.55473 * dotVH - 6.98316 ) * dotVH );
	return f0 * ( 1.0 - fresnel ) + ( f90 * fresnel );
}
float F_Schlick( const in float f0, const in float f90, const in float dotVH ) {
	float fresnel = exp2( ( - 5.55473 * dotVH - 6.98316 ) * dotVH );
	return f0 * ( 1.0 - fresnel ) + ( f90 * fresnel );
} // validated`,Uf=`#ifdef ENVMAP_TYPE_CUBE_UV
	#define cubeUV_minMipLevel 4.0
	#define cubeUV_minTileSize 16.0
	float getFace( vec3 direction ) {
		vec3 absDirection = abs( direction );
		float face = - 1.0;
		if ( absDirection.x > absDirection.z ) {
			if ( absDirection.x > absDirection.y )
				face = direction.x > 0.0 ? 0.0 : 3.0;
			else
				face = direction.y > 0.0 ? 1.0 : 4.0;
		} else {
			if ( absDirection.z > absDirection.y )
				face = direction.z > 0.0 ? 2.0 : 5.0;
			else
				face = direction.y > 0.0 ? 1.0 : 4.0;
		}
		return face;
	}
	vec2 getUV( vec3 direction, float face ) {
		vec2 uv;
		if ( face == 0.0 ) {
			uv = vec2( direction.z, direction.y ) / abs( direction.x );
		} else if ( face == 1.0 ) {
			uv = vec2( - direction.x, - direction.z ) / abs( direction.y );
		} else if ( face == 2.0 ) {
			uv = vec2( - direction.x, direction.y ) / abs( direction.z );
		} else if ( face == 3.0 ) {
			uv = vec2( - direction.z, direction.y ) / abs( direction.x );
		} else if ( face == 4.0 ) {
			uv = vec2( - direction.x, direction.z ) / abs( direction.y );
		} else {
			uv = vec2( direction.x, direction.y ) / abs( direction.z );
		}
		return 0.5 * ( uv + 1.0 );
	}
	vec3 bilinearCubeUV( sampler2D envMap, vec3 direction, float mipInt ) {
		float face = getFace( direction );
		float filterInt = max( cubeUV_minMipLevel - mipInt, 0.0 );
		mipInt = max( mipInt, cubeUV_minMipLevel );
		float faceSize = exp2( mipInt );
		highp vec2 uv = getUV( direction, face ) * ( faceSize - 2.0 ) + 1.0;
		if ( face > 2.0 ) {
			uv.y += faceSize;
			face -= 3.0;
		}
		uv.x += face * faceSize;
		uv.x += filterInt * 3.0 * cubeUV_minTileSize;
		uv.y += 4.0 * ( exp2( CUBEUV_MAX_MIP ) - faceSize );
		uv.x *= CUBEUV_TEXEL_WIDTH;
		uv.y *= CUBEUV_TEXEL_HEIGHT;
		#ifdef texture2DGradEXT
			return texture2DGradEXT( envMap, uv, vec2( 0.0 ), vec2( 0.0 ) ).rgb;
		#else
			return texture2D( envMap, uv ).rgb;
		#endif
	}
	#define cubeUV_r0 1.0
	#define cubeUV_m0 - 2.0
	#define cubeUV_r1 0.8
	#define cubeUV_m1 - 1.0
	#define cubeUV_r4 0.4
	#define cubeUV_m4 2.0
	#define cubeUV_r5 0.305
	#define cubeUV_m5 3.0
	#define cubeUV_r6 0.21
	#define cubeUV_m6 4.0
	float roughnessToMip( float roughness ) {
		float mip = 0.0;
		if ( roughness >= cubeUV_r1 ) {
			mip = ( cubeUV_r0 - roughness ) * ( cubeUV_m1 - cubeUV_m0 ) / ( cubeUV_r0 - cubeUV_r1 ) + cubeUV_m0;
		} else if ( roughness >= cubeUV_r4 ) {
			mip = ( cubeUV_r1 - roughness ) * ( cubeUV_m4 - cubeUV_m1 ) / ( cubeUV_r1 - cubeUV_r4 ) + cubeUV_m1;
		} else if ( roughness >= cubeUV_r5 ) {
			mip = ( cubeUV_r4 - roughness ) * ( cubeUV_m5 - cubeUV_m4 ) / ( cubeUV_r4 - cubeUV_r5 ) + cubeUV_m4;
		} else if ( roughness >= cubeUV_r6 ) {
			mip = ( cubeUV_r5 - roughness ) * ( cubeUV_m6 - cubeUV_m5 ) / ( cubeUV_r5 - cubeUV_r6 ) + cubeUV_m5;
		} else {
			mip = - 2.0 * log2( 1.16 * roughness );		}
		return mip;
	}
	vec4 textureCubeUV( sampler2D envMap, vec3 sampleDir, float roughness ) {
		float mip = clamp( roughnessToMip( roughness ), cubeUV_m0, CUBEUV_MAX_MIP );
		float mipF = fract( mip );
		float mipInt = floor( mip );
		vec3 color0 = bilinearCubeUV( envMap, sampleDir, mipInt );
		if ( mipF == 0.0 ) {
			return vec4( color0, 1.0 );
		} else {
			vec3 color1 = bilinearCubeUV( envMap, sampleDir, mipInt + 1.0 );
			return vec4( mix( color0, color1, mipF ), 1.0 );
		}
	}
#endif`,If=`vec3 transformedNormal = objectNormal;
#ifdef USE_TANGENT
	vec3 transformedTangent = objectTangent;
#endif
#ifdef USE_BATCHING
	mat3 bm = mat3( batchingMatrix );
	transformedNormal /= vec3( dot( bm[ 0 ], bm[ 0 ] ), dot( bm[ 1 ], bm[ 1 ] ), dot( bm[ 2 ], bm[ 2 ] ) );
	transformedNormal = bm * transformedNormal;
	#ifdef USE_TANGENT
		transformedTangent = bm * transformedTangent;
	#endif
#endif
#ifdef USE_INSTANCING
	mat3 im = mat3( instanceMatrix );
	transformedNormal /= vec3( dot( im[ 0 ], im[ 0 ] ), dot( im[ 1 ], im[ 1 ] ), dot( im[ 2 ], im[ 2 ] ) );
	transformedNormal = im * transformedNormal;
	#ifdef USE_TANGENT
		transformedTangent = im * transformedTangent;
	#endif
#endif
transformedNormal = normalMatrix * transformedNormal;
#ifdef FLIP_SIDED
	transformedNormal = - transformedNormal;
#endif
#ifdef USE_TANGENT
	transformedTangent = ( modelViewMatrix * vec4( transformedTangent, 0.0 ) ).xyz;
	#ifdef FLIP_SIDED
		transformedTangent = - transformedTangent;
	#endif
#endif`,Nf=`#ifdef USE_DISPLACEMENTMAP
	uniform sampler2D displacementMap;
	uniform float displacementScale;
	uniform float displacementBias;
#endif`,Ff=`#ifdef USE_DISPLACEMENTMAP
	transformed += normalize( objectNormal ) * ( texture2D( displacementMap, vDisplacementMapUv ).x * displacementScale + displacementBias );
#endif`,Of=`#ifdef USE_EMISSIVEMAP
	vec4 emissiveColor = texture2D( emissiveMap, vEmissiveMapUv );
	#ifdef DECODE_VIDEO_TEXTURE_EMISSIVE
		emissiveColor = sRGBTransferEOTF( emissiveColor );
	#endif
	totalEmissiveRadiance *= emissiveColor.rgb;
#endif`,Bf=`#ifdef USE_EMISSIVEMAP
	uniform sampler2D emissiveMap;
#endif`,zf="gl_FragColor = linearToOutputTexel( gl_FragColor );",Hf=`vec4 LinearTransferOETF( in vec4 value ) {
	return value;
}
vec4 sRGBTransferEOTF( in vec4 value ) {
	return vec4( mix( pow( value.rgb * 0.9478672986 + vec3( 0.0521327014 ), vec3( 2.4 ) ), value.rgb * 0.0773993808, vec3( lessThanEqual( value.rgb, vec3( 0.04045 ) ) ) ), value.a );
}
vec4 sRGBTransferOETF( in vec4 value ) {
	return vec4( mix( pow( value.rgb, vec3( 0.41666 ) ) * 1.055 - vec3( 0.055 ), value.rgb * 12.92, vec3( lessThanEqual( value.rgb, vec3( 0.0031308 ) ) ) ), value.a );
}`,Vf=`#ifdef USE_ENVMAP
	#ifdef ENV_WORLDPOS
		vec3 cameraToFrag;
		if ( isOrthographic ) {
			cameraToFrag = normalize( vec3( - viewMatrix[ 0 ][ 2 ], - viewMatrix[ 1 ][ 2 ], - viewMatrix[ 2 ][ 2 ] ) );
		} else {
			cameraToFrag = normalize( vWorldPosition - cameraPosition );
		}
		vec3 worldNormal = inverseTransformDirection( normal, viewMatrix );
		#ifdef ENVMAP_MODE_REFLECTION
			vec3 reflectVec = reflect( cameraToFrag, worldNormal );
		#else
			vec3 reflectVec = refract( cameraToFrag, worldNormal, refractionRatio );
		#endif
	#else
		vec3 reflectVec = vReflect;
	#endif
	#ifdef ENVMAP_TYPE_CUBE
		vec4 envColor = textureCube( envMap, envMapRotation * vec3( flipEnvMap * reflectVec.x, reflectVec.yz ) );
	#else
		vec4 envColor = vec4( 0.0 );
	#endif
	#ifdef ENVMAP_BLENDING_MULTIPLY
		outgoingLight = mix( outgoingLight, outgoingLight * envColor.xyz, specularStrength * reflectivity );
	#elif defined( ENVMAP_BLENDING_MIX )
		outgoingLight = mix( outgoingLight, envColor.xyz, specularStrength * reflectivity );
	#elif defined( ENVMAP_BLENDING_ADD )
		outgoingLight += envColor.xyz * specularStrength * reflectivity;
	#endif
#endif`,Gf=`#ifdef USE_ENVMAP
	uniform float envMapIntensity;
	uniform float flipEnvMap;
	uniform mat3 envMapRotation;
	#ifdef ENVMAP_TYPE_CUBE
		uniform samplerCube envMap;
	#else
		uniform sampler2D envMap;
	#endif
	
#endif`,kf=`#ifdef USE_ENVMAP
	uniform float reflectivity;
	#if defined( USE_BUMPMAP ) || defined( USE_NORMALMAP ) || defined( PHONG ) || defined( LAMBERT )
		#define ENV_WORLDPOS
	#endif
	#ifdef ENV_WORLDPOS
		varying vec3 vWorldPosition;
		uniform float refractionRatio;
	#else
		varying vec3 vReflect;
	#endif
#endif`,Wf=`#ifdef USE_ENVMAP
	#if defined( USE_BUMPMAP ) || defined( USE_NORMALMAP ) || defined( PHONG ) || defined( LAMBERT )
		#define ENV_WORLDPOS
	#endif
	#ifdef ENV_WORLDPOS
		
		varying vec3 vWorldPosition;
	#else
		varying vec3 vReflect;
		uniform float refractionRatio;
	#endif
#endif`,Xf=`#ifdef USE_ENVMAP
	#ifdef ENV_WORLDPOS
		vWorldPosition = worldPosition.xyz;
	#else
		vec3 cameraToVertex;
		if ( isOrthographic ) {
			cameraToVertex = normalize( vec3( - viewMatrix[ 0 ][ 2 ], - viewMatrix[ 1 ][ 2 ], - viewMatrix[ 2 ][ 2 ] ) );
		} else {
			cameraToVertex = normalize( worldPosition.xyz - cameraPosition );
		}
		vec3 worldNormal = inverseTransformDirection( transformedNormal, viewMatrix );
		#ifdef ENVMAP_MODE_REFLECTION
			vReflect = reflect( cameraToVertex, worldNormal );
		#else
			vReflect = refract( cameraToVertex, worldNormal, refractionRatio );
		#endif
	#endif
#endif`,qf=`#ifdef USE_FOG
	vFogDepth = - mvPosition.z;
#endif`,Yf=`#ifdef USE_FOG
	varying float vFogDepth;
#endif`,$f=`#ifdef USE_FOG
	#ifdef FOG_EXP2
		float fogFactor = 1.0 - exp( - fogDensity * fogDensity * vFogDepth * vFogDepth );
	#else
		float fogFactor = smoothstep( fogNear, fogFar, vFogDepth );
	#endif
	gl_FragColor.rgb = mix( gl_FragColor.rgb, fogColor, fogFactor );
#endif`,Zf=`#ifdef USE_FOG
	uniform vec3 fogColor;
	varying float vFogDepth;
	#ifdef FOG_EXP2
		uniform float fogDensity;
	#else
		uniform float fogNear;
		uniform float fogFar;
	#endif
#endif`,Kf=`#ifdef USE_GRADIENTMAP
	uniform sampler2D gradientMap;
#endif
vec3 getGradientIrradiance( vec3 normal, vec3 lightDirection ) {
	float dotNL = dot( normal, lightDirection );
	vec2 coord = vec2( dotNL * 0.5 + 0.5, 0.0 );
	#ifdef USE_GRADIENTMAP
		return vec3( texture2D( gradientMap, coord ).r );
	#else
		vec2 fw = fwidth( coord ) * 0.5;
		return mix( vec3( 0.7 ), vec3( 1.0 ), smoothstep( 0.7 - fw.x, 0.7 + fw.x, coord.x ) );
	#endif
}`,jf=`#ifdef USE_LIGHTMAP
	uniform sampler2D lightMap;
	uniform float lightMapIntensity;
#endif`,Jf=`LambertMaterial material;
material.diffuseColor = diffuseColor.rgb;
material.specularStrength = specularStrength;`,Qf=`varying vec3 vViewPosition;
struct LambertMaterial {
	vec3 diffuseColor;
	float specularStrength;
};
void RE_Direct_Lambert( const in IncidentLight directLight, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in LambertMaterial material, inout ReflectedLight reflectedLight ) {
	float dotNL = saturate( dot( geometryNormal, directLight.direction ) );
	vec3 irradiance = dotNL * directLight.color;
	reflectedLight.directDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
void RE_IndirectDiffuse_Lambert( const in vec3 irradiance, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in LambertMaterial material, inout ReflectedLight reflectedLight ) {
	reflectedLight.indirectDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
#define RE_Direct				RE_Direct_Lambert
#define RE_IndirectDiffuse		RE_IndirectDiffuse_Lambert`,ed=`uniform bool receiveShadow;
uniform vec3 ambientLightColor;
#if defined( USE_LIGHT_PROBES )
	uniform vec3 lightProbe[ 9 ];
#endif
vec3 shGetIrradianceAt( in vec3 normal, in vec3 shCoefficients[ 9 ] ) {
	float x = normal.x, y = normal.y, z = normal.z;
	vec3 result = shCoefficients[ 0 ] * 0.886227;
	result += shCoefficients[ 1 ] * 2.0 * 0.511664 * y;
	result += shCoefficients[ 2 ] * 2.0 * 0.511664 * z;
	result += shCoefficients[ 3 ] * 2.0 * 0.511664 * x;
	result += shCoefficients[ 4 ] * 2.0 * 0.429043 * x * y;
	result += shCoefficients[ 5 ] * 2.0 * 0.429043 * y * z;
	result += shCoefficients[ 6 ] * ( 0.743125 * z * z - 0.247708 );
	result += shCoefficients[ 7 ] * 2.0 * 0.429043 * x * z;
	result += shCoefficients[ 8 ] * 0.429043 * ( x * x - y * y );
	return result;
}
vec3 getLightProbeIrradiance( const in vec3 lightProbe[ 9 ], const in vec3 normal ) {
	vec3 worldNormal = inverseTransformDirection( normal, viewMatrix );
	vec3 irradiance = shGetIrradianceAt( worldNormal, lightProbe );
	return irradiance;
}
vec3 getAmbientLightIrradiance( const in vec3 ambientLightColor ) {
	vec3 irradiance = ambientLightColor;
	return irradiance;
}
float getDistanceAttenuation( const in float lightDistance, const in float cutoffDistance, const in float decayExponent ) {
	float distanceFalloff = 1.0 / max( pow( lightDistance, decayExponent ), 0.01 );
	if ( cutoffDistance > 0.0 ) {
		distanceFalloff *= pow2( saturate( 1.0 - pow4( lightDistance / cutoffDistance ) ) );
	}
	return distanceFalloff;
}
float getSpotAttenuation( const in float coneCosine, const in float penumbraCosine, const in float angleCosine ) {
	return smoothstep( coneCosine, penumbraCosine, angleCosine );
}
#if NUM_DIR_LIGHTS > 0
	struct DirectionalLight {
		vec3 direction;
		vec3 color;
	};
	uniform DirectionalLight directionalLights[ NUM_DIR_LIGHTS ];
	void getDirectionalLightInfo( const in DirectionalLight directionalLight, out IncidentLight light ) {
		light.color = directionalLight.color;
		light.direction = directionalLight.direction;
		light.visible = true;
	}
#endif
#if NUM_POINT_LIGHTS > 0
	struct PointLight {
		vec3 position;
		vec3 color;
		float distance;
		float decay;
	};
	uniform PointLight pointLights[ NUM_POINT_LIGHTS ];
	void getPointLightInfo( const in PointLight pointLight, const in vec3 geometryPosition, out IncidentLight light ) {
		vec3 lVector = pointLight.position - geometryPosition;
		light.direction = normalize( lVector );
		float lightDistance = length( lVector );
		light.color = pointLight.color;
		light.color *= getDistanceAttenuation( lightDistance, pointLight.distance, pointLight.decay );
		light.visible = ( light.color != vec3( 0.0 ) );
	}
#endif
#if NUM_SPOT_LIGHTS > 0
	struct SpotLight {
		vec3 position;
		vec3 direction;
		vec3 color;
		float distance;
		float decay;
		float coneCos;
		float penumbraCos;
	};
	uniform SpotLight spotLights[ NUM_SPOT_LIGHTS ];
	void getSpotLightInfo( const in SpotLight spotLight, const in vec3 geometryPosition, out IncidentLight light ) {
		vec3 lVector = spotLight.position - geometryPosition;
		light.direction = normalize( lVector );
		float angleCos = dot( light.direction, spotLight.direction );
		float spotAttenuation = getSpotAttenuation( spotLight.coneCos, spotLight.penumbraCos, angleCos );
		if ( spotAttenuation > 0.0 ) {
			float lightDistance = length( lVector );
			light.color = spotLight.color * spotAttenuation;
			light.color *= getDistanceAttenuation( lightDistance, spotLight.distance, spotLight.decay );
			light.visible = ( light.color != vec3( 0.0 ) );
		} else {
			light.color = vec3( 0.0 );
			light.visible = false;
		}
	}
#endif
#if NUM_RECT_AREA_LIGHTS > 0
	struct RectAreaLight {
		vec3 color;
		vec3 position;
		vec3 halfWidth;
		vec3 halfHeight;
	};
	uniform sampler2D ltc_1;	uniform sampler2D ltc_2;
	uniform RectAreaLight rectAreaLights[ NUM_RECT_AREA_LIGHTS ];
#endif
#if NUM_HEMI_LIGHTS > 0
	struct HemisphereLight {
		vec3 direction;
		vec3 skyColor;
		vec3 groundColor;
	};
	uniform HemisphereLight hemisphereLights[ NUM_HEMI_LIGHTS ];
	vec3 getHemisphereLightIrradiance( const in HemisphereLight hemiLight, const in vec3 normal ) {
		float dotNL = dot( normal, hemiLight.direction );
		float hemiDiffuseWeight = 0.5 * dotNL + 0.5;
		vec3 irradiance = mix( hemiLight.groundColor, hemiLight.skyColor, hemiDiffuseWeight );
		return irradiance;
	}
#endif`,td=`#ifdef USE_ENVMAP
	vec3 getIBLIrradiance( const in vec3 normal ) {
		#ifdef ENVMAP_TYPE_CUBE_UV
			vec3 worldNormal = inverseTransformDirection( normal, viewMatrix );
			vec4 envMapColor = textureCubeUV( envMap, envMapRotation * worldNormal, 1.0 );
			return PI * envMapColor.rgb * envMapIntensity;
		#else
			return vec3( 0.0 );
		#endif
	}
	vec3 getIBLRadiance( const in vec3 viewDir, const in vec3 normal, const in float roughness ) {
		#ifdef ENVMAP_TYPE_CUBE_UV
			vec3 reflectVec = reflect( - viewDir, normal );
			reflectVec = normalize( mix( reflectVec, normal, roughness * roughness) );
			reflectVec = inverseTransformDirection( reflectVec, viewMatrix );
			vec4 envMapColor = textureCubeUV( envMap, envMapRotation * reflectVec, roughness );
			return envMapColor.rgb * envMapIntensity;
		#else
			return vec3( 0.0 );
		#endif
	}
	#ifdef USE_ANISOTROPY
		vec3 getIBLAnisotropyRadiance( const in vec3 viewDir, const in vec3 normal, const in float roughness, const in vec3 bitangent, const in float anisotropy ) {
			#ifdef ENVMAP_TYPE_CUBE_UV
				vec3 bentNormal = cross( bitangent, viewDir );
				bentNormal = normalize( cross( bentNormal, bitangent ) );
				bentNormal = normalize( mix( bentNormal, normal, pow2( pow2( 1.0 - anisotropy * ( 1.0 - roughness ) ) ) ) );
				return getIBLRadiance( viewDir, bentNormal, roughness );
			#else
				return vec3( 0.0 );
			#endif
		}
	#endif
#endif`,nd=`ToonMaterial material;
material.diffuseColor = diffuseColor.rgb;`,id=`varying vec3 vViewPosition;
struct ToonMaterial {
	vec3 diffuseColor;
};
void RE_Direct_Toon( const in IncidentLight directLight, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in ToonMaterial material, inout ReflectedLight reflectedLight ) {
	vec3 irradiance = getGradientIrradiance( geometryNormal, directLight.direction ) * directLight.color;
	reflectedLight.directDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
void RE_IndirectDiffuse_Toon( const in vec3 irradiance, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in ToonMaterial material, inout ReflectedLight reflectedLight ) {
	reflectedLight.indirectDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
#define RE_Direct				RE_Direct_Toon
#define RE_IndirectDiffuse		RE_IndirectDiffuse_Toon`,rd=`BlinnPhongMaterial material;
material.diffuseColor = diffuseColor.rgb;
material.specularColor = specular;
material.specularShininess = shininess;
material.specularStrength = specularStrength;`,sd=`varying vec3 vViewPosition;
struct BlinnPhongMaterial {
	vec3 diffuseColor;
	vec3 specularColor;
	float specularShininess;
	float specularStrength;
};
void RE_Direct_BlinnPhong( const in IncidentLight directLight, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in BlinnPhongMaterial material, inout ReflectedLight reflectedLight ) {
	float dotNL = saturate( dot( geometryNormal, directLight.direction ) );
	vec3 irradiance = dotNL * directLight.color;
	reflectedLight.directDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
	reflectedLight.directSpecular += irradiance * BRDF_BlinnPhong( directLight.direction, geometryViewDir, geometryNormal, material.specularColor, material.specularShininess ) * material.specularStrength;
}
void RE_IndirectDiffuse_BlinnPhong( const in vec3 irradiance, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in BlinnPhongMaterial material, inout ReflectedLight reflectedLight ) {
	reflectedLight.indirectDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
#define RE_Direct				RE_Direct_BlinnPhong
#define RE_IndirectDiffuse		RE_IndirectDiffuse_BlinnPhong`,ad=`PhysicalMaterial material;
material.diffuseColor = diffuseColor.rgb * ( 1.0 - metalnessFactor );
vec3 dxy = max( abs( dFdx( nonPerturbedNormal ) ), abs( dFdy( nonPerturbedNormal ) ) );
float geometryRoughness = max( max( dxy.x, dxy.y ), dxy.z );
material.roughness = max( roughnessFactor, 0.0525 );material.roughness += geometryRoughness;
material.roughness = min( material.roughness, 1.0 );
#ifdef IOR
	material.ior = ior;
	#ifdef USE_SPECULAR
		float specularIntensityFactor = specularIntensity;
		vec3 specularColorFactor = specularColor;
		#ifdef USE_SPECULAR_COLORMAP
			specularColorFactor *= texture2D( specularColorMap, vSpecularColorMapUv ).rgb;
		#endif
		#ifdef USE_SPECULAR_INTENSITYMAP
			specularIntensityFactor *= texture2D( specularIntensityMap, vSpecularIntensityMapUv ).a;
		#endif
		material.specularF90 = mix( specularIntensityFactor, 1.0, metalnessFactor );
	#else
		float specularIntensityFactor = 1.0;
		vec3 specularColorFactor = vec3( 1.0 );
		material.specularF90 = 1.0;
	#endif
	material.specularColor = mix( min( pow2( ( material.ior - 1.0 ) / ( material.ior + 1.0 ) ) * specularColorFactor, vec3( 1.0 ) ) * specularIntensityFactor, diffuseColor.rgb, metalnessFactor );
#else
	material.specularColor = mix( vec3( 0.04 ), diffuseColor.rgb, metalnessFactor );
	material.specularF90 = 1.0;
#endif
#ifdef USE_CLEARCOAT
	material.clearcoat = clearcoat;
	material.clearcoatRoughness = clearcoatRoughness;
	material.clearcoatF0 = vec3( 0.04 );
	material.clearcoatF90 = 1.0;
	#ifdef USE_CLEARCOATMAP
		material.clearcoat *= texture2D( clearcoatMap, vClearcoatMapUv ).x;
	#endif
	#ifdef USE_CLEARCOAT_ROUGHNESSMAP
		material.clearcoatRoughness *= texture2D( clearcoatRoughnessMap, vClearcoatRoughnessMapUv ).y;
	#endif
	material.clearcoat = saturate( material.clearcoat );	material.clearcoatRoughness = max( material.clearcoatRoughness, 0.0525 );
	material.clearcoatRoughness += geometryRoughness;
	material.clearcoatRoughness = min( material.clearcoatRoughness, 1.0 );
#endif
#ifdef USE_DISPERSION
	material.dispersion = dispersion;
#endif
#ifdef USE_IRIDESCENCE
	material.iridescence = iridescence;
	material.iridescenceIOR = iridescenceIOR;
	#ifdef USE_IRIDESCENCEMAP
		material.iridescence *= texture2D( iridescenceMap, vIridescenceMapUv ).r;
	#endif
	#ifdef USE_IRIDESCENCE_THICKNESSMAP
		material.iridescenceThickness = (iridescenceThicknessMaximum - iridescenceThicknessMinimum) * texture2D( iridescenceThicknessMap, vIridescenceThicknessMapUv ).g + iridescenceThicknessMinimum;
	#else
		material.iridescenceThickness = iridescenceThicknessMaximum;
	#endif
#endif
#ifdef USE_SHEEN
	material.sheenColor = sheenColor;
	#ifdef USE_SHEEN_COLORMAP
		material.sheenColor *= texture2D( sheenColorMap, vSheenColorMapUv ).rgb;
	#endif
	material.sheenRoughness = clamp( sheenRoughness, 0.07, 1.0 );
	#ifdef USE_SHEEN_ROUGHNESSMAP
		material.sheenRoughness *= texture2D( sheenRoughnessMap, vSheenRoughnessMapUv ).a;
	#endif
#endif
#ifdef USE_ANISOTROPY
	#ifdef USE_ANISOTROPYMAP
		mat2 anisotropyMat = mat2( anisotropyVector.x, anisotropyVector.y, - anisotropyVector.y, anisotropyVector.x );
		vec3 anisotropyPolar = texture2D( anisotropyMap, vAnisotropyMapUv ).rgb;
		vec2 anisotropyV = anisotropyMat * normalize( 2.0 * anisotropyPolar.rg - vec2( 1.0 ) ) * anisotropyPolar.b;
	#else
		vec2 anisotropyV = anisotropyVector;
	#endif
	material.anisotropy = length( anisotropyV );
	if( material.anisotropy == 0.0 ) {
		anisotropyV = vec2( 1.0, 0.0 );
	} else {
		anisotropyV /= material.anisotropy;
		material.anisotropy = saturate( material.anisotropy );
	}
	material.alphaT = mix( pow2( material.roughness ), 1.0, pow2( material.anisotropy ) );
	material.anisotropyT = tbn[ 0 ] * anisotropyV.x + tbn[ 1 ] * anisotropyV.y;
	material.anisotropyB = tbn[ 1 ] * anisotropyV.x - tbn[ 0 ] * anisotropyV.y;
#endif`,od=`struct PhysicalMaterial {
	vec3 diffuseColor;
	float roughness;
	vec3 specularColor;
	float specularF90;
	float dispersion;
	#ifdef USE_CLEARCOAT
		float clearcoat;
		float clearcoatRoughness;
		vec3 clearcoatF0;
		float clearcoatF90;
	#endif
	#ifdef USE_IRIDESCENCE
		float iridescence;
		float iridescenceIOR;
		float iridescenceThickness;
		vec3 iridescenceFresnel;
		vec3 iridescenceF0;
	#endif
	#ifdef USE_SHEEN
		vec3 sheenColor;
		float sheenRoughness;
	#endif
	#ifdef IOR
		float ior;
	#endif
	#ifdef USE_TRANSMISSION
		float transmission;
		float transmissionAlpha;
		float thickness;
		float attenuationDistance;
		vec3 attenuationColor;
	#endif
	#ifdef USE_ANISOTROPY
		float anisotropy;
		float alphaT;
		vec3 anisotropyT;
		vec3 anisotropyB;
	#endif
};
vec3 clearcoatSpecularDirect = vec3( 0.0 );
vec3 clearcoatSpecularIndirect = vec3( 0.0 );
vec3 sheenSpecularDirect = vec3( 0.0 );
vec3 sheenSpecularIndirect = vec3(0.0 );
vec3 Schlick_to_F0( const in vec3 f, const in float f90, const in float dotVH ) {
    float x = clamp( 1.0 - dotVH, 0.0, 1.0 );
    float x2 = x * x;
    float x5 = clamp( x * x2 * x2, 0.0, 0.9999 );
    return ( f - vec3( f90 ) * x5 ) / ( 1.0 - x5 );
}
float V_GGX_SmithCorrelated( const in float alpha, const in float dotNL, const in float dotNV ) {
	float a2 = pow2( alpha );
	float gv = dotNL * sqrt( a2 + ( 1.0 - a2 ) * pow2( dotNV ) );
	float gl = dotNV * sqrt( a2 + ( 1.0 - a2 ) * pow2( dotNL ) );
	return 0.5 / max( gv + gl, EPSILON );
}
float D_GGX( const in float alpha, const in float dotNH ) {
	float a2 = pow2( alpha );
	float denom = pow2( dotNH ) * ( a2 - 1.0 ) + 1.0;
	return RECIPROCAL_PI * a2 / pow2( denom );
}
#ifdef USE_ANISOTROPY
	float V_GGX_SmithCorrelated_Anisotropic( const in float alphaT, const in float alphaB, const in float dotTV, const in float dotBV, const in float dotTL, const in float dotBL, const in float dotNV, const in float dotNL ) {
		float gv = dotNL * length( vec3( alphaT * dotTV, alphaB * dotBV, dotNV ) );
		float gl = dotNV * length( vec3( alphaT * dotTL, alphaB * dotBL, dotNL ) );
		float v = 0.5 / ( gv + gl );
		return saturate(v);
	}
	float D_GGX_Anisotropic( const in float alphaT, const in float alphaB, const in float dotNH, const in float dotTH, const in float dotBH ) {
		float a2 = alphaT * alphaB;
		highp vec3 v = vec3( alphaB * dotTH, alphaT * dotBH, a2 * dotNH );
		highp float v2 = dot( v, v );
		float w2 = a2 / v2;
		return RECIPROCAL_PI * a2 * pow2 ( w2 );
	}
#endif
#ifdef USE_CLEARCOAT
	vec3 BRDF_GGX_Clearcoat( const in vec3 lightDir, const in vec3 viewDir, const in vec3 normal, const in PhysicalMaterial material) {
		vec3 f0 = material.clearcoatF0;
		float f90 = material.clearcoatF90;
		float roughness = material.clearcoatRoughness;
		float alpha = pow2( roughness );
		vec3 halfDir = normalize( lightDir + viewDir );
		float dotNL = saturate( dot( normal, lightDir ) );
		float dotNV = saturate( dot( normal, viewDir ) );
		float dotNH = saturate( dot( normal, halfDir ) );
		float dotVH = saturate( dot( viewDir, halfDir ) );
		vec3 F = F_Schlick( f0, f90, dotVH );
		float V = V_GGX_SmithCorrelated( alpha, dotNL, dotNV );
		float D = D_GGX( alpha, dotNH );
		return F * ( V * D );
	}
#endif
vec3 BRDF_GGX( const in vec3 lightDir, const in vec3 viewDir, const in vec3 normal, const in PhysicalMaterial material ) {
	vec3 f0 = material.specularColor;
	float f90 = material.specularF90;
	float roughness = material.roughness;
	float alpha = pow2( roughness );
	vec3 halfDir = normalize( lightDir + viewDir );
	float dotNL = saturate( dot( normal, lightDir ) );
	float dotNV = saturate( dot( normal, viewDir ) );
	float dotNH = saturate( dot( normal, halfDir ) );
	float dotVH = saturate( dot( viewDir, halfDir ) );
	vec3 F = F_Schlick( f0, f90, dotVH );
	#ifdef USE_IRIDESCENCE
		F = mix( F, material.iridescenceFresnel, material.iridescence );
	#endif
	#ifdef USE_ANISOTROPY
		float dotTL = dot( material.anisotropyT, lightDir );
		float dotTV = dot( material.anisotropyT, viewDir );
		float dotTH = dot( material.anisotropyT, halfDir );
		float dotBL = dot( material.anisotropyB, lightDir );
		float dotBV = dot( material.anisotropyB, viewDir );
		float dotBH = dot( material.anisotropyB, halfDir );
		float V = V_GGX_SmithCorrelated_Anisotropic( material.alphaT, alpha, dotTV, dotBV, dotTL, dotBL, dotNV, dotNL );
		float D = D_GGX_Anisotropic( material.alphaT, alpha, dotNH, dotTH, dotBH );
	#else
		float V = V_GGX_SmithCorrelated( alpha, dotNL, dotNV );
		float D = D_GGX( alpha, dotNH );
	#endif
	return F * ( V * D );
}
vec2 LTC_Uv( const in vec3 N, const in vec3 V, const in float roughness ) {
	const float LUT_SIZE = 64.0;
	const float LUT_SCALE = ( LUT_SIZE - 1.0 ) / LUT_SIZE;
	const float LUT_BIAS = 0.5 / LUT_SIZE;
	float dotNV = saturate( dot( N, V ) );
	vec2 uv = vec2( roughness, sqrt( 1.0 - dotNV ) );
	uv = uv * LUT_SCALE + LUT_BIAS;
	return uv;
}
float LTC_ClippedSphereFormFactor( const in vec3 f ) {
	float l = length( f );
	return max( ( l * l + f.z ) / ( l + 1.0 ), 0.0 );
}
vec3 LTC_EdgeVectorFormFactor( const in vec3 v1, const in vec3 v2 ) {
	float x = dot( v1, v2 );
	float y = abs( x );
	float a = 0.8543985 + ( 0.4965155 + 0.0145206 * y ) * y;
	float b = 3.4175940 + ( 4.1616724 + y ) * y;
	float v = a / b;
	float theta_sintheta = ( x > 0.0 ) ? v : 0.5 * inversesqrt( max( 1.0 - x * x, 1e-7 ) ) - v;
	return cross( v1, v2 ) * theta_sintheta;
}
vec3 LTC_Evaluate( const in vec3 N, const in vec3 V, const in vec3 P, const in mat3 mInv, const in vec3 rectCoords[ 4 ] ) {
	vec3 v1 = rectCoords[ 1 ] - rectCoords[ 0 ];
	vec3 v2 = rectCoords[ 3 ] - rectCoords[ 0 ];
	vec3 lightNormal = cross( v1, v2 );
	if( dot( lightNormal, P - rectCoords[ 0 ] ) < 0.0 ) return vec3( 0.0 );
	vec3 T1, T2;
	T1 = normalize( V - N * dot( V, N ) );
	T2 = - cross( N, T1 );
	mat3 mat = mInv * transposeMat3( mat3( T1, T2, N ) );
	vec3 coords[ 4 ];
	coords[ 0 ] = mat * ( rectCoords[ 0 ] - P );
	coords[ 1 ] = mat * ( rectCoords[ 1 ] - P );
	coords[ 2 ] = mat * ( rectCoords[ 2 ] - P );
	coords[ 3 ] = mat * ( rectCoords[ 3 ] - P );
	coords[ 0 ] = normalize( coords[ 0 ] );
	coords[ 1 ] = normalize( coords[ 1 ] );
	coords[ 2 ] = normalize( coords[ 2 ] );
	coords[ 3 ] = normalize( coords[ 3 ] );
	vec3 vectorFormFactor = vec3( 0.0 );
	vectorFormFactor += LTC_EdgeVectorFormFactor( coords[ 0 ], coords[ 1 ] );
	vectorFormFactor += LTC_EdgeVectorFormFactor( coords[ 1 ], coords[ 2 ] );
	vectorFormFactor += LTC_EdgeVectorFormFactor( coords[ 2 ], coords[ 3 ] );
	vectorFormFactor += LTC_EdgeVectorFormFactor( coords[ 3 ], coords[ 0 ] );
	float result = LTC_ClippedSphereFormFactor( vectorFormFactor );
	return vec3( result );
}
#if defined( USE_SHEEN )
float D_Charlie( float roughness, float dotNH ) {
	float alpha = pow2( roughness );
	float invAlpha = 1.0 / alpha;
	float cos2h = dotNH * dotNH;
	float sin2h = max( 1.0 - cos2h, 0.0078125 );
	return ( 2.0 + invAlpha ) * pow( sin2h, invAlpha * 0.5 ) / ( 2.0 * PI );
}
float V_Neubelt( float dotNV, float dotNL ) {
	return saturate( 1.0 / ( 4.0 * ( dotNL + dotNV - dotNL * dotNV ) ) );
}
vec3 BRDF_Sheen( const in vec3 lightDir, const in vec3 viewDir, const in vec3 normal, vec3 sheenColor, const in float sheenRoughness ) {
	vec3 halfDir = normalize( lightDir + viewDir );
	float dotNL = saturate( dot( normal, lightDir ) );
	float dotNV = saturate( dot( normal, viewDir ) );
	float dotNH = saturate( dot( normal, halfDir ) );
	float D = D_Charlie( sheenRoughness, dotNH );
	float V = V_Neubelt( dotNV, dotNL );
	return sheenColor * ( D * V );
}
#endif
float IBLSheenBRDF( const in vec3 normal, const in vec3 viewDir, const in float roughness ) {
	float dotNV = saturate( dot( normal, viewDir ) );
	float r2 = roughness * roughness;
	float a = roughness < 0.25 ? -339.2 * r2 + 161.4 * roughness - 25.9 : -8.48 * r2 + 14.3 * roughness - 9.95;
	float b = roughness < 0.25 ? 44.0 * r2 - 23.7 * roughness + 3.26 : 1.97 * r2 - 3.27 * roughness + 0.72;
	float DG = exp( a * dotNV + b ) + ( roughness < 0.25 ? 0.0 : 0.1 * ( roughness - 0.25 ) );
	return saturate( DG * RECIPROCAL_PI );
}
vec2 DFGApprox( const in vec3 normal, const in vec3 viewDir, const in float roughness ) {
	float dotNV = saturate( dot( normal, viewDir ) );
	const vec4 c0 = vec4( - 1, - 0.0275, - 0.572, 0.022 );
	const vec4 c1 = vec4( 1, 0.0425, 1.04, - 0.04 );
	vec4 r = roughness * c0 + c1;
	float a004 = min( r.x * r.x, exp2( - 9.28 * dotNV ) ) * r.x + r.y;
	vec2 fab = vec2( - 1.04, 1.04 ) * a004 + r.zw;
	return fab;
}
vec3 EnvironmentBRDF( const in vec3 normal, const in vec3 viewDir, const in vec3 specularColor, const in float specularF90, const in float roughness ) {
	vec2 fab = DFGApprox( normal, viewDir, roughness );
	return specularColor * fab.x + specularF90 * fab.y;
}
#ifdef USE_IRIDESCENCE
void computeMultiscatteringIridescence( const in vec3 normal, const in vec3 viewDir, const in vec3 specularColor, const in float specularF90, const in float iridescence, const in vec3 iridescenceF0, const in float roughness, inout vec3 singleScatter, inout vec3 multiScatter ) {
#else
void computeMultiscattering( const in vec3 normal, const in vec3 viewDir, const in vec3 specularColor, const in float specularF90, const in float roughness, inout vec3 singleScatter, inout vec3 multiScatter ) {
#endif
	vec2 fab = DFGApprox( normal, viewDir, roughness );
	#ifdef USE_IRIDESCENCE
		vec3 Fr = mix( specularColor, iridescenceF0, iridescence );
	#else
		vec3 Fr = specularColor;
	#endif
	vec3 FssEss = Fr * fab.x + specularF90 * fab.y;
	float Ess = fab.x + fab.y;
	float Ems = 1.0 - Ess;
	vec3 Favg = Fr + ( 1.0 - Fr ) * 0.047619;	vec3 Fms = FssEss * Favg / ( 1.0 - Ems * Favg );
	singleScatter += FssEss;
	multiScatter += Fms * Ems;
}
#if NUM_RECT_AREA_LIGHTS > 0
	void RE_Direct_RectArea_Physical( const in RectAreaLight rectAreaLight, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in PhysicalMaterial material, inout ReflectedLight reflectedLight ) {
		vec3 normal = geometryNormal;
		vec3 viewDir = geometryViewDir;
		vec3 position = geometryPosition;
		vec3 lightPos = rectAreaLight.position;
		vec3 halfWidth = rectAreaLight.halfWidth;
		vec3 halfHeight = rectAreaLight.halfHeight;
		vec3 lightColor = rectAreaLight.color;
		float roughness = material.roughness;
		vec3 rectCoords[ 4 ];
		rectCoords[ 0 ] = lightPos + halfWidth - halfHeight;		rectCoords[ 1 ] = lightPos - halfWidth - halfHeight;
		rectCoords[ 2 ] = lightPos - halfWidth + halfHeight;
		rectCoords[ 3 ] = lightPos + halfWidth + halfHeight;
		vec2 uv = LTC_Uv( normal, viewDir, roughness );
		vec4 t1 = texture2D( ltc_1, uv );
		vec4 t2 = texture2D( ltc_2, uv );
		mat3 mInv = mat3(
			vec3( t1.x, 0, t1.y ),
			vec3(    0, 1,    0 ),
			vec3( t1.z, 0, t1.w )
		);
		vec3 fresnel = ( material.specularColor * t2.x + ( vec3( 1.0 ) - material.specularColor ) * t2.y );
		reflectedLight.directSpecular += lightColor * fresnel * LTC_Evaluate( normal, viewDir, position, mInv, rectCoords );
		reflectedLight.directDiffuse += lightColor * material.diffuseColor * LTC_Evaluate( normal, viewDir, position, mat3( 1.0 ), rectCoords );
	}
#endif
void RE_Direct_Physical( const in IncidentLight directLight, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in PhysicalMaterial material, inout ReflectedLight reflectedLight ) {
	float dotNL = saturate( dot( geometryNormal, directLight.direction ) );
	vec3 irradiance = dotNL * directLight.color;
	#ifdef USE_CLEARCOAT
		float dotNLcc = saturate( dot( geometryClearcoatNormal, directLight.direction ) );
		vec3 ccIrradiance = dotNLcc * directLight.color;
		clearcoatSpecularDirect += ccIrradiance * BRDF_GGX_Clearcoat( directLight.direction, geometryViewDir, geometryClearcoatNormal, material );
	#endif
	#ifdef USE_SHEEN
		sheenSpecularDirect += irradiance * BRDF_Sheen( directLight.direction, geometryViewDir, geometryNormal, material.sheenColor, material.sheenRoughness );
	#endif
	reflectedLight.directSpecular += irradiance * BRDF_GGX( directLight.direction, geometryViewDir, geometryNormal, material );
	reflectedLight.directDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
void RE_IndirectDiffuse_Physical( const in vec3 irradiance, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in PhysicalMaterial material, inout ReflectedLight reflectedLight ) {
	reflectedLight.indirectDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
void RE_IndirectSpecular_Physical( const in vec3 radiance, const in vec3 irradiance, const in vec3 clearcoatRadiance, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in PhysicalMaterial material, inout ReflectedLight reflectedLight) {
	#ifdef USE_CLEARCOAT
		clearcoatSpecularIndirect += clearcoatRadiance * EnvironmentBRDF( geometryClearcoatNormal, geometryViewDir, material.clearcoatF0, material.clearcoatF90, material.clearcoatRoughness );
	#endif
	#ifdef USE_SHEEN
		sheenSpecularIndirect += irradiance * material.sheenColor * IBLSheenBRDF( geometryNormal, geometryViewDir, material.sheenRoughness );
	#endif
	vec3 singleScattering = vec3( 0.0 );
	vec3 multiScattering = vec3( 0.0 );
	vec3 cosineWeightedIrradiance = irradiance * RECIPROCAL_PI;
	#ifdef USE_IRIDESCENCE
		computeMultiscatteringIridescence( geometryNormal, geometryViewDir, material.specularColor, material.specularF90, material.iridescence, material.iridescenceFresnel, material.roughness, singleScattering, multiScattering );
	#else
		computeMultiscattering( geometryNormal, geometryViewDir, material.specularColor, material.specularF90, material.roughness, singleScattering, multiScattering );
	#endif
	vec3 totalScattering = singleScattering + multiScattering;
	vec3 diffuse = material.diffuseColor * ( 1.0 - max( max( totalScattering.r, totalScattering.g ), totalScattering.b ) );
	reflectedLight.indirectSpecular += radiance * singleScattering;
	reflectedLight.indirectSpecular += multiScattering * cosineWeightedIrradiance;
	reflectedLight.indirectDiffuse += diffuse * cosineWeightedIrradiance;
}
#define RE_Direct				RE_Direct_Physical
#define RE_Direct_RectArea		RE_Direct_RectArea_Physical
#define RE_IndirectDiffuse		RE_IndirectDiffuse_Physical
#define RE_IndirectSpecular		RE_IndirectSpecular_Physical
float computeSpecularOcclusion( const in float dotNV, const in float ambientOcclusion, const in float roughness ) {
	return saturate( pow( dotNV + ambientOcclusion, exp2( - 16.0 * roughness - 1.0 ) ) - 1.0 + ambientOcclusion );
}`,ld=`
vec3 geometryPosition = - vViewPosition;
vec3 geometryNormal = normal;
vec3 geometryViewDir = ( isOrthographic ) ? vec3( 0, 0, 1 ) : normalize( vViewPosition );
vec3 geometryClearcoatNormal = vec3( 0.0 );
#ifdef USE_CLEARCOAT
	geometryClearcoatNormal = clearcoatNormal;
#endif
#ifdef USE_IRIDESCENCE
	float dotNVi = saturate( dot( normal, geometryViewDir ) );
	if ( material.iridescenceThickness == 0.0 ) {
		material.iridescence = 0.0;
	} else {
		material.iridescence = saturate( material.iridescence );
	}
	if ( material.iridescence > 0.0 ) {
		material.iridescenceFresnel = evalIridescence( 1.0, material.iridescenceIOR, dotNVi, material.iridescenceThickness, material.specularColor );
		material.iridescenceF0 = Schlick_to_F0( material.iridescenceFresnel, 1.0, dotNVi );
	}
#endif
IncidentLight directLight;
#if ( NUM_POINT_LIGHTS > 0 ) && defined( RE_Direct )
	PointLight pointLight;
	#if defined( USE_SHADOWMAP ) && NUM_POINT_LIGHT_SHADOWS > 0
	PointLightShadow pointLightShadow;
	#endif
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_POINT_LIGHTS; i ++ ) {
		pointLight = pointLights[ i ];
		getPointLightInfo( pointLight, geometryPosition, directLight );
		#if defined( USE_SHADOWMAP ) && ( UNROLLED_LOOP_INDEX < NUM_POINT_LIGHT_SHADOWS )
		pointLightShadow = pointLightShadows[ i ];
		directLight.color *= ( directLight.visible && receiveShadow ) ? getPointShadow( pointShadowMap[ i ], pointLightShadow.shadowMapSize, pointLightShadow.shadowIntensity, pointLightShadow.shadowBias, pointLightShadow.shadowRadius, vPointShadowCoord[ i ], pointLightShadow.shadowCameraNear, pointLightShadow.shadowCameraFar ) : 1.0;
		#endif
		RE_Direct( directLight, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
	}
	#pragma unroll_loop_end
#endif
#if ( NUM_SPOT_LIGHTS > 0 ) && defined( RE_Direct )
	SpotLight spotLight;
	vec4 spotColor;
	vec3 spotLightCoord;
	bool inSpotLightMap;
	#if defined( USE_SHADOWMAP ) && NUM_SPOT_LIGHT_SHADOWS > 0
	SpotLightShadow spotLightShadow;
	#endif
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_SPOT_LIGHTS; i ++ ) {
		spotLight = spotLights[ i ];
		getSpotLightInfo( spotLight, geometryPosition, directLight );
		#if ( UNROLLED_LOOP_INDEX < NUM_SPOT_LIGHT_SHADOWS_WITH_MAPS )
		#define SPOT_LIGHT_MAP_INDEX UNROLLED_LOOP_INDEX
		#elif ( UNROLLED_LOOP_INDEX < NUM_SPOT_LIGHT_SHADOWS )
		#define SPOT_LIGHT_MAP_INDEX NUM_SPOT_LIGHT_MAPS
		#else
		#define SPOT_LIGHT_MAP_INDEX ( UNROLLED_LOOP_INDEX - NUM_SPOT_LIGHT_SHADOWS + NUM_SPOT_LIGHT_SHADOWS_WITH_MAPS )
		#endif
		#if ( SPOT_LIGHT_MAP_INDEX < NUM_SPOT_LIGHT_MAPS )
			spotLightCoord = vSpotLightCoord[ i ].xyz / vSpotLightCoord[ i ].w;
			inSpotLightMap = all( lessThan( abs( spotLightCoord * 2. - 1. ), vec3( 1.0 ) ) );
			spotColor = texture2D( spotLightMap[ SPOT_LIGHT_MAP_INDEX ], spotLightCoord.xy );
			directLight.color = inSpotLightMap ? directLight.color * spotColor.rgb : directLight.color;
		#endif
		#undef SPOT_LIGHT_MAP_INDEX
		#if defined( USE_SHADOWMAP ) && ( UNROLLED_LOOP_INDEX < NUM_SPOT_LIGHT_SHADOWS )
		spotLightShadow = spotLightShadows[ i ];
		directLight.color *= ( directLight.visible && receiveShadow ) ? getShadow( spotShadowMap[ i ], spotLightShadow.shadowMapSize, spotLightShadow.shadowIntensity, spotLightShadow.shadowBias, spotLightShadow.shadowRadius, vSpotLightCoord[ i ] ) : 1.0;
		#endif
		RE_Direct( directLight, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
	}
	#pragma unroll_loop_end
#endif
#if ( NUM_DIR_LIGHTS > 0 ) && defined( RE_Direct )
	DirectionalLight directionalLight;
	#if defined( USE_SHADOWMAP ) && NUM_DIR_LIGHT_SHADOWS > 0
	DirectionalLightShadow directionalLightShadow;
	#endif
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_DIR_LIGHTS; i ++ ) {
		directionalLight = directionalLights[ i ];
		getDirectionalLightInfo( directionalLight, directLight );
		#if defined( USE_SHADOWMAP ) && ( UNROLLED_LOOP_INDEX < NUM_DIR_LIGHT_SHADOWS )
		directionalLightShadow = directionalLightShadows[ i ];
		directLight.color *= ( directLight.visible && receiveShadow ) ? getShadow( directionalShadowMap[ i ], directionalLightShadow.shadowMapSize, directionalLightShadow.shadowIntensity, directionalLightShadow.shadowBias, directionalLightShadow.shadowRadius, vDirectionalShadowCoord[ i ] ) : 1.0;
		#endif
		RE_Direct( directLight, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
	}
	#pragma unroll_loop_end
#endif
#if ( NUM_RECT_AREA_LIGHTS > 0 ) && defined( RE_Direct_RectArea )
	RectAreaLight rectAreaLight;
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_RECT_AREA_LIGHTS; i ++ ) {
		rectAreaLight = rectAreaLights[ i ];
		RE_Direct_RectArea( rectAreaLight, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
	}
	#pragma unroll_loop_end
#endif
#if defined( RE_IndirectDiffuse )
	vec3 iblIrradiance = vec3( 0.0 );
	vec3 irradiance = getAmbientLightIrradiance( ambientLightColor );
	#if defined( USE_LIGHT_PROBES )
		irradiance += getLightProbeIrradiance( lightProbe, geometryNormal );
	#endif
	#if ( NUM_HEMI_LIGHTS > 0 )
		#pragma unroll_loop_start
		for ( int i = 0; i < NUM_HEMI_LIGHTS; i ++ ) {
			irradiance += getHemisphereLightIrradiance( hemisphereLights[ i ], geometryNormal );
		}
		#pragma unroll_loop_end
	#endif
#endif
#if defined( RE_IndirectSpecular )
	vec3 radiance = vec3( 0.0 );
	vec3 clearcoatRadiance = vec3( 0.0 );
#endif`,cd=`#if defined( RE_IndirectDiffuse )
	#ifdef USE_LIGHTMAP
		vec4 lightMapTexel = texture2D( lightMap, vLightMapUv );
		vec3 lightMapIrradiance = lightMapTexel.rgb * lightMapIntensity;
		irradiance += lightMapIrradiance;
	#endif
	#if defined( USE_ENVMAP ) && defined( STANDARD ) && defined( ENVMAP_TYPE_CUBE_UV )
		iblIrradiance += getIBLIrradiance( geometryNormal );
	#endif
#endif
#if defined( USE_ENVMAP ) && defined( RE_IndirectSpecular )
	#ifdef USE_ANISOTROPY
		radiance += getIBLAnisotropyRadiance( geometryViewDir, geometryNormal, material.roughness, material.anisotropyB, material.anisotropy );
	#else
		radiance += getIBLRadiance( geometryViewDir, geometryNormal, material.roughness );
	#endif
	#ifdef USE_CLEARCOAT
		clearcoatRadiance += getIBLRadiance( geometryViewDir, geometryClearcoatNormal, material.clearcoatRoughness );
	#endif
#endif`,ud=`#if defined( RE_IndirectDiffuse )
	RE_IndirectDiffuse( irradiance, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
#endif
#if defined( RE_IndirectSpecular )
	RE_IndirectSpecular( radiance, iblIrradiance, clearcoatRadiance, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
#endif`,hd=`#if defined( USE_LOGDEPTHBUF )
	gl_FragDepth = vIsPerspective == 0.0 ? gl_FragCoord.z : log2( vFragDepth ) * logDepthBufFC * 0.5;
#endif`,fd=`#if defined( USE_LOGDEPTHBUF )
	uniform float logDepthBufFC;
	varying float vFragDepth;
	varying float vIsPerspective;
#endif`,dd=`#ifdef USE_LOGDEPTHBUF
	varying float vFragDepth;
	varying float vIsPerspective;
#endif`,pd=`#ifdef USE_LOGDEPTHBUF
	vFragDepth = 1.0 + gl_Position.w;
	vIsPerspective = float( isPerspectiveMatrix( projectionMatrix ) );
#endif`,md=`#ifdef USE_MAP
	vec4 sampledDiffuseColor = texture2D( map, vMapUv );
	#ifdef DECODE_VIDEO_TEXTURE
		sampledDiffuseColor = sRGBTransferEOTF( sampledDiffuseColor );
	#endif
	diffuseColor *= sampledDiffuseColor;
#endif`,_d=`#ifdef USE_MAP
	uniform sampler2D map;
#endif`,gd=`#if defined( USE_MAP ) || defined( USE_ALPHAMAP )
	#if defined( USE_POINTS_UV )
		vec2 uv = vUv;
	#else
		vec2 uv = ( uvTransform * vec3( gl_PointCoord.x, 1.0 - gl_PointCoord.y, 1 ) ).xy;
	#endif
#endif
#ifdef USE_MAP
	diffuseColor *= texture2D( map, uv );
#endif
#ifdef USE_ALPHAMAP
	diffuseColor.a *= texture2D( alphaMap, uv ).g;
#endif`,vd=`#if defined( USE_POINTS_UV )
	varying vec2 vUv;
#else
	#if defined( USE_MAP ) || defined( USE_ALPHAMAP )
		uniform mat3 uvTransform;
	#endif
#endif
#ifdef USE_MAP
	uniform sampler2D map;
#endif
#ifdef USE_ALPHAMAP
	uniform sampler2D alphaMap;
#endif`,xd=`float metalnessFactor = metalness;
#ifdef USE_METALNESSMAP
	vec4 texelMetalness = texture2D( metalnessMap, vMetalnessMapUv );
	metalnessFactor *= texelMetalness.b;
#endif`,Md=`#ifdef USE_METALNESSMAP
	uniform sampler2D metalnessMap;
#endif`,Sd=`#ifdef USE_INSTANCING_MORPH
	float morphTargetInfluences[ MORPHTARGETS_COUNT ];
	float morphTargetBaseInfluence = texelFetch( morphTexture, ivec2( 0, gl_InstanceID ), 0 ).r;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		morphTargetInfluences[i] =  texelFetch( morphTexture, ivec2( i + 1, gl_InstanceID ), 0 ).r;
	}
#endif`,Ed=`#if defined( USE_MORPHCOLORS )
	vColor *= morphTargetBaseInfluence;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		#if defined( USE_COLOR_ALPHA )
			if ( morphTargetInfluences[ i ] != 0.0 ) vColor += getMorph( gl_VertexID, i, 2 ) * morphTargetInfluences[ i ];
		#elif defined( USE_COLOR )
			if ( morphTargetInfluences[ i ] != 0.0 ) vColor += getMorph( gl_VertexID, i, 2 ).rgb * morphTargetInfluences[ i ];
		#endif
	}
#endif`,yd=`#ifdef USE_MORPHNORMALS
	objectNormal *= morphTargetBaseInfluence;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		if ( morphTargetInfluences[ i ] != 0.0 ) objectNormal += getMorph( gl_VertexID, i, 1 ).xyz * morphTargetInfluences[ i ];
	}
#endif`,Td=`#ifdef USE_MORPHTARGETS
	#ifndef USE_INSTANCING_MORPH
		uniform float morphTargetBaseInfluence;
		uniform float morphTargetInfluences[ MORPHTARGETS_COUNT ];
	#endif
	uniform sampler2DArray morphTargetsTexture;
	uniform ivec2 morphTargetsTextureSize;
	vec4 getMorph( const in int vertexIndex, const in int morphTargetIndex, const in int offset ) {
		int texelIndex = vertexIndex * MORPHTARGETS_TEXTURE_STRIDE + offset;
		int y = texelIndex / morphTargetsTextureSize.x;
		int x = texelIndex - y * morphTargetsTextureSize.x;
		ivec3 morphUV = ivec3( x, y, morphTargetIndex );
		return texelFetch( morphTargetsTexture, morphUV, 0 );
	}
#endif`,bd=`#ifdef USE_MORPHTARGETS
	transformed *= morphTargetBaseInfluence;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		if ( morphTargetInfluences[ i ] != 0.0 ) transformed += getMorph( gl_VertexID, i, 0 ).xyz * morphTargetInfluences[ i ];
	}
#endif`,Ad=`float faceDirection = gl_FrontFacing ? 1.0 : - 1.0;
#ifdef FLAT_SHADED
	vec3 fdx = dFdx( vViewPosition );
	vec3 fdy = dFdy( vViewPosition );
	vec3 normal = normalize( cross( fdx, fdy ) );
#else
	vec3 normal = normalize( vNormal );
	#ifdef DOUBLE_SIDED
		normal *= faceDirection;
	#endif
#endif
#if defined( USE_NORMALMAP_TANGENTSPACE ) || defined( USE_CLEARCOAT_NORMALMAP ) || defined( USE_ANISOTROPY )
	#ifdef USE_TANGENT
		mat3 tbn = mat3( normalize( vTangent ), normalize( vBitangent ), normal );
	#else
		mat3 tbn = getTangentFrame( - vViewPosition, normal,
		#if defined( USE_NORMALMAP )
			vNormalMapUv
		#elif defined( USE_CLEARCOAT_NORMALMAP )
			vClearcoatNormalMapUv
		#else
			vUv
		#endif
		);
	#endif
	#if defined( DOUBLE_SIDED ) && ! defined( FLAT_SHADED )
		tbn[0] *= faceDirection;
		tbn[1] *= faceDirection;
	#endif
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	#ifdef USE_TANGENT
		mat3 tbn2 = mat3( normalize( vTangent ), normalize( vBitangent ), normal );
	#else
		mat3 tbn2 = getTangentFrame( - vViewPosition, normal, vClearcoatNormalMapUv );
	#endif
	#if defined( DOUBLE_SIDED ) && ! defined( FLAT_SHADED )
		tbn2[0] *= faceDirection;
		tbn2[1] *= faceDirection;
	#endif
#endif
vec3 nonPerturbedNormal = normal;`,wd=`#ifdef USE_NORMALMAP_OBJECTSPACE
	normal = texture2D( normalMap, vNormalMapUv ).xyz * 2.0 - 1.0;
	#ifdef FLIP_SIDED
		normal = - normal;
	#endif
	#ifdef DOUBLE_SIDED
		normal = normal * faceDirection;
	#endif
	normal = normalize( normalMatrix * normal );
#elif defined( USE_NORMALMAP_TANGENTSPACE )
	vec3 mapN = texture2D( normalMap, vNormalMapUv ).xyz * 2.0 - 1.0;
	mapN.xy *= normalScale;
	normal = normalize( tbn * mapN );
#elif defined( USE_BUMPMAP )
	normal = perturbNormalArb( - vViewPosition, normal, dHdxy_fwd(), faceDirection );
#endif`,Rd=`#ifndef FLAT_SHADED
	varying vec3 vNormal;
	#ifdef USE_TANGENT
		varying vec3 vTangent;
		varying vec3 vBitangent;
	#endif
#endif`,Cd=`#ifndef FLAT_SHADED
	varying vec3 vNormal;
	#ifdef USE_TANGENT
		varying vec3 vTangent;
		varying vec3 vBitangent;
	#endif
#endif`,Pd=`#ifndef FLAT_SHADED
	vNormal = normalize( transformedNormal );
	#ifdef USE_TANGENT
		vTangent = normalize( transformedTangent );
		vBitangent = normalize( cross( vNormal, vTangent ) * tangent.w );
	#endif
#endif`,Dd=`#ifdef USE_NORMALMAP
	uniform sampler2D normalMap;
	uniform vec2 normalScale;
#endif
#ifdef USE_NORMALMAP_OBJECTSPACE
	uniform mat3 normalMatrix;
#endif
#if ! defined ( USE_TANGENT ) && ( defined ( USE_NORMALMAP_TANGENTSPACE ) || defined ( USE_CLEARCOAT_NORMALMAP ) || defined( USE_ANISOTROPY ) )
	mat3 getTangentFrame( vec3 eye_pos, vec3 surf_norm, vec2 uv ) {
		vec3 q0 = dFdx( eye_pos.xyz );
		vec3 q1 = dFdy( eye_pos.xyz );
		vec2 st0 = dFdx( uv.st );
		vec2 st1 = dFdy( uv.st );
		vec3 N = surf_norm;
		vec3 q1perp = cross( q1, N );
		vec3 q0perp = cross( N, q0 );
		vec3 T = q1perp * st0.x + q0perp * st1.x;
		vec3 B = q1perp * st0.y + q0perp * st1.y;
		float det = max( dot( T, T ), dot( B, B ) );
		float scale = ( det == 0.0 ) ? 0.0 : inversesqrt( det );
		return mat3( T * scale, B * scale, N );
	}
#endif`,Ld=`#ifdef USE_CLEARCOAT
	vec3 clearcoatNormal = nonPerturbedNormal;
#endif`,Ud=`#ifdef USE_CLEARCOAT_NORMALMAP
	vec3 clearcoatMapN = texture2D( clearcoatNormalMap, vClearcoatNormalMapUv ).xyz * 2.0 - 1.0;
	clearcoatMapN.xy *= clearcoatNormalScale;
	clearcoatNormal = normalize( tbn2 * clearcoatMapN );
#endif`,Id=`#ifdef USE_CLEARCOATMAP
	uniform sampler2D clearcoatMap;
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	uniform sampler2D clearcoatNormalMap;
	uniform vec2 clearcoatNormalScale;
#endif
#ifdef USE_CLEARCOAT_ROUGHNESSMAP
	uniform sampler2D clearcoatRoughnessMap;
#endif`,Nd=`#ifdef USE_IRIDESCENCEMAP
	uniform sampler2D iridescenceMap;
#endif
#ifdef USE_IRIDESCENCE_THICKNESSMAP
	uniform sampler2D iridescenceThicknessMap;
#endif`,Fd=`#ifdef OPAQUE
diffuseColor.a = 1.0;
#endif
#ifdef USE_TRANSMISSION
diffuseColor.a *= material.transmissionAlpha;
#endif
gl_FragColor = vec4( outgoingLight, diffuseColor.a );`,Od=`vec3 packNormalToRGB( const in vec3 normal ) {
	return normalize( normal ) * 0.5 + 0.5;
}
vec3 unpackRGBToNormal( const in vec3 rgb ) {
	return 2.0 * rgb.xyz - 1.0;
}
const float PackUpscale = 256. / 255.;const float UnpackDownscale = 255. / 256.;const float ShiftRight8 = 1. / 256.;
const float Inv255 = 1. / 255.;
const vec4 PackFactors = vec4( 1.0, 256.0, 256.0 * 256.0, 256.0 * 256.0 * 256.0 );
const vec2 UnpackFactors2 = vec2( UnpackDownscale, 1.0 / PackFactors.g );
const vec3 UnpackFactors3 = vec3( UnpackDownscale / PackFactors.rg, 1.0 / PackFactors.b );
const vec4 UnpackFactors4 = vec4( UnpackDownscale / PackFactors.rgb, 1.0 / PackFactors.a );
vec4 packDepthToRGBA( const in float v ) {
	if( v <= 0.0 )
		return vec4( 0., 0., 0., 0. );
	if( v >= 1.0 )
		return vec4( 1., 1., 1., 1. );
	float vuf;
	float af = modf( v * PackFactors.a, vuf );
	float bf = modf( vuf * ShiftRight8, vuf );
	float gf = modf( vuf * ShiftRight8, vuf );
	return vec4( vuf * Inv255, gf * PackUpscale, bf * PackUpscale, af );
}
vec3 packDepthToRGB( const in float v ) {
	if( v <= 0.0 )
		return vec3( 0., 0., 0. );
	if( v >= 1.0 )
		return vec3( 1., 1., 1. );
	float vuf;
	float bf = modf( v * PackFactors.b, vuf );
	float gf = modf( vuf * ShiftRight8, vuf );
	return vec3( vuf * Inv255, gf * PackUpscale, bf );
}
vec2 packDepthToRG( const in float v ) {
	if( v <= 0.0 )
		return vec2( 0., 0. );
	if( v >= 1.0 )
		return vec2( 1., 1. );
	float vuf;
	float gf = modf( v * 256., vuf );
	return vec2( vuf * Inv255, gf );
}
float unpackRGBAToDepth( const in vec4 v ) {
	return dot( v, UnpackFactors4 );
}
float unpackRGBToDepth( const in vec3 v ) {
	return dot( v, UnpackFactors3 );
}
float unpackRGToDepth( const in vec2 v ) {
	return v.r * UnpackFactors2.r + v.g * UnpackFactors2.g;
}
vec4 pack2HalfToRGBA( const in vec2 v ) {
	vec4 r = vec4( v.x, fract( v.x * 255.0 ), v.y, fract( v.y * 255.0 ) );
	return vec4( r.x - r.y / 255.0, r.y, r.z - r.w / 255.0, r.w );
}
vec2 unpackRGBATo2Half( const in vec4 v ) {
	return vec2( v.x + ( v.y / 255.0 ), v.z + ( v.w / 255.0 ) );
}
float viewZToOrthographicDepth( const in float viewZ, const in float near, const in float far ) {
	return ( viewZ + near ) / ( near - far );
}
float orthographicDepthToViewZ( const in float depth, const in float near, const in float far ) {
	return depth * ( near - far ) - near;
}
float viewZToPerspectiveDepth( const in float viewZ, const in float near, const in float far ) {
	return ( ( near + viewZ ) * far ) / ( ( far - near ) * viewZ );
}
float perspectiveDepthToViewZ( const in float depth, const in float near, const in float far ) {
	return ( near * far ) / ( ( far - near ) * depth - far );
}`,Bd=`#ifdef PREMULTIPLIED_ALPHA
	gl_FragColor.rgb *= gl_FragColor.a;
#endif`,zd=`vec4 mvPosition = vec4( transformed, 1.0 );
#ifdef USE_BATCHING
	mvPosition = batchingMatrix * mvPosition;
#endif
#ifdef USE_INSTANCING
	mvPosition = instanceMatrix * mvPosition;
#endif
mvPosition = modelViewMatrix * mvPosition;
gl_Position = projectionMatrix * mvPosition;`,Hd=`#ifdef DITHERING
	gl_FragColor.rgb = dithering( gl_FragColor.rgb );
#endif`,Vd=`#ifdef DITHERING
	vec3 dithering( vec3 color ) {
		float grid_position = rand( gl_FragCoord.xy );
		vec3 dither_shift_RGB = vec3( 0.25 / 255.0, -0.25 / 255.0, 0.25 / 255.0 );
		dither_shift_RGB = mix( 2.0 * dither_shift_RGB, -2.0 * dither_shift_RGB, grid_position );
		return color + dither_shift_RGB;
	}
#endif`,Gd=`float roughnessFactor = roughness;
#ifdef USE_ROUGHNESSMAP
	vec4 texelRoughness = texture2D( roughnessMap, vRoughnessMapUv );
	roughnessFactor *= texelRoughness.g;
#endif`,kd=`#ifdef USE_ROUGHNESSMAP
	uniform sampler2D roughnessMap;
#endif`,Wd=`#if NUM_SPOT_LIGHT_COORDS > 0
	varying vec4 vSpotLightCoord[ NUM_SPOT_LIGHT_COORDS ];
#endif
#if NUM_SPOT_LIGHT_MAPS > 0
	uniform sampler2D spotLightMap[ NUM_SPOT_LIGHT_MAPS ];
#endif
#ifdef USE_SHADOWMAP
	#if NUM_DIR_LIGHT_SHADOWS > 0
		uniform sampler2D directionalShadowMap[ NUM_DIR_LIGHT_SHADOWS ];
		varying vec4 vDirectionalShadowCoord[ NUM_DIR_LIGHT_SHADOWS ];
		struct DirectionalLightShadow {
			float shadowIntensity;
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
		};
		uniform DirectionalLightShadow directionalLightShadows[ NUM_DIR_LIGHT_SHADOWS ];
	#endif
	#if NUM_SPOT_LIGHT_SHADOWS > 0
		uniform sampler2D spotShadowMap[ NUM_SPOT_LIGHT_SHADOWS ];
		struct SpotLightShadow {
			float shadowIntensity;
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
		};
		uniform SpotLightShadow spotLightShadows[ NUM_SPOT_LIGHT_SHADOWS ];
	#endif
	#if NUM_POINT_LIGHT_SHADOWS > 0
		uniform sampler2D pointShadowMap[ NUM_POINT_LIGHT_SHADOWS ];
		varying vec4 vPointShadowCoord[ NUM_POINT_LIGHT_SHADOWS ];
		struct PointLightShadow {
			float shadowIntensity;
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
			float shadowCameraNear;
			float shadowCameraFar;
		};
		uniform PointLightShadow pointLightShadows[ NUM_POINT_LIGHT_SHADOWS ];
	#endif
	float texture2DCompare( sampler2D depths, vec2 uv, float compare ) {
		return step( compare, unpackRGBAToDepth( texture2D( depths, uv ) ) );
	}
	vec2 texture2DDistribution( sampler2D shadow, vec2 uv ) {
		return unpackRGBATo2Half( texture2D( shadow, uv ) );
	}
	float VSMShadow (sampler2D shadow, vec2 uv, float compare ){
		float occlusion = 1.0;
		vec2 distribution = texture2DDistribution( shadow, uv );
		float hard_shadow = step( compare , distribution.x );
		if (hard_shadow != 1.0 ) {
			float distance = compare - distribution.x ;
			float variance = max( 0.00000, distribution.y * distribution.y );
			float softness_probability = variance / (variance + distance * distance );			softness_probability = clamp( ( softness_probability - 0.3 ) / ( 0.95 - 0.3 ), 0.0, 1.0 );			occlusion = clamp( max( hard_shadow, softness_probability ), 0.0, 1.0 );
		}
		return occlusion;
	}
	float getShadow( sampler2D shadowMap, vec2 shadowMapSize, float shadowIntensity, float shadowBias, float shadowRadius, vec4 shadowCoord ) {
		float shadow = 1.0;
		shadowCoord.xyz /= shadowCoord.w;
		shadowCoord.z += shadowBias;
		bool inFrustum = shadowCoord.x >= 0.0 && shadowCoord.x <= 1.0 && shadowCoord.y >= 0.0 && shadowCoord.y <= 1.0;
		bool frustumTest = inFrustum && shadowCoord.z <= 1.0;
		if ( frustumTest ) {
		#if defined( SHADOWMAP_TYPE_PCF )
			vec2 texelSize = vec2( 1.0 ) / shadowMapSize;
			float dx0 = - texelSize.x * shadowRadius;
			float dy0 = - texelSize.y * shadowRadius;
			float dx1 = + texelSize.x * shadowRadius;
			float dy1 = + texelSize.y * shadowRadius;
			float dx2 = dx0 / 2.0;
			float dy2 = dy0 / 2.0;
			float dx3 = dx1 / 2.0;
			float dy3 = dy1 / 2.0;
			shadow = (
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx0, dy0 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( 0.0, dy0 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx1, dy0 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx2, dy2 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( 0.0, dy2 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx3, dy2 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx0, 0.0 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx2, 0.0 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy, shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx3, 0.0 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx1, 0.0 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx2, dy3 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( 0.0, dy3 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx3, dy3 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx0, dy1 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( 0.0, dy1 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx1, dy1 ), shadowCoord.z )
			) * ( 1.0 / 17.0 );
		#elif defined( SHADOWMAP_TYPE_PCF_SOFT )
			vec2 texelSize = vec2( 1.0 ) / shadowMapSize;
			float dx = texelSize.x;
			float dy = texelSize.y;
			vec2 uv = shadowCoord.xy;
			vec2 f = fract( uv * shadowMapSize + 0.5 );
			uv -= f * texelSize;
			shadow = (
				texture2DCompare( shadowMap, uv, shadowCoord.z ) +
				texture2DCompare( shadowMap, uv + vec2( dx, 0.0 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, uv + vec2( 0.0, dy ), shadowCoord.z ) +
				texture2DCompare( shadowMap, uv + texelSize, shadowCoord.z ) +
				mix( texture2DCompare( shadowMap, uv + vec2( -dx, 0.0 ), shadowCoord.z ),
					 texture2DCompare( shadowMap, uv + vec2( 2.0 * dx, 0.0 ), shadowCoord.z ),
					 f.x ) +
				mix( texture2DCompare( shadowMap, uv + vec2( -dx, dy ), shadowCoord.z ),
					 texture2DCompare( shadowMap, uv + vec2( 2.0 * dx, dy ), shadowCoord.z ),
					 f.x ) +
				mix( texture2DCompare( shadowMap, uv + vec2( 0.0, -dy ), shadowCoord.z ),
					 texture2DCompare( shadowMap, uv + vec2( 0.0, 2.0 * dy ), shadowCoord.z ),
					 f.y ) +
				mix( texture2DCompare( shadowMap, uv + vec2( dx, -dy ), shadowCoord.z ),
					 texture2DCompare( shadowMap, uv + vec2( dx, 2.0 * dy ), shadowCoord.z ),
					 f.y ) +
				mix( mix( texture2DCompare( shadowMap, uv + vec2( -dx, -dy ), shadowCoord.z ),
						  texture2DCompare( shadowMap, uv + vec2( 2.0 * dx, -dy ), shadowCoord.z ),
						  f.x ),
					 mix( texture2DCompare( shadowMap, uv + vec2( -dx, 2.0 * dy ), shadowCoord.z ),
						  texture2DCompare( shadowMap, uv + vec2( 2.0 * dx, 2.0 * dy ), shadowCoord.z ),
						  f.x ),
					 f.y )
			) * ( 1.0 / 9.0 );
		#elif defined( SHADOWMAP_TYPE_VSM )
			shadow = VSMShadow( shadowMap, shadowCoord.xy, shadowCoord.z );
		#else
			shadow = texture2DCompare( shadowMap, shadowCoord.xy, shadowCoord.z );
		#endif
		}
		return mix( 1.0, shadow, shadowIntensity );
	}
	vec2 cubeToUV( vec3 v, float texelSizeY ) {
		vec3 absV = abs( v );
		float scaleToCube = 1.0 / max( absV.x, max( absV.y, absV.z ) );
		absV *= scaleToCube;
		v *= scaleToCube * ( 1.0 - 2.0 * texelSizeY );
		vec2 planar = v.xy;
		float almostATexel = 1.5 * texelSizeY;
		float almostOne = 1.0 - almostATexel;
		if ( absV.z >= almostOne ) {
			if ( v.z > 0.0 )
				planar.x = 4.0 - v.x;
		} else if ( absV.x >= almostOne ) {
			float signX = sign( v.x );
			planar.x = v.z * signX + 2.0 * signX;
		} else if ( absV.y >= almostOne ) {
			float signY = sign( v.y );
			planar.x = v.x + 2.0 * signY + 2.0;
			planar.y = v.z * signY - 2.0;
		}
		return vec2( 0.125, 0.25 ) * planar + vec2( 0.375, 0.75 );
	}
	float getPointShadow( sampler2D shadowMap, vec2 shadowMapSize, float shadowIntensity, float shadowBias, float shadowRadius, vec4 shadowCoord, float shadowCameraNear, float shadowCameraFar ) {
		float shadow = 1.0;
		vec3 lightToPosition = shadowCoord.xyz;
		
		float lightToPositionLength = length( lightToPosition );
		if ( lightToPositionLength - shadowCameraFar <= 0.0 && lightToPositionLength - shadowCameraNear >= 0.0 ) {
			float dp = ( lightToPositionLength - shadowCameraNear ) / ( shadowCameraFar - shadowCameraNear );			dp += shadowBias;
			vec3 bd3D = normalize( lightToPosition );
			vec2 texelSize = vec2( 1.0 ) / ( shadowMapSize * vec2( 4.0, 2.0 ) );
			#if defined( SHADOWMAP_TYPE_PCF ) || defined( SHADOWMAP_TYPE_PCF_SOFT ) || defined( SHADOWMAP_TYPE_VSM )
				vec2 offset = vec2( - 1, 1 ) * shadowRadius * texelSize.y;
				shadow = (
					texture2DCompare( shadowMap, cubeToUV( bd3D + offset.xyy, texelSize.y ), dp ) +
					texture2DCompare( shadowMap, cubeToUV( bd3D + offset.yyy, texelSize.y ), dp ) +
					texture2DCompare( shadowMap, cubeToUV( bd3D + offset.xyx, texelSize.y ), dp ) +
					texture2DCompare( shadowMap, cubeToUV( bd3D + offset.yyx, texelSize.y ), dp ) +
					texture2DCompare( shadowMap, cubeToUV( bd3D, texelSize.y ), dp ) +
					texture2DCompare( shadowMap, cubeToUV( bd3D + offset.xxy, texelSize.y ), dp ) +
					texture2DCompare( shadowMap, cubeToUV( bd3D + offset.yxy, texelSize.y ), dp ) +
					texture2DCompare( shadowMap, cubeToUV( bd3D + offset.xxx, texelSize.y ), dp ) +
					texture2DCompare( shadowMap, cubeToUV( bd3D + offset.yxx, texelSize.y ), dp )
				) * ( 1.0 / 9.0 );
			#else
				shadow = texture2DCompare( shadowMap, cubeToUV( bd3D, texelSize.y ), dp );
			#endif
		}
		return mix( 1.0, shadow, shadowIntensity );
	}
#endif`,Xd=`#if NUM_SPOT_LIGHT_COORDS > 0
	uniform mat4 spotLightMatrix[ NUM_SPOT_LIGHT_COORDS ];
	varying vec4 vSpotLightCoord[ NUM_SPOT_LIGHT_COORDS ];
#endif
#ifdef USE_SHADOWMAP
	#if NUM_DIR_LIGHT_SHADOWS > 0
		uniform mat4 directionalShadowMatrix[ NUM_DIR_LIGHT_SHADOWS ];
		varying vec4 vDirectionalShadowCoord[ NUM_DIR_LIGHT_SHADOWS ];
		struct DirectionalLightShadow {
			float shadowIntensity;
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
		};
		uniform DirectionalLightShadow directionalLightShadows[ NUM_DIR_LIGHT_SHADOWS ];
	#endif
	#if NUM_SPOT_LIGHT_SHADOWS > 0
		struct SpotLightShadow {
			float shadowIntensity;
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
		};
		uniform SpotLightShadow spotLightShadows[ NUM_SPOT_LIGHT_SHADOWS ];
	#endif
	#if NUM_POINT_LIGHT_SHADOWS > 0
		uniform mat4 pointShadowMatrix[ NUM_POINT_LIGHT_SHADOWS ];
		varying vec4 vPointShadowCoord[ NUM_POINT_LIGHT_SHADOWS ];
		struct PointLightShadow {
			float shadowIntensity;
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
			float shadowCameraNear;
			float shadowCameraFar;
		};
		uniform PointLightShadow pointLightShadows[ NUM_POINT_LIGHT_SHADOWS ];
	#endif
#endif`,qd=`#if ( defined( USE_SHADOWMAP ) && ( NUM_DIR_LIGHT_SHADOWS > 0 || NUM_POINT_LIGHT_SHADOWS > 0 ) ) || ( NUM_SPOT_LIGHT_COORDS > 0 )
	vec3 shadowWorldNormal = inverseTransformDirection( transformedNormal, viewMatrix );
	vec4 shadowWorldPosition;
#endif
#if defined( USE_SHADOWMAP )
	#if NUM_DIR_LIGHT_SHADOWS > 0
		#pragma unroll_loop_start
		for ( int i = 0; i < NUM_DIR_LIGHT_SHADOWS; i ++ ) {
			shadowWorldPosition = worldPosition + vec4( shadowWorldNormal * directionalLightShadows[ i ].shadowNormalBias, 0 );
			vDirectionalShadowCoord[ i ] = directionalShadowMatrix[ i ] * shadowWorldPosition;
		}
		#pragma unroll_loop_end
	#endif
	#if NUM_POINT_LIGHT_SHADOWS > 0
		#pragma unroll_loop_start
		for ( int i = 0; i < NUM_POINT_LIGHT_SHADOWS; i ++ ) {
			shadowWorldPosition = worldPosition + vec4( shadowWorldNormal * pointLightShadows[ i ].shadowNormalBias, 0 );
			vPointShadowCoord[ i ] = pointShadowMatrix[ i ] * shadowWorldPosition;
		}
		#pragma unroll_loop_end
	#endif
#endif
#if NUM_SPOT_LIGHT_COORDS > 0
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_SPOT_LIGHT_COORDS; i ++ ) {
		shadowWorldPosition = worldPosition;
		#if ( defined( USE_SHADOWMAP ) && UNROLLED_LOOP_INDEX < NUM_SPOT_LIGHT_SHADOWS )
			shadowWorldPosition.xyz += shadowWorldNormal * spotLightShadows[ i ].shadowNormalBias;
		#endif
		vSpotLightCoord[ i ] = spotLightMatrix[ i ] * shadowWorldPosition;
	}
	#pragma unroll_loop_end
#endif`,Yd=`float getShadowMask() {
	float shadow = 1.0;
	#ifdef USE_SHADOWMAP
	#if NUM_DIR_LIGHT_SHADOWS > 0
	DirectionalLightShadow directionalLight;
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_DIR_LIGHT_SHADOWS; i ++ ) {
		directionalLight = directionalLightShadows[ i ];
		shadow *= receiveShadow ? getShadow( directionalShadowMap[ i ], directionalLight.shadowMapSize, directionalLight.shadowIntensity, directionalLight.shadowBias, directionalLight.shadowRadius, vDirectionalShadowCoord[ i ] ) : 1.0;
	}
	#pragma unroll_loop_end
	#endif
	#if NUM_SPOT_LIGHT_SHADOWS > 0
	SpotLightShadow spotLight;
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_SPOT_LIGHT_SHADOWS; i ++ ) {
		spotLight = spotLightShadows[ i ];
		shadow *= receiveShadow ? getShadow( spotShadowMap[ i ], spotLight.shadowMapSize, spotLight.shadowIntensity, spotLight.shadowBias, spotLight.shadowRadius, vSpotLightCoord[ i ] ) : 1.0;
	}
	#pragma unroll_loop_end
	#endif
	#if NUM_POINT_LIGHT_SHADOWS > 0
	PointLightShadow pointLight;
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_POINT_LIGHT_SHADOWS; i ++ ) {
		pointLight = pointLightShadows[ i ];
		shadow *= receiveShadow ? getPointShadow( pointShadowMap[ i ], pointLight.shadowMapSize, pointLight.shadowIntensity, pointLight.shadowBias, pointLight.shadowRadius, vPointShadowCoord[ i ], pointLight.shadowCameraNear, pointLight.shadowCameraFar ) : 1.0;
	}
	#pragma unroll_loop_end
	#endif
	#endif
	return shadow;
}`,$d=`#ifdef USE_SKINNING
	mat4 boneMatX = getBoneMatrix( skinIndex.x );
	mat4 boneMatY = getBoneMatrix( skinIndex.y );
	mat4 boneMatZ = getBoneMatrix( skinIndex.z );
	mat4 boneMatW = getBoneMatrix( skinIndex.w );
#endif`,Zd=`#ifdef USE_SKINNING
	uniform mat4 bindMatrix;
	uniform mat4 bindMatrixInverse;
	uniform highp sampler2D boneTexture;
	mat4 getBoneMatrix( const in float i ) {
		int size = textureSize( boneTexture, 0 ).x;
		int j = int( i ) * 4;
		int x = j % size;
		int y = j / size;
		vec4 v1 = texelFetch( boneTexture, ivec2( x, y ), 0 );
		vec4 v2 = texelFetch( boneTexture, ivec2( x + 1, y ), 0 );
		vec4 v3 = texelFetch( boneTexture, ivec2( x + 2, y ), 0 );
		vec4 v4 = texelFetch( boneTexture, ivec2( x + 3, y ), 0 );
		return mat4( v1, v2, v3, v4 );
	}
#endif`,Kd=`#ifdef USE_SKINNING
	vec4 skinVertex = bindMatrix * vec4( transformed, 1.0 );
	vec4 skinned = vec4( 0.0 );
	skinned += boneMatX * skinVertex * skinWeight.x;
	skinned += boneMatY * skinVertex * skinWeight.y;
	skinned += boneMatZ * skinVertex * skinWeight.z;
	skinned += boneMatW * skinVertex * skinWeight.w;
	transformed = ( bindMatrixInverse * skinned ).xyz;
#endif`,jd=`#ifdef USE_SKINNING
	mat4 skinMatrix = mat4( 0.0 );
	skinMatrix += skinWeight.x * boneMatX;
	skinMatrix += skinWeight.y * boneMatY;
	skinMatrix += skinWeight.z * boneMatZ;
	skinMatrix += skinWeight.w * boneMatW;
	skinMatrix = bindMatrixInverse * skinMatrix * bindMatrix;
	objectNormal = vec4( skinMatrix * vec4( objectNormal, 0.0 ) ).xyz;
	#ifdef USE_TANGENT
		objectTangent = vec4( skinMatrix * vec4( objectTangent, 0.0 ) ).xyz;
	#endif
#endif`,Jd=`float specularStrength;
#ifdef USE_SPECULARMAP
	vec4 texelSpecular = texture2D( specularMap, vSpecularMapUv );
	specularStrength = texelSpecular.r;
#else
	specularStrength = 1.0;
#endif`,Qd=`#ifdef USE_SPECULARMAP
	uniform sampler2D specularMap;
#endif`,ep=`#if defined( TONE_MAPPING )
	gl_FragColor.rgb = toneMapping( gl_FragColor.rgb );
#endif`,tp=`#ifndef saturate
#define saturate( a ) clamp( a, 0.0, 1.0 )
#endif
uniform float toneMappingExposure;
vec3 LinearToneMapping( vec3 color ) {
	return saturate( toneMappingExposure * color );
}
vec3 ReinhardToneMapping( vec3 color ) {
	color *= toneMappingExposure;
	return saturate( color / ( vec3( 1.0 ) + color ) );
}
vec3 CineonToneMapping( vec3 color ) {
	color *= toneMappingExposure;
	color = max( vec3( 0.0 ), color - 0.004 );
	return pow( ( color * ( 6.2 * color + 0.5 ) ) / ( color * ( 6.2 * color + 1.7 ) + 0.06 ), vec3( 2.2 ) );
}
vec3 RRTAndODTFit( vec3 v ) {
	vec3 a = v * ( v + 0.0245786 ) - 0.000090537;
	vec3 b = v * ( 0.983729 * v + 0.4329510 ) + 0.238081;
	return a / b;
}
vec3 ACESFilmicToneMapping( vec3 color ) {
	const mat3 ACESInputMat = mat3(
		vec3( 0.59719, 0.07600, 0.02840 ),		vec3( 0.35458, 0.90834, 0.13383 ),
		vec3( 0.04823, 0.01566, 0.83777 )
	);
	const mat3 ACESOutputMat = mat3(
		vec3(  1.60475, -0.10208, -0.00327 ),		vec3( -0.53108,  1.10813, -0.07276 ),
		vec3( -0.07367, -0.00605,  1.07602 )
	);
	color *= toneMappingExposure / 0.6;
	color = ACESInputMat * color;
	color = RRTAndODTFit( color );
	color = ACESOutputMat * color;
	return saturate( color );
}
const mat3 LINEAR_REC2020_TO_LINEAR_SRGB = mat3(
	vec3( 1.6605, - 0.1246, - 0.0182 ),
	vec3( - 0.5876, 1.1329, - 0.1006 ),
	vec3( - 0.0728, - 0.0083, 1.1187 )
);
const mat3 LINEAR_SRGB_TO_LINEAR_REC2020 = mat3(
	vec3( 0.6274, 0.0691, 0.0164 ),
	vec3( 0.3293, 0.9195, 0.0880 ),
	vec3( 0.0433, 0.0113, 0.8956 )
);
vec3 agxDefaultContrastApprox( vec3 x ) {
	vec3 x2 = x * x;
	vec3 x4 = x2 * x2;
	return + 15.5 * x4 * x2
		- 40.14 * x4 * x
		+ 31.96 * x4
		- 6.868 * x2 * x
		+ 0.4298 * x2
		+ 0.1191 * x
		- 0.00232;
}
vec3 AgXToneMapping( vec3 color ) {
	const mat3 AgXInsetMatrix = mat3(
		vec3( 0.856627153315983, 0.137318972929847, 0.11189821299995 ),
		vec3( 0.0951212405381588, 0.761241990602591, 0.0767994186031903 ),
		vec3( 0.0482516061458583, 0.101439036467562, 0.811302368396859 )
	);
	const mat3 AgXOutsetMatrix = mat3(
		vec3( 1.1271005818144368, - 0.1413297634984383, - 0.14132976349843826 ),
		vec3( - 0.11060664309660323, 1.157823702216272, - 0.11060664309660294 ),
		vec3( - 0.016493938717834573, - 0.016493938717834257, 1.2519364065950405 )
	);
	const float AgxMinEv = - 12.47393;	const float AgxMaxEv = 4.026069;
	color *= toneMappingExposure;
	color = LINEAR_SRGB_TO_LINEAR_REC2020 * color;
	color = AgXInsetMatrix * color;
	color = max( color, 1e-10 );	color = log2( color );
	color = ( color - AgxMinEv ) / ( AgxMaxEv - AgxMinEv );
	color = clamp( color, 0.0, 1.0 );
	color = agxDefaultContrastApprox( color );
	color = AgXOutsetMatrix * color;
	color = pow( max( vec3( 0.0 ), color ), vec3( 2.2 ) );
	color = LINEAR_REC2020_TO_LINEAR_SRGB * color;
	color = clamp( color, 0.0, 1.0 );
	return color;
}
vec3 NeutralToneMapping( vec3 color ) {
	const float StartCompression = 0.8 - 0.04;
	const float Desaturation = 0.15;
	color *= toneMappingExposure;
	float x = min( color.r, min( color.g, color.b ) );
	float offset = x < 0.08 ? x - 6.25 * x * x : 0.04;
	color -= offset;
	float peak = max( color.r, max( color.g, color.b ) );
	if ( peak < StartCompression ) return color;
	float d = 1. - StartCompression;
	float newPeak = 1. - d * d / ( peak + d - StartCompression );
	color *= newPeak / peak;
	float g = 1. - 1. / ( Desaturation * ( peak - newPeak ) + 1. );
	return mix( color, vec3( newPeak ), g );
}
vec3 CustomToneMapping( vec3 color ) { return color; }`,np=`#ifdef USE_TRANSMISSION
	material.transmission = transmission;
	material.transmissionAlpha = 1.0;
	material.thickness = thickness;
	material.attenuationDistance = attenuationDistance;
	material.attenuationColor = attenuationColor;
	#ifdef USE_TRANSMISSIONMAP
		material.transmission *= texture2D( transmissionMap, vTransmissionMapUv ).r;
	#endif
	#ifdef USE_THICKNESSMAP
		material.thickness *= texture2D( thicknessMap, vThicknessMapUv ).g;
	#endif
	vec3 pos = vWorldPosition;
	vec3 v = normalize( cameraPosition - pos );
	vec3 n = inverseTransformDirection( normal, viewMatrix );
	vec4 transmitted = getIBLVolumeRefraction(
		n, v, material.roughness, material.diffuseColor, material.specularColor, material.specularF90,
		pos, modelMatrix, viewMatrix, projectionMatrix, material.dispersion, material.ior, material.thickness,
		material.attenuationColor, material.attenuationDistance );
	material.transmissionAlpha = mix( material.transmissionAlpha, transmitted.a, material.transmission );
	totalDiffuse = mix( totalDiffuse, transmitted.rgb, material.transmission );
#endif`,ip=`#ifdef USE_TRANSMISSION
	uniform float transmission;
	uniform float thickness;
	uniform float attenuationDistance;
	uniform vec3 attenuationColor;
	#ifdef USE_TRANSMISSIONMAP
		uniform sampler2D transmissionMap;
	#endif
	#ifdef USE_THICKNESSMAP
		uniform sampler2D thicknessMap;
	#endif
	uniform vec2 transmissionSamplerSize;
	uniform sampler2D transmissionSamplerMap;
	uniform mat4 modelMatrix;
	uniform mat4 projectionMatrix;
	varying vec3 vWorldPosition;
	float w0( float a ) {
		return ( 1.0 / 6.0 ) * ( a * ( a * ( - a + 3.0 ) - 3.0 ) + 1.0 );
	}
	float w1( float a ) {
		return ( 1.0 / 6.0 ) * ( a *  a * ( 3.0 * a - 6.0 ) + 4.0 );
	}
	float w2( float a ){
		return ( 1.0 / 6.0 ) * ( a * ( a * ( - 3.0 * a + 3.0 ) + 3.0 ) + 1.0 );
	}
	float w3( float a ) {
		return ( 1.0 / 6.0 ) * ( a * a * a );
	}
	float g0( float a ) {
		return w0( a ) + w1( a );
	}
	float g1( float a ) {
		return w2( a ) + w3( a );
	}
	float h0( float a ) {
		return - 1.0 + w1( a ) / ( w0( a ) + w1( a ) );
	}
	float h1( float a ) {
		return 1.0 + w3( a ) / ( w2( a ) + w3( a ) );
	}
	vec4 bicubic( sampler2D tex, vec2 uv, vec4 texelSize, float lod ) {
		uv = uv * texelSize.zw + 0.5;
		vec2 iuv = floor( uv );
		vec2 fuv = fract( uv );
		float g0x = g0( fuv.x );
		float g1x = g1( fuv.x );
		float h0x = h0( fuv.x );
		float h1x = h1( fuv.x );
		float h0y = h0( fuv.y );
		float h1y = h1( fuv.y );
		vec2 p0 = ( vec2( iuv.x + h0x, iuv.y + h0y ) - 0.5 ) * texelSize.xy;
		vec2 p1 = ( vec2( iuv.x + h1x, iuv.y + h0y ) - 0.5 ) * texelSize.xy;
		vec2 p2 = ( vec2( iuv.x + h0x, iuv.y + h1y ) - 0.5 ) * texelSize.xy;
		vec2 p3 = ( vec2( iuv.x + h1x, iuv.y + h1y ) - 0.5 ) * texelSize.xy;
		return g0( fuv.y ) * ( g0x * textureLod( tex, p0, lod ) + g1x * textureLod( tex, p1, lod ) ) +
			g1( fuv.y ) * ( g0x * textureLod( tex, p2, lod ) + g1x * textureLod( tex, p3, lod ) );
	}
	vec4 textureBicubic( sampler2D sampler, vec2 uv, float lod ) {
		vec2 fLodSize = vec2( textureSize( sampler, int( lod ) ) );
		vec2 cLodSize = vec2( textureSize( sampler, int( lod + 1.0 ) ) );
		vec2 fLodSizeInv = 1.0 / fLodSize;
		vec2 cLodSizeInv = 1.0 / cLodSize;
		vec4 fSample = bicubic( sampler, uv, vec4( fLodSizeInv, fLodSize ), floor( lod ) );
		vec4 cSample = bicubic( sampler, uv, vec4( cLodSizeInv, cLodSize ), ceil( lod ) );
		return mix( fSample, cSample, fract( lod ) );
	}
	vec3 getVolumeTransmissionRay( const in vec3 n, const in vec3 v, const in float thickness, const in float ior, const in mat4 modelMatrix ) {
		vec3 refractionVector = refract( - v, normalize( n ), 1.0 / ior );
		vec3 modelScale;
		modelScale.x = length( vec3( modelMatrix[ 0 ].xyz ) );
		modelScale.y = length( vec3( modelMatrix[ 1 ].xyz ) );
		modelScale.z = length( vec3( modelMatrix[ 2 ].xyz ) );
		return normalize( refractionVector ) * thickness * modelScale;
	}
	float applyIorToRoughness( const in float roughness, const in float ior ) {
		return roughness * clamp( ior * 2.0 - 2.0, 0.0, 1.0 );
	}
	vec4 getTransmissionSample( const in vec2 fragCoord, const in float roughness, const in float ior ) {
		float lod = log2( transmissionSamplerSize.x ) * applyIorToRoughness( roughness, ior );
		return textureBicubic( transmissionSamplerMap, fragCoord.xy, lod );
	}
	vec3 volumeAttenuation( const in float transmissionDistance, const in vec3 attenuationColor, const in float attenuationDistance ) {
		if ( isinf( attenuationDistance ) ) {
			return vec3( 1.0 );
		} else {
			vec3 attenuationCoefficient = -log( attenuationColor ) / attenuationDistance;
			vec3 transmittance = exp( - attenuationCoefficient * transmissionDistance );			return transmittance;
		}
	}
	vec4 getIBLVolumeRefraction( const in vec3 n, const in vec3 v, const in float roughness, const in vec3 diffuseColor,
		const in vec3 specularColor, const in float specularF90, const in vec3 position, const in mat4 modelMatrix,
		const in mat4 viewMatrix, const in mat4 projMatrix, const in float dispersion, const in float ior, const in float thickness,
		const in vec3 attenuationColor, const in float attenuationDistance ) {
		vec4 transmittedLight;
		vec3 transmittance;
		#ifdef USE_DISPERSION
			float halfSpread = ( ior - 1.0 ) * 0.025 * dispersion;
			vec3 iors = vec3( ior - halfSpread, ior, ior + halfSpread );
			for ( int i = 0; i < 3; i ++ ) {
				vec3 transmissionRay = getVolumeTransmissionRay( n, v, thickness, iors[ i ], modelMatrix );
				vec3 refractedRayExit = position + transmissionRay;
				vec4 ndcPos = projMatrix * viewMatrix * vec4( refractedRayExit, 1.0 );
				vec2 refractionCoords = ndcPos.xy / ndcPos.w;
				refractionCoords += 1.0;
				refractionCoords /= 2.0;
				vec4 transmissionSample = getTransmissionSample( refractionCoords, roughness, iors[ i ] );
				transmittedLight[ i ] = transmissionSample[ i ];
				transmittedLight.a += transmissionSample.a;
				transmittance[ i ] = diffuseColor[ i ] * volumeAttenuation( length( transmissionRay ), attenuationColor, attenuationDistance )[ i ];
			}
			transmittedLight.a /= 3.0;
		#else
			vec3 transmissionRay = getVolumeTransmissionRay( n, v, thickness, ior, modelMatrix );
			vec3 refractedRayExit = position + transmissionRay;
			vec4 ndcPos = projMatrix * viewMatrix * vec4( refractedRayExit, 1.0 );
			vec2 refractionCoords = ndcPos.xy / ndcPos.w;
			refractionCoords += 1.0;
			refractionCoords /= 2.0;
			transmittedLight = getTransmissionSample( refractionCoords, roughness, ior );
			transmittance = diffuseColor * volumeAttenuation( length( transmissionRay ), attenuationColor, attenuationDistance );
		#endif
		vec3 attenuatedColor = transmittance * transmittedLight.rgb;
		vec3 F = EnvironmentBRDF( n, v, specularColor, specularF90, roughness );
		float transmittanceFactor = ( transmittance.r + transmittance.g + transmittance.b ) / 3.0;
		return vec4( ( 1.0 - F ) * attenuatedColor, 1.0 - ( 1.0 - transmittedLight.a ) * transmittanceFactor );
	}
#endif`,rp=`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
	varying vec2 vUv;
#endif
#ifdef USE_MAP
	varying vec2 vMapUv;
#endif
#ifdef USE_ALPHAMAP
	varying vec2 vAlphaMapUv;
#endif
#ifdef USE_LIGHTMAP
	varying vec2 vLightMapUv;
#endif
#ifdef USE_AOMAP
	varying vec2 vAoMapUv;
#endif
#ifdef USE_BUMPMAP
	varying vec2 vBumpMapUv;
#endif
#ifdef USE_NORMALMAP
	varying vec2 vNormalMapUv;
#endif
#ifdef USE_EMISSIVEMAP
	varying vec2 vEmissiveMapUv;
#endif
#ifdef USE_METALNESSMAP
	varying vec2 vMetalnessMapUv;
#endif
#ifdef USE_ROUGHNESSMAP
	varying vec2 vRoughnessMapUv;
#endif
#ifdef USE_ANISOTROPYMAP
	varying vec2 vAnisotropyMapUv;
#endif
#ifdef USE_CLEARCOATMAP
	varying vec2 vClearcoatMapUv;
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	varying vec2 vClearcoatNormalMapUv;
#endif
#ifdef USE_CLEARCOAT_ROUGHNESSMAP
	varying vec2 vClearcoatRoughnessMapUv;
#endif
#ifdef USE_IRIDESCENCEMAP
	varying vec2 vIridescenceMapUv;
#endif
#ifdef USE_IRIDESCENCE_THICKNESSMAP
	varying vec2 vIridescenceThicknessMapUv;
#endif
#ifdef USE_SHEEN_COLORMAP
	varying vec2 vSheenColorMapUv;
#endif
#ifdef USE_SHEEN_ROUGHNESSMAP
	varying vec2 vSheenRoughnessMapUv;
#endif
#ifdef USE_SPECULARMAP
	varying vec2 vSpecularMapUv;
#endif
#ifdef USE_SPECULAR_COLORMAP
	varying vec2 vSpecularColorMapUv;
#endif
#ifdef USE_SPECULAR_INTENSITYMAP
	varying vec2 vSpecularIntensityMapUv;
#endif
#ifdef USE_TRANSMISSIONMAP
	uniform mat3 transmissionMapTransform;
	varying vec2 vTransmissionMapUv;
#endif
#ifdef USE_THICKNESSMAP
	uniform mat3 thicknessMapTransform;
	varying vec2 vThicknessMapUv;
#endif`,sp=`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
	varying vec2 vUv;
#endif
#ifdef USE_MAP
	uniform mat3 mapTransform;
	varying vec2 vMapUv;
#endif
#ifdef USE_ALPHAMAP
	uniform mat3 alphaMapTransform;
	varying vec2 vAlphaMapUv;
#endif
#ifdef USE_LIGHTMAP
	uniform mat3 lightMapTransform;
	varying vec2 vLightMapUv;
#endif
#ifdef USE_AOMAP
	uniform mat3 aoMapTransform;
	varying vec2 vAoMapUv;
#endif
#ifdef USE_BUMPMAP
	uniform mat3 bumpMapTransform;
	varying vec2 vBumpMapUv;
#endif
#ifdef USE_NORMALMAP
	uniform mat3 normalMapTransform;
	varying vec2 vNormalMapUv;
#endif
#ifdef USE_DISPLACEMENTMAP
	uniform mat3 displacementMapTransform;
	varying vec2 vDisplacementMapUv;
#endif
#ifdef USE_EMISSIVEMAP
	uniform mat3 emissiveMapTransform;
	varying vec2 vEmissiveMapUv;
#endif
#ifdef USE_METALNESSMAP
	uniform mat3 metalnessMapTransform;
	varying vec2 vMetalnessMapUv;
#endif
#ifdef USE_ROUGHNESSMAP
	uniform mat3 roughnessMapTransform;
	varying vec2 vRoughnessMapUv;
#endif
#ifdef USE_ANISOTROPYMAP
	uniform mat3 anisotropyMapTransform;
	varying vec2 vAnisotropyMapUv;
#endif
#ifdef USE_CLEARCOATMAP
	uniform mat3 clearcoatMapTransform;
	varying vec2 vClearcoatMapUv;
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	uniform mat3 clearcoatNormalMapTransform;
	varying vec2 vClearcoatNormalMapUv;
#endif
#ifdef USE_CLEARCOAT_ROUGHNESSMAP
	uniform mat3 clearcoatRoughnessMapTransform;
	varying vec2 vClearcoatRoughnessMapUv;
#endif
#ifdef USE_SHEEN_COLORMAP
	uniform mat3 sheenColorMapTransform;
	varying vec2 vSheenColorMapUv;
#endif
#ifdef USE_SHEEN_ROUGHNESSMAP
	uniform mat3 sheenRoughnessMapTransform;
	varying vec2 vSheenRoughnessMapUv;
#endif
#ifdef USE_IRIDESCENCEMAP
	uniform mat3 iridescenceMapTransform;
	varying vec2 vIridescenceMapUv;
#endif
#ifdef USE_IRIDESCENCE_THICKNESSMAP
	uniform mat3 iridescenceThicknessMapTransform;
	varying vec2 vIridescenceThicknessMapUv;
#endif
#ifdef USE_SPECULARMAP
	uniform mat3 specularMapTransform;
	varying vec2 vSpecularMapUv;
#endif
#ifdef USE_SPECULAR_COLORMAP
	uniform mat3 specularColorMapTransform;
	varying vec2 vSpecularColorMapUv;
#endif
#ifdef USE_SPECULAR_INTENSITYMAP
	uniform mat3 specularIntensityMapTransform;
	varying vec2 vSpecularIntensityMapUv;
#endif
#ifdef USE_TRANSMISSIONMAP
	uniform mat3 transmissionMapTransform;
	varying vec2 vTransmissionMapUv;
#endif
#ifdef USE_THICKNESSMAP
	uniform mat3 thicknessMapTransform;
	varying vec2 vThicknessMapUv;
#endif`,ap=`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
	vUv = vec3( uv, 1 ).xy;
#endif
#ifdef USE_MAP
	vMapUv = ( mapTransform * vec3( MAP_UV, 1 ) ).xy;
#endif
#ifdef USE_ALPHAMAP
	vAlphaMapUv = ( alphaMapTransform * vec3( ALPHAMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_LIGHTMAP
	vLightMapUv = ( lightMapTransform * vec3( LIGHTMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_AOMAP
	vAoMapUv = ( aoMapTransform * vec3( AOMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_BUMPMAP
	vBumpMapUv = ( bumpMapTransform * vec3( BUMPMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_NORMALMAP
	vNormalMapUv = ( normalMapTransform * vec3( NORMALMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_DISPLACEMENTMAP
	vDisplacementMapUv = ( displacementMapTransform * vec3( DISPLACEMENTMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_EMISSIVEMAP
	vEmissiveMapUv = ( emissiveMapTransform * vec3( EMISSIVEMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_METALNESSMAP
	vMetalnessMapUv = ( metalnessMapTransform * vec3( METALNESSMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_ROUGHNESSMAP
	vRoughnessMapUv = ( roughnessMapTransform * vec3( ROUGHNESSMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_ANISOTROPYMAP
	vAnisotropyMapUv = ( anisotropyMapTransform * vec3( ANISOTROPYMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_CLEARCOATMAP
	vClearcoatMapUv = ( clearcoatMapTransform * vec3( CLEARCOATMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	vClearcoatNormalMapUv = ( clearcoatNormalMapTransform * vec3( CLEARCOAT_NORMALMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_CLEARCOAT_ROUGHNESSMAP
	vClearcoatRoughnessMapUv = ( clearcoatRoughnessMapTransform * vec3( CLEARCOAT_ROUGHNESSMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_IRIDESCENCEMAP
	vIridescenceMapUv = ( iridescenceMapTransform * vec3( IRIDESCENCEMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_IRIDESCENCE_THICKNESSMAP
	vIridescenceThicknessMapUv = ( iridescenceThicknessMapTransform * vec3( IRIDESCENCE_THICKNESSMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_SHEEN_COLORMAP
	vSheenColorMapUv = ( sheenColorMapTransform * vec3( SHEEN_COLORMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_SHEEN_ROUGHNESSMAP
	vSheenRoughnessMapUv = ( sheenRoughnessMapTransform * vec3( SHEEN_ROUGHNESSMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_SPECULARMAP
	vSpecularMapUv = ( specularMapTransform * vec3( SPECULARMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_SPECULAR_COLORMAP
	vSpecularColorMapUv = ( specularColorMapTransform * vec3( SPECULAR_COLORMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_SPECULAR_INTENSITYMAP
	vSpecularIntensityMapUv = ( specularIntensityMapTransform * vec3( SPECULAR_INTENSITYMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_TRANSMISSIONMAP
	vTransmissionMapUv = ( transmissionMapTransform * vec3( TRANSMISSIONMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_THICKNESSMAP
	vThicknessMapUv = ( thicknessMapTransform * vec3( THICKNESSMAP_UV, 1 ) ).xy;
#endif`,op=`#if defined( USE_ENVMAP ) || defined( DISTANCE ) || defined ( USE_SHADOWMAP ) || defined ( USE_TRANSMISSION ) || NUM_SPOT_LIGHT_COORDS > 0
	vec4 worldPosition = vec4( transformed, 1.0 );
	#ifdef USE_BATCHING
		worldPosition = batchingMatrix * worldPosition;
	#endif
	#ifdef USE_INSTANCING
		worldPosition = instanceMatrix * worldPosition;
	#endif
	worldPosition = modelMatrix * worldPosition;
#endif`;const lp=`varying vec2 vUv;
uniform mat3 uvTransform;
void main() {
	vUv = ( uvTransform * vec3( uv, 1 ) ).xy;
	gl_Position = vec4( position.xy, 1.0, 1.0 );
}`,cp=`uniform sampler2D t2D;
uniform float backgroundIntensity;
varying vec2 vUv;
void main() {
	vec4 texColor = texture2D( t2D, vUv );
	#ifdef DECODE_VIDEO_TEXTURE
		texColor = vec4( mix( pow( texColor.rgb * 0.9478672986 + vec3( 0.0521327014 ), vec3( 2.4 ) ), texColor.rgb * 0.0773993808, vec3( lessThanEqual( texColor.rgb, vec3( 0.04045 ) ) ) ), texColor.w );
	#endif
	texColor.rgb *= backgroundIntensity;
	gl_FragColor = texColor;
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,up=`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
	gl_Position.z = gl_Position.w;
}`,hp=`#ifdef ENVMAP_TYPE_CUBE
	uniform samplerCube envMap;
#elif defined( ENVMAP_TYPE_CUBE_UV )
	uniform sampler2D envMap;
#endif
uniform float flipEnvMap;
uniform float backgroundBlurriness;
uniform float backgroundIntensity;
uniform mat3 backgroundRotation;
varying vec3 vWorldDirection;
#include <cube_uv_reflection_fragment>
void main() {
	#ifdef ENVMAP_TYPE_CUBE
		vec4 texColor = textureCube( envMap, backgroundRotation * vec3( flipEnvMap * vWorldDirection.x, vWorldDirection.yz ) );
	#elif defined( ENVMAP_TYPE_CUBE_UV )
		vec4 texColor = textureCubeUV( envMap, backgroundRotation * vWorldDirection, backgroundBlurriness );
	#else
		vec4 texColor = vec4( 0.0, 0.0, 0.0, 1.0 );
	#endif
	texColor.rgb *= backgroundIntensity;
	gl_FragColor = texColor;
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,fp=`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
	gl_Position.z = gl_Position.w;
}`,dp=`uniform samplerCube tCube;
uniform float tFlip;
uniform float opacity;
varying vec3 vWorldDirection;
void main() {
	vec4 texColor = textureCube( tCube, vec3( tFlip * vWorldDirection.x, vWorldDirection.yz ) );
	gl_FragColor = texColor;
	gl_FragColor.a *= opacity;
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,pp=`#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
varying vec2 vHighPrecisionZW;
void main() {
	#include <uv_vertex>
	#include <batching_vertex>
	#include <skinbase_vertex>
	#include <morphinstance_vertex>
	#ifdef USE_DISPLACEMENTMAP
		#include <beginnormal_vertex>
		#include <morphnormal_vertex>
		#include <skinnormal_vertex>
	#endif
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	vHighPrecisionZW = gl_Position.zw;
}`,mp=`#if DEPTH_PACKING == 3200
	uniform float opacity;
#endif
#include <common>
#include <packing>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
varying vec2 vHighPrecisionZW;
void main() {
	vec4 diffuseColor = vec4( 1.0 );
	#include <clipping_planes_fragment>
	#if DEPTH_PACKING == 3200
		diffuseColor.a = opacity;
	#endif
	#include <map_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <logdepthbuf_fragment>
	float fragCoordZ = 0.5 * vHighPrecisionZW[0] / vHighPrecisionZW[1] + 0.5;
	#if DEPTH_PACKING == 3200
		gl_FragColor = vec4( vec3( 1.0 - fragCoordZ ), opacity );
	#elif DEPTH_PACKING == 3201
		gl_FragColor = packDepthToRGBA( fragCoordZ );
	#elif DEPTH_PACKING == 3202
		gl_FragColor = vec4( packDepthToRGB( fragCoordZ ), 1.0 );
	#elif DEPTH_PACKING == 3203
		gl_FragColor = vec4( packDepthToRG( fragCoordZ ), 0.0, 1.0 );
	#endif
}`,_p=`#define DISTANCE
varying vec3 vWorldPosition;
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <batching_vertex>
	#include <skinbase_vertex>
	#include <morphinstance_vertex>
	#ifdef USE_DISPLACEMENTMAP
		#include <beginnormal_vertex>
		#include <morphnormal_vertex>
		#include <skinnormal_vertex>
	#endif
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <worldpos_vertex>
	#include <clipping_planes_vertex>
	vWorldPosition = worldPosition.xyz;
}`,gp=`#define DISTANCE
uniform vec3 referencePosition;
uniform float nearDistance;
uniform float farDistance;
varying vec3 vWorldPosition;
#include <common>
#include <packing>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <clipping_planes_pars_fragment>
void main () {
	vec4 diffuseColor = vec4( 1.0 );
	#include <clipping_planes_fragment>
	#include <map_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	float dist = length( vWorldPosition - referencePosition );
	dist = ( dist - nearDistance ) / ( farDistance - nearDistance );
	dist = saturate( dist );
	gl_FragColor = packDepthToRGBA( dist );
}`,vp=`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
}`,xp=`uniform sampler2D tEquirect;
varying vec3 vWorldDirection;
#include <common>
void main() {
	vec3 direction = normalize( vWorldDirection );
	vec2 sampleUV = equirectUv( direction );
	gl_FragColor = texture2D( tEquirect, sampleUV );
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,Mp=`uniform float scale;
attribute float lineDistance;
varying float vLineDistance;
#include <common>
#include <uv_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <morphtarget_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	vLineDistance = scale * lineDistance;
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	#include <fog_vertex>
}`,Sp=`uniform vec3 diffuse;
uniform float opacity;
uniform float dashSize;
uniform float totalSize;
varying float vLineDistance;
#include <common>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <fog_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	if ( mod( vLineDistance, totalSize ) > dashSize ) {
		discard;
	}
	vec3 outgoingLight = vec3( 0.0 );
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	outgoingLight = diffuseColor.rgb;
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
}`,Ep=`#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <envmap_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#if defined ( USE_ENVMAP ) || defined ( USE_SKINNING )
		#include <beginnormal_vertex>
		#include <morphnormal_vertex>
		#include <skinbase_vertex>
		#include <skinnormal_vertex>
		#include <defaultnormal_vertex>
	#endif
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	#include <worldpos_vertex>
	#include <envmap_vertex>
	#include <fog_vertex>
}`,yp=`uniform vec3 diffuse;
uniform float opacity;
#ifndef FLAT_SHADED
	varying vec3 vNormal;
#endif
#include <common>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <aomap_pars_fragment>
#include <lightmap_pars_fragment>
#include <envmap_common_pars_fragment>
#include <envmap_pars_fragment>
#include <fog_pars_fragment>
#include <specularmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <specularmap_fragment>
	ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );
	#ifdef USE_LIGHTMAP
		vec4 lightMapTexel = texture2D( lightMap, vLightMapUv );
		reflectedLight.indirectDiffuse += lightMapTexel.rgb * lightMapIntensity * RECIPROCAL_PI;
	#else
		reflectedLight.indirectDiffuse += vec3( 1.0 );
	#endif
	#include <aomap_fragment>
	reflectedLight.indirectDiffuse *= diffuseColor.rgb;
	vec3 outgoingLight = reflectedLight.indirectDiffuse;
	#include <envmap_fragment>
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,Tp=`#define LAMBERT
varying vec3 vViewPosition;
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <envmap_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <shadowmap_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	vViewPosition = - mvPosition.xyz;
	#include <worldpos_vertex>
	#include <envmap_vertex>
	#include <shadowmap_vertex>
	#include <fog_vertex>
}`,bp=`#define LAMBERT
uniform vec3 diffuse;
uniform vec3 emissive;
uniform float opacity;
#include <common>
#include <packing>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <aomap_pars_fragment>
#include <lightmap_pars_fragment>
#include <emissivemap_pars_fragment>
#include <envmap_common_pars_fragment>
#include <envmap_pars_fragment>
#include <fog_pars_fragment>
#include <bsdfs>
#include <lights_pars_begin>
#include <normal_pars_fragment>
#include <lights_lambert_pars_fragment>
#include <shadowmap_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <specularmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );
	vec3 totalEmissiveRadiance = emissive;
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <specularmap_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	#include <emissivemap_fragment>
	#include <lights_lambert_fragment>
	#include <lights_fragment_begin>
	#include <lights_fragment_maps>
	#include <lights_fragment_end>
	#include <aomap_fragment>
	vec3 outgoingLight = reflectedLight.directDiffuse + reflectedLight.indirectDiffuse + totalEmissiveRadiance;
	#include <envmap_fragment>
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,Ap=`#define MATCAP
varying vec3 vViewPosition;
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <color_pars_vertex>
#include <displacementmap_pars_vertex>
#include <fog_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	#include <fog_vertex>
	vViewPosition = - mvPosition.xyz;
}`,wp=`#define MATCAP
uniform vec3 diffuse;
uniform float opacity;
uniform sampler2D matcap;
varying vec3 vViewPosition;
#include <common>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <fog_pars_fragment>
#include <normal_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	vec3 viewDir = normalize( vViewPosition );
	vec3 x = normalize( vec3( viewDir.z, 0.0, - viewDir.x ) );
	vec3 y = cross( viewDir, x );
	vec2 uv = vec2( dot( x, normal ), dot( y, normal ) ) * 0.495 + 0.5;
	#ifdef USE_MATCAP
		vec4 matcapColor = texture2D( matcap, uv );
	#else
		vec4 matcapColor = vec4( vec3( mix( 0.2, 0.8, uv.y ) ), 1.0 );
	#endif
	vec3 outgoingLight = diffuseColor.rgb * matcapColor.rgb;
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,Rp=`#define NORMAL
#if defined( FLAT_SHADED ) || defined( USE_BUMPMAP ) || defined( USE_NORMALMAP_TANGENTSPACE )
	varying vec3 vViewPosition;
#endif
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphinstance_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
#if defined( FLAT_SHADED ) || defined( USE_BUMPMAP ) || defined( USE_NORMALMAP_TANGENTSPACE )
	vViewPosition = - mvPosition.xyz;
#endif
}`,Cp=`#define NORMAL
uniform float opacity;
#if defined( FLAT_SHADED ) || defined( USE_BUMPMAP ) || defined( USE_NORMALMAP_TANGENTSPACE )
	varying vec3 vViewPosition;
#endif
#include <packing>
#include <uv_pars_fragment>
#include <normal_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( 0.0, 0.0, 0.0, opacity );
	#include <clipping_planes_fragment>
	#include <logdepthbuf_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	gl_FragColor = vec4( packNormalToRGB( normal ), diffuseColor.a );
	#ifdef OPAQUE
		gl_FragColor.a = 1.0;
	#endif
}`,Pp=`#define PHONG
varying vec3 vViewPosition;
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <envmap_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <shadowmap_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphinstance_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	vViewPosition = - mvPosition.xyz;
	#include <worldpos_vertex>
	#include <envmap_vertex>
	#include <shadowmap_vertex>
	#include <fog_vertex>
}`,Dp=`#define PHONG
uniform vec3 diffuse;
uniform vec3 emissive;
uniform vec3 specular;
uniform float shininess;
uniform float opacity;
#include <common>
#include <packing>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <aomap_pars_fragment>
#include <lightmap_pars_fragment>
#include <emissivemap_pars_fragment>
#include <envmap_common_pars_fragment>
#include <envmap_pars_fragment>
#include <fog_pars_fragment>
#include <bsdfs>
#include <lights_pars_begin>
#include <normal_pars_fragment>
#include <lights_phong_pars_fragment>
#include <shadowmap_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <specularmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );
	vec3 totalEmissiveRadiance = emissive;
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <specularmap_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	#include <emissivemap_fragment>
	#include <lights_phong_fragment>
	#include <lights_fragment_begin>
	#include <lights_fragment_maps>
	#include <lights_fragment_end>
	#include <aomap_fragment>
	vec3 outgoingLight = reflectedLight.directDiffuse + reflectedLight.indirectDiffuse + reflectedLight.directSpecular + reflectedLight.indirectSpecular + totalEmissiveRadiance;
	#include <envmap_fragment>
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,Lp=`#define STANDARD
varying vec3 vViewPosition;
#ifdef USE_TRANSMISSION
	varying vec3 vWorldPosition;
#endif
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <shadowmap_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	vViewPosition = - mvPosition.xyz;
	#include <worldpos_vertex>
	#include <shadowmap_vertex>
	#include <fog_vertex>
#ifdef USE_TRANSMISSION
	vWorldPosition = worldPosition.xyz;
#endif
}`,Up=`#define STANDARD
#ifdef PHYSICAL
	#define IOR
	#define USE_SPECULAR
#endif
uniform vec3 diffuse;
uniform vec3 emissive;
uniform float roughness;
uniform float metalness;
uniform float opacity;
#ifdef IOR
	uniform float ior;
#endif
#ifdef USE_SPECULAR
	uniform float specularIntensity;
	uniform vec3 specularColor;
	#ifdef USE_SPECULAR_COLORMAP
		uniform sampler2D specularColorMap;
	#endif
	#ifdef USE_SPECULAR_INTENSITYMAP
		uniform sampler2D specularIntensityMap;
	#endif
#endif
#ifdef USE_CLEARCOAT
	uniform float clearcoat;
	uniform float clearcoatRoughness;
#endif
#ifdef USE_DISPERSION
	uniform float dispersion;
#endif
#ifdef USE_IRIDESCENCE
	uniform float iridescence;
	uniform float iridescenceIOR;
	uniform float iridescenceThicknessMinimum;
	uniform float iridescenceThicknessMaximum;
#endif
#ifdef USE_SHEEN
	uniform vec3 sheenColor;
	uniform float sheenRoughness;
	#ifdef USE_SHEEN_COLORMAP
		uniform sampler2D sheenColorMap;
	#endif
	#ifdef USE_SHEEN_ROUGHNESSMAP
		uniform sampler2D sheenRoughnessMap;
	#endif
#endif
#ifdef USE_ANISOTROPY
	uniform vec2 anisotropyVector;
	#ifdef USE_ANISOTROPYMAP
		uniform sampler2D anisotropyMap;
	#endif
#endif
varying vec3 vViewPosition;
#include <common>
#include <packing>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <aomap_pars_fragment>
#include <lightmap_pars_fragment>
#include <emissivemap_pars_fragment>
#include <iridescence_fragment>
#include <cube_uv_reflection_fragment>
#include <envmap_common_pars_fragment>
#include <envmap_physical_pars_fragment>
#include <fog_pars_fragment>
#include <lights_pars_begin>
#include <normal_pars_fragment>
#include <lights_physical_pars_fragment>
#include <transmission_pars_fragment>
#include <shadowmap_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <clearcoat_pars_fragment>
#include <iridescence_pars_fragment>
#include <roughnessmap_pars_fragment>
#include <metalnessmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );
	vec3 totalEmissiveRadiance = emissive;
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <roughnessmap_fragment>
	#include <metalnessmap_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	#include <clearcoat_normal_fragment_begin>
	#include <clearcoat_normal_fragment_maps>
	#include <emissivemap_fragment>
	#include <lights_physical_fragment>
	#include <lights_fragment_begin>
	#include <lights_fragment_maps>
	#include <lights_fragment_end>
	#include <aomap_fragment>
	vec3 totalDiffuse = reflectedLight.directDiffuse + reflectedLight.indirectDiffuse;
	vec3 totalSpecular = reflectedLight.directSpecular + reflectedLight.indirectSpecular;
	#include <transmission_fragment>
	vec3 outgoingLight = totalDiffuse + totalSpecular + totalEmissiveRadiance;
	#ifdef USE_SHEEN
		float sheenEnergyComp = 1.0 - 0.157 * max3( material.sheenColor );
		outgoingLight = outgoingLight * sheenEnergyComp + sheenSpecularDirect + sheenSpecularIndirect;
	#endif
	#ifdef USE_CLEARCOAT
		float dotNVcc = saturate( dot( geometryClearcoatNormal, geometryViewDir ) );
		vec3 Fcc = F_Schlick( material.clearcoatF0, material.clearcoatF90, dotNVcc );
		outgoingLight = outgoingLight * ( 1.0 - material.clearcoat * Fcc ) + ( clearcoatSpecularDirect + clearcoatSpecularIndirect ) * material.clearcoat;
	#endif
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,Ip=`#define TOON
varying vec3 vViewPosition;
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <shadowmap_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	vViewPosition = - mvPosition.xyz;
	#include <worldpos_vertex>
	#include <shadowmap_vertex>
	#include <fog_vertex>
}`,Np=`#define TOON
uniform vec3 diffuse;
uniform vec3 emissive;
uniform float opacity;
#include <common>
#include <packing>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <aomap_pars_fragment>
#include <lightmap_pars_fragment>
#include <emissivemap_pars_fragment>
#include <gradientmap_pars_fragment>
#include <fog_pars_fragment>
#include <bsdfs>
#include <lights_pars_begin>
#include <normal_pars_fragment>
#include <lights_toon_pars_fragment>
#include <shadowmap_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );
	vec3 totalEmissiveRadiance = emissive;
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	#include <emissivemap_fragment>
	#include <lights_toon_fragment>
	#include <lights_fragment_begin>
	#include <lights_fragment_maps>
	#include <lights_fragment_end>
	#include <aomap_fragment>
	vec3 outgoingLight = reflectedLight.directDiffuse + reflectedLight.indirectDiffuse + totalEmissiveRadiance;
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,Fp=`uniform float size;
uniform float scale;
#include <common>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <morphtarget_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
#ifdef USE_POINTS_UV
	varying vec2 vUv;
	uniform mat3 uvTransform;
#endif
void main() {
	#ifdef USE_POINTS_UV
		vUv = ( uvTransform * vec3( uv, 1 ) ).xy;
	#endif
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <project_vertex>
	gl_PointSize = size;
	#ifdef USE_SIZEATTENUATION
		bool isPerspective = isPerspectiveMatrix( projectionMatrix );
		if ( isPerspective ) gl_PointSize *= ( scale / - mvPosition.z );
	#endif
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	#include <worldpos_vertex>
	#include <fog_vertex>
}`,Op=`uniform vec3 diffuse;
uniform float opacity;
#include <common>
#include <color_pars_fragment>
#include <map_particle_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <fog_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	vec3 outgoingLight = vec3( 0.0 );
	#include <logdepthbuf_fragment>
	#include <map_particle_fragment>
	#include <color_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	outgoingLight = diffuseColor.rgb;
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
}`,Bp=`#include <common>
#include <batching_pars_vertex>
#include <fog_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <shadowmap_pars_vertex>
void main() {
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphinstance_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <worldpos_vertex>
	#include <shadowmap_vertex>
	#include <fog_vertex>
}`,zp=`uniform vec3 color;
uniform float opacity;
#include <common>
#include <packing>
#include <fog_pars_fragment>
#include <bsdfs>
#include <lights_pars_begin>
#include <logdepthbuf_pars_fragment>
#include <shadowmap_pars_fragment>
#include <shadowmask_pars_fragment>
void main() {
	#include <logdepthbuf_fragment>
	gl_FragColor = vec4( color, opacity * ( 1.0 - getShadowMask() ) );
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
}`,Hp=`uniform float rotation;
uniform vec2 center;
#include <common>
#include <uv_pars_vertex>
#include <fog_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	vec4 mvPosition = modelViewMatrix[ 3 ];
	vec2 scale = vec2( length( modelMatrix[ 0 ].xyz ), length( modelMatrix[ 1 ].xyz ) );
	#ifndef USE_SIZEATTENUATION
		bool isPerspective = isPerspectiveMatrix( projectionMatrix );
		if ( isPerspective ) scale *= - mvPosition.z;
	#endif
	vec2 alignedPosition = ( position.xy - ( center - vec2( 0.5 ) ) ) * scale;
	vec2 rotatedPosition;
	rotatedPosition.x = cos( rotation ) * alignedPosition.x - sin( rotation ) * alignedPosition.y;
	rotatedPosition.y = sin( rotation ) * alignedPosition.x + cos( rotation ) * alignedPosition.y;
	mvPosition.xy += rotatedPosition;
	gl_Position = projectionMatrix * mvPosition;
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	#include <fog_vertex>
}`,Vp=`uniform vec3 diffuse;
uniform float opacity;
#include <common>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <fog_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	vec3 outgoingLight = vec3( 0.0 );
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	outgoingLight = diffuseColor.rgb;
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
}`,De={alphahash_fragment:cf,alphahash_pars_fragment:uf,alphamap_fragment:hf,alphamap_pars_fragment:ff,alphatest_fragment:df,alphatest_pars_fragment:pf,aomap_fragment:mf,aomap_pars_fragment:_f,batching_pars_vertex:gf,batching_vertex:vf,begin_vertex:xf,beginnormal_vertex:Mf,bsdfs:Sf,iridescence_fragment:Ef,bumpmap_pars_fragment:yf,clipping_planes_fragment:Tf,clipping_planes_pars_fragment:bf,clipping_planes_pars_vertex:Af,clipping_planes_vertex:wf,color_fragment:Rf,color_pars_fragment:Cf,color_pars_vertex:Pf,color_vertex:Df,common:Lf,cube_uv_reflection_fragment:Uf,defaultnormal_vertex:If,displacementmap_pars_vertex:Nf,displacementmap_vertex:Ff,emissivemap_fragment:Of,emissivemap_pars_fragment:Bf,colorspace_fragment:zf,colorspace_pars_fragment:Hf,envmap_fragment:Vf,envmap_common_pars_fragment:Gf,envmap_pars_fragment:kf,envmap_pars_vertex:Wf,envmap_physical_pars_fragment:td,envmap_vertex:Xf,fog_vertex:qf,fog_pars_vertex:Yf,fog_fragment:$f,fog_pars_fragment:Zf,gradientmap_pars_fragment:Kf,lightmap_pars_fragment:jf,lights_lambert_fragment:Jf,lights_lambert_pars_fragment:Qf,lights_pars_begin:ed,lights_toon_fragment:nd,lights_toon_pars_fragment:id,lights_phong_fragment:rd,lights_phong_pars_fragment:sd,lights_physical_fragment:ad,lights_physical_pars_fragment:od,lights_fragment_begin:ld,lights_fragment_maps:cd,lights_fragment_end:ud,logdepthbuf_fragment:hd,logdepthbuf_pars_fragment:fd,logdepthbuf_pars_vertex:dd,logdepthbuf_vertex:pd,map_fragment:md,map_pars_fragment:_d,map_particle_fragment:gd,map_particle_pars_fragment:vd,metalnessmap_fragment:xd,metalnessmap_pars_fragment:Md,morphinstance_vertex:Sd,morphcolor_vertex:Ed,morphnormal_vertex:yd,morphtarget_pars_vertex:Td,morphtarget_vertex:bd,normal_fragment_begin:Ad,normal_fragment_maps:wd,normal_pars_fragment:Rd,normal_pars_vertex:Cd,normal_vertex:Pd,normalmap_pars_fragment:Dd,clearcoat_normal_fragment_begin:Ld,clearcoat_normal_fragment_maps:Ud,clearcoat_pars_fragment:Id,iridescence_pars_fragment:Nd,opaque_fragment:Fd,packing:Od,premultiplied_alpha_fragment:Bd,project_vertex:zd,dithering_fragment:Hd,dithering_pars_fragment:Vd,roughnessmap_fragment:Gd,roughnessmap_pars_fragment:kd,shadowmap_pars_fragment:Wd,shadowmap_pars_vertex:Xd,shadowmap_vertex:qd,shadowmask_pars_fragment:Yd,skinbase_vertex:$d,skinning_pars_vertex:Zd,skinning_vertex:Kd,skinnormal_vertex:jd,specularmap_fragment:Jd,specularmap_pars_fragment:Qd,tonemapping_fragment:ep,tonemapping_pars_fragment:tp,transmission_fragment:np,transmission_pars_fragment:ip,uv_pars_fragment:rp,uv_pars_vertex:sp,uv_vertex:ap,worldpos_vertex:op,background_vert:lp,background_frag:cp,backgroundCube_vert:up,backgroundCube_frag:hp,cube_vert:fp,cube_frag:dp,depth_vert:pp,depth_frag:mp,distanceRGBA_vert:_p,distanceRGBA_frag:gp,equirect_vert:vp,equirect_frag:xp,linedashed_vert:Mp,linedashed_frag:Sp,meshbasic_vert:Ep,meshbasic_frag:yp,meshlambert_vert:Tp,meshlambert_frag:bp,meshmatcap_vert:Ap,meshmatcap_frag:wp,meshnormal_vert:Rp,meshnormal_frag:Cp,meshphong_vert:Pp,meshphong_frag:Dp,meshphysical_vert:Lp,meshphysical_frag:Up,meshtoon_vert:Ip,meshtoon_frag:Np,points_vert:Fp,points_frag:Op,shadow_vert:Bp,shadow_frag:zp,sprite_vert:Hp,sprite_frag:Vp},ne={common:{diffuse:{value:new ze(16777215)},opacity:{value:1},map:{value:null},mapTransform:{value:new Ce},alphaMap:{value:null},alphaMapTransform:{value:new Ce},alphaTest:{value:0}},specularmap:{specularMap:{value:null},specularMapTransform:{value:new Ce}},envmap:{envMap:{value:null},envMapRotation:{value:new Ce},flipEnvMap:{value:-1},reflectivity:{value:1},ior:{value:1.5},refractionRatio:{value:.98}},aomap:{aoMap:{value:null},aoMapIntensity:{value:1},aoMapTransform:{value:new Ce}},lightmap:{lightMap:{value:null},lightMapIntensity:{value:1},lightMapTransform:{value:new Ce}},bumpmap:{bumpMap:{value:null},bumpMapTransform:{value:new Ce},bumpScale:{value:1}},normalmap:{normalMap:{value:null},normalMapTransform:{value:new Ce},normalScale:{value:new qe(1,1)}},displacementmap:{displacementMap:{value:null},displacementMapTransform:{value:new Ce},displacementScale:{value:1},displacementBias:{value:0}},emissivemap:{emissiveMap:{value:null},emissiveMapTransform:{value:new Ce}},metalnessmap:{metalnessMap:{value:null},metalnessMapTransform:{value:new Ce}},roughnessmap:{roughnessMap:{value:null},roughnessMapTransform:{value:new Ce}},gradientmap:{gradientMap:{value:null}},fog:{fogDensity:{value:25e-5},fogNear:{value:1},fogFar:{value:2e3},fogColor:{value:new ze(16777215)}},lights:{ambientLightColor:{value:[]},lightProbe:{value:[]},directionalLights:{value:[],properties:{direction:{},color:{}}},directionalLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{}}},directionalShadowMap:{value:[]},directionalShadowMatrix:{value:[]},spotLights:{value:[],properties:{color:{},position:{},direction:{},distance:{},coneCos:{},penumbraCos:{},decay:{}}},spotLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{}}},spotLightMap:{value:[]},spotShadowMap:{value:[]},spotLightMatrix:{value:[]},pointLights:{value:[],properties:{color:{},position:{},decay:{},distance:{}}},pointLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{},shadowCameraNear:{},shadowCameraFar:{}}},pointShadowMap:{value:[]},pointShadowMatrix:{value:[]},hemisphereLights:{value:[],properties:{direction:{},skyColor:{},groundColor:{}}},rectAreaLights:{value:[],properties:{color:{},position:{},width:{},height:{}}},ltc_1:{value:null},ltc_2:{value:null}},points:{diffuse:{value:new ze(16777215)},opacity:{value:1},size:{value:1},scale:{value:1},map:{value:null},alphaMap:{value:null},alphaMapTransform:{value:new Ce},alphaTest:{value:0},uvTransform:{value:new Ce}},sprite:{diffuse:{value:new ze(16777215)},opacity:{value:1},center:{value:new qe(.5,.5)},rotation:{value:0},map:{value:null},mapTransform:{value:new Ce},alphaMap:{value:null},alphaMapTransform:{value:new Ce},alphaTest:{value:0}}},Zt={basic:{uniforms:Mt([ne.common,ne.specularmap,ne.envmap,ne.aomap,ne.lightmap,ne.fog]),vertexShader:De.meshbasic_vert,fragmentShader:De.meshbasic_frag},lambert:{uniforms:Mt([ne.common,ne.specularmap,ne.envmap,ne.aomap,ne.lightmap,ne.emissivemap,ne.bumpmap,ne.normalmap,ne.displacementmap,ne.fog,ne.lights,{emissive:{value:new ze(0)}}]),vertexShader:De.meshlambert_vert,fragmentShader:De.meshlambert_frag},phong:{uniforms:Mt([ne.common,ne.specularmap,ne.envmap,ne.aomap,ne.lightmap,ne.emissivemap,ne.bumpmap,ne.normalmap,ne.displacementmap,ne.fog,ne.lights,{emissive:{value:new ze(0)},specular:{value:new ze(1118481)},shininess:{value:30}}]),vertexShader:De.meshphong_vert,fragmentShader:De.meshphong_frag},standard:{uniforms:Mt([ne.common,ne.envmap,ne.aomap,ne.lightmap,ne.emissivemap,ne.bumpmap,ne.normalmap,ne.displacementmap,ne.roughnessmap,ne.metalnessmap,ne.fog,ne.lights,{emissive:{value:new ze(0)},roughness:{value:1},metalness:{value:0},envMapIntensity:{value:1}}]),vertexShader:De.meshphysical_vert,fragmentShader:De.meshphysical_frag},toon:{uniforms:Mt([ne.common,ne.aomap,ne.lightmap,ne.emissivemap,ne.bumpmap,ne.normalmap,ne.displacementmap,ne.gradientmap,ne.fog,ne.lights,{emissive:{value:new ze(0)}}]),vertexShader:De.meshtoon_vert,fragmentShader:De.meshtoon_frag},matcap:{uniforms:Mt([ne.common,ne.bumpmap,ne.normalmap,ne.displacementmap,ne.fog,{matcap:{value:null}}]),vertexShader:De.meshmatcap_vert,fragmentShader:De.meshmatcap_frag},points:{uniforms:Mt([ne.points,ne.fog]),vertexShader:De.points_vert,fragmentShader:De.points_frag},dashed:{uniforms:Mt([ne.common,ne.fog,{scale:{value:1},dashSize:{value:1},totalSize:{value:2}}]),vertexShader:De.linedashed_vert,fragmentShader:De.linedashed_frag},depth:{uniforms:Mt([ne.common,ne.displacementmap]),vertexShader:De.depth_vert,fragmentShader:De.depth_frag},normal:{uniforms:Mt([ne.common,ne.bumpmap,ne.normalmap,ne.displacementmap,{opacity:{value:1}}]),vertexShader:De.meshnormal_vert,fragmentShader:De.meshnormal_frag},sprite:{uniforms:Mt([ne.sprite,ne.fog]),vertexShader:De.sprite_vert,fragmentShader:De.sprite_frag},background:{uniforms:{uvTransform:{value:new Ce},t2D:{value:null},backgroundIntensity:{value:1}},vertexShader:De.background_vert,fragmentShader:De.background_frag},backgroundCube:{uniforms:{envMap:{value:null},flipEnvMap:{value:-1},backgroundBlurriness:{value:0},backgroundIntensity:{value:1},backgroundRotation:{value:new Ce}},vertexShader:De.backgroundCube_vert,fragmentShader:De.backgroundCube_frag},cube:{uniforms:{tCube:{value:null},tFlip:{value:-1},opacity:{value:1}},vertexShader:De.cube_vert,fragmentShader:De.cube_frag},equirect:{uniforms:{tEquirect:{value:null}},vertexShader:De.equirect_vert,fragmentShader:De.equirect_frag},distanceRGBA:{uniforms:Mt([ne.common,ne.displacementmap,{referencePosition:{value:new B},nearDistance:{value:1},farDistance:{value:1e3}}]),vertexShader:De.distanceRGBA_vert,fragmentShader:De.distanceRGBA_frag},shadow:{uniforms:Mt([ne.lights,ne.fog,{color:{value:new ze(0)},opacity:{value:1}}]),vertexShader:De.shadow_vert,fragmentShader:De.shadow_frag}};Zt.physical={uniforms:Mt([Zt.standard.uniforms,{clearcoat:{value:0},clearcoatMap:{value:null},clearcoatMapTransform:{value:new Ce},clearcoatNormalMap:{value:null},clearcoatNormalMapTransform:{value:new Ce},clearcoatNormalScale:{value:new qe(1,1)},clearcoatRoughness:{value:0},clearcoatRoughnessMap:{value:null},clearcoatRoughnessMapTransform:{value:new Ce},dispersion:{value:0},iridescence:{value:0},iridescenceMap:{value:null},iridescenceMapTransform:{value:new Ce},iridescenceIOR:{value:1.3},iridescenceThicknessMinimum:{value:100},iridescenceThicknessMaximum:{value:400},iridescenceThicknessMap:{value:null},iridescenceThicknessMapTransform:{value:new Ce},sheen:{value:0},sheenColor:{value:new ze(0)},sheenColorMap:{value:null},sheenColorMapTransform:{value:new Ce},sheenRoughness:{value:1},sheenRoughnessMap:{value:null},sheenRoughnessMapTransform:{value:new Ce},transmission:{value:0},transmissionMap:{value:null},transmissionMapTransform:{value:new Ce},transmissionSamplerSize:{value:new qe},transmissionSamplerMap:{value:null},thickness:{value:0},thicknessMap:{value:null},thicknessMapTransform:{value:new Ce},attenuationDistance:{value:0},attenuationColor:{value:new ze(0)},specularColor:{value:new ze(1,1,1)},specularColorMap:{value:null},specularColorMapTransform:{value:new Ce},specularIntensity:{value:1},specularIntensityMap:{value:null},specularIntensityMapTransform:{value:new Ce},anisotropyVector:{value:new qe},anisotropyMap:{value:null},anisotropyMapTransform:{value:new Ce}}]),vertexShader:De.meshphysical_vert,fragmentShader:De.meshphysical_frag};const ur={r:0,b:0,g:0},Dn=new Yt,Gp=new st;function kp(n,e,t,i,r,s,a){const o=new ze(0);let c=s===!0?0:1,l,h,u=null,d=0,m=null;function g(T){let E=T.isScene===!0?T.background:null;return E&&E.isTexture&&(E=(T.backgroundBlurriness>0?t:e).get(E)),E}function M(T){let E=!1;const C=g(T);C===null?f(o,c):C&&C.isColor&&(f(C,1),E=!0);const A=n.xr.getEnvironmentBlendMode();A==="additive"?i.buffers.color.setClear(0,0,0,1,a):A==="alpha-blend"&&i.buffers.color.setClear(0,0,0,0,a),(n.autoClear||E)&&(i.buffers.depth.setTest(!0),i.buffers.depth.setMask(!0),i.buffers.color.setMask(!0),n.clear(n.autoClearColor,n.autoClearDepth,n.autoClearStencil))}function p(T,E){const C=g(E);C&&(C.isCubeTexture||C.mapping===Rr)?(h===void 0&&(h=new Xt(new Hi(1,1,1),new yn({name:"BackgroundCubeMaterial",uniforms:xi(Zt.backgroundCube.uniforms),vertexShader:Zt.backgroundCube.vertexShader,fragmentShader:Zt.backgroundCube.fragmentShader,side:yt,depthTest:!1,depthWrite:!1,fog:!1})),h.geometry.deleteAttribute("normal"),h.geometry.deleteAttribute("uv"),h.onBeforeRender=function(A,P,I){this.matrixWorld.copyPosition(I.matrixWorld)},Object.defineProperty(h.material,"envMap",{get:function(){return this.uniforms.envMap.value}}),r.update(h)),Dn.copy(E.backgroundRotation),Dn.x*=-1,Dn.y*=-1,Dn.z*=-1,C.isCubeTexture&&C.isRenderTargetTexture===!1&&(Dn.y*=-1,Dn.z*=-1),h.material.uniforms.envMap.value=C,h.material.uniforms.flipEnvMap.value=C.isCubeTexture&&C.isRenderTargetTexture===!1?-1:1,h.material.uniforms.backgroundBlurriness.value=E.backgroundBlurriness,h.material.uniforms.backgroundIntensity.value=E.backgroundIntensity,h.material.uniforms.backgroundRotation.value.setFromMatrix4(Gp.makeRotationFromEuler(Dn)),h.material.toneMapped=ke.getTransfer(C.colorSpace)!==Ke,(u!==C||d!==C.version||m!==n.toneMapping)&&(h.material.needsUpdate=!0,u=C,d=C.version,m=n.toneMapping),h.layers.enableAll(),T.unshift(h,h.geometry,h.material,0,0,null)):C&&C.isTexture&&(l===void 0&&(l=new Xt(new Vi(2,2),new yn({name:"BackgroundMaterial",uniforms:xi(Zt.background.uniforms),vertexShader:Zt.background.vertexShader,fragmentShader:Zt.background.fragmentShader,side:En,depthTest:!1,depthWrite:!1,fog:!1})),l.geometry.deleteAttribute("normal"),Object.defineProperty(l.material,"map",{get:function(){return this.uniforms.t2D.value}}),r.update(l)),l.material.uniforms.t2D.value=C,l.material.uniforms.backgroundIntensity.value=E.backgroundIntensity,l.material.toneMapped=ke.getTransfer(C.colorSpace)!==Ke,C.matrixAutoUpdate===!0&&C.updateMatrix(),l.material.uniforms.uvTransform.value.copy(C.matrix),(u!==C||d!==C.version||m!==n.toneMapping)&&(l.material.needsUpdate=!0,u=C,d=C.version,m=n.toneMapping),l.layers.enableAll(),T.unshift(l,l.geometry,l.material,0,0,null))}function f(T,E){T.getRGB(ur,_l(n)),i.buffers.color.setClear(ur.r,ur.g,ur.b,E,a)}function w(){h!==void 0&&(h.geometry.dispose(),h.material.dispose(),h=void 0),l!==void 0&&(l.geometry.dispose(),l.material.dispose(),l=void 0)}return{getClearColor:function(){return o},setClearColor:function(T,E=1){o.set(T),c=E,f(o,c)},getClearAlpha:function(){return c},setClearAlpha:function(T){c=T,f(o,c)},render:M,addToRenderList:p,dispose:w}}function Wp(n,e){const t=n.getParameter(n.MAX_VERTEX_ATTRIBS),i={},r=d(null);let s=r,a=!1;function o(x,b,W,N,k){let Z=!1;const G=u(N,W,b);s!==G&&(s=G,l(s.object)),Z=m(x,N,W,k),Z&&g(x,N,W,k),k!==null&&e.update(k,n.ELEMENT_ARRAY_BUFFER),(Z||a)&&(a=!1,E(x,b,W,N),k!==null&&n.bindBuffer(n.ELEMENT_ARRAY_BUFFER,e.get(k).buffer))}function c(){return n.createVertexArray()}function l(x){return n.bindVertexArray(x)}function h(x){return n.deleteVertexArray(x)}function u(x,b,W){const N=W.wireframe===!0;let k=i[x.id];k===void 0&&(k={},i[x.id]=k);let Z=k[b.id];Z===void 0&&(Z={},k[b.id]=Z);let G=Z[N];return G===void 0&&(G=d(c()),Z[N]=G),G}function d(x){const b=[],W=[],N=[];for(let k=0;k<t;k++)b[k]=0,W[k]=0,N[k]=0;return{geometry:null,program:null,wireframe:!1,newAttributes:b,enabledAttributes:W,attributeDivisors:N,object:x,attributes:{},index:null}}function m(x,b,W,N){const k=s.attributes,Z=b.attributes;let G=0;const J=W.getAttributes();for(const H in J)if(J[H].location>=0){const ce=k[H];let ve=Z[H];if(ve===void 0&&(H==="instanceMatrix"&&x.instanceMatrix&&(ve=x.instanceMatrix),H==="instanceColor"&&x.instanceColor&&(ve=x.instanceColor)),ce===void 0||ce.attribute!==ve||ve&&ce.data!==ve.data)return!0;G++}return s.attributesNum!==G||s.index!==N}function g(x,b,W,N){const k={},Z=b.attributes;let G=0;const J=W.getAttributes();for(const H in J)if(J[H].location>=0){let ce=Z[H];ce===void 0&&(H==="instanceMatrix"&&x.instanceMatrix&&(ce=x.instanceMatrix),H==="instanceColor"&&x.instanceColor&&(ce=x.instanceColor));const ve={};ve.attribute=ce,ce&&ce.data&&(ve.data=ce.data),k[H]=ve,G++}s.attributes=k,s.attributesNum=G,s.index=N}function M(){const x=s.newAttributes;for(let b=0,W=x.length;b<W;b++)x[b]=0}function p(x){f(x,0)}function f(x,b){const W=s.newAttributes,N=s.enabledAttributes,k=s.attributeDivisors;W[x]=1,N[x]===0&&(n.enableVertexAttribArray(x),N[x]=1),k[x]!==b&&(n.vertexAttribDivisor(x,b),k[x]=b)}function w(){const x=s.newAttributes,b=s.enabledAttributes;for(let W=0,N=b.length;W<N;W++)b[W]!==x[W]&&(n.disableVertexAttribArray(W),b[W]=0)}function T(x,b,W,N,k,Z,G){G===!0?n.vertexAttribIPointer(x,b,W,k,Z):n.vertexAttribPointer(x,b,W,N,k,Z)}function E(x,b,W,N){M();const k=N.attributes,Z=W.getAttributes(),G=b.defaultAttributeValues;for(const J in Z){const H=Z[J];if(H.location>=0){let Q=k[J];if(Q===void 0&&(J==="instanceMatrix"&&x.instanceMatrix&&(Q=x.instanceMatrix),J==="instanceColor"&&x.instanceColor&&(Q=x.instanceColor)),Q!==void 0){const ce=Q.normalized,ve=Q.itemSize,Le=e.get(Q);if(Le===void 0)continue;const je=Le.buffer,q=Le.type,te=Le.bytesPerElement,me=q===n.INT||q===n.UNSIGNED_INT||Q.gpuType===sa;if(Q.isInterleavedBufferAttribute){const se=Q.data,ye=se.stride,We=Q.offset;if(se.isInstancedInterleavedBuffer){for(let Te=0;Te<H.locationSize;Te++)f(H.location+Te,se.meshPerAttribute);x.isInstancedMesh!==!0&&N._maxInstanceCount===void 0&&(N._maxInstanceCount=se.meshPerAttribute*se.count)}else for(let Te=0;Te<H.locationSize;Te++)p(H.location+Te);n.bindBuffer(n.ARRAY_BUFFER,je);for(let Te=0;Te<H.locationSize;Te++)T(H.location+Te,ve/H.locationSize,q,ce,ye*te,(We+ve/H.locationSize*Te)*te,me)}else{if(Q.isInstancedBufferAttribute){for(let se=0;se<H.locationSize;se++)f(H.location+se,Q.meshPerAttribute);x.isInstancedMesh!==!0&&N._maxInstanceCount===void 0&&(N._maxInstanceCount=Q.meshPerAttribute*Q.count)}else for(let se=0;se<H.locationSize;se++)p(H.location+se);n.bindBuffer(n.ARRAY_BUFFER,je);for(let se=0;se<H.locationSize;se++)T(H.location+se,ve/H.locationSize,q,ce,ve*te,ve/H.locationSize*se*te,me)}}else if(G!==void 0){const ce=G[J];if(ce!==void 0)switch(ce.length){case 2:n.vertexAttrib2fv(H.location,ce);break;case 3:n.vertexAttrib3fv(H.location,ce);break;case 4:n.vertexAttrib4fv(H.location,ce);break;default:n.vertexAttrib1fv(H.location,ce)}}}}w()}function C(){I();for(const x in i){const b=i[x];for(const W in b){const N=b[W];for(const k in N)h(N[k].object),delete N[k];delete b[W]}delete i[x]}}function A(x){if(i[x.id]===void 0)return;const b=i[x.id];for(const W in b){const N=b[W];for(const k in N)h(N[k].object),delete N[k];delete b[W]}delete i[x.id]}function P(x){for(const b in i){const W=i[b];if(W[x.id]===void 0)continue;const N=W[x.id];for(const k in N)h(N[k].object),delete N[k];delete W[x.id]}}function I(){S(),a=!0,s!==r&&(s=r,l(s.object))}function S(){r.geometry=null,r.program=null,r.wireframe=!1}return{setup:o,reset:I,resetDefaultState:S,dispose:C,releaseStatesOfGeometry:A,releaseStatesOfProgram:P,initAttributes:M,enableAttribute:p,disableUnusedAttributes:w}}function Xp(n,e,t){let i;function r(l){i=l}function s(l,h){n.drawArrays(i,l,h),t.update(h,i,1)}function a(l,h,u){u!==0&&(n.drawArraysInstanced(i,l,h,u),t.update(h,i,u))}function o(l,h,u){if(u===0)return;e.get("WEBGL_multi_draw").multiDrawArraysWEBGL(i,l,0,h,0,u);let m=0;for(let g=0;g<u;g++)m+=h[g];t.update(m,i,1)}function c(l,h,u,d){if(u===0)return;const m=e.get("WEBGL_multi_draw");if(m===null)for(let g=0;g<l.length;g++)a(l[g],h[g],d[g]);else{m.multiDrawArraysInstancedWEBGL(i,l,0,h,0,d,0,u);let g=0;for(let M=0;M<u;M++)g+=h[M]*d[M];t.update(g,i,1)}}this.setMode=r,this.render=s,this.renderInstances=a,this.renderMultiDraw=o,this.renderMultiDrawInstances=c}function qp(n,e,t,i){let r;function s(){if(r!==void 0)return r;if(e.has("EXT_texture_filter_anisotropic")===!0){const P=e.get("EXT_texture_filter_anisotropic");r=n.getParameter(P.MAX_TEXTURE_MAX_ANISOTROPY_EXT)}else r=0;return r}function a(P){return!(P!==Wt&&i.convert(P)!==n.getParameter(n.IMPLEMENTATION_COLOR_READ_FORMAT))}function o(P){const I=P===Oi&&(e.has("EXT_color_buffer_half_float")||e.has("EXT_color_buffer_float"));return!(P!==un&&i.convert(P)!==n.getParameter(n.IMPLEMENTATION_COLOR_READ_TYPE)&&P!==on&&!I)}function c(P){if(P==="highp"){if(n.getShaderPrecisionFormat(n.VERTEX_SHADER,n.HIGH_FLOAT).precision>0&&n.getShaderPrecisionFormat(n.FRAGMENT_SHADER,n.HIGH_FLOAT).precision>0)return"highp";P="mediump"}return P==="mediump"&&n.getShaderPrecisionFormat(n.VERTEX_SHADER,n.MEDIUM_FLOAT).precision>0&&n.getShaderPrecisionFormat(n.FRAGMENT_SHADER,n.MEDIUM_FLOAT).precision>0?"mediump":"lowp"}let l=t.precision!==void 0?t.precision:"highp";const h=c(l);h!==l&&(console.warn("THREE.WebGLRenderer:",l,"not supported, using",h,"instead."),l=h);const u=t.logarithmicDepthBuffer===!0,d=t.reverseDepthBuffer===!0&&e.has("EXT_clip_control"),m=n.getParameter(n.MAX_TEXTURE_IMAGE_UNITS),g=n.getParameter(n.MAX_VERTEX_TEXTURE_IMAGE_UNITS),M=n.getParameter(n.MAX_TEXTURE_SIZE),p=n.getParameter(n.MAX_CUBE_MAP_TEXTURE_SIZE),f=n.getParameter(n.MAX_VERTEX_ATTRIBS),w=n.getParameter(n.MAX_VERTEX_UNIFORM_VECTORS),T=n.getParameter(n.MAX_VARYING_VECTORS),E=n.getParameter(n.MAX_FRAGMENT_UNIFORM_VECTORS),C=g>0,A=n.getParameter(n.MAX_SAMPLES);return{isWebGL2:!0,getMaxAnisotropy:s,getMaxPrecision:c,textureFormatReadable:a,textureTypeReadable:o,precision:l,logarithmicDepthBuffer:u,reverseDepthBuffer:d,maxTextures:m,maxVertexTextures:g,maxTextureSize:M,maxCubemapSize:p,maxAttributes:f,maxVertexUniforms:w,maxVaryings:T,maxFragmentUniforms:E,vertexTextures:C,maxSamples:A}}function Yp(n){const e=this;let t=null,i=0,r=!1,s=!1;const a=new Un,o=new Ce,c={value:null,needsUpdate:!1};this.uniform=c,this.numPlanes=0,this.numIntersection=0,this.init=function(u,d){const m=u.length!==0||d||i!==0||r;return r=d,i=u.length,m},this.beginShadows=function(){s=!0,h(null)},this.endShadows=function(){s=!1},this.setGlobalState=function(u,d){t=h(u,d,0)},this.setState=function(u,d,m){const g=u.clippingPlanes,M=u.clipIntersection,p=u.clipShadows,f=n.get(u);if(!r||g===null||g.length===0||s&&!p)s?h(null):l();else{const w=s?0:i,T=w*4;let E=f.clippingState||null;c.value=E,E=h(g,d,T,m);for(let C=0;C!==T;++C)E[C]=t[C];f.clippingState=E,this.numIntersection=M?this.numPlanes:0,this.numPlanes+=w}};function l(){c.value!==t&&(c.value=t,c.needsUpdate=i>0),e.numPlanes=i,e.numIntersection=0}function h(u,d,m,g){const M=u!==null?u.length:0;let p=null;if(M!==0){if(p=c.value,g!==!0||p===null){const f=m+M*4,w=d.matrixWorldInverse;o.getNormalMatrix(w),(p===null||p.length<f)&&(p=new Float32Array(f));for(let T=0,E=m;T!==M;++T,E+=4)a.copy(u[T]).applyMatrix4(w,o),a.normal.toArray(p,E),p[E+3]=a.constant}c.value=p,c.needsUpdate=!0}return e.numPlanes=M,e.numIntersection=0,p}}function $p(n){let e=new WeakMap;function t(a,o){return o===Ms?a.mapping=pi:o===Ss&&(a.mapping=mi),a}function i(a){if(a&&a.isTexture){const o=a.mapping;if(o===Ms||o===Ss)if(e.has(a)){const c=e.get(a).texture;return t(c,a.mapping)}else{const c=a.image;if(c&&c.height>0){const l=new Xh(c.height);return l.fromEquirectangularTexture(n,a),e.set(a,l),a.addEventListener("dispose",r),t(l.texture,a.mapping)}else return null}}return a}function r(a){const o=a.target;o.removeEventListener("dispose",r);const c=e.get(o);c!==void 0&&(e.delete(o),c.dispose())}function s(){e=new WeakMap}return{get:i,dispose:s}}const li=4,lo=[.125,.215,.35,.446,.526,.582],Fn=20,ts=new Sl,co=new ze;let ns=null,is=0,rs=0,ss=!1;const In=(1+Math.sqrt(5))/2,si=1/In,uo=[new B(-In,si,0),new B(In,si,0),new B(-si,0,In),new B(si,0,In),new B(0,In,-si),new B(0,In,si),new B(-1,1,-1),new B(1,1,-1),new B(-1,1,1),new B(1,1,1)];class ho{constructor(e){this._renderer=e,this._pingPongRenderTarget=null,this._lodMax=0,this._cubeSize=0,this._lodPlanes=[],this._sizeLods=[],this._sigmas=[],this._blurMaterial=null,this._cubemapMaterial=null,this._equirectMaterial=null,this._compileMaterial(this._blurMaterial)}fromScene(e,t=0,i=.1,r=100){ns=this._renderer.getRenderTarget(),is=this._renderer.getActiveCubeFace(),rs=this._renderer.getActiveMipmapLevel(),ss=this._renderer.xr.enabled,this._renderer.xr.enabled=!1,this._setSize(256);const s=this._allocateTargets();return s.depthBuffer=!0,this._sceneToCubeUV(e,i,r,s),t>0&&this._blur(s,0,0,t),this._applyPMREM(s),this._cleanup(s),s}fromEquirectangular(e,t=null){return this._fromTexture(e,t)}fromCubemap(e,t=null){return this._fromTexture(e,t)}compileCubemapShader(){this._cubemapMaterial===null&&(this._cubemapMaterial=mo(),this._compileMaterial(this._cubemapMaterial))}compileEquirectangularShader(){this._equirectMaterial===null&&(this._equirectMaterial=po(),this._compileMaterial(this._equirectMaterial))}dispose(){this._dispose(),this._cubemapMaterial!==null&&this._cubemapMaterial.dispose(),this._equirectMaterial!==null&&this._equirectMaterial.dispose()}_setSize(e){this._lodMax=Math.floor(Math.log2(e)),this._cubeSize=Math.pow(2,this._lodMax)}_dispose(){this._blurMaterial!==null&&this._blurMaterial.dispose(),this._pingPongRenderTarget!==null&&this._pingPongRenderTarget.dispose();for(let e=0;e<this._lodPlanes.length;e++)this._lodPlanes[e].dispose()}_cleanup(e){this._renderer.setRenderTarget(ns,is,rs),this._renderer.xr.enabled=ss,e.scissorTest=!1,hr(e,0,0,e.width,e.height)}_fromTexture(e,t){e.mapping===pi||e.mapping===mi?this._setSize(e.image.length===0?16:e.image[0].width||e.image[0].image.width):this._setSize(e.image.width/4),ns=this._renderer.getRenderTarget(),is=this._renderer.getActiveCubeFace(),rs=this._renderer.getActiveMipmapLevel(),ss=this._renderer.xr.enabled,this._renderer.xr.enabled=!1;const i=t||this._allocateTargets();return this._textureToCubeUV(e,i),this._applyPMREM(i),this._cleanup(i),i}_allocateTargets(){const e=3*Math.max(this._cubeSize,112),t=4*this._cubeSize,i={magFilter:jt,minFilter:jt,generateMipmaps:!1,type:Oi,format:Wt,colorSpace:vi,depthBuffer:!1},r=fo(e,t,i);if(this._pingPongRenderTarget===null||this._pingPongRenderTarget.width!==e||this._pingPongRenderTarget.height!==t){this._pingPongRenderTarget!==null&&this._dispose(),this._pingPongRenderTarget=fo(e,t,i);const{_lodMax:s}=this;({sizeLods:this._sizeLods,lodPlanes:this._lodPlanes,sigmas:this._sigmas}=Zp(s)),this._blurMaterial=Kp(s,e,t)}return r}_compileMaterial(e){const t=new Xt(this._lodPlanes[0],e);this._renderer.compile(t,ts)}_sceneToCubeUV(e,t,i,r){const o=new Ut(90,1,t,i),c=[1,-1,1,1,1,1],l=[1,1,1,-1,-1,-1],h=this._renderer,u=h.autoClear,d=h.toneMapping;h.getClearColor(co),h.toneMapping=Mn,h.autoClear=!1;const m=new dl({name:"PMREM.Background",side:yt,depthWrite:!1,depthTest:!1}),g=new Xt(new Hi,m);let M=!1;const p=e.background;p?p.isColor&&(m.color.copy(p),e.background=null,M=!0):(m.color.copy(co),M=!0);for(let f=0;f<6;f++){const w=f%3;w===0?(o.up.set(0,c[f],0),o.lookAt(l[f],0,0)):w===1?(o.up.set(0,0,c[f]),o.lookAt(0,l[f],0)):(o.up.set(0,c[f],0),o.lookAt(0,0,l[f]));const T=this._cubeSize;hr(r,w*T,f>2?T:0,T,T),h.setRenderTarget(r),M&&h.render(g,o),h.render(e,o)}g.geometry.dispose(),g.material.dispose(),h.toneMapping=d,h.autoClear=u,e.background=p}_textureToCubeUV(e,t){const i=this._renderer,r=e.mapping===pi||e.mapping===mi;r?(this._cubemapMaterial===null&&(this._cubemapMaterial=mo()),this._cubemapMaterial.uniforms.flipEnvMap.value=e.isRenderTargetTexture===!1?-1:1):this._equirectMaterial===null&&(this._equirectMaterial=po());const s=r?this._cubemapMaterial:this._equirectMaterial,a=new Xt(this._lodPlanes[0],s),o=s.uniforms;o.envMap.value=e;const c=this._cubeSize;hr(t,0,0,3*c,2*c),i.setRenderTarget(t),i.render(a,ts)}_applyPMREM(e){const t=this._renderer,i=t.autoClear;t.autoClear=!1;const r=this._lodPlanes.length;for(let s=1;s<r;s++){const a=Math.sqrt(this._sigmas[s]*this._sigmas[s]-this._sigmas[s-1]*this._sigmas[s-1]),o=uo[(r-s-1)%uo.length];this._blur(e,s-1,s,a,o)}t.autoClear=i}_blur(e,t,i,r,s){const a=this._pingPongRenderTarget;this._halfBlur(e,a,t,i,r,"latitudinal",s),this._halfBlur(a,e,i,i,r,"longitudinal",s)}_halfBlur(e,t,i,r,s,a,o){const c=this._renderer,l=this._blurMaterial;a!=="latitudinal"&&a!=="longitudinal"&&console.error("blur direction must be either latitudinal or longitudinal!");const h=3,u=new Xt(this._lodPlanes[r],l),d=l.uniforms,m=this._sizeLods[i]-1,g=isFinite(s)?Math.PI/(2*m):2*Math.PI/(2*Fn-1),M=s/g,p=isFinite(s)?1+Math.floor(h*M):Fn;p>Fn&&console.warn(`sigmaRadians, ${s}, is too large and will clip, as it requested ${p} samples when the maximum is set to ${Fn}`);const f=[];let w=0;for(let P=0;P<Fn;++P){const I=P/M,S=Math.exp(-I*I/2);f.push(S),P===0?w+=S:P<p&&(w+=2*S)}for(let P=0;P<f.length;P++)f[P]=f[P]/w;d.envMap.value=e.texture,d.samples.value=p,d.weights.value=f,d.latitudinal.value=a==="latitudinal",o&&(d.poleAxis.value=o);const{_lodMax:T}=this;d.dTheta.value=g,d.mipInt.value=T-i;const E=this._sizeLods[r],C=3*E*(r>T-li?r-T+li:0),A=4*(this._cubeSize-E);hr(t,C,A,3*E,2*E),c.setRenderTarget(t),c.render(u,ts)}}function Zp(n){const e=[],t=[],i=[];let r=n;const s=n-li+1+lo.length;for(let a=0;a<s;a++){const o=Math.pow(2,r);t.push(o);let c=1/o;a>n-li?c=lo[a-n+li-1]:a===0&&(c=0),i.push(c);const l=1/(o-2),h=-l,u=1+l,d=[h,h,u,h,u,u,h,h,u,u,h,u],m=6,g=6,M=3,p=2,f=1,w=new Float32Array(M*g*m),T=new Float32Array(p*g*m),E=new Float32Array(f*g*m);for(let A=0;A<m;A++){const P=A%3*2/3-1,I=A>2?0:-1,S=[P,I,0,P+2/3,I,0,P+2/3,I+1,0,P,I,0,P+2/3,I+1,0,P,I+1,0];w.set(S,M*g*A),T.set(d,p*g*A);const x=[A,A,A,A,A,A];E.set(x,f*g*A)}const C=new Tn;C.setAttribute("position",new Jt(w,M)),C.setAttribute("uv",new Jt(T,p)),C.setAttribute("faceIndex",new Jt(E,f)),e.push(C),r>li&&r--}return{lodPlanes:e,sizeLods:t,sigmas:i}}function fo(n,e,t){const i=new Wn(n,e,t);return i.texture.mapping=Rr,i.texture.name="PMREM.cubeUv",i.scissorTest=!0,i}function hr(n,e,t,i,r){n.viewport.set(e,t,i,r),n.scissor.set(e,t,i,r)}function Kp(n,e,t){const i=new Float32Array(Fn),r=new B(0,1,0);return new yn({name:"SphericalGaussianBlur",defines:{n:Fn,CUBEUV_TEXEL_WIDTH:1/e,CUBEUV_TEXEL_HEIGHT:1/t,CUBEUV_MAX_MIP:`${n}.0`},uniforms:{envMap:{value:null},samples:{value:1},weights:{value:i},latitudinal:{value:!1},dTheta:{value:0},mipInt:{value:0},poleAxis:{value:r}},vertexShader:_a(),fragmentShader:`

			precision mediump float;
			precision mediump int;

			varying vec3 vOutputDirection;

			uniform sampler2D envMap;
			uniform int samples;
			uniform float weights[ n ];
			uniform bool latitudinal;
			uniform float dTheta;
			uniform float mipInt;
			uniform vec3 poleAxis;

			#define ENVMAP_TYPE_CUBE_UV
			#include <cube_uv_reflection_fragment>

			vec3 getSample( float theta, vec3 axis ) {

				float cosTheta = cos( theta );
				// Rodrigues' axis-angle rotation
				vec3 sampleDirection = vOutputDirection * cosTheta
					+ cross( axis, vOutputDirection ) * sin( theta )
					+ axis * dot( axis, vOutputDirection ) * ( 1.0 - cosTheta );

				return bilinearCubeUV( envMap, sampleDirection, mipInt );

			}

			void main() {

				vec3 axis = latitudinal ? poleAxis : cross( poleAxis, vOutputDirection );

				if ( all( equal( axis, vec3( 0.0 ) ) ) ) {

					axis = vec3( vOutputDirection.z, 0.0, - vOutputDirection.x );

				}

				axis = normalize( axis );

				gl_FragColor = vec4( 0.0, 0.0, 0.0, 1.0 );
				gl_FragColor.rgb += weights[ 0 ] * getSample( 0.0, axis );

				for ( int i = 1; i < n; i++ ) {

					if ( i >= samples ) {

						break;

					}

					float theta = dTheta * float( i );
					gl_FragColor.rgb += weights[ i ] * getSample( -1.0 * theta, axis );
					gl_FragColor.rgb += weights[ i ] * getSample( theta, axis );

				}

			}
		`,blending:xn,depthTest:!1,depthWrite:!1})}function po(){return new yn({name:"EquirectangularToCubeUV",uniforms:{envMap:{value:null}},vertexShader:_a(),fragmentShader:`

			precision mediump float;
			precision mediump int;

			varying vec3 vOutputDirection;

			uniform sampler2D envMap;

			#include <common>

			void main() {

				vec3 outputDirection = normalize( vOutputDirection );
				vec2 uv = equirectUv( outputDirection );

				gl_FragColor = vec4( texture2D ( envMap, uv ).rgb, 1.0 );

			}
		`,blending:xn,depthTest:!1,depthWrite:!1})}function mo(){return new yn({name:"CubemapToCubeUV",uniforms:{envMap:{value:null},flipEnvMap:{value:-1}},vertexShader:_a(),fragmentShader:`

			precision mediump float;
			precision mediump int;

			uniform float flipEnvMap;

			varying vec3 vOutputDirection;

			uniform samplerCube envMap;

			void main() {

				gl_FragColor = textureCube( envMap, vec3( flipEnvMap * vOutputDirection.x, vOutputDirection.yz ) );

			}
		`,blending:xn,depthTest:!1,depthWrite:!1})}function _a(){return`

		precision mediump float;
		precision mediump int;

		attribute float faceIndex;

		varying vec3 vOutputDirection;

		// RH coordinate system; PMREM face-indexing convention
		vec3 getDirection( vec2 uv, float face ) {

			uv = 2.0 * uv - 1.0;

			vec3 direction = vec3( uv, 1.0 );

			if ( face == 0.0 ) {

				direction = direction.zyx; // ( 1, v, u ) pos x

			} else if ( face == 1.0 ) {

				direction = direction.xzy;
				direction.xz *= -1.0; // ( -u, 1, -v ) pos y

			} else if ( face == 2.0 ) {

				direction.x *= -1.0; // ( -u, v, 1 ) pos z

			} else if ( face == 3.0 ) {

				direction = direction.zyx;
				direction.xz *= -1.0; // ( -1, v, -u ) neg x

			} else if ( face == 4.0 ) {

				direction = direction.xzy;
				direction.xy *= -1.0; // ( -u, -1, v ) neg y

			} else if ( face == 5.0 ) {

				direction.z *= -1.0; // ( u, v, -1 ) neg z

			}

			return direction;

		}

		void main() {

			vOutputDirection = getDirection( uv, faceIndex );
			gl_Position = vec4( position, 1.0 );

		}
	`}function jp(n){let e=new WeakMap,t=null;function i(o){if(o&&o.isTexture){const c=o.mapping,l=c===Ms||c===Ss,h=c===pi||c===mi;if(l||h){let u=e.get(o);const d=u!==void 0?u.texture.pmremVersion:0;if(o.isRenderTargetTexture&&o.pmremVersion!==d)return t===null&&(t=new ho(n)),u=l?t.fromEquirectangular(o,u):t.fromCubemap(o,u),u.texture.pmremVersion=o.pmremVersion,e.set(o,u),u.texture;if(u!==void 0)return u.texture;{const m=o.image;return l&&m&&m.height>0||h&&m&&r(m)?(t===null&&(t=new ho(n)),u=l?t.fromEquirectangular(o):t.fromCubemap(o),u.texture.pmremVersion=o.pmremVersion,e.set(o,u),o.addEventListener("dispose",s),u.texture):null}}}return o}function r(o){let c=0;const l=6;for(let h=0;h<l;h++)o[h]!==void 0&&c++;return c===l}function s(o){const c=o.target;c.removeEventListener("dispose",s);const l=e.get(c);l!==void 0&&(e.delete(c),l.dispose())}function a(){e=new WeakMap,t!==null&&(t.dispose(),t=null)}return{get:i,dispose:a}}function Jp(n){const e={};function t(i){if(e[i]!==void 0)return e[i];let r;switch(i){case"WEBGL_depth_texture":r=n.getExtension("WEBGL_depth_texture")||n.getExtension("MOZ_WEBGL_depth_texture")||n.getExtension("WEBKIT_WEBGL_depth_texture");break;case"EXT_texture_filter_anisotropic":r=n.getExtension("EXT_texture_filter_anisotropic")||n.getExtension("MOZ_EXT_texture_filter_anisotropic")||n.getExtension("WEBKIT_EXT_texture_filter_anisotropic");break;case"WEBGL_compressed_texture_s3tc":r=n.getExtension("WEBGL_compressed_texture_s3tc")||n.getExtension("MOZ_WEBGL_compressed_texture_s3tc")||n.getExtension("WEBKIT_WEBGL_compressed_texture_s3tc");break;case"WEBGL_compressed_texture_pvrtc":r=n.getExtension("WEBGL_compressed_texture_pvrtc")||n.getExtension("WEBKIT_WEBGL_compressed_texture_pvrtc");break;default:r=n.getExtension(i)}return e[i]=r,r}return{has:function(i){return t(i)!==null},init:function(){t("EXT_color_buffer_float"),t("WEBGL_clip_cull_distance"),t("OES_texture_float_linear"),t("EXT_color_buffer_half_float"),t("WEBGL_multisampled_render_to_texture"),t("WEBGL_render_shared_exponent")},get:function(i){const r=t(i);return r===null&&oi("THREE.WebGLRenderer: "+i+" extension not supported."),r}}}function Qp(n,e,t,i){const r={},s=new WeakMap;function a(u){const d=u.target;d.index!==null&&e.remove(d.index);for(const g in d.attributes)e.remove(d.attributes[g]);d.removeEventListener("dispose",a),delete r[d.id];const m=s.get(d);m&&(e.remove(m),s.delete(d)),i.releaseStatesOfGeometry(d),d.isInstancedBufferGeometry===!0&&delete d._maxInstanceCount,t.memory.geometries--}function o(u,d){return r[d.id]===!0||(d.addEventListener("dispose",a),r[d.id]=!0,t.memory.geometries++),d}function c(u){const d=u.attributes;for(const m in d)e.update(d[m],n.ARRAY_BUFFER)}function l(u){const d=[],m=u.index,g=u.attributes.position;let M=0;if(m!==null){const w=m.array;M=m.version;for(let T=0,E=w.length;T<E;T+=3){const C=w[T+0],A=w[T+1],P=w[T+2];d.push(C,A,A,P,P,C)}}else if(g!==void 0){const w=g.array;M=g.version;for(let T=0,E=w.length/3-1;T<E;T+=3){const C=T+0,A=T+1,P=T+2;d.push(C,A,A,P,P,C)}}else return;const p=new(ll(d)?ml:pl)(d,1);p.version=M;const f=s.get(u);f&&e.remove(f),s.set(u,p)}function h(u){const d=s.get(u);if(d){const m=u.index;m!==null&&d.version<m.version&&l(u)}else l(u);return s.get(u)}return{get:o,update:c,getWireframeAttribute:h}}function em(n,e,t){let i;function r(d){i=d}let s,a;function o(d){s=d.type,a=d.bytesPerElement}function c(d,m){n.drawElements(i,m,s,d*a),t.update(m,i,1)}function l(d,m,g){g!==0&&(n.drawElementsInstanced(i,m,s,d*a,g),t.update(m,i,g))}function h(d,m,g){if(g===0)return;e.get("WEBGL_multi_draw").multiDrawElementsWEBGL(i,m,0,s,d,0,g);let p=0;for(let f=0;f<g;f++)p+=m[f];t.update(p,i,1)}function u(d,m,g,M){if(g===0)return;const p=e.get("WEBGL_multi_draw");if(p===null)for(let f=0;f<d.length;f++)l(d[f]/a,m[f],M[f]);else{p.multiDrawElementsInstancedWEBGL(i,m,0,s,d,0,M,0,g);let f=0;for(let w=0;w<g;w++)f+=m[w]*M[w];t.update(f,i,1)}}this.setMode=r,this.setIndex=o,this.render=c,this.renderInstances=l,this.renderMultiDraw=h,this.renderMultiDrawInstances=u}function tm(n){const e={geometries:0,textures:0},t={frame:0,calls:0,triangles:0,points:0,lines:0};function i(s,a,o){switch(t.calls++,a){case n.TRIANGLES:t.triangles+=o*(s/3);break;case n.LINES:t.lines+=o*(s/2);break;case n.LINE_STRIP:t.lines+=o*(s-1);break;case n.LINE_LOOP:t.lines+=o*s;break;case n.POINTS:t.points+=o*s;break;default:console.error("THREE.WebGLInfo: Unknown draw mode:",a);break}}function r(){t.calls=0,t.triangles=0,t.points=0,t.lines=0}return{memory:e,render:t,programs:null,autoReset:!0,reset:r,update:i}}function nm(n,e,t){const i=new WeakMap,r=new rt;function s(a,o,c){const l=a.morphTargetInfluences,h=o.morphAttributes.position||o.morphAttributes.normal||o.morphAttributes.color,u=h!==void 0?h.length:0;let d=i.get(o);if(d===void 0||d.count!==u){let S=function(){P.dispose(),i.delete(o),o.removeEventListener("dispose",S)};d!==void 0&&d.texture.dispose();const m=o.morphAttributes.position!==void 0,g=o.morphAttributes.normal!==void 0,M=o.morphAttributes.color!==void 0,p=o.morphAttributes.position||[],f=o.morphAttributes.normal||[],w=o.morphAttributes.color||[];let T=0;m===!0&&(T=1),g===!0&&(T=2),M===!0&&(T=3);let E=o.attributes.position.count*T,C=1;E>e.maxTextureSize&&(C=Math.ceil(E/e.maxTextureSize),E=e.maxTextureSize);const A=new Float32Array(E*C*4*u),P=new ul(A,E,C,u);P.type=on,P.needsUpdate=!0;const I=T*4;for(let x=0;x<u;x++){const b=p[x],W=f[x],N=w[x],k=E*C*4*x;for(let Z=0;Z<b.count;Z++){const G=Z*I;m===!0&&(r.fromBufferAttribute(b,Z),A[k+G+0]=r.x,A[k+G+1]=r.y,A[k+G+2]=r.z,A[k+G+3]=0),g===!0&&(r.fromBufferAttribute(W,Z),A[k+G+4]=r.x,A[k+G+5]=r.y,A[k+G+6]=r.z,A[k+G+7]=0),M===!0&&(r.fromBufferAttribute(N,Z),A[k+G+8]=r.x,A[k+G+9]=r.y,A[k+G+10]=r.z,A[k+G+11]=N.itemSize===4?r.w:1)}}d={count:u,texture:P,size:new qe(E,C)},i.set(o,d),o.addEventListener("dispose",S)}if(a.isInstancedMesh===!0&&a.morphTexture!==null)c.getUniforms().setValue(n,"morphTexture",a.morphTexture,t);else{let m=0;for(let M=0;M<l.length;M++)m+=l[M];const g=o.morphTargetsRelative?1:1-m;c.getUniforms().setValue(n,"morphTargetBaseInfluence",g),c.getUniforms().setValue(n,"morphTargetInfluences",l)}c.getUniforms().setValue(n,"morphTargetsTexture",d.texture,t),c.getUniforms().setValue(n,"morphTargetsTextureSize",d.size)}return{update:s}}function im(n,e,t,i){let r=new WeakMap;function s(c){const l=i.render.frame,h=c.geometry,u=e.get(c,h);if(r.get(u)!==l&&(e.update(u),r.set(u,l)),c.isInstancedMesh&&(c.hasEventListener("dispose",o)===!1&&c.addEventListener("dispose",o),r.get(c)!==l&&(t.update(c.instanceMatrix,n.ARRAY_BUFFER),c.instanceColor!==null&&t.update(c.instanceColor,n.ARRAY_BUFFER),r.set(c,l))),c.isSkinnedMesh){const d=c.skeleton;r.get(d)!==l&&(d.update(),r.set(d,l))}return u}function a(){r=new WeakMap}function o(c){const l=c.target;l.removeEventListener("dispose",o),t.remove(l.instanceMatrix),l.instanceColor!==null&&t.remove(l.instanceColor)}return{update:s,dispose:a}}const yl=new Tt,_o=new xl(1,1),Tl=new ul,bl=new wh,Al=new vl,go=[],vo=[],xo=new Float32Array(16),Mo=new Float32Array(9),So=new Float32Array(4);function yi(n,e,t){const i=n[0];if(i<=0||i>0)return n;const r=e*t;let s=go[r];if(s===void 0&&(s=new Float32Array(r),go[r]=s),e!==0){i.toArray(s,0);for(let a=1,o=0;a!==e;++a)o+=t,n[a].toArray(s,o)}return s}function ut(n,e){if(n.length!==e.length)return!1;for(let t=0,i=n.length;t<i;t++)if(n[t]!==e[t])return!1;return!0}function ht(n,e){for(let t=0,i=e.length;t<i;t++)n[t]=e[t]}function Cr(n,e){let t=vo[e];t===void 0&&(t=new Int32Array(e),vo[e]=t);for(let i=0;i!==e;++i)t[i]=n.allocateTextureUnit();return t}function rm(n,e){const t=this.cache;t[0]!==e&&(n.uniform1f(this.addr,e),t[0]=e)}function sm(n,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y)&&(n.uniform2f(this.addr,e.x,e.y),t[0]=e.x,t[1]=e.y);else{if(ut(t,e))return;n.uniform2fv(this.addr,e),ht(t,e)}}function am(n,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z)&&(n.uniform3f(this.addr,e.x,e.y,e.z),t[0]=e.x,t[1]=e.y,t[2]=e.z);else if(e.r!==void 0)(t[0]!==e.r||t[1]!==e.g||t[2]!==e.b)&&(n.uniform3f(this.addr,e.r,e.g,e.b),t[0]=e.r,t[1]=e.g,t[2]=e.b);else{if(ut(t,e))return;n.uniform3fv(this.addr,e),ht(t,e)}}function om(n,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z||t[3]!==e.w)&&(n.uniform4f(this.addr,e.x,e.y,e.z,e.w),t[0]=e.x,t[1]=e.y,t[2]=e.z,t[3]=e.w);else{if(ut(t,e))return;n.uniform4fv(this.addr,e),ht(t,e)}}function lm(n,e){const t=this.cache,i=e.elements;if(i===void 0){if(ut(t,e))return;n.uniformMatrix2fv(this.addr,!1,e),ht(t,e)}else{if(ut(t,i))return;So.set(i),n.uniformMatrix2fv(this.addr,!1,So),ht(t,i)}}function cm(n,e){const t=this.cache,i=e.elements;if(i===void 0){if(ut(t,e))return;n.uniformMatrix3fv(this.addr,!1,e),ht(t,e)}else{if(ut(t,i))return;Mo.set(i),n.uniformMatrix3fv(this.addr,!1,Mo),ht(t,i)}}function um(n,e){const t=this.cache,i=e.elements;if(i===void 0){if(ut(t,e))return;n.uniformMatrix4fv(this.addr,!1,e),ht(t,e)}else{if(ut(t,i))return;xo.set(i),n.uniformMatrix4fv(this.addr,!1,xo),ht(t,i)}}function hm(n,e){const t=this.cache;t[0]!==e&&(n.uniform1i(this.addr,e),t[0]=e)}function fm(n,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y)&&(n.uniform2i(this.addr,e.x,e.y),t[0]=e.x,t[1]=e.y);else{if(ut(t,e))return;n.uniform2iv(this.addr,e),ht(t,e)}}function dm(n,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z)&&(n.uniform3i(this.addr,e.x,e.y,e.z),t[0]=e.x,t[1]=e.y,t[2]=e.z);else{if(ut(t,e))return;n.uniform3iv(this.addr,e),ht(t,e)}}function pm(n,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z||t[3]!==e.w)&&(n.uniform4i(this.addr,e.x,e.y,e.z,e.w),t[0]=e.x,t[1]=e.y,t[2]=e.z,t[3]=e.w);else{if(ut(t,e))return;n.uniform4iv(this.addr,e),ht(t,e)}}function mm(n,e){const t=this.cache;t[0]!==e&&(n.uniform1ui(this.addr,e),t[0]=e)}function _m(n,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y)&&(n.uniform2ui(this.addr,e.x,e.y),t[0]=e.x,t[1]=e.y);else{if(ut(t,e))return;n.uniform2uiv(this.addr,e),ht(t,e)}}function gm(n,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z)&&(n.uniform3ui(this.addr,e.x,e.y,e.z),t[0]=e.x,t[1]=e.y,t[2]=e.z);else{if(ut(t,e))return;n.uniform3uiv(this.addr,e),ht(t,e)}}function vm(n,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z||t[3]!==e.w)&&(n.uniform4ui(this.addr,e.x,e.y,e.z,e.w),t[0]=e.x,t[1]=e.y,t[2]=e.z,t[3]=e.w);else{if(ut(t,e))return;n.uniform4uiv(this.addr,e),ht(t,e)}}function xm(n,e,t){const i=this.cache,r=t.allocateTextureUnit();i[0]!==r&&(n.uniform1i(this.addr,r),i[0]=r);let s;this.type===n.SAMPLER_2D_SHADOW?(_o.compareFunction=ol,s=_o):s=yl,t.setTexture2D(e||s,r)}function Mm(n,e,t){const i=this.cache,r=t.allocateTextureUnit();i[0]!==r&&(n.uniform1i(this.addr,r),i[0]=r),t.setTexture3D(e||bl,r)}function Sm(n,e,t){const i=this.cache,r=t.allocateTextureUnit();i[0]!==r&&(n.uniform1i(this.addr,r),i[0]=r),t.setTextureCube(e||Al,r)}function Em(n,e,t){const i=this.cache,r=t.allocateTextureUnit();i[0]!==r&&(n.uniform1i(this.addr,r),i[0]=r),t.setTexture2DArray(e||Tl,r)}function ym(n){switch(n){case 5126:return rm;case 35664:return sm;case 35665:return am;case 35666:return om;case 35674:return lm;case 35675:return cm;case 35676:return um;case 5124:case 35670:return hm;case 35667:case 35671:return fm;case 35668:case 35672:return dm;case 35669:case 35673:return pm;case 5125:return mm;case 36294:return _m;case 36295:return gm;case 36296:return vm;case 35678:case 36198:case 36298:case 36306:case 35682:return xm;case 35679:case 36299:case 36307:return Mm;case 35680:case 36300:case 36308:case 36293:return Sm;case 36289:case 36303:case 36311:case 36292:return Em}}function Tm(n,e){n.uniform1fv(this.addr,e)}function bm(n,e){const t=yi(e,this.size,2);n.uniform2fv(this.addr,t)}function Am(n,e){const t=yi(e,this.size,3);n.uniform3fv(this.addr,t)}function wm(n,e){const t=yi(e,this.size,4);n.uniform4fv(this.addr,t)}function Rm(n,e){const t=yi(e,this.size,4);n.uniformMatrix2fv(this.addr,!1,t)}function Cm(n,e){const t=yi(e,this.size,9);n.uniformMatrix3fv(this.addr,!1,t)}function Pm(n,e){const t=yi(e,this.size,16);n.uniformMatrix4fv(this.addr,!1,t)}function Dm(n,e){n.uniform1iv(this.addr,e)}function Lm(n,e){n.uniform2iv(this.addr,e)}function Um(n,e){n.uniform3iv(this.addr,e)}function Im(n,e){n.uniform4iv(this.addr,e)}function Nm(n,e){n.uniform1uiv(this.addr,e)}function Fm(n,e){n.uniform2uiv(this.addr,e)}function Om(n,e){n.uniform3uiv(this.addr,e)}function Bm(n,e){n.uniform4uiv(this.addr,e)}function zm(n,e,t){const i=this.cache,r=e.length,s=Cr(t,r);ut(i,s)||(n.uniform1iv(this.addr,s),ht(i,s));for(let a=0;a!==r;++a)t.setTexture2D(e[a]||yl,s[a])}function Hm(n,e,t){const i=this.cache,r=e.length,s=Cr(t,r);ut(i,s)||(n.uniform1iv(this.addr,s),ht(i,s));for(let a=0;a!==r;++a)t.setTexture3D(e[a]||bl,s[a])}function Vm(n,e,t){const i=this.cache,r=e.length,s=Cr(t,r);ut(i,s)||(n.uniform1iv(this.addr,s),ht(i,s));for(let a=0;a!==r;++a)t.setTextureCube(e[a]||Al,s[a])}function Gm(n,e,t){const i=this.cache,r=e.length,s=Cr(t,r);ut(i,s)||(n.uniform1iv(this.addr,s),ht(i,s));for(let a=0;a!==r;++a)t.setTexture2DArray(e[a]||Tl,s[a])}function km(n){switch(n){case 5126:return Tm;case 35664:return bm;case 35665:return Am;case 35666:return wm;case 35674:return Rm;case 35675:return Cm;case 35676:return Pm;case 5124:case 35670:return Dm;case 35667:case 35671:return Lm;case 35668:case 35672:return Um;case 35669:case 35673:return Im;case 5125:return Nm;case 36294:return Fm;case 36295:return Om;case 36296:return Bm;case 35678:case 36198:case 36298:case 36306:case 35682:return zm;case 35679:case 36299:case 36307:return Hm;case 35680:case 36300:case 36308:case 36293:return Vm;case 36289:case 36303:case 36311:case 36292:return Gm}}class Wm{constructor(e,t,i){this.id=e,this.addr=i,this.cache=[],this.type=t.type,this.setValue=ym(t.type)}}class Xm{constructor(e,t,i){this.id=e,this.addr=i,this.cache=[],this.type=t.type,this.size=t.size,this.setValue=km(t.type)}}class qm{constructor(e){this.id=e,this.seq=[],this.map={}}setValue(e,t,i){const r=this.seq;for(let s=0,a=r.length;s!==a;++s){const o=r[s];o.setValue(e,t[o.id],i)}}}const as=/(\w+)(\])?(\[|\.)?/g;function Eo(n,e){n.seq.push(e),n.map[e.id]=e}function Ym(n,e,t){const i=n.name,r=i.length;for(as.lastIndex=0;;){const s=as.exec(i),a=as.lastIndex;let o=s[1];const c=s[2]==="]",l=s[3];if(c&&(o=o|0),l===void 0||l==="["&&a+2===r){Eo(t,l===void 0?new Wm(o,n,e):new Xm(o,n,e));break}else{let u=t.map[o];u===void 0&&(u=new qm(o),Eo(t,u)),t=u}}}class Mr{constructor(e,t){this.seq=[],this.map={};const i=e.getProgramParameter(t,e.ACTIVE_UNIFORMS);for(let r=0;r<i;++r){const s=e.getActiveUniform(t,r),a=e.getUniformLocation(t,s.name);Ym(s,a,this)}}setValue(e,t,i,r){const s=this.map[t];s!==void 0&&s.setValue(e,i,r)}setOptional(e,t,i){const r=t[i];r!==void 0&&this.setValue(e,i,r)}static upload(e,t,i,r){for(let s=0,a=t.length;s!==a;++s){const o=t[s],c=i[o.id];c.needsUpdate!==!1&&o.setValue(e,c.value,r)}}static seqWithValue(e,t){const i=[];for(let r=0,s=e.length;r!==s;++r){const a=e[r];a.id in t&&i.push(a)}return i}}function yo(n,e,t){const i=n.createShader(e);return n.shaderSource(i,t),n.compileShader(i),i}const $m=37297;let Zm=0;function Km(n,e){const t=n.split(`
`),i=[],r=Math.max(e-6,0),s=Math.min(e+6,t.length);for(let a=r;a<s;a++){const o=a+1;i.push(`${o===e?">":" "} ${o}: ${t[a]}`)}return i.join(`
`)}const To=new Ce;function jm(n){ke._getMatrix(To,ke.workingColorSpace,n);const e=`mat3( ${To.elements.map(t=>t.toFixed(4))} )`;switch(ke.getTransfer(n)){case Tr:return[e,"LinearTransferOETF"];case Ke:return[e,"sRGBTransferOETF"];default:return console.warn("THREE.WebGLProgram: Unsupported color space: ",n),[e,"LinearTransferOETF"]}}function bo(n,e,t){const i=n.getShaderParameter(e,n.COMPILE_STATUS),r=n.getShaderInfoLog(e).trim();if(i&&r==="")return"";const s=/ERROR: 0:(\d+)/.exec(r);if(s){const a=parseInt(s[1]);return t.toUpperCase()+`

`+r+`

`+Km(n.getShaderSource(e),a)}else return r}function Jm(n,e){const t=jm(e);return[`vec4 ${n}( vec4 value ) {`,`	return ${t[1]}( vec4( value.rgb * ${t[0]}, value.a ) );`,"}"].join(`
`)}function Qm(n,e){let t;switch(e){case Ou:t="Linear";break;case Bu:t="Reinhard";break;case zu:t="Cineon";break;case Hu:t="ACESFilmic";break;case Gu:t="AgX";break;case ku:t="Neutral";break;case Vu:t="Custom";break;default:console.warn("THREE.WebGLProgram: Unsupported toneMapping:",e),t="Linear"}return"vec3 "+n+"( vec3 color ) { return "+t+"ToneMapping( color ); }"}const fr=new B;function e_(){ke.getLuminanceCoefficients(fr);const n=fr.x.toFixed(4),e=fr.y.toFixed(4),t=fr.z.toFixed(4);return["float luminance( const in vec3 rgb ) {",`	const vec3 weights = vec3( ${n}, ${e}, ${t} );`,"	return dot( weights, rgb );","}"].join(`
`)}function t_(n){return[n.extensionClipCullDistance?"#extension GL_ANGLE_clip_cull_distance : require":"",n.extensionMultiDraw?"#extension GL_ANGLE_multi_draw : require":""].filter(Ci).join(`
`)}function n_(n){const e=[];for(const t in n){const i=n[t];i!==!1&&e.push("#define "+t+" "+i)}return e.join(`
`)}function i_(n,e){const t={},i=n.getProgramParameter(e,n.ACTIVE_ATTRIBUTES);for(let r=0;r<i;r++){const s=n.getActiveAttrib(e,r),a=s.name;let o=1;s.type===n.FLOAT_MAT2&&(o=2),s.type===n.FLOAT_MAT3&&(o=3),s.type===n.FLOAT_MAT4&&(o=4),t[a]={type:s.type,location:n.getAttribLocation(e,a),locationSize:o}}return t}function Ci(n){return n!==""}function Ao(n,e){const t=e.numSpotLightShadows+e.numSpotLightMaps-e.numSpotLightShadowsWithMaps;return n.replace(/NUM_DIR_LIGHTS/g,e.numDirLights).replace(/NUM_SPOT_LIGHTS/g,e.numSpotLights).replace(/NUM_SPOT_LIGHT_MAPS/g,e.numSpotLightMaps).replace(/NUM_SPOT_LIGHT_COORDS/g,t).replace(/NUM_RECT_AREA_LIGHTS/g,e.numRectAreaLights).replace(/NUM_POINT_LIGHTS/g,e.numPointLights).replace(/NUM_HEMI_LIGHTS/g,e.numHemiLights).replace(/NUM_DIR_LIGHT_SHADOWS/g,e.numDirLightShadows).replace(/NUM_SPOT_LIGHT_SHADOWS_WITH_MAPS/g,e.numSpotLightShadowsWithMaps).replace(/NUM_SPOT_LIGHT_SHADOWS/g,e.numSpotLightShadows).replace(/NUM_POINT_LIGHT_SHADOWS/g,e.numPointLightShadows)}function wo(n,e){return n.replace(/NUM_CLIPPING_PLANES/g,e.numClippingPlanes).replace(/UNION_CLIPPING_PLANES/g,e.numClippingPlanes-e.numClipIntersection)}const r_=/^[ \t]*#include +<([\w\d./]+)>/gm;function Ks(n){return n.replace(r_,a_)}const s_=new Map;function a_(n,e){let t=De[e];if(t===void 0){const i=s_.get(e);if(i!==void 0)t=De[i],console.warn('THREE.WebGLRenderer: Shader chunk "%s" has been deprecated. Use "%s" instead.',e,i);else throw new Error("Can not resolve #include <"+e+">")}return Ks(t)}const o_=/#pragma unroll_loop_start\s+for\s*\(\s*int\s+i\s*=\s*(\d+)\s*;\s*i\s*<\s*(\d+)\s*;\s*i\s*\+\+\s*\)\s*{([\s\S]+?)}\s+#pragma unroll_loop_end/g;function Ro(n){return n.replace(o_,l_)}function l_(n,e,t,i){let r="";for(let s=parseInt(e);s<parseInt(t);s++)r+=i.replace(/\[\s*i\s*\]/g,"[ "+s+" ]").replace(/UNROLLED_LOOP_INDEX/g,s);return r}function Co(n){let e=`precision ${n.precision} float;
	precision ${n.precision} int;
	precision ${n.precision} sampler2D;
	precision ${n.precision} samplerCube;
	precision ${n.precision} sampler3D;
	precision ${n.precision} sampler2DArray;
	precision ${n.precision} sampler2DShadow;
	precision ${n.precision} samplerCubeShadow;
	precision ${n.precision} sampler2DArrayShadow;
	precision ${n.precision} isampler2D;
	precision ${n.precision} isampler3D;
	precision ${n.precision} isamplerCube;
	precision ${n.precision} isampler2DArray;
	precision ${n.precision} usampler2D;
	precision ${n.precision} usampler3D;
	precision ${n.precision} usamplerCube;
	precision ${n.precision} usampler2DArray;
	`;return n.precision==="highp"?e+=`
#define HIGH_PRECISION`:n.precision==="mediump"?e+=`
#define MEDIUM_PRECISION`:n.precision==="lowp"&&(e+=`
#define LOW_PRECISION`),e}function c_(n){let e="SHADOWMAP_TYPE_BASIC";return n.shadowMapType===Zo?e="SHADOWMAP_TYPE_PCF":n.shadowMapType===_u?e="SHADOWMAP_TYPE_PCF_SOFT":n.shadowMapType===$t&&(e="SHADOWMAP_TYPE_VSM"),e}function u_(n){let e="ENVMAP_TYPE_CUBE";if(n.envMap)switch(n.envMapMode){case pi:case mi:e="ENVMAP_TYPE_CUBE";break;case Rr:e="ENVMAP_TYPE_CUBE_UV";break}return e}function h_(n){let e="ENVMAP_MODE_REFLECTION";if(n.envMap)switch(n.envMapMode){case mi:e="ENVMAP_MODE_REFRACTION";break}return e}function f_(n){let e="ENVMAP_BLENDING_NONE";if(n.envMap)switch(n.combine){case ra:e="ENVMAP_BLENDING_MULTIPLY";break;case Nu:e="ENVMAP_BLENDING_MIX";break;case Fu:e="ENVMAP_BLENDING_ADD";break}return e}function d_(n){const e=n.envMapCubeUVHeight;if(e===null)return null;const t=Math.log2(e)-2,i=1/e;return{texelWidth:1/(3*Math.max(Math.pow(2,t),7*16)),texelHeight:i,maxMip:t}}function p_(n,e,t,i){const r=n.getContext(),s=t.defines;let a=t.vertexShader,o=t.fragmentShader;const c=c_(t),l=u_(t),h=h_(t),u=f_(t),d=d_(t),m=t_(t),g=n_(s),M=r.createProgram();let p,f,w=t.glslVersion?"#version "+t.glslVersion+`
`:"";t.isRawShaderMaterial?(p=["#define SHADER_TYPE "+t.shaderType,"#define SHADER_NAME "+t.shaderName,g].filter(Ci).join(`
`),p.length>0&&(p+=`
`),f=["#define SHADER_TYPE "+t.shaderType,"#define SHADER_NAME "+t.shaderName,g].filter(Ci).join(`
`),f.length>0&&(f+=`
`)):(p=[Co(t),"#define SHADER_TYPE "+t.shaderType,"#define SHADER_NAME "+t.shaderName,g,t.extensionClipCullDistance?"#define USE_CLIP_DISTANCE":"",t.batching?"#define USE_BATCHING":"",t.batchingColor?"#define USE_BATCHING_COLOR":"",t.instancing?"#define USE_INSTANCING":"",t.instancingColor?"#define USE_INSTANCING_COLOR":"",t.instancingMorph?"#define USE_INSTANCING_MORPH":"",t.useFog&&t.fog?"#define USE_FOG":"",t.useFog&&t.fogExp2?"#define FOG_EXP2":"",t.map?"#define USE_MAP":"",t.envMap?"#define USE_ENVMAP":"",t.envMap?"#define "+h:"",t.lightMap?"#define USE_LIGHTMAP":"",t.aoMap?"#define USE_AOMAP":"",t.bumpMap?"#define USE_BUMPMAP":"",t.normalMap?"#define USE_NORMALMAP":"",t.normalMapObjectSpace?"#define USE_NORMALMAP_OBJECTSPACE":"",t.normalMapTangentSpace?"#define USE_NORMALMAP_TANGENTSPACE":"",t.displacementMap?"#define USE_DISPLACEMENTMAP":"",t.emissiveMap?"#define USE_EMISSIVEMAP":"",t.anisotropy?"#define USE_ANISOTROPY":"",t.anisotropyMap?"#define USE_ANISOTROPYMAP":"",t.clearcoatMap?"#define USE_CLEARCOATMAP":"",t.clearcoatRoughnessMap?"#define USE_CLEARCOAT_ROUGHNESSMAP":"",t.clearcoatNormalMap?"#define USE_CLEARCOAT_NORMALMAP":"",t.iridescenceMap?"#define USE_IRIDESCENCEMAP":"",t.iridescenceThicknessMap?"#define USE_IRIDESCENCE_THICKNESSMAP":"",t.specularMap?"#define USE_SPECULARMAP":"",t.specularColorMap?"#define USE_SPECULAR_COLORMAP":"",t.specularIntensityMap?"#define USE_SPECULAR_INTENSITYMAP":"",t.roughnessMap?"#define USE_ROUGHNESSMAP":"",t.metalnessMap?"#define USE_METALNESSMAP":"",t.alphaMap?"#define USE_ALPHAMAP":"",t.alphaHash?"#define USE_ALPHAHASH":"",t.transmission?"#define USE_TRANSMISSION":"",t.transmissionMap?"#define USE_TRANSMISSIONMAP":"",t.thicknessMap?"#define USE_THICKNESSMAP":"",t.sheenColorMap?"#define USE_SHEEN_COLORMAP":"",t.sheenRoughnessMap?"#define USE_SHEEN_ROUGHNESSMAP":"",t.mapUv?"#define MAP_UV "+t.mapUv:"",t.alphaMapUv?"#define ALPHAMAP_UV "+t.alphaMapUv:"",t.lightMapUv?"#define LIGHTMAP_UV "+t.lightMapUv:"",t.aoMapUv?"#define AOMAP_UV "+t.aoMapUv:"",t.emissiveMapUv?"#define EMISSIVEMAP_UV "+t.emissiveMapUv:"",t.bumpMapUv?"#define BUMPMAP_UV "+t.bumpMapUv:"",t.normalMapUv?"#define NORMALMAP_UV "+t.normalMapUv:"",t.displacementMapUv?"#define DISPLACEMENTMAP_UV "+t.displacementMapUv:"",t.metalnessMapUv?"#define METALNESSMAP_UV "+t.metalnessMapUv:"",t.roughnessMapUv?"#define ROUGHNESSMAP_UV "+t.roughnessMapUv:"",t.anisotropyMapUv?"#define ANISOTROPYMAP_UV "+t.anisotropyMapUv:"",t.clearcoatMapUv?"#define CLEARCOATMAP_UV "+t.clearcoatMapUv:"",t.clearcoatNormalMapUv?"#define CLEARCOAT_NORMALMAP_UV "+t.clearcoatNormalMapUv:"",t.clearcoatRoughnessMapUv?"#define CLEARCOAT_ROUGHNESSMAP_UV "+t.clearcoatRoughnessMapUv:"",t.iridescenceMapUv?"#define IRIDESCENCEMAP_UV "+t.iridescenceMapUv:"",t.iridescenceThicknessMapUv?"#define IRIDESCENCE_THICKNESSMAP_UV "+t.iridescenceThicknessMapUv:"",t.sheenColorMapUv?"#define SHEEN_COLORMAP_UV "+t.sheenColorMapUv:"",t.sheenRoughnessMapUv?"#define SHEEN_ROUGHNESSMAP_UV "+t.sheenRoughnessMapUv:"",t.specularMapUv?"#define SPECULARMAP_UV "+t.specularMapUv:"",t.specularColorMapUv?"#define SPECULAR_COLORMAP_UV "+t.specularColorMapUv:"",t.specularIntensityMapUv?"#define SPECULAR_INTENSITYMAP_UV "+t.specularIntensityMapUv:"",t.transmissionMapUv?"#define TRANSMISSIONMAP_UV "+t.transmissionMapUv:"",t.thicknessMapUv?"#define THICKNESSMAP_UV "+t.thicknessMapUv:"",t.vertexTangents&&t.flatShading===!1?"#define USE_TANGENT":"",t.vertexColors?"#define USE_COLOR":"",t.vertexAlphas?"#define USE_COLOR_ALPHA":"",t.vertexUv1s?"#define USE_UV1":"",t.vertexUv2s?"#define USE_UV2":"",t.vertexUv3s?"#define USE_UV3":"",t.pointsUvs?"#define USE_POINTS_UV":"",t.flatShading?"#define FLAT_SHADED":"",t.skinning?"#define USE_SKINNING":"",t.morphTargets?"#define USE_MORPHTARGETS":"",t.morphNormals&&t.flatShading===!1?"#define USE_MORPHNORMALS":"",t.morphColors?"#define USE_MORPHCOLORS":"",t.morphTargetsCount>0?"#define MORPHTARGETS_TEXTURE_STRIDE "+t.morphTextureStride:"",t.morphTargetsCount>0?"#define MORPHTARGETS_COUNT "+t.morphTargetsCount:"",t.doubleSided?"#define DOUBLE_SIDED":"",t.flipSided?"#define FLIP_SIDED":"",t.shadowMapEnabled?"#define USE_SHADOWMAP":"",t.shadowMapEnabled?"#define "+c:"",t.sizeAttenuation?"#define USE_SIZEATTENUATION":"",t.numLightProbes>0?"#define USE_LIGHT_PROBES":"",t.logarithmicDepthBuffer?"#define USE_LOGDEPTHBUF":"",t.reverseDepthBuffer?"#define USE_REVERSEDEPTHBUF":"","uniform mat4 modelMatrix;","uniform mat4 modelViewMatrix;","uniform mat4 projectionMatrix;","uniform mat4 viewMatrix;","uniform mat3 normalMatrix;","uniform vec3 cameraPosition;","uniform bool isOrthographic;","#ifdef USE_INSTANCING","	attribute mat4 instanceMatrix;","#endif","#ifdef USE_INSTANCING_COLOR","	attribute vec3 instanceColor;","#endif","#ifdef USE_INSTANCING_MORPH","	uniform sampler2D morphTexture;","#endif","attribute vec3 position;","attribute vec3 normal;","attribute vec2 uv;","#ifdef USE_UV1","	attribute vec2 uv1;","#endif","#ifdef USE_UV2","	attribute vec2 uv2;","#endif","#ifdef USE_UV3","	attribute vec2 uv3;","#endif","#ifdef USE_TANGENT","	attribute vec4 tangent;","#endif","#if defined( USE_COLOR_ALPHA )","	attribute vec4 color;","#elif defined( USE_COLOR )","	attribute vec3 color;","#endif","#ifdef USE_SKINNING","	attribute vec4 skinIndex;","	attribute vec4 skinWeight;","#endif",`
`].filter(Ci).join(`
`),f=[Co(t),"#define SHADER_TYPE "+t.shaderType,"#define SHADER_NAME "+t.shaderName,g,t.useFog&&t.fog?"#define USE_FOG":"",t.useFog&&t.fogExp2?"#define FOG_EXP2":"",t.alphaToCoverage?"#define ALPHA_TO_COVERAGE":"",t.map?"#define USE_MAP":"",t.matcap?"#define USE_MATCAP":"",t.envMap?"#define USE_ENVMAP":"",t.envMap?"#define "+l:"",t.envMap?"#define "+h:"",t.envMap?"#define "+u:"",d?"#define CUBEUV_TEXEL_WIDTH "+d.texelWidth:"",d?"#define CUBEUV_TEXEL_HEIGHT "+d.texelHeight:"",d?"#define CUBEUV_MAX_MIP "+d.maxMip+".0":"",t.lightMap?"#define USE_LIGHTMAP":"",t.aoMap?"#define USE_AOMAP":"",t.bumpMap?"#define USE_BUMPMAP":"",t.normalMap?"#define USE_NORMALMAP":"",t.normalMapObjectSpace?"#define USE_NORMALMAP_OBJECTSPACE":"",t.normalMapTangentSpace?"#define USE_NORMALMAP_TANGENTSPACE":"",t.emissiveMap?"#define USE_EMISSIVEMAP":"",t.anisotropy?"#define USE_ANISOTROPY":"",t.anisotropyMap?"#define USE_ANISOTROPYMAP":"",t.clearcoat?"#define USE_CLEARCOAT":"",t.clearcoatMap?"#define USE_CLEARCOATMAP":"",t.clearcoatRoughnessMap?"#define USE_CLEARCOAT_ROUGHNESSMAP":"",t.clearcoatNormalMap?"#define USE_CLEARCOAT_NORMALMAP":"",t.dispersion?"#define USE_DISPERSION":"",t.iridescence?"#define USE_IRIDESCENCE":"",t.iridescenceMap?"#define USE_IRIDESCENCEMAP":"",t.iridescenceThicknessMap?"#define USE_IRIDESCENCE_THICKNESSMAP":"",t.specularMap?"#define USE_SPECULARMAP":"",t.specularColorMap?"#define USE_SPECULAR_COLORMAP":"",t.specularIntensityMap?"#define USE_SPECULAR_INTENSITYMAP":"",t.roughnessMap?"#define USE_ROUGHNESSMAP":"",t.metalnessMap?"#define USE_METALNESSMAP":"",t.alphaMap?"#define USE_ALPHAMAP":"",t.alphaTest?"#define USE_ALPHATEST":"",t.alphaHash?"#define USE_ALPHAHASH":"",t.sheen?"#define USE_SHEEN":"",t.sheenColorMap?"#define USE_SHEEN_COLORMAP":"",t.sheenRoughnessMap?"#define USE_SHEEN_ROUGHNESSMAP":"",t.transmission?"#define USE_TRANSMISSION":"",t.transmissionMap?"#define USE_TRANSMISSIONMAP":"",t.thicknessMap?"#define USE_THICKNESSMAP":"",t.vertexTangents&&t.flatShading===!1?"#define USE_TANGENT":"",t.vertexColors||t.instancingColor||t.batchingColor?"#define USE_COLOR":"",t.vertexAlphas?"#define USE_COLOR_ALPHA":"",t.vertexUv1s?"#define USE_UV1":"",t.vertexUv2s?"#define USE_UV2":"",t.vertexUv3s?"#define USE_UV3":"",t.pointsUvs?"#define USE_POINTS_UV":"",t.gradientMap?"#define USE_GRADIENTMAP":"",t.flatShading?"#define FLAT_SHADED":"",t.doubleSided?"#define DOUBLE_SIDED":"",t.flipSided?"#define FLIP_SIDED":"",t.shadowMapEnabled?"#define USE_SHADOWMAP":"",t.shadowMapEnabled?"#define "+c:"",t.premultipliedAlpha?"#define PREMULTIPLIED_ALPHA":"",t.numLightProbes>0?"#define USE_LIGHT_PROBES":"",t.decodeVideoTexture?"#define DECODE_VIDEO_TEXTURE":"",t.decodeVideoTextureEmissive?"#define DECODE_VIDEO_TEXTURE_EMISSIVE":"",t.logarithmicDepthBuffer?"#define USE_LOGDEPTHBUF":"",t.reverseDepthBuffer?"#define USE_REVERSEDEPTHBUF":"","uniform mat4 viewMatrix;","uniform vec3 cameraPosition;","uniform bool isOrthographic;",t.toneMapping!==Mn?"#define TONE_MAPPING":"",t.toneMapping!==Mn?De.tonemapping_pars_fragment:"",t.toneMapping!==Mn?Qm("toneMapping",t.toneMapping):"",t.dithering?"#define DITHERING":"",t.opaque?"#define OPAQUE":"",De.colorspace_pars_fragment,Jm("linearToOutputTexel",t.outputColorSpace),e_(),t.useDepthPacking?"#define DEPTH_PACKING "+t.depthPacking:"",`
`].filter(Ci).join(`
`)),a=Ks(a),a=Ao(a,t),a=wo(a,t),o=Ks(o),o=Ao(o,t),o=wo(o,t),a=Ro(a),o=Ro(o),t.isRawShaderMaterial!==!0&&(w=`#version 300 es
`,p=[m,"#define attribute in","#define varying out","#define texture2D texture"].join(`
`)+`
`+p,f=["#define varying in",t.glslVersion===za?"":"layout(location = 0) out highp vec4 pc_fragColor;",t.glslVersion===za?"":"#define gl_FragColor pc_fragColor","#define gl_FragDepthEXT gl_FragDepth","#define texture2D texture","#define textureCube texture","#define texture2DProj textureProj","#define texture2DLodEXT textureLod","#define texture2DProjLodEXT textureProjLod","#define textureCubeLodEXT textureLod","#define texture2DGradEXT textureGrad","#define texture2DProjGradEXT textureProjGrad","#define textureCubeGradEXT textureGrad"].join(`
`)+`
`+f);const T=w+p+a,E=w+f+o,C=yo(r,r.VERTEX_SHADER,T),A=yo(r,r.FRAGMENT_SHADER,E);r.attachShader(M,C),r.attachShader(M,A),t.index0AttributeName!==void 0?r.bindAttribLocation(M,0,t.index0AttributeName):t.morphTargets===!0&&r.bindAttribLocation(M,0,"position"),r.linkProgram(M);function P(b){if(n.debug.checkShaderErrors){const W=r.getProgramInfoLog(M).trim(),N=r.getShaderInfoLog(C).trim(),k=r.getShaderInfoLog(A).trim();let Z=!0,G=!0;if(r.getProgramParameter(M,r.LINK_STATUS)===!1)if(Z=!1,typeof n.debug.onShaderError=="function")n.debug.onShaderError(r,M,C,A);else{const J=bo(r,C,"vertex"),H=bo(r,A,"fragment");console.error("THREE.WebGLProgram: Shader Error "+r.getError()+" - VALIDATE_STATUS "+r.getProgramParameter(M,r.VALIDATE_STATUS)+`

Material Name: `+b.name+`
Material Type: `+b.type+`

Program Info Log: `+W+`
`+J+`
`+H)}else W!==""?console.warn("THREE.WebGLProgram: Program Info Log:",W):(N===""||k==="")&&(G=!1);G&&(b.diagnostics={runnable:Z,programLog:W,vertexShader:{log:N,prefix:p},fragmentShader:{log:k,prefix:f}})}r.deleteShader(C),r.deleteShader(A),I=new Mr(r,M),S=i_(r,M)}let I;this.getUniforms=function(){return I===void 0&&P(this),I};let S;this.getAttributes=function(){return S===void 0&&P(this),S};let x=t.rendererExtensionParallelShaderCompile===!1;return this.isReady=function(){return x===!1&&(x=r.getProgramParameter(M,$m)),x},this.destroy=function(){i.releaseStatesOfProgram(this),r.deleteProgram(M),this.program=void 0},this.type=t.shaderType,this.name=t.shaderName,this.id=Zm++,this.cacheKey=e,this.usedTimes=1,this.program=M,this.vertexShader=C,this.fragmentShader=A,this}let m_=0;class __{constructor(){this.shaderCache=new Map,this.materialCache=new Map}update(e){const t=e.vertexShader,i=e.fragmentShader,r=this._getShaderStage(t),s=this._getShaderStage(i),a=this._getShaderCacheForMaterial(e);return a.has(r)===!1&&(a.add(r),r.usedTimes++),a.has(s)===!1&&(a.add(s),s.usedTimes++),this}remove(e){const t=this.materialCache.get(e);for(const i of t)i.usedTimes--,i.usedTimes===0&&this.shaderCache.delete(i.code);return this.materialCache.delete(e),this}getVertexShaderID(e){return this._getShaderStage(e.vertexShader).id}getFragmentShaderID(e){return this._getShaderStage(e.fragmentShader).id}dispose(){this.shaderCache.clear(),this.materialCache.clear()}_getShaderCacheForMaterial(e){const t=this.materialCache;let i=t.get(e);return i===void 0&&(i=new Set,t.set(e,i)),i}_getShaderStage(e){const t=this.shaderCache;let i=t.get(e);return i===void 0&&(i=new g_(e),t.set(e,i)),i}}class g_{constructor(e){this.id=m_++,this.code=e,this.usedTimes=0}}function v_(n,e,t,i,r,s,a){const o=new hl,c=new __,l=new Set,h=[],u=r.logarithmicDepthBuffer,d=r.vertexTextures;let m=r.precision;const g={MeshDepthMaterial:"depth",MeshDistanceMaterial:"distanceRGBA",MeshNormalMaterial:"normal",MeshBasicMaterial:"basic",MeshLambertMaterial:"lambert",MeshPhongMaterial:"phong",MeshToonMaterial:"toon",MeshStandardMaterial:"physical",MeshPhysicalMaterial:"physical",MeshMatcapMaterial:"matcap",LineBasicMaterial:"basic",LineDashedMaterial:"dashed",PointsMaterial:"points",ShadowMaterial:"shadow",SpriteMaterial:"sprite"};function M(S){return l.add(S),S===0?"uv":`uv${S}`}function p(S,x,b,W,N){const k=W.fog,Z=N.geometry,G=S.isMeshStandardMaterial?W.environment:null,J=(S.isMeshStandardMaterial?t:e).get(S.envMap||G),H=J&&J.mapping===Rr?J.image.height:null,Q=g[S.type];S.precision!==null&&(m=r.getMaxPrecision(S.precision),m!==S.precision&&console.warn("THREE.WebGLProgram.getParameters:",S.precision,"not supported, using",m,"instead."));const ce=Z.morphAttributes.position||Z.morphAttributes.normal||Z.morphAttributes.color,ve=ce!==void 0?ce.length:0;let Le=0;Z.morphAttributes.position!==void 0&&(Le=1),Z.morphAttributes.normal!==void 0&&(Le=2),Z.morphAttributes.color!==void 0&&(Le=3);let je,q,te,me;if(Q){const Ze=Zt[Q];je=Ze.vertexShader,q=Ze.fragmentShader}else je=S.vertexShader,q=S.fragmentShader,c.update(S),te=c.getVertexShaderID(S),me=c.getFragmentShaderID(S);const se=n.getRenderTarget(),ye=n.state.buffers.depth.getReversed(),We=N.isInstancedMesh===!0,Te=N.isBatchedMesh===!0,at=!!S.map,tt=!!S.matcap,Ne=!!J,R=!!S.aoMap,Rt=!!S.lightMap,Fe=!!S.bumpMap,Oe=!!S.normalMap,xe=!!S.displacementMap,Qe=!!S.emissiveMap,ge=!!S.metalnessMap,y=!!S.roughnessMap,_=S.anisotropy>0,F=S.clearcoat>0,Y=S.dispersion>0,K=S.iridescence>0,X=S.sheen>0,_e=S.transmission>0,ae=_&&!!S.anisotropyMap,he=F&&!!S.clearcoatMap,He=F&&!!S.clearcoatNormalMap,ee=F&&!!S.clearcoatRoughnessMap,fe=K&&!!S.iridescenceMap,Ee=K&&!!S.iridescenceThicknessMap,be=X&&!!S.sheenColorMap,de=X&&!!S.sheenRoughnessMap,Be=!!S.specularMap,Pe=!!S.specularColorMap,Je=!!S.specularIntensityMap,D=_e&&!!S.transmissionMap,ie=_e&&!!S.thicknessMap,V=!!S.gradientMap,$=!!S.alphaMap,le=S.alphaTest>0,oe=!!S.alphaHash,Re=!!S.extensions;let nt=Mn;S.toneMapped&&(se===null||se.isXRRenderTarget===!0)&&(nt=n.toneMapping);const pt={shaderID:Q,shaderType:S.type,shaderName:S.name,vertexShader:je,fragmentShader:q,defines:S.defines,customVertexShaderID:te,customFragmentShaderID:me,isRawShaderMaterial:S.isRawShaderMaterial===!0,glslVersion:S.glslVersion,precision:m,batching:Te,batchingColor:Te&&N._colorsTexture!==null,instancing:We,instancingColor:We&&N.instanceColor!==null,instancingMorph:We&&N.morphTexture!==null,supportsVertexTextures:d,outputColorSpace:se===null?n.outputColorSpace:se.isXRRenderTarget===!0?se.texture.colorSpace:vi,alphaToCoverage:!!S.alphaToCoverage,map:at,matcap:tt,envMap:Ne,envMapMode:Ne&&J.mapping,envMapCubeUVHeight:H,aoMap:R,lightMap:Rt,bumpMap:Fe,normalMap:Oe,displacementMap:d&&xe,emissiveMap:Qe,normalMapObjectSpace:Oe&&S.normalMapType===Yu,normalMapTangentSpace:Oe&&S.normalMapType===ha,metalnessMap:ge,roughnessMap:y,anisotropy:_,anisotropyMap:ae,clearcoat:F,clearcoatMap:he,clearcoatNormalMap:He,clearcoatRoughnessMap:ee,dispersion:Y,iridescence:K,iridescenceMap:fe,iridescenceThicknessMap:Ee,sheen:X,sheenColorMap:be,sheenRoughnessMap:de,specularMap:Be,specularColorMap:Pe,specularIntensityMap:Je,transmission:_e,transmissionMap:D,thicknessMap:ie,gradientMap:V,opaque:S.transparent===!1&&S.blending===ci&&S.alphaToCoverage===!1,alphaMap:$,alphaTest:le,alphaHash:oe,combine:S.combine,mapUv:at&&M(S.map.channel),aoMapUv:R&&M(S.aoMap.channel),lightMapUv:Rt&&M(S.lightMap.channel),bumpMapUv:Fe&&M(S.bumpMap.channel),normalMapUv:Oe&&M(S.normalMap.channel),displacementMapUv:xe&&M(S.displacementMap.channel),emissiveMapUv:Qe&&M(S.emissiveMap.channel),metalnessMapUv:ge&&M(S.metalnessMap.channel),roughnessMapUv:y&&M(S.roughnessMap.channel),anisotropyMapUv:ae&&M(S.anisotropyMap.channel),clearcoatMapUv:he&&M(S.clearcoatMap.channel),clearcoatNormalMapUv:He&&M(S.clearcoatNormalMap.channel),clearcoatRoughnessMapUv:ee&&M(S.clearcoatRoughnessMap.channel),iridescenceMapUv:fe&&M(S.iridescenceMap.channel),iridescenceThicknessMapUv:Ee&&M(S.iridescenceThicknessMap.channel),sheenColorMapUv:be&&M(S.sheenColorMap.channel),sheenRoughnessMapUv:de&&M(S.sheenRoughnessMap.channel),specularMapUv:Be&&M(S.specularMap.channel),specularColorMapUv:Pe&&M(S.specularColorMap.channel),specularIntensityMapUv:Je&&M(S.specularIntensityMap.channel),transmissionMapUv:D&&M(S.transmissionMap.channel),thicknessMapUv:ie&&M(S.thicknessMap.channel),alphaMapUv:$&&M(S.alphaMap.channel),vertexTangents:!!Z.attributes.tangent&&(Oe||_),vertexColors:S.vertexColors,vertexAlphas:S.vertexColors===!0&&!!Z.attributes.color&&Z.attributes.color.itemSize===4,pointsUvs:N.isPoints===!0&&!!Z.attributes.uv&&(at||$),fog:!!k,useFog:S.fog===!0,fogExp2:!!k&&k.isFogExp2,flatShading:S.flatShading===!0,sizeAttenuation:S.sizeAttenuation===!0,logarithmicDepthBuffer:u,reverseDepthBuffer:ye,skinning:N.isSkinnedMesh===!0,morphTargets:Z.morphAttributes.position!==void 0,morphNormals:Z.morphAttributes.normal!==void 0,morphColors:Z.morphAttributes.color!==void 0,morphTargetsCount:ve,morphTextureStride:Le,numDirLights:x.directional.length,numPointLights:x.point.length,numSpotLights:x.spot.length,numSpotLightMaps:x.spotLightMap.length,numRectAreaLights:x.rectArea.length,numHemiLights:x.hemi.length,numDirLightShadows:x.directionalShadowMap.length,numPointLightShadows:x.pointShadowMap.length,numSpotLightShadows:x.spotShadowMap.length,numSpotLightShadowsWithMaps:x.numSpotLightShadowsWithMaps,numLightProbes:x.numLightProbes,numClippingPlanes:a.numPlanes,numClipIntersection:a.numIntersection,dithering:S.dithering,shadowMapEnabled:n.shadowMap.enabled&&b.length>0,shadowMapType:n.shadowMap.type,toneMapping:nt,decodeVideoTexture:at&&S.map.isVideoTexture===!0&&ke.getTransfer(S.map.colorSpace)===Ke,decodeVideoTextureEmissive:Qe&&S.emissiveMap.isVideoTexture===!0&&ke.getTransfer(S.emissiveMap.colorSpace)===Ke,premultipliedAlpha:S.premultipliedAlpha,doubleSided:S.side===Kt,flipSided:S.side===yt,useDepthPacking:S.depthPacking>=0,depthPacking:S.depthPacking||0,index0AttributeName:S.index0AttributeName,extensionClipCullDistance:Re&&S.extensions.clipCullDistance===!0&&i.has("WEBGL_clip_cull_distance"),extensionMultiDraw:(Re&&S.extensions.multiDraw===!0||Te)&&i.has("WEBGL_multi_draw"),rendererExtensionParallelShaderCompile:i.has("KHR_parallel_shader_compile"),customProgramCacheKey:S.customProgramCacheKey()};return pt.vertexUv1s=l.has(1),pt.vertexUv2s=l.has(2),pt.vertexUv3s=l.has(3),l.clear(),pt}function f(S){const x=[];if(S.shaderID?x.push(S.shaderID):(x.push(S.customVertexShaderID),x.push(S.customFragmentShaderID)),S.defines!==void 0)for(const b in S.defines)x.push(b),x.push(S.defines[b]);return S.isRawShaderMaterial===!1&&(w(x,S),T(x,S),x.push(n.outputColorSpace)),x.push(S.customProgramCacheKey),x.join()}function w(S,x){S.push(x.precision),S.push(x.outputColorSpace),S.push(x.envMapMode),S.push(x.envMapCubeUVHeight),S.push(x.mapUv),S.push(x.alphaMapUv),S.push(x.lightMapUv),S.push(x.aoMapUv),S.push(x.bumpMapUv),S.push(x.normalMapUv),S.push(x.displacementMapUv),S.push(x.emissiveMapUv),S.push(x.metalnessMapUv),S.push(x.roughnessMapUv),S.push(x.anisotropyMapUv),S.push(x.clearcoatMapUv),S.push(x.clearcoatNormalMapUv),S.push(x.clearcoatRoughnessMapUv),S.push(x.iridescenceMapUv),S.push(x.iridescenceThicknessMapUv),S.push(x.sheenColorMapUv),S.push(x.sheenRoughnessMapUv),S.push(x.specularMapUv),S.push(x.specularColorMapUv),S.push(x.specularIntensityMapUv),S.push(x.transmissionMapUv),S.push(x.thicknessMapUv),S.push(x.combine),S.push(x.fogExp2),S.push(x.sizeAttenuation),S.push(x.morphTargetsCount),S.push(x.morphAttributeCount),S.push(x.numDirLights),S.push(x.numPointLights),S.push(x.numSpotLights),S.push(x.numSpotLightMaps),S.push(x.numHemiLights),S.push(x.numRectAreaLights),S.push(x.numDirLightShadows),S.push(x.numPointLightShadows),S.push(x.numSpotLightShadows),S.push(x.numSpotLightShadowsWithMaps),S.push(x.numLightProbes),S.push(x.shadowMapType),S.push(x.toneMapping),S.push(x.numClippingPlanes),S.push(x.numClipIntersection),S.push(x.depthPacking)}function T(S,x){o.disableAll(),x.supportsVertexTextures&&o.enable(0),x.instancing&&o.enable(1),x.instancingColor&&o.enable(2),x.instancingMorph&&o.enable(3),x.matcap&&o.enable(4),x.envMap&&o.enable(5),x.normalMapObjectSpace&&o.enable(6),x.normalMapTangentSpace&&o.enable(7),x.clearcoat&&o.enable(8),x.iridescence&&o.enable(9),x.alphaTest&&o.enable(10),x.vertexColors&&o.enable(11),x.vertexAlphas&&o.enable(12),x.vertexUv1s&&o.enable(13),x.vertexUv2s&&o.enable(14),x.vertexUv3s&&o.enable(15),x.vertexTangents&&o.enable(16),x.anisotropy&&o.enable(17),x.alphaHash&&o.enable(18),x.batching&&o.enable(19),x.dispersion&&o.enable(20),x.batchingColor&&o.enable(21),S.push(o.mask),o.disableAll(),x.fog&&o.enable(0),x.useFog&&o.enable(1),x.flatShading&&o.enable(2),x.logarithmicDepthBuffer&&o.enable(3),x.reverseDepthBuffer&&o.enable(4),x.skinning&&o.enable(5),x.morphTargets&&o.enable(6),x.morphNormals&&o.enable(7),x.morphColors&&o.enable(8),x.premultipliedAlpha&&o.enable(9),x.shadowMapEnabled&&o.enable(10),x.doubleSided&&o.enable(11),x.flipSided&&o.enable(12),x.useDepthPacking&&o.enable(13),x.dithering&&o.enable(14),x.transmission&&o.enable(15),x.sheen&&o.enable(16),x.opaque&&o.enable(17),x.pointsUvs&&o.enable(18),x.decodeVideoTexture&&o.enable(19),x.decodeVideoTextureEmissive&&o.enable(20),x.alphaToCoverage&&o.enable(21),S.push(o.mask)}function E(S){const x=g[S.type];let b;if(x){const W=Zt[x];b=Vh.clone(W.uniforms)}else b=S.uniforms;return b}function C(S,x){let b;for(let W=0,N=h.length;W<N;W++){const k=h[W];if(k.cacheKey===x){b=k,++b.usedTimes;break}}return b===void 0&&(b=new p_(n,x,S,s),h.push(b)),b}function A(S){if(--S.usedTimes===0){const x=h.indexOf(S);h[x]=h[h.length-1],h.pop(),S.destroy()}}function P(S){c.remove(S)}function I(){c.dispose()}return{getParameters:p,getProgramCacheKey:f,getUniforms:E,acquireProgram:C,releaseProgram:A,releaseShaderCache:P,programs:h,dispose:I}}function x_(){let n=new WeakMap;function e(a){return n.has(a)}function t(a){let o=n.get(a);return o===void 0&&(o={},n.set(a,o)),o}function i(a){n.delete(a)}function r(a,o,c){n.get(a)[o]=c}function s(){n=new WeakMap}return{has:e,get:t,remove:i,update:r,dispose:s}}function M_(n,e){return n.groupOrder!==e.groupOrder?n.groupOrder-e.groupOrder:n.renderOrder!==e.renderOrder?n.renderOrder-e.renderOrder:n.material.id!==e.material.id?n.material.id-e.material.id:n.z!==e.z?n.z-e.z:n.id-e.id}function Po(n,e){return n.groupOrder!==e.groupOrder?n.groupOrder-e.groupOrder:n.renderOrder!==e.renderOrder?n.renderOrder-e.renderOrder:n.z!==e.z?e.z-n.z:n.id-e.id}function Do(){const n=[];let e=0;const t=[],i=[],r=[];function s(){e=0,t.length=0,i.length=0,r.length=0}function a(u,d,m,g,M,p){let f=n[e];return f===void 0?(f={id:u.id,object:u,geometry:d,material:m,groupOrder:g,renderOrder:u.renderOrder,z:M,group:p},n[e]=f):(f.id=u.id,f.object=u,f.geometry=d,f.material=m,f.groupOrder=g,f.renderOrder=u.renderOrder,f.z=M,f.group=p),e++,f}function o(u,d,m,g,M,p){const f=a(u,d,m,g,M,p);m.transmission>0?i.push(f):m.transparent===!0?r.push(f):t.push(f)}function c(u,d,m,g,M,p){const f=a(u,d,m,g,M,p);m.transmission>0?i.unshift(f):m.transparent===!0?r.unshift(f):t.unshift(f)}function l(u,d){t.length>1&&t.sort(u||M_),i.length>1&&i.sort(d||Po),r.length>1&&r.sort(d||Po)}function h(){for(let u=e,d=n.length;u<d;u++){const m=n[u];if(m.id===null)break;m.id=null,m.object=null,m.geometry=null,m.material=null,m.group=null}}return{opaque:t,transmissive:i,transparent:r,init:s,push:o,unshift:c,finish:h,sort:l}}function S_(){let n=new WeakMap;function e(i,r){const s=n.get(i);let a;return s===void 0?(a=new Do,n.set(i,[a])):r>=s.length?(a=new Do,s.push(a)):a=s[r],a}function t(){n=new WeakMap}return{get:e,dispose:t}}function E_(){const n={};return{get:function(e){if(n[e.id]!==void 0)return n[e.id];let t;switch(e.type){case"DirectionalLight":t={direction:new B,color:new ze};break;case"SpotLight":t={position:new B,direction:new B,color:new ze,distance:0,coneCos:0,penumbraCos:0,decay:0};break;case"PointLight":t={position:new B,color:new ze,distance:0,decay:0};break;case"HemisphereLight":t={direction:new B,skyColor:new ze,groundColor:new ze};break;case"RectAreaLight":t={color:new ze,position:new B,halfWidth:new B,halfHeight:new B};break}return n[e.id]=t,t}}}function y_(){const n={};return{get:function(e){if(n[e.id]!==void 0)return n[e.id];let t;switch(e.type){case"DirectionalLight":t={shadowIntensity:1,shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new qe};break;case"SpotLight":t={shadowIntensity:1,shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new qe};break;case"PointLight":t={shadowIntensity:1,shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new qe,shadowCameraNear:1,shadowCameraFar:1e3};break}return n[e.id]=t,t}}}let T_=0;function b_(n,e){return(e.castShadow?2:0)-(n.castShadow?2:0)+(e.map?1:0)-(n.map?1:0)}function A_(n){const e=new E_,t=y_(),i={version:0,hash:{directionalLength:-1,pointLength:-1,spotLength:-1,rectAreaLength:-1,hemiLength:-1,numDirectionalShadows:-1,numPointShadows:-1,numSpotShadows:-1,numSpotMaps:-1,numLightProbes:-1},ambient:[0,0,0],probe:[],directional:[],directionalShadow:[],directionalShadowMap:[],directionalShadowMatrix:[],spot:[],spotLightMap:[],spotShadow:[],spotShadowMap:[],spotLightMatrix:[],rectArea:[],rectAreaLTC1:null,rectAreaLTC2:null,point:[],pointShadow:[],pointShadowMap:[],pointShadowMatrix:[],hemi:[],numSpotLightShadowsWithMaps:0,numLightProbes:0};for(let l=0;l<9;l++)i.probe.push(new B);const r=new B,s=new st,a=new st;function o(l){let h=0,u=0,d=0;for(let S=0;S<9;S++)i.probe[S].set(0,0,0);let m=0,g=0,M=0,p=0,f=0,w=0,T=0,E=0,C=0,A=0,P=0;l.sort(b_);for(let S=0,x=l.length;S<x;S++){const b=l[S],W=b.color,N=b.intensity,k=b.distance,Z=b.shadow&&b.shadow.map?b.shadow.map.texture:null;if(b.isAmbientLight)h+=W.r*N,u+=W.g*N,d+=W.b*N;else if(b.isLightProbe){for(let G=0;G<9;G++)i.probe[G].addScaledVector(b.sh.coefficients[G],N);P++}else if(b.isDirectionalLight){const G=e.get(b);if(G.color.copy(b.color).multiplyScalar(b.intensity),b.castShadow){const J=b.shadow,H=t.get(b);H.shadowIntensity=J.intensity,H.shadowBias=J.bias,H.shadowNormalBias=J.normalBias,H.shadowRadius=J.radius,H.shadowMapSize=J.mapSize,i.directionalShadow[m]=H,i.directionalShadowMap[m]=Z,i.directionalShadowMatrix[m]=b.shadow.matrix,w++}i.directional[m]=G,m++}else if(b.isSpotLight){const G=e.get(b);G.position.setFromMatrixPosition(b.matrixWorld),G.color.copy(W).multiplyScalar(N),G.distance=k,G.coneCos=Math.cos(b.angle),G.penumbraCos=Math.cos(b.angle*(1-b.penumbra)),G.decay=b.decay,i.spot[M]=G;const J=b.shadow;if(b.map&&(i.spotLightMap[C]=b.map,C++,J.updateMatrices(b),b.castShadow&&A++),i.spotLightMatrix[M]=J.matrix,b.castShadow){const H=t.get(b);H.shadowIntensity=J.intensity,H.shadowBias=J.bias,H.shadowNormalBias=J.normalBias,H.shadowRadius=J.radius,H.shadowMapSize=J.mapSize,i.spotShadow[M]=H,i.spotShadowMap[M]=Z,E++}M++}else if(b.isRectAreaLight){const G=e.get(b);G.color.copy(W).multiplyScalar(N),G.halfWidth.set(b.width*.5,0,0),G.halfHeight.set(0,b.height*.5,0),i.rectArea[p]=G,p++}else if(b.isPointLight){const G=e.get(b);if(G.color.copy(b.color).multiplyScalar(b.intensity),G.distance=b.distance,G.decay=b.decay,b.castShadow){const J=b.shadow,H=t.get(b);H.shadowIntensity=J.intensity,H.shadowBias=J.bias,H.shadowNormalBias=J.normalBias,H.shadowRadius=J.radius,H.shadowMapSize=J.mapSize,H.shadowCameraNear=J.camera.near,H.shadowCameraFar=J.camera.far,i.pointShadow[g]=H,i.pointShadowMap[g]=Z,i.pointShadowMatrix[g]=b.shadow.matrix,T++}i.point[g]=G,g++}else if(b.isHemisphereLight){const G=e.get(b);G.skyColor.copy(b.color).multiplyScalar(N),G.groundColor.copy(b.groundColor).multiplyScalar(N),i.hemi[f]=G,f++}}p>0&&(n.has("OES_texture_float_linear")===!0?(i.rectAreaLTC1=ne.LTC_FLOAT_1,i.rectAreaLTC2=ne.LTC_FLOAT_2):(i.rectAreaLTC1=ne.LTC_HALF_1,i.rectAreaLTC2=ne.LTC_HALF_2)),i.ambient[0]=h,i.ambient[1]=u,i.ambient[2]=d;const I=i.hash;(I.directionalLength!==m||I.pointLength!==g||I.spotLength!==M||I.rectAreaLength!==p||I.hemiLength!==f||I.numDirectionalShadows!==w||I.numPointShadows!==T||I.numSpotShadows!==E||I.numSpotMaps!==C||I.numLightProbes!==P)&&(i.directional.length=m,i.spot.length=M,i.rectArea.length=p,i.point.length=g,i.hemi.length=f,i.directionalShadow.length=w,i.directionalShadowMap.length=w,i.pointShadow.length=T,i.pointShadowMap.length=T,i.spotShadow.length=E,i.spotShadowMap.length=E,i.directionalShadowMatrix.length=w,i.pointShadowMatrix.length=T,i.spotLightMatrix.length=E+C-A,i.spotLightMap.length=C,i.numSpotLightShadowsWithMaps=A,i.numLightProbes=P,I.directionalLength=m,I.pointLength=g,I.spotLength=M,I.rectAreaLength=p,I.hemiLength=f,I.numDirectionalShadows=w,I.numPointShadows=T,I.numSpotShadows=E,I.numSpotMaps=C,I.numLightProbes=P,i.version=T_++)}function c(l,h){let u=0,d=0,m=0,g=0,M=0;const p=h.matrixWorldInverse;for(let f=0,w=l.length;f<w;f++){const T=l[f];if(T.isDirectionalLight){const E=i.directional[u];E.direction.setFromMatrixPosition(T.matrixWorld),r.setFromMatrixPosition(T.target.matrixWorld),E.direction.sub(r),E.direction.transformDirection(p),u++}else if(T.isSpotLight){const E=i.spot[m];E.position.setFromMatrixPosition(T.matrixWorld),E.position.applyMatrix4(p),E.direction.setFromMatrixPosition(T.matrixWorld),r.setFromMatrixPosition(T.target.matrixWorld),E.direction.sub(r),E.direction.transformDirection(p),m++}else if(T.isRectAreaLight){const E=i.rectArea[g];E.position.setFromMatrixPosition(T.matrixWorld),E.position.applyMatrix4(p),a.identity(),s.copy(T.matrixWorld),s.premultiply(p),a.extractRotation(s),E.halfWidth.set(T.width*.5,0,0),E.halfHeight.set(0,T.height*.5,0),E.halfWidth.applyMatrix4(a),E.halfHeight.applyMatrix4(a),g++}else if(T.isPointLight){const E=i.point[d];E.position.setFromMatrixPosition(T.matrixWorld),E.position.applyMatrix4(p),d++}else if(T.isHemisphereLight){const E=i.hemi[M];E.direction.setFromMatrixPosition(T.matrixWorld),E.direction.transformDirection(p),M++}}}return{setup:o,setupView:c,state:i}}function Lo(n){const e=new A_(n),t=[],i=[];function r(h){l.camera=h,t.length=0,i.length=0}function s(h){t.push(h)}function a(h){i.push(h)}function o(){e.setup(t)}function c(h){e.setupView(t,h)}const l={lightsArray:t,shadowsArray:i,camera:null,lights:e,transmissionRenderTarget:{}};return{init:r,state:l,setupLights:o,setupLightsView:c,pushLight:s,pushShadow:a}}function w_(n){let e=new WeakMap;function t(r,s=0){const a=e.get(r);let o;return a===void 0?(o=new Lo(n),e.set(r,[o])):s>=a.length?(o=new Lo(n),a.push(o)):o=a[s],o}function i(){e=new WeakMap}return{get:t,dispose:i}}const R_=`void main() {
	gl_Position = vec4( position, 1.0 );
}`,C_=`uniform sampler2D shadow_pass;
uniform vec2 resolution;
uniform float radius;
#include <packing>
void main() {
	const float samples = float( VSM_SAMPLES );
	float mean = 0.0;
	float squared_mean = 0.0;
	float uvStride = samples <= 1.0 ? 0.0 : 2.0 / ( samples - 1.0 );
	float uvStart = samples <= 1.0 ? 0.0 : - 1.0;
	for ( float i = 0.0; i < samples; i ++ ) {
		float uvOffset = uvStart + i * uvStride;
		#ifdef HORIZONTAL_PASS
			vec2 distribution = unpackRGBATo2Half( texture2D( shadow_pass, ( gl_FragCoord.xy + vec2( uvOffset, 0.0 ) * radius ) / resolution ) );
			mean += distribution.x;
			squared_mean += distribution.y * distribution.y + distribution.x * distribution.x;
		#else
			float depth = unpackRGBAToDepth( texture2D( shadow_pass, ( gl_FragCoord.xy + vec2( 0.0, uvOffset ) * radius ) / resolution ) );
			mean += depth;
			squared_mean += depth * depth;
		#endif
	}
	mean = mean / samples;
	squared_mean = squared_mean / samples;
	float std_dev = sqrt( squared_mean - mean * mean );
	gl_FragColor = pack2HalfToRGBA( vec2( mean, std_dev ) );
}`;function P_(n,e,t){let i=new pa;const r=new qe,s=new qe,a=new rt,o=new Jh({depthPacking:qu}),c=new Qh,l={},h=t.maxTextureSize,u={[En]:yt,[yt]:En,[Kt]:Kt},d=new yn({defines:{VSM_SAMPLES:8},uniforms:{shadow_pass:{value:null},resolution:{value:new qe},radius:{value:4}},vertexShader:R_,fragmentShader:C_}),m=d.clone();m.defines.HORIZONTAL_PASS=1;const g=new Tn;g.setAttribute("position",new Jt(new Float32Array([-1,-1,.5,3,-1,.5,-1,3,.5]),3));const M=new Xt(g,d),p=this;this.enabled=!1,this.autoUpdate=!0,this.needsUpdate=!1,this.type=Zo;let f=this.type;this.render=function(A,P,I){if(p.enabled===!1||p.autoUpdate===!1&&p.needsUpdate===!1||A.length===0)return;const S=n.getRenderTarget(),x=n.getActiveCubeFace(),b=n.getActiveMipmapLevel(),W=n.state;W.setBlending(xn),W.buffers.color.setClear(1,1,1,1),W.buffers.depth.setTest(!0),W.setScissorTest(!1);const N=f!==$t&&this.type===$t,k=f===$t&&this.type!==$t;for(let Z=0,G=A.length;Z<G;Z++){const J=A[Z],H=J.shadow;if(H===void 0){console.warn("THREE.WebGLShadowMap:",J,"has no shadow.");continue}if(H.autoUpdate===!1&&H.needsUpdate===!1)continue;r.copy(H.mapSize);const Q=H.getFrameExtents();if(r.multiply(Q),s.copy(H.mapSize),(r.x>h||r.y>h)&&(r.x>h&&(s.x=Math.floor(h/Q.x),r.x=s.x*Q.x,H.mapSize.x=s.x),r.y>h&&(s.y=Math.floor(h/Q.y),r.y=s.y*Q.y,H.mapSize.y=s.y)),H.map===null||N===!0||k===!0){const ve=this.type!==$t?{minFilter:qt,magFilter:qt}:{};H.map!==null&&H.map.dispose(),H.map=new Wn(r.x,r.y,ve),H.map.texture.name=J.name+".shadowMap",H.camera.updateProjectionMatrix()}n.setRenderTarget(H.map),n.clear();const ce=H.getViewportCount();for(let ve=0;ve<ce;ve++){const Le=H.getViewport(ve);a.set(s.x*Le.x,s.y*Le.y,s.x*Le.z,s.y*Le.w),W.viewport(a),H.updateMatrices(J,ve),i=H.getFrustum(),E(P,I,H.camera,J,this.type)}H.isPointLightShadow!==!0&&this.type===$t&&w(H,I),H.needsUpdate=!1}f=this.type,p.needsUpdate=!1,n.setRenderTarget(S,x,b)};function w(A,P){const I=e.update(M);d.defines.VSM_SAMPLES!==A.blurSamples&&(d.defines.VSM_SAMPLES=A.blurSamples,m.defines.VSM_SAMPLES=A.blurSamples,d.needsUpdate=!0,m.needsUpdate=!0),A.mapPass===null&&(A.mapPass=new Wn(r.x,r.y)),d.uniforms.shadow_pass.value=A.map.texture,d.uniforms.resolution.value=A.mapSize,d.uniforms.radius.value=A.radius,n.setRenderTarget(A.mapPass),n.clear(),n.renderBufferDirect(P,null,I,d,M,null),m.uniforms.shadow_pass.value=A.mapPass.texture,m.uniforms.resolution.value=A.mapSize,m.uniforms.radius.value=A.radius,n.setRenderTarget(A.map),n.clear(),n.renderBufferDirect(P,null,I,m,M,null)}function T(A,P,I,S){let x=null;const b=I.isPointLight===!0?A.customDistanceMaterial:A.customDepthMaterial;if(b!==void 0)x=b;else if(x=I.isPointLight===!0?c:o,n.localClippingEnabled&&P.clipShadows===!0&&Array.isArray(P.clippingPlanes)&&P.clippingPlanes.length!==0||P.displacementMap&&P.displacementScale!==0||P.alphaMap&&P.alphaTest>0||P.map&&P.alphaTest>0){const W=x.uuid,N=P.uuid;let k=l[W];k===void 0&&(k={},l[W]=k);let Z=k[N];Z===void 0&&(Z=x.clone(),k[N]=Z,P.addEventListener("dispose",C)),x=Z}if(x.visible=P.visible,x.wireframe=P.wireframe,S===$t?x.side=P.shadowSide!==null?P.shadowSide:P.side:x.side=P.shadowSide!==null?P.shadowSide:u[P.side],x.alphaMap=P.alphaMap,x.alphaTest=P.alphaTest,x.map=P.map,x.clipShadows=P.clipShadows,x.clippingPlanes=P.clippingPlanes,x.clipIntersection=P.clipIntersection,x.displacementMap=P.displacementMap,x.displacementScale=P.displacementScale,x.displacementBias=P.displacementBias,x.wireframeLinewidth=P.wireframeLinewidth,x.linewidth=P.linewidth,I.isPointLight===!0&&x.isMeshDistanceMaterial===!0){const W=n.properties.get(x);W.light=I}return x}function E(A,P,I,S,x){if(A.visible===!1)return;if(A.layers.test(P.layers)&&(A.isMesh||A.isLine||A.isPoints)&&(A.castShadow||A.receiveShadow&&x===$t)&&(!A.frustumCulled||i.intersectsObject(A))){A.modelViewMatrix.multiplyMatrices(I.matrixWorldInverse,A.matrixWorld);const N=e.update(A),k=A.material;if(Array.isArray(k)){const Z=N.groups;for(let G=0,J=Z.length;G<J;G++){const H=Z[G],Q=k[H.materialIndex];if(Q&&Q.visible){const ce=T(A,Q,S,x);A.onBeforeShadow(n,A,P,I,N,ce,H),n.renderBufferDirect(I,null,N,ce,A,H),A.onAfterShadow(n,A,P,I,N,ce,H)}}}else if(k.visible){const Z=T(A,k,S,x);A.onBeforeShadow(n,A,P,I,N,Z,null),n.renderBufferDirect(I,null,N,Z,A,null),A.onAfterShadow(n,A,P,I,N,Z,null)}}const W=A.children;for(let N=0,k=W.length;N<k;N++)E(W[N],P,I,S,x)}function C(A){A.target.removeEventListener("dispose",C);for(const I in l){const S=l[I],x=A.target.uuid;x in S&&(S[x].dispose(),delete S[x])}}}const D_={[ds]:ps,[ms]:vs,[_s]:xs,[di]:gs,[ps]:ds,[vs]:ms,[xs]:_s,[gs]:di};function L_(n,e){function t(){let D=!1;const ie=new rt;let V=null;const $=new rt(0,0,0,0);return{setMask:function(le){V!==le&&!D&&(n.colorMask(le,le,le,le),V=le)},setLocked:function(le){D=le},setClear:function(le,oe,Re,nt,pt){pt===!0&&(le*=nt,oe*=nt,Re*=nt),ie.set(le,oe,Re,nt),$.equals(ie)===!1&&(n.clearColor(le,oe,Re,nt),$.copy(ie))},reset:function(){D=!1,V=null,$.set(-1,0,0,0)}}}function i(){let D=!1,ie=!1,V=null,$=null,le=null;return{setReversed:function(oe){if(ie!==oe){const Re=e.get("EXT_clip_control");ie?Re.clipControlEXT(Re.LOWER_LEFT_EXT,Re.ZERO_TO_ONE_EXT):Re.clipControlEXT(Re.LOWER_LEFT_EXT,Re.NEGATIVE_ONE_TO_ONE_EXT);const nt=le;le=null,this.setClear(nt)}ie=oe},getReversed:function(){return ie},setTest:function(oe){oe?se(n.DEPTH_TEST):ye(n.DEPTH_TEST)},setMask:function(oe){V!==oe&&!D&&(n.depthMask(oe),V=oe)},setFunc:function(oe){if(ie&&(oe=D_[oe]),$!==oe){switch(oe){case ds:n.depthFunc(n.NEVER);break;case ps:n.depthFunc(n.ALWAYS);break;case ms:n.depthFunc(n.LESS);break;case di:n.depthFunc(n.LEQUAL);break;case _s:n.depthFunc(n.EQUAL);break;case gs:n.depthFunc(n.GEQUAL);break;case vs:n.depthFunc(n.GREATER);break;case xs:n.depthFunc(n.NOTEQUAL);break;default:n.depthFunc(n.LEQUAL)}$=oe}},setLocked:function(oe){D=oe},setClear:function(oe){le!==oe&&(ie&&(oe=1-oe),n.clearDepth(oe),le=oe)},reset:function(){D=!1,V=null,$=null,le=null,ie=!1}}}function r(){let D=!1,ie=null,V=null,$=null,le=null,oe=null,Re=null,nt=null,pt=null;return{setTest:function(Ze){D||(Ze?se(n.STENCIL_TEST):ye(n.STENCIL_TEST))},setMask:function(Ze){ie!==Ze&&!D&&(n.stencilMask(Ze),ie=Ze)},setFunc:function(Ze,Nt,en){(V!==Ze||$!==Nt||le!==en)&&(n.stencilFunc(Ze,Nt,en),V=Ze,$=Nt,le=en)},setOp:function(Ze,Nt,en){(oe!==Ze||Re!==Nt||nt!==en)&&(n.stencilOp(Ze,Nt,en),oe=Ze,Re=Nt,nt=en)},setLocked:function(Ze){D=Ze},setClear:function(Ze){pt!==Ze&&(n.clearStencil(Ze),pt=Ze)},reset:function(){D=!1,ie=null,V=null,$=null,le=null,oe=null,Re=null,nt=null,pt=null}}}const s=new t,a=new i,o=new r,c=new WeakMap,l=new WeakMap;let h={},u={},d=new WeakMap,m=[],g=null,M=!1,p=null,f=null,w=null,T=null,E=null,C=null,A=null,P=new ze(0,0,0),I=0,S=!1,x=null,b=null,W=null,N=null,k=null;const Z=n.getParameter(n.MAX_COMBINED_TEXTURE_IMAGE_UNITS);let G=!1,J=0;const H=n.getParameter(n.VERSION);H.indexOf("WebGL")!==-1?(J=parseFloat(/^WebGL (\d)/.exec(H)[1]),G=J>=1):H.indexOf("OpenGL ES")!==-1&&(J=parseFloat(/^OpenGL ES (\d)/.exec(H)[1]),G=J>=2);let Q=null,ce={};const ve=n.getParameter(n.SCISSOR_BOX),Le=n.getParameter(n.VIEWPORT),je=new rt().fromArray(ve),q=new rt().fromArray(Le);function te(D,ie,V,$){const le=new Uint8Array(4),oe=n.createTexture();n.bindTexture(D,oe),n.texParameteri(D,n.TEXTURE_MIN_FILTER,n.NEAREST),n.texParameteri(D,n.TEXTURE_MAG_FILTER,n.NEAREST);for(let Re=0;Re<V;Re++)D===n.TEXTURE_3D||D===n.TEXTURE_2D_ARRAY?n.texImage3D(ie,0,n.RGBA,1,1,$,0,n.RGBA,n.UNSIGNED_BYTE,le):n.texImage2D(ie+Re,0,n.RGBA,1,1,0,n.RGBA,n.UNSIGNED_BYTE,le);return oe}const me={};me[n.TEXTURE_2D]=te(n.TEXTURE_2D,n.TEXTURE_2D,1),me[n.TEXTURE_CUBE_MAP]=te(n.TEXTURE_CUBE_MAP,n.TEXTURE_CUBE_MAP_POSITIVE_X,6),me[n.TEXTURE_2D_ARRAY]=te(n.TEXTURE_2D_ARRAY,n.TEXTURE_2D_ARRAY,1,1),me[n.TEXTURE_3D]=te(n.TEXTURE_3D,n.TEXTURE_3D,1,1),s.setClear(0,0,0,1),a.setClear(1),o.setClear(0),se(n.DEPTH_TEST),a.setFunc(di),Fe(!1),Oe(Ua),se(n.CULL_FACE),R(xn);function se(D){h[D]!==!0&&(n.enable(D),h[D]=!0)}function ye(D){h[D]!==!1&&(n.disable(D),h[D]=!1)}function We(D,ie){return u[D]!==ie?(n.bindFramebuffer(D,ie),u[D]=ie,D===n.DRAW_FRAMEBUFFER&&(u[n.FRAMEBUFFER]=ie),D===n.FRAMEBUFFER&&(u[n.DRAW_FRAMEBUFFER]=ie),!0):!1}function Te(D,ie){let V=m,$=!1;if(D){V=d.get(ie),V===void 0&&(V=[],d.set(ie,V));const le=D.textures;if(V.length!==le.length||V[0]!==n.COLOR_ATTACHMENT0){for(let oe=0,Re=le.length;oe<Re;oe++)V[oe]=n.COLOR_ATTACHMENT0+oe;V.length=le.length,$=!0}}else V[0]!==n.BACK&&(V[0]=n.BACK,$=!0);$&&n.drawBuffers(V)}function at(D){return g!==D?(n.useProgram(D),g=D,!0):!1}const tt={[Nn]:n.FUNC_ADD,[vu]:n.FUNC_SUBTRACT,[xu]:n.FUNC_REVERSE_SUBTRACT};tt[Mu]=n.MIN,tt[Su]=n.MAX;const Ne={[Eu]:n.ZERO,[yu]:n.ONE,[Tu]:n.SRC_COLOR,[hs]:n.SRC_ALPHA,[Pu]:n.SRC_ALPHA_SATURATE,[Ru]:n.DST_COLOR,[Au]:n.DST_ALPHA,[bu]:n.ONE_MINUS_SRC_COLOR,[fs]:n.ONE_MINUS_SRC_ALPHA,[Cu]:n.ONE_MINUS_DST_COLOR,[wu]:n.ONE_MINUS_DST_ALPHA,[Du]:n.CONSTANT_COLOR,[Lu]:n.ONE_MINUS_CONSTANT_COLOR,[Uu]:n.CONSTANT_ALPHA,[Iu]:n.ONE_MINUS_CONSTANT_ALPHA};function R(D,ie,V,$,le,oe,Re,nt,pt,Ze){if(D===xn){M===!0&&(ye(n.BLEND),M=!1);return}if(M===!1&&(se(n.BLEND),M=!0),D!==gu){if(D!==p||Ze!==S){if((f!==Nn||E!==Nn)&&(n.blendEquation(n.FUNC_ADD),f=Nn,E=Nn),Ze)switch(D){case ci:n.blendFuncSeparate(n.ONE,n.ONE_MINUS_SRC_ALPHA,n.ONE,n.ONE_MINUS_SRC_ALPHA);break;case Ia:n.blendFunc(n.ONE,n.ONE);break;case Na:n.blendFuncSeparate(n.ZERO,n.ONE_MINUS_SRC_COLOR,n.ZERO,n.ONE);break;case Fa:n.blendFuncSeparate(n.ZERO,n.SRC_COLOR,n.ZERO,n.SRC_ALPHA);break;default:console.error("THREE.WebGLState: Invalid blending: ",D);break}else switch(D){case ci:n.blendFuncSeparate(n.SRC_ALPHA,n.ONE_MINUS_SRC_ALPHA,n.ONE,n.ONE_MINUS_SRC_ALPHA);break;case Ia:n.blendFunc(n.SRC_ALPHA,n.ONE);break;case Na:n.blendFuncSeparate(n.ZERO,n.ONE_MINUS_SRC_COLOR,n.ZERO,n.ONE);break;case Fa:n.blendFunc(n.ZERO,n.SRC_COLOR);break;default:console.error("THREE.WebGLState: Invalid blending: ",D);break}w=null,T=null,C=null,A=null,P.set(0,0,0),I=0,p=D,S=Ze}return}le=le||ie,oe=oe||V,Re=Re||$,(ie!==f||le!==E)&&(n.blendEquationSeparate(tt[ie],tt[le]),f=ie,E=le),(V!==w||$!==T||oe!==C||Re!==A)&&(n.blendFuncSeparate(Ne[V],Ne[$],Ne[oe],Ne[Re]),w=V,T=$,C=oe,A=Re),(nt.equals(P)===!1||pt!==I)&&(n.blendColor(nt.r,nt.g,nt.b,pt),P.copy(nt),I=pt),p=D,S=!1}function Rt(D,ie){D.side===Kt?ye(n.CULL_FACE):se(n.CULL_FACE);let V=D.side===yt;ie&&(V=!V),Fe(V),D.blending===ci&&D.transparent===!1?R(xn):R(D.blending,D.blendEquation,D.blendSrc,D.blendDst,D.blendEquationAlpha,D.blendSrcAlpha,D.blendDstAlpha,D.blendColor,D.blendAlpha,D.premultipliedAlpha),a.setFunc(D.depthFunc),a.setTest(D.depthTest),a.setMask(D.depthWrite),s.setMask(D.colorWrite);const $=D.stencilWrite;o.setTest($),$&&(o.setMask(D.stencilWriteMask),o.setFunc(D.stencilFunc,D.stencilRef,D.stencilFuncMask),o.setOp(D.stencilFail,D.stencilZFail,D.stencilZPass)),Qe(D.polygonOffset,D.polygonOffsetFactor,D.polygonOffsetUnits),D.alphaToCoverage===!0?se(n.SAMPLE_ALPHA_TO_COVERAGE):ye(n.SAMPLE_ALPHA_TO_COVERAGE)}function Fe(D){x!==D&&(D?n.frontFace(n.CW):n.frontFace(n.CCW),x=D)}function Oe(D){D!==pu?(se(n.CULL_FACE),D!==b&&(D===Ua?n.cullFace(n.BACK):D===mu?n.cullFace(n.FRONT):n.cullFace(n.FRONT_AND_BACK))):ye(n.CULL_FACE),b=D}function xe(D){D!==W&&(G&&n.lineWidth(D),W=D)}function Qe(D,ie,V){D?(se(n.POLYGON_OFFSET_FILL),(N!==ie||k!==V)&&(n.polygonOffset(ie,V),N=ie,k=V)):ye(n.POLYGON_OFFSET_FILL)}function ge(D){D?se(n.SCISSOR_TEST):ye(n.SCISSOR_TEST)}function y(D){D===void 0&&(D=n.TEXTURE0+Z-1),Q!==D&&(n.activeTexture(D),Q=D)}function _(D,ie,V){V===void 0&&(Q===null?V=n.TEXTURE0+Z-1:V=Q);let $=ce[V];$===void 0&&($={type:void 0,texture:void 0},ce[V]=$),($.type!==D||$.texture!==ie)&&(Q!==V&&(n.activeTexture(V),Q=V),n.bindTexture(D,ie||me[D]),$.type=D,$.texture=ie)}function F(){const D=ce[Q];D!==void 0&&D.type!==void 0&&(n.bindTexture(D.type,null),D.type=void 0,D.texture=void 0)}function Y(){try{n.compressedTexImage2D.apply(n,arguments)}catch(D){console.error("THREE.WebGLState:",D)}}function K(){try{n.compressedTexImage3D.apply(n,arguments)}catch(D){console.error("THREE.WebGLState:",D)}}function X(){try{n.texSubImage2D.apply(n,arguments)}catch(D){console.error("THREE.WebGLState:",D)}}function _e(){try{n.texSubImage3D.apply(n,arguments)}catch(D){console.error("THREE.WebGLState:",D)}}function ae(){try{n.compressedTexSubImage2D.apply(n,arguments)}catch(D){console.error("THREE.WebGLState:",D)}}function he(){try{n.compressedTexSubImage3D.apply(n,arguments)}catch(D){console.error("THREE.WebGLState:",D)}}function He(){try{n.texStorage2D.apply(n,arguments)}catch(D){console.error("THREE.WebGLState:",D)}}function ee(){try{n.texStorage3D.apply(n,arguments)}catch(D){console.error("THREE.WebGLState:",D)}}function fe(){try{n.texImage2D.apply(n,arguments)}catch(D){console.error("THREE.WebGLState:",D)}}function Ee(){try{n.texImage3D.apply(n,arguments)}catch(D){console.error("THREE.WebGLState:",D)}}function be(D){je.equals(D)===!1&&(n.scissor(D.x,D.y,D.z,D.w),je.copy(D))}function de(D){q.equals(D)===!1&&(n.viewport(D.x,D.y,D.z,D.w),q.copy(D))}function Be(D,ie){let V=l.get(ie);V===void 0&&(V=new WeakMap,l.set(ie,V));let $=V.get(D);$===void 0&&($=n.getUniformBlockIndex(ie,D.name),V.set(D,$))}function Pe(D,ie){const $=l.get(ie).get(D);c.get(ie)!==$&&(n.uniformBlockBinding(ie,$,D.__bindingPointIndex),c.set(ie,$))}function Je(){n.disable(n.BLEND),n.disable(n.CULL_FACE),n.disable(n.DEPTH_TEST),n.disable(n.POLYGON_OFFSET_FILL),n.disable(n.SCISSOR_TEST),n.disable(n.STENCIL_TEST),n.disable(n.SAMPLE_ALPHA_TO_COVERAGE),n.blendEquation(n.FUNC_ADD),n.blendFunc(n.ONE,n.ZERO),n.blendFuncSeparate(n.ONE,n.ZERO,n.ONE,n.ZERO),n.blendColor(0,0,0,0),n.colorMask(!0,!0,!0,!0),n.clearColor(0,0,0,0),n.depthMask(!0),n.depthFunc(n.LESS),a.setReversed(!1),n.clearDepth(1),n.stencilMask(4294967295),n.stencilFunc(n.ALWAYS,0,4294967295),n.stencilOp(n.KEEP,n.KEEP,n.KEEP),n.clearStencil(0),n.cullFace(n.BACK),n.frontFace(n.CCW),n.polygonOffset(0,0),n.activeTexture(n.TEXTURE0),n.bindFramebuffer(n.FRAMEBUFFER,null),n.bindFramebuffer(n.DRAW_FRAMEBUFFER,null),n.bindFramebuffer(n.READ_FRAMEBUFFER,null),n.useProgram(null),n.lineWidth(1),n.scissor(0,0,n.canvas.width,n.canvas.height),n.viewport(0,0,n.canvas.width,n.canvas.height),h={},Q=null,ce={},u={},d=new WeakMap,m=[],g=null,M=!1,p=null,f=null,w=null,T=null,E=null,C=null,A=null,P=new ze(0,0,0),I=0,S=!1,x=null,b=null,W=null,N=null,k=null,je.set(0,0,n.canvas.width,n.canvas.height),q.set(0,0,n.canvas.width,n.canvas.height),s.reset(),a.reset(),o.reset()}return{buffers:{color:s,depth:a,stencil:o},enable:se,disable:ye,bindFramebuffer:We,drawBuffers:Te,useProgram:at,setBlending:R,setMaterial:Rt,setFlipSided:Fe,setCullFace:Oe,setLineWidth:xe,setPolygonOffset:Qe,setScissorTest:ge,activeTexture:y,bindTexture:_,unbindTexture:F,compressedTexImage2D:Y,compressedTexImage3D:K,texImage2D:fe,texImage3D:Ee,updateUBOMapping:Be,uniformBlockBinding:Pe,texStorage2D:He,texStorage3D:ee,texSubImage2D:X,texSubImage3D:_e,compressedTexSubImage2D:ae,compressedTexSubImage3D:he,scissor:be,viewport:de,reset:Je}}function U_(n,e,t,i,r,s,a){const o=e.has("WEBGL_multisampled_render_to_texture")?e.get("WEBGL_multisampled_render_to_texture"):null,c=typeof navigator>"u"?!1:/OculusBrowser/g.test(navigator.userAgent),l=new qe,h=new WeakMap;let u;const d=new WeakMap;let m=!1;try{m=typeof OffscreenCanvas<"u"&&new OffscreenCanvas(1,1).getContext("2d")!==null}catch{}function g(y,_){return m?new OffscreenCanvas(y,_):Ar("canvas")}function M(y,_,F){let Y=1;const K=ge(y);if((K.width>F||K.height>F)&&(Y=F/Math.max(K.width,K.height)),Y<1)if(typeof HTMLImageElement<"u"&&y instanceof HTMLImageElement||typeof HTMLCanvasElement<"u"&&y instanceof HTMLCanvasElement||typeof ImageBitmap<"u"&&y instanceof ImageBitmap||typeof VideoFrame<"u"&&y instanceof VideoFrame){const X=Math.floor(Y*K.width),_e=Math.floor(Y*K.height);u===void 0&&(u=g(X,_e));const ae=_?g(X,_e):u;return ae.width=X,ae.height=_e,ae.getContext("2d").drawImage(y,0,0,X,_e),console.warn("THREE.WebGLRenderer: Texture has been resized from ("+K.width+"x"+K.height+") to ("+X+"x"+_e+")."),ae}else return"data"in y&&console.warn("THREE.WebGLRenderer: Image in DataTexture is too big ("+K.width+"x"+K.height+")."),y;return y}function p(y){return y.generateMipmaps}function f(y){n.generateMipmap(y)}function w(y){return y.isWebGLCubeRenderTarget?n.TEXTURE_CUBE_MAP:y.isWebGL3DRenderTarget?n.TEXTURE_3D:y.isWebGLArrayRenderTarget||y.isCompressedArrayTexture?n.TEXTURE_2D_ARRAY:n.TEXTURE_2D}function T(y,_,F,Y,K=!1){if(y!==null){if(n[y]!==void 0)return n[y];console.warn("THREE.WebGLRenderer: Attempt to use non-existing WebGL internal format '"+y+"'")}let X=_;if(_===n.RED&&(F===n.FLOAT&&(X=n.R32F),F===n.HALF_FLOAT&&(X=n.R16F),F===n.UNSIGNED_BYTE&&(X=n.R8)),_===n.RED_INTEGER&&(F===n.UNSIGNED_BYTE&&(X=n.R8UI),F===n.UNSIGNED_SHORT&&(X=n.R16UI),F===n.UNSIGNED_INT&&(X=n.R32UI),F===n.BYTE&&(X=n.R8I),F===n.SHORT&&(X=n.R16I),F===n.INT&&(X=n.R32I)),_===n.RG&&(F===n.FLOAT&&(X=n.RG32F),F===n.HALF_FLOAT&&(X=n.RG16F),F===n.UNSIGNED_BYTE&&(X=n.RG8)),_===n.RG_INTEGER&&(F===n.UNSIGNED_BYTE&&(X=n.RG8UI),F===n.UNSIGNED_SHORT&&(X=n.RG16UI),F===n.UNSIGNED_INT&&(X=n.RG32UI),F===n.BYTE&&(X=n.RG8I),F===n.SHORT&&(X=n.RG16I),F===n.INT&&(X=n.RG32I)),_===n.RGB_INTEGER&&(F===n.UNSIGNED_BYTE&&(X=n.RGB8UI),F===n.UNSIGNED_SHORT&&(X=n.RGB16UI),F===n.UNSIGNED_INT&&(X=n.RGB32UI),F===n.BYTE&&(X=n.RGB8I),F===n.SHORT&&(X=n.RGB16I),F===n.INT&&(X=n.RGB32I)),_===n.RGBA_INTEGER&&(F===n.UNSIGNED_BYTE&&(X=n.RGBA8UI),F===n.UNSIGNED_SHORT&&(X=n.RGBA16UI),F===n.UNSIGNED_INT&&(X=n.RGBA32UI),F===n.BYTE&&(X=n.RGBA8I),F===n.SHORT&&(X=n.RGBA16I),F===n.INT&&(X=n.RGBA32I)),_===n.RGB&&F===n.UNSIGNED_INT_5_9_9_9_REV&&(X=n.RGB9_E5),_===n.RGBA){const _e=K?Tr:ke.getTransfer(Y);F===n.FLOAT&&(X=n.RGBA32F),F===n.HALF_FLOAT&&(X=n.RGBA16F),F===n.UNSIGNED_BYTE&&(X=_e===Ke?n.SRGB8_ALPHA8:n.RGBA8),F===n.UNSIGNED_SHORT_4_4_4_4&&(X=n.RGBA4),F===n.UNSIGNED_SHORT_5_5_5_1&&(X=n.RGB5_A1)}return(X===n.R16F||X===n.R32F||X===n.RG16F||X===n.RG32F||X===n.RGBA16F||X===n.RGBA32F)&&e.get("EXT_color_buffer_float"),X}function E(y,_){let F;return y?_===null||_===kn||_===_i?F=n.DEPTH24_STENCIL8:_===on?F=n.DEPTH32F_STENCIL8:_===Ii&&(F=n.DEPTH24_STENCIL8,console.warn("DepthTexture: 16 bit depth attachment is not supported with stencil. Using 24-bit attachment.")):_===null||_===kn||_===_i?F=n.DEPTH_COMPONENT24:_===on?F=n.DEPTH_COMPONENT32F:_===Ii&&(F=n.DEPTH_COMPONENT16),F}function C(y,_){return p(y)===!0||y.isFramebufferTexture&&y.minFilter!==qt&&y.minFilter!==jt?Math.log2(Math.max(_.width,_.height))+1:y.mipmaps!==void 0&&y.mipmaps.length>0?y.mipmaps.length:y.isCompressedTexture&&Array.isArray(y.image)?_.mipmaps.length:1}function A(y){const _=y.target;_.removeEventListener("dispose",A),I(_),_.isVideoTexture&&h.delete(_)}function P(y){const _=y.target;_.removeEventListener("dispose",P),x(_)}function I(y){const _=i.get(y);if(_.__webglInit===void 0)return;const F=y.source,Y=d.get(F);if(Y){const K=Y[_.__cacheKey];K.usedTimes--,K.usedTimes===0&&S(y),Object.keys(Y).length===0&&d.delete(F)}i.remove(y)}function S(y){const _=i.get(y);n.deleteTexture(_.__webglTexture);const F=y.source,Y=d.get(F);delete Y[_.__cacheKey],a.memory.textures--}function x(y){const _=i.get(y);if(y.depthTexture&&(y.depthTexture.dispose(),i.remove(y.depthTexture)),y.isWebGLCubeRenderTarget)for(let Y=0;Y<6;Y++){if(Array.isArray(_.__webglFramebuffer[Y]))for(let K=0;K<_.__webglFramebuffer[Y].length;K++)n.deleteFramebuffer(_.__webglFramebuffer[Y][K]);else n.deleteFramebuffer(_.__webglFramebuffer[Y]);_.__webglDepthbuffer&&n.deleteRenderbuffer(_.__webglDepthbuffer[Y])}else{if(Array.isArray(_.__webglFramebuffer))for(let Y=0;Y<_.__webglFramebuffer.length;Y++)n.deleteFramebuffer(_.__webglFramebuffer[Y]);else n.deleteFramebuffer(_.__webglFramebuffer);if(_.__webglDepthbuffer&&n.deleteRenderbuffer(_.__webglDepthbuffer),_.__webglMultisampledFramebuffer&&n.deleteFramebuffer(_.__webglMultisampledFramebuffer),_.__webglColorRenderbuffer)for(let Y=0;Y<_.__webglColorRenderbuffer.length;Y++)_.__webglColorRenderbuffer[Y]&&n.deleteRenderbuffer(_.__webglColorRenderbuffer[Y]);_.__webglDepthRenderbuffer&&n.deleteRenderbuffer(_.__webglDepthRenderbuffer)}const F=y.textures;for(let Y=0,K=F.length;Y<K;Y++){const X=i.get(F[Y]);X.__webglTexture&&(n.deleteTexture(X.__webglTexture),a.memory.textures--),i.remove(F[Y])}i.remove(y)}let b=0;function W(){b=0}function N(){const y=b;return y>=r.maxTextures&&console.warn("THREE.WebGLTextures: Trying to use "+y+" texture units while this GPU supports only "+r.maxTextures),b+=1,y}function k(y){const _=[];return _.push(y.wrapS),_.push(y.wrapT),_.push(y.wrapR||0),_.push(y.magFilter),_.push(y.minFilter),_.push(y.anisotropy),_.push(y.internalFormat),_.push(y.format),_.push(y.type),_.push(y.generateMipmaps),_.push(y.premultiplyAlpha),_.push(y.flipY),_.push(y.unpackAlignment),_.push(y.colorSpace),_.join()}function Z(y,_){const F=i.get(y);if(y.isVideoTexture&&xe(y),y.isRenderTargetTexture===!1&&y.version>0&&F.__version!==y.version){const Y=y.image;if(Y===null)console.warn("THREE.WebGLRenderer: Texture marked for update but no image data found.");else if(Y.complete===!1)console.warn("THREE.WebGLRenderer: Texture marked for update but image is incomplete");else{q(F,y,_);return}}t.bindTexture(n.TEXTURE_2D,F.__webglTexture,n.TEXTURE0+_)}function G(y,_){const F=i.get(y);if(y.version>0&&F.__version!==y.version){q(F,y,_);return}t.bindTexture(n.TEXTURE_2D_ARRAY,F.__webglTexture,n.TEXTURE0+_)}function J(y,_){const F=i.get(y);if(y.version>0&&F.__version!==y.version){q(F,y,_);return}t.bindTexture(n.TEXTURE_3D,F.__webglTexture,n.TEXTURE0+_)}function H(y,_){const F=i.get(y);if(y.version>0&&F.__version!==y.version){te(F,y,_);return}t.bindTexture(n.TEXTURE_CUBE_MAP,F.__webglTexture,n.TEXTURE0+_)}const Q={[Es]:n.REPEAT,[Bn]:n.CLAMP_TO_EDGE,[ys]:n.MIRRORED_REPEAT},ce={[qt]:n.NEAREST,[Wu]:n.NEAREST_MIPMAP_NEAREST,[Xi]:n.NEAREST_MIPMAP_LINEAR,[jt]:n.LINEAR,[Lr]:n.LINEAR_MIPMAP_NEAREST,[zn]:n.LINEAR_MIPMAP_LINEAR},ve={[$u]:n.NEVER,[eh]:n.ALWAYS,[Zu]:n.LESS,[ol]:n.LEQUAL,[Ku]:n.EQUAL,[Qu]:n.GEQUAL,[ju]:n.GREATER,[Ju]:n.NOTEQUAL};function Le(y,_){if(_.type===on&&e.has("OES_texture_float_linear")===!1&&(_.magFilter===jt||_.magFilter===Lr||_.magFilter===Xi||_.magFilter===zn||_.minFilter===jt||_.minFilter===Lr||_.minFilter===Xi||_.minFilter===zn)&&console.warn("THREE.WebGLRenderer: Unable to use linear filtering with floating point textures. OES_texture_float_linear not supported on this device."),n.texParameteri(y,n.TEXTURE_WRAP_S,Q[_.wrapS]),n.texParameteri(y,n.TEXTURE_WRAP_T,Q[_.wrapT]),(y===n.TEXTURE_3D||y===n.TEXTURE_2D_ARRAY)&&n.texParameteri(y,n.TEXTURE_WRAP_R,Q[_.wrapR]),n.texParameteri(y,n.TEXTURE_MAG_FILTER,ce[_.magFilter]),n.texParameteri(y,n.TEXTURE_MIN_FILTER,ce[_.minFilter]),_.compareFunction&&(n.texParameteri(y,n.TEXTURE_COMPARE_MODE,n.COMPARE_REF_TO_TEXTURE),n.texParameteri(y,n.TEXTURE_COMPARE_FUNC,ve[_.compareFunction])),e.has("EXT_texture_filter_anisotropic")===!0){if(_.magFilter===qt||_.minFilter!==Xi&&_.minFilter!==zn||_.type===on&&e.has("OES_texture_float_linear")===!1)return;if(_.anisotropy>1||i.get(_).__currentAnisotropy){const F=e.get("EXT_texture_filter_anisotropic");n.texParameterf(y,F.TEXTURE_MAX_ANISOTROPY_EXT,Math.min(_.anisotropy,r.getMaxAnisotropy())),i.get(_).__currentAnisotropy=_.anisotropy}}}function je(y,_){let F=!1;y.__webglInit===void 0&&(y.__webglInit=!0,_.addEventListener("dispose",A));const Y=_.source;let K=d.get(Y);K===void 0&&(K={},d.set(Y,K));const X=k(_);if(X!==y.__cacheKey){K[X]===void 0&&(K[X]={texture:n.createTexture(),usedTimes:0},a.memory.textures++,F=!0),K[X].usedTimes++;const _e=K[y.__cacheKey];_e!==void 0&&(K[y.__cacheKey].usedTimes--,_e.usedTimes===0&&S(_)),y.__cacheKey=X,y.__webglTexture=K[X].texture}return F}function q(y,_,F){let Y=n.TEXTURE_2D;(_.isDataArrayTexture||_.isCompressedArrayTexture)&&(Y=n.TEXTURE_2D_ARRAY),_.isData3DTexture&&(Y=n.TEXTURE_3D);const K=je(y,_),X=_.source;t.bindTexture(Y,y.__webglTexture,n.TEXTURE0+F);const _e=i.get(X);if(X.version!==_e.__version||K===!0){t.activeTexture(n.TEXTURE0+F);const ae=ke.getPrimaries(ke.workingColorSpace),he=_.colorSpace===gn?null:ke.getPrimaries(_.colorSpace),He=_.colorSpace===gn||ae===he?n.NONE:n.BROWSER_DEFAULT_WEBGL;n.pixelStorei(n.UNPACK_FLIP_Y_WEBGL,_.flipY),n.pixelStorei(n.UNPACK_PREMULTIPLY_ALPHA_WEBGL,_.premultiplyAlpha),n.pixelStorei(n.UNPACK_ALIGNMENT,_.unpackAlignment),n.pixelStorei(n.UNPACK_COLORSPACE_CONVERSION_WEBGL,He);let ee=M(_.image,!1,r.maxTextureSize);ee=Qe(_,ee);const fe=s.convert(_.format,_.colorSpace),Ee=s.convert(_.type);let be=T(_.internalFormat,fe,Ee,_.colorSpace,_.isVideoTexture);Le(Y,_);let de;const Be=_.mipmaps,Pe=_.isVideoTexture!==!0,Je=_e.__version===void 0||K===!0,D=X.dataReady,ie=C(_,ee);if(_.isDepthTexture)be=E(_.format===gi,_.type),Je&&(Pe?t.texStorage2D(n.TEXTURE_2D,1,be,ee.width,ee.height):t.texImage2D(n.TEXTURE_2D,0,be,ee.width,ee.height,0,fe,Ee,null));else if(_.isDataTexture)if(Be.length>0){Pe&&Je&&t.texStorage2D(n.TEXTURE_2D,ie,be,Be[0].width,Be[0].height);for(let V=0,$=Be.length;V<$;V++)de=Be[V],Pe?D&&t.texSubImage2D(n.TEXTURE_2D,V,0,0,de.width,de.height,fe,Ee,de.data):t.texImage2D(n.TEXTURE_2D,V,be,de.width,de.height,0,fe,Ee,de.data);_.generateMipmaps=!1}else Pe?(Je&&t.texStorage2D(n.TEXTURE_2D,ie,be,ee.width,ee.height),D&&t.texSubImage2D(n.TEXTURE_2D,0,0,0,ee.width,ee.height,fe,Ee,ee.data)):t.texImage2D(n.TEXTURE_2D,0,be,ee.width,ee.height,0,fe,Ee,ee.data);else if(_.isCompressedTexture)if(_.isCompressedArrayTexture){Pe&&Je&&t.texStorage3D(n.TEXTURE_2D_ARRAY,ie,be,Be[0].width,Be[0].height,ee.depth);for(let V=0,$=Be.length;V<$;V++)if(de=Be[V],_.format!==Wt)if(fe!==null)if(Pe){if(D)if(_.layerUpdates.size>0){const le=oo(de.width,de.height,_.format,_.type);for(const oe of _.layerUpdates){const Re=de.data.subarray(oe*le/de.data.BYTES_PER_ELEMENT,(oe+1)*le/de.data.BYTES_PER_ELEMENT);t.compressedTexSubImage3D(n.TEXTURE_2D_ARRAY,V,0,0,oe,de.width,de.height,1,fe,Re)}_.clearLayerUpdates()}else t.compressedTexSubImage3D(n.TEXTURE_2D_ARRAY,V,0,0,0,de.width,de.height,ee.depth,fe,de.data)}else t.compressedTexImage3D(n.TEXTURE_2D_ARRAY,V,be,de.width,de.height,ee.depth,0,de.data,0,0);else console.warn("THREE.WebGLRenderer: Attempt to load unsupported compressed texture format in .uploadTexture()");else Pe?D&&t.texSubImage3D(n.TEXTURE_2D_ARRAY,V,0,0,0,de.width,de.height,ee.depth,fe,Ee,de.data):t.texImage3D(n.TEXTURE_2D_ARRAY,V,be,de.width,de.height,ee.depth,0,fe,Ee,de.data)}else{Pe&&Je&&t.texStorage2D(n.TEXTURE_2D,ie,be,Be[0].width,Be[0].height);for(let V=0,$=Be.length;V<$;V++)de=Be[V],_.format!==Wt?fe!==null?Pe?D&&t.compressedTexSubImage2D(n.TEXTURE_2D,V,0,0,de.width,de.height,fe,de.data):t.compressedTexImage2D(n.TEXTURE_2D,V,be,de.width,de.height,0,de.data):console.warn("THREE.WebGLRenderer: Attempt to load unsupported compressed texture format in .uploadTexture()"):Pe?D&&t.texSubImage2D(n.TEXTURE_2D,V,0,0,de.width,de.height,fe,Ee,de.data):t.texImage2D(n.TEXTURE_2D,V,be,de.width,de.height,0,fe,Ee,de.data)}else if(_.isDataArrayTexture)if(Pe){if(Je&&t.texStorage3D(n.TEXTURE_2D_ARRAY,ie,be,ee.width,ee.height,ee.depth),D)if(_.layerUpdates.size>0){const V=oo(ee.width,ee.height,_.format,_.type);for(const $ of _.layerUpdates){const le=ee.data.subarray($*V/ee.data.BYTES_PER_ELEMENT,($+1)*V/ee.data.BYTES_PER_ELEMENT);t.texSubImage3D(n.TEXTURE_2D_ARRAY,0,0,0,$,ee.width,ee.height,1,fe,Ee,le)}_.clearLayerUpdates()}else t.texSubImage3D(n.TEXTURE_2D_ARRAY,0,0,0,0,ee.width,ee.height,ee.depth,fe,Ee,ee.data)}else t.texImage3D(n.TEXTURE_2D_ARRAY,0,be,ee.width,ee.height,ee.depth,0,fe,Ee,ee.data);else if(_.isData3DTexture)Pe?(Je&&t.texStorage3D(n.TEXTURE_3D,ie,be,ee.width,ee.height,ee.depth),D&&t.texSubImage3D(n.TEXTURE_3D,0,0,0,0,ee.width,ee.height,ee.depth,fe,Ee,ee.data)):t.texImage3D(n.TEXTURE_3D,0,be,ee.width,ee.height,ee.depth,0,fe,Ee,ee.data);else if(_.isFramebufferTexture){if(Je)if(Pe)t.texStorage2D(n.TEXTURE_2D,ie,be,ee.width,ee.height);else{let V=ee.width,$=ee.height;for(let le=0;le<ie;le++)t.texImage2D(n.TEXTURE_2D,le,be,V,$,0,fe,Ee,null),V>>=1,$>>=1}}else if(Be.length>0){if(Pe&&Je){const V=ge(Be[0]);t.texStorage2D(n.TEXTURE_2D,ie,be,V.width,V.height)}for(let V=0,$=Be.length;V<$;V++)de=Be[V],Pe?D&&t.texSubImage2D(n.TEXTURE_2D,V,0,0,fe,Ee,de):t.texImage2D(n.TEXTURE_2D,V,be,fe,Ee,de);_.generateMipmaps=!1}else if(Pe){if(Je){const V=ge(ee);t.texStorage2D(n.TEXTURE_2D,ie,be,V.width,V.height)}D&&t.texSubImage2D(n.TEXTURE_2D,0,0,0,fe,Ee,ee)}else t.texImage2D(n.TEXTURE_2D,0,be,fe,Ee,ee);p(_)&&f(Y),_e.__version=X.version,_.onUpdate&&_.onUpdate(_)}y.__version=_.version}function te(y,_,F){if(_.image.length!==6)return;const Y=je(y,_),K=_.source;t.bindTexture(n.TEXTURE_CUBE_MAP,y.__webglTexture,n.TEXTURE0+F);const X=i.get(K);if(K.version!==X.__version||Y===!0){t.activeTexture(n.TEXTURE0+F);const _e=ke.getPrimaries(ke.workingColorSpace),ae=_.colorSpace===gn?null:ke.getPrimaries(_.colorSpace),he=_.colorSpace===gn||_e===ae?n.NONE:n.BROWSER_DEFAULT_WEBGL;n.pixelStorei(n.UNPACK_FLIP_Y_WEBGL,_.flipY),n.pixelStorei(n.UNPACK_PREMULTIPLY_ALPHA_WEBGL,_.premultiplyAlpha),n.pixelStorei(n.UNPACK_ALIGNMENT,_.unpackAlignment),n.pixelStorei(n.UNPACK_COLORSPACE_CONVERSION_WEBGL,he);const He=_.isCompressedTexture||_.image[0].isCompressedTexture,ee=_.image[0]&&_.image[0].isDataTexture,fe=[];for(let $=0;$<6;$++)!He&&!ee?fe[$]=M(_.image[$],!0,r.maxCubemapSize):fe[$]=ee?_.image[$].image:_.image[$],fe[$]=Qe(_,fe[$]);const Ee=fe[0],be=s.convert(_.format,_.colorSpace),de=s.convert(_.type),Be=T(_.internalFormat,be,de,_.colorSpace),Pe=_.isVideoTexture!==!0,Je=X.__version===void 0||Y===!0,D=K.dataReady;let ie=C(_,Ee);Le(n.TEXTURE_CUBE_MAP,_);let V;if(He){Pe&&Je&&t.texStorage2D(n.TEXTURE_CUBE_MAP,ie,Be,Ee.width,Ee.height);for(let $=0;$<6;$++){V=fe[$].mipmaps;for(let le=0;le<V.length;le++){const oe=V[le];_.format!==Wt?be!==null?Pe?D&&t.compressedTexSubImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+$,le,0,0,oe.width,oe.height,be,oe.data):t.compressedTexImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+$,le,Be,oe.width,oe.height,0,oe.data):console.warn("THREE.WebGLRenderer: Attempt to load unsupported compressed texture format in .setTextureCube()"):Pe?D&&t.texSubImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+$,le,0,0,oe.width,oe.height,be,de,oe.data):t.texImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+$,le,Be,oe.width,oe.height,0,be,de,oe.data)}}}else{if(V=_.mipmaps,Pe&&Je){V.length>0&&ie++;const $=ge(fe[0]);t.texStorage2D(n.TEXTURE_CUBE_MAP,ie,Be,$.width,$.height)}for(let $=0;$<6;$++)if(ee){Pe?D&&t.texSubImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+$,0,0,0,fe[$].width,fe[$].height,be,de,fe[$].data):t.texImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+$,0,Be,fe[$].width,fe[$].height,0,be,de,fe[$].data);for(let le=0;le<V.length;le++){const Re=V[le].image[$].image;Pe?D&&t.texSubImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+$,le+1,0,0,Re.width,Re.height,be,de,Re.data):t.texImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+$,le+1,Be,Re.width,Re.height,0,be,de,Re.data)}}else{Pe?D&&t.texSubImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+$,0,0,0,be,de,fe[$]):t.texImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+$,0,Be,be,de,fe[$]);for(let le=0;le<V.length;le++){const oe=V[le];Pe?D&&t.texSubImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+$,le+1,0,0,be,de,oe.image[$]):t.texImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+$,le+1,Be,be,de,oe.image[$])}}}p(_)&&f(n.TEXTURE_CUBE_MAP),X.__version=K.version,_.onUpdate&&_.onUpdate(_)}y.__version=_.version}function me(y,_,F,Y,K,X){const _e=s.convert(F.format,F.colorSpace),ae=s.convert(F.type),he=T(F.internalFormat,_e,ae,F.colorSpace),He=i.get(_),ee=i.get(F);if(ee.__renderTarget=_,!He.__hasExternalTextures){const fe=Math.max(1,_.width>>X),Ee=Math.max(1,_.height>>X);K===n.TEXTURE_3D||K===n.TEXTURE_2D_ARRAY?t.texImage3D(K,X,he,fe,Ee,_.depth,0,_e,ae,null):t.texImage2D(K,X,he,fe,Ee,0,_e,ae,null)}t.bindFramebuffer(n.FRAMEBUFFER,y),Oe(_)?o.framebufferTexture2DMultisampleEXT(n.FRAMEBUFFER,Y,K,ee.__webglTexture,0,Fe(_)):(K===n.TEXTURE_2D||K>=n.TEXTURE_CUBE_MAP_POSITIVE_X&&K<=n.TEXTURE_CUBE_MAP_NEGATIVE_Z)&&n.framebufferTexture2D(n.FRAMEBUFFER,Y,K,ee.__webglTexture,X),t.bindFramebuffer(n.FRAMEBUFFER,null)}function se(y,_,F){if(n.bindRenderbuffer(n.RENDERBUFFER,y),_.depthBuffer){const Y=_.depthTexture,K=Y&&Y.isDepthTexture?Y.type:null,X=E(_.stencilBuffer,K),_e=_.stencilBuffer?n.DEPTH_STENCIL_ATTACHMENT:n.DEPTH_ATTACHMENT,ae=Fe(_);Oe(_)?o.renderbufferStorageMultisampleEXT(n.RENDERBUFFER,ae,X,_.width,_.height):F?n.renderbufferStorageMultisample(n.RENDERBUFFER,ae,X,_.width,_.height):n.renderbufferStorage(n.RENDERBUFFER,X,_.width,_.height),n.framebufferRenderbuffer(n.FRAMEBUFFER,_e,n.RENDERBUFFER,y)}else{const Y=_.textures;for(let K=0;K<Y.length;K++){const X=Y[K],_e=s.convert(X.format,X.colorSpace),ae=s.convert(X.type),he=T(X.internalFormat,_e,ae,X.colorSpace),He=Fe(_);F&&Oe(_)===!1?n.renderbufferStorageMultisample(n.RENDERBUFFER,He,he,_.width,_.height):Oe(_)?o.renderbufferStorageMultisampleEXT(n.RENDERBUFFER,He,he,_.width,_.height):n.renderbufferStorage(n.RENDERBUFFER,he,_.width,_.height)}}n.bindRenderbuffer(n.RENDERBUFFER,null)}function ye(y,_){if(_&&_.isWebGLCubeRenderTarget)throw new Error("Depth Texture with cube render targets is not supported");if(t.bindFramebuffer(n.FRAMEBUFFER,y),!(_.depthTexture&&_.depthTexture.isDepthTexture))throw new Error("renderTarget.depthTexture must be an instance of THREE.DepthTexture");const Y=i.get(_.depthTexture);Y.__renderTarget=_,(!Y.__webglTexture||_.depthTexture.image.width!==_.width||_.depthTexture.image.height!==_.height)&&(_.depthTexture.image.width=_.width,_.depthTexture.image.height=_.height,_.depthTexture.needsUpdate=!0),Z(_.depthTexture,0);const K=Y.__webglTexture,X=Fe(_);if(_.depthTexture.format===ui)Oe(_)?o.framebufferTexture2DMultisampleEXT(n.FRAMEBUFFER,n.DEPTH_ATTACHMENT,n.TEXTURE_2D,K,0,X):n.framebufferTexture2D(n.FRAMEBUFFER,n.DEPTH_ATTACHMENT,n.TEXTURE_2D,K,0);else if(_.depthTexture.format===gi)Oe(_)?o.framebufferTexture2DMultisampleEXT(n.FRAMEBUFFER,n.DEPTH_STENCIL_ATTACHMENT,n.TEXTURE_2D,K,0,X):n.framebufferTexture2D(n.FRAMEBUFFER,n.DEPTH_STENCIL_ATTACHMENT,n.TEXTURE_2D,K,0);else throw new Error("Unknown depthTexture format")}function We(y){const _=i.get(y),F=y.isWebGLCubeRenderTarget===!0;if(_.__boundDepthTexture!==y.depthTexture){const Y=y.depthTexture;if(_.__depthDisposeCallback&&_.__depthDisposeCallback(),Y){const K=()=>{delete _.__boundDepthTexture,delete _.__depthDisposeCallback,Y.removeEventListener("dispose",K)};Y.addEventListener("dispose",K),_.__depthDisposeCallback=K}_.__boundDepthTexture=Y}if(y.depthTexture&&!_.__autoAllocateDepthBuffer){if(F)throw new Error("target.depthTexture not supported in Cube render targets");ye(_.__webglFramebuffer,y)}else if(F){_.__webglDepthbuffer=[];for(let Y=0;Y<6;Y++)if(t.bindFramebuffer(n.FRAMEBUFFER,_.__webglFramebuffer[Y]),_.__webglDepthbuffer[Y]===void 0)_.__webglDepthbuffer[Y]=n.createRenderbuffer(),se(_.__webglDepthbuffer[Y],y,!1);else{const K=y.stencilBuffer?n.DEPTH_STENCIL_ATTACHMENT:n.DEPTH_ATTACHMENT,X=_.__webglDepthbuffer[Y];n.bindRenderbuffer(n.RENDERBUFFER,X),n.framebufferRenderbuffer(n.FRAMEBUFFER,K,n.RENDERBUFFER,X)}}else if(t.bindFramebuffer(n.FRAMEBUFFER,_.__webglFramebuffer),_.__webglDepthbuffer===void 0)_.__webglDepthbuffer=n.createRenderbuffer(),se(_.__webglDepthbuffer,y,!1);else{const Y=y.stencilBuffer?n.DEPTH_STENCIL_ATTACHMENT:n.DEPTH_ATTACHMENT,K=_.__webglDepthbuffer;n.bindRenderbuffer(n.RENDERBUFFER,K),n.framebufferRenderbuffer(n.FRAMEBUFFER,Y,n.RENDERBUFFER,K)}t.bindFramebuffer(n.FRAMEBUFFER,null)}function Te(y,_,F){const Y=i.get(y);_!==void 0&&me(Y.__webglFramebuffer,y,y.texture,n.COLOR_ATTACHMENT0,n.TEXTURE_2D,0),F!==void 0&&We(y)}function at(y){const _=y.texture,F=i.get(y),Y=i.get(_);y.addEventListener("dispose",P);const K=y.textures,X=y.isWebGLCubeRenderTarget===!0,_e=K.length>1;if(_e||(Y.__webglTexture===void 0&&(Y.__webglTexture=n.createTexture()),Y.__version=_.version,a.memory.textures++),X){F.__webglFramebuffer=[];for(let ae=0;ae<6;ae++)if(_.mipmaps&&_.mipmaps.length>0){F.__webglFramebuffer[ae]=[];for(let he=0;he<_.mipmaps.length;he++)F.__webglFramebuffer[ae][he]=n.createFramebuffer()}else F.__webglFramebuffer[ae]=n.createFramebuffer()}else{if(_.mipmaps&&_.mipmaps.length>0){F.__webglFramebuffer=[];for(let ae=0;ae<_.mipmaps.length;ae++)F.__webglFramebuffer[ae]=n.createFramebuffer()}else F.__webglFramebuffer=n.createFramebuffer();if(_e)for(let ae=0,he=K.length;ae<he;ae++){const He=i.get(K[ae]);He.__webglTexture===void 0&&(He.__webglTexture=n.createTexture(),a.memory.textures++)}if(y.samples>0&&Oe(y)===!1){F.__webglMultisampledFramebuffer=n.createFramebuffer(),F.__webglColorRenderbuffer=[],t.bindFramebuffer(n.FRAMEBUFFER,F.__webglMultisampledFramebuffer);for(let ae=0;ae<K.length;ae++){const he=K[ae];F.__webglColorRenderbuffer[ae]=n.createRenderbuffer(),n.bindRenderbuffer(n.RENDERBUFFER,F.__webglColorRenderbuffer[ae]);const He=s.convert(he.format,he.colorSpace),ee=s.convert(he.type),fe=T(he.internalFormat,He,ee,he.colorSpace,y.isXRRenderTarget===!0),Ee=Fe(y);n.renderbufferStorageMultisample(n.RENDERBUFFER,Ee,fe,y.width,y.height),n.framebufferRenderbuffer(n.FRAMEBUFFER,n.COLOR_ATTACHMENT0+ae,n.RENDERBUFFER,F.__webglColorRenderbuffer[ae])}n.bindRenderbuffer(n.RENDERBUFFER,null),y.depthBuffer&&(F.__webglDepthRenderbuffer=n.createRenderbuffer(),se(F.__webglDepthRenderbuffer,y,!0)),t.bindFramebuffer(n.FRAMEBUFFER,null)}}if(X){t.bindTexture(n.TEXTURE_CUBE_MAP,Y.__webglTexture),Le(n.TEXTURE_CUBE_MAP,_);for(let ae=0;ae<6;ae++)if(_.mipmaps&&_.mipmaps.length>0)for(let he=0;he<_.mipmaps.length;he++)me(F.__webglFramebuffer[ae][he],y,_,n.COLOR_ATTACHMENT0,n.TEXTURE_CUBE_MAP_POSITIVE_X+ae,he);else me(F.__webglFramebuffer[ae],y,_,n.COLOR_ATTACHMENT0,n.TEXTURE_CUBE_MAP_POSITIVE_X+ae,0);p(_)&&f(n.TEXTURE_CUBE_MAP),t.unbindTexture()}else if(_e){for(let ae=0,he=K.length;ae<he;ae++){const He=K[ae],ee=i.get(He);t.bindTexture(n.TEXTURE_2D,ee.__webglTexture),Le(n.TEXTURE_2D,He),me(F.__webglFramebuffer,y,He,n.COLOR_ATTACHMENT0+ae,n.TEXTURE_2D,0),p(He)&&f(n.TEXTURE_2D)}t.unbindTexture()}else{let ae=n.TEXTURE_2D;if((y.isWebGL3DRenderTarget||y.isWebGLArrayRenderTarget)&&(ae=y.isWebGL3DRenderTarget?n.TEXTURE_3D:n.TEXTURE_2D_ARRAY),t.bindTexture(ae,Y.__webglTexture),Le(ae,_),_.mipmaps&&_.mipmaps.length>0)for(let he=0;he<_.mipmaps.length;he++)me(F.__webglFramebuffer[he],y,_,n.COLOR_ATTACHMENT0,ae,he);else me(F.__webglFramebuffer,y,_,n.COLOR_ATTACHMENT0,ae,0);p(_)&&f(ae),t.unbindTexture()}y.depthBuffer&&We(y)}function tt(y){const _=y.textures;for(let F=0,Y=_.length;F<Y;F++){const K=_[F];if(p(K)){const X=w(y),_e=i.get(K).__webglTexture;t.bindTexture(X,_e),f(X),t.unbindTexture()}}}const Ne=[],R=[];function Rt(y){if(y.samples>0){if(Oe(y)===!1){const _=y.textures,F=y.width,Y=y.height;let K=n.COLOR_BUFFER_BIT;const X=y.stencilBuffer?n.DEPTH_STENCIL_ATTACHMENT:n.DEPTH_ATTACHMENT,_e=i.get(y),ae=_.length>1;if(ae)for(let he=0;he<_.length;he++)t.bindFramebuffer(n.FRAMEBUFFER,_e.__webglMultisampledFramebuffer),n.framebufferRenderbuffer(n.FRAMEBUFFER,n.COLOR_ATTACHMENT0+he,n.RENDERBUFFER,null),t.bindFramebuffer(n.FRAMEBUFFER,_e.__webglFramebuffer),n.framebufferTexture2D(n.DRAW_FRAMEBUFFER,n.COLOR_ATTACHMENT0+he,n.TEXTURE_2D,null,0);t.bindFramebuffer(n.READ_FRAMEBUFFER,_e.__webglMultisampledFramebuffer),t.bindFramebuffer(n.DRAW_FRAMEBUFFER,_e.__webglFramebuffer);for(let he=0;he<_.length;he++){if(y.resolveDepthBuffer&&(y.depthBuffer&&(K|=n.DEPTH_BUFFER_BIT),y.stencilBuffer&&y.resolveStencilBuffer&&(K|=n.STENCIL_BUFFER_BIT)),ae){n.framebufferRenderbuffer(n.READ_FRAMEBUFFER,n.COLOR_ATTACHMENT0,n.RENDERBUFFER,_e.__webglColorRenderbuffer[he]);const He=i.get(_[he]).__webglTexture;n.framebufferTexture2D(n.DRAW_FRAMEBUFFER,n.COLOR_ATTACHMENT0,n.TEXTURE_2D,He,0)}n.blitFramebuffer(0,0,F,Y,0,0,F,Y,K,n.NEAREST),c===!0&&(Ne.length=0,R.length=0,Ne.push(n.COLOR_ATTACHMENT0+he),y.depthBuffer&&y.resolveDepthBuffer===!1&&(Ne.push(X),R.push(X),n.invalidateFramebuffer(n.DRAW_FRAMEBUFFER,R)),n.invalidateFramebuffer(n.READ_FRAMEBUFFER,Ne))}if(t.bindFramebuffer(n.READ_FRAMEBUFFER,null),t.bindFramebuffer(n.DRAW_FRAMEBUFFER,null),ae)for(let he=0;he<_.length;he++){t.bindFramebuffer(n.FRAMEBUFFER,_e.__webglMultisampledFramebuffer),n.framebufferRenderbuffer(n.FRAMEBUFFER,n.COLOR_ATTACHMENT0+he,n.RENDERBUFFER,_e.__webglColorRenderbuffer[he]);const He=i.get(_[he]).__webglTexture;t.bindFramebuffer(n.FRAMEBUFFER,_e.__webglFramebuffer),n.framebufferTexture2D(n.DRAW_FRAMEBUFFER,n.COLOR_ATTACHMENT0+he,n.TEXTURE_2D,He,0)}t.bindFramebuffer(n.DRAW_FRAMEBUFFER,_e.__webglMultisampledFramebuffer)}else if(y.depthBuffer&&y.resolveDepthBuffer===!1&&c){const _=y.stencilBuffer?n.DEPTH_STENCIL_ATTACHMENT:n.DEPTH_ATTACHMENT;n.invalidateFramebuffer(n.DRAW_FRAMEBUFFER,[_])}}}function Fe(y){return Math.min(r.maxSamples,y.samples)}function Oe(y){const _=i.get(y);return y.samples>0&&e.has("WEBGL_multisampled_render_to_texture")===!0&&_.__useRenderToTexture!==!1}function xe(y){const _=a.render.frame;h.get(y)!==_&&(h.set(y,_),y.update())}function Qe(y,_){const F=y.colorSpace,Y=y.format,K=y.type;return y.isCompressedTexture===!0||y.isVideoTexture===!0||F!==vi&&F!==gn&&(ke.getTransfer(F)===Ke?(Y!==Wt||K!==un)&&console.warn("THREE.WebGLTextures: sRGB encoded textures have to use RGBAFormat and UnsignedByteType."):console.error("THREE.WebGLTextures: Unsupported texture color space:",F)),_}function ge(y){return typeof HTMLImageElement<"u"&&y instanceof HTMLImageElement?(l.width=y.naturalWidth||y.width,l.height=y.naturalHeight||y.height):typeof VideoFrame<"u"&&y instanceof VideoFrame?(l.width=y.displayWidth,l.height=y.displayHeight):(l.width=y.width,l.height=y.height),l}this.allocateTextureUnit=N,this.resetTextureUnits=W,this.setTexture2D=Z,this.setTexture2DArray=G,this.setTexture3D=J,this.setTextureCube=H,this.rebindTextures=Te,this.setupRenderTarget=at,this.updateRenderTargetMipmap=tt,this.updateMultisampleRenderTarget=Rt,this.setupDepthRenderbuffer=We,this.setupFrameBufferTexture=me,this.useMultisampledRTT=Oe}function I_(n,e){function t(i,r=gn){let s;const a=ke.getTransfer(r);if(i===un)return n.UNSIGNED_BYTE;if(i===aa)return n.UNSIGNED_SHORT_4_4_4_4;if(i===oa)return n.UNSIGNED_SHORT_5_5_5_1;if(i===Qo)return n.UNSIGNED_INT_5_9_9_9_REV;if(i===jo)return n.BYTE;if(i===Jo)return n.SHORT;if(i===Ii)return n.UNSIGNED_SHORT;if(i===sa)return n.INT;if(i===kn)return n.UNSIGNED_INT;if(i===on)return n.FLOAT;if(i===Oi)return n.HALF_FLOAT;if(i===el)return n.ALPHA;if(i===tl)return n.RGB;if(i===Wt)return n.RGBA;if(i===nl)return n.LUMINANCE;if(i===il)return n.LUMINANCE_ALPHA;if(i===ui)return n.DEPTH_COMPONENT;if(i===gi)return n.DEPTH_STENCIL;if(i===rl)return n.RED;if(i===la)return n.RED_INTEGER;if(i===sl)return n.RG;if(i===ca)return n.RG_INTEGER;if(i===ua)return n.RGBA_INTEGER;if(i===mr||i===_r||i===gr||i===vr)if(a===Ke)if(s=e.get("WEBGL_compressed_texture_s3tc_srgb"),s!==null){if(i===mr)return s.COMPRESSED_SRGB_S3TC_DXT1_EXT;if(i===_r)return s.COMPRESSED_SRGB_ALPHA_S3TC_DXT1_EXT;if(i===gr)return s.COMPRESSED_SRGB_ALPHA_S3TC_DXT3_EXT;if(i===vr)return s.COMPRESSED_SRGB_ALPHA_S3TC_DXT5_EXT}else return null;else if(s=e.get("WEBGL_compressed_texture_s3tc"),s!==null){if(i===mr)return s.COMPRESSED_RGB_S3TC_DXT1_EXT;if(i===_r)return s.COMPRESSED_RGBA_S3TC_DXT1_EXT;if(i===gr)return s.COMPRESSED_RGBA_S3TC_DXT3_EXT;if(i===vr)return s.COMPRESSED_RGBA_S3TC_DXT5_EXT}else return null;if(i===Ts||i===bs||i===As||i===ws)if(s=e.get("WEBGL_compressed_texture_pvrtc"),s!==null){if(i===Ts)return s.COMPRESSED_RGB_PVRTC_4BPPV1_IMG;if(i===bs)return s.COMPRESSED_RGB_PVRTC_2BPPV1_IMG;if(i===As)return s.COMPRESSED_RGBA_PVRTC_4BPPV1_IMG;if(i===ws)return s.COMPRESSED_RGBA_PVRTC_2BPPV1_IMG}else return null;if(i===Rs||i===Cs||i===Ps)if(s=e.get("WEBGL_compressed_texture_etc"),s!==null){if(i===Rs||i===Cs)return a===Ke?s.COMPRESSED_SRGB8_ETC2:s.COMPRESSED_RGB8_ETC2;if(i===Ps)return a===Ke?s.COMPRESSED_SRGB8_ALPHA8_ETC2_EAC:s.COMPRESSED_RGBA8_ETC2_EAC}else return null;if(i===Ds||i===Ls||i===Us||i===Is||i===Ns||i===Fs||i===Os||i===Bs||i===zs||i===Hs||i===Vs||i===Gs||i===ks||i===Ws)if(s=e.get("WEBGL_compressed_texture_astc"),s!==null){if(i===Ds)return a===Ke?s.COMPRESSED_SRGB8_ALPHA8_ASTC_4x4_KHR:s.COMPRESSED_RGBA_ASTC_4x4_KHR;if(i===Ls)return a===Ke?s.COMPRESSED_SRGB8_ALPHA8_ASTC_5x4_KHR:s.COMPRESSED_RGBA_ASTC_5x4_KHR;if(i===Us)return a===Ke?s.COMPRESSED_SRGB8_ALPHA8_ASTC_5x5_KHR:s.COMPRESSED_RGBA_ASTC_5x5_KHR;if(i===Is)return a===Ke?s.COMPRESSED_SRGB8_ALPHA8_ASTC_6x5_KHR:s.COMPRESSED_RGBA_ASTC_6x5_KHR;if(i===Ns)return a===Ke?s.COMPRESSED_SRGB8_ALPHA8_ASTC_6x6_KHR:s.COMPRESSED_RGBA_ASTC_6x6_KHR;if(i===Fs)return a===Ke?s.COMPRESSED_SRGB8_ALPHA8_ASTC_8x5_KHR:s.COMPRESSED_RGBA_ASTC_8x5_KHR;if(i===Os)return a===Ke?s.COMPRESSED_SRGB8_ALPHA8_ASTC_8x6_KHR:s.COMPRESSED_RGBA_ASTC_8x6_KHR;if(i===Bs)return a===Ke?s.COMPRESSED_SRGB8_ALPHA8_ASTC_8x8_KHR:s.COMPRESSED_RGBA_ASTC_8x8_KHR;if(i===zs)return a===Ke?s.COMPRESSED_SRGB8_ALPHA8_ASTC_10x5_KHR:s.COMPRESSED_RGBA_ASTC_10x5_KHR;if(i===Hs)return a===Ke?s.COMPRESSED_SRGB8_ALPHA8_ASTC_10x6_KHR:s.COMPRESSED_RGBA_ASTC_10x6_KHR;if(i===Vs)return a===Ke?s.COMPRESSED_SRGB8_ALPHA8_ASTC_10x8_KHR:s.COMPRESSED_RGBA_ASTC_10x8_KHR;if(i===Gs)return a===Ke?s.COMPRESSED_SRGB8_ALPHA8_ASTC_10x10_KHR:s.COMPRESSED_RGBA_ASTC_10x10_KHR;if(i===ks)return a===Ke?s.COMPRESSED_SRGB8_ALPHA8_ASTC_12x10_KHR:s.COMPRESSED_RGBA_ASTC_12x10_KHR;if(i===Ws)return a===Ke?s.COMPRESSED_SRGB8_ALPHA8_ASTC_12x12_KHR:s.COMPRESSED_RGBA_ASTC_12x12_KHR}else return null;if(i===xr||i===Xs||i===qs)if(s=e.get("EXT_texture_compression_bptc"),s!==null){if(i===xr)return a===Ke?s.COMPRESSED_SRGB_ALPHA_BPTC_UNORM_EXT:s.COMPRESSED_RGBA_BPTC_UNORM_EXT;if(i===Xs)return s.COMPRESSED_RGB_BPTC_SIGNED_FLOAT_EXT;if(i===qs)return s.COMPRESSED_RGB_BPTC_UNSIGNED_FLOAT_EXT}else return null;if(i===al||i===Ys||i===$s||i===Zs)if(s=e.get("EXT_texture_compression_rgtc"),s!==null){if(i===xr)return s.COMPRESSED_RED_RGTC1_EXT;if(i===Ys)return s.COMPRESSED_SIGNED_RED_RGTC1_EXT;if(i===$s)return s.COMPRESSED_RED_GREEN_RGTC2_EXT;if(i===Zs)return s.COMPRESSED_SIGNED_RED_GREEN_RGTC2_EXT}else return null;return i===_i?n.UNSIGNED_INT_24_8:n[i]!==void 0?n[i]:null}return{convert:t}}const N_=`
void main() {

	gl_Position = vec4( position, 1.0 );

}`,F_=`
uniform sampler2DArray depthColor;
uniform float depthWidth;
uniform float depthHeight;

void main() {

	vec2 coord = vec2( gl_FragCoord.x / depthWidth, gl_FragCoord.y / depthHeight );

	if ( coord.x >= 1.0 ) {

		gl_FragDepth = texture( depthColor, vec3( coord.x - 1.0, coord.y, 1 ) ).r;

	} else {

		gl_FragDepth = texture( depthColor, vec3( coord.x, coord.y, 0 ) ).r;

	}

}`;class O_{constructor(){this.texture=null,this.mesh=null,this.depthNear=0,this.depthFar=0}init(e,t,i){if(this.texture===null){const r=new Tt,s=e.properties.get(r);s.__webglTexture=t.texture,(t.depthNear!==i.depthNear||t.depthFar!==i.depthFar)&&(this.depthNear=t.depthNear,this.depthFar=t.depthFar),this.texture=r}}getMesh(e){if(this.texture!==null&&this.mesh===null){const t=e.cameras[0].viewport,i=new yn({vertexShader:N_,fragmentShader:F_,uniforms:{depthColor:{value:this.texture},depthWidth:{value:t.z},depthHeight:{value:t.w}}});this.mesh=new Xt(new Vi(20,20),i)}return this.mesh}reset(){this.texture=null,this.mesh=null}getDepthTexture(){return this.texture}}class B_ extends Mi{constructor(e,t){super();const i=this;let r=null,s=1,a=null,o="local-floor",c=1,l=null,h=null,u=null,d=null,m=null,g=null;const M=new O_,p=t.getContextAttributes();let f=null,w=null;const T=[],E=[],C=new qe;let A=null;const P=new Ut;P.viewport=new rt;const I=new Ut;I.viewport=new rt;const S=[P,I],x=new sf;let b=null,W=null;this.cameraAutoUpdate=!0,this.enabled=!1,this.isPresenting=!1,this.getController=function(q){let te=T[q];return te===void 0&&(te=new Jr,T[q]=te),te.getTargetRaySpace()},this.getControllerGrip=function(q){let te=T[q];return te===void 0&&(te=new Jr,T[q]=te),te.getGripSpace()},this.getHand=function(q){let te=T[q];return te===void 0&&(te=new Jr,T[q]=te),te.getHandSpace()};function N(q){const te=E.indexOf(q.inputSource);if(te===-1)return;const me=T[te];me!==void 0&&(me.update(q.inputSource,q.frame,l||a),me.dispatchEvent({type:q.type,data:q.inputSource}))}function k(){r.removeEventListener("select",N),r.removeEventListener("selectstart",N),r.removeEventListener("selectend",N),r.removeEventListener("squeeze",N),r.removeEventListener("squeezestart",N),r.removeEventListener("squeezeend",N),r.removeEventListener("end",k),r.removeEventListener("inputsourceschange",Z);for(let q=0;q<T.length;q++){const te=E[q];te!==null&&(E[q]=null,T[q].disconnect(te))}b=null,W=null,M.reset(),e.setRenderTarget(f),m=null,d=null,u=null,r=null,w=null,je.stop(),i.isPresenting=!1,e.setPixelRatio(A),e.setSize(C.width,C.height,!1),i.dispatchEvent({type:"sessionend"})}this.setFramebufferScaleFactor=function(q){s=q,i.isPresenting===!0&&console.warn("THREE.WebXRManager: Cannot change framebuffer scale while presenting.")},this.setReferenceSpaceType=function(q){o=q,i.isPresenting===!0&&console.warn("THREE.WebXRManager: Cannot change reference space type while presenting.")},this.getReferenceSpace=function(){return l||a},this.setReferenceSpace=function(q){l=q},this.getBaseLayer=function(){return d!==null?d:m},this.getBinding=function(){return u},this.getFrame=function(){return g},this.getSession=function(){return r},this.setSession=async function(q){if(r=q,r!==null){if(f=e.getRenderTarget(),r.addEventListener("select",N),r.addEventListener("selectstart",N),r.addEventListener("selectend",N),r.addEventListener("squeeze",N),r.addEventListener("squeezestart",N),r.addEventListener("squeezeend",N),r.addEventListener("end",k),r.addEventListener("inputsourceschange",Z),p.xrCompatible!==!0&&await t.makeXRCompatible(),A=e.getPixelRatio(),e.getSize(C),typeof XRWebGLBinding<"u"&&"createProjectionLayer"in XRWebGLBinding.prototype){let me=null,se=null,ye=null;p.depth&&(ye=p.stencil?t.DEPTH24_STENCIL8:t.DEPTH_COMPONENT24,me=p.stencil?gi:ui,se=p.stencil?_i:kn);const We={colorFormat:t.RGBA8,depthFormat:ye,scaleFactor:s};u=new XRWebGLBinding(r,t),d=u.createProjectionLayer(We),r.updateRenderState({layers:[d]}),e.setPixelRatio(1),e.setSize(d.textureWidth,d.textureHeight,!1),w=new Wn(d.textureWidth,d.textureHeight,{format:Wt,type:un,depthTexture:new xl(d.textureWidth,d.textureHeight,se,void 0,void 0,void 0,void 0,void 0,void 0,me),stencilBuffer:p.stencil,colorSpace:e.outputColorSpace,samples:p.antialias?4:0,resolveDepthBuffer:d.ignoreDepthValues===!1})}else{const me={antialias:p.antialias,alpha:!0,depth:p.depth,stencil:p.stencil,framebufferScaleFactor:s};m=new XRWebGLLayer(r,t,me),r.updateRenderState({baseLayer:m}),e.setPixelRatio(1),e.setSize(m.framebufferWidth,m.framebufferHeight,!1),w=new Wn(m.framebufferWidth,m.framebufferHeight,{format:Wt,type:un,colorSpace:e.outputColorSpace,stencilBuffer:p.stencil})}w.isXRRenderTarget=!0,this.setFoveation(c),l=null,a=await r.requestReferenceSpace(o),je.setContext(r),je.start(),i.isPresenting=!0,i.dispatchEvent({type:"sessionstart"})}},this.getEnvironmentBlendMode=function(){if(r!==null)return r.environmentBlendMode},this.getDepthTexture=function(){return M.getDepthTexture()};function Z(q){for(let te=0;te<q.removed.length;te++){const me=q.removed[te],se=E.indexOf(me);se>=0&&(E[se]=null,T[se].disconnect(me))}for(let te=0;te<q.added.length;te++){const me=q.added[te];let se=E.indexOf(me);if(se===-1){for(let We=0;We<T.length;We++)if(We>=E.length){E.push(me),se=We;break}else if(E[We]===null){E[We]=me,se=We;break}if(se===-1)break}const ye=T[se];ye&&ye.connect(me)}}const G=new B,J=new B;function H(q,te,me){G.setFromMatrixPosition(te.matrixWorld),J.setFromMatrixPosition(me.matrixWorld);const se=G.distanceTo(J),ye=te.projectionMatrix.elements,We=me.projectionMatrix.elements,Te=ye[14]/(ye[10]-1),at=ye[14]/(ye[10]+1),tt=(ye[9]+1)/ye[5],Ne=(ye[9]-1)/ye[5],R=(ye[8]-1)/ye[0],Rt=(We[8]+1)/We[0],Fe=Te*R,Oe=Te*Rt,xe=se/(-R+Rt),Qe=xe*-R;if(te.matrixWorld.decompose(q.position,q.quaternion,q.scale),q.translateX(Qe),q.translateZ(xe),q.matrixWorld.compose(q.position,q.quaternion,q.scale),q.matrixWorldInverse.copy(q.matrixWorld).invert(),ye[10]===-1)q.projectionMatrix.copy(te.projectionMatrix),q.projectionMatrixInverse.copy(te.projectionMatrixInverse);else{const ge=Te+xe,y=at+xe,_=Fe-Qe,F=Oe+(se-Qe),Y=tt*at/y*ge,K=Ne*at/y*ge;q.projectionMatrix.makePerspective(_,F,Y,K,ge,y),q.projectionMatrixInverse.copy(q.projectionMatrix).invert()}}function Q(q,te){te===null?q.matrixWorld.copy(q.matrix):q.matrixWorld.multiplyMatrices(te.matrixWorld,q.matrix),q.matrixWorldInverse.copy(q.matrixWorld).invert()}this.updateCamera=function(q){if(r===null)return;let te=q.near,me=q.far;M.texture!==null&&(M.depthNear>0&&(te=M.depthNear),M.depthFar>0&&(me=M.depthFar)),x.near=I.near=P.near=te,x.far=I.far=P.far=me,(b!==x.near||W!==x.far)&&(r.updateRenderState({depthNear:x.near,depthFar:x.far}),b=x.near,W=x.far),P.layers.mask=q.layers.mask|2,I.layers.mask=q.layers.mask|4,x.layers.mask=P.layers.mask|I.layers.mask;const se=q.parent,ye=x.cameras;Q(x,se);for(let We=0;We<ye.length;We++)Q(ye[We],se);ye.length===2?H(x,P,I):x.projectionMatrix.copy(P.projectionMatrix),ce(q,x,se)};function ce(q,te,me){me===null?q.matrix.copy(te.matrixWorld):(q.matrix.copy(me.matrixWorld),q.matrix.invert(),q.matrix.multiply(te.matrixWorld)),q.matrix.decompose(q.position,q.quaternion,q.scale),q.updateMatrixWorld(!0),q.projectionMatrix.copy(te.projectionMatrix),q.projectionMatrixInverse.copy(te.projectionMatrixInverse),q.isPerspectiveCamera&&(q.fov=Ni*2*Math.atan(1/q.projectionMatrix.elements[5]),q.zoom=1)}this.getCamera=function(){return x},this.getFoveation=function(){if(!(d===null&&m===null))return c},this.setFoveation=function(q){c=q,d!==null&&(d.fixedFoveation=q),m!==null&&m.fixedFoveation!==void 0&&(m.fixedFoveation=q)},this.hasDepthSensing=function(){return M.texture!==null},this.getDepthSensingMesh=function(){return M.getMesh(x)};let ve=null;function Le(q,te){if(h=te.getViewerPose(l||a),g=te,h!==null){const me=h.views;m!==null&&(e.setRenderTargetFramebuffer(w,m.framebuffer),e.setRenderTarget(w));let se=!1;me.length!==x.cameras.length&&(x.cameras.length=0,se=!0);for(let Te=0;Te<me.length;Te++){const at=me[Te];let tt=null;if(m!==null)tt=m.getViewport(at);else{const R=u.getViewSubImage(d,at);tt=R.viewport,Te===0&&(e.setRenderTargetTextures(w,R.colorTexture,d.ignoreDepthValues?void 0:R.depthStencilTexture),e.setRenderTarget(w))}let Ne=S[Te];Ne===void 0&&(Ne=new Ut,Ne.layers.enable(Te),Ne.viewport=new rt,S[Te]=Ne),Ne.matrix.fromArray(at.transform.matrix),Ne.matrix.decompose(Ne.position,Ne.quaternion,Ne.scale),Ne.projectionMatrix.fromArray(at.projectionMatrix),Ne.projectionMatrixInverse.copy(Ne.projectionMatrix).invert(),Ne.viewport.set(tt.x,tt.y,tt.width,tt.height),Te===0&&(x.matrix.copy(Ne.matrix),x.matrix.decompose(x.position,x.quaternion,x.scale)),se===!0&&x.cameras.push(Ne)}const ye=r.enabledFeatures;if(ye&&ye.includes("depth-sensing")&&r.depthUsage=="gpu-optimized"&&u){const Te=u.getDepthInformation(me[0]);Te&&Te.isValid&&Te.texture&&M.init(e,Te,r.renderState)}}for(let me=0;me<T.length;me++){const se=E[me],ye=T[me];se!==null&&ye!==void 0&&ye.update(se,te,l||a)}ve&&ve(q,te),te.detectedPlanes&&i.dispatchEvent({type:"planesdetected",data:te}),g=null}const je=new El;je.setAnimationLoop(Le),this.setAnimationLoop=function(q){ve=q},this.dispose=function(){}}}const Ln=new Yt,z_=new st;function H_(n,e){function t(p,f){p.matrixAutoUpdate===!0&&p.updateMatrix(),f.value.copy(p.matrix)}function i(p,f){f.color.getRGB(p.fogColor.value,_l(n)),f.isFog?(p.fogNear.value=f.near,p.fogFar.value=f.far):f.isFogExp2&&(p.fogDensity.value=f.density)}function r(p,f,w,T,E){f.isMeshBasicMaterial||f.isMeshLambertMaterial?s(p,f):f.isMeshToonMaterial?(s(p,f),u(p,f)):f.isMeshPhongMaterial?(s(p,f),h(p,f)):f.isMeshStandardMaterial?(s(p,f),d(p,f),f.isMeshPhysicalMaterial&&m(p,f,E)):f.isMeshMatcapMaterial?(s(p,f),g(p,f)):f.isMeshDepthMaterial?s(p,f):f.isMeshDistanceMaterial?(s(p,f),M(p,f)):f.isMeshNormalMaterial?s(p,f):f.isLineBasicMaterial?(a(p,f),f.isLineDashedMaterial&&o(p,f)):f.isPointsMaterial?c(p,f,w,T):f.isSpriteMaterial?l(p,f):f.isShadowMaterial?(p.color.value.copy(f.color),p.opacity.value=f.opacity):f.isShaderMaterial&&(f.uniformsNeedUpdate=!1)}function s(p,f){p.opacity.value=f.opacity,f.color&&p.diffuse.value.copy(f.color),f.emissive&&p.emissive.value.copy(f.emissive).multiplyScalar(f.emissiveIntensity),f.map&&(p.map.value=f.map,t(f.map,p.mapTransform)),f.alphaMap&&(p.alphaMap.value=f.alphaMap,t(f.alphaMap,p.alphaMapTransform)),f.bumpMap&&(p.bumpMap.value=f.bumpMap,t(f.bumpMap,p.bumpMapTransform),p.bumpScale.value=f.bumpScale,f.side===yt&&(p.bumpScale.value*=-1)),f.normalMap&&(p.normalMap.value=f.normalMap,t(f.normalMap,p.normalMapTransform),p.normalScale.value.copy(f.normalScale),f.side===yt&&p.normalScale.value.negate()),f.displacementMap&&(p.displacementMap.value=f.displacementMap,t(f.displacementMap,p.displacementMapTransform),p.displacementScale.value=f.displacementScale,p.displacementBias.value=f.displacementBias),f.emissiveMap&&(p.emissiveMap.value=f.emissiveMap,t(f.emissiveMap,p.emissiveMapTransform)),f.specularMap&&(p.specularMap.value=f.specularMap,t(f.specularMap,p.specularMapTransform)),f.alphaTest>0&&(p.alphaTest.value=f.alphaTest);const w=e.get(f),T=w.envMap,E=w.envMapRotation;T&&(p.envMap.value=T,Ln.copy(E),Ln.x*=-1,Ln.y*=-1,Ln.z*=-1,T.isCubeTexture&&T.isRenderTargetTexture===!1&&(Ln.y*=-1,Ln.z*=-1),p.envMapRotation.value.setFromMatrix4(z_.makeRotationFromEuler(Ln)),p.flipEnvMap.value=T.isCubeTexture&&T.isRenderTargetTexture===!1?-1:1,p.reflectivity.value=f.reflectivity,p.ior.value=f.ior,p.refractionRatio.value=f.refractionRatio),f.lightMap&&(p.lightMap.value=f.lightMap,p.lightMapIntensity.value=f.lightMapIntensity,t(f.lightMap,p.lightMapTransform)),f.aoMap&&(p.aoMap.value=f.aoMap,p.aoMapIntensity.value=f.aoMapIntensity,t(f.aoMap,p.aoMapTransform))}function a(p,f){p.diffuse.value.copy(f.color),p.opacity.value=f.opacity,f.map&&(p.map.value=f.map,t(f.map,p.mapTransform))}function o(p,f){p.dashSize.value=f.dashSize,p.totalSize.value=f.dashSize+f.gapSize,p.scale.value=f.scale}function c(p,f,w,T){p.diffuse.value.copy(f.color),p.opacity.value=f.opacity,p.size.value=f.size*w,p.scale.value=T*.5,f.map&&(p.map.value=f.map,t(f.map,p.uvTransform)),f.alphaMap&&(p.alphaMap.value=f.alphaMap,t(f.alphaMap,p.alphaMapTransform)),f.alphaTest>0&&(p.alphaTest.value=f.alphaTest)}function l(p,f){p.diffuse.value.copy(f.color),p.opacity.value=f.opacity,p.rotation.value=f.rotation,f.map&&(p.map.value=f.map,t(f.map,p.mapTransform)),f.alphaMap&&(p.alphaMap.value=f.alphaMap,t(f.alphaMap,p.alphaMapTransform)),f.alphaTest>0&&(p.alphaTest.value=f.alphaTest)}function h(p,f){p.specular.value.copy(f.specular),p.shininess.value=Math.max(f.shininess,1e-4)}function u(p,f){f.gradientMap&&(p.gradientMap.value=f.gradientMap)}function d(p,f){p.metalness.value=f.metalness,f.metalnessMap&&(p.metalnessMap.value=f.metalnessMap,t(f.metalnessMap,p.metalnessMapTransform)),p.roughness.value=f.roughness,f.roughnessMap&&(p.roughnessMap.value=f.roughnessMap,t(f.roughnessMap,p.roughnessMapTransform)),f.envMap&&(p.envMapIntensity.value=f.envMapIntensity)}function m(p,f,w){p.ior.value=f.ior,f.sheen>0&&(p.sheenColor.value.copy(f.sheenColor).multiplyScalar(f.sheen),p.sheenRoughness.value=f.sheenRoughness,f.sheenColorMap&&(p.sheenColorMap.value=f.sheenColorMap,t(f.sheenColorMap,p.sheenColorMapTransform)),f.sheenRoughnessMap&&(p.sheenRoughnessMap.value=f.sheenRoughnessMap,t(f.sheenRoughnessMap,p.sheenRoughnessMapTransform))),f.clearcoat>0&&(p.clearcoat.value=f.clearcoat,p.clearcoatRoughness.value=f.clearcoatRoughness,f.clearcoatMap&&(p.clearcoatMap.value=f.clearcoatMap,t(f.clearcoatMap,p.clearcoatMapTransform)),f.clearcoatRoughnessMap&&(p.clearcoatRoughnessMap.value=f.clearcoatRoughnessMap,t(f.clearcoatRoughnessMap,p.clearcoatRoughnessMapTransform)),f.clearcoatNormalMap&&(p.clearcoatNormalMap.value=f.clearcoatNormalMap,t(f.clearcoatNormalMap,p.clearcoatNormalMapTransform),p.clearcoatNormalScale.value.copy(f.clearcoatNormalScale),f.side===yt&&p.clearcoatNormalScale.value.negate())),f.dispersion>0&&(p.dispersion.value=f.dispersion),f.iridescence>0&&(p.iridescence.value=f.iridescence,p.iridescenceIOR.value=f.iridescenceIOR,p.iridescenceThicknessMinimum.value=f.iridescenceThicknessRange[0],p.iridescenceThicknessMaximum.value=f.iridescenceThicknessRange[1],f.iridescenceMap&&(p.iridescenceMap.value=f.iridescenceMap,t(f.iridescenceMap,p.iridescenceMapTransform)),f.iridescenceThicknessMap&&(p.iridescenceThicknessMap.value=f.iridescenceThicknessMap,t(f.iridescenceThicknessMap,p.iridescenceThicknessMapTransform))),f.transmission>0&&(p.transmission.value=f.transmission,p.transmissionSamplerMap.value=w.texture,p.transmissionSamplerSize.value.set(w.width,w.height),f.transmissionMap&&(p.transmissionMap.value=f.transmissionMap,t(f.transmissionMap,p.transmissionMapTransform)),p.thickness.value=f.thickness,f.thicknessMap&&(p.thicknessMap.value=f.thicknessMap,t(f.thicknessMap,p.thicknessMapTransform)),p.attenuationDistance.value=f.attenuationDistance,p.attenuationColor.value.copy(f.attenuationColor)),f.anisotropy>0&&(p.anisotropyVector.value.set(f.anisotropy*Math.cos(f.anisotropyRotation),f.anisotropy*Math.sin(f.anisotropyRotation)),f.anisotropyMap&&(p.anisotropyMap.value=f.anisotropyMap,t(f.anisotropyMap,p.anisotropyMapTransform))),p.specularIntensity.value=f.specularIntensity,p.specularColor.value.copy(f.specularColor),f.specularColorMap&&(p.specularColorMap.value=f.specularColorMap,t(f.specularColorMap,p.specularColorMapTransform)),f.specularIntensityMap&&(p.specularIntensityMap.value=f.specularIntensityMap,t(f.specularIntensityMap,p.specularIntensityMapTransform))}function g(p,f){f.matcap&&(p.matcap.value=f.matcap)}function M(p,f){const w=e.get(f).light;p.referencePosition.value.setFromMatrixPosition(w.matrixWorld),p.nearDistance.value=w.shadow.camera.near,p.farDistance.value=w.shadow.camera.far}return{refreshFogUniforms:i,refreshMaterialUniforms:r}}function V_(n,e,t,i){let r={},s={},a=[];const o=n.getParameter(n.MAX_UNIFORM_BUFFER_BINDINGS);function c(w,T){const E=T.program;i.uniformBlockBinding(w,E)}function l(w,T){let E=r[w.id];E===void 0&&(g(w),E=h(w),r[w.id]=E,w.addEventListener("dispose",p));const C=T.program;i.updateUBOMapping(w,C);const A=e.render.frame;s[w.id]!==A&&(d(w),s[w.id]=A)}function h(w){const T=u();w.__bindingPointIndex=T;const E=n.createBuffer(),C=w.__size,A=w.usage;return n.bindBuffer(n.UNIFORM_BUFFER,E),n.bufferData(n.UNIFORM_BUFFER,C,A),n.bindBuffer(n.UNIFORM_BUFFER,null),n.bindBufferBase(n.UNIFORM_BUFFER,T,E),E}function u(){for(let w=0;w<o;w++)if(a.indexOf(w)===-1)return a.push(w),w;return console.error("THREE.WebGLRenderer: Maximum number of simultaneously usable uniforms groups reached."),0}function d(w){const T=r[w.id],E=w.uniforms,C=w.__cache;n.bindBuffer(n.UNIFORM_BUFFER,T);for(let A=0,P=E.length;A<P;A++){const I=Array.isArray(E[A])?E[A]:[E[A]];for(let S=0,x=I.length;S<x;S++){const b=I[S];if(m(b,A,S,C)===!0){const W=b.__offset,N=Array.isArray(b.value)?b.value:[b.value];let k=0;for(let Z=0;Z<N.length;Z++){const G=N[Z],J=M(G);typeof G=="number"||typeof G=="boolean"?(b.__data[0]=G,n.bufferSubData(n.UNIFORM_BUFFER,W+k,b.__data)):G.isMatrix3?(b.__data[0]=G.elements[0],b.__data[1]=G.elements[1],b.__data[2]=G.elements[2],b.__data[3]=0,b.__data[4]=G.elements[3],b.__data[5]=G.elements[4],b.__data[6]=G.elements[5],b.__data[7]=0,b.__data[8]=G.elements[6],b.__data[9]=G.elements[7],b.__data[10]=G.elements[8],b.__data[11]=0):(G.toArray(b.__data,k),k+=J.storage/Float32Array.BYTES_PER_ELEMENT)}n.bufferSubData(n.UNIFORM_BUFFER,W,b.__data)}}}n.bindBuffer(n.UNIFORM_BUFFER,null)}function m(w,T,E,C){const A=w.value,P=T+"_"+E;if(C[P]===void 0)return typeof A=="number"||typeof A=="boolean"?C[P]=A:C[P]=A.clone(),!0;{const I=C[P];if(typeof A=="number"||typeof A=="boolean"){if(I!==A)return C[P]=A,!0}else if(I.equals(A)===!1)return I.copy(A),!0}return!1}function g(w){const T=w.uniforms;let E=0;const C=16;for(let P=0,I=T.length;P<I;P++){const S=Array.isArray(T[P])?T[P]:[T[P]];for(let x=0,b=S.length;x<b;x++){const W=S[x],N=Array.isArray(W.value)?W.value:[W.value];for(let k=0,Z=N.length;k<Z;k++){const G=N[k],J=M(G),H=E%C,Q=H%J.boundary,ce=H+Q;E+=Q,ce!==0&&C-ce<J.storage&&(E+=C-ce),W.__data=new Float32Array(J.storage/Float32Array.BYTES_PER_ELEMENT),W.__offset=E,E+=J.storage}}}const A=E%C;return A>0&&(E+=C-A),w.__size=E,w.__cache={},this}function M(w){const T={boundary:0,storage:0};return typeof w=="number"||typeof w=="boolean"?(T.boundary=4,T.storage=4):w.isVector2?(T.boundary=8,T.storage=8):w.isVector3||w.isColor?(T.boundary=16,T.storage=12):w.isVector4?(T.boundary=16,T.storage=16):w.isMatrix3?(T.boundary=48,T.storage=48):w.isMatrix4?(T.boundary=64,T.storage=64):w.isTexture?console.warn("THREE.WebGLRenderer: Texture samplers can not be part of an uniforms group."):console.warn("THREE.WebGLRenderer: Unsupported uniform value type.",w),T}function p(w){const T=w.target;T.removeEventListener("dispose",p);const E=a.indexOf(T.__bindingPointIndex);a.splice(E,1),n.deleteBuffer(r[T.id]),delete r[T.id],delete s[T.id]}function f(){for(const w in r)n.deleteBuffer(r[w]);a=[],r={},s={}}return{bind:c,update:l,dispose:f}}class G_{constructor(e={}){const{canvas:t=vh(),context:i=null,depth:r=!0,stencil:s=!1,alpha:a=!1,antialias:o=!1,premultipliedAlpha:c=!0,preserveDrawingBuffer:l=!1,powerPreference:h="default",failIfMajorPerformanceCaveat:u=!1,reverseDepthBuffer:d=!1}=e;this.isWebGLRenderer=!0;let m;if(i!==null){if(typeof WebGLRenderingContext<"u"&&i instanceof WebGLRenderingContext)throw new Error("THREE.WebGLRenderer: WebGL 1 is not supported since r163.");m=i.getContextAttributes().alpha}else m=a;const g=new Uint32Array(4),M=new Int32Array(4);let p=null,f=null;const w=[],T=[];this.domElement=t,this.debug={checkShaderErrors:!0,onShaderError:null},this.autoClear=!0,this.autoClearColor=!0,this.autoClearDepth=!0,this.autoClearStencil=!0,this.sortObjects=!0,this.clippingPlanes=[],this.localClippingEnabled=!1,this._outputColorSpace=Lt,this.toneMapping=Mn,this.toneMappingExposure=1;const E=this;let C=!1,A=0,P=0,I=null,S=-1,x=null;const b=new rt,W=new rt;let N=null;const k=new ze(0);let Z=0,G=t.width,J=t.height,H=1,Q=null,ce=null;const ve=new rt(0,0,G,J),Le=new rt(0,0,G,J);let je=!1;const q=new pa;let te=!1,me=!1;this.transmissionResolutionScale=1;const se=new st,ye=new st,We=new B,Te=new rt,at={background:null,fog:null,environment:null,overrideMaterial:null,isScene:!0};let tt=!1;function Ne(){return I===null?H:1}let R=i;function Rt(v,L){return t.getContext(v,L)}try{const v={alpha:!0,depth:r,stencil:s,antialias:o,premultipliedAlpha:c,preserveDrawingBuffer:l,powerPreference:h,failIfMajorPerformanceCaveat:u};if("setAttribute"in t&&t.setAttribute("data-engine",`three.js r${ia}`),t.addEventListener("webglcontextlost",$,!1),t.addEventListener("webglcontextrestored",le,!1),t.addEventListener("webglcontextcreationerror",oe,!1),R===null){const L="webgl2";if(R=Rt(L,v),R===null)throw Rt(L)?new Error("Error creating WebGL context with your selected attributes."):new Error("Error creating WebGL context.")}}catch(v){throw console.error("THREE.WebGLRenderer: "+v.message),v}let Fe,Oe,xe,Qe,ge,y,_,F,Y,K,X,_e,ae,he,He,ee,fe,Ee,be,de,Be,Pe,Je,D;function ie(){Fe=new Jp(R),Fe.init(),Pe=new I_(R,Fe),Oe=new qp(R,Fe,e,Pe),xe=new L_(R,Fe),Oe.reverseDepthBuffer&&d&&xe.buffers.depth.setReversed(!0),Qe=new tm(R),ge=new x_,y=new U_(R,Fe,xe,ge,Oe,Pe,Qe),_=new $p(E),F=new jp(E),Y=new lf(R),Je=new Wp(R,Y),K=new Qp(R,Y,Qe,Je),X=new im(R,K,Y,Qe),be=new nm(R,Oe,y),ee=new Yp(ge),_e=new v_(E,_,F,Fe,Oe,Je,ee),ae=new H_(E,ge),he=new S_,He=new w_(Fe),Ee=new kp(E,_,F,xe,X,m,c),fe=new P_(E,X,Oe),D=new V_(R,Qe,Oe,xe),de=new Xp(R,Fe,Qe),Be=new em(R,Fe,Qe),Qe.programs=_e.programs,E.capabilities=Oe,E.extensions=Fe,E.properties=ge,E.renderLists=he,E.shadowMap=fe,E.state=xe,E.info=Qe}ie();const V=new B_(E,R);this.xr=V,this.getContext=function(){return R},this.getContextAttributes=function(){return R.getContextAttributes()},this.forceContextLoss=function(){const v=Fe.get("WEBGL_lose_context");v&&v.loseContext()},this.forceContextRestore=function(){const v=Fe.get("WEBGL_lose_context");v&&v.restoreContext()},this.getPixelRatio=function(){return H},this.setPixelRatio=function(v){v!==void 0&&(H=v,this.setSize(G,J,!1))},this.getSize=function(v){return v.set(G,J)},this.setSize=function(v,L,O=!0){if(V.isPresenting){console.warn("THREE.WebGLRenderer: Can't change size while VR device is presenting.");return}G=v,J=L,t.width=Math.floor(v*H),t.height=Math.floor(L*H),O===!0&&(t.style.width=v+"px",t.style.height=L+"px"),this.setViewport(0,0,v,L)},this.getDrawingBufferSize=function(v){return v.set(G*H,J*H).floor()},this.setDrawingBufferSize=function(v,L,O){G=v,J=L,H=O,t.width=Math.floor(v*O),t.height=Math.floor(L*O),this.setViewport(0,0,v,L)},this.getCurrentViewport=function(v){return v.copy(b)},this.getViewport=function(v){return v.copy(ve)},this.setViewport=function(v,L,O,z){v.isVector4?ve.set(v.x,v.y,v.z,v.w):ve.set(v,L,O,z),xe.viewport(b.copy(ve).multiplyScalar(H).round())},this.getScissor=function(v){return v.copy(Le)},this.setScissor=function(v,L,O,z){v.isVector4?Le.set(v.x,v.y,v.z,v.w):Le.set(v,L,O,z),xe.scissor(W.copy(Le).multiplyScalar(H).round())},this.getScissorTest=function(){return je},this.setScissorTest=function(v){xe.setScissorTest(je=v)},this.setOpaqueSort=function(v){Q=v},this.setTransparentSort=function(v){ce=v},this.getClearColor=function(v){return v.copy(Ee.getClearColor())},this.setClearColor=function(){Ee.setClearColor.apply(Ee,arguments)},this.getClearAlpha=function(){return Ee.getClearAlpha()},this.setClearAlpha=function(){Ee.setClearAlpha.apply(Ee,arguments)},this.clear=function(v=!0,L=!0,O=!0){let z=0;if(v){let U=!1;if(I!==null){const j=I.texture.format;U=j===ua||j===ca||j===la}if(U){const j=I.texture.type,re=j===un||j===kn||j===Ii||j===_i||j===aa||j===oa,ue=Ee.getClearColor(),pe=Ee.getClearAlpha(),Ae=ue.r,we=ue.g,Me=ue.b;re?(g[0]=Ae,g[1]=we,g[2]=Me,g[3]=pe,R.clearBufferuiv(R.COLOR,0,g)):(M[0]=Ae,M[1]=we,M[2]=Me,M[3]=pe,R.clearBufferiv(R.COLOR,0,M))}else z|=R.COLOR_BUFFER_BIT}L&&(z|=R.DEPTH_BUFFER_BIT),O&&(z|=R.STENCIL_BUFFER_BIT,this.state.buffers.stencil.setMask(4294967295)),R.clear(z)},this.clearColor=function(){this.clear(!0,!1,!1)},this.clearDepth=function(){this.clear(!1,!0,!1)},this.clearStencil=function(){this.clear(!1,!1,!0)},this.dispose=function(){t.removeEventListener("webglcontextlost",$,!1),t.removeEventListener("webglcontextrestored",le,!1),t.removeEventListener("webglcontextcreationerror",oe,!1),Ee.dispose(),he.dispose(),He.dispose(),ge.dispose(),_.dispose(),F.dispose(),X.dispose(),Je.dispose(),D.dispose(),_e.dispose(),V.dispose(),V.removeEventListener("sessionstart",ga),V.removeEventListener("sessionend",va),bn.stop()};function $(v){v.preventDefault(),console.log("THREE.WebGLRenderer: Context Lost."),C=!0}function le(){console.log("THREE.WebGLRenderer: Context Restored."),C=!1;const v=Qe.autoReset,L=fe.enabled,O=fe.autoUpdate,z=fe.needsUpdate,U=fe.type;ie(),Qe.autoReset=v,fe.enabled=L,fe.autoUpdate=O,fe.needsUpdate=z,fe.type=U}function oe(v){console.error("THREE.WebGLRenderer: A WebGL context could not be created. Reason: ",v.statusMessage)}function Re(v){const L=v.target;L.removeEventListener("dispose",Re),nt(L)}function nt(v){pt(v),ge.remove(v)}function pt(v){const L=ge.get(v).programs;L!==void 0&&(L.forEach(function(O){_e.releaseProgram(O)}),v.isShaderMaterial&&_e.releaseShaderCache(v))}this.renderBufferDirect=function(v,L,O,z,U,j){L===null&&(L=at);const re=U.isMesh&&U.matrixWorld.determinant()<0,ue=Pl(v,L,O,z,U);xe.setMaterial(z,re);let pe=O.index,Ae=1;if(z.wireframe===!0){if(pe=K.getWireframeAttribute(O),pe===void 0)return;Ae=2}const we=O.drawRange,Me=O.attributes.position;let Ve=we.start*Ae,Ye=(we.start+we.count)*Ae;j!==null&&(Ve=Math.max(Ve,j.start*Ae),Ye=Math.min(Ye,(j.start+j.count)*Ae)),pe!==null?(Ve=Math.max(Ve,0),Ye=Math.min(Ye,pe.count)):Me!=null&&(Ve=Math.max(Ve,0),Ye=Math.min(Ye,Me.count));const ot=Ye-Ve;if(ot<0||ot===1/0)return;Je.setup(U,z,ue,O,pe);let it,Ge=de;if(pe!==null&&(it=Y.get(pe),Ge=Be,Ge.setIndex(it)),U.isMesh)z.wireframe===!0?(xe.setLineWidth(z.wireframeLinewidth*Ne()),Ge.setMode(R.LINES)):Ge.setMode(R.TRIANGLES);else if(U.isLine){let Se=z.linewidth;Se===void 0&&(Se=1),xe.setLineWidth(Se*Ne()),U.isLineSegments?Ge.setMode(R.LINES):U.isLineLoop?Ge.setMode(R.LINE_LOOP):Ge.setMode(R.LINE_STRIP)}else U.isPoints?Ge.setMode(R.POINTS):U.isSprite&&Ge.setMode(R.TRIANGLES);if(U.isBatchedMesh)if(U._multiDrawInstances!==null)Ge.renderMultiDrawInstances(U._multiDrawStarts,U._multiDrawCounts,U._multiDrawCount,U._multiDrawInstances);else if(Fe.get("WEBGL_multi_draw"))Ge.renderMultiDraw(U._multiDrawStarts,U._multiDrawCounts,U._multiDrawCount);else{const Se=U._multiDrawStarts,dt=U._multiDrawCounts,$e=U._multiDrawCount,Ft=pe?Y.get(pe).bytesPerElement:1,Xn=ge.get(z).currentProgram.getUniforms();for(let bt=0;bt<$e;bt++)Xn.setValue(R,"_gl_DrawID",bt),Ge.render(Se[bt]/Ft,dt[bt])}else if(U.isInstancedMesh)Ge.renderInstances(Ve,ot,U.count);else if(O.isInstancedBufferGeometry){const Se=O._maxInstanceCount!==void 0?O._maxInstanceCount:1/0,dt=Math.min(O.instanceCount,Se);Ge.renderInstances(Ve,ot,dt)}else Ge.render(Ve,ot)};function Ze(v,L,O){v.transparent===!0&&v.side===Kt&&v.forceSinglePass===!1?(v.side=yt,v.needsUpdate=!0,ki(v,L,O),v.side=En,v.needsUpdate=!0,ki(v,L,O),v.side=Kt):ki(v,L,O)}this.compile=function(v,L,O=null){O===null&&(O=v),f=He.get(O),f.init(L),T.push(f),O.traverseVisible(function(U){U.isLight&&U.layers.test(L.layers)&&(f.pushLight(U),U.castShadow&&f.pushShadow(U))}),v!==O&&v.traverseVisible(function(U){U.isLight&&U.layers.test(L.layers)&&(f.pushLight(U),U.castShadow&&f.pushShadow(U))}),f.setupLights();const z=new Set;return v.traverse(function(U){if(!(U.isMesh||U.isPoints||U.isLine||U.isSprite))return;const j=U.material;if(j)if(Array.isArray(j))for(let re=0;re<j.length;re++){const ue=j[re];Ze(ue,O,U),z.add(ue)}else Ze(j,O,U),z.add(j)}),T.pop(),f=null,z},this.compileAsync=function(v,L,O=null){const z=this.compile(v,L,O);return new Promise(U=>{function j(){if(z.forEach(function(re){ge.get(re).currentProgram.isReady()&&z.delete(re)}),z.size===0){U(v);return}setTimeout(j,10)}Fe.get("KHR_parallel_shader_compile")!==null?j():setTimeout(j,10)})};let Nt=null;function en(v){Nt&&Nt(v)}function ga(){bn.stop()}function va(){bn.start()}const bn=new El;bn.setAnimationLoop(en),typeof self<"u"&&bn.setContext(self),this.setAnimationLoop=function(v){Nt=v,V.setAnimationLoop(v),v===null?bn.stop():bn.start()},V.addEventListener("sessionstart",ga),V.addEventListener("sessionend",va),this.render=function(v,L){if(L!==void 0&&L.isCamera!==!0){console.error("THREE.WebGLRenderer.render: camera is not an instance of THREE.Camera.");return}if(C===!0)return;if(v.matrixWorldAutoUpdate===!0&&v.updateMatrixWorld(),L.parent===null&&L.matrixWorldAutoUpdate===!0&&L.updateMatrixWorld(),V.enabled===!0&&V.isPresenting===!0&&(V.cameraAutoUpdate===!0&&V.updateCamera(L),L=V.getCamera()),v.isScene===!0&&v.onBeforeRender(E,v,L,I),f=He.get(v,T.length),f.init(L),T.push(f),ye.multiplyMatrices(L.projectionMatrix,L.matrixWorldInverse),q.setFromProjectionMatrix(ye),me=this.localClippingEnabled,te=ee.init(this.clippingPlanes,me),p=he.get(v,w.length),p.init(),w.push(p),V.enabled===!0&&V.isPresenting===!0){const j=E.xr.getDepthSensingMesh();j!==null&&Pr(j,L,-1/0,E.sortObjects)}Pr(v,L,0,E.sortObjects),p.finish(),E.sortObjects===!0&&p.sort(Q,ce),tt=V.enabled===!1||V.isPresenting===!1||V.hasDepthSensing()===!1,tt&&Ee.addToRenderList(p,v),this.info.render.frame++,te===!0&&ee.beginShadows();const O=f.state.shadowsArray;fe.render(O,v,L),te===!0&&ee.endShadows(),this.info.autoReset===!0&&this.info.reset();const z=p.opaque,U=p.transmissive;if(f.setupLights(),L.isArrayCamera){const j=L.cameras;if(U.length>0)for(let re=0,ue=j.length;re<ue;re++){const pe=j[re];Ma(z,U,v,pe)}tt&&Ee.render(v);for(let re=0,ue=j.length;re<ue;re++){const pe=j[re];xa(p,v,pe,pe.viewport)}}else U.length>0&&Ma(z,U,v,L),tt&&Ee.render(v),xa(p,v,L);I!==null&&P===0&&(y.updateMultisampleRenderTarget(I),y.updateRenderTargetMipmap(I)),v.isScene===!0&&v.onAfterRender(E,v,L),Je.resetDefaultState(),S=-1,x=null,T.pop(),T.length>0?(f=T[T.length-1],te===!0&&ee.setGlobalState(E.clippingPlanes,f.state.camera)):f=null,w.pop(),w.length>0?p=w[w.length-1]:p=null};function Pr(v,L,O,z){if(v.visible===!1)return;if(v.layers.test(L.layers)){if(v.isGroup)O=v.renderOrder;else if(v.isLOD)v.autoUpdate===!0&&v.update(L);else if(v.isLight)f.pushLight(v),v.castShadow&&f.pushShadow(v);else if(v.isSprite){if(!v.frustumCulled||q.intersectsSprite(v)){z&&Te.setFromMatrixPosition(v.matrixWorld).applyMatrix4(ye);const re=X.update(v),ue=v.material;ue.visible&&p.push(v,re,ue,O,Te.z,null)}}else if((v.isMesh||v.isLine||v.isPoints)&&(!v.frustumCulled||q.intersectsObject(v))){const re=X.update(v),ue=v.material;if(z&&(v.boundingSphere!==void 0?(v.boundingSphere===null&&v.computeBoundingSphere(),Te.copy(v.boundingSphere.center)):(re.boundingSphere===null&&re.computeBoundingSphere(),Te.copy(re.boundingSphere.center)),Te.applyMatrix4(v.matrixWorld).applyMatrix4(ye)),Array.isArray(ue)){const pe=re.groups;for(let Ae=0,we=pe.length;Ae<we;Ae++){const Me=pe[Ae],Ve=ue[Me.materialIndex];Ve&&Ve.visible&&p.push(v,re,Ve,O,Te.z,Me)}}else ue.visible&&p.push(v,re,ue,O,Te.z,null)}}const j=v.children;for(let re=0,ue=j.length;re<ue;re++)Pr(j[re],L,O,z)}function xa(v,L,O,z){const U=v.opaque,j=v.transmissive,re=v.transparent;f.setupLightsView(O),te===!0&&ee.setGlobalState(E.clippingPlanes,O),z&&xe.viewport(b.copy(z)),U.length>0&&Gi(U,L,O),j.length>0&&Gi(j,L,O),re.length>0&&Gi(re,L,O),xe.buffers.depth.setTest(!0),xe.buffers.depth.setMask(!0),xe.buffers.color.setMask(!0),xe.setPolygonOffset(!1)}function Ma(v,L,O,z){if((O.isScene===!0?O.overrideMaterial:null)!==null)return;f.state.transmissionRenderTarget[z.id]===void 0&&(f.state.transmissionRenderTarget[z.id]=new Wn(1,1,{generateMipmaps:!0,type:Fe.has("EXT_color_buffer_half_float")||Fe.has("EXT_color_buffer_float")?Oi:un,minFilter:zn,samples:4,stencilBuffer:s,resolveDepthBuffer:!1,resolveStencilBuffer:!1,colorSpace:ke.workingColorSpace}));const j=f.state.transmissionRenderTarget[z.id],re=z.viewport||b;j.setSize(re.z*E.transmissionResolutionScale,re.w*E.transmissionResolutionScale);const ue=E.getRenderTarget();E.setRenderTarget(j),E.getClearColor(k),Z=E.getClearAlpha(),Z<1&&E.setClearColor(16777215,.5),E.clear(),tt&&Ee.render(O);const pe=E.toneMapping;E.toneMapping=Mn;const Ae=z.viewport;if(z.viewport!==void 0&&(z.viewport=void 0),f.setupLightsView(z),te===!0&&ee.setGlobalState(E.clippingPlanes,z),Gi(v,O,z),y.updateMultisampleRenderTarget(j),y.updateRenderTargetMipmap(j),Fe.has("WEBGL_multisampled_render_to_texture")===!1){let we=!1;for(let Me=0,Ve=L.length;Me<Ve;Me++){const Ye=L[Me],ot=Ye.object,it=Ye.geometry,Ge=Ye.material,Se=Ye.group;if(Ge.side===Kt&&ot.layers.test(z.layers)){const dt=Ge.side;Ge.side=yt,Ge.needsUpdate=!0,Sa(ot,O,z,it,Ge,Se),Ge.side=dt,Ge.needsUpdate=!0,we=!0}}we===!0&&(y.updateMultisampleRenderTarget(j),y.updateRenderTargetMipmap(j))}E.setRenderTarget(ue),E.setClearColor(k,Z),Ae!==void 0&&(z.viewport=Ae),E.toneMapping=pe}function Gi(v,L,O){const z=L.isScene===!0?L.overrideMaterial:null;for(let U=0,j=v.length;U<j;U++){const re=v[U],ue=re.object,pe=re.geometry,Ae=z===null?re.material:z,we=re.group;ue.layers.test(O.layers)&&Sa(ue,L,O,pe,Ae,we)}}function Sa(v,L,O,z,U,j){v.onBeforeRender(E,L,O,z,U,j),v.modelViewMatrix.multiplyMatrices(O.matrixWorldInverse,v.matrixWorld),v.normalMatrix.getNormalMatrix(v.modelViewMatrix),U.onBeforeRender(E,L,O,z,v,j),U.transparent===!0&&U.side===Kt&&U.forceSinglePass===!1?(U.side=yt,U.needsUpdate=!0,E.renderBufferDirect(O,L,z,U,v,j),U.side=En,U.needsUpdate=!0,E.renderBufferDirect(O,L,z,U,v,j),U.side=Kt):E.renderBufferDirect(O,L,z,U,v,j),v.onAfterRender(E,L,O,z,U,j)}function ki(v,L,O){L.isScene!==!0&&(L=at);const z=ge.get(v),U=f.state.lights,j=f.state.shadowsArray,re=U.state.version,ue=_e.getParameters(v,U.state,j,L,O),pe=_e.getProgramCacheKey(ue);let Ae=z.programs;z.environment=v.isMeshStandardMaterial?L.environment:null,z.fog=L.fog,z.envMap=(v.isMeshStandardMaterial?F:_).get(v.envMap||z.environment),z.envMapRotation=z.environment!==null&&v.envMap===null?L.environmentRotation:v.envMapRotation,Ae===void 0&&(v.addEventListener("dispose",Re),Ae=new Map,z.programs=Ae);let we=Ae.get(pe);if(we!==void 0){if(z.currentProgram===we&&z.lightsStateVersion===re)return ya(v,ue),we}else ue.uniforms=_e.getUniforms(v),v.onBeforeCompile(ue,E),we=_e.acquireProgram(ue,pe),Ae.set(pe,we),z.uniforms=ue.uniforms;const Me=z.uniforms;return(!v.isShaderMaterial&&!v.isRawShaderMaterial||v.clipping===!0)&&(Me.clippingPlanes=ee.uniform),ya(v,ue),z.needsLights=Ll(v),z.lightsStateVersion=re,z.needsLights&&(Me.ambientLightColor.value=U.state.ambient,Me.lightProbe.value=U.state.probe,Me.directionalLights.value=U.state.directional,Me.directionalLightShadows.value=U.state.directionalShadow,Me.spotLights.value=U.state.spot,Me.spotLightShadows.value=U.state.spotShadow,Me.rectAreaLights.value=U.state.rectArea,Me.ltc_1.value=U.state.rectAreaLTC1,Me.ltc_2.value=U.state.rectAreaLTC2,Me.pointLights.value=U.state.point,Me.pointLightShadows.value=U.state.pointShadow,Me.hemisphereLights.value=U.state.hemi,Me.directionalShadowMap.value=U.state.directionalShadowMap,Me.directionalShadowMatrix.value=U.state.directionalShadowMatrix,Me.spotShadowMap.value=U.state.spotShadowMap,Me.spotLightMatrix.value=U.state.spotLightMatrix,Me.spotLightMap.value=U.state.spotLightMap,Me.pointShadowMap.value=U.state.pointShadowMap,Me.pointShadowMatrix.value=U.state.pointShadowMatrix),z.currentProgram=we,z.uniformsList=null,we}function Ea(v){if(v.uniformsList===null){const L=v.currentProgram.getUniforms();v.uniformsList=Mr.seqWithValue(L.seq,v.uniforms)}return v.uniformsList}function ya(v,L){const O=ge.get(v);O.outputColorSpace=L.outputColorSpace,O.batching=L.batching,O.batchingColor=L.batchingColor,O.instancing=L.instancing,O.instancingColor=L.instancingColor,O.instancingMorph=L.instancingMorph,O.skinning=L.skinning,O.morphTargets=L.morphTargets,O.morphNormals=L.morphNormals,O.morphColors=L.morphColors,O.morphTargetsCount=L.morphTargetsCount,O.numClippingPlanes=L.numClippingPlanes,O.numIntersection=L.numClipIntersection,O.vertexAlphas=L.vertexAlphas,O.vertexTangents=L.vertexTangents,O.toneMapping=L.toneMapping}function Pl(v,L,O,z,U){L.isScene!==!0&&(L=at),y.resetTextureUnits();const j=L.fog,re=z.isMeshStandardMaterial?L.environment:null,ue=I===null?E.outputColorSpace:I.isXRRenderTarget===!0?I.texture.colorSpace:vi,pe=(z.isMeshStandardMaterial?F:_).get(z.envMap||re),Ae=z.vertexColors===!0&&!!O.attributes.color&&O.attributes.color.itemSize===4,we=!!O.attributes.tangent&&(!!z.normalMap||z.anisotropy>0),Me=!!O.morphAttributes.position,Ve=!!O.morphAttributes.normal,Ye=!!O.morphAttributes.color;let ot=Mn;z.toneMapped&&(I===null||I.isXRRenderTarget===!0)&&(ot=E.toneMapping);const it=O.morphAttributes.position||O.morphAttributes.normal||O.morphAttributes.color,Ge=it!==void 0?it.length:0,Se=ge.get(z),dt=f.state.lights;if(te===!0&&(me===!0||v!==x)){const vt=v===x&&z.id===S;ee.setState(z,v,vt)}let $e=!1;z.version===Se.__version?(Se.needsLights&&Se.lightsStateVersion!==dt.state.version||Se.outputColorSpace!==ue||U.isBatchedMesh&&Se.batching===!1||!U.isBatchedMesh&&Se.batching===!0||U.isBatchedMesh&&Se.batchingColor===!0&&U.colorTexture===null||U.isBatchedMesh&&Se.batchingColor===!1&&U.colorTexture!==null||U.isInstancedMesh&&Se.instancing===!1||!U.isInstancedMesh&&Se.instancing===!0||U.isSkinnedMesh&&Se.skinning===!1||!U.isSkinnedMesh&&Se.skinning===!0||U.isInstancedMesh&&Se.instancingColor===!0&&U.instanceColor===null||U.isInstancedMesh&&Se.instancingColor===!1&&U.instanceColor!==null||U.isInstancedMesh&&Se.instancingMorph===!0&&U.morphTexture===null||U.isInstancedMesh&&Se.instancingMorph===!1&&U.morphTexture!==null||Se.envMap!==pe||z.fog===!0&&Se.fog!==j||Se.numClippingPlanes!==void 0&&(Se.numClippingPlanes!==ee.numPlanes||Se.numIntersection!==ee.numIntersection)||Se.vertexAlphas!==Ae||Se.vertexTangents!==we||Se.morphTargets!==Me||Se.morphNormals!==Ve||Se.morphColors!==Ye||Se.toneMapping!==ot||Se.morphTargetsCount!==Ge)&&($e=!0):($e=!0,Se.__version=z.version);let Ft=Se.currentProgram;$e===!0&&(Ft=ki(z,L,U));let Xn=!1,bt=!1,Ti=!1;const et=Ft.getUniforms(),Ct=Se.uniforms;if(xe.useProgram(Ft.program)&&(Xn=!0,bt=!0,Ti=!0),z.id!==S&&(S=z.id,bt=!0),Xn||x!==v){xe.buffers.depth.getReversed()?(se.copy(v.projectionMatrix),Mh(se),Sh(se),et.setValue(R,"projectionMatrix",se)):et.setValue(R,"projectionMatrix",v.projectionMatrix),et.setValue(R,"viewMatrix",v.matrixWorldInverse);const Et=et.map.cameraPosition;Et!==void 0&&Et.setValue(R,We.setFromMatrixPosition(v.matrixWorld)),Oe.logarithmicDepthBuffer&&et.setValue(R,"logDepthBufFC",2/(Math.log(v.far+1)/Math.LN2)),(z.isMeshPhongMaterial||z.isMeshToonMaterial||z.isMeshLambertMaterial||z.isMeshBasicMaterial||z.isMeshStandardMaterial||z.isShaderMaterial)&&et.setValue(R,"isOrthographic",v.isOrthographicCamera===!0),x!==v&&(x=v,bt=!0,Ti=!0)}if(U.isSkinnedMesh){et.setOptional(R,U,"bindMatrix"),et.setOptional(R,U,"bindMatrixInverse");const vt=U.skeleton;vt&&(vt.boneTexture===null&&vt.computeBoneTexture(),et.setValue(R,"boneTexture",vt.boneTexture,y))}U.isBatchedMesh&&(et.setOptional(R,U,"batchingTexture"),et.setValue(R,"batchingTexture",U._matricesTexture,y),et.setOptional(R,U,"batchingIdTexture"),et.setValue(R,"batchingIdTexture",U._indirectTexture,y),et.setOptional(R,U,"batchingColorTexture"),U._colorsTexture!==null&&et.setValue(R,"batchingColorTexture",U._colorsTexture,y));const Pt=O.morphAttributes;if((Pt.position!==void 0||Pt.normal!==void 0||Pt.color!==void 0)&&be.update(U,O,Ft),(bt||Se.receiveShadow!==U.receiveShadow)&&(Se.receiveShadow=U.receiveShadow,et.setValue(R,"receiveShadow",U.receiveShadow)),z.isMeshGouraudMaterial&&z.envMap!==null&&(Ct.envMap.value=pe,Ct.flipEnvMap.value=pe.isCubeTexture&&pe.isRenderTargetTexture===!1?-1:1),z.isMeshStandardMaterial&&z.envMap===null&&L.environment!==null&&(Ct.envMapIntensity.value=L.environmentIntensity),bt&&(et.setValue(R,"toneMappingExposure",E.toneMappingExposure),Se.needsLights&&Dl(Ct,Ti),j&&z.fog===!0&&ae.refreshFogUniforms(Ct,j),ae.refreshMaterialUniforms(Ct,z,H,J,f.state.transmissionRenderTarget[v.id]),Mr.upload(R,Ea(Se),Ct,y)),z.isShaderMaterial&&z.uniformsNeedUpdate===!0&&(Mr.upload(R,Ea(Se),Ct,y),z.uniformsNeedUpdate=!1),z.isSpriteMaterial&&et.setValue(R,"center",U.center),et.setValue(R,"modelViewMatrix",U.modelViewMatrix),et.setValue(R,"normalMatrix",U.normalMatrix),et.setValue(R,"modelMatrix",U.matrixWorld),z.isShaderMaterial||z.isRawShaderMaterial){const vt=z.uniformsGroups;for(let Et=0,Dr=vt.length;Et<Dr;Et++){const An=vt[Et];D.update(An,Ft),D.bind(An,Ft)}}return Ft}function Dl(v,L){v.ambientLightColor.needsUpdate=L,v.lightProbe.needsUpdate=L,v.directionalLights.needsUpdate=L,v.directionalLightShadows.needsUpdate=L,v.pointLights.needsUpdate=L,v.pointLightShadows.needsUpdate=L,v.spotLights.needsUpdate=L,v.spotLightShadows.needsUpdate=L,v.rectAreaLights.needsUpdate=L,v.hemisphereLights.needsUpdate=L}function Ll(v){return v.isMeshLambertMaterial||v.isMeshToonMaterial||v.isMeshPhongMaterial||v.isMeshStandardMaterial||v.isShadowMaterial||v.isShaderMaterial&&v.lights===!0}this.getActiveCubeFace=function(){return A},this.getActiveMipmapLevel=function(){return P},this.getRenderTarget=function(){return I},this.setRenderTargetTextures=function(v,L,O){ge.get(v.texture).__webglTexture=L,ge.get(v.depthTexture).__webglTexture=O;const z=ge.get(v);z.__hasExternalTextures=!0,z.__autoAllocateDepthBuffer=O===void 0,z.__autoAllocateDepthBuffer||Fe.has("WEBGL_multisampled_render_to_texture")===!0&&(console.warn("THREE.WebGLRenderer: Render-to-texture extension was disabled because an external texture was provided"),z.__useRenderToTexture=!1)},this.setRenderTargetFramebuffer=function(v,L){const O=ge.get(v);O.__webglFramebuffer=L,O.__useDefaultFramebuffer=L===void 0};const Ul=R.createFramebuffer();this.setRenderTarget=function(v,L=0,O=0){I=v,A=L,P=O;let z=!0,U=null,j=!1,re=!1;if(v){const pe=ge.get(v);if(pe.__useDefaultFramebuffer!==void 0)xe.bindFramebuffer(R.FRAMEBUFFER,null),z=!1;else if(pe.__webglFramebuffer===void 0)y.setupRenderTarget(v);else if(pe.__hasExternalTextures)y.rebindTextures(v,ge.get(v.texture).__webglTexture,ge.get(v.depthTexture).__webglTexture);else if(v.depthBuffer){const Me=v.depthTexture;if(pe.__boundDepthTexture!==Me){if(Me!==null&&ge.has(Me)&&(v.width!==Me.image.width||v.height!==Me.image.height))throw new Error("WebGLRenderTarget: Attached DepthTexture is initialized to the incorrect size.");y.setupDepthRenderbuffer(v)}}const Ae=v.texture;(Ae.isData3DTexture||Ae.isDataArrayTexture||Ae.isCompressedArrayTexture)&&(re=!0);const we=ge.get(v).__webglFramebuffer;v.isWebGLCubeRenderTarget?(Array.isArray(we[L])?U=we[L][O]:U=we[L],j=!0):v.samples>0&&y.useMultisampledRTT(v)===!1?U=ge.get(v).__webglMultisampledFramebuffer:Array.isArray(we)?U=we[O]:U=we,b.copy(v.viewport),W.copy(v.scissor),N=v.scissorTest}else b.copy(ve).multiplyScalar(H).floor(),W.copy(Le).multiplyScalar(H).floor(),N=je;if(O!==0&&(U=Ul),xe.bindFramebuffer(R.FRAMEBUFFER,U)&&z&&xe.drawBuffers(v,U),xe.viewport(b),xe.scissor(W),xe.setScissorTest(N),j){const pe=ge.get(v.texture);R.framebufferTexture2D(R.FRAMEBUFFER,R.COLOR_ATTACHMENT0,R.TEXTURE_CUBE_MAP_POSITIVE_X+L,pe.__webglTexture,O)}else if(re){const pe=ge.get(v.texture),Ae=L;R.framebufferTextureLayer(R.FRAMEBUFFER,R.COLOR_ATTACHMENT0,pe.__webglTexture,O,Ae)}else if(v!==null&&O!==0){const pe=ge.get(v.texture);R.framebufferTexture2D(R.FRAMEBUFFER,R.COLOR_ATTACHMENT0,R.TEXTURE_2D,pe.__webglTexture,O)}S=-1},this.readRenderTargetPixels=function(v,L,O,z,U,j,re){if(!(v&&v.isWebGLRenderTarget)){console.error("THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not THREE.WebGLRenderTarget.");return}let ue=ge.get(v).__webglFramebuffer;if(v.isWebGLCubeRenderTarget&&re!==void 0&&(ue=ue[re]),ue){xe.bindFramebuffer(R.FRAMEBUFFER,ue);try{const pe=v.texture,Ae=pe.format,we=pe.type;if(!Oe.textureFormatReadable(Ae)){console.error("THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not in RGBA or implementation defined format.");return}if(!Oe.textureTypeReadable(we)){console.error("THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not in UnsignedByteType or implementation defined type.");return}L>=0&&L<=v.width-z&&O>=0&&O<=v.height-U&&R.readPixels(L,O,z,U,Pe.convert(Ae),Pe.convert(we),j)}finally{const pe=I!==null?ge.get(I).__webglFramebuffer:null;xe.bindFramebuffer(R.FRAMEBUFFER,pe)}}},this.readRenderTargetPixelsAsync=async function(v,L,O,z,U,j,re){if(!(v&&v.isWebGLRenderTarget))throw new Error("THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not THREE.WebGLRenderTarget.");let ue=ge.get(v).__webglFramebuffer;if(v.isWebGLCubeRenderTarget&&re!==void 0&&(ue=ue[re]),ue){const pe=v.texture,Ae=pe.format,we=pe.type;if(!Oe.textureFormatReadable(Ae))throw new Error("THREE.WebGLRenderer.readRenderTargetPixelsAsync: renderTarget is not in RGBA or implementation defined format.");if(!Oe.textureTypeReadable(we))throw new Error("THREE.WebGLRenderer.readRenderTargetPixelsAsync: renderTarget is not in UnsignedByteType or implementation defined type.");if(L>=0&&L<=v.width-z&&O>=0&&O<=v.height-U){xe.bindFramebuffer(R.FRAMEBUFFER,ue);const Me=R.createBuffer();R.bindBuffer(R.PIXEL_PACK_BUFFER,Me),R.bufferData(R.PIXEL_PACK_BUFFER,j.byteLength,R.STREAM_READ),R.readPixels(L,O,z,U,Pe.convert(Ae),Pe.convert(we),0);const Ve=I!==null?ge.get(I).__webglFramebuffer:null;xe.bindFramebuffer(R.FRAMEBUFFER,Ve);const Ye=R.fenceSync(R.SYNC_GPU_COMMANDS_COMPLETE,0);return R.flush(),await xh(R,Ye,4),R.bindBuffer(R.PIXEL_PACK_BUFFER,Me),R.getBufferSubData(R.PIXEL_PACK_BUFFER,0,j),R.deleteBuffer(Me),R.deleteSync(Ye),j}else throw new Error("THREE.WebGLRenderer.readRenderTargetPixelsAsync: requested read bounds are out of range.")}},this.copyFramebufferToTexture=function(v,L=null,O=0){v.isTexture!==!0&&(oi("WebGLRenderer: copyFramebufferToTexture function signature has changed."),L=arguments[0]||null,v=arguments[1]);const z=Math.pow(2,-O),U=Math.floor(v.image.width*z),j=Math.floor(v.image.height*z),re=L!==null?L.x:0,ue=L!==null?L.y:0;y.setTexture2D(v,0),R.copyTexSubImage2D(R.TEXTURE_2D,O,0,0,re,ue,U,j),xe.unbindTexture()};const Il=R.createFramebuffer(),Nl=R.createFramebuffer();this.copyTextureToTexture=function(v,L,O=null,z=null,U=0,j=null){v.isTexture!==!0&&(oi("WebGLRenderer: copyTextureToTexture function signature has changed."),z=arguments[0]||null,v=arguments[1],L=arguments[2],j=arguments[3]||0,O=null),j===null&&(U!==0?(oi("WebGLRenderer: copyTextureToTexture function signature has changed to support src and dst mipmap levels."),j=U,U=0):j=0);let re,ue,pe,Ae,we,Me,Ve,Ye,ot;const it=v.isCompressedTexture?v.mipmaps[j]:v.image;if(O!==null)re=O.max.x-O.min.x,ue=O.max.y-O.min.y,pe=O.isBox3?O.max.z-O.min.z:1,Ae=O.min.x,we=O.min.y,Me=O.isBox3?O.min.z:0;else{const Pt=Math.pow(2,-U);re=Math.floor(it.width*Pt),ue=Math.floor(it.height*Pt),v.isDataArrayTexture?pe=it.depth:v.isData3DTexture?pe=Math.floor(it.depth*Pt):pe=1,Ae=0,we=0,Me=0}z!==null?(Ve=z.x,Ye=z.y,ot=z.z):(Ve=0,Ye=0,ot=0);const Ge=Pe.convert(L.format),Se=Pe.convert(L.type);let dt;L.isData3DTexture?(y.setTexture3D(L,0),dt=R.TEXTURE_3D):L.isDataArrayTexture||L.isCompressedArrayTexture?(y.setTexture2DArray(L,0),dt=R.TEXTURE_2D_ARRAY):(y.setTexture2D(L,0),dt=R.TEXTURE_2D),R.pixelStorei(R.UNPACK_FLIP_Y_WEBGL,L.flipY),R.pixelStorei(R.UNPACK_PREMULTIPLY_ALPHA_WEBGL,L.premultiplyAlpha),R.pixelStorei(R.UNPACK_ALIGNMENT,L.unpackAlignment);const $e=R.getParameter(R.UNPACK_ROW_LENGTH),Ft=R.getParameter(R.UNPACK_IMAGE_HEIGHT),Xn=R.getParameter(R.UNPACK_SKIP_PIXELS),bt=R.getParameter(R.UNPACK_SKIP_ROWS),Ti=R.getParameter(R.UNPACK_SKIP_IMAGES);R.pixelStorei(R.UNPACK_ROW_LENGTH,it.width),R.pixelStorei(R.UNPACK_IMAGE_HEIGHT,it.height),R.pixelStorei(R.UNPACK_SKIP_PIXELS,Ae),R.pixelStorei(R.UNPACK_SKIP_ROWS,we),R.pixelStorei(R.UNPACK_SKIP_IMAGES,Me);const et=v.isDataArrayTexture||v.isData3DTexture,Ct=L.isDataArrayTexture||L.isData3DTexture;if(v.isDepthTexture){const Pt=ge.get(v),vt=ge.get(L),Et=ge.get(Pt.__renderTarget),Dr=ge.get(vt.__renderTarget);xe.bindFramebuffer(R.READ_FRAMEBUFFER,Et.__webglFramebuffer),xe.bindFramebuffer(R.DRAW_FRAMEBUFFER,Dr.__webglFramebuffer);for(let An=0;An<pe;An++)et&&(R.framebufferTextureLayer(R.READ_FRAMEBUFFER,R.COLOR_ATTACHMENT0,ge.get(v).__webglTexture,U,Me+An),R.framebufferTextureLayer(R.DRAW_FRAMEBUFFER,R.COLOR_ATTACHMENT0,ge.get(L).__webglTexture,j,ot+An)),R.blitFramebuffer(Ae,we,re,ue,Ve,Ye,re,ue,R.DEPTH_BUFFER_BIT,R.NEAREST);xe.bindFramebuffer(R.READ_FRAMEBUFFER,null),xe.bindFramebuffer(R.DRAW_FRAMEBUFFER,null)}else if(U!==0||v.isRenderTargetTexture||ge.has(v)){const Pt=ge.get(v),vt=ge.get(L);xe.bindFramebuffer(R.READ_FRAMEBUFFER,Il),xe.bindFramebuffer(R.DRAW_FRAMEBUFFER,Nl);for(let Et=0;Et<pe;Et++)et?R.framebufferTextureLayer(R.READ_FRAMEBUFFER,R.COLOR_ATTACHMENT0,Pt.__webglTexture,U,Me+Et):R.framebufferTexture2D(R.READ_FRAMEBUFFER,R.COLOR_ATTACHMENT0,R.TEXTURE_2D,Pt.__webglTexture,U),Ct?R.framebufferTextureLayer(R.DRAW_FRAMEBUFFER,R.COLOR_ATTACHMENT0,vt.__webglTexture,j,ot+Et):R.framebufferTexture2D(R.DRAW_FRAMEBUFFER,R.COLOR_ATTACHMENT0,R.TEXTURE_2D,vt.__webglTexture,j),U!==0?R.blitFramebuffer(Ae,we,re,ue,Ve,Ye,re,ue,R.COLOR_BUFFER_BIT,R.NEAREST):Ct?R.copyTexSubImage3D(dt,j,Ve,Ye,ot+Et,Ae,we,re,ue):R.copyTexSubImage2D(dt,j,Ve,Ye,Ae,we,re,ue);xe.bindFramebuffer(R.READ_FRAMEBUFFER,null),xe.bindFramebuffer(R.DRAW_FRAMEBUFFER,null)}else Ct?v.isDataTexture||v.isData3DTexture?R.texSubImage3D(dt,j,Ve,Ye,ot,re,ue,pe,Ge,Se,it.data):L.isCompressedArrayTexture?R.compressedTexSubImage3D(dt,j,Ve,Ye,ot,re,ue,pe,Ge,it.data):R.texSubImage3D(dt,j,Ve,Ye,ot,re,ue,pe,Ge,Se,it):v.isDataTexture?R.texSubImage2D(R.TEXTURE_2D,j,Ve,Ye,re,ue,Ge,Se,it.data):v.isCompressedTexture?R.compressedTexSubImage2D(R.TEXTURE_2D,j,Ve,Ye,it.width,it.height,Ge,it.data):R.texSubImage2D(R.TEXTURE_2D,j,Ve,Ye,re,ue,Ge,Se,it);R.pixelStorei(R.UNPACK_ROW_LENGTH,$e),R.pixelStorei(R.UNPACK_IMAGE_HEIGHT,Ft),R.pixelStorei(R.UNPACK_SKIP_PIXELS,Xn),R.pixelStorei(R.UNPACK_SKIP_ROWS,bt),R.pixelStorei(R.UNPACK_SKIP_IMAGES,Ti),j===0&&L.generateMipmaps&&R.generateMipmap(dt),xe.unbindTexture()},this.copyTextureToTexture3D=function(v,L,O=null,z=null,U=0){return v.isTexture!==!0&&(oi("WebGLRenderer: copyTextureToTexture3D function signature has changed."),O=arguments[0]||null,z=arguments[1]||null,v=arguments[2],L=arguments[3],U=arguments[4]||0),oi('WebGLRenderer: copyTextureToTexture3D function has been deprecated. Use "copyTextureToTexture" instead.'),this.copyTextureToTexture(v,L,O,z,U)},this.initRenderTarget=function(v){ge.get(v).__webglFramebuffer===void 0&&y.setupRenderTarget(v)},this.initTexture=function(v){v.isCubeTexture?y.setTextureCube(v,0):v.isData3DTexture?y.setTexture3D(v,0):v.isDataArrayTexture||v.isCompressedArrayTexture?y.setTexture2DArray(v,0):y.setTexture2D(v,0),xe.unbindTexture()},this.resetState=function(){A=0,P=0,I=null,xe.reset(),Je.reset()},typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("observe",{detail:this}))}get coordinateSystem(){return ln}get outputColorSpace(){return this._outputColorSpace}set outputColorSpace(e){this._outputColorSpace=e;const t=this.getContext();t.drawingBufferColorspace=ke._getDrawingBufferColorSpace(e),t.unpackColorSpace=ke._getUnpackColorSpace()}}const k_="/data/";async function W_(n){const{fileName:e,minCellLine:t}=n,i=await Ql(`${k_}${e}`,l=>({ccle_name:l["Cell line"],viability:+l.Viability,pert_dose:+l.Dose})),r=ec(i,l=>l.ccle_name).map(([l,h])=>({key:l,mean:uc(h,u=>u.viability)})).sort((l,h)=>Bo(l.mean,h.mean)),s=Object.fromEntries(r.map((l,h)=>[l.key,h])),a=[...new Set(i.map(l=>l.pert_dose))].sort((l,h)=>h-l),o=Object.fromEntries(a.map((l,h)=>[l,h])),c=$o(n.colorInterpolator).domain(n.colorDomain);return i.forEach(l=>{l.x=s[l.ccle_name],l.z=o[l.pert_dose],l.y=0,l.c=c(l.viability),l.rgba=new ze(l.c)}),i.filter(l=>l.x>t)}function X_(n,e,t,i){const{fov:r,cameraDistance:s,ySpread:a,ySpreadOffset:o}=e,c=pr(n,A=>A.z),l=pr(n,A=>A.x),h=gh.degToRad(r),u=2*Math.tan(h/2)*s,m=u*(t/i),g=m/l[1],M=u/Math.max(c[1],1),p=On().domain(l).range([0,m]),f=On().domain(c).range([0,u]),w=On().domain(c).range(e.planeOpacityRange),T=On().domain(pr(n,A=>A.viability)).range([a,-a+o]),E=m/2,C=u/2;return Vt({xScale:p,zScale:f,opacityScale:w,yScale:T,xOffset:E,zOffset:C,xExtent:l,zExtent:c,planeWidth:g,planeHeight:M,sceneWidth:m,visibleHeight:u})}function q_(n){const{fov:e,cameraDistance:t,cameraPosition:i,cameraLookAt:r,nearClip:s,farClip:a,directionalLightIntensity:o,ambientLightIntensity:c}=n,l=Wl({width:0,height:0,scene:null,camera:null,renderer:null,clock:null}),h=vn([]);let u=null,d=null,m=[];function g(C){d=C;const A=d.parentElement;l.width=A.clientWidth,l.height=A.clientHeight,l.scene=Vt(new Yh),l.camera=Vt(new Ut(e,l.width/l.height,s,a));const[P,I]=i;l.camera.position.set(P,I,t),l.camera.lookAt(...r),l.camera.updateProjectionMatrix();const S=Vt(new nf(16777215,o));S.position.set(5,10,5),S.castShadow=!0,S.shadow.mapSize.width=2048,S.shadow.mapSize.height=2048,S.shadow.camera.left=-30,S.shadow.camera.right=30,S.shadow.camera.top=30,S.shadow.camera.bottom=-30,S.shadow.camera.near=.1,S.shadow.camera.far=60,S.shadow.radius=8,S.shadow.blurSamples=25,l.scene.add(S);const x=Vt(new rf(16777215,c));l.scene.add(x),m=[S,x],l.renderer=Vt(new G_({canvas:d,antialias:!0})),l.renderer.setSize(l.width,l.height,!1),l.renderer.setClearColor(16777215,0),l.renderer.setPixelRatio(window.devicePixelRatio),l.renderer.shadowMap.enabled=!0,l.renderer.shadowMap.type=$t,l.clock=Vt(new af)}function M(C){return h.value.push(C),()=>{h.value=h.value.filter(A=>A!==C)}}function p(){if(u)return;const C=()=>{const A=l.clock.getElapsedTime();h.value.forEach(P=>P(A)),l.renderer.render(l.scene,l.camera),u=requestAnimationFrame(C)};u=requestAnimationFrame(C)}function f(){u&&(cancelAnimationFrame(u),u=null)}function w(){l.renderer.render(l.scene,l.camera)}function T(){if(!d||!l.renderer)return null;const C=d.parentElement;return l.width=C.clientWidth,l.height=C.clientHeight,l.camera.aspect=l.width/l.height,l.camera.updateProjectionMatrix(),l.renderer.setSize(l.width,l.height,!1),E(),{width:l.width,height:l.height}}function E(){const C=new Set(m);C.add(l.camera),l.scene.children.filter(A=>!C.has(A)).forEach(A=>{l.scene.remove(A),A.geometry&&A.geometry.dispose(),A.material&&A.material.dispose()}),h.value=[]}return{state:l,init:g,onAnimate:M,startAnimation:p,stopAnimation:f,render:w,resize:T,clearMeshes:E}}function wl(n,e={}){const t={...du,...e},i=q_(t),r=vn(!1),s=vn([]),a=vn(null);let o=null,c=null;function l(){a.value=X_(s.value,t,i.state.width,i.state.height)}return js(async()=>{const h=n.value;i.init(h),s.value=await W_(t),l(),r.value=!0,await new Promise(u=>requestAnimationFrame(u)),i.render(),i.startAnimation(),o=new ResizeObserver(()=>{clearTimeout(c),c=setTimeout(async()=>{r.value=!1,i.resize(),l(),await Xl(),r.value=!0},100)}),requestAnimationFrame(()=>{o.observe(h.parentElement)})}),Js(()=>{i.stopAnimation(),o&&o.disconnect(),clearTimeout(c)}),{config:t,scene:i,ready:r,heatmapData:s,scales:a}}const Y_={__name:"SphereLayer",props:{scene:{type:Object,required:!0},data:{type:Array,required:!0},scales:{type:Object,required:!0},config:{type:Object,required:!0},onAnimate:{type:Function,required:!0}},setup(n){const e=n,t=vn([]);let i=null;js(()=>{r(),i=e.onAnimate(s)}),Js(()=>{i&&i(),t.value.forEach(a=>{e.scene.remove(a),a.geometry.dispose(),a.material.dispose()})});function r(){const{xScale:a,zScale:o,xOffset:c,zOffset:l,planeHeight:h,yScale:u,zExtent:d}=e.scales,{sphereXStep:m,sphereZStep:g,sphereBaseRadiusMultiplier:M,sphereSizeScaleRange:p,sphereOpacityRange:f,sphereRadiusScaleRange:w,sphereFloatSpeedMin:T,sphereFloatSpeedRange:E,sphereFloatAmplitudeBase:C,sphereFloatAmplitudeRange:A}=e.config,P=a.range()[1]*M,I=e.data.filter(N=>N.x%m===0&&N.z%g===0),S=On().domain([d[0],d[1]]).range(p),x=On().domain([d[0],d[1]]).range(f),b=pr(e.data,N=>N.viability),W=Yo().exponent(1).domain(b).range(w);I.forEach(N=>{const k=S(N.z),Z=.8+Math.random()*.4,G=P*k*W(N.viability)*Z,J=Vt(new ma(G,24,24)),H=Vt(new Kh({color:N.rgba,transparent:!0,opacity:x(N.z),roughness:0,metalness:0})),Q=Vt(new Xt(J,H)),ce=Vt(new B(a(N.x)-c,u(N.viability)+G*.2,o(N.z)-l));Q.castShadow=!0,Q.position.copy(ce),Q.userData.basePosition=ce,Q.userData.floatPhase=Math.random()*Math.PI*2,Q.userData.floatSpeed=T+Math.random()*E,Q.userData.floatAmplitude=h*(C+Math.random()*A)*k,e.scene.add(Q),t.value.push(Q)})}function s(a){t.value.forEach(o=>{const{basePosition:c,floatPhase:l,floatSpeed:h,floatAmplitude:u}=o.userData;o.position.y=c.y+Math.sin(a*h+l)*u})}return()=>{}}},Rl={__name:"ViabilitySpheres",props:{sceneConfig:{type:Object,default:()=>({})}},setup(n){const e=n,t=vn(null),{config:i,scene:r,ready:s,heatmapData:a,scales:o}=wl(t,e.sceneConfig);return(c,l)=>(St(),Sn(Li,null,[ct("canvas",{ref_key:"canvasEl",ref:t,style:{position:"absolute",width:"100%",height:"100%"}},null,512),Gt(s)?(St(),Hn(Y_,{key:0,scene:Gt(r).state.scene,data:Gt(a),scales:Gt(o),config:Gt(i),"on-animate":Gt(r).onAnimate},null,8,["scene","data","scales","config","on-animate"])):Io("",!0)],64))}},$_={__name:"PlaneLayer",props:{scene:{type:Object,required:!0},data:{type:Array,required:!0},scales:{type:Object,required:!0},config:{type:Object,required:!0}},setup(n){const e=n,t=vn([]);return js(()=>{const{xScale:i,zScale:r,opacityScale:s,xOffset:a,zOffset:o,planeWidth:c,planeHeight:l}=e.scales,{planeZoom:h,planeWidthMultiplier:u,planeYPosition:d}=e.config;e.data.forEach(m=>{const g=new Vi(c*u*h,l*h),M=new jh({color:m.rgba,side:Kt,opacity:s(m.z),transparent:!0,depthWrite:!1}),p=new Xt(g,M);p.receiveShadow=!0,p.rotation.x=-Math.PI/2,p.position.set((i(m.x)-a)*h,d,(r(m.z)-o)*h),e.scene.add(p),t.value.push(p)})}),Js(()=>{t.value.forEach(i=>{e.scene.remove(i),i.geometry.dispose(),i.material.dispose()})}),()=>{}}},Cl={__name:"ViabilityHeatmap",props:{sceneConfig:{type:Object,default:()=>({})}},setup(n){const e=n,t=vn(null),{config:i,scene:r,ready:s,heatmapData:a,scales:o}=wl(t,e.sceneConfig);return(c,l)=>(St(),Sn(Li,null,[ct("canvas",{ref_key:"canvasEl",ref:t,style:{position:"absolute",width:"100%",height:"100%"}},null,512),Gt(s)?(St(),Hn($_,{key:0,scene:Gt(r).state.scene,data:Gt(a),scales:Gt(o),config:Gt(i)},null,8,["scene","data","scales","config"])):Io("",!0)],64))}},Z_={components:{SvgIcon:Uo,ViabilityHeatmap:Cl,ViabilitySpheres:Rl},data(){return{resizeCounter:0,ourImpactCards:[{title:"150+",subtitle:"Academic and industry partners",icon:{path:zl,color:"white",backgroundColor:"var(--v-red-accent-2)",size:54,borderRadius:"50%"}},{title:"7,000+",subtitle:"Compounds screened in over 500 cell lines",icon:{path:Hl,color:"white",backgroundColor:"var(--v-secondary-accent-4)",size:54,borderRadius:"50%"}},{title:"40+",subtitle:"Publications in high-impact journals",icon:{path:Vl,color:"white",backgroundColor:"var(--v-teal-accent-4)",size:54,borderRadius:"50%"}}],testimonialCards:[{quote:"I would encourage anyone in the oncology drug development space to take advantage of... the seamless integration of the generated drug-sensitivity data (900+ cell lines) with the Broad’s DepMap multi-omic annotation.",author:"Florian Muller",company:"Head of Chemistry<br>Lindonlight Collective"},{quote:"The true value of PRISM lies in its ability to generate high-throughput data incredibly cost-effectively. The user-friendly, auto-generated reports with built-in analytics supply invaluable insights, streamlining our research process.",author:"Discovery Oncology Scientist",company:"Fortune 500<br>Pharmaceutical Company"}]}},created(){window.addEventListener("resize",this.debounce(this.onWindowResize))},destroyed(){window.removeEventListener("resize",this.onWindowResize)},computed:{imgPath(){return"/images/home/"},mobile(){return this.$vuetify.display.mobile}},methods:{debounce(n){var e;return function(t){e&&clearTimeout(e),e=setTimeout(n,100,t)}},onWindowResize(){this.resizeCounter++}},watch:{}},K_={class:"hero-section"},j_={class:"hero-heatmap"};function J_(n,e,t,i,r,s){const a=Cl,o=Rl,c=Zl,l=fu,h=su,u=Yl,d=Qc,m=ql,g=Zc,M=Fl;return St(),Hn(M,{class:"mt-0 pt-0"},{default:Xe(()=>[ct("section",K_,[ct("div",j_,[Ue(a),Ue(o,{"scene-config":{colorInterpolator:n.d3.interpolateCool,colorDomain:[0,1],cameraPosition:[2,8,25],cameraLookAt:[0,4,0],fov:35}},null,8,["scene-config"])]),e[0]||(e[0]=ct("div",{class:"hero-overlay text-center"},[ct("h1",{class:"text-hero text-xl mb-12 pb-4"},"Pioneering large-scale, cancer therapeutic mapping"),ct("h2",{class:"text-hero text-h3"},"Powerful insights. Rapid turnaround. Innovative technology. Systematic analysis. Mission driven.")],-1))]),Ue(c,null,{default:Xe(()=>e[1]||(e[1]=[ct("p",{class:"text-h3 text-center"},"Our lab partners with researchers to reveal clinically important differences in drug behavior by screening over 900 cancer cell lines and correlating the viability results with baseline and functional genomic features ",-1)])),_:1}),Ue(c,null,{default:Xe(()=>e[2]||(e[2]=[ct("p",{class:"text-body-1"},[Ht(" Cancer cell line models remain essential in drug development, providing a controlled system to assess potency and confirm on-target engagement. At a larger scale using PRISM, these models provide power to "),ct("span",{class:"text-emphasize"},"understand heterogeneity"),Ht(" in drug response among cell lines harboring the targeted alteration(s), assess "),ct("span",{class:"text-emphasize"},"selectivity relative to those without target alterations, and investigate potential biomarkers associated with these responses"),Ht(". ")],-1)])),_:1}),Ue(l),Ue(h),Ue(c,{class:"my-12"},{default:Xe(()=>[Ue(u,null,{default:Xe(()=>e[3]||(e[3]=[Ht("Impact")])),_:1}),Ue(d,null,{default:Xe(()=>e[4]||(e[4]=[Ht("Dedicated to advancing oncology research")])),_:1}),e[5]||(e[5]=ct("p",{class:"text-body-1"},"Working with pharmaceutical and biotech companies and academics to improve the outcome for cancer patients worldwide. ",-1)),Ue(Ui,{class:"mt-12"},{default:Xe(()=>[(St(!0),Sn(Li,null,os(r.ourImpactCards,(p,f)=>(St(),Hn(Gn,{key:p.title,cols:"12",xs:"12",sm:"4",md:"4",lg:"4",xl:"4"},{default:Xe(()=>[Ue(m,{index:f,title:p.title,subtitle:p.subtitle,icon:p.icon},null,8,["index","title","subtitle","icon"])]),_:2},1024))),128))]),_:1})]),_:1}),Ue(c,{class:"my-12"},{default:Xe(()=>[Ue(u,null,{default:Xe(()=>e[6]||(e[6]=[Ht("Testimonials")])),_:1}),Ue(Ui,{class:"mt-6 mb-6"},{default:Xe(()=>[(St(!0),Sn(Li,null,os(r.testimonialCards,(p,f)=>(St(),Hn(Gn,{key:f,cols:"12",xs:"12",sm:"6",md:"6",lg:"6",xl:"6"},{default:Xe(()=>[Ue(g,{index:f,card:p},null,8,["index","card"])]),_:2},1024))),128))]),_:1})]),_:1})]),_:1})}const xg=Fi(Z_,[["render",J_],["__scopeId","data-v-80f52fab"]]);export{xg as default};
