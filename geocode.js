const fs = require('fs');
const https = require('https');

const data = [
    // El Salvador (16)
    { name: 'C.E. Juan Ramón Jiménez', country: 'El Salvador', lat: 13.7046, lng: -89.2182 },
    { name: 'C.E. República de Canadá', country: 'El Salvador', lat: 13.7350, lng: -89.2100 },
    { name: 'C.E. Ramón Belloso', country: 'El Salvador', lat: 13.7050, lng: -89.1900 },
    { name: 'C.E. Capitán General Gerardo Barrios', country: 'El Salvador', lat: 13.7250, lng: -89.2200 },
    { name: 'C.E. Colonia San Ramón', country: 'El Salvador', lat: 13.7300, lng: -89.1950 },
    { name: 'C.E. República del Perú', country: 'El Salvador', lat: 13.7400, lng: -89.1850 },
    { name: 'C.E. Amalia Viuda de Menéndez', country: 'El Salvador', lat: 13.6800, lng: -89.2400 },
    { name: 'Escuela Parroquial San José de la Montaña', country: 'El Salvador', lat: 13.8500, lng: -89.0500 },
    { name: 'C.E. Walter Soundy', country: 'El Salvador', lat: 13.7100, lng: -89.2250 },
    { name: 'Escuela Urbana de Niñas Margarita Durán', country: 'El Salvador', lat: 13.6700, lng: -89.2450 },
    { name: 'C.E. Católica Luisa de Marillac', country: 'El Salvador', lat: 13.7200, lng: -89.2300 },
    { name: 'C.E. Herberth de Sola', country: 'El Salvador', lat: 13.7100, lng: -89.2150 },
    { name: 'C.E. Caserío Villa Esperanza', country: 'El Salvador', lat: 13.7600, lng: -89.1600 },
    { name: 'C.E. San Francisco', country: 'El Salvador', lat: 13.6875, lng: -89.2050 },
    { name: 'C.E. Napoleón Ríos', country: 'El Salvador', lat: 13.7150, lng: -89.2050 },
    { name: 'C.E. Dr. Humberto Quinteros', country: 'El Salvador', lat: 13.7000, lng: -89.2350 },

    // Honduras (14)
    { name: 'C.E.B. Las Américas', country: 'Honduras', lat: 14.1150, lng: -87.2180 },
    { name: 'Escuela Modesto Rodas Alvarado', country: 'Honduras', lat: 14.1350, lng: -87.2350 },
    { name: 'C.E.B. Estado de Israel', country: 'Honduras', lat: 14.0820, lng: -87.1950 },
    { name: 'República de China', country: 'Honduras', lat: 14.0880, lng: -87.1980 },
    { name: 'C.E.B. Tim Hines', country: 'Honduras', lat: 14.1100, lng: -87.2120 },
    { name: 'C.E.B. República de Honduras', country: 'Honduras', lat: 14.1300, lng: -87.2280 },
    { name: 'C.E.B. Dr. Ramón Rosa #2', country: 'Honduras', lat: 14.1200, lng: -87.2230 },
    { name: 'C.E.B. Manuel Bonilla', country: 'Honduras', lat: 14.0990, lng: -87.2100 },
    { name: 'C.E.B. Mary Flakes de Flores', country: 'Honduras', lat: 15.6100, lng: -87.9500 },
    { name: 'C.E.B. Roberto Larios Silva', country: 'Honduras', lat: 14.0900, lng: -87.2060 },
    { name: 'C.E.B. José Trinidad Cabañas (Aldea Boquerón)', country: 'Honduras', lat: 14.0600, lng: -87.2100 },
    { name: 'C.E.B. José Castro López', country: 'Honduras', lat: 14.0940, lng: -87.2000 },
    { name: 'C.E.B. José Trinidad Cabañas (Villa Nueva)', country: 'Honduras', lat: 14.4200, lng: -88.2500 },
    { name: 'C.E.B. Marcelino Pineda López', country: 'Honduras', lat: 14.1050, lng: -87.2050 },

    // Guatemala (17)
    { name: 'Escuela Bertha Herrera de Ruano', country: 'Guatemala', lat: 14.4875, lng: -90.6875 },
    { name: 'Escuela Eduardo Cáceres', country: 'Guatemala', lat: 14.6500, lng: -90.5050 },
    { name: 'Escuela Mezquital II JM', country: 'Guatemala', lat: 14.5050, lng: -90.6950 },
    { name: 'Escuela Mezquital II JV', country: 'Guatemala', lat: 14.5070, lng: -90.6960 },
    { name: 'Escuela José María Fuentes', country: 'Guatemala', lat: 14.6300, lng: -90.5150 },
    { name: 'Escuela Juan de Francisco Martí', country: 'Guatemala', lat: 14.6200, lng: -90.5200 },
    { name: 'Escuela Pedro Valenzuela', country: 'Guatemala', lat: 14.5900, lng: -90.5400 },
    { name: 'Escuela República de Urugüay', country: 'Guatemala', lat: 14.6400, lng: -90.5100 },
    { name: 'Escuela Tierra Blanca', country: 'Guatemala', lat: 14.2025, lng: -90.9975 },
    { name: 'INEBEMEZ JM', country: 'Guatemala', lat: 14.5400, lng: -90.7330 },
    { name: 'INEBEMEZ JV', country: 'Guatemala', lat: 14.5420, lng: -90.7340 },
    { name: 'Instituto Oscar Berger', country: 'Guatemala', lat: 14.5600, lng: -90.7100 },
    { name: 'Escuela Mezquital I JM', country: 'Guatemala', lat: 14.5100, lng: -90.6980 },
    { name: 'Escuela Mezquital I JV', country: 'Guatemala', lat: 14.5120, lng: -90.6990 },
    { name: 'Escuela Hatillo 2', country: 'Guatemala', lat: 14.4900, lng: -90.6900 },
    { name: 'Escuela La Capri', country: 'Guatemala', lat: 14.5800, lng: -90.6800 },
    { name: 'Escuela Bilingüe María Ossa de Amador', country: 'Guatemala', lat: 14.6100, lng: -90.5300 },

    // Panama (2)
    { name: 'Escuela Juan B. Sosa', country: 'Panama', lat: 8.9936, lng: -79.5197 },
    { name: 'Escuela Flora Tolentino', country: 'Panama', lat: 8.9870, lng: -79.5130 },

    // Dominican Republic (2)
    { name: 'Escuela El Valiente', country: 'Dominican Republic', lat: 19.2500, lng: -69.5000 },
    { name: 'Escuela Los Alifonsos', country: 'Dominican Republic', lat: 18.5001, lng: -69.8500 },

    // Mexico (7)
    { name: 'Primaria Manuel Saenz', country: 'Mexico', lat: 19.4326, lng: -99.1332 },
    { name: 'Primaria Rafael Arévalo Martínez', country: 'Mexico', lat: 19.3800, lng: -99.1700 },
    { name: 'Secundaria 253', country: 'Mexico', lat: 19.4100, lng: -99.1500 },
    { name: 'Primaria Marcos E. Becerra', country: 'Mexico', lat: 19.4200, lng: -99.1900 },
    { name: 'Primaria Vicente Guerrero S.', country: 'Mexico', lat: 18.9000, lng: -99.2300 },
    { name: 'Telesecundaria Quetzalcóatl', country: 'Mexico', lat: 19.4800, lng: -99.0800 },
    { name: 'Escuela Primaria 5 de Febrero', country: 'Mexico', lat: 19.4600, lng: -99.0850 },
    { name: 'Escuela Primaria Lázaro Cárdenas', country: 'Mexico', lat: 19.4500, lng: -99.1200 },
    { name: 'Escuela Primaria Lic. Gabril Ramos Millán', country: 'Mexico', lat: 19.4400, lng: -99.1100 },

    // Colombia (2)
    { name: 'I.E. Fé y Alegría', country: 'Colombia', lat: 6.2442, lng: -75.5812 },
    { name: 'I.E. Barrio París', country: 'Colombia', lat: 6.2300, lng: -75.5700 }
];

