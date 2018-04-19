$(function() {
    //类型选择
    $(".formSelect").click(function() {
        $(".formUl").slideToggle();
    });
    $(".formUl li").click(function() {
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
                mobile: true
            },
            economictid: {
                required: true,
            }
        },
        messages: {
            nickname: {
                required: "请输入账户名",
                maxlength: "名称最长为10个字符"
            },
            mobile: {
                required: "请正确输入手机号"
            },
            economictid: {
                required: "请选择类型"
            }
        },
        submitHandler: function(form) {
            $.ajax({
                type: "POST", //方法类型
                dataType: "json", //预期服务器返回的数据类型
                url: conf.regist, //url
                data: $('#main').serialize(),
                success: function(result) {
                    if (result.status == 1) {
                        //window.location.href = 'login.html';
                    } else {
                        layui.use('layer',  function()  {
                            var  layer  =  layui.layer;
                            layer.msg(result.messages);
                        });
                    }
                }
            });
        }
    })
})
new Vue({
    el: '#main',
    data: {
        type: [],
        code: '',
        openid: ''
    },
    methods: {
        getData: function() {
            var url = conf.datas_default + 9;
            var that = this;
            axios.get(url)
                .then(function(response) {
                    var data = response.data;
                    if (data.status == 1) {
                        that.type = data.data;
                    }
                })
        },
        typeName: function(id, name) {
            $(".showForm").html(name);
            $("#economictid").val(id);
        },
        getQueryString: function(name) {
            var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)"); // 匹配目标参数
            var result = window.location.search.substr(1).match(reg); // 对querystring匹配目标参数
            if (result != null) {
                return decodeURIComponent(result[2]);
            } else {
                return null;
            }
        },
        getOpenID: function() {
            var that = this;
            var code = that.getQueryString('code');
            var url = conf.get_openid + code;
            if (code) {
                axios.get(url)
                    .then(function(response) {
                        var data = response.data;
                        if (data.status == 1) {
                            that.openid = data.data.openid;
                        }
                    })
            }
        }
    },
    created: function() {
        var that = this;
        if (!that.getQueryString('code')) {
            window.location.href = 'https://open.weixin.qq.com/connect/oauth2/authorize?appid=wxbe1cdb19d2290193&redirect_uri=http%3A%2F%2Fwx.rrzhaofang.com%2Fpages%2Fregist.html&response_type=code&scope=snsapi_base&state=STATE#wechat_redirect';
        }
        that.getData(); //自定义属性
        that.getOpenID();
    }
});