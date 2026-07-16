<?php

$host = "localhost";
$dbname = "dbb35dzzyiahfr";
$username = "uwwxkxxqcmxwe";
$password = "ik1k*d3s@41x";

$dbc = new mysqli($host, $username, $password, $dbname);

if ($dbc->connect_error) {
    die("Connection failed: " . $dbc->connect_error);
}

?>