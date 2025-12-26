const score = document.getElementById("score");
const question = document.getElementById("question");
const answerForm = document.getElementById("answerForm");
const answerBox = document.getElementById("answer");
const resultBox = document.getElementById("resultBox");
const time = document.getElementById("time");
const startButton = document.getElementById("start");
const hardDifficulty = document.getElementById("hardDifficulty");

const correctColor = "green";
const incorrectColor = "red";

let timer = 300;
let scoreCount = 0;
let answer;
let num1;
let num2;

hideGame();

startButton.addEventListener('click', startGame);

function startGame(){
    startButton.classList.add("hidden");
    hardDifficulty.classList.add("hidden");
    timer = 300;
    scoreCount = 0;
    score.innerText = `Score: ${scoreCount}`;
    showGame();
    generateRandomQuestion();
}

function stopGame(){
    hideGame();
    score.classList.remove("hidden");
    startButton.classList.remove("hidden");
    startButton.innerText = "Restart";
    hardDifficulty.classList.remove("hidden");
}

const timerInterval = setInterval(() => {
    timer--;
    displayTime();
    if(timer == 0){
        stopGame();
    }
}, 1000);

function hideGame(){
    score.classList.add("hidden");
    question.classList.add("hidden");
    answerForm.classList.add("hidden");
    resultBox.classList.add("hidden");
    time.classList.add("hidden");
}

function showGame(){
    score.classList.remove("hidden");
    question.classList.remove("hidden");
    answerForm.classList.remove("hidden");
    resultBox.classList.remove("hidden");
    time.classList.remove("hidden");
}

function displayTime() {
    const minutes = Math.floor(timer / 60);
    const seconds = Math.floor(timer % 60);
    time.innerText = `${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`;
}


function generateRandomQuestion() {
    if(hardDifficulty.children[0].checked){
        answer = randInt(21, 99);
        num1 = randInt(10, answer - 10);
        num2 = answer - num1;
    } else {
        answer = randInt(1, 20);
        num1 = randInt(1, answer);
        num2 = answer - num1;
    }

    question.innerText = `${num1} + ${num2}`;
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