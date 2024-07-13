// Idea List:
// Make it so that when it says if the user's choice is "corrent" or "incorrect",
// put each on seperate elemenets and hide them, only showing them when appropriate

$(document).ready(function() {
    // Intialize setup stuff
    navUnder();
    resizeQM();

    // Figure out what the user wants to practice
    // AND setup their flashcards according to user choice
    $("#practice button").click(function() {
        // If the user selects a new thing to practice
        if (!$(this).css("text-decoration").includes("underline")) {
            $("#answer").html("");
            // $("#answer").hide();
            // $("#flashstart").hide();
            // $("#loading").show();

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

                // $("#loading").hide();
                // $("#flashstart").show();
                navUnder();
            });
        }
    });

    // Loads the next set of options
    $("#next").click(function() {
        $("#options button").css({"color": "#1A1A1A"});
        $("#answer").html("");
        // $("#answer").hide();

        // $("#flashstart").hide();
        // $("#loading").show();

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

            // $("#loading").hide();
            // $("#flashstart").show();
        });
    });

    // controls what happens with each selection /
    // determines whether the selected option is right or not
    $("#options button").click(function() {
        // $("#loading2").show();
        // $("#answer").hide();
        // console.log($(this).html());
        let choice = $(this);

        const PATH = "includes/bjt.inc.php";
        const DATA = {
            "check": $(this).text()
        };

        // let ANS = $(this);
        $.post(PATH, DATA, function(data, status) {
            let response = jQuery.parseJSON(data);
            if (response["answer"] == "incorrect") {
                $("#answer").html("Incorrect! :(");
                choice.css("color", "red");
                // $("#answer").show();
            } else if (response["answer"] == "correct") {
                $("#answer").html("Correct! :)");
                // choice.css("background-color", "green");
                choice.css("color", "green");
                // $("#answer").show();
            }

            // $("#loading2").hide();
        });

    });

    // Extras
    setInterval(Loading, 750);
});

let dot = 0;
let dot2 = 0;

// Adds dots to loading text (just to make it look cool ig)
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

// Underlines whatever is currently being practiced from the selection menu
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

// IF the display size is around what a phone would be
// resize some elements so that it looks good on mobile
function resizeQM() {

    // if the screen is something bigger than a phone in protrait mode
    if (window.innerWidth > 540) {
        $("button").css({"font-size": "25px"});
    }
    // If the screen is around the size of a phone in protrait mode
    else {
        $("#trainer-title").css({"font-size": "35px"});
        $("#what-am-i-doing").css({"font-size": "35px"});
        $("#options button, #next").css({"width": "40%"});
    }
}