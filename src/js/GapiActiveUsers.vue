<template>
    <div v-if="users">
        <h1 v-show="users > 0">{{ users }}</h1>
        <h2 v-show="users < 1">Aucun visteur</h2>
    </div>
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
                if (view === this.view && this.view !== null) {
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

        ready() {

            if (this.view !== null) {

                this.$parent.loading = true
                setInterval(() => {
                    this.getActiveUsers(this.view);
                }, 5000)
            } else {
                this.$parent.showSiteSettings()
            }
        },

        watch: {
            view() {
                let view = this.view
                console.log(view);

                setInterval(() => {
                    this.getActiveUsers(view)
                }, 5000)
            }
        },
    }

</script>
