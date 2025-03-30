<template>
  <div style="height: 100vh;">
    <el-container style="height: 100%">
      <el-header>
        <div class="headerLogo"></div>
        <div class="logout-wrap" @click="showLogout = !showLogout">
          <el-icon style="position: relative; top: 3px;" size="24">
            <Avatar />
          </el-icon>
          <text style="font-size: 20px;"> {{ username }}</text>
        </div>
        <div :style="`opacity: ${showLogout ? '1' : '0'}; z-index: ${showLogout ? '9' : '-1'}`" class="button-box"
          @mouseleave="mouseLeave()" @mouseenter="mouseEnter()">
          <el-text class="logoutBtn" @click="logout()">注销</el-text>
          <el-text class="logoutBtn" @click="reset()">重置</el-text>
          <div class="arrow"></div>
        </div>
        <!-- <el-popover class="logout-wrap" placement="top-start" title="Title" :width="200" trigger="hover"
          content="this is content, this is content, this is content">
          <template #reference>
            <el-button class="m-2">Hover to activate</el-button>
          </template>
</el-popover> -->
      </el-header>
      <el-container>
        <el-aside width="200px" style="border-right: solid 1 px rgba(0, 0, 0, 0.1)">
          <el-menu :default-active="$route.path" router :unique-opened="true" style="height: 100%">

            <el-menu-item index="/dashboard">
              <el-icon>
                <Odometer />
              </el-icon>
              <span>动态数据</span>
            </el-menu-item>

            <el-menu-item index="/monitor">
              <el-icon>
                <Monitor />
              </el-icon>
              <span>实时监控</span>
            </el-menu-item>
            <el-menu-item index="/lvfuMonitor">
              <el-icon>
                <SetUp />
              </el-icon>
              <span>车辆放行</span>
            </el-menu-item>

            <el-sub-menu index="1">
              <template #title>
                <el-icon>
                  <Guide />
                </el-icon>
                <span>车辆状态</span>
              </template>
              <el-menu-item index="/eligibility">
                <span>资格池</span>
              </el-menu-item>
              <el-menu-item index="/statusOnPool">
                <span>蓄车场</span>
              </el-menu-item>
              <el-menu-item index="/statusOnTerminal">
                <span>航站楼</span>
              </el-menu-item>
              <el-menu-item index="/statusOnWay">
                <span>路途中</span>
              </el-menu-item>
            </el-sub-menu>
            <el-sub-menu index="2">
              <template #title>
                <el-icon>
                  <ZoomIn />
                </el-icon>
                <span>申诉核查</span>
              </template>
              <el-menu-item index="/audit">
                <span>申诉审核</span>
              </el-menu-item><el-menu-item index="/auditHistory">
                <span>申诉历史</span>
              </el-menu-item>
              <el-menu-item index="/verify">
                <span>申诉核查</span>
              </el-menu-item>
              <!-- <el-menu-item index="/auditAndHistory">
                <span>审核&回查</span>
              </el-menu-item> -->
              <el-menu-item index="/showpath">
                <span>路径查询</span>
              </el-menu-item>
            </el-sub-menu>
            <el-sub-menu index="3">
              <template #title><el-icon>
                  <Notebook />
                </el-icon>
                <span>车辆历史</span>
              </template>
              <el-menu-item index="/visitHistory">
                <span>来访历史</span>
              </el-menu-item>
              <el-menu-item index="/eligibtHistory">
                <span>资格历史</span>
              </el-menu-item>
            </el-sub-menu>
            <el-sub-menu index="4">
              <template #title>
                <el-icon>
                  <Histogram />
                </el-icon>
                <span>数据统计</span>
              </template>
              <el-menu-item index="/alerts">
                <span>告警监视</span>
              </el-menu-item>
              <el-menu-item index="/statistics">
                <span>车辆统计</span>
              </el-menu-item>
              <el-menu-item index="/offsets">
                <span>补偿次数统计</span>
              </el-menu-item>
              <el-menu-item index="/offsetsStatistics">
                <span>授权详情统计</span>
              </el-menu-item>
              <el-menu-item index="/distance">
                <span>25km统计</span>
              </el-menu-item>
              <el-menu-item index="/statisticsByYear">
                <span>按年统计</span>
              </el-menu-item>
              <el-menu-item index="/statisticsByMonth">
                <span>按月统计</span>
              </el-menu-item>
              <el-menu-item index="/statisticsByDay">
                <span>按日统计</span>
              </el-menu-item>
            </el-sub-menu>

            <el-menu-item index="/blackList">
              <el-icon>
                <DocumentRemove />
              </el-icon>
              <span>控制名单</span>
            </el-menu-item>
            <el-menu-item index="/parameter">
              <el-icon>
                <Setting />
              </el-icon>
              <span>参数设置</span>
            </el-menu-item>
          </el-menu>
        </el-aside>
        <el-main class="main-box">
          <router-view />
          <div v-if="showReset" class="reset-wrap">
            <div class="reset-box">
              <div class="reset-content">
                <el-row :gutter="20">
                  <el-col class="title" :span="6">旧密码：</el-col>
                  <el-col :span="18"><el-input v-model="account.old_pwd" placeholder="请输入旧密码" /></el-col>
                </el-row>
                <el-row :gutter="20">
                  <el-col class="title" :span="6">新密码：</el-col>
                  <el-col :span="18"><el-input v-model="account.new_pwd" placeholder="请输入新密码" /></el-col>
                </el-row>
                <el-row :gutter="20">
                  <el-col class="title" :span="6">确认密码：</el-col>
                  <el-col :span="18"><el-input v-model="account.confirm_pwd" placeholder="请输入新密码" /></el-col>
                </el-row>
              </div>
              <div class="reset-button">
                <el-button @click="cancel()">取消</el-button>
                <el-button type="primary" @click="confirm()">确认</el-button>
              </div>
            </div>
          </div>
        </el-main>
      </el-container>
    </el-container>

  </div>
