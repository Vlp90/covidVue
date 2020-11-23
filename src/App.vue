<template>
  <div class="app">

    <div class="app__left">
      <div class="app__header">
        <h1>COVID-19 TRACKER</h1>
        <FormControl />
      </div>

      <div class="app__stats">
        <InfoBox title="Coronavirus Cases" evolution="12" total="10" />
        <InfoBox title="Recovered" evolution="12" total="10" />
        <InfoBox title="Deaths" evolution="12" total="10" />
      </div>

      <el-card class="app__map">
        <Map />
      </el-card>
    </div>

    <el-card class="app__rightContainer">
      <!-- <Card className="app__right">
        <CardContent> -->
      <h3 class="app__rightTitle">Last 24h Cases by Country</h3>
      <!-- {/* Table */} -->
      <!-- <Table countries="{tableData}" /> -->
      <Table country="Chine" totalCase="15000" />
      <h3 class="app__graphTitle">Worldwide new casesType</h3>
      <LineGraph class="app__graph" casesType="{casesType}" />
       

      <!-- </CardContent>
      </Card>  -->
    </el-card>
    
  </div>
</template>

<script>
import LineGraph from "./components/LineGraphs";
import InfoBox from "./components/InfoBox";
import Table from "./components/Table";
import Map from "./components/Map";
import FormControl from "./components/FormControl";
export default {
  name: "App",
  components: {
    LineGraph,
    InfoBox,
    Table,
    Map,
    FormControl,
  },
  methods: {
    fillData () {
        this.dataPoints = {
          labels: ['January' + this.getRandomInt(), 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'],
          datasets: [
            {
              label: 'Data One',
              backgroundColor: '#f87979',
              data: [this.getRandomInt(), this.getRandomInt(), this.getRandomInt(), this.getRandomInt(), this.getRandomInt(), this.getRandomInt(), this.getRandomInt(), this.getRandomInt(), this.getRandomInt(), this.getRandomInt(), this.getRandomInt(), this.getRandomInt()]
            }
          ]
        }
      }
  }
};
</script>

<style>
* {
  margin: 0;
  padding: 0;
}
body {
  margin: 0;
  font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", "Roboto", "Oxygen",
    "Ubuntu", "Cantarell", "Fira Sans", "Droid Sans", "Helvetica Neue",
    sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  background-color: #f5f6fa;
}
code {
  font-family: source-code-pro, Menlo, Monaco, Consolas, "Courier New",
    monospace;
}
.app {
  display: flex;
  justify-content: space-evenly;
  padding: 20px;
  max-width: 1200px;
  margin: 0 auto;
}
@media (max-width: 900px) {
  .app {
    flex-direction: column;
  }
}
.app__header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  /* width: 60vw;
  margin-top: 30px;
  margin-left: 20px; */
  margin-bottom: 20px;
}
.app__header > h1,
.app__rightTitle,
.app__graphTitle {
  color: gray;
}
.app__stats {
  display: flex;
  /* width: 500px; */
  justify-content: space-between;
}
.app__dropdown {
  background-color: white;
}
.app__left {
  flex: 0.9;
  /* height: 95vh; */
  height: 884px;
}
.app__right {
  display: flex;
  flex-direction: column;
  /* height: 870px; */
}
.app__right .MuiCardContent-root {
  display: flex;
  flex-grow: 1;
  flex-direction: column;
}
.app__graph {
  flex-grow: 1;
  height: 319px;
}
.app__graphTitle {
  margin-bottom: 20px;
}
.app__map {
  padding-bottom: 15px;
  margin: 15px 0;
  /* width: 100%; */
}
.app__rightContainer {
  /* height: 100%; */
  height: 884px;
}
@media (max-width: 500px) {
  .app__stats {
    display: flex;
    /* flex-grow: 1; */
    flex-direction: column;
  }
}
/* @media (max-width: 900px) {
  .app__rightContainer {
    margin-top: 400px;
  }
} */
</style>
