<template>
  <div class="container">
    <el-row>
      <el-col :span="3"></el-col>
      <el-col :span="8">
        <el-card style="height: 100%;">
          <div style="text-align: center">
            <el-config-provider :locale="locale">
              <el-input :disabled="!!judge_id" v-model="carNo" placeholder="请输入车牌" class="input-with-select"
                style="max-width: 480px">
                <template #prepend>
                  <el-date-picker :disabled="!!judge_id" style="margin: 0 -20px 0 -20px; width: 350px"
                    v-model="dateTime" type="datetimerange" range-separator="To" start-placeholder="开始时间"
                    end-placeholder="结束时间" value-format="YYYY-MM-DD HH:mm:ss" :disabled-date="disabledDate" />
                </template>
              </el-input>
            </el-config-provider>
          </div>
          <div style="
              margin: 0 16px;
              display: flex;
              margin-top: 10px;
              justify-content: space-between;
              padding: 0 3px;
            ">
            <div style=" display: flex; justify-content: space-around;">
              <el-button @click="getData('today')" :disabled="!!judge_id">查询今日数据</el-button>
              <el-button @click="getData()" :disabled="!!judge_id">查询历史数据</el-button>
            </div>
            <div class="button-wrap">
              <el-button class="button" type="warning" plain @click="authorize" style="width: 110px"
                :disabled="!!judge_id || !func_no.includes('5')">授权</el-button>
            </div>
          </div>
        </el-card>
      </el-col>
      <el-col :span="2"></el-col>
      <el-col :span="8">
        <el-card style="height: 114px;display: flex; flex-direction: column;justify-content: space-around;">
          <div v-if="users.length" v-for="(item, index) in users">
            <el-text>姓名：{{ item.name }}</el-text>
            <el-text>&nbsp&nbsp&nbsp&nbsp&nbsp电话：{{ item.phone }}</el-text>
            <el-text>&nbsp&nbsp&nbsp&nbsp&nbsp公司：{{ item.gongsi }}</el-text>
          </div>
          <div v-else>
            该车牌没有用户信息
          </div>
        </el-card>
      </el-col>
      <el-col :span="3"></el-col>
    </el-row>
    <el-row class="list-box">
      <el-col :span="3"></el-col>
      <el-col :span="8">
        <el-card :style="`margin-bottom: 20px; ${judge_id ? 'height: 420px' : ''};`"
          v-for="(item, index) in processData">
          <el-row>
            <el-col :span="12">
              <el-timeline style="height: 220px;">
                <el-timeline-item :timestamp="item.POOL_IN_TIME ? item.POOL_IN_TIME : '没有时间记录'
        ">
                  蓄车场驶入时间
                </el-timeline-item>
                <el-timeline-item :timestamp="item.POOL_OUT_TIME ? item.POOL_OUT_TIME : '没有时间记录'
        ">
                  蓄车场驶出时间
                </el-timeline-item>
                <el-timeline-item :timestamp="item.TERMINAL_IN_TIME
        ? item.TERMINAL_IN_TIME
        : '没有时间记录'
        ">
                  航站楼驶入时间
                </el-timeline-item>
                <el-timeline-item :timestamp="item.TERMINAL_OUT_TIME
        ? item.TERMINAL_OUT_TIME
        : '没有时间记录'
        ">
                  航站楼驶出时间
                </el-timeline-item>
              </el-timeline>
            </el-col>
            <el-col :span="12">
              <div style="display: flex;height: 140px;flex-direction: column;justify-content: center;">
                <div>
                  压表时间：{{
        item.TIME_GET_ON
          ? item.TIME_GET_ON
          : buffer[index].TIME_GET_ON
      }}
                </div>
                <div style="margin: 20px 0;">
                  抬表时间：{{
          item.TIME_GET_OFF
            ? item.TIME_GET_OFF
            : buffer[index].TIME_GET_OFF
        }}
                </div>
                <div>
                  订单路程：{{
          item.RUN_ODOMETER
            ? item.RUN_ODOMETER
            : buffer[index].RUN_ODOMETER
        }}
                </div>
              </div>
              <div style="height: 80px;position: relative;">
                <el-button :disabled="processData[index].TERMINAL_OUT_TIME ? false : true"
                  style="position: absolute; bottom: 0px; left: 0" @click="gotoShowPath(1, index, 'terminal')">
                  <el-icon>
                    <OfficeBuilding />
                  </el-icon>离站路径
                </el-button>
                <el-button :disabled="processData[index].TIME_GET_ON && processData[index].TIME_GET_OFF ? false : true" style="position: absolute; bottom: 0px; right: 0" @click="gotoShowPath(1, index, 'metter')">
                  <el-icon>
                    <Timer />
                  </el-icon>打表路径
                </el-button>
                <!-- <el-button v-show="!judge_id" :disabled="!buffer[index].TIME_GET_ON"
                  style="position: absolute; bottom: 0px; right: 0" @click="gotoShowPath(1, index)">查看路径</el-button>
                <el-button v-if="item.TIME_GET_ON" @click="Unbinding(item)" style="margin-left: 0"
                  :disabled="!!judge_id">解绑</el-button>
                <el-button v-else :disabled="!btnDisabled" @click="binding(index)" style="margin-left: 0">绑定</el-button>
                <el-button v-show="Index == index ? !btnDisabled : false" @click="confirm(item)">确定</el-button>
                <el-button v-show="Index == index ? !btnDisabled : false" @click="cancle(index)">取消</el-button> -->
              </div>
            </el-col>
          </el-row>
          <el-row v-if="Boolean(judge_id)">
            <el-col :span="12">
              <div class="img-box">
                <img :src="imgSrc" alt="" @click="preview()">
              </div>
            </el-col>
            <el-col :span="12">
              <div class="input-wrap">
                <el-row>
                  <el-col :span="8"><text>压表时间:</text></el-col>
                  <el-col :span="16"><el-date-picker :disabled="!Boolean(processid)" :disabled-date="disabledDate"
                      style="width: 173px;" size="small" v-model="reviewTime" type="datetime"
                      placeholder="请输入压表时间" /></el-col>
                </el-row>
                <el-row style="margin-top: 10px;">
                  <el-col :span="8"><text>公里数:</text></el-col>
                  <el-col :span="16"><el-input :disabled="!Boolean(processid)" v-model="mileage" size="small"><template
                        #append>km</template></el-input></el-col>
                </el-row>
              </div>
            </el-col>
          </el-row>
          <el-row v-if="Boolean(judge_id)">
            <!-- <div v-if="!flag" class="button-box">
                <el-button type="primary" @click="showPass = true">通过</el-button>
                <el-button type="warning" @click="showReject = !showReject">驳回</el-button>
              </div> -->
            <div class="button-box">
              <el-button :disabled="flag" type="primary" @click="showPass = true">通过</el-button>
              <el-button :disabled="flag" type="warning" @click="showReject = !showReject">驳回</el-button>
            </div>
          </el-row>
        </el-card>
        <el-card class="record-box" v-for="item in recordData">
          <el-text>离开<el-text style="color: #00BFFF;">&nbsp{{ item.TERMINAL
              }}&nbsp</el-text>航站楼时间&nbsp&nbsp&nbsp&nbsp&nbsp</el-text>
          <el-text>{{ item.TERMINAL_OUT_TIME }}</el-text>
          <el-text :type="`${item.PD == 'system' ? 'primary' : 'warning'}`" class="tag">{{ item.PD == "system" ? "系统"
        :
        "人工" }}</el-text>
        </el-card>
      </el-col>
      <el-col :span="2"></el-col>
      <el-col :span="8" style="position: relative">
        <el-table :data="tableData" style="width: 100%" height="720px">
          <el-table-column prop="TIME_GET_ON" label="压表时间" width="180" />
          <el-table-column prop="TIME_GET_OFF" label="抬表时间" width="180" />
          <el-table-column prop="RUN_ODOMETER" label="里程/km" width="88" />
          <el-table-column>
            <template #default="scope">
              <el-button v-if="Boolean(judge_id)" size="small" @click="
        $router.push({
          path: '/showPath',
          query: {
            carNo,
            dateTime: [
              scope.row.TIME_GET_ON,
              scope.row.TIME_GET_OFF,
            ],
          },
        })
        ">
                <el-icon>
                  <MapLocation />
                </el-icon>
              </el-button>
              <el-button v-else size="small" @click="$router.push({
        path: '/showPath',
        query: {
          carNo,
          dateTime: [
            scope.row.TIME_GET_ON,
            scope.row.TIME_GET_OFF,
          ],
        },
      })">
                <el-icon>
                  <MapLocation />
                </el-icon>
              </el-button>
            </template>
          </el-table-column>
        </el-table>
        <div v-if="!tableData.length && judge_id" class="table-mark">
          <el-button @click="gotoShowPath(-1, 0)">查询路径</el-button>
        </div>
      </el-col>
      <el-col :span="3"></el-col>
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
    <div v-if="showReject" class="reject-wrap">
      <div class="reject-box">
        <div class="reject-title">驳回原因</div>
        <div class="reject-content">
          <el-select class="select" v-model="selectValue" placeholder="驳回原因" style="width: 240px">
            <el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value" />
          </el-select>
          <el-input v-model="note" :rows="6" type="textarea" placeholder="请输入驳回原因" />
        </div>
        <div class="reject-button">
          <el-button @click="showReject = !showReject; selectValue = ''">取消</el-button>
          <el-button type="primary" @click="audit(-1)">确认</el-button>
        </div>
      </div>
    </div>
    <div v-if="showPass" class="reject-wrap">
      <div class="reject-box">
        <div class="reject-title">确认通过审核</div>
        <div class="reject-content">
        </div>
        <div class="reject-button">
          <el-button @click="showPass = false">取消</el-button>
          <el-button type="primary" @click="audit(1)">确认</el-button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import axios from "axios";
