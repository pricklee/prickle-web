async function updateSpotify() {
  try {
    const res = await fetch('https://spotify.ramulickarlo15.workers.dev/');
    const data = await res.json();

    const container = document.getElementById('spotify-container');
    const albumArt = document.getElementById('album-art');
    const trackName = document.getElementById('track-name');
    const trackArtists = document.getElementById('track-artists');
    const message = document.getElementById('spotify-message');

    if (data.playing) {
      const track = data.track.item;
      albumArt.src = track.album.images[0].url;
      albumArt.alt = `Album art for ${track.name}`;

      trackName.textContent = track.name;
      trackArtists.textContent = track.artists.map(a => a.name).join(', ');

      container.style.display = 'flex';  // show now playing container
      message.textContent = '';           // clear message
    } else {
      container.style.display = 'none';  // hide now playing container
      message.textContent = "I'm not playing anything right now on Spotify.";
    }
  } catch (e) {
    document.getElementById('spotify-container').style.display = 'none';
    document.getElementById('spotify-message').textContent = 'Failed to load Spotify status.';
  }
}

// Run immediately and every 3 seconds
updateSpotify();
setInterval(updateSpotify, 3000);
