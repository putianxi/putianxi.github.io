<template>

    <div class="control is-grouped" id="select-group">
        <div class="control is-expanded">
            <span class="select is-fullwidth">
                <select>
                    <option value="">选择省份</option>
                </select>
            </span>
        </div>

        <div class="control is-expanded">
            <span class="select is-fullwidth">
                <select>
                    <option value="">选择城市</option>
                </select>
            </span>
        </div>
    </div>

    <hospital-box v-for="hospital in hospital_list"
                  :hospital-info="hospital"
    >
    </hospital-box >

    <div class="columns is-mobile card-pagination">
        <div class="column">
            <a class="button is-disabled">上一页</a>
        </div>
        <div class="column">
            <a class="button is-info is-pulled-right"
               @click="fetchOperalist"
            >
                下一页
            </a>
        </div>
    </div>

</template>

<script>
    import HospitalBox from '../uiblocks/HospitalBox.vue'

    export default {
        components: { HospitalBox },
        data() {
            return {
                hospital_list: [
                    { name: '解放军火箭军总医院', district: '北京市，西城区', address: '新街口外大街16号', tel: '010-66343337', url: '#' },
                    { name: '解放军火箭军总医院', district: '北京市，西城区', address: '新街口外大街16号', tel: '010-66343337', url: '#' },
                    { name: '解放军火箭军总医院', district: '北京市，西城区', address: '新街口外大街16号', tel: '010-66343337', url: '#' },
                    { name: '解放军火箭军总医院', district: '北京市，西城区', address: '新街口外大街16号', tel: '010-66343337', url: '#' },
                ],

            };
        },
        methods: {
            fetchOperalist() {

            },
        }
    }
</script>

<style>
    #select-group {
        margin-bottom: 1rem;
    }

    #select-group select {
        border-radius: 0;
    }

    .card-pagination .button {
        border-radius: 2px;
    }
</style>