import { ref, reactive, watch, onActivated, onDeactivated } from "vue";
import dayjs from "dayjs";

import { OfficeBuilding, Timer, MapLocation } from "@element-plus/icons-vue";
import zhCn from "element-plus/es/locale/lang/zh-cn";
import validateCarNo from "../util/tools.js";
import { useRouter } from "vue-router";
import {
  Close,
  ZoomIn,
  ZoomOut,
  ScaleToOriginal,
  RefreshRight,
  RefreshLeft,
} from "@element-plus/icons-vue";

const route = useRouter();
const locale = zhCn;

let Index = null;
const func_no = ref([]);
const flag = ref(false);
const showImg = ref(false);
const showReject = ref(false);
const imgScale = ref(1);
const imgDeg = ref(0);
const Img = ref();
const imgSrc = ref('');
const judge_id = ref('');
const processid = ref('');
const btnDisabled = ref(true);
const carNo = ref("川A");
const dateTime = ref([
  dayjs().startOf("date").format("YYYY-MM-DD HH:mm:ss"),
  dayjs().endOf("date").format("YYYY-MM-DD HH:mm:ss"),
]);
const users = ref([]);
const processData = ref([]);
const tableData = ref([]);
const buffer = reactive([
  {
    TIME_GET_ON: null,
    TIME_GET_OFF: null,
    RUN_ODOMETER: null,
    METER_ID: null,
  },
  {
    TIME_GET_ON: null,
    TIME_GET_OFF: null,
    RUN_ODOMETER: null,
    METER_ID: null,
  },
]);
const recordData = ref([]);
const reviewTime = ref("");
const mileage = ref(0);
const note = ref('');
const loadingStatus = reactive({
  dataTable: false,
});
const showPass = ref(false);
const options = [
  {
    value: '超时压表',
    label: '超时压表',
  },
  {
    value: '票据不清晰',
    label: '票据不清晰',
  },
  {
    value: '超出规定里程',
    label: '超出规定里程',
  },
  {
    value: '超出规定时间',
    label: '超出规定时间',
  },
  {
    value: '票据与行程不符',
    label: '票据与行程不符',
  },
  {
    value: '其他',
    label: '其他',
  }
]
const selectValue = ref('');

