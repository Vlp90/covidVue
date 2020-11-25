<script>
import { Line, mixins } from "vue-chartjs";
const { reactiveProp } = mixins;

export default {
  data() {
    return {
      // options: {
      //   legend: {
      //     display: false,
      //   },
      //   // elements: {
      //   //   point: {
      //   //     radius: 0,
      //   //   },
      //   // },
      //   // maintainAspectRatio: false,
      //   // tooltips: {
      //   //   mode: "index",
      //   //   intersect: false,
      //   //   // callbacks: {
      //   //   //   label: function (tooltipItem, data) {
      //   //   //     return numeral(tooltipItem.value).format("+0,0");
      //   //   //   },
      //   //   // },
      //   // },
      //   // scales: {
      //   //   xAxes: [
      //   //     {
      //   //       type: "time",
      //   //       time: {
      //   //         format: "MM/DD/YY",
      //   //         tooltipFormat: "ll",
      //   //       },
      //   //     },
      //   //   ],
      //     // yAxes: [
      //     //   {
      //     //     gridLines: {
      //     //       display: false,
      //     //     },
      //     //     // ticks: {
      //     //     //   // Include a dollar sign in the ticks
      //     //     //   callback: function (value, index, values) {
      //     //     //     return numeral(value).format("0a");
      //     //     //   },
      //     //     // },
      //     //   },
      //     // ],
      //   // },
      // },
    };
  },
  extends: Line,
  mixins: [reactiveProp],
  // props: ['options'],

  mounted() {
    // this.chartData is created in the mixin.
    // If you want to pass options please create a local options object
    this.renderChart(this.chartData, this.options);
  },
};
</script>

<style></style>
