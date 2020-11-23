

<script>
import { Line } from '../components/mixin/BaseCharts'

export default {
extends: Line,
  mounted () {
    this.renderChart({
      labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July', "August", "September", "October", "November", "December"],
      datasets: [
        {
          label: 'Data One',
          backgroundColor: '#f87979',
          data: [40, 39, 10, 40, 39, 80, 40, 70, 200, 500, 1000, 2000]
        }
      ]
    }, {responsive: true, maintainAspectRatio: false})
  }
}
</script>

<style>

</style>