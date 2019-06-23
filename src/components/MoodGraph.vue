<template>
  <div class="mood-graph">
    <p>Awesome graph is gonna go here</p>
    <div id="chart"></div>
  </div>
</template>

<script>
import { Chart } from "frappe-charts/dist/frappe-charts.esm.js";
// import css
import "frappe-charts/dist/frappe-charts.min.css";

export default {
  name: "MoodGraph",
  props: [],
  mixins: [],
  data() {
    return {
      testData: {
        labels: [
          "12am-3am",
          "3am-6pm",
          "6am-9am",
          "9am-12am",
          "12pm-3pm",
          "3pm-6pm",
          "6pm-9pm",
          "9am-12am"
        ],
        datasets: [
          {
            name: "Some Data",
            type: "bar",
            values: [25, 40, 30, 35, 8, 52, 17, -4]
          },
          {
            name: "Another Set",
            type: "line",
            values: [25, 50, -10, 15, 18, 32, 27, 14]
          }
        ]
      }
    };
  },
  methods: {
    stub() {
      return;
    }
  },
  mounted() {
    //replace new frappe.Chart() with new Chart()
    const chart = new Chart("#chart", {
      // or a DOM element,
      // new Chart() in case of ES6 module with above usage
      title: "My Awesome Chart",
      data: this.testData,
      type: "axis-mixed", // or 'bar', 'line', 'scatter', 'pie', 'percentage'
      height: 250,
      colors: ["#7cd6fd", "#743ee2"]
    });

    console.log(chart)
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped>
.mood-graph {
  border-color: black;
  border-style: solid;
}
</style>
