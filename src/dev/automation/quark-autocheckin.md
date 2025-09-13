---
title: 夸克网盘自动签到脚本配置指南
shortTitle: 夸克网盘自动签到
date: 2025-06-20
icon: fa-solid fa-robot
order: 7
category:
  - 自动化脚本
tag:
  - 夸克网盘
  - 自动签到
  - 脚本
  - 抓包
  - GitHub Actions
description: 本指南介绍了如何通过抓包获取夸克网盘手机端的签到参数，并配置 GitHub Actions 实现每日自动签到，轻松获取云空间奖励。
---

```component VPBanner
title: 前置技能：抓包
content: 本教程需要您具备使用抓包工具获取手机 App 网络请求参数的基本能力。如果您对此不熟悉，可以先从学习 <i>ProxyPin</i> 等工具开始。
background: var(--bg-10)
color: var(--banner-text)
logo: logo.svg
actions:
  - text: 了解 ProxyPin
    link: /toolkit/apps/proxypin-guide.md
```

## 方案概述

本方案利用了开源项目 [Auto_Check_In](https://github.com/BNDou/Auto_Check_In) 中的夸克网盘签到脚本，通过抓取手机端夸克 App 的请求参数，并将其配置为 GitHub Actions 的环境变量，实现每日自动执行签到任务。

## 步骤一：获取签到参数

您需要通过抓包工具（如 ProxyPin, Mitmproxy, Fiddler 等）拦截夸克网盘手机 App 的网络请求，以获取必要的认证参数。

1.  **配置抓包环境**：在您的电脑或手机上设置好抓包工具，并确保手机已信任其证书，能够成功拦截 HTTPS 请求。
2.  **触发签到请求**：打开夸克网盘 App，手动进入签到页面并完成一次签到。通常路径为：`夸克首页右下角 菜单 → 会员中心 → 每日福利`。
3.  **查找目标请求**：在抓包工具的记录中，筛选域名为 `drive-m.quark.cn` 的请求。找到包含以下路径之一的 GET 请求：
    - `/1/clouddrive/capacity/growth/info`
    - `/1/clouddrive/act/growth/reward`
4.  **提取请求头 (Cookie)**：从该请求的 Headers 中，复制完整的 `Cookie` 值。它通常是一长串由分号分隔的键值对。

## 步骤二：配置 GitHub Actions

1.  **Fork 仓库**：
    访问 [Quark_Auto_Check_In 仓库](https://github.com/Liu8Can/Quark_Auot_Check_In)（或其他类似的实现），并将其 Fork到您自己的 GitHub 账户下。

2.  **设置 Secrets**：
    - 进入您 Fork 后的仓库页面，点击 `Settings` → `Secrets and variables` → `Actions`。
    - 点击 `New repository secret`，创建一个名为 `COOKIE_QUARK` 的 secret。
    - 将您在第一步中获取到的完整 `Cookie` 字符串粘贴到 `Value` 框中，并保存。
    - **多账户支持**：如果您有多个夸克账户，可以换行或使用 `|&&` 分隔符来添加多个 Cookie。

3.  **启用 Actions**：
    - 进入仓库的 `Actions` 标签页，如果看到一个 "I understand my workflows, go ahead and enable them" 的按钮，请点击它以启用 GitHub Actions。

4.  **手动触发测试**：
    - 在 `Actions` 页面，点击左侧的 `Quark_Check_In` 工作流。
    - 点击右侧的 `Run workflow` 按钮，手动触发一次签到任务。
    - 点击运行中的任务，查看其日志输出，确认是否签到成功。

配置完成后，GitHub Actions 将会根据 `.github/workflows/` 文件中设定的 `cron` 表达式（通常是每天一次）自动执行签到脚本。