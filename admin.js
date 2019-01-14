$(document).ready(function() {
    const apiKey = 'KDw4u';
    const url = 'https://www.forverkliga.se/JavaScript/api/crud.php';

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
                id: $('#userIdToRemove').val()
            }
        }
        $.ajax(url, settings)
        .done (response => whenResponseIsIn4(response, numberOfTries))
    };
  
    function whenResponseIsIn4(response, numberOfTries) {
        let obj = JSON.parse(response);
        if (obj.status === 'success') {
            console.log('Delete is a go!', obj);
            viewHighscore();
        } else {
            deleteUser(numberOfTries - 1);
        }
    };

    $('#removeUser').click(event => {
        deleteUser();
    });
    function viewHighscore (numberOfTries = 8) {
        if (numberOfTries < 1 ) {
            console.log(`We tried 8 times and did get fail anyways.`);
            return;
        }
        const settings = {
            method: 'GET',
            data: {
                op: 'select',
                key: apiKey
            }
        }
        $.ajax(url, settings)
        .done (response => whenResponseIsIn2(response, numberOfTries))
    };
    function whenResponseIsIn2(response, numberOfTries) {
        const obj = JSON.parse(response);
        if (obj.status === 'success') {
            $('#userList').html('<th>NUMMER</th><th>ID</th><th>NAMN</th><th>POÄNG</th>')
           console.log(obj.data); 
           for (let i=0; i < obj.data.length; i++){
                $('#userList').append(`<tr><td>${i}</td><td>${obj.data[i].id}</td> <td>${obj.data[i].title}</td><td>${obj.data[i].author}</td></tr>`);
           }
        } else {
           viewHighscore(numberOfTries - 1);
        }
    };
    $('#getUserList').click(event => {
        viewHighscore();
    })

}); //When ready function