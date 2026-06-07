#!/usr/bin/env node

'use strict';

const crypto = require('crypto');
const fs = require('fs');
const os = require('os');
const path = require('path');
const { pathToFileURL } = require('url');
const { execFileSync } = require('child_process');
const vm = require('vm');
const sharp = require('sharp');

const repoRoot = path.resolve(__dirname, '..');
const archiveParent = path.resolve(repoRoot, '..');
const outputRoot = path.join(repoRoot, 'images', 'latin-america');
const manifestPath = path.join(repoRoot, 'js', 'latin-america-gallery-data.js');
const reportsRoot = path.join(repoRoot, 'reports');
const reviewRoot = path.join(reportsRoot, 'latin-america-gallery-review');
const reviewSheetPath = path.join(reviewRoot, 'dominican-republic-contact-sheet.webp');
const reportPath = path.join(reportsRoot, 'latin-america-gallery-report.md');
const reviewReportPath = path.join(reportsRoot, 'latin-america-gallery-review.md');

const MAX_DIMENSION = 1600;
const WEBP_QUALITY = 80;
const PDF_DPI = 144;
const IMAGE_EXTENSIONS = new Set(['.jpg', '.jpeg', '.png', '.heic', '.webp']);
const DISPLAY_EXTENSIONS = new Set([...IMAGE_EXTENSIONS, '.pdf']);
const pdfjsModulePath = path.join(path.dirname(require.resolve('pdfjs-dist/package.json')), 'legacy', 'build', 'pdf.mjs');
let pdfjsPromise;

function canonical(value) {
  return value
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, ' ')
    .trim()
    .replace(/\s+/g, ' ');
}

function comparePaths(left, right) {
  return left.localeCompare(right, 'en', { numeric: true, sensitivity: 'base' });
}

function findArchiveRoot() {
  const expected = canonical('DIBUJOS ESCANEADOS POR PAIS');
  const entry = fs.readdirSync(archiveParent, { withFileTypes: true })
    .find(item => item.isDirectory() && canonical(item.name) === expected);

  if (!entry) {
    throw new Error('Could not locate the DIBUJOS ESCANEADOS POR PAIS archive beside the repository.');
  }

  return path.join(archiveParent, entry.name);
}

const archiveRoot = findArchiveRoot();

function resolveLoose(relativePath) {
  let current = archiveRoot;

  relativePath.split('/').filter(Boolean).forEach(part => {
    const entries = fs.readdirSync(current, { withFileTypes: true });
    const matches = entries.filter(entry => canonical(entry.name) === canonical(part));

    if (matches.length !== 1) {
      throw new Error(`Expected one source match for "${relativePath}" at "${part}", found ${matches.length}.`);
    }

    current = path.join(current, matches[0].name);
  });

  return current;
}

function loadSchools() {
  const sandbox = { window: {} };
  const dataPath = path.join(repoRoot, 'js', 'school-data.js');
  vm.runInNewContext(fs.readFileSync(dataPath, 'utf8'), sandbox, { filename: dataPath });
  return sandbox.window.aotLatinAmericaSchools || [];
}

const schools = loadSchools();

