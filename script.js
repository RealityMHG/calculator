//Screen display
let screenDisplay = document.querySelector(".screen-text");
let screenArray = screenDisplay.textContent.split();

//Variables for the operations
let numbersForOp = [];
let currentOp = "empty";
let hasEnteredAnything = false;

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

//Operations
let allOpBtns = document.querySelectorAll(".op-btn");
allOpBtns.forEach((op) => {
    op.addEventListener("click", () => {
        switch(op.textContent) {              
            case "=":
                numbersForOp.push(Number(getNumberOnScreen()));
                let result = getOperationResult(numbersForOp,currentOp);
                screenArray = [result];
                updateScreen();
                numbersForOp = [];
                currentOp = "empty";
                hasEnteredAnything = false;
                break;

            default:
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
                }
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
    }
    return operationResult;
}

function getNumberOnScreen() {
    return screenArray.join("");
}

function updateScreen() {
    screenDisplay.textContent = getNumberOnScreen();
}

function resetScreen() {
    screenArray = [0];
    hasEnteredAnything = false;
    updateScreen();
}