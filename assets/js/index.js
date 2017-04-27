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
     var products = (function(){
            var cart_list = [];
            var Cart = {
                cart_list:[],
                AllPrice:0,
                Sum:0,
                Add:function(obj){
                    cart_list.push(obj);
                    this.AllPrice +=obj.count*obj.prod_price;
                    this.Sum += obj.count;
                },
                Remove:function(){

                }
            };
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
                page:1,
                loadingFlag:true,
                render:function(){
                    $("#c_sum").html(Cart.Sum);
                    $("#c_total").html(Cart.AllPrice);
                },
                $content:$('#c_content'),
                init:function(){
                    this.loadData(this.loaded);
                    $("#c_content").on("click",'.product_add',function(){
                        var _this = this;
                        user.checkLogin(function(){
                            Cart.Add($(_this)
                                .parents(".product_item")
                                .data("product"));
                            products.render();    //必须放在回调函数中
                        },login.open);

                    });
                    $("#c_loadMore").on("click",function(){
                        products.loadMore();
                    });
                },
                loadData:function(callback){
                    var getOParam = {page:this.page};
                    getOParam = $.extend(getOParam,this.loadObj);
                   // console.log(getOParam);
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
                        if(data.isEnd){
                            this.end();
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
                    $IsEnd = $("<div id='c_load_end'>没有更多了...</div>");
                    console.log($IsEnd);
                    $("#c_loading").after($IsEnd);
                }
            };
            return products;

        })();
        products.init();
       var nav = (function(){
            var nav = {
            init:function(){
                $("#nav>li>a").each(function(index,elem){
                    $(this).on("click",function(){
                        products.loadObj =$(this).data();
                        products.clear();
                        products.loadData();
                        $("body").animate({scrollTop:910},1000);
                    })
                })
            }
            };
            return nav;
        })();
      nav.init();
    }
);