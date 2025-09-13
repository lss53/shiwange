---
title: 微信视频号下载工具推荐
shortTitle: 微信视频号下载
date: 2024-10-25
icon: fa-solid fa-cloud-arrow-down
order: 4
category:
  - Windows 软件
tag:
  - 微信视频号
  - 下载工具
  - 开源
description: 本文为您推荐并介绍多款在 GitHub 上广受欢迎的微信视频号下载工具，如 res-downloader, wechatVideoDownload 等。这些工具通过网络嗅探技术，帮助用户轻松下载视频号中的视频和直播回放。
---

## 1. res-downloader (推荐)

**GitHub 地址**: [https://github.com/putyy/res-downloader](https://github.com/putyy/res-downloader)

这是一款功能强大的网络资源下载工具，不仅支持微信视频号，还支持小程序、抖音、快手、小红书、直播流等多种常见网络资源。

### 使用方法

1.  **安装与授权**: 首次安装时，**必须同意安装证书文件**，并允许软件的网络访问权限。
2.  **启动与配置**:
    - 以管理员身份运行 `res-downloader`。
    - 在软件首页选择您要抓取的资源类型（例如“视频”）。
    - (建议) 进入`系统设置`，设置好视频的`保存目录`，并关闭`全量拦截`以避免不必要的干扰。
3.  **开始抓取**: 返回首页，点击 `开启抓取`。之后，在微信 PC 端打开并播放视频号视频，软件列表中就会出现已拦截到的视频资源，点击下载即可。

## 2. wechatVideoDownload

**GitHub 地址**: [https://github.com/qiye45/wechatVideoDownload](https://github.com/qiye45/wechatVideoDownload)

这是一款专门为微信视频号设计的下载工具，支持视频、直播及直播回放的下载，并能自动监听和获取下载链接。

### 使用方法

1.  **启动监听**: 打开软件后，首先点击 `开始监听` 按钮。
2.  **播放视频**: 在微信 PC 端打开视频号，软件会自动捕获正在播放的视频信息。
3.  **下载视频**:
    - **自动下载**: 勾选“自动下载视频”选项，软件会直接将捕获到的视频保存到本地。
    - **手动下载**: 在软件列表中点击 `复制链接`，使用任意下载工具（如 IDM、FDM）下载。下载后的文件是加密的，需要再通过软件的 `解密` 功能选择该文件进行解密。

::: tip 显示视频标题 (可选)
如果需要显示视频标题，可以点击软件的“开启标题显示”按钮，并根据提示安装其提供的证书文件。
:::

## 3. wx_channels_download

**GitHub 地址**: [https://github.com/ltaoo/wx_channels_download](https://github.com/ltaoo/wx_channels_download)

这款工具体积小巧，使用简单，同时支持 macOS 和 Windows 系统。

### 使用方法

1.  **下载并运行**: 从 [Releases 页面](https://github.com/ltaoo/wx_channels_download/releases) 下载适用于您系统的二进制文件，并以管理员身份运行。首次运行会自动安装证书并启动监听服务。
2.  **触发下载**: 启动服务后，打开微信 PC 端的视频号。在视频播放界面的下方操作栏中，会出现一个新的 `下载视频` 按钮（可能隐藏在“更多”菜单里）。
3.  **点击下载**: 播放视频后，点击该下载按钮即可将当前视频保存到本地。工具支持选择不同清晰度的视频进行下载。

## 4. WechatVideoSniffer

**GitHub 地址**: [https://github.com/kanadeblisst00/WechatVideoSniffer](https://github.com/kanadeblisst00/WechatVideoSniffer)

一款专注于嗅探微信视频号 PC 版视频地址的轻量级工具。

### 使用方法

1.  **运行环境**: 较旧的 Windows 系统可能需要先安装 `Microsoft Edge WebView2 Runtime`。
2.  **操作顺序**:
    - **先不要打开微信**。
    - 首先打开 `WechatVideoSniffer` 软件。
    - (建议) 点击菜单 → `删除缓存`，清空旧的记录。
    - 点击菜单 → `启动监听`。
    - 此时再打开微信 PC 端并播放视频号视频，软件界面上就会显示拦截到的视频信息。