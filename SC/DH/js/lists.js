var pbedsurl = 'data/beds.json'; //头部3项点击请求床位
var plistssurl = 'data/listdata.json'; //头部3项点击请求单个病人信息
var pdetailsurl = 'data/listdata.json'; //点头像和点床号 病人个人信息列表
var chartUrl = 'data/chart.json'; /*life charts*/
var schartUrl = 'data/schart.json'; /*single chart*/
var brcountUrl = 'data/BRCount.json';/*病人总数详情*/
var nav = '';

/*时间刻度*/
var _splitNum = 12; /*生命体征分为12段*/
var _ssplitNum = 5; /*单曲线分段4段*/
var _hours = 48; /*单位小时，横跨48小时，即2天*/

/*病人总数详情*/
function showCount(span) {
    var search = span.getAttribute('search').split('-');
    var para2 = search[1]; /*任务名*/
    var countDetail = $("#countDetail");
    /*request plists*/

    var count = span.lastChild.innerHTML;
    if (count > 0) {
        pcounts(para2, count);
    } else {
        return false;
    }
    createObj('countDetail', '', 0);
   	if (countDetail.css('opacity') == 1) {
        triggerbox(1, 'countDetail');
    } else {
        setTimeout(function () {
            triggerbox(0, 'countDetail');
        }, 150);
    }
}

function pcounts(RWName, count) {
    $.ajax({
        url: brcountUrl,
        type: "GET",
        dataType: "json",
        data: {
            bqdm: BQDM,
        },
        error: function () {
            alert("查询错误");
        },
        success: function (data) {
            //请求床号
            countdetail(data, RWName, count);
        }
    });
}


function countdetail(data, RWName, count) {
	var datadetail = data.BRCountInfo,
		length = datadetail.length,
		depul = '';
	
	for(var i = 0;i < length; i++) {
		var depName = datadetail[i].KSMC,
			depNum = datadetail[i].Count;
		depul += '<li><span class="depName">'+ depName +'</span><span class="depNum">'+ depNum +'</span></li>';
	}
	var	countbox = '<div class="horn"></div><a class="close" title="关闭" onclick="triggerbox(1,\'countDetail\')"></a><div><img src="img/people.png" alt="" /><span class="count">'+ RWName +'</span><span class="countNum">'+ count +'</span></div><div><ul>'+ depul +'</ul></div>';
	$("#countDetail").html(countbox);
}


/*header plists*/
function showLists(span) {
    var search = span.getAttribute('search').split('-');
    var para1 = search[0]; /*任务拼音或任务type*/
    var para2 = search[1]; /*任务名*/
    /*request plists*/

    var count = span.lastChild.innerHTML;
    if (count > 0) {
        pbeds(para2, para1);
    } else {
        return false;
    }
    createObj('pLists', 'listbox', 0);
    /*show or hide box*/
    var bedsbox = document.getElementById('pLists');
    if (bedsbox.style.opacity == 1) {
        triggerbox(1, "pLists");
    } else {
        setTimeout(function () {
            triggerbox(0, "pLists");
        }, 150);
    }
}

/*header plists data*/
function pLists(RWName, CH) {
        $.ajax({
            url: plistssurl,
            type: "GET",
            dataType: "json",
            data: {
                bqdm: BQDM,
                ch: CH
            },
            error: function () {
                alert("查询错误");
            },
            success: function (data) {
                //参数：病人详情 - 任务名称 - 床号（传递给曲线请求）- 标识床号index（0为选中第一个）
                lists(data, RWName, CH, 0);
            }
        });
    }
    /*header plists data*/
function pbeds(RWName, rwmark) {
        $.ajax({
            url: pbedsurl,
            type: "GET",
            dataType: "json",
            data: {
                bqdm: BQDM,
                rwpy: rwmark
            },
            error: function () {
                alert("查询错误");
            },
            success: function (data) {
                //请求床号
                pallbeds(data, RWName);
                //请求病人详情或图表数据
                if (data.CHInfos.length > 0) {
                    //请求病人详情
                    pLists(RWName, data.CHInfos[0].CH);
                }
            }
        });
    }
    /*beds details*/
var leftwrap = '';
var pallnums = 0;
var CHFKInfos = [];

function pallbeds(data, RWName) {
    var KShtml = '';
    	pallnums = data.CHInfos.length;
    CHFKInfos = [];
    /*调用科室分组函数*/
   	branch(data);
    for (var i = 0; i < CHFKInfos.length; i++) {
    	var KSMC = CHFKInfos[i].KSMC,
    		CHInfos = CHFKInfos[i].CHDM,
    		bnum = '';
    	for(var j = 0; j < CHInfos.length; j++) {
    		var CH = CHInfos[j];
        	bnum += '<li onclick="changeCon(this)" search = "' + CH + '-' + RWName +'"><span class="num">' + CH + '</span></li>';
    	}
    	KShtml += '<li><div><span>'+ KSMC +'</span><span>'+ CHInfos.length +'人</span></div></li>'+ bnum
    }
    leftwrap = '<ul class="beds">' + KShtml + '</ul>';
}

/*科室分组*/
function branch(data) {
	var map = {},
		arr = data.CHInfos;
	for(var i = 0; i < arr.length; i++) {
		var fk = arr[i];	
		if(!map[fk.KSMC]) {
			CHFKInfos.push({
				KSMC: fk.KSMC,

				CHDM: [fk.CH]
			});
			map[fk.KSMC] = fk;
		} else {
			for(var j = 0; j < CHFKInfos.length; j++) {
				var fkch = CHFKInfos[j];
				if(fkch.KSMC == fk.KSMC) {
					fkch.CHDM.push(fk.CH);
					break;
				}
			}
		}
	}
}

/*填充图表*/
function fillCharts(RWName, RWmark, CH) {
    console.log(RWName, RWmark, CH)
    var txtwrap = '';
    var conwrap = '';
    var boxid = "#pLists";
    txtwrap = '<h2>' + RWName + '</h2><a class="close" title="关闭" onclick="triggerbox(1,\'pLists\')"></a><span class="shadowline"></span><span class="shadowlined"></span>';
    conwrap = '<div id="onlyChart"></div>';
    bedsbox = '<div class="titlewrap">' + txtwrap + '</div><div class="leftwrap"><div class="titlewrap"><h3>汇总人数</h3><span class="all">' + pallnums + '人</span></div>' + leftwrap + '</div><div id="changeCon" class="listsWrap">' + conwrap + '<span class="yAxis axis"></span><span class="xAxis axis"></span><span class="timetag sctag">未查询到数据</span></div><div class="scoreBox"></div>';

    $(boxid).html(bedsbox);
    /*选中第一个*/
    $('.beds .num').eq(0).addClass('on');
    /*构建图表*/
    //参数:chartId - CH - type - allbtnID - 单曲线或多曲线
    charts('onlyChart', CH, RWmark, '', 's');
}

