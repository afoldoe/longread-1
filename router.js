exports = module.exports;
const requestHandlers = require('./requestHandlers');






function route(handle, pathName, res, req) {
  console.log('About to route a request for ' + pathName);
  if(typeof handle[pathName] === 'function') {
    handle[pathName](res, req);
  } else {
    console.log('No request handle found for ' + pathName);
    // res.writeHead(404, {'Content-Type': 'text/plain'});
    // let content = route(handle, pathName);
    // res.write(content`404 Not Found`);
    // res.end();
  }
};





exports.route = route;