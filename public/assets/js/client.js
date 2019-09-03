var io = io();
console.log(io);

io.on('disconnect', (reason) => {
    console.log(reason);
});