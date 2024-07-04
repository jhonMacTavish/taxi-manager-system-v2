<template lang="">
    <div class="container">
        <el-card style="padding:0px">
            <template #header>
            <div class="card-header">
                <h3>出租车实时情况</h3>
            </div>
            </template>
            <div class="card-container">
                <el-row :gutter="40">
                    <el-col :span="12" style="border-right:1px solid #e4e7ed">
                        <!-- t1 -->
                        <div class="taxi-container">
                            <h3 class="title-line" @click="loadTableData('t1')">T1</h3>
                            <el-row>
                                <el-col :span="4">
                                    <!-- 蓄车场 -->
                                    <div class="pool">
                                        <div class="pool-line" @click="loadTableData('t1_pool_short')">
                                            <p class="number">{{ pool_short_1 }}</p>
                                            <p class="line">排短</p>
                                        </div>
                                        <div class="pool-line" @click="loadTableData('t1_pool_normal')">
                                            <p class="number">{{pool_normal_1}}</p>
                                            <p class="line">正常</p>
                                        </div>
                                        <p class="pool-name">T1蓄车场</p>
                                    </div>
                                </el-col>
                                <el-col :span="8">
                                    <!-- 路途中 -->
                                        <div class="on-the-way" @click="loadTableData('t1_on_the_way')">
                                            <div class="number">{{on_the_way_long_1 + on_the_way_short_1}}</div>
                                            <div class="line">
                                            路途车
                                            </div>
                                        
                                        </div>
                                </el-col>
                                <el-col :span="12">
                                    <!-- 航站区 -->
                                    <div class="terminal border-root-line" >
                                        <div class="terminal_line">
                                            <div class="line border-line">第一条道</div>
                                            <div class="number"  @click="loadTableData('t1_terminal_1')">{{terminal_1_1 }}</div>
                                            <div class="add-number"  @click="loadTableData('t1_terminal_1_with1h')">{{terminal_1_1_with1h}}</div>
                                        </div>
                                        <div class="terminal_line">
                                            <div class="line border-line">第二条道</div>
                                            <div class="number" @click="loadTableData('t1_terminal_2')">{{terminal_2_1 }}</div>
                                            <div class="add-number" @click="loadTableData('t1_terminal_2_with1h')">{{terminal_2_1_with1h}}</div>
                                        </div>
                                        <div class="terminal_line">
                                            <div class="line border-line">补短通道</div>
                                            <div class="number" @click="loadTableData('t1_terminal_pd1')">{{terminal_short_1 }}</div>
                                            <div class="add-number" @click="loadTableData('t1_terminal_pd1_with1h')">{{terminal_short_1_with1h}}</div>
                                        </div>
                                    </div>
                                </el-col>
                            </el-row>

                        </div>
                    </el-col>
                  

                    <el-col :span="12" style="border-right:1px solid #e4e7ed">
                        <!-- t2 -->
                        <div class="taxi-container">
                            <h3 class="title-line" @click="loadTableData('t2')">T2</h3>
                            <el-row>
                                <el-col :span="4">
                                    <!-- 蓄车场 -->
                                    <div class="pool">
                                        <div class="pool-line" @click="loadTableData('t2_pool_short')">
                                            <p class="number">{{ pool_short_2 }}</p>
                                        <p class="line">排短</p>
                                        </div>
                                        <div class="pool-line" @click="loadTableData('t2_pool_normal')">
                                            <p class="number">{{pool_normal_2}}</p>
                                        <p class="line">正常</p>
                                        </div>
                                        <p class="pool-name">T2蓄车场</p>
                                    </div>
                                </el-col>
                                <el-col :span="8">
                                    <!-- 路途中 -->
                                        <div class="on-the-way" @click="loadTableData('t2_on_the_way')">
                                            <div class="number">{{on_the_way_long_2 + on_the_way_short_2}}</div>
                                            <div class="line">
                                            路途车
                                            </div>
                                        
                                        </div>
                                </el-col>
                                <el-col :span="12">
                                    <!-- 航站区 -->
                                    <div class="terminal border-root-line" >
                                        <div class="terminal_line">
                                            <div class="line border-line">第一条道</div>
                                            <div class="number"  @click="loadTableData('t2_terminal_1')">{{terminal_1_2 }}</div>
                                            <div class="add-number" @click="loadTableData('t2_terminal_1_with1h')">{{terminal_1_2_with1h}}</div>
                                        </div>
                                        <div class="terminal_line">
                                            <div class="line border-line">第二条道</div>
                                            <div class="number" @click="loadTableData('t2_terminal_2')">{{terminal_2_2 }}</div>
                                            <div class="add-number" @click="loadTableData('t2_terminal_2_with1h')">{{terminal_2_2_with1h}}</div>
                                        </div>
                                        <div class="terminal_line">
                                            <div class="line border-line">补短通道</div>
                                            <div class="number" @click="loadTableData('t2_terminal_3')">{{terminal_short_2 }}</div>
                                            <div class="add-number" @click="loadTableData('t2_terminal_pd1_with1h')">{{terminal_short_2_with1h}}</div>
                                        </div>
                                    </div>
                                </el-col>
                            </el-row>

                        </div>
                    </el-col>
                  
               
            </el-row>
            </div>
          
            <template #footer>
                <div class="card-footer">
                    <el-row >
                        <el-col :span="12">
                            <h4>成都天府国际机场出租车{{tableName}}车辆数据</h4>
                        </el-col>
                        <el-col :span="12">
                            <vxe-input v-model="filterName" type="search" style="width:380px; float:right; margin-top:15px; " clearable placeholder="车牌号|航站楼|车辆类型|放车批次|强制抬杆|空车驶离" ></vxe-input>
                        </el-col>
                    </el-row>
                    <!-- <div class="card-footer-header">
                       
                        
                    </div> -->
                    
                    <vxe-table
                    ref="xTable"
                    class="my-vxe-table"
                    border
                    stripe
                    :menu-config="menuConfig"
                    @menu-click="contextMenuClickEvent"
                    empty-text="暂无数据"
                    height="400"
                    :column-config="{resizable: true}"
                    :row-config="{isHover: true}"
                    :scroll-y="{enabled:true}"
                    :data=" filterTableDataSelect"
                    >
                    <!--  :scroll-y="{enabled:false, gt:25} -->
                    <!--   :scroll-y="{enabled:true, oSize:200}" 加上这个虚拟滚动的话，会导致页面不断的抖动，但是不加，后面可能会比较卡顿 -->
                    <vxe-column title="序号" type="seq" align="center"> </vxe-column>
                    <vxe-column title="车牌号" field="carId" width="100" align="center" sortable></vxe-column>
                    <vxe-column title="航站楼" field="terminal" align="center"sortable></vxe-column>
                    <vxe-column title="进蓄车场" field="poolInTime" :formatter="formatTime" width="100"  align="center"sortable></vxe-column>
                    <vxe-column title="车辆类型" field="type" align="center" :formatter="formatType" sortable></vxe-column>
                    <vxe-column title="进补短区" field="pdInTime" :formatter="formatTime" width="100" align="center" sortable></vxe-column>
                    <vxe-column title="出蓄车场" field="poolOutTime" :formatter="formatTime" width="100" align="center"  sortable></vxe-column>
                    <vxe-column title="放车批次" field="poolOutBatchId" align="center"  sortable></vxe-column>
                    <vxe-column title="放车顺序" field="poolOutBatchOrder" align="center"  sortable></vxe-column>
                    <vxe-column title="航站楼强制抬杆" field="once" width="80" align="center" ></vxe-column>
                    <vxe-column title="进航站楼" field="terminalInTime" :formatter="formatTime" width="100"  align="center"  sortable></vxe-column>
                    <vxe-column title="车道" field="line" align="center" sortable></vxe-column>
                    <vxe-column title="出航站楼" field="terminalOutTime" :formatter="formatTime" width="100"  align="center"  sortable></vxe-column>

                    <vxe-column title="空车驶离" field="giveUpTime"  :formatter="formatTime" width="100"  align="center"  sortable></vxe-column>
                    <vxe-column title="空车驶离操作人" field="giveUpBy"  width="80"  align="center"</vxe-column>
                    </vxe-table>
                </div>
               
            </template>
        </el-card>
    </div>
