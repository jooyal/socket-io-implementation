import { Server } from 'socket.io';

const io = new Server(3000, {
  cors:{
    origins: ["*"],
    handlePreFlightRequest: (req, res)=>{
      res.writeHead(200, {
        "Access-Control-Allow-Origin": "*"
      })
      res.end()
    }
  }
});

io.on("connection", (socket)=>{
  console.log("new connection")
  socket.emit("chat-message", "Hello world")
})

console.log('socket running at http://localhost:3000');
