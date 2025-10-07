---
title: Fourier Optics
seo_title: Fourier Optics
summary: Notes about basic Fourier Transform, the relationship between Fourier Transform and the lens, 2D/3D Fourier Transform in the context of microscopy.
description: 
slug: microscopy-7
author: Zhen Huang

draft: false
date: 2024-04-01T18:48:13+08:00
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

## Fourier transform

General sine function:

$$
\begin{equation}
y(x) = A \sin(\frac{2 \pi}{T} x + \varphi)
\end{equation}
$$

Where $A$ is the amplitude, $T$ is the period, and $\varphi$ is the phase.

We can also say that $T$ is the wavelength $\lambda$, and $f = \frac{1}{\lambda} = \frac{1}{T}$ is the frequency.

So another general form of the sine function is:

$$
\begin{equation}
\begin{aligned}
y(x) &= A \sin(\frac{2 \pi}{\lambda} x + \varphi) \newline
&= A \sin(2 \pi f x + \varphi) \newline
\end{aligned}
\end{equation}
$$

So for 1D sine wave, $A$, $f$ (or $\lambda$), and $\varphi$ are the three crucial parameters that can describe the wave.

The fourier transform is a decomposition process: **Any periodic function can be decomposed into a series of sine and cosine functions with different amplitudes, frequencies and phases**.

