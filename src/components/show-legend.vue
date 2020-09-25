<template>
    <button
      class="left-arrow-button"
      @click="showLegend"
    >
      <md-icon>west</md-icon>
    </button>
</template>

<script>
export default {
  methods: {
    showLegend () {
      this.$emit('showLegend')
    }
  }
}

</script>

<style>
    .left-arrow-button {
        display: block;
        top: 0%;
        right: 0.7%;
        position: absolute;
        z-index: 2;
        pointer-events: auto;
        width: 29px;
        height: 29px;
        outline: none !important;
        border: none;
        padding: 0;
        background-color: transparent;

    }
</style>
