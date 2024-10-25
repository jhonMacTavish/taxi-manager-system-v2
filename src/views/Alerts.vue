<template>
  <div class="container">
    <el-row class="row-box" :gutter="20">
      <el-col :span="3"></el-col>
      <el-col :span="12">
        <el-text type="warning" size="large" style="font-weight: bold;">
          道闸识别车牌号错误记录
        </el-text>
        <el-table v-loading="loadingStatus.carList" :data="tableData.carList" height="832px" :border="false" row-key="resultCarId">
          <el-table-column type="expand">
            <template #default="props">
              <div m="4">
                <el-table :data="props.row.carProcessList" :border="true">
                  <el-table-column label="匹配车牌" prop="carId" />
                  <el-table-column label="类型" prop="type" />
                  <el-table-column label="航站楼进入通道" prop="line" />
                  <el-table-column label="航站楼进入时间" prop="terminalInTime" />
                </el-table>
              </div>
            </template>
          </el-table-column>
          <el-table-column label="车牌" prop="resultCarId" />
          <el-table-column label="区域" prop="terminal" />
          <el-table-column label="识别时间" prop="terminalOutTime" />
        </el-table>
      </el-col>
      <el-col :span="6">
        <el-text type="warning" size="large" style="font-weight: bold;">
          缺失GPS数据车辆
        </el-text>
        <el-table v-loading="loadingStatus.GPS" :data="tableData.GPS" height="832px" :border="false">
          <el-table-column label="车牌" prop="carId" width="130px" />
          <el-table-column label="区域" prop="terminal" width="100px" />
          <el-table-column label="航站楼离开时间" prop="terminalOutTime" />
        </el-table>
      </el-col>
      <el-col :span="3"></el-col>
    </el-row>
  </div>
</template>

<script setup>
import axios from "axios";
import { ref, onMounted, computed, reactive, watch, onBeforeUnmount } from "vue";
import { Search, Close } from "@element-plus/icons-vue";
import dayjs from "dayjs";

let timer = null;
const tableData = reactive({
  carList: [],
  GPS: []
});

const loadingStatus = reactive({
  carList: true,
  GPS: true
});

async function init() {
  await getData();
  loadingStatus.carList = false;
  loadingStatus.GPS = false;
};

async function getData() {
  await axios.get("/door/getIdentifyErrorCarList").then((res) => {
    tableData.carList = res.data;
  });

  await axios.get("/door/get5MinNoGPSCarList").then((res) => {
    tableData.GPS = res.data;
  });
  console.log(tableData);
}

onMounted(() => {
  init();
  timer = setInterval(function () {
    getData();
  }, 10000);
});

onBeforeUnmount(() => {
  clearInterval(timer);
});
</script>

<style lang="less">
.container {
  position: relative;
  width: 100%;
  height: 100%;

  .row-box {
    height: 100%;

    .el-card {
      position: relative;
      height: 100%;
      text-align: center;

      .el-text {
        font-size: 16px;
      }

      .el-input {
        position: absolute;
        width: 140px;
        height: 26px;
        top: 61px;
        right: 30px;
        z-index: 999;
      }

      .el-table {
        //border: 1px solid rgba(0, 0, 0, 0.1);
        margin-top: 10px;
        position: relative;
        bottom: -3px;
        
        .el-table__row td{
          border: none;
        }
      }

      .el-table .high-light-row {
        --el-table-tr-bg-color: rgba(255, 93, 28) !important;
        background-color: rgba(255, 93, 28) !important;
      }
    }
  }

  .detail-wrap {
    box-sizing: border-box;
    padding: 10px;
    position: absolute;
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    top: 0;
    width: 100%;
    height: 100%;
    background-color: rgba(0, 0, 0, 0.1);
    z-index: 999;

    .el-card:nth-child(1) {
      margin-right: 10px;
      width: 35%;
      font-size: 22px;

      .title {
        width: 100%;
        font-size: 18px;
        text-align: center;

        .el-text {
          font-size: 18px;
        }
      }

      .el-row {
        height: 731px;

        .title-box {
          text-align: right;
          display: flex;
          flex-direction: column;
          justify-content: center;

          div {
            margin: 20px 0;

            .el-text {
              font-size: 22px;
            }
          }
        }

        .detail-box {
          text-align: left;
          display: flex;
          flex-direction: column;
          justify-content: center;

          div {
            margin: 20px 0;
          }
        }
      }
    }

    .el-card:nth-child(2) {
      flex: 1;
      width: 40%;

      #map-box {
        width: 100%;
        height: 792px;
      }
    }
  }

  .button-box {
    position: absolute;
    right: 10px;
    top: 10px;
    width: 40px;
    height: 40px;
    z-index: 9999;

    .close {
      width: 100%;
      height: 100%;
      color: white;
      font-size: 20px;
      border-radius: 50%;
      border: 0px;
      background-color: rgba(0, 0, 0, 0.2);
    }
  }
}
</style>
