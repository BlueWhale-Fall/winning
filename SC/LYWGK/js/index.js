var indexUrl = 'js/data.json',
    BQDM = '0001',
    interTime = 5000;

function indexInit() {
    $.ajax({
        url: indexUrl,
        type: "GET",
        dataType: "json",
        data: {
            bqdm: BQDM
        },
        error: function () {
            alert("数据加载错误");
        },
        success: function (data) {
            /*任务项大标题*/
            titleInit(data);
            /*出院*/
            checkInit(data, 0, '#tdOut', '#tdOut .numbox');
            checkInit(data, 1, '#tmOut', '#tmOut .numbox');
            /*生命体征*/
            vsInit(data);
            /*快速血糖*/
            fastBS(data);
            /*特殊检查项目*/
            special(data);
            /*基础专科护理*/
            tend(data);
            /*药物过敏*/
            allergy(data);
            /*特殊治疗*/
            specialTreat(data);
            /*安全管理*/
            security(data);
            /*治疗*/
            cure(data);
            /*导管*/
            canal(data);
            /*24H*/
            allday(data);
        },
        complete: function (XHR, TS) {
            XHR = null;
            $('#loadWrap').css({'opacity': 0, 'z-index': -1});
        }
    });
}

/*任务项大标题*/
function titleInit(data) {
    $("#leavehospital .dataTitle").html(data.FZinfos[0].FZName);
    $("#VS .dataTitle").html(data.FZinfos[1].FZName);
    $("#special .dataTitle").html(data.FZinfos[2].FZName);
    $("#tend .dataTitle").html(data.FZinfos[3].FZName);
    $("#allergy #guoM .dataTitle").html(data.FZinfos[4].FZName);
    $("#allergy #Tes .dataTitle").html(data.FZinfos[5].FZName);
    $("#security .dataTitle").html(data.FZinfos[6].FZName);
    $("#cure .dataTitle").html(data.FZinfos[7].FZName);
    $("#canal .dataTitle").html(data.FZinfos[8].FZName);
    $("#allday .dataTitle").html(data.FZinfos[9].FZName);
}

function checkInit(data, RWPX, id, ulClass) {
    var FZPX = 1,
        checkdetail = data.FZinfos[FZPX - 1],
        numboxHtml = '',
        checkdata = checkdetail.RWinfos[RWPX].CWinfos,
        length = checkdata.length,
        RWXH = checkdetail.RWinfos[RWPX].RWXH,
        maxNum = 12;
    console.log(RWXH);

    if (length > maxNum) {
        var loopNum = parseInt(length / maxNum),
            remainder = length % maxNum;

        //整页循环
        for (var i = 0; i < loopNum; i++) {
            var j = maxNum * i; //j的初始值
            btmark = (maxNum - 1) * (i + 1) + i + 1; //下标最大值
            numboxliHtml = '';
            for (j; j < btmark; j++) {
                //内容循环
                numboxliHtml += '<li><span class="num" data-search="' + RWXH + '-' + checkdata[j].CWDM + '" onclick="showbox(this)">' + checkdata[j].CWDM + '</span></li>';
            }
            numboxHtml += '<div><ul>' + numboxliHtml + '</ul></div>';
        }
        //余数循环
        if (remainder) {
            var btmark = length - remainder,
                lastNumbox = '';
            for (var k = btmark; k < length; k++) {
                console.log(checkdetail.RWinfos[i].RWXH ,'dasdas')
                lastNumbox += '<li><span class="num"  data-search="' + RWXH + '-' + checkdata[k].CWDM + '" onclick="showbox(this)">' + checkdata[k].CWDM + '</span></li>';
            }
            numboxHtml += '<div><ul>' + lastNumbox + '</ul></div>';
        }
        $(ulClass).html(numboxHtml);
        jQuery(id).slide({
            mainCell: '.numbox',
            autoPage: true,
            effect: "leftLoop",
            autoPlay: true,
            scroll: 1,
            vis: 1,
            mouseOverStop: false,
            interTime: interTime
        });
    } else {
        var numboxliHtml = '';
        for (var i = 0; i < length; i++) {
            /*console.log(checkdetail.RWinfos[0].RWXH ,'dasdas')
            console.log(checkdetail ,'dasdas')
            console.log(checkdata[i].CWDM  ,'dasdas')*/
            numboxliHtml += '<li><span class="num"  data-search="' + RWXH+ '-' + checkdata[i].CWDM + '" onclick="showbox(this)">' + checkdata[i].CWDM + '</span></li>';
        }
        numboxHtml = '<div><ul>' + numboxliHtml + '</ul></div>';
        $(ulClass).html(numboxHtml);
    }

    //目录
    var str = '',
        day = data.DateWeek;
    day = parseInt(day.split(' ')[0].split('-')[2]);
    switch (RWPX) {
        case 0:
            str = '日出院（下午）';
            $('#tdOut .detailtitle').html(day + str);
            break;
        case 1:
            str = '日出院（上午）';
            day = day + 1;
            $('#tmOut .detailtitle').html(day + str);
            break;
    }
}


