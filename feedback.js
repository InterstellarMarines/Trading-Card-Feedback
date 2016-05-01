var backgroundNames = [
    "Earth from Space",
    "Marines in Hallway",
    "Marines on the Moon",
    "Mars Colony",
    "Photo Session",
    "Shark Creature",
    "Shark on Xeno-13",
    "Valhalla Landscape",
    "Valhalla Landscape with Moons"
];
var cardNames = [
    "Biological Research",
    "Exploration",
    "The Bridge",
    "Alien Combat",
    "Underground",
    "Carcharodon Polemos",
    "Scientist",
    "Facility",
    "Run to the Rocket!",
    "Interstellar Marines Team",
    "Access Shaft",
    "Hamster Complex",
    "Boarding the Megalodon",
    "Mars Colony",
    "Zero-Point Energy Reactor",
    "Arrow Star Spaceport",
    "Megalodon Landing",
    "City",
    "Valhalla",
    "AIV Kitty Hawk",
    "Cave Arena"
];

var ip = "";
var currentBackground = 1;
var bgJustSent = false;
var currentCard = 1;
var cardJustSent = false;

$.get("//api.ipify.org", function(data) {
    ip = data;
});

$(document).ready(function() {
    callCard(1);
    callBackground(1);

    $('.backgroundChanger').on('click', function() {
        callBackground(parseInt(this.id.slice(-2)));
        return false;
    });

    $('.cardChanger').on('click', function() {
        callCard(parseInt(this.id.slice(-2)));
        return false;
    });

    $("#prev-card").click(function() {
        if (currentCard > 1)
            callCard(currentCard - 1);
    });
    $("#next-card").click(function() {
        if (currentCard < cardNames.length)
            callCard(currentCard + 1);
    });

    $("#prev-bg").click(function() {
        if (currentCard < cardNames.length)
            callBackground(currentBackground - 1);
    });
    $("#next-bg").click(function() {
        if (currentBackground < backgroundNames.length)
            callBackground(currentBackground + 1);
    });

    $('#cardAlert').hide();
    $('#bgAlert').hide();

    $("#backgroundSubmitButton").click(function() {
        var rating = $('input[name=rating]:checked', '#bgFeedbackForm').val();
        var suggestedName = $('#bg-name').val();
        var comments = $('textarea#bgMessage').val();

        if (rating == null && suggestedName == "" && comments == "") {
            $('#bgAlert').empty();
            $('#bgAlert').append("You didn't leave any feedback");
            $('#bgAlert').show();
        } else {
            $.post('https://docs.google.com/a/keavon.com/forms/d/1Th7FgWP97e9ZdaQOvPHMRQdkIlCSA4XN4mEi8rWgrTQ/formResponse', {
                "entry.2063739673": ip,
                "entry.247527577": backgroundNames[currentBackground - 1],
                "entry.936553131": rating,
                "entry.2110721414": suggestedName,
                "entry.1283533319": comments
            });
			$('#bg-feedback-form').slideUp();
			$('#bgAlert').empty();
			$('#bgAlert').append("Thanks! Please leave feedback on the other backgrounds too.");
			$('#bgAlert').show();
			bgJustSent = true;
        }
        return false;
    });

    $("#cardSubmitButton").click(function() {
        var rating = $('input[name=rating]:checked', '#cardFeedbackForm').val();
        var suggestedName = $('#card-name').val();
        var comments = $('textarea#cardMessage').val();

        if (rating == null && comments == "" && suggestedName == "") {
            $('#cardAlert').empty();
            $('#cardAlert').append("You didn't leave any feedback");
            $('#cardAlert').show();
        } else {
            $.post('https://docs.google.com/a/keavon.com/forms/d/1qwt6lolKK7WwOesw6HTGnVHyotE5_zfUFXVQlkoOjMk/formResponse', {
				"entry.1772365482": ip,
                "entry.466016277": cardNames[currentCard - 1],
                "entry.1783271799": rating,
                "entry.1021376728": suggestedName,
                "entry.2147363142": comments
            });
			$('#card-feedback-form').slideUp();
			$('#cardAlert').empty();
			$('#cardAlert').append("Thanks for the feedback! Please leave feedback on the other cards too.");
			$('#cardAlert').show();
			cardJustSent = true;
        }
        return false;
    });

    $("a").click(function() {
        if (!$(this).hasClass("workingLink")) {
            return false;
        }
    });
});

function callBackground(call) {
    currentBackground = call;
    $('#theBgImage').css('background-image', 'url("images/backgrounds/' + currentBackground + '.jpg")');
    $('#bgImgToChange').css('background-image', 'url("images/backgrounds/' + currentBackground + '.jpg")');
    document.getElementById("currentBgTitle").innerHTML = backgroundNames[currentBackground - 1];

    if (currentBackground <= 1) {
        document.getElementById("prev-bg").disabled = true;
    } else {
        document.getElementById("prev-bg").disabled = false;
    }

    if (currentBackground >= backgroundNames.length) {
        document.getElementById("next-bg").disabled = true;
    } else {
        document.getElementById("next-bg").disabled = false;
    }

    if (bgJustSent) {
        $('#bg-feedback-form').slideDown();
        $('#bgAlert').empty();
        $('#bgAlert').append("Please enabled JavaScript");
        $('#bgAlert').hide();
        $('#bgFeedbackForm')[0].reset();

        bgJustSent = false;
    }
}

function callCard(call) {
    currentCard = call;
    document.getElementById("displayedCard").src = "images/cards/" + call + ".png";
    document.getElementById("selectedCardTitle").innerHTML = cardNames[currentCard - 1];
    document.getElementById("selectedCardName").innerHTML = cardNames[currentCard - 1];

    if (currentCard <= 1) {
        document.getElementById("prev-card").disabled = true;
    } else {
        document.getElementById("prev-card").disabled = false;
    }

    if (currentCard >= cardNames.length) {
        document.getElementById("next-card").disabled = true;
    } else {
        document.getElementById("next-card").disabled = false;
    }

    if (cardJustSent) {
        $('#card-feedback-form').slideDown();
        $('#cardAlert').empty();
        $('#cardAlert').append("Please enabled JavaScript");
        $('#cardAlert').hide();
        $('#cardFeedbackForm')[0].reset();

        cardJustSent = false;
    }
}