const Player = (name, marker) => {
    return { name, marker };
};

const displayRender = (() => {
    let displayText = document.querySelector('#display');

    const changeDisplayText = (text) => {
        displayText.textContent = text + " Turn";
    }

    const resetDisplay = () => {
        displayText.textContent = "Player One Turn";
    }

    const draw = () => {
        displayText.textContent = "Draw";
    }

    return {
        changeDisplayText,
        resetDisplay,
        draw
    }
})();

const board = (() => {
    let board = ['', '', '', '', '', '', '', '', ''];
    const boardContainer = document.querySelector('#boardContainer');
    const boardDivs = document.querySelectorAll('.playerMove');
    const resetButton = document.querySelector('#resetButton');
    let currentPlayer = '';
    let playerOne = Player('Player One', addX);
    let playerTwo = Player('Player Two', addY);
    let drawCount = 0;

    // Initial Function Decleartion
    updateContainer();
    //

    function updateContainer() {
        board.forEach((spot, i) => {
            let div = document.createElement('div');
            div.classList.add('playBox');
            div.setAttribute('data-index', i)
            let span = document.createElement('span');
            span.textContent = spot;
            div.appendChild(span);
            boardContainer.appendChild(div);
        })
    }

    function addX(e) {
        let index = e.target.getAttribute('data-index');
        if (board[index] == '') {
            let span = document.createElement('span');
            span.textContent = "X";
            span.classList.add('text');
            board[index] = 'X';
            e.target.appendChild(span);
        }
    }

    function addY(e) {
        let index = e.target.getAttribute('data-index');
        if (board[index] == '') {
            let span = document.createElement('span');
            span.textContent = "Y";
            span.classList.add('text');
            board[index] = 'Y';
            e.target.appendChild(span);
        }
    }

    function playerChange(e) {
        currentPlayer = (currentPlayer == playerOne) ? playerTwo : playerOne;
        // displayRender.changeDisplayText(currentPlayer.name);
        if (currentPlayer == playerOne) {
            playerOne.marker(e);
            displayRender.changeDisplayText(playerTwo.name);
        } else {
            playerTwo.marker(e);
            displayRender.changeDisplayText(playerOne.name);
        }
        checkWin();
        drawCount++;
    }

    function checkWin() {
        const possibleWins = [
            [0, 1, 2],
            [3, 4, 5],
            [6, 7, 8],
            [0, 3, 6],
            [1, 4, 7],
            [2, 5, 8],
            [0, 4, 8],
            [2, 4, 6]
        ];

        for (let i = 0; i < possibleWins.length; i++) {
            let currentTest = [];
            possibleWins[i].forEach(point => {
                currentTest.push(board[point]);
            })
            console.log(currentTest);
            if (checkIfX(currentTest)) {
                displayRender.changeDisplayText("Player One Wins");
                boardContainer.removeEventListener("click", playerChange);
            } else if (checkIfY(currentTest)) {
                displayRender.changeDisplayText("Player Two Wins");
                boardContainer.removeEventListener("click", playerChange);
            } else if (drawCount == 9) {
                displayRender.draw();
                boardContainer.removeEventListener("click", playerChange);
            }
        }

        function checkIfX(arr) {
            let test = arr.every(point => {
                return point == 'X';
            })
            return test;
        }

        function checkIfY(arr) {
            let test = arr.every(point => {
                return point == 'Y';
            })
            return test;
        }
    }

    function reset() {
        board = ['', '', '', '', '', '', '', '', ''];
        boardContainer.textContent = '';
        boardContainer.addEventListener('click', playerChange);
        displayRender.resetDisplay();
        updateContainer();
    }


    //Active Events
    boardContainer.addEventListener('click', playerChange);

    resetButton.addEventListener('click', reset);

})();