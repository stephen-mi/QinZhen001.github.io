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

var spig_top = 0;
var recordedScrollTop = 0;

var initMove = false; //初始化移动
var isMove = false; //移动标记
var _x, _y; //鼠标离控件左上角的相对位置

//鼠标在消息上时
jQuery(document).ready(function ($) {

  var $spig = $('#spig')

  spig_top = parseInt($spig.css("top"));
  recordedScrollTop = $(window).scrollTop();

  var wx = $(window).width() - $spig.width();
  var dy = $(document).height() - $spig.height();


  //鼠标在上方时
  //$(".mumu").jrumble({rangeX: 2,rangeY: 2,rangeRot: 1});
  $spig.mouseenter(function () {
    var i = Math.floor(Math.random() * msgs.length);
    showMessage(msgs[i]);
  })

  //滚动条移动
  $(window).scroll(function (e) {
    $spig.animate({
      top: parseInt($(window).scrollTop() - recordedScrollTop + spig_top)
    }, {
      queue: false,
      duration: 1000
    });
  });


  $spig.mousedown(function (e) {
    initMove = true;
    _x = e.pageX - parseInt($spig.css("left"));
    _y = e.pageY - parseInt($spig.css("top"));
    e.stopPropagation()
    //chrome、ff、IE9下阻止默认行为
    return false;
  })

  $(window).mousemove(function (e) {
    if (initMove) {
      isMove = true;
      var x = e.pageX - _x;
      var y = e.pageY - _y;
      if (x > 0 && x < wx && y > 0 && y < dy) {
        //控件新位置
        $spig.css({
          top: y,
          left: x
        })
      }
    }
    e.stopPropagation()
  }).mouseup(function (e) {
    if (initMove && isMove) {
      spig_top = parseInt($spig.css("top"));
      recordedScrollTop = $(window).scrollTop()
      initMove = false;
      isMove = false;
      //chrome、ff、IE9下阻止默认行为
      return false;
    }
  })


});


//显示消息函数
function showMessage(a, b) {
  if (b == null) b = 10000;
  jQuery("#message").hide().stop().html(a).fadeIn().fadeTo("1", 1).fadeOut(b);
};



