var boxUrl = "js/showBox.json";
var allUrl = "js/data.json";

/*changeBtn*/

function change() {
    var changeBtn = document.getElementById('changeBtn');
    var closeBtn = document.getElementById('closeBtn');
    var content = document.getElementById('changeContent');

    changeBtn.addEventListener('click', function () {
        content.style.opacity = 1;
        content.style.zIndex = 1001;
    });
    closeBtn.addEventListener('click', function () {
        content.style.opacity = 0;
        content.style.zIndex = -1;
    });

};

function navInit() {
    var myHtml = '<article class="mask"></article><article class="changeBox"><ul class="menus text-align-c"><li class="menulist"><a href="index.html"><ul><li class="menuIcon index border-radius-all ease-in-out"></li><li class="menuTxt ease-in-out">首页</li></ul></a></li><li class="menulist"><a href="surgery.html"><ul><li class="menuIcon surgery border-radius-all ease-in-out"></li><li class="menuTxt ease-in-out">手术</li></ul></a></li><li class="menulist"><a href="inout.html"><ul><li class="menuIcon inout border-radius-all ease-in-out"></li><li class="menuTxt ease-in-out">入出转</li></ul></a></li><li class="menulist fontover"><a href="special.html"><ul><li class="menuIcon special border-radius-all ease-in-out"></li><li class="menuTxt ease-in-out">特殊治疗</li></ul></a></li><li class="menulist"><a href="allergy.html"><ul><li class="menuIcon allergy border-radius-all ease-in-out"></li><li class="menuTxt ease-in-out">药敏</li></ul></a></li><li class="menulist"><a href="duct.html"><ul><li class="menuIcon duct border-radius-all ease-in-out"></li><li class="menuTxt ease-in-out">导管</li></ul></a></li><li class="menulist"><a href="signs.html"><ul><li class="menuIcon signs border-radius-all ease-in-out"></li><li class="menuTxt ease-in-out">体征</li></ul></a></li><li class="menulist fontover"><a href="schedule.html"><ul><li class="menuIcon schedule border-radius-all ease-in-out "></li><li class="menuTxt ease-in-out">预约检查</li></ul></a></li></ul><a id="closeBtn" href="javascript:;" class="closeBtn text-align-c ease-in-out" title="关闭"></a></article>';
    $('#changeContent').html(myHtml);
}

function changeBtn() {
    navInit();
    change();
}

function refresh() {
    if(navigator.onLine) {
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

/*touch for refresh*/
function touchRefresh() {
    var freshBtn = document.getElementById('refreshBtn');
    freshBtn.addEventListener('click', refresh);
}

//直接调用

load();
changeBtn();
touchRefresh();

/*aside*/

var asdClose = document.getElementById('asdClose');
asdClose.addEventListener('click', function () {
    var aside = document.getElementsByClassName('asideBox')[0];
    aside.style.right = '-238px';
    aside.style.opacity = 0;
});


/*search by bednum*/
function boxInit(BQDM, RWXH, CWDM) {
    $.ajax({
        url: boxUrl,
        type: "GET",
        dataType: "json",
        data: {
            bqdm: BQDM,
            rwxh: RWXH,
            cwdm: CWDM
        }, //传参
        error: function () {
            alert("数据查询错误");
        },
        success: function (data) {
            boxdata(data, CWDM);
        }
    });
}

function boxdata(data, CWDM) {
    var mybox = '';
    /*change data*/
    var name = data.Name;
    var age = data.Age;
    var title = data.Title;
    var content = data.Content;
    var checktitle = data.CheckTitle;
    var checktime = data.CheckTime;
    var toptitle;
    var mydate;
    var myclock;
    if (checktime.indexOf(':') != -1) {
        checktime = data.CheckTime.split(' ');
        mydate = checktime[0];
        myclock = checktime[1];
    } else {
        myclock = '';
        mydate = data.CheckTime;
    }
    /*change toptile*/
    (title == '检查项目') ? (toptitle = '预约检查') : (toptitle = '病人信息');
    if (content.length > 100) {
        var pos = content.indexOf('<br>', 80);
        content = content.substr(0, pos) + '<br>...';
    }
    mybox = '<div class="oderWrap"><h2>' + toptitle + '</h2><span class="onum">' + CWDM + '</span></div><div class="content"><span class="pname">' + name + '<span class="page">' + age + '</span></span><h3 class="odetial">' + content + '</h3><span class="odes">' + title + '</span></div><time><span class="h-m">' + myclock + '</span><span class="y-m-d">' + mydate + '</span><span class="tdes">' + checktitle + '</span></time>';
    $('.asideBox .topwrap').html(mybox);
    /*change fontsize*/
    if (6 <= content.length <= 10) {
        $('.asideBox h3').addClass('font-md');
    }
    if (content.length > 10) {
        $('.asideBox h3').addClass('font-sm');
    }
}

function showbox(num) {
    var data_search = num.dataset.search.split('-');
    var RWXH = data_search[0];
    var CWDM = data_search[1];
    getBqdm();

    /*request BQDM*/
    function getBqdm() {
        $.ajax({
            url: allUrl,
            type: "GET",
            data: {
                bqdm: BQDM
            },
            dataType: "json",
            error: function () {
                alert("数据加载错误");
            },
            success: function (data) {
                var BQDM = data.BQDM;

                /*request data*/
                boxInit(BQDM, RWXH, CWDM); /*传参*/
            }
        });
    }

    /*showbox*/
    var aside = document.getElementsByClassName('asideBox')[0];
    aside.style.right = '20px';
    aside.style.opacity = 1;
    //alert(num.dataset.search);
};