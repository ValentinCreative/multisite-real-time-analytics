<template>
    <div class="sites__item" v-if="profile">
        <div class="sites__header"
             v-show="!loading"
             :style="{ backgroundImage: 'url(data:image/svg+xml;base64,' + image + ')'}">

            <h1 class="sites__title">{{ title}}</h1>
        </div>

        <gapi-view-selector :view.sync="view"
                            :site-id.sync="id"
                            v-show="siteSettingsVisible && !loading">
        </gapi-view-selector>

        <div class="sites__form"
             v-show="siteSettingsVisible && !loading">
            <p>
                <label>
                    Titre
                    <input v-model="title">
                </label>
            </p>
            <p>
                <label>
                    Image
                    <input type="file" @change="onFileChange" v-el:image-input>
                    <input type="hidden" v-model="image">
                </label>
            </p>
        </div>

        <span class="sites__delete"
                @click="deleteSite"
                v-show="siteSettingsVisible && !loading">
                <span class="icon-delete"></span>
        </span>

        <button class="button sites__close-settings"
                @click.prevent="showSiteUsers"
                v-show="siteSettingsVisible && !loading">
                Ok
        </button>

        <span class="sites__settings"
                @click="showSiteSettings"
                v-show="siteUsersVisible && !loading">
                <span class="icon-settings"></span>
        </span>

        <div v-show="siteUsersVisible && !loading" class="sites__users">
            <gapi-active-users :users.sync="users"
                               :view.sync="view">
            </gapi-active-users>
        </div>

        <div v-show="loading" class="spinner__wrapper">
            <svg class="spinner" width="65px" height="65px" viewBox="0 0 66 66" xmlns="http://www.w3.org/2000/svg">
               <circle class="path" fill="none" stroke-width="6" stroke-linecap="round" cx="33" cy="33" r="30"></circle>
            </svg>
        </div>
    </div>
</template>

<script>
    import GapiViewSelector from './GapiViewSelector.vue'
    import GapiActiveUsers from './GapiActiveUsers.vue'

    export default {
        name : 'site',

        props: {
            auth : {
                required : true,
                twoWay   : true,
            },
            profile : {
                required : true,
                twoWay   : true,
            },
            view : {
                required : true,
                twoWay   : true,
            },
            title : {
                required : false,
                twoWay   : true,
            },
            image : {
                required : false,
                twoWay   : true,
            },
            id : {
                type     : Number,
                required : true,
                twoWay   : true,
            },
        },

        data() {
            return {
                users               : 0,
                siteSettingsVisible : false,
                siteUsersVisible    : true,
                loading             : true,
            }
        },

        components : { GapiViewSelector, GapiActiveUsers },

        ready() {
        },

        methods : {

            showSiteUsers() {
                this.loading             = true
                this.siteSettingsVisible = false
                this.siteUsersVisible    = true
            },

            showSiteSettings() {
                this.siteSettingsVisible = true
                this.siteUsersVisible    = false
            },

            deleteSite() {
                this.$root.sites.splice(this.id, 1)
            },

            onFileChange(e) {
                let files = e.target.files || e.dataTransfer.files

                if (!files.length) {
                    return
                }

                this.createImage(files[0])
            },
            createImage(file) {
                let image  = new Image()
                let reader = new FileReader()

                reader.onload = (e) => {
                    this.image = btoa(e.target.result)
                }

                reader.readAsBinaryString(file)
            },
        },

        watch: {
        },
    }

</script>
