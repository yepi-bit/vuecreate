<template>
  <div class="result-page">
    <div style="padding: 20px;border-radius: 8px;   background: rgba(255, 255, 255, 0.9); margin-bottom: 16px;">
      <h2 style="text-align: center;margin-bottom: 16px; margin-top: 0;">
        π ikun ζθ‘ π
      </h2>
      <van-list style="margin-bottom: 8px;">
        <van-cell
            v-for="(userScoreInfo, index) in userScoreRankList"
            :key="index"
            :title="`${index + 1}. ${userScoreInfo?.username}`"
            :value="userScoreInfo?.score"
        />
      </van-list>
      <van-button type="primary" block @click="goBack">θΏε</van-button>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useRouter } from "vue-router";
import { onMounted, Ref, ref } from "vue";
import myAxios from "../plugins/myAxios";
import { Toast } from "vant";

// ζθ‘εθ‘¨
const userScoreRankList: Ref<any[]> = ref([]);

onMounted(async () => {
  // θ―·ζ±ζθ‘ζ¦
  const res: any = await myAxios.post("/user_score/list/rank", {
    size: 50,
  });
  if (res?.code === 0) {
    userScoreRankList.value = res.data;
  } else {
    Toast("θ·εε€±θ΄₯οΌθ―·ε·ζ°ιθ―");
  }
});

const router = useRouter();

/**
 * θΏεδΈδΈι‘΅
 */
const goBack = () => {
  router.back();
};
</script>

<style scoped>
.rank-list {
  max-height: 240px;
  overflow: scroll;
}
</style>
