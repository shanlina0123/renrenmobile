//顶部搜索筛选部分
$(".searchselect").click(function() {
    $(".selectText").slideToggle();
});
$(".selectText li").click(function() {
    var thisText = $(this).text();
    $(".showText ").text(thisText);
});
//表单验证信息提示
setInterval(function() {
    $(".errorLabel").hide();
}, 3000);