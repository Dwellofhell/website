// init objects
IMCEvent = new IMCommentEvent();
IMCParam = new IMCommentParam();

IMCParam.set("dir","/-Engine-/comments/"); // set root dir
IMCParam.set("dirImage","/mnt/comments/");
IMCParam.set("sort","desc");
IMCParam.set("templ",{
	list: new IMCommentList(IMCParam),
	item: new IMCommentItem(IMCParam),
	navigation: new IMCommentNavigation(IMCParam),
	form: new IMCommentForm(IMCParam),
	dialog: new IMCommentDialog(IMCParam)
});
IMCParam.set("event",IMCEvent);

IMC = new IMComment(IMCParam);
//IMCMobile = new IMCommentMobile(IMCParam);
IMCPopup = new IMCommentPopup();

// events

// add new comment
IMCEvent.add("send",current => {
	const commentID = current.attr("data-commentID");
	IMC.add(commentID);
});

// dialog for edit comment
IMCEvent.add("editDialog",current => {
	const commentID = current.attr("data-commentID");
	const param = IMCParam;
	const templ = param.get("templ");
	// reset other forms
	IMC.resetForms();
	// get comment text
	const commentText = param.get("comment"+commentID);
	// get comment object
	let commentObj = $("#comment"+commentID);
	// get form template
	let form = templ['form'].get('edit',{
		ID: commentID,
		text: commentText
	});
	// get form object
	let formObj = $(form);
	// hidden comment
	commentObj.hide();
	// add edit form
	commentObj.after(formObj);
	// set focus on text
	let textField = formObj.find("textarea");
	textField.focus();
	// set new events
	textField.removeAttr("onkeyup").keyup(event => {
		if (event.ctrlKey && event.keyCode == 13) {
			IMC.edit(commentID);
		}
		else {
			IMC.preview(commentID);
		}
	});
	IMCEvent.init(formObj);
	//
	IMC.preview(commentID);
	fScroll("#formCommentSend"+commentID);
});

//cancel edit dialog
IMCEvent.add("cancel",current => {
	const commentID = current.attr("data-commentID");
	let formObj = $('#formCommentSend'+commentID);
	let commentObj = $("#comment"+commentID);
	formObj.remove();
	commentObj.show();
});

// edit comment
IMCEvent.add("edit",current => {
	const commentID = current.attr("data-commentID");
	IMC.edit(commentID);
});

// dialog for remove comment
IMCEvent.add("removeDialog",current => {
	const commentID = current.attr("data-commentID");
	const param = IMCParam;
	const templ = param.get("templ");
	templ['dialog'].get('remove',{
		click: () => IMC.remove(commentID)
	});
});

// show response form
IMCEvent.add("response",current => {
	const commentID = current.attr("data-commentID");
	const param = IMCParam;
	const templ = param.get("templ");
	let formPlace = $("#comment"+commentID+" .fast_replay");
	if (formPlace.html() == "") {
		// reset other forms
		IMC.resetForms();
		// get form Object
		let formObj = $(templ['form'].get('def',{ID:commentID}));
		// add response form
		formPlace.html(formObj);
		formObj.find("form textarea").focus();
		// init events
		IMCEvent.init(formPlace);
	}
	else {
		formPlace.html("");
	}
});

// select page
IMCEvent.add("pageSelect",current => {
	const page = current.attr("data-page");
	IMC.pageSelect(page);
});

// load more comments
IMCEvent.add("more",current => {
	const page = current.attr("data-page");
	const param = IMCParam;
	const templ = param.get("templ");
	IMC.getComments({cpage:page},() => {
		// add contents
		$('#im_comments_nav_top').html(templ['navigation'].get('top'));
		$('#im_comments_list').append(templ['list'].get('comments'));
		$('#im_comments_nav_bottom').html(templ['navigation'].get('bottom'));
	});
});

// sort comments list
IMCEvent.add("sort",current => {
	const type = current.attr("data-type");
	const param = IMCParam;
	$(".comments_header_tools a[data-comment-sort]").removeClass("on");
	$(".comments_header_tools a[data-comment-sort='"+type+"']").addClass("on");
	param.set('sort',type);
	IMC.pageSelect(1);
});

