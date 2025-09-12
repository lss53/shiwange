---
title: 使用 OneManager + OneDrive + Vercel 搭建免费个人网盘
shortTitle: OneManager 搭建免费网盘
date: 2024-01-31
icon: fa-solid fa-cloud
order: 3
category:
  - 建站
tag:
  - 在线网盘
  - OneManager
  - OneDrive
  - Vercel
description: 本文提供了一份详细的图文教程，指导您如何利用开源项目 OneManager、Microsoft OneDrive（特别是 E5 开发者订阅）的云存储空间和 Vercel 的无服务器平台，快速、免费地搭建一个功能完善的个人在线网盘系统。
---

## 准备工作

在开始之前，请确保您拥有以下资源：
- 一个 **Microsoft 365 E5 开发者账户** (提供 5TB OneDrive 空间) 或普通 OneDrive 账户。
- 一个 **Vercel 账户** (用于免费部署)。
- 一个 **GitHub 账户**。
- (可选) 一个您自己的**域名**。

## 步骤一：创建 Azure 应用 (获取 `client_id` 和 `client_secret`)

我们需要在 Azure Active Directory 中注册一个应用程序，以获取访问 OneDrive 文件的 API 权限。

### 1. 注册新应用
1.  登录 [Azure 门户](https://portal.azure.com/)，搜索并进入 **Microsoft Entra ID**。
2.  在左侧菜单中选择 **应用注册** (App registrations) → **+ 新注册** (+ New registration)。
3.  填写注册信息：
    *   **名称**: 自定义一个名称，如 `MyOneManager`。
    *   **支持的帐户类型**: 选择 **任何组织目录(任何 Microsoft Entra ID 租户 - 多租户)中的帐户和个人 Microsoft 帐户...**。
    *   **重定向 URI**: 选择 **Web** 平台，并输入 `https://scfonedrive.github.io`。
4.  点击 **注册**。
5.  在应用概览页面，**复制并保存** `应用程序(客户端) ID`，这就是 `client_id`。

### 2. 创建客户端密码
1.  在您刚刚创建的应用页面，进入 **证书和密码** (Certificates & secrets)。
2.  点击 **+ 新客户端密码** (+ New client secret)。
3.  **说明**处填写任意描述，**截止期限**建议选择最长的 **24 个月**。
4.  点击 **添加**。
5.  **立即复制并保存**生成的客户端密码的 **值 (Value)**，这就是 `client_secret`。

::: warning
客户端密码的值**只会显示一次**，离开页面后将无法再次查看，请务必妥善保存。
:::

### 3. 配置 API 权限
1.  进入 **API 权限** (API permissions) 页面。
2.  确保已包含以下三个**委托的权限 (Delegated permissions)**:
    *   `Files.Read.All`
    *   `offline_access`
    *   `User.Read`
3.  如果缺少，请点击 `+ 添加权限` → `Microsoft Graph` → `委托的权限`，搜索并勾选后添加。

## 步骤二：部署 OneManager 到 Vercel

我们将使用 [OneManager-php](https://github.com/qkqpttgf/OneManager-php) 项目，并利用一个便捷的在线工具进行部署。

1.  访问 [OneManager Vercel 部署页面](https://scfonedrive.github.io/Vercel/Deploy.html)。
2.  **获取 Vercel Token**:
    *   访问 [Vercel Token 创建页面](https://vercel.com/account/tokens)。
    *   创建一个新的 Token，权限范围 (`SCOPE`) 选择 `Full Account`，**复制并保存**生成的 Token。
3.  **部署操作**:
    *   将获取的 Vercel Token 粘贴到部署页面的输入框中，并点击 `Check` 进行验证。
    *   在 `Project Name` 处输入一个项目名称（例如 `my-disk`），这将是您 Vercel 的子域名。
    *   点击 `Deploy`，等待部署完成。

## 步骤三：初始化和配置 OneManager

1.  部署成功后，访问 Vercel 为您生成的域名（例如 `https://my-disk.vercel.app`）。
2.  **首次安装**:
    *   语言选择**简体中文**。
    *   设置一个**管理密码**。
    *   点击**确定**完成安装。
3.  **登录后台**: 点击页面左上角的**登录**，输入您设置的管理密码。
4.  **添加 OneDrive 网盘**:
    *   点击左上角**管理** → **设置**。
    *   在**存储**部分，点击 `OneDrive` 旁边的**添加盘**。
    *   **标签**和**显示名称**自定义，如 `main`。
    *   **账户类型**根据您的 OneDrive 版本选择（E5 选“世纪互联”或“国际版”，视情况而定）。
    *   勾选**用自己申请的应用 ID 与机密**，并填入之前保存的 `client_id` 和 `client_secret`。
    *   点击**确认**。
5.  **授权 OneDrive**:
    *   页面会自动跳转到 Microsoft 登录和授权界面。
    *   登录您的 OneDrive 账户并点击**接受**。
    *   授权成功后，会自动跳转回 OneManager，选择 `Use OneDrive` 并**确认**。
6.  看到 `diskSpace` 显示您的 OneDrive 容量信息，表示挂载成功。

## 步骤四：绑定自定义域名（可选）

1.  登录 Vercel，进入您的项目 → `Settings` → `Domains`。
2.  输入您的域名并点击 `Add`。
3.  根据 Vercel 的提示，到您的域名注册商处添加指定的 `A` 记录或 `CNAME` 记录。
4.  等待 DNS 解析生效后，即可通过您的自定义域名访问网盘。

::: tip
建议在 OneManager 后台设置一个公开目录（`public_path`），例如 `/Public/`，这样放在 OneDrive `/Public/` 文件夹下的内容就可以被公开访问。
:::