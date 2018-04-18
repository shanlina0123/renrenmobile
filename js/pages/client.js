new Vue({
    el: '#my_vue_client',
    data: {
        params:{name:null,followstatusid:null},
        edit_params:{"uuid":null,"levelid":null,"followstatusid":null},
        client_statistics:[],
        client_list:[],
        level_datas:[],
        default_followstatus_datas:[],
        tokenUserInfo:JSON.parse(sessionStorage.getItem("userinfo")),
        tokenValue:JSON.parse(sessionStorage.getItem("userinfo")).token
    },
    methods:{
        //点击搜索状态显示下拉框
        showStatusClick:function(){
            $(".selectText").show();
        },
        //搜索点击-状态
        statusClick:function(id,name){
          this.params.followstatusid=id;
          $(".showText").html(name);
          $(".selectText").hide();
          //搜索
          if(this.$refs.name.value)
          {
                this.params.name=this.$refs.name.value;
          }
            this.getClientList();
        },
        //搜索
        searchClick:function(){
            if(this.$refs.name.value)
            {
                this.params.name=this.$refs.name.value;
            }
            this.getClientList();
        },
        //点击修改级别
        clientLevelClick:function(id){
            this.edit_params.uuid=id;
            $(".levePop").show();
        },
        //点击修改客户状态
        clientStatusClick:function(id){
            this.edit_params.uuid=id;
            $(".statePop").show();
        },
        //修改级别
        editLevelClick:function(id,name){
            this.edit_params.levelid=id;
            $(".levelShow").html(name);
            $(".levePop").hide();
            this.updateClient();
        },
        //修改客户状态
        editStatusClick:function(id,name){
            this.edit_params.followstatusid=id;
            $(".stateShow").html(name);
            $(".statePop").hide();
            this.updateClient();
        },
        //获取客户统计
        getClientStatistics:function () {
            var url = auth_conf.client_statistics;
            var that = this;

            axios.get( url,{headers: {"Authorization":that.tokenValue} })
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
        //获取客户列表
        getClientList:function () {
            var url = auth_conf.client_list;
            var that = this;
            //token
            axios.post(url,that.params,{headers: {"Authorization": that.tokenValue} })
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
        //修改客户级别和状态
        updateClient:function () {
            var url = auth_conf.client_update+this.edit_params.uuid;
            var that = this;
            //token
            axios.put(url,that.edit_params,{headers: {"Authorization": that.tokenValue} })
                .then(function (response) {
                    var data = response.data;
                    alert(data.messages);
                    // console.log(response.data.status);
                }).catch(function (error) {
                   alert("Error:System");
            });
        },
        //获取默认单分类列表
        getDefaultDataOne:function () {
            var url = auth_conf.datas_default_user_one_list+"8";
            var that = this;
            axios.get( url,{headers: {"Authorization": that.tokenValue}} )
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
        //获取自定义单分类列表
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
    }
    ,created: function () {
        var that = this;
        that.getClientStatistics();//客户统计
        that.getClientList();//客户列表
        that.getDefaultDataOne();//默认配置
        that.getDataOne();//自定义配置
    }
});