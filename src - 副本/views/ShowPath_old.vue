<template>
  <div class="search-box">
    <el-config-provider :locale="locale">
      <el-input
        v-model="carNo"
        placeholder="请输入车牌"
        class="input-with-select"
        style="max-width: 600px"
      >
        <template #prepend>
          <el-date-picker
            style="margin: 0 -20px 0 -20px; width: 360px"
            v-model="dateTime"
            type="datetimerange"
            range-separator="至"
            start-placeholder="开始时间"
            end-placeholder="结束时间"
            value-format="YYYY-MM-DD HH:mm:ss"
            :disabled-date="disabledDate"
          />
        </template>
        <template #append>
          <el-button @click="getPath"
            ><el-icon> <Search /> </el-icon
          ></el-button>
        </template>
      </el-input>
    </el-config-provider>
  </div>
  <div id="container" v-loading="loading"></div>
</template>

<script setup>
import { onMounted, ref } from "vue";
import { Search } from "@element-plus/icons-vue";
import axios from "axios";
// import https from "https";
import dayjs from "dayjs";
import zhCn from "element-plus/es/locale/lang/zh-cn";
import validateCarNo from "../util/tools.js";
import { useRouter } from "vue-router";

const route = useRouter();
const locale = zhCn;
const carNo = ref("");
// const dateTime = ref([]);
// const carNo = ref("川ADU4186");
const dateTime = ref([
  dayjs().add(-2,"hour").format("YYYY-MM-DD HH:mm:ss"),
  dayjs().format("YYYY-MM-DD HH:mm:ss"),
]);
let map = null;
let polylineLayer = null;
let marker = null;
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
}

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
      console.log(data);
      if (!data.positions[0]) {
        ElMessage({
          message: `车辆 ${data.carid} 在 ${data.starttime} 至 ${data.endtime} 时间段内没有GPS数据`,
          type: "warning",
        });
        return;
      } else {
        let gpsData = [];
        console.log(data.positions);
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
  carNo.value = params.carNo;
  dateTime.value = params.dateTime;

  if(carNo.value && dateTime.value[0] && dateTime.value[1]){
    getPath();
  }else{
    return
  }
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
</style>
