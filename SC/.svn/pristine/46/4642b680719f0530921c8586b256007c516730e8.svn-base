/*初始化*/
var _init = {
    FCKinit: function (URL, BQDM) {
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
                _method.NKcheck(data, 0, 1, '#tdAOut', BQDM);
                _method.NKcheck(data, 1, 1, '#tdPOut', BQDM);
                _method.NKcheck(data, 2, 1, '#tmOut', BQDM);
                /*测血压*/
                _method.NKbloodpressure(data, 2);
                /*测脉搏*/
                _method.FCKpulse(data, 3);
                /*24h*/
                _method.nursing24h(data, 4);
                /*测心率*/
                _method.FCKheartRate(data, 5);
                /*基础护理*/
                _method.basicCare(data, 6);
                /*会阴护理*/
                _method.perineum(data, 7);
                /*酒精湿敷*/
                _method.alcohol(data, 8);
                /*三大监控*/
                _method.NKcontrol(data, 9);
                /*药物过敏*/
                _method.NKallergy(data, 10);
                /*特殊导管*/
                _method.NKduct(data, 11);
                /*特殊治疗*/
                _method.SpecialTreatment(data, 12);
                /*特殊检查*/
                _method.SpecialInspection(data, 13);
                /*其他*/
                _method.others(data, 14);
                /*测血糖*/
                _method.sugerBlood(data, 15);
                /*新生儿*/
                _method.newbaby(data, 16);
                /*自动刷新*/
                _method.load();
            },
            complete: function () {
                $('#loadWrap').css({'opacity': 0, 'z-index': -1});
            }
        });
    },
    FCKstaffInit: function (URL, BQDM, dom) {
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
    },
    getIdentifierData: function (object, splitMark, start) {
        start = start || 0;
        let name = object.RWName;
        let RWName = name.substring(start, name.indexOf(splitMark));
        return {
            RWName: RWName,
            data: object.CWinfos
        };
    }
}
/*方法*/
var _method = {
    /*内科title*/
    NKtitle: function (data) {
        $("#leavehospital .dataTitle").html(data.FZinfos[0].FZName);//出入院
        $("#bloodpressure .dataTitle").html(data.FZinfos[1].FZName);//测血压
        $("#pulse .dataTitle").html(data.FZinfos[2].FZName);//测脉搏
        $("#all_day .dataTitle").html(data.FZinfos[3].FZName);//24H
        $("#heartRate .dataTitle").html(data.FZinfos[4].FZName);//测心率
        $("#basic_care .dataTitle").html(data.FZinfos[5].FZName);//基础护理
        $("#perineum .dataTitle").html(data.FZinfos[6].FZName);//会阴护理
        $("#alcohol .dataTitle").html(data.FZinfos[7].FZName);//酒精湿敷
        $("#control .dataTitle").html(data.FZinfos[8].FZName);
        /*三大监控*/
        $("#allergy .dataTitle").html(data.FZinfos[9].FZName);
        /*药物过敏*/
        $("#duct .dataTitle").html(data.FZinfos[10].FZName);
        /*特殊导管*/
        $("#SpecialTreatment .dataTitle").html(data.FZinfos[11].FZName);
        /*特殊治疗*/
        $("#SpecialInspection .dataTitle").html(data.FZinfos[12].FZName);
        /*特殊检查*/
        $("#others .dataTitle").html(data.FZinfos[13].FZName);
        /*其他*/
        $("#sugerBlood .dataTitle").html(data.FZinfos[14].FZName);
        /*测血糖*/
        $("#newbaby .dataTitle").html(data.FZinfos[15].FZName);
        /*新生儿*/

    },
    /*头部*/
    header: function (data) {
        var detail = data.HZInfos,
            today = data.DateWeek,
            JRSS=Number(detail[6].RS) + Number(detail[7].RS);
            TBGZ = Number(detail[9].RS) + Number(detail[10].RS) + Number(detail[11].RS);
        var head_string = `<section class="head">
            <div><span class="headtime">${today}</span></div><div>${data.BQTitle}</div></section><section class="headbody"><article class="headmain"><div class="floatL headborder"><div class="headbox leftimg"></div><div class="headbox no-padding">
            <div class="headhighline1">
            <div class="lefttext1 margin-right-20">病人总数</div><div class="lefttextnum1 margin-right-20">${detail[0].RS}</div>
            </div>
            <div class="headhighline1">
            <div class="lefttext1 margin-right-20">新生儿</div><div class="lefttextnum1 margin-right-20">${detail[1].RS}</div>
            </div>
            </div>
            <div class="headboxright">
            <div class="headtextbox"><span class=" headtext margin-right-15">特级护理</span><span class="headnum">${detail[2].RS}</span><span class="headtext margin-right-25 margin-left-20" style="margin-left: 15px">I级护理</span><span class="headnum">${detail[3].RS}</span></div>
            <div class="headtextbox"><span class=" headtext margin-right-15 ">顺产</span><span class="headnum">${detail[4].RS}</span><span class="headtext margin-right-25 margin-left-20" style="margin-left: 15px">病危病重</span><span class="headnum">${detail[5].RS}</span></div></div>
            </div>
            <div class="floatL headborder"><div class="headbox middleimg margin-left-30"></div><div class="headbox no-padding">
            <div class="headhighline">
            <div class="lefttext margin-right-20">手术</div><div class="righttextnum margin-right-40">${JRSS}</div></div></div>
            <div class="headboxright" style="width: 190px"><div class="headtextbox"><span class=" headtext margin-right-25">今日手术</span><span class="headnum sCare">${ detail[6].RS}</span></div>
            <div class="headtextbox"><span class=" headtext margin-right-25">明日手术</span><span class="headnum">${detail[7].RS}</span></div></div></div><div class="floatL"><div class="headbox rightimg margin-left-30"></div><div class="headbox no-padding" style="width: 192px"><div class="headhighline">
            <div class="lefttext margin-right-20">高危风险</div><div class="righttextnum">${TBGZ}</div></div></div><div class="headboxright"><div class="headtextbox"><span class=" headtext margin-right-25">压疮</span><span class="headnum sCare">${detail[9].RS}</span><span class="headtext margin-right-25">导管</span><span class="headnum">${detail[10].RS}</span></div>
            <div class="headtextbox"><span class=" headtext margin-right-25">跌倒</span><span class="headnum Scare">${detail[11].RS}</span></div></div></div></article></section></article></section>`
        $('#header').html(head_string)
    },
    /*出院部分*/
    NKcheck: function (data, RWPX, FZPX, id, BQDM) {
        var checkdetail = data.FZinfos[FZPX - 1],
            numboxHtml = '',
            checkdata = checkdetail.RWinfos[RWPX].CWinfos,
            maxNum = 6;
        var checkdataHandle = jasmine.chunk(checkdata, maxNum);
        for (var i = 0; i < checkdataHandle.length; i++) {
            numboxHtml += `<div><ul>`
            for (var j = 0; j < checkdataHandle[i].length; j++) {
                numboxHtml += `<li><span class="num">${checkdataHandle[i][j].CWDM}</span></li>`;
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
        //目录
        switch (RWPX) {
            case 0:
                $('#tdAOut .detailtitle').html('今日出院(上午)');
                break;
            case 1:
                $('#tdPOut .detailtitle').html('今日出院(下午)');
                break;
            case 2:
                $('#tmOut .detailtitle').html('明日出院');
                break;
        }
    },
    /*测血压*/
    NKbloodpressure: function (data, FZPX) {
        var checkdetail = data.FZinfos[FZPX - 1],
            checkdata = checkdetail.RWinfos,
            length = checkdata.length,
            ids = ['#bloodpressure1', '#bloodpressure2', '#bloodpressure3', '#bloodpressure4', '#bloodpressure5', '#bloodpressure6', '#bloodpressure7'];
        for (var i = 0; i < ids.length; i++) {
            var detailLength = checkdata[i].CWinfos.length;
            this.NFMdbline(2, 1, 1, checkdata, ids, detailLength, i, 'CWinfos');
        }
    },
    /*测脉搏*/
    FCKpulse: function (data, FZPX) {
        var checkdetail = data.FZinfos[FZPX - 1],
            checkdata = checkdetail.RWinfos,
            length = checkdata.length,
            ids = ['#pulse1', '#pulse2', '#pulse3', '#pulse4', '#pulse5', '#pulse6', '#pulse7'];
        for (var i = 0; i < length; i++) {
            var detailLength = checkdata[i].CWinfos.length;
            this.NFMdbline(2, 1, 1, checkdata, ids, detailLength, i, 'CWinfos');
        }
    },
    /*测心率*/
    FCKheartRate: function (data, FZPX) {
        var checkdetail = data.FZinfos[FZPX - 1],
            checkdata = checkdetail.RWinfos,
            length = checkdata.length,
            ids = ['#heartRate1', '#heartRate2', '#heartRate3', '#heartRate4', '#heartRate5', '#heartRate6', '#heartRate7'];
        for (var i = 0; i < length; i++) {
            var detailLength = checkdata[i].CWinfos.length;
            this.NFMdbline(2, 1, 1, checkdata, ids, detailLength, i, 'CWinfos');
        }
    },
    /*会阴护理*/
    perineum: function (data, FZPX) {
        var checkdetail = data.FZinfos[FZPX - 1],
            checkdata = checkdetail.RWinfos,
            length = checkdata.length,
            ids = ['#perineum1', '#perineum2'];
        for (var i = 0; i < length; i++) {
            var detailLength = checkdata[i].CWinfos.length;
            this.NFMdbline(2, 1, 1, checkdata, ids, detailLength, i, 'CWinfos');
        }
    },
    /*酒精护理*/
    alcohol: function (data, FZPX) {
        var checkdetail = data.FZinfos[FZPX - 1],
            checkdata = checkdetail.RWinfos,
            length = checkdata.length,
            ids = ['#alcohol1', '#alcohol2', '#alcohol3'];
        for (var i = 0; i < length; i++) {
            var detailLength = checkdata[i].CWinfos.length;
            this.NFMdbline(2, 1, 1, checkdata, ids, detailLength, i, 'CWinfos');
        }
    },
    /*三大监控*/
    NKcontrol: function (data, FZPX) {
        var checkdetail = data.FZinfos[FZPX - 1],
            checkdata = checkdetail.RWinfos,
            length = checkdata.length,
            ids = ['#control1', '#control2', '#control3'];
        let mergedData = {};
        for (let i = 0; i < checkdata.length; i++) {
            let datum = checkdata[i];
            let value = jasmine.getIdentifierData(datum, '(');
            if (mergedData.hasOwnProperty(value.RWName)) {
                mergedData[value.RWName].push(...value.data);
            } else {
                mergedData[value.RWName] = value.data
            }
        }
        let data_array = [];
        for (let key in mergedData) {
            if (mergedData.hasOwnProperty(key)) {
                data_array.push({
                    RWName: key,
                    CWinfos: mergedData[key]
                })
            }
        }
        for (var i = 0; i < ids.length; i++) {
            this.fckLine(6, 1, 1, data_array[i], ids[i])
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
                1
            }
        }
    },
    /*特殊导管*/
    NKduct: function (data, FZPX) {
        var checkdetail = data.FZinfos[FZPX - 1],
            checkdata = checkdetail.RWinfos,
            length = checkdata.length,
            ids = ['#duct1', '#duct2', '#duct3', '#duct4', '#duct5', '#duct6', '#duct7'];

        for (var i = 0; i < length; i++) {
            var detailLength = checkdata[i].CWinfos.length;
            this.NFMdbline(6, 1, 1, checkdata, ids, detailLength, i, 'CWinfos');
        }
    },
    /*特殊治疗*/
    SpecialTreatment: function (data, FZPX) {
        var checkdetail = data.FZinfos[FZPX - 1],
            checkdata = checkdetail.RWinfos,
            length = checkdata.length,
            ids = ['#SpecialTreatment1', '#SpecialTreatment2', '#SpecialTreatment3', '#SpecialTreatment4'];
        for (var i = 0; i < length; i++) {
            var detailLength = checkdata[i].CWinfos.length;
            this.NFMdbline(2, 1, 1, checkdata, ids, detailLength, i, 'CWinfos');
        }
    },
    /*特殊检查*/
    SpecialInspection: function (data, FZPX) {
        var checkdetail = data.FZinfos[FZPX - 1],
            checkdata = checkdetail.RWinfos,
            length = checkdata.length,
            ids = ['#SpecialInspection1', '#SpecialInspection2', '#SpecialInspection3', '#SpecialInspection4'];
        for (var i = 0; i < length; i++) {
            var detailLength = checkdata[i].CWinfos.length;
            this.NFMdbline(2, 1, 1, checkdata, ids, detailLength, i, 'CWinfos');
        }
    },
    /*其他*/
    others: function (data, FZPX) {
        var checkdetail = data.FZinfos[FZPX - 1],
            checkdata = checkdetail.RWinfos,
            length = checkdata.length,
            ids = ['#others1', '#others2', '#others3', '#others4', '#others5', '#others6'];
        for (var i = 0; i < ids.length; i++) {
            if (!checkdata[i]) {
                continue;
            }
            var detailLength = checkdata[i].CWinfos.length;
            this.NFMdbline(2, 1, 1, checkdata, ids, detailLength, i, 'CWinfos');
        }
    },
    //24h
    nursing24h: function (data, FZPX) {
        var checkdetail = data.FZinfos[FZPX - 1],
            checkdata = checkdetail.RWinfos,
            ids = ['#all_day1', '#all_day2', '#all_day3'];
        for (var i = 0; i < ids.length; i++) {
            this.fckLine(6, 1, 1, checkdata[i], ids[i])
        }
    },
    //测血糖
    sugerBlood: function (data, FZPX) {
        var checkdetail = data.FZinfos[FZPX - 1],
            checkdata = checkdetail.RWinfos,
            ids = ['#sugerBlood1', '#sugerBlood2', '#sugerBlood3', '#sugerBlood4', '#sugerBlood5', '#sugerBlood6', '#sugerBlood7'];
        for (var i = 0; i < ids.length; i++) {
            this.fckLine(5, 1, 1, checkdata[i], ids[i])
        }
    },
    //新生儿
    newbaby: function (data, FZPX) {
        var checkdetail = data.FZinfos[FZPX - 1],
            checkdata = checkdetail.RWinfos,
            ids = ['#newbaby1', '#newbaby2', '#newbaby3', '#newbaby4', '#newbaby5', '#newbaby6'];
        for (var i = 0; i < ids.length; i++) {
            this.fckLine(3, 1, 1, checkdata[i], ids[i])
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
            numboxHtml += `</ul></div>`;
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
    basicCare: function (data, FZPX) {
        var checkdetail = data.FZinfos[FZPX - 1],
            checkdata = checkdetail.RWinfos,
            length = checkdata.length,
            ids = ['#basic_care_1', '#basic_care_2', '#basic_care_3', '#basic_care_4', '#basic_care_5', '#basic_care_6'];
        for (var i = 0; i < ids.length; i++) {
            if (!checkdata[i]) {
                continue;
            }
            var detailLength = checkdata[i].CWinfos.length;
            this.NFMdbline(2, 1, 1, checkdata, ids, detailLength, i, 'CWinfos');
        }
    },
    NFMdbline: function (maxNum, vis, scroll, checkdata, ids, detailLength, i, infos) {
        var numboxHtml = '';
        var numboxliHtml;
        if (detailLength > maxNum) {
            var loopNum = parseInt(detailLength / maxNum),
                remainder = detailLength % maxNum;

            //整页循环
            for (var x = 0; x < loopNum; x++) {
                numboxliHtml = '';
                var j = maxNum * x; //j的初始值
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
            numboxliHtml = '';
            for (var n = 0; n < detailLength; n++) {
                numboxliHtml += '<li><span class="num">' + checkdata[i][infos][n].CWDM + '</span></li>';
            }
            numboxHtml = '<div><ul>' + numboxliHtml + '</ul></div>';
            $(ids[i] + " .numbox").html(numboxHtml);
        }
        /*任务项名称*/
        $(ids[i] + " .secTitle").html(checkdata[i].RWName);
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