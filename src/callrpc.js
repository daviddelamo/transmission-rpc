var http = require('http')
const querystring = require('querystring');

class CallRPC {
  var user;
  var password;
  var ip;
  var port;
  constructor(props) {
    super(props);
    this.state = {activeTab: null};
    this.user =
  }


  chrome.storage.local.get(null, (res) => {
    if (res.ip) {
      ip = res.ip;
    }
    if (res.password) {
      password = res.password;
    }
    if (res.user) {
      user = res.user;
    }
    if (res.port) {
      port = res.port;
    }
  });

  var authorization = 'Basic '+new Buffer(user + ":" + password).toString("base64");

  var headers = {
      'User-Agent':       'Super Agent/0.0.1',
      'Content-Type':     'application/json-rpc',
      'Accept':'application/json-rpc'
  }

  var torrent_get=querystring.stringify({
     "arguments": {
         "fields": [ "id", "name", "totalSize" ],
         "ids": [ 7, 10 ]
     },
     "method": "torrent-get",
     "tag": 39693
  });

  var options = {
      protocol: "http:",
      host: ip,
      port: port,
      path: "/transmission/rpc",
      method: 'POST',
      headers: headers
  }

  getTorrents(element){
    var promise = new Promise(
      function (resolve, reject) {
        const req = http.request(options, (res) => {
          console.log(`STATUS: ${res.statusCode}`);
          console.log(`HEADERS: ${JSON.stringify(res.headers)}`);
          if (res.statusCode == 409){
            var xTransmissionSessionId = res.headers.get('x-transmission-session-id');
            headers.put('x-transmission-session-id',xTransmissionSessionId);
            return getTorrents();
          }
          res.setEncoding('utf8');
          res.on('data', (chunk) => {
            console.log(`BODY: ${chunk}`);
            resolve(chunk);
          });
          res.on('end', () => {
            console.log('No more data in response.');
          });
        });

        req.on('error', (e) => {
          console.log(`problem with request: ${e.message}`);
          reject(`problem with request: ${e.message}`);
        });

        req.write(torrent_get);
        req.end();
      });

      return promise;
  }
}
