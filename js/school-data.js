(function () {
  'use strict';

  window.aotLatinAmericaSchools = [
    // El Salvador (16)
    { slug: 'ce-juan-ramon-jimenez', name: 'C.E. Juan Ram\u00f3n Jim\u00e9nez', country: 'El Salvador', lat: 13.7046, lng: -89.2182 },
    { slug: 'ce-republica-de-canada', name: 'C.E. Rep\u00fablica de Canad\u00e1', country: 'El Salvador', lat: 13.7350, lng: -89.2100 },
    { slug: 'ce-ramon-belloso', name: 'C.E. Ram\u00f3n Belloso', country: 'El Salvador', lat: 13.7050, lng: -89.1900 },
    { slug: 'ce-capitan-general-gerardo-barrios', name: 'C.E. Capit\u00e1n General Gerardo Barrios', country: 'El Salvador', lat: 13.7250, lng: -89.2200 },
    { slug: 'ce-colonia-san-ramon', name: 'C.E. Colonia San Ram\u00f3n', country: 'El Salvador', lat: 13.7300, lng: -89.1950 },
    { slug: 'ce-republica-del-peru', name: 'C.E. Rep\u00fablica del Per\u00fa', country: 'El Salvador', lat: 13.7400, lng: -89.1850 },
    { slug: 'ce-amalia-viuda-de-menendez', name: 'C.E. Amalia Viuda de Men\u00e9ndez', country: 'El Salvador', lat: 13.6800, lng: -89.2400 },
    { slug: 'escuela-parroquial-san-jose-de-la-montana', name: 'Escuela Parroquial San Jos\u00e9 de la Monta\u00f1a', country: 'El Salvador', lat: 13.8500, lng: -89.0500 },
    { slug: 'ce-walter-soundy', name: 'C.E. Walter Soundy', country: 'El Salvador', lat: 13.6797, lng: -89.2795 },
    { slug: 'escuela-urbana-de-ninas-margarita-duran', name: 'Escuela Urbana de Ni\u00f1as Margarita Dur\u00e1n', country: 'El Salvador', lat: 13.6700, lng: -89.2450 },
    { slug: 'ce-catolica-luisa-de-marillac', name: 'C.E. Cat\u00f3lica Luisa de Marillac', country: 'El Salvador', lat: 13.7200, lng: -89.2300 },
    { slug: 'ce-herberth-de-sola', name: 'C.E. Herberth de Sola', country: 'El Salvador', lat: 13.7100, lng: -89.2150 },
    { slug: 'ce-caserio-villa-esperanza', name: 'C.E. Caser\u00edo Villa Esperanza', country: 'El Salvador', lat: 13.7600, lng: -89.1600 },
    { slug: 'ce-san-francisco', name: 'C.E. San Francisco', country: 'El Salvador', lat: 13.9433, lng: -89.9104 },
    { slug: 'ce-napoleon-rios', name: 'C.E. Napole\u00f3n R\u00edos', country: 'El Salvador', lat: 13.7150, lng: -89.2050 },
    { slug: 'ce-dr-humberto-quinteros', name: 'C.E. Dr. Humberto Quinteros', country: 'El Salvador', lat: 13.7000, lng: -89.2350 },

    // Honduras (14)
    { slug: 'ceb-las-americas', name: 'C.E.B. Las Am\u00e9ricas', country: 'Honduras', lat: 14.1150, lng: -87.2180 },
    { slug: 'cebg-dr-modesto-rodas-alvarado', name: 'C.E.B.G. Dr. Modesto Rodas Alvarado', country: 'Honduras', lat: 14.0753, lng: -87.2246 },
    { slug: 'ceb-estado-de-israel', name: 'C.E.B. Estado de Israel', country: 'Honduras', lat: 14.0715, lng: -87.2229 },
    { slug: 'republica-de-china', name: 'Rep\u00fablica de China', country: 'Honduras', lat: 14.0880, lng: -87.1980 },
    { slug: 'ceb-tim-hines', name: 'C.E.B. Tim Hines', country: 'Honduras', lat: 14.1100, lng: -87.2120 },
    { slug: 'ceb-republica-de-honduras', name: 'C.E.B. Rep\u00fablica de Honduras', country: 'Honduras', lat: 14.1300, lng: -87.2280 },
    { slug: 'ceb-dr-ramon-rosa-2', name: 'C.E.B. Dr. Ram\u00f3n Rosa #2', country: 'Honduras', lat: 14.1200, lng: -87.2230 },
    { slug: 'ceb-manuel-bonilla', name: 'C.E.B. Manuel Bonilla', country: 'Honduras', lat: 15.7888, lng: -86.7919 },
    { slug: 'ceb-mary-flakes-de-flores', name: 'C.E.B. Mary Flakes de Flores', country: 'Honduras', lat: 14.0883, lng: -87.2525 },
    { slug: 'ceb-ing-roberto-larios-silva', name: 'C.E.B. Ing. Roberto Larios Silva', country: 'Honduras', lat: 14.0900, lng: -87.2060 },
    { slug: 'ceb-jose-trinidad-cabanas-aldea-boqueron', name: 'C.E.B. Jos\u00e9 Trinidad Caba\u00f1as (Aldea Boquer\u00f3n)', country: 'Honduras', lat: 14.0600, lng: -87.2100 },
    { slug: 'ceb-jose-castro-lopez', name: 'C.E.B. Jos\u00e9 Castro L\u00f3pez', country: 'Honduras', lat: 14.0940, lng: -87.2000 },
    { slug: 'ceb-jose-trinidad-cabanas-villa-nueva', name: 'C.E.B. Jos\u00e9 Trinidad Caba\u00f1as (Villa Nueva)', country: 'Honduras', lat: 14.4200, lng: -88.2500 },
    { slug: 'ceb-marcelino-pineda-lopez', name: 'C.E.B. Marcelino Pineda L\u00f3pez', country: 'Honduras', lat: 14.1050, lng: -87.2050 },

    // Guatemala (14)
    { slug: 'escuela-bertha-herrera-de-ruano-jv', name: 'Escuela Bertha Herrera de Ruano JV', country: 'Guatemala', lat: 14.4875, lng: -90.6875 },
    { slug: 'escuela-eduardo-caceres', name: 'Escuela Eduardo C\u00e1ceres', country: 'Guatemala', lat: 14.6500, lng: -90.5050 },
    { slug: 'escuela-el-mezquital-ii-jm', name: 'Escuela El Mezquital II JM', country: 'Guatemala', lat: 14.5050, lng: -90.6950 },
    { slug: 'escuela-el-mezquital-ii-jv', name: 'Escuela El Mezquital II JV', country: 'Guatemala', lat: 14.5070, lng: -90.6960 },
    { slug: 'escuela-jose-maria-fuentes', name: 'Escuela Jos\u00e9 Mar\u00eda Fuentes', country: 'Guatemala', lat: 14.6300, lng: -90.5150 },
    { slug: 'escuela-juan-de-francisco-marti', name: 'Escuela Juan de Francisco Mart\u00ed', country: 'Guatemala', lat: 14.6200, lng: -90.5200 },
    { slug: 'escuela-pedro-valenzuela', name: 'Escuela Pedro Valenzuela', country: 'Guatemala', lat: 14.5900, lng: -90.5400 },
    { slug: 'escuela-republica-de-uruguay', name: 'Escuela Rep\u00fablica de Urug\u00fcay', country: 'Guatemala', lat: 14.6400, lng: -90.5100 },
    { slug: 'escuela-tierra-blanca', name: 'Escuela Tierra Blanca', country: 'Guatemala', lat: 14.8572, lng: -90.1022 },
    { slug: 'inebemez-jm', name: 'INEBEMEZ JM', country: 'Guatemala', lat: 14.5400, lng: -90.7330 },
    { slug: 'inebemez-jv', name: 'INEBEMEZ JV', country: 'Guatemala', lat: 14.5420, lng: -90.7340 },
    { slug: 'instituto-oscar-berger', name: 'Instituto Oscar Berger', country: 'Guatemala', lat: 14.6646, lng: -90.4300 },
    { slug: 'escuela-el-mezquital-i-jm', name: 'Escuela El Mezquital I JM', country: 'Guatemala', lat: 14.5100, lng: -90.6980 },
    { slug: 'escuela-el-mezquital-i-jv', name: 'Escuela El Mezquital I JV', country: 'Guatemala', lat: 14.5120, lng: -90.6990 },

    // Panama (2)
    { slug: 'escuela-juan-b-sosa', name: 'Escuela Juan B. Sosa', country: 'Panama', lat: 8.9556, lng: -79.5431 },
    { slug: 'escuela-maria-ossa-de-amador', name: 'Escuela Maria Ossa de Amador', country: 'Panama', lat: 8.9870, lng: -79.5130 },

    // Dominican Republic (3)
    { slug: 'escuela-flora-tolentino', name: 'Escuela Flora Tolentino', country: 'Dominican Republic', lat: 18.4861, lng: -69.9312 },
    { slug: 'escuela-el-valiente', name: 'Escuela El Valiente', country: 'Dominican Republic', lat: 18.4575, lng: -69.6770 },
    { slug: 'escuela-los-alifonsos', name: 'Escuela Los Alifonsos', country: 'Dominican Republic', lat: 18.5001, lng: -69.8500 },

    // Costa Rica (2)
    { slug: 'escuela-hatillo-2', name: 'Escuela Hatillo 2', country: 'Costa Rica', lat: 9.9230, lng: -84.1110 },
    { slug: 'escuela-finca-la-capri', name: 'Escuela Finca La Capri', country: 'Costa Rica', lat: 9.8790, lng: -84.0500 },

    // Mexico (9)
    { slug: 'primaria-manuel-saenz', name: 'Primaria Manuel Saenz', country: 'Mexico', lat: 25.8139, lng: -100.2595 },
    { slug: 'primaria-rafael-arevalo-martinez', name: 'Primaria Rafael Ar\u00e9valo Mart\u00ednez', country: 'Mexico', lat: 19.3800, lng: -99.1700 },
    { slug: 'secundaria-253', name: 'Secundaria 253', country: 'Mexico', lat: 25.7752, lng: -100.1092 },
    { slug: 'primaria-marcos-e-becerra', name: 'Primaria Marcos E. Becerra', country: 'Mexico', lat: 16.4700, lng: -92.3611 },
    { slug: 'primaria-vicente-guerrero-s', name: 'Primaria Vicente Guerrero S.', country: 'Mexico', lat: 30.7300, lng: -115.9882 },
    { slug: 'telesecundaria-quetzalcoatl', name: 'Telesecundaria Quetzalc\u00f3atl', country: 'Mexico', lat: 19.4800, lng: -99.0800 },
    { slug: 'escuela-primaria-5-de-febrero', name: 'Escuela Primaria 5 de Febrero', country: 'Mexico', lat: 24.0764, lng: -104.5043 },
    { slug: 'escuela-primaria-lazaro-cardenas', name: 'Escuela Primaria L\u00e1zaro C\u00e1rdenas', country: 'Mexico', lat: 19.4500, lng: -99.1200 },
    { slug: 'escuela-primaria-lic-gabriel-ramos-millan', name: 'Escuela Primaria Lic. Gabriel Ramos Mill\u00e1n', country: 'Mexico', lat: 19.4400, lng: -99.1100 },

    // Colombia (2)
    { slug: 'ie-fe-y-alegria', name: 'I.E. F\u00e9 y Alegr\u00eda', country: 'Colombia', lat: 6.2442, lng: -75.5812 },
    { slug: 'ie-barrio-paris', name: 'I.E. Barrio Par\u00eds', country: 'Colombia', lat: 6.2300, lng: -75.5700 }
  ];
})();
