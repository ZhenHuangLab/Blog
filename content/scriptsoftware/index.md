---
title: Scripts & Software
seo_title: Scripts & Software
description: 
slug: scriptsoftware
author: Zhen Huang

draft: false
date: 2024-03-17T19:46:05+08:00
lastmod: 
expiryDate: 
publishDate: 

newsletter: false
disable_comments: false
math: true
---

{{<notice info>}}
I'm currently working on another software related to membrane protein image processing. Stay tuned!
{{</notice>}}

## MemXTerminator

[![Github version](https://img.shields.io/badge/version-1.2.2-black?logo=github&link=https://github.com/ZhenHuangLab/MemXTerminator)](https://github.com/ZhenHuangLab/MemXTerminator)

A software for membrane analysis and subtraction in cryo-EM. [[Wiki]](https://zhenhuanglab.github.io/MemXTerminator/) [[Github link]](https://github.com/ZhenHuangLab/MemXTerminator)

## imod2relion

[![PyPI version](https://badge.fury.io/py/imod2relion.svg)](https://pypi.org/project/imod2relion/)

A tool reading IMOD points, obtaining particles' info and generating .star file for RELION. [[Doc]](../projects/imod2relion/) [[Github link]](https://github.com/ZhenHuangLab/imod2relion)

{{<notice tip>}}
This app has been added to [SBGrid collection](https://sbgrid.org/software/titles/imod2relion).
{{</notice>}}


## tbl2star

[![PyPI version](https://badge.fury.io/py/tbl2star.svg)](https://pypi.org/project/tbl2star/)

A tool converting DYNAMO table files(.tbl) to RELION star files(.star). [[Doc]](../projects/tbl2star/) [[Github link]](https://github.com/ZhenHuangLab/tbl2star/tree/main)

## BraTS based on U-net

A project on Brain Tumor Segmentation(BraTS) using CNN. Most of code was written by me.
Computer Vision Project, Winter School 2023, Imperial College London

* Classification code: [[Google Drive]](https://drive.google.com/file/d/1zJ7eT93uVT-SHVxwR8KmS8FNGv5h_FmN/view?usp=share_link)
* Segmentation code: [[Google Drive]](https://drive.google.com/file/d/1FSJj8iZaeaBuFj8YLmY_pgdEl0PJM5AV/view?usp=share_link)

## ePSF generator

This script generates an ePSF (effective Point Spread Function) from a FITS image by detecting stars, extracting cutouts, and building a PSF model. The output is saved as a FITS file. [[Doc]](../projects/epsf-generator/) [[Github link]](https://github.com/ZhenHuangLab/epsf_generator/tree/main)
