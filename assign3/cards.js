const cards = [
    {
        value: 1,
        src: '1clubs.png'
    },
    {
        value: 1,
        src: '1hearts.png'
    },
    {
        value: 2,
        src: '2clubs.png'
    },
    {
        value: 2,
        src: '2hearts.png'
    },
    {
        value: 3,
        src: '3clubs.png'
    },
    {
        value: 3,
        src: '3hearts.png'
    },
]

var cardElements = [];
var lastClicked = [];
var canClick = true;
var removeTimeout;

function getRandomInt(max) {
    return Math.floor(Math.random() * max);
}

function shuffleCards() {
    let shuffledResult = [];
    let cardsCopy = cards;

    while (shuffledResult.length < 6) {
        const index = getRandomInt(cardsCopy.length)
        shuffledResult.push(cardsCopy[index])
        cardsCopy = cardsCopy.filter(card => cardsCopy.indexOf(card) !== index)
    }

    return shuffledResult
}

const cardsElement = document.getElementById('cards')

function handleClick(e, card) {
    if (!canClick) return
    const [value, src] = card.id.split(':')
    lastClicked.push(card);
    if (lastClicked.length !== 2) {
        card.src = src;
    } else {
        card.src = src;
        canClick = false;
        removeTimeout = setTimeout(() => {
            if (lastClicked[0].id.split(':')[0] === lastClicked[1].id.split(':')[0]) {
                cardsElement.removeChild(lastClicked[0])
                cardsElement.removeChild(lastClicked[1])
            }
            for (const card of lastClicked) {
                card.src = 'back.png'
            }
            canClick = true;
            lastClicked = [];
        }, 1500);
    }
}

function startGame() {
    lastClicked = [];
    for (const card of shuffleCards()) {
        const cardElement = document.createElement('img')
        cardElement.src = 'back.png'
        cardElement.classList.add('card')
        cardElement.id = card.value + ':' + card.src
        cardElement.onclick = (e) => {
            handleClick(e, cardElement);
        }
        cardElements.push(cardElement)
        cardsElement.appendChild(cardElement)
    }
}

startGame();

function restartGame() {
    clearTimeout(removeTimeout)
    cardsElement.innerHTML = '';
    canClick = true;
    lastClicked = [];
    startGame()
}

const restartButton = document.getElementById('restart')

restartButton.onclick = (e) => {
    restartGame();
}