const schoolSources = {
  // El Salvador
  'ce-juan-ramon-jimenez': ['DIBUJOS EL SALVADOR/Centro Escolar Juan Ramon Jimenez'],
  'ce-republica-de-canada': ['DIBUJOS EL SALVADOR/Centro Escolar Republica de Canada'],
  'ce-ramon-belloso': ['DIBUJOS EL SALVADOR/Centro Escolar General Ramon Belloso'],
  'ce-capitan-general-gerardo-barrios': ['DIBUJOS EL SALVADOR/Complejo Educativo Gerardo Barrios'],
  'ce-colonia-san-ramon': ['DIBUJOS EL SALVADOR/Centro Escolar Colonia San Ramon'],
  'ce-republica-del-peru': ['DIBUJOS EL SALVADOR/Centro Escolar Republica de Peru'],
  'ce-amalia-viuda-de-menendez': ['DIBUJOS EL SALVADOR/Centro Escolar Amalia Viuda de Menendez'],
  'escuela-parroquial-san-jose-de-la-montana': ['DIBUJOS EL SALVADOR/Escuela Parroquial San Jose de la Montana'],
  'ce-walter-soundy': ['DIBUJOS EL SALVADOR/Complejo Educativo Walter Soundy'],
  'escuela-urbana-de-ninas-margarita-duran': ['DIBUJOS EL SALVADOR/Centro Escolar Margarita Duran'],
  'ce-catolica-luisa-de-marillac': ['DIBUJOS EL SALVADOR/Complejo Educativo Catolico Luisa de Marillac'],
  'ce-herberth-de-sola': ['DIBUJOS EL SALVADOR/Centro Escolar Hebert de Sola'],
  'ce-caserio-villa-esperanza': ['DIBUJOS EL SALVADOR/Centro Escolar Caserio Villa la Esperanza'],
  'ce-san-francisco': ['DIBUJOS EL SALVADOR/Centro Escolar San Francisco'],
  'ce-napoleon-rios': ['DIBUJOS EL SALVADOR/Centro Escolar Napoleon Rios'],
  'ce-dr-humberto-quinteros': ['DIBUJOS EL SALVADOR/Centro Escolar Doctor Humberto Quintero'],

  // Honduras
  'ceb-las-americas': ['DIBUJOS HONDURAS/CEBG LAS AMERICAS'],
  'cebg-dr-modesto-rodas-alvarado': ['DIBUJOS HONDURAS/CEBG Dr. Modesto Rodas Alvarado'],
  'ceb-estado-de-israel': ['DIBUJOS HONDURAS/CEBG ESTADO DE ISRAEL'],
  'republica-de-china': ['DIBUJOS HONDURAS/CEBG Republica de China'],
  'ceb-tim-hines': ['DIBUJOS HONDURAS/CEBG Tim Hines'],
  'ceb-republica-de-honduras': ['DIBUJOS HONDURAS/C.E.B.G Republica de Honduras'],
  'ceb-dr-ramon-rosa-2': ['DIBUJOS HONDURAS/CEBG DR. RAMON ROSA N 2'],
  'ceb-manuel-bonilla': ['DIBUJOS HONDURAS/CEB. MANUEL BONILLA'],
  'ceb-mary-flakes-de-flores': ['DIBUJOS HONDURAS/CEB. MARY FLAKES DE FLORES.pdf'],
  'ceb-ing-roberto-larios-silva': ['DIBUJOS HONDURAS/CEB. INg Roberto Larios Silva'],
  'ceb-jose-trinidad-cabanas-aldea-boqueron': ['DIBUJOS HONDURAS/CEB. JOSE TRINIDAD CABANAS B.'],
  'ceb-jose-castro-lopez': ['DIBUJOS HONDURAS/CEB. JOSE CASTRO LOPEZ'],
  'ceb-jose-trinidad-cabanas-villa-nueva': ['DIBUJOS HONDURAS/CEB JOSE TRINIDAD CABANAS - Villanueva'],
  'ceb-marcelino-pineda-lopez': ['DIBUJOS HONDURAS/CEB MARCELINO PINEDA LOPEZ'],

  // Guatemala
  'escuela-bertha-herrera-de-ruano-jv': ['DIBUJOS GUATEMALA/Escuela Bertha Herrera de Ruano JV'],
  'escuela-eduardo-caceres': ['DIBUJOS GUATEMALA/Escuela Eduardo Caceres'],
  'escuela-el-mezquital-ii-jm': ['DIBUJOS GUATEMALA/Escuela El Mezquital II JM'],
  'escuela-el-mezquital-ii-jv': ['DIBUJOS GUATEMALA/Escuela El Mezquital II JV'],
  'escuela-jose-maria-fuentes': ['DIBUJOS GUATEMALA/Escuela Jose Maria Fuentes'],
  'escuela-juan-de-francisco-marti': ['DIBUJOS GUATEMALA/Escuela Juan de Francisco Marti'],
  'escuela-pedro-valenzuela': ['DIBUJOS GUATEMALA/Escuela Pedro Valenzuela'],
  'escuela-republica-de-uruguay': ['DIBUJOS GUATEMALA/Escuela Republica del Uruguay'],
  'escuela-tierra-blanca': ['DIBUJOS GUATEMALA/Escuela Tierra Blanca'],
  'inebemez-jm': ['DIBUJOS GUATEMALA/INEBEMEZ JM'],
  'inebemez-jv': ['DIBUJOS GUATEMALA/INEBEMEZ JV'],
  'instituto-oscar-berger': ['DIBUJOS GUATEMALA/Instituto Oscar Berger'],
  'escuela-el-mezquital-i-jm': ['DIBUJOS GUATEMALA/Mezquital 1 JM'],
  'escuela-el-mezquital-i-jv': ['DIBUJOS GUATEMALA/Mezquital 1 JV'],

  // Panama
  'escuela-juan-b-sosa': ['DIBUJOS PANAMA/Escuela Juan B. Sosa'],
  'escuela-maria-ossa-de-amador': ['DIBUJOS PANAMA/Escuela Maria Ossa de Amador'],

  // Dominican Republic. El Valiente and Los Alifonsos stay empty until the review list is resolved.
  'escuela-flora-tolentino': ['DIBUJOS REP DOMINICANA/ESCUELA FLORA TOLENTINO'],
  'escuela-el-valiente': [],
  'escuela-los-alifonsos': [],

  // Costa Rica
  'escuela-hatillo-2': ['DIBUJOS COSTA RICA/Escuela Hatillo 2'],
  'escuela-finca-la-capri': ['DIBUJOS COSTA RICA/Escuela Finca La Capri'],

  // Mexico
  'primaria-manuel-saenz': ['DIBUJOS MEXICO/Ciudad de Mexico/PRIM . MANUEL SAENZ TEMA. NATURALEZA 8 A 11 ANOS'],
  'primaria-rafael-arevalo-martinez': ['DIBUJOS MEXICO/Ciudad de Mexico/Primaria Rafael Arevalo Martinez/Dibujos primaria Rafael Arevalo'],
  'secundaria-253': ['DIBUJOS MEXICO/Ciudad de Mexico/SEC 253 TEMA. MOVIMIENTO 12 A 15 ANOS'],
  'primaria-marcos-e-becerra': ['DIBUJOS MEXICO/Tapachula/Primaria Marcos E. Becerra'],
  'primaria-vicente-guerrero-s': ['DIBUJOS MEXICO/Tapachula/Primaria Vicente Guerrero S.'],
  'telesecundaria-quetzalcoatl': ['DIBUJOS MEXICO/Tapachula/Telesecundaria Quetzalcoatl'],
  'escuela-primaria-5-de-febrero': ['DIBUJOS MEXICO/Tijuana/DIBUJOS POR ESCUELA/ESC. PRIM. 5 DE FEBRERO'],
  'escuela-primaria-lazaro-cardenas': ['DIBUJOS MEXICO/Tijuana/DIBUJOS POR ESCUELA/ESC. PRIM. LAZARO CARDENAS'],
  'escuela-primaria-lic-gabriel-ramos-millan': ['DIBUJOS MEXICO/Tijuana/DIBUJOS POR ESCUELA/ESC. PRIM. LIC. GABRIEL RAMOS MILLAN'],

  // Colombia
  'ie-fe-y-alegria': ['DIBUJOS COLOMBIA/I.E. Fe y Alegria'],
  'ie-barrio-paris': ['DIBUJOS COLOMBIA/I.E. Barrio Paris']
};

