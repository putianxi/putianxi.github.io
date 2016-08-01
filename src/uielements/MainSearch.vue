<template>
    <div class="control has-icon" id="main-search">
        <input class="input" type="text" placeholder="搜索莆田系医院、所在城市等" v-model="query">
        <i class="fa fa-search"></i>
        <i class="fa fa-times icon-close" 
           v-show="query.length"
           @click="resetSearch()"
        ></i>
    </div>
</template>

<script>
    import Bloodhound from 'typeahead.js';
    import messageBus from '../utilities/messageBus.js'

    export default {
        data() {
            return {
                engine: null,
                query: '',
                limit: 5,
                minChars: 2,
                
            }
        },

        methods: {
            resetSearch() {
                this.searchString = '';
            },
            initSearchEngine() {
                this.engine = new Bloodhound({
                    identify: (obj) => { return obj.properties.name; },
                    queryTokenizer: Bloodhound.tokenizers.whitespace,
                    datumTokenizer: (obj) => { return Bloodhound.tokenizers.whitespace(obj.properties.name) }
                });
            },
            initListenMsg() {
                messageBus.$on('map-data-update', (search_data) => {
                    this.engine.add(search_data.features);
                    // console.log(this.engine.get('安顺阳光妇科医院'));
                    this.engine.search('妇产医院', function(response) {
                        for(let el of response){
                            console.log(el.properties.name)
                        }
                    });
                });
            },
        },
        ready() {
            this.initSearchEngine();
            this.initListenMsg();
        }
    }
</script>

<style>
    #main-search {
        margin-bottom: 1rem;
    }

    #main-search input {
        border-radius: 0;
    }

    #main-search input:focus {
        border: 1px solid #E0504A;
    }

    #main-search i.icon-close {
        left: auto;
        right: 4px;
        color: #69707a;
        cursor: pointer;
        pointer-events: auto;
    }
</style>