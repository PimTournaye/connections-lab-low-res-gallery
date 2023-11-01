const socket = io();

// console.log(socket)

// getting elements
let form = document.getElementById('form');
let chatInput = document.getElementById('chat-input');
let messagesSec = document.getElementById('messages-section');

// global variables
// let username;
// let color;

window.addEventListener('load', () => {

    // when client connects
    socket.on('connect', () => {
        console.log("client is connected!");

        let personaColor;
        let personaUsername;

        // getting from local storage code from ChatGPT
        let personaString = localStorage.getItem('data');
        if (personaString) {
            let persona = JSON.parse(personaString);
            console.log(persona);

            // doing things with data (not ChatGPT)
            personaColor = persona.color;
            personaUsername = persona.username;

        } else {
            console.log('Data not found.');
        }

        // input from chat input
        form.addEventListener('submit', (e) => {
            e.preventDefault();
            let message = chatInput.value;

            let mssgInfo = {
                "username": personaUsername,
                "color": personaColor,
                "message": message
            }

            // if(serverID === clientID){
            //     console.log("true");
            if (message) {
                socket.emit('message', mssgInfo);
                message = '';
            };
            // }

        })

    });

    // // listening for persona data
    // socket.on('data', (data) => {
    //     console.log(data);
    //     // let clientID = socket.id;
    //     let username = data.username;
    //     let color = data.color;
    //     // let serverID = persona.id;
    // })

    // show all messages in chat room
    socket.on('message', (mssgInfo) => {
        console.log(mssgInfo);
        let mssgText = document.createElement('p');
        mssgText.innerHTML = mssgInfo.username + ': <span>' + mssgInfo.message + '</span>';
        mssgText.style.color = mssgInfo.color;

        // let mssgText = document.createElement('p');
        // mssgText.innerHTML = mssgInfo.username + ': ' + mssgInfo.message;
        // mssgText.style.color = mssgInfo.color;

        messagesSec.appendChild(mssgText);
        // scroll to the new mssg added at the bottom of the chat
        window.scrollTo(0, document.body.scrollHeight);
    })
})
