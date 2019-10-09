$(function(){
    avalon.ready(function(){
        window.vmPersonalData = avalon.define({
            $id: 'personalData',
            onLoad:function(){

            },
            changePwd:function(){
                var userType = JSON.parse(localStorage.getItem('userInfo')).type;
                localStorage.setItem('_t', userType);
                location.href = '../../views/login/changePwd.html';
            }
        });
        vmPersonalData.onLoad();
        avalon.scan(document.body);
    });
});