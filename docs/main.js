console.clear();

// 로딩
$('#hot-new-album, #recent-album, #melon-chart-and-melon-tv').imagesLoaded(function() {
  $('#loading').remove();
});

// top-menu
var swiper = new Swiper("#top-menu .search-ranking .mySwiper", {
  direction: "vertical",
  loop: "true",
  autoplay: {
    delay: 3000,
    disableOnInteraction: false
  }
});

// hot-new-album
var swiper = new Swiper("#hot-new-album .mySwiper", {
  speed: 1000,
  spaceBetween: 30,
  effect: "fade",
  loop: "true",
  autoplay: {
    delay: 5000,
    disableOnInteraction: false
  },
  navigation: {
    nextEl: "#hot-new-album .swiper-button-next",
    prevEl: "#hot-new-album .swiper-button-prev"
  },
  pagination: {
    el: "#hot-new-album .swiper-pagination",
    clickable: true
  }
});

// recent-album
var swiper = new Swiper("#recent-album .mySwiper", {
  autoplay: {
    delay: 3000,
    disableOnInteraction: false
  },
  slidesPerView: 4,
  spaceBetween: 30
});

// melon-chart
var swiper = new Swiper("#melon-chart .mySwiper", {
  spaceBetween: 30,
  effect: "fade",
  navigation: {
    nextEl: "#melon-chart .swiper-button-next",
    prevEl: "#melon-chart .swiper-button-prev"
  }
});

// artist-recommend
var swiper = new Swiper("#artist-recommend .mySwiper", {
  effect: "coverflow",
  // grabCursor: true,
  centeredSlides: true,
  slidesPerView: "auto",
  loop: "true",
  coverflowEffect: {
    rotate: 60,
    stretch: 0
    // depth: 100,
    // modifier: 1,
    // slideShadows: true
  },
  navigation: {
    nextEl: "#artist-recommend .swiper-button-next",
    prevEl: "#artist-recommend .swiper-button-prev"
  }
});

// artist-playlist
var swiper = new Swiper("#artist-playlist .mySwiper", {
  spaceBetween: 30,
  // effect: "fade",
  loop: "true",
  autoplay: {
    delay: 5000,
    disableOnInteraction: false
  },
  navigation: {
    nextEl: "#artist-playlist .swiper-button-next",
    prevEl: "#artist-playlist .swiper-button-prev"
  }
});

// music-player
const track = document.getElementById("track");
const thumbnail = document.getElementById("thumbnail");
const background = document.getElementById("background");
const trackArtist = document.getElementById("track-artist");
const trackTitle = document.getElementById("track-title");
const progressBar = document.getElementById("progressBar");
const currentTime = document.getElementById("currentTime");
const durationTime = document.getElementById("durationTime");

let play = document.getElementById("play");
let pause = document.getElementById("pause");
let next = document.getElementById("next-track");
let prev = document.getElementById("prev-track");
trackIndex = 0;

tracks = [
  "https://res.cloudinary.com/cbanlawi/video/upload/v1614140796/HarryStyles-WatermelonSugar_f5471p.mp3"
];
// thumbnails = [
//   "https://i.ibb.co/7RhfRBZ/Fine-Line-Harry-Styles.jpg",
//   "https://i.ibb.co/dkDC9CP/Justin-Bieber-Song-Cover-Art.jpg",
//   "https://i.ibb.co/371t9Md/Loud-Luxury-Song-Cover-Art.jpg"
// ];
// trackArtists = ["Harry Styles", "Justin Bieber", "Loud Luxury ft. Brando"];
// trackTitles = ["Watermelon Sugar", "Yummy", "Body"];

let playing = true;

function pausePlay() {
  if (playing) {
    play.style.display = "none";
    pause.style.display = "block";

    thumbnail.style.transform = "scale(1.25)";

    track.play();
    playing = false;
  } else {
    pause.style.display = "none";
    play.style.display = "block";

    thumbnail.style.transform = "scale(1)";

    track.pause();
    playing = true;
  }
}

play.addEventListener("click", pausePlay);
pause.addEventListener("click", pausePlay);

track.addEventListener("ended", nextTrack);

function nextTrack() {
  trackIndex++;
  if (trackIndex > tracks.length - 1) {
    trackIndex = 0;
  }

  track.src = tracks[trackIndex];
  thumbnail.src = thumbnails[trackIndex];
  background.src = thumbnails[trackIndex];

  trackArtist.textContent = trackArtists[trackIndex];
  trackTitle.textContent = trackTitles[trackIndex];

  playing = true;
  pausePlay();
}

next.addEventListener("click", nextTrack);

function prevTrack() {
  trackIndex--;
  if (trackIndex < 0) {
    trackIndex = tracks.length - 1;
  }

  track.src = tracks[trackIndex];
  thumbnail.src = thumbnails[trackIndex];
  background.src = thumbnails[trackIndex];

  trackArtist.textContent = trackArtists[trackIndex];
  trackTitle.textContent = trackTitles[trackIndex];

  playing = true;
  pausePlay();
}

prev.addEventListener("click", prevTrack);

function progressValue() {
  progressBar.max = track.duration;
  progressBar.value = track.currentTime;

  currentTime.textContent = formatTime(track.currentTime);
  durationTime.textContent = formatTime(track.duration);
}

setInterval(progressValue, 500);

function formatTime(sec) {
  let minutes = Math.floor(sec / 60);
  let seconds = Math.floor(sec - minutes * 60);
  if (seconds < 10) {
    seconds = `0${seconds}`;
  }
  return `${minutes}:${seconds}`;
}

function changeProgressBar() {
  track.currentTime = progressBar.value;
}

progressBar.addEventListener("click", changeProgressBar);