/*生命体征*/
function vsInit(data) {
    var FZPX = 2,
        checkdetail = data.FZinfos[FZPX - 1],
        checkdata = checkdetail.RWinfos,
        length = checkdata.length,
        ids = ['#BPqd', '#BPbid', '#BPtid', '#R', '#observe', '#pup'],
        maxNum = 6;

    for (var i = 0; i < length; i++) {
        var detailLength = checkdata[i].CWinfos.length;
        if (i < 3) {
            var numboxHtml = '';
            if (detailLength > maxNum) {

                var loopNum = parseInt(detailLength / maxNum),
                    remainder = detailLength % maxNum;

                //整页循环
                for (var x = 0; x < loopNum; x++) {
                    var numboxliHtml = '';
                    j = maxNum * x; //j的初始值
                    btmark = (maxNum - 1) * (x + 1) + x + 1; //下标最大值
                    for (j; j < btmark; j++) {

                        //内容循环
                        numboxliHtml += '<li><span class="num"  data-search="' + checkdata[i].RWXH + '-' + checkdata[i].CWinfos[j].CWDM + '" onclick="showbox(this)">' + checkdata[i].CWinfos[j].CWDM + '</span></li>';
                    }
                    numboxHtml += '<div><ul>' + numboxliHtml + '</ul></div>';
                }
                //余数循环
                if (remainder) {
                    var btmark = detailLength - remainder,
                        lastNumbox = '';
                    for (var k = btmark; k < detailLength; k++) {
                        lastNumbox += '<li><span class="num" data-search="' + checkdata[i].RWXH + '-' + checkdata[i].CWinfos[k].CWDM + '" onclick="showbox(this)">' + checkdata[i].CWinfos[k].CWDM + '</span></li>';
                    }
                    numboxHtml += '<div><ul>' + lastNumbox + '</ul></div>';
                }
                $(ids[i] + " .numbox").html(numboxHtml);
                jQuery(ids[i]).slide({
                    mainCell: '.numbox',
                    autoPage: true,
                    effect: "leftLoop",
                    autoPlay: true,
                    scroll: 1,
                    vis: 1,
                    mouseOverStop: false,
                    interTime: interTime
                });
            } else {
                var numboxliHtml = '';
                for (var n = 0; n < detailLength; n++) {

                    numboxliHtml += '<li><span class="num" data-search="' + checkdata[i].RWXH + '-' + checkdata[i].CWinfos[n].CWDM + '" onclick="showbox(this)">' + checkdata[i].CWinfos[n].CWDM + '</span></li>';
                }
                numboxHtml = '<div><ul>' + numboxliHtml + '</ul></div>';
                $(ids[i] + " .numbox").html(numboxHtml);
            }
            /*任务项名称*/
            $(ids[i] + " .secTitle").html(checkdata[i].RWName)
        } else {
            var detaildataHtml = '',
                detailLength = checkdata[i].CWinfos.length;
            for (var n = 0; n < detailLength; n++) {
                detaildataHtml += '<li><span class="num" data-search="' + checkdata[i].RWXH + '-' + checkdata[i].CWinfos[n].CWDM + '" onclick="showbox(this)">' + checkdata[i].CWinfos[n].CWDM + '</span></li>'
            }
            $(ids[i] + " .detaildata").html('<ul>' + detaildataHtml + '</ul>');
            if (detailLength > 4) {
                jQuery(ids[i]).slide({
                    mainCell: '.detaildata ul',
                    autoPage: true,
                    effect: "leftLoop",
                    autoPlay: true,
                    scroll: 2,
                    vis: 4,
                    mouseOverStop: false,
                    interTime: interTime
                });
            }
            /*任务项名称*/
            if (checkdata[i].RWName.length > 4) {
                $(ids[i] + " .detailtitle").css('font-size', '15px')
            }
            $(ids[i] + " .detailtitle").css('width', '120px')
            $(ids[i] + " .detailtitle").html(checkdata[i].RWName);
        }
    }
}

