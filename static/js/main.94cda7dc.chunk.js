(this.webpackJsonppappr=this.webpackJsonppappr||[]).push([[0],{23:function(e,t,a){e.exports=a(38)},28:function(e,t,a){},32:function(e,t,a){},38:function(e,t,a){"use strict";a.r(t);var n=a(0),r=a.n(n),c=a(20),o=a.n(c),s=(a(28),a(6)),i=a.n(s),u=a(10),l=a(8),d=a(1),p=a(22),h=a(12),m=(a(32),function(e){var t,a;return e[(t=0,a=e.length-1,Math.floor(Math.random()*(a-t+1)+t))]}),f=function(e){},w="NxTWOwoh3zE_GA",g="".concat(window.location.href,"/auth"),b="https://www.reddit.com/api/v1/authorize?client_id=".concat(w,"&response_type=code&duration=permanent&state=RANDOM_STRING&scope=read&redirect_uri=").concat(g),v=a(11),O=function(){var e=Object(l.a)(i.a.mark((function e(t,a){var n,r,c,o,s;return i.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.prev=0,e.next=3,fetch("".concat("https://oauth.reddit.com/","r/").concat(t,"/hot"),{headers:{Authorization:"bearer ".concat(a),"User-Agent":"Web:".concat(w,":0.0.1 (by /u/mackattack3k)")}});case 3:return n=e.sent,e.t0=JSON,e.next=7,n.text();case 7:return e.t1=e.sent,e.next=10,e.t0.parse.call(e.t0,e.t1);case 10:return r=e.sent,c=r.data.children,o=c.map((function(e){return e.data.url})),s=m(o),e.abrupt("return",s);case 20:return e.prev=20,e.t2=e.catch(0),e.abrupt("return","nodata");case 23:case"end":return e.stop()}}),e,null,[[0,20]])})));return function(t,a){return e.apply(this,arguments)}}(),E=["earthporn","wallpapers"],x=function(){var e=function(){var e=Object(n.useState)(),t=Object(v.a)(e,2),a=t[0],r=t[1],c=window.localStorage.getItem("access"),o=window.localStorage.getItem("subs"),s=o?JSON.parse(o):E,u=m(s);return Object(n.useEffect)((function(){if(c&&!a){"Selected random subreddit ".concat(u," from ").concat(s);var e=JSON.parse(c),t=e.access_token,n=e.expiryDate,o=new Date(n)<new Date,d=function(){var e=Object(l.a)(i.a.mark((function e(){var a;return i.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=4,O(u,t);case 4:a=e.sent,r(a);case 7:case"end":return e.stop()}}),e)})));return function(){return e.apply(this,arguments)}}();o?S().then(d):d().catch(f)}}),[c,s,u,a]),{image:a,isLoading:!a,subReddit:u}}(),t=Object(n.useState)(),a=Object(v.a)(t,2),c=a[0],o=a[1];return e.isLoading?r.a.createElement("div",{className:"loading"},r.a.createElement("h1",null,"Loading from /r/",e.subReddit)):"nodata"===e.image?r.a.createElement("div",{className:"loading"},r.a.createElement("h1",null,"Error getting image")):r.a.createElement(r.a.Fragment,null,!c&&r.a.createElement("div",{className:"loading"},r.a.createElement("h1",null,"Loading from /r/",e.subReddit)),r.a.createElement("img",{className:c?"bg":"bg hidden",src:e.image,onLoad:function(){return o(!0)},alt:"Wallpaper"}))},y=function(){var e=window.localStorage.getItem("access");return e?r.a.createElement(x,null):r.a.createElement("div",{className:"home"},r.a.createElement("div",null,"Authenticate with your reddit account to fetch images. We only require read access to posts."),r.a.createElement("div",null,r.a.createElement("a",{className:"link",href:b},"Log in with your reddit account")))},S=function(){var e=Object(l.a)(i.a.mark((function e(){var t,a,n,r,c,o;return i.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:if(t=window.localStorage.getItem("access")){e.next=4;break}return e.abrupt("return");case 4:return a=JSON.parse(t),n=a.refresh_token,e.next=7,fetch("".concat("","https://www.reddit.com/api/v1/access_token"),{method:"POST",headers:{Authorization:"Basic ".concat(btoa(w+":")),"Content-Type":"application/x-www-form-urlencoded;charset=UTF-8"},body:Object(h.stringify)({grant_type:"refresh_token",refresh_token:n})});case 7:return r=e.sent,e.next=10,r.json();case 10:c=e.sent,(o=new Date).setSeconds(o.getSeconds()+c.expires_in),window.localStorage.setItem("access",JSON.stringify(Object(u.a)(Object(u.a)({},c),{},{refresh_token:n,expiryDate:o})));case 14:case"end":return e.stop()}}),e)})));return function(){return e.apply(this,arguments)}}(),k=function(){var e=Object(d.h)(),t=Object(d.g)(),a=Object(h.parse)(e.search).code;return function(){var e=Object(l.a)(i.a.mark((function e(){var n,r,c;return i.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return"Fetching bearer with code ".concat(a),e.next=3,fetch("".concat("","https://www.reddit.com/api/v1/access_token"),{method:"post",headers:{Authorization:"Basic ".concat(btoa(w+":")),"Content-Type":"application/x-www-form-urlencoded;charset=UTF-8"},body:Object(h.stringify)({grant_type:"authorization_code",code:a,redirect_uri:g})});case 3:return n=e.sent,e.next=6,n.json();case 6:r=e.sent,"Get bearer response ".concat(r),(c=new Date).setSeconds(c.getSeconds()+r.expires_in),window.localStorage.setItem("access",JSON.stringify(Object(u.a)(Object(u.a)({},r),{},{expiryDate:c}))),t.push("/");case 12:case"end":return e.stop()}}),e)})));return function(){return e.apply(this,arguments)}}()().then(f),r.a.createElement("div",{className:"home"},"Checking authentication")};var j=function(){return r.a.createElement("div",{className:"App"},r.a.createElement(p.a,{basename:"/pappr"},r.a.createElement(d.d,null,r.a.createElement(d.b,{exact:!0,path:"/auth",component:k}),r.a.createElement(d.b,{exact:!0,path:"/",component:y}),r.a.createElement(d.a,{to:"/"}))))};Boolean("localhost"===window.location.hostname||"[::1]"===window.location.hostname||window.location.hostname.match(/^127(?:\.(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)){3}$/));o.a.render(r.a.createElement(r.a.StrictMode,null,r.a.createElement(j,null)),document.getElementById("root")),"serviceWorker"in navigator&&navigator.serviceWorker.ready.then((function(e){e.unregister()})).catch((function(e){console.error(e.message)}))}},[[23,1,2]]]);
//# sourceMappingURL=main.94cda7dc.chunk.js.map