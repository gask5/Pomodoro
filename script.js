//firebase
// Your web app's Firebase configuration
  // For Firebase JS SDK v7.20.0 and later, measurementId is optional
//   var firebaseConfig = {
//     apiKey: "AIzaSyBNNR8r9-8tZVMEvad3pysAak7rRwyE74M",
//     authDomain: "pomodoro-305ca.firebaseapp.com",
//     projectId: "pomodoro-305ca",
//     storageBucket: "pomodoro-305ca.appspot.com",
//     messagingSenderId: "725169921267",
//     appId: "1:725169921267:web:e73d9f971747be517b2b86",
//     measurementId: "G-ZDJHE6DGL8"
//   };
//   // Initialize Firebase
//   firebase.initializeApp(firebaseConfig);
//   firebase.analytics();
// //firebase
var tempo = 0;
var counterSecondi = 5;
var counterMinuti = 0;
var intervallo;
var intervalloAnimazione;
var pause=0;
var minuti = document.querySelector('#minuti');
var secondi = document.querySelector('#secondi');
var totale;
// var IEM, Archietettura, Analisi1, Analisi2, Fondamenti, Discreta, Prog2, Algoritmi, Database, Reti, Os;
// var arg = ['Interazione e Multimedia', 'Architettura', 'Analisi 1', 'Analisi 2', 'Fondamenti', 'Discreta', 'Prog 2', 'Alogritmi', 'Database', 'Reti', 'Sistemi operativi'];
var secondiArg = [];
var ondah=0;
var incrementoOnda =0;
var style = document.querySelector('.wave').style;
var intervalID;

function play() {
  var audio = new Audio('levan_polka.mp3');
  audio.play();
}

function setColor() {
  var audio = new Audio('levan_polka.mp3');
  audio.play();
}


function progress(n, callback) {
  IntervalID = setInterval(function (){
    //console.log(ondah + " n:" + n);
    document.getElementById("start").disabled = true;
      document.getElementById("stop").disabled = true;
      document.getElementById("reset").disabled = true;
    if (ondah>n-1 && ondah<n+1) {

      console.log(ondah + " n:" + n);
      clearInterval(IntervalID);
      document.getElementById("stop").disabled = true;
      document.getElementById("start").disabled = false;
      document.getElementById("reset").disabled = false;
      callback();
      
    } else {
      if(ondah>n) ondah-=0.1;
      else ondah += 0.1;
      style.setProperty('--altezza', ondah + '%');
    }
  }, 1);
}




function timer(){
    document.getElementById("stop").disabled = false;
    document.getElementById("start").disabled = true;
    intervallo = setInterval(function () 
                {
                  document.getElementById("stop").disabled = false;
                  document.getElementById("start").disabled = true;
                    if(counterSecondi==0){
                        counterSecondi=60;
                        counterMinuti--;
                    } 
                    
                    counterSecondi--;
                    if(counterSecondi<10 ) secondi.textContent ="0" + counterSecondi;
                    else  secondi.textContent = counterSecondi;
        
                    if(counterMinuti<10) minuti.textContent = "0" + counterMinuti;
                    else  minuti.textContent = counterMinuti;
                        
                    document.title = "Pomogabri " + minuti.textContent + ":" + secondi.textContent;
        
                    if(counterMinuti<=0 & counterSecondi<=0 ) {
                      //play();
                      reset();
                      pause++;
                      coordina();
                      
                    };
                    
                       
                }
                ,1000);
    
    intervalloAnimazione = setInterval(function () 
                {
                    ondah-= incrementoOnda/200;
                    console.log(ondah);
                    style.setProperty('--altezza', ondah + '%');
                }
                ,5);
}



function start() {
    incrementoOnda = 110/(counterMinuti*60+counterSecondi);
    if(pause%2==0) document.documentElement.style.setProperty('--status', '#d2f8c6');
    else  document.documentElement.style.setProperty('--status', '#d2f8c6');
    progress(40, timer);
    //slider.disabled=true;

}

function stop(){
    document.getElementById("start").disabled = false;
    document.getElementById("stop").disabled = true;
    //slider.disabled=false;
    document.documentElement.style.setProperty('--status', '#ffcba8');
    clearInterval(intervallo);
    clearInterval(intervalloAnimazione);
}

function reset(){
    // while(ondah!=40){
    //   if(ondah>40) ondah-=1;
    //   else ondah += 1;
    //   style.setProperty('--altezza', ondah + '%');
    // }
    stop();
    progress(0,coordina);

}

function coordina(){
  if(pause==6){
    pause = 0;
    setSecondi(15,0);
  }
  else if(pause%2==0){
    setSecondi(25,0);
    
  }
  else{
    setSecondi(5,0);
  }
}

function setSecondi(_minuti,_secondi){
  counterSecondi = _secondi;
  counterMinuti = _minuti;
  minuti.textContent =_minuti.toString();
  if(_minuti<10 ) minuti.textContent ="0" + minuti.textContent;
  
  secondi.textContent = _secondi.toString();
  if(_secondi<10 ) secondi.textContent ="0" + secondi.textContent;

  
}
