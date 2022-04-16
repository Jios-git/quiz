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

document.getElementById('file').onchange = function () {

    var file = this.files[0]

    var reader = new FileReader()
    reader.onload = function (progressEvent) {
        // By lines
        var lines = this.result.split('\n')
        var arrNum = 0
        for (var line = 0; line < lines.length; line++) {
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
            }
        }
        console.log(questions)
        sessionStorage.setItem("questions", JSON.stringify(questions))
        console.log(sessionStorage.getItem("questions"))
    }
    reader.readAsText(file)

}


