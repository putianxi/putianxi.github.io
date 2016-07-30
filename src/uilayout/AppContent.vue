<template>
    <main-search></main-search>
    <leaflet-map></leaflet-map>
</template>

<script>
    import MainSearch from '../uielements/MainSearch.vue'
    import LeafletMap from '../uielements/LeafletMap.vue'
    import messageBus from '../utilities/messageBus.js'

    export default {
        components: { MainSearch, LeafletMap },
        data () {
            return {
                g_hospital_data: null,
                data_url: '../../assets/data/hospital.geojson',
            };
        },
        methods: {
            fetchData(url) {
                this.$http.get(url).then((response) => {
                    this.g_hospital_data = response.json();
                    messageBus.$emit('map-data-update', this.g_hospital_data);
                });
            }
        },
        ready() {
            this.fetchData(this.data_url);
        }
    }
</script>
