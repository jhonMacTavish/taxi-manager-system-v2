<template>
  <div class="container">
    <el-card>
      <template #header>
        <div style="text-align: center">
          <el-config-provider :locale="locale">
            <el-input v-model="carNo" placeholder="请输入车牌" class="input-with-select" style="max-width: 600px">
              <template #prepend>
                <el-date-picker style="margin: 0 -20px 0 -20px; width: 360px" v-model="dateTime" type="datetimerange"
                  range-separator="To" start-placeholder="开始时间" end-placeholder="结束时间"
                  value-format="YYYY-MM-DD HH:mm:ss" :disabled-date="disabledDate" />
              </template>
            </el-input>
            <el-button style="margin-left: 10px" @click="getData('')">查询历史数据</el-button>
            <el-button style="margin-left: 10px" @click="getData('today')">查询今日数据</el-button>
          </el-config-provider>
        </div>
      </template>
      <div class="table-box">
        <el-table v-loading="loadingStatus.dataTable" :data="tableData" stripe height="740px">
          <el-table-column prop="POOL_IN_DOOR_NAME" label="蓄车场入口道闸" width="136" />
          <el-table-column prop="POOL_IN_TIME" label="入池时间" width="166" />
          <el-table-column prop="TERMINAL" label="区域" width="52" />
          <el-table-column prop="POOL_OUT_DOOR_NAME" label="蓄车场出口道闸" width="136" />
          <el-table-column prop="POOL_OUT_TIME" label="出池时间" width="166" />
          <el-table-column prop="TYPE" label="类型" width="52" />
          <el-table-column prop="TERMINAL_IN_DOOR_NAME" label="航站楼入口道闸" width="136" />
          <el-table-column prop="TERMINAL_IN_TIME" label="航站楼进入时间" width="166" />
          <el-table-column prop="LINE" label="车道" width="52" />
          <el-table-column prop="ONCE" label="人工放车" width="100" />
          <el-table-column prop="TERMINAL_OUT_DOOR_NAME" label="航站楼出口道闸" width="136" />
          <el-table-column prop="TERMINAL_OUT_TIME" label="航站楼外出时间" width="166" />
          <el-table-column prop="TERMINAL_OUT_DOOR_ID" label="出池依据" />
        </el-table>
      </div>
    </el-card>
  </div>
</template>

<script setup>
import axios from "axios";
import { ref, reactive } from "vue";
import dayjs from "dayjs";
import zhCn from "element-plus/es/locale/lang/zh-cn";
import validateCarNo from "../util/tools.js";

const locale = zhCn;
const carNo = ref("");
const dateTime = ref([]);
const tableData = ref([]);
const loadingStatus = reactive({
  dataTable: false,
});

const disabledDate = (time) => {
  return time.getTime() > new Date().getTime();
};
const getData = async (today) => {
  console.log(dateTime);
  if (
    !today &&
    (dateTime.value
      ? !dateTime.value[0] || !dateTime.value[1]
      : !dateTime.value)
  ) {
    ElMessage({
      message: "请输入查询时间",
      type: "warning",
    });
    return;
  } else if (!validateCarNo(carNo.value)) {
    return;
  } else if (today) {
    dateTime.value ? null : (dateTime.value = []);
    dateTime.value[0] = dayjs().startOf("date").format("YYYY-MM-DD HH:mm:ss");
    dateTime.value[1] = dayjs().endOf("date").format("YYYY-MM-DD HH:mm:ss");
  } else {
  }

  let params = {
    carid: carNo.value,
    starttime: dateTime.value[0],
    endtime: dateTime.value[1],
  };
  loadingStatus.dataTable = true;
  await axios.get("/api/get_carid_history", { params }).then((res) => {
    console.log(res.data, "res_data");
    let data = [];
    res.data.forEach((item, index) => {
      item.TYPE == "long" ? (item.TYPE = "长途") : (item.TYPE = "短途");
      data.push(item);
    });
    tableData.value = data;
    loadingStatus.dataTable = false;
  });
};
</script>

<style lang="less" scoped>
.container {
  height: 100%;

  .el-card {
    height: 100%;

    .card-header {
      height: 60px;
      line-height: 60px;
    }

    .table-box {
      position: relative;
      bottom: -4px;
      border: 1px solid rgba(0, 0, 0, 0.1);
    }
  }
}
</style>
