<?php
// common php for all pages except user.php
// redirect to user.php if the user is not logged in

if (!isset($_SESSION))
    session_start();
if (!isset($_SESSION['email']))
    header('location: user.php');
