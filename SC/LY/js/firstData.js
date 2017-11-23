var allUrl = "js/data.json";
var BQDM = "0001"; /*病区代码*/
var interTime = 5000; /*翻页间隔时间 单位ms*/

function indexInit() {
	$.ajax({
		url: allUrl,
		type: "GET",
		dataType: "json",
		data: {
			bqdm: BQDM
		},
		error: function() {
			alert("数据加载错误");
		},
		success: function(data) {
			//title
			titleInit(data);
			//手术
			operInit(data);
			//出院
			checkInit(data, 2, '#cOSlide1', '#cOnums_1');
			checkInit(data, 0, '#cOSlide2', '#cOnums_2');
			checkInit(data, 1, '#cOSlide3', '#cOnums_3');
			//测血糖
			bsInit(data);
			//各类导管
			conInit(data);
			//测血压
			bpreInit(data);
			//24H出入量
			amountInit(data);
			//各类特殊治疗
			spcInit(data);
			//药敏
			algInit(data);
			//animation
			jQuery(".text-left").slide({
				mainCell: ".slide",
				effect: "leftLoop",
				autoPlay: true,
				interTime: interTime,
				mouseOverStop: false
			});
			jQuery(".text-top").slide({
				mainCell: ".slide",
				effect: "topLoop",
				autoPlay: true,
				interTime: interTime,
				mouseOverStop: false
			});
		},
        complete: function () {
            XHR = null;
            $('#loadWrap').css({'opacity': 0,'z-index': -1});
        }
	});
}

/*titleInit_begin*/

function titleInit(data) {

	$('.dataTitle span')[0].innerHTML = data.FZinfos[7].FZName; //出院
	$('.dataTitle span')[1].innerHTML = data.SSinfos[0].Name; //手术
	$('.dataTitle span')[2].innerHTML = data.FZinfos[1].FZName; //测血糖
	$('.dataTitle span')[3].innerHTML = data.FZinfos[2].FZName; //测血压
	$('.dataTitle span')[4].innerHTML = data.YSinfos[0].Name; //值班护士
	$('.dataTitle span')[5].innerHTML = data.FZinfos[3].FZName; //特殊治疗
	$('.dataTitle span')[6].innerHTML = data.FZinfos[4].FZName; //药敏
	$('.dataTitle span')[7].innerHTML = data.FZinfos[5].FZName; //各类导管
	$('.dataTitle span')[8].innerHTML = data.TZinfos[0].Name; //通知
	$('.outInTitle span')[0].innerHTML = data.FZinfos[8].FZName; //24H出入量

}
/*titleInit_end*/

/*bloodSugar_begin*/
function bsInit(data) {
	//FZPX:2 测血糖
	var FZPX = 2;
	var maxNum;
	var bsDetails = data.FZinfos[FZPX - 1];
	var fzLength = bsDetails.RWinfos.length;
	var length = [];
	var mySlide = [];
	var ids = ['kf', 'bf_2h', 'af_2h', 'pm9', 'pm10', 'am3', 'bs_q2h', 'bs_q4h', 'bs_q6h', 'bs_q8h'];
	//RW_length
	for(var i = 0; i < fzLength; i++) {
		length.push(bsDetails.RWinfos[i].CWinfos.length);
		mySlide.push('#bsSlide' + (i + 1));
	}
	//目录 top
	var myTitle = '';
	for(var i = 0; i < 6; i++) {
		var RWName = bsDetails.RWinfos[i].RWName;
		if(/.*[\u4e00-\u9fa5]+.*$/.test(RWName)) {
			if(RWName.length > 3) {
				//溢出+br断行
				RWName = RWName.substr(0, 2) + '<br>' + RWName.substr(2, RWName.length);
				myTitle += '<li class="title border-right fontover">' + RWName + '</li>';
			} else {
				myTitle += '<li class="title border-right">' + RWName + '</li>';
			}
		} else {
			myTitle += '<li class="title border-right">' + RWName + '</li>';
		}
	}
	$('.bloodSugar .secTitle').html(myTitle);

	//Q2-8H
	var qxhmyTitle = '';
	for(var i = 6; i < bsDetails.RWinfos.length; i++) {
		qxhmyTitle += '<li class="qhNum border-right border-bottom">' + bsDetails.RWinfos[i].RWName + '</li>';

	}

	$('#QXH .secTitle').html(qxhmyTitle);

	//data
	for(var i = 0; i < fzLength; i++) {
		var myHtml = '';
		var myLi = '';
		var myId = '#' + ids[i];
		var RWXH = bsDetails.RWinfos[i].RWXH;
		if(i < 6) {
			//FZ_data 0-5 
			maxNum = 2;
			if(length[i] > maxNum) {
				overflow(data, FZPX, i + 1, maxNum, myId, 'text-left', mySlide[i], 'timeList');
			} else {
				for(var j = 0; j < length[i]; j++) {
					var CWDM = bsDetails.RWinfos[i].CWinfos[j].CWDM;
					myLi += '<li><span class="num" data-search="' + RWXH + '-' + CWDM + '" onclick="showbox(this)">' + CWDM + '</span></li>';
				}
				myHtml = '<div class="slide_section"><ul class="timeList">' + myLi + '</ul></div>';
				$(mySlide[i]).html(myHtml);
			}
		} else {
			//FZ_data 6-9
			maxNum = 4;
			if(length[i] > maxNum) {
				//溢出分页
				overflow(data, FZPX, i + 1, maxNum, myId, 'text-top', mySlide[i], 'qxhList');
			} else {
				for(var k = 0; k < length[i]; k++) {
					var CWDM = bsDetails.RWinfos[i].CWinfos[k].CWDM;
					myLi += '<li><span class="num" data-search="' + RWXH + '-' + CWDM + '" onclick="showbox(this)">' + CWDM + '</span></li>';
				}
				myHtml = '<div class="slide_section"><ul class="qxhList">' + myLi + '</ul></div>';
				$(mySlide[i]).html(myHtml);
			}
		}
	}
}

