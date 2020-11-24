<template>
  <div class="table">
    <!-- {/*  destructuring the data */}
      {countries.map(({ country, cases }) => ( -->
    <!-- <tr>
          <td>{{country}}</td>
          <td>
            <strong>{{totalCase}}</strong>
          </td>
        </tr> -->

    <tr v-for="item in fetchValue" :key="item.name">
      <td>{{ item.name }}</td>
      <td>        

        <strong>{{ item.value | formatNumber }}</strong>

      </td>
    </tr>

  </div>
</template>

<script>
import { sortData } from "../components/utils";
import Vue from 'vue'
var numeral = require("numeral");
Vue.filter("formatNumber", function (value) {
    return numeral(value).format("0,0"); // displaying other groupings/separators is possible, look at the docs
  });


export default {
  data() {
    return {
      // name: ["Japon", "Kenya"],
      count: 10000000002222,
      fetchValue: [],
    };
  },
  // props:["country", "totalCase" ]
  created() {
    this.fetchCountriesData();
  },

  methods: {
    async fetchCountriesData() {
      await fetch("https://disease.sh/v3/covid-19/countries")
        .then((response) => response.json())
        .then((data) => {
          // console.log(data);

          const sortedData = sortData(data);
          sortedData.map((country) => {
            // console.log(country.country);
            this.fetchValue.push({
              name: country.country,
              value: country.cases,
            });
          });

          // console.log("Sorted", sortedData);
        });
    },
  },
};
</script>

<style>
.table {
  margin: 20px 0;
  overflow: scroll;
  overflow-x: hidden;
  /* overflow-y: hidden; */
  /* height: 85vh; */
  height: 400px;
  color: #6a5d5d;
  background-color: white;
}

.table tr:nth-of-type(odd) {
  background-color: #f3f2f8;
}

.table tr {
  display: flex;
  justify-content: space-between;
}

.table td {
  padding: 0.5rem;
}
</style>
