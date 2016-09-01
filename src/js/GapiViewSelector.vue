<template>
    <div class="sites__selector" id="view-selector-{{ siteId }}"></div>
</template>

<script>

    export default {
        name  : 'gapi-view-selector',

        props : {

            view: {
                required : true,
                twoWay   : true,
            },

            siteId: {
                required : true,
                twoWay   : true,
            },
        },

        ready() {

            let view = this.view

            var viewSelector = new gapi.analytics.ext.ViewSelector2({
                container: 'view-selector-' + this.siteId
            })

            viewSelector.set({ids: this.view})

            this.$parent.loading = false

            viewSelector.on('change', (id) => {
                    this.view = id
                    this.$root.sites[this.siteId].view = id
            })

            viewSelector.execute()
        },
    }

</script>
