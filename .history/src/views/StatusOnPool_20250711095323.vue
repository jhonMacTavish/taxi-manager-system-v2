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
          <el-table v-loading="loadingStatus.T1Table" :data="filterTableData[0]" height="780px"
            :row-class-name="tableRowClassName">
            <el-table-column prop="POOL_IN_ORDER" label="序号" />
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
          <el-table v-loading="loadingStatus.T1Table" :data="filterTableData[1]" height="780px"
            :row-class-name="tableRowClassName">
            <el-table-column prop="POOL_IN_ORDER" label="序号" />
            <el-table-column prop="CAR_ID" label="车牌号" width="300px" />
            <el-table-column prop="POOL_IN_TIME" label="入池时间" />
            <el-table-column align="right">
              <template #default="scope">
                <el-button :disabled="scope.row.GIVE_UP_TIME || !func_no.includes('4')"
                  style="margin-right: 30px; font-size: 15px" size="small" type="warning"
                  @click="passTag(scope.row)">过号</el-button>
              </template>
            </el-table-column>
          </el-table>
        </el-card>
      </el-col>
    </el-row>
  </div>
  <el-dialog v-model="dialogVisible" :title="carID" width="500" :show-close="false">
    <span>过号</span>
    <template #footer>
      <div class="dialog-footer">
        <el-button @click="dialogVisible = false">取消</el-button>
        <el-button type="primary" @click="confirm()">
          确认
        </el-button>
      </div>
    </template>
  </el-dialog>
</template>

<script setup>
import axios from "axios";
import { ref, onMounted, computed, reactive, watch, onBeforeUnmount } from "vue";
import { Search } from "@element-plus/icons-vue";

let timer = null;

const dialogVisible = ref(false);
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

const tableRowClassName = (
  { row, rowIndex }
) => {
  if (row.TYPE) {
    return 'used-row'
  } else {
    return ''
  }
}

const passTag = (row) => {
  let param = {
    processid: row.ID,
    user: localStorage.getItem("user")
  }
  dialogVisible.value = true;
  carID.value = row.CAR_ID;
  params.value = param;
};

const confirm = async () => {
  let param = params.value;
  console.log(param);
  await axios.post("/api/set_guohao", param).then((res) => {
    init();
    if (res.data == "success") {
      ElMessage({
        message: "操作成功",
        type: "success",
      });
    } else {
      ElMessage({
        message: "操作失败",
        type: "warning",
      });
    }
  });
  dialogVisible.value = false;
};

watch(searchT1, (val) => {
  searchT1.value = val.toUpperCase();
});

watch(searchT2, (val) => {
  searchT2.value = val.toUpperCase();
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
    topnum: -1
  };
  await axios.get("/api/pool_in_order_top", { params }).then((res) => {
    console.log(res);
    poolT1Data.value = res.data.T1;
    loadingStatus.T1Table = false;
    poolT2Data.value = res.data.T2;
    loadingStatus.T2Table = false;
  });
}
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

<style>
used-row {
  --el-table-tr-bg-color: var(--el-color-success-light-9);
}
</style>
