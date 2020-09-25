<template>
  <div>
    <div class="card">
      <md-card>
        <button class= "right-arrow-button"
        @click="hideLegend"
        >
          <md-icon>east</md-icon>
        </button>
        <md-card-header >
          <div class="legend-header">Legend</div>
        </md-card-header>
        <md-card-content>
          <md-list>
            <md-list-item v-for= "(layer, index) in layers" :key= "index">
              <md-checkbox class = "checkbox" v-model="visibility[index]"  @change="updateLayerVisibility (layer)" />
              <img class="layer-icon" v-bind:src="icons[index]">
              <div class="md-list-item-text">
                <span class="legend-layer">{{ layer }}</span>
              </div>
            </md-list-item>
          </md-list>
        </md-card-content>
      </md-card>
    </div>
  </div>
</template>

<script>

export default {
  props: {
    layers: {
      type: Array,
      required: true
    },
    icons: {
      type: Array,
      require: false
    },
    map: {
      type: Object,
      required: true
    },
    show: {
      type: Boolean,
      required: false
    }
  },
  mounted () {
    this.layers.forEach(layer => {
      const visible = this.map.getLayoutProperty(layer, 'visibility')
      if (visible === 'visible') {
        this.visibility.push(true)
      } else {
        this.visibility.push(false)
      }
    })
  },
  data () {
    return {
      visibility: []
    }
  },
  methods: {
    updateLayerVisibility (layer) {
      const visibility = this.map.getLayoutProperty(layer, 'visibility')
      if (visibility === 'visible') {
        this.map.setLayoutProperty(layer, 'visibility', 'none')
        this.className = ''
      } else {
        this.className = 'active'
        this.map.setLayoutProperty(layer, 'visibility', 'visible')
      }
    },
    hideLegend () {
      this.show = false
      this.$emit('hideLegend')
    }
  }
}
</script>

<style scoped>

.card{
    width: 320px;
    height: 40%;
    display: inline-block;
    top: 0;
    left:auto;
    right: 0;
    position: fixed;
    z-index:3;

  }
  .right-arrow-button {
    background-color: transparent;
    border:none;
    margin-top:0px;
    margin-right: 270px;
    margin-bottom: 0px;
    margin-left: 270px;
  }
 .legend-header {
   font-family: Tahoma, Geneva, sans-serif;
   font-size: 20px;
   text-align: center;
   vertical-align: middle;
   font-weight: bold;
 }
 .legend-layer {
   font-family: Tahoma, Geneva, sans-serif;
   font-size: 14px;
}
.layer-icon {
  width: 40px;
  height: 40px;
  left: -10px;
  margin-left: -25px;
  margin-right: 10px;
}
.checkbox {
  background: grey;
}

</style>>