/*lists details*/
function lists(data, RWName, CH, _index) {
    var chlen = data.HZDetailInfos.length;
    var listsCon = '';
    var txtwrap = '';
    var bedsbox = '';
    var conwrap = '';
    var opinion = '';
    var jc = '';
    var jy = '';
    var boxid = "#pLists";
    txtwrap = '<h2>病人信息</h2><a class="close" title="关闭" onclick="triggerbox(1,\'pLists\')"></a><span class="shadowline"></span><span class="shadowlined"></span>';
    for (var i = 0; i < data.HZDetailInfos[0].JCInfos.length; i++) {
        var JCXM = data.HZDetailInfos[0].JCInfos[i].JCXM;
        var JCJG = data.HZDetailInfos[0].JCInfos[i].JCJG;
        var TIME = data.HZDetailInfos[0].JCInfos[i].Time;

        jc += '<li><p>' + (i + 1) + '、项目名称：<span>' + JCXM + '</span></p><ul class="details"><li>检查结果：<span>' + JCJG + '</span></li><li><time>时间：' + TIME + '</p></time></li></ul></li>';
    }
    for (var i = 0; i < data.HZDetailInfos[0].JYInfos.length; i++) {
        var jymc = data.HZDetailInfos[0].JYInfos[i].JYMC;
        var jyz = data.HZDetailInfos[0].JYInfos[i].JYZ;
        var ckz = data.HZDetailInfos[0].JYInfos[i].CKZ;
        var status = data.HZDetailInfos[0].JYInfos[i].Status;
        var time = data.HZDetailInfos[0].JYInfos[i].Time;
        var mark = '';
        var font = '';
        switch (status) {
        case 1:
            mark = 'low';
            font = 'flow';
            break;
        case 2:
            mark = 'high';
            font = 'fhigh';
            break;
        case 3:
            mark = 'yang';
            break;
        case 4:
            mark = '';
            break;
        }

        jy += '<li><p>' + (i + 1) + '、项目名称：<span>' + jymc + '</span></p><ul class="details"><li>检验值：<span class="' + font + '">' + jyz + '</span><span class="' + mark + '"></span></li><li>参考值：<span>' + ckz + '</span></li><li><time>时间：' + time + '</time></li></ul></li>';
    }
    for (var i = 0; i < data.HZDetailInfos[0].YZInfos.length; i++) {
        var con = data.HZDetailInfos[0].YZInfos[i].Cotent;
        var lb = data.HZDetailInfos[0].YZInfos[i].LB;
        var pc = '频次：' + data.HZDetailInfos[0].YZInfos[i].PC;
        var time = '时间：' + data.HZDetailInfos[0].YZInfos[i].Time;
        if (con == 'null') {
            con = '';
        }
        if (lb == 'null') {
            lb = '';
        }
        if (pc == 'null') {
            pc = '';
        }
        if (time == 'null') {
            time = '';
        }
        opinion += '<li><p>' + con + '</p><ul class="details"><li><span class="ttag">' + lb + '</span></li><li>' + pc + '</li><li><time>' + time + '</time></li></ul></li>';
    }
    conwrap = '<div class="conwrap scroller"><div class="scrollwrap"><ul class="rowul"><li><ul class="lineul"><li class="pname">' + data.HZDetailInfos[0].NAME + '</li><li class="pbnum f-666">床号：' + data.HZDetailInfos[0].CWDM + '</li><li class="sex f-666">性别：' + data.HZDetailInfos[0].SEX + '</li><li class="age f-666">年龄：' + data.HZDetailInfos[0].AGE + '</li><li class="pname f-666">入院天数：' + data.HZDetailInfos[0].RYTS + '</li></ul></li><li class="scroll"><ul class="lineul"><li class="title"name="#ZD">诊断：</li><li class="con">' + data.HZDetailInfos[0].ZDNR + '</li></ul></li><li class="scroll"><ul class="lineul"><li class="title"name="#SMTZ">生命体征：</li><li><div class="signCurve"><span class="timetag"></span><div class="curve pull-right"style="position: relative;"><label id="all"><span></span>全部</label><div id="chart"></div></div></div></li></ul></li><li class="scroll"><ul class="lineul"><li class="title"name="#XBS">现病史：</li><li class="con">' + data.HZDetailInfos[0].XBS + '</li></ul></li><li class="scroll"><ul class="lineul"><li class="title"name="#JC">检查：</li><li class="con"><ul class="opinions jc">' + jc + '</ul></li></ul></li><li class="scroll"><ul class="lineul"><li class="title"name="#ZY">检验：</li><li class="con"><ul class="opinions jy">' + jy + '</ul></li></ul></li><li class="scroll"><ul class="lineul"><li class="title"name="#DRYZ">当日医嘱：</li><li class="con opcon"><ul class="opinions">' + opinion + '</ul></li></ul></li></ul></div></div>';

    bedsbox = '<div class="titlewrap">' + txtwrap + '</div><div class="leftwrap"><div class="titlewrap"><h3>' + RWName + '</h3><span class="all">' + pallnums + '人</span></div>' + leftwrap + '</div><div id="changeCon" class="listsWrap">' + conwrap + '</div>';
    nav = '<nav class="snav plnav"><ul><li><a >诊断</a></li><li><a >生命体征</a></li><li><a >现病史</a></li><li><a >检查</a></li><li><a >检验</a></li><li><a >当日医嘱</a></li></ul></nav>';

    $(boxid).html(bedsbox + nav);

    /*选中*/
    $('.beds .num').removeClass('on');
    $('.beds .num').eq(_index).addClass('on');
    //重置锚点状态
    $('#pLists .snav a').removeClass('active');

    /*绘制图表和表格*/
    charts('chart', CH, 0, 'all', 'm');

    $(".plnav li").click(function () {
        var _this = $(this),
            _index = _this.index();
        _top = $("#pLists .scroll").eq(_index).position().top;
        $("#pLists .scroller").animate({
            scrollTop: _top + "px"
        }, 800);
        $('#pLists .snav a').removeClass('active');
        $('#pLists .snav a').eq(_index).addClass('active');
    });

    var oTops = [];
    var items = document.getElementsByClassName('scroll');
    for (var i = 0; i < items.length; i++) {
        oTops.push(items[i].offsetTop);
    }
    /*slider for nav*/
    slider({
        'scrollA': '#pLists .snav a',
        'scroller': '#pLists .scroller',
        'scroll': '#pLists .scroll',
        'topArr': oTops
    });
}

