<template>
  <div class="index-page">
    <div class="card">
      <h2 class="cardH2">
        🐔 ikun 测试 🏀
        <el-button @click="passwordClick" type="warning">解码</el-button>
      </h2>
      <div class="cardDiv">
        测试你是真爱坤还是小黑子？
      </div>
      <div style="color: #888;text-align: center;">
        *声明：作者系纯路人，仅提供技术支持
      </div>
    </div>
    <div style="margin-bottom: 16px;"/>
    <div class="card" v-if="!start">

      <div style="margin-bottom: 16px;">请先输入昵称：{{ MiMa }}</div>
      <van-field
          v-model="username"
          autofocus
          @click-input="clickInput "
          placeholder="好名有机会得到更多的分数（暗号）"
      />
      <van-button
          block
          type="primary"
          :disabled="username.length < 1"
          @click="doStart"
      >
        开始答题
      </van-button>
      <!--      <img src="../assets/kaichang.gif" style="width: 100%" />-->
    </div>

    <template v-if="start && currentQuestions.length > 0">
      <QuestionBoard
          :questions="currentQuestions"
          :onQuestionChange="doQuestionChange"
          :onSubmit="doSubmit"
      />
    </template>
    <audio ref="audioRef" src="https://636f-codenav-8grj8px727565176-1256524210.tcb.qcloud.la/ikun-audio/niganma.aac"/>
    <el-dialog title="请输入"
               v-model="showKey"
               :modal="false"
               top=36vh
               width="30%">
      <!--      <img src="../assets/kaichang.gif" style="width: 100%"/>-->
      <div class="keyBorad" v-for="(item,index) in keyList" :key="index">
        <el-button class="eButton" type="success" plain size="medium" @click="keyValue(Object.values(item.keyId))">
          {{ item.keyId }}
        </el-button>
      </div>
      <span slot="footer" class="dialog-footer">
        <el-button type="primary" @click="showKey = false">确 定</el-button>
      </span>
    </el-dialog>

  </div>
</template>

<script setup lang="ts">
// import QuestionBoardVue from "../components/QuestionBoard.vue";
import {onMounted, reactive, Ref, ref} from "vue";
import myAxios from "../plugins/myAxios";
import {Toast} from "vant";
import {useRouter} from "vue-router";
import {Base64} from 'js-base64';

const MiMa = ref('')
const passwordClick = () => {
  MiMa.value = Base64.decode(localStorage.getItem("passWord"));// base64解密
}
// 本轮题目
const currentQuestions: Ref<QuestionType[]> = ref([]);
// 输入用户名
const username = ref("");
// 是否开始
const start = ref(false);
// 控制音频
const audioRef = ref();
const keyList = reactive([{keyId: '1'}, {keyId: '2'}, {keyId: '3'}, {keyId: '4'}, {keyId: '5'}, {keyId: '6'}, {keyId: '7'}, {keyId: '8'}, {keyId: '9'}, {keyId: '.'}, {keyId: '0'}, {keyId: 'del'}])
const showKey = ref(false)
const clickInput = () => {
  showKey.value = true
}
const keyValue = (value) => {
  username.value += value

  if (value == 'd,e,l') {
    username.value = username.value.split('d')[0].slice(0, username.value.split('d')[0].length - 1)
  }
}
onMounted(async () => {
  const res: any = await myAxios.post("/question/list");
  if (res?.code === 0) {
    currentQuestions.value = res.data;
  } else {
    Toast("获取题目失败，请刷新重试");
  }
});

const router = useRouter();

/**
 * 开始答题
 */
const doStart = () => {
  start.value = true;
  audioRef.value.play();
};

/**
 * 提交结果
 * @param score
 * @param answers
 */
const doSubmit = async (score: number, answers: string[][]) => {
  const res: any = await myAxios.post("/user_score/add", {
    username: username.value,
    answers,
    questionIds: currentQuestions.value.map((question) => question.id),
  });
  if (res?.code === 0) {
    const newAddScore = res.data;
    if (newAddScore) {
      router.replace({
        path: `/about/${newAddScore.id}`,
      });
    }
  } else {
    Toast("提交失败");
  }
};

const doQuestionChange = (
    currentNum: number,
    score: number,
    answers: string[][]
) => {
};
</script>

<style scoped>
.card {
  width: 50vw;
  background: rgba(255, 255, 255, 0.9);
  border-radius: 8px;
  padding: 20px;
  text-align: center;
  margin: auto;
}

.card .cardH2 {
  margin-bottom: 16px;
  text-align: center;
  margin-top: 0;
}

.card .cardDiv {
  margin-bottom: 8px;
  text-align: center;
  margin-top: 0;
}

.keyBorad {
  display: inline-block;
  margin: auto;
}

.keyBorad .eButton {
  display: flex;
  flex-wrap: wrap;
  width: 160px;
  height: 60px;
}

.dialog-footer {
  float: right;
}
</style>
