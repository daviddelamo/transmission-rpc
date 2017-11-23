let user;
let password;
let ip;
let port;
let xTransmissionSessionId;

function listTorrents(){
  var xhttp = new XMLHttpRequest();
  xhttp.open("POST", "http://"+ip+":"+port+"/transmission/rpc/", true);

  var authorization = 'Basic '+btoa(user + ":" + password);
  xhttp.setRequestHeader("Content-type", "application/json-rpc");
  xhttp.setRequestHeader("Authorization", authorization);
  if (xTransmissionSessionId){
    xhttp.setRequestHeader("X-Transmission-Session-Id", xTransmissionSessionId);
  }

/**
id - identifies the torrent_get
totalSize - Total size of the download in Bytes
rateDownload - Downloaded size in Bytes
eta - Estimated time of download in seconds
uploadedEver - Size of upload in Bytes
*/

  var torrent_get=JSON.stringify({
     "arguments": {
         "fields": [ "id", "name", "totalSize", "downloadedEver", "percentDone", "eta", "uploadedEver", "uploadRatio" ],
     },
     "method": "torrent-get",
     "tag": 39693
  });

  xhttp.send(torrent_get);

  xhttp.onreadystatechange = function() {
    if (this.readyState == 4 && this.status == 200) {
      var jsonResponse = JSON.parse(this.responseText);
      buildTorrentList(jsonResponse.arguments.torrents, document.getElementById('torrent_container'));
      window.setInterval(listTorrents(), 1000);
    }else if (this.readyState == 4 && this.status == 409){
      xTransmissionSessionId = this.getResponseHeader("X-Transmission-Session-Id");
      listTorrents();
    }
  };
}

function addTorrent(url){
  var xhttp = new XMLHttpRequest();
  xhttp.open("POST", "http://"+ip+":"+port+"/transmission/rpc/", true);

  var authorization = 'Basic '+btoa(user + ":" + password);
  xhttp.setRequestHeader("Content-type", "application/json-rpc");
  xhttp.setRequestHeader("Authorization", authorization);
  if (xTransmissionSessionId){
    xhttp.setRequestHeader("X-Transmission-Session-Id", xTransmissionSessionId);
  }

/**
id - identifies the torrent_get
totalSize - Total size of the download in Bytes
rateDownload - Downloaded size in Bytes
eta - Estimated time of download in seconds
uploadedEver - Size of upload in Bytes
*/

  var torrent_add=JSON.stringify({
     "arguments": {
       "filename": url
     },
     "method": "torrent-add",
     "tag": 39693
  });

console.log("sending: "+torrent_add);

  xhttp.send(torrent_add);
  xhttp.onreadystatechange = function() {
    console.log(this.responseText);
    if (this.readyState == 4 && this.status == 409){
      xTransmissionSessionId = this.getResponseHeader("X-Transmission-Session-Id");
      addTorrent(url);
    }
  };
}


function addTorrentFile(torrent){
  var xhttp = new XMLHttpRequest();
  xhttp.open("POST", "http://"+ip+":"+port+"/transmission/rpc/", true);

  var authorization = 'Basic '+btoa(user + ":" + password);
  xhttp.setRequestHeader("Content-type", "application/json-rpc");
  xhttp.setRequestHeader("Authorization", authorization);
  if (xTransmissionSessionId){
    xhttp.setRequestHeader("X-Transmission-Session-Id", xTransmissionSessionId);
  }

/**
id - identifies the torrent_get
totalSize - Total size of the download in Bytes
rateDownload - Downloaded size in Bytes
eta - Estimated time of download in seconds
uploadedEver - Size of upload in Bytes
*/

  var torrent_add=JSON.stringify({
     "arguments": {
       "metainfo": torrent
     },
     "method": "torrent-add",
     "tag": 39693
  });

console.log("sending: "+torrent_add);

  xhttp.send(torrent_add);
  xhttp.onreadystatechange = function() {
    console.log(this.responseText);
    if (this.readyState == 4 && this.status == 409){
      xTransmissionSessionId = this.getResponseHeader("X-Transmission-Session-Id");
      addTorrentFile(torrent);
    }
  };
}



if (!ip){
  chrome.storage.local.get(["ip","port","user","password"], (res) => {
    ip = res.ip || "127.0.0.1";
    port = res.port || "9091";
    user = res.user || "admin";
    password = res.password || "";
    listTorrents();
  });

}else{
  listTorrents();
}
