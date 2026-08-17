<?php

include 'include.php';

// read the raw JSON coming from the browser
$json = file_get_contents("php://input");
$data = json_decode($json, true);

// data incoming from react
// assign values to title and bpm from $data
$title = $data["title"];
$bpm = $data["bpm"];
$setlist = $data["setlist"];
// prepared statement
$stmt = $dbc -> prepare("INSERT INTO songs (title, bpm, setlist) VALUES (?, ?, ?)");
$stmt -> bind_param("sis", $title, $bpm, $setlist);
$stmt -> execute();
// data from sql (we need the ID) for songObject
// php syntax to check db for latest id insert
$id = $dbc->insert_id;

// song 'object' to send to react to update songObject in order to compare song.id with currentSong.id
$song = [
    "id" => $id,
    "title" => $title,
    "bpm" => $bpm,
    "setlist" => $setlist
];

echo json_encode($song);
