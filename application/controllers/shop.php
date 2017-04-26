<?php if ( ! defined('BASEPATH')) exit('No direct script access allowed');

class Shop extends CI_Controller {
    public function __construct(){
        parent::__construct();
        $this->load->model("product_model");
    }
    public function getProducts(){
        $searchParam = Array();
        $page = $this->input->get("page"); /*第几页*/
        $cate_id = $this -> input -> get("cate_id");
        $tag_id = $this -> input -> get("tag_id");
        if($cate_id){
            $searchParam["cate_id"] = $cate_id;
        }else if($tag_id){
            $searchParam["tag_id"] = $tag_id;
        }
        $per = 3;   /*每页显示多少*/
        $count = $this ->product_model->getAllProductCount($searchParam); /*总的条数*/
        $Allpage = ceil($count/$per); /*总共的页数*/
        $result = $this ->product_model ->getProductLimit(($page-1)*$per,$per,$searchParam);
        $data = Array(
            'product'=>$result
        );
        if($page >= $Allpage){
            $data['isEnd'] =  true;
        }else{
            $data['isEnd'] =  false;
        }
        echo json_encode($data);
    }
}