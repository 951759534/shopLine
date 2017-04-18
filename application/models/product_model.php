<?php if ( ! defined('BASEPATH')) exit('No direct script access allowed');


class Product_model extends CI_Model{
    public function getAllProductCount(){
        $this->db->select('*');
        $this->db->from('t_product');
        $this->db->join('t_product_img',
                        't_product.prod_id = t_product_img.prod_id');
        return $this->db->count_all_results();
    }
    public function getProductLimit($offset,$per){
        $this->db->select('*');
        $this->db->from('t_product');
        $this->db->join('t_product_img',
            't_product.prod_id = t_product_img.prod_id');
        $this -> db -> limit($per,$offset);
        return $this->db->get()->result();
    }
}