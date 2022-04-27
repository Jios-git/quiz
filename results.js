let sessionString = sessionStorage.getItem('wrongAnswers');
let rightCount = sessionStorage.getItem('rightCount');
let questionCount = sessionStorage.getItem('questionCount');
let wrongAnswers = JSON.parse(sessionString);
console.log(questionCount);
console.log(rightCount);
console.log(wrongAnswers);

const title = document.createElement('h1');
title.innerHTML = `<h1 id="question">${rightCount} out of ${questionCount} correct</h1>`;
document.getElementById('result-pair').appendChild(title);

//checking each question to see what type it is with different html output 
//for image quizes (audio and basic quiz uses same HTML)
for (var i = 0; i < wrongAnswers.length; i++) {
    const resultPair = document.createElement('div');
    if (wrongAnswers[i]['question'].substring(0, 5) == "audio") {
        wrongAnswers[i]['question'] = wrongAnswers[i]['question'].substring(5);
    }

    if (wrongAnswers[i]['question'].charAt(0) == "i") {
        wrongAnswers[i]['question'] = wrongAnswers[i]['question'].substring(1);
        resultPair.innerHTML += `
    <div class='wrong-question'>${wrongAnswers[i]['question']}</div>
    <div class="image-result-container incorrect">
    <img class='option-text image-option' src=${wrongAnswers[i]['wrong']}>
    </div>
    <div class="image-result-container correct">
    <img class='option-text image-option' src=${wrongAnswers[i]['right']}>
    </div>
    `;
        document.getElementById('result-pair').appendChild(resultPair);

    } else {
        resultPair.innerHTML += `
    <div class='wrong-question'>${wrongAnswers[i]['question']}</div>
    <div class="option-container incorrect"> 
    <p class="option-text">${wrongAnswers[i]['wrong']}</p>
    </div>
    <div class="option-container correct">
    <p class="option-text">${wrongAnswers[i]['right']}</p>
    </div>
    `;
        document.getElementById('result-pair').appendChild(resultPair);
    }
}
