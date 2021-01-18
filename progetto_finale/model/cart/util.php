<?php
// util file used by cart and purchase

// get total amount of euros of all items in user's cart
function getTotal()
{
    $db = connectToDB();
    $email = $_SESSION["email"];
    $totalQ = $db->prepare(
        'SELECT price, cart.quantity as quantity
     FROM artwork JOIN cart
     WHERE cart.id=artwork.id AND cart.id in (
     SELECT id FROM cart WHERE email = ?)'
    );
    $totalQ->execute(array($email));
    $total = 0;
    while ($current = $totalQ->fetch(PDO::FETCH_ASSOC)) {
        $total += $current['price'] * $current['quantity'];
    }
    return $total;
}

// get all the products in user's cart
function getProducts()
{
    $email = $_SESSION["email"];

    $db = connectToDB();
    $cartQ = $db->prepare(
        'SELECT name, price, cart.id as id , cart.quantity as quantity
     FROM artwork JOIN cart
     WHERE cart.id=artwork.id AND cart.id in (
     SELECT id FROM cart WHERE email = ?)'
    );

    $cartQ->execute(array($email));

    return $cartQ->fetchAll(PDO::FETCH_ASSOC);
}
