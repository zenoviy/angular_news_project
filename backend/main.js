const { server } = require('./bootstrap');

/*      server Init main function    */
server.init();

process.on('unhandledRejection', (err) => {
    console.log(err);
    process.exit(1);
});
