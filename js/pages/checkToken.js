
checkToken();
/**
 * 检测token
 */
function checkToken() {
    var tokenData = localStorage.getItem("userinfo");

    if( !tokenData )
    {
        window.location.href = '/pages/login.html';
    }
    $.ajax({
        headers: {
            Authorization: JSON.parse(tokenData).token,
        },
        type: "GET", //方法类型
        dataType: "json", //预期服务器返回的数据类型
        url:auth_conf.token, //url
        success: function(result) {
            if (result.status != 1)
            {
                if ( result.status != 15 )
                {
                    localStorage.removeItem("userinfo");
                    window.location.href =  window.location.href;
                }else
                {
                    localStorage.removeItem("userinfo");
                    alert(result.messages);
                }
            }
        }
    });
}


/**
 * 取地址参数
 * @param name
 * @returns {*}
 */
function getQueryString ( name )
{
    var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)"); // 匹配目标参数
    var result = window.location.search.substr(1).match(reg); // 对querystring匹配目标参数
    if (result != null) {
        return decodeURIComponent(result[2]);
    }else
    {
        return null;
    }
}

