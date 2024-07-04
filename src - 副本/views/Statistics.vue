<template>
  <div class="container">
    <el-row :gutter="20">
      <el-col :span="12">
        <el-card>
          <div>
            <el-date-picker
              v-model="date"
              type="date"
              placeholder="请选择查询日期"
              value-format="YYYY-MM-DD"
            />
            <el-button @click="selectByDate">按日查询</el-button>
            <el-button @click="getCurrentDate('date')">本日统计</el-button>
          </div>
        </el-card>
      </el-col>
      <el-col :span="12">
        <el-card>
          <div>
            <el-date-picker
              style="position: relative; width: 200px"
              v-model="week"
              type="daterange"
              range-separator="至"
              start-placeholder="开始日期"
              end-placeholder="结束日期"
              value-format="YYYY-MM-DD"
              @change="handleChange"
              @calendar-change="handlecldChange"
              :disabled-date="disabledDate"
            />
            <el-button @click="selectByWeek">按周查询</el-button>
            <el-button @click="getCurrentDate('week')">本周统计</el-button>
          </div>
        </el-card>
      </el-col>
    </el-row>

    <el-row :gutter="20">
      <el-col :span="12">
        <el-card>
          <div>
            <el-date-picker
              v-model="month"
              type="month"
              placeholder="请选择查询月份"
              value-format="YYYY-MM"
            />
            <el-button @click="selectByMonth">按月查询</el-button>
            <el-button @click="getCurrentDate('month')">本月统计</el-button>
          </div>
        </el-card>
      </el-col>
      <el-col :span="12">
        <el-card>
          <div>
            <el-date-picker
              v-model="year"
              type="year"
              placeholder="请选择查询年份"
              value-format="YYYY"
            />
            <el-button @click="selectByYear">按年查询</el-button>
            <el-button @click="getCurrentDate('year')">本年统计</el-button>
          </div>
        </el-card>
      </el-col>
    </el-row>

    <el-row :gutter="20">
      <el-col :span="12">
        <el-card>
          <div
            id="echartTerminalContainer"
            style="width: 100%; height: 625px"
          ></div>
        </el-card>
      </el-col>

      <el-col :span="12">
        <el-card>
          <div
            id="echartPoolContainer"
            style="width: 100%; height: 625px"
          ></div>
        </el-card>
      </el-col>
    </el-row>
  </div>
</template>

<script setup>
import { ref, reactive, onMounted, watch } from "vue";
import axios from "axios";
import * as echarts from "echarts";
// import zhCn from "element-plus/lib/locale/lang/zh-cn";

// const locale = zhCn;

const chooseDay = ref(null);
const date = ref();
const week = ref([]);
const month = ref();
const year = ref();

const T1LongTaxi = ref([]);
const T2LongTaxi = ref([]);
const T2ShortTaxi = ref([]);
const T1TaxiStorage = ref([]);
const T2TaxiStorage = ref([]);

let echartTerminal = null;
let echartPool = null;
let terminalOption = {
  title: {
    text: "航站楼车辆统计",
  },
  tooltip: {
    trigger: "axis",
  },
  legend: {
    data: ["T1长途", "T2补偿", "T2长途"],
  },
  grid: {
    left: "3%",
    right: "4%",
    bottom: "3%",
    containLabel: true,
  },
  toolbox: {
    feature: {
      saveAsImage: {},
    },
  },
  xAxis: {
    type: "category",
    boundaryGap: false,
    data: [],
  },
  yAxis: {
    type: "value",
  },
  series: [
    {
      name: "T1长途",
      type: "line",
      data: T1LongTaxi.value,
    },
    {
      name: "T2补偿",
      type: "line",
      data: T2ShortTaxi.value,
    },
    {
      name: "T2长途",
      type: "line",
      data: T2LongTaxi.value,
    },
  ],
};
let poolOption = {
  title: {
    text: "蓄车场车辆统计",
  },
  tooltip: {
    trigger: "axis",
  },
  legend: {
    data: ["T1", "T2"],
  },
  grid: {
    left: "3%",
    right: "4%",
    bottom: "3%",
    containLabel: true,
  },
  toolbox: {
    feature: {
      saveAsImage: {},
    },
  },
  xAxis: {
    type: "category",
    boundaryGap: false,
    data: [],
  },
  yAxis: {
    type: "value",
  },
  series: [
    {
      name: "T1",
      type: "line",
      data: T1TaxiStorage.value,
    },
    {
      name: "T2",
      type: "line",
      data: T2TaxiStorage.value,
    },
  ],
};

onMounted(() => {
  init();
});

function init() {
  let echartTerminalContainer = document.getElementById(
    "echartTerminalContainer"
  );
  let echartPoolContainer = document.getElementById("echartPoolContainer");
  echartTerminal = echarts.init(echartTerminalContainer);
  echartPool = echarts.init(echartPoolContainer);

  let axis = [];
  for (let i = 0; i < 24; i++) {
    let str = "";
    if (i < 10) {
      str = "0" + i;
    } else {
      str = i.toString();
    }
    axis.push(str);
  }
  terminalOption.xAxis.data = axis;
  poolOption.xAxis.data = axis;
  echartTerminal.setOption(terminalOption);
  echartPool.setOption(poolOption);
}

