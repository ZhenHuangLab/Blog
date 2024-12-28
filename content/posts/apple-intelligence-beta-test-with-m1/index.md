---
title: M1解锁Apple Intelligence & 简单测试
seo_title: M1解锁Apple Intelligence & 简单测试 | Zhen's BLOG
summary: 介绍如何在M1 Mac上解锁Apple Intelligence Beta版的步骤，包括系统配置、安装过程及遇到的问题和解决方法，并对Apple Intelligence Beta版进行简单测试。
description: 介绍如何在M1 Mac上解锁Apple Intelligence Beta版的步骤，包括系统配置、安装过程及遇到的问题和解决方法，并对Apple Intelligence Beta版进行简单测试。
slug: apple-intelligence-beta-test-with-m1
author: Zhen Huang

draft: false
date: 2024-12-28
lastmod: 
expiryDate: 
publishDate: 

feature_image: 
feature_image_alt: 

categories:
    - Essays
tags:
    - CS
series:

toc: true
related: true
social_share: true
newsletter: true
disable_comments: false
math: true
---

## 1 解锁Apple Intelligence方法

系统配置：

- Sequoia 15.2
- MacBook Pro M1 (2020) 16G

测试时间：2024.12.28

解锁方法主要按照这个脚本：[XcodeLLMEligible](https://github.com/Kyle-Ye/XcodeLLMEligible)

按照脚本使用方法进行操作。我没有关闭系统SIP，主要做了以下准备：

- 登陆美区ID
- 使用魔法，并且使用 **增强模式（Enhanced Mode）**
- 系统语言设置为English (US)
- 系统地区设置为美国
- Siri语言设置为English (US)

在终端运行：

```bash
curl -L https://raw.githubusercontent.com/Kyle-Ye/XcodeLLMEligible/release/0.2/scripts/override.sh | bash -s -- install override greymatter
```

按要求输出mac密码即可。脚本运行结束后重启，然后等待片刻，系统设置的侧边栏就会出现Apple Intelligence。

![20241228172230-2024-12-28-17-22-30](https://lfs.zhenhuang.site/images/20241228172230-2024-12-28-17-22-30.png)

在全程不改变网络状况、语言、ID等情况下，正常按照提示安装即可。

安装完成后，下方会出现ChatGPT Extension，点击`Set Up…`即可。

![20241228172258-2024-12-28-17-22-58](https://lfs.zhenhuang.site/images/20241228172258-2024-12-28-17-22-58.png)

可以选择进一步登陆ChatGPT账号。如果中途遇到登陆不上去的问题，不是之前的安装问题，而是 **网络问题** 。建议确认自己的魔法是否有效，以及最好打开增强模式。可以参考：[[Method 1] ChatGPT integration login issue](https://github.com/Kyle-Ye/XcodeLLMEligible/issues/60)

![20241228172354-2024-12-28-17-23-56](https://lfs.zhenhuang.site/images/20241228172354-2024-12-28-17-23-56.png)

## 2 激活后能否切换账号登陆？

使用美区ID下载了apple intelligence后再登陆国区ID是行不通的，AI会卡在In progress，必须关闭 **SIP** 、删除`/System/Library/AssetsV2/`中的文件夹内容、退出国区ID才有机会重新开启apple intelligence。我怀疑在In Progress步骤中Apple加入了一些检验步骤。

当然，我也尝试了一种卡bug的方法：在侧边栏有Apple intelligence时，退出国区ID，删除`/System/Library/AssetsV2/`中的文件夹内容，重启mac，手动关闭Apple intelligence。

![20241228172439-2024-12-28-17-24-40](https://lfs.zhenhuang.site/images/20241228172439-2024-12-28-17-24-40.png)

再重新打开Apple Intelligence，然后会显示In Progress，再变为Downloading

这时重新登陆国区ID，就会发现仍在下载。这样就可以绕过“卡在InProgress”这一问题了。

而且之前的ChatGPT Extension仍然保留着。

![20241228172457-2024-12-28-17-24-57](https://lfs.zhenhuang.site/images/20241228172457-2024-12-28-17-24-57.png)

然后就能在国区ID登陆前提下解锁Apple Intelligence了！

![20241228172517-2024-12-28-17-25-19](https://lfs.zhenhuang.site/images/20241228172517-2024-12-28-17-25-19.png)

但是这时别轻易改动iCloud设置、或者尝试登陆国区iCloud啥的，不然又会退回In progress状态。Apple Intelligence貌似是和iCloud的某些东西绑定在一起的。

我就是在这时尝试登了一下国区iCloud访问了一下文件，然后就退回In progress状态了。。。

![20241228172549-2024-12-28-17-25-50](https://lfs.zhenhuang.site/images/20241228172549-2024-12-28-17-25-50.png)

如果退回In Progress状态了，就退出国区ID登陆，稍等几分钟Apple Intelligence又会从In Progress变回开启状态。这说明Apple Intelligence就是放在`/System/Library/AssetsV2`中，一次下载好了之后就不用动它了，今后只需要切换ID使用。

![20241228172734-2024-12-28-17-27-35](https://lfs.zhenhuang.site/images/20241228172734-2024-12-28-17-27-35.png)

## 3 Apple Intelligence Beta简单测试

运行Apple Intelligence时，系统负载没有显著上升。即使是最初代机M1也没啥感觉，这点不赖。

当使用中文提问时，全是百度搜索：

![20241228172824-2024-12-28-17-28-24](https://lfs.zhenhuang.site/images/20241228172824-2024-12-28-17-28-24.png)

当使用英文提问时，才会触发ChatGPT并调用。

![20241228172841-2024-12-28-17-28-41](https://lfs.zhenhuang.site/images/20241228172841-2024-12-28-17-28-41.png)

但如果魔法不够厉害（增强模式没开的话），ChatGPT都调用不了

![20241228172859-2024-12-28-17-28-59](https://lfs.zhenhuang.site/images/20241228172859-2024-12-28-17-28-59.png)

当然，文字工作方面还是有些能用的，例如在preview、word或者网页中能够使用writing tools，里面有一些proofreading、summarizing等小工具。

![20241228172921-2024-12-28-17-29-23](https://lfs.zhenhuang.site/images/20241228172921-2024-12-28-17-29-23.png)

但是这些工具没有整合到我常用于做笔记及写作的VSCode、Notion等软件中，感觉功能有些鸡肋…最多是回复邮件、处理一些简单的文字工作方面有些帮助。

另外听说在照片图库中还有一些功能，但是我的照片都在国区iCloud，一登陆我的iCloud Apple Intelligence就没了，所以还测试不了。

现在测试一通下来，感觉不如设置个快捷键召唤ChatGPT…现在ChatGPT也有和其他应用协作的能力了（尤其是Notion等都有），现在折腾Apple Intelligence除了在协助处理自己的琐碎数据（例如邮件、通知、日历安排等）上面有优势，目前对于国区ID用处不大，而且现在国区想要开通还得费这么大劲。

![20241228172940-2024-12-28-17-29-41](https://lfs.zhenhuang.site/images/20241228172940-2024-12-28-17-29-41.png)

不知道明年正式上线后，具体体验会如何。现在还是比较鸡肋，尤其是在国内。不过手机上的Apple Intelligence应该用处会更大些。
