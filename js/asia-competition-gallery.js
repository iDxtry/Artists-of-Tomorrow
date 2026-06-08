(function () {
  'use strict';

  var winnerTarget = document.querySelector('[data-asia-winner-groups]');
  var photoTrack = document.querySelector('[data-asia-photo-track]');
  var photoCount = document.querySelector('[data-asia-photo-count]');

  var groups = [
    {
      title: 'Middle School',
      lead: 'Shared Asia placements for the middle school division.',
      winners: [
        { title: '1st Place', className: 'first-place', src: 'images/1stPlaceMiddleSchool.jpg', webp: 'images/1stPlaceMiddleSchool.webp', alt: 'Artwork by the 1st place middle school winner' },
        { title: '2nd Place', className: 'second-place', src: 'images/2ndPlaceMiddleSchool.jpeg', webp: 'images/2ndPlaceMiddleSchool.webp', alt: 'Artwork by the 2nd place middle school winner' },
        { title: '3rd Place', className: 'third-place', src: 'images/3rdPlaceMiddleSchool.jpg', webp: 'images/3rdPlaceMiddleSchool.webp', alt: 'Artwork by the 3rd place middle school winner' },
        { title: 'Honorable Mention 1', className: 'honorable-mention', src: 'images/1stHonorableMentionMiddleSchool.jpeg', webp: 'images/1stHonorableMentionMiddleSchool.webp', alt: 'Artwork recognized with honorable mention in the middle school competition' },
        { title: 'Honorable Mention 2', className: 'honorable-mention', src: 'images/2ndHonorableMentionMiddleSchool.jpeg', webp: 'images/2ndHonorableMentionMiddleSchool.webp', alt: 'Artwork highlighted as an honorable mention in the middle school competition' },
        { title: 'Honorable Mention 3', className: 'honorable-mention', src: 'images/3rdHonorableMentionMiddleSchool.jpeg', webp: 'images/3rdHonorableMentionMiddleSchool.webp', alt: 'Artwork earning honorable mention recognition in the middle school competition' }
      ]
    },
    {
      title: 'High School',
      lead: 'Shared Asia placements for the high school division.',
      winners: [
        { title: '1st Place', className: 'first-place', src: 'images/1stPlaceHighSchool.jpeg', webp: 'images/1stPlaceHighSchool.webp', alt: 'Artwork by the 1st place high school winner' },
        { title: '2nd Place', className: 'second-place', src: 'images/2ndPlaceHighSchool.jpeg', webp: 'images/2ndPlaceHighSchool.webp', alt: 'Artwork by the 2nd place high school winner' },
        { title: '3rd Place', className: 'third-place', src: 'images/3rdPlaceHighSchool.jpeg', webp: 'images/3rdPlaceHighSchool.webp', alt: 'Artwork by the 3rd place high school winner' },
        { title: 'Honorable Mention 1', className: 'honorable-mention', src: 'images/1stHonorableMentionHighSchool.jpeg', webp: 'images/1stHonorableMentionHighSchool.webp', alt: 'Artwork from the honorable mention high school artist' },
        { title: 'Honorable Mention 2', className: 'honorable-mention', src: 'images/2ndHonorableMentionHighSchool.jpeg', webp: 'images/2ndHonorableMentionHighSchool.webp', alt: 'Artwork from the second honorable mention high school artist' },
        { title: 'Honorable Mention 3', className: 'honorable-mention', src: 'images/3rdHonorableMentionHighSchool.jpeg', webp: 'images/3rdHonorableMentionHighSchool.webp', alt: 'Artwork from the third honorable mention high school artist' }
      ]
    }
  ];

  var photos = [
    { src: 'images/compnathupur/1stPlaceMiddleSchoolDisplay.webp', webp: 'images/compnathupur/1stPlaceMiddleSchoolDisplay.webp', alt: 'Middle school 1st place recognition photo', caption: 'Middle school recognition' },
    { src: 'images/compnathupur/2ndPlaceMiddleSchoolDisplay.webp', webp: 'images/compnathupur/2ndPlaceMiddleSchoolDisplay.webp', alt: 'Middle school 2nd place recognition photo', caption: 'Middle school recognition' },
    { src: 'images/compnathupur/3rdPlaceMiddleSchoolDisplay.webp', webp: 'images/compnathupur/3rdPlaceMiddleSchoolDisplay.webp', alt: 'Middle school 3rd place recognition photo', caption: 'Middle school recognition' },
    { src: 'images/compnathupur/1stPlaceHighSchoolDisplay.webp', webp: 'images/compnathupur/1stPlaceHighSchoolDisplay.webp', alt: 'High school 1st place recognition photo', caption: 'High school recognition' },
    { src: 'images/compnathupur/2ndPlaceHighSchoolDisplay.webp', webp: 'images/compnathupur/2ndPlaceHighSchoolDisplay.webp', alt: 'High school 2nd place recognition photo', caption: 'High school recognition' },
    { src: 'images/compnathupur/3rdPlaceHighSchoolDisplay.webp', webp: 'images/compnathupur/3rdPlaceHighSchoolDisplay.webp', alt: 'High school 3rd place recognition photo', caption: 'High school recognition' },
    { src: 'images/compnathupur/PHOTO-2025-09-24-06-56-19.webp', webp: 'images/compnathupur/PHOTO-2025-09-24-06-56-19.webp', alt: 'Asia middle school competition event photo', caption: 'Middle school event photo' },
    { src: 'images/compnathupur/PHOTO-2025-09-24-09-55-20.webp', webp: 'images/compnathupur/PHOTO-2025-09-24-09-55-20.webp', alt: 'Asia high school competition event photo', caption: 'High school event photo' },
    { src: 'images/compnathupur/PHOTO-2025-09-24-11-47-14.webp', webp: 'images/compnathupur/PHOTO-2025-09-24-11-47-14.webp', alt: 'Asia high school award event photo', caption: 'High school event photo' }
  ];

  function escapeHTML(value) {
    return String(value)
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;')
      .replace(/'/g, '&#39;');
  }

  function picture(entry) {
    return '<picture><source srcset="' + escapeHTML(entry.webp) + '" type="image/webp"><img src="' + escapeHTML(entry.src) + '" alt="' + escapeHTML(entry.alt) + '" loading="lazy"></picture>';
  }

  function winnerCard(entry) {
    return '<article class="winner-card ' + escapeHTML(entry.className) + ' editorial-layer" data-animate>' +
      '<div class="winner-image">' + picture(entry) + '</div>' +
      '<h4>' + escapeHTML(entry.title) + '</h4>' +
      '</article>';
  }

  if (winnerTarget) {
    winnerTarget.innerHTML = groups.map(function (group) {
      return '<div class="winners-group" data-animate>' +
        '<h3>' + escapeHTML(group.title) + '</h3>' +
        '<p class="age-group-lead">' + escapeHTML(group.lead) + '</p>' +
        '<div class="winner-grid" data-animate-group>' +
        group.winners.map(winnerCard).join('') +
        '</div>' +
        '</div>';
    }).join('');
  }

  if (photoTrack) {
    photoTrack.innerHTML = photos.map(function (entry) {
      return '<figure class="carousel-item archival-card" data-caption="' + escapeHTML(entry.caption) + '">' +
        picture(entry) +
        '</figure>';
    }).join('');
  }

  if (photoCount) {
    photoCount.textContent = photos.length + ' Asia event photos.';
  }
})();
