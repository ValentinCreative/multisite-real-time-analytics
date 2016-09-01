<template>

    <div id="auth-button" v-show="!auth"></div>

</template>

<script>

    import config from './configuration.js'

    export default {
        name  : 'gapi-auth',

        props : {

            auth: {
                required : true,
                twoWay   : true
            },
        },

        ready() {

            gapi.analytics.ready(() => {

                gapi.analytics.auth.authorize({
                    container : 'auth-button',
                    clientid  : config.gapi.clientId
                })

                gapi.analytics.auth.on('signIn', () => {
                    this.auth = gapi.analytics.auth
                })
            })
        },
    }

</script>
