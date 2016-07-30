<template>
    <div id="leaflet-map"></div>
</template>

<script>
    import Leaflet from 'leaflet'
    import markerClusterGroup from 'leaflet.markercluster'
    import mapProvider from '../utilities/leaflet.MapProviders.js'
    import messageBus from '../utilities/messageBus.js'

    const MAP_IMAGE_PATH = "//cdn.bootcss.com/leaflet/1.0.0-rc.2/images/";

    export default {
        props: ['mapData'],
        data() {
            return {
                map: null,
                markers: null,
                map_config: {
                    zoom: 4,
                    center: [37.5, 106],
                    minZoom: 2,
                    maxZoom: 18,
                    attribution: "&copy; Google Map",
                },
            };
        },

        ready() {
            this.initMap();
            this.addMapLayer();
            this.initListenMsg();
        },

        methods: {
            initMap() {
                // need set default L.Icon.Default.imagePath
                L.Icon.Default.imagePath = MAP_IMAGE_PATH;

                this.map = L.map("leaflet-map",{
                    center: this.map_config.center,
                    zoom: this.map_config.zoom,
                    minZoom: this.map_config.minZoom,
                    maxZoom: this.map_config.maxZoom,
                    // scrollWheelZoom: false,
                });
            },

            addMapLayer() {
                L.tileLayer.mapProvider('GaoDe.Normal.Map',
                    {attribution: this.map_config.attribution}).addTo(this.map);
            },

            addClusterLayer(geoJsonData) {
                this.markers = L.markerClusterGroup();

                let geoJsonLayer = L.geoJson(geoJsonData, {
                    onEachFeature: this.onEachFeature
                });

                this.markers.addLayer(geoJsonLayer);
                this.markers.addTo(this.map);
            },

            onEachFeature(feature, layer) {
                layer.bindPopup(feature.properties.name);
            },

            initListenMsg() {
                messageBus.$on('map-data-update', (map_data) => {
                    this.addClusterLayer(map_data);
                    this.map.fitBounds(this.markers.getBounds());
                });
            },
        }
    }
</script>

<style>
    #leaflet-map {
        width: 100%;
        height: 500px;
    }

    @media (max-width: 768px) {
        #leaflet-map {
            height: 300px;
        }
    }
</style>