<?php
include "top.html";
$name = $_REQUEST["name"];
$info = $_REQUEST;
$new_single = implode(",", $info);
file_put_contents("singles.txt", $new_single . PHP_EOL, FILE_APPEND);
?>

<div>
    <h1><strong>Thank you!</strong></h1>

    <p> Welcome to NerdLuv <?= $name ?>!</p>

    <p>Now <a href="matches.php">log in to see your matches!</a></p>
</div>

<?php include "bottom.html"; ?>
