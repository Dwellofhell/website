/* Krond's simple image gallery */
var ksig_Egd=!1,ksig_data=[],ksig_czi="",ksig_cs=0,ksig_CrypP="ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789",ksig_CrypL=ksig_CrypP.length;function KSIG_RID(){for(var a="",b=0;16>b;b++)a+=ksig_CrypP.charAt(Math.floor(Math.random()*ksig_CrypL));return a}function KSIG_Prep(){ksig_Egd||(ksig_Egd=!0,$("head").append("<style type=\"text/css\">div[kugal],div[ksig]{margin:8px auto!important}div[kugal] > img,div[ksig] > img,div[kugal] > k-img,div[ksig] > k-img{display:none;opacity:0;visibility:hidden;width:inherit;}.ksig-nod{display:none!important}.ksig-ofl{overflow:hidden}div.ksig-ii.i,div.ksig-z-e.i{left:0}div.ksig-ii.h,div.ksig-z-e.h{left:-100%}div.ksig-ii.p,div.ksig-z-e.p{animation:mp .3s ease-out;left:0}div.ksig-ii.n,div.ksig-z-e.n{animation:mn .3s ease-out;left:0}div.ksig-ii.lp,div.ksig-z-e.lp{animation:ln .3s ease-out;left:-100%}div.ksig-ii.ln,div.ksig-z-e.ln{animation:lp .3s ease-out;left:100%}@keyframes mn{from{left:100%}to{left:0}}@keyframes mp{from{left:-100%}to{left:0}}@keyframes ln{from{left:0}to{left:100%}}@keyframes lp{from{left:0}to{left:-100%}}@keyframes ar{from{opacity:0}to{opacity:1}}@keyframes ia{from{width:0;height:0;max-width:0;max-height:0;opacity:0}to{width:100%;height:100%;max-width:100%;max-height:100%;opacity:1}}@keyframes io{from{opacity:0}to{opacity:1}}div.ksig-ic{height:auto;min-height:64px!important;width:100%!important;min-width:64px;display:grid;align-items:center;box-sizing:border-box;position:relative;overflow:hidden;-webkit-user-select:none;-moz-user-select:none;-khtml-user-select:none;user-select:none;margin:0 auto!important}div.ksig-prel{margin:0 auto!important;width:48px;height:48px;border-radius:50%;position:relative;border-top:8px solid rgba(0,0,0,0.16);border-right:8px solid rgba(0,0,0,0.16);border-bottom:8px solid rgba(0,0,0,0.16);border-left:8px solid #FFF;-webkit-transform:translateZ(0);-ms-transform:translateZ(0);transform:translateZ(0);-webkit-animation:k-imgv-prela .64s infinite linear;animation:ksig-prela .64s infinite linear;box-sizing:border-box}@-webkit-keyframes ksig-prela{0%{-webkit-transform:rotate(0deg);transform:rotate(0deg)}100%{-webkit-transform:rotate(360deg);transform:rotate(360deg)}}@keyframes ksig-prela{0%{-webkit-transform:rotate(0deg);transform:rotate(0deg)}100%{-webkit-transform:rotate(360deg);transform:rotate(360deg)}}div.ksig-sizer{height:0!important;margin:0!important;max-height:0!important;display:block!important;visibility:hidden!important;opacity:0!important}div.ksig-ipi{cursor:zoom-in;background-color:#000;margin:0!important}div.ksig-ii{width:100%;height:100%;position:absolute;top:0;box-sizing:border-box;margin:0!important}div.ksig-ii img{width:100%!important;height:100%!important;min-width:100%;min-height:100%;max-width:100%;max-height:100%;border:0;display:inline-block;object-fit:contain;margin:0!important}div.ksig-ipi.ksig-cvr div.ksig-ii img{object-fit:cover!important}div.ksig-ipn{width:64px;height:100%;box-sizing:border-box;position:absolute;top:0;bottom:0;cursor:pointer;display:grid;align-items:center;margin:0!important}div.ksig-ipn-i{width:32px;height:32px;border-top:4px solid rgba(255,255,255,.6);border-left:4px solid rgba(255,255,255,.6);filter:drop-shadow(0px 0px 1px rgba(0,0,0,.5));border-radius:2px;box-sizing:border-box}div.ksig-ipn.prev{left:0}div.ksig-ipn.prev div.ksig-ipn-i{-webkit-transform:translate(24px,0px) rotate(-45deg);transform:translate(24px,0px) rotate(-45deg)}div.ksig-ipn.next{right:0}div.ksig-ipn.next div.ksig-ipn-i{-webkit-transform:translate(8px,0px) rotate(135deg);transform:translate(8px,0px) rotate(135deg)}div.ksig-ic:hover div.ksig-ipn{background-color:rgba(0,0,0,.1)}div.ksig-ic:hover div.ksig-ipn div.ksig-ipn-i{border-color:rgba(255,255,255,.8);filter:none}div.ksig-ic div.ksig-ipn:hover{background-color:rgba(0,0,0,.5)}div.ksig-ic div.ksig-ipn:hover div.ksig-ipn-i{border-color:#FFF}div.ksig-ic div.ksig-icl{width:100%;height:auto;max-height:20%;padding:0 10% 8px;position:absolute;bottom:0;left:0;box-sizing:border-box;overflow:hidden;text-align:center;opacity:.6;margin:0!important;}div.ksig-ic div.ksig-icl:empty{display:none}div.ksig-ic div.ksig-icl div{width:6px;height:16px;background:rgba(255,255,255,.4);border-radius:1px;display:inline-block;box-sizing:border-box;margin:0 5px!important;box-shadow:0 0 1px #000;cursor:pointer}div.ksig-ic div.ksig-icl div.active{background:rgba(255,255,255,.9)}div.ksig-ic:hover div.ksig-icl{opacity:1}@media (pointer:coarse){div.ksig-ic div.ksig-icl{display:none!important}}.ksig-t0{-webkit-transition:all .2s ease;-moz-transition:all .2s ease;-o-transition:all .2s ease;transition:all .2s ease}.ksig-t1{-webkit-transition:all .4s ease;-moz-transition:all .4s ease;-o-transition:all .4s ease;transition:all .4s ease}div.ksig-z{-webkit-user-select:none;-moz-user-select:none;-khtml-user-select:none;user-select:none}div.ksig-z-shadow{visibility:hidden;opacity:0;position:fixed;top:0;right:0;bottom:0;left:0;width:100%;height:100%;max-width:100%;max-height:100%;padding:0;margin:0!important;border:0;z-index:100000;background-color:rgba(0,0,0,0.9)}div.ksig-z-shadow.active{visibility:visible;opacity:1}div.ksig-z-p{display:none;position:fixed;top:0;right:0;bottom:0;left:0;width:100%;height:100%;max-width:100%;max-height:100%;padding:0;margin:0!important;border:0;z-index:100001}div.ksig-z-p.active{display:block;animation:ar .2s ease}div.ksig-z-p .hbl{opacity:1;z-index:100002;-webkit-transition:all .2s ease-out;-moz-transition:all .2s ease-out;-o-transition:all .2s ease-out;transition:all .2s ease-out}div.ksig-z-p.ksig-hc .hbl{visibility:hidden;opacity:0}div.ksig-z-i{position:fixed;top:0;right:0;bottom:0;left:0;width:100%;height:100%;min-width:160px;min-height:90px;max-width:100%;max-height:100%;padding:0;margin:0!important;border:0;z-index:100001;box-sizing:border-box;overflow:hidden}div.ksig-z-i div.ksig-z-e{position:absolute;top:0;width:100%;height:100%;min-width:100%;min-height:100%;display:grid;align-items:center;box-sizing:border-box;padding:4px}div.ksig-z-i div.ksig-z-e div{grid-column:1;grid-row:1}div.ksig-z-i div.ksig-z-e img{grid-column:1;grid-row:1;display:inline-block;width:0;height:0;min-width:320px;min-height:180px;max-width:0;max-height:0;opacity:0;border:0;object-fit:contain;margin:0 auto!important}div.ksig-z-i div.ksig-z-e img.rdy:not(.strict){animation:ia .3s ease;width:100%;height:100%;opacity:1}div.ksig-z-i div.ksig-z-e img.rdy.strict{animation:io .3s ease;width:100%;height:100%;opacity:1}div.ksig-z-n{width:64px;height:100%;box-sizing:border-box;position:absolute;top:0;bottom:0;cursor:pointer;display:grid;align-items:center}div.ksig-z-ni{width:32px;height:32px;border-top:4px solid rgba(255,255,255,.6);border-left:4px solid rgba(255,255,255,.6);border-radius:2px;box-sizing:border-box}div.ksig-z-n.prev{left:0}div.ksig-z-n.prev div.ksig-z-ni{-webkit-transform:translate(24px,0px) rotate(-45deg);transform:translate(24px,0px) rotate(-45deg)}div.ksig-z-n.next{right:0}div.ksig-z-n.next div.ksig-z-ni{-webkit-transform:translate(8px,0px) rotate(135deg);transform:translate(8px,0px) rotate(135deg)}div.ksig-z-n:hover div.ksig-z-ni{border-color:#FFF}a.ksig-z-full{width:64px;height:64px;position:fixed;left:0;top:0;box-sizing:border-box;z-index:100004}a.ksig-z-full[href=\"\"]{display:none}a.ksig-z-full div{width:8px;height:8px;border:2px ridge #CCC;border-radius:1px;background:transparent;position:absolute;margin:0!important;padding:0;left:16px;top:16px;box-sizing:border-box}a.ksig-z-full:hover div{border:2px ridge #FFF}a.ksig-z-full div:nth-of-type(1){border-right:0;border-bottom:0}a.ksig-z-full div:nth-of-type(2){left:40px;border-left:0;border-bottom:0}a.ksig-z-full div:nth-of-type(3){top:40px;border-right:0;border-top:0}a.ksig-z-full div:nth-of-type(4){top:40px;left:40px;border-left:0;border-top:0}div.ksig-z-db{width:64px;height:64px;position:fixed;left:0;top:0;box-sizing:border-box;z-index:100004;cursor:pointer}div.ksig-z-db div{width:16px;height:16px;border:2px solid #AAA;border-radius:1px;background:transparent;position:absolute;margin:0!important;padding:0;left:7px;top:11px;box-sizing:border-box}div.ksig-z-db:hover div{border:2px solid #FFF}div.ksig-z-db div:nth-of-type(1){-webkit-transform:translate(16px,15px) rotate(-135deg);transform:translate(16px,15px) rotate(-135deg);border-right:0;border-bottom:0}div.ksig-z-db div:nth-of-type(2){left:30px;height:32px;border-right:0;border-bottom:0;border-top:0}div.ksig-z-db div:nth-of-type(3){top:38px;width:48px;border-top:0}div.ksig-z-close{width:64px;height:64px;position:fixed;right:0;top:0;box-sizing:border-box;display:block;z-index:100004;cursor:pointer}div.ksig-z-close div{width:24px;height:24px;border-top:4px solid #AAA;border-left:4px solid #AAA;border-radius:2px;box-sizing:border-box}div.ksig-z-close:hover div{border-color:#FFF}div.ksig-z-close div:nth-of-type(1){-webkit-transform:translate(33px,19px) rotate(-45deg);transform:translate(33px,19px) rotate(-45deg)}div.ksig-z-close div:nth-of-type(2){-webkit-transform:translate(5px,-5px) rotate(135deg);transform:translate(5px,-5px) rotate(135deg)}div.ksig-z-t{position:absolute;left:0;bottom:0;right:0;width:100%;max-width:100%;max-height:32%;overflow:hidden;color:#FFF;background-color:rgba(0,0,0,0.2);text-shadow:1px 1px 2px #000;font-family:Verdana,Tahoma,Arial;font-size:16px;line-height:20px;padding:8px;text-align:center;box-sizing:border-box;visibility:hidden;opacity:0}div.ksig-z-t.active{visibility:visible;opacity:1;animation:ar .4s ease}div.ksig-z-t:empty{display:none!important}div.ksig-z-dl{position:absolute;left:0;bottom:0;right:0;width:100%;max-width:100%;max-height:32%;overflow:hidden;color:#FFF;background-color:#000;font-family:Verdana,Tahoma,Arial;font-size:16px;line-height:20px;padding:4px 8px;text-align:left;box-sizing:border-box;visibility:hidden;opacity:0;z-index:100003}div.ksig-z-dl span{display:inline-block;margin:2px 4px!important;padding:2px 8px;color:#FFF;font-weight:600}div.ksig-z-dl span:empty{display:none!important}div.ksig-z-dl a,div.ksig-z-dl a:visited{display:inline-block;margin:1px 4px!important;padding:2px 8px;text-decoration:none;color:#BBB}div.ksig-z-dl a:hover{color:#FFF}div.ksig-z-dl.active{visibility:visible;opacity:1;animation:ar .4s ease}div.ksig-z-dl:empty{display:none!important}div.ksig-z-nav{position:absolute;left:0;top:0;right:0;width:100%;max-width:100%;max-height:32%;overflow:hidden;text-align:center;box-sizing:border-box;visibility:hidden;opacity:0}div.ksig-z-nav span{color:#FFF;background-color:rgba(0,0,0,0.4);text-shadow:1px 1px 2px #000;font-family:Verdana,Tahoma,Arial;font-size:16px;line-height:20px;padding:8px 16px;display:inline-block}div.ksig-z-nav span:before{content:'[ '}div.ksig-z-nav span:after{content:' ]'}div.ksig-z-nav.active{visibility:visible;opacity:1;animation:ar .4s ease}div.ksig-z-nav:empty{display:none!important}div.ksig-ii.gh,div.ksig-z-e.gh{display:grid;align-items:center;overflow:hidden;position:relative;position:absolute;background-color:#000;cursor:auto;}div.ksig-ii.gh img.ksig-smi,div.ksig-z-e.gh img.ksig-smi{width:100%!important;height:100%!important;max-width:100%!important;max-height:100%!important;grid-column:1;grid-row:1;object-fit:cover;opacity:0.2;}div.ksig-z-e.gh a.ksig-sml,div.ksig-z-e.gh a.ksig-sml:visited,div.ksig-ii.gh a.ksig-sml,div.ksig-ii.gh a.ksig-sml:visited{display:inline-block;background-color:#e3e2e1;color:#000;font-size:20px;font-weight:600;line-height:120%;text-align:center;padding:12px 20px;margin:0 auto!important;border:1px solid #e3e2e1;border-bottom-color:#96918b;border-right-color:#bebbb5;border-radius:4px;text-decoration:none;grid-column:1;grid-row:1;z-index:1;}@media screen and (max-width:512px){div.ksig-ii.gh a.ksig-sml,div.ksig-z-e.gh a.ksig-sml{padding:12px;font-size:16px;}}a.ksig-sml:hover{background-color:#F0F0F0;}</style>"))}function KSIG_OVZ(a,b){return"undefined"!=typeof ksig_data[a]&&void(b>=ksig_data[a].IC?b=0:0>b&&(b=ksig_data[a].IC-1),ksig_data[a].IS=b,KSIG_OZ(a))}function KSIG_OZ(b){if("undefined"==typeof ksig_data[b]||!ksig_data[b].Rdy)return!1;KSIG_MZ(),ksig_czi=b,ksig_cs=$(document).scrollTop(),!!$("body").css("overflow").length&&"visible"!=$("body").css("overflow")||$("body").addClass("ksig-ofl");var c="h";$.each(ksig_data[b].Itm,function(a,d){c=ksig_data[b].IS==a?"i":"h",""==d.html?$("#ksig-z-i").append("<div class=\"ksig-z-e "+c+"\" id=\"zi-"+b+"-"+d.id+"\"><div class=\"ksig-prel\"></div></div>"):$("#ksig-z-i").append("<div class=\"ksig-z-e gh "+c+"\" id=\"zi-"+b+"-"+d.id+"\">"+d.html+"</div>")}),1<ksig_data[b].IC?$("#ksig-zoomer .ksig-z-n,#ksig-zoomer .ksig-z-close").removeClass("ksig-nod"):$("#ksig-zoomer .ksig-z-n,#ksig-zoomer .ksig-z-close").addClass("ksig-nod"),ksig_data[b].MN&&1<ksig_data[b].IC?($("#ksig-z-nav").addClass("active"),KSIG_UN()):$("#ksig-z-nav").removeClass("active"),$("#ksig-z-p").removeClass("ksig-hc").addClass("active"),$("#ksig-z-shadow").addClass("active"),KSIG_PZI(b,ksig_data[b].IS),$(document).on("keydown",function(a){var b=a.keyCode||a.which;27==b&&(KSIG_CZ(),a.preventDefault()),37==b&&(KSIG_ZPP(),a.preventDefault()),39==b&&(KSIG_ZPN(),a.preventDefault()),32==b&&(KSIG_ZPN(),a.preventDefault()),(38==b||40==b||13==b)&&a.preventDefault()}),KSIG_RZN()}function KSIG_CZ(){$(document).scrollTop(ksig_cs),$("body").removeClass("ksig-ofl"),$("#ksig-z-shadow,#ksig-z-p").removeClass("active"),$("#ksig-z-p").removeClass("ksig-hc"),$("#ksig-z-i").empty(),$(document).off("keydown")}function KSIG_MZ(){$("#ksig-zoomer").length||($("body").append("<div class=\"ksig-z\" id=\"ksig-zoomer\"><div class=\"ksig-z-shadow ksig-t0\" id=\"ksig-z-shadow\"></div><div class=\"ksig-z-p\" id=\"ksig-z-p\"><div class=\"ksig-z-i\" id=\"ksig-z-i\"></div><div class=\"ksig-z-n prev hbl\" id=\"ksig-zpnp\"><div class=\"ksig-z-ni\"></div></div><div class=\"ksig-z-n next hbl\" id=\"ksig-zpnn\"><div class=\"ksig-z-ni\"></div></div><div class=\"ksig-z-nav hbl\" id=\"ksig-z-nav\"><span></span></div><a href=\"\" class=\"ksig-z-full hbl\" id=\"ksig-z-full\" target=\"_blank\"><div></div><div></div><div></div><div></div></a><div class=\"ksig-z-db hbl\" id=\"ksig-z-db\"><div></div><div></div><div></div></div><div class=\"ksig-z-close hbl\"><div></div><div></div></div><div class=\"ksig-z-t hbl\" id=\"ksig-z-title\"></div><div class=\"ksig-z-dl hbl\" id=\"ksig-z-dl\"></div></div></div>"),$("#ksig-z-db").click(function(){KSIG_SDL()}),$("#ksig-z-i").click(function(){KSIG_TC()}),$("#ksig-zoomer .ksig-z-close").click(function(){KSIG_CZ()}),$(".ksig-z-n.prev").click(function(){KSIG_ZPP()}),$(".ksig-z-n.next").click(function(){KSIG_ZPN()}))}function KSIG_SDL(){""==ksig_czi||2>ksig_data[ksig_czi].Itm[ksig_data[ksig_czi].IS].dlist.length||($("#ksig-z-title").toggleClass("ksig-nod"),$("#ksig-z-dl").toggleClass("active"))}function KSIG_TC(){""!=ksig_czi&&2>ksig_data[ksig_czi].IC?KSIG_CZ():$("#ksig-z-p").toggleClass("ksig-hc")}function KSIG_RP(a){if(ksig_data[a].Virt)return void $("#"+a).remove();$("#"+a+" .ksig-ic").remove(),$("#"+a).empty().html("<div class=\"ksig-ic\"><div class=\"ksig-sizer\"></div><div class=\"ksig-ipi\"></div>"+(1<ksig_data[a].IC?"<div class=\"ksig-icl\"></div><div class=\"ksig-ipn prev\" id=\"ksig-ipnp\"><div class=\"ksig-ipn-i\"></div></div><div class=\"ksig-ipn next\" id=\"ksig-ipnn\"><div class=\"ksig-ipn-i\"></div></div>":"")+"</div>");var b=0;$.each(ksig_data[a].Itm,function(c,d){""==d.html?$("#"+a+" .ksig-ipi").append("<div zoom class=\"ksig-ii "+(0==b?"i":"h")+"\"><img src=\""+d.src+"\" alt=\""+d.alt+"\" title=\""+d.title+"\" /></div>"):$("#"+a+" .ksig-ipi").append("<div class=\"ksig-ii gh "+(0==b?"i":"h")+"\">"+d.html+"</div>"),$("#"+a+" .ksig-icl").append("<div></div>"),b++}),$("#"+a+" .ksig-icl >div").each(function(){$(this).click(function(){KSIG_IPE(a,$("#"+a+" .ksig-icl >div").index(this))})}),$("#"+a+" .ksig-icl >div").eq(0).addClass("active"),$("#"+a+" .ksig-ipi [zoom]").click(function(){KSIG_OZ(a)}).removeAttr("zoom"),$("#"+a+" .ksig-ipn.prev").click(function(){KSIG_IPP(a)}).attr("id","ksig-"+a+"-ipnp"),$("#"+a+" .ksig-ipn.next").click(function(){KSIG_IPN(a)}).attr("id","ksig-"+a+"-ipnn"),$("#"+a+" .ksig-sizer").css("padding-top",100*(ksig_data[a].H/ksig_data[a].W)+"%"),ksig_data[a].MC&&$("#"+a+" .ksig-ipi").addClass("ksig-cvr"),ksig_data[a].A=!0,KSIG_RN(a)}function KSIG_RPP(d){var e,f,g;e=0,f=0,$.each(ksig_data[d].Itm,function(a,b){""==b.html&&(e+=b.w/b.h,f++)}),e/=f,ksig_data[d].P=-1,$.each(ksig_data[d].Itm,function(a,b){""==b.html&&(g=b.w/b.h,f=Math.abs(g-e),(-1==ksig_data[d].P||f<ksig_data[d].P&&0<ksig_data[d].P||f==ksig_data[d].P&&ksig_data[d].W/ksig_data[d].H<g)&&(ksig_data[d].P=f,ksig_data[d].W=b.w,ksig_data[d].H=b.h))})}function KSIG_CGR(a){if("undefined"==typeof ksig_data[a]||ksig_data[a].Rdy||!ksig_data[a].PP)return!1;var b=!0,c=[],d=0;$.each(ksig_data[a].Itm,function(a,e){e.srcrdy||e.err?!e.err&&(c[d]=e,c[d].id=d,d++):b=!1}),ksig_data[a].Rdy=b,b&&(ksig_data[a].Itm=c,ksig_data[a].IC=ksig_data[a].Itm.length,0<ksig_data[a].IC?!ksig_data[a].Virt&&(KSIG_RPP(a),KSIG_RP(a)):($("#"+a+" .ksig-ic").remove(),$("#"+a).removeAttr("kugal ksig").html($("#"+a+"-temporal-holder").html()),delete ksig_data[a]))}function KSIG_PBI(a,b){if("undefined"!=typeof ksig_data[a]&&"undefined"!==ksig_data[a].Itm[b]){if(ksig_data[a].Virt||""!=ksig_data[a].Itm[b].html)return ksig_data[a].Itm[b].srcrdy=!0,void KSIG_CGR(a);if(""==ksig_data[a].Itm[b].src&&(ksig_data[a].Itm[b].src=ksig_data[a].Itm[b].srcz),""==ksig_data[a].Itm[b].src)return ksig_data[a].Itm[b].err=!0,void KSIG_CGR(a);var c=new Image;c.onload=function(){ksig_data[a].Itm[b].srcrdy=!0,ksig_data[a].Itm[b].w=c.width,ksig_data[a].Itm[b].h=c.height,KSIG_CGR(a)},c.onerror=function(){ksig_data[a].Itm[b].src==ksig_data[a].Itm[b].srcz?(ksig_data[a].Itm[b].err=!0,KSIG_CGR(a)):(ksig_data[a].Itm[b].src=ksig_data[a].Itm[b].srcz,KSIG_PBI(a,b))},c.abort=function(){ksig_data[a].Itm[b].src==ksig_data[a].Itm[b].srcz?(ksig_data[a].Itm[b].err=!0,KSIG_CGR(a)):(ksig_data[a].Itm[b].src=ksig_data[a].Itm[b].srcz,KSIG_PBI(a,b))},c.src=ksig_data[a].Itm[b].src}}function KSIG_EZI(a,b){$("#zi-"+a+"-"+b+">.ksig-prel").remove(),""==ksig_data[a].Itm[b].title?$("#ksig-z-title").html("").removeClass("active"):$("#ksig-z-title").html(ksig_data[a].Itm[b].title).addClass("active"),""==ksig_data[a].Itm[b].html&&(ksig_data[a].Itm[b].strict?$("#zi-"+a+"-"+b+">img").css("max-width",ksig_data[a].Itm[b].wz+"px").css("max-height",ksig_data[a].Itm[b].hz+"px"):$("#zi-"+a+"-"+b+">img").css("max-width","100%").css("max-height","100%"),1<ksig_data[a].Itm[b].dlist.length?(""!=ksig_data[a].DD&&$("#ksig-z-dl").html("<span>"+ksig_data[a].DD+"</span>"),$.each(ksig_data[a].Itm[b].dlist,function(a,b){$("#ksig-z-dl").append("<a href=\""+b.src+"\" target=\"_blank\">"+b.name+"</a>")}),$("#ksig-z-full").attr("href",""),$("#ksig-z-db").removeClass("ksig-nod")):($("#ksig-z-full").removeClass("ksig-nod"),1==ksig_data[a].Itm[b].dlist.length&&""!=ksig_data[a].Itm[b].dlist[0].src?$("#ksig-z-full").attr("href",""+ksig_data[a].Itm[b].dlist[0].src):(ksig_data[a].Itm[b].wz>$(window).width()||ksig_data[a].Itm[b].hz>$(window).height()||ksig_data[a].ML)&&$("#ksig-z-full").attr("href",""+ksig_data[a].Itm[b].srcz)),$("#zi-"+a+"-"+b+">img").addClass("rdy"))}function KSIG_PZI(a,b){if("undefined"!=typeof ksig_data[a]&&"undefined"!==ksig_data[a].Itm[b]){if($("#ksig-z-full").attr("href","").addClass("ksig-nod"),$("#ksig-z-db").addClass("ksig-nod"),$("#ksig-z-dl").empty().removeClass("active"),""!=ksig_data[a].Itm[b].html)return void KSIG_EZI(a,b);if($("#zi-"+a+"-"+b+">img").length||$("#zi-"+a+"-"+b).append("<img"+(ksig_data[a].Itm[b].strict?" class=\"strict\"":"")+" src=\""+ksig_data[a].Itm[b].srcz+"\" alt=\""+ksig_data[a].Itm[b].alt+"\" />"),$("#ksig-z-title").removeClass("active ksig-nod").empty(),ksig_data[a].Itm[b].strict&&$("#zi-"+a+"-"+b+">img").css("max-width","0%").css("max-height","0%"),ksig_data[a].Itm[b].srczrdy)return void KSIG_EZI(a,b);var c=new Image;c.onload=function(){ksig_data[a].Itm[b].srczrdy=!0,ksig_data[a].Itm[b].wz=c.width,ksig_data[a].Itm[b].hz=c.height,KSIG_EZI(a,b)},c.onerror=function(){ksig_data[a].Itm[b].src==ksig_data[a].Itm[b].srcz?ksig_data[a].Itm[b].err=!0:(ksig_data[a].Itm[b].srcz=ksig_data[a].Itm[b].src,$("#zi-"+a+"-"+b+">img").attr("src",ksig_data[a].Itm[b].srcz),KSIG_PZI(a,b))},c.abort=function(){ksig_data[a].Itm[b].src==ksig_data[a].Itm[b].srcz?ksig_data[a].Itm[b].err=!0:(ksig_data[a].Itm[b].srcz=ksig_data[a].Itm[b].src,!$("#zi-"+a+"-"+b+">img").attr("src",ksig_data[a].Itm[b].srcz),KSIG_PZI(a,b))},c.src=ksig_data[a].Itm[b].srcz}}function KSIG_IPN(a){if(!("undefined"==typeof ksig_data[a]||2>ksig_data[a].IC||ksig_data[a].MNC&&ksig_data[a].IS==ksig_data[a].IC-1)){var b;b=ksig_data[a].IS+1,b>ksig_data[a].IC-1&&(b=0),$("#"+a+" .ksig-ipi>.ksig-ii").eq(ksig_data[a].IS).attr("class","ksig-ii ln"),$("#"+a+" .ksig-ipi>.ksig-ii").eq(b).attr("class","ksig-ii n"),$.each(ksig_data[a].Itm,function(b,c){""!=c.html&&$("#"+a+" .ksig-ipi>.ksig-ii").eq(b).addClass("gh")}),ksig_data[a].IS=b,KSIG_RSN(a)}}function KSIG_IPP(a){if(!("undefined"==typeof ksig_data[a]||2>ksig_data[a].IC||ksig_data[a].MNC&&0==ksig_data[a].IS)){var b;b=ksig_data[a].IS-1,0>b&&(b=ksig_data[a].IC-1),$("#"+a+" .ksig-ipi>.ksig-ii").eq(ksig_data[a].IS).attr("class","ksig-ii lp"),$("#"+a+" .ksig-ipi>.ksig-ii").eq(b).attr("class","ksig-ii p"),$.each(ksig_data[a].Itm,function(b,c){""!=c.html&&$("#"+a+" .ksig-ipi>.ksig-ii").eq(b).addClass("gh")}),ksig_data[a].IS=b,KSIG_RSN(a)}}function KSIG_IPE(a,b){if("undefined"!=typeof ksig_data[a]&&ksig_data[a].IS!=b){var c;c=b,0>c?c=ksig_data[a].IC-1:c>ksig_data[a].IC-1&&(c=0),ksig_data[a].IS>c?($("#"+a+" .ksig-ipi>.ksig-ii").eq(ksig_data[a].IS).attr("class","ksig-ii lp"),$("#"+a+" .ksig-ipi>.ksig-ii").eq(c).attr("class","ksig-ii p")):($("#"+a+" .ksig-ipi>.ksig-ii").eq(ksig_data[a].IS).attr("class","ksig-ii ln"),$("#"+a+" .ksig-ipi>.ksig-ii").eq(c).attr("class","ksig-ii n")),$.each(ksig_data[a].Itm,function(b,c){""!=c.html&&$("#"+a+" .ksig-ipi>.ksig-ii").eq(b).addClass("gh")}),ksig_data[a].IS=c,KSIG_RSN(a)}}function KSIG_IPS(a){$("#"+a+" .ksig-ipi>.ksig-ii").each(function(){$(this).attr("class","ksig-ii h")}),$("#"+a+" .ksig-ipi>.ksig-ii").eq(ksig_data[a].IS).attr("class","ksig-ii i"),$.each(ksig_data[a].Itm,function(b,c){""!=c.html&&$("#"+a+" .ksig-ipi>.ksig-ii").eq(b).addClass("gh")}),KSIG_RSN(a)}function KSIG_RSN(a){KSIG_RN(a),$("#"+a+" .ksig-icl>div").each(function(){$(this).removeClass("active")}),$("#"+a+" .ksig-icl>div").eq(ksig_data[a].IS).addClass("active")}function KSIG_RN(a){ksig_data[a].MNC&&(0<ksig_data[a].IS?$("#ksig-"+a+"-ipnp").removeClass("ksig-nod"):$("#ksig-"+a+"-ipnp").addClass("ksig-nod"),ksig_data[a].IS<ksig_data[a].IC-1?$("#ksig-"+a+"-ipnn").removeClass("ksig-nod"):$("#ksig-"+a+"-ipnn").addClass("ksig-nod"))}function KSIG_ZPN(){if(!(""==ksig_czi||2>ksig_data[ksig_czi].IC||ksig_data[ksig_czi].MNC&&ksig_data[ksig_czi].IS==ksig_data[ksig_czi].IC-1)&&!("undefined"==typeof ksig_data[ksig_czi]||2>ksig_data[ksig_czi].IC)){var a;a=ksig_data[ksig_czi].IS+1,a>ksig_data[ksig_czi].IC-1&&(a=0),$("#zi-"+ksig_czi+"-"+ksig_data[ksig_czi].IS).attr("class","ksig-z-e ln"),$("#zi-"+ksig_czi+"-"+a).attr("class","ksig-z-e n"),ksig_data[ksig_czi].IS=a,$.each(ksig_data[ksig_czi].Itm,function(a,b){""!=b.html&&$("#zi-"+ksig_czi+"-"+a).addClass("gh")}),KSIG_PZI(ksig_czi,a),KSIG_IPS(ksig_czi),KSIG_UN()}}function KSIG_ZPP(){if(!(""==ksig_czi||2>ksig_data[ksig_czi].IC||ksig_data[ksig_czi].MNC&&0==ksig_data[ksig_czi].IS)&&!("undefined"==typeof ksig_data[ksig_czi]||2>ksig_data[ksig_czi].IC)){var a;a=ksig_data[ksig_czi].IS-1,0>a&&(a=ksig_data[ksig_czi].IC-1),$("#zi-"+ksig_czi+"-"+ksig_data[ksig_czi].IS).attr("class","ksig-z-e lp"),$("#zi-"+ksig_czi+"-"+a).attr("class","ksig-z-e p"),ksig_data[ksig_czi].IS=a,$.each(ksig_data[ksig_czi].Itm,function(a,b){""!=b.html&&$("#zi-"+ksig_czi+"-"+a).addClass("gh")}),KSIG_PZI(ksig_czi,a),KSIG_IPS(ksig_czi),KSIG_UN()}}function KSIG_UN(){KSIG_RZN();"undefined"!=typeof ksig_data[ksig_czi]&&ksig_data[ksig_czi].MN&&$("#ksig-z-nav >span").html(ksig_data[ksig_czi].IS+1+ksig_data[ksig_czi].ND+ksig_data[ksig_czi].IC)}function KSIG_RZN(){ksig_data[ksig_czi].MNC&&(0<ksig_data[ksig_czi].IS?$("#ksig-zpnp").removeClass("ksig-nod"):$("#ksig-zpnp").addClass("ksig-nod"),ksig_data[ksig_czi].IS<ksig_data[ksig_czi].IC-1?$("#ksig-zpnn").removeClass("ksig-nod"):$("#ksig-zpnn").addClass("ksig-nod"))}function KSIG_MNG(b){var c,d,e,f,g,h,j,k,l,m,d,n=!1,o=!1,p=!1,q=!1,r=!1,u=!1,v=!1,w=" / ";"undefined"==typeof ksig_data[b]&&(l=$("#"+b).is("[data-title]")?$("#"+b).attr("data-title"):"",m=$("#"+b).is("[download]")?$("#"+b).attr("download"):"",("undefined"!=typeof ksig_forceModeStrict&&ksig_forceModeStrict||$("#"+b).is("[strict]"))&&(o=!0),("undefined"!=typeof ksig_forceModeCover&&ksig_forceModeCover||$("#"+b).is("[cover]"))&&(p=!0),("undefined"!=typeof ksig_forceModeShowNav&&ksig_forceModeShowNav||$("#"+b).is("[nav]"))&&(q=!0,$("#"+b).is("[nav]")&&""!=$("#"+b).attr("nav")&&(w=$("#"+b).attr("nav"))),("undefined"!=typeof ksig_forceModeShowSource&&ksig_forceModeShowSource||$("#"+b).is("[source]"))&&(r=!0),("undefined"!=typeof ksig_forceModeNoCycle&&ksig_forceModeNoCycle||$("#"+b).is("[nocycle]"))&&(v=!0),$("#"+b).is("[force-title]")&&(u=!0),$("#"+b).is("[virt]")&&(n=!0),d=$("#"+b+" > img,#"+b+" > k-img,#"+b+" > k-html").length,1>d||(ksig_data[b]=[],ksig_data[b].ID=b,ksig_data[b].A=!1,ksig_data[b].PP=!1,ksig_data[b].W=0,ksig_data[b].H=0,ksig_data[b].P=0,ksig_data[b].IC=d,ksig_data[b].IS=0,ksig_data[b].T=l,ksig_data[b].MS=o,ksig_data[b].MC=p,ksig_data[b].Rdy=!1,ksig_data[b].RdyZ=!1,ksig_data[b].DD=m,ksig_data[b].ML=r,ksig_data[b].MN=q,ksig_data[b].MFT=u,ksig_data[b].MNC=v,ksig_data[b].ND=w,ksig_data[b].Virt=n,ksig_data[b].Itm=[],c=0,$("#"+b+" > img,#"+b+" > k-img,#"+b+" > k-html").each(function(){if(e="",f="",g="",j="",k=!1,$(this).is("[src]")&&""!=$(this).attr("src")||n&&($(this).is("[src2]")&&""!=$(this).attr("src2")||$(this).is("[zsrc]")&&""!=$(this).attr("zsrc"))){e=$(this).is("[src]")?$(this).attr("src"):"",f=$(this).is("[zsrc]")||$(this).is("[src2]")?$(this).is("[zsrc]")?$(this).attr("zsrc"):$(this).attr("src2"):e,""==f&&(f=e),g=$(this).is("[alt]")&&""!=$(this).attr("alt")?$(this).attr("alt"):l,j=$(this).is("[title]")&&""!=$(this).attr("title")?$(this).attr("title"):l,""==g?g=j:""==j&&(j=g),""!=l&&u&&(j=l),(ksig_data[b].MS||$(this).is("[strict]"))&&(k=!0);var a=[];if($(this).is("[dl-src]")&&""!=$(this).attr("dl-src")){var d,i,m,o=[],p=[];o=$(this).attr("dl-src").split("||"),$(this).is("[dl-name]")&&(p=$(this).attr("dl-name").split("||")),$.each(o,function(b,c){d=c.trim(),"string"==typeof p[b]&&""!=p[b].trim()?i=p[b].trim():""==d?""==f?(m=e.trim().split("/"),i=m[m.length-1]):(m=f.trim().split("/"),i=m[m.length-1]):(m=d.trim().split("/"),i=m[m.length-1]),""==i&&(i="???"),""!=d&&(a[a.length]={src:d,name:i})})}ksig_data[b].Itm[c]={id:c,src:e,srcz:f,w:0,h:0,wz:0,hz:0,alt:g,title:j,srcrdy:!1,srczrdy:!1,strict:k,err:!1,dlist:a,html:""},KSIG_PBI(b,c),c++,c==ksig_data[b].IC&&(ksig_data[b].PP=!0)}else"k-html"==$(this).prop("tagName").toLowerCase()&&(h=$(this).html().trim(),ksig_data[b].Itm[c]={id:c,src:"",srcz:"",w:0,h:0,wz:0,hz:0,alt:"",title:l,srcrdy:!0,srczrdy:!0,strict:!1,err:!1,dlist:[],html:h},KSIG_PBI(b,c),c++,c==ksig_data[b].IC&&(ksig_data[b].PP=!0))}),ksig_data[b].PP=!0,KSIG_CGR(b),ksig_data[b].IC=ksig_data[b].Itm.length,0<ksig_data[b].IC?!n&&KSIG_MNP(b):delete ksig_data[b],$("#"+b).removeAttr("kugal ksig nocycle virt nav download strict source cover force-title data-title")))}function KSIG_MNP(a){var b;b=$("#"+a).html(),$("#"+a).html("<div id=\""+a+"-temporal-holder\" class=\"ksig-nod\">"+b+"</div>"),$("#"+a).prepend("<div class=\"ksig-ic\"><div class=\"ksig-prel\"></div></div>")}function KSIG_Init(){KSIG_Prep();var a;$("[kugal],[ksig]").each(function(){a="undefined"==typeof $(this).attr("id")?KSIG_RID():$(this).attr("id"),$(this).attr("id",a).show(),KSIG_MNG(a)})}$(function(){KSIG_Init()});