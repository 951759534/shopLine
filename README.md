# shopLine
###网上商城
log  <br/>
2017-4-12   <br/>

* day1 数据库设计 <br>
    t_user 用户表   
    t_blog 博客文章表  
    t_blog_comment 博客评论表  
    t_product 商品详细表  
    t_tag 商品标签表  
    t_category 商品分类表  
    t_product_img 商品图片表  
    t_order 用户订单表  
    t_order_item 订单与商品多对多关系的第三张表  
    t_cart 商品购物车表 
    t_product_comment 商品评论表
    
 * 关联查询类别与商品与照片 <br />
  select p.*,i.img_src from t_product p,t_category c,t_product_img i <br />
    where p.cate_id = c.cate_id and p.prod_id = i.prod_id and i.is_main = 1  <br/>
    and p.cate_id   <br />
    in(
    select cate_id from t_category where p_id = 1 <br />
    union <br />
    select cate_id from t_category where p_id in 
    (select cate_id from t_category where p_id = 1))  <br />
 * 关联标签与商品与照片  <br />
   select p.*,i.img_src from t_product p,t_product_img i
   where <br />
   p.prod_id in(select prod_id from t_product_tag where t_product_tag.tag_id = 1)<br />
   and p.prod_id = i.prod_id and i.is_main = 1
 
