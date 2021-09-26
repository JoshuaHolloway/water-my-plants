(this["webpackJsonpwater-my-plants"]=this["webpackJsonpwater-my-plants"]||[]).push([[0],{15:function(e,t,n){e.exports={"main-header":"MainNavigation_main-header__1cu1i",nav:"MainNavigation_nav__2KID8",logo:"MainNavigation_logo__E7VmX"}},22:function(e,t,n){e.exports={"details-container":"PlantItem_details-container__2btML"}},23:function(e,t,n){e.exports={"nav-links":"NavLinks_nav-links__3w1gZ",active:"NavLinks_active__lFgwa"}},30:function(e,t,n){},33:function(e,t,n){},34:function(e,t,n){},37:function(e,t,n){},41:function(e,t,n){"use strict";n.r(t);var c=n(1),r=n.n(c),a=n(12),s=n.n(a),o=(n(30),n(2)),i=n(4),l=n(7),u=n(14),j=n(0),b=function(){return Object(j.jsx)(j.Fragment,{children:Object(j.jsx)("h1",{children:"Water My Plants!"})})},d=n(3),h=n.n(d),p=n(8),O=function(){var e=Object(c.useState)(!1),t=Object(o.a)(e,2),n=t[0],r=t[1],a=Object(c.useState)(void 0),s=Object(o.a)(a,2),i=s[0],l=s[1],u=Object(c.useRef)([]),j=Object(c.useCallback)(function(){var e=Object(p.a)(h.a.mark((function e(t){var n,c,a,s,o,i,j=arguments;return h.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return n=j.length>1&&void 0!==j[1]?j[1]:"GET",c=j.length>2&&void 0!==j[2]?j[2]:null,a=j.length>3&&void 0!==j[3]?j[3]:{},r(!0),s=new AbortController,u.current.push(s),e.prev=6,e.next=9,fetch(t,{method:n,body:c,headers:a,signal:s.signal});case 9:return o=e.sent,e.next=12,o.json();case 12:if(i=e.sent,console.log("responseData: ",i),u.current=u.current.filter((function(e){return e!==s})),o.ok){e.next=17;break}throw new Error(i.message);case 17:return r(!1),e.abrupt("return",i);case 21:throw e.prev=21,e.t0=e.catch(6),l(e.t0.message),r(!1),e.t0;case 26:case"end":return e.stop()}}),e,null,[[6,21]])})));return function(t){return e.apply(this,arguments)}}(),[]);return Object(c.useEffect)((function(){return function(){u.current.forEach((function(e){e.abort()}))}}),[]),{isLoading:n,error:i,sendRequest:j,clearError:function(){l(null)}}},f=Object(c.createContext)({isLoggedIn:!1,userId:null,token:null,login:function(){},logout:function(){}}),x=n(24),g=n(43),m=(n(33),function(e){return s.a.createPortal(Object(j.jsx)("div",{className:"backdrop",onClick:e.onClick}),document.getElementById("backdrop-hook"))}),v=(n(34),function(e){var t=Object(j.jsxs)("div",{className:"modal ".concat(e.className),style:e.style,children:[Object(j.jsx)("header",{className:"modal__header ".concat(e.headerClass),children:Object(j.jsx)("h2",{children:e.header})}),Object(j.jsxs)("form",{onSubmit:e.onSubmit?e.onSubmit:function(e){return e.preventDefault()},children:[Object(j.jsx)("div",{className:"modal__content ".concat(e.contentClass),children:e.children}),Object(j.jsx)("footer",{className:"modal__footer ".concat(e.footerClass),children:e.footer})]})]});return s.a.createPortal(t,document.getElementById("modal-hook"))}),k=function(e){return Object(j.jsxs)(r.a.Fragment,{children:[e.show&&Object(j.jsx)(m,{onClick:e.onCancel}),Object(j.jsx)(g.a,{in:e.show,mountOnEnter:!0,unmountOnExit:!0,timeout:200,classNames:"modal",children:Object(j.jsx)(v,Object(x.a)({},e))})]})},y=(n(37),function(e){return e.href?Object(j.jsx)("a",{className:"button button--".concat(e.size||"default"," ").concat(e.inverse&&"button--inverse"," ").concat(e.danger&&"button--danger"),href:e.href,children:e.children}):e.to?Object(j.jsx)(l.b,{to:e.to,exact:e.exact,className:"button button--".concat(e.size||"default"," ").concat(e.inverse&&"button--inverse"," ").concat(e.danger&&"button--danger"),children:e.children}):Object(j.jsx)("button",{className:"button button--".concat(e.size||"default"," ").concat(e.inverse&&"button--inverse"," ").concat(e.danger&&"button--danger"),type:e.type,onClick:e.onClick,disabled:e.disabled,children:e.children})}),S=n(22),C=n.n(S),w=function(e){var t=Object(c.useState)(!1),n=Object(o.a)(t,2),r=n[0],a=n[1],s=function(){return a(!1)},i=Object(c.useContext)(f),u=O().sendRequest,b=function(){var t=Object(p.a)(h.a.mark((function t(){return h.a.wrap((function(t){for(;;)switch(t.prev=t.next){case 0:return t.prev=0,t.next=3,u("".concat("http://localhost:5000/api","/plants/").concat(e.id),"DELETE",null,{Authorization:"Bearer ".concat(i.token)});case 3:e.onDelete(e.id),t.next=8;break;case 6:t.prev=6,t.t0=t.catch(0);case 8:case"end":return t.stop()}}),t,null,[[0,6]])})));return function(){return t.apply(this,arguments)}}();return Object(j.jsxs)(j.Fragment,{children:[Object(j.jsx)(k,{show:r,onCancel:s,header:e.address,contentClass:"place-item__modal-content",footerClass:"place-item__modal-actions",footer:Object(j.jsx)(y,{onClick:s,children:"CLOSE"}),children:Object(j.jsxs)("div",{className:C.a["details-container"],children:[Object(j.jsxs)("p",{children:["Species: ",e.species]}),Object(j.jsxs)("p",{children:["Nickname: ",e.nickname]}),Object(j.jsxs)("p",{children:["H2O-Frequency: ",e.h2oFrequency]})]})}),Object(j.jsx)("li",{children:Object(j.jsxs)("div",{children:[Object(j.jsx)("h2",{children:e.nickname}),Object(j.jsx)("button",{onClick:b,children:"DELETE"}),Object(j.jsx)("button",{children:Object(j.jsx)(l.c,{to:"/plants/".concat(e.id),children:"UPDATE"})}),Object(j.jsx)(y,{inverse:!0,onClick:function(){return a(!0)},children:"VIEW PLANT DETAILS"})]})})]})},I=function(e){return 0===e.items.length?Object(j.jsx)("h2",{children:"No plants found. Maybe create one?"}):Object(j.jsx)("ul",{children:e.items.map((function(t){return Object(j.jsx)(w,{id:t.id,image:t.image,nickname:t.nickname,species:t.species,h2oFrequency:t.h2ofrequency,onDelete:e.onDeletePlant},t.id)}))})},N=function(){var e=Object(c.useContext)(f),t=Object(c.useState)(),n=Object(o.a)(t,2),r=n[0],a=n[1],s=O(),i=s.isLoading,l=s.error,u=s.sendRequest;Object(c.useEffect)((function(){if(e.userId){var t=function(){var t=Object(p.a)(h.a.mark((function t(){var n;return h.a.wrap((function(t){for(;;)switch(t.prev=t.next){case 0:return t.prev=0,t.next=3,u("".concat("http://localhost:5000/api","/plants/user/").concat(e.userId),"GET",null,{Authorization:"Bearer ".concat(e.token)});case 3:n=t.sent,a(n.plants),t.next=10;break;case 7:t.prev=7,t.t0=t.catch(0),console.log("(UsersPlants.js) err: ",t.t0);case 10:case"end":return t.stop()}}),t,null,[[0,7]])})));return function(){return t.apply(this,arguments)}}();t()}}),[e.userId,e.token,u]);return Object(j.jsxs)(j.Fragment,{children:[i&&Object(j.jsx)("h5",{children:"Loading..."}),l&&Object(j.jsx)("h5",{children:"ERROR!"}),!i&&r&&Object(j.jsx)(I,{items:r,onDeletePlant:function(e){a((function(t){return t.filter((function(t){return t.id!==e}))}))}})]})},E=function(){var e=Object(c.useContext)(f),t=O().sendRequest,n=Object(c.useState)("josh"),r=Object(o.a)(n,2),a=r[0],s=r[1],i=Object(c.useState)("josh@josh.com"),l=Object(o.a)(i,2),u=l[0],b=l[1],d=Object(c.useState)("password"),x=Object(o.a)(d,2),g=x[0],m=x[1];Object(c.useEffect)((function(){return console.log("name: ",a)}),[a]),Object(c.useEffect)((function(){return console.log("email: ",u)}),[u]),Object(c.useEffect)((function(){return console.log("password: ",g)}),[g]);var v=Object(c.useState)(!0),k=Object(o.a)(v,2),y=k[0],S=k[1],C=function(){var n=Object(p.a)(h.a.mark((function n(c){var r,s;return h.a.wrap((function(n){for(;;)switch(n.prev=n.next){case 0:if(c.preventDefault(),console.log({name:a,email:u,password:g}),!y){n.next=15;break}return n.prev=3,n.next=6,t("".concat("http://localhost:5000/api","/users/login"),"POST",JSON.stringify({email:u,password:g}),{"Content-Type":"application/json"});case 6:r=n.sent,e.login(r.userId,r.token),n.next=13;break;case 10:n.prev=10,n.t0=n.catch(3),console.log("failed login:  err: ",n.t0);case 13:n.next=25;break;case 15:return n.prev=15,n.next=18,t("".concat("http://localhost:5000/api","/users/signup"),"POST",JSON.stringify({name:a,email:u,password:g}),{"Content-Type":"application/json"});case 18:s=n.sent,e.login(s.userId),n.next=25;break;case 22:n.prev=22,n.t1=n.catch(15),console.log("failed login:  err: ",n.t1);case 25:case"end":return n.stop()}}),n,null,[[3,10],[15,22]])})));return function(e){return n.apply(this,arguments)}}();return Object(c.useEffect)((function(){}),[]),Object(j.jsxs)(j.Fragment,{children:[Object(j.jsxs)("form",{onSubmit:C,children:[Object(j.jsx)("h2",{children:"Login Required"}),Object(j.jsx)("hr",{}),!y&&Object(j.jsxs)("label",{children:["name:",Object(j.jsx)("input",{type:"text",id:"name",value:a,onChange:function(e){return s(e.target.value)}})]}),Object(j.jsx)("br",{}),Object(j.jsxs)("label",{htmlFor:"email",children:["email:"," ",Object(j.jsx)("input",{type:"email",id:"email",value:u,onChange:function(e){return b(e.target.value)}})]}),Object(j.jsx)("br",{}),Object(j.jsxs)("label",{htmlFor:"password",children:["password:"," ",Object(j.jsx)("input",{type:"password",id:"password",value:g,onChange:function(e){return m(e.target.value)}})]}),Object(j.jsx)("br",{}),Object(j.jsx)("button",{type:"submit",children:y?"LOGIN":"SIGNUP"})]}),Object(j.jsx)("button",{type:"submit",onClick:function(){S((function(e){return!e}))},children:y?"SIGNUP":"LOGIN"}),Object(j.jsx)("button",{onClick:function(){return function(){var e="BJthRQ5myDgc7OSXzPCMftGw-n16F7zQBEN7EUD6XxcfTTvrLGWSIG7y_JxiWtVlCFua0S8MTB5rPziBqNx1qIo";function t(){return(t=Object(p.a)(h.a.mark((function t(){var c,r;return h.a.wrap((function(t){for(;;)switch(t.prev=t.next){case 0:return console.log("Registering service worker..."),t.next=3,navigator.serviceWorker.register("/worker.js",{scope:"/"});case 3:return c=t.sent,console.log("Service Worker Registered..."),console.log("Registering Push..."),t.next=8,c.pushManager.subscribe({userVisibleOnly:!0,applicationServerKey:n(e)});case 8:return r=t.sent,console.log("Push Registered..."),console.log("Sending Push..."),t.next=13,fetch("".concat("http://localhost:5000/api","/plants/subscribe-to-push"),{method:"POST",body:JSON.stringify(r),headers:{"content-type":"application/json"}});case 13:console.log("Push Sent...");case 14:case"end":return t.stop()}}),t)})))).apply(this,arguments)}function n(e){for(var t=(e+"=".repeat((4-e.length%4)%4)).replace(/\-/g,"+").replace(/_/g,"/"),n=window.atob(t),c=new Uint8Array(n.length),r=0;r<n.length;++r)c[r]=n.charCodeAt(r);return c}"serviceWorker"in navigator&&function(){return t.apply(this,arguments)}().catch((function(e){return console.error("serviceWorker error: ",e)}))}()},children:"Send PUSH Notification"})]})},P=n(23),_=n.n(P),F=function(e){var t=Object(c.useContext)(f);return console.log("NavLinks.js -- auth.userId: ",t.userId),Object(j.jsxs)("ul",{className:_.a["nav-links"],children:[t.isLoggedIn&&Object(j.jsx)("li",{children:Object(j.jsx)(l.c,{to:"/".concat(t.userId,"/plants"),children:"MY PLANTS"})}),t.isLoggedIn&&Object(j.jsx)("li",{children:Object(j.jsx)(l.c,{to:"/plants/new",children:"ADD PLANT"})}),t.isLoggedIn&&Object(j.jsx)("li",{children:Object(j.jsx)("button",{onClick:function(){t.logout()},children:"LOGOUT"})}),!t.isLoggedIn&&Object(j.jsx)("li",{children:Object(j.jsx)(l.c,{to:"/auth",children:"Log In"})})]})},L=n(15),D=n.n(L),T=function(e){return Object(j.jsxs)("header",{className:D.a["main-header"],children:[Object(j.jsx)("nav",{className:D.a.nav,children:Object(j.jsx)(F,{})}),Object(j.jsx)("h1",{className:D.a.logo,children:Object(j.jsx)(l.b,{to:"/",children:"Water Plants"})})]})},q=function(){var e=Object(c.useContext)(f),t=Object(i.g)(),n=O().sendRequest,r=Object(c.useState)(""),a=Object(o.a)(r,2),s=a[0],l=a[1],u=Object(c.useState)(""),b=Object(o.a)(u,2),d=b[0],x=b[1],g=Object(c.useState)(""),m=Object(o.a)(g,2),v=m[0],k=m[1],y=Object(c.useState)(""),S=Object(o.a)(y,2),C=S[0],w=S[1];Object(c.useEffect)((function(){s&&console.log("nickname: ",s)}),[s]),Object(c.useEffect)((function(){d&&console.log("species: ",d)}),[d]),Object(c.useEffect)((function(){v&&console.log("image: ",v)}),[v]),Object(c.useEffect)((function(){C&&console.log("h2oFreq: ",C)}),[C]);var I=function(){var c=Object(p.a)(h.a.mark((function c(r){var a,o;return h.a.wrap((function(c){for(;;)switch(c.prev=c.next){case 0:return r.preventDefault(),a={nickname:s,species:d,image:v,h2oFrequency:C},console.log("plant form data: ",a),c.prev=3,c.next=6,n("".concat("http://localhost:5000/api","/plants"),"POST",JSON.stringify(a),{"Content-Type":"application/json",Authorization:"Bearer ".concat(e.token)});case 6:o=c.sent,console.log("responseData - NewPlant.js - plantSubmitHandler() : ",o),t.push("/"),c.next=14;break;case 11:c.prev=11,c.t0=c.catch(3),console.log("err: ",c.t0);case 14:case"end":return c.stop()}}),c,null,[[3,11]])})));return function(e){return c.apply(this,arguments)}}();return Object(j.jsxs)("form",{onSubmit:I,children:[Object(j.jsxs)("label",{htmlFor:"nickname",children:["Nickname:",Object(j.jsx)("input",{type:"text",id:"nickname",value:s,onChange:function(e){return l(e.target.value)}})]}),Object(j.jsx)("br",{}),Object(j.jsxs)("label",{htmlFor:"species",children:["Species:",Object(j.jsx)("input",{type:"text",id:"species",value:d,onChange:function(e){return x(e.target.value)}})]}),Object(j.jsx)("br",{}),Object(j.jsxs)("label",{htmlFor:"image",children:["Image:",Object(j.jsx)("input",{type:"text",id:"image",value:v,onChange:function(e){return k(e.target.value)}})]}),Object(j.jsx)("br",{}),Object(j.jsxs)("label",{htmlFor:"h2oFreq",children:["h2oFrequency:",Object(j.jsx)("input",{type:"text",id:"h2oFreq",value:C,onChange:function(e){return w(e.target.value)}})]}),Object(j.jsx)("br",{}),Object(j.jsx)("button",{type:"submit",children:"Submit"})]})},A=function(){var e=Object(i.h)().plantId;console.log("plantId: ",e);var t=Object(c.useContext)(f),n=Object(i.g)(),r=O().sendRequest,a=Object(c.useState)(""),s=Object(o.a)(a,2),l=s[0],u=s[1],b=Object(c.useState)(""),d=Object(o.a)(b,2),x=d[0],g=d[1];Object(c.useEffect)((function(){return console.log("nickname: ",l)}),[l]),Object(c.useEffect)((function(){return console.log("species: ",x)}),[x]);Object(c.useEffect)((function(){console.clear();var n=function(){var n=Object(p.a)(h.a.mark((function n(){var c;return h.a.wrap((function(n){for(;;)switch(n.prev=n.next){case 0:return console.log("async fetchData()"),n.prev=1,n.next=4,r("".concat("http://localhost:5000/api","/plants/").concat(e),"GET",null,{Authorization:"Bearer ".concat(t.token)});case 4:c=n.sent,u(c.plant.nickname),g(c.plant.species),n.next=12;break;case 9:n.prev=9,n.t0=n.catch(1),console.log("error sending request to api/plants/:plantId");case 12:case"end":return n.stop()}}),n,null,[[1,9]])})));return function(){return n.apply(this,arguments)}}();n()}),[t.token,e,r]);var m=function(){var c=Object(p.a)(h.a.mark((function c(a){var s,o;return h.a.wrap((function(c){for(;;)switch(c.prev=c.next){case 0:return a.preventDefault(),s={nickname:l,species:x},console.log("plant form data: ",s),c.prev=3,c.next=6,r("".concat("http://localhost:5000/api","/plants/").concat(e),"PATCH",JSON.stringify(s),{"Content-Type":"application/json",Authorization:"Bearer ".concat(t.token)});case 6:o=c.sent,console.log("responseData - UpdatePlant.js - plantSubmitHandler() : ",o),n.push("/".concat(t.userId,"/plants")),c.next=14;break;case 11:c.prev=11,c.t0=c.catch(3),console.log("err: ",c.t0);case 14:case"end":return c.stop()}}),c,null,[[3,11]])})));return function(e){return c.apply(this,arguments)}}();return Object(j.jsxs)("form",{onSubmit:m,children:[Object(j.jsx)("h5",{children:"Update Plant"}),Object(j.jsxs)("label",{htmlFor:"nickname",children:["Nickname:",Object(j.jsx)("input",{type:"text",id:"nickname",value:l,onChange:function(e){return u(e.target.value)}})]}),Object(j.jsx)("br",{}),Object(j.jsxs)("label",{htmlFor:"species",children:["Species:",Object(j.jsx)("input",{type:"text",id:"species",value:x,onChange:function(e){return g(e.target.value)}})]}),Object(j.jsx)("br",{}),Object(j.jsx)("button",{type:"submit",children:"Submit"})]})},R=function(){var e,t=Object(c.useState)(!1),n=Object(o.a)(t,2),r=n[0],a=n[1],s=Object(c.useState)(!1),d=Object(o.a)(s,2),h=d[0],p=d[1],O=Object(c.useCallback)((function(e,t){console.log("App.js -- login()"),a(t),p(e),localStorage.setItem("userData",JSON.stringify({userId:e,token:t}))}),[]),x=Object(c.useCallback)((function(){a(null),p(null),localStorage.removeItem("userData")}),[]);Object(c.useEffect)((function(){var e=JSON.parse(localStorage.getItem("userData"));e&&e.token&&O(e.userId,e.token)}),[O]),e=r?Object(j.jsxs)(i.d,{children:[Object(j.jsx)(i.b,{path:"/",exact:!0,children:Object(j.jsx)(N,{})}),Object(j.jsx)(i.b,{path:"/:userId/plants",exact:!0,children:Object(j.jsx)(N,{})}),Object(j.jsx)(i.b,{path:"/plants/new",exact:!0,children:Object(j.jsx)(q,{})}),Object(j.jsx)(i.b,{path:"/plants/:plantId",children:Object(j.jsx)(A,{})}),Object(j.jsx)(i.a,{to:"/"})]}):Object(j.jsxs)(i.d,{children:[Object(j.jsx)(i.b,{path:"/",exact:!0,children:Object(j.jsx)(b,{})}),Object(j.jsx)(i.b,{path:"/auth",children:Object(j.jsx)(E,{})}),Object(j.jsx)(i.a,{to:"/auth"})]});var g=Object(c.useState)(!1),m=Object(o.a)(g,2),v=(m[0],m[1],Object(c.useState)(!1)),k=Object(o.a)(v,2),y=k[0],S=k[1];return Object(j.jsx)(f.Provider,{value:{isLoggedIn:!!r,token:r,userId:h,login:O,logout:x},children:Object(j.jsxs)(l.a,{children:[Object(j.jsx)(T,{}),Object(j.jsx)("button",{onClick:function(){return S((function(e){return!e}))},children:"toggle"}),Object(j.jsx)(u.a,{in:y,timeout:100,children:function(e){return Object(j.jsxs)(j.Fragment,{children:[Object(j.jsx)("p",{children:e}),Object(j.jsx)("p",{children:"exited"===e?0:1}),Object(j.jsx)("div",{style:{backgroundColor:"red",width:100,height:100,transition:"opacity 1s ease-out",opacity:"exited"===e?0:1}})]})}}),Object(j.jsx)("main",{children:e})]})})},B=function(e){e&&e instanceof Function&&n.e(3).then(n.bind(null,44)).then((function(t){var n=t.getCLS,c=t.getFID,r=t.getFCP,a=t.getLCP,s=t.getTTFB;n(e),c(e),r(e),a(e),s(e)}))};s.a.render(Object(j.jsx)(r.a.StrictMode,{children:Object(j.jsx)(R,{})}),document.getElementById("root")),B()}},[[41,1,2]]]);
//# sourceMappingURL=main.9f0b6644.chunk.js.map