<template>
  <div class="app">
    <div class="app__left">
      <div class="app__header">
        <h1>COVID-19 TRACKER</h1>
        <!-- <div
            class="info-flag"
            :style="images"
          ></div> -->
        <div>
          <el-select
            @change="onCountryChange"
            v-model="countryCodeSelected"
            placeholder="Select"
          >
            <el-option key="Ww" value="Worldwide">{{ startValue }}</el-option>
            <el-option
              v-for="item in countryData"
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
          @isSelected="activeRed"
          :classCard="classRed"
          classComp="infoBox__cases--red"
          title="Coronavirus Cases"
          :evolution="evolutionCase"
          :total="totalCase | formatNumber"
        />

        <InfoBox
          @isSelected="activeGreen"
          :classCard="classGreen"
          classComp="infoBox__cases--green"
          title="Recovered"
          :evolution="evolutionRecover"
          :total="totalRecover | formatNumber"
        />
        <InfoBox
          @isSelected="activeBlack"
          :classCard="classBlack"
          classComp="infoBox__cases--black"
          title="Deaths"
          :evolution="evolutionDeath"
          :total="totalDeath | formatNumber"
        />
      </div>

      <el-card class="app__map">
        <!-- <Map :v-model="markers"/> -->
        <!-- <vueMapbox></vueMapbox> -->
        <div id="mapContainer" class="basemap"></div>
      </el-card>
    </div>

    <el-card class="app__rightContainer">
      <h3 class="app__rightTitle">Last 24h Cases by Country</h3>

      <Table />
      <h3 class="app__graphTitle">{{ nameCountry }} new {{ casesType }}</h3>
      <!-- <LineGraph class="app__graph" :chart-data="datacollection" /> -->
      <area-chart
        :dataset="{ borderWidth: 0.1 }"
        :curve="false"
        suffix="k"
        :round="2"
        :zeros="true"
        :data="dataLine"
        thousands=","
        :colors="colorLine"
      ></area-chart>
    </el-card>

    <!-- <div class="table">
    <tr v-for="data in countryData" :key="data.code">
      <td>{{ data.name }}</td>
      <td>Latitude : {{ data.lat }}</td>
      <td>Longitude: {{ data.long }}</td>
    </tr>
  </div> -->
  </div>
</template>

<script>
// Fetch lineGraph https://disease.sh/v3/covid-19/historical/us?lastdays=120

// import LineGraph from "./components/LineGraphs";
import InfoBox from "./components/InfoBox";
import Table from "./components/Table";
// import Map from "./components/Map";
// import vueMapbox from "./components/vueMapBox"

//CHART

import Chartkick from "vue-chartkick";
import Chart from "chart.js";
Vue.use(Chartkick.use(Chart));

//MAP

import mapboxgl from "mapbox-gl";
import { API_Key } from "../src/key";

import { prettyPrintStat } from "./components/utils";
import Vue from "vue";
var numeral = require("numeral");
Vue.filter("formatNumber", function(value) {
  return numeral(value).format("0,0"); // displaying other groupings/separators is possible, look at the docs
});

