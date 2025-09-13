---
title: ProxyPin：一款开源免费的全平台网络抓包工具
shortTitle: ProxyPin 抓包工具
date: 2025-06-14
icon: fa-solid fa-network-wired
order: 4
category:
  - Android 应用
tag:
  - ProxyPin
  - 抓包工具
  - 网络软件
  - 开源
description: ProxyPin 是一款在 GitHub 上广受欢迎的开源免费抓包工具，它支持 Windows、macOS、Android、iOS 和 Linux 全平台。本文将介绍其基本功能，并以抓取夸克网盘签到参数为例，演示其在手机端的具体使用流程。
---

## 软件概述

**ProxyPin** 是一款基于 Flutter 开发的现代化网络抓包工具，您可以使用它来拦截、检查、修改和重放 HTTP(S) 流量。其美观易用的 UI 和跨平台特性，使其成为开发者和技术爱好者的得力助手，尤其在移动端（如 Flutter 应用）抓包方面表现出色。

- **GitHub 地址**: [https://github.com/wanghongenpin/proxypin](https://github.com/wanghongenpin/proxypin)
- **国内下载镜像**: [Gitee Releases](https://gitee.com/wanghongenpin/proxypin/releases)
- **证书安装视频教程**: [Bilibili](https://www.bilibili.com/video/BV1Qm4y157Gk)

## 实战：抓取夸克网盘手机端签到参数

以下流程将指导您如何在安卓手机上使用 ProxyPin 获取夸克网盘自动签到所需的参数。

### 1. 安装与配置

1.  **下载并安装应用**:
    - 从上述地址下载适用于您设备架构的 APK 文件（如 `ProxyPin-android-arm64.apk`）。
    - 在手机上安装该应用。

2.  **安装根证书**:
    - 打开 ProxyPin 应用。
    - 点击右上角的 `⋮` (菜单) → `HTTPS代理`。
    - 点击 `安装根证书`，并根据您的设备类型（ROOT 或非 ROOT）和系统版本，按照弹出的指引完成证书的安装与信任。

3.  **启动抓包服务**:
    - 在 `HTTPS代理` 页面，确保 `启用HTTPS代理` 的开关是打开的。
    - 返回 ProxyPin 主界面，点击 `▶` (播放) 图标，启动抓包服务。

### 2. 捕获签到请求

1.  **打开夸克网盘 App**。
2.  **进入签到页面**：通常路径为 `夸克首页右下角 ☰ → 会员中心 → 每日福利`，手动完成一次签到操作。

### 3. 提取关键参数

1.  **切换回 ProxyPin 应用**。
2.  在抓包记录列表中，通过顶部的搜索功能，筛选域名 `drive-m.quark.cn`。
3.  展开该域名下的请求列表，查找以下任一接口地址：
    - `GET /1/clouddrive/capacity/growth/info`
    - `GET /1/clouddrive/act/growth/reward`
4.  点击目标请求，进入详情页面。
5.  在 `请求` 标签页下，找到 `Cookie` 字段，并**复制其完整的字符串值**。

这个 `Cookie` 值就是用于夸克网盘自动签到脚本所需的关键参数。您可以将其配置到支持此类脚本的自动化工具（如 GitHub Actions）中。

> **参考项目**: [Quark_Auto_Check_In on GitHub](https://github.com/Liu8Can/Quark_Auot_Check_In)