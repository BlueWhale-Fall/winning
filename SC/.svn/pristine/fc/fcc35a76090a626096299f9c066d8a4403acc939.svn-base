/*data*/
var myUrl = "data/data.json";
/*首页数据*/
var noteUrl = "data/submit.json";
/*备忘录*/
var nameUrl = "data/submit.json";
/*人员姓名*/
/*print*/
(function () {
    var printBtn = document.getElementById('printbtn');
    var refreshBtn = document.getElementById('refresh');
    printBtn.onclick = function () {
        window.print();
    };
    refreshBtn.onclick = function () {
        window.location.reload();
    }
})();
var datatime; //datatime = grouplen * intertime * loop 
var loop = 5; //循环多少次分组后刷新页面  单位次
var intertime = 30; //翻屏动画延迟 单位s  25秒翻屏
var pagetime = 5; //翻页动画延迟  单位s 5秒护理数据翻页
var txtsp = 50; //文本溢出动画 左移无缝连接动画

/*setinterval*/
if (BQDM !== '') {
    init();
    /*倒计时*/
    /*setInterval(settime, 1000);*/
    var num = intertime;
    $('footer .finaltime').html(num + 'S');
}

function settime() {
    if (num >= 1) {
        num--;
    } else {
        num = intertime - 1;
    }
    $('#screen li').click(function () {
        num = intertime;
    });
    $('footer .finaltime').html(num + 'S');
}

function init() {
    dataInit();
    newDay();
}


function dataInit() {
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
            head(data);
            hcontent(data);
            databody(data);
            bwl(data, 'footer .conwrap', 'notetxt', noteUrl);
            changename(data);
            window.localStorage.setItem('reportBQDM', BQDM);
        }
    });
}

function newDay() {
    now = new Date;
    year = now.getFullYear();
    mouth = now.getMonth() + 1;
    date = now.getDate();
    day = now.getDay();
    weekArr = ['星期日', '星期一', '星期二', '星期三', '星期四', '星期五', '星期六'];
    week = weekArr[day];
    if (mouth < 10) {
        mouth = '0' + mouth;
    }
    if (date < 10) {
        date = '0' + date;
    }
    today = year + '-' + mouth + '-' + date;
}

function head(data) {
    var title = data.Title;
    $('header h1').html(title);
    $('header .headtime').html(today + '&nbsp' + week);
}

