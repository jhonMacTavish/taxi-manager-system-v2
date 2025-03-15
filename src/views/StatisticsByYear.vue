<template>
    <div class="container">
        <el-card class="box-card">
            <template #header>
              <div class="card-header" >
                <span >成都天府国际机场出租车{{formattedYear(pickYear)}}年运营统计数据</span>
                <el-date-picker
                style="float:right"
                v-model="pickYear"
                type="year"
                @change="changeYear"
                placeholder="请选择年份"
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
                :show-overflow="showOverflow"
                :row-config="{isHover: true}"
                :export-config="{exportDataEvent}"
                :data="tableData">
                    <!-- <vxe-column type="checkbox" width="60"></vxe-column> -->
                    <vxe-column type="seq"  title="序号" align="center" width="60"></vxe-column>
                    <vxe-column field="terminal" title="航站楼" align="center" ></vxe-column>
                    <vxe-column field="month" title="月份" align="center" ></vxe-column>
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

    const pickYear = ref('')
    const tableRef = ref()
    const toolbarRef = ref()
    const loading = ref(false)
    const tableData =  ref([])
//     /api/v1/realtime-data/statistics/yearly 
// /api/v1/realtime-data/statistics/monthly
// /api/v1/realtime-data/statistics/daily

    const getTableData = async(year) =>{
        try{
            console.log("请求数据时候当前的年份",year)
            await axios.get("/api/v1/realtime-data/statistics/yearly?year="+year).then((res) => {
            console.log(res,"返回数据")
            if(res.data.status === 200){
                console.log("出租车按年里面的月份",year,res.data.data)
                tableData.value = res.data.data
            }
        })
        }catch(error){
            console.error("Error fetching table data:", error);
        }
       
    }
    // 当时间选择器发生改变的时候，也去修改tableData的值
    const changeYear =(value)=>{
        // const formattedYear = moment(value).format('YYYY');
        pickYear.value = formattedYear(value)
        console.log(pickYear.value,"当前的月份选择")
        getTableData( pickYear.value)
    }
    const formattedYear =(value) =>{
        return moment(value).format('YYYY')
    }
   
      const findList = () => {
        loading.value = true
        return new Promise(resolve => {
            setTimeout(() => {
                getTableData(formattedYear(pickYear.value))
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
        console.log(row.month,"传递到月份页面的月份")
        store.commit('updateSelectMonth',{selectMonth:row.month})
        router.push({ path: '/statisticsByMonth'});
    }
   
    onMounted( () => {
        const currentYear = new Date().getFullYear();
        console.log(currentYear,"currentYear")
        pickYear.value = new Date(currentYear, 0);
        console.log( pickYear.value," pickYear.value")
        getTableData(currentYear)
    })

</script>

<style lang="less" scoped>
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