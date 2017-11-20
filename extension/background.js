browser.contextMenus.create({
    id: "send-to-transmission",
    title: "Send to Transmission",
    contexts: ["link"],
});
browser.contextMenus.onClicked.addListener((info, tab) => {
    if (info.menuItemId === "send-to-transmission") {
        const url = String(info.linkUrl);
        if (url.endsWith('.torrent')){
          addTorrent(url);
        }else{
          getTorrentFile(url);
        }
    }
});

function getTorrentFile(url){
  var xhttp = new XMLHttpRequest();
  console.log(url);
  xhttp.open("GET", url, true);
  xhttp.responseType = "arraybuffer";
  xhttp.onload = function(oEvent) {
    var blob = xhttp.response;
    var byteArray = new Uint8Array(blob);
    var b64Encoded = base64js.fromByteArray(byteArray);
    addTorrentFile(b64Encoded);
  };
  xhttp.send();
  xhttp.onreadystatechange = function() {
    if (this.readyState == 4){
/*      console.log(this.responseText);
      var torrentFile=utoa(this.responseText);
      addTorrentFile(torrentFile);
      */
    }
  };
}
