var bedspeed = 4500, /*床号溢出滚动速度 单位ms*/
    pagespeed = 25000;
/*分组溢出翻页时间间隔 单位ms*/

var _subpage = {
    /*子页面通用加载函数*/
    subpageInit: function (URL, FZPX, BQDM) {
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
                _subpage.subpage(data, FZPX);
                if(BQDM == 1000) {
                    _method.ICUheader(data);
                } else {
                    _method.header(data);
                }
            },
            complete: function () {
                XHR = null;
                $('#loadWrap').css({'opacity': 0, 'z-index': -1});
            }
        });
    },
    subpage: function (data, FZPX) {
        var subpageDetails = data.FZinfos[FZPX - 1],
            fzLength = subpageDetails.RWinfos.length,
            length = [],
            mySlide = [],
            ids = [],
            myTitle = [],
            bedmax = 31, //行内床号最大显示条数
            maxNum = 13, //分组最大显示条数
            //wrap
            wrap = '';
        //RW_len
        for (var i = 0; i < fzLength; i++) {
            var fontSize,
                lineHeight,
                RWNamelength = subpageDetails.RWinfos[i].RWName.length;
            if (RWNamelength <= 6) {
                fontSize = 22;
                lineHeight = 55;
            } else if (RWNamelength > 6 && RWNamelength < 9) {
                fontSize = 20;
                lineHeight = 55;
            } else if (RWNamelength >= 9 && RWNamelength < 15) {
                fontSize = 21;
                lineHeight = 26;
            } else if (RWNamelength >= 15 && RWNamelength < 20) {
                fontSize = 15;
                lineHeight = 55;
            } else if (RWNamelength >= 20) {
                fontSize = 14;
                lineHeight = 27;
            }
            length.push(subpageDetails.RWinfos[i].CWinfos.length);
            mySlide.push('subpageSlide' + (i + 1));
            ids.push('ioName' + (i + 1));
            myTitle.push(subpageDetails.RWinfos[i].RWName);
            wrap += '<li id="' + ids[i] + '" class="border-bottom floatL"><span class="secTitles" style="font-size: ' + fontSize + 'px;line-height: ' + lineHeight + 'px;">' + myTitle[i] + '</span><div id="' + mySlide[i] + '" class="slide"></div></li>';
        }
        $('#subpage .infoList').html(wrap);
        $('#subpageDetails h2').html(subpageDetails.FZName);
        //data
        for (var i = 0; i < fzLength; i++) {
            var myId = '#' + ids[i],
                myLi = '',
                myHtml = '',
                RWXH = subpageDetails.RWinfos[i].RWXH;
            mySlide[i] = '#' + mySlide[i];
            for (var k = 0; k < length[i]; k++) {
                var CWDM = subpageDetails.RWinfos[i].CWinfos[k].CWDM;
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
        this.txttop(maxNum);

        var grouplen = parseInt(fzLength / maxNum) + 1;
        //页数
        this.pagenum(grouplen);
    },
    /*快速血糖加载*/
    fastBSInit: function (URL, BQDM) {
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
                $('#loadWrap').css({'opacity': 0, 'z-index': -1});
                _subpage.fastBS(data);
                _subpage.load();
            },
            complete: function (XHR, TS) {
                XHR = null;
            }
        });
    },
    //icu手术子页面
    operateInit: function (URL, BQDM) {
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
                $('#loadWrap').css({'opacity': 0,'z-index': -1});
                _method.ICUheader(data);
                _subpage.operate(data);
                _subpage.load();
            },
            complete: function (XHR, TS) {
                XHR = null;
            }
        });
    },
    //icu预约子页面
    orderInit: function (URL, BQDM) {
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
                $('#loadWrap').css({'opacity': 0,'z-index': -1});
                _method.ICUheader(data);
                _subpage.order(data);
                _subpage.load();
            },
            complete: function (XHR, TS) {
                XHR = null;
            }
        });
    },
    //icu子页面
    operate:function (data) {
        var operate = data.SSinfos[0].Infos,
            length = operate.length,
            maxNum = 12,
            myHtml = '',
            gc = '',
            tbj = '',
            bx = '',
            mySQ = '';
        console.log(operate);

        for (var i = 0; i < length; i++) {
            if (operate[i].GC == 0) {
                gc = '';
            } else {
                gc = '<span class="mark"></span>';
            }

            if (operate[i].TBJ == 0) {
                tbj = '';
            } else {
                tbj = '<span class="mark"></span>';
            }

            if (operate[i].BX == 0) {
                bx = '';
            } else {
                bx = '<span class="mark"></span>';
            }

            if (operate[i].BP == 0) {
                bp = '';
            } else {
                bp = '<span class="mark"></span>';
            }
            myHtml += '<li class="border-bottom">' +
                '<span class="font-2"><span class="num">' + operate[i].CWDM + '</span></span>' +
                '<span class="font-2">'+ operate[i].SSMC +'</span>' +
                '<span class="surName font-4">' + gc + '</span>' +
                '<span class="clysis font-2">' + tbj + '</span>' +
                '<span class="defInstru font-3">' + bx + '</span>' +
                '<span class="surPos font-4">' + bp + '</span>' +
                '<span>'+operate[i].SSDD+'</span> ' +
                '</li>';
        }
        $('#fastBSSlide').html(myHtml);
        //翻页
        this.txttop(maxNum);
        var grouplen = parseInt(length / maxNum) + 1;
        //页数
        this.pagenum(grouplen);
    },
    order: function (data) {
        //YYJCinfos 测血压 - 预约检查
        var scheduleDetails = data.YYJCinfos[0];
        var infos = scheduleDetails.Infos;
        var length = infos.length;
        var maxNum = 12; //最大显示条数
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
        this.txttop(maxNum);

        var grouplen = parseInt(length / maxNum);
        if (length % maxNum != 0) {
            grouplen = grouplen + 1;
        }
        //页数
        this.pagenum(grouplen);
        /*行内溢出*/
        for (var i = 0; i < length; i++) {
            sch_id = '#sch_bd' + i;
            $(sch_id).xMarquee({
                speed: 50,
                temp: -1
            });
        }
    },
    fastBS: function (data) {
        var fastBSDetails = data.KSXTinfos,
            length = fastBSDetails.length,
            maxNum = 12,
            myHtml = '',
            myZCQ = '',
            myZWCQ = '',
            mySCH2H = '',
            mySQ = '';

        for (var i = 0; i < length; i++) {
            if (fastBSDetails[i].ZCQ == 0) {
                myZCQ = '';
            } else {
                myZCQ = '<span class="mark"></span>';
            }
            if (fastBSDetails[i].ZWCQ == 0) {
                myZWCQ = '';
            } else {
                myZWCQ = '<span class="mark"></span>';
            }
            if (fastBSDetails[i].SCH2H == 0) {
                mySCH2H = '';
            } else {
                mySCH2H = '<span class="mark"></span>';
            }
            if (fastBSDetails[i].SQ == 0) {
                mySQ = '';
            } else {
                mySQ = '<span class="mark"></span>';
            }
            myHtml += '<li class="border-bottom">' + '<span class="font-2"><span class="num">' + fastBSDetails[i].CWDM + '</span></span><span class="surName font-4">' + myZCQ + '</span><span class="clysis font-2">' + myZWCQ + '</span></span><span class="defInstru font-3">' + mySCH2H + '</span></span><span class="surPos font-4">' + mySQ + '</span> </li>';
        }
        $('#fastBSSlide').html(myHtml);
        //翻页
        this.txttop(maxNum);
        var grouplen = parseInt(length / maxNum) + 1;
        //页数
        this.pagenum(grouplen);
    },
    /*向上翻页*/
    txttop: function (maxNum) {
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
    },
    /*分页*/
    pagenum: function (grouplen) {
        if (grouplen == 1) {
            $('#screen li:nth-child(1)').html('');
            $('#screen li:nth-child(1)').css('border-color', 'transparent');
        } else {
            for (var i = 1; i < grouplen + 1; i++) {
                var myLi = '#screen li:nth-child(' + i + ')';
                $(myLi).html('第' + i + '页');
            }
        }
    },
    refresh: function () {
        if (navigator.onLine) {
            window.location.reload();
        } else {
            return false;
        }
    },
    /*刷新*/
    load: function () {
        var ms = 30000;
        setInterval(this.refresh, ms);
    }
}