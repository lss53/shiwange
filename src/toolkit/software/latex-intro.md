---
title: LaTeX 入门
shortTitle:
date: 2026-07-25
icon: fa-brands fa-tex
order: 13
category:
  - 软件工具
tag:
  - LaTeX
  - 排版
  - 学术写作
  - 数学公式
  - 文档撰写
description: 系统学习 LaTeX 排版系统，从环境搭建到高级技巧，涵盖数学公式、文档结构、图表制作、参考文献管理等核心内容，助你高效完成学术论文和技术文档的编写。
---

# LaTeX 入门

## 一、LaTeX 安装

一份简短的关于 LaTeX 安装的介绍：  
https://github.com/OsbertWang/install-latex-guide-zh-cn

## 二、基础语法

| 资料 | 地址 |
| :--- | :--- |
| 《一份（不太）简短的 LaTeX 2ε 介绍》 | https://github.com/CTeX-org/lshort-zh-cn |
| LaTeX2e 非官方参考手册 | https://mirrors.aliyun.com/CTAN/info/latex2e-help-texinfo/latex2e.html |
| The Comprehensive LaTeX Symbol List（符号查询工具） | https://ctan.org/pkg/comprehensive |

## 三、模板和宏包

| 名称 | 用途 | 地址 |
| :--- | :--- | :--- |
| ElegantBook | 优雅的书籍/笔记排版模板 | https://github.com/ElegantLaTeX/ElegantBook |
| exam-zh | 专为中文试卷设计的排版模板 | https://github.com/xkwxdyy/exam-zh |
| tabularray | 用 LaTeX3 打造的表格排版“神器” | https://github.com/TeXackers/tabularray |
| diagbox | 表格斜线宏包（常配合 tabularray 使用） | https://ctan.org/pkg/diagbox |
| subcaption | 图片/表格子图宏包 | https://ctan.org/pkg/subcaption |
| mhchem | 化学公式输入，像写文字一样简单 | https://ctan.org/pkg/mhchem |
| amsmath | LaTeX 最核心的数学公式排版宏包 | https://ctan.org/pkg/amsmath |

> **提示**：如果已安装 TeX Live，可以使用 `texdoc` 命令快速查看宏包的本地说明文档。例如：
> ```bash
> texdoc tabularray    # 打开 tabularray 的官方文档
> texdoc -l amsmath    # 列出 amsmath 相关的所有文档，手动选择
> ```
> 关于 `texdoc` 的更多用法，可参考：[texdoc 使用说明](#texdoc-使用说明)（见下文）

## 四、ElegantBook 模板使用笔记

### 4.1 设置方正字体

方正字库客户端下载的字体位于：`C:\Users\用户名\Documents\方正字库\Font`

在文档类中添加 `chinesefont=founder` 选项：

```latex
\documentclass[lang=cn, chinesefont=founder]{elegantbook}
```

### 4.2 封面图裁剪（[Adobe Photoshop CC 2019](https://www.aliyundrive.com/s/Y9S52pf3Up4)）

1. 打开要裁剪的图片
2. 选择**裁剪工具**（左侧工具栏）
3. 在上方选项栏中设置：**宽度 1280 像素 × 高度 1024 像素，分辨率 300 像素/英寸**
4. 拖动裁剪框，确定所选区域，按 `Enter` 确认
5. **文件 → 存储为**，选择保存位置，修改文件名和保存类型（如 `.jpg`），单击“保存”
6. 在“JPEG 选项”窗口中，品质选择 **`高`** 或 **`最佳`**，单击“确定”

### 4.3 让 `\chapter` 页显示页码

参考：https://ask.latexstudio.net/ask/question/17944.html

### 4.4 为带 `caption` 的 `longtblr` 和 `talltblr` 提供 Elegant 风格支持

参考：https://github.com/ElegantLaTeX/ElegantBook/issues/266

## 五、Tabularray 教程

### 5.1 Tabularray 入门教程

[LaTeX 表格排版的 tabularray 宏包](https://www.bilibili.com/video/BV1ag4y1L7C8)（by 耿楠）

### 5.2 树状结构图排版

- **forest 宏包**（推荐）：自动化排版树状图。处理多行文本时，可通过 `before drawing tree` 计算父节点位置，使其对齐子节点几何中心。参考：[使用forest宏包排版树状结构图对于多行文本如何保持节点的对齐？](https://ask.latexstudio.net/ask/question/18001.html)
- **schemata 宏包**：语法简洁，但需手动用 `\Schema[调整]{大小}` 微调括号位置。参考同上。
- **TikZ 相对节点放置**：使用 `below=of`、`right=of` 等语法相对定位节点。官方教程：[3.8 Placing Nodes Using Relative Placement](https://tikz.dev/tutorial-nodes#sec-3.8)

## 六、打印机常规原稿尺寸（用纸）

| 名称 | 尺寸（宽 × 高） |
| :--- | :--- |
| A3 版 | 297mm × 420mm |
| 8K 版 | 260mm × 370mm |
| B4 版 | 257mm × 364mm |
| A4 版 | 210mm × 297mm |
| 16K 单页 | 195mm × 270mm |
| 16K 书刊 | 185mm × 260mm |
| B5 版 | 182mm × 257mm |
| A5 版 | 148mm × 210mm |
| 便签 | 148mm × 100mm |

## 七、印刷标准：将图片调整为 300 DPI

### 操作步骤（[Adobe Photoshop CC 2019](https://www.aliyundrive.com/s/Y9S52pf3Up4)）

1. 打开要处理的图片
2. **图像 → 图像大小**（快捷键 `Alt + Ctrl + I`）
3. 在“图像大小”窗口中：
   - 将**分辨率**改为 **300** 像素/英寸
   - 勾选 **“重新采样”**
   - 在下拉菜单中选择 **“自动”**
   - 单击“确定”
4. **文件 → 存储为**，选择保存位置，修改文件名和保存类型（如 `.jpg`），单击“保存”
5. 在“JPEG 选项”窗口中，品质选择 **`高`** 或 **`最佳`**，单击“确定”

### 为什么要改成 300 DPI？

- **屏幕显示**：72 DPI 或 96 DPI 即可，像素直接对应屏幕发光点
- **纸质印刷**：需要 300 DPI，确保油墨点足够密集，肉眼看不到马赛克
- **300 DPI 是行业标准**：基于人眼在 30-40cm 阅读距离下的分辨极限

> **注意**：300 DPI 的前提是图片本身有足够的像素。例如，要打印 A4 幅面的清晰图片，原始像素需达到约 **2480 × 3508**。如果原图只有几百像素宽，强行拉到 300 DPI 依然会模糊。

## 八、texdoc 使用说明

`texdoc` 是 TeX Live 自带的一个命令行工具，用于快速查看本地已安装的宏包和文档类的说明文档（通常是 `.pdf` 格式）。

### 基本用法

| 命令 | 说明 |
| :--- | :--- |
| `texdoc <宏包名>` | 自动打开最匹配的文档 |
| `texdoc -l <宏包名>` | 列出所有匹配的文档，由你手动选择（**推荐**） |
| `texdoc -m <宏包名>` | 混合模式：唯一匹配时直接打开，多个匹配时列出列表 |
| `texdoc -s <宏包名>` | 显示所有匹配结果（包含默认隐藏的） |
| `texdoc texdoc` | 查看 `texdoc` 自己的完整手册 |

### 使用示例

```bash
# 查看 tabularray 宏包文档
texdoc tabularray

# 查看 amsmath 相关的所有文档，手动选择最合适的
texdoc -l amsmath

# 查看 diagbox 宏包文档（混合模式）
texdoc -m diagbox