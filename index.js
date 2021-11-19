let video = document.getElementById("display");
let progress = document.getElementById("progress");

let play = document.getElementById("play");
let stop = document.getElementById("stop");
let pause = document.getElementById("pause");
let volumeOff = document.getElementById("volume-off");
let volumeOn = document.getElementById("volume-on");
let volume = document.getElementById("volume");
let backButton = document.getElementById("back-button");
let forwardButton = document.getElementById("forward-button");

let firstPress = false;

play.addEventListener("click", onPlay);
stop.addEventListener("click", onStop);
pause.addEventListener("click", onPause);
volumeOff.addEventListener("click", onVolumeOff);
volumeOn.addEventListener("click", onVolumeOn);
volume.addEventListener("input", changeVolume);
video.addEventListener("timeupdate", progressUpdate);
progress.addEventListener("click", () => {
  videoRewind("");
});

backButton.addEventListener("click", () => {
  videoRewind("back");
});
forwardButton.addEventListener("click", () => {
  videoRewind("forward");
});

function onPlay() {
  video.play();
}

function onPause() {
  video.pause();
}

function onStop() {
  onPause();
  video.currentTime = 0;
}

function onVolumeOff() {
  video.volume = 0;
  volume.value = 0;
}

function onVolumeOn() {
  volume.value = 100;
  video.volume = 1;
}

function changeVolume() {
  video.volume = volume.value / 100;
}

function progressUpdate() {
  progress.value = 100 * (video.currentTime / video.duration);

  document.getElementById("current-time").innerHTML =
    secondsToTime(video.currentTime) + " / " + secondsToTime(video.duration);
}

function secondsToTime(time) {
  let hours = Math.floor(time / (60 * 60)),
    dm = time % (60 * 60),
    minutes = Math.floor(dm / 60),
    ds = dm % 60,
    seconds = Math.ceil(ds);

  if (seconds === 60) {
    seconds = 0;
    minutes = minutes + 1;
  }

  if (seconds < 10) {
    seconds = "0" + seconds;
  }

  if (minutes === 60) {
    minutes = 0;
    hours = hours + 1;
  }

  if (minutes < 10) {
    minutes = "0" + minutes;
  }

  if (hours === 0) {
    fulltime = minutes + ":" + seconds;
  } else {
    fulltime = hours + ":" + minutes + ":" + seconds;
  }

  return fulltime;
}

function onKeyPress() {
  if (firstPress) {
    firstPress = false;

    return true;
  } else {
    firstPress = true;

    window.setTimeout(() => {
      firstPress = false;
    }, 500);

    return false;
  }
}

function videoRewind(rewindDirection) {
  if (rewindDirection === "") {
    progress.value = 100 * (event.offsetX / progress.offsetWidth);
    video.currentTime = video.duration * (event.offsetX / progress.offsetWidth);
    return;
  }

  if (rewindDirection === "back" && onKeyPress()) {
    let backArrow = document.createElement("div");

    backArrow.innerHTML = "&larr;";
    backArrow.id = "back-arrow";
    backButton.append(backArrow);

    setTimeout(() => {
      backArrow.remove();
    }, 200);

    video.currentTime -= 10;
    return;
  }

  if (rewindDirection === "forward" && onKeyPress()) {
    let forwardArrow = document.createElement("div");

    forwardArrow.innerHTML = "&rarr;";
    forwardArrow.id = "forward-arrow";
    forwardButton.append(forwardArrow);

    setTimeout(() => {
      forwardArrow.remove();
    }, 200);

    video.currentTime += 10;
    return;
  }
}

window.onbeforeunload = function () {
  play.removeEventListener("click", onPlay);
  stop.removeEventListener("click", onStop);
  pause.removeEventListener("click", onPause);
  volumeOff.removeEventListener("click", onVolumeOff);
  volumeOn.removeEventListener("click", onVolumeOn);
  volume.removeEventListener("input", changeVolume);
  video.removeEventListener("timeupdate", progressUpdate);
  progress.removeEventListener("click", videoRewind);
  backButton.removeEventListener("click", videoRewind("back"));
  forwardButton.removeEventListener("click", videoRewind("forward"));
};
