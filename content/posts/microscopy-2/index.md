---
title: Lenses and Image Formation
seo_title: Lenses and Image Formation
summary: 
description: 
slug: microscopy-2
author: Zhen Huang

draft: false
date: 2024-03-24T17:47:03+08:00
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

## Properties of light

Wave: Electromagnetic spectrum

* wavelength
* amplitude
* frequency
* speed
* phase
* polarization

Rays & wavefronts: Wavelengths are small and frequencies are high. To simplify drawing light, rays and wavefronts are used instead.

## Light-matter interaction

### Speed

Light slows down in materials.

index of refraction (n) = the speed of light in vacuum / the speed of light in a material.

![index-of-refraction](index-of-refraction.png#small)

### Interface

Law of reflection:

$$ \theta_i = \theta_r $$

Law of refraction:

$$ n_i \sin(\theta_i) = n_j \sin(\theta_j) $$

### Transmission

% transmitted + % reflected + % absorbed = 100%

## Image formation by lenses

Ray tracing:

* Parallel rays converge at the focal plane
* Rays from the focal plane exit parallel
* Rays through the lens center are unaffected

Object plane and Image plane: conjugate planes.

Real images & virtual images:

* Real images: light actually converges and creates an intensity pattern
* Virtual images: for eyepieces. move the object inside the focal distance(positive lens), so it appears that the light is coming from a virtual image.

### Lensmaker's equation

Lensmaker's equation (thin lens):

$$ \frac{1}{L_1} + \frac{1}{L_2} = \frac{1}{f}$$

where $L_1$ and $L_2$ are the distances between object(image) and lens.

![single-lens-imaging](single-lens-imaging.png#small)

Assumptions:

* the distance between the two surfaces of the lens are very small;
* the surfaces can all be described by spheres.

This simplification is useful for understanding how systems are set up. The details of resolution and of image quality often come down to diffraction level of facts.

Magnification:

$$ M = \frac{d_2}{d_1} = \frac{L_2}{L_1}$$

### Finite & Infinite Objective Lens

#### Finite imaging microscope

From 1970s to 1980s.

The specimen or object is placed a short distance away from the focal point of this objective.

![Finite-conjugate-imaging](Finite-conjugate-imaging.png#small)

#### Infinite imaging microscope

More recent.

Object/specimen is placed exactly at the focal plane of the objective lens. So, light coming from the focal plane from your specimen will travel through this objective lens on the other side as parallel light.

So a tube lens is needed to take these parallel light and refocuses it to create an image on the other side.

![Infinite-conjugate-imaging](Infinite-conjugate-imaging.png#small)

Magnification: $M = \frac{f_1}{f_0}$

The reason why people choose this design is that all the light is travelling parallel before the tube lens so one can place the tube lens in different points of the light path, which provides flexibility for putting more types of lens and devices.

So the advantages are:

* the object is in the focal plane;
* the light between the objective and the tube lens is parallel so it doesn’t matter where the tube lens is placed (we can add other elements - mirrors, filters etc. - in the path)

### the Compound Microscope with Eyepiece or Camera

Based on the infinite conjugate imaging system, the imaging system with eyepiece looks like:

![Compound-Microscope-with-Eyepiece](Compound-Microscope-with-Eyepiece.png#small)

When with camera:

![Compound-Microscope-with-Camera](Compound-Microscope-with-Camera.png#small)

## Illuminating the Specimen

We need to collect and focus light onto the specimen. There are two ways to do this:

* Köhler Illumination
* Critical Illumination

For transmitted light, the best way to illuminate the specimen is using **Köhler illumination**.

But why? We can compare these two methods:

For Köhler illumination:

* Light source can produce a parallel beam of light;
* We can get uniform light intensity at the sample even if the light source is ugly and nonuniform.

![Kohler-illumination](Kohler-illumination.png#small)

<span class="caption">Left: Image-forming; Right: Illumination</span>

But for critical illumination:

* The light source is focused and imaged onto the sample;
* Usable only if the light source is *prefectly* uniform. (very hard!)

In Köhler Illumination, we can see the back focal plane with a "Bertrand lens" or a telescope eye piece.

![Bertrand-lens](Bertrand-lens.png#small)

## Reference

1. [Optical Microscopy - Principles and Applications](https://scholar.harvard.edu/files/haripaudel/files/optical_microscopy_tutorial_h.pdf)
2. [Microscopy: Microscope Imaging and Koehler Illumination (Ron Vale)](https://www.youtube.com/watch?v=H5-CfX3XLf0)
