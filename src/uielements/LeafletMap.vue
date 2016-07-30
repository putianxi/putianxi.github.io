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
        props: ['dataUrl'],
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
            if( this.dataUrl !== undefined ) {
                this.addDataLayer(this.dataUrl);
            }
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

            addDataLayer(url) {
                this.$http.get(url).then((response) => {
                    this.addClusterLayer(response.json());
                });
            },

            addClusterLayer(geoJsonData) {
                this.markers = L.markerClusterGroup();

                let geoJsonLayer = L.geoJson(geoJsonData, {
                    onEachFeature: this.onEachFeature
                });

                this.markers.addLayer(geoJsonLayer);
                this.markers.addTo(this.map);
                this.map.fitBounds(this.markers.getBounds());
            },

            onEachFeature(feature, layer) {
                layer.bindPopup(feature.properties.name);
            },

            initListenMsg() {
                messageBus.$on('id-selected', function (city) {
                    // console.log(city);
                })
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