/*bloodSugar_end*/

/*bPressure_begin*/

function bpreInit(data) {
	//FZPX:3 测血压
	var FZPX = 3;
	var maxNum;
	var bpDetails = data.FZinfos[FZPX - 1];
	var fzLength = bpDetails.RWinfos.length;
	var length = [];
	var mySlide = [];
	var ids = ['bp_qd', 'bp_bid', 'bp_q2h', 'bp_q4h', 'bp_q6h', 'bp_q8h', 'heartCare', 'order'];
	//RW_len
	for(var i = 0; i < fzLength; i++) {
		length.push(bpDetails.RWinfos[i].CWinfos.length);
		mySlide.push('#bpSlide' + (i + 1));
	}

	//目录
	var topTitle = ''; //top
	for(var i = 0; i < 6; i++) {
		topTitle += '<li class="bpressName border-right">' + bpDetails.RWinfos[i].RWName + '</li>';

	}
	$('.bloodPressure .secTitle').html(topTitle);

	var leftTitle = '';
	var rightTitle = '';
	leftTitle = bpDetails.RWinfos[6].RWName;
	$('#heartCare h2').html(leftTitle);

	//data
	for(var i = 0; i < fzLength; i++) {
		var myHtml = '';
		var myLi = '';
		var myId = '#' + ids[i];
		var RWXH = bpDetails.RWinfos[i].RWXH;
		if(i < 6) {
			//FZ_data 0-5 
			maxNum = 2;
			if(length[i] > maxNum) {
				//溢出分页
				/*overflow(FZPX,RWPX,max,aniId,aniName,conId)*/
				overflow(data, FZPX, i + 1, 2, myId, 'text-left', mySlide[i], 'bpressList');
			} else {
				for(var j = 0; j < length[i]; j++) {
					var CWDM = bpDetails.RWinfos[i].CWinfos[j].CWDM;
					myLi += '<li><span class="num" data-search="' + RWXH + '-' + CWDM + '" onclick="showbox(this)">' + CWDM + '</span></li>';
				}
				myHtml = '<div class="slide_section"><ul class="bpressList">' + myLi + '</ul></div>';
				$(mySlide[i]).html(myHtml);
			}
		} else {
			//FZ_data 6
			maxNum = 4;
			if(length[i] > maxNum) {
				//溢出分页
				overflow(data, FZPX, i + 1, 4, myId, 'text-left', mySlide[i], 'htorderList');
			} else {
				for(var k = 0; k < length[i]; k++) {
					var CWDM = bpDetails.RWinfos[i].CWinfos[k].CWDM;
					myLi += '<li class="floatL"><span class="num" data-search="' + RWXH + '-' + CWDM + '" onclick="showbox(this)">' + CWDM + '</span></li>';
				}
				myHtml = '<div class="slide_section"><ul class="htorderList">' + myLi + '</ul></div>';
				$(mySlide[i]).html(myHtml);
			}
		}
	}

	/*预约检查*/
	/*YYJCinfos*/
	var yyjcDetails = data.YYJCinfos[0];
	var infos = yyjcDetails.Infos;
	var length = infos.length;
	var maxNum = 4; //最大显示条数
	var myUl = '';
	var myHtml = '';
	var RWXH = yyjcDetails.RWXH;
	//目录
	var myTitle = '';
	leftTitle = yyjcDetails.RWName;

	$('#order h2').html(leftTitle);

	//data
	if(length > maxNum) {
		//内容溢出分页
		operOverflow(data, '#order', '#bpSlide8', maxNum, 3); //传参num 标识预约首页(3)和预约详情页(4)
	} else {
		for(var k = 0; k < length; k++) {
			myLi += '<li class="floatL"><span class="num" data-search="' + RWXH + '-' + infos[k].CWDM + '" onclick="showbox(this)">' + infos[k].CWDM + '</span></li>';
		}
		myHtml = '<div class="slide_section"><ul class="htorderList">' + myLi + '</ul></div>';
		$('#bpSlide8').html(myHtml);
	}
}

