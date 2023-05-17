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

function createMap() {
    mapboxgl.accessToken = 'pk.eyJ1IjoiamFrb2J6aGFvIiwiYSI6ImNpcms2YWsyMzAwMmtmbG5icTFxZ3ZkdncifQ.P9MBej1xacybKcDN_jehvw';

    let map = new mapboxgl.Map({
        container: 'map',
        style: 'mapbox://styles/mapbox/light-v10',
        minZoom: 1,
        maxZoom: 10,
        zoom: 4,
        center: [-98, 41.8]
    });

    map.on('load', () => {
        map.addSource('basemap-tiles', {
            'type': 'raster',
            'tiles': [
                'tiles/border/{z}/{x}/{y}.png'
            ],
            'tileSize': 256,
            'attribution': 'Map tiles designed by Ivette Ivanov</a>'
        });
        map.addLayer({
            'id': 'border',
            'type': 'raster',
            'layout': {
                'visibility': 'none'
            },
            'source': 'basemap-tiles',
            'minzoom': 1,
            'maxzoom': 10
        });
    });
}

function handleClick(selection) {
    let value = selection.value;
}
