---
title: 使用 Homer 和 Cloudflare Pages 免费部署个性化导航页
shortTitle: Homer 导航页部署
date: 2025-08-30
icon: fa-solid fa-rocket
order: 5
category:
  - 建站
tag:
  - Homer
  - 导航页
  - Cloudflare
  - 静态网站
description: 本教程将指导您如何利用开源导航页项目 Homer 和 Cloudflare Pages 的免费服务，快速、轻松地搭建一个属于自己的、美观实用的仪表盘式导航主页，并实现多页面配置。
---

## 准备工作

在开始之前，请确保您已拥有以下账户：
- **Cloudflare 账户**：用于免费部署和托管网站。
- **GitHub 账户**：用于存储和管理 Homer 网站文件。

## 步骤一：获取 Homer 源码

Homer 提供了预构建版本，无需手动编译，开箱即用。

#### Linux / macOS 用户

```bash
# 下载最新版本的 Homer 压缩包
wget https://github.com/bastienwirtz/homer/releases/latest/download/homer.zip

# 解压文件到 homer 目录
unzip homer.zip -d homer

# 进入目录并创建配置文件
cd homer
cp assets/config.yml.dist assets/config.yml
```

#### Windows 用户

1.  访问 [Homer 的 GitHub 发布页面](https://github.com/bastienwirtz/homer/releases)。
2.  下载最新的 `homer.zip` 文件。
3.  解压到您选择的本地文件夹。
4.  在解压后的 `assets` 目录中，将 `config.yml.dist` 文件**重命名**为 `config.yml`。

## 步骤二：基础配置

打开并编辑 `assets/config.yml` 文件，根据您的需求修改标题、链接、服务等内容。该文件使用 YAML 格式，语法简洁直观。

## 步骤三：配置多页面导航（可选）

Homer 支持通过创建多个 YAML 文件来实现多页面导航，方便您对链接进行分类管理。

### 1. 创建额外的页面配置文件

复制一份示例配置文件，作为您的新页面。

```bash
# 在 assets 目录下执行
cp assets/additional-page.yml.dist assets/additional-page.yml
```

### 2. 编辑新页面内容

打开并编辑 `assets/additional-page.yml`，按照您的需求添加该页面的链接和服务。

### 3. 在主页面添加入口链接

回到主配置文件 `assets/config.yml`，在 `links` 部分添加一个指向新页面的链接。

```yaml
# assets/config.yml

links:
  # 添加一个指向新页面的链接
  - name: "我的工具箱"
    icon: "fas fa-toolbox"
    url: "#additional-page" # HASH + 新配置文件的名称（不含.yml）
    
  # ... 其他主页面链接
```

## 步骤四：本地预览与测试

在部署到线上之前，您可以在本地启动一个简单的 Web 服务器来预览效果。

```bash
# 确保您已安装 Node.js，然后使用 http-server
npx http-server -p 8010

# 或者，如果您的环境中有 Python
python -m http.server 8010
```

- **主页面访问**: `http://localhost:8010`
- **其他页面访问**: `http://localhost:8010/#additional-page`

## 步骤五：部署到 Cloudflare Pages

### 1. 创建 GitHub 仓库并上传文件

将您的 Homer 项目文件上传到 GitHub，以便 Cloudflare Pages 可以访问和部署。

```bash
# 在您的 Homer 项目根目录执行
git init
git add .
git commit -m "Initial commit for Homer dashboard"
git branch -M main
git remote add origin https://github.com/YourUsername/YourRepoName.git # 替换为您的仓库地址
git push -u origin main
```

### 2. 连接 Cloudflare Pages

1.  登录 [Cloudflare 控制台](https://dash.cloudflare.com/)。
2.  导航至 **Workers 和 Pages** → **创建应用程序** → **Pages** → **连接到 Git**。
3.  选择您刚刚创建的 GitHub 仓库并授权。
4.  配置构建设置：
    *   **构建命令**：留空 (因为 Homer 是静态网站，无需构建)。
    *   **构建输出目录**：留空 (或设置为 `/`)。
5.  点击 **保存并部署**。

部署过程通常很快完成，之后 Cloudflare 会提供一个免费的 `.pages.dev` 域名供您访问。

### 3. 绑定自定义域名（可选）

- 在 Cloudflare Pages 项目的设置中，找到 **自定义域**。
- 添加您的个人域名，并按照页面指引在您的 DNS 服务商处配置相应的 `CNAME` 记录。
- Cloudflare 将自动为您配置 SSL 证书，启用 HTTPS。

## 步骤六：访问您的导航页

部署完成后，即可通过以下方式访问不同页面：

- **主页面**：`https://your-project.pages.dev`
- **其他页面**：`https://your-project.pages.dev/#additional-page` (或通过主页上的链接点击跳转)