document.addEventListener('DOMContentLoaded', () => {
    const startingNumberElem = document.getElementById('starting-number');
    const targetNumberElem = document.getElementById('target-number');
    const operationsCountElem = document.getElementById('operations-count');
    const statusElem = document.getElementById('status');
    const pathElem = document.getElementById('path');
    const timeLeftElem = document.getElementById('time-left'); // Timer display

    const buttons = {
        multiplyBy2: document.getElementById('multiply-by-2'),
        divideBy2: document.getElementById('divide-by-2'),
        subtract1: document.getElementById('subtract-1'),
        add1: document.getElementById('add-1'),
        divideBy10: document.getElementById('divide-by-10'),
        multiplyBy10: document.getElementById('multiply-by-10'),
        subtract10: document.getElementById('subtract-10'),
        add10: document.getElementById('add-10'),
        resetButton: document.getElementById('reset-button')
    };

    let startingNumber = 0;
    let targetNumber = 0;
    let operationsCount = 0;
    let timer;
    let timeLeft = 60; // Time limit in seconds

    function initializeGame() {
        startingNumber = Math.floor(Math.random() * 100) + 1; // Adjust range as needed
        targetNumber = Math.floor(Math.random() * 100) + 1;
        operationsCount = 0;
        timeLeft = 60; // Reset time

        startingNumberElem.textContent = startingNumber;
        targetNumberElem.textContent = targetNumber;
        operationsCountElem.textContent = operationsCount;
        statusElem.textContent = '';
        pathElem.textContent = '';
        timeLeftElem.textContent = timeLeft;

        startTimer();
    }

    function startTimer() {
        timer = setInterval(() => {
            timeLeft--;
            timeLeftElem.textContent = timeLeft;

            if (timeLeft <= 0) {
                clearInterval(timer);
                handleGameOver();
            }
        }, 1000); // Update every second
    }

    function updateGame(value) {
        if (value === targetNumber) {
            statusElem.textContent = 'Congratulations! You reached the target number!';
            clearInterval(timer); // Stop the timer
            setTimeout(() => {
                initializeGame(); // Reset game after showing the path
            }, 2000); // Delay before generating new numbers
            return;
        }

        if (value < 0) {
            statusElem.textContent = 'Your number is too low!';
            return;
        }

        startingNumber = value;
        operationsCount++;
        startingNumberElem.textContent = startingNumber;
        operationsCountElem.textContent = operationsCount;

        if (startingNumber > targetNumber) {
            statusElem.textContent = 'Your number is too high!';
        } else {
            statusElem.textContent = 'Try to get closer to the target!';
        }
    }

    function handleGameOver() {
        statusElem.textContent = "Time's up! Game Over!";
        // Optionally, display the final result or prompt to restart
    }

    buttons.multiplyBy2.addEventListener('click', () => updateGame(startingNumber * 2));
    buttons.divideBy2.addEventListener('click', () => updateGame(Math.floor(startingNumber / 2)));
    buttons.subtract1.addEventListener('click', () => updateGame(startingNumber - 1));
    buttons.add1.addEventListener('click', () => updateGame(startingNumber + 1));
    buttons.divideBy10.addEventListener('click', () => updateGame(Math.floor(startingNumber / 10)));
    buttons.multiplyBy10.addEventListener('click', () => updateGame(startingNumber * 10));
    buttons.subtract10.addEventListener('click', () => updateGame(startingNumber - 10));
    buttons.add10.addEventListener('click', () => updateGame(startingNumber + 10));
    buttons.resetButton.addEventListener('click', initializeGame);

    initializeGame();
});
