// Описан в документации
import flatpickr from "flatpickr";
// Дополнительный импорт стилей
import "flatpickr/dist/flatpickr.min.css";


 flatpickr('#datetime-picker',  {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
   onClose(selectedDates) {
   
    console.log(selectedDates[0].getTime());
   
  },
}
)

const inputEl= document.querySelector('#datetime-picker');
const timerBtnEl = document.querySelector('[data-start]');
const dates = document.querySelector('.flatpickr-calendar');
const daysSpan = document.querySelector('[data-days]');
const hoursSpan = document.querySelector('[data-hours]');
const minutesSpan = document.querySelector('[data-minutes]');
const secondsSpan = document.querySelector('[data-seconds]');

timerBtnEl.addEventListener('click', onStartTimer);
inputEl.addEventListener('change', onValidationDate);
let timerId = null;

function onValidationDate() {
     const currentData = Date.now();

  const deltaTime = Date.parse(new Date(inputEl.value)) - currentData;
  if (deltaTime > 0) {
    timerBtnEl.disabled = false;
  }
     else {
    window.alert("Please choose a date in the future");
      timerBtnEl.disabled = true;
    clearInterval(timerId);
   
    
 }
}

function onStartTimer() {

  timerId = setInterval(() => {
    const currentData = Date.now();

  const deltaTime = Date.parse(new Date(inputEl.value)) - currentData;

    const time = convertMs(deltaTime);

      daysSpan.textContent = time.days;
      hoursSpan.textContent = time.hours;
      minutesSpan.textContent = time.minutes;
      secondsSpan.textContent = time.seconds;
    
    
  }, 1000);
 
}

// function onClose() {
//   const endData = selectedDates[0].getTime();
//   const currentData = defaultDate.getTime();

//   if (endData > currentData) {
//   onTimerStart()
//   }
//  else {
//     window.alert("Please choose a date in the future");
//     timerBtnEl.disabled = true;  
//  }
// }

// timerBtnEl.addEventListener('click', onTimerStart);

// function onTimerStart() {
  
//   setInterval(() => {
//     const deltaTime = endData - currentData;
//     const timeComponents = convertMs(deltaTime);
//   }, 1000 )
// }



function pad(value) {
  return String(value).padStart(2, '0')
}


function convertMs(ms) {
  // Number of milliseconds per unit of time
  const second = 1000;
  const minute = second * 60;
  const hour = minute * 60;
  const day = hour * 24;

  // Remaining days
  const days = pad(Math.floor(ms / day));
  // Remaining hours
  const hours = pad(Math.floor((ms % day) / hour));
  // Remaining minutes
  const minutes = pad(Math.floor(((ms % day) % hour) / minute));
  // Remaining seconds
  const seconds = pad(Math.floor((((ms % day) % hour) % minute) / second));

  return { days, hours, minutes, seconds };
}

// console.log(convertMs(2000)); // {days: 0, hours: 0, minutes: 0, seconds: 2}
// console.log(convertMs(140000)); // {days: 0, hours: 0, minutes: 2, seconds: 20}
// console.log(convertMs(24140000)); // {days: 0, hours: 6 minutes: 42, seconds: 20}