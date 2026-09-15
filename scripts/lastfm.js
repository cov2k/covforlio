const API_KEY = "3533226ecea73bbf159f17f50ffd1248";
const USERNAME = "covensxd";

async function getLastTrack() {
    const url = `https://ws.audioscrobbler.com/2.0/?method=user.getrecenttracks&user=${USERNAME}&api_key=${API_KEY}&format=json&limit=1`;

    const res = await fetch(url);
    const data = await res.json();

    const track = data.recenttracks.track[0];
    const statusEl = document.getElementById("lastfm-status");

    if (!track) {
        statusEl.textContent = "No recent tracks found.";
        return;
    }

    const nowPlaying = track["@attr"]?.nowplaying === "true";
    const name = track.name;
    const artist = track.artist["#text"];

    statusEl.textContent = nowPlaying
        ? `now playing: ${name.toLowerCase()} — ${artist.toLowerCase()}`
        : `last played: ${name.toLowerCase()} — ${artist.toLowerCase()}`;
}

getLastTrack();
