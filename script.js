const messageContainer = document.querySelector('#message-container')
const messageForm = document.querySelector('#send-container')
const messageInput = document.querySelector('#message-input')

const socket = io("http://localhost:3000")
socket.on("chat-message", data=>{
    appendMessage(`${data.user} : ${data.message}`)
})

const userName = prompt('Please enter your name.')

if(userName){
    appendMessage(`You have joined (user: ${userName})`)
    socket.emit('user-joined', {name: userName})
}

socket.on('new-user-joined', user=>{
    appendMessage(`${user.name} joined the chat`)
})

messageForm.addEventListener('submit', (e)=>{
    e.preventDefault()
    const message = messageInput.value
    if(message.trim().length!==0){
        socket.emit('send-chat-message', {user: userName, message})
        appendMessage(`you : ${message}`)
    } 
    messageInput.value = ''
})

function appendMessage(data){
    const messageElement = document.createElement('div')
    messageElement.style.padding = '10px'
    messageElement.innerText = data
    messageContainer.append(messageElement)
}