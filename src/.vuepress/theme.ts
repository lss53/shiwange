import { hopeTheme } from "vuepress-theme-hope";

import { enNavbar, zhNavbar } from "./navbar/index.js";
import { enSidebar, zhSidebar } from "./sidebar/index.js";

export default hopeTheme({
  hostname: "https:////211777.xyz",
  
  // 网站图标
  iconAssets: "fontawesome-with-brands",

  logo: "/logo.svg",

  repo: "lss53/shiwange",

  docsDir: "src",

  blog: {
    medias: {
      // Baidu: "https://example.com",
      // BiliBili: "https://example.com",
      // Bitbucket: "https://example.com",
      // Dingding: "https://example.com",
      // Discord: "https://example.com",
      // Dribbble: "https://example.com",
      // Email: "mailto:info@example.com",
      // Evernote: "https://example.com",
      // Facebook: "https://example.com",
      // Flipboard: "https://example.com",
      //Gitee: "https://example.com",
      // GitHub: "https://example.com",
      // Gitlab: "https://example.com",
      // Gmail: "mailto:info@example.com",
      // Instagram: "https://example.com",
      // Lark: "https://example.com",
      // Lines: "https://example.com",
      // Linkedin: "https://example.com",
      // Pinterest: "https://example.com",
      // Pocket: "https://example.com",
      // QQ: "https://example.com",
      // Qzone: "https://example.com",
      // Reddit: "https://example.com",
      // Rss: "https://example.com",
      // Steam: "https://example.com",
      // Twitter: "https://example.com",
      // Wechat: "https://example.com",
      // Weibo: "https://example.com",
      // Whatsapp: "https://example.com",
      // Youtube: "https://example.com",
      // Zhihu: "https://example.com",
    },
  },

  // 全屏按钮
  fullscreen: true,

  // 在深色模式，浅色模式和自动之间切换 (默认)
  // darkmode: "switch",


  locales: {
    /**
     * Chinese locale config
     */
    "/": {
        author: {
          name: "诗往哥",
          url: "/intro.html",
        },
      // navbar（导航栏）
      navbar: zhNavbar,

      // sidebar（侧边栏）
      sidebar: zhSidebar,

      footer: 
        '主题使用 <a href="https://theme-hope.vuejs.press/zh/" target="_blank">VuePress Theme Hope</a>', 

      displayFooter: true,

      blog: {
        description: "今日事，今日毕",
        intro: "/intro.html",
      },

      // page meta
      metaLocales: {
        editLink: "在 GitHub 上编辑此页",
      },
    },

    "/en/": {
        author: {
          name: "Shiwange",
          url: "/en/intro.html",
        },
      // navbar
      navbar: enNavbar,

      // sidebar
      sidebar: enSidebar,

      footer: 
        'Theme by <a href="https://theme-hope.vuejs.press">vuepress-theme-hope</a>',

      displayFooter: true,

      blog: {
        description: "Better do it today than tomorrow",
        intro: "/en/intro.html",
      },

      metaLocales: {
        editLink: "Edit this page on GitHub",
      },
    },

  },

  // 加密
  encrypt: {
    config: {
      // 这只会加密 config/page.html
      "/en/demo/encrypt.html": ["1234", "4321"],
      "/demo/encrypt.html": ["1234", "4321"],
    },
  },
  // 提示文字
  encryptLocales: {
    placeholder: "微信搜‘一勒二思’回复‘密码’获取口令",

    /**
     * Passwrod error hint
     */
    errorHint: "哈哈，别调戏人家啦，按规则来嘛",
  },

  // 页面信息→功能→页面信息
  // 文章信息，可以填入数组，数组的顺序是各条目显示的顺序
  pageInfo: ["Author", "Original", "Date", "Category", "Tag", "Word","ReadingTime"],

  // enable it to preview all changes in time
  // 使其能够及时预览所有更改
  // hotReload: true,

  // These features are enabled for demo, only preserve features you need here
  //这些功能仅供演示使用，此处只保留您需要的功能
  markdown: {
    align: true,  // 自定义内容对齐方式
    attrs: true,  // 属性支持
    codeTabs: true,  // 代码块分组
    component: true,  // component 代码块
    demo: true,  // 代码演示
    figure: true,  // 启用 figure
    gfm: true,  // 使 Markdown 行为与 GitHub 保持一致
    imgLazyload: true,  //// 启用图片懒加载
    imgSize: true,  // 启用图片大小
    include: true,  // 导入文件
    mark: true,  // 标记
    plantuml: true,  // 状态图、时序图等
    spoiler: true,  // 透剧透文字
    // 样式化
    stylize: [
      {
        matcher: "Recommended",
        replacer: ({ tag }) => {
          if (tag === "em")
            return {
              tag: "Badge",
              attrs: { type: "tip" },
              content: "Recommended",
            };
        },
      },
    ],
    sub: true,  // 启用下角标
    sup: true,  // 启用上角标
    tabs: true,  // 选项卡
    tasklist: true, // 任务列表
    vPre: true,  // VuePress1 的 v-pre 容器
    // markmap: true, // 思维导图，运行环境非常重，不推荐使用

    // uncomment these if you need TeX support
    // 数学公式
    math: {
      // install katex before enabling it
      type: "katex",
     // or install mathjax-full before enabling it
     // type: "mathjax",
    },

    // install chart.js before enabling it
    // 支持图表
    // chartjs: true,

    // install echarts before enabling it
    // 支持图表
    // echarts: true,

    // install flowchart.ts before enabling it
    // 流程图
    // flowchart: true,

    // install mermaid before enabling it
    // 饼状图
    // mermaid: true,

    // playground: {
    //   presets: ["ts", "vue"],
    // },

    // install @vue/repl before enabling it
    // Vue 交互演示
    // vuePlayground: true,

    // install sandpack-vue3 before enabling it
    // Sandpack 交互演示
    // sandpack: true,

    // install @vuepress/plugin-revealjs and uncomment these if you need slides
    // 幻灯片
    // revealjs: {
    //   plugins: ["highlight", "math", "search", "notes", "zoom"],
    // },
  },

  plugins: {
    blog: true,
    git: true,
    // 注意: 仅用于测试! 你必须自行生成并在生产环境中使用自己的评论服务
    comment: {
      provider: "Giscus",
      repo :"lss53/shiwange-giscus",
      repoId:"R_kgDONh-zAA",
      category:"Announcements",
      categoryId:"DIC_kwDONh-zAM4ClgC4",
    },
    
    // Install @waline/client before enabling it
    // Note: This is for testing ONLY!
    // You MUST generate and use your own comment service in production.
    // 评论
    // comment: {
    //   provider: "Waline",
    //   serverURL: "https://waline-comment.vuejs.press",
    // },

    // 指南→组件→内置组件，https://theme-hope.vuejs.press/zh
    components: {
      components: ["Badge", "VPCard", "VPBanner"],
    },

    // install @vuepress/plugin-pwa and uncomment these if you want a PWA
    // pwa: {
    //   favicon: "/favicon.ico",
    //   cacheHTML: true,
    //   cacheImage: true,
    //   appendBase: true,
    //   apple: {
    //     icon: "/assets/icon/apple-icon-152.png",
    //     statusBarColor: "black",
    //   },
    //   msTile: {
    //     image: "/assets/icon/ms-icon-144.png",
    //     color: "#ffffff",
    //   },
    //   manifest: {
    //     icons: [
    //       {
    //         src: "/assets/icon/chrome-mask-512.png",
    //         sizes: "512x512",
    //         purpose: "maskable",
    //         type: "image/png",
    //       },
    //       {
    //         src: "/assets/icon/chrome-mask-192.png",
    //         sizes: "192x192",
    //         purpose: "maskable",
    //         type: "image/png",
    //       },
    //       {
    //         src: "/assets/icon/chrome-512.png",
    //         sizes: "512x512",
    //         type: "image/png",
    //       },
    //       {
    //         src: "/assets/icon/chrome-192.png",
    //         sizes: "192x192",
    //         type: "image/png",
    //       },
    //     ],
    //     shortcuts: [
    //       {
    //         name: "Demo",
    //         short_name: "Demo",
    //         url: "/demo/",
    //         icons: [
    //           {
    //             src: "/assets/icon/guide-maskable.png",
    //             sizes: "192x192",
    //             purpose: "maskable",
    //             type: "image/png",
    //           },
    //         ],
    //       },
    //     ],
    //   },
    // },
  },
});
