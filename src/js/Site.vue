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

        <gapi-active-users  :users.sync="users"
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
            id : {
                type     : Number,
                required : true,
                twoWay   : true,
            },
        },

        data() {
            return {
                users               : 0,
                view                : null,
                siteSettingsVisible : true,
                siteUsersVisible    : false,
                loading             : true,
            }
        },

        components : { GapiViewSelector, GapiActiveUsers },

        ready() {
        },

        methods : {
            getActiveUsers(view) {

                if (view === this.view) {
                    let query = gapi.client.analytics.data.realtime.get({
                        'ids'     : this.view,
                        'metrics' : 'rt:activeUsers',
                    })

                    query.execute((resultAsObject, resultAsJson) => {
                        this.users = resultAsObject.totalsForAllResults['rt:activeUsers']
                        this.site.users = this.users
                    });
                }
            },

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
            view() {
                this.loading = false

                let view = this.view
                this.site = {
                    view : this.view,
                    users: 0,
                }
                setInterval(() => {
                    this.getActiveUsers(view)
                }, 5000)
            }
        },
    }

</script>
