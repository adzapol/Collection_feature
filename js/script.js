$(document).ready(function() {
    $('.section-content-header-burger').click(function(event) {
        $('.section-content-header-burger,.section-content-header-menu').toggleClass('active');
        $('body').toggleClass('lock'); // что бы не было скрола под меню, важно для юзабилити
    });
});


// Функция: создает новый параграф и добавляет его вниз тела HTML.
function createParagraph() { // добавление абзаца с MDN
    let para = document.createElement('p');
    para.textContent = 'You clicked the button!';
    document.body.appendChild(para);
}
/*
  1. Получаем ссылки на все кнопки на странице в виде массива.
  2. Перебераем все кнопки и добавляем к ним отслеживатель события нажатия.

  При нажатии любой кнопки, будет выполняться функция createParagraph().
*/
const buttons = document.querySelectorAll('button');

for(let i = 0; i < buttons.length ; i++) {
buttons[i].addEventListener('click', createParagraph);
}


// Игра «Угадай число» - https://developer.mozilla.org/ru/docs/Learn/JavaScript/Первые_шаги/A_first_splash

var randomNumber = Math.floor(Math.random() * 100) + 1;

var guesses = document.querySelector('.guesses');
var lastResult = document.querySelector('.lastResult');
var lowOrHi = document.querySelector('.lowOrHi');

var guessSubmit = document.querySelector('.guessSubmit');
var guessField = document.querySelector('.guessField');

var guessCount = 1;
var resetButton;
guessField.focus();

function checkGuess () {
    var userGuess = Number(guessField.value);
    if (guessCount === 1) {
        guesses.textContent = 'Предыдущие догадки: ';
    }
    guesses.textContent += userGuess + ' ';

    if (userGuess === randomNumber) {
        lastResult.textContent = 'Поздравляю! Ты все правильно понял!';
        lastResult.style.backgroundColor = 'green';
        lowOrHi.textContent = '';
        setGameOver();
    } else if (guessCount === 10) {
        lastResult.textContent = '!!!GAME OVER!!!';
        setGameOver();
    } else {
        lastResult.textContent = 'Неправильно!';
        lastResult.style.backgroundColor = 'red';
        if (userGuess < randomNumber) {
            lowOrHi.textContent = 'Последнее предположение было слишком низким!';
        } else if (userGuess > randomNumber) {
            lowOrHi.textContent = 'Последнее предположение было слишком высоким!';
        }
    }
    
    guessCount++;
    guessField.value = '';
    guessField.focus();
}
guessSubmit.addEventListener('click', checkGuess);

function setGameOver () {
    const container = document.querySelector('.section-main-container');
    guessField.disabled = true;
    guessSubmit.disabled = true;
    resetButton = document.createElement('button');
    resetButton.textContent = 'Начните новую игру';
    container.appendChild(resetButton);
    resetButton.classList.add('resetButton');
    resetButton.addEventListener('click', resetGame);
}

function resetGame() {
    guessCount = 1;

    var resetParas = document.querySelectorAll('.resultParas p');
    for (var i = 0 ; i < resetParas.length ; i++) {
        resetParas[i].textContent = '';
    }

    resetButton.parentNode.removeChild(resetButton);

    guessField.disabled = false;
    guessSubmit.disabled = false;
    guessField.value = '';
    guessField.focus();

    lastResult.style.backgroundColor = 'white';

    randomNumber = Math.floor(Math.random() * 100) + 1;
}