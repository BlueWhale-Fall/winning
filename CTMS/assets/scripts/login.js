/*form*/
var submit = document.getElementById('submit');

submit.addEventListener('click', login);

function login() {
    //alert('hi');
    var userName = document.getElementById('username');
    var userPw = document.getElementById('userpw');
    var warning = document.getElementsByClassName('backtxt');

    if (userName.value == '' || userPw == '') {
        //warning
        warning[0].innerHTML = '帐号、密码不能为空';
        if (userName.value == '') {
            userName.focus();
        } else if (userPw == '') {
            userPw.focus();
        }
    } else if (userName.value == 'winning' && userPw.value == '123') {
        return true;
    } else {
        //warning
        warning[0].innerHTML = '帐号或密码错误!';
    }
}