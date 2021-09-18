const displaySpan = document.querySelector(".display > span");
const clearBtn = document.querySelector("#clear");

let operator = "";
let operand1 = "";
let operand2 = "";
let tempValue = "0";

function add(a, b) {
    return (parseFloat(a) + parseFloat(b)).toString(10);
}

function minus(a, b) {
    return (parseFloat(a) - parseFloat(b)).toString(10);
}

function divide(a, b) {
    return (parseFloat(a) / parseFloat(b)).toString(10);
}

function multiply(a, b) {
    return (parseFloat(a) * parseFloat(b)).toString(10);
}

function removeSeletedBtn() {
    const selected = document.querySelector(".selected");
    if (selected){
        selected.classList.remove("selected");
    }
}

/**
 * @param {string} value 
 */
function updateDisplay(value) {
    displaySpan.textContent = value;
    displaySpan.scroll(displaySpan.scrollWidth, 0);
    updateClearBtn();

    // determine which operand the user is entering.
    if (operator === "")
        operand1 = displaySpan.textContent;
    else
        operand2 = displaySpan.textContent;
}

function updateClearBtn() {
    // Check whether clear button should clear all or only operand2.
    if (document.querySelector(".selected") && tempValue !== "0")
        clearBtn.textContent = "C";
    else
        clearBtn.textContent = "AC";
}

/**
 * @param {string} action 
 */
function handleNumber(action) {
    // Since tempValue can be "0" or "-0", if it is "-0", 
    // I don't want it to become "-0x". It should be "-x".
    if (parseFloat(tempValue) === 0) {
        // If the value of tempValue is 0, and does'nt have ".", then return.
        // Otherwise append action to its tail.
        if (action === "0") {
            tempValue = (tempValue.indexOf(".") === -1) ? tempValue : tempValue + action;
        }
        else {
            if (tempValue.indexOf("-") === 0) tempValue = "-" + action;
            else {
                if (tempValue.indexOf(".") === -1) tempValue = action;
                else tempValue += action;
            }
        }
    } else {
        tempValue += action
    }

    updateDisplay(tempValue);
}

/**
 * 
 * @param {string} action 
 * @param {HTMLElement} target 
 * @returns 
 */
function handleOperator(action, target) {
    if (operand1 === "") return;

    // If the 2 operands are not empty, and user press another operator button,
    // then calculate the result before reassign a new value to operator.
    if (operand1 !== "" && operand2 !== "") {
        handleCalculate();
    }

    // When the user click a operator's button, 
    // tempValue should be "0" because the calculator should allow the user enter next operand.
    tempValue = "0";
    removeSeletedBtn();
    target.classList.add("selected");
    operator = action;
}

function handleCalculate() {
    tempValue = "0";
    removeSeletedBtn();
    if (operand1 !== "" && operand2 !== "") {
        let result = "";
        if (operator === "+")
            result = add(operand1, operand2);
        else if (operator === "-")
            result = minus(operand1, operand2);
        else if (operator === "/") {
            // If operator is divide, operand2 should not be "0".
            // Otherwise, clear all operand and operator, and display error message to user. 
            if (parseFloat(operand2) === 0) {
                handleClear();
                updateDisplay("ERROR!");
                return;
            }
            result = divide(operand1, operand2);
        }
        else
            result = multiply(operand1, operand2);

        updateDisplay(result);
        operand1 = displaySpan.textContent;
        operand2 = "";
        operator = "";
    }
}

function handleClear() {
    // If user is entering operand2, and the tempValue is not "0", Only clear the tempValue.
    if (document.querySelector(".selected") && tempValue !== "0") {
        tempValue = "0";
        operand2 = "";
    }
    else {
        operand1 = "";
        operand2 = "";
        operator = "";
        removeSeletedBtn();
        tempValue = "0"
    }
    updateDisplay(tempValue);
}

function handleDot() {
    if (tempValue.indexOf(".") !== -1) return;
    tempValue += ".";
    updateDisplay(tempValue);
}

/**
 * @param {string} action 
 */
function handleOther(action) {
    if (action === "changeSign") {
        if (tempValue.indexOf("-") === -1) tempValue = "-" + tempValue;
        else tempValue = tempValue.slice(1);
        // For user's convenience, scroll to the leftmost.
        updateDisplay(tempValue);
        displaySpan.scroll(0, 0);
    }
    else { // action === "%"
        const num = parseFloat(tempValue) / 100;
        tempValue = num.toString(10);
        updateDisplay(tempValue);
    }
}

function handleBackSpace() {
    const origin = displaySpan.textContent;
    if (origin.length > 1 || parseFloat(origin) !== 0) {
        tempValue = origin.slice(0, origin.length - 1);
    }
    if(origin.length === 1 || (origin.indexOf("-") === 0 && origin.length === 2))
        tempValue = "0";
    updateDisplay(tempValue);
}

export { handleNumber, handleOperator, handleCalculate, handleClear, handleDot, handleOther, handleBackSpace };