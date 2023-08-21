<?php 
/*
 *Base Controller
 *Loads the modals and views
*/

class Controller
{

    public function __construct()
    {
        $this->userModel = $this->model('User');
 
    }


    //Load model
    public function model($model)
    {
        //Require model file
        require_once '../app/models/' . $model . '.php';

        //Instantiate model
        return new $model();
    }


    public function getData()
    {
        $raw = file_get_contents('php://input');
        $data = json_decode($raw, true);

        if (json_encode($data) === 'null') {
            return $data =  $_POST;
        } else {
            return $data;
        }
        exit;
    }

    public function getMyJsonID($token, $serverKey)
    {

        return    $JWT_token = JWT::encode($token, $serverKey);
    }

    public function generateSecureUuid() 
    {
       $timeLow = bin2hex(random_bytes(4));
       $timeMid = bin2hex(random_bytes(2));
       $timeHiAndVersion = bin2hex(random_bytes(2));
       $clockSeqHiAndReserved = bin2hex(random_bytes(1));
       $clockSeqLow = bin2hex(random_bytes(1));
       $node = bin2hex(random_bytes(6));
       
       $uuid = sprintf(
           '%08s-%04s-%04x-%02x%02x-%012s',
           $timeLow,
           $timeMid,
           hexdec($timeHiAndVersion) & 0x0fff | 0x4000,
           hexdec($clockSeqHiAndReserved) & 0x3f | 0x80,
           hexdec($clockSeqLow),
           $node
       );
       return $uuid;
   }

    public function getAuthorizationHeader()
    {
        $headers =  null;
        if (isset($_SERVER['Authorization'])) {

            $headers = trim($_SERVER['Authorization']);
            
        } else if (isset($_SERVER['HTTP_ATHORIZATION'])) {
            $headers = trim($_SERVER['HTTP_ATHORIZATION']);
            
        } elseif (function_exists('apache_request_headers')) {
            $requestHeaders = apache_request_headers();
            $request_headers = array_combine(array_map('ucwords', array_keys($requestHeaders)), array_values($requestHeaders));
            if (isset($requestHeaders['Authorization'])) {
                $headers = trim($requestHeaders['Authorization']);
                 
            }
        }

        return $headers;
    }

    public function bearer()
    {


        $this->auth_header  = $this->getAuthorizationHeader();


        if (
            $this->auth_header
            &&
            preg_match('#Bearer\s(\S+)#', $this->auth_header, $matches)
        ) {

            return $bearer = $matches['1'];
        }
    }


 

    public function myJsonID($bearer, $serverKey)
    {
        $myJsonID = JWT::decode($bearer, $serverKey);
        if ($myJsonID === 401) {
            return false;
        } else {

            return $myJsonID;
        }
    }



    public function serverKey()
    {
        return   'secret_server_keysa' . date("M");
    }
    public function RouteProtecion(){
  
        $headers =  $this->getAuthorizationHeader();
       //
        if (!isset($headers)) {
            $response = ['error' => 'Authorization header missing', 'status' => 401];
          print_r($response);
          exit;
        }else {
             $jwt = str_replace('Bearer ', '', $headers);
        $decoded = $this->myJsonID($jwt, $this->serverKey);
       
        $thisuser = $this->getuserbyid();
        return $thisuser ;
        if (!$decoded) {
            $response = ['error' => 'Invalid token', 'status' => 401];
            print_r($response);
       
        }
        }
       
        
      }
    public function getuserbyid(){
        $bearer = $this->bearer();
         
        if($bearer){ 
             $userId = $this->myJsonID($bearer,$this->serverKey);
             if(!isset($userId)){
              $response = array(
                
                 'status' => 'false',
                 'message' => 'Oops Something Went Wrong x get!!',
        
              );
              print_r(json_encode($response));
              exit;
          }
          $vb = $this->userModel->getuserbyidx($userId->user_id);
          
          if(empty($userId->user_id)) { 
          $response = array(
                 'status' => 'false',
                 'message' => 'No user with this userID!'
              );
              print_r(json_encode($response));
              
          } else {
             return $vb ;
          }
         
         
      
      }
      }

    

}

























?>