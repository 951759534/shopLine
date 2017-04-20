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
                loadFlag:true,
                render:function(){
                    $("#c_sum").html(Cart.Sum);
                    $("#c_total").html(Cart.AllPrice);
                },
                $content:$('#c_content'),
                init:function(){
                    this.loadData(this.loaded);
                    $("#c_content").on("click",'.product_add',function(){
                        Cart.Add($(this).parents(".product_item").data("product"));
                        products.render();
                    });
                    $("#c_loadMore").on("click",function(){
                        products.loadMore();
                    });
                },
                loadData:function(callback){
                    $.get('shop/getProducts?page='+this.page,function(data){
                        this.loadFlag = true;
                        callback&&callback();
                        data = JSON.parse(data);
                        if(data.isEnd){
                            alert("is End");
                            return;
                        }
                        this.page++;
                        for(var i=0;i<data.product.length;i++){
                            var product = new Product(data.product[i]);
                            var $li = $(template("product",product)).data('product',product);
                            this.$content.append($li);
                        }
                    }.bind(this));
                },
                loadMore:function(){
                    if(this.loadFlag){
                        $("#c_loading").show();
                        $("#c_loadMore").hide();
                        this.loadFlag = false;
                        setTimeout(()=>{
                            this.loadData(this.loaded);
                    },1000);
                    }
                },
                loaded:function(){
                    $("#c_loading").hide();
                    $("#c_loadMore").show();
                }
            };
            return products;

        })();
        products.init();
    }
);