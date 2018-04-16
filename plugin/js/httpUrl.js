(function () {
    //var host = "http://api.rrzhaofang.com/";
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
        //手机端配置
        web_conf: host + 'home/conf',
    },
        //带token的请求
        window.auth_conf = {
            user_info: host + 'home/users',  //我的基本信息
            client_statistics: host + 'home/client-statistics',  //我的客户统计
            client_list: host + 'home/client',  //我的客户列表
            datas_default_user_one_list: host + 'home/datas-default-user-one/',//前端自定义属性数据
        }

})();
