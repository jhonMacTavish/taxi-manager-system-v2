<template>
  <div class="container">
    <el-row>
      <el-col :span="3"></el-col>
      <el-col :span="18">
        <el-card>
          <template #header>
            <div style="display: flex; justify-content: right">
              <!-- <el-switch v-model="history" active-text="已审核" inactive-text="待审核" /> -->
              <el-config-provider :locale="locale">
                <el-input :disabled="true" v-model="carNo" placeholder="请输入车牌" class="input-with-select"
                  style="width: 500px">
                  <template #prepend>
                    <el-date-picker :disabled="true" style="margin: 0 -20px 0 -20px; width: 360px" v-model="dateTime" type="daterange"
                      range-separator="To" start-placeholder="开始时间" end-placeholder="结束时间"
                      value-format="YYYY-MM-DD HH:mm:ss" :disabled-date="disabledDate" />
                  </template>
                </el-input>
                <el-button :disabled="true" @click="getData()"><el-icon>
                    <Search />
                  </el-icon></el-button>
              </el-config-provider>
            </div>
          </template>
          <div class="table-box">
            <el-table v-loading="loadingStatus.dataTable" :data="tableData" stripe height="702px">
              <el-table-column width="60px">
                <template #default="scope">
                  <el-button size="small" type="default" @click="audit(scope.row)">审核</el-button>
                </template>
              </el-table-column>
              <el-table-column prop="carid" label="车牌" width="100px" />
              <el-table-column prop="name" label="姓名" width="80px" />
              <el-table-column prop="phone" label="电话" width="120px" />
              <el-table-column prop="terminal_out_time" label="离开航站楼时间" :width="!history ? '380px' : '170px'" />
              <el-table-column prop="time_get_on" :label="history ? '压表时间' : '申诉时间'" />
              <el-table-column v-if="history" prop="run_odometer" label="里程/km" width="90px" />
              <el-table-column v-if="history" prop="judge_user" label="审核人" width="80px" />
              <el-table-column v-if="history" prop="judge_time" label="审核时间" width="170px" />
              <el-table-column :label="history ? '审核结果' : ''" width="80px">
                <template #default="scope">
                  <el-text v-show="history" :type="scope.row.judged == 1 ? 'success' : 'warning'">{{ scope.row.judged ==
        1 ? '通过' : '驳回' }}</el-text>
                </template>
              </el-table-column>
              <el-table-column label="票据" width="80px">
                <template #default="scope">
                  <img :src="scope.row.pic" alt="" @click="preview(scope.row.pic)" />
                </template>
              </el-table-column>
            </el-table>
          </div>
          <div class="pagination-box">
            <el-pagination v-model:current-page="currentPage" :page-size="10" layout="total, prev, pager, next"
              :total="total" :hide-on-single-page="false" @current-change="handleCurrentChange" />
          </div>
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
const tableData = ref([]);
const filterTabData = ref([]);
const total = ref(0);
const currentPage = ref(1);
const loadingStatus = reactive({
  dataTable: false,
});
const imgSrc = ref("");
const showImg = ref(false);

const getData = async () => {
  let params = {
    start_num: (currentPage.value - 1) * 10 + 1,
    end_num: currentPage.value * 10,
  };

  if (history.value) {
    if (carNo.value && !validateCarNo(carNo.value)) {
      return;
    } else {
      params.start = dateTime.value[0];
      params.end = dateTime.value[1];
      console.log(params);
      await axios
        .get("/api/pd_judge_select_history", { params })
        .then((res) => {
          console.log(res.data);
          tableData.value = res.data.data;
          total.value = Number(res.data.total);
          console.log(res.data);
        });
    }
  } else {
    await axios.get("/api/pd_judge_select", { params }).then((res) => {
      tableData.value = res.data.data;
      total.value = Number(res.data.total);
    });
  }
};

const handleCurrentChange = () => {
  if (history.value) {
    getData();
  } else {
  }
};

const zoom = (str) => {
  console.log(imgScale.value);
  switch (str) {
    case "large":
      if (imgScale.value > 1.8) return;
      imgScale.value = imgScale.value + 0.2;
      break;
    case "small":
      if (imgScale.value < 0.4) return;
      imgScale.value = imgScale.value - 0.2;
      break;
    case "default":
      imgScale.value = 1;
      imgDeg.value = 0;
      break;
    default:
      break;
  }
};

const rotate = (str) => {
  switch (str) {
    case "left":
      imgDeg.value = imgDeg.value + 90;
      console.log(imgDeg.value);
      break;
    case "right":
      imgDeg.value = imgDeg.value - 90;
      console.log(imgDeg.value);
      break;
    default:
      break;
  }
};

const preview = (pic) => {
  showImg.value = true;
  imgSrc.value = pic;
};

const disabledDate = (time) => {
  return time.getTime() > new Date().getTime();
};

const init = async () => {
  dateTime.value[0] = dayjs()
    .add(-30, "day")
    .startOf("date")
    .format("YYYY-MM-DD HH:mm:ss");
  dateTime.value[1] = dayjs()
    .add(1, "day")
    .startOf("date")
    .format("YYYY-MM-DD HH:mm:ss");
  await getData();
};

const audit = async (row) => {
  router.push({
    path: "/verify",
    query: {
      processid: row.processid,
      imgSrc: row.pic
    },
  });
};

watch(history, (history) => {
  getData();
});

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
