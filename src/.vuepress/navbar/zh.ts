import { navbar } from "vuepress-theme-hope";

export const zhNavbar = navbar([
  // 主页
  "/",
  
  // 高中生物
  {
    text: "高中生物", 
    icon: "book", 
    children: [
      // 笔记
      {
        text: "笔记",
        // 这样设置，直接显示 one/README.md、two/README.md……的标题和图标
        children: ["bioone/", "biotwo/", "bioxone/", "bioxtwo/", "bioxtre/"], 
      },
      // 试题
      {
        text: "试题",
        children: ["biogk/", "biomk/"], 
      },      
    ],
  },
  
  // 折腾
  {
    text: "折腾",
    icon: "fas fa-code",
    children: [
       // 建站
      "website/",
      
      // office
      "office/",
      
      // Android
      "apps/",
      
      {
        text: "Windows",
        children: [
          "windows/",
          "software/",
          // 这样设置可以覆盖 software/README.md 的标题和图标
          // { text: "software", icon: "fab fa-microsoft", link: "software/"},
          ],
      },
      
    ],
  },
  
  // 日常
  {
    text: "日常",
    icon: "fas fa-list-check",
    children: [
      // 指南（攻略或教程）
      {
        text: "攻略",
        icon:"fas fa-lightbulb",
        link: "guide/",
      },
      
    ], 
  }, 
  
  "/movies", 

]);
