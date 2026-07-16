<?php

include 'include.php';

// delete item from db
// read the raw JSON coming from the browser
$json = file_get_contents("php://input");
$data = json_decode($json, true);

echo "<p>JSON:</p>";
var_dump($json);
echo "<p>data:</p>";
var_dump($data);

$id = $data['id'];


$stmt = $dbc->prepare("DELETE FROM songs WHERE id = ?");
$stmt->bind_param('i', $id);
$stmt->execute();


echo "Deleted ID: " . $id;