/*bPressure_end*/

/*24H_begin*/
function amountInit(data) {
	//FZPX:9 24H出入量
	var FZPX = 9;
	var maxNum = 2;
	var bpDetails = data.FZinfos[FZPX - 1];
	var fzLength = bpDetails.RWinfos.length;
	var length = [];
	var mySlide = [];
	var ids = ['oa_in', 'oa_out', 'oa_urine'];
	//RW_len
	for(var i = 0; i < fzLength; i++) {
		length.push(bpDetails.RWinfos[i].CWinfos.length);
		mySlide.push('#oaSlide' + (i + 1));
	}

	//24H出入量
	var amountTitle = '';
	for(var i = 0; i < 3; i++) {
		amountTitle += '<li class="outInName border-right">' + bpDetails.RWinfos[i].RWName + '</li>'
	}
	$('.bloodPressure .amountTitle').html(amountTitle);

	//data
	for(var i = 0; i < fzLength; i++) {
		var myHtml = '';
		var myLi = '';
		var myId = '#' + ids[i];
		var RWXH = bpDetails.RWinfos[i].RWXH;
		if(length[i] > maxNum) {
			//溢出分页
			/*overflow(FZPX,RWPX,max,aniId,aniName,conId)*/
			overflow(data, FZPX, i + 1, 2, myId, 'text-left', mySlide[i], 'outInList');
		} else {
			for(var j = 0; j < length[i]; j++) {
				var CWDM = bpDetails.RWinfos[i].CWinfos[j].CWDM;
				myLi += '<li><span class="num" data-search="' + RWXH + '-' + CWDM + '" onclick="showbox(this)">' + CWDM + '</span></li>';
			}
			myHtml = '<div class="slide_section"><ul class="outInList">' + myLi + '</ul></div>';
			$(mySlide[i]).html(myHtml);
		}
	}
}

/*24H_end*/

/*special_begin*/

function spcInit(data) {
	//FZPX:4 特殊治疗
	var FZPX = 4;
	var maxNum = 5;
	var spcDetails = data.FZinfos[FZPX - 1];
	var fzLength = spcDetails.RWinfos.length - 1; //减去合并栏
	var length = [];
	var mySlide = [];
	var ids = ['zsRi', 'cnyy', 'whxx', 'wb', 'qy', 'fq', 'pg'];
	//RW_length
	for(var i = 0; i < fzLength; i++) {
		length.push(spcDetails.RWinfos[i].CWinfos.length);
		mySlide.push('#spSlide' + (i + 1));
	}
	var myTitle = '';
	//一级目录
	var firstTitle = '';
	for(var i = 0; i < 5; i++) {
		var RWName = spcDetails.RWinfos[i].RWName;
		var RWlast = spcDetails.RWinfos[fzLength].RWName;
		if(/.*[\u4e00-\u9fa5]+.*$/.test(RWName)) {
			if(RWName.length > 3) {
				//溢出+br断行
				RWName = RWName.substr(0, 2) + '<br>' + RWName.substr(2, RWName.length);
				firstTitle += '<li class="title border-right fontover">' + RWName + '</li>';
			} else {
				firstTitle += '<li class="title border-right">' + RWName + '</li>';
			}
		} else {
			firstTitle += '<li class="title border-right">' + RWName + '</li>';
		}
	}
	firstTitle += ' <li class="specialName border-right wash">' + RWlast + '</li>';
	$('.special .secTitle').html(firstTitle);
	//二级目录
	var secTitle = '';
	for(var i = fzLength - 2; i < fzLength; i++) {
		var RWName = spcDetails.RWinfos[i].RWName;
		secTitle += '<li class="secName border-bottom border-right">' + RWName + '</li>';
	}
	$('#cx .wash').html(secTitle);
	//data
	for(var i = 0; i < fzLength; i++) {
		var myHtml = '';
		var myLi = '';
		var myId = '#' + ids[i];
		var RWXH = spcDetails.RWinfos[i].RWXH;
		if(length[i] > maxNum) {
			//溢出分页
			overflow(data, FZPX, i + 1, maxNum, myId, 'text-left', mySlide[i], 'specialList');
		} else {
			for(var k = 0; k < length[i]; k++) {
				var CWDM = spcDetails.RWinfos[i].CWinfos[k].CWDM;
				myLi += '<li><span class="num" data-search="' + RWXH + '-' + CWDM + '" onclick="showbox(this)">' + CWDM + '</span></li>';
			}
			myHtml = '<div class="slide_section"><ul class="specialList">' + myLi + '</ul></div>';
			$(mySlide[i]).html(myHtml);
		}
	}
}

