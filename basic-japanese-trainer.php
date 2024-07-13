<?php

    require_once("includes/config-sessions.inc.php");
    require_once("includes/bjt.inc.php");

?>

<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <link rel="stylesheet" href="style/style2.css">
    <script src="https://ajax.googleapis.com/ajax/libs/jquery/3.7.1/jquery.min.js"></script> 
    <script src="js/main2.js"></script> 
    <title>Basic Japanese Trainer | Nebulotus</title>
</head>
<body>
    <span id="trainer-title">Basic Japanese Trainer</span>
    <br><br>
    <nav id="practice">
        <button id="hira">Hiragana</button>
        <button id="kata">Katakana</button>
        <button id="kanj">Kanji</button>
    </nav>
    <br><br>
    <span id="loading" hidden>Loading</span>
    <?php flashStart() ?>
    <br><br>
    <span id="loading2" hidden>Loading</span>
    <span id="answer" hidden></span>
</body>
</html>