function hcontent(data) {
    var headdata = data.HZInfos,
        length = headdata.length,
        RSdata = [],
        XSNRdata = [],
        xtydsHTML = '',
        conWrapWidth,
        xtydsulWidth;

    if (length <= 13) {
        conWrapWidth = 1534;
        xtydsulWidth = 160;
    } else {
        conWrapWidth = 1534;
        xtydsulWidth = 315;
    }

    for (var i = 0; i < length; i++) {
        var search = '';
        if (i < 12) {
            RSdata.push(headdata[i].RS)
            XSNRdata.push(headdata[i].XSNR)
        } else {
            switch (headdata[i].XSNR) {
                case '动态血糖':
                    search = 'DTXT-动态血糖-all'
                    break;
                case '心电监测':
                    search = 'XDJC-心电监测-all'
                    break;
                case '胰岛素泵':
                    search = 'YDSB-胰岛素泵-all'
                    break;
                default:
                    search = headdata[i].XSNR + '-' + headdata[i].XSNR + '-all'
            }
            xtydsHTML += '<li class="spanbtn" search="' + search + '" onclick="showbeds(this)"><span>' + headdata[i].XSNR + '</span><span class="yd pNum">' + headdata[i].RS + '</span></li>'
        }
    }
    var conhtml = '';
    //入院、病危、病重 showLists(this)
    conhtml = '<article class="conWrap" style="width: ' + conWrapWidth + 'px">' +
        '<article class="pNums"><img src="img/people.png" class="leftimg">' +
        '<ul>' +
        '<li search="BRZS-病人总数" onclick="xxshowCount(this)"><span>' + XSNRdata[0] + '</span><span class="totoal pNum">' + RSdata[0] + '</span></li>' +
        '</ul>' +
        '<ul><li class="spanbtn" search="BW-病危" onclick="showLists(this)"><span>' + XSNRdata[2] + '</span><span class="dgernum pNum">' + RSdata[2] + '</span></li>' +
        '<li class="spanbtn" search="BZ-病重" onclick="showLists(this)"><span>' + XSNRdata[3] + '</span><span class="hardnum pNum">' + RSdata[3] + '</span></li>' +
        '<li class="spanbtn" search="SW-死亡-all" onclick="xxshowbeds(this)"><span>' + XSNRdata[4] + '</span><span class="deathnum pNum">' + RSdata[4] + '</span></li>' +
        '<li class="spanbtn" search="RY-入院" onclick="showbeds(this)"><span>' + XSNRdata[1] + '</span><span class="innum pNum">' + RSdata[1] + '</span></li>' +
        '</ul></article><article class="tinOut"><img src="img/post.png" class="middleimg">' +
        '<h2>今日出院</h2>' +
        '<ul><li class="spanbtn" search="JRCYSW-今日出院（上午）-all" onclick="xxshowbeds(this)"><span>上午</span><span class="ttout pNum">' + RSdata[5] + '</span></li>' +
        '<li class="spanbtn" search="JRCYXW-今日出院（下午）-all" onclick="showbeds(this)"><span>下午</span><span class="tbout pNum">' + RSdata[6] + '</span></li>' +
        '</ul><h2>明日出院</h2>' +
        '<ul><li class="spanbtn" search="MRCYSW-明日出院（上午）-all" onclick="showbeds(this)"><span>上午</span><span class="ytout pNum">' + RSdata[7] + '</span></li>' +
        '<li class="spanbtn" search="MRCYXW-明日出院（下午）-all" onclick="xxshowbeds(this)"><span>下午</span><span class="ybout pNum">' + RSdata[8] + '</span></li>' +
        '</ul>' +
        '</article>' +
        '<article class="operation">' +
        '<img src="img/operation.png"76iutr , class="rightimg">' +
        '<ul style="float: left">' +
        '<li class="spanbtn" search="8-今日手术-all" onclick="xxshowbeds(this)"><span>' + XSNRdata[9] + '</span><span class="toper pNum">' + RSdata[9] + '</span></li>' +
        '<li class="spanbtn" search="9-明日手术-all" onclick="xxshowbeds(this)"><span>' + XSNRdata[10] + '</span><span class="yoper pNum">' + RSdata[10] + '</span></li>' +
        '</ul>' +
        '</article>' +
        // '<article class="xtyds"><img src="img/dtxt.png" class="lastimg">' +
        // '<ul style="width: ' + xtydsulWidth + 'px">' + xtydsHTML + '</ul>' +
        // '</article>' +
        '</article>' +
        '<span class="shadowline"></span>';
    $('.headbody').html(conhtml);
}

/*databody_begin*/

function databody(data) {
    var maxnum = 1;
    var grouplist = data.ZRZinfos;
    var grouplen = grouplist.length;
    var sclist = '';
    for (var i = 0; i < grouplen; i++) {
        sclist += '<li class="slist' + i + '"><section class="txtScroll-page"><article class="bd"><ul class="infoList2"></ul></article></section><section class="datafooter"></section></li>';
    }


    $('.txtScroll-screen .infoList1').html(sclist);
    for (var i = 0; i < grouplen; i++) {
        pagedata(data, i);
    }

    //screen animation and printbtn`s position
    if (grouplen > maxnum) {

        var mytime = intertime * 1000; //动画延迟 单位转换s->ms
        $(".txtScroll-screen").slide({
            titCell: "#screen",
            mainCell: ".bd .infoList1",
            autoPage: true,
            effect: "fade",
            autoPlay: false,
            scroll: 1,
            vis: 1,
            interTime: mytime, //动画延迟 单位ms
            mouseOverStop: true,
            trigger: "click",
            delayTime: 1800
        });
        for (var i = 1; i < grouplen + 1; i++) {
            var myLi = '#screen li:nth-child(' + i + ')';
            $(myLi).html('第' + i + '组');
        }
        //change position of funcbtn
        $('.funcbtn').css('right', 81 * grouplen + 'px');
    } else {
        $('.funcbtn').css('right', '150px');
    }
    datatime = grouplen * intertime * loop;
    setInterval(function () {
        window.location.reload();
    }, datatime * 1000);
}

/*--------------pagedata----------------*/

