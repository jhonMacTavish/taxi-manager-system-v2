<template>
  <div class="container">
    <el-row style="height: 100%;" :gutter="20">
      <el-col :span="8">
        <el-card style="height: 100%;">
          <div class="info-section">
            <div class="driver-box">
              <h1>{{ carNo }}</h1>
              <div
                style="height: 100px;display: flex; flex-direction: column;justify-content: space-around; font-size: 18px;">
                <div v-if="users.length" v-for="(item, index) in users">
                  <el-text>姓名：{{ item.name }}</el-text>
                  <el-text>&nbsp&nbsp&nbsp&nbsp&nbsp电话：{{ item.phone }}</el-text>
                  <el-text>&nbsp&nbsp&nbsp&nbsp&nbsp公司：{{ item.gongsi }}</el-text>
                </div>
                <div v-else>
                  该车牌没有用户信息
                </div>
              </div>
            </div>
            <div class="appeal-box" style="font-size: 16px;">
              <h1>申诉行程 <text style="color:tomato"> {{ terminal }}</text></h1>
              <el-row v-for="(item, index) in processData">
                <el-col :span="14">
                  <div style="margin: 5px 0;">
                    蓄车场驶入时间:&nbsp;&nbsp;<text style="font-weight: bold;">{{ item.POOL_IN_TIME ? item.POOL_IN_TIME :
                      '没有时间记录' }}</text>
                  </div>
                  <div style="margin: 5px 0;">
                    蓄车场驶出时间:&nbsp;&nbsp;<text style="font-weight: bold;">{{ item.POOL_OUT_TIME ? item.POOL_OUT_TIME
                      :
                      '没有时间记录' }}</text>
                  </div>
                  <div style="margin: 5px 0;">
                    航站楼驶入时间:&nbsp;&nbsp;<text style="font-weight: bold;">{{ item.TERMINAL_IN_TIME ?
                      item.TERMINAL_IN_TIME : '没有时间记录' }}</text>
                  </div>
                  <div style="margin: 5px 0;">
                    航站楼驶出时间:&nbsp;&nbsp;<text style="font-weight: bold;">{{ item.TERMINAL_OUT_TIME ?
                      item.TERMINAL_OUT_TIME : '没有时间记录' }}</text>
                  </div>
                  <!-- <div style="margin: 5px 0; border-top: 1px solid black;">
                    返回蓄车场时间:&nbsp;&nbsp;<text style="font-weight: bold;">{{ item.BACK_POOL_TIME ?
                      item.BACK_POOL_TIME : '没有时间记录' }}</text>
                  </div> -->
                  <div style="margin: 10px 0;">
                    <text>压表时间:&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</text>
                    <el-date-picker :disabled="!Boolean(processid)" :disabled-date="disabledDate" style="width: 200px;"
                      v-model="reviewTime" value-format="YYYY-MM-DD HH:mm:ss" format="YYYY-MM-DD HH:mm" type="datetime"
                      placeholder="请输入压表时间" />
                  </div>
                  <div style="margin: 10px 0;">
                    <text>公里数:&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</text>
                    <el-input style="position: relative; width: 200px; left: 2px;" :disabled="!Boolean(processid)"
                      v-model="mileage"><template #append>km</template></el-input>
                  </div>
                  <div>
                    <text v-if="false">驳回理由：{{ }}</text>
                  </div>
                </el-col>
                <el-col :span="10">
                  <div
                    style="height: 100%; display: flex; flex-direction: column; justify-content: space-around; align-items: center;">
                    <el-button style="width: 100px; height: 60px;" :disabled="fromHistory" type="primary"
                      @click="showPass = true">通过</el-button>
                    <el-button style="position: relative; width: 100px; height: 60px; left: -5px;" :disabled="fromHistory"
                      type="warning" @click="showReject = !showReject">驳回</el-button>
                  </div>
                </el-col>
              </el-row>
            </div>
            <div>
              <h1>近期补短资格</h1>
              <el-card class="record-box">
                <div v-for="item in recordData">
                  <el-text>离开<el-text style="color: #00BFFF;">&nbsp{{ item.TERMINAL
                  }}&nbsp</el-text>航站楼时间&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</el-text>
                  <el-text>{{ item.TERMINAL_OUT_TIME }}</el-text>
                  <el-text :type="`${item.PD == 'system' ? 'primary' : 'warning'}`"
                    style="position: absolute; right: 20px;">&nbsp;{{ item.PD == "system" ?
                      "系统"
                      :
                      "人工" }}</el-text>
                </div>
                <div v-if="!recordData.length">
                  没有记录
                </div>
              </el-card>
              <h1>近期打表记录</h1>
              <el-table :data="tableData" style="width: 100%" height="200px">
                <el-table-column prop="RUN_ODOMETER" label="公里数" width="66px" />
                <el-table-column prop="TIME_GET_ON" label="压表时间" width="104px" />
                <el-table-column prop="TIME_GET_OFF" label="抬表时间" width="104px" />
                <el-table-column prop="TOCC_INSERT_TIME" label="收到时间" width="104px" />
                <el-table-column prop="TIME_OFF" label="时差/分" width="74px" />
                <el-table-column>
                  <template #default="scope">
                    <el-button v-if="Boolean(judge_id)" size="small" @click="showPath(scope.$index)">
                      <el-icon>
                        <MapLocation />
                      </el-icon>
                    </el-button>
                  </template>
                </el-table-column>
              </el-table>
            </div>
          </div>
        </el-card>
      </el-col>
      <el-col :span="8">
        <div class="map-section">
          <div class="search-box">
            <h1>轨迹查询</h1>
            <div style="display: flex; justify-content: space-between;">
              <div>
                <el-config-provider :locale="locale">
                  <div style="height: 40px;">
                    <text style="font-size: 16px;">开始时间:&nbsp;&nbsp;&nbsp;</text>
                    <!-- <el-date-picker style="width: 120px;" v-model="dateTime[0]" type="date"
                      value-format="YYYY-MM-DD" placeholder="默认为出" :disabled-date="disabledDate" :shortcuts="shortcuts" />
                    <el-time-picker style="width: 120px;" v-model="dateTime.starttime.time" value-format="HH:mm:ss"
                      placeholder="道闸时间" /> -->
                    <el-date-picker v-model="dateTime.starttime" type="datetime" placeholder="默认为出道闸时间"
                      value-format="YYYY-MM-DD HH:mm:ss" format="YYYY-MM-DD HH:mm" :disabled-date="disabledDate"
                      :shortcuts="shortcuts" />
                  </div>
                  <div>
                    <text style="font-size: 16px;">结束时间:&nbsp;&nbsp;&nbsp;</text>
                    <!-- <el-date-picker style="width: 120px;" v-model="dateTime.endtime.date" type="date"
                      value-format="YYYY-MM-DD" placeholder="请输入" :disabled-date="disabledDate" :shortcuts="shortcuts" />
                    <el-time-picker style="width: 120px;" v-model="dateTime.endtime.time" value-format="HH:mm:ss"
                      placeholder="选择时间" /> -->
                    <el-date-picker v-model="dateTime.endtime" type="datetime" value-format="YYYY-MM-DD HH:mm:ss"
                      format="YYYY-MM-DD HH:mm" :disabled-date="disabledDate" :shortcuts="shortcuts" />
                  </div>
                </el-config-provider>
              </div>
              <div style="display: flex; justify-content: space-between; align-items: center;">
                <el-button type="primary" style="height: 60px; width: 100px" @click="getPath()">按时间查询</el-button>
                <el-button type="primary" style="height: 60px; width: 100px" @click="getPath(5)">+5分钟</el-button>
              </div>
            </div>
          </div>
          <div class="fixed-box">
            <div id="map-box" v-loading="loading">
            </div>
          </div>
          <ScrollBar v-show="!showImg" id="slider" :positions="positions" :modelValue="currentPos"
            :iconStatus="iconStatus" @playCtrl="playCtrl" @handleEvent="handleEvent" @setMovePos="setMovePos">
          </ScrollBar>
        </div>
      </el-col>
      <el-col :span="8">
        <div
          style="position: relative; height: 100%; width: 100%; display: flex; flex-direction: column; overflow: hidden; overflow: hidden ;">
          <h1>发票图片</h1>
          <div class="img-wrap">
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
        </div>
      </el-col>
    </el-row>
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
import { onBeforeUnmount, onMounted, ref, watch } from "vue";
import {
  Close,
  ZoomIn,
  ZoomOut,
  ScaleToOriginal,
  RefreshRight,
  RefreshLeft,
  MapLocation
} from "@element-plus/icons-vue";
import axios from "axios";
// import https from "https";
import dayjs from "dayjs";
import zhCn from "element-plus/es/locale/lang/zh-cn";
import validateCarNo from "../util/tools.js";
import { useRouter } from "vue-router";
import ScrollBar from "./../components/ScrollBar.vue";
import { reactive } from "vue";

