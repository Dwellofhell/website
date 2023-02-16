function IMShare(params) {
	// props
	if (params === undefined) {
		var params = {};
	}
	if(params['url'] === undefined) {
		var url = $("meta[property=og\\:url]").attr("content");
		params['url'] = url ? url : "";
	}
	if(params['title'] === undefined) {
		var title = $("meta[property=og\\:title]").attr("content");
		params['title'] = title ? title : ""; 
	}
	if(params['description'] === undefined) {
		var description = $("meta[property=og\\:description]").attr("content");
		params['description'] = description ? description : "";
	}
	if(params['image'] === undefined) {
		var image = $("meta[property=og\\:image]").attr("content");
		params['image'] = image ? image : "";
	}
	this._params = params;
	this._soc = {
		"vk":new IMShareVK(),
		//"fb":new IMShareFB(),
		"tw":new IMShareTW(),
		"ok":new IMShareOK(),
		"ml":new IMShareML()
	}
	this._showCountsFor = params['showCountsFor'] !== undefined ? params['showCountsFor'] : {};
}
IMShare.prototype.share = function(type) {
	this._preShare(type);
	
	// get url for popup
	var sUrl = this._soc[type].getShareURL(this._params);

	// void popup
	this._popup(sUrl);
	
	this._afterShare(type);
}
IMShare.prototype.show = function(element) {}
IMShare.prototype.showCounts = function() {
	for(type in this._showCountsFor) {
		this._soc[type].getShareCount(this._params['url'],this._showCountsFor[type]);
	}
}
IMShare.prototype._popup = function(url) {
	var width = 640;
    var height = 480;
    var left = (screen.width / 2) - (width / 2);
    var top = (screen.height / 2) - (height / 2);
    window.open(url,'share','status=no,toolbar=no,menubar=no,width='+
    		width+', height='+height+',top='+top+', left='+left);
}
IMShare.prototype._preShare = function(type) {}
IMShare.prototype._afterShare = function(type) {}

//
function IMShareSocial() {
}
IMShareSocial.prototype.getShareURL = function() {};
IMShareSocial.prototype.getShareCount = function(url,showFor) {};
IMShareSocial.prototype.showCount = function(shares,showFor) {
	if (parseInt(shares) > 0) {
		$(showFor).append('<span class="share_count">'+shares+'</span>');
	}
};

// VK
function IMShareVK() {
	IMShareSocial.prototype.constructor.call(this);
}
IMShareVK.prototype = Object.create(IMShareSocial.prototype);
IMShareVK.prototype.constructor = IMShareVK;
IMShareVK.prototype.getShareURL = function(params) {
	var sUrl = 'https://vk.com/share.php?';
	sUrl += 'url=' + encodeURIComponent(params['url']);
	sUrl += '&title=' + encodeURIComponent(params['title']);
	sUrl += '&description=' + encodeURIComponent(params['description']);
	sUrl += '&image=' + encodeURIComponent(params['image']);
	return sUrl;
}
IMShareVK.prototype.getShareCount = function(url,showFor) {
	// set VK object
	var thisObj = this;
	//if (window.VK === undefined) {
		window.VK = {
			Share: {
				count: function(index,shares) {
					thisObj.showCount(shares,showFor);
				}
			}
		};
	//}
	// get counts
	$.ajax("https://vk.com/share.php",{
    	data: "act=count&index=1&url="+encodeURIComponent(url),
    	method: "GET",
    	dataType: "jsonp"
    });
}

