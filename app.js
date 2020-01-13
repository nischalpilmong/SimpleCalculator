const calculator = {
    displayValue: '0',
    firstOperand: null,
    operator: null,
    waitingForSecondOperand: false
};
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
       console.log('operator', target.value);
       return;

   }
   if(target.classList.contains('decimal')){
       console.log('decimal', target.value);
       return;
   }
    if (target.classList.contains('all-clear')) {
        console.log('all-clear', target.value);
        return;

    }
    console.log('digit',target.value);
});