<template>
  <div id="mapContainer" class="basemap" :v-model='markers'></div>
</template>

<script>
import mapboxgl from "mapbox-gl";
import { API_Key } from "../key";

export default {
  name: "BaseMap",
  data() {
    return {
      accessToken: API_Key,
      markers:[]
    };
  },
  mounted() {
    console.log(this.marker);
    mapboxgl.accessToken = this.accessToken;
    const map = new mapboxgl.Map({
      container: "mapContainer",
      style: "mapbox://styles/mapbox/light-v10",
      center: [2, 46],

      zoom: 2,
      //   maxBounds: [
      //     [103.6, 1.1704753],
      //     [104.1, 1.4754753],
      //   ],
    });

    this.markers.push([
      new mapboxgl.Marker().setLngLat([2, 46]).addTo(map),
      new mapboxgl.Marker().setLngLat([5, 46]).addTo(map),
      new mapboxgl.Marker().setLngLat([5, 10]).addTo(map),
    ]);

    //  this.marker = new mapboxgl.Marker()
    //   .setLngLat([2, 46])
    //   .addTo(map);

    console.log(this.markers);
  },
};
</script>

<style scoped>
.basemap {
  width: 100%;
  height: 615px;
}
</style>