function fetchGeo(school) {
    return new Promise((resolve) => {
        let searchName = school.name.replace(/C\.E\.B\.|C\.E\.|Escuela|Primaria|Secundaria|Instituto|I\.E\./gi, '').trim();
        searchName = encodeURIComponent(searchName + ' ' + school.country);
        const url = `https://nominatim.openstreetmap.org/search?q=${searchName}&format=json&limit=1`;
        
        https.get(url, { headers: { 'User-Agent': 'Artists of Tomorrow Geocoder (info.artistsoftomorrow@gmail.com)' } }, (res) => {
            let body = '';
            res.on('data', chunk => body += chunk);
            res.on('end', () => {
                try {
                    const result = JSON.parse(body);
                    if (result && result.length > 0) {
                        resolve({ ...school, lat: parseFloat(result[0].lat), lng: parseFloat(result[0].lon), found: true });
                    } else {
                        resolve({ ...school, found: false });
                    }
                } catch (e) {
                    resolve({ ...school, found: false, error: e.message });
                }
            });
        }).on('error', () => resolve({ ...school, found: false }));
    });
}

async function run() {
    const updatedData = [];
    let foundCount = 0;
    console.log("Starting geocoding process...");
    
    for (let i = 0; i < data.length; i++) {
        const school = data[i];
        console.log(`[${i+1}/${data.length}] Looking up ${school.name}...`);
        
        // Wait 1.5s to respect Nominatim API limits (max 1 req/sec)
        await new Promise(r => setTimeout(r, 1500));
        
        const res = await fetchGeo(school);
        if (res.found) {
            console.log(`  -> FOUND: ${res.lat}, ${res.lng}`);
            foundCount++;
        } else {
            console.log(`  -> NOT FOUND. Keeping original coordinates.`);
        }
        updatedData.push(res);
    }
    
    fs.writeFileSync('geocoded_schools.json', JSON.stringify(updatedData, null, 2));
    console.log(`Finished! Found ${foundCount}/${data.length} schools.`);
}

run();
