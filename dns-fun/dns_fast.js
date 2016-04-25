const http = require('http');
const dnscache = require('dnscache');

dnscache({
  enable: true,
  ttl: 300,
  cachesize: 1000,
});

function req() {
  http.get('http://google.com/', () => {});
  setTimeout(req, 100);
}

req();
