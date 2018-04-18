new Vue({
    el: 'body',
    data: {
        tokenData: sessionStorage.getItem("userinfo")
    },
    methods:{
        filterToken:function(){
                var that = this;
                if(!that.tokenData)
                {
                    window.location="../pages/login.html";
                }else{
                    if(!JSON.parse(that.tokenData).token)
                    {
                        window.location="../pages/login.html";
                    }
                    //检查token是否失效
                    that.checkToken();
                }
        },
        checkToken:function(){
            var url = auth_conf.token;
            var that = this;
            axios.get( url,{headers: {"Authorization": JSON.parse(that.tokenData).token} })
                .then(function (response)
                {
                    var data = response.data;
                    if(data.status!=1)
                    {
                        if(data.messages)
                        {
                            alert(data.messages);
                        }
                         that.tokenData=null;
                         window.location="../pages/login.html";
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
        that.filterToken();//过滤token
    }
});