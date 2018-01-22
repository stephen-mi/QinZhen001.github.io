/**
 * Created by qinzhen on 2018/1/22.
 */
//滚动条移动
$(document).ready(function () {
    $(window).scroll(function () {
        if ($(window).scrollTop() >= 200) {
            $('.back-to-top').css("top", '-90px');
        } else {
            $('.back-to-top').css("top", '-900px');
        }
    });
});


//鼠标点击时
$(document).ready(function () {
    $('.back-to-top').click(function () {
        $('body,html').animate({scrollTop: 0}, 500);
        $('.back-to-top').css("top", '-900px');
    })
})
