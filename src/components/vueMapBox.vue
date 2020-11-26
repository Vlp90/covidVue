<template>
<div>

  <MglMap :accessToken="accessToken" :mapStyle="mapStyle" />
  <h1>Hello</h1>
</div>
</template>

<script>
import Mapbox from "mapbox-gl";
import { MglMap } from "vue-mapbox";

export default {
  components: {
    MglMap
  },
  data() {
    return {
      accessToken: "pk.eyJ1IjoidmxhZGltaXJscCIsImEiOiJja2ZwaTYxNm8wNWxmMzNycDh0dGlncGxsIn0.rBIYqRbNCmOpoFLXk4aP-A", // your access token. Needed if you using Mapbox maps
      mapStyle: {
  "version": 8,
  "name": "Meteorites",
  "metadata": {
    "mapbox:origin": "basic-template-v1",
    "mapbox:autocomposite": true,
    "mapbox:type": "template",
    "mapbox:sdk-support": {
      "js": "0.45.0",
      "android": "6.0.0",
      "ios": "4.0.0"
    }
  },
  "center": [
    74.24426803763072,
    -2.2507114487818853
  ],
  "zoom": 0.6851443156248076,
  "bearing": 0,
  "pitch": 0,
  "sources": {
    "composite": {
      "url": "mapbox://mapbox.mapbox-streets-v8,examples.0fr72zt8",
      "type": "vector"
    }
  },
  "sprite": "mapbox://sprites/examples/cjikt35x83t1z2rnxpdmjs7y7",
  "glyphs": "mapbox://fonts/{username}/{fontstack}/{range}.pbf",
  "layers": [
    {
      "id": "background",
      "type": "background",
      "layout": {},
      "paint": {
        "background-color": [ ]
      }
    },
   
  ],
  "created": "2015-10-30T22:18:31.111Z",
  "id": "cjikt35x83t1z2rnxpdmjs7y7",
  "modified": "2015-10-30T22:22:06.077Z",
  "owner": "examples",
  "visibility": "public",
  "draft": false
} // your map style
    };
  },

  created() {
    // We need to set mapbox-gl library here in order to use it in template
    this.mapbox = Mapbox;
  }
};
</script>