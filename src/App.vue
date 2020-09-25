<template>
  <div id="app">
    <show-legend
      @showLegend="showLegend=true"
    ></show-legend>
    <transition name="slide">
      <layers-legend  v-show="showLegend" v-if="layersLoaded"
        :layers="layers"
        :map="map"
        :icons="icons"
        :show="showLegend"
        @hideLegend="showLegend=false"
      />
    </transition>
    <v-mapbox
      access-token="pk.eyJ1IjoiaW9taWMiLCJhIjoiY2thZ3g5NDJvMGF4eDJzcWI3NnpraTlybCJ9.2NLC1oDwtP6lBWIsAfEu1A"
      map-style="mapbox://styles/mapbox/light-v10"
      :zoom="1"
      :pitch="0"
      :bearing="0"
      id="map"
      ref="map">
        <v-mapbox-navigation-control
      :options="{ visualizePitch: true }"
      position="bottom-right"
      />
      </v-mapbox>
  </div>
</template>
<script>
import LayersLegend from './components/layers-legend'
import ShowLegend from './components/show-legend'
import getMarkerList from './get-markerlist'
import { geojson } from './geojson'
import mapboxgl from 'mapbox-gl'
import getMarkerInfo from './get-markerinfo'
export default {
  name: 'app',
  components: {
    LayersLegend,
    ShowLegend
  },
  data () {
    return {
      map: null,
      source: 'projects',
      layers: [],
      layersLoaded: false,
      icons: [],
      showLegend: true
    }
  },
  mounted () {
    this.map = this.$refs.map.map
    getMarkerList()
      .then(data => {
        console.log('data', data[0].lat, typeof (data[0].lat), parseFloat(data[0].lat.replace(',', '.')))
        this.addProjects(geojson(data))
      })
  },
  methods: {
    // method that creates the popup
    addPopup (layer) {
      this.map.on('click', layer, e => {
        const coordinates = e.features[0].geometry.coordinates.slice()
        while (Math.abs(e.lngLat.lng - coordinates[0]) > 180) {
          coordinates[0] += e.lngLat.lng > coordinates[0] ? 360 : -360
        }
        getMarkerInfo(e.features[0].properties.id)
          .then(data => {
            new mapboxgl.Popup()
              .setLngLat(coordinates)
              .setHTML(data)
              .addTo(this.map)
          })
      })
      this.map.on('mouseenter', layer, () => {
        this.map.getCanvas().style.cursor = 'pointer'
      })
      this.map.on('mouseleave', layer, () => {
        this.map.getCanvas().style.cursor = ''
      })
    },
    addImage (feature) {
      const path = 'icons/'
      this.map.loadImage(path + feature.properties.icon,
        (error, image) => {
          if (error) {
            console.log('error')
          }
          if (!this.map.hasImage(feature.properties.icon)) {
            this.map.addImage(feature.properties.icon, image)
          }
        }
      )
    },
    addLayer (feature) {
      const symbol = feature.properties.icon
      const layerID = feature.properties.subject
      const clusterID = 'cluster' + layerID
      const clusterCount = 'cluster-count' + layerID

      if (!this.map.getLayer(layerID)) {
        this.layers.push(layerID)
        this.icons.push('icons/' + symbol)
        // add cluster layer
        this.map.addLayer({
          id: clusterID,
          type: 'circle',
          source: this.source,
          filter: ['has', 'point_count'],
          paint: {
            'circle-color': [
              'step',
              ['get', 'point_count'],
              '#51bbd6',
              100,
              '#f1f075',
              750,
              '#f28cb1'
            ],
            'circle-radius': [
              'step',
              ['get', 'point_count'],
              20,
              100,
              30,
              750,
              40
            ]

          }
        })
        this.map.addLayer({
          id: clusterCount,
          type: 'symbol',
          source: this.source,
          filter: ['has', 'point_count'],
          layout: {
            'text-field': '{point_count_abbreviated}',
            'text-font': ['DIN Offc Pro Medium', 'Arial Unicode MS Bold'],
            'text-size': 12
          }
        })
        this.map.addLayer({
          id: layerID,
          type: 'symbol',
          source: this.source,
          layout: {
            'icon-image': ['get', 'icon'],
            'icon-size': 0.25,
            visibility: 'visible'
          },
          filter: ['all', ['!has', 'point_count'], ['==', 'icon', symbol]]
        })
        this.addPopup(layerID)
      }
    },
    addProjects (geojson) {
      this.map.on('load', () => {
        this.map.addSource(this.source, {
          type: 'geojson',
          data: geojson,
          cluster: true,
          clusterMaxZoom: 14,
          clusterRadius: 50
        })
        geojson.features.forEach(feature => {
          console.log('add each feature')
          this.addImage(feature)
          this.addLayer(feature)
        })
        this.layersLoaded = true
      })
    },
    // add zoom in and zoom out
    // show the legend
    onShowLegend (boolean) {
      this.showLegend = boolean
    }
  }

}
</script>

<style>
@import '~mapbox-gl/dist/mapbox-gl.css';
html, body {
  width: 100vw;
  height: 100vh;
  margin: 0;
  padding: 0;
}
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
  width: 100%;
  height: 100%;
}
#map {
  width: 100%;
  height: 100%;
}
.slide-enter-active, .slide-leave-active {
  transition:  transform .2s ease;
}
.slide-enter, .slide-leave-to {
  transform: translateX(0);
  transition: all 150ms ease-in 5s
}
.location {
  font-family: Tahoma, Geneva, sans-serif;
  color: #6eabb0;
  font-size: 20px;
}
.description {
  font-family: Tahoma, Geneva, sans-serif;
  font-weight: bold;
  font-size: 16px;

}

.fact {
  font-family: Tahoma, Geneva, sans-serif;
  font-size:14px;
}
</style>
