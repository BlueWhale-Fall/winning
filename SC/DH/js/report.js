var reportUrl = 'data/report.json',
    reportNameUrl = 'data/zoomname.json',
    reportBQDM = window.localStorage.getItem('reportBQDM');

var _report = {
    reportInit: function () {
        $.ajax({
            url: reportUrl,
            type: "GET",
            dataType: "json",
            data: {
                bqdm: reportBQDM
            },
            error: function () {
                alert('error');
            },
            success: function (response) {
                _report.rendercontainer(response.KSInfos)
                _report.rendertablebox(response.DTInfos)
                $('table tr td').attr('contentEditable', 'true')
            }
        });
    },
    reportNameInit: function () {
        $.ajax({
            url: reportNameUrl,
            type: "GET",
            dataType: "json",
            data: {
                bqdm: reportBQDM
            },
            error: function () {
                alert('error');
            },
            success: function (response) {
                _report.reportName(response.BQInfos)
            }
        });
    },
    rendercontainer: function (data) {
        var content = $('.maintable table'),
            dom_strings = '<tr>' +
                '<th>科别</th>' +
                '<th>实际开放床日数</th>' +
                '<th>昨日人数</th>' +
                '<th>今日人数</th>' +
                '<th>入院</th>' +
                '<th>转入</th>' +
                '<th>出院</th>' +
                '<th>转出</th>' +
                '<th>死亡</th>' +
                '<th>借床回科</th>' +
                '<th>陪客数</th>' +
                '</tr>';
        if (data.length > 0) {
            var dom_string = '';
            for (var i = 0; i < data.length; i++) {
                var datum = data[i];
                dom_string = '<tr>' +
                    '<td>' + datum.KB + '</td>' +
                    '<td>' + datum.KFRS + '</td>' +
                    '<td>' + datum.ZRRS + '</td>' +
                    '<td>' + datum.JRRS + '</td>' +
                    '<td>' + datum.RY + '</td>' +
                    '<td>' + datum.ZR + '</td>' +
                    '<td>' + datum.CY + '</td>' +
                    '<td>' + datum.ZC + '</td>' +
                    '<td>' + datum.SW + '</td>' +
                    '<td>' + datum.JCHK + '</td>' +
                    '<td>' + datum.PKS + '</td>' +
                    '</tr>';
                dom_strings += dom_string;
            }
        } else {
            var dom_string = '';
            for (var j = 0; j < 3; j++) {
                dom_string = '<tr>' +
                    '<td></td>' +
                    '<td></td>' +
                    '<td></td>' +
                    '<td></td>' +
                    '<td></td>' +
                    '<td></td>' +
                    '<td></td>' +
                    '<td></td>' +
                    '<td></td>' +
                    '<td></td>' +
                    '<td></td>' +
                    '</tr>';
                dom_strings += dom_string;
            }
        }
        content.html(dom_strings);
    },
    rendertablebox: function (data) {
        console.log(data.length);
        var getTableLineCount = function (data) {
            var length = data.length;
            var lineCount = Math.round(length / 2);
            return lineCount < 7 ? 7 : lineCount;
        }
        var lineCount = getTableLineCount(data);
        console.log(lineCount);
        var table1Element = $(".ltable tbody");
        var table2Element = $(".rtable tbody");
        var table1ElementHtmlString = '';
        var table2ElementHtmlString = '';
        for (var i = 0; i < lineCount; i++) {

            table1ElementHtmlString += '<tr>';
            if (data.hasOwnProperty(i)) {
                table1ElementHtmlString += `<td>${data[i].DT}</td><td>${data[i].KB}</td><td>${data[i].XM}</td><td>${data[i].CH}</td><td>${data[i].BZ}</td>`
            } else {
                table1ElementHtmlString += `<td></td><td></td><td></td><td></td><td></td>`
            }
            table1ElementHtmlString += '</tr>';


            table2ElementHtmlString += '<tr>';
            if (data.hasOwnProperty(lineCount + i)) {
                table2ElementHtmlString += `<td>${data[lineCount + i].DT}</td><td>${data[lineCount + i].KB}</td><td>${data[lineCount + i].XM}</td><td>${data[lineCount + i].CH}</td><td>${data[lineCount + i].BZ}</td>`
            } else {
                table2ElementHtmlString += `<td></td><td></td><td></td><td></td><td></td>`
            }
            table2ElementHtmlString += '</tr>';
        }
        table1Element.html(table1ElementHtmlString);
        table2Element.html(table2ElementHtmlString);
    },
    print: function () {
        $('#print').click(function () {
            $(this).css('display', 'none')
            $('#return').css('display', 'none')
            window.print();
            $(this).css('display', 'block')
            $('#return').css('display', 'block')
        });
    },
    reportName: function (data) {
        for (var i = 0; i < data.length; i++) {
            var object = data[i];
            if (object.BQDM == reportBQDM) {
                $('.titlename input').val(object.BQName);
            } else {
                return;
            }
        }
    },
    newDay: function () {
        // var now,year,mouth,date,day,hour,mintes;
        var now = new Date;
        var year = now.getFullYear();   //年
        var mouth = now.getMonth() + 1; //月
        var date = now.getDate();       //日

        if (mouth < 10) {
            mouth = '0' + mouth;
        }
        if (date < 10) {
            date = '0' + date;
        }

        $('.date input').eq(0).val(year)
        $('.date input').eq(1).val(mouth)
        $('.date input').eq(2).val(date)
    }
}