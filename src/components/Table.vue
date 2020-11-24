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
        <strong>{{ item.value }}</strong>
      </td>
    </tr>

    <tr>
      <td>Chine</td>
      <td>
        <strong>120000</strong>
      </td>
    </tr>
  </div>
</template>

<script>
import { sortData } from "../components/utils";

export default {
  data() {
    return {
      // name: ["Japon", "Kenya"],
      // value: [10, 20],
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
