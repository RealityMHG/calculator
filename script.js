//Screen display
let screenDisplay = document.querySelector(".screen-text");
let screenArray = screenDisplay.textContent.split();

//Variables for the operations
let numbersForOp = [];
let currentOp = "empty";
let hasEnteredAnything = false;
let hasEnteredAComma = false;

//Adding event listeners to the buttons
//Numbers
let allNumberBtns = document.querySelectorAll(".number-btn");
allNumberBtns.forEach((number) => {
    number.addEventListener("click", () => {
        switch(number.textContent) {
            case "del":
                if(screenArray.length == 1) {
                    resetScreen();
                } else {
                    screenArray.pop();
                    updateScreen();
                }               
                break;
            case ".":
                if(!hasEnteredAComma) {
                    screenArray.push(".");
                    updateScreen();
                    hasEnteredAComma = true;
                    hasEnteredAnything = true;
                } 
                break;
            default:
                if(!hasEnteredAnything) {
                    screenArray = [];
                    hasEnteredAnything = true;
                }
                screenArray.push(number.textContent);
                updateScreen();
                break;
        }
    });
});

//Special Operations
let allSpecialOpBtns = document.querySelectorAll(".special-ops-btn");
allSpecialOpBtns.forEach((op) => {
    op.addEventListener("click", () => {
        switch(op.textContent) {
            case "AC":
                resetAll();
                break;

            case "C":
                resetScreen();
                break;
            
            default:
                operationHandler(op);
                break;
        }
    });
});

//Operations
let allOpBtns = document.querySelectorAll(".op-btn");
allOpBtns.forEach((op) => {
    op.addEventListener("click", () => {
        switch(op.textContent) {              
            case "=":
                if(currentOp!="empty") {
                    numbersForOp.push(Number(getNumberOnScreen()));
                    let result = getOperationResult(numbersForOp,currentOp);
                    screenArray = [result];
                    updateScreen();
                    numbersForOp = [];
                    currentOp = "empty";
                    hasEnteredAnything = false;
                }        
                break;

            default:
                operationHandler(op);
                break;
        }
    
    });
});

//Functions
function getOperationResult (numberArray, operation) {
    let operationResult = 0;
    switch(operation) {
        case "+":
            operationResult = numberArray.reduce((total, num) => (total+=num));
            break;
        case "-":
            operationResult = numberArray.reduce((total,num) => (total-=num));
            break;
        case "x":
            operationResult = numberArray.reduce((total,num) => (total*=num));
            break;
        case "/":
            operationResult = numberArray.reduce((total,num) => (total/=num));
            break;
    }
    return operationResult;
}

function operationHandler(op) {
    numbersForOp.push(Number(getNumberOnScreen()));
    if(currentOp == "empty") {
        currentOp = op.textContent;
        resetScreen();
    } else {
        let result = getOperationResult(numbersForOp,currentOp);
        screenArray = [result];
        updateScreen();
        numbersForOp = [result];
        hasEnteredAnything = false;
        hasEnteredAComma = false;
        currentOp = op.textContent;
    }
}

function getNumberOnScreen() {
    return screenArray.join("");
}

function updateScreen() {
    screenDisplay.textContent = getNumberOnScreen();
}

function resetAll() {
    resetScreen();
    numbersForOp = [];
    currentOp = "empty";
}

function resetScreen() {
    screenArray = [0];
    hasEnteredAnything = false;
    hasEnteredAComma = false;
    updateScreen();
}