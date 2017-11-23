/*初始化*/
var _init = {
    NKinit: function (URL, BQDM) {
        $.ajax({
            url: URL,
            type: "GET",
            dataType: "json",
            data: {
                bqdm: BQDM
            },
            error: function () {
                alert("数据加载错误");
            },
            success: function (data) {
                /*header*/
                _method.header(data);
                /*任务项大标题*/
                _method.NKtitle(data);
                /*出院*/
                _method.NKcheck(data, 0, 1, '#tdOut', BQDM);
                _method.NKcheck(data, 1, 1, '#tmOut', BQDM);
                /*测血糖*/
                _method.sugerBlood(data, 13);
                /*24H*/
                _method.NKallday(data, 2);
                /*血氧饱和度*/
                _method.NKbloodoxygen(data, 3);
                /*测血压*/
                _method.NKbloodpressure(data, 4);
                /*测心率*/
                _method.NKheartrate(data, 5);
                /*基础护理*/
                _method.NKbasic(data, 6);
                /*三大监控*/
                _method.NKcontrol(data, 7);
                /*药物过敏*/
                _method.NKallergy(data, 8);
                /*特殊导管*/
                _method.NKduct(data, 9);
                /*特殊治疗*/
                _method.NKcure(data, 10);
                /*其他*/
                _method.NKother(data, 11);
                /*自动刷新*/
                _method.load();
            },
            complete: function () {
                $('#loadWrap').css({'opacity': 0,'z-index': -1});
            }
        });
    },
    NKstaffInit: function (URL, BQDM, dom) {
        $.ajax({
            url: URL,
            type: "GET",
            dataType: "json",
            data: {
                bqdm: BQDM
            },
            error: function () {
                alert("数据加载错误");
            },
            success: function (data) {
                _method.NKstaff(data, dom);
            }
        });
    }
}
/*方法*/
var jasmine = {
    chunk: function (array, size) {
        var length = array == null ? 0 : array.length;
        if (!length || size < 1) {
            return [];
        }
        var index = 0,
            resIndex = 0,
            result = Array(Math.ceil(length / size));

        while (index < length) {
            result[resIndex++] = this.baseSlice(array, index, (index += size));
        }
        return result;
    },
    baseSlice: function (array, start, end) {
        var index = -1,
            length = array.length;

        if (start < 0) {
            start = -start > length ? 0 : (length + start);
        }
        end = end > length ? length : end;
        if (end < 0) {
            end += length;
        }
        length = start > end ? 0 : ((end - start) >>> 0);
        start >>>= 0;

        var result = Array(length);
        while (++index < length) {
            result[index] = array[index + start];
        }
        return result;
    }
}

