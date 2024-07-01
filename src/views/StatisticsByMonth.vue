<template>
    <div class="container">
        <el-card class="box-card">
            <template #header>
              <div class="card-header" >
                <span >成都天府国际机场出租车{{formattedMonth(pickMonth)}}月运营统计数据</span>
                <el-date-picker
                style="float:right"
                v-model="pickMonth"
                @change="changeMonth"
                type="month"
                placeholder="请选择月份"
                 />
              </div>
            </template>
            <div class="card-container">
                <vxe-toolbar
                custom
                print
                export
                ref="toolbarRef"
                :refresh="{query: findList}"
                >
              </vxe-toolbar>
              <vxe-table
              ref="tableRef"
              height="700"
              border
              :row-config="{isHover: true}"
              :export-config="{exportDataEvent}"
              :data="tableData">
                  <!-- <vxe-column type="checkbox" width="60"></vxe-column> -->
                  <vxe-column type="seq"  title="序号" align="center" width="60"></vxe-column>
                  <vxe-column field="terminal" title="航站楼" align="center" ></vxe-column>
                  <vxe-column field="day" title="日期" align="center" ></vxe-column>
                  <vxe-column field="totalTrips" title="总车次"  cell-type="number" align="center" ></vxe-column>
                  <vxe-column field="normalTrips" title="普通车次" align="center" ></vxe-column>
                  <vxe-column field="pdTrips" title="补短车次" align="center" ></vxe-column>
                  <vxe-column field="systemGrantedPd" title="系统授予补短" cell-type="string" sortable align="center" ></vxe-column>
                  <vxe-column field="adminGrantedPd" title="人工授予补短" align="center" ></vxe-column>
                  <vxe-column field="option" title="操作" align="center" >
                      <template  #="{ row, $index }">
                              <vxe-button status="warning" type="text"  size="small"  @click="CheckDetail(row)">查看详情</vxe-button>
                      </template>
                  </vxe-column>
            </vxe-table>
            </div>
          </el-card>
    </div>
</template>

<script setup>
     import { ref, nextTick,reactive,computed, onMounted, watch, onDeactivated, onActivated,onUnmounted } from "vue";
    import router from '../router/index.js'
    import axios from "axios";
    import moment from "moment";
    import { useStore } from "vuex";
    const store = useStore();
    const pickMonth = ref()

    const tableRef = ref()
    const toolbarRef = ref()
    const loading = ref(false)
    const tableData =  ref([])

      const getTableData = async(month) =>{
        try{
            await axios.get("/api/v1/realtime-data/statistics/monthly?month="+month).then((res) => {
            if(res.data.status === 200){
                console.log("出租车按月统计的",res.data.data)
                tableData.value = res.data.data
            }
        })
        }catch(error){
            console.log("error",error)
        }
        
    }

    const findList = () => {
        loading.value = true
        return new Promise(resolve => {
            setTimeout(() => {
                getTableData(formattedMonth(pickMonth.value))
            loading.value = false
            resolve([])
            }, 300)
        })
        }

      nextTick(() => {
        // 将表格和工具栏进行关联
        const $table = tableRef.value
        const $toolbar = toolbarRef.value
        if ($table && $toolbar) {
            $table.connect($toolbar)
        }
    })

    const exportDataEvent = () => {
        const $table = tableRef.value
        if ($table) {
            $table.exportData({ type: 'csv' })
        }
    }

    // 跳转到月份统计页面
    const CheckDetail =(row) =>{
        console.log(row,"月份中的每一行数据")
        store.commit('updateSelectDay',{selectDay:row.day})
        router.push({ path: '/statisticsByDay' });
    }

    // 获取头部日期选择器内的月份
    const changeMonth =(value)=>{
        // 这里因为时间选择器里面的type是月份，只能调用change函数，打印出来的value是一个Wed May 01 2024 00:00:00 GMT+0800 (GMT+08:00)
        // 所以需要格式化
        const formattedMonth = moment(value).format('YYYY-MM');
        pickMonth.value = formattedMonth
        store.commit('selectMonth',{selectMonth:formattedMonth})
        console.log(pickMonth.value,"当前的月份选择")
        getTableData( pickMonth.value)
    }
    const formattedMonth =(value) =>{
        return moment(value).format('YYYY-MM')
    }

    const selectMonthValue = computed(()=>{
        return store.state.selectMonth
    })

    onMounted( () => {
        // getTableData()
        const currentMonth = moment().format('YYYY-MM');
        console.log(currentMonth,"currentMonth")
        if(selectMonthValue.value !== ''){
            pickMonth.value = selectMonthValue.value
            console.log( pickMonth.value," 当前选中的月份的pickMonth.value")
            getTableData(selectMonthValue.value)
        }else{
            pickMonth.value = currentMonth
        console.log( pickMonth.value," 没有选择月份的默认ickMonth.value")
        getTableData(currentMonth)
        }
        

    })

</script>

<style lang="less">
    .container{
        height: 100%;
        width: 100%;
        .box-card{

            .card-header{
                text-align: center;
                font-size: 25px;
            }
        }
    }
</style>