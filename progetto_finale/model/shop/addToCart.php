<?php
// add to cart currently clicked product
include("../user/util.php");

header("Content-type: application/json");

$id = $_POST['id'];
$email = $_SESSION['email'];

try {
    $db = connectToDB();
    $prodQ = $db->prepare('INSERT INTO cart (email, id) VALUES (?, ?)');
    $prodQ->execute(array($email, $id));
    echo json_encode(array('status' => true, 'msg' => 'Oggetto aggiunto al carrello'));
} catch (PDOException $exception) {
    if ($exception->errorInfo[1] == 1062) {
        echo json_encode(array('status' => false, 'msg' => "L'oggetto è già presente nel carrello"));
    } else {
        echo json_encode(array('status' => false, 'msg' => 'Ops, qualcosa è andato storto, si prega di riprovare'));
    }
}
