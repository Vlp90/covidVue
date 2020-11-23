<template>
<div class="table">
      <!-- {/*  destructuring the data */}
      {countries.map(({ country, cases }) => ( -->
        <tr>
          <td>{{country}}</td>
          <td>
            <strong>{{totalCase}}</strong>
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
export default {
  props:["country", "totalCase" ]

}
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