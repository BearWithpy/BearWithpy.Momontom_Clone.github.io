



// // <⚠️ DONT DELETE THIS ⚠️>

// import "./index.css";
// // <⚠️ /DONT DELETE THIS ⚠️>

const clockContainer = document.querySelector(".js-clock"),
    clockTitle = clockContainer.querySelector(".js-title");

const toDoForm = document.querySelector(".js-toDoForm"),
    toDoInput = toDoForm.querySelector("input"),
    toDoList = document.querySelector(".js-toDoList"),
    finishList = document.querySelector(".js-finList");

const TODOS_LS = "toDos";
const FINISH_LS = "FINISHED";

let toDos = [];
let finDos = [];

function getTime() {
    const date = new Date();
    const minutes = date.getMinutes();
    const hours = date.getHours();
    const seconds = date.getSeconds();
    clockTitle.innerText = `${
        hours < 10 ? `0${hours}` : hours
        }:${
        minutes < 10 ? `0${minutes}` : minutes
        }:${
        seconds < 10 ? `0${seconds}` : seconds
        }`;
}


function saveToDos() {
    localStorage.setItem(TODOS_LS, JSON.stringify(toDos));
    localStorage.setItem(FINISH_LS, JSON.stringify(finDos));
}

function finishToDo(event) {
    const li = event.target.parentNode;
    const cleanToDos = toDos.filter(function (toDo) {
        return toDo.id === parseInt(li.id);
    });
    finDos.push(cleanToDos[0]);
    paintFinToDo(cleanToDos[0].text, cleanToDos[0].id);
    deleteToDo(event);
}

function rewindToDo(event) {
    const li = event.target.parentNode;
    const cleanToDos = finDos.filter(function (toDo) {
        return toDo.id === parseInt(li.id);
    });
    toDos.push(cleanToDos[0]);
    paintToDo(cleanToDos[0].text, cleanToDos[0].id);
    deleteFin(event);
}

function paintToDo(text, id) {
    const li = document.createElement("li");
    const delBtn = document.createElement("button");
    const span = document.createElement("span");
    const finBtn = document.createElement("button");
    delBtn.addEventListener("click", deleteToDo);
    finBtn.addEventListener("click", finishToDo);
    delBtn.innerHTML = "❌";
    finBtn.innerHTML = "✔️";
    span.innerHTML = text;
    li.id = id;
    li.appendChild(span);
    li.appendChild(delBtn);
    li.appendChild(finBtn);
    toDoList.appendChild(li);
}

function paintFinToDo(text, id) {
    const li = document.createElement("li");
    const delBtn = document.createElement("button");
    const span = document.createElement("span");
    const rewindBtn = document.createElement("button");
    delBtn.addEventListener("click", deleteFin);
    rewindBtn.addEventListener("click", rewindToDo);
    delBtn.innerText = "❌";
    rewindBtn.innerText = "⏪";
    span.innerHTML = text;
    li.id = id;
    li.appendChild(span);
    li.appendChild(delBtn);
    li.appendChild(rewindBtn);
    finishList.appendChild(li);
}

function deleteToDo(event) {
    const li = event.target.parentNode;
    const cleanToDos = toDos.filter(function (toDo) {
        return toDo.id !== parseInt(li.id);
    });
    toDos = cleanToDos;

    toDoList.removeChild(li);
    saveToDos();
}

function deleteFin(event) {
    const li = event.target.parentNode;
    const cleanToDos = finDos.filter(function (toDo) {
        return toDo.id !== parseInt(li.id);
    });
    finDos = cleanToDos;
    finishList.removeChild(li);
    saveToDos();
}

function handleSubmit(event) {
    event.preventDefault();
    const currentValue = toDoInput.value;
    const obj = createObject(currentValue);
    toDos.push(obj);
    paintToDo(obj.text, obj.id);
    saveToDos();
    toDoInput.value = "";
}

function loadToDos() {
    const loadedToDos = localStorage.getItem(TODOS_LS);
    const loadedFinDos = localStorage.getItem(FINISH_LS);

    if (loadedToDos !== null) {
        const parsedToDos = JSON.parse(loadedToDos);
        parsedToDos.forEach(function (toDo) {
            toDos.push(toDo);
            paintToDo(toDo.text, toDo.id);
        });
    }
    if (loadedFinDos !== null) {
        const parsedFinDos = JSON.parse(loadedFinDos);
        parsedFinDos.forEach(function (toDo) {
            finDos.push(toDo);
            paintFinToDo(toDo.text, toDo.id);
        });
    }
}

function createObject(text) {
    const toDoobj = {
        text: text,
        id: new Date().getTime()
    };
    return toDoobj;
}

function init() {
    getTime();
    setInterval(getTime, 1000);
    loadToDos();
    toDoForm.addEventListener("submit", handleSubmit);
}
init();