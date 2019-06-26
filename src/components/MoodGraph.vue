<template>
  <div class="mood-graph">
    <div v-if="dateRange.length === 0">Setting up chart</div>
    <div id="chart"></div>
  </div>
</template>

<script>
import { Chart } from "frappe-charts/dist/frappe-charts.esm.js";
import "frappe-charts/dist/frappe-charts.min.css";

export default {
  name: "MoodGraph",
  props: ["dateRange", "sentimentScores"],
  mixins: [],
  data() {
    return {
      chart: {},
      placeholderData: {
        labels: [0, 0, 0, 0],
        datasets: [
          {
            name: "Sentiment",
            type: "bar",
            values: [0, 0, 0, 0]
          }
        ]
      }
    };
  },
  methods: {},
  watch: {
    dateRange: function(val, oldVal) {
      // console.log("hello from date watcher", val)
      if (val.length === 0) {
        console.log("loading data");
      } else if (val.length > 0) {
        //Got data to use for charts
        console.log("setting up chart")
        this.chart = new Chart("#chart", {
          // or a DOM element,
          // new Chart() in case of ES6 module with above usage
          title: "Sentiment",
          data: this.placeholderData,
          type: "line", // or 'bar', 'line', 'scatter', 'pie', 'percentage'
          isNavigable: false, // default: false
          height: 250,
          colors: ["#743ee2"],
          axisOptions: {
            xIsSeries: true // default: false
          },
          lineOptions: {
            heatline: 1, // default: 0
            regionFill: 1, // default: 0
            hideDots: 1, // default: 0
          }
        });

        this.placeholderData.datasets[0].values = this.sentimentScores;
        this.placeholderData.labels = this.dateRange;

        this.chart.parent.addEventListener('data-select', (e) => {
          console.log(e); // e contains index and value of current datapoint
        });
      }
    }
  },
  mounted() {}
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped>
.mood-graph {
  border-color: black;
  border-style: solid;
}

#chart {
}
</style>
