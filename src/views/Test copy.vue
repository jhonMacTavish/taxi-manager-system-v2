<template>
  <!-- <div class="process-bar-outer" ref="outer" :style="outerStyle" @mousedown="handleOuter"> -->
  <div class="process-bar-outer" ref="outer" :style="outerStyle">
    <div class="process-bar-inner" :style="innerStyle"></div>
    <div class="process-bar-slider" :style="sliderStyle"></div>
  </div>
</template>

<script setup>
import { onMounted, ref, defineProps, defineEmits, computed, onUnmounted, reactive } from "vue";

let outerOffsetLeft;
let outer = ref(null);
let sliding = false;
let position = null;

const props = defineProps({
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
// const emit = defineEmits(['update:modelValue']);
const currPos = ref(Math.round(props.width * props.modelValue / 100));
const space = (props.sliderWidth - props.height) / 2;

const outerStyle = {
  width: props.width + 'px',
  height: props.height + 'px',
  borderRadius: props.height + 'px'
};
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
    left: currPos.value - (props.sliderWidth / 2) + 'px'
  }
});

// const handleOuter = (e: MouseEvent) => {
//   if ((position.left < e.clientX && e.clientX < position.right) && (position.top < e.clientY && e.clientY < position.bottom)) {
//     sliding = true;
//     currPos.value = handleBoundary(e.clientX - outerOffsetLeft);
//   } else {
//     return
//   }
// };

const handleBoundary = (value) => {
  value = Math.min(props.width, value);
  value = Math.max(0, value);
  // emit('update:modelValue', Math.round(value / props.width * 100))
  return value;
};

const handlMousemove = (e) => {
  if (sliding) {
    currPos.value = handleBoundary(e.clientX - outerOffsetLeft)
  }
};

const handlMousedown = (e) => {
  if ((position.left < e.clientX && e.clientX < position.right) && (position.top < e.clientY && e.clientY < position.bottom)) {
    sliding = true;
    currPos.value = handleBoundary(e.clientX - outerOffsetLeft);
    console.log(currPos.value);
  }
};

const handlMouseup = (e) => {
  sliding = false;
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

.process-bar-outer {
  caret-color: rgba(0, 0, 0, 0);
  position: relative;
  background-color: #ebeef5;

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