const regionalSources = [
  'DIBUJOS COLOMBIA/fotos proceso dibujo.pdf',
  'DIBUJOS COSTA RICA/Fotos del proceso',
  'DIBUJOS EL SALVADOR/Fotos promocion y desarrollo',
  'DIBUJOS MEXICO/Ciudad de Mexico/Primaria Rafael Arevalo Martinez/Fotografias concurso de dibujo Rafael Arevalo',
  'DIBUJOS MEXICO/Tapachula/Evidencias',
  'DIBUJOS MEXICO/Tijuana/FOTOS'
];

const dominicanReviewSource = 'DIBUJOS REP DOMINICANA/Escuela Valiente y Escuela Los Alifonsos';

// Reviewed against reports/latin-america-gallery-review/dominican-republic-contact-sheet.webp.
const dominicanAssignments = {
  1: 'escuela-el-valiente',
  2: 'escuela-el-valiente',
  3: 'escuela-el-valiente',
  4: 'escuela-el-valiente',
  5: 'escuela-los-alifonsos',
  6: 'escuela-los-alifonsos',
  7: 'escuela-los-alifonsos',
  8: 'escuela-los-alifonsos',
  9: 'escuela-el-valiente',
  10: 'escuela-los-alifonsos',
  11: 'escuela-los-alifonsos',
  12: 'escuela-los-alifonsos',
  13: 'escuela-los-alifonsos',
  14: 'escuela-los-alifonsos',
  15: 'escuela-el-valiente',
  16: 'escuela-los-alifonsos',
  17: 'escuela-los-alifonsos',
  18: 'escuela-los-alifonsos'
};

