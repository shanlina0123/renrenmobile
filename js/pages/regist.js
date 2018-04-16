$(function(){
    //类型选择
    $(".formSelect").click(function(){
        $(".formUl").slideToggle();
    });
    $(".formUl li").click(function(){
        var thisText = $(this).text();
        $(".showForm ").text(thisText);
    });
    //表单验证
    $(".registForm").validate({
        errorLabelContainer: $(".errorLabel"),
        rules: {
            nickname: {
                required: true,
                maxlength: 10
            },
            mobile: {
                required: true,
                mobile:true
            },
            economictid:{
                required: true,
            }
        },
        messages: {
            nickname: {
                required: "请输入账户名",
                maxlength:"名称最长为10个字符"
            },
            mobile: {
                required: "请正确输入手机号"
            },
            economictid: {
                required: "请选择类型"
            }
        },submitHandler:function(form){
            $.ajax({
                type: "POST",//方法类型
                dataType: "json",//预期服务器返回的数据类型
                url: conf.regist ,//url
                data: $('#main').serialize(),
                success: function (result)
                {
                    if ( result.status == 1 )
                    {
                        window.location.href = 'login.html';
                    }else
                    {

                    }
                }
            });
        }
    })
})
new Vue({
    el: '#main',
    data: {
       type:[]
    },
    methods:{
        getData:function () {
            var url = conf.datas_default+9;
            var that = this;
            axios.get(url)
                .then(function (response) {
                    var data = response.data;
                    if ( data.status == 1 )
                    {
                        that.type = data.data;
                    }
                })
        },
        typeName:function (id,name) {
            $(".showForm").html(name);
            $("#economictid").val(id);
        }
    },created: function () {
        var that = this;
        that.getData();//自定义属性
    }
});