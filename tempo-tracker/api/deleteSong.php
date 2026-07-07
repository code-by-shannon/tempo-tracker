<?php

ini_set('display_errors', 1);
error_reporting(E_ALL);

require_once 'db_connect.php';

// delete item from db
// read the raw JSON coming from the browser
$json = file_get_contents("php://input");
$data = json_decode($json, true);

$id = $data['id'];


$stmt = $dbc->prepare("DELETE FROM songs WHERE id = ?");
$stmt->bind_param('i', $id);
$stmt->execute();
