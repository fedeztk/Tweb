<?php
include("../user/util.php");

header("Content-type: application/json");

$email = $_SESSION["email"];
$id = $_GET["id"];

$db = connectToDB();

$removeQ = $db->prepare('DELETE FROM cart WHERE id=? AND email=?');

$removeQ->execute(array($id, $email));

echo json_encode("Prodotto rimosso dal carrello");