/*切换床号*/
function changeList(data, RWName, CH) {
	var chlen = data.HZDetailInfos.length;
    var listsCon = '';
    var conwrap = '';
    var opinion = '';
    var jc = '';
    var jy = '';
    txtwrap = '<h2>病人信息</h2><a class="close" title="关闭" onclick="triggerbox(1,\'pLists\')"></a><span class="shadowline"></span><span class="shadowlined"></span>';
    for (var i = 0; i < data.HZDetailInfos[0].JCInfos.length; i++) {
        var JCXM = data.HZDetailInfos[0].JCInfos[i].JCXM;
        var JCJG = data.HZDetailInfos[0].JCInfos[i].JCJG;
        var TIME = data.HZDetailInfos[0].JCInfos[i].Time;

        jc += '<li><p>' + (i + 1) + '、项目名称：<span>' + JCXM + '</span></p><ul class="details"><li>检查结果：<span>' + JCJG + '</span></li><li><time>时间：' + TIME + '</p></time></li></ul></li>';
    }
    for (var i = 0; i < data.HZDetailInfos[0].JYInfos.length; i++) {
        var jymc = data.HZDetailInfos[0].JYInfos[i].JYMC;
        var jyz = data.HZDetailInfos[0].JYInfos[i].JYZ;
        var ckz = data.HZDetailInfos[0].JYInfos[i].CKZ;
        var status = data.HZDetailInfos[0].JYInfos[i].Status;
        var time = data.HZDetailInfos[0].JYInfos[i].Time;
        var mark = '';
        var font = '';
        switch (status) {
        case 1:
            mark = 'low';
            font = 'flow';
            break;
        case 2:
            mark = 'high';
            font = 'fhigh';
            break;
        case 3:
            mark = 'yang';
            break;
        case 4:
            mark = '';
            break;
        }

        jy += '<li><p>' + (i + 1) + '、项目名称：<span>' + jymc + '</span></p><ul class="details"><li>检验值：<span class="' + font + '">' + jyz + '</span><span class="' + mark + '"></span></li><li>参考值：<span>' + ckz + '</span></li><li><time>时间：' + time + '</time></li></ul></li>';
    }
    for (var i = 0; i < data.HZDetailInfos[0].YZInfos.length; i++) {
        var con = data.HZDetailInfos[0].YZInfos[i].Cotent;
        var lb = data.HZDetailInfos[0].YZInfos[i].LB;
        var pc = '频次：' + data.HZDetailInfos[0].YZInfos[i].PC;
        var time = '时间：' + data.HZDetailInfos[0].YZInfos[i].Time;
        if (con == 'null') {
            con = '';
        }
        if (lb == 'null') {
            lb = '';
        }
        if (pc == 'null') {
            pc = '';
        }
        if (time == 'null') {
            time = '';
        }
        opinion += '<li><p>' + con + '</p><ul class="details"><li><span class="ttag">' + lb + '</span></li><li>' + pc + '</li><li><time>' + time + '</time></li></ul></li>';
    }
    conwrap = '<div class="conwrap scroller"><div class="scrollwrap"><ul class="rowul"><li><ul class="lineul"><li class="pname">' + data.HZDetailInfos[0].NAME + '</li><li class="pbnum f-666">床号：' + data.HZDetailInfos[0].CWDM + '</li><li class="sex f-666">性别：' + data.HZDetailInfos[0].SEX + '</li><li class="age f-666">年龄：' + data.HZDetailInfos[0].AGE + '</li><li class="pname f-666">入院天数：' + data.HZDetailInfos[0].RYTS + '</li></ul></li><li class="scroll"><ul class="lineul"><li class="title"name="#ZD">诊断：</li><li class="con">' + data.HZDetailInfos[0].ZDNR + '</li></ul></li><li class="scroll"><ul class="lineul"><li class="title"name="#SMTZ">生命体征：</li><li><div class="signCurve"><span class="timetag"></span><div class="curve pull-right"style="position: relative;"><label id="all"><span></span>全部</label><div id="chart"></div></div></div></li></ul></li><li class="scroll"><ul class="lineul"><li class="title"name="#XBS">现病史：</li><li class="con">' + data.HZDetailInfos[0].XBS + '</li></ul></li><li class="scroll"><ul class="lineul"><li class="title"name="#JC">检查：</li><li class="con"><ul class="opinions jc">' + jc + '</ul></li></ul></li><li class="scroll"><ul class="lineul"><li class="title"name="#ZY">检验：</li><li class="con"><ul class="opinions jy">' + jy + '</ul></li></ul></li><li class="scroll"><ul class="lineul"><li class="title"name="#DRYZ">当日医嘱：</li><li class="con opcon"><ul class="opinions">' + opinion + '</ul></li></ul></li></ul></div></div>';
    $("#changeCon").html(conwrap)
    //重置锚点状态
    $('#pLists .snav a').removeClass('active');

    /*绘制图表和表格*/
    charts('chart', CH, 0, 'all', 'm');

    var oTops = [];
    var items = document.getElementsByClassName('scroll');
    for (var i = 0; i < items.length; i++) {
        oTops.push(items[i].offsetTop);
    }
    /*slider for nav*/
    slider({
        'scrollA': '#pLists .snav a',
        'scroller': '#pLists .scroller',
        'scroll': '#pLists .scroll',
        'topArr': oTops
    });
}

/*change content*/
function changeCon(para) {
    var _index = $(para).index();
    var search = para.getAttribute('search').split('-');
    $.ajax({
        url: pdetailsurl,
        type: "GET",
        dataType: "json",
        data: {
            bqdm: BQDM,
            ch: search[0]
        },
        error: function () {
            alert("查询错误");
        },
        success: function (data) {
            //showchange(data);
            //参数：病人详情 - 任务名称 - 床号（传递给曲线请求）- 标识床号index
            if (search[1] === '压疮评估' || search[1] === '跌倒评估' || search[1] === '导管评估') {
                /*选中*/
                var mytype = '';
                switch (search[1]) {
                case '压疮评估':
                    mytype = 3;
                    break;
                case '跌倒评估':
                    mytype = 4;
                    break;
                case '导管评估':
                    mytype = 5;
                    break;
                }
                $('.beds .num').removeClass('on');
                $(para).children('.num').addClass('on');
                //重置锚点状态
                $('#pLists .snav a').removeClass('active');
                charts('onlyChart', search[0], mytype, '', 's');
            } else {
            	$('.beds .num').removeClass('on');
                $(para).children('.num').addClass('on');
                changeList(data, search[1], search[0]);
            }
        }
    });
}

