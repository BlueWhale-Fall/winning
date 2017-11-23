var BQDM = '2928';

function headerInit() {
    $.ajax({
        url: "js/data.json",
        type: "GET",
        dataType: "json",
        data: {
            bqdm: BQDM
        },
        error: function () {
            alert("数据加载错误");
        },
        success: function (data) {
            header(data);
        },
        complete: function (XHR, TS) {
            XHR = null;
        }
    });
}

/*headerInit_begin*/
function header(data) {
    var headerHtml = document.getElementById('header');
    //var now = new Date;
    //var year = now.getFullYear();
    //var mouth = now.getMonth() + 1;
    //var date = now.getDate();
    //var day = now.getDay();
    //var weekArr = ['星期日', '星期一', '星期二', '星期三', '星期四', '星期五', '星期六'];
    //var week = weekArr[day];
    var today = data.DateWeek;
    headerHtml.innerHTML = '<section class="head"><div><span class="headtime">' + today + '</span></div><div>' + data.BQTitle + '</div></section><section class="headbody"><article class="headmain">' + '<div class="floatL headborder"><div class="headbox leftimg"></div>' + '<div class="headbox no-padding"><div class="headhighline">' + '<div class="lefttext margin-right-20">病人总数</div>' + '<div class="lefttextnum margin-right-20">' + data.BRCount + '</div>' + '</div></div><div class="headboxright"><div class="headtextbox">' + '<span class=" headtext margin-right-25">新入院</span>' + '<span class="headnum">' + data.XRY + '</span><span class="headtext margin-right-25">' + '转入</span><span class="headnum">' + data.ZR + '</span></div><div class="headtextbox">' + '<span class=" headtext margin-right-25 ">出院</span>' + '<span class="headnum">' + data.CY + '</span><span class="headtext margin-right-25">转出' + '</span><span class="headnum">' + data.ZR + '</span></div></div></div>' + '<div class="floatL headborder"><div class="headbox middleimg margin-left-30"></div>' + '<div class="headbox no-padding"><div class="headhighline">' + '<div class="lefttext margin-right-20">手术</div>' + '<div class="righttextnum margin-right-40">' + data.SS + '</div></div></div>' +
        '<div class="headboxright" style="width: 448px">' +
        '<div class="headtextbox">'
        + '<span class=" headtext margin-right-20">特级护理</span>' + '<span class="headnum sCare">' + data.TJHL + '</span>' +
        '<span class="headtext margin-right-20">' + 'Ⅰ级护理</span><span class="headnum">' + data.YJHL + '</span>' +
        '<span class="headtext margin-right-20">' + '病重</span><span class="headnum">' + data.BZ + '</span>' +
        '</div>' +
        '<div class="headtextbox">' +
        '<span class=" headtext margin-right-20">病危</span>' +
        '<span class="headnum font-red">' + data.BW + '</span>' +
        '<span class="headtext margin-right-20">' + 'Ⅱ级护理</span>' +
        '<span class="headnum">' + data.EJHL + '</span>' +
        '</div>' +
        '</div></div>' + '<div class="floatL"><div class="headbox rightimg margin-left-30"></div>' + '<div class="headbox no-padding"><div class="headhighline">' + '<div class="lefttext margin-right-20">特别关注</div>' + '<div class="righttextnum">' + data.TBGZ + '</div></div></div>' + '<div class="headboxright"><div class="headtextbox">' + '<span class=" headtext margin-right-25">压疮</span>' + '<span class="headnum sCare">' + data.YC + '</span><span class="headtext margin-right-25">' + '导管</span><span class="headnum">' + data.DG + '</span></div>' + '<div class="headtextbox"><span class=" headtext margin-right-25">跌倒</span>' + '<span class="headnum Scare">' + data.DD + '</div></div>' + '</div></article></section>' + '</article</section>';
}

/*headerInit_end*/