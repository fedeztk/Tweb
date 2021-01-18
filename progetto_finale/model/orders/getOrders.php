<?php
// get user order infos and sort them with most recent on top

include("../user/util.php");

header("Content-type: application/json");

$email = $_SESSION["email"];

$db = connectToDB();

$ordersQ = $db->prepare(
    'SELECT street, prov, city, orderDate, total
    FROM userOrder
    WHERE email = ?
    ORDER BY orderDate DESC'
);

$ordersQ->execute(array($email));
$orders = $ordersQ->fetchAll(PDO::FETCH_ASSOC);

echo json_encode($orders);
