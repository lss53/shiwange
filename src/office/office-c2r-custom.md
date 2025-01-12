---
title: Office C2R 自定义安装
# shortTitle: Office C2R Install
date: 2025-01-06
icon: fas fa-gear
order: 1
category:
  - Microsoft
  - Windows软件
tag:
  - Office
---

- Retail Office（例如 Microsoft 365）具有最新的功能更新，而 Volume Office（例如 ProPlus 2024）则没有。

- 请注意，在官方的 C2R office 自定义安装方法中，没有可用的 ISO 或任何一键式解决方案。以下是安装定制 office 的最简单方法。

## 自定义安装方法

- 如果之前安装过 Office，使用 Windows 设置中的`应用`选项卸载 Office。

- 新建文件夹 Office ，比如在C盘根目录 `C:\Office` 。

- 下载 [Office 部署工具](https://officecdn.microsoft.com/pr/wsus/setup.exe)（ODT）。

- 将下载的文件复制到你创建的 Office 文件夹，例如 `C:\Office\setup.exe` 。

- 打开 [config.office.com](https://config.office.com/deploymentsettings) 。

- 如果你想要 `零售版Office`，请在`办公套件`部分选择`Microsoft 365 应用企业版`。

- 如果你想要`大客户版Office`，也叫批量授权版，请在`办公套件`部分选择`Office LTSC Professional Plus 2024 - Volume License`（不要选择 SPLA 版本）。

- 你可以添加 Visio 和 Project 应用程序，但请确保已选择 [Project](https://learn.microsoft.com/projectonline/supported-languages-for-project-online)/[Visio](https://support.microsoft.com/office/display-languages-supported-in-the-visio-desktop-app-a921983e-fd5d-45ef-8af1-cedf70c53d75) 支持的语言。

- 如果你打算下载 Office 文件并在以后安装它们，请确保在`选择版本`选项中选择特定的版本号，而不是最新版本。

- 你只需将选项配置到`语言`部分。其余部分可以保留为默认值。

- 单击`导出`按钮，选择`保留当前设置`选项，将会下载一个名为`配置.xml`的文件，将其更改为Configuration.xml。

- 将下载的文件复制到你创建的 Office 文件夹，例如`C:\Office\Configuration.xml`。

::: tabs

@tab 直接安装

以管理员身份打开命令提示符（而不是 Powershell）并运行以下命令。

```cmd
cd /d C:\Office\
setup.exe /configure Configuration.xml
```

@tab 下载并安装

- 确保你已在上述步骤中选择了`特定的版本号`。

- 以管理员身份打开命令提示符（而不是 Powershell）并运行以下命令，下载 Office 文件。

```cmd
cd /d C:\Office\
setup.exe /download Configuration.xml
```

:::

## 帮助

官方教程：[Office 部署工具概述](https://learn.microsoft.com/zh-cn/microsoft-365-apps/deploy/overview-office-deployment-tool)
