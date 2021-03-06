var tempo = 0;
var counterSecondi = 5;
var counterMinuti = 0;
var intervallo;
var intervalloAnimazione;
var pause = 0;
var minuti = document.querySelector('#minuti');
var secondi = document.querySelector('#secondi');
var totale;

var secondiArg = [];
var ondah = 0;
var incrementoOnda = 0;
var style = document.querySelector('.wave').style;
var bar2 = document.querySelector('.bar2').style;
var bar2w = 10;
var intervalID;
var clock=1000;

function play() {
  var audio = new Audio('notification.mp3');
  audio.volume = 0.5;
  audio.play();
}

function playButton() {
  var audio = new Audio('button.mp3');
  audio.volume = 0.1;
  audio.play();
}



function progress(n, callback) {
  IntervalID = setInterval(function () {
    //console.log(ondah + " n:" + n);
    document.getElementById("start").disabled = true;
    document.getElementById("stop").disabled = true;
    document.getElementById("reset").disabled = true;
    if (ondah > n - 1 && ondah < n + 1) {

      // console.log(ondah + " n:" + n);
      clearInterval(IntervalID);
      document.getElementById("stop").disabled = true;
      document.getElementById("start").disabled = false;
      document.getElementById("reset").disabled = false;
      callback();

    } else {
      if (ondah > n) ondah -= clock/2000;
      else ondah += clock/2000;
      style.setProperty('--altezza', ondah + '%');
    }
  }, clock/100);
}




function timer() {
  document.getElementById("stop").disabled = false;
  document.getElementById("start").disabled = true;
  intervallo = setInterval(function () {
    document.getElementById("stop").disabled = false;
    document.getElementById("start").disabled = true;
    if (counterSecondi == 0) {
      counterSecondi = 60;
      counterMinuti--;
    }

    if(pause % 2 != 0) bar2.width = (bar2w += 0.08) + '%';

    counterSecondi--;
    if (counterSecondi < 10) secondi.textContent = "0" + counterSecondi;
    else secondi.textContent = counterSecondi;

    if (counterMinuti < 10) minuti.textContent = "0" + counterMinuti;
    else minuti.textContent = counterMinuti;

    document.title = "Pomogabri " + minuti.textContent + ":" + secondi.textContent;

    if (counterMinuti <= 0 & counterSecondi <= 0) {
      play();
      reset();
      pause++;
      coordina();

    };


  }
    , clock);

  intervalloAnimazione = setInterval(function () {
    ondah -= incrementoOnda / (clock/10);
    style.setProperty('--altezza', ondah + '%');
  }
    , clock/100);
}



function start() {
  playButton();
  incrementoOnda = 110 / (counterMinuti * 60 + counterSecondi);
  if (pause % 2 == 0) document.documentElement.style.setProperty('--status', '#d2f8c6');
  else document.documentElement.style.setProperty('--status', '#b2d3df');
  progress(40, timer);
  //slider.disabled=true;

}

function stop() {
  playButton();
  document.getElementById("start").disabled = false;
  document.getElementById("stop").disabled = true;
  //slider.disabled=false;
  document.documentElement.style.setProperty('--status', '#ffcba8');
  clearInterval(intervallo);
  clearInterval(intervalloAnimazione);
}

function reset() {
  stop();
  progress(0, coordina);
  if(pause % 2 != 0) bar2.width = (bar2w = Math.floor(pause/2)* 30 + 8) + '%';
}

function coordina() {
  if (pause == 6) {
    pause = 0;
    setSecondi(15, 0);
  }
  else if (pause % 2 == 0) {
    setSecondi(25, 0);

  }
  else {
    document.querySelector('.point'+ (Math.floor(pause/2)+1) ).style.backgroundColor = '#d2f8c6' ;
    setSecondi(5, 0);
  }
}

function setSecondi(_minuti, _secondi) {
  counterSecondi = _secondi;
  counterMinuti = _minuti;
  minuti.textContent = _minuti.toString();
  if (_minuti < 10) minuti.textContent = "0" + minuti.textContent;

  secondi.textContent = _secondi.toString();
  if (_secondi < 10) secondi.textContent = "0" + secondi.textContent;


}
