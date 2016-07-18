exports = module.exports;
const exec = require('child_process').exec;
const querystring = require('querystring');
const fs = require('fs');
const formidable = require('formidable');

//start page, shoes form to upload an img
function start(res) {
  console.log('req handler start called');
  let body = `<html>
  <head>
  <meta http-equiv='Content-Type' content='text/html' charset='UTF-8' />
  </head>
  <body>
  <form action='/load' enctype='multipart/form-data' method='post'>
  <input type='file' name='load' multiple='multiple'>
  <input type='submit' value='Upload File' />
  </form>
  </body>
  </html>`;

  res.writeHead(200, {'Content-Type': 'text/html'});
  res.write(body);
  res.end();
};

//parse and loads input img from submitted form
function load(res, req) {  
  console.log(`Req handler load was called`);
  var form = new formidable.IncomingForm();
  form.parse(req, (err, fields, files) => {
    fs.rename(files.load.path, `/tmp/test.png`, err => {
      if(err) {
        fs.unlink(`/tmp.test.png`);
        fs.rename(files.load.path, `/tmp/test.png`);
      }
    });
  });
  res.writeHead(200, {'Content-Type': 'text/html'});
  res.write(`Received image: <br/>`);
  res.write(`<img src='/show' />`);
  res.end();
};

//shows uploaded image to the page
function show(res) {
  res.writeHead(200, {'Content-Type': 'image/png'});
  fs.createReadStream('/tmp/test.png').pipe(res);
};


exports.show = show;
exports.start = start;
exports.load = load;