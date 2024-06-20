//Screen display
let screenDisplay = document.querySelector(".screen-text");
let screenArray = screenDisplay.textContent.split();

//Adding event listeners to the buttons
//Numbers
let allNumberBtns = document.querySelectorAll(".number-btn");
allNumberBtns.forEach((number) => {
    number.addEventListener("click", () => {
        if(number.textContent == "del") {
            screenArray.pop();
            screenDisplay.textContent = screenArray.join("");
        } else {
            screenArray.push(number.textContent);
            screenDisplay.textContent = screenArray.join("");
         }
    });
});







//Functions
