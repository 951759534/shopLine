<?php if ( ! defined('BASEPATH')) exit('No direct script access allowed');
class User extends CI_Controller{
    public function __construct(){
        parent::__construct();
        $this ->load -> model("user_model");
    }

    public function checkLogin(){

        $this->session->unset_userdata("user");
        $user = $this->session->userdata("user");
        if($user){
            echo "logined";
        }else{
            echo "nologin";
        }
    }
    public function login(){
       $name = $this -> input -> post("name");
       $pass = $this -> input ->post("pass");
       $result = $this-> user_model -> get_user_by_user_pass($name,$pass);
       if($result){
           $this ->session -> set_userdata("user",$result);
           echo "success";
       }else{
           echo "fail";
       }
    }
}