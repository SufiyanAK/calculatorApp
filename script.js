const resultBox = document.querySelector('.result-box');
const display = document.querySelector('#input-box');
// Function to calculate the result
function customEval(expression) {
    try {
        // Use the Function constructor to create a function from the expression
        const func = new Function('return ' + expression);
        const result = func();

        return result;
    } catch (error) {
        throw new Error('Invalid expression');
    }
}

function calculateResult() {

    if (display.value.trim() !== '') {
        try {
            const result = customEval(display.value);

            resultBox.textContent = Number.isInteger(result) ? result : result.toFixed(2);

            display.value = '';
        } catch (error) {
            display.value = 'Error';

            setTimeout(() => {
                display.value = '';
            }, 1000);
        }
    }
}


// Event listener for button clicks
document.querySelectorAll('.button').forEach(btn => {
    btn.addEventListener('click', () => {
        const value = btn.textContent;

        // Check button value and perform corresponding action
        switch (value) {
            case '=':
                calculateResult();
                break;
            case 'DEL':
                display.value = display.value.toString().slice(0, -1);
                break;
            case 'Reset':
                resultBox.textContent = '';
                display.value = '';
                break;
            case '+':
            case '-':
            case '/':
            case '*':
            case '.':
                handleOperator(value);
                break;
            default:
                handleNumber(value);
        }
    });
});

function handleOperator(operator) {

    if (display.value.trim() !== '') {
        const lastChar = display.value.slice(-1);
        if (isOperator(lastChar) && operator !== '.') {
            // Replace the last operator if it exists (except for decimal point)
            display.value = display.value.slice(0, -1) + operator;
        } else if (lastChar !== '.' || (lastChar === '.' && operator !== '.')) {
            // Add the operator if the last character is not a decimal point or replace if the operator is not a decimal point
            display.value += operator;
        }
    }
}


function handleNumber(number) {
    // Check if the display contains the calculated value
    if (display.value.includes('=')) {
        // If the display contains '=', start a new calculation
        display.value = number;
    } else {
        // If the display doesn't contain '=', append the number
        display.value += number;
    }
}


function isOperator(char) {
    return ['+', '-', '*', '/'].includes(char);
}



// // Function to calculate the result
// function calculateResult() {
//     const display = document.querySelector('#input-box');

//     // Check if the input is not empty before evaluating
//     if (display.value.trim() !== '') {
//         try {
//             // Evaluate the expression and round the result to 2 decimal places
//             const result = eval(display.value);
//             display.value = result;
//         } catch (error) {
//             // Handle errors, for example, if the expression is not valid
//             display.value = 'Error';

//             // Set a timeout to clear the display after 1 second
//             setTimeout(() => {
//                 display.value = '';
//             }, 1000);
//         }
//     }
// }


// // Event listener for button clicks
// document.querySelectorAll('.button').forEach(btn => {
//     btn.addEventListener('click', () => {
//         const display = document.querySelector('#input-box');
//         const value = btn.textContent;

//         // Check button value and perform corresponding action
//         if (value === '=') {
//             calculateResult();

//         } else if (value === 'DEL') {
//             display.value = display.value.toString().slice(0, -1);
            
//         } else if (value === 'Reset') {
//             display.value = '';
            
//         } else {
//             if (value === '+' && display.value.slice(-1) !== '+' && display.value.trim() !== '') {
//                 if (display.value.slice(-1) === '-' || display.value.slice(-1) === '/' || display.value.slice(-1) === '*') {
//                     display.value = display.value.toString().slice(0, -1);
//                     display.value += '+';
//                 } else {
//                     display.value += '+';
//                 }

//             } else if (value === '-' && display.value.slice(-1) !== '-' && display.value.trim() !== '') {
//                 if (display.value.slice(-1) === '+' || display.value.slice(-1) === '/' || display.value.slice(-1) === '*') {
//                     display.value = display.value.toString().slice(0, -1);
//                     display.value += '-';
//                 } else {
//                     display.value += '-';
//                 }

//             } else if (value === '/' && display.value.slice(-1) !== '/' && display.value.trim() !== '') {
//                 if (display.value.slice(-1) === '-' || display.value.slice(-1) === '+' || display.value.slice(-1) === '*') {
//                     display.value = display.value.toString().slice(0, -1);
//                     display.value += '/';
//                 } else {
//                     display.value += '/';
//                 }

//             } else if (value === '*' && display.value.slice(-1) !== '*' && display.value.trim() !== '') {
//                 if (display.value.slice(-1) === '-' || display.value.slice(-1) === '/' || display.value.slice(-1) === '*') {
//                     display.value = display.value.toString().slice(0, -1);
//                     display.value += '*';
//                 } else {
//                     display.value += '*';
//                 }

//             } else if (value === '.' && display.value.slice(-1) !== '.' && display.value.trim() !== '') {
//                 if (display.value.slice(-1) !== '+' && display.value.slice(-1) !== '-' && display.value.slice(-1) !== '/' && display.value.slice(-1) !== '*') {
//                     display.value += '.';
//                 }

//             } else if (value >= '0' && value <= 9) {
//                 if (!display.value) {
//                     console.log('sufiyan');
//                     display.value += value;

//                 } else {
                    
//                     display.value = '';
//                     display.value += value;
//                 }
//             }
//         }
//     });
// });

// Event listener for mode toggle
const toggle = document.querySelector('.toggler-box');
let isActive = true;
toggle.addEventListener('click', toggleMode);

// Function to toggle between light and dark mode
function toggleMode() {
    const body = document.querySelector('body');
    if (isActive) {
        toggle.classList.add('active');
        body.classList.add('light');
        isActive = false;
    } else {
        toggle.classList.remove('active');
        body.classList.remove('light');
        isActive = true;
    }
}
