---
title: "NVS：一款优雅的跨平台 Node.js 版本管理器"
shortTitle: NVS Node.js 版本管理
date: 2021-05-01
icon: fa-brands fa-node-js
order: 1
category:
  - Windows 软件
tag:
  - NVS
  - Node.js
  - 版本管理
  - 开发工具
description: NVS (Node Version Switcher) 是一款受 nvm 启发的跨平台 Node.js 版本管理工具。本文详细介绍了在 Windows 系统上通过 MSI 安装包或 Chocolatey 安装 NVS 的方法，以及如何使用其核心命令来添加、切换和管理不同的 Node.js 版本。
---

## NVS 简介

**NVS (Node Version Switcher)** 是一款跨平台的 Node.js 版本管理工具，它本身也是用 Node.js 编写的。它的设计受到了 [nvm (Node Version Manager)](https://github.com/creationix/nvm) 的启发，并借鉴了许多相似的命令和语法，旨在提供一个在 Windows、macOS 和 Linux 上表现一致的版本切换体验。

## Windows 系统安装

### 方式一：使用 MSI 安装包 (推荐)

1.  **下载安装包**: 从 [NVS GitHub Releases 页面](https://github.com/jasongin/nvs/releases) 下载最新的 `.msi` 安装文件。
2.  **执行安装**:
    - 双击运行 `.msi` 文件。
    - 勾选同意许可协议，点击 `Install` 进行标准安装（为当前用户）。
    - 或者，点击 `Advanced` → 勾选 `Install for all users of this machine`，为计算机上的所有用户安装。
3.  **初始化**: 安装完成后，以**管理员身份**打开命令提示符 (CMD)，首次运行 `nvs` 命令。此时 NVS 会自动下载一个用于引导的 Node.js 版本。

::: tip Windows 7 用户注意
Windows 7 SP1 用户需要先安装 [Windows Management Framework 3.0](https://www.microsoft.com/en-us/download/details.aspx?id=34595) (包含 PowerShell 3.0) 才能正常安装和使用 NVS。
:::

### 方式二：使用 Chocolatey 包管理器

如果您已经安装了 [Chocolatey](./windows-package-manager-chocolatey.md)，只需一条命令即可完成安装：

```powershell
choco install nvs
```

## 核心用法

### 1. 添加 Node.js 版本
```bash
# 添加最新的 LTS (长期支持) 版本
nvs add lts

# 添加最新的 Current (当前) 版本
nvs add latest

# 添加指定版本
nvs add 18.17.0
```

### 2. 切换当前使用的版本
该命令会临时将指定版本的 Node.js 添加到当前终端的 `PATH` 环境变量中。
```bash
# 切换到 lts 版本
nvs use lts

# 验证版本
node -v
```

### 3. 设置默认版本
使用 `link` 命令可以将某个版本设置为全局默认版本，这样新打开的终端窗口都会自动使用该版本。
```bash
# 将 lts 版本设置为默认
nvs link lts

# 也可以指定版本号
nvs link 18.17.0
```

### 4. 查看已安装和可用的版本
```bash
# 查看本地已安装的版本
nvs ls

# 查看所有可供下载的远程版本
nvs ls-remote
```

## 常用命令参考

| 命令 | 描述 |
| :--- | :--- |
| `nvs add <version>` | 下载并安装一个指定版本的 Node.js。 |
| `nvs use <version>` | 在当前终端会话中切换到指定版本。 |
| `nvs link [version]` | 将指定版本设置为全局默认版本。 |
| `nvs rm <version>` | 移除一个本地已安装的版本。 |
| `nvs ls` | 列出所有本地已安装的版本。 |
| `nvs ls-remote [filter]` | 列出所有可供下载的远程版本，可带筛选条件。 |
| `nvs which [version]` | 显示指定版本 `node.exe` 的完整路径。 |
| `nvs remote [name] [url]` | 添加或查看下载源，可用于切换到国内镜像。 |

上表中的 `<version>` 可以是多种格式，如：
- **完整版本号**: `18.17.1`
- **主版本号**: `18`
- **别名**: `lts`, `latest`

更多详细用法，请参阅[官方文档](https://github.com/jasongin/nvs/blob/master/doc)。