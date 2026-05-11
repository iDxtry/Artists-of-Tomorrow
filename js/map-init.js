(function () {
  'use strict';

  var map = L.map('map', {
    center: [15, -75],
    zoom: 3,
    scrollWheelZoom: false,  // prevents page-scroll hijacking
    zoomControl: true
  });

  // Lighter, cleaner basemap so coral markers pop
  L.tileLayer('https://{s}.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}{r}.png', {
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright" target="_blank" rel="noopener">OpenStreetMap</a> contributors &copy; <a href="https://carto.com/attributions" target="_blank" rel="noopener">CARTO</a>',
    subdomains: 'abcd',
    maxZoom: 20
  }).addTo(map);

  // ── Active pin — logo in a coral circle with animated pulse ring ──────────
  // Uses divIcon so we can layer the logo + ring via HTML/CSS
  var activeIcon = L.divIcon({
    className: 'aot-active-marker',
    html:
      '<span class="aot-active-marker__pulse" aria-hidden="true"></span>' +
      '<span class="aot-active-marker__ring" aria-hidden="true"></span>' +
      '<span class="aot-active-marker__dot">' +
      '<img src="images/logo-favicon.png" alt="" width="18" height="18">' +
      '</span>',
    iconSize: [28, 28],
    iconAnchor: [14, 14],
    popupAnchor: [0, -16]
  });

  function activePopupHTML(name, sectionId, imagePath) {
    var imgHTML = imagePath
      ? '<div class="map-popup-image"><img src="' + imagePath + '" alt="1st Place Artwork" loading="lazy"></div>'
      : '';
    return '<span class="map-popup-eyebrow">Active program</span>' +
      '<p class="map-popup-title">' + name + '</p>' +
      imgHTML +
      '<button class="map-popup-link" onclick="(function(){' +
      'var el=document.getElementById(\'' + sectionId + '\');' +
      'if(el){el.scrollIntoView({behavior:\'smooth\',block:\'start\'});}' +
      '}())">Explore this school <span aria-hidden="true">&rarr;</span></button>';
  }

  function partnerPopupHTML(name, country) {
    var countryLine = country
      ? '<span class="map-popup-country">' + country + '</span>'
      : '';
    return countryLine +
      '<p class="map-popup-title">' + name + '</p>' +
      '<span class="map-popup-badge map-popup-badge--active">Partner School</span>';
  }

  // ── Active pins — India (2) ────────────────────────────────────────────────
  // Slight lat/lng offset so icons don't fully stack (same campus)
  var activeSites = [
    { name: 'Government Senior Secondary School, Nathupur \u2014 Middle School', lat: 28.8451, lng: 77.1564, sectionId: 'middle-school', img: 'images/1stPlaceMiddleSchool.jpg' },
    { name: 'Government Senior Secondary School, Nathupur \u2014 High School', lat: 28.8458, lng: 77.1572, sectionId: 'high-school', img: 'images/1stPlaceHighSchool.jpeg' }
  ];

  activeSites.forEach(function (s) {
    L.marker([s.lat, s.lng], { icon: activeIcon, riseOnHover: true, zIndexOffset: 1000 })
      .addTo(map)
      .bindPopup(activePopupHTML(s.name, s.sectionId, s.img), { maxWidth: 260 });
  });

  // ── Partner schools (62) — all active with pulsing marker ──────────────────
  var partnerSites = [
    // El Salvador (16)
    { name: 'C.E. Juan Ram\u00f3n Jim\u00e9nez', country: 'El Salvador', lat: 13.7046, lng: -89.2182 },
    { name: 'C.E. Rep\u00fablica de Canad\u00e1', country: 'El Salvador', lat: 13.7350, lng: -89.2100 },
    { name: 'C.E. Ram\u00f3n Belloso', country: 'El Salvador', lat: 13.7050, lng: -89.1900 },
    { name: 'C.E. Capit\u00e1n General Gerardo Barrios', country: 'El Salvador', lat: 13.7250, lng: -89.2200 },
    { name: 'C.E. Colonia San Ram\u00f3n', country: 'El Salvador', lat: 13.7300, lng: -89.1950 },
    { name: 'C.E. Rep\u00fablica del Per\u00fa', country: 'El Salvador', lat: 13.7400, lng: -89.1850 },
    { name: 'C.E. Amalia Viuda de Men\u00e9ndez', country: 'El Salvador', lat: 13.6800, lng: -89.2400 },
    { name: 'Escuela Parroquial San Jos\u00e9 de la Monta\u00f1a', country: 'El Salvador', lat: 13.8500, lng: -89.0500 },
    { name: 'C.E. Walter Soundy', country: 'El Salvador', lat: 13.6797, lng: -89.2795 },
    { name: 'Escuela Urbana de Ni\u00f1as Margarita Dur\u00e1n', country: 'El Salvador', lat: 13.6700, lng: -89.2450 },
    { name: 'C.E. Cat\u00f3lica Luisa de Marillac', country: 'El Salvador', lat: 13.7200, lng: -89.2300 },
    { name: 'C.E. Herberth de Sola', country: 'El Salvador', lat: 13.7100, lng: -89.2150 },
    { name: 'C.E. Caser\u00edo Villa Esperanza', country: 'El Salvador', lat: 13.7600, lng: -89.1600 },
    { name: 'C.E. San Francisco', country: 'El Salvador', lat: 13.9433, lng: -89.9104 },
    { name: 'C.E. Napole\u00f3n R\u00edos', country: 'El Salvador', lat: 13.7150, lng: -89.2050 },
    { name: 'C.E. Dr. Humberto Quinteros', country: 'El Salvador', lat: 13.7000, lng: -89.2350 },

    // Honduras (14)
    { name: 'C.E.B. Las Am\u00e9ricas', country: 'Honduras', lat: 14.1150, lng: -87.2180 },
    { name: 'C.E.B.G. Dr. Modesto Rodas Alvarado', country: 'Honduras', lat: 14.0753, lng: -87.2246 },
    { name: 'C.E.B. Estado de Israel', country: 'Honduras', lat: 14.0715, lng: -87.2229 },
    { name: 'Rep\u00fablica de China', country: 'Honduras', lat: 14.0880, lng: -87.1980 },
    { name: 'C.E.B. Tim Hines', country: 'Honduras', lat: 14.1100, lng: -87.2120 },
    { name: 'C.E.B. Rep\u00fablica de Honduras', country: 'Honduras', lat: 14.1300, lng: -87.2280 },
    { name: 'C.E.B. Dr. Ram\u00f3n Rosa #2', country: 'Honduras', lat: 14.1200, lng: -87.2230 },
    { name: 'C.E.B. Manuel Bonilla', country: 'Honduras', lat: 15.7888, lng: -86.7919 },
    { name: 'C.E.B. Mary Flakes de Flores', country: 'Honduras', lat: 14.0883, lng: -87.2525 },
    { name: 'C.E.B. Ing. Roberto Larios Silva', country: 'Honduras', lat: 14.0900, lng: -87.2060 },
    { name: 'C.E.B. Jos\u00e9 Trinidad Caba\u00f1as (Aldea Boquer\u00f3n)', country: 'Honduras', lat: 14.0600, lng: -87.2100 },
    { name: 'C.E.B. Jos\u00e9 Castro L\u00f3pez', country: 'Honduras', lat: 14.0940, lng: -87.2000 },
    { name: 'C.E.B. Jos\u00e9 Trinidad Caba\u00f1as (Villa Nueva)', country: 'Honduras', lat: 14.4200, lng: -88.2500 },
    { name: 'C.E.B. Marcelino Pineda L\u00f3pez', country: 'Honduras', lat: 14.1050, lng: -87.2050 },

    // Guatemala (14)
    { name: 'Escuela Bertha Herrera de Ruano JV', country: 'Guatemala', lat: 14.4875, lng: -90.6875 },
    { name: 'Escuela Eduardo C\u00e1ceres', country: 'Guatemala', lat: 14.6500, lng: -90.5050 },
    { name: 'Escuela El Mezquital II JM', country: 'Guatemala', lat: 14.5050, lng: -90.6950 },
    { name: 'Escuela El Mezquital II JV', country: 'Guatemala', lat: 14.5070, lng: -90.6960 },
    { name: 'Escuela Jos\u00e9 Mar\u00eda Fuentes', country: 'Guatemala', lat: 14.6300, lng: -90.5150 },
    { name: 'Escuela Juan de Francisco Mart\u00ed', country: 'Guatemala', lat: 14.6200, lng: -90.5200 },
    { name: 'Escuela Pedro Valenzuela', country: 'Guatemala', lat: 14.5900, lng: -90.5400 },
    { name: 'Escuela Rep\u00fablica de Urug\u00fcay', country: 'Guatemala', lat: 14.6400, lng: -90.5100 },
    { name: 'Escuela Tierra Blanca', country: 'Guatemala', lat: 14.8572, lng: -90.1022 },
    { name: 'INEBEMEZ JM', country: 'Guatemala', lat: 14.5400, lng: -90.7330 },
    { name: 'INEBEMEZ JV', country: 'Guatemala', lat: 14.5420, lng: -90.7340 },
    { name: 'Instituto Oscar Berger', country: 'Guatemala', lat: 14.6646, lng: -90.4300 },
    { name: 'Escuela El Mezquital I JM', country: 'Guatemala', lat: 14.5100, lng: -90.6980 },
    { name: 'Escuela El Mezquital I JV', country: 'Guatemala', lat: 14.5120, lng: -90.6990 },

    // Panama (2)
    { name: 'Escuela Juan B. Sosa', country: 'Panama', lat: 8.9556, lng: -79.5431 },
    { name: 'Escuela Maria Ossa de Amador', country: 'Panama', lat: 8.9870, lng: -79.5130 },

    // Dominican Republic (3)
    { name: 'Escuela Flora Tolentino', country: 'Dominican Republic', lat: 18.4861, lng: -69.9312 },
    { name: 'Escuela El Valiente', country: 'Dominican Republic', lat: 18.4575, lng: -69.6770 },
    { name: 'Escuela Los Alifonsos', country: 'Dominican Republic', lat: 18.5001, lng: -69.8500 },

    // Costa Rica (2)
    { name: 'Escuela Hatillo 2', country: 'Costa Rica', lat: 9.9230, lng: -84.1110 },
    { name: 'Escuela Finca La Capri', country: 'Costa Rica', lat: 9.8790, lng: -84.0500 },

    // Mexico (9)
    { name: 'Primaria Manuel Saenz', country: 'Mexico', lat: 25.8139, lng: -100.2595 },
    { name: 'Primaria Rafael Ar\u00e9valo Mart\u00ednez', country: 'Mexico', lat: 19.3800, lng: -99.1700 },
    { name: 'Secundaria 253', country: 'Mexico', lat: 25.7752, lng: -100.1092 },
    { name: 'Primaria Marcos E. Becerra', country: 'Mexico', lat: 16.4700, lng: -92.3611 },
    { name: 'Primaria Vicente Guerrero S.', country: 'Mexico', lat: 30.7300, lng: -115.9882 },
    { name: 'Telesecundaria Quetzalc\u00f3atl', country: 'Mexico', lat: 19.4800, lng: -99.0800 },
    { name: 'Escuela Primaria 5 de Febrero', country: 'Mexico', lat: 24.0764, lng: -104.5043 },
    { name: 'Escuela Primaria L\u00e1zaro C\u00e1rdenas', country: 'Mexico', lat: 19.4500, lng: -99.1200 },
    { name: 'Escuela Primaria Lic. Gabriel Ramos Mill\u00e1n', country: 'Mexico', lat: 19.4400, lng: -99.1100 },

    // Colombia (2)
    { name: 'I.E. F\u00e9 y Alegr\u00eda', country: 'Colombia', lat: 6.2442, lng: -75.5812 },
    { name: 'I.E. Barrio Par\u00eds', country: 'Colombia', lat: 6.2300, lng: -75.5700 }
  ];

  // ── Country cluster halos — soft coral glow behind dense clusters ─────────
  // Rendered first so dots sit on top.
  var clusterHalos = [
    { lat: 13.72, lng: -89.22, radius: 28000, label: 'El Salvador' }, // 16 schools
    { lat: 14.55, lng: -90.60, radius: 30000, label: 'Guatemala' },   // 14 schools
    { lat: 14.10, lng: -87.21, radius: 22000, label: 'Honduras' },    // 14 schools
    { lat: 19.42, lng: -99.15, radius: 22000, label: 'Mexico' }       // 9 schools
  ];

  clusterHalos.forEach(function (h) {
    L.circle([h.lat, h.lng], {
      radius: h.radius,
      color: '#E59D83',
      weight: 0,
      fillColor: '#F4AE96',
      fillOpacity: 0.18,
      interactive: false,
      className: 'aot-cluster-halo'
    }).addTo(map);
  });

  // ── Render partner school pins (pulsing activeIcon) ──────────────────────
  partnerSites.forEach(function (s) {
    L.marker([s.lat, s.lng], { icon: activeIcon, riseOnHover: true })
      .addTo(map)
      .bindPopup(partnerPopupHTML(s.name, s.country), { maxWidth: 240 });
  });

  var allSites = activeSites.concat(partnerSites);
  var allSiteBounds = L.latLngBounds(allSites.map(function (s) {
    return [s.lat, s.lng];
  }));
  map.fitBounds(allSiteBounds.pad(0.12), { maxZoom: 3 });

})();