watch(carNo, (val) => {
  carNo.value = val.toUpperCase();
});

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

const preview = () => {
  showImg.value = true;
};

const audit = async (state) => {
  let params = {
    processid: processid.value,
    judge_user: localStorage.getItem("user"),
    time_get_on: dayjs(reviewTime.value).format("YYYY-MM-DD HH:mm:ss"),
    judge_runodometer: Number(mileage.value),
    judged: state,
    note: selectValue.value + "; " + note.value
  };
  console.log(params);
  let reg = /^[0-9]+$/;

  if (state == 1) {
    if (reg.test(mileage.value) && reviewTime.value) {
      console.log(params);
      await axios.post("/api/pd_judge_work", params).then((res) => {
        console.log(res.data);
        if (res.data.obj == "success") {
          ElMessage({
            message: res.data.msg,
            type: "success",
          });
          route.back();
        } else {
          ElMessage({
            message: res.data.msg,
            type: "warning",
          });
        }
        showPass.value = false;
      });
    } else {
      if (!reviewTime.value) {
        ElMessage({
          message: "压表时间输入错误",
          type: "warning",
        });
      } else {
        ElMessage({
          message: "公里数输入错误",
          type: "warning",
        });
      }
      showPass.value = false;
    }
  } else {
    console.log("reject");
    await axios.post("/api/pd_judge_work", params).then((res) => {
      console.log(res.data);
      if (res.data.obj == "success") {
        ElMessage({
          message: res.data.msg,
          type: "success",
        });
        route.back();
      } else {
        ElMessage({
          message: res.data.msg,
          type: "warning",
        });
      }
      showReject.value = false;
    });
  }


};

