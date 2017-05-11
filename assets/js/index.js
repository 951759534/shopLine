/**
 * Created by K550jk on 2017/4/15.
 */
$(
    function(){
        (function(){
            $(".f_l_b_c>li").each(function(index,elem){
                $(this).css({
                    'backgroundPositionX':index*-42})
            });
        })();
        var state = (function () {      //封装历史记录
            var state = {
                put:function(data,url){
                    history.pushState(data," ","?"+ url);
                },
                listenHistory:function(callback){
                    window.addEventListener("popstate",function (e) {
                        if(typeof callback == "function"){
                            callback&&callback(e.state);
                        }
                    })
                }
            };
            return state;
        })();
        state.listenHistory(function(data){
            products.loaded();
            products.loadObj = data;
            products.clear();
            products.loadData();
        });
     var Cart = (function(){
         var cart_list = [];
         var Cart = {
             cart_list:[],
             AllPrice:$("#c_total").html(),
             Sum:$("#c_sum").html(),
             Add:function(obj){
                 var _this = this;
                 $.post("user/addCart",{
                     prod_id:obj.product_id,
                     count:obj.count
                 },function (data) {
                     if(data == "success"){
                        _this.countPrice();
                     }
                 },"text");
             },
             init:function(){
                 this.update();
             },
             Remove:function(){

             },
             countPrice:function(){
                var _this = this;
                 $.get("user/getCartDetail",function(data){
                     var cart = JSON.parse(data);
                      _this.AllPrice = cart[0].sum ;
                     _this.Sum = cart[0].num;
                     products.render();
                 });
             }
         };
         return Cart;
     })();
     var products = (function(){
            function Product(obj){
                var deafaultConfig =  {
                    "prod_id":'',
                    "prod_name":"",
                    "prod_price":'',
                    "img_src":'',
                    'count':1
                };
                $.extend(deafaultConfig,obj);
                this.product_id = deafaultConfig.prod_id;
                this.prod_name=deafaultConfig.prod_name;
                this.prod_price=deafaultConfig.prod_price;
                this.img_src=deafaultConfig.img_src;
                this.count =deafaultConfig.count
            }
            var products = {
                loadEnd:true,    //防止重复insert  loadend;
                page:1,
                loadingFlag:true,
                loadFirst:true,
                render:function(){
                    $("#c_sum").html(Cart.Sum);
                    $("#c_total").html(Cart.AllPrice);
                },
                $content:$('#c_content'),
                init:function(){
                    this.loadData(this.loaded);
                    $("#c_content").on("click",'.product_add',function(){
                        var _this = this;
                      //  console.log(this);
                        var product = $(_this).parents(".product_item").data("product");
                        var count = parseInt($(_this).parents(".product_item").find("#p_count").val());
                        if(count>0){
                            product.count =count;
                        }else{
                            alert("请输入正确数字");
                        }
                        user.checkLogin(function(){
                            Cart.Add(product);
                        },login.open);
                    });
                    $("#c_loadMore").on("click",function(){
                        products.loadMore();
                    });
                },
                loadData:function(callback){
                    var getOParam = {page:""};
                    getOParam = $.extend(getOParam,this.loadObj);
                    getOParam.page = this.page;
                    $.get('shop/getProducts',getOParam,function(data){
                        this.loadingFlag = true;
                        callback&&callback();
                        data = JSON.parse(data);
                        this.page++;
                        for(var i=0;i<data.products.length;i++){
                            var product = new Product(data.products[i]);
                            var $li = $(template("product",product)).data('product',product);
                            this.$content.append($li);
                        }
                        var getOParam_str = Serialization(JSON.stringify(getOParam));
                        if(this.lastParam!=getOParam_str){
                                state.put(getOParam,getOParam_str);
                        }
                        this.lastParam = getOParam_str;
                        if(data.isEnd){
                            this.end();
                        }else{
                            $("#c_loadMore").show();
                        }
                    }.bind(this));
                },
                loadMore:function(){
                    if(this.loadingFlag){
                            $("#c_loading").show();
                            $("#c_loadMore").hide();
                            this.loadingFlag = false;
                            setTimeout(()=>{
                                this.loadData(this.loaded);
                        },1000);
                    }
                },
                loaded:function(){
                    $("#c_loading").hide();
                    $("#c_loadMore").show();

                },
                clear:function(){
                    this.page = 1;
                    this.$content.empty();
                    $("#c_load_end").hide();
                },
                end:function() {
                    $("#c_loading").hide();
                    $("#c_loadMore").hide();
                    if(this.loadEnd){
                        $IsEnd = $("<div id='c_load_end'>没有更多了...</div>");
                        $("#c_loading").after($IsEnd);
                        this.loadEnd = false;
                    }else{
                        $("#c_load_end").show();
                    }
                }
            };
            return products;
        })();
        products.init();
       var nav = (function(){
            var nav = {
                show_index:[0,1,2,3],
            init:function(){
                var _this= this;
                $("#nav>li>a").each(function(index,elem){
                    $(this).on("click",function(){
                        if(_this.show_index
                                .find(elem=>elem==index)+1){
                            products.loadObj =$(this).data();
                            products.clear();
                            products.loadData();
                            $("body").animate({scrollTop:910},1000);
                        }
                    })
                });
            }
            };
            return nav;
        })();
        nav.init();
      $(".do_login").on("click",function(){
          login.open(function(){
              location.reload();
          });
      });
      $("#shop_cart").on("click",function(){
            user.checkLogin(function(){
                location.href = "user/cart";
            },function(){
                login.open();
            });
      });
     state.listenHistory(products);
      function Serialization(string){
          if(typeof string == 'string'){
             return string.replace(/{|}|"/g,"").replace(/,/g,"&").replace(/:/g,"=");
          }
      }
    }
);