var _method = {
    /*内科title*/
    NKtitle: function (data) {
        $("#leavehospital .dataTitle").html(data.FZinfos[0].FZName);
        $("#sugerBlood .dataTitle").html(data.FZinfos[12].FZName);
        $("#bloodoxygen .dataTitle").html(data.FZinfos[2].FZName);
        $("#bloodpressure .dataTitle").html(data.FZinfos[3].FZName);
        $("#heartrate .dataTitle").html(data.FZinfos[4].FZName);
        $("#basic .dataTitle").html(data.FZinfos[5].FZName);
        $("#control .dataTitle").html(data.FZinfos[6].FZName);
        $("#allergy .dataTitle").html(data.FZinfos[7].FZName);
        $("#duct .dataTitle").html(data.FZinfos[8].FZName);
        $("#cure .dataTitle").html(data.FZinfos[9].FZName);
        $("#other .dataTitle").html(data.FZinfos[10].FZName);
    },
    /*头部*/
    header: function (data) {
        var detail = data.HZInfos,
            today = data.DateWeek,
            TBGZ = Number(detail[10].RS) + Number(detail[11].RS) + Number(detail[12].RS);
        $('#header').html('<section class="head"><div><span class="headtime">' + today + '</span></div><div>' + data.BQTitle + '</div></section><section class="headbody"><article class="headmain">' + '<div class="floatL headborder"><div class="headbox leftimg"></div>' + '<div class="headbox no-padding"><div class="headhighline">' + '<div class="lefttext margin-right-20">病人总数</div>' + '<div class="lefttextnum margin-right-20">' + detail[0].RS + '</div>' + '</div></div><div class="headboxright"><div class="headtextbox">' + '<span class=" headtext margin-right-25">新入院</span>' + '<span class="headnum">' + detail[1].RS + '</span><span class="headtext margin-right-25">' + '转入</span><span class="headnum">' + detail[3].RS + '</span></div><div class="headtextbox">' + '<span class=" headtext margin-right-25 ">出院</span>' + '<span class="headnum">' + detail[2].RS + '</span><span class="headtext margin-right-25">转出' + '</span><span class="headnum">' + detail[4].RS + '</span></div></div></div>' + '<div class="floatL headborder"><div class="headbox middleimg margin-left-30"></div>' + '<div class="headbox no-padding"><div class="headhighline">' + '<div class="lefttext margin-right-20">手术</div>' + '<div class="righttextnum margin-right-40">' + detail[5].RS + '</div></div></div>' + '<div class="headboxright"><div class="headtextbox">' + '<span class=" headtext margin-right-25">特级护理</span>' + '<span class="headnum sCare">' + detail[6].RS + '</span><span class="headtext margin-right-25">' + 'Ⅰ级护理</span><span class="headnum">' + detail[8].RS + '</span></div>' + '<div class="headtextbox"><span class=" headtext margin-right-25">病危</span>' + '<span class="headnum font-red">' + detail[7].RS + '</span><span class="headtext margin-right-25">' + 'Ⅱ级护理</span><span class="headnum">' + detail[9].RS + '</span></div></div></div>' + '<div class="floatL"><div class="headbox rightimg margin-left-30"></div>' + '<div class="headbox no-padding"><div class="headhighline">' + '<div class="lefttext margin-right-20">高危风险</div>' + '<div class="righttextnum">' + TBGZ + '</div></div></div>' + '<div class="headboxright"><div class="headtextbox">' + '<span class=" headtext margin-right-25">压疮</span>' + '<span class="headnum sCare">' + detail[10].RS + '</span><span class="headtext margin-right-25">' + '导管</span><span class="headnum">' + detail[12].RS + '</span></div>' + '<div class="headtextbox"><span class=" headtext margin-right-25">跌倒</span>' + '<span class="headnum Scare">' + detail[11].RS + '</span></div></div>' + '</div></article></section>' + '</article></section>')
    },
    /*内科24H*/
    NKallday: function (data, FZPX) {
        var checkdetail = data.FZinfos[FZPX - 1],
            checkdata = checkdetail.RWinfos,
            length = checkdata.length,
            ids = ['#allday1', '#allday2', '#allday3'];

        for (var i = 0; i < length; i++) {
            var detailLength = checkdata[i].CWinfos.length;
            if (i < 3) {
                this.NFMdbline(6, 1, 1, checkdata, ids, detailLength, i, 'CWinfos');
            }
        }
    },
    /*内科血氧饱和度*/
    NKbloodoxygen: function (data, FZPX) {
        var checkdetail = data.FZinfos[FZPX - 1],
            checkdata = checkdetail.RWinfos,
            length = checkdata.length,
            ids = ['#bloodoxygen1', '#bloodoxygen2', '#bloodoxygen3', '#bloodoxygen4'];

        for (var i = 0; i < length; i++) {
            var detailLength = checkdata[i].CWinfos.length;
            if (i < 4) {
                this.NFMdbline(6, 1, 1, checkdata, ids, detailLength, i, 'CWinfos');
            }
        }
    },
    /*测血压*/
    NKbloodpressure: function (data, FZPX) {
        var checkdetail = data.FZinfos[FZPX - 1],
            checkdata = checkdetail.RWinfos,
            length = checkdata.length,
            ids = ['#bloodpressure1', '#bloodpressure2', '#bloodpressure3', '#bloodpressure4'];

        for (var i = 0; i < length; i++) {
            var detailLength = checkdata[i].CWinfos.length;
            if (i < 4) {
                this.NFMdbline(2, 1, 1, checkdata, ids, detailLength, i, 'CWinfos');
            }
        }
    },
    /*测心率*/
    NKheartrate: function (data, FZPX) {
        var checkdetail = data.FZinfos[FZPX - 1],
            checkdata = checkdetail.RWinfos,
            length = checkdata.length,
            ids = ['#heartrate1', '#heartrate2', '#heartrate3', '#heartrate4'];

        for (var i = 0; i < length; i++) {
            var detailLength = checkdata[i].CWinfos.length;
            if (i < 4) {
                this.NFMdbline(2, 1, 1, checkdata, ids, detailLength, i, 'CWinfos');
            }
        }
    },
    /*基础护理*/
    NKbasic: function (data, FZPX) {
        var checkdetail = data.FZinfos[FZPX - 1],
            checkdata = checkdetail.RWinfos,
            length = checkdata.length,
            ids = ['#basic1', '#basic2', '#basic3', '#basic4'];

        for (var i = 0; i < length; i++) {
            var detailLength = checkdata[i].CWinfos.length;
            if (i < 4) {
                this.NFMdbline(4, 1, 1, checkdata, ids, detailLength, i, 'CWinfos');
            }
        }
    },
    /*三大监控*/
    NKcontrol: function (data, FZPX) {
        var checkdetail = data.FZinfos[FZPX - 1],
            checkdata = checkdetail.RWinfos,
            length = checkdata.length,
            ids = ['#control1', '#control2', '#control3'];

        for (var i = 0; i < length; i++) {
            var detailLength = checkdata[i].CWinfos.length;
            if (i < 3) {
                this.NFMdbline(6, 1, 1, checkdata, ids, detailLength, i, 'CWinfos');
            }
        }
    },
    /*药物过敏*/
    NKallergy: function (data, FZPX) {
        var checkdetail = data.FZinfos[FZPX - 1],
            checkdata = checkdetail.RWinfos,
            length = checkdata.length,
            ids = ['#allergy1', '#allergy2', '#allergy3'];

        for (var i = 0; i < length; i++) {
            var detailLength = checkdata[i].CWinfos.length;
            if (i < 3) {
                this.NFMdbline(6, 1, 1, checkdata, ids, detailLength, i, 'CWinfos');
            }
        }
    },
    /*特殊导管*/
    NKduct: function (data, FZPX) {
        var checkdetail = data.FZinfos[FZPX - 1],
            checkdata = checkdetail.RWinfos,
            length = checkdata.length,
            ids = ['#duct1', '#duct2', '#duct3', '#duct4', '#duct5'];

        for (var i = 0; i < length; i++) {
            var detailLength = checkdata[i].CWinfos.length;
            if (i < 5) {
                this.NFMdbline(6, 1, 1, checkdata, ids, detailLength, i, 'CWinfos');
            }
        }
    },
    /*特殊治疗*/
    NKcure: function (data, FZPX) {
        var checkdetail = data.FZinfos[FZPX - 1],
            CWinfos = this.pushObj(data, FZPX, '膀胱冲洗'),
            ids = ['#cure1', '#cure2', '#cure3', '#cure4', '#cure5', '#cure6', '#cure7'],
            checkdata = [
                {RWName:'雾化吸入',CWinfos:checkdetail.RWinfos[0].CWinfos},
                {RWName:'膀胱冲洗',CWinfos:CWinfos},
                {RWName:'胰岛素泵',CWinfos:checkdetail.RWinfos[4].CWinfos},
                {RWName:'心电监护',CWinfos:checkdetail.RWinfos[5].CWinfos},
                {RWName:'无创呼吸',CWinfos:checkdetail.RWinfos[6].CWinfos},
                {RWName:'呼吸机',CWinfos:checkdetail.RWinfos[7].CWinfos},
                {RWName:'吸氧',CWinfos:checkdetail.RWinfos[8].CWinfos}
            ];
        for (var i = 0; i < checkdata.length; i++) {
            var detailLength = checkdata[i].CWinfos.length;
            if (i < 7) {
                this.NFMdbline(6, 1, 1, checkdata, ids, detailLength, i, 'CWinfos');
            }
        }
    },
    /*其他*/
    NKother: function (data, FZPX) {
        var checkdetail = data.FZinfos[FZPX - 1],
            checkdata = checkdetail.RWinfos,
            length = checkdata.length,
            ids = ['#other1', '#other2', '#other3', '#other4', '#other5', '#other6'];

        for (var i = 0; i < length; i++) {
            var detailLength = checkdata[i].CWinfos.length;
            if (i < 6) {
                this.NFMdbline(6, 1, 1, checkdata, ids, detailLength, i, 'CWinfos');
            }
        }
    },
    /*出院部分*/
    NKcheck: function (data, RWPX, FZPX, id, BQDM) {
        var checkdetail = data.FZinfos[FZPX - 1],
            numboxHtml = '',
            checkdata = checkdetail.RWinfos[RWPX].CWinfos,
            length = checkdata.length,
            maxNum = 12;
        if(length > maxNum) {
            var loopNum = parseInt(length / maxNum),
                remainder = length % maxNum;

            //整页循环
            for(var i = 0; i < loopNum; i++) {
                var j = maxNum * i; //j的初始值
                btmark = (maxNum - 1) * (i + 1) + i + 1; //下标最大值
                numboxliHtml = '';
                for(j; j < btmark; j++) {
                    //内容循环
                    numboxliHtml += '<li><span class="num">' + checkdata[j].CWDM + '</span></li>';
                }
                numboxHtml += '<div><ul>' + numboxliHtml + '</ul></div>';
            }
            //余数循环
            if(remainder) {
                var btmark = length - remainder,
                    lastNumbox = '';
                for(var k = btmark; k < length; k++) {
                    lastNumbox += '<li><span class="num">' + checkdata[k].CWDM + '</span></li>';
                }
                numboxHtml += '<div><ul>' + lastNumbox + '</ul></div>';
            }
            $(id + " .numbox").html(numboxHtml);
            jQuery(id).slide({
                mainCell: '.numbox',
                autoPage: true,
                effect: "leftLoop",
                autoPlay: true,
                scroll: 1,
                vis: 1,
                mouseOverStop: false,
                interTime: 5000
            });
        } else {
            var numboxliHtml = '';
            for(var i = 0; i < length; i++) {
                numboxliHtml += '<li><span class="num">' + checkdata[i].CWDM + '</span></li>';
            }
            numboxHtml = '<div><ul>' + numboxliHtml + '</ul></div>';
            $(id + " .numbox").html(numboxHtml);
        }
        //目录
        switch (RWPX) {
            case 0:
                $('#tdOut .detailtitle').html('今日出院');
                break;
            case 1:
                $('#tmOut .detailtitle').html('明日出院');
                break;
        }
    },
    /*内科测血糖*/
    NKtestBS: function (data) {
        var detaildata = data.CXTinfos,
            length = detaildata.length,
            taskBoxHtml = '',
            maxNum = 6;

        if(length > maxNum) {
            var loopNum = parseInt(length / maxNum),
                remainder = length % maxNum;

            //整页循环
            for(var i = 0; i < loopNum; i++) {
                var j = maxNum * i; //j的初始值
                btmark = (maxNum - 1) * (i + 1) + i + 1; //下标最大值
                boxdetailHtml = '';
                for(j; j < btmark; j++) {
                    var ZCQ = '',
                        ZCH = '',
                        WUQ = '',
                        WUH = '',
                        WANQ = '',
                        WANH = '',
                        NINE = '';
                    //判断是否mark
                    if(detaildata[j].ZCQ == 1) {
                        ZCQ = 'mark';
                    } else {
                        ZCQ = '';
                    }
                    if(detaildata[j].ZCH == 1) {
                        ZCH = 'mark';
                    } else {
                        ZCH = '';
                    }
                    if(detaildata[j].WUQ == 1) {
                        WUQ = 'mark';
                    } else {
                        WUQ = '';
                    }
                    if(detaildata[j].WUH == 1) {
                        WUH = 'mark';
                    } else {
                        WUH = '';
                    }
                    if(detaildata[j].WANQ == 1) {
                        WANQ = 'mark';
                    } else {
                        WANQ = '';
                    }
                    if(detaildata[j].WANH == 1) {
                        WANH = 'mark';
                    } else {
                        WANH = '';
                    }
                    if(detaildata[j].NINE == 1) {
                        NINE = 'mark';
                    } else {
                        NINE = '';
                    }
                    //内容循环
                    boxdetailHtml += '<ul><li><span class="num">' + detaildata[j].CWDM + '</span></li><li class="' + ZCQ + '"></li><li class="' + ZCH + '"></li><li class="' + WUQ + '"></li><li class="' + WUH + '"></li><li class="' + WANQ + '"></li><li class="' + WANH + '"></li><li class="' + NINE + '"></li></ul>';
                }
                taskBoxHtml += '<div>' + boxdetailHtml + '</div>';
            }
            //余数循环
            if(remainder) {
                var btmark = length - remainder,
                    lastNumbox = '';
                for(var k = btmark; k < length; k++) {
                    var ZCQ = '',
                        ZCH = '',
                        WUQ = '',
                        WUH = '',
                        WANQ = '',
                        WANH = '',
                        NINE = '';
                    //判断是否mark
                    if(detaildata[k].ZCQ == 1) {
                        ZCQ = 'mark';
                    } else {
                        ZCQ = '';
                    }
                    if(detaildata[k].ZCH == 1) {
                        ZCH = 'mark';
                    } else {
                        ZCH = '';
                    }
                    if(detaildata[k].WUQ == 1) {
                        WUQ = 'mark';
                    } else {
                        WUQ = '';
                    }
                    if(detaildata[k].WUH == 1) {
                        WUH = 'mark';
                    } else {
                        WUH = '';
                    }
                    if(detaildata[k].WANQ == 1) {
                        WANQ = 'mark';
                    } else {
                        WANQ = '';
                    }
                    if(detaildata[k].WANH == 1) {
                        WANH = 'mark';
                    } else {
                        WANH = '';
                    }
                    if(detaildata[k].NINE == 1) {
                        NINE = 'mark';
                    } else {
                        NINE = '';
                    }
                    //内容循环
                    lastNumbox += '<ul><li><span class="num">' + detaildata[k].CWDM + '</span></li><li class="' + ZCQ + '"></li><li class="' + ZCH + '"></li><li class="' + WUQ + '"></li><li class="' + WUH + '"></li><li class="' + WANQ + '"></li><li class="' + WANH + '"></li><li class="' + NINE + '"></li></ul>';
                }
                taskBoxHtml += '<div>' + lastNumbox + '</div>';
            }
            $(".taskBox").html(taskBoxHtml);
            jQuery('#testBS').slide({
                mainCell: '.taskBox',
                autoPage: true,
                effect: "leftLoop",
                autoPlay: true,
                scroll: 1,
                vis: 1,
                mouseOverStop: false,
                interTime: 5000
            });
        } else {
            var boxdetailHtml = '';
            for(var i = 0; i < length; i++) {
                var ZCQ = '',
                    ZCH = '',
                    WUQ = '',
                    WUH = '',
                    WANQ = '',
                    WANH = '',
                    NINE = '';
                //判断是否mark
                if(detaildata[i].ZCQ == 1) {
                    ZCQ = 'mark';
                } else {
                    ZCQ = '';
                }
                if(detaildata[i].ZCH == 1) {
                    ZCH = 'mark';
                } else {
                    ZCH = '';
                }
                if(detaildata[i].WUQ == 1) {
                    WUQ = 'mark';
                } else {
                    WUQ = '';
                }
                if(detaildata[i].WUH == 1) {
                    WUH = 'mark';
                } else {
                    WUH = '';
                }
                if(detaildata[i].WANQ == 1) {
                    WANQ = 'mark';
                } else {
                    WANQ = '';
                }
                if(detaildata[i].WANH == 1) {
                    WANH = 'mark';
                } else {
                    WANH = '';
                }
                if(detaildata[i].NINE == 1) {
                    NINE = 'mark';
                } else {
                    NINE = '';
                }
                //内容循环
                boxdetailHtml += '<ul><li><span class="num">' + detaildata[i].CWDM + '</span></li><li class="' + ZCQ + '"></li><li class="' + ZCH + '"></li><li class="' + WUQ + '"></li><li class="' + WUH + '"></li><li class="' + WANQ + '"></li><li class="' + WANH + '"></li><li class="' + NINE + '"></li></ul>';
            }
            taskBoxHtml = '<div>' + boxdetailHtml + '</div>';
            $(".taskBox").html(taskBoxHtml);
        }
    },
    NFMline: function (maxnum, scroll, checkdata, ids, i) {
        var detaildataHtml = '',
            detailLength = checkdata[i].CWinfos.length;
        for (var n = 0; n < detailLength; n++) {
            detaildataHtml += '<li><span class="num">' + checkdata[i].CWinfos[n].CWDM + '</span></li>'
        }
        $(ids[i] + " .detaildata").html('<ul>' + detaildataHtml + '</ul>');
        if (detailLength > maxnum) {
            jQuery(ids[i]).slide({
                mainCell: '.detaildata ul',
                autoPage: true,
                effect: "leftLoop",
                autoPlay: true,
                scroll: scroll,
                vis: maxnum,
                mouseOverStop: false,
                interTime: 5000
            });
        }
        /*任务项名称*/
        $(ids[i] + " .detailtitle").html(checkdata[i].RWName);
    },
    //测血糖
    sugerBlood: function (data, FZPX) {
        var checkdetail = data.FZinfos[FZPX - 1],
            checkdata = checkdetail.RWinfos,
            ids = ['#sugerBlood1', '#sugerBlood2', '#sugerBlood3','#sugerBlood4', '#sugerBlood5', '#sugerBlood6', '#sugerBlood7'];
        for (var i = 0; i < ids.length; i++) {
            this.fckLine(5, 1, 1, checkdata[i], ids[i])
        }
    },
    fckLine: function (maxNum, vis, scroll, checkdata, id) {
        var numData = jasmine.chunk(checkdata.CWinfos, maxNum);
        var numboxHtml = '';
        $(id + ' .secTitle').html(checkdata.RWName)
        for (var i = 0; i < numData.length; i++) {
            numboxHtml += `<div><ul>`
            for (var j = 0; j < numData[i].length; j++) {
                numboxHtml += `<li><span class="num">${numData[i][j].CWDM}</span></li>`;
            }
            numboxHtml += `</ul></div>`
        }
        $(id + " .numbox").html(numboxHtml);
        jQuery(id).slide({
            mainCell: '.numbox',
            autoPage: true,
            effect: "leftLoop",
            autoPlay: true,
            scroll: 1,
            vis: 1,
            mouseOverStop: false,
            interTime: 5000
        });
    },
    NFMdbline: function (maxNum, vis, scroll, checkdata, ids, detailLength, i, infos) {
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
                    numboxliHtml += '<li><span class="num">' + checkdata[i][infos][j].CWDM + '</span></li>';
                }
                numboxHtml += '<div><ul>' + numboxliHtml + '</ul></div>';
            }
            //余数循环
            if (remainder) {
                var btmark = detailLength - remainder,
                    lastNumbox = '';
                for (var k = btmark; k < detailLength; k++) {
                    lastNumbox += '<li><span class="num">' + checkdata[i][infos][k].CWDM + '</span></li>';
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
                interTime: 5000
            });
        } else {
            var numboxliHtml = '';
            for (var n = 0; n < detailLength; n++) {

                numboxliHtml += '<li><span class="num">' + checkdata[i][infos][n].CWDM + '</span></li>';
            }
            numboxHtml = '<div><ul>' + numboxliHtml + '</ul></div>';
            $(ids[i] + " .numbox").html(numboxHtml);
        }
        /*任务项名称*/
        $(ids[i] + " .secTitle").html(checkdata[i].RWName)
    },
    NKstaff: function (data, dom) {
        var datadetail = data.ZRHS,
            length = datadetail.length,
            staffHtml = '';
        for (var i = 0; i < length; i++) {
            var ZRName = datadetail[i].FZCW,
                ZRNameArr = [],
                ZRNameHtml = '';

            ZRNameArr = ZRName.split('/');
            for (var j = 0; j < ZRNameArr.length; j++) {
                ZRNameHtml += '<li><span>' + ZRNameArr[j] + '</span></li>';
            }
            staffHtml += '<div class="dutynurse"><div class="nursename">' + datadetail[i].FZHSName + '</div><div class="nurseduty"><ul>' + ZRNameHtml + '</ul></div></div>';
        }
        $(dom).html(staffHtml);
        jQuery(dom + ' .dutynurse').slide({
            mainCell: '.nurseduty ul',
            autoPage: true,
            effect: "leftMarquee",
            autoPlay: true,
            scroll: 1,
            vis: 3,
            mouseOverStop: false,
            interTime: 30
        });
    },
    pushObj: function (data, FZPX, string) {
        var objGather = [],
            reg = new RegExp(string),
            data = data.FZinfos[FZPX - 1].RWinfos;
        for (var i = 0; i < data.length; i++) {
            if(reg.test(data[i].RWName)) {
                objGather = objGather.concat(data[i].CWinfos)
            }
        }
        return objGather;
    },
    refresh: function () {
        if(navigator.onLine) {
            window.location.reload();
        } else {
            return false;
        }
    },
    load: function () {
        var ms = 300000;
        setInterval(this.refresh, ms);
    }
}