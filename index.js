$(".selectText li").click(function(){
    var thisText = $(this).text();
    $(".showText ").text(thisText);
    $(this).parents('.bannerSearch').find("input[type=hidden]").val($(this).data('id'));
});
new Vue({
    el: '#index',
    data: {
        recommend:[],
        commission:[],
        tags:[],
        salestatus:[],
    },
    methods:{
        getHouseList:function ()
        {
            var that = this;
            var type = that.$refs.typeid.value;
                switch ( parseInt(type) )
                {
                    case 1:
                        window.location.href = 'pages/newRoomList.html?name='+that.$refs.name.value;
                        break;
                    case 2:
                        window.location.href = 'pages/oldRoomList.html?name='+that.$refs.name.value;
                        break;
                    case 3:
                        window.location.href = 'pages/roomList.html?name='+that.$refs.name.value;
                        break;
                }
        },
        getRecommend:function () {
            var url = conf.recommend;
            var that = this;
            axios.get( url )
                .then(function (response)
                {
                    var data = response.data;
                    if( data.status == 1 )
                    {
                        that.recommend = data.data;
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
        that.getRecommend();//推荐房源

    }
});
