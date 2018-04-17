// $(function(){
//
//     //搜索栏 - 客户状态点击
//     $(".showText").click(function(){
//         if($(".selectText").css("display") == "none"){
//             $(".selectText").show();
//         }else{
//             $(".selectText").hide();
//         }
//     });
//
//
//     //等级选择效果实现
//     $(".levelEdit").click(function(){
//         if($(".levePop").css("display") == "none"){
//             $(".levePop").show();
//         }else{
//             $(".levePop").hide();
//         }
//     });
//     $(".levePop .popUl li").click(function(){
//         var thisText = $(this).text();
//         $(".levelShow").text(thisText);
//         $(".levePop").hide();
//     });
//     //客户状态效果实现
//     $(".stateEdit").click(function(){
//         if($(".statePop").css("display") == "none"){
//             $(".statePop").show();
//         }else{
//             $(".statePop").hide();
//         }
//     });
//     $(".statePop .popUl li").click(function(){
//         var thisText = $(this).text();
//         $(".stateShow").text(thisText);
//         $(".statePop").hide();
//     });
//
//
// })
new Vue({
    el: '#my_vue_client_submit',
    data: {
        house_name:null,
        add_params:{"name":null,"mobile":null,"houseid":null,"companyid":null,"remark":null},
        company_list:[],
        house_list:[],
        tokenData: sessionStorage.getItem("userinfo")
    },
    methods:{

        //检查是否内部外部人源
         checkAfterAdmin:function(){
             var that = this;
             if(JSON.parse(that.tokenData).isadminafter==1)
             {
                  $(".afteradmin").addClass("isShow");
             }else{
                 $(".afteradmin").removeClass("isShow");
                 that.getCompanyList();//公司列表
             }
         },
        //点击显示房源-模糊搜索
        showHouseClick:function(house_name){
            var url = auth_conf.client_houses;
            var that = this;
            var house_name=house_name?house_name:null;
            axios.post( url,{name:house_name},{headers: {"Authorization": JSON.parse(that.tokenData).token} })
                .then(function (response)
                {
                    var data = response.data;
                    if( data.status == 1 )
                    {
                        that.house_list = data.data;
                    }
                })
                .catch(function (error)
                {
                    //console.log(error);
                });
            $(".forShowSearch").show();

        },
        //点击显示公司
        showCompanyClick:function(){
            $(".formUl").show();
        },
        //选择房源
        houseClick:function(id,name){
            this.add_params.houseid=id;
            $(".selectHouse").val(name);
            $(".forShowSearch").hide();
        },
        //选择公司
        companyClick:function(id,name){
            this.add_params.companyid=id;
            $(".showForm").html(name);
            $(".formUl").hide();
        },
        //获取公司列表
        getCompanyList:function () {
            var url = auth_conf.client_compnay;
            var that = this;
            axios.get( url,{headers: {"Authorization": JSON.parse(that.tokenData).token} })
                .then(function (response)
                {
                    var data = response.data;
                    if( data.status == 1 )
                    {
                        that.company_list = data.data;
                    }
                })
                .catch(function (error)
                {
                    //console.log(error);
                });
        },
        //立即推荐
        submitClick:function () {
            var url = auth_conf.client_refree;
            var that = this;
            that.add_params.name=that.$refs.name.value;
            that.add_params.mobile=that.$refs.mobile.value;
            that.add_params.remark=that.$refs.remark.value;
            //token
            axios.post(url,that.add_params,{headers: {"Authorization": JSON.parse(that.tokenData).token} })
                .then(function (response) {
                    var data = response.data;
                    if( data.status == 1 )
                    {
                        window.location.href="../pages/myCustomer.html";
                    }
                    // console.log(response.data.status);
                }).catch(function (error) {
                //console.log(error);
                // console.log(this);
            });
        }
    }
    ,created: function () {
        var that = this;
        that.checkAfterAdmin();//检查是否业务员

    }
});