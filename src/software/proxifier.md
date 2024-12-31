---
title: Proxifier：一款可以为每个应用程序设置专属代理的神器，渗透必备！
shortTitle: Proxifier
icon: globe
date: 2024-11-24
category:
  - 电脑软件
tag:
  - Proxifier
---

[Proxifier](https://www.proxifier.com) 可以让不支持通过代理服务器工作的网络程序能通过 SOCKS 或 HTTPS 代理或代理链。强烈建议尽可能使用[最新版本](https://www.proxifier.com/download)。

::: info
在 Windows 系统中有 `Proxifier Standard Edition` (标准版即安装版)和 `Proxifier Portable Editio` (便携版即免安装版)，因此不要混淆`标准版注册码`和`便携版注册码`。
:::

### 安装

安装时，按需勾选`Start Proxifier automatically on Windows startup`(开机启动)、`Check for product updates on Proxifier startup
`(自动检查更新)和`Create a desktop shortcut
`(创建快捷方式)。最后点`Finish`启动Proxifier。

### 注册

点`Enter Registration Key...`进入注册界面，`Your name or company name`(用户名)下面输入任意字符，`Your registration key`(注册码)下面输入`standard`(标准版)注册码，`Current user only`(当前用户)和`All users on this computer(require administrator)`(所有用户)按需选择，之后点击OK，出现：

```txt
Thank you for choosing Proxifier!  
Program is successfully registered.
```

表示注册成功，点`确定`。

### 配置代理服务器

目的是配置 Proxifier 连上代理服务器。

点菜单栏`Profile`(配置文件)中的`Proxy Servers`(代理服务器)，在弹出的 Proxy Servers 窗口中点`Add`(添加)，在弹出的`Proxy Server`窗口中的服务器`Address`(地址)后面输入`127.0.0.1`(本地代理服务)、`Port`(端口)后面输入`代理服务器的端口`，`Protocol`(协议)选中`SOCKS Version 5`，点`Check`。

::: info
问：代理服务器的端口在哪里找？  
答：打开代理软件v2rayN，左下角找到`本地:[socks:10808]| [http:10809]`，`10808`就是端口。
:::

弹窗 Proxy Checker 中出现：`Test passed`(测试已通过) 和 `Proxy is ready to work with Proxifier!`(代理可以在 Proxifer 中工作!)，表示代理可用，点OK。

在弹窗 Proxy Server 中点 OK。出现 `Proxifier` 选择窗口，提示如下：

::: info
Do you want Proxifier to use this proxy by default?  
您希望 Proxifier 默认使用该代理吗？  
You can change this later at Profile->Proxification Rules  
您可以稍后在`配置文件`->`代理规则`中进行更改。
:::

选择`否`，再点 OK ，出现 `Proxifier` 选择窗口，提示如下：

::: info
You do not have any proxy servers enabled in Profile->Proxification Rules.  
您没有在`配置文件`->`代理规则`中启用任何代理服务器。  
Do you want to edit Proxifcation Rules now?  
现在要编辑`代理规则`吗？
:::

选择`否`。


### 配置代理规则

目的是让指定程序强制走代理服务器。

菜单栏`Profile`(配置文件)中的`Proxification Rules`(代理规则)，在弹出的 Proxification Rules 窗口中点`Add`(添加)，在弹出的`Proxification Rule`窗口中`Name`(名称)后面输入`Mangayomi`、`Applications`(应用程序)处点`Browse`(浏览)，选择应用程序`Mangayomi`的路径，`Action`(动作)处，选择`Proxy SOCKS5 127.0.0.1`，点OK。关闭窗口`Proxification Rules`。

### Profile 汉化包等下载

::: info
https://wwqm.lanzouj.com/b00g2rh76h 密码:424v  
https://www.alipan.com/s/HgG5zdg1hyk
:::

