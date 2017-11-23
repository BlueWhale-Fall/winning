/*!
 * jQuery xMarquee
 * http://zhangyexing.duapp.com/
 */
(function ($) {
    $.fn.xMarquee = function (options) {
        var del = {
            temp: -2, //滚动的长度，正整数的时候是向右滚动，负整数的时候是向左滚动（-2|2）
            speed: 80, //滚动的平率，单位为毫秒
            backMarquee: ''
        }

        var options = $.extend(del, options);
        var xM = $(this);
        var backMarquee = function (id, content) {}

        var _backMarquee = window[del.backMarquee];
        if (_backMarquee) {
            backMarquee = _backMarquee;
        }

        xM.each(function () {
            var fontW = 0;
            var t;
            var self = $(this).find("ul:first");
            var fli = self.find("li:first");
            var fla = self.find("li:last");
            var temp = parseInt(del.temp);
            var speed = parseInt(del.speed);
            var start = 0;
            for (var i = 0; i < self.find("li").length; i++) {
                self.find("li").eq(i).data("index", i);
                fontW += self.find("li").eq(i).outerWidth();
            }
            if (fontW < $(this).outerWidth()) {
                return;
            } //判断如文字的长度小于显示框的长度，则不执行marquee
            if (temp > 0) {
                self.css({
                    marginLeft: -self.find("li:last").outerWidth()
                });
                self.find("li:last").prependTo(self);
                start = -self.find("li:first").outerWidth();
            }
            var wrapw = $(this).outerWidth();

            function marquee() {
                if (temp < 0) {
                    if (-start > fli.outerWidth()) {
                        start = 0;
                        fli.appendTo(self);
                        backMarquee(self.find("li:first").data("index"), self.find("li:first").html());
                    } else if (-start == fli.outerWidth() && xM.selector.indexOf('xm') != -1) {
                        start = wrapw - 30;
                    }
                } else {
                    if (start > 0) {
                        self.find("li:last").prependTo(self);
                        start = -self.find("li:first").outerWidth();
                        backMarquee(self.find("li").eq(1).data("index"), self.find("li").eq(1).html());
                    }
                }
                fli = self.find("li:first");
                self.css({
                    marginLeft: start
                });
                start = start + temp;

            }
            t = setInterval(function () {
                marquee()
            }, speed);
            self.hover(function () {
                clearInterval(t);
            }, function () {
                t = setInterval(function () {
                    marquee()
                }, speed);
            })
        })
    }
})(jQuery);