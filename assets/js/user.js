var user =(function(){
    return{
        checkLogin:function(success,fail){
            $.get("user/checkLogin",function(data){
                console.log(data);
                if(data == "logined"){
                  if(typeof success == "function"){
                      console.log("logined");
                      success();
                  }
                }else{
                    if(typeof fail == "function"){
                        console.log("fail");
                        fail(success);
                    }
                }
            },"text");
        }
    }
})();
