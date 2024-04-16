---
title: 关于细菌性导sexduction的一些讨论
seo_title: 关于细菌性导sexduction的一些讨论
summary: 性导sexduction/F-duction概念和机制，F质粒概念和类型
description: 
slug: prokaryotic-sexduction
author: Zhen Huang

draft: false
date: 2024-04-05T15:24:10+08:00
lastmod: 
expiryDate: 
publishDate: 

feature_image: 
feature_image_alt: 

categories:
tags:
    - Notes
series:

toc: true
related: true
social_share: true
newsletter: true
disable_comments: false
math: true
---

最近在看细菌遗传分析中水平基因转移原理的相关资料时，发现了一个很有趣的概念：性导sexduction/F-duction。
之前一直没有注意到，故作记录。

## 1 基本概念讨论

对于性导sexduction概念争议还挺多的，而且很多主流教材似乎并没有把这个概念讲得很清楚。

### 1.1 两种观点比较

（1）第一种观点：**认为性导与接合概念等同**。大部分地方都没有对接合conjugation和性导sexduction作区分（包括大部分主流教材），认为细菌只有**transformation, transduction, conjugation**三大类水平基因转移(HGT)的方法。英文维基百科将sexduction重定向至conjugation，大概认为接合的概念可以包含性导的概念，没有作明显区分。

比如之前我上微生物学时老师的课件：

