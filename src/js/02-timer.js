import flatpickr from "flatpickr";
import "flatpickr/dist/flatpickr.min.css";
import Notiflix from 'notiflix';
import convertMs from './js-modules/convertMs';

const refs = {
    startTimerBtn: document.querySelector('[data-start]'),
    timer: document.querySelector('.timer'),
    daysValue: document.querySelector('[data-days]'),
    hoursValue: document.querySelector('[data-hours]'),
    minValue: document.querySelector('[data-minutes]'),
    secValue: document.querySelector('[data-seconds]'),
};

refs.startTimerBtn.addEventListener('click', onTimerStart);

refs.startTimerBtn.disabled = true;
let timerId = null;

flatpickr('#datetime-picker', {
    enableTime: true,
    time_24hr: true,
    defaultDate: Date.now(),
    minuteIncrement: 1,
    isActive: false,
    onClose(selectedDates) {

            const currentDate = Date.now();

        if (selectedDates[0] < currentDate) {
            Notiflix.Notify.failure("Please choose a date in the future");
            refs.startTimerBtn.disabled = true;
        } else {
            refs.startTimerBtn.disabled = false;
        };
    },
});

const fp = document.querySelector('#datetime-picker')._flatpickr;
// console.log(fp);

function onTimerStart() {
    const selectedDate = fp.selectedDates[0];
    let isActive = false;

    if (isActive) {
        return;
    } else {
        isActive = true;
        timerId = setInterval(() => {
        const currentDate = Date.now();
        const date = selectedDate - currentDate;

            const { days, hours, minutes, seconds } = convertMs(date);
            updateTimerValue({ days, hours, minutes, seconds });

            if (date >= '0' && date < '1000') {
                clearInterval(timerId);
            };        
    }, 1000);
    };
};

function updateTimerValue({ days, hours, minutes, seconds }) {
    refs.daysValue.textContent = `${days}`;
    refs.hoursValue.textContent = `${hours}`;
    refs.minValue.textContent = `${minutes}`;
    refs.secValue.textContent = `${seconds}`;
};