---
title: "Chocolatey：Windows 上的 Homebrew，命令行软件管理神器"
shortTitle: Chocolatey 使用指南
date: 2024-12-22
icon: fa-solid fa-mug-hot
order: 6
category:
  - Software
tag:
  - Chocolatey
  - Windows
  - 命令行
  - 软件包管理器
description: 厌倦了在 Windows 上手动下载、安装、更新软件和配置环境变量的繁琐过程吗？本指南将向您介绍 Chocolatey，一款强大的命令行软件包管理器（就像 macOS 上的 Homebrew），让您能够通过简单的命令实现软件的自动化安装、升级和卸载。
---

## 为什么需要 Chocolatey？

在传统的 Windows 工作流中，安装一个软件（如 Node.js）通常需要：
1.  打开浏览器，搜索官网。
2.  找到下载页面，选择正确的版本和架构。
3.  下载 `.exe` 或 `.zip` 文件。
4.  运行安装程序，不断点击“下一步”。
5.  手动配置系统环境变量 (`PATH`)。
6.  重启终端使其生效。

这个过程繁琐、重复且效率低下。**Chocolatey** 将这一切简化为一条命令。

## 安装 Chocolatey

安装 Chocolatey 需要使用管理员权限的命令行环境。

- **官方网站**: [https://chocolatey.org/](https://chocolatey.org/)
- **安装文档**: [https://chocolatey.org/install](https://chocolatey.org/install)

### 安装步骤

1.  **以管理员身份打开 PowerShell**:
    *   右键点击“开始”菜单。
    *   选择 **Windows PowerShell (管理员)** 或 **终端 (管理员)**。

2.  **执行安装命令**:
    复制并粘贴以下命令到 PowerShell 窗口中，然后按 Enter 键。

    ```powershell
    Set-ExecutionPolicy Bypass -Scope Process -Force; [System.Net.ServicePointManager]::SecurityProtocol = [System.Net.ServicePointManager]::SecurityProtocol -bor 3072; iex ((New-Object System.Net.WebClient).DownloadString('https://community.chocolatey.org/install.ps1'))
    ```
    该命令会自动下载并执行安装脚本。

3.  **验证安装**:
    安装完成后，在**新的**管理员 PowerShell 窗口中输入 `choco` 或 `choco -v`。如果看到版本号输出，说明 Chocolatey 已成功安装。

    ![安装 Chocolatey](https://docs.chocolatey.org/en-us/choco-install.gif)

## 核心命令

掌握以下几个核心命令，您就可以高效地管理您的软件了。

- **`choco search <keyword>`**: 搜索软件包
  ```powershell
  # 搜索和 nodejs 相关的包
  choco search nodejs
  ```

- **`choco install <package_name>`**: 安装软件
  ```powershell
  # 安装 Node.js 的 LTS 版本
  choco install nodejs-lts
  
  # 安装 Git，并接受所有许可提示
  choco install git -y
  
  # 同时安装多个软件
  choco install vscode 7zip everything -y
  ```

- **`choco upgrade <package_name>`**: 升级软件
  ```powershell
  # 升级指定的软件包
  choco upgrade git
  
  # 升级所有已安装的软件包
  choco upgrade all -y
  ```

- **`choco uninstall <package_name>`**: 卸载软件
  ```powershell
  # 卸载 7zip
  choco uninstall 7zip
  ```

- **`choco list -li`**: 查看已安装的软件包
  ```powershell
  # -l 表示本地 (local), -i 表示包含版本信息
  choco list -li
  ```

::: tip 查找可用软件包
除了使用 `choco search` 命令，您还可以直接访问 [Chocolatey 官方社区仓库](https://community.chocolatey.org/packages) 来浏览和筛选所有可用的软件包。
:::

通过 Chocolatey，您可以轻松构建一个可复现、自动化的开发环境，告别“下一步”的点击疲劳。