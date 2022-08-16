<template>
  <div>{{ count }}</div>
  <div>{{ name }}</div>
  <div>{{ $store.state.setCount || 0}}</div>
  <el-button @click="actionClick">调actions</el-button>
</template>

<script>
import {mapState, mapActions} from 'vuex'
export default {
  name: "storeTest",
  data() {
    return {
    }
  },
  computed: {
    ...mapState(['count', 'name']), //传字符串参数 'count' 等同于 `state => state.count`
    // ...mapActions(['add']),
  },
  methods: {
    ...mapActions({setNum:'setNum',add:'add'}),
   actionClick(){
      // async
     this.$store.dispatch('setNum',2)
     // await this.setNum()
    }

  }
}
</script>

<style scoped>

</style>