// FB
function IMShareFB() {
}
IMShareFB.prototype = Object.create(IMShareSocial.prototype);
IMShareFB.prototype.constructor = IMShareFB;
IMShareFB.prototype.getShareURL = function(params) {
	var sUrl = 'https://www.facebook.com/sharer/sharer.php?s=100';
	sUrl += '&u=' + encodeURIComponent(params['url']);
	sUrl += '&p[url]=' + encodeURIComponent(params['url']);
	sUrl += '&p[title]=' + encodeURIComponent(params['title']);
	sUrl += '&p[summary]=' + encodeURIComponent(params['description']);
	sUrl += '&p[images][0]=' + encodeURIComponent(params['image']);
	return sUrl;
}
IMShareFB.prototype.getShareCount = function(url,showFor) {
	var thisObj = this;
	$.ajax("https://graph.facebook.com",{
    	data: "id="+encodeURIComponent(url),
    	method: "GET",
    	dataType: "json",
    	success: function(data) {
    		if (data['share'] !== undefined) {
    			thisObj.showCount(data['share']['share_count'],showFor);
    		}
    	}
    });
}

// ML
function IMShareML() {
}
IMShareML.prototype = Object.create(IMShareSocial.prototype);
IMShareML.prototype.constructor = IMShareML;
IMShareML.prototype.getShareURL = function(params) {
	var sUrl = 'https://connect.mail.ru/share?';
	sUrl += 'url=' + encodeURIComponent(params['url']);
	sUrl += '&title=' + encodeURIComponent(params['title']);
	sUrl += '&description=' + encodeURIComponent(params['description']);
	sUrl += '&imageurl=' + encodeURIComponent(params['image']);
	return sUrl;
}
IMShareML.prototype.getShareCount = function(url,showFor) {
	var thisObj = this;
	$.ajax("https://connect.mail.ru/share_count",{
		data: "&url_list="+encodeURIComponent(url)+"&callback=1&func=?",
    	method: "GET",
    	dataType: "json",
    	success: function(data) {
    		thisObj.showCount(parseInt(data[url]['shares']),showFor);
    	}
    });
}

// OK
function IMShareOK() {
}
IMShareOK.prototype = Object.create(IMShareSocial.prototype);
IMShareOK.prototype.constructor = IMShareOK;
IMShareOK.prototype.getShareURL = function(params) {
	
/*
	var sUrl = 'https://www.odnoklassniki.ru/dk?st.cmd=addShare&st.s=1';
	sUrl += '&st._surl=' + encodeURIComponent(params['url']);
	sUrl += '&st.comments=' + encodeURIComponent(params['title']);
*/
	var sUrl = 'https://connect.ok.ru/offer';
	sUrl += '?url=' + encodeURIComponent(params['url']);
	sUrl += '&title=' + encodeURIComponent(params['title']);
	sUrl += '&imageUrl=' + encodeURIComponent(params['image']);
	return sUrl;
}
IMShareOK.prototype.getShareCount = function(url,showFor) {
	// set OK object
	var thisObj = this;
	//if (window.ODKL === undefined) {
		window.ODKL = {
			updateCount: function(index,shares) {
				thisObj.showCount(shares,showFor);
			}
		};
	//}
	// get counts
	
	$.ajax("https://connect.ok.ru/dk",{
		data: "st.cmd=extLike&tp=json&ref="+encodeURIComponent(url),
    	// data: "st.cmd=extLike&uid=1&ref="+encodeURIComponent(url),
    	method: "GET",
    	dataType: "jsonp"
    });
}

// TW
function IMShareTW() {
}
IMShareTW.prototype = Object.create(IMShareSocial.prototype);
IMShareTW.prototype.constructor = IMShareTW;
IMShareTW.prototype.getShareURL = function(params) {
	var sUrl = 'https://twitter.com/share?';
	sUrl += 'url=' + encodeURIComponent(params['url']);
	sUrl += '&text=' + encodeURIComponent(params['title']);
	sUrl += '&counturl=' + encodeURIComponent(params['url']);
	return sUrl;
}

// customizes

