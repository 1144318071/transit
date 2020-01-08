$(document).ready(function(){
    $("#box input").eq(0).focus();
    $("#box input").keyup(function(){
        if(!parseInt($(this).val())){
            $(this).val('');
            return false;
        }
        if(parseInt($(this).index())+1<=$("#box input").length){
            $(this).blur();
            if(parseInt($(this).index())+1<=$("#box input").length){
                $(this).next('input').focus();
            }
        }
    });
});
var _formPay = $('#form_paypsw');

_formPay.validate({
    rules : {
        'payPassword_rsainput':{
            'minlength':6,
            'maxlength':6,
            required:true,
            digits : true,
            numPassword : true,
            echoNum :true
        }
    },

    messages:{
        'payPassword_rsainput':{
            'required' : '<i class="icon icon-attention icon-lg"></i>&nbsp;请填写支付密码',
            'maxlength' : '<i class="icon icon-attention icon-lg"></i>&nbsp;密码最多为{0}个字符',
            'minlength' : '<i class="icon icon-attention icon-lg"></i>&nbsp;密码最少为{0}个字符',
            'digits':'<i class="icon icon-attention icon-lg"></i>&nbsp;密码只能为数字',
            'numPassword' : '<i class="icon icon-attention icon-lg"></i>&nbsp;连号不可用，相同数字不可用（如：123456，11111）',
            'echoNum' :'<i class="icon icon-attention icon-lg"></i>&nbsp;连号不可用，相同数字不可用（如：123456，11111）'
        }
    },
    errorPlacement : function(error, element) {
        element.closest('div[data-error="i_error"]').append(error);
    },
    submitHandler : function(form){
        var _form = $(form);
        form.submit();

    }
});

var payPassword = $("#payPassword_container"),
    _this = payPassword.find('i'),
    k=0,j=0,
    password = '' ,
    _cardwrap = $('#cardwrap');
//点击隐藏的input密码框,在6个显示的密码框的第一个框显示光标
payPassword.on('focus',"input[name='payPassword_rsainput']",function(){

    var _this = payPassword.find('i');
    if(payPassword.attr('data-busy') === '0'){
        //在第一个密码框中添加光标样式
        _this.eq(k).addClass("active");
        _cardwrap.css('visibility','visible');
        payPassword.attr('data-busy','1');
    }

});
//change时去除输入框的高亮，用户再次输入密码时需再次点击
payPassword.on('change',"input[name='payPassword_rsainput']",function(){
    _cardwrap.css('visibility','hidden');
    _this.eq(k).removeClass("active");
    payPassword.attr('data-busy','0');
}).on('blur',"input[name='payPassword_rsainput']",function(){

    _cardwrap.css('visibility','hidden');
    _this.eq(k).removeClass("active");
    payPassword.attr('data-busy','0');

});

//使用keyup事件，绑定键盘上的数字按键和backspace按键
payPassword.on('keyup',"input[name='payPassword_rsainput']",function(e){

    var  e = (e) ? e : window.event;

    //键盘上的数字键按下才可以输入
    if(e.keyCode == 8 || (e.keyCode >= 48 && e.keyCode <= 57) || (e.keyCode >= 96 && e.keyCode <= 105)){
        k = this.value.length;//输入框里面的密码长度
        l = _this.length;//6

        for(;l--;){

            //输入到第几个密码框，第几个密码框就显示高亮和光标（在输入框内有2个数字密码，第三个密码框要显示高亮和光标，之前的显示黑点后面的显示空白，输入和删除都一样）
            if(l === k){
                _this.eq(l).addClass("active");
                _this.eq(l).find('b').css('visibility','hidden');

            }else{
                _this.eq(l).removeClass("active");
                _this.eq(l).find('b').css('visibility', l < k ? 'visible' : 'hidden');

            }

            if(k === 6){
                j = 5;
            }else{
                j = k;
            }
            $('#cardwrap').css('left',j*55+'px');
        }
    }else{
        //输入其他字符，直接清空
        var _val = this.value;
        this.value = _val.replace(/\D/g,'');
    }
});
function checkToken(res){
    let tokenCode = [43961, 43962, 43963, 43964, 43965, 43966, 43967, 43968];//token有误
    let loginCode = [77893,77894];
    let code = res.code;
    if (tokenCode.indexOf(code) >= 0) {
        getToken();
        vmPayMoney.onLoad();
    }else if(loginCode.indexOf(code)>=0){
        alertMsg(res.message,2);
        window.location.href='../../login.html';
    }else{
        alertMsg(res.message,2);
    }
};
$(function(){
    avalon.ready(function () {
        window.vmPayMoney = avalon.define({
            $id : 'pay',
            postData:{
                '_token_':'',
                'type':'',
                'coupon_id':'',
                'goods_id':'',
                'pay_password':''
            },
            onLoad:function () {

            },
            cancel:function(){
                $('#pay').hide();
                parent.layer.close(parent.layer.index);
            },
            payMoney:function () {
                vmPayMoney.postData._token_ = localStorage.getItem('token');
                vmPayMoney.postData.type = localStorage.getItem('payWay');
                vmPayMoney.postData.coupon_id = localStorage.getItem('coupon_id');
                vmPayMoney.postData.goods_id = localStorage.getItem('goods_id');
                getAjax(API.URL_POST_GOODSPAY,'post',vmPayMoney.postData).then(function(res){
                    if(res.code == 200){
                        alertMsg(res.message,1);
                        setTimeout(function(){
                            parent.layer.close(parent.layer.index);
                            window.parent.location.reload();
                        },1000);
                    }else{
                        checkToken(res);
                    }
                });
            }
        });
        vmPayMoney.onLoad();
        avalon.scan(document.body);
    })
});
