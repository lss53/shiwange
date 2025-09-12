---
title: 使用 Hugo 和 HB-Start 主题快速搭建个人导航页
shortTitle: Hugo 导航页指南
date: 2024-12-25
icon: fa-solid fa-rocket
order: 4
category:
  - 建站
tag:
  - Hugo
  - 导航页
  - 静态网站
description: 本指南将从零开始，详细介绍如何利用 Hugo 静态网站生成器和 HB-Start 主题，搭建、配置一个功能强大且美观的浏览器导航首页，并将其部署到线上。
---

## 准备工作

本文以 Windows 10 平台为例。开始前，请确保您已安装 `Go`, `Dart Sass`, `Hugo`, `Git` 和 `Node.js`。建议使用 [Chocolatey](../toolkit/software/chocolatey-windows-package-manager-guide.md) 进行安装，以简化环境配置。

```component VPBanner
title: 环境提示
content: 本教程默认您已熟悉环境变量的配置。如果您是新手，强烈建议通过 <b>Chocolatey</b> 包管理器来安装所需工具，它能为您自动处理复杂的环境设置。
background: var(--bg-10)
color: var(--banner-text)
actions:
  - text: 了解 Chocolatey
    link: ../toolkit/software/chocolatey-windows-package-manager-guide.md
```

## 步骤一：初始化项目

### 1. 克隆主题仓库

[HB Start 主题](https://github.com/hbstack/theme-start) 提供了 `exampleSite` 作为快速启动模板。

```bash
# --depth 1 表示只克隆最新的提交，减小下载体积
git clone --depth 1 https://github.com/hbstack/theme-start
```

### 2. 复制示例站点

将 `exampleSite` 复制为一个新的项目目录，例如 `start-page`。

```bash
cp -r theme-start/exampleSite ./start-page
```

### 3. 进入并初始化站点

```bash
# 切换到项目目录
cd start-page

# 清理旧的模块配置并重新初始化
rm go.mod go.sum config/_default/module.yaml
hugo mod init github.com/your-username/your-repo # 替换为您自己的仓库地址
```

### 4. 导入主题模块

编辑 `config/_default/module.yaml` 文件，导入主题和您需要的搜索引擎模块。

```yaml
# config/_default/module.yaml
imports:
- path: github.com/hbstack/theme-start
- path: github.com/hbstack/theme-start/engines/google
- path: github.com/hbstack/theme-start/engines/bing
- path: github.com/hbstack/theme-start/engines/baidu
```

### 5. 安装依赖并启动

```bash
# 安装 Node.js 依赖
npm install

# 启动 Hugo 本地开发服务器
hugo server
```

现在，您可以在浏览器中访问 `http://localhost:1313` 查看您的导航页了。

## 步骤二：自定义配置

### 1. 自定义搜索引擎

您可以自由组合和排序内置的搜索引擎。编辑 `config/_default/hugo.yaml`。

```yaml
# config/_default/hugo.yaml
params:
  hb:
    theme_start:
      search_engines:
        google:
          weight: 1 # weight 越小，优先级越高
        bing:
          weight: 2
        baidu:
          weight: 3
```

**内置搜索引擎列表**: `baidu`, `bing`, `duckduckgo`, `google`, `sogou`, `wikipedia`, `yahoo`, `yandex`。

### 2. 调整外观

- **背景图像**: 将您的背景图片（支持 `webp`, `png`, `jpg`）命名为 `background` 并放置在 `assets/images/` 目录下。
- **Favicon**: 将您的 Logo 图片（`logo.png`）同样放置在 `assets/images/` 目录下，主题会自动生成不同尺寸的 Favicon。

### 3. 管理应用链接

通过编辑 `config/_default/menus.yaml` 来添加您的常用网站链接，支持分组和自定义图标。

```yaml
# config/_default/menus.yaml
apps:
  - identifier: group-1
    name: 常用工具
  - name: GitHub
    parent: group-1
    url: https://github.com
    params:
      icon:
        vendor: simple # 图标库来源
        name: github   # 图标名称
  - name: Bilibili
    parent: group-1
    url: https://www.bilibili.com
    params:
      icon: 
        vendor: simple
        name: bilibili

  - identifier: group-2
    name: 设计资源
  - name: Figma
    parent: group-2
    url: https://www.figma.com
    params:
      icon:
        vendor: simple
        name: figma
```

::: tip 图标查找
您可以在 [HugoMods Icons](https://icons.hugomods.com/) 网站搜索并获取 `vendor` 和 `name` 的值。
:::

## 步骤三：部署到 Cloudflare Pages

### 1. 推送到 GitHub

将您的项目代码推送到一个 GitHub 仓库。

```bash
git init
git add .
git commit -m "feat: setup navigation page"
git branch -M main
git remote add origin https://github.com/your-username/your-repo.git
git push -u origin main
```

### 2. 配置 Cloudflare Pages

1.  登录 [Cloudflare](https://dash.cloudflare.com/)，进入 **Workers 和 Pages**。
2.  点击 **创建应用程序** → **Pages** → **连接到 Git**，并选择您的项目仓库。
3.  设置构建配置：
    *   **构建命令**: `npm install && hugo`
    *   **构建输出目录**: `public`
4.  添加**环境变量**以指定工具版本（版本号请根据实际情况填写）：
    *   `HUGO_VERSION`: `0.111.3`
    *   `NODE_VERSION`: `18`
    *   `GO_VERSION`: `1.20`
5.  点击 **保存并部署**。

部署完成后，您将获得一个免费的 `.pages.dev` 域名来访问您的导航页。