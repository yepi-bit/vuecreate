<template>
  <div class="leaflet-map">
    <img src="../../assets/bj.png" />
  </div>
</template>

<script>
import L from 'leaflet'
import 'leaflet/dist/leaflet.css'
export default {
  components: {},
  data() {
    return {
      map: null,
    }
  },
  mounted() {

  },
  methods: {

  }
}
</script>

<style lang="less" scoped>
.leaflet-map {
  width: 100%;
  height: 100%;
}
</style>
