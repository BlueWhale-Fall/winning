/*初始化*/
var _init = {
    NFMinit: function (URL, BQDM) {
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
                _method.NFMtitle(data);
                /*出院*/
                _method.NFMcheck(data, 0, 1, '#tdOut');
                _method.NFMcheck(data, 1, 1, '#tmOut');
                /*手术准备*/
                _method.NFMoperation(data, 2);
                /*血糖*/
                _method.NFMbloodsugar(data, 3);
                /*生命体征*/
                _method.NFMvitalsign(data, 4);
                /*特殊检查*/
                _method.NFMexpecailcheck(data, 5);
                /*功能试验*/
                _method.NFMfuntrial(data, 6);
                /*药物过敏*/
                _method.NFMallergy(data, 7);
                /*安全管理*/
                _method.NFMsecurity(data, 8);
                /*基础专科护理*/
                _method.NFMtend(data, 9);
                /*治疗*/
                _method.NFMcure(data, 10);
                /*体内植入物*/
                _method.NFMimplant(data, 11);
                /*导管*/
                _method.NFMduct(data, 12);
                /*自动刷新*/
                _method.load();
                /*心电监护模块*/
                _init.secondInit(BQDM);
            },
            complete: function () {
                XHR = null;
                $('#loadWrap').css({'opacity': 0, 'z-index': -1});
            }
        });
    },
    ICUinit: function (URL, BQDM) {
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
                _method.ICUheader(data);
                /*任务项大标题*/
                _method.ICUtitle(data);
                /*出院*/
                _method.NFMcheck(data, 0, 1, '#tdOut');
                _method.NFMcheck(data, 1, 1, '#tmOut');
                /*手术*/
                _method.ICUoperation(data)
                /*测血糖*/
                _method.ICUtestBL(data, 2)
                /*尿量*/
                _method.ICUurineval(data, 3)
                /*预约检查*/
                _method.ICUorder(data)
                /*药物过敏*/
                _method.ICUallergy(data, 4)
                /*特殊治疗*/
                _method.ICUtreatment(data, 5)
                /*导管*/
                _method.ICUduct(data, 6)
                /*自动刷新*/
                _method.load();
            },
            complete: function () {
                XHR = null;
                $('#loadWrap').css({'opacity': 0, 'z-index': -1});
            }
        });
    },
    /*责任护士数据请求*/
    doctorInit: function (URL, BQDM) {
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
                _init.doctor(data);
            },
            complete: function (XHR, TS) {
                XHR = null;
            }
        });
    },
    /*责任护士*/
    doctor: function (data) {
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
            vis: 3,
            mouseOverStop: false,
            interTime: 30
        });
    },
    NFMstaffInit: function (URL, BQDM, dom) {
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
                _method.NFMstaff(data, dom);
            },
            complete: function (XHR, TS) {
                XHR = null;
            }
        });
    },
    infosInit: function (type, count, dom, BQDM) {
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
                _method.infos(data, dom);
            },
            complete: function (XHR, TS) {
                XHR = null;
            }
        });
    },
    secondInit: function (BQDM) {
        /*指脉氧*/
        this.infosInit('1', 2, '.fingerNum ul', BQDM);
        /*移动器械*/
        this.infosInit('2', 4, '.movehic ul', BQDM);
    }
}
/*方法*/
var _method = {
    /*普通头部*/
    header: function (data) {
        var headerHtml = document.getElementById('header');
        var today = data.DateWeek;
        headerHtml.innerHTML = '<section class="head"><div><span class="headtime">' + today + '</span></div><div>' + data.BQTitle + '</div></section><section class="headbody"><article class="headmain">' + '<div class="floatL headborder"><div class="headbox leftimg"></div>' + '<div class="headbox no-padding"><div class="headhighline">' + '<div class="lefttext margin-right-20">病人总数</div>' + '<div class="lefttextnum margin-right-20">' + data.BRCount + '</div>' + '</div></div><div class="headboxright"><div class="headtextbox">' + '<span class=" headtext margin-right-25">新入院</span>' + '<span class="headnum">' + data.XRY + '</span><span class="headtext margin-right-25">' + '转入</span><span class="headnum">' + data.ZR + '</span></div><div class="headtextbox">' + '<span class=" headtext margin-right-25 ">出院</span>' + '<span class="headnum">' + data.CY + '</span><span class="headtext margin-right-25">转出' + '</span><span class="headnum">' + data.ZR + '</span></div></div></div>' + '<div class="floatL headborder"><div class="headbox middleimg margin-left-30"></div>' + '<div class="headbox no-padding"><div class="headhighline">' + '<div class="lefttext margin-right-20">手术</div>' + '<div class="righttextnum margin-right-40">' + data.SS + '</div></div></div>' + '<div class="headboxright"><div class="headtextbox">' + '<span class=" headtext margin-right-25">特级护理</span>' + '<span class="headnum sCare">' + data.TJHL + '</span><span class="headtext margin-right-25">' + 'Ⅰ级护理</span><span class="headnum">' + data.YJHL + '</span></div>' + '<div class="headtextbox"><span class=" headtext margin-right-25">病危</span>' + '<span class="headnum font-red">' + data.BW + '</span><span class="headtext margin-right-25">' + 'Ⅱ级护理</span><span class="headnum">' + data.EJHL + '</span></div></div></div>' + '<div class="floatL"><div class="headbox rightimg margin-left-30"></div>' + '<div class="headbox no-padding"><div class="headhighline">' + '<div class="lefttext margin-right-20">高危风险</div>' + '<div class="righttextnum">' + data.TBGZ + '</div></div></div>' + '<div class="headboxright"><div class="headtextbox">' + '<span class=" headtext margin-right-25">压疮</span>' + '<span class="headnum sCare">' + data.YC + '</span><span class="headtext margin-right-25">' + '导管</span><span class="headnum">' + data.DG + '</span></div>' + '<div class="headtextbox"><span class=" headtext margin-right-25">跌倒</span>' + '<span class="headnum Scare">' + data.DD + '</span></div></div>' + '</div></article></section>' + '</article></section>';
    },
    /*ICU头部*/
    ICUheader: function (data) {
        var detail = data.HZInfos,
            today = data.DateWeek,
            TBGZ = Number(detail[6].RS) + Number(detail[7].RS) + Number(detail[8].RS) + Number(detail[9].RS);
        $('#header').html('<section class="head"><div><span class="headtime">' + today + '</span></div><div>' + data.BQTitle + '</div></section><section class="headbody"><article style="left: 260px;" class="headmain">' + '<div class="floatL headborder"><div class="headbox leftimg"></div>' + '<div class="headbox no-padding"><div class="headhighline">' + '<div class="lefttext margin-right-20">病人总数</div>' + '<div class="lefttextnum margin-right-20">' + detail[0].RS + '</div>' + '</div></div><div class="headboxright"><div class="headtextbox">' + '<span class=" headtext margin-right-25">新入院</span>' + '<span class="headnum">' + detail[1].RS + '</span><span class="headtext margin-right-25">' + '转入</span><span class="headnum">' + detail[3].RS + '</span></div><div class="headtextbox">' + '<span class=" headtext margin-right-25 ">出院</span>' + '<span class="headnum">' + detail[2].RS + '</span><span class="headtext margin-right-25">转出' + '</span><span class="headnum">' + detail[4].RS + '</span></div></div></div>' + '<div class="floatL headborder"><div class="headbox middleimg margin-left-30"></div>' + '<div class="headbox no-padding"><div class="headhighline">' + '<div class="lefttext margin-right-20">手术</div>' + '<div class="righttextnum margin-right-40">' + detail[5].RS + '</div></div></div>' + '</div>' + '</div><div class="floatL"><div class="headbox rightimg margin-left-30"></div>' + '<div class="headbox no-padding"><div class="headhighline">' + '<div class="lefttext margin-right-20">特别关注</div>' + '<div class="righttextnum">' + TBGZ + '</div></div></div>' + '<div class="headboxright"><div class="headtextbox">' + '<span class=" headtext margin-right-25">压疮</span>' + '<span class="headnum sCare">' + detail[6].RS + '</span><span class="headtext margin-right-25">' + '导管</span><span class="headnum">' + detail[8].RS + '</span></div>' + '<div class="headtextbox"><span class=" headtext margin-right-25">跌倒</span>' + '<span class="headnum Scare">' + detail[7].RS + '</span><span class=" headtext margin-right-25">死亡</span>' + '<span class="headnum Scare">' + detail[9].RS + '</span></div></article></section>')
    },
    /*NFMtitle*/
    NFMtitle: function (data) {
        $("#leavehospital .dataTitle").html(data.FZinfos[0].FZName);
        $("#operation .dataTitle").html(data.FZinfos[1].FZName);
        $("#bloodsugar .dataTitle").html(data.FZinfos[2].FZName);
        $("#VS .dataTitle").html(data.FZinfos[3].FZName);
        $("#expecailcheck .dataTitle").html(data.FZinfos[4].FZName);
        $("#funtrial .dataTitle").html(data.FZinfos[5].FZName);
        $("#allergy .dataTitle").html(data.FZinfos[6].FZName);
        $("#security .dataTitle").html(data.FZinfos[7].FZName);
        $("#tend .dataTitle").html(data.FZinfos[8].FZName);
        $("#cure .dataTitle").html(data.FZinfos[9].FZName);
        $("#implant .dataTitle").html(data.FZinfos[10].FZName);
        $("#duct .dataTitle").html(data.FZinfos[11].FZName);
    },
    /*NFMtitle*/
    ICUtitle: function (data) {
        $("#leavehospital .dataTitle").html(data.FZinfos[0].FZName);
        $("#testBL .dataTitle").html(data.FZinfos[1].FZName);
        $("#allergy .dataTitle").html(data.FZinfos[3].FZName);
        $("#treatment .dataTitle").html(data.FZinfos[4].FZName);
        $("#duct .dataTitle").html(data.FZinfos[5].FZName);
    },
    /*出院部分*/
    NFMcheck: function (data, RWPX, FZPX, id) {
        var checkdetail = data.FZinfos[FZPX - 1],
            numboxHtml = '',
            checkdata = checkdetail.RWinfos[RWPX].CWinfos,
            length = checkdata.length,
            maxNum = 4;
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
                    numboxliHtml += '<li><span class="num"  data-search="' + checkdetail.RWinfos[i].RWXH + '-' + checkdata[j].CWDM + '" onclick="showbox(this)">' + checkdata[j].CWDM + '</span></li>';
                }
                numboxHtml += '<div><ul>' + numboxliHtml + '</ul></div>';
            }
            //余数循环
            if (remainder) {
                var btmark = length - remainder,
                    lastNumbox = '';
                for (var k = btmark; k < length; k++) {
                    lastNumbox += '<li><span class="num"  data-search="' + checkdata[i].RWXH + '-' + checkdata[k].CWDM + '" onclick="showbox(this)">' + checkdata[k].CWDM + '</span></li>';
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
            for (var i = 0; i < length; i++) {
                numboxliHtml += '<li><span class="num"   data-search="' + checkdata[i].RWXH +'-' + checkdata[i].CWDM + '" onclick="showbox(this)">' + checkdata[i].CWDM + '</span></li>';
            }
            numboxHtml = '<div><ul>' + numboxliHtml + '</ul></div>';
            $(id + " .numbox").html(numboxHtml);
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
                str = '日出院';
                day = day + 1;
                $('#tmOut .detailtitle').html(day + str);
                break;
        }
    },
    /*NFM手术准备*/
    NFMoperation: function (data, FZPX) {
        var checkdetail = data.FZinfos[FZPX - 1],
            checkdata = checkdetail.RWinfos,
            length = checkdata.length,
            ids = ['#operation1', '#operation2'],
            maxNum = 2;

        for (var i = 0; i < length; i++) {
            var detailLength = checkdata[i].CWinfos.length;
            this.NFMline(4, 2, checkdata, ids, i);
        }
    },
    /*ICU手术*/
    ICUoperation: function (data) {
        var detaildata = data.SSinfos[0].Infos,
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
                    var gcClass = '',
                        tbjClass = '',
                        bxClass = '',
                        bpClass = '';

                    //判断是否mark
                    if(detaildata[j].GC == 1) {
                        gcClass = 'mark';
                    } else {
                        gcClass = '';
                    }
                    if(detaildata[j].TBJ == 1) {
                        tbjClass = 'mark';
                    } else {
                        tbjClass = '';
                    }
                    if(detaildata[j].BX == 1) {
                        bxClass = 'mark';
                    } else {
                        bxClass = '';
                    }
                    if(detaildata[j].BP == 1) {
                        bpClass = 'mark';
                    } else {
                        bpClass = '';
                    }
                    //内容循环
                    boxdetailHtml += '<ul><li><span class="num">' + detaildata[j].CWDM + '</span></li><li>'+ detaildata[j].SSMC +'</li></ul>';
                }
                taskBoxHtml += '<div>' + boxdetailHtml + '</div>';
            }
            //余数循环
            if(remainder) {
                var btmark = length - remainder,
                    lastNumbox = '';
                for(var k = btmark; k < length; k++) {
                    var gcClass = '',
                        tbjClass = '',
                        bxClass = '',
                        bpClass = '';

                    //判断是否mark
                    if(detaildata[k].GC == 1) {
                        gcClass = 'mark';
                    } else {
                        gcClass = '';
                    }
                    if(detaildata[k].TBJ == 1) {
                        tbjClass = 'mark';
                    } else {
                        tbjClass = '';
                    }
                    if(detaildata[k].BX == 1) {
                        bxClass = 'mark';
                    } else {
                        bxClass = '';
                    }
                    if(detaildata[k].BP == 1) {
                        bpClass = 'mark';
                    } else {
                        bpClass = '';
                    }
                    lastNumbox += '<ul><li><span class="num">' + detaildata[j].CWDM + '</span></li><li>'+ detaildata[j].SSMC +'</li></ul>';
                }
                taskBoxHtml += '<div>' + lastNumbox + '</div>';
            }
            $(".taskBox").html(taskBoxHtml);
            jQuery('#operation').slide({
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
                var gcClass = '',
                    tbjClass = '',
                    bxClass = '',
                    bpClass = '';

                //判断是否mark
                if(detaildata[i].GC == 1) {
                    gcClass = 'mark';
                } else {
                    gcClass = '';
                }
                if(detaildata[i].TBJ == 1) {
                    tbjClass = 'mark';
                } else {
                    tbjClass = '';
                }
                if(detaildata[i].BX == 1) {
                    bxClass = 'mark';
                } else {
                    bxClass = '';
                }
                if(detaildata[i].BP == 1) {
                    bpClass = 'mark';
                } else {
                    bpClass = '';
                }
                //内容循环
                boxdetailHtml += '<ul><li><span class="num">' + detaildata[i].CWDM + '</span></li><li>'+ detaildata[i].SSMC +'</li></ul>';
            }
            taskBoxHtml = '<div>' + boxdetailHtml + '</div>';
            $(".taskBox").html(taskBoxHtml);
        }
    },
    /*NFM血糖*/
    NFMbloodsugar: function (data, FZPX) {
        var checkdetail = data.FZinfos[FZPX - 1],
            CWinfos = this.pushObj(data, FZPX, 'BG'),
            ids = ['#bloodsugar1', '#bloodsugar2'],
            checkdata = [{RWName: '测血糖', CWinfos: CWinfos}, {
                RWName: '动态血糖监测',
                CWinfos: checkdetail.RWinfos[9].CWinfos
            }];
        for (var i = 0; i < checkdata.length; i++) {
            var detailLength = checkdata[i].CWinfos.length;
            if (i < 1) {
                this.NFMdbline(10, 1, 1, checkdata, ids, detailLength, i, 'CWinfos');
            } else {
                this.NFMline(4, 2, checkdata, ids, i);
            }
        }
    },
    /*NFM生命体征*/
    NFMvitalsign: function (data, FZPX) {
        var checkdetail = data.FZinfos[FZPX - 1],
            checkdata = checkdetail.RWinfos,
            length = checkdata.length,
            ids = ['#BPqd', '#BPbid', '#BPtid', '#BP', '#P', '#R'];

        for (var i = 0; i < length; i++) {
            var detailLength = checkdata[i].CWinfos.length;
            if (i < 3) {
                this.NFMdbline(4, 1, 1, checkdata, ids, detailLength, i, 'CWinfos');
            } else {
                this.NFMline(4, 2, checkdata, ids, i);
            }
        }
    },
    /*NFM特殊检查*/
    NFMexpecailcheck: function (data, FZPX) {
        var checkdetail = data.FZinfos[FZPX - 1],
            CWinfos1 = this.pushObj(data, FZPX, '胃镜'),
            CWinfos2 = this.pushObj(data, FZPX, '肠镜'),
            CWinfos3 = this.pushObj(data, FZPX, '冠脉CT'),
            CWinfos4 = this.pushObj(data, FZPX, '腹部CT'),
            CWinfos5 = this.pushObj(data, FZPX, '胸部CT'),
            CWinfos6 = this.pushObj(data, FZPX, '胰腺CT'),
            CWinfos7 = this.pushObj(data, FZPX, '胰腺MRI'),
            CWinfos8 = this.pushObj(data, FZPX, '支气管镜'),
            ids = ['#EL1', '#EL2', '#EL3', '#EL4', '#EL5', '#EL6', '#EL7', '#EL8'],
            checkdata = [
                {RWName: '胃镜', CWinfos: CWinfos1},
                {RWName: '肠镜', CWinfos: CWinfos2},
                {RWName: '冠脉CT', CWinfos: CWinfos3},
                {RWName: '腹部CT', CWinfos: CWinfos4},
                {RWName: '胸部CT', CWinfos: CWinfos5},
                {RWName: '胰腺CT', CWinfos: CWinfos6},
                {RWName: '胰腺MRI', CWinfos: CWinfos7},
                {RWName: '支气管镜', CWinfos: CWinfos8}
            ];
        for (var i = 0; i < checkdata.length; i++) {
            var detailLength = checkdata[i].CWinfos.length;
            this.NFMdbline(4, 1, 1, checkdata, ids, detailLength, i, 'CWinfos');
        }
    },
    /*NFM功能试验*/
    NFMfuntrial: function (data, FZPX) {
        var checkdetail = data.FZinfos[FZPX - 1],
            checkdata = checkdetail.RWinfos,
            length = checkdata.length,
            ids = ['#funtrial1', '#funtrial2', '#funtrial3', '#funtrial4', '#funtrial5', '#funtrial6', '#funtrial7', '#funtrial8'];

        for (var i = 0; i < length; i++) {
            var detailLength = checkdata[i].CWinfos.length;
            if (i < 8) {
                this.NFMdbline(4, 1, 1, checkdata, ids, detailLength, i, 'CWinfos');
            }
        }
    },
    /*NFM药物过敏*/
    NFMallergy: function (data, FZPX) {
        var checkdetail = data.FZinfos[FZPX - 1],
            checkdata = checkdetail.RWinfos,
            length = checkdata.length,
            ids = ['#allergy1', '#allergy2', '#allergy3', '#allergy4', '#allergy5'];

        for (var i = 0; i < length; i++) {
            var detailLength = checkdata[i].CWinfos.length;
            if (i < 5) {
                this.NFMdbline(2, 1, 1, checkdata, ids, detailLength, i, 'CWinfos');
            }
        }
    },
    /*NFM安全管理*/
    NFMsecurity: function (data, FZPX) {
        var checkdetail = data.FZinfos[FZPX - 1],
            checkdata = checkdetail.RWinfos,
            length = checkdata.length,
            ids = ['#dg', '#yc', '#dd', '#VTE'];
        for (var i = 0; i < length; i++) {
            var detailLength = checkdata[i].CWinfos.length;
            this.NFMline(4, 2, checkdata, ids, i);
        }
    },
    /*NFM基础专科护理*/
    NFMtend: function (data, FZPX) {
        var checkdetail = data.FZinfos[FZPX - 1],
            checkdata = checkdetail.RWinfos,
            length = checkdata.length,
            ids = ['#tend1', '#tend2', '#tend3', '#tend4', '#tend5'];

        for (var i = 0; i < length; i++) {
            var detailLength = checkdata[i].CWinfos.length;
            if (i < 5) {
                this.NFMdbline(2, 1, 1, checkdata, ids, detailLength, i, 'CWinfos');
            }
        }
    },
    /*NFM治疗*/
    NFMcure: function (data, FZPX) {
        var checkdetail = data.FZinfos[FZPX - 1],
            checkdata = checkdetail.RWinfos,
            length = checkdata.length,
            ids = ['#cure1'];
        for (var i = 0; i < length; i++) {
            var detailLength = checkdata[i].CWinfos.length;
            this.NFMline(4, 2, checkdata, ids, i);
        }
    },
    /*NFM体内植入物*/
    NFMimplant: function (data, FZPX) {
        var checkdetail = data.FZinfos[FZPX - 1],
            checkdata = checkdetail.RWinfos,
            length = checkdata.length,
            ids = ['#implant1'];
        for (var i = 0; i < length; i++) {
            var detailLength = checkdata[i].CWinfos.length;
            this.NFMline(4, 2, checkdata, ids, i);
        }
    },
    /*NFM导管*/
    NFMduct: function (data, FZPX) {
        var checkdetail = data.FZinfos[FZPX - 1],
            checkdata = checkdetail.RWinfos,
            length = checkdata.length,
            ids = ['#duct1', '#duct2', '#duct3', '#duct4', '#duct5'];

        for (var i = 0; i < length; i++) {
            var detailLength = checkdata[i].CWinfos.length;
            if (i < 5) {
                this.NFMdbline(3, 1, 1, checkdata, ids, detailLength, i, 'CWinfos');
            }
        }
    },
    /*ICU测血糖*/
    ICUtestBL: function (data, FZPX) {
        var checkdetail = data.FZinfos[FZPX - 1],
            checkdata = checkdetail.RWinfos,
            length = checkdata.length,
            ids = ['#testBL1', '#testBL2', '#testBL3', '#testBL4', '#testBL5', '#testBL6'];

        for (var i = 0; i < length; i++) {
            var detailLength = checkdata[i].CWinfos.length;
            if (i < 6) {
                this.NFMdbline(6, 1, 1, checkdata, ids, detailLength, i, 'CWinfos');
            }
        }
    },
    /*ICU尿量*/
    ICUurineval: function (data, FZPX) {
        var checkdetail = data.FZinfos[FZPX - 1],
            checkdata = checkdetail.RWinfos,
            length = checkdata.length,
            ids = ['#urineval'];
        for (var i = 0; i < length; i++) {
            var detailLength = checkdata[i].CWinfos.length;
            this.NFMdbline(7, 1, 1, checkdata, ids, detailLength, i, 'CWinfos');
        }
    },
    /*ICU预约检查*/
    ICUorder: function (data) {
        var checkdata = data.YYJCinfos,
            length = checkdata.length,
            ids = ['#order'];
        for (var i = 0; i < 1; i++) {
            var detailLength = checkdata[i].Infos.length;
            this.NFMdbline(7, 1, 1, checkdata, ids, detailLength, i, 'Infos');
        }
    },
    /*ICU药物过敏*/
    ICUallergy: function (data, FZPX) {
        var checkdetail = data.FZinfos[FZPX - 1],
            checkdata = checkdetail.RWinfos,
            length = checkdata.length,
            ids = ['#allergy1', '#allergy2', '#allergy3', '#allergy4', '#allergy5', '#allergy6'];
        for (var i = 0; i < length; i++) {
            var detailLength = checkdata[i].CWinfos.length;
            this.NFMline(4, 2, checkdata, ids, i);
        }
    },
    /*ICU特殊治疗*/
    ICUtreatment: function (data, FZPX) {
        var checkdetail = data.FZinfos[FZPX - 1],
            checkdata = checkdetail.RWinfos,
            length = checkdata.length,
            ids = ['#treatment1', '#treatment2', '#treatment3', '#treatment4', '#treatment5', '#treatment6'];
        for (var i = 0; i < length; i++) {
            var detailLength = checkdata[i].CWinfos.length;
            this.NFMline(15 , 2, checkdata, ids, i);
        }
    },
    /*ICU导管*/
    ICUduct: function (data, FZPX) {
        var checkdetail = data.FZinfos[FZPX - 1],
            checkdata = checkdetail.RWinfos,
            length = checkdata.length,
            ids = ['#duct1', '#duct2', '#duct3', '#duct4', '#duct5', '#duct6', '#duct7', '#duct8', '#duct9', '#duct10', '#duct11', '#duct12'];

        for (var i = 0; i < length; i++) {
            var detailLength = checkdata[i].CWinfos.length;
            if (i < 12) {
                this.NFMdbline(6, 1, 1, checkdata, ids, detailLength, i, 'CWinfos');
            }
        }
    },
    NFMline: function (maxnum, scroll, checkdata, ids, i) {
        var detaildataHtml = '',
            detailLength = checkdata[i].CWinfos.length;
        for (var n = 0; n < detailLength; n++) {
            detaildataHtml += '<li><span class="num"   data-search="' + checkdata[i].RWXH + '-' + checkdata[i].CWinfos[n].CWDM + '" onclick="showbox(this)">' + checkdata[i].CWinfos[n].CWDM + '</span></li>'
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
                    numboxliHtml += '<li><span class="num"   data-search="' + checkdata[i].RWXH + '-' + checkdata[i][infos][j].CWDM + '" onclick="showbox(this)">' + checkdata[i][infos][j].CWDM + '</span></li>';
                }
                numboxHtml += '<div><ul>' + numboxliHtml + '</ul></div>';
            }
            //余数循环
            if (remainder) {
                var btmark = detailLength - remainder,
                    lastNumbox = '';
                for (var k = btmark; k < detailLength; k++) {
                    lastNumbox += '<li><span class="num"   data-search="' + checkdata[i].RWXH + '-' + checkdata[i][infos][k].CWDM + '" onclick="showbox(this)">' + checkdata[i][infos][k].CWDM + '</span></li>';
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

                numboxliHtml += '<li><span class="num"   data-search="' + checkdata[i].RWXH + '-' +checkdata[i][infos][n].CWDM  + '" onclick="showbox(this)">' + checkdata[i][infos][n].CWDM + '</span></li>';
            }
            numboxHtml = '<div><ul>' + numboxliHtml + '</ul></div>';
            $(ids[i] + " .numbox").html(numboxHtml);
        }
        /*任务项名称*/
        $(ids[i] + " .secTitle").html(checkdata[i].RWName)
    },
    NFMstaff: function (data, dom) {
        var datadetail = data.ZRHS,
            length = datadetail.length,
            staffHtml = '';

        for (var i = 0; i < length; i++) {
            var ZRName = datadetail[i].ZRName,
                ZRNameArr = [],
                ZRNameHtml = '';

            ZRNameArr = ZRName.split('/');
            for (var j = 0; j < ZRNameArr.length; j++) {
                ZRNameHtml += '<li><span>' + ZRNameArr[j] + '</span></li>';
            }
            staffHtml += '<div class="dutynurse"><div class="nursename">' + datadetail[i].HSName + '</div><div class="nurseduty"><ul>' + ZRNameHtml + '</ul></div></div>';
        }
        $(dom).html(staffHtml);
        jQuery(dom + ' .dutynurse').slide({
            mainCell: '.nurseduty ul',
            autoPage: true,
            effect: "leftMarquee",
            autoPlay: true,
            scroll: 1,
            vis: 2,
            mouseOverStop: false,
            interTime: 30
        });
    },
    pushObj: function (data, FZPX, string) {
        var objGather = [],
            reg = new RegExp(string),
            data = data.FZinfos[FZPX - 1].RWinfos;
        for (var i = 0; i < data.length; i++) {
            if (reg.test(data[i].RWName)) {
                objGather = objGather.concat(data[i].CWinfos)
            }
        }
        return objGather;
    },
    infos: function (data, dom) {
        var datadetail = data.Infos,
            length = datadetail.length,
            infosHtml = '';

        for (var i = 0; i < length; i++) {
            var numHtml = '';
            if (datadetail[i].CWDM !== null && datadetail[i].CWDM !== '' && datadetail[i].CWDM !== 'undefined') {
                numHtml = '<span class="num"   data-search="' + datadetail.RWinfos[i].RWXH + '-' + datadetail[i].CWDM + '" onclick="showbox(this)">' + datadetail[i].CWDM + '</span></div>';
            }
            infosHtml += '<li><div>' + datadetail[i].WZDM + '号</div><div>' + numHtml + '</div></li>';
        }
        $(dom).html(infosHtml);
    },
    refresh: function () {
        if (navigator.onLine) {
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