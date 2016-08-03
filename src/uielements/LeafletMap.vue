<template>
    <div id="leaflet-map"></div>
</template>

<script>
    import Leaflet from 'leaflet'
    import markerClusterGroup from 'leaflet.markercluster'
    import mapProvider from '../utilities/leaflet.MapProviders.js'
    import messageBus from '../utilities/messageBus.js'

    // const MAP_IMAGE_PATH = "//cdn.bootcss.com/leaflet/1.0.0-rc.2/images/";
    const MAP_IMAGE_PATH = "../../assets/images/leaflet/";

    export default {
        props: ['mapData'],
        data() {
            return {
                map: null,
                markers: null,
                geoJsonLayer: null,
                init_map_data: null,
                map_config: {
                    zoom: 4,
                    center: [37.5, 106],
                    minZoom: 2,
                    maxZoom: 18,
                    attribution: "&copy; 高德地图",
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

                // clear pervious layer
                if(this.markers) {
                    this.markers.clearLayers();
                }

                this.markers = L.markerClusterGroup();

                this.geoJsonLayer = L.geoJson(geoJsonData, {
                    onEachFeature: this.onEachFeature
                });

                this.markers.addLayer(this.geoJsonLayer);
                this.markers.addTo(this.map);
            },

            onEachFeature(feature, layer) {
                layer.bindPopup(feature.properties.name);
            },

            updateMapData(map_data) {
                if(map_data.features.length !== 0) {
                    this.addClusterLayer(map_data);
                    this.map.fitBounds(this.markers.getBounds());
                }
            },

            initListenMsg() {

                messageBus.$on('map-data-init', (map_data) => {
                    this.init_map_data = map_data;
                    this.updateMapData(this.init_map_data);
                });

                messageBus.$on('map-data-update', (map_data) => {
                    this.updateMapData(map_data);
                });
            },
        }
    }
</script>

<style>
    #leaflet-map {
        width: 100%;
        height: 510px;
    }

    @media (max-width: 768px) {
        #leaflet-map {
            height: 300px;
        }
    }
</style>