![transformation-transduction-conjugation-index-2024-04-16-10-48-28](https://lfs.zhenhuang.site/images/transformation-transduction-conjugation-index-2024-04-16-10-48-28.png#small)

以及随便搜到的一些online textbook：

![libretexts-bio-index-2024-04-16-10-48-45](https://lfs.zhenhuang.site/images/libretexts-bio-index-2024-04-16-10-48-45.png#small)

以至于我在认真搜这个性导概念之前，我以为只是接合的别名罢了。

（2）第二种观点：另一类观点认为**性导不完全等于接合**。在英文维基百科conjugation的讨论区，有人提出sexduction不等于conjugation，认为**性导是由F’质粒参与的水平基因转移过程**。我也是偶然发现的，中文维基百科讨论区没有人提出。

![sexduction-vs-conjugation-index-2024-04-16-10-49-23](https://lfs.zhenhuang.site/images/sexduction-vs-conjugation-index-2024-04-16-10-49-23.png#small)

在PubMed搜索sexduction，只能搜索出5篇远古文献，并没有关于这个名词的综述，仅有在文中提及这个词的情况，不过这些文献在提到这个词时说的**都是F’质粒参与的**。比如一篇俄文文献：（当然我也只看了摘要）

![pubmed-sexduction-index-2024-04-16-10-50-10](https://lfs.zhenhuang.site/images/pubmed-sexduction-index-2024-04-16-10-50-10.png#small)

因此在收集性导sexduction相关资料时，我主要以第二种观点为主，看看为什么性导不完全等于接合。

### 1.2 第一种观点对于性导/接合的解释

Oxfordreference对sexduction的解释：只是强调F因子，显然其观点是与第一种观点类似的，并没有对接合和性导作明显区分。
The process whereby a fragment of genetic material from one bacterium is carried with the sex factor F to a second bacterium.[^1]

英文维基百科，细菌中**接合**conjuction的概念：（搜索sexduction后重定向至此）
Bacterial conjugation is the transfer of genetic material between bacterial cells by direct **cell-to-cell contact** or by a **bridge-like connection** between two cells. This takes place through a **pilus**. It is a **parasexual mode** of reproduction in bacteria.[^2]

要点：

* 直接的细胞和细胞间接触或者形成桥样连接。这一点是与transformation和transduction区分的关键。
* Pilus（性菌毛）介导的。而性菌毛通常被认为就是F质粒介导形成的。The F-factor allows the donor to produce a thin, tubelike structure called a pilus, which the donor uses to contact the recipient.[^3]
* 是细菌中的类有性生殖行为。

总之，第一种观点认为性导可以归为接合的一部分，这两个概念混用，直接用接合一个词代替了性导的概念。

### 1.3 第二种观点下的性导

讨论区十几年前的说法是这样的：Sexduction is another process in bacteria resulting **F-prime factor**. It happens when an abnormal crossing over occures in Integrated F-Factor in genome resulting a F-factor with additional genes called F-prime factor.[^4]

因此，第二种观点的关键在于性导是由**F’因子**介导的。

## 2 F-plasmid和F-prime factor

因此要解释性导，关键在于了解F因子/F质粒的概念以及分类。

F-plasmid概念：allows genes to be transferred from one bacterium carrying the factor to another bacterium lacking the factor by conjugation.[^5] 又叫sex factor/F sex factor/fertility factor。

F-plasmid分类：[^5]

* Hfr bacteria possess the entire F episome integrated into the bacterial genome.
* F<sup>+</sup> bacteria possess F factor as a plasmid independent of the bacterial genome. The F plasmid contains only F factor DNA and no DNA from the bacterial genome.
* F' (F-prime) bacteria are formed by incorrect excision from the chromosome, resulting in F plasmid carrying bacterial sequences that are next to where the F episome has been inserted.
* F<sup>-</sup> bacteria do not contain F factor and act as the recipients.

因此：

（1）**Hfr是指F质粒整合至细菌基因组**。与F<sup>-</sup>杂交几乎不能使F<sup>-</sup>变为F<sup>+</sup>，因为F因子总是最后转移。但是Hfr与F<sup>+</sup>本身可以相互转变。

![hfr-index-2024-04-16-10-50-30](https://lfs.zhenhuang.site/images/hfr-index-2024-04-16-10-50-30.png#small)

（2）F<sup>+</sup>是指F质粒在细菌基因组外部，独立于基因组存在，且质粒本身不存在细菌基因组自身的DNA。与F<sup>-</sup>杂交几乎都能使F<sup>-</sup>变为F<sup>+</sup>。

![f+-index-2024-04-16-10-50-45](https://lfs.zhenhuang.site/images/f+-index-2024-04-16-10-50-45.png#small)

（3）**F’是指F质粒也在基因组外部，但是质粒上有部分基因组自身的DNA**。是由Hfr形成的。F’ cells are formed from Hfr cell during induction of F-factor from chromosomal DNA in which F-factor carries a portion of chromosomal DNA along with it.

![f-prime-index-2024-04-16-10-51-03](https://lfs.zhenhuang.site/images/f-prime-index-2024-04-16-10-51-03.png#small)

![f-prime-formation-2024-04-16-10-56-15](https://lfs.zhenhuang.site/images/f-prime-formation-2024-04-16-10-56-15.png#small)

F’的形成：F因子整合进细菌染色体-形成Hfr细菌中间态-裂解形成F’

其实就是Hfr与F<sup>+</sup>互相转变过程中失误造成的。

（4）F<sup>-</sup>是指没有F质粒的细菌，通常也是F因子的受体。

## 3 性导机制

与F质粒一样，可以通过与F<sup>-</sup>菌株的接合而转移，也可以与主体DNA重新结合。

特殊的一点是，通过F’因子将供体主染色体上的基因导入受体细菌，受体细菌能够形成**部分二倍体partially diploid**。这也是性导sexduction的基本机制[^6]。

F’与F<sup>-</sup>细胞发生的性导过程，结果得到了两个F’[^7]，这两个细菌都具有部分二倍体partially diploid的性质。

![conjugation-between-f'-and-f--2024-04-16-10-56-56](https://lfs.zhenhuang.site/images/conjugation-between-f'-and-f--2024-04-16-10-56-56.png#small)

{{<notice info "部分合子/部分二倍体">}}
Merozygote部分合子/partially diploid部分二倍体：含有一个亲本全部基因组和另一个亲本部分基因组的合子。
{{</notice>}}

当然，部分二倍体不一定全部都是F’与F<sup>-</sup>接合导致的，<b>Hfr和F<sup>-</sup>接合也可能形成部分二倍体</b>。

![conjugation-between-hfr-f--2024-04-16-10-57-14](https://lfs.zhenhuang.site/images/conjugation-between-hfr-f--2024-04-16-10-57-14.png#small)

## 4 省流版

因此根据上述资料，我倾向于第二种观点，并可以总结性导的几个特点：

* 性导是**F’因子**介导的，将供体部分基因导入受体形成**部分二倍体**的过程。
* F’因子的形成是由于Hfr发生**自切除且切除失误**，带了一部分细菌自身的DNA。
* 性导过程使得受体的基因组增加，但**并不减少供体本身的基因组**。
* F’不存在蛋白质外壳包装的问题，其**长度不受限制**，可以携带不同长度的细菌本身基因组片段。
* F’的性质<b>介于F<sup>+</sup>和Hfr之间</b>，可以像F<sup>+</sup>一样将F因子转移至F<sup>-</sup>，也可以像hfr一样将细菌部分DNA转移至F<sup>-</sup>，但是不像Hfr一样基本只能转移细菌自身DNA（因为在Hfr中F因子在染色体最末端）。F’将F因子转移给F<sup>-</sup>细胞的结果是，使得F<sup>-</sup>细胞成为新的F’细胞。但是这种重组频率较低。

当然，这只是我个人的理解，并且或许也不一定要钻概念的牛角尖，但是我觉得这个概念对于F'的认识还是很有帮助的。

[^1]: [Sexduction - Oxfordreference](https://www.oxfordreference.com/display/10.1093/oi/authority.20110803100457687#:~:text=The%20process%20whereby%20a%20fragment,F%20to%20a%20second%20bacterium)
[^2]: [Bacterial conjugation - Wikipedia](https://en.wikipedia.org/wiki/Bacterial_conjugation)
[^3]: [Conjugation definition- Nature](https://www.nature.com/scitable/definition/conjugation-prokaryotes-290/)
[^4]: [Sexduction VS Conjugation - Talk page - Wikipedia](https://en.m.wikipedia.org/wiki/Talk:Bacterial_conjugation#Sexduction_Vs._Conjugation)
[^5]: [F-plasmid - Wikipedia](https://en.wikipedia.org/wiki/F-plasmid)
[^6]: [第8章-细菌的遗传分析-武汉大学](http://skgjx.whu.edu.cn/Public/upfile/article/201709051039287383.pdf)
[^7]: [Chapter8 - Genetics of Bacteria](https://slideplayer.com/slide/11777647/)