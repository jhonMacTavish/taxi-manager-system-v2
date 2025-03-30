<template>
  <div class="container">
    <el-row>
      <el-col :span="3"></el-col>
      <el-col :span="18">
        <el-card>
          <template #header>
            <div style="display: flex; ">
              <el-switch v-model="history" active-text="已审核" inactive-text="待审核" />
              <el-config-provider :locale="locale">
                <el-date-picker style="margin: 0; width: 360px" v-model="dateTime" type="datetimerange"
                  range-separator="To" start-placeholder="开始时间" end-placeholder="结束时间"
                  value-format="YYYY-MM-DDTHH:mm:ss" :disabled-date="disabledDate" :default-time="defaultTime" />
                <el-button @click="getData()">
                  <el-icon>
                    <Search />
                  </el-icon>
                </el-button>
              </el-config-provider>
            </div>
          </template>
          <div class="table-box">
            <el-table v-loading="loadingStatus.tableData" :data="tableData"
              :default-sort="{ prop: 'NUM', order: 'descending' }" stripe height="742px">
              <el-table-column prop="carId" label="车牌" />
              <el-table-column prop="terminalOutTime" label="离开航站楼时间" />
              <el-table-column prop="pdInTime" label="进入蓄车场时间" />
            </el-table>
          </div>
          <!-- <div class="pagination-box">
            <el-pagination v-model:current-page="currentPage" :page-size="10" layout="total, prev, pager, next"
              :total="total" :hide-on-single-page="false" @current-change="handleCurrentChange" />
          </div> -->
        </el-card>
      </el-col>
      <el-col :span="3"></el-col>
    </el-row>
    <div v-if="showImg" class="img-wrap">
      <el-button class="close" @click="showImg = false">
        <el-icon>
          <Close />
        </el-icon>
      </el-button>
      <img :style="`transform: scale(${imgScale}) rotate(${imgDeg}deg);
        transition: transform 0.3s ease 0s;`" ref="Img" :src="imgSrc" alt="图片损坏" />
      <div class="option-wrap">
        <el-icon @click="zoom('large')">
          <ZoomIn />
        </el-icon>
        <el-icon @click="zoom('small')">
          <ZoomOut />
        </el-icon>
        <el-icon @click="zoom('default')">
          <ScaleToOriginal />
        </el-icon>
        <el-icon @click="rotate('left')">
          <RefreshRight />
        </el-icon>
        <el-icon @click="rotate('right')">
          <RefreshLeft />
        </el-icon>
      </div>
    </div>
  </div>
</template>

<script setup>
import { useRouter } from "vue-router";
import { ref, reactive, onMounted, watch, onDeactivated, onActivated } from "vue";
import axios from "axios";
import dayjs from "dayjs";
import zhCn from "element-plus/es/locale/lang/zh-cn";
import {
  Close,
  Search,
  ZoomIn,
  ZoomOut,
  ScaleToOriginal,
  RefreshRight,
  RefreshLeft,
} from "@element-plus/icons-vue";
import validateCarNo from "../util/tools.js";

const router = useRouter();
const locale = zhCn;

const imgScale = ref(1);
const imgDeg = ref(0);
const Img = ref();
const history = ref(true);
const carNo = ref("");
const dateTime = ref([]);
const defaultTime = [new Date(2000, 1, 1, 0, 0, 0), new Date(2000, 1, 1, 23, 59, 59)];
const tableData = ref([]);
const filterTabData = ref([]);
const total = ref(0);
const currentPage = ref(1);
const loadingStatus = reactive({
  tableData: false,
});
const imgSrc = ref("");
const showImg = ref(false);

const getData = async () => {
  loadingStatus.tableData = true;
  const params = {
    startDate: dateTime.value[0],
    endDate: dateTime.value[1],
  };
  console.log(params);
  await axios.get("/door/getTimeOutReturnByRange", { params }).then((res) => {
    loadingStatus.tableData = false;
    console.log(res.data);

    tableData.value = res.data.data;
  });
};

const handleCurrentChange = () => {
  if (history.value) {
    getData();
  } else {
  }
};

const disabledDate = (time) => {
  return time.getTime() > new Date().getTime();
};

const init = async () => {
  dateTime.value[0] = dayjs()
    .startOf('date')
    .add(-2, "day")
    .format("YYYY-MM-DDTHH:mm:ss");
  dateTime.value[1] = dayjs()
    .endOf('date')
    .format("YYYY-MM-DDTHH:mm:ss");
  await getData();
};

onMounted(() => {
  init();
});
</script>

<style lang="less" scoped>
.container {
  height: 100%;
  position: relative;

  .el-col {
    height: 100%;

    .el-card {
      height: 100%;
      width: 100%;

      .button-box {
        margin-right: 10px;
      }

      .table-box {
        position: relative;
        bottom: -4px;
        border: 1px solid rgba(0, 0, 0, 0.1);

        img {
          width: 30px;
          height: 43px;
          background-size: cover;
        }

        img:hover {
          cursor: pointer;
        }
      }

      .pagination-box {
        position: relative;
        height: 40px;

        .el-pagination {
          position: absolute;
          top: 10px;
          right: 0px;
        }
      }
    }
  }

  .img-wrap {
    width: 100%;
    height: 100%;
    background-color: rgba(0, 0, 0, 0.5);
    position: absolute;
    top: 0;
    display: flex;
    align-items: center;
    justify-content: center;
    user-select: none;
    overflow: hidden;
    z-index: 9999;

    .close {
      position: absolute;
      top: 20px;
      right: 20px;
      width: 40px;
      height: 40px;
      color: white;
      font-size: 20px;
      border-radius: 50%;
      border: 0px;
      background-color: rgba(0, 0, 0, 0.2);
    }

    img {
      position: absolute;
      transform: translateX(-400 * 2 * 10%) translateY(-50%);
      background-size: cover;
      color: white;
      height: 400px;
      width: 600px;
    }

    .option-wrap {
      display: flex;
      justify-content: space-between;
      padding: 0 25px;
      width: 20%;
      height: 50px;
      position: absolute;
      left: 50%;
      bottom: 30px;
      transform: translateX(-50%);
      border-radius: 25px;
      background-color: rgba(0, 0, 0, 0.2);
      z-index: 9999;
      font-size: 25px;

      .el-icon {
        position: relative;
        top: 12px;
        color: rgba(255, 255, 255, 0.7);
      }

      .el-icon:hover {
        cursor: pointer;
      }
    }
  }
}
</style>
