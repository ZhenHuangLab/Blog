---
title: Point Spread Function
seo_title: Point Spread Function
summary: PSF in microscopy.
description: 
slug: microscopy-5
author: Zhen Huang

draft: false
date: 2024-03-29T16:37:23+08:00
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

## Point Spread Function

### Effect of All the Wavelets: the PSF

Finally, let's put them all in:

![all-the-wavelets-index-2024-04-16-00-55-04](https://lfs.zhenhuang.site/images/all-the-wavelets-index-2024-04-16-00-55-04.png#small)
<span class="caption">Effect of all the wavelets - PSF[^1]</span>

This is basically an infinite number of wavelets, and this distribution is now the **point spread function**.

What we get in the middle is a very elliptical shape, (which should have been a nice symmetrical sphere), and a lot of light is still left around the area of the ideal object. This is actually **the limitation of imaging with a light microscope**.

### Effect of the NA/wavelength on Fringes

* high NA: small central peak, narrow fringes
* low NA: large central peak, wide fringes

![effect-of-na-on-fringes-index-2024-04-16-00-55-28](https://lfs.zhenhuang.site/images/effect-of-na-on-fringes-index-2024-04-16-00-55-28.png#small)

* short wavelength: small PSF

![psf-smaller-for-shorter-wavelength-light-index-2024-04-16-00-55-47](https://lfs.zhenhuang.site/images/psf-smaller-for-shorter-wavelength-light-index-2024-04-16-00-55-47.png#small)

### PSF Light Distribution Near the Image Plane (XY and XZ)

#### Looking down on the in-focus plane (XY)

* PSF has center Airy disk;
* PSF has a series of concentric rings.
* Larger rings have progressively lower intensity;
* The first dark ring radius is $0.61\frac{\lambda}{NA}$.

![psf-airy-disk-index-2024-04-16-00-56-08](https://lfs.zhenhuang.site/images/psf-airy-disk-index-2024-04-16-00-56-08.png)
<span class="caption">The Airy Disk and PSF[^2]</span>

![psf-xy-index-2024-04-16-00-56-21](https://lfs.zhenhuang.site/images/psf-xy-index-2024-04-16-00-56-21.png#small)

#### On an XZ section

* More spread along the optical axis (Z axis);
* First dark island at $2n\frac{\lambda}{NA^2}$; ( $n$ is the refractive index.)
* Most light within two cones.

![psf-xz-index-2024-04-16-00-56-39](https://lfs.zhenhuang.site/images/psf-xz-index-2024-04-16-00-56-39.png#small)

#### Overall distribution

![psf-width-height-index-2024-04-16-00-57-00](https://lfs.zhenhuang.site/images/psf-width-height-index-2024-04-16-00-57-00.png#small)

<span class="caption">Width and Depth of PSF[^3]</span>

### Effect of NA on PSF

Bigger effect on axial (X-Z) than lateral (X-Y) spread.

![na-influences-on-psf-index-2024-04-16-00-57-18](https://lfs.zhenhuang.site/images/na-influences-on-psf-index-2024-04-16-00-57-18.png#small)

## Convolution

The microscope optics convolve each point source in the specimen with the PSF to produce the image.

$$
Specimen \otimes PSF = Image
$$

![optics-convolve-each-point-source-index-2024-04-16-00-57-39](https://lfs.zhenhuang.site/images/optics-convolve-each-point-source-index-2024-04-16-00-57-39.png#small)

Objects in a diffraction-limited image of your sample will never appear smaller than the PSF.

For example, that's say you have two microtubules in your specimen and you have labeled them with GFP, and you imaged them with a 1.4 NA oil objective lens. Microtubules are about 25 nm in diameter, and the PSF for this setup is about 240 nm. So each fluorophore in the microtubule will be convolved with the PSF. You can easily tell by the end of the microtubule that there are two separate microtubules, but not at all by the middle where they are closer than the PSF[^4].

![microtubule-convolve-index-2024-04-16-00-57-56](https://lfs.zhenhuang.site/images/microtubule-convolve-index-2024-04-16-00-57-56.png#small)

[^1]: [Microscopy: Point Spread Function (Jeff Lichtman)](https://www.youtube.com/watch?v=JQy94K94nL0)
[^2]: [Principles of Microscopy I: Point Spread Function and Resolution](https://indico.ictp.it/event/8007/session/17/contribution/88/material/slides/0.pdf)
[^3]: [How the point spread function influence microscopy resolution? | SIMTRUM Photonics Store](https://www.simtrum.com/WebShop/ResourceInfo.aspx?id=4444)
[^4]: [The Point Spread Function - Microcourses](https://www.youtube.com/watch?v=Tkc_GOCjx7E)