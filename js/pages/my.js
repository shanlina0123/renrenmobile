new Vue({
    el: '#my_vue_data',
    data: {
        my_info:[],
        default_datas:[],
        connect_tel:"",
        tokenData: sessionStorage.getItem("userinfo")
    },
    methods:{
        getMyInfo:function () {
            var url = auth_conf.user_info;
            var that = this;
            axios.get(url, {headers: {"Authorization": JSON.parse(that.tokenData).token} })
              .then(function (response) {
                    var data = response.data;
                    if( data.status == 1 )
                    {
                        that.my_info = data.data;
                    }
                   // console.log(response.data.status);
                }).catch(function (error) {
                //console.log(error);
               // console.log(this);
            });
        },
        getDefaultData:function () {
            var url = conf.datas_default+'9';
            var that = this;
            axios.get( url )
                .then(function (response)
                {
                    var data = response.data;
                    if( data.status == 1 )
                    {
                        //用户类型
                        that.default_datas=data.data;

                    }
                })
                .catch(function (error)
                {
                    //console.log(error);
                });
        },
        getMyConf:function () {
            var url = conf.web_conf;
            var that = this;
            axios.get( url)
                .then(function (response)
                {
                    var data = response.data;
                    if( data.status == 1 )
                    {
                        that.connect_tel = data.data[1]["_child"][2]["content"];
                    }
                })
                .catch(function (error)
                {
                    //console.log(error);
                });
        },
    },created: function () {
        var that = this;
        that.getMyInfo();//我的信息
        that.getDefaultData();//默认配置
        that.getMyConf();//我的配置
    }
});