---
title: imod2relion
seo_title: imod2relion
summary: 
description: 
slug: imod2relion
author: Zhen Huang

draft: false
date: 2023-10-25T12:45:18+08:00
lastmod: 
expiryDate: 
publishDate: 

feature_image: 
feature_image_alt: 

project types: 
    - Open Source
techstack:
    - Python
    - RELION
    - IMOD
live_url: 
source_url: https://sbgrid.org/software/titles/imod2relion

newsletter: true
disable_comments: false
math: true
---

[![PyPI version](https://badge.fury.io/py/imod2relion.svg)](https://pypi.org/project/imod2relion/)    [[SBGrid software collection]](https://sbgrid.org/software/titles/imod2relion)

A tool reading IMOD points, obtaining particles' info and generating `.star` file for RELION.

## Features

- Convert txt files containing points' positions into relion star file
- Directly calculate particles' centers and orientations for further processing in RELION
- Simplify workflow and make it possible for IMOD picking a small amount of particles manually
- Generate initial model using IMOD and RELION, especially for membrane proteins

## Installation

You can install this package by:

```bash
pip install imod2relion
```

## Usage

You can refer to the instructions via:

```bash
imod2relion --help
```

or

```bash
imod2relion -h
```

## Workflow

### Picking particles using IMOD

You can use IMOD to pick particles, and the information of these particles is determined by selecting two points in sequence in IMOD. This information will be stored in the `IMOD model file`. 

It is worth noting that the `position` of the particles is calculated as the `midpoint` of the two points, and the orientation of the particles is calculated as the `spatial vector` formed by the two points (the first point clicked is the starting point of the vector, and the second point clicked is the endpoint of the vector).

### Converting IMOD model into txt files containing positions of points

You can convert an IMOD model to a text file using the following command:

```bash
model2point your_tomo_name.mod your_tomo_name.txt
```

Note that for accuracy in subsequent processing, your text file should be named the same as the tomogram name read in RELION, as the `rlnTomoName` column in the generated STAR file reads the name of your text file.

### Using this tool to generate star file for RELION

```bash
imod2relion --input /path/to/txt_files --output /path/to/star/file.star --binning bin_number
```

* `--input`/`-i`: Path to the directory containing all IMOD .txt files. The .txt filenames must match the tomogram names. This argument is required.

* `--binning`/`-b`: Binning of the tomogram when using IMOD to pick particles. Default is 1.

* `--output`/`-o`: Name of the generated RELION star file. Do not forget the file suffix .star. Default is `IMODpoints.star`.


## Conventions

The conventions used in this script, especially the calculation of Euler angles, are consistent with those used in [RELION](https://relion.readthedocs.io/en/release-3.1/Reference/Conventions.html) and in [Heymann, Chagoyen and Belnap (2005) standard](https://doi.org/10.1016/j.jsb.2005.06.001).

## License

The project is released under the BSD 3-Clause License