const disabledDate = (time) => {
  if (chooseDay.value) {
    return (
      time.getTime() < new Date(chooseDay.value).getTime() ||
      time.getTime() >
        new Date(chooseDay.value).getTime() + 6 * 24 * 3600 * 1000
    );
  } else {
    return time.getTime() > new Date().getTime();
  }
};

const handleChange = (value) => {
  chooseDay.value = null;
};

const handlecldChange = (value) => {
  let [startDay] = value;
  chooseDay.value = startDay;
};

const formatData = (scale, data) => {
  T1LongTaxi.value.splice(0);
  T2LongTaxi.value.splice(0);
  T2ShortTaxi.value.splice(0);
  T1TaxiStorage.value.splice(0);
  T2TaxiStorage.value.splice(0);

  let axis = [];
  switch (scale) {
    case "date":
      data.terminalT1.forEach((item) => {
        axis.push(item.HOUR);
        T1LongTaxi.value.push(item.NUM);
      });
      break;
    case "year":
      data.terminalT1.forEach((item) => {
        axis.push(item.MONTH);
        T1LongTaxi.value.push(item.NUM);
      });
      break;
    default:
      data.terminalT1.forEach((item) => {
        axis.push(item.DAY);
        T1LongTaxi.value.push(item.NUM);
      });
      break;
  }
  terminalOption.xAxis.data = axis;
  poolOption.xAxis.data = axis;

  data.terminalT2long.forEach((item) => {
    T2LongTaxi.value.push(item.NUM);
  });
  data.terminalT2short.forEach((item) => {
    T2ShortTaxi.value.push(item.NUM);
  });
  data.poolT1.forEach((item) => {
    T1TaxiStorage.value.push(item.NUM);
  });
  data.poolT2.forEach((item) => {
    T2TaxiStorage.value.push(item.NUM);
  });
  echartTerminal.setOption(terminalOption);
  echartPool.setOption(poolOption);
};
const getCurrentDate = (tag) => {
  let timer = new Date();
  let mnth = timer.getMonth() + 1;
  let day = timer.getDate();

  if (mnth >= 1 && mnth <= 9) {
    mnth = "0" + mnth;
  }
  if (day >= 0 && day <= 9) {
    day = "0" + day;
  }

  switch (tag) {
    case "date":
      date.value = timer.getFullYear() + "-" + mnth + "-" + day;
      selectByDate();
      break;
    case "week":
      let startTime = timer.getTime() - (timer.getDay() - 1) * 24 * 3600 * 1000;
      let endTime = timer.getTime() - (timer.getDay() - 7) * 24 * 3600 * 1000;
      let startMnth = new Date(startTime).getMonth() + 1;
      let startDay = new Date(startTime).getDate();
      let endMnth = new Date(endTime).getMonth() + 1;
      let endDay = new Date(endTime).getDate();

      if (startMnth >= 1 && startMnth <= 9) {
        startMnth = "0" + startMnth;
      }
      if (startDay >= 0 && startDay <= 9) {
        startDay = "0" + startDay;
      }
      if (endMnth >= 1 && endMnth <= 9) {
        endMnth = "0" + endMnth;
      }
      if (endDay >= 0 && endDay <= 9) {
        endDay = "0" + endDay;
      }
      week.value ? null : (week.value = []);
      week.value[0] = timer.getFullYear() + "-" + startMnth + "-" + startDay;
      week.value[1] = timer.getFullYear() + "-" + endMnth + "-" + endDay;
      selectByWeek();
      break;
    case "month":
      month.value = timer.getFullYear() + "-" + mnth;
      selectByMonth();
      break;
    case "year":
      year.value = timer.getFullYear().toString();
      console.log(year.value);
      selectByYear();
      break;
    default:
      break;
  }
};

function validate(value) {
  if (!value) {
    ElMessage({
      message: "请输入查询时间",
      type: "warning",
    });
    return false;
  } else {
    return true;
  }
}

const selectByDate = async () => {
  if (!validate(date.value)) {
    return;
  } else {
    let params = {
      date: date.value,
    };
    await axios.get("/api/get_num_history_day", { params }).then((res) => {
      let data = res.data;
      formatData("date", data);
    });
  }
};
const selectByWeek = async () => {
  week.value ? null : (week.value = []);
  if (!validate(week.value[0])) {
    return;
  } else {
    let params = {
      date: week.value[0],
    };
    console.log("selectByWeek", params.date);
    await axios.get("/api/get_num_history_week", { params }).then((res) => {
      let data = res.data;
      formatData("week", data);
    });
  }
};
const selectByMonth = async () => {
  if (!validate(month.value)) {
    return;
  } else {
    let params = {
      year_month: month.value,
    };
    console.log(params);
    await axios.get("/api/get_num_history_month", { params }).then((res) => {
      console.log(res.data);
      let data = res.data;
      formatData("month", data);
    });
  }
};
const selectByYear = async () => {
  if (!validate(year.value)) {
    return;
  } else {
    let params = {
      year: year.value,
    };
    await axios.get("/api/get_num_history_year", { params }).then((res) => {
      let data = res.data;
      formatData("year", data);
    });
  }
};
</script>

<style lang="less" scoped>
.container {
  height: 100%;
  .el-row {
    margin-top: 20px;
    .el-col {
      .el-card {
        div {
          text-align: center;
        }
      }
    }
  }

  .el-row:nth-child(1){
    margin-top: 0;
  }
}
</style>
