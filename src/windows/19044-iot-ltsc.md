---
title: 把LTSC 2021续命到2031年
date: 2025-04-20
icon: fa-brands fa-windows
order: 2
category:
  - Windows
tag:
  - LTSC
---

## Windows LTSC 与 IoT LTSC 版本对比

### 功能与支持差异
| 对比项        | LTSC 版本              | IoT LTSC 版本          |
|---------------|------------------------|------------------------|
| 功能组件      | 完全相同               | 完全相同               |
| 激活方式      | 仅限KMS38激活          | 支持OEM数字权利激活    |
| 支持周期      | 5年标准支持            | 10年长期支持           |
| 授权渠道      | 无零售/OEM通道         | 仅限OEM渠道            |

## IoT LTSC 中文支持方案

### 推荐方案（转换法）

1. 安装普通中文版LTSC

2. 执行版本转换：

```powershell
slmgr /ipk QPM6N-7J2WJ-P88HH-P3YRH-YY74H
```
> 还原密钥：M7XTQ-FN8P6-TTKYV-9D4CC-J462D

### 备选方案（语言包法）

1. 安装英文版 IoT LTSC
2. 添加中文语言包

## LTSC 2021 版已知问题及修复

### 已知问题

1. wsappx 进程高占用

2. 中文输入法候选框不显示

3. 共享打印机问题（修复：打补丁`KB5007253`）

### 问题1-2的修复步骤

1. 下载并解压我提供的依赖组件包<https://wwqm.lanzouu.com/b00g390a4j#5tw0>密码:5tw0

2. 集成方式

::: tabs

@tab 在线安装（立即生效）

```powershell
# 32位系统安装命令
Add-AppxPackage -Path "[依赖组件包的所在路径]\Microsoft.VCLibs.140.00_14.0.30704.0_x86__8wekyb3d8bbwe.Appx"

# 64位系统安装命令
Add-AppxPackage -Path "[依赖组件包的所在路径]\Microsoft.VCLibs.140.00_14.0.30704.0_x64__8wekyb3d8bbwe.Appx"
```
::: warning
- 路径需替换为实际文件位置
- 只需安装对应系统位宽的版本


@tab 离线集成（系统镜像封装）

**目录结构**

```bash
工作目录/
├── DISM10/            # DISM工具目录
│   └── Dism.exe       # 部署工具
├── install.wim        # 系统镜像文件  
└── mount-temp/        # 自动创建的挂载点
```

**批处理脚本**

```bat
@echo off
setlocal

:: 初始化配置
set "DISM=DISM10\Dism.exe"
set "APPX=Microsoft.VCLibs.140.00_14.0.30704.0_x64__8wekyb3d8bbwe.Appx"

:: 阶段1：环境准备
echo [1/7] 清理环境...
%DISM% /cleanup-mountpoints >nul 2>&1
if exist mount-temp rd /q /s mount-temp

:: 阶段2：挂载镜像  
echo [2/7] 创建挂载点...
md mount-temp
echo [3/7] 挂载镜像...
%DISM% /Mount-Image /ImageFile:install.wim /Index:1 /MountDir:mount-temp
if errorlevel 1 goto FAIL

:: 阶段3：集成组件
echo [4/7] 集成Appx包...
%DISM% /image:mount-temp /Add-ProvisionedAppxPackage ^
    /PackagePath:%APPX% /SkipLicense /Region:"all"

:: 阶段4：完成处理
echo [5/7] 提交更改...
%DISM% /unmount-image /mountdir:mount-temp /commit
if errorlevel 1 goto FAIL

echo [7/7] 操作成功完成！
pause
exit /b 0

:FAIL
echo [ERROR] 操作失败，正在回滚...
%DISM% /Unmount-Image /MountDir:mount-temp /Discard >nul 2>&1
rd /q /s mount-temp 2>nul
pause
exit /b 1
```
:::
