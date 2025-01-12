---
title: Chocolatey：一款 GitHub 上星标 10k+ 的 Windows 命令行软件管理器
shortTitle: Chocolatey
date: 2024-12-22
icon: fa-solid fa-toolbox
order: 6
category:
  - Software
tag:
  - Chocolatey
  - 系统软件
---

### 传统安装方式

在不晓得 [Chocolatey](#Chocolatey) 之前，我是这样安装软件和配置环境变量的：

按 `Windows 键 + E` 打开文件资源管理器，输入 `%HOMEPATH%` 回车打开用户名目录，新建路径为 `%HOMEPATH%\Me\bin\script` ，下载[Node.js的预构建二进制文件](https://nodejs.org/zh-cn/download/prebuilt-binaries)，如 `node-v22.12.0-win-x64.zip`，右键单击它，选择`用 WinRAR 打开`，把 `node-v22.12.0-win-x64` 文件夹拖到 `%HOMEPATH%\Me\bin\script` 里面。

点击任务栏上的搜索图标，输入`高级系统设置`按回车，在新窗口`系统属性`中点击`环境变量`，在`系统变量`下，找到变量`Path`，选择并单击`编辑`（提示：如果没有变量`Path`，请单击`新建`）。在新窗口`编辑环境变量`中点击`新建`，输入`%HOMEPATH%\Me\bin\script`并按`确定`。如果有cmd或shell终端（命令）窗口，请重新启动它们。

点击任务栏上的搜索图标，输入 `cmd` ，点击出现的选项`以管理员身份运行`，输入命令 `node -v` 按回车，显示 `v22.12.0` 表示配置成功。

传统的安装方式非常耗时且非常低效，用 `Chocolatey` 在命令窗口安装软件，一条命令搞定程序安装和配置环境变量。

### Chocolatey

1. 安装 Chocolatey

> The biggest challenge is reducing duplication of effort, so users turn to Chocolatey for simplicity
> - 官方地址：https://chocolatey.org/  
> - 安装文档：https://chocolatey.org/install#individual  

阅读官方安装文档，总结如下：

方法一，以管理员的身份打开 cmd 命令窗口：点击任务栏上的搜索图标，输入命令 `cmd` ，点击出现的选项 “以管理员身份运行” ，再执行下面的命令：

```bat
@"%SystemRoot%\System32\WindowsPowerShell\v1.0\powershell.exe" -NoProfile -InputFormat None -ExecutionPolicy Bypass -Command "[System.Net.ServicePointManager]::SecurityProtocol = 3072; iex ((New-Object System.Net.WebClient).DownloadString('https://community.chocolatey.org/install.ps1'))" && SET "PATH=%PATH%;%ALLUSERSPROFILE%\chocolatey\bin"
```

方法二，以管理员的身份打开 Windows PowerShell 命令窗口。右键点击开始菜单，选择 `Windows PowerShell(管理员)(A)` ，再执行下面的命令：

```bat
Set-ExecutionPolicy Bypass -Scope Process -Force; [System.Net.ServicePointManager]::SecurityProtocol = [System.Net.ServicePointManager]::SecurityProtocol -bor 3072; iex ((New-Object System.Net.WebClient).DownloadString('https://community.chocolatey.org/install.ps1'))
```

检验是否安装成功的方法：在相应的命令窗口，输入 `choco` ，回显如下就安装成功。

```
Chocolatey v2.4.1
Please run 'choco -?' or 'choco <command> -?' for help menu.

```

![安装Choco](./assets/ins-choco.png)

::: important

这几个非常高效的操作命令必须推荐：

- `choco search xxx`，查找 xxx 安装包
- `choco info xxx`，查看 xxx 安装包信息
- `choco install xxx`，安装 xxx 软件
- `choco upgrade xxx`，升级 xxx 软件
- `choco uninstall xxx`， 卸载 xxx 软件

:::

::: tip

Q: 如何知道 chocolatey 仓库中都有哪些安装包可用呢？
A: 可以通过上面提到的命令 `choco search xxx` ，也可以访问[官方仓库](https://community.chocolatey.org/packages)进行筛选。

:::
  
2. 安装 Node.js

安装 Node.js 最新的长期维护版（LTS） ：通过查找得知，安装命令是 `choco install nodejs-lts` 粘贴到命令行或 Windows PowerShell 命令窗口中，按回车执行。

3. 安装 Git

请从命令行或 PowerShell 运行以下命令：

```sh
choco install git
```