let map = null;
let polylineLayer = null;
let infowindow = null;
let marker = null;
let path = [];
let passedLatLngs = [];
let offset = 0;

const route = useRouter();
const locale = zhCn;
const users = ref([]);
// const dateTime = ref([]);
const carNo = ref("");
const processData = ref([]);
const tableData = ref([]);
const valueData = ref([]);
const judge_id = ref('');
const imgSrc = ref('');
const processid = ref('');
const imgScale = ref(2);
const imgDeg = ref(0);
const showReject = ref(false);
const showPass = ref(false);
const recordData = ref([]);
const reviewTime = ref("");
const mileage = ref(0);
const fromHistory = ref(false);
const dateTime = reactive({
  starttime: '',
  endtime: dayjs().format('YYYY-MM-DD HH:mm:ss')
});
const terminal = ref('');
const loadingStatus = reactive({
  dataTable: false,
});
const positions = ref([]);
const currentPos = ref(0);
const iconStatus = ref(true);
const loading = ref(false);
const showImg = ref(false);
const selectValue = ref('');
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
    value: '已自动获得资格',
    label: '已自动获得资格',
  },
  {
    value: '其他',
    label: '其他',
  }
]
const note = ref('');

function initMap() {
  var center = new TMap.LatLng(30.31036, 104.444064);
  //初始化地图
  map = new TMap.Map("map-box", {
    rotation: 20, //设置地图旋转角度
    pitch: 30, //设置俯仰角度（0~45）
    zoom: 12.5, //设置地图缩放级别
    center: center, //设置地图中心点坐标
  });

  var infoWindowLocation = new TMap.LatLng(30.31036, 104.444064);//创建一个坐标
  //创建InfoWindow实例，并进行初始化
  infowindow = new TMap.InfoWindow({
    content: "My location", //信息窗口内容
    position: infoWindowLocation,//显示信息窗口的坐标
    map: map
  });

  // axios({
  //   method: 'post',
  //   url: '/tracks/entity/create',
  //   data: {
  //     "key": "SXWBZ-QCJKU-WRLVT-G6OJ6-UU7PT-TEFTW",
  //     "service_id": "66015756fa1a8af306a35718",
  //     "entity_id": "entity-001",
  //     "entity_name": "scrollBar-001"
  //   }
  // }).then(res => {
  //   console.log(res);
  // });
};

