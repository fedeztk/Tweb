<?php
// remove dropped order
include("../user/util.php");

header("Content-type: application/json");

$email = $_SESSION["email"];
$date = $_GET["date"];

$db = connectToDB();

$removeQ = $db->prepare('DELETE FROM userOrder WHERE orderDate = ? AND email = ? AND ongoing = TRUE');

$removeQ->execute(array($date, $email));

echo json_encode("L'ordine è stato annullato!");
