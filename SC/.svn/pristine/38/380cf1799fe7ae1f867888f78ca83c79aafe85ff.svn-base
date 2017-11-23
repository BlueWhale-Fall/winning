var BQDM = '';
var zoomUrl = 'data/zoomname.json';
/*验证是否初始化过*/
var key = window.localStorage.getItem('initKey');

if (key !== null && key !== '' && key !== 'undefined') {
    /*获取本地存储的病区代码*/
    BQDM = key;
} else {
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
            /*请求病区代码*/
            initBQDM(data);
        }
    });
}

function initBQDM(data) {
    /*初始化界面*/
    var initwrap = document.createElement('article');
    initwrap.setAttribute('id', 'initwrap');
    initwrap.className = 'initwrap';
    var initnav = document.createElement('nav');
    initnav.innerHTML = '<span class="logo"></span><h1>可视化护理综合信息平台</h1><h2>VISUAL NURSING INTEGRATED INFORMATION PLATFORM</h2>';
    initwrap.appendChild(initnav);

    var inithd = document.createElement('header');
    inithd.innerHTML = '<h2>可视化护理综合信息平台</h2><p>VISUAL NURSING INTEGRATED INFORMATION PLATFORM</p>';
    initwrap.appendChild(inithd);

    var initbox = document.createElement('div');
    initbox.className = 'initbox';
    var zoomname = document.createElement('input');
    zoomname.setAttribute('id', 'zoomname');
    zoomname.className = 'bradius-100';
    zoomname.setAttribute('type', 'text');
    zoomname.setAttribute('name', 'zoomname');
    zoomname.setAttribute('placeholder', '请选择病区名称');

    var initbtn = document.createElement('button');
    initbtn.setAttribute('id', 'initbtn');
    initbtn.className = 'bradius-100';
    initbtn.setAttribute('type', 'button');
    initbtn.setAttribute('name', 'init');
    initbtn.innerHTML = '确定';
    initbox.appendChild(zoomname);
    initbox.appendChild(initbtn);
    initwrap.appendChild(initbox);

    var initimg = document.createElement('div');
    initimg.className = 'bgimg';
    initwrap.appendChild(initimg);

    var initfooter = document.createElement('footer');
    initfooter.innerHTML = '<span class="hosname">医院名称</span><span class="copyright">© 2016 Winning Health 版权所有</span>';
    initwrap.appendChild(initfooter);

    document.body.appendChild(initwrap);
    $('#initwrap')[0].style.display = 'block';
    $('#initwrap')[0].style.zIndex = 20002;
    /*创建list*/
    var zoomlist = document.createElement('ul');
    zoomlist.className = 'zoomlist';
    for (var i = 0, zoomlen = data.BQInfos.length; i < zoomlen; i++) {
        zoomlist.innerHTML += '<li>' + data.BQInfos[i].BQName + '</li>';
    }
    var listwrap = document.createElement('div');
    listwrap.className = 'listwrap';
    listwrap.appendChild(zoomlist);
    $('#initwrap div').eq(0).append(listwrap);
    $('.listwrap').eq(0).slideUp();
    /*进行初始化*/
    $('#zoomname').click(function () {
        $('.listwrap').eq(0).slideDown();
    });
    $('#initwrap').click(function (e) {
        var zoomname = $('#zoomname');
        if (initbtn.style.display !== 'none' && !zoomname.is(e.target) && zoomname.has(e.target).length === 0) {
            $('.listwrap').eq(0).slideUp();
        }
    });
    $('.zoomlist li').click(function () {
        var _index = $(this).index();
        var selectname = $(this).html();
        $('#zoomname').val(selectname);
        var initKey = data.BQInfos[_index].BQDM;
        var hosname = data.BQInfos[_index].HOSName;
        $('#initwrap footer .hosname').eq(0).html(hosname);
        BQDM = initKey;
        window.localStorage.setItem('initKey', initKey);
    });
    $('#initbtn').click(function () {
        var zoomname = $('#zoomname').val();
        if (zoomname === '') {
            $('#zoomname').css('borderColor', '#9bcdff');
            $('#zoomname').attr("placeholder", "初始化失败，请选择病区名称");
        } else {
            BQDM = window.localStorage.getItem('initKey');
            if (BQDM !== null && BQDM !== '' && BQDM !== 'undefined') {
                $('.initwrap').css('opacity', 0);
                setTimeout(function () {
                    $('#initwrap').remove();
                }, 300);
                window.location.reload();
            } else {
                $('#zoomname').val('');
                $('#zoomname').attr("placeholder", "初始化失败，请重试");
            }
        }
    });
}