<?php
include("../user/util.php");
include("util.php");

header("Content-type: application/json");

$products = getProducts();

$total = getTotal();

echo json_encode(array('products' => $products, 'total' => $total));
