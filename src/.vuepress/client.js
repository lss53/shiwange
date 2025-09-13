// .vuepress/client.js

import { defineClientConfig } from "vuepress/client";
import { VueQueryPlugin } from "@tanstack/vue-query";

export default defineClientConfig({
  enhance({ app, router, siteData }) {
    // 将 Vue Query 插件注册到 Vue 实例中
    app.use(VueQueryPlugin);
  },
});