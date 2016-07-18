const http = require('http');
const url = require('url');
exports = module.exports;



function startServer(route, handle) {
  http.createServer((req, res) => {
    console.log('Server running on 8000');
    let pathName = url.parse(req.url).pathname;
    route(handle, pathName, res, req);
  }).listen(8000);
};

exports.startServer = startServer;