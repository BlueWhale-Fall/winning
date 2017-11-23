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
                _method.header(data);
            },
            complete: function () {
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
            maxNum = 12, //分组最大显示条数
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
            } else if (RWNamelength > 6 && RWNamelength < 11) {
                fontSize = 20;
                lineHeight = 55;
            } else if (RWNamelength >= 11 && RWNamelength < 15) {
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
                myLi += '<li><span class="num">' + CWDM + '</span></li>';
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
    /*测血糖加载*/
    testBSInit: function (URL, BQDM) {
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
                _subpage.testBS(data);
                _method.header(data);
                _subpage.load();
            }
        });
    },
    testBS: function (data) {
        console.log(data)
        var fastBSDetails = data.CXTinfos,
            length = fastBSDetails.length,
            maxNum = 12,
            myHtml = '',
            myZCQ = '',
            myZCH = '',
            myWUQ = '',
            myWUH = '';
            myWANQ = '';
            myWANH = '';
            myNINE = '';

        for (var i = 0; i < length; i++) {
            if (fastBSDetails[i].ZCQ == 0) {
                myZCQ = '';
            } else {
                myZCQ = '<span class="mark"></span>';
            }
            if (fastBSDetails[i].ZCH == 0) {
                myZCH = '';
            } else {
                myZCH = '<span class="mark"></span>';
            }
            if (fastBSDetails[i].WUQ == 0) {
                myWUQ = '';
            } else {
                myWUQ = '<span class="mark"></span>';
            }
            if (fastBSDetails[i].WUH == 0) {
                myWUH = '';
            } else {
                myWUH = '<span class="mark"></span>';
            }
            if (fastBSDetails[i].WANQ == 0) {
                myWANQ = '';
            } else {
                myWANQ = '<span class="mark"></span>';
            }
            if (fastBSDetails[i].WANH == 0) {
                myWANH = '';
            } else {
                myWANH = '<span class="mark"></span>';
            }
            if (fastBSDetails[i].NINE == 0) {
                myNINE = '';
            } else {
                myNINE = '<span class="mark"></span>';
            }
            myHtml += '<li class="border-bottom">' + '<span class="font-2"><span class="num">' + fastBSDetails[i].CWDM + '</span></span><span class="surName font-4">' + myZCQ + '</span><span class="clysis font-2">' + myZCH + '</span><span class="defInstru font-3">' + myWUQ + '</span><span class="surPos font-4">' + myWUH + '</span><span class="defInstru font-3">' + myWANQ + '</span><span class="defInstru font-3">' + myWANH + '</span><span class="defInstru font-3">' + myNINE + '</span></li>';
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
        var ms = 300000;
        setInterval(this.refresh, ms);
    }
}