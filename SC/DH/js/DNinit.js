var zoomUrl = 'data/zoomname.json',
	BQDM = window.localStorage.getItem('BQDM'),
	BQName = window.localStorage.getItem('BQName');

$.ajax({
	url: zoomUrl,
	type: "GET",
	dataType: "json",
	error: function() {
		alert('病区代码请求出错');
	},
	success: function(data) {
		document.getElementById('loadWrap').style.opacity = 0;
		document.getElementById('loadWrap').style.zIndex = -1;
		/*选择加载病区*/
		changeArea(data);
		/*选择病区代码*/
		dropList(data);
		/*获取病区名称*/
		setBQName(data)
		/*弹窗外关闭*/
		closeBox();
		/*切换病区*/
		changeSC();
	}
});

function changeArea(data) {
	var changeUlHtml = '',
		_area = data.BQInfos,
		_index = $(".changeUl ul li").index();
	if(BQDM === null || BQDM === '' || BQDM === 'undefined') {
		BQDM = _area[0].BQDM;
	}
	window.localStorage.setItem('BQDM', BQDM);
	$(".changeInput").html(_area[0].BQName);
	for(var i = 0; i < _area.length; i++) {
		changeUlHtml += "<li>" + _area[i].BQName + "</li>"
	}
	$(".changeUl").html("<ul>" + changeUlHtml + "<div class='arrowBox'><span class='arrowDown'></span></div></ul>");
}

function dropList(data) {
	$(".changeInput").on("click", function(event) {
		if(data.BQInfos.length > 5) {
			$(".changeUl ul li:gt(4)").hide();
			$(".arrowBox").show();
		}
		if($(this).css("opacity") == 1) {
			$(this).css("opacity", .69);
		} else {
			$(this).css("opacity", 1);
		}
		$(".changeInput").toggleClass("open");
		$(".changeUl>ul").slideToggle();
		event.stopPropagation();
	})
	$(".arrowBox").on("mouseenter", function() {
		$(".changeUl ul li:gt(4)").show();
		$(this).hide();
	})
	$(".changeUl").on("click", "li", function(event) {
		var _text = $(this).html(),
			_index = $(this).index();
		BQDM = data.BQInfos[_index].BQDM;
		window.localStorage.setItem('BQDM', BQDM);
		window.localStorage.setItem('BQName', _text);
		$(".changeInput").toggleClass("open")
			.html($(this).html())
			.css("opacity", 1);
		$(".changeUl>ul").slideUp();
		event.stopPropagation();
		/*每次点击切换请求数据*/
		dataInit();
	})
}

function setBQName(data) {
	if(BQName !== null && BQName !== '' && BQName !== 'undefined') {
		/*获取本地存储的病区代码*/
		$(".changeInput").html(BQName);
	}
}

/*弹窗外关闭*/
function closeBox() {
	$(window).click(function(event) {
		if($(".changeUl>ul").css("display")){
			$(".changeUl>ul").slideUp();
			$(".changeInput").removeClass("open");
			$(".changeInput").css("opacity", 1);
		}
		if($(".SCchangeUl>ul").css("display")){
			$(".SCchangeUl>ul").slideUp();
			$(".CNdown").removeClass("open");
		}
	});
}

/*切换大屏*/
function changeSC() {
	$(".SCchangeInput").on("click", function (event) {
		$(".SCchangeUl>ul").slideToggle();
		$(".CNdown").toggleClass("open");
		event.stopPropagation();
		
	})
	$(".SCchangeUl").on("click", function (event) {
		$(".SCchangeUl>ul").slideUp();
		$(".CNdown").removeClass("open");
		event.stopPropagation();
	})
}
