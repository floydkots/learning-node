let socket = io();

socket.on('connect', function() {
  console.log('Connected to server');

  socket.emit('createMessage', {
    to: '@floyd',
    from: '@kots',
    text: 'Come on in!'
  });
});


socket.on('newMessage', function(message) {
  console.log('Got new message', message);
});

socket.on('disconnect', function() {
  console.log('Disconnected from server');
});

