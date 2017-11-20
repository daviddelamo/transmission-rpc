function buildTorrentList(list, selector){
  selector.innerHTML = '';
  var ulTorrentList = document.createElement("UL");
  ulTorrentList.id = 'torrent_list';
  ulTorrentList.classList.add('torrent_list');
  var even=false;
  for (var i = 0; i < list.length; i++) {
    ulTorrentList.appendChild(buildTorrentDetail(list[i], ulTorrentList, even));
    even = !even;
  }

  selector.appendChild(ulTorrentList);
}

function buildTorrentDetail(torrent, selector, even){
  var liTorrentDetail = document.createElement("LI");
  liTorrentDetail.classList.add('torrent');
  if (even){
    liTorrentDetail.classList.add('even');
  }
  var divTorrentName = document.createElement("DIV");
  divTorrentName.classList.add('torrent_name');
  divTorrentName.innerHTML=torrent.name;

  liTorrentDetail.appendChild(divTorrentName);

  var divTorrentProgress = document.createElement("DIV");
  divTorrentProgress.classList.add('torrent_progress_bar_container');
  divTorrentProgress.classList.add('full');
  var torrentStatus = 'leeching';
  if (torrent.percentDone == 1){
    torrentStatus = 'seeding';
  }

  var divTorrentProgressComplete = document.createElement("DIV");
  divTorrentProgressComplete.classList.add('torrent_progress_bar');
  divTorrentProgressComplete.classList.add('complete');
  divTorrentProgressComplete.classList.add(torrentStatus);
  divTorrentProgressComplete.style = 'width: '+(torrent.percentDone*100)+'%; display: block';

  var divTorrentProgressIncomplete = document.createElement("DIV");
  divTorrentProgressIncomplete.classList.add('torrent_progress_bar')
  divTorrentProgressIncomplete.classList.add('incomplete');
  divTorrentProgressIncomplete.classList.add('torrentStatus');
  divTorrentProgressIncomplete.style = 'display: block';

  divTorrentProgress.appendChild(divTorrentProgressComplete);
  divTorrentProgress.appendChild(divTorrentProgressIncomplete);

  liTorrentDetail.appendChild(divTorrentProgress);
  var divTorrentProgressDetail = document.createElement("DIV");
  divTorrentProgressDetail.classList.add('torrent_progress_details');

  if (torrent.percentDone == 1){
    divTorrentProgressDetail.innerHTML = humanReadableSize(Number(torrent.totalSize),0) + ', uploaded '+humanReadableSize(Number(torrent.uploadedEver), 0)+' (Ratio '+cleanDecimals(Number(torrent.uploadRatio))+')';
  }else{
    if (torrent.eta){
      divTorrentProgressDetail.innerHTML = humanReadableSize(Number(torrent.downloadedEver),0) + ' of '+humanReadableSize(Number(torrent.totalSize), 0)+' ('+cleanDecimals(Number(torrent.percentDone)*100)+'%) - '+humanReadableTime(torrent.eta, 0)+' remaining';
    }else{

    }
  }

  liTorrentDetail.appendChild(divTorrentProgressDetail);

  return liTorrentDetail;
}

/**
Receives a size in bytes and return the size in the greatest unit possible.
*/
var units= ['B', 'KB', 'MB', 'GB', 'TB'];
function humanReadableSize(size, unit){
  size = cleanDecimals(size);
  if (unit == 4){
    return size+' '+units[unit];
  }
  if (size > 1024) {
    size = size / 1024;
    unit++;
    return humanReadableSize(size, unit);
  }else{
    return size+' '+units[unit];
  }
}

function cleanDecimals(size){
  size = String(size);
  var indexOfDecimalPoint = size.indexOf('.');
  if (indexOfDecimalPoint >= 0){
    size = size.substring(0, indexOfDecimalPoint+2);
  }

  return Number(size);
}

/**
Receives a time in seconds and return the size in the greatest unit possible.
*/
var unitOfTime= ['seconds', 'minutes', 'hours'];
function humanReadableTime(size, unit){
  size=cleanDecimals(size);
  if (unit == 2){
    return size+' '+unitOfTime[unit];
  }
  if (size > 60) {
    size = size / 60;
    unit++;
    return humanReadableTime(size, unit);
  }else{
    return size+' '+unitOfTime[unit];
  }
}
