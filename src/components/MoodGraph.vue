<template>
  <div class="mood-graph">
    <div id="chart"></div>
    {{dateRange.length}}
     {{sentimentScores.length}}
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
      testData: {
        labels: this.dateRange,
        datasets: [
          {
            name: "Sentiment",
            type: "bar",
            values: this.sentimentScores
          }
        ]
      }
    };
  },
  methods: {
  },
  mounted() {
    //replace new frappe.Chart() with new Chart()
    const chart = new Chart("#chart", {
      // or a DOM element,
      // new Chart() in case of ES6 module with above usage
      title: "Sentiment",
      data: this.testData,
      type: "line", // or 'bar', 'line', 'scatter', 'pie', 'percentage'
      height: 250,
      colors: ["#743ee2"],
      axisOptions: {
        xIsSeries: true // default: false
      },
      lineOptions: {
        heatline: 1, // default: 0
        regionFill: 1, // default: 0
        hideDots: 1 // default: 0
      },
    });
    
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped>
.mood-graph {
  border-color: black;
  border-style: solid;
}

#chart{
  overflow-x: scroll;
}
</style>