export default {
  name: "BaseMap",
  components: {
    // LineGraph,
    InfoBox,
    Table,
    // Map,
    // vueMapbox
  },
  data() {
    return {
      isActiveRed: true,
      isActiveGreen: false,
      isActiveBlack: false,
      evolutionCase: 15,
      totalCase: 2500,
      evolutionRecover: 50,
      totalRecover: 2150,
      evolutionDeath: 23,
      totalDeath: 250,
      countryCodeSelected: "",
      countryData: [],
      startValue: "Worlwide",
      nameCountry: "",
      casesType: "cases",
      datacollection: null,

      dateGraph: [],
      valueGraph: [],
      colorLine: ["#ff0000"],

      onChangeValue: "",

      dataLine: [],

      accessToken: API_Key,
      markers: [],
      centerMap: [2, 46],
      popups: [],

      message: `
                    <div class="info-container">
          <h2>Welcome on the Covid Tracker</h2>
                 </div>
              `,

      urlImage: "",
      // images: {},
      images: {
        backgroundImage: "url(https://disease.sh/assets/img/flags/al.png)",
      },
    };
  },
  mounted() {
    this.fetchAllCountries();

    this.onCountryChange();
    this.countryCodeSelected = "Worlwide";
    // console.log(this.images)
  },
  methods: {
    mapBoxSetting() {
      //MAP SETTINGS
      mapboxgl.accessToken = this.accessToken;
      const map = new mapboxgl.Map({
        container: "mapContainer",
        style: "mapbox://styles/mapbox/light-v10",
        center: this.centerMap,

        zoom: 2,
        //   maxBounds: [
        //     [103.6, 1.1704753],
        //     [104.1, 1.4754753],
        //   ],
      });

      //MARKERS

      this.countryData.forEach((element) => {
        this.markers.push([
          new mapboxgl.Marker({
            options: {
              color: {
                type: String,
                default: "#ff0000",
                         },
            },
          })
            .setLngLat([element.long, element.lat])
            .addTo(map),
        ]);
      });

      console.log("mapboxgl.Marker", mapboxgl.Marker);
      // POPUPS

      var markerHeight = 50,
        markerRadius = 10,
        linearOffset = 25;
      var popupOffsets = {
        top: [0, 0],
        "top-left": [0, 0],
        "top-right": [0, 0],
        bottom: [0, -markerHeight],
        "bottom-left": [
          linearOffset,
          (markerHeight - markerRadius + linearOffset) * -1,
        ],
        "bottom-right": [
          -linearOffset,
          (markerHeight - markerRadius + linearOffset) * -1,
        ],
        left: [markerRadius, (markerHeight - markerRadius) * -1],
        right: [-markerRadius, (markerHeight - markerRadius) * -1],
      };

      this.popups = new mapboxgl.Popup({
        offset: popupOffsets,
        className: "my-class",
      })
        .setLngLat(this.centerMap)
        .setHTML(this.message)
        // .setHTML("<h1>Hello World! {{ nameCountry }}</h1>")
        .setMaxWidth("300px")
        .addTo(map);
    },

    activeRed() {
      this.isActiveRed = !this.isActiveRed;

      if (this.isActiveRed) {
        this.isActiveBlack = false;
        this.isActiveGreen = false;

        this.casesType = "cases";
        this.displayCountryValues();
        this.colorLine = ["#ff0000"];
      }
    },
    activeGreen() {
      this.isActiveGreen = !this.isActiveGreen;

      if (this.isActiveGreen) {
        this.isActiveRed = false;
        this.isActiveBlack = false;
        this.casesType = "recovered";
        this.displayCountryValues();
        this.colorLine = ["#90ee90"];
      }
    },
    activeBlack() {
      this.isActiveBlack = !this.isActiveBlack;

      if (this.isActiveBlack) {
        this.isActiveRed = false;
        this.isActiveGreen = false;
        this.casesType = "deaths";
        this.displayCountryValues();
        this.colorLine = ["#303133"];
      }
    },

    async fetchAllCountries() {
      await fetch("https://disease.sh/v3/covid-19/countries")
        .then((response) => response.json())
        .then((data) => {
          // console.log("datafetch", data);
          data.map((country) => {
            // console.log("Latitude", country.countryInfo.lat);
            // console.log("Longitude", country.countryInfo.long);
            this.countryData.push({
              name: country.country,
              value: country.cases,
              code: country.countryInfo.iso2,
              lat: country.countryInfo.lat,
              long: country.countryInfo.long,
            });
          });

          // console.log("Sorted", sortedData);
        });

      this.mapBoxSetting();
    },

    onCountryChange(e) {
      if (e === undefined) {
        e = "Worldwide";
      }

      this.onChangeValue = e;
      const url =
        e === "Worldwide"
          ? "https://disease.sh/v3/covid-19/all?yesterday=true"
          : `https://disease.sh/v3/covid-19/countries/${e}?yesterday=true&strict=true`;

      const fetchNewUrl = async () => {
        await fetch(url)
          .then((response) => response.json())
          .then((data) => {
            // console.log("dataFETECHED", data);

            // console.log(data.countryInfo.flag)

            this.evolutionCase = prettyPrintStat(data.todayCases);
            this.evolutionRecover = prettyPrintStat(data.todayRecovered);
            this.evolutionDeath = prettyPrintStat(data.todayDeaths);
            this.totalCase = data.cases;
            this.totalRecover = data.recovered;
            this.totalDeath = data.deaths;

            // this.urlImage = data.countryInfo.flag

            // if (this.urlImage === undefined) {
            //   console.log("Image introuvable")
            // }

            // console.log(this.images)
            // this.image = `backgroundImage:"url(${this.urlImage})"`

            //  <div  class="info-flag"  style={ backgroundImage: url(${data.countryInfo.flag}) }>
            //         hello
            //         </div>

            // console.log('NameCountry',this.nameCountry)

            // console.log(this.images)
            if (data.country === undefined || data.country === null) {
              this.nameCountry = "Worlwide";
            } else {
              this.nameCountry = data.country;
              this.images = { backgroundImage: `url(${this.urlImage})` };
              // this.message = 'countryname ' + this.totalCase + this.nameCountry
              this.message = `
               <div class="info-container">
                   
          <div class="info-name">${this.nameCountry}</div>
          <div class="info-confirmed">
            Cases: ${this.totalCase}
          </div>
          <div class="info-recovered">
            Recovered: ${this.totalRecover}
          </div>
          <div class="info-deaths">
            Deaths: ${this.totalDeath}
          </div>
        </div>
           `;
            }

            // :style="{'background-image':'url(https://vuejs.org/images/logo.png)'}"

            this.centerMap = [data.countryInfo.long, data.countryInfo.lat];
            this.mapBoxSetting();
          });
      };
      fetchNewUrl();
      this.displayCountryValues();
    },

    displayCountryValues(e) {
      e = this.onChangeValue;

      const url2 =
        e === "Worldwide"
          ? "https://disease.sh/v3/covid-19/historical/all?lastdays=120"
          : `https://disease.sh/v3/covid-19/historical/${e}?lastdays=120`;

      // console.log("EEEEEEE?????????", e);

      const fetchGraphUrl = async () => {
        await fetch(url2)
          .then((response) => response.json())
          .then((data) => {
            // console.log("dataFETCHED of the graphhh", data);

            if (e === "Worldwide" && this.isActiveRed === true) {
              for (const [key, value] of Object.entries(data.cases)) {
                const pourcentage = value / 1000;
                this.dataLine.push([key, pourcentage]);
              }
            } else if (e === "Worldwide" && this.isActiveGreen === true) {
              for (const [key, value] of Object.entries(data.recovered)) {
                const pourcentage = value / 1000;
                this.dataLine.push([key, pourcentage]);
              }
            } else if (e === "Worldwide" && this.isActiveBlack === true) {
              for (const [key, value] of Object.entries(data.deaths)) {
                const pourcentage = value / 1000;
                this.dataLine.push([key, pourcentage]);
              }
            } else if (this.isActiveRed === true) {
              for (const [key, value] of Object.entries(data.timeline.cases)) {
                // this.dateGraph.push(key);
                // this.valueGraph.push(value);
                // console.log(key, value)
                const pourcentage = value / 1000;
                this.dataLine.push([key, pourcentage]);
              }
            } else if (this.isActiveGreen === true) {
              for (const [key, value] of Object.entries(
                data.timeline.recovered
              )) {
                // this.dateGraph.push(key);
                // this.valueGraph.push(value);
                // console.log(key, value)
                const pourcentage = value / 1000;
                this.dataLine.push([key, pourcentage]);
              }
            } else if (this.isActiveBlack === true) {
              for (const [key, value] of Object.entries(data.timeline.deaths)) {
                // this.dateGraph.push(key);
                // this.valueGraph.push(value);
                // console.log(key, value)
                const pourcentage = value / 1000;
                this.dataLine.push([key, pourcentage]);
              }
            }
          });
      };
      // console.log(this.dateGraph)
      // console.log(this.valueGraph)
      fetchGraphUrl();
    },
  },
  computed: {
    classRed() {
      if (this.isActiveRed) {
        return "infoBox infoBox--red";
      } else {
        return "infoBox";
      }
    },
    classGreen() {
      if (this.isActiveGreen) {
        return "infoBox infoBox--green";
      } else {
        return "infoBox";
      }
    },
    classBlack() {
      if (this.isActiveBlack) {
        return "infoBox infoBox--black";
      } else {
        return "infoBox";
      }
    },
  },
};
</script>

<style>
.basemap {
  width: 100%;
  height: 615px;
}

.info-container {
  width: 150px;
}

.info-name {
  font-size: 20px;
  font-weight: bold;
  color: #555;
}

.info-flag {
  height: 80px;
  width: 100%;
  background-size: cover;
  border-radius: 8px;
}

.info-confirmed,
.info-recovered,
.info-deaths {
  font-size: 16px;
  margin-top: 5px;
}

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
  /* padding-bottom: 15px; */
  margin: 15px 0;
  /* width: 100%; */
}
.app__rightContainer {
  /* height: 100%; */
  height: 883px !important;
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
