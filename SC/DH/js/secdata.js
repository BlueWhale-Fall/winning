/*data*/
var nurseUrl = "data/worklist.json"; /*备忘录*/
var noteUrl = "data/submit.json"; /*备忘录*/
var innerspeed = 4500; /*行内翻转*/
var pagespeed = 9000; /*翻页间隔*/
var maxNum = 12; /*一页中护理最大条数*/
if (BQDM !== '') {
    dataInit();
}

function dataInit() {
    $.ajax({
        url: nurseUrl,
        type: "GET",
        dataType: "json",
        data: {
            bqdm: BQDM
        },
        error: function () {
            alert("排班数据加载错误");
        },
        success: function (data) {
            document.getElementById('loadWrap').style.opacity = 0;
            document.getElementById('loadWrap').style.zIndex = -1;
            secdata(data);
            for (var i = 0; i < data.HLInfos.length; i++) {
                marqueen('#xmarquee' + i);
            }
            bwl(data, 'footer .worknote', 'nursenote', noteUrl);
        }
    });
}

/*content*/
function secdata(data) {
    /*titles*/
    var tt = '';
    var ttclass = '';
    for (var t = 0, tlen = data.HLTitles.length; t < tlen; t++) {
        t < 2 ? ttclass = 'listinfo tt160' : ttclass = 'listinfo tt300';
        if (t === tlen - 1) {
            ttclass = 'listinfo tt360';
        }
        tt += '<li class="' + ttclass + '">' + data.HLTitles[t].title + '</li>';
    }
    var tlist = document.createElement('ul');
    tlist.classList = 'lists';
    tlist.innerHTML = tt;
    var tnav = document.getElementsByTagName('nav').item(0);
    tnav.appendChild(tlist);

    /*content*/

    var elicontent = '';
    var listlen = data.HLInfos.length;
    for (var i = 0; i < listlen; i++) {
        var lists = '';
        /*护理栏前2项*/
        var list0_2 = [];
        list0_2 = [data.HLInfos[i].HSName, data.HLInfos[i].HSDJ, data.HLInfos[i].TJDJ];

        for (var z = 0; z < 2; z++) {
            lists += '<li class="listinfo">' + list0_2[z] + '</li>';
        }

        /*护理栏3-7项*/
        var careInfos = data.HLInfos[i].RWInfos;
        for (var j = 0, carelen = careInfos.length; j < carelen; j++) {
            var cwcont = '';
            var cwlist = '';
            for (var k = 0, cwlen = careInfos[j].CWInfos.length; k < cwlen; k++) {
                /*循环床号*/
                cwlist += '<li><span class="num">' + careInfos[j].CWInfos[k].CH + '</span></li>';
            }
            lists += '<li class="listinfo"><div class="slide"><ul class="infoList">' + cwlist + '</ul></div></li>';
        }

        /*护理栏最后一项*/
        lists += '<li id="xmarquee' + i + '" class="listinfo xMarquee"><ul><li>' + data.HLInfos[i].BZInfos + '</li></ul></li>';
        /*wrap*/
        elicontent += '<li class="linelist"><ul class="lists">' + lists + '</ul></li>';
    }
    var el = document.createElement('ul');
    var details = document.getElementsByClassName('details').item(0);

    el.innerHTML = elicontent;
    el.className = 'infoList';
    details.appendChild(el);

    /*床号溢出*/
    $('.listinfo').slide({
        mainCell: '.slide ul',
        autoPage: true,
        effect: "left",
        autoPlay: true,
        scroll: 5,
        vis: 5,
        mouseOverStop: false,
        interTime: innerspeed
    });

    /*分页*/
    jQuery(".txtScroll-top").slide({
        titCell: "#page",
        mainCell: ".details>ul",
        autoPage: true,
        effect: "top",
        autoPlay: true,
        vis: maxNum,
        scroll: maxNum,
        interTime: pagespeed,
        trigger: 'click'
    });

    var workgroup = Math.ceil(listlen / maxNum);
    if (listlen > maxNum) {
        for (var i = 1; i < workgroup + 1; i++) {
            var myLi = '#page li:nth-child(' + i + ')';
            $(myLi).html('第' + i + '页');
        }
        //change position of funcbtn
        $('.funcbtn').css('right', 81 * (workgroup + 1) + 'px');
    } else {
        var myLi = '#page li:nth-child(1)';
        $(myLi).html('第1页');
        $('.funcbtn').css('right', '150px');
    }
}