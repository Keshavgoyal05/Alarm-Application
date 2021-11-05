function hoursMenu(){
    var select = document.getElementById('hrs');
    var hrs = 23
    for (i=0; i <= hrs; i++) {
        select.options[select.options.length] = new Option( i < 10 ? "0" + i : i, i);
    }
}
hoursMenu();

    
function minMenu(){    
    var select = document.getElementById('mins');
    var min = 59;
    for (i=0; i <= min; i++) {
        select.options[select.options.length] = new Option(i < 10 ? "0" + i : i, i);
    }
}
minMenu();

    
function secMenu(){    
    var select = document.getElementById('secs');
    var sec = 59;
    for (i=0; i <= sec; i++) {
        select.options[select.options.length] = new Option(i < 10 ? "0" + i : i, i);
    }
}
secMenu();

function DisplayCurrentTime() {
    var date = new Date();
    var today = date.getFullYear()+'-'+(date.getMonth()+1)+'-'+date.getDate();
    var hours = date.getHours() > 12 ? date.getHours() - 12 : date.getHours();
    var am_pm = date.getHours() >= 12 ? "PM" : "AM";
    hours = hours < 10 ? "0" + hours : hours;
    var minutes = date.getMinutes() < 10 ? "0" + date.getMinutes() : date.getMinutes();
    var seconds = date.getSeconds() < 10 ? "0" + date.getSeconds() : date.getSeconds();
    time = hours + ":" + minutes + ":" + seconds + " " + am_pm;
    document.getElementById("result").innerHTML="<b>Your Countdown has expired at "+ today + " " + time + ".</b>";
};


function getTimeRemaining(endtime) {
    const total = Date.parse(endtime) - Date.parse(new Date());
    const seconds = Math.floor((total / 1000) % 60);
    const minutes = Math.floor((total / 1000 / 60) % 60);
    const hours = Math.floor((total / (1000 * 60 * 60)) % 24);
    
    return {
      total,
      hours,
      minutes,
      seconds
    };
}
  
function initializeClock(id, endtime) {
    const clock = document.getElementById(id);
    const hoursSpan = clock.querySelector('.hours');
    const minutesSpan = clock.querySelector('.minutes');
    const secondsSpan = clock.querySelector('.seconds');
  
    function updateClock() {
      const t = getTimeRemaining(endtime);
        
      hoursSpan.innerHTML = ('0' + t.hours).slice(-2);
      minutesSpan.innerHTML = ('0' + t.minutes).slice(-2);
      secondsSpan.innerHTML = ('0' + t.seconds).slice(-2);
  
      if (t.total <= 0) {
        clearInterval(timeinterval);
        DisplayCurrentTime();

      }
    }
    updateClock();
    const timeinterval = setInterval(updateClock, 1000);
}
  
function CountDown(){
    var hr = document.getElementById('hrs');
    var min = document.getElementById('mins');
    var sec = document.getElementById('secs');
    var selectedHour = parseInt(hr.options[hr.selectedIndex].value);
    var selectedMin = parseInt(min.options[min.selectedIndex].value);
    var selectedSec = parseInt(sec.options[sec.selectedIndex].value);
    const deadline=new Date(Date.parse(new Date()) + ((selectedHour*60*60) + (selectedMin*60) + selectedSec) * 1000);
    initializeClock('clockdiv', deadline);
}
