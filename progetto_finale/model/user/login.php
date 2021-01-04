<?php

include("util.php");

header("Content-type: application/json");

if (!$_POST['email'] || !$_POST['password']) {
    echo json_encode(array('status' => false, 'msg' => 'Ops, qualcosa è andato storto, controllare di aver compilato entrambi i campi...'));
} else {
    //retrieve user input
    $email = filter_var($_POST['email'], FILTER_SANITIZE_EMAIL);
    $password = $_POST['password'];

    //find associated account
    $db = connectToDB();
    $logUserQ = $db->prepare('SELECT password, name FROM user WHERE email = ?');
    $logUserQ->execute(array($email));
    $user = $logUserQ->fetch(PDO::FETCH_ASSOC);

    if ($user) {
        if (password_verify($password, $user['password'])) {
            //session management
            if (isset($_SESSION))
                session_regenerate_id(true);

            $_SESSION['name'] = $user['name'];

            //success
            echo json_encode(array('status' => true, 'msg' => $email));
        } else { //failure
            echo json_encode(array('status' => false, 'msg' => 'L\'e-mail o la password inseriti non sono validi, ricontrollare'));
        }
    } else { //failure
            echo json_encode(array('status' => false, 'msg' => 'L\'e-mail non risulta associata ad alcun account'));
    }
}

//TODO remove
function validatePassword($email, $password)
{
    $db = connectToDB();
    $logUserQ = $db->prepare('SELECT password FROM user WHERE email = ?');
    $logUserQ->execute(array($db->quote($email)));
    $user = $logUserQ->fetch(PDO::FETCH_ASSOC);

    if ($user)
        return password_verify($password, $user['password']);
    else
        return false;
}
