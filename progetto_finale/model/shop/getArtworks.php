<?php

include("../user/util.php");

header("Content-type: application/json");

$db = connectToDB();
$productsQ = $db->prepare('SELECT id FROM artwork');
$productsQ->execute();
$imgs = $productsQ->fetchAll();

echo json_encode($imgs);
