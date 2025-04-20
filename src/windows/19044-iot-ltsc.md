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

# Windows LTSC 与 IoT LTSC 版本对比

## 功能与支持差异
| 对比项        | LTSC 版本              | IoT LTSC 版本          |
|---------------|------------------------|------------------------|
| 功能组件      | 完全相同               | 完全相同               |
| 激活方式      | 仅限KMS38激活          | 支持OEM数字权利激活    |
| 支持周期      | 5年标准支持            | 10年长期支持           |
| 授权渠道      | 无零售/OEM通道         | 仅限OEM渠道            |



# IoT LTSC 中文支持方案

## 推荐方案（转换法）

1. 安装标准中文版LTSC

2. 执行版本转换：

   ```powershell
   slmgr /ipk QPM6N-7J2WJ-P88HH-P3YRH-YY74H
   ```
   > 还原密钥：M7XTQ-FN8P6-TTKYV-9D4CC-J462D

## 备选方案（语言包法）

1. 安装英文版 IoT LTSC
2. 手动添加中文语言包

# LTSC 2021 版已知问题及解决方案

## 1. wsappx 进程高占用

## 2. 中文输入法候选框不显示

### 修复步骤：

1. 访问 [RG-Adguard 应用商店离线包下载页](https://store.rg-adguard.net)
   - 第一栏：选择 `ProductId`
   - 第二栏：输入 `9wzdncrfjbmp`
   - 第三栏：保持 `RP` → 点击搜索按钮
   - 下载文件：  
     `Microsoft.VCLibs.140.00_14.0.30704.0_x64__8wekyb3d8bbwe.appx`（无需 x86 版本）

2. 集成方式
   - **在线安装（立即生效）**：

     ```powershell
     Add-AppxPackage -Path <文件路径>  
     # 示例：Add-AppxPackage -Path Microsoft.VCLibs...appx
     ```
     
   - **离线集成（系统镜像封装）**：

     ```bat
     set "DISM=DISM10\Dism.exe"
     %DISM% /Unmount-Image /MountDir:mount-temp /Discard
     %DISM% /Mount-Image /ImageFile:install.wim /Index:1 /MountDir:mount-temp
     %DISM% /image:mount-temp /Add-ProvisionedAppxPackage /PackagePath:Microsoft.VCLibs...Appx /SkipLicense /Region:"all"
     %DISM% /unmount-image /mountdir:mount-temp /commit
     pause
     ```

## 3. 打印机问题

- 打补丁 `KB5007253`