</template>

<script setup>
import { ref, reactive,computed, onMounted, watch, onDeactivated, onActivated,onUnmounted } from "vue";
import axios from "axios";
import Connector from "../util/connector.js";
import { useStore } from "vuex";
import XEUtils from 'xe-utils'
import moment from "moment";
const store = useStore();



// 获取出租车数据  
// T1的数据
const pool_normal_1 = ref(0);
const pool_short_1 = ref(0);
const on_the_way_long_1 = ref(0);
const on_the_way_short_1 = ref(0);
const terminal_1_1 = ref(0);
const terminal_2_1 = ref(0);
const terminal_short_1 = ref(0);
const terminal_1_1_with1h = ref(0)
const terminal_2_1_with1h = ref(0)
const terminal_short_1_with1h = ref(0)
// T2的数据
const pool_normal_2 = ref(0);
const pool_short_2 = ref(0);
const on_the_way_long_2 = ref(0);
const on_the_way_short_2 = ref(0);
const terminal_1_2 = ref(0);
const terminal_2_2 = ref(0);
const terminal_short_2 = ref(0);
const terminal_1_2_with1h = ref(0)
const terminal_2_2_with1h = ref(0)
const terminal_short_2_with1h = ref(0)



// 通过api请求出租车数据
const getTaxiNumber= async () =>{
    // 老的api地址 /api/get_taxi_num
        await axios.get("/api/v1/realtime-data/overview").then((res) => {
            console.log(res,"出租车数据")
            if(res.data.status === 200){
                let data = res.data.data;
                data.forEach((item)=>{
                    switch (item.id) {
                        case 'poolT1':
                            pool_normal_1.value = typeof item.num !== "undefined" ? item.num : item.num;
                            break;
                        case 'pdT1':
                            pool_short_1.value = typeof item.num !== "undefined" ? item.num : item.num;
                            break;
                        case 'wayT1pd':
                            on_the_way_short_1.value = typeof item.num !== "undefined" ? item.num : item.num;
                            break;
                        case 'wayT1long':
                            on_the_way_long_1.value = typeof item.num !== "undefined" ? item.num : item.num;
                            break;
                        case 'terminalT1pd1':
                            terminal_short_1.value = typeof item.num !== "undefined" ? item.num : item.num;
                            break;
                        case 'terminalT1long1':
                            terminal_1_1.value = typeof item.num !== "undefined" ? item.num : item.num;
                            break;
                        case 'terminalT1long2':
                            terminal_2_1.value = typeof item.num !== "undefined" ? item.num : item.num;
                            break;
                        case 'terminalT1long1Within1h':
                            terminal_1_1_with1h.value = typeof item.num !== "undefined" ? item.num : item.num;
                            break;
                        case 'terminalT1long2Within1h':
                            terminal_2_1_with1h.value = typeof item.num !== "undefined" ? item.num : item.num;
                            break;
                        case 'terminalT1pd1Within1h':
                            terminal_short_1_with1h.value = typeof item.num !== "undefined" ? item.num : item.num;
                            break;

                        // T2
                        case 'poolT2':
                            pool_normal_2.value = typeof item.num !== "undefined" ? item.num : item.num;
                            break;
                        case 'pdT2':
                            pool_short_2.value = typeof item.num !== "undefined" ? item.num : item.num;
                            break;
                        case 'wayT2pd':
                            on_the_way_short_2.value = typeof item.num !== "undefined" ? item.num : item.num;
                            break;
                        case 'wayT2long':
                            on_the_way_long_2.value = typeof item.num !== "undefined" ? item.num : item.num;
                            break;
                        case 'terminalT2pd1':
                            terminal_short_2.value = typeof item.num !== "undefined" ? item.num : item.num;
                            break;
                        case 'terminalT2long1':
                            terminal_1_2.value = typeof item.num !== "undefined" ? item.num : item.num;
                            break;
                        case 'terminalT2long2':
                            terminal_2_2.value = typeof item.num !== "undefined" ? item.num : item.num;
                            break;
                        case 'terminalT2long1Within1h':
                            terminal_1_2_with1h.value = typeof item.num !== "undefined" ? item.num : item.num;
                            break;
                        case 'terminalT2long2Within1h':
                            terminal_2_2_with1h.value = typeof item.num !== "undefined" ? item.num : item.num;
                            break;
                        case 'terminalT2pd1Within1h':
                            terminal_short_2_with1h.value = typeof item.num !== "undefined" ? item.num : item.num;
                            break;
                    default:
                        break;
                    }
                })
            }
        })
    }
