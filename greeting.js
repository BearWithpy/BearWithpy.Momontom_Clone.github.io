const form = document.querySelector(".js-form"),
    input = form.querySelector("input"),
    greeting = document.querySelector(".js-greetings");

const USER_LS = "currentuser",
    SHOWING_CN = "showing";

function paintGreeting(text) {
    form.classList.remove(SHOWING_CN);
    greeting.classList.add(SHOWING_CN);
    greeting.innerHTML = `Hello, ${text}`;
}

function saveName(text) {
    localStorage.setItem(USER_LS, text);
}

function handleSubmit(event) {
    event.preventDefault();
    // const currentValue = input.placeholder;
    const currentValue = input.value;
    paintGreeting(currentValue);
    saveName(currentValue);
}

function askForName() {
    form.classList.add(SHOWING_CN);
    form.addEventListener("submit", handleSubmit);
}

function loadName() {
    const currentUser = localStorage.getItem(USER_LS);
    if (currentUser === null) {
        //he or she is not
        askForName();
    } else {
        // is
        paintGreeting(currentUser);
    }
}

function init() {
    loadName();
}
init();