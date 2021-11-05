sound = new Audio("https://freesound.org/data/previews/316/316847_4939433-lq.mp3");
/*
  audio sound source: https://freesound.org/people/SieuAmThanh/sounds/397787/
*/
sound.loop = true;

var clock = document.getElementById('clock');
var currentTime = setInterval(function(){
        var date = new Date();
        var hours = (12 - (date.getHours()));
        var minutes = date.getMinutes();
        var seconds = date.getSeconds();
        var ampm = (date.getHours()) < 12 ? 'AM' : 'PM';
        if (hours < 0) {
        hours = hours * -1;
        } else if (hours == 00) {
        hours = 12;
        } else {
        hours = hours;
        }
        clock.textContent = addZero(hours) + ":" + addZero(minutes) + ":" + addZero(seconds) + "" + ampm;}
    ,1000);

function addZero(time) {
    return (time < 10) ? "0" + time : time;
}
    
function hoursMenu(index){
    var select = document.getElementById('alarmhrs');
    select.setAttribute("id","alarmhrs"+index);
    var hrs = 12
    for (i=1; i <= hrs; i++) {
        select.options[select.options.length] = new Option( i < 10 ? "0" + i : i, i);
    }
}

    
function minMenu(index){    
    var select = document.getElementById('alarmmins');
    select.setAttribute("id","alarmmins"+index);
    var min = 59;
    for (i=0; i <= min; i++) {
        select.options[select.options.length] = new Option(i < 10 ? "0" + i : i, i);
    }
}

    
function secMenu(index){    
    var select = document.getElementById('alarmsecs');
    select.setAttribute("id","alarmsecs"+index);
    var sec = 59;
    for (i=0; i <= sec; i++) {
        select.options[select.options.length] = new Option(i < 10 ? "0" + i : i, i);
    }
}

function ampmMenu(index){    
    var select = document.getElementById('alarmampm');
    select.setAttribute("id","alarmampm"+index);
}

function alarmSet(obj) {
    var index = obj.parentNode.parentNode.rowIndex;
    var hr = document.getElementById('alarmhrs'+index);
    var min = document.getElementById('alarmmins'+index);
    var sec = document.getElementById('alarmsecs'+index);
    var ap = document.getElementById('alarmampm'+index);
    var selectedHour = hr.options[hr.selectedIndex].value;
    var selectedMin = min.options[min.selectedIndex].value;
    var selectedSec = sec.options[sec.selectedIndex].value;
    var selectedAP = ap.options[ap.selectedIndex].value;
    var alarmTime = addZero(selectedHour) + ":" + addZero(selectedMin) + ":" + addZero(selectedSec) + selectedAP;
    console.log('alarmTime:' + alarmTime);
    document.getElementById('alarmhrs'+index).disabled = true;
    document.getElementById('alarmmins'+index).disabled = true;
    document.getElementById('alarmsecs'+index).disabled = true;
    document.getElementById('alarmampm'+index).disabled = true;
    var h2 = document.getElementById('clock');
    
    //function to calcutate the current time 
    //then compare it to the alarmtime and play a sound when they are equal

    setInterval(function(){
        var date = new Date();
        var hours = (12 - (date.getHours()));
        // var hours = date.getHours();
        var minutes = date.getMinutes();
        var seconds = date.getSeconds();
        var ampm = (date.getHours()) < 12 ? 'AM' : 'PM';
        //convert military time to standard time
        if (hours < 0) {
        hours = hours * -1;
        } else if (hours == 00) {
        hours = 12;
        } else {
        hours = hours;
        }
        var currentTime = h2.textContent = addZero(hours) + ":" + addZero(minutes) + ":" + addZero(seconds) + "" + ampm;
        if (alarmTime == currentTime)
            sound.play();
    },1000);

    //console.log('currentTime:' + currentTime);	
}

function alarmClear(obj) { 
    var index = obj.parentNode.parentNode.rowIndex;   
    document.getElementById('alarmhrs'+index).disabled = false;
    document.getElementById('alarmmins'+index).disabled = false;
    document.getElementById('alarmsecs'+index).disabled = false;
    document.getElementById('alarmampm'+index).disabled = false;
    sound.pause();
}
    
    
function AddAlarm(){
    
    var table=document.getElementById("mytable");
    var tr=document.createElement('TR');
    table.appendChild(tr);
    var index = tr.rowIndex;
    var td=document.createElement('TD');
    td.innerHTML='<select id="alarmhrs"></select>&nbsp;<select id="alarmmins"></select>&nbsp;<select id="alarmsecs"></select>&nbsp;<select id="alarmampm"><option value="AM">AM</option><option value="PM">PM</option></select>';
    tr.appendChild(td);
    var td=document.createElement('TD');
    td.innerHTML='<button id="setButton" class="btn btn-primary btn-sm" onClick="alarmSet(this)">Set Alarm</button>&nbsp;<button id="clearButton" onClick="alarmClear(this)" class="btn btn-danger btn-sm">Clear Alarm</button>&nbsp;';
    td.innerHTML+='<a onClick="DeleteAlarm(this)" style="color: black;" class="btn btn-danger btn-sm"><span class="glyphicon glyphicon-trash"></span>&nbsp;<b>Delete</b></a>';
    tr.appendChild(td);

    
    hoursMenu(index);minMenu(index);secMenu(index);ampmMenu(index);
} 

function DeleteAlarm(obj){
    var index = obj.parentNode.parentNode.rowIndex;
    document.getElementById("mytable").deleteRow(index);
}
