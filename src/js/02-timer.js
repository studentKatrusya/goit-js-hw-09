// Описан в документации
import flatpickr from "flatpickr";
// Дополнительный импорт стилей
import "flatpickr/dist/flatpickr.min.css";

import Notiflix from 'notiflix';

// инициализация узлов
const inputEl= document.querySelector('#datetime-picker');
const timerBtnEl = document.querySelector('[data-start]');
const daysSpan = document.querySelector('[data-days]');
const hoursSpan = document.querySelector('[data-hours]');
const minutesSpan = document.querySelector('[data-minutes]');
const secondsSpan = document.querySelector('[data-seconds]');

 const options =  {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
   minuteIncrement: 1,
   deltaTime: '',

   endDate: '',
   onClose(selectedDates) {
     options.endDate = selectedDates[0].getTime();
    //  console.log(selectedDates[0].getTime());
options.deltaTime = options.endDate - options.defaultDate;
  if (options.endDate < options.defaultDate) {

    Notiflix.Notify.failure("Please choose a date in the future");
    timerBtnEl.disabled = true;
      
     }
  else {
    timerBtnEl.disabled = false;
     }
    //  console.log(options.defaultDate);
   },
   
  onTimerStart() {
  
    setInterval(() => {
     
    options.deltaTime = options.endDate - Date.now();
      const time = convertMs(options.deltaTime);
 
    updateClockFace(time);

  }, 1000 )
}
}


flatpickr(inputEl, options);


function updateClockFace(evt) {
      daysSpan.textContent = evt.days;
      hoursSpan.textContent = evt.hours;
      minutesSpan.textContent = evt.minutes;
      secondsSpan.textContent = evt.seconds;
  
}


// вешаем слушателя событий

// inputEl.addEventListener('click', options.onClose);
timerBtnEl.addEventListener('click', options.onTimerStart);


function addLeadingZero(value) {
  return String(value).padStart(2, '0')
}


function convertMs(ms) {
  // Number of milliseconds per unit of time
  const second = 1000;
  const minute = second * 60;
  const hour = minute * 60;
  const day = hour * 24;

  // Remaining days
  const days = addLeadingZero(Math.floor(ms / day));
  // Remaining hours
  const hours = addLeadingZero(Math.floor((ms % day) / hour));
  // Remaining minutes
  const minutes = addLeadingZero(Math.floor(((ms % day) % hour) / minute));
  // Remaining seconds
  const seconds = addLeadingZero(Math.floor((((ms % day) % hour) % minute) / second));

  return { days, hours, minutes, seconds };
};



// ============== 1 ====================
// // Описан в документации
// import flatpickr from "flatpickr";
// // Дополнительный импорт стилей
// import "flatpickr/dist/flatpickr.min.css";


//  flatpickr('#datetime-picker',  {
//   enableTime: true,
//   time_24hr: true,
//   defaultDate: new Date(),
//   minuteIncrement: 1,
//    onClose(selectedDates) {
   
//     console.log(selectedDates[0].getTime());
   
//   },
// }
// )

// вешаем слушателя событий

// inputEl.addEventListener('change', onValidationDate);
// timerBtnEl.addEventListener('click', onStartTimer);

// проверяем , чтобы выбранная дата не была меньше текущей
// function onValidationDate() {
//      const currentData = Date.now();

//   const deltaTime = Date.parse(new Date(inputEl.value)) - currentData;
//   // const deltaTime = Date.parse(new Date(endDate)) - currentData;
//   if (deltaTime > 0) {
//     timerBtnEl.disabled = false;
//   }
//      else {
//    Notiflix.Notify.failure("Please choose a date in the future");
//       timerBtnEl.disabled = true;
//     clearInterval(timerId);
//   }
  
// }
// запуск таймера
// function onStartTimer() {

//   timerId = setInterval(() => {
//     const currentData = Date.now();

//   const deltaTime = Date.parse(new Date(inputEl.value)) - currentData;
// // вывод чисел в span
//     const time = convertMs(deltaTime);

//       daysSpan.textContent = time.days;
//       hoursSpan.textContent = time.hours;
//       minutesSpan.textContent = time.minutes;
//       secondsSpan.textContent = time.seconds;
    
    
//   }, 1000);
 
// }


// function addLeadingZero(value) {
//   return String(value).padStart(2, '0')
// }


// function convertMs(ms) {
//   // Number of milliseconds per unit of time
//   const second = 1000;
//   const minute = second * 60;
//   const hour = minute * 60;
//   const day = hour * 24;

//   // Remaining days
//   const days = addLeadingZero(Math.floor(ms / day));
//   // Remaining hours
//   const hours = addLeadingZero(Math.floor((ms % day) / hour));
//   // Remaining minutes
//   const minutes = addLeadingZero(Math.floor(((ms % day) % hour) / minute));
//   // Remaining seconds
//   const seconds = addLeadingZero(Math.floor((((ms % day) % hour) % minute) / second));

//   return { days, hours, minutes, seconds };
// }

// console.log(convertMs(2000)); // {days: 0, hours: 0, minutes: 0, seconds: 2}
// console.log(convertMs(140000)); // {days: 0, hours: 0, minutes: 2, seconds: 20}
// console.log(convertMs(24140000)); // {days: 0, hours: 6 minutes: 42, seconds: 20}