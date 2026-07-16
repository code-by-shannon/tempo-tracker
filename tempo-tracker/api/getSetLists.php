<?php

include 'include.php';

$result = $dbc->query("SELECT DISTINCT setlist FROM songs");

$setLists = [];

while ($row = $result->fetch_assoc()){
    $setLists[] = $row;
}

echo json_encode($setLists);