function listDisplayFiles(sourcePath) {
  const stat = fs.statSync(sourcePath);
  if (stat.isFile()) {
    return DISPLAY_EXTENSIONS.has(path.extname(sourcePath).toLowerCase()) ? [sourcePath] : [];
  }

  return fs.readdirSync(sourcePath, { withFileTypes: true })
    .flatMap(entry => listDisplayFiles(path.join(sourcePath, entry.name)))
    .sort(comparePaths);
}

function archiveRelative(filePath) {
  return path.relative(archiveRoot, filePath).split(path.sep).join('/');
}

function manifestRelative(filePath) {
  return path.relative(repoRoot, filePath).split(path.sep).join('/');
}

function assetName(sourceFile, pageNumber) {
  const digest = crypto.createHash('sha1').update(archiveRelative(sourceFile)).digest('hex').slice(0, 14);
  return `${digest}-p${String(pageNumber).padStart(3, '0')}.webp`;
}

async function getPdfPageCount(sourceFile) {
  if (!pdfjsPromise) {
    pdfjsPromise = import(pathToFileURL(pdfjsModulePath).href);
  }
  const pdfjs = await pdfjsPromise;
  const document = await pdfjs.getDocument({
    data: new Uint8Array(fs.readFileSync(sourceFile)),
    disableWorker: true
  }).promise;

  try {
    return document.numPages;
  } finally {
    await document.destroy();
  }
}

async function rasterizePdf(sourceFile, pageCount) {
  const tempDir = fs.mkdtempSync(path.join(os.tmpdir(), 'aot-pdf-'));

  if (pageCount === 1) {
    const outputFile = path.join(tempDir, 'page-0001.jpg');
    execFileSync('sips', ['-s', 'format', 'jpeg', sourceFile, '--out', outputFile], { stdio: 'ignore' });
    return {
      files: [outputFile],
      dispose: () => fs.rmSync(tempDir, { recursive: true, force: true })
    };
  }

  const pattern = path.join(tempDir, 'page-%04d.png');

  execFileSync('gs', [
    '-q',
    '-dSAFER',
    '-dBATCH',
    '-dNOPAUSE',
    '-sDEVICE=png16m',
    `-r${PDF_DPI}`,
    `-sOutputFile=${pattern}`,
    sourceFile
  ]);

  return {
    files: fs.readdirSync(tempDir)
      .filter(name => name.endsWith('.png'))
      .sort(comparePaths)
      .map(name => path.join(tempDir, name)),
    dispose: () => fs.rmSync(tempDir, { recursive: true, force: true })
  };
}

function convertHeic(sourceFile) {
  const tempDir = fs.mkdtempSync(path.join(os.tmpdir(), 'aot-heic-'));
  execFileSync('qlmanage', ['-t', '-s', String(MAX_DIMENSION), '-o', tempDir, sourceFile], { stdio: 'ignore' });
  const files = fs.readdirSync(tempDir)
    .filter(name => name.toLowerCase().endsWith('.png'))
    .map(name => path.join(tempDir, name));

  if (files.length !== 1) {
    fs.rmSync(tempDir, { recursive: true, force: true });
    throw new Error(`Expected one Quick Look thumbnail for HEIC file: ${archiveRelative(sourceFile)}`);
  }

  return {
    files,
    dispose: () => fs.rmSync(tempDir, { recursive: true, force: true })
  };
}

