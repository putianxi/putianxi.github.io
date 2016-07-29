<template>
    <area-select-box></area-select-box>

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
    import HospitalBox from '../uielements/HospitalBox.vue'
    import AreaSelectBox from '../uielements/AreaSelectBox.vue'

    export default {
        components: { HospitalBox, AreaSelectBox },
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
                console.log(chinaList[0]);
            },
        }
    }
</script>

<style>
    .card-pagination .button {
        border-radius: 2px;
    }
</style>
