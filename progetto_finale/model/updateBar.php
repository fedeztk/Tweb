<?php
// get the number of items in the cart
// used to updates the icon bar if there is at least one item in the cart

include("user/util.php");

header("Content-type: application/json");

$db = connectToDB();
$email = $_SESSION["email"];
$existQ = $db->prepare('SELECT COUNT(*) AS count FROM cart WHERE email = ?');
$existQ->execute(array($email));
$exist = $existQ->fetch();

echo json_encode($exist);
