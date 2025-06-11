---
title: 微信公众号推文双封面图制作文档
date: 2025-06-11
icon: fa-brands fa-weixin
order: 5
category:
  - 攻略
tag:
  - 微信文章封面图
---

## 文档概述

本技术文档详细介绍了利用AI图像生成和PPT宏自动化制作微信公众号双封面的全流程解决方案。系统支持1283×383像素的封面生成，完美适配公众号文章内显示（900×383）和分享卡片（383×383）两种场景。

## AI图像生成流程

### 图像生成指令模板

```txt
你是一个图像生成助手，请根据我的简单描述，想象并详细描述两幅关联主图和缩略图，再将你的详细描述翻译成英文，并插入到以下链接的{prompt}部分：
![cover-wide-image]https://image.pollinations.ai/prompt/{prompt}?width=900&height=383&enhance=true&private=true
![cover-square-image]https://image.pollinations.ai/prompt/{prompt}?width=383&height=383&enhance=true&private=true
描述：[在此输入场景描述]
```

### 输入示例

```txt
描述：未来科技实验室场景，全息操作界面悬浮空中，机械臂正在处理发光的DNA链，冷蓝色调
```

### 操作步骤

1. 在DeepSeek或类似AI平台粘贴上述模板

2. 替换[在此输入场景描述]为你的创意

3. 复制返回的两个图片链接

4. 在浏览器打开链接下载图片：

   - 900×383 → 保存为cover-wide.jpg

   - 383×383 → 保存为cover-square.jpg

::: tip
也可以用coze写个流，或者用豆包/gemini等的图像生成功能。
:::

## PPT自动化处理系统

###  系统要求

| 要求           | 组件       |
| -------------- | ---------- |
| Windows 10/11  | 操作系统   |
| 2010或更高版本 | PowerPoint |
| 4.7.2或更高    | .NET框架   |
| 启用宏执行     | 安全设置   |

### 宏安装流程

#### 创建启用宏的演示文稿

- 打开PowerPoint → 新建空白演示文稿
- 保存为：`启用宏的演示文稿 (*.pptm)` 格式（建议命名：公众号封面生成器.pptm）

#### 打开VBA编辑器

- `Alt + F11` 打开VBA编辑器

#### 插入模块

- 右键点击左侧"VBAProject (演示文稿名称)" → 插入 → 模块
- 将**下面的完整VBA代码**粘贴到空白模块中

::: details 完整VBA代码

```vbscript
Sub MergeCovers()
    ' 设置幻灯片尺寸 (1283×383 像素)
    Const PointsPerInch As Single = 72
    Const PixelsPerInch As Single = 96
    Const ScaleFactor As Single = PointsPerInch / PixelsPerInch
    
    With ActivePresentation.PageSetup
        .SlideWidth = 1283 * ScaleFactor
        .SlideHeight = 383 * ScaleFactor
    End With
    
    ' 创建文件选择对话框
    Dim inputDialog As FileDialog
    Set inputDialog = Application.FileDialog(msoFileDialogFilePicker)
    Dim wideImagePath As String, squareImagePath As String
    
    ' 选择横幅图
    With inputDialog
        .Title = "选择横幅图 (900×383)"
        .Filters.Clear
        .Filters.Add "图片文件", ".jpg;.jpeg;*.png"
        If .Show <> -1 Then Exit Sub
        wideImagePath = .SelectedItems(1)
    End With
    
    ' 选择方形图
    With inputDialog
        .Title = "选择方形图 (383×383)"
        .Filters.Clear
        .Filters.Add "图片文件", ".jpg;.jpeg;*.png"
        If .Show <> -1 Then Exit Sub
        squareImagePath = .SelectedItems(1)
    End With
    
    ' 清除幻灯片内容
    On Error Resume Next
    With ActivePresentation.Slides(1)
        .Shapes.SelectAll
        Selection.Delete
        
        ' 插入横幅图
        Dim wideImage As Shape
        Set wideImage = .Shapes.AddPicture( _
            FileName:=wideImagePath, _
            LinkToFile:=msoFalse, _
            SaveWithDocument:=msoTrue, _
            Left:=0, _
            Top:=0, _
            Width:=900 * ScaleFactor, _
            Height:=383 * ScaleFactor)
        
        ' 插入方形图
        Dim squareImage As Shape
        Set squareImage = .Shapes.AddPicture( _
            FileName:=squareImagePath, _
            LinkToFile:=msoFalse, _
            SaveWithDocument:=msoTrue, _
            Left:=wideImage.Width, _
            Top:=0, _
            Width:=383 * ScaleFactor, _
            Height:=383 * ScaleFactor)
        
        ' 组合图片
        .Shapes.Range(Array(wideImage.Name, squareImage.Name)).Group
    End With
    
    ' 保存对话框设置
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
            
            ' 扩展名处理
            If Right(fullPath, 4) <> ".png" And Right(fullPath, 4) <> ".jpg" Then
                fullPath = fullPath & ".png"
            End If
            
            ' 导出图片
            ActivePresentation.Slides(1).Export fullPath, IIf(Right(fullPath, 4) = ".jpg", "JPG", "PNG")
            MsgBox "封面已保存到：" & vbCrLf & fullPath, vbInformation, "操作成功"
        Else
            MsgBox "操作已取消", vbExclamation, "取消保存"
        End If
    End With
End Sub
```
:::

#### 保存并关闭编辑器

- 返回PPT → 保存文件 → 关闭VBA编辑器

::: tip
- 提示：可将此宏添加到PPT快速访问工具栏
- 方法：文件→选项→快速访问工具栏→选择"宏"→添加→确定
:::
    
### 双封面生成操作

#### 打开宏对话框

- `Alt + F8` → 选择"MergeCovers"宏 → 点击"运行"

#### 按提示选择图片

- 第一步：选择900×383横幅图 → 点击"打开"
- 第二步：选择383×383方形图 → 点击"打开"

#### 保存合成图

- 弹出保存对话框 → 选择存储位置
- 输入文件名（默认扩展名.png自动添加）
- 点击"保存"

#### 完成提示

- 出现"双封面已成功保存"的提示框 → 点击"确定"

## 文件格式建议

| 用途       | 推荐格式 | 特点                 |
| ---------- | -------- | -------------------- |
| 普通封面   | PNG      | 无损质量，支持透明度 |
| 带照片封面 | JPG      | 文件较小，加载快     |
| 带文字封面 | PNG      | 文字边缘更清晰       |

## 最佳实践

### 文件命名规范

- `日期_文章标题_封面`（例：20231120_活动预告_封面）
- 避免使用空格和特殊符号

### 文件存储建议

- 创建专用文件夹：`微信封面素材`
- 按年月建立子文件夹

### 图片处理技巧

- 图像压缩工具（如[TinyPNG](https://tinify.cn)）可减小文件体积
- 公众号封面文件大小应<2MB