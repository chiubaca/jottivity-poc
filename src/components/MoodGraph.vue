<template>
  <div class="mood-graph">
    <div class="blue-loading-spinner" v-if="allPosts.length === 0"></div>
    
      <div id=chart-container>
        <canvas id="myChart"></canvas>
      </div>
    
  </div>
</template>

<script>

import Charts from 'chart.js';

export default {
  name: "MoodGraph",
  props: ["allPosts"],
  mixins: [],
  data() {
    return {
    
    };
  },
  methods: {
  },
  computed:{
    //Extracts all date object from allPosts and returns an array of dates from all post props
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

        ///CHARTJS
        let ctx = document.getElementById('myChart');
        ctx.height = 200;
        var myChart = new Charts(ctx, {
          type: 'line',
          data: {
            labels: this.allDates,
            datasets: [{
              data: this.allSentimentScores,
              backgroundColor: [
                'rgba(255, 99, 132, 0.2)',
              ],
              borderColor: [
                'rgba(255, 99, 132, 1)',
              ],
              borderWidth: 1
            }]
          },
          options: {
            responsive: true,
            maintainAspectRatio: false,
            legend: {
              display: false
            },
            scales: {
              yAxes: [{
                ticks: {
                  beginAtZero: true,
                }
              }],
              xAxes: [{
                autoSkip: true,
                 minRotation: 180,
              }]

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

.line-horizontal, .line-vertical {
    display: none;
}

#chart-container{
  width:100vh;
  height:280px;
  margin: 0 auto;
}

</style>
