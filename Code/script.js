const testWrapper = document.querySelector(".test-wrapper");
const testArea = document.querySelector("#test-area");
const originText = document.querySelector("#origin-text p").innerHTML;
const resetButton = document.querySelector("#reset");
const theTimer = document.querySelector(".timer");
const speed = document.querySelector(".speed");

var time = [0,0,0];
var interval;
var isTimerStarted = false;
// Add leading zero to numbers 9 or below (purely for aesthetics):
function putZero(time){
    if(time<=9){
        time = "0"+time;
    }
    return time;
}

// Run a standard minute/second/hundredths timer:
function timerRunning(){
    theTimer.innerHTML = putZero(time[0]) + ":" + putZero(time[1]) + ":" +putZero(time[2]) ;
    time[2]++;
    if(time[2] == 60){
        time[1]++;
        time[2]=0
        if(time[1] == 60){
            time[0]++;
            time[1]=0
        }
    }

}

// Match the text entered with the provided text on the page:


// Start the timer:
function startTimer(){
    let textLength = testArea.value.length;
    if(textLength === 0 && !isTimerStarted){
        isTimerStarted = true;
       interval = setInterval(timerRunning,1000)
    }
}
function spellChecking(){
    let enteredText = testArea.value;
    let mathchText = originText.substring(0,enteredText.length);
    if(enteredText == originText)
    {
        clearInterval(interval);
        testWrapper.style.borderColor = "green"; 
        let result = (28*60)/(time[2] + time[1]*60);
        speed.innerHTML = "Result: "+Math.floor(result) +" WORDS/MIN";
    }
    else{
        if(enteredText == mathchText){
            testWrapper.style.borderColor = "blue"
        }
        else{
            testWrapper.style.borderColor = "red"
        }
    }
}
// Reset everything:
function reset(){
    clearInterval(interval);
    interval = null;
    time = [0,0,0];
    isTimerStarted = false;

    testArea.value="";
    theTimer.innerHTML="00:00:00";
    testWrapper.style.borderColor = "grey"
    speed.innerHTML = "Result:"
}

// Event listeners for keyboard input and the reset button:
testArea.addEventListener("keypress",startTimer,false);
testArea.addEventListener("keyup",spellChecking,false);
resetButton.addEventListener("click",reset,false);