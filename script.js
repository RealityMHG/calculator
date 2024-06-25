//Screen display
let screenDisplay = document.querySelector(".screen-text");
let screenArray = screenDisplay.textContent.split();

const MAX_NUMBERS = 16;

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
                if(!hasEnteredAComma && screenArray.length<16) {
                    screenArray.push(".");
                    updateScreen();
                    hasEnteredAComma = true;
                    hasEnteredAnything = true;
                } 
                break;
            default:
                if(screenArray.length<MAX_NUMBERS) {
                    if(!hasEnteredAnything) {
                        screenArray = [];
                        hasEnteredAnything = true;
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
    numbersForOp.push(Number(getNumberOnScreen()));
    if(currentOp == "empty") {
        if(op.textContent == "√" || op.textContent == "!") {
            let result = getOperationResult(numbersForOp,op.textContent);
            showOperationResult(op,result);
        } else {
            currentOp = op.textContent;
            resetScreen();     
        }
    } else {
        let result = getOperationResult(numbersForOp,currentOp);
        showOperationResult(op,result);
        
    }
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