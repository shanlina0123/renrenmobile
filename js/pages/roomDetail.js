new Vue({
    el: '#main',
    data: {
        pathUrl: conf.pathUrl,
        id: '',
        info: '',
        commission: [],
        tagsData: [],
        roomtype: [],
        salestatus: [], //销售状态
        orientation: [], //朝向
        floorpostion: [], //楼层
        decoratestyle: [], //装修
        ownership: [], //权属
        purpose: [], //用途
        hasdoublegas: [], //双气
        lat: '',
        lng: '',
        connect_tel: '',
        imgs: []
    },
    methods: {
        getHouse: function() {
            var that = this;
            var id = this.id;
            var url = conf.house_info + id;
            axios.get(url)
                .then(function(response) {
                    var data = response.data;
                    if (data.status == 1) {
                        that.info = data.data;
                        that.lng = data.data.lng;
                        that.lat = data.data.lat;
                        that.imgs = data.data.image;
                        that.getMap();
                        that.getImages();
                    }
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
                        //房型
                        that.roomtype = data.data[2]['_child'];
                        //装修
                        that.decoratestyle = data.data[3]['_child'];
                        //房源标签
                        that.tagsData = data.data[5]['_child'];
                    }
                })
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
        getDefaultData: function() {
            var url = conf.datas_defaults;
            var that = this;
            axios.get(url)
                .then(function(response) {
                    var data = response.data;
                    if (data.status == 1) {
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
        },
        getMap: function() {
            //地图显示
            var center = new qq.maps.LatLng(this.lat, this.lng);
            var map = new qq.maps.Map(
                document.getElementById("roomMap"), {
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
        },
        getImages: function() {
            var arr = this.imgs;
            var path = this.pathUrl;
            var str = '';
            for (var index = 0; index < arr.length; index++) {
                str += '<a href="#" class="swiper-slide" ><img src="' + path + arr[index].url + '" /></a>';
            }
            $(".swiper-wrapper").append(str);
            //房源图片轮播
            new Swiper(".proImg", {
                speed: 3000,
                autoplay: true,
                pagination: '.pagination',
                paginationClickable: false,
            });
        }
    },
    created: function() {
        var that = this;
        that.id = that.getQueryString('id'); //获取id
        that.getData(); //自定义属性
        that.getDefaultData(); //销售状态
        that.getHouse();
    }
});

new Vue({
    el: '#fortell',
    data: {
        connect_tel: '',
    },
    methods: {
        getMyConf: function() {
            var url = conf.web_conf;
            var that = this;
            axios.get(url)
                .then(function(response) {
                    var data = response.data;
                    if (data.status == 1) {
                        that.connect_tel = data.data[1]["_child"][2]["content"];
                    }
                })
                .catch(function(error) {
                    //console.log(error);
                });
        },
        refreeClick: function(typeid, uuid, houseid, name) {
            var target_url = "typeid=" + typeid;
            if (uuid) {
                target_url += "&uuid=" + uuid;
            }
            if (houseid && name) {
                target_url += "&houseid=" + houseid + "&name=" + name;
            }

            window.location.href = "recommend.html?" + encodeURIComponent(target_url);
        }
    },
    created: function() {
        var that = this;
        that.getMyConf();
    }
});

$(function() {
    //筛选tab切换
    $(".tabTable tr .td1").click(function() {
        $(".tabconWrap .areaTab").show().siblings().hide();
    });
    $(".tabTable tr .td2").click(function() {
        $(".tabconWrap .priceTab").show().siblings().hide();
    });
    $(".forTab").click(function() {
        $(this).hide();
    });
})