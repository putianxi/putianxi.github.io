import Vue from 'vue'
import axios from 'axios'
import AppHeader from './uilayout/AppHeader.vue'
import AppLayout from './uilayout/AppLayout.vue'
import AppContent from './uilayout/AppContent.vue'
import AppSidebar from './uilayout/AppSidebar.vue'
import AppFooter from './uilayout/AppFooter.vue'

// Compatible with vue-resource
Vue.prototype.$http = axios

// Compatible with vue 1.0 message bus 
Vue.prototype.$bus = new Vue();


new Vue({
    el: '#app',
    components: {
        AppHeader, AppLayout, AppContent, AppSidebar, AppFooter
    }
})
