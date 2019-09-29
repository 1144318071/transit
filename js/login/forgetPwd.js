$(function () {
    avalon.ready(function () {
        window.vmForgetPwd = avalon.define({
            $id: 'root',
            postData:{
                '_token_':'',
                'username': '',
                'code': '',
                'password': '',
                'password_confirm': '',
                '_t': '', //PERSONAL（个人） MERCHANT（商家） LOGISTICS（物流公司） PROXY （区域代理）
            },
            onLoad: function () {
                console.log('忘记密码');
            }
        });
        vmForgetPwd.onLoad();
        avalon.scan(document.body);
    });
});