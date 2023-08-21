<?php

class Boookme
{
    private $db;
    public function __construct()
    {
        $this->db = new Database;  
    }
public function getProduct(){
    $this->db->query("SELECT * FROM testproduct");
    
    $row = $this->db->resultSet();
return $row;
  
  }
public function addProduct($data){
    $this->db->query('INSERT INTO  testproduct set sku_id = :sku_id, name = :name, price = :price, weight = :weight, dimension = :dimension , size = :size , product_id = :product_id ');
    $this->db->bind(':sku_id', $data['sku_id']);
    $this->db->bind(':name', $data['name']);
    $this->db->bind(':price', $data['price']);
    if (isset($data['weight'])) {
        $this->db->bind(':weight', $data['weight'] ); 
    }
    if (isset($data['dimension'])) {
        $this->db->bind(':dimension', $data['dimension']);
    }
    if (isset($data['size'])) {
        $this->db->bind(':size', $data['size']);
    }
    
    $this->db->bind(':product_id', $data['product_id'] ); 

    if ($this->db->execute()) {
        # code...
        return true;
    }else {
        return false;
    }
}
 public function getoneOrder($data){
        $this->db->query("SELECT * FROM `cartz` WHERE `order_id` = :order_id AND user_id = :user_id");
  
        $this->db->bind(':order_id', $data['order_id']);
        $this->db->bind(':user_id', $data['user_id']);
        $row = $this->db->single();
        if ($this->db->rowCount() > 0) {
            print_r(json_encode($row)) ;
        }else{
            $response = [
                "status" => 400,
              'message' => 'invalid order',
            ];
            print_r(json_encode($response));
        }
        
      }
public function deleteProduct($data){
    $this->db->query('DELETE  FROM testproduct WHERE product_id = :product_id');
    $this->db->bind(':product_id', $data['product_id']);

    // $row = $this->db->single();
if ($this->db->execute()) {
    return true;
}else{
    return false;
}

}
   
}