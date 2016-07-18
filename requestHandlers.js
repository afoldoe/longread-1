exports = module.exports;
const exec = require('child_process').exec;
const querystring = require('querystring');
const fs = require('fs');
const formidable = require('formidable');

function start(res, postData) {
  console.log('req handler start called');
  let body = `<html>
  <head>
  <meta http-equiv='Content-Type' content='text/html'
  'charset=UTF-8' />
  </head>
  <body>
  <form action='/load' enctype='multipart/form-data' method='post'>
  <input type='file' name='load'>
  <input type='submit' value='Upload File' />
  </form>
  </body>
  </html>`;

  res.writeHead(200, {'Content-Type': 'text/html'});
  res.write(body);
  res.end();
};

function load(res, req) {  
  console.log(`Req handler load was called`);
  let form = new formidable.IncomingForm();
  console.log(`Parsing of form start`);
  form.parse(req, (err, fields, files) => {
    console.log(`Parsing of form complete`);
    fs.rename(files.upload.path, `/tmp/test.png`, err => {
      if(err) {
        fs.unlink(`/tmp.test.png`);
        fs.rename(files.upload.path, `/tmp/test.png`);
      }
    });
  });
  res.writeHead(200, {'Content-Type': 'text/html'});
  res.write(`Received image: <br/>`);
  res.write(`<img src='/show' />`);
  res.end();
};

function show(res) {
  console.log(`Request handler show was called`);
  res.writeHead(200, {'Content-Type': 'image/png'});
  fs.createReadStream('/tmp/test.png').pipe(res);
};


exports.show = show;
exports.start = start;
exports.load = load;