function IMNotify() {
}

IMNotify.prototype.sendData = function(sendData,cb) {
	$.ajax("/-Engine-/notifications/actions/process.php",{
		data: sendData,
		dataType: "JSON",
		type: "get",
		success: data => {
			if (cb !== undefined) {
				cb(data);
			}
		}
	});
}

IMNotify.prototype.checkSubs = function(subs,cb) {
	const sendData = {
		action: "checkSubs",
		checkSubs: subs
	};
	this.sendData(sendData,cb);
}
IMNotify.prototype.getSubscribes = function(cb) {
	const sendData = {
		action: "getSubscribes"
	};
	this.sendData(sendData,cb);
}
IMNotify.prototype.getNotifications = function(cb,params) {
	let sendData = {};
	if (params !== undefined) {
		sendData = params;
	}
	sendData['action'] = "getNotifications";
	this.sendData(sendData,cb);
}
IMNotify.prototype.send = function(linkObj,notifyID) {
	linkObj = $(linkObj);
	const action = linkObj.hasClass("on") ? "deleteSubscribe" : "addSubscribe";
	const sendData = {
		action: action,
		notifyID: notifyID
	};
	this.sendData(sendData,data => {
		if (data['type'] == "success") {
			linkObj.toggleClass("on");
		}
		else {
			let contents = '<div class="title">Произошла ошибка</div>'+
			'<div class="contents">'+data['result']+'</div>';
			this.popupShow(contents);
		}
	});
}
IMNotify.prototype.setNotifyViewed = function(viewed,cb) {
	const sendData = {
		action: "setNotifyViewed",
		viewed: viewed
	};
	this.sendData(sendData,cb);
}
IMNotify.prototype.setEmailSend = function(notifyType,sendEmail,cb) {
	const sendData = {
		action: "setEmailSend",
		notifyType: notifyType,
		sendEmail: sendEmail ? '1' : '0'
	};
	if (typeof(cb) === "object") {
		const current = $(cb);
		cb = data => {
			if (data['type'] == "success") {
				current.toggleClass("on");
			}
			else {
				let contents = '<div class="title">Произошла ошибка</div>'+
					'<div class="contents">'+data['result']+'</div>';
				Notify.popupShow(contents);
			}
		};
	}
	this.sendData(sendData,cb);
}
IMNotify.prototype.setViewSettings = function(materialType,state,cb) {
	let sendData = {
		action: "setViewSettings",
		viewSettings: {}
	};
	sendData['viewSettings'][materialType] = state ? '1' : '0';
	this.sendData(sendData,cb);
}

IMNotify.prototype.popupShow = function(contents) {
	$('#uniholder').html('<div class="fade" onclick="javascript:Notify.popupClose();return false;"></div>\
			<div class="notify_popup" onclick="javascript:event.stopPropagation();return true;">\
			'+contents+'</div>');
	this.setWindowCenter($('.notify_popup'));
	$(document).on('keyup',e => {
		let code = e.keyCode || e.which;
		if(code == 27) {
			this.popupClose();
			e.preventDefault();
		}
	});
}
IMNotify.prototype.popupClose = function() {
	$(document).off('keypress');
	$('#uniholder').empty();
}
IMNotify.prototype.setWindowCenter = function(jObject,top) {
	if (top === undefined) {
		top = ($(window).height() - jObject.outerHeight()) / 2 + $(window).scrollTop();
	}
	if (top < 10) {top = 10;}
	jObject.css("position", "absolute");
	let left = ($(window).width() - jObject.outerWidth()) / 2 + $(window).scrollLeft();
	jObject.css("top", top + "px");
	jObject.css("left", left + "px");
}

Notify = new IMNotify();

//show notifications
$(document).ready(() => {
	let userbox = $(".uprofile_box");
	if (userbox.find(".uprofile_container").length > 0) {
		Notify.getNotifications(data => {
			/*let notifyBell = '<div class="notif_box">\
				<a href="/Profile/" class="notif_box_link">\
					<span class="icon bell">';*/
			if (data['type'] == "success" && data['list'].length > 0) {
				let item = "";
				let viewed = [];
				for (let i in data['list']) {
					item = data['list'][i];
					// check view by current url
					if (window.location.pathname == item['linkPath'] || 
						window.location.pathname == '/Profile/') {
						if (typeof item['ID'] === "object") {
							viewed = viewed.concat(item['ID']);
						}
						else {
							viewed.push(item['ID']);
						}
						data['countAll'] -= 1;
					}
				}
				
				// set viewed by current url
				if (viewed.length > 0) {
					Notify.setNotifyViewed(viewed);
				}
				
				if (parseInt(data['countAll']) > 0) {
					//notifyBell += '<span class="notif_qty">'+data['countAll']+'</span>';
					let notifyCount = '<span class="notif_qty">'+data['countAll']+'</span>';
					$('.icon.bell').html(notifyCount);
				}
			}
			//notifyBell += '</span></a></div>';

			//userbox.after(notifyBell);
			// mobile
			/*let place2 = $(".hmenu_box.htools");
			if (place2.length > 0) {
				place2.find(".uprofile_box").after(notifyBell);
			}*/
		});
	}

	// subs buttons
	$('[data-notifySubs]').each((index,el) => {
		el = $(el);
		const placeType = el.attr('data-notifySubs');
		if (placeType == "gameDetail") {
			const gameID = el.attr('data-gameID');
			const notify = "game_"+gameID;
			Notify.checkSubs([notify],res => {
				el.html('<span class="t_gray">Получать обновления</span>&nbsp;&nbsp;<a nohref class="notify_check'+(res['checkSubs'][notify] ? " on" : "")+'" onclick="Notify.send(this,\''+notify+'\');return false;" title="Подписка на игру"></a>');
			});
		}
		else if (placeType == "inMaterial") {
			const gameID = el.attr('data-gameID');
			const notify = "game_"+gameID;
			Notify.checkSubs([notify],res => {
				el.html('<span class="subscribe_label">Подписаться на игру</span></span>\
				<span class="subscribe_chbox"><a href="#" class="check_tool'+(res['checkSubs'][notify] ? " on" : "")+'" onclick="Notify.send(this,\''+notify+'\');return false;" title="Подписка на игру"></a>');
			});
		}
	});
});