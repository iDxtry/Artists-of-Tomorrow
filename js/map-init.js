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

  function partnerRegionPopupContent(region) {
    var popup = createElement('div', { className: 'map-popup-content' });

    popup.appendChild(createElement('span', {
      className: 'map-popup-country',
      text: region.label
    }));
    popup.appendChild(createElement('p', {
      className: 'map-popup-title',
      text: region.count + (region.count === 1 ? ' partner school' : ' partner schools')
    }));
    popup.appendChild(createElement('span', {
      className: 'map-popup-badge map-popup-badge--active',
      text: 'Regional partner network'
    }));

    return popup;
  }

  // ── Active pins — India (2) ────────────────────────────────────────────────
  // Slight lat/lng offset so icons don't fully stack (same campus)
  var activeSites = [
    { name: 'Government Senior Secondary School, Nathupur \u2014 Middle School', lat: 28.8451, lng: 77.1564, href: 'nathupur-asia.html?school=middle-school', img: 'images/1stPlaceMiddleSchool.jpg' },
    { name: 'Government Senior Secondary School, Nathupur \u2014 High School', lat: 28.8458, lng: 77.1572, href: 'nathupur-asia.html?school=high-school', img: 'images/1stPlaceHighSchool.jpeg' }
  ];

  activeSites.forEach(function (s) {
    L.marker([s.lat, s.lng], { icon: activeIcon, riseOnHover: true, zIndexOffset: 1000 })
      .addTo(map)
      .bindPopup(activePopupContent(s.name, s.href, s.img), { maxWidth: 260 });
  });

  // ── Latin America partner regions ───────────────────────────────────────
  // Show country-level centroids/counts only. Do not publish school-level
  // coordinates without an explicit privacy review and partner consent.
  var partnerRegions = [
    { lat: 13.8, lng: -88.9, radius: 85000, label: 'El Salvador', count: 16 },
    { lat: 15.2, lng: -86.2, radius: 100000, label: 'Honduras', count: 14 },
    { lat: 15.6, lng: -90.3, radius: 95000, label: 'Guatemala', count: 14 },
    { lat: 8.5, lng: -80.0, radius: 85000, label: 'Panama', count: 2 },
    { lat: 18.8, lng: -70.2, radius: 85000, label: 'Dominican Republic', count: 3 },
    { lat: 9.8, lng: -84.1, radius: 85000, label: 'Costa Rica', count: 2 },
    { lat: 22.8, lng: -102.5, radius: 180000, label: 'Mexico', count: 9 },
    { lat: 4.6, lng: -74.1, radius: 90000, label: 'Colombia', count: 2 }
  ];

  partnerRegions.forEach(function (region) {
    L.circle([region.lat, region.lng], {
      radius: region.radius,
      color: '#E59D83',
      weight: 0,
      fillColor: '#F4AE96',
      fillOpacity: 0.18,
      interactive: false,
      className: 'aot-cluster-halo'
    }).addTo(map);

    L.marker([region.lat, region.lng], { icon: activeIcon, riseOnHover: true })
      .addTo(map)
      .bindPopup(partnerRegionPopupContent(region), { maxWidth: 240 });
  });

  var allSites = activeSites.concat(partnerRegions);
  var allSiteBounds = L.latLngBounds(allSites.map(function (s) {
    return [s.lat, s.lng];
  }));
  map.fitBounds(allSiteBounds.pad(0.12), { maxZoom: 3 });

})();
