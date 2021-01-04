<?php
include("user/util.php");

header("Content-type: application/json");

//TODO espanderlo per generare un home page random e eventualmente altri dati

// echo json_encode(array('name'=> $_SESSION['name']));
$db = connectToDB();
$randomImgQ = $db->prepare('SELECT id, name FROM artwork ORDER BY RAND() LIMIT 5');
$randomImgQ->execute();
$imgs = $randomImgQ->fetchAll();

echo json_encode(array('name' => $_SESSION['name'], 'imgs' => $imgs));
