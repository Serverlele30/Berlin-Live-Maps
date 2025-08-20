// =============================
// Karte initialisieren
// =============================
const map = L.map('map').setView([52.52, 13.405], 13);

L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
  maxZoom: 19,
  attribution: '© OpenStreetMap contributors'
}).addTo(map);

// Layer für Fahrzeuge
const vehiclesLayer = L.layerGroup().addTo(map);
const vehicleMarkers = {};

// =============================
// Farben & Symbole
// =============================
const lineColors = {
  'S45': '#CD9C53', 'S46': '#CD9C53', 'S47': '#CD9C53', 'S6': '#CD9C53', 'S65': '#CD9C53', 'S66': '#CD9C53',
  'S42': '#CB6418', 'S4': '#AD5937', 'S41': '#AD5937', 'U5': '#7E5330', 'U55': '#7E5330',
  'S9': '#992746', 'S95': '#992746', 'S96': '#992746', 'U12': ['#7DAD4C', '#DA421E'], 'U2': '#DA421E',
  'S3': '#EB7405', 'S5': '#EB7405', 'S55': '#EB7405', 'S56': '#EB7405', 'U9': '#F3791D',
  'S3-wannsee': '#F0D722', 'U4': '#F0D722', 'U1': '#7DAD4C', 'U15': '#7DAD4C',
  'S8': '#66AA22', 'S85': '#66AA22', 'S86': '#66AA22', 'S2': '#007734', 'S21': '#007734',
  'S25': '#007734', 'S26': '#007734', 'U3': '#16683D', 'U35': '#16683D',
  'S3-charlottenburg': '#009BD5', 'U7': '#009BD5', 'S10': '#0082C4', 'S19': '#0082C4',
  'S3-berlin-schoenefeld': '#0066AD', 'S35': '#0066AD', 'S36': '#0066AD', 'U8': '#224F86',
  'S7': '#816DA6', 'S75': '#816DA6', 'S76': '#816DA6', 'U6': '#8C6DAB',
  'S1': '#DA6BA2', 'S15': '#DA6BA2', 'S16': '#DA6BA2', 'U0': '#DA6BA2',
  'U10': '#808080', 'U11': '#808080', 'F10': '#528DBA', 'F11': '#528DBA',
  'F12': '#528DBA', 'F21': '#528DBA', 'F23': '#528DBA', 'F24': '#528DBA'
};

const symbols = {
  bus: '🚌', tram: '🚎', subway: '🚉', suburban: '🚋',
  regional: '🚆', express: '🚄', longDistance: '🚅', ferry: '🛥️'
};

// =============================
// Hilfsfunktionen
// =============================
function getLineColor(lineName, product) {
  if(lineName === 'U12') return null;
  if(lineName.startsWith('S3 ')) {
    if(lineName.toLowerCase().includes('wannsee')) return lineColors['S3-wannsee'];
    if(lineName.toLowerCase().includes('charlottenburg') || lineName.toLowerCase().includes('schönefeld')) return lineColors['S3-berlin-schoenefeld'];
    return lineColors['S3'];
  }
  if(lineColors[lineName]) return lineColors[lineName];
  if(product === 'suburban') return '#CD9C53';
  if(product === 'subway') return '#7DAD4C';
  return '#666';
}

function createDivIcon(vehicle) {
  const product = vehicle.line?.product;
  const lineName = vehicle.line?.name || '?';
  const symbol = symbols[product] || '❓';

  if(lineName === 'U12') {
    const iconHtml = `
      <div style="text-align:center; font-size:24px; position: relative; width: 30px; height: 40px;">
        <svg width="30" height="40" viewBox="0 0 30 40" xmlns="http://www.w3.org/2000/svg" style="position:absolute; top:0; left:0;">
          <defs>
            <linearGradient id="u12grad" x1="0" y1="0" x2="1" y2="1">
              <stop offset="0%" stop-color="#7DAD4C" />
              <stop offset="50%" stop-color="#7DAD4C" />
              <stop offset="50%" stop-color="#DA421E" />
              <stop offset="100%" stop-color="#DA421E" />
            </linearGradient>
          </defs>
          <rect width="30" height="40" fill="url(#u12grad)" />
        </svg>
        <div style="position:absolute; top:0; left:0; width:30px; height:40px; line-height:40px; font-size:24px; font-weight:bold; color:#fff; mix-blend-mode: difference;">
          ${symbol}
        </div>
        <div class="line-label" style="position:absolute; bottom:0; left:50%; transform: translateX(-50%); font-size:12px; background:none; color:#000; font-weight:bold; mix-blend-mode:none;">
          U12
        </div>
      </div>
    `;
    return L.divIcon({ html: iconHtml, className: '', iconSize: [30, 40], iconAnchor: [15, 20] });
  }

  const lineColor = getLineColor(lineName, product);
  const labelStyle = `background: ${lineColor}; color: white; padding: 2px 6px; border-radius: 3px; display: inline-block; font-weight: bold; font-size: 12px; user-select: none; font-family: Arial, sans-serif;`;

  const iconHtml = `
    <div style="text-align: center; font-size: 26px; line-height: 1;">
      <div style="color: ${lineColor}; filter: drop-shadow(0 0 1px rgba(0,0,0,0.5));">${symbol}</div>
      <div class="line-label" style="${labelStyle}">${lineName}</div>
    </div>
  `;

  return L.divIcon({ html: iconHtml, className: '', iconSize: [30, 40], iconAnchor: [15, 20] });
}

