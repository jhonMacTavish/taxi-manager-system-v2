<template>
  <div class="container">
    <el-row class="content-wrap" :gutter="20">
      <el-col :span="24">
        <el-card class="custom-card">
          <template #header>
            <div style="text-align: center">
              <el-config-provider :locale="locale">
                <el-date-picker v-model="dateTime" type="datetimerange" range-separator="To" start-placeholder="开始时间"
                  end-placeholder="结束时间" value-format="YYYY-MM-DD HH:mm:ss" :disabled-date="disabledDate" />
                <el-button style="margin-left: 10px" @click="getData('')">查询历史数据</el-button>
                <el-button style="margin-left: 10px" @click="getData('today')">查询今日数据</el-button>
              </el-config-provider>
            </div>
          </template>
          <el-row :gutter="20">
            <el-col class="table-wrap" :span="12">
              <el-text type="info" size="large">
                T1资格池:
                <el-text type="warning" size="large">
                  {{ filterTableData[0].length }}</el-text>
                辆
              </el-text>
              <el-input class="search-input" v-model="searchT1" size="small" placeholder="请输入车牌">
                <template #prepend>
                  <el-button :icon="Search" />
                </template>
              </el-input>
              <el-table v-loading="loadingStatus.T1Table" :data="filterTableData[0]" :stripe="false" height="710px"
                :row-class-name="tableRowClassName" :cell-style="tableCellStyle">
                <el-table-column prop="CAR_ID" label="车牌号" width="130px" />
                <el-table-column sortable prop="TERMINAL_OUT_TIME" label="离开航站楼时间" width="170px" />
                <el-table-column label="授权" width="80px" filter-placement="bottom-end" :filter-method="filterPD"
                  :filters="[
      { text: '系统', value: 'system' },
      { text: '人工', value: 'admin' },
    ]">
                  <template #default="scope">
                    <el-text :type="scope.row.PD == 'system' ? 'info' : 'warning'">{{ scope.row.PD == "system" ? "系统" :
      "人工" }}</el-text>
                  </template>
                </el-table-column>
                <el-table-column sortable prop="EXPIRATION_TIME" label="资格过期时间" width="170px" />
                <el-table-column label="资格状态" filter-placement="bottom-end" :filter-method="filterStatus" :filters="[
      { text: '未使用', value: 'unused' },
      { text: '已使用', value: 'used' },
      { text: '已过期', value: 'expired' },
    ]">
                  <template #default="scope">
                    <el-text>{{ scope.row.STATUS == "expired" ? "已过期" : scope.row.STATUS == "used" ? "已使用" : "未使用"
                      }}</el-text>
                  </template>
                </el-table-column>
                <el-table-column width="120px">
                  <template #default="scope">
                    <el-button type="default" @click="detail(scope.row)">来访详情</el-button>
                  </template>
                </el-table-column>
              </el-table>
            </el-col>
            <el-col class="table-wrap" :span="12">
              <el-text type="info" size="large">
                T2资格池:
                <el-text type="warning" size="large">
                  {{ filterTableData[1].length }}</el-text>
                辆
              </el-text>
              <el-input class="search-input" v-model="searchT2" size="small" placeholder="请输入车牌">
                <template #prepend>
                  <el-button :icon="Search" />
                </template>
              </el-input>
              <el-table v-loading="loadingStatus.T1Table" :data="filterTableData[1]" :stripe="false" height="710px"
                :row-class-name="tableRowClassName">
                <el-table-column prop="CAR_ID" label="车牌号" width="130px" />
                <el-table-column sortable prop="TERMINAL_OUT_TIME" label="离开航站楼时间" width="170px" />
                <el-table-column label="授权" width="80px" filter-placement="bottom-end" :filter-method="filterPD"
                  :filters="[
      { text: '系统', value: 'system' },
      { text: '人工', value: 'admin' },
    ]">
                  <template #default="scope">
                    <el-text :type="scope.row.PD == 'system' ? 'info' : 'warning'">{{ scope.row.PD == "system" ? "系统" :
      "人工" }}</el-text>
                  </template>
                </el-table-column>
                <el-table-column sortable prop="EXPIRATION_TIME" label="资格过期时间" width="170px" />
                <el-table-column label="资格状态" filter-placement="bottom-end" :filter-method="filterStatus" :filters="[
      { text: '未使用', value: 'unused' },
      { text: '已使用', value: 'used' },
      { text: '已过期', value: 'expired' },
    ]">
                  <template #default="scope">
                    <el-text>{{ scope.row.STATUS == "expired" ? "已过期" : scope.row.STATUS == "used" ? "已使用" : "未使用"
                      }}</el-text>
                  </template>
                </el-table-column>
                <el-table-column width="120px">
                  <template #default="scope">
                    <el-button type="default" @click="detail(scope.row)">来访详情</el-button>
                  </template>
                </el-table-column>
              </el-table>
            </el-col>
          </el-row>
        </el-card>
      </el-col>
    </el-row>
    <div v-show="showDetail" class="detail-wrap">
      <el-card>
        <template #header>
          <div class="title"><el-text type="warning">{{ carDetail.CAR_ID }}</el-text>&nbsp详情</div>
        </template>
        <el-row :gutter="40">
          <el-col class="title-box" :span="11">
            <div><el-text type="info">进入{{ carDetail.TERMINAL }}蓄车场时间</el-text></div>
            <div><el-text type="info">离开{{ carDetail.TERMINAL }}蓄车场时间</el-text></div>
            <div><el-text type="info">进入{{ carDetail.TERMINAL }}航站楼时间</el-text></div>
            <div><el-text type="info">离开{{ carDetail.TERMINAL }}航站楼时间</el-text></div>
            <div><el-text type="info">压表时间</el-text></div>
            <div><el-text type="info">抬表时间</el-text></div>
            <div><el-text type="info">行驶距离</el-text></div>
            <div><el-text type="info">授权方式</el-text></div>
          </el-col>
          <el-col class="detail-box" :span="13">
            <div>{{ carDetail.POOL_IN_TIME }}</div>
            <div>{{ carDetail.POOL_OUT_TIME }}</div>
            <div>{{ carDetail.TERMINAL_IN_TIME }}</div>
            <div>{{ carDetail.TERMINAL_OUT_TIME }}</div>
            <div>{{ carDetail.TIME_GET_ON }}</div>
            <div>{{ carDetail.TIME_GET_OFF }}</div>
            <div>{{ carDetail.RUN_ODOMETER }} 千米</div>
            <div>{{ carDetail.PD == "system" ? "系统" : "人工" }}</div>
          </el-col>
        </el-row>
      </el-card>
      <el-card>
        <div id="map-box" v-loading="loading"></div>
      </el-card>
    </div>
    <div v-show="showDetail" class="button-box">
      <el-button class="close" @click="showDetail = false">
        <el-icon>
          <Close />
        </el-icon>
      </el-button>
    </div>
  </div>
