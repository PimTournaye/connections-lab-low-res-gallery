const socket = io();

// console.log(socket)

socket.on('connect', () => {
    console.log('Client side connected');
    console.log(socket.id);
    let clientStartID = socket.id;

    const form = document.querySelector('form');
    // let goBttn = document.getElementById('btn');

    form.addEventListener('submit', (event) => {
        event.preventDefault(); // prevent the page from reloading
        //   socket.emit('test', 'test')

        const data = new FormData(form);

        const color = data.get('color')
        const username = data.get('username');

        let persona = {
            "id": clientStartID,
            "color": color,
            "username": username
        }

        // socket.emit('data', persona);

        // saving to local storage code from ChatGPT
        localStorage.setItem('data', JSON.stringify(persona));

        window.location.href = '/public/main';
    })

})