<?php

    require_once("config-sessions.inc.php");

    if (isset($_POST["practice"])) {
        // Only really used whenever page is reloaded
        $_SESSION['practice'] = $_POST['practice'];
        
        // Setup JSON to return for decoding
        $PATH = "../data/" . strtolower($_POST["practice"]) . ".csv";

        $OUT = getFromCSV($PATH);
        echo json_encode($OUT);
    }

    if (isset($_POST['next'])) {
        $PATH = "../data/" . $_POST["next"] . ".csv";
        $OUT = getFromCSV($PATH);
        echo json_encode($OUT);
    }

    if (isset($_POST['check'])) {
        $OUT = array(
            "answer" => ""
        );

        if (isset($_SESSION['answer']) && $_POST['check'] == $_SESSION['answer']) {
            $OUT["answer"] = "correct";
        } else {
            $OUT["answer"] = "incorrect";
        }

        echo json_encode($OUT);
    }

    function flashStart() {
        print('<section id="flashstart">');
        print('<span id="what-am-i-doing">');
        if (!isset($_SESSION["practice"]) || $_SESSION["practice"] == "Hiragana") {
            print('<span id="current">Identify the following Hiragana: </span>');
            $PATH = "data/hiragana.csv";
        } else if ($_SESSION["practice"] == "Katakana") {
            print('<span id="current">Identify the following Katakana: </span>');
            $PATH = "data/katakana.csv";
        } else if ($_SESSION["practice"] == "Kanji") {
            print('<span id="current">Identify the following Kanji: </span>');
            $PATH = "data/kanji.csv";
        }

        $OUT = getFromCSV($PATH);

        print('<span id="key">' . $OUT["key"] . '</span>');
        print('</span>');

        print('
            <br><br>'
        );
        print('
            <section id="options">
                <button>' . $OUT["option-1"] . '</button>
                <button>' . $OUT["option-2"] . '</button>
                <button>' . $OUT["option-3"] . '</button>
                <button>' . $OUT["option-4"] . '</button>
            </section>
        ');

        print('
                <br><br>
                <button id="next">Next</button>
            </section>
        ');
    }

    function getFromCSV($PATH) {
        // Setup output json
        $OUTPUT = array(
            "key" => "",
            "option-1" => "",
            "option-2" => "",
            "option-3" => "",
            "option-4" => ""
        );

        // Get the total number of lines for the requested file
        $linecount = 0;
        $handle = fopen($PATH, "r");
        while (!feof($handle)) {
            $line = fgets($handle);
            $linecount++;
        }
        fclose($handle);

        if (($open = fopen($PATH, "r")) !== false) {
            while (($data = fgetcsv($open, $linecount, ",")) !== false) {
                $array[] = $data;
            }
        }

        $RANDNUM = rand(1, $linecount - 1);
        $OUTPUT["key"] = $array[$RANDNUM][1];
        $opts = [];

        while (true) {
            $rnum = rand(1, $linecount - 1);
            if ($rnum == $RANDNUM)
                continue;
            array_push($opts, $array[$rnum][0]);
            if (count($opts) >= 4)
                break;
        }

        $ranum = rand(0, 3);
        $opts[$ranum] = $array[$RANDNUM][0];

        for ($i = 0; $i < 4; $i++) {
            $PT = "option-" . $i + 1;
            $OUTPUT[$PT] = $opts[$i];
        }

        $_SESSION['answer'] = $array[$RANDNUM][0];

        return $OUTPUT;
    }