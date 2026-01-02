const score = document.getElementById("score");
const question = document.getElementById("question");
const answerForm = document.getElementById("answerForm");
const answerBox = document.getElementById("answer");
const resultBox = document.getElementById("resultBox");
const time = document.getElementById("time");

const startAddition = document.getElementById("startAddition");
const startSubtraction = document.getElementById("startSubtraction");
const hard = document.getElementById("hard");
const medium = document.getElementById("medium");

const correctColor = "green";
const incorrectColor = "red";

let mode;
let timer = 300;
let scoreCount = 0;
let answer;
let num1;
let num2;

hideGame();

startAddition.addEventListener('click', () => {
    mode = "addition";
    startGame();
});
startSubtraction.addEventListener('click', () => {
    mode = "subtraction";
    startGame();
});

function startGame(){
    hideMenu();
    
    timer = 300;
    scoreCount = 0;
    score.innerText = `Score: ${scoreCount}`;
    showGame();
    generateRandomQuestion();
}

function stopGame(){
    hideGame();
    showMenu();
    score.classList.remove("hidden");
}

const timerInterval = setInterval(() => {
    timer--;
    displayTime();
    if(timer == 0){
        stopGame();
    }
}, 1000);

function hideMenu(){
    let elements = document.querySelectorAll(".menu");
    elements.forEach(element => {
        element.classList.add("hidden");
    });
}

function showMenu(){
    let elements = document.querySelectorAll(".menu");
    elements.forEach(element => {
        element.classList.remove("hidden");
    });
}

function hideGame(){
    let elements = document.querySelectorAll(".game");
    elements.forEach(element => {
        element.classList.add("hidden");
    });
}

function showGame(){
    let elements = document.querySelectorAll(".game");
    elements.forEach(element => {
        element.classList.remove("hidden");
    });
}

function displayTime() {
    const minutes = Math.floor(timer / 60);
    const seconds = Math.floor(timer % 60);
    time.innerText = `${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`;
}

function generateRandomQuestion() {
    const isHard = hard.children[0].checked;
    const isMedium = medium.children[0].checked;

    if (mode === "addition") {

        if (isHard) {
            answer = randInt(21, 99);
            num1 = randInt(10, answer - 10);
            num2 = answer - num1;
        } 
        else if (isMedium) {
            const tens = randInt(2, 9);
            const ones = randInt(0, 9);
            num1 = tens * 10 + ones;
            num2 = randInt(1, 9 - tens) * 10 + randInt(0, 9 - ones);
            answer = num1 + num2;
        } 
        else {
            answer = randInt(2, 20);
            num1 = randInt(1, answer);
            num2 = answer - num1;
        }

        question.innerText = `${num1} + ${num2}`;
    }

    if (mode === "subtraction") {

        if (isHard) {
            num1 = randInt(21, 99);
            num2 = randInt(10, num1 - 1);
        } 
        else if (isMedium) {
            const tens = randInt(2, 9);
            const ones = randInt(0, 9);
            num1 = tens * 10 + ones;
            num2 = randInt(2, tens - 1) * 10 + randInt(0, ones);
            answer = num1 - num2;
        } 
        else {
            num1 = randInt(2, 20);
            num2 = randInt(1, num1 - 1);
        }

        answer = num1 - num2;
        question.innerText = `${num1} - ${num2}`;
    }
}


function randInt(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

answerForm.addEventListener('submit', (event) => {
    event.preventDefault();
    
    if(answerBox.value == (answer)){
        resultBox.style.backgroundColor = correctColor;
        score.innerText = `Score: ${++scoreCount}`;
    }else{
        resultBox.style.backgroundColor = incorrectColor;
    }

    generateRandomQuestion();
    answerBox.value = "";
});