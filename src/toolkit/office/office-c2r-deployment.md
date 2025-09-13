---
title: Office C2R (Click-to-Run) 自定义安装与部署指南
shortTitle: Office C2R 自定义安装
date: 2025-01-06
icon: fa-brands fa-microsoft
order: 1
category:
  - Office
tag:
  - Microsoft 365
  - Office 2024
  - ODT
description: 本指南详细介绍了如何使用 Office 部署工具 (ODT) 和 Office 自定义工具在线版，精确控制 Office Click-to-Run 版本的安装过程，包括选择零售版或批量版、指定应用程序、语言和版本。
---

## 背景知识

- **Retail (零售版)**: 如 Microsoft 365，包含最新的功能更新，持续迭代。
- **Volume (批量版/大客户版)**: 如 Office LTSC 2024，功能相对固定，主要接收安全更新，适用于企业环境。

本教程将引导您使用微软官方推荐的方法，通过 Office 部署工具 (ODT) 进行自定义安装，此方法灵活且可靠。

## 自定义安装步骤

### 1. 环境准备

- **卸载旧版 Office**: 如果您的电脑上已安装任何版本的 Office，请先通过 Windows 设置中的“应用和功能”将其完全卸载。
- **创建工作目录**: 在您的电脑上创建一个新文件夹用于存放安装文件，例如 `C:\OfficeTools`。

### 2. 下载 Office 部署工具 (ODT)

- 从微软官方网站下载 ODT：[点击下载 (setup.exe)](https://officecdn.microsoft.com/pr/wsus/setup.exe)。
- 将下载的 `setup.exe` 文件移动到您刚创建的工作目录中（例如 `C:\OfficeTools`）。

### 3. 生成配置文件 (Configuration.xml)

我们将使用微软官方的 [Office 自定义工具](https://config.office.com/deploymentsettings) 在线生成配置文件，该文件将精确定义您要安装的 Office 版本和组件。

1.  **访问配置网站**: 打开 [config.office.com](https://config.office.com/deploymentsettings)。
2.  **选择架构**: 通常选择 `64位`。
3.  **选择办公套件**:
    - **零售版**: 选择 `Microsoft 365 企业应用版` (Microsoft 365 Apps for Enterprise)。
    - **批量版**: 选择 `Office LTSC Professional Plus 2024 - 批量许可证`。
4.  **选择应用**: 根据需要，取消勾选您不需要安装的应用程序（如 Access, Publisher）。您也可以在此处添加 Visio 或 Project。
5.  **选择更新通道和版本**:
    - 如果您希望安装后离线使用或分发，请在“版本”下拉菜单中选择一个**具体的版本号**，而不是“最新”。
6.  **选择语言**: 添加您需要的语言包，如“中文(简体)”。
7.  **导出配置**: 完成上述配置后，点击页面右上角的 `导出` 按钮。在弹出的窗口中，选择 `保留当前设置`，然后点击 `确定` 下载 `Configuration.xml` 文件。
8.  **移动文件**: 将下载的 `Configuration.xml` 文件移动到您的工作目录（例如 `C:\OfficeTools`）。

### 4. 执行安装

以管理员身份打开命令提示符 (CMD)，然后执行以下命令。

::: tabs
@tab 方案一：直接在线安装
此方法会直接从微软服务器下载并安装 Office。

```cmd
# 切换到工作目录
cd /d C:\OfficeTools

# 使用配置文件开始安装
setup.exe /configure Configuration.xml
```

@tab 方案二：先下载，后安装
此方法会将 Office 安装文件先下载到本地，便于离线安装或多次安装。

```cmd
# 切换到工作目录
cd /d C:\OfficeTools

# 步骤A：下载安装文件 (确保配置文件中已指定具体版本号)
setup.exe /download Configuration.xml

# 步骤B：开始安装 (从本地文件)
setup.exe /configure Configuration.xml
```
:::

## 官方帮助文档

- [Office 部署工具 (ODT) 概述](https://learn.microsoft.com/zh-cn/microsoft-365-apps/deploy/overview-office-deployment-tool)