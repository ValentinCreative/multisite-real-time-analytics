<template>
    <svg xmlns="http://www.w3.org/2000/svg"
         preserveAspectRatio="none"
         viewBox="0 0 100 100"
         v-el:svg>
        <!-- <line x1="100" y1="100" x2="100" y2="50" stroke="#000" stroke-width="2"/> -->
        <!-- <line x1="50" y1="50" x2="100" y2="100" stroke="#000" stroke-width="2"/> -->
    </svg>
</template>

<script>
    export default {
        name : 'line-chart',

        props: {
            data : {
                required : true,
                twoWay   : true,
            },
        },

        data() {
            return {
                percentages : [],
                size : 0
            }
        },

        ready() {

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
            drawLines(percentages, size) {
                let svg = this.$els.svg
                svg.innerHTML = ''
                let position = 100
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
                this.size = this.data.length
                this.getPercentages(this.data)
                this.drawLines(this.percentages, this.size)
            }
        },
    }

</script>
