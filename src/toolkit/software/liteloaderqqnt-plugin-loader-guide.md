---
title: "LiteLoaderQQNT：QQNT 的开源插件加载器安装与使用指南"
shortTitle: LiteLoaderQQNT 指南
date: 2024-10-18
icon: fa-solid fa-puzzle-piece
order: 2
category:
  - Software
tag:
  - LiteLoaderQQNT
  - QQ
  - 插件
  - 开源
description: 本指南详细介绍了如何为最新版的 QQNT 安装开源插件加载器 LiteLoaderQQNT，通过简单的安装工具实现一键注入，让您能够自由安装和管理各种功能增强插件，打造个性化的 QQ 体验。
---

## 什么是 LiteLoaderQQNT？

**LiteLoaderQQNT** 是一款为 Windows、macOS 和 Linux 平台上的新版 QQ (QQNT) 设计的插件加载器。它允许用户在原版 QQ 的基础上，加载各种第三方插件，以实现界面美化、功能增强、消息防撤回等官方不支持的功能，为您带来更自由、更强大的 QQ 使用体验。

- **GitHub 项目**: [LiteLoaderQQNT](https://github.com/LiteLoaderQQNT/LiteLoaderQQNT)

## 安装步骤

我们将使用社区开发者制作的一键安装工具，它可以自动找到 QQ 的安装位置并注入加载器核心文件。

### 1. 准备工作

- **安装 QQNT**: 确保您已从 [QQ 官网](https://im.qq.com/index) 下载并安装了最新版的 QQNT 桌面客户端。安装后，**请完全退出 QQ** (检查系统托盘区，确保 QQ 进程已结束)。

- **下载安装器**:
  - 访问 [LiteLoaderQQNT_Install 的 GitHub Releases 页面](https://github.com/Mzdyl/LiteLoaderQQNT_Install/releases)。
  - 下载最新的 `LiteLoaderQQNT.Install.exe` 文件。

### 2. 执行安装

1.  双击运行下载的 `LiteLoaderQQNT.Install.exe` 文件。
2.  程序会自动检测您的 QQNT 安装路径。如果检测正确，直接点击 **安装** 按钮。
3.  安装过程非常快，通常几秒钟内即可完成。安装成功后，会有弹窗提示。

### 3. 验证安装并使用插件

1.  重新启动您的 QQNT 客户端。
2.  登录后，点击主界面左下角的 **三条横线** (主菜单) → **设置**。
3.  在设置界面的左侧导航栏中，如果能看到一个新的 **LiteLoaderQQNT** 选项，则代表加载器已成功安装。
4.  点击 **LiteLoaderQQNT**，进入插件管理页面。您可以在这里：
    - 查看已安装的插件列表。
    - 打开**插件市场**，浏览、下载和安装社区开发者分享的各种插件。
    - 打开**插件数据目录**，进行手动管理。

## 插件与数据目录

- **数据目录**: `C:\Users\您的用户名\Documents\LiteloaderQQNT`
- **插件目录**: `C:\Users\您的用户名\Documents\LiteloaderQQNT\plugins`

::: tip 维护提示
- 当 QQNT 客户端更新后，如果发现插件失效，请首先尝试更新 LiteLoaderQQNT 加载器本身（重新运行一次安装器），然后再到插件市场中检查并更新您的插件。
- 建议从官方插件市场或可信的开发者渠道获取插件，以确保安全。
:::