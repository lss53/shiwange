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
        // icon: "book",  //这里设置了也不显示图标
        prefix: "/bionote/",
        // 这样设置，直接显示 one/README.md、two/README.md……的标题和图标
        children: ["one/", "two/", "xone/", "xtwo/", "xtre/"], 
      },
      
      // 真题
      {
        text: "真题",
        // icon: "book", 
        prefix: "/bioexam/", 
        children: ["2024/"], 
      },      
    ],
  },
  
  // 折腾
  {
    text: "折腾",
    icon: "fas fa-screwdriver-wrench",
    children: [
      
      // Windows
      {
        text: "Windows",
        // icon: "fab fa-windows",
        prefix: "/windows/",
        children: ["software/"],
      },
      
      // Office
      {
        text: "Office",
        prefix: "/office/",
        children: [
          // 这样设置可以覆盖 365/README.md 的标题和图标
          { text: "365", icon: "fab fa-microsoft", link: "365/"}, 
        ], 
        
      },
      
      // 建站
      {
        text: "建站", 
        icon: "palette",
        prefix: "/buildwebsite/", 
        children: ["hugo/", "vuepress/", "badge"],
      },
      
    ],
  },
  
  // 日常
  "/life/",

]);