</template>

<script setup>
import axios from "axios";
import { ref, onMounted, computed, reactive, onBeforeUnmount } from "vue";
import { Search, Close } from "@element-plus/icons-vue";
import dayjs from "dayjs";
import zhCn from "element-plus/es/locale/lang/zh-cn";
import { useRoute } from 'vue-router';

const route = useRoute();
let timer = null;
const locale = zhCn;
const showDetail = ref(false);
const carDetail = reactive({
  CAR_ID: "",
  POOL_IN_TIME: "",
  POOL_OUT_TIME: "",
  TERMINAL_IN_TIME: "",
  TERMINAL_OUT_TIME: "",
  TERMINAL: "",
  TIME_GET_ON: "",
  TIME_GET_OFF: "",
  RUN_ODOMETER: "",
  PD: ""
})
const dateTime = ref([]);
const poolT1Data = ref([]);
const poolT2Data = ref([]);
const searchT1 = ref("");
const searchT2 = ref("");
const filterTableData = computed(() => {
  let arr = [];
  arr[0] = poolT1Data.value.filter(
    (item) =>
      !searchT1.value || item.CAR_ID.toLowerCase().includes(searchT1.value.toLowerCase())
  );
  arr[1] = poolT2Data.value.filter(
    (item) =>
      !searchT2.value || item.CAR_ID.toLowerCase().includes(searchT2.value.toLowerCase())
  );
  return arr;
});
const loadingStatus = reactive({
  T1Table: true,
  T2Table: true,
});
let map = null;
let polylineLayer = null;
let marker = null;
const loading = ref(false);

