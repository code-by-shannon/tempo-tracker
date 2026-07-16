<?php

include 'include.php';

// read the raw JSON coming from the browser
$json = file_get_contents("php://input");
$data = json_decode($json, true);
// assign values to title and bpm from $data
$title = $data["title"];
$bpm = $data["bpm"];
// prepared statement
$stmt = $dbc -> prepare("INSERT INTO songs (title, bpm) VALUES (?, ?)");
$stmt -> bind_param("si", $title, $bpm);
$stmt -> execute();



echo "song saved";
echo $title . " " . $bpm;
