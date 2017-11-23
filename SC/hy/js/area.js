var area = {
    zoomDisplayContainerElement: null,
    zoomListContainerElement: null,
    verticalContainerElement: null,
    arrowBox: null,
    zoomData: [],
    zoomUrl: '',
    currentZoom: null,
    lastTimeZoom: null,
    dataUrl: '',
    data: [],
    workListUrl: '',
    listUrl: '',
    workListUrlData: [],
    listData: [],
    bedsxhUrl: '',
    bedspyUrl: '',
    bedsData: [],
    pbedsurl: '',
    schartUrl: '',
    chartUrl: '',
    informationUrl: '',
    informationData: [],
    chartData: [],//表格数据
    _hours: 48, //时间刻度
    _splitNum: 12, /*生命体征分为12段*/
    _ssplitNum: 5, /*单曲线分段4段*/
    init: function (object) {
        if (typeof object === 'object') {
            this.setZoomDisplayContainerElement(object.zoomDisplayContainerElement || '.changeInput');
            this.setZoomListContainerElement(object.listContainer || '.changeUl');
            this.setVerticalContainerElement(object.verticalContainer || ['.inforTitle', '.contentTitle']);
            this.zoomUrl = object.zoomUrl;
            this.arrowBox = object.arrowBox;
            this.dataUrl = object.dataUrl;
            this.workListUrl = object.workListUrl;
            this.listUrl = object.listUrl;
            this.bedsxhUrl = object.bedsxhUrl;
            this.bedspyUrl = object.bedspyUrl;
            this.pbedsurl = object.pbedsurl;
            this.schartUrl = object.schartUrl;
            this.chartUrl = object.chartUrl;
            this.informationUrl = object.informationUrl;
        }
        this.getZoomData();
        this.dropList();
        this.newDay();
        this.vertical();
        setInterval(this.getZoomData.bind(this), 300000);
        setInterval(this.newDay.bind(this), 1000);
    },
    /**
     * 获取病区代码
     *
     * @return {Object} 病区代码
     */
    getZoomData: function () {
        //获取病区代码
        var _this = this;
        if (!this.zoomUrl) {
            return;
        }
        $.ajax(this.zoomUrl, {
            dataType: 'json',
            error: console.log,
            success: function (zoomData) {
                _this.zoomData = zoomData.BQInfos;
            },
            complete: function () {
                _this.renderZoomList();
                // 默认选中第一个
                var currentZoomIndex = parseInt(localStorage.getItem('currentZoomIndex'));
                if (currentZoomIndex >= 0) {
                    _this.switchZoom(currentZoomIndex);
                } else {
                    _this.switchZoom(0);
                }
            }
        });
    },
    /**
     * 任务信息页面  主要内容
     *
     * @param {number} bqdm 病区代码
     * @return {Object} 返回值描述 ：任务信息页面
     */
    getInformation() {
        var _this = this;
        if (!_this.informationUrl) {
            return;
        }
        $.ajax({
            url: _this.informationUrl,
            type: "GET",
            dataType: "json",
            data: {
                bqdm: _this.currentZoom.BQDM,
            },
            error: function () {
                alert("查询错误");
            },
            success: function (data) {
                _this.informationData = data;
            },
            complete: function () {
                _this.renderInformation();
            }
        });
    },
    /**
     * 获得病区数据
     *
     * @param {number} bqdm 病区代码
     * @return {Object} 返回值描述：病区数据
     */
    getData: function () {
        // 获得病区数据
        var _this = this;
        if (!_this.dataUrl) {
            return;
        }
        $.ajax(_this.dataUrl, {
            type: "GET",
            dataType: 'json',
            error: console.log,
            data: {
                bqdm: _this.currentZoom.BQDM
            },
            success: function (data) {
                _this.data = data;
            },
            complete: function () {
                _this.renderChildContent();
                _this.renderHeader();
                _this.renderChildHeader();
            }
        })
    },
    /**
     * 函数描述 ：获得护士一级护理二级护理等数据
     *
     * @param {number} bqdm 病区代码
     * @return {Object} 返回值描述 ：获得护士数据
     */
    getWorkListUrlData: function () {
        // 获得护士数据
        var _this = this;
        if (!_this.workListUrl) {
            return;
        }
        $.ajax(_this.workListUrl, {
            type: "GET",
            dataType: 'json',
            error: console.log,
            data: {
                bqdm: _this.currentZoom.BQDM
            },
            success: function (workListUrlData) {
                _this.workListUrlData = workListUrlData;
            },
            complete: function () {
                _this.renderNurseInformation();
            }
        })
    },
    /**
     * 点击床号获取总体弹窗数据
     *
     * @param {number} bqdm 病区代码
     * @param {number} ch 床号
     * @return {Object} 返回值描述 ：返回弹窗数据
     */
    getpDetails(CH) {
        var _this = this;
        if (!_this.pbedsurl) {
            return;
        }
        $.ajax({
            url: _this.pbedsurl,
            type: "GET",
            dataType: "json",
            data: {
                bqdm: _this.currentZoom.BQDM,
                ch: CH
            },
            error: function () {
                alert("查询错误");
            },
            success: function (data) {
                /*patient details data*/
                _this.renderPInfo(data, CH);
            }
        });
    },
    /**
     * 获取echarts
     *
     * @param {number} bqdm 病区代码
     * @param {number} ch 床号
     * @param {number} type 值（0生命体征／1风险评估）
     * @return {Object} 返回值描述 ：返回echarts
     */
    charts(cwrapid, CH, c_type, allbtn, chartType) {

        var curveUrl = '';
        if (chartType === 's') {
            curveUrl = this.schartUrl;
        } else if (chartType === 'm') {
            curveUrl = this.chartUrl;
        }

        /*seriesdata*/
        var _this = this;
        if (!curveUrl) {
            return;
        }
        $.ajax({
            url: curveUrl,
            type: "GET",
            dataType: "json",
            data: {
                bqdm: _this.currentZoom.BQDM,
                ch: CH
            },
            error: function () {
                alert("数据加载错误");
            },
            success: function (data) {
                chartData(data);
                /*timetag*/
                var _now = data.LATEST.split('-');
                var _year = _now[0];
                var _mouth = _now[1];
                var _date = _now[2].split(' ')[0];
                var _during = new Date(data.LATEST).getTime() - _this._hours * 3600 * 1000;
                var _bmouth = new Date(_during).getMonth() + 1;
                var _bdate = new Date(_during).getDate();
                _bmouth < 10 ? _bmouth = '0' + _bmouth : _bmouth;
                _bdate < 10 ? _bdate = '0' + _bdate : _bdate;
                var _ttag = _bmouth + '.' + _bdate + ' - ' + _mouth + '.' + _date + ' (' + _year + '年)';
                if (chartType === 's') //单曲线显示具体时间段
                {
                    if (data.chartInfos.length > 0) {
                        var sInfo = data.chartInfos[0].RWInfos;
                        var slen = sInfo.length;
                        _ttag = sInfo[0].ZXSJ.split(' ')[0].replace(/-/g, '/') + ' - ' + sInfo[slen - 1].ZXSJ.split(' ')[0].replace(/-/g, '/');
                        $('.yAxis').eq(0).html('分数');
                        $('.xAxis').eq(0).html('时间');
                    } else {
                        _ttag = '';
                        var alarm = '<p class="alarmTxt"><span></span>抱歉，未查询到数据！</p>';
                        $('#changeCon').html(alarm);
                    }
                }
                $('.timetag').html(_ttag);
            }
        });


        function chartData(data) {
            var serieslist = [];
            if (allbtn !== '') {
                allbtn = '#' + allbtn;
            }
            //初始化echarts
            var myChart = echarts.init(document.getElementById(cwrapid));

            /*legend文字颜色*/
            var txtStyle = {
                color: '#166AFF',
                fontSize: 16
            };
            /*yAxis*/
            var yArr = [{
                type: 'value',
                max: 43,
                min: 33,
                axisTick: {
                    show: false
                },
                axisLine: {
                    lineStyle: {
                        color: 'rgba(65, 135, 230,0.6)'
                    }
                },
                axisLabel: {
                    margin: 40,
                    formatter: '{value}分',
                    textStyle: {
                        fontSize: 16,
                        color: '#666'
                    }
                },
                splitLine: {
                    show: true,
                    lineStyle: {
                        type: 'dashed',
                        color: 'rgba(140, 160, 179,0.35)'
                    }
                }
            }];

            if (data.chartInfos.length > 0) {
                var RWName = data.chartInfos[0].RWName;
            }
            switch (RWName) {
                case '压疮评估':
                    yArr[0].max = 40;
                    yArr[0].min = 0;
                    break;
                case '跌倒评估':
                    yArr[0].max = 40;
                    yArr[0].min = 0;
                    break;
                case '导管评估':
                    yArr[0].max = 40;
                    yArr[0].min = 0;
                    break;
                default:
                    yArr[0] = {
                        type: 'value',
                        name: '体温\n(℃)',
                        min: 35,
                        max: 42,
                        position: 'left',
                        offset: 180,
                        interval: 1,
                        axisTick: {
                            show: false
                        },
                        axisLine: {
                            lineStyle: {
                                color: "#15ACFF"
                            }
                        },
                        axisLabel: {
                            margin: 18
                        },
                        splitLine: {
                            show: true,
                            lineStyle: {
                                type: 'dashed',
                                color: 'rgba(140, 160, 179,0.35)'
                            }
                        }
                    };
            }

            /*坐标轴最大最小值-脉搏、血压、呼吸*/
            var offsetArr = [120, 60, 0],
                intervalArr = [22, 44, 10],
                minmax = [[192, 60], [220, 0], [70, 20]],
                colorArr = ["#B883FF", "#44DB5E", "#F6A623"],
                nameArr = ["脉搏\n(bpm)", "血压\n(mmHg)", "呼吸\n(次)"];
            if (chartType === 'm') {
                for (var i = 0; i < 3; i++) {
                    yArr.push({
                        type: 'value',
                        name: nameArr[i],
                        min: minmax[i][1],
                        max: minmax[i][0],
                        position: 'left',
                        offset: offsetArr[i],
                        interval: intervalArr[i],
                        axisTick: {
                            show: false
                        },
                        axisLine: {
                            lineStyle: {
                                color: colorArr[i]
                            }
                        },
                        axisLabel: {
                            margin: 18
                        },
                        splitLine: {
                            show: false
                        }
                    });
                }
            }

            var colorsheet = [{
                itemColor: '#15ACFF',
                isColor: 'rgba(0, 156, 238, 0.4)',
                lsColor: 'rgba(0, 156, 238, 0.5)',
                areaOff1: 'rgba(0, 156, 238, 0.25)'
            }, {
                itemColor: '#B883FF',
                isColor: 'rgba(184, 131, 255, 0.4)',
                lsColor: 'rgba(184, 131, 255,0.5)',
                areaOff1: 'rgba(184, 131, 255, 0.25)'
            }, {
                itemColor: '#44DB5E',
                isColor: 'rgba(68, 219, 94, 0.4)',
                lsColor: 'rgba(68, 219, 94,0.5)',
                areaOff1: 'rgba(68, 219, 94, 0.25)'
            }, {
                itemColor: '#F6A623',
                isColor: 'rgba(246, 166, 35, 0.4)',
                lsColor: 'rgba(246, 166, 35,0.5)',
                areaOff1: 'rgba(246, 166, 35, 0.25)'
            }];

            /*series data*/
            function pushdata(_argu) {
                var _obj = {
                    name: _argu.name,
                    yAxisIndex: _argu.yAxisIndex,
                    type: 'line',
                    smooth: false,
                    symbol: _argu.symbol, //个性化图标
                    symbolSize: _argu.sbsize,
                    itemStyle: {
                        normal: {
                            color: _argu.itemColor,
                            borderWidth: 2,
                            shadowColor: _argu.itemColorsdColor,
                            shadowBlur: 10,
                            shadowOffsetY: 4
                        },
                        emphasis: {
                            color: _argu.emphasis
                        }
                    },
                    animation: false,
                    /*关闭动画*/
                    /*[时间，测量值，测量者]*/
                    data: _argu.data,
                    lineStyle: {
                        normal: {
                            width: 2,
                            color: _argu.lineColor,
                            shadowColor: _argu.linesdColor,
                            shadowBlur: 10,
                            shadowOffsetY: 5
                        }
                    },
                    areaStyle: {
                        normal: {
                            color: new echarts.graphic.LinearGradient(0, 1, 0, 0, [{
                                offset: 0,
                                color: 'rgba(255, 255, 255, 0.1)'
                            }, {
                                offset: 1,
                                color: _argu.areaColor1
                            }])
                        }
                    }
                };
                return _obj;
            }

            /*血压收缩压部分*/
            var _dqData = [];
            var _dqIndex = 0;
            for (var k = 0, chartlen = data.chartInfos.length; k < chartlen; k++) {
                var seriesdata = [];
                var rwlen = data.chartInfos[k].RWInfos.length;
                var dataArgu = {};
                for (var z = 0; z < rwlen; z++) {
                    var RWName = data.chartInfos[k].RWName;
                    var RWInfo = data.chartInfos[k].RWInfos[z];
                    var symbolimg = '';
                    var sbsize = 12;

                    /*生命体征*/
                    if (chartType === 'm') {
                        switch (RWName) {
                            case '呼吸':
                                symbolimg = 'emptycircle';
                                break;

                            case '体温':
                                symbolimg = 'emptycircle';
                                break;

                            default:
                                symbolimg = 'image://../img/' + data.chartInfos[k].RWName + '.svg';
                                sbsize = 16;
                        }
                        if (RWInfo.VALUE !== '') {
                            if (RWName === '血压') {
                                seriesdata.push([RWInfo.LRRQ, Number(RWInfo.VALUE.split('/')[0]), RWInfo.ZXHS, Number(RWInfo.VALUE.split('/')[1]), RWInfo.ZXSJ]);
                                _dqIndex = k;
                                _dqData.push([RWInfo.LRRQ, Number(RWInfo.VALUE.split('/')[1]), RWInfo.ZXHS, Number(RWInfo.VALUE.split('/')[0]), RWInfo.ZXSJ]);
                                sbsize = 16;
                            } else {
                                seriesdata.push([RWInfo.LRRQ, Number(RWInfo.VALUE), RWInfo.ZXHS, RWInfo.ZXSJ]);
                            }
                        }
                    } /*跌倒等单曲线*/
                    else {
                        symbolimg = 'emptycircle';
                        if (RWInfo.VALUE !== '') {
                            var dglx = [];
                            var dgindex = 0;
                            for (var arg in RWInfo) {
                                if (arg == 'VALUE') {
                                    RWInfo[arg] = Number(RWInfo[arg]);
                                }
                                if (arg == 'DGLX') {
                                    dgindex = dglx.length;
                                }
                                dglx.push(RWInfo[arg]);
                            }
//                  	var dglx = [RWInfo.ZXSJ, Number(RWInfo.VALUE), RWInfo.ZXHS, RWInfo.DInfo];
                            if (parseInt(c_type) !== 5) {
                                dglx.splice(dgindex, 1);
                            }
                            seriesdata.push(dglx);
                        }
                    }
                }
                //曲线风格及数据
                dataArgu.name = data.chartInfos[k].RWName;
                dataArgu.yAxisIndex = k;
                dataArgu.symbol = symbolimg;
                dataArgu.sbsize = sbsize;
                dataArgu.itemColor = colorsheet[k].itemColor;
                dataArgu.itemColorsdColor = colorsheet[k].isColor;
                dataArgu.emphasis = colorsheet[k].itemColor;
                dataArgu.data = seriesdata;
                dataArgu.lineColor = colorsheet[k].itemColor;
                dataArgu.linesdColor = colorsheet[k].lsColor;
                dataArgu.areaColor1 = colorsheet[k].areaOff1;
                serieslist.push(pushdata(dataArgu));
            }
            if (chartType === 'm') {
                serieslist.push(pushdata({
                    name: '舒张压',
                    yAxisIndex: _dqIndex,
                    symbol: 'image://../img/舒张压.svg',
                    sbsize: 16,
                    itemColor: colorsheet[_dqIndex].itemColor,
                    itemColorsdColor: colorsheet[_dqIndex].isColor,
                    emphasis: colorsheet[_dqIndex].itemColor,
                    data: _dqData,
                    lineColor: colorsheet[_dqIndex].itemColor,
                    linesdColor: colorsheet[_dqIndex].lsColor,
                    areaColor1: 'rgba(255,255,255,0)'
                }));
            }
            /*生命曲线*/
            var option = {
                /*提示框*/
                tooltip: {
                    showDelay: 5,
                    trigger: 'axis',
                    hideDelay: 800,
                    //triggerOn:'click',
                    backgroundColor: 'tranparent',
                    transitionDuration: 0,
                    textStyle: {
                        color: '#acc0d3',
                        fontFamily: 'Microsoft Yahei',
                        fontSize: 14
                    },
                    axisPointer: { // 坐标轴指示器
                        type: 'cross',
                        crossStyle: {
                            color: 'rgba(140, 160, 179,0.35)',
                            width: 1,
                            type: 'solid',
                            textStyle: {
                                color: 'transparent'
                            }
                        }
                    },
                    formatter: function (params) {
                        if ($.isArray(params)) {
                            params = params[0];
                        }
                        var res = '';
                        //console.log(params);
                        var title = params.seriesName;
                        var myvalue = '';
                        var shadowColor = '';
                        var txtColor = '';
                        var mytime = params.value[3];
                        var seriesName = params.seriesName;
                        switch (title) {
                            case '体温':
                                myvalue = params.value[1] + '°C';
                                shadowColor = 'rgba(108,194,242,0.25)';
                                txtColor = '#22AEFD';
                                break;
                            case '脉搏':
                                myvalue = params.value[1] + '次/分';
                                shadowColor = 'rgba(184, 131, 255,0.25)';
                                txtColor = '#B883FF';
                                break;
                            case '血压':
                                seriesName = '收缩压';
                                myvalue = params.value[1] + ' mmHg';
                                shadowColor = 'rgba(68, 219, 94,0.25)';
                                txtColor = '#44DB5E';
                                mytime = params.value[4];
                                break;
                            case '舒张压':
                                myvalue = params.value[1] + ' mmHg';
                                shadowColor = 'rgba(68, 219, 94,0.25)';
                                txtColor = '#44DB5E';
                                mytime = params.value[4];
                                break;
                            case '呼吸':
                                myvalue = params.value[1] + '次/分';
                                shadowColor = 'rgba(246, 166, 35,0.25)';
                                txtColor = '#F6A623';
                                break;
                        }
                        res += '<p style="height:10px;text-align:center;">' + seriesName + '<span style="color:' + txtColor + ';padding-left:15px;font-size:16px;">' +
                            myvalue + '</span></p><br/><p style="height:0;padding:16px 0;border-top:1px solid #F2F2F2;">' +
                            '执行护士：<span style="color:' + txtColor + ';">' +
                            params.value[2] + '</span></p>' + '<br/><p style="height:0">执行时间：<span style="color:' + txtColor + ';">' +
                            mytime + '</span></p>';
                        return '<div style="height:150px;background: #FFFFFF;box-shadow: 0 3px 21px 0  ' + shadowColor + ';border-radius: 9px;padding:15px 25px 25px 25px;">' + res + '</div>';
                    }
                },
                /*图表与容器的留白距离*/
                grid: {
                    top: 70,
                    bottom: 50,
                    left: 225,
                    right: 40
                },
                /*控制组件*/
                legend: {
                    right: 35,
                    itemGap: 20,
                    itemWidth: 10,
                    textStyle: {
                        fontSize: 14
                    },
                    selectedMode: 'multiple',
                    data: [{
                        name: '体温',
                        icon: 'circle'
                    }, {
                        name: '脉搏',
                        icon: 'circle'
                    }, {
                        name: '血压',
                        icon: 'circle'
                    }, {
                        name: '呼吸',
                        icon: 'circle'
                    }]
                },
                /*x轴*/
                xAxis: [{
                    min: new Date(data.LATEST) - _this._hours * 3600 * 1000,
                    max: new Date(data.LATEST),
                    interval: _this._hours * 3600 * 1000 / _this._splitNum,
                    type: 'time',
                    boundaryGap: false,
                    axisTick: {
                        show: false
                    },
                    axisLine: {
                        lineStyle: {
                            color: '#8CA0B3'
                        }
                    },
                    axisLabel: {
                        margin: 20,
                        textStyle: {
                            fontSize: 14,
                            color: '#666'
                        },
                        formatter: function (value, idx) {
                            var _date = new Date(value);
                            var _xaxis = '';
                            if (idx === 0 || idx === _this._splitNum) {
                                _xaxis = _date.getHours();
                            } else {
                                _xaxis = _date.getHours();
                            }
                            return _xaxis;
                        }
                    },
                    splitLine: {
                        show: true,
                        lineStyle: {
                            type: 'dashed',
                            color: 'rgba(140, 160, 179,0.25)'
                        }
                    },
                    splitNumber: _this._splitNum
                }],
                /*y轴*/
                yAxis: yArr,
                /*曲线序列*/
                series: serieslist
            };
            if (chartType === 's') {
                var scmin = new Date(data.chartInfos[0].RWInfos[0].ZXSJ);
                var scmax = new Date(data.chartInfos[0].RWInfos[data.chartInfos[0].RWInfos.length - 1].ZXSJ);
                var sinterval = (scmax - scmin) / _this._ssplitNum;
                if (data.chartInfos[0].RWInfos.length === 1) {
                    sinterval = 1;
                    _this._ssplitNum = 1;
                }
                /*单曲线*/
                var option2 = {
                    /*提示框*/
                    tooltip: {
                        showDelay: 5,
                        trigger: 'axis',
                        hideDelay: 800,
                        //triggerOn: 'click',
                        backgroundColor: 'tranparent',
                        transitionDuration: 0,
                        textStyle: {
                            color: '#acc0d3',
                            fontFamily: 'Microsoft Yahei',
                            fontSize: 14
                        },
                        axisPointer: { // 坐标轴指示器
                            type: 'cross',
                            crossStyle: {
                                color: 'rgba(140, 160, 179,0.35)',
                                width: 1,
                                type: 'solid',
                                textStyle: {
                                    color: 'transparent'
                                }
                            }
                        },
                        formatter: function (params) {
                            if ($.isArray(params)) {
                                params = params[0];
                            }
                            //[RWInfo.TIME, RWInfo.PTEMP,  Number(RWInfo.VALUE),RWInfo.ZXHS, RWInfo.DInfo]
                            var res = '';
                            var arr = params.value[3].split('');
                            // var arrlen = Math.ceil((arr.length + params.value[3].match(/[\u4E00-\u9FA5]/g).length) / 2);
                            var careInfo = params.value[3];
                            var dglx = '<p style="height:0;padding-top:16px;">导管类型：<span style="color:#22AEFD;">' +
                                params.value[4] + '</span></p><br/>';
                            if (parseInt(c_type) !== 5) {
                                dglx = '';
                            }
                            res += '<p style="height:10px;text-align:center;">评估等级<span style="color:#22AEFD;padding-left:16px;font-size:16px;">' +
                                params.value[1] + '分</span></p><br/><p style="height:0;padding-top:16px;border-top:1px solid #F2F2F2;">' +
                                '执行时间：<span style="color:#22AEFD;display:inline-block;width:80px;vertical-align:top;">' +
                                params.value[0] + '</span></p>' + '<br/><p style="height:0;padding-top:16px;">执行护士：<span style="color:#22AEFD;">' +
                                params.value[2] + '</span></p><br/>' + dglx + '<p style="padding-top:16px;">护理措施：<span style="color:#22AEFD;display:inline-block;width:120px;vertical-align:top;text-align:justify;white-space:normal;">' +
                                careInfo + '</span></p>';
                            return '<div style="width:240px;height:auto;background: #FFFFFF;box-shadow: 0 3px 21px 0 rgba(108,194,242,0.50);border-radius: 9px;padding:15px 25px 25px 25px;">' + res + '</div>';
                        }
                    },
                    /*图表与容器的留白距离*/
                    grid: {
                        top: 46,
                        bottom: 50,
                        left: 80,
                        right: 40
                    },
                    /*控制组件*/
                    legend: {
                        right: 35,
                        itemGap: 20,
                        itemWidth: 10,
                        textStyle: {
                            fontSize: 16
                        },
                        selectedMode: 'multiple',
                        data: []
                    },
                    /*x轴*/
                    xAxis: [{
                        min: scmin,
                        max: scmax,
                        type: 'time',
                        interval: sinterval,
                        boundaryGap: false,
                        axisTick: {
                            show: false
                        },
                        axisLine: {
                            lineStyle: {
                                color: '#8CA0B3'
                            }
                        },
                        axisLabel: {
                            margin: 30,
                            textStyle: {
                                fontSize: 14,
                                color: '#666'
                            },
                            formatter: function (value, idx) {
                                var _date = new Date(value);
                                return _date.getMonth() + 1 + '-' + _date.getDate();
                            }
                        },
                        splitLine: {
                            show: true,
                            lineStyle: {
                                type: 'dashed',
                                color: 'rgba(140, 160, 179,0.25)'
                            }
                        },
                        splitNumber: _this._ssplitNum
                    }],
                    /*y轴*/
                    yAxis: [],
                    /*曲线序列*/
                    series: serieslist
                };
                for (var i = 0; i < data.chartInfos.length; i++) {
                    option2.legend.data.push({
                        name: data.chartInfos[i].RWName,
                        icon: 'circle'
                    });
                    option2.yAxis.push({
                        type: "value",
                        max: 40,
                        min: 0,
                        axisTick: {
                            show: false
                        },
                        axisLine: {
                            lineStyle: {
                                color: "rgba(65, 135, 230,0.6)"
                            }
                        },
                        axisLabel: {
                            margin: 40,
                            formatter: "{value}分",
                            textStyle: {
                                fontSize: 16,
                                color: "#666"
                            }
                        },
                        splitLine: {
                            show: true,
                            lineStyle: {
                                type: "dashed",
                                color: "rgba(140, 160, 179,0.35)"
                            }
                        }
                    });
                }
            }
            if (chartType === 'm') {
                //使图表阴影填充显示
                function opacity1() {
                    for (var i = 0; i < option.series.length; i++) {
                        option.series[i].areaStyle.normal.opacity = 1;
                    }
                }

                //使图表阴影填充隐藏
                function opacity0() {
                    for (var i = 0; i < option.series.length; i++) {
                        option.series[i].areaStyle.normal.opacity = 0;
                    }
                }

                opacity0();

                // 使用刚指定的配置项和数据显示图表。
                myChart.setOption(option);

                //点击显示全部图表
                $(allbtn).click(function () {
                    opacity0();
                    option.legend.selectedMode = 'multiple';
                    $(this).css('color', '#166AFF');
                    option.legend.selected = {
                        '体温': true,
                        '脉搏': true,
                        '血压': true,
                        '舒张压': true,
                        '呼吸': true
                    };
                    myChart.setOption(option);
                });
                //点击分别显示图表
                myChart.on('legendselectchanged', function (params) {
                    var data = params.name;
                    $(allbtn).css('color', '#8CA0B3');
                    option.legend.selected = {
                        '体温': false,
                        '脉搏': false,
                        '血压': false,
                        '舒张压': false,
                        '呼吸': false
                    };
                    switch (data) {
                        case "体温":
                            option.legend.selected.体温 = true;
                            opacity1();
                            break;
                        case "脉搏":
                            option.legend.selected.脉搏 = true;
                            opacity1();
                            break;
                        case "血压":
                            option.legend.selectedMode = 'multiple';
                            option.legend.selected.舒张压 = true;
                            option.legend.selected.血压 = true;
                            opacity1();
                            break;
                        case "呼吸":
                            option.legend.selected.呼吸 = true;
                            opacity1();
                            break;
                    }
                    myChart.setOption(option);
                });
            } else {
                // 绘制单曲线
                myChart.setOption(option2);
                //评分明细
                myChart.on("click", function (params) {
                    var myNum = 0,
                        scoreArr = [],
                        PFMXArr = [],
                        showDetail = [],
                        RWName = '',
                        scoreHtml = '';
                    c_type = Number(c_type);
                    switch (c_type) {
                        case 3:
                            myNum = 4;
                            RWName = '压疮等级';
                            scoreArr = ['感觉知觉 完全丧失或昏迷', '感觉知觉 严重丧失或混乱', '感觉知觉 轻度丧失或淡漠', '感觉知觉 未丧失或清醒', '皮肤 持久潮湿', '皮肤 潮湿', '皮肤 偶有潮湿', '皮肤 极少潮湿', '卧床', '轮椅', '偶尔步行', '经常步行', '活动能力 完全不能', '活动能力 严重限制', '活动能力 轻度限制', '活动能力 不限制', '营养 恶劣', '营养 不足', '营养 适当', '营养 良好', '摩擦/剪切力 有', '摩擦/剪切力 潜在危险', '摩擦/剪切力 无'];
                            break;
                        case 4:
                            myNum = 4;
                            RWName = '跌倒等级';
                            scoreArr = ['跌倒病史', '神志模糊', '神志谵妄', '神志烦躁', '体位性低血压可能', '肢体障碍', '无自理能力', '部分自理能力', '使用镇静剂', '使用利尿剂', '使用缓泻剂', '使用降糖药', '年龄>=65', '年龄>=75', '年龄>=80'];
                            break;
                        case 5:
                            myNum = 5;
                            RWName = '导管等级';
                            scoreArr = ['胸管', 'T管', '口鼻插管', '气管插管', '动静脉插管', '脑室引流管', 'PTCD管', 'ERCP管', '腹膜透析管', '胃肠管', '双套管', '负压球', '深静脉导管', '三腔管', '造瘘管', '胸腔穿刺管', '腹腔穿刺管', '肾脏穿刺管', 'PICC', '引流管', '导尿管', '输液管', '鼻饲管', '氧气管', '镇痛泵', '意识 烦躁', '意识 谵妄', '意识 模糊'];
                            break;
                    }
                    for (var i = 0; i < params.value[myNum].length; i++) {
                        PFMXArr.push(params.value[myNum][i].MXFS)
                    }
                    for (var i = 0; i < PFMXArr.length; i++) {
                        if (PFMXArr[i] > 0) {
                            showDetail.push([scoreArr[i], PFMXArr[i]]);
                        }
                    }
                    for (var i = 0; i < showDetail.length; i++) {
                        scoreHtml += '<li><span class="name">' + showDetail[i][0] + '</span><span class="score">' + showDetail[i][1] + '</span></li>'
                    }
                    $(".scoreBox").html('<div class="zf"><span class="name">' + RWName + '</span><span class="score">' + params.value[1] + '</span></div><div class="mx"><ul>' + scoreHtml + '</ul></div>');
                    $(".scoreBox").css('display', 'block')
                })
            }
        }
    },
    /**
     * 点击病人总数等出现弹窗床号信息
     *
     * @param {number} bqdm 病区代码
     * @param {number} RWPY  任务拼音
     * @return {Object} 返回值描述 ：床号信息
     */
    bedsHeaderInit(RWPY, RWName) {
        var _this = this;
        if (!_this.bedspyUrl) {
            return;
        }
        $.ajax({
            url: _this.bedspyUrl,
            type: "GET",
            dataType: "json",
            data: {
                bqdm: _this.currentZoom.BQDM,
                rwpy: RWPY
            },
            error: function () {
                alert("查询错误");
            },
            success: function (data) {
                _this.bedsData = data;
                _this.beds(RWName);
            }
        });
    },
    /**
     * 点击病人状态和护理任务出现弹窗床号信息
     *
     * @param {number} bqdm 病区代码
     * @param {number} RWXH  任务序号
     * @return {Object} 返回值描述 ：床号信息
     */
    bedsInit(RWXH, RWName) {
        var _this = this;
        if (!_this.bedsxhUrl) {
            return;
        }
        $.ajax({
            url: _this.bedsxhUrl,
            type: "GET",
            dataType: "json",
            data: {
                bqdm: _this.currentZoom.BQDM,
                rwxh: RWXH
            },
            error: function () {
                alert("查询错误");
            },
            success: function (data) {
                _this.bedsData = data;
                _this.beds(RWName);
            }
        });
    },
    /**
     * 函数描述
     *
     * @param {number} bqdm 病区代码
     * @return {Object} 返回值描述 ：获得医保信息数据／出入院信息
     */
    getListData: function () {
        var _this = this;
        if (!_this.listUrl) {
            return;
        }
        $.ajax(_this.listUrl, {
            type: "GET",
            dataType: 'json',
            error: console.log,
            data: {
                bqdm: _this.currentZoom.BQDM
            },
            success: function (data) {
                _this.listData = data;
            },
            complete: function () {
                _this.renderPatientInformation();
                _this.renderYiBaoInformation();
                _this.nurseCount()
            }
        });
    },
    renderInformation: function () {
        var leftDomString = '';
        var rightDomString = '';
        var FZinfos = this.informationData.FZinfos;
        var MiddleNum = Math.ceil(FZinfos.length / 2);
        for (var i = 0; i < FZinfos.length; i++) {
            var FZinfo = FZinfos[i];
            var domString = `<div class="inforItem">
                                <div class="inforTitle">
                                    <span>${FZinfo.FZName}</span>
                                </div>
                                <ul class="inforContent">`;

            for (var j = 0; j < FZinfo.RWinfos.length; j++) {
                var RWinfos = FZinfo.RWinfos[j];
                domString += `<li><div class="contentTitle">${RWinfos.RWName}</div><div class="content">`;
                for (var k = 0; k < RWinfos.CWinfos.length; k++) {
                    domString += `<span class="num  ${this.getNumColorClassName(RWinfos.CWinfos[k].STATUS)}">${RWinfos.CWinfos[k].CWDM}</span>`;
                }

                domString += `</div></li>`;
            }
            domString += `</ul></div>`;

            if (i < MiddleNum) {
                leftDomString += domString;
            } else {
                rightDomString += domString;
            }
        }
        $('.inforLeft').html(leftDomString);
        $('.inforRight').html(rightDomString)
    },
    setZoomDisplayContainerElement: function (selector) {
        this.zoomDisplayContainerElement = $(selector);
    },
    setZoomListContainerElement: function (selector) {
        this.zoomListContainerElement = $(selector);
    },
    setVerticalContainerElement: function (selector) {
        this.verticalContainerElement = $(selector);
    },
    vertical: function () {
        for (var i = 0; i < this.verticalContainerElement.length; i++) {
            var verticalItems = this.verticalContainerElement[i];
            var verticalItemsElements = $(verticalItems);
            for (var j = 0; j < verticalItemsElements.length; j++) {
                $(verticalItemsElements[j]).css('line-height', `${verticalItemsElements[j].offsetHeight}px`);
            }
        }
    },
    renderZoomList: function () {
        //渲染下拉列表
        var listDomString = '';
        for (var i = 0; i < this.zoomData.length; i++) {
            var currentZoomCode = this.currentZoom ? this.currentZoom.BQDM : undefined;
            //例如：0005代表第五病区，0006代表第六病区（可换成实际病区代码）     改成0005、0006界面下拉框只显示：第五病区、第六病区
            if (~['0005', '0006'].indexOf(currentZoomCode)) {
                if (~['0005', '0006'].indexOf(this.zoomData[i].BQDM)) {
                    listDomString += '<li data-zoom-index="' + i + '">' + this.zoomData[i].BQName + '</li>'
                }
            } else {
                listDomString += '<li data-zoom-index="' + i + '">' + this.zoomData[i].BQName + '</li>'
            }
        }
        var result = this.zoomListContainerElement.html('<ul>' + listDomString + '</ul>');
        if (result.find('li').length > 4) {
            result.find('ul').append('<div class=\'arrowBox\'><span class=\'arrowDown\'></span></div>');
        }
    },
    showArrowBox: function () {
        //下拉菜单开关
        $(this.arrowBox).show();
    },
    hideArrowBox: function () {
        //下拉菜单开关
        $(this.arrowBox).hide();
    },
    dropList: function () {
        var _this = this;
        _this.zoomDisplayContainerElement.click(function (event) {
            if (
                _this.lastTimeZoom !== null &&
                !~['0005', '0006'].indexOf(_this.currentZoom.BQDM)
            ) {
                return false;
            }
            if (_this.zoomData.length >= 5) {
                _this.zoomListContainerElement.find('li:gt(4)').hide();
                _this.showArrowBox();
            }
            _this.zoomDisplayContainerElement.css(
                "opacity",
                _this.zoomDisplayContainerElement.css("opacity") === 1 ? 1 : .69
            );
            _this.zoomDisplayContainerElement.toggleClass("open");
            _this.zoomListContainerElement.find('ul').slideToggle();
            event.stopPropagation();
        });

        _this.zoomListContainerElement.delegate(_this.arrowBox, 'mouseenter', function (event) {
            _this.zoomListContainerElement.find('li:gt(4)').show();
            _this.hideArrowBox();
        });

        _this.zoomListContainerElement.delegate("li", "click", function (event) {
            var index = $(this).data('zoom-index');
            _this.switchZoom(index);
            event.stopPropagation();
        })
    },
    switchZoom: function (index) {
        if (!this.zoomData.hasOwnProperty(index)) {
            return;
        }
        this.lastTimeZoom = this.currentZoom;
        this.currentZoom = this.zoomData[index];
        this.switchDisplayingZoom();
        localStorage.setItem('currentZoomIndex', index);
        this.renderZoomList();

        if (this.lastTimeZoom && !~['0005', '0006'].indexOf(this.currentZoom.BQDM)) {
            this.zoomDisplayContainerElement.css('background', 'none');
        }
    },
    switchDisplayingZoom: function () {
        //切换大屏
        this.zoomDisplayContainerElement.toggleClass('open')
            .html(this.currentZoom.BQName)
            .css('opacity', 1);
        this.zoomListContainerElement.find('ul').slideUp();
        this.getData();
        this.getWorkListUrlData();
        this.getListData();
        this.getInformation();
    },
    newDay: function () {
        // var now,year,mouth,date,day,hour,mintes;
        now = new Date;
        year = now.getFullYear();
        mouth = now.getMonth() + 1;
        date = now.getDate();
        day = now.getDay();
        hour = now.getHours();
        mintes = now.getMinutes();

        if (mouth < 10) {
            mouth = '0' + mouth;
        }
        if (date < 10) {
            date = '0' + date;
        }
        if (hour < 10) {
            hour = '0' + hour;
        }
        if (mintes < 10) {
            mintes = '0' + mintes;
        }

        today = year + '-' + mouth + '-' + date;
        $('header .headtime').html(today + '&nbsp' + hour + ':' + mintes);

    },
    nurseCount: function () {
        var nurseCount = this.listData;
        var dom_string = '';
        dom_string += '<ul class="totalNum">' +
            '<li>' + nurseCount.BRCount + '</li>' +
            '<li>病人总数</li>' +
            '</ul>' +
            '<ul class="Shift">' +
            '<li>' + nurseCount.DQBC + '</li>' +
            '<li>当前班次</li>' +
            '</ul>';
        dom_string += '<ul class="nurse clear">';
        for (var i = 0; i < nurseCount.HSInfos.length; i++) {
            var HSInfos = nurseCount.HSInfos[i];
            dom_string += '<li class="float-left clear">' +
                '<img src="img/nurse.jpg" alt="护士" class="float-left">' +
                '<ul class="float-right">' +
                '<li>' + HSInfos.HS + '</li>' +
                '<li>' + HSInfos.HSZC + '</li>' +
                '</ul>' +
                '</li>';
        }
        dom_string += '</ul>';
        $('.total-content').html(dom_string)
    },
    renderHeader: function () {
        //渲染头部
        var title = this.data.Title;
        $('header h1').html(title);
    },
    renderPatientInformation: function () {
        var dom_string = '';
        for (var i = 0; i < this.listData.HZInfos.length; i++) {
            var HZInfo = this.listData.HZInfos[i];
            dom_string += '<div class="float-left clear">';
            dom_string += '<div class="slideTitle float-left">' + HZInfo.RWName + '<span>' + HZInfo.CWInfos.length + '</span>人</div>';
            dom_string += '<div class="slide float-left"><ul class="infoList clear">';
            for (var j = 0; j < HZInfo.CWInfos.length; j++) {
                var CWInfo = HZInfo.CWInfos[j];
                if (HZInfo.RWName === '转床') {
                    var numbers = CWInfo.CH.split('-');
                    dom_string += '<li class="zhuanchuang"><span class="num ' + this.getNumColorClassName(CWInfo.STATUS) + '">' + numbers[0] + '</span></li>';
                    dom_string += '<li class="zhuanchuang"><span class="num ' + this.getNumColorClassName(CWInfo.STATUS) + '">' + numbers[1] + '</span></li>'
                } else {
                    dom_string += '<li><span class="num ' + this.getNumColorClassName(CWInfo.STATUS) + '">' + CWInfo.CH + '</span></li>';
                }
            }
            dom_string += '</ul></div></div>';
        }
        $('.entry-content').html(dom_string);
        this.slider();
    },
    renderYiBaoInformation: function () {
        var title_dom_string = '';
        var value_dom_string = '';
        title_dom_string += value_dom_string += '<ul class="clear">';
        for (var i = 0; i < this.listData.YBInfos.length; i++) {
            var yiBaoInfo = this.listData.YBInfos[i];
            title_dom_string += '<li>' + yiBaoInfo.YBMC + '</li>';
            value_dom_string += '<li class="color-blue">' + yiBaoInfo.RS + '</li>';
        }
        title_dom_string += '</ul>';
        value_dom_string += '</ul>';

        $('.insurance-content').html(title_dom_string + value_dom_string);
    },
    renderNurseInformation() {
        var nurseTitleContent = '';
        for (var i = 0; i < this.workListUrlData.HLTitles.length; i++) {
            nurseTitleContent += `<th>${this.workListUrlData.HLTitles[i].title}</th>`;
        }
        $('.nurse-content thead tr').html(nurseTitleContent);

        var content_string = '';
        for (var i = 0; i < this.workListUrlData.HLInfos.length; i++) {
            content_string += `<tr>`;
            var HLInfo = this.workListUrlData.HLInfos[i];
            content_string += `<td>${HLInfo.HSName}</td><td>${HLInfo.HSDJ}</td>`;

            for (var j = 0; j < HLInfo.RWInfos.length; j++) {
                content_string += `<td>`;
                var RWInfo = HLInfo.RWInfos[j];
                for (var k = 0; k < RWInfo.CWInfos.length; k++) {
                    content_string += `<span class="num ${this.getNumColorClassName(RWInfo.CWInfos[k].STATUS)}">${RWInfo.CWInfos[k].CH}</span>`
                }
                content_string += `</td>`;
            }
            content_string += `</tr>`;
        }
        $('.nurse-content tbody').html(content_string);
    },
    slider: function () {
        $('.slide').slide({
            mainCell: '.infoList',
            autoPage: true,
            effect: "left",
            autoPlay: true,
            scroll: 10,
            vis: 10,
            mouseOverStop: true,
            interTime: 8000,
        });
        $('.nm-care').slide({
            mainCell: '.sp_bd',
            autoPage: true,
            effect: "left",
            autoPlay: true,
            scroll: 11,
            vis: 11,
            mouseOverStop: true,
            interTime: 5000,
        });
    },
    getNumColorClassName: function (status) {
        switch (status) {
            case 0: //无级别护理
                return 'num-green';
                break;

            case 1://特级护理
                return 'pink-num';
                break;

            case 2:// 一级护理
                return 'red-num';
                break;

            case 3://二级护理
                return 'green-num';
                break;

            case 4://三级护理
                return 'periwinkle-num';
                break;

            default:
                return 'num-black';
                break;
        }
    },
    getHZInfo: function (search) {
        for (var i = 0; i < this.data.HZInfos.length; i++) {
            var HZInfo = this.data.HZInfos[i];
            if (HZInfo.XSNR == search) {
                return HZInfo
            }
        }
        return {};
    },
    renderChildHeader() {
        var settingValue = function (element, value) {
            element.html(value);
        };

        settingValue($('li[search=\'BRZS-病人总数\'] span:nth-child(1)'), this.getHZInfo('病人总数').XSNR);
        settingValue($('li[search=\'BRZS-病人总数\'] .pNum'), this.getHZInfo('病人总数').RS);

        settingValue($('li[search=\'RY-入院\'] span:nth-child(1)'), this.getHZInfo('入院').XSNR);
        settingValue($('li[search=\'RY-入院\'] .pNum'), this.getHZInfo('入院').RS);

        settingValue($('li[search=\'BW-病危\'] span:nth-child(1)'), this.getHZInfo('病危').XSNR);
        settingValue($('li[search=\'BW-病危\'] .pNum'), this.getHZInfo('病危').RS);

        settingValue($('li[search=\'BZ-病重\'] span:nth-child(1)'), this.getHZInfo('病重').XSNR);
        settingValue($('li[search=\'BZ-病重\'] .pNum'), this.getHZInfo('病重').RS);

        settingValue($('li[search=\'SW-死亡-all\'] span:nth-child(1)'), this.getHZInfo('死亡').XSNR);
        settingValue($('li[search=\'SW-死亡-all\'] .pNum'), this.getHZInfo('死亡').RS);

        settingValue($('li[search=\'JRCYSW-今日出院（上午）-all\'] span:nth-child(1)'), '上午');
        settingValue($('li[search=\'JRCYSW-今日出院（上午）-all\'] .pNum'), this.getHZInfo('今日出院上午').RS);

        settingValue($('li[search=\'JRCYXW-今日出院（下午）-all\'] span:nth-child(1)'), '下午');
        settingValue($('li[search=\'JRCYXW-今日出院（下午）-all\'] .pNum'), this.getHZInfo('今日出院下午').RS);

        settingValue($('li[search=\'MRCYSW-明日出院（上午）-all\'] span:nth-child(1)'), '上午');
        settingValue($('li[search=\'MRCYSW-明日出院（上午）-all\'] .pNum'), this.getHZInfo('明日出院上午').RS);

        settingValue($('li[search=\'MRCYXW-明日出院（下午）-all\'] span:nth-child(1)'), '下午');
        settingValue($('li[search=\'MRCYXW-明日出院（下午）-all\'] .pNum'), this.getHZInfo('明日出院下午').RS);

        settingValue($('li[search=\'JRSS-今日手术-all\'] span:nth-child(1)'), this.getHZInfo('今日手术').XSNR);
        settingValue($('li[search=\'JRSS-今日手术-all\'] .pNum'), this.getHZInfo('今日手术').RS);

        settingValue($('li[search=\'MRSS-明日手术-all\'] span:nth-child(1)'), this.getHZInfo('明日手术').XSNR);
        settingValue($('li[search=\'MRSS-明日手术-all\'] .pNum'), this.getHZInfo('明日手术').RS);
        if (this.data.HZInfos.length <= 13) {
            $('.conWrap').css('margin-left', '70px');
        } else if (this.data.HZInfos.length > 13) {
            $('.conWrap').css('margin-left', '3px');
        }
        var dom_string = '<img src="img/dtxt.png" class="lastimg">';
        var time = 0; // 循环次数，每两次重新循环，超过HZInfos长度终止循环
        var i = 11; // HZInfos的index
        while (true) {
            dom_string += '<ul style="width: 160px">';
            for (; i < this.data.HZInfos.length; i++) {
                dom_string += '<li class="spanbtn" search="' + getSearch(this.data.HZInfos[i].XSNR) + '" onclick="area.showbedsHeader(this)"><span>' + this.data.HZInfos[i].XSNR + '</span><span ' +
                    'class="yd pNum">' + this.data.HZInfos[i].RS + '</span></li>';
                time++;
                if (time % 2 === 0) {
                    break;
                }
            }
            i++;
            dom_string += '</ul>';
            if (this.data.HZInfos.length - 11 <= time) {
                break;
            }
        }
        $('.xtyds').html(dom_string);

        function getSearch(data) {
            switch (data) {
                case '动态血糖':
                    return 'DTXT-动态血糖-all';
                    break;

                case '胰岛素泵':
                    return 'YDSB-胰岛素泵-all';
                    break;

                default:
                    return data + '-' + data + '-all';
                    break;
            }
        }
    },
    renderChildContent() {
        var dom_string = '';
        if (this.data.ZRZinfos.length >= 7) {
            $('.txtScroll-screen .hd').css('width', '320px')
        } else if (this.data.ZRZinfos.length < 4) {
            $('.txtScroll-screen .hd').css('width', '239px')
        }
        for (var i = 0; i < this.data.ZRZinfos.length; i++) {
            var ZRZInfo = this.data.ZRZinfos[i];
            dom_string += '<li class="slit' + i + '"><section class="txtScroll-page"><article class="bd"><ul class="infoList2">';
            for (var j = 0; j < ZRZInfo.RWinfos.length; j++) {
                var RWinfo = ZRZInfo.RWinfos[j];
                dom_string += '<li style="height: 50px;"><ul class="coninfos">';
                if (RWinfo.STATUS) {
                    dom_string += '<li class="bednum"><span onclick="area.showpDetails(this)"  class="num ' + this.getNumColorClassName(RWinfo.STATUS) + '" search="' + RWinfo.CH + '" >' + RWinfo.CH + '</span></li>';
                } else {
                    dom_string += '<li class="bednum"><span class="num ' + this.getNumColorClassName(RWinfo.STATUS) + '" search="' + RWinfo.CH + '" >' + RWinfo.CH + '</span></li>';
                }

                dom_string += '<li class="status"><article class="stu_bd" class="xMarquee stumar"><ul>';
                for (var status_index = 0; status_index < RWinfo.BRZTInfos.length; status_index++) {
                    dom_string += '<li><span search="' + RWinfo.BRZTInfos[status_index].RWXH + '-' + RWinfo.BRZTInfos[status_index].ZTName + '" onclick="area.showbeds(this)">' + RWinfo.BRZTInfos[status_index].ZTName + '</span></li>';
                }
                dom_string += '</ul></article></li>';

                dom_string += '<li class="nm-care"><article class="sp_bd" class="xMarquee nmmar"><ul>';
                for (var cghl_index = 0; cghl_index < RWinfo.CGHLInfos.length; cghl_index++) {
                    var CGHLInfo = RWinfo.CGHLInfos[cghl_index];
                    dom_string += '<li>' +
                        '<span class="spanbtn" search="' + CGHLInfo.RWXH + '-' + CGHLInfo.RWName + '" onclick="area.showbeds(this)">' + CGHLInfo.RWName + '</span>';
                    dom_string += (cghl_index < RWinfo.CGHLInfos.length - 1  ) ? ('<span>、</span>') : ('');
                    dom_string += '</li>';
                }
                dom_string += '</ul></article></li>';

                dom_string += '</ul></li>';
            }
            dom_string += '</ul></article></section></li>';
        }
        $('.infoList1').html(dom_string);
        $(".txtScroll-page").slide({
            mainCell: ".bd .infoList2",
            autoPage: true,
            effect: "top",
            autoPlay: true,
            scroll: 13,
            vis: 13,
            interTime: 5000,
            mouseOverStop: true
        });
        $(".txtScroll-screen").slide({
            titCell: "#screen",
            mainCell: ".bd .infoList1",
            autoPage: true,
            effect: "fade",
            autoPlay: false,
            scroll: 1,
            vis: 1,
            interTime: 8000, //动画延迟 单位ms
            mouseOverStop: true,
            trigger: "click",
            delayTime: 1
        });
        jQuery('.status').slide({
            mainCell: '.stu_bd ul',
            autoPage: true,
            effect: "leftMarquee",
            autoPlay: true,
            scroll: 1,
            vis: 6,
            mouseOverStop: true,
            interTime: 30
        });
        jQuery('.nm-care').slide({
            mainCell: '.sp_bd ul',
            autoPage: true,
            effect: "leftMarquee",
            autoPlay: true,
            scroll: 1,
            vis: 8,
            mouseOverStop: true,
            interTime: 30
        });
        for (var i = 1; i <= this.data.ZRZinfos.length; i++) {
            var myLi = '#screen li:nth-child(' + i + ')';
            $(myLi).html('第' + i + '页');
        }
    },
    showpDetails(span) {
        var CH = span.getAttribute('search');
        /*request pdetails*/
        this.getpDetails(CH);
        /*show or hide box*/
    },
    renderPInfo(data, CH) {
        var txtwrap = '',
            conwrap = '',
            boxid = "#pdetails",
            opinion = '',
            jc = '',
            jy = '',
            hulPlan = '';
        txtwrap = '<div class="titlewrap"><h2>病人信息</h2><a class="close" title="关闭" onclick="area.triggerbox()"></a><span class="shadowline"></span></div>';
        //检查
        for (var i = 0; i < data.HZDetailInfos[0].JCInfos.length; i++) {
            var JCInfos = data.HZDetailInfos[0].JCInfos;
            var JCXM = JCInfos[i].JCXM;
            var JCJG = JCInfos[i].JCJG;
            var TIME = JCInfos[i].Time;

            jc += '<li><p>' + (i + 1) + '、项目名称：<span>' + JCXM + '</span></p><ul class="details"><li>检查结果：<span>' + JCJG + '</span></li><li><time>时间：' + TIME + '</p></time></li></ul></li>';
        }
        //检验
        for (var i = 0; i < data.HZDetailInfos[0].JYInfos.length; i++) {
            var JYInfos = data.HZDetailInfos[0].JYInfos;
            var jymc = JYInfos[i].JYMC;
            var jyz = JYInfos[i].JYZ;
            var ckz = JYInfos[i].CKZ;
            var status = JYInfos[i].Status;
            var time = JYInfos[i].Time;
            var mark = '';
            var font = '';
            switch (status) {
                case 1:
                    mark = 'low';
                    font = 'flow';
                    break;
                case 2:
                    mark = 'high';
                    font = 'fhigh';
                    break;
                case 3:
                    mark = 'yang';
                    break;
                case 4:
                    mark = '';
                    break;
            }
            jy += '<li><p>' + (i + 1) + '、项目名称：<span>' + jymc + '</span></p><ul class="details"><li>检验值：<span class="' + font + '">' + jyz + '</span><span class="' + mark + '"></span></li><li>参考值：<span>' + ckz + '</span></li><li><time>时间：' + time + '</time></li></ul></li>';
        }
        //护理记录
        for (var i = 0; i < data.HZDetailInfos[0].HLJLInfos.length; i++) {
            var HLJLInfos = data.HZDetailInfos[0].HLJLInfos;
            var con = HLJLInfos[i].Cotent;
            var time = '时间：' + HLJLInfos[i].Time;
            var zxhs = '执行者:' + HLJLInfos[i].ZXHS;
            if (con == 'null') {
                con = '';
            }
            if (zxhs == 'null') {
                zxhs = '';
            }
            if (time == 'null') {
                time = '';
            }
            opinion += '<li><p>' + con + '</p><ul class="details"><li>' + zxhs + '</li><li><time>' + time + '</time></li></ul></li>';
        }
        //护理计划
        for (var i = 0; i < data.HZDetailInfos[0].HLJHInfos.length; i++) {
            var HLJHInfos = data.HZDetailInfos[0].HLJHInfos;
            var con = HLJHInfos[i].Cotent;
            var pc = '频次：' + HLJHInfos[i].PC;
            var PlanTime = '计划时间：' + HLJHInfos[i].PlanTime;
            var ActualTime = '执行时间：' + HLJHInfos[i].ActualTime;
            if (pc == 'null') {
                pc = '';
            }
            if (PlanTime == 'null') {
                PlanTime = '';
            }
            if (ActualTime == 'null') {
                ActualTime = '';
            }
            hulPlan += '<li><p>' + con + '</p><ul class="details"><li>' + PlanTime + '</li><li>' + ActualTime + '</li><li><time>' + pc + '</time></li></ul></li>';
        }
        conwrap = '<div class="conwrap scroller">' +
            '<div class="scrollwrap">' +
            '<ul class="rowul" id="rowul" style="position: relative">' +
            '<li>' +
            '<ul class="lineul"><li class="pname">' + data.HZDetailInfos[0].NAME + '</li>' +
            '<li class="pbnum f-666">床号：' + data.HZDetailInfos[0].CWDM + '</li>' +
            '<li class="sex f-666">性别：' + data.HZDetailInfos[0].SEX + '</li>' +
            '<li class="age f-666">年龄：' + data.HZDetailInfos[0].AGE + '</li>' +
            '<li class="pname f-666">入院天数：' + data.HZDetailInfos[0].RYTS + '</li></ul>' +
            '</li>' +
            '<li class="scroll2"><ul class="lineul">' +
            '<li class="title"name="#ZD">诊断：</li>' +
            '<li class="con">' + data.HZDetailInfos[0].ZDNR + '</li></ul>' +
            '</li>' +
            '<li class="scroll2"><ul class="lineul">' +
            '<li class="title" name="#SMTZ">生命体征：</li>' +
            '<li><div class="signCurve"><span class="timetag"></span><div class="curve pull-right"style="position: relative;">' +
            '<label id="sgall"><span></span>全部</label><div id="sgchart">' +
            '</div></div></div></li></ul>' +
            '</li>' +
            '<li class="scroll2"><ul class="lineul">' +
            '<li class="title" name="#JC">检查：</li>' +
            '<li class="con"><ul class="opinions jc">' + jc + '</ul>' +
            '</li></ul>' +
            '</li>' +
            '<li><ul class="lineul">' +
            '<li class="title">检验：</li><li class="con"><ul class="opinions jy">' + jy +
            '</ul></li></ul>' +
            '</li>' +
            '<li class="scroll2"><ul class="lineul">' +
            '<li class="title" name="#DRYZ">护理记录：</li>' +
            '<li class="con opcon"><ul class="opinions">' + opinion + '</ul></li></ul>' +
            '</li>' +
            '<li class="scroll2"><ul class="lineul">' +
            '<li class="title" name="#DRYL">护理计划：</li>' +
            '<li class="con opcon"><ul class="opinions">' + hulPlan + '</ul></li></ul>' +
            '</li>' +
            '<li class="scroll2"><ul class="lineul">' +
            '<li class="title" name="#FXPG">风险评估：</li>' +
            '<li><div class="signCurve1"><span class="timetag"></span><div class="curve pull-right"style="position: relative;">' +
            '<div id="pgchart">' +
            '</div></div></div></li></ul>' +
            '</li>' +
            '</ul>' +
            '</div>' +
            '</div>';

        nav = '<nav class="snav pdnav">' +
            '<ul>' +
            '<li><a >诊断</a></li>' +
            '<li><a >生命体征</a></li>' +
            '<li><a >检查检验</a></li>' +
            '<li><a >护理记录</a></li>' +
            '<li><a >护理计划</a></li>' +
            '<li><a >风险评估</a></li>' +
            '</ul>' +
            '</nav>';
        $(boxid).html(txtwrap + conwrap + nav);
        $(boxid).show();
        /*绘制图表和表格*/
        this.charts('sgchart', CH, 0, 'sgall', 'm');//生命体征
        this.charts('pgchart', CH, 1, '', 's');//风险评估
        /*1202_begin*/
        $(".pdnav li").click(function () {
            var _this = $(this),
                _index = _this.index();
            _top = $("#pdetails .scroll2").eq(_index).position().top;
            $('#pdetails .snav a').eq(_index).addClass('active');
            $("#pdetails .scroller").animate({
                scrollTop: _top + "px"
            }, 800);
            $('#pdetails .snav a').removeClass('active');
            $('#pdetails .snav a').eq(_index).addClass('active');

        });

        $('.darkmask').css('zIndex', 10001);
        $('.darkmask').css('opacity', 1);
        var oTops = [];

        $('.scroll2').each(function () {
            oTops.push($(this).offset().top);
        });
        /*slider for nav*/
        slider({
            'scrollA': '#pdetails .snav a',
            'scroller': '#pdetails .scroller',
            'scroll': '#pdetails .scroll2',
            'topArr': oTops
        });

        function slider(sobj) {
            /*激活第一个*/
            $(sobj.scrollA).eq(0).addClass('active');
            $(sobj.scroller).scroll(function () {
                var sTop = $(sobj.scroller).scrollTop();
                if (sTop < 70) {

                    if ($(sobj.scrollA).eq(0).hasClass('active')) {
                        $(sobj.scrollA).removeClass('active');
                    }
                    $(sobj.scrollA).eq(0).addClass('active');

                } else {

                    $(sobj.scrollA).eq(0).removeClass('active');
                    for (var i = 0; i < sobj.topArr.length; i++) {
                        if (Math.abs(sTop - sobj.topArr[i]) < 25) {
                            $(sobj.scrollA).removeClass('active');
                            $(sobj.scrollA).eq(i).addClass('active');
                        }
                    }
                }
            });
        }
    },
    showbedsHeader(span) {
        var search = span.getAttribute('search').split('-');
        var RWPY = search[0];
        var RWName = search[1];
        // var RWmark = search[2];
        this.bedsHeaderInit(RWPY, RWName);
    },
    showbeds(span) {
        var search = span.getAttribute('search').split('-');
        var RWXH = search[0];
        var RWName = search[1];
        // var RWmark = search[2];
        this.bedsInit(RWXH, RWName);
    },
    beds(RWName) {
        var chlen = this.bedsData.CHInfos.length;
        var beds = '';
        var txtwrap = '';
        var bedswrap = '';
        var boxid = "#bedsnum";
        txtwrap = '<h2>' + RWName + '</h2><span class="rtxt">汇总：<span class="all">' + chlen + '人</span></span><a class="close"  title="关闭" onclick="area.triggerbox()"></a><span class="shadowline"></span>';
        for (var i = 0; i < chlen; i++) {
            var CWInfo = this.bedsData.CHInfos[i];
            beds += '<li><span class="num ' + this.getNumColorClassName(CWInfo.STATUS) + '">' + this.bedsData.CHInfos[i].CH + '</span></li>'
        }
        bedswrap = '<ul>' + beds + '</ul>';
        bedsbox = '<div class="titlewrap">' + txtwrap + '</div><div class="bedswrap">' + bedswrap + '</div>';
        $(boxid).html(bedsbox);
        $(boxid).show();
        $('.darkmask').css('zIndex', 10001);
        $('.darkmask').css('opacity', 1)
    },
    triggerbox() {
        $('#bedsnum').hide();
        $('#pdetails').hide();
        $('.darkmask').css('zIndex', -1);
        $('.darkmask').css('opacity', 0)
    },
    maskClick(mark) {
        this.triggerbox()
    }
};
