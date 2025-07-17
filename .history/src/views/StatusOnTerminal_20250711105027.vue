<template>
  <div class="container">
    <el-row :gutter="20">
      <el-col :span="8">
        <el-card>
          <div class="table-box">
            <div>
              <el-text type="info" size="large">
                T1长途1:
                <el-text type="warning" size="large" style="position: relative; top: 0px">
                  {{ T1Long1.length }}</el-text>
                辆
              </el-text>
              <el-input v-model="searchT1Long1" size="small" placeholder="请输入车牌">
                <template #prepend>
                  <el-button :icon="Search" />
                </template>
              </el-input>
              <el-table v-loading="loadingStatus.T1Long1Table" :data="filterTableData[0]" height="360px" :row-class-name="tableRowClassName">
                <el-table-column prop="CAR_ID" label="车牌号" width="130px" />
                <el-table-column prop="TERMINAL_IN_TIME" label="入池时间" />
                <el-table-column align="right">
                  <template #default="scope">
                    <el-button :disabled="!!scope.row.GIVE_UP_TIME || !func_no.includes('4')" style="margin-right: 30px; font-size: 15px" size="small" type="warning"
                      @click="remove(scope.row)">空车驶离</el-button>
                  </template>
                </el-table-column>
              </el-table>
            </div>
            <div>
              <el-text type="info" size="large">
                T2长途1:
                <el-text type="warning" size="large">
                  {{ T2Long1.length }}</el-text>
                辆
              </el-text>
              <el-input v-model="searchT2Long1" size="small" placeholder="请输入车牌">
                <template #prepend>
                  <el-button :icon="Search" />
                </template>
              </el-input>
              <el-table v-loading="loadingStatus.T2Long1Table" :data="filterTableData[3]" height="360px">
                <el-table-column prop="CAR_ID" label="车牌号" width="130px" />
                <el-table-column prop="TERMINAL_IN_TIME" label="入池时间" />
                <el-table-column align="right">
                  <template #default="scope">
                    <el-button :disabled="!!scope.row.GIVE_UP_TIME || !func_no.includes('4')" style="margin-right: 30px; font-size: 15px" size="small" type="warning"
                      @click="remove(scope.row)">空车驶离</el-button>
                  </template>
                </el-table-column>
              </el-table>
            </div>
          </div>
        </el-card>
      </el-col>
      <el-col :span="8">
        <el-card>
          <div class="table-box">
            <div>
              <el-text type="info" size="large">
                T1长途2:
                <el-text type="warning" size="large" style="position: relative; top: 0px">
                  {{ T1Long2.length }}</el-text>
                辆
              </el-text>
              <el-input v-model="searchT1Long2" size="small" placeholder="请输入车牌">
                <template #prepend>
                  <el-button :icon="Search" />
                </template>
              </el-input>
              <el-table v-loading="loadingStatus.T1Long2Table" :data="filterTableData[1]" height="360px">
                <el-table-column prop="CAR_ID" label="车牌号" width="130px" />
                <el-table-column prop="TERMINAL_IN_TIME" label="入池时间" />
                <el-table-column align="right">
                  <template #default="scope">
                    <el-button :disabled="!!scope.row.GIVE_UP_TIME || !func_no.includes('4')" style="margin-right: 30px; font-size: 15px" size="small" type="warning"
                      @click="remove(scope.row)">空车驶离</el-button>
                  </template>
                </el-table-column>
              </el-table>
            </div>
            <div>
              <el-text type="info" size="large">
                T2长途2:
                <el-text type="warning" size="large">
                  {{ T2Long2.length }}</el-text>
                辆
              </el-text>
              <el-input v-model="searchT2Long2" size="small" placeholder="请输入车牌">
                <template #prepend>
                  <el-button :icon="Search" />
                </template>
              </el-input>
              <el-table v-loading="loadingStatus.T2Long2Table" :data="filterTableData[4]" height="360px">
                <el-table-column prop="CAR_ID" label="车牌号" width="130px" />
                <el-table-column prop="TERMINAL_IN_TIME" label="入池时间" />
                <el-table-column align="right">
                  <template #default="scope">
                    <el-button :disabled="!!scope.row.GIVE_UP_TIME || !func_no.includes('4')" style="margin-right: 30px; font-size: 15px" size="small" type="warning"
                      @click="remove(scope.row)">空车驶离</el-button>
                  </template>
                </el-table-column>
              </el-table>
            </div>
          </div>
        </el-card>
      </el-col>
      <el-col :span="8">
        <el-card>
          <div class="table-box">
            <div>
              <el-text type="info" size="large">
                T1补偿:
                <el-text type="warning" size="large" style="position: relative; top: 0px">
                  {{ T1Long3.length }}</el-text>
                辆
              </el-text>
              <el-input v-model="searchT1Long3" size="small" placeholder="请输入车牌">
                <template #prepend>
                  <el-button :icon="Search" />
                </template>
              </el-input>
              <el-table v-loading="loadingStatus.T1PdTable" :data="filterTableData[2]" height="360px">
                <el-table-column prop="CAR_ID" label="车牌号" width="130px" />
                <el-table-column prop="TERMINAL_IN_TIME" label="入池时间" />
                <el-table-column align="right">
                  <template #default="scope">
                    <el-button :disabled="!!scope.row.GIVE_UP_TIME || !func_no.includes('4')" style="margin-right: 30px; font-size: 15px" size="small" type="warning"
                      @click="remove(scope.row)">空车驶离</el-button>
                  </template>
                </el-table-column>
              </el-table>
            </div>
            <div>
              <el-text type="info" size="large">
                T2补偿:
                <el-text type="warning" size="large">
                  {{ T2Short1.length }}</el-text>
                辆
              </el-text>
              <el-input v-model="searchT2Short1" size="small" placeholder="请输入车牌">
                <template #prepend>
                  <el-button :icon="Search" />
                </template>
              </el-input>
              <el-table v-loading="loadingStatus.T2PdTable" :data="filterTableData[5]" height="360px">
                <el-table-column prop="CAR_ID" label="车牌号" width="130px" />
                <el-table-column prop="TERMINAL_IN_TIME" label="入池时间" />
                <el-table-column align="right">
                  <template #default="scope">
                    <el-button :disabled="!!scope.row.GIVE_UP_TIME || !func_no.includes('4')" style="margin-right: 30px; font-size: 15px" size="small" type="warning"
                      @click="remove(scope.row)">空车驶离</el-button>
                  </template>
                </el-table-column>
              </el-table>
            </div>
          </div>
        </el-card>
      </el-col>
    </el-row>
  </div>
  <el-dialog v-model="dialogVisible" :title="carID" width="500" :show-close="false">
    <span>空车驶离</span>
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
const func_no = ref([]);
const dialogVisible = ref(false);
const carID = ref('');
const params = ref({});
const T1Long1 = ref([]);
const T1Long2 = ref([]);
const T1Long3 = ref([]);
const T2Long1 = ref([]);
const T2Long2 = ref([]);
const T2Short1 = ref([]);
const searchT1Long1 = ref("");
const searchT1Long2 = ref("");
const searchT1Long3 = ref("");
const searchT2Long1 = ref("");
const searchT2Long2 = ref("");
const searchT2Short1 = ref("");
const filterTableData = computed(() => {
  let arr = [];
  arr[0] = T1Long1.value.filter(
    (item) =>
      !searchT1Long1.value ||
      item.CAR_ID.toLowerCase().includes(searchT1Long1.value.toLowerCase())
  );
  arr[1] = T1Long2.value.filter(
    (item) =>
      !searchT1Long2.value ||
      item.CAR_ID.toLowerCase().includes(searchT1Long2.value.toLowerCase())
  );
  arr[2] = T1Long3.value.filter(
    (item) =>
      !searchT1Long3.value ||
      item.CAR_ID.toLowerCase().includes(searchT1Long3.value.toLowerCase())
  );
  arr[3] = T2Long1.value.filter(
    (item) =>
      !searchT2Long1.value ||
      item.CAR_ID.toLowerCase().includes(searchT2Long1.value.toLowerCase())
  );
  arr[4] = T2Long2.value.filter(
    (item) =>
      !searchT2Long2.value ||
      item.CAR_ID.toLowerCase().includes(searchT2Long2.value.toLowerCase())
  );
  arr[5] = T2Short1.value.filter(
    (item) =>
      !searchT2Short1.value ||
      item.CAR_ID.toLowerCase().includes(searchT2Short1.value.toLowerCase())
  );
  return arr;
});
const loadingStatus = reactive({
  T1Long1Table: true,
  T1Long2Table: true,
  T1PdTable: true,
  T2Long1Table: true,
  T2Long2Table: true,
  T2PdTable: true,
});

