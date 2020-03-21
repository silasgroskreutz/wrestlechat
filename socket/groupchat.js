module.exports = function(io) {
  io.on('connection', socket => {
    console.log('user.connected');

    socket.on('join', (params, callback) => {
      socket.join(params.room);

      callback();
    });

    socket.on('createMessage', message => {
      console.log(message);
      io.emit('newMessage', {
        text: message.text
      });
    });
  });
};