function drawPath(gpsData) {
  console.log(gpsData);
  path = gpsData.map((item) => {
    return new window.TMap.LatLng(item.LAT, item.LNG);
  });
  console.log(path);
  try {
    if (polylineLayer) {
      console.log("updateGeometries");
      polylineLayer.updateGeometries([
        {
          id: "erasePath", //折线唯一标识，删除时使用
          styleId: "style_blue", //绑定样式名
          paths: path,
        },
      ]);
    } else {
      polylineLayer = new window.TMap.MultiPolyline({
        id: "polyline-layer",
        map,
        styles: {
          style_blue: new TMap.PolylineStyle({
            color: "#3777FF", //线填充色
            width: 6, //折线宽度
            borderWidth: 5, //边线宽度
            borderColor: "#FFF", //边线颜色
            lineCap: "butt", //线端头方式
          }),
        },
        geometries: [
          {
            id: "erasePath", //折线唯一标识，删除时使用
            styleId: "style_blue", //绑定样式名
            paths: path,
          },
        ],
      });
    }
  } catch (err) {
    console.log(err);
  } finally {
    map.setCenter(path[Math.floor(path.length / 2)]);
    map.setZoom(12.5);
    if (marker) {
      console.log("stopMove");
      marker.stopMove();
      marker.updateGeometries([
        {
          id: "car",
          styleId: "car-down",
          position: path[0],
        },
        {
          id: "start",
          styleId: "start",
          position: path[0],
        },
        {
          id: "end",
          styleId: "end",
          position: path[path.length - 1],
        },
      ]);
      marker.on("moving", (e) => {
        if (!e.car) return;
        passedLatLngs = e.car && e.car.passedLatLngs;
        let passedLth = passedLatLngs.length;
        currentPos.value = passedLth - 1;
        infowindow.setPosition(passedLatLngs[currentPos.value]);
        infowindow.setContent(positions.value[currentPos.value].POSITION_TIME);
      });
      marker.moveAlong(
        {
          car: {
            path,
            speed: 1770,
          },
        },
        {
          autoRotation: true,
        }
      );
      currentPos.value = 0;
    } else {
      marker = new TMap.MultiMarker({
        id: "car-marker",
        map,
        styles: {
          "car-down": new TMap.MarkerStyle({
            width: 40,
            height: 40,
            anchor: {
              x: 20,
              y: 20,
            },
            faceTo: "map",
            rotate: 180,
            src: "https://mapapi.qq.com/web/lbs/javascriptGL/demo/img/car.png",
          }),
          start: new TMap.MarkerStyle({
            width: 25,
            height: 35,
            anchor: { x: 16, y: 32 },
            src: "https://mapapi.qq.com/web/lbs/javascriptGL/demo/img/start.png",
          }),
          end: new TMap.MarkerStyle({
            width: 25,
            height: 35,
            anchor: { x: 16, y: 32 },
            src: "https://mapapi.qq.com/web/lbs/javascriptGL/demo/img/end.png",
          }),
        },
        geometries: [
          {
            id: "car",
            styleId: "car-down",
            position: path[0],
            // content: "duang~ nice!"
          },
          {
            id: "start",
            styleId: "start",
            position: path[0],
          },
          {
            id: "end",
            styleId: "end",
            position: path[path.length - 1],
          },
        ],
      });

      marker.on("moving", (e) => {
        console.log(e.car);
        if (!e.car) return;
        passedLatLngs = e.car && e.car.passedLatLngs;
        let passedLth = passedLatLngs.length;
        currentPos.value = passedLth - 1;
        infowindow.setPosition(passedLatLngs[currentPos.value]);
        infowindow.setContent(positions.value[currentPos.value].POSITION_TIME);
      });
      marker.on("move_ended", (e) => {
        iconStatus.value = false;
        if (passedLatLngs.length < path.length) {
          currentPos.value = path.length - 1;
        }
        console.log("move_ended");
        marker.off("moving", (e) => { console.log("off") });
      });
      marker.on("move_stopped", (e) => {
        console.log("move_stopped");
      });
      setTimeout(() => {
        marker.moveAlong(
          {
            car: {
              path,
              speed: 1770,
            },
          },
          {
            autoRotation: true,
          }
        );
      }, 1000);
    }
  }
};

