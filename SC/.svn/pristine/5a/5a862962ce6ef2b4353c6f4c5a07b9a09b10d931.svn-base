var myurl = 'data/overview.json',
    dataurl = 'data/data.json',
    old_index;

/*护理内容box*/
var movemark = 0; //carebox 移动tag
var postag = 0; //carebox 或超出下边界

/*图表方法*/
var echart = {
    /*
     * 填图表数据数组
     * @param chartdata {object} ajax请求返回的数据
     * @param legendArr {Array} legend空数组
     * @param seriesdata {Array} series空数组
     * @author 杨玉青 2017/06/10
     * */
    chartsdata: function (chartdata, legendArr, seriesdata) {
        /*饼图颜色数组*/
        var colorArr = ['#588FF8', '#76DDFB', '#DBECF8', '#FFC04A', '#FF9788', '#7EE85D', '#FF88C7', 'FB7600', '#588FF8', '#76DDFB'];

        for (var i = 0; i < chartdata.length; i++) {
            var seriesname = chartdata[i].BQMC.slice(0, 2);
            legendArr.push(seriesname);
            seriesdata.push({
                value: chartdata[i].RS,
                name: seriesname,
                itemStyle: {
                    normal: {
                        color: colorArr[i]
                    }
                }
            });
        }
    },
    /*
     * 填图表数据数组
     * @param data {object} ajax请求返回的数据
     * @param left {string} pie图标题偏移量
     * @param id {string} pie图渲染的dom
     * @author 杨玉青 2017/06/10
     * */
    pieChart: function (data, left, id) {
        var seriesdata = [],
            legendArr = [],
            legendwidth = 0,
            legendleft = '',
            piedata = data.BQRSInfos;
        /*循环*/
        this.chartsdata(piedata, legendArr, seriesdata);

        if (piedata.length < 2) {
            legendwidth = 100;
            legendleft = '45%';
        } else if (piedata.length < 6) {
            legendwidth = 180;
            legendleft = '25%';
        } else if (piedata.length < 8) {
            legendwidth = 220;
            legendleft = '20%';
        } else if (piedata.length < 12) {
            legendwidth = 295;
            legendleft = '0%';
        }

        var myChart = echarts.init(document.getElementById(id));

        var option = {
            title: {
                left: left,
                text: data.RWMC,
                textStyle: {
                    color: '#fff',
                    fontSize: 22,
                    fontWeight: 'normal'
                },
                textAlign: 'left'
            },
            tooltip: {
                trigger: 'item',
                formatter: "{a} <br/>{b}: {c}人 ({d}%)"
            },
            legend: {
                width: legendwidth,
                left: legendleft,
                bottom: '1%',
                itemWidth: 8,
                itemHeight: 8,
                textStyle: {
                    color: '#999',
                    fontSize: 13
                },
                data: legendArr
            },
            series: [{
                name: '病人分布',
                type: 'pie',
                center: ['50%', '43%'],
                radius: ['27%', '56%'],
                avoidLabelOverlap: false,
                label: {
                    normal: {
                        show: true,
                        position: 'outside',
                        formatter: '{d}%'
                    },
                    emphasis: {
                        show: true,
                        textStyle: {
                            fontSize: '15',
                            fontWeight: 'normal'
                        }
                    }
                },
                labelLine: {
                    normal: {
                        show: true,
                        length: 10,
                        length2: 10
                    }
                },
                data: seriesdata
            }]
        }

        myChart.setOption(option);
    },
    /*
     * 获取病区名称字符串并做处理
     * @param data {object} ajax请求返回的数据
     * @param index {number} 循环体中的下标
     * @author 王雅丽 2017/06/13
     * */
    barChart: function (index, data) {
        if (old_index === index) {
            return;
        }
        old_index = index;
        var text = data[index].RWMC;
        var seriesData = [];
        var xAxisData = [];
        var datum = data[index].BQRSInfos;
        for (var i = 0; i < datum.length; i++) {
            seriesData.push(datum[i].RS);
            xAxisData.push(datum[i].BQMC.slice(0, 2))
        }
        var echartDom = document.getElementById('allprofiles-echarts');
        echartDom.innerHTML = '';
        var myChart = echarts.init(echartDom);
        var option = {
            title: {
                text: text + '病人分布图',
                left: 'center',
                top: 10,
                textStyle: {
                    color: '#fff',
                    fontSize: 28,
                    fontWeight: 'normal'
                }
            },
            tooltip: {
                position: 'top',
                formatter: '{c}',
                backgroundColor: ' #2F3041',
                padding: [10, 40, 10, 40]
            },
            grid: {
                top: '20%',
                left: '5%',
                right: '7%',
                bottom: '7%'
            },
            xAxis: {
                type: 'category',
                axisLine: {
                    show: false
                },
                axisTick: {
                    show: false
                },
                axisLabel: {
                    margin: 20,
                    textStyle: {
                        fontSize: 16,
                        color: 'rgba(255, 255, 255, 0.6)'
                    }
                },
                data: xAxisData
            },
            yAxis: {
                splitLine: {
                    show: false
                },
                axisLine: {
                    show: false
                },
                axisTick: {
                    show: false
                },
                axisLabel: {
                    margin: 20,
                    textStyle: {
                        fontSize: 14,
                        color: 'rgba(255, 255, 255, 0.6)'
                    }
                },
                type: 'value'
            },
            series: [
                {
                    name: '病人分布',
                    type: 'bar',
                    barCategoryGap: '5%',
                    itemStyle: {
                        normal: {
                            color: function (params) {
                                // build a color map as your need.
                                var barColors = ['#FFF440', '#FFE43B', '#FFD936', '#FFC830', '#FFB92B', '#FFA724', '#FF961F', '#FF871A', '#FF7714', '#FF650E', '#FF5508', '#FF4803', '#FF3D03', '#FF3C07', '#FF3205', '#FF2503'];
                                return barColors[params.dataIndex]
                            }
                        },
                        emphasis: {
                            barBorderWidth: 1,
                            shadowBlur: 8,
                            shadowOffsetX: 4,
                            shadowOffsetY: 2,
                            shadowColor: 'rgba(0,0,0,0.5)'
                        }
                    },
                    data: seriesData
                }
            ]
        };
        myChart.setOption(option);
    }
};
/*初始化*/
var pageinit = {
    init: function () {
        method.newDay();
        method.load();
    },
    /*
     * pie图bar图数据初始化
     * @param elements {object} jquery对象
     * @param RWXH {number} 判断页面的参数
     * @author 杨玉青 2017/06/14
     * */
    profileInit: function (elements, RWXH) {
        $.ajax({
            url: dataurl,
            type: "GET",
            dataType: "json",
            data: {
                rwxh: RWXH
            },
            error: function () {
                alert("数据加载错误");
            },
            success: function (response) {
                $('#loadWrap').css({'opacity': 0, 'zIndex': -1});
                if (RWXH === 2) {
                    /*全院病人分布*/
                    echart.pieChart(response.RWInfos[6], '33%', 'nursing');
                    /*今日入院分布*/
                    echart.pieChart(response.RWInfos[7], '22%', 'crisis');
                }
                data = response.RWInfos;
                method.renderDom(elements, data);
                echart.barChart(0, data);
                method.profileClick(elements, data);

            }
        });
    },
    /*
     * 初始化病区一览页面
     * @author 杨玉青 2017/06/13
     * */
    personnelInit: function () {
        $.ajax({
            url: myurl,
            type: "POST",
            dataType: "json",
            error: function () {
                alert("数据加载错误");
            },
            success: function (data) {
                $('#loadWrap').css({'opacity': 0, 'zIndex': -1});
                method.personnel(data);
            }
        });
    },
};
/*方法*/
var method = {
    /*
     * 获取当日时间 格式: XXXX-XX-XX 星期X
     * @author 杨玉青 2017/06/13
     * */
    newDay: function () {
        var date = new Date();
        year = date.getFullYear();
        mouth = date.getMonth() + 1;
        day = date.getDate();
        weekArr = ['星期日', '星期一', '星期二', '星期三', '星期四', '星期五', '星期六'];
        week = weekArr[date.getDay()];
        datehtml = year + '-' + mouth + '-' + day + ' ' + week;
        $(".datehtml").html(datehtml);
    },
    /*
     * 获取病区名称字符串并做处理
     * @param data {object} 需要合并的科室名称对象
     * @param i {number} 循环体中的下标
     * @return KSName {string} 科室名称字符串
     * @author 杨玉青 2017/06/13
     * */
    getKSName: function (data, i) {
        var KSName = '';
        for (var x = 0; x < data[i].KSInfos.length; x++) {
            KSName += data[i].KSInfos[x].KSMC + '、'
        }
        KSName = KSName.substring(0, KSName.length - 1)
        return KSName;
    },
    /*
     * 渲染病区一览页面
     * @param data {object} ajax请求返回的字符串对象
     * @author 杨玉青 2017/06/13
     * */
    personnel: function (data) {
        var loop = 5, //循环次数
            intertime = 30, //自动翻页时间
            num = intertime,
            personneldata = data.BQInfos,
            length = personneldata.length,
            BQulHtml = '';
        if (length > 10) {
            var loopNum = parseInt(length / 10),
                remainder = length % 10;
            //整页循环
            for (var i = 0; i < loopNum; i++) {
                var BQliHtml = '';
                j = 10 * i; //j的初始值
                btmark = (10 - 1) * (i + 1) + i + 1; //下标最大值
                for (j; j < btmark; j++) {
                    var KSName = this.getKSName(personneldata, j);
                    //内容循环
                    if (personneldata[j].HSInfos) {
                        var HSInfos = JSON.stringify(personneldata[j].HSInfos).replace(/\"/g, "&#34;");
                    }
                    if (personneldata[j].HSInfos) {
                        BQliHtml += '<li><div><h1>' + personneldata[j].BQMC + '</h1><div class="sick"><span>' + personneldata[j].NURSERS + '人</span><span>' + personneldata[j].CWNum + '床</span></div><div class="paramedic"><div onclick="method.showNurse(event,\'' + HSInfos + '\')"  style="cursor: pointer">在岗：<span class="atwork">' + personneldata[j].ZGRS + '人</span></div><div>护患比：<span class="atwork">' + personneldata[j].SCALE + '</span></div></div><h2>' + KSName + '</h2></div></li>';
                    } else {
                        BQliHtml += '<li><div><h1>' + personneldata[j].BQMC + '</h1><div class="sick"><span>' + personneldata[j].NURSERS + '人</span><span>' + personneldata[j].CWNum + '床</span></div><div class="paramedic"><div onclick="method.showNurse(event,\''  + HSInfos + '\')"  style="cursor: pointer">在岗：<span class="atwork">' + personneldata[j].ZGRS + '人</span></div><div>护患比：<span class="atwork">' + personneldata[j].SCALE + '</span></div></div><h2>' + KSName + '</h2></div></li>';
                    }
                }
                BQulHtml += '<ul>' + BQliHtml + '</ul>';
            }
            //余数循环
            if (remainder) {
                var btmark = length - remainder,
                    lastBQli = '';
                for (var k = btmark; k < length; k++) {
                    var KSName = this.getKSName(personneldata, k);
                    if (personneldata[k].HSInfos) {
                        var HSInfos = JSON.stringify(personneldata[k].HSInfos).replace(/\"/g, "&#34;");
                    }
                    if (personneldata[k].HSInfos) {
                        BQliHtml += '<li><div><h1>' + personneldata[k].BQMC + '</h1><div class="sick"><span>' + personneldata[k].NURSERS + '人</span><span>' + personneldata[k].CWNum + '床</span></div><div class="paramedic"><div onclick="method.showNurse(event,\'' + HSInfos + '\')"  style="cursor: pointer">在岗：<span class="atwork">' + personneldata[k].ZGRS + '人</span></div><div>护患比：<span class="atwork">' + personneldata[k].SCALE + '</span></div></div><h2>' + KSName + '</h2></div></li>';
                    } else {
                        BQliHtml += '<li><div><h1>' + personneldata[k].BQMC + '</h1><div class="sick"><span>' + personneldata[k].NURSERS + '人</span><span>' + personneldata[k].CWNum + '床</span></div><div class="paramedic"><div>在岗：<span class="atwork">' + personneldata[k].ZGRS + '人</span></div><div>护患比：<span class="atwork">' + personneldata[k].SCALE + '</span></div></div><h2>' + KSName + '</h2></div></li>';
                    }
                }
                BQulHtml += '<ul>' + lastBQli + '</ul>';
            }
            $(".bd>div").html(BQulHtml);
            $(".warddetail").slide({
                titCell: ".hd ul",
                mainCell: ".bd>div",
                autoPage: true,
                effect: "fade",
                autoPlay: true,
                scroll: 1,
                vis: 1,
                interTime: intertime * 1000, //动画延迟 单位ms
                mouseOverStop: false,
                trigger: "click",
                delayTime: 1800
            });
            /*循环规定次数后刷新页面*/
            datatime = 2 * intertime * loop;
            setInterval(function () {
                window.location.reload();
            }, datatime * 1000);

            /*翻页按钮*/
            for (var i = 1; i < loopNum + 2; i++) {
                var myLi = '.hd li:nth-child(' + i + ')';
                $(myLi).html('第' + i + '屏');
            }
            /*秒数自动变化*/
            setInterval(settime, 1000);
            $('.autopage .finaltime').html(num + 'S');

            function settime() {
                if (num >= 1) {
                    num--;
                } else {
                    num = intertime - 1;
                }
                $('.hd li').click(function () {
                    num = intertime;
                });
                $('.autopage .finaltime').html(num + 'S');
            }
        } else {
            $('.autopage').html('')
            var BQliHtml = '';
            for (var i = 0; i < length; i++) {
                var KSName = this.getKSName(personneldata, i);
                if (personneldata[i].HSInfos) {
                    var HSInfos = JSON.stringify(personneldata[i].HSInfos).replace(/\"/g, "&#34;");
                }
                if (personneldata[i].HSInfos) {
                    BQliHtml += '<li><div><h1>' + personneldata[i].BQMC + '</h1><div class="sick"><span>' + personneldata[i].NURSERS + '人</span><span>' + personneldata[i].CWNum + '床</span></div><div class="paramedic"><div onclick="method.showNurse(event,\'' + HSInfos + '\')"  style="cursor: pointer">在岗：<span class="atwork">' + personneldata[i].ZGRS + '人</span></div><div>护患比：<span class="atwork">' + personneldata[i].SCALE + '</span></div></div><h2>' + KSName + '</h2></div></li>';
                } else {
                    BQliHtml += '<li><div><h1>' + personneldata[i].BQMC + '</h1><div class="sick"><span>' + personneldata[i].NURSERS + '人</span><span>' + personneldata[i].CWNum + '床</span></div><div class="paramedic"><div>在岗：<span class="atwork">' + personneldata[i].ZGRS + '人</span></div><div>护患比：<span class="atwork">' + personneldata[i].SCALE + '</span></div></div><h2>' + KSName + '</h2></div></li>';
                }
            }
            BQulHtml = '<div><ul>' + BQliHtml + '</ul></div>';
            $(".bd>div").html(BQulHtml);
        }
    },
    /*鼠标移动更改carebox位置*/
    showpos: function (event) {
        var clientWidth = document.documentElement.clientWidth;
        var clientHeight = document.documentElement.clientHeight;
        let clientX = event.clientX;
        let clientY = event.clientY;
        var horizontal_direction = clientWidth / 2 > clientX ? 'left' : 'right';
        var opposite_horizontal_direction = clientWidth / 2 > clientX ? 'right' : 'left';
        var vertical_direction = clientHeight / 2 > clientY ? 'top' : 'bottom';
        var opposite_vertical_direction = clientHeight / 2 > clientY ? 'bottom' : 'top';

        // 左右方块位置
        $('#carelist').css(opposite_horizontal_direction, '');
        $('#carelist').css(horizontal_direction, (horizontal_direction === 'left' ? clientX : clientWidth - clientX) - 40 + 'px');

        // 上下箭头显示切换
        if (vertical_direction === 'top') {
            $('#carelist').css('transform-origin', '0 100%');
            $('.ttop').show();
            $('.tbottom').hide();
        } else {
            $('#carelist').css('transform-origin', '0 0');
            $('.ttop').hide();
            $('.tbottom').show();
        }

        // 箭头位置
        $('.triangle').css(opposite_horizontal_direction, 'auto');
        $('.triangle2').css(opposite_horizontal_direction, 'auto');
        $('.triangle3').css(opposite_horizontal_direction, 'auto');
        $('.triangle4').css(opposite_horizontal_direction, 'auto');
        $('.triangle').css(horizontal_direction, '38px');
        $('.triangle2').css(horizontal_direction, '40px');
        $('.triangle3').css(horizontal_direction, '38px');
        $('.triangle4').css(horizontal_direction, '40px');

        // 上下方块位置
        $('#carelist').css(opposite_vertical_direction, 'auto');
        $('#carelist').css(vertical_direction, (vertical_direction === 'top' ? clientY : clientHeight - clientY) + 20 + 'px');
    },
    showNurse: function (event, data) {
        var data = JSON.parse(data);
        if (data.length <= 0) {
            return;
        }
        var carehtml = '<div class="ttop"><span class="triangle"></span><span class="triangle2"></span></div><div class="tbottom"><span class="triangle3"></span><span class="triangle4"></span></div><div class="carebox scroller"><a class="close"  title="关闭" onclick="method.triggerbox(1,\'carelist\')"></a>';
        for (var i = 1; i <= 2; i++) {
            carehtml += '<table border="1" class="table' + i + '"><thead>'+
            '<td>序号</td>' +
            '<td>护士姓名</td>' +
            '<td>护士层级</td>' +
            '</thead>' +
            '<tbody class="tbody1">' +
            '</tbody>';
            for (var j = 1; j <= 12; j++) {
                carehtml +='<tr>' +
                    '<td>' + ( j + ((i - 1) * 12 )) + '</td>' +
                    '<td>' + (method.tableData((j + ((i - 1) * 12)-1), data, 'HSName') || '') + '</td>' +
                    '<td>' + (method.tableData((j + ((i - 1) * 12)-1), data, 'HSDJ') || '') + '</td>' +
                    '</tr>';
            }
            carehtml += '</table>';
        }
        $('#carelist').html(carehtml);
        var carebox = document.getElementById('carelist');
        if (carebox.style.opacity == 1) {
            this.triggerbox(1, "carelist");
            movemark = 0;
        } else {
            this.triggerbox(0, "carelist");

            movemark = 1;
        }
        if (postag == 1) {
            //三角向下
            $('.tbottom').eq(0).css('display', 'block');
            $('.ttop').eq(0).css('display', 'none');
        } else {
            //三角向下
            $('.tbottom').eq(0).css('display', 'none');
            $('.ttop').eq(0).css('display', 'block');
        }

        this.showpos(event);
    },
    tableData: function (num, data, mark) {
        for (var i = 0; i < data.length; i++) {
            if (i == num) {
                if (mark == 'HSName') {
                    return data[i].HSName;
                }else if(mark == 'HSDJ'){
                    return data[i].HSDJ;
                }else {
                    return '';
                }
            }
        }

    },
    triggerbox: function (tag, boxname) {
        var box = document.getElementById(boxname);
        var mask = document.getElementsByClassName('darkmask')[0];
        if (tag) {
            box.style.transform = 'scale(.75)';
            box.style.opacity = 0;
            box.style.zIndex = -1;
            mask.style.zIndex = -1;
            mask.style.opacity = 0;
            movemark = 0;
            outTag = 0;
            if (boxname == 'countDetail') {
                box.style.display = 'none';
                box.style.removeProperty('left')
            }
            if (boxname !== 'carelist') {
                setTimeout(function () {
                    document.body.removeChild(box);
                }, 350);
            }
        } else {

            box.style.transform = 'scale(1)';
            box.style.opacity = 1;
            box.style.zIndex = 100001;
            mask.style.zIndex = 10000;
            mask.style.opacity = 1;
            if (boxname == 'countDetail') {
                box.style.display = 'block';
                mask.style.opacity = 0;
            }
            if (boxname === 'carelist') {
                mask.style.opacity = 0;
            }
            movemark = 1;
            outTag = 1;
        }

        /*弹窗外关闭*/
        var _bwrap = $('#' + boxname);
        $('.darkmask').click(function (e) {
            if (!_bwrap.is(e.target) && _bwrap.has(e.target).length === 0) {
                var bopacity = _bwrap.css('opacity');
                if (outTag && bopacity == 1) {
                    method.triggerbox(1, boxname);
                    box.style.removeProperty('left')
                }
            }
        });
    },
    refresh: function () {
        window.location.reload();
    },
    load: function () {
        var ms = 300000;
        setInterval(this.refresh, ms);
    },
    /*
     * 渲染页面切换按钮
     * @param data {object} ajax请求返回的数据
     * @param elements {object} jquery获取的dom对象
     * @author 王雅丽 2017/06/13
    * */
    renderDom: function (elements, data) {
        elements.slice(0, data.length).each(function (index, element) {
            var dom = $(element);
            dom.removeClass('hidden');
            var datum = data[index];
            dom.find('.purnum').html(datum.HZRS);
            dom.find('.title').html(datum.RWMC);
        });
    },
    /*
     * 点击切换不同数据并渲染
     * @param data {object} ajax请求返回的数据
     * @param elements {object} jquery获取的dom对象
     * @author 王雅丽 2017/06/13
     * */
    profileClick: function (elements, data) {
        elements.each(function (index, dom) {
            dom.addEventListener('click', function () {
                $(this).addClass('current').siblings().removeClass('current');
                echart.barChart(index, data);
            });
        });
    }
}