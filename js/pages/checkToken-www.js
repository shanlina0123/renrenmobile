checkToken();
/**
 * 检测token
 */
function checkToken() {
    var tokenData = localStorage.getItem("userinfo");

    if (!tokenData) {
        weixinRegister();
    } else {
        //检测token
        $.ajax({
            headers: {
                Authorization: JSON.parse(tokenData).token,
            },
            type: "GET", //方法类型
            dataType: "json", //预期服务器返回的数据类型
            url: auth_conf.token, //url
            success: function (result) {
                if (result.status != 1) {
                    weixinRegister();
                }
            }
        });
    }
}


function weixinRegister() {
    var code = getQueryString('code');
    if (!code) {

        var hrefUrl = window.location.href;
        hrefUrl = encodeURI(hrefUrl);
        window.location.href = 'https://open.weixin.qq.com/connect/oauth2/authorize?appid=wxbe1cdb19d2290193&redirect_uri=' + hrefUrl + '&response_type=code&scope=snsapi_base&state=STATE#wechat_redirect';
    } else {

        $.ajax({
            type: "GET", //方法类型
            dataType: "json", //预期服务器返回的数据类型
            url: conf.get_openid + code, //url
            success: function (result) {
                if (result.status == 1) {
                    if (!result.data.users) {
                        window.location = "/pages/regist.html";

                    } else {
                        var data = JSON.stringify(result.data.users);
                        localStorage.setItem("userinfo", data);
                        window.location.href = window.location.href;
                    }
                    localStorage.setItem("openid", result.data.openid);
                } else {
                    alert(result.messages);
                }
            },
            error: function () {
                localStorage.removeItem("userinfo");
                alert('请求失败');
            }
        });
    }
}

/**
 * 取地址参数
 * @param name
 * @returns {*}
 */
function getQueryString(name) {
    var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)"); // 匹配目标参数
    var result = window.location.search.substr(1).match(reg); // 对querystring匹配目标参数
    if (result != null) {
        return decodeURIComponent(result[2]);
    } else {
        return null;
    }
}

