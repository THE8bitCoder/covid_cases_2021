var map = L.map('map').setView([0, 0], 2);

L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
    maxZoom: 19,
    attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
}).addTo(map);

function getColor(cases) {
    // Define color based on the number of infected cases
    if (cases > 255) {
        return "rgb(255, 0, 0)"; // Red for high numbers of cases
    } else {
        return `rgb(${cases}, 0, 0)`; // Varying shades of red based on the number of cases
    }
}

function UpdateMap() {
    fetch("./data/corona-data.json")
        .then(response => response.json())
        .then(rsp => {
            console.log(rsp.data)
            rsp.data.forEach(element => {
                latitude = element.latitude
                longitude = element.longitude
                infected = element.infected
                recovered = element.recovered

                 // Get marker color based on the number of infected cases
                 var color = getColor(infected);

                // Add markers with dynamically determined color
                var marker = L.circleMarker([latitude, longitude], {
                    radius: 8,
                    color: color,
                    fillColor: color,
                    fillOpacity: 0.8
                }).addTo(map).bindPopup(`infected:${infected}, recovered:${recovered}`);
                
            })
        })
    }

UpdateMap();