const gotoShowPath = (state, index, tag) => {
  let dateTime;
  if (state > 0) {
    // dateTime = [
    //   buffer[index].TIME_GET_ON,
    //   buffer[index].TIME_GET_OFF
    // ];
    if (tag == 'terminal') {
      dateTime = [
        dayjs(processData.value[0].TERMINAL_OUT_TIME).format("YYYY-MM-DD HH:mm:ss"),
        dayjs(processData.value[0].TERMINAL_OUT_TIME).add(2, "hour").format("YYYY-MM-DD HH:mm:ss"),
      ];
    } else {
      dateTime = [
        dayjs(processData.value[index].TIME_GET_ON).format("YYYY-MM-DD HH:mm:ss"),
        dayjs(processData.value[index].TIME_GET_OFF).format("YYYY-MM-DD HH:mm:ss"),
      ];
    }
  } else {
    console.log(processData.value);
    dateTime = [
      dayjs(processData.value[index].TERMINAL_OUT_TIME).add(-2, "hour").format("YYYY-MM-DD HH:mm:ss"),
      dayjs(processData.value[index].TERMINAL_OUT_TIME).add(2, "hour").format("YYYY-MM-DD HH:mm:ss"),
    ];
  }

  console.log(dateTime)

  let params = {
    carNo: carNo.value,
    dateTime
  }

  route.push({
    path: '/showPath',
    query: params,
  });
}

const disabledDate = (time) => {
  return time.getTime() > new Date().getTime();
};

const authorize = async () => {
  if (!validateCarNo(carNo.value)) {
    return;
  } else {
    let params = {
      carid: carNo.value,
      user: localStorage.getItem("user"),
    };
    await axios.post("/api/set_user_pd", params).then((res) => {
      console.log(res.data);
    });
  }
};

