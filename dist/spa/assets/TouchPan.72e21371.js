import{h as S,B as D,ah as X,ai as m,ac as Y,aj as F,ak as h,al as y,am as w,an as C,ao as b,ap as g,Z as P}from"./index.741a3cbc.js";import{g as _,s as M}from"./touch.3df10340.js";import{d as A}from"./format.b5946461.js";const B=S("div",{class:"q-space"});var x=D({name:"QSpace",setup(){return()=>B}});function E(a,r,i){const l=b(a);let e,t=l.left-r.event.x,n=l.top-r.event.y,u=Math.abs(t),s=Math.abs(n);const o=r.direction;o.horizontal===!0&&o.vertical!==!0?e=t<0?"left":"right":o.horizontal!==!0&&o.vertical===!0?e=n<0?"up":"down":o.up===!0&&n<0?(e="up",u>s&&(o.left===!0&&t<0?e="left":o.right===!0&&t>0&&(e="right"))):o.down===!0&&n>0?(e="down",u>s&&(o.left===!0&&t<0?e="left":o.right===!0&&t>0&&(e="right"))):o.left===!0&&t<0?(e="left",u<s&&(o.up===!0&&n<0?e="up":o.down===!0&&n>0&&(e="down"))):o.right===!0&&t>0&&(e="right",u<s&&(o.up===!0&&n<0?e="up":o.down===!0&&n>0&&(e="down")));let v=!1;if(e===void 0&&i===!1){if(r.event.isFirst===!0||r.event.lastDir===void 0)return{};e=r.event.lastDir,v=!0,e==="left"||e==="right"?(l.left-=t,u=0,t=0):(l.top-=n,s=0,n=0)}return{synthetic:v,payload:{evt:a,touch:r.event.mouse!==!0,mouse:r.event.mouse===!0,position:l,direction:e,isFirst:r.event.isFirst,isFinal:i===!0,duration:Date.now()-r.event.time,distance:{x:u,y:s},offset:{x:t,y:n},delta:{x:l.left-r.event.lastX,y:l.top-r.event.lastY}}}}let k=0;var z=X({name:"touch-pan",beforeMount(a,{value:r,modifiers:i}){if(i.mouse!==!0&&m.has.touch!==!0)return;function l(t,n){i.mouse===!0&&n===!0?P(t):(i.stop===!0&&C(t),i.prevent===!0&&w(t))}const e={uid:"qvtp_"+k++,handler:r,modifiers:i,direction:_(i),noop:Y,mouseStart(t){M(t,e)&&F(t)&&(h(e,"temp",[[document,"mousemove","move","notPassiveCapture"],[document,"mouseup","end","passiveCapture"]]),e.start(t,!0))},touchStart(t){if(M(t,e)){const n=t.target;h(e,"temp",[[n,"touchmove","move","notPassiveCapture"],[n,"touchcancel","end","passiveCapture"],[n,"touchend","end","passiveCapture"]]),e.start(t)}},start(t,n){if(m.is.firefox===!0&&y(a,!0),e.lastEvt=t,n===!0||i.stop===!0){if(e.direction.all!==!0&&(n!==!0||e.modifiers.mouseAllDir!==!0&&e.modifiers.mousealldir!==!0)){const o=t.type.indexOf("mouse")>-1?new MouseEvent(t.type,t):new TouchEvent(t.type,t);t.defaultPrevented===!0&&w(o),t.cancelBubble===!0&&C(o),Object.assign(o,{qKeyEvent:t.qKeyEvent,qClickOutside:t.qClickOutside,qAnchorHandled:t.qAnchorHandled,qClonedBy:t.qClonedBy===void 0?[e.uid]:t.qClonedBy.concat(e.uid)}),e.initialEvent={target:t.target,event:o}}C(t)}const{left:u,top:s}=b(t);e.event={x:u,y:s,time:Date.now(),mouse:n===!0,detected:!1,isFirst:!0,isFinal:!1,lastX:u,lastY:s}},move(t){if(e.event===void 0)return;const n=b(t),u=n.left-e.event.x,s=n.top-e.event.y;if(u===0&&s===0)return;e.lastEvt=t;const o=e.event.mouse===!0,v=()=>{l(t,o);let d;i.preserveCursor!==!0&&i.preservecursor!==!0&&(d=document.documentElement.style.cursor||"",document.documentElement.style.cursor="grabbing"),o===!0&&document.body.classList.add("no-pointer-events--children"),document.body.classList.add("non-selectable"),A(),e.styleCleanup=f=>{if(e.styleCleanup=void 0,d!==void 0&&(document.documentElement.style.cursor=d),document.body.classList.remove("non-selectable"),o===!0){const q=()=>{document.body.classList.remove("no-pointer-events--children")};f!==void 0?setTimeout(()=>{q(),f()},50):q()}else f!==void 0&&f()}};if(e.event.detected===!0){e.event.isFirst!==!0&&l(t,e.event.mouse);const{payload:d,synthetic:f}=E(t,e,!1);d!==void 0&&(e.handler(d)===!1?e.end(t):(e.styleCleanup===void 0&&e.event.isFirst===!0&&v(),e.event.lastX=d.position.left,e.event.lastY=d.position.top,e.event.lastDir=f===!0?void 0:d.direction,e.event.isFirst=!1));return}if(e.direction.all===!0||o===!0&&(e.modifiers.mouseAllDir===!0||e.modifiers.mousealldir===!0)){v(),e.event.detected=!0,e.move(t);return}const c=Math.abs(u),p=Math.abs(s);c!==p&&(e.direction.horizontal===!0&&c>p||e.direction.vertical===!0&&c<p||e.direction.up===!0&&c<p&&s<0||e.direction.down===!0&&c<p&&s>0||e.direction.left===!0&&c>p&&u<0||e.direction.right===!0&&c>p&&u>0?(e.event.detected=!0,e.move(t)):e.end(t,!0))},end(t,n){if(e.event!==void 0){if(g(e,"temp"),m.is.firefox===!0&&y(a,!1),n===!0)e.styleCleanup!==void 0&&e.styleCleanup(),e.event.detected!==!0&&e.initialEvent!==void 0&&e.initialEvent.target.dispatchEvent(e.initialEvent.event);else if(e.event.detected===!0){e.event.isFirst===!0&&e.handler(E(t===void 0?e.lastEvt:t,e).payload);const{payload:u}=E(t===void 0?e.lastEvt:t,e,!0),s=()=>{e.handler(u)};e.styleCleanup!==void 0?e.styleCleanup(s):s()}e.event=void 0,e.initialEvent=void 0,e.lastEvt=void 0}}};if(a.__qtouchpan=e,i.mouse===!0){const t=i.mouseCapture===!0||i.mousecapture===!0?"Capture":"";h(e,"main",[[a,"mousedown","mouseStart",`passive${t}`]])}m.has.touch===!0&&h(e,"main",[[a,"touchstart","touchStart",`passive${i.capture===!0?"Capture":""}`],[a,"touchmove","noop","notPassiveCapture"]])},updated(a,r){const i=a.__qtouchpan;i!==void 0&&(r.oldValue!==r.value&&(typeof value!="function"&&i.end(),i.handler=r.value),i.direction=_(r.modifiers))},beforeUnmount(a){const r=a.__qtouchpan;r!==void 0&&(r.event!==void 0&&r.end(),g(r,"main"),g(r,"temp"),m.is.firefox===!0&&y(a,!1),r.styleCleanup!==void 0&&r.styleCleanup(),delete a.__qtouchpan)}});export{x as Q,z as T};