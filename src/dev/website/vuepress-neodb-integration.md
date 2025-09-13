---
title: 在 VuePress 站点中集成 NeoDB API 构建观影/阅读页面
shortTitle: VuePress 集成 NeoDB
date: 2025-01-02
icon: fas fa-film
order: 6
category:
  - 网站搭建
tag:
  - VuePress
  - NeoDB
  - API
  - 个人网站
  - 博客
description: 学习如何在你的 VuePress 站点中通过 NeoDB 的 API 获取并展示你的电影、图书和音乐收藏列表，创建个性化的观影/阅读页面。
---

本文档旨在简要介绍如何将 [NeoDB](https://neodb.social/) 的数据集成到您的 VuePress 站点，从而创建一个动态更新的观影、阅读或听音乐记录页面。

## 步骤一：获取 NeoDB API 密钥 (Token)

1.  使用您的 Mastodon 账号登录 [NeoDB 官网](https://neodb.social/)。
2.  导航至 `头像` → `设置` → `更多设置` → `查看已授权的应用程序`。
3.  点击 `+ Create Personal Token` 按钮，创建一个新的个人访问令牌。
4.  **请务必复制并妥善保管生成的 Token**，它将用于后续的 API 请求。

## 步骤二：部署 API 代理服务

为了安全地在前端调用 NeoDB API 并避免跨域问题，推荐部署一个简单的代理服务。您可以使用开源项目 [neodb-shelf-api](https://github.com/Lyunvy/neodb-shelf-api)，并将其免费部署在 Vercel 等平台上。

部署过程通常包括：
1.  Fork 该项目到您的 GitHub 账户。
2.  在 Vercel 上关联您的 GitHub 仓库并进行部署。
3.  在 Vercel 项目的环境变量中设置您在步骤一中获取的 NeoDB Token。

部署成功后，您将获得一个公开的 API 接口地址。

## 步骤三：在 VuePress 中引用和展示数据

您需要在 VuePress 页面中编写一个 Vue 组件，通过该组件向您部署的 API 代理服务发起请求，获取数据并渲染到页面上。

1.  **创建 Vue 组件**:
    在您的 VuePress 项目的 `.vuepress/components` 目录下创建一个新的组件，例如 `NeoDBWall.vue`。这个组件将负责获取数据和展示。

2.  **获取和渲染数据**:
    在组件内部，您可以使用 `axios` 或 `fetch` API，在 `onMounted` 生命周期钩子中请求您的 API 代理接口，并将返回的数据绑定到模板中进行循环渲染。

3.  **样式美化**:
    为您的组件编写 CSS 样式，以卡片墙或其他美观的形式展示您的收藏记录。

4.  **在 Markdown 中使用组件**:
    在您希望展示观影/阅读记录的 Markdown 页面中，直接使用您创建的组件即可。

    ```markdown
    # 我的观影记录

    <NeoDBWall />
    ```

::: info 进阶配置
为了方便在项目内引用组件或静态资源，您可以配置 VuePress 的 `alias`（路径别名）。例如，在 `.vuepress/config.ts` 中设置别名，可以简化组件的导入路径。

参考：[VuePress Theme Hope - config.ts 示例](https://github.com/vuepress-theme-hope/vuepress-theme-hope/blob/main/docs/theme/src/.vuepress/config.ts)
:::