async function writeOptimizedImage(inputFile, outputFile) {
  fs.mkdirSync(path.dirname(outputFile), { recursive: true });
  await sharp(inputFile)
    .rotate()
    .resize({
      width: MAX_DIMENSION,
      height: MAX_DIMENSION,
      fit: 'inside',
      withoutEnlargement: true
    })
    .webp({ quality: WEBP_QUALITY })
    .toFile(outputFile);
}

async function convertSourceFile(sourceFile, destinationDir) {
  const extension = path.extname(sourceFile).toLowerCase();
  const pageCount = extension === '.pdf' ? await getPdfPageCount(sourceFile) : 1;
  const expectedFiles = Array.from({ length: pageCount }, (_, index) => (
    path.join(destinationDir, assetName(sourceFile, index + 1))
  ));

  if (expectedFiles.every(outputFile => fs.existsSync(outputFile))) {
    return expectedFiles;
  }

  const inputs = extension === '.pdf'
    ? await rasterizePdf(sourceFile, pageCount)
    : extension === '.heic'
      ? convertHeic(sourceFile)
      : {
          files: [sourceFile],
          dispose: () => {}
        };

  try {
    const items = [];
    for (let index = 0; index < inputs.files.length; index += 1) {
      const outputFile = path.join(destinationDir, assetName(sourceFile, index + 1));
      await writeOptimizedImage(inputs.files[index], outputFile);
      items.push(outputFile);
    }
    return items;
  } finally {
    inputs.dispose();
  }
}

async function mapLimit(items, limit, mapper) {
  const results = new Array(items.length);
  let nextIndex = 0;

  async function worker() {
    while (true) {
      const index = nextIndex;
      nextIndex += 1;
      if (index >= items.length) {
        return;
      }
      results[index] = await mapper(items[index], index);
    }
  }

  await Promise.all(Array.from({ length: Math.min(limit, items.length) }, worker));
  return results;
}

function createGalleryItems(outputFiles, galleryLabel) {
  return outputFiles.map((outputFile, index) => ({
    src: manifestRelative(outputFile),
    alt: `${galleryLabel} artwork ${index + 1}`,
    caption: `Artwork ${index + 1}`
  }));
}

function registerAttribution(registry, filePath, category) {
  const resolved = path.resolve(filePath);
  const existing = registry.get(resolved);
  if (existing && existing !== category) {
    throw new Error(`Source file is assigned twice: ${archiveRelative(filePath)} (${existing}, ${category})`);
  }
  registry.set(resolved, category);
}

async function convertGallery(sourceFiles, destinationDir, galleryLabel) {
  const batches = await mapLimit(sourceFiles, 4, sourceFile => convertSourceFile(sourceFile, destinationDir));
  return createGalleryItems(batches.flat(), galleryLabel);
}

function svgLabel(text, width, height) {
  return Buffer.from(
    `<svg width="${width}" height="${height}" xmlns="http://www.w3.org/2000/svg">` +
    '<rect width="100%" height="100%" fill="#fff8f5"/>' +
    `<text x="20" y="34" fill="#432b24" font-family="Arial, sans-serif" font-size="24" font-weight="700">${text}</text>` +
    '</svg>'
  );
}

