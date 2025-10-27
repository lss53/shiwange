---
title: Rust Windows 安装与配置完整指南（使用 MinGW64）
shortTitle: Rust Windows 安装指南
date: 2025-10-27
icon: rust
order: 8
category:
- Windows 软件
tag:
  - Rust
  - Windows
  - MinGW
  - 开发环境
  - 编程语言
description: 本文详细介绍了在 Windows 系统上使用 MinGW64 工具链安装和配置 Rust 开发环境的完整步骤，包括 MinGW64 下载安装、环境变量配置、Rust 安装、Cargo 镜像加速以及常用开发工具配置。
---

## 为什么需要 MinGW？

Rust 在 Windows 上默认使用 MSVC 工具链，直接运行 `rustup-init.exe` 会安装相关组件到 C 盘，占用大量空间。为避免这种情况，推荐使用轻量级的 MinGW64 作为替代方案。

## 编译环境配置

### 下载 MinGW64

从 GitHub 发布页下载 MinGW64（如遇访问问题，可尝试使用网络加速工具）：
https://github.com/niXman/mingw-builds-binaries/releases

**版本选择说明**：
- **x86_64**：64 位 x86 处理器架构
- **posix**：适用于 Linux、UNIX 等 POSIX 系统
- **win32**：适用于 Windows 系统
- **seh**：使用结构化异常处理
- **msvcrt**：Microsoft 旧版运行时库（兼容旧系统）
- **ucrt**：新版通用 C 运行时库（Windows 10+ 推荐）

> 推荐使用 UCRT 版本以获得更好的兼容性和性能，如需兼容旧系统可选择 MSVCRT 版本。

以 Windows 10 为例，推荐下载：`x86_64-14.2.0-release-win32-seh-ucrt-rt_v12-rev2.7z`

### 安装与配置

1. **解压文件**
   解压到指定目录（如 `D:\mingw64`），路径中建议不要包含中文字符

2. **配置环境变量**
   - 右击此电脑 → 属性 → 高级系统设置 → 高级 → 环境变量
   - 在用户变量的 Path 中添加 MinGW64 的 bin 目录路径（如 `D:\mingw64\bin`）

3. **验证安装**
   在 CMD 或 PowerShell 中执行：
   ```bash
   gcc --version
   ```
   出现类似以下信息表示成功：
   ```
   gcc (x86_64-win32-seh-rev0, Built by MinGW-Builds project) 15.2.0
   Copyright (C) 2025 Free Software Foundation, Inc.
   ```

## Rust 环境准备

为防止 Rust 将依赖包默认安装在 C 盘的 `~/.cargo` 目录（类似 Java 的 Maven 仓库），请设置以下环境变量：

- `CARGO_HOME` → `D:\repository\rust\.cargo`
- `RUSTUP_HOME` → `D:\repository\rust\.rustup`

配置后，Rust 安装时将使用指定位置存放文件。

## 安装 Rust

1. 从官网下载安装程序：https://rust.p2hp.com
2. 运行 `rustup-init.exe`，按以下步骤操作：
   - 选择选项 2（自定义安装）
   - 输入 y 安装 C++ 构建工具
   - 选择自定义安装（选项 2）
   - 输入 `x86_64-pc-windows-gnu`（替代默认的 `x86_64-pc-windows-msvc` 工具链）
   - 其余选项按回车使用默认设置，等待安装完成

3. **验证安装**
   在 CMD 或 PowerShell 中执行：
   ```bash
   rustup --version
   ```
   或
   ```bash
   rustc --version
   ```
   显示版本信息即表示安装成功。

## 配置 Cargo 镜像

在 `CARGO_HOME` 指定目录下创建 `config.toml` 文件，内容如下：

```toml
[source.crates-io]
registry = "https://github.com/rust-lang/crates.io-index"
replace-with = 'aliyun'

# 镜像源配置
# 阿里云
[source.aliyun]
registry = "sparse+https://mirrors.aliyun.com/crates.io-index/"

# rsproxy
[source.rsproxy]
registry = "https://rsproxy.cn/crates.io-index"

[source.rsproxy-sparse]
registry = "sparse+https://rsproxy.cn/index/"

# 清华大学
[source.tuna]
registry = "https://mirrors.tuna.tsinghua.edu.cn/git/crates.io-index.git"

# 中国科学技术大学
[source.ustc]
registry = "https://mirrors.ustc.edu.cn/crates.io-index/"

# 上海交通大学
[source.sjtu]
registry = "https://mirrors.sjtug.sjtu.edu.cn/git/crates.io-index"

# rustcc 社区
[source.rustcc]
registry = "https://code.aliyun.com/rustcc/crates.io-index.git"

[net]
git-fetch-with-cli = true
```

