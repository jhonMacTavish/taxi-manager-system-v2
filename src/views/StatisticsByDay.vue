<template>
    <div class="container">
        <el-card class="box-card">
            <template #header>
              <div class="card-header" >
                <span >成都天府国际机场出租车{{formattedDay(pickDay)}}日运营统计数据</span>
                <el-date-picker
                style="float:right"
                v-model="pickDay"
                @change="changeDay"
                type="day"
                placeholder="请选择日期"
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
                <template #buttons>
                    <vxe-select v-model="selectFilter" style="width:120px;" clearable placeholder="审核|驳回">
                        <vxe-option  value="judgeNoteSelect" label="驳回理由"></vxe-option>
                        <vxe-option value="judgedSelect" label="审核结果"></vxe-option> 
                    </vxe-select>
                    <vxe-input v-model="filterName" type="search" style="width:380px;" clearable placeholder="车牌号|航站楼|车辆类型|资格下发|审核结果|驳回理由" ></vxe-input>
                </template>
              </vxe-toolbar>
              <!-- <vxe-input v-model="filterName" type="search" style="width:230px;" clearable placeholder="车牌号|航站楼|车辆类型" ></vxe-input> -->
                <vxe-table
                ref="tableRef"
                height="700"
                border
                :show-overflow="showOverflow"
                :scroll-x="{enabled: true}"
                :row-config="{isHover: true}"
                :export-config="{exportDataEvent}"
                :filter-config="{showIcon: false}"
                :data="filterTableData">
                    <!-- <vxe-column type="checkbox" width="60"></vxe-column> -->
                    <vxe-column type="seq"  title="序号" align="center" width="60"></vxe-column>
                    <vxe-column field="carId" title="车牌号" width="100" align="center" ></vxe-column>
                    <vxe-column field="terminal" title="航站楼" width="90" sortable align="center" ></vxe-column>
                    <vxe-column field="type" title="车辆类型" width="100" sortable align="center" >
                        <template #default="scope">
                            <span :style="{color: scope.row.type === 'long' ? 'gray' : 'orange'}">
                                {{ scope.row.type === 'long' ?  '普通' : '短途优先'}}
                              </span>
                        </template> 
                    </vxe-column>
                    <vxe-column field="poolInTime" title="进蓄车场" width="100" sortable align="center" ></vxe-column>
                    <vxe-column field="pdInTime" title="进补短区" width="110" sortable align="center" ></vxe-column>
                    <vxe-column field="poolOutTime" title="出蓄车场" width="100" sortable align="center" ></vxe-column>
                    
                    <vxe-column field="terminalInTime" title="进航站楼" width="100" sortable align="center" ></vxe-column>
                    <vxe-column field="terminalOutTime" title="出航站楼" width="100" sortable align="center" ></vxe-column>
                    <vxe-column field="giveUpTime" title="空车驶离" width="100" sortable align="center" ></vxe-column>
                    
                    <vxe-column field="runOdometer" title="里程数" width="70" align="center" ></vxe-column>
                    <vxe-column field="timeGetOn" title="上客时间" width="100" sortable align="center" ></vxe-column>
                    <vxe-column field="timeGetOff" title="下客时间" width="100" sortable align="center" ></vxe-column>
                    <vxe-column field="pd" title="短途资格下发人" width="80" align="center" >
                        <template #default="scope">
                            <span :style="{color: scope.row.pd === null ? '' : (scope.row.pd == 'system' ? 'gray' : 'orange')}">
                                {{ scope.row.pd === null ?  '' : (scope.row.pd == 'system' ? '系统' : '人工') }}
                              </span>
                        </template>
                    </vxe-column>
                    <vxe-column field="expirationTime" title="资格过期" sortable width="100" align="center" ></vxe-column>
                    <vxe-column field="useTime" title="资格使用" sortable width="100" align="center" ></vxe-column>

                    <vxe-column field="judgeCreateTime" title="申诉时间" sortable width="100" align="center" ></vxe-column>
                    <vxe-column field="judgeTimeGetOn" title="复核压表" sortable width="100" align="center" ></vxe-column>
                    <vxe-column field="judgeRunOdometer" title="复核公里数" width="70" align="center" ></vxe-column>
                    <vxe-column field="judged"  title="审核结果" width="100" align="center" >
                        <template #default="scope">
                            <span :style="{color: scope.row.judged === null ? '' : (scope.row.judged == 1 ? 'green' : 'red')}">
                                {{ scope.row.judged === null ?  '' : (scope.row.judged == 1 ? '通过' : '驳回') }}
                              </span>
                        </template>
                    </vxe-column>

                    <vxe-column field="judgeNote" title="驳回理由" width="100" align="center" ></vxe-column>
                    <vxe-column field="judgeTime" title="审核时间" sortable width="100" align="center" ></vxe-column>

