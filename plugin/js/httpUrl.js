(function () {
   // var host = "http://api.rrzhaofang.com/";
   var host = "http://local.fang.com/";
    //未带toke请求
    window.conf = {
        recommend: host + 'home/house/recommend',//首页推荐
        pathUrl:'http://api.rrzhaofang.com/upload/',
        datas: host + 'home/datas',//前端数据
        datas_default: host + 'home/datas-default-one/',//前端自定义属性数据
        datas_defaults:host+'home/datas-default',//前端自定义属性数据
        datas_one: host + 'home/datas-one/',//前端自定义属性数据
        house_list: host + 'home/house/list',//房源列表
        house_info:host+'home/house/info/',//房源详情
        login:host+'home/user/login',//登陆
        regist:host+'home/user/register',//注册
        web_conf: host + 'home/conf', //手机端配置
    },
        //带token的请求
        window.auth_conf = {
            token:host+"home/token",//检查而已有token
            user_info: host + 'home/users',  //我的基本信息
            client_statistics: host + 'home/client-statistics',  //我的客户统计
            client_list: host + 'home/client',  //我的客户列表
            client_update: host + 'home/client-update/',  //我的客户列表
            client_houses: host + 'home/client-houses',  //房源下拉框
            client_compnay: host + 'home/company',  //公司下拉框
            client_refree: host + 'home/client-refree',  //立即推荐客户
            datas_default_user_one_list: host + 'home/datas-default-user-one/',//前端自定义属性数据
        }
})();
