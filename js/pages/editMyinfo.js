new Vue({
    el: '#my_vue_client_edit',
    data: {
        edit_params: { "name": null, "mobile": null, "houseid": null, "companyid": null, "remark": null },
        tokenValue: JSON.parse(sessionStorage.getItem("userinfo")).token
    },
    methods: {
        //修改信息
        editMyinfoClick: function() {
            var url = auth_conf.client_refree;
            var that = this;
            that.validate();
            that.add_params.name = that.$refs.name.value;
            that.add_params.mobile = that.$refs.mobile.value;
            that.add_params.remark = that.$refs.remark.value;
            //token
            axios.post(url, that.add_params, { headers: { "Authorization": that.tokenValue } })
                .then(function(response) {
                    var data = response.data;
                    if (data.status == 1) {
                        window.location.href = "../pages/myCustomer.html";
                    }
                    // console.log(response.data.status);
                }).catch(function(error) {
                    //console.log(error);
                    // console.log(this);
                });
        },
        validate: function() {
            $(".recommendForm").validate({
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
                }
            })
        }
    },
    created: function() {
        var that = this;
    }
});