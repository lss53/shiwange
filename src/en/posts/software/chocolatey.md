---
title: Installing Chocolatey
icon: gears
date: 2024-12-23
category:
  - software
tag:
  - Chocolatey

---

Install Chocolatey for Individual Use:

1. First, ensure that you are using an [administrative shell](https://www.howtogeek.com/194041/how-to-open-the-command-prompt-as-administrator-in-windows-10/) - you can also install as a non-admin, check out [Non-Administrative Installation](https://docs.chocolatey.org/en-us/choco/setup#non-administrative-install).

2. Install with powershell.exe

::: info

Please inspect https://community.chocolatey.org/install.ps1 prior to running any of these scripts to ensure safety. We already know it's safe, but you should verify the security and contents of any script from the internet you are not familiar with. All of these scripts download a remote PowerShell script and execute it on your machine. We take security very seriously. [Learn more about our security protocols](https://docs.chocolatey.org/en-us/information/security).
:::

With PowerShell, you must ensure [Get-ExecutionPolicy](https://go.microsoft.com/fwlink/?LinkID=135170) is not Restricted. We suggest using to bypass the policy to get things installed or for quite a bit more security.`Bypass` `AllSigned`

- Run.If it returns,then run or.`Get-ExecutionPolicy` `Restricted` `Set-ExecutionPolicy AllSigned` `Set-ExecutionPolicy Bypass -Scope Process`

Now run the following command:

```shell
Set-ExecutionPolicy Bypass -Scope Process -Force; [System.Net.ServicePointManager]::SecurityProtocol = [System.Net.ServicePointManager]::SecurityProtocol -bor 3072; iex ((New-Object System.Net.WebClient).DownloadString('https://community.chocolatey.org/install.ps1'))
```

3. Paste the copied text into your shell and press Enter.

4. Wait a few seconds for the command to complete.

5. If you don't see any errors, you are ready to use Chocolatey! Type or now, or see Getting Started for usage instructions.`choco` `choco -?`

