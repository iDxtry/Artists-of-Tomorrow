(function () {
  'use strict';

  var page = document.querySelector('[data-latin-america-school-page]');
  if (!page) {
    return;
  }

  var schools = window.aotLatinAmericaSchools || [];
  var galleries = window.aotLatinAmericaGalleryData || { schools: {} };
  var params = new URLSearchParams(window.location.search);
  var slug = params.get('school');
  var school = schools.find(function (item) {
    return item.slug === slug;
  });

  function setText(selector, value) {
    document.querySelectorAll(selector).forEach(function (element) {
      element.textContent = value;
    });
  }

  function escapeHTML(value) {
    return String(value)
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;')
      .replace(/'/g, '&#39;');
  }

  function schoolHref(item) {
    return 'latin-america-school.html?school=' + encodeURIComponent(item.slug);
  }

  function renderArtworkGallery(item) {
    var gallery = document.querySelector('[data-school-gallery]');
    var galleryEmpty = document.querySelector('[data-school-gallery-empty]');
    var track = document.querySelector('[data-school-gallery-track]');
    var count = document.querySelector('[data-school-gallery-count]');
    var status = document.querySelector('[data-school-gallery-status]');
    var artwork = galleries.schools[item.slug] || [];

    if (!artwork.length) {
      if (gallery) gallery.hidden = true;
      if (galleryEmpty) galleryEmpty.hidden = false;
      if (status) status.textContent = 'Artwork gallery coming soon. This school does not yet have attributable submissions ready to publish.';
      return;
    }

    if (gallery) gallery.hidden = false;
    if (galleryEmpty) galleryEmpty.hidden = true;
    if (count) count.textContent = artwork.length + (artwork.length === 1 ? ' student submission.' : ' student submissions.');
    if (status) status.textContent = artwork.length + (artwork.length === 1 ? ' student submission is' : ' student submissions are') + ' available in this school gallery.';

    if (!track) {
      return;
    }

    track.innerHTML = artwork.map(function (entry) {
      return '<figure class="carousel-item archival-card" data-caption="' + escapeHTML(entry.caption) + '">' +
        '<img src="' + escapeHTML(entry.src) + '" alt="' + escapeHTML(entry.alt) + '" loading="lazy">' +
        '</figure>';
    }).join('');
  }

  function updateMeta(item) {
    var title = item.name + ' | Latin America Partner School';
    var description = item.name + ' in ' + item.country + ' is one of the 62 Latin America Artists of Tomorrow partner schools.';
    var descriptionMeta = document.querySelector('meta[name="description"]');
    var ogTitle = document.querySelector('meta[property="og:title"]');
    var ogDescription = document.querySelector('meta[property="og:description"]');
    var twitterTitle = document.querySelector('meta[name="twitter:title"]');
    var twitterDescription = document.querySelector('meta[name="twitter:description"]');

    document.title = title;
    if (descriptionMeta) descriptionMeta.setAttribute('content', description);
    if (ogTitle) ogTitle.setAttribute('content', title);
    if (ogDescription) ogDescription.setAttribute('content', description);
    if (twitterTitle) twitterTitle.setAttribute('content', title);
    if (twitterDescription) twitterDescription.setAttribute('content', description);
  }

  function renderDirectory() {
    var directory = document.querySelector('[data-school-directory]');
    if (!directory) {
      return;
    }

    directory.innerHTML = schools.map(function (item) {
      return '<a class="school-directory-card editorial-layer" href="' + escapeHTML(schoolHref(item)) + '" data-animate>' +
        '<span>' + escapeHTML(item.country) + '</span>' +
        '<strong>' + escapeHTML(item.name) + '</strong>' +
        '</a>';
    }).join('');
  }

  var profileSection = document.querySelector('[data-school-profile]');
  var emptySection = document.querySelector('[data-school-empty]');

  if (!school) {
    if (profileSection) profileSection.hidden = true;
    if (emptySection) emptySection.hidden = false;
    renderDirectory();
    setText('[data-school-name]', 'Latin America Partner Schools');
    setText('[data-school-country]', 'Choose one of the 62 regional partner schools.');
    return;
  }

  if (profileSection) profileSection.hidden = false;
  if (emptySection) emptySection.hidden = true;

  setText('[data-school-name]', school.name);
  setText('[data-school-country]', school.country);
  updateMeta(school);
  renderArtworkGallery(school);
})();