// quote comment
IMCEvent.add("quote",current => {
	const commentID = current.attr("data-commentID");
	const skipText = current.attr("data-skipText");
	const param = IMCParam;
	
	if ('ID' in param.get('user') === false) {
		return;
	}
	
	// get quote
	let text = "";
	const userName = $("#comment"+commentID+" .uname").html();
	if (skipText !== "yes") {
	    if (window.getSelection) {
	        text = window.getSelection();
	    }
	    else if (document.getSelection) {
	        text = document.getSelection();
	    }
	    else if (document.selection) {
	        text = document.selection.createRange().text;
	    }
	    text = String(text);
	    if (text.length == 0) {
	    	text = param.get("comment"+commentID);
	    }
	    
	    text = '[quote][user_q='+userName+']'+text+'[/quote]';
	}
	else {
		text = '[user='+userName+']';
	}
	
	//
	if (document.getElementById("formCommentSend"+commentID) === null) {
		// open response form
		IMCEvent.execute("response",current);
	}
	
    let formObj = $("#formCommentSend"+commentID);
    let textField = formObj.find("form textarea");
    text = textField.val() + text;
    textField.focus();
    textField.val(text);
    fScroll("#"+formObj.attr("id"));
    IMC.preview(commentID);
});

// add tag
IMCEvent.add("addTag",current => {
	const commentID = current.attr("data-commentID");
	const tag = current.attr("data-tag");
	let textField = $("#formCommentSend"+commentID).find("form textarea");
	let text = textField.val();
	const selStart = textField.get(0).selectionStart;
	const selEnd = textField.get(0).selectionEnd;
	if (selStart != selEnd) {
		const selText = text.slice(selStart,selEnd);
		text = text.substr(0,selStart)+"["+tag+"]"+selText+"[/"+tag+"]"+text.substr(selEnd);
	}
	else {
		text += "["+tag+"]"+"[/"+tag+"]";
	}
	textField.focus();
	textField.val(text);
	IMC.preview(commentID);
});

// likes and complaints
IMCEvent.add("event",current => {
	const commentID = current.attr("data-commentID");
	const value = current.attr("data-value");
	const param = IMCParam;
	
	const checkID = (value == "complaint" ? "complaint" : "vote")+commentID;
	if (param.get(checkID) !== undefined) {
		//return;
	}
	
	if ('ID' in param.get('user') === false) {
		IMCEvent.execute("auth");
		return;
	}
	
	// local func for send event
	const sendEvent = (url,urlParams) => {
		return new Promise((resolve,reject) => {
			$.ajax(url,{
				data: urlParams,
				dataType: "JSON",
				type: "post",
				success: data => resolve(data),
				error: reject,
				cache: false
			});
		});
	}
	
	// send event
	const urlParams = "action=commentEvent&branch="+param.get('branch')+
		"&discussID="+param.get('discussID')+"&commentID="+commentID+"&event="+value;
	sendEvent(param.get("dir")+"actions/process.php",urlParams).then(data => {
		if (data['type'] == "success") {
			if (value == "complaint") {
				let complaint = $("#comment"+commentID+" a.complain");
				complaint.html("Ваша жалоба принята");
				complaint.css("color","red");
				complaint.css("cursor","default");
				complaint.attr("onclick","return false");
			}
			else {
				let plusLink = $("#comment"+commentID+" .like_count a");
				let minusLink = $("#comment"+commentID+" .unlike_count a");
				let voteLink = value == "plus" ? plusLink : minusLink;
				let voteCount = parseInt(voteLink.prev().text());
				if (value == "plus" && minusLink.hasClass("me")) {
					minusLink.removeClass("me");
					minusLink.prev().text(parseInt(minusLink.prev().text())-1);
				}
				else if (value == "minus" && plusLink.hasClass("me")) {
					plusLink.removeClass("me");
					plusLink.prev().text(parseInt(plusLink.prev().text())-1);
				}
				if (voteLink.hasClass("me")) {
					voteLink.removeClass("me");
					voteCount -= 1;
				}
				else {
					voteLink.addClass("me");
					voteCount += 1;
				}
				voteLink.prev().text(voteCount);
			}
			
			//
			param.set(checkID,"y");
		}
		else {
			IMCPopup.close();
		}
	});
});

// show auth form
IMCEvent.add("auth",current => {
	E_JS_Auth();
});

