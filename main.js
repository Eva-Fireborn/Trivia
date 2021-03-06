$(document).ready(function() {
    /*variabler som används */
    let totalPoints = 0;
    let isPaused = false;
    let currentGame= [{"category":"Vehicles","type":"boolean","difficulty":"easy","question":"In 1993 Swedish car manufacturer Saab experimented with replacing the steering wheel with a joystick in a Saab 9000.","correct_answer":"True","incorrect_answers":["False"]},{"category":"Entertainment: Video Games","type":"boolean","difficulty":"easy","question":"The main character in the &quot;Half-Life&quot; franchise is named Morgan Freeman.","correct_answer":"False","incorrect_answers":["True"]},{"category":"History","type":"boolean","difficulty":"easy","question":"The Tiananmen Square protests of 1989 were held in Hong Kong.","correct_answer":"False","incorrect_answers":["True"]},{"category":"Geography","type":"boolean","difficulty":"easy","question":"Alaska is the largest state in the United States.","correct_answer":"True","incorrect_answers":["False"]},{"category":"Entertainment: Video Games","type":"boolean","difficulty":"easy","question":"Tetris is the #1 best-selling video game of all-time.","correct_answer":"True","incorrect_answers":["False"]},{"category":"Geography","type":"boolean","difficulty":"easy","question":"Toronto is the capital city of the North American country of Canada.","correct_answer":"False","incorrect_answers":["True"]},{"category":"Animals","type":"boolean","difficulty":"easy","question":"Rabbits are rodents.","correct_answer":"False","incorrect_answers":["True"]},{"category":"Entertainment: Film","type":"boolean","difficulty":"easy","question":"In the original Star Wars trilogy, Alec Guinness provided the voice for Darth Vader.","correct_answer":"False","incorrect_answers":["True"]},{"category":"History","type":"boolean","difficulty":"easy","question":"In World War ll, Great Britian used inflatable tanks on the ports of Great Britain to divert Hitler away from Normandy\/D-day landing.","correct_answer":"True","incorrect_answers":["False"]},{"category":"Sports","type":"boolean","difficulty":"easy","question":"In Rugby League, performing a &quot;40-20&quot; is punished by a free kick for the opposing team.","correct_answer":"False","incorrect_answers":["True"]}];
    let todayPoints = localStorage.getItem('todayPoints');
    let username = localStorage.getItem('username');
    let questionIndex = localStorage.getItem('questionIndex');
    const apiKey = 'KDw4u';
    const url = 'https://www.forverkliga.se/JavaScript/api/crud.php';
    let userId = localStorage.getItem('userId');
    let userList = [];

    //VAD SOM SKA LÄSAS IN NÄR MAN STARTAR IGÅNG SPELET
    /*Kollar om en total poäng finns sparat i local storage */
    let temporary = localStorage.getItem('totalPoints');
    if (temporary !== null) {
        totalPoints = temporary;
        $('#allTimePoints').html(totalPoints);
    } else {
        totalPoints = 0;
    };

    /*Kollar om de finns ett sparat användarnamn */
    if (username !== null){
        $('.content').css('display', 'none');
        $('.background').css('display', 'none');
        isPaused = true;
        changeFunText();
        viewHighscore();
        if(questionIndex == -1){
            $('.newGame').show();
        } else {
            let temp = localStorage.getItem('currentGame');
            currentGame = JSON.parse(temp);
            $('.newGame').hide();
            $('.trivia').show();
            $('#cathegory').html(currentGame[questionIndex].category);
            $('#question').html(currentGame[questionIndex].question);
            changeBackground();
            $('#todayPoints').html(todayPoints);
            $('#allTimePoints').html(totalPoints);
        }
    } else {
        $('.content').css('display', 'block');
        $('.background').css('display', 'block');
        isPaused = false;
        todayPoints = 0;
        $('#optionMeny').hide();
    }
    //ALLA KNAPPARS PROGRAMMERING

    //MENYKNAPPAR
    $('#changeUserName').click(event => {
        $('.content').css('display', 'block');
        $('.background').css('display', 'block');
        isPaused = false;
        $('#optionContent').hide();
        $('#optionMeny').hide();
      });

      $('#optionMeny').click(event =>{
        $('#optionContent').toggle();
      });

      $('#removeUserName').click(event =>{
        deleteUser();
        $('#optionContent').hide();
        $('#optionMeny').hide();
      });

      //KNAPP FÖR FÖRSTA SIDAN
    /*Sparar användarnamn om man inte har ett, man måste dock ha skrivit in någonting i rutan */
    $('#nextPage').click(event => {
        let value = String($('#nameInput').val());
      if (value === ""){
        $('.warningSpan').text('Warning, you may not proceed without a username!');
      }else  if(userId === null){
        checkIfUserNameExists(value, 8);
      }else{
        checkIfUserNameExists2(value, 8);
      };
    });

    //KNAPPAR FÖR NYTT SPEL
      //Programmering för new Game button+start over button
      $('#newGameButton').click(function(event) {
        newGameFunction();
    });

    $('#startOver').click(function(event) {
        $('#congratsDiv').hide();
        newGameFunction();
        isPaused = true;
    })

  //Programmeringen för knapparna true+false, kollar av svaret och ger poäng
  $('#trueButton').click(function(event) {
    if (currentGame[questionIndex].correct_answer === 'True') {
        $('.trivia').hide();
        $('#correct').show();
        $('#wrong').hide();
        todayPoints++;
        totalPoints++;
        localStorage.setItem('todayPoints', todayPoints);
        $('#todayPoints').html(todayPoints);
        localStorage.setItem('totalPoints', totalPoints);
        $('#allTimePoints').html(totalPoints);
        updatePoints();
        viewHighscore();
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
        todayPoints++;
        totalPoints++;
        localStorage.setItem('todayPoints', todayPoints);
        $('#todayPoints').html(todayPoints);
        localStorage.setItem('totalPoints', totalPoints);
        $('#allTimePoints').html(totalPoints);
        updatePoints();
        viewHighscore();
    } else {
        $('.trivia').hide();
        $('#correct').hide();
        $('#wrong').show();
    }
});
    /* Vad som händer när man trycker på NEXT knappen efter du svarat på en fråga */
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


    //ALLA FUNKTIONER FÖR SPELET
    //Kalla på en ny omgång med API:et
    function newGameFunction() {
        const url = 'https://opentdb.com/api.php?amount=10';
		const settings = {
			method: 'GET',
			data: {
                type: 'boolean'
			},
		}
		$.ajax(url, settings)
		.done(function(response) {
            if (response.response_code === 0) {
            $('.newGame').hide();
            $('.trivia').show();
            changeBackground();
            changeFunText();
            todayPoints = 0;
            localStorage.setItem('todayPoints', todayPoints);
            $('#todayPoints').html(todayPoints);
            currentGame = response.results;
            localStorage.setItem('currentGame', JSON.stringify(response.results));
            $('#startWarning').html('Start a new game?');
            nextQuestion();
            } else {
                $('#startWarning').html('Oops! Try again!');
            }
        })
		.fail(function(response) {
            console.log(`Something failed. Message: ${response}.`);
        })
    };

    //API code TO SEND THE USER NAME AND SCORE TO API, RECURSIVE FUNCTION TO FIX FAILS
    function getUserId (numberOfTries = 8) {
        if (numberOfTries < 1 ) {
            console.log(`We tried 8 times and did get fail anyways.`);
            return;
        }
        const settings = {
            method: 'GET',
            data: {
                op: 'insert',
                key: apiKey,
                title: username,
                author: totalPoints,
                please:""
            }
        }
        $.ajax(url, settings)
        .done (response => whenResponseIsIn(response, numberOfTries))
    };
    function whenResponseIsIn(response, numberOfTries) {
        const obj = JSON.parse(response);
        if (obj.status === 'success') {
            //then the next function to write out name and score is on
            userId = obj.id;
            localStorage.setItem('userId', userId);
        } else {
            getUserId(numberOfTries - 1);
        }
    };

    //API code to get the data of user and score from the api
    function viewHighscore (numberOfTries = 8) {
        if (numberOfTries < 1 ) {
            console.log(`We tried 8 times and did get fail anyways.`);
            return;
        }
        const settings = {
            method: 'GET',
            data: {
                op: 'select',
                key: apiKey,
                please:""
            }
        }
        $.ajax(url, settings)
        .done (response => whenResponseIsIn2(response, numberOfTries))
    };
    function whenResponseIsIn2(response, numberOfTries) {
        const obj = JSON.parse(response);
        if (obj.status === 'success') {
            userList = [];
            obj.data.forEach(function(user) {
                userList.push({userName: user.title, score: Number(user.author)});
            });
            let sortByProperty = function(prop) {
                return function(a,b) {
                    if (typeof a[prop] == 'number') {
                        return (b[prop] - a[prop]);
                    } else {
                        return ((b[prop] < a[prop]) ? -1 : ((b[prop] > a[prop]) ? 1 : 0));
                    }
                };
            };
            let highscore = userList.sort(sortByProperty('score'));
            //write out the name and score to the score board
            $('#winnerName').html(highscore[0].userName);
            $('#winnerScore').html(highscore[0].score);
            $('#secondName').html(highscore[1].userName);
            $('#secondScore').html(highscore[1].score);
            $('#thirdName').html(highscore[2].userName);
            $('#thirdScore').html(highscore[2].score);
            for (let i=0; i <highscore.length; i++) {
                if (highscore[i].userName === username) {
                    $('#userPlace').html(i +1);
                }
            };
        } else {
           viewHighscore(numberOfTries - 1);
        }
    };

    //Function remove user.
    function deleteUser(numberOfTries=8){
      if (numberOfTries < 1 ) {
          console.log(`We tried 8 times and did get fail anyways.`);
          return;
      }
      const settings = {
          method: 'GET',
          data: {
              op: 'delete',
              key: apiKey,
              id: userId,
              please: ""
          }
      }
      $.ajax(url, settings)
      .done (response => whenResponseIsIn4(response, numberOfTries))
  };
  function whenResponseIsIn4(response, numberOfTries) {
      let obj = JSON.parse(response);
      if (obj.status === 'success') {
          localStorage.removeItem('userId');
          localStorage.removeItem('username');
          localStorage.removeItem('totalPoints');
          localStorage.removeItem('currentGame');
          localStorage.removeItem('questionIndex');
          localStorage.removeItem('todayPoints');
          totalPoints = 0;
          questionIndex = -1;
          $('#allTimePoints').html(totalPoints);
          username = localStorage.getItem('username');
          userId = localStorage.getItem('userId');
          $('.content').css('display', 'block');
          $('.background').css('display', 'block');
          isPaused=false;
      } else {
          deleteUser(numberOfTries - 1);
      }
  };

    //to UPDATE points
    function updatePoints (numberOfTries = 8) {
        if (numberOfTries < 1 ) {
            console.log(`We tried 8 times and did get fail anyways.`);
            return;
        }
        const settings = {
            method: 'GET',
            data: {
                op: 'update',
                key: apiKey,
                id: userId,
                title: username,
                author: totalPoints,
                please:""
            }
        }
        $.ajax(url, settings)
        .done (response => whenResponseIsIn3(response, numberOfTries))
    };
    function whenResponseIsIn3(response, numberOfTries) {
        const obj = JSON.parse(response);
        if (obj.status === 'success') {
            changeFunText();
        } else {
            updatePoints(numberOfTries - 1);
        }
    };

    //Kollar om användarnamnet är upptaget för ny användare
    function checkIfUserNameExists (name, numberOfTries = 8) {
        if (numberOfTries < 1 ) {
            console.log(`We tried 8 times and did get fail anyways.`);
            return;
        }
        const settings = {
            method: 'GET',
            data: {
                op: 'select',
                key: apiKey,
                please:""
            }
        }
        $.ajax(url, settings)
        .done (response => whenResponseIsIncheckIfUserNameExists(response, name, numberOfTries))
    };
    function whenResponseIsIncheckIfUserNameExists(response, name, numberOfTries) {
        const obj = JSON.parse(response);
        let doesUsernameExists=false;
        if (obj.status === 'success') {
            for (let i=0; i <obj.data.length; i++) {
                if (obj.data[i].title === name) {
                    $('.warningSpan').text('Username is taken, try another!');
                    doesUsernameExists = true;
                   break;
                }
            };
            if(!doesUsernameExists){
                localStorage.setItem('username', name);
                username = name;
                $('.content').css('display', 'none');
                $('.background').css('display', 'none');
                $('.newGame').show();
                $('.trivia').hide();
                $('#correct').hide();
                $('#wrong').hide();
                $('#congratsDiv').hide();
                isPaused=true;
                changeFunText();
                $('.warningSpan').text('Warning!');
                getUserId();
                viewHighscore();
                $('#nameInput').val("");
                $('#optionMeny').show();
                totalPoints = 0;
                todayPoints = 0;
                $('#todayPoints').html(todayPoints)
                $('#allTimePoints').html(todayPoints)
                questionIndex = -1;
                currentGame = [];
            }
        } else {
            checkIfUserNameExists(name, numberOfTries - 1);
        }
    };
 //Kollar om användarnamnet är upptaget för användare som vill byta namn
 function checkIfUserNameExists2 (name, numberOfTries = 8) {
    if (numberOfTries < 1 ) {
        console.log(`We tried 8 times and did get fail anyways.`);
        return;
    }
    const settings = {
        method: 'GET',
        data: {
            op: 'select',
            key: apiKey,
            please:""
        }
    }
    $.ajax(url, settings)
    .done (response => whenResponseIsIncheckIfUserNameExists2(response, name, numberOfTries))
};
function whenResponseIsIncheckIfUserNameExists2(response, name, numberOfTries) {
    const obj = JSON.parse(response);
    let doesUsernameExists=false;
    if (obj.status === 'success') {
        for (let i=0; i <obj.data.length; i++) {
            if (obj.data[i].title === name) {
                $('.warningSpan').text('Username is taken, try another!');
                doesUsernameExists = true;
               break;
            }
        };
        if(!doesUsernameExists){
            localStorage.setItem('username', name);
            username = name;
            updatePoints()
            $('.content').css('display', 'none');
            $('.background').css('display', 'none');
            isPaused=true;
            changeFunText();
            viewHighscore();
            $('.warningSpan').text('Warning!');
            $('#nameInput').val("");
            $('#optionMeny').show();
        }
    } else {
        checkIfUserNameExists2(name, numberOfTries - 1);
    }
};
     //function changeFunText som ger meddelande till användaren
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

    function nextQuestion(){
      //When user press next, next question will appear.
      
      if(questionIndex <= 8){
        questionIndex++;
        localStorage.setItem('questionIndex', questionIndex);
        $('#cathegory').html(currentGame[questionIndex].category);
        $('#question').html(currentGame[questionIndex].question);
      }else{
          questionIndex = -1;
          localStorage.setItem('questionIndex', questionIndex);
          updatePoints();
          $('#congratsDiv').show();
          $('.newGame').css('display', 'none');
          $('.trivia').css('display', 'none');
          $('#correct').css('display', 'none');
          $('#wrong').css('display', 'none');
          viewHighscore();
          isPaused = false;
      }

    }; //functon nextQuestion ends here.

    /*Lägger ny bakgrundsfärg på frågediv */
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


    //TILLHÖR ANIMATIONEN
  const rhombus = '<svg viewBox="0 0 13 14"><path class="rhombus" d="M5.9,1.2L0.7,6.5C0.5,6.7,0.5,7,0.7,7.2l5.2,5.4c0.2,0.2,0.5,0.2,0.7,0l5.2-5.4 C12,7,12,6.7,11.8,6.5L6.6,1.2C6.4,0.9,6.1,0.9,5.9,1.2L5.9,1.2z M3.4,6.5L6,3.9c0.2-0.2,0.5-0.2,0.7,0l2.6,2.6 c0.2,0.2,0.2,0.5,0,0.7L6.6,9.9c-0.2,0.2-0.5,0.2-0.7,0L3.4,7.3C3.2,7.1,3.2,6.8,3.4,6.5L3.4,6.5z" /></svg>'
  const pentahedron = '<svg viewBox="0 0 561.8 559.4"><path class="pentahedron" d="M383.4,559.4h-204l-2.6-0.2c-51.3-4.4-94-37-108.8-83l-0.2-0.6L6,276.7l-0.2-0.5c-14.5-50,3.1-102.7,43.7-131.4 L212.1,23C252.4-7.9,310.7-7.9,351,23l163.5,122.5l0.4,0.3c39,30.3,56,82.6,42.2,130.3l-0.3,1.1l-61.5,198 C480.4,525.6,435.5,559.4,383.4,559.4z M185.5,439.4h195.2l61.1-196.8c0-0.5-0.3-1.6-0.7-2.1L281.5,120.9L120.9,241.2 c0,0.3,0.1,0.7,0.2,1.2l60.8,195.8C182.5,438.5,183.7,439.1,185.5,439.4z M441,240.3L441,240.3L441,240.3z"/></svg>'
  const x = '<svg viewBox="0 0 12 12"> <path class="x" d="M10.3,4.3H7.7V1.7C7.7,0.8,7,0,6,0S4.3,0.8,4.3,1.7v2.5H1.7C0.8,4.3,0,5,0,6s0.8,1.7,1.7,1.7h2.5v2.5 C4.3,11.2,5,12,6,12s1.7-0.8,1.7-1.7V7.7h2.5C11.2,7.7,12,7,12,6S11.2,4.3,10.3,4.3z"/></svg>'
  const circle = '<svg x="0px" y="0px" viewBox="0 0 13 12"> <path class="circle" d="M6.5,0.1C3.4,0.1,0.8,2.8,0.8,6s2.6,5.9,5.7,5.9s5.7-2.7,5.7-5.9S9.7,0.1,6.5,0.1L6.5,0.1z M6.5,8.8 C5,8.8,3.8,7.6,3.8,6S5,3.2,6.5,3.2S9.2,4.4,9.2,6S8,8.8,6.5,8.8L6.5,8.8z"/> </svg>'
  const point = '<svg viewBox="0 0 12 12"> <path class="point" d="M6,7.5L6,7.5C5.1,7.5,4.5,6.9,4.5,6v0c0-0.9,0.7-1.5,1.5-1.5h0c0.9,0,1.5,0.7,1.5,1.5v0C7.5,6.9,6.9,7.5,6,7.5z "/> </svg>'
  function randomInt(min,max){
      return Math.floor(Math.random()*(max-min+1)+min);
  }
  const data = [point, rhombus, pentahedron, circle, x]
  let particles = []
  setInterval(function(){
    if (!isPaused){
      particles.push(
        new Particle(data[randomInt(0,data.length-1)], {
         "x": (Math.random() * $(window).width()),
         "y": $(window).height()
        }, (1 + Math.random() * 3) )
      )
    }
  }, 200)
  function update(){
    particles = particles.filter(function(p){
      return p.move()
    })
    requestAnimationFrame(update.bind(this));
  }
  update();
}); //When ready function

class Particle{

    constructor(svg, coordinates, friction){
      this.svg = svg
      this.steps = ($(window).height())/2
      this.item = null
      this.friction = friction
      this.coordinates = coordinates
      this.position = this.coordinates.y
      this.dimensions = this.render()
      this.rotation = Math.random() > 0.5 ? "-" : "+"
      this.scale = 0.5 + Math.random()
      this.siner = 200 * Math.random()
    }
    destroy(){
      this.item.remove()
    }
    move(){
      this.position = this.position - this.friction
      let top = this.position;
      let left = this.coordinates.x + Math.sin(this.position*Math.PI/this.steps) * this.siner;
      this.item.css({
        transform: "translateX("+left+"px) translateY("+top+"px) scale(" + this.scale + ") rotate("+(this.rotation)+(this.position + this.dimensions.height)+"deg)"
      })
      if(this.position < -(this.dimensions.height)){
        this.destroy()
        return false
      }else{
        return true
      }
    }
    render(){
      this.item = $(this.svg, {
        css: {
          transform: "translateX("+this.coordinates.x+"px) translateY("+this.coordinates.y+"px)"
        }
      })
      $("body").append(this.item)
      return {
        width: this.item.width(),
        height: this.item.height()
      }
    }
}