const handleEvent = (idx) => {
  offset = idx;
  path = [];
  if (offset >= positions.value.length - 1) {
    iconStatus.value = false;
    return
  } else {
    let gpsData = positions.value.slice(offset, positions.value.length);
    gpsData.forEach((item) => {
      path.push(new window.TMap.LatLng(item.LAT, item.LNG));
      infowindow.open();
    });
    marker.on("move_stopped", (e) => {
      console.log("move_stopped");
    });
    marker.stopMove();
    marker.updateGeometries([
      {
        id: "car",
        styleId: "car-down",
        position: path[0],
      }
    ]);
    infowindow.setPosition(path[0]);
    marker.off("moving", (e) => { console.log("off") });
    marker.on("moving", (e) => {
      passedLatLngs = e.car && e.car.passedLatLngs;
      if (!passedLatLngs) {
        iconStatus.value = false;
        return
      } else {
        let passedLth = passedLatLngs.length;
        currentPos.value = offset + passedLth - 1;
        infowindow.setPosition(passedLatLngs[passedLth - 1]);
        infowindow.setContent(positions.value[currentPos.value].POSITION_TIME);
      }
    });

    marker.moveAlong(
      {
        car: {
          path,
          speed: 1770,
        },
      },
      {
        autoRotation: true,
      }
    );
    iconStatus.value = true;
  }
};

