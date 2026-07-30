<?php

include 'include.php';

// read the raw JSON coming from the browser
$json = file_get_contents("php://input");
$data = json_decode($json, true);
// assign values to title and bpm from $data
$title = $data["title"];
$bpm = $data["bpm"];
$setlist = $data["setlist"];
// prepared statement
$stmt = $dbc -> prepare("INSERT INTO songs (title, bpm, setlist) VALUES (?, ?, ?)");
$stmt -> bind_param("sis", $title, $bpm, $setlist);
$stmt -> execute();



echo "song saved";
echo "$title | $bpm | $setlist";
