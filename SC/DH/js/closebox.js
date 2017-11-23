function triggerbox(tag, boxname) {
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
        if(boxname == 'countDetail') {
    		box.style.display = 'none';
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
        if(boxname == 'countDetail') {
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
                triggerbox(1, boxname);
            }
        }
    });
}