// cards array holds all cards
var card = document.getElementsByClassName("card");
//var cards = [...card]
var cards = []

Array.prototype.forEach.call(card, function (el) {
    // Do stuff here
    cards.push(el);
});

// deck of all cards in game
const deck = document.getElementById("card-deck");

// declaring move variable
var moves = 0;
var counter = document.querySelector(".moves");

// declaring variable of matchedCards
var matchedCard = document.getElementsByClassName("match");

// declare modal
var modal = document.getElementById("popup2")
var confirm_modal = document.getElementById("popup3")

// close icon in modal
var closeicon = document.querySelector("#closeCongrats");

// array for opened cards
var openedCards = [];

// @description shuffles cards
// @param {array}
// @returns shuffledarray
function shuffle(array) {
    var currentIndex = array.length, temporaryValue, randomIndex;

    while (currentIndex !== 0) {
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex -= 1;
        temporaryValue = array[currentIndex];
        array[currentIndex] = array[randomIndex];
        array[randomIndex] = temporaryValue;
    }

    return array;
};

// @description function to start a new play
function startGame(element,game_mode) {
    try
    {        
        if (element.getAttribute("start") == "true") {           
            // shuffle deck
            //cards = shuffle(cards);

            document.getElementById('lblStart').innerText = "click a card to uncover it";
            $('.scontainer').shuffle({
                times: 3,
                durations: [500, 650, 750]
            });
            // remove all exisiting classes from each card
            for (var i = 0; i < cards.length; i++) {
                //deck.innerHTML = "";
                [].forEach.call(cards, function (item) {

                    var ChildNode = item.querySelector('.child');
                    //if (game_mode === "new")
                    //{
                    //    ChildNode.innerHTML = "";
                    //    ChildNode.classList.remove("question");
                    //    ChildNode.classList.add("questionLG");
                    //}
                    ChildNode.innerHTML = "";
                    ChildNode.classList.remove("question");
                    ChildNode.classList.add("questionLG");

                    cards[i].classList.add(getBGClassName(i));
                });

                if (game_mode === "new")
                    cards[i].classList.remove("show", "open", "match", "disabled");

            }
            // reset moves
            moves = 0;

            //element.classList.remove("fa-angle-double-right");

            element.disabled = true;
            element.setAttribute("start", "false");
            element.innerHTML = "<span class='spinner-grow spinner-grow-sm'></span> Game in Progress";
        }
        else {
            // PLAY AGAIN MODULE
            showpopUpConfirm_Window();
        }
    }catch(exception)
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

};

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

// loop to add event listeners to each card
for (var i = 0; i < cards.length; i++) {
    card = cards[i];
    card.addEventListener("click", displayCard);
    card.addEventListener("click", cardOpen);
    card.addEventListener("click", congratulations);
};

// @description congratulations when all cards match, show modal and moves, time and rating
function congratulations() {

    if (openedCards != null && openedCards.length > 0)
    {
        var element = openedCards[openedCards.length - 1];

        var bonusType = element.getAttribute("type");
        document.getElementById('lblHeader').innerHTML = "Congratulations!";
        document.getElementById('popupContent').innerHTML = getMessageFromType(bonusType);

        // show congratulations modal
        modal.classList.add("show");
    }

    //closeicon on modal
    closeModal();
}

// @description close icon on modal
function closeModal() {
    closeicon.addEventListener("click", function (e) {
        closePopupModel();
    });
}

// @desciption for user to play Again
function playAgain() {
    confirm_modal.classList.remove("show");

    refreshCards();

    //if (cards.length === openedCards.length+1)
    //{
    //    var url = "./ThankU.html?msg='No Cards remaining...'";
    //    window.location.href = url;

    //}else
    //{
    //    refreshCards();
    //}
}


function getMessageFromType(type)
{
    if (type === "MNO")
        return "You won 100 local minutes";
    else if (type === "CNO")
        return "You won 10GB Data";
    else
        return "You won 1KD bonus credit";

}

function refreshCards()
{
    resetCards();
    var startBtn = document.getElementById('btnStarter');
    startBtn.disabled = false;
    startBtn.setAttribute("start", "true");
    startBtn.innerHTML = "START GAME";
    document.getElementById('lblStart').innerText = "";

}

function cancelPlayAgain()
{
    modal.classList.remove("show");
    var url = "./ThankU.html";
    window.location.href = url;
}

function closePopupModel()
{
    modal.classList.remove("show");
    var element = document.getElementById('btnStarter')

    element.disabled = false;
    element.setAttribute("start", "false");
    element.innerHTML = "<span class='fa fa-refresh'></span> Play Again";
    element.setAttribute("start", "false");

    document.getElementById('lblStart').innerText = "";
    resetCards();

    if (openedCards.length === 2) {
        openedCards = [];
        var url = "./ThankU.html?msg='Game Completed..'";
        window.location.href = url;

    }
}

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

function showpopUpConfirm_Window()
{
    confirm_modal.classList.add("show");
}

function getBGClassName(index)
{
    var classList = ["zainBG", "xtraBG"];

    var classItem = classList[Math.floor(Math.random() * classList.length)];
    return classItem;
}