function pagedata(data, grouplist) {
    //group
    var groupinfo = data.ZRZinfos[grouplist];
    //pagelists
    var maxnum = 12; //最大显示个数
    var maxpull = 4; //拖动单位
    var pagehtml = '';
    var listLen = groupinfo.RWinfos.length;
    var iconArr = [];
    for (var i = 0; i < listLen; i++) {
        var now = new Date;
        var bednum = groupinfo.RWinfos[i].CH;
        var birthday = groupinfo.RWinfos[i].CSRQ.trim();
        var age = now.getFullYear() - birthday.substr(0, 4);
        var sex = groupinfo.RWinfos[i].XB.trim();
        var ageimg;
        var imgUrl;
        /*newmark*/

        var newmark = '';
        ryrq = groupinfo.RWinfos[i].RYRQ.trim().substr(4, 4).toString(); //入院日期(月-日)
        md = mouth.toString() + date.toString(); //日期(月-日)
        if (ryrq == md) {
            newmark = '<span>NEW</span>';
        }

        /*birthday*/
        var numstyle;
        birthday = birthday.substr(4, 4).toString();
        (birthday == md) ? (numstyle = 'birth') : (numstyle = 'num');
        /*ageimg*/
        if (age > 48) {
            (sex.trim() === '男') ? (ageimg = 'oldman') : (ageimg = 'oldwm');
        } else if (27 < age && age <= 48) {
            (sex.trim() === '男') ? (ageimg = 'midman') : (ageimg = 'midwm');
        } else if (17 < age && age <= 27) {
            (sex.trim() === '男') ? (ageimg = 'boy') : (ageimg = 'girl');
        } else if (0 <= age && age <= 17) {
            (sex.trim() === '男') ? (ageimg = 'bboy') : (ageimg = 'bgirl');
        }
        imgUrl = '<img src="img/' + ageimg + '.png" search="' + bednum + '" /*onclick="showpDetails(this)"*/>';
        if (groupinfo.RWinfos[i].RYRQ.trim() == '') {
            imgUrl = '';
        }
        /*CGHLInfos*/
        var cglen = groupinfo.RWinfos[i].CGHLInfos.length;
        var cghlcont = '';
        /*BRZTInfos*/
        var fallclass = 'hlicon fallicon';
        var assclass = 'hlicon assicon';
        var hurtclass = 'hlicon hurticon';
        var secclass = 'hlicon secicon';
        var ductclass = 'hlicon ducticon';
        var bedclass = 'hlicon bedicon';
        for (var j = 0; j < cglen; j++) {
            var RWName = groupinfo.RWinfos[i].CGHLInfos[j].RWName.trim();
            var RWXH = groupinfo.RWinfos[i].CGHLInfos[j].RWXH.trim();
            var ZXCS = groupinfo.RWinfos[i].CGHLInfos[j].ZXCS;
            var ZXZS = groupinfo.RWinfos[i].CGHLInfos[j].ZXZS;
            var ZXSJ = groupinfo.RWinfos[i].CGHLInfos[j].ZXSJ;
            var STATUS = groupinfo.RWinfos[i].CGHLInfos[j].STATUS;
            var mark = '';
            var liclass = '';
            /*care level*/
            var care_tag = groupinfo.RWinfos[i].CGHLInfos[j].TAG;
            var btnclass = 'spanbtn';
            if (RWName.indexOf('Ⅰ') != -1) {
                care_tag == 0 ? btnclass = 'spanbtn care_self' : btnclass = 'spanbtn need_care';
            }
            /*care level*/

            if (ZXZS) {
                var markclass = 'markbtn';
                //完成
                if (ZXCS == ZXZS) {
                    liclass = 'complete';
                    mark = '';
                }
                //未完成
                else {
                    //执行次数>0
                    if (ZXCS > 0) {
                        //队尾样式改变
                        if (j == cglen - 1) {
                            markclass = 'markbtn markbtnlast';
                        }
                        mark = '<span class="' + markclass + '" search="' + bednum + '-' + RWXH + '-' + RWName + '-' + ZXCS + '-' + ZXZS + '-' + ZXSJ + '-' + STATUS + '" onclick="showcare(this)" onmouseover="showpos(event)">' + ZXCS + '</span>';
                    }
                    //执行次数为0
                    else {
                        /*执行0次且延迟*/
                        if (STATUS == -1) {
                            //队尾样式改变
                            if (j == cglen - 1) {
                                markclass = 'markbtn belate markbtnlast';
                            } else {
                                markclass = 'markbtn belate';
                            }
                            mark = '<span class="' + markclass + '" search="' + bednum + '-' + RWXH + '-' + RWName + '-' + ZXCS + '-' + ZXZS + '-' + ZXSJ + '-' + STATUS + '" onclick="showcare(this)" onmouseover="showpos(event)">' + ZXCS + '</span>';
                        } else
                        /*执行次数为0但未延迟*/
                        {
                            mark = '';
                        }
                    }
                }
            }
            if (j == cglen - 1) {
                cghlcont += '<li class="' + liclass + '" style="padding-right:22px"><span class="' + btnclass + '" search="' + RWXH + '-' + RWName + '" onclick="showbeds(this)">' + RWName + '</span></li>';//' + mark + '
            } else {
                cghlcont += '<li class="' + liclass + '"><span class="' + btnclass + '" search="' + RWXH + '-' + RWName + '" onclick="showbeds(this)">' + RWName + '、' + '</span></li>';//' + mark + '
            }
        }

        /*ZKHLInfos*/
        var zklen = groupinfo.RWinfos[i].ZKHLInfos.length;
        var zkhlcont;
        (zklen > 0) ? (zkhlcont = '') : (zkhlcont = '<li></li>');
        /*Infos*/
        for (var k = 0; k < zklen; k++) {
            var RWName = groupinfo.RWinfos[i].ZKHLInfos[k].RWName.trim();
            var RWXH = groupinfo.RWinfos[i].ZKHLInfos[k].RWXH.trim();
            if (k == zklen - 1) {
                zkhlcont += '<li style="padding-right:15px"><span class="spanbtn" search="' + RWXH + '-' + RWName + '" onclick="showbeds(this)">' + RWName + '</span></li>';
            } else {
                zkhlcont += '<li><span class="spanbtn" search="' + RWXH + '-' + RWName + '" onclick="showbeds(this)">' + RWName + '、' + '</span></li>';
            }
        }
        /*status*/
        var stainfo = groupinfo.RWinfos[i].BRZTInfos;
        var stalen = stainfo.length;
        var status = '';
        var icons = '';
        icons = '';

        for (var l = 0; l < stalen; l++) {
            var stuname = stainfo[l].ZTName.trim();
            var RWXH = stainfo[l].RWXH.trim();
            var agru = RWXH + '-' + stuname;
            /*3-压疮、4-跌倒、5-导管*/
            if (stuname.indexOf('跌') != -1) {
                icons += '<li><span class="spanbtn" search="' + agru + '-4' + '" onclick="showbeds(this)"><img src="img/fall.png" alt="fall.png" class="' + fallclass + '"></span></li>';
            } else if (stuname.indexOf('压') != -1) {
                icons += '<li><span class="spanbtn" search="' + agru + '-3' + '" onclick="showbeds(this)"><img src="img/ass.png" alt="ass.png" class="' + assclass + '"></span></li>';
            } else if (stuname.indexOf('疼') != -1) {
                icons += '<li><span class="spanbtn" search="' + agru + '" onclick="showbeds(this)"><img src="img/hurt.png" alt="hurt.png" class="' + hurtclass + '"></span></li>';
            } else if (stuname.indexOf('密') != -1) {
                icons += '<li><span class="spanbtn" search="' + agru + '" onclick="showbeds(this)"><img src="img/sec.png" alt="sec.png" class="' + secclass + '"></span></li>';
            } else if (stuname.indexOf('管') != -1) {
                icons += '<li><span class="spanbtn" search="' + agru + '-5' + '" onclick="showbeds(this)"><img src="img/duct.png" alt="duct.png" class="' + ductclass + '"></span></li>';
            } else if (stuname.indexOf('隔离') != -1) {
                icons += '<li><span class="spanbtn" search="' + agru + '" onclick="showbeds(this)"><img src="img/bed.png" alt="bed.png" class="' + bedclass + '"></span></li>';
            } else if (stuname.indexOf('转') != -1) {
                status += '<li><span class="turn font2 spanbtn" search="' + agru + '" onclick="showbeds(this)">' + stuname + '</span></li>';
            } else if (stuname.indexOf('手术') != -1) {
                status += '<li><span class="font4 oper spanbtn" search="' + agru + '" onclick="showbeds(this)">' + stuname + '</span></li>';
            } else if (stuname.indexOf('术后') != -1) {
                status += '<li><span class="font4 postoper spanbtn" search="' + agru + '" onclick="showbeds(this)">' + stuname + '</span></li>';
            } else if (stuname.indexOf('出院') != -1) {
                status += '<li><span class="font4 out spanbtn" search="' + agru + '" onclick="showbeds(this)">' + stuname + '</span></li>';
            } else if (stuname.indexOf('关注') != -1) {
                status += '<li><span class="spanbtn" search="' + agru + '" onclick="showbeds(this)"><img src="img/care.png" alt="care.png"></li>';
            } else if (stuname.indexOf('值') != -1) {
                status += '<li><span class="dangerbtn" search="' + agru + '-' + bednum + '" onclick="dangerLogin(this)"><img src="img/danger.png" alt="care.png"></span></li>';
            } else if (stuname.indexOf('死') != -1) {
                status += '<li><span class="font2 death spanbtn" search="' + agru + '" onclick="showbeds(this)">' + stuname + '</span></li>';
            } else if (stuname.indexOf('+') != -1) {
                status += '<li><span class="font4 allery spanbtn" search="' + agru + '" onclick="showbeds(this)">' + stuname + '</span></li>';
            } else if (stuname.indexOf('病危') != -1) {
                status += '<li><span class="danger font2 spanbtn" search="' + agru + '" onclick="showbeds(this)">' + stuname + '</span></li>';
            } else if (stuname.indexOf('病重') != -1) {
                status += '<li><span class="hard font2 spanbtn" search="' + agru + '" onclick="showbeds(this)">' + stuname + '</span></li>';
            } else {
                status += '<li><span class="font4 out spanbtn" search="' + RWXH + '-' + stuname + '" onclick="showbeds(this)">' + stuname + '</span></li>';
            }
        }
        iconArr.push(icons);
        /*判断行内数据*/

        pagehtml += '<li><ul class="coninfos"><li class="newmark">' + newmark + '</li><li class="bednum"><span class="' + numstyle + '">' + bednum + '</span></li><li  class="ageimg" pos = "img' + grouplist + i + '">' + imgUrl + '</li><li class="nm-care"><article id="nm_bd' + grouplist + i + '" class="xMarquee nmmar"><ul>' + cghlcont + '</ul></article></li><li class="sp-care"><article id="sp_bd' + grouplist + i + '" class="xMarquee spmar"><ul>' + zkhlcont + '</ul></article></li><li class="status"><article id="stu_bd' + grouplist + i + '" class="xMarquee stumar"><ul>' + status + iconArr[i] + '</ul></article></li></ul></li>';
        var pgselector = '.slist' + grouplist + ' .infoList2';
        $(pgselector).html(pagehtml);
    }

    for (m = 0; m < listLen; m++) {
        nm_id = '#nm_bd' + grouplist + m;
        sp_id = '#sp_bd' + grouplist + m;
        stu_id = '#stu_bd' + grouplist + m;
        marqueen(nm_id);
        marqueen(sp_id);
        marqueen(stu_id);
    }
    if (listLen > maxnum) {
        //翻页动画
        var mytime = pagetime * 1000;
        $(".txtScroll-page").slide({
            mainCell: ".bd .infoList2",
            autoPage: true,
            effect: "top",
            autoPlay: true,
            scroll: maxpull,
            vis: maxnum,
            interTime: mytime,
            mouseOverStop: true
        });
    }
    //datafooter
    var packetnum = groupinfo.ZRZXH;
    var groupnum = groupinfo.ZRZMC;
    var dcname = groupinfo.ZRZYS;
    var dcposition = groupinfo.YSZC;
    var nurse = groupinfo.ZRZHS;
    var nposition = groupinfo.HSZC;
    var datafooter = '';
    datafooter = ' <article class="groupwrap"><div class="grouptext">责任制分组</div><div class="groupbg">' + groupnum + '</div></article><article data-num="' + packetnum + '" class="dnwrap no-padding"><div class="dcwrap"><div class="dataimgbox"><div class="dataimg"><img src="img/' + dcname + '.png" alt="医生头像"></div></div><div class="pull-left datadcbox"><input id="dcname" class="dcname" type="text" value="' + dcname + '"/><input id="dcjob" class="dcposition" type="text" value="' + dcposition + '"><div class="dctitle">责任医生</div><div class="dcline"></div></div></div><div class="nswrap"><div class="dataimgbox"><div class="dataimg"><img src="img/' + nurse + '.png" alt="护士头像"></div></div><div class="pull-left datadcbox"><input id="nsname" class="dcname" type="text" value="' + nurse + '"/><input id="nsjob" class="dcposition" type="text" value="' + nposition + '"><div class="dctitle">责任护士</div><div class="dcline"></div></div></div></article>' +
        '<article class="iconswrap">' +
        '<div class="legendline">' +
        '<span class="spanbtn" search="46-跌倒评估" onclick="showbeds(this)"><img src="img/fall.png" class="ficon fallicon"></span><span class="legendtext">跌倒评估</span>' +
        '<span class="spanbtn" search="47-压疮评估" onclick="showbeds(this)"><img src="img/ass.png" class="ficon assicon"></span><span class="legendtext">压疮评估</span>' +
        '<span class="spanbtn" search="48-疼痛评估" onclick="showbeds(this)"><img src="img/hurt.png" class="ficon hurticon"></span><span class="legendtext">疼痛评估</span>' +
        // '<span class="spanbtn" search="69-关注病人" onclick="showbeds(this)"><img src="img/care.png" class="ficon careicon"></span><span class="legendtext">关注病人</span>' +
        '<span class="spanbtn" search="45-导管评估" onclick="showbeds(this)"><img src="img/duct.png" class="ficon ducticon"></span><span class="legendtext">导管评估</span>' +
        // '</div>' +
        // '<div class="legendline">' +
        // '<span class="spanbtn" search="19-病情保密" onclick="showbeds(this)"><img src="img/sec.png" class="ficon secicon"></span><span class="legendtext">病情保密</span>' +
        // '<span class="spanbtn" search="45-导管评估-5" onclick="showbeds(this)"><img src="img/duct.png" class="ficon ducticon"></span><span class="legendtext">导管评估</span>' +
        // '<span class="spanbtn" search="20-床边隔离" onclick="showbeds(this)"><img src="img/bed.png" class="ficon bedicon"></span><span class="legendtext">床边隔离</span>' +
        // '<span class="spanbtn"><img src="img/danger.png" class="ficon dangericon"></span><span class="legendtext">危急值</span>' +
        // '</div>' +
        '</article>';
    var dfselector = '.txtScroll-screen .slist' + grouplist + ' .datafooter';
    $(dfselector).html(datafooter);
}

