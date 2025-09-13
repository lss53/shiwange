---
title: 微信公众号双封面图自动化制作指南
shortTitle: 微信双封面制作
date: 2025-06-11
icon: fa-brands fa-weixin
order: 5
category:
  - 自动化脚本
tag:
  - 微信公众号
  - 封面图
  - AI作图
  - PowerPoint
  - VBA
description: 本指南介绍了一种利用 AI 图像生成与 PowerPoint VBA 宏自动化制作微信公众号双封面的高效方法，涵盖 AI 指令模板、PPT 宏安装与使用全流程，助你轻松创建适配不同场景的精美封面。
---

## 文档概述

本技术文档详细介绍了一套利用 AI 图像生成和 PowerPoint 宏自动化技术，制作微信公众号推文双封面的全流程解决方案。该方案旨在高效生成`1283×383`像素的最终封面图，该尺寸能完美适配公众号文章内嵌（`900×383`）和外部自分享卡片（`383×383`）两种展示场景。

## 一、AI 图像生成流程

### 1. 图像生成指令模板

使用以下模板，您可以在支持图像生成的 AI 平台（如 DeepSeek, Coze, DALL-E 等）快速生成符合要求的两张关联图片。

```txt
你是一个图像生成助手，请根据我的简单描述，想象并详细描述两幅关联主图和缩略图，再将你的详细描述翻译成英文，并插入到以下链接的{prompt}部分：
![cover-wide-image]https://image.pollinations.ai/prompt/{prompt}?width=900&height=383&enhance=true&private=true
![cover-square-image]https://image.pollinations.ai/prompt/{prompt}?width=383&height=383&enhance=true&private=true
描述：[在此输入场景描述]
```

### 2. 操作步骤

1.  **准备指令**：在 AI 平台粘贴上述模板，并将 `[在此输入场景描述]` 替换为您的具体创意，例如：“未来科技实验室场景，全息操作界面悬浮空中，机械臂正在处理发光的DNA链，冷蓝色调”。
2.  **获取链接**：AI 将返回填充好英文 `prompt` 的两个 Markdown 图片链接。
3.  **下载图片**：在浏览器中分别打开这两个链接，将图片下载并命名：
    *   `900×383` 尺寸的图片保存为 `cover-wide.jpg`。
    *   `383×383` 尺寸的图片保存为 `cover-square.jpg`。

::: tip 替代方案
您也可以使用 Coze 的工作流（Bot）、豆包或 Gemini 的图像生成功能来完成此步骤。
:::

## 二、PPT 自动化处理系统

### 1. 系统要求

| 组件 | 要求 |
| :-- | :--- |
| 操作系统 | Windows 10/11 |
| Office 版本 | PowerPoint 2010 或更高版本 |
| 运行环境 | .NET Framework 4.7.2 或更高 |
| 安全设置 | 启用宏执行 |

### 2. 宏安装流程

#### a. 创建启用宏的演示文稿
- 打开 PowerPoint，新建一个空白演示文稿。
- 将其另存为 **`启用宏的演示文稿 (*.pptm)`** 格式，建议命名为 `公众号封面生成器.pptm`。

#### b. 插入 VBA 模块
- 按 `Alt + F11` 打开 VBA 编辑器。
- 在左侧项目浏览器中，右键点击 "VBAProject (你的演示文稿名称)" → `插入` → `模块`。
- 将下方的完整 VBA 代码粘贴到新创建的模块窗口中。