// with counts
function IMShare_mainCounts(params) {
	var params = params !== undefined ? params : {};
	if (params['showCountsFor'] === undefined) {
		params['showCountsFor'] = {
			vk:".share_link.vk",
			fb:".share_link.fb",
			//tw:".share_link.twit",
			ok:".share_link.ok",
			ml:".share_link.mru"
		};
	}
	IMShare.prototype.constructor.call(this,params);
}
IMShare_mainCounts.prototype = Object.create(IMShare.prototype);
IMShare_mainCounts.prototype.constructor = IMShare_mainCounts;
IMShare_mainCounts.prototype.show = function(element) {
	var bt;
	/*
	bt = '<span class="t_gray">Поделиться:&nbsp; </span>\
		<a href="#" class="share_link vk" data-soc="vk">\
		<span class="share_icon"></span></a>\
		<a href="#" class="share_link fb" data-soc="fb">\
		<span class="share_icon"></span></a>\
		<a href="#" class="share_link twit" data-soc="tw">\
		<span class="share_icon"></span></a>\
		<a href="#" class="share_link mru" data-soc="ml">\
		<span class="share_icon"></span></a>\
		<a href="#" class="share_link ok" data-soc="ok">\
		<span class="share_icon"></span></a>';
	*/
	bt = '<span class="t_gray">Поделиться:&nbsp; </span>\
		<a href="#" class="share_link vk" data-soc="vk">\
		<span class="share_icon"></span></a>\
		<a href="#" class="share_link twit" data-soc="tw">\
		<span class="share_icon"></span></a>\
		<a href="#" class="share_link mru" data-soc="ml">\
		<span class="share_icon"></span></a>\
		<a href="#" class="share_link ok" data-soc="ok">\
		<span class="share_icon"></span></a>';
	element.innerHTML = bt;
}
IMShare_mainCounts.prototype._preShare = function(type) {
}
// without counts
IMShare_main = function(params) {
	IMShare.prototype.constructor.call(this,params);
};
IMShare_main.prototype = Object.create(IMShare.prototype);
IMShare_main.prototype.constructor = IMShare_main;
IMShare_main.prototype.show = function(element) {
	var bt;
	/*
	bt = '<span class="t_gray">Поделиться:&nbsp; </span>\
		<a href="#" class="share_link vk" data-soc="vk">\
		<span class="share_icon"></span></a>\
		<a href="#" class="share_link fb" data-soc="fb">\
		<span class="share_icon"></span></a>\
		<a href="#" class="share_link twit" data-soc="tw">\
		<span class="share_icon"></span></a>\
		<a href="#" class="share_link mru" data-soc="ml">\
		<span class="share_icon"></span></a>\
		<a href="#" class="share_link ok" data-soc="ok">\
		<span class="share_icon"></span></a>';
	*/
	bt = '<span class="t_gray">Поделиться:&nbsp; </span>\
		<a href="#" class="share_link vk" data-soc="vk">\
		<span class="share_icon"></span></a>\
		<a href="#" class="share_link twit" data-soc="tw">\
		<span class="share_icon"></span></a>\
		<a href="#" class="share_link mru" data-soc="ml">\
		<span class="share_icon"></span></a>\
		<a href="#" class="share_link ok" data-soc="ok">\
		<span class="share_icon"></span></a>';
	element.innerHTML = bt;
}

/* jQuery plugin */
jQuery = jQuery; // FIX!
(function($) {
	$.fn.shares = function(params) {
		//
		var params = params !== undefined ? params : {};
		if (params['Share'] === undefined) {
			params['Share'] = new IMShare_mainCounts(params);
		}
		/*var params = $.extend({
			Share: new IMShare_mainCounts(params)
		}, params);*/
		//
	    this.each(function(step) {
	    	params['Share'].show(this);
	    	$(this).find("a[data-soc]").click(function(event) {
	    		event.preventDefault();
	    		var soc = $(this).attr("data-soc");
	    		params['Share'].share(soc);
	    	});
	    });
	    // show counts
	    params['Share'].showCounts();
	    //
	    return true;
    };
})(jQuery);

/* CODE FOR LAUNCH SHARES
 * $('.element').shares(); // with counts
 * $('.element').shares({Share:new IMShare_main()}); // without counts
 */