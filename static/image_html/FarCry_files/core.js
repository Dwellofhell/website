 var currentTemplateUrl='/-Engine-/SiteTemplates/igromania/';
 var ksig_forceModeCover=true;
 /* Support functions */
 function HistoryPushUrl(url) { history.pushState(null,null,url); }
 function is_exist(data) { if(typeof data === 'undefined') { return false; } if(data) { return true; } return false; }
 function is_object(data) { return data===Object(data); }
 function ReloadPage() { location.reload(true); } // reload current page!
 function RND(min,max) { min=Math.ceil(min); max=Math.floor(max); return Math.floor(Math.random()*(max-min))+min; } // generate random number from min to max (exclusive)
 function RNDI(min,max) { min=Math.ceil(min); max=Math.floor(max); return Math.floor(Math.random()*(max-min+1))+min; } // generate random number from min to max (inclusive)
 function K_JumpToA(id) { $('html,body').stop().animate({'scrollTop':$('#'+id).offset().top-64},128,'swing'); }
 var preventSubmit = function(event) {
	if(event.keyCode == 13) {
		event.preventDefault();
		//event.stopPropagation();
		return false;
	}
 }
 $.fn.hasAttr = function(name) { return this.attr(name) !== undefined; };
 function CLog(text) { if(window.console) { console.log(text); } }
 function E_JS_HideUniholder() { $('#uniholder').empty().html(''); }
 // $("#search").keypress(preventSubmit); $("#search").keydown(preventSubmit); $("#search").keyup(preventSubmit);
 /* Scroll functions */
 document.addEventListener("touchmove", ScrollEvents, false);
 document.addEventListener("scroll", ScrollEvents, false);
 /* var imtvps=false; var currWindowWidth=0; */
 function ScrollEvents() {
	var cpos; cpos=Math.round(window.pageYOffset);
	if(cpos>1) {
		$('div.headerline_outer').addClass('shade');
		Support_JS_ScrollShow();
	} else {
		$('div.headerline_outer').removeClass('shade');
		Support_JS_ScrollHide();
	}
	if(cpos>888) {
		$('.bottom_earn.lp,.bottom_earn.rp').fadeIn(128);
	} else {
		$('.bottom_earn.lp,.bottom_earn.rp').fadeOut(128);
	}
	/*
	if(currWindowWidth>=1900) {
		// mania tv
		var imtvop=$('#imtvp').offset().top+180;
		if(cpos>imtvop&&!imtvps) {
			$('#imtvp').addClass('fimtvp');
			imtvps=true;
		} else if(cpos<=imtvop&&imtvps) {
			$('#imtvp').removeClass('fimtvp');
			imtvps=false;
		}
	}
	*/
 }
 $(function(){var cpos;cpos=Math.round(window.pageYOffset);if(cpos>10){STTC=true;$('#scroll2Top').show();}/*imtvps=false;currWindowWidth=$(window).width();*/ScrollEvents();}); // engage once after page load...
 var STTC=false;
 function Support_JS_ScrollHide() { if(STTC) { STTC=false; $('#scroll2Top').stop().clearQueue().animate({opacity:0.0},128,function(){$('#scroll2Top').hide();}); } }
 function Support_JS_ScrollShow() { if(!STTC) { STTC=true; $('#scroll2Top').stop().clearQueue().animate({opacity:1.0},128,function(){$('#scroll2Top').show();}); } }
 function Support_JS_ScrollToPageTop() { $("html, body").animate({scrollTop:0},128); }
 
 /* Auth */
 var E_Auth_Processing=false;
 function E_JS_Auth_Try() {
	if(E_Auth_Processing) { return false; }
	E_Auth_Processing=true;
	$.post('/-Engine-/AJAX/auth/index.php',{mode:11,process_user_login:1,auth_user_login:$('#AUTH_USER_LOGIN').val(),auth_user_password:$('#AUTH_USER_PWD').val()},function(data){
			if(data!='') { $('#E_Auth_JS').empty().html(data); }
			E_Auth_Processing=false;
		});
 }
 function E_JS_Auth_LogOut() {
	if(E_Auth_Processing) { return false; }
	E_Auth_Processing=true;
	$.post('/-Engine-/AJAX/auth/index.php',{mode:13},function(data){
			if(data!='') { $('#uniholder').empty().html(data); }
			E_Auth_Processing=false;
		});
 } 
 function E_JS_Auth() {
	var redirectUrl = encodeURIComponent(window.location.href);
	$('#uniholder').html('<div class="fade"></div><div class="popup_out noselect" onClick="javascript:E_JS_Auth_Close();return false;"><div class="reg" onClick="javascript:event.stopPropagation();return true;" style="height: 560px;"><div class="reg_ttl">Войти на сайт</div><form onSubmit="javascript:return false;"><input type="Text" class="reg_logpass" name="AUTH_USER_LOGIN" id="AUTH_USER_LOGIN" placeholder="Логин:"><input type="Password" class="reg_logpass" name="AUTH_USER_PWD" id="AUTH_USER_PWD" placeholder="Пароль:"><div class="center"><a nohref class="btn_enter hand" onClick="javascript:return false;">Войти</a></div><div class="warn_box" id="E_Auth_JS"></div><div class="center"><div class="social_ttl">Войти через соц. сети: </div><div class="social_block clearfix" style="margin-bottom: 25px;width:180px;"><a href="/ExtAuth/VK/?authFrom='+redirectUrl+'" class="social vk"></a><a href="/ExtAuth/GP/?authFrom='+redirectUrl+'" class="social gplus"></a><a href="/ExtAuth/OK/?authFrom='+redirectUrl+'" class="social ok"></a><a href="/ExtAuth/ML/?authFrom='+redirectUrl+'" class="social ml"></a></div><div style="margin-bottom: 20px;line-height: 14px;text-align: center;padding-left: 32px;padding-right: 32px;"><label style="font-size: 12px;cursor: pointer;"><input type="checkbox" name="policy" checked id="authPolicy" style="vertical-align: middle;cursor: pointer;" /> Я подтверждаю, что я старше 18 лет, даю свое согласие на обработку персональных данных и принимаю условия <a href="/Docs/UserPolicy/index.html" style="text-decoration: underline" target="_blank">пользовательского соглашения</a></label></div><div class="reglink_box"><a href="/ForgotPassword/" class="reglink">Забыли пароль?</a> | <a href="/Register/" class="reglink">Регистрация</a></div></div></form></div></div>');
	
	// check privacy policy
	$(".reg .btn_enter.hand,.reg a.social").click(function(event) {
		if ($(".reg #authPolicy").prop("checked")) {
			if ($(event.target).hasClass("btn_enter")) {
				E_JS_Auth_Try(); // im auth
			}
			else if ($(event.target).hasClass("social")) {
				return true; // soc auth
			}
		}
		else {
			$(".reg #E_Auth_JS").html("Подтвердите пользовательское соглашение");
		}
		return false;
	});
	
	$(document).on('keyup',function(e){var code=e.keyCode||e.which;if(code==27){E_JS_Auth_Close();e.preventDefault();}}); // Krond: for last JQuery versions...
 }
 function E_JS_Auth_Close() {
	$(document).off('keypress'); $('#uniholder').empty();
 }
 
 /* Wide triple-in-a-row block (mainpage/news) */
 function Core_JS_WideSwitchFolder(element,blockid) {
	var cid;
	cid=$(element).attr('fid');
	if($('#'+blockid).attr('folder')==cid) { return false; }
	$(element).parent().children().each(function(){ $(this).removeClass('on'); }); $(element).addClass('on');
	$('div[group='+blockid+']').each(function(){$(this).hide();}); $('#'+blockid+'_fid'+cid).show();
	$('#'+blockid).attr('page',0);
	$('#'+blockid).attr('folder',cid);
	$('#'+blockid+'_pp').addClass('inactive');
	$('#'+blockid+'_np').removeClass('inactive');
	if($('#'+blockid+'_fid'+cid+'_p1').html()==undefined || $('#'+blockid+'_fid'+cid+'_p1').length<1) { $('#'+blockid+'_np').addClass('inactive'); }
	Core_JS_WideAnimateContainer(blockid);
}
 
 function Core_JS_WideNextPage(blockid) {
	var page,pages,folder;
	folder=$('#'+blockid).attr('folder');
	page=$('#'+blockid).attr('page');
	pages=$('#'+blockid).attr('pages');
	if(page==(pages-1)) { return false; }
	page++;
	if($('#'+blockid+'_fid'+folder+'_p'+page).html()=='' || $('#'+blockid+'_fid'+folder+'_p'+page).html()==undefined) { page--; return false; }
	$('#'+blockid).attr('page',page);
	$('#'+blockid+'_pp').removeClass('inactive');
	$('#'+blockid+'_np').removeClass('inactive');
	if(page==(pages-1) || $('#'+blockid+'_fid'+folder+'_p'+(page+1)).html()==undefined || $('#'+blockid+'_fid'+folder+'_p'+(page+1)).length<1) { $('#'+blockid+'_np').addClass('inactive'); }
	Core_JS_WideAnimateContainer(blockid);
 }

 function Core_JS_WidePrevPage(blockid) {
	var page,pages,folder;
	folder=$('#'+blockid).attr('folder');
	page=$('#'+blockid).attr('page');
	pages=$('#'+blockid).attr('pages');
	if(page==0) { return false; }
	page--;	$('#'+blockid).attr('page',page);
	$('#'+blockid+'_pp').removeClass('inactive');
	$('#'+blockid+'_np').removeClass('inactive');
	if(page==0) { $('#'+blockid+'_pp').addClass('inactive'); }
	Core_JS_WideAnimateContainer(blockid);
 }
 
 function Core_JS_WideShowFolderPage(blockid) {
	var page,folder;
	folder=$('#'+blockid).attr('folder');
	page=$('#'+blockid).attr('page');
	$('#'+blockid+'_container').html($('#'+blockid+'_fid'+folder+'_p'+page).html());
	// EngageZoomer(); // DEPRECATE since 2019-05-21 by Krond (installed new viewer... )
 }
 
 function Core_JS_WideAnimateContainer(blockid) {
	$('#'+blockid+'_container').stop().clearQueue().animate({opacity:0.0}, 64, "swing", function() {
		Core_JS_WideShowFolderPage(blockid);
		$('#'+blockid+'_container').stop().clearQueue().animate({opacity:1.0}, 128);
	}); 
 }
 
 $(function(){$('.hmenu_box').each(function(){$(this).hover(function(){$(this).addClass('on');},function(){$(this).removeClass('on');})});});
 
 /* Container toggler */
 function Toggler(e) { $('#'+e).stop().clearQueue().animate({height:'toggle'},128); }
 function EngageToggler() { $('[toggler=1]').each(function(){ $(this).css('cursor','pointer').click(function(e) { Toggler($(e.target).attr('tid')); }); }); }
 $(function(){EngageToggler();});
 
 /* Footer subscribe */
 $(function(){
	$("#btnSubs").click(function() {
		var sEmail = $("#sEmail").val();
		if (sEmail.length > 0) {
			$.get("/user/subscribe_email.php",
				"sEmail="+sEmail,
				function(data) {
					$(".fsubs1").hide();
					$(".fsubs2").show();
					$(".fsubs2").html(data['message']);
				},
				"JSON"
			);
		}
	});
 });
 
 /* Video player (JW) */
 function Video_JS_EngagePlayer(id,source,img,w,h,srt) {
	if(srt!='') {
		jwplayer(id).setup({
			autostart: false,
			'id': 'JW6_'+id,
			width: w,
			height: h,
			primary: 'html5',
			startparam: 'start','plugins': { '//static.videonow.ru/players_plugins/vn_jwplayer_plugin_6_x_vpaid.swf': { 'vn_profile_id':'119317' } }, 
			image: img,
			sources: [ { file: source, label: 'Video' } ],
			tracks: [{ 
				file: srt, /* "/upload/iblock/582/cae491/subtitles.srt", */
				label: "Russian",
				kind: "captions",
				"default": true 
			}],
			captions: {
				back: false,
				color: "EEE7E0",
				fontsize: 14,
				fontfamily: "Arial"
			},
			abouttext: 'Igromania.Ru', aboutlink: 'https://www.igromania.ru/'
		});
	} else {
		jwplayer(id).setup({
			autostart: false,
			'id': 'JW6_'+id,
			width: w,
			height: h,
			primary: 'html5',
			startparam: 'start','plugins': { '//static.videonow.ru/players_plugins/vn_jwplayer_plugin_6_x_vpaid.swf': { 'vn_profile_id':'119317' } }, 
			image: img,
			sources: [ { file: source, label: 'Video' } ],
			abouttext: 'Igromania.Ru', aboutlink: 'https://www.igromania.ru/'
		});
	}
 }
 
 // promo gallery
 function promoGallery(params) {
	// include libs
	var headerIncludes = '<script src="/-Engine-/Modules/promo.image.gallery/makers/js/popupMaker.lib.js" type="text/javascript"></script>\
		<script src="/-Engine-/Modules/promo.image.gallery/makers/js/listMaker.lib.js" type="text/javascript"></script>\
		<script src="/-Engine-/Modules/promo.image.gallery/js/gallery.lib.js?q1" type="text/javascript"></script>';
	$(document.head).append(headerIncludes);
	
	// init gallery
	var gall = new GalleryMaker({
		appendTo: params['appendTo'],
		galleryID: params['galleryID'],
		onPage: params['onPage'] !== undefined ? parseInt(params['onPage']) : 15,
		sort: params['sort'] !== undefined ? params['sort'] : 'date'
	});
	
	// local function for single photo preload (by url)
	var showSinglePhoto = function(gall) {
		return new Promise(function(resolve,reject) {
			var match = window.location.hash.match(/(image|video)-(\d+)/);
			if (match === null) {
				resolve();
			}
			else {
				$(document).ready(function(){
					gall.getList({
						imageID: match[2]
					}).then(function() {
						gall.images.push(gall.serverResult['list'][0]);
						match[1] == "image" ? gall.openPhoto(0) : gall.openVideo(0);
						// reset object state
						gall.images = [];
						delete gall.sendData['imageID'];
						resolve();
					});
				});
			}
		});
	}
	
	// show single photo by url
	showSinglePhoto(gall).then(function() {
		// show list photos after single photo loaded
		gall.getList().then(function() {
			//
			if (params['fields'] !== undefined) {
				gall.showFields({fields: params['fields']});
			}
			gall.showList();
			if (params['autoload'] !== undefined && params['autoload']) {
				// autoload
				gall.autoload();
			}
		});
	});
}

 /* Domain switcher */
 function DomainSwitcher_JS_SetCookie(name, value, expires) { var d = new Date(); d.setTime(d.getTime() + (expires*24*60*60*1000)); var expiredate = d.toUTCString(); document.cookie = name + "=" + escape(value)+((expires)?"; expires=" + expiredate : "")+";domain=.igromania.ru;path=/;"; }
 function DomainSwitcher_JS_ForceMobile() { DomainSwitcher_JS_SetCookie('DomainSwitcher','mobile',180); location.reload(); }
 function DomainSwitcher_JS_ForceDesktop() { DomainSwitcher_JS_SetCookie('DomainSwitcher','desktop',180); location.reload(); }
 function DomainSwitcher_JS_ForceReset() { DomainSwitcher_JS_SetCookie('DomainSwitcher','',-1); location.reload(); }

 /* K-BSW */
 var BRarr={};
 function K_JS_BSW(id){
	if(!BRarr.hasOwnProperty(id)){return;}// no such data
	if(BRarr[id].TopGap>50){$('body>.outer_outer>.outer_inner>.wrapper_outer').prepend('<div style="height:0px;padding-top:'+BRarr[id].TopGap+'px;"></div>');}
	if(BRarr[id].TopImage!=''){$('body>.outer_outer>.outer_inner').css('background-image','url('+BRarr[id].TopImage+')');}else{$('body>.outer_outer>.outer_inner').css('background-image','none');}
	if(BRarr[id].BottomImage!=''){$('body>.outer_outer').css('background-image','url('+BRarr[id].BottomImage+')');}else{$('body>.outer_outer').css('background-image','none');}
	if(BRarr[id].BackgroundColor==''||BRarr[id].BackgroundColor=='000000'||BRarr[id].BackgroundColor=='000'){$('body').css('background-color','#000');}else{$('body').css('background-color','#'+BRarr[id].BackgroundColor);}
 }
 
 /* K-IKS */
 var ikstval;
 function IKS_Engage() {
	if($('#iks_flow').length==0) { $('body').append('<div id="iks_flow"></div>'); }
	$('div[iks=1]').each(function(){
		ikstval=$(this).html();
		if(ikstval=='' || ikstval===undefined) { // we're not processed this one... yet )
			ikstval=$(this).attr('id'); $(this).removeAttr('iks').addClass('iks_cont');
			$.post('/-Engine-/AJAX/keys.inline.distribution/index.php',{mode:11,eid:$(this).attr('id')},function(data){ if(data!='') { $('#iks_flow').empty().html(data); } });
		}
	});
 }
 function IKS_Get(id) {
	if(id=='') { return false; }
	$.post('/-Engine-/AJAX/keys.inline.distribution/index.php',{mode:13,eid:id},function(data){ if(data!='') { $('#iks_flow').empty().html(data); } });
 }
 
 /* K-Toss */
 function KToss(){0==$("#ktoss_flow").length&&$("body").append('<div id="ktoss_flow"></div>'),$("div[ktoss]").each(function(){$(this).removeAttr("ktoss").addClass("ktoss_cont noselect"),$.post("/-Engine-/AJAX/toss.inline/index.php",{mode:11,eid:$(this).attr("id")},function(t){""!=t&&$("#ktoss_flow").empty().html(t)})})}function KToss_Get(t){if(""==t)return!1;$.post("/-Engine-/AJAX/toss.inline/index.php",{mode:13,eid:t},function(t){""!=t&&$("#ktoss_flow").empty().html(t)})}

 /* News Nav */
 function NewsNav(){$(document).on("keyup",function(e){var t=window.chrome,n=-1<window.navigator.userAgent.indexOf("OPR")||-1<window.navigator.userAgent.indexOf("Opera"),o=null===t||1!=n,t="input"!=document.activeElement.tagName.toLowerCase()&&"textarea"!=document.activeElement.tagName.toLowerCase(),n=e.keyCode||e.which;37==n&&e.ctrlKey&&prevNewsEl&&o&&t&&(window.location.href=prevNewsEl,e.preventDefault()),39==n&&e.ctrlKey&&nextNewsEl&&t&&(window.location.href=nextNewsEl,e.preventDefault())})}