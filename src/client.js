var socket = io.connect('http://localhost:3000');
socket.emit('msgToServer', 'fsfsf')

socket.on('msgToClient', (message) => {
    console.log(message)
})

function loginchangecont(){
    document.getElementsByClassName('login-container')[0].style.display='block'
    document.getElementsByClassName('registr-container')[0].style.display='none'
}

function registrchangecont(){
    document.getElementsByClassName('login-container')[0].style.display='none'
    document.getElementsByClassName('registr-container')[0].style.display='block'
}