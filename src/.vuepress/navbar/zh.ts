import { navbar } from "vuepress--theme-hope";

export const zhNavbar = navbar([
  // 主页链接
  "/",
  
  // “格物志” 顶级下拉菜单
  {
    text: "格物志",
    icon: "fas fa-compass-drafting", // 一个代表“格物”的图标
    children: [
      {
        text: "工具箱", // 分组标题 (不可点击)
        // 分组下的具体链接
        children: [
          {
            text: "移动端 App",
            icon: "fas fa-mobile-screen",
            link: "/toolkit/apps/", // 链接到 /toolkit/apps/ 目录
          },
          {
            text: "Office 软件",
            icon: "fab fa-microsoft",
            link: "/toolkit/office/",
          },
          {
            text: "Windows 软件",
            icon: "fab fa-windows",
            link: "/toolkit/software/", // 注意：根据您之前的设计，这里应该是 software
          },
        ],
      },
      {
        text: "技艺录",
        children: [
          {
            text: "自动化脚本",
            icon: "fas fa-robot",
            link: "/dev/automation/", // 文件夹名建议简化为 automation
          },
          {
            text: "网站搭建",
            icon: "fas fa-sitemap",
            link: "/dev/website/", // 文件夹名建议简化为 website
          },
        ],
      },
      {
        text: "生活志",
        children: [
          {
            text: "食谱",
            icon: "fas fa-utensils",
            link: "/insights/cookbook/",
          },
          {
            text: "攻略",
            icon: "fas fa-map-signs",
            link: "/insights/guides/",
          },
        ],
      },
    ],
  },
  
  // 独立的观影记录链接
  "/movies",

  // 独立的知识库链接
  {
    text: "知识库",
    icon: "fas fa-book-open",
    link: "https://your-docsify-knowledge-base.com", 
  },
]);