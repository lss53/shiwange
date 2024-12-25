import { navbar } from "vuepress-theme-hope";

export const zhNavbar = navbar([
  // 主页
  "/",

  // 高中生物笔记导航栏
  "/bionote/",  

  {
    text: "博文",
    icon: "book",
    prefix: "/posts/",
    children: [
      {
        text: "电脑软件",
        icon: "screwdriver-wrench",
        prefix: "software/",
        children: [
          { text: "佳软推荐", icon: "screwdriver-wrench", link: "README.md" },

        ],
      },
      {
        text: "构建网站",
        icon: "palette",
        prefix: "buildwebsite/",
        children: [
          { text: "VuePress", icon: "fab fa-vuejs", link: "vuepress.md" },
          { text: "Hugo", icon: "compass", link: "hugo.md" },
          
        ],
      },


    ],
  },
  {
    text: "V2 文档",
    icon: "file-word",
    link: "https://theme-hope.vuejs.press/zh/",
  },
]);
