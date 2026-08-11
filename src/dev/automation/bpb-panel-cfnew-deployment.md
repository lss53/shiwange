---
title: BPB Panel 与 CFnew 快速部署教程
shortTitle: Worker 代理搭建
date: 2025-10-27
icon: cloud
order: 5
category:
  - 自动化脚本
tag:
  - Cloudflare
  - BPB Panel
  - CFnew
  - Worker
description: 详细介绍 BPB Panel 自动化部署与 CFnew 手动搭建流程，涵盖环境配置、KV 绑定及客户端使用，助你快速构建 Cloudflare Worker 代理服务。
---

## BPB Panel 快速入门（三步完成部署）
### 第一步：准备工作
1. **Cloudflare 账户**：准备一个已验证邮箱的 [Cloudflare 账户](https://dash.cloudflare.com/sign-up)。  
2. **安装渠道**：
   - **Web 版（强烈推荐）**：访问 [https://wizard.bpb-panel.workers.dev](https://wizard.bpb-panel.workers.dev) 进行一键安装。
   - **CLI 版**：适用于 Windows PowerShell、Linux/macOS 终端或 Android Termux。命令如下：
     ```powershell
     # Windows PowerShell
     irm https://raw.githubusercontent.com/bia-pain-bache/BPB-Wizard/main/install.ps1 | iex
     ```
     ```bash
     # Linux / macOS / Android Termux
     bash <(curl -fsSL https://raw.githubusercontent.com/bia-pain-bache/BPB-Wizard/main/install.sh)
     ```
> **Termux 用户重要提示**：  
> - 必须从 GitHub Release 或 F‑Droid 安装 Termux，从 Google Play 安装可能导致兼容性问题。  
> - 安装前请**断开所有 VPN**。
---
### 第二步：执行安装
以 **Web 版** 为例：
1. 访问 [Wizard](https://wizard.bpb-panel.workers.dev)。  
2. [创建令牌](https://dash.cloudflare.com/profile/api-tokens?permissionGroupKeys=%5B%7B%22key%22%3A%22workers_scripts%22%2C%22type%22%3A%22edit%22%7D%2C%7B%22key%22%3A%22workers_kv_storage%22%2C%22type%22%3A%22edit%22%7D%2C%7B%22key%22%3A%22page%22%2C%22type%22%3A%22edit%22%7D%2C%7B%22key%22%3A%22dns%22%2C%22type%22%3A%22edit%22%7D%2C%7B%22key%22%3A%22user_details%22%2C%22type%22%3A%22read%22%7D%5D&accountId=*&zoneId=all&name=BPB-Wizard)：  
   点击 “Continue to summary（继续以显示摘要）”，然后点击 “Create Token（创建令牌）”并复制令牌。  
3. 将令牌粘贴到**钥匙图标**后的输入框中，选择部署方式（推荐选择 **Cloudflare Workers**，更简单），然后执行安装。  
4. 等待几秒完成安装。页面会显示你的**面板地址**，请立即保存。此链接可用于后续一键重装。**请勿将此链接分享给他人**。
---
### 第三步：初始配置
1. 使用面板地址登录。首次需要设置**管理员密码**，请立即保存。  
2. 在 **管理员（Admin）** 中：
   - **设置（Settings）**：
     - **更新面板（Update Panel）**：有新版本时按钮会激活，点击即可更新。  
     - **重置密码（Reset Password）**：用于修改密码。  
     - **删除面板（Delete Panel）**：用于彻底移除部署。  
   - **Telegram 机器人（Telegram Bot）**：
     - 从 @BotFather 获取 Token，从 @userinfobot 获取你的 User ID，**分别**填入 **Telegram Bot Token** 和 **Telegram User ID**。  
     - 功能：获取订阅链接、查看流量、下载客户端配置。
3. 在 **代理设置（Proxy Settings）** 中：
   - **常规（Common）**：
     - **自定义域名（Custom Domain）**：输入你的域名。  
     - **Panel - 订阅路径（Panel - Subscriptions Path）**：可自定义（请立即保存），也可保持默认。  
   - **VLESS - Trojan**：
     - **TLS Ports**：可**全部勾选**，或保持默认。  
     - **Proxy IP**：将 **Mode** 选择为 **NAT64**；打开 [NAT64 Prefixes](https://github.com/bia-pain-bache/BPB-Worker-Panel/blob/main/docs/NAT64Prefixes.md)，复制全部内容，只粘贴 `NAT64 Prefix` 列的内容。
4. 点击 **应用（Apply）**，保存以上所有设置。  
5. 支持的客户端（Supported Clients），比如下载 [v2rayN](https://github.com/2dust/v2rayN/releases/latest)。  
6. 订阅链接（Subscriptions），选择 **Normal（正常）**，点击**v2rayN(G)**后面的图标，复制订阅网址（Copy subscription URL）。  
7. 在 v2rayN 中：
   - 配置项 → 从剪贴板导入分享链接（Ctrl+V）。  
   - 使用 **Best Ping（最佳延迟）** 线路，让客户端自动在各端口间测速并选择最快的；  
   - 或手动测试，选择在你这边最稳定、最快的端口。
---
### 参考资源
- https://www.youtube.com/watch?v=7HyZCugDwu8  
- https://hanscn.com/post/bpb  
- https://www.kekehub.com/2025/09/bpbnat.html  
- https://bia-pain-bache.github.io/BPB-Worker-Panel/installation/pages-manual
---
## CFnew 快速入门（四步完成部署）
### 第一步：准备工作与代码部署
1. **Cloudflare 账户**：准备一个已验证邮箱的 [Cloudflare 账户](https://dash.cloudflare.com/sign-up)。  
2. **创建 Worker 项目**：
   - 路径：控制台 → 计算 → Workers 和 Pages → 创建应用程序。  
   - 部署：选择 **“从 Hello World! 开始”** → 设置 Worker name（可自定义前缀） → 点击 **部署**。  
3. **编辑代码**：
   - 点击 **编辑代码** 进入编辑器。  
   - 删除 `worker.js` 中的所有原有代码。  
   - 打开 [cfnew](https://github.com/byjoey/cfnew) 仓库，找到并单击文件 **“少年你相信光吗”**，复制全部代码。  
   - 将复制的代码粘贴到 `worker.js` 中，点击右上角 **部署**。
---
### 第二步：配置环境变量
1. 进入 Worker 项目 → **设置** → **变量与密钥**。  
2. 点击 **添加变量**：
   - **变量名称**：输入 `u`。  
   - **值**：复制 [v2rayN](https://github.com/2dust/v2rayN/releases/latest) 生成的 `uuid`。  
     - *生成方法*：打开 v2rayN → 配置项 → 添加 VMess → 点击“用户ID”旁的生成按钮。  
3. 点击 **添加1个变量** 并保存。
---
### 第三步：创建 Workers KV 存储
1. 路径：控制台 → 存储与数据库 → **Workers KV**。  
2. 点击 **Create Instance（创建实例）**。  
3. 输入命名空间名称（可自定义），点击 **创建**。
---
### 第四步：绑定 KV 与订阅配置
1. 返回 Worker 项目 → **设置** → **绑定**。  
2. 点击 **添加绑定**：
   - 选择类型：**KV 命名空间**。  
   - 变量名称：输入 `C`（大写）。  
   - KV 命名空间：选择第三步创建的命名空间。  
   - 点击 **添加绑定** 并保存。  
3. **开始使用**：
   - 点击 Worker 页面左上角的 **访问** 按钮。  
   - 输入第二步设置的 `uuid`，回车进入订阅中心。  
   - 找到 **协议选择**，勾选所有选项（或保持默认）。  
   - 找到 **选择客户端**，点击 `V2RAY` 复制订阅链接。  
   - 下载 [v2rayN](https://github.com/2dust/v2rayN/releases/latest)，导入订阅链接。
---
### 参考资源
- https://www.youtube.com/watch?v=7JpLr_dz0x0

