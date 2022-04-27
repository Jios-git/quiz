

var quizType;
var rawFile;

function getType() {
    
    quizType = sessionStorage.getItem('id')
    
    if (quizType == 'basic') {
        quizType = 'https://jios-git.github.io/quiz/basicquiz.txt';
    } else if (quizType == 'image') {
        quizType = 'https://jios-git.github.io/quiz/imagequiz.txt';
    } else if (quizType == 'audio') {
        quizType = 'https://jios-git.github.io/quiz/audioquiz.txt';
    }
    
    
    if (quizType != undefined) {
        //process text file line by line
        $.get(quizType, function (data) {
            rawFile = data;
            setQuiz();
        });
        
    }
}

//the parameter is unused, but what intended to be used in filechoose.html where
//the user could upload their own quiz
function setQuiz(files) {

    var questions = [
        {
            question: 'temp',
            option1: 'temp',
            option2: 'temp',
            option3: 'temp',
            option4: 'temp',
            answer: 1,
        }]

    if (quizType != undefined) {
        //var file = files[0]
        console.log(rawFile);
        var imageQuestionCount = 1;
        var reader = new FileReader();

        if (files != undefined) {
            console.log('yes');
        } else {
            var lines = rawFile.split('\n');
            var arrNum = 0;
            //after getting rawFile with $.get, each line/question and options
            //are pushed to questions array. what is a pushed depends on whether
            //the question line begins with audio, i or q
            for (var line = 0; line < lines.length; line++) {

                if (lines[line].charAt(0) == 'q' && arrNum == 0) {
                    //.replace(/\r?\n|\r/g, '')
                    var qtemp = ('' + lines[line]).replace(/\r?\n|\r/g, '');
                    var temp1 = ('' + lines[line + 1]).replace(/\r?\n|\r/g, '');
                    var temp2 = ('' + lines[line + 2]).replace(/\r?\n|\r/g, '');
                    var temp3 = ('' + lines[line + 3]).replace(/\r?\n|\r/g, '');
                    var temp4 = ('' + lines[line + 4]).replace(/\r?\n|\r/g, '');
                    var rtemp = ('' + lines[line + 5]).replace(/\r?\n|\r/g, '');
                    questions[arrNum].question = qtemp.substring(1);
                    questions[arrNum].option1 = temp1;
                    questions[arrNum].option2 = temp2;
                    questions[arrNum].option3 = temp3;
                    questions[arrNum].option4 = temp4;
                    questions[arrNum].answer = rtemp;
                    arrNum++;
                } else if (lines[line].charAt(0) == 'q') {
                    var qtemp = ('' + lines[line]).replace(/\r?\n|\r/g, '');
                    var temp1 = ('' + lines[line + 1]).replace(/\r?\n|\r/g, '');
                    var temp2 = ('' + lines[line + 2]).replace(/\r?\n|\r/g, '');
                    var temp3 = ('' + lines[line + 3]).replace(/\r?\n|\r/g, '');
                    var temp4 = ('' + lines[line + 4]).replace(/\r?\n|\r/g, '');
                    var rtemp = ('' + lines[line + 5]).replace(/\r?\n|\r/g, '');
                    questions.push({
                        question: qtemp.substring(1),
                        option1: temp1,
                        option2: temp2,
                        option3: temp3,
                        option4: temp4,
                        answer: rtemp
                    })
                    arrNum++;
                } else if (lines[line].charAt(0) == 'i' && arrNum == 0) {
                    var qtemp = ('' + lines[line]).replace(/\r?\n|\r/g, '');
                    var rtemp = ('' + lines[line + 1]).replace(/\r?\n|\r/g, '');
                    questions[arrNum].question = qtemp;
                    questions[arrNum].option1 = `quizimages/${imageQuestionCount}-1.webp`;
                    questions[arrNum].option2 = `quizimages/${imageQuestionCount}-2.webp`;
                    questions[arrNum].option3 = `quizimages/${imageQuestionCount}-3.webp`;
                    questions[arrNum].option4 = `quizimages/${imageQuestionCount}-4.webp`;
                    questions[arrNum].answer = rtemp;
                    imageQuestionCount++;
                    arrNum++;
                } else if (lines[line].charAt(0) == 'i') {
                    var qtemp = ('' + lines[line]).replace(/\r?\n|\r/g, '');
                    var rtemp = ('' + lines[line + 1]).replace(/\r?\n|\r/g, '');
                    questions.push({
                        question: qtemp,
                        option1: `quizimages/${imageQuestionCount}-1.webp`,
                        option2: `quizimages/${imageQuestionCount}-2.webp`,
                        option3: `quizimages/${imageQuestionCount}-3.webp`,
                        option4: `quizimages/${imageQuestionCount}-4.webp`,
                        answer: rtemp
                    })
                    imageQuestionCount++;
                    arrNum++;
                } else if (lines[line].substring(0, 5) == 'audio' && arrNum == 0) {
                    var qtemp = ('' + lines[line]).replace(/\r?\n|\r/g, '');
                    var temp1 = ('' + lines[line + 1]).replace(/\r?\n|\r/g, '');
                    var temp2 = ('' + lines[line + 2]).replace(/\r?\n|\r/g, '');
                    var temp3 = ('' + lines[line + 3]).replace(/\r?\n|\r/g, '');
                    var temp4 = ('' + lines[line + 4]).replace(/\r?\n|\r/g, '');
                    var rtemp = ('' + lines[line + 5]).replace(/\r?\n|\r/g, '');
                    questions[arrNum].question = qtemp;
                    questions[arrNum].option1 = temp1;
                    questions[arrNum].option2 = temp2;
                    questions[arrNum].option3 = temp3;
                    questions[arrNum].option4 = temp4;
                    questions[arrNum].answer = rtemp;
                    imageQuestionCount++;
                    arrNum++;
                } else if (lines[line].substring(0, 5) == 'audio') {
                    var qtemp = ('' + lines[line]).replace(/\r?\n|\r/g, '');
                    var temp1 = ('' + lines[line + 1]).replace(/\r?\n|\r/g, '');
                    var temp2 = ('' + lines[line + 2]).replace(/\r?\n|\r/g, '');
                    var temp3 = ('' + lines[line + 3]).replace(/\r?\n|\r/g, '');
                    var temp4 = ('' + lines[line + 4]).replace(/\r?\n|\r/g, '');
                    var rtemp = ('' + lines[line + 5]).replace(/\r?\n|\r/g, '');
                    questions.push({
                        question: qtemp,
                        option1: temp1,
                        option2: temp2,
                        option3: temp3,
                        option4: temp4,
                        answer: rtemp
                    })
                    imageQuestionCount++;
                    arrNum++;
                }
            }
        }
        console.log(questions);
        sessionStorage.setItem("questions", JSON.stringify(questions));
        console.log(sessionStorage.getItem("questions"));
    }
}


