---
title: 使用 Hugo 和 HBstart 主题构建功能强大的导航页
shortTitle: Hugo 导航页指南
date: 2024-12-25
icon: fa-solid fa-compass
order: 4
category:
  - 网站搭建
tag:
  - Hugo
  - 导航页
  - HBstart
  - 静态网站
  - 部署
description: 本文详细介绍了如何从零开始使用 Hugo 静态网站生成器和 HBstart 主题搭建、配置并部署一个功能丰富的浏览器导航首页，包括搜索引擎定制与应用管理。
---

## 准备工作

本教程以 Windows 10 平台为例。开始前，请确保您已安装 `Go`, `Dart Sass`, `Hugo`, `Git`, 和 `Node.js` 的最新版本。

```component VPBanner
title: 温馨提示
content: 推荐使用包管理器 <i>Chocolatey</i> 来简化上述工具的安装和环境配置过程。
background: var(--bg-10)
color: var(--banner-text)
logo: logo.svg
actions:
  - text: 了解 Chocolatey
    link: .../toolkit/software/chocolatey.md
```

## 一、安装与初始化

### 1. 克隆主题仓库

首先，克隆 [HB start 主题](https://github.com/hbstack/theme-start) 的仓库。

```sh
git clone --depth 1 https://github.com/hbstack/theme-start
```

### 2. 复制并进入示例站点

为了快速开始，我们将使用主题自带的示例站点。

```sh
# 复制示例站点到新目录 start-page
cp -r theme-start/exampleSite ./start-page
# 进入新目录
cd start-page
```

### 3. 重新初始化 Hugo 模块

清除旧的模块配置，并为您的新项目初始化 Hugo 模块。

```sh
# 删除旧的模块文件
rm go.mod go.sum config/_default/module.yaml
# 初始化新模块（将 user/repo 替换为您的 GitHub 用户名/仓库名）
hugo mod init github.com/user/repo
```

### 4. 导入主题与搜索引擎模块

在 `config/_default/module.yaml` 文件中，声明需要导入的主题和搜索引擎模块。

```yaml
# config/_default/module.yaml
imports:
- path: github.com/hbstack/theme-start
- path: github.com/hbstack/theme-start/engines/google
- path: github.com/hbstack/theme-start/engines/bing
- path: github.com/hbstack/theme-start/engines/baidu
```

### 5. 安装前端依赖

```sh
npm install
```

### 6. 启动本地服务器

```sh
hugo server
```
现在，您可以通过访问 `http://localhost:1313` 来预览您的导航页。

## 二、自定义配置

### 1. 定制搜索引擎

您可以在 `config/_default/hugo.yaml` 中调整搜索引擎的顺序和启用状态。`weight` 值越小，优先级越高。

```yaml
# config/_default/hugo.yaml
params:
  hb:
    theme_start:
      search_engines:
        google:
          weight: 1
        bing:
          weight: 2
        baidu:
          weight: 3
```

### 2. 调整外观

- **背景图像**：将您的背景图片（支持 `webp`/`png`/`jpg`）命名为 `background` 并放置在 `assets/images` 目录下。
- **Favicon**：将您的 Logo 图片（`logo.png`）同样放置在 `assets/images` 目录下，主题会自动生成所需的 Favicon。

### 3. 管理应用程序链接

通过编辑 `config/_default/menus.yaml` 来管理导航页上的应用分组和链接。

```yaml
# config/_default/menus.yaml
apps:
  - identifier: group-1
    name: 常用工具
  - name: GitHub
    parent: group-1
    url: https://github.com/
    params:
      icon:
        vendor: simple-icons
        name: github
  - identifier: group-2
    name: 设计资源
  - name: Figma
    parent: group-2
    url: https://www.figma.com/
    params:
      icon:
        vendor: simple-icons
        name: figma
```
- **图标**：您可以在 [HugoMods Icons](https://icons.hugomods.com/) 查找并配置 `icon` 参数。

## 三、部署到 Cloudflare Pages

### 1. 推送到 GitHub

将您的 `start-page` 目录初始化为 Git 仓库并推送到 GitHub。

```sh
git init
git add .
git commit -m "Initial commit"
git branch -M main
git remote add origin https://github.com/user/repo.git
git push -u origin main
```

### 2. 配置 Cloudflare Pages

1.  登录 Cloudflare，选择 `Workers 和 Pages` → `创建` → `Pages` → `连接到Git`。
2.  选择您刚创建的 GitHub 仓库。
3.  **设置构建配置**:
    - **构建命令**: `npm install && hugo`
    - **构建输出目录**: `public`
4.  **添加环境变量** (非常重要):
    - `HUGO_VERSION`: `0.125.4` (或您使用的 Hugo 版本)
    - `NODE_VERSION`: `20` (或 `18` 以上)
    - `EMBEDDED_DART_SASS_VERSION`: `1.75.0` (或您使用的 Dart Sass 版本)
5.  点击 `保存并部署`。

:::info
您可以通过访问相应工具的 GitHub Releases 页面来获取最新的版本号。
:::