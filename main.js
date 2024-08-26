const topics = ["Виначення", "Культура і мистецтво", "Дати", "Особи"];
const dataset = [null, null, dates, null];

const topicButtons = document.querySelectorAll("footer>button");
const heading = document.querySelector("h2");
const cards = document.querySelector(".cards");
const card = document.querySelector(".card");
const cardText = document.querySelector(".card>p");

let selected = 0;

let touchstartY = 0;
let touchendY = 0;


topicButtons.forEach((btn, i) => {
        btn.addEventListener("click", () => SelectTopic(i) )
    }
);

cards.addEventListener("touchstart", (e) => ReadTouchStart(e), false);
cards.addEventListener("touchend", (e) => ReadTouchEnd(e), false);

function SelectTopic(index) {
    topicButtons[selected].classList.remove("selected");
    selected = index;
    topicButtons[selected].classList.add("selected");
    heading.innerText = topics[selected];
}

function ReadTouchStart(e) {
    console.log(e)
    touchstartY = e.touches[0].clientY;
}

function ReadTouchEnd(e) {
    console.log("end", e);
    touchendY = e.changedTouches[0].clientY;
    HandleGesure();
}

function HandleGesure() {
    let swiped = 'swiped: ';

    if (touchstartY - touchendY > 50) {
        alert(swiped + 'down!');
    }
    if (touchendY - touchstartY > 50) {
        alert(swiped + 'up!');
    }
    if (touchendY == touchstartY) {
        alert('tap!');
    }
}

function HandleNextCard() {

}

function HandlePrevCard() {

}
