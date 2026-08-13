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
        text: "开发·工具", // 分组标题 (不可点击)
        // 分组下的具体链接
        children: [
          {
            text: "环境与语言",
            icon: "fa-solid fa-cubes",
            link: "/dev/env/", // 链接到目录
          },
          {
            text: "网站与博客",
            icon: "fas fa-signs-post",
            link: "/dev/website/",
          },
          {
            text: "自动化与云脚本",
            icon: "fas fa-robot",
            link: "/dev/automation/",
          },
        ],
      },
      {
        text: "软件·应用",
        children: [
          {
            text: "Windows实用工具",
            icon: "fa-brands fa-windows",
            link: "/tools/windows/",
          },
          {
            text: "通信与网络增强",
            icon: "fa-solid fa-network-wired",
            link: "/tools/network/",
          },
        ],
      },
      {
        text: "生活·指南",
        children: [
          {
            text: "烹饪美食",
            icon: "fa-solid fa-kitchen-set",
            link: "/life/cooking/",
          },
          {
            text: "健康指南",
            icon: "fa-solid fa-heart-pulse",
            link: "/life/health/",
          },
          {
            text: "出行攻略",
            icon: "fa-solid fa-plane-departure",
            link: "/life/travel/",
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