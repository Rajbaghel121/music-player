const audioPlayer = document.getElementById("audioPlayer");
const playlist = document.getElementById("playlist");
const searchInput = document.getElementById("searchInput");

// 🔍 Search Functionality
searchInput.addEventListener("input", () => {
  const filter = searchInput.value.toLowerCase();
  const songs = playlist.getElementsByTagName("li");
  for (let i = 0; i < songs.length; i++) {
    const song = songs[i];
    const text = song.textContent.toLowerCase();
    song.style.display = text.includes(filter) ? "" : "none";
  }
});

// ▶️ Play Song On Click
playlist.addEventListener("click", function (e) {
  if (e.target && e.target.tagName === "LI") {
    const songSrc = e.target.getAttribute("data-src");
    audioPlayer.src = songSrc;
    audioPlayer.play();
  }
});