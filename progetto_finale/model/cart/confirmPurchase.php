<?php
include("../user/util.php");
include("util.php");

header("Content-type: application/json");

$email = $_SESSION["email"];
$db = connectToDB();

$cleanCartQ = $db->prepare('UPDATE cart set quantity = (quantity - 1) where id=?');

$updateQ->execute(array($id));

$total = getTotal();

echo json_encode(array('msg' => "Quantità aggiornata correttamente!", 'total' => $total));
