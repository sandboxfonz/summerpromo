// cards array holds all cards
let card = document.getElementsByClassName("card");
let cards = [...card]

// deck of all cards in game
const deck = document.getElementById("card-deck");

// declaring move variable
let moves = 0;
let counter = document.querySelector(".moves");

// declaring variable of matchedCards
let matchedCard = document.getElementsByClassName("match");

// declare modal
let modal = document.getElementById("popup1")

// close icon in modal
let closeicon = document.querySelector(".close");

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

// @description shuffles cards when page is refreshed / loads
//document.body.onload = startGame();



// @description function to start a new play
function startGame(element) {

    if (element.getAttribute("start") == "true")
    {

        // shuffle deck
        cards = shuffle(cards);

        $('.scontainer').shuffle({
            times: 4,
            durations: [500, 650, 750, 500, 900]
        })

        // remove all exisiting classes from each card
        for (var i = 0; i < cards.length; i++) {
            //deck.innerHTML = "";
            [].forEach.call(cards, function (item) {

                var ChildNode = item.querySelector('.child');
                ChildNode.innerHTML = "?";

                ChildNode.classList.remove("question");
                ChildNode.classList.add("questionLG");

                //var col = document.createElement('div');
                //col.className = 'col-4 box';
                //col.appendChild(item);
                //deck.appendChild(col);
            });
            cards[i].classList.remove("show", "open", "match", "disabled", "bg-danger-border");
        }
        // reset moves
        moves = 0;

        element.classList.remove("fa-angle-double-right");

        element.disabled = true;
        element.setAttribute("start", "false");
        element.innerHTML = "<span class='spinner-grow spinner-grow-sm'></span> Game in Progress";
    }else
    {

    }
}

// @description toggles open and show class to display cards
var displayCard = function () {
    this.classList.toggle("open");
    this.classList.toggle("show");
    this.classList.toggle("disabled");
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

    if (len === 3) {
        //moveCounter();
        var d = openedCards[0].getAttribute('type');

        if (openedCards[0].getAttribute('type') === openedCards[1].getAttribute('type'))
        {
            if(openedCards[1].getAttribute('type') === openedCards[2].getAttribute('type'))
                matched();
            else
                unmatched();
        } else
        {
            unmatched();
        }
    }
};

// @description when cards match
function matched() {
    openedCards[0].classList.add("match", "disabled");
    openedCards[1].classList.add("match", "disabled");
    openedCards[2].classList.add("match", "disabled");
    openedCards[0].classList.remove("show", "open", "no-event");
    openedCards[1].classList.remove("show", "open", "no-event");
    openedCards[2].classList.remove("show", "open", "no-event");
    openedCards = [];
}

// description when cards don't match
function unmatched() {
    openedCards[0].classList.add("unmatched");
    openedCards[1].classList.add("unmatched");
    openedCards[2].classList.add("unmatched");
    disable();
    setTimeout(function () {
        openedCards[0].classList.remove("show", "open", "no-event", "unmatched");
        openedCards[1].classList.remove("show", "open", "no-event", "unmatched");
        openedCards[2].classList.remove("show", "open", "no-event", "unmatched");
        enable();

        for(var i=0;i<=openedCards.length-1;i++)
        {
            var ChildNode = openedCards[i].querySelector('.child');
            ChildNode.innerHTML = "X";
            var burnAttr = ChildNode.getAttribute('brun');
            openedCards[i].classList.add("bg-danger-border", "disabled");
            ChildNode.classList.remove("question");
            ChildNode.classList.add("questionLG");
        }

        openedCards = [];
    }, 1100);
}

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
function congratulations() {

    if (matchedCard.length == 3) {
        //clearInterval(interval);
        //finalTime = timer.innerHTML;

        document.getElementById('lblHeader').innerHTML = "CONGRATS!";
        document.getElementById('popupContent').innerHTML = "You just added Credit";

        // show congratulations modal
        modal.classList.add("show");

        // declare star rating variable
        //var starRating = document.querySelector(".stars").innerHTML;

        //showing move, rating, time on modal
        //document.getElementById("finalMove").innerHTML = moves;
        //document.getElementById("starRating").innerHTML = starRating;
        //document.getElementById("totalTime").innerHTML = finalTime;

        //closeicon on modal
        closeModal();
    }else if(openedCards.length==3)
    {
        document.getElementById('lblHeader').innerHTML = "YOU LOST!";
        document.getElementById('popupContent').innerHTML = "Try again next time";

        // show congratulations modal
        modal.classList.add("show");
        closeModal();
    }
}


// @description close icon on modal
function closeModal() {
    closeicon.addEventListener("click", function (e) {
        modal.classList.remove("show");
        //startGame(document.getElementById('btnStarter'));

        var url = "./ThankU.html";
        window.location.href = url;
    });
}


// @desciption for user to play Again
function playAgain() {
    modal.classList.remove("show");
    var element = document.getElementById('btnStarter')
    element.setAttribute("start", "true");

    startGame(document.getElementById('btnStarter'));
}


// loop to add event listeners to each card
for (var i = 0; i < cards.length; i++) {
    card = cards[i];
    card.addEventListener("click", displayCard);
    card.addEventListener("click", cardOpen);
    card.addEventListener("click", congratulations);
};



function shuffleElement () {
    var parent = $("#card-deck");
    var divs = parent.children();
    while (divs.length) {
        parent.append(divs.splice(Math.floor(Math.random() * divs.length), 1)[0]);
    }
};

// CHECK THE MSDN SUBSCRIBER BEFORE PLAYING GAME...
function getSubscriperDetails(gametype)
{
    try{
        var url = "";
        if (gametype === 1)
            url = "./CardsGame.html";
        else
            url = "./CardGame2.html";

        window.location.href=url;
    }catch(exception)
    {
        alert(exception.message);

    }

}

function getParameterByName(name, url) {
    if (!url) url = window.location.href;
    name = name.replace(/[\[\]]/g, '\\$&');
    var regex = new RegExp('[?&]' + name + '(=([^&#]*)|&|#|$)'),
        results = regex.exec(url);
    if (!results) return null;
    if (!results[2]) return '';
    return decodeURIComponent(results[2].replace(/\+/g, ' '));
}


