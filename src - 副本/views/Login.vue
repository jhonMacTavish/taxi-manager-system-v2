<template>
  <div class="login-box">
    <h1 class="title" style="color: aliceblue">天府机场出租车运行管理系统</h1>
    <div class="login-box-modal">
      <el-form label-width="65px" :model="formData" ref="form" :rules="rules">
        <el-form-item label="用户名" prop="username">
          <el-input v-model="formData.username" placeholder="请输入用户名" @keyup.enter.native="login(form)"></el-input>
        </el-form-item>
        <el-form-item label="密码" prop="password">
          <el-input v-model="formData.password" placeholder="请输入密码" show-password
            @keyup.enter.native="login(form)"></el-input>
        </el-form-item>

        <el-form-item class="login_button">
          <el-button @click="login(form)">登录</el-button>
          <el-button @click="reset(form)"> 重置</el-button>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>

<script setup>
import { reactive, ref, getCurrentInstance } from "vue";
import router from "../router/index.js";
import { ElMessage } from "element-plus";
import axios from "axios";
const { proxy } = getCurrentInstance();
const formData = reactive({
  username: "",
  password: "",
});
//获取页面元素
const form = ref();
//重置
const reset = (formEl) => {
  if (!formEl) return;
  formEl.resetFields();
};
//提交验证
const login = async () => {
  let params = {
    username: formData.username,
    password: formData.password
  }
  console.log(params);
  await axios.post("/api/login", params).then(res => {
    let userInfo = res.data;
    console.log(userInfo);
    if (userInfo.status == "success") {
      if (userInfo.username == "admin") {
        window.sessionStorage.clear();
        localStorage.setItem("user", "admin");
      } else if (userInfo.username == "public") {
        window.sessionStorage.clear();
        localStorage.setItem("user", "auditor");
      } else if (userInfo.username == "lvfu") {
        window.sessionStorage.clear();
        localStorage.setItem("user", "user");
      } else {
      }
      router.push("/");
    } else {
      ElMessage({
        message: "用户名或密码错误",
        type: "error",
      });
    }
  });
};
//约束规则
const rules = reactive({
  username: [{ required: true, message: "必须输入用户名" }],
  password: [
    { required: true, message: "必须输入密码" },
    { min: 3, max: 10, message: "长度要在3-10之间" },
  ],
});
</script>

<style lang="less" scoped>
.login-box {
  width: 100%;
  height: 100%;
  background: url(../assets/image/login1.png);
  background-size: cover;
  padding-top: 20px;
  box-sizing: border-box;

  .title {
    font-size: 50px;
    margin-top: 100px;
    text-align: center;
  }
}

.login-box-modal {
  width: 350px;
  height: 150px;
  border: 1px solid grey;
  background: rgba(255, 255, 255, 0.8);
  border-radius: 6px;
  padding: 40px;
  position: absolute;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);

  .login_button {
    margin-top: 30px;
  }
}
</style>
