// 错误信息提示
layui.use('layer', function () {
    layer = layui.layer;
});
function alertMsg(msg, icon) {
    layer.msg(msg, {
        icon: icon
    });
}
window.token = localStorage.getItem('token');
function getAjax(url,type,data){
    return new Promise(function (resolve, reject) {
        $.ajax({
            url: url,
            type: type,
            dataType: 'json',
            async: true,
            data:data,
            xhrFields: {
                withCredentials: true
            },
        }).done(function (res) {
            if(res.code == 200){
                console.log(res)
            }
            var ajaxdata = res;
            console.log('23423',res)
            // 返回thisdata
            resolve(ajaxdata);
        }).fail(function (err){
            reject(err);
        });
    });
}