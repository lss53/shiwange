import { defineUserConfig } from "vuepress";

import theme from "./theme.js";

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
});
