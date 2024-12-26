import { navbar } from "vuepress-theme-hope";

export const zhNavbar = navbar([
  // 主页
  "/",
  
  {
    text: "高中生物", 
    icon: "book", 
    //prefix: "/如果是三层目录，这里填第一层目录/",
    children: [
      {
        text: "笔记",
        // icon: "book", 
        prefix: "/bionote/", 
        children: ["one/", "two/", "xone/", "xtwo/", "xtre/"], 
      }, 
      {
        text: "真题",
        // icon: "book", 
        prefix: "/bioexam/", 
        children: ["2024/"], 
      },      
    ],
  },
  
  {
    text: "折腾",
    icon: "fa-solid fa-screwdriver-wrench",
    children: [
      {
        text: "Windows",
        // icon: "fa-brands fa-windows",
        prefix: "/windows/",
        children: [
          { text: "软件", icon: "fa-solid fa-gear", link: "software/" }, 
        ],
      },
      {
        text: "建站", 
        icon: "palette",
        prefix: "/buildwebsite/", 
        children: [
          { text: "Hugo", icon: "fa-brands fa-golang", link: "hugo/" },
          { text: "Vuepress", icon: "fab fa-vuejs", link: "vuepress/" }, 
          { text: "静态徽章", icon: "fas fa-shield", link: "badge" },
        ], 
      },
    ],
  },
  
  // 日常
  "/life/",

]);
