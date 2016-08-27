<template>
    <h1>{{ users }} visteurs</h1>
</template>

<script>
    export default {
        name : 'gapi-active-users',

        props: {
            view : {
                required : true,
                twoWay   : true,
            },
            users : {
                required : true,
                twoWay   : true,
            },
        },

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
                        this.$parent.loading = false
                        this.users = resultAsObject.totalsForAllResults['rt:activeUsers']
                    });
                }
            }
        },

        watch: {
            view() {
                let view = this.view

                setInterval(() => {
                    this.getActiveUsers(view)
                }, 5000)
            }
        },
    }

</script>
