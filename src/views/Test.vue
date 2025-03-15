<template></template>

<script setup lang="ts">
import { onMounted } from 'vue';
import dayjs from 'dayjs'

let foo = 2;

function toString(num: number): string {
  return String(num);
}

let x: unknown = 1;

if (typeof x === 'number') {
  let a: number = x;
}

let s: unknown = 'hello';
if (typeof s === 'string') {
  s.length
}

onMounted(() => {
});

</script>

<style scoped>
.el-table .warning-row {
  --el-table-tr-bg-color: var(--el-color-warning-light-9);
}

.el-table .success-row {
  --el-table-tr-bg-color: var(--el-color-success-light-9);
}
</style>