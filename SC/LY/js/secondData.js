var myUrl = "js/data.json";
var BQDM = '0001';

var txtwrap = 1000; /*行内溢出*/
var bedspeed = 4500; /*床号溢出滚动速度 单位ms*/
var pagespeed = 25000; /*分组溢出翻页时间间隔 单位ms*/
var marqueen = 50; /*预约检查文字溢出无缝滚动速度 单位px*/
/*signs_begin*/
function signsInit() {
    $.ajax({
        url: myUrl,
        type: "GET",
        dataType: "json",
        data: {
            bqdm: BQDM
        },
        error: function () {
            alert("数据加载错误");
        },
        success: function (data) {
            document.getElementById('loadWrap').style.opacity = 0;
            document.getElementById('loadWrap').style.zIndex = -1;
            signs(data);
            //animation
            jQuery(".text-left").slide({
                mainCell: ".slide",
                effect: "leftLoop",
                autoPlay: true,
                interTime: 5000,
                mouseOverStop: false
            });
            jQuery(".text-top").slide({
                mainCell: ".slide",
                effect: "topLoop",
                autoPlay: true,
                interTime: 5000,
                mouseOverStop: false
            });
        },
        complete: function (XHR, TS) {
            XHR = null;
        }
    });
}

function signs(data) {
    /*体征*/
    bsInit(data);
    bpreInit(data);
    hcInit(data);
    tmpInit(data);
    amountInit(data);
}

function bsInit(data) {
    //FZPX:2 测血糖
    var FZPX = 2;
    var maxNum = 10;
    var bsDetails = data.FZinfos[FZPX - 1];
    var fzLength = bsDetails.RWinfos.length;
    var length = [];
    var mySlide = [];
    var ids = ['kf', 'bf_2h', 'af_2h', 'pm9', 'pm10', 'am3', 'Q2H', 'Q4H', 'Q6H', 'Q8H'];
    //RW_length
    for (var i = 0; i < fzLength; i++) {
        length.push(bsDetails.RWinfos[i].CWinfos.length);
        mySlide.push('#bsSlide' + (i + 1));
    }
    //目录 top
    var myTitle = '';
    for (var i = 0; i < fzLength; i++) {
        var RWName = bsDetails.RWinfos[i].RWName;
        myTitle += '<li class="title border-right">' + RWName + '</li>';
    }
    $('#bsTitle').html(myTitle);
    //data                         

    for (var i = 0; i < fzLength; i++) {
        var myHtml = '';
        var myLi = '';
        var myId = '#' + ids[i];
        var RWXH = bsDetails.RWinfos[i].RWXH;
        if (length[i] > maxNum) {
            //溢出
            overflow(data, FZPX, i + 1, maxNum, myId, 'text-left', mySlide[i], 'bsList');
        } else {
            for (var j = 0; j < length[i]; j++) {
                var CWDM = bsDetails.RWinfos[i].CWinfos[j].CWDM;
                myLi += '<span class="num" data-search="' + RWXH + '-' + CWDM + '" onclick="showbox(this)">' + CWDM + '</span>';
            }
            myHtml = '<div class="slide_section"><ul class="bsList">' + myLi + '</ul></div>';
            $(mySlide[i]).html(myHtml);
        }
    }
}

function bpreInit(data) {
    //FZPX:3 测血压
    var FZPX = 3;
    var maxNum = 10;
    var bpDetails = data.FZinfos[FZPX - 1];
    var fzLength = bpDetails.RWinfos.length;
    var length = [];
    var mySlide = [];
    var ids = ['bp_qd', 'bp_bid', 'bp_q2h', 'bp_q4h', 'bp_q6h', 'bp_q8h'];

    //RW_len
    for (var i = 0; i < fzLength; i++) {
        length.push(bpDetails.RWinfos[i].CWinfos.length);
        mySlide.push('#bpSlide' + (i + 1));
    }

    //目录
    var topTitle = ''; //top
    for (var i = 0; i < 6; i++) {
        topTitle += '<li class="bpressName border-right">' + bpDetails.RWinfos[i].RWName + '</li>';

    }
    $('#bpTitle').html(topTitle);
    //data
    for (var i = 0; i < fzLength; i++) {
        var myHtml = '';
        var myLi = '';
        var myId = '#' + ids[i];
        var RWXH = bpDetails.RWinfos[i].RWXH;
        if (length[i] > maxNum) {
            //溢出
            overflow(data, FZPX, i + 1, maxNum, myId, 'text-left', mySlide[i], 'bpressList');
        } else {
            for (var j = 0; j < length[i]; j++) {
                var CWDM = bpDetails.RWinfos[i].CWinfos[j].CWDM;
                myLi += '<span class="num" data-search="' + RWXH + '-' + CWDM + '" onclick="showbox(this)">' + CWDM + '</span>';
            }
            myHtml = '<div class="slide_section"><ul class="bpressList">' + myLi + '</ul></div>';
            $(mySlide[i]).html(myHtml);
        }
    }
}