// 接收MQ的出租车消息 使用MQ的方法，留在这里万一后面要用MQ做个参考
// const client = new Connector(
//     (frame) => {
//         let fme_data = JSON.parse(frame.body);
//         // 连接成功的回调函数
//         switchData(fme_data.type, fme_data.mark, fme_data.data);
//         // console.log(frame.body,"接收到数据")
//     },
//     (frame) => {
//         console.log("连接断开，尝试重启连接");
//         // client.offLine();
//         client.connect();
//     }
// );


const timer_getTableData = ref()
onMounted( async () => {
    await  getTaxiNumber();
    await getDetailTable();
    await loadTableData2("");
    timer_getTableData.value = setInterval(() => {
        getTaxiNumber();
    // 先去获取流程表中的详细数据
    getDetailTable();
    // 再根据当前存储的筛选条件，加载筛选表格的数据
    console.log("当前点击的筛选条件",filterStr.value)
    loadTableData2(filterStr.value);
    }, 5000); // 每 5 秒执行一次
})

onUnmounted(() => {
    clearInterval(timer_getTableData.value);
});

// 从蓄车场到航站楼的路途车有一个过期时间，本来是需要从api里面获取这个过期时间的，现在不需要了
// const filterExpiredMinutes =(minutes, timeStr) =>{
//     const currentTimeStamp = moment().valueOf();
//     let timeStrTimeStamp =  moment(timeStr).valueOf();
//     // console.log("被转化的时间字符串与其时间戳",timeStr,timeStrTimeStamp)
//     let min = parseInt(minutes)
//     let addMinutesStrTimeStamp = moment(timeStrTimeStamp).add(min, 'minutes').valueOf();
//     return currentTimeStamp <= addMinutesStrTimeStamp
// }
// const expiredMinutes = ref('')
// const getExpiredMinutes = async() =>{
//     try{
//         await axios.get("/api/get_config").then((res)=>{
//         console.log(res.data,"获取过期参数")
//        let config = res.data.find(item=>item.NAME === 'pool_out_expire');
//        expiredMinutes.value =   config ? config.VALUE : null;
//     })
//     }catch(error){
//         console.error("获取过期时间失败", error);
//         return null;
//     }
// }


