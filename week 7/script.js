//first get access to the audio element so that we can control it from here

const airportAudio = document.querySelector("#airport-audio");
console.log(airportAudio);

//similarly acess the play button

const playButton = document.querySelector("#play-button");
console.log(playButton);

playButton.addEventListener("click", playAudio);
function playAudio() {
  airportAudio.play();
}

//similarly acess the pause button

const pauseButton = document.querySelector("#pause-button");
console.log(pauseButton);

// let us acces the video stardust
const myVideo = document.querySelector("#my-video");
console.log(myVideo);

pauseButton.addEventListener("click", pauseAudio);
function pauseAudio() {
  airportAudio.pause();
}
//similarly acess the pop button

const popButton = document.querySelector("#pop-button");
console.log(popSound);
const popButton = document.querySelector("#pop-audio");
console.log(popButton);

popButton.addEventListener("click", popAudio);
function popAudio() {
  popSound.pop();
}

function myVideo() {
  myVideo.pause();
  myVideo.play();
}
