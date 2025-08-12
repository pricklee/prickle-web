async function updateSpotify() {
  try {
    const res = await fetch('https://spotify.ramulickarlo15.workers.dev/'); // your Worker URL here
    const data = await res.json();

    const container = document.getElementById('spotify-status');
    if (data.playing) {
      const track = data.track.item;
      container.innerHTML = `
         <img src="${track.album.images[0].url}" alt="Album art" style="height:80px; margin-top:10px;"> Now playing: <strong>${track.name}</strong> 
         by ${track.artists.map(a => a.name).join(', ')}<br>
       
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