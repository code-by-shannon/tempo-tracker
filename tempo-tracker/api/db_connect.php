<?php

$host = "localhost";
$dbname = "dbb35dzzyiahfr";
$username = "uwwxkxxqcmxwe";
$password = "553&7w3_A@~3";

$dbc = new mysqli($host, $username, $password, $dbname);

if ($dbc->connect_error) {
    die("Connection failed: " . $dbc->connect_error);
}

?>