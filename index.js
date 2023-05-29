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

function getDistance(transport) {
    let value = document.getElementById(`${transport}_miles`).value;
    return value;
}

function getAllBikingList(transport) {
    const list = [
        `grocery_0_miles_${transport}`,
        `grocery_1_miles_${transport}`,
        `grocery_2_miles_${transport}`,
        `grocery_3_miles_${transport}`,
        `grocery_4_miles_${transport}`,
        `grocery_5_miles_${transport}`,
        `convenience_0_miles_${transport}`,
        `convenience_1_miles_${transport}`,
        `convenience_2_miles_${transport}`,
        `convenience_3_miles_${transport}`,
        `convenience_4_miles_${transport}`,
        `convenience_5_miles_${transport}`,
        `produce_0_miles_${transport}`,
        `produce_1_miles_${transport}`,
        `produce_2_miles_${transport}`,
        `produce_3_miles_${transport}`,
        `produce_4_miles_${transport}`,
        `produce_5_miles_${transport}`,
        `service_0_miles_${transport}`,
        `service_1_miles_${transport}`,
        `service_2_miles_${transport}`,
        `service_3_miles_${transport}`,
        `service_4_miles_${transport}`,
        `service_5_miles_${transport}`,
    ];
    return list;
}

function getBikingList(miles, transport) {
    const list = [
        `grocery_${miles}_miles_${transport}`,
        `convenience_${miles}_miles_${transport}`,
        `produce_${miles}_miles_${transport}`,
        `service_${miles}_miles_${transport}`,
    ];
    return list;
}

function getAllWalkingList(transport) {
    const list = [
        `grocery_0_mile_${transport}`,
        `grocery_quarter_mile_${transport}`,
        `grocery_half_mile_${transport}`,
        `grocery_three_quarters_mile_${transport}`,
        `grocery_1_mile_${transport}`,
        `convenience_0_mile_${transport}`,
        `convenience_quarter_mile_${transport}`,
        `convenience_half_mile_${transport}`,
        `convenience_three_quarters_mile_${transport}`,
        `convenience_1_mile_${transport}`,
        `produce_0_mile_${transport}`,
        `produce_quarter_mile_${transport}`,
        `produce_half_mile_${transport}`,
        `produce_three_quarters_mile_${transport}`,
        `produce_1_mile_${transport}`,
        `service_0_mile_${transport}`,
        `service_quarter_mile_${transport}`,
        `service_half_mile_${transport}`,
        `service_three_quarters_mile_${transport}`,
        `service_1_mile_${transport}`,
    ];
    return list;
}

function getWalkingList(miles, transport) {
    let number = '';
    if (miles === '0.25') {
        number = 'quarter'
    } else if (miles === '0.5') {
        number = 'half'
    } else if (miles === '0.75') {
        number = 'three_quarters'
    } else if (miles === '0') {
        number = '0';
    } else if (miles === '1') {
        number = '1';
    }

    const list = [
        `grocery_${number}_mile_${transport}`,
        `convenience_${number}_mile_${transport}`,
        `produce_${number}_mile_${transport}`,
        `service_${number}_mile_${transport}`,
    ];
    return list;
}

function getStoreAndTransportation(store, transport, map) {
    let transportList = [];
    if (transport === 'biking') {
        transportList = getAllBikingList(transport);
    } else if (transport === 'walking') {
        transportList = getAllWalkingList(transport);
    }

    document.getElementById(`${transport}_miles`).addEventListener('input', (event) => {
        document.getElementById(`${transport}_value`).textContent = event.target.value;
        if (map.getLayoutProperty(store, 'visibility') === 'visible') {
            let newList = transportList.filter(element => element.includes(store));
            if (transport === 'biking') {
                let radius = newList.filter(element => element.includes(event.target.value));
                if (event.target.value !== '0') {
                    newList.map((distance) => {
                        map.setLayoutProperty(distance, 'visibility', 'none');
                    });
                    radius.map((distance) => {
                        map.setLayoutProperty(distance, 'visibility', 'visible');
                    })
                } else {
                    newList.map((distance) => {
                        map.setLayoutProperty(distance, 'visibility', 'none');
                    });
                }
            } else if (transport === 'walking') {
                let number = '';
                if (event.target.value === '0.25') {
                    number = 'quarter'
                } else if (event.target.value === '0.5') {
                    number = 'half'
                } else if (event.target.value === '0.75') {
                    number = 'three_quarters'
                } else if (event.target.value === '0') {
                    number = '0';
                } else if (event.target.value === '1') {
                    number = '1';
                }
                let radius = newList.filter(element => element.includes(number));
                if (number !== '0') {
                    newList.map((distance) => {
                        map.setLayoutProperty(distance, 'visibility', 'none');
                    });
                    if (number === 'quarter') {
                        map.setLayoutProperty(radius[0], 'visibility', 'visible');
                    } else {
                        radius.map((distance) => {
                            map.setLayoutProperty(distance, 'visibility', 'visible');
                        });
                    }
                } else {
                    newList.map((distance) => {
                        map.setLayoutProperty(distance, 'visibility', 'none');
                    });
                }
            }
        }
    });
}

function getSingleTransportation(transport, map) {
    document.getElementById(`${transport}_value`).textContent = getDistance(transport);
    if (transport === 'biking') {
        const transportList = getAllBikingList(transport);
        document.getElementById(`${transport}_miles`).addEventListener('input', (event) => {
            document.getElementById(`${transport}_value`).textContent = event.target.value;
            const list = getBikingList(event.target.value, transport);
            if (event.target.value !== '0') {
                transportList.map((distance) => {
                    map.setLayoutProperty(distance, 'visibility', 'none');
                });
                list.map((distance) => {
                    map.setLayoutProperty(distance, 'visibility', 'visible');
                })
            } else {
                transportList.map((distance) => {
                    map.setLayoutProperty(distance, 'visibility', 'none');
                });
            }
        });
    } else if (transport === 'walking') {
        const walkingList = getAllWalkingList(transport);
        document.getElementById(`${transport}_miles`).addEventListener('input', (event) => {
            document.getElementById(`${transport}_value`).textContent = event.target.value;
            const list = getWalkingList(event.target.value, transport);
            if (event.target.value !== '0') {
                walkingList.map((distance) => {
                    map.setLayoutProperty(distance, 'visibility', 'none');
                });
                list.map((distance) => {
                    map.setLayoutProperty(distance, 'visibility', 'visible');
                })
            } else {
                walkingList.map((distance) => {
                    map.setLayoutProperty(distance, 'visibility', 'none');
                });
            }
        });
    }
}

