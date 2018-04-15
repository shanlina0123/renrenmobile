$(function(){
    //筛选tab切换
    $(".tabTable tr .td1").click(function(){
        $(".tabconWrap .areaTab").show().siblings().hide();
    });
    $(".tabTable tr .td2").click(function(){
        $(".tabconWrap .priceTab").show().siblings().hide();
    });
    $(".tabTable tr .td3").click(function(){
        $(".tabconWrap .roomTab").show().siblings().hide();
    });
    $(".forTab").click(function(){
        $(this).hide();
    })
});

new Vue({
    el: '#main',
    data: {
        params:{
            typeid:1,
        },
        houseList:[],
        commission:[],
        tags:[],
        roomtype:[]
    },
    methods:{
        getHouseList:function () {
            var url = conf.house_list;
            var that = this;
            axios.get( url,{params:that.params} )
                .then(function (response)
                {
                    var data = response.data;
                    if( data.status == 1 )
                    {
                        var list = data.data;
                        that.houseList = list.data;
                    }
                })
                .catch(function (error)
                {
                    //console.log(error);
                });
        },
        getData:function () {
            var url = conf.datas;
            var that = this;
            axios.get( url )
                .then(function (response)
                {
                    var data = response.data;
                    if( data.status == 1 )
                    {
                        //佣金规则
                        that.commission = data.data[1]['_child'];
                        //房型
                        that.roomtype = data.data[2]['_child'];
                        //房源标签
                        that.tags = data.data[5]['_child'];
                    }
                })
                .catch(function (error)
                {
                    //console.log(error);
                });
        },
        getDefaultData:function () {
            var url = conf.datas_default+'7';
            var that = this;
            axios.get( url )
                .then(function (response)
                {
                    var data = response.data;
                    if( data.status == 1 )
                    {
                        //销售状态
                        that.salestatus = data.data;
                    }
                })
                .catch(function (error)
                {
                    //console.log(error);
                });
        }
    },created: function () {
        var that = this;
        that.getDefaultData();//默认属性
        that.getData();//自定义属性
        that.getHouseList();//新房房源列表
    }
});