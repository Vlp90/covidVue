<template>
  <div class="app">
    <div class="app__left">
      <div class="app__header">
        <h1>COVID-19 TRACKER</h1>
        <div>
          <el-select
            @change="onCountryChange"
            v-model="countryCodeSelected"
            placeholder="Select"
          >
            <el-option key="Ww" value="Worldwide">{{ startValue }}</el-option>
            <el-option
              v-for="item in options"
              :key="item.code"
              :label="item.name"
              :value="item.code"
            >
            </el-option>
          </el-select>
        </div>
      </div>

      <div class="app__stats">
        <InfoBox
        class="app__stats--test"
          title="Coronavirus Cases"
          :evolution="evolutionCase"
          :total="totalCase | formatNumber"
        />
        <InfoBox 
          title="Recovered"
          :evolution="evolutionRecover"
          :total="totalRecover | formatNumber"
        />
        <InfoBox
          title="Deaths"
          :evolution="evolutionDeath"
          :total="totalDeath | formatNumber"
        />
      </div>

      <el-card class="app__map">
        <Map />
      </el-card>
    </div>

    <el-card class="app__rightContainer">
      <h3 class="app__rightTitle">Last 24h Cases by Country</h3>

      <Table />
      <h3 class="app__graphTitle">Worldwide new casesType</h3>
      <LineGraph class="app__graph" casesType="{casesType}" />
    </el-card>
  </div>
</template>

<script>
import LineGraph from "./components/LineGraphs";
import InfoBox from "./components/InfoBox";
import Table from "./components/Table";
import Map from "./components/Map";

import {prettyPrintStat} from './components/utils'
import Vue from "vue";
var numeral = require("numeral");
Vue.filter("formatNumber", function(value) {
  return numeral(value).format("0,0"); // displaying other groupings/separators is possible, look at the docs
});




export default {
  name: "App",
  components: {
    LineGraph,
    InfoBox,
    Table,
    Map,
  },
  data() {
    return {
      evolutionCase: 15,
      totalCase: 2500,
      evolutionRecover: 50,
      totalRecover: 2150,
      evolutionDeath: 23,
      totalDeath: 250,
      countryCodeSelected: "",
      options: [],
      startValue: "Worlwide",
    };
  },
  mounted() {
    this.fetchAllCountries();
    this.onCountryChange();
    this.countryCodeSelected = "Worlwide";
  },
  methods: {
    test() {
      console.log("action Maggle");
    },
    fillData() {
      this.dataPoints = {
        labels: [
          "January" + this.getRandomInt(),
          "February",
          "March",
          "April",
          "May",
          "June",
          "July",
          "August",
          "September",
          "October",
          "November",
          "December",
        ],
        datasets: [
          {
            label: "Data One",
            backgroundColor: "#f87979",
            data: [
              this.getRandomInt(),
              this.getRandomInt(),
              this.getRandomInt(),
              this.getRandomInt(),
              this.getRandomInt(),
              this.getRandomInt(),
              this.getRandomInt(),
              this.getRandomInt(),
              this.getRandomInt(),
              this.getRandomInt(),
              this.getRandomInt(),
              this.getRandomInt(),
            ],
          },
        ],
      };
    },

    async fetchAllCountries() {
      await fetch("https://disease.sh/v3/covid-19/countries")
        .then((response) => response.json())
        .then((data) => {
          // console.log(data);
          data.map((country) => {
            // console.log(country.countryInfo.iso2);
            this.options.push({
              name: country.country,
              value: country.cases,
              code: country.countryInfo.iso2,
            });
          });

          // console.log("Sorted", sortedData);
        });
    },

    onCountryChange(e) {
      if (e === undefined) {
        // console.log("starter")
        e = "Worldwide";
      }

      const url =
        e === "Worldwide"
          ? "https://disease.sh/v3/covid-19/all?yesterday=true"
          : `https://disease.sh/v3/covid-19/countries/${e}?yesterday=true&strict=true`;

      const fetchNewUrl = async () => {
        await fetch(url)
          .then((response) => response.json())
          .then((data) => {
            // console.log("dataFETECHED", data);

            this.evolutionCase = prettyPrintStat(data.todayCases);
            this.evolutionRecover = prettyPrintStat(data.todayRecovered);
            this.evolutionDeath = prettyPrintStat(data.todayDeaths);
            this.totalCase = data.cases;
            this.totalRecover = data.recovered;
            this.totalDeath = data.deaths;
          });
      };
      fetchNewUrl();
    },
  },
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
/* 
.app__stats--test:active {
    border-top: 10px solid greenyellow;

} */

.app__stats--test:evolution {
  color: red;
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
