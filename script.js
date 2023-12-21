document.addEventListener("DOMContentLoaded", () => {
    const gameContainer = document.getElementById("gameContainer");
    const scoreBoard = document.createElement("div");
    scoreBoard.className = "scoreBoard";
    gameContainer.appendChild(scoreBoard);

    let snake = [{ row: 20, col: 1 }];
    let direction = "right";
    let score = 0;

    function renderSnake() {
        clearBoard();
        snake.forEach((segment) => {
            const pixel = document.getElementById(`pixel${segment.row}_${segment.col}`);
            pixel.className = "pixel snakeBodyPixel";
        });
    }

    function renderFood() {
        const food = document.createElement("div");
        food.className = "pixel food";
        const randomRow = Math.floor(Math.random() * 40) + 1;
        const randomCol = Math.floor(Math.random() * 40) + 1;
        food.id = `pixel${randomRow}_${randomCol}`;
        gameContainer.appendChild(food);
    }

    function clearBoard() {
        const pixels = document.querySelectorAll(".pixel");
        pixels.forEach((pixel) => {
            pixel.className = "pixel";
        });
    }

    function updateScore() {
        score++;
        scoreBoard.textContent = `Score: ${score}`;
    }

    function moveSnake() {
        const head = { ...snake[0] };

        switch (direction) {
            case "up":
                head.row--;
                break;
            case "down":
                head.row++;
                break;
            case "left":
                head.col--;
                break;
            case "right":
                head.col++;
                break;
        }

        snake.unshift(head);

        const foodPixel = document.querySelector(`.food#${gameContainer.id} .pixel`);
        if (foodPixel && foodPixel.id === `pixel${head.row}_${head.col}`) {
            foodPixel.remove();
            updateScore();
            renderFood();
        } else {
            snake.pop();
        }

        renderSnake();
    }

    renderFood();
    setInterval(moveSnake, 100);

    document.addEventListener("keydown", (event) => {
        switch (event.key) {
            case "ArrowUp":
                direction = "up";
                break;
            case "ArrowDown":
                direction = "down";
                break;
            case "ArrowLeft":
                direction = "left";
                break;
            case "ArrowRight":
                direction = "right";
                break;
        }
    });
});
