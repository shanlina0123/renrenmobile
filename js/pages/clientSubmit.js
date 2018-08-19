new Vue({
    el: '#my_vue_client_submit',
    data: {
        house_name: null,
        add_params: { "name": null, "mobile": null, "houseid": null, "companyid": null, "remark": null ,"isappoint":0,"adminid":0},
        enter_params: { "name": null, "typeid": null, "uuid": null },
        search_params:{"name": null, "typeid": null, "uuid": null },
        company_list: [],
        house_list: [],
        admin_list:[],
        link_house_name:'',
        userInfoData: JSON.parse(localStorage.getItem("userinfo")),
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
            //房源-设置参数
            this.enter_params.typeid = this.GetQueryString("typeid");
            this.enter_params.uuid = this.GetQueryString("uuid");

            //房源搜索参数
            this.search_params.typeid = this.GetQueryString("typeid");

            //房源-推荐参数
            this.add_params.houseid=this.GetQueryString("houseid")
            this.add_params.name=this.GetQueryString("name");
            this.link_house_name=this.GetQueryString("name");
			 $("#selectHouse").val(this.link_house_name);
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
        //点击指定
        appointClick:function(id,name){
            var that=this;
            $(".appointShow").html(name);
            that.add_params.isappoint=id;
            if(id==1)
            {
                $(".adminList").removeClass("hidden");
                that.getAdminList();//业务员列表
            }else{
                $(".adminList").removeClass("hidden").addClass("hidden");
                that.add_params.adminid=0;
            }
            $(".appointUL").toggle();
        },
        //选择业务员
        adminClick:function (id,name) {
            var that=this;
            $(".adminShow").html(name);
            that.add_params.adminid=id;
            $(".adminUL").toggle();
        },
        //获取房源列表
        getHouseList: function() {
            var url = auth_conf.client_houses;
            var that = this;
            axios.post(url, that.search_params, { headers: { "Authorization": that.tokenValue } })
                .then(function(response) {
                    var data = response.data;
                    if (data.status == 1) {
                        that.house_list = data.data;
                        $(".hoseList").hide();
                    }
                })
                .catch(function(error) {
                    //console.log(error);
                });
        },
        //点击显示房源下拉框层
        showHouseList:function () {
            $(".forShowSearch").toggle();
        },
        //过滤列表
        keyHouseFilter:function () {
          var that=this;
           var inputValue=$.trim($("#selectHouse").val());
            if(inputValue)
            {
                var liFilter=$("#hoseList li:contains('"+inputValue+"')");
                if(liFilter.length>0)
                {
                    liFilter.addClass("filterShow").removeClass("hidden");
                }
                $("#hoseList li:not('.filterShow')").addClass("hidden");
            }else{
                $("#hoseList li").removeClass("filterShow").removeClass("hidden");
            }
            $("#hoseList").show();
        },
        //点击显示公司
        showCompanyClick: function(e) {
            var that=this;
            var inputValue=$.trim($("#companyName").val());
            if(inputValue)
            {
                var liFilter=$("#compayUL li:contains('"+inputValue+"')");
                if(liFilter.length>0)
                {
                    liFilter.addClass("filterShow").removeClass("hidden");
                }
                $("#compayUL li:not('.filterShow')").addClass("hidden");
            }else{
                $("#compayUL li").removeClass("filterShow").removeClass("hidden");
            }
            $("#compayUL").show();

        },
        //选择房源
        houseClick: function(id, name) {
            this.add_params.houseid = id;
            $(".selectHouse").val(name);
            $("#hoseList").attr("clickHouseName",name)
            $(".forShowSearch").hide();
        },
        //选择公司
        companyClick: function(id, name) {
            this.add_params.companyid = id;
            $(".companyShow").val(name);
            $(".compayUL").hide();
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
                        $(".compayUL").hide();
                    }
                })
                .catch(function(error) {
                    //console.log(error);
                });
        },
        //获取业务员列表
        getAdminList: function() {
            var url = auth_conf.client_chart_admin;
            var that = this;
            axios.get(url, { headers: { "Authorization": that.tokenValue } })
                .then(function(response) {
                    var data = response.data;
                    if (data.status == 1) {
                        that.admin_list = data.data;
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
            if ($("#hoseList").attr("clickHouseName") != $("#selectHouse").val()) {
                layui.use('layer', function (id) {
                    var layer = layui.layer;
                    layer.msg("请选择下拉框内的楼盘",{icon:7});
                });
                return;
            }
            if ($("#userName").val() == "" || $("#uPhone").val() == "") {
                layui.use('layer', function (id) {
                    var layer = layui.layer;
                    layer.msg("请输入客户名称或电话",{icon:7});
                });
                return;
            }
            if(that.add_params.isappoint==1&&that.add_params.adminid==0)
            {
                layui.use('layer', function (id) {
                    var layer = layui.layer;
                    layer.msg("请选择指定的业务员",{icon:7});
                });
                return;
            }
            that.add_params.name = that.$refs.name.value;
            that.add_params.mobile = that.$refs.mobile.value;
            that.add_params.remark = that.$refs.remark.value;
            //token
            axios.post(url, that.add_params, {headers: {"Authorization": that.tokenValue}})
                .then(function (response) {
                    var data = response.data;
                    if (data.status == 1) {
                        window.location.href = "../pages/myCustomer.html";
                    } else {
                        //  alert(data.messages)
                        layui.use('layer', function (id) {
                            var layer = layui.layer;
                            layer.msg(data.messages);
                        });
                    }
                    // console.log(response.data.status);
                }).catch(function (error) {
                layui.use('layer', function (id) {
                    var layer = layui.layer;
                    layer.msg("系统错误");
                });
            });
        }

    },
    created: function() {
        var that = this;
        that.checkAfterAdmin(); //检查是否业务员
        that.enterParam();
        that.getHouseList();//获取房源列表
    }
});

