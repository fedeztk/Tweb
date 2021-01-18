<?php
//get all items in the cart and the total value
include("../user/util.php");
include("util.php");

header("Content-type: application/json");

$products = getProducts();

$total = getTotal();

echo json_encode(array('products' => $products, 'total' => $total));
