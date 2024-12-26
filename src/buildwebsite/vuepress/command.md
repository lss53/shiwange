---
title: 项目命令
date: 2024-12-22
icon: flag
order: 2
category:
  - Blog
tag:
  - Vuepress
---

```component VPBanner
title: 温馨提示
content: 本文默认你是配置环境变量的熟手，如果你没有相关的经验，请从<i>Chocolatey</i>开始。
background: var(--bg-10)
color: var(--banner-text)
logo: logo.svg
actions:
  - text: Chocolatey
    link: ../../windows/software/chocolatey.html
```

下面以使用主题 [Theme Hope](https://theme-hope.vuejs.press/zh/) 为例。

[快速上手→创建项目](https://theme-hope.vuejs.press/zh/get-started/create.html)，完整过程如下图所示：

![创建项目模板](./assets/ins-blog.png)


### 项目命令

运行路径：`F:\tmp\docs` 。常用命令项目如下：

::: tabs#shell

@tab pnpm

- `pnpm docs:dev` 启动开发服务器
- `pnpm docs:build` 构建项目并输出
- `pnpm docs:clean-dev` 清除缓存并启动开发服务器

@tab yarn

- `yarn docs:dev` 启动开发服务器
- `yarn docs:build` 构建项目并输出
- `yarn docs:clean-dev` 清除缓存并启动开发服务器

@tab npm

- `npm run docs:dev` 启动开发服务器
- `npm run docs:build` 构建项目并输出
- `npm run docs:clean-dev` 清除缓存并启动开发服务器

:::

::: info 在 Windows 上打开终端

请使用文件管理器打开对应文件夹，然后在上方的地址栏中输入 `cmd` 并按下回车。

:::