const tableRowClassName = ({row,rowIndex}) => {
  if(row.GIVE_UP_TIME){
    return 'passed-row'
  } else{
    return
  }
};

const remove = (row) => {
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
  await axios.post("/api/give_up", param).then((res) => {
    console.log(res);
    init();
    if (res.data.obj == "success") {
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

watch(searchT1Long1, (val) => {
  searchT1Long1.value = val.toUpperCase();
});

watch(searchT2Long1, (val) => {
  searchT2Long1.value = val.toUpperCase();
});

watch(searchT1Long2, (val) => {
  searchT1Long2.value = val.toUpperCase();
});

watch(searchT2Long2, (val) => {
  searchT2Long2.value = val.toUpperCase();
});

watch(searchT1Long3, (val) => {
  searchT1Long3.value = val.toUpperCase();
});

watch(searchT2Short1, (val) => {
  searchT2Short1.value = val.toUpperCase();
});

onMounted(() => {
  init();
  timer = setInterval(function () {
    init();
  }, 10000);
  func_no.value = localStorage.getItem('func_no');
  console.log(func_no.value);
});

onBeforeUnmount(() => {
  clearInterval(timer);
});

async function init() {
  let params = {
    location: "terminal",
    terminal: "T1",
    type: "long",
    line: "1",
  };
  await axios.get("/api/get_taxi_list", { params }).then((res) => {
    console.log(res.data);
    T1Long1.value = res.data;
    loadingStatus.T1Long1Table = false;
  });

  params.line = "2";
  await axios.get("/api/get_taxi_list", { params }).then((res) => {
    T1Long2.value = res.data;
    loadingStatus.T1Long2Table = false;
  });

  params.type = "pd";
  params.line = "1";
  await axios.get("/api/get_taxi_list", { params }).then((res) => {
    T1Long3.value = res.data;
    loadingStatus.T1PdTable = false;
  });

  params.terminal = "T2";
  params.type = "long";
  params.line = "1";
  await axios.get("/api/get_taxi_list", { params }).then((res) => {
    T2Long1.value = res.data;
    loadingStatus.T2Long1Table = false;
  });

  params.line = "2";
  await axios.get("/api/get_taxi_list", { params }).then((res) => {
    T2Long2.value = res.data;
    loadingStatus.T2Long2Table = false;
  });

  params.type = "pd";
  params.line = "1";
  await axios.get("/api/get_taxi_list", { params }).then((res) => {
    console.log(res.data);
    T2Short1.value = res.data;
    loadingStatus.T2PdTable = false;
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
        height: 790px;
        // display: flex;
        // flex-direction: column;
        // justify-content: space-between;
        text-align: center;

        div:nth-child(2) {
          position: relative;
          bottom: -24px;
        }

        div:nth-child(1) {
          margin-top: -2px;
        }

        div {
          position: relative;

          .el-input {
            position: absolute;
            z-index: 999;
            top: 44px;
            right: 10px;
            width: 140px;
            height: 26px;
          }

          .el-table {
            border: 1px solid rgba(0, 0, 0, 0.1);
            margin-top: 15px;
          }

          .passed-row{
            background-color: gray;
          }
        }

        div:nth-child(1) {
          .el-text {
            position: relative;
            top: 4px;
          }
        }
      }
    }
  }
}
</style>
