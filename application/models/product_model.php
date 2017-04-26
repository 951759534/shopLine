<?php if ( ! defined('BASEPATH')) exit('No direct script access allowed');


class Product_model extends CI_Model{
    public function getAllProductCount($arr){
            if(isset($arr['cate_id'])){
                $query = " select p.*,i.img_src from t_product p,t_category c,t_product_img i 
    where p.cate_id = c.cate_id and p.prod_id = i.prod_id and i.is_main = 1
     and p.cate_id
    in(select cate_id from t_category where p_id =? union select cate_id from t_category where p_id in (select cate_id from t_category where p_id =?))";
                $row = $this ->db -> query($query,Array($arr['cate_id'],$arr['cate_id']));
        }else if(isset($arr['tag_id'])){
                $query = "select p.*,i.img_src from t_product p,t_product_img i
    where p.prod_id in(select prod_id from t_product_tag where t_product_tag.tag_id = ?)
    and p.prod_id = i.prod_id and i.is_main = 1";
                $row =  $this ->db -> query($query,Array($arr['tag_id']));
        }else{
            $this->db->select('*');
            $this->db->from('t_product');
            $this->db->join('t_product_img',
                't_product.prod_id = t_product_img.prod_id');
            $this->db->where("t_product_img.is_main",1);
                $row = $this->db->get();
        }
        return  $row->num_rows();
    }
    public function getProductLimit($offset,$per,$arr = null){
        $result = null;
        if(isset($arr['cate_id'])){
            $query = " select p.*,i.img_src from t_product p,t_category c,t_product_img i 
           where p.cate_id = c.cate_id and p.prod_id = i.prod_id and i.is_main = 1
        and p.cate_id
        in(select cate_id from t_category where p_id =? union select cate_id from t_category where p_id in (select cate_id from t_category where p_id =?)) limit $offset,$per";
           $result = $this ->db -> query($query,Array($arr['cate_id'],$arr['cate_id']));
        }else if(isset($arr['tag_id'])){
            $query = "select p.*,i.img_src from t_product p,t_product_img i
    where p.prod_id in(select prod_id from t_product_tag where t_product_tag.tag_id =?)
    and p.prod_id = i.prod_id and i.is_main = 1 limit $offset,$per";
            $result = $this ->db -> query($query,Array($arr['tag_id']));
        }else{
            $this->db->select('*');
            $this->db->from('t_product');
            $this->db->join('t_product_img',
                't_product.prod_id = t_product_img.prod_id');
            $this->db->where("t_product_img.is_main",1);
            $this -> db -> limit($per,$offset);
            $result = $this->db->get();
        }
        return $result->result();
    }
}