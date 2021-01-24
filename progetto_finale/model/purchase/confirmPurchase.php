<?php
include("../user/util.php");
include("../cart/util.php");

header("Content-type: application/json");

// build of parameters that goes into userOrder table
$products = getProducts();
$total = getTotal();

// save ids and quantites as string
$idStr = implode(',', array_column($products, 'id'));
$quantityStr = implode(',', array_column($products, 'quantity'));

$email = $_SESSION['email'];
$street = $_POST['street'];
$prov = $_POST['prov'];
$city = $_POST['city'];
$orderDate = date('Y-m-d H:i:s');

if (empty($street) || empty($city) || empty($prov)) {
    echo json_encode(array('status' => false));
} else {
    $db = connectToDB();

    // query to insert new order
    $orderQ = $db->prepare('INSERT INTO userOrder (email, street, prov, city, id, quantity, orderDate, total) VALUES (?, ?, ?, ?, ?, ?, ?, ?)');
    $orderQ->execute(array($email, $street, $prov, $city, $idStr, $quantityStr, $orderDate, $total));

    // query to delete current products in cart
    $removeQ = $db->prepare('DELETE FROM cart WHERE email=?');
    $removeQ->execute(array($email));
    echo json_encode(array('status' => true));
}
