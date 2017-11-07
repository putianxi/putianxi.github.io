<template>
    <div class="control is-horizontal" id="select-group">
        <div class="control is-grouped">
            <div class="select is-fullwidth">
                <select v-model="selectedProvince"
                        :class="{ 'is-disabled': provinceList.length === 0 }"
                        @change="onChangeProvince()"
                >
                    <option value="all">全部省份</option>
                    <option v-for="option of provinceList" :value="option" :key="option">{{ option }}</option>
                </select>
            </div>
            <div class="select is-fullwidth">
                <select v-model="selectedCity"
                        :class="{ 'is-disabled': cityList.length === 0 }"
                        @change="emitAreaChnage()"
                >
                    <option value="all">全部地区</option>
                    <option v-for="option of cityList" :value="option" :key="option">{{ option }}</option>
                </select>
            </div>
        </div>
    </div>
</template>

<script>
    const direct_city = ['北京市', '天津市', '上海市', '重庆市'];

    export default {
        data() {
            return {
                // page element
                provinceList: [],
                cityList: [],
                selectedProvince: "all",
                selectedCity: "all",
                // variable
                china_area: {},
                china_area_url: '../../assets/data/china_area.json',
            }
        },
        methods: {
            fetchChianList(url) {
                this.$http.get(url).then((response) => {
                    this.generateChinaArea(response.data);
                });
            },
            generateChinaArea(china_area_data) {
                // parse chian area data
                for(let el of china_area_data) {
                    // parse province
                    let province_name = el['province'];
                    let city_list = []

                    // 不属于直辖市
                    if (direct_city.indexOf(province_name) === -1) {
                        // parse city list
                        city_list = Object.keys(el['city']);
                    }
                    else {
                        city_list = el['city'][province_name];
                    }

                    // fill this.chianArea
                    this.china_area[province_name] = city_list;
                }
                // fill this.provinceList
                this.provinceList = Object.keys(this.china_area);
            },
            onChangeProvince() {
                // restore city select
                this.selectedCity = 'all';

                // refill city_list
                if( this.selectedProvince === 'all') {
                    this.cityList = [];
                }
                else {
                    this.cityList = this.china_area[this.selectedProvince];
                }

                // notify area change
                this.emitAreaChnage()
            },
            emitAreaChnage() {
                let args = {
                    province: this.selectedProvince,
                    city: this.selectedCity,
                }
                this.$bus.$emit('area-select-update', args);
            }
        },
        mounted() {
            this.fetchChianList(this.china_area_url);
        }
    }

</script>

<style>
    #select-group {
        margin-bottom: 1rem;
    }

    #select-group .select:not(:last-child) {
        margin-right: 10px;
    }

    #select-group .select select {
        border-radius: 0;
    }
</style>