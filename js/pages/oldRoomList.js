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
})

new Vue({
    el: '#main',
    data: {
        params:{
            typeid:2,
            name:'',
            price:'',
            roomtypeid:''
        },
        houseList:[],
        commission:[],
        tags:[],
        roomtype:[],
        priceE:'',
        priceS:'',
    },
    methods:{
        getHouseList:function () {
            var url = conf.house_list;
            var that = this;
            $(".forTab").hide();
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
            axios.get(url)
                .then(function (response) {
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
                .catch(function (error) {
                    //console.log(error);
                });
        },search:function () {
            var name = this.$refs.name.value;
            this.params.name = name;
            this.getHouseList();
        },//价格区间
        liData:function ( price ) {
            var that = this;
            that.params.price = price;
            that.priceE = '';
            that.priceS = '';
        },//房型区间
        roomData:function ( id ) {
            this.params.roomtypeid = id;
        },//开始价格
        changePriceS:function ( value ) {
            this.priceS = value;
            this.params.price =  value+'-'+this.priceE;
        },//结束价格
        changePriceE:function ( value ) {
            this.priceE = value;
            this.params.price = this.priceS+'-'+value;
        }
    },created: function () {
        var that = this;
        that.getData();//自定义属性
        that.getHouseList();//新房房源列表
    }
});