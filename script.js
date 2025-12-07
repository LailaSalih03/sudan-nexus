// 1. Some example charity data keyed by region name
// Make sure the keys match the "name" (or other property) in your GeoJSON
const charityData = {
  "Khartoum": [
    {
      name: "Example Relief Org",
      website: "https://example.org",
      focus: "Food aid, shelter"
    },
    {
      name: "Health For All",
      website: "https://healthforall.org",
      focus: "Medical clinics"
    }
  ],
  "Darfur": [
    {
      name: "Darfur Support Network",
      website: "https://darfur-support.org",
      focus: "Conflict-affected communities"
    }
  ]
  // Add more regions...
};

function updateSidebar(regionName) {
  const regionInfo = document.getElementById("region-info");
  const list = document.getElementById("charity-list");
  list.innerHTML = "";

  const charities = charityData[regionName] || [];
  if (!charities.length) {
    regionInfo.querySelector("h2").textContent = regionName || "Select a region";
    list.innerHTML = "<li>No registered charities for this region yet.</li>";
    return;
  }

  regionInfo.querySelector("h2").textContent = regionName;
  charities.forEach((c) => {
    const li = document.createElement("li");
    li.innerHTML = `<strong>${c.name}</strong><br/>
                    <span>${c.focus}</span><br/>
                    <a href="${c.website}" target="_blank" rel="noopener">Website</a>`;
    list.appendChild(li);
  });
}

// 2. Initialize the map
const map = L.map("map").setView([15.5, 32.5], 5); // approximate center of Sudan

// 3. Add a basemap (OpenStreetMap)
L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
  maxZoom: 18,
  attribution: "&copy; OpenStreetMap contributors"
}).addTo(map);

// 4. Styling functions for regions
function defaultStyle(feature) {
  return {
    color: "#1e293b",       // border
    weight: 1,
    fillColor: "#cbd5f5",
    fillOpacity: 0.7
  };
}

function highlightStyle() {
  return {
    weight: 2,
    color: "#0f172a",
    fillColor: "#60a5fa",
    fillOpacity: 0.9
  };
}

// 5. Load the GeoJSON
fetch("data/sudan_regions.geojson")
  .then((response) => response.json())
  .then((geojson) => {
    const geojsonLayer = L.geoJSON(geojson, {
      style: defaultStyle,
      onEachFeature: (feature, layer) => {
        const regionName = feature.properties.name || "Unknown region";

        // Tooltip on hover
        layer.bindTooltip(regionName, { sticky: true });

        layer.on({
          mouseover: (e) => {
            e.target.setStyle(highlightStyle());
          },
          mouseout: (e) => {
            geojsonLayer.resetStyle(e.target);
          },
          click: () => {
            updateSidebar(regionName);
            // Optional: zoom to region
            map.fitBounds(layer.getBounds());
          }
        });
      }
    }).addTo(map);

    // Optional: fit to Sudan bounds
    map.fitBounds(geojsonLayer.getBounds());
  })
  .catch((err) => {
    console.error("Error loading GeoJSON:", err);
  });

// Initialize sidebar
updateSidebar(null);