/*快速血糖*/
function fastBS(data) {
    var detaildata = data.KSXTinfos,
        length = detaildata.length,
        taskBoxHtml = '',
        maxNum = 5;

    if (length > maxNum) {
        var loopNum = parseInt(length / maxNum),
            remainder = length % maxNum;

        //整页循环
        for (var i = 0; i < loopNum; i++) {
            var j = maxNum * i; //j的初始值
            btmark = (maxNum - 1) * (i + 1) + i + 1; //下标最大值
            boxdetailHtml = '';
            for (j; j < btmark; j++) {
                var bfClass = '',
                    dnClass = '',
                    etClass = '',
                    spClass = '';

                //判断是否mark
                if (detaildata[j].ZCQ === 1) {
                    bfClass = 'mark';
                } else {
                    bfClass = '';
                }
                if (detaildata[j].ZWCQ === 1) {
                    dnClass = 'mark';
                } else {
                    dnClass = '';
                }
                if (detaildata[j].SCH2H === 1) {
                    etClass = 'mark';
                } else {
                    etClass = '';
                }
                if (detaildata[j].SQ === 1) {
                    spClass = 'mark';
                } else {
                    spClass = '';
                }
                //内容循环
                boxdetailHtml += '<ul><li><span class="num">' + detaildata[j].CWDM + '</span></li><li class="' + bfClass + '"></li><li class="' + dnClass + '"></li><li class="' + etClass + '"></li><li class="' + spClass + '"></li></ul>';
            }
            taskBoxHtml += '<div>' + boxdetailHtml + '</div>';
        }
        //余数循环
        if (remainder) {
            var btmark = length - remainder,
                lastNumbox = '';
            for (var k = btmark; k < length; k++) {
                var bfClass = '',
                    dnClass = '',
                    etClass = '',
                    spClass = '';

                //判断是否mark
                if (detaildata[k].ZCQ === 1) {
                    bfClass = 'mark';
                } else {
                    bfClass = '';
                }
                if (detaildata[k].ZWCQ === 1) {
                    dnClass = 'mark';
                } else {
                    dnClass = '';
                }
                if (detaildata[k].SCH2H === 1) {
                    etClass = 'mark';
                } else {
                    etClass = '';
                }
                if (detaildata[k].SQ === 1) {
                    spClass = 'mark';
                } else {
                    spClass = '';
                }
                lastNumbox += '<ul><li><span class="num">' + detaildata[k].CWDM + '</span></li><li class="' + bfClass + '"></li><li class="' + dnClass + '"></li><li class="' + etClass + '"></li><li class="' + spClass + '"></li></ul>';
            }
            taskBoxHtml += '<div>' + lastNumbox + '</div>';
        }
        $(".taskBox").html(taskBoxHtml);
        jQuery('#fastBS').slide({
            mainCell: '.taskBox',
            autoPage: true,
            effect: "leftLoop",
            autoPlay: true,
            scroll: 1,
            vis: 1,
            mouseOverStop: false,
            interTime: interTime
        });
    } else {
        var boxdetailHtml = '';
        for (var i = 0; i < length; i++) {
            var bfClass = '',
                dnClass = '',
                etClass = '',
                spClass = '';

            //判断是否mark
            if (detaildata[i].ZCQ === 1) {
                bfClass = 'mark';
            } else {
                bfClass = ' ';
            }
            if (detaildata[i].ZWCQ === 1) {
                dnClass = 'mark';
            } else {
                dnClass = '';
            }
            if (detaildata[i].SCH2H === 1) {
                etClass = 'mark';
            } else {
                etClass = '';
            }
            if (detaildata[i].SQ === 1) {
                spClass = 'mark';
            } else {
                spClass = '';
            }
            boxdetailHtml += '<ul><li><span class="num">' + detaildata[i].CWDM + '</span></li><li class="' + bfClass + '"></li><li class="' + dnClass + '"></li><li class="' + etClass + '"></li><li class="' + spClass + '"></li></ul>';
        }
        taskBoxHtml = '<div>' + boxdetailHtml + '</div>';
        $(".taskBox").html(taskBoxHtml);
    }
}

