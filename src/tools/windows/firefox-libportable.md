---
title: 使用 libportable 将 Firefox 便携化
shortTitle: 制作 Firefox 便携版
date: 2026-05-10
icon: fa-brands fa-firefox-browser
order: 11
category:
  - 软件·应用
tag:
  - Firefox
  - 便携版
  - libportable
  - 浏览器
description: 使用 libportable 开源库将 Firefox 浏览器便携化，实现配置文件与程序目录绑定、无注册表残留、即拷即用的绿色使用体验。
---
## 一、下载安装包
前往以下`Zen浏览器`任一地址下载 Windows 64bit 安装包：
- 官方下载页：`https://Zen-browser.app/download/`
- GitHub Releases：`https://github.com/Zen-browser/desktop/releases`，下载 `Zen.installer.exe`
前往以下`Firefox浏览器`任一地址下载 Windows 64bit 安装包：


---

## 二、下载 libportable 便携工具包
前往 GitHub Releases：`https://github.com/adonais/libportable/releases`，下载 `portable_bin.7z`
其典型内容如下：
| 文件 | 说明 |
|------|------|
| `portable32.dll` / `portable64.dll` | 便携化核心 DLL |
| `injectpe.bat` | 注入脚本 |
| `upcheck32.exe` / `upcheck64.exe` | DLL 注入工具 |
| `portable(example).ini` | 示例配置文件 |
---
## 三、制作便携版
### 1. 新建目录
例如 `D:\Zen`或`D:\Firefox`
> ⚠️ 路径中**不要包含中文和空格**，以免出现异常问题。
### 2. 解压 Zen或Firefox 安装包
使用 7-Zip / Bandizip 等工具打开 `Zen.installer.exe`或`Firefox Setup*.exe`，将 `core` 文件夹拖至 `D:\Zen`或`D:\Firefox` 目录，然后关闭工具。
### 3. 放入 libportable 文件
使用 7-Zip / Bandizip 等工具打开 `portable_bin.7z`，将其中**portable64.dll、upcheck64.exe、portable(example).ini、injectpe.bat**拖至 `D:\Zen\core` 目录，然后关闭工具。

### 4. 运行 injectpe.bat 注入 portable64.dll
打开 `D:\Zen\core` 或 `D:\Firefox\core`，双击运行 `injectpe.bat`，按提示完成操作。

---

## 四、配置 portable.ini（修改缓存路径）
打开 `D:\Zen\core\portable.ini` 或 `D:\Firefox\core\portable.ini`，将缓存路径修改为：
```ini
TmpDataPath=../Cache
```
> 使用相对路径 `../` 表示上级目录，这样整个 `Zen` 或 `Firefox` 文件夹可随意拷贝至任意位置使用。

---

## 五、其它配置
1. 禁用更新：Firefox\distribution\policies.json
2. 备用搜索引擎：Firefox\Profiles\search.json.mozlz4
3. user.js 设置：Firefox\Profiles\user.js

---

## 六、测试是否制作成功
1. 双击 `D:\Zen\core\zen.exe` 启动浏览器
   →，Skip，Next，Next，Next，Dive in!
   如果是Firefox，双击 `D:\Firefox\core\firefox.exe` 按提示选择
2. 在地址栏输入 `about:support`，找到**配置文件夹**栏
   - 若路径指向 `D:\Zen\core\Profiles`，则说明制作成功

---

## 七、设置Firefox
1. 设置 → 主页与启动
```txt
启动（以下全部取消）
打开先前的窗口和标签页(S)
启动电脑时自动打开 Firefox
总是检查 Firefox 是否是您的默认浏览器(W)

主页
新窗口→自定义特定网站→选择特定网站→网址下面输入about:newtab→添加地址，返回。

Firefox 主页
搜索（关闭）
支持 Firefox（关闭）

```
2. 设置 → 搜索
```txt
在结果页的地址栏中显示搜索词（取消）
在隐私窗口中显示（开启）
地址栏（以下全部取消）
快捷方式(S)
建议使用的搜索引擎(A)

```

---