// =============================
// Fahrzeuge laden
// =============================
async function loadVehicles() {
  const bounds = map.getBounds();
  const bbox = `north=${bounds.getNorth()}&west=${bounds.getWest()}&south=${bounds.getSouth()}&east=${bounds.getEast()}`;

  try {
    const res = await fetch(`https://v6.vbb.transport.rest/radar?${bbox}&results=100&duration=30`);
    const result = await res.json();
    const data = result.movements || [];

    const newIds = new Set();

    data.forEach(vehicle => {
      const id = vehicle.tripId;
      const loc = vehicle.location;
      if (!loc || !loc.latitude || !loc.longitude) return;

      newIds.add(id);
      const icon = createDivIcon(vehicle);

      if (vehicleMarkers[id]) {
        vehicleMarkers[id].setLatLng([loc.latitude, loc.longitude]);
      } else {
        const marker = L.marker([loc.latitude, loc.longitude], { icon })
          .bindPopup(`<b>Linie:</b> ${vehicle.line?.name || 'unbekannt'}<br><b>Typ:</b> ${vehicle.line?.product || 'unbekannt'}<br><b>Richtung:</b> ${vehicle.direction || 'unbekannt'}`)
          .addTo(vehiclesLayer);
        vehicleMarkers[id] = marker;
      }
    });

    Object.keys(vehicleMarkers).forEach(id => {
      if (!newIds.has(id)) {
        vehiclesLayer.removeLayer(vehicleMarkers[id]);
        delete vehicleMarkers[id];
      }
    });
  } catch (e) {
    console.error('Fehler beim Laden der Fahrzeuge:', e);
  }
}

// =============================
// Geolocation & Auto-Update
// =============================
function locateAndLoad() {
  if (!navigator.geolocation) {
    loadVehicles();
    return;
  }
  navigator.geolocation.getCurrentPosition(pos => {
    map.setView([pos.coords.latitude, pos.coords.longitude], 14);
    loadVehicles();
  }, () => {
    loadVehicles();
  });
}

locateAndLoad();
setInterval(loadVehicles, 30000);
map.on('moveend', loadVehicles);

// =============================
// Bahnhöfe mit Live-Abfahrten
// =============================
const stations = [
  { name: "Berlin Zoologischer Garten", id: "900023201", coords: [52.5069, 13.3326] },
  { name: "Berlin Alexanderplatz", id: "900100003", coords: [52.5215, 13.4115] },
  { name: "Berlin Gesundbrunnen", id: "900007102", coords: [52.5483, 13.3889] },
  { name: "Berlin Spandau", id: "900029101", coords: [52.5341, 13.1977] },
  { name: "Berlin Südkreuz", id: "900058101", coords: [52.4752, 13.3653] },
  { name: "Berlin Ostbahnhof", id: "900100004", coords: [52.5100, 13.4340] }
];

async function loadStationDepartures(stationId, marker, stationName) {
  const symbols = {
    bus: '🚌', tram: '🚎', subway: '🚉', suburban: '🚋',
    regional: '🚆', express: '🚄', longDistance: '🚅', ferry: '🛥️'
  };

  try {
    const res = await fetch(`https://v6.vbb.transport.rest/stops/${stationId}/departures?duration=30&results=10`);
    if (!res.ok) throw new Error(`HTTP ${res.status}`);
    const data = await res.json();
    const departures = data.departures || [];

    let html = `<b style="font-size:14px;">${stationName}</b><br>`;
    html += `<table style="border-collapse:collapse; width:100%; font-size:12px;">`;
    html += `<tr style="border-bottom:1px solid #ccc;"><th style="text-align:left; padding:2px 4px;">Linie</th><th style="text-align:left; padding:2px 4px;">Richtung</th><th style="text-align:left; padding:2px 4px;">Zeit</th></tr>`;

    departures.forEach((dep, index) => {
      const line = dep.line?.name || "?";
      const product = dep.line?.product;
      const icon = symbols[product] || '❓';
      const direction = dep.direction || "?";
      const when = dep.when ? new Date(dep.when) : null;
      const planned = dep.plannedWhen ? new Date(dep.plannedWhen) : null;
      const delay = when && planned ? Math.round((when - planned) / 60000) : 0;
      const timeStr = when ? when.toLocaleTimeString("de-DE", { hour: "2-digit", minute: "2-digit" }) : "n/a";
      const delayStr = delay > 0 ? `<span style="color:red;">+${delay} min</span>` : "";

      const color = getLineColor(line, product);
      const bg = index % 2 === 0 ? '#f9f9f9' : '#fff';

      html += `<tr style="background:${bg};">
        <td style="padding:4px 6px; font-weight:bold; color:${color}">${icon} ${line}</td>
        <td style="padding:4px 6px;">${direction}</td>
        <td style="padding:4px 6px;">${timeStr} ${delayStr}</td>
      </tr>`;
    });

    html += `</table>`;
    marker.setPopupContent(html).openPopup();
  } catch (err) {
    marker.setPopupContent(`<b>${stationName}</b><br>Fehler beim Laden`);
    console.error(err);
  }
}


stations.forEach(station => {
  const marker = L.marker(station.coords)
    .addTo(map)
    .bindPopup(`<b>${station.name}</b><br>Lade Abfahrten...`);

  marker.on('click', () => loadStationDepartures(station.id, marker, station.name));
});
