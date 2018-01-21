/*
 *作者木木
 *
 *http://www.dao-gu.com
 */
//右键菜单
// jQuery(document).ready(function ($) {
//     $("#spig").mousedown(function (e) {
//         if (e.which == 3) {
//             showMessage("秘密通道:<br />    <a href=\"http://www.anotherhome.net\" title=\"首页\">首页</a>    <a href=\"http://www.anotherhome.net/?page_id=366\" title=\"项目\">项目</a>    <a href=\"http://www.anotherhome.net/wp-login.php\" title=\"后台\">后台</a> ", 10000);
//         }
//     });
//     $("#spig").bind("contextmenu", function (e) {
//         return false;
//     });
// });


var msgs = msgs = ["你会不会喜欢上我呀?(｡･ω･)ﾉﾞ",
    "我已经有三个喜欢的人。你呀，你呀，你呀。⁄(⁄ ⁄•⁄ω⁄•⁄ ⁄)⁄",
    "嘤嘤嘤,又摸我(≖ ‿ ≖)✧",
    "非礼呀！救命！(*´Д｀*)",
    "天凉了,一个人注意多穿衣服别感冒了(ง •̀_•́)ง",
    "脚好酸,踩到柠檬了( >﹏<。)",
    "Wo要吃棒棒糖✪ω✪",
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


// //无聊动动
// jQuery(document).ready(function ($) {
//     window.setInterval(function () {
//         msgs = ["播报明日天气<iframe name=\"xidie\" src=\"http://t.xidie.com/skin/2010-0601.html\"frameborder=\“0\” scrolling=\"no\" height=\"15px\"  width=\"130px\" allowtransparency=\"true\" ></iframe>", "乾坤大挪移！", "我飘过来了！~", "我飘过去了", "我得意地飘！~飘！~"];
//         var i = Math.floor(Math.random() * msgs.length);
//         s = [0.1, 0.2, 0.3, 0.4, 0.5, 0.6, 0.7, 0.75, -0.1, -0.2, -0.3, -0.4, -0.5, -0.6, -0.7, -0.75];
//         var i1 = Math.floor(Math.random() * s.length);
//         var i2 = Math.floor(Math.random() * s.length);
//         $(".spig").animate({
//                 left: document.body.offsetWidth / 2 * (1 + s[i1]),
//                 top: document.body.offsetheight / 2 * (1 + s[i1])
//             },
//             {
//                 duration: 2000,
//                 complete: showMessage(msgs[i])
//             });
//     }, 45000);
// });


var spig_top = 50;
//滚动条移动
jQuery(document).ready(function ($) {
    var f = $(".spig").offset().top;
    $(window).scroll(function () {
        $(".spig").animate({
                top: $(window).scrollTop() + f + 300
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
        console.log('click', ismove)
        if (!ismove) {
            var i = Math.floor(Math.random() * msgs.length);
            $(".spig").animate({},
                {
                    duration: 500,
                    complete: showMessage(msgs[i])
                });
        } else {
            ismove = false;
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
var _move = false;
var ismove = false; //移动标记
var _x, _y; //鼠标离控件左上角的相对位置
jQuery(document).ready(function ($) {
    $("#spig").mousedown(function (e) {
        _move = true;
        _x = e.pageX - parseInt($("#spig").css("left"));
        _y = e.pageY - parseInt($("#spig").css("top"));
    });
    $(document).mousemove(function (e) {
        if (_move) {
            var x = e.pageX - _x;
            var y = e.pageY - _y;
            var wx = $(window).width() - $('#spig').width();
            var dy = $(document).height() - $('#spig').height();
            if (x >= 0 && x <= wx && y > 0 && y <= dy) {
                $("#spig").css({
                    top: y,
                    left: x
                }); //控件新位置
                ismove = true;
            }
        }
    }).mouseup(function () {
        _move = false;
        ismove = false;
    });
});
