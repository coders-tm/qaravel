import{a as Te,h as ve,j as d,l as E,A as fe,ay as De,ac as D,n as Ee,bg as Le,a7 as P,bh as N,a5 as oe,ax as R,an as G,a9 as V,H as $e,ae as Ae,B as Pe,ag as ze,E as We,ai as Fe,bi as Ie,bj as Xe,r as M,ak as je,bk as He,a8 as h,o as Qe,a6 as ue,k as Ye,aC as Ne,aL as le,q as z,m as Re,bl as Ve}from"./index.a7c16841.js";function Ue(){if(window.getSelection!==void 0){const t=window.getSelection();t.empty!==void 0?t.empty():t.removeAllRanges!==void 0&&(t.removeAllRanges(),Te.is.mobile!==!0&&t.addRange(document.createRange()))}else document.selection!==void 0&&document.selection.empty()}var et=ve({name:"QItemLabel",props:{overline:Boolean,caption:Boolean,header:Boolean,lines:[Number,String]},setup(t,{slots:r}){const o=d(()=>parseInt(t.lines,10)),m=d(()=>"q-item__label"+(t.overline===!0?" q-item__label--overline text-overline":"")+(t.caption===!0?" q-item__label--caption text-caption":"")+(t.header===!0?" q-item__label--header":"")+(o.value===1?" ellipsis":"")),e=d(()=>t.lines!==void 0&&o.value>1?{overflow:"hidden",display:"-webkit-box","-webkit-box-orient":"vertical","-webkit-line-clamp":o.value}:null);return()=>E("div",{style:e.value,class:m.value},fe(r.default))}});const J={left:!0,right:!0,up:!0,down:!0,horizontal:!0,vertical:!0},Ke=Object.keys(J);J.all=!0;function se(t){const r={};for(const o of Ke)t[o]===!0&&(r[o]=!0);return Object.keys(r).length===0?J:(r.horizontal===!0?r.left=r.right=!0:r.left===!0&&r.right===!0&&(r.horizontal=!0),r.vertical===!0?r.up=r.down=!0:r.up===!0&&r.down===!0&&(r.vertical=!0),r.horizontal===!0&&r.vertical===!0&&(r.all=!0),r)}function de(t,r){return r.event===void 0&&t.target!==void 0&&t.target.draggable!==!0&&typeof r.handler=="function"&&t.target.nodeName.toUpperCase()!=="INPUT"&&(t.qClonedBy===void 0||t.qClonedBy.indexOf(r.uid)===-1)}function U(t,r,o){const m=G(t);let e,n=m.left-r.event.x,l=m.top-r.event.y,v=Math.abs(n),f=Math.abs(l);const i=r.direction;i.horizontal===!0&&i.vertical!==!0?e=n<0?"left":"right":i.horizontal!==!0&&i.vertical===!0?e=l<0?"up":"down":i.up===!0&&l<0?(e="up",v>f&&(i.left===!0&&n<0?e="left":i.right===!0&&n>0&&(e="right"))):i.down===!0&&l>0?(e="down",v>f&&(i.left===!0&&n<0?e="left":i.right===!0&&n>0&&(e="right"))):i.left===!0&&n<0?(e="left",v<f&&(i.up===!0&&l<0?e="up":i.down===!0&&l>0&&(e="down"))):i.right===!0&&n>0&&(e="right",v<f&&(i.up===!0&&l<0?e="up":i.down===!0&&l>0&&(e="down")));let q=!1;if(e===void 0&&o===!1){if(r.event.isFirst===!0||r.event.lastDir===void 0)return{};e=r.event.lastDir,q=!0,e==="left"||e==="right"?(m.left-=n,v=0,n=0):(m.top-=l,f=0,l=0)}return{synthetic:q,payload:{evt:t,touch:r.event.mouse!==!0,mouse:r.event.mouse===!0,position:m,direction:e,isFirst:r.event.isFirst,isFinal:o===!0,duration:Date.now()-r.event.time,distance:{x:v,y:f},offset:{x:n,y:l},delta:{x:m.left-r.event.lastX,y:m.top-r.event.lastY}}}}let Ge=0;var K=De({name:"touch-pan",beforeMount(t,{value:r,modifiers:o}){if(o.mouse!==!0&&D.has.touch!==!0)return;function m(n,l){o.mouse===!0&&l===!0?$e(n):(o.stop===!0&&R(n),o.prevent===!0&&oe(n))}const e={uid:"qvtp_"+Ge++,handler:r,modifiers:o,direction:se(o),noop:Ee,mouseStart(n){de(n,e)&&Le(n)&&(P(e,"temp",[[document,"mousemove","move","notPassiveCapture"],[document,"mouseup","end","passiveCapture"]]),e.start(n,!0))},touchStart(n){if(de(n,e)){const l=n.target;P(e,"temp",[[l,"touchmove","move","notPassiveCapture"],[l,"touchcancel","end","passiveCapture"],[l,"touchend","end","passiveCapture"]]),e.start(n)}},start(n,l){if(D.is.firefox===!0&&N(t,!0),e.lastEvt=n,l===!0||o.stop===!0){if(e.direction.all!==!0&&(l!==!0||e.modifiers.mouseAllDir!==!0)){const i=n.type.indexOf("mouse")>-1?new MouseEvent(n.type,n):new TouchEvent(n.type,n);n.defaultPrevented===!0&&oe(i),n.cancelBubble===!0&&R(i),Object.assign(i,{qKeyEvent:n.qKeyEvent,qClickOutside:n.qClickOutside,qAnchorHandled:n.qAnchorHandled,qClonedBy:n.qClonedBy===void 0?[e.uid]:n.qClonedBy.concat(e.uid)}),e.initialEvent={target:n.target,event:i}}R(n)}const{left:v,top:f}=G(n);e.event={x:v,y:f,time:Date.now(),mouse:l===!0,detected:!1,isFirst:!0,isFinal:!1,lastX:v,lastY:f}},move(n){if(e.event===void 0)return;const l=G(n),v=l.left-e.event.x,f=l.top-e.event.y;if(v===0&&f===0)return;e.lastEvt=n;const i=e.event.mouse===!0,q=()=>{m(n,i),o.preserveCursor!==!0&&(document.documentElement.style.cursor="grabbing"),i===!0&&document.body.classList.add("no-pointer-events--children"),document.body.classList.add("non-selectable"),Ue(),e.styleCleanup=s=>{if(e.styleCleanup=void 0,o.preserveCursor!==!0&&(document.documentElement.style.cursor=""),document.body.classList.remove("non-selectable"),i===!0){const C=()=>{document.body.classList.remove("no-pointer-events--children")};s!==void 0?setTimeout(()=>{C(),s()},50):C()}else s!==void 0&&s()}};if(e.event.detected===!0){e.event.isFirst!==!0&&m(n,e.event.mouse);const{payload:s,synthetic:C}=U(n,e,!1);s!==void 0&&(e.handler(s)===!1?e.end(n):(e.styleCleanup===void 0&&e.event.isFirst===!0&&q(),e.event.lastX=s.position.left,e.event.lastY=s.position.top,e.event.lastDir=C===!0?void 0:s.direction,e.event.isFirst=!1));return}if(e.direction.all===!0||i===!0&&e.modifiers.mouseAllDir===!0){q(),e.event.detected=!0,e.move(n);return}const w=Math.abs(v),b=Math.abs(f);w!==b&&(e.direction.horizontal===!0&&w>b||e.direction.vertical===!0&&w<b||e.direction.up===!0&&w<b&&f<0||e.direction.down===!0&&w<b&&f>0||e.direction.left===!0&&w>b&&v<0||e.direction.right===!0&&w>b&&v>0?(e.event.detected=!0,e.move(n)):e.end(n,!0))},end(n,l){if(e.event!==void 0){if(V(e,"temp"),D.is.firefox===!0&&N(t,!1),l===!0)e.styleCleanup!==void 0&&e.styleCleanup(),e.event.detected!==!0&&e.initialEvent!==void 0&&e.initialEvent.target.dispatchEvent(e.initialEvent.event);else if(e.event.detected===!0){e.event.isFirst===!0&&e.handler(U(n===void 0?e.lastEvt:n,e).payload);const{payload:v}=U(n===void 0?e.lastEvt:n,e,!0),f=()=>{e.handler(v)};e.styleCleanup!==void 0?e.styleCleanup(f):f()}e.event=void 0,e.initialEvent=void 0,e.lastEvt=void 0}}};t.__qtouchpan=e,o.mouse===!0&&P(e,"main",[[t,"mousedown","mouseStart",`passive${o.mouseCapture===!0?"Capture":""}`]]),D.has.touch===!0&&P(e,"main",[[t,"touchstart","touchStart",`passive${o.capture===!0?"Capture":""}`],[t,"touchmove","noop","notPassiveCapture"]])},updated(t,r){const o=t.__qtouchpan;o!==void 0&&(r.oldValue!==r.value&&(typeof value!="function"&&o.end(),o.handler=r.value),o.direction=se(r.modifiers))},beforeUnmount(t){const r=t.__qtouchpan;r!==void 0&&(r.event!==void 0&&r.end(),V(r,"main"),V(r,"temp"),D.is.firefox===!0&&N(t,!1),r.styleCleanup!==void 0&&r.styleCleanup(),delete t.__qtouchpan)}});const ce=150;var tt=ve({name:"QDrawer",inheritAttrs:!1,props:{...Ae,...Pe,side:{type:String,default:"left",validator:t=>["left","right"].includes(t)},width:{type:Number,default:300},mini:Boolean,miniToOverlay:Boolean,miniWidth:{type:Number,default:57},breakpoint:{type:Number,default:1023},showIfAbove:Boolean,behavior:{type:String,validator:t=>["default","desktop","mobile"].includes(t),default:"default"},bordered:Boolean,elevated:Boolean,overlay:Boolean,persistent:Boolean,noSwipeOpen:Boolean,noSwipeClose:Boolean,noSwipeBackdrop:Boolean},emits:[...ze,"on-layout","mini-state"],setup(t,{slots:r,emit:o,attrs:m}){const e=Re(),{proxy:{$q:n}}=e,l=We(t,n),{preventBodyScroll:v}=Ve(),{registerTimeout:f}=Fe(),i=Ie(Xe,()=>{console.error("QDrawer needs to be child of QLayout")});let q,w,b;const s=M(t.behavior==="mobile"||t.behavior!=="desktop"&&i.totalWidth.value<=t.breakpoint),C=d(()=>t.mini===!0&&s.value!==!0),p=d(()=>C.value===!0?t.miniWidth:t.width),c=M(t.showIfAbove===!0&&s.value===!1?!0:t.modelValue===!0),Z=d(()=>t.persistent!==!0&&(s.value===!0||ye.value===!0));function ee(a,u){if(me(),a!==!1&&i.animate(),g(0),s.value===!0){const y=i.instances[$.value];y!==void 0&&y.belowBreakpoint===!0&&y.hide(!1),B(1),i.isContainer.value!==!0&&v(!0)}else B(0),a!==!1&&H(!1);f(()=>{a!==!1&&H(!0),u!==!0&&o("show",a)},ce)}function te(a,u){he(),a!==!1&&i.animate(),B(0),g(S.value*p.value),Q(),u!==!0&&f(()=>{o("hide",a)},ce)}const{show:W,hide:O}=je({showing:c,hideOnRouteChange:Z,handleShow:ee,handleHide:te}),{addToHistory:me,removeFromHistory:he}=He(c,O,Z),L={belowBreakpoint:s,hide:O},k=d(()=>t.side==="right"),S=d(()=>(n.lang.rtl===!0?-1:1)*(k.value===!0?1:-1)),ae=M(0),_=M(!1),F=M(!1),ie=M(p.value*S.value),$=d(()=>k.value===!0?"left":"right"),I=d(()=>c.value===!0&&s.value===!1&&t.overlay===!1?t.miniToOverlay===!0?t.miniWidth:p.value:0),X=d(()=>t.overlay===!0||t.miniToOverlay===!0||i.view.value.indexOf(k.value?"R":"L")>-1||n.platform.is.ios===!0&&i.isContainer.value===!0),T=d(()=>t.overlay===!1&&c.value===!0&&s.value===!1),ye=d(()=>t.overlay===!0&&c.value===!0&&s.value===!1),be=d(()=>"fullscreen q-drawer__backdrop"+(c.value===!1&&_.value===!1?" hidden":"")),pe=d(()=>({backgroundColor:`rgba(0,0,0,${ae.value*.4})`})),ne=d(()=>k.value===!0?i.rows.value.top[2]==="r":i.rows.value.top[0]==="l"),ge=d(()=>k.value===!0?i.rows.value.bottom[2]==="r":i.rows.value.bottom[0]==="l"),we=d(()=>{const a={};return i.header.space===!0&&ne.value===!1&&(X.value===!0?a.top=`${i.header.offset}px`:i.header.space===!0&&(a.top=`${i.header.size}px`)),i.footer.space===!0&&ge.value===!1&&(X.value===!0?a.bottom=`${i.footer.offset}px`:i.footer.space===!0&&(a.bottom=`${i.footer.size}px`)),a}),Ce=d(()=>{const a={width:`${p.value}px`,transform:`translateX(${ie.value}px)`};return s.value===!0?a:Object.assign(a,we.value)}),qe=d(()=>"q-drawer__content fit "+(i.isContainer.value!==!0?"scroll":"overflow-auto")),ke=d(()=>`q-drawer q-drawer--${t.side}`+(F.value===!0?" q-drawer--mini-animate":"")+(t.bordered===!0?" q-drawer--bordered":"")+(l.value===!0?" q-drawer--dark q-dark":"")+(_.value===!0?" no-transition":c.value===!0?"":" q-layout--prevent-focus")+(s.value===!0?" fixed q-drawer--on-top q-drawer--mobile q-drawer--top-padding":` q-drawer--${C.value===!0?"mini":"standard"}`+(X.value===!0||T.value!==!0?" fixed":"")+(t.overlay===!0||t.miniToOverlay===!0?" q-drawer--on-top":"")+(ne.value===!0?" q-drawer--top-padding":""))),Be=d(()=>{const a=n.lang.rtl===!0?t.side:$.value;return[[K,Me,void 0,{[a]:!0,mouse:!0}]]}),xe=d(()=>{const a=n.lang.rtl===!0?$.value:t.side;return[[K,re,void 0,{[a]:!0,mouse:!0}]]}),Se=d(()=>{const a=n.lang.rtl===!0?$.value:t.side;return[[K,re,void 0,{[a]:!0,mouse:!0,mouseAllDir:!0}]]});function j(){Oe(s,t.behavior==="mobile"||t.behavior!=="desktop"&&i.totalWidth.value<=t.breakpoint)}h(s,a=>{a===!0?(q=c.value,c.value===!0&&O(!1)):t.overlay===!1&&t.behavior!=="mobile"&&q!==!1&&(c.value===!0?(g(0),B(0),Q()):W(!1))}),h(()=>t.side,(a,u)=>{i.instances[u]===L&&(i.instances[u]=void 0,i[u].space=!1,i[u].offset=0),i.instances[a]=L,i[a].size=p.value,i[a].space=T.value,i[a].offset=I.value}),h(i.totalWidth,()=>{(i.isContainer.value===!0||document.qScrollPrevented!==!0)&&j()}),h(()=>t.behavior+t.breakpoint,j),h(i.isContainer,a=>{c.value===!0&&v(a!==!0),a===!0&&j()}),h(i.scrollbarWidth,()=>{g(c.value===!0?0:void 0)}),h(I,a=>{x("offset",a)}),h(T,a=>{o("on-layout",a),x("space",a)}),h(k,()=>{g()}),h(p,a=>{g(),Y(t.miniToOverlay,a)}),h(()=>t.miniToOverlay,a=>{Y(a,p.value)}),h(()=>n.lang.rtl,()=>{g()}),h(()=>t.mini,()=>{t.modelValue===!0&&(_e(),i.animate())}),h(C,a=>{o("mini-state",a)});function g(a){a===void 0?ue(()=>{a=c.value===!0?0:p.value,g(S.value*a)}):(i.isContainer.value===!0&&k.value===!0&&(s.value===!0||Math.abs(a)===p.value)&&(a+=S.value*i.scrollbarWidth.value),ie.value=a)}function B(a){ae.value=a}function H(a){const u=a===!0?"remove":i.isContainer.value!==!0?"add":"";u!==""&&document.body.classList[u]("q-body--drawer-toggle")}function _e(){clearTimeout(w),e.proxy&&e.proxy.$el&&e.proxy.$el.classList.add("q-drawer--mini-animate"),F.value=!0,w=setTimeout(()=>{F.value=!1,e&&e.proxy&&e.proxy.$el&&e.proxy.$el.classList.remove("q-drawer--mini-animate")},150)}function Me(a){if(c.value!==!1)return;const u=p.value,y=z(a.distance.x,0,u);if(a.isFinal===!0){y>=Math.min(75,u)===!0?W():(i.animate(),B(0),g(S.value*u)),_.value=!1;return}g((n.lang.rtl===!0?k.value!==!0:k.value)?Math.max(u-y,0):Math.min(0,y-u)),B(z(y/u,0,1)),a.isFirst===!0&&(_.value=!0)}function re(a){if(c.value!==!0)return;const u=p.value,y=a.direction===t.side,A=(n.lang.rtl===!0?y!==!0:y)?z(a.distance.x,0,u):0;if(a.isFinal===!0){Math.abs(A)<Math.min(75,u)===!0?(i.animate(),B(1),g(0)):O(),_.value=!1;return}g(S.value*A),B(z(1-A/u,0,1)),a.isFirst===!0&&(_.value=!0)}function Q(){v(!1),H(!0)}function x(a,u){i.update(t.side,a,u)}function Oe(a,u){a.value!==u&&(a.value=u)}function Y(a,u){x("size",a===!0?t.miniWidth:u)}return i.instances[t.side]=L,Y(t.miniToOverlay,p.value),x("space",T.value),x("offset",I.value),t.showIfAbove===!0&&t.modelValue!==!0&&c.value===!0&&t["onUpdate:modelValue"]!==void 0&&o("update:modelValue",!0),Qe(()=>{o("on-layout",T.value),o("mini-state",C.value),q=t.showIfAbove===!0;const a=()=>{(c.value===!0?ee:te)(!1,!0)};if(i.totalWidth.value!==0){ue(a);return}b=h(i.totalWidth,()=>{b(),b=void 0,c.value===!1&&t.showIfAbove===!0&&s.value===!1?W(!1):a()})}),Ye(()=>{b!==void 0&&b(),clearTimeout(w),c.value===!0&&Q(),i.instances[t.side]===L&&(i.instances[t.side]=void 0,x("size",0),x("offset",0),x("space",!1))}),()=>{const a=[];s.value===!0&&(t.noSwipeOpen===!1&&a.push(Ne(E("div",{key:"open",class:`q-drawer__opener fixed-${t.side}`,"aria-hidden":"true"}),Be.value)),a.push(le("div",{ref:"backdrop",class:be.value,style:pe.value,"aria-hidden":"true",onClick:O},void 0,"backdrop",t.noSwipeBackdrop!==!0&&c.value===!0,()=>Se.value)));const u=C.value===!0&&r.mini!==void 0,y=[E("div",{...m,key:""+u,class:[qe.value,m.class]},u===!0?r.mini():fe(r.default))];return t.elevated===!0&&c.value===!0&&y.push(E("div",{class:"q-layout__shadow absolute-full overflow-hidden no-pointer-events"})),a.push(le("aside",{ref:"content",class:ke.value,style:Ce.value},y,"contentclose",t.noSwipeClose!==!0&&s.value===!0,()=>xe.value)),E("div",{class:"q-drawer-container"},a)}}});export{et as Q,tt as a,Ue as c};
