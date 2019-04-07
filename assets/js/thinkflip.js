/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */


// cards array holds all cards
var card = document.getElementsByClassName("card");
//var cards = [...card]
var cards = [];

Array.prototype.forEach.call(card, function (el) {
    // Do stuff here
    cards.push(el);
});

// deck of all cards in game
var deck = document.getElementById("card-deck");

// declaring move variable
var moves = 0;
var counter = document.querySelector(".moves");

// declaring variable of matchedCards
var matchedCard = document.getElementsByClassName("match");

// array for opened cards
var openedCards = [];

// @description function to initialize the cards
function initialize()
{
    $("#lblinformation").hide();
    $("#btnEnd").hide();
    Array.prototype.forEach.call(card, function (el) {
        // Do stuff here
        cards.push(el);
    });
    // loop to add event listeners to each card
    for (var i = 0; i < cards.length; i++) {
        card = cards[i];
        card.addEventListener("click", displayCard);
        card.addEventListener("click", cardOpen);
        card.addEventListener("click", congratulations);
    }
}

// @description function to start a new play
function startGame(element, game_mode) {
    try
    {
        $("#lblinformation").show();
        $("#btnEnd").show();

        if (openedCards.length === 2) {
            document.getElementById('lblErrMsg').innerText = "Game can't start with One card!";
            // show Error modal
            $('#popupError').modal({
                keyboard: false,
                backdrop: 'static'
            });
            
        } else
        {
            if (element.getAttribute("start") === "true")
            {
                document.getElementById('lblStart').innerText = "click a card to uncover it";
                $('.scontainer').shuffle({
                    times: 20,
                    durations: [100, 100, 75]
                });

                for (var i = 0; i < cards.length; i++)
                {
                    var ChildNode = cards[i].querySelector('.child');
                    ChildNode.innerHTML = "";
                    ChildNode.classList.remove("question");
                    ChildNode.classList.add("questionLG");

                    cards[i].classList.add(getBGClassName(i));
                    if (game_mode === "new")
                        cards[i].classList.remove("show", "open", "match", "disabled");
                }

                // reset moves
                moves = 0;

                element.disabled = true;
                element.setAttribute("start", "false");
                element.innerHTML = "<span class='spinner-grow spinner-grow-sm'></span> Game in Progress";

            } else
            {
                // PLAY AGAIN MODULE
                showpopUpConfirm_Window();
            }
        }
    } catch (exception)
    {
        alert("Error occured due to " + exception.message);
    }
}

// @description toggles open and show class to display cards
var displayCard = function () {
    this.classList.toggle("open");
    this.classList.toggle("show");
    this.classList.toggle("disabled");
    this.classList.toggle('remove');

};

// @description add opened cards to OpenedCards list and check if cards are match or not
function cardOpen() {
    openedCards.push(this);
    var len = openedCards.length;

    var ChildNode = this.querySelector('.child');
    var burnAttr = ChildNode.getAttribute('brun');

    ChildNode.innerHTML = burnAttr;
    ChildNode.classList.remove("questionLG");
    ChildNode.classList.add("question");

}
;

// @description disable cards temporarily
function disable() {
    Array.prototype.filter.call(cards, function (card) {
        card.classList.add('disabled');
    });
}


// @description enable cards and disable matched cards
function enable() {
    Array.prototype.filter.call(cards, function (card) {
        card.classList.remove('disabled');
        for (var i = 0; i < matchedCard.length; i++) {
            matchedCard[i].classList.add("disabled");
        }
    });
}

// @description congratulations when all cards match, show modal and moves, time and rating
function congratulations()
{
    try {
        if (openedCards !== null && openedCards.length > 0)
        {
            var element = openedCards[openedCards.length - 1];

            var bonusType = element.getAttribute("type");
            document.getElementById('lblHeader').innerHTML = "Congratulations!";
            document.getElementById('popupContent').innerHTML = getMessageFromType(bonusType);

            // show congratulations modal
            $('#popupCongrats').modal({
                keyboard: false,
                backdrop: 'static'
            });
        }

    } catch (exception)
    {

    }
}

// @desciption for user to play Again
function playAgain() {

    try
    {
        // Hide Playagain modal
        $('#popupReplay').modal('hide');
        if (checkBalance() === true)
            refreshCards();
        else
        {
            document.getElementById('lblErrMsg').innerText = "No Sufficent balance to start game!.";
            // show Error modal
            $('#popupError').modal({
                keyboard: false,
                backdrop: 'static'
            });
        }
    } catch (exception)
    {

    }

}

// @description to get message information.
function getMessageFromType(type)
{
    if (type === "MNO")
        return "You won 100 local minutes";
    else if (type === "CNO")
        return "You won 10GB Data";
    else
        return "You won 1KD bonus credit";

}

// @description to refresh all the cards to start game again
function refreshCards()
{
    resetCards();
    var startBtn = document.getElementById('btnStarter');
    startBtn.disabled = false;
    startBtn.setAttribute("start", "true");
    startBtn.innerHTML = "START GAME";
    document.getElementById('lblStart').innerText = "";

}

// @description to cancel continue game and go to game end.
function cancelPlayAgain()
{
    $('#popupReplay').modal('hide');

    var url = "./completed.html";
    window.location.href = url;
}

// @description close the congrats model and ask to play again.
function closePopupModel()
{
    $('#popupCongrats').modal('hide');
    var element = document.getElementById('btnStarter');

    element.disabled = false;
    element.setAttribute("start", "false");
    element.innerHTML = "<span class='fa fa-refresh'></span> Play Again";
    element.setAttribute("start", "false");

    document.getElementById('lblStart').innerText = "";
    resetCards();

    if (openedCards.length === 2) {
        var url = "./completed.html?msg='Game Completed..'";
        window.location.href = url;

    }
}

// @description reset the cards to play again.
function resetCards()
{
    //remove Opened Cards
    for (var openedLen = 0; openedLen < openedCards.length; openedLen++) {
        openedCards[openedLen].parentNode.remove();
    }


    for (var i = 0; i < cards.length; i++) {
        var ChildNode = cards[i].querySelector('.child');
        var burnAttr = ChildNode.getAttribute('brun');

        ChildNode.innerHTML = burnAttr;
        ChildNode.classList.remove("questionLG");
        ChildNode.classList.add("question");
        cards[i].parentNode.removeAttribute("style");

        cards[i].classList.remove("zainBG", "xtraBG");
    }
    disable();
}

// @description show model to confirm 
function showpopUpConfirm_Window()
{
    // show PlayAgain modal
    $('#popupReplay').modal({
        keyboard: false,
        backdrop: 'static'
    });
}

// @description function to set background image to cards.
function getBGClassName(index)
{
    var classList = ["zainBG", "xtraBG"];

    var classItem = classList[Math.floor(Math.random() * classList.length)];
    return classItem;
}

// @description End game
function endGame()
{
    try
    {
        //refreshCards();
        var url = "./completed.html";
        window.location.href = url;

    } catch (exception)
    {

    }
}

// @description check balance before play again
function checkBalance()
{
    // For Testing only...
    return true;
}