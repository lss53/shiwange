---
title: 使用 libportable 将 Zen Browser 便携化
shortTitle: 制作 Zen 便携版
date: 2026-05-10
icon: fa-brands fa-firefox-browser
order: 11
category:
  - 软件工具
tag:
  - Zen
  - 便携版
  - libportable
  - 浏览器
description: 使用 libportable 开源库将 Zen Browser 浏览器便携化，实现配置文件与程序目录绑定、无注册表残留、即拷即用的绿色使用体验。
---
## 一、下载 Zen 安装包
前往以下任一地址下载 Windows 64bit 安装包：
- 官方下载页：`https://zen-browser.app/download/`
- GitHub Releases：`https://github.com/zen-browser/desktop/releases`，下载 `zen.installer.exe`

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
## 三、制作带 libportable 的 Zen 便携版
### 1. 新建目录
例如 `D:\zen`
> ⚠️ 路径中**不要包含中文和空格**，以免出现异常问题。
### 2. 解压 Zen 安装包
使用 7-Zip / Bandizip 等工具打开 `zen.installer.exe`，将 `core` 文件夹拖至 `D:\zen` 目录，然后关闭工具。
### 3. 放入 libportable 文件
使用 7-Zip / Bandizip 等工具打开 `portable_bin.7z`，将其中**portable64.dll、upcheck64.exe、portable(example).ini、injectpe.bat**拖至 `D:\zen\core` 目录，然后关闭工具。

### 4. 运行 injectpe.bat 注入 portable64.dll
打开 `D:\zen\core`，双击运行 `injectpe.bat`，按提示完成操作。

---

