(this.webpackJsonppappr=this.webpackJsonppappr||[]).push([[0],{23:function(e,t,a){e.exports=a(38)},28:function(e,t,a){},32:function(e,t,a){},38:function(e,t,a){"use strict";a.r(t);var n=a(0),r=a.n(n),c=a(20),o=a.n(c),i=(a(28),a(6)),s=a.n(i),u=a(10),l=a(8),d=a(1),p=a(22),h=a(12),m=(a(32),function(e){var t,a;return e[(t=0,a=e.length-1,Math.floor(Math.random()*(a-t+1)+t))]}),f=function(e){},w="".concat(window.location.protocol,"//").concat(window.location.host,"/pappr/auth"),b="https://www.reddit.com/api/v1/authorize?client_id=".concat("NxTWOwoh3zE_GA","&response_type=code&duration=permanent&state=RANDOM_STRING&scope=read&redirect_uri=").concat(w),g=a(11),v=function(){var e=Object(l.a)(s.a.mark((function e(t,a){var n,r,c,o,i;return s.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:if(e.prev=0,a){e.next=4;break}return"Tried to fetch image without access token (".concat(a,")"),e.abrupt("return");case 4:return e.next=6,fetch("".concat("https://oauth.reddit.com/","r/").concat(t,"/hot"),{headers:{Authorization:"bearer ".concat(a)}});case 6:return n=e.sent,e.next=9,n.json();case 9:if(!(r=e.sent).error){e.next=13;break}return r.error,e.abrupt("return","nodata");case 13:return c=r.data.children,o=c.map((function(e){return e.data.url})),i=m(o),e.abrupt("return",i);case 22:return e.prev=22,e.t0=e.catch(0),e.abrupt("return","nodata");case 25:case"end":return e.stop()}}),e,null,[[0,22]])})));return function(t,a){return e.apply(this,arguments)}}(),x=["EarthPorn","CityPorn","SkyPorn","WeatherPorn","BotanicalPorn","LakePorn","VillagePorn","BeachPorn","WaterPorn","SpacePorn","multiwall","wallpapers","wallpaper"],E=function(){var e=function(){var e=Object(n.useState)(),t=Object(g.a)(e,2),a=t[0],r=t[1],c=window.localStorage.getItem("access"),o=window.localStorage.getItem("subs"),i=o?JSON.parse(o):x,u=m(i);return Object(n.useEffect)((function(){if(c&&!a){"Selected random subreddit ".concat(u," from ").concat(i);var e=JSON.parse(c),t=e.access_token,n=e.expiryDate,o=new Date(n)<new Date,d=function(){var e=Object(l.a)(s.a.mark((function e(){var a;return s.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=4,v(u,t);case 4:a=e.sent,r(a);case 7:case"end":return e.stop()}}),e)})));return function(){return e.apply(this,arguments)}}();o?k().then(d):d().catch(f)}}),[c,i,u,a]),{image:a,isLoading:!a,subReddit:u}}(),t=Object(n.useState)(),a=Object(g.a)(t,2),c=a[0],o=a[1];if(e.isLoading)return r.a.createElement("div",{className:"loading"},r.a.createElement("h1",null,"Loading from /r/",e.subReddit));if("nodata"===e.image){return r.a.createElement("div",{className:"loading"},r.a.createElement("h1",null,"Error getting image"),r.a.createElement("button",{className:"button",onClick:function(){localStorage.clear(),window.location.reload()}},"Clear saved data"))}return r.a.createElement(r.a.Fragment,null,!c&&r.a.createElement("div",{className:"loading"},r.a.createElement("h1",null,"Loading from /r/",e.subReddit)),r.a.createElement("img",{className:c?"bg":"bg hidden",src:e.image,onLoad:function(){return o(!0)},alt:"Wallpaper"}))},O=function(){var e=window.localStorage.getItem("access");return e?r.a.createElement(E,null):r.a.createElement("div",{className:"home"},r.a.createElement("div",null,"Authenticate with your reddit account to fetch images. We only require read access to posts."),r.a.createElement("a",{className:"button",href:b},"Log in with your reddit account"))},k=function(){var e=Object(l.a)(s.a.mark((function e(){var t,a,n,r,c,o;return s.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:if(t=window.localStorage.getItem("access")){e.next=6;break}return localStorage.clear(),window.location.reload(),e.abrupt("return");case 6:if(a=JSON.parse(t),n=a.refresh_token){e.next=12;break}return localStorage.clear(),window.location.reload(),e.abrupt("return");case 12:return e.next=14,fetch("".concat("","https://www.reddit.com/api/v1/access_token"),{method:"POST",headers:{Authorization:"Basic ".concat(btoa("NxTWOwoh3zE_GA:")),"Content-Type":"application/x-www-form-urlencoded;charset=UTF-8"},body:Object(h.stringify)({grant_type:"refresh_token",refresh_token:n})});case 14:return r=e.sent,e.next=17,r.json();case 17:c=e.sent,(o=new Date).setSeconds(o.getSeconds()+c.expires_in),window.localStorage.setItem("access",JSON.stringify(Object(u.a)(Object(u.a)({},c),{},{refresh_token:n,expiryDate:o})));case 21:case"end":return e.stop()}}),e)})));return function(){return e.apply(this,arguments)}}(),S=function(){var e=Object(d.h)(),t=Object(d.g)(),a=Object(h.parse)(e.search).code;return function(){var e=Object(l.a)(s.a.mark((function e(){var n,r,c;return s.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return"Fetching bearer with code ".concat(a),e.next=3,fetch("".concat("","https://www.reddit.com/api/v1/access_token"),{method:"post",headers:{Authorization:"Basic ".concat(btoa("NxTWOwoh3zE_GA:")),"Content-Type":"application/x-www-form-urlencoded;charset=UTF-8"},body:Object(h.stringify)({grant_type:"authorization_code",code:a,redirect_uri:w})});case 3:return n=e.sent,e.next=6,n.json();case 6:if(r=e.sent,"Get bearer response ".concat(r),!r.error){e.next=11;break}return"Couldn't get initial bearer token ".concat(r),e.abrupt("return");case 11:(c=new Date).setSeconds(c.getSeconds()+r.expires_in),window.localStorage.setItem("access",JSON.stringify(Object(u.a)(Object(u.a)({},r),{},{expiryDate:c}))),t.push("/");case 15:case"end":return e.stop()}}),e)})));return function(){return e.apply(this,arguments)}}()().then(f),r.a.createElement("div",{className:"home"},"Checking authentication")};var y=function(){return r.a.createElement("div",{className:"App"},r.a.createElement(p.a,{basename:"/pappr"},r.a.createElement(d.d,null,r.a.createElement(d.b,{exact:!0,path:"/auth",component:S}),r.a.createElement(d.b,{exact:!0,path:"/",component:O}),r.a.createElement(d.a,{to:"/"}))))};Boolean("localhost"===window.location.hostname||"[::1]"===window.location.hostname||window.location.hostname.match(/^127(?:\.(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)){3}$/));o.a.render(r.a.createElement(r.a.StrictMode,null,r.a.createElement(y,null)),document.getElementById("root")),"serviceWorker"in navigator&&navigator.serviceWorker.ready.then((function(e){e.unregister()})).catch((function(e){console.error(e.message)}))}},[[23,1,2]]]);
//# sourceMappingURL=main.bd4864fb.chunk.js.map