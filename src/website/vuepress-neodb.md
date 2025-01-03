---
title: Vuepress + NeoDB 构建观影页面
shortTitle: 构建观影页面
date: 2025-01-02
icon: fas fa-film
order: 4
category:
  - Blog
tag:
  - Vuepress
  - NeoDB
---

## 创建 NeoDB Token

使用 mastodon 账号登录 https://neodb.social/ ，点击右上角`头像` → `设置` → 下拉到低端点击`更多设置` → `查看已授权的应用程序` → `+ Create Personal Token` 。


## 获取 NeoDB Api

::: info 使用此项目
https://github.com/Lyunvy/neodb-shelf-api
:::

可以部署在 vercel 上，过程不赘述。

## 引用

::: info 把`js、css、html`喂给 AI ，过程不赘述
https://www.imsun.org/archives/1688.html
:::

可以使用 `@source` 别名来引用当前项目的源目录，也可以使用 `alias` 选项来创建别名。

::: info 详见
[指南→组件→Markdown 到 Vue SFC](https://theme-hope.vuejs.press/zh/guide/component/sfc.html)
["Theme Hope"`alias`选项引用实例](https://github.com/vuepress-theme-hope/vuepress-theme-hope/blob/main/docs/theme/src/.vuepress/config.ts)
:::

## 实例

::: info 详见
本博客导航栏[观影](../movies.md)
:::