from duckduckgo_search import DDGS
import re
import json

schools = [
    {"name": "C.E. República de Canadá", "country": "El Salvador"},
    {"name": "Escuela Modesto Rodas Alvarado", "country": "Honduras"},
    {"name": "Primaria Manuel Saenz", "country": "Mexico"}
]

with DDGS() as ddgs:
    for s in schools:
        query = f'"{s["name"]}" {s["country"]} site:google.com/maps'
        print(f"Searching: {query}")
        results = ddgs.text(query, max_results=2)
        for r in results:
            print(r['href'])
            # Look for coordinates in URL like @13.735,-89.21,15z
            match = re.search(r'@([-\d\.]+),([-\d\.]+)', r['href'])
            if match:
                print(f"  -> FOUND COORDS: {match.group(1)}, {match.group(2)}")
            else:
                # Sometimes it's in the q= parameter or !3d !4d
                match2 = re.search(r'!3d([-\d\.]+)!4d([-\d\.]+)', r['href'])
                if match2:
                    print(f"  -> FOUND COORDS (3d/4d): {match2.group(1)}, {match2.group(2)}")

