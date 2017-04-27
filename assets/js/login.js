/**
 * Created by K550jk on 2017/4/26.
 */
var login = (function(){
    return{
        open:function(success){
            $('#myModal').modal('show');
            $("#b_login").on("click",()=>{
                login.login(success);
            })
        },
        close:function(){
            $('#myModal').modal('hide');
        },
        login:function(success){
           var name = $("#name").val();
           var pass = $("#pass").val();
           $.post("user/login",{name:name,pass:pass},function(data){
              if(data == "success"){
                  if((success)&&(typeof success == "function")){
                      console.log(success);
                        login.close();
                        success();
                  }
              }else{
                  alert("密码错误")
              }
           },"text");
        }
    }
})();