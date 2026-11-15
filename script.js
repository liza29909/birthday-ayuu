// Membuka halaman utama
function openWebsite() {
  document.querySelector(".opening").classList.add("hide");
  launchConfetti();
  playMusic();
}

// Membuat hati dan bunga melayang
const heartSymbols = ["♡", "♥", "💕", "🌸", "✿"];

function createHeart() {
  const heart = document.createElement("div");
  heart.className = "heart";
  heart.innerHTML =
    heartSymbols[Math.floor(Math.random() * heartSymbols.length)];

  heart.style.left = Math.random() * 100 + "vw";
  heart.style.animationDuration = 8 + Math.random() * 6 + "s";
  heart.style.fontSize = 15 + Math.random() * 20 + "px";

  document.getElementById("hearts").appendChild(heart);

  setTimeout(() => {
    heart.remove();
  }, 14000);
}

setInterval(createHeart, 600);

// Pesan saat menekan kue ulang tahun
function makeWish() {
  document.getElementById("wishMessage").classList.remove("hide");
  launchConfetti();
}

// Membuka hadiah
function openGift() {
  document.getElementById("surpriseMessage").classList.remove("hide");
  document.getElementById("gift").innerHTML = "💝";
  launchConfetti();
}

// Efek confetti
function launchConfetti() {
  const emojis = ["💗", "✨", "🌸", "🎀", "💕", "⭐"];

  for (let i = 0; i < 45; i++) {
    const confetti = document.createElement("div");
    confetti.className = "confetti";
    confetti.innerHTML =
      emojis[Math.floor(Math.random() * emojis.length)];

    confetti.style.left = Math.random() * 100 + "vw";
    confetti.style.animationDuration = 2 + Math.random() * 3 + "s";

    document.body.appendChild(confetti);

    setTimeout(() => {
      confetti.remove();
    }, 5000);
  }
}

// Musik ulang tahun
let audioContext;
let musicInterval;
let musicPlaying = false;

const melody = [
  523.25, 587.33, 659.25, 523.25,
  698.46, 659.25, 587.33, 523.25,
  587.33, 659.25, 783.99, 698.46
];

function playMusic() {
  if (musicPlaying) return;

  audioContext = new (window.AudioContext || window.webkitAudioContext)();

  if (audioContext.state === "suspended") {
    audioContext.resume();
  }

  let noteIndex = 0;
  musicPlaying = true;

  function playNote() {
    if (!musicPlaying) return;

    const oscillator = audioContext.createOscillator();
    const gain = audioContext.createGain();

    oscillator.type = "sine";
    oscillator.frequency.value = melody[noteIndex];

    gain.gain.setValueAtTime(0.08, audioContext.currentTime);
    gain.gain.exponentialRampToValueAtTime(
      0.001,
      audioContext.currentTime + 0.4
    );

    oscillator.connect(gain);
    gain.connect(audioContext.destination);

    oscillator.start();
    oscillator.stop(audioContext.currentTime + 0.4);

    noteIndex = (noteIndex + 1) % melody.length;
  }

  playNote();
  musicInterval = setInterval(playNote, 500);
}

function stopMusic() {
  musicPlaying = false;
  clearInterval(musicInterval);
}

function toggleMusic() {
  if (musicPlaying) {
    stopMusic();
    document.getElementById("musicButton").innerHTML = "🔇";
  } else {
    playMusic();
    document.getElementById("musicButton").innerHTML = "🎵";
  }
}

// Membuka foto ukuran besar
function showPhoto(src) {
  document.getElementById("popupImage").src = src;
  document.getElementById("photoPopup").classList.add("active");
}

// Menutup foto
function closePhoto() {
  document.getElementById("photoPopup").classList.remove("active");
}
