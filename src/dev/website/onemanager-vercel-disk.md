---
title: 使用 OneManager + OneDrive + Vercel 快速搭建个人在线网盘
shortTitle: OneManager 网盘搭建
date: 2024-01-31
icon: fas fa-cloud
order: 3
category:
  - 网站搭建
tag:
  - 在线网盘
  - OneManager
  - OneDrive
  - Vercel
description: 本文详细介绍如何利用 OneManager 开源程序、Microsoft OneDrive 云存储和 Vercel 无服务器平台，快速搭建一个功能完善、可自定义域名的个人在线网盘系统。
---

## 前提条件

在开始之前，请确保您已准备好以下资源：
- 一个 Microsoft 365 开发者账户 (E5) 或普通的 OneDrive 账户。
-一个 [Vercel](https://vercel.com/) 账户。
- (可选) 一个您自己的域名。

## 一、申请 Azure 应用凭据

为了让 OneManager 能够访问您的 OneDrive 数据，需要在 Azure 门户中注册一个应用程序。

### 1. 注册新应用
1.  登录 [Azure 门户 - 应用注册](https://portal.azure.com/#blade/Microsoft_AAD_RegisteredApps/ApplicationsListBlade)。
2.  点击 `+ 新注册`。
3.  **名称**: 任意填写，如 `MyOneManager`。
4.  **受支持的帐户类型**: 选择 `任何组织目录...和个人 Microsoft 帐户...` (多租户)。
5.  **重定向 URI**: 选择 `Web` 平台，并输入 `https://scfonedrive.github.io`。
6.  点击 `注册`。
7.  在应用概览页面，**复制并保存 `应用程序(客户端) ID`**，备用。

### 2. 创建客户端密码
1.  在应用管理页面，进入 `证书和密码` 菜单。
2.  点击 `+ 新建客户端密码`。
3.  **说明**: 任意填写。
4.  **截止期限**: 建议选择 `24 个月`。
5.  点击 `添加`。
6.  **立即复制并保存生成的客户端密码的 `值`**。此值只显示一次，离开页面后将无法查看。

### 3. 配置 API 权限
1.  进入 `API 权限` 菜单。
2.  确保 `Microsoft Graph` 下已有以下**委托的权限**，若没有请手动添加：
    - `User.Read` (默认应已存在)
    - `Files.Read.All`
    - `offline_access`
3.  添加后，点击 `代表...授予管理员同意` (如果可用)。

## 二、创建 Vercel 访问令牌 (Token)

1.  访问 [Vercel - Account Tokens](https://vercel.com/account/tokens)。
2.  输入一个令牌名称，`SCOPE` 选择 `Full Account`，`EXPIRATION` 选择 `No Expiration`。
3.  点击 `Create`，**并立即复制保存生成的 Token**。

## 三、部署 OneManager 到 Vercel

我们将使用 `scfonedrive` 提供的在线部署工具。

1.  下载最新的 OneManager-php 源码包：[master.zip](https://github.com/qkqpttgf/OneManager-php/archive/refs/heads/master.zip)。
2.  打开在线部署页面：[Vercel Deploy Helper](https://scfonedrive.github.io/Vercel/Deploy.html)。
3.  **Input Token**: 粘贴您在第二步中创建的 Vercel Token，并点击 `Check`。
4.  **Choose the zip file**: 选择您刚下载的 `OneManager-php-master.zip` 文件。
5.  点击 `Deploy`，等待部署完成。
6.  部署成功后，点击页面上提供的任一 Vercel 域名进入初始化配置。

## 四、配置 OneManager

1.  **首次安装**:
    - 选择语言为 `简体中文`。
    - `Token` 处输入一个自定义的 Token（用于后台管理）。
    - 设置 `admin password` (后台登录密码)。
    - 点击 `确定` 完成安装。

2.  **挂载 OneDrive**:
    - 返回首页，使用您设置的密码登录后台。
    - 进入 `管理` → `设置`，在 `OneDrive` 处点击 `添加盘`。
    - **标签** 和 **显示名称**: 自定义，如 `MyDisk`。
    - **账户类型**: 根据您的 OneDrive 版本选择。
    - 勾选 `用自己申请的应用ID与机密`，并填入您在第一步中保存的 `客户端 ID` 和 `客户端密码值`。
    - 点击 `确认`，页面将跳转到微软登录授权，完成授权即可。

3.  **设置公开目录**:
    - 在您的 OneDrive 中创建一个名为 `public` 的文件夹，您希望公开分享的文件都放在此文件夹内。
    - 返回 OneManager 管理后台，在您刚添加的 `MyDisk` 盘的设置中，将 `public_path` 设置为 `/public/`，并保存。

4.  **个性化设置**:
    在 `平台变量` 设置中，您可以自定义网站名称 (`sitename`)、主题 (`theme`) 等。

::: tip
如果添加文件后页面没有显示，请尝试在管理后台使用 `刷新当前目录的缓存` 功能。
:::

## 五、绑定自定义域名 (可选)

1.  在 Vercel 项目的 `Settings` → `Domains` 中，添加您自己的域名。
2.  根据 Vercel 的提示，到您的域名注册商处添加相应的 `A` 记录或 `CNAME` 记录。
3.  等待 DNS 解析生效后，即可通过您的域名访问网盘。