/*special_end*/

/*allergy_begin*/
function algInit(data) {
	//FZPX:5 药物敏感
	var FZPX = 5;
	var maxNum = 4;
	var alDetails = data.FZinfos[FZPX - 1];
	var fzLength = alDetails.RWinfos.length;
	var length = [];
	var mySlide = [];
	var ids = [];
	if(fzLength > 6) {
		fzLength = 6;
	}
	//RW_length
	var myTitle = '';
	for(var i = 0; i < fzLength; i++) {
		length.push(alDetails.RWinfos[i].CWinfos.length);
		mySlide.push('#alSlide' + (i + 1));
		ids.push('alName' + (i + 1));
		myTitle += '<li class="allerName border-right">' + alDetails.RWinfos[i].RWName + '</li>';
	}

	//目录
	$('.allergy .secTitle').html(myTitle);
	//wrap 
	var wrap = '';
	for(var i = 0; i < fzLength; i++) {
		wrap += '<div id="alName' + (i + 1) + '" class="border-bottom"><div id="alSlide' + (i + 1) + '" class="slide"></div></div>';
	}
	$('#allergy').html(wrap);

	//data
	for(var i = 0; i < fzLength; i++) {
		var myHtml = '';
		var myLi = '';
		var myId = '#' + ids[i];
		var RWXH = alDetails.RWinfos[i].RWXH;
		if(length[i] > maxNum) {
			//溢出分页
			overflow(data, FZPX, i + 1, maxNum, myId, 'text-top', mySlide[i], 'allergyList border-bottom border-top');
		} else {
			for(var k = 0; k < length[i]; k++) {
				var CWDM = alDetails.RWinfos[i].CWinfos[k].CWDM;
				myLi += '<li><span class="num" data-search="' + RWXH + '-' + CWDM + '" onclick="showbox(this)">' + CWDM + '</span></li>';
			}
			myHtml = '<div class="slide_section"><ul class="allergyList">' + myLi + '</ul></div>';
			$(mySlide[i]).html(myHtml);
		}
	}
}

/*allergy_end*/

/*conduit_begin*/
function conInit(data) {
	//FZPX:6 各类导管
	var FZPX = 6;
	var maxNum = 5;
	var conDetails = data.FZinfos[FZPX - 1];
	var fzLength = conDetails.RWinfos.length;
	var length = [];
	var mySlide = [];
	var ids = ['wg', 'ng', 'tg', 'fqiu', 'bdg', 'bcg', 'gccg', 'fqyl', 'fx', 'vsd', 'cvc', 'picc'];
	if(fzLength > 12) {
		fzLength = 12;
	}
	//RW_length
	for(var i = 0; i < fzLength; i++) {
		length.push(conDetails.RWinfos[i].CWinfos.length);
		mySlide.push('#conSlide' + (i + 1));
	}
	var myTitle = '';
	for(var i = 0; i < fzLength; i++) {
		var myHtml = '';
		var myLi = '';
		var myId = '#' + ids[i];
		var RWXH = conDetails.RWinfos[i].RWXH;
		if(length[i] > maxNum) {
			//溢出分页
			overflow(data, FZPX, i + 1, maxNum, myId, 'text-left', mySlide[i], 'conduitList');
		} else {
			for(var k = 0; k < length[i]; k++) {
				var CWDM = conDetails.RWinfos[i].CWinfos[k].CWDM;
				myLi += '<li><span class="num" data-search="' + RWXH + '-' + CWDM + '" onclick="showbox(this)">' + CWDM + '</span></li>';
			}
			myHtml = '<div class="slide_section"><ul class="conduitList">' + myLi + '</ul></div>';
			$(mySlide[i]).html(myHtml);
		}

		var RWName = conDetails.RWinfos[i].RWName;
		if(/.*[\u4e00-\u9fa5]+.*$/.test(RWName)) {
			if(RWName.length > 3) {
				//溢出+br断行
				RWName = RWName.substr(0, 2) + '<br>' + RWName.substr(2, RWName.length);
				myTitle += '<li class="condName border-right fontover">' + RWName + '</li>';
			} else {
				myTitle += '<li class="condName border-right">' + RWName + '</li>';
			}
		} else {
			myTitle += '<li class="condName border-right">' + RWName + '</li>';
		}
		//目录
		$('.conduit .secTitle').html(myTitle);
	}
}
/*conduit_end*/

