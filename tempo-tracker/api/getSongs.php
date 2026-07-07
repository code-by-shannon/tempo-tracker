<?php

ini_set('display_errors', 1);
error_reporting(E_ALL);

require_once 'db_connect.php';

// query db for everything from tables
$result = $dbc -> query("SELECT * FROM songs");
$songs = [];

while ($row = $result->fetch_assoc()){
    $songs[] = $row;
}

echo json_encode($songs);