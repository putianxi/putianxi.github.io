<template>
    <div id="leaflet-map"></div>
</template>

<script>
    import Leaflet from 'leaflet'
    const OSM_URL = 'http://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png';
    const GAODE_URL = 'http://webrd0{s}.is.autonavi.com/appmaptile?x={x}&y={y}&z={z}&lang=zh_cn&size=1&scale=1&style=7'

    export default {
        props: ['center','zoom','minZoom','maxZoom', 'attribution'],
        data() {
            return {
                map: null,
                url: GAODE_URL, // need change subdomains
            };
        },

        ready() {
            this.initMap();
            this.addMapLayer();
        },

        methods: {
            initMap() {
                this.map = Leaflet.map("leaflet-map",{
                    center: this.center,
                    zoom: this.zoom,
                    minZoom: this.minZoom,
                    maxZoom: this.maxZoom,
                    scrollWheelZoom: false,
                });
            },

            addMapLayer() {
                Leaflet.tileLayer(this.url, {
                    attribution: this.attribution,
                    subdomains: ["1", "2", "3", "4"],
                }).addTo(this.map);
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