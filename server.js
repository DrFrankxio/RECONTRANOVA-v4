const express = require('express')
const app = express();
const server = require('http').createServer(app);
const io = require('socket.io')(server);

app.get('/', (req, res) => {
  res.sendFile(__dirname + '/public/index.html')
})
app.use(express.static('public'));

io.on('connection', (socket) => {
  console.log('nuevo cliente conectado');

  // enviar mensaje a todos los clientes conectados
  io.emit('msg',{content:"Nuevo cliente conectado."});

  // cuando el cliente se desconecta
  socket.on('p2p', (e) => {
    io.emit('msg',{content:e.content});
  });

  // cuando el cliente se desconecta
  socket.on('disconnect', () => {
    console.log('Cliente desconectado.');
  });
});

server.listen(8080, () => {
  console.log('servidor escuchando en el puerto 8080');
});