---
title: Total Commander 配置与更新
shortTitle: TC 配置与更新
date: 2026-05-10
icon: fa-regular fa-folder-open
order: 12
category:
  - 软件工具
tag:
  - Total Commander
  - TC
  - 文件管理器
  - 配置
  - 更新
description: Total Commander 顶部菜单栏与工具栏配置方法，以及从 11.03 升级到 11.57 的更新文件清单等。
---
本文以研究**飞扬时空定制版**为例，记录学习过程。

## 一、定义顶部菜单栏

**相关文件目录：** `TotalCMD64\Language`

| 文件 | 用途 |
|------|------|
| `wcmd_chn.ini` | 仅在使用「简体中文」语言时加载的自定义命令文件，内部只存储 `em_` 开头的自定义命令 |
| `Wcmd_chn.mnu` | 定义顶部菜单栏包含哪些菜单项、层级结构、显示文字以及关联的命令 |

**关键说明：**

- `Wcmd_chn.mnu` 中的 `STARTMENU`：仅在主菜单栏上绘制一个名为「开始」的按钮。点击后，TC 会收到指令去读取动态数据源。
- `wincmd.ini` 中的 `[User]` 段就是 TC 读取的动态数据源——你添加的文件夹、程序等都存储在此处：

```ini
[USER]
RedirectSection=%COMMANDER_PATH%\User\User.ini
```

- `Wcmd_chn.mnu` 中的 `HELP_BREAK`：其作用是使之后的菜单项在菜单栏上**右侧对齐**。

---

## 二、定义顶部工具栏

**修改项：** `Default.bar` 中的字段

- 原值：`cmd42=openbar %Commander_path%\No.bar`
- 改为：`cmd42=em_removebar`（否则命令无效）

**常用文件夹菜单（Ctrl+D）：**

- 数据保存在 `%COMMANDER_PATH%\User\User.ini`
- `wincmd.ini` 中通过 `RedirectSection` 指向该文件：

```ini
[Associations]
RedirectSection=%COMMANDER_PATH%\User\User.ini
```

**添加浏览器 Zen 到工具栏：**

1. 将 `zen.exe` 直接拖动到工具栏上的合适位置
2. 修改对应的 `buttonxx=` 和 `cmdxx=`，路径设置为：
   - `%SYSTEMDRIVE%\myapp\zen\core\zen.exe`
   - 或 `%HOMEDRIVE%\myapp\zen\core\zen.exe`

---

## 三、更新

### 1. 下载地址

**64-bit version only：**

访问 [https://www.ghisler.com/download.htm](https://www.ghisler.com/download.htm) → 选择「64-bit version only」

（直接链接通常为：`https://totalcommander.ch/1157/tcmd1157x64.exe`）

### 2. 从 11.03 升级到 11.57 需替换/新增的文件

| 文件 |
|------|
| `LANGUAGE\WCMD_CHN.INC` |
| `LANGUAGE\WCMD_CHN.LNG` |
| `BLAKEX64.DLL` |
| `DESCRIPT.ION` |
| `HISTORY.TXT` |
| `TC7Z.SFX` |
| `TC7Z64.DLL` |
| `TCBIT7Z64.DLL` |
| `TCLZMA64.DLL` |
| `TCMADM64.EXE` |
| `TCSHA64.DLL` |
| `TCshareWin10x64.dll` |
| `TCUNZL64.DLL` |
| `TCZSTD64.DLL` |
| `Totalcmd.chm` |
| `TOTALCMD.INC` |
| `TOTALCMD64.EXE` |
| `UNRAR64.DLL` |
| `WCMICON2.DLL` |
| `WCMICONS.INC` |
| `wincmd.key` |

## 四、TC高级定制版

https://wwbcy.lanzouu.com/b00g471bof ，密码:16vj

