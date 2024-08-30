document.addEventListener('DOMContentLoaded', function () {
    const display = document.querySelector('.display');
    const buttons = document.querySelectorAll('.btn');
    let currentInput = '';
    let expression = '';
    let resultShown = false;

    buttons.forEach(button => {
        button.addEventListener('click', function () {
            const value = this.getAttribute('data-value');

            // Handle non-value buttons
            if (!value) {
                switch (this.id) {
                    case 'clear':
                        clearCalculator();
                        break;
                    case 'delete':
                        deleteLastCharacter();
                        break;
                    case 'equal':
                        calculateResult();
                        break;
                }
            } else {
                handleInput(value);
            }

            updateDisplay();
        });
    });

    function handleInput(value) {
        if (resultShown) {
            expression = '';
            resultShown = false;
        }
        currentInput += value;
        expression += value;
    }

    function clearCalculator() {
        currentInput = '';
        expression = '';
        resultShown = false;
        display.value = '0';
    }

    function deleteLastCharacter() {
        if (resultShown) return;
        currentInput = currentInput.slice(0, -1);
        expression = expression.slice(0, -1);
    }

    function calculateResult() {
        if (expression === '') return;
        try {
            const finalResult = eval(expression.replace(/%/g, '/100*'));
            display.value = finalResult;
            resultShown = true;
            expression = finalResult.toString();
            currentInput = '';
        } catch (e) {
            display.value = 'Error';
            expression = '';
            currentInput = '';
            resultShown = true;
        }
    }

    function updateDisplay() {
        display.value = expression || '0';
    }
});
