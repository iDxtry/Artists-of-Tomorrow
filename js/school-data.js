(function () {
  'use strict';

  window.aotLatinAmericaSchools = [
    // El Salvador (16)
    { slug: 'ce-juan-ramon-jimenez', name: 'C.E. Juan Ram\u00f3n Jim\u00e9nez', country: 'El Salvador' },
    { slug: 'ce-republica-de-canada', name: 'C.E. Rep\u00fablica de Canad\u00e1', country: 'El Salvador' },
    { slug: 'ce-ramon-belloso', name: 'C.E. Ram\u00f3n Belloso', country: 'El Salvador' },
    { slug: 'ce-capitan-general-gerardo-barrios', name: 'C.E. Capit\u00e1n General Gerardo Barrios', country: 'El Salvador' },
    { slug: 'ce-colonia-san-ramon', name: 'C.E. Colonia San Ram\u00f3n', country: 'El Salvador' },
    { slug: 'ce-republica-del-peru', name: 'C.E. Rep\u00fablica del Per\u00fa', country: 'El Salvador' },
    { slug: 'ce-amalia-viuda-de-menendez', name: 'C.E. Amalia Viuda de Men\u00e9ndez', country: 'El Salvador' },
    { slug: 'escuela-parroquial-san-jose-de-la-montana', name: 'Escuela Parroquial San Jos\u00e9 de la Monta\u00f1a', country: 'El Salvador' },
    { slug: 'ce-walter-soundy', name: 'C.E. Walter Soundy', country: 'El Salvador' },
    { slug: 'escuela-urbana-de-ninas-margarita-duran', name: 'Escuela Urbana de Ni\u00f1as Margarita Dur\u00e1n', country: 'El Salvador' },
    { slug: 'ce-catolica-luisa-de-marillac', name: 'C.E. Cat\u00f3lica Luisa de Marillac', country: 'El Salvador' },
    { slug: 'ce-herberth-de-sola', name: 'C.E. Herberth de Sola', country: 'El Salvador' },
    { slug: 'ce-caserio-villa-esperanza', name: 'C.E. Caser\u00edo Villa Esperanza', country: 'El Salvador' },
    { slug: 'ce-san-francisco', name: 'C.E. San Francisco', country: 'El Salvador' },
    { slug: 'ce-napoleon-rios', name: 'C.E. Napole\u00f3n R\u00edos', country: 'El Salvador' },
    { slug: 'ce-dr-humberto-quinteros', name: 'C.E. Dr. Humberto Quinteros', country: 'El Salvador' },

    // Honduras (14)
    { slug: 'ceb-las-americas', name: 'C.E.B. Las Am\u00e9ricas', country: 'Honduras' },
    { slug: 'cebg-dr-modesto-rodas-alvarado', name: 'C.E.B.G. Dr. Modesto Rodas Alvarado', country: 'Honduras' },
    { slug: 'ceb-estado-de-israel', name: 'C.E.B. Estado de Israel', country: 'Honduras' },
    { slug: 'republica-de-china', name: 'Rep\u00fablica de China', country: 'Honduras' },
    { slug: 'ceb-tim-hines', name: 'C.E.B. Tim Hines', country: 'Honduras' },
    { slug: 'ceb-republica-de-honduras', name: 'C.E.B. Rep\u00fablica de Honduras', country: 'Honduras' },
    { slug: 'ceb-dr-ramon-rosa-2', name: 'C.E.B. Dr. Ram\u00f3n Rosa #2', country: 'Honduras' },
    { slug: 'ceb-manuel-bonilla', name: 'C.E.B. Manuel Bonilla', country: 'Honduras' },
    { slug: 'ceb-mary-flakes-de-flores', name: 'C.E.B. Mary Flakes de Flores', country: 'Honduras' },
    { slug: 'ceb-ing-roberto-larios-silva', name: 'C.E.B. Ing. Roberto Larios Silva', country: 'Honduras' },
    { slug: 'ceb-jose-trinidad-cabanas-aldea-boqueron', name: 'C.E.B. Jos\u00e9 Trinidad Caba\u00f1as (Aldea Boquer\u00f3n)', country: 'Honduras' },
    { slug: 'ceb-jose-castro-lopez', name: 'C.E.B. Jos\u00e9 Castro L\u00f3pez', country: 'Honduras' },
    { slug: 'ceb-jose-trinidad-cabanas-villa-nueva', name: 'C.E.B. Jos\u00e9 Trinidad Caba\u00f1as (Villa Nueva)', country: 'Honduras' },
    { slug: 'ceb-marcelino-pineda-lopez', name: 'C.E.B. Marcelino Pineda L\u00f3pez', country: 'Honduras' },

    // Guatemala (14)
    { slug: 'escuela-bertha-herrera-de-ruano-jv', name: 'Escuela Bertha Herrera de Ruano JV', country: 'Guatemala' },
    { slug: 'escuela-eduardo-caceres', name: 'Escuela Eduardo C\u00e1ceres', country: 'Guatemala' },
    { slug: 'escuela-el-mezquital-ii-jm', name: 'Escuela El Mezquital II JM', country: 'Guatemala' },
    { slug: 'escuela-el-mezquital-ii-jv', name: 'Escuela El Mezquital II JV', country: 'Guatemala' },
    { slug: 'escuela-jose-maria-fuentes', name: 'Escuela Jos\u00e9 Mar\u00eda Fuentes', country: 'Guatemala' },
    { slug: 'escuela-juan-de-francisco-marti', name: 'Escuela Juan de Francisco Mart\u00ed', country: 'Guatemala' },
    { slug: 'escuela-pedro-valenzuela', name: 'Escuela Pedro Valenzuela', country: 'Guatemala' },
    { slug: 'escuela-republica-de-uruguay', name: 'Escuela Rep\u00fablica de Urug\u00fcay', country: 'Guatemala' },
    { slug: 'escuela-tierra-blanca', name: 'Escuela Tierra Blanca', country: 'Guatemala' },
    { slug: 'inebemez-jm', name: 'INEBEMEZ JM', country: 'Guatemala' },
    { slug: 'inebemez-jv', name: 'INEBEMEZ JV', country: 'Guatemala' },
    { slug: 'instituto-oscar-berger', name: 'Instituto Oscar Berger', country: 'Guatemala' },
    { slug: 'escuela-el-mezquital-i-jm', name: 'Escuela El Mezquital I JM', country: 'Guatemala' },
    { slug: 'escuela-el-mezquital-i-jv', name: 'Escuela El Mezquital I JV', country: 'Guatemala' },

    // Panama (2)
    { slug: 'escuela-juan-b-sosa', name: 'Escuela Juan B. Sosa', country: 'Panama' },
    { slug: 'escuela-maria-ossa-de-amador', name: 'Escuela Maria Ossa de Amador', country: 'Panama' },

    // Dominican Republic (3)
    { slug: 'escuela-flora-tolentino', name: 'Escuela Flora Tolentino', country: 'Dominican Republic' },
    { slug: 'escuela-el-valiente', name: 'Escuela El Valiente', country: 'Dominican Republic' },
    { slug: 'escuela-los-alifonsos', name: 'Escuela Los Alifonsos', country: 'Dominican Republic' },

    // Costa Rica (2)
    { slug: 'escuela-hatillo-2', name: 'Escuela Hatillo 2', country: 'Costa Rica' },
    { slug: 'escuela-finca-la-capri', name: 'Escuela Finca La Capri', country: 'Costa Rica' },

    // Mexico (9)
    { slug: 'primaria-manuel-saenz', name: 'Primaria Manuel Saenz', country: 'Mexico' },
    { slug: 'primaria-rafael-arevalo-martinez', name: 'Primaria Rafael Ar\u00e9valo Mart\u00ednez', country: 'Mexico' },
    { slug: 'secundaria-253', name: 'Secundaria 253', country: 'Mexico' },
    { slug: 'primaria-marcos-e-becerra', name: 'Primaria Marcos E. Becerra', country: 'Mexico' },
    { slug: 'primaria-vicente-guerrero-s', name: 'Primaria Vicente Guerrero S.', country: 'Mexico' },
    { slug: 'telesecundaria-quetzalcoatl', name: 'Telesecundaria Quetzalc\u00f3atl', country: 'Mexico' },
    { slug: 'escuela-primaria-5-de-febrero', name: 'Escuela Primaria 5 de Febrero', country: 'Mexico' },
    { slug: 'escuela-primaria-lazaro-cardenas', name: 'Escuela Primaria L\u00e1zaro C\u00e1rdenas', country: 'Mexico' },
    { slug: 'escuela-primaria-lic-gabriel-ramos-millan', name: 'Escuela Primaria Lic. Gabriel Ramos Mill\u00e1n', country: 'Mexico' },

    // Colombia (2)
    { slug: 'ie-fe-y-alegria', name: 'I.E. F\u00e9 y Alegr\u00eda', country: 'Colombia' },
    { slug: 'ie-barrio-paris', name: 'I.E. Barrio Par\u00eds', country: 'Colombia' }
  ];
})();
