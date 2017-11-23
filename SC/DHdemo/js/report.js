var reportUrl = 'data/report.json',
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
    rendercontainer: function (data) {
        var num = 4-data.length,
            content = $('.maintable table'),
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
        for (var i = 0; i < data.length; i++) {
            if(i < 4) {
                var datum = data[i];
                var dom_string = '<tr>' +
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
        }
        if(num > 0) {
            for(var i = 0; i < num; i++) {
                var dom_string = '<tr>' +
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
        var dom = $('.tablebox tbody tr')
        for(var i = 0; i < data.length; i++) {
            if (i < 14) {
                $(dom[i]).html('<td>'+ data[i].DT +'</td>'+'<td>'+ data[i].KB +'</td>'+'<td>'+ data[i].XM +'</td>'+'<td>'+ data[i].CH +'</td>'+'<td>'+ data[i].BZ +'</td>')
            }
        }
    },
    print: function () {
        $('#print').click(function () {
            $(this).css('display', 'none')
            $('#return').css('display', 'none')
            window.print();
            $(this).css('display', 'block')
            $('#return').css('display', 'block')
        });
    }
}