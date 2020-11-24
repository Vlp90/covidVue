<template>
  <div class="app">
    <div class="app__left">
      <div class="app__header">
        <h1>COVID-19 TRACKER</h1>
        <div>
          <el-select
            @change="handleChange"
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
          title="Coronavirus Cases"
          :evolution="evolutionCase"
          :total="totalCase"
        />
        <InfoBox
          title="Recovered"
          :evolution="evolutionRecover"
          :total="totalRecover"
        />
        <InfoBox
          title="Deaths"
          :evolution="evolutionDeath"
          :total="totalDeath"
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
// import FormControl from "./components/FormControl";
export default {
  name: "App",
  components: {
    LineGraph,
    InfoBox,
    Table,
    Map,
    // FormControl,
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
      options: [
        // {
        //   value: "Option2010",
        //   label: "Option210",
        // },
        // {
        //   value: "Option2",
        //   label: "Option2",
        // },
        // {
        //   value: "Option3",
        //   label: "Option3",
        // },
        // {
        //   value: "Option4",
        //   label: "Option4",
        // },
        // {
        //   value: "Option5",
        //   label: "Option5",
        // },
      ],
      startValue: "Worlwide",
    };
  },
  mounted() {
    this.fetchAllCountries();
    this.handleChange();
    this.countryCodeSelected = "Worlwide";
  },
  methods: {
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
          console.log(data);
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

    // async onCountryChange(event) {
    async onCountryChange() {
      // console.log("event", event);
      // const countryCode = event.target.value;
      // console.log("countryCode", countryCode);

      // const url =
      //   countryCode === "worldwide-tag-value"
      //     ? "https://disease.sh/v3/covid-19/all?yesterday=t rue"
      //     : `https://disease.sh/v3/covid-19/countries/${countryCode}?yesterday=true&strict=true`;

      // https://disease.sh/v3/covid-19/countries/US?yesterday=true&strict=true

      // await fetch(url)
      await fetch(
        `https://disease.sh/v3/covid-19/countries/US?yesterday=true&strict=true`
      )
        .then((response) => response.json())
        .then((data) => {
          console.log(data);

          this.options.push({
            value: "Option5",
            label: "Option5",
          });

          console.log("options", this.options);
          // setCountry(countryCode);
          // setCountryInfo(data);
          // setMapCenter([data.countryInfo.lat, data.countryInfo.long]);
          // setMapZoom(4);
        });
    },

    handleChange(e) {
      if (e === undefined) {
        // console.log("starter")
        e = "Worldwide";
      }


      const url = e === "Worldwide"
        ? "https://disease.sh/v3/covid-19/all?yesterday=true"
        : `https://disease.sh/v3/covid-19/countries/${e}?yesterday=true&strict=true`;
    

      const fetchNewUrl = async () => {
        await fetch(url)
          .then((response) => response.json())
          .then((data) => {
            console.log("dataFETECHED", data);

          this.evolutionCase = data.todayCases;
           this.evolutionRecover = data.todayRecovered;
            this.evolutionDeath = data.todayDeaths;
            this.totalCase = data.cases;
            this.totalRecover = data.recovered;
            this.totalDeath = data.deaths;

            // this.options.push({
            // value: "Option5",
            // label: "Option5",
          });
      };
      fetchNewUrl()

      // const url =
      //   countryCode === "worldwide-tag-value"
      //     ? "https://disease.sh/v3/covid-19/all?yesterday=t rue"
      //     : `https://disease.sh/v3/covid-19/countries/${countryCode}?yesterday=true&strict=true`;

      // https://disease.sh/v3/covid-19/countries/US?yesterday=true&strict=true

      // await fetch(url)
      // console.log(e)
      // this.countryCodeSelected = e
      // console.log("Data passed", this.countryCodeSelected)
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
