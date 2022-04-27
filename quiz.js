const question = document.querySelector('#question');
var options;
const progressText = document.querySelector('#progressText');
const scoreText = document.querySelector('#score');

getType();

let currentQuestion = {};
let acceptingAnswers = true;
let score = 0;
let questionCounter = 0;
let availableQuestions = [];
let wrongAnswers = [];
let rightCount = 0;
let sessionString = sessionStorage.getItem('questions');
let questions = JSON.parse(sessionString);
var questionCount = questions.length;

//initilizing varibles and HTML that will be used in a different
//function that will edit the displayed questions, also displaying the first question
startGame = () => {
    questionCounter = 0;
    score = 0;
    availableQuestions = [...questions];
    currentQuestion = availableQuestions[questionCounter];

    if (currentQuestion.question.charAt(0) == 'i') {
        document.getElementById('question-insert').innerHTML = 
        `<div class="image-grid">
        <div class="image-container">
            <img class='option-text image-option' data-number="1" src='quizimages/1-1.webp'>
        </div>
        <div class="image-container">
            <img class='option-text image-option' data-number="2" src='quizimages/1-1.webp'>
        </div>
        <div class="image-container">
            <img class='option-text image-option' data-number="3" src='quizimages/1-1.webp'>
        </div>
        <div class="image-container">
            <img class='option-text image-option' data-number="4" src='quizimages/1-1.webp'></p>
        </div>
        </div>`;
    }  else if (currentQuestion.question.substring(0,5) == 'audio') {
        document.getElementById('question-insert').innerHTML = 
        `<div id="audio_container">
        <button id="audio-btn" class='audio-button' onclick="togglePlay();"></button>
        <canvas id="analyser-render"></canvas>
        </div>
        <div class="option-container">
            <p class="option-prefix">A</p>
            <p class="option-text" data-number="1" onclick="buttonPress=true;togglePlay();">option 1</p>
        </div>
        <div class="option-container">
            <p class="option-prefix">B</p>
            <p class="option-text" data-number="2" onclick="buttonPress=true;togglePlay();">option 2</p>
        </div>
        <div class="option-container">
            <p class="option-prefix">C</p>
            <p class="option-text" data-number="3" onclick="buttonPress=true;togglePlay();">option 3</p>
        </div>
        <div class="option-container">
            <p class="option-prefix">D</p>
            <p class="option-text" data-number="4" onclick="buttonPress=true;togglePlay();">option 4</p>
        </div>`;
        
    } else {
        document.getElementById('question-insert').innerHTML = `<div class="option-container">
            <p class="option-prefix">A</p>
            <p class="option-text" data-number="1">option 1</p>
        </div>
        <div class="option-container">
            <p class="option-prefix">B</p>
            <p class="option-text" data-number="2">option 2</p>
        </div>
        <div class="option-container">
            <p class="option-prefix">C</p>
            <p class="option-text" data-number="3">option 3</p>
        </div>
        <div class="option-container">
            <p class="option-prefix">D</p>
            <p class="option-text" data-number="4">option 4</p>
        </div>`;
    }


    //for each option stored (there will always be 4 options) an event listener is added.
    //when each button is pressed, getNextQuestion() is called and css is changed accordingly
    options = Array.from(document.querySelectorAll('.option-text'));
    options.forEach(option => {
        option.addEventListener('click', e => {
            if (!acceptingAnswers) return;

            acceptingAnswers = false;
            const selectedoption = e.target;
            const selectedAnswer = selectedoption.dataset['number'];

            let classToApply = selectedAnswer == currentQuestion.answer ? 'correct' : 'incorrect';
            selectedoption.parentElement.classList.add(classToApply);

            setTimeout(() => {
                selectedoption.parentElement.classList.remove(classToApply);
                getNextQuestion();

            }, 1000)
            if (classToApply == 'incorrect') {
                wrongAnswers.push({
                    question: currentQuestion['question'],
                    right: currentQuestion['option' + currentQuestion.answer],
                    wrong: currentQuestion['option' + selectedAnswer]
                })
            } else if (classToApply == 'correct') {
                rightCount++;
            }
        })

    })

    getNextQuestion();
}

getNextQuestion = () => {
    if (availableQuestions.length == 0 || questionCounter >= questionCount) {
        sessionStorage.setItem('wrongAnswers', JSON.stringify(wrongAnswers));
        sessionStorage.setItem('rightCount', JSON.stringify(rightCount));
        sessionStorage.setItem('questionCount', JSON.stringify(questionCount));
        return window.location.href = 'https://jios-git.github.io/quiz/results.html';
    }

    questionCounter++;
    progressText.innerText = `Question ${questionCounter} of ${questionCount}`;

    currentQuestion = availableQuestions[questionCounter-1];
    var tempQuestion = currentQuestion.question;
    if (tempQuestion.substring(0,5) == "audio") {
        tempQuestion = tempQuestion.substring(5);
    }
    question.innerText = tempQuestion;
    
    options = Array.from(document.querySelectorAll('.option-text'));
    options.forEach(option => {
        if (currentQuestion.question.charAt(0) == 'i') {
            const number = option.dataset['number'];
            option.src = currentQuestion['option' + number];
            question.innerText = tempQuestion.substring(1);
        } else {
            const number = option.dataset['number'];
            option.innerText = currentQuestion['option' + number];
        }
    })

    availableQuestions.splice(questionCount, 1);
    acceptingAnswers = true;
}

//adapted from https://github.com/briancodex/quiz-app-js/blob/master/game.js

startGame();