::: details 完整 VBA 代码
```vb
Sub MergeCovers()
    ' 定义常量和尺寸
    Const PointsPerInch As Single = 72
    Const PixelsPerInch As Single = 96
    Const ScaleFactor As Single = PointsPerInch / PixelsPerInch
    
    ' 设置幻灯片尺寸为 1283×383 像素
    With ActivePresentation.PageSetup
        .SlideWidth = 1283 * ScaleFactor
        .SlideHeight = 383 * ScaleFactor
    End With
    
    Dim inputDialog As FileDialog
    Set inputDialog = Application.FileDialog(msoFileDialogFilePicker)
    Dim wideImagePath As String, squareImagePath As String
    
    ' 选择横幅图 (900×383)
    With inputDialog
        .Title = "请选择横幅图 (900×383)"
        .Filters.Clear
        .Filters.Add "图片文件", "*.jpg;*.jpeg;*.png"
        If .Show <> -1 Then Exit Sub
        wideImagePath = .SelectedItems(1)
    End With
    
    ' 选择方形图 (383×383)
    With inputDialog
        .Title = "请选择方形图 (383×383)"
        .Filters.Clear
        .Filters.Add "图片文件", "*.jpg;*.jpeg;*.png"
        If .Show <> -1 Then Exit Sub
        squareImagePath = .SelectedItems(1)
    End With
    
    ' 清理并添加图片
    With ActivePresentation.Slides(1)
        ' 清除幻灯片上所有已有形状
        While .Shapes.Count > 0
            .Shapes(1).Delete
        Wend
        
        ' 插入横幅图并定位
        Dim wideImage As Shape
        Set wideImage = .Shapes.AddPicture(FileName:=wideImagePath, LinkToFile:=msoFalse, SaveWithDocument:=msoTrue, Left:=0, Top:=0, Width:=900 * ScaleFactor, Height:=383 * ScaleFactor)
        
        ' 插入方形图并定位
        Dim squareImage As Shape
        Set squareImage = .Shapes.AddPicture(FileName:=squareImagePath, LinkToFile:=msoFalse, SaveWithDocument:=msoTrue, Left:=wideImage.Width, Top:=0, Width:=383 * ScaleFactor, Height:=383 * ScaleFactor)
        
        ' 将两张图片组合
        .Shapes.Range(Array(wideImage.Name, squareImage.Name)).Group
    End With
    
    ' 弹出保存对话框
    Dim saveDialog As FileDialog
    Set saveDialog = Application.FileDialog(msoFileDialogSaveAs)
    With saveDialog
        .Title = "保存公众号双封面"
        .InitialFileName = "公众号封面"
        .FilterIndex = 1
        .Filters.Clear
        .Filters.Add "PNG 图片", "*.png"
        .Filters.Add "JPEG 图片", "*.jpg"
        
        If .Show = -1 Then
            Dim fullPath As String
            fullPath = .SelectedItems(1)
            
            ' 自动处理文件扩展名
            If LCase(Right(fullPath, 4)) <> ".png" And LCase(Right(fullPath, 4)) <> ".jpg" Then
                fullPath = fullPath & ".png" ' 默认为PNG
            End If
            
            ' 导出图片并提示
            ActivePresentation.Slides(1).Export fullPath, IIf(LCase(Right(fullPath, 4)) = ".jpg", "JPG", "PNG")
            MsgBox "封面已成功保存到：" & vbCrLf & fullPath, vbInformation, "操作成功"
        Else
            MsgBox "用户取消了保存操作。", vbExclamation, "操作已取消"
        End If
    End With
End Sub
```
:::

#### c. 保存并添加到快速访问工具栏
- 保存 `.pptm` 文件并关闭 VBA 编辑器。
- **可选操作**：为了方便使用，可以将此宏添加到快速访问工具栏：`文件` → `选项` → `快速访问工具栏` → 从下拉菜单中选择`宏` → 找到并添加 `MergeCovers` → `确定`。

## 三、双封面生成操作

1.  **运行宏**：按 `Alt + F8` 打开宏对话框，选择 `MergeCovers` 并点击 `运行`（或直接点击快速访问工具栏上的图标）。
2.  **选择图片**：根据弹出的对话框提示，依次选择您已下载的 `cover-wide.jpg` 和 `cover-square.jpg`。
3.  **保存合成图**：在保存对话框中，选择希望的存储位置，输入文件名，然后点击 `保存`。
4.  **完成**：操作成功后会弹出提示框，告知文件保存路径。

## 四、文件格式与最佳实践

| 用途 | 推荐格式 | 特点 |
| :--- | :--- | :--- |
| 普通或带文字封面 | PNG | 无损质量，文字边缘更清晰，支持透明度 |
| 含照片的封面 | JPG | 文件体积较小，利于网络加载 |

- **文件命名**：建议采用 `日期_文章标题_封面.png` 格式，如 `20250611_双封面指南_封面.png`。
- **文件存储**：建立专门的 `微信封面素材` 文件夹，并按年月分子文件夹进行归档。
- **图片压缩**：使用 [TinyPNG](https://tinify.cn) 等工具对最终生成的封面进行压缩，确保文件大小在公众号限制的 2MB 以内。