// 下方的表格数据
const xTable = ref([])
const tableData =  ref( [])
const filterName = ref('')
const getDetailTable = async() => {
    // 老api /api/process_list
    await axios.get("/api/v1/realtime-data/detail").then((res) => {
            console.log(res,"process数据")
            if(res.data.status === 200){
                let data = res.data.data;
                tableData.value = data;
                // console.log(data,"process数据")
            }
        })
}

const filterTableData = ref([])

const filterTableDataSelect = computed(() => {
    const filterNameValue = filterName.value.toLowerCase();
    const typeMap = {
            'long':'普通',
            'pd':'短途优先'
        };
     
    return filterTableData.value.filter((data)=>{
        const typeValue = data.type? data.type.toLowerCase() :'';
        const typeDisplayValue = typeMap[typeValue] || '';
        const carIdValue = data.carId? data.carId.toLowerCase() :'';
        const terminalValue = data.terminal? data.terminal.toLowerCase() :'';
        const poolOutBatchIdValue = data.poolOutBatchId? data.poolOutBatchId.toString() :''
        const onceValue = data.once? data.once.toString() :'';
        const giveUpByValue = data.giveUpBy? data.giveUpBy.toString() :'';
        return !filterNameValue || carIdValue.includes(filterNameValue) || terminalValue.includes(filterNameValue) || poolOutBatchIdValue.includes(filterNameValue) ||typeDisplayValue.includes(filterNameValue) || onceValue.includes(filterNameValue) || giveUpByValue.includes(filterNameValue)
        
    })
})
const tableName = ref('')

