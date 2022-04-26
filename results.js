let sessionString = localStorage.getItem('wrongAnswers')
let rightCount = localStorage.getItem('rightCount')
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
    if (wrongAnswers[i]['question'].substring(0, 5) == "audio") {
        wrongAnswers[i]['question'] = wrongAnswers[i]['question'].substring(5)
    }

    if (wrongAnswers[i]['question'].charAt(0) == "i") {
        wrongAnswers[i]['question'] = wrongAnswers[i]['question'].substring(1)
        resultPair.innerHTML += `
    <div class='wrong-question'>${wrongAnswers[i]['question']}</div>
    <div class="image-result-container incorrect">
    <img class='choice-text image-choice' src=${wrongAnswers[i]['wrong']}>
    </div>
    <div class="image-result-container correct">
    <img class='choice-text image-choice' src=${wrongAnswers[i]['right']}>
    </div>
    `
        document.getElementById('result-pair').appendChild(resultPair)
        //<div class='wrong-question'>${wrongAnswers[i]['question']}</div>
        //<div class="image-container incorrect">
        //<img class='choice-text image-choice' src=`${wrongAnswers[i]['wrong']}`>
        //</div>
        //<div class="image-container correct">
        //<img class='choice-text image-choice' src=`${wrongAnswers[i]['right']}`>
        //</div>
    } else {
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
}
