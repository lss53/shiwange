---
title: Homer + Cloudflare Pages 部署导航页
shortTitle: Homer 导航页部署
date: 2025-08-30
icon: fa-regular fa-compass
order: 5
category:
  - 建站
tag:
  - Homer
  - 导航页
description: 本教程介绍如何配置 Homer 的 YAML 文件，并利用 Cloudflare Pages 免费、快速且自动化地部署一个美观的仪表盘式导航页面。
---
## 准备工作

在开始之前，请确保您拥有以下账户：
- Cloudflare 账户（免费注册）
- GitHub 账户（用于代码托管）

## 步骤一：获取 Homer 预构建版本

Homer 提供预构建版本，无需编译即可直接使用：

### Linux/macOS 用户
```bash
# 下载最新版本的 Homer
wget https://github.com/bastienwirtz/homer/releases/latest/download/homer.zip

# 解压文件
unzip homer.zip -d homer

# 进入解压后的目录
cd homer

# 复制并重命名配置文件
cp assets/config.yml.dist assets/config.yml
```

### Windows 用户
1. 访问 [Homer 发布页面](https://github.com/bastienwirtz/homer/releases)
2. 下载最新的 `homer.zip` 文件
3. 解压到本地文件夹
4. 将 `assets/config.yml.dist` 重命名为 `assets/config.yml`

## 步骤二：基础配置

编辑 `assets/config.yml` 文件来自定义您的导航页。

## 步骤三：配置多页面导航

Homer 支持多页面配置，允许您创建多个导航页面并在它们之间轻松切换。

### 1. 创建第二个页面配置

```bash
# 复制示例文件作为第二个页面的配置
cp assets/additional-page.yml.dist assets/additional-page.yml
```

### 2. 配置第二个页面

编辑 `assets/additional-page.yml` 文件。

### 3. 在主页面添加切换链接

在主配置文件 `assets/config.yml` 中添加指向第二个页面的链接：

```yaml
# 在主页面链接部分添加
links:
  - name: "another page!"
    icon: "fas fa-file-alt"
    url: "#additional-page" 
    
  # 其他主页面链接...
```

## 步骤四：本地测试

在部署前，您可以在本地测试 Homer 是否正常工作：

```bash
# 使用 Node.js 的 http-server
npx http-server -p 8010

# 或使用 Python 内置服务器
python -m http.server 8010
```

访问 `http://localhost:8010` 查看主页面，访问 `http://localhost:8010/#config=additional-page.yml` 查看第二个页面。

## 步骤五：部署到 Cloudflare Pages

### 1. 创建 GitHub 仓库并上传文件

```bash
# 初始化 Git 仓库
git init

# 添加所有文件
git add .

# 提交更改
git commit -m "初始提交：添加 Homer 导航页"

# 添加远程仓库
git remote add origin https://github.com/您的用户名/您的仓库名.git

# 推送至 GitHub
git branch -M main
git push -u origin main
```

### 2. 通过 Cloudflare Pages 部署

- 登录 [Cloudflare 控制台](https://dash.cloudflare.com/)
- 选择 "Workers 和 Pages" → "创建应用程序" → "Pages" → "连接到 Git"
- 选择您刚创建的 GitHub 仓库
- 配置构建设置：
   - 构建命令：留空
   - 构建输出目录：留空
- 点击 "保存并部署"

部署完成后，Cloudflare 会为您提供一个免费的页面地址（如 `https://your-project.pages.dev`）。

### 3. 自定义域名（可选）

如果您有自己的域名，可以将其指向 Cloudflare Pages：

- 在 Cloudflare Pages 项目设置中，点击 "自定义域"
- 添加您的域名并按照指示配置 DNS 记录
- Cloudflare 会自动为您配置 SSL 证书

## 步骤六：访问多页面导航

部署完成后，您可以通过以下方式访问不同页面：

1. **主页面**：直接访问您的域名（如 `https://your-domain.pages.dev`）
2. **another page!**：访问 `https://your-domain.pages.dev/#additional-page`
   - 或通过主页面上的"another page!"链接

