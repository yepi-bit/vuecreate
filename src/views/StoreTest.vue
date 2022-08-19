<template>
  <div>
    <div>{{ count }}</div>
    <div class="aspect-ratio">
    </div>
    <div>{{ name }}</div>
    <div>{{ $store.state.setCount || 0}}</div>
    <el-button @click="actionClick">调actions</el-button>
  </div>
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

<style lang="less" scoped>

.aspect-ratio{
  display: inline-block;
  width: 10%;
  text-align: center;
  background-color: #42b983;
  aspect-ratio: 16/9
}
</style>
