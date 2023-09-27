const socket = io("http://localhost:3000")
socket.on("chat-message", data=>{
    // console.log(data)
    appendMessage(data)
})

const messageContainer = document.querySelector('#message-container')
const messageForm = document.querySelector('#send-container')
const messageInput = document.querySelector('#message-input')
messageForm.addEventListener('submit', (e)=>{
    e.preventDefault()
    const message = messageInput.value
    if(message.trim().length!==0){
        socket.emit('send-chat-message', message)
    } 
    messageInput.value = ''
})

function appendMessage(data){
    const messageElement = document.createElement('div')
    messageElement.style.padding = '10px'
    messageElement.innerText = data
    messageContainer.append(messageElement)
}