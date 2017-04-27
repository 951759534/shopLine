<?php if ( ! defined('BASEPATH')) exit('No direct script access allowed');
class User_model extends CI_Model{
    public function get_user_by_user_pass($name,$pass){
       return $this->db->get_where('t_user',array(
                "username"=>$name,
                "password" =>$pass
        ))->row();
        }
}