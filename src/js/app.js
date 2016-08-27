import Vue from 'vue'
import VueResource from 'vue-resource'
import GapiAuth from './GapiAuth.vue'
import Site from './Site.vue'

Vue.config.devtools = true
Vue.use(VueResource)

new Vue({
    el         : 'body',
    name       : 'App',
    components : { GapiAuth, Site },
    data       : {
        auth    : false,
        profile : false,
        sites   : [
            {
                view  : null,
            }
        ],
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
