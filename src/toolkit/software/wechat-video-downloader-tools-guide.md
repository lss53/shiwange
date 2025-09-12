---
title: "四款热门微信视频号下载工具横评与使用指南"
shortTitle: 微信视频号下载工具
date: 2024-10-25
icon: fa-brands fa-weixin
order: 4
category:
  - Software
tag:
  - 微信视频号
  - 下载工具
  - 开源
description: 本文精选并评测了四款在 GitHub 上广受欢迎的微信视频号下载工具：res-downloader, wechatVideoDownload, wx_channels_download 和 WechatVideoSniffer。指南详细介绍了它们各自的特点和具体使用方法，帮助您轻松下载视频号中的视频和直播内容。
---

## 前言

随着微信视频号内容的日益丰富，下载和保存喜爱视频的需求也随之增加。本文将介绍四款优秀的开源工具，它们可以帮助您轻松获取微信 PC 端的视频号资源。

## 1. res-downloader (全能型资源嗅探器)

- **GitHub 项目**: [putyy/res-downloader](https://github.com/putyy/res-downloader) (7k+ Stars)
- **特点**: 功能强大，不仅支持视频号，还支持小程序、抖音、快手、直播流、QQ音乐等多种网络资源。界面直观，易于上手。
- **适用平台**: Windows

### 使用方法

1.  下载并安装软件。**安装过程中务必同意安装证书并允许所有网络访问**。
2.  **首次使用请以管理员身份运行**。
3.  在软件首页，选择要抓取的资源类型（如 `视频`）。
4.  (建议) 进入 `系统设置`，设定好视频的 `保存目录`，并**关闭 `全量拦截`** 以免抓取到不相关的缓存文件。
5.  返回首页，点击 **开启抓取**。
6.  此时打开微信 PC 端，播放任何视频号视频，软件列表中就会自动出现已拦截到的资源，点击下载即可。

## 2. wechatVideoDownload (专注视频与直播)

- **GitHub 项目**: [qiye45/wechatVideoDownload](https://github.com/qiye45/wechatVideoDownload)
- **特点**: 专门针对微信视频号设计，支持视频、直播及直播回放的下载。提供自动监听和手动解密两种模式。
- **适用平台**: Windows

### 使用方法

1.  打开软件，点击 **开始监听**。
2.  在微信 PC 端正常浏览视频号内容。
3.  **下载视频**:
    *   **自动下载**: 在软件中勾选 `自动下载视频`，播放过的视频会自动保存。
    *   **手动下载**: 在列表中右键点击目标视频，选择 `复制链接`，使用任意下载工具下载后，再使用软件的 `解密` 功能处理已下载的文件。
4.  **(可选) 显示标题**: 点击 `开启标题显示`，并根据提示安装 `mitm` 证书，重启软件后即可在列表中看到视频标题。

::: info
该作者还开发了 [wechatDownload](https://github.com/qiye45/wechatDownload)，一款强大的公众号文章批量下载工具。
:::

## 3. wx_channels_download (简洁易用)

- **GitHub 项目**: [ltaoo/wx_channels_download](https://github.com/ltaoo/wx_channels_download)
- **特点**: 体积小巧，使用极为简单，通过在视频播放界面增加一个下载按钮来实现功能。
- **适用平台**: Windows, macOS

### 使用方法

1.  从 [Releases 页面](https://github.com/ltaoo/wx_channels_download/releases) 下载对应系统的可执行文件。
2.  **以管理员身份运行**，程序会自动安装证书并启动监听服务。
3.  打开微信 PC 端，播放一个视频号视频。
4.  在视频下方的操作栏中，会**多出一个“下载”按钮** (如果没有，请在“更多”里查找)。
5.  点击下载按钮，即可选择不同清晰度进行下载。

## 4. WechatVideoSniffer (经典嗅探器)

- **GitHub 项目**: [kanadeblisst00/WechatVideoSniffer](https://github.com/kanadeblisst00/WechatVideoSniffer)
- **特点**: 一款经典的视频地址嗅探工具，工作原理稳定可靠。
- **适用平台**: Windows

### 使用方法

1.  **重要**: **先完全退出微信 PC 端**。
2.  打开 WechatVideoSniffer 软件。
3.  点击菜单栏 → **删除缓存**，确保一个干净的开始。
4.  点击菜单栏 → **启动监听**。
5.  现在，重新启动微信并播放视频号视频。软件界面上会自动列出嗅探到的视频地址，右键即可下载。