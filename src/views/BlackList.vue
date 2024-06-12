<template>
  <div class="container">
    <el-row :gutter="24">
      <el-col :span="6"></el-col>
      <el-col :span="12">
        <el-card>
          <template #header>
            <div style="text-align: center">
              <el-text size="large" type="warning"> 添加黑名单 </el-text>
              <el-input
                v-model="carNo"
                placeholder="请输入车牌号"
                style="width: 120px; margin: 0 10px"
              />
              <el-date-picker
                v-model="endTime"
                type="date"
                :disabled-date="disabledDate"
                placeholder="选择失效时间"
                style="width: 160px; margin-right: 10px"
                value-format="YYYY-MM-DD"
              />
              <el-input
                v-model="note"
                style="width: 240px"
                :rows="2"
                placeholder="拉黑原因"
              />
              <el-button @click="addBlackList" style="margin-left: 10px"
                >确认</el-button
              >
            </div>
          </template>
          <el-table :data="filterTableData" :row-style="{height:44.3+'px'}">
            <el-table-column prop="CAR_ID" label="车牌号" width="300px" />
            <el-table-column prop="END_TIME" label="失效时间" width="300px" />
            <el-table-column align="right">
              <template #header>
                <el-input
                  v-model="search"
                  size="small"
                  placeholder="请输入车牌"
                >
                  <template #prepend>
                    <el-button :icon="Search" />
                  </template>
                </el-input>
              </template>
              <template #default="scope">
                <el-button
                  size="small"
                  type="danger"
                  @click="deleteBlackList(scope.row)"
                  >移除</el-button
                >
              </template>
            </el-table-column>
          </el-table>

          <div class="pagination-box">
            <el-pagination
              v-model:current-page="currentPage"
              :page-size="15"
              layout="total, prev, pager, next"
              :total="total"
              :hide-on-single-page="false"
              @current-change="handleCurrentChange"
            />
          </div>
        </el-card>
      </el-col>
      <el-col :span="6"></el-col>
    </el-row>
  </div>
</template>

<script setup>
import { ref, onMounted, computed } from "vue";
import axios from "axios";
import { Search } from "@element-plus/icons-vue";
import validateCarNo from "../util/tools.js";

const currentPage = ref(1);
const total = ref(0);
const note = ref("");
const search = ref("");
const endTime = ref("");
const tableData = ref([]);
const carNo = ref();
const filterTableData = computed(() =>
  tableData.value.filter(
    (item) =>
      !search.value ||
      item.CAR_ID.toLowerCase().includes(search.value.toLowerCase())
  )
);

const disabledDate = (time) => {
  return time.getTime() < new Date().getTime();
};

const handleCurrentChange = () => {
  console.log(currentPage.value);
  getBlackList();
};

const getBlackList = async () => {
  let params = {
    start_num: (currentPage.value - 1) * 15 + 1,
    end_num: currentPage.value * 15,
  };
  console.log("-------------", params);
  await axios.get("/api/get_blacklist_running", { params }).then((res) => {
    console.log("************", res.data);
    tableData.value = res.data.data;
    total.value = res.data.total;
    console.log(tableData.value, "tableData");
  });
};

const addBlackList = async () => {
  if (!validateCarNo(carNo.value)) {
    return;
  } else if (!endTime.value) {
    ElMessage({
      message: "请输入失效时间",
      type: "warning",
    });
  } else {
    let params = {
      car_id: carNo.value,
      create_user: localStorage.getItem("user"),
      end_time: endTime.value,
      note: note.value,
    };
    await axios.post("/api/add_blacklist", params).then((res) => {
      getBlackList();
    });
  }
};

const deleteBlackList = async (row) => {
  let params = {
    id: `${row.ID}`,
    end_user: localStorage.getItem("user"),
  };
  console.log("params************", params);
  await axios.post("/api/set_blacklist", params).then((res) => {
    getBlackList();
  });
};

onMounted(() => {
  getBlackList();
});
</script>

<style lang="less" scoped>
.container {
  width: 100%;
  height: 100%;
  .el-row {
    height: 100%;
    .el-col {
      height: 100%;
      .el-card {
        height: 100%;
        .el-table {
          height: 710px;
          border: 1px solid rgba(0, 0, 0, 0.1);
          .el-input {
            width: 160px;
            height: 26px;
          }
        }

        .pagination-box {
          position: relative;
          .el-pagination {
            position: absolute;
            bottom: -34px;
            right: 0;
          }
        }
      }
    }
  }
}
</style>
