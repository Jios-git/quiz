var questions = [
    {
        question: 'temp',
        choice1: 'temp',
        choice2: 'temp',
        choice3: 'temp',
        choice4: 'temp',
        answer: 1,
    }]
console.log(questions)
var quizType;
quizType = sessionStorage.getItem('id')
console.log(quizType)
if (quizType == 'basic') {
    quizType = 'https://jios-git.github.io/quiz/questions.txt'
} else if (quizType == 'image') {
    quizType = 'https://jios-git.github.io/quiz/imagequiz.txt'
} else if (quizType == 'sound') {
    quizType = 'https://jios-git.github.io/quiz/questions.txt'
}
var rawFile;
if (quizType != undefined) {
    $.get(quizType, function (data) {
        //process text file line by line
        console.log('1')
        //console.log(data)
        rawFile = data
    });
}

function setQuiz(files) {


    if (quizType != undefined) {
        //var file = files[0]
        var file = 'https://jios-git.github.io/quiz/questions.txt'

        //file = 'questions.txt'
        var imageQuestionCount = 1
        console.log(rawFile)
        var reader = new FileReader()
        console.log('2')
        // By lines
        if (files != undefined) {
            console.log('yes')
        } else {
            var lines = rawFile.split('\n')
            var arrNum = 0
            for (var line = 0; line < lines.length; line++) {
                console.log(lines[line])
                if (lines[line].charAt(0) == 'q' && arrNum == 0) {
                    //.replace(/\r?\n|\r/g, '')
                    var qtemp = ('' + lines[line]).replace(/\r?\n|\r/g, '')
                    var temp1 = ('' + lines[line + 1]).replace(/\r?\n|\r/g, '')
                    var temp2 = ('' + lines[line + 2]).replace(/\r?\n|\r/g, '')
                    var temp3 = ('' + lines[line + 3]).replace(/\r?\n|\r/g, '')
                    var temp4 = ('' + lines[line + 4]).replace(/\r?\n|\r/g, '')
                    var rtemp = ('' + lines[line + 5]).replace(/\r?\n|\r/g, '')
                    questions[arrNum].question = qtemp.substring(1)
                    questions[arrNum].choice1 = temp1
                    questions[arrNum].choice2 = temp2
                    questions[arrNum].choice3 = temp3
                    questions[arrNum].choice4 = temp4
                    questions[arrNum].answer = rtemp
                    arrNum++
                    console.log('first' + arrNum)
                } else if (lines[line].charAt(0) == 'q') {
                    var qtemp = ('' + lines[line]).replace(/\r?\n|\r/g, '')
                    var temp1 = ('' + lines[line + 1]).replace(/\r?\n|\r/g, '')
                    var temp2 = ('' + lines[line + 2]).replace(/\r?\n|\r/g, '')
                    var temp3 = ('' + lines[line + 3]).replace(/\r?\n|\r/g, '')
                    var temp4 = ('' + lines[line + 4]).replace(/\r?\n|\r/g, '')
                    var rtemp = ('' + lines[line + 5]).replace(/\r?\n|\r/g, '')
                    questions.push({
                        question: qtemp.substring(1),
                        choice1: temp1,
                        choice2: temp2,
                        choice3: temp3,
                        choice4: temp4,
                        answer: rtemp
                    })
                    arrNum++
                    console.log('second' + arrNum)
                } else if (lines[line].charAt(0) == 'i' && arrNum == 0) {
                    console.log('i')
                    var qtemp = ('' + lines[line]).replace(/\r?\n|\r/g, '')
                    var rtemp = ('' + lines[line + 1]).replace(/\r?\n|\r/g, '')
                    questions[arrNum].question = qtemp
                    questions[arrNum].choice1 = `quizimages/${imageQuestionCount}-1.webp`
                    questions[arrNum].choice2 = `quizimages/${imageQuestionCount}-2.webp`
                    questions[arrNum].choice3 = `quizimages/${imageQuestionCount}-3.webp`
                    questions[arrNum].choice4 = `quizimages/${imageQuestionCount}-4.webp`
                    questions[arrNum].answer = rtemp
                    imageQuestionCount++
                    arrNum++
                } else if (lines[line].charAt(0) == 'i') {
                    var qtemp = ('' + lines[line]).replace(/\r?\n|\r/g, '')
                    var rtemp = ('' + lines[line + 1]).replace(/\r?\n|\r/g, '')
                    questions.push({
                        question: qtemp,
                        choice1: `quizimages/${imageQuestionCount}-1.webp`,
                        choice2: `quizimages/${imageQuestionCount}-2.webp`,
                        choice3: `quizimages/${imageQuestionCount}-3.webp`,
                        choice4: `quizimages/${imageQuestionCount}-4.webp`,
                        answer: rtemp
                    })
                    imageQuestionCount++
                    arrNum++
                } else if (lines[line].substring(0,4) == 'audio' && arrNum == 0) {
                    console.log('i')
                    var qtemp = ('' + lines[line]).replace(/\r?\n|\r/g, '')
                    var rtemp = ('' + lines[line + 1]).replace(/\r?\n|\r/g, '')
                    questions[arrNum].question = qtemp
                    questions[arrNum].choice1 = ''
                    questions[arrNum].choice2 = ''
                    questions[arrNum].choice3 = ''
                    questions[arrNum].choice4 = ''
                    questions[arrNum].answer = rtemp
                    imageQuestionCount++
                    arrNum++
                } else if (lines[line].substring(0,4) == 'audio') {
                    var qtemp = ('' + lines[line]).replace(/\r?\n|\r/g, '')
                    var rtemp = ('' + lines[line + 1]).replace(/\r?\n|\r/g, '')
                    questions.push({
                        question: qtemp,
                        choice1: '',
                        choice2: '',
                        choice3: '',
                        choice4: '',
                        answer: rtemp
                    })
                    imageQuestionCount++
                    arrNum++
                }
            }
        }
        console.log(questions)
        sessionStorage.setItem("questions", JSON.stringify(questions))
        console.log(sessionStorage.getItem("questions"))
    }
}


