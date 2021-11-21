//инициализация
const body = document.querySelector("body");
const btnStart = document.querySelector("[data-start]");
const btnStop = document.querySelector("[data-stop]");
// ф-ция  генерации случайного цвета
function getRandomHexColor() {
  return `#${Math.floor(Math.random() * 16777215).toString(16)}`;
}
// слушатели событий на кнопки
btnStart.addEventListener("click", onClickBtnStart);
btnStop.addEventListener("click", onClickBtnStop);

// ф-ция вешает инлайн стиль backGround на body
function onInlineStyle() {
   
   body.style.backgroundColor = getRandomHexColor();
};

// ф-ция onClicBtnStart  при клике на кноку  запускает setInterval 
function onClickBtnStart() {

 timerId = setInterval(onInlineStyle, 1000);
    console.log("go!")
    
    //если кнопа была нажата отключаем ее
    if (btnStart) {
        // btnStart.removeEventListener("click", onClicBtnStart);??
        btnStart.disabled = true;
        btnStop.disabled = false;
    }
};
// ф-ция onClicBtnStop  при клике на кноку удаляет setInterval
function onClickBtnStop() {
    clearInterval(timerId);
    console.log('stoped');
     //если кнопа была нажата отключаем ее
    if (btnStop) {
        btnStart.disabled = false;
        btnStop.disabled = true;
        // btnStop.removeEventListener("click", onClickBtnStop);??
    }
};