<template>

    <div class="clock">
        <div class="clock__unit clock__hours">{{ time.hours }}</div>
        <div class="clock__unit clock__minutes">{{ time.minutes }}</div>
        <div class="clock__unit clock__seconds">{{ time.seconds }}</div>
    </div>

</template>

<script>

    import leftPad from 'left-pad'

    export default {
        name : 'clock',

        data() {
            return {

                time: {
                    hours   : 0,
                    minutes : 0,
                    seconds : 0,
                },
            }
        },

        methods : {

            updateClock() {
                let date          = new Date()
                this.time.hours   = leftPad(date.getHours(), 2, 0)
                this.time.minutes = leftPad(date.getMinutes(), 2, 0)
                this.time.seconds = leftPad(date.getSeconds(), 2, 0)
            }
        },

        ready() {

            setInterval(() => {

                this.updateClock()
            }, 1000)
        },
    }

</script>
