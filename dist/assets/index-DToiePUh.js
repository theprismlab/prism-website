import{_ as Kc}from"./Page-B5HPyZBL.js";import{S as Go,m as jc,a as Jc,b as Qc,c as tl,d as el}from"./mdi-BJyGi8f9.js";import{_ as Hi,a0 as nl,o as pe,v as En,x as qt,b as Nt,y as de,a as Xe,t as Gn,c as en,a4 as il,U as br,a1 as da,r as dn,N as qn,a5 as re,O as ko,z as pa}from"./index-DD5ddf9a.js";import{V as rs,a as as}from"./VCard-rlRSqs1G.js";import{_ as rl}from"./StatCard-550YHVgo.js";import{_ as al}from"./SectionOverline-DZIRd3FH.js";import{_ as Wo}from"./ContainerMd-C_6yQnA1.js";import{V as Oi,a as kn}from"./VRow-BfcqHFb6.js";import{V as Xo}from"./VImg-EX7jfwAg.js";import{V as sl}from"./VBtn-BLb_2Ra5.js";import{V as qo}from"./VIcon-BArFI9kz.js";import{_ as ol}from"./ContainerSm-BupJ95nR.js";import{c as cl,i as ma,a as Ds,b as Ls,d as ll,r as ul}from"./transform-Dj0JbBrM.js";import{c as hl}from"./dsv-XhNTmijJ.js";import{g as fl}from"./group-C6_R01-c.js";import"./VAvatar-B6_yHUVX.js";import"./color-DiZvvCfR.js";import"./rounded-BH9iDFNp.js";import"./index-D1c-p6dA.js";import"./group-CisPLWru.js";function vr(n,t){return n==null||t==null?NaN:n<t?-1:n>t?1:n>=t?0:NaN}function Yo(n,t){return n==null||t==null?NaN:t<n?-1:t>n?1:t>=n?0:NaN}function $o(n){let t,e,i;n.length!==2?(t=vr,e=(s,c)=>vr(n(s),c),i=(s,c)=>n(s)-c):(t=n===vr||n===Yo?n:dl,e=n,i=n);function r(s,c,l=0,h=s.length){if(l<h){if(t(c,c)!==0)return h;do{const u=l+h>>>1;e(s[u],c)<0?l=u+1:h=u}while(l<h)}return l}function a(s,c,l=0,h=s.length){if(l<h){if(t(c,c)!==0)return h;do{const u=l+h>>>1;e(s[u],c)<=0?l=u+1:h=u}while(l<h)}return l}function o(s,c,l=0,h=s.length){const u=r(s,c,l,h-1);return u>l&&i(s[u-1],c)>-i(s[u],c)?u-1:u}return{left:r,center:o,right:a}}function dl(){return 0}function pl(n){return n===null?NaN:+n}const ml=$o(vr),_l=ml.right;$o(pl).center;function ln(n,t){let e,i;if(t===void 0)for(const r of n)r!=null&&(e===void 0?r>=r&&(e=i=r):(e>r&&(e=r),i<r&&(i=r)));else{let r=-1;for(let a of n)(a=t(a,++r,n))!=null&&(e===void 0?a>=a&&(e=i=a):(e>a&&(e=a),i<a&&(i=a)))}return[e,i]}const gl=Math.sqrt(50),vl=Math.sqrt(10),xl=Math.sqrt(2);function Ar(n,t,e){const i=(t-n)/Math.max(0,e),r=Math.floor(Math.log10(i)),a=i/Math.pow(10,r),o=a>=gl?10:a>=vl?5:a>=xl?2:1;let s,c,l;return r<0?(l=Math.pow(10,-r)/o,s=Math.round(n*l),c=Math.round(t*l),s/l<n&&++s,c/l>t&&--c,l=-l):(l=Math.pow(10,r)*o,s=Math.round(n/l),c=Math.round(t/l),s*l<n&&++s,c*l>t&&--c),c<s&&.5<=e&&e<2?Ar(n,t,e*2):[s,c,l]}function Ml(n,t,e){if(t=+t,n=+n,e=+e,!(e>0))return[];if(n===t)return[n];const i=t<n,[r,a,o]=i?Ar(t,n,e):Ar(n,t,e);if(!(a>=r))return[];const s=a-r+1,c=new Array(s);if(i)if(o<0)for(let l=0;l<s;++l)c[l]=(a-l)/-o;else for(let l=0;l<s;++l)c[l]=(a-l)*o;else if(o<0)for(let l=0;l<s;++l)c[l]=(r+l)/-o;else for(let l=0;l<s;++l)c[l]=(r+l)*o;return c}function _a(n,t,e){return t=+t,n=+n,e=+e,Ar(n,t,e)[2]}function Sl(n,t,e){t=+t,n=+n,e=+e;const i=t<n,r=i?_a(t,n,e):_a(n,t,e);return(i?-1:1)*(r<0?1/-r:r)}function El(n,t){let e=0,i=0;if(t===void 0)for(let r of n)r!=null&&(r=+r)>=r&&(++e,i+=r);else{let r=-1;for(let a of n)(a=t(a,++r,n))!=null&&(a=+a)>=a&&(++e,i+=a)}if(e)return i/e}function yl(n,t){t||(t=[]);var e=n?Math.min(t.length,n.length):0,i=t.slice(),r;return function(a){for(r=0;r<e;++r)i[r]=n[r]*(1-a)+t[r]*a;return i}}function Tl(n){return ArrayBuffer.isView(n)&&!(n instanceof DataView)}function bl(n,t){var e=t?t.length:0,i=n?Math.min(e,n.length):0,r=new Array(i),a=new Array(e),o;for(o=0;o<i;++o)r[o]=Lr(n[o],t[o]);for(;o<e;++o)a[o]=t[o];return function(s){for(o=0;o<i;++o)a[o]=r[o](s);return a}}function Al(n,t){var e=new Date;return n=+n,t=+t,function(i){return e.setTime(n*(1-i)+t*i),e}}function wl(n,t){var e={},i={},r;(n===null||typeof n!="object")&&(n={}),(t===null||typeof t!="object")&&(t={});for(r in t)r in n?e[r]=Lr(n[r],t[r]):i[r]=t[r];return function(a){for(r in e)i[r]=e[r](a);return i}}function Lr(n,t){var e=typeof t,i;return t==null||e==="boolean"?cl(t):(e==="number"?ma:e==="string"?(i=Ds(t))?(t=i,Ls):ll:t instanceof Ds?Ls:t instanceof Date?Al:Tl(t)?yl:Array.isArray(t)?bl:typeof t.valueOf!="function"&&typeof t.toString!="function"||isNaN(t)?wl:ma)(n,t)}function Zo(n,t){return n=+n,t=+t,function(e){return Math.round(n*(1-e)+t*e)}}function Rl(n){return Math.abs(n=Math.round(n))>=1e21?n.toLocaleString("en").replace(/,/g,""):n.toString(10)}function wr(n,t){if((e=(n=t?n.toExponential(t-1):n.toExponential()).indexOf("e"))<0)return null;var e,i=n.slice(0,e);return[i.length>1?i[0]+i.slice(2):i,+n.slice(e+1)]}function pi(n){return n=wr(Math.abs(n)),n?n[1]:NaN}function Cl(n,t){return function(e,i){for(var r=e.length,a=[],o=0,s=n[0],c=0;r>0&&s>0&&(c+s+1>i&&(s=Math.max(1,i-c)),a.push(e.substring(r-=s,r+s)),!((c+=s+1)>i));)s=n[o=(o+1)%n.length];return a.reverse().join(t)}}function Pl(n){return function(t){return t.replace(/[0-9]/g,function(e){return n[+e]})}}var Dl=/^(?:(.)?([<>=^]))?([+\-( ])?([$#])?(0)?(\d+)?(,)?(\.\d+)?(~)?([a-z%])?$/i;function Rr(n){if(!(t=Dl.exec(n)))throw new Error("invalid format: "+n);var t;return new ss({fill:t[1],align:t[2],sign:t[3],symbol:t[4],zero:t[5],width:t[6],comma:t[7],precision:t[8]&&t[8].slice(1),trim:t[9],type:t[10]})}Rr.prototype=ss.prototype;function ss(n){this.fill=n.fill===void 0?" ":n.fill+"",this.align=n.align===void 0?">":n.align+"",this.sign=n.sign===void 0?"-":n.sign+"",this.symbol=n.symbol===void 0?"":n.symbol+"",this.zero=!!n.zero,this.width=n.width===void 0?void 0:+n.width,this.comma=!!n.comma,this.precision=n.precision===void 0?void 0:+n.precision,this.trim=!!n.trim,this.type=n.type===void 0?"":n.type+""}ss.prototype.toString=function(){return this.fill+this.align+this.sign+this.symbol+(this.zero?"0":"")+(this.width===void 0?"":Math.max(1,this.width|0))+(this.comma?",":"")+(this.precision===void 0?"":"."+Math.max(0,this.precision|0))+(this.trim?"~":"")+this.type};function Ll(n){t:for(var t=n.length,e=1,i=-1,r;e<t;++e)switch(n[e]){case".":i=r=e;break;case"0":i===0&&(i=e),r=e;break;default:if(!+n[e])break t;i>0&&(i=0);break}return i>0?n.slice(0,i)+n.slice(r+1):n}var Ko;function Il(n,t){var e=wr(n,t);if(!e)return n+"";var i=e[0],r=e[1],a=r-(Ko=Math.max(-8,Math.min(8,Math.floor(r/3)))*3)+1,o=i.length;return a===o?i:a>o?i+new Array(a-o+1).join("0"):a>0?i.slice(0,a)+"."+i.slice(a):"0."+new Array(1-a).join("0")+wr(n,Math.max(0,t+a-1))[0]}function Is(n,t){var e=wr(n,t);if(!e)return n+"";var i=e[0],r=e[1];return r<0?"0."+new Array(-r).join("0")+i:i.length>r+1?i.slice(0,r+1)+"."+i.slice(r+1):i+new Array(r-i.length+2).join("0")}const Us={"%":(n,t)=>(n*100).toFixed(t),b:n=>Math.round(n).toString(2),c:n=>n+"",d:Rl,e:(n,t)=>n.toExponential(t),f:(n,t)=>n.toFixed(t),g:(n,t)=>n.toPrecision(t),o:n=>Math.round(n).toString(8),p:(n,t)=>Is(n*100,t),r:Is,s:Il,X:n=>Math.round(n).toString(16).toUpperCase(),x:n=>Math.round(n).toString(16)};function Ns(n){return n}var Fs=Array.prototype.map,Os=["y","z","a","f","p","n","µ","m","","k","M","G","T","P","E","Z","Y"];function Ul(n){var t=n.grouping===void 0||n.thousands===void 0?Ns:Cl(Fs.call(n.grouping,Number),n.thousands+""),e=n.currency===void 0?"":n.currency[0]+"",i=n.currency===void 0?"":n.currency[1]+"",r=n.decimal===void 0?".":n.decimal+"",a=n.numerals===void 0?Ns:Pl(Fs.call(n.numerals,String)),o=n.percent===void 0?"%":n.percent+"",s=n.minus===void 0?"−":n.minus+"",c=n.nan===void 0?"NaN":n.nan+"";function l(u){u=Rr(u);var d=u.fill,p=u.align,_=u.sign,v=u.symbol,m=u.zero,f=u.width,R=u.comma,y=u.precision,E=u.trim,C=u.type;C==="n"?(R=!0,C="g"):Us[C]||(y===void 0&&(y=12),E=!0,C="g"),(m||d==="0"&&p==="=")&&(m=!0,d="0",p="=");var b=v==="$"?e:v==="#"&&/[boxX]/.test(C)?"0"+C.toLowerCase():"",A=v==="$"?i:/[%p]/.test(C)?o:"",I=Us[C],S=/[defgprs%]/.test(C);y=y===void 0?6:/[gprs]/.test(C)?Math.max(1,Math.min(21,y)):Math.max(0,Math.min(20,y));function M(w){var V=b,F=A,W,K,k;if(C==="c")F=I(w)+F,w="";else{w=+w;var Z=w<0||1/w<0;if(w=isNaN(w)?c:I(Math.abs(w),y),E&&(w=Ll(w)),Z&&+w==0&&_!=="+"&&(Z=!1),V=(Z?_==="("?_:s:_==="-"||_==="("?"":_)+V,F=(C==="s"?Os[8+Ko/3]:"")+F+(Z&&_==="("?")":""),S){for(W=-1,K=w.length;++W<K;)if(k=w.charCodeAt(W),48>k||k>57){F=(k===46?r+w.slice(W+1):w.slice(W))+F,w=w.slice(0,W);break}}}R&&!m&&(w=t(w,1/0));var H=V.length+w.length+F.length,tt=H<f?new Array(f-H+1).join(d):"";switch(R&&m&&(w=t(tt+w,tt.length?f-F.length:1/0),tt=""),p){case"<":w=V+w+F+tt;break;case"=":w=V+tt+w+F;break;case"^":w=tt.slice(0,H=tt.length>>1)+V+w+F+tt.slice(H);break;default:w=tt+V+w+F;break}return a(w)}return M.toString=function(){return u+""},M}function h(u,d){var p=l((u=Rr(u),u.type="f",u)),_=Math.max(-8,Math.min(8,Math.floor(pi(d)/3)))*3,v=Math.pow(10,-_),m=Os[8+_/3];return function(f){return p(v*f)+m}}return{format:l,formatPrefix:h}}var $i,jo,Jo;Nl({thousands:",",grouping:[3],currency:["$",""]});function Nl(n){return $i=Ul(n),jo=$i.format,Jo=$i.formatPrefix,$i}function Fl(n){return Math.max(0,-pi(Math.abs(n)))}function Ol(n,t){return Math.max(0,Math.max(-8,Math.min(8,Math.floor(pi(t)/3)))*3-pi(Math.abs(n)))}function Bl(n,t){return n=Math.abs(n),t=Math.abs(t)-n,Math.max(0,pi(t)-pi(n))+1}function Qo(n,t){switch(arguments.length){case 0:break;case 1:this.range(n);break;default:this.range(t).domain(n);break}return this}function zl(n,t){switch(arguments.length){case 0:break;case 1:{typeof n=="function"?this.interpolator(n):this.range(n);break}default:{this.domain(n),typeof t=="function"?this.interpolator(t):this.range(t);break}}return this}function Hl(n){return function(){return n}}function Vl(n){return+n}var Bs=[0,1];function Oe(n){return n}function ga(n,t){return(t-=n=+n)?function(e){return(e-n)/t}:Hl(isNaN(t)?NaN:.5)}function Gl(n,t){var e;return n>t&&(e=n,n=t,t=e),function(i){return Math.max(n,Math.min(t,i))}}function kl(n,t,e){var i=n[0],r=n[1],a=t[0],o=t[1];return r<i?(i=ga(r,i),a=e(o,a)):(i=ga(i,r),a=e(a,o)),function(s){return a(i(s))}}function Wl(n,t,e){var i=Math.min(n.length,t.length)-1,r=new Array(i),a=new Array(i),o=-1;for(n[i]<n[0]&&(n=n.slice().reverse(),t=t.slice().reverse());++o<i;)r[o]=ga(n[o],n[o+1]),a[o]=e(t[o],t[o+1]);return function(s){var c=_l(n,s,1,i)-1;return a[c](r[c](s))}}function tc(n,t){return t.domain(n.domain()).range(n.range()).interpolate(n.interpolate()).clamp(n.clamp()).unknown(n.unknown())}function ec(){var n=Bs,t=Bs,e=Lr,i,r,a,o=Oe,s,c,l;function h(){var d=Math.min(n.length,t.length);return o!==Oe&&(o=Gl(n[0],n[d-1])),s=d>2?Wl:kl,c=l=null,u}function u(d){return d==null||isNaN(d=+d)?a:(c||(c=s(n.map(i),t,e)))(i(o(d)))}return u.invert=function(d){return o(r((l||(l=s(t,n.map(i),ma)))(d)))},u.domain=function(d){return arguments.length?(n=Array.from(d,Vl),h()):n.slice()},u.range=function(d){return arguments.length?(t=Array.from(d),h()):t.slice()},u.rangeRound=function(d){return t=Array.from(d),e=Zo,h()},u.clamp=function(d){return arguments.length?(o=d?!0:Oe,h()):o!==Oe},u.interpolate=function(d){return arguments.length?(e=d,h()):e},u.unknown=function(d){return arguments.length?(a=d,u):a},function(d,p){return i=d,r=p,h()}}function Xl(){return ec()(Oe,Oe)}function ql(n,t,e,i){var r=Sl(n,t,e),a;switch(i=Rr(i??",f"),i.type){case"s":{var o=Math.max(Math.abs(n),Math.abs(t));return i.precision==null&&!isNaN(a=Ol(r,o))&&(i.precision=a),Jo(i,o)}case"":case"e":case"g":case"p":case"r":{i.precision==null&&!isNaN(a=Bl(r,Math.max(Math.abs(n),Math.abs(t))))&&(i.precision=a-(i.type==="e"));break}case"f":case"%":{i.precision==null&&!isNaN(a=Fl(r))&&(i.precision=a-(i.type==="%")*2);break}}return jo(i)}function os(n){var t=n.domain;return n.ticks=function(e){var i=t();return Ml(i[0],i[i.length-1],e??10)},n.tickFormat=function(e,i){var r=t();return ql(r[0],r[r.length-1],e??10,i)},n.nice=function(e){e==null&&(e=10);var i=t(),r=0,a=i.length-1,o=i[r],s=i[a],c,l,h=10;for(s<o&&(l=o,o=s,s=l,l=r,r=a,a=l);h-- >0;){if(l=_a(o,s,e),l===c)return i[r]=o,i[a]=s,t(i);if(l>0)o=Math.floor(o/l)*l,s=Math.ceil(s/l)*l;else if(l<0)o=Math.ceil(o*l)/l,s=Math.floor(s*l)/l;else break;c=l}return n},n}function ye(){var n=Xl();return n.copy=function(){return tc(n,ye())},Qo.apply(n,arguments),os(n)}function zs(n){return function(t){return t<0?-Math.pow(-t,n):Math.pow(t,n)}}function Yl(n){return n<0?-Math.sqrt(-n):Math.sqrt(n)}function $l(n){return n<0?-n*n:n*n}function Zl(n){var t=n(Oe,Oe),e=1;function i(){return e===1?n(Oe,Oe):e===.5?n(Yl,$l):n(zs(e),zs(1/e))}return t.exponent=function(r){return arguments.length?(e=+r,i()):e},os(t)}function nc(){var n=Zl(ec());return n.copy=function(){return tc(n,nc()).exponent(n.exponent())},Qo.apply(n,arguments),n}function Kl(){var n=0,t=1,e,i,r,a,o=Oe,s=!1,c;function l(u){return u==null||isNaN(u=+u)?c:o(r===0?.5:(u=(a(u)-e)*r,s?Math.max(0,Math.min(1,u)):u))}l.domain=function(u){return arguments.length?([n,t]=u,e=a(n=+n),i=a(t=+t),r=e===i?0:1/(i-e),l):[n,t]},l.clamp=function(u){return arguments.length?(s=!!u,l):s},l.interpolator=function(u){return arguments.length?(o=u,l):o};function h(u){return function(d){var p,_;return arguments.length?([p,_]=d,o=u(p,_),l):[o(0),o(1)]}}return l.range=h(Lr),l.rangeRound=h(Zo),l.unknown=function(u){return arguments.length?(c=u,l):c},function(u){return a=u,e=u(n),i=u(t),r=e===i?0:1/(i-e),l}}function jl(n,t){return t.domain(n.domain()).interpolator(n.interpolator()).clamp(n.clamp()).unknown(n.unknown())}function cs(){var n=os(Kl()(Oe));return n.copy=function(){return jl(n,cs())},zl.apply(n,arguments)}function Jl(n){for(var t=n.length/6|0,e=new Array(t),i=0;i<t;)e[i]="#"+n.slice(i*6,++i*6);return e}const Ql=n=>ul(n[n.length-1]);var tu=new Array(3).concat("ffeda0feb24cf03b20","ffffb2fecc5cfd8d3ce31a1c","ffffb2fecc5cfd8d3cf03b20bd0026","ffffb2fed976feb24cfd8d3cf03b20bd0026","ffffb2fed976feb24cfd8d3cfc4e2ae31a1cb10026","ffffccffeda0fed976feb24cfd8d3cfc4e2ae31a1cb10026","ffffccffeda0fed976feb24cfd8d3cfc4e2ae31a1cbd0026800026").map(Jl);const eu=Ql(tu);function nu(n){return n=Math.max(0,Math.min(1,n)),"rgb("+Math.max(0,Math.min(255,Math.round(34.61+n*(1172.33-n*(10793.56-n*(33300.12-n*(38394.49-n*14825.05)))))))+", "+Math.max(0,Math.min(255,Math.round(23.31+n*(557.33+n*(1225.33-n*(3574.96-n*(1073.77+n*707.56)))))))+", "+Math.max(0,Math.min(255,Math.round(27.2+n*(3211.1-n*(15327.97-n*(27814-n*(22569.18-n*6838.66)))))))+")"}const iu={name:"TestimonialCards",components:{SvgIcon:Go},props:{index:{type:Number,required:!0,default:0},card:{type:Object,required:!0,default:()=>({})}},data(){return{mdiFormatQuoteOpenPath:Jc,mdiFormatQuoteClosePath:jc}},computed:{},mounted(){}},ru={class:"text-body-1 text-black"},au=["innerHTML"],su=["innerHTML"];function ou(n,t,e,i,r,a){const o=nl("svg-icon");return pe(),En(as,{class:"pa-6 px-10 fill-height justify-start mb-2",variant:"tonal",color:"secondary-lighten-3"},{default:qt(()=>[Nt(rs,null,{default:qt(()=>[de("p",ru,[Nt(o,{size:"34",type:"mdi",path:r.mdiFormatQuoteOpenPath,class:"text-secondary"},null,8,["path"]),Xe(" "+Gn(e.card.quote)+" ",1),Nt(o,{size:"34",type:"mdi",path:r.mdiFormatQuoteClosePath,class:"text-secondary",style:{float:"right"}},null,8,["path"])]),de("p",{class:"text-body-2 mb-0 font-weight-bold text-secondary-darken-2",innerHTML:e.card.author},null,8,au),de("p",{class:"text-body-2 mb-0 mt-0 text-grey-darken-1",innerHTML:e.card.company},null,8,su)]),_:1})]),_:1})}const cu=Hi(iu,[["render",ou],["__scopeId","data-v-65070435"]]),lu={name:"SectionTitle",props:{},data(){return{}},methods:{},watch:{}},uu={class:"text-h2 font-weight-bold section-title"};function hu(n,t,e,i,r,a){return pe(),en("h2",uu,[il(n.$slots,"default",{},void 0)])}const fu=Hi(lu,[["render",hu],["__scopeId","data-v-def9f74c"]]),du={name:"OurPortal",props:{},data(){return{overline:"Our Portal",title:"Explore and discover",body:"Securely browse and discover insights from your screening results with interactive visualizations.",button:{text:"PRISM portal",link:"https://theprismlab.org/portal/projects"},image:"macbook-portal-01.png"}},computed:{imgPath(){return"/images/"}},mounted(){}},pu={class:"background"},mu={class:"text-h3 font-weight-bold"},_u={class:"text-body-1"};function gu(n,t,e,i,r,a){const o=Wo;return pe(),en("div",pu,[Nt(o,{class:"py-8"},{default:qt(()=>[Nt(Oi,{class:"d-flex align-center justify-center"},{default:qt(()=>[Nt(kn,{cols:"11",xs:"11",sm:"5",md:"5",lg:"5"},{default:qt(()=>[Nt(Xo,{class:"align-end",src:`${a.imgPath}${r.image}`,width:"100%"},null,8,["src"])]),_:1}),Nt(kn,null,{default:qt(()=>[Nt(as,{variant:"transparent"},{default:qt(()=>[Nt(rs,null,{default:qt(()=>[de("h3",mu,Gn(r.title),1),de("p",_u,Gn(r.body),1),Nt(sl,{href:r.button.link,target:"_blank",color:"white",variant:"outlined",rounded:""},{default:qt(()=>[Xe(Gn(r.button.text)+" ",1),Nt(qo,{right:""},{default:qt(()=>t[0]||(t[0]=[Xe("mdi-chevron-right")])),_:1})]),_:1},8,["href"])]),_:1})]),_:1})]),_:1})]),_:1})]),_:1})])}const vu=Hi(du,[["render",gu],["__scopeId","data-v-e2ccc8d7"]]),xu={name:"MainVisual",data(){return{}},computed:{imgPath(){return"/images/"},cards(){return[{img:`${this.imgPath}main-11.png`,title:"900+ genomically diverse barcoded and pooled cell lines",description:"Hematopoietic and solid tumor, covering 80 cancer subtypes",action:{text:"Learn more",url:"/consortium-screens/cell-line-collection",target:"_self"}},{img:`${this.imgPath}main-12.png`,title:"150K+ unique baseline genetic and functional genomic features",description:"Features from the Dependency Map are correlated with the PRISM viability profile using univariate and multivariate predictive models",action:{text:"Learn more",url:"https://depmap.org/portal/",target:"_blank"}},{img:`${this.imgPath}main-13.png`,title:"Identify target and patient population of your drug",description:"Confirm hypothesis and establish biomarkers of sensitivity and resistance",action:{text:"Learn more",url:"/consortium-screens/data-analysis",target:"_self"}}]}},mounted(){}},Mu={class:"background py-12"},Su={class:"text-h5 text-black"},Eu={class:"text-body-2 mb-2"},yu=["href","target"];function Tu(n,t,e,i,r,a){const o=Wo;return pe(),en("div",Mu,[Nt(o,null,{default:qt(()=>[Nt(Oi,{justify:"space-evenly"},{default:qt(()=>[(pe(!0),en(br,null,da(a.cards,(s,c)=>(pe(),En(kn,{key:c,cols:"12",xs:"12",sm:"12",md:"4",lg:"4"},{default:qt(()=>[Nt(as,{class:"pa-4 fill-height",variant:"flat"},{default:qt(()=>[Nt(Oi,{"no-gutters":""},{default:qt(()=>[Nt(kn,{cols:"5",xs:"5",sm:"5",md:"12",lg:"12",xl:"12"},{default:qt(()=>[Nt(Xo,{style:{margin:"auto"},src:s.img,width:"100%","max-width":"250px"},null,8,["src"])]),_:2},1024),Nt(kn,null,{default:qt(()=>[Nt(rs,null,{default:qt(()=>[de("h4",Su,Gn(s.title),1),de("p",Eu,Gn(s.description),1),de("a",{class:"v-btn v-btn--size-default pa-0",href:s.action.url,target:s.action.target},[Xe(Gn(s.action.text)+" ",1),Nt(qo,{right:""},{default:qt(()=>t[0]||(t[0]=[Xe("mdi-chevron-right")])),_:1})],8,yu)]),_:2},1024)]),_:2},1024)]),_:2},1024)]),_:2},1024)]),_:2},1024))),128))]),_:1})]),_:1})])}const bu=Hi(xu,[["render",Tu],["__scopeId","data-v-780c6896"]]);/**
 * @license
 * Copyright 2010-2025 Three.js Authors
 * SPDX-License-Identifier: MIT
 */const ls="173",Au=0,Hs=1,wu=2,ic=1,Ru=2,We=3,bn=0,be=1,je=2,yn=0,hi=1,Vs=2,Gs=3,ks=4,Cu=5,Bn=100,Pu=101,Du=102,Lu=103,Iu=104,Uu=200,Nu=201,Fu=202,Ou=203,va=204,xa=205,Bu=206,zu=207,Hu=208,Vu=209,Gu=210,ku=211,Wu=212,Xu=213,qu=214,Ma=0,Sa=1,Ea=2,mi=3,ya=4,Ta=5,ba=6,Aa=7,us=0,Yu=1,$u=2,Tn=0,Zu=1,Ku=2,ju=3,Ju=4,Qu=5,th=6,eh=7,rc=300,_i=301,gi=302,wa=303,Ra=304,Ir=306,Ca=1e3,Hn=1001,Pa=1002,$e=1003,nh=1004,Zi=1005,Je=1006,Br=1007,Vn=1008,pn=1009,ac=1010,sc=1011,Bi=1012,hs=1013,Wn=1014,un=1015,Vi=1016,fs=1017,ds=1018,vi=1020,oc=35902,cc=1021,lc=1022,Ye=1023,uc=1024,hc=1025,fi=1026,xi=1027,fc=1028,ps=1029,dc=1030,ms=1031,_s=1033,xr=33776,Mr=33777,Sr=33778,Er=33779,Da=35840,La=35841,Ia=35842,Ua=35843,Na=36196,Fa=37492,Oa=37496,Ba=37808,za=37809,Ha=37810,Va=37811,Ga=37812,ka=37813,Wa=37814,Xa=37815,qa=37816,Ya=37817,$a=37818,Za=37819,Ka=37820,ja=37821,yr=36492,Ja=36494,Qa=36495,pc=36283,ts=36284,es=36285,ns=36286,ih=3200,rh=3201,gs=0,ah=1,Sn="",Fe="srgb",Mi="srgb-linear",Cr="linear",jt="srgb",$n=7680,Ws=519,sh=512,oh=513,ch=514,mc=515,lh=516,uh=517,hh=518,fh=519,Xs=35044,qs="300 es",hn=2e3,Pr=2001;class Ei{addEventListener(t,e){this._listeners===void 0&&(this._listeners={});const i=this._listeners;i[t]===void 0&&(i[t]=[]),i[t].indexOf(e)===-1&&i[t].push(e)}hasEventListener(t,e){const i=this._listeners;return i===void 0?!1:i[t]!==void 0&&i[t].indexOf(e)!==-1}removeEventListener(t,e){const i=this._listeners;if(i===void 0)return;const r=i[t];if(r!==void 0){const a=r.indexOf(e);a!==-1&&r.splice(a,1)}}dispatchEvent(t){const e=this._listeners;if(e===void 0)return;const i=e[t.type];if(i!==void 0){t.target=this;const r=i.slice(0);for(let a=0,o=r.length;a<o;a++)r[a].call(this,t);t.target=null}}}const ge=["00","01","02","03","04","05","06","07","08","09","0a","0b","0c","0d","0e","0f","10","11","12","13","14","15","16","17","18","19","1a","1b","1c","1d","1e","1f","20","21","22","23","24","25","26","27","28","29","2a","2b","2c","2d","2e","2f","30","31","32","33","34","35","36","37","38","39","3a","3b","3c","3d","3e","3f","40","41","42","43","44","45","46","47","48","49","4a","4b","4c","4d","4e","4f","50","51","52","53","54","55","56","57","58","59","5a","5b","5c","5d","5e","5f","60","61","62","63","64","65","66","67","68","69","6a","6b","6c","6d","6e","6f","70","71","72","73","74","75","76","77","78","79","7a","7b","7c","7d","7e","7f","80","81","82","83","84","85","86","87","88","89","8a","8b","8c","8d","8e","8f","90","91","92","93","94","95","96","97","98","99","9a","9b","9c","9d","9e","9f","a0","a1","a2","a3","a4","a5","a6","a7","a8","a9","aa","ab","ac","ad","ae","af","b0","b1","b2","b3","b4","b5","b6","b7","b8","b9","ba","bb","bc","bd","be","bf","c0","c1","c2","c3","c4","c5","c6","c7","c8","c9","ca","cb","cc","cd","ce","cf","d0","d1","d2","d3","d4","d5","d6","d7","d8","d9","da","db","dc","dd","de","df","e0","e1","e2","e3","e4","e5","e6","e7","e8","e9","ea","eb","ec","ed","ee","ef","f0","f1","f2","f3","f4","f5","f6","f7","f8","f9","fa","fb","fc","fd","fe","ff"];let Ys=1234567;const Ii=Math.PI/180,zi=180/Math.PI;function yi(){const n=Math.random()*4294967295|0,t=Math.random()*4294967295|0,e=Math.random()*4294967295|0,i=Math.random()*4294967295|0;return(ge[n&255]+ge[n>>8&255]+ge[n>>16&255]+ge[n>>24&255]+"-"+ge[t&255]+ge[t>>8&255]+"-"+ge[t>>16&15|64]+ge[t>>24&255]+"-"+ge[e&63|128]+ge[e>>8&255]+"-"+ge[e>>16&255]+ge[e>>24&255]+ge[i&255]+ge[i>>8&255]+ge[i>>16&255]+ge[i>>24&255]).toLowerCase()}function Ut(n,t,e){return Math.max(t,Math.min(e,n))}function vs(n,t){return(n%t+t)%t}function dh(n,t,e,i,r){return i+(n-t)*(r-i)/(e-t)}function ph(n,t,e){return n!==t?(e-n)/(t-n):0}function Ui(n,t,e){return(1-e)*n+e*t}function mh(n,t,e,i){return Ui(n,t,1-Math.exp(-e*i))}function _h(n,t=1){return t-Math.abs(vs(n,t*2)-t)}function gh(n,t,e){return n<=t?0:n>=e?1:(n=(n-t)/(e-t),n*n*(3-2*n))}function vh(n,t,e){return n<=t?0:n>=e?1:(n=(n-t)/(e-t),n*n*n*(n*(n*6-15)+10))}function xh(n,t){return n+Math.floor(Math.random()*(t-n+1))}function Mh(n,t){return n+Math.random()*(t-n)}function Sh(n){return n*(.5-Math.random())}function Eh(n){n!==void 0&&(Ys=n);let t=Ys+=1831565813;return t=Math.imul(t^t>>>15,t|1),t^=t+Math.imul(t^t>>>7,t|61),((t^t>>>14)>>>0)/4294967296}function yh(n){return n*Ii}function Th(n){return n*zi}function bh(n){return(n&n-1)===0&&n!==0}function Ah(n){return Math.pow(2,Math.ceil(Math.log(n)/Math.LN2))}function wh(n){return Math.pow(2,Math.floor(Math.log(n)/Math.LN2))}function Rh(n,t,e,i,r){const a=Math.cos,o=Math.sin,s=a(e/2),c=o(e/2),l=a((t+i)/2),h=o((t+i)/2),u=a((t-i)/2),d=o((t-i)/2),p=a((i-t)/2),_=o((i-t)/2);switch(r){case"XYX":n.set(s*h,c*u,c*d,s*l);break;case"YZY":n.set(c*d,s*h,c*u,s*l);break;case"ZXZ":n.set(c*u,c*d,s*h,s*l);break;case"XZX":n.set(s*h,c*_,c*p,s*l);break;case"YXY":n.set(c*p,s*h,c*_,s*l);break;case"ZYZ":n.set(c*_,c*p,s*h,s*l);break;default:console.warn("THREE.MathUtils: .setQuaternionFromProperEuler() encountered an unknown order: "+r)}}function ci(n,t){switch(t.constructor){case Float32Array:return n;case Uint32Array:return n/4294967295;case Uint16Array:return n/65535;case Uint8Array:return n/255;case Int32Array:return Math.max(n/2147483647,-1);case Int16Array:return Math.max(n/32767,-1);case Int8Array:return Math.max(n/127,-1);default:throw new Error("Invalid component type.")}}function Se(n,t){switch(t.constructor){case Float32Array:return n;case Uint32Array:return Math.round(n*4294967295);case Uint16Array:return Math.round(n*65535);case Uint8Array:return Math.round(n*255);case Int32Array:return Math.round(n*2147483647);case Int16Array:return Math.round(n*32767);case Int8Array:return Math.round(n*127);default:throw new Error("Invalid component type.")}}const xs={DEG2RAD:Ii,RAD2DEG:zi,generateUUID:yi,clamp:Ut,euclideanModulo:vs,mapLinear:dh,inverseLerp:ph,lerp:Ui,damp:mh,pingpong:_h,smoothstep:gh,smootherstep:vh,randInt:xh,randFloat:Mh,randFloatSpread:Sh,seededRandom:Eh,degToRad:yh,radToDeg:Th,isPowerOfTwo:bh,ceilPowerOfTwo:Ah,floorPowerOfTwo:wh,setQuaternionFromProperEuler:Rh,normalize:Se,denormalize:ci};class Yt{constructor(t=0,e=0){Yt.prototype.isVector2=!0,this.x=t,this.y=e}get width(){return this.x}set width(t){this.x=t}get height(){return this.y}set height(t){this.y=t}set(t,e){return this.x=t,this.y=e,this}setScalar(t){return this.x=t,this.y=t,this}setX(t){return this.x=t,this}setY(t){return this.y=t,this}setComponent(t,e){switch(t){case 0:this.x=e;break;case 1:this.y=e;break;default:throw new Error("index is out of range: "+t)}return this}getComponent(t){switch(t){case 0:return this.x;case 1:return this.y;default:throw new Error("index is out of range: "+t)}}clone(){return new this.constructor(this.x,this.y)}copy(t){return this.x=t.x,this.y=t.y,this}add(t){return this.x+=t.x,this.y+=t.y,this}addScalar(t){return this.x+=t,this.y+=t,this}addVectors(t,e){return this.x=t.x+e.x,this.y=t.y+e.y,this}addScaledVector(t,e){return this.x+=t.x*e,this.y+=t.y*e,this}sub(t){return this.x-=t.x,this.y-=t.y,this}subScalar(t){return this.x-=t,this.y-=t,this}subVectors(t,e){return this.x=t.x-e.x,this.y=t.y-e.y,this}multiply(t){return this.x*=t.x,this.y*=t.y,this}multiplyScalar(t){return this.x*=t,this.y*=t,this}divide(t){return this.x/=t.x,this.y/=t.y,this}divideScalar(t){return this.multiplyScalar(1/t)}applyMatrix3(t){const e=this.x,i=this.y,r=t.elements;return this.x=r[0]*e+r[3]*i+r[6],this.y=r[1]*e+r[4]*i+r[7],this}min(t){return this.x=Math.min(this.x,t.x),this.y=Math.min(this.y,t.y),this}max(t){return this.x=Math.max(this.x,t.x),this.y=Math.max(this.y,t.y),this}clamp(t,e){return this.x=Ut(this.x,t.x,e.x),this.y=Ut(this.y,t.y,e.y),this}clampScalar(t,e){return this.x=Ut(this.x,t,e),this.y=Ut(this.y,t,e),this}clampLength(t,e){const i=this.length();return this.divideScalar(i||1).multiplyScalar(Ut(i,t,e))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this}negate(){return this.x=-this.x,this.y=-this.y,this}dot(t){return this.x*t.x+this.y*t.y}cross(t){return this.x*t.y-this.y*t.x}lengthSq(){return this.x*this.x+this.y*this.y}length(){return Math.sqrt(this.x*this.x+this.y*this.y)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)}normalize(){return this.divideScalar(this.length()||1)}angle(){return Math.atan2(-this.y,-this.x)+Math.PI}angleTo(t){const e=Math.sqrt(this.lengthSq()*t.lengthSq());if(e===0)return Math.PI/2;const i=this.dot(t)/e;return Math.acos(Ut(i,-1,1))}distanceTo(t){return Math.sqrt(this.distanceToSquared(t))}distanceToSquared(t){const e=this.x-t.x,i=this.y-t.y;return e*e+i*i}manhattanDistanceTo(t){return Math.abs(this.x-t.x)+Math.abs(this.y-t.y)}setLength(t){return this.normalize().multiplyScalar(t)}lerp(t,e){return this.x+=(t.x-this.x)*e,this.y+=(t.y-this.y)*e,this}lerpVectors(t,e,i){return this.x=t.x+(e.x-t.x)*i,this.y=t.y+(e.y-t.y)*i,this}equals(t){return t.x===this.x&&t.y===this.y}fromArray(t,e=0){return this.x=t[e],this.y=t[e+1],this}toArray(t=[],e=0){return t[e]=this.x,t[e+1]=this.y,t}fromBufferAttribute(t,e){return this.x=t.getX(e),this.y=t.getY(e),this}rotateAround(t,e){const i=Math.cos(e),r=Math.sin(e),a=this.x-t.x,o=this.y-t.y;return this.x=a*i-o*r+t.x,this.y=a*r+o*i+t.y,this}random(){return this.x=Math.random(),this.y=Math.random(),this}*[Symbol.iterator](){yield this.x,yield this.y}}class Pt{constructor(t,e,i,r,a,o,s,c,l){Pt.prototype.isMatrix3=!0,this.elements=[1,0,0,0,1,0,0,0,1],t!==void 0&&this.set(t,e,i,r,a,o,s,c,l)}set(t,e,i,r,a,o,s,c,l){const h=this.elements;return h[0]=t,h[1]=r,h[2]=s,h[3]=e,h[4]=a,h[5]=c,h[6]=i,h[7]=o,h[8]=l,this}identity(){return this.set(1,0,0,0,1,0,0,0,1),this}copy(t){const e=this.elements,i=t.elements;return e[0]=i[0],e[1]=i[1],e[2]=i[2],e[3]=i[3],e[4]=i[4],e[5]=i[5],e[6]=i[6],e[7]=i[7],e[8]=i[8],this}extractBasis(t,e,i){return t.setFromMatrix3Column(this,0),e.setFromMatrix3Column(this,1),i.setFromMatrix3Column(this,2),this}setFromMatrix4(t){const e=t.elements;return this.set(e[0],e[4],e[8],e[1],e[5],e[9],e[2],e[6],e[10]),this}multiply(t){return this.multiplyMatrices(this,t)}premultiply(t){return this.multiplyMatrices(t,this)}multiplyMatrices(t,e){const i=t.elements,r=e.elements,a=this.elements,o=i[0],s=i[3],c=i[6],l=i[1],h=i[4],u=i[7],d=i[2],p=i[5],_=i[8],v=r[0],m=r[3],f=r[6],R=r[1],y=r[4],E=r[7],C=r[2],b=r[5],A=r[8];return a[0]=o*v+s*R+c*C,a[3]=o*m+s*y+c*b,a[6]=o*f+s*E+c*A,a[1]=l*v+h*R+u*C,a[4]=l*m+h*y+u*b,a[7]=l*f+h*E+u*A,a[2]=d*v+p*R+_*C,a[5]=d*m+p*y+_*b,a[8]=d*f+p*E+_*A,this}multiplyScalar(t){const e=this.elements;return e[0]*=t,e[3]*=t,e[6]*=t,e[1]*=t,e[4]*=t,e[7]*=t,e[2]*=t,e[5]*=t,e[8]*=t,this}determinant(){const t=this.elements,e=t[0],i=t[1],r=t[2],a=t[3],o=t[4],s=t[5],c=t[6],l=t[7],h=t[8];return e*o*h-e*s*l-i*a*h+i*s*c+r*a*l-r*o*c}invert(){const t=this.elements,e=t[0],i=t[1],r=t[2],a=t[3],o=t[4],s=t[5],c=t[6],l=t[7],h=t[8],u=h*o-s*l,d=s*c-h*a,p=l*a-o*c,_=e*u+i*d+r*p;if(_===0)return this.set(0,0,0,0,0,0,0,0,0);const v=1/_;return t[0]=u*v,t[1]=(r*l-h*i)*v,t[2]=(s*i-r*o)*v,t[3]=d*v,t[4]=(h*e-r*c)*v,t[5]=(r*a-s*e)*v,t[6]=p*v,t[7]=(i*c-l*e)*v,t[8]=(o*e-i*a)*v,this}transpose(){let t;const e=this.elements;return t=e[1],e[1]=e[3],e[3]=t,t=e[2],e[2]=e[6],e[6]=t,t=e[5],e[5]=e[7],e[7]=t,this}getNormalMatrix(t){return this.setFromMatrix4(t).invert().transpose()}transposeIntoArray(t){const e=this.elements;return t[0]=e[0],t[1]=e[3],t[2]=e[6],t[3]=e[1],t[4]=e[4],t[5]=e[7],t[6]=e[2],t[7]=e[5],t[8]=e[8],this}setUvTransform(t,e,i,r,a,o,s){const c=Math.cos(a),l=Math.sin(a);return this.set(i*c,i*l,-i*(c*o+l*s)+o+t,-r*l,r*c,-r*(-l*o+c*s)+s+e,0,0,1),this}scale(t,e){return this.premultiply(zr.makeScale(t,e)),this}rotate(t){return this.premultiply(zr.makeRotation(-t)),this}translate(t,e){return this.premultiply(zr.makeTranslation(t,e)),this}makeTranslation(t,e){return t.isVector2?this.set(1,0,t.x,0,1,t.y,0,0,1):this.set(1,0,t,0,1,e,0,0,1),this}makeRotation(t){const e=Math.cos(t),i=Math.sin(t);return this.set(e,-i,0,i,e,0,0,0,1),this}makeScale(t,e){return this.set(t,0,0,0,e,0,0,0,1),this}equals(t){const e=this.elements,i=t.elements;for(let r=0;r<9;r++)if(e[r]!==i[r])return!1;return!0}fromArray(t,e=0){for(let i=0;i<9;i++)this.elements[i]=t[i+e];return this}toArray(t=[],e=0){const i=this.elements;return t[e]=i[0],t[e+1]=i[1],t[e+2]=i[2],t[e+3]=i[3],t[e+4]=i[4],t[e+5]=i[5],t[e+6]=i[6],t[e+7]=i[7],t[e+8]=i[8],t}clone(){return new this.constructor().fromArray(this.elements)}}const zr=new Pt;function _c(n){for(let t=n.length-1;t>=0;--t)if(n[t]>=65535)return!0;return!1}function Dr(n){return document.createElementNS("http://www.w3.org/1999/xhtml",n)}function Ch(){const n=Dr("canvas");return n.style.display="block",n}const $s={};function li(n){n in $s||($s[n]=!0,console.warn(n))}function Ph(n,t,e){return new Promise(function(i,r){function a(){switch(n.clientWaitSync(t,n.SYNC_FLUSH_COMMANDS_BIT,0)){case n.WAIT_FAILED:r();break;case n.TIMEOUT_EXPIRED:setTimeout(a,e);break;default:i()}}setTimeout(a,e)})}function Dh(n){const t=n.elements;t[2]=.5*t[2]+.5*t[3],t[6]=.5*t[6]+.5*t[7],t[10]=.5*t[10]+.5*t[11],t[14]=.5*t[14]+.5*t[15]}function Lh(n){const t=n.elements;t[11]===-1?(t[10]=-t[10]-1,t[14]=-t[14]):(t[10]=-t[10],t[14]=-t[14]+1)}const Zs=new Pt().set(.4123908,.3575843,.1804808,.212639,.7151687,.0721923,.0193308,.1191948,.9505322),Ks=new Pt().set(3.2409699,-1.5373832,-.4986108,-.9692436,1.8759675,.0415551,.0556301,-.203977,1.0569715);function Ih(){const n={enabled:!0,workingColorSpace:Mi,spaces:{},convert:function(r,a,o){return this.enabled===!1||a===o||!a||!o||(this.spaces[a].transfer===jt&&(r.r=fn(r.r),r.g=fn(r.g),r.b=fn(r.b)),this.spaces[a].primaries!==this.spaces[o].primaries&&(r.applyMatrix3(this.spaces[a].toXYZ),r.applyMatrix3(this.spaces[o].fromXYZ)),this.spaces[o].transfer===jt&&(r.r=di(r.r),r.g=di(r.g),r.b=di(r.b))),r},fromWorkingColorSpace:function(r,a){return this.convert(r,this.workingColorSpace,a)},toWorkingColorSpace:function(r,a){return this.convert(r,a,this.workingColorSpace)},getPrimaries:function(r){return this.spaces[r].primaries},getTransfer:function(r){return r===Sn?Cr:this.spaces[r].transfer},getLuminanceCoefficients:function(r,a=this.workingColorSpace){return r.fromArray(this.spaces[a].luminanceCoefficients)},define:function(r){Object.assign(this.spaces,r)},_getMatrix:function(r,a,o){return r.copy(this.spaces[a].toXYZ).multiply(this.spaces[o].fromXYZ)},_getDrawingBufferColorSpace:function(r){return this.spaces[r].outputColorSpaceConfig.drawingBufferColorSpace},_getUnpackColorSpace:function(r=this.workingColorSpace){return this.spaces[r].workingColorSpaceConfig.unpackColorSpace}},t=[.64,.33,.3,.6,.15,.06],e=[.2126,.7152,.0722],i=[.3127,.329];return n.define({[Mi]:{primaries:t,whitePoint:i,transfer:Cr,toXYZ:Zs,fromXYZ:Ks,luminanceCoefficients:e,workingColorSpaceConfig:{unpackColorSpace:Fe},outputColorSpaceConfig:{drawingBufferColorSpace:Fe}},[Fe]:{primaries:t,whitePoint:i,transfer:jt,toXYZ:Zs,fromXYZ:Ks,luminanceCoefficients:e,outputColorSpaceConfig:{drawingBufferColorSpace:Fe}}}),n}const Wt=Ih();function fn(n){return n<.04045?n*.0773993808:Math.pow(n*.9478672986+.0521327014,2.4)}function di(n){return n<.0031308?n*12.92:1.055*Math.pow(n,.41666)-.055}let Zn;class Uh{static getDataURL(t){if(/^data:/i.test(t.src)||typeof HTMLCanvasElement>"u")return t.src;let e;if(t instanceof HTMLCanvasElement)e=t;else{Zn===void 0&&(Zn=Dr("canvas")),Zn.width=t.width,Zn.height=t.height;const i=Zn.getContext("2d");t instanceof ImageData?i.putImageData(t,0,0):i.drawImage(t,0,0,t.width,t.height),e=Zn}return e.toDataURL("image/png")}static sRGBToLinear(t){if(typeof HTMLImageElement<"u"&&t instanceof HTMLImageElement||typeof HTMLCanvasElement<"u"&&t instanceof HTMLCanvasElement||typeof ImageBitmap<"u"&&t instanceof ImageBitmap){const e=Dr("canvas");e.width=t.width,e.height=t.height;const i=e.getContext("2d");i.drawImage(t,0,0,t.width,t.height);const r=i.getImageData(0,0,t.width,t.height),a=r.data;for(let o=0;o<a.length;o++)a[o]=fn(a[o]/255)*255;return i.putImageData(r,0,0),e}else if(t.data){const e=t.data.slice(0);for(let i=0;i<e.length;i++)e instanceof Uint8Array||e instanceof Uint8ClampedArray?e[i]=Math.floor(fn(e[i]/255)*255):e[i]=fn(e[i]);return{data:e,width:t.width,height:t.height}}else return console.warn("THREE.ImageUtils.sRGBToLinear(): Unsupported image type. No color space conversion applied."),t}}let Nh=0;class gc{constructor(t=null){this.isSource=!0,Object.defineProperty(this,"id",{value:Nh++}),this.uuid=yi(),this.data=t,this.dataReady=!0,this.version=0}set needsUpdate(t){t===!0&&this.version++}toJSON(t){const e=t===void 0||typeof t=="string";if(!e&&t.images[this.uuid]!==void 0)return t.images[this.uuid];const i={uuid:this.uuid,url:""},r=this.data;if(r!==null){let a;if(Array.isArray(r)){a=[];for(let o=0,s=r.length;o<s;o++)r[o].isDataTexture?a.push(Hr(r[o].image)):a.push(Hr(r[o]))}else a=Hr(r);i.url=a}return e||(t.images[this.uuid]=i),i}}function Hr(n){return typeof HTMLImageElement<"u"&&n instanceof HTMLImageElement||typeof HTMLCanvasElement<"u"&&n instanceof HTMLCanvasElement||typeof ImageBitmap<"u"&&n instanceof ImageBitmap?Uh.getDataURL(n):n.data?{data:Array.from(n.data),width:n.width,height:n.height,type:n.data.constructor.name}:(console.warn("THREE.Texture: Unable to serialize Texture."),{})}let Fh=0;class Ae extends Ei{constructor(t=Ae.DEFAULT_IMAGE,e=Ae.DEFAULT_MAPPING,i=Hn,r=Hn,a=Je,o=Vn,s=Ye,c=pn,l=Ae.DEFAULT_ANISOTROPY,h=Sn){super(),this.isTexture=!0,Object.defineProperty(this,"id",{value:Fh++}),this.uuid=yi(),this.name="",this.source=new gc(t),this.mipmaps=[],this.mapping=e,this.channel=0,this.wrapS=i,this.wrapT=r,this.magFilter=a,this.minFilter=o,this.anisotropy=l,this.format=s,this.internalFormat=null,this.type=c,this.offset=new Yt(0,0),this.repeat=new Yt(1,1),this.center=new Yt(0,0),this.rotation=0,this.matrixAutoUpdate=!0,this.matrix=new Pt,this.generateMipmaps=!0,this.premultiplyAlpha=!1,this.flipY=!0,this.unpackAlignment=4,this.colorSpace=h,this.userData={},this.version=0,this.onUpdate=null,this.renderTarget=null,this.isRenderTargetTexture=!1,this.pmremVersion=0}get image(){return this.source.data}set image(t=null){this.source.data=t}updateMatrix(){this.matrix.setUvTransform(this.offset.x,this.offset.y,this.repeat.x,this.repeat.y,this.rotation,this.center.x,this.center.y)}clone(){return new this.constructor().copy(this)}copy(t){return this.name=t.name,this.source=t.source,this.mipmaps=t.mipmaps.slice(0),this.mapping=t.mapping,this.channel=t.channel,this.wrapS=t.wrapS,this.wrapT=t.wrapT,this.magFilter=t.magFilter,this.minFilter=t.minFilter,this.anisotropy=t.anisotropy,this.format=t.format,this.internalFormat=t.internalFormat,this.type=t.type,this.offset.copy(t.offset),this.repeat.copy(t.repeat),this.center.copy(t.center),this.rotation=t.rotation,this.matrixAutoUpdate=t.matrixAutoUpdate,this.matrix.copy(t.matrix),this.generateMipmaps=t.generateMipmaps,this.premultiplyAlpha=t.premultiplyAlpha,this.flipY=t.flipY,this.unpackAlignment=t.unpackAlignment,this.colorSpace=t.colorSpace,this.renderTarget=t.renderTarget,this.isRenderTargetTexture=t.isRenderTargetTexture,this.userData=JSON.parse(JSON.stringify(t.userData)),this.needsUpdate=!0,this}toJSON(t){const e=t===void 0||typeof t=="string";if(!e&&t.textures[this.uuid]!==void 0)return t.textures[this.uuid];const i={metadata:{version:4.6,type:"Texture",generator:"Texture.toJSON"},uuid:this.uuid,name:this.name,image:this.source.toJSON(t).uuid,mapping:this.mapping,channel:this.channel,repeat:[this.repeat.x,this.repeat.y],offset:[this.offset.x,this.offset.y],center:[this.center.x,this.center.y],rotation:this.rotation,wrap:[this.wrapS,this.wrapT],format:this.format,internalFormat:this.internalFormat,type:this.type,colorSpace:this.colorSpace,minFilter:this.minFilter,magFilter:this.magFilter,anisotropy:this.anisotropy,flipY:this.flipY,generateMipmaps:this.generateMipmaps,premultiplyAlpha:this.premultiplyAlpha,unpackAlignment:this.unpackAlignment};return Object.keys(this.userData).length>0&&(i.userData=this.userData),e||(t.textures[this.uuid]=i),i}dispose(){this.dispatchEvent({type:"dispose"})}transformUv(t){if(this.mapping!==rc)return t;if(t.applyMatrix3(this.matrix),t.x<0||t.x>1)switch(this.wrapS){case Ca:t.x=t.x-Math.floor(t.x);break;case Hn:t.x=t.x<0?0:1;break;case Pa:Math.abs(Math.floor(t.x)%2)===1?t.x=Math.ceil(t.x)-t.x:t.x=t.x-Math.floor(t.x);break}if(t.y<0||t.y>1)switch(this.wrapT){case Ca:t.y=t.y-Math.floor(t.y);break;case Hn:t.y=t.y<0?0:1;break;case Pa:Math.abs(Math.floor(t.y)%2)===1?t.y=Math.ceil(t.y)-t.y:t.y=t.y-Math.floor(t.y);break}return this.flipY&&(t.y=1-t.y),t}set needsUpdate(t){t===!0&&(this.version++,this.source.needsUpdate=!0)}set needsPMREMUpdate(t){t===!0&&this.pmremVersion++}}Ae.DEFAULT_IMAGE=null;Ae.DEFAULT_MAPPING=rc;Ae.DEFAULT_ANISOTROPY=1;class ae{constructor(t=0,e=0,i=0,r=1){ae.prototype.isVector4=!0,this.x=t,this.y=e,this.z=i,this.w=r}get width(){return this.z}set width(t){this.z=t}get height(){return this.w}set height(t){this.w=t}set(t,e,i,r){return this.x=t,this.y=e,this.z=i,this.w=r,this}setScalar(t){return this.x=t,this.y=t,this.z=t,this.w=t,this}setX(t){return this.x=t,this}setY(t){return this.y=t,this}setZ(t){return this.z=t,this}setW(t){return this.w=t,this}setComponent(t,e){switch(t){case 0:this.x=e;break;case 1:this.y=e;break;case 2:this.z=e;break;case 3:this.w=e;break;default:throw new Error("index is out of range: "+t)}return this}getComponent(t){switch(t){case 0:return this.x;case 1:return this.y;case 2:return this.z;case 3:return this.w;default:throw new Error("index is out of range: "+t)}}clone(){return new this.constructor(this.x,this.y,this.z,this.w)}copy(t){return this.x=t.x,this.y=t.y,this.z=t.z,this.w=t.w!==void 0?t.w:1,this}add(t){return this.x+=t.x,this.y+=t.y,this.z+=t.z,this.w+=t.w,this}addScalar(t){return this.x+=t,this.y+=t,this.z+=t,this.w+=t,this}addVectors(t,e){return this.x=t.x+e.x,this.y=t.y+e.y,this.z=t.z+e.z,this.w=t.w+e.w,this}addScaledVector(t,e){return this.x+=t.x*e,this.y+=t.y*e,this.z+=t.z*e,this.w+=t.w*e,this}sub(t){return this.x-=t.x,this.y-=t.y,this.z-=t.z,this.w-=t.w,this}subScalar(t){return this.x-=t,this.y-=t,this.z-=t,this.w-=t,this}subVectors(t,e){return this.x=t.x-e.x,this.y=t.y-e.y,this.z=t.z-e.z,this.w=t.w-e.w,this}multiply(t){return this.x*=t.x,this.y*=t.y,this.z*=t.z,this.w*=t.w,this}multiplyScalar(t){return this.x*=t,this.y*=t,this.z*=t,this.w*=t,this}applyMatrix4(t){const e=this.x,i=this.y,r=this.z,a=this.w,o=t.elements;return this.x=o[0]*e+o[4]*i+o[8]*r+o[12]*a,this.y=o[1]*e+o[5]*i+o[9]*r+o[13]*a,this.z=o[2]*e+o[6]*i+o[10]*r+o[14]*a,this.w=o[3]*e+o[7]*i+o[11]*r+o[15]*a,this}divide(t){return this.x/=t.x,this.y/=t.y,this.z/=t.z,this.w/=t.w,this}divideScalar(t){return this.multiplyScalar(1/t)}setAxisAngleFromQuaternion(t){this.w=2*Math.acos(t.w);const e=Math.sqrt(1-t.w*t.w);return e<1e-4?(this.x=1,this.y=0,this.z=0):(this.x=t.x/e,this.y=t.y/e,this.z=t.z/e),this}setAxisAngleFromRotationMatrix(t){let e,i,r,a;const c=t.elements,l=c[0],h=c[4],u=c[8],d=c[1],p=c[5],_=c[9],v=c[2],m=c[6],f=c[10];if(Math.abs(h-d)<.01&&Math.abs(u-v)<.01&&Math.abs(_-m)<.01){if(Math.abs(h+d)<.1&&Math.abs(u+v)<.1&&Math.abs(_+m)<.1&&Math.abs(l+p+f-3)<.1)return this.set(1,0,0,0),this;e=Math.PI;const y=(l+1)/2,E=(p+1)/2,C=(f+1)/2,b=(h+d)/4,A=(u+v)/4,I=(_+m)/4;return y>E&&y>C?y<.01?(i=0,r=.707106781,a=.707106781):(i=Math.sqrt(y),r=b/i,a=A/i):E>C?E<.01?(i=.707106781,r=0,a=.707106781):(r=Math.sqrt(E),i=b/r,a=I/r):C<.01?(i=.707106781,r=.707106781,a=0):(a=Math.sqrt(C),i=A/a,r=I/a),this.set(i,r,a,e),this}let R=Math.sqrt((m-_)*(m-_)+(u-v)*(u-v)+(d-h)*(d-h));return Math.abs(R)<.001&&(R=1),this.x=(m-_)/R,this.y=(u-v)/R,this.z=(d-h)/R,this.w=Math.acos((l+p+f-1)/2),this}setFromMatrixPosition(t){const e=t.elements;return this.x=e[12],this.y=e[13],this.z=e[14],this.w=e[15],this}min(t){return this.x=Math.min(this.x,t.x),this.y=Math.min(this.y,t.y),this.z=Math.min(this.z,t.z),this.w=Math.min(this.w,t.w),this}max(t){return this.x=Math.max(this.x,t.x),this.y=Math.max(this.y,t.y),this.z=Math.max(this.z,t.z),this.w=Math.max(this.w,t.w),this}clamp(t,e){return this.x=Ut(this.x,t.x,e.x),this.y=Ut(this.y,t.y,e.y),this.z=Ut(this.z,t.z,e.z),this.w=Ut(this.w,t.w,e.w),this}clampScalar(t,e){return this.x=Ut(this.x,t,e),this.y=Ut(this.y,t,e),this.z=Ut(this.z,t,e),this.w=Ut(this.w,t,e),this}clampLength(t,e){const i=this.length();return this.divideScalar(i||1).multiplyScalar(Ut(i,t,e))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this.z=Math.floor(this.z),this.w=Math.floor(this.w),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this.z=Math.ceil(this.z),this.w=Math.ceil(this.w),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this.z=Math.round(this.z),this.w=Math.round(this.w),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this.z=Math.trunc(this.z),this.w=Math.trunc(this.w),this}negate(){return this.x=-this.x,this.y=-this.y,this.z=-this.z,this.w=-this.w,this}dot(t){return this.x*t.x+this.y*t.y+this.z*t.z+this.w*t.w}lengthSq(){return this.x*this.x+this.y*this.y+this.z*this.z+this.w*this.w}length(){return Math.sqrt(this.x*this.x+this.y*this.y+this.z*this.z+this.w*this.w)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)+Math.abs(this.z)+Math.abs(this.w)}normalize(){return this.divideScalar(this.length()||1)}setLength(t){return this.normalize().multiplyScalar(t)}lerp(t,e){return this.x+=(t.x-this.x)*e,this.y+=(t.y-this.y)*e,this.z+=(t.z-this.z)*e,this.w+=(t.w-this.w)*e,this}lerpVectors(t,e,i){return this.x=t.x+(e.x-t.x)*i,this.y=t.y+(e.y-t.y)*i,this.z=t.z+(e.z-t.z)*i,this.w=t.w+(e.w-t.w)*i,this}equals(t){return t.x===this.x&&t.y===this.y&&t.z===this.z&&t.w===this.w}fromArray(t,e=0){return this.x=t[e],this.y=t[e+1],this.z=t[e+2],this.w=t[e+3],this}toArray(t=[],e=0){return t[e]=this.x,t[e+1]=this.y,t[e+2]=this.z,t[e+3]=this.w,t}fromBufferAttribute(t,e){return this.x=t.getX(e),this.y=t.getY(e),this.z=t.getZ(e),this.w=t.getW(e),this}random(){return this.x=Math.random(),this.y=Math.random(),this.z=Math.random(),this.w=Math.random(),this}*[Symbol.iterator](){yield this.x,yield this.y,yield this.z,yield this.w}}class Oh extends Ei{constructor(t=1,e=1,i={}){super(),this.isRenderTarget=!0,this.width=t,this.height=e,this.depth=1,this.scissor=new ae(0,0,t,e),this.scissorTest=!1,this.viewport=new ae(0,0,t,e);const r={width:t,height:e,depth:1};i=Object.assign({generateMipmaps:!1,internalFormat:null,minFilter:Je,depthBuffer:!0,stencilBuffer:!1,resolveDepthBuffer:!0,resolveStencilBuffer:!0,depthTexture:null,samples:0,count:1},i);const a=new Ae(r,i.mapping,i.wrapS,i.wrapT,i.magFilter,i.minFilter,i.format,i.type,i.anisotropy,i.colorSpace);a.flipY=!1,a.generateMipmaps=i.generateMipmaps,a.internalFormat=i.internalFormat,this.textures=[];const o=i.count;for(let s=0;s<o;s++)this.textures[s]=a.clone(),this.textures[s].isRenderTargetTexture=!0,this.textures[s].renderTarget=this;this.depthBuffer=i.depthBuffer,this.stencilBuffer=i.stencilBuffer,this.resolveDepthBuffer=i.resolveDepthBuffer,this.resolveStencilBuffer=i.resolveStencilBuffer,this._depthTexture=null,this.depthTexture=i.depthTexture,this.samples=i.samples}get texture(){return this.textures[0]}set texture(t){this.textures[0]=t}set depthTexture(t){this._depthTexture!==null&&(this._depthTexture.renderTarget=null),t!==null&&(t.renderTarget=this),this._depthTexture=t}get depthTexture(){return this._depthTexture}setSize(t,e,i=1){if(this.width!==t||this.height!==e||this.depth!==i){this.width=t,this.height=e,this.depth=i;for(let r=0,a=this.textures.length;r<a;r++)this.textures[r].image.width=t,this.textures[r].image.height=e,this.textures[r].image.depth=i;this.dispose()}this.viewport.set(0,0,t,e),this.scissor.set(0,0,t,e)}clone(){return new this.constructor().copy(this)}copy(t){this.width=t.width,this.height=t.height,this.depth=t.depth,this.scissor.copy(t.scissor),this.scissorTest=t.scissorTest,this.viewport.copy(t.viewport),this.textures.length=0;for(let i=0,r=t.textures.length;i<r;i++)this.textures[i]=t.textures[i].clone(),this.textures[i].isRenderTargetTexture=!0,this.textures[i].renderTarget=this;const e=Object.assign({},t.texture.image);return this.texture.source=new gc(e),this.depthBuffer=t.depthBuffer,this.stencilBuffer=t.stencilBuffer,this.resolveDepthBuffer=t.resolveDepthBuffer,this.resolveStencilBuffer=t.resolveStencilBuffer,t.depthTexture!==null&&(this.depthTexture=t.depthTexture.clone()),this.samples=t.samples,this}dispose(){this.dispatchEvent({type:"dispose"})}}class Xn extends Oh{constructor(t=1,e=1,i={}){super(t,e,i),this.isWebGLRenderTarget=!0}}class vc extends Ae{constructor(t=null,e=1,i=1,r=1){super(null),this.isDataArrayTexture=!0,this.image={data:t,width:e,height:i,depth:r},this.magFilter=$e,this.minFilter=$e,this.wrapR=Hn,this.generateMipmaps=!1,this.flipY=!1,this.unpackAlignment=1,this.layerUpdates=new Set}addLayerUpdate(t){this.layerUpdates.add(t)}clearLayerUpdates(){this.layerUpdates.clear()}}class Bh extends Ae{constructor(t=null,e=1,i=1,r=1){super(null),this.isData3DTexture=!0,this.image={data:t,width:e,height:i,depth:r},this.magFilter=$e,this.minFilter=$e,this.wrapR=Hn,this.generateMipmaps=!1,this.flipY=!1,this.unpackAlignment=1}}class Gi{constructor(t=0,e=0,i=0,r=1){this.isQuaternion=!0,this._x=t,this._y=e,this._z=i,this._w=r}static slerpFlat(t,e,i,r,a,o,s){let c=i[r+0],l=i[r+1],h=i[r+2],u=i[r+3];const d=a[o+0],p=a[o+1],_=a[o+2],v=a[o+3];if(s===0){t[e+0]=c,t[e+1]=l,t[e+2]=h,t[e+3]=u;return}if(s===1){t[e+0]=d,t[e+1]=p,t[e+2]=_,t[e+3]=v;return}if(u!==v||c!==d||l!==p||h!==_){let m=1-s;const f=c*d+l*p+h*_+u*v,R=f>=0?1:-1,y=1-f*f;if(y>Number.EPSILON){const C=Math.sqrt(y),b=Math.atan2(C,f*R);m=Math.sin(m*b)/C,s=Math.sin(s*b)/C}const E=s*R;if(c=c*m+d*E,l=l*m+p*E,h=h*m+_*E,u=u*m+v*E,m===1-s){const C=1/Math.sqrt(c*c+l*l+h*h+u*u);c*=C,l*=C,h*=C,u*=C}}t[e]=c,t[e+1]=l,t[e+2]=h,t[e+3]=u}static multiplyQuaternionsFlat(t,e,i,r,a,o){const s=i[r],c=i[r+1],l=i[r+2],h=i[r+3],u=a[o],d=a[o+1],p=a[o+2],_=a[o+3];return t[e]=s*_+h*u+c*p-l*d,t[e+1]=c*_+h*d+l*u-s*p,t[e+2]=l*_+h*p+s*d-c*u,t[e+3]=h*_-s*u-c*d-l*p,t}get x(){return this._x}set x(t){this._x=t,this._onChangeCallback()}get y(){return this._y}set y(t){this._y=t,this._onChangeCallback()}get z(){return this._z}set z(t){this._z=t,this._onChangeCallback()}get w(){return this._w}set w(t){this._w=t,this._onChangeCallback()}set(t,e,i,r){return this._x=t,this._y=e,this._z=i,this._w=r,this._onChangeCallback(),this}clone(){return new this.constructor(this._x,this._y,this._z,this._w)}copy(t){return this._x=t.x,this._y=t.y,this._z=t.z,this._w=t.w,this._onChangeCallback(),this}setFromEuler(t,e=!0){const i=t._x,r=t._y,a=t._z,o=t._order,s=Math.cos,c=Math.sin,l=s(i/2),h=s(r/2),u=s(a/2),d=c(i/2),p=c(r/2),_=c(a/2);switch(o){case"XYZ":this._x=d*h*u+l*p*_,this._y=l*p*u-d*h*_,this._z=l*h*_+d*p*u,this._w=l*h*u-d*p*_;break;case"YXZ":this._x=d*h*u+l*p*_,this._y=l*p*u-d*h*_,this._z=l*h*_-d*p*u,this._w=l*h*u+d*p*_;break;case"ZXY":this._x=d*h*u-l*p*_,this._y=l*p*u+d*h*_,this._z=l*h*_+d*p*u,this._w=l*h*u-d*p*_;break;case"ZYX":this._x=d*h*u-l*p*_,this._y=l*p*u+d*h*_,this._z=l*h*_-d*p*u,this._w=l*h*u+d*p*_;break;case"YZX":this._x=d*h*u+l*p*_,this._y=l*p*u+d*h*_,this._z=l*h*_-d*p*u,this._w=l*h*u-d*p*_;break;case"XZY":this._x=d*h*u-l*p*_,this._y=l*p*u-d*h*_,this._z=l*h*_+d*p*u,this._w=l*h*u+d*p*_;break;default:console.warn("THREE.Quaternion: .setFromEuler() encountered an unknown order: "+o)}return e===!0&&this._onChangeCallback(),this}setFromAxisAngle(t,e){const i=e/2,r=Math.sin(i);return this._x=t.x*r,this._y=t.y*r,this._z=t.z*r,this._w=Math.cos(i),this._onChangeCallback(),this}setFromRotationMatrix(t){const e=t.elements,i=e[0],r=e[4],a=e[8],o=e[1],s=e[5],c=e[9],l=e[2],h=e[6],u=e[10],d=i+s+u;if(d>0){const p=.5/Math.sqrt(d+1);this._w=.25/p,this._x=(h-c)*p,this._y=(a-l)*p,this._z=(o-r)*p}else if(i>s&&i>u){const p=2*Math.sqrt(1+i-s-u);this._w=(h-c)/p,this._x=.25*p,this._y=(r+o)/p,this._z=(a+l)/p}else if(s>u){const p=2*Math.sqrt(1+s-i-u);this._w=(a-l)/p,this._x=(r+o)/p,this._y=.25*p,this._z=(c+h)/p}else{const p=2*Math.sqrt(1+u-i-s);this._w=(o-r)/p,this._x=(a+l)/p,this._y=(c+h)/p,this._z=.25*p}return this._onChangeCallback(),this}setFromUnitVectors(t,e){let i=t.dot(e)+1;return i<Number.EPSILON?(i=0,Math.abs(t.x)>Math.abs(t.z)?(this._x=-t.y,this._y=t.x,this._z=0,this._w=i):(this._x=0,this._y=-t.z,this._z=t.y,this._w=i)):(this._x=t.y*e.z-t.z*e.y,this._y=t.z*e.x-t.x*e.z,this._z=t.x*e.y-t.y*e.x,this._w=i),this.normalize()}angleTo(t){return 2*Math.acos(Math.abs(Ut(this.dot(t),-1,1)))}rotateTowards(t,e){const i=this.angleTo(t);if(i===0)return this;const r=Math.min(1,e/i);return this.slerp(t,r),this}identity(){return this.set(0,0,0,1)}invert(){return this.conjugate()}conjugate(){return this._x*=-1,this._y*=-1,this._z*=-1,this._onChangeCallback(),this}dot(t){return this._x*t._x+this._y*t._y+this._z*t._z+this._w*t._w}lengthSq(){return this._x*this._x+this._y*this._y+this._z*this._z+this._w*this._w}length(){return Math.sqrt(this._x*this._x+this._y*this._y+this._z*this._z+this._w*this._w)}normalize(){let t=this.length();return t===0?(this._x=0,this._y=0,this._z=0,this._w=1):(t=1/t,this._x=this._x*t,this._y=this._y*t,this._z=this._z*t,this._w=this._w*t),this._onChangeCallback(),this}multiply(t){return this.multiplyQuaternions(this,t)}premultiply(t){return this.multiplyQuaternions(t,this)}multiplyQuaternions(t,e){const i=t._x,r=t._y,a=t._z,o=t._w,s=e._x,c=e._y,l=e._z,h=e._w;return this._x=i*h+o*s+r*l-a*c,this._y=r*h+o*c+a*s-i*l,this._z=a*h+o*l+i*c-r*s,this._w=o*h-i*s-r*c-a*l,this._onChangeCallback(),this}slerp(t,e){if(e===0)return this;if(e===1)return this.copy(t);const i=this._x,r=this._y,a=this._z,o=this._w;let s=o*t._w+i*t._x+r*t._y+a*t._z;if(s<0?(this._w=-t._w,this._x=-t._x,this._y=-t._y,this._z=-t._z,s=-s):this.copy(t),s>=1)return this._w=o,this._x=i,this._y=r,this._z=a,this;const c=1-s*s;if(c<=Number.EPSILON){const p=1-e;return this._w=p*o+e*this._w,this._x=p*i+e*this._x,this._y=p*r+e*this._y,this._z=p*a+e*this._z,this.normalize(),this}const l=Math.sqrt(c),h=Math.atan2(l,s),u=Math.sin((1-e)*h)/l,d=Math.sin(e*h)/l;return this._w=o*u+this._w*d,this._x=i*u+this._x*d,this._y=r*u+this._y*d,this._z=a*u+this._z*d,this._onChangeCallback(),this}slerpQuaternions(t,e,i){return this.copy(t).slerp(e,i)}random(){const t=2*Math.PI*Math.random(),e=2*Math.PI*Math.random(),i=Math.random(),r=Math.sqrt(1-i),a=Math.sqrt(i);return this.set(r*Math.sin(t),r*Math.cos(t),a*Math.sin(e),a*Math.cos(e))}equals(t){return t._x===this._x&&t._y===this._y&&t._z===this._z&&t._w===this._w}fromArray(t,e=0){return this._x=t[e],this._y=t[e+1],this._z=t[e+2],this._w=t[e+3],this._onChangeCallback(),this}toArray(t=[],e=0){return t[e]=this._x,t[e+1]=this._y,t[e+2]=this._z,t[e+3]=this._w,t}fromBufferAttribute(t,e){return this._x=t.getX(e),this._y=t.getY(e),this._z=t.getZ(e),this._w=t.getW(e),this._onChangeCallback(),this}toJSON(){return this.toArray()}_onChange(t){return this._onChangeCallback=t,this}_onChangeCallback(){}*[Symbol.iterator](){yield this._x,yield this._y,yield this._z,yield this._w}}class B{constructor(t=0,e=0,i=0){B.prototype.isVector3=!0,this.x=t,this.y=e,this.z=i}set(t,e,i){return i===void 0&&(i=this.z),this.x=t,this.y=e,this.z=i,this}setScalar(t){return this.x=t,this.y=t,this.z=t,this}setX(t){return this.x=t,this}setY(t){return this.y=t,this}setZ(t){return this.z=t,this}setComponent(t,e){switch(t){case 0:this.x=e;break;case 1:this.y=e;break;case 2:this.z=e;break;default:throw new Error("index is out of range: "+t)}return this}getComponent(t){switch(t){case 0:return this.x;case 1:return this.y;case 2:return this.z;default:throw new Error("index is out of range: "+t)}}clone(){return new this.constructor(this.x,this.y,this.z)}copy(t){return this.x=t.x,this.y=t.y,this.z=t.z,this}add(t){return this.x+=t.x,this.y+=t.y,this.z+=t.z,this}addScalar(t){return this.x+=t,this.y+=t,this.z+=t,this}addVectors(t,e){return this.x=t.x+e.x,this.y=t.y+e.y,this.z=t.z+e.z,this}addScaledVector(t,e){return this.x+=t.x*e,this.y+=t.y*e,this.z+=t.z*e,this}sub(t){return this.x-=t.x,this.y-=t.y,this.z-=t.z,this}subScalar(t){return this.x-=t,this.y-=t,this.z-=t,this}subVectors(t,e){return this.x=t.x-e.x,this.y=t.y-e.y,this.z=t.z-e.z,this}multiply(t){return this.x*=t.x,this.y*=t.y,this.z*=t.z,this}multiplyScalar(t){return this.x*=t,this.y*=t,this.z*=t,this}multiplyVectors(t,e){return this.x=t.x*e.x,this.y=t.y*e.y,this.z=t.z*e.z,this}applyEuler(t){return this.applyQuaternion(js.setFromEuler(t))}applyAxisAngle(t,e){return this.applyQuaternion(js.setFromAxisAngle(t,e))}applyMatrix3(t){const e=this.x,i=this.y,r=this.z,a=t.elements;return this.x=a[0]*e+a[3]*i+a[6]*r,this.y=a[1]*e+a[4]*i+a[7]*r,this.z=a[2]*e+a[5]*i+a[8]*r,this}applyNormalMatrix(t){return this.applyMatrix3(t).normalize()}applyMatrix4(t){const e=this.x,i=this.y,r=this.z,a=t.elements,o=1/(a[3]*e+a[7]*i+a[11]*r+a[15]);return this.x=(a[0]*e+a[4]*i+a[8]*r+a[12])*o,this.y=(a[1]*e+a[5]*i+a[9]*r+a[13])*o,this.z=(a[2]*e+a[6]*i+a[10]*r+a[14])*o,this}applyQuaternion(t){const e=this.x,i=this.y,r=this.z,a=t.x,o=t.y,s=t.z,c=t.w,l=2*(o*r-s*i),h=2*(s*e-a*r),u=2*(a*i-o*e);return this.x=e+c*l+o*u-s*h,this.y=i+c*h+s*l-a*u,this.z=r+c*u+a*h-o*l,this}project(t){return this.applyMatrix4(t.matrixWorldInverse).applyMatrix4(t.projectionMatrix)}unproject(t){return this.applyMatrix4(t.projectionMatrixInverse).applyMatrix4(t.matrixWorld)}transformDirection(t){const e=this.x,i=this.y,r=this.z,a=t.elements;return this.x=a[0]*e+a[4]*i+a[8]*r,this.y=a[1]*e+a[5]*i+a[9]*r,this.z=a[2]*e+a[6]*i+a[10]*r,this.normalize()}divide(t){return this.x/=t.x,this.y/=t.y,this.z/=t.z,this}divideScalar(t){return this.multiplyScalar(1/t)}min(t){return this.x=Math.min(this.x,t.x),this.y=Math.min(this.y,t.y),this.z=Math.min(this.z,t.z),this}max(t){return this.x=Math.max(this.x,t.x),this.y=Math.max(this.y,t.y),this.z=Math.max(this.z,t.z),this}clamp(t,e){return this.x=Ut(this.x,t.x,e.x),this.y=Ut(this.y,t.y,e.y),this.z=Ut(this.z,t.z,e.z),this}clampScalar(t,e){return this.x=Ut(this.x,t,e),this.y=Ut(this.y,t,e),this.z=Ut(this.z,t,e),this}clampLength(t,e){const i=this.length();return this.divideScalar(i||1).multiplyScalar(Ut(i,t,e))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this.z=Math.floor(this.z),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this.z=Math.ceil(this.z),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this.z=Math.round(this.z),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this.z=Math.trunc(this.z),this}negate(){return this.x=-this.x,this.y=-this.y,this.z=-this.z,this}dot(t){return this.x*t.x+this.y*t.y+this.z*t.z}lengthSq(){return this.x*this.x+this.y*this.y+this.z*this.z}length(){return Math.sqrt(this.x*this.x+this.y*this.y+this.z*this.z)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)+Math.abs(this.z)}normalize(){return this.divideScalar(this.length()||1)}setLength(t){return this.normalize().multiplyScalar(t)}lerp(t,e){return this.x+=(t.x-this.x)*e,this.y+=(t.y-this.y)*e,this.z+=(t.z-this.z)*e,this}lerpVectors(t,e,i){return this.x=t.x+(e.x-t.x)*i,this.y=t.y+(e.y-t.y)*i,this.z=t.z+(e.z-t.z)*i,this}cross(t){return this.crossVectors(this,t)}crossVectors(t,e){const i=t.x,r=t.y,a=t.z,o=e.x,s=e.y,c=e.z;return this.x=r*c-a*s,this.y=a*o-i*c,this.z=i*s-r*o,this}projectOnVector(t){const e=t.lengthSq();if(e===0)return this.set(0,0,0);const i=t.dot(this)/e;return this.copy(t).multiplyScalar(i)}projectOnPlane(t){return Vr.copy(this).projectOnVector(t),this.sub(Vr)}reflect(t){return this.sub(Vr.copy(t).multiplyScalar(2*this.dot(t)))}angleTo(t){const e=Math.sqrt(this.lengthSq()*t.lengthSq());if(e===0)return Math.PI/2;const i=this.dot(t)/e;return Math.acos(Ut(i,-1,1))}distanceTo(t){return Math.sqrt(this.distanceToSquared(t))}distanceToSquared(t){const e=this.x-t.x,i=this.y-t.y,r=this.z-t.z;return e*e+i*i+r*r}manhattanDistanceTo(t){return Math.abs(this.x-t.x)+Math.abs(this.y-t.y)+Math.abs(this.z-t.z)}setFromSpherical(t){return this.setFromSphericalCoords(t.radius,t.phi,t.theta)}setFromSphericalCoords(t,e,i){const r=Math.sin(e)*t;return this.x=r*Math.sin(i),this.y=Math.cos(e)*t,this.z=r*Math.cos(i),this}setFromCylindrical(t){return this.setFromCylindricalCoords(t.radius,t.theta,t.y)}setFromCylindricalCoords(t,e,i){return this.x=t*Math.sin(e),this.y=i,this.z=t*Math.cos(e),this}setFromMatrixPosition(t){const e=t.elements;return this.x=e[12],this.y=e[13],this.z=e[14],this}setFromMatrixScale(t){const e=this.setFromMatrixColumn(t,0).length(),i=this.setFromMatrixColumn(t,1).length(),r=this.setFromMatrixColumn(t,2).length();return this.x=e,this.y=i,this.z=r,this}setFromMatrixColumn(t,e){return this.fromArray(t.elements,e*4)}setFromMatrix3Column(t,e){return this.fromArray(t.elements,e*3)}setFromEuler(t){return this.x=t._x,this.y=t._y,this.z=t._z,this}setFromColor(t){return this.x=t.r,this.y=t.g,this.z=t.b,this}equals(t){return t.x===this.x&&t.y===this.y&&t.z===this.z}fromArray(t,e=0){return this.x=t[e],this.y=t[e+1],this.z=t[e+2],this}toArray(t=[],e=0){return t[e]=this.x,t[e+1]=this.y,t[e+2]=this.z,t}fromBufferAttribute(t,e){return this.x=t.getX(e),this.y=t.getY(e),this.z=t.getZ(e),this}random(){return this.x=Math.random(),this.y=Math.random(),this.z=Math.random(),this}randomDirection(){const t=Math.random()*Math.PI*2,e=Math.random()*2-1,i=Math.sqrt(1-e*e);return this.x=i*Math.cos(t),this.y=e,this.z=i*Math.sin(t),this}*[Symbol.iterator](){yield this.x,yield this.y,yield this.z}}const Vr=new B,js=new Gi;class ki{constructor(t=new B(1/0,1/0,1/0),e=new B(-1/0,-1/0,-1/0)){this.isBox3=!0,this.min=t,this.max=e}set(t,e){return this.min.copy(t),this.max.copy(e),this}setFromArray(t){this.makeEmpty();for(let e=0,i=t.length;e<i;e+=3)this.expandByPoint(Ve.fromArray(t,e));return this}setFromBufferAttribute(t){this.makeEmpty();for(let e=0,i=t.count;e<i;e++)this.expandByPoint(Ve.fromBufferAttribute(t,e));return this}setFromPoints(t){this.makeEmpty();for(let e=0,i=t.length;e<i;e++)this.expandByPoint(t[e]);return this}setFromCenterAndSize(t,e){const i=Ve.copy(e).multiplyScalar(.5);return this.min.copy(t).sub(i),this.max.copy(t).add(i),this}setFromObject(t,e=!1){return this.makeEmpty(),this.expandByObject(t,e)}clone(){return new this.constructor().copy(this)}copy(t){return this.min.copy(t.min),this.max.copy(t.max),this}makeEmpty(){return this.min.x=this.min.y=this.min.z=1/0,this.max.x=this.max.y=this.max.z=-1/0,this}isEmpty(){return this.max.x<this.min.x||this.max.y<this.min.y||this.max.z<this.min.z}getCenter(t){return this.isEmpty()?t.set(0,0,0):t.addVectors(this.min,this.max).multiplyScalar(.5)}getSize(t){return this.isEmpty()?t.set(0,0,0):t.subVectors(this.max,this.min)}expandByPoint(t){return this.min.min(t),this.max.max(t),this}expandByVector(t){return this.min.sub(t),this.max.add(t),this}expandByScalar(t){return this.min.addScalar(-t),this.max.addScalar(t),this}expandByObject(t,e=!1){t.updateWorldMatrix(!1,!1);const i=t.geometry;if(i!==void 0){const a=i.getAttribute("position");if(e===!0&&a!==void 0&&t.isInstancedMesh!==!0)for(let o=0,s=a.count;o<s;o++)t.isMesh===!0?t.getVertexPosition(o,Ve):Ve.fromBufferAttribute(a,o),Ve.applyMatrix4(t.matrixWorld),this.expandByPoint(Ve);else t.boundingBox!==void 0?(t.boundingBox===null&&t.computeBoundingBox(),Ki.copy(t.boundingBox)):(i.boundingBox===null&&i.computeBoundingBox(),Ki.copy(i.boundingBox)),Ki.applyMatrix4(t.matrixWorld),this.union(Ki)}const r=t.children;for(let a=0,o=r.length;a<o;a++)this.expandByObject(r[a],e);return this}containsPoint(t){return t.x>=this.min.x&&t.x<=this.max.x&&t.y>=this.min.y&&t.y<=this.max.y&&t.z>=this.min.z&&t.z<=this.max.z}containsBox(t){return this.min.x<=t.min.x&&t.max.x<=this.max.x&&this.min.y<=t.min.y&&t.max.y<=this.max.y&&this.min.z<=t.min.z&&t.max.z<=this.max.z}getParameter(t,e){return e.set((t.x-this.min.x)/(this.max.x-this.min.x),(t.y-this.min.y)/(this.max.y-this.min.y),(t.z-this.min.z)/(this.max.z-this.min.z))}intersectsBox(t){return t.max.x>=this.min.x&&t.min.x<=this.max.x&&t.max.y>=this.min.y&&t.min.y<=this.max.y&&t.max.z>=this.min.z&&t.min.z<=this.max.z}intersectsSphere(t){return this.clampPoint(t.center,Ve),Ve.distanceToSquared(t.center)<=t.radius*t.radius}intersectsPlane(t){let e,i;return t.normal.x>0?(e=t.normal.x*this.min.x,i=t.normal.x*this.max.x):(e=t.normal.x*this.max.x,i=t.normal.x*this.min.x),t.normal.y>0?(e+=t.normal.y*this.min.y,i+=t.normal.y*this.max.y):(e+=t.normal.y*this.max.y,i+=t.normal.y*this.min.y),t.normal.z>0?(e+=t.normal.z*this.min.z,i+=t.normal.z*this.max.z):(e+=t.normal.z*this.max.z,i+=t.normal.z*this.min.z),e<=-t.constant&&i>=-t.constant}intersectsTriangle(t){if(this.isEmpty())return!1;this.getCenter(wi),ji.subVectors(this.max,wi),Kn.subVectors(t.a,wi),jn.subVectors(t.b,wi),Jn.subVectors(t.c,wi),mn.subVectors(jn,Kn),_n.subVectors(Jn,jn),Pn.subVectors(Kn,Jn);let e=[0,-mn.z,mn.y,0,-_n.z,_n.y,0,-Pn.z,Pn.y,mn.z,0,-mn.x,_n.z,0,-_n.x,Pn.z,0,-Pn.x,-mn.y,mn.x,0,-_n.y,_n.x,0,-Pn.y,Pn.x,0];return!Gr(e,Kn,jn,Jn,ji)||(e=[1,0,0,0,1,0,0,0,1],!Gr(e,Kn,jn,Jn,ji))?!1:(Ji.crossVectors(mn,_n),e=[Ji.x,Ji.y,Ji.z],Gr(e,Kn,jn,Jn,ji))}clampPoint(t,e){return e.copy(t).clamp(this.min,this.max)}distanceToPoint(t){return this.clampPoint(t,Ve).distanceTo(t)}getBoundingSphere(t){return this.isEmpty()?t.makeEmpty():(this.getCenter(t.center),t.radius=this.getSize(Ve).length()*.5),t}intersect(t){return this.min.max(t.min),this.max.min(t.max),this.isEmpty()&&this.makeEmpty(),this}union(t){return this.min.min(t.min),this.max.max(t.max),this}applyMatrix4(t){return this.isEmpty()?this:(rn[0].set(this.min.x,this.min.y,this.min.z).applyMatrix4(t),rn[1].set(this.min.x,this.min.y,this.max.z).applyMatrix4(t),rn[2].set(this.min.x,this.max.y,this.min.z).applyMatrix4(t),rn[3].set(this.min.x,this.max.y,this.max.z).applyMatrix4(t),rn[4].set(this.max.x,this.min.y,this.min.z).applyMatrix4(t),rn[5].set(this.max.x,this.min.y,this.max.z).applyMatrix4(t),rn[6].set(this.max.x,this.max.y,this.min.z).applyMatrix4(t),rn[7].set(this.max.x,this.max.y,this.max.z).applyMatrix4(t),this.setFromPoints(rn),this)}translate(t){return this.min.add(t),this.max.add(t),this}equals(t){return t.min.equals(this.min)&&t.max.equals(this.max)}}const rn=[new B,new B,new B,new B,new B,new B,new B,new B],Ve=new B,Ki=new ki,Kn=new B,jn=new B,Jn=new B,mn=new B,_n=new B,Pn=new B,wi=new B,ji=new B,Ji=new B,Dn=new B;function Gr(n,t,e,i,r){for(let a=0,o=n.length-3;a<=o;a+=3){Dn.fromArray(n,a);const s=r.x*Math.abs(Dn.x)+r.y*Math.abs(Dn.y)+r.z*Math.abs(Dn.z),c=t.dot(Dn),l=e.dot(Dn),h=i.dot(Dn);if(Math.max(-Math.max(c,l,h),Math.min(c,l,h))>s)return!1}return!0}const zh=new ki,Ri=new B,kr=new B;class Ms{constructor(t=new B,e=-1){this.isSphere=!0,this.center=t,this.radius=e}set(t,e){return this.center.copy(t),this.radius=e,this}setFromPoints(t,e){const i=this.center;e!==void 0?i.copy(e):zh.setFromPoints(t).getCenter(i);let r=0;for(let a=0,o=t.length;a<o;a++)r=Math.max(r,i.distanceToSquared(t[a]));return this.radius=Math.sqrt(r),this}copy(t){return this.center.copy(t.center),this.radius=t.radius,this}isEmpty(){return this.radius<0}makeEmpty(){return this.center.set(0,0,0),this.radius=-1,this}containsPoint(t){return t.distanceToSquared(this.center)<=this.radius*this.radius}distanceToPoint(t){return t.distanceTo(this.center)-this.radius}intersectsSphere(t){const e=this.radius+t.radius;return t.center.distanceToSquared(this.center)<=e*e}intersectsBox(t){return t.intersectsSphere(this)}intersectsPlane(t){return Math.abs(t.distanceToPoint(this.center))<=this.radius}clampPoint(t,e){const i=this.center.distanceToSquared(t);return e.copy(t),i>this.radius*this.radius&&(e.sub(this.center).normalize(),e.multiplyScalar(this.radius).add(this.center)),e}getBoundingBox(t){return this.isEmpty()?(t.makeEmpty(),t):(t.set(this.center,this.center),t.expandByScalar(this.radius),t)}applyMatrix4(t){return this.center.applyMatrix4(t),this.radius=this.radius*t.getMaxScaleOnAxis(),this}translate(t){return this.center.add(t),this}expandByPoint(t){if(this.isEmpty())return this.center.copy(t),this.radius=0,this;Ri.subVectors(t,this.center);const e=Ri.lengthSq();if(e>this.radius*this.radius){const i=Math.sqrt(e),r=(i-this.radius)*.5;this.center.addScaledVector(Ri,r/i),this.radius+=r}return this}union(t){return t.isEmpty()?this:this.isEmpty()?(this.copy(t),this):(this.center.equals(t.center)===!0?this.radius=Math.max(this.radius,t.radius):(kr.subVectors(t.center,this.center).setLength(t.radius),this.expandByPoint(Ri.copy(t.center).add(kr)),this.expandByPoint(Ri.copy(t.center).sub(kr))),this)}equals(t){return t.center.equals(this.center)&&t.radius===this.radius}clone(){return new this.constructor().copy(this)}}const an=new B,Wr=new B,Qi=new B,gn=new B,Xr=new B,tr=new B,qr=new B;class Hh{constructor(t=new B,e=new B(0,0,-1)){this.origin=t,this.direction=e}set(t,e){return this.origin.copy(t),this.direction.copy(e),this}copy(t){return this.origin.copy(t.origin),this.direction.copy(t.direction),this}at(t,e){return e.copy(this.origin).addScaledVector(this.direction,t)}lookAt(t){return this.direction.copy(t).sub(this.origin).normalize(),this}recast(t){return this.origin.copy(this.at(t,an)),this}closestPointToPoint(t,e){e.subVectors(t,this.origin);const i=e.dot(this.direction);return i<0?e.copy(this.origin):e.copy(this.origin).addScaledVector(this.direction,i)}distanceToPoint(t){return Math.sqrt(this.distanceSqToPoint(t))}distanceSqToPoint(t){const e=an.subVectors(t,this.origin).dot(this.direction);return e<0?this.origin.distanceToSquared(t):(an.copy(this.origin).addScaledVector(this.direction,e),an.distanceToSquared(t))}distanceSqToSegment(t,e,i,r){Wr.copy(t).add(e).multiplyScalar(.5),Qi.copy(e).sub(t).normalize(),gn.copy(this.origin).sub(Wr);const a=t.distanceTo(e)*.5,o=-this.direction.dot(Qi),s=gn.dot(this.direction),c=-gn.dot(Qi),l=gn.lengthSq(),h=Math.abs(1-o*o);let u,d,p,_;if(h>0)if(u=o*c-s,d=o*s-c,_=a*h,u>=0)if(d>=-_)if(d<=_){const v=1/h;u*=v,d*=v,p=u*(u+o*d+2*s)+d*(o*u+d+2*c)+l}else d=a,u=Math.max(0,-(o*d+s)),p=-u*u+d*(d+2*c)+l;else d=-a,u=Math.max(0,-(o*d+s)),p=-u*u+d*(d+2*c)+l;else d<=-_?(u=Math.max(0,-(-o*a+s)),d=u>0?-a:Math.min(Math.max(-a,-c),a),p=-u*u+d*(d+2*c)+l):d<=_?(u=0,d=Math.min(Math.max(-a,-c),a),p=d*(d+2*c)+l):(u=Math.max(0,-(o*a+s)),d=u>0?a:Math.min(Math.max(-a,-c),a),p=-u*u+d*(d+2*c)+l);else d=o>0?-a:a,u=Math.max(0,-(o*d+s)),p=-u*u+d*(d+2*c)+l;return i&&i.copy(this.origin).addScaledVector(this.direction,u),r&&r.copy(Wr).addScaledVector(Qi,d),p}intersectSphere(t,e){an.subVectors(t.center,this.origin);const i=an.dot(this.direction),r=an.dot(an)-i*i,a=t.radius*t.radius;if(r>a)return null;const o=Math.sqrt(a-r),s=i-o,c=i+o;return c<0?null:s<0?this.at(c,e):this.at(s,e)}intersectsSphere(t){return this.distanceSqToPoint(t.center)<=t.radius*t.radius}distanceToPlane(t){const e=t.normal.dot(this.direction);if(e===0)return t.distanceToPoint(this.origin)===0?0:null;const i=-(this.origin.dot(t.normal)+t.constant)/e;return i>=0?i:null}intersectPlane(t,e){const i=this.distanceToPlane(t);return i===null?null:this.at(i,e)}intersectsPlane(t){const e=t.distanceToPoint(this.origin);return e===0||t.normal.dot(this.direction)*e<0}intersectBox(t,e){let i,r,a,o,s,c;const l=1/this.direction.x,h=1/this.direction.y,u=1/this.direction.z,d=this.origin;return l>=0?(i=(t.min.x-d.x)*l,r=(t.max.x-d.x)*l):(i=(t.max.x-d.x)*l,r=(t.min.x-d.x)*l),h>=0?(a=(t.min.y-d.y)*h,o=(t.max.y-d.y)*h):(a=(t.max.y-d.y)*h,o=(t.min.y-d.y)*h),i>o||a>r||((a>i||isNaN(i))&&(i=a),(o<r||isNaN(r))&&(r=o),u>=0?(s=(t.min.z-d.z)*u,c=(t.max.z-d.z)*u):(s=(t.max.z-d.z)*u,c=(t.min.z-d.z)*u),i>c||s>r)||((s>i||i!==i)&&(i=s),(c<r||r!==r)&&(r=c),r<0)?null:this.at(i>=0?i:r,e)}intersectsBox(t){return this.intersectBox(t,an)!==null}intersectTriangle(t,e,i,r,a){Xr.subVectors(e,t),tr.subVectors(i,t),qr.crossVectors(Xr,tr);let o=this.direction.dot(qr),s;if(o>0){if(r)return null;s=1}else if(o<0)s=-1,o=-o;else return null;gn.subVectors(this.origin,t);const c=s*this.direction.dot(tr.crossVectors(gn,tr));if(c<0)return null;const l=s*this.direction.dot(Xr.cross(gn));if(l<0||c+l>o)return null;const h=-s*gn.dot(qr);return h<0?null:this.at(h/o,a)}applyMatrix4(t){return this.origin.applyMatrix4(t),this.direction.transformDirection(t),this}equals(t){return t.origin.equals(this.origin)&&t.direction.equals(this.direction)}clone(){return new this.constructor().copy(this)}}class se{constructor(t,e,i,r,a,o,s,c,l,h,u,d,p,_,v,m){se.prototype.isMatrix4=!0,this.elements=[1,0,0,0,0,1,0,0,0,0,1,0,0,0,0,1],t!==void 0&&this.set(t,e,i,r,a,o,s,c,l,h,u,d,p,_,v,m)}set(t,e,i,r,a,o,s,c,l,h,u,d,p,_,v,m){const f=this.elements;return f[0]=t,f[4]=e,f[8]=i,f[12]=r,f[1]=a,f[5]=o,f[9]=s,f[13]=c,f[2]=l,f[6]=h,f[10]=u,f[14]=d,f[3]=p,f[7]=_,f[11]=v,f[15]=m,this}identity(){return this.set(1,0,0,0,0,1,0,0,0,0,1,0,0,0,0,1),this}clone(){return new se().fromArray(this.elements)}copy(t){const e=this.elements,i=t.elements;return e[0]=i[0],e[1]=i[1],e[2]=i[2],e[3]=i[3],e[4]=i[4],e[5]=i[5],e[6]=i[6],e[7]=i[7],e[8]=i[8],e[9]=i[9],e[10]=i[10],e[11]=i[11],e[12]=i[12],e[13]=i[13],e[14]=i[14],e[15]=i[15],this}copyPosition(t){const e=this.elements,i=t.elements;return e[12]=i[12],e[13]=i[13],e[14]=i[14],this}setFromMatrix3(t){const e=t.elements;return this.set(e[0],e[3],e[6],0,e[1],e[4],e[7],0,e[2],e[5],e[8],0,0,0,0,1),this}extractBasis(t,e,i){return t.setFromMatrixColumn(this,0),e.setFromMatrixColumn(this,1),i.setFromMatrixColumn(this,2),this}makeBasis(t,e,i){return this.set(t.x,e.x,i.x,0,t.y,e.y,i.y,0,t.z,e.z,i.z,0,0,0,0,1),this}extractRotation(t){const e=this.elements,i=t.elements,r=1/Qn.setFromMatrixColumn(t,0).length(),a=1/Qn.setFromMatrixColumn(t,1).length(),o=1/Qn.setFromMatrixColumn(t,2).length();return e[0]=i[0]*r,e[1]=i[1]*r,e[2]=i[2]*r,e[3]=0,e[4]=i[4]*a,e[5]=i[5]*a,e[6]=i[6]*a,e[7]=0,e[8]=i[8]*o,e[9]=i[9]*o,e[10]=i[10]*o,e[11]=0,e[12]=0,e[13]=0,e[14]=0,e[15]=1,this}makeRotationFromEuler(t){const e=this.elements,i=t.x,r=t.y,a=t.z,o=Math.cos(i),s=Math.sin(i),c=Math.cos(r),l=Math.sin(r),h=Math.cos(a),u=Math.sin(a);if(t.order==="XYZ"){const d=o*h,p=o*u,_=s*h,v=s*u;e[0]=c*h,e[4]=-c*u,e[8]=l,e[1]=p+_*l,e[5]=d-v*l,e[9]=-s*c,e[2]=v-d*l,e[6]=_+p*l,e[10]=o*c}else if(t.order==="YXZ"){const d=c*h,p=c*u,_=l*h,v=l*u;e[0]=d+v*s,e[4]=_*s-p,e[8]=o*l,e[1]=o*u,e[5]=o*h,e[9]=-s,e[2]=p*s-_,e[6]=v+d*s,e[10]=o*c}else if(t.order==="ZXY"){const d=c*h,p=c*u,_=l*h,v=l*u;e[0]=d-v*s,e[4]=-o*u,e[8]=_+p*s,e[1]=p+_*s,e[5]=o*h,e[9]=v-d*s,e[2]=-o*l,e[6]=s,e[10]=o*c}else if(t.order==="ZYX"){const d=o*h,p=o*u,_=s*h,v=s*u;e[0]=c*h,e[4]=_*l-p,e[8]=d*l+v,e[1]=c*u,e[5]=v*l+d,e[9]=p*l-_,e[2]=-l,e[6]=s*c,e[10]=o*c}else if(t.order==="YZX"){const d=o*c,p=o*l,_=s*c,v=s*l;e[0]=c*h,e[4]=v-d*u,e[8]=_*u+p,e[1]=u,e[5]=o*h,e[9]=-s*h,e[2]=-l*h,e[6]=p*u+_,e[10]=d-v*u}else if(t.order==="XZY"){const d=o*c,p=o*l,_=s*c,v=s*l;e[0]=c*h,e[4]=-u,e[8]=l*h,e[1]=d*u+v,e[5]=o*h,e[9]=p*u-_,e[2]=_*u-p,e[6]=s*h,e[10]=v*u+d}return e[3]=0,e[7]=0,e[11]=0,e[12]=0,e[13]=0,e[14]=0,e[15]=1,this}makeRotationFromQuaternion(t){return this.compose(Vh,t,Gh)}lookAt(t,e,i){const r=this.elements;return Re.subVectors(t,e),Re.lengthSq()===0&&(Re.z=1),Re.normalize(),vn.crossVectors(i,Re),vn.lengthSq()===0&&(Math.abs(i.z)===1?Re.x+=1e-4:Re.z+=1e-4,Re.normalize(),vn.crossVectors(i,Re)),vn.normalize(),er.crossVectors(Re,vn),r[0]=vn.x,r[4]=er.x,r[8]=Re.x,r[1]=vn.y,r[5]=er.y,r[9]=Re.y,r[2]=vn.z,r[6]=er.z,r[10]=Re.z,this}multiply(t){return this.multiplyMatrices(this,t)}premultiply(t){return this.multiplyMatrices(t,this)}multiplyMatrices(t,e){const i=t.elements,r=e.elements,a=this.elements,o=i[0],s=i[4],c=i[8],l=i[12],h=i[1],u=i[5],d=i[9],p=i[13],_=i[2],v=i[6],m=i[10],f=i[14],R=i[3],y=i[7],E=i[11],C=i[15],b=r[0],A=r[4],I=r[8],S=r[12],M=r[1],w=r[5],V=r[9],F=r[13],W=r[2],K=r[6],k=r[10],Z=r[14],H=r[3],tt=r[7],ct=r[11],_t=r[15];return a[0]=o*b+s*M+c*W+l*H,a[4]=o*A+s*w+c*K+l*tt,a[8]=o*I+s*V+c*k+l*ct,a[12]=o*S+s*F+c*Z+l*_t,a[1]=h*b+u*M+d*W+p*H,a[5]=h*A+u*w+d*K+p*tt,a[9]=h*I+u*V+d*k+p*ct,a[13]=h*S+u*F+d*Z+p*_t,a[2]=_*b+v*M+m*W+f*H,a[6]=_*A+v*w+m*K+f*tt,a[10]=_*I+v*V+m*k+f*ct,a[14]=_*S+v*F+m*Z+f*_t,a[3]=R*b+y*M+E*W+C*H,a[7]=R*A+y*w+E*K+C*tt,a[11]=R*I+y*V+E*k+C*ct,a[15]=R*S+y*F+E*Z+C*_t,this}multiplyScalar(t){const e=this.elements;return e[0]*=t,e[4]*=t,e[8]*=t,e[12]*=t,e[1]*=t,e[5]*=t,e[9]*=t,e[13]*=t,e[2]*=t,e[6]*=t,e[10]*=t,e[14]*=t,e[3]*=t,e[7]*=t,e[11]*=t,e[15]*=t,this}determinant(){const t=this.elements,e=t[0],i=t[4],r=t[8],a=t[12],o=t[1],s=t[5],c=t[9],l=t[13],h=t[2],u=t[6],d=t[10],p=t[14],_=t[3],v=t[7],m=t[11],f=t[15];return _*(+a*c*u-r*l*u-a*s*d+i*l*d+r*s*p-i*c*p)+v*(+e*c*p-e*l*d+a*o*d-r*o*p+r*l*h-a*c*h)+m*(+e*l*u-e*s*p-a*o*u+i*o*p+a*s*h-i*l*h)+f*(-r*s*h-e*c*u+e*s*d+r*o*u-i*o*d+i*c*h)}transpose(){const t=this.elements;let e;return e=t[1],t[1]=t[4],t[4]=e,e=t[2],t[2]=t[8],t[8]=e,e=t[6],t[6]=t[9],t[9]=e,e=t[3],t[3]=t[12],t[12]=e,e=t[7],t[7]=t[13],t[13]=e,e=t[11],t[11]=t[14],t[14]=e,this}setPosition(t,e,i){const r=this.elements;return t.isVector3?(r[12]=t.x,r[13]=t.y,r[14]=t.z):(r[12]=t,r[13]=e,r[14]=i),this}invert(){const t=this.elements,e=t[0],i=t[1],r=t[2],a=t[3],o=t[4],s=t[5],c=t[6],l=t[7],h=t[8],u=t[9],d=t[10],p=t[11],_=t[12],v=t[13],m=t[14],f=t[15],R=u*m*l-v*d*l+v*c*p-s*m*p-u*c*f+s*d*f,y=_*d*l-h*m*l-_*c*p+o*m*p+h*c*f-o*d*f,E=h*v*l-_*u*l+_*s*p-o*v*p-h*s*f+o*u*f,C=_*u*c-h*v*c-_*s*d+o*v*d+h*s*m-o*u*m,b=e*R+i*y+r*E+a*C;if(b===0)return this.set(0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0);const A=1/b;return t[0]=R*A,t[1]=(v*d*a-u*m*a-v*r*p+i*m*p+u*r*f-i*d*f)*A,t[2]=(s*m*a-v*c*a+v*r*l-i*m*l-s*r*f+i*c*f)*A,t[3]=(u*c*a-s*d*a-u*r*l+i*d*l+s*r*p-i*c*p)*A,t[4]=y*A,t[5]=(h*m*a-_*d*a+_*r*p-e*m*p-h*r*f+e*d*f)*A,t[6]=(_*c*a-o*m*a-_*r*l+e*m*l+o*r*f-e*c*f)*A,t[7]=(o*d*a-h*c*a+h*r*l-e*d*l-o*r*p+e*c*p)*A,t[8]=E*A,t[9]=(_*u*a-h*v*a-_*i*p+e*v*p+h*i*f-e*u*f)*A,t[10]=(o*v*a-_*s*a+_*i*l-e*v*l-o*i*f+e*s*f)*A,t[11]=(h*s*a-o*u*a-h*i*l+e*u*l+o*i*p-e*s*p)*A,t[12]=C*A,t[13]=(h*v*r-_*u*r+_*i*d-e*v*d-h*i*m+e*u*m)*A,t[14]=(_*s*r-o*v*r-_*i*c+e*v*c+o*i*m-e*s*m)*A,t[15]=(o*u*r-h*s*r+h*i*c-e*u*c-o*i*d+e*s*d)*A,this}scale(t){const e=this.elements,i=t.x,r=t.y,a=t.z;return e[0]*=i,e[4]*=r,e[8]*=a,e[1]*=i,e[5]*=r,e[9]*=a,e[2]*=i,e[6]*=r,e[10]*=a,e[3]*=i,e[7]*=r,e[11]*=a,this}getMaxScaleOnAxis(){const t=this.elements,e=t[0]*t[0]+t[1]*t[1]+t[2]*t[2],i=t[4]*t[4]+t[5]*t[5]+t[6]*t[6],r=t[8]*t[8]+t[9]*t[9]+t[10]*t[10];return Math.sqrt(Math.max(e,i,r))}makeTranslation(t,e,i){return t.isVector3?this.set(1,0,0,t.x,0,1,0,t.y,0,0,1,t.z,0,0,0,1):this.set(1,0,0,t,0,1,0,e,0,0,1,i,0,0,0,1),this}makeRotationX(t){const e=Math.cos(t),i=Math.sin(t);return this.set(1,0,0,0,0,e,-i,0,0,i,e,0,0,0,0,1),this}makeRotationY(t){const e=Math.cos(t),i=Math.sin(t);return this.set(e,0,i,0,0,1,0,0,-i,0,e,0,0,0,0,1),this}makeRotationZ(t){const e=Math.cos(t),i=Math.sin(t);return this.set(e,-i,0,0,i,e,0,0,0,0,1,0,0,0,0,1),this}makeRotationAxis(t,e){const i=Math.cos(e),r=Math.sin(e),a=1-i,o=t.x,s=t.y,c=t.z,l=a*o,h=a*s;return this.set(l*o+i,l*s-r*c,l*c+r*s,0,l*s+r*c,h*s+i,h*c-r*o,0,l*c-r*s,h*c+r*o,a*c*c+i,0,0,0,0,1),this}makeScale(t,e,i){return this.set(t,0,0,0,0,e,0,0,0,0,i,0,0,0,0,1),this}makeShear(t,e,i,r,a,o){return this.set(1,i,a,0,t,1,o,0,e,r,1,0,0,0,0,1),this}compose(t,e,i){const r=this.elements,a=e._x,o=e._y,s=e._z,c=e._w,l=a+a,h=o+o,u=s+s,d=a*l,p=a*h,_=a*u,v=o*h,m=o*u,f=s*u,R=c*l,y=c*h,E=c*u,C=i.x,b=i.y,A=i.z;return r[0]=(1-(v+f))*C,r[1]=(p+E)*C,r[2]=(_-y)*C,r[3]=0,r[4]=(p-E)*b,r[5]=(1-(d+f))*b,r[6]=(m+R)*b,r[7]=0,r[8]=(_+y)*A,r[9]=(m-R)*A,r[10]=(1-(d+v))*A,r[11]=0,r[12]=t.x,r[13]=t.y,r[14]=t.z,r[15]=1,this}decompose(t,e,i){const r=this.elements;let a=Qn.set(r[0],r[1],r[2]).length();const o=Qn.set(r[4],r[5],r[6]).length(),s=Qn.set(r[8],r[9],r[10]).length();this.determinant()<0&&(a=-a),t.x=r[12],t.y=r[13],t.z=r[14],Ge.copy(this);const l=1/a,h=1/o,u=1/s;return Ge.elements[0]*=l,Ge.elements[1]*=l,Ge.elements[2]*=l,Ge.elements[4]*=h,Ge.elements[5]*=h,Ge.elements[6]*=h,Ge.elements[8]*=u,Ge.elements[9]*=u,Ge.elements[10]*=u,e.setFromRotationMatrix(Ge),i.x=a,i.y=o,i.z=s,this}makePerspective(t,e,i,r,a,o,s=hn){const c=this.elements,l=2*a/(e-t),h=2*a/(i-r),u=(e+t)/(e-t),d=(i+r)/(i-r);let p,_;if(s===hn)p=-(o+a)/(o-a),_=-2*o*a/(o-a);else if(s===Pr)p=-o/(o-a),_=-o*a/(o-a);else throw new Error("THREE.Matrix4.makePerspective(): Invalid coordinate system: "+s);return c[0]=l,c[4]=0,c[8]=u,c[12]=0,c[1]=0,c[5]=h,c[9]=d,c[13]=0,c[2]=0,c[6]=0,c[10]=p,c[14]=_,c[3]=0,c[7]=0,c[11]=-1,c[15]=0,this}makeOrthographic(t,e,i,r,a,o,s=hn){const c=this.elements,l=1/(e-t),h=1/(i-r),u=1/(o-a),d=(e+t)*l,p=(i+r)*h;let _,v;if(s===hn)_=(o+a)*u,v=-2*u;else if(s===Pr)_=a*u,v=-1*u;else throw new Error("THREE.Matrix4.makeOrthographic(): Invalid coordinate system: "+s);return c[0]=2*l,c[4]=0,c[8]=0,c[12]=-d,c[1]=0,c[5]=2*h,c[9]=0,c[13]=-p,c[2]=0,c[6]=0,c[10]=v,c[14]=-_,c[3]=0,c[7]=0,c[11]=0,c[15]=1,this}equals(t){const e=this.elements,i=t.elements;for(let r=0;r<16;r++)if(e[r]!==i[r])return!1;return!0}fromArray(t,e=0){for(let i=0;i<16;i++)this.elements[i]=t[i+e];return this}toArray(t=[],e=0){const i=this.elements;return t[e]=i[0],t[e+1]=i[1],t[e+2]=i[2],t[e+3]=i[3],t[e+4]=i[4],t[e+5]=i[5],t[e+6]=i[6],t[e+7]=i[7],t[e+8]=i[8],t[e+9]=i[9],t[e+10]=i[10],t[e+11]=i[11],t[e+12]=i[12],t[e+13]=i[13],t[e+14]=i[14],t[e+15]=i[15],t}}const Qn=new B,Ge=new se,Vh=new B(0,0,0),Gh=new B(1,1,1),vn=new B,er=new B,Re=new B,Js=new se,Qs=new Gi;class Ze{constructor(t=0,e=0,i=0,r=Ze.DEFAULT_ORDER){this.isEuler=!0,this._x=t,this._y=e,this._z=i,this._order=r}get x(){return this._x}set x(t){this._x=t,this._onChangeCallback()}get y(){return this._y}set y(t){this._y=t,this._onChangeCallback()}get z(){return this._z}set z(t){this._z=t,this._onChangeCallback()}get order(){return this._order}set order(t){this._order=t,this._onChangeCallback()}set(t,e,i,r=this._order){return this._x=t,this._y=e,this._z=i,this._order=r,this._onChangeCallback(),this}clone(){return new this.constructor(this._x,this._y,this._z,this._order)}copy(t){return this._x=t._x,this._y=t._y,this._z=t._z,this._order=t._order,this._onChangeCallback(),this}setFromRotationMatrix(t,e=this._order,i=!0){const r=t.elements,a=r[0],o=r[4],s=r[8],c=r[1],l=r[5],h=r[9],u=r[2],d=r[6],p=r[10];switch(e){case"XYZ":this._y=Math.asin(Ut(s,-1,1)),Math.abs(s)<.9999999?(this._x=Math.atan2(-h,p),this._z=Math.atan2(-o,a)):(this._x=Math.atan2(d,l),this._z=0);break;case"YXZ":this._x=Math.asin(-Ut(h,-1,1)),Math.abs(h)<.9999999?(this._y=Math.atan2(s,p),this._z=Math.atan2(c,l)):(this._y=Math.atan2(-u,a),this._z=0);break;case"ZXY":this._x=Math.asin(Ut(d,-1,1)),Math.abs(d)<.9999999?(this._y=Math.atan2(-u,p),this._z=Math.atan2(-o,l)):(this._y=0,this._z=Math.atan2(c,a));break;case"ZYX":this._y=Math.asin(-Ut(u,-1,1)),Math.abs(u)<.9999999?(this._x=Math.atan2(d,p),this._z=Math.atan2(c,a)):(this._x=0,this._z=Math.atan2(-o,l));break;case"YZX":this._z=Math.asin(Ut(c,-1,1)),Math.abs(c)<.9999999?(this._x=Math.atan2(-h,l),this._y=Math.atan2(-u,a)):(this._x=0,this._y=Math.atan2(s,p));break;case"XZY":this._z=Math.asin(-Ut(o,-1,1)),Math.abs(o)<.9999999?(this._x=Math.atan2(d,l),this._y=Math.atan2(s,a)):(this._x=Math.atan2(-h,p),this._y=0);break;default:console.warn("THREE.Euler: .setFromRotationMatrix() encountered an unknown order: "+e)}return this._order=e,i===!0&&this._onChangeCallback(),this}setFromQuaternion(t,e,i){return Js.makeRotationFromQuaternion(t),this.setFromRotationMatrix(Js,e,i)}setFromVector3(t,e=this._order){return this.set(t.x,t.y,t.z,e)}reorder(t){return Qs.setFromEuler(this),this.setFromQuaternion(Qs,t)}equals(t){return t._x===this._x&&t._y===this._y&&t._z===this._z&&t._order===this._order}fromArray(t){return this._x=t[0],this._y=t[1],this._z=t[2],t[3]!==void 0&&(this._order=t[3]),this._onChangeCallback(),this}toArray(t=[],e=0){return t[e]=this._x,t[e+1]=this._y,t[e+2]=this._z,t[e+3]=this._order,t}_onChange(t){return this._onChangeCallback=t,this}_onChangeCallback(){}*[Symbol.iterator](){yield this._x,yield this._y,yield this._z,yield this._order}}Ze.DEFAULT_ORDER="XYZ";class xc{constructor(){this.mask=1}set(t){this.mask=(1<<t|0)>>>0}enable(t){this.mask|=1<<t|0}enableAll(){this.mask=-1}toggle(t){this.mask^=1<<t|0}disable(t){this.mask&=~(1<<t|0)}disableAll(){this.mask=0}test(t){return(this.mask&t.mask)!==0}isEnabled(t){return(this.mask&(1<<t|0))!==0}}let kh=0;const to=new B,ti=new Gi,sn=new se,nr=new B,Ci=new B,Wh=new B,Xh=new Gi,eo=new B(1,0,0),no=new B(0,1,0),io=new B(0,0,1),ro={type:"added"},qh={type:"removed"},ei={type:"childadded",child:null},Yr={type:"childremoved",child:null};class xe extends Ei{constructor(){super(),this.isObject3D=!0,Object.defineProperty(this,"id",{value:kh++}),this.uuid=yi(),this.name="",this.type="Object3D",this.parent=null,this.children=[],this.up=xe.DEFAULT_UP.clone();const t=new B,e=new Ze,i=new Gi,r=new B(1,1,1);function a(){i.setFromEuler(e,!1)}function o(){e.setFromQuaternion(i,void 0,!1)}e._onChange(a),i._onChange(o),Object.defineProperties(this,{position:{configurable:!0,enumerable:!0,value:t},rotation:{configurable:!0,enumerable:!0,value:e},quaternion:{configurable:!0,enumerable:!0,value:i},scale:{configurable:!0,enumerable:!0,value:r},modelViewMatrix:{value:new se},normalMatrix:{value:new Pt}}),this.matrix=new se,this.matrixWorld=new se,this.matrixAutoUpdate=xe.DEFAULT_MATRIX_AUTO_UPDATE,this.matrixWorldAutoUpdate=xe.DEFAULT_MATRIX_WORLD_AUTO_UPDATE,this.matrixWorldNeedsUpdate=!1,this.layers=new xc,this.visible=!0,this.castShadow=!1,this.receiveShadow=!1,this.frustumCulled=!0,this.renderOrder=0,this.animations=[],this.userData={}}onBeforeShadow(){}onAfterShadow(){}onBeforeRender(){}onAfterRender(){}applyMatrix4(t){this.matrixAutoUpdate&&this.updateMatrix(),this.matrix.premultiply(t),this.matrix.decompose(this.position,this.quaternion,this.scale)}applyQuaternion(t){return this.quaternion.premultiply(t),this}setRotationFromAxisAngle(t,e){this.quaternion.setFromAxisAngle(t,e)}setRotationFromEuler(t){this.quaternion.setFromEuler(t,!0)}setRotationFromMatrix(t){this.quaternion.setFromRotationMatrix(t)}setRotationFromQuaternion(t){this.quaternion.copy(t)}rotateOnAxis(t,e){return ti.setFromAxisAngle(t,e),this.quaternion.multiply(ti),this}rotateOnWorldAxis(t,e){return ti.setFromAxisAngle(t,e),this.quaternion.premultiply(ti),this}rotateX(t){return this.rotateOnAxis(eo,t)}rotateY(t){return this.rotateOnAxis(no,t)}rotateZ(t){return this.rotateOnAxis(io,t)}translateOnAxis(t,e){return to.copy(t).applyQuaternion(this.quaternion),this.position.add(to.multiplyScalar(e)),this}translateX(t){return this.translateOnAxis(eo,t)}translateY(t){return this.translateOnAxis(no,t)}translateZ(t){return this.translateOnAxis(io,t)}localToWorld(t){return this.updateWorldMatrix(!0,!1),t.applyMatrix4(this.matrixWorld)}worldToLocal(t){return this.updateWorldMatrix(!0,!1),t.applyMatrix4(sn.copy(this.matrixWorld).invert())}lookAt(t,e,i){t.isVector3?nr.copy(t):nr.set(t,e,i);const r=this.parent;this.updateWorldMatrix(!0,!1),Ci.setFromMatrixPosition(this.matrixWorld),this.isCamera||this.isLight?sn.lookAt(Ci,nr,this.up):sn.lookAt(nr,Ci,this.up),this.quaternion.setFromRotationMatrix(sn),r&&(sn.extractRotation(r.matrixWorld),ti.setFromRotationMatrix(sn),this.quaternion.premultiply(ti.invert()))}add(t){if(arguments.length>1){for(let e=0;e<arguments.length;e++)this.add(arguments[e]);return this}return t===this?(console.error("THREE.Object3D.add: object can't be added as a child of itself.",t),this):(t&&t.isObject3D?(t.removeFromParent(),t.parent=this,this.children.push(t),t.dispatchEvent(ro),ei.child=t,this.dispatchEvent(ei),ei.child=null):console.error("THREE.Object3D.add: object not an instance of THREE.Object3D.",t),this)}remove(t){if(arguments.length>1){for(let i=0;i<arguments.length;i++)this.remove(arguments[i]);return this}const e=this.children.indexOf(t);return e!==-1&&(t.parent=null,this.children.splice(e,1),t.dispatchEvent(qh),Yr.child=t,this.dispatchEvent(Yr),Yr.child=null),this}removeFromParent(){const t=this.parent;return t!==null&&t.remove(this),this}clear(){return this.remove(...this.children)}attach(t){return this.updateWorldMatrix(!0,!1),sn.copy(this.matrixWorld).invert(),t.parent!==null&&(t.parent.updateWorldMatrix(!0,!1),sn.multiply(t.parent.matrixWorld)),t.applyMatrix4(sn),t.removeFromParent(),t.parent=this,this.children.push(t),t.updateWorldMatrix(!1,!0),t.dispatchEvent(ro),ei.child=t,this.dispatchEvent(ei),ei.child=null,this}getObjectById(t){return this.getObjectByProperty("id",t)}getObjectByName(t){return this.getObjectByProperty("name",t)}getObjectByProperty(t,e){if(this[t]===e)return this;for(let i=0,r=this.children.length;i<r;i++){const o=this.children[i].getObjectByProperty(t,e);if(o!==void 0)return o}}getObjectsByProperty(t,e,i=[]){this[t]===e&&i.push(this);const r=this.children;for(let a=0,o=r.length;a<o;a++)r[a].getObjectsByProperty(t,e,i);return i}getWorldPosition(t){return this.updateWorldMatrix(!0,!1),t.setFromMatrixPosition(this.matrixWorld)}getWorldQuaternion(t){return this.updateWorldMatrix(!0,!1),this.matrixWorld.decompose(Ci,t,Wh),t}getWorldScale(t){return this.updateWorldMatrix(!0,!1),this.matrixWorld.decompose(Ci,Xh,t),t}getWorldDirection(t){this.updateWorldMatrix(!0,!1);const e=this.matrixWorld.elements;return t.set(e[8],e[9],e[10]).normalize()}raycast(){}traverse(t){t(this);const e=this.children;for(let i=0,r=e.length;i<r;i++)e[i].traverse(t)}traverseVisible(t){if(this.visible===!1)return;t(this);const e=this.children;for(let i=0,r=e.length;i<r;i++)e[i].traverseVisible(t)}traverseAncestors(t){const e=this.parent;e!==null&&(t(e),e.traverseAncestors(t))}updateMatrix(){this.matrix.compose(this.position,this.quaternion,this.scale),this.matrixWorldNeedsUpdate=!0}updateMatrixWorld(t){this.matrixAutoUpdate&&this.updateMatrix(),(this.matrixWorldNeedsUpdate||t)&&(this.matrixWorldAutoUpdate===!0&&(this.parent===null?this.matrixWorld.copy(this.matrix):this.matrixWorld.multiplyMatrices(this.parent.matrixWorld,this.matrix)),this.matrixWorldNeedsUpdate=!1,t=!0);const e=this.children;for(let i=0,r=e.length;i<r;i++)e[i].updateMatrixWorld(t)}updateWorldMatrix(t,e){const i=this.parent;if(t===!0&&i!==null&&i.updateWorldMatrix(!0,!1),this.matrixAutoUpdate&&this.updateMatrix(),this.matrixWorldAutoUpdate===!0&&(this.parent===null?this.matrixWorld.copy(this.matrix):this.matrixWorld.multiplyMatrices(this.parent.matrixWorld,this.matrix)),e===!0){const r=this.children;for(let a=0,o=r.length;a<o;a++)r[a].updateWorldMatrix(!1,!0)}}toJSON(t){const e=t===void 0||typeof t=="string",i={};e&&(t={geometries:{},materials:{},textures:{},images:{},shapes:{},skeletons:{},animations:{},nodes:{}},i.metadata={version:4.6,type:"Object",generator:"Object3D.toJSON"});const r={};r.uuid=this.uuid,r.type=this.type,this.name!==""&&(r.name=this.name),this.castShadow===!0&&(r.castShadow=!0),this.receiveShadow===!0&&(r.receiveShadow=!0),this.visible===!1&&(r.visible=!1),this.frustumCulled===!1&&(r.frustumCulled=!1),this.renderOrder!==0&&(r.renderOrder=this.renderOrder),Object.keys(this.userData).length>0&&(r.userData=this.userData),r.layers=this.layers.mask,r.matrix=this.matrix.toArray(),r.up=this.up.toArray(),this.matrixAutoUpdate===!1&&(r.matrixAutoUpdate=!1),this.isInstancedMesh&&(r.type="InstancedMesh",r.count=this.count,r.instanceMatrix=this.instanceMatrix.toJSON(),this.instanceColor!==null&&(r.instanceColor=this.instanceColor.toJSON())),this.isBatchedMesh&&(r.type="BatchedMesh",r.perObjectFrustumCulled=this.perObjectFrustumCulled,r.sortObjects=this.sortObjects,r.drawRanges=this._drawRanges,r.reservedRanges=this._reservedRanges,r.visibility=this._visibility,r.active=this._active,r.bounds=this._bounds.map(s=>({boxInitialized:s.boxInitialized,boxMin:s.box.min.toArray(),boxMax:s.box.max.toArray(),sphereInitialized:s.sphereInitialized,sphereRadius:s.sphere.radius,sphereCenter:s.sphere.center.toArray()})),r.maxInstanceCount=this._maxInstanceCount,r.maxVertexCount=this._maxVertexCount,r.maxIndexCount=this._maxIndexCount,r.geometryInitialized=this._geometryInitialized,r.geometryCount=this._geometryCount,r.matricesTexture=this._matricesTexture.toJSON(t),this._colorsTexture!==null&&(r.colorsTexture=this._colorsTexture.toJSON(t)),this.boundingSphere!==null&&(r.boundingSphere={center:r.boundingSphere.center.toArray(),radius:r.boundingSphere.radius}),this.boundingBox!==null&&(r.boundingBox={min:r.boundingBox.min.toArray(),max:r.boundingBox.max.toArray()}));function a(s,c){return s[c.uuid]===void 0&&(s[c.uuid]=c.toJSON(t)),c.uuid}if(this.isScene)this.background&&(this.background.isColor?r.background=this.background.toJSON():this.background.isTexture&&(r.background=this.background.toJSON(t).uuid)),this.environment&&this.environment.isTexture&&this.environment.isRenderTargetTexture!==!0&&(r.environment=this.environment.toJSON(t).uuid);else if(this.isMesh||this.isLine||this.isPoints){r.geometry=a(t.geometries,this.geometry);const s=this.geometry.parameters;if(s!==void 0&&s.shapes!==void 0){const c=s.shapes;if(Array.isArray(c))for(let l=0,h=c.length;l<h;l++){const u=c[l];a(t.shapes,u)}else a(t.shapes,c)}}if(this.isSkinnedMesh&&(r.bindMode=this.bindMode,r.bindMatrix=this.bindMatrix.toArray(),this.skeleton!==void 0&&(a(t.skeletons,this.skeleton),r.skeleton=this.skeleton.uuid)),this.material!==void 0)if(Array.isArray(this.material)){const s=[];for(let c=0,l=this.material.length;c<l;c++)s.push(a(t.materials,this.material[c]));r.material=s}else r.material=a(t.materials,this.material);if(this.children.length>0){r.children=[];for(let s=0;s<this.children.length;s++)r.children.push(this.children[s].toJSON(t).object)}if(this.animations.length>0){r.animations=[];for(let s=0;s<this.animations.length;s++){const c=this.animations[s];r.animations.push(a(t.animations,c))}}if(e){const s=o(t.geometries),c=o(t.materials),l=o(t.textures),h=o(t.images),u=o(t.shapes),d=o(t.skeletons),p=o(t.animations),_=o(t.nodes);s.length>0&&(i.geometries=s),c.length>0&&(i.materials=c),l.length>0&&(i.textures=l),h.length>0&&(i.images=h),u.length>0&&(i.shapes=u),d.length>0&&(i.skeletons=d),p.length>0&&(i.animations=p),_.length>0&&(i.nodes=_)}return i.object=r,i;function o(s){const c=[];for(const l in s){const h=s[l];delete h.metadata,c.push(h)}return c}}clone(t){return new this.constructor().copy(this,t)}copy(t,e=!0){if(this.name=t.name,this.up.copy(t.up),this.position.copy(t.position),this.rotation.order=t.rotation.order,this.quaternion.copy(t.quaternion),this.scale.copy(t.scale),this.matrix.copy(t.matrix),this.matrixWorld.copy(t.matrixWorld),this.matrixAutoUpdate=t.matrixAutoUpdate,this.matrixWorldAutoUpdate=t.matrixWorldAutoUpdate,this.matrixWorldNeedsUpdate=t.matrixWorldNeedsUpdate,this.layers.mask=t.layers.mask,this.visible=t.visible,this.castShadow=t.castShadow,this.receiveShadow=t.receiveShadow,this.frustumCulled=t.frustumCulled,this.renderOrder=t.renderOrder,this.animations=t.animations.slice(),this.userData=JSON.parse(JSON.stringify(t.userData)),e===!0)for(let i=0;i<t.children.length;i++){const r=t.children[i];this.add(r.clone())}return this}}xe.DEFAULT_UP=new B(0,1,0);xe.DEFAULT_MATRIX_AUTO_UPDATE=!0;xe.DEFAULT_MATRIX_WORLD_AUTO_UPDATE=!0;const ke=new B,on=new B,$r=new B,cn=new B,ni=new B,ii=new B,ao=new B,Zr=new B,Kr=new B,jr=new B,Jr=new ae,Qr=new ae,ta=new ae;class qe{constructor(t=new B,e=new B,i=new B){this.a=t,this.b=e,this.c=i}static getNormal(t,e,i,r){r.subVectors(i,e),ke.subVectors(t,e),r.cross(ke);const a=r.lengthSq();return a>0?r.multiplyScalar(1/Math.sqrt(a)):r.set(0,0,0)}static getBarycoord(t,e,i,r,a){ke.subVectors(r,e),on.subVectors(i,e),$r.subVectors(t,e);const o=ke.dot(ke),s=ke.dot(on),c=ke.dot($r),l=on.dot(on),h=on.dot($r),u=o*l-s*s;if(u===0)return a.set(0,0,0),null;const d=1/u,p=(l*c-s*h)*d,_=(o*h-s*c)*d;return a.set(1-p-_,_,p)}static containsPoint(t,e,i,r){return this.getBarycoord(t,e,i,r,cn)===null?!1:cn.x>=0&&cn.y>=0&&cn.x+cn.y<=1}static getInterpolation(t,e,i,r,a,o,s,c){return this.getBarycoord(t,e,i,r,cn)===null?(c.x=0,c.y=0,"z"in c&&(c.z=0),"w"in c&&(c.w=0),null):(c.setScalar(0),c.addScaledVector(a,cn.x),c.addScaledVector(o,cn.y),c.addScaledVector(s,cn.z),c)}static getInterpolatedAttribute(t,e,i,r,a,o){return Jr.setScalar(0),Qr.setScalar(0),ta.setScalar(0),Jr.fromBufferAttribute(t,e),Qr.fromBufferAttribute(t,i),ta.fromBufferAttribute(t,r),o.setScalar(0),o.addScaledVector(Jr,a.x),o.addScaledVector(Qr,a.y),o.addScaledVector(ta,a.z),o}static isFrontFacing(t,e,i,r){return ke.subVectors(i,e),on.subVectors(t,e),ke.cross(on).dot(r)<0}set(t,e,i){return this.a.copy(t),this.b.copy(e),this.c.copy(i),this}setFromPointsAndIndices(t,e,i,r){return this.a.copy(t[e]),this.b.copy(t[i]),this.c.copy(t[r]),this}setFromAttributeAndIndices(t,e,i,r){return this.a.fromBufferAttribute(t,e),this.b.fromBufferAttribute(t,i),this.c.fromBufferAttribute(t,r),this}clone(){return new this.constructor().copy(this)}copy(t){return this.a.copy(t.a),this.b.copy(t.b),this.c.copy(t.c),this}getArea(){return ke.subVectors(this.c,this.b),on.subVectors(this.a,this.b),ke.cross(on).length()*.5}getMidpoint(t){return t.addVectors(this.a,this.b).add(this.c).multiplyScalar(1/3)}getNormal(t){return qe.getNormal(this.a,this.b,this.c,t)}getPlane(t){return t.setFromCoplanarPoints(this.a,this.b,this.c)}getBarycoord(t,e){return qe.getBarycoord(t,this.a,this.b,this.c,e)}getInterpolation(t,e,i,r,a){return qe.getInterpolation(t,this.a,this.b,this.c,e,i,r,a)}containsPoint(t){return qe.containsPoint(t,this.a,this.b,this.c)}isFrontFacing(t){return qe.isFrontFacing(this.a,this.b,this.c,t)}intersectsBox(t){return t.intersectsTriangle(this)}closestPointToPoint(t,e){const i=this.a,r=this.b,a=this.c;let o,s;ni.subVectors(r,i),ii.subVectors(a,i),Zr.subVectors(t,i);const c=ni.dot(Zr),l=ii.dot(Zr);if(c<=0&&l<=0)return e.copy(i);Kr.subVectors(t,r);const h=ni.dot(Kr),u=ii.dot(Kr);if(h>=0&&u<=h)return e.copy(r);const d=c*u-h*l;if(d<=0&&c>=0&&h<=0)return o=c/(c-h),e.copy(i).addScaledVector(ni,o);jr.subVectors(t,a);const p=ni.dot(jr),_=ii.dot(jr);if(_>=0&&p<=_)return e.copy(a);const v=p*l-c*_;if(v<=0&&l>=0&&_<=0)return s=l/(l-_),e.copy(i).addScaledVector(ii,s);const m=h*_-p*u;if(m<=0&&u-h>=0&&p-_>=0)return ao.subVectors(a,r),s=(u-h)/(u-h+(p-_)),e.copy(r).addScaledVector(ao,s);const f=1/(m+v+d);return o=v*f,s=d*f,e.copy(i).addScaledVector(ni,o).addScaledVector(ii,s)}equals(t){return t.a.equals(this.a)&&t.b.equals(this.b)&&t.c.equals(this.c)}}const Mc={aliceblue:15792383,antiquewhite:16444375,aqua:65535,aquamarine:8388564,azure:15794175,beige:16119260,bisque:16770244,black:0,blanchedalmond:16772045,blue:255,blueviolet:9055202,brown:10824234,burlywood:14596231,cadetblue:6266528,chartreuse:8388352,chocolate:13789470,coral:16744272,cornflowerblue:6591981,cornsilk:16775388,crimson:14423100,cyan:65535,darkblue:139,darkcyan:35723,darkgoldenrod:12092939,darkgray:11119017,darkgreen:25600,darkgrey:11119017,darkkhaki:12433259,darkmagenta:9109643,darkolivegreen:5597999,darkorange:16747520,darkorchid:10040012,darkred:9109504,darksalmon:15308410,darkseagreen:9419919,darkslateblue:4734347,darkslategray:3100495,darkslategrey:3100495,darkturquoise:52945,darkviolet:9699539,deeppink:16716947,deepskyblue:49151,dimgray:6908265,dimgrey:6908265,dodgerblue:2003199,firebrick:11674146,floralwhite:16775920,forestgreen:2263842,fuchsia:16711935,gainsboro:14474460,ghostwhite:16316671,gold:16766720,goldenrod:14329120,gray:8421504,green:32768,greenyellow:11403055,grey:8421504,honeydew:15794160,hotpink:16738740,indianred:13458524,indigo:4915330,ivory:16777200,khaki:15787660,lavender:15132410,lavenderblush:16773365,lawngreen:8190976,lemonchiffon:16775885,lightblue:11393254,lightcoral:15761536,lightcyan:14745599,lightgoldenrodyellow:16448210,lightgray:13882323,lightgreen:9498256,lightgrey:13882323,lightpink:16758465,lightsalmon:16752762,lightseagreen:2142890,lightskyblue:8900346,lightslategray:7833753,lightslategrey:7833753,lightsteelblue:11584734,lightyellow:16777184,lime:65280,limegreen:3329330,linen:16445670,magenta:16711935,maroon:8388608,mediumaquamarine:6737322,mediumblue:205,mediumorchid:12211667,mediumpurple:9662683,mediumseagreen:3978097,mediumslateblue:8087790,mediumspringgreen:64154,mediumturquoise:4772300,mediumvioletred:13047173,midnightblue:1644912,mintcream:16121850,mistyrose:16770273,moccasin:16770229,navajowhite:16768685,navy:128,oldlace:16643558,olive:8421376,olivedrab:7048739,orange:16753920,orangered:16729344,orchid:14315734,palegoldenrod:15657130,palegreen:10025880,paleturquoise:11529966,palevioletred:14381203,papayawhip:16773077,peachpuff:16767673,peru:13468991,pink:16761035,plum:14524637,powderblue:11591910,purple:8388736,rebeccapurple:6697881,red:16711680,rosybrown:12357519,royalblue:4286945,saddlebrown:9127187,salmon:16416882,sandybrown:16032864,seagreen:3050327,seashell:16774638,sienna:10506797,silver:12632256,skyblue:8900331,slateblue:6970061,slategray:7372944,slategrey:7372944,snow:16775930,springgreen:65407,steelblue:4620980,tan:13808780,teal:32896,thistle:14204888,tomato:16737095,turquoise:4251856,violet:15631086,wheat:16113331,white:16777215,whitesmoke:16119285,yellow:16776960,yellowgreen:10145074},xn={h:0,s:0,l:0},ir={h:0,s:0,l:0};function ea(n,t,e){return e<0&&(e+=1),e>1&&(e-=1),e<1/6?n+(t-n)*6*e:e<1/2?t:e<2/3?n+(t-n)*6*(2/3-e):n}class Ft{constructor(t,e,i){return this.isColor=!0,this.r=1,this.g=1,this.b=1,this.set(t,e,i)}set(t,e,i){if(e===void 0&&i===void 0){const r=t;r&&r.isColor?this.copy(r):typeof r=="number"?this.setHex(r):typeof r=="string"&&this.setStyle(r)}else this.setRGB(t,e,i);return this}setScalar(t){return this.r=t,this.g=t,this.b=t,this}setHex(t,e=Fe){return t=Math.floor(t),this.r=(t>>16&255)/255,this.g=(t>>8&255)/255,this.b=(t&255)/255,Wt.toWorkingColorSpace(this,e),this}setRGB(t,e,i,r=Wt.workingColorSpace){return this.r=t,this.g=e,this.b=i,Wt.toWorkingColorSpace(this,r),this}setHSL(t,e,i,r=Wt.workingColorSpace){if(t=vs(t,1),e=Ut(e,0,1),i=Ut(i,0,1),e===0)this.r=this.g=this.b=i;else{const a=i<=.5?i*(1+e):i+e-i*e,o=2*i-a;this.r=ea(o,a,t+1/3),this.g=ea(o,a,t),this.b=ea(o,a,t-1/3)}return Wt.toWorkingColorSpace(this,r),this}setStyle(t,e=Fe){function i(a){a!==void 0&&parseFloat(a)<1&&console.warn("THREE.Color: Alpha component of "+t+" will be ignored.")}let r;if(r=/^(\w+)\(([^\)]*)\)/.exec(t)){let a;const o=r[1],s=r[2];switch(o){case"rgb":case"rgba":if(a=/^\s*(\d+)\s*,\s*(\d+)\s*,\s*(\d+)\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(s))return i(a[4]),this.setRGB(Math.min(255,parseInt(a[1],10))/255,Math.min(255,parseInt(a[2],10))/255,Math.min(255,parseInt(a[3],10))/255,e);if(a=/^\s*(\d+)\%\s*,\s*(\d+)\%\s*,\s*(\d+)\%\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(s))return i(a[4]),this.setRGB(Math.min(100,parseInt(a[1],10))/100,Math.min(100,parseInt(a[2],10))/100,Math.min(100,parseInt(a[3],10))/100,e);break;case"hsl":case"hsla":if(a=/^\s*(\d*\.?\d+)\s*,\s*(\d*\.?\d+)\%\s*,\s*(\d*\.?\d+)\%\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(s))return i(a[4]),this.setHSL(parseFloat(a[1])/360,parseFloat(a[2])/100,parseFloat(a[3])/100,e);break;default:console.warn("THREE.Color: Unknown color model "+t)}}else if(r=/^\#([A-Fa-f\d]+)$/.exec(t)){const a=r[1],o=a.length;if(o===3)return this.setRGB(parseInt(a.charAt(0),16)/15,parseInt(a.charAt(1),16)/15,parseInt(a.charAt(2),16)/15,e);if(o===6)return this.setHex(parseInt(a,16),e);console.warn("THREE.Color: Invalid hex color "+t)}else if(t&&t.length>0)return this.setColorName(t,e);return this}setColorName(t,e=Fe){const i=Mc[t.toLowerCase()];return i!==void 0?this.setHex(i,e):console.warn("THREE.Color: Unknown color "+t),this}clone(){return new this.constructor(this.r,this.g,this.b)}copy(t){return this.r=t.r,this.g=t.g,this.b=t.b,this}copySRGBToLinear(t){return this.r=fn(t.r),this.g=fn(t.g),this.b=fn(t.b),this}copyLinearToSRGB(t){return this.r=di(t.r),this.g=di(t.g),this.b=di(t.b),this}convertSRGBToLinear(){return this.copySRGBToLinear(this),this}convertLinearToSRGB(){return this.copyLinearToSRGB(this),this}getHex(t=Fe){return Wt.fromWorkingColorSpace(ve.copy(this),t),Math.round(Ut(ve.r*255,0,255))*65536+Math.round(Ut(ve.g*255,0,255))*256+Math.round(Ut(ve.b*255,0,255))}getHexString(t=Fe){return("000000"+this.getHex(t).toString(16)).slice(-6)}getHSL(t,e=Wt.workingColorSpace){Wt.fromWorkingColorSpace(ve.copy(this),e);const i=ve.r,r=ve.g,a=ve.b,o=Math.max(i,r,a),s=Math.min(i,r,a);let c,l;const h=(s+o)/2;if(s===o)c=0,l=0;else{const u=o-s;switch(l=h<=.5?u/(o+s):u/(2-o-s),o){case i:c=(r-a)/u+(r<a?6:0);break;case r:c=(a-i)/u+2;break;case a:c=(i-r)/u+4;break}c/=6}return t.h=c,t.s=l,t.l=h,t}getRGB(t,e=Wt.workingColorSpace){return Wt.fromWorkingColorSpace(ve.copy(this),e),t.r=ve.r,t.g=ve.g,t.b=ve.b,t}getStyle(t=Fe){Wt.fromWorkingColorSpace(ve.copy(this),t);const e=ve.r,i=ve.g,r=ve.b;return t!==Fe?`color(${t} ${e.toFixed(3)} ${i.toFixed(3)} ${r.toFixed(3)})`:`rgb(${Math.round(e*255)},${Math.round(i*255)},${Math.round(r*255)})`}offsetHSL(t,e,i){return this.getHSL(xn),this.setHSL(xn.h+t,xn.s+e,xn.l+i)}add(t){return this.r+=t.r,this.g+=t.g,this.b+=t.b,this}addColors(t,e){return this.r=t.r+e.r,this.g=t.g+e.g,this.b=t.b+e.b,this}addScalar(t){return this.r+=t,this.g+=t,this.b+=t,this}sub(t){return this.r=Math.max(0,this.r-t.r),this.g=Math.max(0,this.g-t.g),this.b=Math.max(0,this.b-t.b),this}multiply(t){return this.r*=t.r,this.g*=t.g,this.b*=t.b,this}multiplyScalar(t){return this.r*=t,this.g*=t,this.b*=t,this}lerp(t,e){return this.r+=(t.r-this.r)*e,this.g+=(t.g-this.g)*e,this.b+=(t.b-this.b)*e,this}lerpColors(t,e,i){return this.r=t.r+(e.r-t.r)*i,this.g=t.g+(e.g-t.g)*i,this.b=t.b+(e.b-t.b)*i,this}lerpHSL(t,e){this.getHSL(xn),t.getHSL(ir);const i=Ui(xn.h,ir.h,e),r=Ui(xn.s,ir.s,e),a=Ui(xn.l,ir.l,e);return this.setHSL(i,r,a),this}setFromVector3(t){return this.r=t.x,this.g=t.y,this.b=t.z,this}applyMatrix3(t){const e=this.r,i=this.g,r=this.b,a=t.elements;return this.r=a[0]*e+a[3]*i+a[6]*r,this.g=a[1]*e+a[4]*i+a[7]*r,this.b=a[2]*e+a[5]*i+a[8]*r,this}equals(t){return t.r===this.r&&t.g===this.g&&t.b===this.b}fromArray(t,e=0){return this.r=t[e],this.g=t[e+1],this.b=t[e+2],this}toArray(t=[],e=0){return t[e]=this.r,t[e+1]=this.g,t[e+2]=this.b,t}fromBufferAttribute(t,e){return this.r=t.getX(e),this.g=t.getY(e),this.b=t.getZ(e),this}toJSON(){return this.getHex()}*[Symbol.iterator](){yield this.r,yield this.g,yield this.b}}const ve=new Ft;Ft.NAMES=Mc;let Yh=0;class Ti extends Ei{constructor(){super(),this.isMaterial=!0,Object.defineProperty(this,"id",{value:Yh++}),this.uuid=yi(),this.name="",this.type="Material",this.blending=hi,this.side=bn,this.vertexColors=!1,this.opacity=1,this.transparent=!1,this.alphaHash=!1,this.blendSrc=va,this.blendDst=xa,this.blendEquation=Bn,this.blendSrcAlpha=null,this.blendDstAlpha=null,this.blendEquationAlpha=null,this.blendColor=new Ft(0,0,0),this.blendAlpha=0,this.depthFunc=mi,this.depthTest=!0,this.depthWrite=!0,this.stencilWriteMask=255,this.stencilFunc=Ws,this.stencilRef=0,this.stencilFuncMask=255,this.stencilFail=$n,this.stencilZFail=$n,this.stencilZPass=$n,this.stencilWrite=!1,this.clippingPlanes=null,this.clipIntersection=!1,this.clipShadows=!1,this.shadowSide=null,this.colorWrite=!0,this.precision=null,this.polygonOffset=!1,this.polygonOffsetFactor=0,this.polygonOffsetUnits=0,this.dithering=!1,this.alphaToCoverage=!1,this.premultipliedAlpha=!1,this.forceSinglePass=!1,this.visible=!0,this.toneMapped=!0,this.userData={},this.version=0,this._alphaTest=0}get alphaTest(){return this._alphaTest}set alphaTest(t){this._alphaTest>0!=t>0&&this.version++,this._alphaTest=t}onBeforeRender(){}onBeforeCompile(){}customProgramCacheKey(){return this.onBeforeCompile.toString()}setValues(t){if(t!==void 0)for(const e in t){const i=t[e];if(i===void 0){console.warn(`THREE.Material: parameter '${e}' has value of undefined.`);continue}const r=this[e];if(r===void 0){console.warn(`THREE.Material: '${e}' is not a property of THREE.${this.type}.`);continue}r&&r.isColor?r.set(i):r&&r.isVector3&&i&&i.isVector3?r.copy(i):this[e]=i}}toJSON(t){const e=t===void 0||typeof t=="string";e&&(t={textures:{},images:{}});const i={metadata:{version:4.6,type:"Material",generator:"Material.toJSON"}};i.uuid=this.uuid,i.type=this.type,this.name!==""&&(i.name=this.name),this.color&&this.color.isColor&&(i.color=this.color.getHex()),this.roughness!==void 0&&(i.roughness=this.roughness),this.metalness!==void 0&&(i.metalness=this.metalness),this.sheen!==void 0&&(i.sheen=this.sheen),this.sheenColor&&this.sheenColor.isColor&&(i.sheenColor=this.sheenColor.getHex()),this.sheenRoughness!==void 0&&(i.sheenRoughness=this.sheenRoughness),this.emissive&&this.emissive.isColor&&(i.emissive=this.emissive.getHex()),this.emissiveIntensity!==void 0&&this.emissiveIntensity!==1&&(i.emissiveIntensity=this.emissiveIntensity),this.specular&&this.specular.isColor&&(i.specular=this.specular.getHex()),this.specularIntensity!==void 0&&(i.specularIntensity=this.specularIntensity),this.specularColor&&this.specularColor.isColor&&(i.specularColor=this.specularColor.getHex()),this.shininess!==void 0&&(i.shininess=this.shininess),this.clearcoat!==void 0&&(i.clearcoat=this.clearcoat),this.clearcoatRoughness!==void 0&&(i.clearcoatRoughness=this.clearcoatRoughness),this.clearcoatMap&&this.clearcoatMap.isTexture&&(i.clearcoatMap=this.clearcoatMap.toJSON(t).uuid),this.clearcoatRoughnessMap&&this.clearcoatRoughnessMap.isTexture&&(i.clearcoatRoughnessMap=this.clearcoatRoughnessMap.toJSON(t).uuid),this.clearcoatNormalMap&&this.clearcoatNormalMap.isTexture&&(i.clearcoatNormalMap=this.clearcoatNormalMap.toJSON(t).uuid,i.clearcoatNormalScale=this.clearcoatNormalScale.toArray()),this.dispersion!==void 0&&(i.dispersion=this.dispersion),this.iridescence!==void 0&&(i.iridescence=this.iridescence),this.iridescenceIOR!==void 0&&(i.iridescenceIOR=this.iridescenceIOR),this.iridescenceThicknessRange!==void 0&&(i.iridescenceThicknessRange=this.iridescenceThicknessRange),this.iridescenceMap&&this.iridescenceMap.isTexture&&(i.iridescenceMap=this.iridescenceMap.toJSON(t).uuid),this.iridescenceThicknessMap&&this.iridescenceThicknessMap.isTexture&&(i.iridescenceThicknessMap=this.iridescenceThicknessMap.toJSON(t).uuid),this.anisotropy!==void 0&&(i.anisotropy=this.anisotropy),this.anisotropyRotation!==void 0&&(i.anisotropyRotation=this.anisotropyRotation),this.anisotropyMap&&this.anisotropyMap.isTexture&&(i.anisotropyMap=this.anisotropyMap.toJSON(t).uuid),this.map&&this.map.isTexture&&(i.map=this.map.toJSON(t).uuid),this.matcap&&this.matcap.isTexture&&(i.matcap=this.matcap.toJSON(t).uuid),this.alphaMap&&this.alphaMap.isTexture&&(i.alphaMap=this.alphaMap.toJSON(t).uuid),this.lightMap&&this.lightMap.isTexture&&(i.lightMap=this.lightMap.toJSON(t).uuid,i.lightMapIntensity=this.lightMapIntensity),this.aoMap&&this.aoMap.isTexture&&(i.aoMap=this.aoMap.toJSON(t).uuid,i.aoMapIntensity=this.aoMapIntensity),this.bumpMap&&this.bumpMap.isTexture&&(i.bumpMap=this.bumpMap.toJSON(t).uuid,i.bumpScale=this.bumpScale),this.normalMap&&this.normalMap.isTexture&&(i.normalMap=this.normalMap.toJSON(t).uuid,i.normalMapType=this.normalMapType,i.normalScale=this.normalScale.toArray()),this.displacementMap&&this.displacementMap.isTexture&&(i.displacementMap=this.displacementMap.toJSON(t).uuid,i.displacementScale=this.displacementScale,i.displacementBias=this.displacementBias),this.roughnessMap&&this.roughnessMap.isTexture&&(i.roughnessMap=this.roughnessMap.toJSON(t).uuid),this.metalnessMap&&this.metalnessMap.isTexture&&(i.metalnessMap=this.metalnessMap.toJSON(t).uuid),this.emissiveMap&&this.emissiveMap.isTexture&&(i.emissiveMap=this.emissiveMap.toJSON(t).uuid),this.specularMap&&this.specularMap.isTexture&&(i.specularMap=this.specularMap.toJSON(t).uuid),this.specularIntensityMap&&this.specularIntensityMap.isTexture&&(i.specularIntensityMap=this.specularIntensityMap.toJSON(t).uuid),this.specularColorMap&&this.specularColorMap.isTexture&&(i.specularColorMap=this.specularColorMap.toJSON(t).uuid),this.envMap&&this.envMap.isTexture&&(i.envMap=this.envMap.toJSON(t).uuid,this.combine!==void 0&&(i.combine=this.combine)),this.envMapRotation!==void 0&&(i.envMapRotation=this.envMapRotation.toArray()),this.envMapIntensity!==void 0&&(i.envMapIntensity=this.envMapIntensity),this.reflectivity!==void 0&&(i.reflectivity=this.reflectivity),this.refractionRatio!==void 0&&(i.refractionRatio=this.refractionRatio),this.gradientMap&&this.gradientMap.isTexture&&(i.gradientMap=this.gradientMap.toJSON(t).uuid),this.transmission!==void 0&&(i.transmission=this.transmission),this.transmissionMap&&this.transmissionMap.isTexture&&(i.transmissionMap=this.transmissionMap.toJSON(t).uuid),this.thickness!==void 0&&(i.thickness=this.thickness),this.thicknessMap&&this.thicknessMap.isTexture&&(i.thicknessMap=this.thicknessMap.toJSON(t).uuid),this.attenuationDistance!==void 0&&this.attenuationDistance!==1/0&&(i.attenuationDistance=this.attenuationDistance),this.attenuationColor!==void 0&&(i.attenuationColor=this.attenuationColor.getHex()),this.size!==void 0&&(i.size=this.size),this.shadowSide!==null&&(i.shadowSide=this.shadowSide),this.sizeAttenuation!==void 0&&(i.sizeAttenuation=this.sizeAttenuation),this.blending!==hi&&(i.blending=this.blending),this.side!==bn&&(i.side=this.side),this.vertexColors===!0&&(i.vertexColors=!0),this.opacity<1&&(i.opacity=this.opacity),this.transparent===!0&&(i.transparent=!0),this.blendSrc!==va&&(i.blendSrc=this.blendSrc),this.blendDst!==xa&&(i.blendDst=this.blendDst),this.blendEquation!==Bn&&(i.blendEquation=this.blendEquation),this.blendSrcAlpha!==null&&(i.blendSrcAlpha=this.blendSrcAlpha),this.blendDstAlpha!==null&&(i.blendDstAlpha=this.blendDstAlpha),this.blendEquationAlpha!==null&&(i.blendEquationAlpha=this.blendEquationAlpha),this.blendColor&&this.blendColor.isColor&&(i.blendColor=this.blendColor.getHex()),this.blendAlpha!==0&&(i.blendAlpha=this.blendAlpha),this.depthFunc!==mi&&(i.depthFunc=this.depthFunc),this.depthTest===!1&&(i.depthTest=this.depthTest),this.depthWrite===!1&&(i.depthWrite=this.depthWrite),this.colorWrite===!1&&(i.colorWrite=this.colorWrite),this.stencilWriteMask!==255&&(i.stencilWriteMask=this.stencilWriteMask),this.stencilFunc!==Ws&&(i.stencilFunc=this.stencilFunc),this.stencilRef!==0&&(i.stencilRef=this.stencilRef),this.stencilFuncMask!==255&&(i.stencilFuncMask=this.stencilFuncMask),this.stencilFail!==$n&&(i.stencilFail=this.stencilFail),this.stencilZFail!==$n&&(i.stencilZFail=this.stencilZFail),this.stencilZPass!==$n&&(i.stencilZPass=this.stencilZPass),this.stencilWrite===!0&&(i.stencilWrite=this.stencilWrite),this.rotation!==void 0&&this.rotation!==0&&(i.rotation=this.rotation),this.polygonOffset===!0&&(i.polygonOffset=!0),this.polygonOffsetFactor!==0&&(i.polygonOffsetFactor=this.polygonOffsetFactor),this.polygonOffsetUnits!==0&&(i.polygonOffsetUnits=this.polygonOffsetUnits),this.linewidth!==void 0&&this.linewidth!==1&&(i.linewidth=this.linewidth),this.dashSize!==void 0&&(i.dashSize=this.dashSize),this.gapSize!==void 0&&(i.gapSize=this.gapSize),this.scale!==void 0&&(i.scale=this.scale),this.dithering===!0&&(i.dithering=!0),this.alphaTest>0&&(i.alphaTest=this.alphaTest),this.alphaHash===!0&&(i.alphaHash=!0),this.alphaToCoverage===!0&&(i.alphaToCoverage=!0),this.premultipliedAlpha===!0&&(i.premultipliedAlpha=!0),this.forceSinglePass===!0&&(i.forceSinglePass=!0),this.wireframe===!0&&(i.wireframe=!0),this.wireframeLinewidth>1&&(i.wireframeLinewidth=this.wireframeLinewidth),this.wireframeLinecap!=="round"&&(i.wireframeLinecap=this.wireframeLinecap),this.wireframeLinejoin!=="round"&&(i.wireframeLinejoin=this.wireframeLinejoin),this.flatShading===!0&&(i.flatShading=!0),this.visible===!1&&(i.visible=!1),this.toneMapped===!1&&(i.toneMapped=!1),this.fog===!1&&(i.fog=!1),Object.keys(this.userData).length>0&&(i.userData=this.userData);function r(a){const o=[];for(const s in a){const c=a[s];delete c.metadata,o.push(c)}return o}if(e){const a=r(t.textures),o=r(t.images);a.length>0&&(i.textures=a),o.length>0&&(i.images=o)}return i}clone(){return new this.constructor().copy(this)}copy(t){this.name=t.name,this.blending=t.blending,this.side=t.side,this.vertexColors=t.vertexColors,this.opacity=t.opacity,this.transparent=t.transparent,this.blendSrc=t.blendSrc,this.blendDst=t.blendDst,this.blendEquation=t.blendEquation,this.blendSrcAlpha=t.blendSrcAlpha,this.blendDstAlpha=t.blendDstAlpha,this.blendEquationAlpha=t.blendEquationAlpha,this.blendColor.copy(t.blendColor),this.blendAlpha=t.blendAlpha,this.depthFunc=t.depthFunc,this.depthTest=t.depthTest,this.depthWrite=t.depthWrite,this.stencilWriteMask=t.stencilWriteMask,this.stencilFunc=t.stencilFunc,this.stencilRef=t.stencilRef,this.stencilFuncMask=t.stencilFuncMask,this.stencilFail=t.stencilFail,this.stencilZFail=t.stencilZFail,this.stencilZPass=t.stencilZPass,this.stencilWrite=t.stencilWrite;const e=t.clippingPlanes;let i=null;if(e!==null){const r=e.length;i=new Array(r);for(let a=0;a!==r;++a)i[a]=e[a].clone()}return this.clippingPlanes=i,this.clipIntersection=t.clipIntersection,this.clipShadows=t.clipShadows,this.shadowSide=t.shadowSide,this.colorWrite=t.colorWrite,this.precision=t.precision,this.polygonOffset=t.polygonOffset,this.polygonOffsetFactor=t.polygonOffsetFactor,this.polygonOffsetUnits=t.polygonOffsetUnits,this.dithering=t.dithering,this.alphaTest=t.alphaTest,this.alphaHash=t.alphaHash,this.alphaToCoverage=t.alphaToCoverage,this.premultipliedAlpha=t.premultipliedAlpha,this.forceSinglePass=t.forceSinglePass,this.visible=t.visible,this.toneMapped=t.toneMapped,this.userData=JSON.parse(JSON.stringify(t.userData)),this}dispose(){this.dispatchEvent({type:"dispose"})}set needsUpdate(t){t===!0&&this.version++}onBuild(){console.warn("Material: onBuild() has been removed.")}}class Sc extends Ti{constructor(t){super(),this.isMeshBasicMaterial=!0,this.type="MeshBasicMaterial",this.color=new Ft(16777215),this.map=null,this.lightMap=null,this.lightMapIntensity=1,this.aoMap=null,this.aoMapIntensity=1,this.specularMap=null,this.alphaMap=null,this.envMap=null,this.envMapRotation=new Ze,this.combine=us,this.reflectivity=1,this.refractionRatio=.98,this.wireframe=!1,this.wireframeLinewidth=1,this.wireframeLinecap="round",this.wireframeLinejoin="round",this.fog=!0,this.setValues(t)}copy(t){return super.copy(t),this.color.copy(t.color),this.map=t.map,this.lightMap=t.lightMap,this.lightMapIntensity=t.lightMapIntensity,this.aoMap=t.aoMap,this.aoMapIntensity=t.aoMapIntensity,this.specularMap=t.specularMap,this.alphaMap=t.alphaMap,this.envMap=t.envMap,this.envMapRotation.copy(t.envMapRotation),this.combine=t.combine,this.reflectivity=t.reflectivity,this.refractionRatio=t.refractionRatio,this.wireframe=t.wireframe,this.wireframeLinewidth=t.wireframeLinewidth,this.wireframeLinecap=t.wireframeLinecap,this.wireframeLinejoin=t.wireframeLinejoin,this.fog=t.fog,this}}const le=new B,rr=new Yt;let $h=0;class Qe{constructor(t,e,i=!1){if(Array.isArray(t))throw new TypeError("THREE.BufferAttribute: array should be a Typed Array.");this.isBufferAttribute=!0,Object.defineProperty(this,"id",{value:$h++}),this.name="",this.array=t,this.itemSize=e,this.count=t!==void 0?t.length/e:0,this.normalized=i,this.usage=Xs,this.updateRanges=[],this.gpuType=un,this.version=0}onUploadCallback(){}set needsUpdate(t){t===!0&&this.version++}setUsage(t){return this.usage=t,this}addUpdateRange(t,e){this.updateRanges.push({start:t,count:e})}clearUpdateRanges(){this.updateRanges.length=0}copy(t){return this.name=t.name,this.array=new t.array.constructor(t.array),this.itemSize=t.itemSize,this.count=t.count,this.normalized=t.normalized,this.usage=t.usage,this.gpuType=t.gpuType,this}copyAt(t,e,i){t*=this.itemSize,i*=e.itemSize;for(let r=0,a=this.itemSize;r<a;r++)this.array[t+r]=e.array[i+r];return this}copyArray(t){return this.array.set(t),this}applyMatrix3(t){if(this.itemSize===2)for(let e=0,i=this.count;e<i;e++)rr.fromBufferAttribute(this,e),rr.applyMatrix3(t),this.setXY(e,rr.x,rr.y);else if(this.itemSize===3)for(let e=0,i=this.count;e<i;e++)le.fromBufferAttribute(this,e),le.applyMatrix3(t),this.setXYZ(e,le.x,le.y,le.z);return this}applyMatrix4(t){for(let e=0,i=this.count;e<i;e++)le.fromBufferAttribute(this,e),le.applyMatrix4(t),this.setXYZ(e,le.x,le.y,le.z);return this}applyNormalMatrix(t){for(let e=0,i=this.count;e<i;e++)le.fromBufferAttribute(this,e),le.applyNormalMatrix(t),this.setXYZ(e,le.x,le.y,le.z);return this}transformDirection(t){for(let e=0,i=this.count;e<i;e++)le.fromBufferAttribute(this,e),le.transformDirection(t),this.setXYZ(e,le.x,le.y,le.z);return this}set(t,e=0){return this.array.set(t,e),this}getComponent(t,e){let i=this.array[t*this.itemSize+e];return this.normalized&&(i=ci(i,this.array)),i}setComponent(t,e,i){return this.normalized&&(i=Se(i,this.array)),this.array[t*this.itemSize+e]=i,this}getX(t){let e=this.array[t*this.itemSize];return this.normalized&&(e=ci(e,this.array)),e}setX(t,e){return this.normalized&&(e=Se(e,this.array)),this.array[t*this.itemSize]=e,this}getY(t){let e=this.array[t*this.itemSize+1];return this.normalized&&(e=ci(e,this.array)),e}setY(t,e){return this.normalized&&(e=Se(e,this.array)),this.array[t*this.itemSize+1]=e,this}getZ(t){let e=this.array[t*this.itemSize+2];return this.normalized&&(e=ci(e,this.array)),e}setZ(t,e){return this.normalized&&(e=Se(e,this.array)),this.array[t*this.itemSize+2]=e,this}getW(t){let e=this.array[t*this.itemSize+3];return this.normalized&&(e=ci(e,this.array)),e}setW(t,e){return this.normalized&&(e=Se(e,this.array)),this.array[t*this.itemSize+3]=e,this}setXY(t,e,i){return t*=this.itemSize,this.normalized&&(e=Se(e,this.array),i=Se(i,this.array)),this.array[t+0]=e,this.array[t+1]=i,this}setXYZ(t,e,i,r){return t*=this.itemSize,this.normalized&&(e=Se(e,this.array),i=Se(i,this.array),r=Se(r,this.array)),this.array[t+0]=e,this.array[t+1]=i,this.array[t+2]=r,this}setXYZW(t,e,i,r,a){return t*=this.itemSize,this.normalized&&(e=Se(e,this.array),i=Se(i,this.array),r=Se(r,this.array),a=Se(a,this.array)),this.array[t+0]=e,this.array[t+1]=i,this.array[t+2]=r,this.array[t+3]=a,this}onUpload(t){return this.onUploadCallback=t,this}clone(){return new this.constructor(this.array,this.itemSize).copy(this)}toJSON(){const t={itemSize:this.itemSize,type:this.array.constructor.name,array:Array.from(this.array),normalized:this.normalized};return this.name!==""&&(t.name=this.name),this.usage!==Xs&&(t.usage=this.usage),t}}class Ec extends Qe{constructor(t,e,i){super(new Uint16Array(t),e,i)}}class yc extends Qe{constructor(t,e,i){super(new Uint32Array(t),e,i)}}class tn extends Qe{constructor(t,e,i){super(new Float32Array(t),e,i)}}let Zh=0;const Ue=new se,na=new xe,ri=new B,Ce=new ki,Pi=new ki,fe=new B;class wn extends Ei{constructor(){super(),this.isBufferGeometry=!0,Object.defineProperty(this,"id",{value:Zh++}),this.uuid=yi(),this.name="",this.type="BufferGeometry",this.index=null,this.indirect=null,this.attributes={},this.morphAttributes={},this.morphTargetsRelative=!1,this.groups=[],this.boundingBox=null,this.boundingSphere=null,this.drawRange={start:0,count:1/0},this.userData={}}getIndex(){return this.index}setIndex(t){return Array.isArray(t)?this.index=new(_c(t)?yc:Ec)(t,1):this.index=t,this}setIndirect(t){return this.indirect=t,this}getIndirect(){return this.indirect}getAttribute(t){return this.attributes[t]}setAttribute(t,e){return this.attributes[t]=e,this}deleteAttribute(t){return delete this.attributes[t],this}hasAttribute(t){return this.attributes[t]!==void 0}addGroup(t,e,i=0){this.groups.push({start:t,count:e,materialIndex:i})}clearGroups(){this.groups=[]}setDrawRange(t,e){this.drawRange.start=t,this.drawRange.count=e}applyMatrix4(t){const e=this.attributes.position;e!==void 0&&(e.applyMatrix4(t),e.needsUpdate=!0);const i=this.attributes.normal;if(i!==void 0){const a=new Pt().getNormalMatrix(t);i.applyNormalMatrix(a),i.needsUpdate=!0}const r=this.attributes.tangent;return r!==void 0&&(r.transformDirection(t),r.needsUpdate=!0),this.boundingBox!==null&&this.computeBoundingBox(),this.boundingSphere!==null&&this.computeBoundingSphere(),this}applyQuaternion(t){return Ue.makeRotationFromQuaternion(t),this.applyMatrix4(Ue),this}rotateX(t){return Ue.makeRotationX(t),this.applyMatrix4(Ue),this}rotateY(t){return Ue.makeRotationY(t),this.applyMatrix4(Ue),this}rotateZ(t){return Ue.makeRotationZ(t),this.applyMatrix4(Ue),this}translate(t,e,i){return Ue.makeTranslation(t,e,i),this.applyMatrix4(Ue),this}scale(t,e,i){return Ue.makeScale(t,e,i),this.applyMatrix4(Ue),this}lookAt(t){return na.lookAt(t),na.updateMatrix(),this.applyMatrix4(na.matrix),this}center(){return this.computeBoundingBox(),this.boundingBox.getCenter(ri).negate(),this.translate(ri.x,ri.y,ri.z),this}setFromPoints(t){const e=this.getAttribute("position");if(e===void 0){const i=[];for(let r=0,a=t.length;r<a;r++){const o=t[r];i.push(o.x,o.y,o.z||0)}this.setAttribute("position",new tn(i,3))}else{const i=Math.min(t.length,e.count);for(let r=0;r<i;r++){const a=t[r];e.setXYZ(r,a.x,a.y,a.z||0)}t.length>e.count&&console.warn("THREE.BufferGeometry: Buffer size too small for points data. Use .dispose() and create a new geometry."),e.needsUpdate=!0}return this}computeBoundingBox(){this.boundingBox===null&&(this.boundingBox=new ki);const t=this.attributes.position,e=this.morphAttributes.position;if(t&&t.isGLBufferAttribute){console.error("THREE.BufferGeometry.computeBoundingBox(): GLBufferAttribute requires a manual bounding box.",this),this.boundingBox.set(new B(-1/0,-1/0,-1/0),new B(1/0,1/0,1/0));return}if(t!==void 0){if(this.boundingBox.setFromBufferAttribute(t),e)for(let i=0,r=e.length;i<r;i++){const a=e[i];Ce.setFromBufferAttribute(a),this.morphTargetsRelative?(fe.addVectors(this.boundingBox.min,Ce.min),this.boundingBox.expandByPoint(fe),fe.addVectors(this.boundingBox.max,Ce.max),this.boundingBox.expandByPoint(fe)):(this.boundingBox.expandByPoint(Ce.min),this.boundingBox.expandByPoint(Ce.max))}}else this.boundingBox.makeEmpty();(isNaN(this.boundingBox.min.x)||isNaN(this.boundingBox.min.y)||isNaN(this.boundingBox.min.z))&&console.error('THREE.BufferGeometry.computeBoundingBox(): Computed min/max have NaN values. The "position" attribute is likely to have NaN values.',this)}computeBoundingSphere(){this.boundingSphere===null&&(this.boundingSphere=new Ms);const t=this.attributes.position,e=this.morphAttributes.position;if(t&&t.isGLBufferAttribute){console.error("THREE.BufferGeometry.computeBoundingSphere(): GLBufferAttribute requires a manual bounding sphere.",this),this.boundingSphere.set(new B,1/0);return}if(t){const i=this.boundingSphere.center;if(Ce.setFromBufferAttribute(t),e)for(let a=0,o=e.length;a<o;a++){const s=e[a];Pi.setFromBufferAttribute(s),this.morphTargetsRelative?(fe.addVectors(Ce.min,Pi.min),Ce.expandByPoint(fe),fe.addVectors(Ce.max,Pi.max),Ce.expandByPoint(fe)):(Ce.expandByPoint(Pi.min),Ce.expandByPoint(Pi.max))}Ce.getCenter(i);let r=0;for(let a=0,o=t.count;a<o;a++)fe.fromBufferAttribute(t,a),r=Math.max(r,i.distanceToSquared(fe));if(e)for(let a=0,o=e.length;a<o;a++){const s=e[a],c=this.morphTargetsRelative;for(let l=0,h=s.count;l<h;l++)fe.fromBufferAttribute(s,l),c&&(ri.fromBufferAttribute(t,l),fe.add(ri)),r=Math.max(r,i.distanceToSquared(fe))}this.boundingSphere.radius=Math.sqrt(r),isNaN(this.boundingSphere.radius)&&console.error('THREE.BufferGeometry.computeBoundingSphere(): Computed radius is NaN. The "position" attribute is likely to have NaN values.',this)}}computeTangents(){const t=this.index,e=this.attributes;if(t===null||e.position===void 0||e.normal===void 0||e.uv===void 0){console.error("THREE.BufferGeometry: .computeTangents() failed. Missing required attributes (index, position, normal or uv)");return}const i=e.position,r=e.normal,a=e.uv;this.hasAttribute("tangent")===!1&&this.setAttribute("tangent",new Qe(new Float32Array(4*i.count),4));const o=this.getAttribute("tangent"),s=[],c=[];for(let I=0;I<i.count;I++)s[I]=new B,c[I]=new B;const l=new B,h=new B,u=new B,d=new Yt,p=new Yt,_=new Yt,v=new B,m=new B;function f(I,S,M){l.fromBufferAttribute(i,I),h.fromBufferAttribute(i,S),u.fromBufferAttribute(i,M),d.fromBufferAttribute(a,I),p.fromBufferAttribute(a,S),_.fromBufferAttribute(a,M),h.sub(l),u.sub(l),p.sub(d),_.sub(d);const w=1/(p.x*_.y-_.x*p.y);isFinite(w)&&(v.copy(h).multiplyScalar(_.y).addScaledVector(u,-p.y).multiplyScalar(w),m.copy(u).multiplyScalar(p.x).addScaledVector(h,-_.x).multiplyScalar(w),s[I].add(v),s[S].add(v),s[M].add(v),c[I].add(m),c[S].add(m),c[M].add(m))}let R=this.groups;R.length===0&&(R=[{start:0,count:t.count}]);for(let I=0,S=R.length;I<S;++I){const M=R[I],w=M.start,V=M.count;for(let F=w,W=w+V;F<W;F+=3)f(t.getX(F+0),t.getX(F+1),t.getX(F+2))}const y=new B,E=new B,C=new B,b=new B;function A(I){C.fromBufferAttribute(r,I),b.copy(C);const S=s[I];y.copy(S),y.sub(C.multiplyScalar(C.dot(S))).normalize(),E.crossVectors(b,S);const w=E.dot(c[I])<0?-1:1;o.setXYZW(I,y.x,y.y,y.z,w)}for(let I=0,S=R.length;I<S;++I){const M=R[I],w=M.start,V=M.count;for(let F=w,W=w+V;F<W;F+=3)A(t.getX(F+0)),A(t.getX(F+1)),A(t.getX(F+2))}}computeVertexNormals(){const t=this.index,e=this.getAttribute("position");if(e!==void 0){let i=this.getAttribute("normal");if(i===void 0)i=new Qe(new Float32Array(e.count*3),3),this.setAttribute("normal",i);else for(let d=0,p=i.count;d<p;d++)i.setXYZ(d,0,0,0);const r=new B,a=new B,o=new B,s=new B,c=new B,l=new B,h=new B,u=new B;if(t)for(let d=0,p=t.count;d<p;d+=3){const _=t.getX(d+0),v=t.getX(d+1),m=t.getX(d+2);r.fromBufferAttribute(e,_),a.fromBufferAttribute(e,v),o.fromBufferAttribute(e,m),h.subVectors(o,a),u.subVectors(r,a),h.cross(u),s.fromBufferAttribute(i,_),c.fromBufferAttribute(i,v),l.fromBufferAttribute(i,m),s.add(h),c.add(h),l.add(h),i.setXYZ(_,s.x,s.y,s.z),i.setXYZ(v,c.x,c.y,c.z),i.setXYZ(m,l.x,l.y,l.z)}else for(let d=0,p=e.count;d<p;d+=3)r.fromBufferAttribute(e,d+0),a.fromBufferAttribute(e,d+1),o.fromBufferAttribute(e,d+2),h.subVectors(o,a),u.subVectors(r,a),h.cross(u),i.setXYZ(d+0,h.x,h.y,h.z),i.setXYZ(d+1,h.x,h.y,h.z),i.setXYZ(d+2,h.x,h.y,h.z);this.normalizeNormals(),i.needsUpdate=!0}}normalizeNormals(){const t=this.attributes.normal;for(let e=0,i=t.count;e<i;e++)fe.fromBufferAttribute(t,e),fe.normalize(),t.setXYZ(e,fe.x,fe.y,fe.z)}toNonIndexed(){function t(s,c){const l=s.array,h=s.itemSize,u=s.normalized,d=new l.constructor(c.length*h);let p=0,_=0;for(let v=0,m=c.length;v<m;v++){s.isInterleavedBufferAttribute?p=c[v]*s.data.stride+s.offset:p=c[v]*h;for(let f=0;f<h;f++)d[_++]=l[p++]}return new Qe(d,h,u)}if(this.index===null)return console.warn("THREE.BufferGeometry.toNonIndexed(): BufferGeometry is already non-indexed."),this;const e=new wn,i=this.index.array,r=this.attributes;for(const s in r){const c=r[s],l=t(c,i);e.setAttribute(s,l)}const a=this.morphAttributes;for(const s in a){const c=[],l=a[s];for(let h=0,u=l.length;h<u;h++){const d=l[h],p=t(d,i);c.push(p)}e.morphAttributes[s]=c}e.morphTargetsRelative=this.morphTargetsRelative;const o=this.groups;for(let s=0,c=o.length;s<c;s++){const l=o[s];e.addGroup(l.start,l.count,l.materialIndex)}return e}toJSON(){const t={metadata:{version:4.6,type:"BufferGeometry",generator:"BufferGeometry.toJSON"}};if(t.uuid=this.uuid,t.type=this.type,this.name!==""&&(t.name=this.name),Object.keys(this.userData).length>0&&(t.userData=this.userData),this.parameters!==void 0){const c=this.parameters;for(const l in c)c[l]!==void 0&&(t[l]=c[l]);return t}t.data={attributes:{}};const e=this.index;e!==null&&(t.data.index={type:e.array.constructor.name,array:Array.prototype.slice.call(e.array)});const i=this.attributes;for(const c in i){const l=i[c];t.data.attributes[c]=l.toJSON(t.data)}const r={};let a=!1;for(const c in this.morphAttributes){const l=this.morphAttributes[c],h=[];for(let u=0,d=l.length;u<d;u++){const p=l[u];h.push(p.toJSON(t.data))}h.length>0&&(r[c]=h,a=!0)}a&&(t.data.morphAttributes=r,t.data.morphTargetsRelative=this.morphTargetsRelative);const o=this.groups;o.length>0&&(t.data.groups=JSON.parse(JSON.stringify(o)));const s=this.boundingSphere;return s!==null&&(t.data.boundingSphere={center:s.center.toArray(),radius:s.radius}),t}clone(){return new this.constructor().copy(this)}copy(t){this.index=null,this.attributes={},this.morphAttributes={},this.groups=[],this.boundingBox=null,this.boundingSphere=null;const e={};this.name=t.name;const i=t.index;i!==null&&this.setIndex(i.clone(e));const r=t.attributes;for(const l in r){const h=r[l];this.setAttribute(l,h.clone(e))}const a=t.morphAttributes;for(const l in a){const h=[],u=a[l];for(let d=0,p=u.length;d<p;d++)h.push(u[d].clone(e));this.morphAttributes[l]=h}this.morphTargetsRelative=t.morphTargetsRelative;const o=t.groups;for(let l=0,h=o.length;l<h;l++){const u=o[l];this.addGroup(u.start,u.count,u.materialIndex)}const s=t.boundingBox;s!==null&&(this.boundingBox=s.clone());const c=t.boundingSphere;return c!==null&&(this.boundingSphere=c.clone()),this.drawRange.start=t.drawRange.start,this.drawRange.count=t.drawRange.count,this.userData=t.userData,this}dispose(){this.dispatchEvent({type:"dispose"})}}const so=new se,Ln=new Hh,ar=new Ms,oo=new B,sr=new B,or=new B,cr=new B,ia=new B,lr=new B,co=new B,ur=new B;class Be extends xe{constructor(t=new wn,e=new Sc){super(),this.isMesh=!0,this.type="Mesh",this.geometry=t,this.material=e,this.updateMorphTargets()}copy(t,e){return super.copy(t,e),t.morphTargetInfluences!==void 0&&(this.morphTargetInfluences=t.morphTargetInfluences.slice()),t.morphTargetDictionary!==void 0&&(this.morphTargetDictionary=Object.assign({},t.morphTargetDictionary)),this.material=Array.isArray(t.material)?t.material.slice():t.material,this.geometry=t.geometry,this}updateMorphTargets(){const e=this.geometry.morphAttributes,i=Object.keys(e);if(i.length>0){const r=e[i[0]];if(r!==void 0){this.morphTargetInfluences=[],this.morphTargetDictionary={};for(let a=0,o=r.length;a<o;a++){const s=r[a].name||String(a);this.morphTargetInfluences.push(0),this.morphTargetDictionary[s]=a}}}}getVertexPosition(t,e){const i=this.geometry,r=i.attributes.position,a=i.morphAttributes.position,o=i.morphTargetsRelative;e.fromBufferAttribute(r,t);const s=this.morphTargetInfluences;if(a&&s){lr.set(0,0,0);for(let c=0,l=a.length;c<l;c++){const h=s[c],u=a[c];h!==0&&(ia.fromBufferAttribute(u,t),o?lr.addScaledVector(ia,h):lr.addScaledVector(ia.sub(e),h))}e.add(lr)}return e}raycast(t,e){const i=this.geometry,r=this.material,a=this.matrixWorld;r!==void 0&&(i.boundingSphere===null&&i.computeBoundingSphere(),ar.copy(i.boundingSphere),ar.applyMatrix4(a),Ln.copy(t.ray).recast(t.near),!(ar.containsPoint(Ln.origin)===!1&&(Ln.intersectSphere(ar,oo)===null||Ln.origin.distanceToSquared(oo)>(t.far-t.near)**2))&&(so.copy(a).invert(),Ln.copy(t.ray).applyMatrix4(so),!(i.boundingBox!==null&&Ln.intersectsBox(i.boundingBox)===!1)&&this._computeIntersections(t,e,Ln)))}_computeIntersections(t,e,i){let r;const a=this.geometry,o=this.material,s=a.index,c=a.attributes.position,l=a.attributes.uv,h=a.attributes.uv1,u=a.attributes.normal,d=a.groups,p=a.drawRange;if(s!==null)if(Array.isArray(o))for(let _=0,v=d.length;_<v;_++){const m=d[_],f=o[m.materialIndex],R=Math.max(m.start,p.start),y=Math.min(s.count,Math.min(m.start+m.count,p.start+p.count));for(let E=R,C=y;E<C;E+=3){const b=s.getX(E),A=s.getX(E+1),I=s.getX(E+2);r=hr(this,f,t,i,l,h,u,b,A,I),r&&(r.faceIndex=Math.floor(E/3),r.face.materialIndex=m.materialIndex,e.push(r))}}else{const _=Math.max(0,p.start),v=Math.min(s.count,p.start+p.count);for(let m=_,f=v;m<f;m+=3){const R=s.getX(m),y=s.getX(m+1),E=s.getX(m+2);r=hr(this,o,t,i,l,h,u,R,y,E),r&&(r.faceIndex=Math.floor(m/3),e.push(r))}}else if(c!==void 0)if(Array.isArray(o))for(let _=0,v=d.length;_<v;_++){const m=d[_],f=o[m.materialIndex],R=Math.max(m.start,p.start),y=Math.min(c.count,Math.min(m.start+m.count,p.start+p.count));for(let E=R,C=y;E<C;E+=3){const b=E,A=E+1,I=E+2;r=hr(this,f,t,i,l,h,u,b,A,I),r&&(r.faceIndex=Math.floor(E/3),r.face.materialIndex=m.materialIndex,e.push(r))}}else{const _=Math.max(0,p.start),v=Math.min(c.count,p.start+p.count);for(let m=_,f=v;m<f;m+=3){const R=m,y=m+1,E=m+2;r=hr(this,o,t,i,l,h,u,R,y,E),r&&(r.faceIndex=Math.floor(m/3),e.push(r))}}}}function Kh(n,t,e,i,r,a,o,s){let c;if(t.side===be?c=i.intersectTriangle(o,a,r,!0,s):c=i.intersectTriangle(r,a,o,t.side===bn,s),c===null)return null;ur.copy(s),ur.applyMatrix4(n.matrixWorld);const l=e.ray.origin.distanceTo(ur);return l<e.near||l>e.far?null:{distance:l,point:ur.clone(),object:n}}function hr(n,t,e,i,r,a,o,s,c,l){n.getVertexPosition(s,sr),n.getVertexPosition(c,or),n.getVertexPosition(l,cr);const h=Kh(n,t,e,i,sr,or,cr,co);if(h){const u=new B;qe.getBarycoord(co,sr,or,cr,u),r&&(h.uv=qe.getInterpolatedAttribute(r,s,c,l,u,new Yt)),a&&(h.uv1=qe.getInterpolatedAttribute(a,s,c,l,u,new Yt)),o&&(h.normal=qe.getInterpolatedAttribute(o,s,c,l,u,new B),h.normal.dot(i.direction)>0&&h.normal.multiplyScalar(-1));const d={a:s,b:c,c:l,normal:new B,materialIndex:0};qe.getNormal(sr,or,cr,d.normal),h.face=d,h.barycoord=u}return h}class Wi extends wn{constructor(t=1,e=1,i=1,r=1,a=1,o=1){super(),this.type="BoxGeometry",this.parameters={width:t,height:e,depth:i,widthSegments:r,heightSegments:a,depthSegments:o};const s=this;r=Math.floor(r),a=Math.floor(a),o=Math.floor(o);const c=[],l=[],h=[],u=[];let d=0,p=0;_("z","y","x",-1,-1,i,e,t,o,a,0),_("z","y","x",1,-1,i,e,-t,o,a,1),_("x","z","y",1,1,t,i,e,r,o,2),_("x","z","y",1,-1,t,i,-e,r,o,3),_("x","y","z",1,-1,t,e,i,r,a,4),_("x","y","z",-1,-1,t,e,-i,r,a,5),this.setIndex(c),this.setAttribute("position",new tn(l,3)),this.setAttribute("normal",new tn(h,3)),this.setAttribute("uv",new tn(u,2));function _(v,m,f,R,y,E,C,b,A,I,S){const M=E/A,w=C/I,V=E/2,F=C/2,W=b/2,K=A+1,k=I+1;let Z=0,H=0;const tt=new B;for(let ct=0;ct<k;ct++){const _t=ct*w-F;for(let Rt=0;Rt<K;Rt++){const It=Rt*M-V;tt[v]=It*R,tt[m]=_t*y,tt[f]=W,l.push(tt.x,tt.y,tt.z),tt[v]=0,tt[m]=0,tt[f]=b>0?1:-1,h.push(tt.x,tt.y,tt.z),u.push(Rt/A),u.push(1-ct/I),Z+=1}}for(let ct=0;ct<I;ct++)for(let _t=0;_t<A;_t++){const Rt=d+_t+K*ct,It=d+_t+K*(ct+1),X=d+(_t+1)+K*(ct+1),et=d+(_t+1)+K*ct;c.push(Rt,It,et),c.push(It,X,et),H+=6}s.addGroup(p,H,S),p+=H,d+=Z}}copy(t){return super.copy(t),this.parameters=Object.assign({},t.parameters),this}static fromJSON(t){return new Wi(t.width,t.height,t.depth,t.widthSegments,t.heightSegments,t.depthSegments)}}function Si(n){const t={};for(const e in n){t[e]={};for(const i in n[e]){const r=n[e][i];r&&(r.isColor||r.isMatrix3||r.isMatrix4||r.isVector2||r.isVector3||r.isVector4||r.isTexture||r.isQuaternion)?r.isRenderTargetTexture?(console.warn("UniformsUtils: Textures of render targets cannot be cloned via cloneUniforms() or mergeUniforms()."),t[e][i]=null):t[e][i]=r.clone():Array.isArray(r)?t[e][i]=r.slice():t[e][i]=r}}return t}function Ee(n){const t={};for(let e=0;e<n.length;e++){const i=Si(n[e]);for(const r in i)t[r]=i[r]}return t}function jh(n){const t=[];for(let e=0;e<n.length;e++)t.push(n[e].clone());return t}function Tc(n){const t=n.getRenderTarget();return t===null?n.outputColorSpace:t.isXRRenderTarget===!0?t.texture.colorSpace:Wt.workingColorSpace}const Jh={clone:Si,merge:Ee};var Qh=`void main() {
	gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );
}`,tf=`void main() {
	gl_FragColor = vec4( 1.0, 0.0, 0.0, 1.0 );
}`;class An extends Ti{constructor(t){super(),this.isShaderMaterial=!0,this.type="ShaderMaterial",this.defines={},this.uniforms={},this.uniformsGroups=[],this.vertexShader=Qh,this.fragmentShader=tf,this.linewidth=1,this.wireframe=!1,this.wireframeLinewidth=1,this.fog=!1,this.lights=!1,this.clipping=!1,this.forceSinglePass=!0,this.extensions={clipCullDistance:!1,multiDraw:!1},this.defaultAttributeValues={color:[1,1,1],uv:[0,0],uv1:[0,0]},this.index0AttributeName=void 0,this.uniformsNeedUpdate=!1,this.glslVersion=null,t!==void 0&&this.setValues(t)}copy(t){return super.copy(t),this.fragmentShader=t.fragmentShader,this.vertexShader=t.vertexShader,this.uniforms=Si(t.uniforms),this.uniformsGroups=jh(t.uniformsGroups),this.defines=Object.assign({},t.defines),this.wireframe=t.wireframe,this.wireframeLinewidth=t.wireframeLinewidth,this.fog=t.fog,this.lights=t.lights,this.clipping=t.clipping,this.extensions=Object.assign({},t.extensions),this.glslVersion=t.glslVersion,this}toJSON(t){const e=super.toJSON(t);e.glslVersion=this.glslVersion,e.uniforms={};for(const r in this.uniforms){const o=this.uniforms[r].value;o&&o.isTexture?e.uniforms[r]={type:"t",value:o.toJSON(t).uuid}:o&&o.isColor?e.uniforms[r]={type:"c",value:o.getHex()}:o&&o.isVector2?e.uniforms[r]={type:"v2",value:o.toArray()}:o&&o.isVector3?e.uniforms[r]={type:"v3",value:o.toArray()}:o&&o.isVector4?e.uniforms[r]={type:"v4",value:o.toArray()}:o&&o.isMatrix3?e.uniforms[r]={type:"m3",value:o.toArray()}:o&&o.isMatrix4?e.uniforms[r]={type:"m4",value:o.toArray()}:e.uniforms[r]={value:o}}Object.keys(this.defines).length>0&&(e.defines=this.defines),e.vertexShader=this.vertexShader,e.fragmentShader=this.fragmentShader,e.lights=this.lights,e.clipping=this.clipping;const i={};for(const r in this.extensions)this.extensions[r]===!0&&(i[r]=!0);return Object.keys(i).length>0&&(e.extensions=i),e}}class bc extends xe{constructor(){super(),this.isCamera=!0,this.type="Camera",this.matrixWorldInverse=new se,this.projectionMatrix=new se,this.projectionMatrixInverse=new se,this.coordinateSystem=hn}copy(t,e){return super.copy(t,e),this.matrixWorldInverse.copy(t.matrixWorldInverse),this.projectionMatrix.copy(t.projectionMatrix),this.projectionMatrixInverse.copy(t.projectionMatrixInverse),this.coordinateSystem=t.coordinateSystem,this}getWorldDirection(t){return super.getWorldDirection(t).negate()}updateMatrixWorld(t){super.updateMatrixWorld(t),this.matrixWorldInverse.copy(this.matrixWorld).invert()}updateWorldMatrix(t,e){super.updateWorldMatrix(t,e),this.matrixWorldInverse.copy(this.matrixWorld).invert()}clone(){return new this.constructor().copy(this)}}const Mn=new B,lo=new Yt,uo=new Yt;class Pe extends bc{constructor(t=50,e=1,i=.1,r=2e3){super(),this.isPerspectiveCamera=!0,this.type="PerspectiveCamera",this.fov=t,this.zoom=1,this.near=i,this.far=r,this.focus=10,this.aspect=e,this.view=null,this.filmGauge=35,this.filmOffset=0,this.updateProjectionMatrix()}copy(t,e){return super.copy(t,e),this.fov=t.fov,this.zoom=t.zoom,this.near=t.near,this.far=t.far,this.focus=t.focus,this.aspect=t.aspect,this.view=t.view===null?null:Object.assign({},t.view),this.filmGauge=t.filmGauge,this.filmOffset=t.filmOffset,this}setFocalLength(t){const e=.5*this.getFilmHeight()/t;this.fov=zi*2*Math.atan(e),this.updateProjectionMatrix()}getFocalLength(){const t=Math.tan(Ii*.5*this.fov);return .5*this.getFilmHeight()/t}getEffectiveFOV(){return zi*2*Math.atan(Math.tan(Ii*.5*this.fov)/this.zoom)}getFilmWidth(){return this.filmGauge*Math.min(this.aspect,1)}getFilmHeight(){return this.filmGauge/Math.max(this.aspect,1)}getViewBounds(t,e,i){Mn.set(-1,-1,.5).applyMatrix4(this.projectionMatrixInverse),e.set(Mn.x,Mn.y).multiplyScalar(-t/Mn.z),Mn.set(1,1,.5).applyMatrix4(this.projectionMatrixInverse),i.set(Mn.x,Mn.y).multiplyScalar(-t/Mn.z)}getViewSize(t,e){return this.getViewBounds(t,lo,uo),e.subVectors(uo,lo)}setViewOffset(t,e,i,r,a,o){this.aspect=t/e,this.view===null&&(this.view={enabled:!0,fullWidth:1,fullHeight:1,offsetX:0,offsetY:0,width:1,height:1}),this.view.enabled=!0,this.view.fullWidth=t,this.view.fullHeight=e,this.view.offsetX=i,this.view.offsetY=r,this.view.width=a,this.view.height=o,this.updateProjectionMatrix()}clearViewOffset(){this.view!==null&&(this.view.enabled=!1),this.updateProjectionMatrix()}updateProjectionMatrix(){const t=this.near;let e=t*Math.tan(Ii*.5*this.fov)/this.zoom,i=2*e,r=this.aspect*i,a=-.5*r;const o=this.view;if(this.view!==null&&this.view.enabled){const c=o.fullWidth,l=o.fullHeight;a+=o.offsetX*r/c,e-=o.offsetY*i/l,r*=o.width/c,i*=o.height/l}const s=this.filmOffset;s!==0&&(a+=t*s/this.getFilmWidth()),this.projectionMatrix.makePerspective(a,a+r,e,e-i,t,this.far,this.coordinateSystem),this.projectionMatrixInverse.copy(this.projectionMatrix).invert()}toJSON(t){const e=super.toJSON(t);return e.object.fov=this.fov,e.object.zoom=this.zoom,e.object.near=this.near,e.object.far=this.far,e.object.focus=this.focus,e.object.aspect=this.aspect,this.view!==null&&(e.object.view=Object.assign({},this.view)),e.object.filmGauge=this.filmGauge,e.object.filmOffset=this.filmOffset,e}}const ai=-90,si=1;class ef extends xe{constructor(t,e,i){super(),this.type="CubeCamera",this.renderTarget=i,this.coordinateSystem=null,this.activeMipmapLevel=0;const r=new Pe(ai,si,t,e);r.layers=this.layers,this.add(r);const a=new Pe(ai,si,t,e);a.layers=this.layers,this.add(a);const o=new Pe(ai,si,t,e);o.layers=this.layers,this.add(o);const s=new Pe(ai,si,t,e);s.layers=this.layers,this.add(s);const c=new Pe(ai,si,t,e);c.layers=this.layers,this.add(c);const l=new Pe(ai,si,t,e);l.layers=this.layers,this.add(l)}updateCoordinateSystem(){const t=this.coordinateSystem,e=this.children.concat(),[i,r,a,o,s,c]=e;for(const l of e)this.remove(l);if(t===hn)i.up.set(0,1,0),i.lookAt(1,0,0),r.up.set(0,1,0),r.lookAt(-1,0,0),a.up.set(0,0,-1),a.lookAt(0,1,0),o.up.set(0,0,1),o.lookAt(0,-1,0),s.up.set(0,1,0),s.lookAt(0,0,1),c.up.set(0,1,0),c.lookAt(0,0,-1);else if(t===Pr)i.up.set(0,-1,0),i.lookAt(-1,0,0),r.up.set(0,-1,0),r.lookAt(1,0,0),a.up.set(0,0,1),a.lookAt(0,1,0),o.up.set(0,0,-1),o.lookAt(0,-1,0),s.up.set(0,-1,0),s.lookAt(0,0,1),c.up.set(0,-1,0),c.lookAt(0,0,-1);else throw new Error("THREE.CubeCamera.updateCoordinateSystem(): Invalid coordinate system: "+t);for(const l of e)this.add(l),l.updateMatrixWorld()}update(t,e){this.parent===null&&this.updateMatrixWorld();const{renderTarget:i,activeMipmapLevel:r}=this;this.coordinateSystem!==t.coordinateSystem&&(this.coordinateSystem=t.coordinateSystem,this.updateCoordinateSystem());const[a,o,s,c,l,h]=this.children,u=t.getRenderTarget(),d=t.getActiveCubeFace(),p=t.getActiveMipmapLevel(),_=t.xr.enabled;t.xr.enabled=!1;const v=i.texture.generateMipmaps;i.texture.generateMipmaps=!1,t.setRenderTarget(i,0,r),t.render(e,a),t.setRenderTarget(i,1,r),t.render(e,o),t.setRenderTarget(i,2,r),t.render(e,s),t.setRenderTarget(i,3,r),t.render(e,c),t.setRenderTarget(i,4,r),t.render(e,l),i.texture.generateMipmaps=v,t.setRenderTarget(i,5,r),t.render(e,h),t.setRenderTarget(u,d,p),t.xr.enabled=_,i.texture.needsPMREMUpdate=!0}}class Ac extends Ae{constructor(t,e,i,r,a,o,s,c,l,h){t=t!==void 0?t:[],e=e!==void 0?e:_i,super(t,e,i,r,a,o,s,c,l,h),this.isCubeTexture=!0,this.flipY=!1}get images(){return this.image}set images(t){this.image=t}}class nf extends Xn{constructor(t=1,e={}){super(t,t,e),this.isWebGLCubeRenderTarget=!0;const i={width:t,height:t,depth:1},r=[i,i,i,i,i,i];this.texture=new Ac(r,e.mapping,e.wrapS,e.wrapT,e.magFilter,e.minFilter,e.format,e.type,e.anisotropy,e.colorSpace),this.texture.isRenderTargetTexture=!0,this.texture.generateMipmaps=e.generateMipmaps!==void 0?e.generateMipmaps:!1,this.texture.minFilter=e.minFilter!==void 0?e.minFilter:Je}fromEquirectangularTexture(t,e){this.texture.type=e.type,this.texture.colorSpace=e.colorSpace,this.texture.generateMipmaps=e.generateMipmaps,this.texture.minFilter=e.minFilter,this.texture.magFilter=e.magFilter;const i={uniforms:{tEquirect:{value:null}},vertexShader:`

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
			`},r=new Wi(5,5,5),a=new An({name:"CubemapFromEquirect",uniforms:Si(i.uniforms),vertexShader:i.vertexShader,fragmentShader:i.fragmentShader,side:be,blending:yn});a.uniforms.tEquirect.value=e;const o=new Be(r,a),s=e.minFilter;return e.minFilter===Vn&&(e.minFilter=Je),new ef(1,10,this).update(t,o),e.minFilter=s,o.geometry.dispose(),o.material.dispose(),this}clear(t,e,i,r){const a=t.getRenderTarget();for(let o=0;o<6;o++)t.setRenderTarget(this,o),t.clear(e,i,r);t.setRenderTarget(a)}}class fr extends xe{constructor(){super(),this.isGroup=!0,this.type="Group"}}const rf={type:"move"};class ra{constructor(){this._targetRay=null,this._grip=null,this._hand=null}getHandSpace(){return this._hand===null&&(this._hand=new fr,this._hand.matrixAutoUpdate=!1,this._hand.visible=!1,this._hand.joints={},this._hand.inputState={pinching:!1}),this._hand}getTargetRaySpace(){return this._targetRay===null&&(this._targetRay=new fr,this._targetRay.matrixAutoUpdate=!1,this._targetRay.visible=!1,this._targetRay.hasLinearVelocity=!1,this._targetRay.linearVelocity=new B,this._targetRay.hasAngularVelocity=!1,this._targetRay.angularVelocity=new B),this._targetRay}getGripSpace(){return this._grip===null&&(this._grip=new fr,this._grip.matrixAutoUpdate=!1,this._grip.visible=!1,this._grip.hasLinearVelocity=!1,this._grip.linearVelocity=new B,this._grip.hasAngularVelocity=!1,this._grip.angularVelocity=new B),this._grip}dispatchEvent(t){return this._targetRay!==null&&this._targetRay.dispatchEvent(t),this._grip!==null&&this._grip.dispatchEvent(t),this._hand!==null&&this._hand.dispatchEvent(t),this}connect(t){if(t&&t.hand){const e=this._hand;if(e)for(const i of t.hand.values())this._getHandJoint(e,i)}return this.dispatchEvent({type:"connected",data:t}),this}disconnect(t){return this.dispatchEvent({type:"disconnected",data:t}),this._targetRay!==null&&(this._targetRay.visible=!1),this._grip!==null&&(this._grip.visible=!1),this._hand!==null&&(this._hand.visible=!1),this}update(t,e,i){let r=null,a=null,o=null;const s=this._targetRay,c=this._grip,l=this._hand;if(t&&e.session.visibilityState!=="visible-blurred"){if(l&&t.hand){o=!0;for(const v of t.hand.values()){const m=e.getJointPose(v,i),f=this._getHandJoint(l,v);m!==null&&(f.matrix.fromArray(m.transform.matrix),f.matrix.decompose(f.position,f.rotation,f.scale),f.matrixWorldNeedsUpdate=!0,f.jointRadius=m.radius),f.visible=m!==null}const h=l.joints["index-finger-tip"],u=l.joints["thumb-tip"],d=h.position.distanceTo(u.position),p=.02,_=.005;l.inputState.pinching&&d>p+_?(l.inputState.pinching=!1,this.dispatchEvent({type:"pinchend",handedness:t.handedness,target:this})):!l.inputState.pinching&&d<=p-_&&(l.inputState.pinching=!0,this.dispatchEvent({type:"pinchstart",handedness:t.handedness,target:this}))}else c!==null&&t.gripSpace&&(a=e.getPose(t.gripSpace,i),a!==null&&(c.matrix.fromArray(a.transform.matrix),c.matrix.decompose(c.position,c.rotation,c.scale),c.matrixWorldNeedsUpdate=!0,a.linearVelocity?(c.hasLinearVelocity=!0,c.linearVelocity.copy(a.linearVelocity)):c.hasLinearVelocity=!1,a.angularVelocity?(c.hasAngularVelocity=!0,c.angularVelocity.copy(a.angularVelocity)):c.hasAngularVelocity=!1));s!==null&&(r=e.getPose(t.targetRaySpace,i),r===null&&a!==null&&(r=a),r!==null&&(s.matrix.fromArray(r.transform.matrix),s.matrix.decompose(s.position,s.rotation,s.scale),s.matrixWorldNeedsUpdate=!0,r.linearVelocity?(s.hasLinearVelocity=!0,s.linearVelocity.copy(r.linearVelocity)):s.hasLinearVelocity=!1,r.angularVelocity?(s.hasAngularVelocity=!0,s.angularVelocity.copy(r.angularVelocity)):s.hasAngularVelocity=!1,this.dispatchEvent(rf)))}return s!==null&&(s.visible=r!==null),c!==null&&(c.visible=a!==null),l!==null&&(l.visible=o!==null),this}_getHandJoint(t,e){if(t.joints[e.jointName]===void 0){const i=new fr;i.matrixAutoUpdate=!1,i.visible=!1,t.joints[e.jointName]=i,t.add(i)}return t.joints[e.jointName]}}class wc extends xe{constructor(){super(),this.isScene=!0,this.type="Scene",this.background=null,this.environment=null,this.fog=null,this.backgroundBlurriness=0,this.backgroundIntensity=1,this.backgroundRotation=new Ze,this.environmentIntensity=1,this.environmentRotation=new Ze,this.overrideMaterial=null,typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("observe",{detail:this}))}copy(t,e){return super.copy(t,e),t.background!==null&&(this.background=t.background.clone()),t.environment!==null&&(this.environment=t.environment.clone()),t.fog!==null&&(this.fog=t.fog.clone()),this.backgroundBlurriness=t.backgroundBlurriness,this.backgroundIntensity=t.backgroundIntensity,this.backgroundRotation.copy(t.backgroundRotation),this.environmentIntensity=t.environmentIntensity,this.environmentRotation.copy(t.environmentRotation),t.overrideMaterial!==null&&(this.overrideMaterial=t.overrideMaterial.clone()),this.matrixAutoUpdate=t.matrixAutoUpdate,this}toJSON(t){const e=super.toJSON(t);return this.fog!==null&&(e.object.fog=this.fog.toJSON()),this.backgroundBlurriness>0&&(e.object.backgroundBlurriness=this.backgroundBlurriness),this.backgroundIntensity!==1&&(e.object.backgroundIntensity=this.backgroundIntensity),e.object.backgroundRotation=this.backgroundRotation.toArray(),this.environmentIntensity!==1&&(e.object.environmentIntensity=this.environmentIntensity),e.object.environmentRotation=this.environmentRotation.toArray(),e}}const aa=new B,af=new B,sf=new Pt;class Fn{constructor(t=new B(1,0,0),e=0){this.isPlane=!0,this.normal=t,this.constant=e}set(t,e){return this.normal.copy(t),this.constant=e,this}setComponents(t,e,i,r){return this.normal.set(t,e,i),this.constant=r,this}setFromNormalAndCoplanarPoint(t,e){return this.normal.copy(t),this.constant=-e.dot(this.normal),this}setFromCoplanarPoints(t,e,i){const r=aa.subVectors(i,e).cross(af.subVectors(t,e)).normalize();return this.setFromNormalAndCoplanarPoint(r,t),this}copy(t){return this.normal.copy(t.normal),this.constant=t.constant,this}normalize(){const t=1/this.normal.length();return this.normal.multiplyScalar(t),this.constant*=t,this}negate(){return this.constant*=-1,this.normal.negate(),this}distanceToPoint(t){return this.normal.dot(t)+this.constant}distanceToSphere(t){return this.distanceToPoint(t.center)-t.radius}projectPoint(t,e){return e.copy(t).addScaledVector(this.normal,-this.distanceToPoint(t))}intersectLine(t,e){const i=t.delta(aa),r=this.normal.dot(i);if(r===0)return this.distanceToPoint(t.start)===0?e.copy(t.start):null;const a=-(t.start.dot(this.normal)+this.constant)/r;return a<0||a>1?null:e.copy(t.start).addScaledVector(i,a)}intersectsLine(t){const e=this.distanceToPoint(t.start),i=this.distanceToPoint(t.end);return e<0&&i>0||i<0&&e>0}intersectsBox(t){return t.intersectsPlane(this)}intersectsSphere(t){return t.intersectsPlane(this)}coplanarPoint(t){return t.copy(this.normal).multiplyScalar(-this.constant)}applyMatrix4(t,e){const i=e||sf.getNormalMatrix(t),r=this.coplanarPoint(aa).applyMatrix4(t),a=this.normal.applyMatrix3(i).normalize();return this.constant=-r.dot(a),this}translate(t){return this.constant-=t.dot(this.normal),this}equals(t){return t.normal.equals(this.normal)&&t.constant===this.constant}clone(){return new this.constructor().copy(this)}}const In=new Ms,dr=new B;class Ss{constructor(t=new Fn,e=new Fn,i=new Fn,r=new Fn,a=new Fn,o=new Fn){this.planes=[t,e,i,r,a,o]}set(t,e,i,r,a,o){const s=this.planes;return s[0].copy(t),s[1].copy(e),s[2].copy(i),s[3].copy(r),s[4].copy(a),s[5].copy(o),this}copy(t){const e=this.planes;for(let i=0;i<6;i++)e[i].copy(t.planes[i]);return this}setFromProjectionMatrix(t,e=hn){const i=this.planes,r=t.elements,a=r[0],o=r[1],s=r[2],c=r[3],l=r[4],h=r[5],u=r[6],d=r[7],p=r[8],_=r[9],v=r[10],m=r[11],f=r[12],R=r[13],y=r[14],E=r[15];if(i[0].setComponents(c-a,d-l,m-p,E-f).normalize(),i[1].setComponents(c+a,d+l,m+p,E+f).normalize(),i[2].setComponents(c+o,d+h,m+_,E+R).normalize(),i[3].setComponents(c-o,d-h,m-_,E-R).normalize(),i[4].setComponents(c-s,d-u,m-v,E-y).normalize(),e===hn)i[5].setComponents(c+s,d+u,m+v,E+y).normalize();else if(e===Pr)i[5].setComponents(s,u,v,y).normalize();else throw new Error("THREE.Frustum.setFromProjectionMatrix(): Invalid coordinate system: "+e);return this}intersectsObject(t){if(t.boundingSphere!==void 0)t.boundingSphere===null&&t.computeBoundingSphere(),In.copy(t.boundingSphere).applyMatrix4(t.matrixWorld);else{const e=t.geometry;e.boundingSphere===null&&e.computeBoundingSphere(),In.copy(e.boundingSphere).applyMatrix4(t.matrixWorld)}return this.intersectsSphere(In)}intersectsSprite(t){return In.center.set(0,0,0),In.radius=.7071067811865476,In.applyMatrix4(t.matrixWorld),this.intersectsSphere(In)}intersectsSphere(t){const e=this.planes,i=t.center,r=-t.radius;for(let a=0;a<6;a++)if(e[a].distanceToPoint(i)<r)return!1;return!0}intersectsBox(t){const e=this.planes;for(let i=0;i<6;i++){const r=e[i];if(dr.x=r.normal.x>0?t.max.x:t.min.x,dr.y=r.normal.y>0?t.max.y:t.min.y,dr.z=r.normal.z>0?t.max.z:t.min.z,r.distanceToPoint(dr)<0)return!1}return!0}containsPoint(t){const e=this.planes;for(let i=0;i<6;i++)if(e[i].distanceToPoint(t)<0)return!1;return!0}clone(){return new this.constructor().copy(this)}}class Rc extends Ae{constructor(t,e,i,r,a,o,s,c,l,h=fi){if(h!==fi&&h!==xi)throw new Error("DepthTexture format must be either THREE.DepthFormat or THREE.DepthStencilFormat");i===void 0&&h===fi&&(i=Wn),i===void 0&&h===xi&&(i=vi),super(null,r,a,o,s,c,h,i,l),this.isDepthTexture=!0,this.image={width:t,height:e},this.magFilter=s!==void 0?s:$e,this.minFilter=c!==void 0?c:$e,this.flipY=!1,this.generateMipmaps=!1,this.compareFunction=null}copy(t){return super.copy(t),this.compareFunction=t.compareFunction,this}toJSON(t){const e=super.toJSON(t);return this.compareFunction!==null&&(e.compareFunction=this.compareFunction),e}}class Xi extends wn{constructor(t=1,e=1,i=1,r=1){super(),this.type="PlaneGeometry",this.parameters={width:t,height:e,widthSegments:i,heightSegments:r};const a=t/2,o=e/2,s=Math.floor(i),c=Math.floor(r),l=s+1,h=c+1,u=t/s,d=e/c,p=[],_=[],v=[],m=[];for(let f=0;f<h;f++){const R=f*d-o;for(let y=0;y<l;y++){const E=y*u-a;_.push(E,-R,0),v.push(0,0,1),m.push(y/s),m.push(1-f/c)}}for(let f=0;f<c;f++)for(let R=0;R<s;R++){const y=R+l*f,E=R+l*(f+1),C=R+1+l*(f+1),b=R+1+l*f;p.push(y,E,b),p.push(E,C,b)}this.setIndex(p),this.setAttribute("position",new tn(_,3)),this.setAttribute("normal",new tn(v,3)),this.setAttribute("uv",new tn(m,2))}copy(t){return super.copy(t),this.parameters=Object.assign({},t.parameters),this}static fromJSON(t){return new Xi(t.width,t.height,t.widthSegments,t.heightSegments)}}class Ur extends wn{constructor(t=1,e=32,i=16,r=0,a=Math.PI*2,o=0,s=Math.PI){super(),this.type="SphereGeometry",this.parameters={radius:t,widthSegments:e,heightSegments:i,phiStart:r,phiLength:a,thetaStart:o,thetaLength:s},e=Math.max(3,Math.floor(e)),i=Math.max(2,Math.floor(i));const c=Math.min(o+s,Math.PI);let l=0;const h=[],u=new B,d=new B,p=[],_=[],v=[],m=[];for(let f=0;f<=i;f++){const R=[],y=f/i;let E=0;f===0&&o===0?E=.5/e:f===i&&c===Math.PI&&(E=-.5/e);for(let C=0;C<=e;C++){const b=C/e;u.x=-t*Math.cos(r+b*a)*Math.sin(o+y*s),u.y=t*Math.cos(o+y*s),u.z=t*Math.sin(r+b*a)*Math.sin(o+y*s),_.push(u.x,u.y,u.z),d.copy(u).normalize(),v.push(d.x,d.y,d.z),m.push(b+E,1-y),R.push(l++)}h.push(R)}for(let f=0;f<i;f++)for(let R=0;R<e;R++){const y=h[f][R+1],E=h[f][R],C=h[f+1][R],b=h[f+1][R+1];(f!==0||o>0)&&p.push(y,E,b),(f!==i-1||c<Math.PI)&&p.push(E,C,b)}this.setIndex(p),this.setAttribute("position",new tn(_,3)),this.setAttribute("normal",new tn(v,3)),this.setAttribute("uv",new tn(m,2))}copy(t){return super.copy(t),this.parameters=Object.assign({},t.parameters),this}static fromJSON(t){return new Ur(t.radius,t.widthSegments,t.heightSegments,t.phiStart,t.phiLength,t.thetaStart,t.thetaLength)}}class Cc extends Ti{constructor(t){super(),this.isMeshStandardMaterial=!0,this.type="MeshStandardMaterial",this.defines={STANDARD:""},this.color=new Ft(16777215),this.roughness=1,this.metalness=0,this.map=null,this.lightMap=null,this.lightMapIntensity=1,this.aoMap=null,this.aoMapIntensity=1,this.emissive=new Ft(0),this.emissiveIntensity=1,this.emissiveMap=null,this.bumpMap=null,this.bumpScale=1,this.normalMap=null,this.normalMapType=gs,this.normalScale=new Yt(1,1),this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.roughnessMap=null,this.metalnessMap=null,this.alphaMap=null,this.envMap=null,this.envMapRotation=new Ze,this.envMapIntensity=1,this.wireframe=!1,this.wireframeLinewidth=1,this.wireframeLinecap="round",this.wireframeLinejoin="round",this.flatShading=!1,this.fog=!0,this.setValues(t)}copy(t){return super.copy(t),this.defines={STANDARD:""},this.color.copy(t.color),this.roughness=t.roughness,this.metalness=t.metalness,this.map=t.map,this.lightMap=t.lightMap,this.lightMapIntensity=t.lightMapIntensity,this.aoMap=t.aoMap,this.aoMapIntensity=t.aoMapIntensity,this.emissive.copy(t.emissive),this.emissiveMap=t.emissiveMap,this.emissiveIntensity=t.emissiveIntensity,this.bumpMap=t.bumpMap,this.bumpScale=t.bumpScale,this.normalMap=t.normalMap,this.normalMapType=t.normalMapType,this.normalScale.copy(t.normalScale),this.displacementMap=t.displacementMap,this.displacementScale=t.displacementScale,this.displacementBias=t.displacementBias,this.roughnessMap=t.roughnessMap,this.metalnessMap=t.metalnessMap,this.alphaMap=t.alphaMap,this.envMap=t.envMap,this.envMapRotation.copy(t.envMapRotation),this.envMapIntensity=t.envMapIntensity,this.wireframe=t.wireframe,this.wireframeLinewidth=t.wireframeLinewidth,this.wireframeLinecap=t.wireframeLinecap,this.wireframeLinejoin=t.wireframeLinejoin,this.flatShading=t.flatShading,this.fog=t.fog,this}}class of extends Ti{constructor(t){super(),this.isMeshLambertMaterial=!0,this.type="MeshLambertMaterial",this.color=new Ft(16777215),this.map=null,this.lightMap=null,this.lightMapIntensity=1,this.aoMap=null,this.aoMapIntensity=1,this.emissive=new Ft(0),this.emissiveIntensity=1,this.emissiveMap=null,this.bumpMap=null,this.bumpScale=1,this.normalMap=null,this.normalMapType=gs,this.normalScale=new Yt(1,1),this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.specularMap=null,this.alphaMap=null,this.envMap=null,this.envMapRotation=new Ze,this.combine=us,this.reflectivity=1,this.refractionRatio=.98,this.wireframe=!1,this.wireframeLinewidth=1,this.wireframeLinecap="round",this.wireframeLinejoin="round",this.flatShading=!1,this.fog=!0,this.setValues(t)}copy(t){return super.copy(t),this.color.copy(t.color),this.map=t.map,this.lightMap=t.lightMap,this.lightMapIntensity=t.lightMapIntensity,this.aoMap=t.aoMap,this.aoMapIntensity=t.aoMapIntensity,this.emissive.copy(t.emissive),this.emissiveMap=t.emissiveMap,this.emissiveIntensity=t.emissiveIntensity,this.bumpMap=t.bumpMap,this.bumpScale=t.bumpScale,this.normalMap=t.normalMap,this.normalMapType=t.normalMapType,this.normalScale.copy(t.normalScale),this.displacementMap=t.displacementMap,this.displacementScale=t.displacementScale,this.displacementBias=t.displacementBias,this.specularMap=t.specularMap,this.alphaMap=t.alphaMap,this.envMap=t.envMap,this.envMapRotation.copy(t.envMapRotation),this.combine=t.combine,this.reflectivity=t.reflectivity,this.refractionRatio=t.refractionRatio,this.wireframe=t.wireframe,this.wireframeLinewidth=t.wireframeLinewidth,this.wireframeLinecap=t.wireframeLinecap,this.wireframeLinejoin=t.wireframeLinejoin,this.flatShading=t.flatShading,this.fog=t.fog,this}}class cf extends Ti{constructor(t){super(),this.isMeshDepthMaterial=!0,this.type="MeshDepthMaterial",this.depthPacking=ih,this.map=null,this.alphaMap=null,this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.wireframe=!1,this.wireframeLinewidth=1,this.setValues(t)}copy(t){return super.copy(t),this.depthPacking=t.depthPacking,this.map=t.map,this.alphaMap=t.alphaMap,this.displacementMap=t.displacementMap,this.displacementScale=t.displacementScale,this.displacementBias=t.displacementBias,this.wireframe=t.wireframe,this.wireframeLinewidth=t.wireframeLinewidth,this}}class lf extends Ti{constructor(t){super(),this.isMeshDistanceMaterial=!0,this.type="MeshDistanceMaterial",this.map=null,this.alphaMap=null,this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.setValues(t)}copy(t){return super.copy(t),this.map=t.map,this.alphaMap=t.alphaMap,this.displacementMap=t.displacementMap,this.displacementScale=t.displacementScale,this.displacementBias=t.displacementBias,this}}class Pc extends xe{constructor(t,e=1){super(),this.isLight=!0,this.type="Light",this.color=new Ft(t),this.intensity=e}dispose(){}copy(t,e){return super.copy(t,e),this.color.copy(t.color),this.intensity=t.intensity,this}toJSON(t){const e=super.toJSON(t);return e.object.color=this.color.getHex(),e.object.intensity=this.intensity,this.groundColor!==void 0&&(e.object.groundColor=this.groundColor.getHex()),this.distance!==void 0&&(e.object.distance=this.distance),this.angle!==void 0&&(e.object.angle=this.angle),this.decay!==void 0&&(e.object.decay=this.decay),this.penumbra!==void 0&&(e.object.penumbra=this.penumbra),this.shadow!==void 0&&(e.object.shadow=this.shadow.toJSON()),this.target!==void 0&&(e.object.target=this.target.uuid),e}}const sa=new se,ho=new B,fo=new B;class uf{constructor(t){this.camera=t,this.intensity=1,this.bias=0,this.normalBias=0,this.radius=1,this.blurSamples=8,this.mapSize=new Yt(512,512),this.map=null,this.mapPass=null,this.matrix=new se,this.autoUpdate=!0,this.needsUpdate=!1,this._frustum=new Ss,this._frameExtents=new Yt(1,1),this._viewportCount=1,this._viewports=[new ae(0,0,1,1)]}getViewportCount(){return this._viewportCount}getFrustum(){return this._frustum}updateMatrices(t){const e=this.camera,i=this.matrix;ho.setFromMatrixPosition(t.matrixWorld),e.position.copy(ho),fo.setFromMatrixPosition(t.target.matrixWorld),e.lookAt(fo),e.updateMatrixWorld(),sa.multiplyMatrices(e.projectionMatrix,e.matrixWorldInverse),this._frustum.setFromProjectionMatrix(sa),i.set(.5,0,0,.5,0,.5,0,.5,0,0,.5,.5,0,0,0,1),i.multiply(sa)}getViewport(t){return this._viewports[t]}getFrameExtents(){return this._frameExtents}dispose(){this.map&&this.map.dispose(),this.mapPass&&this.mapPass.dispose()}copy(t){return this.camera=t.camera.clone(),this.intensity=t.intensity,this.bias=t.bias,this.radius=t.radius,this.mapSize.copy(t.mapSize),this}clone(){return new this.constructor().copy(this)}toJSON(){const t={};return this.intensity!==1&&(t.intensity=this.intensity),this.bias!==0&&(t.bias=this.bias),this.normalBias!==0&&(t.normalBias=this.normalBias),this.radius!==1&&(t.radius=this.radius),(this.mapSize.x!==512||this.mapSize.y!==512)&&(t.mapSize=this.mapSize.toArray()),t.camera=this.camera.toJSON(!1).object,delete t.camera.matrix,t}}class Dc extends bc{constructor(t=-1,e=1,i=1,r=-1,a=.1,o=2e3){super(),this.isOrthographicCamera=!0,this.type="OrthographicCamera",this.zoom=1,this.view=null,this.left=t,this.right=e,this.top=i,this.bottom=r,this.near=a,this.far=o,this.updateProjectionMatrix()}copy(t,e){return super.copy(t,e),this.left=t.left,this.right=t.right,this.top=t.top,this.bottom=t.bottom,this.near=t.near,this.far=t.far,this.zoom=t.zoom,this.view=t.view===null?null:Object.assign({},t.view),this}setViewOffset(t,e,i,r,a,o){this.view===null&&(this.view={enabled:!0,fullWidth:1,fullHeight:1,offsetX:0,offsetY:0,width:1,height:1}),this.view.enabled=!0,this.view.fullWidth=t,this.view.fullHeight=e,this.view.offsetX=i,this.view.offsetY=r,this.view.width=a,this.view.height=o,this.updateProjectionMatrix()}clearViewOffset(){this.view!==null&&(this.view.enabled=!1),this.updateProjectionMatrix()}updateProjectionMatrix(){const t=(this.right-this.left)/(2*this.zoom),e=(this.top-this.bottom)/(2*this.zoom),i=(this.right+this.left)/2,r=(this.top+this.bottom)/2;let a=i-t,o=i+t,s=r+e,c=r-e;if(this.view!==null&&this.view.enabled){const l=(this.right-this.left)/this.view.fullWidth/this.zoom,h=(this.top-this.bottom)/this.view.fullHeight/this.zoom;a+=l*this.view.offsetX,o=a+l*this.view.width,s-=h*this.view.offsetY,c=s-h*this.view.height}this.projectionMatrix.makeOrthographic(a,o,s,c,this.near,this.far,this.coordinateSystem),this.projectionMatrixInverse.copy(this.projectionMatrix).invert()}toJSON(t){const e=super.toJSON(t);return e.object.zoom=this.zoom,e.object.left=this.left,e.object.right=this.right,e.object.top=this.top,e.object.bottom=this.bottom,e.object.near=this.near,e.object.far=this.far,this.view!==null&&(e.object.view=Object.assign({},this.view)),e}}class hf extends uf{constructor(){super(new Dc(-5,5,5,-5,.5,500)),this.isDirectionalLightShadow=!0}}class Lc extends Pc{constructor(t,e){super(t,e),this.isDirectionalLight=!0,this.type="DirectionalLight",this.position.copy(xe.DEFAULT_UP),this.updateMatrix(),this.target=new xe,this.shadow=new hf}dispose(){this.shadow.dispose()}copy(t){return super.copy(t),this.target=t.target.clone(),this.shadow=t.shadow.clone(),this}}class Ic extends Pc{constructor(t,e){super(t,e),this.isAmbientLight=!0,this.type="AmbientLight"}}class ff extends Pe{constructor(t=[]){super(),this.isArrayCamera=!0,this.cameras=t,this.index=0}}class Uc{constructor(t=!0){this.autoStart=t,this.startTime=0,this.oldTime=0,this.elapsedTime=0,this.running=!1}start(){this.startTime=po(),this.oldTime=this.startTime,this.elapsedTime=0,this.running=!0}stop(){this.getElapsedTime(),this.running=!1,this.autoStart=!1}getElapsedTime(){return this.getDelta(),this.elapsedTime}getDelta(){let t=0;if(this.autoStart&&!this.running)return this.start(),0;if(this.running){const e=po();t=(e-this.oldTime)/1e3,this.oldTime=e,this.elapsedTime+=t}return t}}function po(){return performance.now()}function mo(n,t,e,i){const r=df(i);switch(e){case cc:return n*t;case uc:return n*t;case hc:return n*t*2;case fc:return n*t/r.components*r.byteLength;case ps:return n*t/r.components*r.byteLength;case dc:return n*t*2/r.components*r.byteLength;case ms:return n*t*2/r.components*r.byteLength;case lc:return n*t*3/r.components*r.byteLength;case Ye:return n*t*4/r.components*r.byteLength;case _s:return n*t*4/r.components*r.byteLength;case xr:case Mr:return Math.floor((n+3)/4)*Math.floor((t+3)/4)*8;case Sr:case Er:return Math.floor((n+3)/4)*Math.floor((t+3)/4)*16;case La:case Ua:return Math.max(n,16)*Math.max(t,8)/4;case Da:case Ia:return Math.max(n,8)*Math.max(t,8)/2;case Na:case Fa:return Math.floor((n+3)/4)*Math.floor((t+3)/4)*8;case Oa:return Math.floor((n+3)/4)*Math.floor((t+3)/4)*16;case Ba:return Math.floor((n+3)/4)*Math.floor((t+3)/4)*16;case za:return Math.floor((n+4)/5)*Math.floor((t+3)/4)*16;case Ha:return Math.floor((n+4)/5)*Math.floor((t+4)/5)*16;case Va:return Math.floor((n+5)/6)*Math.floor((t+4)/5)*16;case Ga:return Math.floor((n+5)/6)*Math.floor((t+5)/6)*16;case ka:return Math.floor((n+7)/8)*Math.floor((t+4)/5)*16;case Wa:return Math.floor((n+7)/8)*Math.floor((t+5)/6)*16;case Xa:return Math.floor((n+7)/8)*Math.floor((t+7)/8)*16;case qa:return Math.floor((n+9)/10)*Math.floor((t+4)/5)*16;case Ya:return Math.floor((n+9)/10)*Math.floor((t+5)/6)*16;case $a:return Math.floor((n+9)/10)*Math.floor((t+7)/8)*16;case Za:return Math.floor((n+9)/10)*Math.floor((t+9)/10)*16;case Ka:return Math.floor((n+11)/12)*Math.floor((t+9)/10)*16;case ja:return Math.floor((n+11)/12)*Math.floor((t+11)/12)*16;case yr:case Ja:case Qa:return Math.ceil(n/4)*Math.ceil(t/4)*16;case pc:case ts:return Math.ceil(n/4)*Math.ceil(t/4)*8;case es:case ns:return Math.ceil(n/4)*Math.ceil(t/4)*16}throw new Error(`Unable to determine texture byte length for ${e} format.`)}function df(n){switch(n){case pn:case ac:return{byteLength:1,components:1};case Bi:case sc:case Vi:return{byteLength:2,components:1};case fs:case ds:return{byteLength:2,components:4};case Wn:case hs:case un:return{byteLength:4,components:1};case oc:return{byteLength:4,components:3}}throw new Error(`Unknown texture type ${n}.`)}typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("register",{detail:{revision:ls}}));typeof window<"u"&&(window.__THREE__?console.warn("WARNING: Multiple instances of Three.js being imported."):window.__THREE__=ls);/**
 * @license
 * Copyright 2010-2025 Three.js Authors
 * SPDX-License-Identifier: MIT
 */function Nc(){let n=null,t=!1,e=null,i=null;function r(a,o){e(a,o),i=n.requestAnimationFrame(r)}return{start:function(){t!==!0&&e!==null&&(i=n.requestAnimationFrame(r),t=!0)},stop:function(){n.cancelAnimationFrame(i),t=!1},setAnimationLoop:function(a){e=a},setContext:function(a){n=a}}}function pf(n){const t=new WeakMap;function e(s,c){const l=s.array,h=s.usage,u=l.byteLength,d=n.createBuffer();n.bindBuffer(c,d),n.bufferData(c,l,h),s.onUploadCallback();let p;if(l instanceof Float32Array)p=n.FLOAT;else if(l instanceof Uint16Array)s.isFloat16BufferAttribute?p=n.HALF_FLOAT:p=n.UNSIGNED_SHORT;else if(l instanceof Int16Array)p=n.SHORT;else if(l instanceof Uint32Array)p=n.UNSIGNED_INT;else if(l instanceof Int32Array)p=n.INT;else if(l instanceof Int8Array)p=n.BYTE;else if(l instanceof Uint8Array)p=n.UNSIGNED_BYTE;else if(l instanceof Uint8ClampedArray)p=n.UNSIGNED_BYTE;else throw new Error("THREE.WebGLAttributes: Unsupported buffer data format: "+l);return{buffer:d,type:p,bytesPerElement:l.BYTES_PER_ELEMENT,version:s.version,size:u}}function i(s,c,l){const h=c.array,u=c.updateRanges;if(n.bindBuffer(l,s),u.length===0)n.bufferSubData(l,0,h);else{u.sort((p,_)=>p.start-_.start);let d=0;for(let p=1;p<u.length;p++){const _=u[d],v=u[p];v.start<=_.start+_.count+1?_.count=Math.max(_.count,v.start+v.count-_.start):(++d,u[d]=v)}u.length=d+1;for(let p=0,_=u.length;p<_;p++){const v=u[p];n.bufferSubData(l,v.start*h.BYTES_PER_ELEMENT,h,v.start,v.count)}c.clearUpdateRanges()}c.onUploadCallback()}function r(s){return s.isInterleavedBufferAttribute&&(s=s.data),t.get(s)}function a(s){s.isInterleavedBufferAttribute&&(s=s.data);const c=t.get(s);c&&(n.deleteBuffer(c.buffer),t.delete(s))}function o(s,c){if(s.isInterleavedBufferAttribute&&(s=s.data),s.isGLBufferAttribute){const h=t.get(s);(!h||h.version<s.version)&&t.set(s,{buffer:s.buffer,type:s.type,bytesPerElement:s.elementSize,version:s.version});return}const l=t.get(s);if(l===void 0)t.set(s,e(s,c));else if(l.version<s.version){if(l.size!==s.array.byteLength)throw new Error("THREE.WebGLAttributes: The size of the buffer attribute's array buffer does not match the original size. Resizing buffer attributes is not supported.");i(l.buffer,s,c),l.version=s.version}}return{get:r,remove:a,update:o}}var mf=`#ifdef USE_ALPHAHASH
	if ( diffuseColor.a < getAlphaHashThreshold( vPosition ) ) discard;
#endif`,_f=`#ifdef USE_ALPHAHASH
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
#endif`,gf=`#ifdef USE_ALPHAMAP
	diffuseColor.a *= texture2D( alphaMap, vAlphaMapUv ).g;
#endif`,vf=`#ifdef USE_ALPHAMAP
	uniform sampler2D alphaMap;
#endif`,xf=`#ifdef USE_ALPHATEST
	#ifdef ALPHA_TO_COVERAGE
	diffuseColor.a = smoothstep( alphaTest, alphaTest + fwidth( diffuseColor.a ), diffuseColor.a );
	if ( diffuseColor.a == 0.0 ) discard;
	#else
	if ( diffuseColor.a < alphaTest ) discard;
	#endif
#endif`,Mf=`#ifdef USE_ALPHATEST
	uniform float alphaTest;
#endif`,Sf=`#ifdef USE_AOMAP
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
#endif`,Ef=`#ifdef USE_AOMAP
	uniform sampler2D aoMap;
	uniform float aoMapIntensity;
#endif`,yf=`#ifdef USE_BATCHING
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
#endif`,Tf=`#ifdef USE_BATCHING
	mat4 batchingMatrix = getBatchingMatrix( getIndirectIndex( gl_DrawID ) );
#endif`,bf=`vec3 transformed = vec3( position );
#ifdef USE_ALPHAHASH
	vPosition = vec3( position );
#endif`,Af=`vec3 objectNormal = vec3( normal );
#ifdef USE_TANGENT
	vec3 objectTangent = vec3( tangent.xyz );
#endif`,wf=`float G_BlinnPhong_Implicit( ) {
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
} // validated`,Rf=`#ifdef USE_IRIDESCENCE
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
#endif`,Cf=`#ifdef USE_BUMPMAP
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
#endif`,Pf=`#if NUM_CLIPPING_PLANES > 0
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
#endif`,Df=`#if NUM_CLIPPING_PLANES > 0
	varying vec3 vClipPosition;
	uniform vec4 clippingPlanes[ NUM_CLIPPING_PLANES ];
#endif`,Lf=`#if NUM_CLIPPING_PLANES > 0
	varying vec3 vClipPosition;
#endif`,If=`#if NUM_CLIPPING_PLANES > 0
	vClipPosition = - mvPosition.xyz;
#endif`,Uf=`#if defined( USE_COLOR_ALPHA )
	diffuseColor *= vColor;
#elif defined( USE_COLOR )
	diffuseColor.rgb *= vColor;
#endif`,Nf=`#if defined( USE_COLOR_ALPHA )
	varying vec4 vColor;
#elif defined( USE_COLOR )
	varying vec3 vColor;
#endif`,Ff=`#if defined( USE_COLOR_ALPHA )
	varying vec4 vColor;
#elif defined( USE_COLOR ) || defined( USE_INSTANCING_COLOR ) || defined( USE_BATCHING_COLOR )
	varying vec3 vColor;
#endif`,Of=`#if defined( USE_COLOR_ALPHA )
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
#endif`,Bf=`#define PI 3.141592653589793
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
} // validated`,zf=`#ifdef ENVMAP_TYPE_CUBE_UV
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
#endif`,Hf=`vec3 transformedNormal = objectNormal;
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
#endif`,Vf=`#ifdef USE_DISPLACEMENTMAP
	uniform sampler2D displacementMap;
	uniform float displacementScale;
	uniform float displacementBias;
#endif`,Gf=`#ifdef USE_DISPLACEMENTMAP
	transformed += normalize( objectNormal ) * ( texture2D( displacementMap, vDisplacementMapUv ).x * displacementScale + displacementBias );
#endif`,kf=`#ifdef USE_EMISSIVEMAP
	vec4 emissiveColor = texture2D( emissiveMap, vEmissiveMapUv );
	#ifdef DECODE_VIDEO_TEXTURE_EMISSIVE
		emissiveColor = sRGBTransferEOTF( emissiveColor );
	#endif
	totalEmissiveRadiance *= emissiveColor.rgb;
#endif`,Wf=`#ifdef USE_EMISSIVEMAP
	uniform sampler2D emissiveMap;
#endif`,Xf="gl_FragColor = linearToOutputTexel( gl_FragColor );",qf=`vec4 LinearTransferOETF( in vec4 value ) {
	return value;
}
vec4 sRGBTransferEOTF( in vec4 value ) {
	return vec4( mix( pow( value.rgb * 0.9478672986 + vec3( 0.0521327014 ), vec3( 2.4 ) ), value.rgb * 0.0773993808, vec3( lessThanEqual( value.rgb, vec3( 0.04045 ) ) ) ), value.a );
}
vec4 sRGBTransferOETF( in vec4 value ) {
	return vec4( mix( pow( value.rgb, vec3( 0.41666 ) ) * 1.055 - vec3( 0.055 ), value.rgb * 12.92, vec3( lessThanEqual( value.rgb, vec3( 0.0031308 ) ) ) ), value.a );
}`,Yf=`#ifdef USE_ENVMAP
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
#endif`,$f=`#ifdef USE_ENVMAP
	uniform float envMapIntensity;
	uniform float flipEnvMap;
	uniform mat3 envMapRotation;
	#ifdef ENVMAP_TYPE_CUBE
		uniform samplerCube envMap;
	#else
		uniform sampler2D envMap;
	#endif
	
#endif`,Zf=`#ifdef USE_ENVMAP
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
#endif`,Kf=`#ifdef USE_ENVMAP
	#if defined( USE_BUMPMAP ) || defined( USE_NORMALMAP ) || defined( PHONG ) || defined( LAMBERT )
		#define ENV_WORLDPOS
	#endif
	#ifdef ENV_WORLDPOS
		
		varying vec3 vWorldPosition;
	#else
		varying vec3 vReflect;
		uniform float refractionRatio;
	#endif
#endif`,jf=`#ifdef USE_ENVMAP
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
#endif`,Jf=`#ifdef USE_FOG
	vFogDepth = - mvPosition.z;
#endif`,Qf=`#ifdef USE_FOG
	varying float vFogDepth;
#endif`,td=`#ifdef USE_FOG
	#ifdef FOG_EXP2
		float fogFactor = 1.0 - exp( - fogDensity * fogDensity * vFogDepth * vFogDepth );
	#else
		float fogFactor = smoothstep( fogNear, fogFar, vFogDepth );
	#endif
	gl_FragColor.rgb = mix( gl_FragColor.rgb, fogColor, fogFactor );
#endif`,ed=`#ifdef USE_FOG
	uniform vec3 fogColor;
	varying float vFogDepth;
	#ifdef FOG_EXP2
		uniform float fogDensity;
	#else
		uniform float fogNear;
		uniform float fogFar;
	#endif
#endif`,nd=`#ifdef USE_GRADIENTMAP
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
}`,id=`#ifdef USE_LIGHTMAP
	uniform sampler2D lightMap;
	uniform float lightMapIntensity;
#endif`,rd=`LambertMaterial material;
material.diffuseColor = diffuseColor.rgb;
material.specularStrength = specularStrength;`,ad=`varying vec3 vViewPosition;
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
#define RE_IndirectDiffuse		RE_IndirectDiffuse_Lambert`,sd=`uniform bool receiveShadow;
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
#endif`,od=`#ifdef USE_ENVMAP
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
#endif`,cd=`ToonMaterial material;
material.diffuseColor = diffuseColor.rgb;`,ld=`varying vec3 vViewPosition;
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
#define RE_IndirectDiffuse		RE_IndirectDiffuse_Toon`,ud=`BlinnPhongMaterial material;
material.diffuseColor = diffuseColor.rgb;
material.specularColor = specular;
material.specularShininess = shininess;
material.specularStrength = specularStrength;`,hd=`varying vec3 vViewPosition;
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
#define RE_IndirectDiffuse		RE_IndirectDiffuse_BlinnPhong`,fd=`PhysicalMaterial material;
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
#endif`,dd=`struct PhysicalMaterial {
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
}`,pd=`
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
#endif`,md=`#if defined( RE_IndirectDiffuse )
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
#endif`,_d=`#if defined( RE_IndirectDiffuse )
	RE_IndirectDiffuse( irradiance, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
#endif
#if defined( RE_IndirectSpecular )
	RE_IndirectSpecular( radiance, iblIrradiance, clearcoatRadiance, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
#endif`,gd=`#if defined( USE_LOGDEPTHBUF )
	gl_FragDepth = vIsPerspective == 0.0 ? gl_FragCoord.z : log2( vFragDepth ) * logDepthBufFC * 0.5;
#endif`,vd=`#if defined( USE_LOGDEPTHBUF )
	uniform float logDepthBufFC;
	varying float vFragDepth;
	varying float vIsPerspective;
#endif`,xd=`#ifdef USE_LOGDEPTHBUF
	varying float vFragDepth;
	varying float vIsPerspective;
#endif`,Md=`#ifdef USE_LOGDEPTHBUF
	vFragDepth = 1.0 + gl_Position.w;
	vIsPerspective = float( isPerspectiveMatrix( projectionMatrix ) );
#endif`,Sd=`#ifdef USE_MAP
	vec4 sampledDiffuseColor = texture2D( map, vMapUv );
	#ifdef DECODE_VIDEO_TEXTURE
		sampledDiffuseColor = sRGBTransferEOTF( sampledDiffuseColor );
	#endif
	diffuseColor *= sampledDiffuseColor;
#endif`,Ed=`#ifdef USE_MAP
	uniform sampler2D map;
#endif`,yd=`#if defined( USE_MAP ) || defined( USE_ALPHAMAP )
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
#endif`,Td=`#if defined( USE_POINTS_UV )
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
#endif`,bd=`float metalnessFactor = metalness;
#ifdef USE_METALNESSMAP
	vec4 texelMetalness = texture2D( metalnessMap, vMetalnessMapUv );
	metalnessFactor *= texelMetalness.b;
#endif`,Ad=`#ifdef USE_METALNESSMAP
	uniform sampler2D metalnessMap;
#endif`,wd=`#ifdef USE_INSTANCING_MORPH
	float morphTargetInfluences[ MORPHTARGETS_COUNT ];
	float morphTargetBaseInfluence = texelFetch( morphTexture, ivec2( 0, gl_InstanceID ), 0 ).r;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		morphTargetInfluences[i] =  texelFetch( morphTexture, ivec2( i + 1, gl_InstanceID ), 0 ).r;
	}
#endif`,Rd=`#if defined( USE_MORPHCOLORS )
	vColor *= morphTargetBaseInfluence;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		#if defined( USE_COLOR_ALPHA )
			if ( morphTargetInfluences[ i ] != 0.0 ) vColor += getMorph( gl_VertexID, i, 2 ) * morphTargetInfluences[ i ];
		#elif defined( USE_COLOR )
			if ( morphTargetInfluences[ i ] != 0.0 ) vColor += getMorph( gl_VertexID, i, 2 ).rgb * morphTargetInfluences[ i ];
		#endif
	}
#endif`,Cd=`#ifdef USE_MORPHNORMALS
	objectNormal *= morphTargetBaseInfluence;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		if ( morphTargetInfluences[ i ] != 0.0 ) objectNormal += getMorph( gl_VertexID, i, 1 ).xyz * morphTargetInfluences[ i ];
	}
#endif`,Pd=`#ifdef USE_MORPHTARGETS
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
#endif`,Dd=`#ifdef USE_MORPHTARGETS
	transformed *= morphTargetBaseInfluence;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		if ( morphTargetInfluences[ i ] != 0.0 ) transformed += getMorph( gl_VertexID, i, 0 ).xyz * morphTargetInfluences[ i ];
	}
#endif`,Ld=`float faceDirection = gl_FrontFacing ? 1.0 : - 1.0;
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
vec3 nonPerturbedNormal = normal;`,Id=`#ifdef USE_NORMALMAP_OBJECTSPACE
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
#endif`,Ud=`#ifndef FLAT_SHADED
	varying vec3 vNormal;
	#ifdef USE_TANGENT
		varying vec3 vTangent;
		varying vec3 vBitangent;
	#endif
#endif`,Nd=`#ifndef FLAT_SHADED
	varying vec3 vNormal;
	#ifdef USE_TANGENT
		varying vec3 vTangent;
		varying vec3 vBitangent;
	#endif
#endif`,Fd=`#ifndef FLAT_SHADED
	vNormal = normalize( transformedNormal );
	#ifdef USE_TANGENT
		vTangent = normalize( transformedTangent );
		vBitangent = normalize( cross( vNormal, vTangent ) * tangent.w );
	#endif
#endif`,Od=`#ifdef USE_NORMALMAP
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
#endif`,Bd=`#ifdef USE_CLEARCOAT
	vec3 clearcoatNormal = nonPerturbedNormal;
#endif`,zd=`#ifdef USE_CLEARCOAT_NORMALMAP
	vec3 clearcoatMapN = texture2D( clearcoatNormalMap, vClearcoatNormalMapUv ).xyz * 2.0 - 1.0;
	clearcoatMapN.xy *= clearcoatNormalScale;
	clearcoatNormal = normalize( tbn2 * clearcoatMapN );
#endif`,Hd=`#ifdef USE_CLEARCOATMAP
	uniform sampler2D clearcoatMap;
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	uniform sampler2D clearcoatNormalMap;
	uniform vec2 clearcoatNormalScale;
#endif
#ifdef USE_CLEARCOAT_ROUGHNESSMAP
	uniform sampler2D clearcoatRoughnessMap;
#endif`,Vd=`#ifdef USE_IRIDESCENCEMAP
	uniform sampler2D iridescenceMap;
#endif
#ifdef USE_IRIDESCENCE_THICKNESSMAP
	uniform sampler2D iridescenceThicknessMap;
#endif`,Gd=`#ifdef OPAQUE
diffuseColor.a = 1.0;
#endif
#ifdef USE_TRANSMISSION
diffuseColor.a *= material.transmissionAlpha;
#endif
gl_FragColor = vec4( outgoingLight, diffuseColor.a );`,kd=`vec3 packNormalToRGB( const in vec3 normal ) {
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
}`,Wd=`#ifdef PREMULTIPLIED_ALPHA
	gl_FragColor.rgb *= gl_FragColor.a;
#endif`,Xd=`vec4 mvPosition = vec4( transformed, 1.0 );
#ifdef USE_BATCHING
	mvPosition = batchingMatrix * mvPosition;
#endif
#ifdef USE_INSTANCING
	mvPosition = instanceMatrix * mvPosition;
#endif
mvPosition = modelViewMatrix * mvPosition;
gl_Position = projectionMatrix * mvPosition;`,qd=`#ifdef DITHERING
	gl_FragColor.rgb = dithering( gl_FragColor.rgb );
#endif`,Yd=`#ifdef DITHERING
	vec3 dithering( vec3 color ) {
		float grid_position = rand( gl_FragCoord.xy );
		vec3 dither_shift_RGB = vec3( 0.25 / 255.0, -0.25 / 255.0, 0.25 / 255.0 );
		dither_shift_RGB = mix( 2.0 * dither_shift_RGB, -2.0 * dither_shift_RGB, grid_position );
		return color + dither_shift_RGB;
	}
#endif`,$d=`float roughnessFactor = roughness;
#ifdef USE_ROUGHNESSMAP
	vec4 texelRoughness = texture2D( roughnessMap, vRoughnessMapUv );
	roughnessFactor *= texelRoughness.g;
#endif`,Zd=`#ifdef USE_ROUGHNESSMAP
	uniform sampler2D roughnessMap;
#endif`,Kd=`#if NUM_SPOT_LIGHT_COORDS > 0
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
#endif`,jd=`#if NUM_SPOT_LIGHT_COORDS > 0
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
#endif`,Jd=`#if ( defined( USE_SHADOWMAP ) && ( NUM_DIR_LIGHT_SHADOWS > 0 || NUM_POINT_LIGHT_SHADOWS > 0 ) ) || ( NUM_SPOT_LIGHT_COORDS > 0 )
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
#endif`,Qd=`float getShadowMask() {
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
}`,tp=`#ifdef USE_SKINNING
	mat4 boneMatX = getBoneMatrix( skinIndex.x );
	mat4 boneMatY = getBoneMatrix( skinIndex.y );
	mat4 boneMatZ = getBoneMatrix( skinIndex.z );
	mat4 boneMatW = getBoneMatrix( skinIndex.w );
#endif`,ep=`#ifdef USE_SKINNING
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
#endif`,np=`#ifdef USE_SKINNING
	vec4 skinVertex = bindMatrix * vec4( transformed, 1.0 );
	vec4 skinned = vec4( 0.0 );
	skinned += boneMatX * skinVertex * skinWeight.x;
	skinned += boneMatY * skinVertex * skinWeight.y;
	skinned += boneMatZ * skinVertex * skinWeight.z;
	skinned += boneMatW * skinVertex * skinWeight.w;
	transformed = ( bindMatrixInverse * skinned ).xyz;
#endif`,ip=`#ifdef USE_SKINNING
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
#endif`,rp=`float specularStrength;
#ifdef USE_SPECULARMAP
	vec4 texelSpecular = texture2D( specularMap, vSpecularMapUv );
	specularStrength = texelSpecular.r;
#else
	specularStrength = 1.0;
#endif`,ap=`#ifdef USE_SPECULARMAP
	uniform sampler2D specularMap;
#endif`,sp=`#if defined( TONE_MAPPING )
	gl_FragColor.rgb = toneMapping( gl_FragColor.rgb );
#endif`,op=`#ifndef saturate
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
vec3 CustomToneMapping( vec3 color ) { return color; }`,cp=`#ifdef USE_TRANSMISSION
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
#endif`,lp=`#ifdef USE_TRANSMISSION
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
#endif`,up=`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
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
#endif`,hp=`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
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
#endif`,fp=`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
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
#endif`,dp=`#if defined( USE_ENVMAP ) || defined( DISTANCE ) || defined ( USE_SHADOWMAP ) || defined ( USE_TRANSMISSION ) || NUM_SPOT_LIGHT_COORDS > 0
	vec4 worldPosition = vec4( transformed, 1.0 );
	#ifdef USE_BATCHING
		worldPosition = batchingMatrix * worldPosition;
	#endif
	#ifdef USE_INSTANCING
		worldPosition = instanceMatrix * worldPosition;
	#endif
	worldPosition = modelMatrix * worldPosition;
#endif`;const pp=`varying vec2 vUv;
uniform mat3 uvTransform;
void main() {
	vUv = ( uvTransform * vec3( uv, 1 ) ).xy;
	gl_Position = vec4( position.xy, 1.0, 1.0 );
}`,mp=`uniform sampler2D t2D;
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
}`,_p=`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
	gl_Position.z = gl_Position.w;
}`,gp=`#ifdef ENVMAP_TYPE_CUBE
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
}`,vp=`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
	gl_Position.z = gl_Position.w;
}`,xp=`uniform samplerCube tCube;
uniform float tFlip;
uniform float opacity;
varying vec3 vWorldDirection;
void main() {
	vec4 texColor = textureCube( tCube, vec3( tFlip * vWorldDirection.x, vWorldDirection.yz ) );
	gl_FragColor = texColor;
	gl_FragColor.a *= opacity;
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,Mp=`#include <common>
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
}`,Sp=`#if DEPTH_PACKING == 3200
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
}`,Ep=`#define DISTANCE
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
}`,yp=`#define DISTANCE
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
}`,Tp=`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
}`,bp=`uniform sampler2D tEquirect;
varying vec3 vWorldDirection;
#include <common>
void main() {
	vec3 direction = normalize( vWorldDirection );
	vec2 sampleUV = equirectUv( direction );
	gl_FragColor = texture2D( tEquirect, sampleUV );
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,Ap=`uniform float scale;
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
}`,wp=`uniform vec3 diffuse;
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
}`,Rp=`#include <common>
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
}`,Cp=`uniform vec3 diffuse;
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
}`,Pp=`#define LAMBERT
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
}`,Dp=`#define LAMBERT
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
}`,Lp=`#define MATCAP
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
}`,Ip=`#define MATCAP
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
}`,Up=`#define NORMAL
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
}`,Np=`#define NORMAL
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
}`,Fp=`#define PHONG
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
}`,Op=`#define PHONG
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
}`,Bp=`#define STANDARD
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
}`,zp=`#define STANDARD
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
}`,Hp=`#define TOON
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
}`,Vp=`#define TOON
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
}`,Gp=`uniform float size;
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
}`,kp=`uniform vec3 diffuse;
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
}`,Wp=`#include <common>
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
}`,Xp=`uniform vec3 color;
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
}`,qp=`uniform float rotation;
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
}`,Yp=`uniform vec3 diffuse;
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
}`,Lt={alphahash_fragment:mf,alphahash_pars_fragment:_f,alphamap_fragment:gf,alphamap_pars_fragment:vf,alphatest_fragment:xf,alphatest_pars_fragment:Mf,aomap_fragment:Sf,aomap_pars_fragment:Ef,batching_pars_vertex:yf,batching_vertex:Tf,begin_vertex:bf,beginnormal_vertex:Af,bsdfs:wf,iridescence_fragment:Rf,bumpmap_pars_fragment:Cf,clipping_planes_fragment:Pf,clipping_planes_pars_fragment:Df,clipping_planes_pars_vertex:Lf,clipping_planes_vertex:If,color_fragment:Uf,color_pars_fragment:Nf,color_pars_vertex:Ff,color_vertex:Of,common:Bf,cube_uv_reflection_fragment:zf,defaultnormal_vertex:Hf,displacementmap_pars_vertex:Vf,displacementmap_vertex:Gf,emissivemap_fragment:kf,emissivemap_pars_fragment:Wf,colorspace_fragment:Xf,colorspace_pars_fragment:qf,envmap_fragment:Yf,envmap_common_pars_fragment:$f,envmap_pars_fragment:Zf,envmap_pars_vertex:Kf,envmap_physical_pars_fragment:od,envmap_vertex:jf,fog_vertex:Jf,fog_pars_vertex:Qf,fog_fragment:td,fog_pars_fragment:ed,gradientmap_pars_fragment:nd,lightmap_pars_fragment:id,lights_lambert_fragment:rd,lights_lambert_pars_fragment:ad,lights_pars_begin:sd,lights_toon_fragment:cd,lights_toon_pars_fragment:ld,lights_phong_fragment:ud,lights_phong_pars_fragment:hd,lights_physical_fragment:fd,lights_physical_pars_fragment:dd,lights_fragment_begin:pd,lights_fragment_maps:md,lights_fragment_end:_d,logdepthbuf_fragment:gd,logdepthbuf_pars_fragment:vd,logdepthbuf_pars_vertex:xd,logdepthbuf_vertex:Md,map_fragment:Sd,map_pars_fragment:Ed,map_particle_fragment:yd,map_particle_pars_fragment:Td,metalnessmap_fragment:bd,metalnessmap_pars_fragment:Ad,morphinstance_vertex:wd,morphcolor_vertex:Rd,morphnormal_vertex:Cd,morphtarget_pars_vertex:Pd,morphtarget_vertex:Dd,normal_fragment_begin:Ld,normal_fragment_maps:Id,normal_pars_fragment:Ud,normal_pars_vertex:Nd,normal_vertex:Fd,normalmap_pars_fragment:Od,clearcoat_normal_fragment_begin:Bd,clearcoat_normal_fragment_maps:zd,clearcoat_pars_fragment:Hd,iridescence_pars_fragment:Vd,opaque_fragment:Gd,packing:kd,premultiplied_alpha_fragment:Wd,project_vertex:Xd,dithering_fragment:qd,dithering_pars_fragment:Yd,roughnessmap_fragment:$d,roughnessmap_pars_fragment:Zd,shadowmap_pars_fragment:Kd,shadowmap_pars_vertex:jd,shadowmap_vertex:Jd,shadowmask_pars_fragment:Qd,skinbase_vertex:tp,skinning_pars_vertex:ep,skinning_vertex:np,skinnormal_vertex:ip,specularmap_fragment:rp,specularmap_pars_fragment:ap,tonemapping_fragment:sp,tonemapping_pars_fragment:op,transmission_fragment:cp,transmission_pars_fragment:lp,uv_pars_fragment:up,uv_pars_vertex:hp,uv_vertex:fp,worldpos_vertex:dp,background_vert:pp,background_frag:mp,backgroundCube_vert:_p,backgroundCube_frag:gp,cube_vert:vp,cube_frag:xp,depth_vert:Mp,depth_frag:Sp,distanceRGBA_vert:Ep,distanceRGBA_frag:yp,equirect_vert:Tp,equirect_frag:bp,linedashed_vert:Ap,linedashed_frag:wp,meshbasic_vert:Rp,meshbasic_frag:Cp,meshlambert_vert:Pp,meshlambert_frag:Dp,meshmatcap_vert:Lp,meshmatcap_frag:Ip,meshnormal_vert:Up,meshnormal_frag:Np,meshphong_vert:Fp,meshphong_frag:Op,meshphysical_vert:Bp,meshphysical_frag:zp,meshtoon_vert:Hp,meshtoon_frag:Vp,points_vert:Gp,points_frag:kp,shadow_vert:Wp,shadow_frag:Xp,sprite_vert:qp,sprite_frag:Yp},nt={common:{diffuse:{value:new Ft(16777215)},opacity:{value:1},map:{value:null},mapTransform:{value:new Pt},alphaMap:{value:null},alphaMapTransform:{value:new Pt},alphaTest:{value:0}},specularmap:{specularMap:{value:null},specularMapTransform:{value:new Pt}},envmap:{envMap:{value:null},envMapRotation:{value:new Pt},flipEnvMap:{value:-1},reflectivity:{value:1},ior:{value:1.5},refractionRatio:{value:.98}},aomap:{aoMap:{value:null},aoMapIntensity:{value:1},aoMapTransform:{value:new Pt}},lightmap:{lightMap:{value:null},lightMapIntensity:{value:1},lightMapTransform:{value:new Pt}},bumpmap:{bumpMap:{value:null},bumpMapTransform:{value:new Pt},bumpScale:{value:1}},normalmap:{normalMap:{value:null},normalMapTransform:{value:new Pt},normalScale:{value:new Yt(1,1)}},displacementmap:{displacementMap:{value:null},displacementMapTransform:{value:new Pt},displacementScale:{value:1},displacementBias:{value:0}},emissivemap:{emissiveMap:{value:null},emissiveMapTransform:{value:new Pt}},metalnessmap:{metalnessMap:{value:null},metalnessMapTransform:{value:new Pt}},roughnessmap:{roughnessMap:{value:null},roughnessMapTransform:{value:new Pt}},gradientmap:{gradientMap:{value:null}},fog:{fogDensity:{value:25e-5},fogNear:{value:1},fogFar:{value:2e3},fogColor:{value:new Ft(16777215)}},lights:{ambientLightColor:{value:[]},lightProbe:{value:[]},directionalLights:{value:[],properties:{direction:{},color:{}}},directionalLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{}}},directionalShadowMap:{value:[]},directionalShadowMatrix:{value:[]},spotLights:{value:[],properties:{color:{},position:{},direction:{},distance:{},coneCos:{},penumbraCos:{},decay:{}}},spotLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{}}},spotLightMap:{value:[]},spotShadowMap:{value:[]},spotLightMatrix:{value:[]},pointLights:{value:[],properties:{color:{},position:{},decay:{},distance:{}}},pointLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{},shadowCameraNear:{},shadowCameraFar:{}}},pointShadowMap:{value:[]},pointShadowMatrix:{value:[]},hemisphereLights:{value:[],properties:{direction:{},skyColor:{},groundColor:{}}},rectAreaLights:{value:[],properties:{color:{},position:{},width:{},height:{}}},ltc_1:{value:null},ltc_2:{value:null}},points:{diffuse:{value:new Ft(16777215)},opacity:{value:1},size:{value:1},scale:{value:1},map:{value:null},alphaMap:{value:null},alphaMapTransform:{value:new Pt},alphaTest:{value:0},uvTransform:{value:new Pt}},sprite:{diffuse:{value:new Ft(16777215)},opacity:{value:1},center:{value:new Yt(.5,.5)},rotation:{value:0},map:{value:null},mapTransform:{value:new Pt},alphaMap:{value:null},alphaMapTransform:{value:new Pt},alphaTest:{value:0}}},Ke={basic:{uniforms:Ee([nt.common,nt.specularmap,nt.envmap,nt.aomap,nt.lightmap,nt.fog]),vertexShader:Lt.meshbasic_vert,fragmentShader:Lt.meshbasic_frag},lambert:{uniforms:Ee([nt.common,nt.specularmap,nt.envmap,nt.aomap,nt.lightmap,nt.emissivemap,nt.bumpmap,nt.normalmap,nt.displacementmap,nt.fog,nt.lights,{emissive:{value:new Ft(0)}}]),vertexShader:Lt.meshlambert_vert,fragmentShader:Lt.meshlambert_frag},phong:{uniforms:Ee([nt.common,nt.specularmap,nt.envmap,nt.aomap,nt.lightmap,nt.emissivemap,nt.bumpmap,nt.normalmap,nt.displacementmap,nt.fog,nt.lights,{emissive:{value:new Ft(0)},specular:{value:new Ft(1118481)},shininess:{value:30}}]),vertexShader:Lt.meshphong_vert,fragmentShader:Lt.meshphong_frag},standard:{uniforms:Ee([nt.common,nt.envmap,nt.aomap,nt.lightmap,nt.emissivemap,nt.bumpmap,nt.normalmap,nt.displacementmap,nt.roughnessmap,nt.metalnessmap,nt.fog,nt.lights,{emissive:{value:new Ft(0)},roughness:{value:1},metalness:{value:0},envMapIntensity:{value:1}}]),vertexShader:Lt.meshphysical_vert,fragmentShader:Lt.meshphysical_frag},toon:{uniforms:Ee([nt.common,nt.aomap,nt.lightmap,nt.emissivemap,nt.bumpmap,nt.normalmap,nt.displacementmap,nt.gradientmap,nt.fog,nt.lights,{emissive:{value:new Ft(0)}}]),vertexShader:Lt.meshtoon_vert,fragmentShader:Lt.meshtoon_frag},matcap:{uniforms:Ee([nt.common,nt.bumpmap,nt.normalmap,nt.displacementmap,nt.fog,{matcap:{value:null}}]),vertexShader:Lt.meshmatcap_vert,fragmentShader:Lt.meshmatcap_frag},points:{uniforms:Ee([nt.points,nt.fog]),vertexShader:Lt.points_vert,fragmentShader:Lt.points_frag},dashed:{uniforms:Ee([nt.common,nt.fog,{scale:{value:1},dashSize:{value:1},totalSize:{value:2}}]),vertexShader:Lt.linedashed_vert,fragmentShader:Lt.linedashed_frag},depth:{uniforms:Ee([nt.common,nt.displacementmap]),vertexShader:Lt.depth_vert,fragmentShader:Lt.depth_frag},normal:{uniforms:Ee([nt.common,nt.bumpmap,nt.normalmap,nt.displacementmap,{opacity:{value:1}}]),vertexShader:Lt.meshnormal_vert,fragmentShader:Lt.meshnormal_frag},sprite:{uniforms:Ee([nt.sprite,nt.fog]),vertexShader:Lt.sprite_vert,fragmentShader:Lt.sprite_frag},background:{uniforms:{uvTransform:{value:new Pt},t2D:{value:null},backgroundIntensity:{value:1}},vertexShader:Lt.background_vert,fragmentShader:Lt.background_frag},backgroundCube:{uniforms:{envMap:{value:null},flipEnvMap:{value:-1},backgroundBlurriness:{value:0},backgroundIntensity:{value:1},backgroundRotation:{value:new Pt}},vertexShader:Lt.backgroundCube_vert,fragmentShader:Lt.backgroundCube_frag},cube:{uniforms:{tCube:{value:null},tFlip:{value:-1},opacity:{value:1}},vertexShader:Lt.cube_vert,fragmentShader:Lt.cube_frag},equirect:{uniforms:{tEquirect:{value:null}},vertexShader:Lt.equirect_vert,fragmentShader:Lt.equirect_frag},distanceRGBA:{uniforms:Ee([nt.common,nt.displacementmap,{referencePosition:{value:new B},nearDistance:{value:1},farDistance:{value:1e3}}]),vertexShader:Lt.distanceRGBA_vert,fragmentShader:Lt.distanceRGBA_frag},shadow:{uniforms:Ee([nt.lights,nt.fog,{color:{value:new Ft(0)},opacity:{value:1}}]),vertexShader:Lt.shadow_vert,fragmentShader:Lt.shadow_frag}};Ke.physical={uniforms:Ee([Ke.standard.uniforms,{clearcoat:{value:0},clearcoatMap:{value:null},clearcoatMapTransform:{value:new Pt},clearcoatNormalMap:{value:null},clearcoatNormalMapTransform:{value:new Pt},clearcoatNormalScale:{value:new Yt(1,1)},clearcoatRoughness:{value:0},clearcoatRoughnessMap:{value:null},clearcoatRoughnessMapTransform:{value:new Pt},dispersion:{value:0},iridescence:{value:0},iridescenceMap:{value:null},iridescenceMapTransform:{value:new Pt},iridescenceIOR:{value:1.3},iridescenceThicknessMinimum:{value:100},iridescenceThicknessMaximum:{value:400},iridescenceThicknessMap:{value:null},iridescenceThicknessMapTransform:{value:new Pt},sheen:{value:0},sheenColor:{value:new Ft(0)},sheenColorMap:{value:null},sheenColorMapTransform:{value:new Pt},sheenRoughness:{value:1},sheenRoughnessMap:{value:null},sheenRoughnessMapTransform:{value:new Pt},transmission:{value:0},transmissionMap:{value:null},transmissionMapTransform:{value:new Pt},transmissionSamplerSize:{value:new Yt},transmissionSamplerMap:{value:null},thickness:{value:0},thicknessMap:{value:null},thicknessMapTransform:{value:new Pt},attenuationDistance:{value:0},attenuationColor:{value:new Ft(0)},specularColor:{value:new Ft(1,1,1)},specularColorMap:{value:null},specularColorMapTransform:{value:new Pt},specularIntensity:{value:1},specularIntensityMap:{value:null},specularIntensityMapTransform:{value:new Pt},anisotropyVector:{value:new Yt},anisotropyMap:{value:null},anisotropyMapTransform:{value:new Pt}}]),vertexShader:Lt.meshphysical_vert,fragmentShader:Lt.meshphysical_frag};const pr={r:0,b:0,g:0},Un=new Ze,$p=new se;function Zp(n,t,e,i,r,a,o){const s=new Ft(0);let c=a===!0?0:1,l,h,u=null,d=0,p=null;function _(y){let E=y.isScene===!0?y.background:null;return E&&E.isTexture&&(E=(y.backgroundBlurriness>0?e:t).get(E)),E}function v(y){let E=!1;const C=_(y);C===null?f(s,c):C&&C.isColor&&(f(C,1),E=!0);const b=n.xr.getEnvironmentBlendMode();b==="additive"?i.buffers.color.setClear(0,0,0,1,o):b==="alpha-blend"&&i.buffers.color.setClear(0,0,0,0,o),(n.autoClear||E)&&(i.buffers.depth.setTest(!0),i.buffers.depth.setMask(!0),i.buffers.color.setMask(!0),n.clear(n.autoClearColor,n.autoClearDepth,n.autoClearStencil))}function m(y,E){const C=_(E);C&&(C.isCubeTexture||C.mapping===Ir)?(h===void 0&&(h=new Be(new Wi(1,1,1),new An({name:"BackgroundCubeMaterial",uniforms:Si(Ke.backgroundCube.uniforms),vertexShader:Ke.backgroundCube.vertexShader,fragmentShader:Ke.backgroundCube.fragmentShader,side:be,depthTest:!1,depthWrite:!1,fog:!1})),h.geometry.deleteAttribute("normal"),h.geometry.deleteAttribute("uv"),h.onBeforeRender=function(b,A,I){this.matrixWorld.copyPosition(I.matrixWorld)},Object.defineProperty(h.material,"envMap",{get:function(){return this.uniforms.envMap.value}}),r.update(h)),Un.copy(E.backgroundRotation),Un.x*=-1,Un.y*=-1,Un.z*=-1,C.isCubeTexture&&C.isRenderTargetTexture===!1&&(Un.y*=-1,Un.z*=-1),h.material.uniforms.envMap.value=C,h.material.uniforms.flipEnvMap.value=C.isCubeTexture&&C.isRenderTargetTexture===!1?-1:1,h.material.uniforms.backgroundBlurriness.value=E.backgroundBlurriness,h.material.uniforms.backgroundIntensity.value=E.backgroundIntensity,h.material.uniforms.backgroundRotation.value.setFromMatrix4($p.makeRotationFromEuler(Un)),h.material.toneMapped=Wt.getTransfer(C.colorSpace)!==jt,(u!==C||d!==C.version||p!==n.toneMapping)&&(h.material.needsUpdate=!0,u=C,d=C.version,p=n.toneMapping),h.layers.enableAll(),y.unshift(h,h.geometry,h.material,0,0,null)):C&&C.isTexture&&(l===void 0&&(l=new Be(new Xi(2,2),new An({name:"BackgroundMaterial",uniforms:Si(Ke.background.uniforms),vertexShader:Ke.background.vertexShader,fragmentShader:Ke.background.fragmentShader,side:bn,depthTest:!1,depthWrite:!1,fog:!1})),l.geometry.deleteAttribute("normal"),Object.defineProperty(l.material,"map",{get:function(){return this.uniforms.t2D.value}}),r.update(l)),l.material.uniforms.t2D.value=C,l.material.uniforms.backgroundIntensity.value=E.backgroundIntensity,l.material.toneMapped=Wt.getTransfer(C.colorSpace)!==jt,C.matrixAutoUpdate===!0&&C.updateMatrix(),l.material.uniforms.uvTransform.value.copy(C.matrix),(u!==C||d!==C.version||p!==n.toneMapping)&&(l.material.needsUpdate=!0,u=C,d=C.version,p=n.toneMapping),l.layers.enableAll(),y.unshift(l,l.geometry,l.material,0,0,null))}function f(y,E){y.getRGB(pr,Tc(n)),i.buffers.color.setClear(pr.r,pr.g,pr.b,E,o)}function R(){h!==void 0&&(h.geometry.dispose(),h.material.dispose(),h=void 0),l!==void 0&&(l.geometry.dispose(),l.material.dispose(),l=void 0)}return{getClearColor:function(){return s},setClearColor:function(y,E=1){s.set(y),c=E,f(s,c)},getClearAlpha:function(){return c},setClearAlpha:function(y){c=y,f(s,c)},render:v,addToRenderList:m,dispose:R}}function Kp(n,t){const e=n.getParameter(n.MAX_VERTEX_ATTRIBS),i={},r=d(null);let a=r,o=!1;function s(M,w,V,F,W){let K=!1;const k=u(F,V,w);a!==k&&(a=k,l(a.object)),K=p(M,F,V,W),K&&_(M,F,V,W),W!==null&&t.update(W,n.ELEMENT_ARRAY_BUFFER),(K||o)&&(o=!1,E(M,w,V,F),W!==null&&n.bindBuffer(n.ELEMENT_ARRAY_BUFFER,t.get(W).buffer))}function c(){return n.createVertexArray()}function l(M){return n.bindVertexArray(M)}function h(M){return n.deleteVertexArray(M)}function u(M,w,V){const F=V.wireframe===!0;let W=i[M.id];W===void 0&&(W={},i[M.id]=W);let K=W[w.id];K===void 0&&(K={},W[w.id]=K);let k=K[F];return k===void 0&&(k=d(c()),K[F]=k),k}function d(M){const w=[],V=[],F=[];for(let W=0;W<e;W++)w[W]=0,V[W]=0,F[W]=0;return{geometry:null,program:null,wireframe:!1,newAttributes:w,enabledAttributes:V,attributeDivisors:F,object:M,attributes:{},index:null}}function p(M,w,V,F){const W=a.attributes,K=w.attributes;let k=0;const Z=V.getAttributes();for(const H in Z)if(Z[H].location>=0){const ct=W[H];let _t=K[H];if(_t===void 0&&(H==="instanceMatrix"&&M.instanceMatrix&&(_t=M.instanceMatrix),H==="instanceColor"&&M.instanceColor&&(_t=M.instanceColor)),ct===void 0||ct.attribute!==_t||_t&&ct.data!==_t.data)return!0;k++}return a.attributesNum!==k||a.index!==F}function _(M,w,V,F){const W={},K=w.attributes;let k=0;const Z=V.getAttributes();for(const H in Z)if(Z[H].location>=0){let ct=K[H];ct===void 0&&(H==="instanceMatrix"&&M.instanceMatrix&&(ct=M.instanceMatrix),H==="instanceColor"&&M.instanceColor&&(ct=M.instanceColor));const _t={};_t.attribute=ct,ct&&ct.data&&(_t.data=ct.data),W[H]=_t,k++}a.attributes=W,a.attributesNum=k,a.index=F}function v(){const M=a.newAttributes;for(let w=0,V=M.length;w<V;w++)M[w]=0}function m(M){f(M,0)}function f(M,w){const V=a.newAttributes,F=a.enabledAttributes,W=a.attributeDivisors;V[M]=1,F[M]===0&&(n.enableVertexAttribArray(M),F[M]=1),W[M]!==w&&(n.vertexAttribDivisor(M,w),W[M]=w)}function R(){const M=a.newAttributes,w=a.enabledAttributes;for(let V=0,F=w.length;V<F;V++)w[V]!==M[V]&&(n.disableVertexAttribArray(V),w[V]=0)}function y(M,w,V,F,W,K,k){k===!0?n.vertexAttribIPointer(M,w,V,W,K):n.vertexAttribPointer(M,w,V,F,W,K)}function E(M,w,V,F){v();const W=F.attributes,K=V.getAttributes(),k=w.defaultAttributeValues;for(const Z in K){const H=K[Z];if(H.location>=0){let tt=W[Z];if(tt===void 0&&(Z==="instanceMatrix"&&M.instanceMatrix&&(tt=M.instanceMatrix),Z==="instanceColor"&&M.instanceColor&&(tt=M.instanceColor)),tt!==void 0){const ct=tt.normalized,_t=tt.itemSize,Rt=t.get(tt);if(Rt===void 0)continue;const It=Rt.buffer,X=Rt.type,et=Rt.bytesPerElement,mt=X===n.INT||X===n.UNSIGNED_INT||tt.gpuType===hs;if(tt.isInterleavedBufferAttribute){const at=tt.data,yt=at.stride,Xt=tt.offset;if(at.isInstancedInterleavedBuffer){for(let Tt=0;Tt<H.locationSize;Tt++)f(H.location+Tt,at.meshPerAttribute);M.isInstancedMesh!==!0&&F._maxInstanceCount===void 0&&(F._maxInstanceCount=at.meshPerAttribute*at.count)}else for(let Tt=0;Tt<H.locationSize;Tt++)m(H.location+Tt);n.bindBuffer(n.ARRAY_BUFFER,It);for(let Tt=0;Tt<H.locationSize;Tt++)y(H.location+Tt,_t/H.locationSize,X,ct,yt*et,(Xt+_t/H.locationSize*Tt)*et,mt)}else{if(tt.isInstancedBufferAttribute){for(let at=0;at<H.locationSize;at++)f(H.location+at,tt.meshPerAttribute);M.isInstancedMesh!==!0&&F._maxInstanceCount===void 0&&(F._maxInstanceCount=tt.meshPerAttribute*tt.count)}else for(let at=0;at<H.locationSize;at++)m(H.location+at);n.bindBuffer(n.ARRAY_BUFFER,It);for(let at=0;at<H.locationSize;at++)y(H.location+at,_t/H.locationSize,X,ct,_t*et,_t/H.locationSize*at*et,mt)}}else if(k!==void 0){const ct=k[Z];if(ct!==void 0)switch(ct.length){case 2:n.vertexAttrib2fv(H.location,ct);break;case 3:n.vertexAttrib3fv(H.location,ct);break;case 4:n.vertexAttrib4fv(H.location,ct);break;default:n.vertexAttrib1fv(H.location,ct)}}}}R()}function C(){I();for(const M in i){const w=i[M];for(const V in w){const F=w[V];for(const W in F)h(F[W].object),delete F[W];delete w[V]}delete i[M]}}function b(M){if(i[M.id]===void 0)return;const w=i[M.id];for(const V in w){const F=w[V];for(const W in F)h(F[W].object),delete F[W];delete w[V]}delete i[M.id]}function A(M){for(const w in i){const V=i[w];if(V[M.id]===void 0)continue;const F=V[M.id];for(const W in F)h(F[W].object),delete F[W];delete V[M.id]}}function I(){S(),o=!0,a!==r&&(a=r,l(a.object))}function S(){r.geometry=null,r.program=null,r.wireframe=!1}return{setup:s,reset:I,resetDefaultState:S,dispose:C,releaseStatesOfGeometry:b,releaseStatesOfProgram:A,initAttributes:v,enableAttribute:m,disableUnusedAttributes:R}}function jp(n,t,e){let i;function r(l){i=l}function a(l,h){n.drawArrays(i,l,h),e.update(h,i,1)}function o(l,h,u){u!==0&&(n.drawArraysInstanced(i,l,h,u),e.update(h,i,u))}function s(l,h,u){if(u===0)return;t.get("WEBGL_multi_draw").multiDrawArraysWEBGL(i,l,0,h,0,u);let p=0;for(let _=0;_<u;_++)p+=h[_];e.update(p,i,1)}function c(l,h,u,d){if(u===0)return;const p=t.get("WEBGL_multi_draw");if(p===null)for(let _=0;_<l.length;_++)o(l[_],h[_],d[_]);else{p.multiDrawArraysInstancedWEBGL(i,l,0,h,0,d,0,u);let _=0;for(let v=0;v<u;v++)_+=h[v]*d[v];e.update(_,i,1)}}this.setMode=r,this.render=a,this.renderInstances=o,this.renderMultiDraw=s,this.renderMultiDrawInstances=c}function Jp(n,t,e,i){let r;function a(){if(r!==void 0)return r;if(t.has("EXT_texture_filter_anisotropic")===!0){const A=t.get("EXT_texture_filter_anisotropic");r=n.getParameter(A.MAX_TEXTURE_MAX_ANISOTROPY_EXT)}else r=0;return r}function o(A){return!(A!==Ye&&i.convert(A)!==n.getParameter(n.IMPLEMENTATION_COLOR_READ_FORMAT))}function s(A){const I=A===Vi&&(t.has("EXT_color_buffer_half_float")||t.has("EXT_color_buffer_float"));return!(A!==pn&&i.convert(A)!==n.getParameter(n.IMPLEMENTATION_COLOR_READ_TYPE)&&A!==un&&!I)}function c(A){if(A==="highp"){if(n.getShaderPrecisionFormat(n.VERTEX_SHADER,n.HIGH_FLOAT).precision>0&&n.getShaderPrecisionFormat(n.FRAGMENT_SHADER,n.HIGH_FLOAT).precision>0)return"highp";A="mediump"}return A==="mediump"&&n.getShaderPrecisionFormat(n.VERTEX_SHADER,n.MEDIUM_FLOAT).precision>0&&n.getShaderPrecisionFormat(n.FRAGMENT_SHADER,n.MEDIUM_FLOAT).precision>0?"mediump":"lowp"}let l=e.precision!==void 0?e.precision:"highp";const h=c(l);h!==l&&(console.warn("THREE.WebGLRenderer:",l,"not supported, using",h,"instead."),l=h);const u=e.logarithmicDepthBuffer===!0,d=e.reverseDepthBuffer===!0&&t.has("EXT_clip_control"),p=n.getParameter(n.MAX_TEXTURE_IMAGE_UNITS),_=n.getParameter(n.MAX_VERTEX_TEXTURE_IMAGE_UNITS),v=n.getParameter(n.MAX_TEXTURE_SIZE),m=n.getParameter(n.MAX_CUBE_MAP_TEXTURE_SIZE),f=n.getParameter(n.MAX_VERTEX_ATTRIBS),R=n.getParameter(n.MAX_VERTEX_UNIFORM_VECTORS),y=n.getParameter(n.MAX_VARYING_VECTORS),E=n.getParameter(n.MAX_FRAGMENT_UNIFORM_VECTORS),C=_>0,b=n.getParameter(n.MAX_SAMPLES);return{isWebGL2:!0,getMaxAnisotropy:a,getMaxPrecision:c,textureFormatReadable:o,textureTypeReadable:s,precision:l,logarithmicDepthBuffer:u,reverseDepthBuffer:d,maxTextures:p,maxVertexTextures:_,maxTextureSize:v,maxCubemapSize:m,maxAttributes:f,maxVertexUniforms:R,maxVaryings:y,maxFragmentUniforms:E,vertexTextures:C,maxSamples:b}}function Qp(n){const t=this;let e=null,i=0,r=!1,a=!1;const o=new Fn,s=new Pt,c={value:null,needsUpdate:!1};this.uniform=c,this.numPlanes=0,this.numIntersection=0,this.init=function(u,d){const p=u.length!==0||d||i!==0||r;return r=d,i=u.length,p},this.beginShadows=function(){a=!0,h(null)},this.endShadows=function(){a=!1},this.setGlobalState=function(u,d){e=h(u,d,0)},this.setState=function(u,d,p){const _=u.clippingPlanes,v=u.clipIntersection,m=u.clipShadows,f=n.get(u);if(!r||_===null||_.length===0||a&&!m)a?h(null):l();else{const R=a?0:i,y=R*4;let E=f.clippingState||null;c.value=E,E=h(_,d,y,p);for(let C=0;C!==y;++C)E[C]=e[C];f.clippingState=E,this.numIntersection=v?this.numPlanes:0,this.numPlanes+=R}};function l(){c.value!==e&&(c.value=e,c.needsUpdate=i>0),t.numPlanes=i,t.numIntersection=0}function h(u,d,p,_){const v=u!==null?u.length:0;let m=null;if(v!==0){if(m=c.value,_!==!0||m===null){const f=p+v*4,R=d.matrixWorldInverse;s.getNormalMatrix(R),(m===null||m.length<f)&&(m=new Float32Array(f));for(let y=0,E=p;y!==v;++y,E+=4)o.copy(u[y]).applyMatrix4(R,s),o.normal.toArray(m,E),m[E+3]=o.constant}c.value=m,c.needsUpdate=!0}return t.numPlanes=v,t.numIntersection=0,m}}function tm(n){let t=new WeakMap;function e(o,s){return s===wa?o.mapping=_i:s===Ra&&(o.mapping=gi),o}function i(o){if(o&&o.isTexture){const s=o.mapping;if(s===wa||s===Ra)if(t.has(o)){const c=t.get(o).texture;return e(c,o.mapping)}else{const c=o.image;if(c&&c.height>0){const l=new nf(c.height);return l.fromEquirectangularTexture(n,o),t.set(o,l),o.addEventListener("dispose",r),e(l.texture,o.mapping)}else return null}}return o}function r(o){const s=o.target;s.removeEventListener("dispose",r);const c=t.get(s);c!==void 0&&(t.delete(s),c.dispose())}function a(){t=new WeakMap}return{get:i,dispose:a}}const ui=4,_o=[.125,.215,.35,.446,.526,.582],zn=20,oa=new Dc,go=new Ft;let ca=null,la=0,ua=0,ha=!1;const On=(1+Math.sqrt(5))/2,oi=1/On,vo=[new B(-On,oi,0),new B(On,oi,0),new B(-oi,0,On),new B(oi,0,On),new B(0,On,-oi),new B(0,On,oi),new B(-1,1,-1),new B(1,1,-1),new B(-1,1,1),new B(1,1,1)];class xo{constructor(t){this._renderer=t,this._pingPongRenderTarget=null,this._lodMax=0,this._cubeSize=0,this._lodPlanes=[],this._sizeLods=[],this._sigmas=[],this._blurMaterial=null,this._cubemapMaterial=null,this._equirectMaterial=null,this._compileMaterial(this._blurMaterial)}fromScene(t,e=0,i=.1,r=100){ca=this._renderer.getRenderTarget(),la=this._renderer.getActiveCubeFace(),ua=this._renderer.getActiveMipmapLevel(),ha=this._renderer.xr.enabled,this._renderer.xr.enabled=!1,this._setSize(256);const a=this._allocateTargets();return a.depthBuffer=!0,this._sceneToCubeUV(t,i,r,a),e>0&&this._blur(a,0,0,e),this._applyPMREM(a),this._cleanup(a),a}fromEquirectangular(t,e=null){return this._fromTexture(t,e)}fromCubemap(t,e=null){return this._fromTexture(t,e)}compileCubemapShader(){this._cubemapMaterial===null&&(this._cubemapMaterial=Eo(),this._compileMaterial(this._cubemapMaterial))}compileEquirectangularShader(){this._equirectMaterial===null&&(this._equirectMaterial=So(),this._compileMaterial(this._equirectMaterial))}dispose(){this._dispose(),this._cubemapMaterial!==null&&this._cubemapMaterial.dispose(),this._equirectMaterial!==null&&this._equirectMaterial.dispose()}_setSize(t){this._lodMax=Math.floor(Math.log2(t)),this._cubeSize=Math.pow(2,this._lodMax)}_dispose(){this._blurMaterial!==null&&this._blurMaterial.dispose(),this._pingPongRenderTarget!==null&&this._pingPongRenderTarget.dispose();for(let t=0;t<this._lodPlanes.length;t++)this._lodPlanes[t].dispose()}_cleanup(t){this._renderer.setRenderTarget(ca,la,ua),this._renderer.xr.enabled=ha,t.scissorTest=!1,mr(t,0,0,t.width,t.height)}_fromTexture(t,e){t.mapping===_i||t.mapping===gi?this._setSize(t.image.length===0?16:t.image[0].width||t.image[0].image.width):this._setSize(t.image.width/4),ca=this._renderer.getRenderTarget(),la=this._renderer.getActiveCubeFace(),ua=this._renderer.getActiveMipmapLevel(),ha=this._renderer.xr.enabled,this._renderer.xr.enabled=!1;const i=e||this._allocateTargets();return this._textureToCubeUV(t,i),this._applyPMREM(i),this._cleanup(i),i}_allocateTargets(){const t=3*Math.max(this._cubeSize,112),e=4*this._cubeSize,i={magFilter:Je,minFilter:Je,generateMipmaps:!1,type:Vi,format:Ye,colorSpace:Mi,depthBuffer:!1},r=Mo(t,e,i);if(this._pingPongRenderTarget===null||this._pingPongRenderTarget.width!==t||this._pingPongRenderTarget.height!==e){this._pingPongRenderTarget!==null&&this._dispose(),this._pingPongRenderTarget=Mo(t,e,i);const{_lodMax:a}=this;({sizeLods:this._sizeLods,lodPlanes:this._lodPlanes,sigmas:this._sigmas}=em(a)),this._blurMaterial=nm(a,t,e)}return r}_compileMaterial(t){const e=new Be(this._lodPlanes[0],t);this._renderer.compile(e,oa)}_sceneToCubeUV(t,e,i,r){const s=new Pe(90,1,e,i),c=[1,-1,1,1,1,1],l=[1,1,1,-1,-1,-1],h=this._renderer,u=h.autoClear,d=h.toneMapping;h.getClearColor(go),h.toneMapping=Tn,h.autoClear=!1;const p=new Sc({name:"PMREM.Background",side:be,depthWrite:!1,depthTest:!1}),_=new Be(new Wi,p);let v=!1;const m=t.background;m?m.isColor&&(p.color.copy(m),t.background=null,v=!0):(p.color.copy(go),v=!0);for(let f=0;f<6;f++){const R=f%3;R===0?(s.up.set(0,c[f],0),s.lookAt(l[f],0,0)):R===1?(s.up.set(0,0,c[f]),s.lookAt(0,l[f],0)):(s.up.set(0,c[f],0),s.lookAt(0,0,l[f]));const y=this._cubeSize;mr(r,R*y,f>2?y:0,y,y),h.setRenderTarget(r),v&&h.render(_,s),h.render(t,s)}_.geometry.dispose(),_.material.dispose(),h.toneMapping=d,h.autoClear=u,t.background=m}_textureToCubeUV(t,e){const i=this._renderer,r=t.mapping===_i||t.mapping===gi;r?(this._cubemapMaterial===null&&(this._cubemapMaterial=Eo()),this._cubemapMaterial.uniforms.flipEnvMap.value=t.isRenderTargetTexture===!1?-1:1):this._equirectMaterial===null&&(this._equirectMaterial=So());const a=r?this._cubemapMaterial:this._equirectMaterial,o=new Be(this._lodPlanes[0],a),s=a.uniforms;s.envMap.value=t;const c=this._cubeSize;mr(e,0,0,3*c,2*c),i.setRenderTarget(e),i.render(o,oa)}_applyPMREM(t){const e=this._renderer,i=e.autoClear;e.autoClear=!1;const r=this._lodPlanes.length;for(let a=1;a<r;a++){const o=Math.sqrt(this._sigmas[a]*this._sigmas[a]-this._sigmas[a-1]*this._sigmas[a-1]),s=vo[(r-a-1)%vo.length];this._blur(t,a-1,a,o,s)}e.autoClear=i}_blur(t,e,i,r,a){const o=this._pingPongRenderTarget;this._halfBlur(t,o,e,i,r,"latitudinal",a),this._halfBlur(o,t,i,i,r,"longitudinal",a)}_halfBlur(t,e,i,r,a,o,s){const c=this._renderer,l=this._blurMaterial;o!=="latitudinal"&&o!=="longitudinal"&&console.error("blur direction must be either latitudinal or longitudinal!");const h=3,u=new Be(this._lodPlanes[r],l),d=l.uniforms,p=this._sizeLods[i]-1,_=isFinite(a)?Math.PI/(2*p):2*Math.PI/(2*zn-1),v=a/_,m=isFinite(a)?1+Math.floor(h*v):zn;m>zn&&console.warn(`sigmaRadians, ${a}, is too large and will clip, as it requested ${m} samples when the maximum is set to ${zn}`);const f=[];let R=0;for(let A=0;A<zn;++A){const I=A/v,S=Math.exp(-I*I/2);f.push(S),A===0?R+=S:A<m&&(R+=2*S)}for(let A=0;A<f.length;A++)f[A]=f[A]/R;d.envMap.value=t.texture,d.samples.value=m,d.weights.value=f,d.latitudinal.value=o==="latitudinal",s&&(d.poleAxis.value=s);const{_lodMax:y}=this;d.dTheta.value=_,d.mipInt.value=y-i;const E=this._sizeLods[r],C=3*E*(r>y-ui?r-y+ui:0),b=4*(this._cubeSize-E);mr(e,C,b,3*E,2*E),c.setRenderTarget(e),c.render(u,oa)}}function em(n){const t=[],e=[],i=[];let r=n;const a=n-ui+1+_o.length;for(let o=0;o<a;o++){const s=Math.pow(2,r);e.push(s);let c=1/s;o>n-ui?c=_o[o-n+ui-1]:o===0&&(c=0),i.push(c);const l=1/(s-2),h=-l,u=1+l,d=[h,h,u,h,u,u,h,h,u,u,h,u],p=6,_=6,v=3,m=2,f=1,R=new Float32Array(v*_*p),y=new Float32Array(m*_*p),E=new Float32Array(f*_*p);for(let b=0;b<p;b++){const A=b%3*2/3-1,I=b>2?0:-1,S=[A,I,0,A+2/3,I,0,A+2/3,I+1,0,A,I,0,A+2/3,I+1,0,A,I+1,0];R.set(S,v*_*b),y.set(d,m*_*b);const M=[b,b,b,b,b,b];E.set(M,f*_*b)}const C=new wn;C.setAttribute("position",new Qe(R,v)),C.setAttribute("uv",new Qe(y,m)),C.setAttribute("faceIndex",new Qe(E,f)),t.push(C),r>ui&&r--}return{lodPlanes:t,sizeLods:e,sigmas:i}}function Mo(n,t,e){const i=new Xn(n,t,e);return i.texture.mapping=Ir,i.texture.name="PMREM.cubeUv",i.scissorTest=!0,i}function mr(n,t,e,i,r){n.viewport.set(t,e,i,r),n.scissor.set(t,e,i,r)}function nm(n,t,e){const i=new Float32Array(zn),r=new B(0,1,0);return new An({name:"SphericalGaussianBlur",defines:{n:zn,CUBEUV_TEXEL_WIDTH:1/t,CUBEUV_TEXEL_HEIGHT:1/e,CUBEUV_MAX_MIP:`${n}.0`},uniforms:{envMap:{value:null},samples:{value:1},weights:{value:i},latitudinal:{value:!1},dTheta:{value:0},mipInt:{value:0},poleAxis:{value:r}},vertexShader:Es(),fragmentShader:`

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
		`,blending:yn,depthTest:!1,depthWrite:!1})}function So(){return new An({name:"EquirectangularToCubeUV",uniforms:{envMap:{value:null}},vertexShader:Es(),fragmentShader:`

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
		`,blending:yn,depthTest:!1,depthWrite:!1})}function Eo(){return new An({name:"CubemapToCubeUV",uniforms:{envMap:{value:null},flipEnvMap:{value:-1}},vertexShader:Es(),fragmentShader:`

			precision mediump float;
			precision mediump int;

			uniform float flipEnvMap;

			varying vec3 vOutputDirection;

			uniform samplerCube envMap;

			void main() {

				gl_FragColor = textureCube( envMap, vec3( flipEnvMap * vOutputDirection.x, vOutputDirection.yz ) );

			}
		`,blending:yn,depthTest:!1,depthWrite:!1})}function Es(){return`

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
	`}function im(n){let t=new WeakMap,e=null;function i(s){if(s&&s.isTexture){const c=s.mapping,l=c===wa||c===Ra,h=c===_i||c===gi;if(l||h){let u=t.get(s);const d=u!==void 0?u.texture.pmremVersion:0;if(s.isRenderTargetTexture&&s.pmremVersion!==d)return e===null&&(e=new xo(n)),u=l?e.fromEquirectangular(s,u):e.fromCubemap(s,u),u.texture.pmremVersion=s.pmremVersion,t.set(s,u),u.texture;if(u!==void 0)return u.texture;{const p=s.image;return l&&p&&p.height>0||h&&p&&r(p)?(e===null&&(e=new xo(n)),u=l?e.fromEquirectangular(s):e.fromCubemap(s),u.texture.pmremVersion=s.pmremVersion,t.set(s,u),s.addEventListener("dispose",a),u.texture):null}}}return s}function r(s){let c=0;const l=6;for(let h=0;h<l;h++)s[h]!==void 0&&c++;return c===l}function a(s){const c=s.target;c.removeEventListener("dispose",a);const l=t.get(c);l!==void 0&&(t.delete(c),l.dispose())}function o(){t=new WeakMap,e!==null&&(e.dispose(),e=null)}return{get:i,dispose:o}}function rm(n){const t={};function e(i){if(t[i]!==void 0)return t[i];let r;switch(i){case"WEBGL_depth_texture":r=n.getExtension("WEBGL_depth_texture")||n.getExtension("MOZ_WEBGL_depth_texture")||n.getExtension("WEBKIT_WEBGL_depth_texture");break;case"EXT_texture_filter_anisotropic":r=n.getExtension("EXT_texture_filter_anisotropic")||n.getExtension("MOZ_EXT_texture_filter_anisotropic")||n.getExtension("WEBKIT_EXT_texture_filter_anisotropic");break;case"WEBGL_compressed_texture_s3tc":r=n.getExtension("WEBGL_compressed_texture_s3tc")||n.getExtension("MOZ_WEBGL_compressed_texture_s3tc")||n.getExtension("WEBKIT_WEBGL_compressed_texture_s3tc");break;case"WEBGL_compressed_texture_pvrtc":r=n.getExtension("WEBGL_compressed_texture_pvrtc")||n.getExtension("WEBKIT_WEBGL_compressed_texture_pvrtc");break;default:r=n.getExtension(i)}return t[i]=r,r}return{has:function(i){return e(i)!==null},init:function(){e("EXT_color_buffer_float"),e("WEBGL_clip_cull_distance"),e("OES_texture_float_linear"),e("EXT_color_buffer_half_float"),e("WEBGL_multisampled_render_to_texture"),e("WEBGL_render_shared_exponent")},get:function(i){const r=e(i);return r===null&&li("THREE.WebGLRenderer: "+i+" extension not supported."),r}}}function am(n,t,e,i){const r={},a=new WeakMap;function o(u){const d=u.target;d.index!==null&&t.remove(d.index);for(const _ in d.attributes)t.remove(d.attributes[_]);d.removeEventListener("dispose",o),delete r[d.id];const p=a.get(d);p&&(t.remove(p),a.delete(d)),i.releaseStatesOfGeometry(d),d.isInstancedBufferGeometry===!0&&delete d._maxInstanceCount,e.memory.geometries--}function s(u,d){return r[d.id]===!0||(d.addEventListener("dispose",o),r[d.id]=!0,e.memory.geometries++),d}function c(u){const d=u.attributes;for(const p in d)t.update(d[p],n.ARRAY_BUFFER)}function l(u){const d=[],p=u.index,_=u.attributes.position;let v=0;if(p!==null){const R=p.array;v=p.version;for(let y=0,E=R.length;y<E;y+=3){const C=R[y+0],b=R[y+1],A=R[y+2];d.push(C,b,b,A,A,C)}}else if(_!==void 0){const R=_.array;v=_.version;for(let y=0,E=R.length/3-1;y<E;y+=3){const C=y+0,b=y+1,A=y+2;d.push(C,b,b,A,A,C)}}else return;const m=new(_c(d)?yc:Ec)(d,1);m.version=v;const f=a.get(u);f&&t.remove(f),a.set(u,m)}function h(u){const d=a.get(u);if(d){const p=u.index;p!==null&&d.version<p.version&&l(u)}else l(u);return a.get(u)}return{get:s,update:c,getWireframeAttribute:h}}function sm(n,t,e){let i;function r(d){i=d}let a,o;function s(d){a=d.type,o=d.bytesPerElement}function c(d,p){n.drawElements(i,p,a,d*o),e.update(p,i,1)}function l(d,p,_){_!==0&&(n.drawElementsInstanced(i,p,a,d*o,_),e.update(p,i,_))}function h(d,p,_){if(_===0)return;t.get("WEBGL_multi_draw").multiDrawElementsWEBGL(i,p,0,a,d,0,_);let m=0;for(let f=0;f<_;f++)m+=p[f];e.update(m,i,1)}function u(d,p,_,v){if(_===0)return;const m=t.get("WEBGL_multi_draw");if(m===null)for(let f=0;f<d.length;f++)l(d[f]/o,p[f],v[f]);else{m.multiDrawElementsInstancedWEBGL(i,p,0,a,d,0,v,0,_);let f=0;for(let R=0;R<_;R++)f+=p[R]*v[R];e.update(f,i,1)}}this.setMode=r,this.setIndex=s,this.render=c,this.renderInstances=l,this.renderMultiDraw=h,this.renderMultiDrawInstances=u}function om(n){const t={geometries:0,textures:0},e={frame:0,calls:0,triangles:0,points:0,lines:0};function i(a,o,s){switch(e.calls++,o){case n.TRIANGLES:e.triangles+=s*(a/3);break;case n.LINES:e.lines+=s*(a/2);break;case n.LINE_STRIP:e.lines+=s*(a-1);break;case n.LINE_LOOP:e.lines+=s*a;break;case n.POINTS:e.points+=s*a;break;default:console.error("THREE.WebGLInfo: Unknown draw mode:",o);break}}function r(){e.calls=0,e.triangles=0,e.points=0,e.lines=0}return{memory:t,render:e,programs:null,autoReset:!0,reset:r,update:i}}function cm(n,t,e){const i=new WeakMap,r=new ae;function a(o,s,c){const l=o.morphTargetInfluences,h=s.morphAttributes.position||s.morphAttributes.normal||s.morphAttributes.color,u=h!==void 0?h.length:0;let d=i.get(s);if(d===void 0||d.count!==u){let S=function(){A.dispose(),i.delete(s),s.removeEventListener("dispose",S)};d!==void 0&&d.texture.dispose();const p=s.morphAttributes.position!==void 0,_=s.morphAttributes.normal!==void 0,v=s.morphAttributes.color!==void 0,m=s.morphAttributes.position||[],f=s.morphAttributes.normal||[],R=s.morphAttributes.color||[];let y=0;p===!0&&(y=1),_===!0&&(y=2),v===!0&&(y=3);let E=s.attributes.position.count*y,C=1;E>t.maxTextureSize&&(C=Math.ceil(E/t.maxTextureSize),E=t.maxTextureSize);const b=new Float32Array(E*C*4*u),A=new vc(b,E,C,u);A.type=un,A.needsUpdate=!0;const I=y*4;for(let M=0;M<u;M++){const w=m[M],V=f[M],F=R[M],W=E*C*4*M;for(let K=0;K<w.count;K++){const k=K*I;p===!0&&(r.fromBufferAttribute(w,K),b[W+k+0]=r.x,b[W+k+1]=r.y,b[W+k+2]=r.z,b[W+k+3]=0),_===!0&&(r.fromBufferAttribute(V,K),b[W+k+4]=r.x,b[W+k+5]=r.y,b[W+k+6]=r.z,b[W+k+7]=0),v===!0&&(r.fromBufferAttribute(F,K),b[W+k+8]=r.x,b[W+k+9]=r.y,b[W+k+10]=r.z,b[W+k+11]=F.itemSize===4?r.w:1)}}d={count:u,texture:A,size:new Yt(E,C)},i.set(s,d),s.addEventListener("dispose",S)}if(o.isInstancedMesh===!0&&o.morphTexture!==null)c.getUniforms().setValue(n,"morphTexture",o.morphTexture,e);else{let p=0;for(let v=0;v<l.length;v++)p+=l[v];const _=s.morphTargetsRelative?1:1-p;c.getUniforms().setValue(n,"morphTargetBaseInfluence",_),c.getUniforms().setValue(n,"morphTargetInfluences",l)}c.getUniforms().setValue(n,"morphTargetsTexture",d.texture,e),c.getUniforms().setValue(n,"morphTargetsTextureSize",d.size)}return{update:a}}function lm(n,t,e,i){let r=new WeakMap;function a(c){const l=i.render.frame,h=c.geometry,u=t.get(c,h);if(r.get(u)!==l&&(t.update(u),r.set(u,l)),c.isInstancedMesh&&(c.hasEventListener("dispose",s)===!1&&c.addEventListener("dispose",s),r.get(c)!==l&&(e.update(c.instanceMatrix,n.ARRAY_BUFFER),c.instanceColor!==null&&e.update(c.instanceColor,n.ARRAY_BUFFER),r.set(c,l))),c.isSkinnedMesh){const d=c.skeleton;r.get(d)!==l&&(d.update(),r.set(d,l))}return u}function o(){r=new WeakMap}function s(c){const l=c.target;l.removeEventListener("dispose",s),e.remove(l.instanceMatrix),l.instanceColor!==null&&e.remove(l.instanceColor)}return{update:a,dispose:o}}const Fc=new Ae,yo=new Rc(1,1),Oc=new vc,Bc=new Bh,zc=new Ac,To=[],bo=[],Ao=new Float32Array(16),wo=new Float32Array(9),Ro=new Float32Array(4);function bi(n,t,e){const i=n[0];if(i<=0||i>0)return n;const r=t*e;let a=To[r];if(a===void 0&&(a=new Float32Array(r),To[r]=a),t!==0){i.toArray(a,0);for(let o=1,s=0;o!==t;++o)s+=e,n[o].toArray(a,s)}return a}function ue(n,t){if(n.length!==t.length)return!1;for(let e=0,i=n.length;e<i;e++)if(n[e]!==t[e])return!1;return!0}function he(n,t){for(let e=0,i=t.length;e<i;e++)n[e]=t[e]}function Nr(n,t){let e=bo[t];e===void 0&&(e=new Int32Array(t),bo[t]=e);for(let i=0;i!==t;++i)e[i]=n.allocateTextureUnit();return e}function um(n,t){const e=this.cache;e[0]!==t&&(n.uniform1f(this.addr,t),e[0]=t)}function hm(n,t){const e=this.cache;if(t.x!==void 0)(e[0]!==t.x||e[1]!==t.y)&&(n.uniform2f(this.addr,t.x,t.y),e[0]=t.x,e[1]=t.y);else{if(ue(e,t))return;n.uniform2fv(this.addr,t),he(e,t)}}function fm(n,t){const e=this.cache;if(t.x!==void 0)(e[0]!==t.x||e[1]!==t.y||e[2]!==t.z)&&(n.uniform3f(this.addr,t.x,t.y,t.z),e[0]=t.x,e[1]=t.y,e[2]=t.z);else if(t.r!==void 0)(e[0]!==t.r||e[1]!==t.g||e[2]!==t.b)&&(n.uniform3f(this.addr,t.r,t.g,t.b),e[0]=t.r,e[1]=t.g,e[2]=t.b);else{if(ue(e,t))return;n.uniform3fv(this.addr,t),he(e,t)}}function dm(n,t){const e=this.cache;if(t.x!==void 0)(e[0]!==t.x||e[1]!==t.y||e[2]!==t.z||e[3]!==t.w)&&(n.uniform4f(this.addr,t.x,t.y,t.z,t.w),e[0]=t.x,e[1]=t.y,e[2]=t.z,e[3]=t.w);else{if(ue(e,t))return;n.uniform4fv(this.addr,t),he(e,t)}}function pm(n,t){const e=this.cache,i=t.elements;if(i===void 0){if(ue(e,t))return;n.uniformMatrix2fv(this.addr,!1,t),he(e,t)}else{if(ue(e,i))return;Ro.set(i),n.uniformMatrix2fv(this.addr,!1,Ro),he(e,i)}}function mm(n,t){const e=this.cache,i=t.elements;if(i===void 0){if(ue(e,t))return;n.uniformMatrix3fv(this.addr,!1,t),he(e,t)}else{if(ue(e,i))return;wo.set(i),n.uniformMatrix3fv(this.addr,!1,wo),he(e,i)}}function _m(n,t){const e=this.cache,i=t.elements;if(i===void 0){if(ue(e,t))return;n.uniformMatrix4fv(this.addr,!1,t),he(e,t)}else{if(ue(e,i))return;Ao.set(i),n.uniformMatrix4fv(this.addr,!1,Ao),he(e,i)}}function gm(n,t){const e=this.cache;e[0]!==t&&(n.uniform1i(this.addr,t),e[0]=t)}function vm(n,t){const e=this.cache;if(t.x!==void 0)(e[0]!==t.x||e[1]!==t.y)&&(n.uniform2i(this.addr,t.x,t.y),e[0]=t.x,e[1]=t.y);else{if(ue(e,t))return;n.uniform2iv(this.addr,t),he(e,t)}}function xm(n,t){const e=this.cache;if(t.x!==void 0)(e[0]!==t.x||e[1]!==t.y||e[2]!==t.z)&&(n.uniform3i(this.addr,t.x,t.y,t.z),e[0]=t.x,e[1]=t.y,e[2]=t.z);else{if(ue(e,t))return;n.uniform3iv(this.addr,t),he(e,t)}}function Mm(n,t){const e=this.cache;if(t.x!==void 0)(e[0]!==t.x||e[1]!==t.y||e[2]!==t.z||e[3]!==t.w)&&(n.uniform4i(this.addr,t.x,t.y,t.z,t.w),e[0]=t.x,e[1]=t.y,e[2]=t.z,e[3]=t.w);else{if(ue(e,t))return;n.uniform4iv(this.addr,t),he(e,t)}}function Sm(n,t){const e=this.cache;e[0]!==t&&(n.uniform1ui(this.addr,t),e[0]=t)}function Em(n,t){const e=this.cache;if(t.x!==void 0)(e[0]!==t.x||e[1]!==t.y)&&(n.uniform2ui(this.addr,t.x,t.y),e[0]=t.x,e[1]=t.y);else{if(ue(e,t))return;n.uniform2uiv(this.addr,t),he(e,t)}}function ym(n,t){const e=this.cache;if(t.x!==void 0)(e[0]!==t.x||e[1]!==t.y||e[2]!==t.z)&&(n.uniform3ui(this.addr,t.x,t.y,t.z),e[0]=t.x,e[1]=t.y,e[2]=t.z);else{if(ue(e,t))return;n.uniform3uiv(this.addr,t),he(e,t)}}function Tm(n,t){const e=this.cache;if(t.x!==void 0)(e[0]!==t.x||e[1]!==t.y||e[2]!==t.z||e[3]!==t.w)&&(n.uniform4ui(this.addr,t.x,t.y,t.z,t.w),e[0]=t.x,e[1]=t.y,e[2]=t.z,e[3]=t.w);else{if(ue(e,t))return;n.uniform4uiv(this.addr,t),he(e,t)}}function bm(n,t,e){const i=this.cache,r=e.allocateTextureUnit();i[0]!==r&&(n.uniform1i(this.addr,r),i[0]=r);let a;this.type===n.SAMPLER_2D_SHADOW?(yo.compareFunction=mc,a=yo):a=Fc,e.setTexture2D(t||a,r)}function Am(n,t,e){const i=this.cache,r=e.allocateTextureUnit();i[0]!==r&&(n.uniform1i(this.addr,r),i[0]=r),e.setTexture3D(t||Bc,r)}function wm(n,t,e){const i=this.cache,r=e.allocateTextureUnit();i[0]!==r&&(n.uniform1i(this.addr,r),i[0]=r),e.setTextureCube(t||zc,r)}function Rm(n,t,e){const i=this.cache,r=e.allocateTextureUnit();i[0]!==r&&(n.uniform1i(this.addr,r),i[0]=r),e.setTexture2DArray(t||Oc,r)}function Cm(n){switch(n){case 5126:return um;case 35664:return hm;case 35665:return fm;case 35666:return dm;case 35674:return pm;case 35675:return mm;case 35676:return _m;case 5124:case 35670:return gm;case 35667:case 35671:return vm;case 35668:case 35672:return xm;case 35669:case 35673:return Mm;case 5125:return Sm;case 36294:return Em;case 36295:return ym;case 36296:return Tm;case 35678:case 36198:case 36298:case 36306:case 35682:return bm;case 35679:case 36299:case 36307:return Am;case 35680:case 36300:case 36308:case 36293:return wm;case 36289:case 36303:case 36311:case 36292:return Rm}}function Pm(n,t){n.uniform1fv(this.addr,t)}function Dm(n,t){const e=bi(t,this.size,2);n.uniform2fv(this.addr,e)}function Lm(n,t){const e=bi(t,this.size,3);n.uniform3fv(this.addr,e)}function Im(n,t){const e=bi(t,this.size,4);n.uniform4fv(this.addr,e)}function Um(n,t){const e=bi(t,this.size,4);n.uniformMatrix2fv(this.addr,!1,e)}function Nm(n,t){const e=bi(t,this.size,9);n.uniformMatrix3fv(this.addr,!1,e)}function Fm(n,t){const e=bi(t,this.size,16);n.uniformMatrix4fv(this.addr,!1,e)}function Om(n,t){n.uniform1iv(this.addr,t)}function Bm(n,t){n.uniform2iv(this.addr,t)}function zm(n,t){n.uniform3iv(this.addr,t)}function Hm(n,t){n.uniform4iv(this.addr,t)}function Vm(n,t){n.uniform1uiv(this.addr,t)}function Gm(n,t){n.uniform2uiv(this.addr,t)}function km(n,t){n.uniform3uiv(this.addr,t)}function Wm(n,t){n.uniform4uiv(this.addr,t)}function Xm(n,t,e){const i=this.cache,r=t.length,a=Nr(e,r);ue(i,a)||(n.uniform1iv(this.addr,a),he(i,a));for(let o=0;o!==r;++o)e.setTexture2D(t[o]||Fc,a[o])}function qm(n,t,e){const i=this.cache,r=t.length,a=Nr(e,r);ue(i,a)||(n.uniform1iv(this.addr,a),he(i,a));for(let o=0;o!==r;++o)e.setTexture3D(t[o]||Bc,a[o])}function Ym(n,t,e){const i=this.cache,r=t.length,a=Nr(e,r);ue(i,a)||(n.uniform1iv(this.addr,a),he(i,a));for(let o=0;o!==r;++o)e.setTextureCube(t[o]||zc,a[o])}function $m(n,t,e){const i=this.cache,r=t.length,a=Nr(e,r);ue(i,a)||(n.uniform1iv(this.addr,a),he(i,a));for(let o=0;o!==r;++o)e.setTexture2DArray(t[o]||Oc,a[o])}function Zm(n){switch(n){case 5126:return Pm;case 35664:return Dm;case 35665:return Lm;case 35666:return Im;case 35674:return Um;case 35675:return Nm;case 35676:return Fm;case 5124:case 35670:return Om;case 35667:case 35671:return Bm;case 35668:case 35672:return zm;case 35669:case 35673:return Hm;case 5125:return Vm;case 36294:return Gm;case 36295:return km;case 36296:return Wm;case 35678:case 36198:case 36298:case 36306:case 35682:return Xm;case 35679:case 36299:case 36307:return qm;case 35680:case 36300:case 36308:case 36293:return Ym;case 36289:case 36303:case 36311:case 36292:return $m}}class Km{constructor(t,e,i){this.id=t,this.addr=i,this.cache=[],this.type=e.type,this.setValue=Cm(e.type)}}class jm{constructor(t,e,i){this.id=t,this.addr=i,this.cache=[],this.type=e.type,this.size=e.size,this.setValue=Zm(e.type)}}class Jm{constructor(t){this.id=t,this.seq=[],this.map={}}setValue(t,e,i){const r=this.seq;for(let a=0,o=r.length;a!==o;++a){const s=r[a];s.setValue(t,e[s.id],i)}}}const fa=/(\w+)(\])?(\[|\.)?/g;function Co(n,t){n.seq.push(t),n.map[t.id]=t}function Qm(n,t,e){const i=n.name,r=i.length;for(fa.lastIndex=0;;){const a=fa.exec(i),o=fa.lastIndex;let s=a[1];const c=a[2]==="]",l=a[3];if(c&&(s=s|0),l===void 0||l==="["&&o+2===r){Co(e,l===void 0?new Km(s,n,t):new jm(s,n,t));break}else{let u=e.map[s];u===void 0&&(u=new Jm(s),Co(e,u)),e=u}}}class Tr{constructor(t,e){this.seq=[],this.map={};const i=t.getProgramParameter(e,t.ACTIVE_UNIFORMS);for(let r=0;r<i;++r){const a=t.getActiveUniform(e,r),o=t.getUniformLocation(e,a.name);Qm(a,o,this)}}setValue(t,e,i,r){const a=this.map[e];a!==void 0&&a.setValue(t,i,r)}setOptional(t,e,i){const r=e[i];r!==void 0&&this.setValue(t,i,r)}static upload(t,e,i,r){for(let a=0,o=e.length;a!==o;++a){const s=e[a],c=i[s.id];c.needsUpdate!==!1&&s.setValue(t,c.value,r)}}static seqWithValue(t,e){const i=[];for(let r=0,a=t.length;r!==a;++r){const o=t[r];o.id in e&&i.push(o)}return i}}function Po(n,t,e){const i=n.createShader(t);return n.shaderSource(i,e),n.compileShader(i),i}const t_=37297;let e_=0;function n_(n,t){const e=n.split(`
`),i=[],r=Math.max(t-6,0),a=Math.min(t+6,e.length);for(let o=r;o<a;o++){const s=o+1;i.push(`${s===t?">":" "} ${s}: ${e[o]}`)}return i.join(`
`)}const Do=new Pt;function i_(n){Wt._getMatrix(Do,Wt.workingColorSpace,n);const t=`mat3( ${Do.elements.map(e=>e.toFixed(4))} )`;switch(Wt.getTransfer(n)){case Cr:return[t,"LinearTransferOETF"];case jt:return[t,"sRGBTransferOETF"];default:return console.warn("THREE.WebGLProgram: Unsupported color space: ",n),[t,"LinearTransferOETF"]}}function Lo(n,t,e){const i=n.getShaderParameter(t,n.COMPILE_STATUS),r=n.getShaderInfoLog(t).trim();if(i&&r==="")return"";const a=/ERROR: 0:(\d+)/.exec(r);if(a){const o=parseInt(a[1]);return e.toUpperCase()+`

`+r+`

`+n_(n.getShaderSource(t),o)}else return r}function r_(n,t){const e=i_(t);return[`vec4 ${n}( vec4 value ) {`,`	return ${e[1]}( vec4( value.rgb * ${e[0]}, value.a ) );`,"}"].join(`
`)}function a_(n,t){let e;switch(t){case Zu:e="Linear";break;case Ku:e="Reinhard";break;case ju:e="Cineon";break;case Ju:e="ACESFilmic";break;case th:e="AgX";break;case eh:e="Neutral";break;case Qu:e="Custom";break;default:console.warn("THREE.WebGLProgram: Unsupported toneMapping:",t),e="Linear"}return"vec3 "+n+"( vec3 color ) { return "+e+"ToneMapping( color ); }"}const _r=new B;function s_(){Wt.getLuminanceCoefficients(_r);const n=_r.x.toFixed(4),t=_r.y.toFixed(4),e=_r.z.toFixed(4);return["float luminance( const in vec3 rgb ) {",`	const vec3 weights = vec3( ${n}, ${t}, ${e} );`,"	return dot( weights, rgb );","}"].join(`
`)}function o_(n){return[n.extensionClipCullDistance?"#extension GL_ANGLE_clip_cull_distance : require":"",n.extensionMultiDraw?"#extension GL_ANGLE_multi_draw : require":""].filter(Li).join(`
`)}function c_(n){const t=[];for(const e in n){const i=n[e];i!==!1&&t.push("#define "+e+" "+i)}return t.join(`
`)}function l_(n,t){const e={},i=n.getProgramParameter(t,n.ACTIVE_ATTRIBUTES);for(let r=0;r<i;r++){const a=n.getActiveAttrib(t,r),o=a.name;let s=1;a.type===n.FLOAT_MAT2&&(s=2),a.type===n.FLOAT_MAT3&&(s=3),a.type===n.FLOAT_MAT4&&(s=4),e[o]={type:a.type,location:n.getAttribLocation(t,o),locationSize:s}}return e}function Li(n){return n!==""}function Io(n,t){const e=t.numSpotLightShadows+t.numSpotLightMaps-t.numSpotLightShadowsWithMaps;return n.replace(/NUM_DIR_LIGHTS/g,t.numDirLights).replace(/NUM_SPOT_LIGHTS/g,t.numSpotLights).replace(/NUM_SPOT_LIGHT_MAPS/g,t.numSpotLightMaps).replace(/NUM_SPOT_LIGHT_COORDS/g,e).replace(/NUM_RECT_AREA_LIGHTS/g,t.numRectAreaLights).replace(/NUM_POINT_LIGHTS/g,t.numPointLights).replace(/NUM_HEMI_LIGHTS/g,t.numHemiLights).replace(/NUM_DIR_LIGHT_SHADOWS/g,t.numDirLightShadows).replace(/NUM_SPOT_LIGHT_SHADOWS_WITH_MAPS/g,t.numSpotLightShadowsWithMaps).replace(/NUM_SPOT_LIGHT_SHADOWS/g,t.numSpotLightShadows).replace(/NUM_POINT_LIGHT_SHADOWS/g,t.numPointLightShadows)}function Uo(n,t){return n.replace(/NUM_CLIPPING_PLANES/g,t.numClippingPlanes).replace(/UNION_CLIPPING_PLANES/g,t.numClippingPlanes-t.numClipIntersection)}const u_=/^[ \t]*#include +<([\w\d./]+)>/gm;function is(n){return n.replace(u_,f_)}const h_=new Map;function f_(n,t){let e=Lt[t];if(e===void 0){const i=h_.get(t);if(i!==void 0)e=Lt[i],console.warn('THREE.WebGLRenderer: Shader chunk "%s" has been deprecated. Use "%s" instead.',t,i);else throw new Error("Can not resolve #include <"+t+">")}return is(e)}const d_=/#pragma unroll_loop_start\s+for\s*\(\s*int\s+i\s*=\s*(\d+)\s*;\s*i\s*<\s*(\d+)\s*;\s*i\s*\+\+\s*\)\s*{([\s\S]+?)}\s+#pragma unroll_loop_end/g;function No(n){return n.replace(d_,p_)}function p_(n,t,e,i){let r="";for(let a=parseInt(t);a<parseInt(e);a++)r+=i.replace(/\[\s*i\s*\]/g,"[ "+a+" ]").replace(/UNROLLED_LOOP_INDEX/g,a);return r}function Fo(n){let t=`precision ${n.precision} float;
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
	`;return n.precision==="highp"?t+=`
#define HIGH_PRECISION`:n.precision==="mediump"?t+=`
#define MEDIUM_PRECISION`:n.precision==="lowp"&&(t+=`
#define LOW_PRECISION`),t}function m_(n){let t="SHADOWMAP_TYPE_BASIC";return n.shadowMapType===ic?t="SHADOWMAP_TYPE_PCF":n.shadowMapType===Ru?t="SHADOWMAP_TYPE_PCF_SOFT":n.shadowMapType===We&&(t="SHADOWMAP_TYPE_VSM"),t}function __(n){let t="ENVMAP_TYPE_CUBE";if(n.envMap)switch(n.envMapMode){case _i:case gi:t="ENVMAP_TYPE_CUBE";break;case Ir:t="ENVMAP_TYPE_CUBE_UV";break}return t}function g_(n){let t="ENVMAP_MODE_REFLECTION";if(n.envMap)switch(n.envMapMode){case gi:t="ENVMAP_MODE_REFRACTION";break}return t}function v_(n){let t="ENVMAP_BLENDING_NONE";if(n.envMap)switch(n.combine){case us:t="ENVMAP_BLENDING_MULTIPLY";break;case Yu:t="ENVMAP_BLENDING_MIX";break;case $u:t="ENVMAP_BLENDING_ADD";break}return t}function x_(n){const t=n.envMapCubeUVHeight;if(t===null)return null;const e=Math.log2(t)-2,i=1/t;return{texelWidth:1/(3*Math.max(Math.pow(2,e),7*16)),texelHeight:i,maxMip:e}}function M_(n,t,e,i){const r=n.getContext(),a=e.defines;let o=e.vertexShader,s=e.fragmentShader;const c=m_(e),l=__(e),h=g_(e),u=v_(e),d=x_(e),p=o_(e),_=c_(a),v=r.createProgram();let m,f,R=e.glslVersion?"#version "+e.glslVersion+`
`:"";e.isRawShaderMaterial?(m=["#define SHADER_TYPE "+e.shaderType,"#define SHADER_NAME "+e.shaderName,_].filter(Li).join(`
`),m.length>0&&(m+=`
`),f=["#define SHADER_TYPE "+e.shaderType,"#define SHADER_NAME "+e.shaderName,_].filter(Li).join(`
`),f.length>0&&(f+=`
`)):(m=[Fo(e),"#define SHADER_TYPE "+e.shaderType,"#define SHADER_NAME "+e.shaderName,_,e.extensionClipCullDistance?"#define USE_CLIP_DISTANCE":"",e.batching?"#define USE_BATCHING":"",e.batchingColor?"#define USE_BATCHING_COLOR":"",e.instancing?"#define USE_INSTANCING":"",e.instancingColor?"#define USE_INSTANCING_COLOR":"",e.instancingMorph?"#define USE_INSTANCING_MORPH":"",e.useFog&&e.fog?"#define USE_FOG":"",e.useFog&&e.fogExp2?"#define FOG_EXP2":"",e.map?"#define USE_MAP":"",e.envMap?"#define USE_ENVMAP":"",e.envMap?"#define "+h:"",e.lightMap?"#define USE_LIGHTMAP":"",e.aoMap?"#define USE_AOMAP":"",e.bumpMap?"#define USE_BUMPMAP":"",e.normalMap?"#define USE_NORMALMAP":"",e.normalMapObjectSpace?"#define USE_NORMALMAP_OBJECTSPACE":"",e.normalMapTangentSpace?"#define USE_NORMALMAP_TANGENTSPACE":"",e.displacementMap?"#define USE_DISPLACEMENTMAP":"",e.emissiveMap?"#define USE_EMISSIVEMAP":"",e.anisotropy?"#define USE_ANISOTROPY":"",e.anisotropyMap?"#define USE_ANISOTROPYMAP":"",e.clearcoatMap?"#define USE_CLEARCOATMAP":"",e.clearcoatRoughnessMap?"#define USE_CLEARCOAT_ROUGHNESSMAP":"",e.clearcoatNormalMap?"#define USE_CLEARCOAT_NORMALMAP":"",e.iridescenceMap?"#define USE_IRIDESCENCEMAP":"",e.iridescenceThicknessMap?"#define USE_IRIDESCENCE_THICKNESSMAP":"",e.specularMap?"#define USE_SPECULARMAP":"",e.specularColorMap?"#define USE_SPECULAR_COLORMAP":"",e.specularIntensityMap?"#define USE_SPECULAR_INTENSITYMAP":"",e.roughnessMap?"#define USE_ROUGHNESSMAP":"",e.metalnessMap?"#define USE_METALNESSMAP":"",e.alphaMap?"#define USE_ALPHAMAP":"",e.alphaHash?"#define USE_ALPHAHASH":"",e.transmission?"#define USE_TRANSMISSION":"",e.transmissionMap?"#define USE_TRANSMISSIONMAP":"",e.thicknessMap?"#define USE_THICKNESSMAP":"",e.sheenColorMap?"#define USE_SHEEN_COLORMAP":"",e.sheenRoughnessMap?"#define USE_SHEEN_ROUGHNESSMAP":"",e.mapUv?"#define MAP_UV "+e.mapUv:"",e.alphaMapUv?"#define ALPHAMAP_UV "+e.alphaMapUv:"",e.lightMapUv?"#define LIGHTMAP_UV "+e.lightMapUv:"",e.aoMapUv?"#define AOMAP_UV "+e.aoMapUv:"",e.emissiveMapUv?"#define EMISSIVEMAP_UV "+e.emissiveMapUv:"",e.bumpMapUv?"#define BUMPMAP_UV "+e.bumpMapUv:"",e.normalMapUv?"#define NORMALMAP_UV "+e.normalMapUv:"",e.displacementMapUv?"#define DISPLACEMENTMAP_UV "+e.displacementMapUv:"",e.metalnessMapUv?"#define METALNESSMAP_UV "+e.metalnessMapUv:"",e.roughnessMapUv?"#define ROUGHNESSMAP_UV "+e.roughnessMapUv:"",e.anisotropyMapUv?"#define ANISOTROPYMAP_UV "+e.anisotropyMapUv:"",e.clearcoatMapUv?"#define CLEARCOATMAP_UV "+e.clearcoatMapUv:"",e.clearcoatNormalMapUv?"#define CLEARCOAT_NORMALMAP_UV "+e.clearcoatNormalMapUv:"",e.clearcoatRoughnessMapUv?"#define CLEARCOAT_ROUGHNESSMAP_UV "+e.clearcoatRoughnessMapUv:"",e.iridescenceMapUv?"#define IRIDESCENCEMAP_UV "+e.iridescenceMapUv:"",e.iridescenceThicknessMapUv?"#define IRIDESCENCE_THICKNESSMAP_UV "+e.iridescenceThicknessMapUv:"",e.sheenColorMapUv?"#define SHEEN_COLORMAP_UV "+e.sheenColorMapUv:"",e.sheenRoughnessMapUv?"#define SHEEN_ROUGHNESSMAP_UV "+e.sheenRoughnessMapUv:"",e.specularMapUv?"#define SPECULARMAP_UV "+e.specularMapUv:"",e.specularColorMapUv?"#define SPECULAR_COLORMAP_UV "+e.specularColorMapUv:"",e.specularIntensityMapUv?"#define SPECULAR_INTENSITYMAP_UV "+e.specularIntensityMapUv:"",e.transmissionMapUv?"#define TRANSMISSIONMAP_UV "+e.transmissionMapUv:"",e.thicknessMapUv?"#define THICKNESSMAP_UV "+e.thicknessMapUv:"",e.vertexTangents&&e.flatShading===!1?"#define USE_TANGENT":"",e.vertexColors?"#define USE_COLOR":"",e.vertexAlphas?"#define USE_COLOR_ALPHA":"",e.vertexUv1s?"#define USE_UV1":"",e.vertexUv2s?"#define USE_UV2":"",e.vertexUv3s?"#define USE_UV3":"",e.pointsUvs?"#define USE_POINTS_UV":"",e.flatShading?"#define FLAT_SHADED":"",e.skinning?"#define USE_SKINNING":"",e.morphTargets?"#define USE_MORPHTARGETS":"",e.morphNormals&&e.flatShading===!1?"#define USE_MORPHNORMALS":"",e.morphColors?"#define USE_MORPHCOLORS":"",e.morphTargetsCount>0?"#define MORPHTARGETS_TEXTURE_STRIDE "+e.morphTextureStride:"",e.morphTargetsCount>0?"#define MORPHTARGETS_COUNT "+e.morphTargetsCount:"",e.doubleSided?"#define DOUBLE_SIDED":"",e.flipSided?"#define FLIP_SIDED":"",e.shadowMapEnabled?"#define USE_SHADOWMAP":"",e.shadowMapEnabled?"#define "+c:"",e.sizeAttenuation?"#define USE_SIZEATTENUATION":"",e.numLightProbes>0?"#define USE_LIGHT_PROBES":"",e.logarithmicDepthBuffer?"#define USE_LOGDEPTHBUF":"",e.reverseDepthBuffer?"#define USE_REVERSEDEPTHBUF":"","uniform mat4 modelMatrix;","uniform mat4 modelViewMatrix;","uniform mat4 projectionMatrix;","uniform mat4 viewMatrix;","uniform mat3 normalMatrix;","uniform vec3 cameraPosition;","uniform bool isOrthographic;","#ifdef USE_INSTANCING","	attribute mat4 instanceMatrix;","#endif","#ifdef USE_INSTANCING_COLOR","	attribute vec3 instanceColor;","#endif","#ifdef USE_INSTANCING_MORPH","	uniform sampler2D morphTexture;","#endif","attribute vec3 position;","attribute vec3 normal;","attribute vec2 uv;","#ifdef USE_UV1","	attribute vec2 uv1;","#endif","#ifdef USE_UV2","	attribute vec2 uv2;","#endif","#ifdef USE_UV3","	attribute vec2 uv3;","#endif","#ifdef USE_TANGENT","	attribute vec4 tangent;","#endif","#if defined( USE_COLOR_ALPHA )","	attribute vec4 color;","#elif defined( USE_COLOR )","	attribute vec3 color;","#endif","#ifdef USE_SKINNING","	attribute vec4 skinIndex;","	attribute vec4 skinWeight;","#endif",`
`].filter(Li).join(`
`),f=[Fo(e),"#define SHADER_TYPE "+e.shaderType,"#define SHADER_NAME "+e.shaderName,_,e.useFog&&e.fog?"#define USE_FOG":"",e.useFog&&e.fogExp2?"#define FOG_EXP2":"",e.alphaToCoverage?"#define ALPHA_TO_COVERAGE":"",e.map?"#define USE_MAP":"",e.matcap?"#define USE_MATCAP":"",e.envMap?"#define USE_ENVMAP":"",e.envMap?"#define "+l:"",e.envMap?"#define "+h:"",e.envMap?"#define "+u:"",d?"#define CUBEUV_TEXEL_WIDTH "+d.texelWidth:"",d?"#define CUBEUV_TEXEL_HEIGHT "+d.texelHeight:"",d?"#define CUBEUV_MAX_MIP "+d.maxMip+".0":"",e.lightMap?"#define USE_LIGHTMAP":"",e.aoMap?"#define USE_AOMAP":"",e.bumpMap?"#define USE_BUMPMAP":"",e.normalMap?"#define USE_NORMALMAP":"",e.normalMapObjectSpace?"#define USE_NORMALMAP_OBJECTSPACE":"",e.normalMapTangentSpace?"#define USE_NORMALMAP_TANGENTSPACE":"",e.emissiveMap?"#define USE_EMISSIVEMAP":"",e.anisotropy?"#define USE_ANISOTROPY":"",e.anisotropyMap?"#define USE_ANISOTROPYMAP":"",e.clearcoat?"#define USE_CLEARCOAT":"",e.clearcoatMap?"#define USE_CLEARCOATMAP":"",e.clearcoatRoughnessMap?"#define USE_CLEARCOAT_ROUGHNESSMAP":"",e.clearcoatNormalMap?"#define USE_CLEARCOAT_NORMALMAP":"",e.dispersion?"#define USE_DISPERSION":"",e.iridescence?"#define USE_IRIDESCENCE":"",e.iridescenceMap?"#define USE_IRIDESCENCEMAP":"",e.iridescenceThicknessMap?"#define USE_IRIDESCENCE_THICKNESSMAP":"",e.specularMap?"#define USE_SPECULARMAP":"",e.specularColorMap?"#define USE_SPECULAR_COLORMAP":"",e.specularIntensityMap?"#define USE_SPECULAR_INTENSITYMAP":"",e.roughnessMap?"#define USE_ROUGHNESSMAP":"",e.metalnessMap?"#define USE_METALNESSMAP":"",e.alphaMap?"#define USE_ALPHAMAP":"",e.alphaTest?"#define USE_ALPHATEST":"",e.alphaHash?"#define USE_ALPHAHASH":"",e.sheen?"#define USE_SHEEN":"",e.sheenColorMap?"#define USE_SHEEN_COLORMAP":"",e.sheenRoughnessMap?"#define USE_SHEEN_ROUGHNESSMAP":"",e.transmission?"#define USE_TRANSMISSION":"",e.transmissionMap?"#define USE_TRANSMISSIONMAP":"",e.thicknessMap?"#define USE_THICKNESSMAP":"",e.vertexTangents&&e.flatShading===!1?"#define USE_TANGENT":"",e.vertexColors||e.instancingColor||e.batchingColor?"#define USE_COLOR":"",e.vertexAlphas?"#define USE_COLOR_ALPHA":"",e.vertexUv1s?"#define USE_UV1":"",e.vertexUv2s?"#define USE_UV2":"",e.vertexUv3s?"#define USE_UV3":"",e.pointsUvs?"#define USE_POINTS_UV":"",e.gradientMap?"#define USE_GRADIENTMAP":"",e.flatShading?"#define FLAT_SHADED":"",e.doubleSided?"#define DOUBLE_SIDED":"",e.flipSided?"#define FLIP_SIDED":"",e.shadowMapEnabled?"#define USE_SHADOWMAP":"",e.shadowMapEnabled?"#define "+c:"",e.premultipliedAlpha?"#define PREMULTIPLIED_ALPHA":"",e.numLightProbes>0?"#define USE_LIGHT_PROBES":"",e.decodeVideoTexture?"#define DECODE_VIDEO_TEXTURE":"",e.decodeVideoTextureEmissive?"#define DECODE_VIDEO_TEXTURE_EMISSIVE":"",e.logarithmicDepthBuffer?"#define USE_LOGDEPTHBUF":"",e.reverseDepthBuffer?"#define USE_REVERSEDEPTHBUF":"","uniform mat4 viewMatrix;","uniform vec3 cameraPosition;","uniform bool isOrthographic;",e.toneMapping!==Tn?"#define TONE_MAPPING":"",e.toneMapping!==Tn?Lt.tonemapping_pars_fragment:"",e.toneMapping!==Tn?a_("toneMapping",e.toneMapping):"",e.dithering?"#define DITHERING":"",e.opaque?"#define OPAQUE":"",Lt.colorspace_pars_fragment,r_("linearToOutputTexel",e.outputColorSpace),s_(),e.useDepthPacking?"#define DEPTH_PACKING "+e.depthPacking:"",`
`].filter(Li).join(`
`)),o=is(o),o=Io(o,e),o=Uo(o,e),s=is(s),s=Io(s,e),s=Uo(s,e),o=No(o),s=No(s),e.isRawShaderMaterial!==!0&&(R=`#version 300 es
`,m=[p,"#define attribute in","#define varying out","#define texture2D texture"].join(`
`)+`
`+m,f=["#define varying in",e.glslVersion===qs?"":"layout(location = 0) out highp vec4 pc_fragColor;",e.glslVersion===qs?"":"#define gl_FragColor pc_fragColor","#define gl_FragDepthEXT gl_FragDepth","#define texture2D texture","#define textureCube texture","#define texture2DProj textureProj","#define texture2DLodEXT textureLod","#define texture2DProjLodEXT textureProjLod","#define textureCubeLodEXT textureLod","#define texture2DGradEXT textureGrad","#define texture2DProjGradEXT textureProjGrad","#define textureCubeGradEXT textureGrad"].join(`
`)+`
`+f);const y=R+m+o,E=R+f+s,C=Po(r,r.VERTEX_SHADER,y),b=Po(r,r.FRAGMENT_SHADER,E);r.attachShader(v,C),r.attachShader(v,b),e.index0AttributeName!==void 0?r.bindAttribLocation(v,0,e.index0AttributeName):e.morphTargets===!0&&r.bindAttribLocation(v,0,"position"),r.linkProgram(v);function A(w){if(n.debug.checkShaderErrors){const V=r.getProgramInfoLog(v).trim(),F=r.getShaderInfoLog(C).trim(),W=r.getShaderInfoLog(b).trim();let K=!0,k=!0;if(r.getProgramParameter(v,r.LINK_STATUS)===!1)if(K=!1,typeof n.debug.onShaderError=="function")n.debug.onShaderError(r,v,C,b);else{const Z=Lo(r,C,"vertex"),H=Lo(r,b,"fragment");console.error("THREE.WebGLProgram: Shader Error "+r.getError()+" - VALIDATE_STATUS "+r.getProgramParameter(v,r.VALIDATE_STATUS)+`

Material Name: `+w.name+`
Material Type: `+w.type+`

Program Info Log: `+V+`
`+Z+`
`+H)}else V!==""?console.warn("THREE.WebGLProgram: Program Info Log:",V):(F===""||W==="")&&(k=!1);k&&(w.diagnostics={runnable:K,programLog:V,vertexShader:{log:F,prefix:m},fragmentShader:{log:W,prefix:f}})}r.deleteShader(C),r.deleteShader(b),I=new Tr(r,v),S=l_(r,v)}let I;this.getUniforms=function(){return I===void 0&&A(this),I};let S;this.getAttributes=function(){return S===void 0&&A(this),S};let M=e.rendererExtensionParallelShaderCompile===!1;return this.isReady=function(){return M===!1&&(M=r.getProgramParameter(v,t_)),M},this.destroy=function(){i.releaseStatesOfProgram(this),r.deleteProgram(v),this.program=void 0},this.type=e.shaderType,this.name=e.shaderName,this.id=e_++,this.cacheKey=t,this.usedTimes=1,this.program=v,this.vertexShader=C,this.fragmentShader=b,this}let S_=0;class E_{constructor(){this.shaderCache=new Map,this.materialCache=new Map}update(t){const e=t.vertexShader,i=t.fragmentShader,r=this._getShaderStage(e),a=this._getShaderStage(i),o=this._getShaderCacheForMaterial(t);return o.has(r)===!1&&(o.add(r),r.usedTimes++),o.has(a)===!1&&(o.add(a),a.usedTimes++),this}remove(t){const e=this.materialCache.get(t);for(const i of e)i.usedTimes--,i.usedTimes===0&&this.shaderCache.delete(i.code);return this.materialCache.delete(t),this}getVertexShaderID(t){return this._getShaderStage(t.vertexShader).id}getFragmentShaderID(t){return this._getShaderStage(t.fragmentShader).id}dispose(){this.shaderCache.clear(),this.materialCache.clear()}_getShaderCacheForMaterial(t){const e=this.materialCache;let i=e.get(t);return i===void 0&&(i=new Set,e.set(t,i)),i}_getShaderStage(t){const e=this.shaderCache;let i=e.get(t);return i===void 0&&(i=new y_(t),e.set(t,i)),i}}class y_{constructor(t){this.id=S_++,this.code=t,this.usedTimes=0}}function T_(n,t,e,i,r,a,o){const s=new xc,c=new E_,l=new Set,h=[],u=r.logarithmicDepthBuffer,d=r.vertexTextures;let p=r.precision;const _={MeshDepthMaterial:"depth",MeshDistanceMaterial:"distanceRGBA",MeshNormalMaterial:"normal",MeshBasicMaterial:"basic",MeshLambertMaterial:"lambert",MeshPhongMaterial:"phong",MeshToonMaterial:"toon",MeshStandardMaterial:"physical",MeshPhysicalMaterial:"physical",MeshMatcapMaterial:"matcap",LineBasicMaterial:"basic",LineDashedMaterial:"dashed",PointsMaterial:"points",ShadowMaterial:"shadow",SpriteMaterial:"sprite"};function v(S){return l.add(S),S===0?"uv":`uv${S}`}function m(S,M,w,V,F){const W=V.fog,K=F.geometry,k=S.isMeshStandardMaterial?V.environment:null,Z=(S.isMeshStandardMaterial?e:t).get(S.envMap||k),H=Z&&Z.mapping===Ir?Z.image.height:null,tt=_[S.type];S.precision!==null&&(p=r.getMaxPrecision(S.precision),p!==S.precision&&console.warn("THREE.WebGLProgram.getParameters:",S.precision,"not supported, using",p,"instead."));const ct=K.morphAttributes.position||K.morphAttributes.normal||K.morphAttributes.color,_t=ct!==void 0?ct.length:0;let Rt=0;K.morphAttributes.position!==void 0&&(Rt=1),K.morphAttributes.normal!==void 0&&(Rt=2),K.morphAttributes.color!==void 0&&(Rt=3);let It,X,et,mt;if(tt){const Kt=Ke[tt];It=Kt.vertexShader,X=Kt.fragmentShader}else It=S.vertexShader,X=S.fragmentShader,c.update(S),et=c.getVertexShaderID(S),mt=c.getFragmentShaderID(S);const at=n.getRenderTarget(),yt=n.state.buffers.depth.getReversed(),Xt=F.isInstancedMesh===!0,Tt=F.isBatchedMesh===!0,oe=!!S.map,ee=!!S.matcap,Ot=!!Z,P=!!S.aoMap,De=!!S.lightMap,Bt=!!S.bumpMap,zt=!!S.normalMap,xt=!!S.displacementMap,Qt=!!S.emissiveMap,vt=!!S.metalnessMap,T=!!S.roughnessMap,g=S.anisotropy>0,N=S.clearcoat>0,Y=S.dispersion>0,j=S.iridescence>0,q=S.sheen>0,gt=S.transmission>0,st=g&&!!S.anisotropyMap,ht=N&&!!S.clearcoatMap,Vt=N&&!!S.clearcoatNormalMap,Q=N&&!!S.clearcoatRoughnessMap,ft=j&&!!S.iridescenceMap,Et=j&&!!S.iridescenceThicknessMap,bt=q&&!!S.sheenColorMap,dt=q&&!!S.sheenRoughnessMap,Ht=!!S.specularMap,Dt=!!S.specularColorMap,Jt=!!S.specularIntensityMap,D=gt&&!!S.transmissionMap,it=gt&&!!S.thicknessMap,G=!!S.gradientMap,$=!!S.alphaMap,lt=S.alphaTest>0,ot=!!S.alphaHash,Ct=!!S.extensions;let ne=Tn;S.toneMapped&&(at===null||at.isXRRenderTarget===!0)&&(ne=n.toneMapping);const _e={shaderID:tt,shaderType:S.type,shaderName:S.name,vertexShader:It,fragmentShader:X,defines:S.defines,customVertexShaderID:et,customFragmentShaderID:mt,isRawShaderMaterial:S.isRawShaderMaterial===!0,glslVersion:S.glslVersion,precision:p,batching:Tt,batchingColor:Tt&&F._colorsTexture!==null,instancing:Xt,instancingColor:Xt&&F.instanceColor!==null,instancingMorph:Xt&&F.morphTexture!==null,supportsVertexTextures:d,outputColorSpace:at===null?n.outputColorSpace:at.isXRRenderTarget===!0?at.texture.colorSpace:Mi,alphaToCoverage:!!S.alphaToCoverage,map:oe,matcap:ee,envMap:Ot,envMapMode:Ot&&Z.mapping,envMapCubeUVHeight:H,aoMap:P,lightMap:De,bumpMap:Bt,normalMap:zt,displacementMap:d&&xt,emissiveMap:Qt,normalMapObjectSpace:zt&&S.normalMapType===ah,normalMapTangentSpace:zt&&S.normalMapType===gs,metalnessMap:vt,roughnessMap:T,anisotropy:g,anisotropyMap:st,clearcoat:N,clearcoatMap:ht,clearcoatNormalMap:Vt,clearcoatRoughnessMap:Q,dispersion:Y,iridescence:j,iridescenceMap:ft,iridescenceThicknessMap:Et,sheen:q,sheenColorMap:bt,sheenRoughnessMap:dt,specularMap:Ht,specularColorMap:Dt,specularIntensityMap:Jt,transmission:gt,transmissionMap:D,thicknessMap:it,gradientMap:G,opaque:S.transparent===!1&&S.blending===hi&&S.alphaToCoverage===!1,alphaMap:$,alphaTest:lt,alphaHash:ot,combine:S.combine,mapUv:oe&&v(S.map.channel),aoMapUv:P&&v(S.aoMap.channel),lightMapUv:De&&v(S.lightMap.channel),bumpMapUv:Bt&&v(S.bumpMap.channel),normalMapUv:zt&&v(S.normalMap.channel),displacementMapUv:xt&&v(S.displacementMap.channel),emissiveMapUv:Qt&&v(S.emissiveMap.channel),metalnessMapUv:vt&&v(S.metalnessMap.channel),roughnessMapUv:T&&v(S.roughnessMap.channel),anisotropyMapUv:st&&v(S.anisotropyMap.channel),clearcoatMapUv:ht&&v(S.clearcoatMap.channel),clearcoatNormalMapUv:Vt&&v(S.clearcoatNormalMap.channel),clearcoatRoughnessMapUv:Q&&v(S.clearcoatRoughnessMap.channel),iridescenceMapUv:ft&&v(S.iridescenceMap.channel),iridescenceThicknessMapUv:Et&&v(S.iridescenceThicknessMap.channel),sheenColorMapUv:bt&&v(S.sheenColorMap.channel),sheenRoughnessMapUv:dt&&v(S.sheenRoughnessMap.channel),specularMapUv:Ht&&v(S.specularMap.channel),specularColorMapUv:Dt&&v(S.specularColorMap.channel),specularIntensityMapUv:Jt&&v(S.specularIntensityMap.channel),transmissionMapUv:D&&v(S.transmissionMap.channel),thicknessMapUv:it&&v(S.thicknessMap.channel),alphaMapUv:$&&v(S.alphaMap.channel),vertexTangents:!!K.attributes.tangent&&(zt||g),vertexColors:S.vertexColors,vertexAlphas:S.vertexColors===!0&&!!K.attributes.color&&K.attributes.color.itemSize===4,pointsUvs:F.isPoints===!0&&!!K.attributes.uv&&(oe||$),fog:!!W,useFog:S.fog===!0,fogExp2:!!W&&W.isFogExp2,flatShading:S.flatShading===!0,sizeAttenuation:S.sizeAttenuation===!0,logarithmicDepthBuffer:u,reverseDepthBuffer:yt,skinning:F.isSkinnedMesh===!0,morphTargets:K.morphAttributes.position!==void 0,morphNormals:K.morphAttributes.normal!==void 0,morphColors:K.morphAttributes.color!==void 0,morphTargetsCount:_t,morphTextureStride:Rt,numDirLights:M.directional.length,numPointLights:M.point.length,numSpotLights:M.spot.length,numSpotLightMaps:M.spotLightMap.length,numRectAreaLights:M.rectArea.length,numHemiLights:M.hemi.length,numDirLightShadows:M.directionalShadowMap.length,numPointLightShadows:M.pointShadowMap.length,numSpotLightShadows:M.spotShadowMap.length,numSpotLightShadowsWithMaps:M.numSpotLightShadowsWithMaps,numLightProbes:M.numLightProbes,numClippingPlanes:o.numPlanes,numClipIntersection:o.numIntersection,dithering:S.dithering,shadowMapEnabled:n.shadowMap.enabled&&w.length>0,shadowMapType:n.shadowMap.type,toneMapping:ne,decodeVideoTexture:oe&&S.map.isVideoTexture===!0&&Wt.getTransfer(S.map.colorSpace)===jt,decodeVideoTextureEmissive:Qt&&S.emissiveMap.isVideoTexture===!0&&Wt.getTransfer(S.emissiveMap.colorSpace)===jt,premultipliedAlpha:S.premultipliedAlpha,doubleSided:S.side===je,flipSided:S.side===be,useDepthPacking:S.depthPacking>=0,depthPacking:S.depthPacking||0,index0AttributeName:S.index0AttributeName,extensionClipCullDistance:Ct&&S.extensions.clipCullDistance===!0&&i.has("WEBGL_clip_cull_distance"),extensionMultiDraw:(Ct&&S.extensions.multiDraw===!0||Tt)&&i.has("WEBGL_multi_draw"),rendererExtensionParallelShaderCompile:i.has("KHR_parallel_shader_compile"),customProgramCacheKey:S.customProgramCacheKey()};return _e.vertexUv1s=l.has(1),_e.vertexUv2s=l.has(2),_e.vertexUv3s=l.has(3),l.clear(),_e}function f(S){const M=[];if(S.shaderID?M.push(S.shaderID):(M.push(S.customVertexShaderID),M.push(S.customFragmentShaderID)),S.defines!==void 0)for(const w in S.defines)M.push(w),M.push(S.defines[w]);return S.isRawShaderMaterial===!1&&(R(M,S),y(M,S),M.push(n.outputColorSpace)),M.push(S.customProgramCacheKey),M.join()}function R(S,M){S.push(M.precision),S.push(M.outputColorSpace),S.push(M.envMapMode),S.push(M.envMapCubeUVHeight),S.push(M.mapUv),S.push(M.alphaMapUv),S.push(M.lightMapUv),S.push(M.aoMapUv),S.push(M.bumpMapUv),S.push(M.normalMapUv),S.push(M.displacementMapUv),S.push(M.emissiveMapUv),S.push(M.metalnessMapUv),S.push(M.roughnessMapUv),S.push(M.anisotropyMapUv),S.push(M.clearcoatMapUv),S.push(M.clearcoatNormalMapUv),S.push(M.clearcoatRoughnessMapUv),S.push(M.iridescenceMapUv),S.push(M.iridescenceThicknessMapUv),S.push(M.sheenColorMapUv),S.push(M.sheenRoughnessMapUv),S.push(M.specularMapUv),S.push(M.specularColorMapUv),S.push(M.specularIntensityMapUv),S.push(M.transmissionMapUv),S.push(M.thicknessMapUv),S.push(M.combine),S.push(M.fogExp2),S.push(M.sizeAttenuation),S.push(M.morphTargetsCount),S.push(M.morphAttributeCount),S.push(M.numDirLights),S.push(M.numPointLights),S.push(M.numSpotLights),S.push(M.numSpotLightMaps),S.push(M.numHemiLights),S.push(M.numRectAreaLights),S.push(M.numDirLightShadows),S.push(M.numPointLightShadows),S.push(M.numSpotLightShadows),S.push(M.numSpotLightShadowsWithMaps),S.push(M.numLightProbes),S.push(M.shadowMapType),S.push(M.toneMapping),S.push(M.numClippingPlanes),S.push(M.numClipIntersection),S.push(M.depthPacking)}function y(S,M){s.disableAll(),M.supportsVertexTextures&&s.enable(0),M.instancing&&s.enable(1),M.instancingColor&&s.enable(2),M.instancingMorph&&s.enable(3),M.matcap&&s.enable(4),M.envMap&&s.enable(5),M.normalMapObjectSpace&&s.enable(6),M.normalMapTangentSpace&&s.enable(7),M.clearcoat&&s.enable(8),M.iridescence&&s.enable(9),M.alphaTest&&s.enable(10),M.vertexColors&&s.enable(11),M.vertexAlphas&&s.enable(12),M.vertexUv1s&&s.enable(13),M.vertexUv2s&&s.enable(14),M.vertexUv3s&&s.enable(15),M.vertexTangents&&s.enable(16),M.anisotropy&&s.enable(17),M.alphaHash&&s.enable(18),M.batching&&s.enable(19),M.dispersion&&s.enable(20),M.batchingColor&&s.enable(21),S.push(s.mask),s.disableAll(),M.fog&&s.enable(0),M.useFog&&s.enable(1),M.flatShading&&s.enable(2),M.logarithmicDepthBuffer&&s.enable(3),M.reverseDepthBuffer&&s.enable(4),M.skinning&&s.enable(5),M.morphTargets&&s.enable(6),M.morphNormals&&s.enable(7),M.morphColors&&s.enable(8),M.premultipliedAlpha&&s.enable(9),M.shadowMapEnabled&&s.enable(10),M.doubleSided&&s.enable(11),M.flipSided&&s.enable(12),M.useDepthPacking&&s.enable(13),M.dithering&&s.enable(14),M.transmission&&s.enable(15),M.sheen&&s.enable(16),M.opaque&&s.enable(17),M.pointsUvs&&s.enable(18),M.decodeVideoTexture&&s.enable(19),M.decodeVideoTextureEmissive&&s.enable(20),M.alphaToCoverage&&s.enable(21),S.push(s.mask)}function E(S){const M=_[S.type];let w;if(M){const V=Ke[M];w=Jh.clone(V.uniforms)}else w=S.uniforms;return w}function C(S,M){let w;for(let V=0,F=h.length;V<F;V++){const W=h[V];if(W.cacheKey===M){w=W,++w.usedTimes;break}}return w===void 0&&(w=new M_(n,M,S,a),h.push(w)),w}function b(S){if(--S.usedTimes===0){const M=h.indexOf(S);h[M]=h[h.length-1],h.pop(),S.destroy()}}function A(S){c.remove(S)}function I(){c.dispose()}return{getParameters:m,getProgramCacheKey:f,getUniforms:E,acquireProgram:C,releaseProgram:b,releaseShaderCache:A,programs:h,dispose:I}}function b_(){let n=new WeakMap;function t(o){return n.has(o)}function e(o){let s=n.get(o);return s===void 0&&(s={},n.set(o,s)),s}function i(o){n.delete(o)}function r(o,s,c){n.get(o)[s]=c}function a(){n=new WeakMap}return{has:t,get:e,remove:i,update:r,dispose:a}}function A_(n,t){return n.groupOrder!==t.groupOrder?n.groupOrder-t.groupOrder:n.renderOrder!==t.renderOrder?n.renderOrder-t.renderOrder:n.material.id!==t.material.id?n.material.id-t.material.id:n.z!==t.z?n.z-t.z:n.id-t.id}function Oo(n,t){return n.groupOrder!==t.groupOrder?n.groupOrder-t.groupOrder:n.renderOrder!==t.renderOrder?n.renderOrder-t.renderOrder:n.z!==t.z?t.z-n.z:n.id-t.id}function Bo(){const n=[];let t=0;const e=[],i=[],r=[];function a(){t=0,e.length=0,i.length=0,r.length=0}function o(u,d,p,_,v,m){let f=n[t];return f===void 0?(f={id:u.id,object:u,geometry:d,material:p,groupOrder:_,renderOrder:u.renderOrder,z:v,group:m},n[t]=f):(f.id=u.id,f.object=u,f.geometry=d,f.material=p,f.groupOrder=_,f.renderOrder=u.renderOrder,f.z=v,f.group=m),t++,f}function s(u,d,p,_,v,m){const f=o(u,d,p,_,v,m);p.transmission>0?i.push(f):p.transparent===!0?r.push(f):e.push(f)}function c(u,d,p,_,v,m){const f=o(u,d,p,_,v,m);p.transmission>0?i.unshift(f):p.transparent===!0?r.unshift(f):e.unshift(f)}function l(u,d){e.length>1&&e.sort(u||A_),i.length>1&&i.sort(d||Oo),r.length>1&&r.sort(d||Oo)}function h(){for(let u=t,d=n.length;u<d;u++){const p=n[u];if(p.id===null)break;p.id=null,p.object=null,p.geometry=null,p.material=null,p.group=null}}return{opaque:e,transmissive:i,transparent:r,init:a,push:s,unshift:c,finish:h,sort:l}}function w_(){let n=new WeakMap;function t(i,r){const a=n.get(i);let o;return a===void 0?(o=new Bo,n.set(i,[o])):r>=a.length?(o=new Bo,a.push(o)):o=a[r],o}function e(){n=new WeakMap}return{get:t,dispose:e}}function R_(){const n={};return{get:function(t){if(n[t.id]!==void 0)return n[t.id];let e;switch(t.type){case"DirectionalLight":e={direction:new B,color:new Ft};break;case"SpotLight":e={position:new B,direction:new B,color:new Ft,distance:0,coneCos:0,penumbraCos:0,decay:0};break;case"PointLight":e={position:new B,color:new Ft,distance:0,decay:0};break;case"HemisphereLight":e={direction:new B,skyColor:new Ft,groundColor:new Ft};break;case"RectAreaLight":e={color:new Ft,position:new B,halfWidth:new B,halfHeight:new B};break}return n[t.id]=e,e}}}function C_(){const n={};return{get:function(t){if(n[t.id]!==void 0)return n[t.id];let e;switch(t.type){case"DirectionalLight":e={shadowIntensity:1,shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new Yt};break;case"SpotLight":e={shadowIntensity:1,shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new Yt};break;case"PointLight":e={shadowIntensity:1,shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new Yt,shadowCameraNear:1,shadowCameraFar:1e3};break}return n[t.id]=e,e}}}let P_=0;function D_(n,t){return(t.castShadow?2:0)-(n.castShadow?2:0)+(t.map?1:0)-(n.map?1:0)}function L_(n){const t=new R_,e=C_(),i={version:0,hash:{directionalLength:-1,pointLength:-1,spotLength:-1,rectAreaLength:-1,hemiLength:-1,numDirectionalShadows:-1,numPointShadows:-1,numSpotShadows:-1,numSpotMaps:-1,numLightProbes:-1},ambient:[0,0,0],probe:[],directional:[],directionalShadow:[],directionalShadowMap:[],directionalShadowMatrix:[],spot:[],spotLightMap:[],spotShadow:[],spotShadowMap:[],spotLightMatrix:[],rectArea:[],rectAreaLTC1:null,rectAreaLTC2:null,point:[],pointShadow:[],pointShadowMap:[],pointShadowMatrix:[],hemi:[],numSpotLightShadowsWithMaps:0,numLightProbes:0};for(let l=0;l<9;l++)i.probe.push(new B);const r=new B,a=new se,o=new se;function s(l){let h=0,u=0,d=0;for(let S=0;S<9;S++)i.probe[S].set(0,0,0);let p=0,_=0,v=0,m=0,f=0,R=0,y=0,E=0,C=0,b=0,A=0;l.sort(D_);for(let S=0,M=l.length;S<M;S++){const w=l[S],V=w.color,F=w.intensity,W=w.distance,K=w.shadow&&w.shadow.map?w.shadow.map.texture:null;if(w.isAmbientLight)h+=V.r*F,u+=V.g*F,d+=V.b*F;else if(w.isLightProbe){for(let k=0;k<9;k++)i.probe[k].addScaledVector(w.sh.coefficients[k],F);A++}else if(w.isDirectionalLight){const k=t.get(w);if(k.color.copy(w.color).multiplyScalar(w.intensity),w.castShadow){const Z=w.shadow,H=e.get(w);H.shadowIntensity=Z.intensity,H.shadowBias=Z.bias,H.shadowNormalBias=Z.normalBias,H.shadowRadius=Z.radius,H.shadowMapSize=Z.mapSize,i.directionalShadow[p]=H,i.directionalShadowMap[p]=K,i.directionalShadowMatrix[p]=w.shadow.matrix,R++}i.directional[p]=k,p++}else if(w.isSpotLight){const k=t.get(w);k.position.setFromMatrixPosition(w.matrixWorld),k.color.copy(V).multiplyScalar(F),k.distance=W,k.coneCos=Math.cos(w.angle),k.penumbraCos=Math.cos(w.angle*(1-w.penumbra)),k.decay=w.decay,i.spot[v]=k;const Z=w.shadow;if(w.map&&(i.spotLightMap[C]=w.map,C++,Z.updateMatrices(w),w.castShadow&&b++),i.spotLightMatrix[v]=Z.matrix,w.castShadow){const H=e.get(w);H.shadowIntensity=Z.intensity,H.shadowBias=Z.bias,H.shadowNormalBias=Z.normalBias,H.shadowRadius=Z.radius,H.shadowMapSize=Z.mapSize,i.spotShadow[v]=H,i.spotShadowMap[v]=K,E++}v++}else if(w.isRectAreaLight){const k=t.get(w);k.color.copy(V).multiplyScalar(F),k.halfWidth.set(w.width*.5,0,0),k.halfHeight.set(0,w.height*.5,0),i.rectArea[m]=k,m++}else if(w.isPointLight){const k=t.get(w);if(k.color.copy(w.color).multiplyScalar(w.intensity),k.distance=w.distance,k.decay=w.decay,w.castShadow){const Z=w.shadow,H=e.get(w);H.shadowIntensity=Z.intensity,H.shadowBias=Z.bias,H.shadowNormalBias=Z.normalBias,H.shadowRadius=Z.radius,H.shadowMapSize=Z.mapSize,H.shadowCameraNear=Z.camera.near,H.shadowCameraFar=Z.camera.far,i.pointShadow[_]=H,i.pointShadowMap[_]=K,i.pointShadowMatrix[_]=w.shadow.matrix,y++}i.point[_]=k,_++}else if(w.isHemisphereLight){const k=t.get(w);k.skyColor.copy(w.color).multiplyScalar(F),k.groundColor.copy(w.groundColor).multiplyScalar(F),i.hemi[f]=k,f++}}m>0&&(n.has("OES_texture_float_linear")===!0?(i.rectAreaLTC1=nt.LTC_FLOAT_1,i.rectAreaLTC2=nt.LTC_FLOAT_2):(i.rectAreaLTC1=nt.LTC_HALF_1,i.rectAreaLTC2=nt.LTC_HALF_2)),i.ambient[0]=h,i.ambient[1]=u,i.ambient[2]=d;const I=i.hash;(I.directionalLength!==p||I.pointLength!==_||I.spotLength!==v||I.rectAreaLength!==m||I.hemiLength!==f||I.numDirectionalShadows!==R||I.numPointShadows!==y||I.numSpotShadows!==E||I.numSpotMaps!==C||I.numLightProbes!==A)&&(i.directional.length=p,i.spot.length=v,i.rectArea.length=m,i.point.length=_,i.hemi.length=f,i.directionalShadow.length=R,i.directionalShadowMap.length=R,i.pointShadow.length=y,i.pointShadowMap.length=y,i.spotShadow.length=E,i.spotShadowMap.length=E,i.directionalShadowMatrix.length=R,i.pointShadowMatrix.length=y,i.spotLightMatrix.length=E+C-b,i.spotLightMap.length=C,i.numSpotLightShadowsWithMaps=b,i.numLightProbes=A,I.directionalLength=p,I.pointLength=_,I.spotLength=v,I.rectAreaLength=m,I.hemiLength=f,I.numDirectionalShadows=R,I.numPointShadows=y,I.numSpotShadows=E,I.numSpotMaps=C,I.numLightProbes=A,i.version=P_++)}function c(l,h){let u=0,d=0,p=0,_=0,v=0;const m=h.matrixWorldInverse;for(let f=0,R=l.length;f<R;f++){const y=l[f];if(y.isDirectionalLight){const E=i.directional[u];E.direction.setFromMatrixPosition(y.matrixWorld),r.setFromMatrixPosition(y.target.matrixWorld),E.direction.sub(r),E.direction.transformDirection(m),u++}else if(y.isSpotLight){const E=i.spot[p];E.position.setFromMatrixPosition(y.matrixWorld),E.position.applyMatrix4(m),E.direction.setFromMatrixPosition(y.matrixWorld),r.setFromMatrixPosition(y.target.matrixWorld),E.direction.sub(r),E.direction.transformDirection(m),p++}else if(y.isRectAreaLight){const E=i.rectArea[_];E.position.setFromMatrixPosition(y.matrixWorld),E.position.applyMatrix4(m),o.identity(),a.copy(y.matrixWorld),a.premultiply(m),o.extractRotation(a),E.halfWidth.set(y.width*.5,0,0),E.halfHeight.set(0,y.height*.5,0),E.halfWidth.applyMatrix4(o),E.halfHeight.applyMatrix4(o),_++}else if(y.isPointLight){const E=i.point[d];E.position.setFromMatrixPosition(y.matrixWorld),E.position.applyMatrix4(m),d++}else if(y.isHemisphereLight){const E=i.hemi[v];E.direction.setFromMatrixPosition(y.matrixWorld),E.direction.transformDirection(m),v++}}}return{setup:s,setupView:c,state:i}}function zo(n){const t=new L_(n),e=[],i=[];function r(h){l.camera=h,e.length=0,i.length=0}function a(h){e.push(h)}function o(h){i.push(h)}function s(){t.setup(e)}function c(h){t.setupView(e,h)}const l={lightsArray:e,shadowsArray:i,camera:null,lights:t,transmissionRenderTarget:{}};return{init:r,state:l,setupLights:s,setupLightsView:c,pushLight:a,pushShadow:o}}function I_(n){let t=new WeakMap;function e(r,a=0){const o=t.get(r);let s;return o===void 0?(s=new zo(n),t.set(r,[s])):a>=o.length?(s=new zo(n),o.push(s)):s=o[a],s}function i(){t=new WeakMap}return{get:e,dispose:i}}const U_=`void main() {
	gl_Position = vec4( position, 1.0 );
}`,N_=`uniform sampler2D shadow_pass;
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
}`;function F_(n,t,e){let i=new Ss;const r=new Yt,a=new Yt,o=new ae,s=new cf({depthPacking:rh}),c=new lf,l={},h=e.maxTextureSize,u={[bn]:be,[be]:bn,[je]:je},d=new An({defines:{VSM_SAMPLES:8},uniforms:{shadow_pass:{value:null},resolution:{value:new Yt},radius:{value:4}},vertexShader:U_,fragmentShader:N_}),p=d.clone();p.defines.HORIZONTAL_PASS=1;const _=new wn;_.setAttribute("position",new Qe(new Float32Array([-1,-1,.5,3,-1,.5,-1,3,.5]),3));const v=new Be(_,d),m=this;this.enabled=!1,this.autoUpdate=!0,this.needsUpdate=!1,this.type=ic;let f=this.type;this.render=function(b,A,I){if(m.enabled===!1||m.autoUpdate===!1&&m.needsUpdate===!1||b.length===0)return;const S=n.getRenderTarget(),M=n.getActiveCubeFace(),w=n.getActiveMipmapLevel(),V=n.state;V.setBlending(yn),V.buffers.color.setClear(1,1,1,1),V.buffers.depth.setTest(!0),V.setScissorTest(!1);const F=f!==We&&this.type===We,W=f===We&&this.type!==We;for(let K=0,k=b.length;K<k;K++){const Z=b[K],H=Z.shadow;if(H===void 0){console.warn("THREE.WebGLShadowMap:",Z,"has no shadow.");continue}if(H.autoUpdate===!1&&H.needsUpdate===!1)continue;r.copy(H.mapSize);const tt=H.getFrameExtents();if(r.multiply(tt),a.copy(H.mapSize),(r.x>h||r.y>h)&&(r.x>h&&(a.x=Math.floor(h/tt.x),r.x=a.x*tt.x,H.mapSize.x=a.x),r.y>h&&(a.y=Math.floor(h/tt.y),r.y=a.y*tt.y,H.mapSize.y=a.y)),H.map===null||F===!0||W===!0){const _t=this.type!==We?{minFilter:$e,magFilter:$e}:{};H.map!==null&&H.map.dispose(),H.map=new Xn(r.x,r.y,_t),H.map.texture.name=Z.name+".shadowMap",H.camera.updateProjectionMatrix()}n.setRenderTarget(H.map),n.clear();const ct=H.getViewportCount();for(let _t=0;_t<ct;_t++){const Rt=H.getViewport(_t);o.set(a.x*Rt.x,a.y*Rt.y,a.x*Rt.z,a.y*Rt.w),V.viewport(o),H.updateMatrices(Z,_t),i=H.getFrustum(),E(A,I,H.camera,Z,this.type)}H.isPointLightShadow!==!0&&this.type===We&&R(H,I),H.needsUpdate=!1}f=this.type,m.needsUpdate=!1,n.setRenderTarget(S,M,w)};function R(b,A){const I=t.update(v);d.defines.VSM_SAMPLES!==b.blurSamples&&(d.defines.VSM_SAMPLES=b.blurSamples,p.defines.VSM_SAMPLES=b.blurSamples,d.needsUpdate=!0,p.needsUpdate=!0),b.mapPass===null&&(b.mapPass=new Xn(r.x,r.y)),d.uniforms.shadow_pass.value=b.map.texture,d.uniforms.resolution.value=b.mapSize,d.uniforms.radius.value=b.radius,n.setRenderTarget(b.mapPass),n.clear(),n.renderBufferDirect(A,null,I,d,v,null),p.uniforms.shadow_pass.value=b.mapPass.texture,p.uniforms.resolution.value=b.mapSize,p.uniforms.radius.value=b.radius,n.setRenderTarget(b.map),n.clear(),n.renderBufferDirect(A,null,I,p,v,null)}function y(b,A,I,S){let M=null;const w=I.isPointLight===!0?b.customDistanceMaterial:b.customDepthMaterial;if(w!==void 0)M=w;else if(M=I.isPointLight===!0?c:s,n.localClippingEnabled&&A.clipShadows===!0&&Array.isArray(A.clippingPlanes)&&A.clippingPlanes.length!==0||A.displacementMap&&A.displacementScale!==0||A.alphaMap&&A.alphaTest>0||A.map&&A.alphaTest>0){const V=M.uuid,F=A.uuid;let W=l[V];W===void 0&&(W={},l[V]=W);let K=W[F];K===void 0&&(K=M.clone(),W[F]=K,A.addEventListener("dispose",C)),M=K}if(M.visible=A.visible,M.wireframe=A.wireframe,S===We?M.side=A.shadowSide!==null?A.shadowSide:A.side:M.side=A.shadowSide!==null?A.shadowSide:u[A.side],M.alphaMap=A.alphaMap,M.alphaTest=A.alphaTest,M.map=A.map,M.clipShadows=A.clipShadows,M.clippingPlanes=A.clippingPlanes,M.clipIntersection=A.clipIntersection,M.displacementMap=A.displacementMap,M.displacementScale=A.displacementScale,M.displacementBias=A.displacementBias,M.wireframeLinewidth=A.wireframeLinewidth,M.linewidth=A.linewidth,I.isPointLight===!0&&M.isMeshDistanceMaterial===!0){const V=n.properties.get(M);V.light=I}return M}function E(b,A,I,S,M){if(b.visible===!1)return;if(b.layers.test(A.layers)&&(b.isMesh||b.isLine||b.isPoints)&&(b.castShadow||b.receiveShadow&&M===We)&&(!b.frustumCulled||i.intersectsObject(b))){b.modelViewMatrix.multiplyMatrices(I.matrixWorldInverse,b.matrixWorld);const F=t.update(b),W=b.material;if(Array.isArray(W)){const K=F.groups;for(let k=0,Z=K.length;k<Z;k++){const H=K[k],tt=W[H.materialIndex];if(tt&&tt.visible){const ct=y(b,tt,S,M);b.onBeforeShadow(n,b,A,I,F,ct,H),n.renderBufferDirect(I,null,F,ct,b,H),b.onAfterShadow(n,b,A,I,F,ct,H)}}}else if(W.visible){const K=y(b,W,S,M);b.onBeforeShadow(n,b,A,I,F,K,null),n.renderBufferDirect(I,null,F,K,b,null),b.onAfterShadow(n,b,A,I,F,K,null)}}const V=b.children;for(let F=0,W=V.length;F<W;F++)E(V[F],A,I,S,M)}function C(b){b.target.removeEventListener("dispose",C);for(const I in l){const S=l[I],M=b.target.uuid;M in S&&(S[M].dispose(),delete S[M])}}}const O_={[Ma]:Sa,[Ea]:ba,[ya]:Aa,[mi]:Ta,[Sa]:Ma,[ba]:Ea,[Aa]:ya,[Ta]:mi};function B_(n,t){function e(){let D=!1;const it=new ae;let G=null;const $=new ae(0,0,0,0);return{setMask:function(lt){G!==lt&&!D&&(n.colorMask(lt,lt,lt,lt),G=lt)},setLocked:function(lt){D=lt},setClear:function(lt,ot,Ct,ne,_e){_e===!0&&(lt*=ne,ot*=ne,Ct*=ne),it.set(lt,ot,Ct,ne),$.equals(it)===!1&&(n.clearColor(lt,ot,Ct,ne),$.copy(it))},reset:function(){D=!1,G=null,$.set(-1,0,0,0)}}}function i(){let D=!1,it=!1,G=null,$=null,lt=null;return{setReversed:function(ot){if(it!==ot){const Ct=t.get("EXT_clip_control");it?Ct.clipControlEXT(Ct.LOWER_LEFT_EXT,Ct.ZERO_TO_ONE_EXT):Ct.clipControlEXT(Ct.LOWER_LEFT_EXT,Ct.NEGATIVE_ONE_TO_ONE_EXT);const ne=lt;lt=null,this.setClear(ne)}it=ot},getReversed:function(){return it},setTest:function(ot){ot?at(n.DEPTH_TEST):yt(n.DEPTH_TEST)},setMask:function(ot){G!==ot&&!D&&(n.depthMask(ot),G=ot)},setFunc:function(ot){if(it&&(ot=O_[ot]),$!==ot){switch(ot){case Ma:n.depthFunc(n.NEVER);break;case Sa:n.depthFunc(n.ALWAYS);break;case Ea:n.depthFunc(n.LESS);break;case mi:n.depthFunc(n.LEQUAL);break;case ya:n.depthFunc(n.EQUAL);break;case Ta:n.depthFunc(n.GEQUAL);break;case ba:n.depthFunc(n.GREATER);break;case Aa:n.depthFunc(n.NOTEQUAL);break;default:n.depthFunc(n.LEQUAL)}$=ot}},setLocked:function(ot){D=ot},setClear:function(ot){lt!==ot&&(it&&(ot=1-ot),n.clearDepth(ot),lt=ot)},reset:function(){D=!1,G=null,$=null,lt=null,it=!1}}}function r(){let D=!1,it=null,G=null,$=null,lt=null,ot=null,Ct=null,ne=null,_e=null;return{setTest:function(Kt){D||(Kt?at(n.STENCIL_TEST):yt(n.STENCIL_TEST))},setMask:function(Kt){it!==Kt&&!D&&(n.stencilMask(Kt),it=Kt)},setFunc:function(Kt,ze,nn){(G!==Kt||$!==ze||lt!==nn)&&(n.stencilFunc(Kt,ze,nn),G=Kt,$=ze,lt=nn)},setOp:function(Kt,ze,nn){(ot!==Kt||Ct!==ze||ne!==nn)&&(n.stencilOp(Kt,ze,nn),ot=Kt,Ct=ze,ne=nn)},setLocked:function(Kt){D=Kt},setClear:function(Kt){_e!==Kt&&(n.clearStencil(Kt),_e=Kt)},reset:function(){D=!1,it=null,G=null,$=null,lt=null,ot=null,Ct=null,ne=null,_e=null}}}const a=new e,o=new i,s=new r,c=new WeakMap,l=new WeakMap;let h={},u={},d=new WeakMap,p=[],_=null,v=!1,m=null,f=null,R=null,y=null,E=null,C=null,b=null,A=new Ft(0,0,0),I=0,S=!1,M=null,w=null,V=null,F=null,W=null;const K=n.getParameter(n.MAX_COMBINED_TEXTURE_IMAGE_UNITS);let k=!1,Z=0;const H=n.getParameter(n.VERSION);H.indexOf("WebGL")!==-1?(Z=parseFloat(/^WebGL (\d)/.exec(H)[1]),k=Z>=1):H.indexOf("OpenGL ES")!==-1&&(Z=parseFloat(/^OpenGL ES (\d)/.exec(H)[1]),k=Z>=2);let tt=null,ct={};const _t=n.getParameter(n.SCISSOR_BOX),Rt=n.getParameter(n.VIEWPORT),It=new ae().fromArray(_t),X=new ae().fromArray(Rt);function et(D,it,G,$){const lt=new Uint8Array(4),ot=n.createTexture();n.bindTexture(D,ot),n.texParameteri(D,n.TEXTURE_MIN_FILTER,n.NEAREST),n.texParameteri(D,n.TEXTURE_MAG_FILTER,n.NEAREST);for(let Ct=0;Ct<G;Ct++)D===n.TEXTURE_3D||D===n.TEXTURE_2D_ARRAY?n.texImage3D(it,0,n.RGBA,1,1,$,0,n.RGBA,n.UNSIGNED_BYTE,lt):n.texImage2D(it+Ct,0,n.RGBA,1,1,0,n.RGBA,n.UNSIGNED_BYTE,lt);return ot}const mt={};mt[n.TEXTURE_2D]=et(n.TEXTURE_2D,n.TEXTURE_2D,1),mt[n.TEXTURE_CUBE_MAP]=et(n.TEXTURE_CUBE_MAP,n.TEXTURE_CUBE_MAP_POSITIVE_X,6),mt[n.TEXTURE_2D_ARRAY]=et(n.TEXTURE_2D_ARRAY,n.TEXTURE_2D_ARRAY,1,1),mt[n.TEXTURE_3D]=et(n.TEXTURE_3D,n.TEXTURE_3D,1,1),a.setClear(0,0,0,1),o.setClear(1),s.setClear(0),at(n.DEPTH_TEST),o.setFunc(mi),Bt(!1),zt(Hs),at(n.CULL_FACE),P(yn);function at(D){h[D]!==!0&&(n.enable(D),h[D]=!0)}function yt(D){h[D]!==!1&&(n.disable(D),h[D]=!1)}function Xt(D,it){return u[D]!==it?(n.bindFramebuffer(D,it),u[D]=it,D===n.DRAW_FRAMEBUFFER&&(u[n.FRAMEBUFFER]=it),D===n.FRAMEBUFFER&&(u[n.DRAW_FRAMEBUFFER]=it),!0):!1}function Tt(D,it){let G=p,$=!1;if(D){G=d.get(it),G===void 0&&(G=[],d.set(it,G));const lt=D.textures;if(G.length!==lt.length||G[0]!==n.COLOR_ATTACHMENT0){for(let ot=0,Ct=lt.length;ot<Ct;ot++)G[ot]=n.COLOR_ATTACHMENT0+ot;G.length=lt.length,$=!0}}else G[0]!==n.BACK&&(G[0]=n.BACK,$=!0);$&&n.drawBuffers(G)}function oe(D){return _!==D?(n.useProgram(D),_=D,!0):!1}const ee={[Bn]:n.FUNC_ADD,[Pu]:n.FUNC_SUBTRACT,[Du]:n.FUNC_REVERSE_SUBTRACT};ee[Lu]=n.MIN,ee[Iu]=n.MAX;const Ot={[Uu]:n.ZERO,[Nu]:n.ONE,[Fu]:n.SRC_COLOR,[va]:n.SRC_ALPHA,[Gu]:n.SRC_ALPHA_SATURATE,[Hu]:n.DST_COLOR,[Bu]:n.DST_ALPHA,[Ou]:n.ONE_MINUS_SRC_COLOR,[xa]:n.ONE_MINUS_SRC_ALPHA,[Vu]:n.ONE_MINUS_DST_COLOR,[zu]:n.ONE_MINUS_DST_ALPHA,[ku]:n.CONSTANT_COLOR,[Wu]:n.ONE_MINUS_CONSTANT_COLOR,[Xu]:n.CONSTANT_ALPHA,[qu]:n.ONE_MINUS_CONSTANT_ALPHA};function P(D,it,G,$,lt,ot,Ct,ne,_e,Kt){if(D===yn){v===!0&&(yt(n.BLEND),v=!1);return}if(v===!1&&(at(n.BLEND),v=!0),D!==Cu){if(D!==m||Kt!==S){if((f!==Bn||E!==Bn)&&(n.blendEquation(n.FUNC_ADD),f=Bn,E=Bn),Kt)switch(D){case hi:n.blendFuncSeparate(n.ONE,n.ONE_MINUS_SRC_ALPHA,n.ONE,n.ONE_MINUS_SRC_ALPHA);break;case Vs:n.blendFunc(n.ONE,n.ONE);break;case Gs:n.blendFuncSeparate(n.ZERO,n.ONE_MINUS_SRC_COLOR,n.ZERO,n.ONE);break;case ks:n.blendFuncSeparate(n.ZERO,n.SRC_COLOR,n.ZERO,n.SRC_ALPHA);break;default:console.error("THREE.WebGLState: Invalid blending: ",D);break}else switch(D){case hi:n.blendFuncSeparate(n.SRC_ALPHA,n.ONE_MINUS_SRC_ALPHA,n.ONE,n.ONE_MINUS_SRC_ALPHA);break;case Vs:n.blendFunc(n.SRC_ALPHA,n.ONE);break;case Gs:n.blendFuncSeparate(n.ZERO,n.ONE_MINUS_SRC_COLOR,n.ZERO,n.ONE);break;case ks:n.blendFunc(n.ZERO,n.SRC_COLOR);break;default:console.error("THREE.WebGLState: Invalid blending: ",D);break}R=null,y=null,C=null,b=null,A.set(0,0,0),I=0,m=D,S=Kt}return}lt=lt||it,ot=ot||G,Ct=Ct||$,(it!==f||lt!==E)&&(n.blendEquationSeparate(ee[it],ee[lt]),f=it,E=lt),(G!==R||$!==y||ot!==C||Ct!==b)&&(n.blendFuncSeparate(Ot[G],Ot[$],Ot[ot],Ot[Ct]),R=G,y=$,C=ot,b=Ct),(ne.equals(A)===!1||_e!==I)&&(n.blendColor(ne.r,ne.g,ne.b,_e),A.copy(ne),I=_e),m=D,S=!1}function De(D,it){D.side===je?yt(n.CULL_FACE):at(n.CULL_FACE);let G=D.side===be;it&&(G=!G),Bt(G),D.blending===hi&&D.transparent===!1?P(yn):P(D.blending,D.blendEquation,D.blendSrc,D.blendDst,D.blendEquationAlpha,D.blendSrcAlpha,D.blendDstAlpha,D.blendColor,D.blendAlpha,D.premultipliedAlpha),o.setFunc(D.depthFunc),o.setTest(D.depthTest),o.setMask(D.depthWrite),a.setMask(D.colorWrite);const $=D.stencilWrite;s.setTest($),$&&(s.setMask(D.stencilWriteMask),s.setFunc(D.stencilFunc,D.stencilRef,D.stencilFuncMask),s.setOp(D.stencilFail,D.stencilZFail,D.stencilZPass)),Qt(D.polygonOffset,D.polygonOffsetFactor,D.polygonOffsetUnits),D.alphaToCoverage===!0?at(n.SAMPLE_ALPHA_TO_COVERAGE):yt(n.SAMPLE_ALPHA_TO_COVERAGE)}function Bt(D){M!==D&&(D?n.frontFace(n.CW):n.frontFace(n.CCW),M=D)}function zt(D){D!==Au?(at(n.CULL_FACE),D!==w&&(D===Hs?n.cullFace(n.BACK):D===wu?n.cullFace(n.FRONT):n.cullFace(n.FRONT_AND_BACK))):yt(n.CULL_FACE),w=D}function xt(D){D!==V&&(k&&n.lineWidth(D),V=D)}function Qt(D,it,G){D?(at(n.POLYGON_OFFSET_FILL),(F!==it||W!==G)&&(n.polygonOffset(it,G),F=it,W=G)):yt(n.POLYGON_OFFSET_FILL)}function vt(D){D?at(n.SCISSOR_TEST):yt(n.SCISSOR_TEST)}function T(D){D===void 0&&(D=n.TEXTURE0+K-1),tt!==D&&(n.activeTexture(D),tt=D)}function g(D,it,G){G===void 0&&(tt===null?G=n.TEXTURE0+K-1:G=tt);let $=ct[G];$===void 0&&($={type:void 0,texture:void 0},ct[G]=$),($.type!==D||$.texture!==it)&&(tt!==G&&(n.activeTexture(G),tt=G),n.bindTexture(D,it||mt[D]),$.type=D,$.texture=it)}function N(){const D=ct[tt];D!==void 0&&D.type!==void 0&&(n.bindTexture(D.type,null),D.type=void 0,D.texture=void 0)}function Y(){try{n.compressedTexImage2D.apply(n,arguments)}catch(D){console.error("THREE.WebGLState:",D)}}function j(){try{n.compressedTexImage3D.apply(n,arguments)}catch(D){console.error("THREE.WebGLState:",D)}}function q(){try{n.texSubImage2D.apply(n,arguments)}catch(D){console.error("THREE.WebGLState:",D)}}function gt(){try{n.texSubImage3D.apply(n,arguments)}catch(D){console.error("THREE.WebGLState:",D)}}function st(){try{n.compressedTexSubImage2D.apply(n,arguments)}catch(D){console.error("THREE.WebGLState:",D)}}function ht(){try{n.compressedTexSubImage3D.apply(n,arguments)}catch(D){console.error("THREE.WebGLState:",D)}}function Vt(){try{n.texStorage2D.apply(n,arguments)}catch(D){console.error("THREE.WebGLState:",D)}}function Q(){try{n.texStorage3D.apply(n,arguments)}catch(D){console.error("THREE.WebGLState:",D)}}function ft(){try{n.texImage2D.apply(n,arguments)}catch(D){console.error("THREE.WebGLState:",D)}}function Et(){try{n.texImage3D.apply(n,arguments)}catch(D){console.error("THREE.WebGLState:",D)}}function bt(D){It.equals(D)===!1&&(n.scissor(D.x,D.y,D.z,D.w),It.copy(D))}function dt(D){X.equals(D)===!1&&(n.viewport(D.x,D.y,D.z,D.w),X.copy(D))}function Ht(D,it){let G=l.get(it);G===void 0&&(G=new WeakMap,l.set(it,G));let $=G.get(D);$===void 0&&($=n.getUniformBlockIndex(it,D.name),G.set(D,$))}function Dt(D,it){const $=l.get(it).get(D);c.get(it)!==$&&(n.uniformBlockBinding(it,$,D.__bindingPointIndex),c.set(it,$))}function Jt(){n.disable(n.BLEND),n.disable(n.CULL_FACE),n.disable(n.DEPTH_TEST),n.disable(n.POLYGON_OFFSET_FILL),n.disable(n.SCISSOR_TEST),n.disable(n.STENCIL_TEST),n.disable(n.SAMPLE_ALPHA_TO_COVERAGE),n.blendEquation(n.FUNC_ADD),n.blendFunc(n.ONE,n.ZERO),n.blendFuncSeparate(n.ONE,n.ZERO,n.ONE,n.ZERO),n.blendColor(0,0,0,0),n.colorMask(!0,!0,!0,!0),n.clearColor(0,0,0,0),n.depthMask(!0),n.depthFunc(n.LESS),o.setReversed(!1),n.clearDepth(1),n.stencilMask(4294967295),n.stencilFunc(n.ALWAYS,0,4294967295),n.stencilOp(n.KEEP,n.KEEP,n.KEEP),n.clearStencil(0),n.cullFace(n.BACK),n.frontFace(n.CCW),n.polygonOffset(0,0),n.activeTexture(n.TEXTURE0),n.bindFramebuffer(n.FRAMEBUFFER,null),n.bindFramebuffer(n.DRAW_FRAMEBUFFER,null),n.bindFramebuffer(n.READ_FRAMEBUFFER,null),n.useProgram(null),n.lineWidth(1),n.scissor(0,0,n.canvas.width,n.canvas.height),n.viewport(0,0,n.canvas.width,n.canvas.height),h={},tt=null,ct={},u={},d=new WeakMap,p=[],_=null,v=!1,m=null,f=null,R=null,y=null,E=null,C=null,b=null,A=new Ft(0,0,0),I=0,S=!1,M=null,w=null,V=null,F=null,W=null,It.set(0,0,n.canvas.width,n.canvas.height),X.set(0,0,n.canvas.width,n.canvas.height),a.reset(),o.reset(),s.reset()}return{buffers:{color:a,depth:o,stencil:s},enable:at,disable:yt,bindFramebuffer:Xt,drawBuffers:Tt,useProgram:oe,setBlending:P,setMaterial:De,setFlipSided:Bt,setCullFace:zt,setLineWidth:xt,setPolygonOffset:Qt,setScissorTest:vt,activeTexture:T,bindTexture:g,unbindTexture:N,compressedTexImage2D:Y,compressedTexImage3D:j,texImage2D:ft,texImage3D:Et,updateUBOMapping:Ht,uniformBlockBinding:Dt,texStorage2D:Vt,texStorage3D:Q,texSubImage2D:q,texSubImage3D:gt,compressedTexSubImage2D:st,compressedTexSubImage3D:ht,scissor:bt,viewport:dt,reset:Jt}}function z_(n,t,e,i,r,a,o){const s=t.has("WEBGL_multisampled_render_to_texture")?t.get("WEBGL_multisampled_render_to_texture"):null,c=typeof navigator>"u"?!1:/OculusBrowser/g.test(navigator.userAgent),l=new Yt,h=new WeakMap;let u;const d=new WeakMap;let p=!1;try{p=typeof OffscreenCanvas<"u"&&new OffscreenCanvas(1,1).getContext("2d")!==null}catch{}function _(T,g){return p?new OffscreenCanvas(T,g):Dr("canvas")}function v(T,g,N){let Y=1;const j=vt(T);if((j.width>N||j.height>N)&&(Y=N/Math.max(j.width,j.height)),Y<1)if(typeof HTMLImageElement<"u"&&T instanceof HTMLImageElement||typeof HTMLCanvasElement<"u"&&T instanceof HTMLCanvasElement||typeof ImageBitmap<"u"&&T instanceof ImageBitmap||typeof VideoFrame<"u"&&T instanceof VideoFrame){const q=Math.floor(Y*j.width),gt=Math.floor(Y*j.height);u===void 0&&(u=_(q,gt));const st=g?_(q,gt):u;return st.width=q,st.height=gt,st.getContext("2d").drawImage(T,0,0,q,gt),console.warn("THREE.WebGLRenderer: Texture has been resized from ("+j.width+"x"+j.height+") to ("+q+"x"+gt+")."),st}else return"data"in T&&console.warn("THREE.WebGLRenderer: Image in DataTexture is too big ("+j.width+"x"+j.height+")."),T;return T}function m(T){return T.generateMipmaps}function f(T){n.generateMipmap(T)}function R(T){return T.isWebGLCubeRenderTarget?n.TEXTURE_CUBE_MAP:T.isWebGL3DRenderTarget?n.TEXTURE_3D:T.isWebGLArrayRenderTarget||T.isCompressedArrayTexture?n.TEXTURE_2D_ARRAY:n.TEXTURE_2D}function y(T,g,N,Y,j=!1){if(T!==null){if(n[T]!==void 0)return n[T];console.warn("THREE.WebGLRenderer: Attempt to use non-existing WebGL internal format '"+T+"'")}let q=g;if(g===n.RED&&(N===n.FLOAT&&(q=n.R32F),N===n.HALF_FLOAT&&(q=n.R16F),N===n.UNSIGNED_BYTE&&(q=n.R8)),g===n.RED_INTEGER&&(N===n.UNSIGNED_BYTE&&(q=n.R8UI),N===n.UNSIGNED_SHORT&&(q=n.R16UI),N===n.UNSIGNED_INT&&(q=n.R32UI),N===n.BYTE&&(q=n.R8I),N===n.SHORT&&(q=n.R16I),N===n.INT&&(q=n.R32I)),g===n.RG&&(N===n.FLOAT&&(q=n.RG32F),N===n.HALF_FLOAT&&(q=n.RG16F),N===n.UNSIGNED_BYTE&&(q=n.RG8)),g===n.RG_INTEGER&&(N===n.UNSIGNED_BYTE&&(q=n.RG8UI),N===n.UNSIGNED_SHORT&&(q=n.RG16UI),N===n.UNSIGNED_INT&&(q=n.RG32UI),N===n.BYTE&&(q=n.RG8I),N===n.SHORT&&(q=n.RG16I),N===n.INT&&(q=n.RG32I)),g===n.RGB_INTEGER&&(N===n.UNSIGNED_BYTE&&(q=n.RGB8UI),N===n.UNSIGNED_SHORT&&(q=n.RGB16UI),N===n.UNSIGNED_INT&&(q=n.RGB32UI),N===n.BYTE&&(q=n.RGB8I),N===n.SHORT&&(q=n.RGB16I),N===n.INT&&(q=n.RGB32I)),g===n.RGBA_INTEGER&&(N===n.UNSIGNED_BYTE&&(q=n.RGBA8UI),N===n.UNSIGNED_SHORT&&(q=n.RGBA16UI),N===n.UNSIGNED_INT&&(q=n.RGBA32UI),N===n.BYTE&&(q=n.RGBA8I),N===n.SHORT&&(q=n.RGBA16I),N===n.INT&&(q=n.RGBA32I)),g===n.RGB&&N===n.UNSIGNED_INT_5_9_9_9_REV&&(q=n.RGB9_E5),g===n.RGBA){const gt=j?Cr:Wt.getTransfer(Y);N===n.FLOAT&&(q=n.RGBA32F),N===n.HALF_FLOAT&&(q=n.RGBA16F),N===n.UNSIGNED_BYTE&&(q=gt===jt?n.SRGB8_ALPHA8:n.RGBA8),N===n.UNSIGNED_SHORT_4_4_4_4&&(q=n.RGBA4),N===n.UNSIGNED_SHORT_5_5_5_1&&(q=n.RGB5_A1)}return(q===n.R16F||q===n.R32F||q===n.RG16F||q===n.RG32F||q===n.RGBA16F||q===n.RGBA32F)&&t.get("EXT_color_buffer_float"),q}function E(T,g){let N;return T?g===null||g===Wn||g===vi?N=n.DEPTH24_STENCIL8:g===un?N=n.DEPTH32F_STENCIL8:g===Bi&&(N=n.DEPTH24_STENCIL8,console.warn("DepthTexture: 16 bit depth attachment is not supported with stencil. Using 24-bit attachment.")):g===null||g===Wn||g===vi?N=n.DEPTH_COMPONENT24:g===un?N=n.DEPTH_COMPONENT32F:g===Bi&&(N=n.DEPTH_COMPONENT16),N}function C(T,g){return m(T)===!0||T.isFramebufferTexture&&T.minFilter!==$e&&T.minFilter!==Je?Math.log2(Math.max(g.width,g.height))+1:T.mipmaps!==void 0&&T.mipmaps.length>0?T.mipmaps.length:T.isCompressedTexture&&Array.isArray(T.image)?g.mipmaps.length:1}function b(T){const g=T.target;g.removeEventListener("dispose",b),I(g),g.isVideoTexture&&h.delete(g)}function A(T){const g=T.target;g.removeEventListener("dispose",A),M(g)}function I(T){const g=i.get(T);if(g.__webglInit===void 0)return;const N=T.source,Y=d.get(N);if(Y){const j=Y[g.__cacheKey];j.usedTimes--,j.usedTimes===0&&S(T),Object.keys(Y).length===0&&d.delete(N)}i.remove(T)}function S(T){const g=i.get(T);n.deleteTexture(g.__webglTexture);const N=T.source,Y=d.get(N);delete Y[g.__cacheKey],o.memory.textures--}function M(T){const g=i.get(T);if(T.depthTexture&&(T.depthTexture.dispose(),i.remove(T.depthTexture)),T.isWebGLCubeRenderTarget)for(let Y=0;Y<6;Y++){if(Array.isArray(g.__webglFramebuffer[Y]))for(let j=0;j<g.__webglFramebuffer[Y].length;j++)n.deleteFramebuffer(g.__webglFramebuffer[Y][j]);else n.deleteFramebuffer(g.__webglFramebuffer[Y]);g.__webglDepthbuffer&&n.deleteRenderbuffer(g.__webglDepthbuffer[Y])}else{if(Array.isArray(g.__webglFramebuffer))for(let Y=0;Y<g.__webglFramebuffer.length;Y++)n.deleteFramebuffer(g.__webglFramebuffer[Y]);else n.deleteFramebuffer(g.__webglFramebuffer);if(g.__webglDepthbuffer&&n.deleteRenderbuffer(g.__webglDepthbuffer),g.__webglMultisampledFramebuffer&&n.deleteFramebuffer(g.__webglMultisampledFramebuffer),g.__webglColorRenderbuffer)for(let Y=0;Y<g.__webglColorRenderbuffer.length;Y++)g.__webglColorRenderbuffer[Y]&&n.deleteRenderbuffer(g.__webglColorRenderbuffer[Y]);g.__webglDepthRenderbuffer&&n.deleteRenderbuffer(g.__webglDepthRenderbuffer)}const N=T.textures;for(let Y=0,j=N.length;Y<j;Y++){const q=i.get(N[Y]);q.__webglTexture&&(n.deleteTexture(q.__webglTexture),o.memory.textures--),i.remove(N[Y])}i.remove(T)}let w=0;function V(){w=0}function F(){const T=w;return T>=r.maxTextures&&console.warn("THREE.WebGLTextures: Trying to use "+T+" texture units while this GPU supports only "+r.maxTextures),w+=1,T}function W(T){const g=[];return g.push(T.wrapS),g.push(T.wrapT),g.push(T.wrapR||0),g.push(T.magFilter),g.push(T.minFilter),g.push(T.anisotropy),g.push(T.internalFormat),g.push(T.format),g.push(T.type),g.push(T.generateMipmaps),g.push(T.premultiplyAlpha),g.push(T.flipY),g.push(T.unpackAlignment),g.push(T.colorSpace),g.join()}function K(T,g){const N=i.get(T);if(T.isVideoTexture&&xt(T),T.isRenderTargetTexture===!1&&T.version>0&&N.__version!==T.version){const Y=T.image;if(Y===null)console.warn("THREE.WebGLRenderer: Texture marked for update but no image data found.");else if(Y.complete===!1)console.warn("THREE.WebGLRenderer: Texture marked for update but image is incomplete");else{X(N,T,g);return}}e.bindTexture(n.TEXTURE_2D,N.__webglTexture,n.TEXTURE0+g)}function k(T,g){const N=i.get(T);if(T.version>0&&N.__version!==T.version){X(N,T,g);return}e.bindTexture(n.TEXTURE_2D_ARRAY,N.__webglTexture,n.TEXTURE0+g)}function Z(T,g){const N=i.get(T);if(T.version>0&&N.__version!==T.version){X(N,T,g);return}e.bindTexture(n.TEXTURE_3D,N.__webglTexture,n.TEXTURE0+g)}function H(T,g){const N=i.get(T);if(T.version>0&&N.__version!==T.version){et(N,T,g);return}e.bindTexture(n.TEXTURE_CUBE_MAP,N.__webglTexture,n.TEXTURE0+g)}const tt={[Ca]:n.REPEAT,[Hn]:n.CLAMP_TO_EDGE,[Pa]:n.MIRRORED_REPEAT},ct={[$e]:n.NEAREST,[nh]:n.NEAREST_MIPMAP_NEAREST,[Zi]:n.NEAREST_MIPMAP_LINEAR,[Je]:n.LINEAR,[Br]:n.LINEAR_MIPMAP_NEAREST,[Vn]:n.LINEAR_MIPMAP_LINEAR},_t={[sh]:n.NEVER,[fh]:n.ALWAYS,[oh]:n.LESS,[mc]:n.LEQUAL,[ch]:n.EQUAL,[hh]:n.GEQUAL,[lh]:n.GREATER,[uh]:n.NOTEQUAL};function Rt(T,g){if(g.type===un&&t.has("OES_texture_float_linear")===!1&&(g.magFilter===Je||g.magFilter===Br||g.magFilter===Zi||g.magFilter===Vn||g.minFilter===Je||g.minFilter===Br||g.minFilter===Zi||g.minFilter===Vn)&&console.warn("THREE.WebGLRenderer: Unable to use linear filtering with floating point textures. OES_texture_float_linear not supported on this device."),n.texParameteri(T,n.TEXTURE_WRAP_S,tt[g.wrapS]),n.texParameteri(T,n.TEXTURE_WRAP_T,tt[g.wrapT]),(T===n.TEXTURE_3D||T===n.TEXTURE_2D_ARRAY)&&n.texParameteri(T,n.TEXTURE_WRAP_R,tt[g.wrapR]),n.texParameteri(T,n.TEXTURE_MAG_FILTER,ct[g.magFilter]),n.texParameteri(T,n.TEXTURE_MIN_FILTER,ct[g.minFilter]),g.compareFunction&&(n.texParameteri(T,n.TEXTURE_COMPARE_MODE,n.COMPARE_REF_TO_TEXTURE),n.texParameteri(T,n.TEXTURE_COMPARE_FUNC,_t[g.compareFunction])),t.has("EXT_texture_filter_anisotropic")===!0){if(g.magFilter===$e||g.minFilter!==Zi&&g.minFilter!==Vn||g.type===un&&t.has("OES_texture_float_linear")===!1)return;if(g.anisotropy>1||i.get(g).__currentAnisotropy){const N=t.get("EXT_texture_filter_anisotropic");n.texParameterf(T,N.TEXTURE_MAX_ANISOTROPY_EXT,Math.min(g.anisotropy,r.getMaxAnisotropy())),i.get(g).__currentAnisotropy=g.anisotropy}}}function It(T,g){let N=!1;T.__webglInit===void 0&&(T.__webglInit=!0,g.addEventListener("dispose",b));const Y=g.source;let j=d.get(Y);j===void 0&&(j={},d.set(Y,j));const q=W(g);if(q!==T.__cacheKey){j[q]===void 0&&(j[q]={texture:n.createTexture(),usedTimes:0},o.memory.textures++,N=!0),j[q].usedTimes++;const gt=j[T.__cacheKey];gt!==void 0&&(j[T.__cacheKey].usedTimes--,gt.usedTimes===0&&S(g)),T.__cacheKey=q,T.__webglTexture=j[q].texture}return N}function X(T,g,N){let Y=n.TEXTURE_2D;(g.isDataArrayTexture||g.isCompressedArrayTexture)&&(Y=n.TEXTURE_2D_ARRAY),g.isData3DTexture&&(Y=n.TEXTURE_3D);const j=It(T,g),q=g.source;e.bindTexture(Y,T.__webglTexture,n.TEXTURE0+N);const gt=i.get(q);if(q.version!==gt.__version||j===!0){e.activeTexture(n.TEXTURE0+N);const st=Wt.getPrimaries(Wt.workingColorSpace),ht=g.colorSpace===Sn?null:Wt.getPrimaries(g.colorSpace),Vt=g.colorSpace===Sn||st===ht?n.NONE:n.BROWSER_DEFAULT_WEBGL;n.pixelStorei(n.UNPACK_FLIP_Y_WEBGL,g.flipY),n.pixelStorei(n.UNPACK_PREMULTIPLY_ALPHA_WEBGL,g.premultiplyAlpha),n.pixelStorei(n.UNPACK_ALIGNMENT,g.unpackAlignment),n.pixelStorei(n.UNPACK_COLORSPACE_CONVERSION_WEBGL,Vt);let Q=v(g.image,!1,r.maxTextureSize);Q=Qt(g,Q);const ft=a.convert(g.format,g.colorSpace),Et=a.convert(g.type);let bt=y(g.internalFormat,ft,Et,g.colorSpace,g.isVideoTexture);Rt(Y,g);let dt;const Ht=g.mipmaps,Dt=g.isVideoTexture!==!0,Jt=gt.__version===void 0||j===!0,D=q.dataReady,it=C(g,Q);if(g.isDepthTexture)bt=E(g.format===xi,g.type),Jt&&(Dt?e.texStorage2D(n.TEXTURE_2D,1,bt,Q.width,Q.height):e.texImage2D(n.TEXTURE_2D,0,bt,Q.width,Q.height,0,ft,Et,null));else if(g.isDataTexture)if(Ht.length>0){Dt&&Jt&&e.texStorage2D(n.TEXTURE_2D,it,bt,Ht[0].width,Ht[0].height);for(let G=0,$=Ht.length;G<$;G++)dt=Ht[G],Dt?D&&e.texSubImage2D(n.TEXTURE_2D,G,0,0,dt.width,dt.height,ft,Et,dt.data):e.texImage2D(n.TEXTURE_2D,G,bt,dt.width,dt.height,0,ft,Et,dt.data);g.generateMipmaps=!1}else Dt?(Jt&&e.texStorage2D(n.TEXTURE_2D,it,bt,Q.width,Q.height),D&&e.texSubImage2D(n.TEXTURE_2D,0,0,0,Q.width,Q.height,ft,Et,Q.data)):e.texImage2D(n.TEXTURE_2D,0,bt,Q.width,Q.height,0,ft,Et,Q.data);else if(g.isCompressedTexture)if(g.isCompressedArrayTexture){Dt&&Jt&&e.texStorage3D(n.TEXTURE_2D_ARRAY,it,bt,Ht[0].width,Ht[0].height,Q.depth);for(let G=0,$=Ht.length;G<$;G++)if(dt=Ht[G],g.format!==Ye)if(ft!==null)if(Dt){if(D)if(g.layerUpdates.size>0){const lt=mo(dt.width,dt.height,g.format,g.type);for(const ot of g.layerUpdates){const Ct=dt.data.subarray(ot*lt/dt.data.BYTES_PER_ELEMENT,(ot+1)*lt/dt.data.BYTES_PER_ELEMENT);e.compressedTexSubImage3D(n.TEXTURE_2D_ARRAY,G,0,0,ot,dt.width,dt.height,1,ft,Ct)}g.clearLayerUpdates()}else e.compressedTexSubImage3D(n.TEXTURE_2D_ARRAY,G,0,0,0,dt.width,dt.height,Q.depth,ft,dt.data)}else e.compressedTexImage3D(n.TEXTURE_2D_ARRAY,G,bt,dt.width,dt.height,Q.depth,0,dt.data,0,0);else console.warn("THREE.WebGLRenderer: Attempt to load unsupported compressed texture format in .uploadTexture()");else Dt?D&&e.texSubImage3D(n.TEXTURE_2D_ARRAY,G,0,0,0,dt.width,dt.height,Q.depth,ft,Et,dt.data):e.texImage3D(n.TEXTURE_2D_ARRAY,G,bt,dt.width,dt.height,Q.depth,0,ft,Et,dt.data)}else{Dt&&Jt&&e.texStorage2D(n.TEXTURE_2D,it,bt,Ht[0].width,Ht[0].height);for(let G=0,$=Ht.length;G<$;G++)dt=Ht[G],g.format!==Ye?ft!==null?Dt?D&&e.compressedTexSubImage2D(n.TEXTURE_2D,G,0,0,dt.width,dt.height,ft,dt.data):e.compressedTexImage2D(n.TEXTURE_2D,G,bt,dt.width,dt.height,0,dt.data):console.warn("THREE.WebGLRenderer: Attempt to load unsupported compressed texture format in .uploadTexture()"):Dt?D&&e.texSubImage2D(n.TEXTURE_2D,G,0,0,dt.width,dt.height,ft,Et,dt.data):e.texImage2D(n.TEXTURE_2D,G,bt,dt.width,dt.height,0,ft,Et,dt.data)}else if(g.isDataArrayTexture)if(Dt){if(Jt&&e.texStorage3D(n.TEXTURE_2D_ARRAY,it,bt,Q.width,Q.height,Q.depth),D)if(g.layerUpdates.size>0){const G=mo(Q.width,Q.height,g.format,g.type);for(const $ of g.layerUpdates){const lt=Q.data.subarray($*G/Q.data.BYTES_PER_ELEMENT,($+1)*G/Q.data.BYTES_PER_ELEMENT);e.texSubImage3D(n.TEXTURE_2D_ARRAY,0,0,0,$,Q.width,Q.height,1,ft,Et,lt)}g.clearLayerUpdates()}else e.texSubImage3D(n.TEXTURE_2D_ARRAY,0,0,0,0,Q.width,Q.height,Q.depth,ft,Et,Q.data)}else e.texImage3D(n.TEXTURE_2D_ARRAY,0,bt,Q.width,Q.height,Q.depth,0,ft,Et,Q.data);else if(g.isData3DTexture)Dt?(Jt&&e.texStorage3D(n.TEXTURE_3D,it,bt,Q.width,Q.height,Q.depth),D&&e.texSubImage3D(n.TEXTURE_3D,0,0,0,0,Q.width,Q.height,Q.depth,ft,Et,Q.data)):e.texImage3D(n.TEXTURE_3D,0,bt,Q.width,Q.height,Q.depth,0,ft,Et,Q.data);else if(g.isFramebufferTexture){if(Jt)if(Dt)e.texStorage2D(n.TEXTURE_2D,it,bt,Q.width,Q.height);else{let G=Q.width,$=Q.height;for(let lt=0;lt<it;lt++)e.texImage2D(n.TEXTURE_2D,lt,bt,G,$,0,ft,Et,null),G>>=1,$>>=1}}else if(Ht.length>0){if(Dt&&Jt){const G=vt(Ht[0]);e.texStorage2D(n.TEXTURE_2D,it,bt,G.width,G.height)}for(let G=0,$=Ht.length;G<$;G++)dt=Ht[G],Dt?D&&e.texSubImage2D(n.TEXTURE_2D,G,0,0,ft,Et,dt):e.texImage2D(n.TEXTURE_2D,G,bt,ft,Et,dt);g.generateMipmaps=!1}else if(Dt){if(Jt){const G=vt(Q);e.texStorage2D(n.TEXTURE_2D,it,bt,G.width,G.height)}D&&e.texSubImage2D(n.TEXTURE_2D,0,0,0,ft,Et,Q)}else e.texImage2D(n.TEXTURE_2D,0,bt,ft,Et,Q);m(g)&&f(Y),gt.__version=q.version,g.onUpdate&&g.onUpdate(g)}T.__version=g.version}function et(T,g,N){if(g.image.length!==6)return;const Y=It(T,g),j=g.source;e.bindTexture(n.TEXTURE_CUBE_MAP,T.__webglTexture,n.TEXTURE0+N);const q=i.get(j);if(j.version!==q.__version||Y===!0){e.activeTexture(n.TEXTURE0+N);const gt=Wt.getPrimaries(Wt.workingColorSpace),st=g.colorSpace===Sn?null:Wt.getPrimaries(g.colorSpace),ht=g.colorSpace===Sn||gt===st?n.NONE:n.BROWSER_DEFAULT_WEBGL;n.pixelStorei(n.UNPACK_FLIP_Y_WEBGL,g.flipY),n.pixelStorei(n.UNPACK_PREMULTIPLY_ALPHA_WEBGL,g.premultiplyAlpha),n.pixelStorei(n.UNPACK_ALIGNMENT,g.unpackAlignment),n.pixelStorei(n.UNPACK_COLORSPACE_CONVERSION_WEBGL,ht);const Vt=g.isCompressedTexture||g.image[0].isCompressedTexture,Q=g.image[0]&&g.image[0].isDataTexture,ft=[];for(let $=0;$<6;$++)!Vt&&!Q?ft[$]=v(g.image[$],!0,r.maxCubemapSize):ft[$]=Q?g.image[$].image:g.image[$],ft[$]=Qt(g,ft[$]);const Et=ft[0],bt=a.convert(g.format,g.colorSpace),dt=a.convert(g.type),Ht=y(g.internalFormat,bt,dt,g.colorSpace),Dt=g.isVideoTexture!==!0,Jt=q.__version===void 0||Y===!0,D=j.dataReady;let it=C(g,Et);Rt(n.TEXTURE_CUBE_MAP,g);let G;if(Vt){Dt&&Jt&&e.texStorage2D(n.TEXTURE_CUBE_MAP,it,Ht,Et.width,Et.height);for(let $=0;$<6;$++){G=ft[$].mipmaps;for(let lt=0;lt<G.length;lt++){const ot=G[lt];g.format!==Ye?bt!==null?Dt?D&&e.compressedTexSubImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+$,lt,0,0,ot.width,ot.height,bt,ot.data):e.compressedTexImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+$,lt,Ht,ot.width,ot.height,0,ot.data):console.warn("THREE.WebGLRenderer: Attempt to load unsupported compressed texture format in .setTextureCube()"):Dt?D&&e.texSubImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+$,lt,0,0,ot.width,ot.height,bt,dt,ot.data):e.texImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+$,lt,Ht,ot.width,ot.height,0,bt,dt,ot.data)}}}else{if(G=g.mipmaps,Dt&&Jt){G.length>0&&it++;const $=vt(ft[0]);e.texStorage2D(n.TEXTURE_CUBE_MAP,it,Ht,$.width,$.height)}for(let $=0;$<6;$++)if(Q){Dt?D&&e.texSubImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+$,0,0,0,ft[$].width,ft[$].height,bt,dt,ft[$].data):e.texImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+$,0,Ht,ft[$].width,ft[$].height,0,bt,dt,ft[$].data);for(let lt=0;lt<G.length;lt++){const Ct=G[lt].image[$].image;Dt?D&&e.texSubImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+$,lt+1,0,0,Ct.width,Ct.height,bt,dt,Ct.data):e.texImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+$,lt+1,Ht,Ct.width,Ct.height,0,bt,dt,Ct.data)}}else{Dt?D&&e.texSubImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+$,0,0,0,bt,dt,ft[$]):e.texImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+$,0,Ht,bt,dt,ft[$]);for(let lt=0;lt<G.length;lt++){const ot=G[lt];Dt?D&&e.texSubImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+$,lt+1,0,0,bt,dt,ot.image[$]):e.texImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+$,lt+1,Ht,bt,dt,ot.image[$])}}}m(g)&&f(n.TEXTURE_CUBE_MAP),q.__version=j.version,g.onUpdate&&g.onUpdate(g)}T.__version=g.version}function mt(T,g,N,Y,j,q){const gt=a.convert(N.format,N.colorSpace),st=a.convert(N.type),ht=y(N.internalFormat,gt,st,N.colorSpace),Vt=i.get(g),Q=i.get(N);if(Q.__renderTarget=g,!Vt.__hasExternalTextures){const ft=Math.max(1,g.width>>q),Et=Math.max(1,g.height>>q);j===n.TEXTURE_3D||j===n.TEXTURE_2D_ARRAY?e.texImage3D(j,q,ht,ft,Et,g.depth,0,gt,st,null):e.texImage2D(j,q,ht,ft,Et,0,gt,st,null)}e.bindFramebuffer(n.FRAMEBUFFER,T),zt(g)?s.framebufferTexture2DMultisampleEXT(n.FRAMEBUFFER,Y,j,Q.__webglTexture,0,Bt(g)):(j===n.TEXTURE_2D||j>=n.TEXTURE_CUBE_MAP_POSITIVE_X&&j<=n.TEXTURE_CUBE_MAP_NEGATIVE_Z)&&n.framebufferTexture2D(n.FRAMEBUFFER,Y,j,Q.__webglTexture,q),e.bindFramebuffer(n.FRAMEBUFFER,null)}function at(T,g,N){if(n.bindRenderbuffer(n.RENDERBUFFER,T),g.depthBuffer){const Y=g.depthTexture,j=Y&&Y.isDepthTexture?Y.type:null,q=E(g.stencilBuffer,j),gt=g.stencilBuffer?n.DEPTH_STENCIL_ATTACHMENT:n.DEPTH_ATTACHMENT,st=Bt(g);zt(g)?s.renderbufferStorageMultisampleEXT(n.RENDERBUFFER,st,q,g.width,g.height):N?n.renderbufferStorageMultisample(n.RENDERBUFFER,st,q,g.width,g.height):n.renderbufferStorage(n.RENDERBUFFER,q,g.width,g.height),n.framebufferRenderbuffer(n.FRAMEBUFFER,gt,n.RENDERBUFFER,T)}else{const Y=g.textures;for(let j=0;j<Y.length;j++){const q=Y[j],gt=a.convert(q.format,q.colorSpace),st=a.convert(q.type),ht=y(q.internalFormat,gt,st,q.colorSpace),Vt=Bt(g);N&&zt(g)===!1?n.renderbufferStorageMultisample(n.RENDERBUFFER,Vt,ht,g.width,g.height):zt(g)?s.renderbufferStorageMultisampleEXT(n.RENDERBUFFER,Vt,ht,g.width,g.height):n.renderbufferStorage(n.RENDERBUFFER,ht,g.width,g.height)}}n.bindRenderbuffer(n.RENDERBUFFER,null)}function yt(T,g){if(g&&g.isWebGLCubeRenderTarget)throw new Error("Depth Texture with cube render targets is not supported");if(e.bindFramebuffer(n.FRAMEBUFFER,T),!(g.depthTexture&&g.depthTexture.isDepthTexture))throw new Error("renderTarget.depthTexture must be an instance of THREE.DepthTexture");const Y=i.get(g.depthTexture);Y.__renderTarget=g,(!Y.__webglTexture||g.depthTexture.image.width!==g.width||g.depthTexture.image.height!==g.height)&&(g.depthTexture.image.width=g.width,g.depthTexture.image.height=g.height,g.depthTexture.needsUpdate=!0),K(g.depthTexture,0);const j=Y.__webglTexture,q=Bt(g);if(g.depthTexture.format===fi)zt(g)?s.framebufferTexture2DMultisampleEXT(n.FRAMEBUFFER,n.DEPTH_ATTACHMENT,n.TEXTURE_2D,j,0,q):n.framebufferTexture2D(n.FRAMEBUFFER,n.DEPTH_ATTACHMENT,n.TEXTURE_2D,j,0);else if(g.depthTexture.format===xi)zt(g)?s.framebufferTexture2DMultisampleEXT(n.FRAMEBUFFER,n.DEPTH_STENCIL_ATTACHMENT,n.TEXTURE_2D,j,0,q):n.framebufferTexture2D(n.FRAMEBUFFER,n.DEPTH_STENCIL_ATTACHMENT,n.TEXTURE_2D,j,0);else throw new Error("Unknown depthTexture format")}function Xt(T){const g=i.get(T),N=T.isWebGLCubeRenderTarget===!0;if(g.__boundDepthTexture!==T.depthTexture){const Y=T.depthTexture;if(g.__depthDisposeCallback&&g.__depthDisposeCallback(),Y){const j=()=>{delete g.__boundDepthTexture,delete g.__depthDisposeCallback,Y.removeEventListener("dispose",j)};Y.addEventListener("dispose",j),g.__depthDisposeCallback=j}g.__boundDepthTexture=Y}if(T.depthTexture&&!g.__autoAllocateDepthBuffer){if(N)throw new Error("target.depthTexture not supported in Cube render targets");yt(g.__webglFramebuffer,T)}else if(N){g.__webglDepthbuffer=[];for(let Y=0;Y<6;Y++)if(e.bindFramebuffer(n.FRAMEBUFFER,g.__webglFramebuffer[Y]),g.__webglDepthbuffer[Y]===void 0)g.__webglDepthbuffer[Y]=n.createRenderbuffer(),at(g.__webglDepthbuffer[Y],T,!1);else{const j=T.stencilBuffer?n.DEPTH_STENCIL_ATTACHMENT:n.DEPTH_ATTACHMENT,q=g.__webglDepthbuffer[Y];n.bindRenderbuffer(n.RENDERBUFFER,q),n.framebufferRenderbuffer(n.FRAMEBUFFER,j,n.RENDERBUFFER,q)}}else if(e.bindFramebuffer(n.FRAMEBUFFER,g.__webglFramebuffer),g.__webglDepthbuffer===void 0)g.__webglDepthbuffer=n.createRenderbuffer(),at(g.__webglDepthbuffer,T,!1);else{const Y=T.stencilBuffer?n.DEPTH_STENCIL_ATTACHMENT:n.DEPTH_ATTACHMENT,j=g.__webglDepthbuffer;n.bindRenderbuffer(n.RENDERBUFFER,j),n.framebufferRenderbuffer(n.FRAMEBUFFER,Y,n.RENDERBUFFER,j)}e.bindFramebuffer(n.FRAMEBUFFER,null)}function Tt(T,g,N){const Y=i.get(T);g!==void 0&&mt(Y.__webglFramebuffer,T,T.texture,n.COLOR_ATTACHMENT0,n.TEXTURE_2D,0),N!==void 0&&Xt(T)}function oe(T){const g=T.texture,N=i.get(T),Y=i.get(g);T.addEventListener("dispose",A);const j=T.textures,q=T.isWebGLCubeRenderTarget===!0,gt=j.length>1;if(gt||(Y.__webglTexture===void 0&&(Y.__webglTexture=n.createTexture()),Y.__version=g.version,o.memory.textures++),q){N.__webglFramebuffer=[];for(let st=0;st<6;st++)if(g.mipmaps&&g.mipmaps.length>0){N.__webglFramebuffer[st]=[];for(let ht=0;ht<g.mipmaps.length;ht++)N.__webglFramebuffer[st][ht]=n.createFramebuffer()}else N.__webglFramebuffer[st]=n.createFramebuffer()}else{if(g.mipmaps&&g.mipmaps.length>0){N.__webglFramebuffer=[];for(let st=0;st<g.mipmaps.length;st++)N.__webglFramebuffer[st]=n.createFramebuffer()}else N.__webglFramebuffer=n.createFramebuffer();if(gt)for(let st=0,ht=j.length;st<ht;st++){const Vt=i.get(j[st]);Vt.__webglTexture===void 0&&(Vt.__webglTexture=n.createTexture(),o.memory.textures++)}if(T.samples>0&&zt(T)===!1){N.__webglMultisampledFramebuffer=n.createFramebuffer(),N.__webglColorRenderbuffer=[],e.bindFramebuffer(n.FRAMEBUFFER,N.__webglMultisampledFramebuffer);for(let st=0;st<j.length;st++){const ht=j[st];N.__webglColorRenderbuffer[st]=n.createRenderbuffer(),n.bindRenderbuffer(n.RENDERBUFFER,N.__webglColorRenderbuffer[st]);const Vt=a.convert(ht.format,ht.colorSpace),Q=a.convert(ht.type),ft=y(ht.internalFormat,Vt,Q,ht.colorSpace,T.isXRRenderTarget===!0),Et=Bt(T);n.renderbufferStorageMultisample(n.RENDERBUFFER,Et,ft,T.width,T.height),n.framebufferRenderbuffer(n.FRAMEBUFFER,n.COLOR_ATTACHMENT0+st,n.RENDERBUFFER,N.__webglColorRenderbuffer[st])}n.bindRenderbuffer(n.RENDERBUFFER,null),T.depthBuffer&&(N.__webglDepthRenderbuffer=n.createRenderbuffer(),at(N.__webglDepthRenderbuffer,T,!0)),e.bindFramebuffer(n.FRAMEBUFFER,null)}}if(q){e.bindTexture(n.TEXTURE_CUBE_MAP,Y.__webglTexture),Rt(n.TEXTURE_CUBE_MAP,g);for(let st=0;st<6;st++)if(g.mipmaps&&g.mipmaps.length>0)for(let ht=0;ht<g.mipmaps.length;ht++)mt(N.__webglFramebuffer[st][ht],T,g,n.COLOR_ATTACHMENT0,n.TEXTURE_CUBE_MAP_POSITIVE_X+st,ht);else mt(N.__webglFramebuffer[st],T,g,n.COLOR_ATTACHMENT0,n.TEXTURE_CUBE_MAP_POSITIVE_X+st,0);m(g)&&f(n.TEXTURE_CUBE_MAP),e.unbindTexture()}else if(gt){for(let st=0,ht=j.length;st<ht;st++){const Vt=j[st],Q=i.get(Vt);e.bindTexture(n.TEXTURE_2D,Q.__webglTexture),Rt(n.TEXTURE_2D,Vt),mt(N.__webglFramebuffer,T,Vt,n.COLOR_ATTACHMENT0+st,n.TEXTURE_2D,0),m(Vt)&&f(n.TEXTURE_2D)}e.unbindTexture()}else{let st=n.TEXTURE_2D;if((T.isWebGL3DRenderTarget||T.isWebGLArrayRenderTarget)&&(st=T.isWebGL3DRenderTarget?n.TEXTURE_3D:n.TEXTURE_2D_ARRAY),e.bindTexture(st,Y.__webglTexture),Rt(st,g),g.mipmaps&&g.mipmaps.length>0)for(let ht=0;ht<g.mipmaps.length;ht++)mt(N.__webglFramebuffer[ht],T,g,n.COLOR_ATTACHMENT0,st,ht);else mt(N.__webglFramebuffer,T,g,n.COLOR_ATTACHMENT0,st,0);m(g)&&f(st),e.unbindTexture()}T.depthBuffer&&Xt(T)}function ee(T){const g=T.textures;for(let N=0,Y=g.length;N<Y;N++){const j=g[N];if(m(j)){const q=R(T),gt=i.get(j).__webglTexture;e.bindTexture(q,gt),f(q),e.unbindTexture()}}}const Ot=[],P=[];function De(T){if(T.samples>0){if(zt(T)===!1){const g=T.textures,N=T.width,Y=T.height;let j=n.COLOR_BUFFER_BIT;const q=T.stencilBuffer?n.DEPTH_STENCIL_ATTACHMENT:n.DEPTH_ATTACHMENT,gt=i.get(T),st=g.length>1;if(st)for(let ht=0;ht<g.length;ht++)e.bindFramebuffer(n.FRAMEBUFFER,gt.__webglMultisampledFramebuffer),n.framebufferRenderbuffer(n.FRAMEBUFFER,n.COLOR_ATTACHMENT0+ht,n.RENDERBUFFER,null),e.bindFramebuffer(n.FRAMEBUFFER,gt.__webglFramebuffer),n.framebufferTexture2D(n.DRAW_FRAMEBUFFER,n.COLOR_ATTACHMENT0+ht,n.TEXTURE_2D,null,0);e.bindFramebuffer(n.READ_FRAMEBUFFER,gt.__webglMultisampledFramebuffer),e.bindFramebuffer(n.DRAW_FRAMEBUFFER,gt.__webglFramebuffer);for(let ht=0;ht<g.length;ht++){if(T.resolveDepthBuffer&&(T.depthBuffer&&(j|=n.DEPTH_BUFFER_BIT),T.stencilBuffer&&T.resolveStencilBuffer&&(j|=n.STENCIL_BUFFER_BIT)),st){n.framebufferRenderbuffer(n.READ_FRAMEBUFFER,n.COLOR_ATTACHMENT0,n.RENDERBUFFER,gt.__webglColorRenderbuffer[ht]);const Vt=i.get(g[ht]).__webglTexture;n.framebufferTexture2D(n.DRAW_FRAMEBUFFER,n.COLOR_ATTACHMENT0,n.TEXTURE_2D,Vt,0)}n.blitFramebuffer(0,0,N,Y,0,0,N,Y,j,n.NEAREST),c===!0&&(Ot.length=0,P.length=0,Ot.push(n.COLOR_ATTACHMENT0+ht),T.depthBuffer&&T.resolveDepthBuffer===!1&&(Ot.push(q),P.push(q),n.invalidateFramebuffer(n.DRAW_FRAMEBUFFER,P)),n.invalidateFramebuffer(n.READ_FRAMEBUFFER,Ot))}if(e.bindFramebuffer(n.READ_FRAMEBUFFER,null),e.bindFramebuffer(n.DRAW_FRAMEBUFFER,null),st)for(let ht=0;ht<g.length;ht++){e.bindFramebuffer(n.FRAMEBUFFER,gt.__webglMultisampledFramebuffer),n.framebufferRenderbuffer(n.FRAMEBUFFER,n.COLOR_ATTACHMENT0+ht,n.RENDERBUFFER,gt.__webglColorRenderbuffer[ht]);const Vt=i.get(g[ht]).__webglTexture;e.bindFramebuffer(n.FRAMEBUFFER,gt.__webglFramebuffer),n.framebufferTexture2D(n.DRAW_FRAMEBUFFER,n.COLOR_ATTACHMENT0+ht,n.TEXTURE_2D,Vt,0)}e.bindFramebuffer(n.DRAW_FRAMEBUFFER,gt.__webglMultisampledFramebuffer)}else if(T.depthBuffer&&T.resolveDepthBuffer===!1&&c){const g=T.stencilBuffer?n.DEPTH_STENCIL_ATTACHMENT:n.DEPTH_ATTACHMENT;n.invalidateFramebuffer(n.DRAW_FRAMEBUFFER,[g])}}}function Bt(T){return Math.min(r.maxSamples,T.samples)}function zt(T){const g=i.get(T);return T.samples>0&&t.has("WEBGL_multisampled_render_to_texture")===!0&&g.__useRenderToTexture!==!1}function xt(T){const g=o.render.frame;h.get(T)!==g&&(h.set(T,g),T.update())}function Qt(T,g){const N=T.colorSpace,Y=T.format,j=T.type;return T.isCompressedTexture===!0||T.isVideoTexture===!0||N!==Mi&&N!==Sn&&(Wt.getTransfer(N)===jt?(Y!==Ye||j!==pn)&&console.warn("THREE.WebGLTextures: sRGB encoded textures have to use RGBAFormat and UnsignedByteType."):console.error("THREE.WebGLTextures: Unsupported texture color space:",N)),g}function vt(T){return typeof HTMLImageElement<"u"&&T instanceof HTMLImageElement?(l.width=T.naturalWidth||T.width,l.height=T.naturalHeight||T.height):typeof VideoFrame<"u"&&T instanceof VideoFrame?(l.width=T.displayWidth,l.height=T.displayHeight):(l.width=T.width,l.height=T.height),l}this.allocateTextureUnit=F,this.resetTextureUnits=V,this.setTexture2D=K,this.setTexture2DArray=k,this.setTexture3D=Z,this.setTextureCube=H,this.rebindTextures=Tt,this.setupRenderTarget=oe,this.updateRenderTargetMipmap=ee,this.updateMultisampleRenderTarget=De,this.setupDepthRenderbuffer=Xt,this.setupFrameBufferTexture=mt,this.useMultisampledRTT=zt}function H_(n,t){function e(i,r=Sn){let a;const o=Wt.getTransfer(r);if(i===pn)return n.UNSIGNED_BYTE;if(i===fs)return n.UNSIGNED_SHORT_4_4_4_4;if(i===ds)return n.UNSIGNED_SHORT_5_5_5_1;if(i===oc)return n.UNSIGNED_INT_5_9_9_9_REV;if(i===ac)return n.BYTE;if(i===sc)return n.SHORT;if(i===Bi)return n.UNSIGNED_SHORT;if(i===hs)return n.INT;if(i===Wn)return n.UNSIGNED_INT;if(i===un)return n.FLOAT;if(i===Vi)return n.HALF_FLOAT;if(i===cc)return n.ALPHA;if(i===lc)return n.RGB;if(i===Ye)return n.RGBA;if(i===uc)return n.LUMINANCE;if(i===hc)return n.LUMINANCE_ALPHA;if(i===fi)return n.DEPTH_COMPONENT;if(i===xi)return n.DEPTH_STENCIL;if(i===fc)return n.RED;if(i===ps)return n.RED_INTEGER;if(i===dc)return n.RG;if(i===ms)return n.RG_INTEGER;if(i===_s)return n.RGBA_INTEGER;if(i===xr||i===Mr||i===Sr||i===Er)if(o===jt)if(a=t.get("WEBGL_compressed_texture_s3tc_srgb"),a!==null){if(i===xr)return a.COMPRESSED_SRGB_S3TC_DXT1_EXT;if(i===Mr)return a.COMPRESSED_SRGB_ALPHA_S3TC_DXT1_EXT;if(i===Sr)return a.COMPRESSED_SRGB_ALPHA_S3TC_DXT3_EXT;if(i===Er)return a.COMPRESSED_SRGB_ALPHA_S3TC_DXT5_EXT}else return null;else if(a=t.get("WEBGL_compressed_texture_s3tc"),a!==null){if(i===xr)return a.COMPRESSED_RGB_S3TC_DXT1_EXT;if(i===Mr)return a.COMPRESSED_RGBA_S3TC_DXT1_EXT;if(i===Sr)return a.COMPRESSED_RGBA_S3TC_DXT3_EXT;if(i===Er)return a.COMPRESSED_RGBA_S3TC_DXT5_EXT}else return null;if(i===Da||i===La||i===Ia||i===Ua)if(a=t.get("WEBGL_compressed_texture_pvrtc"),a!==null){if(i===Da)return a.COMPRESSED_RGB_PVRTC_4BPPV1_IMG;if(i===La)return a.COMPRESSED_RGB_PVRTC_2BPPV1_IMG;if(i===Ia)return a.COMPRESSED_RGBA_PVRTC_4BPPV1_IMG;if(i===Ua)return a.COMPRESSED_RGBA_PVRTC_2BPPV1_IMG}else return null;if(i===Na||i===Fa||i===Oa)if(a=t.get("WEBGL_compressed_texture_etc"),a!==null){if(i===Na||i===Fa)return o===jt?a.COMPRESSED_SRGB8_ETC2:a.COMPRESSED_RGB8_ETC2;if(i===Oa)return o===jt?a.COMPRESSED_SRGB8_ALPHA8_ETC2_EAC:a.COMPRESSED_RGBA8_ETC2_EAC}else return null;if(i===Ba||i===za||i===Ha||i===Va||i===Ga||i===ka||i===Wa||i===Xa||i===qa||i===Ya||i===$a||i===Za||i===Ka||i===ja)if(a=t.get("WEBGL_compressed_texture_astc"),a!==null){if(i===Ba)return o===jt?a.COMPRESSED_SRGB8_ALPHA8_ASTC_4x4_KHR:a.COMPRESSED_RGBA_ASTC_4x4_KHR;if(i===za)return o===jt?a.COMPRESSED_SRGB8_ALPHA8_ASTC_5x4_KHR:a.COMPRESSED_RGBA_ASTC_5x4_KHR;if(i===Ha)return o===jt?a.COMPRESSED_SRGB8_ALPHA8_ASTC_5x5_KHR:a.COMPRESSED_RGBA_ASTC_5x5_KHR;if(i===Va)return o===jt?a.COMPRESSED_SRGB8_ALPHA8_ASTC_6x5_KHR:a.COMPRESSED_RGBA_ASTC_6x5_KHR;if(i===Ga)return o===jt?a.COMPRESSED_SRGB8_ALPHA8_ASTC_6x6_KHR:a.COMPRESSED_RGBA_ASTC_6x6_KHR;if(i===ka)return o===jt?a.COMPRESSED_SRGB8_ALPHA8_ASTC_8x5_KHR:a.COMPRESSED_RGBA_ASTC_8x5_KHR;if(i===Wa)return o===jt?a.COMPRESSED_SRGB8_ALPHA8_ASTC_8x6_KHR:a.COMPRESSED_RGBA_ASTC_8x6_KHR;if(i===Xa)return o===jt?a.COMPRESSED_SRGB8_ALPHA8_ASTC_8x8_KHR:a.COMPRESSED_RGBA_ASTC_8x8_KHR;if(i===qa)return o===jt?a.COMPRESSED_SRGB8_ALPHA8_ASTC_10x5_KHR:a.COMPRESSED_RGBA_ASTC_10x5_KHR;if(i===Ya)return o===jt?a.COMPRESSED_SRGB8_ALPHA8_ASTC_10x6_KHR:a.COMPRESSED_RGBA_ASTC_10x6_KHR;if(i===$a)return o===jt?a.COMPRESSED_SRGB8_ALPHA8_ASTC_10x8_KHR:a.COMPRESSED_RGBA_ASTC_10x8_KHR;if(i===Za)return o===jt?a.COMPRESSED_SRGB8_ALPHA8_ASTC_10x10_KHR:a.COMPRESSED_RGBA_ASTC_10x10_KHR;if(i===Ka)return o===jt?a.COMPRESSED_SRGB8_ALPHA8_ASTC_12x10_KHR:a.COMPRESSED_RGBA_ASTC_12x10_KHR;if(i===ja)return o===jt?a.COMPRESSED_SRGB8_ALPHA8_ASTC_12x12_KHR:a.COMPRESSED_RGBA_ASTC_12x12_KHR}else return null;if(i===yr||i===Ja||i===Qa)if(a=t.get("EXT_texture_compression_bptc"),a!==null){if(i===yr)return o===jt?a.COMPRESSED_SRGB_ALPHA_BPTC_UNORM_EXT:a.COMPRESSED_RGBA_BPTC_UNORM_EXT;if(i===Ja)return a.COMPRESSED_RGB_BPTC_SIGNED_FLOAT_EXT;if(i===Qa)return a.COMPRESSED_RGB_BPTC_UNSIGNED_FLOAT_EXT}else return null;if(i===pc||i===ts||i===es||i===ns)if(a=t.get("EXT_texture_compression_rgtc"),a!==null){if(i===yr)return a.COMPRESSED_RED_RGTC1_EXT;if(i===ts)return a.COMPRESSED_SIGNED_RED_RGTC1_EXT;if(i===es)return a.COMPRESSED_RED_GREEN_RGTC2_EXT;if(i===ns)return a.COMPRESSED_SIGNED_RED_GREEN_RGTC2_EXT}else return null;return i===vi?n.UNSIGNED_INT_24_8:n[i]!==void 0?n[i]:null}return{convert:e}}const V_=`
void main() {

	gl_Position = vec4( position, 1.0 );

}`,G_=`
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

}`;class k_{constructor(){this.texture=null,this.mesh=null,this.depthNear=0,this.depthFar=0}init(t,e,i){if(this.texture===null){const r=new Ae,a=t.properties.get(r);a.__webglTexture=e.texture,(e.depthNear!==i.depthNear||e.depthFar!==i.depthFar)&&(this.depthNear=e.depthNear,this.depthFar=e.depthFar),this.texture=r}}getMesh(t){if(this.texture!==null&&this.mesh===null){const e=t.cameras[0].viewport,i=new An({vertexShader:V_,fragmentShader:G_,uniforms:{depthColor:{value:this.texture},depthWidth:{value:e.z},depthHeight:{value:e.w}}});this.mesh=new Be(new Xi(20,20),i)}return this.mesh}reset(){this.texture=null,this.mesh=null}getDepthTexture(){return this.texture}}class W_ extends Ei{constructor(t,e){super();const i=this;let r=null,a=1,o=null,s="local-floor",c=1,l=null,h=null,u=null,d=null,p=null,_=null;const v=new k_,m=e.getContextAttributes();let f=null,R=null;const y=[],E=[],C=new Yt;let b=null;const A=new Pe;A.viewport=new ae;const I=new Pe;I.viewport=new ae;const S=[A,I],M=new ff;let w=null,V=null;this.cameraAutoUpdate=!0,this.enabled=!1,this.isPresenting=!1,this.getController=function(X){let et=y[X];return et===void 0&&(et=new ra,y[X]=et),et.getTargetRaySpace()},this.getControllerGrip=function(X){let et=y[X];return et===void 0&&(et=new ra,y[X]=et),et.getGripSpace()},this.getHand=function(X){let et=y[X];return et===void 0&&(et=new ra,y[X]=et),et.getHandSpace()};function F(X){const et=E.indexOf(X.inputSource);if(et===-1)return;const mt=y[et];mt!==void 0&&(mt.update(X.inputSource,X.frame,l||o),mt.dispatchEvent({type:X.type,data:X.inputSource}))}function W(){r.removeEventListener("select",F),r.removeEventListener("selectstart",F),r.removeEventListener("selectend",F),r.removeEventListener("squeeze",F),r.removeEventListener("squeezestart",F),r.removeEventListener("squeezeend",F),r.removeEventListener("end",W),r.removeEventListener("inputsourceschange",K);for(let X=0;X<y.length;X++){const et=E[X];et!==null&&(E[X]=null,y[X].disconnect(et))}w=null,V=null,v.reset(),t.setRenderTarget(f),p=null,d=null,u=null,r=null,R=null,It.stop(),i.isPresenting=!1,t.setPixelRatio(b),t.setSize(C.width,C.height,!1),i.dispatchEvent({type:"sessionend"})}this.setFramebufferScaleFactor=function(X){a=X,i.isPresenting===!0&&console.warn("THREE.WebXRManager: Cannot change framebuffer scale while presenting.")},this.setReferenceSpaceType=function(X){s=X,i.isPresenting===!0&&console.warn("THREE.WebXRManager: Cannot change reference space type while presenting.")},this.getReferenceSpace=function(){return l||o},this.setReferenceSpace=function(X){l=X},this.getBaseLayer=function(){return d!==null?d:p},this.getBinding=function(){return u},this.getFrame=function(){return _},this.getSession=function(){return r},this.setSession=async function(X){if(r=X,r!==null){if(f=t.getRenderTarget(),r.addEventListener("select",F),r.addEventListener("selectstart",F),r.addEventListener("selectend",F),r.addEventListener("squeeze",F),r.addEventListener("squeezestart",F),r.addEventListener("squeezeend",F),r.addEventListener("end",W),r.addEventListener("inputsourceschange",K),m.xrCompatible!==!0&&await e.makeXRCompatible(),b=t.getPixelRatio(),t.getSize(C),typeof XRWebGLBinding<"u"&&"createProjectionLayer"in XRWebGLBinding.prototype){let mt=null,at=null,yt=null;m.depth&&(yt=m.stencil?e.DEPTH24_STENCIL8:e.DEPTH_COMPONENT24,mt=m.stencil?xi:fi,at=m.stencil?vi:Wn);const Xt={colorFormat:e.RGBA8,depthFormat:yt,scaleFactor:a};u=new XRWebGLBinding(r,e),d=u.createProjectionLayer(Xt),r.updateRenderState({layers:[d]}),t.setPixelRatio(1),t.setSize(d.textureWidth,d.textureHeight,!1),R=new Xn(d.textureWidth,d.textureHeight,{format:Ye,type:pn,depthTexture:new Rc(d.textureWidth,d.textureHeight,at,void 0,void 0,void 0,void 0,void 0,void 0,mt),stencilBuffer:m.stencil,colorSpace:t.outputColorSpace,samples:m.antialias?4:0,resolveDepthBuffer:d.ignoreDepthValues===!1})}else{const mt={antialias:m.antialias,alpha:!0,depth:m.depth,stencil:m.stencil,framebufferScaleFactor:a};p=new XRWebGLLayer(r,e,mt),r.updateRenderState({baseLayer:p}),t.setPixelRatio(1),t.setSize(p.framebufferWidth,p.framebufferHeight,!1),R=new Xn(p.framebufferWidth,p.framebufferHeight,{format:Ye,type:pn,colorSpace:t.outputColorSpace,stencilBuffer:m.stencil})}R.isXRRenderTarget=!0,this.setFoveation(c),l=null,o=await r.requestReferenceSpace(s),It.setContext(r),It.start(),i.isPresenting=!0,i.dispatchEvent({type:"sessionstart"})}},this.getEnvironmentBlendMode=function(){if(r!==null)return r.environmentBlendMode},this.getDepthTexture=function(){return v.getDepthTexture()};function K(X){for(let et=0;et<X.removed.length;et++){const mt=X.removed[et],at=E.indexOf(mt);at>=0&&(E[at]=null,y[at].disconnect(mt))}for(let et=0;et<X.added.length;et++){const mt=X.added[et];let at=E.indexOf(mt);if(at===-1){for(let Xt=0;Xt<y.length;Xt++)if(Xt>=E.length){E.push(mt),at=Xt;break}else if(E[Xt]===null){E[Xt]=mt,at=Xt;break}if(at===-1)break}const yt=y[at];yt&&yt.connect(mt)}}const k=new B,Z=new B;function H(X,et,mt){k.setFromMatrixPosition(et.matrixWorld),Z.setFromMatrixPosition(mt.matrixWorld);const at=k.distanceTo(Z),yt=et.projectionMatrix.elements,Xt=mt.projectionMatrix.elements,Tt=yt[14]/(yt[10]-1),oe=yt[14]/(yt[10]+1),ee=(yt[9]+1)/yt[5],Ot=(yt[9]-1)/yt[5],P=(yt[8]-1)/yt[0],De=(Xt[8]+1)/Xt[0],Bt=Tt*P,zt=Tt*De,xt=at/(-P+De),Qt=xt*-P;if(et.matrixWorld.decompose(X.position,X.quaternion,X.scale),X.translateX(Qt),X.translateZ(xt),X.matrixWorld.compose(X.position,X.quaternion,X.scale),X.matrixWorldInverse.copy(X.matrixWorld).invert(),yt[10]===-1)X.projectionMatrix.copy(et.projectionMatrix),X.projectionMatrixInverse.copy(et.projectionMatrixInverse);else{const vt=Tt+xt,T=oe+xt,g=Bt-Qt,N=zt+(at-Qt),Y=ee*oe/T*vt,j=Ot*oe/T*vt;X.projectionMatrix.makePerspective(g,N,Y,j,vt,T),X.projectionMatrixInverse.copy(X.projectionMatrix).invert()}}function tt(X,et){et===null?X.matrixWorld.copy(X.matrix):X.matrixWorld.multiplyMatrices(et.matrixWorld,X.matrix),X.matrixWorldInverse.copy(X.matrixWorld).invert()}this.updateCamera=function(X){if(r===null)return;let et=X.near,mt=X.far;v.texture!==null&&(v.depthNear>0&&(et=v.depthNear),v.depthFar>0&&(mt=v.depthFar)),M.near=I.near=A.near=et,M.far=I.far=A.far=mt,(w!==M.near||V!==M.far)&&(r.updateRenderState({depthNear:M.near,depthFar:M.far}),w=M.near,V=M.far),A.layers.mask=X.layers.mask|2,I.layers.mask=X.layers.mask|4,M.layers.mask=A.layers.mask|I.layers.mask;const at=X.parent,yt=M.cameras;tt(M,at);for(let Xt=0;Xt<yt.length;Xt++)tt(yt[Xt],at);yt.length===2?H(M,A,I):M.projectionMatrix.copy(A.projectionMatrix),ct(X,M,at)};function ct(X,et,mt){mt===null?X.matrix.copy(et.matrixWorld):(X.matrix.copy(mt.matrixWorld),X.matrix.invert(),X.matrix.multiply(et.matrixWorld)),X.matrix.decompose(X.position,X.quaternion,X.scale),X.updateMatrixWorld(!0),X.projectionMatrix.copy(et.projectionMatrix),X.projectionMatrixInverse.copy(et.projectionMatrixInverse),X.isPerspectiveCamera&&(X.fov=zi*2*Math.atan(1/X.projectionMatrix.elements[5]),X.zoom=1)}this.getCamera=function(){return M},this.getFoveation=function(){if(!(d===null&&p===null))return c},this.setFoveation=function(X){c=X,d!==null&&(d.fixedFoveation=X),p!==null&&p.fixedFoveation!==void 0&&(p.fixedFoveation=X)},this.hasDepthSensing=function(){return v.texture!==null},this.getDepthSensingMesh=function(){return v.getMesh(M)};let _t=null;function Rt(X,et){if(h=et.getViewerPose(l||o),_=et,h!==null){const mt=h.views;p!==null&&(t.setRenderTargetFramebuffer(R,p.framebuffer),t.setRenderTarget(R));let at=!1;mt.length!==M.cameras.length&&(M.cameras.length=0,at=!0);for(let Tt=0;Tt<mt.length;Tt++){const oe=mt[Tt];let ee=null;if(p!==null)ee=p.getViewport(oe);else{const P=u.getViewSubImage(d,oe);ee=P.viewport,Tt===0&&(t.setRenderTargetTextures(R,P.colorTexture,d.ignoreDepthValues?void 0:P.depthStencilTexture),t.setRenderTarget(R))}let Ot=S[Tt];Ot===void 0&&(Ot=new Pe,Ot.layers.enable(Tt),Ot.viewport=new ae,S[Tt]=Ot),Ot.matrix.fromArray(oe.transform.matrix),Ot.matrix.decompose(Ot.position,Ot.quaternion,Ot.scale),Ot.projectionMatrix.fromArray(oe.projectionMatrix),Ot.projectionMatrixInverse.copy(Ot.projectionMatrix).invert(),Ot.viewport.set(ee.x,ee.y,ee.width,ee.height),Tt===0&&(M.matrix.copy(Ot.matrix),M.matrix.decompose(M.position,M.quaternion,M.scale)),at===!0&&M.cameras.push(Ot)}const yt=r.enabledFeatures;if(yt&&yt.includes("depth-sensing")&&r.depthUsage=="gpu-optimized"&&u){const Tt=u.getDepthInformation(mt[0]);Tt&&Tt.isValid&&Tt.texture&&v.init(t,Tt,r.renderState)}}for(let mt=0;mt<y.length;mt++){const at=E[mt],yt=y[mt];at!==null&&yt!==void 0&&yt.update(at,et,l||o)}_t&&_t(X,et),et.detectedPlanes&&i.dispatchEvent({type:"planesdetected",data:et}),_=null}const It=new Nc;It.setAnimationLoop(Rt),this.setAnimationLoop=function(X){_t=X},this.dispose=function(){}}}const Nn=new Ze,X_=new se;function q_(n,t){function e(m,f){m.matrixAutoUpdate===!0&&m.updateMatrix(),f.value.copy(m.matrix)}function i(m,f){f.color.getRGB(m.fogColor.value,Tc(n)),f.isFog?(m.fogNear.value=f.near,m.fogFar.value=f.far):f.isFogExp2&&(m.fogDensity.value=f.density)}function r(m,f,R,y,E){f.isMeshBasicMaterial||f.isMeshLambertMaterial?a(m,f):f.isMeshToonMaterial?(a(m,f),u(m,f)):f.isMeshPhongMaterial?(a(m,f),h(m,f)):f.isMeshStandardMaterial?(a(m,f),d(m,f),f.isMeshPhysicalMaterial&&p(m,f,E)):f.isMeshMatcapMaterial?(a(m,f),_(m,f)):f.isMeshDepthMaterial?a(m,f):f.isMeshDistanceMaterial?(a(m,f),v(m,f)):f.isMeshNormalMaterial?a(m,f):f.isLineBasicMaterial?(o(m,f),f.isLineDashedMaterial&&s(m,f)):f.isPointsMaterial?c(m,f,R,y):f.isSpriteMaterial?l(m,f):f.isShadowMaterial?(m.color.value.copy(f.color),m.opacity.value=f.opacity):f.isShaderMaterial&&(f.uniformsNeedUpdate=!1)}function a(m,f){m.opacity.value=f.opacity,f.color&&m.diffuse.value.copy(f.color),f.emissive&&m.emissive.value.copy(f.emissive).multiplyScalar(f.emissiveIntensity),f.map&&(m.map.value=f.map,e(f.map,m.mapTransform)),f.alphaMap&&(m.alphaMap.value=f.alphaMap,e(f.alphaMap,m.alphaMapTransform)),f.bumpMap&&(m.bumpMap.value=f.bumpMap,e(f.bumpMap,m.bumpMapTransform),m.bumpScale.value=f.bumpScale,f.side===be&&(m.bumpScale.value*=-1)),f.normalMap&&(m.normalMap.value=f.normalMap,e(f.normalMap,m.normalMapTransform),m.normalScale.value.copy(f.normalScale),f.side===be&&m.normalScale.value.negate()),f.displacementMap&&(m.displacementMap.value=f.displacementMap,e(f.displacementMap,m.displacementMapTransform),m.displacementScale.value=f.displacementScale,m.displacementBias.value=f.displacementBias),f.emissiveMap&&(m.emissiveMap.value=f.emissiveMap,e(f.emissiveMap,m.emissiveMapTransform)),f.specularMap&&(m.specularMap.value=f.specularMap,e(f.specularMap,m.specularMapTransform)),f.alphaTest>0&&(m.alphaTest.value=f.alphaTest);const R=t.get(f),y=R.envMap,E=R.envMapRotation;y&&(m.envMap.value=y,Nn.copy(E),Nn.x*=-1,Nn.y*=-1,Nn.z*=-1,y.isCubeTexture&&y.isRenderTargetTexture===!1&&(Nn.y*=-1,Nn.z*=-1),m.envMapRotation.value.setFromMatrix4(X_.makeRotationFromEuler(Nn)),m.flipEnvMap.value=y.isCubeTexture&&y.isRenderTargetTexture===!1?-1:1,m.reflectivity.value=f.reflectivity,m.ior.value=f.ior,m.refractionRatio.value=f.refractionRatio),f.lightMap&&(m.lightMap.value=f.lightMap,m.lightMapIntensity.value=f.lightMapIntensity,e(f.lightMap,m.lightMapTransform)),f.aoMap&&(m.aoMap.value=f.aoMap,m.aoMapIntensity.value=f.aoMapIntensity,e(f.aoMap,m.aoMapTransform))}function o(m,f){m.diffuse.value.copy(f.color),m.opacity.value=f.opacity,f.map&&(m.map.value=f.map,e(f.map,m.mapTransform))}function s(m,f){m.dashSize.value=f.dashSize,m.totalSize.value=f.dashSize+f.gapSize,m.scale.value=f.scale}function c(m,f,R,y){m.diffuse.value.copy(f.color),m.opacity.value=f.opacity,m.size.value=f.size*R,m.scale.value=y*.5,f.map&&(m.map.value=f.map,e(f.map,m.uvTransform)),f.alphaMap&&(m.alphaMap.value=f.alphaMap,e(f.alphaMap,m.alphaMapTransform)),f.alphaTest>0&&(m.alphaTest.value=f.alphaTest)}function l(m,f){m.diffuse.value.copy(f.color),m.opacity.value=f.opacity,m.rotation.value=f.rotation,f.map&&(m.map.value=f.map,e(f.map,m.mapTransform)),f.alphaMap&&(m.alphaMap.value=f.alphaMap,e(f.alphaMap,m.alphaMapTransform)),f.alphaTest>0&&(m.alphaTest.value=f.alphaTest)}function h(m,f){m.specular.value.copy(f.specular),m.shininess.value=Math.max(f.shininess,1e-4)}function u(m,f){f.gradientMap&&(m.gradientMap.value=f.gradientMap)}function d(m,f){m.metalness.value=f.metalness,f.metalnessMap&&(m.metalnessMap.value=f.metalnessMap,e(f.metalnessMap,m.metalnessMapTransform)),m.roughness.value=f.roughness,f.roughnessMap&&(m.roughnessMap.value=f.roughnessMap,e(f.roughnessMap,m.roughnessMapTransform)),f.envMap&&(m.envMapIntensity.value=f.envMapIntensity)}function p(m,f,R){m.ior.value=f.ior,f.sheen>0&&(m.sheenColor.value.copy(f.sheenColor).multiplyScalar(f.sheen),m.sheenRoughness.value=f.sheenRoughness,f.sheenColorMap&&(m.sheenColorMap.value=f.sheenColorMap,e(f.sheenColorMap,m.sheenColorMapTransform)),f.sheenRoughnessMap&&(m.sheenRoughnessMap.value=f.sheenRoughnessMap,e(f.sheenRoughnessMap,m.sheenRoughnessMapTransform))),f.clearcoat>0&&(m.clearcoat.value=f.clearcoat,m.clearcoatRoughness.value=f.clearcoatRoughness,f.clearcoatMap&&(m.clearcoatMap.value=f.clearcoatMap,e(f.clearcoatMap,m.clearcoatMapTransform)),f.clearcoatRoughnessMap&&(m.clearcoatRoughnessMap.value=f.clearcoatRoughnessMap,e(f.clearcoatRoughnessMap,m.clearcoatRoughnessMapTransform)),f.clearcoatNormalMap&&(m.clearcoatNormalMap.value=f.clearcoatNormalMap,e(f.clearcoatNormalMap,m.clearcoatNormalMapTransform),m.clearcoatNormalScale.value.copy(f.clearcoatNormalScale),f.side===be&&m.clearcoatNormalScale.value.negate())),f.dispersion>0&&(m.dispersion.value=f.dispersion),f.iridescence>0&&(m.iridescence.value=f.iridescence,m.iridescenceIOR.value=f.iridescenceIOR,m.iridescenceThicknessMinimum.value=f.iridescenceThicknessRange[0],m.iridescenceThicknessMaximum.value=f.iridescenceThicknessRange[1],f.iridescenceMap&&(m.iridescenceMap.value=f.iridescenceMap,e(f.iridescenceMap,m.iridescenceMapTransform)),f.iridescenceThicknessMap&&(m.iridescenceThicknessMap.value=f.iridescenceThicknessMap,e(f.iridescenceThicknessMap,m.iridescenceThicknessMapTransform))),f.transmission>0&&(m.transmission.value=f.transmission,m.transmissionSamplerMap.value=R.texture,m.transmissionSamplerSize.value.set(R.width,R.height),f.transmissionMap&&(m.transmissionMap.value=f.transmissionMap,e(f.transmissionMap,m.transmissionMapTransform)),m.thickness.value=f.thickness,f.thicknessMap&&(m.thicknessMap.value=f.thicknessMap,e(f.thicknessMap,m.thicknessMapTransform)),m.attenuationDistance.value=f.attenuationDistance,m.attenuationColor.value.copy(f.attenuationColor)),f.anisotropy>0&&(m.anisotropyVector.value.set(f.anisotropy*Math.cos(f.anisotropyRotation),f.anisotropy*Math.sin(f.anisotropyRotation)),f.anisotropyMap&&(m.anisotropyMap.value=f.anisotropyMap,e(f.anisotropyMap,m.anisotropyMapTransform))),m.specularIntensity.value=f.specularIntensity,m.specularColor.value.copy(f.specularColor),f.specularColorMap&&(m.specularColorMap.value=f.specularColorMap,e(f.specularColorMap,m.specularColorMapTransform)),f.specularIntensityMap&&(m.specularIntensityMap.value=f.specularIntensityMap,e(f.specularIntensityMap,m.specularIntensityMapTransform))}function _(m,f){f.matcap&&(m.matcap.value=f.matcap)}function v(m,f){const R=t.get(f).light;m.referencePosition.value.setFromMatrixPosition(R.matrixWorld),m.nearDistance.value=R.shadow.camera.near,m.farDistance.value=R.shadow.camera.far}return{refreshFogUniforms:i,refreshMaterialUniforms:r}}function Y_(n,t,e,i){let r={},a={},o=[];const s=n.getParameter(n.MAX_UNIFORM_BUFFER_BINDINGS);function c(R,y){const E=y.program;i.uniformBlockBinding(R,E)}function l(R,y){let E=r[R.id];E===void 0&&(_(R),E=h(R),r[R.id]=E,R.addEventListener("dispose",m));const C=y.program;i.updateUBOMapping(R,C);const b=t.render.frame;a[R.id]!==b&&(d(R),a[R.id]=b)}function h(R){const y=u();R.__bindingPointIndex=y;const E=n.createBuffer(),C=R.__size,b=R.usage;return n.bindBuffer(n.UNIFORM_BUFFER,E),n.bufferData(n.UNIFORM_BUFFER,C,b),n.bindBuffer(n.UNIFORM_BUFFER,null),n.bindBufferBase(n.UNIFORM_BUFFER,y,E),E}function u(){for(let R=0;R<s;R++)if(o.indexOf(R)===-1)return o.push(R),R;return console.error("THREE.WebGLRenderer: Maximum number of simultaneously usable uniforms groups reached."),0}function d(R){const y=r[R.id],E=R.uniforms,C=R.__cache;n.bindBuffer(n.UNIFORM_BUFFER,y);for(let b=0,A=E.length;b<A;b++){const I=Array.isArray(E[b])?E[b]:[E[b]];for(let S=0,M=I.length;S<M;S++){const w=I[S];if(p(w,b,S,C)===!0){const V=w.__offset,F=Array.isArray(w.value)?w.value:[w.value];let W=0;for(let K=0;K<F.length;K++){const k=F[K],Z=v(k);typeof k=="number"||typeof k=="boolean"?(w.__data[0]=k,n.bufferSubData(n.UNIFORM_BUFFER,V+W,w.__data)):k.isMatrix3?(w.__data[0]=k.elements[0],w.__data[1]=k.elements[1],w.__data[2]=k.elements[2],w.__data[3]=0,w.__data[4]=k.elements[3],w.__data[5]=k.elements[4],w.__data[6]=k.elements[5],w.__data[7]=0,w.__data[8]=k.elements[6],w.__data[9]=k.elements[7],w.__data[10]=k.elements[8],w.__data[11]=0):(k.toArray(w.__data,W),W+=Z.storage/Float32Array.BYTES_PER_ELEMENT)}n.bufferSubData(n.UNIFORM_BUFFER,V,w.__data)}}}n.bindBuffer(n.UNIFORM_BUFFER,null)}function p(R,y,E,C){const b=R.value,A=y+"_"+E;if(C[A]===void 0)return typeof b=="number"||typeof b=="boolean"?C[A]=b:C[A]=b.clone(),!0;{const I=C[A];if(typeof b=="number"||typeof b=="boolean"){if(I!==b)return C[A]=b,!0}else if(I.equals(b)===!1)return I.copy(b),!0}return!1}function _(R){const y=R.uniforms;let E=0;const C=16;for(let A=0,I=y.length;A<I;A++){const S=Array.isArray(y[A])?y[A]:[y[A]];for(let M=0,w=S.length;M<w;M++){const V=S[M],F=Array.isArray(V.value)?V.value:[V.value];for(let W=0,K=F.length;W<K;W++){const k=F[W],Z=v(k),H=E%C,tt=H%Z.boundary,ct=H+tt;E+=tt,ct!==0&&C-ct<Z.storage&&(E+=C-ct),V.__data=new Float32Array(Z.storage/Float32Array.BYTES_PER_ELEMENT),V.__offset=E,E+=Z.storage}}}const b=E%C;return b>0&&(E+=C-b),R.__size=E,R.__cache={},this}function v(R){const y={boundary:0,storage:0};return typeof R=="number"||typeof R=="boolean"?(y.boundary=4,y.storage=4):R.isVector2?(y.boundary=8,y.storage=8):R.isVector3||R.isColor?(y.boundary=16,y.storage=12):R.isVector4?(y.boundary=16,y.storage=16):R.isMatrix3?(y.boundary=48,y.storage=48):R.isMatrix4?(y.boundary=64,y.storage=64):R.isTexture?console.warn("THREE.WebGLRenderer: Texture samplers can not be part of an uniforms group."):console.warn("THREE.WebGLRenderer: Unsupported uniform value type.",R),y}function m(R){const y=R.target;y.removeEventListener("dispose",m);const E=o.indexOf(y.__bindingPointIndex);o.splice(E,1),n.deleteBuffer(r[y.id]),delete r[y.id],delete a[y.id]}function f(){for(const R in r)n.deleteBuffer(r[R]);o=[],r={},a={}}return{bind:c,update:l,dispose:f}}class Hc{constructor(t={}){const{canvas:e=Ch(),context:i=null,depth:r=!0,stencil:a=!1,alpha:o=!1,antialias:s=!1,premultipliedAlpha:c=!0,preserveDrawingBuffer:l=!1,powerPreference:h="default",failIfMajorPerformanceCaveat:u=!1,reverseDepthBuffer:d=!1}=t;this.isWebGLRenderer=!0;let p;if(i!==null){if(typeof WebGLRenderingContext<"u"&&i instanceof WebGLRenderingContext)throw new Error("THREE.WebGLRenderer: WebGL 1 is not supported since r163.");p=i.getContextAttributes().alpha}else p=o;const _=new Uint32Array(4),v=new Int32Array(4);let m=null,f=null;const R=[],y=[];this.domElement=e,this.debug={checkShaderErrors:!0,onShaderError:null},this.autoClear=!0,this.autoClearColor=!0,this.autoClearDepth=!0,this.autoClearStencil=!0,this.sortObjects=!0,this.clippingPlanes=[],this.localClippingEnabled=!1,this._outputColorSpace=Fe,this.toneMapping=Tn,this.toneMappingExposure=1;const E=this;let C=!1,b=0,A=0,I=null,S=-1,M=null;const w=new ae,V=new ae;let F=null;const W=new Ft(0);let K=0,k=e.width,Z=e.height,H=1,tt=null,ct=null;const _t=new ae(0,0,k,Z),Rt=new ae(0,0,k,Z);let It=!1;const X=new Ss;let et=!1,mt=!1;this.transmissionResolutionScale=1;const at=new se,yt=new se,Xt=new B,Tt=new ae,oe={background:null,fog:null,environment:null,overrideMaterial:null,isScene:!0};let ee=!1;function Ot(){return I===null?H:1}let P=i;function De(x,L){return e.getContext(x,L)}try{const x={alpha:!0,depth:r,stencil:a,antialias:s,premultipliedAlpha:c,preserveDrawingBuffer:l,powerPreference:h,failIfMajorPerformanceCaveat:u};if("setAttribute"in e&&e.setAttribute("data-engine",`three.js r${ls}`),e.addEventListener("webglcontextlost",$,!1),e.addEventListener("webglcontextrestored",lt,!1),e.addEventListener("webglcontextcreationerror",ot,!1),P===null){const L="webgl2";if(P=De(L,x),P===null)throw De(L)?new Error("Error creating WebGL context with your selected attributes."):new Error("Error creating WebGL context.")}}catch(x){throw console.error("THREE.WebGLRenderer: "+x.message),x}let Bt,zt,xt,Qt,vt,T,g,N,Y,j,q,gt,st,ht,Vt,Q,ft,Et,bt,dt,Ht,Dt,Jt,D;function it(){Bt=new rm(P),Bt.init(),Dt=new H_(P,Bt),zt=new Jp(P,Bt,t,Dt),xt=new B_(P,Bt),zt.reverseDepthBuffer&&d&&xt.buffers.depth.setReversed(!0),Qt=new om(P),vt=new b_,T=new z_(P,Bt,xt,vt,zt,Dt,Qt),g=new tm(E),N=new im(E),Y=new pf(P),Jt=new Kp(P,Y),j=new am(P,Y,Qt,Jt),q=new lm(P,j,Y,Qt),bt=new cm(P,zt,T),Q=new Qp(vt),gt=new T_(E,g,N,Bt,zt,Jt,Q),st=new q_(E,vt),ht=new w_,Vt=new I_(Bt),Et=new Zp(E,g,N,xt,q,p,c),ft=new F_(E,q,zt),D=new Y_(P,Qt,zt,xt),dt=new jp(P,Bt,Qt),Ht=new sm(P,Bt,Qt),Qt.programs=gt.programs,E.capabilities=zt,E.extensions=Bt,E.properties=vt,E.renderLists=ht,E.shadowMap=ft,E.state=xt,E.info=Qt}it();const G=new W_(E,P);this.xr=G,this.getContext=function(){return P},this.getContextAttributes=function(){return P.getContextAttributes()},this.forceContextLoss=function(){const x=Bt.get("WEBGL_lose_context");x&&x.loseContext()},this.forceContextRestore=function(){const x=Bt.get("WEBGL_lose_context");x&&x.restoreContext()},this.getPixelRatio=function(){return H},this.setPixelRatio=function(x){x!==void 0&&(H=x,this.setSize(k,Z,!1))},this.getSize=function(x){return x.set(k,Z)},this.setSize=function(x,L,O=!0){if(G.isPresenting){console.warn("THREE.WebGLRenderer: Can't change size while VR device is presenting.");return}k=x,Z=L,e.width=Math.floor(x*H),e.height=Math.floor(L*H),O===!0&&(e.style.width=x+"px",e.style.height=L+"px"),this.setViewport(0,0,x,L)},this.getDrawingBufferSize=function(x){return x.set(k*H,Z*H).floor()},this.setDrawingBufferSize=function(x,L,O){k=x,Z=L,H=O,e.width=Math.floor(x*O),e.height=Math.floor(L*O),this.setViewport(0,0,x,L)},this.getCurrentViewport=function(x){return x.copy(w)},this.getViewport=function(x){return x.copy(_t)},this.setViewport=function(x,L,O,z){x.isVector4?_t.set(x.x,x.y,x.z,x.w):_t.set(x,L,O,z),xt.viewport(w.copy(_t).multiplyScalar(H).round())},this.getScissor=function(x){return x.copy(Rt)},this.setScissor=function(x,L,O,z){x.isVector4?Rt.set(x.x,x.y,x.z,x.w):Rt.set(x,L,O,z),xt.scissor(V.copy(Rt).multiplyScalar(H).round())},this.getScissorTest=function(){return It},this.setScissorTest=function(x){xt.setScissorTest(It=x)},this.setOpaqueSort=function(x){tt=x},this.setTransparentSort=function(x){ct=x},this.getClearColor=function(x){return x.copy(Et.getClearColor())},this.setClearColor=function(){Et.setClearColor.apply(Et,arguments)},this.getClearAlpha=function(){return Et.getClearAlpha()},this.setClearAlpha=function(){Et.setClearAlpha.apply(Et,arguments)},this.clear=function(x=!0,L=!0,O=!0){let z=0;if(x){let U=!1;if(I!==null){const J=I.texture.format;U=J===_s||J===ms||J===ps}if(U){const J=I.texture.type,rt=J===pn||J===Wn||J===Bi||J===vi||J===fs||J===ds,ut=Et.getClearColor(),pt=Et.getClearAlpha(),At=ut.r,wt=ut.g,Mt=ut.b;rt?(_[0]=At,_[1]=wt,_[2]=Mt,_[3]=pt,P.clearBufferuiv(P.COLOR,0,_)):(v[0]=At,v[1]=wt,v[2]=Mt,v[3]=pt,P.clearBufferiv(P.COLOR,0,v))}else z|=P.COLOR_BUFFER_BIT}L&&(z|=P.DEPTH_BUFFER_BIT),O&&(z|=P.STENCIL_BUFFER_BIT,this.state.buffers.stencil.setMask(4294967295)),P.clear(z)},this.clearColor=function(){this.clear(!0,!1,!1)},this.clearDepth=function(){this.clear(!1,!0,!1)},this.clearStencil=function(){this.clear(!1,!1,!0)},this.dispose=function(){e.removeEventListener("webglcontextlost",$,!1),e.removeEventListener("webglcontextrestored",lt,!1),e.removeEventListener("webglcontextcreationerror",ot,!1),Et.dispose(),ht.dispose(),Vt.dispose(),vt.dispose(),g.dispose(),N.dispose(),q.dispose(),Jt.dispose(),D.dispose(),gt.dispose(),G.dispose(),G.removeEventListener("sessionstart",Ts),G.removeEventListener("sessionend",bs),Rn.stop()};function $(x){x.preventDefault(),console.log("THREE.WebGLRenderer: Context Lost."),C=!0}function lt(){console.log("THREE.WebGLRenderer: Context Restored."),C=!1;const x=Qt.autoReset,L=ft.enabled,O=ft.autoUpdate,z=ft.needsUpdate,U=ft.type;it(),Qt.autoReset=x,ft.enabled=L,ft.autoUpdate=O,ft.needsUpdate=z,ft.type=U}function ot(x){console.error("THREE.WebGLRenderer: A WebGL context could not be created. Reason: ",x.statusMessage)}function Ct(x){const L=x.target;L.removeEventListener("dispose",Ct),ne(L)}function ne(x){_e(x),vt.remove(x)}function _e(x){const L=vt.get(x).programs;L!==void 0&&(L.forEach(function(O){gt.releaseProgram(O)}),x.isShaderMaterial&&gt.releaseShaderCache(x))}this.renderBufferDirect=function(x,L,O,z,U,J){L===null&&(L=oe);const rt=U.isMesh&&U.matrixWorld.determinant()<0,ut=Wc(x,L,O,z,U);xt.setMaterial(z,rt);let pt=O.index,At=1;if(z.wireframe===!0){if(pt=j.getWireframeAttribute(O),pt===void 0)return;At=2}const wt=O.drawRange,Mt=O.attributes.position;let Gt=wt.start*At,$t=(wt.start+wt.count)*At;J!==null&&(Gt=Math.max(Gt,J.start*At),$t=Math.min($t,(J.start+J.count)*At)),pt!==null?(Gt=Math.max(Gt,0),$t=Math.min($t,pt.count)):Mt!=null&&(Gt=Math.max(Gt,0),$t=Math.min($t,Mt.count));const ce=$t-Gt;if(ce<0||ce===1/0)return;Jt.setup(U,z,ut,O,pt);let ie,kt=dt;if(pt!==null&&(ie=Y.get(pt),kt=Ht,kt.setIndex(ie)),U.isMesh)z.wireframe===!0?(xt.setLineWidth(z.wireframeLinewidth*Ot()),kt.setMode(P.LINES)):kt.setMode(P.TRIANGLES);else if(U.isLine){let St=z.linewidth;St===void 0&&(St=1),xt.setLineWidth(St*Ot()),U.isLineSegments?kt.setMode(P.LINES):U.isLineLoop?kt.setMode(P.LINE_LOOP):kt.setMode(P.LINE_STRIP)}else U.isPoints?kt.setMode(P.POINTS):U.isSprite&&kt.setMode(P.TRIANGLES);if(U.isBatchedMesh)if(U._multiDrawInstances!==null)kt.renderMultiDrawInstances(U._multiDrawStarts,U._multiDrawCounts,U._multiDrawCount,U._multiDrawInstances);else if(Bt.get("WEBGL_multi_draw"))kt.renderMultiDraw(U._multiDrawStarts,U._multiDrawCounts,U._multiDrawCount);else{const St=U._multiDrawStarts,me=U._multiDrawCounts,Zt=U._multiDrawCount,He=pt?Y.get(pt).bytesPerElement:1,Yn=vt.get(z).currentProgram.getUniforms();for(let we=0;we<Zt;we++)Yn.setValue(P,"_gl_DrawID",we),kt.render(St[we]/He,me[we])}else if(U.isInstancedMesh)kt.renderInstances(Gt,ce,U.count);else if(O.isInstancedBufferGeometry){const St=O._maxInstanceCount!==void 0?O._maxInstanceCount:1/0,me=Math.min(O.instanceCount,St);kt.renderInstances(Gt,ce,me)}else kt.render(Gt,ce)};function Kt(x,L,O){x.transparent===!0&&x.side===je&&x.forceSinglePass===!1?(x.side=be,x.needsUpdate=!0,Yi(x,L,O),x.side=bn,x.needsUpdate=!0,Yi(x,L,O),x.side=je):Yi(x,L,O)}this.compile=function(x,L,O=null){O===null&&(O=x),f=Vt.get(O),f.init(L),y.push(f),O.traverseVisible(function(U){U.isLight&&U.layers.test(L.layers)&&(f.pushLight(U),U.castShadow&&f.pushShadow(U))}),x!==O&&x.traverseVisible(function(U){U.isLight&&U.layers.test(L.layers)&&(f.pushLight(U),U.castShadow&&f.pushShadow(U))}),f.setupLights();const z=new Set;return x.traverse(function(U){if(!(U.isMesh||U.isPoints||U.isLine||U.isSprite))return;const J=U.material;if(J)if(Array.isArray(J))for(let rt=0;rt<J.length;rt++){const ut=J[rt];Kt(ut,O,U),z.add(ut)}else Kt(J,O,U),z.add(J)}),y.pop(),f=null,z},this.compileAsync=function(x,L,O=null){const z=this.compile(x,L,O);return new Promise(U=>{function J(){if(z.forEach(function(rt){vt.get(rt).currentProgram.isReady()&&z.delete(rt)}),z.size===0){U(x);return}setTimeout(J,10)}Bt.get("KHR_parallel_shader_compile")!==null?J():setTimeout(J,10)})};let ze=null;function nn(x){ze&&ze(x)}function Ts(){Rn.stop()}function bs(){Rn.start()}const Rn=new Nc;Rn.setAnimationLoop(nn),typeof self<"u"&&Rn.setContext(self),this.setAnimationLoop=function(x){ze=x,G.setAnimationLoop(x),x===null?Rn.stop():Rn.start()},G.addEventListener("sessionstart",Ts),G.addEventListener("sessionend",bs),this.render=function(x,L){if(L!==void 0&&L.isCamera!==!0){console.error("THREE.WebGLRenderer.render: camera is not an instance of THREE.Camera.");return}if(C===!0)return;if(x.matrixWorldAutoUpdate===!0&&x.updateMatrixWorld(),L.parent===null&&L.matrixWorldAutoUpdate===!0&&L.updateMatrixWorld(),G.enabled===!0&&G.isPresenting===!0&&(G.cameraAutoUpdate===!0&&G.updateCamera(L),L=G.getCamera()),x.isScene===!0&&x.onBeforeRender(E,x,L,I),f=Vt.get(x,y.length),f.init(L),y.push(f),yt.multiplyMatrices(L.projectionMatrix,L.matrixWorldInverse),X.setFromProjectionMatrix(yt),mt=this.localClippingEnabled,et=Q.init(this.clippingPlanes,mt),m=ht.get(x,R.length),m.init(),R.push(m),G.enabled===!0&&G.isPresenting===!0){const J=E.xr.getDepthSensingMesh();J!==null&&Fr(J,L,-1/0,E.sortObjects)}Fr(x,L,0,E.sortObjects),m.finish(),E.sortObjects===!0&&m.sort(tt,ct),ee=G.enabled===!1||G.isPresenting===!1||G.hasDepthSensing()===!1,ee&&Et.addToRenderList(m,x),this.info.render.frame++,et===!0&&Q.beginShadows();const O=f.state.shadowsArray;ft.render(O,x,L),et===!0&&Q.endShadows(),this.info.autoReset===!0&&this.info.reset();const z=m.opaque,U=m.transmissive;if(f.setupLights(),L.isArrayCamera){const J=L.cameras;if(U.length>0)for(let rt=0,ut=J.length;rt<ut;rt++){const pt=J[rt];ws(z,U,x,pt)}ee&&Et.render(x);for(let rt=0,ut=J.length;rt<ut;rt++){const pt=J[rt];As(m,x,pt,pt.viewport)}}else U.length>0&&ws(z,U,x,L),ee&&Et.render(x),As(m,x,L);I!==null&&A===0&&(T.updateMultisampleRenderTarget(I),T.updateRenderTargetMipmap(I)),x.isScene===!0&&x.onAfterRender(E,x,L),Jt.resetDefaultState(),S=-1,M=null,y.pop(),y.length>0?(f=y[y.length-1],et===!0&&Q.setGlobalState(E.clippingPlanes,f.state.camera)):f=null,R.pop(),R.length>0?m=R[R.length-1]:m=null};function Fr(x,L,O,z){if(x.visible===!1)return;if(x.layers.test(L.layers)){if(x.isGroup)O=x.renderOrder;else if(x.isLOD)x.autoUpdate===!0&&x.update(L);else if(x.isLight)f.pushLight(x),x.castShadow&&f.pushShadow(x);else if(x.isSprite){if(!x.frustumCulled||X.intersectsSprite(x)){z&&Tt.setFromMatrixPosition(x.matrixWorld).applyMatrix4(yt);const rt=q.update(x),ut=x.material;ut.visible&&m.push(x,rt,ut,O,Tt.z,null)}}else if((x.isMesh||x.isLine||x.isPoints)&&(!x.frustumCulled||X.intersectsObject(x))){const rt=q.update(x),ut=x.material;if(z&&(x.boundingSphere!==void 0?(x.boundingSphere===null&&x.computeBoundingSphere(),Tt.copy(x.boundingSphere.center)):(rt.boundingSphere===null&&rt.computeBoundingSphere(),Tt.copy(rt.boundingSphere.center)),Tt.applyMatrix4(x.matrixWorld).applyMatrix4(yt)),Array.isArray(ut)){const pt=rt.groups;for(let At=0,wt=pt.length;At<wt;At++){const Mt=pt[At],Gt=ut[Mt.materialIndex];Gt&&Gt.visible&&m.push(x,rt,Gt,O,Tt.z,Mt)}}else ut.visible&&m.push(x,rt,ut,O,Tt.z,null)}}const J=x.children;for(let rt=0,ut=J.length;rt<ut;rt++)Fr(J[rt],L,O,z)}function As(x,L,O,z){const U=x.opaque,J=x.transmissive,rt=x.transparent;f.setupLightsView(O),et===!0&&Q.setGlobalState(E.clippingPlanes,O),z&&xt.viewport(w.copy(z)),U.length>0&&qi(U,L,O),J.length>0&&qi(J,L,O),rt.length>0&&qi(rt,L,O),xt.buffers.depth.setTest(!0),xt.buffers.depth.setMask(!0),xt.buffers.color.setMask(!0),xt.setPolygonOffset(!1)}function ws(x,L,O,z){if((O.isScene===!0?O.overrideMaterial:null)!==null)return;f.state.transmissionRenderTarget[z.id]===void 0&&(f.state.transmissionRenderTarget[z.id]=new Xn(1,1,{generateMipmaps:!0,type:Bt.has("EXT_color_buffer_half_float")||Bt.has("EXT_color_buffer_float")?Vi:pn,minFilter:Vn,samples:4,stencilBuffer:a,resolveDepthBuffer:!1,resolveStencilBuffer:!1,colorSpace:Wt.workingColorSpace}));const J=f.state.transmissionRenderTarget[z.id],rt=z.viewport||w;J.setSize(rt.z*E.transmissionResolutionScale,rt.w*E.transmissionResolutionScale);const ut=E.getRenderTarget();E.setRenderTarget(J),E.getClearColor(W),K=E.getClearAlpha(),K<1&&E.setClearColor(16777215,.5),E.clear(),ee&&Et.render(O);const pt=E.toneMapping;E.toneMapping=Tn;const At=z.viewport;if(z.viewport!==void 0&&(z.viewport=void 0),f.setupLightsView(z),et===!0&&Q.setGlobalState(E.clippingPlanes,z),qi(x,O,z),T.updateMultisampleRenderTarget(J),T.updateRenderTargetMipmap(J),Bt.has("WEBGL_multisampled_render_to_texture")===!1){let wt=!1;for(let Mt=0,Gt=L.length;Mt<Gt;Mt++){const $t=L[Mt],ce=$t.object,ie=$t.geometry,kt=$t.material,St=$t.group;if(kt.side===je&&ce.layers.test(z.layers)){const me=kt.side;kt.side=be,kt.needsUpdate=!0,Rs(ce,O,z,ie,kt,St),kt.side=me,kt.needsUpdate=!0,wt=!0}}wt===!0&&(T.updateMultisampleRenderTarget(J),T.updateRenderTargetMipmap(J))}E.setRenderTarget(ut),E.setClearColor(W,K),At!==void 0&&(z.viewport=At),E.toneMapping=pt}function qi(x,L,O){const z=L.isScene===!0?L.overrideMaterial:null;for(let U=0,J=x.length;U<J;U++){const rt=x[U],ut=rt.object,pt=rt.geometry,At=z===null?rt.material:z,wt=rt.group;ut.layers.test(O.layers)&&Rs(ut,L,O,pt,At,wt)}}function Rs(x,L,O,z,U,J){x.onBeforeRender(E,L,O,z,U,J),x.modelViewMatrix.multiplyMatrices(O.matrixWorldInverse,x.matrixWorld),x.normalMatrix.getNormalMatrix(x.modelViewMatrix),U.onBeforeRender(E,L,O,z,x,J),U.transparent===!0&&U.side===je&&U.forceSinglePass===!1?(U.side=be,U.needsUpdate=!0,E.renderBufferDirect(O,L,z,U,x,J),U.side=bn,U.needsUpdate=!0,E.renderBufferDirect(O,L,z,U,x,J),U.side=je):E.renderBufferDirect(O,L,z,U,x,J),x.onAfterRender(E,L,O,z,U,J)}function Yi(x,L,O){L.isScene!==!0&&(L=oe);const z=vt.get(x),U=f.state.lights,J=f.state.shadowsArray,rt=U.state.version,ut=gt.getParameters(x,U.state,J,L,O),pt=gt.getProgramCacheKey(ut);let At=z.programs;z.environment=x.isMeshStandardMaterial?L.environment:null,z.fog=L.fog,z.envMap=(x.isMeshStandardMaterial?N:g).get(x.envMap||z.environment),z.envMapRotation=z.environment!==null&&x.envMap===null?L.environmentRotation:x.envMapRotation,At===void 0&&(x.addEventListener("dispose",Ct),At=new Map,z.programs=At);let wt=At.get(pt);if(wt!==void 0){if(z.currentProgram===wt&&z.lightsStateVersion===rt)return Ps(x,ut),wt}else ut.uniforms=gt.getUniforms(x),x.onBeforeCompile(ut,E),wt=gt.acquireProgram(ut,pt),At.set(pt,wt),z.uniforms=ut.uniforms;const Mt=z.uniforms;return(!x.isShaderMaterial&&!x.isRawShaderMaterial||x.clipping===!0)&&(Mt.clippingPlanes=Q.uniform),Ps(x,ut),z.needsLights=qc(x),z.lightsStateVersion=rt,z.needsLights&&(Mt.ambientLightColor.value=U.state.ambient,Mt.lightProbe.value=U.state.probe,Mt.directionalLights.value=U.state.directional,Mt.directionalLightShadows.value=U.state.directionalShadow,Mt.spotLights.value=U.state.spot,Mt.spotLightShadows.value=U.state.spotShadow,Mt.rectAreaLights.value=U.state.rectArea,Mt.ltc_1.value=U.state.rectAreaLTC1,Mt.ltc_2.value=U.state.rectAreaLTC2,Mt.pointLights.value=U.state.point,Mt.pointLightShadows.value=U.state.pointShadow,Mt.hemisphereLights.value=U.state.hemi,Mt.directionalShadowMap.value=U.state.directionalShadowMap,Mt.directionalShadowMatrix.value=U.state.directionalShadowMatrix,Mt.spotShadowMap.value=U.state.spotShadowMap,Mt.spotLightMatrix.value=U.state.spotLightMatrix,Mt.spotLightMap.value=U.state.spotLightMap,Mt.pointShadowMap.value=U.state.pointShadowMap,Mt.pointShadowMatrix.value=U.state.pointShadowMatrix),z.currentProgram=wt,z.uniformsList=null,wt}function Cs(x){if(x.uniformsList===null){const L=x.currentProgram.getUniforms();x.uniformsList=Tr.seqWithValue(L.seq,x.uniforms)}return x.uniformsList}function Ps(x,L){const O=vt.get(x);O.outputColorSpace=L.outputColorSpace,O.batching=L.batching,O.batchingColor=L.batchingColor,O.instancing=L.instancing,O.instancingColor=L.instancingColor,O.instancingMorph=L.instancingMorph,O.skinning=L.skinning,O.morphTargets=L.morphTargets,O.morphNormals=L.morphNormals,O.morphColors=L.morphColors,O.morphTargetsCount=L.morphTargetsCount,O.numClippingPlanes=L.numClippingPlanes,O.numIntersection=L.numClipIntersection,O.vertexAlphas=L.vertexAlphas,O.vertexTangents=L.vertexTangents,O.toneMapping=L.toneMapping}function Wc(x,L,O,z,U){L.isScene!==!0&&(L=oe),T.resetTextureUnits();const J=L.fog,rt=z.isMeshStandardMaterial?L.environment:null,ut=I===null?E.outputColorSpace:I.isXRRenderTarget===!0?I.texture.colorSpace:Mi,pt=(z.isMeshStandardMaterial?N:g).get(z.envMap||rt),At=z.vertexColors===!0&&!!O.attributes.color&&O.attributes.color.itemSize===4,wt=!!O.attributes.tangent&&(!!z.normalMap||z.anisotropy>0),Mt=!!O.morphAttributes.position,Gt=!!O.morphAttributes.normal,$t=!!O.morphAttributes.color;let ce=Tn;z.toneMapped&&(I===null||I.isXRRenderTarget===!0)&&(ce=E.toneMapping);const ie=O.morphAttributes.position||O.morphAttributes.normal||O.morphAttributes.color,kt=ie!==void 0?ie.length:0,St=vt.get(z),me=f.state.lights;if(et===!0&&(mt===!0||x!==M)){const Me=x===M&&z.id===S;Q.setState(z,x,Me)}let Zt=!1;z.version===St.__version?(St.needsLights&&St.lightsStateVersion!==me.state.version||St.outputColorSpace!==ut||U.isBatchedMesh&&St.batching===!1||!U.isBatchedMesh&&St.batching===!0||U.isBatchedMesh&&St.batchingColor===!0&&U.colorTexture===null||U.isBatchedMesh&&St.batchingColor===!1&&U.colorTexture!==null||U.isInstancedMesh&&St.instancing===!1||!U.isInstancedMesh&&St.instancing===!0||U.isSkinnedMesh&&St.skinning===!1||!U.isSkinnedMesh&&St.skinning===!0||U.isInstancedMesh&&St.instancingColor===!0&&U.instanceColor===null||U.isInstancedMesh&&St.instancingColor===!1&&U.instanceColor!==null||U.isInstancedMesh&&St.instancingMorph===!0&&U.morphTexture===null||U.isInstancedMesh&&St.instancingMorph===!1&&U.morphTexture!==null||St.envMap!==pt||z.fog===!0&&St.fog!==J||St.numClippingPlanes!==void 0&&(St.numClippingPlanes!==Q.numPlanes||St.numIntersection!==Q.numIntersection)||St.vertexAlphas!==At||St.vertexTangents!==wt||St.morphTargets!==Mt||St.morphNormals!==Gt||St.morphColors!==$t||St.toneMapping!==ce||St.morphTargetsCount!==kt)&&(Zt=!0):(Zt=!0,St.__version=z.version);let He=St.currentProgram;Zt===!0&&(He=Yi(z,L,U));let Yn=!1,we=!1,Ai=!1;const te=He.getUniforms(),Le=St.uniforms;if(xt.useProgram(He.program)&&(Yn=!0,we=!0,Ai=!0),z.id!==S&&(S=z.id,we=!0),Yn||M!==x){xt.buffers.depth.getReversed()?(at.copy(x.projectionMatrix),Dh(at),Lh(at),te.setValue(P,"projectionMatrix",at)):te.setValue(P,"projectionMatrix",x.projectionMatrix),te.setValue(P,"viewMatrix",x.matrixWorldInverse);const Te=te.map.cameraPosition;Te!==void 0&&Te.setValue(P,Xt.setFromMatrixPosition(x.matrixWorld)),zt.logarithmicDepthBuffer&&te.setValue(P,"logDepthBufFC",2/(Math.log(x.far+1)/Math.LN2)),(z.isMeshPhongMaterial||z.isMeshToonMaterial||z.isMeshLambertMaterial||z.isMeshBasicMaterial||z.isMeshStandardMaterial||z.isShaderMaterial)&&te.setValue(P,"isOrthographic",x.isOrthographicCamera===!0),M!==x&&(M=x,we=!0,Ai=!0)}if(U.isSkinnedMesh){te.setOptional(P,U,"bindMatrix"),te.setOptional(P,U,"bindMatrixInverse");const Me=U.skeleton;Me&&(Me.boneTexture===null&&Me.computeBoneTexture(),te.setValue(P,"boneTexture",Me.boneTexture,T))}U.isBatchedMesh&&(te.setOptional(P,U,"batchingTexture"),te.setValue(P,"batchingTexture",U._matricesTexture,T),te.setOptional(P,U,"batchingIdTexture"),te.setValue(P,"batchingIdTexture",U._indirectTexture,T),te.setOptional(P,U,"batchingColorTexture"),U._colorsTexture!==null&&te.setValue(P,"batchingColorTexture",U._colorsTexture,T));const Ie=O.morphAttributes;if((Ie.position!==void 0||Ie.normal!==void 0||Ie.color!==void 0)&&bt.update(U,O,He),(we||St.receiveShadow!==U.receiveShadow)&&(St.receiveShadow=U.receiveShadow,te.setValue(P,"receiveShadow",U.receiveShadow)),z.isMeshGouraudMaterial&&z.envMap!==null&&(Le.envMap.value=pt,Le.flipEnvMap.value=pt.isCubeTexture&&pt.isRenderTargetTexture===!1?-1:1),z.isMeshStandardMaterial&&z.envMap===null&&L.environment!==null&&(Le.envMapIntensity.value=L.environmentIntensity),we&&(te.setValue(P,"toneMappingExposure",E.toneMappingExposure),St.needsLights&&Xc(Le,Ai),J&&z.fog===!0&&st.refreshFogUniforms(Le,J),st.refreshMaterialUniforms(Le,z,H,Z,f.state.transmissionRenderTarget[x.id]),Tr.upload(P,Cs(St),Le,T)),z.isShaderMaterial&&z.uniformsNeedUpdate===!0&&(Tr.upload(P,Cs(St),Le,T),z.uniformsNeedUpdate=!1),z.isSpriteMaterial&&te.setValue(P,"center",U.center),te.setValue(P,"modelViewMatrix",U.modelViewMatrix),te.setValue(P,"normalMatrix",U.normalMatrix),te.setValue(P,"modelMatrix",U.matrixWorld),z.isShaderMaterial||z.isRawShaderMaterial){const Me=z.uniformsGroups;for(let Te=0,Or=Me.length;Te<Or;Te++){const Cn=Me[Te];D.update(Cn,He),D.bind(Cn,He)}}return He}function Xc(x,L){x.ambientLightColor.needsUpdate=L,x.lightProbe.needsUpdate=L,x.directionalLights.needsUpdate=L,x.directionalLightShadows.needsUpdate=L,x.pointLights.needsUpdate=L,x.pointLightShadows.needsUpdate=L,x.spotLights.needsUpdate=L,x.spotLightShadows.needsUpdate=L,x.rectAreaLights.needsUpdate=L,x.hemisphereLights.needsUpdate=L}function qc(x){return x.isMeshLambertMaterial||x.isMeshToonMaterial||x.isMeshPhongMaterial||x.isMeshStandardMaterial||x.isShadowMaterial||x.isShaderMaterial&&x.lights===!0}this.getActiveCubeFace=function(){return b},this.getActiveMipmapLevel=function(){return A},this.getRenderTarget=function(){return I},this.setRenderTargetTextures=function(x,L,O){vt.get(x.texture).__webglTexture=L,vt.get(x.depthTexture).__webglTexture=O;const z=vt.get(x);z.__hasExternalTextures=!0,z.__autoAllocateDepthBuffer=O===void 0,z.__autoAllocateDepthBuffer||Bt.has("WEBGL_multisampled_render_to_texture")===!0&&(console.warn("THREE.WebGLRenderer: Render-to-texture extension was disabled because an external texture was provided"),z.__useRenderToTexture=!1)},this.setRenderTargetFramebuffer=function(x,L){const O=vt.get(x);O.__webglFramebuffer=L,O.__useDefaultFramebuffer=L===void 0};const Yc=P.createFramebuffer();this.setRenderTarget=function(x,L=0,O=0){I=x,b=L,A=O;let z=!0,U=null,J=!1,rt=!1;if(x){const pt=vt.get(x);if(pt.__useDefaultFramebuffer!==void 0)xt.bindFramebuffer(P.FRAMEBUFFER,null),z=!1;else if(pt.__webglFramebuffer===void 0)T.setupRenderTarget(x);else if(pt.__hasExternalTextures)T.rebindTextures(x,vt.get(x.texture).__webglTexture,vt.get(x.depthTexture).__webglTexture);else if(x.depthBuffer){const Mt=x.depthTexture;if(pt.__boundDepthTexture!==Mt){if(Mt!==null&&vt.has(Mt)&&(x.width!==Mt.image.width||x.height!==Mt.image.height))throw new Error("WebGLRenderTarget: Attached DepthTexture is initialized to the incorrect size.");T.setupDepthRenderbuffer(x)}}const At=x.texture;(At.isData3DTexture||At.isDataArrayTexture||At.isCompressedArrayTexture)&&(rt=!0);const wt=vt.get(x).__webglFramebuffer;x.isWebGLCubeRenderTarget?(Array.isArray(wt[L])?U=wt[L][O]:U=wt[L],J=!0):x.samples>0&&T.useMultisampledRTT(x)===!1?U=vt.get(x).__webglMultisampledFramebuffer:Array.isArray(wt)?U=wt[O]:U=wt,w.copy(x.viewport),V.copy(x.scissor),F=x.scissorTest}else w.copy(_t).multiplyScalar(H).floor(),V.copy(Rt).multiplyScalar(H).floor(),F=It;if(O!==0&&(U=Yc),xt.bindFramebuffer(P.FRAMEBUFFER,U)&&z&&xt.drawBuffers(x,U),xt.viewport(w),xt.scissor(V),xt.setScissorTest(F),J){const pt=vt.get(x.texture);P.framebufferTexture2D(P.FRAMEBUFFER,P.COLOR_ATTACHMENT0,P.TEXTURE_CUBE_MAP_POSITIVE_X+L,pt.__webglTexture,O)}else if(rt){const pt=vt.get(x.texture),At=L;P.framebufferTextureLayer(P.FRAMEBUFFER,P.COLOR_ATTACHMENT0,pt.__webglTexture,O,At)}else if(x!==null&&O!==0){const pt=vt.get(x.texture);P.framebufferTexture2D(P.FRAMEBUFFER,P.COLOR_ATTACHMENT0,P.TEXTURE_2D,pt.__webglTexture,O)}S=-1},this.readRenderTargetPixels=function(x,L,O,z,U,J,rt){if(!(x&&x.isWebGLRenderTarget)){console.error("THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not THREE.WebGLRenderTarget.");return}let ut=vt.get(x).__webglFramebuffer;if(x.isWebGLCubeRenderTarget&&rt!==void 0&&(ut=ut[rt]),ut){xt.bindFramebuffer(P.FRAMEBUFFER,ut);try{const pt=x.texture,At=pt.format,wt=pt.type;if(!zt.textureFormatReadable(At)){console.error("THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not in RGBA or implementation defined format.");return}if(!zt.textureTypeReadable(wt)){console.error("THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not in UnsignedByteType or implementation defined type.");return}L>=0&&L<=x.width-z&&O>=0&&O<=x.height-U&&P.readPixels(L,O,z,U,Dt.convert(At),Dt.convert(wt),J)}finally{const pt=I!==null?vt.get(I).__webglFramebuffer:null;xt.bindFramebuffer(P.FRAMEBUFFER,pt)}}},this.readRenderTargetPixelsAsync=async function(x,L,O,z,U,J,rt){if(!(x&&x.isWebGLRenderTarget))throw new Error("THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not THREE.WebGLRenderTarget.");let ut=vt.get(x).__webglFramebuffer;if(x.isWebGLCubeRenderTarget&&rt!==void 0&&(ut=ut[rt]),ut){const pt=x.texture,At=pt.format,wt=pt.type;if(!zt.textureFormatReadable(At))throw new Error("THREE.WebGLRenderer.readRenderTargetPixelsAsync: renderTarget is not in RGBA or implementation defined format.");if(!zt.textureTypeReadable(wt))throw new Error("THREE.WebGLRenderer.readRenderTargetPixelsAsync: renderTarget is not in UnsignedByteType or implementation defined type.");if(L>=0&&L<=x.width-z&&O>=0&&O<=x.height-U){xt.bindFramebuffer(P.FRAMEBUFFER,ut);const Mt=P.createBuffer();P.bindBuffer(P.PIXEL_PACK_BUFFER,Mt),P.bufferData(P.PIXEL_PACK_BUFFER,J.byteLength,P.STREAM_READ),P.readPixels(L,O,z,U,Dt.convert(At),Dt.convert(wt),0);const Gt=I!==null?vt.get(I).__webglFramebuffer:null;xt.bindFramebuffer(P.FRAMEBUFFER,Gt);const $t=P.fenceSync(P.SYNC_GPU_COMMANDS_COMPLETE,0);return P.flush(),await Ph(P,$t,4),P.bindBuffer(P.PIXEL_PACK_BUFFER,Mt),P.getBufferSubData(P.PIXEL_PACK_BUFFER,0,J),P.deleteBuffer(Mt),P.deleteSync($t),J}else throw new Error("THREE.WebGLRenderer.readRenderTargetPixelsAsync: requested read bounds are out of range.")}},this.copyFramebufferToTexture=function(x,L=null,O=0){x.isTexture!==!0&&(li("WebGLRenderer: copyFramebufferToTexture function signature has changed."),L=arguments[0]||null,x=arguments[1]);const z=Math.pow(2,-O),U=Math.floor(x.image.width*z),J=Math.floor(x.image.height*z),rt=L!==null?L.x:0,ut=L!==null?L.y:0;T.setTexture2D(x,0),P.copyTexSubImage2D(P.TEXTURE_2D,O,0,0,rt,ut,U,J),xt.unbindTexture()};const $c=P.createFramebuffer(),Zc=P.createFramebuffer();this.copyTextureToTexture=function(x,L,O=null,z=null,U=0,J=null){x.isTexture!==!0&&(li("WebGLRenderer: copyTextureToTexture function signature has changed."),z=arguments[0]||null,x=arguments[1],L=arguments[2],J=arguments[3]||0,O=null),J===null&&(U!==0?(li("WebGLRenderer: copyTextureToTexture function signature has changed to support src and dst mipmap levels."),J=U,U=0):J=0);let rt,ut,pt,At,wt,Mt,Gt,$t,ce;const ie=x.isCompressedTexture?x.mipmaps[J]:x.image;if(O!==null)rt=O.max.x-O.min.x,ut=O.max.y-O.min.y,pt=O.isBox3?O.max.z-O.min.z:1,At=O.min.x,wt=O.min.y,Mt=O.isBox3?O.min.z:0;else{const Ie=Math.pow(2,-U);rt=Math.floor(ie.width*Ie),ut=Math.floor(ie.height*Ie),x.isDataArrayTexture?pt=ie.depth:x.isData3DTexture?pt=Math.floor(ie.depth*Ie):pt=1,At=0,wt=0,Mt=0}z!==null?(Gt=z.x,$t=z.y,ce=z.z):(Gt=0,$t=0,ce=0);const kt=Dt.convert(L.format),St=Dt.convert(L.type);let me;L.isData3DTexture?(T.setTexture3D(L,0),me=P.TEXTURE_3D):L.isDataArrayTexture||L.isCompressedArrayTexture?(T.setTexture2DArray(L,0),me=P.TEXTURE_2D_ARRAY):(T.setTexture2D(L,0),me=P.TEXTURE_2D),P.pixelStorei(P.UNPACK_FLIP_Y_WEBGL,L.flipY),P.pixelStorei(P.UNPACK_PREMULTIPLY_ALPHA_WEBGL,L.premultiplyAlpha),P.pixelStorei(P.UNPACK_ALIGNMENT,L.unpackAlignment);const Zt=P.getParameter(P.UNPACK_ROW_LENGTH),He=P.getParameter(P.UNPACK_IMAGE_HEIGHT),Yn=P.getParameter(P.UNPACK_SKIP_PIXELS),we=P.getParameter(P.UNPACK_SKIP_ROWS),Ai=P.getParameter(P.UNPACK_SKIP_IMAGES);P.pixelStorei(P.UNPACK_ROW_LENGTH,ie.width),P.pixelStorei(P.UNPACK_IMAGE_HEIGHT,ie.height),P.pixelStorei(P.UNPACK_SKIP_PIXELS,At),P.pixelStorei(P.UNPACK_SKIP_ROWS,wt),P.pixelStorei(P.UNPACK_SKIP_IMAGES,Mt);const te=x.isDataArrayTexture||x.isData3DTexture,Le=L.isDataArrayTexture||L.isData3DTexture;if(x.isDepthTexture){const Ie=vt.get(x),Me=vt.get(L),Te=vt.get(Ie.__renderTarget),Or=vt.get(Me.__renderTarget);xt.bindFramebuffer(P.READ_FRAMEBUFFER,Te.__webglFramebuffer),xt.bindFramebuffer(P.DRAW_FRAMEBUFFER,Or.__webglFramebuffer);for(let Cn=0;Cn<pt;Cn++)te&&(P.framebufferTextureLayer(P.READ_FRAMEBUFFER,P.COLOR_ATTACHMENT0,vt.get(x).__webglTexture,U,Mt+Cn),P.framebufferTextureLayer(P.DRAW_FRAMEBUFFER,P.COLOR_ATTACHMENT0,vt.get(L).__webglTexture,J,ce+Cn)),P.blitFramebuffer(At,wt,rt,ut,Gt,$t,rt,ut,P.DEPTH_BUFFER_BIT,P.NEAREST);xt.bindFramebuffer(P.READ_FRAMEBUFFER,null),xt.bindFramebuffer(P.DRAW_FRAMEBUFFER,null)}else if(U!==0||x.isRenderTargetTexture||vt.has(x)){const Ie=vt.get(x),Me=vt.get(L);xt.bindFramebuffer(P.READ_FRAMEBUFFER,$c),xt.bindFramebuffer(P.DRAW_FRAMEBUFFER,Zc);for(let Te=0;Te<pt;Te++)te?P.framebufferTextureLayer(P.READ_FRAMEBUFFER,P.COLOR_ATTACHMENT0,Ie.__webglTexture,U,Mt+Te):P.framebufferTexture2D(P.READ_FRAMEBUFFER,P.COLOR_ATTACHMENT0,P.TEXTURE_2D,Ie.__webglTexture,U),Le?P.framebufferTextureLayer(P.DRAW_FRAMEBUFFER,P.COLOR_ATTACHMENT0,Me.__webglTexture,J,ce+Te):P.framebufferTexture2D(P.DRAW_FRAMEBUFFER,P.COLOR_ATTACHMENT0,P.TEXTURE_2D,Me.__webglTexture,J),U!==0?P.blitFramebuffer(At,wt,rt,ut,Gt,$t,rt,ut,P.COLOR_BUFFER_BIT,P.NEAREST):Le?P.copyTexSubImage3D(me,J,Gt,$t,ce+Te,At,wt,rt,ut):P.copyTexSubImage2D(me,J,Gt,$t,At,wt,rt,ut);xt.bindFramebuffer(P.READ_FRAMEBUFFER,null),xt.bindFramebuffer(P.DRAW_FRAMEBUFFER,null)}else Le?x.isDataTexture||x.isData3DTexture?P.texSubImage3D(me,J,Gt,$t,ce,rt,ut,pt,kt,St,ie.data):L.isCompressedArrayTexture?P.compressedTexSubImage3D(me,J,Gt,$t,ce,rt,ut,pt,kt,ie.data):P.texSubImage3D(me,J,Gt,$t,ce,rt,ut,pt,kt,St,ie):x.isDataTexture?P.texSubImage2D(P.TEXTURE_2D,J,Gt,$t,rt,ut,kt,St,ie.data):x.isCompressedTexture?P.compressedTexSubImage2D(P.TEXTURE_2D,J,Gt,$t,ie.width,ie.height,kt,ie.data):P.texSubImage2D(P.TEXTURE_2D,J,Gt,$t,rt,ut,kt,St,ie);P.pixelStorei(P.UNPACK_ROW_LENGTH,Zt),P.pixelStorei(P.UNPACK_IMAGE_HEIGHT,He),P.pixelStorei(P.UNPACK_SKIP_PIXELS,Yn),P.pixelStorei(P.UNPACK_SKIP_ROWS,we),P.pixelStorei(P.UNPACK_SKIP_IMAGES,Ai),J===0&&L.generateMipmaps&&P.generateMipmap(me),xt.unbindTexture()},this.copyTextureToTexture3D=function(x,L,O=null,z=null,U=0){return x.isTexture!==!0&&(li("WebGLRenderer: copyTextureToTexture3D function signature has changed."),O=arguments[0]||null,z=arguments[1]||null,x=arguments[2],L=arguments[3],U=arguments[4]||0),li('WebGLRenderer: copyTextureToTexture3D function has been deprecated. Use "copyTextureToTexture" instead.'),this.copyTextureToTexture(x,L,O,z,U)},this.initRenderTarget=function(x){vt.get(x).__webglFramebuffer===void 0&&T.setupRenderTarget(x)},this.initTexture=function(x){x.isCubeTexture?T.setTextureCube(x,0):x.isData3DTexture?T.setTexture3D(x,0):x.isDataArrayTexture||x.isCompressedArrayTexture?T.setTexture2DArray(x,0):T.setTexture2D(x,0),xt.unbindTexture()},this.resetState=function(){b=0,A=0,I=null,xt.reset(),Jt.reset()},typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("observe",{detail:this}))}get coordinateSystem(){return hn}get outputColorSpace(){return this._outputColorSpace}set outputColorSpace(t){this._outputColorSpace=t;const e=this.getContext();e.drawingBufferColorspace=Wt._getDrawingBufferColorSpace(t),e.unpackColorSpace=Wt._getUnpackColorSpace()}}const Vc={sphereCount:500,cols:25,animation:"groupWave",colorInterpolator:nu,colorDomain:[0,1],fov:50,cameraDistance:100,cameraPosition:[0,25,25],cameraLookAt:[0,25,0],nearClip:1.01,farClip:600,directionalLightIntensity:.5,ambientLightIntensity:2.5,radiusBase:.018,radiusRange:[1.5,.2],depthRange:[1,.1],opacityRange:[.7,.15],yRange:[15,-10]};function $_(n={}){const t={...Vc,...n},{sphereCount:e,cols:i,colorInterpolator:r,colorDomain:a}=t,o=Math.ceil(e/i),s=cs(r).domain(a),c=[];for(let l=0;l<e;l++){const h=l%i,u=Math.floor(l/i),d=h/(i-1),p=u/Math.max(o-1,1),_=.5+.5*Math.sin(d*Math.PI*3+p*Math.PI*2);c.push({x:h,z:u,value:_,size:Math.random(),rgba:new Ft(s(_))})}return c}function Z_(n,t={}){const e={...Vc,...t},i=dn(0),r=dn(0);let a,o,s,c,l=null,h=[],u=null,d=[];const p=[];let _=null,v=null;function m(b){return d.push(b),()=>{d=d.filter(A=>A!==b)}}function f(b){p.push(b)}function R(){s.render(a,o)}function y(){if(u)return;const b=()=>{const A=c.getElapsedTime();d.forEach(I=>I(A)),s.render(a,o),u=requestAnimationFrame(b)};u=requestAnimationFrame(b)}function E(){u&&(cancelAnimationFrame(u),u=null)}function C(){const b=new Set(h);b.add(o),a.children.filter(A=>!b.has(A)).forEach(A=>{a.remove(A),A.geometry&&A.geometry.dispose(),A.material&&A.material.dispose()}),d=[]}return qn(()=>{l=n.value;const b=l.parentElement;i.value=b.clientWidth,r.value=b.clientHeight,a=re(new wc),o=re(new Pe(e.fov,i.value/r.value,e.nearClip,e.farClip));const[A,I]=e.cameraPosition;o.position.set(A,I,e.cameraDistance),o.lookAt(...e.cameraLookAt),o.updateProjectionMatrix();const S=re(new Lc(16777215,e.directionalLightIntensity));S.position.set(5,10,5),S.castShadow=!0,S.shadow.mapSize.width=2048,S.shadow.mapSize.height=2048,S.shadow.camera.left=-30,S.shadow.camera.right=30,S.shadow.camera.top=30,S.shadow.camera.bottom=-30,S.shadow.camera.near=.1,S.shadow.camera.far=60,S.shadow.radius=8,S.shadow.blurSamples=25,a.add(S);const M=re(new Ic(16777215,e.ambientLightIntensity));a.add(M),h=[S,M],s=re(new Hc({canvas:l,antialias:!0})),s.setSize(i.value,r.value,!1),s.setClearColor(16777215,0),s.setPixelRatio(window.devicePixelRatio),s.shadowMap.enabled=!0,s.shadowMap.type=We,c=re(new Uc),_=new ResizeObserver(()=>{clearTimeout(v),v=setTimeout(()=>{const w=l.parentElement;i.value=w.clientWidth,r.value=w.clientHeight,o.aspect=i.value/r.value,o.updateProjectionMatrix(),s.setSize(i.value,r.value,!1),C(),p.forEach(V=>V()),R()},100)}),requestAnimationFrame(()=>{_.observe(l.parentElement)})}),ko(()=>{E(),_&&_.disconnect(),clearTimeout(v)}),{config:e,width:i,height:r,get scene(){return a},get camera(){return o},onAnimate:m,onRebuild:f,render:R,startAnimation:y}}class Ne{constructor(t,e,i){this.x=t,this.y=e,this.z=i}dot2(t,e){return this.x*t+this.y*e}}const K_=[new Ne(1,1,0),new Ne(-1,1,0),new Ne(1,-1,0),new Ne(-1,-1,0),new Ne(1,0,1),new Ne(-1,0,1),new Ne(1,0,-1),new Ne(-1,0,-1),new Ne(0,1,1),new Ne(0,-1,1),new Ne(0,1,-1),new Ne(0,-1,-1)],Ho=[151,160,137,91,90,15,131,13,201,95,96,53,194,233,7,225,140,36,103,30,69,142,8,99,37,240,21,10,23,190,6,148,247,120,234,75,0,26,197,62,94,252,219,203,117,35,11,32,57,177,33,88,237,149,56,87,174,20,125,136,171,168,68,175,74,165,71,134,139,48,27,166,77,146,158,231,83,111,229,122,60,211,133,230,220,105,92,41,55,46,245,40,244,102,143,54,65,25,63,161,1,216,80,73,209,76,132,187,208,89,18,169,200,196,135,130,116,188,159,86,164,100,109,198,173,186,3,64,52,217,226,250,124,123,5,202,38,147,118,126,255,82,85,212,207,206,59,227,47,16,58,17,182,189,28,42,223,183,170,213,119,248,152,2,44,154,163,70,221,153,101,155,167,43,172,9,129,22,39,253,19,98,108,110,79,113,224,232,178,185,112,104,218,246,97,228,251,34,242,193,238,210,144,12,191,179,162,241,81,51,145,235,249,14,239,107,49,192,214,31,181,199,106,157,184,84,204,176,115,121,50,45,127,4,150,254,138,236,205,93,222,114,67,29,24,72,243,141,128,195,78,66,215,61,156,180],Ni=new Array(512),Fi=new Array(512);function j_(n){n>0&&n<1&&(n*=65536),n=Math.floor(n),n<256&&(n|=n<<8);for(let t=0;t<256;t++){const e=t&1?Ho[t]^n&255:Ho[t]^n>>8&255;Ni[t]=Ni[t+256]=e,Fi[t]=Fi[t+256]=K_[e%12]}}j_(Math.random());const J_=.5*(Math.sqrt(3)-1),Di=(3-Math.sqrt(3))/6;function gr(n,t){const e=(n+t)*J_;let i=Math.floor(n+e),r=Math.floor(t+e);const a=(i+r)*Di,o=n-i+a,s=t-r+a,c=o>s?1:0,l=o>s?0:1,h=o-c+Di,u=s-l+Di,d=o-1+2*Di,p=s-1+2*Di;i&=255,r&=255;const _=Fi[i+Ni[r]],v=Fi[i+c+Ni[r+l]],m=Fi[i+1+Ni[r+1]];let f=0,R=0,y=0,E=.5-o*o-s*s;E>=0&&(E*=E,f=E*E*_.dot2(o,s));let C=.5-h*h-u*u;C>=0&&(C*=C,R=C*C*v.dot2(h,u));let b=.5-d*d-p*p;return b>=0&&(b*=b,y=b*b*m.dot2(d,p)),70*(f+R+y)}const Vo={float:{init(n){n.userData.phase=Math.random()*Math.PI*2,n.userData.speed=.4+Math.random()*.4,n.userData.amp=.3+Math.random()*.3},animate(n,t){const{basePosition:e,phase:i,speed:r,amp:a}=n.userData;n.position.y=e.y+Math.sin(t*r+i)*a}},stream:{init(n,{sceneWidth:t,sceneHeight:e}){const i=t/2,r=e/2;n.userData.xSpeed=.3+Math.random()*.5,n.userData.xMin=-i,n.userData.xMax=i,n.userData.zMin=-r,n.userData.zRange=e,n.userData.waveAmpMax=.5+Math.random()*.6,n.userData.waveFreq=1+Math.random()*2,n.userData.wavePhase=Math.random()*Math.PI*2,n.userData.zAmp=.2+Math.random()*.3,n.userData.zFreq=.5+Math.random()*1,n.userData.zPhase=Math.random()*Math.PI*2},animate(n,t){const e=n.userData,i=e.basePosition,r=e.xMax-e.xMin;let a=i.x+t*e.xSpeed;a=e.xMin+((a-e.xMin)%r+r)%r,n.position.x=a;const o=(a-e.xMin)/r,s=e.waveAmpMax*(1-o*.8),c=(i.z-e.zMin)/e.zRange;n.position.y=i.y+Math.sin(a*e.waveFreq+e.wavePhase+c*Math.PI*2)*s,n.position.z=i.z+Math.sin(t*e.zFreq+e.zPhase)*e.zAmp}},none:{init(){},animate(){}},gravity:{init(n,{sceneWidth:t}){const e=n.userData.basePosition,i=t/2,r=(e.x+i)/(i*2);n.userData.launchDelay=r*2,n.userData.cyclePeriod=3+Math.random()*1,n.userData.launchForce=2.5+Math.random()*1.5,n.userData.gravityAccel=4+Math.random()*1,n.userData.bounce=.4+Math.random()*.2,n.userData.phaseOffset=Math.random()*.3},animate(n,t){const e=n.userData,i=e.basePosition,r=((t+e.phaseOffset-e.launchDelay)%e.cyclePeriod+e.cyclePeriod)%e.cyclePeriod;let a=0,o=e.launchForce,s=r;const c=1/60;for(;s>0;){const l=Math.min(c,s);if(a+=o*l,o-=e.gravityAccel*l,a<0&&(a=0,o=Math.abs(o)*e.bounce,Math.abs(o)<.05)){o=0,a=0;break}s-=l}n.position.y=i.y+a,n.position.x=i.x,n.position.z=i.z}},perlin:{init(n,{d:t}){n.userData.gridX=t.x,n.userData.gridZ=t.z},animate(n,t){const e=n.userData,i=e.basePosition,r=.06,a=.15,o=2.5,s=t*a,c=gr(e.gridX*r+s,e.gridZ*r+s);n.position.y=i.y+c*o}},orbit:{init(n){n.userData.orbitRadX=.3+Math.random()*.6,n.userData.orbitRadY=.2+Math.random()*.4,n.userData.orbitRadZ=.2+Math.random()*.5,n.userData.orbitSpeed=.5+Math.random()*1,n.userData.orbitPhase=Math.random()*Math.PI*2,n.userData.tilt=(Math.random()-.5)*Math.PI*.6},animate(n,t){const e=n.userData,i=e.basePosition,r=t*e.orbitSpeed+e.orbitPhase,a=Math.cos(e.tilt),o=Math.sin(e.tilt),s=Math.cos(r)*e.orbitRadX,c=Math.sin(r)*e.orbitRadY;n.position.x=i.x+s*a-c*o,n.position.y=i.y+s*o+c*a,n.position.z=i.z+Math.sin(r*.7)*e.orbitRadZ}},spiral:{init(n){n.userData.spiralSpeed=.4+Math.random()*.6,n.userData.spiralGrowth=.3+Math.random()*.3,n.userData.spiralPhase=Math.random()*Math.PI*2,n.userData.cycleDuration=4+Math.random()*2,n.userData.riseSpeed=.3+Math.random()*.3},animate(n,t){const e=n.userData,i=e.basePosition,r=t%e.cycleDuration/e.cycleDuration,a=r*Math.PI*6*e.spiralSpeed+e.spiralPhase,o=r*e.spiralGrowth,s=1-r*r;n.position.x=i.x+Math.cos(a)*o*s,n.position.z=i.z+Math.sin(a)*o*s,n.position.y=i.y+r*e.riseSpeed*3,n.scale.setScalar(s*.8+.2)}},explode:{init(n){const t=Math.random()*Math.PI*2,e=Math.random()*Math.PI-Math.PI/2,i=1.5+Math.random()*2;n.userData.velX=Math.cos(t)*Math.cos(e)*i,n.userData.velY=Math.sin(e)*i+1,n.userData.velZ=Math.sin(t)*Math.cos(e)*i,n.userData.cycleDuration=5+Math.random()*1},animate(n,t){const e=n.userData,i=e.basePosition,r=t%e.cycleDuration/e.cycleDuration,a=Math.min(r*3,1),o=Math.max((r-.5)*2,0),s=1-(1-a)*(1-a),c=o*o,l=e.velX*s,h=e.velY*s,u=e.velZ*s;n.position.x=i.x+l*(1-c),n.position.y=i.y+h*(1-c),n.position.z=i.z+u*(1-c)}},vortex:{init(n){const t=n.userData.basePosition,e=Math.sqrt(t.x*t.x+t.z*t.z)+.01;n.userData.vortexDist=e,n.userData.vortexAngle=Math.atan2(t.z,t.x),n.userData.vortexSpeed=1.5/(e*.3+.5)+Math.random()*.2,n.userData.bobPhase=Math.random()*Math.PI*2,n.userData.bobSpeed=.3+Math.random()*.3,n.userData.bobAmp=.15+Math.random()*.2},animate(n,t){const e=n.userData,i=e.basePosition,r=e.vortexAngle+t*e.vortexSpeed;n.position.x=Math.cos(r)*e.vortexDist,n.position.z=Math.sin(r)*e.vortexDist,n.position.y=i.y+Math.sin(t*e.bobSpeed+e.bobPhase)*e.bobAmp}},ripple:{init(n){const t=n.userData.basePosition;n.userData.distFromCenter=Math.sqrt(t.x*t.x+t.z*t.z)},animate(n,t){const e=n.userData,i=e.basePosition,r=2,a=3,o=.8,s=.15,c=Math.sin(e.distFromCenter*a-t*r),l=Math.exp(-e.distFromCenter*s);n.position.y=i.y+c*o*l}},firefly:{init(n){n.userData.noiseOffX=Math.random()*100,n.userData.noiseOffY=Math.random()*100,n.userData.noiseOffZ=Math.random()*100,n.userData.wanderAmp=.5+Math.random()*.5,n.userData.wanderSpeed=.3+Math.random()*.3},animate(n,t){const e=n.userData,i=e.basePosition,r=t*e.wanderSpeed;n.position.x=i.x+gr(r+e.noiseOffX,0)*e.wanderAmp,n.position.y=i.y+gr(r+e.noiseOffY,1.7)*e.wanderAmp,n.position.z=i.z+gr(r+e.noiseOffZ,3.1)*e.wanderAmp}},bezier:{init(n,{d:t,sceneWidth:e,sceneHeight:i}){const r=e/2,a=i/2,o=10;n.userData.s0x=-r,n.userData.s0y=(Math.random()-.15)*a*.3,n.userData.s0z=(Math.random()-.15)*a*.3,n.userData.c1x=(Math.random()-.15)*e*.8,n.userData.c1y=a*(.3+Math.random()*.5),n.userData.c1z=-(.6+Math.random()*.4)*a,n.userData.c2x=(Math.random()-.5)*e*.8,n.userData.c2y=-a*(.3+Math.random()*.5),n.userData.c2z=(.6+Math.random()*.4)*a,n.userData.e3x=r,n.userData.e3y=a*.3,n.userData.e3z=a*.3,n.userData.bzOffset=Math.random()*o,n.userData.bzDuration=o,n.userData.pulsePhase=Math.random()*Math.PI*2,n.userData.pulseSpeed=.2+Math.random()*.3},animate(n,t){const e=n.userData,i=(t+e.bzOffset)%e.bzDuration/e.bzDuration,r=1-i,a=r*r,o=a*r,s=i*i,c=s*i,l=o,h=3*a*i,u=3*r*s,d=c;n.position.x=l*e.s0x+h*e.c1x+u*e.c2x+d*e.e3x,n.position.y=l*e.s0y+h*e.c1y+u*e.c2y+d*e.e3y,n.position.z=l*e.s0z+h*e.c1z+u*e.c2z+d*e.e3z;const p=.85+.15*Math.sin(t*e.pulseSpeed+e.pulsePhase);n.scale.setScalar(p)}},bezier2:{init(n,{d:t,sceneWidth:e,sceneHeight:i}){const r=i/2,a=10,o=t.value,s=(o-.5)*e*.9,c=(Math.random()-.5)*e*.15;n.userData.s0x=s+c,n.userData.s0y=(Math.random()-.5)*r*.3,n.userData.s0z=(Math.random()-.5)*r*.3,n.userData.c1x=s+(Math.random()-.5)*e*.25,n.userData.c1y=r*(.3+Math.random()*.5),n.userData.c1z=-(.6+Math.random()*.4)*r,n.userData.c2x=s+(Math.random()-.5)*e*.25,n.userData.c2y=-r*(.3+Math.random()*.5),n.userData.c2z=(.6+Math.random()*.4)*r,n.userData.e3x=s+c*-1,n.userData.e3y=(Math.random()-.5)*r*.3,n.userData.e3z=(Math.random()-.5)*r*.3,n.userData.bzOffset=o*a*.6+Math.random()*a*.4,n.userData.bzDuration=a,n.userData.pulsePhase=Math.random()*Math.PI*2,n.userData.pulseSpeed=1+Math.random()*1},animate(n,t){const e=n.userData,i=(t+e.bzOffset)%e.bzDuration/e.bzDuration,r=1-i,a=r*r,o=a*r,s=i*i,c=s*i,l=o,h=3*a*i,u=3*r*s,d=c;n.position.x=l*e.s0x+h*e.c1x+u*e.c2x+d*e.e3x,n.position.y=l*e.s0y+h*e.c1y+u*e.c2y+d*e.e3y,n.position.z=l*e.s0z+h*e.c1z+u*e.c2z+d*e.e3z;const p=.85+.15*Math.sin(t*e.pulseSpeed+e.pulsePhase);n.scale.setScalar(p)}},bezier3:{init(n,{d:t,sceneWidth:e,sceneHeight:i}){const r=e/2,a=i/2,o=4;n.userData.s0x=-r,n.userData.s0y=(Math.random()-.5)*a*.3,n.userData.s0z=(Math.random()-.5)*a*.3,n.userData.c1x=-r*.3+(Math.random()-.5)*r*.4,n.userData.c1y=(Math.random()-.5)*a*.4,n.userData.c1z=-(.4+Math.random()*.4)*a,n.userData.c2x=r*.3+(Math.random()-.5)*r*.4,n.userData.c2y=(Math.random()-.5)*a*.4,n.userData.c2z=(.4+Math.random()*.4)*a,n.userData.e3x=r,n.userData.e3y=(Math.random()-.5)*a*.3,n.userData.e3z=(Math.random()-.5)*a*.3,n.userData.waveAmp=1+Math.random()*.8,n.userData.waveFreq=3+Math.random()*2,n.userData.wavePhase=Math.random()*Math.PI*2,n.userData.bzOffset=Math.random()*o,n.userData.bzDuration=o},animate(n,t){const e=n.userData,i=(t+e.bzOffset)%e.bzDuration/e.bzDuration,r=1-i,a=r*r,o=a*r,s=i*i,c=s*i,l=o,h=3*a*i,u=3*r*s,d=c;n.position.x=l*e.s0x+h*e.c1x+u*e.c2x+d*e.e3x,n.position.z=l*e.s0z+h*e.c1z+u*e.c2z+d*e.e3z;const p=l*e.s0y+h*e.c1y+u*e.c2y+d*e.e3y,_=e.waveAmp*Math.exp(-i*3),v=Math.sin(i*Math.PI*2*e.waveFreq+e.wavePhase)*_;n.position.y=p+v}},groupBezier:{_groupRand(n,t){const e=Math.sin(n*127.1+t*311.7)*43758.5453;return e-Math.floor(e)},init(n,{d:t,sceneWidth:e,sceneHeight:i}){const r=e/2,a=i/2,o=12,s=5,c=Math.min(Math.floor(t.value*s),s-1),l=M=>this._groupRand(c,M),h=-r,u=(l(0)-.5)*a*1.2,d=(l(1)-.5)*a*.8,p=-r*(.1+l(2)*.4),_=(l(3)-.5)*a*1.6,v=(l(4)-.5)*a*1.2,m=r*(.1+l(5)*.4),f=(l(6)-.5)*a*1.6,R=(l(7)-.5)*a*1.2,y=r,E=(l(8)-.5)*a*1.2,C=(l(9)-.5)*a*.8,b=.1,A=.3;n.userData.s0x=h+(Math.random()-.5)*r*b,n.userData.s0y=u+(Math.random()-.5)*a*A,n.userData.s0z=d+(Math.random()-.5)*a*A,n.userData.c1x=p+(Math.random()-.5)*r*b,n.userData.c1y=_+(Math.random()-.5)*a*A,n.userData.c1z=v+(Math.random()-.5)*a*A,n.userData.c2x=m+(Math.random()-.5)*r*b,n.userData.c2y=f+(Math.random()-.5)*a*A,n.userData.c2z=R+(Math.random()-.5)*a*A,n.userData.e3x=y+(Math.random()-.5)*r*b,n.userData.e3y=E+(Math.random()-.5)*a*A,n.userData.e3z=C+(Math.random()-.5)*a*A;const I=.6+Math.random()*.8,S=o*I;n.userData.bzOffset=l(11)*S*.3+Math.random()*S*.7,n.userData.bzDuration=S},animate(n,t){const e=n.userData,i=(t+e.bzOffset)%e.bzDuration/e.bzDuration,r=1-i,a=r*r,o=a*r,s=i*i,c=s*i,l=o,h=3*a*i,u=3*r*s,d=c;n.position.x=l*e.s0x+h*e.c1x+u*e.c2x+d*e.e3x,n.position.y=l*e.s0y+h*e.c1y+u*e.c2y+d*e.e3y,n.position.z=l*e.s0z+h*e.c1z+u*e.c2z+d*e.e3z}},groupWave:{_groupRand(n,t){const e=Math.sin(n*127.1+t*311.7)*43758.5453;return e-Math.floor(e)},_groupHarmonics(n,t){const e=a=>this._groupRand(n,a),i=[],r=[];for(let a=0;a<t;a++){const o=a+1;i.push({amp:(.4+e(10+a*2)*1.2)/o,freq:(1.5+e(11+a*2)*2.5)*o,phase:0}),r.push({amp:(.3+e(20+a*2)*.8)/o,freq:(1+e(21+a*2)*3)*o,phase:0})}return{yWaves:i,zWaves:r}},buildPaths(n,{sceneWidth:t,sceneHeight:e,colorInterpolator:i}){const r=t/2,a=e/2,o=5,s=3,c=200,l=[];for(let h=0;h<o;h++){const u=b=>this._groupRand(h,b),d=(u(0)-.5)*a*1,p=(u(1)-.5)*a*.8,{yWaves:_,zWaves:v}=this._groupHarmonics(h,s),m=[];for(let b=0;b<=c;b++){const A=b/c,I=-r+A*t;let S=d;for(let w=0;w<_.length;w++)S+=Math.sin(A*Math.PI*2*_[w].freq+_[w].phase)*_[w].amp;let M=p;for(let w=0;w<v.length;w++)M+=Math.sin(A*Math.PI*2*v[w].freq+v[w].phase)*v[w].amp;m.push(new THREE.Vector3(I,S,M))}const f=new THREE.BufferGeometry().setFromPoints(m),R=(h+.5)/o,y=new THREE.Color(i(R)),E=new THREE.LineBasicMaterial({color:y,transparent:!0,opacity:.35,linewidth:1}),C=new THREE.Line(f,E);n.add(C),l.push(C)}return l},init(n,{d:t,sceneWidth:e,sceneHeight:i}){const r=e/2,a=i/2,o=5,s=3,c=Math.min(Math.floor(t.value*o),o-1),l=_=>this._groupRand(c,_),h=(l(0)-.5)*a*1,u=(l(1)-.5)*a*.8,d=[],p=[];for(let _=0;_<s;_++){const v=_+1;d.push({amp:(.4+l(10+_*2)*1.2)/v*(.7+Math.random()*.6),freq:(1.5+l(11+_*2)*2.5)*v*(.8+Math.random()*.4),phase:Math.random()*Math.PI*2}),p.push({amp:(.3+l(20+_*2)*.8)/v*(.7+Math.random()*.6),freq:(1+l(21+_*2)*3)*v*(.8+Math.random()*.4),phase:Math.random()*Math.PI*2})}n.userData.xMin=-r,n.userData.xRange=e,n.userData.xSpeed=1+Math.random()*10,n.userData.baseY=h+(Math.random()-.5)*a*.25,n.userData.baseZ=u+(Math.random()-.5)*a*.2,n.userData.yWaves=d,n.userData.zWaves=p},animate(n,t){const e=n.userData;let i=e.xMin+t*e.xSpeed;i=e.xMin+((i-e.xMin)%e.xRange+e.xRange)%e.xRange,n.position.x=i;const r=(i-e.xMin)/e.xRange;let a=e.baseY;for(let s=0;s<e.yWaves.length;s++){const c=e.yWaves[s];a+=Math.sin(r*Math.PI*2*c.freq+c.phase)*c.amp}n.position.y=a;let o=e.baseZ;for(let s=0;s<e.zWaves.length;s++){const c=e.zWaves[s];o+=Math.sin(r*Math.PI*2*c.freq+c.phase)*c.amp}n.position.z=o}}},Q_={__name:"Spheres",props:{data:{type:Array,required:!0},sceneConfig:{type:Object,default:()=>({})}},setup(n){const t=n,e=dn(null),i=Z_(e,t.sceneConfig),{config:r}=i;qn(async()=>{o(t.data),await new Promise(s=>requestAnimationFrame(s)),i.render(),i.startAnimation(),i.onRebuild(()=>o(t.data))});function a(s){const{fov:c,cameraDistance:l}=r,h=ln(s,A=>A.x),u=ln(s,A=>A.z),d=ln(s,A=>A.value),p=xs.degToRad(c),_=2*Math.tan(p/2)*l,v=_*(i.width.value/i.height.value),m=_/Math.max(u[1],1),f=ye().domain(h).range([0,v]),R=ye().domain(u).range([0,_]),y=ye().domain(d).range(r.yRange),E=ye().domain([0,1]).range(r.radiusRange),C=ye().domain(u).range(r.depthRange),b=ye().domain(u).range(r.opacityRange);return re({xScale:f,zScale:R,yScale:y,sizeScale:E,depthScale:C,opacityScale:b,xOffset:v/2,zOffset:_/2,baseRadius:v*r.radiusBase,cellHeight:m})}function o(s){const c=a(s),{xScale:l,zScale:h,yScale:u,sizeScale:d,depthScale:p,opacityScale:_,xOffset:v,zOffset:m,baseRadius:f,cellHeight:R}=c,y=Vo[r.animation]??Vo.float,E=[],C=c.xOffset*2,b=c.zOffset*2;s.forEach(A=>{const I=.8+Math.random()*.4,S=f*p(A.z)*d(A.size)*I,M=re(new Ur(S,24,24)),w=re(new Cc({color:A.rgba,transparent:!0,opacity:_(A.z),roughness:0,metalness:0})),V=re(new Be(M,w)),F=re(new B(l(A.x)-v,u(A.value),h(A.z)-m));V.castShadow=!0,V.position.copy(F),V.userData.basePosition=F,y.init(V,{d:A,sceneWidth:C,sceneHeight:b}),i.scene.add(V),E.push(V)}),i.onAnimate(A=>{E.forEach(I=>y.animate(I,A))}),y.buildPaths&&y.buildPaths(i.scene,{sceneWidth:C,sceneHeight:b,colorInterpolator:r.colorInterpolator})}return(s,c)=>(pe(),en("canvas",{ref_key:"canvasEl",ref:e,style:{position:"absolute",width:"100%",height:"100%"}},null,512))}},Gc={__name:"TheBubbleScene",setup(n){const t=dn([]);return qn(()=>{t.value=$_()}),(e,i)=>t.value.length?(pe(),En(Q_,{key:0,data:t.value},null,8,["data"])):pa("",!0)}},ys={fileName:"BRD-K05804044-viability-heatmap.csv",minCellLine:300,colorInterpolator:eu,colorDomain:[1,.2],fov:25,cameraDistance:25,cameraPosition:[0,4.5,25],cameraLookAt:[0,6.5,0],nearClip:1.01,farClip:200,directionalLightIntensity:.5,ambientLightIntensity:2.5,planeZoom:10.8,planeWidthMultiplier:1.6,planeYPosition:1,planeOpacityRange:[.5,1],sphereXStep:8,sphereZStep:2,sphereBaseRadiusMultiplier:.018,sphereSizeScaleRange:[1,.3],sphereOpacityRange:[.7,.15],sphereRadiusScaleRange:[1.5,.2],sphereFloatSpeedMin:.4,sphereFloatSpeedRange:.4,sphereFloatAmplitudeBase:.08,sphereFloatAmplitudeRange:.06,ySpread:12,ySpreadOffset:10},tg="/data/";async function eg(n={}){const t={...ys,...n};return hl(`${tg}${t.fileName}`,e=>({ccle_name:e["Cell line"],viability:+e.Viability,pert_dose:+e.Dose}))}function ng(n,t={}){const e={...ys,...t},i=fl(n,c=>c.ccle_name).map(([c,l])=>({key:c,mean:El(l,h=>h.viability)})).sort((c,l)=>Yo(c.mean,l.mean)),r=Object.fromEntries(i.map((c,l)=>[c.key,l])),a=[...new Set(n.map(c=>c.pert_dose))].sort((c,l)=>l-c),o=Object.fromEntries(a.map((c,l)=>[c,l])),s=cs(e.colorInterpolator).domain(e.colorDomain);return n.forEach(c=>{c.x=r[c.ccle_name],c.z=o[c.pert_dose],c.y=0,c.c=s(c.viability),c.rgba=new Ft(c.c)}),n.filter(c=>c.x>e.minCellLine)}function kc(n,t={}){const e={...ys,...t},i=dn(0),r=dn(0);let a,o,s,c,l=null,h=[],u=null,d=[];const p=[];let _=null,v=null;function m(b){return d.push(b),()=>{d=d.filter(A=>A!==b)}}function f(b){p.push(b)}function R(){s.render(a,o)}function y(){if(u)return;const b=()=>{const A=c.getElapsedTime();d.forEach(I=>I(A)),s.render(a,o),u=requestAnimationFrame(b)};u=requestAnimationFrame(b)}function E(){u&&(cancelAnimationFrame(u),u=null)}function C(){const b=new Set(h);b.add(o),a.children.filter(A=>!b.has(A)).forEach(A=>{a.remove(A),A.geometry&&A.geometry.dispose(),A.material&&A.material.dispose()}),d=[]}return qn(()=>{l=n.value;const b=l.parentElement;i.value=b.clientWidth,r.value=b.clientHeight,a=re(new wc),o=re(new Pe(e.fov,i.value/r.value,e.nearClip,e.farClip));const[A,I]=e.cameraPosition;o.position.set(A,I,e.cameraDistance),o.lookAt(...e.cameraLookAt),o.updateProjectionMatrix();const S=re(new Lc(16777215,e.directionalLightIntensity));S.position.set(5,10,5),S.castShadow=!0,S.shadow.mapSize.width=2048,S.shadow.mapSize.height=2048,S.shadow.camera.left=-30,S.shadow.camera.right=30,S.shadow.camera.top=30,S.shadow.camera.bottom=-30,S.shadow.camera.near=.1,S.shadow.camera.far=60,S.shadow.radius=8,S.shadow.blurSamples=25,a.add(S);const M=re(new Ic(16777215,e.ambientLightIntensity));a.add(M),h=[S,M],s=re(new Hc({canvas:l,antialias:!0,alpha:!0})),s.setSize(i.value,r.value,!1),s.setClearColor(16777215,0),s.setPixelRatio(window.devicePixelRatio),s.shadowMap.enabled=!0,s.shadowMap.type=We,c=re(new Uc),_=new ResizeObserver(()=>{clearTimeout(v),v=setTimeout(()=>{const w=l.parentElement;i.value=w.clientWidth,r.value=w.clientHeight,o.aspect=i.value/r.value,o.updateProjectionMatrix(),s.setSize(i.value,r.value,!1),C(),p.forEach(V=>V()),R()},100)}),requestAnimationFrame(()=>{_.observe(l.parentElement)})}),ko(()=>{E(),_&&_.disconnect(),clearTimeout(v)}),{config:e,width:i,height:r,get scene(){return a},get camera(){return o},onAnimate:m,onRebuild:f,render:R,startAnimation:y}}const ig={__name:"ViabilityHeatmap",props:{data:{type:Array,required:!0},sceneConfig:{type:Object,default:()=>({})}},setup(n){const t=n,e=dn(null),i=kc(e,t.sceneConfig),{config:r}=i;qn(async()=>{o(t.data),await new Promise(s=>requestAnimationFrame(s)),i.render(),i.onRebuild(()=>o(t.data))});function a(s){const{fov:c,cameraDistance:l}=r,h=ln(s,C=>C.z),u=ln(s,C=>C.x),d=xs.degToRad(c),p=2*Math.tan(d/2)*l,v=p*(i.width.value/i.height.value),m=v/u[1],f=p/Math.max(h[1],1),R=ye().domain(u).range([0,v]),y=ye().domain(h).range([0,p]),E=ye().domain(h).range(r.planeOpacityRange);return{xScale:R,zScale:y,opacityScale:E,xOffset:v/2,zOffset:p/2,planeWidth:m,planeHeight:f}}function o(s){const c=a(s),{xScale:l,zScale:h,opacityScale:u,xOffset:d,zOffset:p,planeWidth:_,planeHeight:v}=c,{planeZoom:m,planeWidthMultiplier:f,planeYPosition:R}=r;s.forEach(y=>{const E=new Xi(_*f*m,v*m),C=new of({color:y.rgba,side:je,opacity:u(y.z),transparent:!0,depthWrite:!1}),b=new Be(E,C);b.receiveShadow=!0,b.rotation.x=-Math.PI/2,b.position.set((l(y.x)-d)*m,R,(h(y.z)-p)*m),i.scene.add(b)})}return(s,c)=>(pe(),en("canvas",{ref_key:"canvasEl",ref:e,style:{position:"absolute",width:"100%",height:"100%"}},null,512))}},rg={__name:"ViabilitySpheres",props:{data:{type:Array,required:!0},sceneConfig:{type:Object,default:()=>({})}},setup(n){const t=n,e=dn(null),i=kc(e,t.sceneConfig),{config:r}=i;qn(async()=>{o(t.data),await new Promise(s=>requestAnimationFrame(s)),i.render(),i.startAnimation(),i.onRebuild(()=>o(t.data))});function a(s){const{fov:c,cameraDistance:l,ySpread:h,ySpreadOffset:u}=r,d=ln(s,A=>A.z),p=ln(s,A=>A.x),_=xs.degToRad(c),v=2*Math.tan(_/2)*l,f=v*(i.width.value/i.height.value),R=f/p[1],y=v/Math.max(d[1],1),E=ye().domain(p).range([0,f]),C=ye().domain(d).range([0,v]),b=ye().domain(ln(s,A=>A.viability)).range([h,-h+u]);return re({xScale:E,zScale:C,yScale:b,xOffset:f/2,zOffset:v/2,xExtent:p,zExtent:d,cellWidth:R,cellHeight:y})}function o(s){const c=a(s),{xScale:l,zScale:h,xOffset:u,zOffset:d,cellHeight:p,yScale:_,zExtent:v}=c,{sphereXStep:m,sphereZStep:f,sphereBaseRadiusMultiplier:R,sphereSizeScaleRange:y,sphereOpacityRange:E,sphereRadiusScaleRange:C,sphereFloatSpeedMin:b,sphereFloatSpeedRange:A,sphereFloatAmplitudeBase:I,sphereFloatAmplitudeRange:S}=r,M=l.range()[1]*R,w=s.filter(Z=>Z.x%m===0&&Z.z%f===0),V=ye().domain(v).range(y),F=ye().domain(v).range(E),W=ln(s,Z=>Z.viability),K=nc().exponent(1).domain(W).range(C),k=[];w.forEach(Z=>{const H=V(Z.z),tt=.8+Math.random()*.4,ct=M*H*K(Z.viability)*tt,_t=re(new Ur(ct,24,24)),Rt=re(new Cc({color:Z.rgba,transparent:!0,opacity:F(Z.z),roughness:0,metalness:0})),It=re(new Be(_t,Rt)),X=re(new B(l(Z.x)-u,_(Z.viability)+ct*.2,h(Z.z)-d));It.castShadow=!0,It.position.copy(X),It.userData.basePosition=X,It.userData.floatPhase=Math.random()*Math.PI*2,It.userData.floatSpeed=b+Math.random()*A,It.userData.floatAmplitude=p*(I+Math.random()*S)*H,i.scene.add(It),k.push(It)}),i.onAnimate(Z=>{k.forEach(H=>{const{basePosition:tt,floatPhase:ct,floatSpeed:_t,floatAmplitude:Rt}=H.userData;H.position.y=tt.y+Math.sin(Z*_t+ct)*Rt})})}return(s,c)=>(pe(),en("canvas",{ref_key:"canvasEl",ref:e,style:{position:"absolute",width:"100%",height:"100%"}},null,512))}},ag={__name:"TheViabilityScene",setup(n){const t=dn([]);return qn(async()=>{const e=await eg();t.value=ng(e)}),(e,i)=>(pe(),en(br,null,[t.value.length?(pe(),En(ig,{key:0,data:t.value},null,8,["data"])):pa("",!0),t.value.length?(pe(),En(rg,{key:1,data:t.value},null,8,["data"])):pa("",!0)],64))}},sg={components:{SvgIcon:Go,TheViabilityScene:ag,TheBubbleScene:Gc},data(){return{resizeCounter:0,ourImpactCards:[{title:"150+",subtitle:"Academic and industry partners",icon:{path:Qc,color:"white",backgroundColor:"var(--v-red-accent-2)",size:54,borderRadius:"50%"}},{title:"7,000+",subtitle:"Compounds screened in over 500 cell lines",icon:{path:tl,color:"white",backgroundColor:"var(--v-secondary-accent-4)",size:54,borderRadius:"50%"}},{title:"40+",subtitle:"Publications in high-impact journals",icon:{path:el,color:"white",backgroundColor:"var(--v-teal-accent-4)",size:54,borderRadius:"50%"}}],testimonialCards:[{quote:"I would encourage anyone in the oncology drug development space to take advantage of... the seamless integration of the generated drug-sensitivity data (900+ cell lines) with the Broad’s DepMap multi-omic annotation.",author:"Florian Muller",company:"Head of Chemistry<br>Lindonlight Collective"},{quote:"The true value of PRISM lies in its ability to generate high-throughput data incredibly cost-effectively. The user-friendly, auto-generated reports with built-in analytics supply invaluable insights, streamlining our research process.",author:"Discovery Oncology Scientist",company:"Fortune 500<br>Pharmaceutical Company"}]}},created(){window.addEventListener("resize",this.debounce(this.onWindowResize))},destroyed(){window.removeEventListener("resize",this.onWindowResize)},computed:{imgPath(){return"/images/home/"},mobile(){return this.$vuetify.display.mobile}},methods:{debounce(n){var t;return function(e){t&&clearTimeout(t),t=setTimeout(n,100,e)}},onWindowResize(){this.resizeCounter++}},watch:{}},og={class:"hero-section"},cg={class:"hero-heatmap"};function lg(n,t,e,i,r,a){const o=Gc,s=ol,c=bu,l=vu,h=al,u=fu,d=rl,p=cu,_=Kc;return pe(),En(_,{class:"mt-0 pt-0"},{default:qt(()=>[de("section",og,[de("div",cg,[Nt(o)]),t[0]||(t[0]=de("div",{class:"hero-overlay text-center"},[de("h1",{class:"text-hero text-xl mb-12 pb-4"},"Pioneering large-scale, cancer therapeutic mapping"),de("h2",{class:"text-hero text-h3"},"Powerful insights. Rapid turnaround. Innovative technology. Systematic analysis. Mission driven.")],-1))]),Nt(s,null,{default:qt(()=>t[1]||(t[1]=[de("p",{class:"text-h3 text-center"},"Our lab partners with researchers to reveal clinically important differences in drug behavior by screening over 900 cancer cell lines and correlating the viability results with baseline and functional genomic features ",-1)])),_:1}),Nt(s,null,{default:qt(()=>t[2]||(t[2]=[de("p",{class:"text-body-1"},[Xe(" Cancer cell line models remain essential in drug development, providing a controlled system to assess potency and confirm on-target engagement. At a larger scale using PRISM, these models provide power to "),de("span",{class:"text-emphasize"},"understand heterogeneity"),Xe(" in drug response among cell lines harboring the targeted alteration(s), assess "),de("span",{class:"text-emphasize"},"selectivity relative to those without target alterations, and investigate potential biomarkers associated with these responses"),Xe(". ")],-1)])),_:1}),Nt(c),Nt(l),Nt(s,{class:"my-12"},{default:qt(()=>[Nt(h,null,{default:qt(()=>t[3]||(t[3]=[Xe("Impact")])),_:1}),Nt(u,null,{default:qt(()=>t[4]||(t[4]=[Xe("Dedicated to advancing oncology research")])),_:1}),t[5]||(t[5]=de("p",{class:"text-body-1"},"Working with pharmaceutical and biotech companies and academics to improve the outcome for cancer patients worldwide. ",-1)),Nt(Oi,{class:"mt-12"},{default:qt(()=>[(pe(!0),en(br,null,da(r.ourImpactCards,(v,m)=>(pe(),En(kn,{key:v.title,cols:"12",xs:"12",sm:"4",md:"4",lg:"4",xl:"4"},{default:qt(()=>[Nt(d,{index:m,title:v.title,subtitle:v.subtitle,icon:v.icon},null,8,["index","title","subtitle","icon"])]),_:2},1024))),128))]),_:1})]),_:1}),Nt(s,{class:"my-12"},{default:qt(()=>[Nt(h,null,{default:qt(()=>t[6]||(t[6]=[Xe("Testimonials")])),_:1}),Nt(Oi,{class:"mt-6 mb-6"},{default:qt(()=>[(pe(!0),en(br,null,da(r.testimonialCards,(v,m)=>(pe(),En(kn,{key:m,cols:"12",xs:"12",sm:"6",md:"6",lg:"6",xl:"6"},{default:qt(()=>[Nt(p,{index:m,card:v},null,8,["index","card"])]),_:2},1024))),128))]),_:1})]),_:1})]),_:1})}const Pg=Hi(sg,[["render",lg],["__scopeId","data-v-343e027c"]]);export{Pg as default};
