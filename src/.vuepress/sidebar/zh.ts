import { sidebar } from "vuepress-theme-hope";

export const zhSidebar = sidebar({

  // ===== 开发·工具 /dev/ =====
  // 为 dev 下的每个子目录定义规则
  "/dev/env/": "structure",
  "/dev/website/": "structure",
  "/dev/automation/": "structure",
  
  // 为 /dev/ 根目录也定义一个侧边栏（可选，但推荐）
/*  "/dev/": [
    { text: "开发·工具", icon: "fas fa-box-archive", children: "structure" },
  ],*/

  // ===== 软件·应用 /tools/ =====
  // 为 tools 下的每个子目录定义规则
  "/tools/windows/": "structure",
  "/tools/network/": "structure",


  // ===== 生活·指南 /life/ =====
  // 为 life 下的每个子目录定义规则
  "/life/cooking/": "structure",
  "/life/health/": "structure",
  "/life/travel/": "structure",
  "/life/gardening/": "structure",


});