/*特殊检查项目*/
function special(data) {
    var FZPX = 3,
        checkdetail = data.FZinfos[FZPX - 1],
        checkdata = checkdetail.RWinfos,
        length = checkdata.length,
        ids = ['#GPAP'];

    for (var i = 0; i < length; i++) {
        var detaildataHtml = '',
            detailLength = checkdata[i].CWinfos.length;
        for (var n = 0; n < detailLength; n++) {
            detaildataHtml += '<li><span class="num"   data-search="' + checkdata[i].RWXH + '-' + checkdata[i].CWinfos[n].CWDM + '" onclick="showbox(this)">' + checkdata[i].CWinfos[n].CWDM + '</span></li>'
        }
        $(ids[i] + " .detaildata").html('<ul>' + detaildataHtml + '</ul>');
        if (detailLength > 4) {
            jQuery(ids[i]).slide({
                mainCell: '.detaildata ul',
                autoPage: true,
                effect: "leftLoop",
                autoPlay: true,
                scroll: 2,
                vis: 4,
                mouseOverStop: false,
                interTime: interTime
            });
        }
        /*任务项名称*/
        $(ids[i] + " .detailtitle").html(checkdata[i].RWName);
    }
}

/*基础专科护理*/
function tend(data) {
    var FZPX = 4,
        checkdetail = data.FZinfos[FZPX - 1],
        checkdata = checkdetail.RWinfos,
        length = checkdata.length,
        ids = ['#qdsh', '#whxr', '#qxtg', '#jbcx', '#kqcx', '#wwhl', '#bwb', '#ewb'],
        maxNum = 2;

    for (var i = 0; i < length; i++) {
        var detailLength = checkdata[i].CWinfos.length;
        if (i < 5) {
            var numboxHtml = '';
            if (detailLength > maxNum) {

                var loopNum = parseInt(detailLength / maxNum),
                    remainder = detailLength % maxNum;

                //整页循环
                for (var x = 0; x < loopNum; x++) {
                    var numboxliHtml = '';
                    j = maxNum * x; //j的初始值
                    btmark = (maxNum - 1) * (x + 1) + x + 1; //下标最大值
                    for (j; j < btmark; j++) {

                        //内容循环
                        numboxliHtml += '<li><span class="num"    data-search="' + checkdata[i].RWXH + '-' + checkdata[i].CWinfos[j].CWDM + '" onclick="showbox(this)">' + checkdata[i].CWinfos[j].CWDM + '</span></li>';
                    }
                    numboxHtml += '<div><ul>' + numboxliHtml + '</ul></div>';
                }
                //余数循环
                if (remainder) {
                    var btmark = detailLength - remainder,
                        lastNumbox = '';
                    for (var k = btmark; k < detailLength; k++) {
                        lastNumbox += '<li><span class="num"     data-search="' + checkdata[i].RWXH + '-' + checkdata[i].CWinfos[k].CWDM + '" onclick="showbox(this)">' + checkdata[i].CWinfos[k].CWDM + '</span></li>';
                    }
                    numboxHtml += '<div><ul>' + lastNumbox + '</ul></div>';
                }
                $(ids[i] + " .numbox").html(numboxHtml);
                jQuery(ids[i]).slide({
                    mainCell: '.numbox',
                    autoPage: true,
                    effect: "leftLoop",
                    autoPlay: true,
                    scroll: 1,
                    vis: 1,
                    mouseOverStop: false,
                    interTime: interTime
                });
            } else {
                var numboxliHtml = '';
                for (var n = 0; n < detailLength; n++) {

                    numboxliHtml += '<li><span class="num" data-search="' + checkdata[i].RWXH + '-' + checkdata[i].CWinfos[n].CWDM + '" onclick="showbox(this)">' + checkdata[i].CWinfos[n].CWDM + '</span></li>';
                }
                numboxHtml = '<div><ul>' + numboxliHtml + '</ul></div>';
                $(ids[i] + " .numbox").html(numboxHtml);
            }
            /*任务项名称*/
            $(ids[i] + " .secTitle").html(checkdata[i].RWName)
        } else {
            var detaildataHtml = '',
                detailLength = checkdata[i].CWinfos.length;
            for (var n = 0; n < detailLength; n++) {
                detaildataHtml += '<li><span class="num" data-search="' + checkdata[i].RWXH + '-' + checkdata[i].CWinfos[n].CWDM + '" onclick="showbox(this)">' + checkdata[i].CWinfos[n].CWDM + '</span></li>'
            }
            $(ids[i] + " .detaildata").html('<ul>' + detaildataHtml + '</ul>');
            if (detailLength > 4) {
                jQuery(ids[i]).slide({
                    mainCell: '.detaildata ul',
                    autoPage: true,
                    effect: "leftLoop",
                    autoPlay: true,
                    scroll: 2,
                    vis: 4,
                    mouseOverStop: false,
                    interTime: interTime
                });
            }
            /*任务项名称*/
            $(ids[i] + " .detailtitle").html(checkdata[i].RWName);
        }
    }
}

