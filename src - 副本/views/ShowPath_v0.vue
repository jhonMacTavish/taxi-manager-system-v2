<template>
  <ScrollBar class="slider" :positions="positions" :modelValue="currentPos" @playCtrl="playCtrl"
    @handleEvent="handleEvent">
  </ScrollBar>
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
  <div id="container" v-loading="loading"></div>
</template>

<script setup>
import { onBeforeUnmount, onMounted, ref } from "vue";
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
let tag = [];
let count = 0;
let offset = 0;
let passedLatLngs = null;
const route = useRouter();
const locale = zhCn;
// const carNo = ref("");
// const dateTime = ref([]);
const carNo = ref("川ADU6187");
const dateTime = ref([
  dayjs("2024-06-06 05:06:14").format("YYYY-MM-DD HH:mm:ss"),
  dayjs("2024-06-06 07:06:14").format("YYYY-MM-DD HH:mm:ss"),
]);
const positions = ref([]);
const currentPos = ref(0);
const loading = ref(false);

function initMap() {
  var center = new TMap.LatLng(30.31036, 104.444064);
  //初始化地图
  map = new TMap.Map("container", {
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
      // marker.moveAlong(
      //   {
      //     car: {
      //       path,
      //       speed: 1770,
      //     },
      //   },
      //   {
      //     autoRotation: true,
      //   }
      // );
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
      console.log(path);
      // marker.moveAlong(
      //   {
      //     car: {
      //       path,
      //       speed: 1770,
      //     },
      //   },
      //   {
      //     autoRotation: true,
      //   }
      // );
    }
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
    marker.on("moving", (e) => {
      passedLatLngs = e.car && e.car.passedLatLngs;
      let passedLth = passedLatLngs.length;
      let index = null;
      count <= tag.length - 1 ? index = tag[count].head: null;
      currentPos.value = passedLth - 1 + offset;
      if (passedLatLngs[passedLth - 2].lat == path[index].lat && passedLatLngs[passedLth - 2].lng == path[index].lng) {
        marker.pauseMove();
        let timer = setInterval(() => {
          console.log(index, tag[count].tail, index >= tag[count].tail);
          if (index >= tag[count].tail) {
            marker.resumeMove();
            console.log(tag[count]);
            for (let i = 0; i <= count; i++) {
              console.log(offset, tag[count].tail, tag[count].head);
              offset = offset + tag[count].tail - tag[count].head;
              console.log(offset);
            }
            count++;
            clearInterval(timer);
          } else {
            index++;
            currentPos.value++;
          }
        }, 100);
      }
      infowindow.setPosition(passedLatLngs[passedLth - 1]);
    });
    marker.on("move_ended", (e) => {
      count = 0;
      offset = 0;
    });
  }
};

const handleEvent = (index) => {
  console.log(currentPos.value);
  let path = [];
  let gpsData = positions.value.slice(index, positions.value.length);
  gpsData.forEach((item) => {
    // let { LAT, LNG } = item;
    // let latlang = wgs84ToGcj02(LAT, LNG);
    // console.log({ LAT, LNG });
    // console.log(latlang);
    path.push(new window.TMap.LatLng(item.LAT, item.LNG));
  });
  marker.stopMove();
  marker.updateGeometries([
    {
      id: "car",
      styleId: "car-down",
      position: path[0],
    }
  ]);
  try {
    marker.off("moving", (e) => { console.log("off") });
    marker.on("moving", (e) => {
      passedLatLngs = e.car && e.car.passedLatLngs;
      let passedLth = passedLatLngs.length;
      currentPos.value = passedLth - 1;
      console.log(currentPos.value);
      infowindow.setPosition(passedLatLngs[passedLth - 1]);
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
  } catch (err) {
    console.log(err);
    let timer = setInterval(() => {
      stopAdd();
      console.log(currentPos.value);
      currentPos.value++
    }, 100);

    function stopAdd() {
      console.log(timer);
      if (currentPos.value >= positions.value.length)
        clearInterval(timer);
    };
  }
};

const playCtrl = () => {

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
    await axios.get("/location/tencent", { params }).then((res) => {
      let data = res.data;
      loading.value = false;
      positions.value = data.positions;
      console.log(positions.value);
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
        positions.value.forEach((item, index) => {
          let { LAT, LNG } = item;
          // let latlang = wgs84ToGcj02(LAT, LNG);
          // console.log({ LAT, LNG });
          // console.log(latlang);
          gpsData.push({ LAT, LNG });
          if (index + 1 >= positions.value.length) {
            return
          }
          else {
            let element = positions.value[index];
            let next = positions.value[index + 1];
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

onMounted(() => {
  initMap();
  let params = route.currentRoute._value.query;
  // carNo.value = params.carNo;
  // dateTime.value = params.dateTime;

  if (carNo.value && dateTime.value[0] && dateTime.value[1]) {
    getPath();
  } else {
    return
  }
});

onBeforeUnmount(() => {
  marker.stopMove();
});
</script>

<style lang="less" scoped>
#container {
  /*地图(容器)显示大小*/
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
  bottom: 30px;
  left: 57%;
  transform: translateX(-50%);
  z-index: 9999;
}
</style>
