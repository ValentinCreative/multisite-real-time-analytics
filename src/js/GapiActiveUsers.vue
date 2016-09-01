<template>
    <h1 class="site__users__number" v-show="users && users > 0">{{ users }}</h1>
    <h2 class="site__users__number site__users__number--empty" v-show="users && users < 1">Aucun visiteur</h2>
    <line-chart class="site__chart" v-show="users" :data.sync="history"></line-chart>
</template>

<script>
    import LineChart from './LineChart.vue'

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

        data() {
            return {
                history: [],
            }
        },

        components : { LineChart },

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
                        this.history.push(this.users)
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
            },

            history() {
                if (this.history.length > 100) {
                    this.history.shift()
                }
            },
        },
    }

</script>