</template>

<script setup>
import router from "../router/index.js";
import {
  Odometer,
  Guide,
  Monitor,
  Notebook,
  Histogram,
  ZoomIn,
  SetUp,
  Avatar,
  DocumentRemove,
  Setting
} from "@element-plus/icons-vue";
import axios from "axios";
import { ref, onMounted, reactive } from "vue";


const username = ref("");
const showLogout = ref(false);
const showReset = ref(false);
const account = reactive({
  username: localStorage.getItem("user"),
  old_pwd: "",
  new_pwd: "",
  confirm_pwd: ""
});
let timer = null;

onMounted(() => {
  username.value = localStorage.getItem("user");
});

const mouseLeave = () => {
  timer = setTimeout(() => {
    showLogout.value = !showLogout.value;
  }, 300);
};

const mouseEnter = () => {
  clearTimeout(timer);
  showLogout.value = true;
};

const logout = () => {
  showReset.value = true;
  localStorage.clear();
  router.push("/login");
};

const reset = () => {
  showReset.value = true;
};

const confirm = async () => {
  let params = {
    username: account.username,
    old_pwd: account.old_pwd,
    new_pwd: account.new_pwd
  };

  console.log(account.new_pwd.length >= 3 && account.new_pwd.length <= 10);
  await axios.post("/api/set_pwd", params).then(res => {
    console.log(res);
    if (account.new_pwd != account.confirm_pwd) {
      ElMessage({
        message: "新密码不一致",
        type: "warning",
      });
    } else if (res.data.status == "error") {
      ElMessage({
        message: "密码输入错误",
        type: "warning",
      });
    } else if (!account.new_pwd) {
      ElMessage({
        message: "新密码不能为空",
        type: "warning",
      });
    } else if (account.new_pwd.length <= 3 || account.new_pwd.length >= 10) {
      ElMessage({
        message: "密码长度要在3-10之间",
        type: "warning",
      });
    } else {
      ElMessage({
        message: "密码修改成功",
        type: "success",
      });
      showReset.value = false;
      account.old_pwd = "";
      account.new_pwd = "";
      account.confirm_pwd = "";
    }
  });
};

const cancel = async () => {
  showReset.value = false;
  account.old_pwd = "";
  account.new_pwd = "";
  account.confirm_pwd = "";
  // console.log
}

</script>

<style lang="less" scoped>
.el-header {
  position: relative;
  margin: 0;
  padding: 0;
  background-color: rgb(60, 179, 113);

  .headerLogo {
    margin-left: 30px;
    height: 100%;
    width: 300px;
    background: url("../assets/logo.png");
    background-position: center 100%;
    background-size: cover;
    background-repeat: no-repeat;
  }

  .logout-button {
    position: absolute;
    margin-right: 20px;
    top: 15px;
    right: 0;
    height: 30px;
    width: 60px;
    z-index: 999;

    .el-icon {
      margin-right: 2px;
    }
  }

  .logout-wrap {
    position: absolute;
    margin-right: 20px;
    top: 16px;
    right: 0px;
  }

  .logout-wrap:hover {
    cursor: pointer
  }

  .button-box {
    position: absolute;
    height: 46px;
    padding: 6px;
    border-radius: 3px;
    background-color: rgba(255, 255, 255, 1);
    border: 1px solid rgba(0, 0, 0, 0.1);
    box-shadow: 2px 2px 3px rgba(0, 0, 0, 0.2);
    display: flex;
    flex-direction: column;
    justify-content: space-around;
    top: 50px;
    right: 50px;
    z-index: 9;
    transition: all 0.3s ease-out;

    .logoutBtn {
      display: inline-block;
    }

    .logoutBtn:hover {
      cursor: pointer;
      color: #0099FF;
    }
  }

  .arrow {
    display: inline-block;
    position: absolute;
    background-color: white;
    width: 10px;
    height: 10px;
    right: 6px;
    top: -4px;
    transform: rotateZ(45deg);
  }
}

.el-menu {
  .el-icon {
    font-size: 1em;
  }

  span {
    font-size: 15px;
  }
}

.main-box {
  max-height: 100%;
  position: relative;

  height: 100%;
  position: relative;

  .reset-wrap {
    position: absolute;
    display: flex;
    justify-content: center;
    align-items: center;
    height: 100%;
    width: 100%;
    top: 0;
    background-color: rgba(0, 0, 0, 0.5);
    z-index: 10;

    .reset-box {
      padding: 20px;
      position: absolute;
      width: 25%;
      border-radius: 4px;
      background-color: white;

      .reset-content {
        margin-top: 20px;
        display: flex;
        height: 160px;
        flex-direction: column;
        justify-content: space-between;

        .el-row {
          height: 30px;

          .title {
            position: relative;
            text-align: right;
            top: 2px;
          }

          .el-input {
            height: 30px
          }
        }
      }

      .reset-button {
        display: flex;
        margin-top: 20px;
        justify-content: center;
        width: 100%;
      }
    }
  }
}
</style>
