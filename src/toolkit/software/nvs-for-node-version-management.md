---
title: "NVS：一款优雅的跨平台 Node.js 版本管理器"
shortTitle: NVS Node.js 版本管理
date: 2021-05-01
icon: fa-brands fa-node-js
order: 1
category:
  - Software
tag:
  - NVS
  - Node.js
  - 版本管理
  - 开发工具
description: 介绍一款在 GitHub 上星标 2.8k+ 的 Node.js 版本控制软件——NVS。它跨平台、轻量级且易于使用，可以帮助开发者在同一台机器上轻松安装、切换和管理多个 Node.js 版本，是 nvm 的一个优秀替代品。
---

## 什么是 NVS？

**NVS (Node Version Switcher)** 是一款跨平台的 Node.js 版本管理工具，由 Microsoft 开发并开源。它借鉴了 `nvm` 的许多优秀设计，并提供了对 Windows 平台的原生支持，使得在不同操作系统上管理 Node.js 版本变得同样轻松便捷。

- **GitHub 项目**: [jasongin/nvs](https://github.com/jasongin/nvs)

## 安装

### Windows

- **MSI 安装包 (推荐)**:
  - 访问 [NVS GitHub Releases 页面](https://github.com/jasongin/nvs/releases) 下载最新的 `.msi` 安装包。
  - 双击运行并按照向导完成安装。安装程序会自动为您配置好环境变量。

- **通过 Chocolatey 安装**:
  ```powershell
  choco install nvs
  ```

### macOS / Linux

使用 `git` 克隆仓库并运行安装脚本：

```bash
git clone https://github.com/jasongin/nvs ~/.nvs
~/.nvs/nvs.sh install
```
安装脚本会将必要的配置写入您的 shell 配置文件 (`.bashrc`, `.zshrc` 等)。请重启您的终端或执行 `source` 命令使配置生效。

## 常用命令

NVS 的命令语法简洁直观，以下是几个核心命令：

#### 1. `nvs add [version]` - 安装 Node.js 版本

```bash
# 安装最新的 LTS (长期支持) 版本
nvs add lts

# 安装最新的稳定版本
nvs add latest

# 安装指定的版本号
nvs add 18.17.1

# 安装 16.x 系列的最新版本
nvs add 16
```

#### 2. `nvs use [version]` - 在当前 Shell 中切换版本

此命令只在当前终端会话中生效，关闭后将恢复为默认版本。

```bash
# 切换到 LTS 版本
nvs use lts

# 切换到 18.17.1 版本
nvs use 18.17.1
```

#### 3. `nvs link [version]` - 设置全局默认版本

使用 `link` 命令可以将指定版本设置为系统的默认 Node.js 版本。

```bash
# 将 LTS 版本设为默认
nvs link lts

# 之后，在任何新打开的终端中，node -v 都会显示 LTS 版本
```

#### 4. `nvs ls` 和 `nvs ls-remote` - 查看版本

```bash
# 查看本地已安装的所有 Node.js 版本
nvs ls

# 查看所有可供远程安装的版本
nvs ls-remote

# 查看远程可用的 18.x 系列版本
nvs ls-remote 18
```

#### 5. `nvs rm <version>` - 卸载版本

```bash
# 卸载 18.17.1 版本
nvs rm 18.17.1
```

## 命令速查表

| 命令                       | 描述                                       |
| -------------------------- | ------------------------------------------ |
| `nvs help <command>`       | 获取某个命令的详细帮助                     |
| `nvs add [version]`        | 下载并安装一个 Node.js 版本                |
| `nvs rm <version>`         | 卸载一个本地已安装的版本                   |
| `nvs use [version]`        | 在当前终端会话中使用指定版本               |
| `nvs link [version]`       | 将指定版本设为全局默认版本                 |
| `nvs unlink`               | 取消全局默认版本链接                       |
| `nvs ls`                   | 列出本地已安装的版本                       |
| `nvs ls-remote [filter]`   | 列出所有可供远程安装的版本                 |
| `nvs which [version]`      | 显示指定版本 `node.exe` 的路径           |
| `nvs run <ver> <script>`   | 使用指定版本运行一个 JS 脚本               |

通过 NVS，您可以轻松地为不同项目维护独立的 Node.js 环境，告别版本冲突的烦恼。