function hcInit(data) {
    //FZPX:3 测血压 - 心电监护
    var FZPX = 3;
    var maxNum = 36;
    var hcDetails = data.FZinfos[FZPX - 1];
    var fzLength = hcDetails.RWinfos[6].CWinfos.length;
    var myLi = '';
    var myHtml = '';
    var RWXH = hcDetails.RWinfos[6].RWXH;
    if (fzLength > maxNum) {
        //溢出
        overflow(data, FZPX, 7, maxNum, '#heartCare', 'text-left', '#hcSlide', 'hCList');
    } else {
        for (var i = 0; i < fzLength; i++) {
            var CWDM = hcDetails.RWinfos[6].CWinfos[i].CWDM;
            myLi += '<span class="num" data-search="' + RWXH + '-' + CWDM + '" onclick="showbox(this)">' + CWDM + '</span>';
        }
        myHtml = '<div class="slide_section"><ul class="hCList">' + myLi + '</ul></div>';
        $('#heartCare').html(myHtml);
    }
}

function amountInit(data) {
    //FZPX:9 24H出入量
    var FZPX = 9;
    var maxNum = 10;
    var bpDetails = data.FZinfos[FZPX - 1];
    var fzLength = bpDetails.RWinfos.length;
    var length = [];
    var mySlide = [];
    var ids = ['oa_in', 'oa_out', 'oa_urine'];

    //RW_len
    for (var i = 0; i < fzLength; i++) {
        length.push(bpDetails.RWinfos[i].CWinfos.length);
        mySlide.push('#oaSlide' + (i + 1));
    }

    //目录
    var topTitle = ''; //top
    for (var i = 0; i < 3; i++) {
        topTitle += '<li class="bpressName border-right">' + bpDetails.RWinfos[i].RWName + '</li>';

    }
    $('#amountTitle').html(topTitle);
    //data
    for (var i = 0; i < fzLength; i++) {
        var myHtml = '';
        var myLi = '';
        var myId = '#' + ids[i];
        var RWXH = bpDetails.RWinfos[i].RWXH;
        if (length[i] > maxNum) {
            //溢出
            overflow(data, FZPX, i + 1, maxNum, myId, 'text-left', mySlide[i], 'amountList');
        } else {
            for (var j = 0; j < length[i]; j++) {
                var CWDM = bpDetails.RWinfos[i].CWinfos[j].CWDM;
                myLi += '<span class="num" data-search="' + RWXH + '-' + CWDM + '" onclick="showbox(this)">' + CWDM + '</span>';
            }
            myHtml = '<div class="slide_section"><ul class="amountList">' + myLi + '</ul></div>';
            $(mySlide[i]).html(myHtml);
        }
    }
}