/*药物过敏*/
function allergy(data) {
    var FZPX = 5,
        checkdetail = data.FZinfos[FZPX - 1],
        checkdata = checkdetail.RWinfos,
        length = checkdata.length,
        ids = ['#spSlide1', '#spSlide2', '#spSlide3'];

    for (var i = 0; i < length; i++) {
        if (i < 6) {
            var detaildataHtml = '',
                detailLength = checkdata[i].CWinfos.length;
            for (var n = 0; n < detailLength; n++) {
                detaildataHtml += '<li><span class="num"  data-search="' + checkdata[i].RWXH + '-' + checkdata[i].CWinfos[n].CWDM + '" onclick="showbox(this)">' + checkdata[i].CWinfos[n].CWDM + '</span></li>'
            }
            $(ids[i] + " .detaildata").html('<ul>' + detaildataHtml + '</ul>');
            if (detailLength > 4) {
                jQuery(ids[i]).slide({
                    mainCell: '.detaildata ul',
                    autoPage: true,
                    effect: "leftLoop",
                    autoPlay: true,
                    scroll: 2,
                    vis: 4,
                    mouseOverStop: false,
                    interTime: interTime
                });
            }
            /*任务项名称*/
            $(ids[i] + " .detailtitle").html(checkdata[i].RWName);
        }
    }
}

/*特殊治疗*/
function specialTreat(data) {
    var FZPX = 6,
        checkdetail = data.FZinfos[FZPX - 1],
        checkdata = checkdetail.RWinfos,
        length = checkdata.length,
        ids = ['#spSlide4', '#spSlide5', '#spSlide6'];
    for (var i = 0; i < length; i++) {
        if (i < 6) {
            var detaildataHtml = '',
                detailLength = checkdata[i].CWinfos.length;
            for (var n = 0; n < detailLength; n++) {
                detaildataHtml += '<li><span class="num" data-search="' + checkdata[i].RWXH + '-' + checkdata[i].CWinfos[n].CWDM + '" onclick="showbox(this)">' + checkdata[i].CWinfos[n].CWDM + '</span></li>'
            }
            $(ids[i] + " .detaildata").html('<ul>' + detaildataHtml + '</ul>');
            if (detailLength > 4) {
                jQuery(ids[i]).slide({
                    mainCell: '.detaildata ul',
                    autoPage: true,
                    effect: "leftLoop",
                    autoPlay: true,
                    scroll: 2,
                    vis: 4,
                    mouseOverStop: false,
                    interTime: interTime
                });
            }
            /*任务项名称*/
            $(ids[i] + " .detailtitle").html(checkdata[i].RWName);
        }
    }
}

