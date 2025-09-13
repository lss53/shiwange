---
title: 使用 Homer 和 Cloudflare Pages 免费部署个人导航页
shortTitle: Homer 导航页部署
date: 2025-08-30
icon: fa-solid fa-rocket
order: 5
category:
  - 网站搭建
tag:
  - Homer
  - 导航页
  - Cloudflare Pages
  - 静态网站
  - GitHub
description: 本教程介绍如何配置 Homer 的 YAML 文件，并利用 Cloudflare Pages 免费、快速且自动化地部署一个美观的仪表盘式导航页面。
---

## 准备工作

在开始之前，请确保您已拥有以下账户：
- **Cloudflare 账户**：用于部署和托管静态页面。
- **GitHub 账户**：用于托管 Homer 的代码和配置文件。

## 步骤一：获取并初始化 Homer

Homer 提供了预构建的版本，无需手动编译，可直接使用。

### 操作步骤

1.  **下载 Homer**:
    - **Linux/macOS**:
      ```bash
      # 下载最新版本的 Homer 压缩包
      wget https://github.com/bastienwirtz/homer/releases/latest/download/homer.zip
      # 解压到名为 homer 的目录
      unzip homer.zip -d homer
      ```
    - **Windows**:
      访问 [Homer 发布页面](https://github.com/bastienwirtz/homer/releases)，下载最新的 `homer.zip` 文件并解压。

2.  **初始化配置文件**:
    进入解压后的 `homer` 目录，复制并重命名示例配置文件，作为您的主配置文件。
    ```bash
    cd homer
    cp assets/config.yml.dist assets/config.yml
    ```

## 步骤二：基础配置

打开并编辑 `assets/config.yml` 文件，根据您的需求自定义导航页的标题、链接、服务等内容。文件采用 YAML 格式，结构清晰易懂。

## 步骤三：配置多页面导航 (可选)

Homer 支持通过创建多个 YAML 文件来实现多页面导航。

1.  **创建第二个页面配置**:
    复制附加页面的示例配置文件。
    ```bash
    cp assets/additional-page.yml.dist assets/additional-page.yml
    ```

2.  **编辑第二个页面**:
    打开 `assets/additional-page.yml` 文件，并根据需要进行配置。

3.  **在主页面添加入口**:
    编辑主配置文件 `assets/config.yml`，在 `links` 部分添加一个指向新页面的链接。`url` 的格式为 `#页面文件名`（不含 `.yml` 后缀）。

    ```yaml
    # assets/config.yml
    links:
      - name: "附加页面"
        icon: "fas fa-file-alt"
        url: "#additional-page" # 指向 additional-page.yml
    
      # ... 其他主页面链接
    ```

## 步骤四：本地测试

在部署到线上之前，您可以在本地启动一个简单的 Web 服务器来预览效果。

```bash
# 如果您安装了 Node.js，可以使用 http-server
npx http-server -p 8010

# 或者使用 Python 内置的服务器 (Python 3)
python -m http.server 8010
```

- **主页面访问地址**：`http://localhost:8010`
- **附加页面访问地址**：`http://localhost:8010/#additional-page`

## 步骤五：部署到 Cloudflare Pages

### 1. 创建 GitHub 仓库并上传文件

将您配置好的 `homer` 文件夹上传到 GitHub。

```bash
# 进入 homer 目录
cd /path/to/your/homer

# 初始化 Git 仓库
git init
git add .
git commit -m "Initial commit for Homer dashboard"

# 关联远程仓库并推送
git remote add origin https://github.com/你的用户名/你的仓库名.git
git branch -M main
git push -u origin main
```

### 2. 在 Cloudflare Pages 中部署

1.  登录 [Cloudflare 控制台](https://dash.cloudflare.com/)。
2.  导航至 `Workers 和 Pages` → `创建应用程序` → `Pages` → `连接到 Git`。
3.  选择您刚刚创建的 GitHub 仓库并授权。
4.  在 **配置构建设置** 步骤中：
    - **构建命令**：留空（因为 Homer 是预构建的静态文件）。
    - **构建输出目录**：留空或设置为根目录 `/`。
5.  点击 `保存并部署`。

部署完成后，Cloudflare 将为您提供一个免费的 `.pages.dev` 域名。

### 3. 自定义域名 (可选)

如果您希望使用自己的域名，可以在 Cloudflare Pages 项目的 `自定义域` 设置中进行绑定，并按照指引配置相应的 DNS 记录。Cloudflare 会自动为您处理 SSL 证书。

## 步骤六：访问您的导航页

- **主页面**：直接访问您的域名，例如 `https://your-project.pages.dev`。
- **附加页面**：通过主页面的链接点击，或直接访问 `https://your-project.pages.dev/#additional-page`。