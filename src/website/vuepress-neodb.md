---
title: Vuepress + NeoDB 构建观影页面
shortTitle: 构建观影页面
date: 2025-01-02
icon: fas fa-film
order: 6
category:
  - Blog
tag:
  - Vuepress
  - NeoDB
---

## 创建 NeoDB Token

使用 mastodon 账号登录 https://neodb.social/ ，点击右上角`头像` → `设置` → 下拉到低端点击`更多设置` → `查看已授权的应用程序` → `+ Create Personal Token` 。


## 获取 NeoDB Api

项目<https://github.com/Lyunvy/neodb-shelf-api>，可以部署在 vercel 上，过程不赘述。


## 引用

1. 把 <https://www.imsun.org/archives/1688.html> 中的 `js、css、html` 喂给 AI ，过程不赘述。

2. 使用 `@source` 或 `alias` 引用。

::: info
- `@source+alias`[指南→组件→Markdown 到 Vue SFC](https://theme-hope.vuejs.press/zh/guide/component/sfc.html)
- `alias`[Theme Hope→config.ts](https://github.com/vuepress-theme-hope/vuepress-theme-hope/blob/main/docs/theme/src/.vuepress/config.ts)
:::