/*showpDetails*/
function showpDetails(span) {
        var CH = span.getAttribute('search');

        /*request pdetails*/
        pDetails(CH);
        createObj('pdetails', 'pdetails', 0);
        /*show or hide box*/
        var bedsbox = document.getElementById('pdetails');
        if (bedsbox.style.opacity == 1) {
            triggerbox(1, "pdetails");
        } else {
            setTimeout(function () {
                triggerbox(0, "pdetails");
            }, 150);

        }
    }
    /*pdetails data*/
function pDetails(CH) {
        $.ajax({
            url: pdetailsurl,
            type: "GET",
            dataType: "json",
            data: {
                bqdm: BQDM,
                ch: CH
            },
            error: function () {
                alert("查询错误");
            },
            success: function (data) {
                /*patient details data*/
                pInfo(data, CH);
            }
        });
    }
    /*p info*/
function pInfo(data, CH) {
    var txtwrap = '';
    var conwrap = '';
    var boxid = "#pdetails";
    var opinion = '';
    var jc = '';
    var jy = '';
    txtwrap = '<div class="titlewrap"><h2>病人信息</h2><a class="close" title="关闭" onclick="triggerbox(1,\'pdetails\')"></a><span class="shadowline"></span></div>';
    for (var i = 0; i < data.HZDetailInfos[0].JCInfos.length; i++) {
        var JCInfos = data.HZDetailInfos[0].JCInfos;
        var JCXM = JCInfos[i].JCXM;
        var JCJG = JCInfos[i].JCJG;
        var TIME = JCInfos[i].Time;

        jc += '<li><p>' + (i + 1) + '、项目名称：<span>' + JCXM + '</span></p><ul class="details"><li>检查结果：<span>' + JCJG + '</span></li><li><time>时间：' + TIME + '</p></time></li></ul></li>';
    }
    for (var i = 0; i < data.HZDetailInfos[0].JYInfos.length; i++) {
        var JYInfos = data.HZDetailInfos[0].JYInfos;
        var jymc = JYInfos[i].JYMC;
        var jyz = JYInfos[i].JYZ;
        var ckz = JYInfos[i].CKZ;
        var status = JYInfos[i].Status;
        var time = JYInfos[i].Time;
        var mark = '';
        var font = '';
        switch (status) {
        case 1:
            mark = 'low';
            font = 'flow';
            break;
        case 2:
            mark = 'high';
            font = 'fhigh';
            break;
        case 3:
            mark = 'yang';
            break;
        case 4:
            mark = '';
            break;
        }

        jy += '<li><p>' + (i + 1) + '、项目名称：<span>' + jymc + '</span></p><ul class="details"><li>检验值：<span class="' + font + '">' + jyz + '</span><span class="' + mark + '"></span></li><li>参考值：<span>' + ckz + '</span></li><li><time>时间：' + time + '</time></li></ul></li>';
    }
    for (var i = 0; i < data.HZDetailInfos[0].YZInfos.length; i++) {
        var YZInfos = data.HZDetailInfos[0].YZInfos;
        var con = YZInfos[i].Cotent;
        var lb = YZInfos[i].LB;
        var pc = '频次：' + YZInfos[i].PC;
        var time = '时间：' + YZInfos[i].Time;
        if (con == 'null') {
            con = '';
        }
        if (lb == 'null') {
            lb = '';
        }
        if (pc == 'null') {
            pc = '';
        }
        if (time == 'null') {
            time = '';
        }
        opinion += '<li><p>' + con + '</p><ul class="details"><li><span class="ttag">' + lb + '</span></li><li>' + pc + '</li><li><time>' + time + '</time></li></ul></li>';
    }
    conwrap = '<div class="conwrap scroller"><div class="scrollwrap"><ul class="rowul"><li><ul class="lineul"><li class="pname">' + data.HZDetailInfos[0].NAME + '</li><li class="pbnum f-666">床号：' + data.HZDetailInfos[0].CWDM + '</li><li class="sex f-666">性别：' + data.HZDetailInfos[0].SEX + '</li><li class="age f-666">年龄：' + data.HZDetailInfos[0].AGE + '</li><li class="pname f-666">入院天数：' + data.HZDetailInfos[0].RYTS + '</li></ul></li><li class="scroll2"><ul class="lineul"><li class="title"name="#ZD">诊断：</li><li class="con">' + data.HZDetailInfos[0].ZDNR + '</li></ul></li><li class="scroll2"><ul class="lineul"><li class="title"name="#SMTZ">生命体征：</li><li><div class="signCurve"><span class="timetag"></span><div class="curve pull-right"style="position: relative;"><label id="sgall"><span></span>全部</label><div id="sgchart"></div></div></div></li></ul></li><li class="scroll2"><ul class="lineul"><li class="title"name="#XBS">现病史：</li><li class="con">' + data.HZDetailInfos[0].XBS + '</li></ul></li><li class="scroll2"><ul class="lineul"><li class="title"name="#JC">检查：</li><li class="con"><ul class="opinions jc">' + jc + '</ul></li></ul></li><li class="scroll2"><ul class="lineul"><li class="title"name="#ZY">检验：</li><li class="con"><ul class="opinions jy">' + jy + '</ul></li></ul></li><li class="scroll2"><ul class="lineul"><li class="title"name="#DRYZ">当日医嘱：</li><li class="con opcon"><ul class="opinions">' + opinion + '</ul></li></ul></li></ul></div></div>';

    nav = '<nav class="snav pdnav"><ul><li><a>诊断</a></li><li><a >生命体征</a></li><li><a >现病史</a></li><li><a >检查</a></li><li><a >检验</a></li><li><a >有效医嘱</a></li></ul></nav>';
    $(boxid).html(txtwrap + conwrap + nav);
    /*绘制图表和表格*/
    charts('sgchart', CH, 0, 'sgall', 'm');
    /*1202_begin*/
    $(".pdnav li").click(function () {
        var _this = $(this),
            _index = _this.index();
        _top = $("#pdetails .scroll2").eq(_index).position().top;
        $('#pdetails .snav a').eq(_index).addClass('active');
        $("#pdetails .scroller").animate({
            scrollTop: _top + "px"
        }, 800);
        $('#pdetails .snav a').removeClass('active');
        $('#pdetails .snav a').eq(_index).addClass('active');

    });
    var oTops = [];
    var items = document.getElementsByClassName('scroll2');
    for (var i = 0; i < items.length; i++) {
        oTops.push(items[i].offsetTop);
        console.log(oTops,'oTops')
    }

    /*slider for nav*/
    slider({
        'scrollA': '#pdetails .snav a',
        'scroller': '#pdetails .scroller',
        'scroll': '#pdetails .scroll2',
        'topArr': oTops
    });

}

