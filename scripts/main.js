import * as Calculator from "./calculator.js";
const control = document.querySelector(".control");
const display = document.querySelector(".display");

// let displayValue = "";


control.addEventListener("click", (e) => {
    const type = e.target.dataset.type;
    const action = e.target.dataset.action;
    if(type === "number") {
        Calculator.handleNumber(display,action);
    } 
    else if(type === "operator") {
        Calculator.handleOperator(display, action, e.target);
    }
    else if(type === "calculate") {
        Calculator.handleCalculate(display);
    }
    else if(type === "clear") {
        Calculator.handleClear(display);
    }
});