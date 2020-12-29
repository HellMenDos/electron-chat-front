var socket = io.connect('http://localhost:3000');

let name;
let email;
let password; 
let token;
let confpass;
let mess = '';
let id = '';

/*
  Get all messsages
*/
socket.on('connections', function(messages) { 
    for (var i = 0; i < messages.length; i++) {
      mess += `<div class="message">User: ${messages[i].user.name}, ${ messages[i].message } </div>`
    }

    document.getElementsByClassName('container-with-message')[0].innerHTML = mess
    document.getElementsByClassName('container-with-message')[0].scrollTop = document.getElementsByClassName('container-with-message')[0].scrollHeight;
});

/*
  Recive messag
*/
socket.on('MessageClient', (message) => {
    id  = JSON.parse(localStorage.getItem('user')).id;
    if(message.id_user != id) {
    document.getElementsByClassName('container-with-message')[0].innerHTML = document.getElementsByClassName('container-with-message')[0].innerHTML + `<div class="message"> ${ message.message} </div>` 
  }
})


function loginchangecont(){
    document.getElementsByClassName('login-container')[0].style.display='block'
    document.getElementsByClassName('registr-container')[0].style.display='none'
}

function registrchangecont(){
    document.getElementsByClassName('login-container')[0].style.display='none'
    document.getElementsByClassName('registr-container')[0].style.display='block'
}

document.addEventListener("DOMContentLoaded", ready);

  function ready() {
    if (JSON.parse(localStorage.getItem('user')).id != undefined) {
      document.getElementsByClassName('login-container')[0].style.display='none'
      document.getElementsByClassName('text')[0].style.display='block'
    }
  }



/*
  Registr functions 
  with websockets
*/
function insertRegistr() {
  name = document.getElementById('namereg').value
  email = document.getElementById('emailreg').value
  password = document.getElementById('passreg').value
  confpass = document.getElementById('confpassreg').value
  token = Math.random().toString(36).substr(2);

  if (password ==confpass) {
  socket.emit('registr', {name,email,password,token})

  socket.on(token, (message) => {
    console.log(message.name)
    if (message.error != undefined) {
      document.getElementsByClassName('reg-alert')[0].style.display='block'
      document.getElementsByClassName('reg-alert')[0].innerText = message.error
    }else {
      localStorage.setItem("user",JSON.stringify(message))
      document.getElementsByClassName('registr-container')[0].style.display='none'
      document.getElementsByClassName('text')[0].style.display='block'
    }
  })
  }else {
    document.getElementsByClassName('reg-alert')[0].style.display='block'
    document.getElementsByClassName('reg-alert')[0].innerText = 'Passwords are not the same'
  }
}


/*
  login functions 
  with websockets
*/
function insertLogin() {
  email = document.getElementById('emailLogin').value
  password = document.getElementById('passwordLogin').value
  token = Math.random().toString(36).substr(2);

  socket.emit('login', {email,password,token})

  socket.on(token, (message) => {
    if (message.error != undefined) {
      document.getElementsByClassName('login-alert')[0].style.display='block'
      document.getElementsByClassName('login-alert')[0].innerText = message.error
    }else {
      localStorage.setItem("user",JSON.stringify(message))
      document.getElementsByClassName('login-container')[0].style.display='none'
      document.getElementsByClassName('text')[0].style.display='block'
    }
  })

}


function exit() {
  localStorage.removeItem('user')
  document.getElementsByClassName('login-container')[0].style.display='block'
  document.getElementsByClassName('text')[0].style.display='none'
}


/*
  Send message to server
*/
function send() { 
  message = document.getElementById('textarea').value
  id  = JSON.parse(localStorage.getItem('user')).id;
  name  = JSON.parse(localStorage.getItem('user')).name;

  socket.emit('message', {id_user:id,message:message})
  document.getElementsByClassName('container-with-message')[0].innerHTML = document.getElementsByClassName('container-with-message')[0].innerHTML + `<div class="message">User:${name}, ${ message } </div>`
  document.getElementsByClassName('container-with-message')[0].scrollTop = document.getElementsByClassName('container-with-message')[0].scrollHeight;

}


