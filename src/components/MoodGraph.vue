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
        labels: [ "Date", "Mood Score" ],
        color:"black",
        plotter:smoothPlotter,
        animatedZooms:true,
        rightGap:40,
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
        outputDygraphsArray.push([ new Date(datasetA[i]), parseFloat(datasetB[i]) ] )
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
        // this.dateRange.push(new Date(post.date))
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
