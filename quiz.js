const question = document.querySelector('#question');
var choices;
const progressText = document.querySelector('#progressText');
const scoreText = document.querySelector('#score');

let currentQuestion = {}
let acceptingAnswers = true
let score = 0
let questionCounter = 0
let availableQuestions = []
let wrongAnswers = []
let rightCount = 0;
let sessionString = sessionStorage.getItem('questions')
let questions = JSON.parse(sessionString)
let quizType = sessionStorage.getItem('id')
sessionStorage.setItem('audioCount', "1")
audioCount = parseInt(sessionStorage.getItem('audioCount'))
console.log(questions)
console.log(audioCount)

var questionCount = questions.length
startGame = () => {
    questionCounter = 0
    score = 0
    availableQuestions = [...questions]
    console.log(wrongAnswers)
    const questionsIndex = Math.floor(Math.random() * availableQuestions.length)
    currentQuestion = availableQuestions[questionsIndex]
    if (currentQuestion.question.charAt(0) == 'i') {
        document.getElementById('question-insert').innerHTML = 
        `<div class="image-grid">
        <div class="image-container">
            <img class='choice-text image-choice' data-number="1" src='quizimages/1-1.webp'>
        </div>
        <div class="image-container">
            <img class='choice-text image-choice' data-number="2" src='quizimages/1-1.webp'>
        </div>
        <div class="image-container">
            <img class='choice-text image-choice' data-number="3" src='quizimages/1-1.webp'>
        </div>
        <div class="image-container">
            <img class='choice-text image-choice' data-number="4" src='quizimages/1-1.webp'></p>
        </div>
        </div>`
    }  else if (currentQuestion.question.substring(0,4) == 'audio') {
        document.getElementById('question-insert').innerHTML = 
        `<div id="audio_container">
        <button id="audio-btn" class='audio-button' onclick="(audioElement()).togglePlay();"></button>
        <canvas id="analyser-render"></canvas>
        </div>
        <div class="choice-container">
            <p class="choice-prefix">A</p>
            <p class="choice-text" data-number="1">Choice 1</p>
        </div>
        <div class="choice-container">
            <p class="choice-prefix">B</p>
            <p class="choice-text" data-number="2">Choice 2</p>
        </div>
        <div class="choice-container">
            <p class="choice-prefix">C</p>
            <p class="choice-text" data-number="3">Choice 3</p>
        </div>
        <div class="choice-container">
            <p class="choice-prefix">D</p>
            <p class="choice-text" data-number="4">Choice 4</p>
        </div>`
        audioCount++
        sessionStorage.setItem('audioCount', ''+audioCount)
    } else {
        document.getElementById('question-insert').innerHTML = 
        `<div class="choice-container">
            <p class="choice-prefix">A</p>
            <p class="choice-text" data-number="1">Choice 1</p>
        </div>
        <div class="choice-container">
            <p class="choice-prefix">B</p>
            <p class="choice-text" data-number="2">Choice 2</p>
        </div>
        <div class="choice-container">
            <p class="choice-prefix">C</p>
            <p class="choice-text" data-number="3">Choice 3</p>
        </div>
        <div class="choice-container">
            <p class="choice-prefix">D</p>
            <p class="choice-text" data-number="4">Choice 4</p>
        </div>`
    }

    choices = Array.from(document.querySelectorAll('.choice-text'));
    choices.forEach(choice => {
        choice.addEventListener('click', e => {
            if (!acceptingAnswers) return

            acceptingAnswers = false
            const selectedChoice = e.target
            const selectedAnswer = selectedChoice.dataset['number']

            let classToApply = selectedAnswer == currentQuestion.answer ? 'correct' : 'incorrect'
            selectedChoice.parentElement.classList.add(classToApply)

            setTimeout(() => {
                selectedChoice.parentElement.classList.remove(classToApply)
                getNewQuestion()

            }, 1000)
            if (classToApply == 'incorrect') {
                wrongAnswers.push({
                    question: currentQuestion['question'],
                    right: currentQuestion['choice' + currentQuestion.answer],
                    wrong: currentQuestion['choice' + selectedAnswer]
                })
                console.log(wrongAnswers)
            } else if (classToApply == 'correct') {
                rightCount++
                console.log(rightCount)
            }
        })

    })

    getNewQuestion()
}

getNewQuestion = () => {

    if (availableQuestions.length === 0 || questionCounter > questionCount) {
        sessionStorage.setItem('wrongAnswers', JSON.stringify(wrongAnswers))
        sessionStorage.setItem('rightCount', JSON.stringify(rightCount))
        sessionStorage.setItem('questionCount', JSON.stringify(questionCount))
        console.log(questionCount)
        console.log(rightCount)
        return window.location.assign('/results.html')
    }

    questionCounter++
    progressText.innerText = `Question ${questionCounter} of ${questionCount}`

    const questionsIndex = Math.floor(Math.random() * availableQuestions.length)
    currentQuestion = availableQuestions[questionsIndex]
    var tempQuestion = currentQuestion.question
    question.innerText = tempQuestion
    console.log(currentQuestion.question)
    /*if (currentQuestion.question.charAt(0) == 'i') {
        
    } else {
        document.getElementById('question-insert').innerHTML = `
        <div class="choice-container">
            <p class="choice-prefix">B</p>
            <p class="choice-text" data-number="1">Choice 1</p>
        </div>
        <div class="choice-container">
            <p class="choice-prefix">B</p>
            <p class="choice-text" data-number="2">Choice 2</p>
        </div>
        <div class="choice-container">
            <p class="choice-prefix">C</p>
            <p class="choice-text" data-number="3">Choice 3</p>
        </div>
        <div class="choice-container">
            <p class="choice-prefix">D</p>
            <p class="choice-text" data-number="4">Choice 4</p>
        </div>`
    }*/

    choices = Array.from(document.querySelectorAll('.choice-text'));
    choices.forEach(choice => {
        if (currentQuestion.question.charAt(0) == 'i') {
            const number = choice.dataset['number']
            choice.src = currentQuestion['choice' + number]
            question.innerText = tempQuestion.substring(1)
        } else {
            const number = choice.dataset['number']
            choice.innerText = currentQuestion['choice' + number]
        }
    })

    availableQuestions.splice(questionsIndex, 1)
    acceptingAnswers = true
}

/*choices.forEach(choice => {
    choice.addEventListener('click', e => {
        if (!acceptingAnswers) return

        acceptingAnswers = false
        const selectedChoice = e.target
        const selectedAnswer = selectedChoice.dataset['number']

        let classToApply = selectedAnswer == currentQuestion.answer ? 'correct' : 'incorrect'
        selectedChoice.parentElement.classList.add(classToApply)

        setTimeout(() => {
            selectedChoice.parentElement.classList.remove(classToApply)
            getNewQuestion()

        }, 1000)
        if (classToApply == 'incorrect') {
            wrongAnswers.push({
                question: currentQuestion['question'],
                right: currentQuestion['choice' + currentQuestion.answer],
                wrong: currentQuestion['choice' + selectedAnswer]
            })
            console.log(wrongAnswers)
        } else if (classToApply == 'correct') {
            rightCount++
            console.log(rightCount)
        }
    })

})*/

startGame()