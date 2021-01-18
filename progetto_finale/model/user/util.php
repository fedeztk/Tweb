<?php
// general file included by all files under model directory

if (!isset($_SESSION))
    session_start();

function connectToDB()
{
    try {
        $db = new PDO("mysql:dbname=bbceramics; host=localhost; charset=utf8mb4", "root", "");
        $db->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
    } catch (PDOException $exception) {
        echo $exception->getMessage();
    }
    return $db;
}
