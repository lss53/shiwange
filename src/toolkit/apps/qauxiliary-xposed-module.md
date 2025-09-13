---
title: QAuxiliary：一款基于 QNotified 的开源 QQ 辅助 Xposed 模块
shortTitle: QAuxiliary 模块
date: 2024-10-18
icon: fa-brands fa-qq
order: 1
category:
  - Android 应用
tag:
  - QAuxiliary
  - QNotified
  - Xposed
  - QQ
description: 本文介绍了如何使用 QAuxiliary，一款为 QQ 定制的开源 Xposed 模块。通过 OPatch 等工具将其注入到 QQ 安装包中，可以实现消息防撤回、净化界面等多种增强功能。
---

## 模块介绍

**QAuxiliary** 是一款为 Android QQ 设计的 Xposed 模块，它基于 [QNotified](https://github.com/QNotified/QNotified) 项目，旨在提供一系列增强和净化功能，例如消息防撤回、简洁模式、自定义主题等，以提升用户的使用体验。

- **GitHub 项目地址**: [https://github.com/cinit/QAuxiliary](https://github.com/cinit/QAuxiliary)

## 使用方法 (注入模式)

对于没有 Root 权限或不想安装 Xposed 框架的用户，可以通过 OPatch/ONPatch 等工具将 QAuxiliary 模块直接注入到 QQ 的 APK 安装包中，生成一个功能增强版的 QQ。

### 准备文件

您需要提前下载以下三个文件到手机的 `Download` 文件夹中：
1.  **QQ 官方安装包**: 从 [QQ 官网](https://im.qq.com/index) 下载最新版的 APK 文件。
2.  **QAuxiliary 模块**: 从 [QAuxiliary Releases](https://github.com/cinit/QAuxiliary/releases) 页面下载最新的 APK 文件。
3.  **注入工具**:
    - **OPatch**: [Telegram 频道](https://t.me/QToolCI/268)
    - **ONPatch**: [Telegram 频道](https://t.me/NPatch/159)

::: tip 备用下载
如果您无法访问 Telegram，可以从以下镜像地址获取所需文件：
- **资源合集**: <https://484644.1314920.us.kg>
:::

### 注入步骤

1.  **安装注入工具**: 首先安装 `OPatch.apk` 或 `ONPatch.apk`。

2.  **打开并配置**:
    - 启动 OPatch/ONPatch 应用。
    - 点击 `管理` → `+` (加号) → `从存储目录中选择(多个)apk`。
    - 在文件选择器中，导航到 `Download` 文件夹，并选择您下载的 **QQ 安装包**。

3.  **选择模式并嵌入模块**:
    - 在弹出的操作菜单中，选择 `集成原神模式`（或其他类似选项）。
    - 接着选择 `嵌入模块` → `从存储目录中选择(多个)apk`。
    - 再次进入 `Download` 文件夹，这次选择 **QAuxiliary 模块的 APK 文件**。

4.  **开始注入**:
    - 点击 `开始注入`，并耐心等待处理完成。
    - 注入成功后，应用界面会显示新生成 APK 文件的路径（通常在 `/Android/data/org.lsposed.opatch/cache/apk/` 目录下）。

5.  **安装增强版 QQ**:
    - 卸载手机上原有的 QQ。
    - 找到新生成的 APK 文件并进行安装。

安装完成后，登录 QQ 即可体验 QAuxiliary 带来的各项增强功能。您可以在 QQ 的设置菜单中找到模块的专属设置项。