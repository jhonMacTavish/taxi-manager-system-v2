import { createStore } from 'vuex'

const store = createStore({
    state: {
        // 出租车动态全部数据放在一个数组内
        Dashboard_taxi_data: [],
        clickTitleStr : '',
        // 用于存储统计页面上的年份页面传递月份的参数
        selectMonth:'',
        selectDay:'',
    },
    mutations: {
        // 更新出租车动态数据
      updateDashboard_taxi_data(state, payload) {
        state.Dashboard_taxi_data = payload.Dashboard_taxi_data
      },

      updateClickTitleStr(state,payload){
        state.clickTitleStr = payload.clickTitleStr
      },

      updateSelectMonth(state,payload){
        state.selectMonth = payload.selectMonth
      },
      updateSelectDay(state,payload){
        state.selectDay = payload.selectDay
      }
    },

    actions: {
       
    }
})

export default store