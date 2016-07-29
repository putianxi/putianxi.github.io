<template>
    <main-search></main-search>
    <leaflet-map :zoom="zoom" 
                 :center="center" 
                 :min-zoom="minZoom" 
                 :max-zoom="maxZoom"
                 :attribution = "attribution"
    >
    </leaflet-map>
</template>

<script>
    import MainSearch from '../utils/MainSearch.vue'
    import LeafletMap from '../utils/LeafletMap.vue'

    export default {
        components: { MainSearch, LeafletMap },
        data () {
            return {
                zoom: 4,
                center: [37.5, 106],
                minZoom: 2,
                maxZoom: 18,
                attribution: "&copy; 高德地图",
            };
        }
    }
</script>
