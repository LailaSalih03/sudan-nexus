const map = L.map('map').setView([15.5, 32.5], 5);

L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
  maxZoom: 18,
  attribution: '&copy; OpenStreetMap contributors'
}).addTo(map);

L.marker([15.5, 32.5])
  .addTo(map)
  .bindPopup('<b>Sudan Nexus</b><br>Center of the map.')
  .openPopup();
