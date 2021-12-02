let threshold = 5000;
let centers   = {};
let paths     = {};
let map;

let lost = ["Bonaire, Sint Eustatius and Saba", "Cura\u00e7ao", "Sint Maarten (Dutch part)", "Channel Islands", "Wallis and Futuna Islands", "Holy See"]

let g;

// idea: panel on right: has a dropdown for year, src, and dst
// draw path for given year, and every src/dst selected
// main idea: make it easy to analyze countries in particular
// changing years does not change boxes checked, erase everythign and redraw with new year selection

function initMap() {
    g   = google;
    map = new google.maps.Map(document.getElementById("map"), {
      zoom: 3,
      center: { lat: 0, lng: -180 },
      mapTypeId: "terrain",
    });

    initCenters();
    associateCountries();
}

function associateCountries() {
    for (const year in data) {
        console.log(year);
        paths[year] = {};
        
        for (const src in data[year]) {
            if (lost.includes(src)) continue;
            paths[year][src] = {};
            
            for (const dst in data[year][src]) {
                if (lost.includes(dst)) continue;
                paths[year][src][dst] = new google.maps.Polyline({
                    path: [
                        { lat: centers[src][0], lng: centers[src][1] },
                        { lat: centers[dst][0], lng: centers[dst][1] }
                    ],
                    geodesic: true,
                    strokeColor: "#FF0000",
                    strokeOpacity: 1.0,
                    strokeWeight: 2,
                });
            }
        }
    }
}

function initCenters() {
    countries.forEach((country) => {
        centers[country["name"]] = [country["latitude"], country["longitude"]];
    })
}

function drawPath(year, src, dst) {
    paths[year][src][dst].setMap(map);
}

function erasePath(year, src, dst) {
    paths[year][src][dst].setMap(null);
}


