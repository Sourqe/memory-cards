// intial variables
const cards = document.querySelectorAll('.memory-card');
let cardFlipped = false;
let boardLocked = false;
let firstCard, secondCard;

// function that flips a card
function flipCard() {
    // don't flip if the board is locked or if this is the first card
    if (boardLocked || (this === firstCard)) {
        return;
    }

    this.classList.add('flip');

    // if the card is not flipped yet
    if (!cardFlipped) {
        firstCard = this;
        cardFlipped = true;
        return;
    }

    boardLocked = true;
    secondCard = this;
    // check if the second card flipped is matching to the first card flipped
    checkIfMatching();
}

// check if a card combination is matching
function checkIfMatching() {
    let isMatching = firstCard.dataset.name === secondCard.dataset.name;
    isMatching ? disableCard() : unflipCards();
}

// flip a card combination and reset the bord if a wrong combination has been clicked
function disableCard() {
    firstCard.removeEventListener('click', flipCard);
    secondCard.removeEventListener('click', flipCard);
    resetBoard();
}

// unflip a card combination and reset the board
function unflipCards() {
    setTimeout(() => {
        firstCard.classList.remove('flip');
        secondCard.classList.remove('flip');

        resetBoard();
    }, 800);
}

// reset the complete board
function resetBoard() {
    cardFlipped = false;
    boardLocked = false;
    firstCard = null;
    secondCard = null;
}

// initially shuffle the board 
(function shuffle() {
    cards.forEach(card => {
        // generate a random number [0..11]
        let ramdomPos = Math.floor(Math.random() * 12);
        // assign that number as order to the card
        card.style.order = ramdomPos;
    });
})();

// add an event listener to each card for on-click events
cards.forEach(card => card.addEventListener('click', flipCard));