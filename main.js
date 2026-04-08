const score = document.getElementById("score");
const time = document.getElementById("time");
const question = document.getElementById("question");
const inputBox = document.getElementById("inputBox");
const resultBox = document.getElementById("resultBox");
const keyboard = document.getElementById("keyboard");
const submitButton = document.getElementById("submitButton");

const correctColor = "green";
const incorrectColor = "red";

const modes = {
    addition: {
        el: document.getElementById("startAddition"),
        symbol: "+",
        options: [
            {
                name: "Ergebnis bis 20",
                behavior: () => {
                    answer = randInt(2, 20);
                    num1 = randInt(1, answer - 1);
                    num2 = answer - num1;
                }
            },
            {
                name: "Ergebnis 20 bis 99, ohne Zehner Übersprung",
                behavior: () => {
                    let t1 = randInt(1, 8);
                    let t2 = randInt(1, 9 - t1);
                    
                    let o1 = randInt(0, 9);
                    let o2 = randInt(0, 9 - o1);
                    
                    num1 = t1 * 10 + o1;
                    num2 = t2 * 10 + o2;
                    answer = num1 + num2;
                }
            },
            {
                name: "Ergebnis 30 bis 99, mit Zehner Übersprung",
                behavior: () => {
                    let t1 = randInt(1, 7);
                    let t2 = randInt(1, 8 - t1);
                    
                    let o1 = randInt(1, 9);
                    let o2 = randInt(10 - o1, 9);
                    
                    num1 = t1 * 10 + o1;
                    num2 = t2 * 10 + o2;
                    answer = num1 + num2;
                }
            }
        ]
    },
   subtraction: {
        el: document.getElementById("startSubtraction"),
        symbol: "-",
        options: [
            {
                name: "Linke Seite bis 19, rechte Seite bis 9",
                behavior: () => {
                    num1 = randInt(2, 19);
                    num2 = randInt(1, num1 - 1);

                    if(num2 > 9) num2 = 9;

                    answer = num1 - num2;
                }
            },
            {
                name: "Zahlen zwischen 20 und 99, ohne Zehner Übersprung",
                behavior: () => {
                    let o1 = randInt(0, 9);
                    let o2 = randInt(0, o1);

                    let t1 = randInt(2, 9);
                    let t2 = randInt(2, t1);
                    
                    num1 = t1 * 10 + o1;
                    num2 = t2 * 10 + o2;
                    answer = num1 - num2;
                }
            },
            {
                name: "Linke Seite größer 20, rechte Seite bis 10, mit Zehner Übersprung",
                behavior: () => {
                    let o1 = randInt(1, 8);
                    let o2 = randInt(o1 + 1, 9);

                    let t1 = randInt(2, 9);
                    
                    num1 = t1 * 10 + o1;
                    num2 = o2;
                    answer = num1 - num2;
                }
            }
        ]
    },
    multiplication: {
        el: document.getElementById("startMultiplication"),
        symbol: "•",
        options: [
            {
                name: "2er Reihe",
                behavior: () => {
                    num1 = randInt(1, 10);
                    num2 = 2;
                    answer = num1 * num2;

                    if(Math.random() > 0.5){
                        [num1, num2] = [num2, num1];
                    }
                }
            },
            {
                name: "4er Reihe",
                behavior: () => {
                    num1 = randInt(1, 10);
                    num2 = 4;
                    answer = num1 * num2;

                    if(Math.random() > 0.5){
                        [num1, num2] = [num2, num1];
                    }
                }
            },
            {
                name: "5er Reihe",
                behavior: () => {
                    num1 = randInt(1, 10);
                    num2 = 5;
                    answer = num1 * num2;

                    if(Math.random() > 0.5){
                        [num1, num2] = [num2, num1];
                    }
                }
            },
            {
                name: "8er Reihe",
                behavior: () => {
                    num1 = randInt(1, 10);
                    num2 = 8;
                    answer = num1 * num2;

                    if(Math.random() > 0.5){
                        [num1, num2] = [num2, num1];
                    }
                }
            },
            {
                name: "10er Reihe",
                behavior: () => {
                    num1 = randInt(1, 10);
                    num2 = 10;
                    answer = num1 * num2;

                    if(Math.random() > 0.5){
                        [num1, num2] = [num2, num1];
                    }
                }
            }
        ]
    },
    division: {
        el: document.getElementById("startDivision"),
        symbol: ":",
        options: [
            {
                name: "2er Reihe",
                behavior: () => {
                    num1 = randInt(1, 10) * 2;
                    num2 = 2;
                    answer = num1 / num2;
                }
            },
            {
                name: "4er Reihe",
                behavior: () => {
                    num1 = randInt(1, 10) * 4;
                    num2 = 4;
                    answer = num1 / num2;
                }
            },
            {
                name: "5er Reihe",
                behavior: () => {
                    num1 = randInt(1, 10) * 5;
                    num2 = 5;
                    answer = num1 / num2;
                }
            },
            {
                name: "8er Reihe",
                behavior: () => {
                    num1 = randInt(1, 10) * 8;
                    num2 = 8;
                    answer = num1 / num2;
                }
            },
            {
                name: "10er Reihe",
                behavior: () => {
                    num1 = randInt(1, 10) * 10;
                    num2 = 10;
                    answer = num1 / num2;
                }
            }
        ]
    }
}

