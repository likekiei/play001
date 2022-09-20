var mutePlay = document.getElementById("mutePlay");
var audio = document.getElementById("music");
var btnPlay = document.getElementById("btnPlay");
var volValue = document.getElementById("volValue");
var volInfo = document.getElementById("volInfo");
var info = document.getElementById("info");
var song = document.getElementById("song");
var progress = document.getElementById("progress");
var book = document.getElementById("book");
console.log(audio.children[0].title);

song.addEventListener('change', function () {
    changeMusic(song.selectedIndex);
});

//更新歌單
var option;
var tBook = book.children[1];
function UpdatdMusic() {

    //移除目前下拉選單中的所有歌曲

    for (var j = song.children.length - 1; j >= 0; j--) {
        song.removeChild(song.children[j]);
    }

    //再更新我的歌本中的歌曲給下拉選單

    for (var i = 0; i < tBook.children.length; i++) {
        option = document.createElement("option");
        option.innerText = tBook.children[i].innerText;
        option.value = tBook.children[i].title;
        song.appendChild(option);
    }
    changeMusic(0);
}


//歌單
function allowDrop(ev) {
    ev.preventDefault(); //停止預設行為
}

function drag(ev) {
    ev.dataTransfer.setData("text", ev.target.id);
}

function drop(ev) {
    ev.preventDefault();//停止預設行為
    var data = ev.dataTransfer.getData("text");
    if (ev.target.id == "") 
        ev.target.appendChild(document.getElementById(data));
            else 
            ev.target.parentNode.appendChild(document.getElementById(data));
        
    }





//歌曲清單
var sBook = book.children[0];

for (var i = 0; i < sBook.children.length; i++) {
    sBook.children[i].draggable = "true"; //歌曲拖拉
    sBook.children[i].id = "song" + (i + 1);
    sBook.children[i].addEventListener('dragstart', function () {
        drag(event);//歌曲拖拉
    });

    option = document.createElement("option");//<option></option>
    option.innerText = sBook.children[i].innerText;
    option.value = sBook.children[i].title;
    song.appendChild(option);
}
changeMusic(0);

function songBook() {
    book.className = book.className == "" ? "songhide" : "";
}

//全曲循環
function setAllLoop() {
    info.children[2].innerText = info.children[2].innerText == "全曲循環" ? "" : "全曲循環";


}

//隨機播放
function setRandom() {
    info.children[2].innerText = info.children[2].innerText == "隨機播放" ? "" : "隨機播放";


}

//單曲循環
function setLoop() {

    info.children[2].innerText = info.children[2].innerText == "單曲循環" ? "" : "單曲循環";

}


//靜音
function setMuted() {
    /*audio.muted = !audio.muted;*/

    if (audio.muted) {
        audio.muted = false;
        mutePlay.innerText = "U";

    }
    else {
        audio.muted = true;
        mutePlay.innerText = "V";
    }
    
}




//時間軸
function setTimeBar() {
    audio.currentTime = progress.value;
}

//上下首
function changeSong(i) {
    var index = song.selectedIndex + i;
    changeMusic(index);
}


//切換歌曲
var musicObj, musicIndex = 0;
function changeMusic(i) {

    song.options[i].selected = true;
    audio.children[0].src = song.options[i].value;
    audio.children[0].title = song.options[i].innerText;
    audio.load();


    if (btnPlay.innerText == ";")
        Play();
}


//時間格式轉換
var min = 0, sec = 0, min2 = 0, sec2 = 0;
function getTimeFormat(timeSec) {
    min = parseInt(timeSec / 60);
    sec = parseInt(timeSec % 60);
    min = min < 10 ? "0" + min : min;
    sec = sec < 10 ? "0" + sec : sec;

    return min + ":" + sec;
}

//取得歌曲時間長度
function getDuration() {

    progress.max = parseInt(audio.duration);
    progress.value = parseInt(audio.currentTime);

    var w = (audio.currentTime / audio.duration * 100) + "%";
    progress.style.backgroundImage = "-webkit-linear-gradient(left,#000000,white " + w + ", #c8c8c8 " + w + ",#c8c8c8)";

    info.children[1].innerText = getTimeFormat(audio.currentTime) + " / " + getTimeFormat(audio.duration);
    setTimeout(getDuration, 100);
    //自動接下一首播放
    if (audio.currentTime == audio.duration) {
        if (info.children[2].innerText == "隨機播放") {
            var n = Math.floor(Math.random() * song.options.length);
            chagneMusic(n);
        }
        else if (info.children[2].innerText == "全曲循環" && song.selectedIndex == song.options.length - 1) {
            chagneMusic(0);
        }
        else if (info.children[2].innerText == "單曲循環") {
            changeSong(0);

        }
        else if (song.selectedIndex == song.options.length - 1) {
            Stop();
        }

        else
            changeSong(1);

    }
}


//播放與暫停

function Play() {
    if (audio.paused) {
        audio.play();
        btnPlay.innerText = ";";
        info.children[0].innerText = "目前播放Music:" + audio.children[0].title;
        getDuration();

    }
    else {
        audio.pause();
        btnPlay.innerText = "4";
        info.children[0].innerText = "Music暫停中";
    }
}

//停止播放功能

function Stop() {

    audio.pause();
    audio.currentTime = 0;
    btnPlay.innerText = "4";
    info.children[0].innerText = "Music播放已停止";
}


//快轉與倒轉
function changeTime(t) {
    audio.currentTime += t;
}

//音量微調+-
function changeVolume(v) {
    //audio.volume += v;
    volValue.value = parseInt(volValue.value) + v;

    setVolume();
}
//音量調整-條
setVolume()
function setVolume() {
    volInfo.value = volValue.value;
    audio.volume = volValue.value / 100;

    var z = volValue.value + "%";
    volValue.style.backgroundImage = "-webkit-linear-gradient(left,#000000,white " + z + ", white " + z + ",#000000)";
}