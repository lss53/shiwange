import { sidebar } from "vuepress-theme-hope";

export const zhSidebar = sidebar({

  // ===== 工具箱 /toolkit/ =====
  // 为 toolkit 下的每个子目录定义规则
  "/toolkit/apps/": "structure",
  "/toolkit/office/": "structure",
  "/toolkit/software/": "structure",
  
  // 为 /toolkit/ 根目录也定义一个侧边栏（可选，但推荐）
  "/toolkit/": [
    { text: "工具箱", icon: "fas fa-box-archive", children: "structure" },
  ],

  // ===== 技艺录 /dev/ =====
  // 为 dev 下的每个子目录定义规则
  "/dev/automation/": "structure",
  "/dev/website/": "structure",

  // 为 /dev/ 根目录定义一个侧边栏
  "/dev/": [
    { text: "技艺录", icon: "fas fa-code-branch", children: "structure" },
  ],

  // ===== 生活志 /life/ =====
  // 为 life 下的每个子目录定义规则
  "/life/cookbook/": "structure",
  "/life/guides/": "structure",

  // 为 /life/ 根目录定义一个侧边栏
  "/life/": [
    { text: "生活志", icon: "fas fa-lightbulb", children: "structure" },
  ],

});