---
title: NVS：一款 GitHub 上星标 2.8k+ 的 Node.js 版本控制软件
shortTitle: NVS
date: 2021-05-01
icon: fab fa-node-js
order: 3
category:
  - Windows 软件
tag:
  - NVS
---

NVS是一个跨平台的Node.js的版本切换软件，并且NVS本身是用 [**Node.js**](http://nodejs.org) 编写的。

这个软件显然是受到其他Node.js版本管理器软件的启发，特别是 [**nvm**](https://github.com/creationix/nvm) ，它借鉴了很多思想和一些命令行语法。

## Windows 安装

Windows 的 MSI 安装包可以从 [NVS releases page on GitHub](https://github.com/jasongin/nvs/releases) 这里获得。

::: info Windows 7 SP1 安装 NVS

Windows 7 SP1 需要安装 `PowerShell 3.0`， 打开 [Windows Management Framework 3.0](https://www.microsoft.com/en-us/download/details.aspx?id=34595)里有`PowerShell 3.0`，下载并安装其中的`Windows6.1-KB2506143-x64.exe`，重启电脑后再安装nvs。

:::

> 默认为当前用户安装：先勾选`I accept the terms in the License Agreement`，再左击`Install`按钮；可能要稍等一会儿才会出现`Finish`按钮。
> 也可以为所有用户安装：先勾选`I accept the terms in the License Agreement`，再左击「Advanced」按钮，勾选`Install for all users of this machine`，再左击两次`Next`按钮，一次`Install`按钮；可能要稍等一会儿才会出现`Finish`按钮。

以管理员的身份打开 cmd 命令窗口，执行命令 `nvs` 会开始自动下载 node-v12.18.2-win-x64.7z 。

```
C:\Users\Administrator>nvs
Downloading boostrap node from https://nodejs.org/dist/v12.18.2/node-v12.18.2-w
in-x64.7z

.----------------------------.
| Select a node version      |
+----------------------------+
| [a] node/16.10.0           |
|  b) node/16.9.1            |
|  c) node/16.9.0            |
|  d) node/16.8.0            |
|  e) node/16.7.0            |
|  f) node/16.6.2            |
|  g) node/16.6.1            |
|  h) node/16.6.0            |
|  i) node/16.5.0            |
|  j) node/16.4.2            |
|  k) node/16.4.1            |
|  l) node/16.4.0            |
|  m) node/16.3.0            |
|  n) node/16.2.0            |
|  o) node/16.1.0            |
'--\/------------------------'
Type a hotkey or use Down/Up arrows then Enter to choose an item.
```

键盘上按↓键，找到` [*] node/12.18.2 (Erbium)`按回车，开始解压node-v12.18.2-win-x64.7z。

```
Extracting  [###################################################] 100%
PATH += %LOCALAPPDATA%\nvs\node\12.18.2\x64
```

执行命令`nvs use lts`选择使用当前版本（v12.18.2）的 Node.js；命令也可以这样写`nvs use 12.18.2`。

执行命令`nvs link lts`添加默认的 Node.js 版本。

```
%LOCALAPPDATA%\nvs\default -> %LOCALAPPDATA%\nvs\node\12.18.2\x64
User profile PATH += %LOCALAPPDATA%\nvs\default
```

至此，Node.js就可以正常使用了。

::: info 也可以通过 [chocolatey](./chocolatey.md) 安装
  
```
choco install nvs
```

:::
  
## 基本用法

下载最新版本的 Node.js：

```
nvs add latest
```

下载lts版本的 Node.js：

```
nvs add lts
```

运行 `nvs use` 去选择 Node.js 的版本

```
nvs use lts
PATH += ~/.nvs/node/6.9.1/x64
```

使用 `nvs link` 添加默认的 Node.js 版本：

```
nvs link lts
```

## 命令介绍

命令 | 描述
------- | -----------
`nvs help <command>`             | 获取命令的详细帮助
`nvs install`                    | 初始化并使用 NVS
`nvs uninstall`                  | 从 profile 和 environment 中移除 NVS
`nvs --version`                  | 展示 NVS 版本
`nvs add [version]`              | 下载某个版本的 Node.js
`nvs rm <version>`               | 移除某个版本的 Node.js
`nvs migrate <fromver> [tover]`  | 迁移全局的node_modules
`nvs upgrade [fromver]`          | 更新当前环境的 Node.js 至最新版本
`nvs use [version]`              | 选择使用某个版本的 Node.js
`nvs auto [on/off]`              | 使用 cwd 自动切换
`nvs run <ver> <js> [args...]`   | 使用 Node.js 的某个版本的去执行 js 应用
`nvs exec <ver> <exe> [args...]` | 使用 Node.js 的某个版本的去执行 可执行文件
`nvs which [version]`            | 显示 Node.js 的某个版本的二进制文件的路径
`nvs ls [filter]`                | 展示本地下载的 Node.js 版本列表
`nvs ls-remote [filter]`         | 列出可下载的 Node.js 版本
`nvs lsr [filter]`               | 同上
`nvs link [version]`             | 设置一个软连接指向一个版本，作为默认使用的版本
`nvs unlink [version]`           | 删除指向默认版本的链接
`nvs alias [name] [value]`       | 给某个版本设置一个别名
`nvs remote [name] [value]`      | 设置下载node的仓库

上表的 `[version]` 和 `[filter]` 是用来描述版本的，有以下一些情况：

情况 | 例子
------- | -----------
完整的版本号   | 15.14.0、0.6.11
不完整版本号   | 14、15、8
标签          | lts, latest, Argon
远程安装仓库名  | node、node/15.12.0 。 如果使用 nvs remote 添加了远程仓库名为 taobao 那就可以使用 taobao、taobao/15.13.0
远程仓库名斜线后的部分 | lts, 4.6.0, 6/x86, node/6.7/x64

有关每个命令的更多详细信息，请[参阅文档](https://github.com/jasongin/nvs/blob/master/doc)。



