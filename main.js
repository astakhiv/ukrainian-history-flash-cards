const topics = ["Виначення", "Культура і мистецтво", "Дати", "Особи"];
const datasets = [null, null, dates, null];

const topicButtons = document.querySelectorAll("footer>button");
const heading = document.querySelector("h2");
const cardsContainer = document.querySelector(".cards");

const card = document.querySelector(".card");
const cardInner = document.querySelector(".card-inner");
const cardFront = document.querySelector(".front");
const cardBack = document.querySelector(".back");


let selectedTopic = 0;
let selectedCard = 0;
let dataset = datasets[selectedTopic];

let elementIndex = 0;
let opened = false;

let touchstartY = 0;
let touchendY = 0;

UpdateCard();

topicButtons.forEach((btn, i) => {
        btn.addEventListener("click", () => SelectTopic(i) )
    }
);

cardsContainer.addEventListener("touchstart", ReadTouchStart, false);
cardsContainer.addEventListener("touchend", ReadTouchEnd, false);

card.addEventListener("click", HandleFlipCard);

function UpdateCard() {
    if (dataset == null) {
        cardFront.innerText = "No data here";
        cardBack.innerText = "No data here";
    } else {
        cardFront.innerText = dataset[elementIndex][0];
        cardBack.innerText = dataset[elementIndex][1];
    }
}

function HandleFlipCard() {
    opened = !opened;

    if (opened) {
        cardInner.classList.add("flip");
    } else {
        cardInner.classList.remove("flip");
    }

    UpdateCard();
}

function SelectTopic(index) {
    topicButtons[selectedTopic].classList.remove("selected");
    selectedTopic = index;
    topicButtons[selectedTopic].classList.add("selected");
    heading.innerText = topics[selectedTopic];

    dataset = datasets[selectedTopic];
    elementIndex = 0;
    UpdateCard();
}

function ReadTouchStart(e) {
    touchstartY = e.touches[0].clientY;
}

function ReadTouchEnd(e) {
    touchendY = e.changedTouches[0].clientY;
    HandleGesure();
}

function HandleGesure() {
    if (touchstartY - touchendY > 50) {
        SetNextCard();
    } else if (touchendY - touchstartY > 50) {
        SetPrevCard();
    }

    UpdateCard();
}

function SetNextCard() {
    if (elementIndex + 1 >= dataset.length) {
        elementIndex = 0;
    } else {
        elementIndex++;
    }
}

function SetPrevCard() {
    if (elementIndex - 1 < 0) {
        elementIndex = dataset.length - 1;
    } else {
        elementIndex--;
    }
}
