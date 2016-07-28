<template>
    <div id="leaflet-map"></div>
</template>

<script>
    import Leaflet from 'leaflet'
    import markerClusterGroup from 'leaflet.markercluster'

    const GAODE_URL = '//webrd0{s}.is.autonavi.com/appmaptile?x={x}&y={y}&z={z}&lang=zh_cn&size=1&scale=1&style=7';
    const MAP_IMAGE_PATH = "//cdn.bootcss.com/leaflet/1.0.0-rc.2/images/";

    export default {
        props: ['center','zoom','minZoom','maxZoom', 'attribution'],
        data() {
            return {
                map: null,
                url: GAODE_URL, // need change subdomains
                geojson_url: '../../assets/mapdata/hospital.geojson',
                markers: null,
            };
        },

        ready() {
            this.initMap();
            this.addMapLayer();
            this.addDataLayer(this.geojson_url);
        },

        methods: {
            initMap() {
                // need set default L.Icon.Default.imagePath
                L.Icon.Default.imagePath = MAP_IMAGE_PATH;
                
                this.map = L.map("leaflet-map",{
                    center: this.center,
                    zoom: this.zoom,
                    minZoom: this.minZoom,
                    maxZoom: this.maxZoom,
                    scrollWheelZoom: false,
                });
                this.markers = L.markerClusterGroup();
            },

            addMapLayer() {
                L.tileLayer(this.url, {
                    attribution: this.attribution,
                    subdomains: ["1", "2", "3", "4"],
                }).addTo(this.map);
            },

            addDataLayer(url) {
                this.$http.get(url).then((response) => {
                    this.addClusterLayer(response.json());
                });
            },

            addClusterLayer(geoJsonData) {
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