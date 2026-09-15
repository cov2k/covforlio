const API_KEY = "3533226ecea73bbf159f17f50ffd1248";
const USERNAME = "covensxd";

async function getLastTrack() {
    const url = `https://ws.audioscrobbler.com/2.0/?method=user.getrecenttracks&user=${USERNAME}&api_key=${API_KEY}&format=json&limit=1`;

    const res = await fetch(url);
    const data = await res.json();

    const track = data.recenttracks.track[0];
    const statusEl = document.getElementById("lastfm-status");
    const artEl = document.getElementById("lastfm-art");

    if (!track) {
        statusEl.textContent = "No recent tracks found.";
        return;
    }

    const nowPlaying = track["@attr"]?.nowplaying === "true";
    const name = track.name;
    const artist = track.artist["#text"];

    const image = track.image?.find(img => img.size === "medium")?.["#text"];

    if (image) {
        artEl.src = image;
    } else {
        artEl.src = ""; // fallback if no image
    }

    statusEl.textContent = nowPlaying
        ? `now playing: ${name} by ${artist}`
        : `last played: ${name} by ${artist}`;
}

getLastTrack();
