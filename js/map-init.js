(function () {
  'use strict';

  var mapElement = document.getElementById('map');
  if (!mapElement || !window.L) {
    return;
  }

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

  function createElement(tagName, options) {
    var element = document.createElement(tagName);
    options = options || {};

    if (options.className) {
      element.className = options.className;
    }

    if (options.text) {
      element.textContent = options.text;
    }

    if (options.attributes) {
      Object.keys(options.attributes).forEach(function (name) {
        element.setAttribute(name, options.attributes[name]);
      });
    }

    return element;
  }

  function profileHref(slug) {
    return 'latin-america-school.html?school=' + encodeURIComponent(slug);
  }

  function activePopupContent(name, href, imagePath) {
    var popup = createElement('div', { className: 'map-popup-content' });
    var eyebrow = createElement('span', {
      className: 'map-popup-eyebrow',
      text: 'Active program'
    });
    var title = createElement('p', {
      className: 'map-popup-title',
      text: name
    });
    var button = createElement('button', {
      className: 'map-popup-link',
      attributes: { type: 'button' }
    });
    var arrow = createElement('span', {
      text: '→',
      attributes: { 'aria-hidden': 'true' }
    });

    popup.appendChild(eyebrow);
    popup.appendChild(title);

    if (imagePath) {
      var imageWrapper = createElement('div', { className: 'map-popup-image' });
      var image = createElement('img', {
        attributes: {
          src: imagePath,
          alt: '1st Place Artwork',
          loading: 'lazy'
        }
      });
      imageWrapper.appendChild(image);
      popup.appendChild(imageWrapper);
    }

    if (href) {
      var link = createElement('a', {
        className: 'map-popup-link',
        attributes: { href: href }
      });
      link.append('Explore this school ', arrow);
      popup.appendChild(link);
    } else {
      button.append('Explore this school ', arrow);
      button.addEventListener('click', function () {
        var el = document.getElementById('school-profiles');
        if (el) {
          el.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
      });
      popup.appendChild(button);
    }

    return popup;
  }

  function partnerPopupContent(s) {
    var popup = createElement('div', { className: 'map-popup-content' });

    if (s.country) {
      popup.appendChild(createElement('span', {
        className: 'map-popup-country',
        text: s.country
      }));
    }

    popup.appendChild(createElement('p', {
      className: 'map-popup-title',
      text: s.name
    }));
    popup.appendChild(createElement('span', {
      className: 'map-popup-badge map-popup-badge--active',
      text: 'Partner School'
    }));

    if (s.slug) {
      var link = createElement('a', {
        className: 'map-popup-link',
        attributes: { href: profileHref(s.slug) }
      });
      var arrow = createElement('span', {
        text: '→',
        attributes: { 'aria-hidden': 'true' }
      });
      link.append('Explore this school ', arrow);
      popup.appendChild(link);
    }

    return popup;
  }

  // ── Active pins — India (2) ────────────────────────────────────────────────
  // Slight lat/lng offset so icons don't fully stack (same campus)
  var activeSites = [
    { name: 'Government Senior Secondary School, Nathupur \u2014 Middle School', lat: 28.8451, lng: 77.1564, href: 'nathupur-india.html?school=middle-school', img: 'images/1stPlaceMiddleSchool.jpg' },
    { name: 'Government Senior Secondary School, Nathupur \u2014 High School', lat: 28.8458, lng: 77.1572, href: 'nathupur-india.html?school=high-school', img: 'images/1stPlaceHighSchool.jpeg' }
  ];

  activeSites.forEach(function (s) {
    L.marker([s.lat, s.lng], { icon: activeIcon, riseOnHover: true, zIndexOffset: 1000 })
      .addTo(map)
      .bindPopup(activePopupContent(s.name, s.href, s.img), { maxWidth: 260 });
  });

  // ── Partner schools (62) — loaded from shared Latin America data ───────────────
  var partnerSites = window.aotLatinAmericaSchools || [];

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
      .bindPopup(partnerPopupContent(s), { maxWidth: 240 });
  });

  var allSites = activeSites.concat(partnerSites);
  var allSiteBounds = L.latLngBounds(allSites.map(function (s) {
    return [s.lat, s.lng];
  }));
  map.fitBounds(allSiteBounds.pad(0.12), { maxZoom: 3 });

})();
