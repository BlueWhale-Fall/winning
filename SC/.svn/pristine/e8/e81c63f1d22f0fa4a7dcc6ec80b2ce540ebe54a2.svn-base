var bedsurl = 'data/beds.json';
var bedsAllUrl = 'data/bedsAll.json';  //测量血压测量血糖
var allbedsurl = 'data/beds.json';
var careurl = 'data/carelist.json';
var surgeryurl = 'data/surgery.json';
var outTag = 0;


/* 测量血压和葡萄糖测定 */

/*request bedsdata*/
function bedsInit(RWXH, RWName, RWmark) {
    $.ajax({
        url: bedsurl,
        type: "GET",
        dataType: "json",
        data: {
            bqdm: BQDM,
            rwxh: RWXH
        },
        error: function () {
            alert("查询错误");
        },
        success: function (data) {
            if (RWName == "跌倒评估" || RWName == "压疮评估" || RWName == "导管评估") {
                //请求图表数据
                pallbeds(data, RWName);
                fillCharts(RWName, RWmark, data.CHInfos[0].CH);
            } else {
                beds(data, RWName);
            }
        }
    });
}


//测量血压
function bedsAllInit(RWXH, RWName) {
    $.ajax({
        url: bedsAllUrl,
        type: "GET",
        dataType: "json",
        data: {
            bqdm: BQDM,
            rwxh: RWXH,
            rwname:RWName  //测量血压||葡萄糖测定
        },
        error: function () {
            alert("查询错误");
        },
        success: function (data) {
            if (RWName === "葡萄糖测定" || RWName === "测量血压") {
                bedsAll(data, RWName);
            }
        }
    });

}

/*header beds data*/
function allBeds(RWName, RWXH) {
    $.ajax({
        url: allbedsurl,
        type: "GET",
        dataType: "json",
        data: {
            bqdm: BQDM,
            rwpy: RWXH
        },
        error: function () {
            alert("查询错误");
        },
        success: function (data) {
            beds(data, RWName);
        }
    });
}

/*出院弹窗*/
function leavePop(RWName, RWXH) {
    $.ajax({
        url: allbedsurl,
        type: "GET",
        dataType: "json",
        data: {
            bqdm: BQDM,
            rwpy: RWXH
        },
        error: function () {
            alert("查询错误");
        },
        success: function (data) {
            leave(data, RWName);
        }
    });
}

/*手术弹窗*/
function surgeryPop(RWName, RWXH) {
    $.ajax({
        url: surgeryurl,
        type: "GET",
        dataType: "json",
        data: {
            bqdm: BQDM,
            lb: RWXH
        },
        error: function () {
            alert("查询错误");
        },
        success: function (data) {
            surgery(data, RWName);
        }
    });
}

/*出院弹窗*/
function leave(data, RWName) {
    var txtwrap = '',
        bedswrap = '',
        boxid = '#bedsnum',
        chlen = data.CHInfos.length;
    CHFKInfos = [];
    /*调用科室分组函数*/
    branch(data);
    txtwrap = '<h2>' + RWName + '</h2><span class="rtxt">汇总：<span class="all">' + chlen + '人</span></span><a class="close"  title="关闭" onclick="triggerbox(1,\'bedsnum\')"></a><span class="shadowline"></span>';
    for (var i = 0; i < CHFKInfos.length; i++) {
        var KSMC = CHFKInfos[i].KSMC,
            CHInfos = CHFKInfos[i].CHDM,
            bnum = '';
        for (var j = 0; j < CHInfos.length; j++) {
            var CH = CHInfos[j];
            bnum += '<li><span class="num">' + CH + '</span></li>';
        }
        bedswrap += '<div class="branch"><div><span>' + KSMC + '</span><span>(' + CHInfos.length + ')</span></div><ul>' + bnum + '</ul></div>';
    }
    bedsbox = '<div class="titlewrap">' + txtwrap + '</div><div class="bedwrap scroller"><div class="bedswrap">' + bedswrap + '</div></div>';
    $(boxid).html(bedsbox);
}

/*手术弹窗*/