let timer = 300;
let scoreCount = 0;
let answer;
let num1;
let num2;
let selectedMode;
let selectedOptions = [];
let selectedKey;

Object.values(modes).forEach(mode => {
    mode.el.addEventListener("click", () => {
        hideModesMenu();

        let menuOptions = document.getElementById("modeOptions");
        menuOptions.innerHTML = "";
        
        selectedMode = mode;
        
        mode.options.forEach(option => {
           const checkbox = document.createElement("input");
           const label = document.createElement("label");
           const br = document.createElement("br");
           checkbox.type = "checkbox";
           checkbox.id = option.name;
           checkbox.name = option.name;
           label.innerText = option.name;
           label.for = option.name;
           menuOptions.appendChild(checkbox);
           menuOptions.appendChild(label);
           menuOptions.appendChild(br);
        })
        menuOptions.appendChild(document.createElement("br"));
        const startButton = document.createElement("button");
        startButton.type = "button";
        startButton.innerText = "Start";
        startButton.addEventListener("click", startGame);
        menuOptions.appendChild(startButton);
    })
})

Array.from(keyboard.children).forEach(button => {
    button.addEventListener("click", () => {
        OnKeyboardClick(button);
    });
})

Array.from(inputBox.children).forEach(button => {
    button.addEventListener("click", () => {
        if(selectedKey != undefined){
            button.innerHTML = selectedKey;
        }
    });
})

hideGameUI();

function OnKeyboardClick(clickedButton){
    Array.from(keyboard.children).forEach(button => {
        button.classList.remove("selected");
    })

    clickedButton.classList.add("selected");
    selectedKey = clickedButton.innerText;
}

function startGame(){
    selectedMode.options.forEach(option => {
        if(document.getElementById(option.name).checked){
            selectedOptions.push(option);
        }
    })
    
    timer = 300;
    scoreCount = 0;
    score.innerText = `Score: ${scoreCount}`;
    
    showGameUI();
    hideOptionsMenu();
    generateRandomQuestion();
}

function stopGame(){
    hideGameUI();
    showModesMenu();
    score.classList.remove("hidden");
}

const timerInterval = setInterval(() => {
    timer--;
    displayTime();
    if(timer == 0){
        stopGame();
    }
}, 1000);

function showModesMenu(){
    let elements = document.querySelectorAll(".mode");
    elements.forEach(element => {
        element.classList.remove("hidden");
    });
}

function showOptionsMenu(){
    document.getElementById("modeOptions").classList.remove("hidden");
}

function showGameUI(){
    let elements = document.querySelectorAll(".game");
    elements.forEach(element => {
        element.classList.remove("hidden");
    });
}

function hideModesMenu(){
    let elements = document.querySelectorAll(".mode");
    elements.forEach(element => {
        element.classList.add("hidden");
    });
}

function hideOptionsMenu(){
    document.getElementById("modeOptions").classList.add("hidden");
}

function hideGameUI(){
    let elements = document.querySelectorAll(".game");
    elements.forEach(element => {
        element.classList.add("hidden");
    });
}

function displayTime() {
    const minutes = Math.floor(timer / 60);
    const seconds = Math.floor(timer % 60);
    time.innerText = `${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`;
}

function generateRandomQuestion() {
    let randomBehavior = randInt(0, selectedOptions.length - 1);
    selectedOptions[randomBehavior].behavior();
    question.innerText = `${num1} ${selectedMode.symbol} ${num2}`;
}

submitButton.addEventListener('click', () => {    
    let input = parseInt(inputBox.children[0].innerText) * 10 + parseInt(inputBox.children[1].innerText);

    if(input == (answer)){
        resultBox.style.backgroundColor = correctColor;
        score.innerText = `Score: ${++scoreCount}`;
    }else{
        resultBox.style.backgroundColor = incorrectColor;
    }

    inputBox.children[0].innerText = "";
    inputBox.children[1].innerText = "";
    generateRandomQuestion();
});

function randInt(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}