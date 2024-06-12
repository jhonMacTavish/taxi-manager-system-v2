<template>
  <div class="container">
    <el-row :gutter="20">
      <el-col :span="12">
        <el-card>
          <el-text type="info" size="large">
            T1蓄车场:
            <el-text type="warning" size="large">
              {{ filterTableData[0].length }}</el-text>
            辆
          </el-text>
          <el-input v-model="searchT1" size="small" placeholder="请输入车牌">
            <template #prepend>
              <el-button :icon="Search" />
            </template>
          </el-input>
          <el-table v-loading="loadingStatus.T1Table" :data="filterTableData[0]" stripe height="780px">
            <el-table-column prop="CAR_ID" label="车牌号" width="300px" />
            <el-table-column prop="POOL_IN_TIME" label="入池时间" />
          </el-table>
        </el-card>
      </el-col>
      <el-col :span="12">
        <el-card>
          <el-text type="info" size="large">
            T2蓄车场:
            <el-text type="warning" size="large">
              {{ filterTableData[1].length }}</el-text>
            辆
          </el-text>
          <el-input v-model="searchT2" size="small" placeholder="请输入车牌">
            <template #prepend>
              <el-button :icon="Search" />
            </template>
          </el-input>
          <el-table v-loading="loadingStatus.T1Table" :data="filterTableData[1]" stripe height="780px">
            <el-table-column prop="CAR_ID" label="车牌号" width="300px" />
            <el-table-column prop="POOL_IN_TIME" label="入池时间" />
          </el-table>
        </el-card>
      </el-col>
    </el-row>
  </div>
</template>

<script setup>
import axios from "axios";
import { ref, onMounted, computed, reactive, onBeforeUnmount } from "vue";
import { Search } from "@element-plus/icons-vue";

let timer = null;

const poolT1Data = ref([]);
const poolT2Data = ref([]);
const searchT1 = ref("");
const searchT2 = ref("");
const filterTableData = computed(() => {
  let arr = [];
  arr[0] = poolT1Data.value.filter(
    (item) =>
      !searchT1.value ||
      item.CAR_ID.toLowerCase().includes(searchT1.value.toLowerCase())
  );
  arr[1] = poolT2Data.value.filter(
    (item) =>
      !searchT2.value ||
      item.CAR_ID.toLowerCase().includes(searchT2.value.toLowerCase())
  );
  return arr;
});
const loadingStatus = reactive({
  T1Table: true,
  T2Table: true,
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
    location: "pool",
    terminal: "T1",
    type: "",
    line: "",
  };
  await axios.get("/api/get_taxi_list", { params }).then((res) => {
    console.log(res.data);
    loadingStatus.T1Table = false;
    poolT1Data.value = res.data;
  });

  params.terminal = "T2";
  await axios.get("/api/get_taxi_list", { params }).then((res) => {
    poolT2Data.value = res.data;
    loadingStatus.T2Table = false;
    console.log(poolT2Data.value);
  });
};
</script>

<style lang="less" scoped>
.container {
  width: 100%;
  height: 100%;

  .el-row {
    height: 100%;

    .el-card {
      position: relative;
      height: 100%;
      text-align: center;

      .el-input {
        position: absolute;
        width: 160px;
        height: 26px;
        top: 61px;
        right: 30px;
        z-index: 999;
      }

      .el-table {
        border: 1px solid rgba(0, 0, 0, 0.1);
        margin-top: 10px;
        position: relative;
        bottom: -3px;
      }
    }
  }
}
</style>
