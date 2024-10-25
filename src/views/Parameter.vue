<template>
  <div class="container">
    <el-card>
      <el-table :data="tableData">
        <el-table-column prop="NOTE" label="参数" width="380" />
        <el-table-column prop="VALUE" label="有效期">
          <template #default="scope">
            <el-input type="number" class="input" v-model="inputValue[scope.$index]" :disabled="!scope.row.isEdit" />
          </template>
        </el-table-column>
        <el-table-column label="">
          <template #default="scope">
            <el-button :disabled="!func_no.includes('7') ? true : !scope.row.NAME.includes('carnum_pool')"
              v-show="!scope.row.isEdit" @click="scope.row.isEdit = !scope.row.isEdit">
              编辑
            </el-button>
            <el-button plain class="edit" type="primary" v-show="scope.row.isEdit"
              @click="submit(scope.$index, scope.row)">
              确定
            </el-button>
            <el-button v-show="scope.row.isEdit" @click="cancle(scope.$index, scope.row)">
              取消
            </el-button>
          </template>
        </el-table-column>
      </el-table>
    </el-card>
  </div>
</template>

<script setup>
import { onMounted, ref } from "vue";
import axios from "axios";

const func_no = ref([]);
const tableData = ref([]);
const inputValue = ref([]);

onMounted(() => {
  init();
  func_no.value = localStorage.getItem('func_no');
});

async function init() {
  await axios.get("/api/get_b_config").then((res) => {
    res.data.forEach((item) => {
      item.isEdit = false;
      inputValue.value.push(item.VALUE);
    });
    console.log(res.data);
    tableData.value = res.data;
  });
}

const submit = async (index, row) => {
  console.log(inputValue.value[index]);
  if (!inputValue.value[index]) {
    ElMessage({
      message: "请输入有效参数",
      type: "warning",
    });
    return;
  } else {
    let params = {
      name: row.NAME,
      value: inputValue.value[index],
    };
    await axios.post("/api/set_config", params).then((res) => {
      if (res.data == "success") {
        ElMessage({
          message: "参数修改成功",
          type: "success",
        });
        init();
      } else {
        ElMessage({
          message: "参数修改失败",
          type: "warning",
        });
        return;
      }
    });
    row.isEdit = !row.isEdit;
  }
};

const cancle = (index, row) => {
  inputValue.value.splice(0);
  tableData.value.forEach((item) => {
    inputValue.value.push(item.VALUE);
  });
  row.isEdit = !row.isEdit;
};
</script>

<style lang="less" scoped>
.container {
  position: relative;
  height: 100%;
  width: 100%;
  line-height: 100%;

  .el-card {
    position: relative;
    display: inline-block;
    width: 50%;
    top: 50%;
    left: 50%;
    transform: translateX(-50%) translateY(-50%);

    .el-table {
      .input {
        width: 80px;
      }

      .edit {
        margin-left: 0px;
      }
    }
  }
}
</style>