const getData = async (tag) => {
  console.log(tag);
  if (
    !tag &&
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
  } else if (tag == "today") {
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
  console.log(params);
  await axios.get("/api/get_process_meter", { params }).then((res) => {
    processData.value = res.data;
    console.log(processData.value);
    buffer.length = 0;
    processData.value.forEach((item) => {
      buffer.push({
        TIME_GET_ON: item.TIME_GET_ON,
        TIME_GET_OFF: item.TIME_GET_OFF,
        RUN_ODOMETER: item.RUN_ODOMETER,
        METER_ID: item.METER_ID,
      });
    });
  });
  await axios.get("/location/meter", { params }).then((res) => {
    tableData.value = res.data.meters;
    console.log(tableData.value);
  });
  await axios.get("/api/user_list", { params }).then((res) => {
    users.value = res.data;
    console.log(res.data);
  });
};

const binding = (index) => {
  console.log(index, "--------------------");
  Index = index;
  btnDisabled.value = !btnDisabled.value;
};

const Unbinding = async (item) => {
  console.log(item);
  let params = {
    process_id: item.ID.toString(),
    meter_id: item.METER_ID,
    user: localStorage.getItem("user")
  };
  console.log(params, "----------------");
  await axios.post("/api/del_process_meter", params).then((res) => {
    console.log(res.data);
    getData();
  });
};

const confirm = async (item) => {
  console.log(item);
  btnDisabled.value = !btnDisabled.value;
  let params = {
    process_id: item.ID.toString(),
    meter_id: buffer[Index].METER_ID,
    user: localStorage.getItem("user"),
  };
  console.log(params);
  console.log(typeof params.meter_id);
  await axios.post("/api/set_process_meter", params).then((res) => {
    console.log(res.data);
    getData();
  });
};

const cancle = (index) => {
  Index = null;
  buffer[index].TIME_GET_ON = null;
  buffer[index].TIME_GET_OFF = null;
  buffer[index].RUN_ODOMETER = null;
  buffer[index].METER_ID = null;
  btnDisabled.value = !btnDisabled.value;
};

const handleBind = (row) => {
  console.log(buffer);
  let { ID, TIME_GET_ON, TIME_GET_OFF, RUN_ODOMETER } = row;
  buffer[Index].TIME_GET_ON = TIME_GET_ON;
  buffer[Index].TIME_GET_OFF = TIME_GET_OFF;
  buffer[Index].RUN_ODOMETER = RUN_ODOMETER;
  buffer[Index].METER_ID = ID;
};

onActivated(async () => {
  let params = route.currentRoute._value.query;

  if (route.options.history.state.back == "/auditHistory") {
    flag.value = true;
    console.log("flag.value", flag.value);
  }
  if (
    (route.options.history.state.back == "/audit" || route.options.history.state.back == "/auditHistory") &&
    Object.keys(params).length
  ) {
    judge_id.value = params.judge_id;
    processid.value = params.processid
    console.log(params.judge_id);
    dateTime.value = ['', ''];

    params = {
      judge_id: judge_id.value
    };
    await axios.get("/api/pd_judge_one", { params }).then(async res => {
      console.log(res.data);
      processData.value = res.data;
      console.log(processData.value);
      recordData.value = processData.value[0].THE_DAY_PD;
      imgSrc.value = processData.value[0].PIC;
    });
    carNo.value = processData.value[0].CAR_ID;
    params = {
      carid: processData.value[0].CAR_ID,
      starttime: dayjs(processData.value[0].POOL_OUT_TIME).add(-12, "hour").format("YYYY-MM-DD HH:mm:ss"),
      endtime: dayjs(processData.value[0].POOL_OUT_TIME).add(+12, "hour").format("YYYY-MM-DD HH:mm:ss"),
    }
    await axios.get("/location/meter", { params }).then((res) => {
      tableData.value = res.data.meters;
      console.log(tableData.value);
    });

    params = {
      carid: carNo.value
    };
    console.log(params);
    await axios.get("/api/user_list", { params }).then((res) => {
      users.value = res.data;
      console.log(res.data);
    });
  }
  func_no.value = localStorage.getItem('func_no');
});

onDeactivated(() => {
  judge_id.value = '';
  // carNo.value = '';
  // dateTime.value = ['', ''];
  // processData.value.length = 0;
  // tableData.value.length = 0;
  flag.value = false;
});
</script>

<style lang="less" scoped>
.container {
  height: 100%;
  position: relative;
  overflow: hidden;

  .button-wrap {
    width: 110px;
  }

  .img-wrap {
    background-color: rgba(0, 0, 0, 0.5);
    position: absolute;
    top: 0;
    width: 100%;
    height: 100%;
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

  .reject-wrap {
    position: absolute;
    display: flex;
    justify-content: center;
    align-items: center;
    height: 100%;
    width: 100%;
    top: 0;
    background-color: rgba(0, 0, 0, 0.5);
    z-index: 1;

    .reject-box {
      padding: 20px;
      position: absolute;
      width: 25%;
      border-radius: 4px;
      background-color: white;

      .reject-title {
        height: 50px;
        line-height: 50px;
        text-align: center;
        font-size: 26px
      }

      .reject-content {
        margin-top: 20px;

        .select {
          margin-bottom: 20px;
        }

        .el-input {
          height: 600px
        }
      }

      .reject-button {
        display: flex;
        margin-top: 20px;
        justify-content: center;
        width: 100%;
      }
    }
  }

  .list-box {
    margin-top: 20PX;
    height: 720px;
    overflow: hidden;

    .record-box {
      position: relative;
      display: flex;
      flex-direction: column;
      justify-content: center;
      margin-top: 20px;

      .el-text {
        font-size: 18px;
      }

      .tag {
        font-size: 16px;
        padding: 4px;
        position: absolute;
        top: 16px;
        right: 20px;
        display: inline-block;
        border-radius: 4px;
        border: 1px solid rgba(0, 0, 0, 0.1);
        box-shadow: 2px 2px 5px rgba(0, 0, 0, 0.2);
      }
    }

    .table-mark {
      position: absolute;
      display: flex;
      justify-content: center;
      align-items: center;
      top: 0;
      width: 100%;
      height: 100%;
      background-color: rgba(0, 0, 0, 0.5);

      .el-button {}
    }

    .img-box {
      display: flex;
      justify-content: center;
      align-items: center;
      height: 120px;

      img {
        display: inline-block;
        width: 60px;
        height: 80px;
      }

      img:hover {
        cursor: pointer;
      }
    }

    .input-wrap {
      display: flex;
      flex-direction: column;
      justify-content: center;
      height: 120px;
    }

    .button-box {
      width: 100%;
      height: 40px;
      display: flex;
      justify-content: center;
      margin-left: 100px;
      z-index: 1;
    }
  }

  .list-box>.el-col:nth-child(2) {
    overflow-y: auto;
    height: 100%;

    .el-card:nth-last-child(1) {
      margin-bottom: 0 !important;
    }
  }

  .list-box>.el-col:nth-child(2)::-webkit-scrollbar {
    width: 4px;
  }

  .list-box>.el-col:nth-child(2)::-webkit-scrollbar-thumb {
    border-radius: 10px;
    -webkit-box-shadow: inset 0 0 5px rgba(0, 0, 0, 0.05);
    background: rgba(0, 0, 0, 0.1);
  }

  .list-box>.el-col:nth-child(2)::-webkit-scrollbar {
    -webkit-box-shadow: inset 0 0 5px rgba(0, 0, 0, 0.05);
    border-radius: 0;
    background: rgba(0, 0, 0, 0.1);
  }

  .list-box>.el-col:nth-child(4) {
    height: 100%;

    .el-card:nth-last-child(1) {
      margin-bottom: 0 !important;
    }
  }

  .list-box>.el-col:nth-child(4)::-webkit-scrollbar {
    // display: none;
  }
}
</style>
