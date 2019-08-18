<template>
  <div class="mood-graph">
    <div class="blue-loading-spinner" v-if="allPosts.length === 0"></div>
    <div id="graphdiv"></div>
          <button v-on:click="zoom(7)">One Week</button>
          <button v-on:click="zoom(31)">1 Month</button>
          <button v-on:click="zoom(186)">6 Month</button>
  </div>
</template>

<script>
import Dygraph from 'dygraphs';
import 'dygraphs/src/extras/smooth-plotter.js';

export default {
  name: "MoodGraph",
  props: ["allPosts"],
  mixins: [],
  data() {
    return {
      chart:{},
      chartOptions:{
        labels: [ "Date", "Mood Score", "Mood Dots" ], 
        series:{
          "Mood Score":{
            plotter:smoothPlotter,
            color:"black",
          },
          "Mood Dots":{
            strokeWidth: 0,
            pointSize:2.5,
            color:"black",
            drawPoints: true,
            // highlightCircleSize: 8,
            drawPointCallback:function(g, seriesName, ctx, cx, cy, color, radius){
                // This give more control over the look and feel of the dots
                ctx.fillStyle = "#0000005c";
                ctx.beginPath();
                ctx.arc(cx, cy, radius, Math.PI * 2, false);
                ctx.closePath();
                ctx.fill();
            }
         
          }
        },     
        animatedZooms:true,
        rightGap:40,
        },
        
      }
  },
  methods: {
   /**
   * this will transform two arrays into a 
   * data structure required for Dygraphs
   *
   * @param {array} datasetA - An array used for the y axis
   * @param {array} datasetB - An array used for the x axis
   * @return {array} An array of arrays with data in the format required for Dygraphs
   *
   */
    dyGraphData(datasetA, datasetB){
      let outputDygraphsArray = [];
      for(let i = 0; i < datasetA.length; i++ ){
        //we push in three data sets because the third dataset is used to show points
        //this is workaround to show points and have smooth lines
        outputDygraphsArray.push([ new Date(datasetA[i]), parseFloat(datasetB[i]),parseFloat(datasetB[i]) ] )
      }
      return outputDygraphsArray;
    },
     /**
     * this will redraw chart to a new range relative to last plot on the chart
     *
     * @param {integer} days - number of days relative to last plot
     * TODO: Smooth animations - http://dygraphs.com/tests/link-interaction.html#
     */
    zoom(days){
      let latestPostDate = new Date(this.allDates[this.allDates.length - 1])
      let prevDate = new Date(latestPostDate);
      this.chart.updateOptions({
        dateWindow: [prevDate.setDate(prevDate.getDate() - days), latestPostDate],
        });
    },

  },
  computed:{
    /**
     * 
     * @return {array} An array of all dates from the allPost prop
     */
    allDates() {
      let dateRange = [];
      this.allPosts.forEach((post) => {
        dateRange.push(post.date);
      });
      return dateRange;
    },
    /**
     * 
     * @return {array} An array of all sentiment scores for each post 
     *                 from the allPost prop
     */
    allSentimentScores() {
      let sentimentScores = [];
      this.allPosts.forEach((post) => {
        sentimentScores.push(post.sentiment.comparative.toPrecision(2));
      });
      return sentimentScores;
    }
  },
  watch: {
    allPosts: function(val, oldVal) {
      // check to see if there is any data to plot onto the graph.
      if (val.length === 0) {
        console.warn("No Data");
      }
      else if (val.length > 0) {
        //if so instantiate Dygraphs.   
        this.chart = new Dygraph(
          document.getElementById("graphdiv"),
          this.dyGraphData(this.allDates, this.allSentimentScores),
          this.chartOptions
        );
      }

      //Shows last 30 days on chart by default
      //TODO: split some code out to make this easier to test 
      let latestDate = this.chart.xAxisRange()[1];
      let prevDate = new Date(latestDate);

      this.chart.updateOptions({
          //minus 30 days from date - https://stackoverflow.com/questions/1296358/subtract-days-from-a-date-in-javascript
          dateWindow: [prevDate.setDate(prevDate.getDate() - 30), latestDate],
          panEdgeFraction:0.1
      });

    }
  }
};
</script>

<style lang="scss" scoped>

#graphdiv {
  width:100%;
  height:180px;
}

</style>
