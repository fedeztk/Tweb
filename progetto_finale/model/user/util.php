<?php
// login utilities
if (!isset($_SESSION)) {
    session_start();
}

if (!isset($_SESSION['name']))
    header('location: ../../view/user.php');

function connectToDB()
{
    try {
        $db = new PDO("mysql:dbname=bbceramics;host=localhost;charset=utf8mb4", "root", "");
        $db->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
    } catch (PDOException $exception) {
        echo $exception->getMessage();
    }
    return $db;
}
