<?php if ( ! defined('BASEPATH')) exit('No direct script access allowed');

class Shop extends CI_Controller {
    public function __construct(){
        parent::__construct();
        $this->load->model("product_model");
    }
    public function getProducts(){
        $page = $this->input->get("page");
        $per = 3;
        $count = $this ->product_model->getAllProductCount();
        $Allpage = ceil($count/$per);
        if($page-1 == $Allpage){
            $data = Array(
                            'isEnd' => true);
        }else{
            $result = $this ->product_model ->getProductLimit(($page-1)*$per,$per);

            $data = Array(
                'product'=>$result,
                'isEnd' => false
            );
        }
        echo json_encode($data);
    }
}