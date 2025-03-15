<template>
  <div class="container">
    <el-row>
      <el-col :span="2"></el-col>
      <el-col :span="20">
        <el-card>
          <template #header>
            <div style="position: relative; justify-content: right">
              <el-config-provider :locale="locale">
                <el-date-picker style="width: 400px !important;" v-model="dateTime" type="datetimerange"
                  range-separator="To" start-placeholder="开始时间" end-placeholder="结束时间"
                  value-format="YYYY-MM-DD HH:mm:ss" :disabled-date="disabledDate" />
                  <el-button :icon="Search" @click="getData()"></el-button>
              </el-config-provider>
              <el-input v-model="searchCarNo" placeholder="请输入车牌">
                  <template #prepend>
                    <el-button :icon="Search" />
                  </template>
                </el-input>
            </div>
          </template>
          <div class="table-box">
            <el-table v-loading="loadingStatus.dataTable" :data="filterTableData" stripe height="708px">
              <!-- <el-table-column width="60px">
                <template #default="scope">
                  <el-button size="small" type="default" @click="audit(scope.row)">记录</el-button>
                </template>
              </el-table-column> -->
              <el-table-column prop="CAR_ID" label="车牌"/>
              <el-table-column prop="EXPIRATION_TIME" label="过期时间" />
              <el-table-column prop="PD" label="授权" />
              <el-table-column prop="TERMINAL" label="航站楼" />
              <el-table-column prop="USE_TIME" label="使用时间" />
              <el-table-column prop="NOTE" label="备注" />
            </el-table>
          </div>
          <div class="pagination-box">
            <el-pagination v-model:current-page="currentPage" :page-size="17" layout="total, prev, pager, next"
              :total="total" :hide-on-single-page="false" @current-change="handleCurrentChange" />
          </div>
        </el-card>
      </el-col>
      <el-col :span="2"></el-col>
    </el-row>
    <!-- <div v-if="showImg" class="img-wrap">
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

    <div v-show="flag" :style="bubbleStyle" class="cell-bubble" id="bubbleWrap">
      <el-card><el-text id="tagCard"></el-text></el-card>
      <div class="arrow"></div>
    </div> -->
  </div>
</template>

<script setup>
import { useRouter } from "vue-router";
import { ref, reactive, onMounted, watch, computed, onDeactivated, onActivated } from "vue";
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

let tagCard = null;
const flag = ref(false);
const clientX = ref(0);
const clientY = ref(0);
const carNo = ref("");
const dateTime = ref([]);
const tableData = ref([]);
const searchCarNo = ref('');
const filterTableData = computed(() => {
  let arr = [];
  arr = tableData.value.filter(
    (item) =>
      !searchCarNo.value || item.CAR_ID.toLowerCase().includes(searchCarNo.value.toLowerCase())
  );
  return arr;
});
const bubbleStyle = computed(() => {
  return {
    top: clientY.value - 110 + 'px',
    left: clientX.value - 200 + 'px'
  }
});
const total = ref(0);
const currentPage = ref(1);
const loadingStatus = reactive({
  dataTable: false,
});

const getData = async () => {
  let params = {
    start_num: (currentPage.value - 1) * 17 + 1,
    end_num: currentPage.value * 17,
  };

  if (carNo.value && !validateCarNo(carNo.value)) {
    return;
  } else {
    params.start = dateTime.value[0];
    params.end = dateTime.value[1];
    console.log(params);
    await axios
      .get("/api/set_pd_select_history", { params })
      .then((res) => {
        console.log(res.data);
        tableData.value = res.data.data;
        total.value = Number(res.data.total);
        console.log(res.data);
      });
  }
};

const handleCurrentChange = () => {
  getData();
};

const disabledDate = (time) => {
  return time.getTime() > new Date().getTime();
};

// const zoom = (str) => {
//   console.log(imgScale.value);
//   switch (str) {
//     case "large":
//       if (imgScale.value > 1.8) return;
//       imgScale.value = imgScale.value + 0.2;
//       break;
//     case "small":
//       if (imgScale.value < 0.4) return;
//       imgScale.value = imgScale.value - 0.2;
//       break;
//     case "default":
//       imgScale.value = 1;
//       imgDeg.value = 0;
//       break;
//     default:
//       break;
//   }
// };

// const rotate = (str) => {
//   switch (str) {
//     case "left":
//       imgDeg.value = imgDeg.value + 90;
//       console.log(imgDeg.value);
//       break;
//     case "right":
//       imgDeg.value = imgDeg.value - 90;
//       console.log(imgDeg.value);
//       break;
//     default:
//       break;
//   }
// };

// const preview = (pic) => {
//   showImg.value = true;
//   imgSrc.value = pic;
// };

// const disabledDate = (time) => {
//   return time.getTime() > new Date().getTime();
// };

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
    path: "/auditAndHistory",
    // path: "/verify",
    query: {
      judge_id: row.id,
    },
  });
};

const enter = (event, row) => {
  if (row.judged != -1) return
  clientX.value = event.clientX;
  clientY.value = event.clientY;
  tagCard.innerHTML = row.note;
  flag.value = true;
};

const leave = (event) => {
  flag.value = false;
};

watch(searchCarNo, (val) => {
  searchCarNo.value = val.toUpperCase();
});

onMounted(() => {
  tagCard = document.getElementById("tagCard");
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

      .el-input {
        position: absolute;
        right: 0;
        width: 140px;
        height: 30px;
        z-index: 999;
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

        .tb-cell-tag:hover {
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


  .cell-bubble {
    position: absolute;
    z-index: 9999;

    .el-card {
      width: 160px;
    }

    .arrow {
      position: relative;
      left: -5px;
      top: -30px;
      transform: rotateZ(45deg);
      background-color: white;
      width: 10px;
      height: 10px;
      border-bottom: 1px solid rgba(0, 0, 0, 0.1);
      border-left: 1px solid rgba(0, 0, 0, 0.1);
    }
  }

  .date-picker{
    width: 200px !important;
  }
}
</style>
