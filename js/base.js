/**
 * 自适应各种分辨率
 * @return none
 */
function widthAdapter() {
    var r = document.documentElement;
    var a = r.getBoundingClientRect().width;

    if (a > 750) {
        a = 750;
    } else if (a < 320) {
        a = 320;
    };

    rem = a / 6.5;
    r.style.fontSize = rem + 'px';
};

$(function () {
    widthAdapter();
    window.addEventListener('resize',function(){
        clearTimeout(t);
        var t = setTimeout(widthAdapter,300)
    },false);
});
