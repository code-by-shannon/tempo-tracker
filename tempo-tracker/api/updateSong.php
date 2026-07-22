<?php

include 'include.php';

$raw = file_get_contents("php://input");
$data = json_decode($raw, true);

$id = $data["id"];
$bpm = $data["bpm"];

$sql = "UPDATE songs
        SET bpm = ?
        WHERE id= ?";

$stmt = $dbc->prepare($sql);

$stmt->bind_param('ii', $bpm, $id);
$stmt->execute();