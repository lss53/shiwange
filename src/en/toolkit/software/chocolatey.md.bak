---
title: "How to Install Chocolatey on Windows"
shortTitle: "Install Chocolatey"
description: "A step-by-step guide to installing Chocolatey, the package manager for Windows, using PowerShell. Easily manage your software from the command line."
icon: fa-solid fa-box-open
date: 2024-12-23
category:
  - Windows Apps
tag:
  - Chocolatey
  - Windows
  - Package Manager
---

This guide will walk you through installing Chocolatey for individual use.

### Step 1: Open an Administrative Shell

First, ensure you are using a shell with administrative privileges. [7, 8] For non-administrative installation options, please refer to the official [Non-Administrative Installation guide](https://docs.chocolatey.org/en-us/choco/setup#non-administrative-install).

### Step 2: Configure PowerShell Execution Policy

To install Chocolatey using PowerShell, you must ensure your `Get-ExecutionPolicy` is not set to `Restricted`. [7, 8] It is recommended to use `Bypass` for the installation process or `AllSigned` for enhanced security. [1, 7, 8]

You can check your current execution policy by running:
```shell
Get-ExecutionPolicy
```

If it returns `Restricted`, run the following command to allow the installation script to execute for the current process:
```shell
Set-ExecutionPolicy Bypass -Scope Process
```

::: info Security Note

Before running scripts from the internet, it is crucial to inspect their contents to ensure they are safe. The Chocolatey installation script at `https://community.chocolatey.org/install.ps1` downloads and executes a remote PowerShell script on your machine. While the script is known to be secure, you should always verify unfamiliar scripts yourself. Chocolatey is committed to security; you can [learn more about their security protocols](https://docs.chocolatey.org/en-us/information/security). [7]
:::

### Step 3: Run the Installation Command

Once your execution policy is set, paste the following command into your PowerShell terminal and press **Enter** to begin the installation:

```shell
Set-ExecutionPolicy Bypass -Scope Process -Force; [System.Net.ServicePointManager]::SecurityProtocol = [System.Net.ServicePointManager]::SecurityProtocol -bor 3072; iex ((New-Object System.Net.WebClient).DownloadString('https://community.chocolatey.org/install.ps1'))
```

### Step 4: Verify the Installation

Wait a few moments for the command to complete. If no errors appear, Chocolatey has been successfully installed. [1, 7] You can now verify the installation by typing `choco` or `choco -?` into your shell. For further instructions, refer to the official Getting Started guide.
```