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
                }
        }
    }
    ,created: function () {
        var that = this;
        that.filterToken();//过滤token
    }
});