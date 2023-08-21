<?php 
//Load Config
require_once 'config/config.php';
  require_once '../app/helpers/jwt_helper.php';
  require_once '../app/helpers/headers.php';

function autoloader($className)
{
    $classPath = str_replace('\\', '/', $className) . '.php';
    require_once '../app/libraries/' . $classPath;
}

spl_autoload_register('autoloader');