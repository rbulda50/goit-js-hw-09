import getRandomHexColor from './js-modules/getRandomHexColor';


const startBtn = document.querySelector('[data-start]');
const stopBtn = document.querySelector('[data-stop]');

startBtn.addEventListener('click', onRandomColorStart);
stopBtn.addEventListener('click', onColorSwitcherStop);

stopBtn.disabled = true;
let timerId = null

function onRandomColorStart() {
    timerId = setInterval(() => {
    document.body.style.backgroundColor = getRandomHexColor();
    }, 1000);
    
    startBtn.disabled = true;
    stopBtn.disabled = false;
};

function onColorSwitcherStop() {
    clearTimeout(timerId);
    startBtn.disabled = false;
    stopBtn.disabled = true;
};



