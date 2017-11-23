function waveLoop(myid) {
    var bgpos = document.getElementById(myid);
    var bgposX = getComputedStyle(bgpos).backgroundPosition.substr(0, 2);

    function loop() {
        if (bgposX < 80) {
            bgposX = bgposX + 3;
        } else {
            bgposX = 0;
        }
        bgpos.style.backgroundPosition = bgposX + 'px 40px';
    }

    setInterval(loop, 250);
}

waveLoop('wave1');
waveLoop('wave2');
waveLoop('wave3');

var wWrap = document.getElementsByClassName('wWrap');
wWrap[1].style.left = '319px';
wWrap[2].style.left = '474px';