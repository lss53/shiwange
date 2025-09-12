---
title: "QAuxiliary：一款基于 QNotified 的开源 QQ 净化 Xposed 模块"
shortTitle: QAuxiliary QQ 净化
date: 2024-10-18
icon: fa-brands fa-qq
order: 1
category:
  - Android
tag:
  - QAuxiliary
  - Xposed
  - QQ
  - Android
description: 本文介绍了如何使用 QAuxiliary，一个功能强大的开源 Xposed 模块，来净化和增强您的 QQ 体验。指南包括了如何通过 OPatch 或 ONPatch 工具将模块注入到官方 QQ 安装包中，实现免 Root 使用。
---

## 软件概述

**QAuxiliary** 是一款针对安卓 QQ 的 Xposed 模块，它继承并扩展了著名模块 QNotified 的功能，旨在为用户提供一个更纯净、更高效的 QQ 使用体验。其功能包括但不限于消息防撤回、净化界面、隐藏不需要的元素、增强聊天功能等。

- **GitHub 项目地址**: [https://github.com/cinit/QAuxiliary](https://github.com/cinit/QAuxiliary)

## 使用方法 (免 Root 注入)

本教程将介绍如何使用 OPatch/ONPatch 工具，将 QAuxiliary 模块直接注入到官方 QQ 的 APK 安装包中，从而在**未 Root**的设备上也能正常使用。

### 准备文件

请提前下载以下三个文件到您手机的 `Download` 目录：
1.  **QQ 安装包**: 从 [QQ 官网](https://im.qq.com/index) 下载最新版的安卓 APK。
2.  **QAuxiliary 模块**: 从 [QAuxiliary GitHub Releases](https://github.com/cinit/QAuxiliary/releases) 下载最新的 APK 文件。
3.  **注入工具**:
    *   **OPatch**: [Telegram 频道下载](https://t.me/QToolCI/268)
    *   **ONPatch**: [Telegram 频道下载](https://t.me/NPatch/159)

::: info 备用下载
如果无法访问 Telegram，可以使用以下搬运地址：
<https://484644.1314920.us.kg>
:::

### 操作步骤

1.  **安装注入工具**：首先安装您下载的 OPatch 或 ONPatch 应用。

2.  **开始注入**：
    *   打开 OPatch/ONPatch 应用。
    *   点击主界面的 **+** (加号) 按钮，选择 `从存储目录中选择(多个)apk`。
    *   在文件选择器中，首先找到并选择您下载的 **QQ 安装包**。
    *   在接下来的操作菜单中，选择 **嵌入模块**。
    *   再次进入文件选择器，这次找到并选择您下载的 **QAuxiliary 模块包**。
    *   点击 **开始注入**。

3.  **等待处理**：
    *   应用会自动处理文件，将模块代码注入到 QQ 中。这个过程可能需要一些时间。
    *   处理完成后，界面会显示新生成 APK 的存放路径，通常在 `0/Android/data/org.lsposed.opatch/cache/apk/` 目录下。

4.  **安装新版 QQ**：
    *   卸载您手机上已有的官方 QQ。
    *   找到新生成的 APK 文件并进行安装。

5.  **激活模块**：
    *   打开注入版的 QQ，进入 **设置** → **QAuxiliary 设置**。
    *   根据您的需求，开启或关闭相应的功能（如防撤回、净化等）。

现在，您就可以享受由 QAuxiliary 带来的清爽 QQ 体验了。