/*锚点定位*/
function slider(sobj) {
    /*激活第一个*/
    $(sobj.scrollA).eq(0).addClass('active');

    $(sobj.scroller).scroll(function () {
        var sTop = $(sobj.scroller).scrollTop();
        if (sTop < 70) {

            if ($(sobj.scrollA).eq(0).hasClass('active')) {
                $(sobj.scrollA).removeClass('active');
            }
            $(sobj.scrollA).eq(0).addClass('active');

        } else {

            $(sobj.scrollA).eq(0).removeClass('active');
            for (var i = 0; i < sobj.topArr.length; i++) {
                if (Math.abs(sTop - sobj.topArr[i]) < 25) {
                    $(sobj.scrollA).removeClass('active');
                    $(sobj.scrollA).eq(i).addClass('active');
                }
            }
        }
    });
}

    /*绘制折线图*/
function charts(cwrapid, CH, c_type, allbtn, chartType) {
    var curveUrl = '';
    if (chartType === 's') {
        curveUrl = schartUrl;
    } else if (chartType === 'm') {
        curveUrl = chartUrl;
    }
    /*seriesdata*/
    $.ajax({
        url: curveUrl,
        type: "GET",
        dataType: "json",
        data: {
            bqdm: BQDM,
            ch: CH,
            type: c_type
        },
        error: function () {
            alert("数据加载错误");
        },
        success: function (data) {
            chartData(data);
            /*timetag*/
            var _now = data.LATEST.split('-');
            var _year = _now[0];
            var _mouth = _now[1];
            var _date = _now[2].split(' ')[0];
            var _during = new Date(data.LATEST).getTime() - _hours * 3600 * 1000;
            var _bmouth = new Date(_during).getMonth() + 1;
            var _bdate = new Date(_during).getDate();
            _bmouth < 10 ? _bmouth = '0' + _bmouth : _bmouth;
            _bdate < 10 ? _bdate = '0' + _bdate : _bdate;
            var _ttag = _bmouth + '.' + _bdate + ' - ' + _mouth + '.' + _date + ' (' + _year + '年)';
            if (chartType === 's') //单曲线显示具体时间段
            {
                if (data.chartInfos.length > 0) {
                    var sInfo = data.chartInfos[0].RWInfos;
                    var slen = sInfo.length;
                    _ttag = sInfo[0].ZXSJ.split(' ')[0].replace(/-/g, '/') + ' - ' + sInfo[slen - 1].ZXSJ.split(' ')[0].replace(/-/g, '/');
                    $('.yAxis').eq(0).html('分数');
                    $('.xAxis').eq(0).html('时间');
                } else {
                    _ttag = '';
                    var alarm = '<p class="alarmTxt"><span></span>抱歉，未查询到数据！</p>';
                    $('#changeCon').html(alarm);
                }
            }
            $('.timetag').html(_ttag);
        }
    });

    var serieslist = [];

    function chartData(data) {
        if (allbtn !== '') {
            allbtn = '#' + allbtn;
        }
        //初始化echarts
        var myChart = echarts.init(document.getElementById(cwrapid));

        /*legend文字颜色*/
        var txtStyle = {
            color: '#166AFF',
            fontSize: 16
        };
        /*yAxis*/
        var yArr = [{
            type: 'value',
            max: 43,
            min: 33,
            axisTick: {
                show: false
            },
            axisLine: {
                lineStyle: {
                    color: 'rgba(65, 135, 230,0.6)'
                }
            },
            axisLabel: {
                margin: 40,
                formatter: '{value}分',
                textStyle: {
                    fontSize: 16,
                    color: '#666'
                }
            },
            splitLine: {
                show: true,
                lineStyle: {
                    type: 'dashed',
                    color: 'rgba(140, 160, 179,0.35)'
                }
            }
  }];

        if (data.chartInfos.length > 0) {
            var RWName = data.chartInfos[0].RWName;
        }
        switch (RWName) {
        case '压疮评估':
            yArr[0].max = 40;
            yArr[0].min = 0;
            break;
        case '跌倒评估':
            yArr[0].max = 40;
            yArr[0].min = 0;
            break;
        case '导管评估':
            yArr[0].max = 40;
            yArr[0].min = 0;
            break;
        default:
            yArr[0] = {
                type: 'value',
	            name: '体温\n(℃)',
	            min: 35,
	            max: 42,
	            position: 'left',
	            offset: 180,
	            interval: 1,
	            axisTick: {
	                show: false
	            },
	            axisLine: {
	                lineStyle: {
	                    color: "#15ACFF"
	                }
	            },
	            axisLabel: {
	            	margin: 18
		        },
	            splitLine: {
	                show: true,
	                lineStyle: {
	                    type: 'dashed',
	                    color: 'rgba(140, 160, 179,0.35)'
	                }
	            }
            };
        }

        /*坐标轴最大最小值-脉搏、血压、呼吸*/
        var	offsetArr = [120,60,0],
        	intervalArr = [22,44,10],
        	minmax = [[192, 60],[220, 0],[70, 20]],
        	colorArr = ["#B883FF","#44DB5E","#F6A623"],
        	nameArr = ["脉搏\n(bpm)","血压\n(mmHg)","呼吸\n(次)"];
        if (data.chartInfos.length > 1) {
        	for (var i = 0; i < 3; i++) {
        		yArr.push({
        			type: 'value',
		            name: nameArr[i],
		            min: minmax[i][1],
		            max: minmax[i][0],
		            position: 'left',
		            offset: offsetArr[i],
		            interval: intervalArr[i],
		            axisTick: {
		                show: false
		            },
		            axisLine: {
		                lineStyle: {
		                    color: colorArr[i]
		                }
		            },
		            axisLabel: {
		            	margin: 18
		            },
		            splitLine: {
		                show: false
		            }
        		});
        	}
        }

        var colorsheet = [{
            itemColor: '#15ACFF',
            isColor: 'rgba(0, 156, 238, 0.4)',
            lsColor: 'rgba(0, 156, 238, 0.5)',
            areaOff1: 'rgba(0, 156, 238, 0.25)'
  }, {
            itemColor: '#B883FF',
            isColor: 'rgba(184, 131, 255, 0.4)',
            lsColor: 'rgba(184, 131, 255,0.5)',
            areaOff1: 'rgba(184, 131, 255, 0.25)'
  }, {
            itemColor: '#44DB5E',
            isColor: 'rgba(68, 219, 94, 0.4)',
            lsColor: 'rgba(68, 219, 94,0.5)',
            areaOff1: 'rgba(68, 219, 94, 0.25)'
  }, {
            itemColor: '#F6A623',
            isColor: 'rgba(246, 166, 35, 0.4)',
            lsColor: 'rgba(246, 166, 35,0.5)',
            areaOff1: 'rgba(246, 166, 35, 0.25)'
  }];

        /*series data*/
        function pushdata(_argu) {
                var _obj = {
                    name: _argu.name,
                    yAxisIndex: _argu.yAxisIndex,
                    type: 'line',
                    smooth: false,
                    symbol: _argu.symbol, //个性化图标
                    symbolSize: _argu.sbsize,
                    itemStyle: {
                        normal: {
                            color: _argu.itemColor,
                            borderWidth: 2,
                            shadowColor: _argu.itemColorsdColor,
                            shadowBlur: 10,
                            shadowOffsetY: 4
                        },
                        emphasis: {
                            color: _argu.emphasis
                        }
                    },
                    animation: false,
                    /*关闭动画*/
                    /*[时间，测量值，测量者]*/
                    data: _argu.data,
                    lineStyle: {
                        normal: {
                            width: 2,
                            color: _argu.lineColor,
                            shadowColor: _argu.linesdColor,
                            shadowBlur: 10,
                            shadowOffsetY: 5
                        }
                    },
                    areaStyle: {
                        normal: {
                            color: new echarts.graphic.LinearGradient(0, 1, 0, 0, [{
                                offset: 0,
                                color: 'rgba(255, 255, 255, 0.1)'
      }, {
                                offset: 1,
                                color: _argu.areaColor1
      }])
                        }
                    }
                };
                return _obj;
            }
            /*血压收缩压部分*/
        var _dqData = [];
        var _dqIndex = 0;
        for (var k = 0, chartlen = data.chartInfos.length; k < chartlen; k++) {
            var seriesdata = [];
            var rwlen = data.chartInfos[k].RWInfos.length;
            var dataArgu = {};
            for (var z = 0; z < rwlen; z++) {
                var RWName = data.chartInfos[k].RWName;
                var RWInfo = data.chartInfos[k].RWInfos[z];
                var symbolimg = '';
                var sbsize = 12;

                /*生命体征*/
                if (chartlen > 1) {
                    switch (RWName) {
                    case '呼吸':
                        symbolimg = 'emptycircle';
                        break;
                    case '体温':
                        symbolimg = 'emptycircle';

                        break;
                    default:
                        symbolimg = 'image://../img/' + data.chartInfos[k].RWName + '.svg';
                        sbsize = 16;
                    }
                    if (RWInfo.VALUE !== '') {
                        if (RWName === '血压') {
                            seriesdata.push([RWInfo.LRRQ, Number(RWInfo.VALUE.split('/')[0]), RWInfo.ZXHS, Number(RWInfo.VALUE.split('/')[1]), RWInfo.ZXSJ]);
                            _dqIndex = k;
                            _dqData.push([RWInfo.LRRQ, Number(RWInfo.VALUE.split('/')[1]), RWInfo.ZXHS, Number(RWInfo.VALUE.split('/')[0]), RWInfo.ZXSJ]);
                            sbsize = 16;
                        } else {
                            seriesdata.push([RWInfo.LRRQ, Number(RWInfo.VALUE), RWInfo.ZXHS, RWInfo.ZXSJ]);
                        }
                    }
                } /*跌倒等单曲线*/
                else {
                    symbolimg = 'emptycircle';
                    if (RWInfo.VALUE !== '') {
                    	var dglx = [];
                    	var dgindex = 0;
                    	for(var arg in RWInfo){
                    		if(arg == 'VALUE'){
                    			RWInfo[arg] = Number(RWInfo[arg]);
                    		}
                    		if(arg == 'DGLX'){
                    		dgindex = dglx.length;
                    		}
                    		dglx.push(RWInfo[arg]);
                    	}
//                  	var dglx = [RWInfo.ZXSJ, Number(RWInfo.VALUE), RWInfo.ZXHS, RWInfo.DInfo];
                        if(parseInt(c_type) !== 5){
                        	dglx.splice(dgindex,1);
                        }
                        seriesdata.push(dglx);
                    }
                }
            }
            //曲线风格及数据
            dataArgu.name = data.chartInfos[k].RWName;
            dataArgu.yAxisIndex = k;
            dataArgu.symbol = symbolimg;
            dataArgu.sbsize = sbsize;
            dataArgu.itemColor = colorsheet[k].itemColor;
            dataArgu.itemColorsdColor = colorsheet[k].isColor;
            dataArgu.emphasis = colorsheet[k].itemColor;
            dataArgu.data = seriesdata;
            dataArgu.lineColor = colorsheet[k].itemColor;
            dataArgu.linesdColor = colorsheet[k].lsColor;
            dataArgu.areaColor1 = colorsheet[k].areaOff1;
            serieslist.push(pushdata(dataArgu));
        }
        serieslist.push(pushdata({
            name: '舒张压',
            yAxisIndex: _dqIndex,
            symbol: 'image://../img/舒张压.svg',
            sbsize: 16,
            itemColor: colorsheet[_dqIndex].itemColor,
            itemColorsdColor: colorsheet[_dqIndex].isColor,
            emphasis: colorsheet[_dqIndex].itemColor,
            data: _dqData,
            lineColor: colorsheet[_dqIndex].itemColor,
            linesdColor: colorsheet[_dqIndex].lsColor,
            areaColor1: 'rgba(255,255,255,0)'
        }));
        /*生命曲线*/
        option = {
            /*提示框*/
            tooltip: {
                showDelay: 5,
                trigger: 'axis',
                hideDelay: 800,
                //triggerOn:'click',
                backgroundColor: 'tranparent',
                transitionDuration: 0,
                textStyle: {
                    color: '#acc0d3',
                    fontFamily: 'Microsoft Yahei',
                    fontSize: 14
                },
                axisPointer: { // 坐标轴指示器
                    type: 'cross',
                    crossStyle: {
                        color: 'rgba(140, 160, 179,0.35)',
                        width: 1,
                        type: 'solid',
                        textStyle: {
                            color: 'transparent'
                        }
                    }
                },
                formatter: function (params) {
                    var res = '';
                    //console.log(params);
                    var title = params.seriesName;
                    var myvalue = '';
                    var shadowColor = '';
                    var txtColor = '';
                    var mytime = params.value[3];
                    var seriesName = params.seriesName;
                    switch (title) {
                    case '体温':
                        myvalue = params.value[1] + '°C';
                        shadowColor = 'rgba(108,194,242,0.25)';
                        txtColor = '#22AEFD';
                        break;
                    case '脉搏':
                        myvalue = params.value[1] + '次/分';
                        shadowColor = 'rgba(184, 131, 255,0.25)';
                        txtColor = '#B883FF';
                        break;
                    case '血压':
                        seriesName = '收缩压';
                        myvalue = params.value[1] + ' mmHg';
                        shadowColor = 'rgba(68, 219, 94,0.25)';
                        txtColor = '#44DB5E';
                        mytime = params.value[4];
                        break;
                    case '舒张压':
                        myvalue = params.value[1] + ' mmHg';
                        shadowColor = 'rgba(68, 219, 94,0.25)';
                        txtColor = '#44DB5E';
                        mytime = params.value[4];
                        break;
                    case '呼吸':
                        myvalue = params.value[1] + '次/分';
                        shadowColor = 'rgba(246, 166, 35,0.25)';
                        txtColor = '#F6A623';
                        break;
                    }
                    res += '<p style="height:10px;text-align:center;">' + seriesName + '<span style="color:' + txtColor + ';padding-left:15px;font-size:16px;">' +
                        myvalue + '</span></p><br/><p style="height:0;padding:16px 0;border-top:1px solid #F2F2F2;">' +
                        '执行护士：<span style="color:' + txtColor + ';">' +
                        params.value[2] + '</span></p>' + '<br/><p style="height:0">执行时间：<span style="color:' + txtColor + ';">' +
                        mytime + '</span></p>';
                    return '<div style="height:150px;background: #FFFFFF;box-shadow: 0 3px 21px 0  ' + shadowColor + ';border-radius: 9px;padding:15px 25px 25px 25px;">' + res + '</div>';
                }
            },
            /*图表与容器的留白距离*/
            grid: {
                top: 46,
                bottom: 50,
                left: 225,
                right: 40
            },
            /*控制组件*/
            legend: {
                right: 35,
                itemGap: 20,
                itemWidth: 10,
                textStyle: {
                    fontSize: 14
                },
                selectedMode: 'multiple',
                data: [{
                    name: '体温',
                    icon: 'circle'
    }, {
                    name: '脉搏',
                    icon: 'circle'
    }, {
                    name: '血压',
                    icon: 'circle'
    }, {
                    name: '呼吸',
                    icon: 'circle'
    }]
            },
            /*x轴*/
            xAxis: [{
                min: new Date(data.LATEST) - _hours * 3600 * 1000,
                max: new Date(data.LATEST),
                interval: _hours * 3600 * 1000 / _splitNum,
                type: 'time',
                boundaryGap: false,
                axisTick: {
                    show: false
                },
                axisLine: {
                    lineStyle: {
                        color: '#8CA0B3'
                    }
                },
                axisLabel: {
                    margin: 20,
                    textStyle: {
                        fontSize: 14,
                        color: '#666'
                    },
                    formatter: function (value, idx) {
                        var _date = new Date(value);
                        var _xaxis = '';
                        if (idx === 0 || idx === _splitNum) {
                            _xaxis = _date.getHours();
                        } else {
                            _xaxis = _date.getHours();
                        }
                        return _xaxis;
                    }
                },
                splitLine: {
                    show: true,
                    lineStyle: {
                        type: 'dashed',
                        color: 'rgba(140, 160, 179,0.25)'
                    }
                },
                splitNumber: _splitNum
   }],
            /*y轴*/
            yAxis: yArr,
            /*曲线序列*/
            series: serieslist
        };

        if (data.chartInfos.length > 0) {
            var scmin = new Date(data.chartInfos[0].RWInfos[0].ZXSJ);
            var scmax = new Date(data.chartInfos[0].RWInfos[data.chartInfos[0].RWInfos.length - 1].ZXSJ);
            var sinterval = (scmax - scmin) / _ssplitNum;
            if (data.chartInfos[0].RWInfos.length === 1) {
                sinterval = 1;
                _ssplitNum = 1;
            }
            /*单曲线*/
            option2 = {
                /*提示框*/
                tooltip: {
                    showDelay: 5,
                    trigger: 'axis',
                    hideDelay: 800,
                    //triggerOn: 'click',
                    backgroundColor: 'tranparent',
                    transitionDuration: 0,
                    textStyle: {
                        color: '#acc0d3',
                        fontFamily: 'Microsoft Yahei',
                        fontSize: 14
                    },
                    axisPointer: { // 坐标轴指示器
                        type: 'cross',
                        crossStyle: {
                            color: 'rgba(140, 160, 179,0.35)',
                            width: 1,
                            type: 'solid',
                            textStyle: {
                                color: 'transparent'
                            }
                        }
                    },
                    formatter: function (params) {
                        //[RWInfo.TIME, RWInfo.PTEMP,  Number(RWInfo.VALUE),RWInfo.ZXHS, RWInfo.DInfo]
                        var res = '';
                        var arr = params.value[3].split('');
                        var arrlen = Math.ceil((arr.length + params.value[3].match(/[\u4E00-\u9FA5]/g).length) / 2);
                        var careInfo = params.value[3];
                        var dglx = '<p style="height:0;padding-top:16px;">导管类型：<span style="color:#22AEFD;">' +
                            params.value[4] + '</span></p><br/>';
                        if(parseInt(c_type)!==5){
                        	dglx = '';
                        }
                        res += '<p style="height:10px;text-align:center;">评估等级<span style="color:#22AEFD;padding-left:16px;font-size:16px;">' +
                            params.value[1] + '分</span></p><br/><p style="height:0;padding-top:16px;border-top:1px solid #F2F2F2;">' +
                            '执行时间：<span style="color:#22AEFD;display:inline-block;width:80px;vertical-align:top;">' +
                            params.value[0] + '</span></p>' + '<br/><p style="height:0;padding-top:16px;">执行护士：<span style="color:#22AEFD;">' +
                            params.value[2] + '</span></p><br/>'+dglx+'<p style="padding-top:16px;">护理措施：<span style="color:#22AEFD;display:inline-block;width:120px;vertical-align:top;text-align:justify;white-space:normal;">' +
                            careInfo + '</span></p>';
                        return '<div style="width:240px;height:auto;background: #FFFFFF;box-shadow: 0 3px 21px 0 rgba(108,194,242,0.50);border-radius: 9px;padding:15px 25px 25px 25px;">' + res + '</div>';
                    }
                },
                /*图表与容器的留白距离*/
                grid: {
                    top: 46,
                    bottom: 50,
                    left: 80,
                    right: 40
                },
                /*控制组件*/
                legend: {
                    right: 35,
                    itemGap: 20,
                    itemWidth: 10,
                    textStyle: {
                        fontSize: 16
                    },
                    selectedMode: 'multiple',
                    data: [{
                        name: data.chartInfos[0].RWName,
                        icon: 'circle'
    }]
                },
                /*x轴*/
                xAxis: [{
                    min: scmin,
                    max: scmax,
                    type: 'time',
                    interval: sinterval,
                    boundaryGap: false,
                    axisTick: {
                        show: false
                    },
                    axisLine: {
                        lineStyle: {
                            color: '#8CA0B3'
                        }
                    },
                    axisLabel: {
                        margin: 20,
                        textStyle: {
                            fontSize: 14,
                            color: '#666'
                        },
                        formatter: function (value, idx) {
                            var _date = new Date(value);
                            return _date.getMonth() + 1 + ' - ' + _date.getDate();
                        }
                    },
                    splitLine: {
                        show: true,
                        lineStyle: {
                            type: 'dashed',
                            color: 'rgba(140, 160, 179,0.25)'
                        }
                    },
                    splitNumber: _ssplitNum
   }],
                /*y轴*/
                yAxis: yArr,
                /*曲线序列*/
                series: serieslist
            };
        }
        if (data.chartInfos.length > 1) {
            //使图表阴影填充显示
            function opacity1() {
                    for (var i = 0; i < option.series.length; i++) {
                        option.series[i].areaStyle.normal.opacity = 1;
                    }
                }
                //使图表阴影填充隐藏
            function opacity0() {
                for (var i = 0; i < option.series.length; i++) {
                    option.series[i].areaStyle.normal.opacity = 0;
                }
            }
            opacity0();

            // 使用刚指定的配置项和数据显示图表。
            myChart.setOption(option);

            //点击显示全部图表
            $(allbtn).click(function () {
                    opacity0()
                    option.legend.selectedMode = 'multiple';
                    $(this).css('color', '#166AFF')
                    option.legend.selected = {
                        '体温': true,
                        '脉搏': true,
                        '血压': true,
                        '舒张压': true,
                        '呼吸': true
                    };
                    myChart.setOption(option);
                })
                //点击分别显示图表
            myChart.on('legendselectchanged', function (params) {
                var data = params.name;
                $(allbtn).css('color', '#8CA0B3');
                option.legend.selected = {
                    '体温': false,
                    '脉搏': false,
                    '血压': false,
                    '舒张压': false,
                    '呼吸': false
                };
                switch (data) {
                case "体温":
                    option.legend.selected.体温 = true;
                    opacity1();
                    break;
                case "脉搏":
                    option.legend.selected.脉搏 = true;
                    opacity1();
                    break;
                case "血压":
                    option.legend.selectedMode = 'multiple';
                    option.legend.selected.舒张压 = true;
                    option.legend.selected.血压 = true;
                    opacity1();
                    break;
                case "呼吸":
                    option.legend.selected.呼吸 = true;
                    opacity1();
                    break;
                }
                myChart.setOption(option);
            });
        } else if (data.chartInfos.length === 1) {
            // 绘制单曲线
            myChart.setOption(option2);
            //评分明细
            myChart.on("click", function (params) {
            	var myNum = 0,
            		scoreArr = [],
            		PFMXArr = [],
            		showDetail = [],
            		RWName = '',
            		scoreHtml = '';
            	c_type = Number(c_type)
            	switch (c_type) {
            		case 3:
            		myNum = 4;
            		RWName = '压疮等级';
            		scoreArr = ['感觉知觉 完全丧失或昏迷','感觉知觉 严重丧失或混乱','感觉知觉 轻度丧失或淡漠','感觉知觉 未丧失或清醒','皮肤 持久潮湿','皮肤 潮湿','皮肤 偶有潮湿','皮肤 极少潮湿','卧床','轮椅', '偶尔步行', '经常步行', '活动能力 完全不能', '活动能力 严重限制', '活动能力 轻度限制', '活动能力 不限制', '营养 恶劣', '营养 不足', '营养 适当', '营养 良好', '摩擦/剪切力 有', '摩擦/剪切力 潜在危险', '摩擦/剪切力 无'];
            		break;
            		case 4:
            		myNum = 4;
            		RWName = '跌倒等级';
            		scoreArr = ['跌倒病史','神志模糊','神志谵妄','神志烦躁','体位性低血压可能','肢体障碍','无自理能力','部分自理能力','使用镇静剂','使用利尿剂', '使用缓泻剂', '使用降糖药', '年龄>=65', '年龄>=75', '年龄>=80'];
            		break;
            		case 5:
            		myNum = 5;
            		RWName = '导管等级';
            		scoreArr = ['胸管','T管','口鼻插管','气管插管','动静脉插管','脑室引流管','PTCD管','ERCP管','腹膜透析管','胃肠管', '双套管', '负压球', '深静脉导管', '三腔管', '造瘘管', '胸腔穿刺管', '腹腔穿刺管', '肾脏穿刺管', 'PICC', '引流管', '导尿管', '输液管', '鼻饲管', '氧气管', '镇痛泵', '意识 烦躁', '意识 谵妄', '意识 模糊'];
            		break;
            	}
            	for(var i = 0; i< params.value[myNum].length; i++) {
            		PFMXArr.push(params.value[myNum][i].MXFS)
            	}
            	for(var i = 0; i < PFMXArr.length; i++) {
            		if(PFMXArr[i] > 0) {
            			showDetail.push([scoreArr[i],PFMXArr[i]]);
            		}
            	}
            	for(var i = 0; i < showDetail.length; i++) {
            		scoreHtml += '<li><span class="name">'+ showDetail[i][0] +'</span><span class="score">'+ showDetail[i][1] +'</span></li>'
            	}
            	$(".scoreBox").html('<div class="zf"><span class="name">'+ RWName +'</span><span class="score">'+ params.value[1] +'</span></div><div class="mx"><ul>'+ scoreHtml +'</ul></div>')
            	$(".scoreBox").css('display','block')
            })
        }
    }
}