![Fourier_transform_time_and_frequency_domains_(small)-index-2024-04-16-10-44-58](https://lfs.zhenhuang.top/images/Fourier_transform_time_and_frequency_domains_(small)-index-2024-04-16-10-44-58.gif#small)
<span class="caption">A visualization of the relationship between the time domain and the frequency domain of a function, based on its Fourier transform. From Wikipedia.</span>

Mathematically,

$$
\begin{equation}
f(x) = \frac{A}{2} + \sum_{m=1}^{\infty} A_{m}\cos(\frac{2 \pi mx}{\lambda}) + \sum_{m=1}^{\infty} B_{m}\sin(\frac{2 \pi mx}{\lambda})
\end{equation}
$$

where $A_{m}$ and $B_{m}$ are the amplitudes of the cosine and sine functions, respectively.

More sinusoid functions with higher frequencies will destribe the function better. The highest frequency in the decomposition will be refered to as the **Nyquist frequency**.

![Example_of_Fourier_Convergence-index-2024-04-16-10-38-35](https://lfs.zhenhuang.top/images/Example_of_Fourier_Convergence-index-2024-04-16-10-38-35.gif#small)
<span class="caption">Example of convergence to a somewhat arbitrary function. From Wikipedia.</span>

And **the fourier transform can be fully converted**:

$$
f(x) \xrightarrow[F.T.]{\mathcal{F}} F(k) \xrightarrow[Inverse F.T.]{\mathcal{F}^{-1}} f(x)
$$

Fourier transform allows representing any periodic function as a linear combination of sinusoids. The new variables it uses will be: **amplitudes**, **frequencies**, and **phases**.

![two-domain-index-2024-04-16-10-38-54](https://lfs.zhenhuang.top/images/two-domain-index-2024-04-16-10-38-54.png#small)

{{<notice tip>}}

* The fourier space is just another way to represent the same information in the real space.
* In 1D fourier space, **the higher the frequency, the further the point is from the center**.
* The phase is not shown in the amplitude spectrum.
* The fourier space has inherent **symmetry** (Hermitian symmetry) in the context of real-valued time-domain signals.

{{</notice>}}

## Fourier transform and the lens

![objective-lens-performs-fourier-transform-index-2024-04-16-10-44-19](https://lfs.zhenhuang.top/images/objective-lens-performs-fourier-transform-index-2024-04-16-10-44-19.png)

$$
\begin{equation}
\tan(\theta) = \frac{x}{F} \approx \sin(\theta)
\end{equation}
$$

where $F$ is the focal length of the lens, and $x$ is the distance between one small point and the center of the sample/object, which represents certain featrues of the sample (grating period).

Because the electrons which run parallel to the optical axis and those scattered by the sample have **the same frequency** (image spacial frequency $\neq$ wave frequency), they can interfere with each other by the delay of $\Delta d$, which contributes to some certain patterns in the fourier space (Back Focal Plane). Say the distance between the center of the diffaction pattern and certain feature in the diffaction pattern is $k$, and its amplitude is $A(k)$.

$$
\begin{equation}
\Delta d = k \sin(\theta) \approx k \frac{x}{F}
\end{equation}
$$

So the object can be decomposed into:

$$
\begin{equation}
I(x) = \sum A(k) \cos(\frac{2\pi}{\lambda} \times n \Delta d)
\end{equation}
$$

where $n$ is the refractive index.

Then:

$$
\begin{equation}
\begin{aligned}
I(x) &= \sum A(k) \cos(\frac{2\pi n}{\lambda} \times \frac{kx}{F}) \newline
&= \sum A({\color{blue}k}) \sin({\color{blue}k} {\color{red}x} \times \frac{2\pi n}{\lambda F} + \frac{\pi}{2})
\end{aligned}
\end{equation}
$$

Obviously, the above equation is the Fourier transform of the object.

So, the spacial frequency $f_{S}$ can be represented by:

$$
\begin{equation}
f_{S} = \frac{2\pi kn}{\lambda F} = \frac{2\pi n}{\lambda F} \times k
\end{equation}
$$

{{<notice tip>}}
We can learn from the above equation that:

* The further the point is from the center of the fourier space, the higher the spacial frequency is.
* The change made in one point in the real space will affect all the points in the fourier space. *Vice versa*.
* The phase isn't shown in this context.
{{</notice>}}

We can also try to calculate the **Abbe Diffraction Limit**:

When $k$ is equal to the radius of the lens (or the size of the back aperture), the spacial frequency is the highest, and the $\alpha$ angle reaches the maximum.

$$
\begin{equation}
k_{max} = F \tan \alpha_{max} \approx F \sin \alpha_{max}
\end{equation}
$$

where $\alpha_{max}$ is the half angle of the maximum cone of light that can enter or exit the lens.

$$
\begin{equation}
\begin{aligned}
N.A. &= n \sin \alpha_{max} \newline
&= \frac{n k_{max}}{F}
\end{aligned}
\end{equation}
$$

So the highest spacial frequency is:

$$
\begin{equation}
\begin{aligned}
f_{S_{max}} &= \frac{2\pi n}{\lambda F} \times k_{max} \newline
&= \frac{2\pi}{\lambda} \times N.A.
\end{aligned}
\end{equation}
$$

The Abbe Diffraction Limit tells us that when the peak of one wave falls on the minimum of another adjacent wave (phase difference is $\pi$), we can exactly distinguish the two waves. So the minimum distance between two points that can be distinguished is:

$$
\begin{equation}
\Delta x_{min} = \frac{\pi}{f_{S_{max}}} = \frac{\lambda}{2 N.A.}
\end{equation}
$$

The above is a simple derivation of the Abbe limit.

## 2D/3D Fourier transform

### Representation of images in real space

* Any images consist of pixels
* Pixels are represented by coordinates and intensity values.

![dimensionality-index-2024-04-16-10-16-39](https://lfs.zhenhuang.top/images/dimensionality-index-2024-04-16-10-16-39.png#small)

![image-in-real-space-index-2024-04-16-10-45-58](https://lfs.zhenhuang.top/images/image-in-real-space-index-2024-04-16-10-45-58.png#small)

We can also represent images by the **linear combination of other images**. These images are called base images (base vectors). So an image can be represented by the sum of these base images with certain coefficients.

![linear-combination-of-base-vectors-index-2024-04-16-10-17-00](https://lfs.zhenhuang.top/images/linear-combination-of-base-vectors-index-2024-04-16-10-17-00.png#small)

### Fourier decomposition of 2D images

The Fourier transform of some real-space base images:

![Fourier-transform-of-2D-images-index-2024-04-16-10-17-25](https://lfs.zhenhuang.top/images/Fourier-transform-of-2D-images-index-2024-04-16-10-17-25.png#small)

<span class="caption">Here the size of the dots is increased for better visualization.</span>

When we decompose a $8 \times 8$ real-space image, we can get 64 basis images, which correspond to **amplitudes and phases of each frequency component**.

![fourier-decomposition-in-2D-index-2024-04-16-10-35-04](https://lfs.zhenhuang.top/images/fourier-decomposition-in-2D-index-2024-04-16-10-35-04.png#small)

{{<notice info>}}
Each 2D image can be decomposed in Fourier space by these basis vectors (like sinusoids in 1D-case).
{{</notice>}}

### Fourier transform in 2D images

![amplitude-phase-spectrum-index-2024-04-16-10-35-35](https://lfs.zhenhuang.top/images/amplitude-phase-spectrum-index-2024-04-16-10-35-35.png#small)

When we perform the Fourier transform of an image, we can get the **amplitude** and **phase spectrum** at the same time.

{{<notice tip "Amplitude (power) spectrum">}}

* Near Center: low frequency components
* Near Edge: high frequency components
* Center point: DC component
* Intensities encode amplitudes:
  * in cryo-EM: power = amplitude$^2$
* While only amplitudes are represented in the power spectrum, the phases are equally important.
{{</notice>}}

### 3D Fourier transform

Fourier Transform can be generalized further into 3D or ND spaces. Like the examples in 1D and 2D, the 3D fourier transform is also a decomposition process, which can be represented by **the sum of multiple 3D base waves in volume**.

![the-sum-of-multiple-3D-base-waves-index-2024-04-16-10-37-06](https://lfs.zhenhuang.top/images/the-sum-of-multiple-3D-base-waves-index-2024-04-16-10-37-06.png#small)

<span class="caption">Multiple 3D base waves in volume</span>

![3D-Fourier-transform-index-2024-04-16-10-37-25](https://lfs.zhenhuang.top/images/3D-Fourier-transform-index-2024-04-16-10-37-25.png#small)

<span class="caption">3D Fourier transform</span>

{{<notice tip "Central slice theorem">}}

The 2D fourier transform of the projection of a 3D object is equal to the central slice of the 3D fourier transform of the object.

![Central-slice-theorem-index-2024-04-16-10-37-56](https://lfs.zhenhuang.top/images/Central-slice-theorem-index-2024-04-16-10-37-56.png#small)

{{</notice>}}

## References

* [Lecture 6 - Cryo-Electron Microscopy - Fourier transform, image formation, CTF](https://www.youtube.com/watch?v=VE_U5abE-v4)
* [Fourier transforms in cryo-EM | Convolution, Gaussian filters, Fourier Shell Correlation, FFT](https://www.youtube.com/watch?v=mRrM0cus1HE)