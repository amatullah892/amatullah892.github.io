/* Bringing in the audio downloaded from uppbeat into a folder named audio.

Music from #Uppbeat (free for Creators!):
https://uppbeat.io/t/walz/golden-age
License code: PRNSORU5UAVJN9VU

Music from #Uppbeat (free for Creators!):
https://uppbeat.io/t/dope-cat/chill-fm
License code: SNHUM8DHVQE3XFES

Music from #Uppbeat (free for Creators!):
https://uppbeat.io/t/pryces/all-of-my
License code: CAY6SMNDY1IKQLHA*/

const audioList = [
  {
    id: 1,
    title: "Chill FM",
    artist: "Dope Cat",
    src: "audio/chill.mp3",
  },
  {
    id: 2,
    title: "All Of My",
    artist: "Pryces",
    src: "audio/all.mp3",
  },
  {
    id: 3,
    title: "Golden Age",
    artist: "Walz",
    src: "audio/golden.mp3",
  },
];
/*grabbing the parts of HTML page that I need to control using JS*/
/*The audio*/
const myAudio =
  document.querySelector("#my-audio") ||
  document.querySelector("#audio-player") ||
  new Audio();
console.log(myAudio);
/*track title as it is supposed to change as they click on another track pill*/
const trackTitle =
  document.querySelector("#track-title") ||
  document.querySelector("#track-title");
console.log(trackTitle);
/*track artist as it is supposed to change as they click on another track pill*/
const trackArtist = document.querySelector("#track-artist");
console.log(trackArtist);
/*progress bar that will get updated in real time as audio progresses*/
const progressBar = document.querySelector("#progress-bar");
console.log(progressBar);
/*This function moves the progress bar and updates the time text as the song plays*/
myAudio.addEventListener("timeupdate", updateProgress);

function updateProgress() {
  if (!myAudio.duration) {
    return;
  }
  const duration = (myAudio.currentTime / myAudio.duration) * 100;
  progressBar.style.width = duration + "%";
  currentTime.textContent = formatTime(myAudio.currentTime);
}
/*The play pause button that the user will use to interact with the audio*/
const playPauseButton = document.querySelector("#play-pause-button");
console.log(playPauseButton);

const playPauseImg = document.querySelector("#play-pause-img");
console.log(playPauseImg);

playPauseButton.addEventListener("click", togglePlayback);
/*If the music is stopped, it will play it when user click play and if the music is playing then it will pause it when user clicks pause*/
function togglePlayback() {
  if (myAudio.paused || myAudio.ended) {
    myAudio.play();
    playPauseImg.src = "https://img.icons8.com/ios-glyphs/30/pause--v1.png";
    playPauseImg.alt = "Pause";
  } else {
    myAudio.pause();
    playPauseImg.src = "https://img.icons8.com/ios-glyphs/30/play--v2.png";
    playPauseImg.alt = "Play";
  }
}
/*The mute unmute button*/
const muteUnmuteButton = document.querySelector("#mute-unmute-button");
console.log(muteUnmuteButton);
/*it is a switch that will turn the sound on or off*/
muteUnmuteButton.addEventListener("click", toggleAudio);

const muteUnmuteImg = document.querySelector("#mute-unmute-img");
console.log(muteUnmuteImg);

function toggleAudio() {
  if (myAudio.muted) {
    myAudio.muted = false;
    muteUnmuteImg.src =
      "https://img.icons8.com/ios-glyphs/30/high-volume--v2.png";
    muteUnmuteImg.alt = "Volume on";
  } else {
    myAudio.muted = true;
    muteUnmuteImg.src = "https://img.icons8.com/ios-glyphs/30/no-audio--v1.png";
    muteUnmuteImg.alt = "Muted";
  }
}
/*different audio buttons like chill, goldenAge and allOfMy, they are the actual audio name*/
const chillButton = document.querySelector("#track-btn-0");
console.log(chillButton);

chillButton.addEventListener("click", function chooseAudio() {
  playAudio(0);
});

const allOfMyButton = document.querySelector("#track-btn-1");
console.log(allOfMyButton);

