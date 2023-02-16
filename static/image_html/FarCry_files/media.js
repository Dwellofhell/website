(()=>{"use strict";var n="module_init",t=function(n){this.de=n,this.gn=n.ls()},r=function(n){this.de=n},i=function(){function n(n){this.de=n}return n.prototype.Ho=function(n,t){return this.initEvent(n,t)},n.prototype.send=function(n,t){this.de.send(n,t)},n}(),e=function(){},u=function(n){return"string"==typeof n},o=function(n){var t=typeof n;return"object"===t&&null!==n||"function"===t},c=function(n){return Array.isArray(n)};var a,f,s=function(n){try{return JSON.parse(n)}catch(n){}return null},l=(function(){function n(n,t){this.Bn=n,this.zn=t}n.prototype.toString=function(){return"".concat(this.Bn,"x").concat(this.zn)},Object.defineProperty(n.prototype,"width",{get:function(){return this.Bn},T:!1,qn:!0}),Object.defineProperty(n.prototype,"height",{get:function(){return this.zn},T:!1,qn:!0})}(),function(){function n(n,t){this.Jn=n,this.Hn=t}return Object.defineProperty(n.prototype,"x",{get:function(){return this.Jn},T:!1,qn:!0}),Object.defineProperty(n.prototype,"y",{get:function(){return this.Hn},T:!1,qn:!0}),n}());!function(n){n[n.SCRIPT=0]="SCRIPT",n[n.STYLE=1]="STYLE",n[n.HEAD=2]="HEAD",n[n.IFRAME=3]="IFRAME",n[n.OBJECT=4]="OBJECT"}(a||(a={})),function(n){n.IMG=" ",n.BR="\n"}(f||(f={}));window.navigator.userAgent;var h,v=function(n,t){return"[".concat(n).concat(t?"=".concat(t):"","]")},d=function(n,t){try{return t&&t instanceof Element&&(t.querySelectorAll,1)?t.querySelectorAll(n):document.querySelectorAll(n)}catch(n){return[]}},b=function(n,t){if(!n||n.nodeName in a);else if(n.nodeType===Node.TEXT_NODE)t.push(String(n.nodeValue).replace(/(\r\n|\r|\n)/g,""));else if(n.nodeName in f)t.push(f[n.nodeName]);else for(var r=n.firstChild;r;)b(r,t),r=r.nextSibling},m=function(n){var t,r=[];return b(n,r)," "!==(t=(t=r.join("")).replace(/ +/g," "))&&(t=t.replace(/^\s*/,"")),t},p=function(n,t){return n&&n.getAttribute(t)||""},w=function(n){var t=0,r=n?function(n){var t=n.getBoundingClientRect(),r=document.body,i=document.documentElement,e=window.scrollY||i.scrollTop||r.scrollTop,u=window.scrollX||i.scrollLeft||r.scrollLeft,o=i.clientTop||r.clientTop||0,c=i.clientLeft||r.clientLeft||0;return new l(t.left+u-c,t.top+e-o)}(n):null;return r&&r.y&&(t=parseInt("".concat(r.y),10)),t},y=function(n){var t=m(n);return t?t.length:0},j=function(n){var t=m(n);return t?t.split(" ").length:0},O=function(n){var t=n&&d("img",n);return t?t.length:0},_=function(n){return{height:(t=n,t?t.offsetHeight:0),start:w(n),symbols:y(n),rr:j(n),images:O(n)};var t},g=function(n){var t=n.reduce((function(n,t){return n?t.position>n.position?t:n:t}),null);return t&&t.name||""},E=(h=function(n,t){return h=Object.setPrototypeOf||{__proto__:[]}instanceof Array&&function(n,t){n.__proto__=t}||function(n,t){for(var r in t)Object.prototype.hasOwnProperty.call(t,r)&&(n[r]=t[r])},h(n,t)},function(n,t){if("function"!=typeof t&&null!==t)throw new TypeError("Class extends value "+String(t)+" is not a constructor or null");function r(){this.constructor=n}h(n,t),n.prototype=null===t?Object.create(t):(r.prototype=t.prototype,new r)}),A=function(n){function t(){var t=null!==n&&n.apply(this,arguments)||this;return t.Pf="manual",t}return E(t,n),t.prototype.collect=function(n){var t={Qi:this.Pf,title:n.title||null,type:n.type||null,itemId:n.itemId||null,url:n.url||null,description:n.description||null,Zi:n.themes||null,nr:{published:n.datePublished||null,ir:n.dateModified||null},er:null,sizes:null},r=n.author;return r&&o(r)&&(t.er={name:r.name||null,id:r.id||null,url:r.url||null}),n.articleContainer instanceof HTMLElement&&(t.sizes=_(n.articleContainer)),t},t}(e),S=function(n){var t={};if(!n)return t;for(var r in n)t[r]=n[r];return t};var k=function(n,t){return"__proto__"===t?null:n&&void 0!==t?n[t]:null},T=function(){for(var n=[],t=0;t<arguments.length;t++)n[t]=arguments[t];if(n.length<1||!o(n[0]))return null;if(n.length<2)return n[0];var r=n[0];return n.forEach((function(n){o(n)&&null!==n&&!c(n)&&Object.keys(n).forEach((function(t){var i=k(r,t),e=k(n,t);e!==r&&(o(e)&&null!==e?c(e)?r[t]=N(e):!o(i)||null===i||c(i)?r[t]=S(e):r[t]=T(i,e):r[t]=e)}))})),r},C=function(n,t){return function(n,t,r){return Array.prototype.indexOf.call(n,t,r)}(n,t)>=0},x=function(n,t,r){var i=function(n,t,r){for(var i=n.length,e=u(n)?n.split(""):n,o=i-1;o>=0;o--)if(o in e&&t.call(r,e[o],o,n))return o;return-1}(n,t,r);return i<0?null:u(n)?n.charAt(i):n[i]};var I,P,L,N=function(n){var t=[];return n.forEach((function(n,r){o(n)&&null!==n?Array.isArray(n)?t[r]=N(n):t[r]=S(n):t[r]=n})),t},B=["BlogPosting","NewsArticle","Article","WebPage","News"],M=["BreadcrumbList"],z=function(){var n=function(t,r){return n=Object.setPrototypeOf||{__proto__:[]}instanceof Array&&function(n,t){n.__proto__=t}||function(n,t){for(var r in t)Object.prototype.hasOwnProperty.call(t,r)&&(n[r]=t[r])},n(t,r)};return function(t,r){if("function"!=typeof r&&null!==r)throw new TypeError("Class extends value "+String(r)+" is not a constructor or null");function i(){this.constructor=t}n(t,r),t.prototype=null===r?Object.create(r):(i.prototype=r.prototype,new i)}}(),D=function(n){function t(){var t=null!==n&&n.apply(this,arguments)||this;return t.Bf=[],t.Pf="micro",t}return z(t,n),t.prototype.collect=function(){if(this.zf=this.Df(B),!this.zf)return null;var n={Qi:this.Pf,type:t.Ff(this.zf),itemId:p(this.zf,"data-id"),er:null,nr:null};T(n,this.Hf()),T(n,this.Jf(this.zf));var r=this.Df(M);return r&&(n.Zi=this.Rf(r)),n},t.Ff=function(n){var t=n&&n.getAttribute("itemtype");return t&&t.split("schema.org/")[1]||""},t.prototype.Hf=function(){var n=this,t=v("itemscope"),r=d(t,this.zf);if(0===r.length)return{};var i={};return r.forEach((function(t){if(!C(n.Bf,t)&&"author"===t.getAttribute("itemprop"))n.Bf.push(t),function(){for(var n=[],t=0;t<arguments.length;t++)n[t]=arguments[t];var r,i=n[0]||{},e=n.length,u=1;if("object"!=typeof i)return{};for(;u<e;){var o=n[u];if("object"==typeof o){r=Object.keys(o);for(var c=0;c<r.length;c++){var a=r[c];i[a]=o[a]}}u++}}(i,n.Jf(t,"author"))})),i},t.prototype.Jf=function(n,t){var r=this,i=v("itemprop"),e=d(i,n);if(0===e.length)return{};var u={er:{},nr:{}};return e.forEach((function(n){if(!C(r.Bf,n))switch(r.Bf.push(n),p(n,"itemprop")){case"identifier":if(u.itemId)return;var i=p(n,"content");i.length>2&&(u.itemId=i);break;case"headline":u.title=m(n);break;case"datePublished":if(!u.nr)break;u.nr.published=p(n,"content")||p(n,"datetime");break;case"dateModified":if(!u.nr)break;u.nr.ir=p(n,"content")||p(n,"datetime");break;case"genre":u.Zi=p(n,"content");break;case"description":case"abstract":u.description=m(n)||p(n,"content");break;case"articleBody":u.sizes=_(n);break;case"author":if(!u.er)break;u.er.name=p(n,"content");break;case"name":u.er&&"author"===t&&(u.er.name=p(n,"content"));break;case"url":u.er&&"author"===t?u.er.url=p(n,"href"):u.url=p(n,"href")}})),u},t.prototype.Rf=function(n){var t=v("itemprop","itemListElement"),r=function(n){if(n instanceof Set){var t=[];return n.forEach((function(n){return t.push(n)})),t}return Array.prototype.slice.call(n)}(d(t,n)).map((function(n){var t=d(v("itemprop","name"),n)[0],r=d(v("itemprop","position"),n)[0];return t&&r?{name:t.innerText,position:parseInt(p(r,"content"),10)}:null}));return g(r.filter((function(n){return n})))},t.prototype.Df=function(n){var r=v("itemscope"),i=d(r);return x(i,(function(r){var i=t.Ff(r);return r.children.length&&C(n,i)}))},t}(e),F=function(){var n=function(t,r){return n=Object.setPrototypeOf||{__proto__:[]}instanceof Array&&function(n,t){n.__proto__=t}||function(n,t){for(var r in t)Object.prototype.hasOwnProperty.call(t,r)&&(n[r]=t[r])},n(t,r)};return function(t,r){if("function"!=typeof r&&null!==r)throw new TypeError("Class extends value "+String(r)+" is not a constructor or null");function i(){this.constructor=t}n(t,r),t.prototype=null===r?Object.create(r):(i.prototype=r.prototype,new i)}}(),H=function(n){function t(){var t=null!==n&&n.apply(this,arguments)||this;return t.Pf="ld",t}return F(t,n),t.prototype.collect=function(){var n,r,i,e,u,o,c,a,f,l,h;if(this.zf=t.Df(B),this.Vf=s(this.zf&&this.zf.innerText),!this.Vf)return null;var v={Qi:this.Pf,type:null===(n=k(this.Vf,"@type"))||void 0===n?void 0:n.toString(),title:null===(r=k(this.Vf,"name")||k(this.Vf,"headline"))||void 0===r?void 0:r.toString(),description:null===(i=k(this.Vf,"description"))||void 0===i?void 0:i.toString(),nr:{published:null===(e=k(this.Vf,"datePublished"))||void 0===e?void 0:e.toString(),ir:null===(u=k(this.Vf,"dateModified"))||void 0===u?void 0:u.toString()},sizes:this.Wf(),Zi:null===(o=k(this.Vf,"articleSection"))||void 0===o?void 0:o.toString(),er:null};if(!v.Zi){var d=t.Df(M);d&&(v.Zi=t.Rf(d))}var b=k(this.Vf,"image");b&&b.length&&v.sizes&&(v.sizes.images=b.length);var m=k(this.Vf,"author");m&&(v.er={name:null===(c=k(m,"name"))||void 0===c?void 0:c.toString(),url:null===(a=k(m,"url"))||void 0===a?void 0:a.toString()});var p=k(this.Vf,"mainEntityOfPage");v.url=null===(f=p?k(p,"@id"):k(this.Vf,"url"))||void 0===f?void 0:f.toString();var w=k(this.Vf,"identifier"),y=null===(l=k(w,"propertyID"))||void 0===l?void 0:l.toString();return"mediaId"!==y&&"Article id"!==y||(v.itemId=null===(h=k(w,"value"))||void 0===h?void 0:h.toString()),v},t.Rf=function(n){var t=s(n.innerText)||{},r=k(t,"itemListElement");return c(r)?g(r):""},t.Df=function(n){var t=v('type="application/ld+json"'),r=d(t);return x(r,(function(t){var r=t.innerText;return!!x(n,(function(n){return!!~r.indexOf(n)}))}))},t.prototype.Yf=function(n){var t=k(this.Vf,n);return t?k(t,"@id"):null},t.prototype.qf=function(){var n,t=document.body,r=null===(n=this.Yf("mainEntityOfPage")||this.Yf("mainEntity")||k(this.Vf,"@id"))||void 0===n?void 0:n.toString(),i=r&&r.split("#")[1];return i&&(t=document.getElementById(i)),t},t.prototype.Wf=function(){var n;return n=this.zf&&function(n,t){for(var r=n;r;){if(r.matches(t))return r;r=r.parentElement}return null}(this.zf,"body")?this.zf.parentNode:this.qf(),_(n)},t}(e),J=function(){return J=Object.assign||function(n){for(var t,r=1,i=arguments.length;r<i;r++)for(var e in t=arguments[r])Object.prototype.hasOwnProperty.call(t,e)&&(n[e]=t[e]);return n},J.apply(this,arguments)},R=function(){function n(n){this.Lo=null,this.data=this.Xo(n)}return n.prototype.Go=function(){return this.$o},n.prototype.Ko=function(n){switch(n){case 0:return this.Yo;case 1:return this.Qo}return null},n.prototype.Zo=function(){return this.Lo},n.prototype.getData=function(n){var t=J(J({Mr:this.$o,lr:null},this.ts),this.data);switch(n){case 0:t.lr=this.Yo;break;case 1:t.lr=this.Qo}return t},n.prototype.ns=function(n){this.ts=n},n}(),V=function(){var n=function(t,r){return n=Object.setPrototypeOf||{__proto__:[]}instanceof Array&&function(n,t){n.__proto__=t}||function(n,t){for(var r in t)Object.prototype.hasOwnProperty.call(t,r)&&(n[r]=t[r])},n(t,r)};return function(t,r){if("function"!=typeof r&&null!==r)throw new TypeError("Class extends value "+String(r)+" is not a constructor or null");function i(){this.constructor=t}n(t,r),t.prototype=null===r?Object.create(r):(i.prototype=r.prototype,new i)}}(),W=function(){return W=Object.assign||function(n){for(var t,r=1,i=arguments.length;r<i;r++)for(var e in t=arguments[r])Object.prototype.hasOwnProperty.call(t,e)&&(n[e]=t[e]);return n},W.apply(this,arguments)},Y=function(n){function t(){var t=null!==n&&n.apply(this,arguments)||this;return t.$o="media",t.Yo="pvm",t.Qo="page_view",t}return V(t,n),t.prototype.Xo=function(n){var t,r,i,e,u,o=n.data,c=W({},o);return o.url||(c.url=(t=v("rel","canonical"),r=d(t),(i=r[0]&&p(r[0],"href"))||(i=location.origin+document.location.pathname),i)),o.title||(c.title=(e=d("title"),u="",0!==e.length&&(u=m(e[0])),u)),{Wr:c,referrer:document.referrer||""}},t}(R),q=function(){var n=function(t,r){return n=Object.setPrototypeOf||{__proto__:[]}instanceof Array&&function(n,t){n.__proto__=t}||function(n,t){for(var r in t)Object.prototype.hasOwnProperty.call(t,r)&&(n[r]=t[r])},n(t,r)};return function(t,r){if("function"!=typeof r&&null!==r)throw new TypeError("Class extends value "+String(r)+" is not a constructor or null");function i(){this.constructor=t}n(t,r),t.prototype=null===r?Object.create(r):(i.prototype=r.prototype,new i)}}(),G=function(n){function t(t,r){var i,e=n.call(this,t)||this;return e.Gf={},e.Kf=((i={}).manual=new A,i.micro=new D,i.ld=new H,i),e.media=r,e}return q(t,n),t.prototype.Qs=function(){return this.Gf},t.prototype.track=function(n,t){var r=this.initEvent(n,t);if(r){var i;i=this.Gf,Object.keys(i).length||this.Qf(r);var e=n.getSettings();this.media.Uf(e.ei),this.send(r,{Vo:n})}},t.prototype.initEvent=function(n,t){var r=this.Xo(t.data);return r?new Y({data:r}):null},t.prototype.Xo=function(n){var t=this.Kf,r=t.micro,i=t.manual,e=t.ld;return n&&o(n)?i.collect(n):r.collect()||e.collect()},t.prototype.Qf=function(n){var t=n.getData();this.Gf.itemId=t.Wr.itemId,this.Gf.url=t.Wr.url},t}(i),K=function(){var n=function(t,r){return n=Object.setPrototypeOf||{__proto__:[]}instanceof Array&&function(n,t){n.__proto__=t}||function(n,t){for(var r in t)Object.prototype.hasOwnProperty.call(t,r)&&(n[r]=t[r])},n(t,r)};return function(t,r){if("function"!=typeof r&&null!==r)throw new TypeError("Class extends value "+String(r)+" is not a constructor or null");function i(){this.constructor=t}n(t,r),t.prototype=null===r?Object.create(r):(i.prototype=r.prototype,new i)}}(),Q=function(n){function t(t,r){var i=n.call(this,t)||this;return i.Sn={Xf:{mn:null}},i.media=r,i.Sn.Xf.mn=new G(t,i.media),i}return K(t,n),t.prototype.Qs=function(){var n=this.Sn.Xf;return n.mn?n.mn.Qs():null},t.prototype.uh=function(n,t){var r=this.Sn.Xf;r.mn&&r.mn.track(n,t)},t}(r),U=function(){var n=function(t,r){return n=Object.setPrototypeOf||{__proto__:[]}instanceof Array&&function(n,t){n.__proto__=t}||function(n,t){for(var r in t)Object.prototype.hasOwnProperty.call(t,r)&&(n[r]=t[r])},n(t,r)};return function(t,r){if("function"!=typeof r&&null!==r)throw new TypeError("Class extends value "+String(r)+" is not a constructor or null");function i(){this.constructor=t}n(t,r),t.prototype=null===r?Object.create(r):(i.prototype=r.prototype,new i)}}(),X=function(n){function t(){var t=null!==n&&n.apply(this,arguments)||this;return t.Zf=new Set,t.Ra=new Q(t.de,t),t}return U(t,n),t.prototype.Se=function(){return this.Ra},t.prototype.Uf=function(n){this.Zf.add(n)},t.prototype.xe=function(n){this.Zf.delete(n)},t.prototype.sh=function(n){var t=n.getSettings().ei;return this.Zf.has(t)},t}(t);I="media",P=X,(L=window._top100?window._top100.getListeners():null)&&L.publish(n,I,P)})();