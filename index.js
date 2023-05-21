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

function createPopup(name, address) {
    return `
        <h2 class='location-name'>${name}</h2>
        <p class='location-address'>${address}</p>
    `
}

async function createMap(mode) {
    mapboxgl.accessToken = 'pk.eyJ1Ijoic29zaGlrdW4iLCJhIjoiY2wyczRidHBzMGUwejNqcXJqM2JxMTdvdSJ9.PZsigyD7XEJ6qYqUuqUs0g';

    let map = new mapboxgl.Map({
        container: 'map',
        style: `mapbox://styles/mapbox/${mode}-v10`,
        minZoom: 1,
        maxZoom: 15,
        zoom: 9,
        center: [-119, 46.5]
    });

    const grocery = await getData('grocery');
    const convenience = await getData('convenience');
    const produce = await getData('produce');
    const service = await getData('service');

    map.on('load', () => {
        map.loadImage(
            './imgs/grocery.png',
            (error, image) => {
                if (error) throw error;

                map.addImage('grocery', image);

                map.addSource('grocery', {
                    type: 'geojson',
                    data: grocery
                });

                map.addLayer({
                    'id': 'grocery',
                    'source': 'grocery',
                    'type': 'symbol',
                    'layout': {
                        'visibility': 'none',
                        'icon-image': 'grocery',
                        'icon-allow-overlap': true,
                        'icon-size': 0.7
                    },
                });
            }
        );

        map.on('click', 'grocery', (e) => {
            const coordinates = e.features[0].geometry.coordinates.slice();
            const name = e.features[0].properties.Name;
            const address = e.features[0].properties['Full Address'];

            while (Math.abs(e.lngLat.lng - coordinates[0]) > 180) {
                coordinates[0] += e.lngLat.lng > coordinates[0] ? 360 : -360;
            }

            new mapboxgl.Popup()
                .setLngLat(coordinates)
                .setHTML(createPopup(name, address))
                .addTo(map);
        });

        map.on('mouseenter', 'grocery', () => {
            map.getCanvas().style.cursor = 'pointer';
        });

        map.on('mouseleave', 'grocery', () => {
            map.getCanvas().style.cursor = '';
        });

        map.loadImage(
            './imgs/convenience.png',
            (error, image) => {
                if (error) throw error;

                map.addImage('convenience', image);

                map.addSource('convenience', {
                    type: 'geojson',
                    data: convenience
                });

                map.addLayer({
                    'id': 'convenience',
                    'source': 'convenience',
                    'type': 'symbol',
                    'layout': {
                        'visibility': 'none',
                        'icon-image': 'convenience',
                        'icon-allow-overlap': true,
                        'icon-size': 0.7
                    },
                });
            }
        );

        map.on('click', 'convenience', (e) => {
            const coordinates = e.features[0].geometry.coordinates.slice();
            const name = e.features[0].properties.Name;
            const address = e.features[0].properties['Full Address'];

            while (Math.abs(e.lngLat.lng - coordinates[0]) > 180) {
                coordinates[0] += e.lngLat.lng > coordinates[0] ? 360 : -360;
            }

            new mapboxgl.Popup()
                .setLngLat(coordinates)
                .setHTML(createPopup(name, address))
                .addTo(map);
        });

        map.on('mouseenter', 'convenience', () => {
            map.getCanvas().style.cursor = 'pointer';
        });

        map.on('mouseleave', 'convenience', () => {
            map.getCanvas().style.cursor = '';
        });

        map.loadImage(
            './imgs/produce.png',
            (error, image) => {
                if (error) throw error;

                map.addImage('produce', image);

                map.addSource('produce', {
                    type: 'geojson',
                    data: produce
                });

                map.addLayer({
                    'id': 'produce',
                    'source': 'produce',
                    'type': 'symbol',
                    'layout': {
                        'visibility': 'none',
                        'icon-image': 'produce',
                        'icon-allow-overlap': true,
                        'icon-size': 0.5
                    },
                });
            }
        );

        map.on('click', 'produce', (e) => {
            const coordinates = e.features[0].geometry.coordinates.slice();
            const name = e.features[0].properties.Name;
            const address = e.features[0].properties['Full Address'];

            while (Math.abs(e.lngLat.lng - coordinates[0]) > 180) {
                coordinates[0] += e.lngLat.lng > coordinates[0] ? 360 : -360;
            }

            new mapboxgl.Popup()
                .setLngLat(coordinates)
                .setHTML(createPopup(name, address))
                .addTo(map);
        });

        map.on('mouseenter', 'produce', () => {
            map.getCanvas().style.cursor = 'pointer';
        });

        map.on('mouseleave', 'produce', () => {
            map.getCanvas().style.cursor = '';
        });

        map.loadImage(
            './imgs/service.png',
            (error, image) => {
                if (error) throw error;

                map.addImage('service', image);

                map.addSource('service', {
                    type: 'geojson',
                    data: service
                });

                map.addLayer({
                    'id': 'service',
                    'source': 'service',
                    'type': 'symbol',
                    'layout': {
                        'visibility': 'none',
                        'icon-image': 'service',
                        'icon-allow-overlap': true,
                        'icon-size': 0.7
                    },
                });
            }
        );

        map.on('click', 'service', (e) => {
            const coordinates = e.features[0].geometry.coordinates.slice();
            const name = e.features[0].properties.Name;
            const address = e.features[0].properties['Full Address'];

            while (Math.abs(e.lngLat.lng - coordinates[0]) > 180) {
                coordinates[0] += e.lngLat.lng > coordinates[0] ? 360 : -360;
            }

            new mapboxgl.Popup()
                .setLngLat(coordinates)
                .setHTML(createPopup(name, address))
                .addTo(map);
        });

        map.on('mouseenter', 'service', () => {
            map.getCanvas().style.cursor = 'pointer';
        });

        map.on('mouseleave', 'service', () => {
            map.getCanvas().style.cursor = '';
        });

        let filters = document.getElementsByTagName('input');
        for (let i = 0; i < filters.length; i++) {
            filters[i].addEventListener('click', () => {
                if (filters[i].type === 'checkbox' && filters[i].id !== 'toggle') {
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

        let clearButton = document.getElementById('clear');
        clearButton.addEventListener('click', () => {
            for (let i = 0; i < filters.length; i++) {
                if (filters[i].type === 'checkbox' && filters[i].checked && filters[i].id !== 'toggle') {
                    filters[i].checked = false;
                    map.setLayoutProperty('grocery', 'visibility', 'none');
                    map.setLayoutProperty('convenience', 'visibility', 'none');
                    map.setLayoutProperty('produce', 'visibility', 'none');
                    map.setLayoutProperty('service', 'visibility', 'none');
                }
            }
        });
    });

    // document.getElementById('toggle').addEventListener('change', (e) => {
    //     for (let i = 0; i < filters.length; i++) {
    //         if (filters[i].type === 'checkbox' && filters[i].checked && filters[i].id !== 'toggle') {
    //             filters[i].checked = false;
    //         }
    //     }
    //     if (e.target.className === 'light') {
    //         e.target.classList.remove('light');
    //         createMap('dark');
    //     } else {
    //         e.target.classList.add('light');
    //         createMap('light');
    //     }
    // });

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

async function getData(file) {
    const response = await fetch(`./data/${file}.geojson`)
        .then(res => res.json())
        .catch(error => console.log(error));
    return response;
}

function handleClick(selection) {
    let value = selection.value;

}
