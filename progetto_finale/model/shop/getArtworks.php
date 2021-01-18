<?php
// get colors and categories in arrays based on artworks currently avaiable on the shop
include("../user/util.php");

header("Content-type: application/json");

$db = connectToDB();
$productsQ = $db->prepare('SELECT id, name FROM artwork');
$productsQ->execute();
$imgs = $productsQ->fetchAll();

$colorsQ = $db->prepare('SELECT DISTINCT color FROM artwork');
$colorsQ->execute();
$colorsColumn = array_column($colorsQ->fetchAll(), 'color');
$colors=array();
foreach($colorsColumn as $currArtColorsID => $currArtColors){
    $currentArray= explode(",", $currArtColors);
    foreach($currentArray as $singleColor){
        if(!(in_array($singleColor, $colors)))
            $colors[]=$singleColor;
    }
}

$categoriesQ = $db->prepare('SELECT DISTINCT category FROM artwork');
$categoriesQ->execute();
$categories = array_column($categoriesQ->fetchAll(), 'category');

echo json_encode(array('imgs' => $imgs, 'colors' => $colors, 'categories' => $categories));
