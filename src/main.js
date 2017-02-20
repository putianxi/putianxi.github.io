import Vue from 'vue'
import VueResource from 'vue-resource'
import AppHeader from './uilayout/AppHeader.vue'
import AppLayout from './uilayout/AppLayout.vue'
import AppContent from './uilayout/AppContent.vue'
import AppSidebar from './uilayout/AppSidebar.vue'
import AppFooter from './uilayout/AppFooter.vue'

Vue.use(VueResource)

//这个是vue 1.0 的写法
// 2.0+ 中不再推荐
new Vue({
    el: '#app',
    components: {
        // AppHeader, AppLayout, AppContent, AppSidebar, AppFooter
        "app-header":AppHeader,
        "app-layout":AppLayout,
        "app-content":AppContent,
        "app-sidebar":AppSidebar,
        "app-footer":AppFooter
    }
})
