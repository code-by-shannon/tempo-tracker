<?php

include 'include.php';

$raw = file_get_contents("php://input");
$data = json_decode($raw, true);

$id = $data["id"];
$bpm = $data["bpm"];
$title = $data["title"];

$sql = "UPDATE songs
        SET bpm = ?, title = ?
        WHERE id= ?";

$stmt = $dbc->prepare($sql);

$stmt->bind_param('isi', $bpm, $title, $id);
$stmt->execute();