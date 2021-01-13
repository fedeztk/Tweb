<?php
include("../user/util.php");
include("util.php");

header("Content-type: application/json");

$email = $_SESSION["email"];
$id = $_GET["id"];
//1 means +1, 0 means -1
$op = $_GET["op"];

$db = connectToDB();

if (((bool)$op))
    $updateQ = $db->prepare('UPDATE cart set quantity = (quantity + 1) where id=?');
else
    $updateQ = $db->prepare('UPDATE cart set quantity = (quantity - 1) where id=?');

$updateQ->execute(array($id));

$total = getTotal();

echo json_encode(array('msg' => "Quantità aggiornata correttamente!", 'total' => $total));
