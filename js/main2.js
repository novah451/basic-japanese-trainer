$(document).ready(function() {
    // Intialize setup stuff
    navUnder();

    // Figure out what the user wants to practice
    // AND setup their flashcards according to user choice
    $("#practice button").click(function() {
        if (!$(this).css("text-decoration").includes("underline")) {
            $("#answer").hide();
            $("#flashstart").hide();
            $("#loading").show();

            const PRAC = $(this).text();
            const PATH = "includes/bjt.inc.php";
            const DATA = {
                "practice": $(this).text()
            };

            $.post(PATH, DATA, function(data, status) {
                let response = jQuery.parseJSON(data);
                let iter = 1;

                $("#options button").each(function() {
                    let collect = "option-" + iter;
                    $(this).html(response[collect]);
                    iter++;
                });
                    
                $("#current").html("Identify the following " + PRAC + ": ");
                $("#key").html(response["key"]);

                $("#loading").hide();
                $("#flashstart").show();
                navUnder();
            });
        }
    });

    $("#next").click(function() {
        // $("#options button").css("background-color", "white");
        // $("#answer").html("");
        $("#answer").hide();

        $("#flashstart").hide();
        $("#loading").show();

        let PRAC = $("#current").text();
        if (PRAC.includes("Hiragana")) {
            PRAC = "hiragana";
        } else if (PRAC.includes("Katakana")) {
            PRAC = "katakana";
        } else if (PRAC.includes("Kanji")) {
            PRAC = "kanji";
        }

        const PATH = "includes/bjt.inc.php";
        const DATA = {
            "next": PRAC
        };

        $.post(PATH, DATA, function(data, status) {
            let response = jQuery.parseJSON(data);
            let iter = 1;

            $("#options button").each(function() {
                let collect = "option-" + iter;
                $(this).html(response[collect]);
                iter++;
            });
            
            $("#key").html(response["key"]);

            $("#loading").hide();
            $("#flashstart").show();
        });
    });

    $("#options button").click(function() {
        $("#loading2").show();
        $("#answer").hide();
        
        const PATH = "includes/bjt.inc.php";
        const DATA = {
            "check": $(this).text()
        };

        // let ANS = $(this);
        $.post(PATH, DATA, function(data, status) {
            let response = jQuery.parseJSON(data);
            if (response["answer"] == "incorrect") {
                $("#answer").html("Incorrect! :(");
                $("#answer").show();
            } else if (response["answer"] == "correct") {
                $("#answer").html("Correct! :)");
                $("#answer").show();
            }

            $("#loading2").hide();
        });

    });

    // Extras
    setInterval(Loading, 750);
});

let dot = 0;
let dot2 = 0;

function Loading() {
    if ($("#loading").is(":visible") && dot < 3) {
        $("#loading").append(" .");
        dot++;
    } else if ($("#loading").is(":visible") && dot == 3) {
        $("#loading").html("Loading");
        dot = 0;
    } else {
        $("#loading").html("Loading");
        dot = 0;
    }

    if ($("#loading2").is(":visible") && dot < 3) {
        $("#loading2").append(" .");
        dot2++;
    } else if ($("#loading2").is(":visible") && dot == 3) {
        $("#loading2").html("Loading");
        dot2 = 0;
    } else {
        $("#loading2").html("Loading");
        dot2 = 0;
    }
}

function navUnder() {
    $("#practice button").css("text-decoration", "none");

    let PRAC = $("#current").text();
    if (PRAC.includes("Hiragana")) {
        PRAC = "#hira";
        $(PRAC).css("text-decoration", "underline");
    } else if (PRAC.includes("Katakana")) {
        PRAC = "#kata";
        $(PRAC).css("text-decoration", "underline");
    } else if (PRAC.includes("Kanji")) {
        PRAC = "#kanj";
        $(PRAC).css("text-decoration", "underline");
    }
}