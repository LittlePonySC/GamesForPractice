let blockSize = 25;
let total_row = 17;
let total_col = 17;
let board;
let context;

let snakeX = blockSize * 5;
let snakeY = blockSize * 5;

let speedX = 0;
let speedY = 0;

let snakeBody = [];

let foodX;
let foodY;

let gameOver = false;
const rst = document.createElement("button");

window.onload = function () {
	// Размер тела змеии
	board = document.getElementById("board");
	board.height = total_row * blockSize;
	board.width = total_col * blockSize;
	context = board.getContext("2d");

	placeFood();
	document.addEventListener("keyup", changeDirection); //Управление
	// Скорость
	setInterval(update, 1000 / 7);
}

function update() {
	if (gameOver) {
		return;
	}

	// Задний фон игры
	context.fillStyle = "white";
	context.fillRect(0, 0, board.width, board.height);

	// Цвет еды
	context.fillStyle = "red";
	context.fillRect(foodX, foodY, blockSize, blockSize);

	if (snakeX == foodX && snakeY == foodY) {
		snakeBody.push([foodX, foodY]);
		placeFood();
	}

	// Тело змеи
	for (let i = snakeBody.length - 1; i > 0; i--) {
		snakeBody[i] = snakeBody[i - 1];
	}
	if (snakeBody.length) {
		snakeBody[0] = [snakeX, snakeY];
	}

	context.fillStyle = "black";
	snakeX += speedX * blockSize; //Обновление позиции по x.
	snakeY += speedY * blockSize; //Обновление позиции по y.

	if (snakeX < 0 || snakeX >= total_col * blockSize || snakeY < 0 || snakeY >= total_row * blockSize) {
		gameOver = true;
		if (gameOver = true){
			let restartButton = document.createElement("button");
			restartButton.innerText = "Перезапустить игру";
			restartButton.style.width = "300px"; // Ширина 100 пикселей + 100 пикселей
			restartButton.style.height = "120px"; // Высота 20 пикселей + 20 пикселей
			restartButton.style.position = "absolute"; // Позиционирование для центрирования
			restartButton.style.top = "50%"; // Центр по вертикали
			restartButton.style.left = "50%"; // Центр по горизонтали
			restartButton.style.transform = "translate(-50%, -50%)"; // Смещение для точного центрирования
			restartButton.style.fontSize = "16px"; // Размер шрифта
			document.body.appendChild(restartButton);
			restartButton.onclick = function() {
			window.location.reload(); // Перезагрузка страницы
			};
			}
	}

	context.fillRect(snakeX, snakeY, blockSize, blockSize);
	for (let i = 0; i < snakeBody.length; i++) {
		context.fillRect(snakeBody[i][0], snakeBody[i][1], blockSize, blockSize);
	}

	if (snakeX < 0 
		|| snakeX > total_col * blockSize 
		|| snakeY < 0 
		|| snakeY > total_row * blockSize) { 
		
		// Сообщение о проигрыше
		gameOver = true;
		if (gameOver = true){
		let restartButton = document.createElement("button");
        restartButton.innerText = "Перезапустить игру";
		restartButton.style.width = "300px"; // Ширина 100 пикселей + 100 пикселей
        restartButton.style.height = "120px"; // Высота 20 пикселей + 20 пикселей
        restartButton.style.position = "absolute"; // Позиционирование для центрирования
        restartButton.style.top = "50%"; // Центр по вертикали
        restartButton.style.left = "50%"; // Центр по горизонтали
        restartButton.style.transform = "translate(-50%, -50%)"; // Смещение для точного центрирования
        restartButton.style.fontSize = "16px"; // Размер шрифта
        document.body.appendChild(restartButton);
		restartButton.onclick = function() {
		window.location.reload(); // Перезагрузка страницы
		};
		}
	}

	for (let i = 0; i < snakeBody.length; i++) {
		if (snakeX == snakeBody[i][0] && snakeY == snakeBody[i][1]) { 
			gameOver = true;
		}
	}
}

function changeDirection(e) {
	if (e.code == "ArrowUp" && speedY != 1) { 
		// Невозможность повернуть в противоположную сторону
		speedX = 0;
		speedY = -1;
	}
	else if (e.code == "ArrowDown" && speedY != -1) {
		speedX = 0;
		speedY = 1;
	}
	else if (e.code == "ArrowLeft" && speedX != 1) {
		speedX = -1;
		speedY = 0;
	}
	else if (e.code == "ArrowRight" && speedX != -1) {
		speedX = 1;
		speedY = 0;
	}
}

// Cлучайное появление еды
function placeFood() {

	//В x координатах.
	foodX = Math.floor(Math.random() * total_col) * blockSize; 
	
	//В у координатах.
	foodY = Math.floor(Math.random() * total_row) * blockSize; 
}