<?php

require_once 'include.php';

$raw = file_get_contents("php://input");
$data = json_decode($raw, true);

$setlist = $data["setlist"];

$sql = "SELECT id, title, bpm
        FROM songs
        WHERE setlist = ?";

$stmt = mysqli_prepare($dbc, $sql);

mysqli_stmt_bind_param($stmt, "s", $setlist);

mysqli_stmt_execute($stmt);

$result = mysqli_stmt_get_result($stmt);


$songs = [];
while ($row = mysqli_fetch_assoc($result)) {
    $songs[] = $row;
}

echo json_encode($songs);