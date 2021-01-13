<?php
include("../user/util.php");
include("../cart/util.php");

header("Content-type: application/json");

$total = getTotal();

echo json_encode(array('user' => $_SESSION['name'], 'total' => $total));
