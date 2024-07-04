<template>
  <div class="container">
    <el-row>
      <el-col :span="2"></el-col>
      <el-col :span="20">
        <el-card>
          <template #header>
            <div style="display: flex; justify-content: right">
              <!-- <el-switch v-model="history" active-text="已审核" inactive-text="待审核" /> -->
              <el-config-provider :locale="locale">
                <el-input v-model="searchCarNo" placeholder="请输入车牌">
                  <template #prepend>
                    <el-button :icon="Search" />
                  </template>
                </el-input>
              </el-config-provider>
            </div>
          </template>
          <div class="table-box">
            <el-table v-loading="loadingStatus.dataTable" :data="filterTableData" stripe height="708px">
              <el-table-column width="60px">
                <template #default="scope">
                  <el-button size="small" type="default" @click="audit(scope.row)">记录</el-button>
                </template>
              </el-table-column>
              <el-table-column prop="carid" label="车牌" width="110px" />
              <el-table-column prop="name" label="姓名" />
              <el-table-column prop="phone" label="电话" width="130px" />
              <el-table-column prop="createtime" label="申报时间" width="180px" />
              <el-table-column prop="terminal_out_time" label="离开航站楼时间" :width="!history ? '380px' : '180px'" />
              <el-table-column prop="time_get_on" label="压表时间" width="180px" />
              <el-table-column v-if="history" prop="run_odometer" label="里程/km" width="90px" />
              <el-table-column v-if="history" prop="judge_user" label="审核人" width="80px" />
              <el-table-column v-if="history" prop="judge_time" label="审核时间" width="180px" />
              <el-table-column style="position: relative;" :label="history ? '审核结果' : ''" width="80px">
                <template #default="scope">
                  <el-text @mouseenter="enter($event, scope.row)" @mouseleave="leave"
                    :class="scope.row.judged != 1 ? 'tb-cell-tag' : ''" v-show="history"
                    :type="scope.row.judged == 1 ? 'success' : 'warning'">{{ scope.row.judged ==
        1 ? '通过' : '驳回' }}</el-text>
                </template>
              </el-table-column>
              <!-- <el-table-column label="票据" width="80px">
                <template #default="scope">
                  <img :src="scope.row.pic" alt="" @click="preview(scope.row.pic)" />
                </template>
              </el-table-column> -->
            </el-table>
          </div>
          <div class="pagination-box">
            <el-pagination v-model:current-page="currentPage" :page-size="16" layout="total, prev, pager, next"
              :total="total" :hide-on-single-page="false" @current-change="handleCurrentChange" />
          </div>
        </el-card>
      </el-col>
      <el-col :span="2"></el-col>
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

    <div v-show="flag":style="bubbleStyle" class="cell-bubble" id="bubbleWrap">
      <el-card><el-text id="tagCard"></el-text></el-card>
      <div class="arrow"></div>
    </div>
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
const imgScale = ref(1);
const imgDeg = ref(0);
const Img = ref();
const history = ref(true);
const carNo = ref("");
const dateTime = ref([]);
const tableData = ref([]);
const searchCarNo = ref('');
const filterTableData = computed(() => {
  let arr = [];
  arr = tableData.value.filter(
    (item) =>
      !searchCarNo.value || item.carid.toLowerCase().includes(searchCarNo.value.toLowerCase())
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
const imgSrc = ref("");
const showImg = ref(false);

const getData = async () => {
  let params = {
    start_num: (currentPage.value - 1) * 16 + 1,
    end_num: currentPage.value * 16,
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
      judge_id: row.id,
    },
  });
};

const enter = (event, row) => {
  if(row.judged != -1) return
  clientX.value = event.clientX;
  clientY.value = event.clientY;
  tagCard.innerHTML = row.note;
  flag.value = true;
};

const leave = (event) => {
  flag.value = false;
};

watch(history, (history) => {
  getData();
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
        // position: absolute;
        width: 140px;
        height: 26px;
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
}
</style>
