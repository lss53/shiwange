import { navbar } from "vuepress-theme-hope";

export const zhNavbar = navbar([
  // 主页
  "/",
  
  // “格物志” 下拉菜单，聚合了所有核心分类
  {
    text: "格物志",
    icon: "fas fa-pencil-ruler",
    children: [
      {
        text: "技艺录",
        icon: "fas fa-code-branch",
        link: "/dev/", // 链接到 /dev/ 目录的 README.md
      },
      {
        text: "工具箱",
        icon: "fas fa-tools",
        link: "/toolkit/", // 链接到 /toolkit/ 目录的 README.md
      },
      {
        text: "生活志",
        icon: "fas fa-compass",
        link: "/life/", // 链接到 /life/ 目录的 README.md
      },
    ],
  },
  
  // 独立的观影记录链接（如果需要）
  "/movies",

  // 独立的知识库链接（非常推荐！）
  {
    text: "知识库",
    icon: "fas fa-book-open",
    // 这里填写您的 Docsify 知识库的完整 URL
    link: "https://kb.211777.xyz", 
  },

]);
