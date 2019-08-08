<template>
  <div class="mood-graph">

    <div id=graph-container>
      <div class="blue-loading-spinner" v-if="allPosts.length === 0"></div>
      <div id="graphdiv"></div>
    </div>
    
  </div>
</template>

<script>
import { Chart } from "frappe-charts/dist/frappe-charts.esm.js";
import "frappe-charts/dist/frappe-charts.min.css";
import Dygraph from 'dygraphs';

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
    //data transformation to covert dates array and sentiment array into 
    //data structure which is compatible with dygraphs.
    dyGraphData(datasetA, datasetB){
      let outputDygraphsArray = [];

      // datasetA.forEach((i) => {
      //   console.log(i)
      // })

      for(let i = 0; i < datasetA.length; i++ ){
        // console.log(i)
        outputDygraphsArray.push([ new Date(datasetA[i]), parseFloat(datasetB[i]) ] )
      }
      // console.log(outputDygraphsArray);
      return outputDygraphsArray
    }
  },
  computed:{
    allDates() {
      let dateRange = [];
      this.allPosts.forEach((post) => {
        dateRange.push(post.date);
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
    }
  },
  watch: {
    allPosts: function(val, oldVal) {
      // console.log("hello from date watcher", val)
      if (val.length === 0) {
        console.warn("No Data");
        
      } else if (val.length > 0) {
  

      // DYGRAPHS
      console.log( "dygraphs data", this.dyGraphData(this.allDates, this.allSentimentScores))
       new Dygraph(
        // containing div
        document.getElementById("graphdiv"),
          this.dyGraphData(this.allDates, this.allSentimentScores),
            {
              drawPoints:true,
              labels: [ "date", "mood" ]
            }
          );

      ///////////
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

#graph-container{
  width:100%;
  
  #graphdiv  {
    width:100%;

  }
}


</style>
