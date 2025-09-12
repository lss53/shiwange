---
title: 夸克网盘自动签到脚本配置指南
shortTitle: 夸克网盘自动签到
date: 2025-06-20
icon: fa-solid fa-cloud
order: 7
category:
  - 攻略
tag:
  - 夸克网盘
  - 脚本
  - 自动化
description: 本指南提供了夸克网盘自动签到脚本的配置方法，详细介绍了如何使用抓包工具（如 ProxyPin）在手机端获取签到所需的 Cookie 参数，并提供了修改 Python 脚本以实现自动化签到的具体步骤。
---

## 概述

本教程旨在利用开源项目 [Auto_Check_In](https://github.com/BNDou/Auto_Check_In) 中的夸克网盘签到功能，实现每日自动签到，轻松获取云存储空间。核心步骤包括**抓取签到参数**和**配置运行脚本**。

```component VPBanner
title: 抓包工具提示
content: 本教程需要从手机端夸克 App 中抓取网络请求参数。如果您不熟悉此操作，建议先学习使用 <b>ProxyPin</b> 等抓包工具。
background: var(--bg-10)
color: var(--banner-text)
actions:
  - text: 了解 ProxyPin
    link: ../apps/proxypin-for-android-proxy.md
```

## 步骤一：抓取签到参数

我们需要通过抓包工具拦截夸克 App 的网络请求，以获取包含认证信息的 Cookie。

### 1. 准备工作
- 在您的安卓手机上安装 **夸克网盘 App**。
- 安装并配置好 **ProxyPin** 或其他类似的抓包工具。
  - **下载地址**: [ProxyPin GitHub Releases](https://github.com/wanghongenpin/proxypin/releases)
  - **关键配置**: 确保已正确安装 HTTPS 根证书，并开启 HTTPS 代理。

### 2. 抓取流程
1.  在 ProxyPin 中**启动抓包** (点击 ▶️ 图标)。
2.  打开夸克网盘 App，进入**会员中心**并执行**签到**操作 (通常在“每天免费领空间”福利入口)。
3.  返回 ProxyPin，在抓包记录中筛选域名 `drive-m.quark.cn`。
4.  查找接口地址包含 `1/clouddrive/sign_in/sign` 或 `1/clouddrive/capacity/growth/info` 的请求。
5.  点击该请求，查看其 **Headers** (请求头) 标签页。
6.  找到名为 `Cookie` 的条目，**复制其完整的字符串值**。这串字符就是我们需要的核心参数。

**Cookie 示例格式**: `_UP_A4A_11_=...; __wpkreporter_uuid__=...; _UP_D_=...; ...`

## 步骤二：配置并运行脚本

我们将使用 [Liu8Can/Quark_Auot_Check_In](https://github.com/Liu8Can/Quark_Auot_Check_In) 提供的简化版脚本，并配置在 GitHub Actions 等自动化平台上运行。

### 1. Fork 仓库
访问 [Quark_Auot_Check_In 仓库](https://github.com/Liu8Can/Quark_Auot_Check_In) 并将其 Fork 到您自己的 GitHub 账户。

### 2. 添加 Secrets
1.  进入您 Fork 后的仓库，点击 `Settings` → `Secrets and variables` → `Actions`。
2.  点击 `New repository secret`，创建一个新的 Secret：
    *   **Name**: `COOKIE_QUARK`
    *   **Value**: 粘贴您在第一步中抓取到的**完整 Cookie 字符串**。
3.  如果需要为多个账号签到，可以在 Secret 中换行添加多条 Cookie 记录。

### 3. 启用并运行 Actions
1.  进入仓库的 `Actions` 标签页，如果看到提示，请点击 `I understand my workflows, go ahead and enable them` 启用工作流。
2.  该仓库的脚本默认设置为每日定时运行。您也可以通过以下方式手动触发一次：
    *   在左侧选择 `Quark Check In` 工作流。
    *   点击 `Run workflow` 按钮。
3.  在运行日志中查看签到结果，确认是否配置成功。

通过以上步骤，您的夸克网盘将实现每日自动签到，无需人工干预。