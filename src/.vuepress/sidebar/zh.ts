import { sidebar } from "vuepress-theme-hope";

export const zhSidebar = sidebar({

  // ===== 工具箱 /toolkit/ =====
  // 为 toolkit 下的每个子目录定义规则
  "/toolkit/apps/": "structure",
  "/toolkit/office/": "structure",
  "/toolkit/software/": "structure",
  
  // 为 /toolkit/ 根目录也定义一个侧边栏（可选，但推荐）
  "/toolkit/": [
    { text: "工具箱", icon: "fas fa-tools", children: "structure" },
  ],

  // ===== 技艺录 /dev/ =====
  // 为 dev 下的每个子目录定义规则
  "/dev/automation/": "structure",
  "/dev/website/": "structure",

  // 为 /dev/ 根目录定义一个侧边栏
  "/dev/": [
    { text: "技艺录", icon: "fas fa-code-branch", children: "structure" },
  ],

  // ===== 生活志 /insights/ =====
  // 为 insights 下的每个子目录定义规则
  "/insights/cookbook/": "structure",
  "/insights/guides/": "structure",

  // 为 /insights/ 根目录定义一个侧边栏
  "/insights/": [
    { text: "生活志", icon: "fas fa-compass", children: "structure" },
  ],

  // ===== 根目录 / =====
  // 首页的默认侧边栏
  "/": [
    "", 
    {
      text: "格物志",
      icon: "fas fa-compass-drafting",
      children: [
        "/toolkit/",
        "/dev/",
        "/insights/",
      ],
    },
  ],
});