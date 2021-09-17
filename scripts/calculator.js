let operator = "";
let operand1 = "";
let operand2 = "";
let tempValue = "0";

function add(a, b) {
    return parseFloat(a) + parseFloat(b);
}

function minus(a, b) {
    return parseFloat(a) - parseFloat(b);
}

function divide(a, b) {
    return parseFloat(a) / parseFloat(b);
}

function multiply(a, b) {
    return parseFloat(a) * parseFloat(b);
}

function handleNumber(display, action) {
    if(tempValue === "0") {
        if(action === "0") return;
        else tempValue = action;
    }else{
        if(tempValue.length < 7) tempValue += action
    }

    display.textContent = tempValue;
    if(operator === "")
        operand1 = display.textContent;
    else
        operand2 = display.textContent;
}

function handleOperator(display, action, target) {
    if(operand1 === "") return;

    if(operand1 !== "" && operand2 !== "") {
        handleCalculate(display);
    }

    tempValue = "";
    removeSeletedBtn();
    target.classList.add("selected");
    operator = action;
}

function handleCalculate(display) {
    if(operand1 !== "" && operand2 !== "") {
        let result;
        if(operator === "+")
            result = add(operand1, operand2);
        else if(operator === "-")
            result = minus(operand1, operand2);
        else if(operator === "/"){
            if(parseFloat(operand2) === 0){
                handleClear(display);
                display.textContent = "ERROR!";
                return;
            }
            result = divide(operand1, operand2);
        }
        else
            result = multiply(operand1, operand2);
            
        if(result > 9999999){
            result = result.toExponential(2);
        }
        display.textContent = result;
        operand1 = display.textContent;
        operand2 = "";
        operator = "";
    }
    tempValue = "";
    removeSeletedBtn();
}

function handleClear(display) {
    tempValue = "0"
    display.textContent = 0;
    operand1 = "";
    operand2 = "";
    operator = "";
    removeSeletedBtn();
}

function removeSeletedBtn() {
    const selected = document.querySelector(".selected");
    if(selected)
        selected.classList.remove("selected");
}

export {handleNumber, handleOperator, handleCalculate, handleClear};