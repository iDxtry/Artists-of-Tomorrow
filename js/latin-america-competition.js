(function () {
  'use strict';

  var galleryData = window.aotLatinAmericaGalleryData || { regionalPhotos: [] };
  var photos = galleryData.regionalPhotos || [];
  var gallery = document.querySelector('[data-regional-photo-gallery]');
  var track = document.querySelector('[data-regional-photo-track]');
  var count = document.querySelector('[data-regional-photo-count]');

  function escapeHTML(value) {
    return String(value)
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;')
      .replace(/'/g, '&#39;');
  }

  if (!gallery || !track || !photos.length) {
    return;
  }

  gallery.hidden = false;
  if (count) {
    count.textContent = photos.length + (photos.length === 1 ? ' regional event photo.' : ' regional event photos.');
  }

  track.innerHTML = photos.map(function (entry) {
    return '<figure class="carousel-item archival-card" data-caption="' + escapeHTML(entry.caption) + '">' +
      '<img src="' + escapeHTML(entry.src) + '" alt="' + escapeHTML(entry.alt) + '" loading="lazy">' +
      '</figure>';
  }).join('');
})();
