---
title: "Proxifier 使用教程：为任意应用配置独立代理"
shortTitle: Proxifier 使用指南
date: 2024-11-24
icon: fa-solid fa-globe
order: 5
category:
  - Software
tag:
  - Proxifier
  - 代理
  - 网络工具
description: 一份详尽的 Proxifier 使用指南，从安装、注册到核心功能——配置代理服务器和设置代理规则，手把手教您如何强制让不支持代理或需要独立代理的应用程序（如游戏、特定软件）通过指定的 SOCKS5 或 HTTPS 代理服务器访问网络。
---

## 什么是 Proxifier？

[Proxifier](https://www.proxifier.com) 是一款功能强大的网络工具，它允许不支持通过代理服务器工作的网络应用程序通过 HTTPS 或 SOCKS 代理及代理链进行连接。其核心功能是**为单个或多个应用程序设置独立的代理规则**，实现精细化的流量控制。

::: tip 版本说明
Proxifier 在 Windows 平台分为**标准版 (Standard Edition)** 和**便携版 (Portable Edition)**，它们的注册码不通用。请确保使用与您版本匹配的注册码。
:::

## 步骤一：安装与注册

1.  从[官方网站](https://www.proxifier.com/download/)下载最新版本并安装。安装过程中可根据需要勾选开机启动、自动更新等选项。
2.  启动 Proxifier 后，会弹出注册提示。点击 `Enter Registration Key...`。
3.  在注册窗口中：
    *   **User Name**: 输入任意字符。
    *   **Registration Key**: 输入您获取的有效注册码。
4.  点击 `OK` 完成注册。

## 步骤二：配置代理服务器

此步骤的目的是让 Proxifier 知道您的代理服务器信息。

1.  点击菜单栏 **Profile** → **Proxy Servers...**。
2.  在弹出的窗口中点击 **Add...**。
3.  填写您的代理服务器信息：
    *   **Address**: 代理服务器的 IP 地址。如果您使用的是本地代理客户端（如 V2RayN, Clash），通常填写 `127.0.0.1`。
    *   **Port**: 代理服务器的端口号。例如，V2RayN 的默认 SOCKS 端口是 `10808`，HTTP 端口是 `10809`。
    *   **Protocol**: 选择您的代理协议，常用的有 `SOCKS Version 5` 或 `HTTPS`。
4.  (可选但推荐) 点击 **Check...** 按钮测试代理服务器是否连通。如果测试通过，会显示 `Proxy is ready to work`。
5.  点击 **OK** 保存。此时会弹出一个提示，询问是否将此代理设为默认，**建议选择“否 (No)”**，因为我们稍后将通过规则进行精细控制。

## 步骤三：配置代理规则 (核心)

这是 Proxifier 最强大的功能，您可以指定哪些应用程序走代理，哪些直连。

1.  点击菜单栏 **Profile** → **Proxification Rules...**。
2.  您会看到一个默认规则 `localhost`，其 `Action` 为 `Direct`，请保持此规则不动，以确保本地服务正常通信。
3.  点击 **Add...** 创建一条新规则。
4.  在弹出的窗口中进行配置：
    *   **Name**: 为规则取一个直观的名称，例如 `Telegram Proxy`。
    *   **Applications**:
        *   点击 **Browse...**，找到并选择您希望走代理的应用程序的可执行文件（`.exe`）。
        *   您可以添加多个应用程序，用分号 `;` 隔开。
    *   **Target hosts / Target ports**: 通常保持默认 `Any` 即可，除非您想对特定目标地址或端口进行代理。
    *   **Action**: 从下拉菜单中选择您在第二步中添加的代理服务器，例如 `Proxy SOCKS5 127.0.0.1`。
5.  点击 **OK** 保存规则。

### 规则的优先级

在规则列表中，**规则的顺序非常重要**。Proxifier 会从上到下匹配规则，一旦匹配成功，就不再继续向下查找。因此，您应该将**更具体、更优先的规则放在列表的上方**。

默认情况下，列表底部会有一条 `Default` 规则，其 `Action` 通常是 `Direct` (直连)。这意味着任何不匹配您自定义规则的应用程序，都将直接连接网络。您可以根据需要将其修改为走代理，实现“全局代理”的效果。

设置完成后，当您启动被规则指定的应用程序时，就可以在 Proxifier 的主界面 Connections 标签页中看到该程序的网络连接正在通过您设置的代理服务器进行。

---
::: info 资源下载
汉化包及其他相关资源，可从以下地址获取：
- **蓝奏云**: <https://wwqm.lanzouj.com/b00g2rh76h#424v> (密码: 424v)
- **阿里云盘**: <https://www.alipan.com/s/HgG5zdg1hyk>
:::