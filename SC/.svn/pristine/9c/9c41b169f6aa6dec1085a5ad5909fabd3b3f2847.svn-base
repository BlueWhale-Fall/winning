var zoomUrl = 'data/zoomname.json',
    BQDM = window.localStorage.getItem('EDBQDM'),
    BQName = window.localStorage.getItem('EDBQName');

$.ajax({
    url: zoomUrl,
    type: "GET",
    dataType: "json",
    error: function () {
        alert('病区代码请求出错');
    },
    success: function (data) {
        document.getElementById('loadWrap').style.opacity = 0;
        document.getElementById('loadWrap').style.zIndex = -1;
        /*选择加载病区*/
        changeArea(data);
        /*选择病区代码*/
        dropList(data);
        /*获取病区名称*/
        setBQName(data);
        /*弹窗外关闭*/
        closeBox();
    }
});


function changeArea(data) {
    var changeUlHtml = '',
        _area = data.BQInfos;
    if(BQDM === null || BQDM === '' || BQDM === 'undefined') {
        BQDM = "0002";//急诊其中之一病区代码
    }
    window.localStorage.setItem('EDBQDM', BQDM);

    for(var i = 0; i < _area.length; i++) {
        console.log(_area[i].BQDM)
        switch (_area[i].BQDM) {
            case "0002"://确定的急诊病区代码
                $(".changeInput").html(_area[i].BQName)
                changeUlHtml += "<li data-dm='"+_area[i].BQDM+"'>" + _area[i].BQName + "</li>"
                break;
            case "0004"://确定的急诊病区代码
                changeUlHtml += "<li data-dm='"+_area[i].BQDM+"'>" + _area[i].BQName + "</li>"
                break;
        }
    }
    $(".changeUl").html("<ul>" + changeUlHtml + "</ul>");
}

function dropList(data) {
    $(".changeInput").on("click", function (event) {
        if ($(this).css("opacity") == 1) {
            $(this).css("opacity", .69);
        } else {
            $(this).css("opacity", 1);
        }
        $(".changeInput").toggleClass("open");
        $(".changeUl>ul").slideToggle();
        event.stopPropagation();
    })
    $(".changeUl").on("click", "li", function (event) {
        var _text = $(this).html(),
            _dm = $(this).data("dm");
        BQDM = _dm;
        window.localStorage.setItem('EDBQDM', BQDM);
        window.localStorage.setItem('EDBQName', _text);
        $(".changeInput").toggleClass("open")
            .html($(this).html())
            .css("opacity", 1);
        $(".changeUl>ul").slideUp();
        event.stopPropagation();
        /*每次点击切换请求数据*/
        dataInit();
    })
}

function setBQName(data) {
    if (BQName !== null && BQName !== '' && BQName !== 'undefined') {
        /*获取本地存储的病区代码*/
        $(".changeInput").html(BQName);
    }
}

/*弹窗外关闭*/
function closeBox() {
    $(window).click(function (event) {
        if ($(".changeUl>ul").css("display")) {
            $(".changeUl>ul").slideUp();
            $(".changeInput").removeClass("open");
            $(".changeInput").css("opacity", 1);
        }
    });
}