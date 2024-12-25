import { sidebar } from "vuepress-theme-hope";

export const zhSidebar = sidebar({

  // 高中生物笔记侧边栏
  "/bionote/": "structure",

  "/": [

    // 主页
    // "",

    {
      text: "博文",
      icon: "book",
      prefix: "posts/",
      children: "structure",
    },
    "intro",
    // {
    //   text: "幻灯片",
    //   icon: "person-chalkboard",
    //   link: "https://ecosystem.vuejs.press/zh/plugins/markdown/revealjs/demo.html",
    // },
  ],
  
  // "/bionotexx/": [
  //   {
  //     text: "第1章 走进细胞",
  //     icon: "laptop-code",
  //     prefix: "chapter1/",
  //     collapsible: true,
  //     children: "structure",
  //   },
  //   {
  //     text: "第2章 组成细胞的分子",
  //     icon: "laptop-code",
  //     prefix: "chapter2/",
  //     collapsible: true,
  //     children: "structure",
  //   },
  // ], 

});
