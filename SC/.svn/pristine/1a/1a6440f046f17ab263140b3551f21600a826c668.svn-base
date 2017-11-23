var boxUrl = "js/showBox.json";
var allUrl = "js/ICUdata.json";
var BQDM = '0001';

/*changeBtn*/


function refresh() {
    window.location.reload();
}

/*loading*/
function load() {
    var ms = 300000;
    setInterval(refresh, ms);
}


//直接调用

load();


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
                boxInit(BQDM, RWXH, CWDM);
                /*传参*/
            }
        });
    }

    /*showbox*/
    var aside = document.getElementsByClassName('asideBox')[0];
    aside.style.right = '24px';
    aside.style.opacity = 1;

};