/*--------------pagedata---------------*/

/*-----changename-----*/

function changename(data) {
    var input = $(".dnwrap input");
    input.on("blur", function () {
        var name = '',
            job = '',
            jobrank = '',
            packetnum = $(this).parent().parent().parent().data("num");
        switch ($(this).attr("id")) {
            case "dcname":
                job = "医生";
                name = filterBlank($(this).val());
                jobrank = filterBlank($(this).next().val());
                break;
            case "nsname":
                job = "护士";
                name = filterBlank($(this).val());
                jobrank = filterBlank($(this).next().val());
                break;
            case "dcjob":
                job = "医生";
                jobrank = filterBlank($(this).val());
                name = filterBlank($(this).prev().val());
                break;
            case "nsjob":
                job = "护士";
                jobrank = filterBlank($(this).val());
                name = filterBlank($(this).prev().val());
                break;
        }
        $.ajax({
            url: nameUrl,
            type: "GET",
            data: {
                bqdm: BQDM,
                job: job,
                name: name,
                jobrank: jobrank,
                packetnum: packetnum
            },
            error: function () {
                alert("姓名更新失败");
            },
            success: function (data) {
                if (data.r) {
                    window.location.reload();
                    /*更新数据*/
                }
            }
        });
    })
}

/*-----changename end-----*/

