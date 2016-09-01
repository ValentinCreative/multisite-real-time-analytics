<template>

    <svg xmlns="http://www.w3.org/2000/svg"
         preserveAspectRatio="none"
         viewBox="0 0 100 100"
         v-el:svg>
    </svg>

</template>

<script>
    export default {

        name  : 'line-chart',

        props : {

            data : {
                required : true,
                twoWay   : true,
            },
        },

        data() {
            return {

                percentages : [],
            }
        },

        methods : {

            getHigherEntry(data) {

                let entries = []

                data.forEach((entry) => {
                    entries.push(parseInt(entry))
                })

                return Math.max(...entries)
            },

            getEntryPercentage(entry, higher) {

                if (higher > 0) {
                    return entry * 100 / higher
                } else {
                    return 0
                }
            },

            getPercentages(data) {

                let higher      = this.getHigherEntry(data)
                let percentages = []

                data.forEach((entry) => {

                    if (entry !== higher) {
                        percentages.unshift(this.getEntryPercentage(entry, higher))
                    } else {
                        percentages.unshift(100)
                    }
                })

                this.percentages = percentages
            },

            drawLines(percentages) {

                let svg      = this.$els.svg
                let position = 100

                svg.innerHTML = ''

                percentages.forEach((percentage) => {

                    let line = document.createElementNS('http://www.w3.org/2000/svg', 'line')
                    let y2   = 100 - percentage

                    line.setAttribute('x1', position)
                    line.setAttribute('y1', 100)
                    line.setAttribute('x2', position)
                    line.setAttribute('y2', y2)
                    line.setAttribute('stroke-width', '1')

                    svg.appendChild(line)

                    position --
                })
            }
        },

        watch: {

            data() {
                this.getPercentages(this.data)
                this.drawLines(this.percentages)
            }
        },
    }

</script>