/*checkOut_begin*/
function checkInit(data, RWPX, conId, aniId) {
	//FZPX:8  首页出院 
	var FZPX = 8;
	var checkDetails = data.FZinfos[7];
	var length = checkDetails.RWinfos[RWPX].CWinfos.length;
	var maxNum = 6;
	var myHtml = '';
	var myLi = '';
	var RWXH = checkDetails.RWinfos[RWPX].RWXH;

	//目录
	var day = data.DateWeek;
	day = parseInt(day.split(' ')[0].split('-')[2]);
	var str;
	switch(RWPX) {
		case 0:
			str = '日出院（下午）';
			$('.cOdetails p')[1].innerHTML = day + str;
			break;
		case 1:
			str = '日出院（上午）';
			day = day + 1;
			$('.cOdetails p')[2].innerHTML = day + str;
			break;
		case 2:
			str = '日出院（上午）';
			$('.cOdetails p')[0].innerHTML = day + str;
			break;
	}

	if(length > maxNum) {
		//溢出分页
		overflow(data, FZPX, RWPX + 1, maxNum, aniId, 'text-left', conId, 'numsList');
	} else {
		for(var i = 0; i < length; i++) {
			var CWDM = checkDetails.RWinfos[RWPX].CWinfos[i].CWDM;
			myLi += '<li><span class="num" data-search="' + RWXH + '-' + CWDM + '" onclick="showbox(this)">' + CWDM + '</span></li>';
		}
		myHtml = '<div class="slide_section"><ul class="numsList"' + myLi + '</ul></div>';
		$(conId).html(myHtml);
	}
}

/*checkOut_end*/

/*operation_begin*/

function operInit(data) {
	//FZPX:2 手术
	var operDetails = data.SSinfos[0];
	var infos = operDetails.Infos;
	var length = infos.length;
	var maxNum = 5; //最大显示条数
	var myUl = '';
	var myHtml = '';

	//目录
	var myTitle = '';
	myTitle = '<li class="border-right">' + operDetails.CWDM + '</li><li class="border-right">' + operDetails.SSName + '</li><li class="border-right">' + operDetails.GC + '</li><li>' + operDetails.TBJ + '</li>';

	$('.operation .secTitle').html(myTitle);

	//data
	if(length > maxNum) {
		//内容溢出分页
		operOverflow(data, '#operation', '#operSlide', maxNum, 1); //传参num 标识首页(1)和详情页(2)
	} else {

		for(var i = 0; i < length; i++) {
			var clClass = '';
			var deClass = '';
			//判断是否mark
			if(infos[i].GC === "1") {
				clClass = 'floatL clysis mark border-right';
			} else {
				clClass = 'floatL clysis border-right';
			}
			if(infos[i].TBJ === "1") {
				deClass = 'floatL defInstru mark';
			} else {
				deClass = 'floatL defInstru';
			}
			myUl += '<ul class="operList border-bottom"><li><ul class="operItem">' + '<li class="floatL border-right"><span class="num">' + infos[i].CWDM + '</span></li><li class="floatL operName border-right">' + infos[i].SSMC + '</li><li class="' + clClass + '"></li><li class="' + deClass + '"></li>' + '</ul></li></ul>';
			myHtml = '<div class="slide_section">' + myUl + '</div>';
		}
		$('#operSlide').html(myHtml);
	}
}
/*operation_end*/