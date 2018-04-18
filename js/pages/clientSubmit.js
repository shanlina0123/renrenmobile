new Vue({
    el: '#my_vue_client_submit',
    data: {
        house_name: null,
        add_params: { "name": null, "mobile": null, "houseid": null, "companyid": null, "remark": null },
        search_params: { "name": null, "typeid": null, "uuid": null },
        company_list: [],
        house_list: [],
        userInfoData:JSON.parse(sessionStorage.getItem("userinfo")),
        tokenValue: JSON.parse(sessionStorage.getItem("userinfo")).token
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
            this.search_params.typeid = this.GetQueryString("typeid");
            this.search_params.uuid = this.GetQueryString("uuid");
        },
        //检查是否内部外部人源
        checkAfterAdmin: function() {
            var that = this;
            if (that.userInfoData.isadminafter == 1) {
                $(".afteradmin").addClass("isShow");
            } else {
                $(".afteradmin").removeClass("isShow");
                that.getCompanyList(); //公司列表
            }
        },
        //点击显示房源-模糊搜索
        showHouseClick: function(house_name) {
            var url = auth_conf.client_houses;
            var that = this;
            that.house_name = house_name;
            that.house_name ? that.search_params.name = that.house_name : null;
            axios.post(url, that.search_params, { headers: { "Authorization": that.tokenValue } })
                .then(function(response) {
                    var data = response.data;
                    if (data.status == 1) {
                        that.house_list = data.data;
                        $(".forShowSearch").show();
                    } else if (data.status == 4) {
                        that.house_list = data.data;
                        $(".forShowSearch").hide();
                    } else {
                        $(".forShowSearch").hide();
                    }
                })
                .catch(function(error) {
                    //console.log(error);
                });
        },
        //点击显示公司
        showCompanyClick: function() {
            if ($(".formUl")[0].childElementCount == 0) {
                $(".formUl").hide();
            } else {
                $(".formUl").show();
            }

        },
        //选择房源
        houseClick: function(id, name) {
            this.add_params.houseid = id;
            $(".selectHouse").val(name);
            $(".forShowSearch").hide();
        },
        //选择公司
        companyClick: function(id, name) {
            this.add_params.companyid = id;
            $(".showForm").html(name);
            $(".formUl").hide();
        },
        //获取公司列表
        getCompanyList: function() {
            var url = auth_conf.client_compnay;
            var that = this;
            axios.get(url, { headers: { "Authorization": that.tokenValue } })
                .then(function(response) {
                    var data = response.data;
                    if (data.status == 1) {
                        that.company_list = data.data;
                        $(".formUl").hide();
                    }
                })
                .catch(function(error) {
                    //console.log(error);
                });
        },
        //立即推荐
        submitClick: function() {
            var url = auth_conf.client_refree;
            var that = this;
            that.add_params.name = that.$refs.name.value;
            that.add_params.mobile = that.$refs.mobile.value;
            that.add_params.remark = that.$refs.remark.value;
            $(".recommendForm").validate({
                errorLabelContainer: $(".errorLabel"),
                rules: {
                    userName: {
                        required: true
                    },
                    uPhone: {
                        required: true,
                        mobile: true
                    },
                    selectHouse: {
                        required: true
                    }
                },
                messages: {
                    userName: {
                        required: "请输入客户姓名"
                    },
                    uPhone: {
                        required: "请输入手机号",
                        mobile: "请正确请输入手机号"
                    },
                    selectHouse: {
                        required: "请选择楼盘"
                    }
                },submitHandler:function(form){
                    //token
                    axios.post(url, that.add_params, { headers: { "Authorization": that.tokenValue } })
                        .then(function(response) {
                            var data = response.data;
                            if (data.status == 1) {
                                window.location.href = "../pages/myCustomer.html";
                            }else{
                                alert(data.messages)
                            }
                            // console.log(response.data.status);
                        }).catch(function(error) {
                        //console.log(error);
                        // console.log(this);
                    });

                }
            })

        }
    },
    created: function() {
        var that = this;
        that.checkAfterAdmin(); //检查是否业务员
        that.enterParam();
    }
});