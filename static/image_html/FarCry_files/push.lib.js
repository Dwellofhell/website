// google firebase initial
firebase.initializeApp({
	messagingSenderId: "1051097356779"
});
const messaging = firebase.messaging();

function IMPush() {
	// event listener
	messaging.onMessage(payload => {
		// show push
		this.showPush(payload);
	});
}
IMPush.prototype.showPush = function(payload) {
	const pushUrl = payload.data.click_action;
	let notify = new Notification(payload.notification.title, payload.notification);
	notify.onclick = event => {
		event.preventDefault();
		event.target.close();
	    return window.open(pushUrl,"_blank");
	}
}
IMPush.prototype.addSubscribe = function(subscribeID,needRefresh) {
	const refresh = needRefresh === undefined ? false : needRefresh;

	//window.localStorage.removeItem("push_"+subscribeID); // FIX FOR TEST!
	return new Promise((resolve,reject) => {
		// check subscribe state
		if (!refresh && window.localStorage.getItem("push_state_"+subscribeID) == 0) {
			console.log("addSubscribe: subscribe unset by user");
			resolve();
			return;
		}
		// add new subscribe
		this.askRequest().then(token => {
			if (!refresh && window.localStorage.getItem("push_token_"+subscribeID) == token) {
				console.log("addSubscribe: exists in local storage");
				resolve();
			}
			else {
				const urlParams = {
					action: "addSubscribe",
					token: token,
					subscribeID: subscribeID
				};
				$.ajax("/-Engine-/push/actions/process.php",{
					data: $.param(urlParams),
					type: "post",
					dataType: "JSON",
					success: data => {
						if (data['type'] == "success") {
							window.localStorage.setItem("push_token_"+subscribeID,token);
							window.localStorage.setItem("push_state_"+subscribeID,1);
							console.log("addSubscribe: added on server");
							//console.log("google response:",data['googleResponse']);
							resolve();
						}
						else {
							console.log("addSubscribe: error adding on server");
							reject();
						}
					}
				});
			}
		}).catch(error => {
			//window.localStorage.setItem("push_state_"+subscribeID,0);
			reject();
		});
	});
}
IMPush.prototype.deleteSubscribe = function(subscribeID) {
	return new Promise((resolve,reject) => {
		this.askRequest().then(token => {
			const urlParams = {
				action: "deleteSubscribe",
				token: token,
				subscribeID: subscribeID
			};
			$.ajax("/-Engine-/push/actions/process.php",{
				data: $.param(urlParams),
				type: "post",
				dataType: "JSON",
				success: data => {
					if (data['type'] == "success") {
						console.log("deleteSubscribe: deleted from server");
						window.localStorage.setItem("push_state_"+subscribeID,0);
						window.localStorage.setItem("push_token_"+subscribeID,'');
						resolve();
					}
					else {
						console.log("deleteSubscribe: error delete from server");
						reject();
					}
				}
			});
		}).catch(error => reject());
	});
}
IMPush.prototype.askRequest = function() {
	return new Promise((resolve,reject) => {
		// request permission
		messaging.requestPermission().then(() => {
			console.log("Have permission");
			// get token
			return messaging.getToken();
		}).then(token => {
			console.log("Have token");
			resolve(token);
		}).catch(error => {
			console.log("error ask request:", error);
			reject();
		});
	});
}


function IMPushSub() {
}
IMPushSub.prototype.action = function(pushLinkObj,subscribeID) {
	const subState = window.localStorage.getItem("push_state_"+subscribeID);
	let pushLink = $(pushLinkObj);
	if (subState == 1) {
		push.deleteSubscribe(subscribeID)
			.then(() => this.showLink(subscribeID))
			.catch(error => null);
	}
	else {
		push.addSubscribe(subscribeID,true)
			.then(() => this.showLink(subscribeID))
			.catch(error => null);
	}
}
IMPushSub.prototype.showLink = function(subscribeID) {
	const subState = window.localStorage.getItem("push_state_"+subscribeID);
	let pushLink = $("#pushSubLink");
	if (subState == 1) {
		pushLink.html("Выключить push-уведомления");
		pushLink.removeClass("on").addClass("off");
	}
	else {
		pushLink.html("Включить push-уведомления");
		pushLink.removeClass("off").addClass("on");
	}
	pushLink.unbind('click').click(event => this.action(event.target,subscribeID));
}

let push = new IMPush();
let pushSub = new IMPushSub();

// ask request and subscribe
$(document).ready(() => {
	const subscribeID = "hot";
	push.addSubscribe(subscribeID)
		.then(() => pushSub.showLink(subscribeID)) // refresh link
		.catch(error => null);
	
	// show sub link
	//pushSub.showLink(subscribeID);
});