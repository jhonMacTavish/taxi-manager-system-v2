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
      redirect: "/monitor",
    },
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
        { path: "parameter", name: "parameter", component: Parameter },
        { path: "showpath", name: "showpath", component: ShowPath },
        { path: "audit", name: "audit", component: Audit },
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
export default router;
