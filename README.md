# 🚇 Berlin Live Maps

<div align="center">



**Echtzeit-Tracking des Berliner Nahverkehrs auf einer interaktiven Karte**

[![Live Demo](https://img.shields.io/badge/🌐_Live-Demo-success?style=flat-square)](https://berlin-live-maps.netlify.app/)
[![VBB API](https://img.shields.io/badge/VBB-API%20v6-orange?style=flat-square)](https://v6.vbb.transport.rest/)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg?style=flat-square)](https://opensource.org/licenses/MIT)
[![Made with Love](https://img.shields.io/badge/Made%20with-❤️-red?style=flat-square)](https://github.com/Serverlele30/berlin-live-maps)

[🚀 Live Demo](https://berlin-live-maps.netlify.app/) • [📖 Dokumentation](#-features) • [🐛 Issues](https://github.com/Serverlele30/berlin-live-maps/issues)

<img src="https://serverlele.synology.me/image.php?id=14" alt="Berlin Live Maps Screenshot" width="600px">

</div>

---

## 🎯 Über das Projekt

**Berlin Live Maps** visualisiert den Berliner Nahverkehr in Echtzeit auf einer interaktiven Karte. Verfolge Busse, U-Bahnen, S-Bahnen, Straßenbahnen und Fähren live und erhalte aktuelle Abfahrtsinformationen von den wichtigsten Bahnhöfen Berlins.

### 🌟 Highlights

- 🔴 **Live-Tracking** von über 100 Fahrzeugen gleichzeitig
- 🚉 **6 Hauptbahnhöfe** mit Echtzeit-Abfahrten
- 🌓 **Dark Mode** mit automatischer Kartenanpassung
- 📱 **Responsive Design** für alle Geräte
- 📍 **Geolokalisierung** mit Standort-Marker
- ⚡ **Keine Installation nötig** - läuft direkt im Browser

---

## ✨ Features

### 🚌 Live-Tracking
- **Automatische Updates** alle 30 Sekunden
- **Farbcodierte Linien** nach offiziellen VBB-Designrichtlinien
- **Emoji-Symbole** für jede Verkehrsart
  - 🚌 Bus
  - 🚎 Straßenbahn
  - 🚉 U-Bahn
  - 🚋 S-Bahn
  - 🛥️ Fähre
- **Interaktive Popups** mit Details zu jedem Fahrzeug

### 🚉 Bahnhofs-Informationen

Die App zeigt Live-Daten von 6 wichtigen Berliner Bahnhöfen:

| Bahnhof | VBB-ID | Koordinaten |
|---------|--------|-------------|
| 🚉 Zoologischer Garten | 900023201 | 52.5069, 13.3326 |
| 🚉 Alexanderplatz | 900100003 | 52.5215, 13.4115 |
| 🚉 Gesundbrunnen | 900007102 | 52.5483, 13.3889 |
| 🚉 Spandau | 900029101 | 52.5341, 13.1977 |
| 🚉 Südkreuz | 900058101 | 52.4752, 13.3653 |
| 🚉 Ostbahnhof | 900100004 | 52.5100, 13.4340 |

**Features:**
- ⏱️ Abfahrtszeiten in Echtzeit
- ⚠️ Verspätungsanzeigen
- 📍 Pulsierende Marker für bessere Sichtbarkeit

### 🎨 Design & UX

- **Dark Mode** 🌙
  - Automatische Umschaltung der Kartendarstellung
  - Persistente Speicherung der Einstellung
  - Optimierte Farbpalette für beide Modi

- **Animations & Effects** ✨
  - Pulsierende Ringe um Bahnhöfe
  - Türkiser Standort-Marker (#27E7F5)
  - Smooth Hover-Effekte
  - Glassmorphismus-Design

- **Responsive** 📱
  - Mobile-First Ansatz
  - Optimiert für Touch-Bedienung
  - Angepasste UI für kleine Bildschirme

---

## 🛠️ Tech Stack

<div align="center">

| Technologie | Verwendung | Version |
|-------------|------------|---------|
| ![Leaflet](https://img.shields.io/badge/Leaflet-199900?style=flat-square&logo=leaflet&logoColor=white) | Interactive Maps | 1.9.4 |
| ![JavaScript](https://img.shields.io/badge/JavaScript-F7DF1E?style=flat-square&logo=javascript&logoColor=black) | Core Logic | ES6+ |
| ![CSS3](https://img.shields.io/badge/CSS3-1572B6?style=flat-square&logo=css3&logoColor=white) | Styling | CSS3 |
| ![HTML5](https://img.shields.io/badge/HTML5-E34F26?style=flat-square&logo=html5&logoColor=white) | Structure | HTML5 |

</div>

**APIs & Datenquellen:**
- [VBB API v6](https://v6.vbb.transport.rest/) - Verkehrsdaten
- [OpenStreetMap](https://www.openstreetmap.org/) - Kartenmaterial (Light)
- [CartoDB](https://carto.com/) - Kartenmaterial (Dark)

---

## 🚀 Quick Start

### Voraussetzungen

- Moderner Webbrowser (Chrome, Firefox, Safari, Edge)
- Optional: Lokaler Webserver für Entwicklung

### Installation

```bash
# Repository klonen
git clone https://github.com/Serverlele30/berlin-live-maps.git

# In das Verzeichnis wechseln
cd berlin-live-maps

# Mit Python Server starten
python -m http.server 8000

# ODER mit Node.js
npx http-server

# Im Browser öffnen
# http://localhost:8000
```

### Direkt verwenden

Die App benötigt keinen Build-Prozess. Öffne einfach `index.html` in deinem Browser oder besuche die [Live Demo](https://berlin-live-maps.netlify.app/).

---

## 📁 Projektstruktur

```
berlin-live-maps/
│
├── 📄 index.html          # Haupt-HTML mit UI-Struktur
├── 🎨 style.css           # Styles mit CSS Variables & Dark Mode
├── ⚙️ app.js              # JavaScript Logic & API Integration
└── 📖 README.md           # Projekt-Dokumentation
```

---

## 💡 Verwendung

### Dark Mode aktivieren
Klicke auf den 🌙/☀️ Button in der oberen rechten Ecke.

### Bahnhofsinformationen abrufen
Klicke auf einen der 📍 Bahnhofs-Marker, um Live-Abfahrten zu sehen.

### Fahrzeugdetails anzeigen
Klicke auf ein Fahrzeug-Symbol, um Linie, Typ und Richtung zu erfahren.

---

## ⚙️ Konfiguration

### Weitere Bahnhöfe hinzufügen

Bearbeite das `stations` Array in `app.js`:

```javascript
const stations = [
  { 
    name: "Mein Bahnhof", 
    id: "VBB_STATION_ID",      // Von VBB API
    coords: [52.xxxx, 13.xxxx]  // [Latitude, Longitude]
  },
  // ... weitere Bahnhöfe
];
```

### Farben anpassen

Ändere die CSS Variables in `style.css`:

```css
:root {
  --accent: #0066ff;           /* Hauptfarbe */
  --bg-primary: #ffffff;       /* Hintergrund */
  /* ... */
}

body.dark-mode {
  --accent: #4a9eff;           /* Hauptfarbe (Dark) */
  --bg-primary: #1a1a1a;       /* Hintergrund (Dark) */
  /* ... */
}
```

### Update-Intervall ändern

```javascript
// In app.js - Standard: 30 Sekunden
setInterval(loadVehicles, 30000);  // Zeit in Millisekunden
```

---

## 🤝 Contributing

Beiträge sind herzlich willkommen! Hier ist wie du helfen kannst:

1. 🍴 **Fork** das Repository
2. 🌿 **Branch** erstellen (`git checkout -b feature/NeuesFeature`)
3. ✏️ **Commit** deine Änderungen (`git commit -m 'Add: Neues Feature'`)
4. 📤 **Push** zum Branch (`git push origin feature/NeuesFeature`)
5. 🔄 **Pull Request** öffnen

### Entwicklungs-Guidelines

- ✅ Teste deine Änderungen in Light & Dark Mode
- ✅ Stelle sicher, dass die App responsive bleibt
- ✅ Kommentiere komplexe Code-Abschnitte
- ✅ Folge dem bestehenden Code-Stil

---

## 🐛 Bekannte Issues

- ⚠️ Bei >100 Fahrzeugen kann die Performance beeinträchtigt werden
- ⚠️ Geolokalisierung erfordert HTTPS (außer localhost)
- ⚠️ API Rate-Limits können zu temporären Aussetzern führen

Sieh dir die [Issues](https://github.com/Serverlele30/berlin-live-maps/issues) an oder [erstelle ein neues](https://github.com/Serverlele30/berlin-live-maps/issues/new).

---

## 📝 Lizenz

Dieses Projekt ist unter der **MIT License** lizenziert - siehe [LICENSE](LICENSE) für Details.

```
MIT License - Copyright (c) 2024 Serverlele30
```

---

## 🙏 Credits & Danksagungen

- **[VBB](https://www.vbb.de/)** - Verkehrsverbund Berlin-Brandenburg
- **[VBB REST API](https://v6.vbb.transport.rest/)** - Echtzeit-Verkehrsdaten
- **[Leaflet.js](https://leafletjs.com/)** - Open-Source Mapping Library
- **[OpenStreetMap](https://www.openstreetmap.org/)** - Freie Kartendaten
- **[CartoDB](https://carto.com/)** - Dark Mode Tiles

---

## 📬 Kontakt & Support

- 🐛 **Bug Reports:** [GitHub Issues](https://github.com/Serverlele30/berlin-live-maps/issues)
- 💡 **Feature Requests:** [GitHub Discussions](https://github.com/Serverlele30/berlin-live-maps/discussions)
- **GitHub:** [@Serverlele30](https://github.com/Serverlele30)

---

<div align="center">

### Made with ❤️ in Berlin

[![Star History](https://img.shields.io/github/stars/Serverlele30/berlin-live-maps?style=social)](https://github.com/Serverlele30/berlin-live-maps/stargazers)
[![Fork](https://img.shields.io/github/forks/Serverlele30/berlin-live-maps?style=social)](https://github.com/Serverlele30/berlin-live-maps/network/members)
[![Watch](https://img.shields.io/github/watchers/Serverlele30/berlin-live-maps?style=social)](https://github.com/Serverlele30/berlin-live-maps/watchers)

**⭐ Wenn dir das Projekt gefällt, gib ihm einen Stern!**

[🔝 Nach oben](#-berlin-live-maps)

</div>
