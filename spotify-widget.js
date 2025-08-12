async function updateSpotify() {
  try {
    const res = await fetch('https://spotify.ramulickarlo15.workers.dev/');
    const data = await res.json();

    const albumArt = document.getElementById('album-art');
    const trackName = document.getElementById('track-name');
    const trackArtists = document.getElementById('track-artists');
    const message = document.getElementById('spotify-message');
    const nowPlayingContainer = document.getElementById('spotify-status');

    if (data.playing) {
      const track = data.track.item;

      albumArt.src = track.album.images[0].url;
      albumArt.alt = `Album art for ${track.name}`;

      trackName.textContent = track.name;
      trackArtists.textContent = track.artists.map(a => a.name).join(', ');

      nowPlayingContainer.style.display = 'flex';  // show the info container
      message.textContent = ''; // clear any messages
    } else {
      nowPlayingContainer.style.display = 'none'; // hide the info container
      message.textContent = `I'm not playing anything right now on Spotify.`;
    }
  } catch (e) {
    document.getElementById('spotify-status').style.display = 'none';
    document.getElementById('spotify-message').textContent = 'Failed to load Spotify status.';
  }
}

// Initial load
updateSpotify();

// Refresh every 3 seconds
setInterval(updateSpotify, 3000);
