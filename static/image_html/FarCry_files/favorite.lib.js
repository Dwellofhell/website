function IMFavorite() {
}

IMFavorite.prototype.checkFavorite = function(type,elementID,action) {
	var urlParams = "action=checkFavorite&type="+type+"&elementID="+elementID;
	$.ajax("/-Engine-/favorites/actions/process.php",{
		data: urlParams,
		dataType: "json",
		type: "GET",
		async: true,
		success: function(data) {
			if (action !== undefined) {
				action(data);
			}
		},
		cache: false
	});
}
IMFavorite.prototype.getFavorites = function(action,type) {
	var type = type !== undefined ? type : "";
	var urlParams = "action=getFavorites&type="+type;
	$.ajax("/-Engine-/favorites/actions/process.php",{
		data: urlParams,
		dataType: "json",
		type: "GET",
		async: true,
		success: function(data) {
			if (action !== undefined) {
				action(data);
			}
		},
		cache: false
	});
}
IMFavorite.prototype.send = function(linkObj,type,elementID,actionResult) {
	var thisObj = this;
	var linkObj = $(linkObj);
	var state = linkObj.attr("data-favorite-state");
	var action = state == "true" ? "delete" : "add";
	var urlParams = "action="+action+"&type="+type+"&elementID="+elementID;
	$.ajax("/-Engine-/favorites/actions/process.php",{
		data: urlParams,
		dataType: "json",
		type: "GET",
		async: false,
		success: function(data) {
			if (data['type'] == "success") {
				if (actionResult !== undefined) {
					actionResult(linkObj,action);
				}
				else {
					if (action == "add") {
						linkObj.html('<span>&#9733;</span> В избранном');
						linkObj.attr("data-favorite-state","true");
					}
					else {
						linkObj.html('<span>&#9734;</span> В избранное');
						linkObj.attr("data-favorite-state","false");
					}
				}
			}
			else {
				var contents = '<div class="title">Избранное</div>'+
				'<div class="contents">'+data['result']+'</div>';
				thisObj.popupShow(contents);
			}
		},
		cache: false
	});
}
IMFavorite.prototype.popupShow = function(contents) {
	$('#uniholder').html('<div class="fade" onclick="javascript:Notify.popupClose();return false;"></div>\
			<div class="notify_popup" onclick="javascript:event.stopPropagation();return true;">\
			'+contents+'</div>');
	this.setWindowCenter($('.notify_popup'));
	var thisObj = this;
	$(document).on('keyup',function(e) {
		var code = e.keyCode || e.which;
		if(code == 27) {
			thisObj.popupClose();
			e.preventDefault();
		}
	});
}
IMFavorite.prototype.popupClose = function() {
	$(document).off('keypress');
	$('#uniholder').empty();
}
IMFavorite.prototype.setWindowCenter = function(jObject,top) {
	if (top === undefined) {
		var top = ($(window).height() - jObject.outerHeight()) / 2 + $(window).scrollTop();
	}
	if (top < 10) {top = 10;}
	jObject.css("position", "absolute");
	var left = ($(window).width() - jObject.outerWidth()) / 2 + $(window).scrollLeft();
	jObject.css("top", top + "px");
	jObject.css("left", left + "px");
}

Favorite = new IMFavorite();