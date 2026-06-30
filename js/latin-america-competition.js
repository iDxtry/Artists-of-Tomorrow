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
  var regionalPlacements = [
    {
      group: 'Ages 8-11',
      lead: 'Shared regional placements for the 8-11 age group.',
      winners: [
        {
          placement: '1st Place',
          className: 'first-place',
          name: 'Beverely Charlotte Zoe Tobarez',
          age: '11',
          country: 'Guatemala',
          school: 'Escuela José María Fuentes',
          image: 'images/latin-america-winners/regional-ages-8-11-1st-beverely-charlotte-zoe-tobarez.webp'
        },
        {
          placement: '2nd Place',
          className: 'second-place',
          name: 'Francia Anobel Posadas Ardon',
          age: '10',
          country: 'Honduras',
          school: 'C.E.B. Estado de Israel',
          image: 'images/latin-america-winners/regional-ages-8-11-2nd-francia-anobel-posadas-ardon.webp'
        },
        {
          placement: '3rd Place',
          className: 'third-place',
          name: 'Jade Yaelis Sarabia Henriquez',
          age: '8',
          country: 'El Salvador',
          school: 'Centro Escolar Colonia San Ramón',
          image: 'images/latin-america-winners/regional-ages-8-11-3rd-jade-yaelis-sarabia-henriquez.webp'
        }
      ]
    },
    {
      group: 'Ages 12-15',
      lead: 'Shared regional placements for the 12-15 age group, including a first-place tie.',
      winners: [
        {
          placement: '1st Place (Tie)',
          className: 'first-place',
          name: 'Melchor Torres Alondra',
          age: 'Ages 12-15 category',
          country: 'México',
          school: 'José Natividad Maciaz, Secundaria 253',
          image: 'images/latin-america-winners/regional-ages-12-15-1st-tie-melchor-torres-alondra-jose-natividad-maciaz.webp'
        },
        {
          placement: '1st Place (Tie)',
          className: 'first-place',
          name: 'Adriana Camila Mejía Melgar',
          age: '12',
          country: 'El Salvador',
          school: 'C.E. Walter Soundy',
          image: 'images/latin-america-winners/regional-ages-12-15-1st-tie-adriana-camila-mejia-melgar.webp'
        },
        {
          placement: '2nd Place',
          className: 'second-place',
          name: 'Lojaro Vettoietti Fuentes',
          age: 'Ages 12-15 category',
          country: 'México',
          school: 'José Natividad Maciaz, Secundaria 253',
          image: 'images/latin-america-winners/regional-ages-12-15-2nd-lojaro-vettoietti-fuentes.webp'
        },
        {
          placement: '3rd Place',
          className: 'third-place',
          name: 'Eimy Aracely Hernández Sosa',
          age: '14',
          country: 'El Salvador',
          school: 'C.E. Ramón Belloso',
          image: 'images/latin-america-winners/regional-ages-12-15-3rd-eimy-aracely-hernandez-sosa.webp'
        }
      ]
    },
    {
      group: 'Ages 16-18',
      lead: 'Shared regional placements for the 16-18 age group.',
      winners: [
        {
          placement: '1st Place',
          className: 'first-place',
          name: 'Elena Beatrice Anaya Artiga',
          age: '16',
          country: 'El Salvador',
          school: 'C.E. Capitán General Gerardo Barrios',
          image: 'images/latin-america-winners/regional-ages-16-18-1st-elena-beatrice-anaya-artiga.webp'
        },
        {
          placement: '2nd Place',
          className: 'second-place',
          name: 'Elian David Gomez',
          age: '16',
          country: 'Colombia',
          school: 'I.E. Fé y Alegría',
          image: 'images/latin-america-winners/regional-ages-16-18-2nd-elian-david-gomez.webp'
        },
        {
          placement: '3rd Place',
          className: 'third-place',
          name: 'Diego Alejandro Chávez P.',
          age: '16',
          country: 'El Salvador',
          school: 'C.E. Católica Luisa de Marillac',
          image: 'images/latin-america-winners/regional-ages-16-18-3rd-diego-alejandro-chavez-p.webp'
        }
      ]
    }
  ];
  var countryHonorableMentions = [
    {
      country: 'El Salvador',
      winners: [
        {
          placement: 'Ages 8-11 Honorable Mention',
          name: 'Janeth Alondra',
          age: '10',
          school: 'Napoleón Ríos',
          image: 'images/latin-america-winners/honorable-el-salvador-ages-8-11-janeth-alondra.webp'
        },
        {
          placement: 'Ages 12-15 Honorable Mention',
          name: 'Matias Adrian Vidas Guardado',
          age: '15',
          school: 'C.E. Capitán General Gerardo Barrios',
          image: 'images/latin-america-winners/honorable-el-salvador-ages-12-15-matias-adrian-vidas-guardado.webp'
        },
        {
          placement: 'Ages 16-18 Honorable Mention',
          name: 'Katherina Alejandra Lopez',
          age: '16',
          school: 'C.E. Walter Soundy',
          image: 'images/latin-america-winners/honorable-el-salvador-ages-16-18-katherina-alejandra-lopez.webp'
        }
      ]
    },
    {
      country: 'Honduras',
      winners: [
        {
          placement: 'Ages 8-11 Honorable Mention',
          name: 'Ordoñez Cornejo',
          age: 'Ages 8-11 category',
          school: 'Mary Flakes de Flores',
          image: 'images/latin-america-winners/honorable-honduras-ages-8-11-ordonez-cornejo.webp'
        },
        {
          placement: 'Ages 12-15 Honorable Mention',
          name: 'Yojnan',
          age: 'Ages 12-15 category',
          school: 'C.E.B.G Tim Hines',
          image: 'images/latin-america-winners/honorable-honduras-ages-12-15-yojnan.webp'
        },
        {
          placement: 'Ages 16-18 Honorable Mention',
          name: 'Astrid',
          age: 'Ages 16-18 category',
          school: 'C.E.B. José Trinidad Cabañas (Aldea Boquerón)',
          image: 'images/latin-america-winners/honorable-honduras-ages-16-18-astrid.webp'
        }
      ]
    },
    {
      country: 'Guatemala',
      winners: [
        {
          placement: 'Ages 8-11 Honorable Mention',
          name: 'Uallolet Selene Navarro López',
          age: '10',
          school: 'José María Fuentes',
          image: 'images/latin-america-winners/honorable-guatemala-ages-8-11-uallolet-selene-navarro-lopez.webp'
        },
        {
          placement: 'Ages 12-15 Honorable Mention',
          name: 'Zarissa Boror Mendez',
          age: '15',
          school: 'INEBEMEZ JM',
          image: 'images/latin-america-winners/honorable-guatemala-ages-12-15-zarissa-boror-mendez.webp'
        },
        {
          placement: 'Ages 16-18 Honorable Mention',
          name: 'Henry Ezequiel Radas',
          age: '16',
          school: 'INEBEMEZ JV',
          image: 'images/latin-america-winners/honorable-guatemala-ages-16-18-henry-ezequiel-radas.webp'
        }
      ]
    },
    {
      country: 'Panamá',
      winners: [
        {
          placement: 'Ages 8-11 Honorable Mention',
          name: 'Harolin Diaz',
          age: '11',
          school: 'Escuela Bilingüe María Ossa de Amador',
          image: 'images/latin-america-winners/honorable-panama-ages-8-11-harolin-diaz.webp'
        },
        {
          placement: 'Ages 12-15 Honorable Mention',
          name: 'Siboney Tapia',
          age: '12',
          school: 'Escuela Juan B. Sosa',
          image: 'images/latin-america-winners/honorable-panama-ages-12-15-siboney-tapia.webp'
        }
      ]
    },
    {
      country: 'Dominican Republic',
      winners: [
        {
          placement: 'Ages 8-11 Honorable Mention',
          name: 'Ruddis Villalona',
          age: '11',
          school: 'Escuela El Valiente',
          image: 'images/latin-america-winners/honorable-dominican-republic-ages-8-11-ruddis-villalona.webp'
        },
        {
          placement: 'Ages 12-15 Honorable Mention',
          name: 'Estefany',
          age: '14',
          school: 'Escuela Flora Tolentino',
          image: 'images/latin-america-winners/honorable-dominican-republic-ages-12-15-estefany.webp'
        }
      ]
    },
    {
      country: 'Costa Rica',
      winners: [
        {
          placement: 'Ages 8-11 Honorable Mention',
          name: 'Felipe Leonel Fernandez Acuna',
          age: '11',
          school: 'Hatillo Dos',
          image: 'images/latin-america-winners/honorable-costa-rica-ages-8-11-felipe-leonel-fernandez-acuna.webp'
        }
      ]
    },
    {
      country: 'México',
      winners: [
        {
          placement: 'Ages 8-11 Honorable Mention',
          name: 'Elisa Santos Dela Cruz',
          age: '9',
          school: 'Primaria Manuel Saenz',
          image: 'images/latin-america-winners/honorable-mexico-ages-8-11-elisa-santos-dela-cruz.webp'
        },
        {
          placement: 'Ages 12-15 Honorable Mention',
          name: 'Garcia Atzate Abigail',
          age: 'Ages 12-15 category',
          school: 'José Natividad Macias, Secundaria 253',
          image: 'images/latin-america-winners/honorable-mexico-ages-12-15-garcia-atzate-abigail.webp'
        }
      ]
    },
    {
      country: 'Colombia',
      winners: [
        {
          placement: 'Ages 8-11 Honorable Mention',
          name: 'Emiliana Machado',
          age: '10',
          school: 'I.E. Fé y Alegría',
          image: 'images/latin-america-winners/honorable-colombia-ages-8-11-emiliana-machado.webp'
        },
        {
          placement: 'Ages 12-15 Honorable Mention',
          name: 'Luciana Castañeda Acevedo',
          age: '12',
          school: 'Fé y Alegría',
          image: 'images/latin-america-winners/honorable-colombia-ages-12-15-luciana-castaneda-acevedo.webp'
        },
        {
          placement: 'Ages 16-18 Honorable Mention',
          name: 'Nicool Martinez',
          age: '16',
          school: 'I.E. Fé y Alegría',
          image: 'images/latin-america-winners/honorable-colombia-ages-16-18-nicool-martinez.webp'
        }
      ]
    }
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

  function winnerCard(entry, className, country) {
    var countryLine = country || entry.country;
    var detailParts = [];
    if (entry.age) {
      detailParts.push(entry.age.indexOf('Age') === 0 || entry.age.indexOf('Ages') === 0 ? entry.age : 'Age ' + entry.age);
    }
    if (countryLine) {
      detailParts.push(countryLine);
    }

    return '<article class="winner-card ' + className + ' editorial-layer" data-animate>' +
      '<div class="winner-image"><img src="' + sanitizeURL(entry.image) + '" alt="' + escapeHTML(entry.placement + ' artwork by ' + entry.name) + '" loading="lazy"></div>' +
      '<p class="winner-placement">' + escapeHTML(entry.placement) + '</p>' +
      '<h4>' + escapeHTML(entry.name) + '</h4>' +
      (detailParts.length ? '<p class="winner-meta">' + escapeHTML(detailParts.join(' · ')) + '</p>' : '') +
      (entry.school ? '<p class="winner-school">' + escapeHTML(entry.school) + '</p>' : '') +
      '</article>';
  }

  function renderPlacements() {
    if (!placementTarget) {
      return;
    }

    placementTarget.innerHTML = regionalPlacements.map(function (group) {
      return '<div class="winners-group" data-animate>' +
        '<h3>' + escapeHTML(group.group) + '</h3>' +
        '<p class="age-group-lead">' + escapeHTML(group.lead) + '</p>' +
        '<div class="winner-grid" data-animate-group>' +
        group.winners.map(function (winner) {
          return winnerCard(winner, winner.className || 'honorable-mention');
        }).join('') +
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
      '<p class="section-lead">Honorable mentions are shown by country and age category when a honoree was named.</p>' +
      '</div>' +
      countryHonorableMentions.map(function (countryGroup) {
        var countryCounts = artworkCounts.countries[countryGroup.country];
        var lead = countryCounts
          ? countryCounts.submissions + ' submissions across ' + countryCounts.schools + (countryCounts.schools === 1 ? ' school.' : ' schools.')
          : countryGroup.winners.length + (countryGroup.winners.length === 1 ? ' honorable mention.' : ' honorable mentions.');
        return '<div class="winners-group" data-animate>' +
          '<h3>' + escapeHTML(countryGroup.country) + '</h3>' +
          '<p class="age-group-lead">' + escapeHTML(lead) + '</p>' +
          '<div class="winner-grid" data-animate-group>' +
          countryGroup.winners.map(function (winner) {
            return winnerCard(winner, 'honorable-mention', countryGroup.country);
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
