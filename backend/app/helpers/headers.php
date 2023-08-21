<?php


header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Headers: *");
header("Access-Control-Allow-Methods: GET, POST");

include_once('jwt_helper.php');

 
  $JWT_token = 'non_authorised';

$raw = file_get_contents('php://input');
$data = json_decode($raw,true);


 
	
?>