function tmpInit(data) {
    //FZPX:7 测体温
    var FZPX = 7;
    var maxNum = 10;
    var tmpDetails = data.FZinfos[FZPX - 1];
    var fzLength = tmpDetails.RWinfos.length;
    var length = [];
    var mySlide = [];
    var ids = ['tmp_qd', 'tmp_bid', 'tmp_q2h', 'tmp_q4h', 'tmp_q6h', 'tmp_q8h'];

    //RW_len
    for (var i = 0; i < fzLength; i++) {
        length.push(tmpDetails.RWinfos[i].CWinfos.length);
        mySlide.push('#tmpSlide' + (i + 1));
    }

    //目录
    var topTitle = ''; //top
    for (var i = 0; i < 6; i++) {
        topTitle += '<li class="bpressName border-right">' + tmpDetails.RWinfos[i].RWName + '</li>';

    }
    $('#tmpTitle').html(topTitle);

    for (var i = 0; i < fzLength; i++) {
        var myHtml = '';
        var myLi = '';
        var myId = '#' + ids[i];
        var RWXH = tmpDetails.RWinfos[i].RWXH;
        if (length[i] > maxNum) {
            //溢出
            overflow(data, FZPX, i + 1, maxNum, myId, 'text-left', mySlide[i], 'tmpList');
        } else {
            for (var j = 0; j < length[i]; j++) {
                var CWDM = tmpDetails.RWinfos[i].CWinfos[j].CWDM;
                myLi += '<span class="num" data-search="' + RWXH + '-' + CWDM + '" onclick="showbox(this)">' + CWDM + '</span>';
            }
            myHtml = '<div class="slide_section"><ul class="tmpList">' + myLi + '</ul></div>';
            $(mySlide[i]).html(myHtml);
        }

    }

}
/*signs_end*/


/*inout_begin*/
function inoutInit() {
    $.ajax({
        url: myUrl,
        type: "GET",
        dataType: "json",
        data: {
            bqdm: BQDM
        },
        error: function () {
            alert("数据加载错误");
        },
        success: function (data) {
            document.getElementById('loadWrap').style.opacity = 0;
            document.getElementById('loadWrap').style.zIndex = -1;
            inout(data);
        },
        complete: function (XHR, TS) {
            XHR = null;
        }
    });
}
//FZPX:1 入出转
function inout(data) {
    var FZPX = 1;
    var inoutDetails = data.FZinfos[FZPX - 1];
    var fzLength = inoutDetails.RWinfos.length;
    var length = [];
    var mySlide = [];
    var ids = [];
    var myTitle = [];
    var bedmax = 27; //行内床号最大显示条数
    var maxNum = 12; //分组最大显示条数
    //wrap
    var wrap = '';
    //RW_len
    for (var i = 0; i < fzLength; i++) {
        length.push(inoutDetails.RWinfos[i].CWinfos.length);
        mySlide.push('inoutSlide' + (i + 1));
        ids.push('ioName' + (i + 1));
        myTitle.push(inoutDetails.RWinfos[i].RWName);
        wrap += '<li id="' + ids[i] + '" class="border-bottom floatL"><span class="secTitles">' + myTitle[i] + '</span><div id="' + mySlide[i] + '" class="slide"></div></li>';
    }
    $('#inout .infoList').html(wrap);

    //data
    for (var i = 0; i < fzLength; i++) {
        var myId = '#' + ids[i];
        var myLi = '';
        var myHtml = '';
        var RWXH = inoutDetails.RWinfos[i].RWXH;
        mySlide[i] = '#' + mySlide[i];
        for (var k = 0; k < length[i]; k++) {
            var CWDM = inoutDetails.RWinfos[i].CWinfos[k].CWDM;
            myLi += '<li><span class="num" data-search="' + RWXH + '-' + CWDM + '" onclick="showbox(this)">' + CWDM + '</span></li>';
            myHtml = '<ul class="ioList">' + myLi + '</ul>';
            $(mySlide[i]).html(myHtml);
        }
        /*行内溢出*/
        var maincell = mySlide[i] + ' ul';
        jQuery(myId).slide({
            mainCell: maincell,
            autoPage: true,
            effect: "leftLoop",
            autoPlay: true,
            scroll: 5,
            vis: bedmax,
            mouseOverStop: false,
            interTime: bedspeed
        });
    }

    //翻页
    txttop(maxNum);

    var grouplen = parseInt(fzLength / maxNum) + 1;
    //页数
    pagenum(grouplen);

}
/*inout_end*/

/*special_begin*/
function specialInit() {
    $.ajax({
        url: myUrl,
        type: "GET",
        dataType: "json",
        data: {
                bqdm: BQDM
            },
        error: function () {
            alert("数据加载错误");
        },
        success: function (data) {
            document.getElementById('loadWrap').style.opacity = 0;
            document.getElementById('loadWrap').style.zIndex = -1;
            special(data);
        },
        complete: function (XHR, TS) {
            XHR = null;
        }
    });
}

