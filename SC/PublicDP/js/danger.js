var dangerurl = 'data/danger.json'; /*病危值登录*/
var lgsubmitUrl = 'data/submit.json'; /*工号密码验证*/
var cleardangerUrl = 'data/submit.json'; /*清除危险值请求*/
/*request dangerdata*/
function dangerInit(RWXH, CH, RWName) {
    $.ajax({
        url: dangerurl,
        type: "GET",
        dataType: "json",
        data: {
            bqdm: BQDM,
            ch: CH,
            rwxh: RWXH
        },
        error: function () {
            alert("查询错误");
        },
        success: function (data) {
            dangerInfo(data, RWXH, CH);
        }
    });
}

/*submit form*/
function submit(user, pw, RWXH, CH) {
    $.ajax({
        url: lgsubmitUrl,
        type: "GET",
        data: {
            bqdm: BQDM,
            username: user,
            password: pw
        },
        error: function () {
            alert("登录失败");
        },
        success: function (data) {
            /*show controlbox*/
            if (data.r) {
                /*data.r==1*/
                // alert('登录成功!');
                dangerctl(RWXH, CH);
            } else {
                /*data.r==0*/
                var txt = document.getElementsByClassName('login_title')[0];
                txt.innerHTML = '<img src="img/danger.png" alt="dangericon">您输入的工号或密码错误!';
            }

        }
    });
}

function dangerInfo(data, RWXH, CH) {
    var common = '';
    var logincontent = '';
    var controlcontent = '';
    common = '<div class="titlewrap padding-0-30"><h2><img src="img/danger.png" alt="dangericon">危急值</h2><span class="shadowline"></span></div><div class="content"><div class="numname"><span class="num">' + data.CH + '</span><span class="pname">' + data.Name + '</span></div> <ul class="pdetails"><li><ul class="p1"><li>送检科室:<span class="info">' + data.SJKS + '</span></li><li>送检时间:<span class="info">' + data.SJTime + '</span></li><li>报告单号:<span class="info">' + data.BGDH + '</span></li><li>住院号:<span class="info">' + data.ZYH + '</span></li></ul></li><li><ul class="p2"><li>报告时间:<span class="info">' + data.BGTime + '</span></li><li>病区:<span class="info">' + data.BQ + '</span></li><li>在班医生:<span class="info">' + data.ZBYS + '</span></li></ul></li></ul></div><div class="notice"><p>' + data.Content + '</p></div>';
    logincontent = common + '<form id="fm"><span class="login_title">请输入您的工号和密码!</span><br><input type="text" placeholder="工号" id="username"><input type="password" placeholder="密码" id="password"><br><button type="button" id="login" class="loginBtn">登录处理</button><button type="reset" id="reset" class="resetBtn" onclick="triggerbox(1,\'dangerLogin\')">取消</button></form><a class="close" title="关闭" onclick="triggerbox(1,\'dangerLogin\')"></a>';
    controlcontent = common + '<form id="fm2"><button type="button" id="controlBtn" class="controlBtn">处理</button><button type="reset" id="resetControl" onclick="triggerbox(1,\'dangerControl\')" class="resetBtn">取消</button></form><a class="close" title="关闭" onclick="triggerbox(1,\'dangerControl\')"></a>';

    /*dangerbox content*/
    $('#dangerLogin').html(logincontent);

    /*danger controlbox content*/
    createObj('dangerControl', 'danger_ctl', 0);
    $('#dangerControl').html(controlcontent);

    /*login  submit*/
    var loginBtn = document.getElementById('login');
    loginBtn.addEventListener('click', login);

    function login() {
        var username = document.getElementById('username').value.trim();
        var password = document.getElementById('password').value.trim();
        if (username == '' || password == '') {
            var txt = document.getElementsByClassName('login_title')[0];
            txt.innerHTML = '<img src="img/danger.png" alt="dangericon">请检查工号和密码是否输入完整!';
        } else {
            /*工号和密码不为空则提交验证*/
            submit(username, password, RWXH, CH);
        }
    }
}
/*dangerbox*/
function dangerLogin(span) {
    var search = span.getAttribute('search').split('-');
    var RWXH = search[0];
    var RWName = search[1];
    var CH = search[2];
    /*request danger*/
    dangerInit(RWXH, CH, RWName);
    createObj('dangerLogin', 'danger_login', 0);
    /*show or hide dangerbox*/
    var dangerbox = document.getElementsByClassName('danger_login')[0];
    var mask = document.getElementsByClassName('darkmask')[0];
    if (dangerbox.style.opacity == 0) {
        setTimeout(function () {
            triggerbox(0, 'dangerLogin');
        }, 150);

    } else {
        triggerbox(1, 'dangerLogin');
    }
}

/*danger controlbox*/
function dangerctl(RWXH, CH) {
    
    triggerbox(1, 'dangerLogin');
    var dangercontrol = document.getElementById('dangerControl');
    if (dangercontrol.style.opacity == '0') {
        setTimeout(function () {
            triggerbox(0, 'dangerControl');
        }, 150);
    }

    var controlBtn = document.getElementById('controlBtn');
    controlBtn.addEventListener('click', function () {
        cleardanger(RWXH, CH);
    });
}

/*clear danger*/
function cleardanger(RWXH, CH) {
    $.ajax({
        url: cleardangerUrl,
        type: "GET",
        data: {
            bqdm: BQDM,
            ch: CH,
            rwxh: RWXH
        },
        error: function () {
            /*删除失败*/
            triggerbox(1, 'dangerControl');
            showResult(0);
        },
        success: function (data) {
            /*删除危急值*/
            if (data.r) {
                /*处理成功*/
                triggerbox(1, 'dangerControl');
                showResult(1);
            } else {
                /*处理失败*/
                triggerbox(1, 'dangerControl');
                showResult(0);
            }
        }
    });
}

/*clearbox*/
function showResult(result) {
    createObj('dangerResult', 'danger_result', 0);
    var dangerResult = document.getElementById('dangerResult');
    var dangerResult = '';
    var titile = '';
    var imgName = '';
    var backtxt = '';
    var tcolor = '';
    if (result) {
        titile = '处理成功';
        imgName = 'success.png';
        backtxt = '恭喜您处理成功';
        tcolor = 'success';

    } else {
        titile = '处理失败';
        imgName = 'fail.png';
        backtxt = '抱歉处理失败';
        tcolor = 'fail';
    }
    dangerResult = '<div class="titlewrap"><h2 class="' + tcolor + '">' + titile + '</h2></div><a class="close" title="关闭" onclick="triggerbox(1,\'dangerResult\')"></a><span class="shadowline"></span><div class="conwrap"><img src="img/' + imgName + '" alt="success img"><br><span class="backtxt">' + backtxt + '</span></div><button type="button" id="close" onclick="triggerbox(1,\'dangerResult\')">关闭</button>';
    $('#dangerResult').html(dangerResult);
    init(); /*重新请求首页数据*/
    setTimeout(function () {
        triggerbox(0, 'dangerResult');
    }, 150);
}