function surgery(data, RWName) {
    var chlen = data.SSInfos.length,
        tablebody = '',
        txtwrap = '',
        tablewrap = '',
        boxid = "#bedsnum";
    txtwrap = '<h2>' + RWName + '</h2><span class="rtxt">汇总：<span class="all">' + chlen + '人</span></span><a class="close"  title="关闭" onclick="triggerbox(1,\'bedsnum\')"></a><span class="shadowline"></span>';
    for (var i = 0; i < chlen; i++) {
        var time = data.SSInfos[i].SSSJ.slice(8);
        tablebody += '<tr><td><span class="num">' + data.SSInfos[i].CH + '</span></td><td>' + time + '</td><td>' + data.SSInfos[i].SSMC + '</td><td>' + data.SSInfos[i].SSYS + '</td><td>' + data.SSInfos[i].MZFS + '</td></tr>';
    }
    tablewrap = '<table cellpadding="0" cellspacing="0"><tr><th>床位</th><th>手术时间</th><th>手术名称</th><th>主刀医生</th><th>麻醉方式</th></tr>' + tablebody + '</table>';
    bedsbox = '<div class="titlewrap">' + txtwrap + '</div><div class="bedwrap scroller"><div class="bedswrap">' + tablewrap + '</div></div>';
    $(boxid).html(bedsbox);
}

function beds(data, RWName) {
    var chlen = data.CHInfos.length;
    var beds = '';
    var txtwrap = '';
    var bedswrap = '';
    var boxid = "#bedsnum";
    txtwrap = '<h2>' + RWName + '</h2><span class="rtxt">汇总：<span class="all">' + chlen + '人</span></span><a class="close"  title="关闭" onclick="triggerbox(1,\'bedsnum\')"></a><span class="shadowline"></span>';
    for (var i = 0; i < chlen; i++) {
        beds += '<li><span class="num">' + data.CHInfos[i].CH + '</span></li>'
    }
    var bedswrap = '<ul>' + beds + '</ul>';
    bedsbox = '<div class="titlewrap">' + txtwrap + '</div><div class="bedswrap">' + bedswrap + '</div>';
    $(boxid).html(bedsbox);
}

function bedsAll(data, RWName) {
    console.log(data, 'data');
    var chlen = data.RWList.length;
    var beds = '';
    var txtwrap = '';
    var bedswrap = '';
    var boxid = "#bedsnum";
    var allCount = 0;
    for (var i = 0; i < chlen; i++) {
        allCount += data.RWList[i].CHInfos.length;
    }
    txtwrap = '<h2>' + RWName + '</h2><span class="rtxt">汇总：<span class="all">' + allCount + '人</span></span><a class="close"  title="关闭" onclick="triggerbox(1,\'bedsnum\')"></a><span class="shadowline"></span>';
    for (var j = 0; j < chlen; j++) {
        var RW = data.RWList[j];
        console.log(RW, 'RW');
        bedswrap += '<h2>' + RW.RWName + '</h2><span class="rtxt">汇总：<span class="all">' + RW.CHInfos.length + '人</span></span>';
        bedswrap += '<ul>';
        for (var k = 0; k < RW.CHInfos.length; k++) {
            var CHInfo = RW.CHInfos[k];
            bedswrap += '<li><span class="num">' + CHInfo.CH + '</span></li>'
        }
        bedswrap += '</ul>';
    }
    var bedsbox = '<div class="titlewrap">' + txtwrap + '</div><div style="overflow: scroll;height: 580px;"><div class="bedswrap">' + bedswrap + '</div></div>';
    $(boxid).html(bedsbox);
}

/*bedsbox*/
function showbeds(span) {
    var search = span.getAttribute('search').split('-');
    var RWXH = search[0];
    var RWName = search[1];
    var RWmark = search[2];
    var boxId = 'bedsnum';
    var boxClass = 'bedsbox';
    var leave = new RegExp("出院");
    var surgery = new RegExp("手术");
    var surgeryDay = new RegExp("术:");
    var die = new RegExp("死亡");
    if (search.length > 2 && RWmark === 'all') {
        if (leave.test(RWName)) {
            /*出院弹窗*/
            leavePop(RWName, RWXH);
        } else if (die.test(RWName)) {
            /*死亡弹窗*/
            leavePop(RWName, RWXH);
        } else if (surgery.test(RWName)) {
            /*手术弹窗*/
            surgeryPop(RWName, RWXH);
        } else {
            /*header allbeds*/
            allBeds(RWName, RWXH);
        }
    } else {
        if (surgeryDay.test(RWName)) {
            RWXH = RWXH + '-' + RWName
        }
        /*request beds*/
        if (RWName == "跌倒评估" || RWName == "压疮评估" || RWName == "导管评估") {
            boxId = 'pLists';
            boxClass = 'listbox';
        }
        if (RWName.indexOf('葡萄糖测定') >= 0) {
            bedsAllInit(RWXH, '葡萄糖测定');
        } else if (RWName.indexOf('测量血压') >= 0) {
            bedsAllInit(RWXH, '测量血压');
        } else {
            bedsInit(RWXH, RWName, RWmark);
        }
    }
    createObj(boxId, boxClass, 0);
    /*show or hide box*/
    var bedsbox = document.getElementById(boxId);
    if (bedsbox.style.opacity == 1) {
        triggerbox(1, boxId);
        outTag = 0;
    } else {
        setTimeout(function () {
            triggerbox(0, boxId);
        }, 150);
        outTag = 1;
    }
}

