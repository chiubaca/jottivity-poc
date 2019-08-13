<template>
  <div class="mood-graph">
    <div class="blue-loading-spinner" v-if="allPosts.length === 0"></div>
    <div id="graphdiv"></div>
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
            color:"black",
            drawPoints: true,
          }
        },
        
        
        animatedZooms:true,
        rightGap:40,
        // dateWindow:[d.setDate(d.getDate() - 30),d.getTime()  ]
        }
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
        outputDygraphsArray.push([ new Date(datasetA[i]), parseFloat(datasetB[i]),parseFloat(datasetB[i]) ] )
      }
      return outputDygraphsArray;
    }
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
          dateWindow: [prevDate.setDate(prevDate.getDate() - 30), latestDate]
      })

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
