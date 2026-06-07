(function () {
  'use strict';

  var page = document.querySelector('[data-nathupur-school-page]');
  if (!page) {
    return;
  }

  var schools = {
    'middle-school': {
      title: 'Government Senior Secondary School, Nathupur - Middle School',
      subtitle: 'India',
      division: 'Middle School',
      submissionCount: 6,
      searchText: 'asia india nathupur government senior secondary school middle school'
    },
    'high-school': {
      title: 'Government Senior Secondary School, Nathupur - High School',
      subtitle: 'India',
      division: 'High School',
      submissionCount: 6,
      searchText: 'asia india nathupur government senior secondary school high school'
    }
  };

  function normalizeHashLink() {
    var hash = window.location.hash.replace('#', '');
    var params = new URLSearchParams(window.location.search);

    if (!params.get('school') && schools[hash]) {
      params.set('school', hash);
      window.location.replace(window.location.pathname + '?' + params.toString());
      return true;
    }

    return false;
  }

  function normalizeText(value) {
    return String(value || '')
      .normalize('NFD')
      .replace(/[\u0300-\u036f]/g, '')
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, ' ')
      .trim();
  }

  if (normalizeHashLink()) {
    return;
  }

  var params = new URLSearchParams(window.location.search);
  var selectedKey = params.get('school');
  var selectedSchool = schools[selectedKey];
  var title = document.querySelector('[data-nathupur-title]');
  var subtitle = document.querySelector('[data-nathupur-subtitle]');
  var selectorSections = document.querySelectorAll('[data-nathupur-selector]');
  var schoolSections = document.querySelectorAll('[data-nathupur-school-section]');
  var searchInput = document.querySelector('[data-school-search]');
  var noResults = document.querySelector('[data-school-search-empty]');
  var cards = document.querySelectorAll('[data-school-card]');

  function filterCards() {
    var query = searchInput ? normalizeText(searchInput.value) : '';
    var visibleCount = 0;

    cards.forEach(function (card) {
        var matches = !query || normalizeText(card.getAttribute('data-search-text')).indexOf(query) !== -1;
      card.hidden = !matches;
      if (matches) {
        visibleCount += 1;
      }
    });

    if (noResults) {
      noResults.hidden = visibleCount !== 0;
    }
  }

  function schoolDetailsHTML(school) {
    return '<div class="journey-grid school-profile-grid" data-asia-school-details data-animate-group>' +
      '<article class="journey-card editorial-layer" data-animate>' +
      '<h3>School Details</h3>' +
      '<ul class="school-profile-list">' +
      '<li><strong>Country:</strong> India</li>' +
      '<li><strong>School:</strong> Government Senior Secondary School, Nathupur</li>' +
      '<li><strong>Division:</strong> ' + school.division + '</li>' +
      '</ul>' +
      '</article>' +
      '<article class="journey-card editorial-layer" data-animate>' +
      '<h3>Competition Format</h3>' +
      '<p>The Asia competition is grouped into middle school and high school divisions, with one shared Asia winner gallery.</p>' +
      '</article>' +
      '<article class="journey-card editorial-layer" data-animate>' +
      '<h3>Gallery Status</h3>' +
      '<p>Student submissions are available below. Winner artwork appears in the shared Asia gallery.</p>' +
      '</article>' +
      '</div>';
  }

  function prepareSchoolProfiles() {
    schoolSections.forEach(function (section) {
      var key = section.getAttribute('data-school');
      var school = schools[key];
      var header = section.querySelector('.journey-header');
      var winnersSection = section.querySelector('.school-artwork-gallery');
      var photoGallery = winnersSection ? winnersSection.querySelector('.photo-gallery') : null;
      var carouselTrack = photoGallery ? photoGallery.querySelector('[data-carousel-track]') : null;

      if (school && header && !section.querySelector('[data-asia-school-details]')) {
        header.insertAdjacentHTML('afterend', schoolDetailsHTML(school));
      }

      if (!winnersSection) {
        return;
      }

      var actualSubmissionCount = carouselTrack ? carouselTrack.querySelectorAll('.carousel-item:not(.carousel-item--clone)').length : school.submissionCount;

      if (!winnersSection.querySelector('[data-asia-artwork-header]')) {
        var artworkHeader = document.createElement('div');
        artworkHeader.className = 'journey-header editorial-header';
        artworkHeader.setAttribute('data-asia-artwork-header', '');
        artworkHeader.innerHTML = '<h2>Student Artwork Gallery</h2>' +
          '<p>' + actualSubmissionCount + (actualSubmissionCount === 1 ? ' student submission.' : ' student submissions.') + '</p>';
        winnersSection.insertBefore(artworkHeader, winnersSection.firstChild);
      }

      if (photoGallery) {
        var photoGalleryHeading = photoGallery.querySelector('h4');
        if (photoGalleryHeading) {
          photoGalleryHeading.remove();
        }
      }

      if (photoGallery && !winnersSection.querySelector('[data-asia-shared-gallery-callout]')) {
        var callout = document.createElement('div');
        callout.className = 'journey-callout school-profile-callout';
        callout.setAttribute('data-asia-shared-gallery-callout', '');
        callout.innerHTML = '<p>The Asia winner gallery is shared across both Nathupur school divisions.</p>' +
          '<div class="journey-actions">' +
          '<a href="asia-competition-gallery.html" class="cta-button">View Asia Gallery</a>' +
          '<a href="our-journey.html#global-map-section" class="secondary-button">Back to Map</a>' +
          '</div>';
        photoGallery.insertAdjacentElement('afterend', callout);
      }
    });
  }

  if (searchInput) {
    searchInput.addEventListener('input', filterCards);
    filterCards();
  }

  prepareSchoolProfiles();

  if (!selectedSchool) {
    selectorSections.forEach(function (section) {
      section.hidden = false;
    });
    schoolSections.forEach(function (section) {
      section.hidden = true;
    });
    return;
  }

  if (title) {
    title.textContent = selectedSchool.title;
  }

  if (subtitle) {
    subtitle.textContent = selectedSchool.subtitle;
  }

  document.title = selectedSchool.title + ' | Artists of Tomorrow';

  selectorSections.forEach(function (section) {
    section.hidden = true;
  });

  schoolSections.forEach(function (section) {
    section.hidden = section.getAttribute('data-school') !== selectedKey;
  });
})();
