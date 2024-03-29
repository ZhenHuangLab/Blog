---
title: Objective lenses & Aberrations
seo_title: Objective lenses & Aberrations
summary: 
description: Brief Introduction about complex lenses systems and aberrations.
slug: microscopy-3
author: Zhen Huang

draft: false
date: 2024-03-28T10:24:05+08:00
lastmod: 
expiryDate: 
publishDate: 

feature_image: 
feature_image_alt: 

categories:
    - Research Study
tags:
    - Notes
series:
    - Microscopy

toc: true
related: true
social_share: true
newsletter: true
disable_comments: false
math: true
---

Actually, the objective lenses are the most complex optics in the system. Unlike the simple lenses we discussed in the previous post, objective lenses are **complicated lens groups** (generally 4-17 lenses) that correct for various aberrations.

![the-objective-lenses](the-objective-lenses.png#small)

You need to have some trade-offs between Aberration Correction, Transmission and Resolving Power. The more glasses you put in the lens, the higher corrections are, the more transmission you lose.

| Classes | Corrections | Price |
| --- | --- | --- |
| Achromats | Axial (Red&Blue), Spherical (Green) | low |
| Fluorites (Semi-Apo) | Axial (2-4 colors), Spherical (2-4 colors) | medium |
| Apochromats | Axial (4-5 colors, Violet&RGB), Spherical (3-4 colors) | high |

## Resolving Power

The highest resolving power --> the highest numerical aperture (NA) --> the highest light gathering capability

$$ NA = n \cdot sin \theta $$

where $n$ is the refractive index of the immersion media between the lens and the specimen, and $\theta$ is the half-angle of the maximum cone of light that can enter the lens.

![numerical-aperture](numerical-aperture.png#small)

![Objectives vary in their numerical aperture](Objectives-vary-in-their-numerical-aperture.png#small)

<span class="caption">Objectives vary in their numerical aperture</span>

Why immersion media increases NA? Because when using higher refractive index media, we can decrease the refraction out of the collectible area of the lens, and get more light into the lens.

![immersion-media-increases-NA](immersion-media-increases-NA.png#small)

Another thing we can learn from the formula is that **the NA can never exceed the refractive index of the immersion media**. For oil immersion, the refractive index is 1.515, and the maximum NA is about 1.49; for water immersion, the refractive index is 1.33, which can have a maximum NA about 1.27.

There is also a trade-off between working distance and NA. The higher the NA, the shorter the working distance.

![working-distance-and-NA](working-distance-and-NA.png#small)

## Optical Aberrations

### Point Spread Function

Point Spread Function (PSF) is very useful for understanding all discussions on aberrations. It will be discussed more in the later posts. But for now, you can have a simple intuition that **PSF is the convolution of the point source of light as it passes through the optical system**.

So ideally (everything is aligned and you have great quality lenses), if you have a point source of light, and you focus up and down, then you can build a 3D volume (the X-Z projection in the image below), which looks like a small and symmetric hourglass, at the limit of resolution of that optical system.

![Point-Spread-Function](Point-Spread-Function.png#small)

For example, the ideal thin lens we talked about before is a huge over simplification of actual lens preformance.

![ideal-thin-lens](ideal-thin-lens.png#small)

### On Axis

#### 1. Spherical Aberration

![Spherical-Aberration](Spherical-Aberration.png#small)
![Spherical-Aberration-2](Spherical-Aberration-2.png#small)

* Uneven focus of mono-chromatic light due to the curvature of the lens. (Differential focus of peripheral and axial rays)
* Image appears hazy or slightly out of focus.
* Common causes:
  * Incorrect cover slip thickness;
  * Mismatch Refractive Index of immersion oil with specimen.

![Recognize-for-Spherical-Aberration](Recognize-for-Spherical-Aberration.png#small)

#### 2. Axial Chromatic Aberration

![Axial-Chromatic-Aberration](Axial-Chromatic-Aberration.png#small)

* Uneven focus of $\lambda$ in poly-chromatic light due to dispersion (wavelength dependence an optical material has on refractive index).
* Using the lens under improper conditions (like using the wrong immersion oil) can induce axial chromatic aberration.
* It's a serious problem but it's something we can correct for.

**Some light will bend more than others**, and the lens can't focus all the colors at the same point.

Axial Chromatic Aberration can be corrected with an achromatic doublet lens group (for an particular range).

* Achromatic doublet lens group: a concave and a convex lens that are sandwiched together, and they have different dispersion properties. So they are calculated to correct for different wavelengths of light that they focus on the same point.

![achromatic-doublet-lens-group](achromatic-doublet-lens-group.png#small)

### Off Axis

#### 1. Field Curvature

![Field-Curvature](Field-Curvature.png#small)

* Produces an image curvature due to the curved lens surface.
* Cannot focus entire field at the same time.
* It's impossible to correct it completely at the very outer edges, and that's why **microscopes have a larger field of view than they can actually see through the eyepiece or any of the image devices**, and the edges where have a very steep curvature are usually clipped off.

#### 2. Astigmatism

![Astigmatism](Astigmatism.png#small)

* A point source of light appears as a line or ellipse.
* Directionality changes at focus.
* Due to asymmetric lens manufacture or misalignment. Generally **it isn't really an issue unless they have been dropped or broken**.

#### 3. Coma

![Coma](Coma.png#small)

* Uneven focus of light passing through **the optical axis versus the periphery**.
* Points of light appear as streaks widening at the periphery.
* It's similar to the spherical aberration, but it's off-axis.
* Usually due to misalignment in the optical system.

## Reference

1. [Microscopy: Objectives and Eyepieces (Stephen Ross)](https://www.youtube.com/watch?v=Y2tn7Prw1GA)

2. [Numerical Aperture - MicroscopyU](https://www.microscopyu.com/microscopy-basics/numerical-aperture)