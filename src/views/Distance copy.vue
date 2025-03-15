<template>
  <div class="container">
    <el-row :gutter="20" style="height: 100%;">
      <el-col :span="16">
        <el-card>
          <template #header>
            <div style="display: flex; justify-content: right">
              <!-- <el-switch v-model="history" active-text="已审核" inactive-text="待审核" /> -->
              <el-config-provider :locale="locale">
                <el-input :disabled="true" v-model="carNo" placeholder="请输入车牌" class="input-with-select"
                  style="width: 500px">
                  <template #prepend>
                    <el-date-picker :disabled="true" style="margin: 0 -20px 0 -20px; width: 360px" v-model="dateTime"
                      type="daterange" range-separator="To" start-placeholder="开始时间" end-placeholder="结束时间"
                      value-format="YYYY-MM-DD HH:mm:ss" />
                  </template>
                </el-input>
                <el-button :disabled="true" @click="getData()"><el-icon>
                    <Search />
                  </el-icon></el-button>
              </el-config-provider>
            </div>
          </template>
          <div class="table-box">
            <el-table v-loading="loadingStatus.dataTable" :data="tableData" stripe height="742px">
              <el-table-column prop="CAR_ID" label="车牌" width="120px" />
              <el-table-column prop="TERMINAL_OUT_TIME" label="离开航站楼时间" />
              <el-table-column prop="TIME_GET_ON" label="压表时间" />
              <el-table-column prop="TIME_GET_OFF" label="抬表时间" />
              <el-table-column label="里程" width="60px">
                <template #default="scope">
                  <el-text :style="`color: ${scope.row.RUN_ODOMETER >= 25 ? 'red' : ''}`">{{ scope.row.RUN_ODOMETER
                  }}</el-text>
                </template>
              </el-table-column>
              <el-table-column label="授权" width="60px">
                <template #default="scope">
                  <el-text :style="`color: ${scope.row.PD == 'system' ? '' : 'orange'}`">{{ scope.row.PD == 'system'
                    ? '系统' : '人工' }}</el-text>
                </template>
              </el-table-column>
              <el-table-column label="路径" width="160px">
                <template #default="scope">
                  <el-button @click="showPath(scope.row)">
                    路径/+5分钟
                  </el-button>
                </template>
              </el-table-column>
              <el-table-column>
                <template #default="scope">
                  <!-- <el-button :disabled="Boolean(scope.row.DEL_PD_TIME)" type="warning" @click="revoke(scope.row)">
                    <el-text>{{ scope.row.DEL_PD_TIME ? '已撤销' : '撤销' }}</el-text>
                  </el-button> -->
                </template>
              </el-table-column>
            </el-table>
          </div>
          <!-- <div class="pagination-box">
            <el-pagination v-model:current-page="currentPage" :page-size="10" layout="total, prev, pager, next"
              :total="total" :hide-on-single-page="false" @current-change="handleCurrentChange" />
          </div> -->
        </el-card>
      </el-col>
      <el-col :span="8" style="height: 100%;">
        <div class="map-section">
          <div class="search-box">
            <h1>轨迹查询</h1>
            <h1><el-text type="primary">{{ searchInfo.carNo }}&nbsp;&nbsp;&nbsp;</el-text>
              <el-text>{{ searchInfo.starttime }} - {{ searchInfo.endtime ? searchInfo.endtime.split(" ")[0] : null
              }}T</el-text><el-text type="danger">{{ searchInfo.endtime ? searchInfo.endtime.split(" ")[1] : null
}}</el-text>
            </h1>
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
  </div>
</template>

<script setup>
import { useRouter } from "vue-router";
import { ref, reactive, onMounted, watch, onDeactivated, onActivated } from "vue";
import axios from "axios";
import dayjs from "dayjs";
import zhCn from "element-plus/es/locale/lang/zh-cn";
import {
  Close,
  Search,
  ZoomIn,
  ZoomOut,
  ScaleToOriginal,
  RefreshRight,
  RefreshLeft,
} from "@element-plus/icons-vue";
import ScrollBar from "./../components/ScrollBar.vue";
import validateCarNo from "../util/tools.js";

let map = null;
let polylineLayer = null;
let infowindow = null;
let marker = null;
let path = [];
let passedLatLngs = [];
let offset = 0;

const locale = zhCn;

const imgScale = ref(1);
const imgDeg = ref(0);
const Img = ref();
const history = ref(true);
const carNo = ref("");
const dateTime = ref([]);
const tableData = ref([]);
const filterTabData = ref([]);
const total = ref(0);
const currentPage = ref(1);
const loadingStatus = reactive({
  dataTable: false,
});
const searchInfo = reactive({
  carNo: '',
  starttime: '',
  endtime: ''
});
const endPoint = ref([]);
const imgSrc = ref("");
const showImg = ref(false);
const positions = ref([]);
const currentPos = ref(0);
const iconStatus = ref(true);
const loading = ref(false);

const getData = async () => {
  await axios.get("/api/today_pd_min25km").then((res) => {
    console.log(res.data);
    res.data.forEach((item => {
      item.state = 0;
      item.lastTime = item.TIME_GET_OFF ? item.TIME_GET_OFF.replace("T", " ") : null;
    }));
    tableData.value = res.data;
    console.log(tableData.value);
    total.value = Number(res.data.total);
  });
};

