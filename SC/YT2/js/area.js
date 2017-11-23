var area = {
    patientBedsUrl: '',
    patientBedsData: [],
    currentZoom: null,
    init: function (object) {
        if (typeof object === 'object') {
            this.patientBedsUrl = object.patientBedsUrl;
        }
        this.currentZoom = JSON.parse(localStorage.getItem('currentZoom'));
        this.getPatientBedsData()
        this.newDay()
        setInterval(this.newDay.bind(this), 1000);
        setInterval(this.getPatientBedsData.bind(this), 300000);
    },
    getPatientBedsData: function () { //_this 是原本的this

        var _this = this;

        $.ajax(_this.patientBedsUrl, {
            type: "GET",
            error: console.log,
            dataType: 'json',
            data: {
                bqdm: _this.currentZoom.BQDM
            },
            beforeSend: function () {
            },
            success: function (data) {
                _this.patientBedsData = data;
            },
            complete: function (XHR, TS) {
                _this.renderTitle();
                _this.renderHeader();
                _this.renderContent();
                XHR = null;
            }
        })
    },
    renderTitle: function () {
        this.settingValue($('.changeInput'), this.patientBedsData.BQName + '床位一览表')
    },
    getHZInfos: function (search) {
        var headerData = this.patientBedsData.HZInfos;
        for (var i = 0; i < headerData.length; i++) {
            if (headerData[i].XSNR == search) {
                return headerData[i].RS
            }
        }
    },
    settingValue: function (element, value) {
        element.html(value)
    },
    renderHeader: function () {
        this.settingValue($("[search='BRZS-病人总数'] span"), this.getHZInfos('病人总数'))
        this.settingValue($("[search='RY-入院'] span"), this.getHZInfos('入院'))
        this.settingValue($("[search='CY-出院'] span"), this.getHZInfos('出院'))
        this.settingValue($("[search='ZR-转入'] span"), this.getHZInfos('转入'))
        this.settingValue($("[search='ZC-转出'] span"), this.getHZInfos('转出'))
        this.settingValue($("[search='FM-分娩'] span"), this.getHZInfos('分娩'))
        this.settingValue($("[search='SS-手术'] span"), this.getHZInfos('手术'))
        this.settingValue($("[search='TJHL-特级护理'] span"), this.getHZInfos('特级护理'))
        this.settingValue($("[search='YJHL-I级护理'] span"), this.getHZInfos('I级护理'))
        this.settingValue($("[search='EJHL-II级护理'] span"), this.getHZInfos('II级护理'))
    },
    renderContent: function () {
        var contentData = this.patientBedsData.BRInfos;
        var contentDataChunk = jasmine.chunk(contentData, 60);
        var dom_string = '';
        console.log(contentData);
        for (var j = 0; j < contentDataChunk.length; j++) {
            dom_string += `<ul class="swiper-slide content">`
            for (var i = 0; i < contentDataChunk[j].length; i++) {
                dom_string += '<li class="' + this.getBackgroundColor(contentDataChunk[j][i].NAME, contentDataChunk[j][i].YEBZ, contentDataChunk[j][i].GRADE) + '">' +
                    '            <div class="content-header clear">' +
                    '                <div class="float-left">' + contentDataChunk[j][i].CH + '</div>' +
                    '                <div class="float-right">' + contentDataChunk[j][i].NAME + '</div>' +
                    '            </div>' +
                    '            <div class="content-body">' +
                    '                <img src="img/' + this.getImgType(contentDataChunk[j][i].NAME, contentDataChunk[j][i].SEX) + '.png" alt="">' +
                    '                <ul style="right: 20px;top: 8px;">';
                if (contentDataChunk[j][i].NAME) {
                    dom_string += '<li>年龄：<span>' + contentDataChunk[j][i].AGE + '</span></li>'
                    var DJ = contentDataChunk[j][i].WZZT.charAt(1);
                    if (DJ === '重' || DJ === '危') {
                        dom_string += '<li class="' + DJStyle(DJ) + ' status">' + DJ + '</li>';
                    } else {
                        dom_string += ''
                    }
                } else {
                    dom_string += '                    <li style="margin-top: 10px;margin-right: 24px">无</span></li>'
                }

                dom_string += '                </ul>' +
                    '            </div>' +
                    '        </li>'
            }
            dom_string += `</ul>`;
        }
        $('.swiper-wrapper').html(dom_string)

        function DJStyle(status) {
            switch (status) {
                case '危': //病危
                    return 'danger';
                    break;

                case '重'://病重
                    return 'sick';
                    break;
            }

        }
    },
    getBackgroundColor: function (name, yeby, grade) {
        if (name) {
            if (yeby === 0) {
                if (grade == 'I') {
                    return 'pink-background';
                } else if (grade == 'II') {
                    return 'blue-background';
                } else if (grade == 'III') {
                    return 'green-background';
                } else {
                    return 'normal-background';
                }
            } else {
                return 'baby-background';
            }
        } else {
            return 'normal-background'
        }
    },
    getImgType(name, sex) {
        if (name) {
            if (sex == '男') {
                return '男';
            } else if (sex == '女') {
                return '女';
            } else {
                return '其他'
            }
        } else {
            return '空'
        }
    },
    newDay: function () {
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
        if (mintes < 10) {
            mintes = '0' + mintes;
        }
        today = year + '-' + mouth + '-' + date;
        $('header .headtime').html(today + '&nbsp' + hour + ':' + mintes);
    },
}