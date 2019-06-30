const timerDisplay = document.querySelector('.display__time-left');
const endTime = document.querySelector('.display__end-time');
const buttons = document.querySelectorAll('[data-time]');
let countDown;
function timer (second){
	clearInterval(countDown);
	const now = Date.now();
	const then = now + second*1000;
	displayTimeLeft(then);
	displayEndTime(then);
	countDown = setInterval(()=>{
		if(Date.now() >= then){
			clearInterval(countDown);
			timerDisplay.textContent =`Time's up`
		return;
		  }
		displayTimeLeft(then)
	}, 1000)
}
function displayTimeLeft(second){
	const timeLeft = Math.round((second - Date.now())/1000);
	const mins = Math.floor(timeLeft/60);
	const secondLeft = timeLeft%60;
	timerDisplay.textContent = `${mins}:${secondLeft<10 ?'0':''}${secondLeft}`
}
function displayEndTime(then){
	const end = new Date(then);
	const hour = end.getHours();
  	const minutes = end.getMinutes();
  	endTime.textContent = `Be Back At ${hour>12 ? hour-12 : hour}:${minutes < 10 ? '0' : ''}${minutes}`;
}
buttons.forEach(button=>button.addEventListener('click',function(){
	timer(this.dataset.time);
}))
document.customForm.addEventListener('submit',function(e){
	e.preventDefault();
	const inputSec = (this.minutes.value)*60;
	timer(inputSec)
})