function rdataInit() {
    $.ajax({
        url: "js/data.json",
        type: "GET",
        dataType: "json",
        error: function () {
            alert("数据加载错误");
        },
        success: function (data) {
            zbdcInit(data); //值班医生
            topicInit(data); //通知公告
        },
        complete: function (XHR, TS) {
            XHR = null;
        }
    });
}

/*doctor_begin*/
function zbdcInit(data) {
    //YSinfos 值班护士
    var dcDetails = data.YSinfos[0];
    var detailsWrap = document.getElementById('doctor');
    $('.nurseTitle span')[0].innerHTML = data.YSinfos[0].Name; //值班护士
    detailsWrap.innerHTML = '<div class="dcImg"><img src="img/' + dcDetails.ZBYSImg + '" alt="doctor Img">' + '<div class="txtWrap"><h2>值班时间：</h2><p>' + dcDetails.ZBTime + '</p>' + '</div></div><ul><li class="docName">' + dcDetails.ZBYSName + '</li>' + '<li class="docPos">' + dcDetails.ZBYSPos + '</li><li class="office">' + dcDetails.ZBYSOffice + '</li><li class="hosName">' + dcDetails.hosName + '</li></ul>';

}
/*doctor_end*/


/*topic_begin*/
function topicInit(data) {
    //TZinfos: 通知
    var topicDetails = data.TZinfos[0];
    var topicsWrap = document.getElementById('topic');
    topicsWrap.innerHTML = '<p class="content">' + topicDetails.TZContent + '</p><div class="footTxt">' + '<p class="details">' + topicDetails.TZFoot + '</p><p class="time">' + topicDetails.TZTime + '</p></div>';
}

/*topic_end*/