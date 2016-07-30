import Vue from 'vue'
import VueResource from 'vue-resource'
import AppHeader from './uilayout/AppHeader.vue'
import AppLayout from './uilayout/AppLayout.vue'
import AppContent from './uilayout/AppContent.vue'
import AppSidebar from './uilayout/AppSidebar.vue'
import AppFooter from './uilayout/AppFooter.vue'

Vue.use(VueResource)

new Vue({
    el: 'body',
    components: {
        AppHeader, AppLayout, AppContent, AppSidebar, AppFooter
    }
})
