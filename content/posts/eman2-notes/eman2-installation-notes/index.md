---
title: EMAN2 Installation Notes
seo_title: EMAN2 Installation Notes
summary: 
description: 看网上好像没有有关EMAN2的详细安装教程，于是摸鱼水了一篇
slug: eman2-installation-notes
author: Zhen Huang

draft: false
date: 2022-07-06T10:49:24+08:00
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


我用的系统是MacOS，所以我就简单写一下安装教程。

官网的安装教程请点击[此处](https://blake.bcm.edu/emanwiki/EMAN2/Install/BinaryInstallAnaconda/2.91)

## 1、下载.sh安装文件

在官网下载[EMAN2.91](https://cryoem.bcm.edu/cryoem/downloads/view_eman2_version/32)

## 2、准备一个安装路径

比如我在`/Users/hzvictor/`下新建一个文件夹，命名为`EMAN2`。

那么我接下来安装的路径就是`/Users/hzvictor/EMAN2`

## 3、获取系统root权限

```bash
sudo su
```

## 4、安装EMAN2

```bash
bash <path-to-EMAN2-installer>
```

比如我就是：

```bash
bash /Users/hzvictor/EMAN2/eman2.91_sphire1.4_sparx_huge.MacOS.sh
```

然后根据提示安装。

如果更新或覆盖安装，在其后加`-u`

{{< notice warning >}}
在询问安装路径时将安装路径改为**自己的安装路径**，比如`/Users/hzvictor/EMAN2`

如果不改的话默认就在`/var/root`里面了，能不能正常启动我不好说。我反正遇到了困难。
{{< /notice >}}

最后使用命令：

```bash
more ~/.bash_profile
```

检查bashrc中是否有：

```bash
# >>> conda initialize >>>
# !! Contents within this block are managed by 'conda init' !!
...
...
...
unset __conda_setup
# <<< conda initialize <<<
```

有的话，应该正常安装完成。

## 5、配置环境

修改bashrc以配置环境，关于bashrc的具体内容就不写了，就是个用户的环境变量。

```bash
vim ~/.bashrc
```

在末尾添加：

```bash
export PATH=/Users/hzvictor/EMAN2/bin:$PATH
```

然后保存并退出。

重新打开bashrc启用配置：

```bash
source ~/.bashrc
```

## 6、启动环境并测试

EMAN2的运行需要在刚刚创建的特定环境中，如果不在环境中的话，容易报错或者影响其他进程的正常运行。

每当需要打开EMAN2时，需要用命令启动环境：

```bash
source /.../.../EMAN2/bin/activate
```

启动环境后，会看到增加了`(base)`。这就说明已经成功创建环境，在EMAN2的环境中了。

依次测试：

```bash
e2version.py
e2speedtest.py
e2display.py
e2proc2d.py :64:64:1 test.hdf --process mask.sharp:outer_radius=24
e2display.py test.hdf
```

都没有报错那么就说明安装成功。

如果有其他问题，查看[官网安装教程](https://blake.bcm.edu/emanwiki/EMAN2/Install/BinaryInstallAnaconda/2.91)，或在[EMAN2的Github](https://github.com/cryoem/eman2)中提出issue，或者自己琢磨一下，问问导师。~~（问我我也不一定会啊）~~