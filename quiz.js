const question = document.querySelector('#question');
const choices = Array.from(document.querySelectorAll('.choice-text'));
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
console.log(quizType)

var questionCount = questions.length

startGame = () => {
    questionCounter = 0
    score = 0
    availableQuestions = [...questions]
    console.log(wrongAnswers)
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

startGame()