<template>
  <div class="mood-graph">
    

    <div id="chart-container">
      <div class="blue-loading-spinner" v-if="allPosts.length === 0"></div>
      <canvas id="myChart"></canvas>
    </div>
  </div>
</template>

<script>
import Chart from "chart.js";
import "chartjs-plugin-zoom";

export default {
  name: "MoodGraph",
  props: ["allPosts"],
  mixins: [],
  data() {
    return {};
  },
  methods: {},
  computed: {
    //Extracts all date object from allPosts and returns an array of dates from all post props
    allDates() {
      let dateRange = [];
      this.allPosts.forEach(post => {
        dateRange.push(new Date(post.date));
        // this.dateRange.push(new Date(post.date))
      });
      return dateRange;
    },
    allSentimentScores() {
      let sentimentScores = [];
      this.allPosts.forEach(post => {
        sentimentScores.push(post.sentiment.comparative.toPrecision(2));
      });
      return sentimentScores;
    }
  },
  watch: {
    allPosts: function(val, oldVal) {
      // console.log("hello from date watcher", val)
      if (val.length === 0) {
        console.warn("No Data");
      } else if (val.length > 0) {
        ///CHARTJS
        let ctx = document.getElementById("myChart");

        var myChart = new Chart(ctx, {
          type: "line",
          data: {
            labels: this.allDates,
            datasets: [
              {
                data: this.allSentimentScores,
                backgroundColor: ["rgba(255, 99, 132, 0.2)"],
                borderColor: ["rgba(255, 99, 132, 1)"],
                borderWidth: 1
              }
            ]
          },
          options: {
            responsive: true,
            maintainAspectRatio: false,
            layout: {
              padding: {
                left: 10,
                right: 10,
                top: 10,
                bottom: 0
              }
            },
            legend: {
              display: false
            },
            scales: {
              yAxes: [
                {
                  ticks: {
                    beginAtZero: true
                  }
                }
              ],
              xAxes: [
                {
                  type: "time",
                  ticks: {
                    source: "auto"
                  }
                }
              ]
            },
            pan: {
              enabled: true,
              mode: 'x',
              rangeMin: {
				// Format of min pan range depends on scale type
				x: null,
				y: null
			},
			rangeMax: {
				// Format of max pan range depends on scale type
				x: null,
				y: null
			},
            },
            zoom: {
              enabled: true,
              mode: 'x',
              rangeMin: {
				// Format of min pan range depends on scale type
				x: null,
				y: null
			},
			rangeMax: {
				// Format of max pan range depends on scale type
				x: null,
				y: null
			},
            }
          }
        });

      }
    }
  },
  mounted() {}
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss">
.line-horizontal,
.line-vertical {
  display: none;
}

#chart-container {
  width: 100%;
  height: 200px;
  margin: 0 auto; 
}


</style>
