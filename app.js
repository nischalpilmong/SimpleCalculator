const calculator = {
    displayValue: '0',
    firstOperand: null,
    operator: null,
    waitingForSecondOperand: false
};
function inputDigit(digit){
    const { displayValue, waitingForSecondOperand} = calculator;

    if(waitingForSecondOperand === true){
        calculator.displayValue = digit;
        calculator.waitingForSecondOperand = false;
    } else{
        // Overwrite `displayValue` if the current value is '0' otherwise append to it
        calculator.displayValue = displayValue === '0'? digit : displayValue + digit;
    }
    console.log(calculator);
}
function inputDecimal(dot){
    if(calculator.waitingForSecondOperand === true)
        return;
    if(!calculator.displayValue.includes(dot)){
        calculator.displayValue += dot;
    }
}
function handleOperator(nextOperator) {
    const { firstOperand, displayValue, operator } = calculator;
    const inputValue = parseFloat(displayValue);

    if (operator && calculator.waitingForSecondOperand)  {
        calculator.operator = nextOperator;
        console.log(calculator);
        return;
    }

    if (firstOperand === null) {
        calculator.firstOperand = inputValue;
    }
    else if(operator){
        const result = performCalculation[operator](firstOperand, inputValue);

        calculator.displayValue = String(result);
        calculator.firstOperand = result;
    }

    calculator.waitingForSecondOperand = true;
    calculator.operator = nextOperator;
    console.log(calculator);
}
const performCalculation = {
    '/': function (firstOperand,secondOperand) {
        return firstOperand/secondOperand;
    },
    '*': function (firstOperand,secondOperand) {
        return firstOperand * secondOperand;
    },
    '+': function (firstOperand,secondOperand) {
        return firstOperand + secondOperand;
    },
    '-': function (firstOperand,secondOperand) {
        return firstOperand - secondOperand;
    }
};

function resetCalculator(){
    calculator.displayValue = '0';
    calculator.firstOperand = null;
    calculator.waitingForSecondOperand = false;
    calculator.operator = null;
}

function updateDisplay(){
    const display = document.querySelector('.calculator-screen');
    display.value = calculator.displayValue;
}
updateDisplay();

const keys = document.querySelector('.calculator-keys');
keys.addEventListener('click',function(event){
   const target = event.target;
   if(!target.matches('button')){
       return;//exit the function
   }
   if(target.classList.contains('operator')){
       handleOperator(target.value);
       updateDisplay();
       return;

   }
   if(target.classList.contains('decimal')){
       inputDecimal(target.value);
       updateDisplay();
       return;
   }
    if (target.classList.contains('all-clear')) {
        resetCalculator();
        updateDisplay();
        return;

    }
    inputDigit(target.value);
    updateDisplay();
});