## 八、制作快捷方式的 BAT 脚本
在 `core` **同级目录**下新建文本文件（如 `快捷方式.txt`），粘贴以下内容后保存，并将扩展名改为 `.bat`（如 `快捷方式.bat`），运行后将生成的快捷方式移至桌面即可：
```batch
@echo off
setlocal enabledelayedexpansion

set "CORE=%~dp0core"

:: 智能检测
if exist "%CORE%\zen.exe" (
    set "EXE=zen.exe"
    set "LNK=Zen.lnk"
) else if exist "%CORE%\firefox.exe" (
    set "EXE=firefox.exe"
    set "LNK=Firefox.lnk"
) else (
    echo [错误] 未找到浏览器核心
    pause
    exit /b
)

:: 使用 PowerShell 一键创建快捷方式 (无需临时文件)
powershell -NoProfile -Command "$ws=New-Object -ComObject WScript.Shell;$s=$ws.CreateShortcut('%~dp0!LNK!');$s.TargetPath='%CORE%\!EXE!';$s.WorkingDirectory='%~dp0';$s.Save()"

echo [完成] 快捷方式已创建。
pause

```

---

## 九、Zen 设置中文界面
`···` → `Settings` → `Language` → 选择 **简体中文**

---

## 十、安装扩展
| 扩展 | 说明 | 链接 |
|------|------|------|
| mozlz4-edit | 编辑 search.json.mozlz4 | https://addons.mozilla.org/zh-CN/firefox/addon/mozlz4-edit |
| uBlock Origin | 广告过滤，安装需翻墙 | https://addons.mozilla.org/zh-CN/firefox/addon/ublock-origin |
| Undo Close Tab | 找回已关闭的标签页 | https://addons.mozilla.org/zh-CN/firefox/addon/undoclosetabbutton |
| IDM Integration Module | IDM 下载集成 | https://addons.mozilla.org/zh-CN/firefox/addon/tonec-idm-integration-module |
| Tampermonkey | 篡改猴，用户脚本管理 | https://addons.mozilla.org/en-US/firefox/addon/tampermonkey |

---

## 十一、安装脚本
| # | 脚本名称 | 说明 | 来源 |
|---|---------|------|------|
| 1 | LinkSwift | （改）网盘直链下载助手 | https://github.com/hmjz100/LinkSwift |
| 2 | redirect 外链跳转 | 外链跳转处理 | https://github.com/sakura-flutter/tampermonkey-scripts |
| 3 | 骚扰拦截 | 拦截骚扰内容 | https://github.com/AirBashX/UserScript |
| 4 | Github 增强 - 高速下载 | GitHub 加速下载 | https://github.com/XIU2/UserScript |
| 5 | 视频网页全屏（改） | 视频最大化 | https://greasyfork.org/zh-CN/scripts/495077-maximize-video-improve |
| 6 | 右键在新标签中打开图片时显示最优化图像质量 v2 | 图片质量优化 | https://greasyfork.org/zh-CN/scripts/502608 |
| 7 | 公众号阅读助手 | 微信公众号阅读 | https://greasyfork.org/zh-CN/scripts/461342 |
| 8 | 一键查询社交网站 | 社交平台查询 | https://greasyfork.org/zh-CN/scripts/531387 |
| 9 | 网易云音乐助手 | 网易云音乐辅助 | https://greasyfork.org/zh-CN/scripts/531392 |
| 10 | 网易云音乐直接下载 | 网易云音乐下载 | https://greasyfork.org/zh-CN/scripts/33046 |
| 11 | Pixiv Previewer | Pixiv 预览 | https://greasyfork.org/zh-CN/scripts/30766 |
| 12 | YouTube 浏览助手 | YouTube 辅助 | https://greasyfork.org/zh-CN/scripts/543423 |
| 13 | Bilibili 浏览助手 | Bilibili 辅助 | https://greasyfork.org/zh-CN/scripts/531394 |
| 14 | Bilibili-Evolved | Bilibili 增强 | https://github.com/the1812/Bilibili-Evolved |
| 15 | 百度谷歌必应链接缩短 | 搜索引擎链接缩短 | https://greasyfork.org/zh-CN/scripts/443491 |
| 16 | searchEngineJump | 搜索引擎快捷跳转 | https://github.com/qxinGitHub/searchEngineJump |
| 17 | 网页限制解除(改) | 解除网页限制 | https://greasyfork.org/zh-CN/scripts/28497 |

---

