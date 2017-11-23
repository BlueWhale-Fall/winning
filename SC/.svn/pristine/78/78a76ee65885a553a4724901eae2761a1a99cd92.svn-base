var bedspeed = 4500, /*床号溢出滚动速度 单位ms*/
	pagespeed = 25000; /*分组溢出翻页时间间隔 单位ms*/

var _secondInit = {
    NFMinoutInit: function (URL, BQDM) {
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
                document.getElementById('loadWrap').style.opacity = 0;
                document.getElementById('loadWrap').style.zIndex = -1;
                _secondMethod.NFMinout(data, 10);
                _method.header(data);
                _method.load();
            },
            complete: function (XHR, TS) {
                XHR = null;
            }
        });
    },
    NFMallergyInit: function (URL, BQDM) {
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
                document.getElementById('loadWrap').style.opacity = 0;
                document.getElementById('loadWrap').style.zIndex = -1;
                _secondMethod.NFMallergy(data, 9);
                _method.header(data);
                _method.load();
            },
            complete: function (XHR, TS) {
                XHR = null;
            }
        });
    }
}

var _secondMethod = {
    NFMinout: function (data, FZPX) {
        var inoutDetails = data.FZinfos[FZPX - 1],
            fzLength = inoutDetails.RWinfos.length,
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
            length.push(inoutDetails.RWinfos[i].CWinfos.length);
            mySlide.push('inoutSlide' + (i + 1));
            ids.push('ioName' + (i + 1));
            myTitle.push(inoutDetails.RWinfos[i].RWName);
            wrap += '<li id="' + ids[i] + '" class="border-bottom floatL"><span class="secTitles">' + myTitle[i] + '</span><div id="' + mySlide[i] + '" class="slide"></div></li>';
        }
        $('#inout .infoList').html(wrap);

        //data
        for (var i = 0; i < fzLength; i++) {
            var myId = '#' + ids[i],
                myLi = '',
                myHtml = '',
                RWXH = inoutDetails.RWinfos[i].RWXH;
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
        this.txttop(maxNum);

        var grouplen = parseInt(fzLength / maxNum) + 1;
        //页数
        this.pagenum(grouplen);
    },
    NFMallergy: function (data, FZPX) {
        var allergyDetails = data.FZinfos[FZPX - 1],
            RWinfos = allergyDetails.RWinfos[0],
            fzLength = allergyDetails.RWinfos.length,
            length = [],
            mySlide = [],
            myTitle = [],
            ids = [],
            bedmax = 31, //行内床号最大显示条数
            maxNum = 12, //分组最大显示条数
            wrap = '';
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
            var myLi = '',
                myHtml = '',
                myId = '#' + ids[i],
                RWXH = allergyDetails.RWinfos[i].RWXH;
            mySlide[i] = '#' + mySlide[i];
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
        this.txttop(maxNum);

        var grouplen = parseInt(fzLength / maxNum);
        if (fzLength % maxNum != 0) {
            grouplen = grouplen + 1;
        }
        //页数
        this.pagenum(grouplen);
    },
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
    }
}
