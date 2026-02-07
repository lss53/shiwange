---
title: PyStand：Python 独立部署环境
shortTitle: PyStand
date: 2026-02-07
icon: fa-brands fa-python
order: 9
category:
  - Windows 软件
tag:
  - python
  - 开源
description: Python 独立部署环境。Python 3.5 以后，Windows 下面都有一个 Embedded Python 的独立 Python 运行环境，这个 PyStand 就是配合 Embedded Python 使用的。
---

1. 安装 [Python Release Python 3.8.10](https://www.python.org/downloads/release/python-3810/)

> 为什么选择 3.8 ? 因为 3.8 是最后一个支持 Win7 的版本，3.9 以后就不支持了。那么为什么选择 32 位？因为打包出来 32 位是最紧凑的，64 位会大很多，除非你要一次性在内存里 load 2GB 以上的数据，否则基本就选择 32 位的。

2. 新建一个干净的虚拟环境

用 cmd.exe 进入D盘，运行 `python -m venv test` 新建一个干净的虚拟环境。

3. 虚拟环境安装你需要的包

用 cmd.exe 进入 Scripts 目录，运行 `activate` 后，用 `pip install 包名1 包名2` 安装你需要的包。

4. 精简你需要的包

到上一步的虚拟环境 Lib/site-packages 里，把全部内容复制到`PyStand\site-packages`中，用 cmd.exe 进入 `PyStand\site-packages` 目录，运行 `dir /b /s >列出目录和子目录中的文件.txt`后，再把python代码和`PyStand\site-packages\列出目录和子目录中的文件.txt`中的路径扔给AI分析，让它你需要的包哪些内容需要删除，最后运行你的程序测试下AI推荐的删除内容行不行，不行的又拷贝回来。

5. 参考：
- https://github.com/skywind3000/PyStand
- https://skywind.me/blog/archives/3002