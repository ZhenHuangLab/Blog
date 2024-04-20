---
title: EMAN2.91(WSL)安装QA
seo_title: EMAN2.91(WSL)安装QA
summary: 安装基于WSL环境的EMAN2.91时遭遇的两个问题及其解决方法
description: 
slug: eman2-wsl-install-qa
author: Zhen Huang

draft: false
date: 2022-08-06T17:57:10+08:00
lastmod: 
expiryDate: 
publishDate: 

feature_image: 
feature_image_alt: 

categories:
    - Research Study
tags:
    - cryo-ET
series:
    - EMAN2

toc: true
related: true
social_share: true
newsletter: true
disable_comments: false
math: true
---

这个WSL还是折腾了我一会的，还把EMAN2重装了好几次...不过最后终于解决了，这样就可以在家愉快地处理data啦:D

~~（学校HPC不知道为啥rvpn连不上去，只能把一个小主机留学校做内网穿透了...）~~

## Q1：安装后无法正常打开一些Program

在安装后，我发现我一直无法正常打开`e2display.py`、`e2projectmanager.py`等，报错信息的其中一部分为：

```bash
libGLU.so.1:cannot open shared object file: No such file or directory
```

~~上面其实还有一连串的Traceback，不过我不太记得了，当时也没有截图保存。~~

当时我快急死了，google了一圈也不知道自己漏了什么，还重装了几次，都发生这样的情况。

一开始我以为是Python版本冲突的问题，导致库调用不了，结果更新了也没用；

后来我用CSDN查，以为是漏装了opencv，结果安装了也没解决问题。

## A1：漏装了OpenGL

其实这一点在Tutorial中写得很清楚了，但是我漏了TAT.

特别是这一段千万不能漏：（其余的都在tutorial中有写，按步骤安装即可）

```bash
sudo apt install libsm-dev libxrender-dev build-essential libgl1-mesa-dev mesa-utils mesa-common-dev libglu1-mesa libglu1-mesa-dev mesa-utils
```

安装好就解决了此问题。

## Q2：本地或ssh连接服务器时通过Xming打开EMAN2的GUI失败

在解决上面的第一个问题之后，我发现还是无法正常打开`e2display.py`、`e2projectmanager.py`等GUI（`e2speedtest.py`那些没问题），报错为：

```bash
qt.qpa.screen: QXcbConnection: Could not connect to display
Could not connect to any X display.
```

按照Tutorial，确实本地能够成功打开，解决问题；

但是使用服务器时却一直报错，无法使用Tutorial的方法。

## A2：使用vim修改`~/.bashrc`

在`~/.bashrc`中添加：

```bash
export QT_QPA_PLATFORM='offscreen'
export DISPLAY=localhost:0.0
```

然后重新应用：

```bash
source ~/.bashrc
```

就能够成功打开了。
