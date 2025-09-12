---
title: 微信公众号双封面制作自动化指南
shortTitle: 公众号双封面制作
date: 2025-06-11
icon: fa-brands fa-weixin
order: 5
category:
  - 攻略
tag:
  - 微信公众号
  - AI
  - PowerPoint
  - VBA
description: 本指南提供了一套完整的微信公众号双封面制作解决方案，结合 AI 图像生成与 PowerPoint VBA 自动化宏，可一键合成适配文章内（900×383）和分享卡片（383×383）两种场景的 1283×383 像素封面图。
---

## 方案概述

本方案通过结合 **AI 图像生成** 和 **PowerPoint 自动化宏**，实现一键式制作微信公众号双封面。最终生成的 `1283×383` 像素图片，能完美适配文章内嵌（左侧 `900×383`）和外部转发分享卡片（右侧 `383×383`）两种展示需求。

## 第一步：AI 图像生成

使用以下模板，您可以在任何支持图像生成的 AI 平台（如 DeepSeek, Coze, DALL-E 等）快速生成所需素材。

### 指令模板

```txt
你是一个图像生成助手，请根据我的简单描述，想象并详细描述两幅关联主图和缩略图，再将你的详细描述翻译成英文，并插入到以下两个链接的{prompt}部分：

宽幅图 (900x383):
![cover-wide-image]https://image.pollinations.ai/prompt/{prompt}?width=900&height=383&enhance=true&private=true

方形图 (383x383):
![cover-square-image]https://image.pollinations.ai/prompt/{prompt}?width=383&height=383&enhance=true&private=true

我的描述：[在此输入您的场景描述]
```

### 操作流程

1.  复制上述模板到您的 AI 对话框中。
2.  将 `[在此输入您的场景描述]` 替换为您的创意，例如：“未来科技实验室，全息操作界面悬浮空中，机械臂处理发光DNA链，冷蓝色调”。
3.  AI 将返回两个生成好的图片链接。
4.  在浏览器中打开链接，分别将图片保存为 `cover-wide.jpg` 和 `cover-square.jpg`。

## 第二步：PPT 自动化合成

通过在 PowerPoint 中安装一段 VBA 宏代码，可以实现图片的自动拼接与导出。

### 系统要求

- **操作系统**: Windows 10/11
- **软件**: PowerPoint 2010 或更高版本
- **环境**: .NET Framework 4.7.2 或更高
- **设置**: 需启用宏执行（在“信任中心”设置）

### 宏安装流程

1.  **创建启用宏的演示文稿**
    *   打开 PowerPoint，新建一个空白演示文稿。
    *   点击 `文件` → `另存为`，选择保存类型为 `启用宏的演示文稿 (*.pptm)`，建议命名为 `公众号封面生成器.pptm`。

2.  **打开 VBA 编辑器**
    *   按下快捷键 `Alt + F11`。

3.  **插入新模块**
    *   在左侧项目浏览器中，右键点击 `VBAProject (你的文件名)` → `插入` → `模块`。
    *   将下方的 VBA 代码完整粘贴到右侧的代码窗口中。

