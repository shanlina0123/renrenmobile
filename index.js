new Vue({
    el: '#index',
    data: {
        recommend: [],
        commission: [],
        tags: [],
        salestatus: []
    },
    methods: {
        getRecommend: function() {
            var url = conf.recommend;
            var that = this;
            axios.get(url)
                .then(function(response) {
                    var data = response.data;
                    if (data.status == 1) {
                        that.recommend = data.data;
                        that.changeTagColor();
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
        //更换tag颜色
        changeTagColor: function() {
            var round = Math.round(Math.random() * 4);
            var colorClass = ["colorRed", "colorGreen", "colorYellow", "colorBlue", "colorPurple"]
            $.each($(".colorTag span"), function(i, n) {
                $(n).addClass(colorClass[round]);
            })
        }
    },
    created: function() {
        var that = this;
        that.getDefaultData(); //默认属性
        that.getData(); //自定义属性
        that.getRecommend(); //推荐房源
    }
});