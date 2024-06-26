//Screen display
let screenDisplay = document.querySelector(".screen-text");
let screenArray = screenDisplay.textContent.split();

let tinyOpText = document.querySelector(".op-text-display");

const MAX_NUMBERS = 16;

//Variables for the operations
let numbersForOp = [];
let currentOp = "empty";
let hasEnteredAnything = false;
let hasEnteredAComma = false;
let lastButtonOp = false;

//Adding event listeners to the buttons
//Numbers
let allNumberBtns = document.querySelectorAll(".number-btn");
allNumberBtns.forEach((number) => {
    number.addEventListener("click", () => {
        switch(number.textContent) {
            case "del":
                if(!lastButtonOp) {
                    if(screenArray.length == 1) {
                        resetScreen(0);
                    } else {
                        screenArray.pop();
                        updateScreen();
                    }                            
                }
                break;
            case ".":
                if(lastButtonOp) {
                    screenArray = [0]
                    hasEnteredAnything = true;
                    lastButtonOp = false;
                }
                if(!hasEnteredAComma && screenArray.length<16) {
                    screenArray.push(".");
                    updateScreen();
                    hasEnteredAComma = true;
                    hasEnteredAnything = true;                   
                } 
                break;
            default:
                if(screenArray.length<MAX_NUMBERS) {
                    lastButtonOp = false;
                    if(!hasEnteredAnything) {
                        screenArray = [];
                        hasEnteredAnything = true;
                    }
                    if(currentOp == "empty") {
                        tinyOpText.textContent = "----";
                    }
                    screenArray.push(number.textContent);
                    updateScreen(); 
                }
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
                resetScreen(0);
                break;

            case "^":
                operationHandler(op);
            break;
            
            default:
                specialOperationHandler(op);
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
                    tinyOpText.textContent += " " + numbersForOp[1];
                    let result = getOperationResult(numbersForOp,currentOp);
                    screenArray = [result];
                    updateScreen();
                    numbersForOp = [];
                    currentOp = "empty";
                    hasEnteredAnything = false;
                }
                lastButtonOp = false;        
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
        case "!":
            operationResult = factorialize(numberArray[0]);
            break;
        case "^":
            operationResult = numberArray[0] ** numberArray[1];
            break;
        case "√":
            operationResult = Math.sqrt(numberArray[0]);
            break;
    }
    if(operationResult.countDecimals() > 5) {
        return operationResult.toFixed(5);
    } 
    return operationResult;
}

function operationHandler(op) {
    if(!lastButtonOp) {
        numbersForOp.push(Number(getNumberOnScreen()));
        if(currentOp == "empty") {   
            currentOp = op.textContent;
            tinyOpText.textContent = Number(getNumberOnScreen()) + " " + currentOp;
            resetScreen(Number(getNumberOnScreen()));     
        } else {
            let result = getOperationResult(numbersForOp,currentOp);
            showOperationResult(op,result);
            tinyOpText.textContent = result + " " + op.textContent;
        }
    } else {
        currentOp = op.textContent;
        tinyOpText.textContent = Number(getNumberOnScreen()) + " " + currentOp;
    }
    lastButtonOp = true;
}

function specialOperationHandler(op) {
    numbersForOp.push(Number(getNumberOnScreen()));
    let result = getOperationResult(numbersForOp,op.textContent);
    showOperationResult(op,result);
    currentOp = "empty";
    
}

function getNumberOnScreen() {
    return screenArray.join("");
}

function updateScreen() {
    if(screenArray[screenArray.length-1] == "0") {
        screenDisplay.textContent = getNumberOnScreen();
    }
    else {
        screenDisplay.textContent = Number(getNumberOnScreen());
    }
}

function showOperationResult(op,result) {
    screenArray = [Number(result)];
    updateScreen();
    hasEnteredAnything = false;
    hasEnteredAComma = false;
    if(op.textContent!="√" && op.textContent!="!") {
        numbersForOp = [Number(result)];
        currentOp = op.textContent;        
    } else {
        numbersForOp = [];
    }
}

function resetAll() {
    resetScreen(0);
    numbersForOp = [];
    currentOp = "empty";
    tinyOpText.textContent ="----";
}

function resetScreen(numBefore) {
    screenArray = [numBefore];
    hasEnteredAnything = false;
    hasEnteredAComma = false;
    if(numBefore != 0) {
        tinyOpText.textContent = numBefore + " " + currentOp;
    }
    updateScreen();
}

//Count how many decimals a number has (IMPORTED)
Number.prototype.countDecimals = function () {
    if (Math.floor(this.valueOf()) === this.valueOf()) return 0;

    var str = this.toString();
    if (str.indexOf(".") !== -1 && str.indexOf("-") !== -1) {
        return str.split("-")[1] || 0;
    } else if (str.indexOf(".") !== -1) {
        return str.split(".")[1].length || 0;
    }
    return str.split("-")[1] || 0;
}

function factorialize(num) {
    if (num < 0) 
          return -1;
    else if (num == 0) 
        return 1;
    else {
        return (num * factorialize(num - 1));
    }
}