allOfMyButton.addEventListener("click", function chooseAudio() {
  playAudio(1);
});

const goldenAgeButton = document.querySelector("#track-btn-2");
console.log(goldenAgeButton);

goldenAgeButton.addEventListener("click", function chooseAudio() {
  playAudio(2);
});
/*These listeners will wait for users to click a specific "pill" button to change the audio*/
const trackButtons = document.querySelectorAll(".track-pill");
console.log(trackButtons);

function playAudio(no) {
  myAudio.src = audioList[no].src;
  console.log(myAudio.src);
  trackTitle.textContent = audioList[no].title;
  trackArtist.textContent = audioList[no].artist;
  myAudio.load();
  myAudio.play();
  /*making sure the play button shows pause since the music already started*/
  playPauseImg.src = "https://img.icons8.com/ios-glyphs/30/pause--v1.png";
  playPauseImg.alt = "Pause";
  updateActiveTrack(no);
}
/*Highlights which song is currently playing*/
function updateActiveTrack(no) {
  trackButtons.forEach(function updateButton(button, index) {
    if (index === no) {
      button.classList.add("track-pill-active");
    } else {
      button.classList.remove("track-pill-active");
    }
  });
}
/*The heart or like button*/
const heartButton = document.querySelector("#heart-button");
console.log(heartButton);

heartButton.addEventListener("click", updateLikes);
/*a container that holds the likes*/
const likesContainer = document.querySelector("#likes");
let likes = 0;
/*adds a like count when the heart is clicked*/
function updateLikes() {
  likes++;
  likesContainer.textContent = likes;
}
/*progress container, allows clicking on the bar to jump to a specific part of the audio*/
const progressContainer = document.querySelector("#progress-container");
console.log(progressContainer);

progressContainer.addEventListener("click", changeProgress);

function changeProgress(event) {
  const progressWidth = progressContainer.clientWidth;
  const clickPosition = event.offsetX;
  myAudio.currentTime = (clickPosition / progressWidth) * myAudio.duration;
}
/*The time of the audio playing*/
const currentTime = document.querySelector("#time-current");
console.log(currentTime);
/*total time of the audio playing*/
const totalTime = document.querySelector("#time-total");
console.log(totalTime);

myAudio.addEventListener("loadedmetadata", updateDuration);
/*it will update the time in real-time as the audio plays*/
function updateDuration() {
  totalTime.textContent = formatTime(myAudio.duration);
}

function formatTime(time) {
  if (!time) {
    return "0:00";
  }
  const minutes = Math.floor(time / 60);
  const seconds = Math.floor(time % 60)
    .toString()
    .padStart(2, "0");

  return minutes + ":" + seconds;
}
/*fast forward button moves the song ahead by 10 secs*/
const fastForwardButton = document.querySelector("#fast-forward-button");
console.log(fastForwardButton);

fastForwardButton.addEventListener("click", fastForward);

function fastForward() {
  myAudio.currentTime = Math.min(myAudio.currentTime + 10, myAudio.duration);
}
/*it will automatically play the next audio when the curren one finishes*/
myAudio.addEventListener("ended", playNextAudio);

function playNextAudio() {
  const currentAudio = audioList.findIndex(function findAudio(audio) {
    return audio.src === myAudio.getAttribute("src");
  });
  const nextAudio = (currentAudio + 1) % audioList.length;
  playAudio(nextAudio);
}
/*The stars*/
const starsContainer = document.querySelector("#stars-container");
console.log(starsContainer);
/*This fills the background with 50 stars at random positions and different speeds*/
function createStars() {
  for (let i = 0; i < 50; i++) {
    const star = document.createElement("span");
    star.className = "star";
    star.style.left = Math.random() * 100 + "%";
    star.style.top = Math.random() * 100 + "%";
    /*this delay makes sure they all do not twinkle at the same time*/
    star.style.animationDelay = Math.random() * 2 + "s";
    starsContainer.appendChild(star);
  }
}
/*set the first song and build the stars when pages loads*/
myAudio.src = audioList[0].src;
myAudio.load();
createStars();