const zoom = (str) => {
  console.log(imgScale.value);
  switch (str) {
    case "large":
      if (imgScale.value > 5) return;
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

const playCtrl = (play) => {
  if (!play) {
    console.log("pauseMove");
    marker.pauseMove();
    iconStatus.value = false;
  } else {
    // marker.resumeMove();
    iconStatus.value = true;
  }
}

const setMovePos = (pos) => {
  let position = new window.TMap.LatLng(positions.value[pos].LAT, positions.value[pos].LNG)
  marker.updateGeometries([
    {
      id: "car",
      styleId: "car-down",
      position,
    }
  ]);
  infowindow.setPosition(position);
  infowindow.setContent(positions.value[pos].POSITION_TIME);
}

const disabledDate = (time) => {
  return time.getTime() > new Date().getTime();
};

const getPath = async (increment) => {
  let starttime = dateTime.starttime;
  let endtime = dateTime.endtime;

  if (!starttime || !endtime) {
    ElMessage({
      message: "请输入查询时间",
      type: "warning",
    });
    return;
  } else if (!validateCarNo(carNo.value)) {
    return;
  } else {
    if (increment) {
      dateTime.endtime = dayjs(endtime).add(increment, 'minute').format('YYYY-MM-DD HH:mm:ss');
      endtime = dateTime.endtime;
    } else {

    }

    let params = {
      carid: carNo.value,
      starttime: dayjs(starttime).format("YYYY-MM-DD HH:mm:ss"),
      endtime: dayjs(endtime).format("YYYY-MM-DD HH:mm:ss")
    };
    loading.value = true;
    console.log(params);
    await axios.get("/location/tencent_unrepeat", { params }).then((res) => {
      let data = res.data;
      loading.value = false;
      positions.value = data.positions;
      console.log(data);
      if (!positions.value[0]) {
        ElMessage({
          message: `车辆 ${data.carid} 在 ${data.starttime} 至 ${data.endtime} 时间段内没有GPS数据`,
          type: "warning",
        });
        return;
      } else {
        let gpsData = [];
        let head = 0;
        let tail = 0;
        let trriger = false;
        let arr = [];
        positions.value.forEach((item, index) => {
          let { LAT, LNG } = item;
          gpsData.push({ LAT, LNG });
          if (index + 1 >= positions.value.length) {
            arr.push(item);
            return
          }
          else {
            let element = positions.value[index];
            let next = positions.value[index + 1];
            if (next.LAT - element.LAT != 0 && next.LNG - element.LNG != 0) {
              arr.push(item);
            }
            if (!trriger) {
              if (next.LAT - element.LAT == 0 && next.LNG - element.LNG == 0) {
                head = index;
                trriger = !trriger;
              } else {
                return
              }
            } else {
              if (next.LAT - element.LAT != 0 && next.LNG - element.LNG != 0) {
                tail = index + 1;
                trriger = !trriger;
                tag.push({ head, tail });
              } else {
                return
              }
            }
          }
        });
        drawPath(gpsData);
      }
    });
  }
};

const showPath = async (index) => {
  dateTime.starttime = valueData.value[index].TIME_GET_ON;
  dateTime.endtime = valueData.value[index].TIME_GET_OFF;
  getPath();
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

const shortcuts = [
  {
    text: '今日',
    value: new Date(),
  },
  {
    text: '昨日',
    value: () => {
      const date = new Date()
      date.setDate(date.getDate() - 1)
      return date
    },
  }
];

watch(carNo, (val) => {
  carNo.value = val.toUpperCase();
});

watch(() => dateTime.starttime, (newValue) => {
  if (!Boolean(processid.value)) {
    return
  } else {
    reviewTime.value = newValue;
  }
});

onMounted(async () => {
  initMap();
  let params = route.currentRoute._value.query;
  if (route.options.history.state.back == "/auditHistory") {
    fromHistory.value = true;
    console.log("fromHistory.value", fromHistory.value);
  }

  if (
    (route.options.history.state.back == "/audit" || route.options.history.state.back == "/auditHistory") &&
    Object.keys(params).length
  ) {
    judge_id.value = params.judge_id;
    processid.value = params.processid == undefined ? null : params.processid;
    dateTime.value = ['', ''];

    params = {
      judge_id: judge_id.value
    };
    await axios.get("/api/pd_judge_one", { params }).then(async res => {
      console.log(res);
      processData.value = res.data;
      terminal.value = processData.value[0].TERMINAL;
      recordData.value = processData.value[0].THE_DAY_PD;
      imgSrc.value = processData.value[0].PIC;
      dateTime.starttime = processData.value[0].TERMINAL_OUT_TIME;
      carNo.value = processData.value[0].CAR_ID;
      reviewTime.value = processData.value[0].TIME_GET_ON;
      mileage.value = processData.value[0].RUN_ODOMETER;
    });

    params = {
      carid: processData.value[0].CAR_ID,
      starttime: dayjs(processData.value[0].TERMINAL_OUT_TIME).add(-3, "day").startOf("date").format("YYYY-MM-DD HH:mm:ss"),
      endtime: dayjs(processData.value[0].TERMINAL_OUT_TIME).add(+2, "hour").format("YYYY-MM-DD HH:mm:ss"),
    }
    await axios.get("/location/meter", { params }).then((res) => {
      console.log(res);
      valueData.value = res.data.meters.reverse();
      tableData.value.length = 0;
      tableData.value = JSON.parse(JSON.stringify(valueData.value));
      tableData.value.forEach(item => {
        let TIME_OFF = dayjs(item.TOCC_INSERT_TIME).diff(dayjs(item.TIME_GET_OFF), 'minutes')
        item.TIME_OFF = TIME_OFF;
        let str = item.TOCC_INSERT_TIME;
        let arr = str.split("");
        arr.splice(10, 0, " ");
        str = arr.join("");
        item.TOCC_INSERT_TIME = str;
        item.TIME_GET_ON = dayjs(item.TIME_GET_ON).format("MM-DD HH:mm");
        item.TIME_GET_OFF = dayjs(item.TIME_GET_OFF).format("MM-DD HH:mm");
        item.TOCC_INSERT_TIME = dayjs(item.TOCC_INSERT_TIME).format("MM-DD HH:mm");
      });
    });

    params = {
      carid: carNo.value
    };
    console.log(params);
    await axios.get("/api/user_list", { params }).then((res) => {
      users.value = res.data;
      console.log(res.data);
    });

    carNo.value = processData.value[0].CAR_ID;
    params = {
      carid: carNo.value
    };
    axios.get("/api/last_process", { params }).then(res => {
      console.log(res.data);
      if (!res.data.length)
        return
      processData.value[0].BACK_POOL_TIME = res.data[0].POOL_IN_TIME.replace("T", " ");
    });
  }
});

onBeforeUnmount(() => {
  if (!marker) {
    return
  } else {
    marker.stopMove();
  }
});
</script>

<style lang="less" scoped>
.container {
  position: relative;
  height: 100%;
  // overflow: hidden;

  .info-section {
    height: 100%;
    display: flex;
    flex-direction: column;

    .driver-box {
      h1 {
        color: #409EFF;
      }
    }

    .appeal-box {}

    div {
      .record-box {
        position: relative;
      }
    }
  }

  .map-section {
    display: flex;
    flex-direction: column;
    height: 100%;

    .search-box {
      margin-bottom: 20px;
      box-sizing: border-box;
    }

    .fixed-box {
      box-sizing: border-box;
      position: relative;
      flex: 1;
      width: 100%;
      background-color: aquamarine;

      #map-box {
        position: absolute;
        width: 100%;
        height: 100%;
        overflow: hidden;
        background-color: rgba(0, 0, 0, 0.1);
      }
    }


  }

  #slider {
    position: absolute;
    bottom: 20px;
    left: 50%;
    transform: translateX(-52.5%);
    z-index: 1000;
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
    z-index: 1000;

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
          z-index: 9999;
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

  div {
    .img-wrap {
      flex: 1;
      width: 100%;
      height: 90%;
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
  }
}



* {
  user-select: none;
  -webkit-user-select: none;
  /* Safari */
  -moz-user-select: none;
  /* Firefox */
}
</style>
