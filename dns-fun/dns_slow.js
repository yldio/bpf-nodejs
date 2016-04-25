const http = require('http');

function req() {
  http.get('http://google.com/', () => {});
  setTimeout(req, 100);
}

req();
