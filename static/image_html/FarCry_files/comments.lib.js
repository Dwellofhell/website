// comments - start

// constructor

// constructor
function IMComment(param) {
	this.param = param;
	this.templ = this.param.get('templ');
	this.event = this.param.get('event');
}
// methods - start
// get comments
IMComment.prototype.getComments = function(params,cb) {
	//
	if (params === undefined) {
		params = {};
	}
	
	// prepare result
	const prepareResult = data => {
		// save result data in global object
		this.param.set("comments",data['comments']);
		this.param.set("user",data['user']);
		this.param.set("countAll",data['countAll']);
		this.param.set("commentUsers",data['commentUsers']);
		if (params['commentID'] === undefined) {
			this.param.set("page",data['page']);
			this.param.set("pages",data['pages']);
		}
		this.param.set("doNotify",data['doNotify']);
	}
	
	// get comments
	params['branch'] = this.param.get("branch");
	params['discussID'] = this.param.get("discussID");
	params['sort'] = this.param.get("sort");
	if (params['commentID'] === undefined && 
		params['cpage'] === undefined && 
		window.location.href.match(/cpage\=\d/) !== null) {
		params['cpage'] = parseInt(window.location.href.replace(/.+cpage\=(\d+).*/,'$1'));
	}
	if (this.param.get('showHidden') === true) {
		params['showHidden'] = 1;
	}
	
	const urlParams = "action=show&"+$.param(params);
	$.ajax(this.param.get("dir")+"actions/process.php",{
		data: urlParams,
		dataType: "JSON",
		type: "post",
		success: data => {
			// prepare result
			prepareResult(data);
			// run callback action
			if (cb !== undefined) {
				cb();
			}
			else {
				// run first action
				this.templ['list'].get("start");
			}
			this.event.init($('#im_comments'));
		}
	});
}
// add comment
IMComment.prototype.add = function(responseTo) {
	//
	let formObj = $("#formCommentSend"+responseTo);
	if (this.param.get('isSendAdd') === true) {
		return false;
	}
	else if (formObj.find("textarea").val().length == 0) {
		return false;
	}
	this.param.set('isSendAdd',true);
	let errorPlace = formObj.find("div.warn_box");
	errorPlace.find("span").html("");
	errorPlace.hide();
	const urlParams = "action=commentSend&branch="+this.param.get('branch')+
		"&discussID="+this.param.get('discussID')+"&response="+responseTo+
		"&"+formObj.find("form").serialize();
	$.ajax(this.param.get("dir")+"actions/process.php",{
		data: urlParams,
		dataType: "JSON",
		//dataType: "HTML",
		type: "post",
		success: data => {
			this.param.set('isSendAdd',false);
			if (data['type'] == "error") {
				const contents = data['result'];
				errorPlace.find("span").html(contents);
				errorPlace.show();
			}
			else {
				const commentID = data['result'];
				//
				if (parseInt(responseTo) !== 0) {
					// remove response form
					formObj.remove();
					// append response comment
					this.getComments({commentID:commentID},() => {
						$("#comment"+responseTo).next("div.comment_responses").append(this.templ['list'].get('comments'));
						fScroll("#comment"+commentID);
					});
				}
				else {
					// clear textarea
					formObj.find("textarea").val("");
					// clear preview
					formObj.find(".comment_preview").html("");
					formObj.find(".comment_preview").hide();
					// show last comments
					const sort = this.param.get("sort");
					if (sort === "asc" || sort === "bad") {
						this.pageSelect("last",() => fScroll("#comment"+commentID));
					}
					else {
						this.pageSelect(1,() => fScroll("#comment"+commentID));
					}
				}
			}
		},
		cache: false
	});
}
// edit comment
IMComment.prototype.edit = function(commentID) {
	let formObj = $("#formCommentSend"+commentID);
	if (formObj.find("textarea").val().length == 0) {
		return false;
	}
	let errorPlace = formObj.find("div.warn_box");
	errorPlace.find("span").html("");
	errorPlace.hide();
	const urlParams = "action=commentEdit&branch="+this.param.get('branch')+
		"&discussID="+this.param.get('discussID')+"&commentID="+commentID+
		"&"+formObj.find("form").serialize();
	$.ajax(this.param.get("dir")+"actions/process.php",{
		data: urlParams,
		dataType: "JSON",
		type: "post",
		success: data => {
			if (data['type'] == "error") {
				const contents = data['result'];
				errorPlace.find("span").html(contents);
				errorPlace.show();
			}
			else {
				//
				formObj.remove();
				this.getComments({commentID:commentID},() => {
					$("#comment"+commentID).replaceWith(this.templ['list'].get('comments'));
					fScroll("#comment"+commentID);
				});
			}
		},
		cache: false
	});
}
// remove comment
IMComment.prototype.remove = function(commentID) {
	const urlParams = "action=commentDelete&branch="+this.param.get('branch')+
		"&discussID="+this.param.get('discussID')+"&commentID="+commentID;
	$.ajax(this.param.get("dir")+"actions/process.php",{
		data: urlParams,
		dataType: "JSON",
		type: "post",
		success: data => {
			if (data['type'] == "error") {
				const contents = "Произошла ошибка! (код ошибки - "+data['result']+")";
				IMCPopup.show({
					title: "Удаление комментария",
					contents: contents,
					buttons: {
						confirm: false,
						cancel: {
							title: "Закрыть"
						}
					}
				});
			}
			else {
				//
				IMCPopup.close();
				$("#comment"+commentID).replaceWith(this.templ['item'].get('deleted',{commentID: commentID}));
			}
		},
		beforeSend: () => {
			IMCPopup.show({
				title: "Отправка данных",
				contents: "Подождите...",
				buttons: false
			});
		},
		cache: false
	});
}
// pages
IMComment.prototype.pageSelect = function(page,cb) {
	let roller = $('.ajaxload');
	roller.show();
	this.getComments({cpage:page},() => {
		//
		roller.hide();
		// add contents
		$('#im_comments_nav_top').html(this.templ['navigation'].get('top'));
		$('#im_comments_list').html(this.templ['list'].get('comments'));
		$('#im_comments_nav_bottom').html(this.templ['navigation'].get('bottom'));
		//
		if (cb !== undefined) {
			cb();
		}
		else {
			fScroll("#im_comments");
		}
	});
}
// hand enter page number
IMComment.prototype.handPageSelect = function(event) {
	const value = parseInt(event.target.value);
	if (isNaN(value) || value < 1 || value > this.param.get("pages")) {
		return false;
	}
	if (event.type == "change") {
		this.pageSelect(value);
	}
	else if (event.type == "keyup") {
		if(event.keyCode == 13) {
			this.pageSelect(value);
			event.preventDefault();
		}
		else if(event.keyCode == 27) {
			this.value = '';
			event.preventDefault();
		}
	}
}
//
IMComment.prototype.preview = function(commentID) {
	let prevPlace = $("#formCommentSend"+commentID).find(".comment_preview");
	let text = $("#formCommentSend"+commentID).find("form textarea").val()
	const prevText = this.param.get("previewText");
	if (text.length == 0) {
		prevPlace.html("");
		prevPlace.hide();
		this.param.set("previewText","");
	}
	else if (text != prevText) {
		if (prevPlace.html().length == 0) {
			prevPlace.html(this.templ['item'].get('preview'));
			prevPlace.show("fast");
		}
		this.param.set("previewText",text);
		text = this.templ['item'].convertTags(text);
		text = this.templ['item'].prepareText(text);
		prevPlace.find(".comment_post").html(text);
	}
}
//
IMComment.prototype.resetForms = function() {
	// remove open forms
	$('div[data-comment-form]:not(div[data-comment-form="0"])').remove();
	// restore comments from edit state
	$(".comment_block:hidden").show();
	//
	$('div[data-comment-form="0"] form textarea').val("");
	this.preview(0);
}
//
IMComment.prototype.addImage = function(commentID,url) {
	IMCPopup.show({
		title: "Отправка данных",
		contents: "Подождите...",
		buttons: false
	});
	let im = new Image();
	let formObj = $("#formCommentSend"+commentID);
	let errorPlace = formObj.find("div.warn_box");
	let tag = "";
	if (url.search(/http(s|)\:\/\//i) === -1) {
		// make image tag
		tag = '[image='+url+']';
		url = this.param.get('dirImage')+url;
	} else if (url.search(/https\:\/\//i) !== -1) {
		// make image url tag
		tag = '[image_url='+url+']';
	}
	else {
		// abort with error
		errorPlace.find("span").html("Ошибка!");
		errorPlace.show();
		IMCPopup.close();
		return false;
	}
	
	im.onload = () => {
		// add image tag in textarea
		let textField = $("#formCommentSend"+commentID).find("form textarea");
		const text = textField.val();
		textField.focus();
		textField.val(text+tag);
		
		//
		this.preview(commentID);
		errorPlace.find("span").html("");
		errorPlace.hide();
		IMCPopup.close();
	}
	im.onerror = () => {
		// abort for don't loaded image
		errorPlace.find("span").html("Ошибка!");
		errorPlace.show();
		IMCPopup.close();
	}
	im.src = url;
}
//
IMComment.prototype.addVideo = function(commentID,url) {
	// detect functions
	const getYoutube = url => url.replace(new RegExp('.*(?:\.be\/|\.com\/watch[?]v\=|\/embed\/)([^\"\']+).*|.*','gi'),'$1');
	const getVimeo = url => url.replace(new RegExp('.*vimeo\.com\/([0-9]+).*|.*','gi'),'$1');
	const getCoub = url => url.replace(new RegExp('.*coub\.com\/view\/(\.+)|.*','gi'),'$1');
	
	//
	let formObj = $("#formCommentSend"+commentID);
	let errorPlace = formObj.find("div.warn_box");
	
	// make video tag
	let tag = '[video=';
	const youtube = getYoutube(url);
	const vimeo = getVimeo(url);
	const coub = getCoub(url);
	if (youtube.length > 0) {
		tag += 'youtube='+youtube+']';
	}
	else if (vimeo.length > 0) {
		tag += 'vimeo='+vimeo+']';
	}
	else if (coub.length > 0) {
		tag += 'coub='+coub+']';
	}
	else {
		// abort for don't detect video
		errorPlace.find("span").html("Ошибка!");
		errorPlace.show();
		IMCPopup.close();
		return;
	}
	
	// add video tag in textarea
	let textField = $("#formCommentSend"+commentID).find("form textarea");
	let text = textField.val();
	textField.focus();
	textField.val(text+tag);
	
	//
	this.preview(commentID);
	errorPlace.find("span").html("");
	errorPlace.hide();
	IMCPopup.close();
}
// methods - end

// mobile version - start
function IMCommentMobile(param) {
	IMComment.prototype.constructor.call(this,param);
}
IMCommentMobile.prototype = Object.create(IMComment.prototype);
IMCommentMobile.prototype.constructor = IMCommentMobile;
//
IMCommentMobile.prototype.addImage = function(commentID,url) {
	IMComment.prototype.addImage.call(this,commentID,url);
	let formObj = $("#formCommentSend"+commentID);
	let targetBox = formObj.find('#commentTools');
	targetBox.html("");
}
IMCommentMobile.prototype.addVideo = function(commentID,url) {
	IMComment.prototype.addVideo.call(this,commentID,url);
	let formObj = $("#formCommentSend"+commentID);
	let targetBox = formObj.find('#commentTools');
	targetBox.html("");
}
//mobile version - end

// comments template
function IMCommentTemplate(param) {
	this.param = param;
}
IMCommentTemplate.prototype.get = function(type,params) {
	const key = '_'+type;
	return key in this ? this[key](params) : "";
}

// comments list template
function IMCommentList(param) {
	IMCommentTemplate.prototype.constructor.call(this,param);
}
IMCommentList.prototype = Object.create(IMCommentTemplate.prototype);
IMCommentList.prototype.constructor = IMCommentList;
IMCommentList.prototype._start = function(params) {
	// add base HTML blocks
	$('#im_comments').html('<div id="im_comments_nav_top"></div>\
		<div id="im_comments_list" class="comments_wrapper"></div>\
		<div id="im_comments_nav_bottom"></div>\
		<div id="im_comments_form"></div>');
	// add contents
	const navigation = this.param.get('templ')['navigation'];
	const form = this.param.get('templ')['form'];
	$('#im_comments_nav_top').html(navigation.get('top'));
	$('#im_comments_list').html(this.get('comments'));
	$('#im_comments_nav_bottom').html(navigation.get('bottom'));
	$('#im_comments_form').html(form.get('def',{ID:0}));
	// comments count
	$(".comments .comments_count").html("("+this.param.get('countAll')+")");
	
	// check access for privacy policy
	const user = this.param.get('user');
	if (user['ID'] === undefined) {
		$("#im_comments_form a.social").click(() => {
			if ($("#commentAuthPolicy").prop("checked")) {
				return true; // soc auth
			}
			else {
				IMCPopup.show({
					title: "Подтвердите пользовательское соглашение",
					buttons: false
				});
				return false;
			}
		});
	}
	
	// auto resize videos
	$(window).resize(() => {
		$("#im_comments .comment_video iframe").each((i,el) => {
			let videoFrame = $(el);
			videoFrame.css("height",Math.round(videoFrame.width()/1.78)+"px");
		});
	});
}
IMCommentList.prototype._comments = function(comments) {
	if (this.param.get('comments').length == 0) {
		return '<div class="comments_start_info">Дискуссия еще не началась. Вы можете оставить первый комментарий.</div>';
	}
	
	//
	let result = "";
	if (comments === undefined) {
		comments = this.param.get('comments');
	}
	const users = this.param.get('commentUsers');
	const user = this.param.get('user');
	
	const itemTempl = this.param.get('templ')['item'];
	
	let lastLevel = 0;
	let currentLevel = 0;
	let nextLevel = 0;
	for (let i in comments) {
		i = parseInt(i);
		lastLevel = i > 0 ? parseInt(comments[i-1]['level']) : 1;
		currentLevel = parseInt(comments[i]['level']);
		nextLevel = i+1 == comments.length ? 1 : parseInt(comments[i+1]['level']);
		
		// put responses into div tag
		if (currentLevel > lastLevel) {
			result += '<div class="comment_responses">';
		}
		
		//
		comments[i]['user'] = users[comments[i]['userID']];
		if (comments[i]['typeModify'] == "delete") {
			result += itemTempl.get('deleted',{commentID: comments[i]['ID']});
		}
		else if (comments[i]['typeModify'] == "hide" && !user['canModerate']) {
			result += itemTempl.get('hidden',{commentID: comments[i]['ID']});
		}
		else {
			// save comment text in global object
			this.param.set("comment"+comments[i]['ID'],comments[i]['text']);
			//
			result += itemTempl.get('full',comments[i]);
			if (nextLevel <= currentLevel) {
				result += '<div class="comment_responses"></div>';
			}
		}
		
		// close tags for responses div
		if (nextLevel < currentLevel) {
			for (let i = 0;i < currentLevel - nextLevel;i+=1) {
				result += '</div>';
			}
		}
	}
	
	return result;
}

// comment item template
function IMCommentItem(param) {
	IMCommentTemplate.prototype.constructor.call(this,param);
}
IMCommentItem.prototype = Object.create(IMCommentTemplate.prototype);
IMCommentItem.prototype.constructor = IMCommentItem;
IMCommentItem.prototype._full = function(data) {
	const template = '<div class="comment_block" id="comment<!--f.ID-->" data-comment-response="<!--f.responseTo-->">\
		<div class="comment_avatar">\
			<a nohref data-comClick="quote" data-commentID="<!--f.ID-->" data-skipText="yes"><img src="<!--u.avatar-->" alt="" title=""/></a>\
			<div class="uname_id">#<!--u.ID--></div>\
		</div>\
		<div class="comment_box">\
			<div class="comment_head">\
				<div class="comment_likes">\
					<div class="unlike_count">\
						<span><!--f.minus--></span><!--f.minusLink-->\
					</div>\
					<div class="like_count">\
						<span><!--f.plus--></span><!--f.plusLink-->\
					</div>\
				</div>\
				<a nohref class="uname<!--u.moderCSS-->" data-comClick="quote" data-commentID="<!--f.ID-->" data-skipText="yes"><!--u.name--></a>\
				<span class="comment_date"><!--f.dateCreate--></span>\
			</div>\
			<!--f.moderPanel-->\
			<div class="comment_post"><!--f.text--></div>\
			<div class="comment_tools">\
				<!--f.userPanel-->\
			</div>\
			<div class="fast_replay"></div>\
		</div>\
	</div>';
	
	//
	let result = template;
	let user = this.param.get('user');
	let userPanel = "";
	let moderPanel = "";
	let moderPanelEx = "";
	if (data['branch'] === undefined) {
		data['branch'] = this.param.get("branch");
	}
	let commentUser = {};
	if (data['user'] === undefined || data['user']['name'] === undefined) {
		commentUser = {
			ID: 0,
			name: "<span style='font-style: italic;'>&lt;&lt; Пользователь удалён &gt;&gt;</span>",
			avatar: "https://cdn.igromania.ru/-Engine-/SiteTemplates/igromania/images/misc/default_avatar.png"
		};
	}
	else {
		commentUser = data['user'];
	}
	const hideOverflow = data['text'].length > 650;
	
	// prepare text
	data['text'] = this.prepareText(data['text']);
	
	// slightly hide comment if his text is unpopular
	/*if (data['plus'] - data['minus'] < -5) {
		data['text'] = '<div class="comment_text_unpopular">'+data['text']+'</div> '+
			'<a href="#" onclick="IMC.commentOverflow(this);return false;">развернуть</a>';
	}*/
	
	// hidden overflow text
	if (data['typeModify'] == "hide") {
		data['text'] = '<div class="comment_text_hide">'+data['text']+'</div> '+
			'<a href="#" data-comClick="commentOverflow">развернуть</a>';
	}
	else if (hideOverflow) {
		data['text'] = '<div class="comment_text_overflow">'+data['text']+'</div> '+
			'<a href="#" data-comClick="commentOverflow">развернуть</a>';
	}
	
	// modify info
	if (data['dateModify'] &&
		data['typeModify'] === "edit") {
		data['text'] += '<div class="comment_modify_info">\
			Отредактировано:  '+data['dateModify']+'</div>';
	}
	
	// likes
	data['plusLink'] = '<a nohref class="icon like'+(data['userVote'] === "plus" ? ' me' : '')+'"\
			data-comClick="event" data-commentID="'+data['ID']+'" data-value="plus"></a>';
	data['minusLink'] = '<a nohref class="icon unlike'+(data['userVote'] === "minus" ? ' me' : '')+'"\
			data-comClick="event" data-commentID="'+data['ID']+'" data-value="minus"></a>';
	
	// user panel
	if (parseInt(commentUser['ID']) != parseInt(user['ID'])) {
		userPanel += data['userComplaint'] !== undefined ? 
				'<a nohref class="complain" style="color: red;cursor: default;">Ваша жалоба принята</a>' : 
				'<a nohref class="complain" data-comClick="event" data-commentID="<!--f.ID-->" data-value="complaint">Пожаловаться</a>';
	}
	if (user['canAdd']) {
		userPanel += '<a nohref data-comClick="response" data-commentID="<!--f.ID-->">Ответить</a>\
				<a nohref data-comClick="quote" data-commentID="<!--f.ID-->">Процитировать</a> ';
	}
	if (data['canEdit']) {
		userPanel += '<a nohref data-comClick="editDialog" data-commentID="<!--f.ID-->">Редактировать</a> ';
	}
	if (data['canDelete']) {
		userPanel += '<a nohref data-comClick="removeDialog" data-commentID="<!--f.ID-->">Удалить</a> ';
	}
	userPanel += '<div style="clear: both"></div>';
	result = result.replace("<!--f.userPanel-->",userPanel);
	
	// moder panel
	if (user['canModerate']) {
		moderPanel += '<div class="comment_moderator_block">';
		moderPanelEx += '<div class="moderPanelEx"><div style="display: none;">';
		moderPanelEx += '<a nohref data-comClick="closeModerPanelEx" class="closePanel">x</a>';
	
		// ban functions
		if (commentUser['ID'] == 0) {
			moderPanel += '<a nohref class="marked" style="cursor: default;">Удалён</a> ';
		}
		else if (commentUser['isBanned']) {
			moderPanel += '<a nohref data-comClick="unbanDialog" data-commentID="<!--f.ID-->" data-userID="<!--f.userID-->" class="marked">Забанен</a> ';
		}
		else {
			moderPanel += '<a nohref data-comClick="ban" data-userID="<!--f.userID-->" data-commentID="<!--f.ID-->" data-branch="<!--f.branch-->" data-banLength="10080">Бан на неделю</a>';
			moderPanel += '<a nohref data-comClick="ban" data-userID="<!--f.userID-->" data-commentID="<!--f.ID-->" data-branch="<!--f.branch-->" data-banLength="52560000">Бан пожизненно</a>';
			moderPanelEx += '<a nohref data-comClick="banDialog" data-userID="<!--f.userID-->" data-commentID="<!--f.ID-->" data-branch="<!--f.branch-->">Бан</a>';
		}
	
		// hide/active functions
		if (data['typeModify'] == "hide") {
			moderPanel += '<a nohref data-comClick="commentActiveDialog" data-branch="<!--f.branch-->" data-commentID="<!--f.ID-->" class="marked">Сообщение скрыто</a> ';
		}
		else {
			moderPanel += '<a nohref data-comClick="commentHide" data-branch="<!--f.branch-->" data-commentID="<!--f.ID-->">Скрыть</a>';
			moderPanel += '<a nohref data-comClick="allCommentsHideDialog" data-commentID="<!--f.ID-->" data-userID="<!--f.userID-->">Скрыть всё</a>';
			moderPanelEx += '<a nohref data-comClick="commentHideDialog" data-branch="<!--f.branch-->" data-discussID="<!--f.discussID-->" data-commentID="<!--f.ID-->" data-userID="<!--f.userID-->">Скрыть</a>';
		}
		
		// complaints
		if (parseInt(data['complaints']) > 0) {
			moderPanel += '<a nohref class="marked" style="cursor: default">Жалоб: '+data['complaints']+'</a> ';
		}
		
		//
		moderPanelEx += '<a href="'+this.param.get('dir')+'moder/pages/banList.php" target="_blank">Бан-лист</a>';
		if (this.param.get('showHidden') === true) {
			moderPanelEx += '<a nohref data-comClick="skipHidden">Не показывать скрытые комментарии</a> ';
		}
		else {
			moderPanelEx += '<a nohref data-comClick="showHidden">Показывать скрытые комментарии</a> ';
		}
		moderPanelEx += '<a href="'+this.param.get('dir')+'moder/pages/comments.php?userID=<!--f.userID-->" target="_blank">Все сообщения пользователя</a>';
		moderPanelEx += '<a href="'+this.param.get('dir')+'moder/pages/comments.php?branch=<!--f.branch-->&commentID=<!--f.ID-->" target="_blank">Подробно о сообщении</a>';
		moderPanelEx += '</div></div>';
		
		//
		moderPanel += '<a nohref data-comClick="moderPanelEx">...</a>';
		moderPanel += moderPanelEx;
		
		moderPanel += '</div>';
	}
	result = result.replace("<!--f.moderPanel-->",moderPanel);
	
	// replace comment fields
	for (let key in data) {
		result = result.replace(new RegExp("<!--f."+key+"-->","g"),data[key]);
	}
	
	// replace user fields
	commentUser['moderCSS'] = "";
	if (commentUser['isModer']) {
		commentUser['moderCSS'] = " moderName";
	}
	for (let key in commentUser) {
		result = result.replace(new RegExp("<!--u."+key+"-->","g"),commentUser[key]);
	}
	if (commentUser['isBanned']) {
		result = result.replace("<!--u.banInfo-->","Banned");
	}
	
	return result;
}
IMCommentItem.prototype._preview = function(params) {
	let preview = $(this.get('full',{
		ID: 0,
		user: this.param.get('user'),
		text: "",
		plus: 0,
		minus: 0,
		responses: {}
	}));
	// cut excess parts
	preview.find(".comment_tools,.comment_moderator_block,.comment_likes").html("");
	// return as HTML
	return preview.get(0).outerHTML;
}
IMCommentItem.prototype._empty = function(params) {
	const template = '<div class="comment_block" id="comment<!--f.ID-->">\
		<div class="comment_box" style="margin-left: 0px">\
			<div class="comment_post"><!--f.text--></div>\
		</div>\
	</div>';
	let result = template;
	for (let key in params) {
		result = result.replace(new RegExp("<!--f."+key+"-->","g"),params[key]);
	}
	
	return result;
}
IMCommentItem.prototype._hidden = function(params) {
	return this.get('empty',{
		ID: params['commentID'],
		text: '<span style="font-size: 12px;color: #dedede;font-style: italic">Сообщение удалено модератором</span>' 
	});
}
IMCommentItem.prototype._deleted = function(params) {
	return this.get('empty',{
		ID: params['commentID'],
		text: '<span style="font-size: 12px;color: #dedede;font-style: italic">Сообщение удалено автором</span>' 
	});
}
IMCommentItem.prototype.convertTags = function(text) {
	const map = {
		'&': '&amp;',
		'<': '&lt;',
		'>': '&gt;',
		'"': '&quot;',
		"'": '&#039;'
	};
	return text.replace(/[&<>"']/g, m => map[m]);
}
IMCommentItem.prototype.unconvertTags = function(text) {
	const map = {
		'&lt;': '<',
		'&gt;': '>',
		'&quot;': '"',
		'&#039;': "'",
		'&amp;': '&' // this only last!
	};
	for (let code in map) {
		text = text.replace(new RegExp(code,'g'), map[code]);
	}
	return text;
}
IMCommentItem.prototype.prepareText = function(text) {
	if (text === null) {
		return "";
	}
	//text = this.convertTags(text);
	//
	text = text.replace(/\r\n|\n|\r/g," <br /> ");
	text = text.replace(/\[video\=(youtube|vimeo|coub)\=([^\]\"\'\&\s]+)\]/gi,'<div class="comment_video $1" \
			data-videoID="$2" data-videoType="$1" data-comClick="showVideo">Видео: $1<div></div></div>');
	text = text.replace(/\[image\=([^\]\"\'\&\s]+)\]/gi,'<div class="comment_image">\
			<img src="'+this.param.get('dirImage')+'$1" border="0" alt="" /></div>');
	text = text.replace(/\[image_url\=https\:\/\/([^\]\"\'\&\s]+)\]/gi,'<div class="comment_image">\
			<img src="https://$1" border="0" alt="" /></div>');
	text = text.replace(/\[((?:\/|)(?:b|i))\]/g,"<$1>");
	text = text.replace(/\[quote\]/g,'<div class="comment_quote">');
	text = text.replace(/\[\/quote\]/g,'</div>');
	text = text.replace(/\[user\_q\=([^\[]+\[[a-z]{2}\]|[^\]\"\'\&]*)\]/gi,
			'<div class="comment_quote_uname"><a nohref class="uname" style="cursor: default">$1</a></div>');
	text = text.replace(/\[user\=([^\[]+\[[a-z]{2}\]|[^\]\"\'\&]*)\]/gi,
			'<a nohref class="uname" style="cursor: default">@$1</a>');
	text = text.replace(/(^|[^"'=])((?:https\:\/\/(?:www\.|)|www\.)([^\s<>\"\']+))/gi,
			(match,m1,m2,m3,str) => {
				let url = m2.search(/https/i) === -1 ? "https://"+m2 : m2;
				if (m2.length > 60) {
					m2 = m2.substr(0,50)+'...';
				}
				return m1+'<a href="'+url+'" target="_blank" rel="nofollow">'+m2+'</a>';
			});
	
	return text;
}

// navigation template
function IMCommentNavigation(param) {
	IMCommentTemplate.prototype.constructor.call(this,param);
}
IMCommentNavigation.prototype = Object.create(IMCommentTemplate.prototype);
IMCommentNavigation.prototype.constructor = IMCommentNavigation;
IMCommentNavigation.prototype._navigation = function(params) {
	const page = parseInt(this.param.get('page'));
	const pages = parseInt(this.param.get('pages'));
	
	let result = "";
	
	const linkSet = (page,curPage) => {
		if (page == curPage) {
			return '<a nohref class="on">'+page+'</a> ';
		}
		else {
			let href = window.location.href.replace(/(?:[?&])cpage\=[^&]*/,'');
			href += (href.match(/[?]/) === null ? '?' : '&')+'cpage='+page;
			return '<a href='+href+' data-comClick="pageSelect" data-page="'+page+'" \
				data-cpage-link="'+page+'">'+page+'</a> ';
		}
	}
	
	if (pages > 1) {
		result += '<div class="pages clearfix_l">';
		
		if (page > 1) {
			result += '<a nohref data-comClick="pageSelect" data-page="'+(page - 1)+'" class="lnav_arrow">\
				<span class="icon prev_page"></span></a>';
		}
		else {
			result += '<a nohref class="lnav_arrow inactive"> \
				<span class="icon prev_page"></span></a>';
		}
		
		if (pages > 15) {
			let start = 1;
			let end = 3;
			if (page > 2 && page < 7) {
				end = 7;
			}
			for (let i = start;i <= end;i += 1) {
				result += linkSet(i,page);
			}
			if (page > 6 && page < pages - 5) {
				result += '<span>. . .</span>';
				for (let i = page-2;i <= page+2;i += 1) {
					result += linkSet(i,page);
				}
			}
			if (pages - 6 > 0) {
				start = pages - 2;
				if (pages - page  > 1 && pages - page < 6) {
					start = pages - 6;
				}
				result += '<span>. . .</span>';
				for (let i = start;i <= pages;i += 1) {
					result += linkSet(i,page);
				}
			}
		}
		else {
			for (let i = 1;i <= pages;i += 1) {
				result += linkSet(i,page);
			}
		}
		if (page < pages) {
			result += '<a nohref data-comClick="pageSelect" data-page="'+(page + 1)+'" class="rnav_arrow"> \
					<span class="icon next_page"></span></a>';
		}
		else {
			result += '<a nohref class="rnav_arrow inactive"> \
					<span class="icon next_page"></span></a>';
		}
		
		result += '<input type="text" class="inp_page" placeholder="№" \
					onchange="IMC.handPageSelect(event);return false;" \
					onkeyup="IMC.handPageSelect(event);return false;" title="Перейти на страницу...">';
		result += '<img src="'+this.param.get('dir')+'templates/igromania/images/ajax.gif" alt="" \
					class="ajaxload" style="display: none;">';
		result += '</div>';
	}
	
	return result;
}
IMCommentNavigation.prototype._top = function(params) {
	let result = "";
	const sort = this.param.get("sort");
	const user = this.param.get('user');
	if (this.param.get('countAll') > 0) {
		result = '<div class="comments_body_header">';
		if (user['ID'] !== undefined) {
			result += '<a nohref class="btn blue_btn" onclick="$(\'#im_comments_form textarea\').focus();return false;">Добавить комментарий</a>';
		}
		result += '<div class="comments_header_tools">\
				Показать:\
				<a nohref '+(sort == "desc" ? 'class="on"' : '')+' data-comClick="sort" data-type="desc">Новые</a>\
				<a nohref '+(sort == "asc" ? 'class="on"' : '')+' data-comClick="sort" data-type="asc">Старые</a>\
				<a nohref '+(sort == "best" ? 'class="on"' : '')+' data-comClick="sort" data-type="best">Лучшие</a>\
				<a nohref '+(sort == "bad" ? 'class="on"' : '')+' data-comClick="sort" data-type="bad">Худшие</a>\
			</div>\
		</div>'+this._navigation();
	}
	
	return result;
}
IMCommentNavigation.prototype._bottom = function(params) {
	let result = "";
	const page = parseInt(this.param.get('page'));
	const pages = parseInt(this.param.get('pages'));
	if (pages > 0) {
		if (page < pages) {
			result = '<div class="more_comments center">\
				<a nohref data-comClick="more" data-page="'+(page + 1)+'">\
				Загрузить ещё комментарии <span class="icon expand"></span></a></div>';
		}
		//result += '<div class="comments_body_header">'+this.navigation()+'</div>';
		result += this._navigation();
	}
	return result;
}

// form template
function IMCommentForm(param) {
	IMCommentTemplate.prototype.constructor.call(this,param);
}
IMCommentForm.prototype = Object.create(IMCommentTemplate.prototype);
IMCommentForm.prototype.constructor = IMCommentForm;
IMCommentForm.prototype._def = function(params) {
	const user = this.param.get('user');
	if (user['ID'] === undefined) {
		return this.get('auth');
	}
	if (params === undefined) {
		params = {};
	}
	if ('text' in params === false) {
		params['text'] = "";
	}
	const template = '<div id="formCommentSend<!--f.ID-->" data-comment-form="<!--f.ID-->">\
		<div class="warn_box" style="display: none;">\
			<a nohref class="icon close" onclick="$(this).parent().hide();return false;"></a>\
			<span></span>\
		</div>\
		<div class="postcomment_block">\
			<div class="postcomment_avatar">\
				<a nohref><img src="<!--u.avatar-->" alt="" title=""/></a>\
			</div>\
			<div class="postcomment_box">\
				<div class="postcomment_form_box">\
					<form action="" method="post">\
						<textarea name="commentText" class="post_comm" placeholder="Комментарий" onkeyup="event.ctrlKey && event.keyCode == 13 ? IMC.add(<!--f.ID-->) : IMC.preview(<!--f.ID-->);"><!--f.text--></textarea>\
						<input type="hidden" name="hash" value="<!--u.hash-->">\
					</form>\
					<div class="editor_btns">\
						<a nohref class="edit_btn bold" data-comClick="addTag" data-commentID="<!--f.ID-->" data-tag="b">B</a>\
						<a nohref class="edit_btn ital" data-comClick="addTag" data-commentID="<!--f.ID-->" data-tag="i">I</a>\
					</div>\
				</div>\
				<div class="postcomment_inf">\
					Пожалуйста, высказывайтесь вежливо и по теме. Правила <a href="/Docs/CommentsRules/index.html">здесь</a>. Обратиться в службу модерации: <a nohref>здесь</a>.\
				</div>\
				<div class="postcomment_tools">\
					<div class="comment_buttons">\
						<a nohref class="btn blue_btn" data-comClick="send" data-commentID="<!--f.ID-->">Отправить</a>\
						<a nohref class="icon attache attache_video" data-comClick="videoDialog" data-commentID="<!--f.ID-->"></a>\
					</div>\
					<div class="comment_notify"></div>\
				</div>\
				<div id="commentTools"></div>\
			</div>\
		</div>\
		<div class="comment_preview"></div>\
	</div>';
	
	let result = "";
	if (!user['canAdd']) {
		if (user['userID'] == 0) {
			result = "Чтобы оставлять комментарии вам необходимо авторизоваться";
		}
		else if (user['isBanned']) {
			result = "Вы забанены";
		}
		else if (!user['isConfirmed']) {
			result = 'Чтобы оставлять комментарии вам необходимо подтвердить свой email. '+
					'<a href="/Profile/" style="text-decoration: underline">Перейти в личный кабинет</a>';
		}
	}
	else {
		result = template;
		for (let key in params) {
			result = result.replace(new RegExp("<!--f."+key+"-->","g"),params[key]);
		}
		
		// show notify
		if (this.param.get('doNotify') && 'Notify' in window) {
			const notifyResponse = 'commentResponse_'+user['ID'];
			Notify.checkSubs([notifyResponse],res => {
	      			$('.comment_notify').html('<strong>Уведомления:</strong>&nbsp;&nbsp; \
	      			Ответы <a nohref class="notify_check'+(res['checkSubs'][notifyResponse] ? " on" : "")+'" '+
					  'onclick="Notify.setEmailSend(\'commentResponse\','+(res['checkSubs'][notifyResponse] ? "false" : "true")+',this);return false;"'+
					  ' title="Получать e-mail уведомления об ответах на свои комментарии"></a>');
				}
			);
		}
		
		for (let key in user) {
			result = result.replace(new RegExp("<!--u."+key+"-->","g"),user[key]);
		}
	}
	
	return result;
}
IMCommentForm.prototype._edit = function(params) {
	let itemTempl = this.param.get('templ')['item'];
	let text = "text" in params ? itemTempl.unconvertTags(params['text']) : "";
	const commentID = parseInt(params['ID']);
	let form = $(this.get('def',params));
	form.css({"padding-bottom": "15px",
		"border-bottom": "1px solid #dedede",
		"margin-bottom": "25px"});
	// add cancel button
	let cancel = $('<a nohref class="btn blue_btn" data-comClick="cancel" data-commentID="'+commentID+'">Отменить</a>');
	form.find('[data-comClick="send"]').attr("data-comClick","edit").after(cancel);
	return form.get(0).outerHTML;
}
IMCommentForm.prototype._auth = function(params) {
	const redirectUrl = encodeURIComponent(window.location.href);
	return '<div class="comments_start_info">Авторизуйтесь, чтобы принять участие в обсуждении.</div>\
	<div class="login_block">\
		<span class="social_login">\
			<a href="/ExtAuth/VK/?authFrom='+redirectUrl+'" class="social vk" onclick=""></a>\
			<!--a href="/ExtAuth/FB/?authFrom='+redirectUrl+'" class="social fb"></a-->\
			<a href="/ExtAuth/ML/?authFrom='+redirectUrl+'" class="social mru"></a>\
			<a href="/ExtAuth/OK/?authFrom='+redirectUrl+'" class="social ok"></a>\
			<a href="/ExtAuth/GP/?authFrom='+redirectUrl+'" class="social gplus"></a>\
		</span>\
		<a nohref data-comClick="auth">Войти под своим логином</a>\
		<a href="/Register/">Зарегистрироваться</a>\
	</div>\
	<div style="margin-top: 20px;line-height: 14px;text-align: center;padding-left: 60px;padding-right: 60px;">\
		<label style="font-size: 12px;cursor: pointer;">\
			<input type="checkbox" name="policy" checked id="commentAuthPolicy" style="vertical-align: middle;cursor: pointer;" /> \
			Я подтверждаю, что я старше 18 лет, даю свое согласие на обработку персональных данных и принимаю условия \
			<a href="/Docs/UserPolicy/index.html" style="text-decoration: underline" target="_blank">пользовательского соглашения</a>\
		</label>\
	</div>';
}

// dialog templates
function IMCommentDialog(param) {
	IMCommentTemplate.prototype.constructor.call(this,param);
}
IMCommentDialog.prototype = Object.create(IMCommentTemplate.prototype);
IMCommentDialog.prototype.constructor = IMCommentDialog;
IMCommentDialog.prototype._remove = function(params) {
	IMCPopup.show({
		title:"Удалить комментарий?",
		buttons: {
			confirm: {
				title: "Удалить",
				click: params['click']
			}
		}
	});
}
IMCommentDialog.prototype._image = function(params) {
	IMCPopup.show({
		other: '<div class="upload">\
					<div class="upload_in" id="commentImageUploadContainer">'+
						/*<a nohref class="btn green_btn" id="commentImageUpload">Загрузить картинку</a>\
						<span id="commentUploadProgress"></span>\
						<div class="upload_info">Максимальный размер изображения 2 Мб</div>\
						<div class="sep"></div>*/
						'<div class="upload_info1">Вставить картинку ссылкой</div>\
						<div class="upload_inpbox">\
							<input type="Text" class="upload_inp" placeholder="Адрес файла" onkeyup="event.keyCode == 13 ? IMC.addImage('+params['commentID']+',$(this).val()) : false;"/>\
							<a nohref class="btn_ok" data-comClick="addImage" data-commentID="'+params['commentID']+'"><span class="icon oke"></span></a>\
						</div>\
					</div>\
				</div>',
		buttons: false
	});
}
IMCommentDialog.prototype._video = function(params) {
	IMCPopup.show({
		other: '<div class="upload v2">\
					<div class="upload_in">\
						<div class="upload_info1">Прикрепить видео</div>\
						<div class="upload_inpbox">\
							<input type="Text" class="upload_inp" placeholder="Адрес файла" onkeyup="event.keyCode == 13 ? IMC.addVideo('+params['commentID']+',$(this).val()) : false;"/>\
							<a nohref class="btn_ok" data-comClick="addVideo" data-commentID="'+params['commentID']+'"><span class="icon oke"></span></a>\
						</div>\
						<div class="upload_info">Поддерживается YouTube, Vimeo, Coub</div>\
					</div>\
				</div>',
		buttons: false
	});
}
IMCommentDialog.prototype._imageMobile = function(params) {
	return template = '<div class="upload_container">\
		<div class="upload_pic" id="commentImageUploadContainer">'+
			//<a nohref class="btn" id="commentImageUpload">Загрузить картинку</a> до 2 Мб\
			'<div class="upload_subsep">Вставить картинку ссылкой</div>\
			<div class="upload_inpbox">\
				<input type="Text" class="upload_inp" placeholder="Адрес файла">\
				<a nohref class="btn_ok" data-comClick="addImage" data-commentID="'+params['commentID']+'"><span class="icon oke"></span></a>\
			</div>\
		</div>\
	</div>';
}
IMCommentDialog.prototype._videoMobile = function(params) {
	return template = '<div class="upload_container">\
		<div class="upload_video">\
			<div class="upload_subsep1">Прикрепить видео</div>\
			<div class="upload_inpbox">\
				<input type="Text" class="upload_inp" placeholder="Адрес файла">\
				<a nohref class="btn_ok" data-comClick="addVideo" data-commentID="'+params['commentID']+'"><span class="icon oke"></span></a>\
			</div>\
			<div class="upload_info">Поддерживается YouTube, Vimeo, Coub</div>\
		</div>\
	</div>';
}

// comment params Object
function IMCommentParam() {
	this.data = {
		branch: "",
		discussID: 0,
		dir: "/comments/",
		dirImage: "/comments/upload/",
		comments: {}
	};
}
IMCommentParam.prototype.set = function(key,value) {
	this.data[key] = value;
}
IMCommentParam.prototype.get = function(key) {
	return this.data[key];
}
IMCommentParam.prototype.getAll = function() {
	return this.data;
}

// event manager
function IMCommentEvent() {
	this.events = {};
}
// methods
IMCommentEvent.prototype.add = function(name,cb) {
	this.events[name] = cb;
}
IMCommentEvent.prototype.init = function(parent) {
	// init click events
	if (parent === undefined) {
		parent = $("body");
	}
	parent.find('[data-comClick]').unbind("click").click(e => {
		e.preventDefault();
		const current = $(e.currentTarget);
		const name = current.attr('data-comClick');
		this.execute(name,current);
	});
}
IMCommentEvent.prototype.execute = function(name,current) {
	//console.log("event:", name);
	if (name in this.events) {
		this.events[name](current);
	}
	else {
		console.log("click error:", name);
	}
}

// constructor
function IMCommentPopup() {
	// first init
	$(document).ready(() => {
		if (document.getElementById("imc_popup") === null) {
			$("body").append('<div id="imc_popup">\
			</div><div class="cfade"></div>');
			
			// set close events
			$(".cfade,#imc_popup .cancel").click(e => {
				this.close();
			});
			$(document).keyup(e => {
				if (e.keyCode == 27) {
					this.close(); 
				}
			});
		}
	});
}
// methods - start
//
IMCommentPopup.prototype.show = function(params) {
	//
	this.close();
	
	// params
	if (params['width'] !== undefined) {
		$("#imc_popup").css("width",params['width']+"px");
	}
	if (params['height'] !== undefined) {
		$("#imc_popup").css("height",params['height']+"px");
	}
	if (params['title'] !== undefined) {
		$("#imc_popup").append('<div class="title">'+params['title']+'</div>');
	}
	if (params['contents'] !== undefined) {
		$("#imc_popup").append('<div class="contents">'+params['contents']+'</div>');
	}
	if (params['other'] !== undefined) {
		$("#imc_popup").append(params['other']);
	}
	
	// buttons
	if (params['buttons'] === undefined) {
		params['buttons'] = {};
	}
	if (params['buttons'] !== false && params['buttons']['cancel'] !== false) {
		if (params['buttons']['cancel'] === undefined) {
			params['buttons']['cancel'] = {};
		}
		if (params['buttons']['cancel']['title'] === undefined) {
			params['buttons']['cancel']['title'] = "Отменить";
		}
		if (params['buttons']['cancel']['click'] === undefined) {
			params['buttons']['cancel']['click'] = () => {
				this.close();
			}
		}
	}
	if (params['buttons'] !== false) {
		$("#imc_popup").append('<div class="buttons"></div>');
		for (let bt in params['buttons']) {
			if (params['buttons'][bt] === false) {
				continue;
			}
			if (params['buttons'][bt]['title'] !== undefined) {
				$("#imc_popup .buttons").append('<input type="submit" value="'+params['buttons'][bt]['title']+'" class="'+bt+'" />');
			}
			if (params['buttons'][bt]['click'] !== undefined) {
				$("#imc_popup .buttons ."+bt).click(params['buttons'][bt]['click']);
			}
		}
	}
	
	//
	$(".cfade").show();
	let popup = $("#imc_popup");
	this.setWindowCenter(popup);
	popup.show();
}
//
IMCommentPopup.prototype.close = function() {
	// restore first state popup
	$(".cfade").hide();
	let popup = $("#imc_popup");
	//popup.css("width","auto");
	//popup.css("height","auto");
	popup.hide();
	$("#imc_popup").html("");
	
	// restore buttons
	$("#imc_popup .buttons .confirm").unbind();
	$("#imc_popup .buttons .cancel").unbind();
	$("#imc_popup .buttons").remove();
}
//
IMCommentPopup.prototype.setWindowCenter = function(jObject,top) {
	if (top === undefined) {
		top = ($(window).height() - jObject.outerHeight()) / 2 + $(window).scrollTop();
	}
	if (top < 10) {top = 10;}
	jObject.css("position", "absolute");
	let left = ($(window).width() - jObject.outerWidth()) / 2 + $(window).scrollLeft();
	jObject.css("top", top + "px");
	jObject.css("left", left + "px");
}
// methods - end

// comments loader
function IMCommentLoader(params) {
	if (params === undefined) {
		params = {};
	}
	
	//
	this.assetsDomain = 'assetsDomain' in params ? params['assetsDomain'] : '';
	this.ver = 'ver' in params ? params['ver'] : '';
	this.commentsType = 'default';
	this.dir = 'dir' in params ? params['dir'] : '';
	this.isModerPage = window.location.href.match(new RegExp(this.dir+"moder/")) !== null;
	if (this.isModerPage) {
		this.commentsType = 'moder';
	}
}
IMCommentLoader.prototype.initLibs = function () {
	return new Promise((resolve,reject) => {
		$.ajax(this.dir+"actions/process.php",{
			data: "action=getSettings&branch=news&discussID=1",
			type: "post",
			dataType: "JSON",
			success: data => {
				if (data['type'] != "success") {
					reject();
				}
				//
				resolve(data);
				// add required libs
				if ('requiredLibs' in data && data['requiredLibs'].length > 0) {
					for(let i in data['requiredLibs']) {
						const path = data['requiredLibs'][i];
						this.includeLib(path);
					}
				}
			}
		});
	});
}
IMCommentLoader.prototype.includeLib = function(url) {
	const path = this.assetsDomain+url;
	const codeInclude = '<script async src="'+path+'?'+this.ver+'" type="text/javascript"></script>';
	if ($('script[src^="'+path+'"]').length == 0) {
		$('head').append(codeInclude);
	}
}
IMCommentLoader.prototype.prepareNames = function(fields) {
	const validNames = ['discussID','userID','commentID',
		'typeModify','withComplaints','complaintsCheck','userLogin','withPictures'];
	let result = {};
	for (let fieldName in fields) {
		let resultName = fieldName;
		for (let i in validNames) {
			if (fieldName.match(new RegExp(validNames[i],'i')) !== null) {
				resultName = validNames[i];
			}
		}
		result[resultName] = fields[fieldName];
	}
	return result;
}
IMCommentLoader.prototype.showComments = function(commentsType,handler) {
	if (commentsType != this.commentsType) {
		return false;
	}
	$(document).ready(e => {
		const place = $('#im_comments');
		if (place.length == 0) {
			return false;
		}
		let listParams = place.data();
		listParams = this.prepareNames(listParams);
		if (place.find('#im_comments_list').length == 0 && 
			'branch' in listParams && 'discussID' in listParams) {
			IMCParam.set("branch",listParams['branch']);
			IMCParam.set("discussID",listParams['discussID']);
			if ('sort' in listParams) {
				IMCParam.set('sort',listParams['sort']);
			}
			IMCParam.set('listParams',listParams);
			handler.getComments();
		}
	});
}

//
function fScroll(scr,speed) {
	if (speed === undefined) {
		speed = "slow";
	}
	$("html,body").stop().animate({scrollTop:$(scr).offset().top - 80},speed);
}


// incude building script
IMCLoader = new IMCommentLoader({
	dir: '/-Engine-/comments/',
	assetsDomain: 'https://cdn.igromania.ru',
	ver: 'v1.8'
});
IMCLoader.includeLib('/-Engine-/comments/js/build.js');