<!-- 
                    <vxe-column field="operation" title="操作" align="center" >
                        <template  #="{ row, $index }">
                                <vxe-button status="warning" type="text"  size="small"  @click="CheckDetail(row)">查看</vxe-button>
                        </template>
                    </vxe-column> -->
              </vxe-table>
            </div>
          </el-card>
    </div>
</template>

<script setup>
      import { ref, nextTick,reactive,computed, onMounted, watch, onDeactivated, onActivated,onUnmounted } from "vue";
    import router from '../router/index.js'
    import XEUtils from 'xe-utils'
    import axios from "axios";
    import moment from "moment";
    import { useStore } from "vuex";
    const store = useStore();
    const pickDay = ref()

    const tableRef = ref()
    const toolbarRef = ref()
    const loading = ref(false)
    const tableData =  ref([])
    
      const getTableData = async(day) =>{
        try{
            await axios.get("/api/v1/realtime-data/statistics/daily?day="+day).then((res) => {
            if(res.data.status === 200){
                console.log("出租车按日统计的",res.data.data)
                tableData.value = res.data.data
            }
        })
        }catch(error){
            console.log("error",error)
        }
        
    }
        // 全表查询
    const filterName = ref('')
    const selectFilter = ref('')
    const filterTableData = computed(() => {
        const typeMap = {
            'long':'普通',
            'pd':'短途优先'
        };
        const judgedMap = {
                    '1': '通过',
                    '-1': '驳回'
            };
        const pdMap = {
            'system': '系统',
            'admin': '人工'
                };
        return tableData.value.filter((data)=>{
            const filterNameValue = filterName.value.toLowerCase();

            const carIdValue = data.carId? data.carId.toLowerCase() :'';
            const terminalValue = data.terminal? data.terminal.toLowerCase() :'';

            const typeValue = data.type? data.type.toLowerCase() :'';
            const typeDisplayValue = typeMap[typeValue] || '';

            const pdValue = data.pd? data.pd.toLowerCase() :'';
            const pdDisplayValue = pdMap[pdValue] || '';

            const judgedValue = data.judged?data.judged.toString() :'';
            const judgeDisplayValue = judgedMap[judgedValue] || '';

            const judgeNoteValue = data.judgeNote? data.judgeNote.toLowerCase() :'';
            if(selectFilter.value == 'judgeNoteSelect'){
                return !filterNameValue|| judgeNoteValue.includes(filterNameValue)
            }else if(selectFilter.value == 'judgedSelect'){
                return !filterNameValue|| judgeDisplayValue.includes(filterNameValue)
            }else{
                return !filterNameValue || carIdValue.includes(filterNameValue) || terminalValue.includes(filterNameValue) || typeDisplayValue.includes(filterNameValue) || pdDisplayValue.includes(filterNameValue) || judgeDisplayValue.includes(filterNameValue) || judgeNoteValue.includes(filterNameValue)
            }
        })
    })


    const findList = () => {
        loading.value = true
        return new Promise(resolve => {
            setTimeout(() => {
                getTableData(formattedDay(pickDay.value))
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
        console.log(row,"每日中的每一行数据")
        // store.commit('selectDay',{selectDay:row.day})
        // router.push({ path: '/statisticsByDay' });
    }

    // 获取头部日期选择器内的月份
    const changeDay =(value)=>{
        // 这里因为时间选择器里面的type是月份，只能调用change函数，打印出来的value是一个Wed May 01 2024 00:00:00 GMT+0800 (GMT+08:00)
        // 所以需要格式化
        // const formattedDay = moment(value).format('YYYY-MM-DD');
        pickDay.value = formattedDay(value)
        store.commit('updateSelectDay',{selectDay:pickDay.value})
        console.log(pickDay.value,"当前的日期选择")
        getTableData( pickDay.value)
    }
    const formattedDay =(value) =>{
        return moment(value).format('YYYY-MM-DD')
    }

    const selectDayValue = computed(()=>{
        return store.state.selectDay
    })

    onMounted( () => {
        // getTableData()
        const currentDay = moment().format('YYYY-MM-DD');
        console.log(currentDay,"currentDay")
        if(selectDayValue.value !== ''){
            pickDay.value = selectDayValue.value
            console.log( pickDay.value," 当前选中的日期的pickDay.value")
            getTableData(selectDayValue.value)
        }else{
            pickDay.value = currentDay
        console.log( pickDay.value," 没有选择月份的默认pickDay.value")
        getTableData(currentDay)
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