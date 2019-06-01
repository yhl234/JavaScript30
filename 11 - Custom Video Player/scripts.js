// get elements
const player = document.querySelector('.player');
const video = player.querySelector('.viewer');
const progress = player.querySelector('.progress');
const progressBar = player.querySelector('.progress__filled');
const toggle = player.querySelector('.toggle');
const skipButtons = player.querySelectorAll('[data-skip]');
const ranges = player.querySelectorAll('.player__slider');

//functions

//play and paused
function togglePlay(){
	video.paused ? video.play() : video.pause() 
}
//change icon
function updateButton(){
	const icon = this.paused ? '►' : '❚ ❚';
	toggle.textContent = icon;

}
//side bar
function handleRangeUpdate(){
	video[this.name] = this.value;
}
//skip
function skip(){
	video.currentTime = video.currentTime + parseFloat(this.dataset.skip);
}
//progress bar
function handleProgress(){
	const percent = (video.currentTime/video.duration)*100
	progressBar.style.flexBasis = `${percent}%`;
}
//
function scrub(e) {
	const scrubTime = (e.offsetX/progress.offsetWidth)*video.duration;
	video.currentTime = scrubTime
}

//event listener
video.addEventListener('click',togglePlay);
toggle.addEventListener('click',togglePlay);
video.addEventListener('play', updateButton);
video.addEventListener('pause', updateButton);
ranges.forEach(range => {
	range.addEventListener('click',handleRangeUpdate);
});
skipButtons.forEach(skipButton => {
	skipButton.addEventListener('click',skip);
});
video.addEventListener('timeupdate', handleProgress);

let click = false
progress.addEventListener('click', scrub);
progress.addEventListener('mousemove', function(e){
	if (click){
		scrub(e)
	}
});
progress.addEventListener('mouseup', ()=> click = false);
progress.addEventListener('mousedown', ()=> click = true);


