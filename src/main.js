import Vue from 'vue'
import VueResource from 'vue-resource'
import AppHeader from './uielements/AppHeader.vue'
import AppMain from './uielements/AppMain.vue'
import AppContent from './uielements/AppContent.vue'
import AppSidebar from './uielements/AppSidebar.vue'
import AppFooter from './uielements/AppFooter.vue'

Vue.use(VueResource)

new Vue({
    el: 'body',
    components: {
        AppHeader, AppMain, AppContent, AppSidebar, AppFooter
    }
})