async function createDominicanReview(reviewFiles) {
  const previewsDir = path.join(reviewRoot, 'dominican-republic-previews');
  fs.mkdirSync(previewsDir, { recursive: true });

  const tileWidth = 400;
  const tileHeight = 540;
  const columns = 3;
  const previews = [];

  for (let index = 0; index < reviewFiles.length; index += 1) {
    const sourceFile = reviewFiles[index];
    const rasterized = await rasterizePdf(sourceFile);
    const previewPath = path.join(previewsDir, `${String(index + 1).padStart(2, '0')}.webp`);

    try {
      const artwork = await sharp(rasterized.files[0])
        .rotate()
        .resize({ width: 360, height: 460, fit: 'contain', background: '#ffffff' })
        .webp({ quality: 76 })
        .toBuffer();

      await sharp({
        create: {
          width: tileWidth,
          height: tileHeight,
          channels: 3,
          background: '#fff8f5'
        }
      })
        .composite([
          { input: svgLabel(`#${index + 1}`, tileWidth, 60), top: 0, left: 0 },
          { input: artwork, top: 64, left: 20 }
        ])
        .webp({ quality: 82 })
        .toFile(previewPath);

      previews.push(previewPath);
    } finally {
      rasterized.dispose();
    }
  }

  const rows = Math.ceil(previews.length / columns);
  const composites = previews.map((previewPath, index) => ({
    input: previewPath,
    left: (index % columns) * tileWidth,
    top: Math.floor(index / columns) * tileHeight
  }));

  await sharp({
    create: {
      width: columns * tileWidth,
      height: rows * tileHeight,
      channels: 3,
      background: '#f5ebe7'
    }
  })
    .composite(composites)
    .webp({ quality: 88 })
    .toFile(reviewSheetPath);
}

function totalBytes(directory) {
  if (!fs.existsSync(directory)) {
    return 0;
  }

  return fs.readdirSync(directory, { withFileTypes: true })
    .reduce((total, entry) => {
      const fullPath = path.join(directory, entry.name);
      return total + (entry.isDirectory() ? totalBytes(fullPath) : fs.statSync(fullPath).size);
    }, 0);
}

function formatBytes(bytes) {
  const megabytes = bytes / (1024 * 1024);
  return `${megabytes.toFixed(1)} MB`;
}

