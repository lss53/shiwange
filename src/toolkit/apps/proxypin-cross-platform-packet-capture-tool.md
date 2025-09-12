---
title: "ProxyPin：一款开源、跨平台的高颜值抓包工具"
shortTitle: ProxyPin 抓包工具
date: 2025-06-14
icon: fa-solid fa-network-wired
order: 4
category:
  - Software
tag:
  - ProxyPin
  - 抓包
  - 网络工具
  - 开源
description: 介绍一款在 GitHub 上星标 9k+ 的开源免费抓包工具——ProxyPin。它基于 Flutter 开发，UI 美观，支持 Windows, Mac, Android, iOS, Linux 全平台，能轻松拦截、检查和重写 HTTP(S) 流量，并特别优化了对 Flutter 应用的抓包支持。
---

## 软件概述

**ProxyPin** 是一款现代化的网络抓包工具，它允许开发者和测试人员拦截、检查、修改和重放 HTTP(S) 网络流量。该项目完全开源免费，并以其跨平台支持和美观易用的界面而备受好评。

- **GitHub 项目地址**: [https://github.com/wanghongenpin/proxypin](https://github.com/wanghongenpin/proxypin)
- **国内下载地址 (Gitee)**: [https://gitee.com/wanghongenpin/proxypin/releases](https://gitee.com/wanghongenpin/proxypin/releases)
- **官方视频教程**: [证书安装流程介绍](https://www.bilibili.com/video/BV1Qm4y157Gk)

**核心特性**:
- **全平台支持**: Windows, macOS, Android, iOS, Linux。
- **美观的 UI**: 基于 Flutter 构建，界面现代且直观。
- **HTTPS 拦截**: 支持 SSL/TLS 流量解密。
- **Flutter 应用支持**: 对 Flutter 应用的网络请求有特别优化。
- **请求重写与修改**: 可自定义规则修改请求和响应内容。

## 实战案例：抓取夸克网盘签到参数 (手机端)

以下流程将演示如何使用 ProxyPin 的安卓版，抓取夸克网盘 App 每日签到所需的网络请求参数。

### 1. 安装与配置 ProxyPin (Android)

1.  **下载应用**: 从 [GitHub Releases](https://github.com/wanghongenpin/proxypin/releases) 下载适用于您设备架构的 APK 文件。
    - `ProxyPin-android-arm64.apk` (适用于主流 64 位安卓设备)
    - `ProxyPin-android.apk` (适用于 32 位或旧设备)
2.  **安装证书**:
    - 打开 ProxyPin 应用。
    - 点击右上角 **⋮** (三个点) 菜单 → **HTTPS 代理**。
    - 点击 **安装根证书**，并按照系统提示完成安装 (通常需要设置锁屏密码)。
3.  **启用代理**:
    - 在 **HTTPS 代理**页面，确保 **启用 HTTPS 代理** 开关是打开状态。
    - 返回主界面，点击 **▶** (播放按钮) 启动抓包服务。

### 2. 触发夸克签到请求

- 保持 ProxyPin 在后台运行并处于抓包状态。
- 打开 **夸克网盘 App**。
- 导航至签到页面并完成签到操作 (通常路径为：夸克首页右下角 **☰** → **会员中心** → **每天免费领空间**)。

### 3. 在 ProxyPin 中提取参数

1.  切换回 ProxyPin 应用。
2.  在抓包记录的**域名列表**中，找到并点击 `drive-m.quark.cn`。
3.  在展开的请求列表中，查找以下任一接口地址：
    - `GET /1/clouddrive/capacity/growth/info`
    - `GET /1/clouddrive/sign_in/sign`
4.  点击目标请求，切换到 **Headers** 标签页。
5.  找到名为 `Cookie` 的条目，长按并**复制其完整的字符串值**。

**Cookie 示例**:
```
_UP_A4A_11_=...; __wpkreporter_uuid__=...; ...
```

这个 Cookie 字符串就是用于[夸克网盘自动签到脚本](https://github.com/Liu8Can/Quark_Auot_Check_In)所需的核心参数。