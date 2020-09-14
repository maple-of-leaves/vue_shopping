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
        :rules="rules"
        :model="numberValidateForm"
        ref="numberValidateForm"
        label-width="100px"
        class="demo-ruleForm"
      >
        <el-form-item
          label="手机号"
          prop="phone"
          :rules="[
    
      { type: 'string', message: '格式不正确'}
    ]"
        >
          <el-input
            type="tel"
            v-model="numberValidateForm.phone"
            autocomplete="off"
            @blur="checkphone"
          ></el-input>
        </el-form-item>

        <el-form-item
          label="登录名"
          prop="username"
          :rules="[
        { required: true, message: '用户名不能为空',trigger: 'blur'},
         { type: 'string', message: '格式不正确'}
    ]"
        >
          <el-input v-model="numberValidateForm.username" @blur="checkusername"></el-input>
        </el-form-item>

        <el-form-item
          label="密码"
          prop="password"
          :rules="[
      { required: true, message: '密码必填',trigger: 'blur'},
      { type: 'string', message: '格式不正确'}
    ]"
        >
          <el-input v-model="numberValidateForm.password" placeholder="3-18位英文、数字、符号、区分大小写"></el-input>
        </el-form-item>
        <el-form-item
          label="短信验证码"
          prop="msg"
          :rules="[
      { required: true, message: '请输入验证码',trigger: 'blur'},
      { type: 'string', message: '请输入验证码'}
    ]"
        >
          <el-input v-model="numberValidateForm.msg" placeholder="请输入验证码"></el-input>
          <van-button color="#0076ff" @click="sendcode">发送验证码</van-button>
        </el-form-item>
        <el-button type="primary" @click="register" style="width:100%">注册</el-button>
      </el-form>
    </div>
  </div>
</template>

<script>
import qs from "qs";

import md5 from "js-md5";

import axios from "axios";

import { mapState } from "vuex";

import {
  Register,
  VerifyPhone,
  Checkusername,
  Phonecode,
} from "../network/index";
export default {
  components: {},
  data() {
    return {
      userinfo: [],
      numberValidateForm: {
        phone: "",
        username: "",
        password: "",
        msg: "",
        successCode: "",
        usernameCode: "",
        status: "",
      },

      rules: {
        phone: [{ required: true, message: "请输入活动名称", trigger: "blur" }],
        username: [
          { required: true, message: "请输入用户名称", trigger: "blur" },
        ],
        password: [{ required: true, message: "请输入密码", trigger: "blur" }],
      },
    };
  },
  computed: {},
  watch: {},
  //方法集合
  methods: {
    // 手机号是否存在
    checkphone() {
      // VerifyPhone({ phone: this.numberValidateForm.phone })
      //   .then((res) => {
      //     // 手机号是否可用
      //     this.successCode = res.code;
      //     console.log(res);
      //     // res.code==200 登录可用   ===415  不可用
      //   })
      //   .catch((err) => {});
    },
    // 用户名是否可用
    checkusername() {
      // let params = { LoginName: this.numberValidateForm.username };
      // Checkusername(params)
      //   .then((res) => {
      //     this.usernameCode = res.code;
      //     // res.code===200登录存在  ===404登录可用
      //   })
      //   .catch((err) => {});
    },
    // 用户注册
    register() {
      let params = {
        phone: this.numberValidateForm.phone,
        LoginName: this.numberValidateForm.username,
        LoginPassword: this.numberValidateForm.password,
        isPassing: "yes",
        // LoginPassword: md5(this.numberValidateForm.password),
      };

      this.userinfo.push(params);

      // Register(qs.stringify(params))
      //   .then((res) => {
      //     // if (res.data.code === 201) {
      //     //   this.$notify("注册成功");
      //     // } else {
      //     //   this.$notify({ type: "warning", message: "用户名或密码错误" });
      //     // }
      //     this.status = res.data.code;
      //     console.log(res);
      //   })
      //   .catch((err) => {});

      axios
        .post(
          `http://www.hj0819.top:44369/api/LoginPage/AddLogin`,
          qs.stringify(params)
        )
        .then((res) => {
          if (res.data.code === 201) {
            this.$notify("注册成功");
          } else if (res.data.code !== 201) {
            this.$notify({ type: "warning", message: "用户名或密码错误" });
          }
          this.status = res.data.code;

          console.log(res);
        })
        .catch((err) => {});

      this.$store.dispatch("register", this.userinfo);

      localStorage.setItem("users", JSON.stringify(this.userinfo));
    },

    sendcode() {
      VerifyPhone({ phone: this.numberValidateForm.phone })
        .then((res) => {
          // 手机号是否可用
          this.successCode = res.code;

          // res.code==200 登录可用   ===415  不可用
        })
        .catch((err) => {});

      Checkusername({ LoginName: this.numberValidateForm.username })
        .then((res) => {
          this.usernameCode = res.code;
          // res.code===200登录存在  ===404登录可用
        })
        .catch((err) => {});

      Phonecode({
        phone: this.numberValidateForm.phone,
        codeType: "0",
      })
        .then((res) => {
          console.log(res);
        })
        .catch((err) => {});

      if (this.successCode == 200 && this.usernameCode == 200) {
        this.$dialog.alert({
          message: "验证码已发送 请注意查收",
        });
      }
    },
  },
  created() {
    let users = localStorage.getItem("users");
    if (users) {
      this.userinfo = JSON.parse(users);
    }
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

.body {
  padding: 20px 60px;
  overflow: hidden;
}
.body div {
  margin-bottom: 50px;
}
</style>