const loadTableData = (str) =>{
    console.log("点击获取筛选条件",str)
    store.commit("updateClickTitleStr",{clickTitleStr:str})
    loadTableData2(str)
}
// 格式化表中的时间
const formatTime = ({ cellValue }) => {
  return XEUtils.toDateString(cellValue, 'yyyy-MM-dd HH:mm:ss')
}
const formatType = ({ cellValue }) => {
  return cellValue === 'pd' ? '短途优先' : '普通'
}

const filterStr = computed(() => {
return store.state.clickTitleStr
});

// 根据存储的筛选条件进行表格的及时刷新
const loadTableData2 = (str) => {
    switch(str){
        case 't1':
            filterTableData.value =   tableData.value.filter(item => item.terminal === 'T1')
            tableName.value = 'T1全流程'
            break;
        
        case 't1_pool_short':
            filterTableData.value =   tableData.value.filter(item => item.terminal === 'T1'&& item.poolInTime != null && item.poolOutTime == null && item.type == 'pd')
            tableName.value = 'T1蓄车场排短'
            break;
        case 't1_pool_normal':
            filterTableData.value =   tableData.value.filter(item => item.terminal === 'T1'&& item.poolInTime != null && item.poolOutTime == null && item.type == null)
             tableName.value = 'T1蓄车场正常'
            break;
        case 't1_on_the_way':
            // console.log("当前时间和出蓄车场时间是否超过设定分钟",expiredTime)
            // filterTableData.value =   tableData.value.filter(item =>  item.terminal === 'T1'&& item.poolInTime != null && filterExpiredMinutes(expiredMinutes.value,item.poolOutTime)  && item.terminalInTime==null)
            filterTableData.value =   tableData.value.filter(item =>  item.terminal === 'T1' && item.poolOutTime != null && item.terminalInTime==null)
            tableName.value = 'T1路途'
            break;
        case 't1_terminal_1':
            filterTableData.value =   tableData.value.filter(item =>  item.terminal === 'T1'&& item.terminalInTime!=null && item.line == '1'&& item.type!='pd' && item.terminalOutTime==null)
             tableName.value = 'T1航站楼第一通道'
            break;
        case 't1_terminal_1_with1h':
            filterTableData.value =   tableData.value.filter(item =>  item.terminal === 'T1' && item.line == '1'&& item.type!='pd' && item.terminalOutTime!=null)
             tableName.value = 'T1航站楼第一通道离开未超1小时'
            break;
            
        case 't1_terminal_2':
            filterTableData.value =   tableData.value.filter(item =>  item.terminal === 'T1'&& item.terminalInTime!=null && item.line == '2' && item.type!='pd' && item.terminalOutTime==null)
            tableName.value = 'T1航站楼第二通道'
            break;
        case 't1_terminal_2_with1h':
            filterTableData.value =   tableData.value.filter(item =>  item.terminal === 'T1' && item.line == '2'&& item.type!='pd' && item.terminalOutTime !=null)
             tableName.value = 'T1航站楼第二通道离开未超1小时'
            break;

        case 't1_terminal_pd1':
            filterTableData.value =  tableData.value.filter(item =>  item.terminal === 'T1'&& item.terminalInTime!=null && item.type=='pd' && item.terminalOutTime==null)
            tableName.value = 'T1航站楼补短通道'
            break;
        
        case 't1_terminal_pd1_with1h':
            filterTableData.value =   tableData.value.filter(item =>  item.terminal === 'T1' && item.type=='pd' && item.terminalOutTime != null)
             tableName.value = 'T1航站楼补短通道离开未超1小时'
            break;

        case 't2':
            filterTableData.value =   tableData.value.filter(item => item.terminal === 'T2')
            tableName.value = 'T2全流程'
            break;
        case 't2_pool_short':
            filterTableData.value =   tableData.value.filter(item => item.terminal === 'T2'&& item.poolInTime != null && item.poolOutTime == null &&  item.type == 'pd')
            tableName.value = 'T2蓄车场排短'
            break;
        case 't2_pool_normal':
            filterTableData.value =   tableData.value.filter(item => item.terminal === 'T2'&& item.poolInTime != null && item.poolOutTime == null && item.type == null)
             tableName.value = 'T2蓄车场正常'
            break;
        case 't2_on_the_way':
            filterTableData.value =   tableData.value.filter(item =>  item.terminal === 'T2'&& item.poolOutTime != null && item.terminalOutTime==null)
            tableName.value = 'T2路途'
            break;
        case 't2_terminal_1':
            filterTableData.value =   tableData.value.filter(item =>  item.terminal === 'T2'&& item.terminalInTime!=null && item.line == '1' && item.terminalOutTime==null)
             tableName.value = 'T2航站楼第一通道'
            break;
        case 't2_terminal_1_with1h':
            filterTableData.value =   tableData.value.filter(item =>  item.terminal === 'T1'&& item.terminalInTime!=null && item.line == '1'&& item.type!='pd' && item.terminalOutTime==null)
             tableName.value = 'T2航站楼第一通道离开未超1小时'
            break;

        case 't2_terminal_2':
            filterTableData.value =   tableData.value.filter(item =>  item.terminal === 'T2'&& item.terminalInTime!=null && item.line == '2' && item.terminalOutTime==null)
            tableName.value = 'T2航站楼第二通道'
            break;
        case 't2_terminal_2_with1h':
            filterTableData.value =   tableData.value.filter(item =>  item.terminal === 'T1'&& item.terminalInTime!=null && item.line == '2'&& item.type!='pd' && item.terminalOutTime==null)
             tableName.value = 'T2航站楼第二通道离开未超1小时'
            break;

        case 't2_terminal_3':
            filterTableData.value =  tableData.value.filter(item =>  item.terminal === 'T2'&& item.terminalInTime!=null &&  item.type=='pd' && item.terminalOutTime==null)
            tableName.value = 'T2航站楼补短通道'
            break;
        case 't2_terminal_pd1_with1h':
            filterTableData.value =   tableData.value.filter(item =>  item.terminal === 'T1'&& item.terminalInTime!=null && item.line == '1'&& item.type=='pd' && item.terminalOutTime==null)
             tableName.value = 'T2航站楼补短通道离开未超1小时'
            break;

        default:
            filterTableData.value = tableData.value
            tableName.value = '全场'
            break;
        }
}

