import config from './configuration.js'
import Vue from 'vue'
import VueResource from 'vue-resource'
import GapiAuth from './GapiAuth.vue'
import Site from './Site.vue'
import Clock from './Clock.vue'
import './GapiViewSelector2.js'
import away from 'away'

Vue.config.devtools = true
Vue.use(VueResource)

new Vue({
    el         : 'body',
    name       : 'App',

    components : { GapiAuth, Site, Clock },

    data       : {
        auth    : false,
        profile : false,
        sites   : config.defaultViews,
    },

    ready() {
        let body        = this.$els.body
        let activeTimer = away(3000)

        body.classList.add('user-active')

        activeTimer.on('idle', () => {
            body.classList.remove('user-active')
        })
        activeTimer.on('active', () => {
            body.classList.add('user-active')
        })

        this.setWallpaper()

        setInterval(() => {

            this.setWallpaper()
        }, 1800000)
    },

    methods: {

        setWallpaper() {
            let body       = this.$els.body
            let wallpapers = this.getWallpapersPaths()
            let random     = wallpapers[Math.floor(Math.random() * wallpapers.length)]

            let image = new Image()
            image.src = random

            image.onload = (e) => {
                body.style.backgroundImage = 'url(' + random + ')'
            }
        },

        getWallpapersPaths() {
            let path       = '/assets/images/wallpapers/wallpaper-'
            let ext        = '.jpg'
            let wallpapers = []

            for (let i = 1; i < 52; i++) {
                wallpapers.push(path + i + ext)
            }

            return wallpapers
        },

        addSite() {

            this.sites.push({
                view  : null,
            })
        },
    },

    watch: {

        auth() {
            if (this.auth.getUserProfile()) {
                this.profile = this.auth.getUserProfile()
            }
        },
    }
})
