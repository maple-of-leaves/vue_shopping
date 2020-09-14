<!--  -->
<template>
  <div class>
    <div class="header">
      <div>
        <router-link to="/login">登录</router-link>
      </div>
      <div>
        <router-link to="/register">注册</router-link>
      </div>
    </div>

    <div class="body">
      <el-form
        :model="numberValidateForm"
        ref="numberValidateForm"
        label-width="100px"
        class="demo-ruleForm"
      >
        <el-form-item
          label="账号"
          prop="username"
          :rules="[
      { required: true, message: '账户名不存在'},
      { type: 'string', message: '格式不正确'}
    ]"
        >
          <el-input type="tel" v-model="numberValidateForm.username" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item
          label="密码"
          prop="pass"
          :rules="[
      { required: true, message: '密码必填'},
      { type: 'string', message: '格式不正确'}
    ]"
        >
          <el-input v-model="numberValidateForm.password" placeholder="3-18位英文、数字、符号、区分大小写"></el-input>
        </el-form-item>
        <el-form-item>
          <el-checkbox v-model="checked">记住密码</el-checkbox>
        </el-form-item>
        <el-button type="primary" style="width:100%" @click="login">登录</el-button>
        <div style="width:100%">
          <router-link to>找回密码</router-link>|
          还没有注册账号?
          <router-link to>立即注册</router-link>
        </div>
      </el-form>
    </div>
  </div>
</template>

<script>
import { Login } from "../network/index";
import md5 from "js-md5";
import qs from "qs";
export default {
  components: {},
  data() {
    return {
      token: "",
      userinfo: [],
      checked: true,
      message: [],
      numberValidateForm: {
        username: "",
        password: "",
      },
    };
  },
  computed: {},
  watch: {},
  //方法集合
  methods: {
    login() {
      let params = {
        LoginName: this.numberValidateForm.username,

        LoginPassword: md5(this.numberValidateForm.password),

        isPassing: "yes",
      };

      Login(
        qs.stringify({
          LoginName: this.numberValidateForm.username,

          LoginPassword: md5(this.numberValidateForm.password),

          isPassing: "yes",
        })
      )
        .then((res) => {
          if (res.code == 200) {
            setTimeout(() => {
              this.$router.push({
                name: "shop",
              });
            }, 2000);
          }
          let token = res.tnToken.tokenStr;
          this.$store.dispatch("login", [token, params]);
          console.log(res);
        })

        .catch((err) => {});

      this.userinfo.forEach((Element) => {
        // if (
        //   Element.LoginName == this.numberValidateForm.username &&
        //   Element.LoginPassword == this.numberValidateForm.password
        // ) {
        //   let username = sessionStorage.setItem(
        //     "username",
        //     JSON.stringify(this.numberValidateForm.username)
        //   );
        // }
      });

    },
  },
  created() {
    // let users = localStorage.users;

    // if (users) {
    //   this.userinfo = JSON.parse(users);
    // }
  },
  mounted() {},
};
</script>
<style scoped>
input {
  display: block;
}
.header {
  height: 100px;
  display: flex;
}

.header div {
  text-align: center;
  line-height: 100px;
  flex: 1;
}
.username {
  border-top: 1px solid #ddd;
}
.body div {
  margin-bottom: 50px;
}

.body {
  padding: 20px 60px;
  overflow: hidden;
}
</style>