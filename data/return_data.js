var token = localStorage.getItem('token')
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
                location.href = '../login.html'
            } else if (res.code == 200) {
                resolve(res);
            } else {
                alertMsg(res.message, 2);
            }
        }).fail(function (err) {
            reject(err);
        });
    });
}
