<template>
  <div class="login">
    <div class="form">
      <van-cell-group>
        <van-field
            v-model="userName"
            left-icon="manager"
            placeholder="请输入账号"
        />
        <van-field
            type="password"
            v-model="passWord"
            left-icon="lock"
            placeholder="请输入密码"
        />
      </van-cell-group>
    </div>
    <div class="checked">
      <van-checkbox v-model="checked" checked-color="#f90000"
      >记住密码
      </van-checkbox
      >
    </div>
    <div class="submit">
      <van-button type="danger" size="large" @click="submit">登录</van-button>
    </div>
  </div>
</template>

<script>
import {ElMessage} from "element-plus";
import { Base64 } from 'js-base64';
export default {
  data() {
    return {
      userName: "",
      passWord: "",
      checked: true,
      showDialog: false,
      userId:''
    };
  },
  methods: {
    submit() {
      //登录
      if (this.userName === "" || this.passWord === "") {
        ElMessage({
          type: "warning",
          message: "请填写账号或密码",
        });
      } else {
        if (this.checked) {
          let passWord = Base64.encode(this.passWord); // base64加密
          localStorage.setItem("userName", this.userName);
          localStorage.setItem("passWord", passWord);
          // 设置登录时间
          localStorage.setItem('tokenStartTime', new Date().getTime())
          this.$store.state.name = this.userName
          this.$router.push({ path: "/" })

        }else {
          localStorage.removeItem("userName");
          localStorage.removeItem("passWord");
        }

        // Toast.loading({
        //   message: '正在登录...',
        //   duration: 0,
        //   forbidClick: true,
        // });
        // this.$store.dispatch('login', {
        //   username: this.userName,
        //   password: this.passWord
        // }).then((res) => {
        //   Toast.clear();
        //   this.$store.dispatch('getInfo', res).then(res => {
        //     this.$router.push({path: '/'});
        //     Toast('登录成功');
        //   });
        // }).catch((err) => {
        //   Toast(err);
        // })
      }
    },
  },
};
</script>

<style scoped>
.login {
  width: 100%;
  height: 100%;
}
.van-cell-group .van-cell {
  font-size: 16px;
  background-color: #fff;
  color: #d1d1d1;
  border-radius: 30px;
  overflow: hidden;
  margin-top: 20px;
  padding: 15px 20px;
  border: 1px solid #eec79c;
}

.login .form {
  padding: 0 30vw;
}

.login .submit {
  padding: 0 30vw;
}

.login .submit .van-button--danger {
  background-color: #f90000;
  border: 1px solid #f90000;
  border-radius: 30px;
  overflow: hidden;
}

.submit .van-button {
  width: 100%;
}

.van-field /deep/ .van-icon {
  font-size: 20px;
}

.checked {
  padding: 20px 30vw;
}

.checked /deep/ .van-checkbox__icon {
  background-color: #fff;
  border-radius: 10px;
}
.radio .van-radio {
  margin: 10px 0;
}
</style>
