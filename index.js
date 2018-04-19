new Vue({
    el: '#index',
    data: {
        recommend: [],
        commission: [],
        tags: [],
        salestatus: [],
        typeid: '1',
        tipsNum: '0'
    },
    methods: {
        typeStatus: function() {
            $(".selectText").slideToggle();
        },
        getTypeID: function(id, name) {
            this.typeid = id;
            $(".showText").html(name);
            $(".selectText").slideToggle();
        },
        getHouseList: function() {
            var that = this;
            var type = that.$refs.typeid.value;
            switch (parseInt(type)) {
                case 1:
                    window.location.href = 'pages/newRoomList.html?name=' + that.$refs.name.value;
                    break;
                case 2:
                    window.location.href = 'pages/oldRoomList.html?name=' + that.$refs.name.value;
                    break;
                case 3:
                    window.location.href = 'pages/roomList.html?name=' + that.$refs.name.value;
                    break;
            }
        },
        getRecommend: function() {
            var url = conf.recommend;
            var that = this;
            axios.get(url)
                .then(function(response) {
                    var data = response.data;
                    if (data.status == 1) {
                        that.recommend = data.data;
                    }
                })
                .catch(function(error) {
                    //console.log(error);
                });
        },
        getData: function() {
            var url = conf.datas;
            var that = this;
            axios.get(url)
                .then(function(response) {
                    var data = response.data;
                    if (data.status == 1) {
                        //佣金规则
                        that.commission = data.data[1]['_child'];
                        //房源标签
                        that.tags = data.data[5]['_child'];
                        that.tipsNum = that.tags
                    }
                })
                .catch(function(error) {
                    //console.log(error);
                });
        },
        getDefaultData: function() {
            var url = conf.datas_default + '7';
            var that = this;
            axios.get(url)
                .then(function(response) {
                    var data = response.data;
                    if (data.status == 1) {
                        //销售状态
                        that.salestatus = data.data;
                    }
                })
                .catch(function(error) {
                    //console.log(error);
                });
        },
        //进入推荐页面
        refreeClick: function(typeid, uuid,houseid,name) {
            var target_url = "typeid=" + typeid;
            if (uuid) {
                target_url += "&uuid=" + uuid;
            }
            if(houseid&&name)
            {
                target_url += "&houseid="+houseid+"&name="+name;
            }

            window.location.href = "../pages/recommend.html?" + encodeURIComponent(target_url);
        },
    },
    created: function() {
        var that = this;
        that.getDefaultData(); //默认属性
        that.getData(); //自定义属性
        that.getRecommend(); //推荐房源

    }
});

$(function() {
    var openid = localStorage.getItem("openid");
    if (!openid || openid == undefined || openid == 'undefined') {
        //window.location.href = 'https://open.weixin.qq.com/connect/oauth2/authorize?appid=wxbe1cdb19d2290193&redirect_uri=http%3A%2F%2Fwx.rrzhaofang.com%2Fweixin.html&response_type=code&scope=snsapi_base&state=STATE#wechat_redirect';
    }
});