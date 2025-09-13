import { defineUserConfig } from "vuepress";
import { getDirname, path } from "vuepress/utils"; // 使用 alias 选项来创建别名

import theme from "./theme.js";

const __dirname = getDirname(import.meta.url); // 使用 alias 选项来创建别名

export default defineUserConfig({
  base: "/",

  locales: {
    "/": {
      lang: "zh-CN",
      title: "诗往哥的博客",
      description: "诗往哥的在线笔记，包括工作、生活、兴趣爱好等",
    },
    "/en/": {
      lang: "en-US",
      title: "Shiwange's Blog",
      description: "Shiwange's Online Notes, covering work, life, hobbies, etc.",
    },
  },

  theme,

  // Enable it with pwa
  // shouldPrefetch: false,
/*  alias: {
    "@NeoDB": path.resolve(
      __dirname, 
      "./components/NeoDB.vue"), // 使用 alias 选项来创建别名
  }, */
});
