import * as Calculator from "./calculator.js";
const control = document.querySelector(".control");
const displaySpan = document.querySelector(".display > span");

control.addEventListener("click", (e) => {
    e.preventDefault();
    const type = e.target.dataset.type;
    const action = e.target.dataset.action;
    if(type && type !== "operator") e.target.classList.add("clicked");

    if(type === "number") {
        Calculator.handleNumber(action);
    } 
    else if(type === "operator") {
        Calculator.handleOperator(action, e.target);
    }
    else if(type === "calculate") {
        Calculator.handleCalculate();
    }
    else if(type === "clear") {
        Calculator.handleClear();
    }
    else if(type === "dot") {
        Calculator.handleDot();
    }
    else if(type === "other") {
        Calculator.handleOther(action);
    }
});

control.addEventListener("transitionend", (e) => {
    e.target.classList.remove("clicked");
});

window.addEventListener("keydown", (e) => {
    const key = e.key;
    if(key >= "0" && key <= "9") {
        Calculator.handleNumber(key);
    } 
    else if(key === "+" || key === "-" || key === "*" || key === "/") {
        Calculator.handleOperator(key, document.querySelector(`[data-action="${key}"]`));
    }
    else if(key === "Enter") {
        e.preventDefault();
        Calculator.handleCalculate();
    }
    else if(key === "Escape") {
        Calculator.handleClear();
    }
    else if(key === ".") {
        Calculator.handleDot();
    }
    else if(key === "%") {
        Calculator.handleOther(key);
    }
    else if(key === "Tab") {
        Calculator.handleOther("changeSign");
    }
    else if(key === "Backspace"){
        Calculator.handleBackSpace();
    }
    else if(key === "ArrowLeft"){
        displaySpan.scroll(displaySpan.scrollLeft - 25, 0);
    }
    else if(key === "ArrowRight"){
        displaySpan.scroll(displaySpan.scrollLeft + 25, 0);
    }
});