/**
 * Created by CC on 2017/6/13.
 */

const koa = require('koa');
const app = new koa();
const router = require('koa-router');
const cors = require('koa-cors'); // koa跨域
const server = require('http').createServer(app.callback());
const io = require('socket.io')(server);
const port = process.env.PORT || 1932;
const route = new router();

route.get('/', (ctx,next) => {
    // console.log(ctx)
    ctx.body = '{"a":1}'
})

app.use(cors());
app.use(route.routes()).use(route.allowedMethods())

server.listen(port,function(){
    console.log('Server listening at port %d', port);
});


var numUsers = 0;

io.on('connection', function (socket) {
    var addedUser = false;

    // when the client emits 'new message', this listens and executes
    socket.on('sendGroupMsg', function (data) {
        // we tell the client to execute 'new message'
        socket.broadcast.emit('receiveGroupMsg', {
            username: socket.username,
            message: data
        });
    });

    // when the client emits 'add user', this listens and executes
    socket.on('addUser', function (username) {

        //if (addedUser) return;

        // we store the username in the socket session for this client
        socket.username = username;
        ++numUsers;
        addedUser = true;
        socket.emit('login', {
            username:username,
            numUsers: numUsers
        });
        // echo globally (all clients) that a person has connected
        socket.broadcast.emit('userJoined', {
            username: socket.username,
            numUsers: numUsers
        });
    });

    // when the client emits 'typing', we broadcast it to others
    socket.on('typing', function () {
        socket.broadcast.emit('typing', {
            username: socket.username
        });
    });

    // when the client emits 'stop typing', we broadcast it to others
    socket.on('stopTyping', function () {
        socket.broadcast.emit('stopTyping', {
            username: socket.username
        });
    });

    // when the user disconnects.. perform this
    socket.on('disconnect', function () {
        if (addedUser) {
            --numUsers;

            // echo globally that this client has left
            socket.broadcast.emit('user left', {
                username: socket.username,
                numUsers: numUsers
            });
        }
    });
});
