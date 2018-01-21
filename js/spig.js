/*
 *作者木木
 *http://www.dao-gu.com
 *在原基础上进行了增删
 */


var msgs = msgs = ["你会不会喜欢上我呀?(｡･ω･)ﾉﾞ",
    "我已经有三个喜欢的人了。就是你呀,你呀,你呀。⁄(⁄ ⁄•⁄ω⁄•⁄ ⁄)⁄",
    "嘤嘤嘤,又摸我<br/>(≖ ‿ ≖)✧",
    "非礼呀！救命！<br/>(*´Д｀*)",
    "天凉了,一个人注意多穿衣服,别感冒了。<br/> (ง •̀_•́)ง",
    "脚好酸,踩到柠檬了<br/>( >﹏<。)",
    "Wo要吃棒棒糖<br/>✪ω✪",
    "呜~你欺负人家~讨厌死了啦(,,• ₃ •,,)",
    "喵.喵..喵... \\(•ㅂ•)/♥ "];

//鼠标在消息上时
jQuery(document).ready(function ($) {
    $("#message").hover(function () {
        $("#message").fadeTo("100", 1);
    });
});


//鼠标在上方时
jQuery(document).ready(function ($) {
    //$(".mumu").jrumble({rangeX: 2,rangeY: 2,rangeRot: 1});
    $(".mumu").mouseover(function () {
        $(".mumu").fadeTo("300", 0.8);
        var i = Math.floor(Math.random() * msgs.length);
        showMessage(msgs[i]);
    });
    $(".mumu").mouseout(function () {
        $(".mumu").fadeTo("300", 1)
    });
});


//滚动条移动
jQuery(document).ready(function ($) {
    var f = parseInt($(".spig").css("top"));
    $(window).scroll(function () {
        $(".spig").animate({
                top: $(window).scrollTop() + f
            },
            {
                queue: false,
                duration: 1000
            });
    });
});

//鼠标点击时
jQuery(document).ready(function ($) {
    $(".mumu").click(function () {
        // console.log('click', isMove)
        if (!isMove) {
            var i = Math.floor(Math.random() * msgs.length);
            showMessage(msgs[i])
        } else {
            isMove = false;
        }
    });
});
//显示消息函数
function showMessage(a, b) {
    if (b == null) b = 10000;
    jQuery("#message").hide().stop();
    jQuery("#message").html(a);
    jQuery("#message").fadeIn();
    jQuery("#message").fadeTo("1", 1);
    jQuery("#message").fadeOut(b);
};

//拖动
var initMove = false;
var isMove = false; //移动标记
var _x, _y; //鼠标离控件左上角的相对位置
jQuery(document).ready(function ($) {
    $("#spig").mousedown(function (e) {
        initMove = true;
        _x = e.pageX - parseInt($("#spig").css("left"));
        _y = e.pageY - parseInt($("#spig").css("top"));
    });
    $(document).mousemove(function (e) {
        if (initMove) {
            var x = e.pageX - _x;
            var y = e.pageY - _y;
            var wx = $(window).width() - $('#spig').width();
            var dy = $(document).height() - $('#spig').height();
            if (x >= 0 && x <= wx && y > 0 && y <= dy) {
                $("#spig").css({
                    top: y,
                    left: x
                }); //控件新位置
                if (!isMove) {
                    // 第一次的时候还没有更改isMove的状态
                    $("#spig").fadeTo("300", 0.5);
                }
                isMove = true;
            }
        }
    }).mouseup(function () {
        if (isMove) {
            $("#spig").fadeTo("300", 1);
        }
        initMove = false;
        isMove = false;
    });
});