function bwl(data, conwrap, txtid, sbnote) {
    //console.log(txtid);
    var bwlinfo = data.BWLInfos;
    var bwlcont = '';
    bwlcont += '<textarea id="' + txtid + '" maxlength="300"></textarea>';
    $(conwrap).html(bwlcont);
    if (bwlinfo.length == 0) {
        return;
    } else {
        $('#' + txtid).html(bwlinfo[0].Content);
    }
    var txtwrap = document.getElementById(txtid);
    if (txtwrap) {
        txtwrap.onblur = function () {
            /*textarea 失焦后提交数据到后台*/
            var content = txtwrap.value;
            $.ajax({
                url: sbnote,
                type: "GET",
                data: {
                    bqdm: BQDM,
                    content: content
                },
                error: function () {
                    alert("备忘录更新失败");
                },
                success: function (data) {
                    if (data.r) {
                        window.location.reload();
                        /*更新数据*/
                    }
                }
            });
        }
    }
}

/*bwl_end*/

function marqueen(wrapid) {
    $(wrapid).xMarquee({
        speed: txtsp,
        temp: -1
    });
}

function createObj(objId, className, oNum) {
    var aobj = document.createElement('aside');
    aobj.setAttribute('id', objId);
    aobj.className = className;
    aobj.style.opacity = oNum;
    aobj.style.zIndex = -1;
    document.body.appendChild(aobj);
}

/*过滤空格*/

function filterBlank(value) {
    return value.replace(/ /g, '');
}