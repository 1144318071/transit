// 错误信息提示
layui.use('layer', function () {
    layer = layui.layer;
});
function alertMsg(msg, icon) {
    layer.msg(msg, {
        icon: icon
    });
}
function getAjax(url, type, data) {
    return new Promise(function (resolve, reject) {
        $.ajax({
            url: url,
            type: type,
            dataType: 'json',
            async: true,
            data: data,
            xhrFields: {
                withCredentials: true
            }
        }).done(function (res) {
            if (res.code == 77893 || res.code == 77894) {
                alertMsg(res.message, 1);
                setTimeout(function(){
                    location.href = '../login.html'
                },2000);
            } else if (res.code == 200) {
                resolve(res);
            } else {
                alertMsg(res.message, 2);
            }
        }).fail(function (err) {
            reject(err);
        });
    });
};
function GetRequest(urlStr) {
    if (typeof urlStr == "undefined") {
        var url = decodeURI(location.search); //获取url中"?"符后的字符串
    } else {
        var url = "?" + urlStr.split("?")[1];
    }
    var theRequest = new Object();
    if (url.indexOf("?") != -1) {
        var str = url.substr(1);
        strs = str.split("&");
        for (var i = 0; i < strs.length; i++) {
            theRequest[strs[i].split("=")[0]] = decodeURI(strs[i].split("=")[1]);
        }
    }
    return theRequest;
}
