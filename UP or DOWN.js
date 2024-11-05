//Добавляем изменяемую переменную "Счетчик очков" начинаем с нуля;
let score = 0;

//Генерируем случайное число от 1 до 100;
function generateRandomNumber() {
  return Math.floor(Math.random() * 100) + 1;
}

document.getElementById('UP').addEventListener('click', function() {
  handleButtonClick("UP");
});

document.getElementById('DOWN').addEventListener('click', function() {
  handleButtonClick("DOWN");
});

function compareNumbers(guess, prevNumber, nextNumber) {
  if ((guess === "UP" && nextNumber > prevNumber) || (guess === "DOWN" && nextNumber < prevNumber)) {
    return true;
  } else {
    return false;
  }
}

function playGame() {
  let prevNumber = generateRandomNumber();
  
  function handleButtonClick(guess) {
    let nextNumber = generateRandomNumber();
    
    if (compareNumbers(guess, prevNumber, nextNumber)) {
      score++;
      document.getElementById("Text").innerHTML = `Correct! Next number is ${nextNumber}. Your score is ${score}.`;
    } else {
      document.getElementById("Text").innerHTML = `Incorrect! Next number is ${nextNumber}. Computer scores! Your score is ${score}.`;
    }
    
    prevNumber = nextNumber;
  }
}

playGame();