//
IMCEvent.add("imageDialog",current => {
	const commentID = current.attr("data-commentID");
	const param = IMCParam;
	const templ = param.get("templ");

	const user = param.get('user');
	if (!user['canAddImage']) {
		IMCPopup.show({
			title: "Загрузить картинку",
			contents: "Возможность добавлять изображения к комментариям станет доступна,<br> \
			когда вашему аккаунту исполнится две недели с момента регистрации.",
			buttons: false
		});
		return;
	}
	
	templ['dialog'].get('image',{
		commentID: commentID
	});
	$("#imc_popup input").focus();
	
	IMCEvent.init($('#imc_popup'));
	
	// upload image (using plupload library)
	let uploader = new plupload.Uploader({
		runtimes : 'html5,flash,silverlight,html4',
		browse_button : 'commentImageUpload',
		container: document.getElementById('commentImageUploadContainer'),
		url : param.get('dir')+'actions/upload.php',
		flash_swf_url : param.get('dir')+'js/plupload/Moxie.swf',
		silverlight_xap_url : param.get('dir')+'js/plupload/Moxie.xap',
		multipart: true,
		filters : {
			max_file_size : '2mb',
			mime_types: [
				{title : "Image files", extensions : "jpg,gif,png,jpeg"}
			]
		},
		init: {
			FilesAdded: (up, files) => {
				uploader.start();
				IMCPopup.show({
					title: "Отправка данных",
					contents: "Подождите...",
					buttons: false
				});
			},
			UploadProgress: (up, file) => {
				//document.getElementById('commentUploadProgress').innerHTML = '<span>' + file.percent + "%</span>";
			},
			Error: (up, err) => {
			},
			FileUploaded: (up, file, result) => {
				result = JSON.parse(result['response']);
				IMC.addImage(commentID,result['result']);
			}
		}
	});
	uploader.init();
});

// add image
IMCEvent.add("addImage",current => {
	const commentID = current.attr("data-commentID");
	const imageUrl = current.prev().val();
	IMC.addImage(commentID,imageUrl);
});

// video dialog
IMCEvent.add("videoDialog",current => {
	const commentID = current.attr("data-commentID");
	const param = IMCParam;
	const templ = param.get("templ");
	
	templ['dialog'].get('video',{
		commentID: commentID
	});
	$("#imc_popup input").focus();
	
	IMCEvent.init($('#imc_popup'));
});

// add video
IMCEvent.add("addVideo",current => {
	const commentID = current.attr("data-commentID");
	const videoUrl = current.prev().val();
	IMC.addVideo(commentID,videoUrl);
	IMCEvent.init($('#formCommentSend'+commentID));
});

// show/hide video block
IMCEvent.add("showVideo",current => {
	let videoPlace = current.find("div");
	//const width = videoPlace.width()-10;
	const width = 98;
	//const height = Math.round(width/1.78);
	const videoID = current.attr("data-videoID");
	const videoType = current.attr("data-videoType");
	let videoFrame = "";
	if (videoType == "youtube") {
		videoFrame = '<iframe style="width: '+width+'%;" \
			src="https://www.youtube.com/embed/'+videoID+'" \
			frameborder="0" allowfullscreen></iframe>';
	}
	else if (videoType == "vimeo") {
		videoFrame = '<iframe src="https://player.vimeo.com/video/'+videoID+'?badge=0" \
			style="width: '+width+'%;" frameborder="0" allowfullscreen></iframe>';
	}
	else if (videoType == "coub") {
		videoFrame = '<iframe src="//coub.com/embed/'+videoID+'?muted=false&autostart=false&\
			originalSize=false&startWithHD=false" allowfullscreen="true" frameborder="0" \
			style="width: '+width+'%;"></iframe>';
	}
	if (videoPlace.html().length > 0) {
		videoPlace.html("");
	}
	else {
		videoFrame = $(videoFrame);
		videoPlace.append(videoFrame);
		videoFrame.css("height",Math.round(videoFrame.width()/1.78)+"px");
		
		// FIX! show hidden comment body
		let overflowBox = videoPlace.parents("div.comment_text_overflow");
		if (overflowBox.length > 0) {
			let link = overflowBox.next('a');
			link.attr("data-action","open");
			IMCEvent.execute("commentOverflow",link);
			link.removeAttr("data-action");
		}
	}
});

// comment overflow
IMCEvent.add("commentOverflow",current => {
	const action = current.attr("data-action");
	let box = current.prev();
	let isOpen = false;
	if (action !== undefined) {
		isOpen = action == "open" ? false : true;
	}
	else {
		isOpen = box.hasClass("open");
	}
	
	if (isOpen) {
		box.removeClass("open");
		current.html("развернуть");
	}
	else {
		box.addClass("open");
		current.html("свернуть");
	}
});

// init libs and start comments
IMCLoader.initLibs().then(data => {
	// set comments type
	if (!IMCLoader.isModerPage && data['isMobile']) {
		IMCLoader.commentsType = 'mobile';
	}
	// show comments
	IMCLoader.showComments('default',IMC);
}).catch(err => false);