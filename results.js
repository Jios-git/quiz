let sessionString = sessionStorage.getItem('wrongAnswers')
let rightCount = sessionStorage.getItem('rightCount')
let questionCount = sessionStorage.getItem('questionCount')
let wrongAnswers = JSON.parse(sessionString)
console.log(questionCount)
console.log(rightCount)
console.log(wrongAnswers)

const title = document.createElement('h1')
title.innerHTML = `<h1 id="question">${rightCount} out of ${questionCount} correct</h1>`
document.getElementById('result-pair').appendChild(title)

for (var i = 0; i < wrongAnswers.length; i++) {
    const resultPair = document.createElement('div')
    resultPair.innerHTML += `
    <div class='wrong-question'>${wrongAnswers[i]['question']}</div>
    <div class="choice-container incorrect"> 
    <p class="choice-text">${wrongAnswers[i]['wrong']}</p>
    </div>
    <div class="choice-container correct">
    <p class="choice-text">${wrongAnswers[i]['right']}</p>
    </div>
    `
    document.getElementById('result-pair').appendChild(resultPair)
}