const filterStatus = (value, row) => {
  return row.STATUS == value;
}

const filterPD = (value, row) => {
  console.log(row.PD, value);
  return row.PD == value;
}

function initMap() {
  if (map) {
    return
  } else {
    var center = new TMap.LatLng(30.31036, 104.444064);
    //初始化地图
    map = new TMap.Map("map-box", {
      rotation: 20, //设置地图旋转角度
      pitch: 30, //设置俯仰角度（0~45）
      zoom: 11.5, //设置地图缩放级别
      center: center, //设置地图中心点坐标
    });
  }

  // axios({
  //   method: 'post',
  //   url: '/tracks/entity/create',
  //   data: {
  //     "key": "SXWBZ-QCJKU-WRLVT-G6OJ6-UU7PT-TEFTW",
  //     "service_id": "66015756fa1a8af306a35718",
  //     "entity_id": "entity-001",
  //     "entity_name": "test-001"
  //   }
  // }).then(res => {
  //   console.log(res);
  // });
}

const getPath = async () => {
  let params = {
    carid: carDetail.CAR_ID,
    starttime: carDetail.TIME_GET_ON,
    endtime: carDetail.TIME_GET_OFF,
  };
  loading.value = true;
  await axios.get("/location/tencent", { params }).then((res) => {
    let data = res.data;
    console.log(data.positions);
    if (!data.positions[0]) {
      ElMessage({
        message: `车辆 ${data.carid} 在 ${data.starttime} 至 ${data.endtime} 时间段内没有GPS数据`,
        type: "warning",
      });
      return;
    } else {
      loading.value = false;
      let gpsData = [];
      // for (let i = 0; i < data.positions.length; i++) {
      //   let obj;
      //   if (i == 0) {
      //     obj = {
      //       "lat": data.positions[i].LAT,
      //       "lng": data.positions[i].LNG,
      //       "loctime": data.positions[i].INTERVAL,
      //       "speed": data.positions[i].SPEED,
      //       "direction": data.positions[i].DIRECTION,
      //       "altitude": 0.0,
      //       "accuracy": 40.0
      //     }
      //   } else {
      //     obj = {
      //       "lat": data.positions[i].LAT,
      //       "lng": data.positions[i].LNG,
      //       "loctime": data.positions[i].INTERVAL + data.positions[0].INTERVAL,
      //       "speed": data.positions[i].SPEED,
      //       "direction": data.positions[i].DIRECTION,
      //       "altitude": 0.0,
      //       "accuracy": 40.0
      //     }
      //   }
      //   gpsData.push(obj);
      // }
      data.positions.forEach((item) => {
        let { LAT, LNG } = item;
        // let latlang = wgs84ToGcj02(LAT, LNG);
        // console.log({ LAT, LNG });
        // console.log(latlang);
        gpsData.push({ LAT, LNG });
      });
      // axios({
      //   method: 'post',
      //   url: '/tracks/trace/upload',
      //   data:
      //   {
      //     "key": "SXWBZ-QCJKU-WRLVT-G6OJ6-UU7PT-TEFTW",
      //     "service_id": "66015756fa1a8af306a35718",
      //     "entity_id": "entity_001",
      //     "entity_name": "test-001",
      //   }
      // }).then(res => {
      //   console.log(res);
      //   axios({
      //     method: 'post',
      //     url: '/tracks/trace/upload',
      //     data:
      //     {
      //       "key": "SXWBZ-QCJKU-WRLVT-G6OJ6-UU7PT-TEFTW",
      //       "service_id": "66015756fa1a8af306a35718",
      //       "entity_id": "entity_001",
      //       "coord_type": 1,
      //       "data": gpsData
      //     }
      //   }).then(res => {
      //     console.log(res);
      //   });
      // });
      drawPath(gpsData);
    }
  });
};

