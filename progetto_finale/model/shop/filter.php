<?php
// get products to display on shop based on form options
include("../user/util.php");

header("Content-type: application/json");

$db = connectToDB();
$queryStr = 'SELECT id, name FROM artwork WHERE 1=1'; //select all product by default

// build the query and relatives parameters based on user selected option
$args = array();

if (!empty($_GET['color'])) {
    $queryStr .= " AND color like ?";
    $args[] = '%' . $_GET['color'] . '%'; //artworks may contain multiple colors
}
if (!empty($_GET['category'])) {
    $queryStr .= ' AND category = ?';
    $args[] = $_GET['category'];
}
if (!empty($_GET['price'])) {
    if (!strcmp($_GET['price'], "ASC"))
        $queryStr .= ' ORDER BY price ASC';
    elseif (!strcmp($_GET['price'], "DESC"))
        $queryStr .= ' ORDER BY price DESC';
}

$productsQ = $db->prepare($queryStr);
$productsQ->execute($args);
$prod = $productsQ->fetchAll();

echo json_encode($prod);