/*安全管理*/
function security(data) {
    var FZPX = 7,
        checkdetail = data.FZinfos[FZPX - 1],
        checkdata = checkdetail.RWinfos,
        length = checkdata.length,
        ids = ['#dg', '#yc', '#dd'];

    for (var i = 0; i < length; i++) {
        var detaildataHtml = '',
            detailLength = checkdata[i].CWinfos.length;
        for (var n = 0; n < detailLength; n++) {
            detaildataHtml += '<li><span class="num" data-search="' + checkdata[i].RWXH + '-' + checkdata[i].CWinfos[n].CWDM + '" onclick="showbox(this)">' + checkdata[i].CWinfos[n].CWDM + '</span></li>'
        }
        $(ids[i] + " .detaildata").html('<ul>' + detaildataHtml + '</ul>');
        if (detailLength > 4) {
            jQuery(ids[i]).slide({
                mainCell: '.detaildata ul',
                autoPage: true,
                effect: "leftLoop",
                autoPlay: true,
                scroll: 2,
                vis: 4,
                mouseOverStop: false,
                interTime: interTime
            });
        }
        /*任务项名称*/
        $(ids[i] + " .detailtitle").html(checkdata[i].RWName);
    }
}

/*治疗*/
function cure(data) {
    var FZPX = 8,
        checkdetail = data.FZinfos[FZPX - 1],
        checkdata = checkdetail.RWinfos,
        length = checkdata.length,
        ids = ['#jwt', '#rd', '#yds'];

    for (var i = 0; i < length; i++) {
        var detaildataHtml = '',
            detailLength = checkdata[i].CWinfos.length;
        for (var n = 0; n < detailLength; n++) {
            detaildataHtml += '<li><span class="num" data-search="' + checkdata[i].RWXH + '-' + checkdata[i].CWinfos[n].CWDM + '" onclick="showbox(this)">' + checkdata[i].CWinfos[n].CWDM + '</span></li>'
        }
        $(ids[i] + " .detaildata").html('<ul>' + detaildataHtml + '</ul>');
        if (detailLength > 4) {
            jQuery(ids[i]).slide({
                mainCell: '.detaildata ul',
                autoPage: true,
                effect: "leftLoop",
                autoPlay: true,
                scroll: 2,
                vis: 4,
                mouseOverStop: false,
                interTime: interTime
            });
        }
        /*任务项名称*/
        $(ids[i] + " .detailtitle").html(checkdata[i].RWName);
    }
}