const menuConfig = reactive({
    body: {
    options: [
        [
        { code: 'giveup', name: '空车驶离' }
        ],
    ]
    },
})
// 拼显界面右键菜单函数
const contextMenuClickEvent = ({ menu, row, column }) => {
    if(menu.code === 'giveup'){
       giveUpOption(row) 
    }
}

const giveUpOption = (row) => {
    try {
        let userName = localStorage.getItem('user')
        // console.log(row.id,userName,"用户登录名")
        ElMessageBox.confirm(
        `是否让${row.carId}空车驶离`,
        '警告',
        {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning',
        }).then(() => {
            axios.post('/api/give_up', {
            processid:row.id,
            user: userName,
            }).then((res) => {
                console.log(res,"空车驶离返回值")
                if(res.status === 200){
                    ElMessage({
                    type: 'success',
                    message: res.data,
                }) 
                loadTableData2(filterStr.value);
                }else{
                    ElMessageBox.alert(res.data, '警告内容', {
                        confirmButtonText: '确认',
                        type: 'error',
                        icon: 'delete'
                    })
                }
            })
        })
 
    }catch (error) {
        console.log(error)
    }
   
    
}


</script>


<style lang="less" scoped>
    .container {
    height: 100%;
     /* width: 800px; */
    position: relative;
        .title-line{
            /* height: 100%; */
            line-height: 25px;
            text-align: right;
            vertical-align: middle;
            
        }
        .title-line:hover{
            background-color: rgb(67, 150, 202);
            opacity: 0.5;
            color: white;
            cursor: pointer;
        }
        .el-card {
            height: 100%;
            width: 100%;
            .card-header{
                /* height:30px !important;
                // font-size: 25px;
                // line-height: 30px; */
                padding: 5px;
            // text-align: center;
            vertical-align: middle;
                // border: 1px solid red;
            }
            .card-container{
                height: 80% !important;
                // border: 1px solid red;
                padding: -10px 0 !important;
                .title-header{
                height: 100%;
                .header-text{
                // border: 1px solid red;
                margin-top: 10px;
                height: 100px;
                line-height: 100px;
                text-align: center;
                vertical-align: middle;
                font-size: 30px;
                }
            }
        
            .border-root-line{
                // padding-right: 5px;
                border-left:1px dashed #539AF7;
            }

            .taxi-container{
                height: 300px;
                 /* border: 1px solid red; */
                padding: 15px;
                .terminal{
                    border-left: 1px solid #539AF7;
                     /* border: 1px solid #539AF7; */
                    // padding-bottom: 10px;
                    // margin-left: 5px;
                    // padding-right: 5px;
                    height: 250px;
                    
                    .terminal_line{
                        // border: 1px solid red;  
                        height: 30%;
                        margin: 5px;
                        position: relative;
                        .number{
                        height: 55px;
                        line-height: 55px;
                        font-size: 35px;
                        width: 40px;
                        position: absolute;
                        top: 40%;  
                        right: 20%;
                        transform: translate(-30%,-25%);
                        // margin-bottom: 10px;
                        // padding-bottom: 10px;
                        color: #3cb371;
                        /* border: 1px solid red; */
                        }
                        .add-number{
                            height: 55px;
                        line-height: 55px;
                        font-size: 35px;
                        width: 40px;
                        position: absolute;
                        top: 40%;  
                        right: 0%;
                        transform: translate(0,-25%);
                        color: #e58510dc;
                        }
                        .number:hover{
                            background-color: #539AF7;
                        opacity: 0.3;
                        color: white !important;
                        cursor: pointer; 
                        }
                        .add-number:hover{
                            background-color: #539AF7;
                        opacity: 0.3;
                        color: white !important;
                        cursor: pointer;
                        }
                        .border-line {
                            border-top: 1px dashed #539AF7;
                            border-bottom: 1px dashed #539AF7; /* 也可以单独添加一个类来移除 border-right */
                        }
                        .line{
                            position: absolute;
                            top: 40%;  
                            left: 40%;
                            transform: translate(-40%,-25%);
                            // border: 1px solid red;
                            letter-spacing: 35px;
                            text-align:left;
                            line-height:45px;
                            width: 100%;
                            // top: 0;
                            // bottom :0;
                            // margin: auto;
                            font-size: 15px;
                            color: #539AF7;
                            
                        }
                        /* .line:hover{
                        background-color: #539AF7;
                        opacity: 0.3;
                        color: white !important;
                        cursor: pointer;
                        } */
                    }
                    
                }
                .on-the-way{
                    position: relative;
                    /* 3、对应的，需要父类的高度够支撑字体原有的高度加上字间距的高度 */
                    height: 250px;
                    width: 100%;
                    /* 设置子类居中 */
                    text-align: center;
                    /* border: 1px solid blue; */
                    /* 让边线不贴着上面的div */
                    /* margin-top:10px; */
                        .number{
                            line-height: 100px;
                            height: 100px;
                            width: 100%;
                            font-size: 50px;
                            /* padding-bottom: 10px; */
                            color: #3cb371;
                            /* top: -40%;   */
                            left: -50%;
                            transform: translate(30%,70%);
                            /* border: 1px solid red; */
                        }
                        .line{
                            position: absolute;
                            /* opacity: 0.5; 设置透明度为50% */
                            border-top:1px dashed #539AF7;
                            border-bottom:1px dashed #539AF7;
                            /* border:1px solid red; */
                            /* height: 100%; */
                            /* 4、这里的行高就是页面上看见的宽度，因为字体是竖着写的 */
                            line-height: 100px;
                            height: 100px;
                            width: 100%;
                            /* 1、让字体竖着写 */
                            /* 2、 只能通过控制字间距来让字体变长 */
                            letter-spacing: 35px;
                            text-align: center;

                            /* 让字体相对于box居中 */
                            top: 0;
                            bottom: 0;
                            left: 0;
                            right: 0;
                            margin: auto;
                            color: #539AF7;
                        }
                        .line:hover{
                        background-color: #539AF7;
                        opacity: 0.3;
                        color: white !important;
                        cursor: pointer;
                        }
                }
                .pool {
                    display: grid;
                    grid-template-rows: 40% 40% 15%;  /* 高度按比例分配 */
                    height: 250px;                    /* 使 .pool 填充满整个视口高度，可以根据需要调整 */
                    width: 100%;                      /* 使 .pool 填充满整个宽度 */
                    border: 1px solid #539AF7;
                    .pool-line {
                        display: flex;
                        justify-content: center;  /* 水平方向居中 */
                        align-items: flex-end;    /* 垂直方向底部对齐 */
                        position: relative;
                        .number {
                            position: absolute;
                            height: 50px;
                            width: 150px;
                            display: flex;
                            justify-content: center;   /* 水平方向居中 */
                            align-items: center;       /* 垂直方向居中 */
                            font-size: 40px;
                            color: #3cb371;
                        }
                        .line {
                            position: absolute;
                            bottom: 0;                  /* 垂直方向底部对齐 */
                            height: 90px;
                            width: 100%;
                            display: flex;
                            justify-content: center;   /* 水平方向居中 */
                            align-items: flex-end;     /* 垂直方向底部对齐 */
                            font-size: 15px;
                            color: #539AF7;
                        }
                        
                        .line:hover{
                        color: white;
                        background-color: #539AF7;
                        opacity: 0.3;
                        cursor: pointer;
                        }
                    }


                    .pool-name {
                        display: flex;
                        justify-content: center;   /* 水平方向居中 */
                        align-items: center;       /* 垂直方向居中 */
                        font-size: 20px;
                        color: #539AF7;
                    }
                }

            } // taxi-container-end
            } //card-container
            
            .card-footer{
                .card-footer-header{
                    display: inline-block;
                }
               
                ::v-deep(.my-vxe-table.vxe-table){
                --vxe-table-border-color: #1f4868 !important
                }
            }
        

        } // el-card-end
        
        :deep(.el-card){
            --el-card-padding: 2px 0 !important;
        }
    
 
    }// container-end

</style>