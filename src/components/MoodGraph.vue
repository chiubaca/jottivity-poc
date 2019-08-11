<template>
  <div class="mood-graph">
    <div class="blue-loading-spinner" v-if="allPosts.length === 0"></div>
    <div id="graphdiv"></div> 
  </div>
</template>

<script>
import Dygraph from 'dygraphs';

export default {
  name: "MoodGraph",
  props: ["allPosts"],
  mixins: [],
  data() {
    return {
      
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
      console.log("checking data")
      // check to see if there is any data to plot onto the graph.
      if (val.length === 0) {
        console.warn("No Data");
      } 
      //if so instantiate Dygraphs.
      else if (val.length > 0) {

      new Dygraph(
        document.getElementById("graphdiv"),
          this.dyGraphData(this.allDates, this.allSentimentScores),
            //Dygraph config goes into this object
            {
              drawPoints:true,
              labels: [ "date", "mood" ],
              width: "100%"
            }
          );
      }
    }
  },
    ready: function () {
    console.log("ready event")
    window.addEventListener('resize', (event)=>{
      console.log(event)
    })
  },
  beforeDestroy: function () {
    window.removeEventListener('resize', event=>{
      console.log("destroy resize event listen")
    })
  },
  mounted() {}
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss">

.line-horizontal, .line-vertical {
    display: none;
}


#graphdiv {
  width:100%;
  height:180px;

}

</style>
