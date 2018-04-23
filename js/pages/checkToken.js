new Vue({
    el: '.wrap',
    data: {
        tokenData: localStorage.getItem("userinfo"),
        code:''
    },
    methods:{
        filterToken:function(){
                var that = this;
                if( !that.tokenData )
                {
                    var code = that.getQueryString('code');
                    if( !code )
                    {
                        var hrefUrl = window.location.href;
                        hrefUrl = encodeURI(hrefUrl);
                        window.location.href = 'https://open.weixin.qq.com/connect/oauth2/authorize?appid=wxbe1cdb19d2290193&redirect_uri='+hrefUrl+'&response_type=code&scope=snsapi_base&state=STATE#wechat_redirect';
                    }else
                    {
                        that.code = code;
                        that.getWeixinUser();
                    }

                }else
                {
                    //检查token是否失效
                    that.checkToken();
                }
        },getWeixinUser:function ()
        {
            var code = this.code;
            $.ajax({
                type: "GET", //方法类型
                dataType: "json", //预期服务器返回的数据类型
                url: conf.get_openid+code, //url
                success: function(result) {
                    if ( result.status == 1 )
                    {
                        if( ! result.data.users )
                        {
                            window.location="../pages/regist.html";

                        }else
                        {
                            var data = JSON.stringify(result.data.users);
                            localStorage.setItem("userinfo", data);
                            window.location.href =  window.location.href;
                        }
                        localStorage.setItem("openid", result.data.openid);
                    }
                },
                error: function()
                {
                    alert( '请求失败' );
                }
            });
        },
        checkToken:function(){
            var url = auth_conf.token;
            var that = this;
            axios.get( url,{headers: {"Authorization": JSON.parse(that.tokenData).token} })
                .then(function (response)
                {
                    var data = response.data;
                    if(data.status!=1)
                    {
                        if(data.messages)
                        {
                            //alert(data.messages);
                            // layui.use('layer', function(id) {
                            //     var layer = layui.layer;
                            //     layer.msg(data.messages);
                            // });
                        }
                        localStorage.removeItem("userinfo");
                         that.tokenData=null;
                         window.location="../pages/login.html";
                    }

                })
                .catch(function (error)
                {
                    alert("Token验证异常");
                });
        },getQueryString:function( name )
        {
            var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)"); // 匹配目标参数
            var result = window.location.search.substr(1).match(reg); // 对querystring匹配目标参数
            if (result != null) {
                return decodeURIComponent(result[2]);
            }else
            {
                return null;
            }
        }
    }
    ,created: function () {
        var that = this;
        that.filterToken();//过滤token
    }
});


