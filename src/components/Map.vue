<template>
  <div id="mapContainer" class="basemap"></div>
</template>

<script>
import mapboxgl from "mapbox-gl";
import {API_Key} from "../key"

export default {
  name: "BaseMap",
  data() {
    return {
    accessToken: API_Key
    };
  },
  mounted() {
    mapboxgl.accessToken = this.accessToken;

    new mapboxgl.Map({
      container: "mapContainer",
      style: "mapbox://styles/mapbox/streets-v11",
      center: [103.811279, 1.345399],
      zoom: 2,
    //   maxBounds: [
    //     [103.6, 1.1704753],
    //     [104.1, 1.4754753],
    //   ],
    });
  },
};
</script>

<style scoped>
.basemap {
  width: 100%;
  height: 615px;
}
</style>