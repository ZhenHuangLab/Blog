---
title: 将自己的Notion页面部署至Vercel并配置自定义域名
seo_title: 将自己的Notion页面部署至Vercel并配置自定义域名 | Zhen's BLOG
summary: 记录自己如何将自己的Notion页面以最简单的方式部署至Vercel并配置自定义域名，获得巨大DIY空间并便于搜索引擎收录。
description: 
slug: deploy-notion-to-vercel-by-nextjs
author: Zhen Huang

draft: false
date: 2024-04-26T23:50:12+08:00
lastmod: 
expiryDate: 
publishDate: 

feature_image: 
feature_image_alt: 

categories:
    - Essays
tags:
    - Notes
    - CS
    - Frontend
series:

toc: true
related: true
social_share: true
newsletter: true
disable_comments: false
math: true
---

{{<notice warning "观前提示">}}
注意：本文主要涉及**最简单的Notion部署方法**，即保留Notion原有页面结构，而不做其他任何修改。如果需要将Notion当作自己的博客或者个人网页等（仅将Notion当作后端，不想保留其页面基础结构），请移步至[transitive-bullshit/nextjs-notion-starter-kit](https://github.com/transitive-bullshit/nextjs-notion-starter-kit)、[tangly1024/NotionNext](https://github.com/tangly1024/NotionNext)等。
{{</notice>}}

## 1 前言

前几天突然很想把自己的课堂笔记投放至搜索引擎，使得自己的页面被Bing、Google等搜索引擎搜索到，但是这就涉及到网站认证的过程：**单纯使用Notion免费版生成网页链接所得到的这个域名，无法进行所有权认证**，因为认证过程一般需要比如：

- 一些DNS认证
- 上传认证的`HTML`文件
- 自主编辑`HTML`源代码

而且，使用Notion页面链接分享，国内点开链接加载速度很慢，原因你懂的；右上角还会出现一个大大的「Built with Notion」，别的同学想在你的页面留下评论也不方便。种种因素叠加下，我决定想个办法，把自己的Notion「部署」到`Github`等DIY空间更大的网站上，这样不仅可以自定义域名，还可以上传认证的`HTML`文件，自主编辑Notion页面源代码。

当然，我这里提到的「部署」，并不是将Notion上的数据以某种方式下载到`Github`等地，然后再以类似`Hugo`、`Mkdocs`等方式创建静态资源；而是保留Notion作为后端，`Github`等地部署的脚本只作为一个类似 **「渲染器」** 的东西，**通过Notion API抓取Notion数据库的数据，将这些数据渲染成网页**。

## 2 获取页面ID

1、首先确定需要部署的**根页面**。后续部署获得网页的主页就是这个页面，只有这个页面的子页面才会在后续部署的自定义域名下。

2、在需要部署的根页面的右上角，依次点击`share`⇒`Publish`⇒`Publish`，获得根页面的**分享链接**；

3、复制根页面的页面ID。Notion的页面ID通常是由**32个字母+数字**构成。

{{<notice tip>}}
页面ID不包括前面你的页面名称的一部分（用短线`-`分隔），也不包括`?`后面的部分。
{{</notice>}}

比如我打算分享的根页面链接为`https://zhenh.notion.site/ZJU-f21d69aaa7214868b465490a9bc6eee2?pvs=4`或者`https://www.notion.so/ZJU-f21d69aaa7214868b465490a9bc6eee2?pvs=21`，那么我的页面ID为`f21d69aaa7214868b465490a9bc6eee2`。

![页面ID获取-2024-04-27-00-05-35](https://lfs.zhenhuang.site/images/页面ID获取-2024-04-27-00-05-35.png#small)

## 3 在Github上获取脚本代码

如果想要从头开始自定义，推荐`Github`上一个项目叫做[react-notion-x](https://github.com/NotionX/react-notion-x)，本文也是基于此。

我在摸索的过程中，发现一个极快的方法： **只需要复制这个仓库[examples/full](https://github.com/NotionX/react-notion-x/tree/master/examples/full)下的代码，再设置刚刚获得的页面ID，就可以基于`Next.js`轻松部署Notion页面渲染器了** 。具体的细节也可以查看刚刚提供链接中的README，细节就不多涉及了。我的仓库就是基于刚刚给的`examples/full`下的代码，再加了个自定义的`Giscus`评论区。你也可以选择Fork[我的项目](https://github.com/ZhenHuangLab/notion)进行修改。

## 4 配置渲染器

### 4.1 填入PageId

获得需要的脚本代码后，只需要进入`lib/config.ts`中，把`rootNotionPageId`修改成刚刚获取的**根页面ID**即可。`SpaceId`可填可不填，如果你的Notion加入了Space的话是需要填的（不过我也没试过，因为我就是打算免费白嫖的，怎么可能给Notion充钱（乐））。

![填入PageId-2024-04-27-00-10-35](https://lfs.zhenhuang.site/images/填入PageId-2024-04-27-00-10-35.png#small)

然后一切就大功告成了，就是这么简单。接下来是一些选做的配置。

### 4.2 (选做)自定义网站描述和图片

如图，在`components/NotionPage`中，修改`socialDescription`以及`socialImage`可以自定义网站描述和图片。

![自定义网站描述和图片-2024-04-27-00-14-06](https://lfs.zhenhuang.site/images/自定义网站描述和图片-2024-04-27-00-14-06.png#small)

### 4.3 (选做)配置Giscus评论区

使用`Github`还有个好处就是可以基于`Discussions`利用`Giscus`配置评论区。

如图，我在`NotionPage.tsx`中加入了一个`giscus`的元素，然后加入[Giscus官网](https://giscus.app/)生成的脚本代码，选择`notion-page`及`notion-full-page`属性即可。这样就可以非常简单地在自己部署的Notion页面中添加评论区了。也可以选择直接Fork[我的项目](https://github.com/ZhenHuangLab/notion)，自己在官网获得`Giscus`脚本代码后，将信息填到自定义的部分。

![配置Giscus-1-2024-04-27-00-16-58](https://lfs.zhenhuang.site/images/配置Giscus-1-2024-04-27-00-16-58.png#small)

![配置Giscus-2-2024-04-27-00-17-16](https://lfs.zhenhuang.site/images/配置Giscus-2-2024-04-27-00-17-16.png#small)

## 5 安装必要库

如果之前有安装过`npm`或者`yarn`，或者如果并不想自己在本地先跑下看看，可以直接跳过这部分。这里也不涉及具体的安装教程，Google一下应该非常容易。我自己是用了`yarn`包管理器，在终端输入：

```bash
npm install -g yarn
yarn install
yarn add next react react-dom notion-client notion-compat notion-utils react-notion-x notion-types
```

如果有出现权限不够的记得给`sudo`。我自己在摸索的时候发现好像还是得手动`yarn add`，不过无所谓了，能够把`react-notion-x`所必需的库装好就行。

然后使用`yarn dev`就可以在本地运行了。如果一切正常没有报错的话，可以在浏览器中输入`http://localhost:3000/`查看部署出来的最终效果。要进行进一步自定义修改也是可以的，并且`localhost`也会即时更新。

## 6 创建Git仓库并推送至Github

关于`Git`的使用不是本篇的重点，因此仅简单列出必要步骤：

1、在目前你所在的文件夹中（比如我现在是`react-notion-x`）创建本地`Git`仓库：

```
git init
```

2、将目前所有的修改好的文件添加到本地`Git`仓库：

```
git add .
```

3、在本地提交commit，可以备注一些提交信息：

```
git commit -m "想要提交的信息"
```

4、在Github官网创建一个公开的空repo，比如我的是[https://github.com/ZhenHuangLab/notion](https://github.com/ZhenHuangLab/notion)，这是到时渲染器脚本的位置。

5、将刚刚创建的远程Github仓库与本地仓库绑定：

```
git remote add origin "远程仓库地址"
```

6、将之前本地的commit推送到远程仓库中：

```
git push -u origin master
```

本地默认创建的是`master`分支，因此这里用`master`。如果创建了别的名称的分支（比如`main`），则需要改成相应的分支名。

至此，本地的`react-notion-x`项目应该已经推送到远程的`Github`仓库中了。

如果之后在本地进行了一些修改，比如说在`README.md`中写了一些文字作为项目的介绍，就可以使用以下命令推送同步到远程仓库：

```
git add .
git commit -m "提交信息"
git push
```

## 7 部署到Vercel

1、注册并进入`Vercel`：打开[https://vercel.com/new/](https://vercel.com/new/)，建议使用`Github`进行登录，然后准备创建一个`Vercel`项目。

2、然后需要将`Vercel APP`添加到你的`Github`应用中，应该在创建`Vercel`项目时会有相应提示，反正安装`Vercel`应用即可，这样`Vercel`就可以访问你的个人`Github`仓库了；

3、再在创建页面选择`Import Git Repository`，也就是导入刚刚创建的与`react-notion-x`相关的个人仓库，然后设置框架和命令可以参考我现在写的：

![Import-settings-2024-04-27-00-23-56](https://lfs.zhenhuang.site/images/Import-settings-2024-04-27-00-23-56.png#small)

其中`Install Command`是：（当然，我这写得可能啰嗦了点，但是无所谓，能跑就行）

```bash
npm install -g yarn && yarn add next react react-dom notion-client notion-compat notion-utils react-notion-x notion-types
```

其他的像`root directory`和`环境变量Environment Variables`可以不管，因为无论是我们之前设置的页面ID还是评论系统，都是公开的信息，无所谓；**如果需要配置一些key，则需要考虑设置环境变量来保证安全性了**。

4、点击`Deploy`进行自动部署。部署成功后会出现`Congratulations`界面，说明部署完成；点击`Project`可以看到已经成功部署网页了：

![成功部署-2024-04-27-00-25-01](https://lfs.zhenhuang.site/images/成功部署-2024-04-27-00-25-01.png#small)

- 如果出现部署失败的问题（按道理来讲在本地跑通了就没问题），在本地修改排查之后推送到`Github`仓库，然后`Vercel`会进行重新部署。
- 如果是`Vercel`配置的问题（比如我一开始不熟悉`Vercel`这玩意以及如何正确安装必要库，试错了几次），那么可以修改`Vercel`设置后，在对应失败的`Deployment`中点击重新部署`Redeploy`：

![重新部署-2024-04-27-00-25-34](https://lfs.zhenhuang.site/images/重新部署-2024-04-27-00-25-34.png#small)

## 8 配置自定义域名

成功部署至`Vercel`后，每一次推送到`Github`的commit，`Github`都会交给`Vercel`进行部署，于是我们得到了能够自定义渲染Notion页面的脚本（只不过在本文中是最朴素的渲染）。

![All-deployments-2024-04-27-00-26-21](https://lfs.zhenhuang.site/images/All-deployments-2024-04-27-00-26-21.png#small)

`Vercel`会自动生成一个网址，别人可以用这个域名访问你的Notion页面了，而不是`xxx.notion.site`或者`notion.so/xxx`了。

然后我们可以在`Vercel`中自定义域名：在部署成功的`Vercel`项目中点击`Settings - Domains`，然后将自定义的域名输入（需要自己先有域名，比如我打算给[notion.zhenhuang.site](https://notion.zhenhuang.site)），那么我就将该域名输入其中，点击`Add`就行，`Vercel`会指引你如何配置该域名（通常就是给自己的域名添加一个`CNAME`记录就好）。等待几分钟之后，`Vercel`会将你自定义的域名与它给的域名绑定，这样就完成配置了。

这样，别人通过你给的自定义域名就可以访问到你的自定义Notion页面（比如我的是[notion.zhenhuang.site](https://notion.zhenhuang.site)）；你在Notion中直接编辑页面，过一两分钟就会同步到你的自定义网页中，而不用`Github`推送（<mark>因为`Github`和`Vercel`部署的本质是个渲染脚本，内容还是在Notion中；`Vercel`会隔一小会刷新一次，抓取一次数据。</mark>在`Domains`设置中也可以进行手动刷新）

配置结束后，就可以按照搜索引擎给的流程，在`public/`中添加相应的认证文件（比如Bing需要的`BingSiteAuth.html`），来进行所有权认证，使得自己的Notion页面被搜索引擎收录。

![加入BingSiteAuth-2024-04-27-00-27-48](https://lfs.zhenhuang.site/images/加入BingSiteAuth-2024-04-27-00-27-48.png#small)

通过这一通操作，就可以**免费白嫖Notion自定义域名、使搜索引擎收录自己的Notion页面、自定义评论系统，并且给了非常大的DIY空间**。我目前这个还是最简单的方案，是几乎没有进行任何自定义的，而有很多大神已经把Notion玩得贼溜了，直接当博客用了，也非常强大，例子可以参考我之前给的链接[NotionNext](https://github.com/tangly1024/NotionNext)，我看学校也有一些同学用这个做了自己的博客，比如[fufu酱のNoteBook](https://csfufu.life/en)。

{{<notice info "说在最后">}}
因为自己把Notion部署到`Vercel`上是一步步摸索过来的，也没有一边记录过程，所以只是回忆了一下一些重要的步骤，也没有重新走一遍流程认真配图，所以如果有细节没有提及的欢迎补充，网上搜一下应该也能找到解决方案。
{{</notice>}}
