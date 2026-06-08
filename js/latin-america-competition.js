(function () {
  'use strict';

  var galleryData = window.aotLatinAmericaGalleryData || { regionalPhotos: [] };
  var artworkCounts = window.aotArtworkCounts || { countries: {} };
  var photos = galleryData.regionalPhotos || [];
  var placementTarget = document.querySelector('[data-regional-placement-groups]');
  var honorableTarget = document.querySelector('[data-country-honorable-groups]');
  var gallery = document.querySelector('[data-regional-photo-gallery]');
  var track = document.querySelector('[data-regional-photo-track]');
  var count = document.querySelector('[data-regional-photo-count]');
  var ageGroups = ['Ages 8-11', 'Ages 12-15', 'Ages 16-18'];
  var countries = [
    'El Salvador',
    'Honduras',
    'Guatemala',
    'Panama',
    'Dominican Republic',
    'Costa Rica',
    'Mexico',
    'Colombia'
  ];

  function escapeHTML(value) {
    return String(value)
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;')
      .replace(/'/g, '&#39;');
  }

  function sanitizeURL(url) {
    var sanitized = String(url).trim();
    var lower = sanitized.toLowerCase();
    if (lower.indexOf('javascript:') === 0 || lower.indexOf('data:') === 0 || lower.indexOf('vbscript:') === 0) {
      return 'about:blank';
    }
    return escapeHTML(sanitized);
  }

  function resolveImagePath(src) {
    var cdnBase = window.AOT_CDN_BASE_URL || '';
    if (cdnBase && src && src.indexOf('images/latin-america/') === 0) {
      return cdnBase.replace(/\/$/, '') + '/' + src;
    }
    return src;
  }

  function placeholderCard(title, className) {
    return '<article class="winner-card ' + className + ' editorial-layer" data-animate>' +
      '<div class="winner-image"><div class="image-placeholder">Coming Soon</div></div>' +
      '<h4>' + escapeHTML(title) + '</h4>' +
      '</article>';
  }

  function renderPlacements() {
    if (!placementTarget) {
      return;
    }

    placementTarget.innerHTML = ageGroups.map(function (group) {
      return '<div class="winners-group" data-animate>' +
        '<h3>' + escapeHTML(group) + '</h3>' +
        '<p class="age-group-lead">Shared regional placements for the ' + escapeHTML(group.replace('Ages ', '')) + ' age group.</p>' +
        '<div class="winner-grid" data-animate-group>' +
        placeholderCard('1st Place', 'first-place') +
        placeholderCard('2nd Place', 'second-place') +
        placeholderCard('3rd Place', 'third-place') +
        '</div>' +
        '</div>';
    }).join('');
  }

  function renderHonorableMentions() {
    if (!honorableTarget) {
      return;
    }

    honorableTarget.innerHTML = '<div class="section-header honorable-section-header" data-animate>' +
      '<h2>Country Honorable Mentions</h2>' +
      '<p class="section-lead">Each country will recognize one honorable mention per age category.</p>' +
      '</div>' +
      countries.map(function (country) {
        var countryCounts = artworkCounts.countries[country];
        var lead = countryCounts
          ? countryCounts.submissions + ' submissions across ' + countryCounts.schools + (countryCounts.schools === 1 ? ' school.' : ' schools.')
          : 'Three country honorable mentions.';
        return '<div class="winners-group" data-animate>' +
          '<h3>' + escapeHTML(country) + '</h3>' +
          '<p class="age-group-lead">' + escapeHTML(lead) + '</p>' +
          '<div class="winner-grid" data-animate-group>' +
          ageGroups.map(function (group) {
            return placeholderCard(group + ' Honorable Mention', 'honorable-mention');
          }).join('') +
          '</div>' +
          '</div>';
      }).join('');
  }

  renderPlacements();
  renderHonorableMentions();

  if (!gallery || !track || !photos.length) {
    return;
  }

  gallery.hidden = false;
  if (count) {
    count.textContent = photos.length + (photos.length === 1 ? ' regional event photo.' : ' regional event photos.');
  }

  track.innerHTML = photos.map(function (entry) {
    return '<figure class="carousel-item archival-card" data-caption="' + escapeHTML(entry.caption) + '">' +
      '<img src="' + sanitizeURL(resolveImagePath(entry.src)) + '" alt="' + escapeHTML(entry.alt) + '" loading="lazy">' +
      '</figure>';
  }).join('');
})();
