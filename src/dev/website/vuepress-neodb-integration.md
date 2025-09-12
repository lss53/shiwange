---
title: 在 VuePress 中集成 NeoDB 展示影音书记录
shortTitle: VuePress 集成 NeoDB
date: 2025-01-02
icon: fa-solid fa-film
order: 6
category:
  - 建站
tag:
  - VuePress
  - NeoDB
  - API
  - 静态网站
description: 本教程将指导您如何通过 NeoDB 的 API，在您的 VuePress 站点中创建一个个性化的页面，用于展示您在 NeoDB 上标记的电影、图书和音乐收藏，实现个人记录的优雅呈现。
---

## 方案概述

本方案旨在通过调用 [NeoDB](https://neodb.social/) 的 API，将您标记的“在看/在读/在听”和“已看/已读/已听”的影音书数据，以美观的卡片形式展现在您的 VuePress 网站上，打造一个个性化的观影/阅读/听音乐记录页面。

## 步骤一：获取 NeoDB API

### 1. 创建 NeoDB Personal Token

- 使用 Mastodon 账号登录 [NeoDB](https://neodb.social/)。
- 点击右上角**头像** → **设置** → 页面底部**更多设置** → **查看已授权的应用程序**。
- 点击 `+ Create Personal Token`，创建一个新的个人访问令牌并**妥善保存**，它将用于后续的 API 请求认证。

### 2. 部署 API 服务

由于 NeoDB API 存在跨域限制，直接在前端调用并不可行。我们需要一个中间层服务来代理请求。这里推荐使用开源项目 [neodb-shelf-api](https://github.com/Lyunvy/neodb-shelf-api)，并将其免费部署在 Vercel 上。

- **Fork 项目**：访问 [neodb-shelf-api](https://github.com/Lyunvy/neodb-shelf-api) 并 Fork 到您自己的 GitHub 账户。
- **在 Vercel 中部署**：
    1. 登录 [Vercel](https://vercel.com/)，选择 `Add New...` → `Project`。
    2. 从 GitHub 导入您刚刚 Fork 的仓库。
    3. 在**环境变量** (Environment Variables) 配置中，添加以下两个变量：
        - `NEODB_TOKEN`: 值为您在第一步创建的 NeoDB Personal Token。
        - `NEODB_USER_DOMAIN`: 您的 NeoDB 用户主页域名，例如 `neodb.social`。
    4. 点击 `Deploy`，等待部署完成。您将获得一个 Vercel 提供的 API 地址，例如 `https://your-project.vercel.app`。

## 步骤二：在 VuePress 中创建展示页面

### 1. 创建 Vue 组件

在您的 VuePress 项目的 `.vuepress/components/` 目录下（如果没有请创建），新建一个 `NeoDB.vue` 文件。这个组件将负责获取数据并渲染页面。

::: details NeoDB.vue 示例代码
```vue
<template>
  <div class="neodb-container">
    <div v-for="shelf in shelves" :key="shelf.type" class="shelf-section">
      <h2>{{ shelf.title }}</h2>
      <div v-if="shelf.items.length === 0" class="loading-placeholder">
        正在加载...
      </div>
      <div v-else class="item-grid">
        <a 
          v-for="item in shelf.items" 
          :key="item.id" 
          :href="item.url" 
          target="_blank" 
          rel="noopener noreferrer" 
          class="item-card"
        >
          <img :src="item.cover_image_url" :alt="item.title" loading="lazy" />
          <div class="item-title">{{ item.title }}</div>
        </a>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      apiBaseUrl: 'https://your-project.vercel.app/api/v1/shelf/', // 替换为您的 Vercel API 地址
      shelves: [
        { type: 'movie', title: '🎬 在看/想看的电影', items: [] },
        { type: 'book', title: '📚 在读/想读的书', items: [] },
        { type: 'music', title: '🎵 在听/想听的音乐', items: [] },
        { type: 'game', title: '🎮 在玩/想玩的游戏', items: [] },
      ],
    };
  },
  mounted() {
    this.fetchAllShelves();
  },
  methods: {
    async fetchAllShelves() {
      for (const shelf of this.shelves) {
        try {
          // 'progress' 表示进行中的项目，您也可以获取 'done' (已完成)
          const response = await fetch(`${this.apiBaseUrl}${shelf.type}/progress`);
          if (!response.ok) throw new Error('Network response was not ok');
          const data = await response.json();
          shelf.items = data.data;
        } catch (error) {
          console.error(`Failed to fetch ${shelf.type} data:`, error);
        }
      }
    },
  },
};
</script>

<style scoped>
.neodb-container {
  max-width: 960px;
  margin: 0 auto;
  padding: 1rem;
}
.shelf-section {
  margin-bottom: 2rem;
}
.item-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(120px, 1fr));
  gap: 1rem;
}
.item-card {
  text-decoration: none;
  color: inherit;
  border-radius: 8px;
  overflow: hidden;
  box-shadow: 0 2px 8px rgba(0,0,0,0.1);
  transition: transform 0.2s ease-in-out;
}
.item-card:hover {
  transform: translateY(-5px);
}
.item-card img {
  width: 100%;
  height: auto;
  aspect-ratio: 2 / 3;
  object-fit: cover;
  display: block;
}
.item-title {
  padding: 0.5rem;
  font-size: 0.875rem;
  text-align: center;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}
.loading-placeholder {
  color: #888;
}
</style>
```
:::

### 2. 在 Markdown 页面中引用组件

创建一个新的 Markdown 文件，例如 `collection.md`，然后在文件中直接使用刚刚创建的组件标签。

```markdown
---
title: 我的收藏
icon: fas fa-star
---

# 影音书记录

这里是我在 NeoDB 上标记的近期动态。

<NeoDB />
```

现在，访问这个页面，您应该能看到从 NeoDB 获取并展示的卡片列表了。

::: tip 高级用法
- **VuePress Theme Hope 用户**: 可以利用 `alias` 配置来简化组件引用路径。在 `.vuepress/config.ts` 中设置 `alias: { "@MyComponents": path.resolve(__dirname, "components") }`，然后在 Markdown 中使用 `<MyComponents/NeoDB.vue />`。
- **数据缓存**: 为避免每次加载都请求 API，您可以考虑在 Vercel API 端实现数据缓存，或者在 Vue 组件的 `mounted` 钩子中使用 `localStorage` 进行简单的客户端缓存。
:::