function special(data) {
    //FZPX:4 特殊治疗
    var FZPX = 4;
    var specialDetails = data.FZinfos[FZPX - 1];
    var fzLength = specialDetails.RWinfos.length;
    var length = [];
    var mySlide = [];
    var ids = [];
    var myTitles = [];
    var maxNum = 12; //分组最大显示条数
    var bedmax = 24; //行内床号最大显示条数
    var wrap = '';

    //RW_len
    for (var i = 0; i < fzLength - 1; i++) {
        length.push(specialDetails.RWinfos[i].CWinfos.length);
        mySlide.push('spSlide' + (i + 1));
        ids.push('spName' + (i + 1));

        if (i > fzLength - 4) {
            myTitles.push('冲洗' + specialDetails.RWinfos[i].RWName);
        } else {
            myTitles.push(specialDetails.RWinfos[i].RWName);
        }
        wrap += '<li id="' + ids[i] + '" class="border-bottom floatL"><span class="secTitles">' + myTitles[i] + '</span><div id="' + mySlide[i] + '" class="slide"></div></li>';
    }
    $('#specialSlide .infoList').html(wrap);

    //data
    for (var i = 0; i < fzLength - 1; i++) {
        var myHtml = '';
        var myLi = '';
        var myId = '#' + ids[i];
        var RWXH = specialDetails.RWinfos[i].RWXH;
        mySlide[i] = '#' + mySlide[i];
        for (var k = 0; k < length[i]; k++) {
            var CWDM = specialDetails.RWinfos[i].CWinfos[k].CWDM;
            myLi += '<li><span class="num" data-search="' + RWXH + '-' + CWDM + '" onclick="showbox(this)">' + CWDM + '</span></li>';
            myHtml = '<ul class="specialList">' + myLi + '</ul>';
            $(mySlide[i]).html(myHtml);
        }
        /*行内溢出*/
        var maincell = mySlide[i] + ' ul';
        jQuery(myId).slide({
            mainCell: maincell,
            autoPage: true,
            effect: "leftLoop",
            autoPlay: true,
            scroll: 5,
            vis: bedmax,
            mouseOverStop: false,
            interTime: bedspeed
        });
    }
    //翻页
    txttop(maxNum);

    var grouplen = parseInt(fzLength / maxNum);
    if (fzLength % maxNum != 0) {
        grouplen = grouplen + 1;
    }
    //页数
    pagenum(grouplen);
}
/*special_end*/

/*allergy_begin*/
function allergyInit() {
    $.ajax({
        url: myUrl,
        type: "GET",
        dataType: "json",
        data: {
                bqdm: BQDM
            },
        error: function () {
            alert("数据加载错误");
        },
        success: function (data) {
            document.getElementById('loadWrap').style.opacity = 0;
            document.getElementById('loadWrap').style.zIndex = -1;
            allergy(data);
        },
        complete: function (XHR, TS) {
            XHR = null;
        }
    });
}

function allergy(data) {
    //FZPX:5 药敏
    var FZPX = 5;
    var allergyDetails = data.FZinfos[FZPX - 1];
    var RWinfos = allergyDetails.RWinfos[0];
    var fzLength = allergyDetails.RWinfos.length;
    var length = [];
    var mySlide = [];
    var myTitle = [];
    var ids = [];
    var bedmax = 27; //行内床号最大显示条数
    var maxNum = 12; //分组最大显示条数
    var wrap = '';
    //RW_len
    for (var i = 0; i < fzLength; i++) {
        length.push(allergyDetails.RWinfos[i].CWinfos.length);
        mySlide.push('alSlide' + (i + 1));
        ids.push('alName' + (i + 1));
        myTitle.push(allergyDetails.RWinfos[i].RWName);
        wrap += '<li id="' + ids[i] + '" class="border-bottom"><span class="secTitles">' + myTitle[i] + '</span><div id="' + mySlide[i] + '" class="slide"></div></li>';
    }
    $('#allergy .infoList').html(wrap);

    //data
    for (var i = 0; i < fzLength; i++) {
        var myLi = '';
        var myHtml = '';
        var myId = '#' + ids[i];
        mySlide[i] = '#' + mySlide[i];
        var RWXH = allergyDetails.RWinfos[i].RWXH;
        for (var k = 0; k < length[i]; k++) {
            var CWDM = allergyDetails.RWinfos[i].CWinfos[k].CWDM;
            myLi += '<li><span class="num" data-search="' + RWXH + '-' + CWDM + '" onclick="showbox(this)">' + CWDM + '</span></li>';
            myHtml = '<ul class="alList">' + myLi + '</ul>';
            $(mySlide[i]).html(myHtml);
        }
        /*行内溢出*/
        var maincell = mySlide[i] + ' ul';
        jQuery(myId).slide({
            mainCell: maincell,
            autoPage: true,
            effect: "leftLoop",
            autoPlay: true,
            scroll: 5,
            vis: bedmax,
            mouseOverStop: false,
            interTime: bedspeed
        });
    }
    //翻页
    txttop(maxNum);

    var grouplen = parseInt(fzLength / maxNum);
    if (fzLength % maxNum != 0) {
        grouplen = grouplen + 1;
    }
    //页数
    pagenum(grouplen);
}
/*allergy_end*/

