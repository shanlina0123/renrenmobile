
var lng='';
var lat='';
$(function(){
    //筛选tab切换
    $(".tabTable tr .td1").click(function(){
        $(".tabconWrap .areaTab").show().siblings().hide();
    });
    $(".tabTable tr .td2").click(function(){
        $(".tabconWrap .priceTab").show().siblings().hide();
    });
    $(".forTab").click(function(){
        $(this).hide();
    });
    //房源图片轮播
    new Swiper(".proImg", {
        speed: 3000,
        autoplay:true,
        pagination: '.pagination',
        paginationClickable: true,
    });
    //地图显示
    var center = new qq.maps.LatLng(lat,lng);
    var map = new qq.maps.Map(
        document.getElementById("roomMap"),
        {
            center: center,
            zoom: 13,
            zoomControl: false,
            mapTypeControlOptions: {
                mapTypeIds: [
                    qq.maps.MapTypeId.ROADMAP,
                ]
            }
        }
    );
    var marker = new qq.maps.Marker({
        position: center,
        map: map
    });
})
new Vue({
    el: '#main',
    data: {
        pathUrl:conf.pathUrl,
        id:'',
        info:'',
        commission:[],
        tagsData:[],
        roomtype:[],
        salestatus:[], //销售状态
        orientation:[],  //朝向
        floorpostion:[], //楼层
        decoratestyle:[], //装修
        ownership:[], //权属
        purpose:[],//用途
        hasdoublegas:[]//双气
    },
    methods:{
        getHouse:function () {
            var that = this;
            var id = this.id;
            var url = conf.house_info+id;
            axios.get( url )
                .then(function (response)
                {
                    var data = response.data;
                    if( data.status == 1 )
                    {
                        console.log( data.data );
                        that.info = data.data;
                        lng = data.data.lng;
                        lat = data.data.lat;
                    }
                })
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
                        //装修
                        that.decoratestyle = data.data[3]['_child'];
                        //房源标签
                        that.tagsData = data.data[5]['_child'];
                    }
                })
        },
        getQueryString:function ( name )
        {
            var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)"); // 匹配目标参数
            var result = window.location.search.substr(1).match(reg); // 对querystring匹配目标参数
            if (result != null) {
                return decodeURIComponent(result[2]);
            }else
            {
                return null;
            }
        },
        getDefaultData:function () {
            var url = conf.datas_defaults;
            var that = this;
            axios.get( url )
                .then(function (response)
                {
                    var data = response.data;
                    if( data.status == 1 )
                    {
                        //销售状态
                        that.salestatus = data.data[7]['_child'];
                        //朝向
                        that.orientation = data.data[3]['_child'];
                        //楼层
                        that.floorpostion = data.data[2]['_child'];
                        //权属
                        that.ownership = data.data[5]['_child'];
                        //用途
                        that.purpose = data.data[4]['_child'];
                        //双气
                        that.hasdoublegas = data.data[6]['_child'];
                    }
                })
        }
    },created: function () {
        var that = this;
        that.id = that.getQueryString('id');//获取id
        that.getData();//自定义属性
        that.getDefaultData();//销售状态
        that.getHouse();
    }
});
