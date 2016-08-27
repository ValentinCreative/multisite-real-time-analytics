import config from './configuration.js'
import Vue from 'vue'
import VueResource from 'vue-resource'
import GapiAuth from './GapiAuth.vue'
import Site from './Site.vue'
import './view-selector2.js'

Vue.config.devtools = true
Vue.use(VueResource)


new Vue({
    el         : 'body',
    name       : 'App',
    components : { GapiAuth, Site },
    data       : {
        auth    : false,
        profile : false,
        sites   : config.defaultViews,
    },
    methods: {
        addSite() {
            this.sites.push({
                view  : null,
            })
        },
    },

    ready() {

    },

    watch: {
        auth() {
            if (this.auth.getUserProfile()) {
                this.profile = this.auth.getUserProfile()
            }
        },
    }
})
