---
title: 配置项目
date: 2024-12-22
icon: gears
order: 4
category:
  - Blog
tag:
  - Vuepress
---

按配置作用域，可以将其分为2种：站点配置和主题配置。

### 站点配置

- 站点配置中的配置项被 VuePress 直接读取，和主题无关且在所有主题均可生效，是必要的。

- 示例路径：`F:\tmp\docs\src\.vuepress\config.ts` 。

- 其中的 `lang`，`title` 和 `description` 属性，按规则修改。

::: info 站点配置

你可以前往[VuePress2 → 参考 → 配置](https://vuejs.press/zh/reference/config.html)查看所有 VuePress 配置。

:::

### 主题配置

- 主题配置是你传递给 hopeTheme 函数的对象，它将由 Theme Hope 处理。

- 示例路径：`F:\tmp\docs\src\.vuepress\theme.ts` 。

::: info 主题配置

- 你可以前往[配置 → 主题配置](https://theme-hope.vuejs.press/zh/config/) 中找到全部的主题配置，按规则修改。

- 你还可以查看[“Theme Hope文档”主题配置](https://github.com/vuepress-theme-hope/vuepress-theme-hope/blob/main/docs/theme/src/.vuepress/config.ts)作为修改配置的参考。

:::