<template>
  <div class="container">
    <el-row :gutter="20" class="echart-container-pool">
      <el-col :span="12">
        <el-card>
          <div class="echart-box" ref="containerPoolT1"></div>
          <div class="echart-box" ref="containerPoolT2"></div>
        </el-card>
      </el-col>
      <el-col :span="7">
        <el-card>
          <el-row :span="24" justify="space-between">
            <el-switch :disabled="true" v-model="auto" class="switch-control" style="
                --el-switch-on-color: #13ce66;
                --el-switch-off-color: #ff4949;
              " active-text="自动" inactive-text="人工" />
            <el-col :span="20">
              <div class="echart-box" ref="containerPdT1"></div>
              <div class="echart-box" ref="containerPdT2"></div>
            </el-col>
            <el-col :span="4" class="control-button-box">
              <el-button :disabled="true">放车</el-button>
              <el-button :disabled='true'>放车</el-button>
            </el-col>
          </el-row>
        </el-card>
      </el-col>
      <el-col :span="5">
        <el-card>
          <div class="label-box">
            <el-row :span="24">
              <el-col :span="6">
                <el-text size="large" class="title-box" type="info">T1航站楼</el-text>
              </el-col>
              <el-col :span="18" class="icon-box">
                <div class="icon-item" v-loading="devices.T1.entry.tableData.length &&
      !devices.T1.entry.existErr
      ">
                  <el-popover placement="top-start" :width="300" trigger="hover"
                    :disabled="!devices.T1.entry.tableData.length">
                    <template #reference>
                      <div class="item-box">
                        <el-icon size="34" :color="!devices.T1.entry.tableData.length
      ? '#33CC99'
      : 'red'
      ">
                          <Cpu />
                        </el-icon>
                        <el-text :style="`color: ${!devices.T1.entry.tableData.length
      ? '#33CC99'
      : 'red'
      }`">入口</el-text>
                      </div>
                    </template>
                    <el-table :data="devices.T1.entry.tableData">
                      <el-table-column width="150" property="NAME" label="设备" />
                      <el-table-column width="150" property="IP" label="IP" />
                    </el-table>
                  </el-popover>
                </div>
                <div class="icon-item" v-loading="devices.T1.exit.tableData.length &&
      !devices.T1.exit.existErr
      ">
                  <el-popover placement="top-start" :width="300" trigger="hover"
                    :disabled="!devices.T1.exit.tableData.length">
                    <template #reference>
                      <div class="item-box">
                        <el-icon size="34" :color="!devices.T1.exit.tableData.length
      ? '#33CC99'
      : 'red'
      ">
                          <Cpu />
                        </el-icon>
                        <el-text :style="`color: ${!devices.T1.exit.tableData.length
      ? '#33CC99'
      : 'red'
      }`">出口</el-text>
                      </div>
                    </template>
                    <el-table :data="devices.T1.exit.tableData">
                      <el-table-column width="150" property="NAME" label="设备" />
                      <el-table-column width="150" property="IP" label="IP" />
                    </el-table>
                  </el-popover>
                </div>
                <div class="icon-item" v-loading="devices.T1.screen.tableData.length &&
      !devices.T1.screen.existErr
      ">
                  <el-popover placement="top-start" :width="300" trigger="hover"
                    :disabled="!devices.T1.screen.tableData.length">
                    <template #reference>
                      <div class="item-box">
                        <el-icon size="34" :color="!devices.T1.screen.tableData.length
      ? '#33CC99'
      : 'red'
      ">
                          <Cpu />
                        </el-icon>
                        <el-text :style="`color: ${!devices.T1.screen.tableData.length
      ? '#33CC99'
      : 'red'
      }`">屏幕</el-text>
                      </div>
                    </template>
                    <el-table :data="devices.T1.screen.tableData">
                      <el-table-column width="150" property="NAME" label="设备" />
                      <el-table-column width="150" property="IP" label="IP" />
                    </el-table>
                  </el-popover>
                </div>
              </el-col>
            </el-row>
            <el-row :span="24">
              <el-col :span="6">
                <el-text size="large" class="title-box" type="info">T2航站楼</el-text>
              </el-col>
              <el-col :span="18" class="icon-box">
                <div class="icon-item" v-loading="devices.T2.entry.tableData.length &&
      !devices.T2.entry.existErr
      ">
                  <el-popover placement="top-start" :width="300" trigger="hover"
                    :disabled="!devices.T2.entry.tableData.length">
                    <template #reference>
                      <div class="item-box">
                        <el-icon size="34" :color="!devices.T2.entry.tableData.length
      ? '#33CC99'
      : 'red'
      ">
                          <Cpu />
                        </el-icon>
                        <el-text :style="`color: ${!devices.T2.entry.tableData.length
      ? '#33CC99'
      : 'red'
      }`">入口</el-text>
                      </div>
                    </template>
                    <el-table :data="devices.T2.entry.tableData">
                      <el-table-column width="150" property="NAME" label="设备" />
                      <el-table-column width="150" property="IP" label="IP" />
                    </el-table>
                  </el-popover>
                </div>
                <div class="icon-item" v-loading="devices.T2.exit.tableData.length &&
      !devices.T2.exit.existErr
      ">
                  <el-popover placement="top-start" :width="300" trigger="hover"
                    :disabled="!devices.T2.exit.tableData.length">
                    <template #reference>
                      <div class="item-box">
                        <el-icon size="34" :color="!devices.T2.exit.tableData.length
      ? '#33CC99'
      : 'red'
      ">
                          <Cpu />
                        </el-icon>
                        <el-text :style="`color: ${!devices.T2.exit.tableData.length
      ? '#33CC99'
      : 'red'
      }`">出口</el-text>
                      </div>
                    </template>
                    <el-table :data="devices.T2.exit.tableData">
                      <el-table-column width="150" property="NAME" label="设备" />
                      <el-table-column width="150" property="IP" label="IP" />
                    </el-table>
                  </el-popover>
                </div>
                <div class="icon-item" v-loading="devices.T2.screen.tableData.length &&
      !devices.T2.screen.existErr
      ">
                  <el-popover placement="top-start" :width="300" trigger="hover"
                    :disabled="!devices.T2.screen.tableData.length">
                    <template #reference>
                      <div class="item-box">
                        <el-icon size="34" :color="!devices.T2.screen.tableData.length
      ? '#33CC99'
      : 'red'
      ">
                          <Cpu />
                        </el-icon>
                        <el-text :style="`color: ${!devices.T2.screen.tableData.length
      ? '#33CC99'
      : 'red'
      }`">屏幕</el-text>
                      </div>
                    </template>
                    <el-table :data="devices.T2.screen.tableData">
                      <el-table-column width="150" property="NAME" label="设备" />
                      <el-table-column width="150" property="IP" label="IP" />
                    </el-table>
                  </el-popover>
                </div>
              </el-col>
            </el-row>
            <el-row :span="24">
              <el-col :span="6">
                <el-text size="large" class="title-box" type="info">蓄车场</el-text>
              </el-col>
              <el-col :span="18" class="icon-box">
                <div class="icon-item" v-loading="devices.pool.entry.tableData.length &&
      !devices.pool.entry.existErr
      ">
                  <el-popover placement="top-start" :width="300" trigger="hover"
                    :disabled="!devices.pool.entry.tableData.length">
                    <template #reference>
                      <div class="item-box">
                        <el-icon size="34" :color="!devices.pool.entry.tableData.length
      ? '#33CC99'
      : 'red'
      ">
                          <Cpu />
                        </el-icon>
                        <el-text :style="`color: ${!devices.pool.entry.tableData.length
      ? '#33CC99'
      : 'red'
      }`">入口</el-text>
                      </div>
                    </template>
                    <el-table :data="devices.pool.entry.tableData">
                      <el-table-column width="150" property="NAME" label="设备" />
                      <el-table-column width="150" property="IP" label="IP" />
                    </el-table>
                  </el-popover>
                </div>
                <div class="icon-item" v-loading="devices.pool.exit.tableData.length &&
      !devices.pool.exit.existErr
      ">
                  <el-popover placement="top-start" :width="300" trigger="hover"
                    :disabled="!devices.pool.exit.tableData.length">
                    <template #reference>
                      <div class="item-box">
                        <el-icon size="34" :color="!devices.pool.exit.tableData.length
      ? '#33CC99'
      : 'red'
      ">
                          <Cpu />
                        </el-icon>
                        <el-text :style="`color: ${!devices.pool.exit.tableData.length
      ? '#33CC99'
      : 'red'
      }`">出口</el-text>
                      </div>
                    </template>
                    <el-table :data="devices.pool.exit.tableData">
                      <el-table-column width="150" property="NAME" label="设备" />
                      <el-table-column width="150" property="IP" label="IP" />
                    </el-table>
                  </el-popover>
                </div>
                <div class="icon-item" v-loading="devices.pool.screen.tableData.length &&
      !devices.pool.screen.existErr
      ">
                  <el-popover placement="top-start" :width="300" trigger="hover"
                    :disabled="!devices.pool.screen.tableData.length">
                    <template #reference>
                      <div class="item-box">
                        <el-icon size="34" :color="!devices.pool.screen.tableData.length
      ? '#33CC99'
      : 'red'
      ">
                          <Cpu />
                        </el-icon>
                        <el-text :style="`color: ${!devices.pool.screen.tableData.length
      ? '#33CC99'
      : 'red'
      }`">屏幕</el-text>
                      </div>
                    </template>
                    <el-table :data="devices.pool.screen.tableData">
                      <el-table-column width="150" property="NAME" label="设备" />
                      <el-table-column width="150" property="IP" label="IP" />
                    </el-table>
                  </el-popover>
                </div>
              </el-col>
            </el-row>
          </div>
        </el-card>
      </el-col>
    </el-row>
    <el-row class="panel-box" :gutter="20">
      <el-col :span="4">
        <div class="info-box">
          <el-card>
            <template #header>
              <el-text class="mx-1" type="primary" size="large">补偿授权</el-text>
            </template>
            <div class="input-box">
              <el-input :disabled="true" v-model="carNo" placeholder="请输入车牌" maxlength="8" />
              <!-- <el-button class="input-button" @click="authorize" :disabled="authDisabled">授权</el-button> -->
              <el-button class="input-button" @click="authorize" :disabled="true">授权</el-button>
            </div>
          </el-card>
          <el-card>
            <template #header>
              <el-text class="mx-1" type="primary" size="large">放行操作</el-text>
            </template>
            <div class="cascader-box">
              <el-cascader :disabled="false || !func_no.includes('1')" v-model="cascaderValue" :options="optionsCascader" popper-class="cascader-style"
                @change="handleChange" />
            </div>
          </el-card>
          <el-card>
            <template #header>
              <el-text class="mx-1" type="primary" size="large">放行通知</el-text>
            </template>
            <div>
              <el-text v-if="releaseStatus.complete" type="success" class="info-releaseStatus">
                放车已完成
              </el-text>
              <div v-else class="info-release-complete">
                <h3>
                  <el-text>{{ releaseStatus.terminal }}</el-text>
                  <el-text type="primary">
                    {{
      releaseStatus.type == "long" ? "长途" : "短途"
    }}</el-text>
                  <el-text> 放车 </el-text>
                  <el-text type="success">{{ releaseStatus.total }}</el-text>
                  <el-text> 辆</el-text>
                </h3>
                <h4>
                  <el-text>已放</el-text>
                  <el-text type="success"> {{ releaseStatus.out }}</el-text>
                  <el-text> 辆，待放</el-text>
                  <el-text type="danger"> {{ releaseStatus.in }}</el-text>
                  <el-text> 辆</el-text>
                </h4>
                <h4>
                  <el-text>开始时间：</el-text>
                  <el-text type="warning">{{
      releaseStatus.startTime
    }}</el-text>
                </h4>
              </div>
            </div>
          </el-card>
        </div>
      </el-col>
      <el-col :span="6">
        <div class="echart-box dashboard-box">
          <el-card>
            <div ref="containerDashbd"></div>
          </el-card>
          <el-card>
            <template #header>
              <el-text class="mx-1" type="primary" size="large">放行确认</el-text>
            </template>
            <div v-if="!releaseStatus.confirm" class="confirm-box">
              <el-text type="info" size="large">暂未确认</el-text>
            </div>
            <div v-else class="confirm-box">
              <el-tag type="warning" size="large">确认时间</el-tag>
              <el-tag type="success" size="large">{{
      releaseStatus.confirmTime
    }}</el-tag>
            </div>
          </el-card>
        </div>
      </el-col>
      <el-col :span="7">
        <div class="echart-box">
          <el-card>
            <div ref="containerOnroad" class="echart-panle"></div>
          </el-card>
        </div>
      </el-col>
      <el-col :span="7">
        <div class="echart-box">
          <el-card>
            <el-row :span="24">
              <el-col :span="4">
                <div class="button-box">
                  <el-button :disabled="!func_no.includes('3')" @click="setDoorOnce(1)" :style="`background-color: ${doorStatus.T1Pd1 ? 'orange' : ''
      }`">
                    放车
                  </el-button>
                  <el-button :disabled="!func_no.includes('3')" @click="setDoorOnce(2)" :style="`background-color: ${doorStatus.T1Long1 ? 'orange' : ''
      }`">
                    放车
                  </el-button>
                  <el-button :disabled="!func_no.includes('3')" @click="setDoorOnce(3)" :style="`background-color: ${doorStatus.T1Long2 ? 'orange' : ''
      }`">
                    放车
                  </el-button>
                  <el-button :disabled="!func_no.includes('3')" @click="setDoorOnce(4)" :style="`background-color: ${doorStatus.T2Long1 ? 'orange' : ''
      }`">
                    放车
                  </el-button>
                  <el-button :disabled="!func_no.includes('3')" @click="setDoorOnce(5)" :style="`background-color: ${doorStatus.T2Long2 ? 'orange' : ''
      }`">
                    放车
                  </el-button>
                  <el-button :disabled="!func_no.includes('3')" @click="setDoorOnce(6)" :style="`background-color: ${doorStatus.T2Pd1 ? 'orange' : ''
      }`">
                    放车
                  </el-button>
                </div>
              </el-col>
              <el-col :span="20">
                <div ref="containerTermnl" class="echart-panle"></div>
              </el-col>
            </el-row>
          </el-card>
        </div>
      </el-col>
    </el-row>
  </div>
  <el-dialog v-model="dialogVisible" title="放车确认" width="500" center :show-close="false">
    <span>{{ cascaderValue[0] }} {{ cascaderValue[1] == "long" ? "长途" : cascaderValue[1] }} <el-text type="warning">{{ cascaderValue[2]}}</el-text> 辆</span>
    <template #footer>
      <div class="dialog-footer">
        <el-button @click="cancel()">取消</el-button>
        <el-button type="primary" @click="confirm()">
          确认
        </el-button>
      </div>
    </template>
  </el-dialog>
</template>

<script setup>
import * as echarts from "echarts";
import axios from "axios";
import { Cpu } from "@element-plus/icons-vue";
import {
  ref,
  reactive,
  onMounted,
  computed,
  watch,
  onBeforeUnmount,
} from "vue";
import Connector from "../util/connector.js";
import dayjs from "dayjs";
import validateCarNo from "../util/tools.js";

let echartT1Pool = null;
let echartT2Pool = null;
let echartPdT1 = null;
let echartPdT2 = null;
let echartDashbd = null;
let echartOnroad = null;
let echartTermnl = null;

const func_no = ref([]);
const taxiData = reactive({
  pool: {
    T1: { max: 300, num: 0 },
    T2: { max: 700, num: 0 },
  },
  onRoad: {
    T1: { long: 0, pd: 0 },
    T2: { long: 0, pd: 0 },
  },
  terminal: {
    T1: {
      long: { line1: 0, line2: 0 },
      pd: { line1: 0 },
    },
    T2: {
      long: { line1: 0, line2: 0 },
      pd: { line1: 0 },
    },
  },
  pd: {
    T1: { max: 20, num: 0 },
    T2: { max: 20, num: 0 },
  },
});
const taxiDataComputed = computed(() => {
  return {
    poolTotal: taxiData.pool.T1.num + taxiData.pool.T2.num,
    onWayTotal:
      taxiData.onRoad.T1.long +
      taxiData.onRoad.T1.pd +
      taxiData.onRoad.T2.long +
      taxiData.onRoad.T2.pd,
    poolT1Remaining:
      taxiData.pool.T1.max - taxiData.pool.T1.num >= 0
        ? taxiData.pool.T1.max - taxiData.pool.T1.num
        : 0,
    poolT2Remaining:
      taxiData.pool.T2.max - taxiData.pool.T2.num >= 0
        ? taxiData.pool.T2.max - taxiData.pool.T2.num
        : 0,
    pdT1Remaining:
      taxiData.pd.T1.max - taxiData.pd.T1.num >= 0
        ? taxiData.pd.T1.max - taxiData.pd.T1.num
        : 0,
    pdT2Remaining:
      taxiData.pd.T2.max - taxiData.pd.T2.num >= 0
        ? taxiData.pd.T2.max - taxiData.pd.T2.num
        : 0,
  };
});

const auto = ref(true);
const carNo = ref("");

const containerPoolT1 = ref();
const containerPoolT2 = ref();
const containerPdT1 = ref();
const containerPdT2 = ref();
const containerDashbd = ref();
const containerOnroad = ref();
const containerTermnl = ref();

const optionPoolT1 = {
  title: {
    text: "蓄车场",
    top: "0",
  },
  tooltip: {
    trigger: "axis",
    axisPointer: {
      type: "shadow",
    },
  },
  legend: {},
  grid: {
    top: "45%",
    left: "3%",
    right: "4%",
    height: 70,
    containLabel: true,
  },
  xAxis: {
    type: "value",
    boundaryGap: [0, 0.01],
    max: taxiData.pool.T1.max,
    axisLabel: {
      fontSize: 15,
      fontWeight: "bold",
    },
  },
  yAxis: {
    type: "category",
    data: ["T1"],
    inverse: true,
    axisLabel: {
      fontSize: 15,
      fontWeight: "bold",
    },
  },
  series: [
    {
      name: "现存车辆",
      type: "bar",
      stack: "total",
      label: {
        show: true,
      },
      emphasis: {
        focus: "series",
      },
      data: [0],
    },
    {
      name: "剩余车位",
      type: "bar",
      stack: "total",
      label: {
        show: false,
      },
      emphasis: {
        focus: "series",
      },
      data: [0],
    },
  ],
};
const optionPoolT2 = {
  tooltip: {
    trigger: "axis",
    axisPointer: {
      type: "shadow",
    },
  },
  legend: {},
  grid: {
    top: "30%",
    left: "3%",
    right: "4%",
    height: 70,
    containLabel: true,
  },
  xAxis: {
    type: "value",
    boundaryGap: [0, 0.01],
    max: taxiData.pool.T2.max,
    axisLabel: {
      fontSize: 15,
      fontWeight: "bold",
    },
  },
  yAxis: {
    type: "category",
    data: ["T2"],
    inverse: true,
    axisLabel: {
      fontSize: 15,
      fontWeight: "bold",
    },
  },
  series: [
    {
      type: "bar",
      stack: "total",
      label: {
        show: true,
      },
      emphasis: {
        focus: "series",
      },
      data: [0],
    },
    {
      type: "bar",
      stack: "total",
      label: {
        show: false,
      },
      emphasis: {
        focus: "series",
      },
      data: [0],
    },
  ],
};
const optionPdT1 = {
  title: {
    text: "近程补偿",
    top: "0",
  },
  tooltip: {
    trigger: "axis",
    axisPointer: {
      type: "shadow",
    },
  },
  legend: {},
  grid: {
    top: "48%",
    left: "3%",
    right: "4%",
    height: 70,
    containLabel: true,
  },
  xAxis: {
    type: "value",
    boundaryGap: [0, 0.01],
    max: 20,
    axisLabel: {
      fontSize: 15,
      fontWeight: "bold",
    },
  },
  yAxis: {
    type: "category",
    data: ["T1"],
    inverse: true,
    axisLabel: {
      fontSize: 15,
      fontWeight: "bold",
    },
  },
  series: [
    {
      type: "bar",
      stack: "total",
      label: {
        show: true,
      },
      emphasis: {
        focus: "series",
      },
      data: [0],
    },
    {
      type: "bar",
      stack: "total",
      label: {
        show: false,
      },
      emphasis: {
        focus: "series",
      },
      data: [0],
    },
  ],
};
const optionPdT2 = {
  tooltip: {
    trigger: "axis",
    axisPointer: {
      type: "shadow",
    },
  },
  legend: {},
  grid: {
    top: "30%",
    left: "3%",
    right: "4%",
    height: 70,
    containLabel: true,
  },
  xAxis: {
    type: "value",
    boundaryGap: [0, 0.01],
    max: 20,
    axisLabel: {
      fontSize: 15,
      fontWeight: "bold",
    },
  },
  yAxis: {
    type: "category",
    data: ["T2"],
    inverse: true,
    axisLabel: {
      fontSize: 15,
      fontWeight: "bold",
    },
  },
  series: [
    {
      type: "bar",
      stack: "total",
      label: {
        show: true,
      },
      emphasis: {
        focus: "series",
      },
      data: [0],
    },
    {
      type: "bar",
      stack: "total",
      label: {
        show: false,
      },
      emphasis: {
        focus: "series",
      },
      data: [0],
    },
  ],
};
const optionDashbd = {
  title: {
    text: "蓄车场车辆",
  },
  grid: {
    top: "10%",
  },
  series: [
    {
      type: "gauge",
      detail: {
        formatter: "{value} 辆",
        offsetCenter: [0, 0],
        color: "#0099FF",
      },
      data: [
        {
          value: 0,
        },
      ],
      center: ["50%", "60%"],
      radius: "70%",
      startAngle: 210,
      endAngle: -30,
      clockwise: true,
      min: 0,
      max: 1000,
      splitNumber: 10,
      progress: {
        show: true,
        width: 20,
        itemStyle: {
          color: "#0099CC",
        },
      },
      axisLine: {
        show: true,
        lineStyle: {
          width: 20,
        },
      },
      splitLine: {
        show: true,
        distance: -43,
        length: 15,
      },
      axisTick: {
        show: true,
        distance: -35,
        length: 8,
      },
      axisLabel: {
        distance: -10,
        fontSize: 15,
        padding: [-8, -25, -8, -25],
        fontWeight: "bold",
      },
      pointer: {
        show: false,
      },
    },
    {
      type: "gauge",
      detail: {
        show: false,
      },
      data: [
        {
          value: 0,
        },
      ],
      center: ["50%", "60%"],
      radius: "70%",
      startAngle: 210,
      endAngle: -30,
      min: 0,
      max: 1000,
      progress: {
        show: true,
        width: 10,
        itemStyle: {
          color: "#FF6666",
        },
      },
      axisLine: {
        show: false,
      },
      splitLine: {
        show: false,
      },
      axisTick: {
        show: false,
      },
      axisLabel: {
        show: false,
      },
      pointer: {
        show: false,
      },
    },
  ],
};
const optionOnroad = {
  title: {
    text: "路途车辆" + ": " + taxiDataComputed.value.onWayTotal + "辆",
  },
  grid: {
    top: "10%",
    left: "10%",
    right: "5%",
    bottom: "10%",
  },
  xAxis: {
    type: "category",
    splitLine: { show: false },
    offset: 12,
    data: [
      {
        value: "T1长途",
        textStyle: {
          fontSize: 15,
          fontWeight: "bolder",
        },
      },
      {
        value: "T1补偿",
        textStyle: {
          fontSize: 15,
          fontWeight: "bolder",
        },
      },
      {
        value: "T2长途",
        textStyle: {
          fontSize: 15,
          fontWeight: "bolder",
        },
      },
      {
        value: "T2补偿",
        textStyle: {
          fontSize: 15,
          fontWeight: "bolder",
        },
      },
    ],
  },
  yAxis: {
    type: "value",
    max: 50,
    axisLabel: {
      fontSize: 15,
      fontWeight: "bold",
    },
  },
  series: [
    {
      name: "数量",
      type: "bar",
      label: {
        show: true,
        position: "inside",
      },
      barWidth: 50,
      data: [0, 0, 0, 0],
    },
  ],
};
const optionTermnl = {
  title: {
    text: "航站楼车辆",
  },
  animation: false, //取消初始动画
  tooltip: {
    trigger: "axis",
    axisPointer: {
      type: "shadow",
    },
  },
  grid: {
    // containLabel: true,
    top: "10%",
    left: "25%",
    right: "5%",
    bottom: "10%",
  },
  yAxis: {
    data: ["T1补偿", "T1长途1", "T1长途2", "T2长途1", "T2长途2", "T2补偿"],
    inverse: true,
    axisLine: { show: false },
    axisTick: { show: false },
    axisLabel: {
      margin: 30,
      fontSize: 15,
      fontWeight: "bold",
    },
    axisPointer: {
      label: {
        show: true,
        margin: 30,
      },
    },
  },
  xAxis: {
    type: "value",
    max: 50,
    splitLine: { show: false },
    offset: 12,
    axisLabel: {
      fontSize: 15,
      fontWeight: "bold",
    },
  },
  series: [
    {
      name: "现存车辆",
      type: "pictorialBar",
      label: {
        show: true,
        position: "right",
        // offset: [10, 0],
        fontSize: 15,
      },
      symbolRepeat: true,
      symbolSize: ["80%", "60%"],
      barCategoryGap: "40%",
      data: [
        {
          value: 0,
          symbol:
            "path://M49.592,40.883c-0.053,0.354-0.139,0.697-0.268,0.963c-0.232,0.475-0.455,0.519-1.334,0.475 c-1.135-0.053-2.764,0-4.484,0.068c0,0.476,0.018,0.697,0.018,0.697c0.111,1.299,0.697,1.342,0.931,1.342h3.7 c0.326,0,0.628,0,0.861-0.154c0.301-0.196,0.43-0.772,0.543-1.78c0.017-0.146,0.025-0.336,0.033-0.56v-0.01 c0-0.068,0.008-0.154,0.008-0.25V41.58l0,0C49.6,41.348,49.6,41.09,49.592,40.883L49.592,40.883z M6.057,40.883 c0.053,0.354,0.137,0.697,0.268,0.963c0.23,0.475,0.455,0.519,1.334,0.475c1.137-0.053,2.762,0,4.484,0.068 c0,0.476-0.018,0.697-0.018,0.697c-0.111,1.299-0.697,1.342-0.93,1.342h-3.7c-0.328,0-0.602,0-0.861-0.154 c-0.309-0.18-0.43-0.772-0.541-1.78c-0.018-0.146-0.027-0.336-0.035-0.56v-0.01c0-0.068-0.008-0.154-0.008-0.25V41.58l0,0 C6.057,41.348,6.057,41.09,6.057,40.883L6.057,40.883z M49.867,32.766c0-2.642-0.344-5.224-0.482-5.507 c-0.104-0.207-0.766-0.749-2.271-1.773c-1.522-1.042-1.487-0.887-1.766-1.566c0.25-0.078,0.492-0.224,0.639-0.241 c0.326-0.034,0.345,0.274,1.023,0.274c0.68,0,2.152-0.18,2.453-0.48c0.301-0.303,0.396-0.405,0.396-0.672 c0-0.268-0.156-0.818-0.447-1.146c-0.293-0.327-1.541-0.49-2.273-0.585c-0.729-0.095-0.834,0-1.022,0.121 c-0.304,0.189-0.32,1.919-0.32,1.919l-0.713,0.018c-0.465-1.146-1.11-3.452-2.117-5.269c-1.103-1.979-2.256-2.599-2.737-2.754 c-0.474-0.146-0.904-0.249-4.131-0.576c-3.298-0.344-5.922-0.388-8.262-0.388c-2.342,0-4.967,0.052-8.264,0.388 c-3.229,0.336-3.66,0.43-4.133,0.576s-1.633,0.775-2.736,2.754c-1.006,1.816-1.652,4.123-2.117,5.269L9.87,23.109 c0,0-0.008-1.729-0.318-1.919c-0.189-0.121-0.293-0.225-1.023-0.121c-0.732,0.104-1.98,0.258-2.273,0.585 c-0.293,0.327-0.447,0.878-0.447,1.146c0,0.267,0.094,0.379,0.396,0.672c0.301,0.301,1.773,0.48,2.453,0.48 c0.68,0,0.697-0.309,1.023-0.274c0.146,0.018,0.396,0.163,0.637,0.241c-0.283,0.68-0.24,0.524-1.764,1.566 c-1.506,1.033-2.178,1.566-2.271,1.773c-0.139,0.283-0.482,2.865-0.482,5.508s0.189,5.02,0.189,5.86c0,0.354,0,0.976,0.076,1.565 c0.053,0.354,0.129,0.697,0.268,0.966c0.232,0.473,0.447,0.516,1.334,0.473c1.137-0.051,2.779,0,4.477,0.07 c1.135,0.043,2.297,0.086,3.33,0.11c2.582,0.051,1.826-0.379,2.928-0.36c1.102,0.016,5.447,0.196,9.424,0.196 c3.976,0,8.332-0.182,9.423-0.196c1.102-0.019,0.346,0.411,2.926,0.36c1.033-0.018,2.195-0.067,3.332-0.11 c1.695-0.062,3.348-0.121,4.477-0.07c0.886,0.043,1.103,0,1.332-0.473c0.132-0.269,0.218-0.611,0.269-0.966 c0.086-0.592,0.078-1.213,0.078-1.565C49.678,37.793,49.867,35.408,49.867,32.766L49.867,32.766z M13.219,19.735 c0.412-0.964,1.652-2.9,2.256-3.244c0.145-0.087,1.426-0.491,4.637-0.706c2.953-0.198,6.217-0.276,7.73-0.276 c1.513,0,4.777,0.078,7.729,0.276c3.201,0.215,4.502,0.611,4.639,0.706c0.775,0.533,1.842,2.28,2.256,3.244 c0.412,0.965,0.965,2.858,0.861,3.116c-0.104,0.258,0.104,0.388-1.291,0.275c-1.387-0.103-10.088-0.216-15.185-0.216 c-4.088,0-12.789,0.113-15.184,0.216c-1.395,0.104-1.188-0.018-1.291-0.275C12.254,22.593,12.805,20.708,13.219,19.735 L13.219,19.735z M16.385,30.511c-0.619,0.155-0.988,0.491-1.764,0.482c-0.775,0-2.867-0.353-3.314-0.371 c-0.447-0.017-0.842,0.302-1.076,0.362c-0.23,0.06-0.688-0.104-1.377-0.318c-0.688-0.216-1.092-0.155-1.316-1.094 c-0.232-0.93,0-2.264,0-2.264c1.488-0.068,2.928,0.069,5.621,0.826c2.693,0.758,4.191,2.213,4.191,2.213 S17.004,30.357,15.385,30.511L16.385,30.511z M36.629,37.293c-1.23,0.164-6.386,0.207-8.794,0.207c-2.412,0-7.566-0.051-8.799-0.207 c-1.256-0.164-2.891-1.67-1.764-2.865c1.523-1.627,1.24-1.576,4.701-2.023C24.967,32.018,27.239,32,27.834,32 c0.584,0,2.865,0.025,5.859,0.404c3.461,0.447,3.178,0.396,4.699,2.022C39.521,35.623,37.887,37.129,36.629,37.293L36.629,37.293z  M48.129,29.582c-0.232,0.93-0.629,0.878-1.318,1.093c-0.688,0.216-1.145,0.371-1.377,0.319c-0.231-0.053-0.627-0.371-1.074-0.361 c-0.448,0.018-2.539,0.37-3.313,0.37c-0.772,0-1.146-0.328-1.764-0.481c-0.621-0.154-0.966-0.154-0.966-0.154 s1.49-1.464,4.191-2.213c2.693-0.758,4.131-0.895,5.621-0.826C48.129,27.309,48.361,28.643,48.129,29.582L48.129,29.582z",
        },
        {
          value: 0,
          symbol:
            "path://M49.592,40.883c-0.053,0.354-0.139,0.697-0.268,0.963c-0.232,0.475-0.455,0.519-1.334,0.475 c-1.135-0.053-2.764,0-4.484,0.068c0,0.476,0.018,0.697,0.018,0.697c0.111,1.299,0.697,1.342,0.931,1.342h3.7 c0.326,0,0.628,0,0.861-0.154c0.301-0.196,0.43-0.772,0.543-1.78c0.017-0.146,0.025-0.336,0.033-0.56v-0.01 c0-0.068,0.008-0.154,0.008-0.25V41.58l0,0C49.6,41.348,49.6,41.09,49.592,40.883L49.592,40.883z M6.057,40.883 c0.053,0.354,0.137,0.697,0.268,0.963c0.23,0.475,0.455,0.519,1.334,0.475c1.137-0.053,2.762,0,4.484,0.068 c0,0.476-0.018,0.697-0.018,0.697c-0.111,1.299-0.697,1.342-0.93,1.342h-3.7c-0.328,0-0.602,0-0.861-0.154 c-0.309-0.18-0.43-0.772-0.541-1.78c-0.018-0.146-0.027-0.336-0.035-0.56v-0.01c0-0.068-0.008-0.154-0.008-0.25V41.58l0,0 C6.057,41.348,6.057,41.09,6.057,40.883L6.057,40.883z M49.867,32.766c0-2.642-0.344-5.224-0.482-5.507 c-0.104-0.207-0.766-0.749-2.271-1.773c-1.522-1.042-1.487-0.887-1.766-1.566c0.25-0.078,0.492-0.224,0.639-0.241 c0.326-0.034,0.345,0.274,1.023,0.274c0.68,0,2.152-0.18,2.453-0.48c0.301-0.303,0.396-0.405,0.396-0.672 c0-0.268-0.156-0.818-0.447-1.146c-0.293-0.327-1.541-0.49-2.273-0.585c-0.729-0.095-0.834,0-1.022,0.121 c-0.304,0.189-0.32,1.919-0.32,1.919l-0.713,0.018c-0.465-1.146-1.11-3.452-2.117-5.269c-1.103-1.979-2.256-2.599-2.737-2.754 c-0.474-0.146-0.904-0.249-4.131-0.576c-3.298-0.344-5.922-0.388-8.262-0.388c-2.342,0-4.967,0.052-8.264,0.388 c-3.229,0.336-3.66,0.43-4.133,0.576s-1.633,0.775-2.736,2.754c-1.006,1.816-1.652,4.123-2.117,5.269L9.87,23.109 c0,0-0.008-1.729-0.318-1.919c-0.189-0.121-0.293-0.225-1.023-0.121c-0.732,0.104-1.98,0.258-2.273,0.585 c-0.293,0.327-0.447,0.878-0.447,1.146c0,0.267,0.094,0.379,0.396,0.672c0.301,0.301,1.773,0.48,2.453,0.48 c0.68,0,0.697-0.309,1.023-0.274c0.146,0.018,0.396,0.163,0.637,0.241c-0.283,0.68-0.24,0.524-1.764,1.566 c-1.506,1.033-2.178,1.566-2.271,1.773c-0.139,0.283-0.482,2.865-0.482,5.508s0.189,5.02,0.189,5.86c0,0.354,0,0.976,0.076,1.565 c0.053,0.354,0.129,0.697,0.268,0.966c0.232,0.473,0.447,0.516,1.334,0.473c1.137-0.051,2.779,0,4.477,0.07 c1.135,0.043,2.297,0.086,3.33,0.11c2.582,0.051,1.826-0.379,2.928-0.36c1.102,0.016,5.447,0.196,9.424,0.196 c3.976,0,8.332-0.182,9.423-0.196c1.102-0.019,0.346,0.411,2.926,0.36c1.033-0.018,2.195-0.067,3.332-0.11 c1.695-0.062,3.348-0.121,4.477-0.07c0.886,0.043,1.103,0,1.332-0.473c0.132-0.269,0.218-0.611,0.269-0.966 c0.086-0.592,0.078-1.213,0.078-1.565C49.678,37.793,49.867,35.408,49.867,32.766L49.867,32.766z M13.219,19.735 c0.412-0.964,1.652-2.9,2.256-3.244c0.145-0.087,1.426-0.491,4.637-0.706c2.953-0.198,6.217-0.276,7.73-0.276 c1.513,0,4.777,0.078,7.729,0.276c3.201,0.215,4.502,0.611,4.639,0.706c0.775,0.533,1.842,2.28,2.256,3.244 c0.412,0.965,0.965,2.858,0.861,3.116c-0.104,0.258,0.104,0.388-1.291,0.275c-1.387-0.103-10.088-0.216-15.185-0.216 c-4.088,0-12.789,0.113-15.184,0.216c-1.395,0.104-1.188-0.018-1.291-0.275C12.254,22.593,12.805,20.708,13.219,19.735 L13.219,19.735z M16.385,30.511c-0.619,0.155-0.988,0.491-1.764,0.482c-0.775,0-2.867-0.353-3.314-0.371 c-0.447-0.017-0.842,0.302-1.076,0.362c-0.23,0.06-0.688-0.104-1.377-0.318c-0.688-0.216-1.092-0.155-1.316-1.094 c-0.232-0.93,0-2.264,0-2.264c1.488-0.068,2.928,0.069,5.621,0.826c2.693,0.758,4.191,2.213,4.191,2.213 S17.004,30.357,15.385,30.511L16.385,30.511z M36.629,37.293c-1.23,0.164-6.386,0.207-8.794,0.207c-2.412,0-7.566-0.051-8.799-0.207 c-1.256-0.164-2.891-1.67-1.764-2.865c1.523-1.627,1.24-1.576,4.701-2.023C24.967,32.018,27.239,32,27.834,32 c0.584,0,2.865,0.025,5.859,0.404c3.461,0.447,3.178,0.396,4.699,2.022C39.521,35.623,37.887,37.129,36.629,37.293L36.629,37.293z  M48.129,29.582c-0.232,0.93-0.629,0.878-1.318,1.093c-0.688,0.216-1.145,0.371-1.377,0.319c-0.231-0.053-0.627-0.371-1.074-0.361 c-0.448,0.018-2.539,0.37-3.313,0.37c-0.772,0-1.146-0.328-1.764-0.481c-0.621-0.154-0.966-0.154-0.966-0.154 s1.49-1.464,4.191-2.213c2.693-0.758,4.131-0.895,5.621-0.826C48.129,27.309,48.361,28.643,48.129,29.582L48.129,29.582z",
        },
        {
          value: 0,
          symbol:
            "path://M49.592,40.883c-0.053,0.354-0.139,0.697-0.268,0.963c-0.232,0.475-0.455,0.519-1.334,0.475 c-1.135-0.053-2.764,0-4.484,0.068c0,0.476,0.018,0.697,0.018,0.697c0.111,1.299,0.697,1.342,0.931,1.342h3.7 c0.326,0,0.628,0,0.861-0.154c0.301-0.196,0.43-0.772,0.543-1.78c0.017-0.146,0.025-0.336,0.033-0.56v-0.01 c0-0.068,0.008-0.154,0.008-0.25V41.58l0,0C49.6,41.348,49.6,41.09,49.592,40.883L49.592,40.883z M6.057,40.883 c0.053,0.354,0.137,0.697,0.268,0.963c0.23,0.475,0.455,0.519,1.334,0.475c1.137-0.053,2.762,0,4.484,0.068 c0,0.476-0.018,0.697-0.018,0.697c-0.111,1.299-0.697,1.342-0.93,1.342h-3.7c-0.328,0-0.602,0-0.861-0.154 c-0.309-0.18-0.43-0.772-0.541-1.78c-0.018-0.146-0.027-0.336-0.035-0.56v-0.01c0-0.068-0.008-0.154-0.008-0.25V41.58l0,0 C6.057,41.348,6.057,41.09,6.057,40.883L6.057,40.883z M49.867,32.766c0-2.642-0.344-5.224-0.482-5.507 c-0.104-0.207-0.766-0.749-2.271-1.773c-1.522-1.042-1.487-0.887-1.766-1.566c0.25-0.078,0.492-0.224,0.639-0.241 c0.326-0.034,0.345,0.274,1.023,0.274c0.68,0,2.152-0.18,2.453-0.48c0.301-0.303,0.396-0.405,0.396-0.672 c0-0.268-0.156-0.818-0.447-1.146c-0.293-0.327-1.541-0.49-2.273-0.585c-0.729-0.095-0.834,0-1.022,0.121 c-0.304,0.189-0.32,1.919-0.32,1.919l-0.713,0.018c-0.465-1.146-1.11-3.452-2.117-5.269c-1.103-1.979-2.256-2.599-2.737-2.754 c-0.474-0.146-0.904-0.249-4.131-0.576c-3.298-0.344-5.922-0.388-8.262-0.388c-2.342,0-4.967,0.052-8.264,0.388 c-3.229,0.336-3.66,0.43-4.133,0.576s-1.633,0.775-2.736,2.754c-1.006,1.816-1.652,4.123-2.117,5.269L9.87,23.109 c0,0-0.008-1.729-0.318-1.919c-0.189-0.121-0.293-0.225-1.023-0.121c-0.732,0.104-1.98,0.258-2.273,0.585 c-0.293,0.327-0.447,0.878-0.447,1.146c0,0.267,0.094,0.379,0.396,0.672c0.301,0.301,1.773,0.48,2.453,0.48 c0.68,0,0.697-0.309,1.023-0.274c0.146,0.018,0.396,0.163,0.637,0.241c-0.283,0.68-0.24,0.524-1.764,1.566 c-1.506,1.033-2.178,1.566-2.271,1.773c-0.139,0.283-0.482,2.865-0.482,5.508s0.189,5.02,0.189,5.86c0,0.354,0,0.976,0.076,1.565 c0.053,0.354,0.129,0.697,0.268,0.966c0.232,0.473,0.447,0.516,1.334,0.473c1.137-0.051,2.779,0,4.477,0.07 c1.135,0.043,2.297,0.086,3.33,0.11c2.582,0.051,1.826-0.379,2.928-0.36c1.102,0.016,5.447,0.196,9.424,0.196 c3.976,0,8.332-0.182,9.423-0.196c1.102-0.019,0.346,0.411,2.926,0.36c1.033-0.018,2.195-0.067,3.332-0.11 c1.695-0.062,3.348-0.121,4.477-0.07c0.886,0.043,1.103,0,1.332-0.473c0.132-0.269,0.218-0.611,0.269-0.966 c0.086-0.592,0.078-1.213,0.078-1.565C49.678,37.793,49.867,35.408,49.867,32.766L49.867,32.766z M13.219,19.735 c0.412-0.964,1.652-2.9,2.256-3.244c0.145-0.087,1.426-0.491,4.637-0.706c2.953-0.198,6.217-0.276,7.73-0.276 c1.513,0,4.777,0.078,7.729,0.276c3.201,0.215,4.502,0.611,4.639,0.706c0.775,0.533,1.842,2.28,2.256,3.244 c0.412,0.965,0.965,2.858,0.861,3.116c-0.104,0.258,0.104,0.388-1.291,0.275c-1.387-0.103-10.088-0.216-15.185-0.216 c-4.088,0-12.789,0.113-15.184,0.216c-1.395,0.104-1.188-0.018-1.291-0.275C12.254,22.593,12.805,20.708,13.219,19.735 L13.219,19.735z M16.385,30.511c-0.619,0.155-0.988,0.491-1.764,0.482c-0.775,0-2.867-0.353-3.314-0.371 c-0.447-0.017-0.842,0.302-1.076,0.362c-0.23,0.06-0.688-0.104-1.377-0.318c-0.688-0.216-1.092-0.155-1.316-1.094 c-0.232-0.93,0-2.264,0-2.264c1.488-0.068,2.928,0.069,5.621,0.826c2.693,0.758,4.191,2.213,4.191,2.213 S17.004,30.357,15.385,30.511L16.385,30.511z M36.629,37.293c-1.23,0.164-6.386,0.207-8.794,0.207c-2.412,0-7.566-0.051-8.799-0.207 c-1.256-0.164-2.891-1.67-1.764-2.865c1.523-1.627,1.24-1.576,4.701-2.023C24.967,32.018,27.239,32,27.834,32 c0.584,0,2.865,0.025,5.859,0.404c3.461,0.447,3.178,0.396,4.699,2.022C39.521,35.623,37.887,37.129,36.629,37.293L36.629,37.293z  M48.129,29.582c-0.232,0.93-0.629,0.878-1.318,1.093c-0.688,0.216-1.145,0.371-1.377,0.319c-0.231-0.053-0.627-0.371-1.074-0.361 c-0.448,0.018-2.539,0.37-3.313,0.37c-0.772,0-1.146-0.328-1.764-0.481c-0.621-0.154-0.966-0.154-0.966-0.154 s1.49-1.464,4.191-2.213c2.693-0.758,4.131-0.895,5.621-0.826C48.129,27.309,48.361,28.643,48.129,29.582L48.129,29.582z",
        },
        {
          value: 0,
          symbol:
            "path://M49.592,40.883c-0.053,0.354-0.139,0.697-0.268,0.963c-0.232,0.475-0.455,0.519-1.334,0.475 c-1.135-0.053-2.764,0-4.484,0.068c0,0.476,0.018,0.697,0.018,0.697c0.111,1.299,0.697,1.342,0.931,1.342h3.7 c0.326,0,0.628,0,0.861-0.154c0.301-0.196,0.43-0.772,0.543-1.78c0.017-0.146,0.025-0.336,0.033-0.56v-0.01 c0-0.068,0.008-0.154,0.008-0.25V41.58l0,0C49.6,41.348,49.6,41.09,49.592,40.883L49.592,40.883z M6.057,40.883 c0.053,0.354,0.137,0.697,0.268,0.963c0.23,0.475,0.455,0.519,1.334,0.475c1.137-0.053,2.762,0,4.484,0.068 c0,0.476-0.018,0.697-0.018,0.697c-0.111,1.299-0.697,1.342-0.93,1.342h-3.7c-0.328,0-0.602,0-0.861-0.154 c-0.309-0.18-0.43-0.772-0.541-1.78c-0.018-0.146-0.027-0.336-0.035-0.56v-0.01c0-0.068-0.008-0.154-0.008-0.25V41.58l0,0 C6.057,41.348,6.057,41.09,6.057,40.883L6.057,40.883z M49.867,32.766c0-2.642-0.344-5.224-0.482-5.507 c-0.104-0.207-0.766-0.749-2.271-1.773c-1.522-1.042-1.487-0.887-1.766-1.566c0.25-0.078,0.492-0.224,0.639-0.241 c0.326-0.034,0.345,0.274,1.023,0.274c0.68,0,2.152-0.18,2.453-0.48c0.301-0.303,0.396-0.405,0.396-0.672 c0-0.268-0.156-0.818-0.447-1.146c-0.293-0.327-1.541-0.49-2.273-0.585c-0.729-0.095-0.834,0-1.022,0.121 c-0.304,0.189-0.32,1.919-0.32,1.919l-0.713,0.018c-0.465-1.146-1.11-3.452-2.117-5.269c-1.103-1.979-2.256-2.599-2.737-2.754 c-0.474-0.146-0.904-0.249-4.131-0.576c-3.298-0.344-5.922-0.388-8.262-0.388c-2.342,0-4.967,0.052-8.264,0.388 c-3.229,0.336-3.66,0.43-4.133,0.576s-1.633,0.775-2.736,2.754c-1.006,1.816-1.652,4.123-2.117,5.269L9.87,23.109 c0,0-0.008-1.729-0.318-1.919c-0.189-0.121-0.293-0.225-1.023-0.121c-0.732,0.104-1.98,0.258-2.273,0.585 c-0.293,0.327-0.447,0.878-0.447,1.146c0,0.267,0.094,0.379,0.396,0.672c0.301,0.301,1.773,0.48,2.453,0.48 c0.68,0,0.697-0.309,1.023-0.274c0.146,0.018,0.396,0.163,0.637,0.241c-0.283,0.68-0.24,0.524-1.764,1.566 c-1.506,1.033-2.178,1.566-2.271,1.773c-0.139,0.283-0.482,2.865-0.482,5.508s0.189,5.02,0.189,5.86c0,0.354,0,0.976,0.076,1.565 c0.053,0.354,0.129,0.697,0.268,0.966c0.232,0.473,0.447,0.516,1.334,0.473c1.137-0.051,2.779,0,4.477,0.07 c1.135,0.043,2.297,0.086,3.33,0.11c2.582,0.051,1.826-0.379,2.928-0.36c1.102,0.016,5.447,0.196,9.424,0.196 c3.976,0,8.332-0.182,9.423-0.196c1.102-0.019,0.346,0.411,2.926,0.36c1.033-0.018,2.195-0.067,3.332-0.11 c1.695-0.062,3.348-0.121,4.477-0.07c0.886,0.043,1.103,0,1.332-0.473c0.132-0.269,0.218-0.611,0.269-0.966 c0.086-0.592,0.078-1.213,0.078-1.565C49.678,37.793,49.867,35.408,49.867,32.766L49.867,32.766z M13.219,19.735 c0.412-0.964,1.652-2.9,2.256-3.244c0.145-0.087,1.426-0.491,4.637-0.706c2.953-0.198,6.217-0.276,7.73-0.276 c1.513,0,4.777,0.078,7.729,0.276c3.201,0.215,4.502,0.611,4.639,0.706c0.775,0.533,1.842,2.28,2.256,3.244 c0.412,0.965,0.965,2.858,0.861,3.116c-0.104,0.258,0.104,0.388-1.291,0.275c-1.387-0.103-10.088-0.216-15.185-0.216 c-4.088,0-12.789,0.113-15.184,0.216c-1.395,0.104-1.188-0.018-1.291-0.275C12.254,22.593,12.805,20.708,13.219,19.735 L13.219,19.735z M16.385,30.511c-0.619,0.155-0.988,0.491-1.764,0.482c-0.775,0-2.867-0.353-3.314-0.371 c-0.447-0.017-0.842,0.302-1.076,0.362c-0.23,0.06-0.688-0.104-1.377-0.318c-0.688-0.216-1.092-0.155-1.316-1.094 c-0.232-0.93,0-2.264,0-2.264c1.488-0.068,2.928,0.069,5.621,0.826c2.693,0.758,4.191,2.213,4.191,2.213 S17.004,30.357,15.385,30.511L16.385,30.511z M36.629,37.293c-1.23,0.164-6.386,0.207-8.794,0.207c-2.412,0-7.566-0.051-8.799-0.207 c-1.256-0.164-2.891-1.67-1.764-2.865c1.523-1.627,1.24-1.576,4.701-2.023C24.967,32.018,27.239,32,27.834,32 c0.584,0,2.865,0.025,5.859,0.404c3.461,0.447,3.178,0.396,4.699,2.022C39.521,35.623,37.887,37.129,36.629,37.293L36.629,37.293z  M48.129,29.582c-0.232,0.93-0.629,0.878-1.318,1.093c-0.688,0.216-1.145,0.371-1.377,0.319c-0.231-0.053-0.627-0.371-1.074-0.361 c-0.448,0.018-2.539,0.37-3.313,0.37c-0.772,0-1.146-0.328-1.764-0.481c-0.621-0.154-0.966-0.154-0.966-0.154 s1.49-1.464,4.191-2.213c2.693-0.758,4.131-0.895,5.621-0.826C48.129,27.309,48.361,28.643,48.129,29.582L48.129,29.582z",
        },
        {
          value: 0,
          symbol:
            "path://M49.592,40.883c-0.053,0.354-0.139,0.697-0.268,0.963c-0.232,0.475-0.455,0.519-1.334,0.475 c-1.135-0.053-2.764,0-4.484,0.068c0,0.476,0.018,0.697,0.018,0.697c0.111,1.299,0.697,1.342,0.931,1.342h3.7 c0.326,0,0.628,0,0.861-0.154c0.301-0.196,0.43-0.772,0.543-1.78c0.017-0.146,0.025-0.336,0.033-0.56v-0.01 c0-0.068,0.008-0.154,0.008-0.25V41.58l0,0C49.6,41.348,49.6,41.09,49.592,40.883L49.592,40.883z M6.057,40.883 c0.053,0.354,0.137,0.697,0.268,0.963c0.23,0.475,0.455,0.519,1.334,0.475c1.137-0.053,2.762,0,4.484,0.068 c0,0.476-0.018,0.697-0.018,0.697c-0.111,1.299-0.697,1.342-0.93,1.342h-3.7c-0.328,0-0.602,0-0.861-0.154 c-0.309-0.18-0.43-0.772-0.541-1.78c-0.018-0.146-0.027-0.336-0.035-0.56v-0.01c0-0.068-0.008-0.154-0.008-0.25V41.58l0,0 C6.057,41.348,6.057,41.09,6.057,40.883L6.057,40.883z M49.867,32.766c0-2.642-0.344-5.224-0.482-5.507 c-0.104-0.207-0.766-0.749-2.271-1.773c-1.522-1.042-1.487-0.887-1.766-1.566c0.25-0.078,0.492-0.224,0.639-0.241 c0.326-0.034,0.345,0.274,1.023,0.274c0.68,0,2.152-0.18,2.453-0.48c0.301-0.303,0.396-0.405,0.396-0.672 c0-0.268-0.156-0.818-0.447-1.146c-0.293-0.327-1.541-0.49-2.273-0.585c-0.729-0.095-0.834,0-1.022,0.121 c-0.304,0.189-0.32,1.919-0.32,1.919l-0.713,0.018c-0.465-1.146-1.11-3.452-2.117-5.269c-1.103-1.979-2.256-2.599-2.737-2.754 c-0.474-0.146-0.904-0.249-4.131-0.576c-3.298-0.344-5.922-0.388-8.262-0.388c-2.342,0-4.967,0.052-8.264,0.388 c-3.229,0.336-3.66,0.43-4.133,0.576s-1.633,0.775-2.736,2.754c-1.006,1.816-1.652,4.123-2.117,5.269L9.87,23.109 c0,0-0.008-1.729-0.318-1.919c-0.189-0.121-0.293-0.225-1.023-0.121c-0.732,0.104-1.98,0.258-2.273,0.585 c-0.293,0.327-0.447,0.878-0.447,1.146c0,0.267,0.094,0.379,0.396,0.672c0.301,0.301,1.773,0.48,2.453,0.48 c0.68,0,0.697-0.309,1.023-0.274c0.146,0.018,0.396,0.163,0.637,0.241c-0.283,0.68-0.24,0.524-1.764,1.566 c-1.506,1.033-2.178,1.566-2.271,1.773c-0.139,0.283-0.482,2.865-0.482,5.508s0.189,5.02,0.189,5.86c0,0.354,0,0.976,0.076,1.565 c0.053,0.354,0.129,0.697,0.268,0.966c0.232,0.473,0.447,0.516,1.334,0.473c1.137-0.051,2.779,0,4.477,0.07 c1.135,0.043,2.297,0.086,3.33,0.11c2.582,0.051,1.826-0.379,2.928-0.36c1.102,0.016,5.447,0.196,9.424,0.196 c3.976,0,8.332-0.182,9.423-0.196c1.102-0.019,0.346,0.411,2.926,0.36c1.033-0.018,2.195-0.067,3.332-0.11 c1.695-0.062,3.348-0.121,4.477-0.07c0.886,0.043,1.103,0,1.332-0.473c0.132-0.269,0.218-0.611,0.269-0.966 c0.086-0.592,0.078-1.213,0.078-1.565C49.678,37.793,49.867,35.408,49.867,32.766L49.867,32.766z M13.219,19.735 c0.412-0.964,1.652-2.9,2.256-3.244c0.145-0.087,1.426-0.491,4.637-0.706c2.953-0.198,6.217-0.276,7.73-0.276 c1.513,0,4.777,0.078,7.729,0.276c3.201,0.215,4.502,0.611,4.639,0.706c0.775,0.533,1.842,2.28,2.256,3.244 c0.412,0.965,0.965,2.858,0.861,3.116c-0.104,0.258,0.104,0.388-1.291,0.275c-1.387-0.103-10.088-0.216-15.185-0.216 c-4.088,0-12.789,0.113-15.184,0.216c-1.395,0.104-1.188-0.018-1.291-0.275C12.254,22.593,12.805,20.708,13.219,19.735 L13.219,19.735z M16.385,30.511c-0.619,0.155-0.988,0.491-1.764,0.482c-0.775,0-2.867-0.353-3.314-0.371 c-0.447-0.017-0.842,0.302-1.076,0.362c-0.23,0.06-0.688-0.104-1.377-0.318c-0.688-0.216-1.092-0.155-1.316-1.094 c-0.232-0.93,0-2.264,0-2.264c1.488-0.068,2.928,0.069,5.621,0.826c2.693,0.758,4.191,2.213,4.191,2.213 S17.004,30.357,15.385,30.511L16.385,30.511z M36.629,37.293c-1.23,0.164-6.386,0.207-8.794,0.207c-2.412,0-7.566-0.051-8.799-0.207 c-1.256-0.164-2.891-1.67-1.764-2.865c1.523-1.627,1.24-1.576,4.701-2.023C24.967,32.018,27.239,32,27.834,32 c0.584,0,2.865,0.025,5.859,0.404c3.461,0.447,3.178,0.396,4.699,2.022C39.521,35.623,37.887,37.129,36.629,37.293L36.629,37.293z  M48.129,29.582c-0.232,0.93-0.629,0.878-1.318,1.093c-0.688,0.216-1.145,0.371-1.377,0.319c-0.231-0.053-0.627-0.371-1.074-0.361 c-0.448,0.018-2.539,0.37-3.313,0.37c-0.772,0-1.146-0.328-1.764-0.481c-0.621-0.154-0.966-0.154-0.966-0.154 s1.49-1.464,4.191-2.213c2.693-0.758,4.131-0.895,5.621-0.826C48.129,27.309,48.361,28.643,48.129,29.582L48.129,29.582z",
        },
        {
          value: 0,
          symbol:
            "path://M49.592,40.883c-0.053,0.354-0.139,0.697-0.268,0.963c-0.232,0.475-0.455,0.519-1.334,0.475 c-1.135-0.053-2.764,0-4.484,0.068c0,0.476,0.018,0.697,0.018,0.697c0.111,1.299,0.697,1.342,0.931,1.342h3.7 c0.326,0,0.628,0,0.861-0.154c0.301-0.196,0.43-0.772,0.543-1.78c0.017-0.146,0.025-0.336,0.033-0.56v-0.01 c0-0.068,0.008-0.154,0.008-0.25V41.58l0,0C49.6,41.348,49.6,41.09,49.592,40.883L49.592,40.883z M6.057,40.883 c0.053,0.354,0.137,0.697,0.268,0.963c0.23,0.475,0.455,0.519,1.334,0.475c1.137-0.053,2.762,0,4.484,0.068 c0,0.476-0.018,0.697-0.018,0.697c-0.111,1.299-0.697,1.342-0.93,1.342h-3.7c-0.328,0-0.602,0-0.861-0.154 c-0.309-0.18-0.43-0.772-0.541-1.78c-0.018-0.146-0.027-0.336-0.035-0.56v-0.01c0-0.068-0.008-0.154-0.008-0.25V41.58l0,0 C6.057,41.348,6.057,41.09,6.057,40.883L6.057,40.883z M49.867,32.766c0-2.642-0.344-5.224-0.482-5.507 c-0.104-0.207-0.766-0.749-2.271-1.773c-1.522-1.042-1.487-0.887-1.766-1.566c0.25-0.078,0.492-0.224,0.639-0.241 c0.326-0.034,0.345,0.274,1.023,0.274c0.68,0,2.152-0.18,2.453-0.48c0.301-0.303,0.396-0.405,0.396-0.672 c0-0.268-0.156-0.818-0.447-1.146c-0.293-0.327-1.541-0.49-2.273-0.585c-0.729-0.095-0.834,0-1.022,0.121 c-0.304,0.189-0.32,1.919-0.32,1.919l-0.713,0.018c-0.465-1.146-1.11-3.452-2.117-5.269c-1.103-1.979-2.256-2.599-2.737-2.754 c-0.474-0.146-0.904-0.249-4.131-0.576c-3.298-0.344-5.922-0.388-8.262-0.388c-2.342,0-4.967,0.052-8.264,0.388 c-3.229,0.336-3.66,0.43-4.133,0.576s-1.633,0.775-2.736,2.754c-1.006,1.816-1.652,4.123-2.117,5.269L9.87,23.109 c0,0-0.008-1.729-0.318-1.919c-0.189-0.121-0.293-0.225-1.023-0.121c-0.732,0.104-1.98,0.258-2.273,0.585 c-0.293,0.327-0.447,0.878-0.447,1.146c0,0.267,0.094,0.379,0.396,0.672c0.301,0.301,1.773,0.48,2.453,0.48 c0.68,0,0.697-0.309,1.023-0.274c0.146,0.018,0.396,0.163,0.637,0.241c-0.283,0.68-0.24,0.524-1.764,1.566 c-1.506,1.033-2.178,1.566-2.271,1.773c-0.139,0.283-0.482,2.865-0.482,5.508s0.189,5.02,0.189,5.86c0,0.354,0,0.976,0.076,1.565 c0.053,0.354,0.129,0.697,0.268,0.966c0.232,0.473,0.447,0.516,1.334,0.473c1.137-0.051,2.779,0,4.477,0.07 c1.135,0.043,2.297,0.086,3.33,0.11c2.582,0.051,1.826-0.379,2.928-0.36c1.102,0.016,5.447,0.196,9.424,0.196 c3.976,0,8.332-0.182,9.423-0.196c1.102-0.019,0.346,0.411,2.926,0.36c1.033-0.018,2.195-0.067,3.332-0.11 c1.695-0.062,3.348-0.121,4.477-0.07c0.886,0.043,1.103,0,1.332-0.473c0.132-0.269,0.218-0.611,0.269-0.966 c0.086-0.592,0.078-1.213,0.078-1.565C49.678,37.793,49.867,35.408,49.867,32.766L49.867,32.766z M13.219,19.735 c0.412-0.964,1.652-2.9,2.256-3.244c0.145-0.087,1.426-0.491,4.637-0.706c2.953-0.198,6.217-0.276,7.73-0.276 c1.513,0,4.777,0.078,7.729,0.276c3.201,0.215,4.502,0.611,4.639,0.706c0.775,0.533,1.842,2.28,2.256,3.244 c0.412,0.965,0.965,2.858,0.861,3.116c-0.104,0.258,0.104,0.388-1.291,0.275c-1.387-0.103-10.088-0.216-15.185-0.216 c-4.088,0-12.789,0.113-15.184,0.216c-1.395,0.104-1.188-0.018-1.291-0.275C12.254,22.593,12.805,20.708,13.219,19.735 L13.219,19.735z M16.385,30.511c-0.619,0.155-0.988,0.491-1.764,0.482c-0.775,0-2.867-0.353-3.314-0.371 c-0.447-0.017-0.842,0.302-1.076,0.362c-0.23,0.06-0.688-0.104-1.377-0.318c-0.688-0.216-1.092-0.155-1.316-1.094 c-0.232-0.93,0-2.264,0-2.264c1.488-0.068,2.928,0.069,5.621,0.826c2.693,0.758,4.191,2.213,4.191,2.213 S17.004,30.357,15.385,30.511L16.385,30.511z M36.629,37.293c-1.23,0.164-6.386,0.207-8.794,0.207c-2.412,0-7.566-0.051-8.799-0.207 c-1.256-0.164-2.891-1.67-1.764-2.865c1.523-1.627,1.24-1.576,4.701-2.023C24.967,32.018,27.239,32,27.834,32 c0.584,0,2.865,0.025,5.859,0.404c3.461,0.447,3.178,0.396,4.699,2.022C39.521,35.623,37.887,37.129,36.629,37.293L36.629,37.293z  M48.129,29.582c-0.232,0.93-0.629,0.878-1.318,1.093c-0.688,0.216-1.145,0.371-1.377,0.319c-0.231-0.053-0.627-0.371-1.074-0.361 c-0.448,0.018-2.539,0.37-3.313,0.37c-0.772,0-1.146-0.328-1.764-0.481c-0.621-0.154-0.966-0.154-0.966-0.154 s1.49-1.464,4.191-2.213c2.693-0.758,4.131-0.895,5.621-0.826C48.129,27.309,48.361,28.643,48.129,29.582L48.129,29.582z",
        },
      ],
    },
  ],
};

const optionsCascader = [
  {
    value: "T1",
    label: "T1",
    children: [
      {
        value: "long",
        label: "长途",
        children: getArray(),
      },
      {
        value: "pd",
        label: "短途",
        children: getArray(),
        disabled: true,
      },
    ],
  },
  {
    value: "T2",
    label: "T2",
    children: [
      {
        value: "long",
        label: "长途",
        children: getArray(),
      },
      {
        value: "pd",
        label: "短途",
        children: getArray(),
        disabled: true,
      },
    ],
  },
  {
    value: "x",
    label: "不放行",
  },
];

const cascaderValue = ref(["x"]);

const dialogVisible = ref(false);

const releaseStatus = reactive({
  complete: true,
  startTime: "",
  confirm: false,
  confirmTime: "",
  terminal: "",
  type: "",
  total: 0,
  out: 0,
  in: 0,
});

const authDisabled = ref(false);

const doorStatus = reactive({
  T1Pd1: null,
  T1Long1: null,
  T1Long2: null,
  T2Long1: null,
  T2Long2: null,
  T2Pd1: null,
});

const devices = reactive({
  T1: {
    entry: {
      existErr: false,
      tableData: [],
    },
    exit: {
      existErr: false,
      tableData: [],
    },
    screen: {
      existErr: false,
      tableData: [],
    },
  },
  T2: {
    entry: {
      existErr: false,
      tableData: [],
    },
    exit: {
      existErr: false,
      tableData: [],
    },
    screen: {
      existErr: false,
      tableData: [],
    },
  },
  pool: {
    entry: {
      existErr: false,
      tableData: [],
    },
    exit: {
      existErr: false,
      tableData: [],
    },
    screen: {
      existErr: false,
      tableData: [],
    },
  },
});

const client = new Connector(
  (frame) => {
    let fme_data = JSON.parse(frame.body);
    switchData(fme_data.type, fme_data.mark, fme_data.data);
  },
  (frame) => {
    // //console.log("连接断开");
    //console.log(frame);
    // client.offLine();
    client.connect();
  }
);

watch(
  taxiData,
  (taxiData) => {
    //console.log(taxiData);
    optionPoolT1.series[0].data = [taxiData.pool.T1.num];
    optionPoolT1.series[1].data = [taxiDataComputed.value.poolT1Remaining];
    optionPoolT2.series[0].data = [taxiData.pool.T2.num];
    optionPoolT2.series[1].data = [taxiDataComputed.value.poolT2Remaining];
    optionDashbd.series[0].data[0].value = taxiDataComputed.value.poolTotal;
    optionDashbd.series[1].data[0].value = taxiDataComputed.value.poolTotal;
    optionOnroad.series[0].data = [
      taxiData.onRoad.T1.long,
      taxiData.onRoad.T1.pd,
      taxiData.onRoad.T2.long,
      taxiData.onRoad.T2.pd,
    ];
    optionOnroad.title.text =
      "路途车辆" + ": " + taxiDataComputed.value.onWayTotal + "辆";
    optionTermnl.series[0].data[0].value = taxiData.terminal.T1.pd.line1;
    optionTermnl.series[0].data[1].value = taxiData.terminal.T1.long.line1;
    optionTermnl.series[0].data[2].value = taxiData.terminal.T1.long.line2;
    optionTermnl.series[0].data[3].value = taxiData.terminal.T2.long.line1;
    optionTermnl.series[0].data[4].value = taxiData.terminal.T2.long.line2;
    optionTermnl.series[0].data[5].value = taxiData.terminal.T2.pd.line1;

    optionPdT1.series[0].data = [taxiData.pd.T1.num];
    optionPdT1.series[1].data = [taxiDataComputed.value.pdT1Remaining];
    optionPdT2.series[0].data = [taxiData.pd.T2.num];
    optionPdT2.series[1].data = [taxiDataComputed.value.pdT2Remaining];

    update();
  },
  { deep: true }
);

onMounted(() => {
  init();
  func_no.value = localStorage.getItem('func_no');
});

onBeforeUnmount(() => {
  client.offLine();
});

const handleChange = async (value) => {
  if (value[0] == "x") {
    await axios.post("/api/end_batch").then((res) => {
      //console.log(res);
    });
  } else {
    dialogVisible.value = true;
  }
};

const confirm = async () => {
  let params = {
    terminal: cascaderValue.value[0],
    type: cascaderValue.value[1],
    num: Number(cascaderValue.value[2]),
  };
  await axios.post("/api/start_batch", params).then((res) => {
    dialogVisible.value = false;
  });
}

const cancel = async (value) => {
  dialogVisible.value = false;
  getBatch();
}

const authorize = async () => {
  if (!validateCarNo(carNo.value)) {
    return;
  } else {
    let params = {
      carid: carNo.value,
      user: localStorage.getItem("user"),
    };
    authDisabled.value = true;
    await axios.post("/api/set_user_pd", params).then((res) => {
      //console.log(res.data);
      ElMessage({
        message: "授权成功",
        type: "success",
      });
      carNo.value = "";
      authDisabled.value = false;
    });
  }
};

const setDoorOnce = async (number) => {
  ////console.log(number);
  let param = {
    user: localStorage.getItem("user"),
    terminal: "T1",
    type: "pd",
    line: "1",
  };

  switch (number) {
    case 1:
      ////console.log(number,1);
      // param.terminal = "T1";
      // param.type = "long";
      break;
    case 2:
      ////console.log(number,2);
      param.terminal = "T1";
      param.type = "long";
      param.line = "1";
      break;
    case 3:
      ////console.log(number,3);
      param.terminal = "T1";
      param.type = "long";
      param.line = "2";
      break;
    case 4:
      ////console.log(number,4);
      param.terminal = "T2";
      param.type = "long";
      param.line = "1";
      break;
    case 5:
      ////console.log(number,5);
      param.terminal = "T2";
      param.type = "long";
      param.line = "2";
      break;
    case 6:
      ////console.log(number,6);
      param.terminal = "T2";
      param.type = "pd";
      param.line = "1";
      break;
    default:
      break;
  }

  await axios.post("/api/set_door_once", param).then((res) => {
    //console.log(param);
    //console.log(res.data);
  });
};

async function init() {
  releaseStatus.confirm;
  await axios.get("/api/get_taxi_num").then((res) => {
    let data = res.data;
    switchData("web", "status_num", data);

    echartT1Pool = echarts.init(containerPoolT1.value);
    echartT2Pool = echarts.init(containerPoolT2.value);
    echartPdT1 = echarts.init(containerPdT1.value);
    echartPdT2 = echarts.init(containerPdT2.value);
    echartDashbd = echarts.init(containerDashbd.value);
    echartOnroad = echarts.init(containerOnroad.value);
    echartTermnl = echarts.init(containerTermnl.value);
    update();
    client.connect();
  });
  getBatch();
  get_b_door();
}

async function getBatch() {
  await axios.get("/api/get_batch").then((res) => {
    let data = res.data;
    console.log(data);
    if (data.length) {
      cascaderValue.value = [
        data[0].TERMINAL,
        data[0].TYPE,
        data[0].NUM.toString(),
      ];
      releaseStatus.complete = false;
      releaseStatus.startTime = data[0].START_TIME;
      releaseStatus.terminal = data[0].TERMINAL;
      releaseStatus.type = data[0].TYPE;
      releaseStatus.total = data[0].NUM;
      releaseStatus.out = data[0].OUT_NUM;
      releaseStatus.in = data[0].POOL_NUM;

      // let timestamp =
      //   new dayjs(data[0].START_TIME).valueOf() +
      //   Math.floor(Math.random() * 10000);
      // releaseStatus.confirm = true;
      // releaseStatus.confirmTime = dayjs(timestamp).format(
      //   "YYYY-MM-DD HH:mm:ss"
      // );
    } else {
      releaseStatus.confirm = false;
      releaseStatus.complete = true;
      cascaderValue.value = "x";
    }
  });
}

async function get_b_door() {
  //console.log("get_b_door");
  await axios.get("/api/get_b_door").then((res) => {
    let str = null;
    //console.log(res.data);
    res.data.forEach((item, index) => {
      if (item.PROCESS == "terminal_in") {
        str = item.TERMINAL + " " + item.TYPE + " " + item.LINE;
        switch (str) {
          case "T2 pd 1":
            //console.log(str, item.ONCE);
            doorStatus.T2Pd1 = item.ONCE;
            break;
          case "T2 long 1":
            //console.log(str, item.ONCE);
            doorStatus.T2Long1 = item.ONCE;
            break;
          case "T2 long 2":
            //console.log(str, item.ONCE);
            doorStatus.T2Long2 = item.ONCE;
            break;
          case "T1 pd 1":
            //console.log(str, item.ONCE);
            doorStatus.T1Pd1 = item.ONCE;
            break;
          case "T1 long 1":
            //console.log(str, item.ONCE);
            doorStatus.T1Long1 = item.ONCE;
            break;
          case "T1 long 2":
            //console.log(str, item.ONCE);
            doorStatus.T1Long2 = item.ONCE;
            break;
          default:
            break;
        }
      } else {
        //不做操作
      }
    });
    //console.log(doorStatus);
  });
}

function update() {
  echartT1Pool.setOption(optionPoolT1);
  echartT2Pool.setOption(optionPoolT2);
  echartPdT1.setOption(optionPdT1);
  echartPdT2.setOption(optionPdT2);
  echartDashbd.setOption(optionDashbd);
  echartOnroad.setOption(optionOnroad);
  echartTermnl.setOption(optionTermnl);
}

function getArray() {
  let arr = [];
  for (let i = 1; i <= 70; i++) {
    if (i % 5 == 0) {
      let item = {
        value: `${i}`,
        label: `${i}`,
      };
      i > 55 ? (item.disabled = true) : null;
      arr.push(item);
    } else {
      continue;
    }
  }
  return arr;
}

function switchData(type, mark, data) {
  console.log(type, mark, data);
  switch (type) {
    case "warning":
      switch (mark) {
        case "confirm":
          releaseStatus.confirm = true;
          releaseStatus.confirmTime = data[0].time;
          break;
        default:
          break;
      }
      break;
    case "web":
      switch (mark) {
        case "status_num":
          data.forEach((item, index) => {
            /*//console.log(
              typeof item.ID !== "undefined" ? item.ID : item.num,
              typeof item.NUM !== "undefined" ? item.NUM : item.num
            );*/
            switch (typeof item.ID !== "undefined" ? item.ID : item.id) {
              case "pdT1":
                taxiData.pd.T1.num =
                  typeof item.NUM !== "undefined" ? item.NUM : item.num;
                break;
              case "pdT2":
                taxiData.pd.T2.num =
                  typeof item.NUM !== "undefined" ? item.NUM : item.num;
                break;
              case "poolT1":
                /*//console.log(
                  typeof item.NUM !== "undefined" ? item.NUM : item.num
                );*/
                taxiData.pool.T1.num =
                  typeof item.NUM !== "undefined" ? item.NUM : item.num;
                break;
              case "poolT2":
                taxiData.pool.T2.num =
                  typeof item.NUM !== "undefined" ? item.NUM : item.num;
                break;
              case "wayT1long":
                taxiData.onRoad.T1.long =
                  typeof item.NUM !== "undefined" ? item.NUM : item.num;
                break;
              case "wayT2long":
                taxiData.onRoad.T2.long =
                  typeof item.NUM !== "undefined" ? item.NUM : item.num;
                break;
              case "wayT1pd":
                taxiData.onRoad.T1.pd =
                  typeof item.NUM !== "undefined" ? item.NUM : item.num;
                break;
              case "wayT2pd":
                taxiData.onRoad.T2.pd =
                  typeof item.NUM !== "undefined" ? item.NUM : item.num;
                break;
              case "terminalT1long1":
                taxiData.terminal.T1.long.line1 =
                  typeof item.NUM !== "undefined" ? item.NUM : item.num;
                break;
              case "terminalT1long2":
                taxiData.terminal.T1.long.line2 =
                  typeof item.NUM !== "undefined" ? item.NUM : item.num;
                break;
              case "terminalT1pd1":
                taxiData.terminal.T1.pd.line1 =
                  typeof item.NUM !== "undefined" ? item.NUM : item.num;
                break;
              case "terminalT2long1":
                taxiData.terminal.T2.long.line1 =
                  typeof item.NUM !== "undefined" ? item.NUM : item.num;
                break;
              case "terminalT2long2":
                taxiData.terminal.T2.long.line2 =
                  typeof item.NUM !== "undefined" ? item.NUM : item.num;
                break;
              case "terminalT2pd1":
                taxiData.terminal.T2.pd.line1 =
                  typeof item.NUM !== "undefined" ? item.NUM : item.num;
                break;
              default:
                break;
            }
          });
          ////console.log(taxiData);
          break;
        case "pool_out_countdown":
          if (data.num) {
            releaseStatus.terminal = data.terminal;
            releaseStatus.type = data.type;
            releaseStatus.total = data.total;
            releaseStatus.out = data.total - data.num;
            releaseStatus.in = data.num;
          } else {
            releaseStatus.confirm = false;
            releaseStatus.complete = true;
            cascaderValue.value = "x";
          }
          break;
        case "start_batch":
          cascaderValue.value = [data.terminal, data.type, data.num.toString()];
          releaseStatus.complete = false;
          releaseStatus.startTime = data.starttime.split(".")[0];
          releaseStatus.terminal = data.terminal;
          releaseStatus.type = data.type;
          releaseStatus.total = data.num;
          releaseStatus.out = 0;
          releaseStatus.in = data.num;
          //console.log("releaseStatus", releaseStatus);
          break;
        case "end_batch":
          releaseStatus.confirm = false;
          releaseStatus.complete = true;
          cascaderValue.value = "x";
          break;
        case "once":
          let str = null;
          //console.log(data);
          data.forEach((item, index) => {
            if (item.PROCESS == "terminal_in") {
              str = item.TERMINAL + " " + item.TYPE + " " + item.LINE;
              switch (str) {
                case "T2 pd 1":
                  doorStatus.T2Pd1 = item.ONCE;
                  //console.log(item.ONCE);

                  break;
                case "T2 long 1":
                  doorStatus.T2Long1 = item.ONCE;
                  //console.log(item.ONCE);

                  break;
                case "T2 long 2":
                  doorStatus.T2Long2 = item.ONCE;
                  //console.log(item.ONCE);

                  break;
                case "T1 pd 1":
                  doorStatus.T1Pd1 = item.ONCE;
                  //console.log(item.ONCE);

                  break;
                case "T1 long 1":
                  doorStatus.T1Long1 = item.ONCE;
                  //console.log(item.ONCE);

                  break;
                case "T1 long 2":
                  doorStatus.T1Long2 = item.ONCE;
                  //console.log(item.ONCE);

                  break;
                default:
                  break;
              }
            } else {
              //不做操作
            }
          });
          break;
        case "device":
          for (let obj in devices) {
            devices[obj].entry.tableData.length = 0;
            devices[obj].exit.tableData.length = 0;
            devices[obj].screen.tableData.length = 0;
          }
          data.forEach((item) => {
            item.IP
              ? null
              : (item.IP = item.URL.substring(item.URL.lastIndexOf("/") + 1));
            if (item.LOCATION == "T1" && item.STATUS != "success") {
              if (item.STATUS == "error") {
                devices.T1[item.GROUP].existErr = true;
              } else {
                devices.T1[item.GROUP].existErr = false;
              }
              devices.T1[item.GROUP].tableData.push(item);
            } else if (item.LOCATION == "T2" && item.STATUS != "success") {
              if (item.STATUS == "error") {
                devices.T2[item.GROUP].existErr = true;
              } else {
                devices.T2[item.GROUP].existErr = false;
              }
              devices.T2[item.GROUP].tableData.push(item);
            } else if (
              item.LOCATION == "pool" &&
              item.GROUP != "client" &&
              item.STATUS != "success"
            ) {
              if (item.STATUS == "error") {
                devices.pool[item.GROUP].existErr = true;
              } else {
                devices.pool[item.GROUP].existErr = false;
              }
              devices.pool[item.GROUP].tableData.push(item);
            } else {
              return;
            }
          });
          break;
        default:
          break;
      }
      break;
    default:
      break;
  }
}
</script>

<style lang="less" scoped>
.container {
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  width: 100%;
  height: 100%;

  .echart-container-pool {
    .el-card {
      width: 100%;
      height: 340px;

      .switch-control {
        position: absolute;
        top: -2px;
        right: 0;
      }

      .control-button-box {
        display: flex;
        flex-direction: column;

        .el-button:nth-child(1) {
          margin: 80px 0 0 0;
        }

        .el-button:nth-child(2) {
          margin: 92px 0 0 0;
        }
      }

      .echart-box {
        width: 100%;
        height: 150px;
      }

      .label-box {
        height: 300px;
        display: flex;
        flex-direction: column;
        justify-content: space-around;
        font-weight: 600;

        .title-box {
          position: absolute;
          top: 50%;
          transform: translateY(-50%);
        }

        .icon-box {
          white-space: nowrap;
          display: flex;
          justify-content: space-around;

          .icon-item {
            text-align: center;

            .item-box {
              display: flex;
              width: 50px;
              height: 60px;
              flex-direction: column;
              justify-content: space-around;

              .el-icon {
                display: block;
                width: 100%;
              }

              .el-text {
                width: 100%;
                display: block;
              }
            }
          }
        }
      }
    }
  }

  .panel-box {
    margin-top: 20px;
    flex: 1;

    .info-box {
      display: flex;
      flex-direction: column;
      justify-content: space-between;
      height: 490px;

      .el-card:nth-child(3) {
        height: 190px;
        margin-bottom: -2px;

        div {
          position: relative;
          height: 95px;
          text-align: center;
        }
      }

      .cascader-box {
        width: 100%;
        display: flex;
        flex-direction: column;
        justify-content: center;
      }

      .input-box {
        width: 100%;
        display: flex;
        justify-content: space-between;

        .el-input {
          font-size: 13px;
        }

        .input-button {
          width: 80px;
        }
      }

      .info-releaseStatus {
        position: relative;
        top: 30px;
        font-weight: 600;
        font-size: 24px;
      }

      .info-release-complete {
        display: inline-block;
        text-align: center;
        height: 94px;
        display: flex;
        flex-direction: column;
        justify-content: space-around;

        h3,
        h4 {
          margin: 0;
          padding: 0;
        }

        h3 {
          .el-text {
            font-size: 20px;
          }
        }

        h4:nth-of-type(1) {
          .el-text:nth-child(2) {
            font-size: 16px;
          }

          .el-text:nth-child(4) {
            font-size: 16px;
          }
        }

        h4:nth-of-type(2) {
          .el-text {
            font-size: 13px;
          }
        }
      }
    }

    .echart-box {
      // width: 450px;
      height: 490px;

      .el-card:nth-of-type(1) {
        height: 490px;

        .echart-panle {
          height: 450px;
        }

        .button-box {
          display: flex;
          flex-direction: column;
          justify-content: center;
          width: 100%;
          height: 450px;

          .el-button:nth-child(1) {
            margin-top: -5px;
          }

          .el-button {
            width: 60px;
            margin: 14px 0;
          }
        }
      }
    }

    .dashboard-box {
      display: flex;
      height: 490px;
      flex-direction: column;
      justify-content: space-between;

      .el-card:nth-of-type(1) {
        height: 320px;

        div {
          width: 100%;
          height: 320px;
        }
      }

      .el-card:nth-of-type(2) {
        height: 150px;
        margin-bottom: -2px;

        .confirm-box {
          text-align: center;
          position: relative;
          top: 10px;

          .el-tag {
            font-size: 14px;
            font-weight: 600;
          }

          .el-text {
            font-size: 16px;
            font-weight: 600;
          }
        }
      }
    }
  }
}
</style>
<style>
.cascader-style {
  overflow: hidden;
  height: 130px;
}
</style>
