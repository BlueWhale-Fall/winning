//普通溢出

function overflow(data, FZXH, RWPH, max, aniId, aniName, conId, ulClass) {
    var details = data.FZinfos[FZXH - 1]; //分组号
    var RWinfos = details.RWinfos[RWPH - 1]; //任务号
    var totoalNum = RWinfos.CWinfos.length; //判断床号长度
    var maxNum = max; //允许使用最大展示量
    var loopNum = parseInt(totoalNum / maxNum); //循环次数取整
    var remainder = totoalNum % maxNum; //余数
    var myHtml = '';
    var myCyhtml = '';
    //动画方向
    $(aniId).addClass(aniName);

    //整页循环
    for (var i = 0; i < loopNum; i++) {
        var myContent = '';
        var CYLi = '';
        var j = maxNum * i; //j的初始值
        var btmark = (maxNum - 1) * (i + 1) + i + 1; //下标最大值
        for (j; j < btmark; j++) {
            //内容循环
            var CWDM = RWinfos.CWinfos[j].CWDM;
            var RWXH = RWinfos.RWXH;
            myContent += '<li><span class="num" data-search="' + RWXH + '-' + CWDM + '" onclick="showbox(this)">' + CWDM + '</span></li>';

        }
        myCyhtml = '<div class="slide_section"><ul class="ioList">' + CYLi + '</ul></div>';
        myHtml += '<div class="slide_section"><ul class="' + ulClass + '">' + myContent + '</ul></div>';
    }
    //余数循环
    if (remainder) {
        var lastContent = '';
        var btmark = totoalNum - remainder; //余数下标起始值
        for (var k = btmark; k < totoalNum; k++) {
            var CWDM = RWinfos.CWinfos[k].CWDM;
            var RWXH = RWinfos.RWXH;
            lastContent += '<li><span class="num" data-search="' + RWXH + '-' + CWDM + '" onclick="showbox(this)">' + CWDM + '</span></li>';
        }
        myHtml += '<div class="slide_section"><ul class="' + ulClass + '">' + lastContent + '</ul></div>'; //整页+余数
    }
    //填充

    $(conId).html(myHtml);
}

//手术板块和预约溢出

