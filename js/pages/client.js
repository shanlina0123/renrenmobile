$(function(){

    //搜索栏 - 客户状态点击
    $(".showText").click(function(){
        if($(".selectText").css("display") == "none"){
            $(".selectText").show();
        }else{
            $(".selectText").hide();
        }
    });


    //等级选择效果实现
    $(".levelEdit").click(function(){
        if($(".levePop").css("display") == "none"){
            $(".levePop").show();
        }else{
            $(".levePop").hide();
        }
    });
    $(".levePop .popUl li").click(function(){
        var thisText = $(this).text();
        $(".levelShow").text(thisText);
        $(".levePop").hide();
    });
    //客户状态效果实现
    $(".stateEdit").click(function(){
        if($(".statePop").css("display") == "none"){
            $(".statePop").show();
        }else{
            $(".statePop").hide();
        }
    });
    $(".statePop .popUl li").click(function(){
        var thisText = $(this).text();
        $(".stateShow").text(thisText);
        $(".statePop").hide();
    });


})
new Vue({
    el: '#my_vue_client',
    data: {
        params:{name:null,followstatusid:null},
        client_statistics:[],
        client_list:[],
        level_datas:[],
        default_followstatus_datas:[]
    },
    methods:{
        statusClick:function(id){
          this.params.followstatusid=id;
        },
        searchClick:function(){
            this.params.name=this.$refs.name.value;
        },
        getClientStatistics:function () {
            var url = auth_conf.client_statistics;
            var that = this;
            axios.get( url,{headers: {"Authorization": "t1l5oYcNhqO8SDsrRupuam4llFWoQCK977oYyZsVSQ9dlxOX8lscGVY1Cnh2"} })
                .then(function (response)
                {
                    var data = response.data;
                    if( data.status == 1 )
                    {
                        that.client_statistics = data.data;
                    }
                })
                .catch(function (error)
                {
                    //console.log(error);
                });
        },
        getClientList:function () {
            var url = auth_conf.client_list;
            var that = this;
            axios.post(url,params,{headers: {"Authorization": "t1l5oYcNhqO8SDsrRupuam4llFWoQCK977oYyZsVSQ9dlxOX8lscGVY1Cnh2"} })
                .then(function (response) {
                    var data = response.data;
                    if( data.status == 1 )
                    {
                        that.client_list = data.data.data;
                    }
                    // console.log(response.data.status);
                }).catch(function (error) {
                //console.log(error);
                // console.log(this);
            });
        },
        getDefaultDataOne:function () {
            var url = auth_conf.datas_default_user_one_list+"8";
            var that = this;
            axios.get( url,{headers: {"Authorization": "t1l5oYcNhqO8SDsrRupuam4llFWoQCK977oYyZsVSQ9dlxOX8lscGVY1Cnh2"}} )
                .then(function (response)
                {
                    var data = response.data;
                    if( data.status == 1 )
                    {
                        //客户状态
                        that.default_followstatus_datas=data.data;
                    }
                })
                .catch(function (error)
                {
                    //console.log(error);
                });
        },
        getDataOne:function () {
            var url = conf.datas_one+"4";
            var that = this;
            axios.get( url)
                .then(function (response)
                {
                    var data = response.data;
                    if( data.status == 1 )
                    {
                        //客户等级
                        that.level_datas=data.data;
                    }
                })
                .catch(function (error)
                {
                    //console.log(error);
                });
        }

    },created: function () {
        var that = this;
        that.getClientStatistics();//客户统计
        that.getClientList();//客户列表
        that.getDefaultDataOne();//默认配置
        that.getDataOne();//自定义配置
    }
});