::: details 完整 VBA 代码
```vba
Sub MergeAndExportCovers()
    ' --- 常量定义 ---
    Const PointsPerInch As Single = 72
    Const PixelsPerInch As Single = 96
    Const ScaleFactor As Single = PointsPerInch / PixelsPerInch
    
    ' --- 1. 设置幻灯片尺寸为 1283x383 像素 ---
    With ActivePresentation.PageSetup
        .SlideWidth = 1283 * ScaleFactor
        .SlideHeight = 383 * ScaleFactor
    End With
    
    Dim fDialog As FileDialog
    Dim wideImagePath As String, squareImagePath As String
    
    ' --- 2. 引导用户选择图片 ---
    ' 选择横幅图 (900x383)
    Set fDialog = Application.FileDialog(msoFileDialogFilePicker)
    With fDialog
        .Title = "步骤 1/2: 请选择横幅图 (900x383)"
        .Filters.Clear
        .Filters.Add "图片文件", "*.jpg; *.jpeg; *.png"
        If .Show <> -1 Then
            MsgBox "操作已取消。", vbExclamation, "提示"
            Exit Sub
        End If
        wideImagePath = .SelectedItems(1)
    End With
    
    ' 选择方形图 (383x383)
    With fDialog
        .Title = "步骤 2/2: 请选择方形图 (383x383)"
        If .Show <> -1 Then
            MsgBox "操作已取消。", vbExclamation, "提示"
            Exit Sub
        End If
        squareImagePath = .SelectedItems(1)
    End With
    
    ' --- 3. 清理并添加图片到幻灯片 ---
    On Error Resume Next
    With ActivePresentation.Slides(1)
        ' 清空幻灯片
        While .Shapes.Count > 0
            .Shapes(1).Delete
        Wend
        
        ' 插入横幅图并左对齐
        Dim wideImg As Shape
        Set wideImg = .Shapes.AddPicture(FileName:=wideImagePath, LinkToFile:=msoFalse, _
            SaveWithDocument:=msoTrue, Left:=0, Top:=0, _
            Width:=900 * ScaleFactor, Height:=383 * ScaleFactor)
        
        ' 插入方形图并紧贴横幅图右侧
        Dim squareImg As Shape
        Set squareImg = .Shapes.AddPicture(FileName:=squareImagePath, LinkToFile:=msoFalse, _
            SaveWithDocument:=msoTrue, Left:=wideImg.Width, Top:=0, _
            Width:=383 * ScaleFactor, Height:=383 * ScaleFactor)
        
        ' 组合两张图片为一个整体
        .Shapes.Range(Array(wideImg.Name, squareImg.Name)).Group
    End With
    On Error GoTo 0
    
    ' --- 4. 引导用户保存合成图 ---
    Set fDialog = Application.FileDialog(msoFileDialogSaveAs)
    With fDialog
        .Title = "保存公众号双封面"
        .InitialFileName = Format(Date, "YYYYMMDD") & "_公众号封面.png"
        .FilterIndex = 1
        .Filters.Clear
        .Filters.Add "PNG 图片", "*.png"
        .Filters.Add "JPEG 图片", "*.jpg"
        
        If .Show = -1 Then
            Dim savePath As String
            savePath = .SelectedItems(1)
            
            ' 导出为图片
            ActivePresentation.Slides(1).Export savePath, IIf(LCase(Right(savePath, 3)) = "jpg", "JPG", "PNG")
            MsgBox "封面已成功保存到：" & vbCrLf & savePath, vbInformation, "操作完成"
        Else
            MsgBox "已取消保存。", vbExclamation, "提示"
        End If
    End With
End Sub
```
:::

4.  **保存并关闭**
    *   在 VBA 编辑器中点击保存按钮，然后关闭编辑器返回 PowerPoint。

::: tip 快速访问技巧
为了方便使用，您可以将此宏添加到 PowerPoint 的**快速访问工具栏**：
`文件` → `选项` → `快速访问工具栏` → 从下拉菜单中选择 `宏` → 选中 `MergeAndExportCovers` → `添加` → `确定`。
:::

### 双封面生成操作

1.  **运行宏**：按下 `Alt + F8`，在弹出的对话框中选择 `MergeAndExportCovers`，点击 `运行`。
2.  **选择图片**：根据弹窗提示，依次选择您已保存的 `cover-wide.jpg` 和 `cover-square.jpg`。
3.  **保存合成图**：在保存对话框中，选择路径、输入文件名，然后点击 `保存`。
4.  **完成**：操作成功后会弹出提示框。

## 最佳实践

- **文件命名**：建议使用 `日期_文章标题_cover` 格式，如 `20250611_自动化指南_cover.png`。
- **图片压缩**：为加快加载速度，可使用 [TinyPNG](https://tinypng.com/) 等工具对最终生成的封面图进行压缩（公众号封面需小于 2MB）。
- **格式选择**：
    - **PNG**：适用于带文字或需要无损质量的封面。
    - **JPG**：适用于照片类封面，文件体积更小。