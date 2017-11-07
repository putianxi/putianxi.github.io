<template>
    <div class="control has-icon" id="main-search">
        <input type="text" class="input" placeholder="搜索莆田系医院、所在城市等" v-model="query"
               @keydown.down="down" @keydown.up="up" @keydown.enter="hit" 
               @keydown.esc="reset" @blur="reset" @input="update"/>
        <i class="fa fa-search"></i>
        <i class="fa fa-times icon-close" 
           v-show="query.length"
           @click="resetSearch()"
        ></i>

        <ul v-show="hasItems" class="search-list">
            <li v-for="(item, index) in items" :class="activeClass(index)" :key="item.properties.name"
                @mousedown="hit" @mousemove="setActive(index)">
                {{ item.properties.name }}
            </li>
        </ul>
    </div>
</template>

<script>
    import Bloodhound from 'bloodhound-js';
    import VueTypeahead from '../utilities/VueTypeahead.js'

    export default {
        extends: VueTypeahead,
        data() {
            return {
                engine: null,
                query: '',
                limit: 5,
                minChars: 2,
            }
        },

        methods: {
            // for Bloodhound.js
            datumTokenizerIndex(obj){
                let tokens = [];

                // setting keywords minCharts
                let minSize = 2;

                //the available string is 'name' in your datum
                let stringSize = obj.properties.name.length;
                //multiple combinations for every available size
                //(eg. dog = d, o, g, do, og, dog)
                for (let size = minSize; size <= stringSize; size++) {
                    for (let i = 0; i+size<= stringSize; i++) {
                        tokens.push(obj.properties.name.substr(i, size));
                    }
                }
                return tokens;
            },
            // for Bloodhound.js
            initSearchEngine() {
                this.engine = new Bloodhound({
                    // identify: (obj) => { return obj.properties.name; },
                    queryTokenizer: Bloodhound.tokenizers.whitespace,
                    datumTokenizer: this.datumTokenizerIndex,
                });
            },
            // init Bloodhound data
            initListenMsg() {
                this.$bus.$on('searchbox-data-init', (search_data) => {
                    this.engine.add(search_data.features);
                });
            },

            // implements VueTypeahead onHit()
            onHit(item) {
                if(item) {
                    // set ui
                    this.reset();
                    this.query = item.properties.name;
                    
                    // update map data, need geojson format
                    let map_data = {
                        type: 'FeatureCollection',
                        features: []
                    }
                    map_data.features.push(item);
                    this.$bus.$emit('map-data-update', map_data);
                }
            }
        },
        mounted() {
            this.initSearchEngine();
            this.initListenMsg();
        }
    }
</script>

<style>
    #main-search {
        margin-bottom: 1rem;
        position: relative;
    }

    #main-search input {
        border-radius: 0;
    }

    #main-search input:focus {
        border: 1px solid #ed6c63;
    }

    #main-search i.icon-close {
        left: auto;
        right: 4px;
        color: #69707a;
        cursor: pointer;
        pointer-events: auto;
    }

    #main-search ul {
        position: absolute;
        padding: 0;
        margin-top: 1rem;
        width: 100%;
        background-color: #fdfdfd;
        list-style: none;
        border-radius: 1px;
        box-shadow: 0 2px 3px rgba(17,17,17,.1),0 0 0 1px rgba(17,17,17,.1);
        z-index: 1001;
    }

    #main-search li {
        padding: 10px 16px;
        border-bottom: 1px solid #d3d6db;
        cursor: pointer;
    }

    #main-search li:first-child {
        border-radius: 1px 1px 0 0;
    }

    #main-search li:last-child {
        border-radius: 0 0 1px 1px;
        border-bottom: 0;
    }

    #main-search li {
        font-weight: 400;
        font-size: 14px;
        color: #222324;
    }

    #main-search li.active {
        background-color: #ed6c63;
        color: white;
    }

    
</style>