/*duct_begin*/
function ductInit() {
    $.ajax({
        url: myUrl,
        type: "GET",
        dataType: "json",
        data: {
                bqdm: BQDM
            },
        error: function () {
            alert("数据加载错误");
        },
        success: function (data) {
            document.getElementById('loadWrap').style.opacity = 0;
            document.getElementById('loadWrap').style.zIndex = -1;
            duct(data);
        },
        complete: function (XHR, TS) {
            XHR = null;
        }
    });
}

function duct(data) {
    //FZPX:6 导管
    var FZPX = 6;
    var ductDetails = data.FZinfos[FZPX - 1];
    var fzLength = ductDetails.RWinfos.length;
    var length = [];
    var mySlide = [];
    var ids = [];
    var myTitles = [];
    var bedmax = 27; //行内床号最大显示条数
    var maxNum = 12; //分组最大显示条数
    var wrap = '';
    //RW_len
    for (var i = 0; i < fzLength; i++) {
        length.push(ductDetails.RWinfos[i].CWinfos.length);
        ids.push('ductName' + (i + 1));
        mySlide.push('ductSlide' + (i + 1));
        myTitles.push(ductDetails.RWinfos[i].RWName);
        wrap += '<li id="' + ids[i] + '" class=" border-bottom floatL"><span class="secTitles">' + myTitles[i] + '</span><div id="' + mySlide[i] + '" class="slide"></div></li>';
    }
    $('#ductSlide .infoList').html(wrap);

    //data
    for (var i = 0; i < fzLength; i++) {
        var myHtml = '';
        var myLi = '';
        var myId = '#' + ids[i];
        mySlide[i] = '#' + mySlide[i];
        var RWXH = ductDetails.RWinfos[i].RWXH;
        for (var k = 0; k < length[i]; k++) {
            var CWDM = ductDetails.RWinfos[i].CWinfos[k].CWDM;
            myLi += '<li><span class="num" data-search="' + RWXH + '-' + CWDM + '" onclick="showbox(this)">' + CWDM + '</span></li>';
            myHtml = '<ul class="ductList">' + myLi + '</ul>';
            $(mySlide[i]).html(myHtml);
        }
        /*行内溢出*/
        var maincell = mySlide[i] + ' ul';
        jQuery(myId).slide({
            mainCell: maincell,
            autoPage: true,
            effect: "leftLoop",
            autoPlay: true,
            scroll: 5,
            vis: bedmax,
            mouseOverStop: false,
            interTime: bedspeed
        });
    }
    //翻页
    txttop(maxNum);

    var grouplen = parseInt(fzLength / maxNum);
    if (fzLength % maxNum != 0) {
        grouplen = grouplen + 1;
    }
    //页数
    pagenum(grouplen);
}

/*duct_end*/

/*schedule_begin*/
function scheduleInit() {
    $.ajax({
        url: myUrl,
        type: "GET",
        dataType: "json",
        data: {
                bqdm: BQDM
            },
        error: function () {
            alert("数据加载错误");
        },
        success: function (data) {
            document.getElementById('loadWrap').style.opacity = 0;
            document.getElementById('loadWrap').style.zIndex = -1;
            schedule(data);
        },
        complete: function (XHR, TS) {
            XHR = null;
        }
    });
}

