---
title: 使用 Office 部署工具 (ODT) 自定义安装 Office C2R
shortTitle: Office C2R 自定义安装
date: 2025-01-06
icon: fa-brands fa-microsoft
order: 1
category:
  - Office
tag:
  - Microsoft 365
  - Office
  - ODT
description: 本指南详细介绍了如何使用微软官方的 Office 部署工具（ODT）和 Office 自定义工具（OCT）在线生成配置文件，以实现对 Office Click-to-Run (C2R) 版本的精细化、自定义安装，适用于 Microsoft 365 和 Office LTSC 2024 等产品。
---

## 概述

微软官方提供了 **Office 部署工具 (ODT)**，允许高级用户和管理员对 Office Click-to-Run (C2R) 的安装过程进行完全自定义，包括选择安装哪些应用、语言、更新通道以及版本等。本教程将引导您完成这一过程。

::: info 版本说明
- **零售版 (Retail)**: 如 Microsoft 365，包含最新的功能更新。
- **批量许可版 (Volume)**: 如 Office LTSC 2024，功能更新较少，更侧重稳定性。
:::

## 步骤一：准备部署文件

1.  **卸载旧版 Office**: 如果您的电脑上已安装任何版本的 Office，请先通过 Windows 设置中的“应用和功能”将其完全卸载。

2.  **创建工作目录**: 在您的电脑上创建一个专门的文件夹用于存放部署文件，例如 `C:\OfficeDeploy`。

3.  **下载 Office 部署工具 (ODT)**:
    - [点击此处下载 ODT (setup.exe)](https://officecdn.microsoft.com/pr/wsus/setup.exe)
    - 将下载的 `setup.exe` 文件移动到您创建的工作目录中（如 `C:\OfficeDeploy\setup.exe`）。

## 步骤二：生成自定义配置文件

我们将使用微软官方的 **Office 自定义工具 (OCT)** 在线生成一个 `Configuration.xml` 文件，该文件会告诉 ODT 如何安装 Office。

1.  **访问 OCT 网页**: [config.office.com/deploymentsettings](https://config.office.com/deploymentsettings)

2.  **配置安装选项**:
    *   **体系结构**: 除非有特殊需求，否则请选择 **64 位**。
    *   **办公套件**:
        *   若要安装**零售版**，选择 `Microsoft 365 企业应用版`。
        *   若要安装**批量许可版**，选择 `Office LTSC Professional Plus 2024 - Volume License`。
    *   **Visio / Project**: 如果需要，可以在下方添加 Visio 或 Project。
    *   **应用程序**: 按需勾选您想要安装的 Office 应用（如 Word, Excel, PowerPoint），取消勾选不需要的（如 Access, Publisher）。
    *   **更新通道**: 保持默认或根据需求选择。
    *   **版本**: 建议选择**最新**。如果您需要下载离线安装包，请选择一个**具体的版本号**。
    *   **语言**: 选择**主要语言**为 `简体中文 (中国)`。

3.  **导出配置文件**:
    *   完成上述配置后，点击页面右上角的 **导出** 按钮。
    *   在弹出的窗口中，选择 **保留当前设置**，并接受许可协议。
    *   点击 **导出**，浏览器将下载一个名为 `Configuration.xml` 的文件。

4.  **移动配置文件**: 将下载的 `Configuration.xml` 文件也移动到您的工作目录中（如 `C:\OfficeDeploy\Configuration.xml`）。

## 步骤三：执行安装

打开**命令提示符 (管理员)**，然后执行相应命令。

::: tip
请勿使用 PowerShell，因为它与 ODT 的某些命令行语法可能不完全兼容。
:::

### 方法一：在线直接安装

此方法会直接从微软服务器下载并安装 Office。

```cmd
:: 切换到您的工作目录
cd /d C:\OfficeDeploy

:: 开始配置安装
setup.exe /configure Configuration.xml
```

### 方法二：先下载后安装（离线安装）

此方法先将 Office 安装文件下载到本地，之后可以用于在多台电脑上或无网络环境下进行安装。

```cmd
:: 1. 切换到您的工作目录
cd /d C:\OfficeDeploy

:: 2. 下载 Office 安装文件
:: (请确保您在第二步中选择了具体的版本号)
setup.exe /download Configuration.xml

:: 3. 下载完成后，执行安装
setup.exe /configure Configuration.xml
```

安装过程会在后台静默进行，完成后您就可以在开始菜单中找到 Office 应用程序了。

## 参考资料

- **官方文档**: [Office 部署工具概述](https://learn.microsoft.com/zh-cn/microsoft-365-apps/deploy/overview-office-deployment-tool)
- **示例配置文件**: [Microsoft 365 企业应用版 (64位, 简体中文, 常用组件)](https://wwqm.lanzouu.com/b00g390j5e#frwh) (密码: frwh)