## 四、配置 portable.ini（修改缓存路径）
打开 `D:\zen\core\portable.ini`，将缓存路径修改为：
```ini
TmpDataPath=../Cache
```
> 使用相对路径 `..\` 表示上级目录，这样整个 `zen` 文件夹可随意拷贝至任意位置使用。

---

## 五、测试是否制作成功
1. 双击 `D:\zen\core\zen.exe` 启动浏览器
   →，Skip，Next，Next，Next，Dive in!
2. 在地址栏输入 `about:support`，找到**配置文件夹**栏
   - 若路径指向 `D:\zen\core\Profiles`，则说明制作成功

---

## 六、制作快捷方式的 BAT 脚本
在 `core` **同级目录**下新建文本文件（如 `快捷方式.txt`），粘贴以下内容后保存，并将扩展名改为 `.bat`（如 `快捷方式.bat`），运行后将生成的快捷方式移至桌面即可：
```batch
@echo off
echo set WshShell = WScript.CreateObject("WScript.Shell")>tmp.vbs
echo set oShellLink = WshShell.CreateShortcut("%~dp0" ^& "\Zen.lnk")>>tmp.vbs
echo oShellLink.TargetPath ="%~dp0core\zen.exe">>tmp.vbs
echo oShellLink.WindowStyle ="1">>tmp.vbs
echo oShellLink.IconLocation = "%~dp0core\zen.exe">>tmp.vbs
echo oShellLink.Description = "">>tmp.vbs
echo oShellLink.WorkingDirectory = "%~dp0">>tmp.vbs
echo oShellLink.Save>>tmp.vbs
call tmp.vbs
del /f /q tmp.vbs
```

---

## 七、设置中文界面
`···` → `Settings` → `Language` → 选择 **简体中文**

---

## 八、安装扩展
| 扩展 | 说明 | 链接 |
|------|------|------|
| mozlz4-edit | 编辑 search.json.mozlz4 | https://addons.mozilla.org/zh-CN/firefox/addon/mozlz4-edit |
| uBlock Origin | 广告过滤，安装需翻墙 | https://addons.mozilla.org/zh-CN/firefox/addon/ublock-origin |
| Undo Close Tab | 找回已关闭的标签页 | https://addons.mozilla.org/zh-CN/firefox/addon/undoclosetabbutton |
| IDM Integration Module | IDM 下载集成 | https://addons.mozilla.org/zh-CN/firefox/addon/tonec-idm-integration-module |
| Tampermonkey | 篡改猴，用户脚本管理 | https://addons.mozilla.org/en-US/firefox/addon/tampermonkey |

---

## 九、安装脚本
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
| 17 | 网页限制解除(改 | 解除网页限制 | https://greasyfork.org/zh-CN/scripts/28497 |

---

## 十、更新升级
当 Zen 浏览器发布新版本时，可通过以下步骤进行便携版升级：
1. **备份旧版**：将 `D:\zen\core` 重命名为 `D:\zen\core1`。
2. **重新制作**：重复上述的**步骤三**和**步骤四**（即：解压新版 Zen 安装包的 `core`、放入 libportable 文件、运行 `injectpe.bat` 注入、配置 `portable.ini` 缓存路径）。
3. 双击 `D:\zen\core\zen.exe` 启动浏览器，在地址栏输入 `about:support`，检查**配置文件夹**栏。确认一切正常后，即可删除 `core1` 备份目录。
4. 自动化 BAT 脚本。在 `core` **同级目录**下新建文本文件（如 `更新升级.txt`），粘贴以下内容后保存，并将扩展名改为 `.bat`（如 `更新升级.bat`），运行即可.
``````batch
@echo off
setlocal

set "BASE_DIR=%~dp0"
set "CORE_DIR=%BASE_DIR%core"
set "CORE_BAK=%BASE_DIR%core1"
set "TOOLS_DIR=%BASE_DIR%tools"
set "INSTALLER=%TOOLS_DIR%\zen.installer.exe"
set "PORTABLE_7Z=%TOOLS_DIR%\portable_bin.7z"

@echo ============================================================
@echo  Zen 便携版一键更新脚本（智能版）
@echo  功能：自动备份旧版、解压新版、排除32位文件、保留配置
@echo  特性：全自动静默、错误回滚、适应未来文件变化
@echo ============================================================
@echo.

:: ------------------------------------------------------------
:: 1. 检测 7-Zip
:: ------------------------------------------------------------
set "SEVEN_ZIP="
where 7z.exe >nul 2>nul && set "SEVEN_ZIP=7z.exe"
if not defined SEVEN_ZIP (
    if exist "C:\Program Files\7-Zip\7z.exe" set "SEVEN_ZIP=C:\Program Files\7-Zip\7z.exe"
    if exist "C:\Program Files (x86)\7-Zip\7z.exe" set "SEVEN_ZIP=C:\Program Files (x86)\7-Zip\7z.exe"
)
if not defined SEVEN_ZIP (
    echo [错误] 未找到 7-Zip，请安装后重试。
    pause
    exit /b 1
)

:: ------------------------------------------------------------
:: 2. 检查必要文件
:: ------------------------------------------------------------
if not exist "%INSTALLER%" (
    echo [错误] 缺少 %INSTALLER%
    pause
    exit /b 1
)
if not exist "%PORTABLE_7Z%" (
    echo [错误] 缺少 %PORTABLE_7Z%
    pause
    exit /b 1
)
if not exist "%CORE_DIR%" (
    echo [错误] 未发现 core 目录，请确认脚本放在 Zen 根目录。
    pause
    exit /b 1
)

:: ------------------------------------------------------------
:: 3. 关闭 Zen 浏览器
:: ------------------------------------------------------------
tasklist /FI "IMAGENAME eq zen.exe" 2>NUL | find /I "zen.exe" >NUL
if %errorlevel% equ 0 (
    echo [错误] Zen 浏览器正在运行，请关闭后重试。
    pause
    exit /b 1
)

:: ------------------------------------------------------------
:: 4. 备份旧版 core 为 core1
:: ------------------------------------------------------------
echo [1/4] 正在备份旧版...
if exist "%CORE_BAK%" rmdir /s /q "%CORE_BAK%"
rename "%CORE_DIR%" "core1"
if not exist "%CORE_BAK%" (
    echo [错误] 备份失败，请检查是否有程序占用 core 目录。
    pause
    exit /b 1
)

:: ------------------------------------------------------------
:: 5. 解压新版 Zen 的 core 目录
:: ------------------------------------------------------------
echo [2/4] 正在解压新版 Zen...
"%SEVEN_ZIP%" x "%INSTALLER%" core -o"%BASE_DIR%" -y >nul 2>&1
if not exist "%CORE_DIR%" (
    echo [错误] 解压新版 Zen 失败，正在恢复旧版...
    rename "%CORE_BAK%" "core"
    pause
    exit /b 1
)

:: ------------------------------------------------------------
:: 6. 解压 libportable 工具包（自动排除 32 位文件）
:: ------------------------------------------------------------
echo [3/4] 正在解压便携工具包...
"%SEVEN_ZIP%" e "%PORTABLE_7Z%" -o"%CORE_DIR%" -x!portable32.dll -x!upcheck32.exe -y >nul 2>&1
if %errorlevel% neq 0 (
    echo [错误] 解压便携工具包失败，正在恢复旧版...
    rmdir /s /q "%CORE_DIR%"
    rename "%CORE_BAK%" "core"
    pause
    exit /b 1
)

:: ------------------------------------------------------------
:: 8. 静默注入 portable64.dll
:: ------------------------------------------------------------
if not exist "%CORE_DIR%\injectpe.bat" (
    echo [错误] injectpe.bat 不存在，注入失败，正在恢复旧版...
    rmdir /s /q "%CORE_DIR%"
    rename "%CORE_BAK%" "core"
    pause
    exit /b 1
)
echo [4/4] 正在注入 DLL...
:: 进入 core 目录
pushd "%CORE_DIR%"
:: <nul 自动跳过所有 pause，2>nul 屏蔽脚本自毁引发的报错
cmd /c injectpe.bat <nul 2>nul
:: 用 popd 退回原目录，因为后面相对路径的操作
popd
:: ------------------------------------------------------------
:: 7. 恢复用户配置 portable.ini (在注入前恢复，以免被覆盖)
:: ------------------------------------------------------------
if exist "%CORE_BAK%\portable.ini" (
    copy /y "%CORE_BAK%\portable.ini" "%CORE_DIR%\" >nul
)

:: ------------------------------------------------------------
:: 9. 删除备份目录（确认注入步骤已走过，安全删除）
:: ------------------------------------------------------------
rmdir /s /q "%CORE_BAK%"

echo ========================================
echo 更新完成！请运行 core\zen.exe 测试。
echo ========================================
pause
exit /b 0

```