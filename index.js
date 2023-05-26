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

    const grocery_walking = {
        type: 'FeatureCollection',
        features: grocery.features.map((location) => {
            return {
                "type": "Feature",
                "properties": {
                    "name": `1 Mile Walking Radius of ${location.properties['Name']}`
                },
                "geometry": createGeoJSONCircle(location.geometry.coordinates, 1.60934)
            }
        })
    }

    const grocery_biking = {
        type: 'FeatureCollection',
        features: grocery.features.map((location) => {
            return {
                "type": "Feature",
                "properties": {
                    "name": `2 Miles Biking Radius of ${location.properties['Name']}`
                },
                "geometry": createGeoJSONCircle(location.geometry.coordinates, 3.21869)
            }
        })
    }

    const convenience = await getData('convenience');

    const convenience_walking = {
        type: 'FeatureCollection',
        features: convenience.features.map((location) => {
            return {
                "type": "Feature",
                "properties": {
                    "name": `1 Mile Walking Radius of ${location.properties['Name']}`
                },
                "geometry": createGeoJSONCircle(location.geometry.coordinates, 1.60934)
            }
        })
    }

    const convenience_biking = {
        type: 'FeatureCollection',
        features: convenience.features.map((location) => {
            return {
                "type": "Feature",
                "properties": {
                    "name": `2 Miles Biking Radius of ${location.properties['Name']}`
                },
                "geometry": createGeoJSONCircle(location.geometry.coordinates, 3.21869)
            }
        })
    }

    const produce = await getData('produce');

    const produce_walking = {
        type: 'FeatureCollection',
        features: produce.features.map((location) => {
            return {
                "type": "Feature",
                "properties": {
                    "name": `1 Mile Walking Radius of ${location.properties['Name']}`
                },
                "geometry": createGeoJSONCircle(location.geometry.coordinates, 1.60934)
            }
        })
    }

    const produce_biking = {
        type: 'FeatureCollection',
        features: produce.features.map((location) => {
            return {
                "type": "Feature",
                "properties": {
                    "name": `2 Miles Biking Radius of ${location.properties['Name']}`
                },
                "geometry": createGeoJSONCircle(location.geometry.coordinates, 3.21869)
            }
        })
    }

    const service = await getData('service');

    const service_walking = {
        type: 'FeatureCollection',
        features: service.features.map((location) => {
            return {
                "type": "Feature",
                "properties": {
                    "name": `1 Mile Walking Radius of ${location.properties['Name']}`
                },
                "geometry": createGeoJSONCircle(location.geometry.coordinates, 1.60934)
            }
        })
    }

    const service_biking = {
        type: 'FeatureCollection',
        features: service.features.map((location) => {
            return {
                "type": "Feature",
                "properties": {
                    "name": `2 Miles Biking Radius of ${location.properties['Name']}`
                },
                "geometry": createGeoJSONCircle(location.geometry.coordinates, 3.21869)
            }
        })
    }

    const walking = await getData('walking');
    const biking = await getData('biking');

    const bus_1_miles = await getData('1milebus');
    // const bus_2_miles = await getData('2milebus');
    // const bus_3_miles = await getData('3milebus');
    // const bus_4_miles = await getData('4milebus');
    // const bus_5_miles = await getData('5milebus');

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

        map.addSource('grocery_walking', {
            type: 'geojson',
            data: grocery_walking
        });

        map.addLayer({
            'id': 'grocery_walking',
            'source': 'grocery_walking',
            'type': 'fill',
            'paint': {
                'fill-color': '#0080ff', // blue color fill
                'fill-opacity': 0.3
            },
            'layout': {
                'visibility': 'none',
            },
        });

        map.addSource('grocery_biking', {
            type: 'geojson',
            data: grocery_biking
        });

        map.addLayer({
            'id': 'grocery_biking',
            'type': 'fill',
            'source': 'grocery_biking',
            'layout': {
                'visibility': 'none',
            },
            'paint': {
                'fill-color': '#90EE90', // green color fill
                'fill-opacity': 0.6
            }
        });

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

        map.addSource('convenience_walking', {
            type: 'geojson',
            data: convenience_walking
        });

        map.addLayer({
            'id': 'convenience_walking',
            'source': 'convenience_walking',
            'type': 'fill',
            'paint': {
                'fill-color': '#0080ff', // blue color fill
                'fill-opacity': 0.3
            },
            'layout': {
                'visibility': 'none',
            },
        });

        map.addSource('convenience_biking', {
            type: 'geojson',
            data: convenience_biking
        });

        map.addLayer({
            'id': 'convenience_biking',
            'source': 'convenience_biking',
            'type': 'fill',
            'paint': {
                'fill-color': '#90EE90', // green color fill
                'fill-opacity': 0.3
            },
            'layout': {
                'visibility': 'none',
            },
        });

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
                        'icon-size': 0.3
                    },
                });
            }
        );

        map.addSource('produce_walking', {
            type: 'geojson',
            data: produce_walking
        });

        map.addLayer({
            'id': 'produce_walking',
            'source': 'produce_walking',
            'type': 'fill',
            'paint': {
                'fill-color': '#0080ff', // blue color fill
                'fill-opacity': 0.3
            },
            'layout': {
                'visibility': 'none',
            },
        });

        map.addSource('produce_biking', {
            type: 'geojson',
            data: produce_biking
        });

        map.addLayer({
            'id': 'produce_biking',
            'source': 'produce_biking',
            'type': 'fill',
            'paint': {
                'fill-color': '#90EE90', // green color fill
                'fill-opacity': 0.3
            },
            'layout': {
                'visibility': 'none',
            },
        });

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

        map.addSource('service_walking', {
            type: 'geojson',
            data: service_walking
        });

        map.addLayer({
            'id': 'service_walking',
            'source': 'service_walking',
            'type': 'fill',
            'paint': {
                'fill-color': '#0080ff', // blue color fill 
                'fill-opacity': 0.3
            },
            'layout': {
                'visibility': 'none',
            },
        });

        map.addSource('service_biking', {
            type: 'geojson',
            data: service_biking
        });

        map.addLayer({
            'id': 'service_biking',
            'source': 'service_biking',
            'type': 'fill',
            'paint': {
                'fill-color': '#90EE90', // green color fill
                'fill-opacity': 0.3
            },
            'layout': {
                'visibility': 'none',
            },
        });

        map.addSource('walking', {
            type: 'geojson',
            data: walking
        });

        map.addLayer({
            'id': 'walking',
            'type': 'fill',
            'source': 'walking',
            'layout': {
                'visibility': 'none',
            },
            'paint': {
                'fill-color': '#0080ff', // blue color fill
                'fill-opacity': 0.6
            }
        });

        map.addSource('biking', {
            type: 'geojson',
            data: biking
        });

        map.addLayer({
            'id': 'biking',
            'type': 'fill',
            'source': 'biking',
            'layout': {
                'visibility': 'none',
            },
            'paint': {
                'fill-color': '#90EE90', // green color fill
                'fill-opacity': 0.6
            }
        });

        map.addSource('bus_1_miles', {
            type: 'geojson',
            data: bus_1_miles
        });

        map.addLayer({
            'id': 'bus_1_miles',
            'source': 'bus_1_miles',
            'type': 'fill',
            'paint': {
                'fill-color': '#ffbdbd', // pink color fill
                'fill-opacity': 0.3
            },
            'layout': {
                'visibility': 'none',
            }
        });

        // map.addSource('bus_2_miles', {
        //     type: 'geojson',
        //     data: bus_2_miles
        // });

        // map.addLayer({
        //     'id': 'bus_2_miles',
        //     'source': 'bus_2_miles',
        //     'type': 'fill',
        //     'paint': {
        //         'fill-color': '#ffbdbd', // pink color fill
        //         'fill-opacity': 0.3
        //     },
        //     'layout': {
        //         'visibility': 'none',
        //     }
        // });

        // map.addSource('bus_3_miles', {
        //     type: 'geojson',
        //     data: bus_3_miles
        // });

        // map.addLayer({
        //     'id': 'bus_3_miles',
        //     'source': 'bus_3_miles',
        //     'type': 'fill',
        //     'paint': {
        //         'fill-color': '#ffbdbd', // pink color fill
        //         'fill-opacity': 0.3
        //     },
        //     'layout': {
        //         'visibility': 'none',
        //     }
        // });

        // map.addSource('bus_4_miles', {
        //     type: 'geojson',
        //     data: bus_4_miles
        // });

        // map.addLayer({
        //     'id': 'bus_4_miles',
        //     'source': 'bus_4_miles',
        //     'type': 'fill',
        //     'paint': {
        //         'fill-color': '#ffbdbd', // pink color fill
        //         'fill-opacity': 0.3
        //     },
        //     'layout': {
        //         'visibility': 'none',
        //     }
        // });

        // map.addSource('bus_5_miles', {
        //     type: 'geojson',
        //     data: bus_5_miles
        // });

        // map.addLayer({
        //     'id': 'bus_5_miles',
        //     'source': 'bus_5_miles',
        //     'type': 'fill',
        //     'paint': {
        //         'fill-color': '#ffbdbd', // pink color fill
        //         'fill-opacity': 0.3
        //     },
        //     'layout': {
        //         'visibility': 'none',
        //     }
        // });

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
        let storesTransport = [
            'grocery_walking',
            'grocery_biking',
            'convenience_walking',
            'convenience_biking',
            'produce_walking',
            'produce_biking',
            'service_walking',
            'service_biking'
        ];
        let current = [];
        let transportation = [];
        for (let i = 0; i < filters.length; i++) {
            filters[i].addEventListener('click', () => {
                if (filters[i].type === 'checkbox' && filters[i].id !== 'toggle') {
                    let selection = filters[i].value;

                    if (selection === 'transit') {
                        document.getElementById('miles').disabled = false;
                        let miles = document.getElementById('miles').value;
                        document.getElementById('value').textContent = miles;

                        document.getElementById('miles').addEventListener('input', (event) => {
                            value.textContent = event.target.value;
                            if (event.target.value !== '0') {
                                map.setLayoutProperty('bus_1_miles', 'visibility', 'none');
                                map.setLayoutProperty('bus_2_miles', 'visibility', 'none');
                                map.setLayoutProperty('bus_3_miles', 'visibility', 'none');
                                map.setLayoutProperty('bus_4_miles', 'visibility', 'none');
                                map.setLayoutProperty('bus_5_miles', 'visibility', 'none');
                                map.setLayoutProperty(`bus_${event.target.value}_miles`, 'visibility', 'visible');
                            } else {
                                map.setLayoutProperty('bus_1_miles', 'visibility', 'none');
                                map.setLayoutProperty('bus_2_miles', 'visibility', 'none');
                                map.setLayoutProperty('bus_3_miles', 'visibility', 'none');
                                map.setLayoutProperty('bus_4_miles', 'visibility', 'none');
                                map.setLayoutProperty('bus_5_miles', 'visibility', 'none');
                            }
                        });
                    }

                    // Selection is a transportation AND there is a store type
                    if (
                        (selection === 'walking' || selection === 'biking' || selection === 'driving')
                        && (current.includes('grocery') || current.includes('convenience') || current.includes('produce') || current.includes('service'))
                    ) {
                        // There is only ONE store selection
                        if (current.length === 1) {
                            let visible = map.getLayoutProperty(`${current[0]}_${selection}`, 'visibility');
                            if (visible === 'visible') {
                                transportation.splice(transportation.indexOf(selection), 1);
                                map.setLayoutProperty(`${current[0]}_${selection}`, 'visibility', 'none');
                            } else {
                                transportation.push(selection);
                                map.setLayoutProperty(`${current[0]}_${selection}`, 'visibility', 'visible');
                            }
                        } else {
                            let visible = '';
                            current.map((store) => {
                                visible = map.getLayoutProperty(`${store}_${selection}`, 'visibility');
                                if (visible === 'visible') {
                                    transportation.splice(transportation.indexOf(selection), 1);
                                    map.setLayoutProperty(`${store}_${selection}`, 'visibility', 'none');
                                } else {
                                    transportation.push(selection);
                                    map.setLayoutProperty(`${store}_${selection}`, 'visibility', 'visible');
                                }
                            });

                            if (visible !== 'visible') {
                                transportation.pop();
                            }
                        }
                        // Selection is NOT a transportation
                    } else if (selection !== 'transit') {
                        let visible = map.getLayoutProperty(selection, 'visibility');
                        if (visible === 'visible') {
                            map.setLayoutProperty(`${selection}_walking`, 'visibility', 'none');
                            map.setLayoutProperty(`${selection}_biking`, 'visibility', 'none');
                            current.splice(current.indexOf(selection), 1);
                            if (transportation.length > 0) {
                                transportation.map((mode) => {
                                    map.setLayoutProperty(`${selection}_${mode}`, 'visibility', 'none');
                                });
                            }
                            map.setLayoutProperty(selection, 'visibility', 'none');
                        } else {
                            current.push(selection);
                            if (transportation.length > 0) {
                                transportation.map((mode) => {
                                    map.setLayoutProperty(`${selection}_${mode}`, 'visibility', 'visible');
                                });
                            }
                            map.setLayoutProperty(selection, 'visibility', 'visible');
                        }
                    }
                }
            })
        }

        let clearButton = document.getElementById('clear');
        clearButton.addEventListener('click', () => {
            current = [];
            transportation = [];
            for (let i = 0; i < filters.length; i++) {
                if (filters[i].type === 'checkbox' && filters[i].checked && filters[i].id !== 'toggle') {
                    filters[i].checked = false;
                    map.setLayoutProperty('grocery', 'visibility', 'none');
                    map.setLayoutProperty('convenience', 'visibility', 'none');
                    map.setLayoutProperty('produce', 'visibility', 'none');
                    map.setLayoutProperty('service', 'visibility', 'none');
                    map.setLayoutProperty('walking', 'visibility', 'none');
                    map.setLayoutProperty('biking', 'visibility', 'none');
                    storesTransport.map((place) => {
                        map.setLayoutProperty(place, 'visibility', 'none');
                    });
                }
            }
            document.getElementById('miles').disabled = true;
            document.getElementById('value').textContent = '';
            map.setLayoutProperty('bus_1_miles', 'visibility', 'none');
            map.setLayoutProperty('bus_2_miles', 'visibility', 'none');
            map.setLayoutProperty('bus_3_miles', 'visibility', 'none');
            map.setLayoutProperty('bus_4_miles', 'visibility', 'none');
            map.setLayoutProperty('bus_5_miles', 'visibility', 'none');
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
}

async function getData(file) {
    const response = await fetch(`./data/${file}.geojson`)
        .then(res => res.json())
        .catch(error => console.log(error));
    return response;
}

const createGeoJSONCircle = function (center, radiusInKm, points) {
    if (!points) points = 64;

    let coords = {
        latitude: center[1],
        longitude: center[0]
    };

    let km = radiusInKm;

    let ret = [];
    let distanceX = km / (111.320 * Math.cos(coords.latitude * Math.PI / 180));
    let distanceY = km / 110.574;

    let theta, x, y;
    for (let i = 0; i < points; i++) {
        theta = (i / points) * (2 * Math.PI);
        x = distanceX * Math.cos(theta);
        y = distanceY * Math.sin(theta);

        ret.push([coords.longitude + x, coords.latitude + y]);
    }
    ret.push(ret[0]);

    let circle = {
        "type": "Polygon",
        "coordinates": [ret]
    }

    return circle;
};