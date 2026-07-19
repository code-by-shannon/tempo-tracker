<?php


// Error reporting
ini_set('display_errors', 1);
error_reporting(E_ALL);

//CORS
header("Access-Control-Allow-Origin: http://localhost:5173");
header("Access-Control-Allow-Methods: GET, POST, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type");

// Database connection
require_once 'db_connect.php';






