$(function() {
    //筛选tab切换
    $(".tabTable tr .td1").click(function() {
        $(".tabconWrap .areaTab").show().siblings().hide();
    });
    $(".tabTable tr .td2").click(function() {
        $(".tabconWrap .priceTab").show().siblings().hide();
    });
    $(".tabTable tr .td3").click(function() {
        $(".tabconWrap .roomTab").show().siblings().hide();
    });
    //筛选条件选中样式
    $(".topsort li").click(function() {
        $(this).addClass("on").siblings().removeClass("on");
    })
});

var vm = new Vue({
    el: '#main',
    data: {
        params: {
            typeid: 1,
            name: '',
            price: '',
            roomtypeid: '',
            page: 1
        },
        houseList: [],
        commission: [],
        tags: [],
        roomtype: [],
        salestatus: [],
        priceE: '',
        priceS: '',
        pages: 0
    },
    methods: {

        getHouseList: function() {
            $(".forTab").hide();
            var url = conf.house_list;
            var that = this;
            axios.get(url, { params: that.params })
                .then(function(response) {
                    var data = response.data;
                    if (data.status == 1) {
                        var list = data.data;
                        that.houseList = list.data;
                        that.pages = list.last_page;
                    }
                })
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
                        //房型
                        that.roomtype = data.data[2]['_child'];
                        //房源标签
                        that.tags = data.data[5]['_child'];
                    }
                })
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
        search: function() {
            var name = this.$refs.name.value;
            this.params.name = name;
            this.getHouseList();
        }, //价格区间
        liData: function(price) {
            var that = this;
            that.params.price = price;
            that.priceE = '';
            that.priceS = '';
        }, //房型区间
        roomData: function(id) {
            this.params.roomtypeid = id;
        }, //开始价格
        changePriceS: function(value) {
            this.priceS = value;
            this.params.price = value + '-' + this.priceE;
        }, //结束价格
        changePriceE: function(value) {
            this.priceE = value;
            this.params.price = this.priceS + '-' + value;
        }, //上拉加载
        handleScroll: function() {
            var that = this;
            var lis = that.houseList;

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
        //进入推荐页面
        refreeClick: function(typeid, uuid) {
            var target_url = "typeid=" + typeid;
            if (uuid) {
                target_url += "&uuid=" + uuid;
            }

            window.location.href = "../pages/recommend.html?" + encodeURIComponent(target_url);
        }
    },
    created: function() {
        var that = this;
        that.getDefaultData(); //默认属性
        that.getData(); //自定义属性
        that.params.name = that.getQueryString('name'); //获取name
        //that.getHouseList();//新房房源列表
    }
});

/**
 * 加载分页
 */
layui.use('flow', function() {
    var flow = layui.flow;
    flow.load({
        elem: '.samePadding' //指定列表容器
            ,
        done: function(page, next) { //到达临界点（默认滚动触发），触发下一页
            vm.params.page = page;
            var url = conf.house_list;
            var oldlist = vm.$data.houseList;
            axios.get(url, { params: vm.$data.params })
                .then(function(response) {
                    var data = response.data;
                    if (data.status == 1) {
                        var list = data.data;
                        vm.$data.pages = list.last_page;
                        vm.$data.houseList = oldlist.concat(list.data)
                    }
                    next($("#roomListUl li").html(), page < vm.$data.pages);
                })

        }
    });
});