$(document).ready(function() {

    $('#newGameButton').on('click', event => {
        $('.newGame').css('display', 'none');
        $('.trivia').css('display', 'block');
        nextQuestion();
        changeBackground();
        changeFunText();
        todayPoints = 0;
    });

    $('#trueButton').click(function(event) {

        if (currentGame[questionIndex].correct_answer === 'True') {
            $('.trivia').hide();
            $('#correct').show();
            $('#wrong').hide();
            todayPoints++ ;
            totalPoints++ ;
            $('#todayPoints').html(todayPoints);
            localStorage.setItem('totalPoints', totalPoints);
            $('#allTimePoints').html(totalPoints);
        } else {
            $('.trivia').hide();
            $('#correct').hide();
            $('#wrong').show();
        }
    });
    $('#falseButton').click(function(event) {

        if (currentGame[questionIndex].correct_answer === 'False') {
            $('.trivia').hide();
            $('#correct').show();
            $('#wrong').hide();
            todayPoints++ ;
            totalPoints++ ;
            $('#todayPoints').html(todayPoints);
            localStorage.setItem('totalPoints', totalPoints);
            $('#allTimePoints').html(totalPoints);
        } else {
            $('.trivia').hide();
            $('#correct').hide();
            $('#wrong').show();
        }
    });

    $('#wrongNext').on('click', event => {
        $('.trivia').css('display', 'block');
        $('#wrong').css('display', 'none');
        nextQuestion();
    });
    $('#correctNext').on('click', event => {
        $('.trivia').css('display', 'block');
        $('#correct').css('display', 'none');
        nextQuestion();
    });

    let username = $('#welcomeBack');
     //function changeFunText
    function changeFunText (number=4) {
        let random=Math.ceil(Math.random() * Math.floor(number));
            switch(random){
                case 1:
                $('#welcomeBack').text(`It´s allright to cry...${username}`);
                break;
                case 2:
                $('#welcomeBack').text(`It´s not Rocket science...${username}`);
                break;
                case 3:
                $('#welcomeBack').text(`Nice to see you...${username}`);
                break;
                case 4:
                $('#welcomeBack').html(`Don´t hesitate...${username}`);
                break;
            }
        };//end fuction changeFunText.

    function userNameToHeader(){
      //get username from first page(input) to header.
      //see if user is registerd.
      //remember user.
    };

    let questionIndex = -1;
    function nextQuestion(){
      //When user press next, next question will appear.
      if(questionIndex <= 8){
        questionIndex++;
        console.log(questionIndex);
        $('#cathegory').html(currentGame[questionIndex].category);
        $('#question').html(currentGame[questionIndex].question);
        
      } else {
        console.log('hello');
            questionIndex = -1;
          $('.newGame').css('display', 'block');
          $('.trivia').css('display', 'none');
          $('#correct').css('display', 'none');
          $('#wrong').css('display', 'none');
      }

    }; //functon nextQuestion ends here.

}); //When ready function

function changeBackground (number=7) {
    let random=Math.ceil(Math.random() * Math.floor(number));
    switch(random){
        case 1:
        $('.trivia').css('background-color', '#FADBD8');
        break;
        case 2:
        $('.trivia').css('background-color', '#D4E6F1');
        break;
        case 3:
        $('.trivia').css('background-color', '#FCF3CF');
        break;
        case 4:
        $('.trivia').css('background-color', '#F6DDCC');
        break;
        case 5:
        $('.trivia').css('background-color', '#E8DAEF');
        break;
        case 6:
        $('.trivia').css('background-color', '#D5F5E3');
        break;
        case 7:
        $('.trivia').css('background-color', '#E5E8E8');
        break;
    }
};

