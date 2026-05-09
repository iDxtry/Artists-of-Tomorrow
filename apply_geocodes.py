import json
import re

# Bounding boxes for validation (min_lat, max_lat, min_lng, max_lng)
bboxes = {
    'El Salvador': (13.0, 14.5, -90.5, -87.0),
    'Honduras': (12.8, 16.5, -89.5, -83.0),
    'Guatemala': (13.5, 18.0, -92.5, -88.0),
    'Panama': (7.0, 10.0, -83.0, -77.0),
    'Dominican Republic': (17.5, 20.0, -72.0, -68.0),
    'Mexico': (14.0, 33.0, -118.0, -86.0),
    'Colombia': (-4.5, 13.5, -80.0, -66.0)
}

# Read original file
with open('js/map-init.js', 'r') as f:
    js_content = f.read()

# Read geocoded data
try:
    with open('geocoded_schools_v2.json', 'r') as f:
        geocoded = json.load(f)
except:
    geocoded = []

updated_count = 0
for school in geocoded:
    if school.get('found'):
        lat = school['lat']
        lng = school['lng']
        country = school['country']
        
        # Validate coordinates are within the country
        if country in bboxes:
            min_lat, max_lat, min_lng, max_lng = bboxes[country]
            if min_lat <= lat <= max_lat and min_lng <= lng <= max_lng:
                # Find the line in map-init.js matching this school
                # Example: { name: 'Escuela Tierra Blanca', country: 'Guatemala', lat: 14.2025, lng: -90.9975 },
                pattern = re.compile(r"(\{ name:\s*['\"]" + re.escape(school['name']) + r"['\"].*?lat:\s*)([-\d\.]+)(,\s*lng:\s*)([-\d\.]+)(.*?\})")
                
                def replace_coords(match):
                    return f"{match.group(1)}{lat:.4f}{match.group(3)}{lng:.4f}{match.group(5)}"
                
                new_js, count = pattern.subn(replace_coords, js_content)
                if count > 0:
                    js_content = new_js
                    updated_count += 1
                    print(f"Updated {school['name']} to {lat:.4f}, {lng:.4f}")

with open('js/map-init.js', 'w') as f:
    f.write(js_content)

print(f"Successfully updated {updated_count} schools with accurate coordinates.")