async function createMap(mode) {
    mapboxgl.accessToken = 'pk.eyJ1Ijoic29zaGlrdW4iLCJhIjoiY2wyczRidHBzMGUwejNqcXJqM2JxMTdvdSJ9.PZsigyD7XEJ6qYqUuqUs0g';

    let map = new mapboxgl.Map({
        container: 'map',
        style: `mapbox://styles/mapbox/${mode}-v10`,
        minZoom: 1,
        maxZoom: 15,
        zoom: 8.5,
        center: [-119, 46.3]
    });

    map.on('load', async () => {
        const grocery = await getData('grocery');

        const grocery_0_mile_walking = {
            type: 'FeatureCollection',
            features: grocery.features.map((location) => {
                return {
                    "type": "Feature",
                    "properties": {
                        "name": `0 Mile Walking Radius of ${location.properties['Name']}`
                    },
                    "geometry": createGeoJSONCircle(location.geometry.coordinates, 0)
                }
            })
        }

        const grocery_quarter_mile_walking = {
            type: 'FeatureCollection',
            features: grocery.features.map((location) => {
                return {
                    "type": "Feature",
                    "properties": {
                        "name": `0.5 Mile Walking Radius of ${location.properties['Name']}`
                    },
                    "geometry": createGeoJSONCircle(location.geometry.coordinates, 0.402336)
                }
            })
        }

        const grocery_half_mile_walking = {
            type: 'FeatureCollection',
            features: grocery.features.map((location) => {
                return {
                    "type": "Feature",
                    "properties": {
                        "name": `0.5 Mile Walking Radius of ${location.properties['Name']}`
                    },
                    "geometry": createGeoJSONCircle(location.geometry.coordinates, 0.804672)
                }
            })
        }

        const grocery_three_quarters_mile_walking = {
            type: 'FeatureCollection',
            features: grocery.features.map((location) => {
                return {
                    "type": "Feature",
                    "properties": {
                        "name": `0.5 Mile Walking Radius of ${location.properties['Name']}`
                    },
                    "geometry": createGeoJSONCircle(location.geometry.coordinates, 1.207008)
                }
            })
        }

        const grocery_1_mile_walking = {
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

        const grocery_0_miles_biking = {
            type: 'FeatureCollection',
            features: grocery.features.map((location) => {
                return {
                    "type": "Feature",
                    "properties": {
                        "name": `0 Miles Biking Radius of ${location.properties['Name']}`
                    },
                    "geometry": createGeoJSONCircle(location.geometry.coordinates, 0)
                }
            })
        }

        const grocery_1_miles_biking = {
            type: 'FeatureCollection',
            features: grocery.features.map((location) => {
                return {
                    "type": "Feature",
                    "properties": {
                        "name": `1 Mile Biking Radius of ${location.properties['Name']}`
                    },
                    "geometry": createGeoJSONCircle(location.geometry.coordinates, 1.60934)
                }
            })
        }

        const grocery_2_miles_biking = {
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

        const grocery_3_miles_biking = {
            type: 'FeatureCollection',
            features: grocery.features.map((location) => {
                return {
                    "type": "Feature",
                    "properties": {
                        "name": `3 Miles Biking Radius of ${location.properties['Name']}`
                    },
                    "geometry": createGeoJSONCircle(location.geometry.coordinates, 4.82803)
                }
            })
        }

        const grocery_4_miles_biking = {
            type: 'FeatureCollection',
            features: grocery.features.map((location) => {
                return {
                    "type": "Feature",
                    "properties": {
                        "name": `4 Miles Biking Radius of ${location.properties['Name']}`
                    },
                    "geometry": createGeoJSONCircle(location.geometry.coordinates, 6.43738)
                }
            })
        }

        const grocery_5_miles_biking = {
            type: 'FeatureCollection',
            features: grocery.features.map((location) => {
                return {
                    "type": "Feature",
                    "properties": {
                        "name": `5 Miles Biking Radius of ${location.properties['Name']}`
                    },
                    "geometry": createGeoJSONCircle(location.geometry.coordinates, 8.04672)
                }
            })
        }

        const convenience = await getData('convenience');

        const convenience_0_mile_walking = {
            type: 'FeatureCollection',
            features: convenience.features.map((location) => {
                return {
                    "type": "Feature",
                    "properties": {
                        "name": `0 Mile Walking Radius of ${location.properties['Name']}`
                    },
                    "geometry": createGeoJSONCircle(location.geometry.coordinates, 0)
                }
            })
        }

        const convenience_quarter_mile_walking = {
            type: 'FeatureCollection',
            features: convenience.features.map((location) => {
                return {
                    "type": "Feature",
                    "properties": {
                        "name": `0.5 Mile Walking Radius of ${location.properties['Name']}`
                    },
                    "geometry": createGeoJSONCircle(location.geometry.coordinates, 0.402336)
                }
            })
        }

        const convenience_half_mile_walking = {
            type: 'FeatureCollection',
            features: convenience.features.map((location) => {
                return {
                    "type": "Feature",
                    "properties": {
                        "name": `0.5 Mile Walking Radius of ${location.properties['Name']}`
                    },
                    "geometry": createGeoJSONCircle(location.geometry.coordinates, 0.804672)
                }
            })
        }

        const convenience_three_quarters_mile_walking = {
            type: 'FeatureCollection',
            features: convenience.features.map((location) => {
                return {
                    "type": "Feature",
                    "properties": {
                        "name": `0.5 Mile Walking Radius of ${location.properties['Name']}`
                    },
                    "geometry": createGeoJSONCircle(location.geometry.coordinates, 1.207008)
                }
            })
        }

        const convenience_1_mile_walking = {
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

        const convenience_0_miles_biking = {
            type: 'FeatureCollection',
            features: convenience.features.map((location) => {
                return {
                    "type": "Feature",
                    "properties": {
                        "name": `0 Miles Biking Radius of ${location.properties['Name']}`
                    },
                    "geometry": createGeoJSONCircle(location.geometry.coordinates, 0)
                }
            })
        }

        const convenience_1_miles_biking = {
            type: 'FeatureCollection',
            features: convenience.features.map((location) => {
                return {
                    "type": "Feature",
                    "properties": {
                        "name": `2 Miles Biking Radius of ${location.properties['Name']}`
                    },
                    "geometry": createGeoJSONCircle(location.geometry.coordinates, 1.60934)
                }
            })
        }

        const convenience_2_miles_biking = {
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

        const convenience_3_miles_biking = {
            type: 'FeatureCollection',
            features: convenience.features.map((location) => {
                return {
                    "type": "Feature",
                    "properties": {
                        "name": `3 Miles Biking Radius of ${location.properties['Name']}`
                    },
                    "geometry": createGeoJSONCircle(location.geometry.coordinates, 4.82803)
                }
            })
        }

        const convenience_4_miles_biking = {
            type: 'FeatureCollection',
            features: convenience.features.map((location) => {
                return {
                    "type": "Feature",
                    "properties": {
                        "name": `4 Miles Biking Radius of ${location.properties['Name']}`
                    },
                    "geometry": createGeoJSONCircle(location.geometry.coordinates, 6.43738)
                }
            })
        }

        const convenience_5_miles_biking = {
            type: 'FeatureCollection',
            features: convenience.features.map((location) => {
                return {
                    "type": "Feature",
                    "properties": {
                        "name": `5 Miles Biking Radius of ${location.properties['Name']}`
                    },
                    "geometry": createGeoJSONCircle(location.geometry.coordinates, 8.04672)
                }
            })
        }

        const produce = await getData('produce');

        const produce_0_mile_walking = {
            type: 'FeatureCollection',
            features: produce.features.map((location) => {
                return {
                    "type": "Feature",
                    "properties": {
                        "name": `0 Mile Walking Radius of ${location.properties['Name']}`
                    },
                    "geometry": createGeoJSONCircle(location.geometry.coordinates, 0)
                }
            })
        }

        const produce_quarter_mile_walking = {
            type: 'FeatureCollection',
            features: produce.features.map((location) => {
                return {
                    "type": "Feature",
                    "properties": {
                        "name": `0.5 Mile Walking Radius of ${location.properties['Name']}`
                    },
                    "geometry": createGeoJSONCircle(location.geometry.coordinates, 0.402336)
                }
            })
        }

        const produce_half_mile_walking = {
            type: 'FeatureCollection',
            features: produce.features.map((location) => {
                return {
                    "type": "Feature",
                    "properties": {
                        "name": `0.5 Mile Walking Radius of ${location.properties['Name']}`
                    },
                    "geometry": createGeoJSONCircle(location.geometry.coordinates, 0.804672)
                }
            })
        }

        const produce_three_quarters_mile_walking = {
            type: 'FeatureCollection',
            features: produce.features.map((location) => {
                return {
                    "type": "Feature",
                    "properties": {
                        "name": `0.5 Mile Walking Radius of ${location.properties['Name']}`
                    },
                    "geometry": createGeoJSONCircle(location.geometry.coordinates, 1.207008)
                }
            })
        }

        const produce_1_mile_walking = {
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

        const produce_0_miles_biking = {
            type: 'FeatureCollection',
            features: produce.features.map((location) => {
                return {
                    "type": "Feature",
                    "properties": {
                        "name": `0 Miles Biking Radius of ${location.properties['Name']}`
                    },
                    "geometry": createGeoJSONCircle(location.geometry.coordinates, 0)
                }
            })
        }

        const produce_1_miles_biking = {
            type: 'FeatureCollection',
            features: produce.features.map((location) => {
                return {
                    "type": "Feature",
                    "properties": {
                        "name": `2 Miles Biking Radius of ${location.properties['Name']}`
                    },
                    "geometry": createGeoJSONCircle(location.geometry.coordinates, 1.60934)
                }
            })
        }

        const produce_2_miles_biking = {
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

        const produce_3_miles_biking = {
            type: 'FeatureCollection',
            features: produce.features.map((location) => {
                return {
                    "type": "Feature",
                    "properties": {
                        "name": `3 Miles Biking Radius of ${location.properties['Name']}`
                    },
                    "geometry": createGeoJSONCircle(location.geometry.coordinates, 4.82803)
                }
            })
        }

        const produce_4_miles_biking = {
            type: 'FeatureCollection',
            features: produce.features.map((location) => {
                return {
                    "type": "Feature",
                    "properties": {
                        "name": `4 Miles Biking Radius of ${location.properties['Name']}`
                    },
                    "geometry": createGeoJSONCircle(location.geometry.coordinates, 6.43738)
                }
            })
        }

        const produce_5_miles_biking = {
            type: 'FeatureCollection',
            features: produce.features.map((location) => {
                return {
                    "type": "Feature",
                    "properties": {
                        "name": `5 Miles Biking Radius of ${location.properties['Name']}`
                    },
                    "geometry": createGeoJSONCircle(location.geometry.coordinates, 8.04672)
                }
            })
        }

        const service = await getData('service');

        const service_0_mile_walking = {
            type: 'FeatureCollection',
            features: service.features.map((location) => {
                return {
                    "type": "Feature",
                    "properties": {
                        "name": `0 Mile Walking Radius of ${location.properties['Name']}`
                    },
                    "geometry": createGeoJSONCircle(location.geometry.coordinates, 0)
                }
            })
        }

        const service_quarter_mile_walking = {
            type: 'FeatureCollection',
            features: service.features.map((location) => {
                return {
                    "type": "Feature",
                    "properties": {
                        "name": `0.5 Mile Walking Radius of ${location.properties['Name']}`
                    },
                    "geometry": createGeoJSONCircle(location.geometry.coordinates, 0.402336)
                }
            })
        }

        const service_half_mile_walking = {
            type: 'FeatureCollection',
            features: service.features.map((location) => {
                return {
                    "type": "Feature",
                    "properties": {
                        "name": `0.5 Mile Walking Radius of ${location.properties['Name']}`
                    },
                    "geometry": createGeoJSONCircle(location.geometry.coordinates, 0.804672)
                }
            })
        }

        const service_three_quarters_mile_walking = {
            type: 'FeatureCollection',
            features: service.features.map((location) => {
                return {
                    "type": "Feature",
                    "properties": {
                        "name": `0.5 Mile Walking Radius of ${location.properties['Name']}`
                    },
                    "geometry": createGeoJSONCircle(location.geometry.coordinates, 1.207008)
                }
            })
        }

        const service_1_mile_walking = {
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

        const service_0_miles_biking = {
            type: 'FeatureCollection',
            features: service.features.map((location) => {
                return {
                    "type": "Feature",
                    "properties": {
                        "name": `0 Miles Biking Radius of ${location.properties['Name']}`
                    },
                    "geometry": createGeoJSONCircle(location.geometry.coordinates, 0)
                }
            })
        }

        const service_1_miles_biking = {
            type: 'FeatureCollection',
            features: service.features.map((location) => {
                return {
                    "type": "Feature",
                    "properties": {
                        "name": `2 Miles Biking Radius of ${location.properties['Name']}`
                    },
                    "geometry": createGeoJSONCircle(location.geometry.coordinates, 1.60934)
                }
            })
        }

        const service_2_miles_biking = {
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

        const service_3_miles_biking = {
            type: 'FeatureCollection',
            features: service.features.map((location) => {
                return {
                    "type": "Feature",
                    "properties": {
                        "name": `3 Miles Biking Radius of ${location.properties['Name']}`
                    },
                    "geometry": createGeoJSONCircle(location.geometry.coordinates, 4.82803)
                }
            })
        }

        const service_4_miles_biking = {
            type: 'FeatureCollection',
            features: service.features.map((location) => {
                return {
                    "type": "Feature",
                    "properties": {
                        "name": `4 Miles Biking Radius of ${location.properties['Name']}`
                    },
                    "geometry": createGeoJSONCircle(location.geometry.coordinates, 6.43738)
                }
            })
        }

        const service_5_miles_biking = {
            type: 'FeatureCollection',
            features: service.features.map((location) => {
                return {
                    "type": "Feature",
                    "properties": {
                        "name": `5 Miles Biking Radius of ${location.properties['Name']}`
                    },
                    "geometry": createGeoJSONCircle(location.geometry.coordinates, 8.04672)
                }
            })
        }

        const transit = await getData('transit');
        const transit_routes = await getData('BFTransit_Routes');
        const borders = await getData('borders');
        const driving = await getData('driving');

        const grocery_driving = await getData('grocery_driving');
        const convenience_driving = await getData('convenience_driving');
        const produce_driving = await getData('produce_driving');
        const service_driving = await getData('service_driving');

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

        map.addSource('grocery_0_mile_walking', {
            type: 'geojson',
            data: grocery_0_mile_walking
        });

        map.addLayer({
            'id': 'grocery_0_mile_walking',
            'source': 'grocery_0_mile_walking',
            'type': 'fill',
            'paint': {
                'fill-color': '#0004ff', // blue color fill
                'fill-opacity': 0.3
            },
            'layout': {
                'visibility': 'none',
            },
        });

        map.addSource('grocery_quarter_mile_walking', {
            type: 'geojson',
            data: grocery_quarter_mile_walking
        });

        map.addLayer({
            'id': 'grocery_quarter_mile_walking',
            'source': 'grocery_quarter_mile_walking',
            'type': 'fill',
            'paint': {
                'fill-color': '#0004ff', // blue color fill
                'fill-opacity': 0.3
            },
            'layout': {
                'visibility': 'none',
            },
        });

        map.addSource('grocery_half_mile_walking', {
            type: 'geojson',
            data: grocery_half_mile_walking
        });

        map.addLayer({
            'id': 'grocery_half_mile_walking',
            'source': 'grocery_half_mile_walking',
            'type': 'fill',
            'paint': {
                'fill-color': '#0004ff', // blue color fill
                'fill-opacity': 0.3
            },
            'layout': {
                'visibility': 'none',
            },
        });

        map.addSource('grocery_three_quarters_mile_walking', {
            type: 'geojson',
            data: grocery_three_quarters_mile_walking
        });

        map.addLayer({
            'id': 'grocery_three_quarters_mile_walking',
            'source': 'grocery_three_quarters_mile_walking',
            'type': 'fill',
            'paint': {
                'fill-color': '#0004ff', // blue color fill
                'fill-opacity': 0.3
            },
            'layout': {
                'visibility': 'none',
            },
        });

        map.addSource('grocery_1_mile_walking', {
            type: 'geojson',
            data: grocery_1_mile_walking
        });

        map.addLayer({
            'id': 'grocery_1_mile_walking',
            'source': 'grocery_1_mile_walking',
            'type': 'fill',
            'paint': {
                'fill-color': '#0004ff', // blue color fill
                'fill-opacity': 0.3
            },
            'layout': {
                'visibility': 'none',
            },
        });

        map.addSource('grocery_0_miles_biking', {
            type: 'geojson',
            data: grocery_0_miles_biking
        });

        map.addLayer({
            'id': 'grocery_0_miles_biking',
            'type': 'fill',
            'source': 'grocery_0_miles_biking',
            'layout': {
                'visibility': 'none',
            },
            'paint': {
                'fill-color': '#00ff80', // green color fill
                'fill-opacity': 0.6
            }
        });

        map.addSource('grocery_1_miles_biking', {
            type: 'geojson',
            data: grocery_1_miles_biking
        });

        map.addLayer({
            'id': 'grocery_1_miles_biking',
            'type': 'fill',
            'source': 'grocery_1_miles_biking',
            'layout': {
                'visibility': 'none',
            },
            'paint': {
                'fill-color': '#00ff80', // green color fill
                'fill-opacity': 0.6
            }
        });

        map.addSource('grocery_2_miles_biking', {
            type: 'geojson',
            data: grocery_2_miles_biking
        });

        map.addLayer({
            'id': 'grocery_2_miles_biking',
            'type': 'fill',
            'source': 'grocery_2_miles_biking',
            'layout': {
                'visibility': 'none',
            },
            'paint': {
                'fill-color': '#00ff80', // green color fill
                'fill-opacity': 0.6
            }
        });

        map.addSource('grocery_3_miles_biking', {
            type: 'geojson',
            data: grocery_3_miles_biking
        });

        map.addLayer({
            'id': 'grocery_3_miles_biking',
            'type': 'fill',
            'source': 'grocery_3_miles_biking',
            'layout': {
                'visibility': 'none',
            },
            'paint': {
                'fill-color': '#00ff80', // green color fill
                'fill-opacity': 0.6
            }
        });

        map.addSource('grocery_4_miles_biking', {
            type: 'geojson',
            data: grocery_4_miles_biking
        });

        map.addLayer({
            'id': 'grocery_4_miles_biking',
            'type': 'fill',
            'source': 'grocery_4_miles_biking',
            'layout': {
                'visibility': 'none',
            },
            'paint': {
                'fill-color': '#00ff80', // green color fill
                'fill-opacity': 0.6
            }
        });

        map.addSource('grocery_5_miles_biking', {
            type: 'geojson',
            data: grocery_5_miles_biking
        });

        map.addLayer({
            'id': 'grocery_5_miles_biking',
            'type': 'fill',
            'source': 'grocery_5_miles_biking',
            'layout': {
                'visibility': 'none',
            },
            'paint': {
                'fill-color': '#00ff80', // green color fill
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

        map.addSource('convenience_0_mile_walking', {
            type: 'geojson',
            data: convenience_0_mile_walking
        });

        map.addLayer({
            'id': 'convenience_0_mile_walking',
            'source': 'convenience_0_mile_walking',
            'type': 'fill',
            'paint': {
                'fill-color': '#0004ff', // blue color fill
                'fill-opacity': 0.3
            },
            'layout': {
                'visibility': 'none',
            },
        });

        map.addSource('convenience_quarter_mile_walking', {
            type: 'geojson',
            data: convenience_quarter_mile_walking
        });

        map.addLayer({
            'id': 'convenience_quarter_mile_walking',
            'source': 'convenience_quarter_mile_walking',
            'type': 'fill',
            'paint': {
                'fill-color': '#0004ff', // blue color fill
                'fill-opacity': 0.3
            },
            'layout': {
                'visibility': 'none',
            },
        });

        map.addSource('convenience_half_mile_walking', {
            type: 'geojson',
            data: convenience_half_mile_walking
        });

        map.addLayer({
            'id': 'convenience_half_mile_walking',
            'source': 'convenience_half_mile_walking',
            'type': 'fill',
            'paint': {
                'fill-color': '#0004ff', // blue color fill
                'fill-opacity': 0.3
            },
            'layout': {
                'visibility': 'none',
            },
        });

        map.addSource('convenience_three_quarters_mile_walking', {
            type: 'geojson',
            data: convenience_three_quarters_mile_walking
        });

        map.addLayer({
            'id': 'convenience_three_quarters_mile_walking',
            'source': 'convenience_three_quarters_mile_walking',
            'type': 'fill',
            'paint': {
                'fill-color': '#0004ff', // blue color fill
                'fill-opacity': 0.3
            },
            'layout': {
                'visibility': 'none',
            },
        });

        map.addSource('convenience_1_mile_walking', {
            type: 'geojson',
            data: convenience_1_mile_walking
        });

        map.addLayer({
            'id': 'convenience_1_mile_walking',
            'source': 'convenience_1_mile_walking',
            'type': 'fill',
            'paint': {
                'fill-color': '#0004ff', // blue color fill
                'fill-opacity': 0.3
            },
            'layout': {
                'visibility': 'none',
            },
        });

        map.addSource('convenience_0_miles_biking', {
            type: 'geojson',
            data: convenience_0_miles_biking
        });

        map.addLayer({
            'id': 'convenience_0_miles_biking',
            'source': 'convenience_0_miles_biking',
            'type': 'fill',
            'paint': {
                'fill-color': '#00ff80', // green color fill
                'fill-opacity': 0.3
            },
            'layout': {
                'visibility': 'none',
            },
        });

        map.addSource('convenience_1_miles_biking', {
            type: 'geojson',
            data: convenience_1_miles_biking
        });

        map.addLayer({
            'id': 'convenience_1_miles_biking',
            'source': 'convenience_1_miles_biking',
            'type': 'fill',
            'paint': {
                'fill-color': '#00ff80', // green color fill
                'fill-opacity': 0.3
            },
            'layout': {
                'visibility': 'none',
            },
        });

        map.addSource('convenience_2_miles_biking', {
            type: 'geojson',
            data: convenience_2_miles_biking
        });

        map.addLayer({
            'id': 'convenience_2_miles_biking',
            'source': 'convenience_2_miles_biking',
            'type': 'fill',
            'paint': {
                'fill-color': '#00ff80', // green color fill
                'fill-opacity': 0.3
            },
            'layout': {
                'visibility': 'none',
            },
        });

        map.addSource('convenience_3_miles_biking', {
            type: 'geojson',
            data: convenience_3_miles_biking
        });

        map.addLayer({
            'id': 'convenience_3_miles_biking',
            'source': 'convenience_3_miles_biking',
            'type': 'fill',
            'paint': {
                'fill-color': '#00ff80', // green color fill
                'fill-opacity': 0.3
            },
            'layout': {
                'visibility': 'none',
            },
        });

        map.addSource('convenience_4_miles_biking', {
            type: 'geojson',
            data: convenience_4_miles_biking
        });

        map.addLayer({
            'id': 'convenience_4_miles_biking',
            'source': 'convenience_4_miles_biking',
            'type': 'fill',
            'paint': {
                'fill-color': '#00ff80', // green color fill
                'fill-opacity': 0.3
            },
            'layout': {
                'visibility': 'none',
            },
        });

        map.addSource('convenience_5_miles_biking', {
            type: 'geojson',
            data: convenience_5_miles_biking
        });

        map.addLayer({
            'id': 'convenience_5_miles_biking',
            'source': 'convenience_5_miles_biking',
            'type': 'fill',
            'paint': {
                'fill-color': '#00ff80', // green color fill
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

        map.addSource('produce_0_mile_walking', {
            type: 'geojson',
            data: produce_0_mile_walking
        });

        map.addLayer({
            'id': 'produce_0_mile_walking',
            'source': 'produce_0_mile_walking',
            'type': 'fill',
            'paint': {
                'fill-color': '#0004ff', // blue color fill
                'fill-opacity': 0.3
            },
            'layout': {
                'visibility': 'none',
            },
        });

        map.addSource('produce_quarter_mile_walking', {
            type: 'geojson',
            data: produce_quarter_mile_walking
        });

        map.addLayer({
            'id': 'produce_quarter_mile_walking',
            'source': 'produce_quarter_mile_walking',
            'type': 'fill',
            'paint': {
                'fill-color': '#0004ff', // blue color fill
                'fill-opacity': 0.3
            },
            'layout': {
                'visibility': 'none',
            },
        });

        map.addSource('produce_half_mile_walking', {
            type: 'geojson',
            data: produce_half_mile_walking
        });

        map.addLayer({
            'id': 'produce_half_mile_walking',
            'source': 'produce_half_mile_walking',
            'type': 'fill',
            'paint': {
                'fill-color': '#0004ff', // blue color fill
                'fill-opacity': 0.3
            },
            'layout': {
                'visibility': 'none',
            },
        });

        map.addSource('produce_three_quarters_mile_walking', {
            type: 'geojson',
            data: produce_three_quarters_mile_walking
        });

        map.addLayer({
            'id': 'produce_three_quarters_mile_walking',
            'source': 'produce_three_quarters_mile_walking',
            'type': 'fill',
            'paint': {
                'fill-color': '#0004ff', // blue color fill
                'fill-opacity': 0.3
            },
            'layout': {
                'visibility': 'none',
            },
        });

        map.addSource('produce_1_mile_walking', {
            type: 'geojson',
            data: produce_1_mile_walking
        });

        map.addLayer({
            'id': 'produce_1_mile_walking',
            'source': 'produce_1_mile_walking',
            'type': 'fill',
            'paint': {
                'fill-color': '#0004ff', // blue color fill
                'fill-opacity': 0.3
            },
            'layout': {
                'visibility': 'none',
            },
        });

        map.addSource('produce_0_miles_biking', {
            type: 'geojson',
            data: produce_0_miles_biking
        });

        map.addLayer({
            'id': 'produce_0_miles_biking',
            'source': 'produce_0_miles_biking',
            'type': 'fill',
            'paint': {
                'fill-color': '#00ff80', // green color fill
                'fill-opacity': 0.3
            },
            'layout': {
                'visibility': 'none',
            },
        });

        map.addSource('produce_1_miles_biking', {
            type: 'geojson',
            data: produce_1_miles_biking
        });

        map.addLayer({
            'id': 'produce_1_miles_biking',
            'source': 'produce_1_miles_biking',
            'type': 'fill',
            'paint': {
                'fill-color': '#00ff80', // green color fill
                'fill-opacity': 0.3
            },
            'layout': {
                'visibility': 'none',
            },
        });

        map.addSource('produce_2_miles_biking', {
            type: 'geojson',
            data: produce_2_miles_biking
        });

        map.addLayer({
            'id': 'produce_2_miles_biking',
            'source': 'produce_2_miles_biking',
            'type': 'fill',
            'paint': {
                'fill-color': '#00ff80', // green color fill
                'fill-opacity': 0.3
            },
            'layout': {
                'visibility': 'none',
            },
        });

        map.addSource('produce_3_miles_biking', {
            type: 'geojson',
            data: produce_3_miles_biking
        });

        map.addLayer({
            'id': 'produce_3_miles_biking',
            'source': 'produce_3_miles_biking',
            'type': 'fill',
            'paint': {
                'fill-color': '#00ff80', // green color fill
                'fill-opacity': 0.3
            },
            'layout': {
                'visibility': 'none',
            },
        });

        map.addSource('produce_4_miles_biking', {
            type: 'geojson',
            data: produce_4_miles_biking
        });

        map.addLayer({
            'id': 'produce_4_miles_biking',
            'source': 'produce_4_miles_biking',
            'type': 'fill',
            'paint': {
                'fill-color': '#00ff80', // green color fill
                'fill-opacity': 0.3
            },
            'layout': {
                'visibility': 'none',
            },
        });

        map.addSource('produce_5_miles_biking', {
            type: 'geojson',
            data: produce_5_miles_biking
        });

        map.addLayer({
            'id': 'produce_5_miles_biking',
            'source': 'produce_5_miles_biking',
            'type': 'fill',
            'paint': {
                'fill-color': '#00ff80', // green color fill
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

        map.addSource('service_0_mile_walking', {
            type: 'geojson',
            data: service_0_mile_walking
        });

        map.addLayer({
            'id': 'service_0_mile_walking',
            'source': 'service_0_mile_walking',
            'type': 'fill',
            'paint': {
                'fill-color': '#0004ff', // blue color fill 
                'fill-opacity': 0.3
            },
            'layout': {
                'visibility': 'none',
            },
        });

        map.addSource('service_quarter_mile_walking', {
            type: 'geojson',
            data: service_quarter_mile_walking
        });

        map.addLayer({
            'id': 'service_quarter_mile_walking',
            'source': 'service_quarter_mile_walking',
            'type': 'fill',
            'paint': {
                'fill-color': '#0004ff', // blue color fill 
                'fill-opacity': 0.3
            },
            'layout': {
                'visibility': 'none',
            },
        });

        map.addSource('service_half_mile_walking', {
            type: 'geojson',
            data: service_half_mile_walking
        });

        map.addLayer({
            'id': 'service_half_mile_walking',
            'source': 'service_half_mile_walking',
            'type': 'fill',
            'paint': {
                'fill-color': '#0004ff', // blue color fill 
                'fill-opacity': 0.3
            },
            'layout': {
                'visibility': 'none',
            },
        });

        map.addSource('service_three_quarters_mile_walking', {
            type: 'geojson',
            data: service_three_quarters_mile_walking
        });

        map.addLayer({
            'id': 'service_three_quarters_mile_walking',
            'source': 'service_three_quarters_mile_walking',
            'type': 'fill',
            'paint': {
                'fill-color': '#0004ff', // blue color fill 
                'fill-opacity': 0.3
            },
            'layout': {
                'visibility': 'none',
            },
        });

        map.addSource('service_1_mile_walking', {
            type: 'geojson',
            data: service_1_mile_walking
        });

        map.addLayer({
            'id': 'service_1_mile_walking',
            'source': 'service_1_mile_walking',
            'type': 'fill',
            'paint': {
                'fill-color': '#0004ff', // blue color fill 
                'fill-opacity': 0.3
            },
            'layout': {
                'visibility': 'none',
            },
        });

        map.addSource('service_0_miles_biking', {
            type: 'geojson',
            data: service_0_miles_biking
        });

        map.addLayer({
            'id': 'service_0_miles_biking',
            'source': 'service_0_miles_biking',
            'type': 'fill',
            'paint': {
                'fill-color': '#00ff80', // green color fill
                'fill-opacity': 0.3
            },
            'layout': {
                'visibility': 'none',
            },
        });

        map.addSource('service_1_miles_biking', {
            type: 'geojson',
            data: service_1_miles_biking
        });

        map.addLayer({
            'id': 'service_1_miles_biking',
            'source': 'service_1_miles_biking',
            'type': 'fill',
            'paint': {
                'fill-color': '#00ff80', // green color fill
                'fill-opacity': 0.3
            },
            'layout': {
                'visibility': 'none',
            },
        });

        map.addSource('service_2_miles_biking', {
            type: 'geojson',
            data: service_2_miles_biking
        });

        map.addLayer({
            'id': 'service_2_miles_biking',
            'source': 'service_2_miles_biking',
            'type': 'fill',
            'paint': {
                'fill-color': '#00ff80', // green color fill
                'fill-opacity': 0.3
            },
            'layout': {
                'visibility': 'none',
            },
        });

        map.addSource('service_3_miles_biking', {
            type: 'geojson',
            data: service_3_miles_biking
        });

        map.addLayer({
            'id': 'service_3_miles_biking',
            'source': 'service_3_miles_biking',
            'type': 'fill',
            'paint': {
                'fill-color': '#00ff80', // green color fill
                'fill-opacity': 0.3
            },
            'layout': {
                'visibility': 'none',
            },
        });

        map.addSource('service_4_miles_biking', {
            type: 'geojson',
            data: service_4_miles_biking
        });

        map.addLayer({
            'id': 'service_4_miles_biking',
            'source': 'service_4_miles_biking',
            'type': 'fill',
            'paint': {
                'fill-color': '#00ff80', // green color fill
                'fill-opacity': 0.3
            },
            'layout': {
                'visibility': 'none',
            },
        });

        map.addSource('service_5_miles_biking', {
            type: 'geojson',
            data: service_5_miles_biking
        });

        map.addLayer({
            'id': 'service_5_miles_biking',
            'source': 'service_5_miles_biking',
            'type': 'fill',
            'paint': {
                'fill-color': '#00ff80', // green color fill
                'fill-opacity': 0.3
            },
            'layout': {
                'visibility': 'none',
            },
        });

        map.addSource('transit', {
            type: 'geojson',
            data: transit
        });

        map.addLayer({
            'id': 'transit',
            'source': 'transit',
            'type': 'fill',
            'paint': {
                'fill-color': '#ff0000', // red color fill
                'fill-opacity': 0.05
            },
            'layout': {
                'visibility': 'none',
            }
        });

        map.addSource('transit_routes', {
            type: 'geojson',
            data: transit_routes
        });

        map.addLayer({
            'id': 'transit_routes',
            'source': 'transit_routes',
            'type': 'line',
            'paint': {
                'line-color': '#000000', // black color line
                'line-opacity': 0.3
            },
            'layout': {
                'visibility': 'none',
            }
        });

        map.addSource('borders', {
            type: 'geojson',
            data: borders
        });

        map.addLayer({
            'id': 'borders',
            'source': 'borders',
            'type': 'line',
            'paint': {
                'line-color': '#000000', // black color line
                'line-opacity': 1,
                'line-width': 3
            },
            'layout': {
                'visibility': 'visible',
            }
        });

        map.addSource('driving', {
            type: 'geojson',
            data: driving
        });

        map.addLayer({
            'id': 'driving',
            'source': 'driving',
            'type': 'fill',
            'paint': {
                'fill-color': '#f2ff00', // yellow color fill
                'fill-opacity': 0.3
            },
            'layout': {
                'visibility': 'none',
            }
        });

        map.addSource('grocery_driving', {
            type: 'geojson',
            data: grocery_driving
        });

        map.addLayer({
            'id': 'grocery_driving',
            'source': 'grocery_driving',
            'type': 'fill',
            'paint': {
                'fill-color': '#f2ff00', // yellow color fill
                'fill-opacity': 0.3
            },
            'layout': {
                'visibility': 'none',
            }
        });

        map.addSource('convenience_driving', {
            type: 'geojson',
            data: convenience_driving
        });

        map.addLayer({
            'id': 'convenience_driving',
            'source': 'convenience_driving',
            'type': 'fill',
            'paint': {
                'fill-color': '#f2ff00', // yellow color fill
                'fill-opacity': 0.3
            },
            'layout': {
                'visibility': 'none',
            }
        });

        map.addSource('produce_driving', {
            type: 'geojson',
            data: produce_driving
        });

        map.addLayer({
            'id': 'produce_driving',
            'source': 'produce_driving',
            'type': 'fill',
            'paint': {
                'fill-color': '#f2ff00', // yellow color fill
                'fill-opacity': 0.3
            },
            'layout': {
                'visibility': 'none',
            }
        });

        map.addSource('service_driving', {
            type: 'geojson',
            data: service_driving
        });

        map.addLayer({
            'id': 'service_driving',
            'source': 'service_driving',
            'type': 'fill',
            'paint': {
                'fill-color': '#f2ff00', // yellow color fill
                'fill-opacity': 0.3
            },
            'layout': {
                'visibility': 'none',
            }
        });

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

        let current = [];
        let transportation = [];
        let filters = document.getElementsByTagName('input');
        for (let i = 0; i < filters.length; i++) {
            filters[i].addEventListener('click', () => {
                if (filters[i].type === 'checkbox' && filters[i].id !== 'toggle') {
                    let selection = filters[i].value;

                    if (selection === 'biking' && current.length === 0) {
                        let bikingList = getAllBikingList('biking');
                        bikingList.map((distance) => {
                            let visible = map.getLayoutProperty(distance, 'visibility');
                            if (visible === 'visible') {
                                map.setLayoutProperty(distance, 'visibility', 'none');
                            }
                        });
                        if (filters[i].classList.contains('clicked')) {
                            document.getElementById('biking_miles').disabled = true;
                            document.getElementById('biking_miles').value = '0';
                            filters[i].classList.remove('clicked');
                        } else {
                            document.getElementById('biking_miles').disabled = false;
                            document.getElementById('biking_miles').value = '0';
                            filters[i].classList.add('clicked');
                        }
                        transportation.push(selection);
                        getSingleTransportation('biking', map);
                    } else if (selection === 'walking' && current.length === 0) {
                        let walkingList = getAllWalkingList('walking');
                        walkingList.map((distance) => {
                            let visible = map.getLayoutProperty(distance, 'visibility');
                            if (visible === 'visible') {
                                map.setLayoutProperty(distance, 'visibility', 'none');
                            }
                        });
                        if (filters[i].classList.contains('clicked')) {
                            document.getElementById('walking_miles').disabled = true;
                            document.getElementById('walking_miles').value = '0';
                            filters[i].classList.remove('clicked');
                        } else {
                            document.getElementById('walking_miles').disabled = false;
                            document.getElementById('walking_miles').value = '0';
                            filters[i].classList.add('clicked');
                        }
                        transportation.push(selection);
                        getSingleTransportation('walking', map);
                    } else if (selection === 'driving') {
                        if (current.length === 0) {
                            let visible = map.getLayoutProperty(selection, 'visibility');
                            if (visible === 'visible') {
                                map.setLayoutProperty('grocery_driving', 'visibility', 'none');
                                map.setLayoutProperty('convenience_driving', 'visibility', 'none');
                                map.setLayoutProperty('produce_driving', 'visibility', 'none');
                                map.setLayoutProperty('service_driving', 'visibility', 'none');
                                map.setLayoutProperty(selection, 'visibility', 'none');
                            } else {
                                map.setLayoutProperty(selection, 'visibility', 'visible');
                            }
                        } else {
                            current.map((store) => {
                                let visible = map.getLayoutProperty(`${store}_driving`, 'visibility');
                                if (visible === 'visible') {
                                    map.setLayoutProperty(`${store}_driving`, 'visibility', 'none');
                                } else {
                                    map.setLayoutProperty(`${store}_driving`, 'visibility', 'visible');
                                }
                            });
                        }
                    } else if (selection === 'transit') {
                        let visible = map.getLayoutProperty(selection, 'visibility');
                        if (visible === 'visible') {
                            map.setLayoutProperty(selection, 'visibility', 'none');
                            map.setLayoutProperty('transit_routes', 'visibility', 'none');
                        } else {
                            map.setLayoutProperty(selection, 'visibility', 'visible');
                            map.setLayoutProperty('transit_routes', 'visibility', 'visible');
                        }
                    } else if (current.length > 0 && (selection === 'biking' || selection === 'walking')) {
                        if (transportation.includes(selection)) {
                            let list = [];
                            if (selection === 'biking') {
                                list = getAllBikingList('biking');
                            } else if (selection === 'walking') {
                                list = getAllWalkingList('walking');
                            }
                            console.log('transportation includes it');
                            if (selection === 'biking') {
                                document.getElementById('biking_miles').disabled = true;
                                document.getElementById('biking_miles').value = '0';
                                document.getElementById('biking_value').textContent = '';
                                filters[i].classList.remove('clicked');
                            } else if (selection === 'walking') {
                                document.getElementById('walking_miles').disabled = true;
                                document.getElementById('walking_miles').value = '0';
                                document.getElementById('walking_value').textContent = '';
                                filters[i].classList.remove('clicked');
                            }
                            list.map((distance) => {
                                map.setLayoutProperty(distance, 'visibility', 'none');
                            });
                            transportation.splice(transportation.indexOf(selection), 1);
                        } else {
                            if (selection === 'biking') {
                                if (filters[i].classList.contains('clicked')) {
                                    document.getElementById('biking_miles').disabled = true;
                                    document.getElementById('biking_miles').value = '0';
                                    filters[i].classList.remove('clicked');
                                } else {
                                    document.getElementById('biking_miles').disabled = false;
                                    document.getElementById('biking_miles').value = '0';
                                    filters[i].classList.add('clicked');
                                }
                                current.map((store) => {
                                    getStoreAndTransportation(store, selection, map);
                                });
                                transportation.push(selection);
                            } else if (selection === 'walking') {
                                if (filters[i].classList.contains('clicked')) {
                                    document.getElementById('walking_miles').disabled = true;
                                    document.getElementById('walking_miles').value = '0';
                                    filters[i].classList.remove('clicked');
                                } else {
                                    document.getElementById('walking_miles').disabled = false;
                                    document.getElementById('walking_miles').value = '0';
                                    filters[i].classList.add('clicked');
                                }
                                current.map((store) => {
                                    getStoreAndTransportation(store, selection, map);
                                });
                                transportation.push(selection);
                            };
                        }
                    } else if ((selection === 'grocery' || selection === 'convenience' || selection === 'produce' || selection === 'service') && document.getElementById('driving').checked === true) {
                        let visible = map.getLayoutProperty(selection, 'visibility');
                        if (visible === 'visible') {
                            current.splice(current.indexOf(selection), 1);
                            if (current.length === 0) {
                                map.setLayoutProperty('grocery_driving', 'visibility', 'none');
                                map.setLayoutProperty('convenience_driving', 'visibility', 'none');
                                map.setLayoutProperty('produce_driving', 'visibility', 'none');
                                map.setLayoutProperty('service_driving', 'visibility', 'none');
                                map.setLayoutProperty('grocery', 'visibility', 'none');
                                map.setLayoutProperty('convenience', 'visibility', 'none');
                                map.setLayoutProperty('produce', 'visibility', 'none');
                                map.setLayoutProperty('service', 'visibility', 'none');
                                map.setLayoutProperty('driving', 'visibility', 'visible');
                            } else {
                                map.setLayoutProperty(selection, 'visibility', 'none');
                                map.setLayoutProperty(`${selection}_driving`, 'visibility', 'none');
                            }
                        } else {
                            current.push(selection);
                            map.setLayoutProperty('driving', 'visibility', 'none');
                            map.setLayoutProperty(selection, 'visibility', 'visible');
                            map.setLayoutProperty(`${selection}_driving`, 'visibility', 'visible');
                        }
                    } else if ((selection === 'grocery' || selection === 'convenience' || selection === 'produce' || selection === 'service') && map.getLayoutProperty(`${selection}_driving`, 'visibility') === 'visible') {
                        let visible = map.getLayoutProperty(selection, 'visibility');
                        if (visible === 'visible') {
                            current.splice(current.indexOf(selection), 1);
                            map.setLayoutProperty('driving', 'visibility', 'none');
                            map.setLayoutProperty(selection, 'visibility', 'none');
                            map.setLayoutProperty(`${selection}_driving`, 'visibility', 'none');
                        } else {
                            current.push(selection);
                            map.setLayoutProperty('driving', 'visibility', 'none');
                            map.setLayoutProperty(selection, 'visibility', 'visible');
                            map.setLayoutProperty(`${selection}_driving`, 'visibility', 'visible');
                        }
                    } else {
                        let visible = map.getLayoutProperty(selection, 'visibility');
                        if (visible === 'visible') {
                            current.splice(current.indexOf(selection), 1);
                            if (transportation.length > 0) {
                                transportation.map((mode) => {
                                    let list = [];
                                    if (mode === 'walking') {
                                        list = getAllWalkingList('walking').filter(element => element.includes(selection));
                                    } else if (mode === 'biking') {
                                        list = getAllBikingList('biking').filter(element => element.includes(selection));
                                    }
                                    list.map((distance) => {
                                        map.setLayoutProperty(distance, 'visibility', 'none');
                                    });
                                })
                            }
                            map.setLayoutProperty(selection, 'visibility', 'none');
                        } else {
                            current.push(selection);
                            if (transportation.length > 0) {
                                transportation.map((mode) => {
                                    let list = [];
                                    let value = document.getElementById(`${mode}_value`).value;
                                    if (mode === 'walking') {
                                        list = getAllWalkingList('walking').filter(element => element.includes(selection));
                                        let number = '';
                                        if (value === '0.25') {
                                            number = 'quarter'
                                        } else if (value === '0.5') {
                                            number = 'half'
                                        } else if (value === '0.75') {
                                            number = 'three_quarters'
                                        } else if (value === '0') {
                                            number = '0';
                                        } else if (value === '1') {
                                            number = '1';
                                        }
                                        let layer = list.filter(element => element.includes(number));
                                        layer.map((distance) => {
                                            if (distance.includes(number)) {
                                                if (number === 'quarter') {
                                                    list.map((radius) => {
                                                        map.setLayoutProperty(radius, 'visibility', 'none');
                                                    });
                                                    map.setLayoutProperty(layer[0], 'visibility', 'visible');
                                                } else {
                                                    map.setLayoutProperty(distance, 'visibility', 'visible');
                                                }
                                            } else {
                                                list.map((radius) => {
                                                    map.setLayoutProperty(radius, 'visibility', 'none');
                                                });
                                            }
                                        });
                                    } else if (mode === 'biking') {
                                        list = getAllBikingList('biking').filter(element => element.includes(selection));
                                        const newDistance = list.filter(element => element.includes(value));
                                        newDistance.map((distance) => {
                                            map.setLayoutProperty(distance, 'visibility', 'visible');
                                        });
                                    }
                                    getStoreAndTransportation(selection, mode, map);
                                })
                            }
                            map.setLayoutProperty(selection, 'visibility', 'visible');
                        }
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
                    map.setLayoutProperty('grocery_driving', 'visibility', 'none');
                    map.setLayoutProperty('convenience_driving', 'visibility', 'none');
                    map.setLayoutProperty('produce_driving', 'visibility', 'none');
                    map.setLayoutProperty('service_driving', 'visibility', 'none');
                    map.setLayoutProperty('driving', 'visibility', 'none');
                    map.setLayoutProperty('transit', 'visibility', 'none');
                    map.setLayoutProperty('transit_routes', 'visibility', 'none');
                }
            }
            current = [];
            transportation = [];
            document.getElementById('biking_miles').disabled = true;
            document.getElementById('biking_miles').value = '0';
            document.getElementById('biking_value').textContent = '';
            document.getElementById('walking_miles').disabled = true;
            document.getElementById('walking_miles').value = '0';
            document.getElementById('walking_value').textContent = '';
            let bikingList = getAllBikingList('biking');
            let walkingList = getAllWalkingList('walking');
            bikingList.map((distance) => {
                map.setLayoutProperty(distance, 'visibility', 'none');
            });
            walkingList.map((distance) => {
                map.setLayoutProperty(distance, 'visibility', 'none');
            });
        });
    });
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