<template>
  <div class="container">
    <div id="map-box" v-loading="loading">
      <div class="search-box">
        <el-config-provider :locale="locale">
          <el-input v-model="carNo" placeholder="请输入车牌" class="input-with-select" style="max-width: 600px">
            <template #prepend>
              <el-date-picker style="margin: 0 -20px 0 -20px; width: 360px" v-model="dateTime" type="datetimerange"
                range-separator="至" start-placeholder="开始时间" end-placeholder="结束时间" value-format="YYYY-MM-DD HH:mm:ss"
                :disabled-date="disabledDate" />
            </template>
            <template #append>
              <el-button @click="getPath"><el-icon>
                  <Search />
                </el-icon></el-button>
            </template>
          </el-input>
        </el-config-provider>
      </div>
    </div>
    <ScrollBar class="slider" :positions="positions" :modelValue="currentPos" :iconStatus="iconStatus"
      @playCtrl="playCtrl" @handleEvent="handleEvent" @setMovePos="setMovePos">
    </ScrollBar>
  </div>
</template>

<script setup>
import { onBeforeUnmount, onMounted, ref, watch} from "vue";
import { Search } from "@element-plus/icons-vue";
import axios from "axios";
// import https from "https";
import dayjs from "dayjs";
import zhCn from "element-plus/es/locale/lang/zh-cn";
import validateCarNo from "../util/tools.js";
import { useRouter } from "vue-router";
import ScrollBar from "./ScrollBar.vue";

let map = null;
let polylineLayer = null;
let infowindow = null;
let marker = null;
let path = [];
let passedLatLngs = [];
let offset = 0;

const route = useRouter();
const locale = zhCn;
// const carNo = ref("");
// const dateTime = ref([]);
const carNo = ref("川A");
const dateTime = ref([
  dayjs().add(-2, "hour").format("YYYY-MM-DD HH:mm:ss"),
  dayjs().format("YYYY-MM-DD HH:mm:ss"),
]);
const positions = ref([]);
const currentPos = ref(0);
const iconStatus = ref(true);
const loading = ref(false);

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

const getPath = async () => {
  if (
    dateTime.value ? !dateTime.value[0] || !dateTime.value[1] : !dateTime.value
  ) {
    ElMessage({
      message: "请输入查询时间",
      type: "warning",
    });
    return;
  } else if (!validateCarNo(carNo.value)) {
    return;
  } else {
    let params = {
      carid: carNo.value,
      starttime: dateTime.value[0],
      endtime: dateTime.value[1],
    };
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
        // for (let i = 0; i < positions.value.length; i++) {
        //   let obj;
        //   if (i == 0) {
        //     obj = {
        //       "lat": positions.value[i].LAT,
        //       "lng": positions.value[i].LNG,
        //       "loctime": positions.value[i].INTERVAL,
        //       "speed": positions.value[i].SPEED,
        //       "direction": positions.value[i].DIRECTION,
        //       "altitude": 0.0,
        //       "accuracy": 40.0
        //     }
        //   } else {
        //     obj = {
        //       "lat": positions.value[i].LAT,
        //       "lng": positions.value[i].LNG,
        //       "loctime": positions.value[i].INTERVAL + positions.value[0].INTERVAL,
        //       "speed": positions.value[i].SPEED,
        //       "direction": positions.value[i].DIRECTION,
        //       "altitude": 0.0,
        //       "accuracy": 40.0
        //     }
        //   }
        //   gpsData.push(obj);
        // }

        let head = 0;
        let tail = 0;
        let trriger = false;
        let arr = [];
        positions.value.forEach((item, index) => {
          let { LAT, LNG } = item;
          // let latlang = wgs84ToGcj02(LAT, LNG);
          // console.log({ LAT, LNG });
          // console.log(latlang);
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
        console.log(arr);
        // axios({
        //   method: 'post',
        //   url: '/tracks/trace/upload',
        //   data:
        //   {
        //     "key": "SXWBZ-QCJKU-WRLVT-G6OJ6-UU7PT-TEFTW",
        //     "service_id": "66015756fa1a8af306a35718",
        //     "entity_id": "entity_001",
        //     "entity_name": "scrollBar-001",
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
  }
};

watch(carNo, (val) => {
  carNo.value = val.toUpperCase();
});

onMounted(() => {
  initMap();
  let params = route.currentRoute._value.query;
  if (params.dateTime) {
    carNo.value = params.carNo;
    dateTime.value = params.dateTime;
    dateTime.value.forEach((item, index) => {
      dateTime.value[index] = item.replace("T", " ");
    });

    if (carNo.value && dateTime.value[0] && dateTime.value[1]) {
      getPath();
    } else {
      return
    }
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
  height: 100%;

  #map-box {
    /*地图(容器)显示大小*/
    position: relative;
    margin-bottom: -10px;
    width: 100%;
    height: 100%;
    overflow: hidden;
    background-color: rgba(0, 0, 0, 0.1);
  }

  .search-box {
    position: absolute;
    z-index: 9999;
    margin: 10px;
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
