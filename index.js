const server = require('./server');
const router = require('./router');
const requestHandlers = require('./requestHandlers');

//handles routes for page
var handle = {};
handle['/'] = requestHandlers.start;
handle['/start'] = requestHandlers.start;
handle['/load'] = requestHandlers.load;
handle['/show'] = requestHandlers.show;




server.startServer(router.route, handle); 