## 十二、更新升级
当 Zen 或 Firefox 浏览器发布新版本时，可通过以下步骤进行便携版升级：
1. **备份旧版**：将 `D:\Zen\core` 重命名为 `D:\Zen\core1`；或 将 `D:\Firefox\core` 重命名为 `D:\Firefox\core1`。
2. **重新制作**：重复上述的**步骤三**和**步骤四**（即：解压新版 Zen 或 Firefox 安装包的 `core`、放入 libportable 文件、运行 `injectpe.bat` 注入、配置 `portable.ini` 缓存路径）。
3. 双击 `D:\Zen\core\Zen.exe` 或 `D:\\Firefox\core\Zen.exe` 启动浏览器，在地址栏输入 `about:support`，检查**配置文件夹**栏。确认一切正常后，即可删除 `core1` 备份目录。
4. 自动化 BAT 脚本。在 `core` **同级目录**下新建文本文件（如 `更新升级.txt`），粘贴以下内容后保存，编码修改为`简体中文(GBK,GB2312)`，并将扩展名改为 `.bat`（如 `更新升级.bat`），运行即可。
> 以 Notepad4 为例设置编码，文件 → 编码 → 更多（或按F9），选择`简体中文(GBK,GB2312)`

::: details 更新升级 BAT 脚本