> 推荐使用阿里云或清华大学镜像源以获得更快的下载速度。

## 创建第一个 Rust 项目

验证安装成功后，可以创建并运行第一个 Rust 项目：

```bash
# 创建新项目
cargo new hello_world
cd hello_world

# 运行项目
cargo run
```

如果看到 "Hello, world!" 输出，说明 Rust 环境已正确配置。

## 常用 Rust 开发工具

### 推荐的 IDE 和编辑器

1. **Visual Studio Code** + Rust 插件
2. **IntelliJ IDEA** + Rust 插件
3. **CLion** + Rust 插件

### 有用的 Cargo 命令

```bash
# 项目创建与管理
cargo new project_name          # 创建新的二进制项目
cargo new --lib project_name    # 创建新的库项目
cargo init                     # 在当前目录初始化项目
cargo install crate_name       # 安装二进制 crate
cargo uninstall crate_name     # 卸载二进制 crate

# 构建与编译
cargo build                    # 调试构建
cargo build --release          # 发布构建（优化）
cargo check                    # 快速检查编译错误（不生成可执行文件）
cargo clean                    # 清理构建产物
cargo build --verbose          # 显示详细构建信息

# 运行与测试
cargo run                      # 运行项目
cargo run --release            # 以发布模式运行
cargo run -- args              # 带参数运行
cargo test                     # 运行所有测试
cargo test test_name           # 运行特定测试
cargo test -- --nocapture      # 显示测试中的打印输出
cargo test --lib               # 只运行库测试
cargo test --doc               # 运行文档测试
cargo bench                    # 运行性能基准测试

# 代码质量
cargo fmt                      # 格式化代码（需要安装 rustfmt）
cargo fmt -- --check           # 检查代码格式（不修改）
cargo clippy                   # 代码 lint 检查
cargo clippy -- -D warnings    # 严格模式：将所有警告视为错误
cargo clippy --fix             # 自动修复可修复的问题
cargo audit                    # 检查安全漏洞（需要安装 cargo-audit）

# 依赖管理
cargo update                   # 更新 Cargo.lock 中的依赖版本
cargo update package_name      # 更新特定包
cargo tree                     # 显示依赖树
cargo tree --depth 1           # 显示一级依赖
cargo tree -i package_name     # 显示特定包的被依赖关系
cargo outdated                 # 检查过时的依赖（需要安装 cargo-outdated）

# 文档
cargo doc                      # 生成文档
cargo doc --open               # 生成并打开文档
cargo doc --no-deps            # 仅生成当前项目的文档
cargo rustdoc -- --help        # 查看 rustdoc 选项

# 发布与分发
cargo publish                  # 发布到 crates.io
cargo package                  # 创建发布包
cargo login API_TOKEN          # 登录 crates.io

# 工作区命令
cargo workspace                # 工作区管理（需要安装 cargo-workspace）
cargo members                  # 列出工作区成员

# 配置与信息
cargo version                  # 查看 Cargo 版本
cargo --list                   # 列出所有 Cargo 命令
cargo metadata                 # 以 JSON 格式输出项目元数据
cargo locate-project           # 输出 Cargo.toml 路径

```

## 扩展资源

- **crates.io**: Rust 官方包仓库 - https://crates.io
- **lib.rs**: Rust 包检索平台 - https://lib.rs/search

- **Rust 官方文档**: https://www.rust-lang.org/learn
- **Rust 编程语言书籍**: https://doc.rust-lang.org/book/

## 总结

现在你可以开始愉快的 Rust 编程之旅了！Rust 以其内存安全性和高性能特性，非常适合系统编程、Web 后端、区块链等领域的开发。

**参考文档**: https://blog.csdn.net/qq_45515182/article/details/147470445


