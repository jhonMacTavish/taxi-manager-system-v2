<template>
  <div class="container">
    <el-row :gutter="20">
      <el-col :span="6">
        <el-card>
          <el-text type="info" size="large">
            T1长途:
            <el-text type="warning" size="large"> {{ T1Long.length }}</el-text>
            辆
          </el-text>
          <div class="table-box">
            <el-input v-model="searchT1Long" size="small" placeholder="请输入车牌">
              <template #prepend>
                <el-button :icon="Search" />
              </template>
            </el-input>
            <el-table v-loading="loadingStatus.T1LongTable" :data="filterTableData[0]" stripe height="780px">
              <el-table-column prop="CAR_ID" label="车牌号" width="110px" />
              <el-table-column prop="POOL_OUT_TIME" label="入池时间"  />
            </el-table>
          </div>
        </el-card>
      </el-col>
      <el-col :span="6">
        <el-card>
          <el-text type="info" size="large">
            T1补偿:
            <el-text type="warning" size="large"> {{ T1Short.length }}</el-text>
            辆
          </el-text>
          <div class="table-box">
            <el-input v-model="searchT1Short" size="small" placeholder="请输入车牌">
              <template #prepend>
                <el-button :icon="Search" />
              </template>
            </el-input>
            <el-table v-loading="loadingStatus.T1ShortTable" :data="filterTableData[1]" stripe height="780px">
              <el-table-column prop="CAR_ID" label="车牌号" width="110px" />
              <el-table-column prop="POOL_OUT_TIME" label="入池时间"  />
            </el-table>
          </div>
        </el-card>
      </el-col>
      <el-col :span="6">
        <el-card>
          <el-text type="info" size="large">
            T2长途:
            <el-text type="warning" size="large"> {{ T2Long.length }}</el-text>
            辆
          </el-text>
          <div class="table-box">
            <el-input v-model="searchT2Long" size="small" placeholder="请输入车牌">
              <template #prepend>
                <el-button :icon="Search" />
              </template>
            </el-input>
            <el-table v-loading="loadingStatus.T2LongTable" :data="filterTableData[2]" stripe height="780px">
              <el-table-column prop="CAR_ID" label="车牌号" width="110px" />
              <el-table-column prop="POOL_OUT_TIME" label="入池时间"  />
            </el-table>
          </div>
        </el-card>
      </el-col>
      <el-col :span="6">
        <el-card>
          <el-text type="info" size="large">
            T2补偿:
            <el-text type="warning" size="large"> {{ T2Short.length }}</el-text>
            辆
          </el-text>
          <div class="table-box"><el-input v-model="searchT2Short" size="small" placeholder="请输入车牌">
              <template #prepend>
                <el-button :icon="Search" />
              </template>
            </el-input>
            <el-table v-loading="loadingStatus.T2ShortTable" :data="filterTableData[3]" stripe height="780px">
              <el-table-column prop="CAR_ID" label="车牌号" width="110px" />
              <el-table-column prop="POOL_OUT_TIME" label="入池时间"  />
            </el-table>
          </div>
        </el-card>
      </el-col>
    </el-row>
  </div>
</template>

<script setup>
import axios from "axios";
import { ref, onMounted, computed, reactive, watch, onBeforeUnmount } from "vue";
import { Search } from "@element-plus/icons-vue";

let timer = null;

const T1Long = ref([]);
const T1Short = ref([]);
const T2Long = ref([]);
const T2Short = ref([]);
const searchT1Long = ref("");
const searchT1Short = ref("");
const searchT2Long = ref("");
const searchT2Short = ref("");
const filterTableData = computed(() => {
  let arr = [];
  arr[0] = T1Long.value.filter(
    (item) =>
      !searchT1Long.value ||
      item.CAR_ID.toLowerCase().includes(searchT1Long.value.toLowerCase())
  );
  arr[1] = T1Short.value.filter(
    (item) =>
      !searchT1Short.value ||
      item.CAR_ID.toLowerCase().includes(searchT1Short.value.toLowerCase())
  );
  arr[2] = T2Long.value.filter(
    (item) =>
      !searchT2Long.value ||
      item.CAR_ID.toLowerCase().includes(searchT2Long.value.toLowerCase())
  );
  arr[3] = T2Short.value.filter(
    (item) =>
      !searchT2Short.value ||
      item.CAR_ID.toLowerCase().includes(searchT2Short.value.toLowerCase())
  );
  return arr;
});
const loadingStatus = reactive({
  T1LongTable: true,
  T1ShortTable: true,
  T2LongTable: true,
  T2ShortTable: true,
});

watch(searchT1Long, (val) => {
  searchT1Long.value = val.toUpperCase();
});

watch(searchT2Long, (val) => {
  searchT2Long.value = val.toUpperCase();
});

watch(searchT1Short, (val) => {
  searchT1Short.value = val.toUpperCase();
});

watch(searchT2Short, (val) => {
  searchT2Short.value = val.toUpperCase();
});

onMounted(() => {
  init();
  timer = setInterval(function () {
    init();
    console.log(timer);
  }, 10000);
});

onBeforeUnmount(() => {
  clearInterval(timer);
});

async function init() {
  let params = {
    location: "way",
    terminal: "T1",
    type: "long",
    line: "",
  };
  await axios.get("/api/get_taxi_list", { params }).then((res) => {
    T1Long.value = res.data;
    loadingStatus.T1LongTable = false;
  });

  params.type = "pd";
  await axios.get("/api/get_taxi_list", { params }).then((res) => {
    T1Short.value = res.data;
    loadingStatus.T1ShortTable = false;
  });

  params.terminal = "T2";
  params.type = "long";
  await axios.get("/api/get_taxi_list", { params }).then((res) => {
    T2Long.value = res.data;
    loadingStatus.T2LongTable = false;
  });

  params.type = "pd";
  await axios.get("/api/get_taxi_list", { params }).then((res) => {
    T2Short.value = res.data;
    loadingStatus.T2ShortTable = false;
  });
};
</script>

<style lang="less" scoped>
.container {
  height: 100%;

  .el-row {
    height: 100%;

    .el-card {
      text-align: center;
      height: 100%;

      .table-box {
        position: relative;
        margin-top: 10px;
        height: 100%;
        bottom: -3px;

        .el-input {
          position: absolute;
          width: 120px;
          height: 26px;
          top: 7px;
          right: 10px;
          z-index: 999;
        }

        .el-table {
          border: 1px solid rgba(0, 0, 0, 0.1);
        }
      }
    }
  }
}
</style>