function drawPath(gpsData) {
  let path = gpsData.map((item) => {
    return new window.TMap.LatLng(item.LAT, item.LNG);
  });

  try {
    if (polylineLayer) {
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
    }
    // marker.on("moving", (e) => {
    //   console.log(e.car);
    //   var passedLatLngs = e.car && e.car.passedLatLngs;
    //   if (passedLatLngs) {
    //     polylineLayer.eraseTo(
    //       "erasePath",
    //       passedLatLngs.length - 1,
    //       passedLatLngs[passedLatLngs.length - 1]
    //     );
    //   }
    // });
  }
}

const disabledDate = (time) => {
  return time.getTime() > new Date().getTime();
};

const tableRowClassName = (
  { row, rowIndex }
) => {
  if (row.STATUS === "used") {
    console.log("used");
    return 'used-row'
  } else if (row.STATUS === "expired") {
    return 'expired-row'
  } else {
    return ''
  }
};

const tableCellStyle = () => {
  return {
    // fontSize: '16px'
  }
};

const detail = async (row) => {
  let params = {
    processid: row.PROCESS_ID
  };
  await axios.get("/api/pd_judge_process", { params }).then(res => {
    let obj = res.data[0];
    console.log(obj);
    for (let key in obj) {
      obj[key] ? carDetail[key] = obj[key] : carDetail[key] = "No Data"
    }
    showDetail.value = true;

  });

  initMap();
  getPath();
};

const getData = async (today) => {
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
  } else if (today) {
    dateTime.value ? null : (dateTime.value = []);
    dateTime.value[0] = dayjs().startOf("date").format("YYYY-MM-DD HH:mm:ss");
    dateTime.value[1] = dayjs().endOf("date").format("YYYY-MM-DD HH:mm:ss");
  } else {
  }

  let params = {
    starttime: dateTime.value[0],
    endtime: dateTime.value[1],
  };
  console.log(params);
  await axios.get("/api/pd_status_history", { params }).then((res) => {
    console.log(res.data);
    loadingStatus.T1Table = false;
    loadingStatus.T2Table = false;
    let arr1 = [];
    let arr2 = [];
    res.data.forEach(item => {
      if (item.TERMINAL == "T1") {
        arr1.push(item);
      } else {
        arr2.push(item);
      }
    });
    poolT1Data.value = arr1;
    poolT2Data.value = arr2;
  });
};

function init() {
  dateTime.value[0] = dayjs().startOf("date").format("YYYY-MM-DD HH:mm:ss");
  dateTime.value[1] = dayjs().endOf("date").format("YYYY-MM-DD HH:mm:ss");
  getData();
};

function searchCarID() {
  const params = route.params;
  if (params.carId) {
    searchT1.value = params.carId;
    searchT2.value = params.carId;
  }
}

onMounted(() => {
  init();
});

onBeforeUnmount(() => {
  clearInterval(timer);
});
</script>

<style lang="less" scoped>
.container {
  position: relative;
  width: 100%;
  height: 100%;

  .timepicker-wrap {
    height: 70px;
  }

  .content-wrap {
    height: 100%;

    .custom-card {
      position: relative;
      height: 100%;
      text-align: center;

      .el-date-picker {
        margin: 0 -20px 0 -20px;
        width: 360px
      }

      .table-wrap {
        position: relative;

        .search-input {
          position: absolute;
          width: 160px;
          height: 26px;
          top: 43px;
          right: 20px;
          z-index: 999;
        }
      }

      .el-table {
        border: 1px solid rgba(0, 0, 0, 0.1);
        margin-top: 10px;
        position: relative;
        bottom: -5px;
      }

      .el-table .used-row {
        --el-table-tr-bg-color: var(--el-color-success-light-9);
      }

      .el-table .expired-row {
        --el-table-tr-bg-color: rgba(0, 0, 0, 0.1);
      }

      .el-table .cell-font{
        font-size: 20px;
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
            white-space: nowrap;

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