/*护理内容box*/
var movemark = 0; //carebox 移动tag
var postag = 0; //carebox 或超出下边界
var oYpos = 0;

/*request carelists*/
function careInit(RWXH, CH) {
    $.ajax({
        url: careurl,
        type: "GET",
        dataType: "json",
        data: {
            bqdm: BQDM,
            ch: CH,
            rwxh: RWXH
        },
        error: function () {
            alert("查询错误");
        },
        success: function (data) {
            careInfo(data);
        }
    });
}

function showcare(span) {
    var search = span.getAttribute('search').split('-');
    var CH = search[0];
    var RWXH = search[1];
    var RWName = search[2];
    var ZXCS = search[3];
    var ZXZS = search[4];
    var ZXSJ = search[5];
    var STATUS = search[6];
    /*request carelists*/
    if (ZXZS > 0) {
        careInit(RWXH, CH);
    }
}

function careInfo(data) {
    /*carelist*/
    var carehtml = '';
    var careul = '';
    for (var i = 0; i < data.PCInfos.length; i++) {
        var ZXSJ = data.PCInfos[i].ZXSJ.split(' ');
        var ZXHS = data.PCInfos[i].ZXHS;
        var STATUS = data.PCInfos[i].STATUS;
        var stuclass = '';
        var nursedes = '';
        if (STATUS.trim() == '完成') {
            stuclass = 'complete';
            nursedes = '执行护士：';
        } else if (STATUS.trim() == '超时') {
            stuclass = 'late';
            nursedes = '责任护士：';
        } else if (STATUS.trim() == '待处理') {
            stuclass = 'continue';
            nursedes = '责任护士：';
        }
        careul += '<li><span class="listnum">' + (i + 1) + '</span><time>' + ZXSJ[0] + '<span class="hour">' + ZXSJ[1] + '</span></time><span class="carestu ' + stuclass + '">' + STATUS + '</span><p class="nursename">' + nursedes + ZXHS + '</p></li>';
    }
    carehtml = '<div class="ttop"><span class="triangle"></span><span class="triangle2"></span></div><div class="tbottom"><span class="triangle3"></span><span class="triangle4"></span></div><div class="carebox scroller"><a class="close"  title="关闭" onclick="triggerbox(1,\'carelist\')"></a><ul class="careul">' + careul + '</ul></div>';
    $('#carelist').html(carehtml);
    var carebox = document.getElementById('carelist');
    if (carebox.style.opacity == 1) {
        triggerbox(1, "carelist");
        movemark = 0;
    } else {
        triggerbox(0, "carelist");

        movemark = 1;
    }
    if (postag == 1) {
        //三角向下
        $('.tbottom').eq(0).css('display', 'block');
        $('.ttop').eq(0).css('display', 'none');
    } else {
        //三角向下
        $('.tbottom').eq(0).css('display', 'none');
        $('.ttop').eq(0).css('display', 'block');
    }
}

/*鼠标移动更改carebox位置*/
function showpos(event) {
    var oY;
    var oLeft;
    var windowH = document.documentElement.clientHeight;
    if (!movemark) {
        oLeft = event.clientX - 100;
        if (event.clientY > 550) {
            oY = event.clientY - 10;
            postag = 1;
            $('#carelist').css('bottom', windowH - oY);
            $('#carelist').css('top', 'auto');
            $('#carelist').css('transform-origin', '34px 100%');
        } else {
            oY = event.clientY + 30;
            postag = 0;
            $('#carelist').css('top', oY);
            $('#carelist').css('bottom', 'auto');
            $('#carelist').css('transform-origin', '34px 0');
        }
        $('#carelist').css('left', oLeft);
        //console.log(event.clientY);
    }
}