<?php
  // DB Params
  define("DB_HOST", "localhost");
  define("DB_USER", "root");
  define("DB_PASS", "");
  define("DB_NAME", "test");
  define("DB_PORT", "");

  // App Root
  define('APPROOT', dirname(dirname(__FILE__)));
  define('URLROOT', 'http://localhost/testAPI');
  define('SITENAME', 'TESTAPI');


  header("Access-Control-Allow-Origin: *");
  header("Access-Control-Allow-Headers: *");
  header("Access-Control-Allow-Methods: GET, POST");
  