function schedule(data) {
    //YYJCinfos 测血压 - 预约检查
    var scheduleDetails = data.YYJCinfos[0];
    var infos = scheduleDetails.Infos;
    var length = infos.length;
    var maxNum = 11; //最大显示条数
    var myHtml = '';
    for (var i = 0; i < length; i++) {
        var mar = '';
        var content = infos[i].Content.split('<br><br>');
        for (var j = 0; j < content.length; j++) {
            if (content[j] != '') {
                if(j != content.length-2)
                {
                    mar += '<li>' + content[j] + '、' + '</li>';
                }
                else
                {
                    mar += '<li style="padding-right:15px;">' + content[j] + '</li>';
                }
            } 
        }
        myHtml += '<li class="border-bottom">' + '<span class="bednum"><span class="num">' + infos[i].CWDM + '</span></span><span class="ckdetail"><div id="sch_bd' + i + '" class="xMarquee"><ul>' + mar + '</ul></div></span><span class="ordertime">' + infos[i].CheckTime + '</span> </li>';
    }
    $('#scheduleSlide').html(myHtml);

    //翻页
    txttop(maxNum);

    var grouplen = parseInt(length / maxNum);
    if (length % maxNum != 0) {
        grouplen = grouplen + 1;
    }
    //页数
    pagenum(grouplen);
    /*行内溢出*/
    for (var i = 0; i < length; i++) {
        sch_id = '#sch_bd' + i;
        $(sch_id).xMarquee({
            speed: 50,
            temp: -1
        });
    }
}
/*schedule_end*/

/*oper_begin*/
function operInit() {
    $.ajax({
        url: myUrl,
        type: "GET",
        dataType: "json",
        data: {
                bqdm: BQDM
            },
        error: function () {
            alert("数据加载错误");
        },
        success: function (data) {
            document.getElementById('loadWrap').style.opacity = 0;
            document.getElementById('loadWrap').style.zIndex = -1;
            operation(data);
        },
        complete: function (XHR, TS) {
            XHR = null;
        }
    });
}

function operation(data) {
    //SSinfos 手术
    var operDetails = data.SSinfos[0];
    var infos = operDetails.Infos;
    var length = infos.length;
    var maxNum = 11;
    var myHtml = '';
    var mygc = '';
    var mytbj = '';

    for (var i = 0; i < length; i++) {
        if (infos[i].GC == 0) {
            mygc = '';
        } else {
            mygc = '<span class="mark"></span>';
        }
        if (infos[i].TBJ == 0) {
            mytbj = '';
        } else {
            mytbj = '<span class="mark"></span>';
        }
        myHtml += '<li class="border-bottom">' + '<span class="font-2"><span class="num">' + infos[i].CWDM + '</span></span><span class="surName font-4">' + infos[i].SSMC + '</span><span class="clysis font-2">' + mygc + '</span></span><span class="defInstru font-3">' + mytbj + '</span></span><span class="surPos font-4">' + infos[i].SSDD + '</span> </li>';
    }
    $('#operSlide').html(myHtml);
    //翻页
    txttop(maxNum);
    var grouplen = parseInt(length / maxNum);
    if (length % maxNum != 0) {
        grouplen = grouplen + 1;
    }
    //页数
    pagenum(grouplen);
}
/*operation_end*/

//向上翻页动画
function txttop(maxNum) {
    jQuery(".txtScroll-top").slide({
        titCell: "#screen",
        mainCell: ".bd .infoList",
        autoPage: true,
        effect: "top",
        autoPlay: true,
        vis: maxNum,
        scroll: maxNum,
        interTime: pagespeed,
        trigger: 'click'
    });
}
// 页数控制

function pagenum(grouplen) {
    if (grouplen == 1) {
        $('#screen li:nth-child(1)').html('');
        $('#screen li:nth-child(1)').css('border-color', 'transparent');
    } else {
        for (var i = 1; i < grouplen + 1; i++) {
            var myLi = '#screen li:nth-child(' + i + ')';
            $(myLi).html('第' + i + '页');
        }
    }
}