 var TrackErrSubmitter='/-Engine-/AJAX/trackerr/index.php';
 var TrackErrRootFolder='/-Engine-/SiteTemplates/igromania/js/trackerr/';
 var TrackErrBuffer='';

 function TrackErr_JS_ShowForm(data) {
	$('#TrackErrE').val(data);
	$('#TECPopOk').hide();
	$('#TECFade').show();
	$('#TECPopSend').show();
	$('#TrackErrD').focus();
	$(document).on('keyup',function(e){var code=e.keyCode||e.which;if(code==27){TrackErr_JS_HideForm();e.preventDefault();}}); // Krond: for last JQuery versions...
 }
 function TrackErr_JS_HideForm() {
	$('#TECFade').hide();
	$('#TECPopSend').hide();
	$('#TECPopOk').hide();
	$(document).off('keypress');
 }
 
 function TrackErr_JS_SubmitForm() {
	var a,b,c; a=$('#TrackErrE').val(); b=$('#TrackErrD').val(); c=window.location.pathname;
	$.post(TrackErrSubmitter,{mode:11,ee:a,ed:b,eu:c},function(data){ CLog(data); /* if(data!='') { $('#iks_flow').empty().html(data); */ });
	$('#TrackErrD').val(''); $('#TECPopSend').hide(); $('#TECPopOk').show();
 }
 
 $(function(){$('body').TrackErr();}); // apply tracker to whole body
 (function($){
  jQuery.fn.TrackErr = function(options){
    options = $.extend({
		selectionTimer:false,
		selection:'',
		selectionRange:false,
		selectionRect:false,
		containerShown:false
    }, options);
	
	$('head').append('<link rel="stylesheet" href="'+TrackErrRootFolder+'trackerr.css">');
	
	if(!options.containerShown) {
		if($('#TrackErrCont').length) {
			options.containerShown=true;
		} else {
			$('body').append('<div id="TrackErrCont"></div>');
			options.containerShown=true;
		}
	}
	$('#TrackErrCont').append('<div id="TECAlarmButt" class="trackerr_alarmbutt">Сообщить об ошибке</div>');
	$('#TrackErrCont').append('<div id="TECFade" class="trackerr_fade" onClick="javascript:TrackErr_JS_HideForm();return false;"></div>');
	$('#TrackErrCont').append('<div id="TECPopSend" class="trackerr_popup"><div class="trackerr_title">Сообщить об ошибке</div><div class="trackerr_ftitle">Цитата</div><div class="trackerr_fcont"><textarea name="TrackErrE" id="TrackErrE" readonly class="trackerr_ro"></textarea></div><div class="trackerr_ftitle">Ваш комментарий</div><div class="trackerr_fcont"><textarea name="TrackErrD" id="TrackErrD" class="trackerr_wo"></textarea></div><div class="trackerr_bcont"><div class="trackerr_sbutt" onClick="javascript:TrackErr_JS_SubmitForm();return false;">Отправить</div></div></div>');
	$('#TrackErrCont').append('<div id="TECPopOk" class="trackerr_popupdone"><div class="trackerr_titledone">Спасибо, поправим!</div><div class="trackerr_bcont"><div class="trackerr_sbutt" onClick="javascript:TrackErr_JS_HideForm();return false;">Закрыть</div></div></div>');
	// track if some selected text exist...
	function TrackErrCheckSelected() {
		options.selection = TrackErrGetSelected();
		if(options.selection=='') {
			$('#TECAlarmButt').hide();
		}
	}
	
	function TrackErrGetSelected() {
		if (window.getSelection) { return window.getSelection(); }
		else if (document.getSelection) { return document.getSelection(); }
		else { var selection = document.selection && document.selection.createRange(); if (selection.text) { return selection.text; } return false; }
		return false;
	}
    var make = function() {
		$('#TECAlarmButt').click(function(){ 
			// CLog(TrackErrBuffer);
			TrackErr_JS_ShowForm(TrackErrBuffer);
		});
		$(this).mouseup(function() {
			options.selection = TrackErrGetSelected();
			if(options.selection.toString()+''!='') { TrackErrBuffer = options.selection.toString()+''; }
			if(options.selection) {
				if(options.selection!='') {
					options.selectionRange = options.selection.getRangeAt(0); //get the text range
					options.selectionRect = options.selectionRange.getBoundingClientRect();
			//$('#TECAlarmButt').css('left',options.selectionRect.left+options.selectionRect.width-64).css('top',options.selectionRect.top+options.selectionRect.height+$(document).scrollTop()+4).show();
					$('#TECAlarmButt').css('left',options.selectionRect.left+4).css('top',options.selectionRect.top+options.selectionRect.height+$(document).scrollTop()+4).show();
				} else {
					$('#TECAlarmButt').hide();
				}
			} else { $('#TECAlarmButt').hide(); }
		});
		
		//$(this).mousedown(function() { options.selection = TrackErrGetSelected(); if(options.selection=='') { $('#TECAlarmButt').hide(); } });
		document.addEventListener("selectionchange", function(event) {
			options.selectionTimer=setTimeout(function(){ options.selection = TrackErrGetSelected(); if(options.selection=='') { $('#TECAlarmButt').hide(); } },256);
		});
		
		/*$(document).keydown(function(event) {
			if((event.keyCode == 10 || event.keyCode == 13) && event.ctrlKey) {
			} 
		}); */

		};

		return this.each(make); 
	};
 })(jQuery);
 