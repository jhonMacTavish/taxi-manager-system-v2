<template>
  <!-- <div class="process-bar-outer" ref="outer" :style="outerStyle" @mousedown="handleOuter"> -->
  <div class="process-bar-outer" ref="outer" :style="outerStyle">
    <div class="process-bar-inner" :style="innerStyle"></div>
    <div class="process-bar-slider" :style="sliderStyle"></div>
    <img v-if="!playing" class="ctrlButton" src="@/assets/image/play.png" @click="play()">
    <img v-else class="ctrlButton" src="@/assets/image/pause.png" @click="play()">
  </div>
</template>

<script setup>
import { onMounted, ref, defineProps, defineEmits, computed, onUnmounted, reactive } from "vue";

let outerOffsetLeft = 0;
let outer = ref(null);
let sliding = false;
let position = null;

const props = defineProps({
  positions: {
    type: Array,
    default: []
  },
  modelValue: {
    type: Number,
    default: 0
  },
  width: {
    type: Number,
    default: 500
  },
  height: {
    type: Number,
    default: 10
  },
  sliderWidth: {
    type: Number,
    default: 15
  }
});

const emit = defineEmits(['handleEvent']);
const currPos = ref(0);
const playing = ref(true);
const space = (props.sliderWidth - props.height) / 2;

const outerStyle = computed(() => {
  return {
    width: props.width + 'px',
    height: props.height + 'px',
    borderRadius: props.height + 'px',
    cursor: props.positions.length ? 'pointer' : 'not-allowed'
  }
});
const innerStyle = computed(() => {
  return {
    width: currPos.value + 'px',
    borderRadius: props.height + 'px'
  }
});
const sliderStyle = computed(() => {
  return {
    width: props.sliderWidth + 'px',
    height: props.sliderWidth + 'px',
    top: -space + 'px',
    left: currPos.value || props.modelValue / props.positions.length * props.width - (props.sliderWidth / 2) + 'px'
  }
});

const play = () => {
  playing.value = !playing.value;
};

const handleBoundary = (value) => {
  value = Math.min(props.width, value);
  value = Math.max(0, value);
  return value;
};

const handlMousemove = (e) => {
  if (sliding) {
    currPos.value = handleBoundary(e.clientX - outerOffsetLeft)
  }
};

const handlMousedown = (e) => {
  if (!props.positions.length) {
    return
  }
  else if ((position.left < e.clientX && e.clientX < position.right) && (position.top < e.clientY && e.clientY < position.bottom)) {
    sliding = true;
    currPos.value = handleBoundary(e.clientX - outerOffsetLeft);
    console.log(currPos.value);
  }
};

const handlMouseup = (e) => {
  if (sliding) {
    emit('handleEvent', Math.round(currPos.value / props.width * props.positions.length));
    console.log(currPos.value, props.width, props.positions.length);
    console.log(Math.round(currPos.value / props.width * props.positions.length));
  }
  sliding = false;
  playing.value = false;
};

onMounted(() => {
  position = reactive((outer.value).getBoundingClientRect());
  outerOffsetLeft = position.left;
  document.addEventListener('mousemove', handlMousemove);
  document.addEventListener('mousedown', handlMousedown);
  document.addEventListener('mouseup', handlMouseup);
});

onUnmounted(() => {
  document.removeEventListener('mousemove', handlMousemove);
  document.removeEventListener('mousedown', handlMousedown);
  document.addEventListener('mouseup', handlMouseup);
});
</script>

<style lang="less" scoped>
div {
  box-sizing: border-box;
}

.ctrlButton {
  display: inline-block;
  position: absolute;
  width: 20px;
  height: 20px;
  bottom: -5px;
  right: -25px;
  background-color: rgba(0, 0, 0, 0.3);
  border-radius: 50%;
  z-index: 99;
}

.process-bar-outer {
  caret-color: rgba(0, 0, 0, 0);
  position: relative;
  // background-color: #ebeef5;
  background-color: white;

  .process-bar-inner {
    height: 100%;
    background-color: #409eff;
  }

  .process-bar-slider {
    position: absolute;
    border-radius: 50%;
    border: 1.6px solid #409EFF;
    background-color: #ffffff;
  }
}
</style>