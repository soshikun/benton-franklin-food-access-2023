function closeModal(popup) {
    if (popup === 'filters') {
        document.getElementById(popup).classList.add('hidden-filters');
    } else {
        document.getElementById(popup).classList.add('hidden');
    }
    document.getElementById(popup).style.backgroundColor = '#152E53';
}

function openModal(popup) {
    if (popup === 'filters') {
        document.getElementById(popup).classList.remove('hidden-filters');
    } else {
        document.getElementById(popup).classList.remove('hidden');
    }
    document.getElementById(popup).style.backgroundColor = '#FFFAFA';
}

function makeActive() {
    this.classList.add('active');
}

function clearFilters() {
    let filters = document.getElementsByTagName('input');
    for (let i = 0; i < filters.length; i++) {
        if (filters[i].type === 'radio' && filters[i].checked) {
            filters[i].checked = false;
        }
    }
}

async function createMap() {
    mapboxgl.accessToken = 'pk.eyJ1IjoiamFrb2J6aGFvIiwiYSI6ImNpcms2YWsyMzAwMmtmbG5icTFxZ3ZkdncifQ.P9MBej1xacybKcDN_jehvw';

    let map = new mapboxgl.Map({
        container: 'map',
        style: 'mapbox://styles/mapbox/light-v10',
        minZoom: 1,
        maxZoom: 15,
        zoom: 4,
        center: [-119, 46]
    });

    let data = await getData();

    map.on('load', () => {
        map.addSource('distance-tiles', {
            'type': 'raster',
            'tiles': [
                'tiles/distance/{z}/{x}/{y}.png'
            ],
            'tileSize': 256,
            'attribution': 'Map tiles designed by Ivette Ivanov</a>'
        });

        map.addLayer({
            'id': 'distance',
            'type': 'raster',
            'layout': {
                'visibility': 'none'
            },
            'source': 'distance-tiles',
            'minzoom': 1,
            'maxzoom': 10
        });

        map.addSource('stores', {
            'type': 'geojson',
            'data': {
                'type': 'FeatureCollection',
                'features': data
            }
        });

        map.addLayer({
            'id': 'stores',
            'type': 'symbol',
            'source': 'stores',
            'layout': {
                'icon-image': ['get', 'icon'],
                'icon-allow-overlap': true
            }
        });

        let filters = document.getElementsByTagName('input');
        for (let i = 0; i < filters.length; i++) {
            filters[i].addEventListener('click', () => {
                if (filters[i].type === 'radio') {
                    let selection = filters[i].value;
                    let visible = map.getLayoutProperty(selection, 'visibility');
                    if (visible === 'visible') {
                        map.setLayoutProperty(selection, 'visibility', 'none');
                    } else {
                        map.setLayoutProperty(selection, 'visibility', 'visible');
                    }
                }
            })
        }
    });

    map.on('click', 'stores', (e) => {
        // Copy coordinates array.
        const coordinates = e.features[0].geometry.coordinates.slice();
        const description = e.features[0].properties.description;

        // Ensure that if the map is zoomed out such that multiple
        // copies of the feature are visible, the popup appears
        // over the copy being pointed to.
        while (Math.abs(e.lngLat.lng - coordinates[0]) > 180) {
            coordinates[0] += e.lngLat.lng > coordinates[0] ? 360 : -360;
        }

        new mapboxgl.Popup()
            .setLngLat(coordinates)
            .setHTML(description)
            .addTo(map);
    });

    // Change the cursor to a pointer when the mouse is over the places layer.
    map.on('mouseenter', 'stores', () => {
        map.getCanvas().style.cursor = 'pointer';
    });

    // Change it back to a pointer when it leaves.
    map.on('mouseleave', 'stores', () => {
        map.getCanvas().style.cursor = '';
    });
}

async function getData() {
    const response = await fetch('./data/stores.geojson')
        .then(res => res.json())
        .catch(error => console.log(error));
    return response;
}

function handleClick(selection) {
    let value = selection.value;
    
}