```batch
@echo off
setlocal enabledelayedexpansion

:: ============================================================
:: 设置变量
:: ============================================================
set "BASE_DIR=%~dp0"
if "%BASE_DIR:~-1%"=="\" set "BASE_DIR=%BASE_DIR:~0,-1%"

set "CORE_DIR=%BASE_DIR%\core"
set "CORE_BAK=%BASE_DIR%\core1"
set "TOOLS_DIR=%BASE_DIR%\tools"
set "Profiles_DIR=%BASE_DIR%\Profiles"
set "PORTABLE_7Z=%TOOLS_DIR%\portable_bin.7z"

@echo ============================================================
@echo  Firefox 便携版一键更新/初始化脚本
@echo  支持：火狐浏览器（Firefox）和禅浏览器（Zen）
@echo ============================================================
@echo.

:: ------------------------------------------------------------
:: 1. 检测 7-Zip
:: ------------------------------------------------------------
echo [信息] 正在检查 7-Zip...
set "SEVEN_ZIP="
where 7z.exe >nul 2>nul && set "SEVEN_ZIP=7z.exe"
if not defined SEVEN_ZIP (
    if exist "C:\Program Files\7-Zip\7z.exe" set "SEVEN_ZIP=C:\Program Files\7-Zip\7z.exe"
    if exist "C:\Program Files (x86)\7-Zip\7z.exe" set "SEVEN_ZIP=C:\Program Files (x86)\7-Zip\7z.exe"
)
if not defined SEVEN_ZIP (
    echo [错误] 未找到 7-Zip。
    pause
    exit /b 1
)
echo [信息] 找到 7-Zip: %SEVEN_ZIP%

:: ------------------------------------------------------------
:: 2. 智能检测安装包 (Zen 优先，Firefox 作为并列选项)
:: ------------------------------------------------------------
echo [信息] 正在查找浏览器安装包...
set "INSTALLER="

:: 选项A: 检测 Zen 专用包
if exist "%TOOLS_DIR%\zen.installer.exe" (
    set "INSTALLER=%TOOLS_DIR%\zen.installer.exe"
    echo [信息] 检测到: zen.installer.exe
)

:: 选项B: 如果没有 Zen，则检测 Firefox 模糊匹配
if not defined INSTALLER (
    if exist "%TOOLS_DIR%\" (
        for %%f in ("%TOOLS_DIR%\Firefox Setup*.exe") do (
            if not defined INSTALLER set "INSTALLER=%%~f"
        )
        if defined INSTALLER (
            echo [信息] 检测到: !INSTALLER!
        )
    )
)

:: 最终校验
if not defined INSTALLER (
    echo [错误] 未找到安装包！
    echo 请将以下文件之一放入 tools 目录：
    echo   1. zen.installer.exe（禅浏览器）
    echo   2. Firefox Setup xxx.exe（火狐浏览器）
    echo.
    pause
    exit /b 1
)

:: ------------------------------------------------------------
:: 3. 检查便携工具包
:: ------------------------------------------------------------
echo [信息] 正在检查便携工具包...
if not exist "%PORTABLE_7Z%" (
    echo [错误] 缺少 %PORTABLE_7Z%
    pause
    exit /b 1
)

:: ------------------------------------------------------------
:: 4. 关闭浏览器进程
:: ------------------------------------------------------------
echo [信息] 正在检查残留进程...
tasklist /FI "IMAGENAME eq zen.exe" 2>NUL | find /I "zen.exe" >NUL && (
    echo [错误] Zen 正在运行，请关闭后重试。
    pause
    exit /b 1
)
tasklist /FI "IMAGENAME eq firefox.exe" 2>NUL | find /I "firefox.exe" >NUL && (
    echo [错误] Firefox 正在运行，请关闭后重试。
    pause
    exit /b 1
)

:: ------------------------------------------------------------
:: 5. 备份旧版 core
:: ------------------------------------------------------------
set "HAS_BACKUP=0"
if exist "%CORE_DIR%" (
    echo [1/5] 正在备份旧版 core...
    if exist "%CORE_BAK%" rmdir /s /q "%CORE_BAK%"
    rename "%CORE_DIR%" "core1"
    if not exist "%CORE_BAK%" (
        echo [错误] 备份失败。
        pause
        exit /b 1
    )
    set "HAS_BACKUP=1"
) else (
    echo [1/5] 创建新 core 目录...
    mkdir "%CORE_DIR%"
)

:: ------------------------------------------------------------
:: 6. 解压浏览器核心
:: ------------------------------------------------------------
echo [2/5] 正在解压浏览器核心...
"%SEVEN_ZIP%" x "%INSTALLER%" core -o"%BASE_DIR%\" -y >nul 2>&1

if not exist "%CORE_DIR%\zen.exe" (
    if not exist "%CORE_DIR%\firefox.exe" (
        echo [错误] 解压失败。
        goto :RestoreOld
    )
)

:: ------------------------------------------------------------
:: 7. 解压便携工具包 (关键：修复感叹号转义)
:: ------------------------------------------------------------
echo [3/5] 正在解压便携工具包...
"%SEVEN_ZIP%" e "%PORTABLE_7Z%" -o"%CORE_DIR%" -x^^!portable32.dll -x^^!upcheck32.exe -y >nul 2>&1

if %errorlevel% neq 0 (
    echo [错误] 工具包解压失败。
    pause
    goto :RestoreOld
)

:: ------------------------------------------------------------
:: 8. 注入 DLL
:: ------------------------------------------------------------
if exist "%CORE_DIR%\injectpe.bat" (
    echo [4/5] 正在注入 DLL...
    pushd "%CORE_DIR%"
    cmd /c injectpe.bat <nul 2>nul
    popd
) else (
    echo [警告] 跳过注入步骤。
)

:: ------------------------------------------------------------
:: 9. 解压 distribution
:: ------------------------------------------------------------
if exist "%TOOLS_DIR%\distribution.7z" (
    "%SEVEN_ZIP%" x "%TOOLS_DIR%\distribution.7z" -o"%CORE_DIR%" -y -aoa >nul 2>&1
)

:: ------------------------------------------------------------
:: 10. 复制配置文件
:: ------------------------------------------------------------
if not exist "%Profiles_DIR%" mkdir "%Profiles_DIR%"
if exist "%TOOLS_DIR%\search.json.mozlz4" copy /y "%TOOLS_DIR%\search.json.mozlz4" "%Profiles_DIR%\" >nul
if exist "%TOOLS_DIR%\user.js" copy /y "%TOOLS_DIR%\user.js" "%Profiles_DIR%\" >nul

:: ------------------------------------------------------------
:: 11. 修改 portable.ini
:: ------------------------------------------------------------
echo [5/5] 配置 portable.ini...
powershell -NoProfile -Command "$content = Get-Content '%CORE_DIR%\portable.ini' -Raw -Encoding UTF8; $content -replace '(?m)^TmpDataPath=.*$', 'TmpDataPath=../Cache' | Set-Content '%CORE_DIR%\portable.ini' -NoNewline -Encoding UTF8"

:: ------------------------------------------------------------
:: 12. 清理与完成
:: ------------------------------------------------------------
if %HAS_BACKUP% equ 1 rmdir /s /q "%CORE_BAK%"
del /f /q "%INSTALLER%"
echo.
echo ==========================================
echo 更新完成！请运行 core\zen(firefox).exe 测试。
echo ==========================================
pause
exit /b 0

:RestoreOld
echo [恢复] 正在还原旧版...
rmdir /s /q "%CORE_DIR%" 2>nul
if %HAS_BACKUP% equ 1 rename "%CORE_BAK%" "core"
pause
exit /b 1

```
:::

## 十三、便携版目录结构

https://wwbcy.lanzouu.com/b00g471l4f ，密码:34j9
