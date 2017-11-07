<template>
    <section class="right-content">
        <area-select-box></area-select-box>

        <div v-if="totalPage">

            <hospital-box v-for="hospital in hospital_show_list"
                          :hospital-info="hospital" :key="hospital.properties.id"
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
        </div>

        <div v-else class="safe-area">
            <h4>
                <span class="icon"><i class="fa fa-check"></i></span>此地区暂时安全
            </h4>
        </div>
    </section>
</template>

<script>
    import HospitalBox from '../uielements/HospitalBox.vue'
    import AreaSelectBox from '../uielements/AreaSelectBox.vue'

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
                this.$bus.$on('sidebar-data-update', (map_data) => {
                    // restore page
                    this.currentPage = 1;
                    this.totalPage = 1;

                    // update list
                    this.genHosptialList(map_data);
                });
            },
            genHosptialList(map_data) {
                // clear old list
                this.hospital_list = []
                
                // update hospital_list
                for(let el of map_data.features) {
                    this.hospital_list.push(el);
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

                // last page 
                if(this. currentPage === this.totalPage ) {
                    this.hospital_show_list = this.hospital_list.slice(-LIST_MAX_LEN);
                }
                else {
                    this.hospital_show_list = this.hospital_list.slice(slice_start, slice_end);
                }

            },
        },
        mounted() {
            this.initListenMsg();
        }
    }
</script>

<style>
    .card-pagination .button {
        border-radius: 2px;
    }

    .pagination-title {
        line-height: 32px;
        text-align: center;
        font-size: 14px;
        font-weight: 700;
    }

    .safe-area {
        padding: 20px 0;
        background-color: #6AA747;
    }

    .safe-area h4 {
        color: #fff;
        text-align: center;
        line-height: 24px;
        font-size: 14px;
    }

    .safe-area .icon {
        margin-right: 5px;
        font-size: 18px;
    }
</style>
