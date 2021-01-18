<?php
//update amount of items in user's cart and get new total value
include("../user/util.php");
include("util.php");

header("Content-type: application/json");

$email = $_SESSION["email"];
$id = $_GET["id"];

//1 means +1=increase, 0 means -1=decrease
$op = $_GET["op"];

$db = connectToDB();

if (((bool)$op))
    $updateQ = $db->prepare('UPDATE cart set quantity = (quantity + 1) where id=?');
else
    $updateQ = $db->prepare('UPDATE cart set quantity = (quantity - 1) where id=?');

$updateQ->execute(array($id));

$total = getTotal();

echo json_encode(array('msg' => "Quantità aggiornata correttamente!", 'total' => $total));
