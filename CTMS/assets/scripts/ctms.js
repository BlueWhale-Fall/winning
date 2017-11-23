/**
 * 卫宁健康--CTMS交互事件
 * @Author winning
 * @Data 2016-10-08
 */

//初始化左侧菜单高度
$(".page-container").css("minHeight",$(document).height() - 90+"px");
$(".page-sidebar,.navbar-collapse,.collapse").css("minHeight",$(document).height() - 90+"px");

//消息切换
$("#myModal").on("click","#msg-tab li",function(){
	$(this).addClass("active").siblings("li").removeClass("active");
	$("." + $(this).data("key") + "-msg").removeClass("hide").siblings("div").addClass("hide");
	return false;
});

//左侧菜单状态
 window.onload = function ()
 {
	 var strUrl=decodeURIComponent(location.href);
     var arrUrl=strUrl.split("/");
     var strPage=arrUrl[arrUrl.length-1];
     var _curm= $("a[href='"+strPage+"']");
     _curm.addClass("menuCur");
     _curm.parents(".sub-menu").css('display','block');
     _curm.parents(".sub-menu").parents("li").addClass("open");
     _curm.parents(".sub-menu").prev("a").find("span.arrow").addClass("open");
     var leftid=$(".page-sidebar").attr("id");
     switch(leftid)
     {
     	//leftid对应leftdata.js:157具体左侧菜单层的ID
     	//制度管理与档案管理暂空
        case ("leftmenu"):
            $("#a2").parents("li").addClass("cur");//项目
            break; 
        case ("qualitymenu"):
            $("#a3").parents("li").addClass("cur");//质量
            break; 
        case ("medicinemenu"):
            $("#a4").parents("li").addClass("cur");//药物
            break; 
        case ("membermenu"):
            $("#a6").parents("li").addClass("cur");//人员
            break; 
        case ("sysmenu"):
            $("#a7").parents("li").addClass("cur");//系统
            break; 
     }
	         
}
$(document).on('click', 'a[href="#"]', function(e) {
	e.preventDefault();
});
/*
 *研究阶段详细信息
 * */
$(".pha-radio>label").click(function() {
	var _this = $(this),
		_phaTit = _this.text(),
		_index = _this.index(),
		_infoEditor = $("#infoeditor");
	$("h4.modal-title", _infoEditor).text(_phaTit); //设置弹窗标题
	$(_this.data("index")).removeClass("hide").siblings("table").addClass("hide"); //标签页下面table切换
	$(_this.data("index")).removeClass("hide").siblings("span").addClass("hide"); //标签页下面table切换
	$("div.modal-body>div:eq(" + _index + ")", _infoEditor).removeClass("hide").siblings(".row").addClass("hide"); //设置弹窗主体
});

/*
 *物资交接
 * */
$(".selectchag").change(function() {
	var _this=$(".selectchag option:selected");  //获取选中的项
	var _index = _this.val(),
		_phaTit= _this.text(),
		_infoEditor = $("#infoeditor");
		$("h4.modal-title", _infoEditor).text('药物机构试验用'+_phaTit+'交接单'); //设置弹窗标题
		$(_this.data("index")).removeClass("hide").siblings("table").addClass("hide"); //标签页下面table切换
		$(_this.data("index")).removeClass("hide").siblings("span").addClass("hide"); //标签页下面table切换
		$("div.modal-body>div:eq(" + _index + ")", _infoEditor).removeClass("hide").siblings(".row").addClass("hide"); //设置弹窗主体
});

//弹窗到达楼层
$(".scdj li").click(function(){
	var _this=$(this),_index=_this.index(),_right=_this.parents(".left").next(".scdScroll.right");
	_top=_right.find(".scroll").eq(_index).position().top;
	_right.animate({
		scrollTop: _top+"px"
	}, 800);
	$(".scdj li").removeClass("active");
	_this.addClass("active");
});
/*
 表单预览编辑切换
 * @ele：选择器，字符串
 * @state:布尔值，true:预览；false:编辑
 * */
function viewEdit(ele,state){
	if(state){
		$(ele).removeClass("onlyload").removeAttr("disabled")
	}else{
		$(ele).addClass("onlyload").attr("disabled","disabled");
	}
}

//步骤进度条
$(document).on("hover","div.altcontainer>i",function(ev){
	var _altMsg = $(".alt-msg"),
		_oEvent = ev || window.event;
	if(!_altMsg.is(":visible")) {
		_altMsg.stop().slideDown();
	} else {
		_altMsg.stop().slideUp("fast");
	}
	console.log(_altMsg.is(":visible"));
	return false;
	_oEvent.stopPropagation();
});
/*设置状态条
 *@selector：选择器，字符串；
 *@step:当前状态，字符串；
 */
function setCurrentStep(selector, step) {
	var _step = parseInt(step);
	if(_step.toString() != "NaN") {
		$(selector + " .loop").eq(_step).addClass("active").prevAll("li").addClass("active");
	} else {
		alert("服务状态出小差啦~");
	}
}
//立项审查汇总查询页面，表格中选择一行双击显示出模态框
$("table.dblclick tbody tr").dblclick(function(){
	$('#check').modal();
})