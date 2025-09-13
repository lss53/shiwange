---
title: LiteLoaderQQNT：为 QQ NT 版设计的强大插件加载器
shortTitle: LiteLoaderQQNT
date: 2024-10-18
icon: fa-solid fa-puzzle-piece
order: 2
category:
  - Windows 软件
tag:
  - LiteLoaderQQNT
  - QQNT
  - 插件
  - 社交软件
description: 本文介绍了如何为 Windows 版的 QQ NT 客户端安装和使用 LiteLoaderQQNT，一个强大的插件加载器。通过它，您可以轻松安装各类第三方插件，实现美化主题、消息防撤回等丰富的扩展功能。
---

## LiteLoaderQQNT 是什么？

**LiteLoaderQQNT** 是一款为 QQ NT 桌面客户端设计的插件加载器。它允许用户在原版 QQ 的基础上，加载和管理各种第三方插件，从而实现界面美化、功能增强、消息防撤回等官方版本不具备的特性。

## 安装步骤

### 1. 准备工作
- **安装 QQ NT**: 首先，从 [QQ 官方网站](https://im.qq.com/index) 下载并安装最新版的 QQ NT for Windows。安装后，请**完全退出 QQ 客户端**。

### 2. 下载并运行安装器
- **获取安装器**: 访问 [LiteLoaderQQNT Installer 的 Releases 页面](https://github.com/Mzdyl/LiteLoaderQQNT_Install/releases)，下载最新的 `install_windows.exe` 文件。
- **执行安装**: 双击运行 `install_windows.exe`。程序会自动查找您的 QQ 安装路径并注入加载器。请仔细阅读终端窗口中显示的提示信息，等待其自动完成。

安装成功后，LiteLoaderQQNT 会在您的“文档”目录下创建一个专属的数据文件夹。

::: tip 关键目录路径
- **数据目录**: `C:\Users\您的用户名\Documents\LiteloaderQQNT`
- **插件目录**: `C:\Users\您的用户名\Documents\LiteloeloaderQQNT\plugins`
:::

## 使用与插件管理

### 1. 启动与验证
安装完成后，正常启动 QQ。如果注入成功，您可以在 QQ 的主菜单（三道杠）→ `设置` 中看到新增的 `插件列表` 或 `LiteLoader` 相关的选项。

### 2. 安装插件
1.  **获取插件**: 您可以从 LiteLoaderQQNT 的官方插件商店、GitHub 或其他社区渠道找到丰富的插件。插件通常以文件夹的形式提供。
2.  **放置插件**: 将下载的插件文件夹，完整地复制到上述的**插件目录** (`...\LiteloaderQQNT\plugins`) 中。
3.  **重启 QQ**: 完全退出并重新启动 QQ 客户端，新的插件就会被加载。

::: warning QQ 更新注意事项
当 QQ 客户端通过官方渠道自动更新后，可能会导致 LiteLoaderQQNT 失效。届时，您需要重新运行一遍安装器 (`install_windows.exe`) 来使其适配新版本的 QQ。通常插件无需更新，但建议关注插件开发者的兼容性说明。
:::