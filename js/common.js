
//顶部搜索筛选部分
$(".searchselect").click(function(){
    $(".selectText").slideToggle();
});
$(".selectText li").click(function(){
    var thisText = $(this).text();
    $(".showText ").text(thisText);
});
//表单验证信息提示
setInterval(function () {
    $(".errorLabel").hide();
}, 3000);
//tab切换
// var BtnTab = function (titleItems, contentItems) {
//     var $ti = $(titleItems);
//     var $ci = $(contentItems);
//     var index = 0;
//     $ti.each(function (i) {
//         $(this).click(function () {
//             index = i;
//             $ci.eq(i).show().siblings().hide();
//             return false;
//         });
//     });
//     this.next = function () {
//         if ((index + 1) == $ti.length) {
//             return;
//         }
//         index++;
//         $ti.eq(index).click();
//     }
//     $ti.eq(index).click();
// }