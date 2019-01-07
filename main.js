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
        changeBackground();
    });
    $('#correctNext').on('click', event => {
        $('.trivia').css('display', 'block');
        $('#correct').css('display', 'none');
        nextQuestion();
        changeBackground();
    });

    let currentGame= [{"category":"Vehicles","type":"boolean","difficulty":"easy","question":"In 1993 Swedish car manufacturer Saab experimented with replacing the steering wheel with a joystick in a Saab 9000.","correct_answer":"True","incorrect_answers":["False"]},{"category":"Entertainment: Video Games","type":"boolean","difficulty":"easy","question":"The main character in the &quot;Half-Life&quot; franchise is named Morgan Freeman.","correct_answer":"False","incorrect_answers":["True"]},{"category":"History","type":"boolean","difficulty":"easy","question":"The Tiananmen Square protests of 1989 were held in Hong Kong.","correct_answer":"False","incorrect_answers":["True"]},{"category":"Geography","type":"boolean","difficulty":"easy","question":"Alaska is the largest state in the United States.","correct_answer":"True","incorrect_answers":["False"]},{"category":"Entertainment: Video Games","type":"boolean","difficulty":"easy","question":"Tetris is the #1 best-selling video game of all-time.","correct_answer":"True","incorrect_answers":["False"]},{"category":"Geography","type":"boolean","difficulty":"easy","question":"Toronto is the capital city of the North American country of Canada.","correct_answer":"False","incorrect_answers":["True"]},{"category":"Animals","type":"boolean","difficulty":"easy","question":"Rabbits are rodents.","correct_answer":"False","incorrect_answers":["True"]},{"category":"Entertainment: Film","type":"boolean","difficulty":"easy","question":"In the original Star Wars trilogy, Alec Guinness provided the voice for Darth Vader.","correct_answer":"False","incorrect_answers":["True"]},{"category":"History","type":"boolean","difficulty":"easy","question":"In World War ll, Great Britian used inflatable tanks on the ports of Great Britain to divert Hitler away from Normandy\/D-day landing.","correct_answer":"True","incorrect_answers":["False"]},{"category":"Sports","type":"boolean","difficulty":"easy","question":"In Rugby League, performing a &quot;40-20&quot; is punished by a free kick for the opposing team.","correct_answer":"False","incorrect_answers":["True"]}];
    let username = localStorage.getItem('username');

     //function changeFunText
    function changeFunText (number=4) {
        let random=Math.ceil(Math.random() * Math.floor(number));
            switch(random){
                case 1:
                $('#welcomeBack').text(`It´s alright to cry...${username}`);
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
        $('#cathegory').html(currentGame[questionIndex].category);
        $('#question').html(currentGame[questionIndex].question);
      }else{
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