function operOverflow(data, anId, conId, max, num) //传参num 标识首页(1)和详情页(2),预约首页(3)和预约详情页(4)
{
    var details; //分组号
    if (num == 1 || num == 2) {
        details = data.SSinfos[0];
    } else {
        details = data.YYJCinfos[0];
    }
    var infos = details.Infos; //任务号
    var totoalNum = infos.length; //判断床号长度
    var maxNum = max; //允许使用最大展示量
    var loopNum = parseInt(totoalNum / maxNum); //循环次数取整
    var remainder = totoalNum % maxNum; //余数
    var myHtml = '';
    //动画方向
    $(anId).addClass('text-left');

    //整页循环
    for (var i = 0; i < loopNum; i++) {
        var myContent = '';
        var j = maxNum * i; //j的初始值
        var btmark = (maxNum - 1) * (i + 1) + i + 1; //下标最大值
        for (j; j < btmark; j++) {
            //内容循环
            var clClass = '';
            var deClass = '';
            var mygc = '';
            var mytbj = '';
            //判断是否mark
            if (infos[j].GC === "1") {
                clClass = 'floatL clysis mark border-right';
                mygc = '<span class="mark"></span>';
            } else {
                clClass = 'floatL clysis border-right';
                mygc = '';
            }
            if (infos[j].TBJ === "1") {
                deClass = 'floatL defInstru mark';
                mytbj = '<span class="mark"></span>';
            } else {
                deClass = 'floatL defInstru';
                mytbj = '';
            }
            if (num === 1) {
                myContent += '<ul class="operList border-bottom"><li><ul class="operItem">' + '<li class="floatL border-right"><span class="num">' + infos[j].CWDM + '</span></li><li class="floatL operName border-right">' + infos[j].SSMC + '</li><li class="' + clClass + '"></li><li class="' + deClass + '"></li>' + '</ul></li></ul>';
            } else if (num === 2) {
                myContent += '<ul class="surList"><li class="border-bottom">' + '<span class="font-2"><span class="num">' + infos[j].CWDM + '</span></span><span class="surName font-4">' + infos[j].SSMC + '</span><span class="clysis font-2">' + mygc + '</span></span><span class="defInstru font-3">' + mytbj + '</span></span><span class="surPos font-4">' + infos[j].SSDD + '</span> </li></ul>';
            } else if (num == 3) {
                var CWDM = infos[j].CWDM;
                var RWXH = details.RWXH;
                myContent += '<li class="floatL"><span class="num" data-search="' + RWXH + '-' + CWDM + '" onclick="showbox(this)">' + CWDM + '</span></li>';
            } else if (num == 4) {
                var content = infos[j].Content.replace(/<br><br>/g, "、");
                content = content.replace(/、$/g, "");
                myContent += '<li class="border-bottom">' + '<span class="bednum"><span class="num">' + infos[j].CWDM + '</span></span><span class="ckdetail"><div class="txtMarquee-left"><div class="bd' + j + '"><ul class="infoList"><li>' + content + '</li></ul></div></div></span><span class="ordertime">' + infos[j].CheckTime + '</span> </li>';
            }
        }
        if (num == 3 || num == 4) {
            myContent = '<ul class="htorderList">' + myContent + '</ul>';
        }
        myHtml += '<div class="slide_section">' + myContent + '</div>';

    }
    //余数循环
    if (remainder) {
        var lastContent = '';
        var btmark = totoalNum - remainder; //余数下标起始值
        for (var k = btmark; k < totoalNum; k++) {
            var clClass = '';
            var deClass = '';
            var mygc = '';
            var mytbj = '';
            //判断是否mark
            if (infos[k].GC === "1") {
                clClass = 'floatL clysis mark border-right';
                mygc = '<span class="mark">';
            } else {
                clClass = 'floatL clysis border-right';
                mygc = '<span>';
            }
            if (infos[k].TBJ === "1") {
                deClass = 'floatL defInstru mark';
                mytbj = '<span class="mark">';
            } else {
                deClass = 'floatL defInstru';
                mytbj = '<span>';
            }
            if (num === 1) {
                lastContent += '<ul class="operList border-bottom"><li><ul class="operItem">' + '<li class="floatL border-right"><span class="num">' + infos[k].CWDM + '</span></li><li class="floatL operName border-right">' + infos[k].SSMC + '</li><li class="' + clClass + '"></li><li class="' + deClass + '"></li>' + '</ul></li></ul>';
            } else if (num === 2) {
                lastContent += '<ul class="surList"><li class="border-bottom">' + '<span class="font-2"><span class="num">' + infos[k].CWDM + '</span></span><span class="surName font-4">' + infos[k].SSMC + '</span><span class="clysis font-2">' + mygc + '</span></span><span class="defInstru font-3">' + mytbj + '</span></span><span class="surPos font-4">' + infos[k].SSDD + '</span> </li></ul>';
            } else if (num == 3) {
                var CWDM = infos[k].CWDM;
                var RWXH = details.RWXH;
                lastContent += '<li class="floatL"><span class="num" data-search="' + RWXH + '-' + CWDM + '" onclick="showbox(this)">' + CWDM + '</span></li>';
            } else if (num == 4) {
                var content = infos[k].Content.replace(/<br><br>/g, "、");
                content = content.replace(/、$/g, "");
                lastContent += '<li class="border-bottom">' + '<span class="bednum"><span class="num">' + infos[k].CWDM + '</span></span><span class="ckdetail"><div class="txtMarquee-left"><div class="bd' + k + '"><ul class="infoList"><li>' + content + '</li></ul></div></div></span><span class="ordertime">' + infos[k].CheckTime + '</span> </li>';
            }
        }
        if (num == 3 || num == 4) {
            lastContent = '<ul class="htorderList">' + lastContent + '</ul>';
        }
        myHtml += '<div class="slide_section">' + lastContent + '</div>'; //整页+余数
    }
    //填充
    $(conId).html(myHtml);
}