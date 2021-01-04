<?php

include("util.php");


header("Content-type: application/json");

if (!$_POST['username'] || !$_POST['email'] || !$_POST['pwd']) {
    echo json_encode(array('status' => false, 'msg' => 'Ops, qualcosa è andato storto, controllare di aver compilato tutti i campi...'));
} else if (isset($_POST['username']) && isset($_POST['pwd'])) {
    $name = $_POST['username'];
    $password = password_hash($_POST['pwd'], PASSWORD_DEFAULT);
    $email = filter_var($_POST['email'], FILTER_SANITIZE_EMAIL);
    //se l'email supera la validazione dopo aver eliminato i caratteri illegali
    if (filter_var($email, FILTER_VALIDATE_EMAIL)) {
        try {
            $db = connectToDB();
            $newUserQ = $db->prepare('INSERT INTO user (name, password, email)  VALUES (?,?,?)');
            $newUserQ->execute(array($name, $password, $email));
            echo json_encode(array('status' => true, 'msg' => 'Registrazione avvenuta con successo. Effettuare l\'accesso'));
        } catch (PDOException $exception) {
            if ($exception->errorInfo[1] === 1062) {
                echo json_encode(array('status' => false, 'msg' => "Registrazione non avvenuta, la mail risulta già associata ad un altro account"));
            } else {
                echo json_encode(array('status' => false, 'msg' => 'Ops, qualcosa è andato storto, si prega di riprovare'));
            }
        }
    } else {
        echo json_encode(array('status' => false, 'msg' => 'L\'mail inserita non è valida, controllare.'));
    }
}
