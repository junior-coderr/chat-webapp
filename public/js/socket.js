const socket = io({
    reconnectionDelay: 3000
});
console.log('socket connected');

// socket.on('ping', function(data) {
// console.log(data);
// });





// socket.on("connect", () => {
//     if (socket.recovered) {
//       // any event missed during the disconnection period will be received now
//     } else {
//       // new or unrecoverable session
//     }
//   });

function socketfun(){
    socket.io.engine.close();
}

// socket.on("connect", () => {
//     if (socket.recovered) {
//       // any event missed during the disconnection period will be received now
//     } else {
//       // new or unrecoverable session
//     }
//   });

// function disconnect(){
//     socket.disconnect();
//     console.log('disconnected');
// }