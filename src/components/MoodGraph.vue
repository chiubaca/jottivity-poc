<template>
  <div class="mood-graph">
    <div v-if="allPosts.length === 0">Setting up chart</div>
    <div id="chart"></div>
  </div>
</template>

<script>
import { Chart } from "frappe-charts/dist/frappe-charts.esm.js";
import "frappe-charts/dist/frappe-charts.min.css";

export default {
  name: "MoodGraph",
  props: ["allPosts"],
  mixins: [],
  data() {
    return {
      chart: {},
      graphData: {
        labels: [0,0], //placeholder data, gets overiden in the watcher
        datasets: [{
            name: "Mood Score",
            type: "line",
            values: [0,0]
          }],
        yMarkers: [{
          label: "Neutral",
          value:0,
          options: { labelPos: 'right' } // default: 'right'
        }]
      },
    };
  },
  methods: {
  },
  computed:{
    allDates() {
      let dateRange = [];
      this.allPosts.forEach((post) => {
        dateRange.push(new Date(post.date).toLocaleDateString());
        // this.dateRange.push(new Date(post.date))
      });
      return dateRange
    },
    allSentimentScores() {
      let sentimentScores = [];
      this.allPosts.forEach((post) => {
        sentimentScores.push(post.sentiment.comparative.toPrecision(2));
      });
      return sentimentScores
    },
  },
  watch: {
    allPosts: function(val, oldVal) {
      // console.log("hello from date watcher", val)
      if (val.length === 0) {
        console.warn("No Data");
        
      } else if (val.length > 0) {

        this.chart = new Chart("#chart", {
          // or a DOM element,
          // new Chart() in case of ES6 module with above usage
          data: this.graphData,
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

        //Set Data to graph data object
        this.graphData.datasets[0].values = this.allSentimentScores;
        this.graphData.labels =  this.allDates;

       
      }
    }
  },
  mounted() {}
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss">


/* x axis */
.frappe-chart .x.axis .line-vertical {
    display: none;
}

/* y axis */
.frappe-chart .y.axis .line-horizontal {
    display: none;
}

// .frappe-chart .y.axis .line-horizontal,
// .frappe-chart .y.axis .line-horizontal text {
//     display: none;
// }

</style>
