document.addEventListener("DOMContentLoaded", () => {
    const board = document.getElementById("board");
    let currentPlayer = "X";
    let gameBoard = [
        ["", "", "", "", "", "", ""],
        ["", "", "", "", "", "", ""],
        ["", "", "", "", "", "", ""],
        ["", "", "", "", "", "", ""],
        ["", "", "", "", "", "", ""],
        ["", "", "", "", "", "", ""],
    ];

    // Create the game board
    for (let i = 0; i < 6; i++) {
        for (let j = 0; j < 7; j++) {
            const cell = document.createElement("div");
            cell.classList.add("cell");
            cell.dataset.row = i.toString();
            cell.dataset.col = j.toString();
            cell.addEventListener("click", handleCellClick);
            board.appendChild(cell);
        }
    }

    function handleCellClick(event) {
        const clickedCell = event.target;
        const row = parseInt(clickedCell.dataset.row);
        const col = parseInt(clickedCell.dataset.col);

        if (gameBoard[row][col] === "") {
            gameBoard[row][col] = currentPlayer;
            clickedCell.textContent = currentPlayer;

            if (checkForWin(row, col)) {
                alert(`Player ${currentPlayer} wins!`);
                resetGame();
            } else {
                currentPlayer = currentPlayer === "X" ? "O" : "X";
            }
        }
    }

    function checkForWin(row, col) {
        // Check for four consecutive discs in a row
        if (
            checkConsecutive(row, col, 0, 1) ||  // Horizontal
            // Check for four consecutive discs in a column
            checkConsecutive(row, col, 1, 0) ||  // Vertical
            // Check for four consecutive discs in a diagonal (top-left to bottom-right)
            checkConsecutive(row, col, 1, 1) ||  // Diagonal /
            // Check for four consecutive discs in a diagonal (top-right to bottom-left)
            checkConsecutive(row, col, -1, 1)    // Diagonal \
        ) {
            return true;
        }
    
        return false;
    }
    
    function checkConsecutive(row, col, rowIncrement, colIncrement) {
        const player = gameBoard[row][col];
    
        for (let i = 1; i < 4; i++) {
            const newRow = row + i * rowIncrement;
            const newCol = col + i * colIncrement;
    
            if (
                newRow < 0 || newRow >= 6 ||
                newCol < 0 || newCol >= 7 ||
                gameBoard[newRow][newCol] !== player
            ) {
                return false; // If the consecutive disc is not found, return false
            }
        }
    
        return true; // If four consecutive discs are found, return true
    }
    

    function resetGame() {
        // Reset the game board and UI
        gameBoard = [
            ["", "", "", "", "", "", ""],
            ["", "", "", "", "", "", ""],
            ["", "", "", "", "", "", ""],
            ["", "", "", "", "", "", ""],
            ["", "", "", "", "", "", ""],
            ["", "", "", "", "", "", ""],
        ];

        const cells = document.querySelectorAll(".cell");
        cells.forEach(cell => {
            cell.textContent = "";
        });

        currentPlayer = "X";
    }
});