function drawPath(gpsData) {
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
          position: endPoint.value[0],
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

const playCtrl = (play) => {
  if (!play) {
    console.log("pauseMove");
    marker.pauseMove();
    iconStatus.value = false;
  } else {
    // marker.resumeMove();
    iconStatus.value = true;
  }
};

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
};

const revoke = (row) => {
  ElMessageBox.confirm(
    `确认撤销 ${row.CAR_ID} 的补偿资格吗`,
    'Warning',
    {
      confirmButtonText: '确认',
      cancelButtonText: '取消',
      type: 'warning',
    }
  )
    .then(() => {
      const params = {
        "user": localStorage.getItem("user"),
        "processId": row.PROCESS_ID
      }
      console.log(params);
      axios.post("/door/del_pd", params).then(res => {
        console.log(res);
        if (res.status == 200) {
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
        init();
      });
    })
    .catch(() => {
    })

  console.log(row);
};

const showPath = async (row) => {
  console.log(row);
  let params = {
    carid: row.CAR_ID,
    starttime: row.TIME_GET_ON
  };
  if (row.state) {
    let time = row.lastTime;
    row.lastTime = dayjs(time).add(5, 'minute').format('YYYY-MM-DD HH:mm:ss');
    params.endtime = row.lastTime;
    ElMessage({
      message: "结束时间+5分钟",
      type: "info",
    });
  } else {
    params.endtime = row.TIME_GET_OFF;
    // row.state = 1
  }
  console.log(params);
  searchInfo.carNo = row.CAR_ID;
  searchInfo.starttime = row.TIME_GET_ON;
  searchInfo.endtime = row.lastTime;

  loading.value = true;
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
        // if (index + 1 >= positions.value.length) {
        //   arr.push(item);
        //   return
        // }
        // else {
        //   let element = positions.value[index];
        //   let next = positions.value[index + 1];
        //   if (next.LAT - element.LAT != 0 && next.LNG - element.LNG != 0) {
        //     arr.push(item);
        //   }
        //   if (!trriger) {
        //     if (next.LAT - element.LAT == 0 && next.LNG - element.LNG == 0) {
        //       head = index;
        //       trriger = !trriger;
        //     } else {
        //       return
        //     }
        //   } else {
        //     if (next.LAT - element.LAT != 0 && next.LNG - element.LNG != 0) {
        //       tail = index + 1;
        //       trriger = !trriger;
        //       tag.push({ head, tail });
        //     } else {
        //       return
        //     }
        //   }
        // }
      });
      // console.log(arr);
      if (!row.state) {
        let LAT = gpsData[gpsData.length - 1].LAT;
        let LNG = gpsData[gpsData.length - 1].LNG;
        endPoint.value[0] = new window.TMap.LatLng(LAT, LNG);
        console.log(endPoint.value[0]);
        row.state = 1;
      }
      drawPath(gpsData);
    }
  });
};

const init = async () => {
  dateTime.value[0] = dayjs()
    .add(-2, "day")
    .format("YYYY-MM-DD HH:mm:ss");
  dateTime.value[1] = dayjs()
    .add(0, "day")
    .format("YYYY-MM-DD HH:mm:ss");
  await getData();
};

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

watch(() => searchInfo.carNo, (newV, oldV) => {
  console.log(oldV && (newV != oldV));
  if (oldV && (newV != oldV)) {
    tableData.value.forEach((item) => {
      item.state = 0;
      item.lastTime = item.TIME_GET_OFF ? item.TIME_GET_OFF.replace("T", " ") : null;
    });
    console.log(tableData.value);
  }
});

onMounted(() => {
  init();
  initMap();
});
</script>

<style lang="less" scoped>
.container {
  height: 100%;
  position: relative;

  .map-section {
    display: flex;
    flex-direction: column;
    height: 100%;

    .search-box {
      height: 100px;
      margin-bottom: 20px;
      box-sizing: border-box;
    }

    .fixed-box {
      box-sizing: border-box;
      position: relative;
      flex: 1;
      max-height: 100%;
      width: 100%;

      #map-box {
        // position: absolute;
        width: 100%;
        height: 725px;
        overflow: hidden;
        background-color: rgba(0, 0, 0, 0.1);
        background-color: aqua;
      }
    }


  }

  .el-col {
    height: 100%;

    .el-card {
      height: 100%;
      width: 100%;

      .button-box {
        margin-right: 10px;
      }

      .table-box {
        position: relative;
        bottom: -4px;
        border: 1px solid rgba(0, 0, 0, 0.1);

        img {
          width: 30px;
          height: 43px;
          background-size: cover;
        }

        img:hover {
          cursor: pointer;
        }
      }

      .pagination-box {
        position: relative;
        height: 40px;

        .el-pagination {
          position: absolute;
          top: 10px;
          right: 0px;
        }
      }
    }
  }

  .img-wrap {
    width: 100%;
    height: 100%;
    background-color: rgba(0, 0, 0, 0.5);
    position: absolute;
    top: 0;
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
      width: 600px;
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

  .slider {
    position: absolute;
    bottom: 20px;
    left: 50%;
    transform: translateX(-50%);
    z-index: 9999;
  }
}
</style>
