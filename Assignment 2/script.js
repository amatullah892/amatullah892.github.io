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

const myAudio =
  document.querySelector("#my-audio") ||
  document.querySelector("#aduio-player") ||
  new Audio();
console.log(myAudio);

const trackTitle =
  document.querySelector("#track-title") ||
  document.querySelector("#track-title");
console.log(trackTitle);

const trackArtist = document.querySelector("#track-artist");
console.log(trackArtist);

const progressBar = document.querySelector("#progress-bar");
console.log(progressBar);

myAudio.addEventListener("timeupdate", updateProgress);

function updateProgress() {
  if (!myAudio.duration) {
    return;
  }
  const duration = (myAudio.currentTime / myAudio.duration) * 100;
  progressBar.style.width = duration + "%";
  currentTime.textContent = formatTime(myAudio.currentTime);
}

const playPauseButton = document.querySelector("#play-pause-button");
console.log(playPauseButton);

const playPauseImg = document.querySelector("#play-pause-img");
console.log(playPauseImg);

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

const muteUnmuteButton = document.querySelector("#mute-unmute-button");
console.log(muteUnmuteButton);

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

const trackButtons = document.querySelectorAll(".track-pill");
console.log(trackButtons);

function playAudio(no) {
  myAudio.src = audioList[no].src;
  console.log(myAudio.src);
  trackTitle.textContent = audioList[no].title;
  trackArtist.textContent = audioList[no].artist;
  myAudio.load();
  myAudio.play();
  playPauseImg.src = "https://img.icons8.com/ios-glyphs/30/pause--v1.png";
  playPauseImg.alt = "Pause";
  updateActiveTrack(no);
}

function updateActiveTrack(no) {
  trackButtons.forEach(function updateButton(button, index) {
    if (index === no) {
      button.classList.add("track-pill-active");
    } else {
      button.classList.remove("track-pill-active");
    }
  });
}

const heartButton = document.querySelector("#heart-button");
console.log(heartButton);

heartButton.addEventListener("click", updateLikes);

const likesContainer = document.querySelector("#likes");
let likes = 0;

function updateLikes() {
  likes++;
  likesContainer.textContent = likes;
}

const progressContainer = document.querySelector("#progress-container");
console.log(progressContainer);

progressContainer.addEventListener("click", changeProgress);

function changeProgress(event) {
  const progressWidth = progressContainer.clientWidth;
  const clickPosition = event.offsetX;
  myAudio.currentTime = (clickPosition / progressWidth) * myAudio.duration;
}

const currentTime = document.querySelector("#time-current");
console.log(currentTime);

const totalTime = document.querySelector("#time-total");
console.log(totalTime);

myAudio.addEventListener("loadedmetadata", updateDuration);

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

const fastForwardButton = document.querySelector("#fast-forward-button");
console.log(fastForwardButton);

fastForwardButton.addEventListener("click", fastForward);

function fastForward() {
  myAudio.currentTime = Math.min(myAudio.currentTime + 10, myAudio.duration);
}

myAudio.addEventListener("ended", playNextAudio);

function playNextAudio() {
  const currentAudio = audioList.findIndex(function findAudio(audio) {
    return audio.src === myAudio.getAttribute("src");
  });
  const nextAudio = (currentAudio + 1) % audioList.length;
  playAudio(nextAudio);
}

const starsContainer = document.querySelector("#stars-container");
console.log(starsContainer);

function createStars() {
  for (let i = 0; i < 50; i++) {
    const star = document.createElement("span");
    star.className = "star";
    star.style.left = Math.random() * 100 + "%";
    star.style.top = Math.random() * 100 + "%";
    star.style.animationDelay = Math.random() * 2 + "s";
    starsContainer.appendChild(star);
  }
}

myAudio.src = audioList[0].src;
myAudio.load();
createStars();
