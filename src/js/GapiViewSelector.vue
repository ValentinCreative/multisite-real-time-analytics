<template>
    <div class="sites__selector" id="view-selector-{{ siteId }}"></div>
</template>

<script>
    export default {
        name : 'gapi-view-selector',

        props: {
            view: {
                required : true,
                twoWay   : true
            },
            siteId: {
                required : true,
                twoWay   : true,
            }
        },

        ready() {
            var viewSelector = new gapi.analytics.ViewSelector({
                container: 'view-selector-' + this.siteId
            })

            viewSelector.execute()

            viewSelector.on('change', (id) => {
                this.view = id
                this.$root.sites[this.siteId].view = id
            })
        },
    }

</script>
