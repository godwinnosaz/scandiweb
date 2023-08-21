<?php
class Bookme extends Controller
{
    public function __construct()
    {
        $this->bookmeModel = $this->model('Boookme');
    }

    public function addProduct()
    {
        if ($_SERVER['REQUEST_METHOD'] == 'POST') {
            $loginData = $this->getData();
            $data = [
              'sku_id' => trim($loginData['sku_id']),
              'name' => trim($loginData['name']),
              'price' => trim($loginData['price']),
              'weight' => trim($loginData['weight']),
              'dimension' => trim($loginData['dimension']),
              'size' => trim($loginData['size']),
              'product_id' => $this->generateSecureUuid(),
            ];

            if (isset($data['sku_id']) && isset($data['name']) && isset($data['price']) && isset($data['weight']) || isset($data['dimension']) || isset($data['size'])) {
              if ($this->bookmeModel->addProduct($data)) {
                $response = [
                  'status' => 200,
                  'message' => 'product added successfully'
                ];
                print_r(json_encode($response));
              }
              
            } else {
              $response = [
                'status' => 304,
                'message' => 'empty input fields'
              ];
              print_r(json_encode($response));
            }
           
        } else {
            $response = [
                "status" => 400,
              'message' => 'invalid method',
            ];
            print_r(json_encode($response));
        }
    }
    public function getProduct()
    {
      
          if ($_SERVER['REQUEST_METHOD'] == 'GET') {
             
             $products =  $this->bookmeModel->getProduct();
             print_r(json_encode($products)) ;

          } else {
              $response = [
                "status" => 400,
              'message' => 'invalid method',
      ];
              print_r(json_encode($response));
          }
    }
    public function deleteProduct()
    {
      
          if ($_SERVER['REQUEST_METHOD'] == 'POST') {
            $loginData = $this->getData();
            $data = [
              'product_id' => trim($loginData['product_id'])
            ];
             if ($this->bookmeModel->deleteProduct($data)) {
              $response = [
                "status" => 200,
              'message' => 'delete successful',
      ];print_r(json_encode($response)) ;
             }
            
             

          } else {
              $response = [
                "status" => 400,
              'message' => 'invalid method',
      ];
              print_r(json_encode($response));
          }
    }

}