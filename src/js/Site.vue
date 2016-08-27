<template>
    <div class="sites__item" v-if="profile">

        <gapi-view-selector :view.sync="view"
                            :site-id.sync="id"
                            v-show="siteSettingsVisible && !loading">
        </gapi-view-selector>

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

        <gapi-active-users :users.sync="users"
                           :view.sync="view"
                           v-show="siteUsersVisible && !loading">
        </gapi-active-users>

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
            }
        },

        watch: {
        },
    }

</script>
