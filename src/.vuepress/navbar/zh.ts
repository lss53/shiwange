import { navbar } from "vuepress-theme-hope";

export const zhNavbar = navbar([
  // 主页
  "/",
  
  // 高中生物
  {
    text: "高中生物", 
    icon: "book", 
    //prefix: "/如果是三层目录，这里填第一层目录/",
    children: [
      // 笔记
      {
        text: "笔记",
        // 这样设置，直接显示 one/README.md、two/README.md……的标题和图标
        children: ["bionoteone/", "bionotetwo/", "bionotexone/", "bionotextwo/", "bionotextre/"], 
      },
      
      // 真题
      {
        text: "真题",
        children: ["bioexam24/"], 
      },      
    ],
  },
  
  // 折腾
  {
    text: "折腾",
    icon: "fas fa-code",
    children: [
      
       // 建站
      "buildwebsite/", 
      
      // microsoft
      {
        text: "微软", 
        children: [
          "windows/", 
          "365/", 
          // 这样设置可以覆盖 365/README.md 的标题和图标
          // { text: "365", icon: "fab fa-microsoft", link: "365/"},
          ],
      },
      
      // 软件
      {
        text: "软件",
        children: ["apps/", "software/"], 
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
  

]);
