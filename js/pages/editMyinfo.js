new Vue({
    el: '#my_vue_client_edit',
    data: {
        edit_params: { "mobile": null },
        tokenValue: JSON.parse(localStorage.getItem("userinfo")).token
    },
    methods: {
        GetQueryString: function(name) {
            var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)");
            var url_param = decodeURIComponent(window.location.search)
            var r = url_param.substr(1).match(reg);
            if (r != null) return unescape(r[2]);
            return null;
        },
        //其他链接进去的参数获取
        enterParam: function() {
            $("#myinfo_name").html(this.GetQueryString("name")) ;
            $("#myinfo_mobile").html(this.GetQueryString("mobile")) ;
        },
        //修改信息
        editMyinfoClick: function() {
            var url = auth_conf.client_editInfo;
            var that = this;
            that.edit_params.mobile = that.$refs.mobile.value;
            $("#editMyInoForm").validate({
                errorLabelContainer: $(".errorLabel"),
                rules: {
                    uPhone: {
                        required: true,
                        mobile: true
                    }
                },
                messages: {
                    uPhone: {
                        required: "请输入手机号",
                        mobile: "请正确请输入手机号"
                    }
                },submitHandler:function(form){
                //token
                    axios.post(url, that.edit_params, { headers: { "Authorization": that.tokenValue } })
                        .then(function(response) {
                            var data = response.data;
                            if (data.status == 1) {
                                window.location.href = "../pages/my.html";
                            }else{
                               // alert(data.messages);
                                layui.use('layer', function(id) {
                                    var layer = layui.layer;
                                    layer.msg(data.messages);
                                });
                            }
                            // console.log(response.data.status);
                        }).catch(function(error) {
                        layui.use('layer', function(id) {
                            var layer = layui.layer;
                            layer.msg("系统错误");
                        });
                        //console.log(error);
                        // console.log(this);
                    });
                }
            })

        }

    },
    created: function() {
        var that = this;
        that.enterParam();
    }
});