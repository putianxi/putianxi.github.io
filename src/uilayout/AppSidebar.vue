<template>
    <area-select-box></area-select-box>

    <hospital-box v-for="hospital in hospital_show_list"
                  :hospital-info="hospital"
    >
    </hospital-box >

    <div class="columns is-mobile card-pagination">
        <div class="column">
            <a class="button"
               :class=" {'is-disabled' : currentPage === 1 }"
               @click="updatePageList('prev')"
            >
                上一页
            </a>
        </div>
        <div class="column">
            <h2 class="pagination-title">{{ currentPage }} / {{ totalPage }} </h2>
        </div>
        <div class="column">
            <a class="button is-info is-pulled-right"
               :class=" {'is-disabled' : currentPage === totalPage }" 
               @click="updatePageList('next')"
            >
                下一页
            </a>
        </div>
    </div>

</template>

<script>
    import HospitalBox from '../uielements/HospitalBox.vue'
    import AreaSelectBox from '../uielements/AreaSelectBox.vue'
    import messageBus from '../utilities/messageBus.js'

    const LIST_MAX_LEN = 4;

    export default {
        components: { HospitalBox, AreaSelectBox },
        data() {
            return {
                hospital_list: [],
                hospital_show_list: [],
                currentPage: 1,
                totalPage: 1,
            };
        },
        methods: {
            initListenMsg() {
                messageBus.$on('map-data-update', (map_data) => {
                    this.genHosptialList(map_data);
                });
            },
            genHosptialList(map_data) {
                // update hospital_list
                for(let el of map_data.features) {
                    this.hospital_list.push(el.properties);
                }

                // update totalPage
                this.totalPage = Math.ceil(this.hospital_list.length / LIST_MAX_LEN);

                // update show list
                this.refreshShowList();
            },
            updatePageList(direction) {
                if(direction === 'prev') {
                    this.currentPage -= 1;

                    if(this.currentPage < 1) {
                        this.currentPage = 1;
                    }
                }
                else {
                    this.currentPage += 1;

                    if(this.currentPage > this.totalPage) {
                        this.currentPage = this.totalPage;
                    }
                }
                this.refreshShowList();
            },
            refreshShowList() {
                let slice_start = (this.currentPage - 1) * LIST_MAX_LEN;
                let slice_end = (this.currentPage) * LIST_MAX_LEN;
                this.hospital_show_list = this.hospital_list.slice(slice_start, slice_end);
            },
        },
        ready() {
            this.initListenMsg();
        }
    }
</script>

<style>
    .card-pagination .button {
        border-radius: 2px;
    }

    .pagination-title {
        text-align: center;
        line-height: 32px;
        font-size: 14px;
        font-weight: 700;
        color: #69707a;
    }
</style>
