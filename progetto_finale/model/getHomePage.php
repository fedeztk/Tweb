<?php
include("user/util.php");

header("Content-type: application/json");

$db = connectToDB();
$randomImgQ = $db->prepare('SELECT id, name FROM artwork ORDER BY RAND() LIMIT 3');
$randomImgQ->execute();
$imgs = $randomImgQ->fetchAll();

echo json_encode(array('name' => $_SESSION['name'], 'imgs' => $imgs));
