---
title: ImageMagick：一款 GitHub 上星标 10k+ 的编辑和处理数字图像软件套件
shortTitle: ImageMagick
date: 2025-04-17
icon: fa-solid fa-image
order: 7
category:
  - Software
tag:
  - ImageMagick
  - 图像软件
---

### 获取专业SVG图标

1. 打开网站[Font Awesome](https://fontawesome.com/search?o=r&m=free)搜索关键词（如 "download"、"cloud"）。

2. 筛选 Free 标签，找到心仪图标。

3. 点击图标 → 选择 `Download SVG file` 按钮。

### 定制专属SVG图标

1. 用`记事本/VSCode`等工具打开下载的 `xxx.svg` 文件。

2. 把`步骤1`中的源代码喂给 [DeepSeek](https://www.deepseek.com)，再写上你的修改要求，提交等待生成。

3. 粘贴`步骤2`DeepSeek生成的源代码，另存为 `icon.svg` 。


### 生成多尺寸ICO文件

1. 下载并安装[Windows 二进制文件版本](https://imagemagick.org/script/download.php#windows)。
    
2. 在终端中执行下面的命令（文件目录cmd）

**初始版**
    
```bat
rem 1. 生成各尺寸 PNG
magick icon.svg -resize 256x256 256.png  
magick icon.svg -resize 128x128 128.png  
magick icon.svg -resize 64x64 64.png  
magick icon.svg -resize 48x48 48.png  
magick icon.svg -resize 32x32 32.png  
magick icon.svg -resize 16x16 16.png  

rem 2. 合并为 ICO
magick 256.png 128.png 64.png 48.png 32.png 16.png -compress none app.ico

```

**进阶版**

```bat
@echo off
setlocal enabledelayedexpansion

:menu
echo.
echo Choose ICO generation method:
echo 1. Direct ICO generation (Recommended)
echo 2. Generate PNGs first then create ICO
echo.
set /p choice="Enter your choice (1 or 2): "

if "%choice%"=="1" goto direct_ico
if "%choice%"=="2" goto png_method

echo Invalid input! Please choose again.
goto menu

:direct_ico
echo Generating ICO directly with full sizes...
magick -background none icon.svg ^
       -compress none ^
       -define icon:auto-resize="256,128,64,48,32,16" app.ico
echo ICO file created: app.ico
goto verify

:png_method
echo Generating multiple PNG sizes...
magick -background none icon.svg ^
       ( -clone 0 -compress none -resize 256x256 -write 256.png +delete ) ^
       ( -clone 0 -compress none -resize 128x128 -write 128.png +delete ) ^
       ( -clone 0 -compress none -resize 64x64 -write 64.png +delete ) ^
       ( -clone 0 -compress none -resize 48x48 -write 48.png +delete ) ^
       ( -clone 0 -compress none -resize 32x32 -write 32.png +delete ) ^
       ( -clone 0 -compress none -resize 16x16 -write 16.png +delete ) ^
       null:

echo Combining PNGs into ICO...
magick -compress none 256.png 128.png 64.png 48.png 32.png 16.png app.ico
echo ICO file created: app.ico
echo PNG files preserved: 256.png, 128.png, 64.png, 48.png, 32.png, 16.png

:verify
echo.
echo Verifying ICO content...
magick identify -format "%%f: %%wx%%h (%%m)\n" app.ico
echo.
echo Press any key to exit...
pause >nul
```


3. 命令行处理参数 <https://imagemagick.org/script/command-line-processing.php> 。