/*导管*/
function canal(data) {
    var FZPX = 9,
        checkdetail = data.FZinfos[FZPX - 1],
        checkdata = checkdetail.RWinfos,
        length = checkdata.length,
        ids = ['#bs', '#PICC', '#fx', '#wg', '#ng'],
        maxNum = 2;

    for (var i = 0; i < length; i++) {
        var detailLength = checkdata[i].CWinfos.length;
        var numboxHtml = '';
        if (detailLength > maxNum) {

            var loopNum = parseInt(detailLength / maxNum),
                remainder = detailLength % maxNum;

            //整页循环
            for (var x = 0; x < loopNum; x++) {
                var numboxliHtml = '';
                j = maxNum * x; //j的初始值
                btmark = (maxNum - 1) * (x + 1) + x + 1; //下标最大值
                for (j; j < btmark; j++) {

                    //内容循环
                    numboxliHtml += '<li><span class="num" data-search="' + checkdata[i].RWXH + '-' + checkdata[i].CWinfos[j].CWDM + '" onclick="showbox(this)">' + checkdata[i].CWinfos[j].CWDM + '</span></li>';
                }
                numboxHtml += '<div><ul>' + numboxliHtml + '</ul></div>';
            }
            //余数循环
            if (remainder) {
                var btmark = detailLength - remainder,
                    lastNumbox = '';
                for (var k = btmark; k < detailLength; k++) {
                    lastNumbox += '<li><span class="num" data-search="' + checkdata[i].RWXH + '-' + checkdata[i].CWinfos[k].CWDM + '" onclick="showbox(this)">' + checkdata[i].CWinfos[k].CWDM + '</span></li>';
                }
                numboxHtml += '<div><ul>' + lastNumbox + '</ul></div>';
            }
            $(ids[i] + " .numbox").html(numboxHtml);
            jQuery(ids[i]).slide({
                mainCell: '.numbox',
                autoPage: true,
                effect: "leftLoop",
                autoPlay: true,
                scroll: 1,
                vis: 1,
                mouseOverStop: false,
                interTime: interTime
            });
        } else {
            var numboxliHtml = '';
            for (var n = 0; n < detailLength; n++) {

                numboxliHtml += '<li><span class="num" data-search="' + checkdata[i].RWXH + '-' + checkdata[i].CWinfos[n].CWDM + '" onclick="showbox(this)">' + checkdata[i].CWinfos[n].CWDM + '</span></li>';
            }
            numboxHtml = '<div><ul>' + numboxliHtml + '</ul></div>';
            $(ids[i] + " .numbox").html(numboxHtml);
        }
        /*任务项名称*/
        $(ids[i] + " .secTitle").html(checkdata[i].RWName)
    }
}

/*24H*/

function allday(data) {
    var FZPX = 10,
        checkdetail = data.FZinfos[FZPX - 1],
        checkdata = checkdetail.RWinfos,
        length = checkdata.length,
        ids = ['#crl', '#nl'],
        maxNum = 2;

    for (var i = 0; i < length; i++) {
        var detailLength = checkdata[i].CWinfos.length;
        var numboxHtml = '';
        if (detailLength > maxNum) {

            var loopNum = parseInt(detailLength / maxNum),
                remainder = detailLength % maxNum;

            //整页循环
            for (var x = 0; x < loopNum; x++) {
                var numboxliHtml = '';
                j = maxNum * x; //j的初始值
                btmark = (maxNum - 1) * (x + 1) + x + 1; //下标最大值
                for (j; j < btmark; j++) {

                    //内容循环
                    numboxliHtml += '<li><span class="num" data-search="' + checkdata[i].RWXH + '-' + checkdata[i].CWinfos[j].CWDM + '" onclick="showbox(this)">' + checkdata[i].CWinfos[j].CWDM + '</span></li>';
                }
                numboxHtml += '<div><ul>' + numboxliHtml + '</ul></div>';
            }
            //余数循环
            if (remainder) {
                var btmark = detailLength - remainder,
                    lastNumbox = '';
                for (var k = btmark; k < detailLength; k++) {
                    lastNumbox += '<li><span class="num"    data-search="' + checkdata[i].RWXH + '-' + checkdata[i].CWinfos[k].CWDM + '" onclick="showbox(this)">' + checkdata[i].CWinfos[k].CWDM + '</span></li>';
                }
                numboxHtml += '<div><ul>' + lastNumbox + '</ul></div>';
            }
            $(ids[i] + " .numbox").html(numboxHtml);
            jQuery(ids[i]).slide({
                mainCell: '.numbox',
                autoPage: true,
                effect: "leftLoop",
                autoPlay: true,
                scroll: 1,
                vis: 1,
                mouseOverStop: false,
                interTime: interTime
            });
        } else {
            var numboxliHtml = '';
            for (var n = 0; n < detailLength; n++) {

                numboxliHtml += '<li><span class="num"    data-search="' + checkdata[i].RWXH + '-' + checkdata[i].CWinfos[n].CWDM + '" onclick="showbox(this)">' + checkdata[i].CWinfos[n].CWDM + '</span></li>';
            }
            numboxHtml = '<div><ul>' + numboxliHtml + '</ul></div>';
            $(ids[i] + " .numbox").html(numboxHtml);
        }
        /*任务项名称*/
        $(ids[i] + " .secTitle").html(checkdata[i].RWName)
    }
}

