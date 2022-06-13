const io=require('socket.io')(8000, {
    cors: {
        origin:'*',
    }
});

const users={};

io.on('connection', socket =>{
    socket.on('new-user-joined', use =>{
        users[socket.id]=use;
        socket.join(use[1]);
        socket.broadcast.to(use[1]).emit('user-joined', use[0]);
    });

    socket.on('send', message =>{
        socket.broadcast.to(users[socket.id][1]).emit('receive', {by: users[socket.id][0], messages: message});
    });

});