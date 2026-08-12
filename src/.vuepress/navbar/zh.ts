import { navbar } from "vuepress-theme-hope";

export const zhNavbar = navbar([
  // 主页链接
  "/",
  
  // “知识库” 顶级下拉菜单
  {
    text: "知识库",
    icon: "fas fa-layer-group",
    children: [
      {
        text: "工具箱", // 分组标题 (不可点击)
        // 分组下的具体链接
        children: [
          {
            text: "Office",
            icon: "fab fa-microsoft",
            link: "/toolkit/office/",
          },
          {
            text: "Android 应用",
            icon: "fab fa-android",
            link: "/toolkit/apps/", // 链接到 /toolkit/apps/ 目录
          },
          {
            text: "Windows 软件",
            icon: "fab fa-windows",
            link: "/toolkit/software/",
          },
          {
            text: "Windows 技巧",
            icon: "fas fa-cogs",
            link: "/toolkit/windows/",
          },
        ],
      },
      {
        text: "技艺录",
        children: [
          {
            text: "网站搭建",
            icon: "fas fa-sitemap",
            link: "/dev/website/",
          },
          {
            text: "自动化脚本",
            icon: "fas fa-robot",
            link: "/dev/automation/",
          },
        ],
      },
      {
        text: "生活志",
        children: [
          {
            text: "健康生活",
            icon: "fa-solid fa-heart-pulse",
            link: "/life/health/",
          },
          {
            text: "出行攻略",
            icon: "fa-solid fa-plane-departure",
            link: "/life/travel/",
          },
          {
            text: "烹饪美食",
            icon: "fa-solid fa-kitchen-set",
            link: "/life/cooking/",
          },
          {
            text: "种植技术",
            icon: "fa-solid fa-trowel",
            link: "/life/gardening/",
          },
        ],
      },
    ],
  },
  
  // 独立的观影记录链接
  "/movies",

  // 独立的其他链接
  // {
  //   text: "",
  //   icon: "fas fa-book-open",
  //   link: "https://xxxxx.xxx",
  // },
]);