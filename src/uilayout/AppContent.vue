<template>
    <main-search></main-search>
    <leaflet-map :data-url="data_url"></leaflet-map>
</template>

<script>
    import MainSearch from '../uielements/MainSearch.vue'
    import LeafletMap from '../uielements/LeafletMap.vue'

    export default {
        components: { MainSearch, LeafletMap },
        data () {
            return {
                data_url: '../../assets/mapdata/hospital.geojson',
            };
        }
    }
</script>
