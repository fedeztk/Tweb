<?php
include("../user/util.php");

header("Content-type: application/json");

$id = $_GET['id'];

$db = connectToDB();
$prodQ = $db->prepare('SELECT name, material, width, height, depth, isEdible, price FROM artwork WHERE id=?');
$prodQ->execute(array($id));
$info = $prodQ->fetch(PDO::FETCH_ASSOC);

echo json_encode($info);
