import { sidebar } from "vuepress-theme-hope";

export const zhSidebar = sidebar({
  // ===== 工具箱 /toolkit/ =====
  // 当用户访问 /toolkit/ 目录下的任何页面时，会显示这个侧边栏工具箱
  "/toolkit/"[
    {
      text: "工具箱",
      icon: "fas fa-tools",
      children: "structure",
    },
  ],

  // ===== 技艺录 /dev/ =====
  // 当用户访问 /dev/ 目录下的任何页面时，会显示这个侧边栏
  "/dev/": [
    {
      text: "技艺录",
      icon: "fas fa-code-branch",
      children: "structure",
    }, 
  ], 

  // ===== 生活志 /life/ =====
  // 当用户访问 /life/ 目录下的任何页面时，会显示这个侧边栏
  "/life/": [
    {
      text: "生活志",
      icon: "fas fa-compass",
      children: "structure",
    }, 
  ],
  
  // ===== 根目录 / =====
  // 这是用户访问首页时的默认侧边栏，通常可以留空，
  // 或者放一些最重要的入口链接。
  "/": [
    "", // 显示首页 README.md 的标题
    {
      text: "格物志",
      icon: "fas fa-pencil-ruler",
      children: [
        "/notes/",
        "/dev/",
        "/life/",
      ],
    },
  ],

});
