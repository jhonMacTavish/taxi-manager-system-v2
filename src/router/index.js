import { createRouter, createWebHistory } from "vue-router";
import Layout from "@/views/Layout.vue";
import Monitor from "@/views/Monitor.vue";
import LvfuMonitor from "@/views/LvfuMonitor.vue";
import AuditMonitor from "@/views/AuditMonitor.vue";
import StatusOnPool from "@/views/StatusOnPool.vue";
import StatusOnWay from "@/views/StatusOnWay.vue";
import StatusOnTerminal from "@/views/StatusOnTerminal.vue";
import VisitHistory from "@/views/VisitHistory.vue";
import Statistics from "@/views/Statistics.vue";
import Offsets from "@/views/Offsets.vue";
import Distance from "@/views/Distance.vue";
import Parameter from "@/views/Parameter.vue";
import BlackList from "@/views/BlackList.vue";
import ShowPath from "@/views/ShowPath.vue";
import Login from "@/views/Login.vue";
import Verify from "@/views/Verify.vue";
import Audit from "@/views/Audit.vue";
import AuditHistory from "@/views/AuditHistory.vue";
import Eligibility from "@/views/Eligibility.vue";
import EligibtHistory from "@/views/EligibtHistory.vue";
import ScrollBar from "@/views/ScrollBar.vue";
import Test from "@/views/Test.vue";

import Dashboard from "@/views/Dashboard.vue";
import StatisticsByYear from "@/views/StatisticsByYear.vue"
import StatisticsByMonth from "@/views/StatisticsByMonth.vue"
import StatisticsByDay from "@/views/StatisticsByDay.vue"
const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: "/login",
      name: "login",
      component: Login,
      meta: { isPublic: true },
    },
    {
      path: "/",
      redirect: "/dashboard",
    },
    // {
    //   path: "/",
    //   redirect: "/monitor",
    // },
    {
      path: "/",
      name: "layout",
      component: Layout,
      children: [
        { path: "monitor", name: "monitor", component: Monitor },
        { path: "lvfuMonitor", name: "lvfuMonitor", component: LvfuMonitor },
        { path: "auditMonitor", name: "auditMonitor", component: AuditMonitor },
        {
          path: "statusOnPool",
          name: "statusOnPool",
          component: StatusOnPool,
        },
        { path: "statusOnWay", name: "statusOnWay", component: StatusOnWay },
        {
          path: "statusOnTerminal",
          name: "statusOnTerminal",
          component: StatusOnTerminal,
        },
        { path: "visitHistory", name: "visitHistory", component: VisitHistory },
        { path: "statistics", name: "statistics", component: Statistics },
        { path: "offsets", name: "offsets", component: Offsets },
        { path: "distance", name: "distance", component: Distance },
        { path: "parameter", name: "parameter", component: Parameter },
        { path: "showpath", name: "showpath", component: ShowPath },
        { path: "audit", name: "audit", component: Audit },
        { path: "test", name: "test", component: Test },
        { path: "auditHistory", name: "auditHistory", component: AuditHistory },
        { path: "blackList", name: "blackList", component: BlackList },
        {
          path: "verify",
          name: "verify",
          meta: {
            keepAlive: true,
          },
          component: Verify,
        },
        { path: "eligibility", name: "eligibility", component: Eligibility },
        { path: "eligibtHistory", name: "eligibtHistory", component: EligibtHistory },
        { path: "scrollBar", name: "scrollBar", component: ScrollBar },
        // 新增dashboard页面
        { path: "dashboard", name: "dashboard", component: Dashboard },
        // 新增按年统计
        { path: "statisticsByYear", name: "statisticsByYear", component: StatisticsByYear },
        // 新增按月统计
        { path: "statisticsByMonth", name: "statisticsByMonth", component: StatisticsByMonth },
        // 
        { path: "statisticsByDay", name: "statisticsByDay", component: StatisticsByDay },
        

      ],
    },
    {
      path: "/:catchAll(.*)",
      redirect: "/",
    },
  ],
});
const userWhitelist = ["/lvfuMonitor", "/statusOnPool", "/history"];
const auditorWhitelist = ["/auditMonitor", "/audit", "/verify", "/showpath"];

// router.beforeEach((to, from, next) => {
//   if (!to.meta.isPublic && !localStorage.getItem("user")) {
//     next("/login");
//   } else if (
//     localStorage.getItem("user") == "user" &&
//     !userWhitelist.includes(to.path)
//   ) {
//     next("/lvfuMonitor");
//   } else if (
//     localStorage.getItem("user") == "auditor" &&
//     !auditorWhitelist.includes(to.path)
//   ) {
//     next("/auditMonitor");
//   } else if (localStorage.getItem("user") == "admin" && to.path == "/login") {
//     next("/monitor");
//   } else {
//     if(!from.name){
//       to.fullPath = to.path;
//       to.query={};
//     }
//     next();
//   }
// });
router.beforeEach((to, from, next) => {
  if (!to.meta.isPublic && !localStorage.getItem("user")) {
    next("/login");
  } else if (
    localStorage.getItem("user") == "user" &&
    !userWhitelist.includes(to.path)
  ) {
    next("/lvfuMonitor");
  } else if (
    localStorage.getItem("user") == "auditor" &&
    !auditorWhitelist.includes(to.path)
  ) {
    next("/auditMonitor");
  } else if (localStorage.getItem("user") == "admin" && to.path == "/login") {
    next("/dashboard");
  } else {
    if(!from.name){
      to.fullPath = to.path;
      to.query={};
    }
    next();
  }
});
export default router;
