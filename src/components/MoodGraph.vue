<template>
  <div class="mood-graph">
    <p>Awesome graph is gonna go here</p>
    <div id="chart"></div>
  </div>
</template>

<script>

export default {
  name: "MoodGraph",
  props: [],
  mixins: [],
  data() {
    return {
      data: {
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
  created() {
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