async function main() {
  if (!process.argv.includes('--resume')) {
    fs.rmSync(outputRoot, { recursive: true, force: true });
  }
  fs.rmSync(reviewRoot, { recursive: true, force: true });
  fs.mkdirSync(outputRoot, { recursive: true });
  fs.mkdirSync(reportsRoot, { recursive: true });

  const attributions = new Map();
  const schoolManifest = Object.fromEntries(schools.map(school => [school.slug, []]));

  const unknownSlugs = Object.keys(schoolSources).filter(slug => !schoolManifest[slug]);
  const unmappedSlugs = schools.map(school => school.slug).filter(slug => !Object.hasOwn(schoolSources, slug));
  if (unknownSlugs.length || unmappedSlugs.length) {
    throw new Error(`School source map mismatch. Unknown: ${unknownSlugs.join(', ')}. Missing: ${unmappedSlugs.join(', ')}.`);
  }

  for (const school of schools) {
    const sources = schoolSources[school.slug].map(resolveLoose);
    const sourceFiles = sources.flatMap(listDisplayFiles).sort(comparePaths);
    sourceFiles.forEach(file => registerAttribution(attributions, file, `school:${school.slug}`));
    schoolManifest[school.slug] = await convertGallery(
      sourceFiles,
      path.join(outputRoot, 'schools', school.slug),
      school.name
    );
    console.log(`${school.slug}: ${schoolManifest[school.slug].length} artwork images`);
  }

  const regionalFiles = regionalSources.map(resolveLoose).flatMap(listDisplayFiles).sort(comparePaths);
  regionalFiles.forEach(file => registerAttribution(attributions, file, 'regional'));
  const regionalPhotos = await convertGallery(regionalFiles, path.join(outputRoot, 'regional'), 'Latin America regional event');
  regionalPhotos.forEach((item, index) => {
    item.alt = `Latin America regional event photo ${index + 1}`;
    item.caption = `Regional event photo ${index + 1}`;
  });

  const reviewFiles = listDisplayFiles(resolveLoose(dominicanReviewSource)).sort(comparePaths);
  reviewFiles.forEach(file => registerAttribution(attributions, file, 'dominican-review'));
  await createDominicanReview(reviewFiles);

  const assignments = Object.entries(dominicanAssignments);
  if (assignments.length) {
    for (const [number, slug] of assignments) {
      const sourceFile = reviewFiles[Number(number) - 1];
      if (!sourceFile || !['escuela-el-valiente', 'escuela-los-alifonsos'].includes(slug)) {
        throw new Error(`Invalid Dominican Republic review assignment: ${number} -> ${slug}`);
      }
      const existingCount = schoolManifest[slug].length;
      const outputFiles = await convertSourceFile(sourceFile, path.join(outputRoot, 'schools', slug));
      schoolManifest[slug].push(...outputFiles.map((outputFile, index) => ({
        src: manifestRelative(outputFile),
        alt: `${schools.find(school => school.slug === slug).name} artwork ${existingCount + index + 1}`,
        caption: `Artwork ${existingCount + index + 1}`
      })));
    }
  }

  const allArchiveDisplayFiles = listDisplayFiles(archiveRoot);
  const unassignedFiles = allArchiveDisplayFiles
    .filter(file => !attributions.has(path.resolve(file)))
    .map(archiveRelative);
  const unresolvedReviewFiles = reviewFiles
    .filter((file, index) => !Object.hasOwn(dominicanAssignments, index + 1))
    .map(archiveRelative);
  const artworkImageCount = Object.values(schoolManifest).reduce((sum, items) => sum + items.length, 0);
  const emptySchools = schools.filter(school => schoolManifest[school.slug].length === 0);
  const outputBytes = totalBytes(outputRoot);

  const manifest = {
    schools: schoolManifest,
    regionalPhotos
  };

  fs.writeFileSync(
    manifestPath,
    `(function () {\n  'use strict';\n\n  window.aotLatinAmericaGalleryData = ${JSON.stringify(manifest, null, 2)};\n})();\n`
  );

  fs.writeFileSync(
    reviewReportPath,
    [
      '# Dominican Republic Gallery Review',
      '',
      'The source archive combines Escuela El Valiente and Escuela Los Alifonsos without machine-readable labels.',
      'Use the numbered contact sheet to classify only scans with a visible school clue. Leave uncertain scans unpublished.',
      '',
      `Contact sheet: [dominican-republic-contact-sheet.webp](./latin-america-gallery-review/dominican-republic-contact-sheet.webp)`,
      '',
      '| Number | Source scan | Published school |',
      '| --- | --- | --- |',
      ...reviewFiles.map((file, index) => {
        const assignment = dominicanAssignments[index + 1] || 'Pending visual review';
        return `| ${index + 1} | ${path.basename(file)} | ${assignment} |`;
      }),
      ''
    ].join('\n')
  );

  fs.writeFileSync(
    reportPath,
    [
      '# Latin America Gallery Build Report',
      '',
      `- School profiles: ${schools.length}`,
      `- Published school artwork images: ${artworkImageCount}`,
      `- Regional event photos: ${regionalPhotos.length}`,
      `- Optimized site asset size: ${formatBytes(outputBytes)}`,
      `- Empty school galleries: ${emptySchools.length}`,
      `- Dominican Republic scans pending visual review: ${unresolvedReviewFiles.length}`,
      `- Unassigned display files outside the review list: ${unassignedFiles.length}`,
      '',
      '## Empty School Galleries',
      '',
      ...(emptySchools.length ? emptySchools.map(school => `- ${school.name} (${school.slug})`) : ['- None']),
      '',
      '## Pending Dominican Republic Review',
      '',
      ...(unresolvedReviewFiles.length ? unresolvedReviewFiles.map(file => `- ${file}`) : ['- None']),
      '',
      '## Unassigned Display Files',
      '',
      ...(unassignedFiles.length ? unassignedFiles.map(file => `- ${file}`) : ['- None']),
      ''
    ].join('\n')
  );

  console.log(`regionalPhotos: ${regionalPhotos.length}`);
  console.log(`artworkImages: ${artworkImageCount}`);
  console.log(`emptySchools: ${emptySchools.length}`);
  console.log(`dominicanReviewPending: ${unresolvedReviewFiles.length}`);
  console.log(`unassignedFiles: ${unassignedFiles.length}`);
  console.log(`optimizedOutput: ${formatBytes(outputBytes)}`);
}

main().catch(error => {
  console.error(error.stack || error.message);
  process.exitCode = 1;
});
