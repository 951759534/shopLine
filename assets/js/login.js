/**
 * Created by K550jk on 2017/4/26.
 */
var login = (function(){
    var modal = {
        success: null,
        init: function () {
            $("#b_login").on("click",()=>{
                this.login();
            });
        },
        open:function(success){
            $('#myModal').modal('show').off('hidden.bs.modal');
            //success && success();
            this.success = success;
        },
        close:function(){

        },
        login:function(){
            var name = $("#name").val();
            var pass = $("#pass").val();
            var obj = {name:name,pass:pass};
            var _this = this;
            $.post("user/login",obj,function(data){
                if(data == "success"){
                    // console.log(success);
                    $("#top").remove("#t_left");
                    login.close();
                    if((_this.success)&&(typeof _this.success == "function")){
                        _this.success();
                        _this.success = null;
                    }
                    $('#myModal').on('hidden.bs.modal', function (e) {
                        location.reload();
                    })
                }else{
                    alert("密码错误")
                }
            },"text");
        }
    };
    modal.init();
    return modal;
})();