/*责任护士数据请求*/
function nurseInit() {
    $.ajax({
        url: 'js/WGKnurse.json',
        type: "GET",
        dataType: "json",
        data: {
            bqdm: BQDM
        },
        error: function () {
            alert("数据加载错误");
        },
        success: function (data) {
            nurse(data);
        },
        complete: function (XHR, TS) {
            XHR = null;
        }
    });
}

/*值班医生数据请求*/
function doctorInit() {
    $.ajax({
        url: 'js/WGKdoctor.json',
        type: "GET",
        dataType: "json",
        data: {
            bqdm: BQDM
        },
        error: function () {
            alert("数据加载错误");
        },
        success: function (data) {
            doctor(data);
        },
        complete: function (XHR, TS) {
            XHR = null;
        }
    });
}

/*固定数据模拟加载*/
function secondInit() {
    /*指脉氧*/
    infosInit('1', 10, '.fingerNum ul');
    /*移动器械*/
    infosInit('2', 3, '.movehic ul');
    /*固定器械*/
    infosInit('3', 4, '.fixedhic ul');
    nurseInit();
    doctorInit();
}

function infosInit(type, count, dom) {
    $.ajax({
        url: 'js/infos.json',
        type: "POST",
        dataType: "json",
        data: {
            bqdm: BQDM,
            type: type,
            count: count
        },
        error: function () {
            alert("数据加载错误");
        },
        success: function (data) {
            infos(data, dom);
        },
        complete: function (XHR, TS) {
            XHR = null;
        }
    });
}

function infos(data, dom) {
    var datadetail = data.Infos,
        length = datadetail.length,
        infosHtml = '';

    for (var i = 0; i < length; i++) {
        var numHtml = '';
        if (datadetail[i].CWDM !== null && datadetail[i].CWDM !== '' && datadetail[i].CWDM !== 'undefined') {
            numHtml = '<span class="num">' + datadetail[i].CWDM + '</span></div>';
        }
        infosHtml += '<li><div>' + datadetail[i].WZDM + '号</div><div>' + numHtml + '</div></li>';
    }
    $(dom).html(infosHtml);
}

/*责任护士*/
function nurse(data) {
    var datadetail = data.ZRHS,
        length = datadetail.length,
        topicHtml = '';

    for (var i = 0; i < length; i++) {
        var ZRName = datadetail[i].ZRName,
            ZRNameArr = [],
            ZRNameHtml = '';

        ZRNameArr = ZRName.split('/');
        for (var j = 0; j < ZRNameArr.length; j++) {
            ZRNameHtml += '<li><span>' + ZRNameArr[j] + '</span></li>';

        }
        topicHtml += '<div class="dutynurse"><div class="nursename">' + datadetail[i].HSName + '</div><div class="nurseduty"><ul>' + ZRNameHtml + '</ul></div></div>';
    }
    $("#topic").html(topicHtml);
    jQuery('.dutynurse').slide({
        mainCell: '.nurseduty ul',
        autoPage: true,
        effect: "leftMarquee",
        autoPlay: true,
        scroll: 1,
        vis: 1,
        mouseOverStop: false,
        interTime: 30
    });
}


/*值班医生*/
function doctor(data) {
    var ear = data.ZBYS.EZ,
        nose = data.ZBYS.BZ,
        guttur = data.ZBYS.YHZ,
        groupData = [ear, nose, guttur],
        classArr = ['.ear', '.nose', '.guttur'];

    for (var i = 0; i < 3; i++) {
        var groupHtml = '';
        groupHtml = '<div>' + groupData[i][0].YSXM + '</div><div>' + groupData[i][1].YSXM + '</div><div>' + groupData[i][2].YSXM + '</div><div>' + groupData[i][3].YSXM + '</div><div>' + groupData[i][4].YSXM + '</div>';
        $(classArr[i]).html(groupHtml)
    }
}

/*自动刷新部分*/

function refresh() {
    if (navigator.onLine) {
        window.location.reload();
    } else {
        return false;
    }
}

/*loading*/
function load() {
    var ms = 300000;
    setInterval(refresh, ms);
}

//直接调用

load();
