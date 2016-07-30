<template>
    <main-search></main-search>
    <leaflet-map></leaflet-map>
</template>

<script>
    import MainSearch from '../uielements/MainSearch.vue'
    import LeafletMap from '../uielements/LeafletMap.vue'
    import messageBus from '../utilities/messageBus.js'

    const direct_city = ['北京市', '天津市', '上海市', '重庆市'];

    export default {
        components: { MainSearch, LeafletMap },
        data () {
            return {
                hospital_data: null,
                data_url: '../../assets/data/hospital.geojson',
            };
        },
        methods: {
            fetchData(url) {
                this.$http.get(url).then((response) => {
                    this.hospital_data = response.json();
                    this.notifyDataUpdate(this.hospital_data)
                    
                });
            },

            initListenMsg() {
                messageBus.$on('area-select-update', (select_area) => {
                    this.filterSelectData(select_area);
                });
            },

            filterSelectData(select_area) {
                // select all province
                if( select_area.province === 'all' ) {
                    this.notifyDataUpdate(this.hospital_data);
                    return;
                }

                let province_list = [];
                let city_list = [];

                // filter province
                for(let el of this.hospital_data.features) {
                    let properties = el.properties;
                    if( properties.province === select_area.province ) {
                        province_list.push(el);
                    }
                }

                // filter city:
                if(select_area.city !== "all") {
                    for(let el of province_list) {
                        let city_name = null;
                        // 分离是否为直辖市
                        if (direct_city.indexOf(select_area.province) === -1) {
                            city_name = el.properties.city
                        }
                        else {
                            city_name = el.properties.district
                        }

                        // 过滤本市数据
                        if (city_name === select_area.city) {
                            city_list.push(el)
                        }
                    }
                }
                else {
                    city_list = province_list;
                }

                let new_geojson_data = {
                    type: "FeatureCollection",
                    features: city_list
                }

                this.notifyDataUpdate(new_geojson_data);
            },

            notifyDataUpdate(map_data) {
                messageBus.$emit('map-data-update', map_data);
            },
        },
        ready() {
            this.fetchData(this.data_url);
            this.initListenMsg();
        }
    }
</script>
