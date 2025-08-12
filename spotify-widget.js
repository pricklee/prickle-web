async function updateSpotify() {
  try {
    const res = await fetch('https://spotify.ramulickarlo15.workers.dev/'); // your Worker URL here
    const data = await res.json();

    const container = document.getElementById('spotify-status');
    if (data.playing) {
      const track = data.track.item;
      container.innerHTML = `
        <div style="display: flex; align-items: center; margin-top: 10px;">
  <img src="${track.album.images[0].url}" alt="Album art" style="height: 80px; margin-right: 10px;">
  <div style="display: flex; flex-direction: column; justify-content: center; line-height: 1.2;">
    <div style="font-weight: bold;">${track.name}</div>
    <div>${track.artists.map(a => a.name).join(', ')}</div>
  </div>
</div>

       
      `;
    } else {
      container.textContent = 'Not playing anything right now.';
    }
  } catch (e) {
    document.getElementById('spotify-status').textContent = 'Failed to load Spotify status.';
  }
}

// Update on page load
updateSpotify();

// Optional: Refresh every 3 seconds
setInterval(updateSpotify, 3000);