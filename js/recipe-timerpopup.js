let second = 0;
let minute = 0; 
let hour = 0;
let timeLoop;
//Tldr; timer that takes in hours minutes seconds, turns them into seconds, and counts them down with setInterval while displaying the time back into hours minutes seconds
document.addEventListener('DOMContentLoaded', () => {//event listener
    const timerButton = document.getElementById('openTimer'); 
    
    timerButton.addEventListener('click', openPopup);
});

function openPopup() {//html and css for timer popup
    const popup = document.createElement('div');
    popup.style.position = 'fixed';
    popup.style.bottom = '20px';
    popup.style.right = '20px';
    popup.style.width = '300px';
    popup.style.backgroundColor = '#fff';
    popup.style.boxShadow = '0 4px 8px rgba(0, 0, 0, 0.2)';
    popup.style.borderRadius = '8px';
    popup.style.padding = '16px';
    popup.style.zIndex = '1000';
    popup.innerHTML = `
        <center>
            <h1 class="timerhead" >Recipe Timer</h1>
            <div id="timerSetup">
                <!--This is the Timer display with the arrows to change it-->
                <div style="display: flex; justify-content: center; align-items: center; margin-bottom: 10px;">
                    <div style="margin: 5px;">
                        <button onclick="changeTime('hour', 1)" class="timerbutton"><i class="arrow up"></i></button>
                        <p class="timerhead" id="hourDisplay" style="margin: 0; font-size: 24px;">${hour < 10 ? '0' : ''}${hour}</p>
                        <button onclick="changeTime('hour', -1)" class="timerbutton"><i class="arrow down"></i></button>
                    </div>
                    <div style="padding-bottom:5px; font-size: 30px;">:</div>
                    <div style="margin: 5px;">
                        <button onclick="changeTime('minute', 1)" class="timerbutton"><i class="arrow up"></i></button>
                        <p class="timerhead" id="minuteDisplay" style="margin: 0; font-size: 24px;">${minute < 10 ? '0' : ''}${minute}</p>
                        <button onclick="changeTime('minute', -1)" class="timerbutton"><i class="arrow down"></i></button>
                    </div>
                    <div style="padding-bottom:5px; font-size: 30px;">:</div>
                    <div style="margin: 5px;">
                        <button onclick="changeTime('second', 15)" class="timerbutton"><i class="arrow up"></i></button>
                        <p class="timerhead" id="secondDisplay" style="margin: 0; font-size: 24px;">${second < 10 ? '0' : ''}${second}</p>
                        <button onclick="changeTime('second', -15)" class="timerbutton"><i class="arrow down"></i></button>
                    </div>
                </div>
                <div style="display: flex; justify-content: space-between;">
                    <button onclick="startTimer()" class="timerbutton" style="width: 45%;">Start Timer</button>
                    <button onclick="resetTimer()" class="timerbutton" style="width: 45%;">Reset Timer</button>
                </div>
            </div>
            <div id="timerCountdown" style="display: none;">
                <p id="countdownDisplay" style="font-size: 36px;">${hour < 10 ? '0' : ''}${hour}:${minute < 10 ? '0' : ''}${minute}:${second < 10 ? '0' : ''}${second}</p>
                <button onclick="resetTimer()" class="timerbutton">Reset Timer</button>
            </div>
            <button id="closePopupButton" class="timerbutton" style=" background: none; position: absolute; top: 7px; right: 7px;">X</button>
        </center>
    `;
    document.body.appendChild(popup);//adds to css

    const closeButton = popup.querySelector('#closePopupButton');
    closeButton.addEventListener('click', () => {
        document.body.removeChild(popup);//removes from css
    });
}

function updateTimerDisplay() {//updates the timer display
    const hourDisplay = document.getElementById("hourDisplay");
    const minuteDisplay = document.getElementById("minuteDisplay");
    const secondDisplay = document.getElementById("secondDisplay");
    
    hourDisplay.textContent = `${hour < 10 ? '0' : ''}${hour}`;
    minuteDisplay.textContent = `${minute < 10 ? '0' : ''}${minute}`;
    secondDisplay.textContent = `${second < 10 ? '0' : ''}${second}`;
}

function resetTimer() {//what it says
    minute = 0;
    second = 0;
    hour = 0;
    updateTimerDisplay();
    clearInterval(timeLoop);
    document.getElementById('timerSetup').style.display = 'block'; //replaces countdown screen with setup screen
    document.getElementById('timerCountdown').style.display = 'none'; //removes countdown screen
    document.getElementById("countdownDisplay").textContent = '00:00:00'; //resets countdiwn
}

function startTimer() {
    let totalTimeInSeconds = (hour * 3600) + (minute * 60) + second;
    document.getElementById('timerSetup').style.display = 'none'; //replaces setup screen with countdown screen
    document.getElementById('timerCountdown').style.display = 'block'; //shows countdown screen
    document.getElementById("countdownDisplay").style.margin = "20px"
    document.getElementById("countdownDisplay").textContent = `${hour < 10 ? '0' : ''}${hour}:${minute < 10 ? '0' : ''}${minute}:${second < 10 ? '0' : ''}${second}`;//makes it so it shows the right time when starting
    timeLoop = setInterval(() => {
        totalTimeInSeconds--;
        if (totalTimeInSeconds <= 0) {//end timer
            clearInterval(timeLoop);
            const countdownDisplay = document.getElementById("countdownDisplay");
            countdownDisplay.textContent = `Time is up!`;
            Audio().play('/assets/gong.mp3'); //plays sound when timer is up
        } else {
            hour = Math.floor(totalTimeInSeconds / 3600); //hours
            minute = Math.floor((totalTimeInSeconds % 3600) / 60);//minutes
            second = totalTimeInSeconds % 60;//seconds
            const countdownDisplay = document.getElementById("countdownDisplay");
            countdownDisplay.textContent = `${hour < 10 ? '0' : ''}${hour}:${minute < 10 ? '0' : ''}${minute}:${second < 10 ? '0' : ''}${second}`;
        }
    }, 1000);
}

function changeTime(unit, value) {
    if (unit === 'hour') {
        hour += value;
        if (hour < 0) hour = 0;//base case
    } else if (unit === 'minute') {
        minute += value;
        if (minute < 0) minute = 0; 
    } else if (unit === 'second') {
        second += value; 
        if (second < 0) second = 0; 
        if (second >= 60) {
            second = 0;
            minute += 1; 
        }
    }
    updateTimerDisplay(); //updates the display after every change
}
