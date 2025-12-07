// Initialize the map
// 'map' here refers to the <div id="map"></div> in index.html
const map = L.map('map').setView([15.5, 32.5], 5);
// [latitude, longitude], zoom level
// These coordinates roughly center on Sudan

// Add a base map layer from OpenStreetMap
L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
  maxZoom: 18,
  attribution: '&copy; OpenStreetMap contributors'
}).addTo(map);

// (Optional) Add a marker just to prove it's working
const marker = L.marker([15.5, 32.5]).addTo(map);
marker.bindPopup('<b>Sudan Nexus</b><br>This is the center of the map.').openPopup();

console.log('Leaflet map initialized');
