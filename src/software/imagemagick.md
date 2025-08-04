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

:: -------------------------------------------------------
:: Setup environment and parameters
:: -------------------------------------------------------

REM 默认文件名
set "svgfile=icon.svg"
set "output_ico=app.ico"

REM 初始化选项
set "choice=0"

:: -------------------------------------------------------
:: Handle file drag and drop
:: -------------------------------------------------------
if not "%~1"=="" (
    set "svgfile=%~1"
    echo.
    echo Using dragged file: !svgfile!
    goto choose_method
)

:: -------------------------------------------------------
:: Main Menu
:: -------------------------------------------------------
:menu
echo.
echo ICO Generation Tool
echo ====================
echo.
echo Step 1: Select input file (current: !svgfile!)
echo Step 2: Choose generation method
echo Step 3: Verify output
echo.
echo Options:
echo 1. Select input SVG file
echo 2. Generate ICO
echo.
set /p choice="Enter option (1 or 2): "

if "%choice%"=="1" goto select_file
if "%choice%"=="2" goto choose_method
echo Invalid input! Please choose again.
goto menu

:: -------------------------------------------------------
:: Select input SVG file
:: -------------------------------------------------------
:select_file
echo.
echo Please drag and drop an SVG file onto this window,
echo or enter full path to the SVG file.
echo Current input: !svgfile!
set /p svgfile="Enter SVG file path: "
call :validate_svg
goto menu

:: -------------------------------------------------------
:: Choose generation method
:: -------------------------------------------------------
:choose_method
echo.
echo Generating ICO from: !svgfile!
echo.
echo Choose ICO generation method:
echo 1. Direct ICO generation (Recommended, fastest)
echo 2. Generate PNGs first then create ICO (Keep temp files)
echo.
set /p method="Enter method (1 or 2): "

if "!method!"=="1" goto direct_ico
if "!method!"=="2" goto png_method
echo Invalid input! Please choose again.
goto choose_method

:: -------------------------------------------------------
:: Direct ICO generation
:: -------------------------------------------------------
:direct_ico
echo.
echo Output file will be: %output_ico%
echo.
set /p output_ico="Enter output ICO name (or press Enter for %output_ico%): "
if "!output_ico!"=="" set "output_ico=app.ico"

echo Generating ICO directly...
magick -background none "!svgfile!" ^
       -compress none ^
       -density 384 ^
       -define icon:auto-resize="256,128,64,48,32,16" "!output_ico!"
goto verify

:: -------------------------------------------------------
:: PNG Method generation
:: -------------------------------------------------------
:png_method
echo.
set /p output_ico="Enter output ICO name (or press Enter for %output_ico%): "
if "!output_ico!"=="" set "output_ico=app.ico"

echo Generating multiple PNG sizes...
md temp 2>nul
magick -background none "!svgfile!" ^
       -compress none ^
       -density 384 ^
       ( -clone 0 -resize 256x256 -write "temp\256.png" +delete ) ^
       ( -clone 0 -resize 128x128 -write "temp\128.png" +delete ) ^
       ( -clone 0 -resize 64x64 -write "temp\64.png" +delete ) ^
       ( -clone 0 -resize 48x48 -write "temp\48.png" +delete ) ^
       ( -clone 0 -resize 32x32 -write "temp\32.png" +delete ) ^
       ( -clone 0 -resize 16x16 -write "temp\16.png" +delete ) ^
       null:

echo Combining PNGs into ICO...
magick "temp\256.png" "temp\128.png" "temp\64.png" "temp\48.png" "temp\32.png" "temp\16.png" -compress none "!output_ico!"

echo Cleaning up...
set /p del_temp="Keep PNG files? (y/n, default=y): "
if /i "!del_temp!"=="n" ( rd /s /q temp ) else ( move "temp\*.png" . >nul & rd temp )

echo PNG files moved to current directory.
goto verify

:: -------------------------------------------------------
:: Validate SVG file
:: -------------------------------------------------------
:validate_svg
if not exist "!svgfile!" (
    echo.
    echo ERROR: File "!svgfile!" not found!
    echo.
    set "svgfile=icon.svg"
    pause
)
exit /b

:: -------------------------------------------------------
:: Verify output
:: -------------------------------------------------------
:verify
echo.
echo =================================
echo ICO generation complete!
echo Output file: !output_ico!
echo =================================
echo.
echo Verifying ICO content...
magick identify -format "%%f: %%wx%%h (%%m)\n" "!output_ico!"
echo.

set /p open="Open file location? (y/n, default=n): "
if /i "!open!"=="y" ( explorer /select,"!output_ico!" )

echo.
echo Done! Press any key to exit...
pause >nul
exit /b

:: -------------------------------------------------------
:: Error Handling
:: -------------------------------------------------------
:error
echo.
echo ERROR: Failed to generate ICO
echo Check ImageMagick installation and file permissions
pause
exit /b 1
```


3. 命令行处理参数 <https://imagemagick.org/script/command-line-processing.php> 。
