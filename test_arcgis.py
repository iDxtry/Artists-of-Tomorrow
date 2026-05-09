import urllib3
import certifi
import ssl
from geopy.geocoders import ArcGIS

# Disable SSL warnings
urllib3.disable_warnings(urllib3.exceptions.InsecureRequestWarning)

# Create an unverified SSL context
ctx = ssl.create_default_context()
ctx.check_hostname = False
ctx.verify_mode = ssl.CERT_NONE

# Geopy's ArcGIS uses requests under the hood, so we can override the session
import requests
session = requests.Session()
session.verify = False

geolocator = ArcGIS(user_agent="aot_geocoder")
geolocator.adapter.session = session

schools = [
    {"name": "C.E. República de Canadá", "country": "El Salvador"},
    {"name": "Escuela Modesto Rodas Alvarado", "country": "Honduras"},
    {"name": "Primaria Manuel Saenz", "country": "Mexico"}
]

for s in schools:
    query = f"{s['name']}, {s['country']}"
    location = geolocator.geocode(query)
    if location:
        print(f"FOUND {s['name']}: {location.latitude}, {location.longitude} ({location.address})")
    else:
        print(f"NOT FOUND: {s['name']}")
