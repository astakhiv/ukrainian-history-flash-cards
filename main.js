const topics = ["Культура і мистецтво", "Дати", "Особи", "Інформація"];
const datasets = [culture, dates, images, info];

const topicButtons = document.querySelectorAll("footer>button");
const heading = document.querySelector("h2");
const cardsContainer = document.querySelector(".cards");

const curLengthText = document.querySelector(".cur-length");
const sectionLength = document.querySelector(".length");

const card = document.querySelector(".card");
const cardInner = document.querySelector(".card-inner");
const cardFrontText = document.querySelector(".card-inner>p");
const cardFrontImg = document.querySelector(".card-inner>img")
const cardBackText = document.querySelector(".back");


let selectedTopic = 0;
let selectedCard = 0;
let dataset = datasets[selectedTopic];
let isFrontImage = true;

let elementIndex = 0;
let opened = false;

let touchstartY = 0;
let touchendY = 0;

UpdateCard();
UpdateTopic();
UpdateLength();

topicButtons.forEach((btn, i) => {
        btn.addEventListener("click", () => SelectTopic(i) )
    }
);

cardsContainer.addEventListener("touchstart", ReadTouchStart, false);
cardsContainer.addEventListener("touchend", ReadTouchEnd, false);

card.addEventListener("click", HandleFlipCard);

function UpdateCard() {
    if (dataset == null) {
        SetFrontData("No data here");
        cardBackText.innerText = "No data here";
    } else {
        SetFrontData(dataset[elementIndex][0]);
        cardBackText.innerText = dataset[elementIndex][1];
    }
}

function SetFrontData(data) {
    if (isFrontImage) {
        cardFrontImg.src = data;
    } else {
        cardFrontText.innerText = data;
    }
}

function HandleFrontTypeChange() {
    if (isFrontImage) {
        cardFrontText.classList.add("invisible");
        cardFrontImg.classList.remove("invisible");
    } else {
        cardFrontText.classList.remove("invisible");
        cardFrontImg.classList.add("invisible");
    }
}

function UpdateTopic() {
    heading.innerText = topics[selectedTopic];
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

function UpdateLength() {
    curLengthText.innerText = elementIndex + 1;
    sectionLength.innerText = dataset.length;
}

function SelectTopic(index) {
    topicButtons[selectedTopic].classList.remove("selected");
    selectedTopic = index;
    topicButtons[selectedTopic].classList.add("selected");
    isFrontImage = index % 2 === 0;

    dataset = datasets[selectedTopic];
    elementIndex = 0;

    HandleFrontTypeChange();
    UpdateTopic(); 
    UpdateCard();
    UpdateLength();
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
    UpdateLength();
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
